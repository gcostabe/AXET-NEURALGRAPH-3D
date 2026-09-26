---
title: "Arquitetura Global e Stack Tecnológica — Plataforma ACDC"
tags:
  - "arquitetura"
  - "central"
  - "stack"
  - "node"
  - "express"
  - "react"
  - "vite"
  - "mongodb"
  - "docker"
  - "acdc"
  - "mapfre"
topics:
  - "Arquitetura de Software"
  - "Infraestrutura"
  - "Visão Geral do Sistema"
category: "Arquitetura e Engenharia"
domain: "ACDC"
system: "MAPFRE - REEF / ACDC"
lobe_hint: "frontal"
version: "1.0.0"
updated_at: "2026-09-25T12:44:05.453Z"
---
# Arquitetura Global e Stack Tecnológica — Plataforma ACDC

## 1. Visão Geral do Sistema
A **Plataforma ACDC** (Activo Digital de Cálculo) é a solução central do ecossistema MAPFRE Seguros / REEF para exploração estruturada de dados atuariais, orquestração de subscrição dinâmica (DUP), motor de tarifação analítica (RTE Tronador) e rastreabilidade de governança (PECA).

- **Domínio:** Seguros Gerais, Ramos Elementares e Vida (MAPFRE BR-INT).
- **Provedor e Engenharia:** NTT DATA EMEAL.
- **Portas Padrão de Execução:** Frontend `5173`, Backend `4000`, Gateway `8080`, MongoDB `27017`.

## 2. Matriz Tecnológica de Engenharia

| Camada | Tecnologia Adotada | Finalidade Técnica |
| :--- | :--- | :--- |
| **Frontend** | React 19.x com Vite 8.x | Single Page Application corporativa de alta performance. |
| **Estilização** | Vanilla CSS com Tokens HSL | Controle visual estrito sem sobrecarga de frameworks utilitários. |
| **Ícones** | Lucide React | Biblioteca de pictogramas vetoriais consistentes. |
| **Backend** | Node.js 24.x com Express (ESM) | API Gateway e serviços REST com suporte a streaming e assincronia. |
| **Banco de Dados** | MongoDB Community Server 7.0 | Armazenamento de alta flexibilidade para esquemas atuariais. |
| **Controle de Acesso** | JWT + Okta SSO Device Flow | Autenticação híbrida corporativa OneNTT com RBAC granular. |
| **Orquestração** | Docker & Docker Compose | Ambientes isolados para desenvolvimento e execução local. |

## 3. Topologia e Bancos de Dados MongoDB
A solução opera com dois bancos de dados ativos:
- **`acdc_dup_br-int` (25 coleções):** Focado em esteiras de subscrição dinâmica, regras de negócio (`RULES`, `RS-RULES`), produtos, chaves antifraude e governança de auditoria.
- **`acdc_rte_br-int` (27 coleções):** Focado no motor de cálculo Tronador (`FORMULA-DEFINITION`, `CONSTANT-DEFINITION`, `BREAKDOWN-CONCEPTS`, bases técnicas e cotações).

## 4. Resiliência de Conexão e Fallback Automático
O backend implementa o padrão de resiliência em [`server/src/db.js`]:
1. Conecta prioritariamente ao servidor configurado (remoto corporativo ou local);
2. Se a conexão remota falhar por timeout ou indisponibilidade de rede, comuta automaticamente para o MongoDB local no Docker (`mongodb://localhost:27017`);
3. Emite notificações de status de conectividade em tempo real para o frontend.
