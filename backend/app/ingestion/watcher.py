import asyncio
import concurrent.futures
import logging
import threading
import time
from datetime import datetime, timezone
from pathlib import Path

from watchdog.events import FileSystemEvent, FileSystemEventHandler
from watchdog.observers.polling import PollingObserver as Observer

from app.config import settings
from app.ingestion.chunker import chunk_by_headers
from app.ingestion.embedder import get_embedder
from app.ingestion.parser import parse_markdown_file
from app.ingestion.vector_store import delete_by_source_path, ensure_collection, get_client, upsert_chunks
from app.knowledge.analyzer import process_document_cognitive_evolution, remove_document_knowledge

logger = logging.getLogger(__name__)


def run_coroutine_sync(coro):
    """Executa uma corrotina síncronamente de forma segura em qualquer thread."""
    try:
        loop = asyncio.get_running_loop()
    except RuntimeError:
        loop = None

    if loop and loop.is_running():
        with concurrent.futures.ThreadPoolExecutor(max_workers=1) as executor:
            future = executor.submit(asyncio.run, coro)
            return future.result()
    else:
        return asyncio.run(coro)


class MarkdownEventHandler(FileSystemEventHandler):
    """Captura eventos de arquivos .md e encaminha para o buffer com debounce."""

    def __init__(self, watcher: "SourcesWatcherService"):
        super().__init__()
        self.watcher = watcher

    def _is_valid_md(self, path_str: str) -> bool:
        p = Path(path_str)
        # Ignora arquivos ocultos, temporários ou de sistema
        if p.name.startswith(".") or p.name.startswith("~") or p.name.endswith(".tmp"):
            return False
        return p.suffix.lower() == ".md"

    def on_created(self, event: FileSystemEvent):
        if not event.is_directory and self._is_valid_md(event.src_path):
            self.watcher.enqueue_event(Path(event.src_path), "created")

    def on_modified(self, event: FileSystemEvent):
        if not event.is_directory and self._is_valid_md(event.src_path):
            self.watcher.enqueue_event(Path(event.src_path), "modified")

    def on_deleted(self, event: FileSystemEvent):
        if not event.is_directory and self._is_valid_md(event.src_path):
            self.watcher.enqueue_event(Path(event.src_path), "deleted")

    def on_moved(self, event: FileSystemEvent):
        if not event.is_directory:
            if self._is_valid_md(event.src_path):
                self.watcher.enqueue_event(Path(event.src_path), "deleted")
            if hasattr(event, "dest_path") and self._is_valid_md(event.dest_path):
                self.watcher.enqueue_event(Path(event.dest_path), "created")


class SourcesWatcherService:
    """Serviço em background que monitora o diretório de fontes com watchdog e debounce."""

    def __init__(self):
        self._observer: Observer | None = None
        self._worker_thread: threading.Thread | None = None
        self._stop_event = threading.Event()
        self._lock = threading.Lock()
        self._pending_events: dict[Path, tuple[str, float]] = {}
        self._loop: asyncio.AbstractEventLoop | None = None

        self.is_running: bool = False
        self.watched_path: str = ""
        self.total_events_detected: int = 0
        self.last_event: dict | None = None
        self.last_sync_time: str | None = None

    def enqueue_event(self, path: Path, action: str):
        now = time.time()
        with self._lock:
            self._pending_events[path] = (action, now)
            self.total_events_detected += 1
            self.last_event = {
                "path": str(path),
                "action": action,
                "timestamp": datetime.now(timezone.utc).isoformat(),
            }
        logger.info(f"[watchdog] Evento enfileirado: {action} em {path.name}")

    def start(self, watch_dir: str | None = None, loop: asyncio.AbstractEventLoop | None = None):
        if not settings.watchdog_enabled:
            logger.info("[watchdog] Monitoramento automático desativado via configuração.")
            return

        if self.is_running:
            return

        target_dir = Path(watch_dir or settings.sources_root).resolve()
        if not target_dir.exists():
            logger.warning(f"[watchdog] Diretório não existe para monitoramento: {target_dir}")
            return

        self.watched_path = str(target_dir)
        self._loop = loop
        self._stop_event.clear()

        # Inicia observer do watchdog
        handler = MarkdownEventHandler(self)
        self._observer = Observer()
        self._observer.schedule(handler, path=self.watched_path, recursive=True)
        self._observer.start()

        # Inicia thread de processamento com debounce
        self._worker_thread = threading.Thread(target=self._debounce_worker, daemon=True)
        self._worker_thread.start()

        self.is_running = True
        logger.info(f"[watchdog] Monitorando alterações em tempo real em '{self.watched_path}'.")

    def stop(self):
        if not self.is_running:
            return

        logger.info("[watchdog] Parando monitoramento...")
        self._stop_event.set()

        if self._observer:
            self._observer.stop()
            self._observer.join(timeout=5.0)
            self._observer = None

        if self._worker_thread:
            self._worker_thread.join(timeout=5.0)
            self._worker_thread = None

        self.is_running = False
        logger.info("[watchdog] Monitoramento parado.")

    def _debounce_worker(self):
        """Thread que processa arquivos após o tempo de debounce expirar."""
        debounce_interval = settings.watchdog_debounce_seconds
        root = Path(self.watched_path)

        while not self._stop_event.is_set():
            time.sleep(0.5)
            now = time.time()
            ready_items: list[tuple[Path, str]] = []

            with self._lock:
                for path, (action, timestamp) in list(self._pending_events.items()):
                    if now - timestamp >= debounce_interval:
                        ready_items.append((path, action))
                        del self._pending_events[path]

            for path, action in ready_items:
                try:
                    if self._loop and self._loop.is_running():
                        future = asyncio.run_coroutine_threadsafe(
                            self._async_process_file_event(path, action, root), self._loop
                        )
                        future.result(timeout=180.0)
                    else:
                        asyncio.run(self._async_process_file_event(path, action, root))
                except Exception as exc:
                    logger.error(f"[watchdog] Falha ao processar {action} em {path}: {exc}", exc_info=True)

    async def _async_process_file_event(self, file_path: Path, action: str, root: Path):
        try:
            rel_path = str(file_path.relative_to(root))
        except ValueError:
            rel_path = file_path.name

        client = get_client()

        if action == "deleted" or not file_path.exists():
            logger.info(f"[watchdog] Removendo documento excluído: {rel_path}")
            delete_by_source_path(client, rel_path)
            await remove_document_knowledge(rel_path)
            self.last_sync_time = datetime.now(timezone.utc).isoformat()
            return

        # Ação created ou modified
        logger.info(f"[watchdog] Ingerindo e analisando alteração: {rel_path}")
        doc = parse_markdown_file(file_path, root)

        embedder = get_embedder()
        probe_vector = embedder.embed(["probe"])[0]
        ensure_collection(client, vector_size=len(probe_vector))

        delete_by_source_path(client, doc.source_path)

        chunks = chunk_by_headers(doc.body, doc.title)
        if chunks:
            vectors = embedder.embed([c.text for c in chunks])
            payloads = [
                {
                    "source_path": doc.source_path,
                    "content_hash": doc.content_hash,
                    "title": doc.title,
                    "tags": doc.tags,
                    "breadcrumb": chunk.breadcrumb,
                    "chunk_index": chunk.chunk_index,
                    "text": chunk.text,
                }
                for chunk in chunks
            ]
            upsert_chunks(client, vectors, payloads)
            logger.info(f"[watchdog] Indexados {len(chunks)} chunks para {doc.source_path}")

        # Análise cognitiva (resumo, tópicos, grafo de relações e detecção de conflitos)
        if settings.cognitive_analysis_enabled:
            await process_document_cognitive_evolution(
                doc_path=doc.source_path,
                doc_title=doc.title,
                doc_body=doc.body,
                content_hash=doc.content_hash,
            )

        self.last_sync_time = datetime.now(timezone.utc).isoformat()


watcher_service = SourcesWatcherService()
