import uuid
from datetime import datetime

from pydantic import BaseModel, EmailStr

from app.auth.models import UserRole, UserStatus


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: uuid.UUID
    email: EmailStr
    status: UserStatus
    role: UserRole
    created_at: datetime

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: UserRole
    status: UserStatus


class ChangeRoleRequest(BaseModel):
    role: UserRole


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


class OktaDeviceAuthStartResponse(BaseModel):
    device_code: str
    user_code: str
    verification_uri: str
    verification_uri_complete: str
    expires_in: int
    interval: int = 5


class OktaPollRequest(BaseModel):
    device_code: str


class OktaPollResponse(BaseModel):
    status: str  # "pending", "slow_down", "expired", "success", "error"
    detail: str | None = None
    access_token: str | None = None
    token_type: str = "bearer"
    role: UserRole | None = None
    user_status: UserStatus | None = None
    email: str | None = None
    user_name: str | None = None


class GatewayAuthStatusResponse(BaseModel):
    status: str
    authenticated: bool
    expires_at: int
    remaining_seconds: int
    email: str | None = None
