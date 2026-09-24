"""Motor de Grafos e Projeções Topológicas Neurais (Graph-Augmented Embeddings).

Permite:
1. Cálculo de centralidade de grau e PageRank ponderado do grafo documental do REEF.
2. Construção da matriz de afinidade topológica (1-hop e 2-hop) com base nas sinapses.
3. Operador de suavização por vizinhança (GCN 1st-order message passing) para enriquecimento vetorial.
4. Cálculo em tempo de consulta de atração topológica entre candidatos e sementes primárias.
"""

from __future__ import annotations

import logging
import math
import time
from dataclasses import dataclass, field
from typing import Any

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.knowledge.models import KnowledgeDocument, KnowledgeEdge

logger = logging.getLogger(__name__)

# Pesos semânticos de transmissão topológica por tipo de aresta
RELATION_TOPOLOGICAL_WEIGHTS: dict[str, float] = {
    "SUBSTITUI": 1.00,
    "DEPENDE_DE": 0.95,
    "ATUALIZA": 0.85,
    "COMPLEMENTA": 0.65,
    "REFERENCIA": 0.45,
}

DEFAULT_RELATION_WEIGHT = 0.50


@dataclass
class TopologyMetrics:
    total_nodes: int
    total_edges: int
    graph_density: float
    top_pagerank: list[dict[str, Any]]
    top_degrees: list[dict[str, Any]]
    computed_at: float = field(default_factory=time.time)


class GraphTopologicalEngine:
    """Motor singleton em memória para análise topológica e projeção de vizinhança."""

    def __init__(self) -> None:
        self._cached_nodes: set[str] = set()
        self._cached_degrees: dict[str, int] = {}
        self._cached_pagerank: dict[str, float] = {}
        self._cached_affinity: dict[tuple[str, str], float] = {}
        self._cached_neighbors: dict[str, list[tuple[str, float]]] = {}
        self._last_computed: float = 0.0
        self._cache_ttl: float = 300.0  # 5 minutos de cache em memória

    def invalidate(self) -> None:
        """Invalida o cache topológico forçando recálculo na próxima chamada."""
        self._last_computed = 0.0
        logger.info("[GraphTopology] Cache topológico invalidado com sucesso.")

    def is_valid(self) -> bool:
        return (time.time() - self._last_computed) < self._cache_ttl and len(self._cached_nodes) > 0

    @staticmethod
    def calculate_pagerank(
        nodes: list[str],
        edges: list[tuple[str, str, float]],
        damping: float = 0.85,
        max_iter: int = 25,
        tol: float = 1e-5,
    ) -> dict[str, float]:
        """Calcula o PageRank ponderado analítico puro em Python (sem dependências externas)."""
        n = len(nodes)
        if n == 0:
            return {}
        if n == 1:
            return {nodes[0]: 1.0}

        # Mapeia vizinhos saintes e pesos acumulados
        out_weights: dict[str, float] = {u: 0.0 for u in nodes}
        in_edges: dict[str, list[tuple[str, float]]] = {u: [] for u in nodes}

        for src, dst, w in edges:
            if src in out_weights and dst in in_edges:
                out_weights[src] += w
                in_edges[dst].append((src, w))

        # Distribuição inicial uniforme
        initial_val = 1.0 / n
        pr = {u: initial_val for u in nodes}
        base_jump = (1.0 - damping) / n

        for _ in range(max_iter):
            dangling_sum = sum(pr[u] for u in nodes if out_weights[u] == 0.0)
            dangling_contrib = damping * (dangling_sum / n)

            new_pr: dict[str, float] = {}
            diff = 0.0

            for u in nodes:
                incoming_sum = 0.0
                for src, w in in_edges[u]:
                    src_out = out_weights[src]
                    if src_out > 0:
                        incoming_sum += pr[src] * (w / src_out)

                score = base_jump + dangling_contrib + (damping * incoming_sum)
                new_pr[u] = score
                diff += abs(score - pr[u])

            pr = new_pr
            if diff < tol:
                break

        # Normaliza para que o máximo seja 1.0 para facilidade de visualização relativa
        max_pr = max(pr.values()) if pr else 1.0
        if max_pr > 0:
            return {k: round(v / max_pr, 4) for k, v in pr.items()}
        return pr

    @staticmethod
    def calculate_affinity_matrix(
        nodes: list[str],
        edges: list[tuple[str, str, float]],
    ) -> tuple[dict[tuple[str, str], float], dict[str, list[tuple[str, float]]]]:
        """Calcula a afinidade topológica de 1-hop e 2-hop entre documentos interligados."""
        adjacency: dict[str, dict[str, float]] = {u: {} for u in nodes}
        neighbors_map: dict[str, list[tuple[str, float]]] = {u: [] for u in nodes}

        # 1-Hop direto
        for src, dst, w in edges:
            if src in adjacency and dst in adjacency:
                # Transmissão bidirecional com viés direcionado (0.8 no sentido inverso)
                current_direct = adjacency[src].get(dst, 0.0)
                adjacency[src][dst] = max(current_direct, w)

                current_reverse = adjacency[dst].get(src, 0.0)
                adjacency[dst][src] = max(current_reverse, w * 0.80)

        for u in nodes:
            neighbors_map[u] = [(v, w) for v, w in adjacency[u].items()]

        # 2-Hop transitivo atenuado (fator 0.55)
        affinity_matrix: dict[tuple[str, str], float] = {}
        for u in nodes:
            for v, w1 in adjacency[u].items():
                affinity_matrix[(u, v)] = max(affinity_matrix.get((u, v), 0.0), w1)

                # Expansão para vizinhos de vizinhos
                for z, w2 in adjacency[v].items():
                    if z != u:
                        hop2_w = round(w1 * w2 * 0.55, 3)
                        current = affinity_matrix.get((u, z), 0.0)
                        if hop2_w > current:
                            affinity_matrix[(u, z)] = hop2_w

        return affinity_matrix, neighbors_map

    async def sync_from_db(self, db: AsyncSession) -> None:
        """Sincroniza o grafo do PostgreSQL e reconstrói as métricas analíticas."""
        # 1. Carrega todos os documentos
        doc_stmt = select(KnowledgeDocument.source_path)
        doc_results = await db.scalars(doc_stmt)
        nodes = list(doc_results.all())

        if not nodes:
            self._cached_nodes = set()
            self._cached_degrees = {}
            self._cached_pagerank = {}
            self._cached_affinity = {}
            self._cached_neighbors = {}
            self._last_computed = time.time()
            return

        # 2. Carrega todas as arestas relacionais
        edge_stmt = select(
            KnowledgeEdge.source_path,
            KnowledgeEdge.target_path,
            KnowledgeEdge.relation_type,
            KnowledgeEdge.weight,
        )
        edge_results = await db.execute(edge_stmt)
        raw_edges = edge_results.all()

        weighted_edges: list[tuple[str, str, float]] = []
        degrees: dict[str, int] = {u: 0 for u in nodes}

        for src, dst, rel, raw_weight in raw_edges:
            rel_type = (rel or "").strip().upper()
            rel_factor = RELATION_TOPOLOGICAL_WEIGHTS.get(rel_type, DEFAULT_RELATION_WEIGHT)
            edge_weight = float(raw_weight or 1.0) * rel_factor
            weighted_edges.append((src, dst, edge_weight))

            if src in degrees:
                degrees[src] += 1
            if dst in degrees:
                degrees[dst] += 1

        # 3. Calcula PageRank e Afinidade Topológica
        pagerank = self.calculate_pagerank(nodes, weighted_edges)
        affinity_matrix, neighbors_map = self.calculate_affinity_matrix(nodes, weighted_edges)

        # 4. Atualiza estado do cache
        self._cached_nodes = set(nodes)
        self._cached_degrees = degrees
        self._cached_pagerank = pagerank
        self._cached_affinity = affinity_matrix
        self._cached_neighbors = neighbors_map
        self._last_computed = time.time()

        logger.info(
            "[GraphTopology] Sincronização concluída: %d nós, %d arestas, %d pares de afinidade topológica.",
            len(nodes),
            len(weighted_edges),
            len(affinity_matrix),
        )

    async def get_or_sync(self, db: AsyncSession) -> None:
        if not self.is_valid():
            await self.sync_from_db(db)

    def get_topological_affinity(self, source_a: str, source_b: str) -> float:
        """Retorna a afinidade topológica pré-calculada entre dois documentos [0.0, 1.0]."""
        if source_a == source_b:
            return 1.0
        return self._cached_affinity.get((source_a, source_b), 0.0)

    def get_neighborhood_attraction(
        self,
        candidate_sources: list[str],
        seed_sources: list[str],
    ) -> dict[str, float]:
        """Calcula a atração topológica de vizinhança entre os documentos candidatos e os documentos semente."""
        if not seed_sources:
            return {c: 0.0 for c in candidate_sources}

        attraction_map: dict[str, float] = {}
        for c in candidate_sources:
            max_aff = 0.0
            for s in seed_sources:
                aff = self.get_topological_affinity(c, s)
                if aff > max_aff:
                    max_aff = aff
            # Incorpora leve bônus de PageRank do nó candidato (centralidade)
            pr_bonus = self._cached_pagerank.get(c, 0.0) * 0.15
            total_attraction = min(1.0, max_aff + pr_bonus)
            attraction_map[c] = round(total_attraction, 4)

        return attraction_map

    def get_metrics(self) -> TopologyMetrics:
        """Gera sumário estatístico da topologia neural para telemetria corporativa."""
        total_nodes = len(self._cached_nodes)
        total_edges = sum(len(neigh) for neigh in self._cached_neighbors.values()) // 2
        possible_edges = (total_nodes * (total_nodes - 1)) / 2 if total_nodes > 1 else 1
        density = round(total_edges / possible_edges, 4) if possible_edges > 0 else 0.0

        top_pr = sorted(
            [{"source_path": k, "pagerank": v} for k, v in self._cached_pagerank.items()],
            key=lambda x: x["pagerank"],
            reverse=True,
        )[:10]

        top_deg = sorted(
            [{"source_path": k, "degree": v} for k, v in self._cached_degrees.items()],
            key=lambda x: x["degree"],
            reverse=True,
        )[:10]

        return TopologyMetrics(
            total_nodes=total_nodes,
            total_edges=total_edges,
            graph_density=density,
            top_pagerank=top_pr,
            top_degrees=top_deg,
            computed_at=self._last_computed,
        )


# Instância global do motor topológico
topological_engine = GraphTopologicalEngine()


def l2_normalize(vector: list[float]) -> list[float]:
    """Normaliza um vetor para norma Euclidiana unitária (L2 = 1.0)."""
    norm = math.sqrt(sum(x * x for x in vector))
    if norm < 1e-9:
        return vector
    return [round(x / norm, 7) for x in vector]


def blend_topological_vector(
    base_vector: list[float],
    neighbor_vectors: list[list[float]],
    weights: list[float] | None = None,
    blend_factor: float = 0.15,
) -> list[float]:
    """Aplica suavização por convolução gráfica (GCN message-passing) no vetor semântico.

    Combina o vetor base do chunk com a representação agregada da sua vizinhança topológica,
    garantindo que nós adjacentes no grafo se atraiam no espaço vetorial e preservando norma L2 unitária.
    """
    if not neighbor_vectors or blend_factor <= 0.0:
        return l2_normalize(base_vector)

    dim = len(base_vector)
    if weights is None or len(weights) != len(neighbor_vectors):
        weights = [1.0] * len(neighbor_vectors)

    total_weight = sum(weights)
    if total_weight <= 0.0:
        return l2_normalize(base_vector)

    # 1. Agrega a vizinhança topológica (média ponderada)
    aggregated_neighbor = [0.0] * dim
    for vec, w in zip(neighbor_vectors, weights):
        for i in range(dim):
            aggregated_neighbor[i] += vec[i] * w

    for i in range(dim):
        aggregated_neighbor[i] /= total_weight

    # 2. Interpolação convexa entre vetor do chunk e vizinhança do grafo
    alpha = max(0.0, min(0.5, blend_factor))
    blended = [
        ((1.0 - alpha) * base_vector[i]) + (alpha * aggregated_neighbor[i])
        for i in range(dim)
    ]

    # 3. Preservação estrita da norma unitária para busca por similaridade de cosseno
    return l2_normalize(blended)
