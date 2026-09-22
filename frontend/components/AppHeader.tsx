"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authApi, UserOut, ApiError } from "@/lib/api";
import { clearToken, isAdmin as checkIsAdmin } from "@/lib/auth";
import NttDataLogo from "./NttDataLogo";
import { 
  ShieldCheck, 
  User as UserIcon, 
  KeyRound, 
  LogOut, 
  Check, 
  X, 
  ChevronDown, 
  LayoutDashboard,
  MessageSquare,
  Sparkles,
  Network
} from "lucide-react";

export default function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserOut | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    authApi.me().then(setUser).catch(() => {});
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleLogout() {
    clearToken();
    router.push("/login");
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (newPassword.length < 8) {
      setPasswordError("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("As senhas não coincidem.");
      return;
    }

    setSaving(true);
    try {
      await authApi.changePassword(currentPassword, newPassword);
      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess(false);
      }, 1400);
    } catch (err) {
      setPasswordError(
        err instanceof ApiError ? err.message : "Não foi possível alterar a senha.",
      );
    } finally {
      setSaving(false);
    }
  }

  const initial = user?.email?.[0]?.toUpperCase() ?? "U";
  const isAdmin = (user?.role || "").toLowerCase() === "admin" || checkIsAdmin();
  const isOnAdminPage = pathname.startsWith("/admin");
  const isOnGraphPage = pathname.startsWith("/graph");

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800/80 bg-slate-950/90 px-5 backdrop-blur-md">
        {/* Brand Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/chat")}
            className="flex items-center gap-3 transition-opacity hover:opacity-90 text-left"
          >
            <NttDataLogo size="md" />
            <div className="hidden md:flex flex-col border-l border-slate-800 pl-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                RAG Local Reef
                <span className="inline-flex items-center rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-400 border border-emerald-500/20">
                  <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  ONLINE
                </span>
              </span>
              <span className="text-[11px] text-slate-400">
                Assistente de IA & Base de Documentos
              </span>
            </div>
          </button>
        </div>

        {/* Right Navigation & User Menu */}
        <div className="flex items-center gap-2.5">
          {/* Acesso ao Grafo Neural 3D para Todos os Usuários */}
          <button
            onClick={() => router.push(isOnGraphPage ? "/chat" : "/graph")}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all shadow-sm ${
              isOnGraphPage
                ? "border-cyan-500/50 bg-cyan-600/15 text-cyan-300 hover:bg-cyan-600/25 shadow-cyan-950/30"
                : "border-slate-800 bg-slate-900/80 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 hover:bg-slate-800/90"
            }`}
            title={isOnGraphPage ? "Voltar ao Chat" : "Explorar Grafo Neural 3D"}
          >
            {isOnGraphPage ? (
              <>
                <MessageSquare className="h-3.5 w-3.5 text-cyan-400" />
                <span>Voltar ao Chat</span>
              </>
            ) : (
              <>
                <Network className="h-3.5 w-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Grafo 3D</span>
              </>
            )}
          </button>

          {/* Admin Navigation shortcut — exibido com destaque e garantia de acesso para admins */}
          {isAdmin && (
            <button
              onClick={() => router.push(isOnAdminPage ? "/chat" : "/admin")}
              className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all shadow-sm ${
                isOnAdminPage
                  ? "border-blue-500/50 bg-blue-600/15 text-blue-300 hover:bg-blue-600/25"
                  : "border-purple-500/50 bg-purple-950/50 text-purple-200 hover:border-purple-400 hover:bg-purple-900/60 shadow-purple-950/40"
              }`}
              title={isOnAdminPage ? "Voltar ao Chat de IA" : "Acessar Painel Administrativo"}
            >
              {isOnAdminPage ? (
                <>
                  <MessageSquare className="h-3.5 w-3.5 text-blue-400" />
                  <span>Voltar ao Chat</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-3.5 w-3.5 text-purple-400" />
                  <span>Painel Admin</span>
                </>
              )}
            </button>
          )}

          {/* User Profile Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/90 py-1.5 pl-2 pr-3 transition hover:border-slate-700 hover:bg-slate-800/90"
              aria-expanded={menuOpen}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-[#0072BC] to-sky-400 text-xs font-bold text-white shadow-sm">
                {initial}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="max-w-[120px] truncate text-xs font-medium text-slate-200">
                  {user?.email?.split("@")[0] ?? "Usuário"}
                </span>
                <span className="text-[10px] text-slate-400 capitalize">
                  {isAdmin ? "Admin" : "Usuário"}
                </span>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-12 z-50 w-64 origin-top-right rounded-xl border border-slate-800 bg-slate-900 p-2 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100">
                <div className="border-b border-slate-800/80 px-3 py-2.5">
                  <p className="truncate text-xs font-semibold text-slate-100">
                    {user?.email ?? "Carregando..."}
                  </p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span
                      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium ${
                        isAdmin
                          ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                          : "bg-blue-500/15 text-blue-300 border border-blue-500/30"
                      }`}
                    >
                      {isAdmin ? "Administrador" : "Usuário Padrão"}
                    </span>
                    <span className="text-[10px] text-emerald-400">● Aprovado</span>
                  </div>
                </div>

                <div className="py-1 space-y-0.5">
                  {isAdmin && !isOnAdminPage && (
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        router.push("/admin");
                      }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 transition"
                    >
                      <ShieldCheck className="h-4 w-4 text-purple-400" />
                      <span>Painel de Administração</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setShowPasswordModal(true);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 transition"
                  >
                    <KeyRound className="h-4 w-4 text-sky-400" />
                    <span>Trocar senha</span>
                  </button>

                  <div className="my-1 border-t border-slate-800/80"></div>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition"
                  >
                    <LogOut className="h-4 w-4 text-rose-400" />
                    <span>Encerrar sessão</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
                  <KeyRound className="h-4 w-4" />
                </div>
                <h3 className="text-base font-semibold text-white">Alterar Senha</h3>
              </div>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Senha atual
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Nova senha (mínimo 8 caracteres)
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-300">
                  Confirmar nova senha
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {passwordError && (
                <div className="rounded-lg bg-rose-500/10 p-2.5 text-xs text-rose-400 border border-rose-500/20">
                  {passwordError}
                </div>
              )}

              {passwordSuccess && (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 p-2.5 text-xs text-emerald-400 border border-emerald-500/20">
                  <Check className="h-4 w-4" />
                  <span>Senha alterada com sucesso!</span>
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-gradient-to-r from-[#0072BC] to-sky-500 px-4 py-2 text-xs font-medium text-white shadow-md hover:opacity-90 disabled:opacity-50"
                >
                  {saving ? "Salvando..." : "Salvar nova senha"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
