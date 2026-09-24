"use client";

import { useEffect, useState, useRef } from "react";
import {
  Video,
  Eye,
  Mic,
  Settings,
  Play,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Clock,
  HardDrive,
  FileText,
  Sparkles,
  Sliders,
  Layers,
  Terminal,
  Activity,
} from "lucide-react";
import {
  adminApi,
  VideoSettings,
  VideoItem,
  VideoJobStatus,
  ApiError,
} from "@/lib/api";

export default function VideoProcessorPanel() {
  const [settings, setSettings] = useState<VideoSettings>({
    mode: "multimodal_ocr",
    frame_interval_seconds: 10,
    whisper_model: "small",
    language: "es",
    max_frames: 30,
  });
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [jobStatus, setJobStatus] = useState<VideoJobStatus | null>(null);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [triggeringVideo, setTriggeringVideo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [filterPendingOnly, setFilterPendingOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const logsEndRef = useRef<HTMLDivElement>(null);

  async function loadData() {
    setError(null);
    try {
      const [cfg, vids, status] = await Promise.all([
        adminApi.getVideoSettings(),
        adminApi.listVideos(),
        adminApi.getVideoStatus(),
      ]);
      setSettings(cfg);
      setVideos(vids);
      setJobStatus(status);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao carregar dados de vídeo.");
    }
  }

  async function refreshVideos() {
    setLoadingVideos(true);
    try {
      const vids = await adminApi.listVideos();
      setVideos(vids);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao atualizar lista de vídeos.");
    } finally {
      setLoadingVideos(false);
    }
  }

  async function refreshStatus() {
    try {
      const status = await adminApi.getVideoStatus();
      setJobStatus(status);
    } catch {
      // informativo
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // Polling quando houver job ativo
  useEffect(() => {
    if (jobStatus?.status === "running") {
      const interval = setInterval(async () => {
        await refreshStatus();
        await refreshVideos();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [jobStatus?.status]);

  // Auto-scroll nos logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollTop = logsEndRef.current.scrollHeight;
    }
  }, [jobStatus?.logs]);

  async function handleSaveSettings() {
    setSavingSettings(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const updated = await adminApi.updateVideoSettings(settings);
      setSettings(updated);
      setSuccessMsg("Configurações de vídeo salvas com sucesso!");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao salvar configurações de vídeo.");
    } finally {
      setSavingSettings(false);
    }
  }

  async function handleProcessVideo(videoRelPath: string, modeOverride?: string) {
    setTriggeringVideo(videoRelPath);
    setError(null);
    setSuccessMsg(null);
    try {
      await adminApi.processVideo(videoRelPath, modeOverride);
      setSuccessMsg(`Processamento iniciado para: ${videoRelPath.split("/").pop()}`);
      setTimeout(refreshStatus, 1000);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao disparar processamento do vídeo.");
    } finally {
      setTriggeringVideo(null);
    }
  }

  const filteredVideos = videos.filter((v) => {
    if (filterPendingOnly && v.has_markdown) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return v.name.toLowerCase().includes(q) || v.parent_dir.toLowerCase().includes(q);
    }
    return true;
  });

  const totalVideos = videos.length;
  const processedVideos = videos.filter((v) => v.has_markdown).length;
  const pendingVideos = totalVideos - processedVideos;

  return (
    <div className="space-y-6 text-slate-100">
      {/* Alertas */}
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

      {/* Banner Superior & Métricas */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/20 p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                <Video className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold tracking-tight">
                Processamento Multimodal de Gravações & Vídeos
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              Transforme sessões gravadas do REEF/TRON em documentações ricas em Markdown.
              Escolha se a IA deve analisar apenas a fala ou também capturar telas, tabelas e botões via OCR e visão computacional.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={refreshVideos}
              disabled={loadingVideos}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-medium transition"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loadingVideos ? "animate-spin" : ""}`} />
              <span>Atualizar Vídeos</span>
            </button>
          </div>
        </div>

        {/* Mini Cards de Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total de Vídeos</div>
            <div className="text-xl font-bold text-slate-100 mt-1">{totalVideos}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Detectados no diretório de fontes</div>
          </div>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5">
            <div className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">Documentados (.md)</div>
            <div className="text-xl font-bold text-emerald-300 mt-1">{processedVideos}</div>
            <div className="text-[10px] text-emerald-500/70 mt-0.5">Indexados na base do RAG</div>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3.5">
            <div className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">Pendentes</div>
            <div className="text-xl font-bold text-amber-300 mt-1">{pendingVideos}</div>
            <div className="text-[10px] text-amber-500/70 mt-0.5">Aguardando geração de relatório</div>
          </div>
        </div>
      </div>

      {/* CHAVE DE SELEÇÃO EM CONFIGURAÇÕES (MODALIDADE DE PROCESSAMENTO) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-slate-200">
              Chave de Seleção: Modalidade de Processamento do Vídeo
            </h3>
          </div>
          <button
            onClick={handleSaveSettings}
            disabled={savingSettings}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition shadow-lg shadow-blue-600/20"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{savingSettings ? "Salvando..." : "Salvar Configuração"}</span>
          </button>
        </div>

        {/* Seletor de Modo (Opção 2 vs Apenas Áudio) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Opção 2: COM OCR + Visão Multimodal */}
          <div
            onClick={() => setSettings({ ...settings, mode: "multimodal_ocr" })}
            className={`cursor-pointer rounded-xl border p-4.5 transition relative flex flex-col justify-between ${
              settings.mode === "multimodal_ocr"
                ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500"
                : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
            }`}
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${settings.mode === "multimodal_ocr" ? "bg-blue-500 text-white" : "bg-slate-800 text-slate-400"}`}>
                    <Eye className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">
                      Com OCR + Visão Multimodal + LLM
                    </h4>
                    <span className="text-[10px] text-blue-400 font-semibold">Opção 2 (Recomendado)</span>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${settings.mode === "multimodal_ocr" ? "border-blue-500 bg-blue-500" : "border-slate-600"}`}>
                  {settings.mode === "multimodal_ocr" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Extrai frames sequenciais da tela via <span className="text-blue-300 font-mono text-[11px]">ffmpeg</span> e utiliza a LLM multimodal para realizar <strong>leitura visual e OCR</strong>.
              </p>

              <div className="rounded-lg border border-blue-500/20 bg-blue-950/30 p-2.5 text-[11px] text-slate-300 space-y-1">
                <div className="font-semibold text-blue-300 flex items-center gap-1.5">
                  <Layers className="h-3 w-3" />
                  <span>O que é capturado a mais:</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-slate-400 text-[10px]">
                  <li>Nomes de campos de tela, botões e abas navegadas sem menção oral.</li>
                  <li>Tabelas, grids de dados e valores inseridos em formulários.</li>
                  <li>Mensagens de erro em tela, validações e diagramas de fluxo.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Opção Tradicional: SEM OCR (Apenas Áudio) */}
          <div
            onClick={() => setSettings({ ...settings, mode: "audio_only" })}
            className={`cursor-pointer rounded-xl border p-4.5 transition relative flex flex-col justify-between ${
              settings.mode === "audio_only"
                ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500"
                : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
            }`}
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${settings.mode === "audio_only" ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-400"}`}>
                    <Mic className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">
                      Sem OCR (Apenas Áudio + LLM)
                    </h4>
                    <span className="text-[10px] text-amber-400 font-semibold">Modo Convencional</span>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${settings.mode === "audio_only" ? "border-amber-500 bg-amber-500" : "border-slate-600"}`}>
                  {settings.mode === "audio_only" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Processa exclusivamente a faixa sonora via <strong>Whisper ASR</strong>. A LLM resume apenas o conteúdo falado pelo apresentador.
              </p>

              <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-2.5 text-[11px] text-slate-400 space-y-1">
                <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  <span>Características deste modo:</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-slate-400 text-[10px]">
                  <li>Processamento mais rápido e menor consumo de tokens de contexto.</li>
                  <li>Não captura telas de demonstração onde o instrutor não fala em voz alta.</li>
                  <li>Vulnerável a silêncio ou alucinação do Whisper em áudios com ruído.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Parâmetros Avançados de Amostragem */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-4 space-y-3">
          <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Sliders className="h-3.5 w-3.5 text-slate-400" />
            <span>Parâmetros de Amostragem e IA</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">
                Intervalo entre frames de tela:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={3}
                  max={60}
                  value={settings.frame_interval_seconds}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      frame_interval_seconds: Math.max(2, parseInt(e.target.value) || 10),
                    })
                  }
                  className="w-20 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-100 focus:border-blue-500 focus:outline-none"
                />
                <span className="text-xs text-slate-400">segundos</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">
                Padrão: 1 frame a cada 10s
              </span>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">
                Idioma de fala predominante:
              </label>
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-100 focus:border-blue-500 focus:outline-none"
              >
                <option value="es">Espanhol (es) — Padrão REEF</option>
                <option value="pt">Português (pt)</option>
                <option value="en">Inglês (en)</option>
                <option value="auto">Auto-detectar</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">
                Modelo Whisper (Transcrição):
              </label>
              <select
                value={settings.whisper_model}
                onChange={(e) => setSettings({ ...settings, whisper_model: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-100 focus:border-blue-500 focus:outline-none"
              >
                <option value="small">Small (Equilibrado / Padrão)</option>
                <option value="base">Base (Rápido)</option>
                <option value="tiny">Tiny (Ultraleve)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* MONITOR DE EXECUÇÃO EM TEMPO REAL (TERMINAL HUD) */}
      {jobStatus && jobStatus.status !== "idle" && (
        <div className="rounded-2xl border border-blue-500/30 bg-slate-950 p-6 space-y-4 shadow-xl shadow-blue-500/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-400 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-100">
                Progresso do Processamento em Tempo Real
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                jobStatus.status === "running"
                  ? "border-blue-500/40 bg-blue-500/20 text-blue-300 animate-pulse"
                  : jobStatus.status === "completed"
                  ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-300"
                  : "border-rose-500/40 bg-rose-500/20 text-rose-300"
              }`}>
                {jobStatus.status === "running" ? "Processando..." : jobStatus.status === "completed" ? "Concluído" : "Falhou"}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-300 font-mono">
              <span className="truncate max-w-md">
                Vídeo: <strong>{jobStatus.current_video || "Nenhum"}</strong>
              </span>
              <span className="font-bold text-blue-400">{jobStatus.progress}%</span>
            </div>

            {/* Barra de Progresso Fluida */}
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 transition-all duration-500 ease-out"
                style={{ width: `${jobStatus.progress}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Etapa: <span className="text-slate-200">{jobStatus.detail || "Iniciando..."}</span>
            </div>
          </div>

          {/* Terminal de Logs */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-1.5">
              <div className="flex items-center gap-1.5">
                <Terminal className="h-3 w-3 text-slate-400" />
                <span className="font-mono font-semibold">Console de Ingestão Multimodal</span>
              </div>
              <span className="text-[10px] text-slate-500">Auto-scroll ativo</span>
            </div>

            <div
              ref={logsEndRef}
              className="max-h-48 overflow-y-auto font-mono text-[11px] text-slate-300 space-y-1 pr-2"
            >
              {jobStatus.logs && jobStatus.logs.length > 0 ? (
                jobStatus.logs.map((lg, i) => (
                  <div key={i} className="text-slate-300">
                    <span className="text-blue-400 mr-1.5">❯</span>
                    {lg}
                  </div>
                ))
              ) : (
                <div className="text-slate-500 italic">Aguardando primeiras mensagens do motor de vídeo...</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LISTA DE VÍDEOS DETECTADOS NAS FONTES */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-blue-400" />
              <span>Vídeos nas Pastas de Fontes ({filteredVideos.length})</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Arquivos .mp4 identificados no diretório atual de fontes do RAG
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Filtrar por nome ou pasta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none w-52"
            />
            <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filterPendingOnly}
                onChange={(e) => setFilterPendingOnly(e.target.checked)}
                className="rounded border-slate-700 bg-slate-950 text-blue-500 focus:ring-0"
              />
              <span>Apenas pendentes</span>
            </label>
          </div>
        </div>

        {/* Tabela de Vídeos */}
        {filteredVideos.length === 0 ? (
          <div className="text-center py-10 text-xs text-slate-500">
            Nenhum arquivo de vídeo encontrado com os filtros atuais.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Vídeo</th>
                  <th className="py-2.5 px-3">Subpasta</th>
                  <th className="py-2.5 px-3">Tamanho</th>
                  <th className="py-2.5 px-3">Status .MD</th>
                  <th className="py-2.5 px-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredVideos.map((vid) => {
                  const isBusy = triggeringVideo === vid.relative_path || (jobStatus?.status === "running" && jobStatus.current_video === vid.name);
                  return (
                    <tr key={vid.relative_path} className="hover:bg-slate-800/30 transition">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4 text-blue-400 shrink-0" />
                          <span className="font-sans font-medium text-slate-200 truncate max-w-xs" title={vid.name}>
                            {vid.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-400 text-[11px] truncate max-w-[200px]" title={vid.parent_dir}>
                        {vid.parent_dir || "."}
                      </td>
                      <td className="py-3 px-3 text-slate-400 text-[11px]">
                        {vid.size_mb} MB
                      </td>
                      <td className="py-3 px-3">
                        {vid.has_markdown ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>Documentado ({vid.markdown_files.length})</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                            <Clock className="h-3 w-3" />
                            <span>Pendente</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => handleProcessVideo(vid.relative_path)}
                          disabled={isBusy || jobStatus?.status === "running"}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                            vid.has_markdown
                              ? "border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300"
                              : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          <Play className="h-3 w-3" />
                          <span>{isBusy ? "Iniciando..." : vid.has_markdown ? "Reprocessar" : "Gerar .MD"}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
