import json
import logging
import re
import uuid

from sqlalchemy import delete, select

from app.auth.database import AsyncSessionLocal
from app.config import settings
from app.knowledge.models import KnowledgeConflict, KnowledgeDocument, KnowledgeEdge
from app.llm.base import Message
from app.llm.factory import get_llm_client

logger = logging.getLogger(__name__)


def _extract_json_block(text: str) -> dict | list | None:
    """Extrai objeto ou array JSON de uma string com tolerância a blocos markdown ```json."""
    text = text.strip()
    match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", text)
    candidate = match.group(1).strip() if match else text

    # Tenta parsing direto
    try:
        return json.loads(candidate)
    except Exception:
        pass

    # Tenta encontrar primeiro '{' ou '[' e último '}' ou ']'
    start_brace = candidate.find("{")
    start_bracket = candidate.find("[")

    if start_brace != -1 and (start_bracket == -1 or start_brace < start_bracket):
        end_brace = candidate.rfind("}")
        if end_brace != -1:
            try:
                return json.loads(candidate[start_brace : end_brace + 1])
            except Exception:
                pass
    elif start_bracket != -1:
        end_bracket = candidate.rfind("]")
        if end_bracket != -1:
            try:
                return json.loads(candidate[start_bracket : end_bracket + 1])
            except Exception:
                pass

    return None


async def generate_document_summary_and_topics(text: str, title: str) -> tuple[str, list[str]]:
    """Gera um resumo executivo compacto (2-4 frases) e extrai tópicos-chave via LLM."""
    if not settings.cognitive_analysis_enabled:
        return (f"Documento {title}", [])

    llm = get_llm_client()

    # Limita o texto para não estourar o contexto caso o arquivo seja gigante
    sample_text = text[:8000]

    messages: list[Message] = [
        {
            "role": "system",
            "content": (
                "Você é um arquiteto de conhecimento. Analise o documento fornecido e gere:\n"
                "1. Um resumo executivo claro, de 2 a 4 frases, sintetizando o propósito e regras principais.\n"
                "2. Uma lista de 3 a 6 tópicos/palavras-chave representativas.\n"
                "Responda EXCLUSIVAMENTE em formato JSON com a estrutura:\n"
                '{"summary": "texto do resumo", "topics": ["topico1", "topico2"]}'
            ),
        },
        {
            "role": "user",
            "content": f"Título: {title}\n\nConteúdo:\n{sample_text}",
        },
    ]

    try:
        response_text = await llm.complete(messages)
        data = _extract_json_block(response_text)
        if isinstance(data, dict):
            summary = data.get("summary") or f"Documento sobre {title}"
            topics = [str(t).strip() for t in data.get("topics", []) if str(t).strip()]
            return (summary, topics)
    except Exception as exc:
        logger.warning(f"[cognitive] Erro ao gerar resumo/tópicos para '{title}': {exc}")

    # Fallback seguro
    fallback_summary = text[:280].strip().replace("\n", " ") + "..."
    return (fallback_summary, [])


async def analyze_cross_document_relations(
    new_doc_path: str,
    new_doc_title: str,
    new_doc_summary: str,
    new_doc_topics: list[str],
    existing_docs: list[KnowledgeDocument],
) -> tuple[list[dict], list[dict]]:
    """Compara o novo documento com os documentos já existentes para inferir arestas do grafo e conflitos."""
    if not existing_docs or not settings.cognitive_analysis_enabled:
        return ([], [])

    llm = get_llm_client()

    existing_context = [
        {
            "source_path": doc.source_path,
            "title": doc.title,
            "summary": doc.summary,
            "topics": doc.topics,
        }
        for doc in existing_docs[:30]  # Limite de segurança de contexto
    ]

    messages: list[Message] = [
        {
            "role": "system",
            "content": (
                "Você é um especialista em governança documental e GraphRAG. "
                "Sua tarefa é analisar um NOVO documento que acaba de entrar no sistema e compará-lo "
                "com a lista de DOCUMENTOS EXISTENTES.\n\n"
                "Identifique se há:\n"
                "1. RELAÇÕES (edges): Como o novo documento se relaciona com os existentes.\n"
                "   Tipos válidos: 'ATUALIZA', 'SUBSTITUI', 'COMPLEMENTA', 'REFERENCIA', 'DEPENDE_DE'.\n"
                "2. CONFLITOS OU OBSOLESCÊNCIAS (conflicts): Se há contradições, regras revogadas ou divergências normativas.\n"
                "   Tipos válidos: 'CONTRADICAO', 'OBSOLESCENCIA', 'DIVERGENCIA'.\n\n"
                "Responda EXCLUSIVAMENTE em formato JSON com o formato:\n"
                "{\n"
                '  "relations": [\n'
                '    {"target_path": "caminho_do_existente", "relation_type": "ATUALIZA", "description": "Explicação clara e objetiva"}\n'
                "  ],\n"
                '  "conflicts": [\n'
                '    {"target_path": "caminho_do_existente", "conflict_type": "OBSOLESCENCIA", "explanation": "Explicação da contradição ou regra antiga que foi substituída"}\n'
                "  ]\n"
                "}"
            ),
        },
        {
            "role": "user",
            "content": (
                f"NOVO DOCUMENTO:\n"
                f"Caminho: {new_doc_path}\n"
                f"Título: {new_doc_title}\n"
                f"Resumo: {new_doc_summary}\n"
                f"Tópicos: {', '.join(new_doc_topics)}\n\n"
                f"DOCUMENTOS EXISTENTES NA BASE:\n"
                f"{json.dumps(existing_context, ensure_ascii=False, indent=2)}"
            ),
        },
    ]

    try:
        response_text = await llm.complete(messages)
        data = _extract_json_block(response_text)
        if isinstance(data, dict):
            relations = data.get("relations") or []
            conflicts = data.get("conflicts") or []
            return (relations, conflicts)
    except Exception as exc:
        logger.warning(f"[cognitive] Erro ao inferir relações e conflitos para '{new_doc_path}': {exc}")

    return ([], [])


async def process_document_cognitive_evolution(
    doc_path: str,
    doc_title: str,
    doc_body: str,
    content_hash: str,
) -> dict:
    """Executa o ciclo completo de evolução cognitiva para um documento e persiste no PostgreSQL."""
    # 1. Gera resumo executivo e tópicos
    summary, topics = await generate_document_summary_and_topics(doc_body, doc_title)

    async with AsyncSessionLocal() as db:
        # 2. Carrega outros documentos para análise comparativa
        result = await db.scalars(
            select(KnowledgeDocument).where(KnowledgeDocument.source_path != doc_path)
        )
        existing_docs = result.all()

        # 3. Analisa relações de grafo e conflitos
        relations_raw, conflicts_raw = await analyze_cross_document_relations(
            new_doc_path=doc_path,
            new_doc_title=doc_title,
            new_doc_summary=summary,
            new_doc_topics=topics,
            existing_docs=existing_docs,
        )

        # 4. Limpa arestas antigas ou conflitos anteriores deste documento
        await db.execute(
            delete(KnowledgeEdge).where(
                (KnowledgeEdge.source_path == doc_path) | (KnowledgeEdge.target_path == doc_path)
            )
        )
        await db.execute(
            delete(KnowledgeConflict).where(
                (KnowledgeConflict.source_path_new == doc_path)
                | (KnowledgeConflict.source_path_existing == doc_path)
            )
        )

        # 5. Salva ou atualiza KnowledgeDocument
        existing_doc_row = await db.get(KnowledgeDocument, doc_path)
        if existing_doc_row:
            existing_doc_row.title = doc_title
            existing_doc_row.content_hash = content_hash
            existing_doc_row.summary = summary
            existing_doc_row.topics = topics
        else:
            db.add(
                KnowledgeDocument(
                    source_path=doc_path,
                    title=doc_title,
                    content_hash=content_hash,
                    summary=summary,
                    topics=topics,
                )
            )

        # 6. Salva as novas arestas do grafo
        valid_paths = {d.source_path for d in existing_docs}
        added_edges = 0
        for rel in relations_raw:
            target = rel.get("target_path")
            rel_type = (rel.get("relation_type") or "REFERENCIA").upper()
            desc = rel.get("description") or f"Relação entre {doc_path} e {target}"
            if target and target in valid_paths:
                db.add(
                    KnowledgeEdge(
                        id=uuid.uuid4(),
                        source_path=doc_path,
                        target_path=target,
                        relation_type=rel_type,
                        description=desc,
                    )
                )
                added_edges += 1

        # 7. Salva os novos conflitos/obsolescências detectados
        added_conflicts = 0
        for conf in conflicts_raw:
            target = conf.get("target_path")
            conf_type = (conf.get("conflict_type") or "DIVERGENCIA").upper()
            expl = conf.get("explanation") or "Divergência detectada entre os documentos."
            if target and target in valid_paths:
                db.add(
                    KnowledgeConflict(
                        id=uuid.uuid4(),
                        source_path_new=doc_path,
                        source_path_existing=target,
                        conflict_type=conf_type,
                        explanation=expl,
                    )
                )
                added_conflicts += 1

        await db.commit()

    logger.info(
        f"[cognitive] Processado '{doc_path}': summary={len(summary)} chars, "
        f"topics={len(topics)}, edges={added_edges}, conflicts={added_conflicts}"
    )

    return {
        "source_path": doc_path,
        "summary": summary,
        "topics": topics,
        "edges_count": added_edges,
        "conflicts_count": added_conflicts,
    }


async def remove_document_knowledge(doc_path: str) -> None:
    """Remove um documento excluído do grafo de conhecimento e conflitos."""
    async with AsyncSessionLocal() as db:
        await db.execute(delete(KnowledgeDocument).where(KnowledgeDocument.source_path == doc_path))
        await db.execute(
            delete(KnowledgeEdge).where(
                (KnowledgeEdge.source_path == doc_path) | (KnowledgeEdge.target_path == doc_path)
            )
        )
        await db.execute(
            delete(KnowledgeConflict).where(
                (KnowledgeConflict.source_path_new == doc_path)
                | (KnowledgeConflict.source_path_existing == doc_path)
            )
        )
        await db.commit()
    logger.info(f"[cognitive] Removido '{doc_path}' do grafo de conhecimento.")
