"""Gerenciador e Parser do Glossário Canônico De ➔ Para e Matriz de Impacto Regulatório.

Permite leitura estruturada, inclusão, edição e remoção de pares de equivalência
(jargão operacional -> termo técnico formal) diretamente no documento Markdown
canônico em `data/sources/09. Regulacao e Legislacao/`.
"""

import logging
from pathlib import Path
import re
from typing import Any, Dict, List, Optional
import frontmatter

from app.config import settings

logger = logging.getLogger("rag_reef.glossary")

GLOSSARY_FILENAME = "06-glossario-de-para-jargoes-e-termos-tecnicos-seguros.md"
REGULATORY_IMPACT_FILENAME = "00-matriz-impacto-regulatorio-operacao-reef.md"


def get_legislation_root_dir() -> Path:
    """Retorna o caminho do diretório de legislação ativa."""
    return Path(settings.sources_root) / "09. Regulacao e Legislacao"


def find_glossary_file() -> Optional[Path]:
    """Localiza o arquivo markdown do glossário ativo."""
    root = get_legislation_root_dir()
    candidate = root / GLOSSARY_FILENAME
    if candidate.exists():
        return candidate
    
    # Busca recursiva se estiver dentro de uma subpasta de país
    for p in root.rglob(GLOSSARY_FILENAME):
        if p.is_file():
            return p
    return None


def find_regulatory_impact_file() -> Optional[Path]:
    """Localiza o arquivo markdown da matriz de impacto regulatório ativa."""
    root = get_legislation_root_dir()
    candidate = root / REGULATORY_IMPACT_FILENAME
    if candidate.exists():
        return candidate
    
    for p in root.rglob(REGULATORY_IMPACT_FILENAME):
        if p.is_file():
            return p
    return None


def _clean_markdown_bold(text: str) -> str:
    """Remove marcadores de negrito ** ou __ de um texto."""
    text = text.strip()
    if text.startswith("**") and text.endswith("**") and len(text) >= 4:
        return text[2:-2].strip()
    if text.startswith("__") and text.endswith("__") and len(text) >= 4:
        return text[2:-2].strip()
    return text


def load_glossary_pairs() -> List[Dict[str, Any]]:
    """Lê e faz o parse de todos os pares de equivalência da tabela Markdown."""
    file_path = find_glossary_file()
    if not file_path or not file_path.exists():
        logger.warning("Arquivo de glossário não encontrado em %s", file_path)
        return []

    try:
        content = file_path.read_text(encoding="utf-8", errors="ignore")
    except Exception as exc:
        logger.error("Erro ao ler %s: %s", file_path, exc)
        return []

    pairs: List[Dict[str, Any]] = []
    lines = content.splitlines()
    in_table = False

    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue

        if stripped.startswith("| # | Expressão / Jargão Usual (De)"):
            in_table = True
            continue

        if in_table and stripped.startswith("| :---"):
            continue

        if in_table:
            # Fim da tabela se encontrar título de seção ou separador não-tabela
            if stripped.startswith("## ") or stripped.startswith("---"):
                break
            if not stripped.startswith("|"):
                continue

            parts = [p.strip() for p in stripped.split("|")]
            # Uma linha "| col1 | col2 | col3 | col4 | col5 |" gera lista com vazios no início/fim
            valid_parts = [p for i, p in enumerate(parts) if i not in (0, len(parts) - 1)] if len(parts) >= 6 else []
            if len(valid_parts) >= 5:
                try:
                    num_id = int(re.sub(r"[^\d]", "", valid_parts[0]))
                except Exception:
                    num_id = len(pairs) + 1

                jargon = _clean_markdown_bold(valid_parts[1])
                formal = _clean_markdown_bold(valid_parts[2])
                definition = valid_parts[3]
                legal_basis = valid_parts[4]

                pairs.append({
                    "id": num_id,
                    "jargon": jargon,
                    "formal_term": formal,
                    "definition": definition,
                    "legal_basis": legal_basis,
                })

    return pairs


def save_glossary_pairs(pairs: List[Dict[str, Any]], country_name: str = "Brasil") -> bool:
    """Regrava a tabela no arquivo Markdown preservando front-matter e seções conceituais."""
    file_path = find_glossary_file()
    if not file_path:
        root = get_legislation_root_dir()
        root.mkdir(parents=True, exist_ok=True)
        file_path = root / GLOSSARY_FILENAME

    # Conteúdo padrão caso o arquivo não exista
    original_text = ""
    if file_path.exists():
        original_text = file_path.read_text(encoding="utf-8", errors="ignore")

    # Monta a nova tabela Markdown
    table_lines = [
        "| # | Expressão / Jargão Usual (De) | Termo Técnico / Regulatório Formal (Para) | Definição Operacional e Jurídica | Fundamentação Legal / SUSEP |",
        "| :--- | :--- | :--- | :--- | :--- |",
    ]

    for idx, p in enumerate(pairs, start=1):
        num_str = str(idx)
        jargon = str(p.get("jargon", "")).strip().replace("|", "\\|")
        formal = str(p.get("formal_term", "")).strip().replace("|", "\\|")
        definition = str(p.get("definition", "")).strip().replace("|", "\\|")
        legal_basis = str(p.get("legal_basis", "")).strip().replace("|", "\\|")
        table_lines.append(f"| {num_str} | **{jargon}** | **{formal}** | {definition} | {legal_basis} |")

    new_table_str = "\n".join(table_lines)

    # Identifica início e fim da tabela no arquivo original
    match_start = re.search(r"## 1\. Tabela Mestra[^\n]*\n+", original_text)
    if match_start:
        pre_table = original_text[: match_start.end()]
        post_table_match = re.search(r"\n+## 2\. Detalhamento Macro", original_text)
        if post_table_match:
            post_table = original_text[post_table_match.start() :]
        else:
            post_table = "\n"
        final_text = f"{pre_table}\n{new_table_str}\n\n---\n{post_table.lstrip()}"
    else:
        # Cria documento completo se não tinha cabeçalho reconhecido
        final_text = (
            f"---\n"
            f"title: \"Glossário Canônico De ➔ Para: Jargões de Mercado vs Terminologia Técnica Oficial de Seguros\"\n"
            f"country: \"{country_name}\"\n"
            f"jurisdiction: \"BR\"\n"
            f"official_source: \"CNseg / SUSEP / Código Civil Brasileiro\"\n"
            f"last_updated: \"2026-09-22\"\n"
            f"topics: [\"Glossário\", \"De-Para\", \"Jargões de Seguros\", \"Termos Técnicos\", \"SUSEP\", \"{country_name}\"]\n"
            f"summary: \"Dicionário de equivalência 'De ➔ Para' traduzindo jargões do dia a dia para a terminologia oficial de seguros.\"\n"
            f"---\n\n"
            f"# Glossário Canônico De ➔ Para: Jargões de Mercado vs Terminologia Técnica Oficial de Seguros\n\n"
            f"> **Objetivo Cognitivo**: Servir como âncora lexical e thesaurus semântico no RAG Local Reef.\n\n"
            f"---\n\n"
            f"## 1. Tabela Mestra de Tradução: De (Jargão / Coloquial) ➔ Para (Termo Técnico Oficial)\n\n"
            f"{new_table_str}\n"
        )

    try:
        file_path.write_text(final_text, encoding="utf-8")
        logger.info("Glossário salvo em %s (%d pares)", file_path, len(pairs))
        
        # Também atualiza espelho na subpasta de país se existir
        root = get_legislation_root_dir()
        country_dir = root / country_name
        if country_dir.is_dir():
            mirror_path = country_dir / GLOSSARY_FILENAME
            mirror_path.write_text(final_text, encoding="utf-8")
            logger.info("Espelho do glossário atualizado em %s", mirror_path)

        return True
    except Exception as exc:
        logger.error("Erro ao gravar glossário em %s: %s", file_path, exc)
        return False


def get_regulatory_impact_data() -> Dict[str, Any]:
    """Recupera o documento da Matriz de Impacto Regulatório e seus metadados."""
    file_path = find_regulatory_impact_file()
    if not file_path or not file_path.exists():
        return {
            "title": "Matriz de Impacto Regulatório",
            "country": "Brasil",
            "last_updated": "2026-09-22",
            "content": "# Matriz de Impacto Regulatório não encontrada\nExecute a sincronização na aba Legislação.",
            "modules_summary": [],
        }

    try:
        raw = file_path.read_text(encoding="utf-8", errors="ignore")
        post = frontmatter.loads(raw)
        title = post.metadata.get("title", "Matriz Canônica de Impacto Regulatório no Sistema REEF")
        country = post.metadata.get("country", "Brasil")
        last_updated = post.metadata.get("last_updated", "")

        # Resumo rápido dos módulos detectados
        modules = [
            {"id": "REEF-SIN", "name": "Módulo de Sinistros", "rule": "Prazo de 30 dias corridos para liquidação (Circ. SUSEP 621), suspensão por docs complementares e perda total a 75%."},
            {"id": "REEF-EMI", "name": "Módulo de Emissão", "rule": "Prazo de 15 dias para recusa da proposta com aceitação tácita e vedação de cancelamento sumário sem interpelação (Art. 763 CC)."},
            {"id": "REEF-TER", "name": "Módulo de Terceiros", "rule": "Sub-rogação legal automática (Art. 786 CC) e vedação a ação regressiva contra parentes e cônjuge."},
            {"id": "REEF-TES", "name": "Módulo de Tesouraria", "rule": "Provisões atuariais matemáticas obrigatórias (IBNR, IBNER, PPNG) e restituição proporcional de prêmio pro rata."},
            {"id": "REEF-OUV", "name": "Ouvidoria & Conduta", "rule": "SLA obrigatório de 10 dias úteis para resposta conclusiva e APIs seguras Open Insurance (OPIN)."},
        ]

        return {
            "title": title,
            "country": country,
            "last_updated": last_updated,
            "content": post.content,
            "modules_summary": modules,
        }
    except Exception as exc:
        logger.error("Erro ao carregar matriz de impacto: %s", exc)
        return {
            "title": "Erro ao carregar Matriz de Impacto",
            "country": "",
            "last_updated": "",
            "content": str(exc),
            "modules_summary": [],
        }
