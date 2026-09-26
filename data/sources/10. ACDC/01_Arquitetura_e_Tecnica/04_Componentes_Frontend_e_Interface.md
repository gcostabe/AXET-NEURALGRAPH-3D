---
title: "Módulos e Componentes de Interface do Usuário — ACDC Frontend"
tags:
  - "frontend"
  - "react"
  - "componentes"
  - "interface"
  - "ui"
  - "ux"
  - "acdc"
topics:
  - "Frontend"
  - "Componentes React"
  - "Design System"
category: "Arquitetura e Engenharia"
domain: "ACDC"
system: "MAPFRE - REEF / ACDC"
lobe_hint: "frontal"
version: "1.0.0"
updated_at: "2026-09-25T12:44:05.455Z"
---
# Módulos e Componentes de Interface do Usuário — ACDC Frontend

## 1. Visão Geral da Interface
A aplicação frontend desenvolvida em React 19 e Vite oferece um console analítico integrado, com navegação por abas de alta densidade informativa:

- **`RatingEngineTab.jsx`:** Construtor dual-pane de fórmulas RTE, drag-and-drop de variáveis/constantes, simulador em tempo real e validador de sintaxe.
- **`RiskRulesTab.jsx`:** Painel de gestão de regras de subscrição, filtros por ramo e configuração de loss ratio.
- **`ProductsCatalogTab.jsx`:** Catálogo visual de produtos, regras de contratação e coberturas associadas.
- **`CoveragePackagesTab.jsx`:** Gerenciador de pacotes de coberturas por ramo e plano.
- **`AuditTab.jsx`:** Trilha PECA com visualizador de diff lado a lado e histórico de aprovações.
- **`EnvironmentsManagementTab.jsx`:** Alternador de conexão do MongoDB com teste de latência e ping ao vivo.
- **`DataExplorerTab.jsx`:** Explorador flexível de documentos MongoDB com filtros JSON e paginação.
- **`UsersManagementTab.jsx`:** Administração de usuários, aprovação de solicitações de acesso e perfis de permissão.
- **`ChatBotWidget.jsx`:** Assistente cognitivo atuarial (ACDC Copilot) acoplado ao pipeline de recuperação RAG.
