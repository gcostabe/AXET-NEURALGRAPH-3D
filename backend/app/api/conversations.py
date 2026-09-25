import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.database import get_db
from app.auth.dependencies import get_current_user
from app.auth.models import Conversation, Message, User

router = APIRouter(prefix="/conversations", tags=["conversations"])


class SmartGreetingResponse(BaseModel):
    greeting: str
    has_history: bool
    subject: str | None = None
    conversation_id: str | None = None
    user_name: str
    time_greeting: str


@router.get("/greeting", response_model=SmartGreetingResponse)
async def get_smart_greeting(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Retorna uma saudação dinâmica, ultra-humanizada e descontraída com base no histórico de conversas."""
    user_name = "Colega"
    if current_user.email:
        raw_prefix = current_user.email.split("@")[0]
        parts = raw_prefix.split(".")
        if len(parts) >= 1 and parts[0]:
            candidate = parts[0].capitalize()
            if candidate.lower() in ("gcostabe", "gustavo"):
                user_name = "Gustavo"
            elif candidate.lower() == "admin":
                user_name = "Admin"
            else:
                user_name = candidate

    now_utc = datetime.now(timezone.utc)
    hour_local = (now_utc.hour - 3) % 24
    if 5 <= hour_local < 12:
        period_greeting = "Bom dia"
    elif 12 <= hour_local < 18:
        period_greeting = "Boa tarde"
    else:
        period_greeting = "Boa noite"

    latest_conv = await db.scalar(
        select(Conversation)
        .where(Conversation.user_id == current_user.id)
        .order_by(Conversation.updated_at.desc())
        .limit(1)
    )

    if latest_conv is None:
        return SmartGreetingResponse(
            greeting=f"E aí, {user_name}! {period_greeting}, tudo bem por aí? ☕ Seja muito bem-vindo ao AXET-NEURALGRAPH-3D! Este é o mapa cerebral do conhecimento corporativo. Quando quiser trocar uma ideia, tirar dúvidas ou explorar conexões, estou 100% pronto por aqui!",
            has_history=False,
            subject=None,
            conversation_id=None,
            user_name=user_name,
            time_greeting=period_greeting,
        )

    latest_msg = await db.scalar(
        select(Message)
        .where(Message.conversation_id == latest_conv.id, Message.role == "user")
        .order_by(Message.created_at.desc())
        .limit(1)
    )

    subject = latest_conv.title or ""
    if (not subject or subject.lower() in ("nova conversa", "conversa sem título")) and latest_msg and latest_msg.content:
        first_line = latest_msg.content.strip().split("\n")[0].rstrip("?.:!")
        subject = first_line[:50] + ("..." if len(first_line) > 50 else "")

    if not subject:
        subject = "seus tópicos de pesquisa anteriores"

    variations = [
        f"E aí, {user_name}! {period_greeting}, tudo bem por aí? ☕ Na nossa última conversa estávamos explorando \"{subject}\". Conseguiu encontrar todas as informações que precisava ou quer aprofundar mais um pouco? Estou por aqui!",
        f"Fala {user_name}! {period_greeting}! 🚀 Vi que na sua última interação você estava pesquisando sobre \"{subject}\". Conseguiu tirar todas as dúvidas daquele assunto ou quer trocar mais uma ideia a respeito?",
        f"{period_greeting}, {user_name}! Bom te ver de volta no universo neural. 🧠 Lembrei que estávamos falando sobre \"{subject}\". Deu tudo certo com o que você precisava ou quer continuar de onde paramos?",
    ]
    idx = (latest_conv.updated_at.minute if latest_conv.updated_at else 0) % len(variations)
    greeting_text = variations[idx]

    return SmartGreetingResponse(
        greeting=greeting_text,
        has_history=True,
        subject=subject,
        conversation_id=str(latest_conv.id),
        user_name=user_name,
        time_greeting=period_greeting,
    )


@router.get("")
async def list_my_conversations(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    conversations = await db.scalars(
        select(Conversation)
        .where(Conversation.user_id == current_user.id)
        .order_by(Conversation.updated_at.desc())
    )
    return conversations.all()


@router.get("/{conversation_id}/messages")
async def get_conversation_messages(
    conversation_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    conversation = await _get_own_conversation_or_404(db, conversation_id, current_user)
    messages = (await db.scalars(
        select(Message)
        .where(Message.conversation_id == conversation.id)
        .order_by(Message.created_at)
    )).all()

    msg_ids = [m.id for m in messages]
    from app.auth.models import MessageFeedback
    feedbacks = (await db.scalars(
        select(MessageFeedback)
        .where(MessageFeedback.message_id.in_(msg_ids), MessageFeedback.user_id == current_user.id)
    )).all() if msg_ids else []
    fb_map = {f.message_id: {"rating": f.rating, "reason": f.reason, "comment": f.comment} for f in feedbacks}

    return [
        {
            "id": str(m.id),
            "conversation_id": str(m.conversation_id),
            "role": m.role,
            "content": m.content,
            "sources": m.sources,
            "created_at": m.created_at.isoformat() if m.created_at else None,
            "feedback": fb_map.get(m.id),
            "learning": m.learning_metadata,
        }
        for m in messages
    ]



class UpdateConversationRequest(BaseModel):
    title: str


@router.patch("/{conversation_id}")
async def update_conversation_title(
    conversation_id: str,
    request: UpdateConversationRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    conversation = await _get_own_conversation_or_404(db, conversation_id, current_user)
    title = request.title.strip()
    if not title:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Title cannot be empty")
    conversation.title = title
    await db.commit()
    await db.refresh(conversation)
    return conversation


@router.delete("/{conversation_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_conversation(
    conversation_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    conversation = await _get_own_conversation_or_404(db, conversation_id, current_user)
    await db.execute(delete(Message).where(Message.conversation_id == conversation.id))
    await db.delete(conversation)
    await db.commit()


async def _get_own_conversation_or_404(
    db: AsyncSession, conversation_id: str, current_user: User
) -> Conversation:
    try:
        conv_uuid = uuid.UUID(conversation_id)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conversation not found")

    conversation = await db.get(Conversation, conv_uuid)
    if conversation is None or conversation.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conversation not found")
    return conversation

