---
title: "Subscrição Dinâmica DUP e Seleção de Risco (Risk Selection)"
tags:
  - "subscrição"
  - "dup"
  - "risco"
  - "seleção"
  - "loss ratio"
  - "sinistro"
  - "margem"
  - "acdc"
topics:
  - "Subscrição de Riscos"
  - "Regras de Aceitação"
  - "Loss Ratio"
category: "Regras de Negócio e Funcional"
domain: "ACDC"
system: "MAPFRE - REEF / ACDC"
lobe_hint: "parietal"
version: "1.0.0"
updated_at: "2026-09-25T12:44:05.456Z"
---
# Subscrição Dinâmica DUP e Seleção de Risco (Risk Selection)

## 1. Plataforma Dinâmica de Subscrição (DUP)
A esteira DUP avalia a aceitabilidade do risco antes que a cotação avance para o cálculo de tarifa final:
- **Triagem Preliminar:** Avaliação de restrições cadastrais, perfil de segurado e sinistralidade prévia.
- **Regras de Subscrição (`RULES`):** Ajusta margens e prêmios em função do **Loss Ratio Alvo** (`lossRatioTarget`) e da **Margem de Ajuste** (`marginAdjustment`).
- **Regras de Aceitação / Recusa (`RS-RULES`):** Aplica regras eliminatórias (ex: veículos fora de tabela de aceitação, regiões com restrição de subscrição).
