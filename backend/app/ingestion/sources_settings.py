"""Diretório de fontes .md configurável em runtime pelo painel admin.

O caminho efetivo é sempre resolvido como um subcaminho de `settings.sources_root`
(a raiz montada no container). Isso impede que o admin aponte a ingestão para
fora do volume montado (path traversal) mesmo controlando o valor via API.
"""

import unicodedata
from pathlib import Path

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.models import AppSetting
from app.config import settings

SOURCES_PATH_KEY = "sources_relative_path"
DEFAULT_RELATIVE_PATH = "."


class InvalidSourcesPath(ValueError):
    pass


def to_relative_path(host_or_relative_path: str) -> str:
    """Traduz um caminho colado pelo admin para o caminho relativo a sources_root.

    Aceita formatos:
    - Já relativo (ex.: "01. Reef N0") — devolvido como está.
    - Caminho absoluto do HOST dentro de data/sources ou pasta espelhada do OneDrive
      — traduzido para a subpasta relativa correspondente ou "." para a raiz.
    """
    cleaned = host_or_relative_path.strip().strip('"\'').strip()
    candidate = Path(cleaned)

    if not candidate.is_absolute():
        return cleaned

    norm_candidate = unicodedata.normalize("NFC", cleaned)

    # 1. Se contém "data/sources" (caminho físico do projeto no host)
    if "data/sources" in norm_candidate:
        sub_part = norm_candidate.split("data/sources")[-1].lstrip("/")
        return sub_part if sub_part else "."

    # 2. Se contém a pasta espelhada do OneDrive Mapfre
    norm_onedrive = unicodedata.normalize("NFC", "REEF Formación - 02. Formaciones Mapfre/_markdown")
    if norm_onedrive in norm_candidate:
        sub_part = norm_candidate.split(norm_onedrive)[-1].lstrip("/")
        return sub_part if sub_part else "."

    if "_markdown" in norm_candidate:
        sub_part = norm_candidate.split("_markdown")[-1].lstrip("/")
        return sub_part if sub_part else "."

    # 3. Verificação padrão com sources_root_host_path
    host_root = Path(settings.sources_root_host_path).expanduser().resolve()
    resolved_candidate = candidate.resolve()
    if resolved_candidate == host_root:
        return "."
    if host_root in resolved_candidate.parents:
        return str(resolved_candidate.relative_to(host_root))

    raise InvalidSourcesPath(
        f"'{host_or_relative_path}' está fora da raiz montada ({host_root}). "
        "Para indexar essa pasta, é preciso remontar SOURCES_ROOT no .env "
        "apontando para um diretório que a contenha, e reiniciar o container."
    )


def resolve_sources_dir(relative_path: str) -> Path:
    """Resolve e valida que `relative_path` está contido em `sources_root`."""
    root = Path(settings.sources_root).resolve()
    candidate = (root / relative_path).resolve()

    if candidate != root and root not in candidate.parents:
        raise InvalidSourcesPath(
            f"Path must be inside sources_root ({root}): got {candidate}"
        )
    if not candidate.exists():
        raise InvalidSourcesPath(f"Path does not exist: {candidate}")
    if not candidate.is_dir():
        raise InvalidSourcesPath(f"Path is not a directory: {candidate}")

    return candidate


async def get_sources_relative_path(db: AsyncSession) -> str:
    row = await db.scalar(select(AppSetting).where(AppSetting.key == SOURCES_PATH_KEY))
    return row.value if row is not None else DEFAULT_RELATIVE_PATH


async def set_sources_relative_path(db: AsyncSession, path_input: str, updated_by) -> str:
    """Aceita caminho relativo OU caminho absoluto do host (colado pelo admin) e
    persiste sempre a forma relativa a sources_root."""
    relative_path = to_relative_path(path_input)

    # Levanta InvalidSourcesPath se o caminho não for válido — falha antes de persistir.
    resolve_sources_dir(relative_path)

    row = await db.scalar(select(AppSetting).where(AppSetting.key == SOURCES_PATH_KEY))
    if row is None:
        row = AppSetting(key=SOURCES_PATH_KEY, value=relative_path, updated_by=updated_by)
        db.add(row)
    else:
        row.value = relative_path
        row.updated_by = updated_by

    await db.commit()
    return relative_path
