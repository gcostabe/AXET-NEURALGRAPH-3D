import base64
import json
import logging
import secrets
from datetime import datetime, timezone

import httpx
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.database import get_db
from app.auth.dependencies import get_current_user, get_effective_user_role
from app.auth.models import AppUserRole, User, UserRole, UserStatus
from app.auth.schemas import (
    ChangePasswordRequest,
    GatewayAuthStatusResponse,
    LoginRequest,
    OktaDeviceAuthStartResponse,
    OktaPollRequest,
    OktaPollResponse,
    RegisterRequest,
    TokenResponse,
    UserOut,
    UserProfileOut,
)
from app.auth.security import (
    create_access_token,
    hash_password,
    is_authorized_admin,
    verify_password,
)
from app.config import settings

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/auth", tags=["auth"])


def _decode_jwt_unverified(jwt_token: str) -> dict:
    parts = jwt_token.split(".")
    if len(parts) < 2:
        return {}
    payload = parts[1]
    payload += "=" * (-len(payload) % 4)
    try:
        decoded = base64.urlsafe_b64decode(payload.encode("utf-8"))
        return json.loads(decoded.decode("utf-8"))
    except Exception:
        return {}


async def _sync_tokens_to_gateway(tokens: dict) -> bool:
    candidate_urls = [
        settings.gateway_host_url,
        "http://127.0.0.1:8766",
        "http://localhost:8766",
    ]
    seen = set()
    urls = []
    for u in candidate_urls:
        if u and u not in seen:
            seen.add(u)
            urls.append(u)

    for target_url in urls:
        try:
            async with httpx.AsyncClient(timeout=4.0) as client:
                resp = await client.post(
                    f"{target_url}/auth/tokens",
                    json=tokens,
                )
                if resp.status_code == 200:
                    logger.info(f"[OKTA_GATEWAY_SYNC] Tokens Okta sincronizados com sucesso na gateway ({target_url})")
                    return True
                else:
                    logger.warning(
                        f"[OKTA_GATEWAY_SYNC] Gateway em {target_url} retornou HTTP {resp.status_code}: {resp.text}"
                    )
        except Exception as exc:
            logger.debug(f"[OKTA_GATEWAY_SYNC] Tentativa de conexão com gateway em {target_url} falhou: {exc}")

    logger.warning("[OKTA_GATEWAY_SYNC] Não foi possível sincronizar tokens com a gateway (offline). Sessão do usuário prosseguirá normalmente.")
    return False


@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def register(request: RegisterRequest, db: AsyncSession = Depends(get_db)):
    clean_email = request.email.strip().lower()
    existing = await db.scalar(select(User).where(func.lower(User.email) == clean_email))
    if existing is not None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

    is_admin = is_authorized_admin(clean_email)

    user = User(
        email=clean_email,
        password_hash=hash_password(request.password),
        status=UserStatus.APPROVED if is_admin else UserStatus.PENDING,
        role=UserRole.ADMIN if is_admin else UserRole.USER,
    )
    if is_admin:
        user.approved_at = datetime.now(timezone.utc)

    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest, db: AsyncSession = Depends(get_db)):
    clean_email = request.email.strip().lower()
    clean_password = request.password.strip()
    user = await db.scalar(select(User).where(func.lower(User.email) == clean_email))
    if user is None or not (verify_password(request.password, user.password_hash) or verify_password(clean_password, user.password_hash)):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    if user.status == UserStatus.PENDING:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Account pending approval")
    if user.status == UserStatus.BLOCKED:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Account is blocked")

    # Garantia estrita: qualquer usuário fora da whitelist autorizada só pode logar como USER comum
    if not is_authorized_admin(user.email) and user.role == UserRole.ADMIN:
        user.role = UserRole.USER

    user.last_login_at = datetime.now(timezone.utc)
    await db.commit()

    access_token = create_access_token(user.id, user.role.value)
    return TokenResponse(access_token=access_token, role=user.role, status=user.status)


@router.get("/me", response_model=UserProfileOut)
async def get_me(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    eff_role = await get_effective_user_role(current_user, db)
    return UserProfileOut(
        id=current_user.id,
        email=current_user.email,
        status=current_user.status,
        role=current_user.role,
        effective_role=eff_role.value,
        is_master_admin=(eff_role == AppUserRole.MASTER_ADMIN),
        created_at=current_user.created_at,
    )


@router.put("/me/password", status_code=status.HTTP_204_NO_CONTENT)
async def change_password(
    request: ChangePasswordRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not verify_password(request.current_password, current_user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Current password is incorrect")

    current_user.password_hash = hash_password(request.new_password)
    await db.commit()


@router.api_route("/okta/start", methods=["GET", "POST"], response_model=OktaDeviceAuthStartResponse)
@router.api_route("/okta/start/", methods=["GET", "POST"], response_model=OktaDeviceAuthStartResponse)
async def okta_device_auth_start():
    """Inicia o fluxo OAuth 2.0 Device Authorization com o Okta corporativo."""
    logger.info(
        f"[OKTA_AUTH_START] Iniciando Device Authorization em {settings.okta_device_auth_url} "
        f"(client_id={settings.okta_client_id}, scopes='{settings.okta_scopes}')"
    )
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.post(
                settings.okta_device_auth_url,
                data={
                    "client_id": settings.okta_client_id,
                    "scope": settings.okta_scopes,
                },
                headers={"Content-Type": "application/x-www-form-urlencoded"},
            )
            logger.info(f"[OKTA_AUTH_START] Resposta do Okta: HTTP {resp.status_code}")
            if resp.status_code != 200:
                logger.error(f"[OKTA_AUTH_START_ERROR] Falha de autorização no Okta (HTTP {resp.status_code}): {resp.text}")
                raise HTTPException(
                    status_code=status.HTTP_502_BAD_GATEWAY,
                    detail=f"Falha ao iniciar autorização no Okta (HTTP {resp.status_code}): {resp.text}",
                )
            data = resp.json()
            logger.info(
                f"[OKTA_AUTH_START_SUCCESS] Device code gerado com sucesso! user_code: {data.get('user_code')} "
                f"(expira em {data.get('expires_in', 600)}s)"
            )
            return OktaDeviceAuthStartResponse(
                device_code=data["device_code"],
                user_code=data["user_code"],
                verification_uri=data.get("verification_uri", "https://onentt.okta.com/activate"),
                verification_uri_complete=data.get(
                    "verification_uri_complete",
                    f"https://onentt.okta.com/activate?user_code={data['user_code']}",
                ),
                expires_in=data.get("expires_in", 600),
                interval=data.get("interval", 5),
            )
    except httpx.ConnectTimeout as exc:
        logger.error(f"[OKTA_AUTH_START_TIMEOUT] Timeout ao conectar ao Okta em {settings.okta_device_auth_url}: {exc}")
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail=f"Timeout de conexão com o servidor Okta ({settings.okta_device_auth_url}). "
                   "Verifique proxy corporativo ou instabilidade de rede Windows.",
        )
    except httpx.ConnectError as exc:
        logger.error(f"[OKTA_AUTH_START_CONNECT_ERROR] Erro de rede ao conectar ao Okta: {exc}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Falha de conexão com o servidor Okta ({settings.okta_device_auth_url}): {exc}. "
                   "Verifique VPN corporativa, resolução DNS ou proxy do Windows.",
        )
    except httpx.RequestError as exc:
        logger.error(f"[OKTA_AUTH_START_REQUEST_ERROR] Erro na requisição HTTP ao Okta [{type(exc).__name__}]: {exc}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Não foi possível conectar ao Okta [{type(exc).__name__}]: {exc}",
        )


@router.api_route("/okta/poll", methods=["GET", "POST"], response_model=OktaPollResponse)
@router.api_route("/okta/poll/", methods=["GET", "POST"], response_model=OktaPollResponse)
async def okta_device_auth_poll(
    request: OktaPollRequest | None = None,
    device_code: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    """Consulta o Okta se o usuário autorizou o device code e emite o token da aplicação."""
    code = (request.device_code if request else device_code) or ""
    if not code:
        logger.warning("[OKTA_AUTH_POLL_PARAM_ERROR] Parâmetro device_code ausente na chamada de poll")
        return OktaPollResponse(status="error", detail="Parâmetro device_code ausente.")

    logger.debug(f"[OKTA_AUTH_POLL] Consultando autorização do device code (prefixo: {code[:8]}...)")
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.post(
                settings.okta_token_url,
                data={
                    "client_id": settings.okta_client_id,
                    "grant_type": "urn:ietf:params:oauth:grant-type:device_code",
                    "device_code": code,
                },
                headers={"Content-Type": "application/x-www-form-urlencoded"},
            )
    except httpx.ConnectTimeout as exc:
        logger.error(f"[OKTA_AUTH_POLL_TIMEOUT] Timeout ao verificar token no Okta: {exc}")
        return OktaPollResponse(status="error", detail=f"Timeout ao consultar autorização no Okta: {exc}")
    except httpx.RequestError as exc:
        logger.error(f"[OKTA_AUTH_POLL_REQUEST_ERROR] Erro na requisição de polling do Okta: {exc}")
        return OktaPollResponse(status="error", detail=f"Erro de conexão com Okta [{type(exc).__name__}]: {exc}")

    if resp.status_code != 200:
        err_data = {}
        try:
            err_data = resp.json()
        except Exception:
            pass
        err = err_data.get("error", "")
        if err == "authorization_pending":
            return OktaPollResponse(status="pending")
        elif err == "slow_down":
            logger.info("[OKTA_AUTH_POLL_SLOW_DOWN] Okta solicitou redução na frequência de polling")
            return OktaPollResponse(status="slow_down")
        elif err in ("expired_token", "access_denied"):
            logger.warning(f"[OKTA_AUTH_POLL_REJECTED] Okta retornou '{err}': {err_data.get('error_description')}")
            return OktaPollResponse(status="expired", detail=err_data.get("error_description"))
        logger.error(f"[OKTA_AUTH_POLL_ERROR] HTTP {resp.status_code}: {resp.text}")
        return OktaPollResponse(status="error", detail=err_data.get("error_description", resp.text))

    # Okta autorizou com sucesso!
    tokens = resp.json()
    access_token = tokens.get("access_token", "")
    id_token = tokens.get("id_token", "")

    claims = {}
    if id_token:
        claims.update(_decode_jwt_unverified(id_token))
    if access_token:
        claims.update(_decode_jwt_unverified(access_token))

    email = (
        claims.get("email")
        or claims.get("preferred_username")
        or claims.get("sub")
        or ""
    ).strip().lower()

    if not email or "@" not in email:
        return OktaPollResponse(
            status="error",
            detail="Não foi possível identificar o e-mail corporativo no retorno do Okta.",
        )

    user_name = claims.get("name") or email.split("@")[0]

    # Sincroniza tokens com o local-ai-gateway para atualizar tokens.json e AXET_API_KEY
    gateway_tokens = {
        "access_token": access_token,
        "refresh_token": tokens.get("refresh_token", ""),
        "token_type": tokens.get("token_type", "Bearer"),
        "expires_in": tokens.get("expires_in", 3600),
        "scope": tokens.get("scope", settings.okta_scopes),
        "email": email,
        "okta_id": claims.get("uid") or claims.get("sub", ""),
        "id_token": id_token,
    }
    await _sync_tokens_to_gateway(gateway_tokens)

    # Identifica login e email corporativo retornados pelo Okta
    user_login = (
        claims.get("login")
        or claims.get("preferred_username")
        or claims.get("sub")
        or ""
    ).strip().lower()

    # Localiza ou cadastra o usuário corporativo no Postgres
    user = await db.scalar(select(User).where(func.lower(User.email) == email))
    is_admin = is_authorized_admin(email) or is_authorized_admin(user_login)

    if user is None:
        user = User(
            email=email,
            password_hash=hash_password(secrets.token_urlsafe(32)),
            status=UserStatus.APPROVED,
            role=UserRole.ADMIN if is_admin else UserRole.USER,
            approved_at=datetime.now(timezone.utc),
            last_login_at=datetime.now(timezone.utc),
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)
    else:
        user.last_login_at = datetime.now(timezone.utc)
        if user.status == UserStatus.PENDING:
            user.status = UserStatus.APPROVED
            user.approved_at = datetime.now(timezone.utc)
        # Garantia estrita: apenas o login autorizado pode manter papel ADMIN
        if is_admin:
            if user.role != UserRole.ADMIN:
                user.role = UserRole.ADMIN
        else:
            if user.role != UserRole.USER:
                user.role = UserRole.USER
        await db.commit()

    if user.status == UserStatus.BLOCKED:
        return OktaPollResponse(status="error", detail="Sua conta corporativa está bloqueada.")

    rag_jwt = create_access_token(user.id, user.role.value)
    return OktaPollResponse(
        status="success",
        access_token=rag_jwt,
        role=user.role,
        user_status=user.status,
        email=user.email,
        user_name=user_name,
    )


@router.api_route("/okta/status", methods=["GET", "POST"], response_model=GatewayAuthStatusResponse)
@router.api_route("/okta/status/", methods=["GET", "POST"], response_model=GatewayAuthStatusResponse)
async def okta_gateway_status():
    """Consulta o status de autenticação da API Gateway local com identidade corporativa completa."""
    try:
        async with httpx.AsyncClient(timeout=3.0) as client:
            resp = await client.get(f"{settings.gateway_host_url}/auth/status")
            if resp.status_code == 200:
                data = resp.json()
                return GatewayAuthStatusResponse(
                    status="ok",
                    authenticated=data.get("authenticated", False),
                    expires_at=data.get("expires_at", 0),
                    remaining_seconds=data.get("remaining_seconds", 0),
                    email=data.get("email"),
                    display_name=data.get("display_name", "Gustavo Costa Berbert"),
                    login=data.get("login", "gcostabe@emeal.nttdata.com"),
                    okta_id=data.get("okta_id", "00u9pq4pchFsGiPHG417"),
                    tenant=data.get("tenant", "OneNTT"),
                    org=data.get("org", "NTT DATA EMEAL"),
                    role=data.get("role", "RAG Pipeline Architect"),
                    idp=data.get("idp", "Okta Enterprise OIDC (onentt)"),
                    gateway_url="http://localhost:8766",
                    gateway_port=8766,
                    gateway_online=True,
                    auto_refresh=True,
                    last_sync=data.get("last_sync") or datetime.now().strftime("%H:%M:%S"),
                )
    except Exception as exc:
        logger.warning(f"Could not reach gateway at {settings.gateway_host_url}: {exc}")

    return GatewayAuthStatusResponse(
        status="offline",
        authenticated=False,
        expires_at=0,
        remaining_seconds=0,
        email=None,
        display_name="Gustavo Costa Berbert",
        login="gcostabe@emeal.nttdata.com",
        okta_id="00u9pq4pchFsGiPHG417",
        tenant="OneNTT",
        org="NTT DATA EMEAL",
        role="RAG Pipeline Architect",
        idp="Okta Enterprise OIDC (onentt)",
        gateway_online=False,
        last_sync=datetime.now().strftime("%H:%M:%S"),
    )


@router.api_route("/okta/refresh", methods=["GET", "POST"], response_model=GatewayAuthStatusResponse)
@router.api_route("/okta/refresh/", methods=["GET", "POST"], response_model=GatewayAuthStatusResponse)
async def okta_gateway_refresh():
    """Força renovação e sincronização de sessão com o Okta e API Gateway."""
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(f"{settings.gateway_host_url}/auth/refresh")
            if resp.status_code == 200:
                data = resp.json()
                return GatewayAuthStatusResponse(
                    status="ok",
                    authenticated=data.get("authenticated", False),
                    expires_at=data.get("expires_at", 0),
                    remaining_seconds=data.get("remaining_seconds", 0),
                    email=data.get("email"),
                    display_name=data.get("display_name", "Gustavo Costa Berbert"),
                    login=data.get("login", "gcostabe@emeal.nttdata.com"),
                    okta_id=data.get("okta_id", "00u9pq4pchFsGiPHG417"),
                    tenant=data.get("tenant", "OneNTT"),
                    org=data.get("org", "NTT DATA EMEAL"),
                    role=data.get("role", "RAG Pipeline Architect"),
                    idp=data.get("idp", "Okta Enterprise OIDC (onentt)"),
                    gateway_url="http://localhost:8766",
                    gateway_port=8766,
                    gateway_online=True,
                    auto_refresh=True,
                    last_sync=data.get("last_sync") or datetime.now().strftime("%H:%M:%S"),
                    refreshed=True,
                )
    except Exception as exc:
        logger.warning(f"Could not refresh gateway tokens at {settings.gateway_host_url}: {exc}")

    return await okta_gateway_status()

