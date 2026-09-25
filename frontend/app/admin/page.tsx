"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RequireAuth from "@/components/RequireAuth";
import AppHeader from "@/components/AppHeader";
import SourcesPanel from "@/components/SourcesPanel";
import { KnowledgePanel } from "@/components/KnowledgePanel";
import FeedbackAuditPanel from "@/components/FeedbackAuditPanel";
import TokenUsagePanel from "@/components/TokenUsagePanel";
import AdminSnapshotsPanel from "@/components/AdminSnapshotsPanel";
import AdminRbacPanel from "@/components/AdminRbacPanel";
import { isMasterAdmin, isAdmin } from "@/lib/auth";
import {
  adminApi,
  UserOut,
  AuditLogEntry,
  Conversation,
  SourcesConfig,
  ReindexStatus,
  ApiError,
} from "@/lib/api";

const STATUS_LABEL: Record<string, string> = {
  pending: "Pendente",
  approved: "Aprovado",
  blocked: "Bloqueado",
};

function AdminInner() {
  const router = useRouter();
  const isMaster = isMasterAdmin();
  const [adminTab, setAdminTab] = useState<"knowledge" | "quality" | "sources" | "snapshots" | "tokens" | "users" | "rbac">("knowledge");
  const [users, setUsers] = useState<UserOut[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);
  const [showAudit, setShowAudit] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inspecting, setInspecting] = useState<UserOut | null>(null);
  const [inspectedConversations, setInspectedConversations] = useState<
    Conversation[]
  >([]);

  async function loadUsers() {
    try {
      setUsers(await adminApi.listUsers(statusFilter || undefined));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao carregar usuários.");
    }
  }

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  async function handleApprove(userId: string) {
    try {
      await adminApi.approve(userId);
      loadUsers();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao aprovar.");
    }
  }

  async function handleBlock(userId: string) {
    try {
      await adminApi.block(userId);
      loadUsers();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao bloquear.");
    }
  }

  async function handleRoleChange(userId: string, role: string) {
    try {
      await adminApi.changeRole(userId, role);
      loadUsers();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao alterar role.");
    }
  }

  async function handleInspect(user: UserOut) {
    setInspecting(user);
    try {
      setInspectedConversations(await adminApi.userConversations(user.id));
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Erro ao carregar histórico do usuário.",
      );
    }
  }

  async function loadAuditLog() {
    try {
      setAuditLog(await adminApi.auditLog());
      setShowAudit(true);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Erro ao carregar auditoria.",
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <AppHeader />
      <div className="mx-auto max-w-5xl space-y-6 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Painel Administrativo</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Gestão de fontes, telemetria de conhecimento evolutivo e controle de acessos
            </p>
          </div>
          <div className="space-x-3">
            <button
              onClick={loadAuditLog}
              className="rounded border border-slate-700 px-3 py-1.5 text-sm hover:bg-slate-800 transition"
            >
              Ver auditoria
            </button>
            <button
              onClick={() => router.push("/chat")}
              className="rounded border border-slate-700 px-3 py-1.5 text-sm hover:bg-slate-800 transition"
            >
              Ir para chat
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        {/* Abas Administrativas */}
        <div className="flex border-b border-slate-800 gap-2 overflow-x-auto">
          <button
            onClick={() => setAdminTab("sources")}
            className={`pb-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              adminTab === "sources"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <span>📥 1. Novos Documentos (Ingestão)</span>
          </button>
          <button
            onClick={() => setAdminTab("snapshots")}
            className={`pb-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              adminTab === "snapshots"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <span>🚀 2. Distribuição da Base (OneDrive)</span>
          </button>
          <button
            onClick={() => setAdminTab("knowledge")}
            className={`pb-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              adminTab === "knowledge"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <span>🧠 3. Grafo & Cognição</span>
          </button>
          <button
            onClick={() => setAdminTab("quality")}
            className={`pb-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              adminTab === "quality"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <span>🎯 4. Qualidade & Auditoria</span>
          </button>
          <button
            onClick={() => setAdminTab("tokens")}
            className={`pb-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              adminTab === "tokens"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <span>⚡ 5. Telemetria de Tokens</span>
          </button>
          <button
            onClick={() => setAdminTab("users")}
            className={`pb-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              adminTab === "users"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <span>👥 6. Usuários ({users.length})</span>
          </button>
          {(isMaster || isAdmin()) && (
            <button
              onClick={() => setAdminTab("rbac")}
              className={`pb-3 px-4 text-sm font-medium border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
                adminTab === "rbac"
                  ? "border-amber-400 text-yellow-300 font-semibold bg-amber-500/10 rounded-t-lg"
                  : "border-transparent text-amber-300/80 hover:text-amber-200"
              }`}
            >
              <span>👑 7. Instaladores Desktop (.dmg & .msi)</span>
            </button>
          )}
        </div>

        {adminTab === "knowledge" && <KnowledgePanel />}

        {adminTab === "quality" && <FeedbackAuditPanel />}

        {adminTab === "sources" && <SourcesPanel />}

        {adminTab === "snapshots" && <AdminSnapshotsPanel />}

        {adminTab === "rbac" && <AdminRbacPanel />}

        {adminTab === "tokens" && <TokenUsagePanel />}

        {adminTab === "users" && (
          <div className="space-y-4">
            <div className="flex gap-2">
              {["", "pending", "approved", "blocked"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`rounded px-3 py-1 text-sm ${
                    statusFilter === s
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {s === "" ? "Todos" : STATUS_LABEL[s]}
                </button>
              ))}
            </div>

            <table className="w-full overflow-hidden rounded-lg bg-slate-900 text-sm">
              <thead className="bg-slate-800 text-left text-slate-300">
                <tr>
                  <th className="p-3">Email</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t border-slate-800">
                    <td className="p-3">
                      <button
                        onClick={() => handleInspect(u)}
                        className="text-blue-400 hover:underline"
                      >
                        {u.email}
                      </button>
                    </td>
                    <td className="p-3">{STATUS_LABEL[u.status] ?? u.status}</td>
                    <td className="p-3">{u.role}</td>
                    <td className="space-x-2 p-3">
                      {u.status !== "approved" && (
                        <button
                          onClick={() => handleApprove(u.id)}
                          className="rounded bg-green-600 px-2 py-1 text-xs hover:bg-green-500"
                        >
                          Aprovar
                        </button>
                      )}
                      {u.status !== "blocked" && (
                        <button
                          onClick={() => handleBlock(u.id)}
                          className="rounded bg-red-600 px-2 py-1 text-xs hover:bg-red-500"
                        >
                          Bloquear
                        </button>
                      )}
                      <button
                        onClick={() =>
                          handleRoleChange(u.id, (u.role || "").toLowerCase() === "admin" ? "user" : "admin")
                        }
                        className="rounded bg-slate-700 px-2 py-1 text-xs hover:bg-slate-600"
                      >
                        {(u.role || "").toLowerCase() === "admin" ? "Tornar usuário" : "Tornar admin"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {inspecting && (
          <div className="rounded-lg bg-slate-900 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-medium">
                Conversas de {inspecting.email}
              </h2>
              <button
                onClick={() => setInspecting(null)}
                className="text-sm text-slate-400 hover:text-slate-200"
              >
                Fechar
              </button>
            </div>
            {inspectedConversations.length === 0 ? (
              <p className="text-sm text-slate-400">
                Nenhuma conversa encontrada.
              </p>
            ) : (
              <ul className="space-y-1 text-sm text-slate-300">
                {inspectedConversations.map((c) => (
                  <li key={c.id}>{c.title || "Sem título"}</li>
                ))}
              </ul>
            )}
            <p className="mt-2 text-xs text-slate-500">
              Este acesso foi registrado no log de auditoria.
            </p>
          </div>
        )}

        {showAudit && (
          <div className="rounded-lg bg-slate-900 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-medium">Log de auditoria</h2>
              <button
                onClick={() => setShowAudit(false)}
                className="text-sm text-slate-400 hover:text-slate-200"
              >
                Fechar
              </button>
            </div>
            <ul className="max-h-96 space-y-1 overflow-y-auto text-sm text-slate-300">
              {auditLog.map((entry) => (
                <li key={entry.id} className="border-b border-slate-800 py-1">
                  <span className="text-slate-500">{entry.created_at}</span>{" "}
                  — {entry.action} {entry.target_user_id ?? ""}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

export default function AdminPage() {
  return (
    <RequireAuth role="admin">
      <AdminInner />
    </RequireAuth>
  );
}
