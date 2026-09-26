---
title: "Catálogo de APIs REST e Contratos de Integração — ACDC"
tags:
  - "api"
  - "rest"
  - "endpoints"
  - "gateway"
  - "rotas"
  - "express"
  - "contratos"
  - "infra"
  - "acdc"
topics:
  - "APIs REST"
  - "Integração de Sistemas"
  - "Contratos de Endpoints"
category: "Arquitetura e Engenharia"
domain: "ACDC"
system: "MAPFRE - REEF / ACDC"
lobe_hint: "brainstem"
version: "1.0.0"
updated_at: "2026-09-25T12:44:05.454Z"
---
# Catálogo de APIs REST e Contratos de Integração — ACDC

## 1. Visão Geral dos Endpoints do Backend
O servidor Express da aplicação expõe uma malha de microsserviços e rotas RESTful na porta `4000` sob o prefixo `/api`.

## 2. Tabela de Rotas e Responsabilidades

| Prefixo da Rota | Arquivo Fonte | Responsabilidade e Escopo |
| :--- | :--- | :--- |
| `/api/auth` | `server/src/routes/auth.js` | Login local, autenticação Okta SSO Device Flow, gestão de usuários e alçadas RBAC. |
| `/api/rte` | `server/src/routes/rte.js` | Consulta e edição de fórmulas, constantes atuariais, conceitos de breakdown e validação sintática AST. |
| `/api/dup` | `server/src/routes/dup.js` | Regras de subscrição (`RULES`), seleção de risco (`RS-RULES`), chaves antifraude e fatores de cálculo. |
| `/api/products` | `server/src/routes/products.js` | Catálogo de produtos, coberturas básicas/adicionais e planos de pagamento. |
| `/api/packages` | `server/src/routes/packages.js` | Definição e execução de pacotes de coberturas (`COVERAGE-PACKAGE-DEFINITION`). |
| `/api/audit` | `server/src/routes/audit.js` | Trilha de auditoria PECA, histórico de alterações com visualização diff lado a lado. |
| `/api/explorer` | `server/src/routes/explorer.js` | Navegação dinâmica, paginação e visualização JSON de qualquer coleção MongoDB. |
| `/api/environments`| `server/src/routes/environments.js`| Gerenciamento e comutação a quente de instâncias do MongoDB (Local Docker vs Remotos). |
| `/api/chat` | `server/src/routes/chat.js` | Assistente ACDC Copilot com recuperação RAG e respostas em streaming. |
| `/api/aiGateway` | `server/src/routes/aiGateway.js` | Telemetria, modelos LLM e status de conectividade com o AI Gateway local. |
| `/api/overview` | `server/src/routes/overview.js` | Métricas consolidadas, contadores de documentos e integridade do cluster. |
| `/api/rag-export`| `server/src/routes/ragExport.js` | Configuração e exportação da base de conhecimento indexável para o RAG. |

## 3. Segurança e Autorização Granular
- As requisições que alteram fórmulas, regras ou usuários utilizam o middleware `requireEditPermission`.
- Apenas usuários com a role `ADMIN` possuem acesso a rotas destrutivas e à liberação de credenciais.
