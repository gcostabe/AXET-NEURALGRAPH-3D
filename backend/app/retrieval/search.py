from dataclasses import dataclass
from typing import Any

from qdrant_client import QdrantClient
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.ingestion.embedder import get_embedder
from app.ingestion.vector_store import get_client
from app.knowledge.entity_extractor import detect_entities_in_query
from app.knowledge.graph_embeddings import topological_engine
from app.knowledge.models import (
    KnowledgeConflict,
    KnowledgeDocument,
    KnowledgeEdge,
    KnowledgeEntity,
    KnowledgeEntityMention,
)
from app.retrieval.reranker import rerank_chunks


@dataclass
class RetrievedChunk:
    source_path: str
    title: str
    breadcrumb: list[str]
    text: str
    score: float
    topological_score: float = 0.0


def search(
    query: str,
    top_k: int = 10,
    enable_rerank: bool = True,
    entity_sources: set[str] | None = None,
    topological_scores: dict[str, float] | None = None,
) -> list[RetrievedChunk]:
    client: QdrantClient = get_client()
    embedder = get_embedder()

    query_vector = embedder.embed([query])[0]

    # 1. Busca Dedicada de Aprendizados Cognitivos e Sinapses Retificadoras
    cognitive_chunks: list[RetrievedChunk] = []
    try:
        from qdrant_client.models import FieldCondition, Filter, MatchValue
        cog_results = client.query_points(
            collection_name=settings.qdrant_collection,
            query=query_vector,
            query_filter=Filter(
                must=[FieldCondition(key="is_cognitive_learning", match=MatchValue(value=True))]
            ),
            limit=5,
            with_payload=True,
        ).points

        for cp in cog_results:
            # Limiar semântico mínimo para capturar retificações relevantes (>= 0.35)
            if cp.score >= 0.35:
                payload = cp.payload or {}
                cognitive_chunks.append(
                    RetrievedChunk(
                        source_path=payload.get("source_path", ""),
                        title=payload.get("title", "⚡ Aprendizado Cognitivo"),
                        breadcrumb=payload.get("breadcrumb", ["Aprendizados", "Sinapses"]),
                        text=payload.get("text", ""),
                        score=1.5 + cp.score,
                        topological_score=1.0,
                    )
                )
    except Exception as cog_err:
        import logging
        logging.getLogger(__name__).warning(f"[search] Falha na busca dedicada de aprendizado cognitivo: {cog_err}")

    # 2. Busca ampla de candidatos do acervo documental
    candidate_limit = max(top_k * 3, 20) if enable_rerank else top_k

    results = client.query_points(
        collection_name=settings.qdrant_collection,
        query=query_vector,
        limit=candidate_limit,
        with_payload=True,
    ).points

    chunks = []
    seen_sources = {c.source_path for c in cognitive_chunks}
    for point in results:
        payload = point.payload or {}
        src = payload.get("source_path", "")
        if src in seen_sources:
            continue
        chunks.append(
            RetrievedChunk(
                source_path=src,
                title=payload.get("title", ""),
                breadcrumb=payload.get("breadcrumb", []),
                text=payload.get("text", ""),
                score=point.score,
            )
        )

    all_candidates = cognitive_chunks + chunks

    if enable_rerank:
        # Se topological_scores não foi fornecido explicitamente, calcula atração a partir dos nós semente
        if topological_scores is None and topological_engine.is_valid():
            seed_sources = [c.source_path for c in all_candidates[:3] if c.source_path]
            candidate_sources = [c.source_path for c in all_candidates if c.source_path]
            topological_scores = topological_engine.get_neighborhood_attraction(candidate_sources, seed_sources)

        reranked = rerank_chunks(
            query,
            all_candidates,
            top_k=top_k,
            entity_sources=entity_sources,
            topological_scores=topological_scores,
        )
        if topological_scores:
            for c in reranked:
                c.topological_score = topological_scores.get(c.source_path, 0.0)
        return reranked

    return all_candidates[:top_k]



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


RELATION_PRIORITY_WEIGHTS = {
    "SUBSTITUI": 10.0,
    "DEPENDE_DE": 9.0,
    "ATUALIZA": 8.0,
    "COMPLEMENTA": 6.0,
    "REFERENCIA": 4.0,
}


async def get_graph_context_for_sources(
    db: AsyncSession,
    source_paths: list[str],
    enable_multihop: bool = True,
    max_hop2_edges: int = 8,
    max_hop2_docs: int = 4,
) -> tuple[list[KnowledgeEdge], list[KnowledgeConflict], list[KnowledgeEdge], list[KnowledgeDocument]]:
    """Busca conexões do Grafo de Conhecimento (1-Hop direto e 2-Hop transitivo) e alertas de conflito.

    Retorna:
        (hop1_edges, conflicts, hop2_edges, hop2_docs)
    """
    if not source_paths:
        return ([], [], [], [])

    unique_sources = set(source_paths)

    # 1. Recupera arestas de 1-Hop (conectadas diretamente aos documentos recuperados)
    edges_result = await db.scalars(
        select(KnowledgeEdge).where(
            KnowledgeEdge.source_path.in_(source_paths) | KnowledgeEdge.target_path.in_(source_paths)
        )
    )
    hop1_edges = list(edges_result.all())

    # 2. Recupera conflitos diretos de 1-Hop
    conflicts_result = await db.scalars(
        select(KnowledgeConflict).where(
            (KnowledgeConflict.source_path_new.in_(source_paths) | KnowledgeConflict.source_path_existing.in_(source_paths))
            & (KnowledgeConflict.resolved == False)  # noqa: E712
        )
    )
    conflicts = list(conflicts_result.all())

    hop2_edges: list[KnowledgeEdge] = []
    hop2_docs: list[KnowledgeDocument] = []

    if not enable_multihop or not hop1_edges:
        return (hop1_edges, conflicts, hop2_edges, hop2_docs)

    # 3. Identifica os vizinhos de 1-Hop que não são os próprios documentos recuperados
    hop1_neighbors: set[str] = set()
    for e in hop1_edges:
        if e.source_path in unique_sources and e.target_path not in unique_sources:
            hop1_neighbors.add(e.target_path)
        elif e.target_path in unique_sources and e.source_path not in unique_sources:
            hop1_neighbors.add(e.source_path)

    if not hop1_neighbors:
        return (hop1_edges, conflicts, hop2_edges, hop2_docs)

    # 4. Busca arestas de 2-Hop conectadas aos vizinhos de 1-Hop
    hop2_candidates_q = select(KnowledgeEdge).where(
        (KnowledgeEdge.source_path.in_(hop1_neighbors) | KnowledgeEdge.target_path.in_(hop1_neighbors))
    )
    hop2_candidates = (await db.scalars(hop2_candidates_q)).all()

    seen_edge_ids = {e.id for e in hop1_edges}
    filtered_hop2: list[tuple[float, KnowledgeEdge]] = []

    for edge in hop2_candidates:
        if edge.id in seen_edge_ids:
            continue

        rel_type = (edge.relation_type or "REFERENCIA").upper()
        base_priority = RELATION_PRIORITY_WEIGHTS.get(rel_type, 3.0)
        score = base_priority * float(edge.weight or 1.0)
        filtered_hop2.append((score, edge))

    filtered_hop2.sort(key=lambda x: x[0], reverse=True)
    hop2_edges = [edge for _, edge in filtered_hop2[:max_hop2_edges]]

    # 5. Coleta nós ancestrais/sucessores de 2-Hop novos para resgatar resumos executivos
    hop2_node_paths: set[str] = set()
    for edge in hop2_edges:
        if edge.source_path not in unique_sources and edge.source_path not in hop1_neighbors:
            hop2_node_paths.add(edge.source_path)
        if edge.target_path not in unique_sources and edge.target_path not in hop1_neighbors:
            hop2_node_paths.add(edge.target_path)

    if hop2_node_paths:
        docs_q = select(KnowledgeDocument).where(
            KnowledgeDocument.source_path.in_(list(hop2_node_paths)[:max_hop2_docs])
        )
        hop2_docs = list((await db.scalars(docs_q)).all())

        # Verifica se há conflitos ativos envolvendo os nós de 2-Hop que afetam normas vigentes
        hop2_conflicts_q = select(KnowledgeConflict).where(
            (KnowledgeConflict.source_path_new.in_(hop2_node_paths) | KnowledgeConflict.source_path_existing.in_(hop2_node_paths))
            & (KnowledgeConflict.resolved == False)  # noqa: E712
        )
        extra_conflicts = (await db.scalars(hop2_conflicts_q)).all()
        seen_conflict_ids = {c.id for c in conflicts}
        for ec in extra_conflicts:
            if ec.id not in seen_conflict_ids:
                conflicts.append(ec)
                seen_conflict_ids.add(ec.id)

    return (hop1_edges, conflicts, hop2_edges, hop2_docs)


async def get_query_entities_context(
    db: AsyncSession,
    query: str,
    max_entities: int = 6,
) -> tuple[list[tuple[KnowledgeEntity, list[str]]], set[str]]:
    """Identifica entidades citadas na consulta (NER) e recupera os documentos que as mencionam formalmente.

    Retorna:
        (query_entities, matched_source_paths)
    """
    detected = detect_entities_in_query(query)
    if not detected:
        return ([], set())

    canonical_ids = [d.canonical_id for d in detected][:max_entities]
    entities_res = await db.scalars(
        select(KnowledgeEntity).where(KnowledgeEntity.canonical_id.in_(canonical_ids))
    )
    entities = list(entities_res.all())
    if not entities:
        return ([], set())

    entity_ids = [e.id for e in entities]
    mentions_res = await db.scalars(
        select(KnowledgeEntityMention).where(KnowledgeEntityMention.entity_id.in_(entity_ids))
    )
    mentions = list(mentions_res.all())

    mentions_by_entity: dict[Any, list[str]] = {}
    all_matched_sources: set[str] = set()
    for m in mentions:
        mentions_by_entity.setdefault(m.entity_id, []).append(m.source_path)
        all_matched_sources.add(m.source_path)

    results: list[tuple[KnowledgeEntity, list[str]]] = []
    for e in entities:
        docs = mentions_by_entity.get(e.id, [])
        results.append((e, docs))

    # 2. Busca entidades de aprendizado cognitivo relacionadas à consulta
    try:
        import re
        from sqlalchemy import or_
        query_words = [w.lower() for w in re.findall(r"\b\w{4,}\b", query) if w.lower() not in {"qual", "quais", "existe", "existem", "poderia", "descrever", "todos", "todas", "sobre", "como"}]
        if query_words:
            conditions = [KnowledgeEntity.name.ilike(f"%{w}%") for w in query_words[:4]]
            cog_entities_res = await db.scalars(
                select(KnowledgeEntity).where(
                    KnowledgeEntity.entity_type == "APRENDIZADO_COGNITIVO",
                    or_(*conditions)
                ).limit(3)
            )
            for cog_ent in cog_entities_res.all():
                if not any(e.id == cog_ent.id for e in entities):
                    entities.append(cog_ent)
                    results.append((cog_ent, [f"learning://{cog_ent.canonical_id}"]))
                    all_matched_sources.add(f"learning://{cog_ent.canonical_id}")
    except Exception:
        pass

    return (results, all_matched_sources)


def build_context(
    chunks: list[RetrievedChunk],
    edges: list[KnowledgeEdge] | None = None,
    conflicts: list[KnowledgeConflict] | None = None,
    doc_summaries: list[KnowledgeDocument] | None = None,
    hop2_edges: list[KnowledgeEdge] | None = None,
    hop2_docs: list[KnowledgeDocument] | None = None,
    query_entities: list[tuple[KnowledgeEntity, list[str]]] | None = None,
    max_chars: int = 9000,
) -> str:
    """Monta o bloco de contexto contendo resumos executivos, trechos de documentos,
    conexões do grafo (1-Hop direto e 2-Hop Multi-Hop), entidades do subgrafo NER e alertas de obsolescência."""
    parts = []
    total = 0

    # 0. Sinapses de Aprendizado Cognitivo Autônomo (Prioridade Máxima de Assimilação)
    learning_chunks = [c for c in chunks if c.source_path.startswith("learning://") or "APRENDIZADO COGNITIVO" in c.text]
    if learning_chunks:
        learn_lines = [
            "### [APRENDIZADOS E RETIFICAÇÕES CONSOLIDADAS PELO SISTEMA (Sinapses Cognitivas)]",
            "ATENÇÃO MÁXIMA: O assistente identificou e retificou anteriormente o(s) seguinte(s) conceito(s).",
            "Estas retificações representam a verdade canônica atualizada e DEVEM ter prevalência absoluta sobre afirmações anteriores ou regras divergentes:",
        ]
        for lc in learning_chunks:
            learn_lines.append(f"- {lc.text.strip()}")

        learn_lines.append(
            "\n🚨 DIRETRIZ EPISTÊMICA DE RESPOSTA:"
            "\n1. Incorpore diretamente este aprendizado consolidado como a verdade canônica vigente."
            "\n2. NUNCA repita equívocos que foram retificados por este aprendizado (por exemplo, listas incompletas ou incorretas de tipos de expediente)."
            "\n3. Se qualquer documento legado ou FAQ abaixo afirmar uma regra diferente da retificação acima, essa afirmação antiga FOI RETIFICADA e deve ser desconsiderada.\n"
        )
        learn_block = "\n".join(learn_lines)
        parts.append(learn_block)
        total += len(learn_block)
        # Remove os chunks de aprendizado da lista padrão para evitar redundância
        chunks = [c for c in chunks if c not in learning_chunks]

        # Anota documentos legados que contenham menções óbvias ao erro superado
        for c in chunks:
            lower_c = c.text.lower()
            lower_src = c.source_path.lower()
            if (
                "faq-canonica-que-tipo-de-expedientes-existe" in lower_src
                or ("regularização" in lower_c and "homologação" in lower_c)
                or ("regularizacao" in lower_c and "homologacao" in lower_c)
            ):
                c.text = f"[⚠️ ATENÇÃO: CONTEÚDO SUPERSEDIDO PELA RETIFICAÇÃO COGNITIVA ACIMA - NÃO UTILIZAR ESTA REGRA]\n{c.text}"

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

    # 2. Entidades Críticas da Consulta (Subgrafo NER)
    if query_entities:
        entity_lines = [
            "### [ENTIDADES CRÍTICAS RECONHECIDAS NA CONSULTA (Subgrafo NER)]",
            "Atenção: A consulta cita entidades regulatórias, sistemas ou cláusulas mapeadas no subgrafo:",
        ]
        for ent, doc_paths in query_entities:
            paths_str = f" (Mencionada em: {', '.join(f'`{p}`' for p in doc_paths[:4])})" if doc_paths else ""
            entity_lines.append(f"- **[{ent.entity_type}]** {ent.name}{paths_str}")
        entity_lines.append(
            "(Diretriz: Dê prioridade factual estrita às definições, regras e limites que vinculam estas entidades específicas).\n"
        )
        entity_block = "\n".join(entity_lines)
        parts.append(entity_block)
        total += len(entity_block)

    # 2. Resumos Executivos de Alto Nível (Hierarchical Context 1-Hop e 2-Hop)
    summary_lines = []
    if doc_summaries:
        summary_lines.append("### [RESUMOS EXECUTIVOS & VISÃO GERAL DE DOCUMENTOS]")
        for d in doc_summaries:
            topics_str = f" (Tópicos: {', '.join(d.topics)})" if d.topics else ""
            summary_lines.append(
                f"- **{d.title}** [`{d.source_path}`]: {d.summary}{topics_str}"
            )

    if hop2_docs:
        if not summary_lines:
            summary_lines.append("### [RESUMOS EXECUTIVOS & VISÃO GERAL DE DOCUMENTOS]")
        summary_lines.append("\n**[Documentos Estruturantes / Ancestrais Identificados via Grafo (2-Hop)]:**")
        for d in hop2_docs:
            topics_str = f" (Tópicos: {', '.join(d.topics)})" if d.topics else ""
            summary_lines.append(
                f"- **{d.title}** [`{d.source_path}`]: {d.summary}{topics_str}"
            )

    if summary_lines:
        summary_lines.append("")
        summary_block = "\n".join(summary_lines)
        parts.append(summary_block)
        total += len(summary_block)

    # 3. Grafo de Conhecimento Relacional (GraphRAG: 1-Hop e Multi-Hop 2-Hop)
    edge_lines = []
    if edges or hop2_edges:
        edge_lines.append("### [RELAÇÕES DO GRAFO DE CONHECIMENTO (GraphRAG)]")
        if edges:
            edge_lines.append("**Conexões Diretas (1-Hop):**")
            for e in edges:
                edge_lines.append(
                    f"- '{e.source_path}' --[{e.relation_type}]--> '{e.target_path}': {e.description}"
                )
        if hop2_edges:
            edge_lines.append("\n**Cadeias de Dependência Transitiva (2-Hop Reasoning):**")
            for e in hop2_edges:
                edge_lines.append(
                    f"- (2-Hop) '{e.source_path}' --[{e.relation_type}]--> '{e.target_path}': {e.description}"
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

