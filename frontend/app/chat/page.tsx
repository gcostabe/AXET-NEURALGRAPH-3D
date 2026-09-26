"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import RequireAuth from "@/components/RequireAuth";
import AppHeader from "@/components/AppHeader";
import ChatMessageItem, { ChatMessage, AttachmentMeta } from "@/components/ChatMessageItem";
import ChatWelcomeScreen from "@/components/ChatWelcomeScreen";
import { conversationsApi, Conversation, MessageOut, authApi, UserOut } from "@/lib/api";
import { streamChat, ChatAttachmentPayload } from "@/lib/chatStream";
import { 
  Plus, 
  MessageSquare, 
  Trash2, 
  SendHorizonal, 
  PanelLeftClose, 
  PanelLeftOpen, 
  Sparkles,
  AlertCircle,
  FileText,
  Search,
  Network,
  ArrowUpRight,
  Paperclip,
  X,
  Image as ImageIcon,
  Presentation
} from "lucide-react";

interface PendingAttachment {
  file: File;
  name: string;
  mime_type: string;
  dataUrl: string;
  isImage: boolean;
}

function ChatInner() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [pendingAttachments, setPendingAttachments] = useState<PendingAttachment[]>([]);
  const [sending, setSending] = useState(false);
  const [waitingFirstToken, setWaitingFirstToken] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserOut | null>(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const initialCheckDoneRef = useRef(false);

  useEffect(() => {
    authApi.me().then(setCurrentUser).catch(() => {});
    loadConversations();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, waitingFirstToken]);

  // Ajusta a altura da textarea automaticamente
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [input]);

  async function loadConversations() {
    try {
      const list = await conversationsApi.list();
      setConversations(list);
      if (!initialCheckDoneRef.current && typeof window !== "undefined") {
        initialCheckDoneRef.current = true;
        const targetId = new URLSearchParams(window.location.search).get("c");
        if (targetId && list.some((c) => c.id === targetId)) {
          openConversation(targetId);
        }
      }
    } catch {
      // silent — sidebar é não-bloqueante
    }
  }

  async function openConversation(id: string) {
    if (sending) return;
    setConversationId(id);
    setError(null);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `/chat?c=${id}`);
    }
    try {
      const msgs: MessageOut[] = await conversationsApi.messages(id);
      setMessages(
        msgs.map((m) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          sources: m.sources?.map((s) => s.source_path) ?? undefined,
          created_at: m.created_at,
          feedback: m.feedback,
          learning: (m as any).learning || null,
          attachments: (m as any).attachments || null,
        })),
      );
    } catch {
      setError("Não foi possível carregar as mensagens desta conversa.");
    }
  }

  function handleNewConversation() {
    if (sending) return;
    setConversationId(null);
    setMessages([]);
    setPendingAttachments([]);
    setError(null);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "/chat");
    }
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }

  async function handleDeleteConversation(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    if (deletingId === id) return;
    setDeletingId(id);
    try {
      await conversationsApi.delete(id);
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (conversationId === id) {
        handleNewConversation();
      }
    } catch {
      setError("Não foi possível excluir a conversa.");
    } finally {
      setDeletingId(null);
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const currentImageCount = pendingAttachments.filter((a) => a.isImage).length;
    let newImageCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isImg = file.type.startsWith("image/") || /\.(png|jpe?g|webp)$/i.test(file.name);

      if (isImg) {
        if (currentImageCount + newImageCount >= 3) {
          setError("Limite máximo de 3 imagens por interação atingido.");
          continue;
        }
        newImageCount++;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = (event.target?.result as string) || "";
        setPendingAttachments((prev) => [
          ...prev,
          {
            file,
            name: file.name,
            mime_type: file.type || (isImg ? "image/jpeg" : "application/octet-stream"),
            dataUrl,
            isImage: isImg,
          },
        ]);
      };
      reader.readAsDataURL(file);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = (index: number) => {
    setPendingAttachments((prev) => prev.filter((_, idx) => idx !== index));
  };

  async function handleSend(userPromptText?: string) {
    const textToSend = (userPromptText || input).trim();
    if ((!textToSend && pendingAttachments.length === 0) || sending) return;

    const promptText = textToSend || "Por favor, analise os arquivos anexados.";

    const attachmentsToSend: ChatAttachmentPayload[] = pendingAttachments.map((a) => ({
      name: a.name,
      mime_type: a.mime_type,
      data: a.dataUrl,
    }));

    const attachmentsMeta: AttachmentMeta[] = pendingAttachments.map((a) => ({
      name: a.name,
      type: a.isImage ? "image" : a.name.toLowerCase().endsWith(".pdf") ? "pdf" : a.name.toLowerCase().endsWith(".pptx") ? "pptx" : "docx",
      data_url: a.isImage ? a.dataUrl : undefined,
    }));

    setInput("");
    setPendingAttachments([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setError(null);

    const nowIso = new Date().toISOString();

    const userMessage: ChatMessage = {
      role: "user",
      content: promptText,
      created_at: nowIso,
      attachments: attachmentsMeta.length > 0 ? attachmentsMeta : undefined,
    };

    const initialAssistantMessage: ChatMessage = {
      role: "assistant",
      content: "",
      created_at: nowIso,
      statusText: attachmentsToSend.length > 0 ? "Processando anexos..." : "Pensando sobre a solicitação...",
    };

    setMessages((prev) => [...prev, userMessage, initialAssistantMessage]);
    setSending(true);
    setWaitingFirstToken(true);

    let assistantText = "";
    let sources: string[] = [];

    await streamChat(
      promptText,
      conversationId,
      {
        onSources: (s) => {
          sources = s;
          setMessages((prev) => {
            const next = [...prev];
            const lastIdx = next.length - 1;
            if (lastIdx >= 0 && next[lastIdx].role === "assistant") {
              next[lastIdx] = {
                ...next[lastIdx],
                sources: s && s.length > 0 ? s : undefined,
              };
            }
            return next;
          });
        },
        onStatus: (status) => {
          setMessages((prev) => {
            const next = [...prev];
            const lastIdx = next.length - 1;
            if (lastIdx >= 0 && next[lastIdx].role === "assistant") {
              next[lastIdx] = {
                ...next[lastIdx],
                statusText: status.label,
              };
            }
            return next;
          });
        },
        onConversation: (id) => {
          setConversationId(id);
          if (typeof window !== "undefined") {
            window.history.replaceState(null, "", `/chat?c=${id}`);
          }
        },
        onToken: (token) => {
          setWaitingFirstToken(false);
          assistantText += token;
          setMessages((prev) => {
            const next = [...prev];
            const lastIdx = next.length - 1;
            if (lastIdx >= 0) {
              next[lastIdx] = {
                ...next[lastIdx],
                role: "assistant",
                content: assistantText,
                sources: sources && sources.length > 0 ? sources : undefined,
              };
            }
            return next;
          });
        },
        onMessageId: (mid) => {
          setMessages((prev) => {
            const next = [...prev];
            const lastIdx = next.length - 1;
            if (lastIdx >= 0) {
              next[lastIdx] = {
                ...next[lastIdx],
                id: mid,
              };
            }
            return next;
          });
        },
        onLearning: (learningData) => {
          setMessages((prev) => {
            const next = [...prev];
            const lastIdx = next.length - 1;
            if (lastIdx >= 0 && next[lastIdx].role === "assistant") {
              next[lastIdx] = {
                ...next[lastIdx],
                learning: learningData,
              };
            }
            return next;
          });
        },
        onDone: () => {
          setSending(false);
          setWaitingFirstToken(false);
          setMessages((prev) => {
            const next = [...prev];
            const lastIdx = next.length - 1;
            if (lastIdx >= 0 && next[lastIdx].role === "assistant") {
              next[lastIdx] = {
                ...next[lastIdx],
                sources: sources && sources.length > 0 ? sources : undefined,
                statusText: undefined,
              };
            }
            return next;
          });
          loadConversations();
        },
        onError: (msg) => {
          setSending(false);
          setWaitingFirstToken(false);
          setMessages((prev) => {
            const next = [...prev];
            const lastIdx = next.length - 1;
            if (lastIdx >= 0 && next[lastIdx].role === "assistant" && !next[lastIdx].content) {
              next[lastIdx] = {
                ...next[lastIdx],
                content: `⚠️ **Falha na comunicação**: ${msg || "O Gateway de IA local não respondeu. Verifique se o serviço local está ativo e com a sessão corporativa válida."}`,
                statusText: undefined,
              };
            }
            return next;
          });
          setError(msg || "Ocorreu uma falha na geração da resposta pelo gateway.");
        },
      },
      attachmentsToSend
    );
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const filteredConversations = conversations.filter((c) =>
    (c.title || "Nova conversa").toLowerCase().includes(searchFilter.toLowerCase()),
  );

  const activeConversationTitle = conversations.find((c) => c.id === conversationId)?.title;

  return (
    <main className="flex h-screen flex-col bg-[#080d1a] text-slate-100 overflow-hidden select-text">
      {/* Header Corporativo NTT DATA */}
      <AppHeader />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Lateral de Histórico */}
        <aside
          className={`flex flex-col border-r border-slate-800/80 bg-slate-950/70 backdrop-blur-md transition-all duration-300 z-20 ${
            sidebarOpen ? "w-72" : "w-0 -translate-x-full absolute md:relative md:w-0"
          } overflow-hidden`}
        >
          {/* Top Actions na Sidebar */}
          <div className="p-3 border-b border-slate-800/80 space-y-2">
            <button
              onClick={handleNewConversation}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0072BC] to-sky-600 px-3.5 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-500/20 hover:brightness-110 active:scale-[0.99] transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>Nova Conversa</span>
            </button>

            {/* Campo de Busca no Histórico */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Buscar no histórico..."
                className="w-full rounded-lg border border-slate-800 bg-slate-900/90 pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Lista de Conversas Recentes */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            <div className="px-2 py-1 flex items-center justify-between text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              <span>Conversas Recentes</span>
              <span className="rounded-full bg-slate-800 px-1.5 py-0.2 text-[10px] text-slate-400">
                {conversations.length}
              </span>
            </div>

            {filteredConversations.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500">
                {searchFilter ? "Nenhuma conversa encontrada." : "Nenhuma conversa ainda."}
              </div>
            ) : (
              filteredConversations.map((c) => {
                const isActive = c.id === conversationId;
                return (
                  <div
                    key={c.id}
                    onClick={() => openConversation(c.id)}
                    className={`group relative flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-xs cursor-pointer transition-all duration-150 ${
                      isActive
                        ? "bg-blue-600/15 border border-blue-500/30 text-white font-medium shadow-sm"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <MessageSquare
                        className={`h-3.5 w-3.5 flex-shrink-0 ${
                          isActive ? "text-sky-400" : "text-slate-400 group-hover:text-slate-200"
                        }`}
                      />
                      <span className="truncate">{c.title || "Nova conversa"}</span>
                    </div>

                    {/* Botão de Excluir Conversa */}
                    <button
                      onClick={(e) => handleDeleteConversation(e, c.id)}
                      disabled={deletingId === c.id}
                      title="Excluir conversa"
                      className="opacity-0 group-hover:opacity-100 rounded p-1 text-slate-400 hover:bg-rose-500/20 hover:text-rose-300 transition-all flex-shrink-0"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Acesso Visual ao Grafo Neural 3D para Todos os Usuários */}
          <div className="p-2.5 border-t border-slate-800/80 bg-slate-950/40">
            <button
              onClick={() => router.push("/graph")}
              className="flex w-full items-center justify-between rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-950 p-2.5 text-xs font-medium text-cyan-300 shadow-md shadow-cyan-950/30 hover:border-cyan-400 hover:text-cyan-200 transition-all group"
              title="Explorar visualmente o Grafo Neural 3D de documentos"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform shrink-0">
                  <Network className="h-4 w-4" />
                </div>
                <div className="text-left truncate">
                  <div className="font-semibold text-slate-100 flex items-center gap-1.5 text-[11px]">
                    AXET-NEURALGRAPH-3D
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono truncate">
                    Exploração Cognitiva
                  </div>
                </div>
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-cyan-300 transition-colors shrink-0" />
            </button>
          </div>
        </aside>

        {/* Botão de Toggle da Sidebar Flutuante */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`absolute top-3 z-30 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/90 text-slate-400 shadow-md hover:bg-slate-800 hover:text-white transition-all ${
            sidebarOpen ? "left-60 md:left-64" : "left-3"
          }`}
          title={sidebarOpen ? "Recolher barra lateral" : "Expandir barra lateral"}
        >
          {sidebarOpen ? (
            <PanelLeftClose className="h-4 w-4" />
          ) : (
            <PanelLeftOpen className="h-4 w-4" />
          )}
        </button>

        {/* Área Principal de Chat */}
        <section className="flex flex-1 flex-col overflow-hidden bg-[#080d1a]">
          {/* Subheader com Título da Conversa Ativa */}
          {conversationId && (
            <div className="flex h-10 items-center justify-between border-b border-slate-800/60 bg-slate-950/40 px-14 py-1 text-xs text-slate-400">
              <div className="flex items-center gap-2 truncate">
                <FileText className="h-3.5 w-3.5 text-blue-400 flex-shrink-0" />
                <span className="truncate font-medium text-slate-300">
                  {activeConversationTitle || "Conversa Ativa"}
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
                <span>RAG Local Conectado</span>
              </div>
            </div>
          )}

          {/* Mensagens ou Welcome Screen */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-4">
            {messages.length === 0 ? (
              <ChatWelcomeScreen
                onSelectPrompt={(promptText) => handleSend(promptText)}
                userName={currentUser?.email ? currentUser.email.split("@")[0] : "Colega"}
              />
            ) : (
              <div className="max-w-4xl mx-auto space-y-4">
                {messages.map((m, i) => {
                  const isLastAssistant =
                    m.role === "assistant" && i === messages.length - 1;
                  return (
                    <ChatMessageItem
                      key={m.id || i}
                      message={m}
                      userEmail={currentUser?.email}
                      isStreaming={isLastAssistant && (sending || waitingFirstToken)}
                    />
                  );
                })}
                <div ref={bottomRef} className="h-4" />
              </div>
            )}
          </div>

          {/* Banner de Erro Flutuante */}
          {error && (
            <div className="max-w-3xl mx-auto px-4 w-full">
              <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-xs text-rose-300 animate-in fade-in">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span className="flex-1">{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="text-rose-400 hover:text-white text-xs font-semibold underline"
                >
                  Dispensar
                </button>
              </div>
            </div>
          )}

          {/* Input Box Flutuante Estilo ChatGPT / Claude */}
          <div className="p-4 md:pb-6 md:pt-2 border-t border-slate-800/80 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
            <div className="max-w-4xl mx-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="relative flex flex-col rounded-2xl border border-slate-700/80 bg-slate-900/90 shadow-2xl focus-within:border-blue-500/80 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200"
              >
                {/* Preview de Anexos Pendentes */}
                {pendingAttachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 px-4 pt-3 pb-1 border-b border-slate-800/60">
                    {pendingAttachments.map((att, idx) => (
                      <div
                        key={idx}
                        className="group relative flex items-center gap-2 rounded-lg border border-slate-700/80 bg-slate-800/90 pl-2.5 pr-1.5 py-1 text-xs text-slate-200 shadow-sm"
                      >
                        {att.isImage ? (
                          <div className="flex items-center gap-1.5">
                            <img
                              src={att.dataUrl}
                              alt={att.name}
                              className="h-6 w-6 rounded object-cover border border-slate-600"
                            />
                            <span className="max-w-[120px] truncate text-[11px] font-medium">{att.name}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            {att.name.toLowerCase().endsWith(".pdf") ? (
                              <FileText className="h-4 w-4 text-rose-400 flex-shrink-0" />
                            ) : att.name.toLowerCase().endsWith(".pptx") ? (
                              <Presentation className="h-4 w-4 text-amber-400 flex-shrink-0" />
                            ) : (
                              <FileText className="h-4 w-4 text-blue-400 flex-shrink-0" />
                            )}
                            <span className="max-w-[140px] truncate text-[11px] font-medium">{att.name}</span>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeAttachment(idx)}
                          className="ml-1 rounded p-0.5 text-slate-400 hover:bg-slate-700 hover:text-white transition"
                          title="Remover anexo"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Textarea auto-expansível */}
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Faça uma pergunta ou anexe documentos (PDF, PPT, Word ou até 3 imagens)..."
                  disabled={sending}
                  rows={1}
                  className="w-full resize-none bg-transparent px-4 pt-3.5 pb-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none disabled:opacity-60 max-h-44 min-h-[48px]"
                />

                {/* Footer do Input Box */}
                <div className="flex items-center justify-between px-3.5 pb-2.5 pt-1 text-xs text-slate-400">
                  <div className="flex items-center gap-2 text-[11px]">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.docx,.pptx,.png,.jpg,.jpeg,.webp"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={sending}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-800/60 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:bg-slate-700/80 hover:text-white disabled:opacity-40 transition"
                      title="Anexar arquivos (PDF, DOCX, PPTX ou até 3 imagens)"
                    >
                      <Paperclip className="h-3.5 w-3.5 text-blue-400" />
                      <span>Anexar</span>
                    </button>

                    <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
                      <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-700">Enter</kbd>
                      para enviar
                    </span>
                    <span className="hidden sm:inline-block text-slate-600">•</span>
                    <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
                      <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-700">Shift + Enter</kbd>
                      nova linha
                    </span>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      type="submit"
                      disabled={sending || (!input.trim() && pendingAttachments.length === 0)}
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-r from-[#0072BC] to-sky-500 text-white shadow-md shadow-blue-500/20 hover:opacity-90 active:scale-95 disabled:opacity-30 disabled:hover:opacity-30 transition-all"
                      title="Enviar mensagem"
                    >
                      <SendHorizonal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </form>

              <p className="mt-2 text-center text-[11px] text-slate-400 select-none">
                Respostas geradas a partir de indexação vetorial dos arquivos locais. Consulte as fontes citadas para auditoria.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function ChatPage() {
  return (
    <RequireAuth>
      <ChatInner />
    </RequireAuth>
  );
}
