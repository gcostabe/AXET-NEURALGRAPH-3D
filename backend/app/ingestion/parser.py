import hashlib
from dataclasses import dataclass, field
from pathlib import Path

import frontmatter


@dataclass
class ParsedDocument:
    source_path: str
    content_hash: str
    title: str
    tags: list[str]
    body: str
    front_matter: dict = field(default_factory=dict)


def parse_markdown_file(file_path: Path, root: Path) -> ParsedDocument:
    raw = file_path.read_text(encoding="utf-8", errors="ignore")
    post = frontmatter.loads(raw)

    content_hash = hashlib.sha256(raw.encode("utf-8")).hexdigest()
    title = post.metadata.get("title") or _first_h1(post.content) or file_path.stem
    tags = post.metadata.get("tags") or post.metadata.get("topics") or []
    if isinstance(tags, str):
        tags = [tags]

    relative_path = str(file_path.relative_to(root))

    return ParsedDocument(
        source_path=relative_path,
        content_hash=content_hash,
        title=title,
        tags=tags,
        body=post.content,
        front_matter=post.metadata,
    )


GENERIC_TITLE_PATTERNS = (
    "relatório de análise",
    "relatório de ingestão",
    "página de erro",
    "documentação não encontrada",
    "backstage techdocs",
)

ANALYSIS_PREFIXES = (
    "análise estruturada da transcrição —",
    "análise funcional e técnica —",
    "análise estruturada —",
    "análise da transcrição —",
    "análise técnica —",
    "análise funcional —",
    "análise estruturada:",
    "relatório de análise:",
    "análise da transcrição:",
    "análise sobre ",
    "análise da ",
    "análise de ",
    "análise do ",
    "análise dos ",
    "análise das ",
)


def _clean_heading(heading: str) -> str:
    cleaned = heading.strip()
    lower = cleaned.lower()
    for prefix in ANALYSIS_PREFIXES:
        if lower.startswith(prefix):
            cleaned = cleaned[len(prefix):].strip()
            lower = cleaned.lower()
    if cleaned and cleaned[0].islower():
        cleaned = cleaned[0].upper() + cleaned[1:]
    return cleaned


def _first_h1(body: str) -> str | None:
    for line in body.splitlines():
        stripped = line.strip()
        if stripped.startswith("# "):
            candidate = stripped[2:].strip()
            candidate_lower = candidate.lower()
            if any(pat in candidate_lower for pat in GENERIC_TITLE_PATTERNS):
                continue
            cleaned = _clean_heading(candidate)
            if cleaned:
                return cleaned
    return None


def discover_markdown_files(root: Path) -> list[Path]:
    return sorted(p for p in root.rglob("*.md") if p.is_file())
