from dataclasses import dataclass

from qdrant_client import QdrantClient

from app.config import settings
from app.ingestion.embedder import get_embedder
from app.ingestion.vector_store import get_client


@dataclass
class RetrievedChunk:
    source_path: str
    title: str
    breadcrumb: list[str]
    text: str
    score: float


def search(query: str, top_k: int = 10) -> list[RetrievedChunk]:
    client: QdrantClient = get_client()
    embedder = get_embedder()

    query_vector = embedder.embed([query])[0]

    results = client.query_points(
        collection_name=settings.qdrant_collection,
        query=query_vector,
        limit=top_k,
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
    return chunks


def build_context(chunks: list[RetrievedChunk], max_chars: int = 8000) -> str:
    """Assembles retrieved chunks into a single context block with source citations,
    truncating once the character budget is exhausted."""
    parts = []
    total = 0
    for chunk in chunks:
        breadcrumb_str = " > ".join(chunk.breadcrumb) if chunk.breadcrumb else chunk.title
        block = f"[fonte: {chunk.source_path} — {breadcrumb_str}]\n{chunk.text}\n"
        if total + len(block) > max_chars:
            break
        parts.append(block)
        total += len(block)
    return "\n---\n".join(parts)
