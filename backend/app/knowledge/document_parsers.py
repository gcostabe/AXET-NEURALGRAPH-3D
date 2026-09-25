"""Extratores e Parsers de Documentos em Memória para Anexos do Chat.

Suporta:
- Imagens: PNG, JPEG, WEBP (limite de 3 imagens por interação, compressão inteligente Pillow)
- PDF: extração de texto por páginas com contagem e limite seguro
- Word (.docx): extração de títulos, parágrafos e tabelas
- PowerPoint (.pptx): extração de títulos, conteúdo de slides e notas do apresentador
"""

from __future__ import annotations

import base64
import io
import logging
from typing import Any

from PIL import Image

logger = logging.getLogger(__name__)

# Limites de Segurança
MAX_IMAGES_PER_REQUEST = 3
MAX_CHARS_PER_DOCUMENT = 45000  # ~12.000 tokens por documento anexado
MAX_IMAGE_DIMENSION = 1920


def process_image_attachment(
    name: str,
    mime_type: str,
    data_bytes: bytes,
) -> dict[str, Any]:
    """Valida, redimensiona proporcionalmente (max 1920x1080) e converte imagem em DataURL Base64."""
    try:
        img = Image.open(io.BytesIO(data_bytes))
        orig_format = img.format or "JPEG"

        # Converte para RGB se necessário (ex: PNG com canal alfa para JPEG ou formatos especiais)
        if img.mode in ("RGBA", "P") and orig_format.upper() in ("JPEG", "JPG"):
            img = img.convert("RGB")

        # Downscaling proporcional se exceder limite
        width, height = img.size
        if width > MAX_IMAGE_DIMENSION or height > MAX_IMAGE_DIMENSION:
            img.thumbnail((MAX_IMAGE_DIMENSION, MAX_IMAGE_DIMENSION), Image.Resampling.LANCZOS)
            logger.info(f"[document_parsers] Imagem '{name}' redimensionada de {width}x{height} para {img.size}")

        out_buffer = io.BytesIO()
        save_format = "PNG" if "png" in mime_type.lower() else "JPEG"
        img.save(out_buffer, format=save_format, quality=85, optimize=True)
        compressed_bytes = out_buffer.getvalue()

        b64 = base64.b64encode(compressed_bytes).decode("utf-8")
        clean_mime = f"image/{save_format.lower()}"
        data_url = f"data:{clean_mime};base64,{b64}"

        return {
            "name": name,
            "type": "image",
            "mime_type": clean_mime,
            "width": img.size[0],
            "height": img.size[1],
            "size_bytes": len(compressed_bytes),
            "data_url": data_url,
        }
    except Exception as exc:
        logger.error(f"[document_parsers] Falha ao processar imagem '{name}': {exc}")
        raise ValueError(f"Não foi possível processar a imagem '{name}': {exc}")


def extract_text_from_pdf(name: str, data_bytes: bytes) -> dict[str, Any]:
    """Extrai texto e metadados de documento PDF em memória via pypdf."""
    try:
        from pypdf import PdfReader

        reader = PdfReader(io.BytesIO(data_bytes))
        num_pages = len(reader.pages)
        pages_text: list[str] = []
        total_chars = 0
        truncated = False

        for idx, page in enumerate(reader.pages):
            txt = page.extract_text() or ""
            if not txt.strip():
                continue
            page_header = f"--- [Página {idx + 1}/{num_pages}] ---\n"
            page_block = page_header + txt.strip() + "\n"

            if total_chars + len(page_block) > MAX_CHARS_PER_DOCUMENT:
                remaining = MAX_CHARS_PER_DOCUMENT - total_chars
                if remaining > 0:
                    pages_text.append(page_block[:remaining])
                truncated = True
                break

            pages_text.append(page_block)
            total_chars += len(page_block)

        full_text = "\n".join(pages_text).strip()
        if truncated:
            full_text += f"\n\n⚠️ *[Aviso: Documento extenso. Leitura limitada às primeiras páginas (~{total_chars} caracteres) para preservar o contexto da conversa]*."

        return {
            "name": name,
            "type": "pdf",
            "pages": num_pages,
            "text": full_text or "(Documento PDF sem texto legível ou escaneado como imagem pura)",
            "total_chars": len(full_text),
            "truncated": truncated,
        }
    except Exception as exc:
        logger.error(f"[document_parsers] Falha ao extrair PDF '{name}': {exc}")
        raise ValueError(f"Erro ao extrair conteúdo do PDF '{name}': {exc}")


def extract_text_from_docx(name: str, data_bytes: bytes) -> dict[str, Any]:
    """Extrai texto estruturado, títulos e tabelas de arquivo Word (.docx)."""
    try:
        from docx import Document

        doc = Document(io.BytesIO(data_bytes))
        lines: list[str] = []
        total_chars = 0
        truncated = False

        # 1. Parágrafos
        for p in doc.paragraphs:
            txt = p.text.strip()
            if not txt:
                continue
            # Destaca cabeçalhos se o estilo for Heading
            style_name = getattr(p.style, "name", "").lower()
            if "heading" in style_name or "título" in style_name:
                line = f"\n### {txt}"
            else:
                line = txt

            if total_chars + len(line) > MAX_CHARS_PER_DOCUMENT:
                truncated = True
                break
            lines.append(line)
            total_chars += len(line)

        # 2. Tabelas
        if not truncated and doc.tables:
            for t_idx, table in enumerate(doc.tables):
                table_lines = [f"\n[Tabela {t_idx + 1}]:"]
                for row in table.rows:
                    row_cells = [cell.text.strip().replace("\n", " ") for cell in row.cells]
                    table_lines.append(" | ".join(row_cells))
                tbl_txt = "\n".join(table_lines)
                if total_chars + len(tbl_txt) > MAX_CHARS_PER_DOCUMENT:
                    truncated = True
                    break
                lines.append(tbl_txt)
                total_chars += len(tbl_txt)

        full_text = "\n".join(lines).strip()
        if truncated:
            full_text += f"\n\n⚠️ *[Aviso: Documento DOCX extenso. Leitura limitada aos primeiros ~{total_chars} caracteres]*."

        return {
            "name": name,
            "type": "docx",
            "text": full_text or "(Documento Word sem texto)",
            "total_chars": len(full_text),
            "truncated": truncated,
        }
    except Exception as exc:
        logger.error(f"[document_parsers] Falha ao extrair DOCX '{name}': {exc}")
        raise ValueError(f"Erro ao extrair conteúdo do DOCX '{name}': {exc}")


def extract_text_from_pptx(name: str, data_bytes: bytes) -> dict[str, Any]:
    """Extrai texto de slides, títulos e notas do apresentador de PowerPoint (.pptx)."""
    try:
        from pptx import Presentation

        prs = Presentation(io.BytesIO(data_bytes))
        slides_text: list[str] = []
        total_chars = 0
        truncated = False

        for idx, slide in enumerate(prs.slides):
            slide_header = f"--- [Slide {idx + 1}/{len(prs.slides)}] ---"
            slide_lines = [slide_header]

            for shape in slide.shapes:
                if hasattr(shape, "text") and shape.text.strip():
                    slide_lines.append(shape.text.strip())

            # Notas do orador / apresentador
            if slide.has_notes_slide and slide.notes_slide.notes_text_frame:
                notes = slide.notes_slide.notes_text_frame.text.strip()
                if notes:
                    slide_lines.append(f"[Notas do Orador]: {notes}")

            block = "\n".join(slide_lines) + "\n"
            if total_chars + len(block) > MAX_CHARS_PER_DOCUMENT:
                truncated = True
                break

            slides_text.append(block)
            total_chars += len(block)

        full_text = "\n".join(slides_text).strip()
        if truncated:
            full_text += f"\n\n⚠️ *[Aviso: Apresentação PPTX extensa. Leitura limitada aos primeiros ~{total_chars} caracteres]*."

        return {
            "name": name,
            "type": "pptx",
            "slides_count": len(prs.slides),
            "text": full_text or "(Apresentação PowerPoint sem texto legível nos slides)",
            "total_chars": len(full_text),
            "truncated": truncated,
        }
    except Exception as exc:
        logger.error(f"[document_parsers] Falha ao extrair PPTX '{name}': {exc}")
        raise ValueError(f"Erro ao extrair conteúdo do PPTX '{name}': {exc}")


def parse_attachment(
    name: str,
    mime_type: str,
    data_bytes: bytes,
) -> dict[str, Any]:
    """Roteador principal de arquivos anexados no chat."""
    lower_name = name.lower()
    lower_mime = (mime_type or "").lower()

    if any(lower_name.endswith(ext) for ext in [".png", ".jpg", ".jpeg", ".webp"]) or "image" in lower_mime:
        return process_image_attachment(name, lower_mime, data_bytes)

    if lower_name.endswith(".pdf") or "pdf" in lower_mime:
        return extract_text_from_pdf(name, data_bytes)

    if lower_name.endswith(".docx") or "word" in lower_mime or "officedocument.wordprocessingml" in lower_mime:
        return extract_text_from_docx(name, data_bytes)

    if lower_name.endswith(".pptx") or "presentation" in lower_mime or "officedocument.presentationml" in lower_mime:
        return extract_text_from_pptx(name, data_bytes)

    # Texto puro / Markdown / CSV
    if any(lower_name.endswith(ext) for ext in [".txt", ".md", ".csv", ".json", ".log"]):
        try:
            txt = data_bytes.decode("utf-8", errors="replace").strip()
            truncated = len(txt) > MAX_CHARS_PER_DOCUMENT
            clean_txt = txt[:MAX_CHARS_PER_DOCUMENT]
            if truncated:
                clean_txt += "\n\n⚠️ *[Texto truncado para respeitar limites de contexto]*."
            return {
                "name": name,
                "type": "text",
                "text": clean_txt,
                "total_chars": len(clean_txt),
                "truncated": truncated,
            }
        except Exception:
            pass

    raise ValueError(f"Tipo de arquivo não suportado: '{name}'. Suportados: PDF, DOCX, PPTX e imagens (PNG, JPG, WEBP).")
