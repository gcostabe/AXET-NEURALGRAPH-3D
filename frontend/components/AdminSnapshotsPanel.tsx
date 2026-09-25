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
} from "lucide-react";
import {
  snapshotsApi,
  SnapshotItem,
  SnapshotStatus,
  DistributionConfig,
  PublishOneDriveResult,
  ApiError,
} from "@/lib/api";

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
      const prompt = encodeURIComponent(
        "Selecione a pasta do OneDrive onde o pacote oficial (.qpack) sera publicado:"
      );
      const res = await fetch(`http://localhost:8765/pick-folder?prompt=${prompt}`);
      const data = await res.json();
      if (data.path) {
        const clean = data.path.trim();
        setOnedrivePathInput(clean);
        // Salva imediatamente no banco de dados
        const saved = await snapshotsApi.updateDistributionConfig(clean);
        setDistConfig(saved);
        setMessage({
          text: `✅ Pasta do OneDrive vinculada com sucesso no Finder: ${clean}`,
          type: "success",
        });
      }
    } catch {
      setMessage({
        text: "Para abrir a janela nativa do Finder, certifique-se de que o assistente local está ativo na porta 8765. Você também pode colar o caminho manualmente no campo abaixo.",
        type: "error",
      });
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Share2 className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-white tracking-wide">
                2. Distribuição da Base Oficial (OneDrive / SharePoint)
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 100% Automático
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
              Vincule a pasta do seu <strong>OneDrive</strong> corporativo abaixo. Ao clicar em{" "}
              <span className="text-indigo-300 font-semibold">&quot;Gerar e Publicar Base Oficial&quot;</span>, o sistema
              cria o pacote criptografado com os vetores e o salva direto no OneDrive. O aplicativo OneDrive do Mac
              faz o upload para o SharePoint automaticamente.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleExportOnly}
              disabled={exporting || publishing}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition flex items-center gap-1.5"
              title="Apenas cria o arquivo localmente sem enviar ao OneDrive"
            >
              {exporting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Database className="w-3.5 h-3.5" />}
              <span>Apenas Gerar Local (.qpack)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main OneDrive Config & 1-Click Publishing Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <Cloud className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Pasta de Publicação do OneDrive</h3>
              <p className="text-[11px] text-slate-400">
                Selecione o diretório do OneDrive no seu computador onde os pacotes para distribuição serão colocados.
              </p>
            </div>
          </div>
          {distConfig.is_configured ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              OneDrive Conectado
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Configure a Pasta no Finder
            </span>
          )}
        </div>

        {/* Directory Picker Row */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
            <span>Caminho Local do OneDrive no Mac:</span>
            <span className="text-[10px] text-slate-500">Ex: /Users/gcostabe/Library/CloudStorage/OneDrive-NTTDATAEMEAL/...</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={onedrivePathInput}
                onChange={(e) => setOnedrivePathInput(e.target.value)}
                placeholder="Nenhuma pasta selecionada. Clique no botão ao lado para abrir o Finder..."
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono transition"
              />
            </div>

            {/* BOTÃO FINDER SOLICITADO PELO USUÁRIO */}
            <button
              onClick={handlePickOneDriveFolder}
              disabled={pickingFolder}
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition shrink-0"
              title="Abre a janela nativa do Finder no Mac para escolher a pasta do OneDrive"
            >
              {pickingFolder ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Abrindo Finder...</span>
                </>
              ) : (
                <>
                  <FolderOpen className="w-4 h-4 text-blue-200" />
                  <span>Escolher Pasta no Finder</span>
                </>
              )}
            </button>

            {onedrivePathInput !== distConfig.onedrive_path && onedrivePathInput.trim().length > 0 && (
              <button
                onClick={handleSaveManualPath}
                disabled={savingConfig}
                className="px-3 py-2.5 rounded-xl font-semibold text-xs text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition shrink-0"
              >
                {savingConfig ? "Salvando..." : "Salvar Caminho"}
              </button>
            )}
          </div>
        </div>

        {/* Master 1-Click Action */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/40 border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <Rocket className="w-4 h-4 text-emerald-400" />
              <span>Publicação de Base Oficial com 1 Clique</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed max-w-2xl">
              Cria o snapshot completo contendo os vetores Qdrant e sinapses neurais, valida o hash criptográfico SHA-256 e grava como{" "}
              <code className="text-blue-300 bg-slate-950/80 px-1 py-0.5 rounded">axet_knowledge_base_latest.qpack</code> diretamente na pasta do OneDrive.
            </p>
          </div>

          <button
            onClick={handlePublishOfficialBase}
            disabled={publishing || exporting}
            className="w-full md:w-auto px-6 py-3 rounded-xl font-extrabold text-xs text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2.5 transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
          >
            {publishing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Empacotando e Publicando no OneDrive...</span>
              </>
            ) : (
              <>
                <CloudUpload className="w-4 h-4 text-emerald-200" />
                <span>Gerar e Publicar Base Oficial no OneDrive</span>
              </>
            )}
          </button>
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
            Nenhum pacote gerado ainda. Clique em &quot;Gerar e Publicar Base Oficial no OneDrive&quot; acima para criar o primeiro.
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
                        {/* Botão de publicar este pacote específico no OneDrive */}
                        <button
                          onClick={() => handlePublishExisting(s.filename)}
                          disabled={publishingFilename === s.filename}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold text-[11px] transition flex items-center gap-1"
                          title="Copia este pacote para a pasta do OneDrive configurada"
                        >
                          {publishingFilename === s.filename ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            <CloudUpload className="w-3 h-3" />
                          )}
                          <span>OneDrive</span>
                        </button>

                        <a
                          href={snapshotsApi.getDownloadUrl(s.filename)}
                          download={s.filename}
                          className="px-2.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 font-semibold text-[11px] transition flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          <span>Baixar</span>
                        </a>

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
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span>Como funciona a distribuição automática da base:</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Escolha da Pasta no Finder</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Você clica no botão <strong>&quot;Escolher Pasta no Finder&quot;</strong> acima. A janela nativa do macOS abre e você seleciona a pasta sincronizada do seu OneDrive da NTT DATA. Isso só precisa ser feito uma única vez.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px]">
                2
              </span>
              <span>1 Clique para Publicar</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Ao clicar em <strong>&quot;Gerar e Publicar Base Oficial&quot;</strong>, o sistema exporta os vetores e o grafo, valida o SHA-256 e grava o arquivo diretamente na pasta do OneDrive. O app OneDrive faz o upload para a nuvem automaticamente.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">
                3
              </span>
              <span>Usuário Sincroniza em 1 Clique</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Os usuários comuns abrem o chat, clicam no botão <strong>&quot;Sincronizar Base&quot;</strong> no cabeçalho e recebem a base 100% pronta em segundos, sem consumir IA nem precisar saber onde os arquivos estão!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
