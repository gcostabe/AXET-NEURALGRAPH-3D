import uuid
from app.knowledge.entity_extractor import (
    extract_entities_from_text,
    detect_entities_in_query,
    normalize_canonical_id,
)
from app.knowledge.models import KnowledgeEntity
from app.retrieval.reranker import rerank_chunks
from app.retrieval.search import RetrievedChunk, build_context


def test_normalize_canonical_id():
    assert normalize_canonical_id("Circular SUSEP nº 642/2021") == "CIRCULAR_SUSEP_NO_642_2021"
    assert normalize_canonical_id("TRON_01") == "TRON_01"
    assert normalize_canonical_id("Cláusula 14.2") == "CLAUSULA_14_2"


def test_extract_regulatory_entities():
    text = (
        "De acordo com a Circular SUSEP nº 642 e a Resolução CNSP 382, "
        "conforme previsto na Lei 10.406 e no Artigo 757 do Código Civil, "
        "o contrato de seguro deve ser estritamente cumprido."
    )
    entities = extract_entities_from_text(text)
    types = {e.entity_type for e in entities}
    names = [e.name for e in entities]

    assert "REGULATORIO" in types
    assert any("642" in n for n in names)
    assert any("382" in n for n in names)
    assert any("757" in n for n in names)


def test_extract_systems_and_modules():
    text = (
        "O componente TRON_01 integrado à API_PAYMENTS_GATEWAY "
        "processa dados no REEF.Core através do Módulo de Sinistros."
    )
    entities = extract_entities_from_text(text)
    canonicals = {e.canonical_id for e in entities}

    assert any("TRON_01" in c for c in canonicals)
    assert any("API_PAYMENTS_GATEWAY" in c for c in canonicals)
    assert any("REEF_CORE" in c for c in canonicals)
    assert any("MODULO_DE_SINISTROS" in c for c in canonicals)


def test_extract_clauses_and_deduplication():
    text = (
        "A Cláusula 14.2 das Condições Gerais estabelece a aplicação de Franquia Reduzida. "
        "A Cláusula 14.2 também prevê isenção do primeiro sinistro."
    )
    entities = extract_entities_from_text(text)
    clause = next((e for e in entities if "14" in e.canonical_id), None)

    assert clause is not None
    assert clause.count == 2  # Deduplicado e contado corretamente
    assert clause.entity_type == "CLAUSULA"


def test_detect_entities_in_query():
    query = "Como funciona a Circular 642 na liquidação do TRON_01 com Franquia Reduzida?"
    detected = detect_entities_in_query(query)
    canonicals = [d.canonical_id for d in detected]

    assert any("642" in c for c in canonicals)
    assert any("TRON_01" in c for c in canonicals)
    assert any("FRANQUIA_REDUZIDA" in c for c in canonicals)


def test_build_context_with_query_entities():
    chunks = [
        RetrievedChunk(
            source_path="normas/circular_642.md",
            title="Circular SUSEP 642",
            breadcrumb=["Normas"],
            text="Regulamenta o prazo de liquidação.",
            score=0.9,
        )
    ]
    query_entities = [
        (
            KnowledgeEntity(
                id=uuid.uuid4(),
                name="Circular SUSEP nº 642",
                entity_type="REGULATORIO",
                canonical_id="CIRCULAR_SUSEP_NO_642",
                description="Norma SUSEP de liquidação",
            ),
            ["normas/circular_642.md", "sinistros/manual_auto.md"],
        )
    ]
    context = build_context(chunks, query_entities=query_entities)

    assert "ENTIDADES CRÍTICAS RECONHECIDAS NA CONSULTA (Subgrafo NER)" in context
    assert "**[REGULATORIO]** Circular SUSEP nº 642" in context
    assert "normas/circular_642.md" in context


def test_rerank_with_entity_sources_bonus():
    candidates = [
        RetrievedChunk("doc_a.md", "Doc A", [], "Texto genérico sem menção.", 0.70),
        RetrievedChunk("doc_b.md", "Doc B", [], "Texto relevante oficial.", 0.65),
    ]
    # doc_b menciona a entidade crítica detectada
    entity_sources = {"doc_b.md"}
    reranked = rerank_chunks("consulta sobre norma", candidates, top_k=2, entity_sources=entity_sources)

    # doc_b recebe o bônus (+0.18) e ultrapassa doc_a
    assert reranked[0].source_path == "doc_b.md"
