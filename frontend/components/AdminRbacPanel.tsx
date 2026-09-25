"use client";

import React, { useEffect, useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  UserPlus,
  Trash2,
  Crown,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Lock,
  Rocket,
  Download,
  ExternalLink,
} from "lucide-react";
import { rbacApi, RbacUserItem } from "@/lib/api";
import { isMasterAdmin, MASTER_ADMIN_EMAIL } from "@/lib/auth";

export default function AdminRbacPanel() {
  const [users, setUsers] = useState<RbacUserItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Automação Desktop 1-Clique (.dmg e .msi)
  const [buildVersion, setBuildVersion] = useState("v1.0.0");
  const [triggeringBuild, setTriggeringBuild] = useState(false);

  // Formulário para conceder privilégios
  const [emailInput, setEmailInput] = useState("");
  const [notesInput, setNotesInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [revokingEmail, setRevokingEmail] = useState<string | null>(null);

  const isMaster = isMasterAdmin();

  const handleTriggerDesktopBuild = async () => {
    setTriggeringBuild(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await rbacApi.triggerDesktopBuild(buildVersion);
      setSuccess(`🚀 ${res.message}`);
    } catch (err: any) {
      setError(err.message || "Erro ao disparar compilação desktop.");
    } finally {
      setTriggeringBuild(false);
    }
  };

  const loadRbacUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await rbacApi.listUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar lista de administradores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRbacUsers();
  }, []);

  const handleGrantAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const created = await rbacApi.grantAdmin(emailInput.trim(), notesInput.trim() || undefined);
      setSuccess(`Privilégios de Administrador concedidos com sucesso para ${created.email}!`);
      setEmailInput("");
      setNotesInput("");
      await loadRbacUsers();
    } catch (err: any) {
      setError(err.message || "Falha ao conceder privilégios de Administrador.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRevokeAdmin = async (email: string) => {
    if (!confirm(`Tem certeza de que deseja revogar o papel de Administrador de ${email}?`)) {
      return;
    }

    setRevokingEmail(email);
    setError(null);
    setSuccess(null);

    try {
      await rbacApi.revokeAdmin(email);
      setSuccess(`Privilégios de Administrador revogados para ${email}.`);
      await loadRbacUsers();
    } catch (err: any) {
      setError(err.message || "Falha ao revogar privilégios.");
    } finally {
      setRevokingEmail(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner de Identidade e Controle Master */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-xl p-6 text-white shadow-lg border border-blue-700/50">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-400/20 text-yellow-300 rounded-xl border border-yellow-400/40">
              <Crown className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight">
                  👑 Gestão de Administradores Corporativos
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-yellow-400/20 text-yellow-200 border border-yellow-400/40">
                  Master Admin Exclusivo
                </span>
              </div>
              <p className="text-sm text-blue-200 mt-1">
                Controle supremo de privilégios. Somente o Master Admin (
                <span className="font-mono text-yellow-300">{MASTER_ADMIN_EMAIL}</span>) pode elencar
                ou revogar novos administradores (Windows ou Mac).
              </p>
            </div>
          </div>
          <button
            onClick={loadRbacUsers}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 active:bg-white/25 rounded-lg text-xs font-medium text-white transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </button>
        </div>
      </div>

      {/* Alertas */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Card de Automação: Compilar e Publicar Versão Desktop (.dmg / .msi) */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-xl border border-indigo-500/30 p-6 text-white shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-indigo-800/40 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-400/30">
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                🚀 Compilação e Distribuição Desktop (.dmg e .msi)
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-mono">
                  1-CLIQUE AUTOMÁTICO
                </span>
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Dispara a compilação simultânea na nuvem do instalador para Mac (.dmg Universal) e Windows (.msi corporativo) e anexa nas Releases corporativas.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs text-slate-400">Tag:</span>
              <input
                type="text"
                value={buildVersion}
                onChange={(e) => setBuildVersion(e.target.value)}
                placeholder="v1.0.0"
                className="pl-11 pr-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white font-mono focus:border-blue-400 outline-none w-28"
              />
            </div>
            <button
              onClick={handleTriggerDesktopBuild}
              disabled={triggeringBuild || !buildVersion.trim()}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow transition disabled:opacity-50 whitespace-nowrap"
            >
              <Rocket className={`w-3.5 h-3.5 ${triggeringBuild ? "animate-bounce" : ""}`} />
              {triggeringBuild ? "Iniciando..." : "Disparar Compilação na Nuvem"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-1">
          <a
            href="https://github.com/gcostabe/AXET-NEURALGRAPH-3D/releases/latest/download/AXET-NeuralGraph.dmg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition text-xs text-slate-200"
          >
            <Download className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <div className="truncate">
              <div className="font-semibold text-white">🍏 Download macOS (.dmg)</div>
              <div className="text-[10px] text-slate-400 truncate">Link fixo da última versão</div>
            </div>
          </a>

          <a
            href="https://github.com/gcostabe/AXET-NEURALGRAPH-3D/releases/latest/download/AXET-NeuralGraph-Setup.msi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition text-xs text-slate-200"
          >
            <Download className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <div className="truncate">
              <div className="font-semibold text-white">🪟 Download Windows (.msi)</div>
              <div className="text-[10px] text-slate-400 truncate">Link fixo corporativo silencioso</div>
            </div>
          </a>

          <a
            href="https://github.com/gcostabe/AXET-NEURALGRAPH-3D/actions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition text-xs text-slate-200"
          >
            <ExternalLink className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div className="truncate">
              <div className="font-semibold text-white">📊 Monitor de Builds (Actions)</div>
              <div className="text-[10px] text-slate-400 truncate">Ver progresso no GitHub</div>
            </div>
          </a>
        </div>
      </div>

      {/* Formulário: Adicionar Novo Administrador */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2 mb-4">
          <UserPlus className="w-5 h-5 text-blue-600" />
          Elencar Novo Administrador Delegado
        </h3>
        <form onSubmit={handleGrantAdmin} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                E-mail Corporativo Okta (NTT DATA) *
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="colaborador@emeal.nttdata.com"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Observações / Justificativa (Opcional)
              </label>
              <input
                type="text"
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Ex.: Responsável Ingestão Vídeos Windows / Líder Técnico"
                className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting || !emailInput.trim()}
              className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-medium rounded-lg shadow-sm transition disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              {submitting ? "Processando..." : "Conceder Privilégios de Administrador"}
            </button>
          </div>
        </form>
      </div>

      {/* Tabela de Administradores Ativos */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            Quadro de Administradores Autorizados ({users.length})
          </h3>
          <span className="text-xs text-slate-500">
            Administradores têm acesso a Ingestão OneDrive e Publicação de Bases.
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {users.map((u) => (
            <div
              key={u.email}
              className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition ${
                u.is_master ? "bg-amber-50/40" : "hover:bg-slate-50/70"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-semibold text-sm text-slate-900">{u.email}</span>
                  {u.is_master ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                      <Crown className="w-3 h-3 text-amber-600" />
                      MASTER ADMIN
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      <ShieldCheck className="w-3 h-3 text-indigo-500" />
                      ADMIN DELEGADO
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span>
                    Concedido por:{" "}
                    <strong className="text-slate-700">{u.granted_by || "Sistema"}</strong>
                  </span>
                  {u.created_at && (
                    <span>
                      Data:{" "}
                      {new Date(u.created_at).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>
                {u.notes && <p className="text-xs text-slate-600 italic">“{u.notes}”</p>}
              </div>

              <div>
                {u.is_master ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100/60 text-amber-800 text-xs font-medium border border-amber-200/80">
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    Papel Imutável
                  </div>
                ) : (
                  <button
                    onClick={() => handleRevokeAdmin(u.email)}
                    disabled={revokingEmail === u.email}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 active:bg-red-100 rounded-lg border border-red-200 transition disabled:opacity-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    {revokingEmail === u.email ? "Revogando..." : "Revogar Acesso"}
                  </button>
                )}
              </div>
            </div>
          ))}

          {users.length === 0 && !loading && (
            <div className="p-8 text-center text-slate-500 text-sm">
              Nenhum administrador encontrado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
