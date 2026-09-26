import base64
import json
import logging
import random
import uuid

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.database import get_db
from app.auth.dependencies import get_current_user
from app.auth.models import Conversation, Message, MessageFeedback, User
from app.config import settings
from app.knowledge.document_parsers import parse_attachment
from app.knowledge.graph_embeddings import topological_engine
from app.llm.base import Message as LLMMessage
from app.llm.factory import get_llm_client
from app.retrieval.search import (
    build_context,
    get_document_summaries_for_sources,
    get_graph_context_for_sources,
    get_query_entities_context,
    search,
)

logger = logging.getLogger(__name__)

router = APIRouter()

SYSTEM_PROMPT = (
    "Você é o Assistente Especialista Privado da NTT DATA para o Ecossistema REEF e Regulação de Seguros.\n"
    "IMPORTANTE — AMBIENTE 100% LOCAL E DE DOMÍNIO FECHADO:\n"
    "Você opera estritamente em ambiente corporativo fechado e NÃO POSSUI ACESSO À INTERNET.\n"
    "É EXPRESSAMENTE PROIBIDO responder a perguntas utilizando conhecimentos externos, fatos da internet, notícias mundiais ou política externa (como presidentes de países, governos, eleições, celebridades ou fatos gerais) que não constem nos documentos locais fornecidos no 'Contexto:'.\n\n"
    "DIRETRIZES FUNDAMENTAIS DE SEGURANÇA E FIDELIDADE:\n"
    "1. Ancoragem Estrita no Contexto Local: Responda APENAS e EXCLUSIVAMENTE com base nas informações documentadas no bloco 'Contexto:' abaixo.\n"
    "2. Recusa Obrigatória de Perguntas Fora da Base: Se a pergunta do usuário tratar de tópicos ausentes dos documentos (por exemplo: presidentes, governantes, notícias da internet, dados mundiais externos), você DEVE OBRIGATORIAMENTE RECUSAR, respondendo com clareza:\n"
    "   'Esta informação não consta na base de conhecimento local do REEF. Como assistente corporativo local e privado, não realizo buscas na internet e meu escopo é restrito exclusivamente aos manuais técnicos, sistemas e normas regulatórias indexadas no ambiente.'\n"
    "3. Síntese Técnica & Profundidade: Para dúvidas legítimas sobre o sistema REEF, seus módulos (TRON, Sinistros, Tesouraria, Contabilidade, etc.) e regulação de seguros presentes na base, forneça respostas completas, didáticas e bem estruturadas.\n"
    "4. Citação Elegante de Fontes: Cite sempre os documentos locais de referência consultados.\n"
    "5. Espelhamento de Idioma: Responda sempre no mesmo idioma em que a pergunta foi feita.\n"
    "6. Auto-Monitoramento Cognitivo e Retificação:\n"
    "   Sempre que você identificar um equívoco, imprecisão ou inconsistência em relação às regras canônicas da base — seja durante sua formulação interna ou ao responder a um apontamento, dúvida ou contestação do interlocutor —, declare expressamente a retificação (ex.: 'Você está correto, houve uma inconsistência na resposta anterior. Retificando: ...') e OBRIGATORIAMENTE anexe ao final da resposta o seguinte bloco técnico estruturado para registro no Grafo Neural:\n"
    "   ```json:cognitive_learning\n"
    "   {\n"
    "     \"concept\": \"Nome do Conceito ou Regra Retificada\",\n"
    "     \"mistake\": \"O equívoco ou inconsistência identificado\",\n"
    "     \"correction\": \"A regra canônica corrigida e definitiva\",\n"
    "     \"source_entity\": \"Módulo ou Documento de Referência\",\n"
    "     \"synapse_type\": \"RETIFICA_CONCEITO\"\n"
    "   }\n"
    "   ```"
)


class AttachmentPayload(BaseModel):
    name: str
    mime_type: str = ""
    data: str  # Base64 data ou DataURL (data:...;base64,...)


class ChatRequest(BaseModel):
    message: str
    conversation_id: str | None = None
    top_k: int = 10
    attachments: list[AttachmentPayload] | None = None


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
    # Validação preliminar do teto estrito de imagens (máx 3)
    raw_attachments = request.attachments or []
    image_count = sum(
        1 for a in raw_attachments
        if ("image" in (a.mime_type or "").lower())
        or any(a.name.lower().endswith(ext) for ext in [".png", ".jpg", ".jpeg", ".webp"])
    )
    if image_count > 3:
        raise HTTPException(
            status_code=422,
            detail="Limite excedido: é permitido o envio de no máximo 3 imagens por interação.",
        )

    has_attachments = len(raw_attachments) > 0

    conversation = await _get_or_create_conversation(db, request.conversation_id, current_user, request.message)
    history = await _load_history(db, conversation.id)
    llm = get_llm_client()

    async def event_stream():
        yield f"event: conversation\ndata: {json.dumps({'conversation_id': str(conversation.id)})}\n\n"

        # 1. Processamento e extração de anexos com feedback dinâmico
        parsed_docs = []
        image_parts = []
        user_attachments_meta = []

        for att in raw_attachments:
            lower_name = att.name.lower()
            mime_lower = (att.mime_type or "").lower()

            if any(lower_name.endswith(ext) for ext in [".png", ".jpg", ".jpeg", ".webp"]) or "image" in mime_lower:
                yield f"event: status\ndata: {json.dumps({'step': 'analyzing_image', 'label': f'Otimizando e analisando imagem ({att.name})...'})}\n\n"
            elif lower_name.endswith(".pdf") or "pdf" in mime_lower:
                yield f"event: status\ndata: {json.dumps({'step': 'reading_pdf', 'label': f'Lendo e extraindo texto do PDF ({att.name})...'})}\n\n"
            elif lower_name.endswith(".docx") or "word" in mime_lower:
                yield f"event: status\ndata: {json.dumps({'step': 'reading_docx', 'label': f'Lendo documento Word ({att.name})...'})}\n\n"
            elif lower_name.endswith(".pptx") or "presentation" in mime_lower:
                yield f"event: status\ndata: {json.dumps({'step': 'reading_pptx', 'label': f'Lendo slides do PowerPoint ({att.name})...'})}\n\n"
            else:
                yield f"event: status\ndata: {json.dumps({'step': 'reading_file', 'label': f'Processando arquivo ({att.name})...'})}\n\n"

            try:
                b64_str = att.data
                if "," in b64_str:
                    b64_str = b64_str.split(",", 1)[1]
                raw_bytes = base64.b64decode(b64_str)

                parsed = parse_attachment(att.name, att.mime_type, raw_bytes)
                if parsed.get("type") == "image":
                    image_parts.append(parsed)
                    user_attachments_meta.append({
                        "name": att.name,
                        "type": "image",
                        "width": parsed.get("width"),
                        "height": parsed.get("height"),
                        "size_bytes": parsed.get("size_bytes"),
                    })
                else:
                    parsed_docs.append(parsed)
                    user_attachments_meta.append({
                        "name": att.name,
                        "type": parsed.get("type", "doc"),
                        "pages": parsed.get("pages"),
                        "slides_count": parsed.get("slides_count"),
                        "total_chars": parsed.get("total_chars"),
                    })
            except Exception as p_err:
                logger.warning(f"[chat] Erro ao extrair anexo '{att.name}': {p_err}")

        # 2. Status: Busca na Base de Conhecimento e Grafo Neural
        yield f"event: status\ndata: {json.dumps({'step': 'retrieving', 'label': 'Consultando base de conhecimento e grafo neural...'})}\n\n"

        query_entities, entity_sources = await get_query_entities_context(db, request.message)
        try:
            await topological_engine.get_or_sync(db)
        except Exception as exc:
            logger.warning(f"[chat] Não foi possível sincronizar motor topológico: {exc}")

        try:
            chunks = search(request.message, top_k=request.top_k, entity_sources=entity_sources)
        except Exception as exc:
            logger.error(f"[chat] Falha no serviço de busca/embeddings: {exc}")
            chunks = []

        unique_paths = list({c.source_path for c in chunks if c.source_path})
        hop1_edges, conflicts, hop2_edges, hop2_docs = await get_graph_context_for_sources(db, unique_paths)
        doc_summaries = await get_document_summaries_for_sources(db, unique_paths, query=request.message)

        max_score = max((c.score for c in chunks), default=0.0)
        relevant_chunks = [c for c in chunks if c.score >= 0.40]
        has_relevant_docs = len(relevant_chunks) > 0 and max_score >= 0.40

        if not has_relevant_docs and not has_attachments:
            context = (
                "[AVISO DO SISTEMA: A consulta realizada NÃO possui correspondência ou suporte factual nos documentos da base local do REEF. "
                "Você é TERMINANTEMENTE PROIBIDO de utilizar conhecimentos externos ou fatos da internet. "
                "Responda única e exclusivamente informando que esta informação não consta na base de conhecimento local do REEF.]"
            )
            sources = []
        else:
            context = build_context(
                relevant_chunks,
                edges=hop1_edges,
                conflicts=conflicts,
                doc_summaries=doc_summaries,
                hop2_edges=hop2_edges,
                hop2_docs=hop2_docs,
                query_entities=query_entities,
            )
            sources = [{"source_path": c.source_path, "title": c.title} for c in relevant_chunks]
            for s in doc_summaries:
                if not any(src["source_path"] == s.source_path for src in sources):
                    sources.append({"source_path": s.source_path, "title": s.title})
            for s in hop2_docs:
                if not any(src["source_path"] == s.source_path for src in sources):
                    sources.append({"source_path": s.source_path, "title": f"🔗 {s.title} (Via Grafo)"})

        # 3. Formatação do Prompt com Anexos e Instruções de Blindagem Epistêmica
        system_instructions = f"{SYSTEM_PROMPT}\n\nContexto:\n{context}"
        if has_attachments:
            system_instructions += (
                "\n\n[ANEXOS TEMPORÁRIOS ENVIADOS PELO USUÁRIO]:\n"
                "O usuário enviou arquivos/imagens anexadas nesta interação para contextualizar ou comprovar pontos da conversa. "
                "Responda às dúvidas com base nestes arquivos, correlacionando-os com as normas canônicas quando aplicável.\n"
                "IMPORTANTE: Se você identificar que uma resposta sua anterior foi imprecisa, incompleta ou equivocada "
                "(com base nos dados trazidos pelo usuário ou pelo anexo), retifique explicitamente reconhecendo o equívoco "
                "e emita o bloco ```json:cognitive_learning...``` para registrar o aprendizado contínuo no Grafo Neural."
            )

        doc_blocks = []
        for d in parsed_docs:
            doc_blocks.append(f"### [DOCUMENTO ANEXADO PELO USUÁRIO: {d['name']}]\n{d['text']}\n")

        if doc_blocks:
            user_prompt_text = (
                f"{request.message}\n\n"
                f"[CONTEÚDO DOS ARQUIVOS ANEXADOS PELO USUÁRIO NESTA INTERAÇÃO]:\n"
                + "\n".join(doc_blocks)
            )
        else:
            user_prompt_text = request.message

        if image_parts:
            user_content = [
                {"type": "text", "text": user_prompt_text},
                *[
                    {"type": "image_url", "image_url": {"url": img["data_url"]}}
                    for img in image_parts
                ],
            ]
        else:
            user_content = user_prompt_text

        messages: list[LLMMessage] = [
            {"role": "system", "content": system_instructions},
            *history,
            {"role": "user", "content": user_content},
        ]

        # Salva a mensagem do usuário no banco com metadados de anexos
        user_prompt_tokens = max(1, len(request.message) // 4)
        user_message = Message(
            conversation_id=conversation.id,
            role="user",
            content=request.message,
            prompt_tokens=user_prompt_tokens,
            total_tokens=user_prompt_tokens,
            attachments_metadata=user_attachments_meta if user_attachments_meta else None,
        )
        db.add(user_message)
        await db.commit()

        # 4. Status: Pensando e Elaborando Resposta
        yield f"event: status\ndata: {json.dumps({'step': 'thinking', 'label': 'Pensando sobre a solicitação e elaborando resposta...'})}\n\n"

        collected = []
        candidate_sources = sources if has_relevant_docs else []

        try:
            async for token in llm.chat_stream(messages):
                collected.append(token)
                yield f"event: token\ndata: {json.dumps({'text': token})}\n\n"
        except Exception as exc:
            logger.error(f"[chat] Erro durante streaming do LLM: {exc}")
            err_text = (
                "\n\n⚠️ **Falha de Comunicação com o Gateway de IA local**:\n"
                "Não foi possível obter a resposta do modelo. O Gateway local (porta 8766) está temporariamente inacessível ou com a sessão de autenticação expirada.\n\n"
                "👉 *Por favor, renove a sessão corporativa no aXet / VS Code e tente novamente.*"
            )
            collected.append(err_text)
            yield f"event: token\ndata: {json.dumps({'text': err_text})}\n\n"

        full_response = "".join(collected)

        # 5. Detecção de Auto-Correção e Aprendizado Cognitivo (Self-Reflective RAG com Mutação Dinâmica de Grafo)
        clean_response = full_response
        persisted_learning = None

        from app.knowledge.learning_synapse import extract_cognitive_learning, persist_cognitive_learning
        extracted_clean, learning_data = extract_cognitive_learning(full_response)
        if learning_data:
            try:
                ref_doc = candidate_sources[0]["source_path"] if (candidate_sources and isinstance(candidate_sources[0], dict)) else (candidate_sources[0] if candidate_sources else None)
                persisted_learning = await persist_cognitive_learning(learning_data, db, target_doc_path=ref_doc)
                yield f"event: learning_occurred\ndata: {json.dumps(persisted_learning)}\n\n"
                clean_response = extracted_clean
            except Exception as learn_err:
                logger.error(f"[chat] Erro ao persistir aprendizado cognitivo autônomo: {learn_err}")

        user_facing_content = clean_response

        # Se houver anexos ou se a resposta contiver recusa
        if (not has_relevant_docs and not has_attachments) or is_refusal_or_not_found(user_facing_content):
            final_sources = []
        else:
            final_sources = candidate_sources

        # Emite sources definitivas para o frontend
        yield f"event: sources\ndata: {json.dumps(final_sources)}\n\n"

        # Cálculo de tokens consumidos
        prompt_tokens = sum(max(1, len(str(m.get("content", ""))) // 4) for m in messages)
        completion_tokens = max(1, len(full_response) // 4)
        total_tokens = prompt_tokens + completion_tokens
        model_name = getattr(llm, "_model", settings.llm_model)

        assistant_msg_id = uuid.uuid4()
        async with db.begin():
            db.add(
                Message(
                    id=assistant_msg_id,
                    conversation_id=conversation.id,
                    role="assistant",
                    content=user_facing_content,
                    sources=final_sources,
                    learning_metadata=persisted_learning,
                    attachments_metadata=user_attachments_meta if user_attachments_meta else None,
                    prompt_tokens=prompt_tokens,
                    completion_tokens=completion_tokens,
                    total_tokens=total_tokens,
                    model=model_name,
                )
            )

        yield f"event: usage\ndata: {json.dumps({'prompt_tokens': prompt_tokens, 'completion_tokens': completion_tokens, 'total_tokens': total_tokens, 'model': model_name})}\n\n"
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


DOMAIN_CONFIG = {
    "emissao": {
        "icon": "layers",
        "default_topic": "Emissão & Contratos",
        "keywords": [
            "emiss", "emisio", "apólice", "poliza", "suplemento", "cotiza",
            "ramo", "cobertura", "tarifa", "plan de pago", "plano de pagamento",
        ],
    },
    "sinistros": {
        "icon": "shield",
        "default_topic": "Gestão de Sinistros",
        "keywords": [
            "sinistro", "siniestro", "liquidaci", "liquidaç", "expediente",
            "tramitador", "recobro", "perita", "reserva", "salvamento",
        ],
    },
    "terceiros": {
        "icon": "building",
        "default_topic": "Terceiros & Entidades",
        "keywords": [
            "terceiro", "tercero", "proveedor", "fornecedor", "agente",
            "entidade banc", "companhia", "cliente", "mediador",
        ],
    },
    "controles": {
        "icon": "quality",
        "default_topic": "Controles & Qualidade",
        "keywords": [
            "control", "validaç", "validac", "antifraude", "platea",
            "iqrf", "harmonizad", "regras harmonizadas", "regras de negócio",
        ],
    },
    "financeiro": {
        "icon": "calendar",
        "default_topic": "Financeiro & Câmbio",
        "keywords": [
            "moeda", "moneda", "câmbio", "cambio", "tesouraria",
            "tesoreria", "contabil", "fatur", "factur", "rating", "cobrança",
        ],
    },
    "estrutura": {
        "icon": "globe",
        "default_topic": "Estrutura & Parâmetros",
        "keywords": [
            "geogr", "calendário", "calendario", "festiv", "inábil",
            "inabil", "idioma", "canal", "estrutura comercial",
        ],
    },
}

QUESTION_TEMPLATES = [
    lambda t1, t2, title: f"Como funciona a parametrização de {t1} e quais são suas regras operacionais?" if t1 else f"Como funciona a parametrização e operação de {title}?",
    lambda t1, t2, title: f"Quais são os critérios e diretrizes técnicas para {t1} e {t2}?" if t1 and t2 else f"Quais são as diretrizes técnicas para {t1 or title}?",
    lambda t1, t2, title: f"Quais são os procedimentos operacionais e validações aplicados a {t1 or title}?",
    lambda t1, t2, title: f"Como é estruturada a integração técnica e o fluxo de {t1 or title} no Reef.core?",
    lambda t1, t2, title: f"Explique as regras de negócio e restrições associadas a {t1 or title}.",
    lambda t1, t2, title: f"Quais os requisitos e impactos de {t1} no processo de {t2}?" if t1 and t2 else f"Quais os impactos e requisitos operacionais de {t1 or title}?",
]

GENERIC_TOPIC_WORDS = {
    "reef", "reef.core", "sistema", "documento", "documentação",
    "geral", "visão geral", "modulo", "módulo", "qualidade da transcrição",
    "transcrição", "vídeo", "video",
}

GENERIC_TITLE_PATTERNS = (
    "relatório de análise",
    "relatório de ingestão",
    "página de erro",
    "conteúdo insuficiente",
    "análise da transcrição",
    "análise estruturada da transcrição",
    "análise estruturada",
    "análise funcional e técnica",
    "análise de transcrição",
    "transcrição degradada",
    "transcrição fornecida",
    "transcrição",
    "404",
)


def _sanitize_title(title: str, topics: list[str], source_path: str) -> str:
    cleaned = (title or "").strip()
    lower = cleaned.lower()

    if not cleaned or any(p in lower for p in GENERIC_TITLE_PATTERNS):
        for t in topics:
            if t.lower() not in GENERIC_TOPIC_WORDS and len(t) > 3:
                return t[:55]
        parts = [p for p in source_path.split("/") if p]
        if len(parts) >= 2:
            return parts[-2].replace("-", " ").strip()[:55]
        return "Documentação Técnica Reef"

    prefixes = (
        "análise estruturada da transcrição —",
        "análise funcional e técnica —",
        "análise estruturada —",
        "análise da transcrição —",
        "análise técnica —",
        "análise funcional —",
        "análise da transcrição:",
        "análise estruturada:",
        "análise sobre ",
        "análise da ",
        "análise de ",
        "análise do ",
        "análise dos ",
        "análise das ",
    )
    for p in prefixes:
        if lower.startswith(p):
            cleaned = cleaned[len(p):].strip()
            lower = cleaned.lower()

    if len(cleaned) <= 3 or cleaned.lower() in ("análise", "transcrição", "documento", "reunião", "treinamento"):
        for t in topics:
            if t.lower() not in GENERIC_TOPIC_WORDS and len(t) > 3:
                return t[:55]
        parts = [p for p in source_path.split("/") if p]
        if len(parts) >= 2:
            return parts[-2].replace("-", " ").strip()[:55]
        return "Documentação Técnica Reef"

    if cleaned and cleaned[0].islower():
        cleaned = cleaned[0].upper() + cleaned[1:]

    return cleaned[:55]


def _extract_best_topics(doc) -> tuple[str, str]:
    raw_topics = [t.strip() for t in (doc.topics or []) if t and t.strip().lower() not in GENERIC_TOPIC_WORDS]
    t1 = raw_topics[0] if raw_topics else ""
    t2 = raw_topics[1] if len(raw_topics) > 1 else ""
    return t1, t2


def _classify_doc_domain(doc, clean_title: str) -> str:
    text = f"{clean_title} {' '.join(doc.topics or [])} {doc.source_path}".lower()
    for dom, conf in DOMAIN_CONFIG.items():
        if any(kw in text for kw in conf["keywords"]):
            return dom
    return "emissao"


@router.get("/chat/suggestions", response_model=list[SuggestionOut])
async def get_chat_suggestions(
    refresh: bool = False,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Retorna sugestões de perguntas dinâmicas e diversificadas a partir do contexto real dos documentos indexados."""
    from app.knowledge.models import KnowledgeDocument

    docs = (
        await db.scalars(
            select(KnowledgeDocument).order_by(KnowledgeDocument.updated_at.desc()).limit(400)
        )
    ).all()

    # Filtra páginas de erro, documentos vazios ou sem qualidade suficiente
    valid_docs = [
        d for d in docs
        if not any(pat in (d.title or "").lower() for pat in GENERIC_TITLE_PATTERNS)
        and "erro" not in (d.title or "").lower()
        and len(d.title or "") > 5
    ]

    # Agrupa documentos válidos por domínio temático
    domain_buckets: dict[str, list[KnowledgeDocument]] = {k: [] for k in DOMAIN_CONFIG}
    for doc in valid_docs:
        clean_title = _sanitize_title(doc.title or "", doc.topics or [], doc.source_path)
        dom = _classify_doc_domain(doc, clean_title)
        domain_buckets.setdefault(dom, []).append(doc)

    # Escolhe até 4 domínios distintos com documentos disponíveis
    active_domains = [d for d, items in domain_buckets.items() if items]
    random.shuffle(active_domains)
    chosen_domains = active_domains[:4]

    # Prepara templates de perguntas embaralhados para garantir estilos linguísticos variados
    templates = QUESTION_TEMPLATES[:]
    random.shuffle(templates)

    suggestions: list[SuggestionOut] = []
    seen_titles: set[str] = set()

    for idx, dom in enumerate(chosen_domains):
        bucket = domain_buckets[dom]
        random.shuffle(bucket)

        # Encontra o primeiro documento que não repita título
        chosen_doc = None
        chosen_title = ""
        for cand in bucket:
            cand_title = _sanitize_title(cand.title or "", cand.topics or [], cand.source_path)
            if cand_title.lower() not in seen_titles:
                chosen_doc = cand
                chosen_title = cand_title
                break

        if not chosen_doc:
            chosen_doc = bucket[0]
            chosen_title = _sanitize_title(chosen_doc.title or "", chosen_doc.topics or [], chosen_doc.source_path)

        seen_titles.add(chosen_title.lower())
        t1, t2 = _extract_best_topics(chosen_doc)

        template_fn = templates[idx % len(templates)]
        desc = template_fn(t1, t2, chosen_title)

        topic_label = t1 if t1 else DOMAIN_CONFIG[dom]["default_topic"]
        icon = DOMAIN_CONFIG[dom]["icon"]

        suggestions.append(
            SuggestionOut(
                id=str(idx + 1),
                title=chosen_title[:55],
                desc=desc,
                topic=topic_label[:30],
                source_path=chosen_doc.source_path,
                icon=icon,
            )
        )

    # Preenche até 4 caso haja menos domínios ativos
    if len(suggestions) < 4 and valid_docs:
        shuffled_valid = valid_docs[:]
        random.shuffle(shuffled_valid)
        for cand in shuffled_valid:
            cand_title = _sanitize_title(cand.title or "", cand.topics or [], cand.source_path)
            if cand_title.lower() not in seen_titles:
                seen_titles.add(cand_title.lower())
                t1, t2 = _extract_best_topics(cand)
                template_fn = templates[len(suggestions) % len(templates)]
                dom = _classify_doc_domain(cand, cand_title)
                suggestions.append(
                    SuggestionOut(
                        id=str(len(suggestions) + 1),
                        title=cand_title[:55],
                        desc=template_fn(t1, t2, cand_title),
                        topic=(t1 or DOMAIN_CONFIG[dom]["default_topic"])[:30],
                        source_path=cand.source_path,
                        icon=DOMAIN_CONFIG[dom]["icon"],
                    )
                )
                if len(suggestions) >= 4:
                    break

    # Fallback seguro caso a base esteja totalmente vazia
    if not suggestions:
        suggestions = [
            SuggestionOut(
                id="1",
                title="Visão Geral do Repositório",
                desc="Como funciona a organização dos módulos do ecossistema Reef.core?",
                topic="Exploração",
                source_path="",
                icon="layers",
            ),
            SuggestionOut(
                id="2",
                title="Políticas e Normas Ativas",
                desc="Quais são as diretrizes de governança e regras operacionais vigentes?",
                topic="Governança",
                source_path="",
                icon="shield",
            ),
            SuggestionOut(
                id="3",
                title="Arquitetura e Integrações",
                desc="Como é estruturada a integração técnica entre os subsistemas e APIs?",
                topic="Arquitetura",
                source_path="",
                icon="building",
            ),
            SuggestionOut(
                id="4",
                title="Procedimentos e Catálogos",
                desc="Quais são os procedimentos operacionais e catálogos definidos nas especificações?",
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
