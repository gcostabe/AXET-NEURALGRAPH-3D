import uuid

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.database import get_db
from app.auth.models import AppUserRbac, AppUserRole, User, UserRole, UserStatus
from app.auth.security import decode_token, is_authorized_admin, is_master_admin

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    try:
        payload = decode_token(token)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token") from exc

    if payload.get("type") != "access":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token type")

    user_id = uuid.UUID(payload["sub"])
    user = await db.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    if user.status != UserStatus.APPROVED:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User is not approved")
    return user


async def get_effective_user_role(user: User, db: AsyncSession) -> AppUserRole:
    """Resolve o papel corporativo com garantia estrita:

    1. gcostabe@emeal.nttdata.com é SEMPRE MASTER_ADMIN.
    2. Usuários delegados em app_users_rbac recebem ADMIN.
    3. Whitelist base recebe ADMIN.
    4. Demais colaboradores são VIEWER.
    """
    clean_email = user.email.strip().lower()
    if is_master_admin(clean_email):
        return AppUserRole.MASTER_ADMIN

    # Consulta delegação no banco de dados
    rbac_row = await db.get(AppUserRbac, clean_email)
    if rbac_row and rbac_row.role in (AppUserRole.ADMIN.value, AppUserRole.MASTER_ADMIN.value):
        return AppUserRole.ADMIN

    if is_authorized_admin(clean_email) or user.role == UserRole.ADMIN:
        return AppUserRole.ADMIN

    return AppUserRole.VIEWER


async def require_master_admin(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> User:
    role = await get_effective_user_role(current_user, db)
    if role != AppUserRole.MASTER_ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Operação restrita exclusivamente ao Master Admin corporativo.",
        )
    return current_user


async def require_admin_or_master(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> User:
    role = await get_effective_user_role(current_user, db)
    if role not in (AppUserRole.MASTER_ADMIN, AppUserRole.ADMIN):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso negado: requer privilégios de Administrador ou Master Admin.",
        )
    return current_user


def require_role(*allowed_roles: UserRole):
    async def dependency(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in allowed_roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
        return current_user

    return dependency


require_admin = require_admin_or_master
