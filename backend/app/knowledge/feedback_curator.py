"""Módulo de Diagnóstico Automático e Criação de Respostas Douradas (Gold Q&A)

para Curadoria de Feedbacks Negativos (Dislikes).
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

from app.auth.database import AsyncSessionLocal
from app.auth.models import Message, MessageFeedback
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
from app.knowledge.models import KnowledgeEdge
from app.llm.base import Message as LLMMessage
from app.llm.factory import get_llm_client

logger = logging.getLogger(__name__)


def _extract_json_block(text: str) -> dict[str, Any] | None:
    match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", text)
    candidate = match.group(1) if match else text
    try:
        return json.loads(candidate.strip())
    except Exception:
        start = text.find("{")
        end = text.rfind("}")
        if start != -1 and end != -1 and end > start:
            try:
                return json.loads(text[start : end + 1])
            except Exception:
                pass
    return None


async def run_ai_feedback_diagnosis(feedback_id: uuid.UUID) -> None:
    """Executa diagnóstico assíncrono com IA sobre o motivo do dislike."""
    async with AsyncSessionLocal() as db:
        fb = await db.get(MessageFeedback, feedback_id)
        if not fb or fb.rating != "dislike":
            return

        assistant_msg = await db.get(Message, fb.message_id)
        if not assistant_msg:
            return

        # Recupera a pergunta anterior do usuário na mesma conversa
        user_msg = await db.scalar(
            select(Message)
            .where(
                Message.conversation_id == assistant_msg.conversation_id,
                Message.role == "user",
                Message.created_at <= assistant_msg.created_at,
            )
            .order_by(Message.created_at.desc())
        )
        user_question = user_msg.content if user_msg else "(Pergunta não localizada)"

        llm = get_llm_client()

        messages: list[LLMMessage] = [
            {
                "role": "system",
                "content": (
                    "Você é um Auditor Especialista em Precisão de Sistemas RAG e Governança de IA. "
                    "Um usuário final deu DISLIKE em uma resposta gerada pelo sistema. "
                    "Sua missão é realizar uma análise de causa-raiz objetiva e rigorosa.\n\n"
                    "Classifique a falha em uma das categorias:\n"
                    "- 'FALHA_RECUPERACAO': O RAG não buscou os documentos certos ou a busca vetorial falhou.\n"
                    "- 'FALHA_GERACAO': O RAG recuperou os trechos corretos, mas a IA alucinou ou sintetizou incorretamente.\n"
                    "- 'LACUNA_BASE': A base de conhecimento atual não contém os documentos necessários para responder.\n"
                    "- 'REGRA_DESATUALIZADA': A resposta utilizou uma regra antiga que foi superada ou modificada.\n"
                    "- 'RESPOSTA_INCOMPLETA': A resposta foi superficial ou omitiu parâmetros essenciais.\n\n"
                    "Retorne estritamente um JSON com a estrutura:\n"
                    "{\n"
                    '  "category": "FALHA_RECUPERACAO" | "FALHA_GERACAO" | "LACUNA_BASE" | "REGRA_DESATUALIZADA" | "RESPOSTA_INCOMPLETA",\n'
                    '  "root_cause_summary": "Resumo de 1 a 2 linhas explicando por que a resposta falhou",\n'
                    '  "recommended_action": "O que o curador deve fazer (ex: Criar FAQ canônico, Ajustar documento X, Rever busca)",\n'
                    '  "suggested_gold_answer": "Sugestão da resposta correta e ideal para esta pergunta"\n'
                    "}"
                ),
            },
            {
                "role": "user",
                "content": (
                    f"PERGUNTA DO USUÁRIO:\n{user_question}\n\n"
                    f"FONTES CONSULTADAS PELO RAG:\n{json.dumps(assistant_msg.sources or [], ensure_ascii=False)}\n\n"
                    f"RESPOSTA GERADA (AVALIADA COM DISLIKE):\n{assistant_msg.content}\n\n"
                    f"MOTIVO ALEGADO PELO USUÁRIO:\n{fb.reason or 'Não informado'}\n"
                    f"COMENTÁRIO DO USUÁRIO:\n{fb.comment or 'Sem comentário adicional'}\n"
                ),
            },
        ]

        try:
            response_text = await llm.complete(messages)
            diagnosis = _extract_json_block(response_text)
            if diagnosis:
                fb.ai_diagnosis = json.dumps(diagnosis, ensure_ascii=False)
                fb.curation_status = "ANALYZED"
                await db.commit()
                return
        except Exception as exc:
            logger.warning(f"[feedback_curator] Erro ao diagnosticar feedback {feedback_id}: {exc}")

        # Fallback se a IA falhar
        fallback_diag = {
            "category": "FALHA_GERACAO" if fb.reason == "HALLUCINATION_CONFUSING" else "FALHA_RECUPERACAO",
            "root_cause_summary": f"Feedback de usuário com motivo: {fb.reason or 'Não informado'}",
            "recommended_action": "Revisar trechos consultados e validar se a regra precisa de Par Dourado.",
            "suggested_gold_answer": "Revisão manual recomendada pelo administrador.",
        }
        fb.ai_diagnosis = json.dumps(fallback_diag, ensure_ascii=False)
        fb.curation_status = "ANALYZED"
        await db.commit()


async def create_gold_canonical_answer(
    db: AsyncSession,
    feedback: MessageFeedback,
    question: str,
    approved_answer: str,
    curator_user_id: uuid.UUID | None = None,
) -> str:
    """Cria um documento de FAQ canônico (.md) na base, indexa no Qdrant e conclui a curadoria."""
    root = Path(settings.sources_root).resolve()
    target_dir = root / "00. Regras Harmonizadas"
    target_dir.mkdir(parents=True, exist_ok=True)

    slug = re.sub(r"[^\w]+", "-", question.strip().lower())[:30]
    filename = f"faq-canonica-{slug}.md"
    file_path = target_dir / filename

    now_str = datetime.now().strftime("%Y-%m-%d")
    md_content = f"""---
title: "FAQ Canônica: {question.strip()}"
version: "1.0"
date: "{now_str}"
status: VIGENTE
type: RESPOSTA_DOURADA
tags:
  - FAQ Canônico
  - Curadoria
  - Resposta Dourada
  - RAG Reef
---

# Resposta Dourada de Referência (FAQ Canônica)

## Pergunta de Referência
**{question.strip()}**

## Resposta Oficial Harmonizada
{approved_answer.strip()}

## Diretrizes de Governança
Este documento foi validado e homologado pela curadoria do RAG Reef para pacificar divergências e assegurar precisão de 100% para esta consulta.
"""

    file_path.write_text(md_content, encoding="utf-8")

    # Ingestão vetorial imediata no Qdrant
    doc = parse_markdown_file(file_path, root)
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

    # Atualiza feedback
    feedback.curation_status = "GOLD_ANSWER_CREATED"
    feedback.curator_notes = f"Criada resposta dourada em {doc.source_path}"
    feedback.resolved_by_user_id = curator_user_id
    feedback.resolved_at = datetime.now(timezone.utc)

    await db.commit()
    return doc.source_path
