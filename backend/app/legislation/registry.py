"""Registry de Países e Portais Oficiais de Legislação de Seguros.

Mantém o Brasil como padrão pré-configurado e provê suporte a registro dinâmico
de países descobertos sob demanda através do LLM.
"""

import json
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class OfficialPortal(BaseModel):
    id: str
    agency_name: str
    official_url: str
    scope_description: str
    target_filename: str
    target_title: str
    topics: List[str]
    query_prompt: str


class CountryLegislationConfig(BaseModel):
    id: str
    name: str
    flag_emoji: str
    currency: str
    primary_regulator: str
    portals: List[OfficialPortal]


# Brasil é o único país pré-configurado estaticamente
BUILTIN_COUNTRIES: Dict[str, CountryLegislationConfig] = {
    "brasil": CountryLegislationConfig(
        id="brasil",
        name="Brasil",
        flag_emoji="🇧🇷",
        currency="BRL (R$)",
        primary_regulator="SUSEP / CNSP",
        portals=[
            OfficialPortal(
                id="br_impacto_regulatorio",
                agency_name="SUSEP / CNSP / Governança REEF Core",
                official_url="https://www.gov.br/susep/pt-br",
                scope_description="Matriz Canônica de Impacto Regulatório no Sistema REEF (Impacto das normas brasileiras nas esteiras de Emissão, Sinistros, Terceiros e Tesouraria)",
                target_filename="00-matriz-impacto-regulatorio-operacao-reef.md",
                target_title="Matriz Canônica de Impacto Regulatório no Sistema REEF — Brasil",
                topics=["Impacto Regulatório", "REEF Core", "Sinistros", "Emissão", "Prazos SUSEP", "Compliance", "Brasil"],
                query_prompt=(
                    "Sintetize a matriz oficial de impacto regulatório das normas brasileiras (Código Civil, Circular SUSEP 621/2021, "
                    "Resolução CNSP 382/2020 e OPIN) sobre o sistema segurador REEF Core. Destaque os impactos nas esteiras de Emissão de Apólices, "
                    "Regulação e Liquidação de Sinistros (prazo improrrogável de 30 dias), Gestão de Terceiros e Peritos, e Contabilidade/Tesouraria."
                ),
            ),
            OfficialPortal(
                id="br_codigo_civil",
                agency_name="Presidência da República / Planalto",
                official_url="http://www.planalto.gov.br/ccivil_03/leis/2002/l10406.htm",
                scope_description="Lei 10.406/2002 - Código Civil (Arts. 757 a 802: Do Contrato de Seguro, boa-fé estrita, agravamento de risco e sub-rogação)",
                target_filename="01-codigo-civil-contrato-de-seguro-brasil.md",
                target_title="Legislação Canônica de Seguros: Código Civil Brasileiro (Lei 10.406/2002)",
                topics=["Código Civil", "Contrato de Seguro", "Boa-fé Estrita", "Agravamento de Risco", "Sub-rogação", "Brasil"],
                query_prompt=(
                    "Sintetize as regras jurídicas fundamentais do Contrato de Seguro segundo o Código Civil Brasileiro "
                    "(Arts. 757 ao 802). Destaque o princípio da boa-fé estrita, consequências de declarações inexatas "
                    "(Art. 766), perda de direito por agravamento intencional do risco (Art. 768), mora no pagamento do prêmio "
                    "e o instituto da sub-rogação e direito de regresso (Art. 786)."
                ),
            ),
            OfficialPortal(
                id="br_susep_621",
                agency_name="SUSEP - Superintendência de Seguros Privados",
                official_url="https://www.gov.br/susep/pt-br/assuntos/normas-e-legislacao",
                scope_description="Circular SUSEP nº 621/2021 (Regras gerais de apólices, aceitação de proposta em 15 dias e prazo improrrogável de liquidação em 30 dias)",
                target_filename="02-susep-circular-621-regras-gerais-apolices-sinistros.md",
                target_title="Regulação SUSEP: Circular nº 621/2021 — Regras Gerais de Apólices, Sinistros e Operações",
                topics=["SUSEP 621", "Apólices", "Aceitação de Proposta", "Prazos de Sinistro", "30 Dias", "Franquia", "Brasil"],
                query_prompt=(
                    "Estruture os requisitos operacionais da Circular SUSEP nº 621/2021 para o mercado de seguros de danos e pessoas. "
                    "Enfatize os prazos de aceitação de proposta (15 dias), prazo legal de 30 dias corridos para pagamento de indenizações de sinistros, "
                    "hipóteses legais de suspensão da contagem para solicitação de documentos complementares, e distinção de franquia simples e dedutível."
                ),
            ),
            OfficialPortal(
                id="br_cnsp_382",
                agency_name="CNSP - Conselho Nacional de Seguros Privados",
                official_url="https://www.gov.br/susep/pt-br/assuntos/normas-e-legislacao/cnsp",
                scope_description="Resolução CNSP nº 382/2020 (Conduta de mercado, transparência de intermediação, ouvidoria e direitos do consumidor segurado)",
                target_filename="03-cnsp-resolucao-382-conduta-mercado-direitos-segurado.md",
                target_title="Diretrizes CNSP: Resolução nº 382/2020 — Conduta de Mercado, Ouvidoria e Direitos do Segurado",
                topics=["CNSP 382", "Conduta de Mercado", "Ouvidoria", "Transparência", "Direitos do Segurado", "Compliance", "Brasil"],
                query_prompt=(
                    "Detalhe as diretrizes de conduta e relacionamento com o cliente da Resolução CNSP nº 382/2020. "
                    "Cubra o dever de transparência, prestação de informações pré-contratuais, revelação de intermediação, "
                    "funcionamento obrigatório de Ouvidoria com SLA máximo de 10 dias úteis e integração com o SAC."
                ),
            ),
            OfficialPortal(
                id="br_susep_635",
                agency_name="SUSEP - Open Insurance Brasil",
                official_url="https://www.gov.br/susep/pt-br/assuntos/open-insurance",
                scope_description="Circular SUSEP nº 635/2021 (Arquitetura de APIs do Open Insurance OPIN, mTLS, OAuth2/FAPI e ciclo de consentimento)",
                target_filename="04-susep-circular-635-open-insurance-brasil.md",
                target_title="Inovação Regulatória: Circular SUSEP nº 635/2021 — Open Insurance Brasil (OPIN)",
                topics=["Open Insurance", "OPIN", "APIs SUSEP", "Consentimento", "Gateways", "Interoperabilidade", "Brasil"],
                query_prompt=(
                    "Apresente a regulamentação do Sistema de Seguros Aberto (Open Insurance Brasil - OPIN) pela Circular SUSEP nº 635/2021. "
                    "Destaque o compartilhamento de dados com consentimento expresso de até 12 meses, requisitos técnicos de segurança de APIs "
                    "(mTLS, OAuth 2.0 / FAPI), e interoperabilidade entre sociedades seguradoras e intermediadores."
                ),
            ),
            OfficialPortal(
                id="br_cnseg_glossario",
                agency_name="CNseg - Confederação Nacional das Seguradoras",
                official_url="https://cnseg.org.br/glossario-do-seguro",
                scope_description="Glossário e Terminologia Oficial do Mercado Segurador Brasileiro (Conceitos atuariais e operacionais canônicos)",
                target_filename="05-glossario-tecnico-oficial-mercado-segurador-brasil.md",
                target_title="Terminologia Oficial do Mercado Segurador Brasileiro (CNseg / SUSEP)",
                topics=["Glossário", "Terminologia", "Sinistro", "Prêmio", "Franquia", "IBNR", "Cosseguro", "Resseguro", "Brasil"],
                query_prompt=(
                    "Consolide o vocabulário técnico e atuarial oficial do mercado brasileiro conforme preconizado pela CNseg e SUSEP. "
                    "Explique com precisão: Prêmio Puro vs Prêmio Comercial, Sinistro Ocorrido e Avisado, Provisão de IBNR, "
                    "Diferença entre Cosseguro e Resseguro, Salvados e Ressarcimento, e Limite Máximo de Garantia (LMG) vs Limite Máximo de Indenização (LMI)."
                ),
            ),
            OfficialPortal(
                id="br_glossario_depara",
                agency_name="Mercado Segurador Brasileiro / SUSEP / CNseg",
                official_url="https://cnseg.org.br/glossario-do-seguro",
                scope_description="Dicionário de Equivalência De-Para de Jargões Operacionais para Termos Técnicos e Normativos de Seguros",
                target_filename="06-glossario-de-para-jargoes-e-termos-tecnicos-seguros.md",
                target_title="Glossário Canônico De ➔ Para: Jargões de Mercado vs Terminologia Técnica Oficial de Seguros",
                topics=["Glossário", "De-Para", "Jargões de Seguros", "Termos Técnicos", "Sinônimos", "SUSEP", "Brasil"],
                query_prompt=(
                    "Consolide um extenso dicionário de tradução De-Para entre expressões/jargões coloquiais de corretores, segurados e reguladores "
                    "e os termos técnicos formais da legislação brasileira (SUSEP e Código Civil). Cubra ao menos 30 pares de jargões para termos técnicos, "
                    "detalhamento macro dos conceitos fundamentais (ciclo do prêmio, ciclo do sinistro, provisões) e guia de falsos amigos."
                ),
            ),
        ],
    ),
}

# Armazém volátil em memória para países descobertos e registrados em runtime
_dynamic_countries_cache: Dict[str, CountryLegislationConfig] = {}


def register_custom_country(config: CountryLegislationConfig) -> None:
    """Registra ou atualiza um país customizado no cache em memória."""
    norm = config.id.strip().lower()
    _dynamic_countries_cache[norm] = config


def get_country_config(country_id: str, custom_db_json: Optional[str] = None) -> CountryLegislationConfig:
    """Recupera a configuração de um país pelo ID, buscando em builtin, cache e DB."""
    normalized = country_id.strip().lower()
    if normalized in BUILTIN_COUNTRIES:
        return BUILTIN_COUNTRIES[normalized]

    if normalized in _dynamic_countries_cache:
        return _dynamic_countries_cache[normalized]

    if custom_db_json:
        try:
            custom_map = json.loads(custom_db_json)
            if normalized in custom_map:
                cfg = CountryLegislationConfig(**custom_map[normalized])
                _dynamic_countries_cache[normalized] = cfg
                return cfg
        except Exception:
            pass

    raise KeyError(
        f"País '{country_id}' não encontrado no cadastro. Use a busca por IA para descobrir e cadastrar este país."
    )


def list_available_countries(custom_db_json: Optional[str] = None) -> List[Dict[str, Any]]:
    """Lista todos os países atualmente registrados (builtin + customizados do banco)."""
    merged: Dict[str, CountryLegislationConfig] = dict(BUILTIN_COUNTRIES)
    merged.update(_dynamic_countries_cache)

    if custom_db_json:
        try:
            custom_map = json.loads(custom_db_json)
            for k, v in custom_map.items():
                if k not in merged:
                    merged[k] = CountryLegislationConfig(**v)
        except Exception:
            pass

    return [
        {
            "id": c.id,
            "name": c.name,
            "flag_emoji": c.flag_emoji,
            "currency": c.currency,
            "primary_regulator": c.primary_regulator,
            "portal_count": len(c.portals),
            "portals": [p.model_dump() for p in c.portals],
        }
        for c in merged.values()
    ]
