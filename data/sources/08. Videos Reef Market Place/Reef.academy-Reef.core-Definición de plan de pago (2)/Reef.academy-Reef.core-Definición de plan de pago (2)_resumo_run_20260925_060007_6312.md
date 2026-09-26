# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.academy-Reef.core-Definición de plan de pago (2).mp4`
**Data de processamento:** 25/09/2026 06:03:43
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Análise Estruturada — Treinamento sobre Definição de Planos de Pagamento no Reef.core

## 1. Síntese executiva

A sessão analisada é um treinamento funcional sobre a configuração de **planos de pagamento** no sistema/documentação **Reef.core**, acessado por meio do portal MAPFRE Marketplace. O foco principal foi explicar como um plano de pagamento é definido em duas camadas:

1. **Definição geral do plano**, que estabelece, entre outros pontos, quantidade de parcelas, direção de geração e data-base; e  
2. **Definição individual de cada parcela**, que determina sua data de efeito, seu valor e sua comissão.

A principal mensagem transmitida é que o comportamento das parcelas não deve ser entendido como uma sequência em que cada parcela deriva da anterior. Cada parcela é configurada de forma independente, sempre a partir de uma **data de início comum** definida no plano. Essa regra impacta diretamente datas de efeito, vencimentos, distribuição de valores e cenários de emissão, endosso, retroatividade e cancelamento.

A sessão também mostra que o modelo é altamente parametrizável: permite parcelas em dias ou meses, unidades positivas, negativas ou zero, valores não proporcionalmente distribuídos, conceitos econômicos fracionáveis ou não fracionáveis e lógica de negócio por procedimento PL. Ao mesmo tempo, essa flexibilidade exige cuidado, pois algumas definições podem gerar parcelas fora da vigência ou distribuições aparentemente incorretas que são ajustadas automaticamente por regras do sistema.

---

## 2. Escopo, fontes e qualidade da evidência

Esta análise foi construída exclusivamente a partir de:

- transcrição automática da fala, produzida por Whisper;
- evidências visuais extraídas de telas e slides;
- documentação exibida durante a reunião.

Há ruído relevante na transcrição, especialmente na abertura e em trechos com palavras repetidas, trocas entre termos similares e reconhecimento imperfeito de palavras em espanhol. Quando a evidência visual confirma um termo, ela foi usada para contextualizar a fala.

### 2.1. Termos com maior confiança

| Termo | Evidência | Observação |
|---|---|---|
| Reef.core | Portal e logo exibidos nos frames 04 e 08 | A fala transcrita registra formas como “rizcore”, aparentemente referindo-se a Reef.core. |
| MAPFRE Marketplace | Frame 04 | Portal de documentação usado durante o treinamento. |
| Plan de pago | Frames 05, 08 e transcrição | Conceito central da sessão. |
| Emisión | Frames 04 e 05 | Módulo onde a documentação de planos de pagamento foi localizada. |
| Póliza | Transcrição e documentação | Apólice de seguro. |
| Endoso | Transcrição | Termo usado para movimentos posteriores relacionados à apólice. |
| Cuota | Documentação e transcrição | Parcela/instalação do plano de pagamento. |
| Recibo | Transcrição | Documento/cobrança gerado no contexto das parcelas. |
| Procedimiento PL | Transcrição | Mecanismo citado para implementar lógica de negócio; a sigla “PL” não é expandida na reunião. |

### 2.2. Limites da análise

A reunião não detalha, de forma suficiente:

- tecnologia de implementação do Reef.core;
- banco de dados;
- APIs;
- arquitetura de serviços;
- autenticação, autorização ou IAM;
- infraestrutura, cloud ou ambientes;
- modelo de observabilidade;
- SLAs;
- regras completas de cálculo financeiro;
- fluxo técnico de integração com meios de pagamento;
- governança de versões da documentação;
- linguagem, sintaxe ou ciclo de execução dos procedimentos PL.

Portanto, nenhum desses temas deve ser inferido além do que foi dito.

---

## 3. Contexto e antecedentes

O treinamento aparenta dar continuidade a uma sessão anterior. O instrutor inicia lembrando que, no encontro anterior, foram tratados os aspectos gerais de um plano de pagamento, incluindo:

- quantidade de parcelas;
- geração das parcelas no sentido **efeito → vencimento** ou **vencimento → efeito**;
- data de início usada para gerar os efeitos das parcelas;
- uma parcela calculada por diferença;
- comportamento de anulações/cancelamentos;
- tratamento de parcelas que eventualmente fiquem fora da vigência da apólice.

A sessão atual, por sua vez, concentra-se na definição granular de cada parcela do plano.

A documentação é navegada no MAPFRE Marketplace, dentro da área de documentação Reef.core. Visualmente, o portal mostra módulos como:

- Común;
- Terceros;
- Emisión;
- Siniestros.

O plano de pagamento é apresentado como pertencente ao contexto do módulo de **Emisión** e pode ser acessado a partir da definição de apólice. Embora a navegação tenha sido exemplificada a partir do tipo de negócio “automóvil”, o instrutor afirma que, para fins de entendimento, a configuração de plano de pagamento pode ser aplicada a qualquer tipo de negócio.

**Rastreabilidade visual:** frames 04, 05 e 08.

---

## 4. Modelo mental apresentado

A explicação pode ser consolidada da seguinte forma:

```text
Definição geral do plano de pagamento
│
├── Número total de parcelas
├── Direção de geração das parcelas
│   ├── Efeito → vencimento
│   └── Vencimento → efeito
├── Data de início da geração
└── Regras para parcelas fora da vigência
    ↓
Definição individual de cada parcela
│
├── Data de efeito
│   ├── Unidade: dias ou meses
│   ├── Número de unidades
│   └── Lógica de negócio opcional
├── Valor / distribuição de importes
│   ├── Percentual da parcela
│   └── Regras dos conceitos econômicos
└── Comissão da parcela
```

Essa é uma consolidação analítica do conteúdo apresentado; não corresponde a um diagrama literal exibido durante a reunião.

---

## 5. Problemas e necessidades abordados

### 5.1. Necessidade de controlar o comportamento das parcelas

O treinamento deixa claro que dividir uma apólice em parcelas não é necessariamente uma divisão linear ou proporcional. Cada parcela pode ter:

- uma data de efeito distinta;
- um valor distinto;
- uma comissão distinta;
- uma regra própria de geração.

A necessidade tratada é permitir que o plano represente regras comerciais, financeiras e operacionais diferentes de uma simples distribuição uniforme da prima.

### 5.2. Risco de gerar parcelas com datas inadequadas

A escolha da direção de geração e da data de início pode fazer com que parcelas sejam geradas:

- depois da data de vencimento da apólice;
- antes da vigência esperada;
- com efeito diferente do desejado;
- em datas aparentemente estranhas quando se usa dias em vez de meses.

A reunião reforça que o plano possui opções para lidar com parcelas que saem do período de vigência, mas não detalha todas as opções configuráveis.

### 5.3. Necessidade de lidar com retroatividade e emissões futuras

A opção de usar a “data do dia” como início da geração foi explicada como útil sobretudo em situações de retroatividade, para impedir que parcelas sejam geradas para datas anteriores ao momento atual da emissão.

Já a opção de usar a maior data entre efeito da apólice/endosso e data do dia foi apresentada como uma forma de cobrir tanto cenários retroativos quanto emissões com efeito futuro.

### 5.4. Necessidade de respeitar regras de cada conceito econômico

A distribuição do plano de pagamento não prevalece automaticamente sobre a definição dos componentes econômicos. Um conceito marcado como não fracionável deve ser cobrado integralmente na primeira parcela, mesmo que o plano distribua valores em várias parcelas.

Essa regra é relevante para impostos, recargos ou serviços que precisem ser pagos integralmente no início do contrato.

---

## 6. Solução funcional apresentada

## 6.1. Definição geral do plano de pagamento

A definição geral estabelece o comportamento comum do plano. Segundo a sessão, ela inclui ao menos:

- quantidade de parcelas;
- sentido de geração;
- data de início;
- tratamento de parcelas fora do período de vigência.

O instrutor menciona que um plano pode ter de **1 a 99 parcelas**.

> Esse número foi declarado durante a sessão e não foi validado externamente nesta análise.

### 6.1.1. Parcela calculada por diferença

Foi explicado que existe uma parcela que “sempre se gera por diferença”. Na prática, isso significa que uma das parcelas não segue diretamente a definição percentual configurada, pois é calculada para fechar a distribuição total.

A reunião mostra que essa regra pode mascarar uma distribuição percentual incorreta. Por exemplo, caso as parcelas explicitamente definidas somem apenas 85% do total, a parcela calculada por diferença absorve o percentual restante, garantindo a distribuição integral.

Há uma aparente inconsistência na fala quanto a qual parcela recebe a diferença: o instrutor inicialmente se refere genericamente a “a última parcela”, mas no exemplo posterior afirma que a primeira parcela passa de 10% para 25%, pois é ela que absorve a diferença entre o total e as demais parcelas. O ponto seguro é:

- há uma regra de cálculo por diferença;
- ela garante o fechamento da distribuição;
- ela pode fazer com que uma configuração percentual incorreta não seja visível no resultado final;
- a transcrição não permite determinar com segurança se a parcela por diferença é sempre a primeira, sempre a última ou se depende de uma regra de configuração não detalhada.

### 6.1.2. Anulações e cancelamentos

Em caso de anulação da apólice, o sistema não segue simplesmente a definição do plano de pagamento. A explicação dada é que a função da anulação é cancelar os recibos pendentes.

O exemplo apresentado foi:

```text
Recibo original: 100
↓
Recibo de cancelamento: -100
```

A intenção é neutralizar recibos já gerados.

A reunião também esclarece que a devolução de determinados valores em caso de anulação depende de uma configuração no nível do conceito de desglose. Essa configuração é descrita como um parâmetro/checkbox, e não como programação.

---

## 7. Direção de geração das parcelas

## 7.1. Efeito → vencimento

Nesse modelo, a geração parte da data de efeito e avança até o vencimento da apólice.

```text
Data de efeito
    ↓
Geração das parcelas
    ↓
Vencimento da apólice
```

O instrutor usa como exemplo um plano semestral. Nesse sentido, um endosso realizado em momento posterior pode alterar o intervalo efetivo entre parcelas. A primeira parcela pode manter seis meses, enquanto a última ou outra parcela pode não ter exatamente o mesmo intervalo, devido ao tempo restante até o vencimento da apólice.

A ideia transmitida é que, nesse sentido, a geração pode assumir uma forma visual “em escada”, pois as parcelas são organizadas a partir do efeito de cada movimento e da vigência disponível.

## 7.2. Vencimento → efeito

Nesse modelo, a geração parte do vencimento da apólice e retrocede em direção ao efeito.

```text
Vencimento da apólice
    ↓
Geração retroativa das parcelas
    ↓
Data de efeito
```

Nesse caso, o instrutor destaca que, em um exemplo semelhante, as parcelas tendem a manter intervalos homogêneos, exceto a parcela residual que não completa o período esperado.

Quando a geração parte do vencimento, as unidades precisam tipicamente ser negativas para que as datas calculadas permaneçam dentro da vigência. Caso fossem positivas, as parcelas avançariam para depois do vencimento, saindo do período da apólice.

### 7.2.1. Exemplo conceitual de unidades negativas

Para uma apólice com vencimento em 1º de janeiro de 2023, um plano trimestral em sentido vencimento → efeito pode ser representado por valores negativos:

| Parcela | Unidades em meses | Efeito esperado |
|---|---:|---|
| 1 | -12 | 1º de janeiro de 2022 |
| 2 | -9 | 1º de abril de 2022 |
| 3 | -6 | 1º de julho de 2022 |
| 4 | -3 | 1º de outubro de 2022 |

Durante a explicação, houve um erro reconhecido pelo próprio instrutor: uma data apresentada inicialmente como resultado de “-3 meses” estava incorreta. Ele corrigiu a lógica, reafirmando que três meses antes de 1º de janeiro de 2023 é 1º de outubro de 2022, e não 1º de abril de 2023.

Essa correção é relevante porque demonstra que:

- a configuração deve usar sinal negativo para retroceder a partir do vencimento;
- uma configuração positiva levaria a data para fora da vigência;
- a documentação/exemplo exibido precisava de ajuste, segundo o próprio apresentador.

**Rastreabilidade:** a correção aparece na transcrição durante a explicação do plano trimestral reverso.

---

## 8. Data de início da geração das parcelas

A “data de início” não é simplesmente a data de início da apólice. O instrutor reforça, em resposta a uma pergunta, que se trata da **data de início da geração dos efeitos das parcelas**.

Ela funciona como o ponto de partida comum para o cálculo de todas as parcelas.

### 8.1. Opções apresentadas

A documentação exibida lista as seguintes opções:

1. Data de vencimento;
2. Data de efeito da apólice ou do suplemento/endosso;
3. Data do dia;
4. Maior data entre o efeito da apólice/suplemento e a data do dia;
5. Lógica de negócio.

**Rastreabilidade visual:** frames 06 e 07.

### 8.2. Data de vencimento

Essa opção é apresentada como exclusiva do sentido de geração **vencimento → efeito**.

Nesse caso, o vencimento se torna a referência para calcular parcelas retroativamente.

### 8.3. Data de efeito da apólice ou do endosso

A geração usa como referência a data de efeito da apólice ou do movimento/endosso.

Essa opção foi associada pelo instrutor ao sentido efeito → vencimento.

### 8.4. Data do dia

A geração usa como referência a data corrente em que o movimento é realizado.

Exemplo citado:

```text
Data atual: 16 de maio
Data de efeito da apólice: 10 de maio
Regra escolhida: data do dia
↓
As parcelas passam a ser geradas a partir de 16 de maio.
```

A justificativa dada é evitar geração retroativa de recibos quando uma apólice é emitida com efeito anterior à data atual.

### 8.5. Maior data entre efeito e data do dia

Essa regra seleciona a maior entre:

- data de efeito da apólice/endosso;
- data do dia.

Exemplo citado:

```text
Data atual: 16 de maio
Efeito da apólice: 20 de maio
↓
Data de início usada: 20 de maio
```

Segundo a explicação, essa alternativa cobre simultaneamente cenários retroativos e futuros.

### 8.6. Lógica de negócio

A quinta opção permite usar uma lógica de negócio para decidir, caso a caso, qual das opções anteriores deve ser utilizada.

Foi citado o uso de um **procedimento PL** que determina a regra aplicável conforme o contexto. O instrutor exemplifica que, em um caso, poderia ser utilizada a data de efeito da apólice e, em outro, a data do dia.

A reunião não explica:

- o que significa exatamente a sigla PL;
- como o procedimento é cadastrado;
- quais dados estão disponíveis para sua execução;
- onde sua lógica é mantida;
- quais mecanismos de validação ou testes existem.

---

## 9. Definição individual das parcelas

Depois de definir o plano como um todo, é necessário definir cada parcela individualmente.

Se um plano possui:

- 3 parcelas, são necessárias 3 definições;
- 7 parcelas, são necessárias 7 definições;
- 12 parcelas, são necessárias 12 definições;
- 15 parcelas, são necessárias 15 definições.

Para cada parcela, o instrutor organiza a definição em três grupos de propriedades:

1. propriedades que determinam a **data de efeito**;
2. propriedades que determinam o **importe/valor**;
3. propriedades que determinam a **comissão**.

A sessão analisada aprofunda sobretudo os dois primeiros grupos. A comissão é mencionada como parte da estrutura, mas sua configuração não é explicada em detalhe antes do encerramento da reunião.

---

## 10. Definição da data de efeito de cada parcela

## 10.1. Número da parcela

O primeiro elemento é identificar qual parcela está sendo configurada:

```text
Parcela 1 de 3
Parcela 2 de 3
Parcela 3 de 3
```

A identificação é relevante porque cada uma pode ter configuração diferente de efeito, valor e comissão.

## 10.2. Unidade de geração

Para definir a data de efeito, a configuração pode utilizar:

- dias;
- meses.

**Rastreabilidade visual:** frame 09.

A data de efeito é calculada pela soma de unidades à data de início geral do plano.

```text
Data de efeito da parcela
=
Data de início da geração
+
Quantidade de unidades configurada
```

A unidade selecionada define se a soma será feita em dias ou em meses.

## 10.3. Número de unidades

Depois de definir a unidade, deve-se indicar sua quantidade.

Exemplos:

```text
10 dias
3 meses
0 meses
-3 meses
```

A quantidade pode ser:

- positiva;
- zero;
- negativa.

### 10.3.1. Unidades positivas

Representam deslocamento para frente a partir da data de início.

Exemplo:

```text
Data de início: 16 de maio
Unidade: dias
Quantidade: 10
↓
Data de efeito: 26 de maio
```

### 10.3.2. Unidade zero

O valor zero faz com que a parcela tenha a mesma data da data de início.

```text
Data de início: 1º de janeiro
Quantidade: 0 meses
↓
Data de efeito da parcela: 1º de janeiro
```

### 10.3.3. Unidades negativas

São necessárias especialmente quando o sentido do plano é vencimento → efeito.

Exemplo:

```text
Data de início: vencimento da apólice
Quantidade: -3 meses
↓
Efeito três meses antes do vencimento
```

## 10.4. Todas as parcelas usam a mesma data-base

Este é um dos pontos mais importantes do treinamento.

Cada parcela é calculada de forma independente a partir da mesma data de início do plano. A segunda parcela não deriva da primeira; a terceira não deriva da segunda; e assim sucessivamente.

Exemplo apresentado:

```text
Data de início: 1º de janeiro

Parcela 1: +1 mês  → 1º de fevereiro
Parcela 2: +3 meses → 1º de abril
Parcela 3: +3 meses → 1º de abril
Parcela 4: +6 meses → 1º de julho
```

Nesse exemplo, as parcelas 2 e 3 possuem a mesma data de efeito porque ambas aplicam a mesma regra sobre a mesma data-base.

### Implicação analítica

Isso indica que a configuração privilegia autonomia total por parcela, e não uma progressão cronológica automaticamente encadeada. Como consequência, o sistema permite combinações flexíveis, mas também permite configurações que não seguem uma sequência intuitiva.

---

## 11. Dias versus meses

## 11.1. Comportamento ao usar dias

Quando a unidade é “dias”, o sistema soma exatamente a quantidade de dias à data de início.

Exemplo exibido na documentação:

| Data de início | Unidade | Nº de unidades | Data de efeito |
|---|---|---:|---|
| 15 de janeiro de 2023 | Dias | 10 | 25 de janeiro de 2023 |

**Rastreabilidade visual:** frame 10.

O instrutor usa fevereiro para mostrar que a soma por dias pode alterar o dia do mês esperado:

| Data de início | Dias somados | Resultado citado |
|---|---:|---|
| 1º de fevereiro | 28 | 1º de março |
| 1º de fevereiro | 29 | 2 de março |
| 1º de fevereiro | 30 | 3 de março |
| 1º de fevereiro | 31 | 4 de março |

A consequência é que uma regra baseada em “30 dias” não equivale necessariamente a “um mês”. Isso é relevante em planos que desejam manter cobrança sempre no mesmo dia do mês.

## 11.2. Comportamento ao usar meses

Quando a unidade é “meses”, o sistema soma meses à data de início.

Exemplo exibido:

| Data de início | Unidade | Nº de unidades | Data de efeito |
|---|---|---:|---|
| 15 de janeiro de 2023 | Meses | 10 | 15 de novembro de 2023 |

**Rastreabilidade visual:** frame 10.

O instrutor destaca um comportamento específico para datas que não existem no mês destino:

```text
31 de janeiro de 2023 + 1 mês
↓
28 de fevereiro de 2023
```

A explicação é que não existe 31 de fevereiro. Nesse caso, o sistema usa o último dia disponível do mês de destino, sem avançar automaticamente para março.

Também foi ressaltado que esse comportamento não significa uma regra geral de “sempre ir ao último dia do mês”. Por exemplo:

```text
28 de fevereiro + 1 mês
↓
28 de março
```

Como o dia 28 existe em março, o resultado permanece no dia 28, ainda que 28 de fevereiro fosse o último dia daquele mês.

### Casos mencionados

| Data inicial | Soma | Resultado explicado |
|---|---|---|
| 31 de janeiro de 2023 | +1 mês | 28 de fevereiro de 2023 |
| 28 de fevereiro de 2023 | +1 mês | 28 de março de 2023 |
| 30 de abril | +1 mês | 30 de maio |
| 31 de janeiro de 2024 | +1 mês | 29 de fevereiro de 2024 |

O último caso considera 2024 como ano bissexto.

---

## 12. Combinação de unidades entre parcelas

O sistema permite misturar unidades dentro de um mesmo plano de pagamento.

Exemplo conceitual citado:

```text
Parcela 1: meses
Parcela 2: dias
Parcela 3: meses
Parcela 4: dias
```

O instrutor observa que talvez essa combinação não faça sentido em todos os cenários de negócio, mas afirma que o sistema permite a configuração.

Também é possível que uma parcela posterior tenha data de efeito anterior a uma parcela anterior. Isso não ocorre necessariamente pela combinação entre dias e meses, mas pela liberdade de definir o número de unidades de cada parcela independentemente.

Exemplo analítico compatível com a explicação:

```text
Parcela 3: +6 meses
Parcela 4: +3 meses
↓
A parcela 4 pode ter efeito antes da parcela 3.
```

Essa possibilidade deve ser entendida como flexibilidade técnica, não como recomendação funcional.

---

## 13. Lógica de negócio para número de unidades

Além de definir diretamente o número de unidades, o sistema permite associar uma lógica de negócio que determine essa quantidade dinamicamente.

Segundo a explicação, um procedimento PL pode analisar circunstâncias da emissão ou do endosso e decidir o número de unidades aplicável à parcela.

A fala indica que a quantidade pode variar conforme “qualquer informação que possa ter a apólice”, mas não especifica:

- quais atributos podem ser consultados;
- se a lógica é executada na emissão, no endosso ou em ambos;
- como são tratados erros no procedimento;
- se existe fallback quando não há resultado;
- como se evita configuração inconsistente entre parcelas.

---

## 14. Vencimento de cada parcela

Uma vez definida a data de efeito de cada parcela, o vencimento é derivado pela regra:

```text
Vencimento da parcela N
=
Efeito da parcela N + 1
```

Exemplo fornecido:

```text
Efeito da parcela 1: 1º de janeiro
Efeito da parcela 2: 1º de fevereiro
↓
Vencimento da parcela 1: 1º de fevereiro
```

A reunião não detalha qual regra se aplica ao vencimento da última parcela. É plausível que ele se relacione ao vencimento da apólice, mas isso não foi explicitamente afirmado na sessão analisada e, portanto, não deve ser tratado como fato.

---

## 15. Parcelas fora do período de vigência

O instrutor retoma uma configuração vista no encontro anterior: o que fazer quando alguma parcela fica fora da vigência da apólice.

O cenário apresentado é uma apólice temporal de seis meses com plano de quatro parcelas, no qual as parcelas três e quatro ultrapassariam a data de vencimento.

Foram mencionadas duas linhas gerais de tratamento:

1. permitir a geração fora da vigência; ou  
2. não permitir e definir o que fazer com os valores associados às parcelas que excederam o período.

A reunião indica que esse comportamento pode depender do negócio e do país, conforme pergunta de um participante. A resposta confirma que essa dependência existe.

Não foram detalhadas:

- todas as alternativas de configuração;
- como os valores são redistribuídos;
- se a regra afeta só importes, só comissões ou ambos;
- quais validações ocorrem antes da emissão;
- quais regras prevalecem em cada país.

---

## 16. Definição de importes das parcelas

Depois de tratar as datas de efeito e vencimento, a sessão passa à distribuição do valor da apólice entre as parcelas.

O instrutor usa “prima” como uma simplificação, mas esclarece que a configuração pode envolver outros conceitos, como:

- prima;
- recargos;
- bonificações;
- descontos;
- impostos;
- outros elementos econômicos.

## 16.1. Distribuição não necessariamente proporcional

A distribuição de valores entre parcelas não precisa seguir uma proporção temporal.

Uma parcela de um mês em uma apólice de doze meses não precisa obrigatoriamente corresponder a um doze avos do total. Da mesma forma, uma primeira parcela pode representar uma entrada, um valor reduzido ou outro percentual específico.

Exemplo citado em diálogo:

```text
Primeira parcela: 10%
Segunda parcela: 50%
Terceira parcela: 30%
```

O objetivo é mostrar que cada parcela pode ter percentual próprio.

## 16.2. Percentual de cada parcela

A configuração prevê a definição do percentual do importe total atribuído à parcela.

Exemplo apresentado:

| Parcela | Percentual configurado |
|---|---:|
| 1 | 10% |
| 2 | 25% |
| 3 | 15% |
| 4 | 35% |
| **Total explícito** | **85%** |

Esse exemplo foi usado para demonstrar que a soma pode não atingir 100%.

## 16.3. Ajuste por diferença

Mesmo que a distribuição configurada esteja incompleta, o sistema calcula uma parcela por diferença para completar 100%.

O instrutor explica que isso pode esconder erro de configuração: embora a definição seja incorreta, o resultado financeiro final pode fechar o total porque uma parcela absorve o valor residual.

### Risco funcional explicitamente demonstrado

```text
Percentuais configurados incorretamente
↓
Sistema completa a diferença automaticamente
↓
Distribuição final pode parecer válida
↓
Erro de parametrização pode passar despercebido
```

Essa relação é sustentada pelo exemplo apresentado.

---

## 17. Conceitos econômicos fracionáveis e não fracionáveis

A distribuição do plano de pagamento aplica-se aos conceitos econômicos definidos como fracionáveis.

Cada conceito econômico possui uma configuração que determina se ele:

- fraciona; ou
- não fraciona.

## 17.1. Conceitos fracionáveis

Um conceito fracionável é distribuído conforme os percentuais definidos no plano de pagamento.

Exemplo: prima de 1.000 com quatro parcelas de 25%.

```text
Parcela 1: 250
Parcela 2: 250
Parcela 3: 250
Parcela 4: 250
```

## 17.2. Conceitos não fracionáveis

Um conceito não fracionável é cobrado integralmente na primeira parcela, mesmo que o plano possua várias parcelas e percentuais distribuídos.

O instrutor cita como possíveis exemplos:

- impostos que não podem ser fracionados em determinados países;
- valores de assistência;
- componentes pagos integralmente a uma empresa de assistência;
- recargos ou outros conceitos econômicos.

## 17.3. Exemplo consolidado apresentado

A sessão apresenta uma apólice hipotética:

| Elemento | Valor | Regra |
|---|---:|---|
| Prima | 1.000 | Fraciona |
| Recargo | 20 | Não fraciona |
| Plano | 4 parcelas de 25% | Distribuição geral |

Resultado:

| Recibo | Prima | Recargo | Total |
|---|---:|---:|---:|
| 1 | 250 | 20 | 270 |
| 2 | 250 | 0 | 250 |
| 3 | 250 | 0 | 250 |
| 4 | 250 | 0 | 250 |

A regra explicitamente afirmada é:

> A definição do conceito econômico prevalece sobre a distribuição do plano de pagamento.

Isso significa que, se um conceito é marcado como não fracionável, o plano não pode fracioná-lo.

---

## 18. Cancelamento e devolução de conceitos econômicos

Uma participante pergunta sobre o cancelamento de recibos já pagos e a possibilidade de cancelar uma apólice sem devolver um recargo.

A resposta esclarece que a devolução ou não devolução é configurada no nível do **conceito de desglose** — termo preservado da transcrição, sem tradução técnica adicional, pois a reunião não define formalmente seu significado.

A configuração é descrita como:

- um parâmetro;
- um checkbox;
- uma propriedade do conceito de desglose;
- não uma lógica de programação.

### 18.1. Regra geral

Se o conceito estiver configurado como “não devolve”, o valor correspondente não deve ser devolvido na anulação.

No exemplo:

```text
Recargo: 20
Configuração: não devolve
↓
Os 20 não são devolvidos em uma anulação comum.
```

### 18.2. Exceção mencionada

O instrutor cita uma situação em que o sistema pode oferecer a possibilidade de devolver um conceito marcado como não devolvível:

- cancelamento com efeito coincidente com o efeito da apólice;
- possível caso de emissão feita por erro;
- cancelamento realizado para corrigir a emissão em vez de executar outro movimento.

Nesse contexto, o sistema pode perguntar ao operador se deseja devolver o conceito, mesmo que sua regra padrão seja não devolver.

A reunião não detalha:

- se essa opção é obrigatória ou opcional;
- quais perfis podem tomar essa decisão;
- se há trilha de auditoria;
- quais outros cenários acionam a exceção.

---

## 19. Pagamento parcial e alteração do plano

Outra pergunta trata de pagamentos parciais de um recibo, especificamente sobre como preservar a estrutura econômica quando um recibo inicial contém prima e recargo.

O exemplo discutido considera um primeiro recibo de 270:

```text
250 de prima
+
20 de recargo
=
270
```

A resposta dada é que o pagamento parcial é tratado por meio de uma **alteração do plano de pagamento**, caracterizada como um endosso.

Segundo o instrutor:

1. identifica-se o recibo sobre o qual se deseja atuar;
2. altera-se o plano de pagamento;
3. divide-se o recibo;
4. reaplica-se a lógica de distribuição econômica.

No exemplo, se o cliente só puder pagar 200 de um recibo de 270:

```text
Pagamento parcial: 200
↓
Primeiro são considerados os 20 de recargo não fracionável
↓
O valor restante é associado à prima
↓
O saldo é tratado na parcela/subparcela resultante da divisão
```

O instrutor chama essa segunda estrutura de “segunda cuota” ou segundo pagamento do primeiro recibo, mas a transcrição não permite determinar se “subcuota” é um termo oficial do sistema.

---

## 20. Perguntas e respostas relevantes

## 20.1. Uso da data do dia em emissão retroativa

### Pergunta

Um participante pergunta se a opção “data do dia” é usada quando a apólice possui efeito anterior à data em que o movimento está sendo realizado.

### Resposta

Sim. O instrutor explica que essa opção é usada tipicamente para evitar geração de parcelas ou recibos retroativos. A data de início passa a ser a data do movimento atual.

### O que esclarece

A regra evita que uma emissão tardia crie cobranças com efeitos anteriores à data operacional da emissão.

---

## 20.2. Uso da maior data entre efeito e data do dia

### Pergunta

O participante pergunta se a quarta opção — maior entre data de efeito e data do dia — é utilizada quando se quer escolher a maior das duas datas.

### Resposta

Sim. O instrutor afirma que essa opção cobre tanto retroatividade quanto movimentos futuros.

### O que esclarece

A regra evita iniciar parcelas antes da data atual em movimentos retroativos e também evita iniciar antes do efeito quando esse efeito está no futuro.

---

## 20.3. Data de início é data da apólice ou data de efeito?

### Pergunta

Um participante pede confirmação sobre o significado de “data de início”.

### Resposta

O instrutor esclarece que se trata da **data de início da geração das parcelas**, e não simplesmente da data de início da apólice ou de uma data de efeito.

### O que esclarece

Essa é a data-base de cálculo de todas as parcelas e pode ser escolhida entre várias opções configuráveis.

---

## 20.4. Última parcela e cálculo no sentido vencimento → efeito

### Pergunta

Um participante questiona a posição da última parcela em um exemplo de geração reversa.

### Resposta

O instrutor reconhece que havia erro no exemplo exibido e corrige o valor de unidades para “-3 meses”.

### O que esclarece

A geração reversa requer unidades negativas. O exemplo também evidencia a necessidade de validar cuidadosamente configurações e materiais de documentação.

---

## 20.5. Parcelas fora da vigência dependem de país ou negócio?

### Pergunta

Um participante pergunta se permitir ou não parcelas fora do período de vigência depende do negócio e do país.

### Resposta

O instrutor confirma que sim.

### O que esclarece

A configuração de parcelas fora da vigência não parece ser uma regra universal do produto; ela pode ser condicionada à realidade local ou de negócio.

---

## 20.6. Não devolução de recargo em cancelamento

### Pergunta

Uma participante pergunta se é possível cancelar uma apólice sem devolver um recargo já pago.

### Resposta

Sim. A definição é feita no conceito de desglose por meio de um parâmetro que determina se o valor é devolvido em caso de anulação.

### O que esclarece

A política de devolução pertence ao conceito econômico, não ao plano de pagamento em si.

---

## 20.7. Exceção para cancelamento por erro

### Pergunta

A participante questiona se, apesar de a configuração indicar “não devolver”, existe alguma situação em que o valor pode ser devolvido.

### Resposta

O instrutor afirma que, quando o cancelamento ocorre no efeito da apólice — por exemplo, para corrigir uma emissão feita por erro — o sistema pode dar a opção de devolver o valor.

### O que esclarece

A configuração padrão de não devolução pode possuir exceções operacionais para correção de erros de emissão.

---

## 20.8. Pagamento parcial de recibo

### Pergunta

A participante pergunta se o sistema está preparado para receber pagamento parcial de um recibo e preservar a prioridade de cobrança do recargo sobre a prima.

### Resposta

O instrutor responde que isso é alcançado por uma mudança de plano de pagamento, realizada como endosso. A divisão do recibo reaplica a mesma lógica: primeiro considera o valor não fracionável, depois a prima.

### O que esclarece

O pagamento parcial não é descrito como uma baixa financeira direta sobre o recibo original, mas como uma reestruturação do plano via endosso.

---

## 21. Limitações reconhecidas durante a reunião

### 21.1. A sessão não conclui a definição completa das parcelas

O instrutor encerra a reunião informando que ainda restava conteúdo a tratar e que uma nova sessão seria criada para continuar a definição.

Portanto, esta sessão não cobre completamente:

- a configuração detalhada de comissões;
- todos os atributos de importes;
- todos os cenários de tratamento de parcelas fora da vigência;
- a documentação completa de conceitos econômicos;
- a configuração detalhada dos procedimentos PL.

### 21.2. Há erro reconhecido em exemplo exibido

O próprio instrutor aponta que um exemplo relacionado a “-3 meses” estava incorreto e precisava ser corrigido.

Isso é importante para futuros leitores da documentação: exemplos visuais não devem ser assumidos como corretos sem validação, sobretudo quando contradizem a regra explicada oralmente.

### 21.3. Flexibilidade não significa recomendação

A solução permite:

- misturar dias e meses;
- configurar datas não sequenciais;
- gerar parcelas com efeitos repetidos;
- gerar uma parcela posterior antes de outra anterior;
- usar valores zero, positivos e negativos.

Mas o instrutor ressalta, em alguns casos, que isso pode não fazer sentido do ponto de vista de negócio. A reunião não apresenta controles que impeçam configurações incoerentes.

---

## 22. Riscos e desafios

## 22.1. Riscos explicitamente evidenciados

| Risco | Como ocorre | Consequência possível |
|---|---|---|
| Distribuição percentual incorreta | Percentuais não somam 100% | Regra por diferença pode ocultar a falha de parametrização. |
| Parcelas fora da vigência | Direção, data-base ou unidades configuradas inadequadamente | Cobranças podem exceder o período da apólice. |
| Uso incorreto de sinal nas unidades | Unidades positivas em geração vencimento → efeito | Datas podem ser geradas após o vencimento. |
| Escolha inadequada de dias versus meses | Dias usados quando se espera manutenção do dia mensal | Datas podem variar por diferença de duração dos meses. |
| Configuração livre por parcela | Cada parcela é independente da anterior | Sequência temporal pode ficar incoerente. |
| Conceito econômico configurado inadequadamente | Fracionável/não fracionável definido incorretamente | Valores podem ser cobrados integralmente ou distribuídos de forma indesejada. |
| Devolução mal parametrizada | Regra de devolução do conceito de desglose | Cancelamentos podem devolver ou reter valores indevidamente. |

## 22.2. Desafios derivados do contexto

As observações abaixo são interpretações analíticas, não declarações literais da reunião.

### Governança de parametrização

O nível de flexibilidade apresentado sugere necessidade de governança forte sobre a configuração de planos. Como cada parcela pode ter regras independentes, é possível montar combinações válidas tecnicamente, mas inadequadas ao negócio.

### Validação funcional

A regra de cálculo por diferença reduz o risco de a distribuição financeira não fechar, mas pode aumentar o risco de erros de parametrização passarem despercebidos. Isso indica a importância de validações que comparem a distribuição definida com a distribuição esperada pelo negócio.

### Dependência de regras locais

A confirmação de que alguns comportamentos dependem do país ou negócio sugere que planos de pagamento precisam ser tratados como configurações contextuais, e não apenas como modelos financeiros universais.

---

## 23. Relações de causa e efeito reconstruídas

## 23.1. Retroatividade

```text
Emissão realizada após a data de efeito
↓
Risco de gerar parcelas retroativas
↓
Necessidade de controlar a data-base
↓
Uso da opção “data do dia”
↓
Parcelas passam a ser geradas a partir do dia do movimento
```

## 23.2. Movimento futuro

```text
Data de efeito posterior à data atual
↓
Risco de começar parcelas antes do efeito futuro
↓
Necessidade de escolher uma referência adequada
↓
Uso da maior data entre efeito e data do dia
↓
Geração começa na data futura de efeito
```

## 23.3. Geração reversa

```text
Plano parte da data de vencimento
↓
Unidades positivas avançariam além do vencimento
↓
Risco de parcela fora da vigência
↓
Uso de unidades negativas
↓
Datas são calculadas retroativamente dentro do período esperado
```

## 23.4. Conceito não fracionável

```text
Há componente econômico que não pode ser parcelado
↓
Plano geral prevê múltiplas parcelas
↓
Necessidade de preservar cobrança integral do componente
↓
Conceito definido como não fracionável
↓
Valor é concentrado no primeiro recibo
```

## 23.5. Pagamento parcial

```text
Cliente não paga integralmente um recibo
↓
Necessidade de manter prioridade de componentes econômicos
↓
Alteração do plano por endosso
↓
Recibo é dividido
↓
Regra de não fracionamento é reaplicada
```

---

## 24. Transformações e implicações analíticas

## 24.1. De parcelamento fixo para modelagem configurável

Uma leitura possível do modelo apresentado é que ele não trata parcelamento apenas como número de cobranças mensais. Ele o trata como uma estrutura configurável que combina:

- calendário;
- distribuição financeira;
- regras por componente;
- regras locais;
- tratamento de exceções;
- lógica de negócio.

Isso indica uma visão de plano de pagamento como mecanismo de negócio, não apenas como rotina de cobrança.

## 24.2. Separação entre regra do plano e regra do conceito econômico

A apresentação estabelece duas camadas de responsabilidade:

```text
Plano de pagamento
→ define como os valores podem ser distribuídos entre parcelas

Conceito econômico
→ define se aquele componente aceita ou não ser distribuído
```

A precedência fica clara: a configuração do conceito econômico prevalece quando há conflito com o plano.

## 24.3. Parametrização acima de programação para regras básicas

Embora exista possibilidade de lógica de negócio via procedimento PL, vários comportamentos são descritos como configuráveis por atributos, parâmetros e checkboxes:

- data de início;
- sentido;
- número de unidades;
- fracionamento;
- devolução em anulação.

Isso sugere uma direção de parametrização funcional para regras recorrentes, deixando a lógica programável para cenários variáveis ou condicionais.

## 24.4. Flexibilidade operacional com necessidade de controles

O sistema permite combinações muito amplas. Essa flexibilidade pode atender múltiplos países e produtos, mas exige:

- documentação clara;
- revisão das configurações;
- testes de cenários de emissão, endosso e anulação;
- validações específicas para regras de negócio;
- controle sobre procedimentos PL.

Esses controles não foram detalhados na reunião, mas sua necessidade é uma implicação analítica da liberdade de configuração mostrada.

---

## 25. Números e exemplos citados

| Indicador ou regra | Valor mencionado | Contexto |
|---|---:|---|
| Quantidade de parcelas permitida | Entre 1 e 99 | Característica geral do plano de pagamento. |
| Plano semestral | 2 frações | Exemplo visual de plano de pagamento. |
| Data de exemplo | 15 de janeiro de 2023 | Base para cálculo de efeitos em dias e meses. |
| Soma em dias | 10 dias | Resultado: 25 de janeiro de 2023. |
| Soma em meses | 10 meses | Resultado: 15 de novembro de 2023. |
| Exemplo de percentuais | 10%, 25%, 15%, 35% | Soma explícita de 85%; usado para explicar cálculo por diferença. |
| Prima no exemplo | 1.000 | Conceito fracionável. |
| Recargo no exemplo | 20 | Conceito não fracionável. |
| Percentual por parcela no exemplo | 25% cada | Plano com quatro parcelas. |
| Primeiro recibo do exemplo | 270 | 250 de prima + 20 de recargo. |
| Plano trimestral reverso | -12, -9, -6, -3 meses | Exemplo de geração a partir do vencimento. |

> Os números acima foram declarados ou exibidos durante a sessão. Não há evidência de auditoria externa nem de que representem regras universais para todos os produtos ou países.

---

## 26. Referências visuais relevantes

| Frame | Horário aproximado | Conteúdo |
|---|---:|---|
| 04 | 14:00 | Portal MAPFRE Marketplace, documentação Reef.core e módulos. |
| 05 | 17:28 | Exemplo de plano semestral, suplementos e direção de geração. |
| 06 | 20:57 | Opções de data de início da geração. |
| 07 | 24:26 | Destaque para “Lógica de negocio” como opção de data de início. |
| 08 | 27:54 | Objetivo da definição individual de parcelas: efeito, importe e comissão. |
| 09 | 31:23 | Unidades para geração de efeito: dias e meses. |
| 10 | 34:52 | Exemplo de soma de 10 dias e 10 meses a partir de 15 de janeiro de 2023. |

---

## 27. O que a reunião não permite concluir

A reunião não permite determinar com segurança:

1. qual tecnologia implementa o Reef.core;
2. qual é a arquitetura interna do sistema;
3. se os planos de pagamento são configurados por interface, API, banco de dados ou outro mecanismo;
4. o significado completo da sigla “PL”;
5. se procedimentos PL são scripts, regras declarativas, stored procedures ou outro artefato;
6. qual parcela é sempre calculada por diferença e se essa regra pode ser parametrizada;
7. como é calculado o vencimento da última parcela;
8. quais são todas as opções de tratamento para parcelas fora da vigência;
9. quais validações impedem configurações inconsistentes;
10. como são tratadas comissões, pois sua configuração detalhada não foi coberta;
11. quais países usam cada comportamento;
12. quais são os requisitos legais ou regulatórios que justificam cada regra local;
13. como ocorre integração com caixa, meios de pagamento ou conciliação financeira;
14. como são registradas auditoria, permissões e aprovações de configurações;
15. quais são os limites de desempenho, volume ou escalabilidade do mecanismo.

---

## 28. Conclusões principais

1. O plano de pagamento é composto por uma definição geral e por configurações individuais de cada parcela.  
2. A data de início é a referência comum para o cálculo de todas as parcelas; elas não são calculadas encadeando uma na outra.  
3. A direção de geração — efeito → vencimento ou vencimento → efeito — altera significativamente o comportamento das datas e o uso de unidades positivas ou negativas.  
4. Dias e meses possuem semânticas diferentes: dias somam duração fixa; meses preservam o dia quando possível e usam o último dia do mês quando a data equivalente não existe.  
5. A distribuição financeira por parcela não precisa ser proporcional ao tempo nem uniforme.  
6. Uma regra de cálculo por diferença fecha a distribuição total, mas pode esconder erro de parametrização percentual.  
7. Conceitos econômicos não fracionáveis prevalecem sobre a distribuição do plano e são concentrados no primeiro recibo.  
8. Regras de devolução em anulação pertencem ao conceito de desglose e são parametrizáveis.  
9. Pagamentos parciais são tratados, segundo a explicação, por alteração do plano via endosso e reaplicação das regras econômicas.  
10. A reunião apresenta um modelo flexível e orientado por configuração, mas não detalha todos os mecanismos de validação, integração, governança ou implementação técnica necessários para operar essa flexibilidade com segurança.
