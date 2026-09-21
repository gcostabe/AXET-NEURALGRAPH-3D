import json
from datetime import datetime, timezone
from pathlib import Path

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, status
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
    User,
    UserRole,
    UserStatus,
)
from app.auth.schemas import ChangeRoleRequest, UserOut
from app.config import settings
from app.ingestion.sources_settings import (
    InvalidSourcesPath,
    get_sources_relative_path,
    resolve_sources_dir,
    set_sources_relative_path,
    to_relative_path,
)

router = APIRouter(prefix="/admin", tags=["admin"], dependencies=[Depends(require_admin)])

REINDEX_STATUS_KEY = "last_reindex_status"


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
    finished_at: str | None = None


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


async def _run_reindex_job(relative_path: str, mode: str) -> None:
    from app.ingestion.run import run as run_ingestion

    async with AsyncSessionLocal() as db:
        row = await db.scalar(select(AppSetting).where(AppSetting.key == REINDEX_STATUS_KEY))

        try:
            resolved = resolve_sources_dir(relative_path)
            summary = run_ingestion(str(resolved), mode)
            payload = {"status": "success", "summary": summary}
        except Exception as exc:  # noqa: BLE001 — job em background, precisa registrar qualquer falha
            payload = {"status": "error", "error": str(exc)}

        payload["finished_at"] = datetime.now(timezone.utc).isoformat()
        value = json.dumps(payload)

        if row is None:
            db.add(AppSetting(key=REINDEX_STATUS_KEY, value=value))
        else:
            row.value = value
        await db.commit()


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

    db.add(
        AuditLog(
            actor_user_id=admin.id,
            action=AuditAction.TRIGGER_REINDEX,
            metadata_json={"relative_path": relative_path, "mode": mode},
        )
    )
    await db.commit()

    background_tasks.add_task(_run_reindex_job, relative_path, mode)
    return {"status": "started", "relative_path": relative_path, "mode": mode}


@router.get("/sources-config/reindex-status", response_model=ReindexStatusOut)
async def get_reindex_status(db: AsyncSession = Depends(get_db)):
    row = await db.scalar(select(AppSetting).where(AppSetting.key == REINDEX_STATUS_KEY))
    if row is None:
        return ReindexStatusOut(status="never_run")

    payload = json.loads(row.value)
    return ReindexStatusOut(
        status=payload.get("status", "unknown"),
        detail=payload.get("summary") or ({"error": payload["error"]} if "error" in payload else None),
        finished_at=payload.get("finished_at"),
    )
