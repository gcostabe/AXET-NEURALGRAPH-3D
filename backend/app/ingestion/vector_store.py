import uuid

from qdrant_client import QdrantClient
from qdrant_client.http import models as qmodels

from app.config import settings


def get_client() -> QdrantClient:
    return QdrantClient(host=settings.qdrant_host, port=settings.qdrant_port)


def ensure_collection(client: QdrantClient, vector_size: int) -> None:
    existing = [c.name for c in client.get_collections().collections]
    if settings.qdrant_collection in existing:
        return
    client.create_collection(
        collection_name=settings.qdrant_collection,
        vectors_config=qmodels.VectorParams(
            size=vector_size, distance=qmodels.Distance.COSINE
        ),
    )


def delete_by_source_path(client: QdrantClient, source_path: str) -> None:
    client.delete(
        collection_name=settings.qdrant_collection,
        points_selector=qmodels.FilterSelector(
            filter=qmodels.Filter(
                must=[
                    qmodels.FieldCondition(
                        key="source_path", match=qmodels.MatchValue(value=source_path)
                    )
                ]
            )
        ),
    )


def upsert_chunks(
    client: QdrantClient,
    vectors: list[list[float]],
    payloads: list[dict],
) -> None:
    points = [
        qmodels.PointStruct(id=str(uuid.uuid4()), vector=vector, payload=payload)
        for vector, payload in zip(vectors, payloads)
    ]
    client.upsert(collection_name=settings.qdrant_collection, points=points)


def get_indexed_hashes(client: QdrantClient) -> dict[str, str]:
    """Returns {source_path: content_hash} for all points currently indexed."""
    result: dict[str, str] = {}
    offset = None
    while True:
        points, offset = client.scroll(
            collection_name=settings.qdrant_collection,
            with_payload=["source_path", "content_hash"],
            with_vectors=False,
            limit=256,
            offset=offset,
        )
        for point in points:
            payload = point.payload or {}
            source_path = payload.get("source_path")
            content_hash = payload.get("content_hash")
            if source_path:
                result[source_path] = content_hash
        if offset is None:
            break
    return result
