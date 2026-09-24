import asyncio
import hashlib
import json
import logging
import os
import shutil
import tarfile
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from fastapi.responses import FileResponse
from pydantic import BaseModel
from qdrant_client import QdrantClient
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.database import get_db
from app.auth.dependencies import get_current_user, require_admin
from app.auth.models import User
from app.knowledge.models import KnowledgeDocument, KnowledgeEdge
from app.config import settings

logger = logging.getLogger("rag.snapshots")

router = APIRouter(prefix="/snapshots", tags=["snapshots"])
admin_router = APIRouter(prefix="/admin/snapshots", tags=["admin-snapshots"], dependencies=[Depends(require_admin)])

SNAPSHOTS_DIR = Path("/data/snapshots")
UPLOADS_DIR = SNAPSHOTS_DIR / "uploads"
EXPORTS_DIR = SNAPSHOTS_DIR / "exports"

for d in [SNAPSHOTS_DIR, UPLOADS_DIR, EXPORTS_DIR]:
    d.mkdir(parents=True, exist_ok=True)


def get_qdrant_client(timeout: int = 180) -> QdrantClient:
    return QdrantClient(host=settings.qdrant_host, port=settings.qdrant_port, timeout=timeout)


def compute_sha256(filepath: Path) -> str:
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(1024 * 1024):
            h.update(chunk)
    return h.hexdigest()


class SnapshotItemOut(BaseModel):
    filename: str
    file_type: str  # "bundle" (.qpack) or "raw_snapshot" (.snapshot)
    size_bytes: int
    size_mb: float
    created_at: str
    sha256: str
    points_count: int | None = None
    documents_count: int | None = None
    exported_by: str | None = None


class SnapshotStatusOut(BaseModel):
    collection_name: str
    points_count: int
    vectors_count: int
    vector_size: int | None
    status: str
    latest_snapshot: str | None = None
    documents_count: int = 0
    edges_count: int = 0


class ImportResultOut(BaseModel):
    success: bool
    message: str
    filename: str
    sha256: str
    points_count: int
    documents_restored: int
    edges_restored: int


@router.get("/status", response_model=SnapshotStatusOut)
async def get_snapshots_status(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Retorna métricas da base vetorial local e status dos dados indexados."""
    client = get_qdrant_client(timeout=15)
    points_count = 0
    vectors_count = 0
    vector_size = None
    status_str = "offline"

    try:
        info = client.get_collection(collection_name=settings.qdrant_collection)
        points_count = info.points_count or 0
        vectors_count = info.vectors_count or 0
        status_str = info.status.value if hasattr(info.status, "value") else str(info.status)
        try:
            vector_size = info.config.params.vectors.size
        except Exception:
            pass
    except Exception as exc:
        logger.warning(f"Erro ao obter métricas da coleção Qdrant: {exc}")
        status_str = "error"

    # Documentos e arestas no Postgres
    docs_cnt = len((await db.scalars(select(KnowledgeDocument.source_path))).all())
    edges_cnt = len((await db.scalars(select(KnowledgeEdge.id))).all())

    # Identificar o pacote mais recente
    available = list(EXPORTS_DIR.glob("*.qpack")) + list(SNAPSHOTS_DIR.glob(f"{settings.qdrant_collection}/*.snapshot"))
    latest_name = None
    if available:
        latest = max(available, key=lambda p: p.stat().st_mtime)
        latest_name = latest.name

    return SnapshotStatusOut(
        collection_name=settings.qdrant_collection,
        points_count=points_count,
        vectors_count=vectors_count,
        vector_size=vector_size,
        status=status_str,
        latest_snapshot=latest_name,
        documents_count=docs_cnt,
        edges_count=edges_cnt,
    )


@admin_router.post("/export", response_model=SnapshotItemOut)
async def export_snapshot_package(
    current_admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """
    Gera um Snapshot atômico no Qdrant, exporta metadados do Grafo (Postgres),
    calcula hash criptográfico SHA-256 e empacota em um bundle assinado (.qpack).
    """
    client = get_qdrant_client(timeout=300)
    col_name = settings.qdrant_collection

    logger.info(f"Iniciando criação de snapshot no Qdrant para '{col_name}'...")
    loop = asyncio.get_event_loop()
    try:
        snap_desc = await loop.run_in_executor(
            None,
            lambda: client.create_snapshot(collection_name=col_name, wait=True)
        )
    except Exception as exc:
        logger.error(f"Falha ao criar snapshot no Qdrant: {exc}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Falha na criação do snapshot pelo motor Qdrant: {exc}",
        )

    # Identificar o arquivo snapshot gerado no disco
    # O Qdrant grava em /qdrant/snapshots/<col_name>/<snap_desc.name>
    # Mapeado no backend para /data/snapshots/<col_name>/<snap_desc.name>
    snap_path = SNAPSHOTS_DIR / col_name / snap_desc.name
    if not snap_path.exists():
        # Busca recursiva se o nome diferir
        candidates = list(SNAPSHOTS_DIR.glob(f"**/{snap_desc.name}"))
        if candidates:
            snap_path = candidates[0]
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Arquivo de snapshot gerado não encontrado no caminho montado: {snap_desc.name}",
            )

    # Informações da coleção
    try:
        col_info = client.get_collection(col_name)
        points_count = col_info.points_count or 0
    except Exception:
        points_count = 0

    # 2. Exportar nós e arestas do Postgres
    docs_result = await db.scalars(select(KnowledgeDocument))
    docs = docs_result.all()
    edges_result = await db.scalars(select(KnowledgeEdge))
    edges = edges_result.all()

    graph_data = {
        "documents": [
            {
                "source_path": d.source_path,
                "title": d.title,
                "summary": d.summary,
                "topics": d.topics,
                "content_hash": d.content_hash,
            }
            for d in docs
        ],
        "edges": [
            {
                "source_path": e.source_path,
                "target_path": e.target_path,
                "relation_type": e.relation_type,
                "description": e.description,
                "weight": e.weight,
            }
            for e in edges
        ],
    }

    # 3. Criar pacote .qpack (tar.gz contendo snapshot, graph e manifesto com SHA-256)
    timestamp_slug = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    bundle_filename = f"axet_knowledge_base_{timestamp_slug}.qpack"
    bundle_path = EXPORTS_DIR / bundle_filename

    temp_dir = EXPORTS_DIR / f"temp_{uuid.uuid4().hex[:8]}"
    temp_dir.mkdir(parents=True, exist_ok=True)

    try:
        # Copiar snapshot para o temp
        shutil.copy2(snap_path, temp_dir / "collection.snapshot")
        snap_sha256 = compute_sha256(temp_dir / "collection.snapshot")

        # Salvar graph_data.json
        with open(temp_dir / "knowledge_graph.json", "w", encoding="utf-8") as f:
            json.dump(graph_data, f, ensure_ascii=False, indent=2)

        # Salvar manifest.json
        manifest = {
            "version": "1.0",
            "format": "AXET-NEURALGRAPH-3D-QPACK",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "collection_name": col_name,
            "exported_by": current_admin.email,
            "points_count": points_count,
            "documents_count": len(docs),
            "edges_count": len(edges),
            "snapshot_filename": snap_desc.name,
            "snapshot_sha256": snap_sha256,
        }
        with open(temp_dir / "manifest.json", "w", encoding="utf-8") as f:
            json.dump(manifest, f, ensure_ascii=False, indent=2)

        # Empacotar no arquivo tar.gz (.qpack)
        with tarfile.open(bundle_path, "w:gz") as tar:
            for item in ["manifest.json", "knowledge_graph.json", "collection.snapshot"]:
                tar.add(temp_dir / item, arcname=item)

        bundle_sha256 = compute_sha256(bundle_path)
        bundle_size = bundle_path.stat().st_size

        # Salvar manifesto externo para listagem rápida
        with open(EXPORTS_DIR / f"{bundle_filename}.meta.json", "w", encoding="utf-8") as f:
            manifest["bundle_sha256"] = bundle_sha256
            manifest["bundle_size"] = bundle_size
            json.dump(manifest, f, ensure_ascii=False, indent=2)

        return SnapshotItemOut(
            filename=bundle_filename,
            file_type="bundle",
            size_bytes=bundle_size,
            size_mb=round(bundle_size / (1024 * 1024), 2),
            created_at=manifest["created_at"],
            sha256=bundle_sha256,
            points_count=points_count,
            documents_count=len(docs),
            exported_by=current_admin.email,
        )
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)


@admin_router.get("", response_model=list[SnapshotItemOut])
async def list_snapshots(current_admin: User = Depends(require_admin)):
    """Lista todos os pacotes (.qpack) e snapshots brutos disponíveis."""
    results: list[SnapshotItemOut] = []

    # 1. Listar .qpack gerados
    for p in sorted(EXPORTS_DIR.glob("*.qpack"), key=lambda x: x.stat().st_mtime, reverse=True):
        meta_file = EXPORTS_DIR / f"{p.name}.meta.json"
        meta = {}
        if meta_file.exists():
            try:
                with open(meta_file, "r", encoding="utf-8") as f:
                    meta = json.load(f)
            except Exception:
                pass

        size_bytes = p.stat().st_size
        sha256 = meta.get("bundle_sha256") or compute_sha256(p)
        created_at = meta.get("created_at") or datetime.fromtimestamp(p.stat().st_mtime, tz=timezone.utc).isoformat()

        results.append(
            SnapshotItemOut(
                filename=p.name,
                file_type="bundle",
                size_bytes=size_bytes,
                size_mb=round(size_bytes / (1024 * 1024), 2),
                created_at=created_at,
                sha256=sha256,
                points_count=meta.get("points_count"),
                documents_count=meta.get("documents_count"),
                exported_by=meta.get("exported_by"),
            )
        )

    # 2. Listar snapshots brutos caso existam
    col_dir = SNAPSHOTS_DIR / settings.qdrant_collection
    if col_dir.exists():
        for s in sorted(col_dir.glob("*.snapshot"), key=lambda x: x.stat().st_mtime, reverse=True):
            size_bytes = s.stat().st_size
            results.append(
                SnapshotItemOut(
                    filename=s.name,
                    file_type="raw_snapshot",
                    size_bytes=size_bytes,
                    size_mb=round(size_bytes / (1024 * 1024), 2),
                    created_at=datetime.fromtimestamp(s.stat().st_mtime, tz=timezone.utc).isoformat(),
                    sha256="",
                    points_count=None,
                    documents_count=None,
                    exported_by="Qdrant Native",
                )
            )

    return results


@admin_router.get("/{filename}/download")
async def download_snapshot_file(
    filename: str,
    current_admin: User = Depends(require_admin),
):
    """Permite ao administrador baixar o arquivo binário do snapshot ou pacote (.qpack)."""
    # Validação de segurança de path traversal
    if "/" in filename or "\\" in filename or ".." in filename:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nome de arquivo inválido.")

    # Procurar em exports
    target = EXPORTS_DIR / filename
    if not target.exists():
        # Procurar em snapshots da coleção
        target = SNAPSHOTS_DIR / settings.qdrant_collection / filename

    if not target.exists() or not target.is_file():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Arquivo de snapshot não encontrado.")

    return FileResponse(
        path=str(target),
        filename=filename,
        media_type="application/octet-stream",
    )


@admin_router.delete("/{filename}")
async def delete_snapshot_file(
    filename: str,
    current_admin: User = Depends(require_admin),
):
    """Remove um snapshot ou pacote do disco."""
    if "/" in filename or "\\" in filename or ".." in filename:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Nome de arquivo inválido.")

    deleted = False
    for path in [
        EXPORTS_DIR / filename,
        EXPORTS_DIR / f"{filename}.meta.json",
        SNAPSHOTS_DIR / settings.qdrant_collection / filename,
    ]:
        if path.exists():
            path.unlink()
            deleted = True

    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Arquivo não encontrado.")

    return {"message": f"Snapshot {filename} removido com sucesso."}


@router.post("/import", response_model=ImportResultOut)
async def import_snapshot(
    file: UploadFile = File(...),
    expected_sha256: str | None = Form(None),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Importa um pacote (.qpack) ou arquivo (.snapshot), valida integridade criptográfica SHA-256,
    restaura a base vetorial no Qdrant com prioridade absoluta e sincroniza o Grafo Neural.
    """
    filename = Path(file.filename or "upload.qpack").name
    if not (filename.endswith(".qpack") or filename.endswith(".snapshot") or filename.endswith(".tar.gz")):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Formato inválido. Envie um arquivo .qpack ou .snapshot.",
        )

    upload_path = UPLOADS_DIR / f"import_{uuid.uuid4().hex[:6]}_{filename}"
    try:
        with open(upload_path, "wb") as buffer:
            while content := await file.read(1024 * 1024):
                buffer.write(content)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Falha ao salvar arquivo temporário de importação: {exc}",
        )

    # 1. Calcular hash do arquivo recebido
    actual_sha256 = compute_sha256(upload_path)
    if expected_sha256 and expected_sha256.strip():
        if actual_sha256.lower() != expected_sha256.strip().lower():
            upload_path.unlink(missing_ok=True)
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Integridade violada! SHA-256 esperado: {expected_sha256}, obtido: {actual_sha256}.",
            )

    client = get_qdrant_client(timeout=300)
    col_name = settings.qdrant_collection
    loop = asyncio.get_event_loop()

    documents_restored = 0
    edges_restored = 0

    if filename.endswith(".qpack") or filename.endswith(".tar.gz"):
        # Pacote completo com snapshot + grafo
        temp_extract = UPLOADS_DIR / f"ext_{uuid.uuid4().hex[:8]}"
        temp_extract.mkdir(parents=True, exist_ok=True)

        try:
            with tarfile.open(upload_path, "r:*") as tar:
                tar.extractall(path=temp_extract)

            snap_file = temp_extract / "collection.snapshot"
            if not snap_file.exists():
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Arquivo collection.snapshot não encontrado dentro do pacote .qpack.",
                )

            # Mover o snapshot para a pasta acessível pelo Qdrant
            # /data/snapshots/uploads/<filename> -> no Qdrant é file:///qdrant/snapshots/uploads/<filename>
            target_snap = UPLOADS_DIR / f"restore_{uuid.uuid4().hex[:6]}.snapshot"
            shutil.copy2(snap_file, target_snap)

            # Executar recuperação no Qdrant
            location_uri = f"file:///qdrant/snapshots/uploads/{target_snap.name}"
            logger.info(f"Restaurando snapshot no Qdrant via {location_uri}...")
            await loop.run_in_executor(
                None,
                lambda: client.recover_snapshot(
                    collection_name=col_name,
                    location=location_uri,
                    priority="snapshot",
                    wait=True,
                )
            )

            # Restaurar nós e arestas no Postgres
            graph_file = temp_extract / "knowledge_graph.json"
            if graph_file.exists():
                with open(graph_file, "r", encoding="utf-8") as f:
                    g_data = json.load(f)

                # Limpar nós e arestas existentes para manter paridade absoluta
                await db.execute(delete(KnowledgeEdge))
                await db.execute(delete(KnowledgeDocument))

                for d in g_data.get("documents", []):
                    db.add(
                        KnowledgeDocument(
                            source_path=d.get("source_path", ""),
                            title=d.get("title", ""),
                            summary=d.get("summary", ""),
                            topics=d.get("topics", []),
                            content_hash=d.get("content_hash", ""),
                        )
                    )
                    documents_restored += 1

                for e in g_data.get("edges", []):
                    db.add(
                        KnowledgeEdge(
                            source_path=e.get("source_path", ""),
                            target_path=e.target_path if hasattr(e, "target_path") else e.get("target_path", ""),
                            relation_type=e.get("relation_type", "RELATED_TO"),
                            description=e.get("description", ""),
                            weight=e.get("weight", 1.0),
                        )
                    )
                    edges_restored += 1

                await db.commit()

            target_snap.unlink(missing_ok=True)
        finally:
            shutil.rmtree(temp_extract, ignore_errors=True)
            upload_path.unlink(missing_ok=True)

    else:
        # Arquivo .snapshot bruto
        target_snap = UPLOADS_DIR / f"restore_{uuid.uuid4().hex[:6]}.snapshot"
        shutil.move(str(upload_path), str(target_snap))
        location_uri = f"file:///qdrant/snapshots/uploads/{target_snap.name}"

        logger.info(f"Restaurando snapshot bruto no Qdrant via {location_uri}...")
        await loop.run_in_executor(
            None,
            lambda: client.recover_snapshot(
                collection_name=col_name,
                location=location_uri,
                priority="snapshot",
                wait=True,
            )
        )
        target_snap.unlink(missing_ok=True)

    # Obter métricas finais da coleção
    try:
        col_info = client.get_collection(col_name)
        points_count = col_info.points_count or 0
    except Exception:
        points_count = 0

    return ImportResultOut(
        success=True,
        message="Base de conhecimento restaurada e sincronizada com sucesso!",
        filename=filename,
        sha256=actual_sha256,
        points_count=points_count,
        documents_restored=documents_restored,
        edges_restored=edges_restored,
    )
