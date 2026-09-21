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
    tags = post.metadata.get("tags") or []
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


def _first_h1(body: str) -> str | None:
    for line in body.splitlines():
        stripped = line.strip()
        if stripped.startswith("# "):
            return stripped[2:].strip()
    return None


def discover_markdown_files(root: Path) -> list[Path]:
    return sorted(p for p in root.rglob("*.md") if p.is_file())
