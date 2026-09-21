from functools import lru_cache

import httpx

from app.config import settings


class Embedder:
    def embed(self, texts: list[str]) -> list[list[float]]:
        raise NotImplementedError


class LocalEmbedder(Embedder):
    def __init__(self, model_name: str):
        from sentence_transformers import SentenceTransformer

        self._model = SentenceTransformer(model_name)

    def embed(self, texts: list[str]) -> list[list[float]]:
        vectors = self._model.encode(texts, normalize_embeddings=True)
        return [v.tolist() for v in vectors]


class ApiEmbedder(Embedder):
    def __init__(self, api_url: str, api_key: str, model: str = "text-embedding-3-small"):
        self._api_url = api_url.rstrip("/")
        self._api_key = api_key
        self._model = model

    def embed(self, texts: list[str]) -> list[list[float]]:
        headers = {"Authorization": f"Bearer {self._api_key}"}
        response = httpx.post(
            f"{self._api_url}/v1/embeddings",
            headers=headers,
            json={"model": self._model, "input": texts},
            timeout=60.0,
        )
        response.raise_for_status()
        data = response.json()
        return [item["embedding"] for item in data["data"]]


@lru_cache(maxsize=1)
def get_embedder() -> Embedder:
    if settings.embedding_mode == "api":
        return ApiEmbedder(settings.embedding_api_url, settings.embedding_api_key)
    return LocalEmbedder(settings.embedding_model_local)
