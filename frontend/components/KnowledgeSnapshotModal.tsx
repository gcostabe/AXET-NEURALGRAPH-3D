"use client";

import React, { useState, useEffect, useRef } from "react";
import { snapshotsApi, SnapshotStatus, ImportResult, RemoteSyncProgress } from "@/lib/api";
import {
  CloudDownload,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  FileArchive,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Link2,
  UploadCloud,
  Check,
} from "lucide-react";

interface KnowledgeSnapshotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function KnowledgeSnapshotModal({ isOpen, onClose, onSuccess }: KnowledgeSnapshotModalProps) {
  const [status, setStatus] = useState<SnapshotStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(false);

  // Estado da Sincronização Remota (1 Clique)
  const [remoteProgress, setRemoteProgress] = useState<RemoteSyncProgress | null>(null);
  const [isStartingSync, setIsStartingSync] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [showAdvancedUrl, setShowAdvancedUrl] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [customSha256, setCustomSha256] = useState("");
  const [pollInterval, setPollInterval] = useState<NodeJS.Timeout | null>(null);

  // Estado da Importação Manual de Arquivo Local
  const [showManualUpload, setShowManualUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [expectedSha256, setExpectedSha256] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      loadStatus();
      checkRemoteProgress();
      setImportResult(null);
      setErrorMessage(null);
      setSyncError(null);
      setSelectedFile(null);
      setExpectedSha256("");
    } else {
      if (pollInterval) {
        clearInterval(pollInterval);
        setPollInterval(null);
      }
    }
  }, [isOpen]);

  // Polling automático de progresso remoto enquanto estiver executando
  useEffect(() => {
    if (!isOpen) return;

    if (remoteProgress?.is_running) {
      const timer = setInterval(async () => {
        try {
          const prog = await snapshotsApi.getRemoteSyncProgress();
          setRemoteProgress(prog);
          if (!prog.is_running) {
            clearInterval(timer);
            await loadStatus();
            if (prog.stage === "completed" && onSuccess) {
              onSuccess();
            }
          }
        } catch {
          // ignore
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [remoteProgress?.is_running, isOpen]);

  async function loadStatus() {
    setLoadingStatus(true);
    try {
      const data = await snapshotsApi.getStatus();
      setStatus(data);
    } catch (err: any) {
      console.error("Erro ao carregar status do snapshot:", err);
    } finally {
      setLoadingStatus(false);
    }
  }

  async function checkRemoteProgress() {
    try {
      const prog = await snapshotsApi.getRemoteSyncProgress();
      setRemoteProgress(prog);
    } catch {
      // ignore
    }
  }

  async function handleStartRemoteSync() {
    setIsStartingSync(true);
    setSyncError(null);
    try {
      const payload: { url?: string; expected_sha256?: string } = {};
      if (customUrl.trim()) payload.url = customUrl.trim();
      if (customSha256.trim()) payload.expected_sha256 = customSha256.trim();

      await snapshotsApi.triggerRemoteSync(payload);
      const prog = await snapshotsApi.getRemoteSyncProgress();
      setRemoteProgress(prog);
    } catch (err: any) {
      setSyncError(err.message || "Não foi possível iniciar a sincronização remota.");
    } finally {
      setIsStartingSync(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setErrorMessage(null);
      setImportResult(null);
    }
  }

  async function handleImportSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFile) {
      setErrorMessage("Selecione um arquivo de snapshot (.qpack ou .snapshot).");
      return;
    }

    setIsImporting(true);
    setErrorMessage(null);
    setImportResult(null);

    try {
      const result = await snapshotsApi.importSnapshot(selectedFile, expectedSha256.trim() || undefined);
      setImportResult(result);
      await loadStatus();
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Falha ao restaurar base de conhecimento.");
    } finally {
      setIsImporting(false);
    }
  }

  if (!isOpen) return null;

  const isSyncActive = remoteProgress?.is_running;
  const isSyncCompleted = remoteProgress?.stage === "completed";
  const isSyncFailed = remoteProgress?.stage === "error";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 bg-gradient-to-r from-blue-900/30 via-slate-900 to-indigo-900/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-xl shadow-inner text-cyan-400">
              <CloudDownload className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  Sincronização da Base de Conhecimento
                </h2>
                <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 text-[10px] font-bold text-cyan-300">
                  1-CLIQUE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Distribuição atômica de vetores Qdrant e grafo neural relacional para usuários NTT DATA
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
            title="Fechar"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 [scrollbar-width:thin] [scrollbar-color:#334155_transparent]">
          {/* Status Atual da Base Local */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span>Estado da Base Local (localhost)</span>
              </span>
              <button
                onClick={loadStatus}
                disabled={loadingStatus}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors font-medium"
              >
                <RefreshCw className={`w-3 h-3 ${loadingStatus ? "animate-spin" : ""}`} />
                <span>{loadingStatus ? "Atualizando..." : "Recarregar"}</span>
              </button>
            </div>

            {status ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
                  <div className="text-[11px] text-slate-400">Pontos Vetoriais</div>
                  <div className="text-base font-bold text-emerald-400">
                    {status.points_count.toLocaleString("pt-BR")}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
                  <div className="text-[11px] text-slate-400">Documentos</div>
                  <div className="text-base font-bold text-blue-400">
                    {status.documents_count.toLocaleString("pt-BR")}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
                  <div className="text-[11px] text-slate-400">Conexões Neurais</div>
                  <div className="text-base font-bold text-purple-400">
                    {status.edges_count.toLocaleString("pt-BR")}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
                  <div className="text-[11px] text-slate-400">Status Qdrant</div>
                  <div className="text-base font-bold flex items-center gap-1.5 text-white">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        status.status === "green" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                      }`}
                    />
                    <span className="capitalize text-xs">{status.status}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-500 py-2">Carregando métricas da base...</div>
            )}
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════
              RECURSO DE 1 CLIQUE: SINCRONIZAÇÃO REMOTA DA BASE OFICIAL
             ═══════════════════════════════════════════════════════════════════════ */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 shadow-xl relative overflow-hidden">
            {/* Background glow decorativo */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Sincronização Oficial em 1 Clique
                  </span>
                  <span className="rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider">
                    Recomendado
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-lg leading-relaxed">
                  Baixa o pacote oficial (.qpack) com mais de 87 mil vetores e 2.680 documentos pré-indexados e restaura tudo em segundo plano na sua máquina.
                </p>
              </div>

              {/* Botão Principal de 1 Clique */}
              {!isSyncActive && (
                <button
                  type="button"
                  onClick={handleStartRemoteSync}
                  disabled={isStartingSync}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 active:scale-95 transition-all shadow-lg shadow-cyan-900/30 flex items-center gap-2 shrink-0 border border-cyan-400/30 cursor-pointer"
                >
                  {isStartingSync ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Iniciando...</span>
                    </>
                  ) : (
                    <>
                      <CloudDownload className="w-4 h-4" />
                      <span>Sincronizar Base Oficial</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Painel Ativo de Progresso em Tempo Real */}
            {isSyncActive && (
              <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-cyan-500/40 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span className="capitalize">{remoteProgress.message || "Processando sincronização..."}</span>
                  </div>
                  <span className="font-mono text-cyan-400 font-bold">
                    {remoteProgress.progress_percent.toFixed(0)}%
                  </span>
                </div>

                {/* Barra de Progresso Fluida */}
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
                  <div
                    className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 h-full rounded-full transition-all duration-300 shadow-sm shadow-cyan-400"
                    style={{ width: `${Math.max(5, remoteProgress.progress_percent)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>
                    Etapa: <strong className="text-slate-200 uppercase">{remoteProgress.stage}</strong>
                  </span>
                  {remoteProgress.total_mb > 0 && (
                    <span className="font-mono">
                      {remoteProgress.downloaded_mb.toFixed(1)} MB / {remoteProgress.total_mb.toFixed(1)} MB
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Feedback de Sucesso */}
            {isSyncCompleted && remoteProgress?.result && (
              <div className="mt-4 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Base de conhecimento oficial sincronizada com êxito!</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-mono">
                    100% OK
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-500/20 text-[11px]">
                  <div>
                    <span className="text-emerald-400">Vetores no Qdrant:</span>{" "}
                    <strong>{remoteProgress.result.points_count.toLocaleString("pt-BR")}</strong>
                  </div>
                  <div>
                    <span className="text-emerald-400">Documentos:</span>{" "}
                    <strong>{remoteProgress.result.documents_restored}</strong>
                  </div>
                  <div>
                    <span className="text-emerald-400">Conexões Neurais:</span>{" "}
                    <strong>{remoteProgress.result.edges_restored}</strong>
                  </div>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition"
                  >
                    Concluir e Explorar Grafo
                  </button>
                </div>
              </div>
            )}

            {/* Feedback de Falha */}
            {(isSyncFailed || syncError) && (
              <div className="mt-4 p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-start gap-2 animate-in fade-in duration-200">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <strong>Erro na sincronização:</strong>
                  <p className="mt-0.5 text-red-200">{syncError || remoteProgress?.error}</p>
                </div>
                <button
                  onClick={handleStartRemoteSync}
                  className="px-2.5 py-1 bg-red-800/80 hover:bg-red-700 text-white text-[11px] font-semibold rounded transition"
                >
                  Tentar Novamente
                </button>
              </div>
            )}

            {/* Configurações Avançadas de Link Personalizado (Sanfona recolhida por padrão) */}
            <div className="mt-3 pt-3 border-t border-slate-800/70">
              <button
                type="button"
                onClick={() => setShowAdvancedUrl(!showAdvancedUrl)}
                className="text-[11px] text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                <Link2 className="w-3 h-3 text-cyan-400" />
                <span>Opções Avançadas: Link direto personalizado ou SHA-256</span>
                {showAdvancedUrl ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {showAdvancedUrl && (
                <div className="mt-2.5 space-y-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      URL Direta do Pacote (.qpack)
                    </label>
                    <input
                      type="text"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      placeholder="Deixe em branco para usar o link oficial configurado ou pacote do servidor"
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-600 font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Checksum SHA-256 Opcional
                    </label>
                    <input
                      type="text"
                      value={customSha256}
                      onChange={(e) => setCustomSha256(e.target.value)}
                      placeholder="Ex: 7a7788b86e2bf2569b068b367e4b34ba92a1ee0c11c3b22fafc000dd4c04d05c"
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-600 font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════
              OPÇÃO SECUNDÁRIA: RESTAURAÇÃO MANUAL VIA ARQUIVO LOCAL (.QPACK)
             ═══════════════════════════════════════════════════════════════════════ */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowManualUpload(!showManualUpload)}
              className="w-full py-2 px-3 rounded-xl bg-slate-950/40 hover:bg-slate-950/80 border border-slate-800/80 text-xs text-slate-400 hover:text-slate-200 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileArchive className="w-3.5 h-3.5 text-slate-400" />
                <span>Modo Alternativo: Upload Manual de Arquivo Local (.qpack / .snapshot)</span>
              </div>
              {showManualUpload ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showManualUpload && (
              <form onSubmit={handleImportSubmit} className="mt-3 space-y-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                      selectedFile
                        ? "border-blue-500/60 bg-blue-950/20"
                        : "border-slate-700 hover:border-slate-500 bg-slate-950/40 hover:bg-slate-950/70"
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".qpack,.snapshot,.tar.gz"
                      className="hidden"
                    />

                    {selectedFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-2xl">📦</span>
                        <div className="text-left">
                          <div className="text-sm font-semibold text-white truncate max-w-md">
                            {selectedFile.name}
                          </div>
                          <div className="text-xs text-slate-400">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                        <div className="text-xs text-slate-300 font-medium">
                          Clique para selecionar um arquivo .qpack local
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    SHA-256 Esperado (Opcional)
                  </label>
                  <input
                    type="text"
                    value={expectedSha256}
                    onChange={(e) => setExpectedSha256(e.target.value)}
                    placeholder="Hash SHA-256 para validação"
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {importResult && (
                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs space-y-1">
                    <div className="font-bold text-emerald-300">✅ {importResult.message}</div>
                    <div className="text-[11px] text-slate-300">
                      {importResult.documents_restored} docs • {importResult.edges_restored} conexões • {importResult.points_count} vetores
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isImporting || !selectedFile}
                    className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition shadow flex items-center gap-2"
                  >
                    {isImporting ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Restaurando...</span>
                      </>
                    ) : (
                      <>
                        <span>Restaurar Arquivo Local</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Garantia Air-Gapped */}
          <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/20 text-[11px] text-slate-400 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-200">Garantia Contra Vazamento de Dados (Air-Gapped Local):</strong>
              <p className="mt-0.5">
                Toda a busca semântica, vetorização e recuperação ocorrem estritamente dentro do <code>localhost</code> da sua estação de trabalho.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            AXET-NEURALGRAPH-3D v2.4 • NTT DATA
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
