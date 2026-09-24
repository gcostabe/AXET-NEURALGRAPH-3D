"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  adminApi,
  FeedbackItem,
  ApiError,
} from "@/lib/api";
import {
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  BookOpen,
  ShieldCheck,
  Award,
  Filter,
} from "lucide-react";

const REASON_LABELS: Record<string, string> = {
  INCORRECT_INFO: "Informação Incorreta / Imprecisa",
  WRONG_DOCS: "Documento Não Encontrado / Incorreto",
  HALLUCINATION_CONFUSING: "Resposta Confusa ou Alucinação",
  OUTDATED_RULE: "Regra Corporativa Desatualizada",
  OTHER: "Outro Motivo",
};

const DIAGNOSIS_BADGES: Record<string, { label: string; color: string }> = {
  FALHA_RECUPERACAO: {
    label: "Falha de Recuperação (Rerank/Chunks)",
    color: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  },
  FALHA_GERACAO: {
    label: "Falha de Geração / Alucinação",
    color: "bg-rose-500/10 text-rose-300 border-rose-500/30",
  },
  LACUNA_BASE: {
    label: "Lacuna na Base (Sem Documento)",
    color: "bg-purple-500/10 text-purple-300 border-purple-500/30",
  },
  REGRA_DESATUALIZADA: {
    label: "Regra Desatualizada / Conflito",
    color: "bg-orange-500/10 text-orange-300 border-orange-500/30",
  },
};

export default function FeedbackAuditPanel() {
  const [allFeedbacks, setAllFeedbacks] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterRating, setFilterRating] = useState<string>("dislike");
  const [filterStatus, setFilterStatus] = useState<string>("active");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal de Par Dourado
  const [goldModalOpen, setGoldModalOpen] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState<FeedbackItem | null>(null);
  const [goldQuestion, setGoldQuestion] = useState("");
  const [goldAnswer, setGoldAnswer] = useState("");
  const [submittingGold, setSubmittingGold] = useState(false);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  async function loadFeedbacks() {
    setLoading(true);
    setError(null);
    try {
      const data = await adminApi.getFeedbacks();
      setAllFeedbacks(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao carregar auditoria de feedbacks.");
    } finally {
      setLoading(false);
    }
  }

  const totalCount = allFeedbacks.length;
  const likesCount = allFeedbacks.filter((f) => f.rating === "like").length;
  const pendingDislikesCount = allFeedbacks.filter(
    (f) =>
      f.rating === "dislike" &&
      f.curation_status !== "GOLD_ANSWER_CREATED" &&
      f.curation_status !== "RESOLVED" &&
      f.curation_status !== "REJECTED",
  ).length;
  const goldCount = allFeedbacks.filter((f) => f.curation_status === "GOLD_ANSWER_CREATED").length;

  const displayedFeedbacks = useMemo(() => {
    return allFeedbacks.filter((f) => {
      if (filterRating && f.rating !== filterRating) return false;
      if (filterStatus === "active") {
        if (
          f.curation_status === "GOLD_ANSWER_CREATED" ||
          f.curation_status === "RESOLVED" ||
          f.curation_status === "REJECTED"
        ) {
          return false;
        }
      } else if (filterStatus && f.curation_status !== filterStatus) {
        return false;
      }
      return true;
    });
  }, [allFeedbacks, filterRating, filterStatus]);

  function openGoldAnswerModal(item: FeedbackItem) {
    setActiveFeedback(item);
    setGoldQuestion(item.user_prompt || "");
    const suggested = item.ai_diagnosis?.suggested_action || item.assistant_response || "";
    setGoldAnswer(
      item.ai_diagnosis?.recommended_rule_title
        ? `### ${item.ai_diagnosis.recommended_rule_title}\n\n${item.assistant_response}`
        : item.assistant_response || "",
    );
    setGoldModalOpen(true);
  }

  async function handleCreateGoldAnswer() {
    if (!activeFeedback || !goldQuestion.trim() || !goldAnswer.trim()) return;
    setSubmittingGold(true);
    setError(null);
    try {
      const res = await adminApi.createGoldAnswer(activeFeedback.id, goldQuestion, goldAnswer);
      setSuccessMsg(res.message || "Par Dourado gerado e indexado com sucesso!");
      setGoldModalOpen(false);
      await loadFeedbacks();
      setTimeout(() => setSuccessMsg(null), 6000);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao criar Resposta Dourada.");
    } finally {
      setSubmittingGold(false);
    }
  }

  async function handleCurateStatus(id: string, status: string, notes?: string) {
    try {
      await adminApi.curateFeedback(id, status, notes);
      setSuccessMsg(`Status do feedback atualizado para: ${status}`);
      loadFeedbacks();
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao atualizar status.");
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Banner Superior & Métricas da Tríade RAG */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 shadow-md">
          <div className="text-xs text-slate-400 font-medium">Feedbacks Registrados</div>
          <div className="text-2xl font-bold text-slate-100 mt-1">{totalCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Interações avaliadas</div>
        </div>

        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 shadow-md">
          <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
            <ThumbsUp className="h-3.5 w-3.5" />
            <span>Útil (Likes)</span>
          </div>
          <div className="text-2xl font-bold text-emerald-300 mt-1">{likesCount}</div>
          <div className="text-[11px] text-emerald-400/80 mt-1">
            {totalCount > 0 ? `${Math.round((likesCount / totalCount) * 100)}% de precisão` : "100% de precisão"}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 shadow-md">
          <div className="text-xs text-rose-400 font-medium flex items-center gap-1.5">
            <ThumbsDown className="h-3.5 w-3.5" />
            <span>Auditoria (Dislikes)</span>
          </div>
          <div className="text-2xl font-bold text-rose-300 mt-1">{pendingDislikesCount}</div>
          <div className="text-[11px] text-rose-400/80 mt-1">
            {pendingDislikesCount === 0 ? "Fila de curadoria limpa!" : "Para curadoria e ajuste"}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 shadow-md">
          <div className="text-xs text-amber-400 font-medium flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5" />
            <span>Pares Dourados (FAQs)</span>
          </div>
          <div className="text-2xl font-bold text-amber-300 mt-1">{goldCount}</div>
          <div className="text-[11px] text-amber-400/80 mt-1">Respostas canônicas Qdrant</div>
        </div>
      </div>

      {/* Alertas */}
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-xs text-rose-300">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-300">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filtros e Barra de Controle */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-slate-800 bg-slate-900/80">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mr-1">
            <Filter className="h-3.5 w-3.5 text-blue-400" />
            Filtros:
          </span>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setFilterRating("dislike")}
              className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                filterRating === "dislike"
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Apenas Dislikes 👎
            </button>
            <button
              onClick={() => setFilterRating("like")}
              className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                filterRating === "like"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Apenas Likes 👍
            </button>
            <button
              onClick={() => setFilterRating("")}
              className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                filterRating === ""
                  ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Todos
            </button>
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="active">Fila Ativa (Pendentes de Curadoria)</option>
            <option value="">Status: Todos (Histórico Completo)</option>
            <option value="PENDING">Novos Pendentes</option>
            <option value="ANALYZED">Analisados pela IA</option>
            <option value="RESOLVED">Resolvidos</option>
            <option value="GOLD_ANSWER_CREATED">Pares Dourados Criados</option>
            <option value="REJECTED">Descartados</option>
          </select>
        </div>

        <button
          onClick={loadFeedbacks}
          disabled={loading}
          className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 transition"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin text-blue-400" : ""}`} />
          <span>Atualizar Fila</span>
        </button>
      </div>

      {/* Lista de Feedbacks */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 text-slate-400 gap-3">
          <RefreshCw className="h-6 w-6 animate-spin text-blue-400" />
          <span className="text-xs">Consultando fila de auditoria e telemetria...</span>
        </div>
      ) : displayedFeedbacks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 rounded-xl border border-dashed border-slate-800 bg-slate-900/30 text-center">
          <ShieldCheck className="h-10 w-10 text-emerald-400/80 mb-2" />
          <div className="text-sm font-semibold text-slate-200">Fila de Curadoria Limpa</div>
          <p className="text-xs text-slate-400 max-w-sm mt-1">
            Nenhum feedback com os filtros selecionados. Usuários avaliam respostas diretamente no chat corporativo.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {displayedFeedbacks.map((fb) => {
            const isDislike = fb.rating === "dislike";
            const isExpanded = expandedId === fb.id;
            const diag = fb.ai_diagnosis;
            const diagInfo = diag?.root_cause ? DIAGNOSIS_BADGES[diag.root_cause] : null;

            return (
              <div
                key={fb.id}
                className={`rounded-xl border transition-all duration-200 ${
                  isDislike
                    ? "border-slate-800 bg-slate-900/70 hover:border-slate-700"
                    : "border-slate-800/60 bg-slate-900/40"
                }`}
              >
                {/* Cabeçalho do Card */}
                <div className="p-4 flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-[280px]">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 mt-0.5 ${
                        isDislike
                          ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      }`}
                    >
                      {isDislike ? <ThumbsDown className="h-4 w-4" /> : <ThumbsUp className="h-4 w-4" />}
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-slate-200">
                          {fb.user_email || "Usuário"}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {new Date(fb.created_at).toLocaleString("pt-BR")}
                        </span>

                        {/* Motivo do Dislike */}
                        {fb.reason && (
                          <span className="rounded px-2 py-0.5 text-[10px] font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                            {REASON_LABELS[fb.reason] || fb.reason}
                          </span>
                        )}

                        {/* Status da Curadoria */}
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-mono uppercase ${
                            fb.curation_status === "GOLD_ANSWER_CREATED"
                              ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                              : fb.curation_status === "RESOLVED"
                              ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                              : "bg-slate-800 text-slate-400 border border-slate-700"
                          }`}
                        >
                          {fb.curation_status}
                        </span>
                      </div>

                      {/* Pergunta do Usuário */}
                      <div className="text-xs font-medium text-slate-300 line-clamp-2 pt-0.5">
                        <span className="text-blue-400 font-semibold">Q: </span>
                        {fb.user_prompt}
                      </div>

                      {/* Comentário do usuário */}
                      {fb.comment && (
                        <div className="text-xs text-amber-300/90 italic bg-amber-500/5 border border-amber-500/15 rounded-lg px-2.5 py-1 mt-1">
                          &ldquo;{fb.comment}&rdquo;
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Ações Rápidas */}
                  <div className="flex items-center gap-2">
                    {fb.curation_status === "GOLD_ANSWER_CREATED" ? (
                      <div className="flex items-center gap-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 text-xs font-semibold text-amber-300 shadow-sm">
                        <Award className="h-3.5 w-3.5 text-amber-400" />
                        <span>Par Dourado Indexado</span>
                      </div>
                    ) : (
                      isDislike && (
                        <button
                          onClick={() => openGoldAnswerModal(fb)}
                          className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-yellow-600 px-3 py-1.5 text-xs font-semibold text-white shadow-md hover:from-amber-500 hover:to-yellow-500 transition"
                        >
                          <Award className="h-3.5 w-3.5" />
                          <span>Criar Par Dourado</span>
                        </button>
                      )
                    )}

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : fb.id)}
                      className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-400 hover:text-white transition"
                    >
                      <span>Detalhes</span>
                      {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Painel Expansível: Contexto & Diagnóstico da IA */}
                {isExpanded && (
                  <div className="border-t border-slate-800 bg-slate-950/60 p-4 space-y-4 animate-in fade-in">
                    {/* Diagnóstico Automático da IA */}
                    {diag && (
                      <div className="rounded-xl border border-blue-500/30 bg-blue-950/20 p-3.5 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                            Diagnóstico Automático da Causa Raiz (IA)
                          </span>
                          {diagInfo && (
                            <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${diagInfo.color}`}>
                              {diagInfo.label}
                            </span>
                          )}
                        </div>

                        {diag.summary && (
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {diag.summary}
                          </p>
                        )}

                        {diag.suggested_action && (
                          <div className="text-[11px] text-cyan-300 font-medium">
                            <span className="text-slate-400">Ação recomendada: </span>
                            {diag.suggested_action}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Resposta do Assistente */}
                    <div className="space-y-1">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                        Resposta Gerada pelo RAG:
                      </div>
                      <div className="text-xs text-slate-200 bg-slate-900/90 border border-slate-800/80 rounded-lg p-3 max-h-48 overflow-y-auto font-mono whitespace-pre-wrap">
                        {fb.assistant_response || "(Sem conteúdo)"}
                      </div>
                    </div>

                    {/* Documentos Consultados */}
                    {fb.sources && (
                      <div className="space-y-1">
                        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                          Fontes Utilizadas no Retrieval:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {Array.isArray(fb.sources) ? (
                            fb.sources.map((s: any, idx: number) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-sky-400 font-mono"
                              >
                                <FileText className="h-3 w-3" />
                                {typeof s === "string" ? s : s.source_path || JSON.stringify(s)}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-slate-400">
                              {JSON.stringify(fb.sources)}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Ações de Curadoria Manual */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                      <div className="text-[11px] text-slate-400">
                        {fb.curator_notes ? `Anotação: ${fb.curator_notes}` : "Sem anotações do curador"}
                      </div>
                      <div className="flex items-center gap-2">
                        {fb.curation_status !== "RESOLVED" && (
                          <button
                            onClick={() => handleCurateStatus(fb.id, "RESOLVED", "Marcado como resolvido pelo curador")}
                            className="flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition"
                          >
                            <Check className="h-3 w-3" />
                            <span>Marcar Resolvido</span>
                          </button>
                        )}
                        {fb.curation_status !== "REJECTED" && (
                          <button
                            onClick={() => handleCurateStatus(fb.id, "REJECTED", "Descartado pelo curador")}
                            className="flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium bg-slate-800 text-slate-400 hover:text-rose-300 transition"
                          >
                            <X className="h-3 w-3" />
                            <span>Descartar</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Criar Par Dourado (FAQ Canônica com Autoridade Máxima) */}
      {goldModalOpen && activeFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-slate-100 font-semibold">
                <Award className="h-5 w-5 text-amber-400" />
                <span>Criar Par Dourado (FAQ Canônica de Alta Precisão)</span>
              </div>
              <button
                onClick={() => setGoldModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200 space-y-1">
              <div className="font-semibold flex items-center gap-1.5 text-amber-300">
                <BookOpen className="h-3.5 w-3.5" />
                Como funciona a Resposta Dourada no RAG Reef:
              </div>
              <p className="text-[11px] leading-relaxed text-amber-200/90">
                Este arquivo será gravado em <code className="font-mono text-white">00. Regras Harmonizadas/</code> e indexado
                imediatamente no Qdrant com pontuação máxima no re-ranker. Dúvidas semelhantes serão respondidas com exatidão de 100%.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Pergunta Canônica de Referência:
                </label>
                <input
                  type="text"
                  value={goldQuestion}
                  onChange={(e) => setGoldQuestion(e.target.value)}
                  placeholder="Ex.: Qual o limite máximo de reembolso para viagens corporativas?"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Resposta Oficial Harmonizada:
                </label>
                <textarea
                  rows={6}
                  value={goldAnswer}
                  onChange={(e) => setGoldAnswer(e.target.value)}
                  placeholder="Redija a resposta definitiva, clara e sem ambiguidades..."
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-xs text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setGoldModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCreateGoldAnswer}
                disabled={submittingGold || !goldQuestion.trim() || !goldAnswer.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-lg hover:from-amber-500 hover:to-yellow-500 transition disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" />
                <span>{submittingGold ? "Gravando e Indexando..." : "Gravar e Indexar no Qdrant"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
