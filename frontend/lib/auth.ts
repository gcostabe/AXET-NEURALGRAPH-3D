const TOKEN_KEY = "rag_access_token";
const ROLE_KEY = "rag_role";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string, role: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(ROLE_KEY, role ? role.toLowerCase() : "");
}

export function getRole(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ROLE_KEY);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(ROLE_KEY);
}

export function isAdmin(): boolean {
  if (typeof window === "undefined") return false;
  return (getRole() || "").toLowerCase() === "admin";
}
