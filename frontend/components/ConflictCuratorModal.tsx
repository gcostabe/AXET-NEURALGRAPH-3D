"use client";

import { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  CheckCircle2,
  FileText,
  Upload,
  Layers,
  ArrowRight,
  AlertTriangle,
  Scale,
  RefreshCw,
  Eye,
  Edit3,
} from "lucide-react";
import {
  KnowledgeConflict,
  CuratorSuggestion,
  knowledgeApi,
  ApiError,
} from "@/lib/api";

interface ConflictCuratorModalProps {
  conflict: KnowledgeConflict | null;
  onClose: () => void;
  onResolved: () => void;
}

export function ConflictCuratorModal({
  conflict,
  onClose,
  onResolved,
}: ConflictCuratorModalProps) {
  const [activeTab, setActiveTab] = useState<"prevalence" | "synthesize" | "upload">("synthesize");
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [suggestion, setSuggestion] = useState<CuratorSuggestion | null>(null);

  // Estado da Aba 1 (Prevalência)
  const [selectedWinner, setSelectedWinner] = useState<string>("");
  const [prevalenceReason, setPrevalenceReason] = useState("");

  // Estado da Aba 2 (Síntese)
  const [synthesizeFilename, setSynthesizeFilename] = useState("");
  const [synthesizeMarkdown, setSynthesizeMarkdown] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  // Estado da Aba 3 (Upload)
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  useEffect(() => {
    if (!conflict) return;
    setSelectedWinner(conflict.source_path_new);
    setError(null);
    setSuccessMsg(null);
    setSuggestion(null);
    setUploadFile(null);

    // Carrega sugestão inteligente da IA automaticamente ao abrir
    fetchSuggestion(conflict.id);
  }, [conflict]);

  async function fetchSuggestion(conflictId: string) {
    setLoadingSuggestion(true);
    setError(null);
    try {
      const res = await knowledgeApi.getCuratorSuggestion(conflictId);
      setSuggestion(res);

      // Preenche os campos da aba de síntese
      setSynthesizeFilename(res.draft_filename || "regra-harmonizada.md");
      setSynthesizeMarkdown(res.draft_markdown || "");

      // Ajusta aba inicial com base na recomendação da IA
      if (res.recommended_option === "prevalence_new") {
        setActiveTab("prevalence");
        if (conflict) setSelectedWinner(conflict.source_path_new);
      } else if (res.recommended_option === "prevalence_existing") {
        setActiveTab("prevalence");
        if (conflict) setSelectedWinner(conflict.source_path_existing);
      } else {
        setActiveTab("synthesize");
      }
    } catch (err) {
      console.warn("Falha ao buscar recomendação de IA:", err);
      // Fallback manual padrão
      setSynthesizeFilename(`regra-harmonizada-${conflict?.id.slice(0, 8)}.md`);
      setSynthesizeMarkdown(
        `# Diretriz Harmonizada\n\nResolvendo conflito entre:\n- ${conflict?.source_path_new}\n- ${conflict?.source_path_existing}\n\n## Regra Definitiva\n\n[Insira aqui a diretriz oficial unificada]`
      );
    } finally {
      setLoadingSuggestion(false);
    }
  }

  if (!conflict) return null;

  async function handleResolvePrevalence() {
    if (!selectedWinner) {
      setError("Selecione qual documento deve prevalecer.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await knowledgeApi.resolveWithPrevalence(
        conflict!.id,
        selectedWinner,
        prevalenceReason || "Prevalência normativa definida em curadoria"
      );
      setSuccessMsg("Prevalência aplicada com sucesso! O Grafo de Conhecimento foi atualizado.");
      setTimeout(() => {
        onResolved();
        onClose();
      }, 1500);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao aplicar prevalência.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResolveSynthesize() {
    if (!synthesizeFilename.trim() || !synthesizeMarkdown.trim()) {
      setError("Informe o nome do arquivo e o conteúdo da nova regra.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await knowledgeApi.resolveWithSynthesizedRule(
        conflict!.id,
        synthesizeFilename,
        synthesizeMarkdown
      );
      setSuccessMsg("Nova regra harmonizada publicada e indexada no RAG com sucesso!");
      setTimeout(() => {
        onResolved();
        onClose();
      }, 1500);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao publicar nova regra.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResolveUpload() {
    if (!uploadFile) {
      setError("Selecione um arquivo .md substituto.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await knowledgeApi.resolveWithUpload(conflict!.id, uploadFile);
      setSuccessMsg("Arquivo substituto enviado e indexado no RAG com sucesso!");
      setTimeout(() => {
        onResolved();
        onClose();
      }, 1500);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao enviar arquivo.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Header do Modal */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                Central de Curadoria Normativa com IA
                <span className="rounded-md bg-purple-500/10 px-2 py-0.5 text-[10px] font-semibold text-purple-300 border border-purple-500/20">
                  Resolução Inteligente
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Resolva divergências ou obsolescências elegendo prevalência, sintetizando nova regra ou subindo um .md
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Corpo com Scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Card de Diagnóstico do Conflito */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className={`rounded px-2 py-0.5 text-[11px] font-semibold ${
                  conflict.conflict_type === "CONTRADICAO"
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    : conflict.conflict_type === "OBSOLESCENCIA"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                }`}
              >
                {conflict.conflict_type}
              </span>
              <span className="text-[11px] text-slate-500">
                ID: {conflict.id.slice(0, 8)}...
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-2.5">
                <span className="text-[10px] uppercase font-semibold text-cyan-400 block mb-1">
                  Documento A (Mais Recente):
                </span>
                <span className="font-mono text-slate-300 break-all text-[11px]">
                  {conflict.source_path_new}
                </span>
              </div>
              <div className="rounded-lg border border-slate-800/80 bg-slate-900/60 p-2.5">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">
                  Documento B (Existente na Base):
                </span>
                <span className="font-mono text-slate-300 break-all text-[11px]">
                  {conflict.source_path_existing}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pt-1 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/50">
              <strong className="text-amber-400">Divergência detectada:</strong> {conflict.explanation}
            </p>
          </div>

          {/* Banner de Diagnóstico e Recomendação da IA */}
          <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-4 relative overflow-hidden">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-400 shrink-0" />
                <span className="text-xs font-semibold text-purple-300">
                  Parecer & Recomendação Preditiva da IA
                </span>
              </div>
              <button
                onClick={() => fetchSuggestion(conflict.id)}
                disabled={loadingSuggestion}
                title="Reconsultar IA para nova análise"
                className="flex items-center gap-1 text-[11px] text-purple-400 hover:text-purple-200 transition"
              >
                <RefreshCw className={`h-3 w-3 ${loadingSuggestion ? "animate-spin" : ""}`} />
                <span>Atualizar Parecer</span>
              </button>
            </div>

            {loadingSuggestion ? (
              <div className="py-4 flex items-center justify-center gap-2 text-xs text-purple-300/80">
                <RefreshCw className="h-4 w-4 animate-spin text-purple-400" />
                <span>A IA está analisando a hierarquia normativa dos documentos...</span>
              </div>
            ) : suggestion ? (
              <div className="mt-2.5 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Estratégia Recomendada:</span>
                  <span className="font-semibold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/30">
                    {suggestion.recommended_option === "prevalence_new"
                      ? "Prevalência do Documento A (Mais Recente)"
                      : suggestion.recommended_option === "prevalence_existing"
                      ? "Prevalência do Documento B (Existente)"
                      : "Síntese de Nova Regra Harmonizada"}
                  </span>
                </div>
                <p className="text-slate-300/90 leading-relaxed text-[11px]">
                  {suggestion.analysis}
                </p>
              </div>
            ) : null}
          </div>

          {/* Seletor de Abas de Ação */}
          <div>
            <div className="flex border-b border-slate-800">
              <button
                onClick={() => setActiveTab("prevalence")}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition ${
                  activeTab === "prevalence"
                    ? "border-cyan-400 text-cyan-300 bg-cyan-500/5"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Scale className="h-3.5 w-3.5" />
                Opção 1: Escolher Prevalência (1 ou Outro)
              </button>
              <button
                onClick={() => setActiveTab("synthesize")}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition ${
                  activeTab === "synthesize"
                    ? "border-purple-400 text-purple-300 bg-purple-500/5"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Opção 2: Sintetizar Nova Regra (IA)
              </button>
              <button
                onClick={() => setActiveTab("upload")}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition ${
                  activeTab === "upload"
                    ? "border-emerald-400 text-emerald-300 bg-emerald-500/5"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Upload className="h-3.5 w-3.5" />
                Opção 3: Subir Novo .md
              </button>
            </div>

            {/* Conteúdo da Aba 1: Prevalência */}
            {activeTab === "prevalence" && (
              <div className="pt-4 space-y-4">
                <p className="text-xs text-slate-400">
                  Escolha qual documento deve prevalecer como a regra oficial vigente. O documento preterido receberá a relação <code className="text-rose-400">SUBSTITUI</code> no Grafo de Conhecimento e suas regras conflitantes serão revogadas no RAG.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Opção Doc A */}
                  <div
                    onClick={() => setSelectedWinner(conflict.source_path_new)}
                    className={`cursor-pointer rounded-xl border p-4 transition ${
                      selectedWinner === conflict.source_path_new
                        ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-950/30 ring-1 ring-cyan-500/50"
                        : "border-slate-800 bg-slate-950/40 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-xs text-cyan-300">
                        Eleger Documento A (Novo)
                      </span>
                      <input
                        type="radio"
                        checked={selectedWinner === conflict.source_path_new}
                        onChange={() => setSelectedWinner(conflict.source_path_new)}
                        className="text-cyan-500 focus:ring-cyan-500"
                      />
                    </div>
                    <div className="font-mono text-[11px] text-slate-300 break-all mb-2">
                      {conflict.source_path_new}
                    </div>
                    <span className="text-[10px] text-slate-400 block">
                      Define este documento como a diretriz definitiva mais recente.
                    </span>
                  </div>

                  {/* Opção Doc B */}
                  <div
                    onClick={() => setSelectedWinner(conflict.source_path_existing)}
                    className={`cursor-pointer rounded-xl border p-4 transition ${
                      selectedWinner === conflict.source_path_existing
                        ? "border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-950/30 ring-1 ring-cyan-500/50"
                        : "border-slate-800 bg-slate-950/40 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-xs text-slate-200">
                        Eleger Documento B (Existente)
                      </span>
                      <input
                        type="radio"
                        checked={selectedWinner === conflict.source_path_existing}
                        onChange={() => setSelectedWinner(conflict.source_path_existing)}
                        className="text-cyan-500 focus:ring-cyan-500"
                      />
                    </div>
                    <div className="font-mono text-[11px] text-slate-300 break-all mb-2">
                      {conflict.source_path_existing}
                    </div>
                    <span className="text-[10px] text-slate-400 block">
                      Mantém a diretriz existente na base, revogando as alterações do novo.
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Justificativa Normativa (opcional):
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Decisão do comitê de arquitetura conforme padrão 2026..."
                    value={prevalenceReason}
                    onChange={(e) => setPrevalenceReason(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleResolvePrevalence}
                    disabled={submitting || !selectedWinner}
                    className="flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-xs font-semibold text-white shadow-lg hover:bg-cyan-500 disabled:opacity-50 transition"
                  >
                    {submitting ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                    <span>Aplicar Prevalência no Grafo</span>
                  </button>
                </div>
              </div>
            )}

            {/* Conteúdo da Aba 2: Síntese de Nova Regra */}
            {activeTab === "synthesize" && (
              <div className="pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400">
                    A IA unificou as regras em uma minuta Markdown completa. Você pode revisar, editar ou aceitar a minuta antes da publicação definitiva na base.
                  </p>
                  <div className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-950 p-1">
                    <button
                      type="button"
                      onClick={() => setPreviewMode(false)}
                      className={`flex items-center gap-1 rounded px-2 py-1 text-[11px] font-medium transition ${
                        !previewMode
                          ? "bg-purple-600 text-white"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Edit3 className="h-3 w-3" />
                      Editor
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewMode(true)}
                      className={`flex items-center gap-1 rounded px-2 py-1 text-[11px] font-medium transition ${
                        previewMode
                          ? "bg-purple-600 text-white"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Eye className="h-3 w-3" />
                      Pré-visualizar
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Nome do Arquivo .md da Nova Regra (salvo em <code className="text-purple-300">00. Regras Harmonizadas/</code>):
                  </label>
                  <input
                    type="text"
                    value={synthesizeFilename}
                    onChange={(e) => setSynthesizeFilename(e.target.value)}
                    placeholder="ex: diretriz-harmonizada-seguranca.md"
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-slate-200 outline-none focus:border-purple-500"
                  />
                </div>

                {!previewMode ? (
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Minuta da Regra Harmonizada (Markdown):
                    </label>
                    <textarea
                      rows={12}
                      value={synthesizeMarkdown}
                      onChange={(e) => setSynthesizeMarkdown(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 font-mono text-xs text-slate-200 outline-none focus:border-purple-500"
                    />
                  </div>
                ) : (
                  <div className="max-h-[300px] overflow-y-auto rounded-xl border border-slate-700 bg-slate-950/80 p-4 text-xs text-slate-200 space-y-2 prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-xs">
                      {synthesizeMarkdown}
                    </pre>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-500">
                    O documento será automaticamente indexado no Qdrant e vinculado como <code className="text-purple-400">SUBSTITUI</code> para ambos os documentos.
                  </span>
                  <button
                    onClick={handleResolveSynthesize}
                    disabled={submitting || !synthesizeFilename || !synthesizeMarkdown}
                    className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-semibold text-white shadow-lg hover:bg-purple-500 disabled:opacity-50 transition"
                  >
                    {submitting ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                    <span>Aprovar & Publicar Nova Regra</span>
                  </button>
                </div>
              </div>
            )}

            {/* Conteúdo da Aba 3: Upload de Novo .md */}
            {activeTab === "upload" && (
              <div className="pt-4 space-y-4">
                <p className="text-xs text-slate-400">
                  Suba um documento retificador oficial que substitua a redação de ambos os documentos anteriores.
                </p>

                <div className="rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/40 p-6 text-center hover:border-emerald-500/50 transition">
                  <Upload className="mx-auto h-8 w-8 text-emerald-400/80 mb-2" />
                  <label className="cursor-pointer">
                    <span className="rounded-lg bg-emerald-600/20 px-3 py-1.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition">
                      Selecionar arquivo .md
                    </span>
                    <input
                      type="file"
                      accept=".md"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setUploadFile(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                  <p className="mt-2 text-[11px] text-slate-500">
                    {uploadFile
                      ? `Arquivo selecionado: ${uploadFile.name} (${(uploadFile.size / 1024).toFixed(1)} KB)`
                      : "Apenas arquivos Markdown (.md)"}
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleResolveUpload}
                    disabled={submitting || !uploadFile}
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-lg hover:bg-emerald-500 disabled:opacity-50 transition"
                  >
                    {submitting ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                    <span>Fazer Upload e Substituir Conflito</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mensagens de Erro ou Sucesso */}
          {error && (
            <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
