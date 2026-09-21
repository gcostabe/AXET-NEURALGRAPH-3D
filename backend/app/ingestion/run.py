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


def run(root_path: str, mode: str) -> dict:
    root = Path(root_path)
    if not root.exists():
        raise SystemExit(f"Sources path not found: {root}")

    files = discover_markdown_files(root)
    print(f"[ingest] found {len(files)} markdown files under {root}")

    client = get_client()
    embedder = get_embedder()

    indexed_hashes = {} if mode == "full" else get_indexed_hashes(client)

    total_chunks = 0
    processed = 0
    skipped = 0

    probe_vector = embedder.embed(["probe"])[0]
    ensure_collection(client, vector_size=len(probe_vector))

    for file_path in files:
        doc = parse_markdown_file(file_path, root)

        if mode == "incremental" and indexed_hashes.get(doc.source_path) == doc.content_hash:
            skipped += 1
            continue

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
        print(f"[ingest] indexed {doc.source_path} ({len(chunks)} chunks)")

    print(
        f"[ingest] done. processed={processed} skipped={skipped} "
        f"total_chunks_written={total_chunks}"
    )
    return {
        "files_found": len(files),
        "processed": processed,
        "skipped": skipped,
        "total_chunks_written": total_chunks,
    }


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
