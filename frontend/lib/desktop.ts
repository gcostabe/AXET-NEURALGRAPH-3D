/**
 * Utilitário de integração nativa do aplicativo Desktop (Tauri v2).
 * Fornece fallback transparente entre ambiente Desktop Nativo e Navegador Web.
 */

export function isDesktopApp(): boolean {
  if (typeof window === "undefined") return false;
  return (
    (window as any).__TAURI_INTERNALS__ !== undefined ||
    (window as any).__TAURI__ !== undefined
  );
}

export async function pickNativeFolder(promptTitle: string = "Selecione a pasta do OneDrive"): Promise<string> {
  // 1. Se estiver rodando como Desktop App (Tauri v2)
  if (isDesktopApp()) {
    try {
      const tauri = (window as any).__TAURI__;
      const tauriInternals = (window as any).__TAURI_INTERNALS__;
      let path: string | null = null;

      if (tauri?.core?.invoke) {
        path = await tauri.core.invoke("pick_onedrive_folder");
      } else if (tauriInternals?.invoke) {
        path = await tauriInternals.invoke("pick_onedrive_folder");
      }

      if (path) return path;
    } catch (tauriErr) {
      console.warn("[desktop] Erro ao invocar comando nativo Tauri, tentando fallback:", tauriErr);
    }
  }

  // 2. Fallback para navegador web comum (Bridge local host_picker)
  const resp = await fetch("http://localhost:8765/pick-folder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: promptTitle }),
  });

  if (!resp.ok) {
    throw new Error("Não foi possível acionar o seletor nativo de pastas.");
  }

  const data = await resp.json();
  if (data.status === "cancelled") {
    throw new Error("Seleção de pasta cancelada.");
  }

  return data.path;
}
