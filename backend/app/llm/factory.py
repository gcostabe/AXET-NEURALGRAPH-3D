from functools import lru_cache

from app.config import settings
from app.llm.anthropic_compat import AnthropicCompatClient
from app.llm.base import LLMClient
from app.llm.openai_compat import OpenAICompatClient


@lru_cache(maxsize=1)
def get_llm_client() -> LLMClient:
    if settings.llm_provider == "anthropic":
        return AnthropicCompatClient(
            base_url=settings.llm_gateway_url,
            api_key=settings.llm_gateway_api_key,
            model=settings.llm_model,
        )
    return OpenAICompatClient(
        base_url=settings.llm_gateway_url,
        api_key=settings.llm_gateway_api_key,
        model=settings.llm_model,
    )
