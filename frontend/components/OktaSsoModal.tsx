"use client";

import { useEffect, useRef, useState } from "react";
import {
  authApi,
  API_URL,
  ApiError,
  OktaDeviceAuthStartResponse,
  OktaPollResponse,
  checkBackendConnectivity,
  getApiUrl,
  setApiUrl,
} from "@/lib/api";
import { setToken } from "@/lib/auth";
import { isDesktopApp, openExternalUrl, startLocalBackend } from "@/lib/desktop";
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
  RefreshCw,
  Play,
  Server,
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
  const [testingBackend, setTestingBackend] = useState(false);
  const [startingBackend, setStartingBackend] = useState(false);
  const [backendStatusMsg, setBackendStatusMsg] = useState<string | null>(null);
  const [showUrlConfig, setShowUrlConfig] = useState(false);
  const [backendUrlInput, setBackendUrlInput] = useState<string>(getApiUrl());

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isCancelledRef = useRef(false);
  const autoStartAttemptedRef = useRef(false);

  async function handleApplyBackendUrl(newUrl: string) {
    const formatted = newUrl.trim().replace(/\/+$/, "");
    if (!formatted) return;
    setApiUrl(formatted);
    setBackendUrlInput(formatted);
    setBackendStatusMsg(`🔄 URL do backend alterada para: ${formatted}`);
    setTimeout(() => {
      handleTestBackend();
    }, 500);
  }

  async function handleStartBackend() {
    setStartingBackend(true);
    setBackendStatusMsg("🚀 Solicitando inicialização dos containers em segundo plano...");

    try {
      const res = await startLocalBackend();
      if (!res.success) {
        setBackendStatusMsg(`⚠️ ${res.message}`);
        setStartingBackend(false);
        return;
      }

      setBackendStatusMsg(`⏳ ${res.message} Aguardando serviços responderem na porta 8000...`);

      // Polling de inicialização: tenta conectar por até 45 segundos
      let attempts = 0;
      const maxAttempts = 20;

      const waitTimer = setInterval(async () => {
        attempts++;
        const conn = await checkBackendConnectivity();
        if (conn.ok) {
          clearInterval(waitTimer);
          setStartingBackend(false);
          setBackendStatusMsg(`✅ Backend Online em ${conn.url}! Conectando ao Okta...`);
          setTimeout(() => {
            setBackendStatusMsg(null);
            startFlow();
          }, 1500);
          return;
        }

        if (attempts >= maxAttempts) {
          clearInterval(waitTimer);
          setStartingBackend(false);
          setBackendStatusMsg("⚠️ Tempo limite de inicialização. Verifique se o Docker Desktop está aberto ou clique em 'Testar Conexão'.");
        } else {
          setBackendStatusMsg(`⏳ Inicializando banco e IA... (${attempts}/${maxAttempts})`);
        }
      }, 2500);
    } catch (err: any) {
      setStartingBackend(false);
      setBackendStatusMsg(`❌ Erro ao disparar inicialização: ${err?.message || String(err)}`);
    }
  }

  async function handleTestBackend() {
    setTestingBackend(true);
    setBackendStatusMsg(null);
    try {
      const res = await checkBackendConnectivity();
      if (res.ok) {
        setBackendStatusMsg(`✅ Backend Online em ${res.url}! Reiniciando conexão com Okta...`);
        setTimeout(() => {
          setBackendStatusMsg(null);
          startFlow();
        }, 1200);
      } else {
        setBackendStatusMsg(`❌ Backend Offline na porta 8000. Inicie os containers pelo botão abaixo ou execute 'iniciar_windows.bat'.`);
      }
    } catch (e: any) {
      setBackendStatusMsg(`❌ Falha de teste: ${e?.message || "Serviço inacessível"}`);
    } finally {
      setTestingBackend(false);
    }
  }

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
          "O aplicativo desktop não conseguiu conectar ao backend local (porta 8000). No Windows:\n" +
          "1. Certifique-se de executar o script 'iniciar_windows.bat' (ou verifique se os containers do Docker Desktop estão ativos);\n" +
          "2. Se o Docker já estiver rodando, teste abrir no navegador: http://127.0.0.1:8000/health;\n" +
          "3. Verifique se o Firewall do Windows não está bloqueando conexões locais na porta 8000.";
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
        const errMsg = err?.message || "";
        const isNetworkErr =
          errMsg.includes("Failed to fetch") ||
          errMsg.includes("NetworkError") ||
          !err?.status;

        // Se for aplicativo desktop nativo e for a primeira tentativa com erro de conexão, auto-inicia os containers
        if (isDesktopApp() && isNetworkErr && !autoStartAttemptedRef.current) {
          autoStartAttemptedRef.current = true;
          handleStartBackend();
          return;
        }

        const diag = createDiagnostic(
          "OKTA_DEVICE_AUTH_START",
          `${API_URL}/auth/okta/start`,
          err
        );
        setDiagnostic(diag);

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
      autoStartAttemptedRef.current = false;
      setStartingBackend(false);
      setBackendStatusMsg(null);
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
          {startingBackend && (
            <div className="flex flex-col items-center justify-center py-6 px-4 space-y-4 rounded-xl border border-sky-500/20 bg-sky-950/20 text-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 opacity-30 blur animate-pulse" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 border border-sky-500/40 text-sky-400">
                  <Server className="h-7 w-7 animate-pulse text-sky-400" />
                </div>
              </div>
              <div className="space-y-1.5 max-w-sm">
                <h3 className="text-sm font-semibold text-white">Inicializando Serviços Cognitivos Locais</h3>
                <p className="text-xs text-slate-300">
                  O aplicativo desktop está ativando os containers em segundo plano. Por favor, aguarde alguns instantes...
                </p>
              </div>
              {backendStatusMsg && (
                <div className="text-[11px] font-mono px-3 py-1.5 rounded-lg bg-black/50 border border-sky-500/30 text-sky-300">
                  {backendStatusMsg}
                </div>
              )}
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-sky-500 h-1.5 rounded-full animate-pulse w-3/4" />
              </div>
            </div>
          )}

          {!startingBackend && loading && (
            <div className="flex flex-col items-center justify-center py-8 space-y-3">
              <Loader2 className="h-8 w-8 text-sky-400 animate-spin" />
              <p className="text-xs text-slate-300 animate-pulse">{pollStatus}</p>
            </div>
          )}

          {!startingBackend && error && (
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
                    <div className="rounded-lg bg-sky-950/30 border border-sky-800/30 p-2.5 text-[11px] text-sky-300/90 leading-relaxed whitespace-pre-line">
                      <span className="font-semibold text-sky-200">💡 Ponto de atenção:</span> {diagnostic.troubleshootingTip}
                    </div>
                  )}

                  <div className="pt-1 flex flex-col gap-2.5">
                    {/* Botão de Auto-Start Nativo dos Serviços */}
                    <button
                      type="button"
                      onClick={handleStartBackend}
                      disabled={startingBackend || testingBackend}
                      className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-2.5 px-3 text-xs font-semibold shadow-md transition disabled:opacity-50"
                    >
                      {startingBackend ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span>Inicializando containers do backend...</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5 fill-current" />
                          <span>🚀 Iniciar Serviços Locais Automaticamente</span>
                        </>
                      )}
                    </button>

                    {/* Botão de Teste Manual */}
                    <button
                      type="button"
                      onClick={handleTestBackend}
                      disabled={testingBackend || startingBackend}
                      className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 text-[11px] font-medium text-slate-300 transition disabled:opacity-50"
                    >
                      {testingBackend ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin text-sky-400" />
                          <span>Testando portas 8000 (localhost e 127.0.0.1)...</span>
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-3 w-3 text-slate-400" />
                          <span>Testar Conexão com a Porta 8000</span>
                        </>
                      )}
                    </button>

                    {/* Mensagem de Status em Tempo Real */}
                    {backendStatusMsg && (
                      <div className={`p-2.5 rounded-lg text-[11px] leading-relaxed border ${
                        backendStatusMsg.startsWith("✅")
                          ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
                          : backendStatusMsg.startsWith("⏳") || backendStatusMsg.startsWith("🔄") || backendStatusMsg.startsWith("🚀")
                          ? "bg-sky-950/40 border-sky-500/30 text-sky-300"
                          : "bg-rose-950/40 border-rose-500/30 text-rose-300"
                      }`}>
                        {backendStatusMsg}
                      </div>
                    )}

                    {/* Seção Configurável de Servidor / URL Remota */}
                    <div className="pt-2 border-t border-slate-800/80">
                      <button
                        type="button"
                        onClick={() => setShowUrlConfig(!showUrlConfig)}
                        className="flex items-center justify-between w-full text-[11px] text-slate-400 hover:text-sky-300 transition py-1"
                      >
                        <span className="flex items-center gap-1.5">
                          <Server className="h-3 w-3" />
                          <span>Configurar URL do Backend / Servidor</span>
                        </span>
                        <span className="text-[10px] text-sky-400 underline">{showUrlConfig ? "Ocultar" : "Alterar Servidor"}</span>
                      </button>

                      {showUrlConfig && (
                        <div className="mt-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-left">
                          <div className="text-[11px] text-slate-400">
                            Endereço onde o backend FastAPI está ativo:
                          </div>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={backendUrlInput}
                              onChange={(e) => setBackendUrlInput(e.target.value)}
                              placeholder="http://localhost:8000"
                              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white font-mono focus:outline-none focus:border-sky-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleApplyBackendUrl(backendUrlInput)}
                              className="px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold transition"
                            >
                              Salvar
                            </button>
                          </div>
                          <div className="flex gap-1.5 flex-wrap pt-1">
                            <button
                              type="button"
                              onClick={() => handleApplyBackendUrl("http://localhost:8000")}
                              className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white"
                            >
                              Localhost (:8000)
                            </button>
                            <button
                              type="button"
                              onClick={() => handleApplyBackendUrl("http://127.0.0.1:8000")}
                              className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white"
                            >
                              127.0.0.1 (:8000)
                            </button>
                            <button
                              type="button"
                              onClick={() => handleApplyBackendUrl("http://172.20.10.8:8000")}
                              className="text-[10px] px-2 py-0.5 rounded bg-blue-900/60 text-blue-200 hover:text-white border border-blue-700/50"
                              title="Conectar ao Mac na rede local"
                            >
                              Mac na Rede (172.20.10.8:8000)
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
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
