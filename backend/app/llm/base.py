from typing import Any, AsyncIterator, Protocol, TypedDict


class Message(TypedDict):
    role: str  # "system" | "user" | "assistant"
    content: str | list[Any] | Any



class LLMClient(Protocol):
    async def chat_stream(self, messages: list[Message]) -> AsyncIterator[str]:
        """Yields response text chunks as they arrive."""
        ...

    async def complete(self, messages: list[Message], temperature: float = 0.2) -> str:
        """Executa chamada não-streaming retornando a resposta completa como string."""
        ...
