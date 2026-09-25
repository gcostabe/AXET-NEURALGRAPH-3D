import logging
import time
from functools import lru_cache

import httpx

from app.config import settings

logger = logging.getLogger(__name__)


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
    def __init__(
        self,
        api_url: str,
        api_key: str,
        model: str = "text-embedding-3-small",
        batch_size: int = 16,
    ):
        self._api_url = api_url.rstrip("/")
        self._api_key = api_key
        self._model = model
        self._batch_size = batch_size

    def _embed_batch(self, batch_texts: list[str]) -> list[list[float]]:
        headers = {
            "Authorization": f"Bearer {self._api_key}",
            "Content-Type": "application/json",
        }
        url = f"{self._api_url}/v1/embeddings"
        max_retries = 4

        for attempt in range(1, max_retries + 1):
            try:
                with httpx.Client(timeout=45.0) as client:
                    response = client.post(
                        url,
                        headers=headers,
                        json={"model": self._model, "input": batch_texts},
                    )
                    response.raise_for_status()
                    data = response.json()
                    return [item["embedding"] for item in data["data"]]
            except (httpx.RemoteProtocolError, httpx.ConnectError, httpx.ReadTimeout, httpx.TimeoutException) as exc:
                if attempt == max_retries:
                    logger.error(f"[embedder] Falha definitiva após {max_retries} tentativas: {exc}")
                    raise
                wait_time = 1.0 * attempt
                logger.warning(
                    f"[embedder] Tentativa {attempt} falhou ({exc}). Retentando em {wait_time}s..."
                )
                time.sleep(wait_time)
            except Exception as exc:
                logger.error(f"[embedder] Erro na requisição de embeddings: {exc}")
                raise

    def embed(self, texts: list[str]) -> list[list[float]]:
        if not texts:
            return []

        all_embeddings: list[list[float]] = []
        for i in range(0, len(texts), self._batch_size):
            chunk_batch = texts[i : i + self._batch_size]
            embeddings = self._embed_batch(chunk_batch)
            all_embeddings.extend(embeddings)

        return all_embeddings


@lru_cache(maxsize=1)
def get_embedder() -> Embedder:
    if settings.embedding_mode == "api":
        return ApiEmbedder(settings.embedding_api_url, settings.embedding_api_key)
    return LocalEmbedder(settings.embedding_model_local)

