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
} from "lucide-react";
import { adminApi, SourcesConfig, ReindexStatus, ApiError } from "@/lib/api";
import { DefragMatrixVisualizer } from "./DefragMatrixVisualizer";
import CountryLegislationPanel from "./CountryLegislationPanel";
import RegulatoryGlossaryPanel from "./RegulatoryGlossaryPanel";

export default function SourcesPanel() {
  const [sourcesTab, setSourcesTab] = useState<"directories" | "legislation" | "glossary">("directories");
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
    setSuccessMsg(null);

    try {
      const res = await fetch("http://localhost:8765/pick-folder");
      if (!res.ok) throw new Error("Bridge local indisponível");
      const data = await res.json();

      if (data.path) {
        setSelectedPath(data.path);
        // Atualiza a visualização e salva no backend
        const cfg = await adminApi.updateSourcesConfig(data.path);
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
      {/* Card Principal: Seleção de Caminho Raiz com botão Finder */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <HardDrive className="h-5 w-5 text-blue-400" />
            Diretório Raiz de Fontes (.md)
          </h3>
          <p className="text-xs text-slate-400">
            Aponte a pasta raiz de documentos no seu Mac. O File Watcher e o GraphRAG monitoram este caminho diretamente no disco.
          </p>
        </div>

        {/* Campo com botão para abrir o Finder nativo e pegar o caminho */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-300">
            Caminho raiz do computador:
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={selectedPath}
              onChange={(e) => setSelectedPath(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleApplyPath();
              }}
              placeholder="/Users/seu-usuario/Documents/minhas-notas"
              className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none transition"
            />

            {/* Botão que abre o Finder para escolher o diretório */}
            <button
              type="button"
              onClick={handlePickFolderWithFinder}
              disabled={pickingFolder}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-sky-400 active:scale-[0.99] disabled:opacity-50 transition-all shrink-0"
              title="Abre a janela de escolha de pasta nativa do macOS"
            >
              <FolderSearch className={`h-4 w-4 ${pickingFolder ? "animate-spin" : ""}`} />
              <span>{pickingFolder ? "Escolhendo no Finder..." : "Escolher no Finder"}</span>
            </button>

            {/* Botão para aplicar o caminho digitado/colado */}
            <button
              type="button"
              onClick={handleApplyPath}
              disabled={saving || !selectedPath.trim()}
              className="inline-flex items-center justify-center rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 disabled:opacity-40 transition shrink-0"
            >
              <span>{saving ? "Salvando..." : "Salvar Raiz"}</span>
            </button>
          </div>
        </div>

        {/* Indicador de diretório ativo */}
        {config && (
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs space-y-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-slate-400">
                Subpasta Ativa para Ingestão:{" "}
                <span className="font-mono font-medium text-sky-400">
                  /{config.relative_path}
                </span>
              </span>
              <span className="text-slate-500 text-[11px]">
                Raiz montada no container: <span className="font-mono text-slate-400">{config.sources_root}</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Navegador Interativo de Subpastas */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
            <span className="text-slate-500">Navegando em:</span>
            <span className="font-mono rounded bg-slate-800 px-2 py-0.5 text-sky-400">
              /{browsePath}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 flex items-center gap-1">
              <FileCode2 className="h-3.5 w-3.5 text-blue-400" />
              {mdCount} arquivo(s) .md diretos
            </span>
          </div>

          <button
            type="button"
            onClick={goUp}
            disabled={browsePath === "."}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/70 px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-700 disabled:opacity-40 transition"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>Subir</span>
          </button>
        </div>

        {/* Lista de Subpastas */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
          <ul className="max-h-56 space-y-1 overflow-y-auto pr-1">
            {subdirs.length === 0 && (
              <li className="p-3 text-center text-xs text-slate-500">
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

        {/* Ações: Definir pasta ativa e Reindexar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleSaveActiveDir}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-500 active:scale-[0.99] disabled:opacity-50 transition-all"
          >
            <FolderOpen className="h-4 w-4" />
            <span>{saving ? "Salvando..." : `Definir "/${browsePath}" como Pasta Ativa do RAG`}</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {reindexStatus?.status === "interrupted" && (
              <button
                type="button"
                onClick={() => handleReindex("incremental")}
                disabled={reindexing}
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 hover:brightness-110 active:scale-[0.98] disabled:opacity-50 transition animate-pulse"
              >
                <Play className="h-3.5 w-3.5 fill-white" />
                <span>Retomar de onde parou</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => handleReindex("incremental")}
              disabled={reindexing}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600/90 px-3 py-2 text-xs font-medium text-white hover:bg-emerald-500 disabled:opacity-50 transition"
            >
              <RefreshCw className={`h-3 w-3 ${reindexing ? "animate-spin" : ""}`} />
              <span>Reindexar (incremental)</span>
            </button>
            <button
              type="button"
              onClick={() => handleReindex("full")}
              disabled={reindexing}
              className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-300 hover:bg-amber-500/20 disabled:opacity-50 transition"
            >
              <span>Reindexar tudo</span>
            </button>
            <button
              type="button"
              onClick={() => setShowDefragModal(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-xs font-semibold text-sky-300 hover:bg-sky-500/20 transition shadow-[0_0_12px_rgba(56,189,248,0.2)]"
            >
              <Activity className={`h-3.5 w-3.5 text-sky-400 ${reindexStatus?.status === "running" ? "animate-pulse" : ""}`} />
              <span>Monitor Defrag Neural</span>
            </button>
          </div>
        </div>

        {reindexStatus && reindexStatus.status !== "never_run" && (
          <div className="pt-2 flex flex-col gap-1 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Última execução de ingestão:</span>
              <span
                className={`font-semibold px-2 py-0.5 rounded text-[10px] uppercase tracking-wide flex items-center gap-1 ${
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
                    <RefreshCw className="h-2.5 w-2.5 animate-spin" />
                    <span>Em Execução...</span>
                  </>
                ) : reindexStatus.status === "interrupted" ? (
                  <>
                    <AlertTriangle className="h-2.5 w-2.5 text-amber-400" />
                    <span>Interrompido (Checkpoint Salvo)</span>
                  </>
                ) : reindexStatus.status === "error" ? (
                  "Erro"
                ) : reindexStatus.status === "success" ? (
                  "Sucesso"
                ) : (
                  reindexStatus.status
                )}
              </span>
              {reindexStatus.status === "running" ? (
                <span className="text-blue-400 font-mono text-[10px]">
                  Processando arquivos e gerando embeddings no Qdrant...
                </span>
              ) : reindexStatus.finished_at ? (
                <span className="text-slate-500">
                  em {new Date(reindexStatus.finished_at).toLocaleString("pt-BR")}
                </span>
              ) : null}
            </div>
            {reindexStatus.status === "interrupted" && reindexStatus.progress && (
              <div className="text-amber-300/90 bg-amber-950/25 border border-amber-900/40 rounded-md p-2 mt-1 font-mono text-[10px] flex items-center justify-between">
                <span>
                  Checkpoint preservado no Postgres: {((reindexStatus.progress.processed ?? 0) + (reindexStatus.progress.skipped ?? 0))} de {reindexStatus.progress.total_files ?? 0} arquivos consolidados ({reindexStatus.progress.remaining_files ?? "?"} restantes).
                </span>
                <button
                  type="button"
                  onClick={() => handleReindex("incremental")}
                  className="underline hover:text-white font-bold ml-2 text-emerald-400"
                >
                  Retomar agora →
                </button>
              </div>
            )}
            {reindexStatus.status === "error" && reindexStatus.detail && (
              <div className="text-rose-400/90 bg-rose-950/30 border border-rose-900/40 rounded-md p-2 mt-1 font-mono text-[10px]">
                Motivo da falha:{" "}
                {typeof reindexStatus.detail === "object" && "error" in reindexStatus.detail
                  ? String(reindexStatus.detail.error)
                  : JSON.stringify(reindexStatus.detail)}
              </div>
            )}
            {reindexStatus.status === "success" && reindexStatus.detail && (
              <div className="text-emerald-400/90 text-[10px] font-mono bg-emerald-950/20 border border-emerald-900/30 rounded-md p-2 mt-1">
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
