"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  Copy, 
  Check, 
  Bot, 
  User, 
  FileText, 
  ChevronRight, 
  Terminal,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  X,
  Brain,
  Zap,
  GitCommit,
  CheckCircle2,
  Presentation,
  Image as ImageIcon,
  Paperclip,
} from "lucide-react";
import { chatApi, MessageFeedback } from "@/lib/api";

export interface AttachmentMeta {
  name: string;
  type: string;
  data_url?: string;
  pages?: number;
  slides_count?: number;
  total_chars?: number;
}

export interface CognitiveLearningEvent {
  detected: boolean;
  node_id?: string;
  canonical_id?: string;
  concept?: string;
  mistake?: string;
  correction?: string;
  synapse_type?: string;
  created_at?: string;
}

export interface ChatMessage {
  id?: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  created_at?: string;
  feedback?: MessageFeedback | null;
  learning?: CognitiveLearningEvent | null;
  attachments?: AttachmentMeta[] | null;
  statusText?: string;
}

export function isRefusalOrNotFound(text?: string): boolean {
  if (!text) return false;
  const t = text.toLowerCase();
  const refusalMarkers = [
    "não consta na base",
    "não consta no contexto",
    "não consta nos documentos",
    "não constam na base",
    "esta informação não consta",
    "essas informações não constam",
    "não foi possível encontrar",
    "não foram encontradas",
    "não encontrei nenhuma",
    "não encontrei informações",
    "não há informações",
    "não há menção",
    "não possui informações",
    "não realizo buscas na internet",
    "escopo é restrito exclusivamente",
    "não está presente no contexto",
    "não há informação suficiente",
    "não tenho, no contexto",
    "fora do escopo",
    "não localizei na base",
    "não foram localizadas",
    "não constam referências",
    "não temos essa informação",
  ];
  return refusalMarkers.some((m) => t.includes(m));
}

interface ChatMessageItemProps {
  message: ChatMessage;
  userEmail?: string;
  isStreaming?: boolean;
}

export default function ChatMessageItem({
  message,
  userEmail,
  isStreaming = false,
}: ChatMessageItemProps) {
  const [copied, setCopied] = useState(false);
  const [showSources, setShowSources] = useState(true);
  const [feedback, setFeedback] = useState<MessageFeedback | null>(message.feedback || null);
  const [showDislikeModal, setShowDislikeModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string>("INCORRECT_INFO");
  const [feedbackComment, setFeedbackComment] = useState("");
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  useEffect(() => {
    if (message.feedback) {
      setFeedback(message.feedback);
    }
  }, [message.feedback]);

  const isUser = message.role === "user";

  // Formatação de data e hora elegante
  const formatTimestamp = (isoString?: string) => {
    if (!isoString) {
      const now = new Date();
      return `Hoje às ${now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
    }
    try {
      const date = new Date(isoString);
      const now = new Date();
      const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

      const timeStr = date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

      if (isToday) {
        return `Hoje às ${timeStr}`;
      }
      return `${date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })} às ${timeStr}`;
    } catch {
      return "";
    }
  };

  const handleCopyContent = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  // Nome do autor exibido
  const authorName = isUser 
    ? (userEmail ? userEmail.split("@")[0] : "Você")
    : "NTT DATA Assistant";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} animate-in fade-in duration-200`}>
      <div
        className={`flex gap-3 md:gap-3.5 py-4 px-4 md:px-5 rounded-2xl transition-all duration-200 ${
          isUser
            ? "max-w-[85%] md:max-w-2xl bg-gradient-to-br from-blue-950/70 via-slate-900 to-slate-900 border border-blue-500/40 shadow-xl shadow-blue-950/40 rounded-tr-sm ml-auto"
            : "max-w-[92%] md:max-w-3xl bg-slate-900/90 border border-slate-800 shadow-xl shadow-black/30 rounded-2xl rounded-tl-sm mr-auto"
        }`}
      >
        {/* Avatar do Assistente à Esquerda */}
        {!isUser && (
          <div className="flex-shrink-0 pt-0.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white p-1 border border-blue-400/40 shadow-md shadow-blue-500/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/ntt-assistant-avatar.png" 
                alt="NTT DATA Assistant" 
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <Bot className="h-4 w-4 text-[#0072BC] hidden" />
            </div>
          </div>
        )}

        {/* Conteúdo Principal do Card */}
        <div className="flex-1 min-w-0 space-y-1.5">
          {/* Cabeçalho da Mensagem: Autor + Badges + Data/Hora */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-slate-800/60">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-200">
                {authorName}
              </span>
              <span
                className={`rounded px-1.5 py-0.5 text-[10px] font-medium tracking-wide ${
                  isUser
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    : "bg-gradient-to-r from-blue-600/20 to-sky-500/20 text-sky-300 border border-blue-500/30"
                }`}
              >
                {isUser ? "Pergunta" : "RAG Local"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <time className="text-slate-400 select-none">
                {formatTimestamp(message.created_at)}
              </time>
            </div>
          </div>

          {/* Anexos da Mensagem (Imagens e Documentos) */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2 pt-1">
              {message.attachments.map((att, idx) => {
                if (att.type === "image" && att.data_url) {
                  return (
                    <div
                      key={idx}
                      className="group relative overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-md"
                    >
                      <img
                        src={att.data_url}
                        alt={att.name}
                        className="h-20 w-24 object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                      <span className="absolute bottom-0 inset-x-0 bg-slate-950/85 px-1.5 py-0.5 text-[9px] font-mono text-slate-300 truncate">
                        {att.name}
                      </span>
                    </div>
                  );
                }
                const isPdf = att.name.toLowerCase().endsWith(".pdf") || att.type === "pdf";
                const isDocx = att.name.toLowerCase().endsWith(".docx") || att.type === "docx";
                const isPptx = att.name.toLowerCase().endsWith(".pptx") || att.type === "pptx";

                return (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700/80 bg-slate-800/80 px-2.5 py-1.5 text-xs text-slate-200 shadow-sm"
                  >
                    {isPdf && <FileText className="h-4 w-4 text-rose-400 flex-shrink-0" />}
                    {isDocx && <FileText className="h-4 w-4 text-blue-400 flex-shrink-0" />}
                    {isPptx && <Presentation className="h-4 w-4 text-amber-400 flex-shrink-0" />}
                    {!isPdf && !isDocx && !isPptx && <FileText className="h-4 w-4 text-sky-400 flex-shrink-0" />}
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-[11px] truncate max-w-[180px]">{att.name}</span>
                      <span className="text-[9px] text-slate-400 font-mono">
                        {att.pages ? `${att.pages} pág.` : att.slides_count ? `${att.slides_count} slides` : "Documento"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Corpo da Mensagem com Markdown ou Streaming */}
          <div className="text-sm leading-relaxed text-slate-100 prose-chat pt-1">
            {message.content ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || "");
                    const codeText = String(children).replace(/\n$/, "");

                    if (!inline && match) {
                      return (
                        <div className="my-3 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs">
                          <div className="flex items-center justify-between bg-slate-900/90 px-3 py-1.5 text-slate-400 border-b border-slate-800/80">
                            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 uppercase">
                              <Terminal className="h-3.5 w-3.5 text-blue-400" />
                              {match[1]}
                            </span>
                            <button
                              onClick={() => navigator.clipboard.writeText(codeText)}
                              className="flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition"
                            >
                              <Copy className="h-3 w-3" />
                              <span>Copiar</span>
                            </button>
                          </div>
                          <pre className="overflow-x-auto p-3 text-slate-100">
                            <code className={className} {...props}>
                              {children}
                            </code>
                          </pre>
                        </div>
                      );
                    }

                    if (!inline) {
                      return (
                        <pre className="my-2 overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 p-3 font-mono text-xs text-slate-200">
                          <code>{children}</code>
                        </pre>
                      );
                    }

                    return (
                      <code
                        className="rounded bg-slate-800/80 px-1.5 py-0.5 font-mono text-xs text-sky-300 border border-slate-700/50"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            ) : isStreaming ? (
              <div className="flex items-center gap-2.5 py-1.5 text-xs text-slate-300 animate-in fade-in duration-200">
                <span className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-sky-400 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500" />
                </span>
                <span className="font-medium text-sky-200 animate-pulse">
                  {message.statusText || "Pensando sobre a solicitação..."}
                </span>
              </div>
            ) : null}
          </div>

          {/* Card de Aprendizado Ocorrido / Neuroplasticidade Sintética */}
          {message.learning && message.learning.detected && (
            <div className="mt-3 overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-slate-900/60 p-3.5 shadow-lg shadow-amber-950/20 backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between gap-2 border-b border-amber-500/20 pb-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
                    <Brain className="h-3.5 w-3.5 animate-pulse" />
                  </div>
                  <span className="text-xs font-semibold text-amber-300">
                    Aprendizado ocorrido • Nova Sinapse no Grafo Neural
                  </span>
                </div>
                <div className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                  <Zap className="h-2.5 w-2.5" />
                  <span>Prioridade Canônica Ativa</span>
                </div>
              </div>

              <div className="mt-2.5 space-y-1.5 text-xs">
                {message.learning.concept && (
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-semibold text-slate-300">Conceito Retificado:</span>
                    <span className="font-mono text-amber-200">{message.learning.concept}</span>
                  </div>
                )}
                {message.learning.mistake && (
                  <div className="text-slate-400">
                    <span className="font-medium text-rose-300/80">Equívoco Superado: </span>
                    <span className="line-through opacity-70">{message.learning.mistake}</span>
                  </div>
                )}
                {message.learning.correction && (
                  <div className="text-slate-200 bg-slate-900/60 border border-slate-800 rounded-lg p-2 mt-1">
                    <span className="font-semibold text-emerald-400 flex items-center gap-1 mb-0.5">
                      <CheckCircle2 className="h-3 w-3" /> Regra Canônica Consolidada:
                    </span>
                    <span className="text-[11px] leading-relaxed text-slate-300">
                      {message.learning.correction}
                    </span>
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <GitCommit className="h-3 w-3 text-sky-400" />
                    Sinapse: <code className="text-sky-300 font-mono">{message.learning.synapse_type || "RETIFICA_CONCEITO"}</code>
                  </span>
                  {message.learning.canonical_id && (
                    <span>ID: <code className="text-slate-400 font-mono">{message.learning.canonical_id}</code></span>
                  )}
                  <span className="text-amber-400/90 font-medium">⚡ Próximas perguntas utilizarão esta sinapse imediatamente</span>
                </div>
              </div>
            </div>
          )}

          {/* Fontes / Citações Consultadas (apenas no Assistente e quando a informação foi encontrada) */}
          {message.sources && message.sources.length > 0 && !isRefusalOrNotFound(message.content) && (
            <div className="mt-3 pt-3 border-t border-slate-800/60">
              <button
                onClick={() => setShowSources(!showSources)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition mb-2"
              >
                <FileText className="h-3.5 w-3.5 text-blue-400" />
                <span>Documentos consultados ({message.sources.length})</span>
                <ChevronRight
                  className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${
                    showSources ? "rotate-90" : ""
                  }`}
                />
              </button>

              {showSources && (
                <div className="flex flex-wrap gap-1.5 animate-in fade-in duration-150">
                  {message.sources.map((src, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/70 bg-slate-800/60 px-2.5 py-1 text-xs text-slate-300 hover:border-slate-600 transition"
                    >
                      <FileText className="h-3 w-3 text-sky-400 flex-shrink-0" />
                      <span className="font-mono text-[11px] truncate max-w-[240px]">
                        {src}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Barra de Ações (Reações 👍/👎 e Copiar resposta) */}
          {!isUser && message.content && !isStreaming && (
            <div className="pt-2 border-t border-slate-800/60 mt-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-slate-400">
                {/* Reações de Qualidade (Like / Dislike) */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={async () => {
                      if (!message.id) return;
                      try {
                        setFeedback({ rating: "like" });
                        setShowDislikeModal(false);
                        setFeedbackNotice("Obrigado pelo feedback positivo! 👍");
                        setTimeout(() => setFeedbackNotice(null), 3500);
                        await chatApi.sendFeedback(message.id, "like");
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    disabled={!message.id}
                    className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${
                      feedback?.rating === "like"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                        : "hover:bg-slate-800 hover:text-slate-200"
                    } ${!message.id ? "opacity-40 cursor-not-allowed" : ""}`}
                    title="Resposta útil e correta"
                  >
                    <ThumbsUp className={`h-3 w-3 ${feedback?.rating === "like" ? "text-emerald-400 fill-emerald-400/20" : ""}`} />
                    <span>Útil</span>
                  </button>

                  <button
                    onClick={() => setShowDislikeModal((prev) => !prev)}
                    disabled={!message.id}
                    className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${
                      feedback?.rating === "dislike"
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm"
                        : "hover:bg-slate-800 hover:text-slate-200"
                    } ${!message.id ? "opacity-40 cursor-not-allowed" : ""}`}
                    title="Resposta com erro, imprecisão ou desatualizada"
                  >
                    <ThumbsDown className={`h-3 w-3 ${feedback?.rating === "dislike" ? "text-rose-400 fill-rose-400/20" : ""}`} />
                    <span>Incorreto</span>
                  </button>

                  {feedbackNotice && (
                    <span className="text-[10px] text-sky-400 font-medium animate-in fade-in ml-2">
                      {feedbackNotice}
                    </span>
                  )}
                  {feedback?.rating === "dislike" && !feedbackNotice && (
                    <span className="text-[10px] text-amber-400/90 font-mono ml-1 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      Na fila de curadoria
                    </span>
                  )}
                </div>

                {/* Copiar Resposta */}
                <button
                  onClick={handleCopyContent}
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] hover:bg-slate-800 hover:text-slate-200 transition"
                  title="Copiar resposta completa"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copiar resposta</span>
                    </>
                  )}
                </button>
              </div>

              {/* Popover / Painel Inline de Motivo do Dislike */}
              {showDislikeModal && (
                <div className="mt-2.5 p-3 rounded-xl border border-slate-700 bg-slate-950/95 shadow-2xl animate-in fade-in slide-in-from-top-2 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="font-semibold text-slate-200 flex items-center gap-1.5 text-xs">
                      <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      Auditoria RAG: Qual o problema nesta resposta?
                    </span>
                    <button
                      onClick={() => setShowDislikeModal(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="mt-2.5 space-y-2">
                    <div className="text-[11px] text-slate-400">Selecione o motivo principal:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {[
                        { id: "INCORRECT_INFO", label: "Informação Incorreta / Imprecisa" },
                        { id: "WRONG_DOCS", label: "Documento Não Encontrado / Incorreto" },
                        { id: "HALLUCINATION_CONFUSING", label: "Resposta Confusa ou Alucinação" },
                        { id: "OUTDATED_RULE", label: "Regra Corporativa Desatualizada" },
                        { id: "OTHER", label: "Outro Motivo" },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedReason(opt.id)}
                          className={`text-left px-2.5 py-1.5 rounded-lg border text-[11px] transition ${
                            selectedReason === opt.id
                              ? "bg-blue-600/20 border-blue-500 text-blue-200 font-medium"
                              : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>

                    <div className="pt-1">
                      <label className="text-[11px] text-slate-400 block mb-1">
                        Observações ou como deveria ser (opcional):
                      </label>
                      <textarea
                        rows={2}
                        value={feedbackComment}
                        onChange={(e) => setFeedbackComment(e.target.value)}
                        placeholder="Ex.: O limite máximo atualizado é de R$ 50.000 conforme circular de 2026..."
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowDislikeModal(false)}
                        className="px-2.5 py-1 rounded-md text-[11px] text-slate-400 hover:text-white"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (!message.id) return;
                          setSubmittingFeedback(true);
                          try {
                            await chatApi.sendFeedback(message.id, "dislike", selectedReason, feedbackComment);
                            setFeedback({
                              rating: "dislike",
                              reason: selectedReason,
                              comment: feedbackComment,
                            });
                            setShowDislikeModal(false);
                            setFeedbackNotice("Enviado para fila de auditoria & curadoria da IA! 🔍");
                            setTimeout(() => setFeedbackNotice(null), 4000);
                          } catch (err) {
                            console.error(err);
                          } finally {
                            setSubmittingFeedback(false);
                          }
                        }}
                        disabled={submittingFeedback}
                        className="flex items-center gap-1 px-3 py-1 rounded-md text-[11px] font-semibold bg-rose-600 hover:bg-rose-500 text-white transition disabled:opacity-50 shadow-md"
                      >
                        {submittingFeedback ? "Gravando..." : "Enviar à Curadoria"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Avatar do Usuário à Direita */}
        {isUser && (
          <div className="flex-shrink-0 pt-0.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0072BC] to-sky-400 text-white shadow-md">
              <User className="h-4 w-4" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
