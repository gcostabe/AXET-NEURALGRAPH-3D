---
title: "Motor de Tarifação Tronador (RTE) — Guia Funcional e Atuarial"
tags:
  - "tarifa"
  - "tronador"
  - "rte"
  - "fórmula"
  - "cálculo"
  - "atuária"
  - "apólice"
  - "contrato"
  - "acdc"
topics:
  - "Tarifação"
  - "Cálculo Atuarial"
  - "Motor RTE"
category: "Regras de Negócio e Funcional"
domain: "ACDC"
system: "MAPFRE - REEF / ACDC"
lobe_hint: "temporal"
version: "1.0.0"
updated_at: "2026-09-25T12:44:05.455Z"
---
# Motor de Tarifação Tronador (RTE) — Guia Funcional e Atuarial

## 1. Ciclo de Vida da Tarifação
O Rating Engine (RTE) executa o cálculo de prêmios de seguro segundo as diretrizes atuariais da MAPFRE:
1. **Entrada da Cotação:** Recebe os dados de risco (segurado, bem, histórico, coberturas solicitadas).
2. **Resolução de Fórmulas:** Avalia as expressões cadastradas em `FORMULA-DEFINITION` para o ramo especificado.
3. **Resolução Dinâmica de Constantes:** Consulta dinamicamente via `MMATH.f_cte('CONSTANTE')` os valores vigentes em `CONSTANT-DEFINITION`.
4. **Decomposição do Prêmio (Breakdown):**
   - **Prêmio Comercial:** Valor cobrado do segurado.
   - **Prêmio Líquido:** Prêmio puro destinado à cobertura estatística dos sinistros.
   - **Comissão de Corretagem:** Percentual destinado ao canal distribuidor.
   - **Custo Operacional e Despesas:** Custo de administração da apólice.
   - **Tributos e Encargos:** Alíquotas de IOF, ISS e impostos locais.
   - **Resseguro:** Prêmio cedido a resseguradores parceiros.

## 2. Biblioteca de Funções Matemáticas Atuariais
- `MMATH.f_cte('NOME')`: Resolução dinâmica do valor da constante para o ramo e país atual.
- `MMATH.round(expressao, casas)`: Arredondamento numérico com precisão atuarial.
- `MMATH.min(termoA, termoB)`: Retorna o menor valor (utilizado para limites máximos e tetos tarifários).
- `MMATH.max(termoA, termoB)`: Retorna o maior valor (utilizado para garantia de piso mínimo de prêmio).
- `MMATH.nvl(campo, valorFallback)`: Tratamento seguro de valores nulos ou indefinidos.
- `[CAMPO]`: Delimitação textual de variáveis atuariais (ex: `[BASE_CALCULO]`, `[KM_RODADO]`).
