# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.academy - Reef.core - Módulo de emisión - DEFINICIÓN ramo-6.mp4`
**Data de processamento:** 20/09/2026 18:03:46
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise Estruturada — Parametrização de Ramos, Prêmios, Sinistros e Recibos em Sistema de Seguros

> **Base e limites desta análise:** este documento foi elaborado exclusivamente a partir da transcrição fornecida. A reunião aparenta ser parte de um treinamento funcional sobre a configuração de um sistema de seguros. Alguns termos podem conter imprecisões de reconhecimento de voz; quando não há evidência suficiente para corrigi-los com segurança, a forma registrada foi preservada ou a incerteza foi sinalizada.

## 1. Síntese executiva

A reunião aprofundou a parametrização de um **ramo de seguros** — entendido no contexto como uma configuração funcional que determina o comportamento de apólices, orçamentos, suplementos, sinistros, prêmios, recibos e cobranças.

O ponto central foi demonstrar que vários comportamentos operacionais não são fixos: são definidos por parâmetros do ramo e, em certos casos, podem ser alterados por apólice. Entre os temas tratados estão a diferença entre data de efeito e vencimento, controles técnicos antes da emissão, validação de sinistros ao alterar apólices, cálculo de prêmios temporários, períodos curtos, anos comerciais ou naturais, cálculo manual de prêmio, moedas e câmbio, precificação dinâmica, geração de recibos e remessa para cobrança.

A mensagem principal da sessão é que o sistema trabalha com uma estrutura altamente parametrizável. Os valores econômicos são concebidos, por padrão, como **anualizados**, e o sistema os adapta ao período efetivo da apólice ou do movimento. Essa adaptação pode seguir proporcionalidade temporal, escalas previamente definidas, regras de anulação ou lógica de negócio customizada.

Também ficou evidente uma separação conceitual importante:

```text
Ramo
↓
Define regras-padrão de comportamento
↓
Apólice / orçamento / suplemento
↓
Aplica ou, quando permitido, altera determinadas regras
↓
Movimentos econômicos
↓
Geram prêmios, quotas e recibos
↓
Recibos entram em cobrança por remessa
```

---

## 2. Contexto e antecedentes

A sessão parece continuar um treinamento anterior. Logo no início, o instrutor retoma dúvidas pendentes sobre a definição do ramo e esclarece que determinados parâmetros não se aplicam a suplementos, mas à criação de novas apólices ou de novos orçamentos.

Também há referência a tópicos previamente abordados, como:

- resseguro;
- cosseguro externo;
- conceitos econômicos;
- apólices multiperíodo;
- tratamentos especiais, incluindo transporte;
- conceitos de juros;
- definição de companhias e moeda do país;
- planos de pagamento;
- controles técnicos.

A apresentação foi conduzida de maneira incremental: o instrutor percorre propriedades de configuração do ramo, explica a finalidade de cada parâmetro e utiliza exemplos de apólices, veículos, riscos, moedas, prêmios e recibos para mostrar o efeito prático de cada escolha.

---

## 3. Conceitos fundamentais utilizados na reunião

Antes de detalhar os parâmetros, a reunião estabeleceu alguns conceitos essenciais.

| Conceito | Explicação apresentada |
|---|---|
| **Ramo** | Estrutura de configuração que define comportamentos funcionais aplicáveis às apólices vinculadas a ele. |
| **Apólice** | Contrato de seguro emitido para um cliente ou segurado. |
| **Orçamento / presupuesto** | Etapa anterior à emissão da apólice. Pode precisar passar por controles técnicos antes de ser convertido em apólice. |
| **Suplemento** | Alteração em uma apólice já existente. Pode modificar dados, riscos, capitais ou outras condições sem necessariamente cancelar toda a apólice. |
| **Risco** | Elemento segurado. Nos exemplos, pode ser uma pessoa, um veículo, uma fábrica ou outro objeto segurável. |
| **Sinistro** | Evento cuja tramitação pode gerar pagamento ou outra obrigação securitária. |
| **Prêmio / prima** | Termo genérico para valores econômicos decorrentes da contratação das coberturas, incluindo, conforme explicado, prêmio, encargos, impostos, descontos e modificações. |
| **Quota** | Fração do valor resultante de um movimento, conforme a distribuição determinada pelo plano de pagamento. |
| **Recibo** | Instrumento de cobrança ou devolução ao cliente, formado a partir da situação econômica da apólice e de seus movimentos. |
| **Remessa** | Ato de encaminhar um recibo exigível a um gestor de cobrança para efetivação da cobrança. |
| **Efeito** | Data a partir da qual a apólice, recibo ou movimento entra em vigência. |
| **Vencimento** | Data de término da vigência, conforme as regras aplicáveis à apólice. |

---

## 4. Data de efeito e data de vencimento

### 4.1. Problema tratado

Foi discutido um parâmetro que permite que o **dia de vencimento** seja diferente do dia de efeito da apólice.

Segundo a explicação, essa necessidade ocorre porque determinados países ou contextos operacionais tratam a vigência anual de maneiras distintas:

- em um modelo, o seguro pode vigorar de 00h de um dia até 00h do mesmo dia no ano seguinte;
- em outro, pode começar à meia-noite e terminar às 23h59 do dia anterior ao aniversário da apólice.

### 4.2. Exemplo apresentado

O instrutor utilizou o caso de uma apólice com efeito em 1º de janeiro:

- Se a vigência for interpretada de 1º de janeiro a 1º de janeiro do ano seguinte, o vencimento coincide nominalmente com a data de efeito.
- Se o seguro se encerrar às 23h59, a vigência pode ser registrada como 1º de janeiro a 31 de dezembro do mesmo ano.

### 4.3. Escopo do parâmetro

O esclarecimento foi explícito: esse comportamento é considerado ao:

- criar um orçamento;
- emitir uma nova apólice.

Não se aplica, segundo a explicação, ao suplemento.

### 4.4. Implicação funcional

A parametrização permite que o sistema trate corretamente produtos anuais cuja data de término precise ser registrada em dia distinto da data de início, sem necessariamente descaracterizá-los como novas apólices em situações de renovação ou prorrogação.

---

## 5. Controles técnicos e autorização de orçamento

### 5.1. Nota removida por falta de clareza

O instrutor informou que uma nota exibida no material seria removida porque, em sua avaliação, não esclarecia o comportamento e poderia causar confusão.

A nota aparentemente se relacionava à obrigação de autorizar um orçamento antes de convertê-lo em uma primeira apólice.

### 5.2. Finalidade dos controles técnicos

A reunião explica que certos riscos podem exigir verificações antes da emissão. Os exemplos citados foram:

- seguros de saúde ou vida, nos quais podem ser exigidos exames ou solicitações médicas;
- riscos físicos, como veículos, fábricas ou outros bens, que podem demandar vistoria ou avaliação.

### 5.3. Regra explicada

Quando o processo exigir orçamento prévio e houver controles técnicos associados:

```text
Orçamento criado
↓
Risco submetido a controles técnicos
↓
Controles precisam estar liberados
↓
Orçamento pode ser convertido em apólice
```

A consequência apresentada é que não seria possível emitir a apólice caso o orçamento ainda possua controles técnicos pendentes.

---

## 6. Resseguro e cosseguro: contexto retomado

O treinamento retoma que, no tópico anterior, foi analisado o comportamento da companhia em relação ao resseguro.

Foram mencionadas duas possibilidades:

- a companhia atua como seguradora direta, contratando o seguro com o cliente e podendo posteriormente enviar informações ao ressegurador;
- a companhia atua como resseguradora, cenário referido como “resseguro aceito”.

Também foi mencionado o tema de **comissão de cosseguro externo**, mas o instrutor indicou que ele seria retomado posteriormente, quando fossem tratados os conceitos econômicos e a parte de comissões.

> A reunião não fornece detalhes suficientes para reconstruir a regra de comissão de cosseguro externo, sua fórmula, participantes ou fluxo operacional.

---

## 7. Propriedades relacionadas a sinistros

### 7.1. Validação de sinistros pendentes em suplementos

O sistema pode ser configurado para verificar a existência de sinistros pendentes quando alguém tenta realizar um suplemento em uma apólice.

O objetivo apresentado é reduzir oportunidades de fraude ou de comportamento oportunista.

### 7.2. Exemplo de risco de fraude

O exemplo foi:

```text
Cobertura com capital de 100.000
↓
Sinistro em tramitação no valor de 100.000
↓
Tentativa de realizar suplemento
↓
Redução do capital segurado para 50.000
```

A validação de sinistros pendentes faz com que o sistema identifique que há um sinistro em andamento antes de permitir ou tratar a alteração na apólice.

### 7.3. Diferença entre sinistro pendente e terminado

| Estado | Significado explicado |
|---|---|
| **Pendente** | O sinistro está em tramitação; o tratamento ainda não foi concluído. |
| **Terminado** | A tramitação foi finalizada ou liquidada. |
| **Pago** | Não é necessariamente sinônimo de sinistro terminado. Um sinistro pode estar terminado, mas o pagamento ao destinatário ainda estar pendente. |

### 7.4. Parâmetros citados

Foram citados dois controles distintos:

1. validar sinistros pendentes ao realizar suplemento;
2. validar sinistros terminados ao realizar suplemento.

A transcrição não detalha se a validação bloqueia o suplemento, gera alerta ou apenas aciona fluxo adicional. Ela apenas informa que o sistema pode verificar a existência desses sinistros.

---

## 8. Prêmios anualizados e apólices temporárias

### 8.1. Princípio central

O instrutor enfatizou repetidamente que a informação econômica registrada no sistema é entendida como correspondente a **um ano de vigência**.

Isso se aplica a valores fixos e ao resultado econômico de percentuais, descontos e outros conceitos.

```text
Valor econômico registrado
= referência anual
↓
Sistema identifica a vigência real
↓
Sistema adapta o valor ao período da apólice ou movimento
```

### 8.2. Exemplo básico

Se o valor anual for 100 e a apólice tiver seis meses de vigência, o sistema precisa determinar quanto cobrar nesse período de seis meses.

A reunião descreve duas abordagens principais:

1. pró-rata temporis;
2. escala, também chamada por um participante de “tabela de período curto”.

---

## 9. Cálculo proporcional: pró-rata temporis

### 9.1. Definição

“Pró-rata temporis” foi explicada como cálculo proporcional ao tempo de vigência.

Exemplos apresentados:

| Valor anual | Vigência | Valor proporcional |
|---:|---:|---:|
| 100 | 6 meses | 50 |
| 120 | 1 mês | 10 |

### 9.2. Aplicação

Esse comportamento é relevante para apólices temporárias, isto é, com vigência inferior a um ano.

A lógica explicada é:

```text
Valor anual de referência
×
proporção da vigência efetiva
=
valor do período
```

### 9.3. Escopo

O instrutor menciona que o conceito também pode se aplicar a incrementos ou outros movimentos, embora use a emissão de apólice como exemplo por ser mais fácil de visualizar.

---

## 10. Escala ou período curto

### 10.1. Conceito

Quando o cálculo não é pró-rata, o sistema pode utilizar uma tabela de percentuais previamente definida conforme a quantidade de dias de vigência.

Em vez de cobrar exatamente a proporção temporal, configura-se qual percentual do valor anual deverá ser aplicado para cada faixa ou quantidade de dias.

### 10.2. Exemplo apresentado

| Dias de vigência | Percentual definido | Valor anual | Valor cobrado |
|---:|---:|---:|---:|
| 1 dia | 10% | 100 | 10 |
| 2 dias | 10% | 100 | 10 |
| 180 dias | 60% | 100 | 60 |

No último exemplo, uma vigência aproximada de seis meses poderia resultar em cobrança de 60, enquanto uma regra proporcional pura resultaria em 50.

### 10.3. Terminologia

Um participante da Argentina observou que esse modelo é conhecido localmente como **“tabela de período curto”**. O instrutor confirmou que se trata do mesmo conceito que ele vinha chamando de escala.

### 10.4. Relação de causa e efeito

```text
Valor anualizado
↓
Apólice com vigência inferior a um ano
↓
Necessidade de converter o valor anual para o período real
↓
Escolha entre proporcionalidade temporal ou percentual previamente definido
↓
Pró-rata ou escala/período curto
```

---

## 11. Possibilidade de alterar o cálculo por apólice

O ramo define o comportamento padrão para o cálculo de apólices temporárias, mas um parâmetro adicional pode determinar se esse comportamento poderá ser modificado na emissão de uma apólice específica.

### 11.1. Sem permissão de alteração

Se a alteração não for permitida:

- a regra definida no ramo é aplicada;
- todas as apólices temporárias daquele ramo seguem essa regra;
- o usuário emissor não pode mudar o comportamento.

### 11.2. Com permissão de alteração

Se a alteração for permitida:

- o processo de emissão mostra um campo com a configuração padrão;
- o usuário pode alterar o indicador para aquela apólice;
- uma apólice originalmente configurada como pró-rata pode passar a usar escala ou período curto.

### 11.3. Exemplo operacional apresentado

O instrutor mostrou uma tela em que o ramo estava configurado como pró-rata, mas a alteração por apólice estava desabilitada. Nesse cenário, a marca aparecia como referência, porém o campo não podia ser alterado.

> A transcrição não identifica o nome da aplicação ou do produto exibido na tela.

---

## 12. Lógica de negócio para alterar o cálculo

### 12.1. Tecnologia citada

A lógica de negócio foi descrita como uma rotina escrita, “hoje em dia”, em **PL/SQL**.

### 12.2. Finalidade

Essa lógica pode ser associada para determinar o percentual aplicável ou alterar o comportamento padrão do sistema.

### 12.3. Cenário exemplificado

Foi apresentado um caso em que a rotina de cálculo já devolve um valor ajustado à vigência real:

- para um ano, a rotina retorna 100;
- para seis meses, retorna 50.

Nesse cenário, o sistema não deveria aplicar novamente a conversão anual para período, pois isso reduziria indevidamente um valor que já veio ajustado.

A lógica poderia informar que o percentual aplicável é 100%, evitando uma segunda proporcionalização.

### 12.4. Limitação reconhecida

O instrutor afirmou que não é uma necessidade comum, embora já tenha ocorrido em alguns países.

> A transcrição não detalha quais países utilizaram essa exceção, como a rotina é registrada, como é versionada ou como ocorre sua governança técnica.

---

## 13. Anulação de apólice versus retirada de risco

### 13.1. Distinção conceitual

A reunião diferencia dois cenários:

| Cenário | Descrição |
|---|---|
| **Suplemento de anulação de apólice** | A apólice inteira deixa de vigorar. |
| **Suplemento comum** | A apólice continua ativa, mas sofre alterações, como mudança de segurado, dados de risco, capitais ou retirada de um risco específico. |

### 13.2. Anulação integral

Quando a apólice inteira é anulada, existem três formas de determinar o valor a devolver. O instrutor não detalhou as três formas naquele momento.

Uma delas é proporcional ao tempo: por exemplo, cancelar uma apólice anual na metade do período poderia resultar em devolução de 50%.

Também foi citado, como exemplo, o uso de período curto para anulação: em vez de devolver 50% após seis meses, poderia ser devolvido 40%, conforme regra configurada.

### 13.3. Retirada de risco em apólice com múltiplos riscos

Exemplo apresentado:

```text
Apólice com cinco veículos
↓
Um veículo deixa de fazer parte da apólice
↓
A apólice permanece vigente
↓
É necessário calcular a devolução referente apenas ao risco removido
```

Segundo a explicação, o comportamento padrão para retirada de um risco é proporcional ao tempo. Contudo, há parâmetro que permite fazer a retirada seguir a mesma regra usada para anulação integral da apólice.

### 13.4. Implicação

Esse parâmetro permite que a baixa de um risco use, conforme configuração:

- pró-rata;
- escala/período curto;
- coeficiente de anulação;
- lógica de negócio;
- tipo de anulação aplicável à apólice completa.

O instrutor evitou detalhar essas alternativas para não antecipar um tema que seria tratado posteriormente.

---

## 14. Ano natural, ano comercial e anos bissextos

### 14.1. Parâmetro de dias do ano

O sistema permite trabalhar com dois modelos:

| Modelo | Duração considerada |
|---|---:|
| Ano natural | 365 dias |
| Ano comercial | 360 dias |

No modelo comercial, cada mês é considerado como tendo 30 dias.

### 14.2. Ponto de atenção sobre a anualidade

A reunião enfatiza que o valor anual permanece o mesmo, independentemente de o ano civil ter 365 ou 366 dias.

Exemplo:

```text
Prêmio anual: 100
Ano com 365 dias: 100
Ano bissexto com 366 dias: 100
```

Ou seja, a anualidade não é convertida para 100,40 ou qualquer outro valor apenas porque há um dia adicional no calendário.

### 14.3. Comportamento relatado para ano bissexto

Foi informado que, no comportamento discutido:

- se o ano é comercial, o resultado permanece 360;
- se o ano é natural, o resultado permanece 365;
- o sistema não retorna 366 nem 361 nos exemplos apresentados.

### 14.4. Diferença prática em uma vigência de seis meses

Foi usado o intervalo de 1º de janeiro a 1º de julho:

| Base anual | Dias considerados no período | Percentual aproximado |
|---|---:|---:|
| Ano natural | cerca de 182 dias | cerca de 49,86% |
| Ano comercial | 180 dias | 50% |

A conclusão demonstrada é que o modelo comercial gera marcos temporais mais “limpos”:

- trimestre: 25%;
- semestre: 50%;
- três trimestres: 75%;
- ano: 100%.

### 14.5. Consideração do dia 29 de fevereiro

Foi levantada uma dúvida sobre o uso do dia 29 de fevereiro.

A resposta esclareceu que:

- se o modelo é comercial, a consideração do dia 29 não produz efeito, pois todos os meses são tratados como tendo 30 dias;
- no modelo natural, há uma preocupação sobre o efeito do dia adicional;
- o instrutor reconheceu a dúvida e afirmou que apresentaria um exemplo posteriormente, se possível.

### 14.6. Limitação reconhecida

A reunião não conclui completamente como o parâmetro de consideração do dia 29 de fevereiro afeta todos os cálculos de período e valores. O instrutor prometeu retomar o assunto com exemplo, mas a transcrição termina antes dessa demonstração.

---

## 15. Prêmios automáticos, manuais e mistos

### 15.1. Três modalidades citadas

O ramo pode ser configurado para trabalhar com:

1. cálculo automático;
2. cálculo manual;
3. combinação de cálculo automático e manual.

### 15.2. Cálculo automático

No cálculo automático:

- o sistema calcula o prêmio da cobertura;
- calcula encargos, impostos, descontos e outros conceitos;
- chega aos valores correspondentes à apólice e ao recibo.

### 15.3. Cálculo manual

No cálculo manual, o usuário pode informar os valores econômicos no processo de emissão ou suplemento.

O instrutor fez uma ressalva importante: embora tenha usado a expressão de que a informação econômica não estaria registrada, afirmou que isso não é literalmente verdadeiro, pois o sistema ainda precisa ter alguma informação, ainda que fictícia, para suportar a operação.

O usuário pode informar, conforme a explicação:

- valor do prêmio anual;
- valor do prêmio do período;
- taxa.

### 15.4. Cálculo misto

Na configuração mista, uma apólice pode ter componentes calculados automaticamente e componentes informados manualmente.

Exemplo apresentado:

```text
Cobertura 1
- capital informado
- prêmio informado manualmente
- sistema calcula os demais campos relacionados

Cobertura 2
- capital informado
- nenhum campo econômico informado
- sistema calcula automaticamente
```

### 15.5. Relação entre campos econômicos

Ao informar um dos três campos — prêmio anual, prêmio do período ou taxa — o sistema calcula os demais.

```text
Informar um campo econômico
↓
Sistema calcula os dois restantes
```

Caso nenhum valor seja informado para uma cobertura em contexto misto, o sistema interpreta que aquela cobertura deve ser calculada automaticamente.

---

## 16. Moedas, tarifas e tipos de câmbio

### 16.1. Moeda da companhia

Foi retomado que, na definição da companhia, é informada a moeda do país. Os exemplos usados foram:

- Espanha: euro;
- Estados Unidos: dólar;
- Argentina: peso.

### 16.2. Apólices em moeda diferente

O ramo pode ser configurado para permitir emissão em moedas diferentes da moeda da companhia ou do país.

Exemplo:

```text
Companhia localizada na Espanha
↓
Ramo permite emissão em euro e libra esterlina
↓
Apólice pode ser emitida em libra esterlina
```

### 16.3. Cenário com três moedas

O instrutor apresentou um caso mais complexo:

```text
País / companhia: Espanha
Moeda da apólice: dólar
Moeda da tarifa: peso argentino
```

Nesse cenário, o sistema usa tipos de câmbio registrados para chegar ao valor na moeda de emissão da apólice.

### 16.4. Necessidade de atualização cambial

Foi enfatizado que os tipos de câmbio precisam estar cadastrados e atualizados. Caso o último câmbio registrado tenha dez dias, o sistema aplicará esse valor histórico, não o câmbio atual não registrado.

### 16.5. Alteração manual de câmbio

Há um parâmetro que pode permitir ao usuário emissor alterar manualmente o tipo de câmbio mostrado durante a emissão.

O fluxo descrito é:

```text
Sistema localiza tipo de câmbio cadastrado
↓
Exibe o câmbio durante a emissão
↓
Campo é habilitado, se o ramo permitir alteração
↓
Usuário pode alterar o tipo de câmbio da apólice
```

### 16.6. Risco explicitamente reconhecido

O instrutor afirmou que essa possibilidade “tem muito perigo”, mas que foi uma solicitação aprovada.

A reunião não detalha:

- limites de alteração;
- trilha de auditoria;
- perfis autorizados;
- necessidade de aprovação;
- validações contra faixas de mercado;
- impactos contábeis ou regulatórios.

---

## 17. Exibição de importes totais em ramos multirriscos

O instrutor explicou que, em um ramo multirriscos, o sistema pode ainda não exibir o valor total da apólice após o cálculo de um risco individual, pois novos riscos podem ser adicionados.

O parâmetro discutido permite indicar que o ramo sempre terá apenas um risco. Nesse caso, o sistema pode apresentar o valor total já naquele ponto do processo.

### 17.1. Lógica apresentada

```text
Ramo multirriscos
↓
Novos riscos ainda podem ser adicionados
↓
Valor total pode não estar consolidado

Ramo com um único risco
↓
Não haverá inclusão de novos riscos
↓
Sistema pode mostrar o total da apólice
```

---

## 18. Precificação dinâmica

### 18.1. Conceito apresentado

O sistema pode permitir que dois riscos aparentemente iguais tenham preços distintos.

O exemplo considera dois veículos com:

- mesma marca;
- mesmo modelo;
- mesmo valor;
- mesmas coberturas;
- mesmos capitais.

Ainda assim, um poderia custar 100 e outro 98.

### 18.2. Funcionamento descrito

Quando o parâmetro de precificação dinâmica está habilitado, o sistema se conecta a um ativo ou serviço externo — a transcrição usa esses termos sem identificar a tecnologia específica.

Esse serviço executa uma avaliação baseada em algoritmo e pode retornar:

- desconto;
- acréscimo;
- rejeição do risco.

### 18.3. Exemplo

| Resultado do serviço | Efeito sobre um prêmio-base de 100 |
|---|---:|
| Desconto de 2% | 98 |
| Acréscimo de 2% | 102 |
| Erro / recusa | contratação não continua |

### 18.4. Leitura analítica

Uma leitura possível é que o sistema de emissão não concentra toda a decisão de preço internamente. O parâmetro permite delegar uma etapa de avaliação a um serviço externo, preservando no sistema principal a capacidade de aplicar o resultado econômico ou interromper a contratação.

> A transcrição não permite concluir se esse serviço é interno, de terceiro, síncrono, assíncrono, baseado em IA, baseado em regras ou integrado por API específica.

---

## 19. Quotas e recibos

### 19.1. Diferença conceitual

A reunião reforçou que quota e recibo não são a mesma coisa.

| Elemento | Definição apresentada |
|---|---|
| **Quota** | Fração do valor resultante de um movimento. |
| **Recibo** | O que será cobrado ou devolvido ao cliente em relação à apólice e aos movimentos associados. |

### 19.2. Exemplo de emissão

Uma apólice emitida com valor de 100 e fracionada em quatro partes gera quatro quotas de 25.

### 19.3. Exemplo de suplemento com devolução

Se um suplemento resulta em devolução de 100 ao cliente e o valor é fracionado em quatro partes, podem ser geradas quotas de -25.

Esse exemplo foi usado para demonstrar que a quota representa a divisão do resultado do movimento, e não apenas um valor de cobrança da apólice.

### 19.4. Relação entre quotas e recibos

O instrutor explica que as quotas podem ser integradas em recibos dependendo de condições como estado, efeito e vencimento do recibo.

> A transcrição não detalha a regra de integração, os estados possíveis do recibo nem as condições completas para consolidação de quotas.

---

## 20. Geração de recibos por período

### 20.1. Contexto: apólices multiperíodo

Uma apólice com vigência superior a um ano pode ser tratada como:

- um único período interno;
- múltiplos períodos internos, normalmente correspondentes a anualidades.

Exemplo utilizado:

```text
Apólice de três anos
Prêmio anual: 1.000
Valor total: 3.000
```

### 20.2. Sem geração de recibos por período

Se o plano de pagamento for anual e não houver geração de recibo por período, a apólice de três anos pode gerar um único recibo de 3.000.

### 20.3. Com geração de recibos por período

Se o parâmetro estiver habilitado, o plano de pagamento é aplicado a cada período interno.

No exemplo de três anualidades de 1.000:

| Período | Recibo |
|---|---:|
| Ano 1 | 1.000 |
| Ano 2 | 1.000 |
| Ano 3 | 1.000 |

### 20.4. Exemplo semestral

Caso o plano de pagamento seja semestral, cada anualidade geraria dois recibos de 500. Em uma apólice de três anos, isso resultaria em seis recibos.

### 20.5. Implicação funcional

```text
Apólice multiperíodo
↓
Plano de pagamento
↓
Parâmetro define se o plano vale para a apólice inteira
ou para cada período interno
↓
Quantidade e datas dos recibos são alteradas
```

---

## 21. Planos de pagamento e redistribuição manual

### 21.1. Função do plano de pagamento

O plano de pagamento determina:

- quantas quotas serão geradas;
- como os valores serão distribuídos;
- se a distribuição é proporcional ao tempo ou segue outra definição.

Também foi lembrado que conceitos econômicos podem indicar se são fracionáveis ou não.

### 21.2. Alteração manual de recibos

Um parâmetro pode permitir que o usuário altere manualmente a distribuição dos valores entre os recibos gerados.

O sistema:

1. aplica a rotina do plano de pagamento;
2. gera a distribuição inicial;
3. apresenta uma tela com os recibos;
4. permite ao usuário redistribuir valores entre eles.

### 21.3. Restrição fundamental

A alteração não permite modificar o total econômico calculado. Ela permite somente redistribuí-lo.

Exemplo:

```text
Prêmio total: 1.000
Impostos: 200
Encargos: 100

A redistribuição deve preservar:
- prêmio total de 1.000;
- impostos totais de 200;
- encargos totais de 100.
```

### 21.4. Pergunta levantada: risco de pagamento inicial reduzido

Um participante perguntou se seria possível pagar 100 — ou mesmo zero — no primeiro mês de uma distribuição total de 3.000 e, em seguida, cancelar a apólice.

A resposta esclareceu que sim, a distribuição poderia ser modificada, mas isso não impediria o cálculo correto da anulação.

A anulação:

- não é calculada com base apenas no que foi pago em recibos;
- é calculada com base no risco e na data de efeito da anulação;
- pode determinar valores a devolver ou cobrar independentemente da distribuição anterior.

### 21.5. O que a resposta esclarece

Essa resposta estabelece uma separação importante:

```text
Distribuição em recibos
≠
Cálculo econômico do risco em caso de anulação
```

Os recibos são consequência da distribuição econômica; não substituem a lógica de cálculo da vigência e da anulação da apólice.

---

## 22. Remessa de recibos

### 22.1. Definição

Remessa é a ação de entregar um recibo exigível a um gestor de cobrança.

O gestor de cobrança pode ser:

- um banco;
- um agente;
- um cobrador;
- outro intermediário responsável por arrecadar o valor.

### 22.2. Ciclo operacional descrito

```text
Apólice ou suplemento emitido
↓
Sistema gera os recibos desde o início
↓
Chega a data de efeito do recibo
↓
Recibo torna-se exigível
↓
Recibo é remetido ao gestor de cobrança
↓
Gestor realiza a cobrança junto ao cliente
↓
Valor é entregue à companhia seguradora
```

### 22.3. Geração antecipada de recibos

Foi explicado que, em uma apólice com pagamento mensal, todos os doze recibos podem ser gerados no momento da emissão, mesmo que alguns só tenham efeito muitos meses depois.

A exigibilidade depende da data de efeito de cada recibo.

### 22.4. Emissão retroativa e remessa automática

Foi apresentado o cenário de uma apólice emitida em 2 de dezembro, mas com efeito em 20 de novembro.

Nesse caso, o primeiro recibo já estaria exigível no momento da emissão. O parâmetro permite que o próprio processo de emissão faça a remessa, sem esperar o processo regular de tesouraria.

### 22.5. Responsabilidade padrão e exceção

| Situação | Responsável pela remessa |
|---|---|
| Fluxo normal | Processo de tesouraria |
| Parâmetro de remessa habilitado para emissão | Processo de emissão |

### 22.6. Objetivo operacional

A funcionalidade evita aguardar um processo periódico de tesouraria — por exemplo, semanal ou a cada alguns dias — quando o recibo já deveria entrar imediatamente em cobrança.

---

## 23. Emissão de apólice sem recibo

### 23.1. Regra geral

Segundo o instrutor, o sistema normalmente não permite uma apólice sem recibo, pois há contrato, cobertura e preço.

### 23.2. Exceção: apólice marco

O exemplo usado foi o de transporte.

Uma companhia de transporte pode possuir uma apólice marco que estabelece as regras da relação securitária:

- tipo de viagens;
- abrangência internacional;
- tipo de mercadoria;
- outras condições de enquadramento.

Entretanto, no momento da emissão dessa apólice marco, ainda pode não existir viagem declarada. Portanto, não haveria prêmio a cobrar inicialmente.

```text
Apólice marco emitida
↓
Nenhuma viagem declarada
↓
Prêmio inicial: 0
↓
Nenhum recibo inicial
↓
Declarações futuras geram a cobrança correspondente
```

### 23.3. Dupla validação

Mesmo que o ramo permita emissão sem recibo, isso não é suficiente por si só. Deve existir uma lógica de negócio associada que confirme que aquela apólice concreta pode efetivamente ser emitida sem recibo.

```text
Ramo permite emissão sem recibo
↓
Lógica de negócio valida a apólice específica
↓
Validação positiva: emissão sem recibo permitida
Validação negativa: sistema gera erro
```

### 23.4. Finalidade da validação adicional

A lógica adicional reduz o risco de uma apólice sair indevidamente sem recibos apenas porque o ramo possui a permissão genérica.

---

## 24. Cobrança no processo de emissão

Foi apresentado um parâmetro que permite cobrar recibos no próprio processo de emissão.

O caso imaginado é o de um cliente que está presente e já possui o valor para pagamento. Após a apólice ser emitida e estar regular — sem controles técnicos pendentes que impeçam sua efetivação — o sistema pode exibir um botão para cobrança dos recibos gerados.

O instrutor relaciona esse fluxo à necessidade de remessa prévia do recibo.

### Fluxo resumido

```text
Apólice emitida e validada
↓
Recibo gerado e remetido
↓
Tela de emissão apresenta opção de cobrança
↓
Usuário realiza a cobrança
```

---

## 25. Parâmetro considerado depreciado

Um parâmetro relacionado a juros foi mencionado como sem utilidade atual ou depreciado.

Segundo a explicação, o tratamento de juros foi transferido para:

- plano de pagamento;
- conceitos econômicos.

> A transcrição não informa o nome técnico desse parâmetro, desde quando está depreciado, nem se ainda é usado por compatibilidade com configurações legadas.

---

## 26. Perguntas e respostas relevantes

### 26.1. Pergunta: a pró-rata considera 365 dias por ano?

**Resposta dada:** o instrutor afirmou que o tema seria detalhado mais adiante, pois há um ponto específico no qual se define quantos dias possui o ano para efeito de cálculo.

**O que esclarece:** a regra de pró-rata não pode ser interpretada isoladamente. Ela depende da definição de ano natural ou comercial.

---

### 26.2. Pergunta: o cálculo pode variar por apólice?

**Resposta dada:** sim. O ramo define o comportamento padrão, mas, se o parâmetro permitir, o usuário pode alterar a configuração para uma apólice específica.

**O que esclarece:** há dois níveis de configuração:

```text
Nível 1: padrão do ramo
Nível 2: exceção permitida na apólice
```

---

### 26.3. Pergunta: a retirada de risco em apólice temporal segue os mesmos cenários de anulação?

**Resposta dada:** sim. O comportamento padrão ao retirar risco é proporcional ao tempo, mas pode ser alterado para seguir as regras aplicáveis à anulação.

**O que esclarece:** a duração original da apólice não elimina a possibilidade de usar regras alternativas para retirada de risco.

---

### 26.4. Pergunta: existe o conceito de prêmio mínimo?

**Resposta dada:** sim, especificamente prêmio mínimo por recibo, mas o assunto seria visto posteriormente.

**O que esclarece:** o sistema possui, ao menos conceitualmente, suporte a prêmio mínimo por recibo.

> A reunião não detalha fórmula, momento de aplicação, exceções ou interação com fracionamento.

---

### 26.5. Pergunta: como se determina se o ano é comercial ou natural?

**Resposta dada:** por meio do parâmetro que define se o ano tem 360 dias. Quando habilitado, o sistema usa ano comercial e meses de 30 dias.

**O que esclarece:** a escolha não é inferida automaticamente pelo calendário; é uma configuração funcional do ramo.

---

### 26.6. Pergunta: considerar o dia 29 de fevereiro faz sentido para ano comercial?

**Resposta dada:** não. O instrutor concordou que, em ano comercial, a consideração do dia 29 não teria efeito porque todos os meses são tratados como tendo 30 dias.

**O que esclarece:** o parâmetro relacionado ao dia 29 só parece relevante, conforme a própria discussão, em cenário de ano natural.

---

### 26.7. Pergunta: em cálculo manual, é possível informar prêmio ou taxa?

**Resposta dada:** sim. O sistema permite informar prêmio anual, prêmio do período ou taxa. Ao informar um deles, os demais são calculados.

**O que esclarece:** o cálculo manual não significa ausência de consistência entre os campos econômicos.

---

### 26.8. Pergunta: alterar a distribuição mensal permitiria pagar pouco e cancelar a apólice?

**Resposta dada:** a redistribuição é possível, mas a anulação é calculada com base no risco e na data de anulação, não apenas na distribuição dos recibos.

**O que esclarece:** o plano de pagamento não é mecanismo para manipular o cálculo econômico da anulação.

---

## 27. Números e exemplos quantitativos citados

> Os valores abaixo são exemplos didáticos apresentados na reunião, não indicadores de negócio auditados.

| Indicador ou exemplo | Valor citado | Contexto |
|---|---:|---|
| Capital de cobertura | 100.000 | Exemplo de sinistro pendente e tentativa de redução de capital. |
| Capital reduzido | 50.000 | Exemplo de potencial tentativa de fraude após sinistro. |
| Prêmio anual | 100 | Base para exemplos de pró-rata e escala. |
| Prêmio anual alternativo | 120 | Exemplo de cálculo proporcional mensal. |
| Vigência temporal | 6 meses | Exemplo para comparar pró-rata e período curto. |
| Cobrança pró-rata de seis meses | 50 | Resultado de 50% sobre prêmio anual de 100. |
| Cobrança por escala em 180 dias | 60 | Exemplo de aplicação de 60% sobre prêmio anual de 100. |
| Desconto dinâmico | 2% | Exemplo de prêmio reduzido de 100 para 98. |
| Acréscimo dinâmico | 2% | Exemplo de prêmio elevado de 100 para 102. |
| Ano comercial | 360 dias | Cada mês tratado como 30 dias. |
| Ano natural | 365 dias | Referência apresentada para cálculo natural. |
| Período de 1º de janeiro a 1º de julho, natural | cerca de 182 dias | Exemplo aproximado discutido. |
| Período equivalente, comercial | 180 dias | Exemplo de semestre comercial. |
| Percentual natural aproximado | 49,86% | Divisão aproximada de 182 por 365 no exemplo. |
| Percentual comercial semestral | 50% | Resultado de 180 por 360. |
| Apólice multiperíodo | 3 anos | Exemplo de geração de recibos. |
| Prêmio anual no exemplo multiperíodo | 1.000 | Base de cada anualidade. |
| Valor total no exemplo multiperíodo | 3.000 | Soma de três períodos anuais. |
| Plano semestral no exemplo | 500 por recibo | Dois recibos por anualidade. |
| Fracionamento em quatro partes | 25 por quota | Exemplo de valor total 100. |
| Devolução fracionada | -25 por quota | Exemplo de devolução total de 100 em quatro partes. |

---

## 28. Limitações e ressalvas reconhecidas durante a reunião

1. A nota sobre autorização de orçamento seria removida por não ser clara.
2. As três formas de cálculo de anulação de apólice foram mencionadas, mas não detalhadas.
3. A lógica de negócio em PL/SQL foi apresentada como exceção, não como comportamento comum.
4. A regra exata de consideração do dia 29 de fevereiro não foi concluída durante a sessão.
5. A comissão de cosseguro externo foi adiada para um momento posterior.
6. O detalhamento de conceitos econômicos, encargos, impostos, descontos e desgloses foi postergado.
7. O prêmio mínimo por recibo foi apenas confirmado como conceito existente; não foi explicado.
8. A tela do sistema foi exibida, mas a transcrição não identifica o produto, fornecedor ou arquitetura técnica da aplicação.
9. O serviço de precificação dinâmica foi descrito de forma funcional, mas sem detalhes de contrato, tecnologia, integração ou algoritmo.
10. O parâmetro relacionado a juros foi declarado depreciado, sem detalhamento de migração ou compatibilidade.

---

## 29. Riscos e desafios

### 29.1. Riscos explicitamente mencionados

| Risco | Contexto |
|---|---|
| Possível fraude em suplemento | Alterar capital segurado enquanto existe sinistro pendente ou em tramitação. |
| Câmbio desatualizado | Emissão pode usar uma taxa registrada há dias, produzindo valores não aderentes ao câmbio atual. |
| Alteração manual de câmbio | O instrutor afirmou que essa possibilidade envolve “muito perigo”. |
| Emissão sem recibo indevida | Por isso, além da marca no ramo, é necessária lógica que valide cada apólice. |
| Confusão funcional | A nota sobre autorização de orçamento foi considerada potencialmente confusa. |

### 29.2. Desafios derivados do contexto — interpretação analítica

> Os pontos abaixo são interpretações decorrentes da estrutura apresentada, não afirmações literais dos participantes.

- A grande quantidade de parâmetros aumenta a flexibilidade, mas também amplia a necessidade de governança de configuração.
- Permitir exceções por apólice pode atender necessidades comerciais específicas, porém pode gerar comportamentos heterogêneos dentro do mesmo ramo.
- Regras de cálculo econômico dependem de combinação de parâmetros: anualização, duração do ano, pró-rata, escala, anulação, plano de pagamento e conceitos econômicos.
- A alteração manual de câmbio e a redistribuição manual de recibos exigem controles operacionais, auditoria e segregação de responsabilidades para evitar efeitos econômicos indevidos.
- A dependência de lógica em PL/SQL indica a possibilidade de customização específica por país ou produto, o que pode exigir controle de versão, testes e documentação adicionais.

---

## 30. Transformações e direções identificadas

### 30.1. De cálculo fixo para cálculo parametrizável

A arquitetura funcional apresentada não trata o prêmio como um valor rigidamente calculado de uma única maneira. O comportamento pode variar conforme:

- ramo;
- tipo de vigência;
- período;
- regra de pró-rata;
- escala;
- regra de anulação;
- lógica customizada;
- moeda;
- câmbio;
- precificação dinâmica.

### 30.2. De regra global para exceção controlada por apólice

O ramo estabelece um padrão, mas determinados parâmetros permitem exceção na própria emissão da apólice.

Isso sugere uma estrutura em dois níveis:

```text
Governança central no ramo
↓
Flexibilidade operacional na apólice
```

### 30.3. De precificação exclusivamente interna para decisão assistida por serviço

A precificação dinâmica foi apresentada como integração com um serviço que avalia o risco e retorna desconto, recargo ou rejeição.

Uma leitura possível é que a solução admite um ecossistema de capacidades externas conectadas ao processo de emissão, sem que o sistema principal precise conter toda a lógica de avaliação.

### 30.4. De recibo como simples cobrança para recibo como resultado operacional

A reunião reforça que recibo não deve ser confundido com o cálculo do risco. A lógica é:

```text
Cálculo do movimento e do risco
↓
Geração de quotas
↓
Integração em recibos
↓
Remessa e cobrança
```

Esse modelo separa cálculo securitário, distribuição financeira e operação de cobrança.

---

## 31. O que a reunião não permite concluir

A transcrição não fornece informação suficiente para determinar com segurança:

- nome do sistema ou produto utilizado;
- fabricante, fornecedor ou arquitetura tecnológica da plataforma;
- modelo de implantação, cloud ou infraestrutura;
- banco de dados utilizado além da referência a rotinas em PL/SQL;
- tecnologia de integração com o serviço de precificação dinâmica;
- uso de APIs, mensageria, eventos, arquivos ou integrações diretas;
- modelo de autenticação, autorização ou perfis de acesso;
- auditoria de alteração manual de câmbio;
- auditoria de alteração manual de distribuição de recibos;
- critérios de aprovação para controles técnicos;
- regras completas de resseguro e cosseguro externo;
- três métodos completos de anulação de apólice;
- regras de prêmio mínimo por recibo;
- regras completas de atualização de tipos de câmbio;
- tratamento contábil ou fiscal de moedas e câmbio;
- cálculo detalhado do dia 29 de fevereiro;
- SLA ou periodicidade real de remessa de recibos;
- modelo de cobrança, conciliação, inadimplência ou baixa de pagamentos;
- regras de cancelamento por falta de pagamento;
- critérios usados pelo algoritmo de precificação dinâmica;
- gestão de erros, timeout ou indisponibilidade do serviço de precificação;
- roadmap, datas futuras, responsáveis ou priorização de implementação.

---

## 32. Conclusões principais

1. O ramo é a principal unidade de configuração funcional apresentada para definir o comportamento de apólices, suplementos, prêmios, recibos e cobranças.

2. A informação econômica é tratada como anualizada; o sistema adapta valores à vigência real da apólice ou movimento.

3. Apólices temporárias podem usar cálculo proporcional ao tempo ou escala/período curto previamente definido.

4. Algumas regras podem ser estabelecidas no ramo e, se permitido, modificadas para uma apólice específica.

5. Lógicas de negócio em PL/SQL podem alterar o comportamento econômico padrão em cenários específicos.

6. A retirada de um risco de uma apólice e a anulação integral da apólice são processos distintos, embora a retirada de risco possa, por parâmetro, utilizar regras de anulação.

7. Ano natural e ano comercial alteram o cálculo de vigência e proporcionalidade; ano comercial simplifica a divisão temporal em meses de 30 dias.

8. O sistema permite cálculo automático, manual ou misto de prêmios, com consistência entre prêmio anual, prêmio do período e taxa.

9. Emissões em moedas distintas exigem tipos de câmbio registrados; permitir edição manual do câmbio foi reconhecido como funcionalmente arriscado.

10. A precificação dinâmica permite que serviço externo influencie o prêmio, aplicando desconto, recargo ou rejeitando o risco.

11. Quotas representam a distribuição do resultado de um movimento; recibos são os instrumentos operacionais de cobrança ou devolução.

12. A remessa transfere recibos exigíveis para gestores de cobrança e pode ser acionada por tesouraria ou, em casos configurados, pelo próprio processo de emissão.

13. Apólices sem recibo são exceções controladas, exemplificadas por apólices marco de transporte sem viagens declaradas no momento da emissão.

14. A sessão foi encerrada antes do início do próximo capítulo, dedicado a comissões, intermediários e agentes.
