from typing import AsyncIterator, Protocol, TypedDict


class Message(TypedDict):
    role: str  # "system" | "user" | "assistant"
    content: str


class LLMClient(Protocol):
    async def chat_stream(self, messages: list[Message]) -> AsyncIterator[str]:
        """Yields response text chunks as they arrive."""
        ...
