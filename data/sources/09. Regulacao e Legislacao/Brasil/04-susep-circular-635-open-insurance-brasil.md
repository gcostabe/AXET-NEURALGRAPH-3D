---
title: "Circular SUSEP nº 635/2021 - Open Insurance Brasil (OPIN) e Arquitetura de APIs"
country: "BR"
jurisdiction: "SUSEP - Superintendência de Seguros Privados"
category: "Integração Tecnológica e Open Insurance"
topics: ["Open Insurance", "OPIN", "APIs SUSEP", "Consentimento", "Gateways", "Interoperabilidade", "Brasil"]
summary: "Diretrizes e especificações técnicas da Circular SUSEP nº 635/2021 e Resolução CNSP nº 415/2021 para o ecossistema Open Insurance (OPIN) no Brasil. Abrange arquitetura de APIs REST, autenticação mTLS/OAuth2, ciclo de vida de consentimento e iniciação de serviços."
---

# Circular SUSEP nº 635/2021 — Open Insurance Brasil (OPIN)

A **Circular SUSEP nº 635/2021** (regulamentando a Resolução CNSP nº 415/2021) estabelece o funcionamento, a governança e os padrões técnicos do **Sistema de Seguros Aberto (Open Insurance Brasil - OPIN)**.

---

## 1. Conceito e Arquitetura do Ecossistema

O Open Insurance consiste no compartilhamento padronizado de dados e serviços por meio de abertura e integração de sistemas e APIs entre seguradoras, participantes do mercado e sociedades iniciadoras de serviço de seguro (SISS).

### As Fases Estruturais do OPIN:
1. **Fase 1 (Dados Abertos Públicos)**: Compartilhamento de canais de atendimento, redes credenciadas e termos gerais dos produtos de seguros disponíveis no mercado, sem necessidade de autenticação de cliente.
2. **Fase 2 (Dados Pessoais e Transacionais)**: Compartilhamento de dados cadastrais de clientes e dados de movimentação de apólices, vigência, prêmios e histórico de sinistros, estritamente mediante **consentimento prévio e expresso**.
3. **Fase 3 (Iniciação de Serviços)**: Permite que iniciadores credenciados transmitam comandos de contratação de seguro e abertura de aviso de sinistro em nome do cliente.

---

## 2. Padrões Técnicos Obrigatórios para APIs

Para participar do ecossistema e manter interoperabilidade no Brasil, os sistemas de backend das seguradoras devem aderir aos padrões do Diretório Central do OPIN:

* **Padrão de Comunicação**: APIs RESTful com payload serializado em JSON conforme especificações OpenAPI (Swagger 3.0).
* **Segurança e Criptografia**:
  * Autenticação mTLS (*mutual TLS 1.3*) com certificados emitidos por Autoridades Certificadoras ICP-Brasil.
  * Autorização via **OAuth 2.0** com perfil **FAPI-RW** (*Financial-grade API Read and Write Profile*).
  * Assinatura digital de payloads via **JWS** (*JSON Web Signature*) para garantia de não-repúdio.
* **Resiliência e Performance**: SLAs de disponibilidade de no mínimo 99,5% com tempos máximos de resposta estipulados para endpoints de consulta.

---

## 3. Gestão do Consentimento do Segurado

O compartilhamento de qualquer dado transacional de apólice ou sinistro depende de consentimento válido:

* **Livre, Prévio e Expresso**: O cliente deve autorizar pontualmente a finalidade e o período de compartilhamento.
* **Validade Temporal Máxima**: O consentimento não pode exceder o prazo de **12 (doze) meses**, devendo ser renovado expressamente pelo usuário após esse período.
* **Direito de Revogação Imediata**: O sistema deve permitir a revogação do consentimento a qualquer momento pelo canal digital em no máximo 1 clique, suspendendo imediatamente a transmissão de dados.

> **Alinhamento com o Tronco Encefálico e Gateways do REEF**:
> Os microsserviços de mensageria e gateways do REEF devem implementar os interceptadores de segurança FAPI/mTLS e o módulo de gerência de tokens e consentimentos para homologação no Diretório do Open Insurance Brasil.
