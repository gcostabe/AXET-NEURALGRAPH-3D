"use client";

import { useEffect, useState } from "react";
import { adminApi, SourcesConfig, ReindexStatus, ApiError } from "@/lib/api";

export default function SourcesPanel() {
  const [config, setConfig] = useState<SourcesConfig | null>(null);
  const [browsePath, setBrowsePath] = useState<string>(".");
  const [subdirs, setSubdirs] = useState<string[]>([]);
  const [mdCount, setMdCount] = useState<number>(0);
  const [reindexStatus, setReindexStatus] = useState<ReindexStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [reindexing, setReindexing] = useState(false);
  const [pastedPath, setPastedPath] = useState<string>("");
  const [goingToPasted, setGoingToPasted] = useState(false);

  async function loadConfig() {
    try {
      const cfg = await adminApi.getSourcesConfig();
      setConfig(cfg);
      setBrowsePath(cfg.relative_path);
      await browse(cfg.relative_path);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao carregar configuração de fontes.");
    }
  }

  async function browse(path: string) {
    try {
      const result = await adminApi.browseSourcesDir(path);
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
      // não crítico — apenas informativo
    }
  }

  useEffect(() => {
    loadConfig();
    loadReindexStatus();
  }, []);

  function goUp() {
    if (browsePath === ".") return;
    const parts = browsePath.split("/").slice(0, -1);
    browse(parts.length === 0 ? "." : parts.join("/"));
  }

  function enterDir(name: string) {
    const next = browsePath === "." ? name : `${browsePath}/${name}`;
    browse(next);
  }

  async function goToPastedPath() {
    if (!pastedPath.trim()) return;
    setGoingToPasted(true);
    setError(null);
    try {
      await browse(pastedPath.trim());
    } finally {
      setGoingToPasted(false);
    }
  }

  async function handleSaveConfig() {
    setSaving(true);
    setError(null);
    try {
      const cfg = await adminApi.updateSourcesConfig(browsePath);
      setConfig(cfg);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao salvar configuração.");
    } finally {
      setSaving(false);
    }
  }

  async function handleReindex(mode: "incremental" | "full") {
    setReindexing(true);
    setError(null);
    try {
      await adminApi.triggerReindex(mode);
      setTimeout(loadReindexStatus, 3000);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao disparar reindexação.");
    } finally {
      setReindexing(false);
    }
  }

  return (
    <div className="rounded-lg bg-slate-900 p-4 space-y-3">
      <h2 className="font-medium">Fontes de documentos (.md)</h2>

      {config && (
        <p className="text-sm text-slate-400">
          Diretório ativo: <span className="text-slate-200">{config.resolved_path}</span>
        </p>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="rounded border border-slate-700 p-3">
        <label className="mb-1 block text-xs text-slate-400">
          Colar caminho completo do computador (ex.: /Users/joao/Documents/minhas-notas)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={pastedPath}
            onChange={(e) => setPastedPath(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") goToPastedPath();
            }}
            placeholder="/Users/seu-nome/Documents/minhas-notas"
            className="flex-1 rounded border border-slate-700 bg-slate-950 px-2 py-1.5 text-sm text-slate-200"
          />
          <button
            onClick={goToPastedPath}
            disabled={goingToPasted || !pastedPath.trim()}
            className="rounded bg-slate-700 px-3 py-1.5 text-sm font-medium hover:bg-slate-600 disabled:opacity-40"
          >
            {goingToPasted ? "Indo..." : "Ir"}
          </button>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Só funciona se essa pasta estiver dentro da raiz configurada em SOURCES_ROOT no servidor.
          Se estiver fora, será necessário ajustar o .env e reiniciar o backend.
        </p>
      </div>

      <div className="rounded border border-slate-700 p-3">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-400">
            Navegando em: <span className="text-slate-200">/{browsePath}</span>
          </span>
          <button
            onClick={goUp}
            disabled={browsePath === "."}
            className="rounded border border-slate-700 px-2 py-1 text-xs hover:bg-slate-800 disabled:opacity-40"
          >
            ↑ Voltar
          </button>
        </div>

        <p className="mb-2 text-xs text-slate-500">
          {mdCount} arquivo(s) .md encontrados diretamente nesta pasta.
        </p>

        <ul className="max-h-48 space-y-1 overflow-y-auto text-sm">
          {subdirs.length === 0 && (
            <li className="text-slate-500">Nenhuma subpasta.</li>
          )}
          {subdirs.map((name) => (
            <li key={name}>
              <button
                onClick={() => enterDir(name)}
                className="text-blue-400 hover:underline"
              >
                📁 {name}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={handleSaveConfig}
          disabled={saving}
          className="mt-3 rounded bg-blue-600 px-3 py-1.5 text-sm font-medium hover:bg-blue-500 disabled:opacity-50"
        >
          {saving ? "Salvando..." : "Usar esta pasta"}
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => handleReindex("incremental")}
          disabled={reindexing}
          className="rounded bg-green-600 px-3 py-1.5 text-sm font-medium hover:bg-green-500 disabled:opacity-50"
        >
          Reindexar (incremental)
        </button>
        <button
          onClick={() => handleReindex("full")}
          disabled={reindexing}
          className="rounded bg-amber-600 px-3 py-1.5 text-sm font-medium hover:bg-amber-500 disabled:opacity-50"
        >
          Reindexar tudo
        </button>
        {reindexStatus && reindexStatus.status !== "never_run" && (
          <span className="text-xs text-slate-400">
            Última execução: {reindexStatus.status}
            {reindexStatus.finished_at ? ` em ${reindexStatus.finished_at}` : ""}
          </span>
        )}
      </div>
    </div>
  );
}
