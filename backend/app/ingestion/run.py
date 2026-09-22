"""CLI de ingestão de arquivos .md para o vector store.

Uso:
    python -m app.ingestion.run --path /data/sources --mode incremental
    python -m app.ingestion.run --path /data/sources --mode full
"""

import argparse
from pathlib import Path

from app.config import settings
from app.ingestion.chunker import chunk_by_headers
from app.ingestion.embedder import get_embedder
from app.ingestion.parser import discover_markdown_files, parse_markdown_file
from app.ingestion.vector_store import (
    delete_by_source_path,
    ensure_collection,
    get_client,
    get_indexed_hashes,
    upsert_chunks,
)
from app.knowledge.analyzer import process_document_cognitive_evolution


from datetime import datetime, timezone, timedelta
import time
from typing import Any, Callable


def _build_progress_payload(
    phase: str,
    current_file: str,
    processed: int,
    skipped: int,
    errors: int,
    total_files: int,
    total_chunks: int,
    start_time: float,
    started_at_iso: str,
    active_time_spent: float,
    active_files_count: int,
) -> dict:
    now = time.time()
    elapsed = max(0.001, now - start_time)
    speed_chunks = round(total_chunks / elapsed, 1)
    speed_files = round((processed + skipped) / elapsed, 2)
    remaining_files = max(0, total_files - (processed + skipped))

    eta_seconds: int | None = None
    eta_iso: str | None = None
    if phase == "completed" or remaining_files == 0:
        eta_seconds = 0
    elif active_files_count >= 2 and active_time_spent > 0.5:
        sec_per_file = active_time_spent / active_files_count
        eta_seconds = max(0, int(remaining_files * sec_per_file))
    elif (processed + skipped) >= 5 and elapsed > 1.0:
        sec_per_item = elapsed / (processed + skipped)
        eta_seconds = max(0, int(remaining_files * sec_per_item))

    if eta_seconds is not None and phase != "completed":
        eta_iso = (datetime.now(timezone.utc) + timedelta(seconds=eta_seconds)).isoformat()

    return {
        "phase": phase,
        "current_file": current_file,
        "processed": processed,
        "skipped": skipped,
        "remaining_files": remaining_files,
        "errors": errors,
        "total_files": total_files,
        "total_chunks": total_chunks,
        "speed": speed_chunks,
        "speed_files": speed_files,
        "started_at": started_at_iso,
        "eta_seconds": eta_seconds,
        "eta_iso": eta_iso,
    }


async def run_async(
    root_path: str,
    mode: str,
    on_progress: Callable[[dict[str, Any]], Any] | None = None,
) -> dict:
    root = Path(root_path)
    if not root.exists():
        raise SystemExit(f"Sources path not found: {root}")

    started_at_iso = datetime.now(timezone.utc).isoformat()
    start_time = time.time()

    files = discover_markdown_files(root)
    total_files = len(files)
    print(f"[ingest] found {total_files} markdown files under {root}")

    if on_progress:
        try:
            res = on_progress(_build_progress_payload(
                phase="discovering",
                current_file="",
                processed=0,
                skipped=0,
                errors=0,
                total_files=total_files,
                total_chunks=0,
                start_time=start_time,
                started_at_iso=started_at_iso,
                active_time_spent=0.0,
                active_files_count=0,
            ))
            if hasattr(res, "__await__"):
                await res
        except Exception:
            pass

    client = get_client()
    embedder = get_embedder()

    indexed_hashes = {} if mode == "full" else get_indexed_hashes(client)

    total_chunks = 0
    processed = 0
    skipped = 0
    errors = 0
    active_time_spent = 0.0
    active_files_count = 0
    last_report_time = 0.0

    probe_vector = embedder.embed(["probe"])[0]
    ensure_collection(client, vector_size=len(probe_vector))

    for idx, file_path in enumerate(files):
        rel_str = str(file_path.relative_to(root)) if file_path.is_relative_to(root) else file_path.name
        now = time.time()

        if on_progress and (now - last_report_time >= 0.15 or idx == 0):
            try:
                res = on_progress(_build_progress_payload(
                    phase="parsing",
                    current_file=rel_str,
                    processed=processed,
                    skipped=skipped,
                    errors=errors,
                    total_files=total_files,
                    total_chunks=total_chunks,
                    start_time=start_time,
                    started_at_iso=started_at_iso,
                    active_time_spent=active_time_spent,
                    active_files_count=active_files_count,
                ))
                if hasattr(res, "__await__"):
                    await res
            except Exception:
                pass
            last_report_time = now

        try:
            doc = parse_markdown_file(file_path, root)

            if mode == "incremental" and indexed_hashes.get(doc.source_path) == doc.content_hash:
                skipped += 1
                continue

            file_start = time.time()

            if on_progress:
                try:
                    res = on_progress(_build_progress_payload(
                        phase="embedding",
                        current_file=doc.source_path,
                        processed=processed,
                        skipped=skipped,
                        errors=errors,
                        total_files=total_files,
                        total_chunks=total_chunks,
                        start_time=start_time,
                        started_at_iso=started_at_iso,
                        active_time_spent=active_time_spent,
                        active_files_count=active_files_count,
                    ))
                    if hasattr(res, "__await__"):
                        await res
                except Exception:
                    pass

            delete_by_source_path(client, doc.source_path)

            chunks = chunk_by_headers(doc.body, doc.title)
            if not chunks:
                continue

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

            total_chunks += len(chunks)
            processed += 1
            file_dur = time.time() - file_start
            active_time_spent += file_dur
            active_files_count += 1
            print(f"[ingest] indexed {doc.source_path} ({len(chunks)} chunks)")

            if settings.cognitive_analysis_enabled:
                try:
                    await process_document_cognitive_evolution(
                        doc_path=doc.source_path,
                        doc_title=doc.title,
                        doc_body=doc.body,
                        content_hash=doc.content_hash,
                    )
                except Exception as cog_exc:
                    print(f"[ingest] aviso: falha na análise cognitiva de {doc.source_path}: {cog_exc}")
        except Exception as doc_exc:
            errors += 1
            print(f"[ingest] erro ao processar arquivo {file_path}: {doc_exc}")

    if on_progress:
        try:
            res = on_progress(_build_progress_payload(
                phase="completed",
                current_file="",
                processed=processed,
                skipped=skipped,
                errors=errors,
                total_files=total_files,
                total_chunks=total_chunks,
                start_time=start_time,
                started_at_iso=started_at_iso,
                active_time_spent=active_time_spent,
                active_files_count=active_files_count,
            ))
            if hasattr(res, "__await__"):
                await res
        except Exception:
            pass

    print(
        f"[ingest] done. processed={processed} skipped={skipped} errors={errors} "
        f"total_chunks_written={total_chunks}"
    )
    return {
        "files_found": len(files),
        "processed": processed,
        "skipped": skipped,
        "errors": errors,
        "total_chunks_written": total_chunks,
    }


def run(root_path: str, mode: str) -> dict:
    import asyncio
    return asyncio.run(run_async(root_path, mode))


def main() -> None:
    parser = argparse.ArgumentParser(description="Ingest markdown files into the vector store")
    parser.add_argument(
        "--path",
        default=settings.sources_root,
        help="Caminho absoluto a indexar. Por padrão, a raiz montada (sources_root); "
        "para indexar via subcaminho configurado pelo painel admin, use a rota "
        "POST /admin/sources-config/reindex em vez desta CLI.",
    )
    parser.add_argument("--mode", choices=["full", "incremental"], default="incremental")
    args = parser.parse_args()

    run(args.path, args.mode)


if __name__ == "__main__":
    main()
