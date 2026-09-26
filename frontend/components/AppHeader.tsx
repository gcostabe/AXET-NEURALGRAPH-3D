"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authApi, UserOut, ApiError, GatewayAuthStatusResponse } from "@/lib/api";
import { clearToken, isAdmin as checkIsAdmin } from "@/lib/auth";
import NttDataLogo from "./NttDataLogo";
import OktaSsoModal from "./OktaSsoModal";
import OktaCorporateSessionModal from "./OktaCorporateSessionModal";
import { KnowledgeSnapshotModal } from "./KnowledgeSnapshotModal";
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
  Network,
  CloudDownload,
  Info
} from "lucide-react";
import packageJson from "../package.json";

export default function AppHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserOut | null>(null);
  const [oktaStatus, setOktaStatus] = useState<GatewayAuthStatusResponse | null>(null);
  const [showOktaModal, setShowOktaModal] = useState(false);
  const [showCorporateModal, setShowCorporateModal] = useState(false);
  const [showSnapshotModal, setShowSnapshotModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
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
    authApi.oktaStatus().then(setOktaStatus).catch(() => {});

    const interval = setInterval(() => {
      authApi.oktaStatus().then(setOktaStatus).catch(() => {});
    }, 30000);
    return () => clearInterval(interval);
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
                AXET-NEURALGRAPH-3D
                <span className="inline-flex items-center rounded bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-400 border border-emerald-500/20">
                  <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  ONLINE
                </span>
              </span>
              <span className="text-[11px] text-slate-400">
                Cognição Neural 3D & Conhecimento Corporativo
              </span>
            </div>
          </button>
        </div>

        {/* Right Navigation & User Menu */}
        <div className="flex items-center gap-2.5">
          {/* Okta SSO Gateway Status Pill */}
          <button
            onClick={() => setShowCorporateModal(true)}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all shadow-sm ${
              oktaStatus?.authenticated
                ? ((oktaStatus.remaining_seconds || 0) > 600
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                    : "border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 animate-pulse")
                : "border-rose-500/40 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
            }`}
            title={
              oktaStatus?.authenticated
                ? `Okta SSO Conectado • ${Math.round((oktaStatus.remaining_seconds || 0) / 60)} min restantes • Ver detalhes da sessão corporativa`
                : "Okta SSO • Clique para detalhes e conexão"
            }
          >
            <span
              className={`h-2 w-2 rounded-full ${
                oktaStatus?.authenticated
                  ? ((oktaStatus.remaining_seconds || 0) > 600
                      ? "bg-emerald-400 shadow-sm shadow-emerald-400/50"
                      : "bg-amber-400")
                  : "bg-rose-400"
              }`}
            />
            <span className="hidden md:inline text-[11px] font-semibold">
              {oktaStatus?.authenticated
                ? ((oktaStatus.remaining_seconds || 0) > 600 ? "Okta SSO" : "Renovar SSO")
                : "Okta SSO"}
            </span>
          </button>

          {/* Sincronização da Base Oficial (1 Clique) */}
          <button
            onClick={() => setShowSnapshotModal(true)}
            className="flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/20 px-2.5 py-1.5 text-xs font-semibold text-cyan-300 hover:border-cyan-400 hover:text-cyan-200 hover:bg-cyan-900/30 transition-all shadow-sm shadow-cyan-950/20"
            title="Sincronizar Base Oficial em 1 Clique (Vetores Qdrant & Grafo Neural)"
          >
            <CloudDownload className="h-3.5 w-3.5 text-cyan-400" />
            <span className="hidden sm:inline text-[11px]">Sincronizar Base</span>
          </button>
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
                      setShowCorporateModal(true);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 transition"
                  >
                    <span className="text-xs">🏢</span>
                    <span>Sessão Okta & Gateway</span>
                  </button>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setShowSnapshotModal(true);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 transition"
                  >
                    <span className="text-xs">📦</span>
                    <span>Sincronizar Base Local</span>
                  </button>

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

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setShowAboutModal(true);
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 transition"
                  >
                    <Info className="h-4 w-4 text-blue-400" />
                    <span>About AXET</span>
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

      {/* Okta SSO Renewal Modal */}
      <OktaSsoModal
        isOpen={showOktaModal}
        onClose={() => setShowOktaModal(false)}
        onSuccess={() => {
          setShowOktaModal(false);
          authApi.oktaStatus().then(setOktaStatus);
        }}
        isRenewal={true}
      />

      {/* Detalhamento da Sessão Corporativa Okta SSO & Gateway */}
      <OktaCorporateSessionModal
        isOpen={showCorporateModal}
        onClose={() => setShowCorporateModal(false)}
        initialStatus={oktaStatus}
        onStatusUpdate={(updated) => setOktaStatus(updated)}
      />

      {/* Sincronização Segura da Base de Conhecimento Local (Opção 1) */}
      <KnowledgeSnapshotModal
        isOpen={showSnapshotModal}
        onClose={() => setShowSnapshotModal(false)}
      />

      {/* Modal About AXET-NeuralGraph */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/95 p-6 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setShowAboutModal(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* About Header */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#0072BC] to-sky-400 p-3 shadow-lg shadow-blue-500/20">
                <NttDataLogo className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                AXET-NeuralGraph 3D
              </h3>
              
              <div className="mt-2 flex flex-col items-center justify-center gap-0.5 text-center">
                <p className="text-xs text-slate-400">
                  Version {packageJson.version || "1.0.9"} (Desktop Edition)
                </p>
                <p className="text-xs text-slate-400">
                  Application Services - MAPPS
                </p>
              </div>

              <p className="mt-3 text-xs text-slate-400 leading-relaxed max-w-xs text-center">
                Enterprise 3D Neural Knowledge Platform & High-Performance RAG System with Epistemic Sandboxing and Multimodal Analysis.
              </p>
            </div>

            {/* Creators & Architects Card - Centralizado e padronizado no mesmo padrão da versão */}
            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-center">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 text-center">
                Creators & Architects
              </div>
              <div className="space-y-1.5 text-center text-xs text-slate-400">
                <p className="leading-relaxed">
                  <span className="text-slate-300">Gustavo Costa Berbert:</span>{" "}
                  <span className="text-slate-400">Solution Architect & Cognitive Intelligence</span>
                </p>
                <p className="leading-relaxed">
                  <span className="text-slate-300">Marcio Miguel:</span>{" "}
                  <span className="text-slate-400">Executive Leadership & Business Architecture</span>
                </p>
              </div>
            </div>

            {/* Institutional Footer */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col items-center justify-center gap-1 text-xs text-slate-400 text-center">
              <span>© 2026 NTT DATA. All rights reserved.</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
