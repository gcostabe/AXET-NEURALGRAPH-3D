"""Módulo de Extração de Entidades Nomeadas (NER) Leve e Determinístico.

Opera com latência ultrabaixa (<30ms por documento) e 0 chamadas a modelos externos,
extraindo padrões normativos, códigos de sistemas e cláusulas do ecossistema corporativo.
"""

from __future__ import annotations

import re
import unicodedata
from dataclasses import dataclass


@dataclass
class ExtractedEntity:
    name: str
    entity_type: str  # REGULATORIO, SISTEMA, MODULO, CLAUSULA, CONCEITO
    canonical_id: str
    count: int = 1
    context_sample: str = ""


def normalize_canonical_id(text: str) -> str:
    """Normaliza texto para chave canônica: CAIXA_ALTA_SEM_ACENTOS_E_SIMBOLOS."""
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("utf-8")
    text = re.sub(r"[^\w\d]+", "_", text).strip("_").upper()
    return text


# 1. Padrões Regex Estruturados por Categoria
ENTITY_PATTERNS: list[tuple[str, str, re.Pattern]] = [
    # Regulatório: SUSEP, CNSP, Leis, Decretos e Código Civil
    (
        "REGULATORIO",
        r"(?:Circular\s+(?:SUSEP\s+)?(?:n[ºo]\s*)?(\d{2,4}(?:/\d{2,4})?))",
        re.compile(r"\bCircular\s+(?:SUSEP\s+)?(?:n[ºo]\s*)?(\d{2,4}(?:/\d{2,4})?)\b", re.IGNORECASE),
    ),
    (
        "REGULATORIO",
        r"(?:Resolu[çc][ãa]o\s+(?:CNSP\s+)?(?:n[ºo]\s*)?(\d{2,4}(?:/\d{2,4})?))",
        re.compile(r"\bResolu[çc][ãa]o\s+(?:CNSP\s+)?(?:n[ºo]\s*)?(\d{2,4}(?:/\d{2,4})?)\b", re.IGNORECASE),
    ),
    (
        "REGULATORIO",
        r"(?:Lei\s+(?:n[ºo]\s*)?(\d{1,5}(?:\.\d{3})*(?:/\d{2,4})?))",
        re.compile(r"\bLei\s+(?:n[ºo]\s*)?(\d{1,5}(?:\.\d{3})*(?:/\d{2,4})?)\b", re.IGNORECASE),
    ),
    (
        "REGULATORIO",
        r"(?:Decreto\s+(?:n[ºo]\s*)?(\d{1,5}(?:\.\d{3})*(?:/\d{2,4})?))",
        re.compile(r"\bDecreto\s+(?:n[ºo]\s*)?(\d{1,5}(?:\.\d{3})*(?:/\d{2,4})?)\b", re.IGNORECASE),
    ),
    (
        "REGULATORIO",
        r"(?:Art(?:igo|\.)\s+(\d+[\w\-]*)\s*(?:do\s+)?(?:CC|C[óo]digo\s+Civil))",
        re.compile(r"\bArt(?:igo|\.)\s+(\d+[\w\-]*)\s*(?:do\s+)?(?:CC|C[óo]digo\s+Civil)\b", re.IGNORECASE),
    ),

    # Sistemas e Códigos Técnicos
    (
        "SISTEMA",
        r"\b(TRON[\_\-]?\d{1,4})\b",
        re.compile(r"\b(TRON[\_\-]?\d{1,4})\b", re.IGNORECASE),
    ),
    (
        "SISTEMA",
        r"\b(DEF[\_\-]?\d{1,4})\b",
        re.compile(r"\b(DEF[\_\-]?\d{1,4})\b", re.IGNORECASE),
    ),
    (
        "SISTEMA",
        r"\b(BATCH[\_\-]?\d{1,4})\b",
        re.compile(r"\b(BATCH[\_\-]?\d{1,4})\b", re.IGNORECASE),
    ),
    (
        "SISTEMA",
        r"\b(API[\_\-][A-Z0-9\_]+)\b",
        re.compile(r"\b(API[\_\-][A-Za-z0-9\_]{3,30})\b", re.IGNORECASE),
    ),

    # Módulos Estruturais do REEF
    (
        "MODULO",
        r"\b(REEF\.(?:Core|Academy|Billing|Claims|Gateway|Auth))\b",
        re.compile(r"\b(REEF\.(?:Core|Academy|Billing|Claims|Gateway|Auth))\b", re.IGNORECASE),
    ),
    (
        "MODULO",
        r"\b(M[óo]dulo\s+de\s+(?:Sinistros?|Atu[áa]ria|Tarifa[çc][ãa]o|Contratual|Auditoria|Apolice))\b",
        re.compile(r"\b(M[óo]dulo\s+de\s+(?:Sinistros?|Atu[áa]ria|Tarifa[çc][ãa]o|Contratual|Auditoria|Apolice))\b", re.IGNORECASE),
    ),

    # Cláusulas Contratuais e Regras de Negócio
    (
        "CLAUSULA",
        r"\b(Cl[áa]usula\s+\d+(?:\.\d+)*)\b",
        re.compile(r"\b(Cl[áa]usula\s+\d+(?:\.\d+)*)\b", re.IGNORECASE),
    ),
    (
        "CLAUSULA",
        r"\b(Condi[çc][õo]es\s+(?:Gerais|Especiais|Particulares))\b",
        re.compile(r"\b(Condi[çc][õo]es\s+(?:Gerais|Especiais|Particulares))\b", re.IGNORECASE),
    ),
    (
        "CLAUSULA",
        r"\b(Franquia\s+(?:Reduzida|Obrigat[óo]ria|Normal|Isenta|Diferenciada))\b",
        re.compile(r"\b(Franquia\s+(?:Reduzida|Obrigat[óo]ria|Normal|Isenta|Diferenciada))\b", re.IGNORECASE),
    ),
]


def extract_entities_from_text(text: str, max_samples_chars: int = 140) -> list[ExtractedEntity]:
    """Varre o texto utilizando expressões regulares compiladas de alta performance e
    retorna a lista de entidades detectadas agrupadas e contadas."""
    if not text:
        return []

    found_map: dict[str, ExtractedEntity] = {}

    for entity_type, _, pattern in ENTITY_PATTERNS:
        for match in pattern.finditer(text):
            full_match = match.group(0).strip()
            # Gera identificador canônico estável
            canonical = normalize_canonical_id(full_match)

            if not canonical:
                continue

            # Context sample (amostra ao redor da menção)
            start = max(0, match.start() - 40)
            end = min(len(text), match.end() + 40)
            sample = text[start:end].replace("\n", " ").strip()

            if canonical in found_map:
                found_map[canonical].count += 1
            else:
                found_map[canonical] = ExtractedEntity(
                    name=full_match,
                    entity_type=entity_type,
                    canonical_id=canonical,
                    count=1,
                    context_sample=sample[:max_samples_chars],
                )

    return list(found_map.values())


def detect_entities_in_query(query: str) -> list[ExtractedEntity]:
    """Identifica se uma consulta de usuário cita alguma entidade regulatória, código ou cláusula."""
    return extract_entities_from_text(query)
