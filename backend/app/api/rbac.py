import logging
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.database import get_db
from app.auth.dependencies import require_master_admin
from app.auth.models import (
    AppUserRbac,
    AppUserRole,
    AuditAction,
    AuditLog,
    User,
    UserRole,
    UserStatus,
)
from app.auth.schemas import GrantAdminRequest, RbacUserItem
from app.auth.security import MASTER_ADMIN_EMAIL, is_master_admin

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/admin/rbac", tags=["rbac"])


@router.get("/users", response_model=list[RbacUserItem])
async def list_rbac_users(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_master_admin),
):
    """Lista todos os administradores cadastrados (Master Admin + Delegados).

    Acesso restrito exclusivamente ao Master Admin.
    """
    items: list[RbacUserItem] = []

    # 1. Master Admin (Sempre o primeiro da lista, imutável)
    items.append(
        RbacUserItem(
            email=MASTER_ADMIN_EMAIL,
            role=AppUserRole.MASTER_ADMIN.value,
            granted_by="SYSTEM_BOOTSTRAP",
            notes="Master Admin Corporativo Imutável (NTT DATA)",
            created_at=datetime(2026, 1, 1, 0, 0, 0, tzinfo=timezone.utc),
            is_master=True,
        )
    )

    # 2. Administradores delegados no banco de dados
    stmt = select(AppUserRbac).order_by(AppUserRbac.created_at.desc())
    result = await db.scalars(stmt)
    for row in result:
        clean = row.email.strip().lower()
        if clean == MASTER_ADMIN_EMAIL.lower():
            continue
        items.append(
            RbacUserItem(
                email=clean,
                role=row.role,
                granted_by=row.granted_by,
                notes=row.notes,
                created_at=row.created_at,
                is_master=False,
            )
        )

    return items


@router.post("/users", response_model=RbacUserItem, status_code=status.HTTP_201_CREATED)
async def grant_admin_role(
    request: GrantAdminRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_master_admin),
):
    """Concede privilégios de Administrador a um colaborador.

    Acesso restrito exclusivamente ao Master Admin.
    """
    clean_email = request.email.strip().lower()
    if is_master_admin(clean_email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="O usuário especificado já é o Master Admin supremo.",
        )

    rbac_entry = await db.get(AppUserRbac, clean_email)
    if rbac_entry is None:
        rbac_entry = AppUserRbac(
            email=clean_email,
            role=AppUserRole.ADMIN.value,
            granted_by=current_user.email,
            notes=request.notes or "Administrador delegado pelo Master Admin",
        )
        db.add(rbac_entry)
    else:
        rbac_entry.role = AppUserRole.ADMIN.value
        rbac_entry.granted_by = current_user.email
        if request.notes:
            rbac_entry.notes = request.notes

    # Sincroniza usuário na tabela de users se já existir
    user_row = await db.scalar(select(User).where(func.lower(User.email) == clean_email))
    if user_row:
        user_row.role = UserRole.ADMIN
        user_row.status = UserStatus.APPROVED

    # Auditoria
    audit = AuditLog(
        actor_user_id=current_user.id,
        action=AuditAction.GRANT_ADMIN,
        target_user_id=user_row.id if user_row else None,
        metadata_json={
            "target_email": clean_email,
            "granted_role": AppUserRole.ADMIN.value,
            "notes": request.notes,
        },
    )
    db.add(audit)

    await db.commit()
    await db.refresh(rbac_entry)

    logger.info(f"Master Admin {current_user.email} concedeu papel ADMIN para {clean_email}")

    return RbacUserItem(
        email=rbac_entry.email,
        role=rbac_entry.role,
        granted_by=rbac_entry.granted_by,
        notes=rbac_entry.notes,
        created_at=rbac_entry.created_at,
        is_master=False,
    )


@router.delete("/users/{email}", status_code=status.HTTP_204_NO_CONTENT)
async def revoke_admin_role(
    email: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_master_admin),
):
    """Revoga privilégios de Administrador de um colaborador delegado.

    Acesso restrito exclusivamente ao Master Admin.
    """
    clean_email = email.strip().lower()
    if is_master_admin(clean_email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Não é permitido revogar os privilégios do Master Admin supremo.",
        )

    rbac_entry = await db.get(AppUserRbac, clean_email)
    if rbac_entry is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Administrador não encontrado na lista de delegação.",
        )

    await db.delete(rbac_entry)

    # Rebaixa usuário na tabela de users se existir
    user_row = await db.scalar(select(User).where(func.lower(User.email) == clean_email))
    if user_row:
        user_row.role = UserRole.USER

    # Auditoria
    audit = AuditLog(
        actor_user_id=current_user.id,
        action=AuditAction.REVOKE_ADMIN,
        target_user_id=user_row.id if user_row else None,
        metadata_json={
            "target_email": clean_email,
            "revoked_role": AppUserRole.ADMIN.value,
        },
    )
    db.add(audit)

    await db.commit()
    logger.info(f"Master Admin {current_user.email} revogou privilégios ADMIN de {clean_email}")
