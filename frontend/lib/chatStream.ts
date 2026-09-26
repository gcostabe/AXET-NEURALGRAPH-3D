import { getApiUrl, setApiUrl } from "./api";
import { getToken } from "./auth";

export interface ChatAttachmentPayload {
  name: string;
  mime_type: string;
  data: string;
}

export interface ChatStreamHandlers {
  onSources?: (sources: string[]) => void;
  onConversation?: (conversationId: string) => void;
  onMessageId?: (messageId: string) => void;
  onToken?: (token: string) => void;
  onStatus?: (status: { step: string; label: string }) => void;
  onLearning?: (learningData: any) => void;
  onDone?: () => void;
  onError?: (message: string) => void;
}

export async function streamChat(
  message: string,
  conversationId: string | null,
  handlers: ChatStreamHandlers,
  attachments?: ChatAttachmentPayload[],
) {
  const token = getToken();
  let currentBase = getApiUrl();
  let res: Response;

  const payload = JSON.stringify({
    message,
    conversation_id: conversationId,
    attachments: attachments && attachments.length > 0 ? attachments : undefined,
  });

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    res = await fetch(`${currentBase}/chat`, {
      method: "POST",
      headers,
      body: payload,
    });
  } catch (err: any) {
    const fallbackBase = currentBase.includes("localhost")
      ? currentBase.replace("localhost", "127.0.0.1")
      : currentBase.includes("127.0.0.1")
      ? currentBase.replace("127.0.0.1", "localhost")
      : null;

    if (fallbackBase) {
      try {
        res = await fetch(`${fallbackBase}/chat`, {
          method: "POST",
          headers,
          body: payload,
        });
        setApiUrl(fallbackBase);
      } catch (fbErr: any) {
        handlers.onError?.(err?.message || "Failed to fetch");
        return;
      }
    } else {
      handlers.onError?.(err?.message || "Failed to fetch");
      return;
    }
  }

  if (!res.ok || !res.body) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body.detail || detail;
    } catch {
      // ignore
    }
    handlers.onError?.(detail);
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let currentEvent = "message";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (line.startsWith("event:")) {
        currentEvent = line.slice(6).trim();
      } else if (line.startsWith("data:")) {
        const data = line.slice(5).trim();
        switch (currentEvent) {
          case "sources": {
            const parsed: Array<{ source_path: string; title?: string }> =
              JSON.parse(data);
            handlers.onSources?.(parsed.map((s) => s.source_path));
            break;
          }
          case "conversation":
            handlers.onConversation?.(JSON.parse(data).conversation_id);
            break;
          case "token":
            handlers.onToken?.(JSON.parse(data).text);
            break;
          case "message_id":
            handlers.onMessageId?.(JSON.parse(data).message_id);
            break;
          case "learning_occurred": {
            try {
              handlers.onLearning?.(JSON.parse(data));
            } catch (err) {
              console.warn("Failed to parse learning_occurred data", err);
            }
            break;
          }
          case "status": {
            try {
              handlers.onStatus?.(JSON.parse(data));
            } catch {
              handlers.onStatus?.({ step: "general", label: data });
            }
            break;
          }
          case "done":
            handlers.onDone?.();
            break;
          case "error":
            handlers.onError?.(data);
            break;
        }
      }
    }
  }
}
