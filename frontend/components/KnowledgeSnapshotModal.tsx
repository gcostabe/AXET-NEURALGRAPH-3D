"use client";

import React, { useState, useEffect, useRef } from "react";
import { snapshotsApi, SnapshotStatus, ImportResult } from "@/lib/api";

interface KnowledgeSnapshotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function KnowledgeSnapshotModal({ isOpen, onClose, onSuccess }: KnowledgeSnapshotModalProps) {
  const [status, setStatus] = useState<SnapshotStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [expectedSha256, setExpectedSha256] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      loadStatus();
      setImportResult(null);
      setErrorMessage(null);
      setSelectedFile(null);
      setExpectedSha256("");
    }
  }, [isOpen]);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 bg-gradient-to-r from-blue-900/30 via-slate-900 to-indigo-900/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xl shadow-inner">
              🔄
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                Sincronizar Base de Conhecimento
              </h2>
              <p className="text-xs text-slate-400">
                Distribuição segura de dados vetoriais e grafo neural local (Opção 1)
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
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Status Atual da Base Local */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Estado da Base Local (localhost)
              </span>
              <button
                onClick={loadStatus}
                disabled={loadingStatus}
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
              >
                🔄 {loadingStatus ? "Atualizando..." : "Recarregar"}
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
                    <span className={`w-2 h-2 rounded-full ${status.status === "green" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                    <span className="capitalize text-xs">{status.status}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-500 py-2">Carregando métricas da base...</div>
            )}
          </div>

          {/* Formulário de Importação */}
          <form onSubmit={handleImportSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Arquivo de Atualização (.qpack ou .snapshot)
              </label>

              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
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
                    <span className="text-3xl block mb-1">📁</span>
                    <div className="text-sm text-slate-300 font-medium">
                      Clique para selecionar o pacote enviado pelo Administrador
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Formatos suportados: .qpack (recomendado) ou .snapshot nativo do Qdrant
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Checksum SHA-256 Esperado (Opcional)
              </label>
              <input
                type="text"
                value={expectedSha256}
                onChange={(e) => setExpectedSha256(e.target.value)}
                placeholder="Ex: 7a7788b86e2bf2569b068b367e4b34ba92a1ee0c11c3b22fafc000dd4c04d05c"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-slate-200 placeholder-slate-600 font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Se informado, o sistema valida a integridade antes de aplicar e aborta se o arquivo tiver sido alterado.
              </p>
            </div>

            {/* Alertas de Sucesso e Erro */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-start gap-2">
                <span className="text-base leading-none">⚠️</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {importResult && (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
                  <span>✅</span>
                  <span>{importResult.message}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-emerald-500/20 text-[11px]">
                  <div>
                    <span className="text-emerald-400">Pontos no Qdrant:</span>{" "}
                    <strong>{importResult.points_count.toLocaleString("pt-BR")}</strong>
                  </div>
                  <div>
                    <span className="text-emerald-400">Documentos:</span>{" "}
                    <strong>{importResult.documents_restored}</strong>
                  </div>
                  <div>
                    <span className="text-emerald-400">Sinapses:</span>{" "}
                    <strong>{importResult.edges_restored}</strong>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  SHA-256 Confirmado: <span className="font-mono">{importResult.sha256}</span>
                </div>
              </div>
            )}

            {/* Botão de Ação */}
            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isImporting}
                className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
              >
                Fechar
              </button>
              <button
                type="submit"
                disabled={isImporting || !selectedFile}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
              >
                {isImporting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Restaurando Base Local...</span>
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    <span>Restaurar e Sincronizar</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Garantia de Segurança Local */}
          <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/20 text-[11px] text-slate-400 flex items-start gap-2.5">
            <span className="text-base text-blue-400">🔒</span>
            <div>
              <strong className="text-slate-200">Garantia Contra Vazamento de Dados (Air-Gapped):</strong>
              <p className="mt-0.5">
                Toda a recuperação e busca semântica ocorrem exclusivamente dentro do <code>localhost</code> da sua máquina. Nenhum documento, pergunta ou resposta é transmitido para fora da sua rede.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
