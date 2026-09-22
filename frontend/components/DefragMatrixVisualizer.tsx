"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  FileText,
  Gauge,
  Hourglass,
  Layers,
  Maximize2,
  Minimize2,
  Play,
  RotateCcw,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { ReindexStatus } from "@/lib/api";

interface DefragMatrixVisualizerProps {
  isOpen: boolean;
  onClose: () => void;
  status: ReindexStatus | null;
  mode: "incremental" | "full";
  onResume?: () => void;
}

type BlockState = "pending" | "parsing" | "embedding" | "indexed" | "cached";

function formatSeconds(secs: number): string {
  if (secs <= 0 || isNaN(secs)) return "00:00";
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  if (m >= 60) {
    const h = Math.floor(m / 60);
    const remM = m % 60;
    return `${h}h ${remM}m ${s.toString().padStart(2, "0")}s`;
  }
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function DefragMatrixVisualizer({
  isOpen,
  onClose,
  status,
  mode,
  onResume,
}: DefragMatrixVisualizerProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const TOTAL_BLOCKS = 180; // 18 colunas x 10 linhas

  const progress = status?.progress;
  const isRunning = status?.status === "running";
  const isInterrupted = status?.status === "interrupted";
  const isSuccess = status?.status === "success";
  const isError = status?.status === "error";

  // Timer persistente baseado no started_at real salvo no backend (não reseta ao fechar/reabrir ou recarregar)
  useEffect(() => {
    const startedAtStr = progress?.started_at || status?.started_at;
    if (!startedAtStr) {
      setElapsedSeconds(0);
      return;
    }

    const startTime = new Date(startedAtStr).getTime();
    if (isNaN(startTime)) return;

    const finishedAtStr = status?.finished_at;
    const finishTime = finishedAtStr ? new Date(finishedAtStr).getTime() : null;

    const calcElapsed = () => {
      if (isRunning) {
        const now = Date.now();
        setElapsedSeconds(Math.max(0, Math.floor((now - startTime) / 1000)));
      } else if (finishTime && !isNaN(finishTime)) {
        setElapsedSeconds(Math.max(0, Math.floor((finishTime - startTime) / 1000)));
      } else {
        const now = Date.now();
        setElapsedSeconds(Math.max(0, Math.floor((now - startTime) / 1000)));
      }
    };

    calcElapsed();

    if (isRunning) {
      const interval = setInterval(calcElapsed, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, progress?.started_at, status?.started_at, status?.finished_at]);

  // Cálculo de percentual
  const percent = useMemo(() => {
    if (isSuccess) return 100;
    if (!progress || !progress.total_files || progress.total_files === 0) return 0;
    const current = (progress.processed ?? 0) + (progress.skipped ?? 0);
    return Math.min(100, Math.round((current / progress.total_files) * 100));
  }, [isSuccess, progress]);

  // Exibição textual do ETA
  const etaDisplay = useMemo(() => {
    if (isSuccess) return "Concluído!";
    if (isInterrupted) return "Pausado (Servidor reiniciado)";
    if (isError) return "Falha detectada";
    if (!isRunning) return "Aguardando início";

    if (progress?.eta_seconds !== undefined && progress.eta_seconds !== null) {
      if (progress.eta_seconds === 0) return "Quase concluído...";
      const formatted = formatSeconds(progress.eta_seconds);
      if (progress.eta_iso) {
        const etaDate = new Date(progress.eta_iso).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        return `~${formatted} restantes (término às ${etaDate})`;
      }
      return `~${formatted} restantes`;
    }

    return "Calculando previsão...";
  }, [isSuccess, isInterrupted, isError, isRunning, progress?.eta_seconds, progress?.eta_iso]);

  // Mapeamento dos blocos estilo "Desfragmentador de Disco"
  const blocks: BlockState[] = useMemo(() => {
    const list: BlockState[] = new Array(TOTAL_BLOCKS).fill("pending");

    if (isSuccess) {
      // Todos indexados com sucesso
      return list.map((_, idx) => (mode === "incremental" && idx % 3 === 0 ? "cached" : "indexed"));
    }

    if (!progress || !progress.total_files) {
      return list;
    }

    const totalFiles = progress.total_files;
    const processedFiles = progress.processed ?? 0;
    const skippedFiles = progress.skipped ?? 0;

    const indexedCount = Math.floor((processedFiles / totalFiles) * TOTAL_BLOCKS);
    const cachedCount = Math.floor((skippedFiles / totalFiles) * TOTAL_BLOCKS);
    const activeIndex = Math.min(TOTAL_BLOCKS - 1, indexedCount + cachedCount);

    if (isInterrupted || !isRunning) {
      for (let i = 0; i < TOTAL_BLOCKS; i++) {
        if (i < indexedCount) {
          list[i] = "indexed";
        } else if (i < indexedCount + cachedCount) {
          list[i] = "cached";
        } else {
          list[i] = "pending";
        }
      }
      return list;
    }

    for (let i = 0; i < TOTAL_BLOCKS; i++) {
      if (i < indexedCount) {
        list[i] = "indexed";
      } else if (i < indexedCount + cachedCount) {
        list[i] = "cached";
      } else if (i === activeIndex) {
        // Bloco na "cabeça de leitura/gravação"
        list[i] = progress.phase === "embedding" ? "embedding" : "parsing";
      } else if (i === activeIndex + 1 && activeIndex + 1 < TOTAL_BLOCKS) {
        list[i] = "parsing";
      } else {
        list[i] = "pending";
      }
    }

    return list;
  }, [isSuccess, isRunning, isInterrupted, progress, mode]);

  if (!isOpen) return null;

  // Estado Minimizado (Widget Flutuante)
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-sky-500/40 bg-slate-950/90 px-4 py-3 shadow-[0_0_25px_rgba(2,132,199,0.35)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/30 border border-sky-400/40">
          <Activity className={`h-5 w-5 text-sky-400 ${isRunning ? "animate-pulse" : ""}`} />
          {isRunning && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
              {isRunning
                ? "Desfragmentando Base"
                : isInterrupted
                ? "Indexação Interrompida"
                : isSuccess
                ? "Indexação Concluída"
                : "Reindexação"}
            </span>
            <span className="rounded bg-sky-950/80 px-1.5 py-0.5 text-[11px] font-mono font-bold text-sky-300">
              {percent}%
            </span>
          </div>
          <div className="text-[11px] text-slate-400 truncate max-w-[200px]">
            {progress?.current_file
              ? progress.current_file.split("/").pop()
              : isInterrupted
              ? "Pronto para retomar"
              : "Preparando lotes..."}
          </div>
        </div>
        <div className="flex items-center gap-1 pl-2 border-l border-slate-800">
          <button
            onClick={() => setIsMinimized(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
            title="Expandir visualizador"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          {!isRunning && (
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              title="Fechar"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div
        className={`relative flex flex-col overflow-hidden rounded-3xl border border-sky-500/30 bg-slate-950/95 shadow-[0_0_60px_rgba(2,132,199,0.25)] transition-all duration-300 ${
          isFullscreen
            ? "w-full h-full max-w-none rounded-none border-none"
            : "w-full max-w-5xl max-h-[92vh]"
        }`}
      >
        {/* Background Grid Accent */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

        {/* Top Header */}
        <div className="relative flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-600/30 border border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
              <Cpu className={`h-5 w-5 text-sky-400 ${isRunning ? "animate-pulse" : ""}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                  <span>NTT DATA</span>
                  <span className="text-slate-500 font-normal">|</span>
                  <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent font-mono uppercase tracking-wide">
                    Neural Defrag & Vector Cluster HUD
                  </span>
                </h2>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                    isRunning
                      ? "bg-sky-500/15 text-sky-400 border border-sky-500/30"
                      : isInterrupted
                      ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                      : isSuccess
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : isError
                      ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isRunning
                        ? "bg-sky-400 animate-ping"
                        : isInterrupted
                        ? "bg-amber-400"
                        : isSuccess
                        ? "bg-emerald-400"
                        : isError
                        ? "bg-rose-400"
                        : "bg-slate-400"
                    }`}
                  />
                  {isRunning
                    ? "INDEXANDO SETORES..."
                    : isInterrupted
                    ? "PAUSADO / CHECKPOINT SALVO"
                    : isSuccess
                    ? "SISTEMA INTEGRADO"
                    : isError
                    ? "FALHA DETECTADA"
                    : "PRONTO"}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Mapeamento vetorial BGE-M3 e alocação de tensores no banco vetorial Qdrant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsMinimized(true)}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              title="Minimizar para widget"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
              title={isFullscreen ? "Restaurar" : "Tela cheia"}
            >
              <Maximize2 className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              disabled={isRunning}
              className={`rounded-lg p-2 transition ${
                isRunning
                  ? "text-slate-600 cursor-not-allowed"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
              title={isRunning ? "Aguarde a conclusão da indexação" : "Fechar"}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="relative flex-1 overflow-y-auto p-6 space-y-6">
          {/* HUD Top Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Stat 1: Arquivos no Volume & Restantes */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 relative overflow-hidden backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Arquivos no Volume</span>
                <FileText className="h-4 w-4 text-sky-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black font-mono text-white">
                  {(progress?.processed ?? 0) + (progress?.skipped ?? 0)}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  / {progress?.total_files || (isSuccess ? (status?.detail as any)?.files_found : "...")}
                </span>
              </div>
              <div className="text-[11px] text-sky-400/80 mt-1 font-mono truncate">
                {progress?.remaining_files !== undefined
                  ? `${progress.remaining_files} restantes (${progress.skipped || 0} cache • ${progress.processed || 0} novos)`
                  : progress?.skipped
                  ? `${progress.skipped} em cache incremental`
                  : "Escaneando diretórios..."}
              </div>
            </div>

            {/* Stat 2: Chunks Qdrant */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 relative overflow-hidden backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Vetores Gravados</span>
                <Database className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black font-mono text-emerald-400">
                  {progress?.total_chunks || (isSuccess ? (status?.detail as any)?.total_chunks_written : 0)}
                </span>
                <span className="text-xs text-slate-500 font-mono">chunks</span>
              </div>
              <div className="text-[11px] text-emerald-500/80 mt-1 font-mono flex items-center gap-1">
                <Zap className="h-3 w-3" /> Qdrant 1024-dim • {progress?.speed ?? (isSuccess ? "Sinc" : "0.0")} chk/s
              </div>
            </div>

            {/* Stat 3: Tempo Decorrido (Persistente no Banco) */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 relative overflow-hidden backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Tempo Decorrido</span>
                <Clock className="h-4 w-4 text-purple-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black font-mono text-purple-300">
                  {formatSeconds(elapsedSeconds)}
                </span>
                <span className="text-xs text-slate-500 font-mono">tempo real</span>
              </div>
              <div className="text-[11px] text-purple-400/80 mt-1 font-mono truncate">
                {progress?.started_at || status?.started_at
                  ? `Início: ${new Date(progress?.started_at || status?.started_at!).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`
                  : mode === "incremental"
                  ? "Incremental Rápido"
                  : "Reindexação Completa"}
              </div>
            </div>

            {/* Stat 4: Previsão de Término (ETA) */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 relative overflow-hidden backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Previsão de Término</span>
                <Hourglass className={`h-4 w-4 ${isRunning ? "text-amber-400 animate-spin" : "text-amber-400"}`} />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black font-mono text-amber-300">
                  {isRunning
                    ? progress?.eta_seconds !== undefined && progress.eta_seconds !== null
                      ? progress.eta_seconds === 0
                        ? "Quase lá"
                        : `~${formatSeconds(progress.eta_seconds)}`
                      : "Calculando..."
                    : isSuccess
                    ? "Concluído"
                    : isInterrupted
                    ? "Pausado"
                    : "--:--"}
                </span>
              </div>
              <div className="text-[11px] text-amber-400/80 mt-1 font-mono truncate">
                {isRunning && progress?.eta_iso
                  ? `Término previsto às ${new Date(progress.eta_iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`
                  : isInterrupted
                  ? "Pronto para retomar de onde parou"
                  : isSuccess
                  ? "Todos os arquivos indexados"
                  : progress?.speed_files
                  ? `${progress.speed_files} arq/s`
                  : "Estimando velocidade..."}
              </div>
            </div>
          </div>

          {/* Progress Bar Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                <span>PROGRESSO DA MATRIZ:</span>
                <span className="text-white font-bold">{percent}%</span>
              </span>
              <span className="text-slate-500 truncate max-w-md">
                {progress?.current_file ? (
                  <>
                    <span className="text-slate-400">Arquivo: </span>
                    <span className="text-sky-300 font-semibold">{progress.current_file}</span>
                  </>
                ) : isSuccess ? (
                  <span className="text-emerald-400 font-semibold">Todos os arquivos sincronizados!</span>
                ) : (
                  "Iniciando escaneamento do diretório..."
                )}
              </span>
            </div>

            {/* Barra de Progresso Gradiente */}
            <div className="h-2.5 w-full rounded-full bg-slate-900 border border-slate-800 overflow-hidden p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 shadow-[0_0_12px_rgba(56,189,248,0.7)] transition-all duration-300 ease-out"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {/* Matrix Defrag Section (O "Desfragmentador de Disco Neural") */}
          <div className="relative rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-inner">
            {/* Header da Matriz */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-sky-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Mapa de Setores Vetoriais (Vector Clusters)
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  [{TOTAL_BLOCKS} blocos • escala 1:{Math.ceil((progress?.total_files || 2400) / TOTAL_BLOCKS)}]
                </span>
              </div>

              {/* Legenda de Cores Estilo Defrag */}
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-sm bg-slate-800 border border-slate-700 inline-block" />
                  <span className="text-slate-400">Pendente</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-sm bg-sky-500 shadow-[0_0_8px_#0ea5e9] inline-block animate-pulse" />
                  <span className="text-sky-300">Parsing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-sm bg-amber-400 shadow-[0_0_8px_#f59e0b] inline-block animate-pulse" />
                  <span className="text-amber-300">Embedding</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-sm bg-emerald-500 shadow-[0_0_8px_#10b981] inline-block" />
                  <span className="text-emerald-300">Indexado</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-sm bg-purple-500 shadow-[0_0_8px_#a855f7] inline-block" />
                  <span className="text-purple-300">Cache</span>
                </div>
              </div>
            </div>

            {/* Grid dos Blocos de Desfragmentação */}
            <div className="relative">
              {/* Laser Scanline Beam Effect */}
              {isRunning && (
                <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] opacity-75 animate-[scan_3s_ease-in-out_infinite] z-10" />
              )}

              <div className="grid grid-cols-12 sm:grid-cols-18 md:grid-cols-20 gap-1.5">
                {blocks.map((bState, i) => {
                  let colorClass = "bg-slate-850 border-slate-800/80";
                  let glowClass = "";

                  if (bState === "parsing") {
                    colorClass = "bg-sky-400 border-sky-300 scale-110";
                    glowClass = "shadow-[0_0_12px_#38bdf8] animate-pulse z-10";
                  } else if (bState === "embedding") {
                    colorClass = "bg-amber-400 border-amber-300 scale-115";
                    glowClass = "shadow-[0_0_14px_#fbbf24] animate-pulse z-10";
                  } else if (bState === "indexed") {
                    colorClass = "bg-emerald-500/90 border-emerald-400/80";
                    glowClass = "shadow-[0_0_6px_rgba(16,185,129,0.4)]";
                  } else if (bState === "cached") {
                    colorClass = "bg-purple-500/80 border-purple-400/70";
                    glowClass = "shadow-[0_0_6px_rgba(168,85,247,0.3)]";
                  } else {
                    colorClass = "bg-slate-900 border-slate-800/60 opacity-60";
                  }

                  return (
                    <div
                      key={i}
                      className={`h-4 sm:h-5 rounded-[4px] border transition-all duration-200 ${colorClass} ${glowClass}`}
                      title={`Setor #${i + 1}: ${bState.toUpperCase()}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Rodapé da Matriz */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Zero impacto de GPU: renderizado via aceleração CSS hardware (sem conflito WebGL)</span>
              </div>
              <div>
                Modo: <span className="text-slate-400 font-semibold">{mode.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Banner de Indexação Interrompida (Servidor Reiniciado / Parado) */}
          {isInterrupted && (
            <div className="rounded-2xl border border-amber-500/40 bg-amber-950/25 p-5 backdrop-blur-sm animate-in zoom-in-95">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">Indexação Interrompida</h3>
                      <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-mono text-amber-300 border border-amber-500/30">
                        Checkpoint Preservado
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      O servidor foi desligado ou reiniciado durante o processamento. O checkpoint foi preservado no banco: os arquivos concluídos permanecem no cluster Qdrant e não serão reprocessados.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-4 text-xs font-mono text-amber-300">
                      <div>
                        Arquivos já no índice:{" "}
                        <span className="font-bold text-white">
                          {(progress?.processed ?? 0) + (progress?.skipped ?? 0)}
                        </span>{" "}
                        de <span className="font-bold text-white">{progress?.total_files ?? 0}</span>
                      </div>
                      <div>
                        Arquivos restantes:{" "}
                        <span className="font-bold text-emerald-400">
                          {progress?.remaining_files !== undefined
                            ? progress.remaining_files
                            : Math.max(0, (progress?.total_files ?? 0) - ((progress?.processed ?? 0) + (progress?.skipped ?? 0)))}
                        </span>
                      </div>
                      <div>
                        Tempo acumulado:{" "}
                        <span className="font-bold text-white">{formatSeconds(elapsedSeconds)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {onResume && (
                  <button
                    onClick={onResume}
                    className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-5 py-3 text-xs font-bold transition shadow-[0_0_25px_rgba(16,185,129,0.35)] active:scale-[0.98]"
                  >
                    <Play className="h-4 w-4 fill-white" />
                    <span>Retomar de Onde Parou</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Banner de Sucesso / Conclusão */}
          {isSuccess && (
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-5 backdrop-blur-sm animate-in zoom-in-95 duration-300">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Base Vetorial Sincronizada com Sucesso!</span>
                    <Sparkles className="h-4 w-4 text-emerald-400" />
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Todos os arquivos foram lidos, chunked e os embeddings vetoriais foram consolidados no cluster
                    Qdrant. O Grafo Neural 3D e o Chat RAG estão operando com o índice mais atualizado.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-4 text-xs font-mono text-emerald-300">
                    <div>
                      Arquivos processados:{" "}
                      <span className="font-bold text-white">
                        {(status?.detail as any)?.processed ?? progress?.processed ?? 0}
                      </span>
                    </div>
                    <div>
                      Em cache:{" "}
                      <span className="font-bold text-white">
                        {(status?.detail as any)?.skipped ?? progress?.skipped ?? 0}
                      </span>
                    </div>
                    <div>
                      Chunks gravados:{" "}
                      <span className="font-bold text-white">
                        {(status?.detail as any)?.total_chunks_written ?? progress?.total_chunks ?? 0}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 text-xs font-bold transition shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                >
                  Concluir e Fechar
                </button>
              </div>
            </div>
          )}

          {/* Banner de Erro */}
          {isError && (
            <div className="rounded-2xl border border-rose-500/40 bg-rose-950/20 p-5 backdrop-blur-sm animate-in zoom-in-95">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-400">
                  <X className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white">Falha na Indexação</h3>
                  <p className="text-xs text-rose-300 mt-1 font-mono">
                    {typeof status?.detail === "object" && status?.detail && "error" in status.detail
                      ? String(status.detail.error)
                      : "Ocorreu um erro inesperado durante a indexação."}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-xl bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 text-xs font-semibold transition"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Global CSS Animation for Scanline */}
      <style jsx global>{`
        @keyframes scan {
          0% {
            top: 0%;
            opacity: 0.2;
          }
          50% {
            top: 96%;
            opacity: 0.85;
          }
          100% {
            top: 0%;
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}
