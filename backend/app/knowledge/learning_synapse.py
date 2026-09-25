"""Módulo de Neuroplasticidade Sintética e Aprendizado Cognitivo Autônomo.

Detecta quando o assistente identifica um equívoco em seu próprio raciocínio
(sem indução do interlocutor), consolida a retificação, gera um novo nó e sinapse
no Grafo de Conhecimento e indexa o aprendizado no Qdrant para consultas futuras.
"""

from __future__ import annotations

import json
import logging
import re
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from qdrant_client.models import PointStruct
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.ingestion.embedder import get_embedder
from app.ingestion.vector_store import get_client
from app.knowledge.models import KnowledgeEdge, KnowledgeEntity

logger = logging.getLogger(__name__)

# Padrões linguísticos de auto-correção / reflexão interna autônoma
SELF_CORRECTION_PATTERNS = [
    r"(?:retifico|retificando)\s+(?:meu\s+racioc[ií]nio|a\s+informa[çc][ãa]o|minha\s+afirma[çc][ãa]o|a\s+resposta)",
    r"cometi\s+um\s+equ[ií]voco\s+(?:ao\s+afirmar|inicial|anterior)",
    r"me\s+enganei\s+(?:ao\s+considerar|inicialmente|ao\s+supor)",
    r"pe[çc]o\s+desculpas\s+pelo\s+equ[ií]voco",
    r"corrigindo\s+(?:o\s+entendimento|a\s+regra|a\s+resposta|a\s+informa[çc][ãa]o)",
    r"revisando\s+(?:as\s+regras|os\s+manuais|a\s+documenta[çc][ãa]o\s+can[ôo]nica),\s+(?:o\s+correto|retifico|constato\s+que)",
]


def extract_cognitive_learning(
    response_text: str,
) -> tuple[str, dict[str, Any] | None]:
    """Analisa a resposta do modelo procurando blocos estruturados de aprendizado

    ou marcadores expressos de auto-correção.
    Retorna uma tupla: (texto_limpo_para_o_usuario, dados_do_aprendizado | None)
    """
    if not response_text:
        return response_text, None

    # 1. Busca por bloco explícito json:cognitive_learning ou json:learning
    block_pattern = r"```(?:json:cognitive_learning|json:learning|cognitive_learning)\s*([\s\S]*?)\s*```"
    match = re.search(block_pattern, response_text, re.IGNORECASE)

    if match:
        raw_json = match.group(1).strip()
        cleaned_text = re.sub(block_pattern, "", response_text, flags=re.IGNORECASE).strip()
        try:
            parsed = json.loads(raw_json)
            if isinstance(parsed, dict) and parsed.get("concept") and parsed.get("correction"):
                return cleaned_text, {
                    "detected": True,
                    "concept": str(parsed.get("concept", "")).strip(),
                    "mistake": str(parsed.get("mistake", "")).strip(),
                    "correction": str(parsed.get("correction", "")).strip(),
                    "source_entity": str(parsed.get("source_entity", "")).strip(),
                    "synapse_type": str(parsed.get("synapse_type", "RETIFICA_CONCEITO")).strip(),
                }
        except Exception as exc:
            logger.warning(f"[learning_synapse] Falha ao parsear bloco json:cognitive_learning: {exc}")

    # 2. Verificação de auto-correção via expressões regulares semânticas
    has_self_correction = any(
        re.search(pat, response_text, re.IGNORECASE) for pat in SELF_CORRECTION_PATTERNS
    )

    if has_self_correction:
        # Extração heurística de conceito e retificação
        lines = [line.strip() for line in response_text.split("\n") if line.strip()]
        correction_snippet = ""
        for line in lines:
            if any(re.search(pat, line, re.IGNORECASE) for pat in SELF_CORRECTION_PATTERNS):
                correction_snippet = line
                break

        return response_text, {
            "detected": True,
            "concept": "Regra / Parâmetro REEF Retificado",
            "mistake": "Interpretação preliminar inconsistente com a base canônica",
            "correction": correction_snippet or "Retificação factual adotada pelo assistente com base nos manuais canônicos.",
            "source_entity": "REEF_CANONICAL_RULE",
            "synapse_type": "RETIFICA_CONCEITO",
        }

    return response_text, None


async def persist_cognitive_learning(
    learning_data: dict[str, Any],
    db: AsyncSession,
) -> dict[str, Any]:
    """Persiste a retificação como um novo Nó e Sinapse no Grafo Relacional

    (Postgres) e indexa o vetor com prioridade máxima no Qdrant.
    """
    concept = learning_data.get("concept", "Conceito Geral").strip()[:255]
    mistake = learning_data.get("mistake", "").strip()
    correction = learning_data.get("correction", "").strip()
    synapse_type = learning_data.get("synapse_type", "RETIFICA_CONCEITO").strip()

    node_id = uuid.uuid4()
    canonical_id = f"learn_{node_id.hex[:8]}"
    source_uri = f"learning://{canonical_id}"

    # 1. Criação do Nó de Aprendizado na tabela KnowledgeEntity
    entity = KnowledgeEntity(
        id=node_id,
        name=f"⚡ {concept}",
        entity_type="APRENDIZADO_COGNITIVO",
        canonical_id=canonical_id,
        description=f"Retificação Canônica: {correction} | Equívoco superado: {mistake}",
    )
    db.add(entity)

    # 2. Criação da Aresta / Sinapse no Grafo
    target_path = learning_data.get("source_entity") or "REEF_SYSTEM_CORE"
    edge = KnowledgeEdge(
        id=uuid.uuid4(),
        source_path=source_uri,
        target_path=target_path,
        relation_type=synapse_type,
        description=f"Sinapse de Aprendizado Autônomo em Tempo Real: {correction}",
        weight=2.5,
    )
    db.add(edge)
    await db.commit()

    # 3. Indexação Vetorial com Boost no Qdrant
    try:
        embedder = get_embedder()
        qdrant_client = get_client()

        chunk_text = (
            f"### [APRENDIZADO COGNITIVO CONSOLIDADO - RETIFICAÇÃO EM TEMPO REAL]\n"
            f"Conceito / Regra: {concept}\n"
            f"Correção Canônica: {correction}\n"
            f"Contexto do Equívoco Corrigido: {mistake}\n"
            f"Diretriz Canônica: Esta retificação foi auto-gerada pelo assistente e deve ser seguida com prioridade máxima."
        )

        vectors = embedder.embed([chunk_text])
        if vectors:
            point_id = str(uuid.uuid4())
            point = PointStruct(
                id=point_id,
                vector=vectors[0],
                payload={
                    "source_path": source_uri,
                    "title": f"Aprendizado Cognitivo: {concept}",
                    "text": chunk_text,
                    "breadcrumb": ["Aprendizados", "Sinapses Cognitivas", concept],
                    "is_cognitive_learning": True,
                    "concept": concept,
                    "correction": correction,
                    "mistake": mistake,
                    "canonical_id": canonical_id,
                    "synapse_type": synapse_type,
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                },
            )
            qdrant_client.upsert(
                collection_name=settings.qdrant_collection,
                points=[point],
            )
            logger.info(f"[learning_synapse] Novo nó e sinapse indexados com sucesso: {canonical_id} - '{concept}'")
    except Exception as q_exc:
        logger.warning(f"[learning_synapse] Não foi possível indexar vetor no Qdrant: {q_exc}")

    # 4. Envio assíncrono para fila de telemetria / GitHub Issues (Cenário 1)
    try:
        await dispatch_learning_to_upstream(learning_data, canonical_id)
    except Exception as dispatch_exc:
        logger.warning(f"[learning_synapse] Falha ao despachar telemetria: {dispatch_exc}")

    return {
        "detected": True,
        "node_id": str(node_id),
        "canonical_id": canonical_id,
        "concept": concept,
        "mistake": mistake,
        "correction": correction,
        "synapse_type": synapse_type,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }


LEARNINGS_DIR = Path("data/learnings")
OUTBOX_DIR = LEARNINGS_DIR / "outbox"
APPROVED_DIR = LEARNINGS_DIR / "approved"
INCOMING_DIR = LEARNINGS_DIR / "incoming"
EXPORTS_DIR = Path("data/snapshots/exports")

for _d in [OUTBOX_DIR, APPROVED_DIR, INCOMING_DIR, EXPORTS_DIR]:
    _d.mkdir(parents=True, exist_ok=True)


async def dispatch_learning_to_upstream(
    learning_data: dict[str, Any],
    canonical_id: str,
) -> dict[str, Any]:
    """Salva o aprendizado na outbox local e tenta despachar para o repositório

    GitHub como uma Issue com label 'cognitive-learning' (Cenário 1).
    Nenhum usuário precisa ser colaborador ou ter permissão de commit.
    """
    import httpx

    concept = learning_data.get("concept", "Regra Geral")
    mistake = learning_data.get("mistake", "")
    correction = learning_data.get("correction", "")
    synapse_type = learning_data.get("synapse_type", "RETIFICA_CONCEITO")
    now_iso = datetime.now(timezone.utc).isoformat()

    payload = {
        "canonical_id": canonical_id,
        "concept": concept,
        "mistake": mistake,
        "correction": correction,
        "synapse_type": synapse_type,
        "created_at": now_iso,
        "status": "PENDING_REVIEW",
    }

    # 1. Armazenamento na outbox local (Sempre garantido)
    outbox_file = OUTBOX_DIR / f"{canonical_id}.json"
    with open(outbox_file, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)

    # 2. Despacho silencioso para a GitHub Issues API (se token estiver disponível)
    if settings.github_token and settings.github_repo:
        try:
            issue_title = f"[Aprendizado Cognitivo] {concept}"
            issue_body = (
                f"### 🧠 Relatório de Aprendizado Cognitivo Autônomo\n\n"
                f"- **Conceito / Regra Retificada**: {concept}\n"
                f"- **Equívoco Identificado no Raciocínio**: {mistake}\n"
                f"- **Correção Canônica Adotada**: {correction}\n"
                f"- **Tipo de Sinapse**: `{synapse_type}`\n"
                f"- **ID Canônico**: `{canonical_id}`\n"
                f"- **Origem**: Instalação Local AXET NeuralGraph\n"
                f"- **Data de Ocorrência**: {now_iso}\n\n"
                f"---\n"
                f"<!-- cognitive_learning_payload:\n"
                f"{json.dumps(payload, ensure_ascii=False, indent=2)}\n"
                f"-->\n"
            )

            headers = {
                "Authorization": f"Bearer {settings.github_token}",
                "Accept": "application/vnd.github.v3+json",
                "User-Agent": "AXET-NeuralGraph-Agent",
            }
            api_url = f"https://api.github.com/repos/{settings.github_repo}/issues"

            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.post(
                    api_url,
                    headers=headers,
                    json={
                        "title": issue_title,
                        "body": issue_body,
                        "labels": ["cognitive-learning", "needs-review"],
                    },
                )
                if resp.status_code in (200, 201):
                    issue_data = resp.json()
                    payload["github_issue_number"] = issue_data.get("number")
                    payload["github_issue_url"] = issue_data.get("html_url")
                    with open(outbox_file, "w", encoding="utf-8") as f:
                        json.dump(payload, f, ensure_ascii=False, indent=2)
                    logger.info(f"[learning_synapse] Issue de aprendizado aberta com sucesso: #{issue_data.get('number')}")
        except Exception as gh_exc:
            logger.warning(f"[learning_synapse] Falha ao enviar para GitHub Issues API: {gh_exc}")

    return payload


async def fetch_incoming_learnings() -> list[dict[str, Any]]:
    """Recupera todos os aprendizados pendentes de revisão tanto das GitHub Issues

    quanto da caixa de entrada/outbox local.
    """
    import httpx

    items_by_id: dict[str, dict[str, Any]] = {}

    # 1. Carrega itens dos diretórios locais
    for folder in [OUTBOX_DIR, INCOMING_DIR, APPROVED_DIR]:
        if folder.exists():
            for p in folder.glob("*.json"):
                try:
                    with open(p, "r", encoding="utf-8") as f:
                        data = json.load(f)
                        cid = data.get("canonical_id") or p.stem
                        data["canonical_id"] = cid
                        if folder == APPROVED_DIR:
                            data["status"] = "APPROVED"
                        items_by_id[cid] = data
                except Exception:
                    pass

    # 2. Se configurado, busca as Issues no GitHub com label 'cognitive-learning'
    if settings.github_token and settings.github_repo:
        try:
            headers = {
                "Authorization": f"Bearer {settings.github_token}",
                "Accept": "application/vnd.github.v3+json",
                "User-Agent": "AXET-NeuralGraph-Agent",
            }
            api_url = f"https://api.github.com/repos/{settings.github_repo}/issues?labels=cognitive-learning&state=all&per_page=50"

            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.get(api_url, headers=headers)
                if resp.status_code == 200:
                    for issue in resp.json():
                        body = issue.get("body", "")
                        match = re.search(r"<!-- cognitive_learning_payload:\s*([\s\S]*?)\s*-->", body)
                        if match:
                            try:
                                payload = json.loads(match.group(1).strip())
                                cid = payload.get("canonical_id")
                                if cid:
                                    payload["github_issue_number"] = issue.get("number")
                                    payload["github_issue_url"] = issue.get("html_url")
                                    payload["github_issue_state"] = issue.get("state")
                                    if issue.get("state") == "closed":
                                        payload["status"] = "RESOLVED"
                                    items_by_id[cid] = payload
                            except Exception:
                                pass
        except Exception as gh_exc:
            logger.warning(f"[learning_synapse] Aviso ao consultar GitHub Issues: {gh_exc}")

    # Retorna lista ordenada por data
    result = list(items_by_id.values())
    result.sort(key=lambda x: str(x.get("created_at", "")), reverse=True)
    return result


async def review_cognitive_learning(
    canonical_id: str,
    action: str,  # "approve" | "reject"
    db: AsyncSession,
    refined_concept: str | None = None,
    refined_correction: str | None = None,
) -> dict[str, Any]:
    """Ação do Master Admin para Aprovar ou Rejeitar uma sinapse cognitiva aprendida."""
    import httpx

    learnings = await fetch_incoming_learnings()
    target = next((item for item in learnings if item.get("canonical_id") == canonical_id), None)
    if not target:
        target = {
            "canonical_id": canonical_id,
            "concept": refined_concept or "Conceito Geral",
            "correction": refined_correction or "",
            "mistake": "",
            "synapse_type": "RETIFICA_CONCEITO",
        }

    if refined_concept:
        target["concept"] = refined_concept
    if refined_correction:
        target["correction"] = refined_correction

    target["reviewed_at"] = datetime.now(timezone.utc).isoformat()
    target["status"] = "APPROVED" if action == "approve" else "REJECTED"

    # Salva no diretório de aprovados se aprovado
    if action == "approve":
        approved_file = APPROVED_DIR / f"{canonical_id}.json"
        with open(approved_file, "w", encoding="utf-8") as f:
            json.dump(target, f, ensure_ascii=False, indent=2)

        # Garante a existência do nó e da aresta no Postgres
        entity = await db.scalar(select(KnowledgeEntity).where(KnowledgeEntity.canonical_id == canonical_id))
        if not entity:
            entity = KnowledgeEntity(
                name=f"⚡ {target['concept']}",
                entity_type="APRENDIZADO_COGNITIVO",
                canonical_id=canonical_id,
                description=f"Retificação Aprovada: {target['correction']} | Equívoco: {target.get('mistake', '')}",
            )
            db.add(entity)
        else:
            entity.name = f"⚡ {target['concept']}"
            entity.description = f"Retificação Aprovada: {target['correction']} | Equívoco: {target.get('mistake', '')}"

        edge = await db.scalar(select(KnowledgeEdge).where(KnowledgeEdge.source_path == f"learning://{canonical_id}"))
        if not edge:
            edge = KnowledgeEdge(
                source_path=f"learning://{canonical_id}",
                target_path="REEF_SYSTEM_CORE",
                relation_type=target.get("synapse_type", "RETIFICA_CONCEITO"),
                description=f"Sinapse Aprovada pelo ADM: {target['correction']}",
                weight=3.0,
            )
            db.add(edge)
        await db.commit()

    # Fecha a Issue no GitHub se houver número associado
    issue_num = target.get("github_issue_number")
    if issue_num and settings.github_token and settings.github_repo:
        try:
            headers = {
                "Authorization": f"Bearer {settings.github_token}",
                "Accept": "application/vnd.github.v3+json",
                "User-Agent": "AXET-NeuralGraph-Agent",
            }
            api_url = f"https://api.github.com/repos/{settings.github_repo}/issues/{issue_num}"
            comment_text = (
                f"✅ **Sinapse Aprovada pelo Master Admin**\n\n"
                f"- **Conceito**: {target['concept']}\n"
                f"- **Correção Canônica**: {target['correction']}\n"
                f"Esta retificação foi incorporada ao Grafo Neural oficial."
                if action == "approve"
                else f"❌ **Sinapse Rejeitada pelo Master Admin**: Não incorporada à base canônica."
            )
            async with httpx.AsyncClient(timeout=10.0) as client:
                await client.post(f"{api_url}/comments", headers=headers, json={"body": comment_text})
                await client.patch(api_url, headers=headers, json={"state": "closed"})
        except Exception as gh_close_exc:
            logger.warning(f"[learning_synapse] Não foi possível fechar issue no GitHub: {gh_close_exc}")

    return target


async def compile_and_export_cognitive_pack(
    db: AsyncSession,
) -> dict[str, Any]:
    """Compila todas as sinapses cognitivas aprovadas em um pacote leve

    'axet_cognitive_synapses_latest.pack' pronto para distribuição global.
    """
    learnings = await fetch_incoming_learnings()
    approved = [item for item in learnings if item.get("status") == "APPROVED"]

    # Se não houver itens aprovados em disco, busca no Postgres todas as entidades de aprendizado
    if not approved:
        db_entities = (await db.scalars(
            select(KnowledgeEntity).where(KnowledgeEntity.entity_type == "APRENDIZADO_COGNITIVO")
        )).all()
        for ent in db_entities:
            approved.append({
                "canonical_id": ent.canonical_id,
                "concept": ent.name.replace("⚡ ", ""),
                "correction": ent.description,
                "mistake": "",
                "synapse_type": "RETIFICA_CONCEITO",
                "status": "APPROVED",
            })

    pack_data = {
        "pack_name": "axet_cognitive_synapses",
        "pack_version": datetime.now(timezone.utc).strftime("%Y.%m.%d.%H%M"),
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "synapses_count": len(approved),
        "synapses": approved,
    }

    pack_file = EXPORTS_DIR / "axet_cognitive_synapses_latest.pack"
    with open(pack_file, "w", encoding="utf-8") as f:
        json.dump(pack_data, f, ensure_ascii=False, indent=2)

    logger.info(f"[learning_synapse] Pacote de sinapses compilado com sucesso: {pack_file} ({len(approved)} sinapses)")
    return {
        "pack_file": str(pack_file),
        "filename": pack_file.name,
        "version": pack_data["pack_version"],
        "synapses_count": len(approved),
        "generated_at": pack_data["generated_at"],
    }


async def import_cognitive_pack(
    pack_data: dict[str, Any],
    db: AsyncSession,
) -> int:
    """Importa um pacote de sinapses (JSON) no PostgreSQL e no Qdrant local

    em tempo recorde (< 2 segundos).
    """
    synapses = pack_data.get("synapses", [])
    if not synapses:
        return 0

    embedder = get_embedder()
    qdrant_client = get_client()
    imported_count = 0

    for syn in synapses:
        cid = syn.get("canonical_id") or f"learn_{uuid.uuid4().hex[:8]}"
        concept = syn.get("concept", "Regra Geral")[:255]
        correction = syn.get("correction", "")
        mistake = syn.get("mistake", "")
        synapse_type = syn.get("synapse_type", "RETIFICA_CONCEITO")
        source_uri = f"learning://{cid}"

        # 1. Postgres Entity
        entity = await db.scalar(select(KnowledgeEntity).where(KnowledgeEntity.canonical_id == cid))
        if not entity:
            entity = KnowledgeEntity(
                name=f"⚡ {concept}",
                entity_type="APRENDIZADO_COGNITIVO",
                canonical_id=cid,
                description=f"Retificação Canônica: {correction} | Equívoco: {mistake}",
            )
            db.add(entity)
        else:
            entity.name = f"⚡ {concept}"
            entity.description = f"Retificação Canônica: {correction} | Equívoco: {mistake}"

        # 2. Postgres Edge
        edge = await db.scalar(select(KnowledgeEdge).where(KnowledgeEdge.source_path == source_uri))
        if not edge:
            edge = KnowledgeEdge(
                source_path=source_uri,
                target_path="REEF_SYSTEM_CORE",
                relation_type=synapse_type,
                description=f"Sinapse Oficial Aprovada: {correction}",
                weight=3.0,
            )
            db.add(edge)

        # 3. Qdrant Vector Upsert
        try:
            chunk_text = (
                f"### [APRENDIZADO COGNITIVO CONSOLIDADO - RETIFICAÇÃO EM TEMPO REAL]\n"
                f"Conceito / Regra: {concept}\n"
                f"Correção Canônica: {correction}\n"
                f"Contexto do Equívoco Corrigido: {mistake}\n"
                f"Diretriz Canônica: Esta retificação foi auto-gerada pelo assistente e deve ser seguida com prioridade máxima."
            )
            vectors = embedder.embed([chunk_text])
            if vectors:
                point_id = str(uuid.uuid4())
                point = PointStruct(
                    id=point_id,
                    vector=vectors[0],
                    payload={
                        "source_path": source_uri,
                        "title": f"Aprendizado Cognitivo: {concept}",
                        "text": chunk_text,
                        "breadcrumb": ["Aprendizados", "Sinapses Cognitivas", concept],
                        "is_cognitive_learning": True,
                        "concept": concept,
                        "correction": correction,
                        "mistake": mistake,
                        "canonical_id": cid,
                        "synapse_type": synapse_type,
                        "timestamp": datetime.now(timezone.utc).isoformat(),
                    },
                )
                qdrant_client.upsert(collection_name=settings.qdrant_collection, points=[point])
        except Exception as vec_exc:
            logger.warning(f"[learning_synapse] Erro ao vetorizar sinapse {cid}: {vec_exc}")

        imported_count += 1

    await db.commit()
    logger.info(f"[learning_synapse] {imported_count} sinapses cognitivas importadas com sucesso!")
    return imported_count


async def download_and_sync_global_pack(
    db: AsyncSession,
) -> dict[str, Any]:
    """Baixa o pacote oficial 'axet_cognitive_synapses_latest.pack' direto das Releases

    do GitHub (acesso público HTTP, ZERO necessidade de token/colaborador)
    e sincroniza as sinapses locais imediatamente.
    """
    import httpx

    target_url = settings.cognitive_pack_sync_url
    logger.info(f"[learning_synapse] Sincronizando pacote global de sinapses a partir de: {target_url}")

    async with httpx.AsyncClient(follow_redirects=True, timeout=60.0) as client:
        resp = await client.get(target_url)
        if resp.status_code >= 400:
            raise RuntimeError(f"Pacote oficial não encontrado (HTTP {resp.status_code}). O Administrador ainda não liberou um pacote global.")

        try:
            pack_data = resp.json()
        except Exception:
            raise ValueError("O arquivo baixado não é um pacote válido (.pack / JSON).")

        imported = await import_cognitive_pack(pack_data, db)
        return {
            "status": "success",
            "imported_count": imported,
            "version": pack_data.get("pack_version", "latest"),
            "synapses_count": pack_data.get("synapses_count", imported),
        }

