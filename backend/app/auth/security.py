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


# Identidade estrita do Master Admin (imutável no código-fonte)
MASTER_ADMIN_EMAIL = "gcostabe@emeal.nttdata.com"

# Whitelist autorizada de fallback/bootstrap
AUTHORIZED_ADMIN_EMAILS = {
    MASTER_ADMIN_EMAIL,
    "gustavo.costa.berbert@nttdata.com",
    "marcio11.ferreiramiguel@nttdata.com",
}


def is_master_admin(identifier: str | None) -> bool:
    """Verifica se o login ou e-mail pertence ao Master Admin corporativo supremo."""
    if not identifier:
        return False
    return identifier.strip().lower() == MASTER_ADMIN_EMAIL.lower()


def is_authorized_admin(identifier: str | None) -> bool:
    """Verifica se o login ou e-mail pertence ao Master Admin ou whitelist base."""
    if not identifier:
        return False
    clean = identifier.strip().lower()
    if is_master_admin(clean):
        return True
    allowed = set(AUTHORIZED_ADMIN_EMAILS)
    if settings.bootstrap_admin_email:
        allowed.add(settings.bootstrap_admin_email.strip().lower())
    return clean in allowed

