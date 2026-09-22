"""Módulo de Curadoria Normativa com IA & Resolução Inteligente de Conflitos.

Permite:
1. Analisar divergências com IA e sugerir a melhor recomendação e minuta de nova regra.
2. Aplicar Prevalência Normativa (Doc A ou Doc B vence, criando aresta SUBSTITUI no Grafo).
3. Sintetizar e Publicar Nova Regra Harmonizada (gerada pela IA ou redigida pelo admin).
4. Subir documento .md retificador substituto.
"""

from __future__ import annotations

import json
import logging
import re
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.ingestion.chunker import chunk_by_headers
from app.ingestion.embedder import get_embedder
from app.ingestion.parser import parse_markdown_file
from app.ingestion.vector_store import (
    delete_by_source_path,
    ensure_collection,
    get_client,
    upsert_chunks,
)
from app.knowledge.models import KnowledgeConflict, KnowledgeEdge
from app.llm.base import Message
from app.llm.factory import get_llm_client


logger = logging.getLogger(__name__)


def _extract_json_block(text: str) -> dict[str, Any] | None:
    """Extrai objeto JSON de blocos markdown ```json ... ``` ou texto puro."""
    match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", text)
    candidate = match.group(1) if match else text
    try:
        return json.loads(candidate.strip())
    except Exception:
        # Busca o primeiro '{' e último '}'
        start = text.find("{")
        end = text.rfind("}")
        if start != -1 and end != -1 and end > start:
            try:
                return json.loads(text[start : end + 1])
            except Exception:
                pass
    return None


def _read_file_snippet(source_path: str, max_chars: int = 1800) -> str:
    """Tenta ler um trecho do arquivo do disco local para dar contexto real ao LLM."""
    try:
        root = Path(settings.sources_root).resolve()
        target = (root / source_path).resolve()
        if target.exists() and target.is_file():
            content = target.read_text(encoding="utf-8", errors="ignore")
            if len(content) > max_chars:
                return content[:max_chars] + "\n... [trecho truncado]"
            return content
    except Exception as exc:
        logger.debug(f"[curator] Não foi possível ler snippet de {source_path}: {exc}")
    return f"[Arquivo: {source_path}]"


async def generate_curator_recommendation(conflict: KnowledgeConflict) -> dict[str, Any]:
    """Aciona o LLM para analisar a contradição entre os dois documentos e propor:

    1. Recomendação de estratégia (prevalence_new, prevalence_existing, synthesize_rule).
    2. Análise e raciocínio normativo da decisão.
    3. Minuta completa em Markdown da nova regra harmonizada (para a opção de síntese).
    4. Sugestão de nome de arquivo para a nova regra.
    """
    snippet_new = _read_file_snippet(conflict.source_path_new)
    snippet_existing = _read_file_snippet(conflict.source_path_existing)

    llm = get_llm_client()

    messages: list[Message] = [
        {
            "role": "system",
            "content": (
                "Você é o Curador Chefe de Conhecimento e Governança Corporativa de uma grande seguradora/empresa de tecnologia. "
                "Sua missão é resolver conflitos, divergências e obsolescências normativas entre documentos da base de conhecimento RAG.\n\n"
                "Ao analisar dois documentos em conflito, você deve propor a solução ideal com a máxima precisão técnica e jurídica/normativa.\n"
                "Você deve retornar estritamente um JSON com a seguinte estrutura:\n"
                "{\n"
                '  "recommended_option": "prevalence_new" | "prevalence_existing" | "synthesize_rule",\n'
                '  "recommended_winner_path": "caminho_do_vencedor_se_prevalencia_ou_null",\n'
                '  "analysis": "Explicação clara e fundamentada do porquê desta recomendação (datas, especificidade, hierarquia)",\n'
                '  "draft_filename": "nome-do-arquivo-sugerido.md",\n'
                '  "draft_markdown": "# Minuta da Nova Regra Harmonizada com front-matter YAML completo, regras definitivas e revogações expressas"\n'
                "}\n\n"
                "A minuta 'draft_markdown' deve ser escrita em português profissional, com frontmatter YAML contendo: "
                "title, version, status (VIGENTE), replaces (lista com os dois docs), e seções: Objetivo, Regra Definitiva Harmonizada, "
                "Competências e Disposições Finais."
            ),
        },
        {
            "role": "user",
            "content": (
                f"TIPO DE CONFLITO: {conflict.conflict_type}\n"
                f"DIAGNÓSTICO DO WATCHDOG: {conflict.explanation}\n\n"
                f"--- DOCUMENTO A (NOVO/RECENTE): {conflict.source_path_new} ---\n"
                f"{snippet_new}\n\n"
                f"--- DOCUMENTO B (EXISTENTE/ANTERIOR): {conflict.source_path_existing} ---\n"
                f"{snippet_existing}\n\n"
                f"Analise a divergência e forneça a recomendação de curadoria e a minuta harmonizada em JSON."
            ),
        },
    ]

    try:
        response_text = await llm.complete(messages)
        parsed = _extract_json_block(response_text)
        if parsed and "recommended_option" in parsed:
            return parsed
    except Exception as exc:
        logger.warning(f"[curator] Falha ao consultar LLM para conflito {conflict.id}: {exc}")

    # Fallback estruturado de alta qualidade caso o LLM esteja offline ou falhe
    is_obsolescencia = conflict.conflict_type.upper() == "OBSOLESCENCIA"
    fallback_winner = conflict.source_path_new if is_obsolescencia else None
    fallback_option = "prevalence_new" if is_obsolescencia else "synthesize_rule"

    clean_name = Path(conflict.source_path_new).stem.replace(" ", "-").lower()[:35]
    fallback_filename = f"diretriz-harmonizada-{clean_name}.md"

    fallback_markdown = f"""---
title: Diretriz Harmonizada de {Path(conflict.source_path_new).stem}
version: "1.0"
date: "{datetime.now().strftime('%Y-%m-%d')}"
status: VIGENTE
replaces:
  - "{conflict.source_path_new}"
  - "{conflict.source_path_existing}"
tags:
  - Curadoria
  - Regra Unificada
  - RAG Reef
---

# Diretriz Normativa Harmonizada

## 1. Objetivo & Escopo
Este documento unifica e pacifica as diretrizes anteriormente dispersas e divergentes entre:
- `{conflict.source_path_new}`
- `{conflict.source_path_existing}`

## 2. Diagnóstico da Divergência Original
{conflict.explanation}

## 3. Regra Operacional Definitiva
Estabelece-se a harmonização das competências e procedimentos, ficando determinado que as diretrizes mais recentes e especializadas prevalecem, devendo todas as operações seguir estritamente o fluxo integrado.

## 4. Disposições Finais & Revogações
Ficam expressamente revogadas e substituídas as cláusulas contraditórias contidas nos documentos anteriores.
"""

    return {
        "recommended_option": fallback_option,
        "recommended_winner_path": fallback_winner,
        "analysis": (
            f"Conflito classificado como {conflict.conflict_type}. "
            "Recomenda-se a harmonização formal consolidando as diretrizes atualizadas em uma regra única."
        ),
        "draft_filename": fallback_filename,
        "draft_markdown": fallback_markdown.strip(),
    }


async def apply_prevalence_resolution(
    db: AsyncSession,
    conflict: KnowledgeConflict,
    winner_path: str,
    reason: str,
    user_id: uuid.UUID | None = None,
) -> KnowledgeConflict:
    """Aplica a resolução por Prevalência Normativa:

    - Identifica o documento vencedor e o perdedor.
    - Cria/atualiza aresta SUBSTITUI no Grafo (winner -> loser).
    - Marca o conflito como resolvido com auditoria.
    """
    if winner_path == conflict.source_path_new:
        loser_path = conflict.source_path_existing
        strategy = "PREVALENCE_NEW"
    else:
        loser_path = conflict.source_path_new
        strategy = "PREVALENCE_EXISTING"

    # 1. Cria ou atualiza a aresta no Grafo
    edge_desc = f"Prevalência definida em curadoria normativa: {reason or 'Regra eleita pelo administrador'}"
    existing_edge = await db.scalar(
        select(KnowledgeEdge).where(
            KnowledgeEdge.source_path == winner_path,
            KnowledgeEdge.target_path == loser_path,
        )
    )

    if existing_edge:
        existing_edge.relation_type = "SUBSTITUI"
        existing_edge.description = edge_desc
        existing_edge.weight = 2.0
    else:
        db.add(
            KnowledgeEdge(
                source_path=winner_path,
                target_path=loser_path,
                relation_type="SUBSTITUI",
                description=edge_desc,
                weight = 2.0,
            )
        )

    # 2. Marca o conflito como resolvido
    conflict.resolved = True
    conflict.resolution_strategy = strategy
    conflict.resolution_details = json.dumps(
        {
            "strategy": strategy,
            "winner_path": winner_path,
            "loser_path": loser_path,
            "reason": reason,
        },
        ensure_ascii=False,
    )
    conflict.resolved_by_user_id = user_id
    conflict.resolved_at = datetime.now(timezone.utc)

    await db.commit()
    await db.refresh(conflict)
    return conflict


def _ingest_and_index_file(file_path: Path, root_path: Path):
    """Indexa um arquivo novo diretamente no Qdrant para ficar imediatamente consultável no RAG."""
    doc = parse_markdown_file(file_path, root_path)
    client = get_client()
    embedder = get_embedder()

    probe_vector = embedder.embed(["probe"])[0]
    ensure_collection(client, vector_size=len(probe_vector))

    delete_by_source_path(client, doc.source_path)
    chunks = chunk_by_headers(doc.body, doc.title)

    if chunks:
        vectors = embedder.embed([c.text for c in chunks])
        payloads = [
            {
                "source_path": doc.source_path,
                "content_hash": doc.content_hash,
                "title": doc.title,
                "tags": doc.tags,
                "breadcrumb": chunk.breadcrumb,
                "chunk_index": chunk.chunk_index,
                "text": chunk.text,
            }
            for chunk in chunks
        ]
        upsert_chunks(client, vectors, payloads)

    return doc


async def apply_synthesized_rule_resolution(
    db: AsyncSession,
    conflict: KnowledgeConflict,
    filename: str,
    markdown_content: str,
    user_id: uuid.UUID | None = None,
) -> KnowledgeConflict:
    """Grava uma nova regra harmonizada no disco, indexa no Qdrant, cria arestas

    SUBSTITUI para ambos os documentos anteriores e resolve o conflito.
    """
    root = Path(settings.sources_root).resolve()
    target_dir = root / "00. Regras Harmonizadas"
    target_dir.mkdir(parents=True, exist_ok=True)

    clean_filename = re.sub(r"[^\w\-\.]", "_", filename.strip())
    if not clean_filename.lower().endswith(".md"):
        clean_filename += ".md"

    file_path = target_dir / clean_filename
    file_path.write_text(markdown_content, encoding="utf-8")

    rel_path = f"00. Regras Harmonizadas/{clean_filename}"

    # 1. Ingestão vetorial imediata no Qdrant
    try:
        _ingest_and_index_file(file_path, root)
    except Exception as exc:
        logger.error(f"[curator] Erro ao indexar regra sintetizada no Qdrant: {exc}")

    # 2. Conexões no Grafo: a nova regra substitui ambos os documentos conflitantes
    edge_desc = f"Substituição e consolidação definitiva gerada em curadoria normativa para resolver o conflito."
    for old_path in [conflict.source_path_new, conflict.source_path_existing]:
        db.add(
            KnowledgeEdge(
                source_path=rel_path,
                target_path=old_path,
                relation_type="SUBSTITUI",
                description=edge_desc,
                weight=2.5,
            )
        )

    # 3. Marca conflito como resolvido
    conflict.resolved = True
    conflict.resolution_strategy = "AI_SYNTHESIS"
    conflict.resolution_details = json.dumps(
        {
            "strategy": "AI_SYNTHESIS",
            "new_rule_path": rel_path,
            "filename": clean_filename,
            "replaced_docs": [conflict.source_path_new, conflict.source_path_existing],
        },
        ensure_ascii=False,
    )
    conflict.resolved_by_user_id = user_id
    conflict.resolved_at = datetime.now(timezone.utc)

    await db.commit()
    await db.refresh(conflict)
    return conflict


async def apply_upload_resolution(
    db: AsyncSession,
    conflict: KnowledgeConflict,
    filename: str,
    file_bytes: bytes,
    user_id: uuid.UUID | None = None,
) -> KnowledgeConflict:
    """Salva um documento .md substituto enviado pelo usuário, indexa e resolve o conflito."""
    root = Path(settings.sources_root).resolve()
    target_dir = root / "00. Regras Harmonizadas"
    target_dir.mkdir(parents=True, exist_ok=True)

    clean_filename = re.sub(r"[^\w\-\.]", "_", filename.strip())
    if not clean_filename.lower().endswith(".md"):
        clean_filename += ".md"

    file_path = target_dir / clean_filename
    file_path.write_bytes(file_bytes)

    rel_path = f"00. Regras Harmonizadas/{clean_filename}"

    # 1. Ingestão vetorial imediata
    try:
        _ingest_and_index_file(file_path, root)
    except Exception as exc:
        logger.error(f"[curator] Erro ao indexar arquivo enviado no Qdrant: {exc}")

    # 2. Conexões no Grafo: o novo arquivo substitui ambos os documentos
    edge_desc = f"Documento substituto retificador enviado pelo administrador para pacificar divergência normativa."
    for old_path in [conflict.source_path_new, conflict.source_path_existing]:
        db.add(
            KnowledgeEdge(
                source_path=rel_path,
                target_path=old_path,
                relation_type="SUBSTITUI",
                description=edge_desc,
                weight=2.5,
            )
        )

    # 3. Marca conflito como resolvido
    conflict.resolved = True
    conflict.resolution_strategy = "UPLOAD_REPLACEMENT"
    conflict.resolution_details = json.dumps(
        {
            "strategy": "UPLOAD_REPLACEMENT",
            "replacement_path": rel_path,
            "filename": clean_filename,
            "replaced_docs": [conflict.source_path_new, conflict.source_path_existing],
        },
        ensure_ascii=False,
    )
    conflict.resolved_by_user_id = user_id
    conflict.resolved_at = datetime.now(timezone.utc)

    await db.commit()
    await db.refresh(conflict)
    return conflict
