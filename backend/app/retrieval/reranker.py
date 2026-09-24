"""Módulo de Re-ranking Híbrido de Alta Precisão para RAG Corporativo.

Combina:
1. Similaridade Semântica Densa (Score Vetorial Cosseno do Qdrant).
2. Casamento Lexical Exato (Frequência de Termos e Bônus de Frase / BM25 simplificado).
3. Bônus de Título, Breadcrumb e Metadados Estruturais.
"""

from __future__ import annotations

import math
import re
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.retrieval.search import RetrievedChunk

PORTUGUESE_STOPWORDS = {
    "a", "ao", "aos", "as", "com", "como", "da", "das", "de", "do", "dos",
    "e", "em", "na", "nas", "no", "nos", "o", "os", "para", "por", "que",
    "se", "um", "uma", "uns", "umas", "ou", "mas", "qual", "quais", "onde",
    "como", "quando", "quem", "este", "esta", "estes", "estas", "esse", "essa",
}


def _tokenize(text: str) -> list[str]:
    """Tokeniza texto em palavras minúsculas sem pontuação excessiva."""
    return [
        t.lower()
        for t in re.findall(r"[\w\-\.\_]+", text)
        if len(t) > 1 and t.lower() not in PORTUGUESE_STOPWORDS
    ]


def calculate_lexical_score(query_tokens: list[str], text: str, full_query: str) -> float:
    """Calcula pontuação lexical com base em frequência, termos técnicos e correspondência de frase exata."""
    if not query_tokens or not text:
        return 0.0

    lower_text = text.lower()
    matches = 0
    technical_bonus = 0.0

    for token in query_tokens:
        count = lower_text.count(token)
        if count > 0:
            # Termos com números, underscores ou hífens (ex: TRON_01, Def_07, 2026) são altamente específicos
            is_technical = bool(re.search(r"\d|[\_\-]", token)) or len(token) >= 7
            weight = 2.0 if is_technical else 1.0
            matches += math.log1p(count) * weight
            if is_technical:
                technical_bonus += 0.25

    base_score = min(1.0, (matches / (len(query_tokens) * 1.8)))

    # Bônus se a frase exata ou subsequência de 3+ palavras aparecer
    phrase_bonus = 0.0
    clean_query = full_query.strip().lower()
    if len(clean_query) > 8 and clean_query in lower_text:
        phrase_bonus = 0.35

    return min(1.0, base_score + technical_bonus + phrase_bonus)


def calculate_structural_score(query_tokens: list[str], title: str, breadcrumb: list[str], source_path: str) -> float:
    """Calcula bônus se os termos da busca aparecem no título, caminho ou cabeçalhos."""
    if not query_tokens:
        return 0.0

    header_text = f"{title} {' '.join(breadcrumb)} {source_path}".lower()
    hits = sum(1 for t in query_tokens if t in header_text)
    return min(1.0, hits / max(1, len(query_tokens)))


def rerank_chunks(
    query: str,
    candidates: list[RetrievedChunk],
    top_k: int = 10,
    dense_weight: float = 0.50,
    lexical_weight: float = 0.35,
    structural_weight: float = 0.15,
    entity_sources: set[str] | None = None,
) -> list[RetrievedChunk]:
    """Reclassifica os candidatos recuperados da busca vetorial usando pontuação composta híbrida.

    Pondera similaridade vetorial densa, correspondência lexical exata, metadados
    estruturais e bônus para documentos que mencionam entidades críticas da consulta.
    """
    if not candidates:
        return []

    query_tokens = _tokenize(query)

    for chunk in candidates:
        # 1. Normaliza score vetorial (geralmente entre 0 e 1, ou -1 e 1)
        raw_dense = getattr(chunk, "score", 0.5)
        dense_norm = max(0.0, min(1.0, (raw_dense + 1.0) / 2.0 if raw_dense < 0 else raw_dense))

        # 2. Score lexical no texto do chunk
        lexical_score = calculate_lexical_score(query_tokens, chunk.text, query)

        # 3. Score estrutural nos metadados de cabeçalho
        structural_score = calculate_structural_score(
            query_tokens,
            chunk.title or "",
            chunk.breadcrumb or [],
            chunk.source_path or "",
        )

        # 4. Score composto ponderado
        final_score = (
            dense_norm * dense_weight
            + lexical_score * lexical_weight
            + structural_score * structural_weight
        )

        # 5. Bônus para documentos com menção direta a entidades críticas da consulta (Subgrafo NER)
        if entity_sources and chunk.source_path in entity_sources:
            final_score = min(1.0, final_score + 0.18)

        chunk.score = round(final_score, 4)

    # Ordena decrescente pelo score re-rankeado
    candidates.sort(key=lambda c: c.score, reverse=True)

    return candidates[:top_k]
