"use client";

import { useEffect, useState } from "react";
import {
  adminApi,
  TokenSummaryOut,
  UserTokenUsageOut,
  SessionTokenUsageOut,
  ApiError,
} from "@/lib/api";
import {
  Zap,
  TrendingUp,
  Users,
  MessageSquare,
  Search,
  RefreshCw,
  Cpu,
  BarChart3,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
} from "lucide-react";

export default function TokenUsagePanel() {
  const [summary, setSummary] = useState<TokenSummaryOut | null>(null);
  const [usersUsage, setUsersUsage] = useState<UserTokenUsageOut[]>([]);
  const [sessionsUsage, setSessionsUsage] = useState<SessionTokenUsageOut[]>([]);
  const [activeSubTab, setActiveSubTab] = useState<"users" | "sessions">("users");
  const [searchFilter, setSearchFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const [sum, usr, ses] = await Promise.all([
        adminApi.getTokenSummary(),
        adminApi.getTokenUsageByUsers(),
        adminApi.getTokenUsageBySessions(),
      ]);
      setSummary(sum);
      setUsersUsage(usr);
      setSessionsUsage(ses);
    } catch (err: any) {
      setError(err instanceof ApiError ? err.message : "Erro ao carregar telemetria de tokens.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function formatNumber(num: number): string {
    return new Intl.NumberFormat("pt-BR").format(num);
  }

  function formatShortNumber(num: number): string {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`;
    return num.toString();
  }

  const filteredUsers = usersUsage.filter((u) =>
    u.email.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const filteredSessions = sessionsUsage.filter(
    (s) =>
      s.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.user_email.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const grandTotal = summary?.total_tokens || 1;

  return (
    <div className="space-y-6">
      {/* Header com Ações */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
            <Zap className="h-5 w-5 text-amber-400" />
            <span>Telemetria & Controle de Uso de Tokens</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Métricas de consumo por sessão, usuário e modelos da API Gateway aXet
          </p>
        </div>

        <button
          type="button"
          onClick={loadData}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 active:scale-95 transition shrink-0"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-sky-400 ${loading ? "animate-spin" : ""}`} />
          <span>{loading ? "Atualizando..." : "Atualizar Métricas"}</span>
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300">
          {error}
        </div>
      )}

      {/* Top KPI Cards (Grid Simétrico de 4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Geral */}
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-[#0e1628] p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Geral de Tokens
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
              <Zap className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-white">
              {summary ? formatShortNumber(summary.total_tokens) : "..."}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              ({summary ? formatNumber(summary.total_tokens) : "0"} tk)
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400">
            <Cpu className="h-3.5 w-3.5 text-sky-400" />
            <span className="truncate">Modelo padrão: gpt-5.6-terra-high</span>
          </div>
        </div>

        {/* Card 2: Tokens de Prompt (Entrada) */}
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-[#0e1628] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Prompt (Entrada)
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/15 text-sky-400">
              <ArrowDownLeft className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-sky-300">
              {summary ? formatShortNumber(summary.prompt_tokens) : "..."}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {summary && summary.total_tokens > 0
                ? `${Math.round((summary.prompt_tokens / summary.total_tokens) * 100)}%`
                : "0%"}
            </span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400">
            Consultas do usuário + contexto RAG
          </div>
        </div>

        {/* Card 3: Tokens de Completion (Saída) */}
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-[#0e1628] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Completion (Saída)
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/15 text-purple-400">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-purple-300">
              {summary ? formatShortNumber(summary.completion_tokens) : "..."}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {summary && summary.total_tokens > 0
                ? `${Math.round((summary.completion_tokens / summary.total_tokens) * 100)}%`
                : "0%"}
            </span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400">
            Respostas sintetizadas pela IA
          </div>
        </div>

        {/* Card 4: Sessões e Usuários */}
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-[#0e1628] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Sessões & Usuários
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-emerald-300">
              {summary ? summary.total_conversations : "0"}
            </span>
            <span className="text-xs text-slate-400">
              sessões / {summary ? summary.total_users : "0"} usuários
            </span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 font-mono">
            {summary && summary.total_conversations > 0
              ? `~${formatShortNumber(Math.round(summary.total_tokens / summary.total_conversations))} tk / sessão`
              : "0 tk / sessão"}
          </div>
        </div>
      </div>

      {/* Seletor de Visão e Busca */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        {/* Sub-Tabs de Visão */}
        <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveSubTab("users")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
              activeSubTab === "users"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Users className="h-3.5 w-3.5 text-sky-400" />
            <span>Consumo por Usuário ({usersUsage.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab("sessions")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
              activeSubTab === "sessions"
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5 text-purple-400" />
            <span>Consumo por Sessão ({sessionsUsage.length})</span>
          </button>
        </div>

        {/* Input de Busca */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder={activeSubTab === "users" ? "Buscar por e-mail..." : "Buscar por título ou autor..."}
            className="w-full rounded-xl border border-slate-800 bg-slate-950/80 pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:outline-none transition"
          />
        </div>
      </div>

      {/* Visão 1: Tabela de Usuários */}
      {activeSubTab === "users" && (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="border-b border-slate-800 bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Usuário Corporativo</th>
                  <th className="px-4 py-3.5 font-semibold text-center">Perfil</th>
                  <th className="px-4 py-3.5 font-semibold text-center">Sessões</th>
                  <th className="px-4 py-3.5 font-semibold text-right">Prompt</th>
                  <th className="px-4 py-3.5 font-semibold text-right">Completion</th>
                  <th className="px-4 py-3.5 font-semibold text-right">Total Tokens</th>
                  <th className="px-5 py-3.5 font-semibold">Proporção Global</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-8 text-center text-xs text-slate-500">
                      Nenhum registro de uso encontrado.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((usr, idx) => {
                    const pct = Math.min(100, Math.round((usr.total_tokens / grandTotal) * 100));
                    return (
                      <tr key={usr.user_id} className="hover:bg-slate-800/40 transition">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-sky-400 text-xs font-bold text-white shadow-sm">
                              {usr.email[0].toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-slate-100">{usr.email}</span>
                              <span className="text-[10px] text-slate-500 font-mono">
                                ID: {usr.user_id.slice(0, 8)}...
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <span
                            className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-semibold ${
                              usr.role.toLowerCase() === "admin"
                                ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {usr.role}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-center font-mono">
                          {usr.conversation_count}
                        </td>
                        <td className="px-4 py-3.5 text-right font-mono text-sky-300">
                          {formatNumber(usr.prompt_tokens)}
                        </td>
                        <td className="px-4 py-3.5 text-right font-mono text-purple-300">
                          {formatNumber(usr.completion_tokens)}
                        </td>
                        <td className="px-4 py-3.5 text-right font-mono font-bold text-white">
                          {formatNumber(usr.total_tokens)}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="flex-1 bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-amber-400 h-full rounded-full transition-all duration-300"
                                style={{ width: `${Math.max(3, pct)}%` }}
                              />
                            </div>
                            <span className="w-8 text-[11px] font-mono text-slate-400 text-right">
                              {pct}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Visão 2: Tabela de Sessões (Conversas) */}
      {activeSubTab === "sessions" && (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="border-b border-slate-800 bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Título da Sessão</th>
                  <th className="px-4 py-3.5 font-semibold">Autor</th>
                  <th className="px-4 py-3.5 font-semibold text-center">Mensagens</th>
                  <th className="px-4 py-3.5 font-semibold text-right">Prompt</th>
                  <th className="px-4 py-3.5 font-semibold text-right">Completion</th>
                  <th className="px-4 py-3.5 font-semibold text-right">Total Tokens</th>
                  <th className="px-5 py-3.5 font-semibold">Atualização</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredSessions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-8 text-center text-xs text-slate-500">
                      Nenhuma sessão encontrada.
                    </td>
                  </tr>
                ) : (
                  filteredSessions.map((ses) => (
                    <tr key={ses.conversation_id} className="hover:bg-slate-800/40 transition">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                          <span className="font-semibold text-slate-100 truncate max-w-xs">
                            {ses.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-300 font-mono text-[11px]">
                        {ses.user_email}
                      </td>
                      <td className="px-4 py-3.5 text-center font-mono">
                        {ses.message_count}
                      </td>
                      <td className="px-4 py-3.5 text-right font-mono text-sky-300">
                        {formatNumber(ses.prompt_tokens)}
                      </td>
                      <td className="px-4 py-3.5 text-right font-mono text-purple-300">
                        {formatNumber(ses.completion_tokens)}
                      </td>
                      <td className="px-4 py-3.5 text-right font-mono font-bold text-amber-300">
                        {formatNumber(ses.total_tokens)}
                      </td>
                      <td className="px-5 py-3.5 text-slate-400 text-[11px]">
                        {ses.updated_at ? new Date(ses.updated_at).toLocaleString("pt-BR") : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
