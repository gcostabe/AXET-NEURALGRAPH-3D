---
title: "Mecanismos Antifraude e Chaves de Triangulação — DUP"
tags:
  - "antifraude"
  - "triangulação"
  - "segurança"
  - "duplicidade"
  - "chaves"
  - "auditoria"
  - "acdc"
topics:
  - "Segurança"
  - "Detecção de Fraude"
  - "Triangulação de Dados"
category: "Regras de Negócio e Funcional"
domain: "ACDC"
system: "MAPFRE - REEF / ACDC"
lobe_hint: "parietal"
version: "1.0.0"
updated_at: "2026-09-25T12:44:05.456Z"
---
# Mecanismos Antifraude e Chaves de Triangulação — DUP

## 1. Objetivo das Chaves de Triangulação (`TRIANGULATION_KEYS`)
Prevenir fraudes e inconsistências de contratação em tempo real no ecossistema segurador MAPFRE:
- **Detecção de Duplicidade:** Identifica propostas simultâneas idênticas para o mesmo bem em múltiplos corretores.
- **Cruzamento de Entidades:** Correlaciona CPF/CNPJ de condutores principais, proprietários e corretores de seguros.
- **Blindagem Cadastral:** Interrompe a emissão caso seja detectada divergência entre dados informados e bases oficiais.
