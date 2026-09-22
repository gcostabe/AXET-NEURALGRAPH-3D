---
title: "Circular SUSEP nº 621/2021 - Regras Gerais de Seguros de Danos e Pessoas"
country: "BR"
jurisdiction: "SUSEP - Superintendência de Seguros Privados"
category: "Regulatório e Operações de Seguros"
topics: ["SUSEP 621", "Apólices", "Aceitação de Proposta", "Prazos de Sinistro", "30 Dias", "Franquia", "Brasil"]
summary: "Diretrizes regulatórias da Circular SUSEP nº 621/2021 para seguros de danos no Brasil. Especifica o prazo de aceitação de proposta de 15 dias, prazo legal improrrogável de 30 dias para liquidação de sinistros e regras de suspensão por documentos complementares."
---

# Circular SUSEP nº 621/2021 — Regras Operacionais para Seguros de Danos

A **Circular SUSEP nº 621/2021** é a principal norma infralegal que estabelece os parâmetros técnicos, contratuais e operacionais para a estruturação e comercialização de planos de seguros de danos no mercado brasileiro.

---

## 1. Aceitação da Proposta e Início de Vigência

A contratação ou alteração de seguro deve ser precedida de proposta escrita ou eletrônica, cabendo à seguradora o controle estrito de prazos:

* **Prazo de Aceitação de 15 Dias**: A sociedade seguradora dispõe do prazo regulatório improrrogável de **15 (quinze) dias corridos** para manifestar-se expressamente sobre a aceitação ou recusa da proposta, contados da data de seu recebimento.
* **Aceitação Tácita**: A ausência de manifestação formal de recusa por parte da seguradora dentro do prazo de 15 dias configura **aceitação tácita** da proposta.
* **Cobertura Provisória**: Caso a seguradora emita documento de cobertura provisória, a vigência inicia-se na data acordada, devendo a apólice ser emitida dentro do prazo regulamentar.

---

## 2. Liquidação de Sinistros e Prazo Legal de 30 Dias

A liquidação de sinistro deve observar rigorosamente o prazo máximo estabelecido pelo regulador:

* **Prazo Máximo de 30 Dias Corridos**: A indenização securitária deve ser paga em no máximo **30 (trinta) dias corridos**, contados a partir da data de entrega de todos os documentos básicos previstos nas condições contratuais.
* **Suspensão da Contagem por Documentação Complementar**:
  * É facultado à seguradora solicitar documentação complementar uma única vez, **desde que com dúvida justificada e fundada**.
  * No momento da solicitação, **a contagem do prazo de 30 dias fica SUSPENSA**.
  * A contagem é reiniciada a partir do dia útil subsequente àquele em que os documentos complementares forem completamente entregues pelo segurado ou beneficiário.

> **Regra Crucial para o Módulo de Sinistros do REEF**:
> O REEF implementa o cronômetro legal de contagem de dias úteis e corridos. Ao acionar o evento `SOLICITACAO_DOCUMENTO_COMPLEMENTAR`, o sistema deve registrar a data/hora e pausar a SLA regulatória, emitindo alerta para o analista quando o prazo residual atingir menos de 5 dias após a retomada.

---

## 3. Franquia e Participação Obrigatória do Segurado

O contrato de seguro pode prever limites de participação financeira do segurado no prejuízo:

* **Franquia Simples**: A seguradora não indeniza prejuízos inferiores ao valor estipulado; caso o prejuízo supere o valor da franquia, a seguradora indeniza o dano integralmente.
* **Franquia Dedutível**: O segurado sempre arca com o valor da franquia estipulada, indenizando a seguradora a quantia que exceder tal montante.

---

## 4. Pagamento Fracionado e Inadimplência de Prêmio

Em apólices com pagamento parcelado do prêmio:

* **Tabela de Prazo Curto ou Proporcionalidade**: O não pagamento de qualquer parcela deve ser antecedido de comunicação formal ao segurado antes do cancelamento da apólice.
* **Suspensão de Cobertura**: Decorrido o prazo de tolerância sem quitação, a cobertura é suspensa ou cancelada proporcionalmente ao tempo efetivamente pago, não podendo haver rescisão unilateral automática sem aviso prévio.

---

## 5. Salvados e Ressarcimento

* **Salvados**: Efetuado o pagamento da indenização integral, os bens salvados passam a pertencer de pleno direito à seguradora, que providenciará a sua alienação ou descarte ambiental regular.
* **Ressarcimento**: A seguradora tem o direito legal de buscar o reembolso junto ao causador culposo do sinistro mediante processo de ressarcimento amigável ou judicial.
