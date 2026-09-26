"use client";

import { useEffect, useRef, useState } from "react";
import {
  authApi,
  API_URL,
  ApiError,
  OktaDeviceAuthStartResponse,
  OktaPollResponse,
} from "@/lib/api";
import { setToken } from "@/lib/auth";
import { isDesktopApp, openExternalUrl } from "@/lib/desktop";
import {
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  KeyRound,
  Loader2,
  ShieldCheck,
  X,
  AlertCircle,
  Terminal,
} from "lucide-react";

interface DiagnosticReport {
  timestamp: string;
  step: string;
  endpoint: string;
  httpStatus: string;
  message: string;
  technicalDetails?: string;
  platform: string;
  isDesktop: boolean;
  apiUrl: string;
  troubleshootingTip: string;
}

interface OktaSsoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: OktaPollResponse) => void;
  isRenewal?: boolean;
}

export default function OktaSsoModal({
  isOpen,
  onClose,
  onSuccess,
  isRenewal = false,
}: OktaSsoModalProps) {
  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] =
    useState<OktaDeviceAuthStartResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [diagnostic, setDiagnostic] = useState<DiagnosticReport | null>(null);
  const [copiedDiagnostic, setCopiedDiagnostic] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pollStatus, setPollStatus] = useState<string>("Iniciando conexão...");

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isCancelledRef = useRef(false);

  function stopPolling() {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  }

  function createDiagnostic(
    step: string,
    endpoint: string,
    err: any,
    customTip?: string
  ): DiagnosticReport {
    const httpStatus =
      err instanceof ApiError
        ? `HTTP ${err.status}`
        : err?.status
        ? `HTTP ${err.status}`
        : "Network / Fetch Error";

    const rawMessage = err?.message || String(err);
    let tip = customTip || "";

    if (!tip) {
      if (
        httpStatus.includes("502") ||
        rawMessage.includes("Falha ao iniciar autorização no Okta") ||
        rawMessage.includes("ConnectError") ||
        rawMessage.includes("SSLCertVerificationError")
      ) {
        tip =
          "Falha de conexão entre o backend local e o servidor corporativo da Okta (https://onentt.okta.com). No Windows, verifique se há proxy corporativo (Zscaler, Netskope, BlueCoat), VPN ativa ou bloqueio de firewall para conexões de saída.";
      } else if (httpStatus.includes("405")) {
        tip =
          "Método HTTP não permitido (405). O backend local (FastAPI) na porta 8000 precisa ser reiniciado para carregar os métodos de login SSO.";
      } else if (
        rawMessage.includes("Failed to fetch") ||
        rawMessage.includes("NetworkError")
      ) {
        tip =
          "O aplicativo desktop não conseguiu conectar ao backend em http://localhost:8000. Certifique-se de que os serviços foram iniciados no Windows ('iniciar_windows.bat' ou Docker).";
      } else if (rawMessage.includes("expired")) {
        tip =
          "O código de ativação expirou no portal Okta. Clique em 'Tentar novamente' para gerar um novo código.";
      } else if (rawMessage.includes("access_denied")) {
        tip =
          "A autorização foi cancelada ou negada no portal OneNTT Okta.";
      } else {
        tip =
          "Verifique os logs do terminal e a conectividade com o backend local na porta 8000.";
      }
    }

    const platform =
      typeof navigator !== "undefined" ? navigator.userAgent : "Unknown";

    const report: DiagnosticReport = {
      timestamp: new Date().toISOString(),
      step,
      endpoint,
      httpStatus,
      message: rawMessage,
      technicalDetails:
        err?.stack || JSON.stringify(err, Object.getOwnPropertyNames(err)),
      platform,
      isDesktop: isDesktopApp(),
      apiUrl: API_URL,
      troubleshootingTip: tip,
    };

    console.error("[OKTA_SSO_DIAGNOSTIC_FAILURE]", report);
    return report;
  }

  function handleCopyDiagnostic() {
    if (!diagnostic) return;
    const text = [
      "### 📋 AXET Okta SSO Diagnostic Report",
      `- **Data/Hora**: ${diagnostic.timestamp} (${new Date(diagnostic.timestamp).toLocaleString("pt-BR")})`,
      `- **Etapa do Fluxo**: ${diagnostic.step}`,
      `- **Endpoint Requisitado**: ${diagnostic.endpoint}`,
      `- **Status HTTP / Conexão**: ${diagnostic.httpStatus}`,
      `- **Mensagem de Erro**: ${diagnostic.message}`,
      `- **Dica / Diagnóstico**: ${diagnostic.troubleshootingTip}`,
      `- **Ambiente**: ${diagnostic.platform}`,
      `- **Modo Desktop Tauri**: ${diagnostic.isDesktop ? "Sim (Tauri Nativo)" : "Não (Navegador)"}`,
      `- **Backend Base URL**: ${diagnostic.apiUrl}`,
      ...(diagnostic.technicalDetails
        ? [`- **Stack / Detalhes**: \`\`\`\n${diagnostic.technicalDetails.slice(0, 500)}\n\`\`\``]
        : []),
    ].join("\n");

    navigator.clipboard.writeText(text);
    setCopiedDiagnostic(true);
    setTimeout(() => setCopiedDiagnostic(false), 3000);
  }

  async function startFlow() {
    stopPolling();
    isCancelledRef.current = false;
    setError(null);
    setDiagnostic(null);
    setSuccess(false);
    setLoading(true);
    setPollStatus("Solicitando código de ativação ao Okta...");

    try {
      const data = await authApi.oktaStart();
      if (isCancelledRef.current) return;

      setDeviceData(data);
      setLoading(false);
      setPollStatus("Aguardando sua autorização no portal OneNTT Okta...");

      // Inicia polling automático a cada 3 segundos
      const intervalMs = Math.max(3000, (data.interval || 5) * 1000);
      pollIntervalRef.current = setInterval(async () => {
        if (isCancelledRef.current) {
          stopPolling();
          return;
        }

        try {
          const pollRes = await authApi.oktaPoll(data.device_code);
          if (isCancelledRef.current) return;

          if (pollRes.status === "success") {
            stopPolling();
            setSuccess(true);
            setPollStatus("Autorizado com sucesso! Sincronizando credenciais...");
            if (pollRes.access_token && pollRes.role) {
              setToken(pollRes.access_token, pollRes.role);
            }
            setTimeout(() => {
              onSuccess(pollRes);
            }, 1200);
          } else if (pollRes.status === "expired") {
            stopPolling();
            const diag = createDiagnostic(
              "OKTA_POLL_TIMEOUT",
              `${API_URL}/auth/okta/poll`,
              new Error("O código de ativação expirou no Okta."),
              "O tempo limite de autorização do código expirou. Gere um novo código clicando em 'Tentar novamente'."
            );
            setDiagnostic(diag);
            setError("O código de ativação expirou. Clique em 'Tentar Novamente'.");
          } else if (pollRes.status === "error") {
            stopPolling();
            const diag = createDiagnostic(
              "OKTA_POLL_VALIDATION",
              `${API_URL}/auth/okta/poll`,
              new Error(pollRes.detail || "Erro durante a validação no Okta."),
              pollRes.detail || "O Okta retornou um status de erro durante a autorização."
            );
            setDiagnostic(diag);
            setError(pollRes.detail || "Erro durante a validação no Okta.");
          }
        } catch (pollErr: any) {
          console.warn("[OKTA_POLL_WARN] Erro transitório durante polling:", pollErr);
          if (pollErr?.message?.includes("Failed to fetch") || pollErr?.message?.includes("NetworkError")) {
            stopPolling();
            const diag = createDiagnostic(
              "OKTA_POLL_NETWORK_FAILURE",
              `${API_URL}/auth/okta/poll`,
              pollErr,
              "A conexão com o backend local foi perdida durante a verificação de autorização do Okta."
            );
            setDiagnostic(diag);
            setError("Conexão com o backend local perdida durante a verificação.");
          }
        }
      }, intervalMs);
    } catch (err: any) {
      if (!isCancelledRef.current) {
        setLoading(false);
        const diag = createDiagnostic(
          "OKTA_DEVICE_AUTH_START",
          `${API_URL}/auth/okta/start`,
          err
        );
        setDiagnostic(diag);

        const errMsg = err?.message || "";
        if (errMsg.includes("Method Not Allowed") || err?.status === 405) {
          setError(
            "Erro 405 (Method Not Allowed): O backend local em http://localhost:8000 precisa ser atualizado ou reiniciado para aceitar o login SSO."
          );
        } else if (
          errMsg.includes("Failed to fetch") ||
          errMsg.includes("NetworkError")
        ) {
          setError(
            "Não foi possível conectar ao backend local em http://localhost:8000. Certifique-se de que os serviços (iniciar_windows.bat ou Docker) estão em execução."
          );
        } else {
          setError(errMsg || "Não foi possível iniciar o login via Okta.");
        }
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      startFlow();
    } else {
      isCancelledRef.current = true;
      stopPolling();
      setDeviceData(null);
      setError(null);
      setDiagnostic(null);
      setSuccess(false);
    }
    return () => {
      isCancelledRef.current = true;
      stopPolling();
    };
  }, [isOpen]);

  function handleCopyCode() {
    if (deviceData?.user_code) {
      navigator.clipboard.writeText(deviceData.user_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  async function handleOpenOkta() {
    if (deviceData?.verification_uri_complete) {
      try {
        await openExternalUrl(deviceData.verification_uri_complete);
      } catch (err: any) {
        console.error("[OKTA_BROWSER_ERROR] Falha ao abrir navegador:", err);
      }
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-[#0c1324] p-6 text-slate-100 shadow-2xl shadow-blue-500/10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800/80">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#0072BC] to-sky-500 text-white shadow-lg shadow-blue-500/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">
              {isRenewal ? "Renovar Sessão Okta" : "Login Corporativo NTT DATA"}
            </h2>
            <p className="text-xs text-slate-400">
              OneNTT SSO • Gateway aXet AI
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="py-5 space-y-5">
          {loading && (
            <div className="flex flex-col items-center justify-center py-8 space-y-3">
              <Loader2 className="h-8 w-8 text-sky-400 animate-spin" />
              <p className="text-xs text-slate-300 animate-pulse">{pollStatus}</p>
            </div>
          )}

          {error && (
            <div className="space-y-4">
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300 flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-rose-200">Falha na Autenticação Okta</p>
                  <p className="leading-relaxed">{error}</p>
                </div>
              </div>

              {diagnostic && (
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                      <Terminal className="h-3.5 w-3.5 text-sky-400" />
                      <span>Diagnóstico de Erro (Windows / Desktop)</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyDiagnostic}
                      className="flex items-center gap-1 rounded bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-[11px] font-medium text-slate-200 transition"
                      title="Copiar relatório completo de erro"
                    >
                      {copiedDiagnostic ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-300">Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 text-slate-400" />
                          <span>Copiar Log</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="font-mono text-[11px] space-y-1 text-slate-300 bg-black/50 p-2.5 rounded-lg border border-slate-800/60 overflow-x-auto max-h-36">
                    <div>
                      <span className="text-sky-400 font-bold">[ETAPA]:</span> {diagnostic.step}
                    </div>
                    <div>
                      <span className="text-sky-400 font-bold">[ENDPOINT]:</span> {diagnostic.endpoint}
                    </div>
                    <div>
                      <span className="text-amber-400 font-bold">[STATUS]:</span> {diagnostic.httpStatus}
                    </div>
                    <div>
                      <span className="text-rose-400 font-bold">[DETALHE]:</span> {diagnostic.message}
                    </div>
                  </div>

                  {diagnostic.troubleshootingTip && (
                    <div className="rounded-lg bg-sky-950/30 border border-sky-800/30 p-2.5 text-[11px] text-sky-300/90 leading-relaxed">
                      <span className="font-semibold text-sky-200">💡 Ponto de atenção:</span> {diagnostic.troubleshootingTip}
                    </div>
                  )}
                </div>
              )}

              <button
                type="button"
                onClick={startFlow}
                className="w-full rounded-xl bg-slate-800 py-2.5 text-xs font-semibold text-white hover:bg-slate-700 transition"
              >
                Tentar novamente
              </button>
            </div>
          )}

          {success && (
            <div className="flex flex-col items-center justify-center py-6 space-y-3 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-in zoom-in-75">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-sm font-bold text-emerald-300">
                Autenticado com Sucesso!
              </h3>
              <p className="text-xs text-slate-300 max-w-xs">
                Credenciais Okta sincronizadas com a API Gateway. Redirecionando...
              </p>
            </div>
          )}

          {!loading && !error && !success && deviceData && (
            <div className="space-y-5">
              <div className="space-y-2 text-center">
                <p className="text-xs text-slate-300">
                  Para autorizar, copie o código abaixo e confirme na página do Okta:
                </p>

                {/* Activation Code Box */}
                <div className="relative flex items-center justify-between rounded-xl border border-sky-500/40 bg-sky-950/40 px-4 py-3 shadow-inner shadow-sky-900/20">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400">
                      Código de Autorização
                    </span>
                    <span className="text-2xl font-mono font-bold tracking-widest text-white select-all">
                      {deviceData.user_code}
                    </span>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 rounded-lg border border-sky-500/50 bg-sky-500/20 px-3 py-1.5 text-xs font-semibold text-sky-200 hover:bg-sky-500/30 active:scale-95 transition"
                    title="Copiar código"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Primary Action: Open Okta */}
              <button
                onClick={handleOpenOkta}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0072BC] to-sky-500 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:opacity-90 active:scale-[0.99] transition"
              >
                <span>Abrir página do Okta</span>
                <ExternalLink className="h-4 w-4" />
              </button>

              <div className="text-center">
                <p className="text-[11px] text-slate-400">
                  Ou acesse no seu navegador:{" "}
                  <button
                    type="button"
                    onClick={handleOpenOkta}
                    className="text-sky-400 hover:underline font-mono"
                  >
                    {deviceData.verification_uri}
                  </button>
                </p>
              </div>

              {/* Polling Indicator */}
              <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-slate-400">
                <Loader2 className="h-3.5 w-3.5 text-sky-400 animate-spin" />
                <span>{pollStatus}</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-800/80 pt-3 text-center">
          <p className="text-[11px] text-slate-500">
            A conexão sincroniza automaticamente o token de acesso à API Gateway aXet.
          </p>
        </div>
      </div>
    </div>
  );
}
