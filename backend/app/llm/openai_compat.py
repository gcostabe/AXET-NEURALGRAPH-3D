import json
from typing import AsyncIterator

import httpx

from app.llm.base import Message


class OpenAICompatClient:
    def __init__(self, base_url: str, api_key: str, model: str):
        self._base_url = base_url.rstrip("/")
        self._api_key = api_key
        self._model = model

    async def chat_stream(self, messages: list[Message]) -> AsyncIterator[str]:
        headers = {"Authorization": f"Bearer {self._api_key}"}
        payload = {"model": self._model, "messages": messages, "stream": True}

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
