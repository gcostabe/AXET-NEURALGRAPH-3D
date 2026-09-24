"use client";

import { useEffect, useState } from "react";
import {
  Folder,
  FolderOpen,
  ChevronRight,
  HardDrive,
  RefreshCw,
  ArrowUp,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  FileCode2,
  FolderSearch,
  Activity,
  Play,
  BookOpen,
  Save,
  Server,
  Video,
} from "lucide-react";

import { adminApi, SourcesConfig, ReindexStatus, ApiError } from "@/lib/api";
import { DefragMatrixVisualizer } from "./DefragMatrixVisualizer";
import CountryLegislationPanel from "./CountryLegislationPanel";
import RegulatoryGlossaryPanel from "./RegulatoryGlossaryPanel";
import VideoProcessorPanel from "./VideoProcessorPanel";

export default function SourcesPanel() {
  const [sourcesTab, setSourcesTab] = useState<"directories" | "videos" | "legislation" | "glossary">("directories");

  const [config, setConfig] = useState<SourcesConfig | null>(null);
  const [browsePath, setBrowsePath] = useState<string>(".");
  const [subdirs, setSubdirs] = useState<string[]>([]);
  const [mdCount, setMdCount] = useState<number>(0);
  const [reindexStatus, setReindexStatus] = useState<ReindexStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [reindexing, setReindexing] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showDefragModal, setShowDefragModal] = useState(false);
  const [reindexMode, setReindexMode] = useState<"incremental" | "full">("incremental");

  // Caminho do computador e seletor do Finder
  const [selectedPath, setSelectedPath] = useState<string>("");
  const [pickingFolder, setPickingFolder] = useState(false);
  const [syncingOneDrive, setSyncingOneDrive] = useState(false);

  function cleanPath(input: string): string {
    let clean = input.trim();
    if (
      (clean.startsWith('"') && clean.endsWith('"')) ||
      (clean.startsWith("'") && clean.endsWith("'"))
    ) {
      clean = clean.slice(1, -1).trim();
    }
    return clean;
  }

  async function loadConfig() {
    try {
      const cfg = await adminApi.getSourcesConfig();
      setConfig(cfg);
      setBrowsePath(cfg.relative_path);
      setSelectedPath(cfg.relative_path === "." ? cfg.resolved_path : `${cfg.resolved_path}`);
      await browse(cfg.relative_path);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao carregar configuração de fontes.");
    }
  }

  async function browse(path: string) {
    try {
      const target = cleanPath(path);
      const result = await adminApi.browseSourcesDir(target);
      setBrowsePath(result.relative_path);
      setSubdirs(result.subdirectories);
      setMdCount(result.markdown_files_here);
      setError(null);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao navegar no diretório.");
    }
  }

  async function loadReindexStatus() {
    try {
      setReindexStatus(await adminApi.getReindexStatus());
    } catch {
      // informativo
    }
  }

  useEffect(() => {
    loadConfig();
    loadReindexStatus();
  }, []);

  useEffect(() => {
    if (reindexStatus?.status === "running") {
      const interval = setInterval(loadReindexStatus, 1000);
      return () => clearInterval(interval);
    }
  }, [reindexStatus?.status]);

  function goUp() {
    if (browsePath === ".") return;
    const parts = browsePath.split("/").slice(0, -1);
    browse(parts.length === 0 ? "." : parts.join("/"));
  }

  function enterDir(name: string) {
    const next = browsePath === "." ? name : `${browsePath}/${name}`;
    browse(next);
  }

  // Aciona o seletor nativo do Finder no macOS via daemon bridge local (sem nenhum upload)
  async function handlePickFolderWithFinder() {
    setPickingFolder(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8765/pick-folder");
      const data = await res.json();
      if (data.path) {
        setSelectedPath(data.path);
        // Aplica e salva automaticamente o novo caminho escolhido no Finder
        const clean = cleanPath(data.path);
        const cfg = await adminApi.updateSourcesConfig(clean);
        setConfig(cfg);
        setBrowsePath(cfg.relative_path);
        await browse(cfg.relative_path);
        setSuccessMsg(`Caminho raiz selecionado no Finder e salvo com sucesso: ${data.path}`);
        setTimeout(() => setSuccessMsg(null), 5000);
      }
    } catch {
      setError(
        "Para abrir a janela do Finder nativa, certifique-se de que o assistente local está ativo. Você também pode digitar ou colar o caminho diretamente no campo abaixo."
      );
    } finally {
      setPickingFolder(false);
    }
  }

  async function handleSyncOneDrive() {
    setSyncingOneDrive(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const res = await adminApi.syncOneDrive();
      setSuccessMsg(res.message || "Sincronização com OneDrive concluída!");
      await browse(browsePath);
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch (err: any) {
      setError(err instanceof ApiError ? err.message : "Erro ao sincronizar com OneDrive.");
    } finally {
      setSyncingOneDrive(false);
    }
  }

  async function handleApplyPath() {
    const target = cleanPath(selectedPath);
    if (!target) return;
    setSaving(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const cfg = await adminApi.updateSourcesConfig(target);
      setConfig(cfg);
      setBrowsePath(cfg.relative_path);
      await browse(cfg.relative_path);
      setSuccessMsg(`Pasta raiz salva com sucesso: /${cfg.relative_path}`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao aplicar caminho selecionado.");
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveActiveDir() {
    setSaving(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const cfg = await adminApi.updateSourcesConfig(browsePath);
      setConfig(cfg);
      setSuccessMsg(`Pasta ativa do RAG definida para: /${cfg.relative_path}`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao salvar diretório ativo.");
    } finally {
      setSaving(false);
    }
  }

  async function handleReindex(mode: "incremental" | "full") {
    setReindexing(true);
    setReindexMode(mode);
    setShowDefragModal(true);
    setError(null);
    setReindexStatus({ status: "running" });
    try {
      await adminApi.triggerReindex(mode);
      setSuccessMsg(`Reindexação (${mode}) em andamento...`);
      setTimeout(loadReindexStatus, 1000);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao disparar reindexação.");
      loadReindexStatus();
    } finally {
      setReindexing(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Alertas de Status / Erros */}
      {error && (
        <div className="flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-300">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Abas Internas da Área de Fontes e Ingestão */}
      <div className="flex border-b border-slate-800 gap-2">
        <button
          onClick={() => setSourcesTab("directories")}
          className={`pb-3 px-4 text-xs font-semibold border-b-2 transition flex items-center gap-2 ${
            sourcesTab === "directories"
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <HardDrive className="h-4 w-4" />
          <span>📁 Gestão de Diretórios & Ingestão</span>
        </button>

        <button
          onClick={() => setSourcesTab("videos")}
          className={`pb-3 px-4 text-xs font-semibold border-b-2 transition flex items-center gap-2 ${
            sourcesTab === "videos"
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Video className="h-4 w-4" />
          <span>🎥 Processamento de Vídeos</span>
        </button>

        <button
          onClick={() => setSourcesTab("legislation")}
          className={`pb-3 px-4 text-xs font-semibold border-b-2 transition flex items-center gap-2 ${
            sourcesTab === "legislation"
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <FolderSearch className="h-4 w-4" />
          <span>⚖️ Legislação por País</span>
        </button>

        <button
          onClick={() => setSourcesTab("glossary")}
          className={`pb-3 px-4 text-xs font-semibold border-b-2 transition flex items-center gap-2 ${
            sourcesTab === "glossary"
              ? "border-cyan-500 text-cyan-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>📚 Impacto Regulatório & Glossário De ➔ Para</span>
        </button>
      </div>

      {/* Aba de Vídeos: Processamento Multimodal com OCR vs Somente Áudio */}
      {sourcesTab === "videos" && <VideoProcessorPanel />}

      {/* Aba 2: Legislação & Regulação por País (Mono-País) */}
      {sourcesTab === "legislation" && (
        <CountryLegislationPanel
          onTriggerReindex={() => {
            handleReindex("incremental");
            browse(browsePath);
          }}
        />
      )}

      {/* Aba 3: Impacto Regulatório & Glossário De ➔ Para */}
      {sourcesTab === "glossary" && <RegulatoryGlossaryPanel />}


      {/* Aba 1: Gestão de Diretórios e Ingestão */}
      {sourcesTab === "directories" && (
        <div className="space-y-6">
          {/* Card 1: Configuração do Diretório Raiz de Fontes */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-sky-400" />
                  <span>Diretório Raiz de Fontes (.md)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Aponte a pasta raiz no seu Mac. O File Watcher e o GraphRAG monitoram este caminho diretamente no disco.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-[11px] font-mono text-slate-400">
                <Server className="h-3 w-3 text-sky-400" />
                <span>Volume Local</span>
              </span>
            </div>

            {/* Input e Grupo de Ações Simétrico */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-300">
                Caminho raiz no computador (Host):
              </label>
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <div className="relative flex-1">
                  <HardDrive className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={selectedPath}
                    onChange={(e) => setSelectedPath(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleApplyPath();
                    }}
                    placeholder="/Users/seu-usuario/Documents/minhas-notas"
                    className="w-full h-10 rounded-xl border border-slate-700 bg-slate-950 pl-10 pr-3.5 text-xs text-slate-100 placeholder-slate-500 focus:border-sky-500 focus:outline-none transition"
                  />
                </div>

                {/* Botões perfeitamente simétricos (mesma altura, estilo equilibrado) */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handlePickFolderWithFinder}
                    disabled={pickingFolder || syncingOneDrive || saving}
                    className="h-10 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 px-4 text-xs font-semibold text-white shadow-md shadow-blue-500/20 hover:from-blue-500 hover:to-sky-400 active:scale-[0.98] disabled:opacity-50 transition shrink-0"
                    title="Abre a janela de escolha de pasta nativa do macOS"
                  >
                    <FolderSearch className={`h-4 w-4 ${pickingFolder ? "animate-spin" : ""}`} />
                    <span>{pickingFolder ? "Escolhendo..." : "Escolher no Finder"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSyncOneDrive}
                    disabled={syncingOneDrive || saving}
                    className="h-10 inline-flex items-center justify-center gap-2 rounded-xl border border-sky-500/40 bg-sky-950/40 hover:bg-sky-900/60 px-4 text-xs font-semibold text-sky-300 hover:text-white active:scale-[0.98] disabled:opacity-40 transition shrink-0"
                    title="Espelha arquivos e pastas novas do OneDrive do Mac para o diretório de fontes do Docker"
                  >
                    <RefreshCw className={`h-4 w-4 text-sky-400 ${syncingOneDrive ? "animate-spin" : ""}`} />
                    <span>{syncingOneDrive ? "Sincronizando..." : "Sincronizar OneDrive"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleApplyPath}
                    disabled={saving || syncingOneDrive || !selectedPath.trim()}
                    className="h-10 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 px-4 text-xs font-semibold text-slate-200 hover:text-white active:scale-[0.98] disabled:opacity-40 transition shrink-0"
                    title="Salva o caminho digitado como nova raiz"
                  >
                    <Save className="h-4 w-4 text-slate-400" />
                    <span>{saving ? "Salvando..." : "Salvar Raiz"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Indicadores Balanceados em 2 Colunas */}
            {config && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="rounded-xl border border-slate-800/80 bg-slate-950/70 p-3 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                      Subpasta Ativa para Ingestão
                    </span>
                    <span className="font-mono font-medium text-sky-400 text-xs mt-0.5">
                      /{config.relative_path}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>Escopo Ativo</span>
                  </span>
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-slate-950/70 p-3 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                      Raiz Montada no Container
                    </span>
                    <span className="font-mono text-slate-300 text-xs mt-0.5">
                      {config.sources_root}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/15 border border-sky-500/30 px-2 py-0.5 text-[10px] font-medium text-sky-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>Docker Mount</span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Navegador Interativo de Subpastas & Command Deck */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl space-y-4">
            {/* Explorer Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div className="flex items-center flex-wrap gap-2 text-xs">
                <span className="text-slate-400 font-medium">Navegando em:</span>
                <span className="font-mono rounded-lg bg-sky-500/10 border border-sky-500/25 px-2.5 py-1 text-sky-300 font-semibold text-xs">
                  /{browsePath}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 flex items-center gap-1.5 rounded-lg bg-slate-950 px-2.5 py-1 border border-slate-800">
                  <FileCode2 className="h-3.5 w-3.5 text-blue-400" />
                  <span className="font-medium text-slate-200">{mdCount}</span> arquivo(s) .md diretos
                </span>
              </div>

              <button
                type="button"
                onClick={goUp}
                disabled={browsePath === "."}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 disabled:opacity-40 transition"
              >
                <ArrowUp className="h-3.5 w-3.5 text-slate-400" />
                <span>Subir Diretório</span>
              </button>
            </div>

            {/* Lista de Subpastas */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
              <ul className="max-h-56 space-y-1 overflow-y-auto pr-1">
                {subdirs.length === 0 && (
                  <li className="p-4 text-center text-xs text-slate-500">
                    Nenhuma subpasta neste diretório.
                  </li>
                )}
                {subdirs.map((name) => (
                  <li key={name}>
                    <button
                      type="button"
                      onClick={() => enterDir(name)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs text-slate-200 hover:bg-slate-800/80 hover:text-white group transition"
                    >
                      <span className="flex items-center gap-2.5 truncate">
                        <Folder className="h-4 w-4 text-amber-400 group-hover:text-amber-300 shrink-0" />
                        <span className="truncate">{name}</span>
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-slate-300 shrink-0" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Command Deck Simétrico de Ações */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-2">
              {/* Lado Esquerdo: Ação Primária de Escopo (col-span-5) */}
              <div className="lg:col-span-5 flex">
                <button
                  type="button"
                  onClick={handleSaveActiveDir}
                  disabled={saving}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-sky-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/20 hover:opacity-95 active:scale-[0.99] disabled:opacity-50 transition-all"
                >
                  <FolderOpen className="h-4 w-4 text-sky-100" />
                  <span className="truncate">
                    {saving ? "Salvando..." : `Definir "/${browsePath}" como Pasta Ativa`}
                  </span>
                </button>
              </div>

              {/* Lado Direito: Grid Simétrico de Ações de Ingestão (col-span-7) */}
              <div className="lg:col-span-7 flex flex-col gap-2">
                {reindexStatus?.status === "interrupted" && (
                  <button
                    type="button"
                    onClick={() => handleReindex("incremental")}
                    disabled={reindexing}
                    className="w-full min-h-[40px] inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-600/25 hover:brightness-110 active:scale-[0.99] disabled:opacity-50 transition animate-pulse"
                  >
                    <Play className="h-4 w-4 fill-white" />
                    <span>Retomar de Onde Parou (Checkpoint Ativo)</span>
                  </button>
                )}

                <div className="grid grid-cols-3 gap-2 w-full">
                  <button
                    type="button"
                    onClick={() => handleReindex("incremental")}
                    disabled={reindexing}
                    className="min-h-[44px] inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/15 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/25 disabled:opacity-50 transition"
                    title="Indexa apenas arquivos novos ou alterados"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${reindexing ? "animate-spin" : ""}`} />
                    <span className="hidden sm:inline">Reindexar</span> Incremental
                  </button>

                  <button
                    type="button"
                    onClick={() => handleReindex("full")}
                    disabled={reindexing}
                    className="min-h-[44px] inline-flex items-center justify-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/15 px-3 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-500/25 disabled:opacity-50 transition"
                    title="Limpa a coleção e reindexa todos os arquivos"
                  >
                    <span className="hidden sm:inline">Reindexar</span> Tudo
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowDefragModal(true)}
                    className="min-h-[44px] inline-flex items-center justify-center gap-1.5 rounded-xl border border-sky-500/30 bg-sky-500/15 px-3 py-2 text-xs font-semibold text-sky-300 hover:bg-sky-500/25 transition shadow-[0_0_12px_rgba(56,189,248,0.15)]"
                    title="Visualizar matriz de fragmentação e evolução cognitiva"
                  >
                    <Activity className={`h-3.5 w-3.5 text-sky-400 ${reindexStatus?.status === "running" ? "animate-pulse" : ""}`} />
                    <span>Defrag Neural</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Card Elegante de Status de Ingestão */}
            {reindexStatus && reindexStatus.status !== "never_run" && (
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">Status de Ingestão:</span>
                    <span
                      className={`font-semibold px-2.5 py-0.5 rounded-md text-[11px] uppercase tracking-wide flex items-center gap-1.5 ${
                        reindexStatus.status === "running"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30 animate-pulse"
                          : reindexStatus.status === "interrupted"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : reindexStatus.status === "success"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : reindexStatus.status === "error"
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {reindexStatus.status === "running" ? (
                        <>
                          <RefreshCw className="h-3 w-3 animate-spin" />
                          <span>Em Execução</span>
                        </>
                      ) : reindexStatus.status === "interrupted" ? (
                        <>
                          <AlertTriangle className="h-3 w-3 text-amber-400" />
                          <span>Interrompido (Checkpoint Salvo)</span>
                        </>
                      ) : reindexStatus.status === "error" ? (
                        <>
                          <AlertCircle className="h-3 w-3 text-rose-400" />
                          <span>Falha</span>
                        </>
                      ) : reindexStatus.status === "success" ? (
                        <>
                          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                          <span>Sucesso</span>
                        </>
                      ) : (
                        reindexStatus.status
                      )}
                    </span>
                  </div>

                  {reindexStatus.finished_at && (
                    <span className="text-slate-500 text-xs">
                      Última conclusão: {new Date(reindexStatus.finished_at).toLocaleString("pt-BR")}
                    </span>
                  )}
                </div>

                {reindexStatus.status === "interrupted" && reindexStatus.progress && (
                  <div className="rounded-lg bg-amber-500/10 border border-amber-500/25 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="space-y-1">
                      <div className="text-xs text-amber-200 font-medium">
                        Progresso preservado: {((reindexStatus.progress.processed ?? 0) + (reindexStatus.progress.skipped ?? 0))} de {reindexStatus.progress.total_files ?? 0} arquivos ({reindexStatus.progress.remaining_files ?? 0} restantes).
                      </div>
                      {/* Barra de Progresso Visual */}
                      {reindexStatus.progress.total_files && reindexStatus.progress.total_files > 0 && (
                        <div className="w-full sm:w-72 bg-slate-900 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${Math.min(100, Math.round((((reindexStatus.progress.processed ?? 0) + (reindexStatus.progress.skipped ?? 0)) / reindexStatus.progress.total_files) * 100))}%`
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleReindex("incremental")}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 px-3 py-1.5 text-xs font-bold text-amber-300 hover:text-white transition shrink-0"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>Retomar Ingestão</span>
                    </button>
                  </div>
                )}

                {reindexStatus.status === "error" && reindexStatus.detail && (
                  <div className="text-rose-300 bg-rose-950/40 border border-rose-900/50 rounded-lg p-2.5 text-xs font-mono">
                    Motivo:{" "}
                    {typeof reindexStatus.detail === "object" && "error" in reindexStatus.detail
                      ? String(reindexStatus.detail.error)
                      : JSON.stringify(reindexStatus.detail)}
                  </div>
                )}

                {reindexStatus.status === "success" && reindexStatus.detail && (
                  <div className="text-emerald-300 text-xs font-mono bg-emerald-950/30 border border-emerald-900/40 rounded-lg p-2.5">
                    {typeof reindexStatus.detail === "object"
                      ? `Arquivos processados: ${(reindexStatus.detail as any).processed ?? 0} | Ignorados: ${(reindexStatus.detail as any).skipped ?? 0} | Chunks gravados: ${(reindexStatus.detail as any).total_chunks_written ?? 0}`
                      : JSON.stringify(reindexStatus.detail)}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <DefragMatrixVisualizer
        isOpen={showDefragModal}
        onClose={() => setShowDefragModal(false)}
        status={reindexStatus}
        mode={reindexMode}
        onResume={() => handleReindex("incremental")}
      />
    </div>
  );
}
