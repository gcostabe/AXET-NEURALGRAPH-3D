"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Box,
  CheckCircle2,
  Clock,
  FileText,
  LayoutGrid,
  Network,
  RefreshCw,
  Tag,
  Zap,
  Sparkles,
} from "lucide-react";
import { NeuralGraph3D } from "@/components/NeuralGraph3D";
import { ConflictCuratorModal } from "@/components/ConflictCuratorModal";
import {
  knowledgeApi,
  KnowledgeConflict,
  KnowledgeGraph,
  WatcherStatus,
} from "@/lib/api";

export function KnowledgePanel() {
  const [graph, setGraph] = useState<KnowledgeGraph | null>(null);
  const [conflicts, setConflicts] = useState<KnowledgeConflict[]>([]);
  const [watcher, setWatcher] = useState<WatcherStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"3D" | "CARDS">("3D");
  const [curatingConflict, setCuratingConflict] = useState<KnowledgeConflict | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [g, c, w] = await Promise.all([
        knowledgeApi.getGraph(),
        knowledgeApi.getConflicts(),
        knowledgeApi.getWatcherStatus(),
      ]);
      setGraph(g);
      setConflicts(c);
      setWatcher(w);
    } catch (err) {
      setError((err as Error).message || "Falha ao carregar dados cognitivos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const timer = setInterval(() => {
      knowledgeApi.getWatcherStatus().then(setWatcher).catch(() => {});
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleResolveConflict = async (id: string) => {
    setResolvingId(id);
    try {
      await knowledgeApi.resolveConflict(id);
      setConflicts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, resolved: true } : c)),
      );
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setResolvingId(null);
    }
  };

  const activeConflicts = conflicts.filter((c) => !c.resolved);
  const resolvedConflicts = conflicts.filter((c) => c.resolved);

  return (
    <div className="space-y-6">
      {/* Barra de Status do File Watcher */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                watcher?.is_running
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-amber-500/10 text-amber-500"
              }`}
            >
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">
                  File Watcher em Tempo Real
                </h3>
                {watcher?.is_running ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Monitorando
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    Inativo
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Diretório:{" "}
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">
                  {watcher?.watched_path || "/data/sources_root"}
                </code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="text-right">
              <span className="block font-medium text-foreground">
                {watcher?.total_events_detected ?? 0} eventos
              </span>
              <span>detectados desde o início</span>
            </div>
            {watcher?.last_sync_time && (
              <div className="hidden border-l border-border pl-4 md:block text-right">
                <span className="block font-medium text-foreground">
                  Última sincronização
                </span>
                <span>
                  {new Date(watcher.last_sync_time).toLocaleTimeString()}
                </span>
              </div>
            )}
            <button
              onClick={loadData}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
              />
              Atualizar
            </button>
          </div>
        </div>

        {watcher?.last_event && (
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
            <Activity className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>
              Última alteração detectada:{" "}
              <strong className="text-foreground">
                {watcher.last_event.action.toUpperCase()}
              </strong>{" "}
              em{" "}
              <code className="font-mono text-[11px]">
                {watcher.last_event.path}
              </code>
            </span>
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Seção de Conflitos e Obsolescência */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h3 className="font-semibold text-foreground">
              Conflitos & Obsolescência Normativa
            </h3>
            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
              {activeConflicts.length} ativos
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            Avisos são injetados diretamente no contexto do Chat
          </span>
        </div>

        {activeConflicts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center text-xs text-muted-foreground">
            <CheckCircle2 className="h-8 w-8 text-emerald-500 mb-2 opacity-80" />
            <p className="font-medium text-foreground">
              Nenhuma contradição ou obsolescência ativa
            </p>
            <p className="text-[11px]">
              Os documentos da base estão harmonizados e sem conflitos detectados.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeConflicts.map((conf) => (
              <div
                key={conf.id}
                className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 transition hover:border-amber-500/50"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-2 py-0.5 text-[11px] font-semibold ${
                        conf.conflict_type === "CONTRADICAO"
                          ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                          : conf.conflict_type === "OBSOLESCENCIA"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      }`}
                    >
                      {conf.conflict_type}
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-foreground">
                      <span className="font-medium">{conf.source_path_new}</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {conf.source_path_existing}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCuratingConflict(conf)}
                      className="flex items-center gap-1.5 rounded-lg border border-purple-500/40 bg-purple-500/10 px-3 py-1.5 text-xs font-semibold text-purple-300 hover:bg-purple-500/20 shadow-sm transition"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                      <span>✨ Curadoria com IA</span>
                    </button>
                    <button
                      onClick={() => handleResolveConflict(conf.id)}
                      disabled={resolvingId === conf.id}
                      className="rounded-lg border border-border bg-background/80 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition"
                    >
                      {resolvingId === conf.id ? "Resolvendo..." : "Marcar Manual"}
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-xs text-foreground/90 leading-relaxed">
                  {conf.explanation}
                </p>
              </div>
            ))}
          </div>
        )}

        {resolvedConflicts.length > 0 && (
          <details className="mt-4 pt-3 border-t border-border/60">
            <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
              Ver {resolvedConflicts.length} conflito(s) resolvido(s)
            </summary>
            <div className="mt-2 space-y-2 opacity-80">
              {resolvedConflicts.map((c) => (
                <div
                  key={c.id}
                  className="rounded-lg border border-border/60 bg-muted/30 p-2.5 text-xs flex flex-wrap justify-between items-center gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-foreground">
                      {c.source_path_new} vs {c.source_path_existing}
                    </span>
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      {c.conflict_type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {c.resolution_strategy && (
                      <span className="rounded bg-purple-500/10 px-2 py-0.5 text-[10px] font-semibold text-purple-400 border border-purple-500/20">
                        {c.resolution_strategy === "PREVALENCE_NEW"
                          ? "Prevalência (Doc A)"
                          : c.resolution_strategy === "PREVALENCE_EXISTING"
                          ? "Prevalência (Doc B)"
                          : c.resolution_strategy === "AI_SYNTHESIS"
                          ? "Síntese por IA"
                          : c.resolution_strategy === "UPLOAD_REPLACEMENT"
                          ? "Substituto .md"
                          : c.resolution_strategy}
                      </span>
                    )}
                    <span className="text-emerald-500 font-medium flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Resolvido
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </details>
        )}
      </div>

      {/* Seção de Grafo de Conhecimento e Auto-Resumos */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Network className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">
              Grafo de Conhecimento & Resumos (GraphRAG)
            </h3>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
              {graph?.nodes.length ?? 0} documentos
            </span>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              • {graph?.edges.length ?? 0} conexões semânticas mapeadas
            </span>
          </div>

          {/* Alternador de Visualização: 3D Neural vs Cards */}
          <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/50 p-1">
            <button
              onClick={() => setViewMode("3D")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
                viewMode === "3D"
                  ? "bg-background text-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Box className="h-3.5 w-3.5 text-cyan-500" />
              🧠 3D Neural
            </button>
            <button
              onClick={() => setViewMode("CARDS")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
                viewMode === "CARDS"
                  ? "bg-background text-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              📋 Cards
            </button>
          </div>
        </div>

        {!graph || graph.nodes.length === 0 ? (
          <p className="py-8 text-center text-xs text-muted-foreground">
            Nenhum documento analisado cognitivamente ainda. Adicione arquivos
            .md ou dispare a reindexação.
          </p>
        ) : viewMode === "3D" ? (
          <NeuralGraph3D data={graph} />
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {graph.nodes.map((node) => {
              // Arestas onde este nó é origem ou destino
              const relatedEdges = graph.edges.filter(
                (e) =>
                  e.source_path === node.source_path ||
                  e.target_path === node.source_path,
              );

              return (
                <div
                  key={node.source_path}
                  className="rounded-lg border border-border bg-background/50 p-4 transition hover:border-primary/40 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary shrink-0" />
                        <h4 className="font-medium text-sm text-foreground">
                          {node.title}
                        </h4>
                      </div>
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                        {node.source_path}
                      </code>
                    </div>

                    <p className="mt-2 text-xs text-foreground/85 leading-relaxed">
                      {node.summary}
                    </p>

                    {/* Tópicos */}
                    {node.topics && node.topics.length > 0 && (
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <Tag className="h-3 w-3 text-muted-foreground" />
                        {node.topics.map((topic, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Relações do Grafo deste nó */}
                  {relatedEdges.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-border/60">
                      <span className="block text-[11px] font-semibold text-muted-foreground mb-1.5">
                        Conexões no Grafo:
                      </span>
                      <div className="space-y-1.5">
                        {relatedEdges.map((edge) => {
                          const isSource = edge.source_path === node.source_path;
                          const otherPath = isSource
                            ? edge.target_path
                            : edge.source_path;

                          return (
                            <div
                              key={edge.id}
                              className="rounded bg-muted/30 px-2 py-1.5 text-[11px] flex items-center justify-between gap-2"
                            >
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-primary">
                                  {edge.relation_type}
                                </span>
                                <span className="text-muted-foreground">
                                  {isSource ? "→" : "←"} {otherPath}
                                </span>
                              </div>
                              <span
                                className="text-[10px] text-muted-foreground italic truncate max-w-[180px]"
                                title={edge.description}
                              >
                                {edge.description}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Interativo de Curadoria Normativa com IA */}
      <ConflictCuratorModal
        conflict={curatingConflict}
        onClose={() => setCuratingConflict(null)}
        onResolved={() => {
          loadData();
          setCuratingConflict(null);
        }}
      />
    </div>
  );
}
