import asyncio
import json
import time
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from fastapi import APIRouter, BackgroundTasks, Depends, File, Form, HTTPException, UploadFile, status
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.database import AsyncSessionLocal, get_db
from app.auth.dependencies import require_admin
from app.auth.models import (
    AppSetting,
    AuditAction,
    AuditLog,
    Conversation,
    Message,
    MessageFeedback,
    User,
    UserRole,
    UserStatus,
)
from app.auth.schemas import ChangeRoleRequest, UserOut
from app.auth.security import is_authorized_admin
from app.config import settings
from app.ingestion.sources_settings import (
    InvalidSourcesPath,
    get_sources_relative_path,
    resolve_sources_dir,
    set_sources_relative_path,
    to_relative_path,
)
from app.legislation.registry import (
    CountryLegislationConfig,
    get_country_config,
    list_available_countries,
)
from app.legislation.glossary_manager import (
    get_regulatory_impact_data,
    load_glossary_pairs,
    save_glossary_pairs,
)
from app.legislation.service import (
    LEGISLATION_SYNC_STATUS_KEY,
    discover_country_legislation,
    get_active_country_id,
    get_custom_countries_json,
    get_sync_telemetry,
    run_legislation_sync_job,
    save_custom_country,
)

router = APIRouter(prefix="/admin", tags=["admin"], dependencies=[Depends(require_admin)])

REINDEX_STATUS_KEY = "last_reindex_status"


class LegislationDiscoverRequest(BaseModel):
    country_name: str


class LegislationSyncRequest(BaseModel):
    country: str


class SourcesConfigRequest(BaseModel):
    # Aceita um caminho relativo a sources_root (ex.: "projA/docs") OU um caminho
    # absoluto do host colado pelo admin (ex.: "/Users/joao/Documents/notas"),
    # desde que esteja dentro da raiz montada em SOURCES_ROOT.
    relative_path: str


class SourcesConfigOut(BaseModel):
    relative_path: str
    resolved_path: str
    sources_root: str


class ReindexStatusOut(BaseModel):
    status: str
    detail: dict | None = None
    started_at: str | None = None
    finished_at: str | None = None
    mode: str | None = None
    progress: dict | None = None


@router.get("/users", response_model=list[UserOut])
async def list_users(
    status_filter: UserStatus | None = None,
    db: AsyncSession = Depends(get_db),
):
    query = select(User)
    if status_filter is not None:
        query = query.where(User.status == status_filter)
    result = await db.scalars(query)
    return result.all()


@router.post("/users/{user_id}/approve", response_model=UserOut)
async def approve_user(
    user_id: str,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    user = await _get_user_or_404(db, user_id)
    user.status = UserStatus.APPROVED
    user.approved_by = admin.id
    user.approved_at = datetime.now(timezone.utc)
    db.add(AuditLog(actor_user_id=admin.id, action=AuditAction.APPROVE_USER, target_user_id=user.id))
    await db.commit()
    await db.refresh(user)
    return user


@router.post("/users/{user_id}/block", response_model=UserOut)
async def block_user(
    user_id: str,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    user = await _get_user_or_404(db, user_id)
    user.status = UserStatus.BLOCKED
    db.add(AuditLog(actor_user_id=admin.id, action=AuditAction.BLOCK_USER, target_user_id=user.id))
    await db.commit()
    await db.refresh(user)
    return user


@router.post("/users/{user_id}/role", response_model=UserOut)
async def change_role(
    user_id: str,
    request: ChangeRoleRequest,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    user = await _get_user_or_404(db, user_id)

    if request.role == UserRole.ADMIN and not is_authorized_admin(user.email):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Apenas o login corporativo autorizado (gcostabe@emeal.nttdata.com) pode possuir privilégios de Administrador.",
        )

    if user.role == UserRole.ADMIN and request.role != UserRole.ADMIN:
        remaining_admins = await db.scalar(
            select(User).where(User.role == UserRole.ADMIN, User.id != user.id)
        )
        if remaining_admins is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot remove the last remaining admin",
            )

    user.role = request.role
    db.add(
        AuditLog(
            actor_user_id=admin.id,
            action=AuditAction.CHANGE_ROLE,
            target_user_id=user.id,
            metadata_json={"new_role": request.role.value},
        )
    )
    await db.commit()
    await db.refresh(user)
    return user


@router.get("/users/{user_id}/conversations")
async def view_user_conversations(
    user_id: str,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    user = await _get_user_or_404(db, user_id)

    conversations = await db.scalars(
        select(Conversation).where(Conversation.user_id == user.id)
    )
    conversations = conversations.all()

    result = []
    for conv in conversations:
        messages = await db.scalars(
            select(Message).where(Message.conversation_id == conv.id).order_by(Message.created_at)
        )
        result.append(
            {
                "conversation_id": str(conv.id),
                "title": conv.title,
                "created_at": conv.created_at,
                "messages": [
                    {"role": m.role, "content": m.content, "created_at": m.created_at}
                    for m in messages.all()
                ],
            }
        )

    db.add(
        AuditLog(
            actor_user_id=admin.id,
            action=AuditAction.VIEW_HISTORY,
            target_user_id=user.id,
        )
    )
    await db.commit()

    return result


@router.get("/audit-log")
async def get_audit_log(db: AsyncSession = Depends(get_db)):
    result = await db.scalars(select(AuditLog).order_by(AuditLog.created_at.desc()).limit(200))
    return result.all()


async def _get_user_or_404(db: AsyncSession, user_id: str) -> User:
    user = await db.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


@router.get("/sources-config", response_model=SourcesConfigOut)
async def get_sources_config(db: AsyncSession = Depends(get_db)):
    relative_path = await get_sources_relative_path(db)
    try:
        resolved = resolve_sources_dir(relative_path)
    except InvalidSourcesPath:
        # Configuração salva ficou inválida (ex.: diretório removido do host) — informa mesmo assim.
        resolved = Path(settings.sources_root) / relative_path
    return SourcesConfigOut(
        relative_path=relative_path,
        resolved_path=str(resolved),
        sources_root=str(Path(settings.sources_root).resolve()),
    )


@router.get("/sources-config/browse")
async def browse_sources_dir(relative_path: str = "."):
    """Lista subdiretórios imediatos de `relative_path`, para o admin navegar e
    escolher a pasta correta. Aceita tanto um caminho relativo a sources_root
    quanto um caminho absoluto do host (ex.: colado do Finder/terminal), desde
    que esteja dentro da raiz montada — ver sources_settings.to_relative_path."""
    try:
        normalized = to_relative_path(relative_path)
        target = resolve_sources_dir(normalized)
    except InvalidSourcesPath as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    root = Path(settings.sources_root).resolve()
    entries = sorted(p.name for p in target.iterdir() if p.is_dir() and not p.name.startswith("."))
    md_count = sum(1 for _ in target.glob("*.md"))

    return {
        "relative_path": normalized,
        "subdirectories": entries,
        "markdown_files_here": md_count,
        "is_root": target == root,
    }


@router.put("/sources-config", response_model=SourcesConfigOut)
async def update_sources_config(
    request: SourcesConfigRequest,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    try:
        normalized = await set_sources_relative_path(db, request.relative_path, updated_by=admin.id)
    except InvalidSourcesPath as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    db.add(
        AuditLog(
            actor_user_id=admin.id,
            action=AuditAction.CHANGE_SOURCES_PATH,
            metadata_json={"input": request.relative_path, "relative_path": normalized},
        )
    )
    await db.commit()

    resolved = resolve_sources_dir(normalized)
    return SourcesConfigOut(
        relative_path=normalized,
        resolved_path=str(resolved),
        sources_root=str(Path(settings.sources_root).resolve()),
    )


@router.post("/sources/sync-onedrive")
async def sync_onedrive_sources(admin: User = Depends(require_admin)):
    """Aciona a sincronização do OneDrive do Host com a pasta local de fontes."""
    try:
        async with httpx.AsyncClient(timeout=120.0) as client:
            resp = await client.post("http://host.docker.internal:8765/sync-onedrive")
            if resp.status_code == 200:
                return resp.json()
            raise HTTPException(status_code=502, detail=f"Host bridge retornou {resp.status_code}: {resp.text}")
    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail=f"Não foi possível conectar ao bridge local no Mac (porta 8765): {exc}",
        )



_active_reindex_telemetry: dict = {}
_last_reindex_db_save_time: float = 0.0


async def _save_reindex_checkpoint_to_db(payload: dict) -> None:
    value = json.dumps(payload)
    async with AsyncSessionLocal() as db:
        row = await db.scalar(select(AppSetting).where(AppSetting.key == REINDEX_STATUS_KEY))
        if row is None:
            db.add(AppSetting(key=REINDEX_STATUS_KEY, value=value))
        else:
            row.value = value
        await db.commit()


async def _run_reindex_job(relative_path: str, mode: str, started_at_iso: str) -> None:
    from app.ingestion.run import run_async

    global _active_reindex_telemetry, _last_reindex_db_save_time
    _last_reindex_db_save_time = time.time()
    initial_progress = {
        "phase": "discovering",
        "current_file": "",
        "processed": 0,
        "skipped": 0,
        "remaining_files": 0,
        "errors": 0,
        "total_files": 0,
        "total_chunks": 0,
        "speed": 0.0,
        "speed_files": 0.0,
        "started_at": started_at_iso,
        "eta_seconds": None,
        "eta_iso": None,
    }
    _active_reindex_telemetry = {
        "status": "running",
        "mode": mode,
        "started_at": started_at_iso,
        "progress": initial_progress,
    }

    async def on_progress(p_data: dict) -> None:
        global _active_reindex_telemetry, _last_reindex_db_save_time
        _active_reindex_telemetry["progress"] = p_data
        now = time.time()
        # Throttled save: a cada 1.5 segundos grava o snapshot no PostgreSQL
        if now - _last_reindex_db_save_time >= 1.5:
            _last_reindex_db_save_time = now
            checkpoint_payload = {
                "status": "running",
                "mode": mode,
                "started_at": started_at_iso,
                "progress": p_data,
                "updated_at": datetime.now(timezone.utc).isoformat(),
            }
            try:
                await _save_reindex_checkpoint_to_db(checkpoint_payload)
            except Exception:
                pass

    try:
        resolved = resolve_sources_dir(relative_path)
        summary = await run_async(str(resolved), mode, on_progress=on_progress)
        payload = {
            "status": "success",
            "mode": mode,
            "started_at": started_at_iso,
            "finished_at": datetime.now(timezone.utc).isoformat(),
            "summary": summary,
            "progress": _active_reindex_telemetry.get("progress"),
        }
        _active_reindex_telemetry = payload
    except Exception as exc:  # noqa: BLE001 — job em background, precisa registrar qualquer falha
        payload = {
            "status": "error",
            "mode": mode,
            "started_at": started_at_iso,
            "finished_at": datetime.now(timezone.utc).isoformat(),
            "error": str(exc),
            "progress": _active_reindex_telemetry.get("progress"),
        }
        _active_reindex_telemetry = payload

    try:
        await _save_reindex_checkpoint_to_db(payload)
    except Exception:
        pass


@router.post("/sources-config/reindex", status_code=status.HTTP_202_ACCEPTED)
async def trigger_reindex(
    background_tasks: BackgroundTasks,
    mode: str = "incremental",
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    if mode not in ("incremental", "full"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="mode must be 'incremental' or 'full'")

    relative_path = await get_sources_relative_path(db)
    try:
        resolve_sources_dir(relative_path)
    except InvalidSourcesPath as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    now_iso = datetime.now(timezone.utc).isoformat()
    initial_progress = {
        "phase": "discovering",
        "current_file": "",
        "processed": 0,
        "skipped": 0,
        "remaining_files": 0,
        "errors": 0,
        "total_files": 0,
        "total_chunks": 0,
        "speed": 0.0,
        "speed_files": 0.0,
        "started_at": now_iso,
        "eta_seconds": None,
        "eta_iso": None,
    }
    running_payload = json.dumps({
        "status": "running",
        "mode": mode,
        "started_at": now_iso,
        "progress": initial_progress,
        "updated_at": now_iso,
    })
    row = await db.scalar(select(AppSetting).where(AppSetting.key == REINDEX_STATUS_KEY))
    if row is None:
        db.add(AppSetting(key=REINDEX_STATUS_KEY, value=running_payload))
    else:
        row.value = running_payload

    global _active_reindex_telemetry
    _active_reindex_telemetry = {
        "status": "running",
        "mode": mode,
        "started_at": now_iso,
        "progress": initial_progress,
    }

    db.add(
        AuditLog(
            actor_user_id=admin.id,
            action=AuditAction.TRIGGER_REINDEX,
            metadata_json={"relative_path": relative_path, "mode": mode},
        )
    )
    await db.commit()

    background_tasks.add_task(_run_reindex_job, relative_path, mode, now_iso)
    return {"status": "started", "relative_path": relative_path, "mode": mode, "started_at": now_iso}


@router.get("/sources-config/reindex-status", response_model=ReindexStatusOut)
async def get_reindex_status(db: AsyncSession = Depends(get_db)):
    global _active_reindex_telemetry
    row = await db.scalar(select(AppSetting).where(AppSetting.key == REINDEX_STATUS_KEY))
    if row is None:
        return ReindexStatusOut(status="never_run")

    payload = json.loads(row.value)
    status_str = payload.get("status", "unknown")

    progress_data = None
    if status_str == "running":
        progress_data = _active_reindex_telemetry.get("progress")
        if not progress_data:
            progress_data = payload.get("progress")
    else:
        progress_data = payload.get("progress")

    detail = (
        payload.get("summary")
        or ({"error": payload["error"]} if "error" in payload else None)
        or ({"interrupted_reason": payload["interrupted_reason"]} if "interrupted_reason" in payload else None)
    )

    return ReindexStatusOut(
        status=status_str,
        detail=detail,
        started_at=payload.get("started_at"),
        finished_at=payload.get("finished_at") or payload.get("interrupted_at"),
        mode=payload.get("mode", "incremental"),
        progress=progress_data,
    )



@router.post("/sources/upload-folder")
async def upload_sources_folder(
    files: list[UploadFile] = File(...),
    relative_paths: list[str] = Form(...),
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    """Recebe arquivos .md selecionados pelo admin via Finder e grava no sources_root."""
    root = Path(settings.sources_root).resolve()
    saved = 0
    for file, rel_path in zip(files, relative_paths):
        clean_rel = rel_path.lstrip("/").replace("\\", "/")
        if ".." in clean_rel:
            continue
        if not clean_rel.lower().endswith(".md"):
            continue
        dest = (root / clean_rel).resolve()
        if root not in dest.parents and dest != root:
            continue
        dest.parent.mkdir(parents=True, exist_ok=True)
        content = await file.read()
        dest.write_bytes(content)
        saved += 1

    return {"saved": saved, "total": len(files)}


from app.knowledge.feedback_curator import create_gold_canonical_answer


class FeedbackItemOut(BaseModel):
    id: str
    message_id: str
    user_id: str
    user_email: str | None = None
    rating: str
    reason: str | None = None
    comment: str | None = None
    curation_status: str
    ai_diagnosis: dict | None = None
    curator_notes: str | None = None
    resolved_at: str | None = None
    created_at: str
    user_prompt: str
    assistant_response: str
    sources: Any = None


class CurateFeedbackRequest(BaseModel):
    status: str  # RESOLVED, REJECTED, IN_ANALYSIS
    curator_notes: str | None = None


class CreateGoldAnswerRequest(BaseModel):
    question: str
    approved_answer: str


@router.get("/feedbacks", response_model=list[FeedbackItemOut])
async def list_feedbacks(
    rating: str | None = None,
    curation_status: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    """Lista feedbacks (likes/dislikes) com contexto da conversa e diagnóstico de IA para curadoria."""
    query = select(MessageFeedback).order_by(MessageFeedback.created_at.desc())
    if rating:
        query = query.where(MessageFeedback.rating == rating)
    if curation_status:
        query = query.where(MessageFeedback.curation_status == curation_status)

    feedbacks = (await db.scalars(query)).all()
    results: list[FeedbackItemOut] = []

    for fb in feedbacks:
        user = await db.get(User, fb.user_id)
        msg = await db.get(Message, fb.message_id)

        user_prompt = "Consulta do usuário"
        assistant_response = ""
        sources = None

        if msg:
            assistant_response = msg.content
            sources = msg.sources
            user_msg = await db.scalar(
                select(Message)
                .where(
                    Message.conversation_id == msg.conversation_id,
                    Message.role == "user",
                    Message.created_at <= msg.created_at,
                )
                .order_by(Message.created_at.desc())
                .limit(1)
            )
            if user_msg:
                user_prompt = user_msg.content

        diag_dict = None
        if fb.ai_diagnosis:
            try:
                diag_dict = json.loads(fb.ai_diagnosis)
            except Exception:
                diag_dict = {"raw": fb.ai_diagnosis}

        results.append(
            FeedbackItemOut(
                id=str(fb.id),
                message_id=str(fb.message_id),
                user_id=str(fb.user_id),
                user_email=user.email if user else None,
                rating=fb.rating,
                reason=fb.reason,
                comment=fb.comment,
                curation_status=fb.curation_status,
                ai_diagnosis=diag_dict,
                curator_notes=fb.curator_notes,
                resolved_at=fb.resolved_at.isoformat() if fb.resolved_at else None,
                created_at=fb.created_at.isoformat() if fb.created_at else "",
                user_prompt=user_prompt,
                assistant_response=assistant_response,
                sources=sources,
            )
        )

    return results


@router.post("/feedbacks/{feedback_id}/curate")
async def curate_feedback(
    feedback_id: str,
    payload: CurateFeedbackRequest,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    """Atualiza o status de curadoria e anotações de um feedback."""
    try:
        fid = uuid.UUID(feedback_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="ID de feedback inválido")

    fb = await db.get(MessageFeedback, fid)
    if not fb:
        raise HTTPException(status_code=404, detail="Feedback não encontrado")

    fb.curation_status = payload.status
    if payload.curator_notes is not None:
        fb.curator_notes = payload.curator_notes
    fb.resolved_by_user_id = admin.id
    fb.resolved_at = datetime.now(timezone.utc)

    await db.commit()
    return {"status": "ok", "curation_status": fb.curation_status}


@router.post("/feedbacks/{feedback_id}/create-gold-answer")
async def create_gold_answer_from_feedback(
    feedback_id: str,
    payload: CreateGoldAnswerRequest,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    """Gera um arquivo de FAQ canônico de alta autoridade na base e indexa imediatamente no Qdrant."""
    try:
        fid = uuid.UUID(feedback_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="ID de feedback inválido")

    fb = await db.get(MessageFeedback, fid)
    if not fb:
        raise HTTPException(status_code=404, detail="Feedback não encontrado")

    if not payload.question.strip() or not payload.approved_answer.strip():
        raise HTTPException(status_code=400, detail="Pergunta e resposta aprovada são obrigatórias")

    source_path = await create_gold_canonical_answer(
        feedback=fb,
        db=db,
        question=payload.question.strip(),
        approved_answer=payload.approved_answer.strip(),
        curator_user_id=admin.id,
    )

    db.add(
        AuditLog(
            actor_user_id=admin.id,
            action=AuditAction.CREATE_GOLD_ANSWER,
            metadata_json={"action": "CREATE_GOLD_ANSWER", "source_path": source_path, "feedback_id": feedback_id},
        )
    )
    await db.commit()

    return {
        "status": "ok",
        "source_path": source_path,
        "curation_status": fb.curation_status,
        "message": "Par Dourado gerado e indexado com sucesso na base de conhecimento.",
    }


# ============================================================================
# Legislação & Regulação de Seguros por País Ativo (Descoberta Dinâmica)
# ============================================================================

@router.get("/legislation/countries")
async def get_legislation_countries(db: AsyncSession = Depends(get_db)):
    """Retorna os países e portais regulatórios suportados e o país ativo."""
    active_id = await get_active_country_id(db)
    custom_json = await get_custom_countries_json(db)
    return {
        "active_country": active_id,
        "countries": list_available_countries(custom_json),
    }


@router.post("/legislation/discover")
async def discover_country(
    payload: LegislationDiscoverRequest,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    """Utiliza o LLM para pesquisar as agências reguladoras, sites e normas oficiais de qualquer país."""
    if not payload.country_name.strip():
        raise HTTPException(status_code=400, detail="Nome do país é obrigatório para pesquisa.")

    config = await discover_country_legislation(payload.country_name.strip())
    # Salva automaticamente no cadastro do banco para que fique disponível
    await save_custom_country(config, db)

    db.add(
        AuditLog(
            actor_user_id=admin.id,
            action=AuditAction.CHANGE_SOURCES_PATH,
            metadata_json={
                "action": "DISCOVER_LEGISLATION_COUNTRY",
                "country_name": config.name,
                "portals_found": len(config.portals),
            },
        )
    )
    await db.commit()

    return config.model_dump()


@router.post("/legislation/save-country")
async def save_country_config(
    payload: CountryLegislationConfig,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    """Salva a configuração regulatória de um país no banco de dados."""
    await save_custom_country(payload, db)
    return {"status": "ok", "country_id": payload.id, "country_name": payload.name}


@router.post("/legislation/sync", status_code=status.HTTP_202_ACCEPTED)
async def trigger_legislation_sync(
    payload: LegislationSyncRequest,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    """Dispara a atualização manual da legislação do país em segundo plano."""
    country_id = payload.country.strip().lower()
    custom_json = await get_custom_countries_json(db)
    try:
        config = get_country_config(country_id, custom_json)
    except KeyError as exc:
        raise HTTPException(status_code=400, detail=str(exc))

    telemetry = get_sync_telemetry()
    if telemetry.get("status") == "running":
        raise HTTPException(
            status_code=409,
            detail="Já existe um processo de sincronização de legislação em andamento.",
        )

    background_tasks.add_task(run_legislation_sync_job, country_id, admin.email)
    return {
        "status": "accepted",
        "country": country_id,
        "country_name": config.name,
        "portals_count": len(config.portals),
        "message": f"Sincronização da legislação de {config.name} iniciada.",
    }


@router.get("/legislation/status")
async def get_legislation_sync_status(db: AsyncSession = Depends(get_db)):
    """Retorna a telemetria em tempo real ou o último resultado gravado no banco."""
    telemetry = get_sync_telemetry()
    if telemetry.get("status") != "idle":
        return telemetry

    row = await db.scalar(select(AppSetting).where(AppSetting.key == LEGISLATION_SYNC_STATUS_KEY))
    if row and row.value:
        try:
            return json.loads(row.value)
        except Exception:
            pass

    return telemetry


# ── Glossário De ➔ Para & Impacto Regulatório ──────────────────

class GlossaryPairInput(BaseModel):
    jargon: str
    formal_term: str
    definition: str
    legal_basis: str


class GlossaryPairOut(BaseModel):
    id: int
    jargon: str
    formal_term: str
    definition: str
    legal_basis: str


@router.get("/glossary", response_model=list[GlossaryPairOut])
async def list_glossary_pairs():
    """Retorna a lista completa de pares de equivalência (jargão -> termo formal)."""
    return load_glossary_pairs()


@router.post("/glossary", response_model=GlossaryPairOut, status_code=status.HTTP_201_CREATED)
async def create_glossary_pair(
    payload: GlossaryPairInput,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    """Adiciona um novo par de equivalência ao glossário canônico."""
    pairs = load_glossary_pairs()
    new_id = max([p["id"] for p in pairs], default=0) + 1
    new_pair = {
        "id": new_id,
        "jargon": payload.jargon.strip(),
        "formal_term": payload.formal_term.strip(),
        "definition": payload.definition.strip(),
        "legal_basis": payload.legal_basis.strip(),
    }
    pairs.append(new_pair)
    active_country = await get_active_country_id(db)
    success = save_glossary_pairs(pairs, country_name=active_country.capitalize())
    if not success:
        raise HTTPException(status_code=500, detail="Erro ao persistir no arquivo de glossário.")

    db.add(
        AuditLog(
            action=AuditAction.CHANGE_SOURCES_PATH,
            metadata_json={
                "action": "CREATE_GLOSSARY_PAIR",
                "jargon": payload.jargon,
                "formal_term": payload.formal_term,
                "actor_email": admin.email,
            },
        )
    )
    await db.commit()
    return new_pair


@router.put("/glossary/{pair_id}", response_model=GlossaryPairOut)
async def update_glossary_pair(
    pair_id: int,
    payload: GlossaryPairInput,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    """Atualiza um par de equivalência existente."""
    pairs = load_glossary_pairs()
    found = False
    updated_pair = None
    for p in pairs:
        if p["id"] == pair_id:
            p["jargon"] = payload.jargon.strip()
            p["formal_term"] = payload.formal_term.strip()
            p["definition"] = payload.definition.strip()
            p["legal_basis"] = payload.legal_basis.strip()
            found = True
            updated_pair = p
            break

    if not found:
        raise HTTPException(status_code=404, detail=f"Par com ID {pair_id} não encontrado.")

    active_country = await get_active_country_id(db)
    success = save_glossary_pairs(pairs, country_name=active_country.capitalize())
    if not success:
        raise HTTPException(status_code=500, detail="Erro ao persistir no arquivo de glossário.")

    db.add(
        AuditLog(
            action=AuditAction.CHANGE_SOURCES_PATH,
            metadata_json={
                "action": "UPDATE_GLOSSARY_PAIR",
                "pair_id": pair_id,
                "jargon": payload.jargon,
                "formal_term": payload.formal_term,
                "actor_email": admin.email,
            },
        )
    )
    await db.commit()
    return updated_pair


@router.delete("/glossary/{pair_id}")
async def delete_glossary_pair(
    pair_id: int,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    """Remove um par de equivalência do glossário canônico."""
    pairs = load_glossary_pairs()
    initial_len = len(pairs)
    pairs = [p for p in pairs if p["id"] != pair_id]
    if len(pairs) == initial_len:
        raise HTTPException(status_code=404, detail=f"Par com ID {pair_id} não encontrado.")

    # Reindexa IDs
    for idx, p in enumerate(pairs, start=1):
        p["id"] = idx

    active_country = await get_active_country_id(db)
    success = save_glossary_pairs(pairs, country_name=active_country.capitalize())
    if not success:
        raise HTTPException(status_code=500, detail="Erro ao persistir no arquivo de glossário.")

    db.add(
        AuditLog(
            action=AuditAction.CHANGE_SOURCES_PATH,
            metadata_json={
                "action": "DELETE_GLOSSARY_PAIR",
                "pair_id": pair_id,
                "actor_email": admin.email,
            },
        )
    )
    await db.commit()
    return {"status": "success", "message": f"Par {pair_id} removido com sucesso."}


@router.get("/regulatory-impact")
async def get_regulatory_impact():
    """Retorna o conteúdo da Matriz de Impacto Regulatório ativa e seu resumo por módulo."""
    return get_regulatory_impact_data()


# ── Telemetria e Controle de Uso de Tokens ───────────────────────────────────

class TokenSummaryOut(BaseModel):
    total_tokens: int
    prompt_tokens: int
    completion_tokens: int
    total_messages: int
    total_conversations: int
    total_users: int
    usage_by_model: dict[str, int]


class UserTokenUsageOut(BaseModel):
    user_id: str
    email: str
    role: str
    conversation_count: int
    message_count: int
    prompt_tokens: int
    completion_tokens: int
    total_tokens: int
    last_active_at: str | None = None


class SessionTokenUsageOut(BaseModel):
    conversation_id: str
    title: str
    user_email: str
    message_count: int
    prompt_tokens: int
    completion_tokens: int
    total_tokens: int
    created_at: str
    updated_at: str


@router.get("/tokens/summary", response_model=TokenSummaryOut)
async def get_token_summary(db: AsyncSession = Depends(get_db)):
    """Retorna o resumo global de uso de tokens em toda a plataforma."""
    from sqlalchemy import func

    token_stats = await db.execute(
        select(
            func.coalesce(func.sum(Message.prompt_tokens), 0).label("prompt_tokens"),
            func.coalesce(func.sum(Message.completion_tokens), 0).label("completion_tokens"),
            func.coalesce(func.sum(Message.total_tokens), 0).label("total_tokens"),
            func.count(Message.id).label("total_messages"),
        )
    )
    row = token_stats.one()

    total_conversations = (await db.scalar(select(func.count(Conversation.id)))) or 0
    total_users = (await db.scalar(select(func.count(User.id)))) or 0

    model_stats = await db.execute(
        select(
            func.coalesce(Message.model, "gpt-5.6-terra-high"),
            func.coalesce(func.sum(Message.total_tokens), 0),
        )
        .group_by(Message.model)
    )
    usage_by_model = {m: int(t) for m, t in model_stats.all() if m}
    if not usage_by_model:
        usage_by_model["gpt-5.6-terra-high"] = int(row.total_tokens)

    return TokenSummaryOut(
        total_tokens=int(row.total_tokens),
        prompt_tokens=int(row.prompt_tokens),
        completion_tokens=int(row.completion_tokens),
        total_messages=int(row.total_messages),
        total_conversations=total_conversations,
        total_users=total_users,
        usage_by_model=usage_by_model,
    )


@router.get("/tokens/users", response_model=list[UserTokenUsageOut])
async def get_token_usage_by_user(db: AsyncSession = Depends(get_db)):
    """Retorna o consumo de tokens discriminado por usuário."""
    from sqlalchemy import func

    query = (
        select(
            User.id,
            User.email,
            User.role,
            func.count(func.distinct(Conversation.id)).label("conversation_count"),
            func.count(Message.id).label("message_count"),
            func.coalesce(func.sum(Message.prompt_tokens), 0).label("prompt_tokens"),
            func.coalesce(func.sum(Message.completion_tokens), 0).label("completion_tokens"),
            func.coalesce(func.sum(Message.total_tokens), 0).label("total_tokens"),
            func.max(Message.created_at).label("last_active_at"),
        )
        .outerjoin(Conversation, Conversation.user_id == User.id)
        .outerjoin(Message, Message.conversation_id == Conversation.id)
        .group_by(User.id, User.email, User.role)
        .order_by(func.coalesce(func.sum(Message.total_tokens), 0).desc())
    )

    result = await db.execute(query)
    rows = result.all()

    return [
        UserTokenUsageOut(
            user_id=str(r[0]),
            email=r[1],
            role=r[2].value if hasattr(r[2], "value") else str(r[2]),
            conversation_count=int(r[3]),
            message_count=int(r[4]),
            prompt_tokens=int(r[5]),
            completion_tokens=int(r[6]),
            total_tokens=int(r[7]),
            last_active_at=r[8].isoformat() if r[8] else None,
        )
        for r in rows
    ]


@router.get("/tokens/sessions", response_model=list[SessionTokenUsageOut])
async def get_token_usage_by_session(db: AsyncSession = Depends(get_db)):
    """Retorna o consumo de tokens agrupado por sessão/conversa."""
    from sqlalchemy import func

    query = (
        select(
            Conversation.id,
            Conversation.title,
            User.email,
            func.count(Message.id).label("message_count"),
            func.coalesce(func.sum(Message.prompt_tokens), 0).label("prompt_tokens"),
            func.coalesce(func.sum(Message.completion_tokens), 0).label("completion_tokens"),
            func.coalesce(func.sum(Message.total_tokens), 0).label("total_tokens"),
            Conversation.created_at,
            Conversation.updated_at,
        )
        .join(User, User.id == Conversation.user_id)
        .outerjoin(Message, Message.conversation_id == Conversation.id)
        .group_by(Conversation.id, Conversation.title, User.email, Conversation.created_at, Conversation.updated_at)
        .order_by(Conversation.updated_at.desc())
    )

    result = await db.execute(query)
    rows = result.all()

    return [
        SessionTokenUsageOut(
            conversation_id=str(r[0]),
            title=r[1] or "Conversa sem título",
            user_email=r[2],
            message_count=int(r[3]),
            prompt_tokens=int(r[4]),
            completion_tokens=int(r[5]),
            total_tokens=int(r[6]),
            created_at=r[7].isoformat() if r[7] else "",
            updated_at=r[8].isoformat() if r[8] else "",
        )
        for r in rows
    ]


# ---------------------------------------------------------------------------
# Gestão e Processamento Multimodal de Vídeos (.md com Visão/OCR vs Áudio)
# ---------------------------------------------------------------------------

from app.ingestion.video_processor import (
    VIDEO_SETTING_FRAME_INTERVAL_KEY,
    VIDEO_SETTING_LANGUAGE_KEY,
    VIDEO_SETTING_MAX_FRAMES_KEY,
    VIDEO_SETTING_MODE_KEY,
    VIDEO_SETTING_WHISPER_MODEL_KEY,
    get_video_job_status,
    list_available_videos,
    process_single_video_pipeline,
)


class VideoSettingsRequest(BaseModel):
    mode: str = "multimodal_ocr"  # "multimodal_ocr" | "audio_only"
    frame_interval_seconds: int = 10
    whisper_model: str = "small"
    language: str = "es"
    max_frames: int = 30


class VideoSettingsOut(BaseModel):
    mode: str
    frame_interval_seconds: int
    whisper_model: str
    language: str
    max_frames: int


class VideoItemOut(BaseModel):
    name: str
    relative_path: str
    parent_dir: str
    size_mb: float
    modified_at: str
    has_markdown: bool
    markdown_files: list[str]


class VideoProcessRequest(BaseModel):
    video_relative_path: str
    mode_override: str | None = None


@router.get("/video/settings", response_model=VideoSettingsOut)
async def get_video_settings(db: AsyncSession = Depends(get_db)):
    mode_row = await db.scalar(select(AppSetting).where(AppSetting.key == VIDEO_SETTING_MODE_KEY))
    interval_row = await db.scalar(select(AppSetting).where(AppSetting.key == VIDEO_SETTING_FRAME_INTERVAL_KEY))
    model_row = await db.scalar(select(AppSetting).where(AppSetting.key == VIDEO_SETTING_WHISPER_MODEL_KEY))
    lang_row = await db.scalar(select(AppSetting).where(AppSetting.key == VIDEO_SETTING_LANGUAGE_KEY))
    frames_row = await db.scalar(select(AppSetting).where(AppSetting.key == VIDEO_SETTING_MAX_FRAMES_KEY))

    mode = mode_row.value if mode_row and mode_row.value else settings.video_processing_mode_default
    interval = int(interval_row.value) if interval_row and interval_row.value else settings.video_frame_interval_seconds
    model = model_row.value if model_row and model_row.value else settings.video_whisper_model
    lang = lang_row.value if lang_row and lang_row.value else settings.video_whisper_language
    frames = int(frames_row.value) if frames_row and frames_row.value else settings.video_max_frames

    return VideoSettingsOut(
        mode=mode,
        frame_interval_seconds=interval,
        whisper_model=model,
        language=lang,
        max_frames=frames,
    )


@router.post("/video/settings", response_model=VideoSettingsOut)
async def update_video_settings(
    req: VideoSettingsRequest,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    if req.mode not in ("multimodal_ocr", "audio_only"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Modo inválido. Escolha 'multimodal_ocr' ou 'audio_only'.",
        )

    # Atualiza ou cria configurações
    settings_map = {
        VIDEO_SETTING_MODE_KEY: req.mode,
        VIDEO_SETTING_FRAME_INTERVAL_KEY: str(max(2, min(req.frame_interval_seconds, 60))),
        VIDEO_SETTING_WHISPER_MODEL_KEY: req.whisper_model.strip() or "small",
        VIDEO_SETTING_LANGUAGE_KEY: req.language.strip() or "es",
        VIDEO_SETTING_MAX_FRAMES_KEY: str(max(5, min(req.max_frames, 50))),
    }

    for key, val in settings_map.items():
        row = await db.scalar(select(AppSetting).where(AppSetting.key == key))
        if row:
            row.value = val
            row.updated_by = admin.id
            row.updated_at = datetime.now(timezone.utc)
        else:
            db.add(AppSetting(key=key, value=val, updated_by=admin.id))

    await db.commit()
    return await get_video_settings(db)


@router.get("/video/list", response_model=list[VideoItemOut])
async def list_videos(db: AsyncSession = Depends(get_db)):
    rel_path = await get_sources_relative_path(db)
    sources_dir = resolve_sources_dir(rel_path)
    videos = await asyncio.to_thread(list_available_videos, sources_dir)
    return [
        VideoItemOut(
            name=v["name"],
            relative_path=v["relative_path"],
            parent_dir=v["parent_dir"],
            size_mb=v["size_mb"],
            modified_at=v["modified_at"],
            has_markdown=v["has_markdown"],
            markdown_files=v["markdown_files"],
        )
        for v in videos
    ]


@router.get("/video/status")
async def get_video_status():
    return get_video_job_status()


async def _run_video_processing_task(
    video_rel_path: str,
    sources_dir: Path,
    mode_override: str | None = None,
):
    """Executa a rotina de vídeo em background com uma nova sessão do banco."""
    async with AsyncSessionLocal() as db:
        settings_obj = await get_video_settings(db)
        mode = mode_override or settings_obj.mode
        interval = settings_obj.frame_interval_seconds
        lang = settings_obj.language
        whisper_model = settings_obj.whisper_model

    video_abs_path = sources_dir / video_rel_path
    if not video_abs_path.is_file():
        logger.error(f"Arquivo de vídeo não encontrado: {video_abs_path}")
        return

    try:
        await process_single_video_pipeline(
            video_abs_path=video_abs_path,
            sources_root=sources_dir,
            mode=mode,
            frame_interval_seconds=interval,
            language=lang,
            whisper_model=whisper_model,
        )
    except Exception as exc:
        logger.error(f"Erro no processamento do vídeo {video_rel_path}: {exc}", exc_info=True)


@router.post("/video/process")
async def trigger_video_process(
    req: VideoProcessRequest,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    current_status = get_video_job_status()
    if current_status.get("status") == "running":
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Já existe um processamento de vídeo em execução. Aguarde a conclusão.",
        )

    rel_path = await get_sources_relative_path(db)
    sources_dir = resolve_sources_dir(rel_path)
    video_abs = sources_dir / req.video_relative_path
    if not video_abs.is_file():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Arquivo de vídeo não encontrado: {req.video_relative_path}",
        )

    background_tasks.add_task(
        _run_video_processing_task,
        req.video_relative_path,
        sources_dir,
        req.mode_override,
    )

    db.add(
        AuditLog(
            actor_user_id=admin.id,
            action=AuditAction.TRIGGER_REINDEX,
            metadata_json={"action": "trigger_video_process", "video": req.video_relative_path},
        )
    )
    await db.commit()

    return {
        "status": "started",
        "video": req.video_relative_path,
        "mode_requested": req.mode_override or "default",
    }




