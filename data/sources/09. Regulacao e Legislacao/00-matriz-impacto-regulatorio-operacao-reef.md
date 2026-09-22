---
title: "Matriz Canônica de Impacto Regulatório no Sistema REEF — Brasil"
country: "Brasil"
jurisdiction: "BR"
official_source: "SUSEP / CNSP / Código Civil Brasileiro / Governança REEF Core"
official_url: "https://www.gov.br/susep/pt-br"
last_updated: "2026-09-22"
topics:
  - "Impacto Regulatório"
  - "REEF Core"
  - "Sinistros"
  - "Emissão"
  - "Prazos SUSEP"
  - "Mora do Prêmio"
  - "Compliance"
  - "Brasil"
summary: "Matriz executiva e operacional de impacto regulatório das normas brasileiras (Código Civil, Circular SUSEP 621/2021, Resolução CNSP 382/2020 e Circular SUSEP 635/2021) sobre as esteiras e parametrizações do ecossistema segurador REEF Core."
---

# Matriz Canônica de Impacto Regulatório no Sistema REEF — Brasil

> **Status Normativo**: Vigente | **Jurisdição**: Brasil (BR) | **Moeda Operacional**: BRL (R$)  
> **Órgãos Reguladores**: SUSEP (Superintendência de Seguros Privados) e CNSP (Conselho Nacional de Seguros Privados)  
> **Propósito do Documento**: Mapear os impactos mandatórios das leis e normas federais brasileiras sobre os módulos, parâmetros, fluxos de workflow e esteiras do sistema **REEF Core**.

---

## 1. Visão Geral do Impacto Normativo no REEF

O sistema **REEF Core** opera como o núcleo transacional e analítico de seguros corporativos. No Brasil, todas as operações de emissão, liquidação de sinistros, gestão de peritagens e contabilidade técnica são estritamente condicionadas por três diplomas legais primários:

1. **Código Civil Brasileiro (Lei Federal nº 10.406/2002 — Arts. 757 a 802)**: Define os pilares contratuais, dever de estrita boa-fé, consequências da mora e sub-rogação de direitos.
2. **Circular SUSEP nº 621/2021**: Fixa regras gerais de operação de seguros de danos e pessoas, determinando prazos imperativos de aceitação e liquidação.
3. **Resolução CNSP nº 382/2020**: Estabelece padrões de conduta de mercado, exigência de Ouvidoria institucional e transparência de remuneração.
4. **Circular SUSEP nº 635/2021 (Open Insurance - OPIN)**: Regula o ecossistema aberto, tráfego de dados transacionais via APIs seguras (mTLS, OAuth2/FAPI).

---

## 2. Matriz de Impacto por Módulo do REEF Core

### 2.1. Módulo de Sinistros (`REEF-SIN`)

| Requisito Regulatório | Base Legal | Regra Operacional SUSEP | Impacto Técnico no REEF Core | Criticidade |
| :--- | :--- | :--- | :--- | :--- |
| **Prazo Máximo de Liquidação** | Circ. SUSEP 621, Art. 43 | Indenização deve ser paga em no máximo **30 (trinta) dias corridos**, contados da entrega de todos os documentos básicos pelo segurado. | O sistema deve manter cronômetro regressivo com alertas automáticos em D+15, D+20 e D+25. Ao atingir D+30 sem pagamento, o sistema aplica juros moratórios e correção monetária automática pelo IPCA/IBGE. | **MÁXIMA (Mandatória)** |
| **Suspensão da Contagem de Prazo** | Circ. SUSEP 621, Art. 43, § 2º | A solicitação fundamentada de documentos complementares (dúvida justificada) **suspende** a contagem dos 30 dias. A contagem recomeça a partir do 1º dia útil seguinte à entrega dos novos documentos. | O REEF Core deve suportar evento de status `SUSP_DOC_COMPL`. O contador congela na data da solicitação e é retomado exatamente de onde parou quando o segurado anexar os comprovantes. | **MÁXIMA** |
| **Indenização Integral e Salvados** | Código Civil, Art. 786 & Circ. SUSEP 621 | Caracterizada quando o custo de reparação superar **75%** do Limite Máximo de Garantia (LMG) ou valor referenciado. A propriedade do salvado transfere-se integralmente à seguradora após pagamento. | O módulo de peritagem deve calcular a razão percentual orçamento/LMG. Se $\ge 75\%$, chaveia automaticamente para fluxo de *Perda Total*, bloqueia emissão de ordem de conserto e abre esteira de baixa de gravame e leilão de salvados. | **ALTA** |
| **Franquia Simples vs Dedutível** | Circ. SUSEP 621, Art. 38 | *Franquia Dedutível*: segurado participa sempre com o valor fixado. *Franquia Simples*: prejuízos inferiores à franquia não são indenizados; se superiores, a seguradora indeniza o total sem dedução. | Parametrização no REEF de flags `FRANQUIA_TIPO = DEDUTIVEL | SIMPLES`. O motor de cálculo de liquidação aplica a fórmula correspondente antes de gerar a ordem de pagamento. | **MÉDIA** |

---

### 2.2. Módulo de Emissão e Contratos (`REEF-EMI`)

| Requisito Regulatório | Base Legal | Regra Operacional SUSEP | Impacto Técnico no REEF Core | Criticidade |
| :--- | :--- | :--- | :--- | :--- |
| **Prazo de Aceitação de Proposta** | Circ. SUSEP 621, Art. 10 | A seguradora tem **15 (quinze) dias corridos** para manifestar expressamente a recusa da proposta a partir do seu recebimento. A ausência de manifestação acarreta **aceitação tácita**. | Propostas transmitidas no portal ou via API recebem carimbo de data/hora oficial. Se não houver recusa fundamentada registrada até as 23:59 de D+15, o REEF converte automaticamente a proposta em apólice ativa com início de vigência retroativo. | **MÁXIMA** |
| **Dever de Veracidade e Boa-Fé** | Código Civil, Art. 766 | Declarações inexatas de má-fé anulam o direito à indenização. Declarações inexatas involuntárias permitem repactuação do prêmio ou cancelamento unilateral. | O formulário de contratação do REEF deve armazenar log imutável de respostas do questionário de risco com assinatura digital ou autenticação biométrica/OTP do proponente. | **ALTA** |
| **Cláusula de Cancelamento e Resilição** | Código Civil, Art. 763 & Súmula 610 STJ | O atraso no pagamento do prêmio **não opera o cancelamento automático** da apólice sem prévia notificação/interpelação do segurado concedendo prazo para purgação da mora. | O REEF não pode executar rotina de *batch* cancelando apólices inadimplentes sumariamente. É obrigatória a emissão de notificação formal (SMS, E-mail ou Cartório) com prazo mínimo regulamentar antes de alterar o status para `CANCELADA_MORA`. | **MÁXIMA** |

---

### 2.3. Módulo de Terceiros e Sub-rogação (`REEF-TER`)

| Requisito Regulatório | Base Legal | Regra Operacional SUSEP | Impacto Técnico no REEF Core | Criticidade |
| :--- | :--- | :--- | :--- | :--- |
| **Sub-rogação Legal e Direito de Regresso** | Código Civil, Art. 786 | Paga a indenização, o segurador sub-roga-se, nos limites do valor pago, nos direitos e ações que competirem ao segurado contra o terceiro causador do dano. Ineficaz qualquer ato do segurado que diminua ou prejudique esse direito. | Ao concluir a liquidação financeira de sinistro de danos com culpa atribuível a terceiro, o REEF gera automaticamente o dossiê de cobrança regressiva no módulo de Terceiros (`REEF-TER`), integrando dados do perito, boletim de ocorrência e recibo de quitação. | **ALTA** |
| **Vedação de Regresso contra Parentes** | Código Civil, Art. 786, § 2º | É vedada a ação regressiva da seguradora contra o cônjuge do segurado, seus descendentes ou ascendentes, consanguíneos ou afins, salvo dolo comprovado. | Trava algorítmica no REEF: se o terceiro causador possuir vínculo parental registrado nos dados cadastrais com o segurado, o sistema bloqueia a criação da cobrança judicial de regresso. | **ALTA** |

---

### 2.4. Módulo de Contabilidade e Tesouraria (`REEF-TES`)

| Requisito Regulatório | Base Legal | Regra Operacional SUSEP | Impacto Técnico no REEF Core | Criticidade |
| :--- | :--- | :--- | :--- | :--- |
| **Provisões Técnicas (IBNR e IBNER)** | Resolução CNSP 321/2015 & IFRS 17 | Constituição mandatória de provisões para sinistros ocorridos mas não avisados (IBNR) e para sinistros não suficientemente avisados (IBNER). | O REEF deve alimentar diariamente a base atuarial com a triangulação de dados de sinistros (métodos Chain Ladder / Bornhuetter-Ferguson), garantindo suporte contábil e solvência regulamentar perante a SUSEP. | **MÁXIMA** |
| **Restituição Proporcional de Prêmio** | Circ. SUSEP 621 | Em caso de cancelamento da apólice antes do término da vigência por iniciativa de qualquer das partes, deve haver restituição da parcela de prêmio não consumida (pro rata temporis ou tabela de prazo curto, conforme estipulado). | Motor de devolução financeira do REEF calcula a fração temporal e gera a ordem de estorno bancário ou crédito em favor do segurado em até 10 dias úteis. | **ALTA** |

---

### 2.5. Governança, Ouvidoria e Conduta de Mercado

| Requisito Regulatório | Base Legal | Regra Operacional SUSEP | Impacto Técnico no REEF Core | Criticidade |
| :--- | :--- | :--- | :--- | :--- |
| **Ouvidoria Institucional com SLA Estrito** | Resolução CNSP 382/2020 | Manutenção obrigatória de Ouvidoria com canal independente do SAC. Prazo máximo improrrogável de **10 (dez) dias úteis** para resposta final conclusiva ao reclamante. | Registro de chamados de Ouvidoria com contagem segregada em dias úteis locais (descontando feriados nacionais e estaduais cadastrados no REEF). Escalação imediata para diretoria em D+7 úteis. | **MÁXIMA** |
| **Interoperabilidade Open Insurance** | Circular SUSEP 635/2021 | Compartilhamento seguro de apólices, dados cadastrais e sinistros sob autorização explícita do segurado com vigência de até 12 meses. | O REEF expõe APIs compatíveis com o padrão OPIN (Open Insurance Brasil), autenticação mTLS mútua, tokens OAuth2 FAPI-RW e controle de vigência do consentimento digital. | **ALTA** |

---

## 3. Diretrizes de Governança na Mudança de Jurisdição

> **Regra de Ouro do Ecossistema**: Quando o administrador alterar o país ativo ou disparar uma sincronização de legislação no Painel Admin:
> 1. **Esta Matriz de Impacto Regulatório deve ser integralmente atualizada** para refletir os códigos jurídicos e circulares do país de destino (ex.: Espanha, Chile, México).
> 2. **Os prazos de sinistros no sistema devem ser reparametrizados** (ex.: Brasil = 30 dias; Espanha = 40 dias para adiantamento do mínimo e mora a 20% ao ano após 2 anos conforme Art. 20 da Lei 50/1980).
> 3. **O Grafo Neural 3D deve recalcular arestas** e apontar conflitos ou divergências nos nós de negócio e nos módulos de Emissão, Sinistros e Tesouraria.
