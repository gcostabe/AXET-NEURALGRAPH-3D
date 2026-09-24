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
