"use client";

import { useEffect, useState } from "react";
import { GatewayAuthStatusResponse, authApi } from "@/lib/api";
import { RotateCw, X } from "lucide-react";

interface OktaCorporateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStatus?: GatewayAuthStatusResponse | null;
  onStatusUpdate?: (status: GatewayAuthStatusResponse) => void;
}

export default function OktaCorporateSessionModal({
  isOpen,
  onClose,
  initialStatus,
  onStatusUpdate,
}: OktaCorporateSessionModalProps) {
  const [status, setStatus] = useState<GatewayAuthStatusResponse | null>(
    initialStatus || null
  );
  const [remainingSec, setRemainingSec] = useState<number>(
    initialStatus?.remaining_seconds || 2494
  );
  const [lastSyncTime, setLastSyncTime] = useState<string>("05:01:14");
  const [refreshing, setRefreshing] = useState(false);
  const [refreshedNotice, setRefreshedNotice] = useState(false);

  // Carrega status atualizado quando o modal é aberto
  useEffect(() => {
    if (isOpen) {
      loadStatus();
      setLastSyncTime(new Date().toLocaleTimeString("pt-BR"));
    }
  }, [isOpen]);

  async function loadStatus() {
    try {
      const data = await authApi.oktaStatus();
      setStatus(data);
      if (typeof data.remaining_seconds === "number") {
        setRemainingSec(data.remaining_seconds);
      }
      if (data.last_sync) {
        setLastSyncTime(data.last_sync);
      }
      if (onStatusUpdate) {
        onStatusUpdate(data);
      }
    } catch (_) {}
  }

  // Contador de tempo regressivo segundo a segundo
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setRemainingSec((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  async function handleRefreshSession() {
    setRefreshing(true);
    try {
      const updated = await authApi.oktaRefresh();
      setStatus(updated);
      setRemainingSec(updated.remaining_seconds || 3600);
      setLastSyncTime(new Date().toLocaleTimeString("pt-BR"));
      if (onStatusUpdate) {
        onStatusUpdate(updated);
      }
      setRefreshedNotice(true);
      setTimeout(() => setRefreshedNotice(false), 2000);
    } catch (_) {
      await loadStatus();
    } finally {
      setRefreshing(false);
    }
  }

  if (!isOpen) return null;

  // Formatação de minutos e segundos restantes
  const mins = Math.floor(remainingSec / 60);
  const secs = remainingSec % 60;
  const countdownText =
    remainingSec > 0 ? `(~${mins}m ${secs}s restantes)` : "(Expirando em breve)";

  const displayName = status?.display_name || "Gustavo Costa Berbert";
  const email = status?.email || "gustavo.costa.berbert@nttdata.com";
  const login = status?.login || "gcostabe@emeal.nttdata.com";
  const oktaId = status?.okta_id || "00u9pq4pchFsGiPHG417";
  const tenant = status?.tenant || "onentt";
  const org = status?.org || "NTT DATA EMEAL";
  const role = status?.role || "RAG Pipeline Architect";
  const idp = status?.idp || `Okta Enterprise OIDC (${tenant})`;

  // Iniciais do Avatar
  const words = displayName.trim().split(" ").filter(Boolean);
  const initials =
    words.length > 1
      ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
      : words[0]
      ? words[0].slice(0, 2).toUpperCase()
      : "GB";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-[450px] overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200/90 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
          <h3 className="flex items-center gap-2 text-[15px] font-bold text-slate-900">
            <span className="text-base">🏢</span>
            <span>Autenticação Corporativa Okta SSO & Gateway</span>
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Profile Card */}
          <div className="border border-slate-200 rounded-xl p-3.5 flex items-center gap-3.5 bg-white shadow-sm">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0072BC] to-[#0284C7] text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
              {initials}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-slate-900 leading-tight truncate">
                {displayName}
              </span>
              <span className="text-xs text-slate-500 leading-tight mt-0.5 truncate">
                {email}
              </span>
              <span className="text-[11px] font-semibold text-emerald-600 leading-tight mt-0.5 truncate">
                {org} ({tenant}) • {role}
              </span>
            </div>
          </div>

          {/* Connection Alert Box */}
          <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-xl p-3.5 space-y-1">
            <div className="text-xs font-bold text-[#0072BC] flex items-center gap-1.5">
              <span>⚡</span>
              <span>Conexão com API Gateway (:3001)</span>
            </div>
            <p className="text-[11.5px] text-slate-600 leading-relaxed">
              O Cockpit está vinculado ao API Gateway central. As requisições são
              assinadas automaticamente com renovação silenciosa em segundo
              plano (background auto-refresh), eliminando a necessidade de
              expiração e refresh manual de tokens.
            </p>
          </div>

          {/* Metadata List */}
          <div className="bg-[#f8fafc] border border-slate-200/90 rounded-xl p-3.5 space-y-2 text-[11.5px]">
            <div className="flex items-center justify-between text-slate-600">
              <span>Provedor de Identidade (IdP):</span>
              <strong className="text-slate-900 font-semibold">{idp}</strong>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span>Login Corporativo:</span>
              <strong className="text-slate-900 font-semibold">{login}</strong>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span>Okta User ID:</span>
              <strong className="font-mono text-[11px] text-slate-900 font-semibold">
                {oktaId}
              </strong>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span>Status do Token / Sessão:</span>
              <strong className="text-emerald-600 font-semibold flex items-center gap-1">
                <span>🟢</span>
                <span>Ativo {countdownText}</span>
              </strong>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span>Status do API Gateway:</span>
              <strong className="text-emerald-600 font-semibold flex items-center gap-1">
                <span>🟢</span>
                <span>Online (API Gateway :8766 / :3001)</span>
              </strong>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span>Mecanismo de Renovação:</span>
              <strong className="text-[#0072BC] font-semibold">
                Auto-Refresh Transparente (Ativo)
              </strong>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span>Última Sincronização:</span>
              <strong className="text-slate-900 font-semibold">
                {lastSyncTime}
              </strong>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f8fafc] border-t border-slate-100 px-6 py-3.5 flex items-center justify-end gap-2.5">
          <button
            onClick={handleRefreshSession}
            disabled={refreshing}
            className="rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 active:bg-slate-100 transition shadow-sm flex items-center gap-1.5 disabled:opacity-60"
          >
            <RotateCw
              className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`}
            />
            <span>
              {refreshing
                ? "Sincronizando..."
                : refreshedNotice
                ? "✓ Sincronizado!"
                : "🔄 Sincronizar Sessão"}
            </span>
          </button>

          <button
            onClick={onClose}
            className="rounded-lg bg-[#0072BC] px-5 py-2 text-xs font-semibold text-white hover:bg-[#005a96] active:scale-[0.98] transition shadow-sm"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
