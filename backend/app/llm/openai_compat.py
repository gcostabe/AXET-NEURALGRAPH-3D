import asyncio
import json
import logging
from typing import AsyncIterator

import httpx

from app.llm.base import Message

logger = logging.getLogger(__name__)


class OpenAICompatClient:
    def __init__(self, base_url: str, api_key: str, model: str):
        self._base_url = base_url.rstrip("/")
        self._api_key = api_key
        self._model = model

    async def chat_stream(self, messages: list[Message]) -> AsyncIterator[str]:
        headers = {"Authorization": f"Bearer {self._api_key}"}
        payload = {"model": self._model, "messages": messages, "stream": True}

        max_retries = 2
        for attempt in range(max_retries):
            try:
                async with httpx.AsyncClient(timeout=120.0) as client:
                    async with client.stream(
                        "POST",
                        f"{self._base_url}/v1/chat/completions",
                        headers=headers,
                        json=payload,
                    ) as response:
                        response.raise_for_status()
                        async for line in response.aiter_lines():
                            if not line.startswith("data: "):
                                continue
                            data = line[len("data: "):]
                            if data == "[DONE]":
                                break
                            chunk = json.loads(data)
                            choices = chunk.get("choices") or []
                            if not choices:
                                # Alguns gateways enviam chunks intermediários sem
                                # choices (heartbeat, uso de tokens) — ignora.
                                continue
                            delta = choices[0].get("delta", {}).get("content")
                            if delta:
                                yield delta
                return
            except (httpx.HTTPStatusError, httpx.RequestError) as exc:
                is_retryable = (
                    (isinstance(exc, httpx.HTTPStatusError) and exc.response.status_code in (401, 502, 503, 504))
                    or isinstance(exc, httpx.RequestError)
                )
                if is_retryable and attempt < max_retries - 1:
                    logger.warning(
                        f"[OpenAICompatClient] Erro no stream do gateway ({exc}). "
                        f"Aguardando auto-refresh de token e retentando ({attempt + 2}/{max_retries})..."
                    )
                    await asyncio.sleep(2.0)
                    continue
                raise

    async def complete(self, messages: list[Message], temperature: float | None = None) -> str:
        headers = {"Authorization": f"Bearer {self._api_key}", "Content-Type": "application/json"}
        payload: dict = {
            "model": self._model,
            "messages": messages,
            "stream": False,
        }
        is_reasoning = any(x in (self._model or "").lower() for x in ["terra", "luna", "o1", "o3", "reasoning", "gpt-5"])
        if not is_reasoning and temperature is not None and temperature != 1.0:
            payload["temperature"] = temperature

        max_retries = 2
        for attempt in range(max_retries):
            try:
                async with httpx.AsyncClient(timeout=120.0) as client:
                    response = await client.post(
                        f"{self._base_url}/v1/chat/completions",
                        headers=headers,
                        json=payload,
                    )
                    response.raise_for_status()
                    data = response.json()
                    choices = data.get("choices") or []
                    if not choices:
                        return ""
                    return choices[0].get("message", {}).get("content", "") or ""
            except (httpx.HTTPStatusError, httpx.RequestError) as exc:
                is_retryable = (
                    (isinstance(exc, httpx.HTTPStatusError) and exc.response.status_code in (401, 502, 503, 504))
                    or isinstance(exc, httpx.RequestError)
                )
                if is_retryable and attempt < max_retries - 1:
                    logger.warning(
                        f"[OpenAICompatClient] Erro em complete ({exc}). "
                        f"Aguardando auto-refresh de token e retentando ({attempt + 2}/{max_retries})..."
                    )
                    await asyncio.sleep(2.0)
                    continue
                raise
