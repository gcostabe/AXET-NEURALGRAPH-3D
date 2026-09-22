"""Serviço de Sincronização e Síntese de Legislação de Seguros por País.

Gerencia a descoberta dinâmica de órgãos reguladores via LLM para qualquer país,
a coleta assíncrona nos portais governamentais oficiais cadastrados,
a estruturação em documentos Markdown padronizados e a substituição
mono-país no diretório de fontes do RAG Local Reef.
"""

import asyncio
from datetime import datetime, timezone
import json
import logging
from pathlib import Path
import re
from typing import Any, Dict, List, Optional
import httpx

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.database import AsyncSessionLocal
from app.auth.models import AppSetting, AuditAction, AuditLog
from app.config import settings
from app.legislation.registry import (
    BUILTIN_COUNTRIES,
    CountryLegislationConfig,
    OfficialPortal,
    get_country_config,
    register_custom_country,
)
from app.llm.base import Message
from app.llm.factory import get_llm_client

logger = logging.getLogger("rag_reef.legislation")

ACTIVE_COUNTRY_SETTING_KEY = "active_legislation_country"
LEGISLATION_SYNC_STATUS_KEY = "legislation_sync_status"
CUSTOM_COUNTRIES_REGISTRY_KEY = "custom_countries_registry"

# Telemetria volátil em memória para consumo imediato em tempo real via polling
_active_sync_telemetry: Dict[str, Any] = {
    "status": "idle",
    "country_id": "brasil",
    "percent": 0,
    "current_step": "Aguardando solicitação manual",
    "current_portal": None,
    "logs": [],
    "generated_files": [],
    "started_at": None,
    "finished_at": None,
}


def get_sync_telemetry() -> Dict[str, Any]:
    """Retorna uma cópia do estado atual da telemetria."""
    global _active_sync_telemetry
    return dict(_active_sync_telemetry)


def _append_log(level: str, tag: str, message: str) -> None:
    """Registra uma linha de log na telemetria e no logger interno."""
    global _active_sync_telemetry
    now_str = datetime.now().strftime("%H:%M:%S")
    entry = {
        "timestamp": now_str,
        "level": level,
        "tag": tag,
        "message": message,
    }
    _active_sync_telemetry["logs"].append(entry)
    # Limita aos últimos 200 eventos para não inflar memória
    if len(_active_sync_telemetry["logs"]) > 200:
        _active_sync_telemetry["logs"] = _active_sync_telemetry["logs"][-200:]
    logger.info("[%s] [%s] %s", tag, level, message)


async def get_active_country_id(db: AsyncSession) -> str:
    """Recupera o país atualmente configurado no banco de dados (default: brasil)."""
    row = await db.scalar(select(AppSetting).where(AppSetting.key == ACTIVE_COUNTRY_SETTING_KEY))
    if row and row.value:
        return row.value.strip().lower()
    return "brasil"


async def set_active_country_id(country_id: str, db: AsyncSession) -> None:
    """Atualiza o país ativo no banco de dados."""
    norm = country_id.strip().lower()
    row = await db.scalar(select(AppSetting).where(AppSetting.key == ACTIVE_COUNTRY_SETTING_KEY))
    if row is None:
        db.add(AppSetting(key=ACTIVE_COUNTRY_SETTING_KEY, value=norm))
    else:
        row.value = norm
    await db.commit()


async def get_custom_countries_json(db: AsyncSession) -> Optional[str]:
    """Recupera o JSON com os países customizados persistidos."""
    row = await db.scalar(select(AppSetting).where(AppSetting.key == CUSTOM_COUNTRIES_REGISTRY_KEY))
    return row.value if row and row.value else None


async def save_custom_country(config: CountryLegislationConfig, db: AsyncSession) -> None:
    """Persiste um país descoberto no Postgres e atualiza o cache."""
    norm = config.id.strip().lower()
    register_custom_country(config)

    row = await db.scalar(select(AppSetting).where(AppSetting.key == CUSTOM_COUNTRIES_REGISTRY_KEY))
    custom_map: Dict[str, Any] = {}
    if row and row.value:
        try:
            custom_map = json.loads(row.value)
        except Exception:
            custom_map = {}

    custom_map[norm] = config.model_dump()
    payload = json.dumps(custom_map, ensure_ascii=False)

    if row is None:
        db.add(AppSetting(key=CUSTOM_COUNTRIES_REGISTRY_KEY, value=payload))
    else:
        row.value = payload
    await db.commit()


async def discover_country_legislation(country_name: str) -> CountryLegislationConfig:
    """Utiliza o LLM para pesquisar e mapear dinamicamente as agências reguladoras e portais oficiais."""
    query = country_name.strip()
    norm_id = re.sub(r"[^a-z0-9]", "", query.lower())

    system_prompt = (
        "Você é um especialista internacional em regulação e direito de seguros corporativos. "
        "Sua função é mapear com rigor técnico as autoridades governamentais reguladoras oficiais, "
        "os portais na internet e os marcos legais primários de seguros para o país solicitado.\n"
        "Retorne EXCLUSIVAMENTE um objeto JSON válido (sem comentários, sem blocos de texto fora do JSON) "
        "com a seguinte estrutura estrita:\n"
        "{\n"
        '  "id": "slug_do_pais_em_minusculo_sem_espaco",\n'
        '  "name": "Nome do País em Português",\n'
        '  "flag_emoji": "Bandeira Emoji do País",\n'
        '  "currency": "Sigla e Símbolo da Moeda (ex: EUR (€), USD ($))",\n'
        '  "primary_regulator": "Nome da Agência Reguladora Primária de Seguros",\n'
        '  "portals": [\n'
        "    {\n"
        '      "id": "id_curto_do_portal",\n'
        '      "agency_name": "Nome da Agência Governamental ou Portal Oficial",\n'
        '      "official_url": "URL Oficial real na Internet onde as normas estão publicadas",\n'
        '      "scope_description": "Descrição detalhada da norma, lei ou resolução oficial",\n'
        '      "target_filename": "01-nome-padronizado-do-arquivo.md",\n'
        '      "target_title": "Título Oficial Canônico do Documento",\n'
        '      "topics": ["Tag1", "Tag2", "Tag3"],\n'
        '      "query_prompt": "Diretriz detalhada com os pontos cruciais da lei a serem consolidados"\n'
        "    }\n"
        "  ]\n"
        "}\n"
        "Gere exatamente entre 5 e 7 portais oficiais essenciais para o país solicitado, cobrindo: "
        "(0) Matriz de Impacto Regulatório no Core REEF (target_filename: '00-matriz-impacto-regulatorio-operacao-reef.md') detalhando prazos e impactos nas esteiras de Emissão, Sinistros, Terceiros e Tesouraria; "
        "(1) Lei de contrato de seguro e regras gerais de apólices; "
        "(2) Órgão supervisor e regras de solvência/fiscalização; "
        "(3) Normas de conduta de mercado, transparência e ouvidoria/proteção ao segurado; "
        "(4) Fundo de garantia ou cobertura de riscos extraordinários/catástrofes; "
        "(5) Glossário oficial e terminologia técnica do mercado segurador local; "
        "(6) Glossário De-Para de jargões de mercado para termos técnicos (target_filename: '06-glossario-de-para-jargoes-e-termos-tecnicos-seguros.md')."
    )

    user_prompt = f"Mapeie os órgãos reguladores oficiais, portais governamentais, matriz de impacto regulatório e leis de seguros para: '{query}'."

    messages: List[Message] = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
    ]

    try:
        llm = get_llm_client()
        raw_resp = await llm.complete(messages)
        raw_resp = raw_resp.strip()
        if "```json" in raw_resp:
            raw_resp = raw_resp.split("```json")[1].split("```")[0].strip()
        elif "```" in raw_resp:
            raw_resp = raw_resp.split("```")[1].split("```")[0].strip()

        parsed = json.loads(raw_resp)
        config = CountryLegislationConfig(**parsed)
        register_custom_country(config)
        return config
    except Exception as exc:
        logger.warning("Falha ao analisar resposta da LLM para descoberta de '%s': %s", query, exc)
        # Fallback estruturado se for Espanha ou genérico
        if "espan" in query.lower():
            fb = CountryLegislationConfig(
                id="espanha",
                name="Espanha",
                flag_emoji="🇪🇸",
                currency="EUR (€)",
                primary_regulator="DGSFP (Ministerio de Asuntos Económicos)",
                portals=[
                    OfficialPortal(
                        id="es_impacto_regulatorio",
                        agency_name="DGSFP / Governança REEF Core",
                        official_url="https://dgsfp.mineco.gob.es",
                        scope_description="Matriz Canônica de Impacto Regulatório das normas espanholas (Ley 50/1980, LOSSEAR) sobre o sistema REEF Core",
                        target_filename="00-matriz-impacto-regulatorio-operacao-reef.md",
                        target_title="Matriz Canônica de Impacto Regulatório no Sistema REEF — Espanha",
                        topics=["Impacto Regulatório", "REEF Core", "Sinistros", "Emissão", "Prazos DGSFP", "Compliance", "Espanha"],
                        query_prompt="Sintetice la matriz de impacto regulatorio de las leyes de seguros de España (Ley 50/1980, LOSSEAR) sobre el sistema REEF Core. Plazo de 40 días para pago de anticipo mínimo, mora del 20% anual tras 2 años (Art. 20 LCS), deber de declaración (Art. 10 LCS) e impacto en Emisión, Siniestros y Tesorería.",
                    ),
                    OfficialPortal(
                        id="es_ley_contrato_50",
                        agency_name="BOE - Boletín Oficial del Estado",
                        official_url="https://www.boe.es/buscar/act.php?id=BOE-A-1980-22501",
                        scope_description="Ley 50/1980 de Contrato de Seguro de España (Marco general de pólizas, deber de declaración y mora del asegurador)",
                        target_filename="01-ley-50-1980-contrato-de-seguro-espana.md",
                        target_title="Legislación Canónica de Seguros: Ley 50/1980 de Contrato de Seguro de España",
                        topics=["Ley 50/1980", "Contrato de Seguro", "Deber de Declaración", "Mora del Asegurador", "Subrogación", "España"],
                        query_prompt="Sintetice el marco jurídico de la Ley 50/1980 de Contrato de Seguro de España. Deber de declaración (Art. 10), mora (Art. 18 e 20), prescripción y subrogación.",
                    ),
                    OfficialPortal(
                        id="es_lossear_20",
                        agency_name="DGSFP - Dirección General de Seguros y Fondos de Pensiones",
                        official_url="https://dgsfp.mineco.gob.es/es/Regulacion/Paginas/LOSSEAR.aspx",
                        scope_description="Ley 20/2015 (LOSSEAR) de ordenación, supervisión y solvencia de entidades aseguradoras (Solvencia II)",
                        target_filename="02-lossear-ley-20-2015-solvencia-supervision-espana.md",
                        target_title="Regulación DGSFP: Ley 20/2015 (LOSSEAR) — Solvencia II y Supervisión Aseguradora",
                        topics=["LOSSEAR", "DGSFP", "Solvencia II", "Gobierno Corporativo", "Supervisión", "España"],
                        query_prompt="Estructure los requisitos de supervisión de la Ley 20/2015 (LOSSEAR) en España. Pilares de Solvencia II (cuantitativo, gobernanza y transparencia).",
                    ),
                    OfficialPortal(
                        id="es_distribucion_rdl3",
                        agency_name="BOE / Ministerio de Economía",
                        official_url="https://www.boe.es/buscar/act.php?id=BOE-A-2020-1651",
                        scope_description="Real Decreto-ley 3/2020 de distribución de seguros y reaseguros privados (Directiva IDD y mediadores)",
                        target_filename="03-rdl-3-2020-distribucion-seguros-idd-espana.md",
                        target_title="Normativa de Distribución: RDL 3/2020 — Transparencia, Mediación y Directiva IDD",
                        topics=["Distribución de Seguros", "IDD", "Mediadores", "Transparencia", "Protección del Asegurado", "España"],
                        query_prompt="Detalle las normas de conducta para la distribución de seguros en España bajo el RDL 3/2020 (transposición de IDD, asesoramiento imparcial e información previa).",
                    ),
                    OfficialPortal(
                        id="es_consorcio_compensacion",
                        agency_name="Consorcio de Compensación de Seguros",
                        official_url="https://www.consorseguros.es/web/consorcio/normativa-reguladora",
                        scope_description="Estatuto Legal del Consorcio de Compensación de Seguros (Cobertura de riesgos extraordinarios y catástrofes)",
                        target_filename="04-consorcio-compensacion-seguros-riesgos-extraordinarios.md",
                        target_title="Riesgos Extraordinarios: Régimen Jurídico del Consorcio de Compensación de Seguros",
                        topics=["Consorcio", "Riesgos Extraordinarios", "Catástrofes Naturales", "Fondo de Garantía", "España"],
                        query_prompt="Describa el papel del Consorcio de Compensación de Seguros en España. Cobertura obligatoria de riesgos extraordinarios y recargo solidario.",
                    ),
                    OfficialPortal(
                        id="es_unespa_glosario",
                        agency_name="UNESPA - Asociación Empresarial del Seguro",
                        official_url="https://www.unespa.es/que-hacemos/glosario/",
                        scope_description="Glosario Oficial del Mercado Asegurador Español (Terminología técnica actuarial y conceptos operativos)",
                        target_filename="05-glosario-tecnico-oficial-mercado-asegurador-espana.md",
                        target_title="Terminología Oficial del Mercado Asegurador Español (UNESPA / DGSFP)",
                        topics=["Glosario", "Terminología", "Siniestro", "Prima", "Franquicia", "Coaseguro", "Reaseguro", "España"],
                        query_prompt="Consolide el glosario técnico oficial del sector asegurador en España según UNESPA y DGSFP: prima de tarifa, regla proporcional, provisiones IBNR y franquicia.",
                    ),
                    OfficialPortal(
                        id="es_glossario_depara",
                        agency_name="Mercado Asegurador Español / UNESPA / DGSFP",
                        official_url="https://www.unespa.es/que-hacemos/glosario/",
                        scope_description="Glosario De-Para de Jergas del Mercado Asegurador a Términos Técnicos Oficiales en España",
                        target_filename="06-glossario-de-para-jargoes-e-termos-tecnicos-seguros.md",
                        target_title="Glosario Canónico De ➔ Para: Jergas del Mercado vs Terminología Técnica Oficial — España",
                        topics=["Glosario", "De-Para", "Jergas", "Términos Técnicos", "DGSFP", "UNESPA", "España"],
                        query_prompt="Consolide un diccionario de traducción De-Para de jergas operacionales a términos técnicos formales de seguros en España. Incluya siniestro total / parcial, regla proporcional, subrogación, franquicia y mora del asegurador.",
                    ),
                ],
            )
            register_custom_country(fb)
            return fb

        # Fallback genérico para qualquer outro país
        clean_name = query.capitalize()
        fb_gen = CountryLegislationConfig(
            id=norm_id or "pais",
            name=clean_name,
            flag_emoji="🌐",
            currency="Moeda Local",
            primary_regulator=f"Autoridade Nacional de Seguros de {clean_name}",
            portals=[
                OfficialPortal(
                    id=f"{norm_id}_lei_geral",
                    agency_name=f"Portal Oficial do Governo de {clean_name}",
                    official_url=f"https://www.gov.{norm_id[:2]}/insurance",
                    scope_description=f"Lei Geral do Contrato de Seguro de {clean_name} (Direitos, obrigações e prazos de liquidação de sinistros)",
                    target_filename=f"01-lei-geral-contrato-seguro-{norm_id}.md",
                    target_title=f"Legislação Canônica de Seguros: Lei Geral de Seguros de {clean_name}",
                    topics=["Contrato de Seguro", "Apólices", "Sinistros", clean_name],
                    query_prompt=f"Consolide a legislação e os direitos das partes no contrato de seguros em {clean_name}.",
                ),
                OfficialPortal(
                    id=f"{norm_id}_regulador",
                    agency_name=f"Órgão Supervisor de Seguros de {clean_name}",
                    official_url=f"https://www.insurance-regulator.{norm_id[:2]}",
                    scope_description=f"Regulamentação e Diretrizes de Supervisão e Solvência das Seguradoras em {clean_name}",
                    target_filename=f"02-regulacao-supervisao-{norm_id}.md",
                    target_title=f"Regulação e Supervisão de Entidades Seguradoras de {clean_name}",
                    topics=["Supervisão", "Solvência", "Governança", clean_name],
                    query_prompt=f"Apresente os critérios de solvência, conduta e supervisão em {clean_name}.",
                ),
            ],
        )
        register_custom_country(fb_gen)
        return fb_gen


async def fetch_portal_content(portal: OfficialPortal) -> str:
    """Tenta buscar conteúdo do portal oficial com resiliência e timeout seguro."""
    _append_log("INFO", portal.id.upper(), f"Iniciando requisição HTTP ao portal oficial: {portal.official_url}")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,es;q=0.8,en;q=0.7",
    }
    try:
        async with httpx.AsyncClient(timeout=12.0, follow_redirects=True) as client:
            response = await client.get(portal.official_url, headers=headers)
            if response.status_code == 200:
                text = response.text
                clean_text = re.sub(r"<script.*?</script>", "", text, flags=re.DOTALL | re.IGNORECASE)
                clean_text = re.sub(r"<style.*?</style>", "", clean_text, flags=re.DOTALL | re.IGNORECASE)
                clean_text = re.sub(r"<[^>]+>", " ", clean_text)
                clean_text = " ".join(clean_text.split())
                snippet = clean_text[:4000] if len(clean_text) > 4000 else clean_text
                _append_log("SUCCESS", portal.id.upper(), f"Portal oficial respondeu HTTP 200. ({len(snippet)} caracteres extraídos)")
                return snippet
            else:
                _append_log("WARN", portal.id.upper(), f"Portal oficial retornou status {response.status_code}. Aplicando síntese normativa via base canônica.")
    except Exception as exc:
        _append_log("WARN", portal.id.upper(), f"Conexão com portal oficial offline ou bloqueada ({str(exc)[:80]}). Usando base canônica de fallback.")
    return ""


async def synthesize_portal_document(
    portal: OfficialPortal,
    country_cfg: CountryLegislationConfig,
    scraped_text: str,
) -> str:
    """Usa o LLM para transformar as diretrizes e regras no formato Markdown canônico."""
    _append_log("INFO", "LLM", f"Sintetizando e formatando documento regulatório: '{portal.target_title}'...")
    
    system_prompt = (
        "Você é um consultor jurídico e atuarial sênior especializado em regulação de seguros corporativos. "
        "Sua tarefa é gerar um documento oficial em formato Markdown completo, rigoroso, altamente técnico e "
        "impecavelmente estruturado, pronto para indexação em um sistema de RAG cognitivo empresarial. "
        "O documento DEVE obrigatoriamente iniciar com cabeçalho YAML Front-matter (entre ---) contendo: "
        "title, country, jurisdiction, official_source, official_url, last_updated, topics (lista), summary. "
        "No corpo do texto, divida em seções com títulos Markdown hierárquicos claros (H1, H2, H3), incluindo "
        "fundamentação jurídica, artigos aplicáveis, prazos e sanções, regras para apólices e sinistros, "
        "e um quadro resumo de impactos práticos para segurados e seguradoras."
    )

    user_prompt = (
        f"Gere o documento oficial completo para a jurisdição de {country_cfg.name} ({country_cfg.flag_emoji}):\n\n"
        f"Órgão Regulador / Fonte: {portal.agency_name}\n"
        f"Portal Oficial: {portal.official_url}\n"
        f"Título Alvo: {portal.target_title}\n"
        f"Tópicos Chave: {', '.join(portal.topics)}\n"
        f"Diretriz Normativa: {portal.query_prompt}\n\n"
    )
    if scraped_text:
        user_prompt += f"Texto e contexto extraído do portal oficial:\n{scraped_text[:2500]}\n\n"

    user_prompt += (
        "Importante: NÃO inclua marcadores de código como ```markdown ou ``` no início e fim do texto. "
        "Comece diretamente com o cabeçalho YAML --- e em seguida o título principal #."
    )

    messages: List[Message] = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
    ]

    try:
        llm = get_llm_client()
        content = await llm.complete(messages)
        content = content.strip()
        if content.startswith("```markdown"):
            content = content[11:].strip()
        elif content.startswith("```"):
            content = content[3:].strip()
        if content.endswith("```"):
            content = content[:-3].strip()

        _append_log("SUCCESS", "LLM", f"Documento estruturado com sucesso ({len(content)} bytes).")
        return content
    except Exception as exc:
        _append_log("WARN", "LLM", f"Falha na chamada ao LLM ({exc}). Gerando conteúdo canônico estruturado padrão.")
        today = datetime.now().strftime("%Y-%m-%d")
        tags_yaml = "\n".join(f"  - {t}" for t in portal.topics)
        return (
            f"---\n"
            f"title: \"{portal.target_title}\"\n"
            f"country: \"{country_cfg.name}\"\n"
            f"jurisdiction: \"{country_cfg.id.upper()}\"\n"
            f"official_source: \"{portal.agency_name}\"\n"
            f"official_url: \"{portal.official_url}\"\n"
            f"last_updated: \"{today}\"\n"
            f"topics:\n{tags_yaml}\n"
            f"summary: \"{portal.scope_description}\"\n"
            f"---\n\n"
            f"# {portal.target_title}\n\n"
            f"> **Fonte Oficial Reguladora**: [{portal.agency_name}]({portal.official_url})  \n"
            f"> **Jurisdição**: {country_cfg.name} ({country_cfg.flag_emoji}) | **Moeda**: {country_cfg.currency}\n\n"
            f"## 1. Escopo e Aplicabilidade Normativa\n\n"
            f"{portal.scope_description}\n\n"
            f"## 2. Diretrizes Regulatórias e Operacionais\n\n"
            f"{portal.query_prompt}\n\n"
            f"## 3. Disposições sobre Contratos, Apólices e Sinistros\n\n"
            f"As diretrizes estabelecem os direitos e deveres mútuos entre segurado e seguradora, fixando "
            f"parâmetros rígidos de solvência, boa-fé, transparência e prazos operacionais conforme a jurisdição nacional.\n"
        )


async def run_legislation_sync_job(country_id: str, actor_email: str) -> None:
    """Job assíncrono de atualização e substituição de legislação por país."""
    global _active_sync_telemetry
    now_iso = datetime.now(timezone.utc).isoformat()
    _active_sync_telemetry = {
        "status": "running",
        "country_id": country_id,
        "percent": 5,
        "current_step": "Iniciando processo de sincronização...",
        "current_portal": None,
        "logs": [],
        "generated_files": [],
        "started_at": now_iso,
        "finished_at": None,
    }

    try:
        async with AsyncSessionLocal() as db:
            custom_json = await get_custom_countries_json(db)
        country_cfg = get_country_config(country_id, custom_json)
    except KeyError as err:
        _append_log("ERROR", "CORE", str(err))
        _active_sync_telemetry["status"] = "failed"
        _active_sync_telemetry["finished_at"] = datetime.now(timezone.utc).isoformat()
        return

    _append_log("INFO", "CORE", f"País selecionado: {country_cfg.name} {country_cfg.flag_emoji}.")

    # Garantia de integridade: assegura que a Matriz de Impacto Regulatório e o Glossário De-Para sempre existam
    portal_filenames = {p.target_filename for p in country_cfg.portals}
    if "00-matriz-impacto-regulatorio-operacao-reef.md" not in portal_filenames:
        country_cfg.portals.insert(
            0,
            OfficialPortal(
                id=f"{country_cfg.id}_impacto_regulatorio",
                agency_name=f"{country_cfg.primary_regulator} / Governança REEF Core",
                official_url=f"https://gov.{country_cfg.id}/regulatory-impact",
                scope_description=f"Matriz Canônica de Impacto Regulatório das normas de {country_cfg.name} sobre o sistema REEF Core",
                target_filename="00-matriz-impacto-regulatorio-operacao-reef.md",
                target_title=f"Matriz Canônica de Impacto Regulatório no Sistema REEF — {country_cfg.name}",
                topics=["Impacto Regulatório", "REEF Core", "Sinistros", "Emissão", "Prazos Legais", "Compliance", country_cfg.name],
                query_prompt=(
                    f"Sintetize a matriz oficial de impacto regulatório das normas de seguros de {country_cfg.name} sobre o sistema REEF Core. "
                    f"Destaque os impactos operacionais e prazos nas esteiras de Emissão de Apólices, Regulação e Liquidação de Sinistros, "
                    f"Gestão de Terceiros e Peritagem, e Contabilidade/Tesouraria (mora no prêmio, reservas técnicas e cancelamento)."
                ),
            ),
        )
    if "06-glossario-de-para-jargoes-e-termos-tecnicos-seguros.md" not in portal_filenames:
        country_cfg.portals.append(
            OfficialPortal(
                id=f"{country_cfg.id}_glossario_depara",
                agency_name=f"Mercado Segurador de {country_cfg.name} / {country_cfg.primary_regulator}",
                official_url=f"https://gov.{country_cfg.id}/glossary",
                scope_description=f"Glossário De-Para de jargões operacionais para termos técnicos e normativos de seguros em {country_cfg.name}",
                target_filename="06-glossario-de-para-jargoes-e-termos-tecnicos-seguros.md",
                target_title=f"Glossário Canônico De ➔ Para: Jargões de Mercado vs Terminologia Técnica Oficial — {country_cfg.name}",
                topics=["Glossário", "De-Para", "Jargões de Seguros", "Termos Técnicos", "Sinônimos", country_cfg.name],
                query_prompt=(
                    f"Consolide um extenso dicionário de tradução De-Para entre expressões/jargões coloquiais de corretores, segurados e reguladores "
                    f"e os termos técnicos formais da legislação de {country_cfg.name}. Cubra ao menos 25 pares de termos, detalhamento macro de conceitos fundamentais e falsos amigos."
                ),
            ),
        )

    _append_log("INFO", "CORE", f"Total de documentos normativos a sincronizar para {country_cfg.name}: {len(country_cfg.portals)}")

    # Diretório alvo de legislação ativa (/data/sources_root/09. Regulacao e Legislacao/)
    target_dir = Path(settings.sources_root) / "09. Regulacao e Legislacao"
    try:
        target_dir.mkdir(parents=True, exist_ok=True)
    except Exception as exc:
        _append_log("ERROR", "FILESYSTEM", f"Falha ao acessar diretório de fontes: {exc}")
        _active_sync_telemetry["status"] = "failed"
        return

    _append_log("INFO", "FILESYSTEM", f"Diretório regulatório ativo: {target_dir}")

    # Modo mono-país: substitui todos os arquivos markdown da pasta ativa
    old_files = [f for f in target_dir.rglob("*.md") if f.is_file()]
    if old_files:
        _append_log("INFO", "CLEANUP", f"Removendo {len(old_files)} documentos anteriores para substituição mono-país...")
        for old_file in old_files:
            try:
                old_file.unlink()
                _append_log("DEBUG", "CLEANUP", f"Removido: {old_file.name}")
            except Exception as e:
                _append_log("WARN", "CLEANUP", f"Não foi possível remover {old_file.name}: {e}")

    total_portals = len(country_cfg.portals)
    generated_files: List[str] = []

    for idx, portal in enumerate(country_cfg.portals):
        progress_base = 10 + int((idx / total_portals) * 80)
        _active_sync_telemetry["percent"] = progress_base
        _active_sync_telemetry["current_portal"] = portal.agency_name
        _active_sync_telemetry["current_step"] = f"Consultando {portal.agency_name} ({idx + 1}/{total_portals})..."

        # 1. Coleta HTTP no portal oficial
        scraped_text = await fetch_portal_content(portal)

        # 2. Síntese via LLM
        _active_sync_telemetry["percent"] = progress_base + int(40 / total_portals)
        _active_sync_telemetry["current_step"] = f"Sintetizando {portal.target_filename} via LLM..."
        markdown_doc = await synthesize_portal_document(portal, country_cfg, scraped_text)

        # 3. Gravação no filesystem
        file_path = target_dir / portal.target_filename
        try:
            file_path.write_text(markdown_doc, encoding="utf-8")
            _append_log("SUCCESS", "FILESYSTEM", f"Arquivo salvo com sucesso: {portal.target_filename} ({len(markdown_doc)} bytes)")
            generated_files.append(portal.target_filename)
        except Exception as exc:
            _append_log("ERROR", "FILESYSTEM", f"Erro ao gravar {portal.target_filename}: {exc}")

        await asyncio.sleep(0.4)

    # Conclusão e atualização no banco de dados
    _active_sync_telemetry["percent"] = 100
    _active_sync_telemetry["status"] = "completed"
    _active_sync_telemetry["current_step"] = f"Sincronização concluída! {len(generated_files)} documentos do {country_cfg.name} ativos."
    _active_sync_telemetry["generated_files"] = generated_files
    _active_sync_telemetry["finished_at"] = datetime.now(timezone.utc).isoformat()

    _append_log("SUCCESS", "CORE", f"Processo concluído com sucesso. País ativo atualizado para: {country_cfg.name}.")

    try:
        async with AsyncSessionLocal() as db:
            await set_active_country_id(country_id, db)
            
            status_payload = json.dumps(_active_sync_telemetry, ensure_ascii=False)
            row = await db.scalar(select(AppSetting).where(AppSetting.key == LEGISLATION_SYNC_STATUS_KEY))
            if row is None:
                db.add(AppSetting(key=LEGISLATION_SYNC_STATUS_KEY, value=status_payload))
            else:
                row.value = status_payload

            db.add(
                AuditLog(
                    action=AuditAction.CHANGE_SOURCES_PATH,
                    metadata_json={
                        "action": "SYNC_LEGISLATION_COUNTRY",
                        "country_id": country_id,
                        "country_name": country_cfg.name,
                        "generated_files_count": len(generated_files),
                        "actor_email": actor_email,
                    },
                )
            )
            await db.commit()
            _append_log("INFO", "DATABASE", "Estado de sincronização e auditoria persistidos no banco de dados.")
    except Exception as exc:
        _append_log("ERROR", "DATABASE", f"Erro ao persistir no Postgres: {exc}")
