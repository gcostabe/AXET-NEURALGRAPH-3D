# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.core - Emisión - DEFINICIÓN ramo (1).mp4`
**Data de processamento:** 24/09/2026 15:38:33
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Análise estruturada — Treinamento funcional do Reef.core: definição de ramo e comportamento de emissão

## 1. Síntese executiva

A sessão foi um treinamento funcional sobre a **definição de ramo** no sistema registrado na transcrição como **“RIF”, “Rift Core” ou “Reef.core”**. As evidências visuais mostram a documentação do produto como **Reef.core**, dentro de um portal/marketplace MAPFRE; portanto, este documento utiliza esse nome, preservando a ressalva de que a fala automática alterna entre formas possivelmente imprecisas.

O foco principal foi explicar como as propriedades configuradas em um ramo determinam o comportamento da emissão de seguros: estruturação de riscos, períodos de vigência, cálculo e registro de prêmios, orçamento, controles técnicos, anexos, cláusulas, numeração de apólices, suplementos, planos de pagamento e modalidades de cobertura.

A mensagem central é que o ramo não representa apenas uma classificação comercial do seguro. Ele é uma camada de parametrização que estabelece regras e capacidades que serão aplicadas às apólices daquele ramo durante a emissão. A maior parte das propriedades apresentadas não executa a lógica completa por si só: elas habilitam comportamentos cuja implementação detalhada depende de definições posteriores, como lógicas de negócio, atributos, controles técnicos, coberturas, cláusulas e modalidades.

A formação foi deliberadamente interrompida antes de concluir o tema. O instrutor informou que o conteúdo é extenso, continuará no mês seguinte e provavelmente exigirá várias sessões.

---

## 2. Escopo, fontes e critérios de rastreabilidade

### 2.1 Fontes analisadas

Esta análise foi construída exclusivamente a partir de:

- transcrição de áudio produzida por Whisper;
- evidências visuais extraídas de slides e telas do vídeo;
- timestamps aproximados dos frames fornecidos.

Não foram utilizados conhecimentos externos sobre o Reef.core, MAPFRE, seguros ou plataformas correlatas para preencher lacunas.

### 2.2 Terminologia e incertezas de transcrição

A fala automática registra repetidamente os termos “RIF”, “Rift Core” e, em um trecho, “RIFCORE ou Tron”. Já as evidências visuais mostram páginas intituladas **Reef.core**, incluindo documentação funcional e técnica.

Assim, a interpretação contextual mais segura é:

> A transcrição parece se referir ao sistema exibido visualmente como **Reef.core**. Não é possível determinar apenas pelo material se “RIF”, “Rift” e “Tron” são erros de reconhecimento de voz, nomes históricos, nomes internos ou componentes distintos.

Quando a transcrição usa “emisión” e “misión”, o contexto indica que o assunto é a **emissão de apólices, orçamentos e movimentos**, e não “missão” em sentido organizacional.

### 2.3 Natureza do encontro

O encontro tem formato de treinamento funcional, com:

- apresentação de documentação no portal;
- explicação progressiva das propriedades de configuração;
- exemplos de apólices e coberturas;
- perguntas dos participantes para validação conceitual;
- sinalização de tópicos que serão aprofundados em sessões futuras.

Não há evidência de que a sessão tenha sido uma reunião deliberativa de arquitetura, governança corporativa, priorização de roadmap ou aprovação de mudanças produtivas.

---

## 3. Contexto e antecedentes

O treinamento dá continuidade a uma formação anterior sobre definições de emissão. O instrutor relembra que essas definições são organizadas em níveis e categorias:

1. **Definições comuns**  
   São definições de outros módulos que influenciam a definição ou o processo de emissão.

2. **Definições em nível de ramo**  
   Elementos que não são necessariamente o próprio ramo, mas influenciam a configuração e o comportamento da emissão.

3. **Definições específicas do módulo de emissão**  
   Configurações diretamente ligadas ao funcionamento da emissão.

4. **Definições em nível de apólice**  
   Configurações que afetam o comportamento das apólices de maneira ampla.

5. **Definições por tipo de negócio**  
   No treinamento, o instrutor entra no contexto de automóveis, mas reforça que boa parte dos conceitos é reutilizável para outros negócios.

A documentação visual apresenta uma área de capacitação funcional do Reef.core, com conteúdos em espanhol e inglês, além de treinamento técnico e arquitetura. O menu do portal também evidencia áreas como soluções, arquiteturas, APIs, eventos, componentes, cloud, documentação e ajuda.

> **Evidência visual:** portal Marketplace/MAPFRE e documentação Reef.core, aproximadamente em `10:33` e `14:03`.

---

## 4. Conceito central: o que é um ramo

O ramo é apresentado como aquilo que a companhia de seguros comercializa e disponibiliza ao cliente para contratação de um seguro.

Na configuração do sistema, cada ramo possui ao menos:

- uma **chave**;
- um **nome**;
- uma **descrição**;
- uma **abreviatura**, que pode ser exibida em algumas telas.

Foram citados exemplos de identificação:

| Chave de ramo | Exemplo de nome mencionado |
|---:|---|
| 300 | Automóveis |
| 210 | Seguro de hogar / seguro residencial |
| 100 | Vida |

As evidências visuais registram que o sistema permite definir e codificar, por companhia, até **999 chaves de ramos** diferentes, cada uma podendo possuir descrição e abreviatura próprias.

> **Evidência visual — `14:03`:** “El sistema permite definir y codificar por cada compañía hasta 999 claves de ramos diferentes…”

### 4.1 Associação à estrutura de produtos

Cada ramo deve estar obrigatoriamente associado à estrutura de produtos da organização:

```text
Estrutura de produto
↓
Setor
↓
Subsetor
↓
Ramo
```

A formação não detalha como setores e subsetores são criados ou governados. Apenas estabelece que o ramo deve pertencer a um setor e a um subsetor já definidos.

---

## 5. Modelo conceitual da definição de ramo

A definição de ramo é apresentada como a base que determina:

- como as apólices daquele ramo irão se comportar;
- quais dados e definições complementares poderão ser necessários;
- quais capacidades estarão disponíveis durante a emissão;
- como riscos, períodos, controles e documentos serão tratados.

Uma representação analítica do modelo exposto é:

```text
Ramo
├── Identificação e classificação comercial
│   ├── Chave
│   ├── Nome
│   ├── Descrição
│   └── Setor / subsetor
│
├── Propriedades operacionais
│   ├── Multi-risco
│   ├── Identificação do objeto segurado
│   ├── Multi-períodos
│   ├── Registro de hora e minuto
│   ├── Renovação e vencimento
│   ├── Cláusulas e anexos
│   ├── Orçamentos
│   ├── Controles técnicos
│   ├── Suspensão de emissão
│   ├── Numeração de apólice
│   ├── Suplementos
│   └── Planos de pagamento
│
└── Formação de modalidades
    ├── Sem modalidade
    ├── Modalidade explícita
    └── Modalidade implícita
```

Este desenho é uma consolidação analítica da explicação oral. Não há indicação de que esse diagrama tenha sido mostrado literalmente na sessão.

---

## 6. Propriedades gerais e operacionais do ramo

A documentação visual classifica algumas dessas configurações como **“propriedades operativas comuns”**, isto é, propriedades aplicáveis a todos os ramos, independentemente do tratamento específico de emissão.

> **Evidência visual — `14:03`:** as propriedades operacionais comuns são apresentadas como aplicáveis a todos os ramos definidos no sistema.

### 6.1 Multi-risco

A propriedade de multi-risco define se uma mesma apólice pode conter mais de um objeto segurado.

#### Quando o multi-risco está habilitado

Uma única apólice pode conter diversos riscos. No exemplo usado pelo instrutor:

- um cliente possui três carros;
- cada carro é tratado como um risco;
- os três riscos podem ser incluídos na mesma apólice, desde que o ramo permita multi-risco.

#### Quando o multi-risco está desabilitado

Cada apólice pode conter somente um risco. No mesmo exemplo:

- para segurar três carros, o cliente precisaria ter três apólices distintas.

#### Implicação funcional

A propriedade não define quais dados formam o risco, nem quais coberturas podem ser contratadas. Ela define apenas se o ramo admite múltiplos objetos segurados dentro da mesma apólice.

> **Evidência visual — `14:03`:** multi-risco indica que o ramo permite contratar mais de um objeto segurado na apólice.

---

### 6.2 Identificador do objeto segurado

Os riscos são registrados internamente com uma numeração sequencial, como “1”, “2” e “3”. Essa numeração, isoladamente, não permite entender facilmente o que está sendo segurado.

Para resolver isso, o ramo pode definir uma lógica de negócio responsável por gerar uma identificação descritiva e unívoca do objeto segurado.

#### Finalidade

Essa identificação permite que os usuários reconheçam rapidamente o risco em diferentes módulos do sistema, sem depender apenas do identificador numérico interno.

#### Como funciona

1. O ramo possui atributos que armazenam dados do risco.
2. A companhia escolhe quais atributos serão usados para identificá-lo.
3. Uma lógica de negócio recupera esses dados.
4. A lógica monta um nome ou descrição do risco.
5. Esse resultado é gravado como identificação do objeto segurado nas tabelas correspondentes.

#### Exemplos citados para automóveis

A documentação apresenta combinações possíveis como:

```text
[Marca] — [Modelo] — [Matrícula] — [Bastidor]
```

ou:

```text
[Marca] — [Modelo] — [Submodelo] — [Ano de fabricação]
```

Exemplos visuais:

```text
Toyota — Corolla — LFD 6357 — WDDXXDPOI92322FUI
Volkswagen — Golf — Gti 16v — 2019
```

#### Exemplos citados para vida

Para apólices do ramo de vida, o identificador pode ser baseado no segurado:

```text
[Apellido1] [Apellido2], [Nombre del Asegurado]
```

ou:

```text
[Certificado] - [Apellido1] [Apellido2], [Nombre del Asegurado]
```

Exemplos visuais:

```text
Pérez Martínez, Juan Gabriel
234/2020 - Pérez Martínez, Juan Gabriel
```

> **Evidência visual — `17:32`:** exemplos de identificadores para automóveis e vida.

#### Decisão da companhia

O instrutor destaca que a companhia decide como identificar o risco, desde que a identificação seja clara e única.

Isso não significa que a identificação seja opcional: o que é definido pela companhia é a composição da identificação.

#### Pergunta e resposta relevante

**Pergunta:** A lógica da definição grava a descrição/nome do risco nas tabelas correspondentes após a emissão da apólice?

**Resposta:** Sim. Após os atributos necessários serem preenchidos durante a emissão, a lógica é executada e o resultado é gravado como o nome do risco nas tabelas onde o risco é registrado.

**O que isso esclarece:**  
A identificação do risco não é apenas um texto apresentado em tela. Ela parece tornar-se um dado persistido associado ao risco emitido.

---

### 6.3 Multi-períodos

A propriedade de multi-períodos determina como o sistema trata apólices com vigência superior a um ano.

O Reef.core pode emitir apólices:

- com duração inferior a um ano;
- com duração de um ano;
- com duração superior a um ano.

Para apólices plurianuais, a companhia pode escolher entre segmentar a vigência em períodos anuais ou tratá-la como um único período.

#### Multi-períodos: habilitado

Quando habilitado:

- cada anualidade é tratada como um período;
- uma apólice possui tantos períodos quanto anualidades aplicáveis;
- as informações são detalhadas por período;
- coberturas, prêmios e cálculos são registrados separadamente para cada período.

O instrutor compara esse comportamento a renovações internas, embora ressalte que a apólice é emitida e calculada de uma vez.

#### Multi-períodos: desabilitado

Quando desabilitado:

- toda a vigência da apólice é tratada como um único período;
- informações de todas as anualidades ficam agrupadas;
- existe apenas um período operacional, mesmo que a vigência seja maior que um ano.

#### Exemplo: apólice anual

| Vigência | Períodos | Prêmio total |
|---|---:|---:|
| 01/01/2020 a 01/01/2021 | 1 | 800 euros |

Nesse caso, a configuração de multi-períodos não produz diferença prática porque a apólice já possui duração anual.

#### Exemplo: apólice plurianual com multi-períodos habilitado

| Período | Vigência | Prêmio do período |
|---|---|---:|
| 1 | 01/01/2020 a 01/01/2021 | 800 euros |
| 2 | 01/01/2021 a 01/04/2021 | 200 euros |
| **Total** | 01/01/2020 a 01/04/2021 | **1.000 euros** |

> **Evidência visual — `24:31`:** cenário II, com dois períodos e prêmio total de 1.000 euros.

#### Exemplo: apólice plurianual com multi-períodos desabilitado

| Período | Vigência | Prêmio do período |
|---|---|---:|
| 1 | 01/01/2020 a 01/04/2021 | 1.000 euros |
| **Total** | 01/01/2020 a 01/04/2021 | **1.000 euros** |

> **Evidência visual — `24:31` e `28:00`:** cenário III, com toda a vigência agrupada em um período único.

#### Perguntas e respostas relevantes

**Pergunta:** Mesmo em uma apólice plurianual, a data de início e a data de vencimento continuam refletindo toda a vigência?

**Resposta:** Sim. As datas de efeito e vencimento da apólice correspondem à vigência total. A diferença aparece no registro de coberturas, prêmios e demais informações por período.

**Pergunta:** No cenário de período único, apesar de a apólice durar mais de um ano, o sistema mantém um único período?

**Resposta:** Sim. A vigência continua sendo plurianual, mas internamente os dados ficam em um só período. O cálculo considera a temporalidade aplicável.

**O que essas respostas esclarecem:**  
A propriedade não altera a vigência contratual da apólice. Ela altera a granularidade interna usada para registrar e calcular informações de cobertura e prêmio.

---

### 6.4 Registrar hora e minutos

Essa propriedade exige a captura de hora e minuto na data de efeito da apólice ou do suplemento.

> **Evidência visual — `21:02` e `28:00`:** a ativação exige obrigatoriamente a captura de hora e minutos na data de efeito.

#### Problema tratado

Sem a hora de emissão, uma apólice emitida em determinado dia poderia aparentar cobrir eventos ocorridos antes da emissão, desde que tenham ocorrido na mesma data.

#### Exemplo explicado

1. Um sinistro ocorre.
2. No mesmo dia, o interessado solicita uma apólice.
3. Se somente a data for considerada, o sinistro poderia parecer coberto.
4. Com hora e minuto de emissão registrados, é possível verificar se o sinistro aconteceu antes ou depois da emissão.

#### Limitação reconhecida

O instrutor afirma que essa propriedade é opcional. A companhia decide se deseja ativá-la.

#### Implicação funcional

A propriedade é apresentada como mecanismo de precisão temporal e controle de cobertura, especialmente para distinguir eventos ocorridos no mesmo dia.

---

### 6.5 Respeitar dia de vencimento

Essa propriedade é aplicável a apólices temporárias que se renovam pelo mesmo período de vigência vigente.

> **Evidência visual — `28:00`:** a propriedade é usada na renovação de apólices temporárias que renovam pela mesma temporalidade do período vigente.

#### Cenário tratado

Uma apólice de seis meses, por exemplo, pode ser renovada por mais seis meses. Em certos cálculos de datas, o dia de vencimento da nova vigência pode não coincidir com o dia de vencimento do período anterior.

#### Comportamento quando habilitada

Ao calcular o vencimento da nova vigência, o sistema mantém o mesmo dia de vencimento do período anterior.

#### Motivações citadas

O instrutor menciona que diferenças podem ocorrer por regras internas de cálculo ou situações como anos bissextos.

#### Limitação

A propriedade faz sentido apenas em renovações que preservam a temporalidade original. O treinamento não detalha como o sistema se comporta em outros tipos de renovação.

---

### 6.6 Cláusulas

As cláusulas são elementos que individualizam ou modificam o contrato de seguro, podendo limitar ou complementar as condições gerais ou particulares aplicáveis à apólice, aos objetos segurados ou às coberturas.

> **Evidência visual — `28:00`:** as cláusulas podem modificar e individualizar o contrato, limitando o condicionado geral ou particular.

#### Estrutura conceitual apresentada

Há um clausulado geral que pode descrever, de forma ampla:

- o que o seguro cobre;
- o que não cobre;
- restrições;
- condições gerais da contratação.

Além disso, podem existir cláusulas específicas para determinadas condições da apólice.

#### Exemplos de uso

Uma cláusula pode ser incluída quando:

- determinada cobertura é contratada;
- determinado tipo de risco está presente;
- alguma característica específica da apólice exige texto adicional.

#### Associação de cláusulas

A associação pode ocorrer:

- automaticamente;
- manualmente durante a emissão.

O ramo apenas informa se suas apólices podem possuir cláusulas. A definição completa das cláusulas será tratada em outra área de configuração, segundo o instrutor.

#### Limitação reconhecida

A sessão não detalha:

- a estrutura das cláusulas;
- o mecanismo de associação automática;
- as regras de edição de texto;
- como são configuradas variáveis nas cláusulas;
- o fluxo de aprovação ou governança de cláusulas.

---

### 6.7 Anexos

Os anexos são textos livres que podem ser incluídos no processo de emissão.

> **Evidência visual — `28:00`:** a propriedade determina que podem ser incluídos textos livres nas apólices.

#### Natureza dos anexos

Diferentemente de cláusulas previamente estruturadas, os anexos são apresentados como uma “folha em branco” na qual o emissor pode redigir conteúdo.

O instrutor alerta que anexos podem modificar condições do seguro e podem ser enviados ao cliente como parte do contrato. Portanto, não devem ser tratados apenas como comunicação interna.

#### Níveis possíveis

Os anexos podem existir:

- no nível da apólice;
- no nível de cada objeto segurado ou risco.

---

### 6.8 Anexos por objeto segurado

Quando um ramo permite anexos, esta propriedade define se eles também podem ser associados individualmente a cada risco da apólice.

> **Evidência visual — `28:00`:** a propriedade indica se os anexos podem ser incluídos por cada risco da apólice.

#### Implicação

Uma apólice multi-risco pode possuir:

- texto geral aplicável à apólice inteira;
- textos específicos para cada risco individual.

A formação não esclarece se há limites de quantidade, tamanho, aprovação ou formatos para esses anexos.

---

### 6.9 Transferir anexos do orçamento

Essa propriedade controla se anexos incluídos em um orçamento são copiados ao convertê-lo em:

- outro orçamento;
- uma apólice definitiva.

> **Evidência visual — `31:30`:** os anexos podem ser copiados ao novo orçamento ou à nova apólice, podendo ser modificados.

#### Comportamento explicado

Quando habilitada:

1. um orçamento é emitido com anexos;
2. o orçamento é convertido em apólice ou usado como base para outro orçamento;
3. os anexos são trazidos para o novo documento;
4. eles podem ser modificados ou excluídos antes da finalização.

O instrutor enfatiza que a cópia não obriga a gravação definitiva do texto: ela oferece uma base para reutilização e adaptação.

---

### 6.10 Anexos em vários idiomas

O instrutor introduz a propriedade relacionada a anexos em múltiplos idiomas. A explicação oral informa que:

- textos do sistema normalmente possuem tratamento por idioma;
- um anexo, por ser redigido no momento da emissão, é escrito inicialmente no idioma utilizado na comunicação com o cliente;
- se uma apólice precisar ser impressa em mais de um idioma, o anexo deverá existir em cada idioma necessário;
- o sistema não traduz automaticamente o texto do anexo.

#### Consequência prática

Para emissão ou impressão em espanhol e inglês, por exemplo:

```text
Anexo em espanhol
+
Anexo correspondente em inglês
```

O instrutor afirma que existirá uma área de emissão para informar o texto por idioma.

#### Limitação reconhecida

Não há indicação de tradução automática, serviço de tradução, controle de consistência entre versões ou mecanismo de aprovação linguística.

---

### 6.11 Anexos previamente definidos

Embora anexos sejam descritos como textos livres, o sistema também pode disponibilizar textos previamente definidos, funcionando como modelos ou plantillas.

#### Finalidade

Evitar que emissores redijam repetidamente textos semelhantes em situações recorrentes.

#### Comportamento

1. O anexo pode ser pré-configurado.
2. Ele aparece durante a emissão.
3. O emissor pode utilizá-lo como base.
4. O texto pode ser mantido ou modificado conforme a apólice.

#### Interpretação analítica

A combinação de anexos livres, modelos e versões por idioma indica uma tentativa de equilibrar flexibilidade operacional com reutilização de conteúdo. No entanto, a sessão não descreve mecanismos formais de governança, revisão jurídica ou controle de versões desses textos.

---

## 7. Orçamentos e conversão em apólices

### 7.1 Orçamento obrigatório antes da emissão

O sistema permite emitir uma apólice diretamente, sem que exista orçamento prévio. Contudo, o ramo pode ser configurado para exigir orçamento antes da emissão da apólice.

#### Quando a propriedade está habilitada

O fluxo obrigatório passa a ser:

```text
Orçamento
↓
Conversão
↓
Apólice
```

Não é permitido emitir uma apólice diretamente do zero.

#### Motivações citadas

A exigência pode decorrer de:

- legalidade;
- características do produto;
- decisão da companhia.

A formação não especifica quais legislações ou produtos exigem esse comportamento.

---

### 7.2 Reutilização de orçamento

O orçamento também pode servir como modelo ou base para novas emissões.

O instrutor cita o caso em que as apólices de um ramo possuem características semelhantes. Em vez de digitar todos os dados novamente, um orçamento pode ser usado como referência para emitir:

- outras apólices;
- outros orçamentos.

### 7.3 Reutilizar orçamento: uma ou várias emissões

A propriedade relacionada à reutilização define se um mesmo orçamento pode originar múltiplos documentos.

#### Quando a reutilização é permitida

Um orçamento pode gerar:

- vários outros orçamentos;
- várias apólices.

#### Quando a reutilização não é permitida

Cada orçamento pode originar apenas uma apólice.

---

## 8. Controles técnicos e autorização de orçamento

### 8.1 O que são controles técnicos

Controles técnicos são validações ou regras definidas no produto. Elas analisam os dados inseridos durante a emissão para decidir se a emissão:

- pode prosseguir normalmente;
- deve ser impedida;
- pode ocorrer somente após autorização.

#### Exemplo citado

A companhia pode decidir que não deseja segurar automóveis de luxo. Nesse caso, um controle técnico pode impedir a emissão quando o veículo for identificado como luxuoso.

Alternativamente, a companhia pode permitir a emissão somente após uma pessoa autorizada avaliar e aprovar o risco.

### 8.2 Efeitos possíveis de um controle técnico

```text
Dados da emissão
↓
Execução de controle técnico
├── Sem impedimento → emissão prossegue
├── Impedimento absoluto → emissão não pode prosseguir
└── Pendência de autorização → documento fica retido
```

### 8.3 Autorização de orçamento obrigatória

A propriedade discutida determina se um orçamento com controles técnicos pendentes pode ou não ser convertido em apólice.

#### Quando habilitada

Um orçamento retido por controle técnico não pode ser convertido em apólice até que os controles pendentes sejam autorizados.

#### Quando desabilitada

Mesmo que o orçamento esteja pendente de autorização, ele pode ser convertido em apólice. A apólice resultante será submetida às mesmas condições e poderá permanecer retida até que haja autorização.

### 8.4 Perguntas e respostas relevantes

**Pergunta:** Os controles técnicos são gerados por causa dessa propriedade?

**Resposta:** Não. Os controles técnicos são executados independentemente dela.

**Pergunta:** Então qual é a função da propriedade?

**Resposta:** Ela só se aplica quando o orçamento ficou retido por um controle técnico. Nessa situação, define se o orçamento pode ou não ser usado para emitir uma apólice antes da autorização.

**O que isso esclarece:**  
Há separação entre dois conceitos:

| Conceito | Responsabilidade |
|---|---|
| Controles técnicos | Avaliar regras e gerar bloqueio, rejeição ou pendência |
| Autorização de orçamento obrigatória | Controlar a possibilidade de converter um orçamento pendente em apólice |

---

## 9. Suspensão e retomada da emissão

### 9.1 Conceito de suspensão

Durante a emissão de uma apólice, orçamento, suplemento ou outro movimento, o usuário pode interromper o processo antes da conclusão.

Quando isso ocorre:

- as informações já preenchidas são gravadas provisoriamente;
- a emissão fica suspensa;
- o processo pode ser retomado posteriormente;
- o usuário não precisa inserir todos os dados novamente.

### 9.2 Retomada pelo mesmo usuário ou por qualquer usuário

A propriedade apresentada determina se outro usuário pode retomar uma emissão suspensa por alguém diferente.

#### Quando habilitada

Qualquer usuário autorizado pode recuperar e concluir o movimento suspenso.

#### Quando desabilitada

Somente o usuário que suspendeu a emissão pode retomá-la.

#### Exemplos citados

- o emissor precisa interromper uma apólice com vários riscos;
- outra pessoa deve terminar a emissão;
- o emissor original não retorna, por exemplo por afastamento;
- a apólice precisa ser concluída por outro usuário.

### 9.3 Suspensão no contexto de controles técnicos

O instrutor também explica que uma emissão retida por controle técnico pode ser devolvida para alteração.

Exemplo:

1. uma soma segurada é considerada muito alta;
2. o responsável pelo controle técnico solicita ajuste;
3. o processo é suspenso ou devolvido à emissão;
4. os dados são modificados;
5. os controles técnicos são executados novamente.

#### Ressalva importante

A alteração não elimina automaticamente os controles. Depois de retomar e modificar a emissão, as validações são reexecutadas. Caso a condição de risco permaneça, a apólice pode continuar retida.

---

## 10. Execução de controles técnicos na anulação de suplemento

### 10.1 Comportamento padrão apresentado

A anulação de suplemento, em princípio, é descrita como uma operação em que o emissor não interage inserindo novos dados. O sistema toma o suplemento, realiza a reversão necessária e o marca como anulado.

Segundo o instrutor, tradicionalmente os controles técnicos não eram executados em movimentos sem interação do emissor.

### 10.2 Comportamento configurável

Por solicitação de algumas companhias, tornou-se possível configurar o ramo para executar controles técnicos também durante a anulação de suplementos.

#### Consequência

Uma anulação de suplemento pode:

- ficar retida;
- exigir autorização;
- só se tornar definitiva após aprovação do controle técnico.

#### Exemplo hipotético citado pelo instrutor

Foram mencionados, de maneira ilustrativa e não como regra do produto:

- pendência de pagamento;
- existência de sinistro;
- outras validações que a companhia deseje aplicar.

### 10.3 Pergunta e resposta relevante

**Pergunta:** O comportamento padrão é não validar anulações de suplemento?

**Resposta:** Sim. A capacidade foi incluída porque, historicamente, controles técnicos não eram executados em movimentos nos quais o emissor não interagia.

**O que isso esclarece:**  
A execução de controles técnicos em anulação de suplemento parece ser uma extensão configurável, introduzida para atender necessidades específicas de algumas companhias.

---

## 11. Mudança do número de apólice

### 11.1 Numeração padrão

O sistema trabalha com um número de apólice próprio. Durante o processo de emissão, esse número é utilizado como identificador da apólice no fluxo interno.

### 11.2 Problema regulatório ou operacional citado

Algumas companhias ou países precisam que os números definitivos de apólice sejam consecutivos, sem saltos.

O instrutor explica que a numeração interna pode gerar lacunas quando:

1. a apólice 1 é emitida;
2. a apólice 2 recebe numeração, mas fica retida em controle técnico;
3. a apólice 3 é emitida;
4. a apólice 2 é rejeitada;
5. o fluxo interno pode produzir sequência não linear ou reutilização da numeração interna.

Para cenários em que a numeração definitiva deve obedecer a regras específicas, o ramo pode habilitar alteração do número da apólice.

### 11.3 Momento da mudança

A troca para a numeração definitiva ocorre quando a apólice se torna definitiva:

- imediatamente, se não houver controles técnicos pendentes;
- após aprovação, se houver retenção por controles técnicos.

Enquanto a apólice não é definitiva, continua utilizando a numeração interna.

### 11.4 Dependência de lógica

A propriedade apenas habilita a possibilidade de mudança. Quando ela está ativa, deve existir uma lógica que determine qual será o número definitivo da apólice.

A definição dessa lógica é responsabilidade de cada companhia que utilizar a funcionalidade.

### 11.5 Caso citado: Peru

Um participante menciona que, no Peru, contratos poderiam possuir essa característica de numeração consecutiva. O instrutor responde que o Peru parece ser um dos casos em que ocorre alteração do número de apólice.

> Essa referência é contextual e não permite concluir quais regras legais específicas se aplicam no Peru, nem em quais produtos ou companhias.

---

## 12. Motivos para emissão de suplementos

Um suplemento é apresentado como uma modificação na apólice. Ao emitir um suplemento, podem ser registrados motivos que explicam por que a alteração foi realizada.

### 12.1 Exemplos de motivos mencionados

- decisão da companhia;
- solicitação do segurado;
- alteração de uma cobertura;
- mudança de soma segurada;
- retirada ou substituição de uma cobertura que deixou de existir.

### 12.2 Um ou vários motivos

O ramo pode permitir:

- um único motivo por suplemento;
- múltiplos motivos para a mesma alteração.

#### Exemplo

Em um mesmo suplemento, pode ocorrer:

1. alteração de uma cobertura por decisão da companhia;
2. alteração da soma segurada a pedido do cliente.

Nesse caso, dois motivos podem ser registrados.

### 12.3 Natureza dos motivos

Os motivos são previamente codificados e selecionados pelo usuário.

O instrutor deixa claro que os motivos descrevem **por que** o suplemento foi realizado, e não restringem necessariamente **o que** pode ser alterado nele.

---

## 13. Registro de mudança de plano de pagamento como suplemento

### 13.1 Conceito de mudança de plano de pagamento

A alteração de plano de pagamento modifica a forma de pagamento do prêmio, sem necessariamente alterar o valor econômico total da apólice.

Exemplo mencionado:

```text
Plano anterior: 2 recibos
↓
Novo plano: 3 recibos
```

### 13.2 Comportamento padrão

Normalmente, a alteração é tratada como movimento nos recibos:

- os recibos anteriores são anulados;
- novos recibos são gerados segundo o novo plano;
- a apólice não necessariamente recebe um suplemento visível para essa mudança.

### 13.3 Comportamento configurável

A propriedade permite que a mudança de plano de pagamento também seja registrada como suplemento na apólice.

#### Motivação citada

Algumas companhias precisam que qualquer alteração fique registrada formalmente como suplemento, possivelmente por exigência legal ou regulatória.

### 13.4 Lógica condicional

Além do comportamento simples “sim” ou “não”, o instrutor menciona a possibilidade de desenvolver uma lógica para decidir, conforme condições específicas, se a alteração de plano de pagamento deve ou não gerar suplemento.

### 13.5 Perguntas e respostas relevantes

**Pergunta:** É possível mudar o plano de pagamento por suplemento?

**Resposta:** Sim. A mudança é possível. A diferença é se ela será registrada apenas no movimento de recibos ou também como suplemento na apólice.

**Pergunta:** Se houver mudança de prêmio por recargo de fracionamento, o suplemento precisa ser gerado?

**Resposta:** A explicação foi que os recibos são recalculados conforme o novo plano de pagamento, incluindo os elementos aplicáveis ao novo plano. A transcrição não fornece uma regra definitiva para todos os cenários de recargo.

**O que isso esclarece:**  
A propriedade trata da rastreabilidade da alteração na apólice, não da viabilidade da alteração do plano de pagamento em si.

---

## 14. Formação de modalidades

A parte final da sessão introduz a configuração de modalidades. O instrutor ressalta que, nesse ponto, não está definindo modalidades concretas, mas sim definindo **como as modalidades serão formadas** no ramo.

Uma modalidade é apresentada como um agrupamento ou pacote de coberturas disponíveis para oferta durante a emissão.

### 14.1 Sem modalidades

Um ramo pode não utilizar modalidades.

Nesse caso:

- o ramo possui suas coberturas;
- todas elas são apresentadas durante a emissão;
- o emissor decide, conforme regras de cobertura e negociação, quais serão contratadas.

A ausência de modalidades não significa necessariamente que todas as coberturas sejam obrigatórias. Essa obrigatoriedade depende da definição de cada cobertura, que será abordada posteriormente.

---

### 14.2 Modalidade explícita

Na modalidade explícita, existe um atributo do ramo ou do risco que identifica diretamente a modalidade aplicável.

#### Exemplo apresentado

Um atributo pode possuir valores como:

```text
Bronze
Prata
Ouro
```

Cada valor corresponde a um conjunto de coberturas que será oferecido.

Exemplo conceitual:

```text
Modalidade Bronze
→ oferece determinado subconjunto de coberturas

Modalidade Prata
→ oferece conjunto maior ou diferente de coberturas

Modalidade Ouro
→ oferece todas ou mais coberturas
```

#### Fluxo apresentado

```text
Emissor seleciona a modalidade
↓
Sistema identifica o valor do atributo
↓
Sistema apresenta as coberturas associadas àquele valor
↓
Regras das coberturas determinam se elas são obrigatórias ou opcionais
```

#### Ressalva

A modalidade não define, por si só, que uma cobertura será obrigatoriamente contratada. Ela define quais coberturas são apresentadas ou disponibilizadas para a modalidade escolhida.

---

### 14.3 Modalidade implícita

Na modalidade implícita, não existe um único atributo que represente diretamente uma modalidade conhecida pelo emissor.

Em vez disso, a oferta de coberturas é definida com base em um ou mais atributos.

O instrutor apresenta duas formas:

1. por combinação de valores de vários atributos;
2. por avaliação unitária de cada atributo.

---

### 14.4 Modalidade implícita por combinação de atributos

Nesse modelo, a combinação entre valores de atributos determina as coberturas ofertadas.

#### Exemplo citado

Atributos usados:

- tipo de residência, como própria ou alugada;
- classificação do cliente, como bronze, prata ou ouro.

A modalidade resultante é definida pela combinação desses valores:

```text
Classificação do cliente + Situação da residência
↓
Conjunto de coberturas ofertadas
```

Exemplo conceitual:

```text
Cliente Bronze + residência não alugada
→ conjunto A de coberturas

Cliente Bronze + residência alugada
→ conjunto B de coberturas
```

O instrutor menciona que parte do exemplo exibido precisava ser corrigida posteriormente, pois havia uma cobertura desenhada de forma incorreta.

#### Limitação

A transcrição não fornece a matriz completa de combinações nem os nomes formais das coberturas. Portanto, não é possível reconstruir a configuração exata do exemplo.

---

### 14.5 Modalidade implícita por valores unitários

Nesse modelo, cada atributo é avaliado individualmente para oferecer coberturas.

Exemplo conceitual apresentado:

```text
Se residência é alugada
→ oferecer cobertura de reparação

Se cliente é Bronze
→ oferecer determinado grupo de coberturas

Se cliente é Prata
→ oferecer outro grupo

Se cliente é Ouro
→ oferecer outro grupo
```

A oferta final pode ser composta pela soma das coberturas ativadas pelos diferentes atributos avaliados.

### 14.6 Comparação entre os modelos de modalidade

| Modelo | Como a oferta é determinada |
|---|---|
| Sem modalidade | Todas as coberturas do ramo são apresentadas |
| Explícita | Um atributo identifica diretamente a modalidade |
| Implícita por combinação | A combinação de vários atributos define o conjunto de coberturas |
| Implícita por valores unitários | Cada valor de cada atributo adiciona coberturas à oferta |

---

## 15. Relações de causa e efeito identificadas

Abaixo está uma reconstrução analítica, baseada na lógica apresentada durante a formação.

### 15.1 Identificação de riscos

```text
Riscos registrados apenas com número sequencial
↓
Dificuldade para reconhecer o objeto segurado
↓
Necessidade de identificação compreensível e única
↓
Definição de atributos e lógica de composição
↓
Nome descritivo do risco gravado no sistema
```

### 15.2 Vigência plurianual

```text
Apólices podem durar mais de um ano
↓
Necessidade de definir a granularidade de cálculo e registro
↓
Escolha entre segmentação anual ou período único
↓
Configuração de multi-períodos
↓
Prêmios e coberturas registrados por período ou de forma consolidada
```

### 15.3 Controle de cobertura por horário

```text
Apólice e sinistro podem ocorrer no mesmo dia
↓
Apenas a data pode ser insuficiente para determinar precedência
↓
Necessidade de precisão temporal
↓
Registro obrigatório de hora e minuto, quando configurado
↓
Possibilidade de validar se o sinistro ocorreu antes ou depois da emissão
```

### 15.4 Reutilização de informações documentais

```text
Orçamentos podem conter anexos relevantes
↓
Conversão para apólice pode exigir reaproveitamento desses textos
↓
Necessidade de evitar nova redação manual
↓
Configuração de transferência de anexos
↓
Textos copiados, com possibilidade de edição ou exclusão
```

### 15.5 Conformidade de numeração

```text
Numeração interna pode não produzir sequência definitiva contínua
↓
Algumas companhias ou países exigem numeração consecutiva
↓
Necessidade de numeração definitiva específica
↓
Habilitação de mudança do número de apólice
↓
Lógica da companhia atribui número final quando a apólice se torna definitiva
```

---

## 16. Perguntas e respostas consolidadas

| Tema | Pergunta resumida | Resposta resumida | Esclarecimento |
|---|---|---|---|
| Identificação do risco | A lógica grava a descrição do risco nas tabelas? | Sim, após preencher os atributos, a lógica gera e grava o nome do risco. | O identificador é persistido, não apenas visual. |
| Multi-períodos | As datas da apólice continuam cobrindo toda a vigência? | Sim; o que muda é o detalhamento interno por período. | Vigência contratual e estrutura interna de períodos são conceitos diferentes. |
| Multi-períodos | Uma apólice plurianual pode ter período único? | Sim, quando multi-períodos não está ativado. | A apólice pode ser plurianual sem divisão operacional anual. |
| Controles técnicos | A autorização de orçamento gera os controles? | Não. Os controles existem independentemente. | A propriedade regula a conversão do orçamento pendente em apólice. |
| Orçamento pendente | É possível emitir apólice a partir de orçamento retido? | Depende da propriedade de autorização obrigatória. | Sem a obrigatoriedade, a conversão pode ocorrer, mas a apólice poderá ficar retida. |
| Anulação de suplemento | Por padrão, controles técnicos são executados? | Não normalmente; a execução pode ser configurada. | A validação em anulações surgiu como necessidade específica de algumas companhias. |
| Número de apólice | Quando o número definitivo é atribuído? | Quando a apólice se torna definitiva. | Evita consumir numeração final para apólices rejeitadas. |
| Plano de pagamento | A mudança é permitida? | Sim; a diferença é onde ela fica registrada. | O movimento pode ser apenas de recibos ou também um suplemento de apólice. |

---

## 17. Limitações e ressalvas reconhecidas

### 17.1 Limitações explicitamente mencionadas

- A formação não concluiria todo o conteúdo na sessão atual.
- O tema exigiria continuação no mês seguinte e possivelmente várias sessões.
- As cláusulas seriam detalhadas em outra área de definição.
- Os controles técnicos seriam aprofundados posteriormente.
- A definição de coberturas e modalidades seria apresentada com maior profundidade em outro momento.
- A propriedade de hora e minuto é opcional.
- A exigência de orçamento prévio depende de legalidade, produto ou decisão da companhia.
- A numeração alternativa de apólice requer lógica específica definida pela companhia.
- A tradução de anexos não é automática.
- Algumas funcionalidades foram solicitadas por companhias específicas, como controles técnicos em anulação de suplemento e registro de mudança de plano de pagamento como suplemento.

### 17.2 Pontos com possível ruído de transcrição

- “RIF”, “Rift Core”, “Reef.core” e “Tron” podem representar nomenclaturas diferentes ou erros de transcrição.
- Alguns termos como “rambo”, “rivo”, “periódor” e “lastidor” são claramente artefatos de reconhecimento automático e parecem referir-se a “ramo”, “risco”, “período” e “bastidor”.
- O instrutor afirma que uma parte do exemplo visual de modalidades estava incorreta e seria movida/corrigida posteriormente.
- A transcrição termina durante a explicação de modalidades implícitas; portanto, não há fechamento completo desse tópico.

---

## 18. Riscos e desafios

### 18.1 Riscos explicitamente mencionados

| Risco ou preocupação | Contexto |
|---|---|
| Cobertura de sinistro anterior à emissão | Pode ocorrer quando apólice e sinistro são registrados no mesmo dia sem precisão de horário. |
| Alteração contratual por anexos livres | Anexos podem modificar condições do seguro e ser entregues ao cliente. |
| Emissão de risco sem aprovação | Controles técnicos podem exigir autorização antes da definitividade. |
| Numeração não consecutiva | Algumas companhias ou países podem exigir sequência contínua de números definitivos de apólice. |
| Perda de continuidade operacional | Emissões suspensas podem depender do usuário original, se o ramo não permitir retomada por terceiros. |

### 18.2 Desafios derivados do contexto — leitura analítica

Os pontos abaixo são inferências analíticas, não afirmações literais dos participantes.

1. **Governança de lógicas de negócio**  
   Diversas propriedades dependem de lógicas específicas da companhia: identificador de risco, número definitivo de apólice e decisão condicional sobre gerar suplemento de plano de pagamento. Isso sugere que a qualidade da parametrização depende de governança sobre regras, manutenção e testes dessas lógicas.

2. **Risco de inconsistência documental**  
   Como anexos podem ser livres, multilíngues e modificáveis durante a emissão, existe potencial necessidade de controles organizacionais para assegurar coerência contratual. A reunião, porém, não detalha se tais controles existem.

3. **Complexidade combinatória das modalidades implícitas**  
   Modelos baseados na combinação de atributos podem crescer em complexidade conforme aumentam os atributos e seus valores possíveis. Essa leitura decorre da estrutura apresentada, mas a sessão não discute limites técnicos, performance ou práticas de manutenção.

4. **Rastreabilidade regulatória**  
   A preocupação com numeração consecutiva e registro de alterações como suplemento indica que requisitos locais, regulatórios ou operacionais podem influenciar fortemente a configuração por companhia ou país.

---

## 19. Transformações e princípios identificados

### 19.1 Configuração governada em vez de comportamento único

A apresentação revela um sistema altamente parametrizável. O mesmo núcleo funcional pode se adaptar a diferentes produtos, países ou companhias por meio de propriedades, atributos, regras e lógicas.

Uma leitura possível é:

```text
Produto de seguro genérico
↓
Configuração por ramo
↓
Comportamento específico de emissão
↓
Adequação a regras comerciais, legais e operacionais
```

### 19.2 Separação entre habilitar uma capacidade e definir sua lógica

Diversas propriedades não implementam a regra final. Elas habilitam a possibilidade de usar um comportamento que precisa ser definido em outra camada.

Exemplos:

| Propriedade | O que ela habilita | O que ainda precisa ser definido |
|---|---|---|
| Identificador de objeto segurado | Geração de nome descritivo do risco | Lógica e atributos utilizados |
| Cláusulas | Uso de cláusulas no ramo | Cláusulas, regras de associação e edição |
| Mudança de número de apólice | Atribuição de numeração alternativa | Lógica que calcula o número final |
| Plano de pagamento como suplemento | Registro formal em apólice | Eventual lógica condicional |
| Modalidades | Agrupamento de coberturas | Coberturas e regras de modalidade |

### 19.3 Separação entre documento provisório e definitivo

A sessão diferencia claramente estados de trabalho e estados definitivos:

```text
Emissão em andamento
↓
Suspensão possível
↓
Controles técnicos podem reter o processo
↓
Aprovação ou ajuste
↓
Documento definitivo
```

Essa distinção é especialmente relevante para:

- aprovação de risco;
- atribuição de número definitivo;
- conversão de orçamento em apólice;
- retomada de processos por usuários distintos.

---

## 20. Números e indicadores citados

| Indicador | Valor mencionado | Contexto |
|---|---:|---|
| Chaves de ramos por companhia | Até 999 | Capacidade apresentada na documentação do Reef.core. |
| Riscos no exemplo multi-risco | 3 carros | Exemplo de uma apólice com múltiplos objetos segurados. |
| Apólice anual do exemplo | 800 euros | Cenário anual de um único período. |
| Apólice plurianual do exemplo | 1.000 euros | Vigência de 01/01/2020 a 01/04/2021. |
| Prêmio do período 1 | 800 euros | Multi-períodos habilitado. |
| Prêmio do período 2 | 200 euros | Multi-períodos habilitado. |
| Duração do exemplo de renovação | 6 meses | Exemplo de apólice temporária renovada pela mesma temporalidade. |
| Planos de pagamento do exemplo | 2 para 3 recibos | Mudança de plano de pagamento. |
| Modalidades exemplificadas | Bronze, Prata e Ouro | Exemplo de modalidade explícita. |

Esses números foram apresentados durante o treinamento ou identificados nas evidências visuais. Não há indicação de auditoria externa ou validade geral para todas as companhias.

---

## 21. O que a reunião não permite concluir

A sessão oferece detalhamento funcional relevante, mas não permite determinar com segurança:

- a tecnologia utilizada pelo Reef.core;
- a arquitetura de infraestrutura, cloud, rede ou ambientes;
- os bancos de dados envolvidos;
- o modelo de APIs, eventos, mensageria ou integrações externas;
- a estrutura das tabelas citadas para riscos, apólices, coberturas ou recibos;
- o modelo de autenticação, autorização ou perfis de acesso;
- requisitos de auditoria, trilhas de alteração ou retenção documental;
- limites de volume, performance ou escalabilidade;
- mecanismos de backup, recuperação de desastre ou continuidade de negócio;
- modelo de implantação, versionamento ou CI/CD;
- políticas de segurança para anexos livres;
- processo de aprovação jurídica das cláusulas e anexos;
- regras específicas por país, além de referências pontuais;
- o detalhamento da diferença entre “RIF”, “Reef.core” e “Tron”;
- se todos os comportamentos explicados estão disponíveis em todas as versões do produto;
- critérios de autorização, papéis responsáveis ou SLAs para controles técnicos;
- roadmap de produto além da continuação do treinamento no mês seguinte.

---

## 22. Conclusões

A formação apresenta a definição de ramo como um ponto estruturante da configuração de produtos de seguro no Reef.core. Por meio dela, a companhia define não apenas uma classificação comercial, mas um conjunto de capacidades e restrições que condicionam toda a emissão de apólices daquele ramo.

Os principais conceitos transmitidos foram:

1. o ramo deve ser identificado, associado a setor e subsetor e configurado com propriedades operacionais;
2. a mesma apólice pode ou não conter vários riscos, conforme a parametrização;
3. riscos devem possuir identificação compreensível, construída por lógica de negócio a partir de atributos;
4. apólices plurianuais podem ser tratadas por períodos anuais ou como período único;
5. precisão de hora e minuto pode ser necessária para tratar corretamente eventos ocorridos no mesmo dia da emissão;
6. cláusulas, anexos, idiomas e textos-modelo ampliam a capacidade de individualização contratual;
7. orçamentos podem ser obrigatórios, reutilizáveis e submetidos a controles antes de se converterem em apólices;
8. controles técnicos são mecanismos centrais de validação, bloqueio e autorização;
9. processos podem ser suspensos e retomados, inclusive por outros usuários quando permitido;
10. requisitos locais ou regulatórios podem justificar numeração específica de apólices e registro formal de alterações de pagamento;
11. modalidades permitem organizar a oferta de coberturas de forma direta ou derivada de atributos;
12. várias capacidades dependem de definições futuras, lógicas adicionais e configuração por companhia.

A sessão não encerra o treinamento. O ponto de continuidade informado pelo instrutor é o aprofundamento da formação de modalidades, seguido das demais definições relacionadas a coberturas e emissão.
