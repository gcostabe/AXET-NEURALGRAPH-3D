import uuid
from app.knowledge.models import KnowledgeConflict, KnowledgeDocument, KnowledgeEdge
from app.retrieval.search import RetrievedChunk, build_context


def test_build_context_with_2hop_and_ancestor_docs():
    """Valida se o prompt gerado pelo build_context exibe conexões 1-Hop,
    cadeias transitivas de 2-Hop e resumos de documentos ancestrais do Grafo."""
    chunks = [
        RetrievedChunk(
            source_path="sinistros/manual_auto.md",
            title="Manual Sinistro Auto",
            breadcrumb=["Sinistros", "Automóvel", "Regras"],
            text="Regra geral para liquidação de sinistros de casco.",
            score=0.88,
        )
    ]

    doc_summaries = [
        KnowledgeDocument(
            source_path="sinistros/manual_auto.md",
            title="Manual Sinistro Auto",
            content_hash="abc123hash",
            summary="Manual operacional para abertura e regulação de sinistros auto.",
            topics=["sinistro", "auto", "liquidação"],
        )
    ]

    # 1-Hop: Sinistro Auto depende do Motor TRON
    hop1_edges = [
        KnowledgeEdge(
            id=uuid.uuid4(),
            source_path="sinistros/manual_auto.md",
            target_path="core/motor_tron.md",
            relation_type="DEPENDE_DE",
            description="Utiliza a esteira TRON para cálculo e liquidação financeira.",
            weight=1.0,
        )
    ]

    # 2-Hop: Motor TRON referencia Circular SUSEP 642
    hop2_edges = [
        KnowledgeEdge(
            id=uuid.uuid4(),
            source_path="core/motor_tron.md",
            target_path="normas/circular_susep_642.md",
            relation_type="REFERENCIA",
            description="Atende integralmente aos limites e prazos previstos na Circular 642.",
            weight=1.0,
        )
    ]

    # Documento ancestral descoberto via 2-Hop
    hop2_docs = [
        KnowledgeDocument(
            source_path="normas/circular_susep_642.md",
            title="Circular SUSEP nº 642/2021",
            content_hash="susep642hash",
            summary="Dispõe sobre as regras e critérios para operação de seguros de danos e prazos de liquidação.",
            topics=["susep", "circular 642", "regulação"],
        )
    ]

    conflicts = [
        KnowledgeConflict(
            id=uuid.uuid4(),
            source_path_new="sinistros/manual_auto.md",
            source_path_existing="sinistros/manual_antigo_2022.md",
            conflict_type="OBSOLESCENCIA",
            explanation="Manual antigo previa franquia não aplicável mais vigente.",
            resolved=False,
        )
    ]

    context = build_context(
        chunks=chunks,
        edges=hop1_edges,
        conflicts=conflicts,
        doc_summaries=doc_summaries,
        hop2_edges=hop2_edges,
        hop2_docs=hop2_docs,
    )

    # 1. Alertas de conflito
    assert "ALERTAS DE CONFLITOS E OBSOLESCÊNCIA" in context
    assert "Manual antigo previa franquia" in context

    # 2. Resumos executivos 1-Hop
    assert "Manual Sinistro Auto" in context
    assert "Manual operacional para abertura e regulação" in context

    # 3. Resumos executivos ancestrais 2-Hop
    assert "Documentos Estruturantes / Ancestrais Identificados via Grafo (2-Hop)" in context
    assert "Circular SUSEP nº 642/2021" in context
    assert "regras e critérios para operação de seguros de danos" in context

    # 4. Relações de 1-Hop e 2-Hop
    assert "RELAÇÕES DO GRAFO DE CONHECIMENTO (GraphRAG)" in context
    assert "Conexões Diretas (1-Hop):" in context
    assert "'sinistros/manual_auto.md' --[DEPENDE_DE]--> 'core/motor_tron.md'" in context
    assert "Cadeias de Dependência Transitiva (2-Hop Reasoning):" in context
    assert "(2-Hop) 'core/motor_tron.md' --[REFERENCIA]--> 'normas/circular_susep_642.md'" in context

    # 5. Chunks factuais
    assert "Regra geral para liquidação de sinistros de casco." in context


def test_build_context_graceful_empty_2hop():
    """Valida que quando não há 2-hop o contexto permanece consistente sem erros."""
    chunks = [
        RetrievedChunk(
            source_path="doc.md",
            title="Doc",
            breadcrumb=["Geral"],
            text="Texto teste.",
            score=0.9,
        )
    ]
    context = build_context(chunks, edges=None, hop2_edges=None, hop2_docs=None)
    assert "Texto teste." in context
    assert "(2-Hop)" not in context
