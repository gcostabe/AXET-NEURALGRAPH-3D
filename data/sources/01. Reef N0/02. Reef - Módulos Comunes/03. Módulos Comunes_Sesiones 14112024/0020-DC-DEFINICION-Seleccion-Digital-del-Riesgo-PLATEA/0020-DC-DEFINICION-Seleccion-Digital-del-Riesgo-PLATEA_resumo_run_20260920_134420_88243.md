# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `0020-DC-DEFINICION-Seleccion-Digital-del-Riesgo-PLATEA.mp4`
**Data de processamento:** 20/09/2026 13:46:45
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise Estruturada — Integração de Seleção Digital de Risco/Antifraude com Plataforma Platea

> **Base e rastreabilidade:** esta análise foi construída exclusivamente a partir da transcrição fornecida. Não há timestamps, identificação formal dos participantes nem materiais de apoio anexos. Termos como **“RISCOR”**, **“TrifCode”**, **“Ipad Amagre”** e alguns nomes organizacionais podem conter imprecisões de reconhecimento de voz; por isso, foram preservados como registrados quando não foi possível validá-los pelo contexto.

## 1. Síntese executiva

A sessão foi um treinamento técnico sobre a configuração de controles técnicos e sua relação com dois assuntos associados: a seleção digital de risco, denominada **Platea**, e a seleção de riscos ou “marcas”. O conteúdo efetivamente detalhado concentrou-se na integração entre Platea e uma plataforma transacional registrada na transcrição como **RISCOR**.

Platea foi apresentada como uma plataforma tecnológica corporativa de combate à fraude, vinculada à direção de Segurança e Meio Ambiente da MAPFRE. Seu papel é avaliar riscos a partir de múltiplas fontes de informação e devolver indicadores de risco ou severidade para que o sistema transacional tome ações configuráveis durante processos de emissão de apólices e de sinistros.

A principal ideia é que a integração não deve ser tratada como uma conexão técnica isolada. Ela depende de configurações coordenadas entre: o ramo técnico; os indicadores antifraude disponíveis; o escopo de aplicação de cada indicador; as ações que o sistema executará perante cada nível de risco; e, no caso de emissão, o mapeamento dos dados que serão enviados a Platea.

A solução permite que, por exemplo, um risco de severidade alta ou crítica resulte em um controle técnico que exija autorização, rejeite a continuidade da operação ou, no domínio de sinistros, inclua automaticamente níveis ou trâmites no plano de tratamento. Quando Platea não responde, o comportamento previsto é gerar um controle técnico de auditoria que retenha a operação até que alguém a autorize, rejeite ou eventualmente permita nova tentativa de integração.

---

## 2. Contexto e antecedentes

A apresentação ocorre após uma explicação anterior sobre a configuração de **controles técnicos**. O facilitador afirma que Platea e a seleção de riscos/marcas são temas relacionados a esses controles, porque os resultados da avaliação antifraude podem determinar controles e ações dentro do sistema transacional.

O ambiente descrito parece operar com ao menos dois grandes domínios funcionais:

- **Emissão**, envolvendo orçamento, emissão de apólice e suplementos;
- **Sinistros**, envolvendo abertura e gestão de expedientes, planos de tratamento e trâmites.

Também há uma configuração de produtos estruturada por elementos como:

- companhia;
- ramo técnico;
- setor e subsetor;
- estrutura geográfica;
- canais de distribuição;
- fontes de produção;
- intervenientes de uma apólice;
- dados variáveis;
- conceitos econômicos.

A integração com Platea somente se aplica quando fizer sentido para o país, a instalação e o ramo técnico envolvidos. A apresentação enfatiza que Platea não necessariamente cobre todos os ramos nem todos os cenários em todos os países. Os exemplos citados indicam que sua aplicação tende a ser mais comum em ramos como automóvel e residencial/habitação.

---

## 3. Problema tratado

### 3.1 Necessidade de avaliar risco com informações externas ao sistema transacional

O sistema transacional não concentra, necessariamente, todas as informações que podem ser relevantes para uma avaliação de fraude ou risco. Platea foi descrita como uma plataforma que pode se alimentar de diversas fontes de informação disponibilizadas externamente, incluindo, como exemplo não exaustivo mencionado, dados associados a Facebook ou outras fontes.

A transcrição não detalha quais fontes são efetivamente utilizadas, quais dados são coletados, nem a técnica de análise aplicada por Platea. O instrutor declarou não conhecer esse funcionamento interno em profundidade.

### 3.2 Necessidade de transformar um indicador externo em uma ação operacional

Receber uma classificação de risco, por si só, não resolve o problema. A organização precisa configurar como cada resultado será tratado em seus processos.

A lógica apresentada é:

```text
Platea avalia dados do risco
↓
Platea devolve indicador e/ou nível de severidade
↓
O sistema transacional interpreta o resultado conforme regras configuradas
↓
A operação segue, recebe controle técnico, exige autorização,
é rejeitada ou cria atividade no fluxo de sinistro
```

A integração, portanto, exige configurar tanto a consulta a Platea quanto a consequência interna de cada resposta.

### 3.3 Indisponibilidade ou falha da integração

Há um risco operacional explícito: Platea pode não responder por indisponibilidade, erro de destino, ausência de conectividade, indisponibilidade de dados ou esgotamento de tentativas de conexão.

A consequência mencionada é a retenção da operação, com geração automática de um controle técnico de auditoria que deve ser tratado por alguém autorizado. A operação não é concluída automaticamente quando essa avaliação antifraude obrigatória não pode ser resolvida.

---

## 4. Solução apresentada

A solução apresentada é uma integração parametrizável entre o sistema transacional — referido como RISCOR na transcrição — e Platea.

O modelo é composto por cinco elementos principais:

1. **Marcas no ramo técnico**  
   Determinam se o controle antifraude se aplica no processo de emissão e/ou no processo de sinistros.

2. **Catálogo de indicadores antifraude**  
   Registra quais indicadores Platea poderá avaliar e quais deles têm efeito operacional dentro do sistema transacional.

3. **Definição de âmbito ou escopo dos indicadores**  
   Determina em quais companhias, módulos, operações, produtos, regiões, canais e tipos de expediente cada indicador se aplica.

4. **Classificação de ações**  
   Define o que o sistema deve fazer para uma combinação de indicador e severidade devolvida por Platea.

5. **Configuração específica de emissão**  
   Mapeia quais dados devem ser extraídos do processo de emissão e enviados a Platea para cada indicador.

A apresentação reforça que a configuração não deve ser feita de forma isolada. As tabelas comuns dependem de cadastros e estruturas configurados nos módulos específicos de emissão e sinistros.

---

## 5. Arquitetura e funcionamento lógico

A transcrição não apresentou um diagrama técnico literal, nem detalhou APIs, protocolos, bancos de dados, filas, mecanismos de autenticação ou infraestrutura. A representação abaixo é uma consolidação analítica do fluxo descrito.

```text
Configuração de produto / ramo técnico
    ├─ Marca de aplicação antifraude em emissão
    └─ Marca de aplicação antifraude em sinistros
                ↓
Sistema transacional (registrado como RISCOR)
    ├─ Catálogo de indicadores Platea
    ├─ Regras de escopo dos indicadores
    ├─ Regras de ação por indicador e severidade
    └─ Mapeamento dos dados de emissão
                ↓
Chamada de integração para Platea
                ↓
Platea
    ├─ Avaliação de risco/fraude a partir de fontes próprias
    └─ Retorno de indicador e nível de severidade
                ↓
Sistema transacional
    ├─ Emissão: controles técnicos, autorização, auditoria ou rejeição
    └─ Sinistros: plano de tratamento, nível, trâmite ou marcação de fraude
```

### 5.1 Fluxo de decisão em emissão

```text
Início de operação de emissão
↓
Verificar se o ramo técnico possui marca de integração com Platea
↓
Identificar indicadores aplicáveis e dados a enviar
↓
Consultar Platea
├─ Resposta recebida:
│  └─ Interpretar severidade e executar ação configurada
│     ├─ Não realizar ação
│     └─ Criar controle técnico com a severidade configurada
│        ├─ Observação
│        ├─ Auditoria
│        └─ Rejeição
└─ Sem resposta/falha:
   └─ Criar controle técnico de auditoria específico
      e reter a operação para tratamento autorizado
```

### 5.2 Fluxo de decisão em sinistros

```text
Operação de sinistro ou expediente
↓
Verificar aplicação do indicador conforme escopo configurado
↓
Consultar Platea quando aplicável
↓
Interpretar resultado
├─ Inserir nível no plano de tratamento
├─ Inserir trâmite específico no plano de tratamento
├─ Marcar o expediente como fraude
└─ Não realizar ação, conforme regra configurada
```

---

## 6. Componentes e configurações mencionados

## 6.1 Platea

### Finalidade

Platea foi apresentada como uma plataforma tecnológica de luta contra a fraude, desenvolvida ou disponibilizada internamente no contexto da MAPFRE, pela direção de Segurança e Meio Ambiente.

Seu objetivo declarado é prover às entidades do grupo tecnologias avançadas para uma gestão integral, eficaz e eficiente de risco/fraude.

### Funcionamento descrito

A plataforma avalia elementos de risco — como veículo ou pessoa — com base em fontes de informação que não precisam estar presentes no sistema transacional. A transcrição menciona que Platea possui acesso a uma variedade de fontes, mas não detalha sua composição, seu modelo de dados ou os critérios usados na avaliação.

### Limites de conhecimento declarados

O próprio instrutor afirmou conhecer a integração em nível geral, mas não o funcionamento interno da plataforma. Portanto, a reunião não permite concluir:

- quais módulos internos Platea possui além de antifraude;
- quais fontes de dados concretas são usadas;
- quais dados são públicos, privados ou obtidos por qual meio;
- como são calculados os indicadores;
- quais controles de privacidade, consentimento, retenção ou segurança são aplicados.

---

## 6.2 Marcas antifraude no ramo técnico

Na definição do ramo técnico, foram apresentados dois atributos ou marcas simples, de resposta “sim ou não”:

- aplicação de controle antifraude no processo de **emissão**;
- aplicação de controle antifraude no processo de **sinistros**.

Essas marcas são o primeiro filtro de aplicabilidade. Elas não significam que todo ramo será necessariamente avaliado por todos os indicadores de Platea; indicam apenas que a integração pode ser aplicável naquele contexto.

A apresentação destaca que Platea não controla necessariamente todos os ramos. A utilidade dessa configuração depende da realidade de cada país, instalação e produto.

---

## 6.3 Catálogo de indicadores antifraude

O catálogo permite registrar os indicadores provenientes de Platea.

### Atributos mencionados

- companhia;
- idioma;
- código do indicador antifraude;
- descrição;
- uso no módulo de emissão;
- uso no módulo de sinistros;
- inabilitação;
- data de validade.

### Regra de seleção relevante

Não é necessário configurar todos os indicadores existentes em Platea. Devem ser definidos apenas aqueles capazes de gerar algum efeito ou ação no sistema transacional.

Essa decisão tem duas justificativas explícitas:

1. Alguns indicadores podem existir em Platea, mas não produzir consequência no sistema local;
2. O país ou o produto pode não capturar os dados necessários para permitir determinada avaliação.

A configuração depende, portanto, de alinhamento com a equipe responsável por Platea, para identificar a relação de indicadores utilizáveis em cada contexto.

---

## 6.4 Catálogo de âmbito dos indicadores

Esse catálogo estabelece onde e quando cada indicador é aplicável.

### Critérios de escopo mencionados

- companhia;
- indicador antifraude de Platea;
- módulo;
- operação;
- tipo ou chave de expediente, no caso de sinistros;
- propriedades geográficas;
- propriedades comerciais;
- estrutura de produtos;
- estrutura de canais;
- inabilitação;
- data de validade.

### Operações exemplificadas

Foram citados exemplos de operações como:

- emissão de apólice;
- emissão de apólice a partir de orçamento;
- emissão de suplemento;
- abertura de sinistro;
- abertura de expediente.

### Escopo geográfico

A transcrição aponta uma inconsistência ou limitação entre a estrutura geográfica geral e a configuração de Platea:

- a estrutura geográfica geral teria **cinco níveis**;
- a configuração apresentada para Platea permite chegar apenas ao **quarto nível**.

Como consequência, não seria possível discriminar a aplicação de um indicador até unidades mais específicas, exemplificadas como distrito ou colônia.

### Escopo comercial e de produto

Também podem ser consideradas:

- setor;
- subsetor;
- ramo técnico;
- níveis da estrutura comercial;
- níveis da estrutura de canais;
- fonte de produção.

O terceiro nível de canais, associado às fontes de produção, foi descrito como identificador da forma ou canal pelo qual a apólice foi fechada.

---

## 6.5 Catálogo de ações antifraude

A classificação de ações define como RISCOR deve reagir ao resultado devolvido por Platea.

### Elementos mencionados

- companhia;
- módulo;
- operação;
- código de indicador antifraude;
- código da ação antifraude;
- nível de severidade do indicador;
- configuração complementar conforme o tipo de ação;
- inabilitação;
- data de validade.

### Níveis de severidade citados

| Código/valor | Classificação descrita |
|---:|---|
| 1 | Sem resposta |
| 25 | Baixo |
| 50 | Médio |
| 75 | Alto |
| 100 | Crítico |

Segundo a explicação, esses valores são definidos por Platea. A reunião não apresenta justificativa de negócio, metodologia estatística ou fórmula para a atribuição de cada valor.

### Uso dos resultados

A organização configura o que fazer com cada severidade. O instrutor ilustra que:

- para risco baixo ou médio, pode-se optar por não fazer nada;
- para risco alto, pode-se criar um controle técnico de determinado nível de autorização;
- para risco crítico, pode-se criar um controle técnico com nível de autorização mais elevado;
- uma regra também pode gerar um controle de rejeição, impedindo a continuidade da operação.

---

## 6.6 Tipos de ação

A transcrição menciona quatro classificações de ação, embora a nomenclatura integral não tenha ficado completamente clara devido à qualidade da transcrição.

O comportamento descrito permite consolidar os tipos da seguinte forma:

| Tipo funcional | Domínio | Efeito descrito |
|---|---|---|
| Controle técnico | Emissão | Cria controle técnico para autorização, auditoria ou rejeição |
| Inserção de nível no plano de tratamento | Sinistros | Insere nível no plano de tratamento do expediente |
| Inserção de trâmite específico | Sinistros | Insere trâmite no plano de tratamento |
| Nenhuma ação | Emissão ou contexto configurável | Não produz consequência operacional específica |

A transcrição sugere que os tipos 2 e 3 seriam próprios de sinistros e que o tipo 1, além do tipo 4 sem ação, poderia ser usado em emissão. A numeração exata deve ser confirmada em documentação ou na aplicação, pois o trecho possui ambiguidades de reconhecimento de voz.

---

## 6.7 Controles técnicos

No domínio de emissão, a principal ação operacional é a criação de um controle técnico.

A severidade do controle técnico pode ser uma das já conhecidas no sistema:

- observação;
- auditoria;
- rejeição.

Caso a ação configurada para um risco crítico gere controle de rejeição, a operação não poderá prosseguir até que a condição seja tratada conforme as regras aplicáveis.

Quando a ação consiste em criar um controle técnico, a configuração deve indicar o código desse controle técnico previamente cadastrado.

---

## 6.8 Planos de tratamento e trâmites de sinistros

No domínio de sinistros, a resposta de Platea pode causar a criação de atividades operacionais no expediente.

As alternativas citadas são:

- inserir um novo nível dentro do plano de tratamento;
- inserir um trâmite específico no plano de tratamento;
- etiquetar ou marcar o expediente como fraude.

Essas ações dependem de configurações existentes no módulo de sinistros. Para inserção de nível, deve ser informado o código do nível. Para inserção de trâmite, deve ser indicado o trâmite e seu respectivo código.

A explicação enfatiza que os cadastros comuns não são autossuficientes: eles precisam estar coerentes com as configurações específicas do módulo de sinistros.

---

## 6.9 Marcação de fraude no expediente

Foi mencionado que o expediente de sinistro pode ser marcado como fraude. Essa marcação se relaciona a outro módulo, referido como módulo de fraudes em sinistros.

A reunião indica que esse módulo pode permitir decisões ou ações específicas posteriores na gestão de sinistros, a partir do indicador automático obtido pela integração com Platea.

Não foram detalhados:

- o funcionamento do módulo de fraudes;
- o fluxo de investigação;
- os papéis autorizados a confirmar fraude;
- os efeitos jurídicos ou operacionais da etiqueta;
- a relação entre uma marca automática e uma confirmação humana de fraude.

---

## 7. Modelo de integração

## 7.1 Pré-condições

A integração é condicionada por:

1. Aplicabilidade antifraude marcada no ramo técnico;
2. Indicadores cadastrados;
3. Escopo do indicador compatível com a operação;
4. Dados necessários disponíveis no processo local;
5. Regras de ação configuradas;
6. Configuração de emissão, quando o contexto for emissão.

## 7.2 Chamada e retorno

Durante uma operação aplicável, o sistema realiza uma chamada a Platea. A resposta pode incluir:

- um ou mais indicadores;
- nível de severidade;
- possivelmente a ausência de resposta, tratada como uma condição específica.

A transcrição não informa se a integração ocorre por API REST, SOAP, mensageria, arquivo, banco de dados ou outro mecanismo. Também não informa se a chamada é síncrona ou assíncrona em termos técnicos. Contudo, o efeito descrito — retenção da operação quando não há resposta — sugere que, ao menos no fluxo apresentado, a resolução afeta diretamente a continuidade da transação.

## 7.3 Falha de integração

Quando não há resposta de Platea, por exemplo por erro de conectividade, destino indisponível, tentativas esgotadas ou indisponibilidade de informações, o sistema cria automaticamente um controle técnico de auditoria com chave específica.

Esse controle interrompe a conclusão normal da operação, especialmente no exemplo de emissão. Uma pessoa autorizada deve decidir se autoriza, rejeita ou adota outro tratamento operacional, como permitir nova tentativa de conexão.

---

## 8. Configuração específica para emissão

A seção final da apresentação trata exclusivamente da integração de Platea no processo de emissão.

Para cada companhia e ramo técnico, define-se uma sequência de um ou mais indicadores a consultar. Para cada indicador, configura-se o dado que será extraído e enviado a Platea.

## 8.1 Identificador do indicador

O indicador usa um identificador definido por Platea. Esse código permite o mapeamento entre a configuração local e a capacidade disponibilizada pela plataforma antifraude.

## 8.2 Tipos de conteúdo de dados enviados

Foram descritas quatro fontes ou tipologias de informação a enviar.

| Tipologia | Conteúdo possível |
|---|---|
| Dado fixo | Ex.: moeda da apólice, data de efeito da apólice ou suplemento |
| Interveniente | Dados de tomador, beneficiário, condutor, segurado ou outra pessoa/entidade associada |
| Dado variável | Valor de atributo configurado no ramo, na apólice, no risco ou em outro nível variável |
| Conceito de desagregação econômico | Ex.: direitos de apólice ou outro conceito econômico específico |

A nomenclatura formal e os códigos dessas tipologias não ficaram integralmente claros na transcrição. A classificação acima representa a explicação funcional apresentada.

## 8.3 Intervenientes

“Intervenção” foi definido como o termo interno usado para identificar qualquer pessoa física ou jurídica associada à apólice ou ao objeto segurado.

Exemplos citados:

- condutor;
- segurado;
- beneficiário;
- tomador;
- agente;
- companhia seguradora.

A configuração deve indicar de qual interveniente o dado será obtido antes de ser enviado a Platea.

## 8.4 Interveniente principal e interveniente usado no cálculo

A reunião esclarece uma distinção importante:

- um interveniente pode ser marcado como **principal**;
- o interveniente utilizado para determinado cálculo de risco pode ser outro.

O exemplo usa uma apólice com quatro condutores: o participante, seu cônjuge e dois filhos. O participante pode ser o condutor principal registrado, mas o cálculo de risco pode considerar o condutor mais jovem, caso essa seja a regra de tarifação do ramo.

Assim, “principal” não significa automaticamente “utilizado no cálculo”. A coincidência ou diferença entre os dois depende da configuração do produto.

## 8.5 Conceito lógico e propriedade

Para dados fixos, deve-se indicar o conceito lógico e a propriedade de onde o sistema obterá a informação.

Foi usado o exemplo da moeda da apólice: não basta saber que a moeda deve ser enviada; a equipe de informática precisa conhecer o conceito lógico e a propriedade disponíveis no processo de emissão para extrair corretamente esse valor.

## 8.6 Tipo de resultado: detalhe ou acumulado

A consulta pode ser configurada para tratar o resultado como:

- **Detalhe:** retorna mais de uma linha, uma para cada elemento avaliado;
- **Acumulado:** consolida o resultado para produzir uma resposta agregada.

O exemplo usa quatro condutores enviados a Platea:

- em modo detalhe, poderiam retornar quatro resultados;
- em modo acumulado, seria devolvido um resultado consolidado, que depois orientaria a decisão local.

A transcrição menciona, como exemplo, que o sistema poderia receber um valor como 75 e então disparar o controle técnico configurado para essa severidade.

A reunião não detalha a regra matemática de agregação, nem esclarece se ela é executada por Platea ou pelo sistema transacional em todos os cenários.

---

## 9. Modelo operacional

A reunião não tratou de forma completa de suporte, monitoramento, observabilidade, gestão de incidentes, SLAs, releases, patches ou hotfixes.

Ainda assim, há elementos operacionais relevantes.

### 9.1 Tratamento de falha na resposta

A indisponibilidade de Platea não é simplesmente ignorada. Ela produz um controle técnico de auditoria e retém a operação até ação de uma pessoa com a autorização necessária.

### 9.2 Responsabilidade de configuração

A configuração depende de múltiplos conhecimentos:

- equipe ou área responsável por Platea, para identificar indicadores disponíveis;
- conhecimento do país e do produto, para identificar os dados efetivamente capturados;
- configuração de ramos técnicos e produtos;
- configuração de emissão;
- configuração de sinistros;
- conhecimento técnico sobre os conceitos lógicos e propriedades disponíveis no sistema.

### 9.3 Dependência entre módulos

A configuração de catálogos comuns só funciona corretamente quando há estruturas correspondentes nos módulos específicos. Exemplos:

- controles técnicos devem existir para serem associados às ações de emissão;
- planos, níveis e trâmites de sinistros devem estar configurados para poderem ser inseridos;
- dados variáveis e conceitos devem estar configurados no ramo para poderem ser enviados a Platea.

---

## 10. Governança e decisões

## 10.1 Direcionamentos explicitamente apresentados

| Tema | Direcionamento |
|---|---|
| Cobertura da integração | Avaliar por país, instalação, ramo técnico e disponibilidade de dados |
| Indicadores | Configurar somente os que possam gerar ação no sistema local |
| Resposta de risco | Associar níveis de severidade a ações internas configuráveis |
| Sem resposta de Platea | Gerar controle técnico de auditoria e reter a operação |
| Emissão | Usar controles técnicos para governar continuidade, autorização ou rejeição |
| Sinistros | Inserir níveis/trâmites no plano de tratamento ou marcar fraude |
| Configuração | Não tratar os módulos de forma isolada; respeitar suas dependências |

## 10.2 Princípio de governança implícito

Uma leitura analítica possível é que o modelo procura manter a **decisão operacional dentro do sistema transacional**, ainda que Platea forneça a avaliação de risco.

Platea devolve indicadores e severidades; o sistema local decide, por configuração, a consequência aplicável. Isso possibilita que cada país ou produto adapte sua reação aos resultados sem necessariamente alterar o motor antifraude central.

Essa é uma interpretação baseada no fluxo apresentado, não uma declaração explícita sobre arquitetura corporativa.

---

## 11. Relações de causa e efeito

A sequência abaixo consolida relações sustentadas pela explicação:

```text
Informações relevantes para fraude não estão integralmente no sistema transacional
↓
Necessidade de consultar uma plataforma especializada com fontes adicionais
↓
Integração com Platea
↓
Retorno de indicador e severidade de risco
↓
Necessidade de transformar severidade em decisão operacional
↓
Configuração de ações, controles técnicos e fluxos de sinistros
```

Também foi apresentado um encadeamento específico para falhas:

```text
Integração obrigatória para o ramo/operação
↓
Platea não responde ou não é possível obter avaliação
↓
Não é seguro concluir normalmente a operação
↓
Geração automática de controle técnico de auditoria
↓
Retenção e decisão por pessoa autorizada
```

---

## 12. Perguntas e respostas relevantes

## Pergunta 1 — Platea é um sistema próprio ou de terceiros?

### O que se buscava entender

A pergunta buscou esclarecer a natureza da plataforma Platea: se era uma solução interna ou adquirida de terceiros.

### Resposta apresentada

A resposta foi que Platea pertence à direção de Segurança e Meio Ambiente da MAPFRE.

### O que isso esclarece

A plataforma foi apresentada como uma capacidade corporativa do grupo, e não como um serviço de terceiro no sentido discutido na pergunta. Contudo, a reunião não esclarece se ela incorpora fornecedores, dados ou tecnologias de terceiros em sua implementação.

---

## Pergunta 2 — Platea atua apenas em antifraude ou possui outros módulos?

### O que se buscava entender

A pergunta buscou delimitar o escopo funcional de Platea.

### Resposta apresentada

O instrutor respondeu que, pelo seu conhecimento, Platea atua apenas em antifraude.

### O que isso esclarece

A resposta é explicitamente limitada pelo conhecimento do instrutor. Não permite afirmar de forma definitiva que a plataforma não tenha outros módulos, serviços ou capacidades.

---

## Pergunta 3 — Platea utiliza dados externos, como os associados a Facebook?

### O que se buscava entender

A pergunta buscou entender como Platea consegue avaliar risco além dos dados existentes no sistema transacional.

### Resposta apresentada

O instrutor informou que Platea dispõe de muitas fontes de informação e citou Facebook como exemplo de fonte possível. Declarou, porém, não conhecer os detalhes dos dados específicos, sua natureza ou o funcionamento interno de análise.

Também afirmou confiar que a plataforma cumpre o que é exigido para uso de dados públicos.

### O que isso esclarece

A resposta esclarece o motivo funcional da integração: Platea pode enriquecer a análise com informações que o sistema transacional não possui.

Não esclarece, contudo:

- que dados são utilizados;
- de onde vêm;
- se são públicos, licenciados ou fornecidos por parceiros;
- quais bases legais são aplicadas;
- como ocorre o tratamento de dados pessoais.

---

## Pergunta 4 — O interveniente principal é necessariamente aquele utilizado no cálculo?

### O que se buscava entender

A dúvida tratava da relação entre a marcação de um interveniente como “principal” e a pessoa usada efetivamente em uma regra de cálculo de risco.

### Resposta apresentada

A resposta foi negativa. Um condutor pode ser o principal, mas outro condutor — por exemplo, o mais jovem — pode ser utilizado na tarifação se esta for a regra configurada no ramo.

### O que isso esclarece

O conceito de interveniente principal é uma classificação própria do cadastro/processo, enquanto a seleção do elemento usado em cálculo depende da lógica do produto. Ambos podem coincidir ou não.

---

## 13. Números, códigos e indicadores citados

| Item | Valor mencionado | Contexto |
|---|---:|---|
| Níveis geográficos gerais | 5 | Estrutura geográfica geral mencionada |
| Níveis geográficos disponíveis para Platea | 4 | Limitação da configuração de escopo Platea |
| Níveis de estrutura comercial | 3 | Aplicação de indicadores por estrutura comercial |
| Níveis de estrutura de canais | 3 | Os dois primeiros corporativos; terceiro associado a fontes de produção |
| Severidade sem resposta | 1 | Resultado/valor tratado na integração |
| Severidade baixa | 25 | Escala devolvida por Platea |
| Severidade média | 50 | Escala devolvida por Platea |
| Severidade alta | 75 | Escala devolvida por Platea |
| Severidade crítica | 100 | Escala devolvida por Platea |
| Quantidade de condutores no exemplo | 4 | Pessoa, cônjuge e dois filhos |
| Sequência de indicadores por ramo técnico | 1 a N | Configuração de emissão |

> Os valores acima foram declarados durante a sessão e não foram auditados externamente no material fornecido.

---

## 14. Limitações reconhecidas

### 14.1 Cobertura não universal

Platea não é apresentada como aplicável a todos os ramos, países ou instalações. A aplicabilidade precisa ser analisada caso a caso.

### 14.2 Dependência de dados disponíveis

Um indicador somente é útil se o sistema local conseguir capturar e fornecer os dados necessários para a avaliação. Não é viável configurar uma verificação baseada em uma informação inexistente no produto ou país.

### 14.3 Restrição no detalhe geográfico

A configuração de Platea alcança quatro níveis geográficos, enquanto a estrutura geral teria cinco. Isso impede diferenciações em níveis mais granulares, como distrito ou colônia, segundo os exemplos dados.

### 14.4 Dependência de módulos específicos

As configurações comuns dependem de elementos pré-existentes em emissão e sinistros. Não é possível configurar uma ação de inserção de trâmite sem que o plano, nível ou trâmite correspondente esteja corretamente definido no módulo de sinistros.

### 14.5 Conhecimento incompleto sobre Platea

O instrutor não detalha o funcionamento interno, as fontes exatas de dados, a composição tecnológica ou o conjunto integral de módulos da plataforma.

### 14.6 Falhas de conectividade ou resposta

A integração pode não responder. Esse cenário demanda intervenção operacional e pode impedir a conclusão normal de uma operação.

---

## 15. Riscos e desafios

## 15.1 Riscos explicitamente mencionados

- Falha de comunicação com Platea;
- indisponibilidade do destino;
- esgotamento de tentativas de conexão;
- ausência de informação para avaliar apólice, orçamento, sinistro ou expediente;
- retenção de operação por controle técnico;
- impossibilidade de finalizar a operação enquanto o controle não for tratado;
- configuração de indicadores cuja entrada de dados não exista no produto ou país;
- perda de granularidade geográfica na configuração de Platea.

## 15.2 Desafios derivados do contexto

> Os pontos abaixo são análises derivadas da configuração apresentada; não foram declarados literalmente como riscos pelos participantes.

- **Consistência entre configurações:** como o fluxo depende de catálogos, produtos, módulos de emissão e módulos de sinistros, configurações inconsistentes podem fazer com que o indicador não seja aplicado ou gere uma ação indevida.
- **Governança de exceções:** a retenção de operações sem resposta exige processos claros para autorização, rejeição ou reprocessamento.
- **Calibração de severidade:** associar baixo, médio, alto e crítico a controles internos exige critérios de negócio adequados. Uma configuração excessivamente rígida pode ampliar retenções; uma configuração permissiva pode reduzir a efetividade preventiva.
- **Qualidade e disponibilidade de dados:** a qualidade da avaliação depende dos dados extraídos e mapeados para Platea.
- **Rastreabilidade de decisões:** para explicar por que uma apólice ou sinistro recebeu uma ação, é importante preservar o indicador consultado, a severidade retornada e a regra configurada. A reunião não informou se esse registro existe.

---

## 16. Transformações e princípios identificáveis

## 16.1 Da decisão manual isolada para decisão assistida por risco

A integração apresentada desloca parte da identificação de risco para uma plataforma especializada, mas mantém no sistema local o tratamento operacional configurado. Isso sugere uma combinação entre avaliação automatizada e governança humana, especialmente em controles de auditoria e autorização.

## 16.2 De regras fixas no processo para comportamento configurável

A reação a cada resultado de risco não foi descrita como uma lógica codificada de forma única. Ela é configurada por catálogos, escopos, indicadores, severidades e tipos de ação.

Uma leitura possível é que o objetivo é possibilitar adaptação por país, produto, operação ou ramo sem tornar cada variação uma mudança estrutural no motor transacional.

## 16.3 Integração de capacidades transversais aos domínios de negócio

A antifraude não aparece como um processo restrito à emissão ou a sinistros. A mesma capacidade externa pode apoiar ambos os domínios, embora com respostas operacionais distintas:

- emissão usa controles técnicos;
- sinistros usa planos de tratamento, níveis, trâmites e marcação de fraude.

## 16.4 Dependência entre domínio comum e domínio especializado

A apresentação enfatiza que configurações compartilhadas não podem ser analisadas isoladamente. O catálogo comum de ações depende de componentes configurados nos módulos de negócio. Isso indica um modelo em que a capacidade transversal precisa ser traduzida para estruturas próprias de cada processo.

---

## 17. O que a reunião não permite concluir

A transcrição não fornece detalhes suficientes para afirmar com segurança:

- tecnologia de integração utilizada entre RISCOR e Platea;
- protocolo de comunicação;
- existência de APIs REST, SOAP, mensageria, eventos, arquivos ou conexão direta;
- modelo de autenticação, autorização e gestão de credenciais;
- criptografia em trânsito ou em repouso;
- modelo de privacidade, consentimento e proteção de dados;
- base legal para uso de informações externas;
- origem, qualidade e atualização das fontes de Platea;
- algoritmo, regras ou modelo analítico usado para produzir as severidades;
- tempos máximos de resposta;
- quantidade de tentativas de integração;
- SLA, disponibilidade ou modelo de suporte de Platea;
- tratamento técnico de retentativas;
- mecanismo de monitoramento e alertas;
- persistência, auditoria e histórico dos retornos de Platea;
- regras detalhadas de autorização dos controles técnicos;
- responsáveis por configurar ou aprovar indicadores e ações;
- critérios para confirmar fraude após a marcação automática de um expediente;
- cobertura exata por país, ramo, companhia ou canal;
- significado formal de alguns nomes reconhecidos na transcrição, como RISCOR, TrifCode, Ipad Amagre e “ladisma”.

---

## 18. Conclusões principais

A sessão descreve uma integração configurável de avaliação antifraude, na qual Platea fornece sinais e níveis de severidade, enquanto o sistema transacional define as consequências operacionais em emissão e sinistros.

O elemento central não é apenas a consulta à plataforma externa, mas a cadeia completa de configuração: ativação por ramo técnico, seleção de indicadores relevantes, definição de escopo, mapeamento de dados, classificação de severidade e associação de ações internas.

O desenho permite tratar contextos distintos por país, produto, operação, geografia, canal e tipo de expediente. Ao mesmo tempo, exige forte consistência entre configurações comuns e configurações específicas dos módulos de emissão e sinistros.

A indisponibilidade de Platea é tratada como evento operacional relevante, não como detalhe técnico ignorável: quando a avaliação necessária não pode ser realizada, a operação é retida por um controle técnico de auditoria e depende de decisão autorizada.

Por fim, a reunião evidencia que a efetividade da integração depende de dois fatores: a disponibilidade de dados adequados no processo local e a definição de ações de negócio proporcionais à severidade devolvida pela plataforma.
