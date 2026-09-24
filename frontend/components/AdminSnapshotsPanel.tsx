"use client";

import React, { useState, useEffect } from "react";
import { snapshotsApi, SnapshotItem, SnapshotStatus } from "@/lib/api";

export default function AdminSnapshotsPanel() {
  const [snapshots, setSnapshots] = useState<SnapshotItem[]>([]);
  const [status, setStatus] = useState<SnapshotStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    setMessage(null);
    try {
      const [snapList, statusData] = await Promise.all([
        snapshotsApi.listAdminSnapshots(),
        snapshotsApi.getStatus(),
      ]);
      setSnapshots(snapList);
      setStatus(statusData);
    } catch (err: any) {
      setMessage({ text: err.message || "Erro ao carregar dados de snapshots.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  async function handleExport() {
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">📦</span>
            <h2 className="text-base font-bold text-white tracking-wide">
              Distribuição Segura de Base de Conhecimento (Opção 1)
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Qdrant Snapshots + SHA-256
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Exporte pacotes binários compactados (.qpack) contendo os vetores e sinapses do cérebro neural. Os usuários restauram em <code>localhost</code> sem consumir quota de embeddings e sem vazamento de dados.
          </p>
        </div>

        <button
          onClick={handleExport}
          disabled={exporting}
          className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all shrink-0"
        >
          {exporting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Gerando Snapshot & SHA-256...</span>
            </>
          ) : (
            <>
              <span>🚀</span>
              <span>Gerar Novo Pacote (.qpack)</span>
            </>
          )}
        </button>
      </div>

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
              <span className={`w-2.5 h-2.5 rounded-full ${status.status === "green" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
              <span className="capitalize">{status.status}</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Dimensão: {status.vector_size || 1536}d</div>
          </div>
        </div>
      )}

      {/* Feedback Message */}
      {message && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-center justify-between gap-2 ${
            message.type === "success"
              ? "bg-emerald-950/40 border border-emerald-500/40 text-emerald-300"
              : "bg-red-950/40 border border-red-500/40 text-red-300"
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Snapshots Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>🗄️</span>
            <span>Histórico de Pacotes e Snapshots Disponíveis ({snapshots.length})</span>
          </h3>
          <button
            onClick={loadData}
            disabled={loading}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
          >
            🔄 {loading ? "Carregando..." : "Atualizar Lista"}
          </button>
        </div>

        {snapshots.length === 0 ? (
          <div className="p-10 text-center text-slate-500 text-xs">
            Nenhum pacote de snapshot gerado ainda. Clique em &quot;Gerar Novo Pacote (.qpack)&quot; acima para criar o primeiro.
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
                      <div className="flex items-center gap-2">
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
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-200">
                      {s.size_mb} MB
                    </td>
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
                            {copiedHash === s.sha256 ? "✓" : "📋"}
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
                          className="px-2.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 font-semibold text-[11px] transition flex items-center gap-1"
                        >
                          <span>⬇️</span>
                          <span>Baixar</span>
                        </a>
                        <button
                          onClick={() => handleDelete(s.filename)}
                          className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition"
                          title="Excluir arquivo"
                        >
                          🗑️
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

      {/* Instruction Card for Admin */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2">
        <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
          <span>💡</span>
          <span>Como Distribuir a Base aos Usuários (Fluxo Seguro):</span>
        </h4>
        <ol className="list-decimal list-inside space-y-1 text-[11px] pl-1">
          <li>Indexe os novos documentos <code>.md</code> normalmente no menu &quot;Fontes &amp; Ingestão&quot;.</li>
          <li>Clique no botão <strong>&quot;Gerar Novo Pacote (.qpack)&quot;</strong> acima.</li>
          <li>Baixe o arquivo <code>.qpack</code> gerado e copie o hash SHA-256.</li>
          <li>Disponibilize o arquivo no SharePoint corporativo, Azure Blob Storage interno ou pasta de rede local da NTT DATA.</li>
          <li>Os usuários clicam em <strong>&quot;📦 Base Local&quot;</strong> no cabeçalho ou colocam o arquivo na pasta <code>data/snapshots/</code> para restaurar instantaneamente.</li>
        </ol>
      </div>
    </div>
  );
}
