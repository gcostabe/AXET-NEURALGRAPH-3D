"use client";

import { useEffect, useState } from "react";
import RequireAuth from "@/components/RequireAuth";
import AppHeader from "@/components/AppHeader";
import { NeuralGraph3D } from "@/components/NeuralGraph3D";
import { knowledgeApi, KnowledgeGraph } from "@/lib/api";
import { Network, RefreshCw, AlertCircle } from "lucide-react";

function GraphVisualPage() {
  const [graph, setGraph] = useState<KnowledgeGraph | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadGraph = async () => {
    setLoading(true);
    setError(null);
    try {
      const g = await knowledgeApi.getGraph();
      setGraph(g);
    } catch (err) {
      setError((err as Error).message || "Falha ao carregar o grafo de conhecimento.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGraph();
  }, []);

  return (
    <main className="flex h-screen flex-col bg-[#040814] text-slate-100 overflow-hidden select-none">
      {/* Header Corporativo */}
      <AppHeader />

      {/* Conteúdo Principal do Grafo */}
      <div className="flex-1 relative flex flex-col overflow-hidden px-1 pb-1 pt-0.5 sm:px-1.5 sm:pb-1.5 sm:pt-0.5">
        {loading ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3">
            <RefreshCw className="h-8 w-8 text-cyan-400 animate-spin" />
            <span className="text-xs font-mono text-cyan-300/80 tracking-wide">
              Carregando universo neural de conhecimento...
            </span>
          </div>
        ) : error ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
            <AlertCircle className="h-10 w-10 text-rose-500" />
            <h3 className="text-sm font-semibold text-rose-400">Erro ao carregar grafo</h3>
            <p className="text-xs text-slate-400 max-w-md">{error}</p>
            <button
              onClick={loadGraph}
              className="mt-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 transition"
            >
              Tentar Novamente
            </button>
          </div>
        ) : graph && graph.nodes.length > 0 ? (
          <div className="h-full w-full relative flex-1">
            <NeuralGraph3D data={graph} />
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <Network className="h-10 w-10 text-slate-600" />
            <h3 className="text-sm font-semibold text-slate-300">Nenhum nó disponível</h3>
            <p className="text-xs text-slate-500 max-w-sm">
              Os documentos ainda estão sendo processados ou não foram indexados no grafo.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function GraphPage() {
  return (
    <RequireAuth>
      <GraphVisualPage />
    </RequireAuth>
  );
}
