import json
import uuid

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.database import get_db
from app.auth.dependencies import get_current_user
from app.auth.models import Conversation, Message, MessageFeedback, User
from app.llm.base import Message as LLMMessage
from app.llm.factory import get_llm_client
from app.retrieval.search import (
    build_context,
    get_document_summaries_for_sources,
    get_graph_context_for_sources,
    search,
)

router = APIRouter()

SYSTEM_PROMPT = (
    "Você é o Assistente Especialista Privado da NTT DATA para o Ecossistema REEF e Regulação de Seguros da MAPFRE.\n"
    "IMPORTANTE — AMBIENTE 100% LOCAL E DE DOMÍNIO FECHADO:\n"
    "Você opera estritamente em ambiente corporativo fechado e NÃO POSSUI ACESSO À INTERNET.\n"
    "É EXPRESSAMENTE PROIBIDO responder a perguntas utilizando conhecimentos externos, fatos da internet, notícias mundiais ou política externa (como presidentes de países, governos, eleições, celebridades ou fatos gerais) que não constem nos documentos locais fornecidos no 'Contexto:'.\n\n"
    "DIRETRIZES FUNDAMENTAIS DE SEGURANÇA E FIDELIDADE:\n"
    "1. Ancoragem Estrita no Contexto Local: Responda APENAS e EXCLUSIVAMENTE com base nas informações documentadas no bloco 'Contexto:' abaixo.\n"
    "2. Recusa Obrigatória de Perguntas Fora da Base: Se a pergunta do usuário tratar de tópicos ausentes dos documentos (por exemplo: presidentes, governantes, notícias da internet, dados mundiais externos), você DEVE OBRIGATORIAMENTE RECUSAR, respondendo com clareza:\n"
    "   'Esta informação não consta na base de conhecimento local do REEF. Como assistente corporativo local e privado, não realizo buscas na internet e meu escopo é restrito exclusivamente aos manuais técnicos, sistemas e normas regulatórias indexadas no ambiente.'\n"
    "3. Síntese Técnica & Profundidade: Para dúvidas legítimas sobre o sistema REEF, seus módulos (TRON, Sinistros, Tesouraria, Contabilidade, etc.) e regulação de seguros presentes na base, forneça respostas completas, didáticas e bem estruturadas.\n"
    "4. Citação Elegante de Fontes: Cite sempre os documentos locais de referência consultados.\n"
    "5. Espelhamento de Idioma: Responda sempre no mesmo idioma em que a pergunta foi feita."
)


class ChatRequest(BaseModel):
    message: str
    conversation_id: str | None = None
    top_k: int = 10


def is_refusal_or_not_found(text: str) -> bool:
    """Detecta se a resposta do assistente indica ausência de informação ou recusa por escopo fechado."""
    if not text:
        return True
    t = text.lower()
    markers = [
        "não consta na base",
        "não consta no contexto",
        "não consta nos documentos",
        "não constam na base",
        "esta informação não consta",
        "essas informações não constam",
        "não foi possível encontrar",
        "não foram encontradas",
        "não encontrei nenhuma",
        "não encontrei informações",
        "não há informações",
        "não há menção",
        "não possui informações",
        "não realizo buscas na internet",
        "escopo é restrito exclusivamente",
        "não está presente no contexto",
        "não há informação suficiente",
        "não tenho, no contexto",
        "fora do escopo",
        "não localizei na base",
        "não foram localizadas",
        "não constam referências",
        "não temos essa informação",
    ]
    return any(m in t for m in markers)


@router.post("/chat")
async def chat(
    request: ChatRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    conversation = await _get_or_create_conversation(db, request.conversation_id, current_user, request.message)

    history = await _load_history(db, conversation.id)

    chunks = search(request.message, top_k=request.top_k)
    unique_paths = list({c.source_path for c in chunks if c.source_path})
    edges, conflicts = await get_graph_context_for_sources(db, unique_paths)
    doc_summaries = await get_document_summaries_for_sources(db, unique_paths, query=request.message)

    # 1. Filtro estrito de relevância semântica:
    # Apenas chunks com score confiável (>= 0.40) são considerados como fonte factual.
    # Scores inferiores a 0.40 representam ruído de aproximação forçada pelo top_k.
    max_score = max((c.score for c in chunks), default=0.0)
    relevant_chunks = [c for c in chunks if c.score >= 0.40]
    has_relevant_docs = len(relevant_chunks) > 0 and max_score >= 0.40

    if not has_relevant_docs:
        context = (
            "[AVISO DO SISTEMA: A consulta realizada NÃO possui correspondência ou suporte factual nos documentos da base local do REEF. "
            "Você é TERMINANTEMENTE PROIBIDO de utilizar conhecimentos externos ou fatos da internet. "
            "Responda única e exclusivamente informando que esta informação não consta na base de conhecimento local do REEF.]"
        )
        sources = []
    else:
        context = build_context(relevant_chunks, edges=edges, conflicts=conflicts, doc_summaries=doc_summaries)
        sources = [{"source_path": c.source_path, "title": c.title} for c in relevant_chunks]
        for s in doc_summaries:
            if not any(src["source_path"] == s.source_path for src in sources):
                sources.append({"source_path": s.source_path, "title": s.title})

    messages: list[LLMMessage] = [
        {"role": "system", "content": f"{SYSTEM_PROMPT}\n\nContexto:\n{context}"},
        *history,
        {"role": "user", "content": request.message},
    ]

    user_message = Message(conversation_id=conversation.id, role="user", content=request.message)
    db.add(user_message)
    await db.commit()

    llm = get_llm_client()

    async def event_stream():
        collected = []
        candidate_sources = sources if has_relevant_docs else []
        yield f"event: conversation\ndata: {json.dumps({'conversation_id': str(conversation.id)})}\n\n"
        async for token in llm.chat_stream(messages):
            collected.append(token)
            yield f"event: token\ndata: {json.dumps({'text': token})}\n\n"

        full_response = "".join(collected)

        # Regra mandatória: os documentos de referência SÓ devem ser informados
        # se as informações foram efetivamente encontradas na base de conhecimento.
        # Se a resposta indicar recusa ou falta de dados, sources deve ser terminantemente vazio [].
        if not has_relevant_docs or is_refusal_or_not_found(full_response):
            final_sources = []
        else:
            final_sources = candidate_sources

        # Emite sources definitivas para o frontend após a conclusão da resposta
        yield f"event: sources\ndata: {json.dumps(final_sources)}\n\n"

        assistant_msg_id = uuid.uuid4()
        async with db.begin():
            db.add(
                Message(
                    id=assistant_msg_id,
                    conversation_id=conversation.id,
                    role="assistant",
                    content=full_response,
                    sources=final_sources,
                )
            )

        yield f"event: message_id\ndata: {json.dumps({'message_id': str(assistant_msg_id)})}\n\n"
        yield "event: done\ndata: {}\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream")


class MessageFeedbackRequest(BaseModel):
    rating: str  # 'like' | 'dislike'
    reason: str | None = None
    comment: str | None = None


@router.post("/chat/messages/{message_id}/feedback")
async def submit_message_feedback(
    message_id: str,
    payload: MessageFeedbackRequest,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Registra feedback (like/dislike com motivo) de uma mensagem do assistente."""
    try:
        mid = uuid.UUID(message_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="ID de mensagem inválido")

    msg = await db.get(Message, mid)
    if not msg:
        raise HTTPException(status_code=404, detail="Mensagem não encontrada")

    existing = await db.scalar(
        select(MessageFeedback).where(
            MessageFeedback.message_id == mid,
            MessageFeedback.user_id == current_user.id,
        )
    )

    if existing:
        existing.rating = payload.rating
        existing.reason = payload.reason
        existing.comment = payload.comment
        existing.curation_status = "PENDING" if payload.rating == "dislike" else "RESOLVED"
        feedback_obj = existing
    else:
        feedback_obj = MessageFeedback(
            message_id=mid,
            user_id=current_user.id,
            rating=payload.rating,
            reason=payload.reason,
            comment=payload.comment,
            curation_status="PENDING" if payload.rating == "dislike" else "RESOLVED",
        )
        db.add(feedback_obj)

    await db.commit()
    await db.refresh(feedback_obj)

    if payload.rating == "dislike":
        from app.knowledge.feedback_curator import run_ai_feedback_diagnosis
        background_tasks.add_task(run_ai_feedback_diagnosis, feedback_obj.id)

    return {"status": "ok", "feedback_id": str(feedback_obj.id), "rating": payload.rating}


class SuggestionOut(BaseModel):
    id: str
    title: str
    desc: str
    topic: str
    source_path: str
    icon: str  # 'building' | 'globe' | 'calendar' | 'quality' | 'layers' | 'map' | 'shield'


@router.get("/chat/suggestions", response_model=list[SuggestionOut])
async def get_chat_suggestions(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Retorna sugestões de perguntas dinâmicas geradas a partir do contexto real dos documentos indexados."""
    from app.knowledge.models import KnowledgeDocument

    docs = (
        await db.scalars(
            select(KnowledgeDocument).order_by(KnowledgeDocument.updated_at.desc())
        )
    ).all()

    # Filtra páginas de erro e documentos vazios
    valid_docs = [
        d for d in docs
        if "404" not in (d.title or "")
        and "erro" not in (d.title or "").lower()
    ]

    suggestions: list[SuggestionOut] = []
    seen_themes: set[str] = set()

    for idx, doc in enumerate(valid_docs):
        title = doc.title or "Documento"
        topics = doc.topics or []

        # Limpeza de títulos de ingestão automatizada
        if "Relatório de Ingestão" in title or "Página de Erro" in title:
            if topics and len(topics) >= 2:
                clean_title = f"{topics[0]} — {topics[1]}"
            elif topics:
                clean_title = topics[0]
            else:
                parts = doc.source_path.split("/")
                clean_title = parts[-2] if len(parts) > 1 else doc.source_path
        else:
            clean_title = title

        # Agrupamento para diversidade de temas
        lower_title = clean_title.lower()
        top_topic = (topics[0] if topics else "").lower()

        if "iqrf" in lower_title or "iqrf" in top_topic:
            theme_key = "iqrf"
            icon = "quality"
            desc = "Como funciona a classificação, severidade e gestão de IQRF no Reef.core?"
            clean_title = "Gestão de IQRF no Reef.core"
            topic_label = "Gestão da Qualidade"
        elif "companhia" in lower_title or "entidade" in lower_title or "companhia" in top_topic:
            theme_key = "companhia"
            icon = "building"
            desc = "Quais são as propriedades gerais e operativas na parametrização de companhias?"
            clean_title = "Parametrização de Companhias e Entidades"
            topic_label = "Governança Corporativa"
        elif "idioma" in lower_title or "idioma" in top_topic or "iso 639" in top_topic:
            theme_key = "idioma"
            icon = "globe"
            desc = "Quais normas e padrões ISO regulam o catálogo de idiomas multiidioma?"
            clean_title = "Sistema Multiidioma e Catálogo de Idiomas"
            topic_label = "Internacionalização"
        elif "geográfi" in lower_title or "geográfi" in top_topic or "iso 3166" in top_topic:
            theme_key = "geografia"
            icon = "map"
            desc = "Como é estruturada a divisão por níveis territoriais e códigos geográficos?"
            clean_title = "Estrutura Geográfica e Âmbitos"
            topic_label = "Estrutura Territorial"
        elif "calendário" in lower_title or "festiv" in lower_title or "inábeis" in top_topic:
            theme_key = "calendario"
            icon = "calendar"
            desc = "Como funciona o registro de dias inábeis e festividades no calendário oficial?"
            clean_title = "Calendário Laboral Oficial"
            topic_label = "Calendário & Festividades"
        elif "regras harmonizadas" in doc.source_path.lower() or "faq" in lower_title:
            theme_key = "harmonizacao"
            icon = "shield"
            desc = f"Quais diretrizes oficiais foram pacificadas para: {clean_title}?"
            topic_label = "Regras Harmonizadas"
        else:
            theme_key = top_topic or lower_title[:15]
            icon = "layers"
            if topics and len(topics) >= 2:
                desc = f"Quais são as diretrizes e regras relativas a {topics[0]} e {topics[1]}?"
            elif topics:
                desc = f"Quais são as regras e procedimentos especificados para {topics[0]}?"
            else:
                desc = f"Explique as especificações e regras detalhadas em {clean_title}."
            topic_label = topics[0] if topics else "Documentação Técnica"

        if theme_key in seen_themes:
            continue
        seen_themes.add(theme_key)

        suggestions.append(
            SuggestionOut(
                id=str(idx + 1),
                title=clean_title[:55],
                desc=desc,
                topic=topic_label,
                source_path=doc.source_path,
                icon=icon,
            )
        )

        if len(suggestions) >= 4:
            break

    # Fallback seguro caso a base esteja vazia
    if not suggestions:
        suggestions = [
            SuggestionOut(
                id="1",
                title="Visão Geral do Repositório",
                desc="Quais documentos e regras corporativas estão indexados na base de conhecimento?",
                topic="Exploração",
                source_path="",
                icon="layers",
            ),
            SuggestionOut(
                id="2",
                title="Políticas e Normas Ativas",
                desc="Quais são as políticas e diretrizes operacionais vigentes no sistema?",
                topic="Governança",
                source_path="",
                icon="shield",
            ),
            SuggestionOut(
                id="3",
                title="Arquitetura e Integrações",
                desc="Como os módulos e serviços do sistema se integram?",
                topic="Arquitetura",
                source_path="",
                icon="building",
            ),
            SuggestionOut(
                id="4",
                title="Procedimentos e Catálogos",
                desc="Como funcionam os fluxos e catálogos operacionais definidos nas especificações?",
                topic="Operação",
                source_path="",
                icon="globe",
            ),
        ]

    return suggestions



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
