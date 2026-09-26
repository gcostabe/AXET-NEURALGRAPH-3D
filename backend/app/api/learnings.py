"""Rotas da API para Neuroplasticidade Federada e Curadoria de Sinapses Cognitivas

(Cenário 1: GitHub Issues e Releases Delta Pack).
"""

from __future__ import annotations

import logging
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import FileResponse
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.database import get_db
from app.auth.dependencies import get_current_user, get_effective_user_role, require_admin
from app.auth.models import AppUserRole, User
from app.knowledge.learning_synapse import (
    EXPORTS_DIR,
    compile_and_export_cognitive_pack,
    download_and_sync_global_pack,
    fetch_incoming_learnings,
    import_cognitive_pack,
    review_cognitive_learning,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/learnings", tags=["learnings"])


class ReviewLearningRequest(BaseModel):
    action: str  # "approve" | "reject"
    refined_concept: str | None = None
    refined_correction: str | None = None


@router.get("/incoming")
async def get_incoming_learnings(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Retorna a lista de aprendizados cognitivos enviados pelas máquinas locais

    ou abertos nas GitHub Issues para curadoria do Administrador.
    """
    eff_role = await get_effective_user_role(current_user, db)
    if eff_role not in (AppUserRole.MASTER_ADMIN, AppUserRole.ADMIN):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Acesso restrito a administradores.")

    try:
        items = await fetch_incoming_learnings()
        return {"items": items, "count": len(items)}
    except Exception as exc:
        logger.error(f"[api/learnings] Erro ao buscar aprendizados: {exc}")
        raise HTTPException(status_code=500, detail=str(exc))


@router.post("/{canonical_id}/review")
async def review_learning_endpoint(
    canonical_id: str,
    payload: ReviewLearningRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Aprova, refina ou rejeita uma sinapse cognitiva aprendida."""
    eff_role = await get_effective_user_role(current_user, db)
    if eff_role != AppUserRole.MASTER_ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Apenas o Master Admin pode aprovar sinapses oficiais.",
        )

    try:
        result = await review_cognitive_learning(
            canonical_id=canonical_id,
            action=payload.action,
            db=db,
            refined_concept=payload.refined_concept,
            refined_correction=payload.refined_correction,
        )
        return {"status": "success", "learning": result}
    except Exception as exc:
        logger.error(f"[api/learnings] Erro ao revisar sinapse: {exc}")
        raise HTTPException(status_code=500, detail=str(exc))


@router.post("/publish-pack")
async def publish_cognitive_pack_endpoint(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Compila todas as sinapses aprovadas no arquivo 'axet_cognitive_synapses_latest.pack'."""
    eff_role = await get_effective_user_role(current_user, db)
    if eff_role != AppUserRole.MASTER_ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Apenas o Master Admin pode publicar o Pacote Global de Sinapses.",
        )

    try:
        result = await compile_and_export_cognitive_pack(db=db)
        return {"status": "success", "pack": result}
    except Exception as exc:
        logger.error(f"[api/learnings] Erro ao compilar pacote: {exc}")
        raise HTTPException(status_code=500, detail=str(exc))


@router.post("/sync-global-pack")
async def sync_global_pack_endpoint(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Baixa e aplica as sinapses oficiais do GitHub Releases diretamente na máquina local

    (Sem necessidade de login ou permissão de commit no GitHub).
    """
    try:
        result = await download_and_sync_global_pack(db=db)
        return result
    except Exception as exc:
        logger.warning(f"[api/learnings] Aviso ao sincronizar pacote global: {exc}")
        raise HTTPException(status_code=502, detail=str(exc))


@router.get("/download-pack")
async def download_pack_endpoint():
    """Permite o download do arquivo de pacote 'axet_cognitive_synapses_latest.pack'

    compilado localmente pelo Administrador.
    """
    pack_file = EXPORTS_DIR / "axet_cognitive_synapses_latest.pack"
    if not pack_file.exists():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Pacote ainda não compilado. Clique em 'Compilar Pacote Global' primeiro.",
        )
    return FileResponse(
        path=pack_file,
        filename="axet_cognitive_synapses_latest.pack",
        media_type="application/json",
    )


@router.post("/import-pack")
async def import_pack_endpoint(
    pack_data: dict[str, Any],
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Importa diretamente um arquivo de pacote de sinapses (.pack / JSON)

    na base local com zero impacto de permissões ou credenciais.
    """
    try:
        count = await import_cognitive_pack(pack_data=pack_data, db=db)
        return {
            "status": "success",
            "imported_count": count,
            "version": pack_data.get("pack_version", "custom"),
            "synapses_count": pack_data.get("synapses_count", count),
        }
    except Exception as exc:
        logger.error(f"[api/learnings] Erro ao importar pacote: {exc}")
        raise HTTPException(status_code=500, detail=str(exc))
