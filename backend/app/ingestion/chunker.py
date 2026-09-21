import re
from dataclasses import dataclass, field

HEADER_RE = re.compile(r"^(#{1,6})\s+(.*)$")

MAX_CHUNK_CHARS = 3000
OVERLAP_CHARS = 400


@dataclass
class Chunk:
    text: str
    breadcrumb: list[str] = field(default_factory=list)
    chunk_index: int = 0


def chunk_by_headers(body: str, doc_title: str) -> list[Chunk]:
    """Split markdown into sections following the header hierarchy, then
    fall back to size-based splitting for oversized sections."""
    sections = _split_into_sections(body, doc_title)
    chunks: list[Chunk] = []
    for breadcrumb, text in sections:
        for piece in _split_by_size(text):
            chunks.append(Chunk(text=piece, breadcrumb=breadcrumb))

    for i, chunk in enumerate(chunks):
        chunk.chunk_index = i
    return chunks


def _split_into_sections(body: str, doc_title: str) -> list[tuple[list[str], str]]:
    lines = body.splitlines()
    sections: list[tuple[list[str], str]] = []

    stack: list[tuple[int, str]] = []
    current_lines: list[str] = []

    def flush():
        text = "\n".join(current_lines).strip()
        if text:
            header_titles = [title for _, title in stack]
            if header_titles and header_titles[0] == doc_title:
                breadcrumb = header_titles
            else:
                breadcrumb = [doc_title] + header_titles
            sections.append((breadcrumb, text))

    for line in lines:
        match = HEADER_RE.match(line)
        if match:
            flush()
            current_lines = []
            level = len(match.group(1))
            title = match.group(2).strip()
            while stack and stack[-1][0] >= level:
                stack.pop()
            stack.append((level, title))
        else:
            current_lines.append(line)

    flush()

    if not sections:
        sections = [([doc_title], body.strip())]

    return sections


def _split_by_size(text: str) -> list[str]:
    if len(text) <= MAX_CHUNK_CHARS:
        return [text]

    pieces = []
    start = 0
    while start < len(text):
        end = min(start + MAX_CHUNK_CHARS, len(text))
        pieces.append(text[start:end])
        if end == len(text):
            break
        start = end - OVERLAP_CHARS
    return pieces
