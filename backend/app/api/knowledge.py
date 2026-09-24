import uuid
from typing import Any

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.database import get_db
from app.auth.dependencies import get_current_user, require_admin
from app.ingestion.watcher import watcher_service
from app.knowledge.curator import (
    apply_prevalence_resolution,
    apply_synthesized_rule_resolution,
    apply_upload_resolution,
    generate_curator_recommendation,
)
from app.knowledge.graph_embeddings import topological_engine
from app.knowledge.models import KnowledgeConflict, KnowledgeDocument, KnowledgeEdge


# Router de visualização para todos os usuários autenticados (User e Admin)
user_router = APIRouter(prefix="/knowledge", tags=["knowledge-user"], dependencies=[Depends(get_current_user)])

# Router de administração com permissões restritas (Admin)
router = APIRouter(prefix="/admin/knowledge", tags=["knowledge-admin"], dependencies=[Depends(require_admin)])


class NodeOut(BaseModel):
    source_path: str
    title: str
    summary: str
    topics: list[str]
    updated_at: Any = None


class EdgeOut(BaseModel):
    id: str
    source_path: str
    target_path: str
    relation_type: str
    description: str
    weight: float


class ConflictOut(BaseModel):
    id: str
    source_path_new: str
    source_path_existing: str
    conflict_type: str
    explanation: str
    resolved: bool
    resolution_strategy: str | None = None
    resolution_details: str | None = None
    resolved_at: Any = None
    created_at: Any = None


class CuratorSuggestOut(BaseModel):
    recommended_option: str
    recommended_winner_path: str | None = None
    analysis: str
    draft_filename: str
    draft_markdown: str


class ResolvePrevalenceIn(BaseModel):
    winner_path: str
    reason: str = ""


class ResolveSynthesizeIn(BaseModel):
    filename: str
    markdown_content: str



class GraphResponse(BaseModel):
    nodes: list[NodeOut]
    edges: list[EdgeOut]


class WatcherStatusOut(BaseModel):
    is_running: bool
    watched_path: str
    total_events_detected: int
    last_event: dict | None = None
    last_sync_time: str | None = None


@router.get("/graph", response_model=GraphResponse)
@user_router.get("/graph", response_model=GraphResponse)
async def get_knowledge_graph(db: AsyncSession = Depends(get_db)):
    """Retorna os nós (documentos com resumos) e arestas relacionais (GraphRAG)."""
    docs_result = await db.scalars(select(KnowledgeDocument).order_by(KnowledgeDocument.updated_at.desc()))
    docs = docs_result.all()

    edges_result = await db.scalars(select(KnowledgeEdge).order_by(KnowledgeEdge.created_at.desc()))
    edges = edges_result.all()

    return GraphResponse(
        nodes=[
            NodeOut(
                source_path=d.source_path,
                title=d.title,
                summary=d.summary,
                topics=d.topics,
                updated_at=d.updated_at.isoformat() if d.updated_at else None,
            )
            for d in docs
        ],
        edges=[
            EdgeOut(
                id=str(e.id),
                source_path=e.source_path,
                target_path=e.target_path,
                relation_type=e.relation_type,
                description=e.description,
                weight=e.weight,
            )
            for e in edges
        ],
    )


@router.get("/topology-metrics")
@user_router.get("/topology-metrics")
async def get_topology_metrics(db: AsyncSession = Depends(get_db)):
    """Retorna métricas analíticas de centralidade (PageRank, Graus) e densidade topológica."""
    await topological_engine.get_or_sync(db)
    metrics = topological_engine.get_metrics()
    return {
        "status": "ok",
        "total_nodes": metrics.total_nodes,
        "total_edges": metrics.total_edges,
        "graph_density": metrics.graph_density,
        "top_pagerank": metrics.top_pagerank,
        "top_degrees": metrics.top_degrees,
        "computed_at": metrics.computed_at,
    }


@router.get("/conflicts", response_model=list[ConflictOut])
async def list_conflicts(db: AsyncSession = Depends(get_db)):
    """Retorna todos os conflitos, contradições e divergências de obsolescência detectados."""
    result = await db.scalars(select(KnowledgeConflict).order_by(KnowledgeConflict.created_at.desc()))
    conflicts = result.all()

    return [
        ConflictOut(
            id=str(c.id),
            source_path_new=c.source_path_new,
            source_path_existing=c.source_path_existing,
            conflict_type=c.conflict_type,
            explanation=c.explanation,
            resolved=c.resolved,
            resolution_strategy=c.resolution_strategy,
            resolution_details=c.resolution_details,
            resolved_at=c.resolved_at.isoformat() if c.resolved_at else None,
            created_at=c.created_at.isoformat() if c.created_at else None,
        )
        for c in conflicts
    ]


@router.get("/conflicts/{conflict_id}/curator-suggest", response_model=CuratorSuggestOut)
async def curator_suggest(conflict_id: str, db: AsyncSession = Depends(get_db)):
    """Gera diagnóstico e minuta de nova regra harmonizada com IA para o conflito."""
    try:
        cid = uuid.UUID(conflict_id)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="ID de conflito inválido")

    conflict = await db.get(KnowledgeConflict, cid)
    if not conflict:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conflito não encontrado")

    suggestion = await generate_curator_recommendation(conflict)
    return CuratorSuggestOut(**suggestion)


@router.post("/conflicts/{conflict_id}/resolve-prevalence")
async def resolve_with_prevalence(
    conflict_id: str,
    payload: ResolvePrevalenceIn,
    db: AsyncSession = Depends(get_db),
    admin: Any = Depends(require_admin),
):
    """Resolve conflito elegendo prevalência de um dos documentos e criando aresta SUBSTITUI no Grafo."""
    try:
        cid = uuid.UUID(conflict_id)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="ID de conflito inválido")

    conflict = await db.get(KnowledgeConflict, cid)
    if not conflict:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conflito não encontrado")

    resolved_conflict = await apply_prevalence_resolution(
        db=db,
        conflict=conflict,
        winner_path=payload.winner_path,
        reason=payload.reason,
        user_id=getattr(admin, "id", None),
    )
    return {"status": "ok", "conflict_id": conflict_id, "strategy": resolved_conflict.resolution_strategy}


@router.post("/conflicts/{conflict_id}/resolve-synthesize")
async def resolve_with_synthesized_rule(
    conflict_id: str,
    payload: ResolveSynthesizeIn,
    db: AsyncSession = Depends(get_db),
    admin: Any = Depends(require_admin),
):
    """Grava e indexa nova regra harmonizada (.md) no disco e no Grafo, pacificando o conflito."""
    try:
        cid = uuid.UUID(conflict_id)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="ID de conflito inválido")

    conflict = await db.get(KnowledgeConflict, cid)
    if not conflict:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conflito não encontrado")

    resolved_conflict = await apply_synthesized_rule_resolution(
        db=db,
        conflict=conflict,
        filename=payload.filename,
        markdown_content=payload.markdown_content,
        user_id=getattr(admin, "id", None),
    )
    return {"status": "ok", "conflict_id": conflict_id, "strategy": resolved_conflict.resolution_strategy}


@router.post("/conflicts/{conflict_id}/resolve-upload")
async def resolve_with_upload(
    conflict_id: str,
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    admin: Any = Depends(require_admin),
):
    """Recebe documento substituto .md, indexa na base e encerra o conflito no Grafo."""
    try:
        cid = uuid.UUID(conflict_id)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="ID de conflito inválido")

    conflict = await db.get(KnowledgeConflict, cid)
    if not conflict:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conflito não encontrado")

    content = await file.read()
    resolved_conflict = await apply_upload_resolution(
        db=db,
        conflict=conflict,
        filename=file.filename or "regra-substituta.md",
        file_bytes=content,
        user_id=getattr(admin, "id", None),
    )
    return {"status": "ok", "conflict_id": conflict_id, "strategy": resolved_conflict.resolution_strategy}


@router.post("/conflicts/{conflict_id}/resolve")
async def resolve_conflict(conflict_id: str, db: AsyncSession = Depends(get_db)):
    """Marca um conflito como resolvido manualmente pelo administrador."""
    try:
        cid = uuid.UUID(conflict_id)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="ID de conflito inválido")

    conflict = await db.get(KnowledgeConflict, cid)
    if not conflict:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conflito não encontrado")

    conflict.resolved = True
    conflict.resolution_strategy = "MANUAL"
    await db.commit()
    return {"status": "ok", "conflict_id": conflict_id, "resolved": True}


@router.get("/watcher-status", response_model=WatcherStatusOut)
async def get_watcher_status():
    """Retorna a telemetria do monitor de arquivos em tempo real (watchdog)."""
    return WatcherStatusOut(
        is_running=watcher_service.is_running,
        watched_path=watcher_service.watched_path,
        total_events_detected=watcher_service.total_events_detected,
        last_event=watcher_service.last_event,
        last_sync_time=watcher_service.last_sync_time,
    )
