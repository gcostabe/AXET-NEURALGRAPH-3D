"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  Copy, 
  Check, 
  Bot, 
  User, 
  FileText, 
  ChevronRight, 
  Terminal
} from "lucide-react";

export interface ChatMessage {
  id?: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  created_at?: string;
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
              <div className="flex items-center gap-2 py-1 text-xs text-slate-400">
                <span className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-sky-400 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
                </span>
                <span>Consultando base de conhecimento local e gerando resposta...</span>
              </div>
            ) : null}
          </div>

          {/* Fontes / Citações Consultadas (apenas no Assistente) */}
          {message.sources && message.sources.length > 0 && (
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

          {/* Barra de Ações (Copiar resposta) */}
          {!isUser && message.content && !isStreaming && (
            <div className="flex items-center justify-end gap-2 pt-2 text-slate-400">
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
