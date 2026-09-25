"use client";

import React, { useState, useEffect } from "react";
import {
  Folder,
  FolderOpen,
  Cloud,
  CloudUpload,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  Copy,
  Check,
  Download,
  Trash2,
  Rocket,
  ShieldCheck,
  Database,
  Share2,
  ExternalLink,
  Globe,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  snapshotsApi,
  SnapshotItem,
  SnapshotStatus,
  DistributionConfig,
  PublishOneDriveResult,
  ApiError,
} from "@/lib/api";
import { pickNativeFolder, openExternalUrl } from "@/lib/desktop";

export default function AdminSnapshotsPanel() {
  const [snapshots, setSnapshots] = useState<SnapshotItem[]>([]);
  const [status, setStatus] = useState<SnapshotStatus | null>(null);
  const [distConfig, setDistConfig] = useState<DistributionConfig>({
    onedrive_path: "",
    is_configured: false,
  });
  const [onedrivePathInput, setOnedrivePathInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishingFilename, setPublishingFilename] = useState<string | null>(null);
  const [pickingFolder, setPickingFolder] = useState(false);
  const [savingConfig, setSavingConfig] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [publishSuccess, setPublishSuccess] = useState<PublishOneDriveResult | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [showOneDriveManual, setShowOneDriveManual] = useState(false);
  const [copiedGitUrl, setCopiedGitUrl] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    setMessage(null);
    try {
      const [snapList, statusData, dist] = await Promise.all([
        snapshotsApi.listAdminSnapshots(),
        snapshotsApi.getStatus(),
        snapshotsApi.getDistributionConfig().catch(() => ({ onedrive_path: "", is_configured: false })),
      ]);
      setSnapshots(snapList);
      setStatus(statusData);
      setDistConfig(dist);
      setOnedrivePathInput(dist.onedrive_path || "");
    } catch (err: any) {
      setMessage({ text: err.message || "Erro ao carregar dados de snapshots.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  // Aciona o seletor nativo do Finder no macOS via daemon bridge local
  async function handlePickOneDriveFolder() {
    setPickingFolder(true);
    setMessage(null);
    try {
      const selected = await pickNativeFolder(
        "Selecione a pasta do OneDrive onde o pacote oficial (.qpack) sera publicado:"
      );
      if (selected) {
        const clean = selected.trim();
        setOnedrivePathInput(clean);
        // Salva imediatamente no banco de dados
        const saved = await snapshotsApi.updateDistributionConfig(clean);
        setDistConfig(saved);
        setMessage({
          text: `✅ Pasta do OneDrive vinculada com sucesso: ${clean}`,
          type: "success",
        });
      }
    } catch (err: any) {
      if (err.message && !err.message.includes("cancelada")) {
        setMessage({
          text: "Não foi possível abrir o seletor nativo. Você também pode colar o caminho manualmente no campo abaixo.",
          type: "error",
        });
      }
    } finally {
      setPickingFolder(false);
    }
  }

  async function handleSaveManualPath() {
    const clean = onedrivePathInput.trim();
    if (!clean) return;
    setSavingConfig(true);
    setMessage(null);
    try {
      const saved = await snapshotsApi.updateDistributionConfig(clean);
      setDistConfig(saved);
      setMessage({
        text: `✅ Pasta do OneDrive salva com sucesso: ${clean}`,
        type: "success",
      });
    } catch (err: any) {
      setMessage({
        text: err instanceof ApiError ? err.message : "Erro ao salvar pasta de distribuição.",
        type: "error",
      });
    } finally {
      setSavingConfig(false);
    }
  }

  // 1-Clique: Gera novo pacote (.qpack) e publica direto na pasta do OneDrive
  async function handlePublishOfficialBase() {
    if (publishing || exporting) return;
    if (!distConfig.is_configured && !onedrivePathInput.trim()) {
      setMessage({
        text: "Por favor, clique em 'Escolher Pasta no Finder' para selecionar a pasta do seu OneDrive antes de publicar.",
        type: "error",
      });
      return;
    }

    setPublishing(true);
    setMessage(null);
    setPublishSuccess(null);
    try {
      const res = await snapshotsApi.publishToOneDrive({
        destination_dir: onedrivePathInput.trim() || undefined,
        generate_new: true,
      });
      setPublishSuccess(res);
      setMessage({
        text: `🚀 Base oficial gerada e publicada com sucesso no OneDrive! O OneDrive já está enviando para o SharePoint.`,
        type: "success",
      });
      await loadData();
    } catch (err: any) {
      setMessage({
        text: err instanceof ApiError ? err.message : "Falha ao publicar base no OneDrive.",
        type: "error",
      });
    } finally {
      setPublishing(false);
    }
  }

  // Publica um snapshot já existente na lista para a pasta do OneDrive
  async function handlePublishExisting(filename: string) {
    if (publishingFilename) return;
    if (!distConfig.is_configured && !onedrivePathInput.trim()) {
      setMessage({
        text: "Por favor, selecione a pasta do OneDrive no Finder antes de publicar.",
        type: "error",
      });
      return;
    }

    setPublishingFilename(filename);
    setMessage(null);
    try {
      const res = await snapshotsApi.publishToOneDrive({
        filename,
        destination_dir: onedrivePathInput.trim() || undefined,
      });
      setPublishSuccess(res);
      setMessage({
        text: `🚀 Pacote ${filename} copiado com sucesso para o OneDrive!`,
        type: "success",
      });
    } catch (err: any) {
      setMessage({
        text: err instanceof ApiError ? err.message : "Falha ao enviar arquivo para o OneDrive.",
        type: "error",
      });
    } finally {
      setPublishingFilename(null);
    }
  }

  async function handleExportOnly() {
    if (exporting) return;
    setExporting(true);
    setMessage(null);
    try {
      const created = await snapshotsApi.exportSnapshot();
      setMessage({
        text: `✅ Pacote ${created.filename} (${created.size_mb} MB) gerado com sucesso!`,
        type: "success",
      });
      await loadData();
    } catch (err: any) {
      setMessage({ text: err.message || "Falha ao gerar snapshot da base.", type: "error" });
    } finally {
      setExporting(false);
    }
  }

  async function handleDelete(filename: string) {
    if (!confirm(`Deseja realmente remover o snapshot ${filename}?`)) return;
    try {
      await snapshotsApi.deleteSnapshot(filename);
      setMessage({ text: `Snapshot ${filename} removido.`, type: "success" });
      await loadData();
    } catch (err: any) {
      setMessage({ text: err.message || "Falha ao excluir snapshot.", type: "error" });
    }
  }

  function handleCopyHash(hash: string) {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2500);
  }

  const OFFICIAL_GITHUB_RELEASE_URL = "https://github.com/gcostabe/AXET-NEURALGRAPH-3D/releases";
  const OFFICIAL_QPACK_DOWNLOAD_URL = "https://github.com/gcostabe/AXET-NEURALGRAPH-3D/releases/latest/download/axet_knowledge_base_latest.qpack";

  function handleCopyGitUrl() {
    navigator.clipboard.writeText(OFFICIAL_QPACK_DOWNLOAD_URL);
    setCopiedGitUrl(true);
    setTimeout(() => setCopiedGitUrl(false), 2500);
  }

  function handleOpenGitHubReleases() {
    openExternalUrl(OFFICIAL_GITHUB_RELEASE_URL);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Share2 className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-white tracking-wide">
                2. Base de Conhecimento (.qpack & GitHub Releases)
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Distribuição Unificada via Git
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
              Gere pacotes oficiais da base de conhecimento (<code className="text-indigo-300">.qpack</code>) contendo os vetores Qdrant e sinapses neurais.
              Tanto os instaladores desktop (<span className="text-slate-200">.dmg</span> e <span className="text-slate-200">.msi</span>) quanto o pacote da base são distribuídos pelo canal oficial do <strong>GitHub Releases</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleOpenGitHubReleases}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition flex items-center gap-1.5 shadow-sm"
              title="Abre a página de Releases do projeto no GitHub"
            >
              <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
              <span>Ver Releases no GitHub</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main GitHub Releases Official Distribution Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-indigo-400" />
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Canal Oficial de Distribuição: GitHub Releases</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  gcostabe / AXET-NEURALGRAPH-3D
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Os usuários do app desktop (.dmg e .msi) sincronizam a base em segundo plano direto da release, sem requerer configuração local.
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyGitUrl}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition shrink-0"
            title="Copiar URL direta de download do pacote axet_knowledge_base_latest.qpack"
          >
            {copiedGitUrl ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Link Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copiar Link do .qpack</span>
              </>
            )}
          </button>
        </div>

        {/* Master 1-Click Action Card */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-blue-950/40 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <Rocket className="w-4 h-4 text-emerald-400" />
              <span>Geração de Pacote Oficial com 1 Clique</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed max-w-2xl">
              Cria o snapshot completo contendo os vetores Qdrant e sinapses neurais validados com hash criptográfico SHA-256 pronto para distribuição.
              O arquivo gerado fica listado abaixo para download direto ou publicação no GitHub Releases como{" "}
              <code className="text-indigo-300 bg-slate-950/80 px-1 py-0.5 rounded font-mono">axet_knowledge_base_latest.qpack</code>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto shrink-0">
            <button
              onClick={handleExportOnly}
              disabled={exporting}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-extrabold text-xs text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {exporting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Gerando Pacote (.qpack)...</span>
                </>
              ) : (
                <>
                  <Database className="w-4 h-4 text-emerald-200" />
                  <span>Gerar Novo Pacote Oficial (.qpack)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Public Release URL info badge */}
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs">🔗</span>
            <span>URL de Sincronização Automática do Botão do Cabeçalho:</span>
            <code className="text-indigo-300 bg-slate-900 px-2 py-0.5 rounded text-[10px] font-mono truncate max-w-md">
              {OFFICIAL_QPACK_DOWNLOAD_URL}
            </code>
          </div>
          <button
            onClick={handleOpenGitHubReleases}
            className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition shrink-0"
          >
            <span>Gerenciar Assets da Release</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Optional Collapsible: Local OneDrive / Network Shared Folder */}
        <div className="pt-2 border-t border-slate-800/80">
          <button
            type="button"
            onClick={() => setShowOneDriveManual(!showOneDriveManual)}
            className="w-full py-2.5 px-3.5 rounded-xl bg-slate-950/40 hover:bg-slate-950/80 border border-slate-800/80 text-xs text-slate-400 hover:text-slate-200 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-slate-400" />
              <span className="font-semibold text-slate-300">
                Opção Alternativa: Cópia Local em Pasta Compartilhada (OneDrive / Rede)
              </span>
              <span className="text-[10px] text-slate-500 bg-slate-800/60 px-1.5 py-0.5 rounded">
                Opcional / Fallback Offline
              </span>
            </div>
            {showOneDriveManual ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showOneDriveManual && (
            <div className="mt-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-4 animate-in fade-in duration-150">
              <div className="text-[11px] text-slate-400 leading-relaxed">
                Esta opção só é necessária se sua equipe optar por sincronizar a base via pasta local compartilhada no macOS ao invés do GitHub Releases.
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
                  <span>Pasta Local do OneDrive no Mac:</span>
                  <span className="text-[10px] text-slate-500">Ex: /Users/gcostabe/Library/CloudStorage/OneDrive-NTTDATAEMEAL/...</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={onedrivePathInput}
                    onChange={(e) => setOnedrivePathInput(e.target.value)}
                    placeholder="Nenhuma pasta selecionada. Clique em Escolher Pasta para abrir o Finder..."
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono transition"
                  />
                  <button
                    onClick={handlePickOneDriveFolder}
                    disabled={pickingFolder}
                    className="px-4 py-2 rounded-xl font-bold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 disabled:opacity-50 flex items-center justify-center gap-2 transition shrink-0"
                    title="Abre a janela nativa do Finder no Mac para escolher a pasta"
                  >
                    {pickingFolder ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Abrindo Finder...</span>
                      </>
                    ) : (
                      <>
                        <FolderOpen className="w-3.5 h-3.5 text-blue-300" />
                        <span>Escolher Pasta no Finder</span>
                      </>
                    )}
                  </button>

                  {onedrivePathInput !== distConfig.onedrive_path && onedrivePathInput.trim().length > 0 && (
                    <button
                      onClick={handleSaveManualPath}
                      disabled={savingConfig}
                      className="px-3 py-2 rounded-xl font-semibold text-xs text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition shrink-0"
                    >
                      {savingConfig ? "Salvando..." : "Salvar Caminho"}
                    </button>
                  )}
                </div>
              </div>

              {distConfig.is_configured && (
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Pasta configurada: <span className="font-mono text-slate-300">{distConfig.onedrive_path}</span>
                  </span>
                  <button
                    onClick={handlePublishOfficialBase}
                    disabled={publishing || exporting}
                    className="px-3.5 py-1.5 rounded-lg font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 flex items-center gap-1.5 transition"
                  >
                    {publishing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CloudUpload className="w-3.5 h-3.5" />}
                    <span>Copiar Base para Esta Pasta</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Publish Success Celebration Banner */}
      {publishSuccess && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 border border-emerald-500/50 shadow-xl space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">Publicação no OneDrive Concluída com Sucesso!</h4>
                <p className="text-xs text-emerald-300/90">
                  O arquivo foi copiado com sucesso para a pasta do OneDrive. O Microsoft OneDrive já está sincronizando para a nuvem/SharePoint.
                </p>
              </div>
            </div>
            <button
              onClick={() => setPublishSuccess(null)}
              className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
            >
              ✕ Fechar
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800">
            <div>
              <span className="text-slate-400 text-[10px] block">Arquivo Publicado</span>
              <strong className="text-slate-200 font-mono truncate block">{publishSuccess.published_file.split("/").pop()}</strong>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Tamanho Compactado</span>
              <strong className="text-emerald-400">{publishSuccess.size_mb} MB</strong>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Cópia Padronizada</span>
              <strong className="text-blue-300 font-mono truncate block">axet_knowledge_base_latest.qpack</strong>
            </div>
          </div>
        </div>
      )}

      {/* Global Feedback Message */}
      {message && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-center justify-between gap-2 ${
            message.type === "success"
              ? "bg-emerald-950/50 border border-emerald-500/40 text-emerald-300"
              : "bg-red-950/50 border border-red-500/40 text-red-300"
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            )}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Metrics Row */}
      {status && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Pontos Vetoriais Indexados</div>
            <div className="text-xl font-extrabold text-emerald-400 mt-1">
              {status.points_count.toLocaleString("pt-BR")}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Coleção: {status.collection_name}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Documentos no Grafo</div>
            <div className="text-xl font-extrabold text-blue-400 mt-1">
              {status.documents_count.toLocaleString("pt-BR")}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Nós cognitivos</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Conexões Neurais (Sinapses)</div>
            <div className="text-xl font-extrabold text-purple-400 mt-1">
              {status.edges_count.toLocaleString("pt-BR")}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Relações semânticas</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Motor Qdrant Local</div>
            <div className="text-xl font-extrabold text-white mt-1 flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  status.status === "green" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                }`}
              />
              <span className="capitalize">{status.status}</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Dimensão: {status.vector_size || 1536}d</div>
          </div>
        </div>
      )}

      {/* Snapshots Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white">Histórico de Pacotes Gerados ({snapshots.length})</h3>
          </div>
          <button
            onClick={loadData}
            disabled={loading}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>{loading ? "Carregando..." : "Atualizar Lista"}</span>
          </button>
        </div>

        {snapshots.length === 0 ? (
          <div className="p-10 text-center text-slate-500 text-xs">
            Nenhum pacote gerado ainda. Clique em &quot;Gerar Novo Pacote Oficial (.qpack)&quot; acima para criar o primeiro.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Arquivo / Formato</th>
                  <th className="py-3 px-4">Data de Criação</th>
                  <th className="py-3 px-4">Tamanho</th>
                  <th className="py-3 px-4">Pontos / Docs</th>
                  <th className="py-3 px-4">Integridade SHA-256</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {snapshots.map((s) => (
                  <tr key={s.filename} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-medium text-white">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{s.file_type === "bundle" ? "📦" : "💾"}</span>
                        <div>
                          <div className="font-semibold text-slate-200">{s.filename}</div>
                          <span
                            className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold ${
                              s.file_type === "bundle"
                                ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                                : "bg-slate-700 text-slate-300"
                            }`}
                          >
                            {s.file_type === "bundle" ? "Pacote Completo (.qpack)" : "Snapshot Qdrant (.snapshot)"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                      {new Date(s.created_at).toLocaleString("pt-BR")}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-200">{s.size_mb} MB</td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {s.points_count ? (
                        <div>
                          <strong>{s.points_count.toLocaleString("pt-BR")}</strong> pontos
                          {s.documents_count ? (
                            <div className="text-[10px] text-slate-500">{s.documents_count} documentos</div>
                          ) : null}
                        </div>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {s.sha256 ? (
                        <div className="flex items-center gap-1.5">
                          <code className="text-[10px] bg-slate-950 px-2 py-1 rounded text-slate-400 font-mono max-w-[130px] truncate">
                            {s.sha256}
                          </code>
                          <button
                            onClick={() => handleCopyHash(s.sha256)}
                            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
                            title="Copiar SHA-256"
                          >
                            {copiedHash === s.sha256 ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-[10px]">Nativo</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={snapshotsApi.getDownloadUrl(s.filename)}
                          download={s.filename}
                          className="px-2.5 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 font-semibold text-[11px] transition flex items-center gap-1 shadow-sm"
                          title="Baixar pacote localmente para anexar à Release do GitHub"
                        >
                          <Download className="w-3 h-3" />
                          <span>Baixar (.qpack)</span>
                        </a>

                        {distConfig.is_configured && (
                          <button
                            onClick={() => handlePublishExisting(s.filename)}
                            disabled={publishingFilename === s.filename}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-semibold text-[11px] transition flex items-center gap-1"
                            title="Copia este pacote para a pasta do OneDrive configurada"
                          >
                            {publishingFilename === s.filename ? (
                              <RefreshCw className="w-3 h-3 animate-spin" />
                            ) : (
                              <CloudUpload className="w-3 h-3 text-slate-400" />
                            )}
                            <span>OneDrive</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(s.filename)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition"
                          title="Excluir arquivo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Explanatory Steps Card */}
      <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-3">
        <h4 className="font-bold text-slate-200 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <span>Como funciona a distribuição unificada da base via GitHub Releases:</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px]">
                1
              </span>
              <span>1 Clique para Gerar Pacote</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              O Administrador clica em <strong>&quot;Gerar Novo Pacote Oficial (.qpack)&quot;</strong>. O sistema extrai e valida os vetores do Qdrant e as sinapses do grafo neural com hash SHA-256 criptográfico.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Anexar à Release no GitHub</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Faça o download do pacote gerado abaixo e anexe-o nas Releases do GitHub com o nome padronizado <code className="text-indigo-300">axet_knowledge_base_latest.qpack</code>, ao lado dos instaladores <strong>.dmg</strong> e <strong>.msi</strong>.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">
                3
              </span>
              <span>Sincronização 100% Automática</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Qualquer usuário do aplicativo no Mac ou Windows clica no botão <strong>&quot;☁️ Sincronizar Base&quot;</strong> no cabeçalho. O app baixa e restaura tudo em segundo plano em instantes, sem consumir IA nem precisar saber caminhos de pastas!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
