# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.academy-Reef.core-Definición de plan de pago(3).mp4`
**Data de processamento:** 25/09/2026 06:04:02
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Análise estruturada — Definição de planos de pagamento no Reef.core

## 1. Síntese executiva

A sessão foi um treinamento funcional sobre a definição de **planos de pagamento** no ambiente/documentação do **Reef.core**. O foco principal foi explicar como um plano determina a geração de recibos de uma apólice: quantidade de parcelas, datas de efeito e vencimento, distribuição de importes e distribuição de comissões.

A apresentação reforçou que o plano de pagamento é composto por uma definição geral e por definições específicas de cada parcela. Essas definições permitem estabelecer não apenas como o prémio é fracionado, mas também como as comissões são distribuídas entre parcelas e intervenientes comerciais. Há ainda regras opcionais para ajustar datas de efeito dos recibos, particularizar a distribuição por figura de agente e tratar situações em que parcelas excedem a vigência da apólice.

A principal mensagem é que o Reef.core oferece um modelo de configuração detalhado e hierárquico: a regra geral do plano serve como base, mas determinadas definições específicas podem prevalecer sobre ela. Essa flexibilidade é apresentada como necessária para acomodar regras de cobrança, diferentes estruturas de intermediação e apólices cuja vigência não comporta integralmente o parcelamento inicialmente configurado.

> **Nota de qualidade da transcrição:** a fala reconhecida automaticamente utiliza repetidamente termos como “cuantas”, “puertas” e “plan de pavo”. Pelo contexto, pelas telas e pela documentação exibida, esses termos parecem referir-se a **cuotas** — parcelas/recibos — e a **plan de pago** — plano de pagamento. Esta normalização é feita apenas para tornar o documento legível.

---

## 2. Contexto e antecedentes

A sessão dá continuidade a uma explicação iniciada anteriormente. O instrutor afirma que o grupo já havia visto a definição das parcelas que compõem um plano de pagamento e retoma, inicialmente, a regra de distribuição dos importes.

O contexto funcional é o de emissão de apólices e geração dos respectivos recibos. Um plano de pagamento parece determinar, entre outros aspectos:

1. Quantas parcelas ou recibos serão gerados;
2. Em que unidade temporal as parcelas são movimentadas — dias ou meses;
3. Quantas unidades temporais são aplicadas a cada parcela;
4. A data de efeito e o vencimento de cada recibo;
5. A distribuição do importe/prémio entre as parcelas;
6. A distribuição de comissões entre as parcelas;
7. Regras opcionais que alteram comportamentos padrão conforme gestor de cobrança, ramo ou intervenção de agente.

A documentação visual exibida pertence ao catálogo Marketplace MAPFRE e está identificada como documentação do **Reef.core**. Os tópicos mostrados incluem, entre outros:

- pagamento de parcelas;
- definição de emissão de plano de pagamento e dias de efeito;
- definição de excesso de comissões;
- definição de intervenção de agente;
- propriedades que determinam o importe da parcela;
- propriedades que determinam a comissão da parcela.

A reunião não detalha a tecnologia de implementação do Reef.core, seu modelo de dados, APIs, banco de dados, infraestrutura ou mecanismo de execução das regras de negócio.

---

## 3. Problemas funcionais tratados

### 3.1 Distribuir valores econômicos entre vários recibos

O primeiro problema abordado é como repartir os conceitos econômicos de uma apólice — por exemplo, prémio e recargos — entre os recibos definidos pelo plano de pagamento.

A regra geral do plano pode estabelecer percentuais por parcela. Contudo, essa distribuição não é automaticamente aplicada a todos os conceitos econômicos: um conceito pode ser configurado como não fracionável.

**Consequência funcional:** mesmo que o plano determine uma distribuição uniforme, um conceito não fracionável é lançado integralmente no primeiro recibo.

---

### 3.2 Separar distribuição de prémio e distribuição de comissão

O instrutor enfatiza que os percentuais usados para distribuir prémios/importes e aqueles usados para distribuir comissões são independentes.

Assim, uma parcela pode conter uma determinada percentagem do prémio e uma percentagem completamente diferente da comissão. Não há obrigação de que, por exemplo, uma parcela que recebe 10% do prémio também receba 10% da comissão.

**Consequência funcional:** o modelo suporta estratégias comerciais ou financeiras em que o calendário de recebimento do cliente não coincide com o calendário de remuneração dos intervenientes.

---

### 3.3 Ajustar datas de efeito para atender à operação de cobrança

Uma data de efeito calculada pelo plano pode não ser a data operacional desejada por uma entidade responsável pela cobrança, como um banco ou agente.

A definição opcional de dias de efeito permite deslocar uma data calculada para um dia de calendário configurado. O exemplo apresentado sugere a concentração de recibos em datas específicas do mês para facilitar o envio ou o processamento pelo gestor de cobrança.

**Consequência funcional:** a data calculada pelo plano deixa de ser necessariamente a data final do recibo; pode ser ajustada por uma regra posterior associada ao gestor de cobrança.

---

### 3.4 Personalizar comissões por figura de agente

O plano de pagamento pode definir uma distribuição geral de comissões para todas as figuras envolvidas em uma apólice. Entretanto, a sessão apresenta uma regra opcional que permite substituir essa distribuição para intervenções específicas.

Por exemplo, um agente principal pode receber suas comissões em percentuais diferentes dos percentuais aplicados a um assessor, organizador ou segundo agente.

**Consequência funcional:** figuras específicas podem seguir uma regra particular, enquanto figuras sem configuração específica continuam utilizando a regra geral do plano.

---

### 3.5 Tratar parcelas que ultrapassam a vigência da apólice

Outro problema tratado ocorre quando a duração da apólice é menor que o período necessário para gerar todas as parcelas previstas no plano de pagamento.

O exemplo apresentado descreve uma apólice de seis meses associada a um plano trimestral com quatro parcelas. Nesse cenário, determinadas parcelas ficariam fora da vigência da apólice.

**Consequência funcional:** o sistema precisa decidir o que fazer com importes e comissões que estariam associados a parcelas que não podem ou não devem ser geradas dentro da vigência.

---

## 4. Solução apresentada: modelo de configuração de plano de pagamento

A solução apresentada não é uma funcionalidade única, mas um conjunto de definições que compõem o plano de pagamento.

### Estrutura lógica consolidada

```text
Definição geral do plano de pagamento
        ↓
Definição obrigatória de cada parcela
        ├── Quantidade de parcelas
        ├── Unidade temporal: dias ou meses
        ├── Número de unidades
        ├── Data de efeito e vencimento
        ├── Percentual de importe/prémio
        └── Percentual de comissão
        ↓
Definições opcionais
        ├── Ajuste de dias de efeito por gestor de cobrança
        ├── Distribuição de comissão por intervenção de agente
        └── Tratamento de comissões quando parcelas excedem a vigência
```

> Este desenho é uma consolidação analítica do conteúdo da reunião; não foi apresentado literalmente como diagrama na transcrição.

O treinamento distingue duas camadas obrigatórias:

1. **Definição geral do plano de pagamento**;
2. **Definição de cada parcela pertencente ao plano**.

Depois dessas duas etapas, são apresentadas definições adicionais e opcionais, aplicadas conforme a necessidade de negócio.

---

## 5. Funcionamento da distribuição de importes

### 5.1 Percentual de importe por parcela

A documentação exibida informa que cada parcela pode definir qual percentual do importe total calculado será aplicado a ela.

A soma dos percentuais do plano deve totalizar 100%. Entretanto, a documentação afirma que o sistema possui uma parcela calculada “por diferença”, como mecanismo de segurança. Assim, se a configuração não somar exatamente 100%, a distribuição ainda será ajustada para fechar o total.

> **Fato explicitamente documentado:** há uma parcela calculada por diferença para garantir a correção da distribuição quando os percentuais definidos não totalizam 100%.  
> **Não detalhado:** qual parcela é escolhida em todas as situações, embora a documentação indique a “primeira parcela” em contexto semelhante de distribuição de comissões.

---

### 5.2 Conceitos que fracionam e não fracionam

A regra de distribuição do plano é subordinada à característica de fracionamento de cada conceito econômico.

A documentação mostra o seguinte exemplo:

| Conceito econômico | Fraciona |
|---|---|
| Prémio | Sim |
| Recargos | Não |

Para um plano com quatro parcelas de 25%, a distribuição documentada é:

| Conceito econômico | R-0001 | R-0002 | R-0003 | R-0004 |
|---|---:|---:|---:|---:|
| Prémio | 250,00 | 250,00 | 250,00 | 250,00 |
| Recargos | 20,00 | 0,00 | 0,00 | 0,00 |
| **Total** | **270,00** | **250,00** | **250,00** | **250,00** |

**Interpretação funcional:**

- O prémio, por ser fracionável, segue a distribuição de 25% em cada parcela;
- Os recargos, por não fracionarem, não seguem a distribuição do plano;
- O valor total de recargos é refletido apenas no primeiro recibo.

O instrutor formula essa precedência de maneira explícita: a definição do conceito econômico “fica acima” da definição do plano de pagamento quando se trata da possibilidade de fracionamento.

### Relação de causa e efeito

```text
Plano determina percentuais de distribuição
        ↓
Conceito econômico é avaliado
        ↓
Conceito fracionável
        → segue os percentuais do plano
Conceito não fracionável
        → é concentrado na primeira parcela
```

---

### 5.3 Lógica de negócio para percentual variável

A documentação também menciona uma lógica de negócio capaz de determinar o percentual de importe aplicável à parcela.

Essa lógica é utilizada quando o percentual não é constante e varia em função de circunstâncias que não estão definidas no Reef.core.

**O que se sabe:**

- A lógica deve devolver o percentual de importe a aplicar à parcela;
- Seu uso é destinado a cenários dinâmicos ou não cobertos pelas propriedades padrão do Reef.core.

**O que a reunião não permite concluir:**

- Como a lógica é implementada;
- Qual linguagem ou motor de regras é utilizado;
- Quais parâmetros recebe;
- Como é publicada, testada, versionada ou monitorada;
- Quais situações reais exigem seu uso.

---

## 6. Funcionamento da distribuição de comissões

### 6.1 Regra geral

Depois da distribuição de importes, a sessão aborda a distribuição das comissões. O princípio é semelhante: cada parcela pode ter um percentual de comissão próprio.

O instrutor exemplifica que um plano de quatro parcelas poderia distribuir a comissão em percentuais como 10%, 30%, 30% e 30%. Em outro exemplo usado na sessão, são aplicados 15%, 25%, 25% e 35%.

A regra importante é que a distribuição de comissão é independente da distribuição do prémio.

```text
Distribuição de prémio por parcela
        ≠
Distribuição de comissão por parcela
```

Essa independência é destacada como um ponto relevante do modelo.

---

### 6.2 Figuras de agente mencionadas

No exemplo de uma nova apólice, o instrutor afirma que podem existir até seis figuras relacionadas à intermediação:

1. Agente principal;
2. Segundo agente;
3. Terceiro agente;
4. Quarto agente;
5. Organizador;
6. Assessor.

A transcrição afirma que esses são os máximos intervenientes considerados no exemplo. A reunião não explica se seis é um limite global do Reef.core ou apenas a quantidade máxima prevista para aquele cenário demonstrativo.

A tabela visual mostra os seguintes valores totais de comissão calculados para uma apólice com quatro frações trimestrais:

| Figura | Comissão total mencionada |
|---|---:|
| Agente principal | 500,00 |
| Segundo agente | 20,00 |
| Terceiro agente | 30,00 |
| Quarto agente | 40,00 |
| Organizador | 200,00 |
| Assessor | 100,00 |

---

### 6.3 Exemplo de distribuição de comissões

O plano apresentado utiliza quatro parcelas e uma distribuição de 15%, 25%, 25% e 35%.

A documentação visual registra parcialmente a seguinte distribuição:

| Intervenção de agente | R-0001 | R-0002 | R-0003 | R-0004 |
|---|---:|---:|---:|---:|
| Principal | 75,00 | 125,00 | 125,00 | 175,00 |
| Segundo agente | 3,00 | 5,00 | 5,00 | 7,00 |
| Terceiro agente | 4,50 | 7,50 | 7,50 | 10,50 |
| Quarto agente | 6,00 | 10,00 | 10,00 | 14,00 |

Os valores mostrados confirmam a aplicação dos percentuais sobre o total de comissão de cada figura.

Exemplo para o agente principal:

```text
Comissão total: 500,00

15% → 75,00
25% → 125,00
25% → 125,00
35% → 175,00
```

A tabela visual fornecida está cortada e não exibe a distribuição do organizador e do assessor, embora os valores totais dessas figuras tenham sido mencionados oralmente. Portanto, não é possível registrar, com base exclusiva nas evidências apresentadas, os valores distribuídos dessas duas figuras na tabela de recibos.

---

### 6.4 Parcela calculada por diferença

A documentação mostrada afirma que, tal como ocorre na distribuição de importes, existe uma parcela calculada por diferença para assegurar a distribuição correta das comissões caso haja algum problema na definição dos percentuais.

A apresentação oral também descreve que a distribuição de comissões pode terminar com a aplicação do “restante” em uma parcela, no exemplo de percentuais 15%, 25%, 25% e 35%.

---

## 7. Definição de datas de efeito e vencimento

### 7.1 Unidade temporal e número de unidades

O instrutor recapitula que as parcelas podem ser movimentadas em **dias** ou em **meses**. Depois de escolhida a unidade, é definido o número de unidades aplicável a cada parcela.

Exemplos citados oralmente:

- A primeira parcela pode ser emitida zero dias a partir de uma data de partida;
- Uma parcela pode ser emitida cinco meses a partir da data de partida.

Segundo o instrutor, essa configuração estabelece o efeito e o vencimento da parcela.

A documentação visual acrescenta que:

- O comportamento varia conforme a unidade escolhida, dias ou meses;
- Os tipos de unidade podem ser combinados;
- Pode existir uma lógica de negócio que determine dinamicamente o número de unidades.

### Lógica de negócio para número de unidades

A documentação descreve essa lógica como responsável por devolver o número de unidades a aplicar à parcela definida quando tal número não é constante e depende de circunstâncias não definidas no Reef.core.

A reunião não detalha as condições possíveis, nem a forma de parametrização dessas circunstâncias.

---

## 8. Ajuste opcional de dias de efeito

### 8.1 Finalidade

A definição de dias de efeito é apresentada como opcional. Ela permite alterar a data de efeito já determinada pelo plano de pagamento.

O próprio plano calcula uma data de efeito para cada recibo. A definição adicional pode substituir ou deslocar essa data.

```text
Plano de pagamento calcula a data de efeito
        ↓
Definição opcional de dias de efeito é avaliada
        ↓
A data é mantida ou ajustada para um dia configurado
```

---

### 8.2 Motivação operacional

A motivação apresentada está ligada ao gestor de cobrança. O instrutor explica que a empresa pode enviar recibos a bancos, agentes ou outras entidades para realização da cobrança.

Como exemplo, menciona-se a possibilidade de um banco receber recibos apenas no dia 5 de cada mês. Nesse caso, a regra serve para concentrar ou deslocar efeitos para datas aceitas pelo processo de cobrança.

---

### 8.3 Exemplo de faixas de ajuste

A explicação oral apresenta regras por faixas de dias:

| Efeito originalmente calculado | Efeito ajustado |
|---|---|
| Entre os dias 1 e 5 | Dia 5 |
| Entre os dias 6 e 10 | Dia 10 |
| Entre os dias 16 e 20 | Dia 20 |
| Dia 23, no exemplo citado | Dia 25 |

Um exemplo específico é dado para uma data de efeito de 18 de janeiro. Como ela cai no intervalo de 16 a 20, o recibo passa a ter efeito no dia 20.

Outro exemplo: uma data inicialmente no dia 6 é deslocada para o dia 10.

A tela também apresenta parte de uma tabela que sugere faixas como:

| Intervalo de dias | Dia resultante |
|---|---:|
| Entre 21 e 25 | 25 |
| Entre 26 e 31 | 05 |

A última regra implica uma possível passagem para o dia 5, mas a evidência visual fornecida está truncada. Não é possível afirmar com segurança se esse “05” corresponde ao mês seguinte, embora isso seja uma interpretação funcional plausível.

---

### 8.4 Escopo por gestor de cobrança

A definição é feita por gestor de cobrança. Assim, diferentes gestores podem possuir calendários diferentes.

A documentação mostra propriedades como:

- Ramo;
- Plano de pagamento;
- Tipo de gestor;
- Gestor;
- Dia de efeito até;
- Dia de efeito definitivo.

A descrição de tipo de gestor informa que ele identifica qual atividade de terceiro gerencia a cobrança dos recibos. O tipo possui uma classe de gestor associada e determina características que a apólice precisa ter para que possa utilizar aquele gestor de cobrança.

A tabela visual mostra, parcialmente:

| Tipo | Descrição | Caso de utilização |
|---:|---|---|
| 1 | Agente | Sempre |
| 2 | Banco | Quando o pagador dispõe de conta bancária… |

O restante da condição associada a banco está cortado na evidência fornecida.

---

## 9. Distribuição de comissão por intervenção de agente

### 9.1 Natureza opcional

A distribuição por intervenção de agente é apresentada como outra definição opcional. Ela não substitui a necessidade de definir o percentual de comissão de cada parcela no plano de pagamento.

A regra geral de comissão por parcela é obrigatória. A regra por figura de agente é um refinamento opcional.

```text
Percentual de comissão por parcela no plano
        ↓
Há regra específica para a figura?
        ├── Sim → aplica distribuição específica da figura
        └── Não → aplica distribuição geral do plano
```

---

### 9.2 Comportamento padrão

Se uma apólice possui várias figuras e não existe uma regra específica para elas, todas seguem o percentual geral definido por parcela.

No exemplo citado, um plano de quatro parcelas distribui 25% da comissão em cada uma. Sem customização, esse percentual seria aplicado para agente principal, organizador, assessor e demais intervenções existentes na apólice.

---

### 9.3 Sobrescrita por figura

A configuração opcional permite substituir a distribuição geral para uma figura determinada.

O exemplo da reunião estabelece:

| Figura | Parcela 1 | Parcela 2 | Parcela 3 | Parcela 4 |
|---|---:|---:|---:|---:|
| Agente principal | 30% | 30% | 30% | 10% |
| Assessor | 100% | 0% | 0% | 0% |
| Figura sem regra específica | 25% | 25% | 25% | 25% |

O caso apresentado demonstra que:

- O agente principal segue uma distribuição 30/30/30/10;
- O assessor recebe 100% de sua comissão na primeira parcela;
- Um organizador ou segundo agente não configurado especificamente continua seguindo a regra geral de 25% por parcela.

---

### 9.4 Pergunta e resposta sobre precedência

Uma participante questiona se a regra apresentada seria aplicada quando não houvesse uma definição específica em nível de parcela.

A resposta esclarece a precedência:

1. A definição de percentual de comissão por parcela do plano é obrigatória;
2. A definição por figura de agente é opcional;
3. Se existe regra específica para uma figura, ela prevalece;
4. Se não existe regra para a figura, aplica-se o percentual geral do plano.

O instrutor usa o caso de uma apólice com agente principal e segundo agente:

- Há uma regra particular para o agente principal;
- Não há regra particular para o segundo agente;
- O agente principal recebe conforme sua regra exclusiva;
- O segundo agente recebe conforme a regra geral do plano.

---

### 9.5 Escopo por ramo, plano e vigência

A definição específica pode ser particularizada por ramo.

O instrutor explica que a definição geral de um plano é genérica, mas a distribuição específica por figura pode variar para um ramo concreto. Um exemplo verbal menciona o ramo de hogar — residência — como ilustração.

As propriedades mencionadas para essa configuração são:

- Ramo;
- Plano de pagamento;
- Número da parcela;
- Intervenção de agente;
- Percentual de comissão;
- Lógica de negócio adicional;
- Data de validade.

A data de validade indica a partir de quando a distribuição se torna efetiva.

**O que a reunião não esclarece:**

- Se há data final de validade;
- Como conflitos entre múltiplas regras vigentes são resolvidos;
- Como a lógica de negócio adicional interage com percentuais fixos;
- Se a regra é cumulativa ou exclusivamente substitutiva em cenários de várias condições aplicáveis.

---

## 10. Tratamento de parcelas que excedem a vigência da apólice

### 10.1 Cenário apresentado

O instrutor retoma uma configuração da definição geral do plano para tratar situações em que não é possível gerar todas as parcelas originalmente configuradas.

O cenário descrito é:

- Apólice temporária de seis meses;
- Plano de pagamento com quatro parcelas trimestrais;
- Parte das parcelas projetadas fica além do vencimento da apólice.

A apresentação visual utiliza uma linha azul para representar a vigência da apólice e uma linha laranja para representar a distribuição do plano de pagamento.

---

### 10.2 Opções mencionadas para importes

Para parcelas fora da vigência, foram mencionadas quatro possibilidades para a distribuição de importes:

1. **Distribuição proporcional**  
   Os importes das parcelas que não cabem na vigência são redistribuídos proporcionalmente entre as parcelas que permanecem dentro dela.

2. **Concentração na primeira parcela**  
   Os importes das parcelas que não cabem são somados e transferidos para a primeira parcela.

3. **Geração de uma única parcela**  
   Em vez de tentar aplicar o plano de quatro parcelas, é gerada uma única parcela correspondente à duração aplicável da apólice.

4. **Permitir parcelas fora do vencimento da apólice**  
   O sistema pode permitir a geração das parcelas mesmo que estejam fora da vigência.

A reunião não informa os nomes técnicos dessas opções na aplicação; a redação acima descreve seu comportamento segundo a explicação verbal.

---

### 10.3 Regra padrão para comissões

Se não houver uma definição específica para tratamento de comissões, as comissões seguem o mesmo destino adotado para os importes.

Exemplos dados:

- Se os importes são redistribuídos proporcionalmente, as comissões também são redistribuídas proporcionalmente;
- Se é gerada uma parcela única, as comissões também são concentradas nessa parcela.

---

### 10.4 Regra opcional para comissões

A definição apresentada permite que as comissões tenham um tratamento diferente daquele aplicado aos importes quando o plano excede a vigência.

O exemplo usa uma distribuição original de comissão:

| Parcela | Comissão original |
|---|---:|
| 1 | 20% |
| 2 | 30% |
| 3 | 30% |
| 4 | 20% |
| **Total** | **100%** |

Como as parcelas 3 e 4 não podem ser geradas, há 50% de comissão que precisa ser redistribuída.

---

### 10.5 Opção: transferir o excedente à primeira parcela

Nessa alternativa, os 50% não distribuídos são levados para a primeira parcela.

| Parcela | Distribuição resultante |
|---|---:|
| 1 | 70% |
| 2 | 30% |

A primeira parcela passa de 20% para 70%, pois incorpora os 30% e os 20% originalmente atribuídos às parcelas não geradas.

---

### 10.6 Opção: proporcional ao número de parcelas geradas

Nesta opção, os percentuais das parcelas não geradas são divididos pelo número de parcelas que permaneceram dentro da vigência.

No exemplo:

```text
Comissão não distribuída: 50%
Parcelas geradas: 2
Redistribuição para cada parcela: 25 pontos percentuais
```

Resultado:

| Parcela | Percentual original | Acréscimo | Percentual resultante |
|---|---:|---:|---:|
| 1 | 20% | 25% | 45% |
| 2 | 30% | 25% | 55% |

---

### 10.7 Opção: proporcional ao percentual original de comissão

A terceira alternativa distribui o percentual não alocado proporcionalmente aos percentuais originais das parcelas que permanecem válidas.

O resultado citado é:

| Parcela | Distribuição resultante |
|---|---:|
| 1 | 40% |
| 2 | 60% |

A lógica apresentada é que a primeira parcela representava 20% de uma base total de 50% e a segunda representava 30% dessa mesma base. A redistribuição mantém a proporção relativa entre 20 e 30.

---

### 10.8 Lógica de negócio online

A sessão também menciona uma lógica de negócio que pode determinar, de forma “online”, qual método de distribuição deve ser usado.

**A transcrição não detalha:**

- O significado exato de “online” nesse contexto;
- Os critérios usados para selecionar a estratégia;
- Se a lógica é executada em tempo real, em emissão, em faturamento ou em outro momento;
- Os dados disponíveis para a decisão;
- Como se trata falha ou ausência de retorno da lógica.

---

## 11. Componentes e conceitos mencionados

| Componente ou conceito | Finalidade inferida do conteúdo |
|---|---|
| Reef.core | Ambiente/produto documentado no treinamento; contém definições e regras de plano de pagamento. |
| Plano de pagamento | Configuração que orienta a geração de parcelas/recibos, suas datas, importes e comissões. |
| Parcela / cuota | Unidade de cobrança ou recibo gerado a partir do plano de pagamento. |
| Recibo | Documento/unidade de cobrança a que são associados importes, comissões e efeito. |
| Conceito econômico | Elemento de valor da apólice, como prémio ou recargos, com comportamento de fracionamento próprio. |
| Prémio | Conceito econômico fracionável no exemplo apresentado. |
| Recargos | Conceito econômico não fracionável no exemplo apresentado. |
| Gestor de cobrança | Entidade que recebe os recibos para efetuar a cobrança, como agente ou banco. |
| Ramo | Classificação usada para particularizar regras de distribuição. |
| Intervenção de agente | Figura participante da comercialização/intermediação e elegível para comissão. |
| Lógica de negócio | Mecanismo configurável para calcular percentuais, unidades ou estratégias variáveis não previstas diretamente no Reef.core. |
| Data de efeito | Data funcional atribuída ao recibo, calculada pelo plano e possivelmente alterada por regras adicionais. |
| Vencimento da apólice | Limite temporal usado para decidir se determinadas parcelas podem ser geradas. |

---

## 12. Modelo de integração e operação

A reunião descreve interações funcionais, mas não apresenta arquitetura técnica de integração.

### 12.1 Interações funcionais identificadas

```text
Apólice
    ↓
Plano de pagamento
    ↓
Geração de parcelas e recibos
    ↓
Definição de gestor de cobrança
    ↓
Envio dos recibos ao gestor
    ↓
Cobrança pelo gestor
    ↓
Recebimento dos importes e continuidade dos processos
```

O instrutor afirma que recibos podem ser enviados a bancos, agentes ou outras entidades para cobrança. Depois da cobrança, a organização recebe os importes e dá continuidade aos processos.

### 12.2 O que não foi informado

A reunião não permite determinar:

- Se a comunicação com bancos e agentes ocorre por API, arquivos, mensageria ou outro mecanismo;
- Se os envios são síncronos ou assíncronos;
- Como ocorre a confirmação da cobrança;
- Como são tratados rejeições, conciliações, estornos ou inadimplência;
- Quais sistemas externos participam;
- Como identidades, permissões ou credenciais são administradas;
- Se existe monitoramento técnico, auditoria ou rastreabilidade operacional.

---

## 13. Modelo operacional e governança

A sessão é predominantemente funcional e de treinamento. Ela não apresenta processos formais de operação, governança, suporte, incidentes, releases, patches, monitoramento, versionamento ou controle de mudanças.

Ainda assim, alguns elementos de governança funcional podem ser identificados:

- As regras são configuradas em níveis específicos, como plano, parcela, ramo, gestor de cobrança e figura de agente;
- Há datas de validade para determinadas definições;
- Existem regras gerais obrigatórias e regras específicas opcionais;
- Regras particulares prevalecem sobre regras gerais quando aplicáveis;
- Lógicas de negócio podem lidar com situações variáveis não cobertas pela configuração estática.

> **Leitura analítica:** o modelo apresentado indica uma governança por configuração, na qual comportamentos gerais são estabelecidos no plano de pagamento e exceções são aplicadas por regras de escopo mais específico. A reunião, porém, não informa quem pode criar, aprovar ou publicar tais configurações.

---

## 14. Casos concretos apresentados

### Caso 1 — Distribuição de prémio e recargos

**Contexto**  
Apólice com prémio de 1.000,00 e recargos de 20,00, associada a um plano de quatro parcelas de 25%.

**Regra econômica**  
O prémio é fracionável; os recargos não são.

**Resultado**

| Recibo | Prémio | Recargos | Total |
|---|---:|---:|---:|
| R-0001 | 250,00 | 20,00 | 270,00 |
| R-0002 | 250,00 | 0,00 | 250,00 |
| R-0003 | 250,00 | 0,00 | 250,00 |
| R-0004 | 250,00 | 0,00 | 250,00 |

**Diferencial demonstrado**  
A propriedade do conceito econômico — fracionar ou não — prevalece sobre a distribuição genérica do plano.

---

### Caso 2 — Distribuição de comissão entre intervenientes

**Contexto**  
Nova apólice com quatro frações trimestrais e percentuais de comissão de 15%, 25%, 25% e 35%.

**Comissões totais mencionadas**

| Interveniente | Valor |
|---|---:|
| Agente principal | 500,00 |
| Segundo agente | 20,00 |
| Terceiro agente | 30,00 |
| Quarto agente | 40,00 |
| Organizador | 200,00 |
| Assessor | 100,00 |

**Resultado visualmente comprovado para algumas figuras**  
Os valores do agente principal e dos três agentes subsequentes seguem os percentuais definidos pelo plano.

**Limitação de evidência**  
A tela fornecida não mostra os valores distribuídos do organizador e do assessor, embora eles sejam citados oralmente.

---

### Caso 3 — Ajuste de data de efeito por gestor de cobrança

**Contexto**  
O plano calcula uma data de efeito para um recibo, mas o gestor de cobrança precisa que os recibos sejam concentrados em datas específicas.

**Exemplo**  
Uma data de efeito de 18 de janeiro é deslocada para o dia 20, porque o intervalo de 16 a 20 é mapeado para o dia 20.

**Diferencial demonstrado**  
A data funcional calculada pelo plano pode ser alterada por uma definição posterior associada ao gestor de cobrança.

---

### Caso 4 — Distribuição específica por figura de agente

**Contexto**  
Plano de quatro parcelas com distribuição geral de 25% em cada uma.

**Particularizações demonstradas**

| Figura | Distribuição configurada |
|---|---|
| Agente principal | 30%, 30%, 30%, 10% |
| Assessor | 100%, 0%, 0%, 0% |
| Figura sem regra específica | 25%, 25%, 25%, 25% |

**Diferencial demonstrado**  
A regra específica de uma figura sobrescreve a regra geral, sem afetar automaticamente as demais figuras.

---

### Caso 5 — Plano trimestral incompatível com vigência de seis meses

**Contexto**  
Apólice de seis meses e plano com quatro parcelas trimestrais.

**Problema**  
Duas parcelas ultrapassariam a vigência da apólice.

**Alternativas discutidas**

- Redistribuir importes proporcionalmente;
- Transferir importes não alocados à primeira parcela;
- Gerar uma única parcela;
- Permitir a geração de parcelas após o vencimento;
- Aplicar à comissão o mesmo tratamento dos importes;
- Ou aplicar uma regra específica de redistribuição de comissões.

---

## 15. Perguntas e respostas relevantes

### Pergunta 1 — Qual regra prevalece na distribuição de comissões?

**Pergunta resumida**  
A participante questiona se a regra apresentada é usada quando não há uma definição específica em nível de parcela ou de figura.

**Resposta**  
O instrutor esclarece que a distribuição de comissão por parcela no plano é obrigatória. A regra de distribuição por figura é opcional. Quando há configuração específica para a figura, ela prevalece; quando não há, aplica-se a distribuição geral do plano.

**O que essa resposta esclarece**  
Existe uma hierarquia entre:

1. Regra geral obrigatória do plano de pagamento;
2. Regra opcional e específica por figura de agente.

---

### Pergunta 2 — Como uma figura sem regra própria é tratada?

**Pergunta resumida**  
A conversa explora o caso de uma apólice com agente principal e segundo agente, em que apenas o agente principal tem regra específica.

**Resposta**  
O agente principal recebe de acordo com sua regra particular. O segundo agente, sem configuração específica, recebe conforme os percentuais gerais do plano.

**O que essa resposta esclarece**  
A personalização é seletiva. Uma regra específica não exige que todas as figuras tenham regras próprias.

---

### Perguntas recorrentes do instrutor

Ao longo da sessão, o instrutor pergunta diversas vezes se há dúvidas. Não há, na transcrição fornecida, outras perguntas substantivas além da discussão sobre precedência de regras de comissão por figura.

A ausência de perguntas adicionais não deve ser interpretada como confirmação de entendimento integral por todos os participantes.

---

## 16. Limitações e ressalvas reconhecidas

### Limitações explicitamente apresentadas

1. **Distribuição padrão não prevalece sobre conceito não fracionável**  
   Conceitos econômicos não fracionáveis são lançados na primeira parcela, mesmo que o plano tenha percentuais diferentes.

2. **A regra por intervenção de agente é opcional**  
   Sem essa regra, a distribuição geral de comissão do plano continua válida.

3. **Ajuste de dias de efeito também é opcional**  
   A data calculada pelo plano somente é alterada se houver a configuração correspondente.

4. **Planos podem ser incompatíveis com a vigência da apólice**  
   Um plano pode prever parcelas que não cabem dentro da duração da apólice, exigindo escolha de uma estratégia de tratamento.

5. **Há situações que requerem lógica de negócio**  
   Percentuais, número de unidades e forma de distribuição podem depender de circunstâncias não diretamente cobertas pelas propriedades estáticas do Reef.core.

---

### Limitações da evidência disponível

1. A transcrição não detalha a definição geral completa do plano de pagamento;
2. Parte dos slides está cortada;
3. Alguns exemplos numéricos orais têm ruído de reconhecimento de voz;
4. Não foi possível confirmar todos os valores visualizados para todas as figuras de agente;
5. Não há explicação técnica sobre implementação das lógicas de negócio;
6. Não há detalhamento de integração com bancos, agentes ou entidades de cobrança;
7. Não há discussão sobre erros operacionais, exceções de cobrança ou conciliação.

---

## 17. Riscos e desafios

### Riscos explicitamente relacionados ao conteúdo

A reunião não apresenta uma seção formal de riscos. Ainda assim, há riscos funcionais reconhecíveis a partir dos cenários explicados:

- Configuração de percentuais que não fecha 100%, mitigada pela parcela calculada por diferença;
- Escolha inadequada de um plano de pagamento incompatível com a vigência da apólice;
- Aplicação de uma distribuição geral quando seria necessário configurar uma regra específica por figura;
- Ajustes de data de efeito que podem alterar a data inicialmente calculada pelo plano;
- Necessidade de lógica de negócio quando regras estáticas não cobrem o cenário.

### Desafios derivados do contexto — análise

> Esta seção é analítica; os pontos abaixo não foram apresentados literalmente como riscos pelos participantes.

1. **Complexidade de parametrização**  
   O número de camadas — plano, parcela, conceito econômico, ramo, gestor de cobrança, figura de agente, vigência e lógica de negócio — sugere potencial de configuração incorreta ou difícil de auditar.

2. **Necessidade de transparência de precedência**  
   A coexistência de regras gerais e regras específicas exige clareza sobre qual regra venceu em cada cálculo. Sem rastreabilidade adequada, usuários podem ter dificuldade em explicar valores de recibos e comissões.

3. **Validação de consistência temporal**  
   A possibilidade de deslocar datas de efeito e de tratar parcelas fora da vigência indica a necessidade de validações para evitar resultados comercialmente ou contabilmente inesperados.

4. **Dependência de regras customizadas**  
   As lógicas de negócio cobrem condições não previstas pela configuração padrão. Isso pode aumentar flexibilidade, mas também criar dependência de desenvolvimento, testes e governança que não foram detalhados na sessão.

---

## 18. Transformações e implicações identificadas

### 18.1 Da regra única para uma configuração hierárquica

A sessão mostra que a distribuição não é governada por uma única regra global. Há uma progressão de especificidade:

```text
Plano de pagamento
        ↓
Parcela
        ↓
Característica do conceito econômico
        ↓
Gestor de cobrança
        ↓
Ramo
        ↓
Figura de agente
        ↓
Lógica de negócio
```

> **Leitura analítica:** isso sugere uma arquitetura funcional orientada à configuração e exceção controlada, em vez de uma regra fixa única para toda a operação.

---

### 18.2 Separação entre fluxo financeiro e fluxo de comissão

A independência entre percentuais de prémio e percentuais de comissão é uma separação funcional relevante.

```text
Cobrança do cliente
        ≠
Remuneração dos intervenientes
```

> **Leitura analítica:** essa separação permite que a operação financeira da apólice e a remuneração comercial atendam a necessidades distintas, sem que uma imponha o calendário da outra.

---

### 18.3 Da data calculada à data operacional

O plano calcula datas a partir das unidades configuradas, mas essas datas podem ser ajustadas segundo necessidades do gestor de cobrança.

> **Leitura analítica:** a solução parece separar o cálculo contratual ou técnico da parcela da necessidade operacional de execução da cobrança.

---

### 18.4 Do comportamento padrão à especialização por contexto

A possibilidade de configurar exceções por ramo, figura de agente e gestor de cobrança demonstra que o mesmo plano pode ter resultados diferentes conforme o contexto da apólice.

> Essa leitura não significa que qualquer regra possa ser livremente combinada; a reunião não detalha as validações, restrições ou conflitos possíveis entre configurações.

---

## 19. Números e indicadores citados

| Indicador ou elemento | Valor mencionado | Contexto |
|---|---:|---|
| Parcelas do exemplo de prémio | 4 | Plano com distribuição uniforme de 25% |
| Percentual de prémio por parcela no exemplo | 25% | Quatro parcelas |
| Prémio total no exemplo | 1.000,00 | Distribuído em quatro parcelas de 250,00 |
| Recargos totais no exemplo | 20,00 | Não fracionáveis; concentrados no primeiro recibo |
| Recibo 1 no exemplo | 270,00 | 250,00 de prémio + 20,00 de recargos |
| Demais recibos no exemplo | 250,00 | Apenas prémio |
| Figuras de agente mencionadas | 6 | Principal, segundo, terceiro, quarto, organizador e assessor |
| Comissão do agente principal | 500,00 | Exemplo de quatro frações trimestrais |
| Comissão do segundo agente | 20,00 | Exemplo de comissões |
| Comissão do terceiro agente | 30,00 | Exemplo de comissões |
| Comissão do quarto agente | 40,00 | Exemplo de comissões |
| Comissão do organizador | 200,00 | Exemplo de comissões |
| Comissão do assessor | 100,00 | Exemplo de comissões |
| Distribuição de comissão do exemplo | 15%, 25%, 25%, 35% | Exemplo demonstrado na documentação e na fala |
| Distribuição geral alternativa | 25%, 25%, 25%, 25% | Exemplo de regra geral substituída por figura |
| Distribuição do agente principal customizada | 30%, 30%, 30%, 10% | Exemplo de regra específica |
| Distribuição do assessor customizada | 100%, 0%, 0%, 0% | Exemplo de regra específica |
| Vigência da apólice no exemplo de excesso | 6 meses | Apólice temporária |
| Parcelas do plano no exemplo de excesso | 4 trimestrais | Parte delas excede a vigência |
| Comissão original no excesso | 20%, 30%, 30%, 20% | Total de 100% |
| Comissão não alocada no excesso | 50% | Parcelas 3 e 4 não geradas no exemplo |
| Resultado ao concentrar na primeira parcela | 70% e 30% | Primeira e segunda parcelas |
| Resultado proporcional por número de parcelas | 45% e 55% | Primeira e segunda parcelas |
| Resultado proporcional por percentual original | 40% e 60% | Primeira e segunda parcelas |

> Os valores são aqueles declarados ou exibidos na reunião; não há evidência de auditoria externa desses números.

---

## 20. O que a reunião não permite concluir

A sessão fornece um entendimento funcional profundo sobre planos de pagamento, mas não permite concluir com segurança:

- Qual tecnologia compõe o Reef.core;
- Qual banco de dados armazena planos, parcelas, recibos e comissões;
- Se há uso de APIs, eventos, filas, arquivos ou integrações batch;
- Como ocorre a emissão técnica de recibos;
- Como as regras são persistidas, publicadas, versionadas ou aprovadas;
- Como lógicas de negócio são implementadas;
- Quais linguagens ou ferramentas são usadas para essas lógicas;
- Como regras conflitantes são priorizadas quando múltiplas condições são aplicáveis;
- Quais são os controles de acesso para alterar definições;
- Se existem trilhas de auditoria;
- Como são realizados testes antes de colocar uma configuração em vigor;
- Como são tratadas falhas de integração com bancos ou gestores de cobrança;
- Como ocorrem reconciliação, cancelamento, estorno ou inadimplência;
- Quais são os limites máximos de parcelas, planos ou regras por ramo;
- Se a quantidade de seis figuras de agente é uma restrição global do produto;
- Se ajustes de data para “05” em fins de mês ocorrem no mês seguinte;
- Quais são os SLAs, processos de suporte, observabilidade e tratamento de incidentes.

---

## 21. Conclusões

A reunião conclui o treinamento sobre a definição de planos de pagamento, após três sessões, segundo o instrutor. A configuração é apresentada como extensa porque cobre diversas decisões necessárias para transformar uma apólice em recibos de cobrança e distribuições de comissão.

O modelo central pode ser resumido da seguinte forma:

```text
Definir o plano
        ↓
Definir as parcelas
        ↓
Determinar efeitos, vencimentos, importes e comissões
        ↓
Aplicar regras opcionais quando necessário
        ├── Ajustar dias de efeito
        ├── Personalizar comissão por figura
        └── Tratar parcelas fora da vigência
```

Os principais princípios transmitidos foram:

1. A distribuição de importes pode ser diferente da distribuição de comissões;
2. Conceitos econômicos não fracionáveis prevalecem sobre a distribuição padrão do plano;
3. A distribuição geral de comissão é obrigatória por parcela;
4. Regras específicas por figura de agente são opcionais e têm precedência quando existem;
5. Datas de efeito calculadas podem ser ajustadas conforme o gestor de cobrança;
6. Há estratégias configuráveis para tratar parcelas que ultrapassam a vigência da apólice;
7. Lógicas de negócio podem complementar configurações estáticas em cenários variáveis.

O conteúdo apresentado permite compreender a lógica funcional de configuração, mas não substitui documentação técnica sobre implementação, integrações, segurança, governança de mudanças ou operação do Reef.core.
