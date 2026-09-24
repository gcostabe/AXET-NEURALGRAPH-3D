import math
from app.knowledge.graph_embeddings import (
    GraphTopologicalEngine,
    blend_topological_vector,
    l2_normalize,
)
from app.retrieval.reranker import rerank_chunks
from app.retrieval.search import RetrievedChunk


def test_l2_normalize():
    vec = [3.0, 4.0]
    normed = l2_normalize(vec)
    mag = math.sqrt(sum(x * x for x in normed))
    assert abs(mag - 1.0) < 1e-4
    assert abs(normed[0] - 0.6) < 1e-4
    assert abs(normed[1] - 0.8) < 1e-4


def test_pagerank_hub_centrality():
    # Grafo estrela: 4 nós apontando para um nó central (hub)
    nodes = ["hub.md", "leaf1.md", "leaf2.md", "leaf3.md", "leaf4.md"]
    edges = [
        ("leaf1.md", "hub.md", 1.0),
        ("leaf2.md", "hub.md", 1.0),
        ("leaf3.md", "hub.md", 1.0),
        ("leaf4.md", "hub.md", 1.0),
        ("hub.md", "leaf1.md", 0.2),
    ]
    pr = GraphTopologicalEngine.calculate_pagerank(nodes, edges)

    # O hub central deve ter a maior pontuação de PageRank
    assert pr["hub.md"] == 1.0
    for leaf in ["leaf1.md", "leaf2.md", "leaf3.md", "leaf4.md"]:
        assert pr[leaf] < 1.0


def test_topological_affinity_1hop_and_2hop():
    nodes = ["doc_a.md", "doc_b.md", "doc_c.md", "doc_isolated.md"]
    edges = [
        ("doc_a.md", "doc_b.md", 0.90),
        ("doc_b.md", "doc_c.md", 0.80),
    ]
    affinity, neighbors = GraphTopologicalEngine.calculate_affinity_matrix(nodes, edges)

    # 1-Hop direto
    assert affinity.get(("doc_a.md", "doc_b.md"), 0.0) >= 0.90
    assert affinity.get(("doc_b.md", "doc_c.md"), 0.0) >= 0.80

    # 2-Hop transitivo (doc_a -> doc_b -> doc_c)
    assert affinity.get(("doc_a.md", "doc_c.md"), 0.0) > 0.35

    # Documento isolado tem afinidade 0.0
    assert affinity.get(("doc_a.md", "doc_isolated.md"), 0.0) == 0.0


def test_blend_topological_vector_attraction():
    # Vetor base ortogonal ao vizinho: Cosseno inicial = 0.0
    v_base = [1.0, 0.0, 0.0]
    v_neighbor = [0.0, 1.0, 0.0]

    blended = blend_topological_vector(v_base, [v_neighbor], weights=[1.0], blend_factor=0.20)

    # Norma L2 preservada
    mag = math.sqrt(sum(x * x for x in blended))
    assert abs(mag - 1.0) < 1e-4

    # Similaridade de cosseno com o vizinho deve ter aumentado de 0.0 para um valor positivo
    dot_product = sum(a * b for a, b in zip(blended, v_neighbor))
    assert dot_product > 0.15


def test_neighborhood_attraction():
    engine = GraphTopologicalEngine()
    engine._cached_nodes = {"seed.md", "neighbor.md", "isolated.md"}
    engine._cached_affinity = {
        ("neighbor.md", "seed.md"): 0.85,
        ("isolated.md", "seed.md"): 0.0,
    }
    engine._cached_pagerank = {"neighbor.md": 0.5, "isolated.md": 0.1}

    attraction = engine.get_neighborhood_attraction(
        candidate_sources=["neighbor.md", "isolated.md"],
        seed_sources=["seed.md"],
    )

    assert attraction["neighbor.md"] > 0.80
    assert attraction["isolated.md"] < 0.05


def test_rerank_with_topological_boost():
    candidates = [
        RetrievedChunk("doc_isolated.md", "Isolado", [], "Texto genérico.", 0.70),
        RetrievedChunk("doc_connected.md", "Conectado", [], "Texto relevante do módulo.", 0.65),
    ]

    # doc_connected possui alta atração topológica com os nós sementes do grafo
    topological_scores = {"doc_connected.md": 0.90, "doc_isolated.md": 0.0}

    reranked = rerank_chunks(
        "consulta do sistema",
        candidates,
        top_k=2,
        topological_scores=topological_scores,
    )

    # doc_connected recebe bônus topológico (+0.135) e ultrapassa doc_isolated
    assert reranked[0].source_path == "doc_connected.md"
