# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.academy-TRON-Emisión-Conceptos de desglose-Detalle de importes-2.mp4`
**Data de processamento:** 25/09/2026 06:11:57
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Análise estruturada — Treinamento REEF/TRON (MAPFRE)

> **Base documental:** transcrição automática de voz e evidências visuais extraídas de telas/slides.  
> **Confiabilidade terminológica:** alguns termos da fala sofreram degradação pelo reconhecimento automático. Nesta análise, termos confirmados visualmente foram preservados como **TRON**, **REEF**, **IMP_ANUAL**, **IMP_NO_CONSUMIDO**, **IMP_SPTO** e **IMP_ACUMULADO_ANUAL**. Onde a transcrição usa formas como “conceptores de Glossé”, a evidência mais consistente indica referência a **conceitos de desglose**.  
> **Escopo:** a reunião foi predominantemente um treinamento funcional sobre emissão, suplementos/endossos, cálculo de importes e regras de cancelamento em TRON.

---

## 1. Síntese executiva

A sessão foi uma continuação de um treinamento anterior sobre a tabela de importes associada aos **conceitos de desglose** no sistema TRON. O foco principal foi explicar como o sistema calcula valores anuais, valores não consumidos, valores de suplemento e valores acumulados durante a vigência de uma apólice.

A explicação percorreu especialmente dois mecanismos de cálculo:

1. o **coeficiente de constituição**, usado para adaptar um importe anual à duração efetiva de uma apólice, risco ou suplemento; e  
2. o **coeficiente de anulação**, usado quando a apólice ou o risco deixam de vigorar e é necessário determinar o valor a devolver ou anular.

A reunião demonstrou que o comportamento dos cálculos é fortemente parametrizável. Entre as configurações citadas estão: ano de 360 ou 365 dias, cálculo proporcional ou por escala, regras específicas de devolução, conceitos que participam ou não de cancelamentos, e regras diferentes conforme a permanência ou saída do risco da apólice.

Além da explicação conceitual, os participantes apresentaram dúvidas operacionais reais: coexistência de apólices com durações distintas, apólices multianuais, extensões de vigência, relacionamento com tabelas de vencimento, comportamento de descontos informados por arquivo e necessidades de treinamento sobre remessas de cosseguro e planos de pagamento.

A principal mensagem da sessão é que TRON não trata os valores de prêmio e devolução como cálculos únicos e imutáveis: o resultado depende da vigência, da parametrização do ramo, do tipo de suplemento, do comportamento esperado na anulação e das características configuradas para cada conceito de desglose.

---

## 2. Contexto e antecedentes

A apresentação foi explicitamente descrita como continuação de uma sessão realizada no ano anterior. O instrutor retomou rapidamente os conceitos já abordados antes de aprofundar os coeficientes de cálculo.

O contexto funcional é o módulo de **emissão** de TRON, com atenção a movimentos que afetam uma apólice ou risco durante sua vigência. Foram citados, entre outros:

- emissão de nova apólice;
- inclusão de risco;
- suplementos;
- renovação;
- regularização;
- cancelamento de apólice;
- exclusão ou baixa de risco;
- mudança de plano ou forma de pagamento;
- extensões de vigência;
- apólices temporárias;
- apólices anuais;
- apólices multianuais.

A documentação apresentada durante a sessão estava hospedada no ambiente **MAPFRE Catalog Marketplace**, em páginas identificadas como documentação REEF. Os metadados visíveis indicavam:

| Metadado | Valor visível |
|---|---|
| Componente | `documentación reef` |
| Owner | `map-capacitacion` |
| Lifecycle | `wip` |
| Ambiente/URL | `pre.marketplace.mapfre.com` |

A reunião também teve caráter colaborativo: o instrutor informou que futuras sessões podem ser organizadas conforme as dúvidas e necessidades levantadas pelos participantes.

---

## 3. Problemas funcionais tratados

### 3.1. Diferença entre importe anual e valor efetivamente cobrado ou devolvido

O treinamento esclarece que o **IMP_ANUAL** representa um importe anual de referência. Ele não corresponde, necessariamente, ao valor que será cobrado ou devolvido no movimento em questão.

Uma apólice temporária, por exemplo, pode ter vigência de seis meses, mas ainda possuir um importe anual calculado para doze meses. Nesse caso, o sistema precisa adaptar o valor anual à vigência efetiva do movimento.

**Consequência funcional:** usar diretamente o importe anual para cobrar uma apólice de vigência parcial produziria um valor incompatível com o período coberto.

**Mecanismo apresentado:** coeficiente de constituição.

---

### 3.2. Determinação do valor não consumido em suplementos e cancelamentos

Quando ocorre um suplemento dentro da vigência da apólice, TRON pode precisar calcular a parcela ainda não consumida do valor anteriormente constituído.

O instrutor explicou que o sistema realiza uma espécie de simulação de anulação quando entende que um conceito de desglose sairá da apólice ou do risco. Esse valor não consumido é relevante para recalcular o efeito financeiro do movimento.

A lógica varia conforme o resultado do suplemento:

- a apólice ou o risco **permanece vigente**;
- a apólice ou o risco **é anulado/excluído**.

**Consequência funcional:** a forma de determinar o valor não consumido não é única; ela depende da permanência do risco e das regras de cancelamento aplicáveis.

---

### 3.3. Diferença entre proporcionalidade real e cálculo por escala

A reunião destacou que uma apólice não precisa necessariamente seguir uma proporcionalidade estrita de tempo.

Exemplo conceitual apresentado:

- uma apólice de 30 dias poderia, em uma proporcionalidade simples de um ano de 360 dias, equivaler a 1/12 do importe anual;
- porém, uma tabela de escala pode definir que, para 30 dias, a companhia cobre 20% do importe anual.

Isso permite tratar produtos em que o preço ou a devolução não devem ser diretamente proporcionais ao número de dias de vigência.

**Consequência funcional:** a parametrização comercial pode alterar significativamente o valor financeiro de constituição e de anulação.

---

### 3.4. Dependência da parametrização de 360 ou 365 dias

A duração de uma vigência depende de uma parametrização no nível do ramo. TRON permite considerar um ano com:

- **360 dias**, tratando todos os meses como meses de 30 dias; ou
- **365 dias**, utilizando a diferença entre datas do calendário.

A reunião enfatizou que essa escolha altera os dias de vigência e, por consequência, altera coeficientes e valores calculados.

Exemplo discutido:

| Intervalo | Ano de 365 dias | Ano de 360 dias |
|---|---:|---:|
| 1º de janeiro a 1º de fevereiro | 31 dias | 30 dias |
| Vigência de aproximadamente seis meses | 181 dias no exemplo apresentado | 180 dias na lógica de meses de 30 dias |

**Consequência funcional:** duas apólices com as mesmas datas podem gerar frações financeiras diferentes conforme a configuração do ramo.

---

### 3.5. Tratamento de descontos e importes manuais

Uma participante do Equador relatou uma divergência de centavos em um negócio com aproximadamente **28 mil riscos de pessoas**. Segundo o relato:

- há um desconto de 15% por risco;
- a base é pré-carregada;
- um valor é gravado na tabela `P200770`;
- após a passagem para uma tabela ou entidade registrada na transcrição como `D270`, TRON recalcula o valor;
- em um exemplo, um valor que aparentava ser `0,588` passou a `0,58796`.

O instrutor indicou que o comportamento pode estar relacionado à configuração do conceito de desglose — especialmente se o conceito de desconto estiver configurado como automático, mesmo que a prima seja manual.

**Status:** não houve diagnóstico conclusivo na reunião. O instrutor solicitou que a participante se identificasse e enviasse tabelas de definição para análise.

---

## 4. Solução apresentada: modelo de cálculo financeiro em TRON

A solução descrita é um modelo parametrizável que separa diferentes valores e responsabilidades no ciclo financeiro da apólice.

Os conceitos centrais apresentados foram:

| Campo/conceito | Finalidade explicada |
|---|---|
| `IMP_ANUAL` | Importe correspondente a um ano de cobertura. É uma base anual de cálculo. |
| `IMP_NO_CONSUMIDO` | Parcela não consumida, calculada em determinados suplementos durante a vigência. |
| `IMP_SPTO` | Importe do suplemento; é o valor que será recebido ou devolvido e participa da geração de recibos. |
| `IMP_ACUMULADO_ANUAL` | Acumulado dos importes de suplemento no período de vigência. |

A documentação visual registra que o `IMP_ANUAL` pode ser positivo ou negativo:

- positivo: importe que MAPFRE receberá;
- negativo: importe que MAPFRE devolverá.

Também ficou explícito que o `IMP_ANUAL` **não intervém na geração de quotas/recibos**, enquanto o `IMP_SPTO` é o importe efetivamente associado ao que será cobrado ou devolvido e participa da geração dos recibos.

---

## 5. Arquitetura funcional consolidada

> **Representação analítica:** o diagrama abaixo é uma reorganização dos conceitos apresentados, não um diagrama literal exibido durante a reunião.

```text
Dados da apólice e do risco
    │
    ├─ Datas: efeito e vencimento
    ├─ Características que afetam tarifa
    ├─ Configuração do ramo
    ├─ Configuração dos conceitos de desglose
    └─ Tipo de movimento/suplemento
    │
    ▼
Cálculo de dias de vigência
    │
    ├─ Ano de 360 dias
    └─ Ano de 365 dias
    │
    ▼
Determinação do IMP_ANUAL
    │
    ▼
Determinação de coeficientes
    │
    ├─ Coeficiente de constituição
    └─ Coeficiente de anulação, quando aplicável
    │
    ▼
Cálculo do IMP_NO_CONSUMIDO
    │
    ▼
Cálculo do IMP_SPTO
    │
    ▼
Geração de recibos e atualização do IMP_ACUMULADO_ANUAL
```

Uma leitura possível desse modelo é que TRON separa:

- o valor anual de referência;
- a proporcionalização ou escalonamento conforme a vigência;
- o valor já consumido ou não consumido;
- o valor financeiro efetivo do suplemento;
- o acumulado de movimentos da vigência.

Essa separação permite que o sistema trate alterações contratuais sem presumir que qualquer retorno financeiro será sempre proporcional ao tempo transcorrido.

---

## 6. Componentes e conceitos mencionados

### 6.1. TRON

TRON é o sistema funcional discutido no treinamento. A reunião o apresenta como responsável por cálculos associados à emissão de apólices, riscos, suplementos, importes e recibos.

A transcrição não permite concluir qual é sua arquitetura técnica, linguagem, banco de dados, infraestrutura, modelo de implantação ou mecanismo interno de integração.

---

### 6.2. REEF / documentação REEF

REEF aparece como componente de documentação disponibilizado no MAPFRE Catalog Marketplace. As telas mostravam uma árvore documental abrangendo áreas como:

- Definición;
- Operación;
- Terceros;
- Emisión;
- Siniestros;
- Tesorería;
- Contabilidad;
- Formación;
- Arquitectura;
- Términos;
- Sesión.

O material utilizado pelo instrutor apresentava fórmulas, exemplos, parâmetros de ramo e regras de negócio associadas aos cálculos.

---

### 6.3. Conceitos de desglose

Embora a transcrição apresente deformações do termo, a documentação visual e o contexto apontam para “conceitos de desglose”.

Esses conceitos parecem ser unidades configuráveis que compõem o cálculo financeiro da apólice. A reunião indica que podem existir características por conceito, tais como:

- participação ou não em cancelamentos;
- comportamento proporcional ou não proporcional;
- possibilidade de retenção em cancelamentos;
- cálculo manual ou automático;
- associação a prêmio, desconto ou gasto administrativo.

A reunião não detalha a estrutura técnica desses conceitos nem a totalidade de suas propriedades.

---

### 6.4. Ramo

O ramo é apresentado como nível de parametrização relevante para os cálculos. Entre as configurações mencionadas estão:

- quantidade de dias do ano: 360 ou 365;
- aplicação ou não de regras de cancelamento;
- tratamento de apólices multianuais;
- comportamento de cálculo de dias de vigência.

O instrutor também afirmou que determinadas lógicas podem ser incluídas nesse nível quando a configuração padrão não for suficiente.

---

### 6.5. Suplementos / endossos

A reunião usa “suplementos” e também menciona “endosos” no contexto de alterações da apólice.

Foram citados como exemplos:

- suplemento de renovação;
- suplemento de regularização;
- suplemento de mudança de plano de pagamento;
- suplemento de cancelamento;
- inclusão de risco;
- exclusão ou baixa de risco;
- extensão de vigência.

A sessão futura prevista sobre mudança de plano de pagamento deverá mostrar, segundo o instrutor, como as tabelas e colunas se movimentam na prática.

---

## 7. Modelo de cálculo dos importes

### 7.1. `IMP_ANUAL`

A documentação visual define `IMP_ANUAL` como o importe correspondente a um ano de cobertura. Ele é a base com a qual se calculam outras colunas apresentadas no documento.

Características explicitamente mencionadas:

- pode ser positivo ou negativo;
- depende de informações da apólice e/ou do risco que foram declaradas como relevantes para tarifa;
- o exemplo visual usa a idade do segurado como informação que afeta o cálculo;
- não participa da geração de quotas/recibos;
- independe da duração específica da apólice ou suplemento.

O exemplo exibido mostra o mesmo `IMP_ANUAL` de 150,00 para vigências diferentes:

| Cenário | Efeito | Vencimento | Dias de vigência | `IMP_ANUAL` |
|---|---|---|---:|---:|
| 1 | 01 jan. 2023 | 01 jan. 2024 | 365 | 150,00 |
| 2 | 01 jan. 2023 | 01 out. 2023 | 273 | 150,00 |
| 3 | 01 jan. 2023 | 01 jul. 2023 | 181 | 150,00 |
| 4 | 01 jan. 2023 | 01 abr. 2023 | 90 | 150,00 |

A interpretação funcional dada pelo instrutor é que o importe anual responde à pergunta: **quanto seria cobrado ou devolvido por um ano de cobertura**, e não quanto será necessariamente cobrado pela duração efetiva do movimento.

---

### 7.2. `IMP_NO_CONSUMIDO`

O `IMP_NO_CONSUMIDO` representa, conforme a explicação, o valor não consumido de um conceito associado à apólice ou risco.

Ele é calculado quando há suplemento dentro do período de vigência, com exceções explicitamente citadas:

| Situação | `IMP_NO_CONSUMIDO` é calculado? |
|---|---|
| Suplemento dentro do período de vigência | Sim, em regra |
| Renovação | Não |
| Emissão de nova apólice | Não |
| Inclusão de novo risco | Não |
| Suplemento de regularização | Não |

A justificativa apresentada para a renovação é que ela cria um novo período de vigência; portanto, não haveria componente já consumido ou não consumido do período anterior para esse cálculo.

Há duas formas de cálculo, dependendo de como ficará a apólice ou o risco após o suplemento:

| Estado após o suplemento | Coeficiente usado |
|---|---|
| Apólice/risco continua vigente | Coeficiente de constituição |
| Apólice/risco é anulado ou sai da apólice | Coeficiente de anulação |

A documentação visual mostrou, para suplementos que não anulam a apólice ou o risco:

```text
IMP_NO_CONSUMIDO = IMP_ANUAL × coeficiente_de_constitución
```

A transcrição oral também apresenta uma fórmula alternativa para o cenário em que a apólice ou risco é anulado, mas sua formulação foi capturada com ruído. O entendimento seguro é que, nesse caso, o cálculo utiliza o importe do suplemento, o valor não consumido e o coeficiente de anulação. A forma matemática exata não deve ser considerada confirmada apenas pela fala transcrita.

---

### 7.3. `IMP_SPTO`

O `IMP_SPTO` é o importe do suplemento. Segundo o instrutor, é o valor que será efetivamente:

- recebido do cliente ou pagador; ou
- devolvido ao cliente ou pagador.

Diferentemente do `IMP_ANUAL`, o `IMP_SPTO` participa da geração de recibos.

A fórmula explicada verbalmente foi descrita como:

```text
IMP_SPTO = IMP_ANUAL × coeficiente_de_constitución − IMP_NO_CONSUMIDO
```

> Essa fórmula foi reconstruída a partir da fala do instrutor. A documentação visual exibida nesta reunião não mostrou a fórmula completa de `IMP_SPTO`; portanto, recomenda-se validação direta na documentação REEF para uso formal.

---

### 7.4. `IMP_ACUMULADO_ANUAL`

O `IMP_ACUMULADO_ANUAL` representa quanto seria obtido se todos os recibos gerados dentro do período de vigência fossem cobrados.

A documentação visual define esse valor como a soma dos `IMP_SPTO` dos suplementos gerados no período de vigência.

Regras visualmente apresentadas:

| Movimento | Fórmula |
|---|---|
| Orçamento | `IMP_ACUMULADO_ANUAL = IMP_SPTO` |
| Declaração | `IMP_ACUMULADO_ANUAL = IMP_SPTO` |
| Nova apólice | `IMP_ACUMULADO_ANUAL = IMP_SPTO` |
| Nova aplicação | `IMP_ACUMULADO_ANUAL = IMP_SPTO` |
| Renovação | `IMP_ACUMULADO_ANUAL = IMP_SPTO` |
| Demais movimentos | `IMP_ACUMULADO_ANUAL = IMP_SPTO atual + IMP_ACUMULADO_ANUAL do suplemento anterior` |

A documentação também informa que esse campo é inicializado na renovação com o valor do suplemento de renovação.

---

## 8. Cálculo de dias de vigência

### 8.1. Regra de 365 dias

Quando o ramo é parametrizado para ano de 365 dias, os dias de vigência são calculados pela diferença entre a data de vencimento e a data de efeito.

Exemplo apresentado:

```text
Efeito: 01 jan. 2023
Vencimento: 01 fev. 2023
Dias de vigência: 31
```

A transcrição registra também um exemplo de 1º de janeiro a 15 de fevereiro, que resulta em 45 dias sob a lógica de 365 dias.

---

### 8.2. Regra de 360 dias

Quando o ramo usa ano de 360 dias, TRON considera todos os meses com 30 dias.

A documentação visual confirma:

- janeiro é tratado como 30 dias;
- fevereiro é tratado como 30 dias;
- meses de 31 dias são tratados como 30 dias;
- anos bissextos não alteram esse comportamento.

Exemplo apresentado:

```text
1º de janeiro a 1º de fevereiro
= 1 mês
= 30 dias
```

Para 1º de janeiro a 15 de fevereiro, o instrutor explicou um resultado de 43,54 dias antes do ajuste e 44 dias após aplicação da regra de elevação à unidade seguinte quando há qualquer componente decimal.

> **Ponto importante:** a transcrição indica que não se trata de arredondamento convencional. Conforme a explicação, se há qualquer decimal, o resultado passa à unidade imediatamente superior. O exemplo dado foi que `43,0001` também se tornaria `44`.

---

### 8.3. Anos bissextos

A documentação e a explicação oral convergem em um ponto: anos bissextos não alteram o importe anual.

| Ano bissexto | Parâmetro | Resultado de dias do ano |
|---|---|---:|
| Sim | Ano de 360 dias | 360 |
| Sim | Ano de 365 dias | 365 |
| Não | Ano de 360 dias | 360 |
| Não | Ano de 365 dias | 365 |

O instrutor reforçou que, se uma tarifa define importe anual de 1.000, esse valor permanece 1.000 mesmo em um ano bissexto. Não seria elevado, por exemplo, para 1.005 apenas porque o ano possui 366 dias.

---

## 9. Coeficiente de constituição

### 9.1. Finalidade

O coeficiente de constituição determina qual fração do importe anual deve ser aplicada à vigência efetiva da apólice, risco ou suplemento.

A relação explicada foi:

```text
Coeficiente de constituição = dias de vigência / dias do ano
```

Esse coeficiente transforma um valor anual em um valor compatível com o período efetivamente coberto.

---

### 9.2. Exemplos apresentados para ano de 365 dias

| Vigência | Dias | Coeficiente aproximado | Leitura funcional |
|---|---:|---:|---|
| Ano completo | 365 | 1,00 | 100% do importe anual |
| 1º jan. a 1º out. | 273 | 0,74 | Aproximadamente 74% |
| 1º jan. a 1º jul. | 181 | 0,49 | Aproximadamente 49,58% |
| 1º jan. a 1º abr. | 90 | 0,24 | Aproximadamente 24% |

O instrutor enfatizou que, em um ano de 365 dias:

- três trimestres não resultam necessariamente em 75%;
- seis meses não resultam necessariamente em 50%;
- um trimestre não resulta necessariamente em 25%.

Isso decorre dos dias efetivos do calendário.

---

### 9.3. Exemplos apresentados para ano de 360 dias

Na lógica de 360 dias:

| Vigência | Dias | Coeficiente esperado |
|---|---:|---:|
| Ano completo | 360 | 1,00 |
| Nove meses | 270 | 0,75 |
| Seis meses | 180 | 0,50 |
| Três meses | 90 | 0,25 |

Nesse modelo, as frações mensais e trimestrais tornam-se mais regulares porque todos os meses possuem 30 dias.

---

## 10. Coeficiente de anulação

### 10.1. Aplicação

O coeficiente de anulação é utilizado em anulações de apólice e baixas de risco quando a definição do ramo indica que devem ser aplicadas regras de cancelamento.

O instrutor diferenciou dois grandes cenários:

| Tipo de cálculo original | Tratamento na anulação |
|---|---|
| Proporcional / pró-rata | Devolução proporcional |
| Por escala | Devolução configurável por regras de escala |

---

### 10.2. Anulação proporcional

Quando a apólice foi calculada de forma proporcional, o coeficiente de anulação foi apresentado como uma relação entre:

```text
dias do suplemento atual / dias do último suplemento vigente
```

A interpretação apresentada é que o percentual devolvido acompanha proporcionalmente a parcela de vigência restante.

---

### 10.3. Anulação por escala

Quando o cálculo de constituição não foi proporcional, o sistema pode usar uma tabela de escala.

Essa tabela possui, pelo menos no exemplo apresentado, percentuais de:

- constituição;
- anulação.

O instrutor esclareceu que esses percentuais são configuráveis e servem para permitir comportamentos comerciais diferentes da proporcionalidade real.

Exemplo simplificado apresentado:

| Dias de vigência | Percentual de constituição | Percentual de anulação |
|---:|---:|---:|
| 15 dias | 10% | 90% |
| 30 dias | 20% | 80% |

Assim, uma apólice de 30 dias poderia cobrar 20% do importe anual e, em determinada anulação, devolver 80%, sem que esses percentuais precisem coincidir com a proporção matemática de dias no ano.

---

## 11. Tipos de anulação por escala

A reunião apresentou três formas de anular valores quando a regra é por escala.

### 11.1. Direto sobre o percentual de anulação

Nesse modelo, o sistema utiliza diretamente o percentual de anulação correspondente ao período restante na tabela de escala.

Exemplo apresentado:

- apólice original: 2 de dezembro a 1º de janeiro;
- duração original: 30 dias;
- cancelamento: 17 de dezembro;
- período restante: 15 dias;
- percentual de anulação na tabela para 15 dias: 90%.

Nesse caso, aplica-se diretamente o percentual de 90%.

A explicação compara esse resultado com a proporcionalidade simples: se houvesse 15 dias restantes em uma vigência de 30 dias, uma proporcionalidade direta indicaria 50%; porém, pela tabela configurada, a devolução é 90%.

---

### 11.2. Proporcional sobre o percentual de constituição

Nesse modelo, calcula-se uma proporção entre o percentual correspondente ao suplemento de anulação e o percentual correspondente ao suplemento original de constituição.

Exemplo apresentado:

- constituição original de 30 dias: 20%;
- anulação com 15 dias restantes: 10%;
- proporção: `10% / 20% = 50%`.

O resultado apresentado é a devolução de 50%.

Quando a anulação ocorre na própria data de efeito, os períodos original e de anulação são equivalentes; portanto, a proporção chega a 100%.

---

### 11.3. Proporcional sobre o percentual de anulação

Nesse terceiro modelo, a lógica de proporção permanece semelhante, mas usa percentuais de anulação em vez de percentuais de constituição.

O instrutor exemplificou que, para uma anulação no meio do período, um percentual de anulação de 5 comparado a um valor original de 20 resultaria em 25%.

A fala contém trechos confusos na descrição das colunas e percentuais usados no denominador. Portanto, a conclusão segura é:

- este tipo usa percentuais extraídos da coluna de anulação;
- o resultado é uma proporção entre valores configurados;
- o comportamento pode produzir devoluções diferentes dos demais tipos.

A fórmula exata e a combinação de colunas devem ser confirmadas na documentação REEF antes de implementação ou parametrização operacional.

---

## 12. Modelo operacional e parametrização

### 12.1. Parametrizações citadas

| Elemento parametrizável | Efeito descrito |
|---|---|
| Dias do ano no ramo | Define se o cálculo usa 360 ou 365 dias. |
| Regras de cancelamento | Determina se são utilizadas regras proporcionais ou coeficiente de anulação. |
| Escala de percentuais | Define percentuais de constituição e anulação para diferentes durações. |
| Conceitos de desglose | Podem participar ou não de devoluções e ter comportamento proporcional ou não proporcional. |
| Tipo de suplemento/endosso | Pode influenciar qual regra é aplicada. |
| Lógica de negócio no ramo | Pode atender cenários não cobertos pela configuração padrão. |

---

### 12.2. Gastos administrativos e conceitos não proporcionais

Foi levantada uma questão sobre cancelamentos, impostos e gastos administrativos.

A resposta esclareceu que, por parametrização, determinados conceitos podem:

- não ser devolvidos em cancelamentos;
- ser tratados como custos assumidos pela companhia;
- possuir valor fixo independente da duração da apólice;
- não acompanhar a proporcionalidade do tempo.

O exemplo utilizado foi um gasto administrativo de 10 euros. Mesmo que a apólice tenha um ano ou apenas um mês de vigência, esse valor poderia continuar sendo 10 euros.

A reunião também indica que a regra pode ser aplicada por cobertura e até mesmo por conceito de desglose, sem depender exclusivamente da cobertura em que o conceito esteja inserido.

---

### 12.3. Cobertura de escalas

Foi esclarecido que, se uma tabela de escala for utilizada, ela precisa alcançar a maior duração possível das apólices que poderão utilizar aquela configuração.

Exemplos mencionados:

- uma apólice anual exigiria cobertura de até 365 dias;
- uma apólice de um ano e meio exigiria cobertura para esse período;
- uma apólice de três anos exigiria escala que alcance três anos;
- uma apólice de 72 meses pode exigir tratamento conforme a parametrização adotada.

---

### 12.4. Limite da configuração padrão

Um participante perguntou se seria possível ter várias escalas, por exemplo:

- uma escala para apólices de até um ano;
- outra escala para situações que superem um ano, como extensão de vigência.

A resposta foi que a configuração padrão (“de caixa”, conforme expressão do instrutor) não atenderia diretamente esse cenário. Contudo, seria possível incluir uma lógica de negócio no ramo para tratar esse tipo de necessidade.

> **Implicação analítica:** o sistema parece combinar configuração funcional padronizada com possibilidade de lógica adicional para cenários específicos. A transcrição não detalha como essa lógica é implementada tecnicamente.

---

## 13. Apólices multianuais

A reunião tratou de apólices multianuais em resposta a uma pergunta.

A resposta indica que o tratamento depende da parametrização do ramo:

- em uma apólice multianual “pura”, o sistema poderia gerar períodos de 365 dias para fins de entendimento;
- em um cenário não multiperíodo, poderia ser necessário alcançar toda a duração, como 72 meses;
- para uma apólice de três anos, a tabela precisaria chegar a três anos, caso a regra dependa dessa tabela.

A transcrição não fornece definição formal de “multianual pura”, “multiperíodo” nem critérios precisos para determinar quando cada comportamento é usado.

---

## 14. Convivência de apólices com regras distintas

Outra dúvida abordou a possibilidade de coexistirem, dentro do mesmo ramo ou produto, apólices anuais e apólices temporárias com formas diferentes de constituir ou anular valores.

A resposta foi afirmativa. O instrutor indicou que essa definição está relacionada ao suplemento/endosso e que o sistema diferencia o tipo de apólice, aplicando a regra correspondente.

A conclusão sustentada pela reunião é que TRON permite convivência de regras distintas conforme a tipologia da apólice e o suplemento aplicado.

---

## 15. Casos concretos apresentados

### 15.1. Caso ilustrativo: importe anual de 150,00

A documentação usou um exemplo com idade do segurado igual a 15 e importe anual de 150,00.

O objetivo era mostrar que o importe anual permanece igual apesar de diferenças na duração da vigência. A variação financeira efetiva ocorreria depois, mediante a aplicação do coeficiente adequado.

---

### 15.2. Caso ilustrativo: apólice de 30 dias com cálculo por escala

O instrutor apresentou uma apólice de 2 de dezembro a 1º de janeiro, com duração de 30 dias.

Em vez de usar a proporcionalidade simples, a escala definia:

- 20% de constituição para 30 dias;
- 80% de anulação para 30 dias;
- 10% de constituição para 15 dias;
- 90% de anulação para 15 dias.

Esse caso foi usado para demonstrar que a companhia pode reter ou devolver percentuais configurados, distintos da proporção temporal simples.

---

### 15.3. Paraguai: remessas de resseguro e cosseguro

Uma participante ou participante do Paraguai informou que já utiliza remessas de resseguro, mas não havia implementado remessas de cosseguro.

Ao tentar implementar o cenário de cosseguro, surgiram dúvidas de configuração e “idas e voltas”, segundo o relato.

**Direcionamento dado:** o instrutor registrou o tema e se comprometeu a organizar uma sessão específica sobre ele.

**O que não foi informado:** regras de negócio, módulos envolvidos, tabelas, arquitetura de integração, datas ou responsáveis pela futura sessão.

---

### 15.4. Chile: plano de pagamento e comportamento de recibos

Angélica, do Chile, manifestou interesse em uma sessão sobre plano de pagamento e comportamento dos recibos.

O instrutor confirmou que a próxima sessão de emissão já estava sendo preparada para tratar mudanças na forma de pagamento, incluindo a movimentação de tabelas e colunas associadas.

---

### 15.5. Equador: divergência por desconto informado

Foi relatado um cenário com cerca de 28 mil riscos de pessoas, nos quais um desconto de 15% é aplicado por risco.

A divergência percebida ocorre entre um valor carregado previamente e o valor recalculado posteriormente por TRON. O problema parece ocorrer especificamente quando há desconto.

O instrutor não confirmou a causa, mas indicou uma hipótese de configuração:

- a prima é manual;
- o importe de suplemento é informado;
- TRON calcula o importe anual;
- o conceito de desconto pode estar configurado como automático.

**Encaminhamento:** solicitar as tabelas de definição do cenário para análise posterior.

---

## 16. Perguntas e respostas relevantes

### 16.1. Como são tratados impostos e gastos administrativos em cancelamentos?

**Pergunta:** em um cancelamento, se houver gastos administrativos ou impostos, como esses valores são recalculados ou liquidados?

**Resposta:** existe cálculo de importe não consumido para determinar a parte a devolver ou cobrar. Porém, por parametrização, determinados conceitos — como gastos administrativos — podem não ser devolvidos. Também existem conceitos não proporcionais, que mantêm um valor fixo independentemente da vigência.

**O que isso esclarece:** a devolução não ocorre necessariamente sobre todos os componentes financeiros da apólice. Cada conceito pode possuir regras próprias.

---

### 16.2. Os percentuais da escala são fixos?

**Pergunta:** os percentuais utilizados nos exemplos seriam configurações definidas pela organização?

**Resposta:** sim. O instrutor afirmou que os valores eram exemplos e que é possível configurar os percentuais desejados para cada caso.

**O que isso esclarece:** as tabelas de constituição e anulação são mecanismos configuráveis de política comercial ou operacional, não percentuais universalmente fixos do sistema.

---

### 16.3. A tabela de escala precisa cobrir toda a duração possível da apólice?

**Pergunta:** em uma apólice anual, a tabela deve alcançar 365 dias? E o que acontece se houver extensão de vigência?

**Resposta:** a tabela deve alcançar o maior período possível que a apólice possa atingir. Em caso de um ano e meio ou três anos, a escala deveria alcançar essa duração.

**O que isso esclarece:** a modelagem da tabela precisa considerar exceções de duração e não apenas o caso padrão anual.

---

### 16.4. É possível utilizar várias escalas conforme a duração?

**Pergunta:** seria possível usar uma escala para apólices de até um ano e outra para durações superiores?

**Resposta:** o comportamento padrão não atenderia diretamente essa necessidade. A alternativa citada é implementar lógica de negócio no ramo.

**O que isso esclarece:** há limite no modelo padrão de parametrização; cenários mais segmentados podem exigir extensão de regra.

---

### 16.5. Como são tratadas apólices multianuais?

**Pergunta:** como se definem os dias de vigência em apólices multianuais?

**Resposta:** depende da parametrização do ramo. Uma apólice multianual pura pode ser tratada em períodos de 365 dias; em outras modalidades, pode ser necessário cobrir toda a duração, como 72 meses.

**O que isso esclarece:** não há uma única regra universal para multianualidade.

---

### 16.6. Podem coexistir apólices anuais e temporárias com regras diferentes?

**Pergunta:** um mesmo produto pode ter apólices anuais e temporárias com formas distintas de constituição ou anulação?

**Resposta:** sim. A definição está associada ao suplemento/endosso, e o sistema distingue os tipos de apólice para aplicar a regra correspondente.

**O que isso esclarece:** a coexistência de produtos ou modalidades com temporalidades diferentes é suportada pelo modelo funcional apresentado.

---

### 16.7. A configuração de 360 dias afeta tabela de vencimento?

**Pergunta:** a parametrização de 360 dias na emissão também é assumida automaticamente por uma tabela de vencimento identificada na transcrição como “P200230” ou termo semelhante?

**Resposta:** o instrutor não soube responder de imediato. Pediu que o participante registrasse a referência para retorno posterior.

**O que isso esclarece:** a integração entre a parametrização de dias do ano e essa tabela específica não foi confirmada.

---

### 16.8. Por que um desconto informado manualmente sofre diferença no cálculo?

**Pergunta:** em um cenário de desconto de 15%, por que o valor carregado previamente diverge do valor calculado por TRON?

**Resposta:** o instrutor investigou se a prima e o importe eram manuais ou automáticos. A hipótese levantada foi que o conceito de desconto poderia estar configurado como automático, o que faria o sistema recalcular o valor.

**O que isso esclarece:** mesmo quando valores são informados externamente, a configuração do conceito pode provocar recálculo pelo motor de TRON.

**Status:** pendente de análise das tabelas solicitadas.

---

## 17. Roadmap e próximos direcionamentos citados

| Tema | Direcionamento declarado |
|---|---|
| Mudança de plano/forma de pagamento | Próxima sessão de emissão em preparação. |
| Comportamento de recibos | Deve ser abordado junto com a sessão de plano de pagamento. |
| Movimentação de tabelas e colunas em suplementos | Será demonstrada de forma prática em sessão futura. |
| Remessas de cosseguro no Paraguai | Tema registrado para uma sessão específica. |
| Dúvida sobre tabela associada a “P200230” | Instrutor ficou de verificar e responder posteriormente. |
| Divergência de desconto no Equador | Instrutor solicitou tabelas de definição para investigação. |

Não foram apresentadas datas, responsáveis formais, cronograma fechado nem critérios de priorização dessas sessões.

---

## 18. Números e indicadores citados

| Indicador | Valor mencionado | Contexto |
|---|---:|---|
| Idade do segurado no exemplo | 15 | Variável de risco que poderia afetar `IMP_ANUAL`. |
| `IMP_ANUAL` no exemplo visual | 150,00 | Mesmo importe anual em diferentes durações de vigência. |
| Dias de ano possíveis | 360 ou 365 | Parametrização do ramo em TRON. |
| Duração de exemplo | 30 dias | Apólice usada para demonstrar cálculo por escala. |
| Constituição para 30 dias | 20% | Exemplo de escala configurada. |
| Anulação para 30 dias | 80% | Exemplo de escala configurada. |
| Constituição para 15 dias | 10% | Exemplo de escala configurada. |
| Anulação para 15 dias | 90% | Exemplo de escala configurada. |
| Desconto relatado no Equador | 15% | Aplicado a cada risco no caso relatado. |
| Riscos no caso do Equador | 28 mil | Negócio de pessoas citado pela participante. |
| Exemplo de gasto administrativo | 10 euros | Exemplo hipotético de conceito não proporcional. |
| Exemplo de apólice multianual | 72 meses | Duração citada na discussão. |

> Os números acima são declarações e exemplos apresentados durante a reunião; não constituem indicadores auditados ou regras universais fora do contexto descrito.

---

## 19. Limitações reconhecidas

### 19.1. Limitações funcionais ou de configuração

- A configuração padrão não atenderia diretamente a coexistência de múltiplas escalas condicionadas a faixas de duração; seria necessária lógica de negócio adicional no ramo.
- Uma tabela de escala precisa prever a duração máxima possível. Caso não cubra uma extensão de vigência ou uma apólice multianual, pode não ser suficiente para o cenário.
- O comportamento de apólices multianuais depende de parametrização específica do ramo.
- A relação entre a configuração de 360 dias e a tabela mencionada como “P200230” não foi esclarecida na sessão.
- O problema de recálculo de descontos no Equador não foi resolvido durante a reunião.

### 19.2. Limitações da documentação apresentada

- A documentação exibida confirmou a fórmula de `IMP_NO_CONSUMIDO` para riscos/apólices que permanecem vigentes, mas não exibiu integralmente, nas evidências disponíveis, todas as fórmulas discutidas oralmente.
- A transcrição não permite reconstruir com segurança a fórmula completa de anulação quando o risco ou apólice deixa de vigorar.
- Alguns termos técnicos, nomes de tabelas e números foram prejudicados pelo reconhecimento automático de voz.

---

## 20. Riscos e desafios

### 20.1. Riscos explicitamente percebidos na reunião

| Risco ou desafio | Evidência na reunião |
|---|---|
| Parametrização inadequada de escalas | A tabela precisa alcançar a maior vigência possível da apólice. |
| Cálculo indevido em extensões de vigência | Extensões podem superar a faixa inicialmente modelada. |
| Divergência entre valores informados e calculados | Caso de desconto no Equador. |
| Aplicação incorreta de conceitos em cancelamentos | Alguns conceitos devem ou não devem ser devolvidos conforme a configuração. |
| Interpretação errada de percentuais | Proporcionalidade real e escala podem gerar valores muito diferentes. |
| Incerteza operacional sobre integrações ou tabelas | Dúvida pendente sobre a tabela referida como “P200230”. |

### 20.2. Desafios derivados do contexto — análise

> **Análise, não afirmação literal dos participantes:** o modelo apresentado possui alto grau de flexibilidade, mas essa flexibilidade aumenta a dependência de configuração correta. Regras de dias, escalas, conceitos, endossos e comportamento de cancelamento precisam ser coerentes entre si para evitar divergências de cálculo.

> **Análise, não afirmação literal dos participantes:** cenários com importes manuais, descontos pré-calculados e processamento por arquivo exigem atenção especial, pois podem coexistir com componentes automáticos de cálculo no TRON.

> **Análise, não afirmação literal dos participantes:** a necessidade de sessões adicionais sobre cosseguro, plano de pagamento e recibos indica que os cálculos de emissão estão conectados a processos operacionais mais amplos, cuja documentação ainda estava sendo desenvolvida ou aprofundada.

---

## 21. Transformações e implicações analíticas

### 21.1. De cálculo único para cálculo por camadas

Uma leitura possível do treinamento é que o sistema opera com camadas de cálculo, em vez de apenas armazenar um prêmio final:

```text
Informações de risco/apólice
↓
Importe anual de referência
↓
Coeficiente conforme vigência
↓
Importe não consumido
↓
Importe do suplemento
↓
Recibos e acumulado anual
```

Essa separação permite que uma alteração contratual seja tratada com base em valores anteriores, vigência restante e regras específicas de cancelamento.

---

### 21.2. De proporcionalidade automática para política configurável

A apresentação deixa claro que TRON suporta tanto:

```text
vigência proporcional
↓
devolução proporcional
```

quanto:

```text
vigência definida em escala
↓
percentuais comerciais configurados
↓
devolução não necessariamente proporcional
```

Isso sugere uma capacidade de acomodar produtos com políticas comerciais ou técnicas distintas, incluindo retenção de valores, custos fixos e regras de devolução específicas.

---

### 21.3. De treinamento genérico para capacitação orientada a demandas

O instrutor afirmou que as sessões podem ser construídas a partir das dúvidas dos participantes. Os temas de plano de pagamento, recibos, cosseguro e divergências de desconto surgiram diretamente da interação.

A implicação é que a documentação e a capacitação estavam sendo tratadas como processos evolutivos, ajustados a necessidades operacionais reais dos países ou equipes participantes.

---

## 22. O que a reunião não permite concluir

A reunião não apresenta detalhes suficientes para determinar com segurança:

- arquitetura técnica de TRON;
- banco de dados utilizado;
- linguagem de programação;
- infraestrutura de nuvem ou on-premises;
- mecanismos de integração entre TRON e sistemas externos;
- uso de APIs, eventos, mensageria ou arquivos além do caso mencionado de arquivo plano;
- modelo de IAM, autenticação ou autorização;
- política de segurança;
- estratégia de logs, auditoria e observabilidade;
- processos de deploy, CI/CD, releases ou hotfixes;
- modelo de suporte, SLA ou gestão de incidentes;
- estrutura completa das tabelas citadas, incluindo `P200770`, `D270` e a referência transcrita como “P200230”;
- fórmula formal e completa usada em todos os cenários de anulação;
- critérios formais para classificar uma apólice como multianual pura ou multiperíodo;
- regras completas de remessas de resseguro e cosseguro;
- datas ou responsáveis pelas sessões futuras mencionadas;
- impacto contábil, fiscal ou regulatório das regras de devolução;
- se os exemplos de percentuais representam prática de produção ou apenas cenário didático.

---

## 23. Conclusões

A reunião consolidou o entendimento de que os cálculos financeiros em TRON dependem de uma combinação de dados de risco, vigência, configuração de ramo, tipo de suplemento e regras dos conceitos de desglose.

Os principais pontos estabelecidos foram:

1. `IMP_ANUAL` é uma referência anual e não gera diretamente recibos.  
2. `IMP_SPTO` é o valor financeiro efetivo do suplemento e participa da geração de recibos.  
3. `IMP_NO_CONSUMIDO` é relevante para movimentos dentro da vigência e possui exceções, como renovação, emissão, inclusão de risco e regularização.  
4. O cálculo muda conforme o risco ou apólice permaneça vigente ou seja anulado.  
5. A configuração de 360 ou 365 dias altera dias de vigência, coeficientes e valores derivados.  
6. Anos bissextos não alteram o importe anual.  
7. O sistema pode trabalhar com proporcionalidade ou com escalas configuráveis de constituição e anulação.  
8. Conceitos como gastos administrativos podem ser configurados para não serem devolvidos e podem ser não proporcionais.  
9. Cenários fora da configuração padrão podem exigir lógica de negócio no ramo.  
10. Permanecem pendentes esclarecimentos sobre uma tabela de vencimento citada, sobre a divergência de desconto reportada no Equador e sobre a futura sessão de cosseguro solicitada pelo Paraguai.
