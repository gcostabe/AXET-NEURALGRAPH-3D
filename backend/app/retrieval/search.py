from dataclasses import dataclass

from qdrant_client import QdrantClient
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.ingestion.embedder import get_embedder
from app.ingestion.vector_store import get_client
from app.knowledge.models import KnowledgeConflict, KnowledgeDocument, KnowledgeEdge
from app.retrieval.reranker import rerank_chunks


@dataclass
class RetrievedChunk:
    source_path: str
    title: str
    breadcrumb: list[str]
    text: str
    score: float


def search(query: str, top_k: int = 10, enable_rerank: bool = True) -> list[RetrievedChunk]:
    client: QdrantClient = get_client()
    embedder = get_embedder()

    query_vector = embedder.embed([query])[0]

    # Busca ampla de candidatos para reclassificação profunda
    candidate_limit = max(top_k * 3, 20) if enable_rerank else top_k

    results = client.query_points(
        collection_name=settings.qdrant_collection,
        query=query_vector,
        limit=candidate_limit,
        with_payload=True,
    ).points

    chunks = []
    for point in results:
        payload = point.payload or {}
        chunks.append(
            RetrievedChunk(
                source_path=payload.get("source_path", ""),
                title=payload.get("title", ""),
                breadcrumb=payload.get("breadcrumb", []),
                text=payload.get("text", ""),
                score=point.score,
            )
        )

    if enable_rerank:
        return rerank_chunks(query, chunks, top_k=top_k)

    return chunks[:top_k]



CONCEPTUAL_QUERY_KEYWORDS = (
    "o que e", "o que é", "oque e", "oque é",
    "que es", "que é", "what is", "visao geral", "visão geral",
    "panorama", "arquitetura", "arquitectura", "para que serve",
    "qual o conceito", "principais modulos", "principais módulos",
    "estrutura geral", "resumo do reef", "sobre o reef", "explica o reef",
    "explique o reef", "entender o reef", "o que significa reef",
)


def is_conceptual_query(query: str) -> bool:
    q = query.lower().strip()
    return any(kw in q for kw in CONCEPTUAL_QUERY_KEYWORDS) or (len(q.split()) <= 4 and "reef" in q)


async def get_document_summaries_for_sources(
    db: AsyncSession,
    source_paths: list[str],
    query: str = "",
    max_summaries: int = 6,
) -> list[KnowledgeDocument]:
    """Busca resumos executivos dos documentos identificados.
    Se a pergunta for conceitual/ampla, também agrega resumos de documentos estruturantes do REEF."""
    docs: list[KnowledgeDocument] = []
    seen_paths: set[str] = set()

    # 1. Resumos dos documentos retornados no top-k
    if source_paths:
        result = await db.scalars(
            select(KnowledgeDocument).where(KnowledgeDocument.source_path.in_(source_paths))
        )
        for doc in result.all():
            if doc.source_path not in seen_paths:
                docs.append(doc)
                seen_paths.add(doc.source_path)

    # 2. Se a pergunta for ampla/conceitual, complementa com documentos seminais de visão geral do REEF
    if is_conceptual_query(query):
        overview_q = select(KnowledgeDocument).where(
            KnowledgeDocument.title.ilike("%reef%") |
            KnowledgeDocument.title.ilike("%introduc%") |
            KnowledgeDocument.summary.ilike("%reef.core%") |
            KnowledgeDocument.summary.ilike("%sistema tron%")
        ).limit(max_summaries)
        overview_docs = (await db.scalars(overview_q)).all()
        for doc in overview_docs:
            if doc.source_path not in seen_paths:
                docs.append(doc)
                seen_paths.add(doc.source_path)

    return docs[:max_summaries]


async def get_graph_context_for_sources(
    db: AsyncSession,
    source_paths: list[str],
) -> tuple[list[KnowledgeEdge], list[KnowledgeConflict]]:
    """Busca conexões do Grafo de Conhecimento e alertas de conflito para os documentos recuperados."""
    if not source_paths:
        return ([], [])

    edges_result = await db.scalars(
        select(KnowledgeEdge).where(
            KnowledgeEdge.source_path.in_(source_paths) | KnowledgeEdge.target_path.in_(source_paths)
        )
    )
    edges = list(edges_result.all())

    conflicts_result = await db.scalars(
        select(KnowledgeConflict).where(
            (KnowledgeConflict.source_path_new.in_(source_paths) | KnowledgeConflict.source_path_existing.in_(source_paths))
            & (KnowledgeConflict.resolved == False)  # noqa: E712
        )
    )
    conflicts = list(conflicts_result.all())

    return (edges, conflicts)


def build_context(
    chunks: list[RetrievedChunk],
    edges: list[KnowledgeEdge] | None = None,
    conflicts: list[KnowledgeConflict] | None = None,
    doc_summaries: list[KnowledgeDocument] | None = None,
    max_chars: int = 9000,
) -> str:
    """Monta o bloco de contexto contendo resumos executivos, trechos de documentos,
    conexões do grafo e alertas de obsolescência/conflitos normativos."""
    parts = []
    total = 0

    # 1. Alertas de Conflito e Obsolescência (Alta prioridade)
    if conflicts:
        conflict_lines = [
            "### [ALERTAS DE CONFLITOS E OBSOLESCÊNCIA ENTRE DOCUMENTOS]",
            "Atenção: Foram detectadas divergências/atualizações entre os documentos citados:",
        ]
        for c in conflicts:
            conflict_lines.append(
                f"- [{c.conflict_type}] Entre '{c.source_path_new}' e '{c.source_path_existing}': {c.explanation}"
            )
        conflict_lines.append(
            "(Diretriz para resposta: Informe o usuário sobre a divergência e dê preferência às regras do documento mais recente).\n"
        )
        conflict_block = "\n".join(conflict_lines)
        parts.append(conflict_block)
        total += len(conflict_block)

    # 2. Resumos Executivos de Alto Nível (Hierarchical Context)
    if doc_summaries:
        summary_lines = ["### [RESUMOS EXECUTIVOS & VISÃO GERAL DE DOCUMENTOS ESTRUTURANTES]"]
        for d in doc_summaries:
            topics_str = f" (Tópicos: {', '.join(d.topics)})" if d.topics else ""
            summary_lines.append(
                f"- **{d.title}** [`{d.source_path}`]: {d.summary}{topics_str}"
            )
        summary_lines.append("")
        summary_block = "\n".join(summary_lines)
        parts.append(summary_block)
        total += len(summary_block)

    # 3. Grafo de Conhecimento Relacional (GraphRAG)
    if edges:
        edge_lines = ["### [RELAÇÕES DO GRAFO DE CONHECIMENTO (GraphRAG)]"]
        for e in edges:
            edge_lines.append(
                f"- '{e.source_path}' --[{e.relation_type}]--> '{e.target_path}': {e.description}"
            )
        edge_lines.append("")
        edge_block = "\n".join(edge_lines)
        parts.append(edge_block)
        total += len(edge_block)

    # 4. Chunks de texto dos documentos
    for chunk in chunks:
        breadcrumb_str = " > ".join(chunk.breadcrumb) if chunk.breadcrumb else chunk.title
        block = f"[fonte: {chunk.source_path} — {breadcrumb_str}]\n{chunk.text}\n"
        if total + len(block) > max_chars:
            break
        parts.append(block)
        total += len(block)

    return "\n---\n".join(parts)

