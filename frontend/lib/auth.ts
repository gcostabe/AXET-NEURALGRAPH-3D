const TOKEN_KEY = "rag_access_token";
const ROLE_KEY = "rag_role";
const EFFECTIVE_ROLE_KEY = "rag_effective_role";
const MASTER_KEY = "rag_is_master_admin";
const EMAIL_KEY = "rag_user_email";

export const MASTER_ADMIN_EMAIL = "gcostabe@emeal.nttdata.com";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(
  token: string,
  role: string,
  effectiveRole?: string,
  isMaster?: boolean,
  email?: string
) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(ROLE_KEY, role ? role.toLowerCase() : "");
  if (effectiveRole) {
    window.localStorage.setItem(EFFECTIVE_ROLE_KEY, effectiveRole.toLowerCase());
  }
  if (typeof isMaster === "boolean") {
    window.localStorage.setItem(MASTER_KEY, isMaster ? "true" : "false");
  }
  if (email) {
    window.localStorage.setItem(EMAIL_KEY, email.toLowerCase());
  }
}

export function getRole(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(EFFECTIVE_ROLE_KEY) || window.localStorage.getItem(ROLE_KEY);
}

export function getEmail(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(EMAIL_KEY);
}

export function isMasterAdmin(): boolean {
  if (typeof window === "undefined") return false;
  const isMasterFlag = window.localStorage.getItem(MASTER_KEY) === "true";
  const userEmail = (getEmail() || "").toLowerCase();
  const role = (getRole() || "").toLowerCase();
  return isMasterFlag || role === "master_admin" || userEmail === MASTER_ADMIN_EMAIL.toLowerCase();
}

export function isAdmin(): boolean {
  if (typeof window === "undefined") return false;
  if (isMasterAdmin()) return true;
  const role = (getRole() || "").toLowerCase();
  return role === "admin" || role === "master_admin";
}

export function clearToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(ROLE_KEY);
  window.localStorage.removeItem(EFFECTIVE_ROLE_KEY);
  window.localStorage.removeItem(MASTER_KEY);
  window.localStorage.removeItem(EMAIL_KEY);
}
