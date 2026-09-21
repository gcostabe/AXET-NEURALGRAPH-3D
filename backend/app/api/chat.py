import json
import uuid

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.database import get_db
from app.auth.dependencies import get_current_user
from app.auth.models import Conversation, Message, User
from app.llm.base import Message as LLMMessage
from app.llm.factory import get_llm_client
from app.retrieval.search import build_context, search

router = APIRouter()

SYSTEM_PROMPT = (
    "Você é um assistente que responde perguntas com base exclusivamente no "
    "contexto fornecido abaixo, extraído da base de conhecimento local. "
    "Se a resposta não estiver no contexto, diga claramente que não sabe — "
    "nunca invente informação. Sempre cite a fonte (caminho do arquivo) "
    "quando usar uma informação do contexto."
)


class ChatRequest(BaseModel):
    message: str
    conversation_id: str | None = None
    top_k: int = 10


@router.post("/chat")
async def chat(
    request: ChatRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    conversation = await _get_or_create_conversation(db, request.conversation_id, current_user, request.message)

    history = await _load_history(db, conversation.id)

    chunks = search(request.message, top_k=request.top_k)
    context = build_context(chunks)

    messages: list[LLMMessage] = [
        {"role": "system", "content": f"{SYSTEM_PROMPT}\n\nContexto:\n{context}"},
        *history,
        {"role": "user", "content": request.message},
    ]

    user_message = Message(conversation_id=conversation.id, role="user", content=request.message)
    db.add(user_message)
    await db.commit()

    llm = get_llm_client()
    sources = [{"source_path": c.source_path, "title": c.title} for c in chunks]

    async def event_stream():
        collected = []
        yield f"event: sources\ndata: {json.dumps(sources)}\n\n"
        yield f"event: conversation\ndata: {json.dumps({'conversation_id': str(conversation.id)})}\n\n"
        async for token in llm.chat_stream(messages):
            collected.append(token)
            yield f"event: token\ndata: {json.dumps({'text': token})}\n\n"

        full_response = "".join(collected)
        async with db.begin():
            db.add(
                Message(
                    conversation_id=conversation.id,
                    role="assistant",
                    content=full_response,
                    sources=sources,
                )
            )

        yield "event: done\ndata: {}\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream")


async def _get_or_create_conversation(
    db: AsyncSession, conversation_id: str | None, current_user: User, first_message: str
) -> Conversation:
    if conversation_id is not None:
        conversation = await db.get(Conversation, conversation_id)
        if conversation is not None and conversation.user_id == current_user.id:
            return conversation

    conversation = Conversation(
        id=uuid.uuid4(),
        user_id=current_user.id,
        title=_derive_title(first_message),
    )
    db.add(conversation)
    await db.commit()
    await db.refresh(conversation)
    return conversation


def _derive_title(message: str) -> str:
    title = " ".join(message.strip().split())
    if not title:
        return "Nova conversa"
    max_len = 60
    if len(title) <= max_len:
        return title
    return title[:max_len].rstrip() + "…"


async def _load_history(db: AsyncSession, conversation_id: uuid.UUID) -> list[LLMMessage]:
    from sqlalchemy import select

    result = await db.scalars(
        select(Message).where(Message.conversation_id == conversation_id).order_by(Message.created_at)
    )
    return [{"role": m.role, "content": m.content} for m in result.all()]
