import uuid
from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt
from passlib.context import CryptContext

from app.config import settings

_pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ALGORITHM = "HS256"


def hash_password(password: str) -> str:
    return _pwd_context.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return _pwd_context.verify(password, password_hash)


def create_access_token(user_id: uuid.UUID, role: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.jwt_access_token_ttl_minutes)
    payload = {"sub": str(user_id), "role": role, "type": "access", "exp": expire}
    return jwt.encode(payload, settings.jwt_secret, algorithm=ALGORITHM)


def create_refresh_token(user_id: uuid.UUID) -> str:
    expire = datetime.now(timezone.utc) + timedelta(days=settings.jwt_refresh_token_ttl_days)
    payload = {"sub": str(user_id), "type": "refresh", "exp": expire}
    return jwt.encode(payload, settings.jwt_secret, algorithm=ALGORITHM)


def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, settings.jwt_secret, algorithms=[ALGORITHM])
    except JWTError as exc:
        raise ValueError("Invalid or expired token") from exc


# Whitelist autorizada para privilégios de Administrador no sistema.
# Qualquer usuário diferente deste login é compulsoriamente restrito ao papel comum (USER).
AUTHORIZED_ADMIN_EMAILS = {
    "gcostabe@emeal.nttdata.com",
    "gustavo.costa.berbert@nttdata.com",
}


def is_authorized_admin(identifier: str | None) -> bool:
    """Verifica se o login ou e-mail fornecido pertence à whitelist estrita de administradores."""
    if not identifier:
        return False
    clean = identifier.strip().lower()
    allowed = set(AUTHORIZED_ADMIN_EMAILS)
    if settings.bootstrap_admin_email:
        allowed.add(settings.bootstrap_admin_email.strip().lower())
    return clean in allowed

