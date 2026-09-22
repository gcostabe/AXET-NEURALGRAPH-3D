import json
from typing import AsyncIterator

import httpx

from app.llm.base import Message


class AnthropicCompatClient:
    def __init__(self, base_url: str, api_key: str, model: str):
        self._base_url = base_url.rstrip("/")
        self._api_key = api_key
        self._model = model

    async def chat_stream(self, messages: list[Message]) -> AsyncIterator[str]:
        system_messages = [m["content"] for m in messages if m["role"] == "system"]
        conversation = [m for m in messages if m["role"] != "system"]

        headers = {
            "x-api-key": self._api_key,
            "anthropic-version": "2023-06-01",
        }
        payload = {
            "model": self._model,
            "system": "\n".join(system_messages) if system_messages else None,
            "messages": conversation,
            "max_tokens": 4096,
            "stream": True,
        }

        async with httpx.AsyncClient(timeout=120.0) as client:
            async with client.stream(
                "POST",
                f"{self._base_url}/v1/messages",
                headers=headers,
                json=payload,
            ) as response:
                response.raise_for_status()
                async for line in response.aiter_lines():
                    if not line.startswith("data: "):
                        continue
                    event = json.loads(line[len("data: "):])
                    if event.get("type") == "content_block_delta":
                        delta = event.get("delta", {}).get("text")
                        if delta:
                            yield delta

    async def complete(self, messages: list[Message], temperature: float = 0.2) -> str:
        system_messages = [m["content"] for m in messages if m["role"] == "system"]
        conversation = [m for m in messages if m["role"] != "system"]

        headers = {
            "x-api-key": self._api_key,
            "anthropic-version": "2023-06-01",
            "Content-Type": "application/json",
        }
        payload = {
            "model": self._model,
            "system": "\n".join(system_messages) if system_messages else None,
            "messages": conversation,
            "max_tokens": 4096,
            "temperature": temperature,
        }

        async with httpx.AsyncClient(timeout=120.0) as client:
            response = await client.post(
                f"{self._base_url}/v1/messages",
                headers=headers,
                json=payload,
            )
            response.raise_for_status()
            data = response.json()
            content_blocks = data.get("content") or []
            texts = [b.get("text", "") for b in content_blocks if b.get("type") == "text"]
            return "".join(texts)
