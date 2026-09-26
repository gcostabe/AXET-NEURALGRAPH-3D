---
title: "Dicionário de Coleções MongoDB — Bancos DUP e RTE"
tags:
  - "banco"
  - "mongodb"
  - "coleções"
  - "schemas"
  - "dados"
  - "dup"
  - "rte"
  - "infra"
  - "acdc"
topics:
  - "Banco de Dados"
  - "Dicionário de Dados"
  - "Estrutura Documental"
category: "Arquitetura e Engenharia"
domain: "ACDC"
system: "MAPFRE - REEF / ACDC"
lobe_hint: "brainstem"
version: "1.0.0"
updated_at: "2026-09-25T12:44:05.454Z"
---
# Dicionário de Coleções MongoDB — Bancos DUP e RTE

## 1. Banco `acdc_dup_br-int` (Subscrição & Regras de Negócio)

| Coleção | Finalidade Atuarial / Operacional |
| :--- | :--- |
| `RULES` | Regras de negócio de subscrição, margem de ajuste e meta de loss ratio. |
| `RS-RULES` | Regras de aceitação/recusa de risco (Risk Selection). |
| `RS-PROCESS-RULES` | Regras de encadeamento do processo de seleção de risco. |
| `RS-RULES-ACTIONS-CONDITIONS`| Mapeamento de condições booleanas e ações de cálculo de subscrição. |
| `PRODUCTS` | Catálogo de produtos seguradores cadastrados. |
| `PRODUCT_COVERAGES` | Coberturas contratáveis vinculadas aos produtos. |
| `TRIANGULATION_KEYS` | Chaves de triangulação antifraude (cruzamento de corretores, CPF e propostas). |
| `BRANCH_CONFIGURATION` | Parâmetros de ramos de seguro (ex: Ramo 160 Automóvel). |
| `COUNTRY_CONFIGURATION`| Configuração regional e moedas de operação. |
| `PECA` | Registros de auditoria atuarial e trilha de conformidade regulatória. |

## 2. Banco `acdc_rte_br-int` (Motor de Tarifação & Módulos)

| Coleção | Finalidade Atuarial / Operacional |
| :--- | :--- |
| `FORMULA-DEFINITION` | Definições das expressões matemáticas atuariais do motor Tronador. |
| `CONSTANT-DEFINITION` | Constantes atuariais resolvidas dinamicamente via `MMATH.f_cte`. |
| `BREAKDOWN-CONCEPTS` | Conceitos econômicos de decomposição do prêmio (impostos, comissões, margens). |
| `ECONOMIC-CONCEPTS` | Conceitos de despesa, custo e taxas operacionais. |
| `TECHNICAL-BASIS-TABLES`| Tabelas atuariais de mortalidade, sinistralidade e fatores base. |
| `COVERAGE-PACKAGE-DEFINITION`| Pacotes de cobertura e regras de ativação tarifária. |
| `QUOTE-FACTORS` | Fatores multiplicadores e coeficientes de tarifação por perfil. |
