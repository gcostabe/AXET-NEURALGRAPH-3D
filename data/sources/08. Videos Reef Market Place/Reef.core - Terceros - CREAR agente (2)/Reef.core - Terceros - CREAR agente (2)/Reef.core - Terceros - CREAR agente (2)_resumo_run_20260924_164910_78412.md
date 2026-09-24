# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.core - Terceros - CREAR agente (2).mp4`
**Data de processamento:** 24/09/2026 16:55:32
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Análise estruturada — Operação de criação de intermediários/agentes no Reef.core

> **Base documental:** transcrição automática de voz e evidências visuais extraídas de slides/telas.  
> **Nota de nomenclatura:** a fala registra variações como “RIFCOR”, “RISCOR” e “Riftcore”; as evidências visuais mostram repetidamente **Reef**, inclusive na URL `...mapfredocument/documentacion_reef.core...` e no logotipo “Reef.M”. Neste documento, será usado **Reef.core** como referência contextual provável, sem assumir que todas as variações da transcrição foram reconhecidas corretamente.

---

## 1. Síntese executiva

A sessão foi um treinamento funcional sobre a segunda parte da operação de criação de **intermediários ou agentes** no Reef.core. O foco não foi a gestão completa de comissões, tesouraria ou emissão de apólices, mas o cadastro e a manutenção do agente enquanto um tipo de **terceiro** dentro da rotina de terceiros do sistema.

A apresentação explica que o registro de um agente combina dois conjuntos de dados:

1. **Blocos comuns a qualquer terceiro**, como dados básicos, identificação, contatos, endereços, documentos alternativos, representantes legais, acionistas e meios de cobrança/pagamento.
2. **Blocos específicos da atividade de agente**, como dados do agente, fontes de produção, escritórios habilitados, quadros de comissão habilitados e subvenções.

A principal mensagem é que o cadastro não é apenas administrativo: atributos de validade, situação, inabilitação, escritórios, canais de produção, meios de pagamento e quadros de comissão afetam o comportamento operacional posterior do sistema. Por exemplo, um agente inabilitado para nova produção não deve conseguir participar da emissão de novas apólices; um agente só pode operar a partir de sua data de validade; e a escolha de escritório e fonte de produção possui finalidades distintas.

A reunião também reforça uma diretriz de governança: campos e catálogos existentes devem ser usados conforme sua finalidade prevista. Reaproveitar atributos para finalidades locais não previstas é apresentado como prática incorreta; quando houver necessidade legítima não coberta pelo núcleo corporativo, o direcionamento é solicitar uma evolução.

---

## 2. Contexto e antecedentes

A sessão dá continuidade a um encontro anterior sobre a operação de agentes. O apresentador menciona que, nas semanas anteriores, já haviam sido discutidas premissas do processo de criação e alguns dos blocos de informação comuns.

O ponto de partida conceitual é que o agente é cadastrado no sistema como um **terceiro**. Ele pode ser uma pessoa física ou jurídica, e sua atividade no Reef.core é associada ao **código de atividade 2**, segundo a fala. O apresentador ressalta que alguns dados podem ser obrigatórios ou habilitados conforme a atividade do terceiro.

A estrutura de cadastro é baseada em blocos de informação organizados por taxonomia. A intenção dessa organização é agrupar dados semelhantes ou necessários para uma finalidade comum, evitando tratar o cadastro como uma tela única e indiferenciada.

As evidências visuais confirmam que a documentação é organizada no marketplace interno, com áreas de documentação funcional, técnica, modelo operacional e sessões Reef:

- **Tela de documentação:** `marketplace.mapfre.com` com menus para Soluções, Arquiteturas, APIs, Eventos, Componentes, Cloud, Documentação e Reef. [Frame 04 — 16:09]
- **Menu lateral da documentação:** “Capacitación funcional Reef”, “Capacitación técnica Reef”, “Modelo operativo Reef” e “Sesiones Reef”. [Frame 05 — 20:10]

---

## 3. Problema central tratado

O problema tratado não é apresentado como uma falha específica de sistema, mas como uma necessidade de modelar corretamente a operação de agentes no cadastro de terceiros.

A dificuldade subjacente é que um agente pode envolver múltiplas dimensões simultâneas:

- identificação como pessoa física ou jurídica;
- dados documentais e documentos alternativos;
- representantes legais;
- acionistas;
- contas, cartões e outros meios de cobrança/pagamento;
- vínculos comerciais;
- escritórios habilitados;
- canais ou fontes de produção;
- regras de comissão;
- subvenções;
- dados fiscais e contratuais;
- situações de habilitação, inabilitação e validade.

Sem uma modelagem consistente, o cadastro poderia gerar incoerências em processos posteriores, como emissão de apólices, cobrança, pagamento de comissões, controle comercial e tratamento de carteira.

### Relação de causa e efeito identificada

```text
Cadastro incompleto, incoerente ou usado fora de sua finalidade
↓
Informações operacionais e comerciais pouco confiáveis
↓
Risco de comportamento incorreto em emissão, pagamentos, comissões e controles
↓
Necessidade de blocos estruturados, catálogos controlados, datas de validade e acessos governados
↓
Operação de criação e manutenção de agentes no Reef.core
```

Essa relação é uma consolidação analítica baseada nas explicações dadas sobre validade, inabilitação, uso de campos e impactos em processos posteriores.

---

## 4. Modelo funcional apresentado

O modelo explicado na reunião pode ser resumido da seguinte forma:

```text
Terceiro
├── Informações comuns
│   ├── Dados básicos
│   ├── Dados de identificação
│   ├── Indicadores de pessoa politicamente exposta
│   ├── Contatos
│   ├── Endereços
│   ├── Documentos alternativos
│   ├── Representantes legais
│   ├── Acionistas
│   └── Meios de cobrança/pagamento
│
└── Informações específicas da atividade de agente
    ├── Dados do agente
    ├── Fontes de produção habilitadas
    ├── Escritórios habilitados
    ├── Quadros de comissão habilitados
    └── Subvenções habilitadas
```

A estrutura acima é uma representação analítica consolidada a partir da fala e das telas. A documentação visual mostra os nove blocos compartilhados, os três blocos específicos ligados à atividade e as duas informações complementares. [Frame 05 — 20:10]

---

## 5. Blocos comuns de informação do terceiro

A apresentação enumera nove blocos comuns à criação de terceiros:

1. Dados básicos;
2. Dados de identificação do terceiro;
3. Informação de pessoa politicamente exposta;
4. Contatos;
5. Endereços;
6. Documentos alternativos;
7. Representantes legais;
8. Acionistas;
9. Meios de cobrança e pagamento.

A apresentação enfatiza que esses blocos são comuns às atividades de terceiros. Nem todos necessariamente serão preenchidos em todos os casos, porque a obrigatoriedade pode depender da atividade e das regras configuradas.

A evidência visual da documentação confirma essa relação e ainda mostra que, para agentes, existem seções específicas de “Información del Agente”, “Fuentes de Producción Habilitadas”, “Oficinas Habilitadas”, “Cuadros de Comisiones Habilitados” e “Subvenciones Habilitadas”. [Frame 05 — 20:10]

---

## 6. Documentos alternativos

### 6.1. Finalidade

Documentos alternativos permitem identificar o mesmo terceiro por códigos que não constituem necessariamente um documento oficial ou “real” de identificação.

O apresentador explica que uma pessoa pode ter um documento principal — por exemplo, NIF, DNI, passaporte ou outro equivalente — e também identificadores adicionais usados em contextos específicos. O objetivo é permitir a localização ou identificação colateral da pessoa, preservando a relação com sua identidade principal.

O exemplo visual mostra uma pessoa identificada por:

| Tipo de documento | Valor |
|---|---|
| NIF — Número de identificação fiscal | `50818773A` |
| NUU — NUUMA | `JUANPE` |
| TEC — TeCuidados | `57732-05-2022` |

A documentação explica que os três registros se relacionam e que, partindo de um documento alternativo, seria possível chegar ao NIF de “Juan Pérez Pérez”. [Frame 06 — 24:11]

### 6.2. Restrição funcional importante

A apresentação foi explícita: a captura de documentos alternativos:

- **não está permitida**; e
- **não deve ser permitida**

nos processos de:

- gestão de apólices e contratos;
- gestão de sinistros e prestações.

Essa restrição também aparece literalmente na documentação visual. [Frame 06 — 24:11]

A finalidade descrita para os documentos alternativos é identificação ou busca por um método alternativo, e não a operação regular de emissão, sinistros ou prestações.

### 6.3. Configuração documental

Segundo a explicação, os tipos de documento vêm de uma tabela de configuração. Essa tabela pode indicar, entre outros aspectos:

- se o documento se aplica a pessoa física;
- se se aplica a pessoa jurídica;
- se pode ser comum a ambas;
- se é considerado documento real;
- se é documento alternativo.

A transcrição sugere que o comportamento do Reef.core é modulado por essa configuração documental.

### 6.4. Atributos mencionados

Para o bloco de documentos alternativos, foram citados:

- tipo de documento;
- chave do documento;
- data de emissão;
- data de vencimento;
- país emissor;
- marca de comprovação/verificação;
- observações;
- data de validade;
- inabilitação.

A documentação visual também menciona “Generación Automática”, indicando que a configuração pode determinar se o código documental será gerado automaticamente. Quando isso ocorrer, a Direção de Tecnologia deve definir e identificar a sequência Oracle a ser utilizada. [Frame 06 — 24:11]

### 6.5. Data de validade e histórico

A data de validade é apresentada como mecanismo de histórico. A lógica explicada é que uma informação pode valer em determinada data e ser substituída por outra posteriormente, permitindo avaliar a situação do terceiro em momentos distintos.

Essa mesma noção de validade reaparece em diversos blocos: dados do agente, representantes legais, escritórios habilitados, fontes de produção, meios de cobrança e quadros de comissão.

### 6.6. Diretriz de uso correto de atributos

O apresentador alerta contra reutilizar campos existentes para finalidades locais diferentes das previstas. A orientação é que, se uma necessidade não estiver coberta pelo modelo, ela deve ser tratada como evolução, em vez de distorcer semanticamente um atributo existente.

Essa é uma diretriz de governança de dados e de produto: o cadastro deve preservar a finalidade original dos campos para evitar perda de consistência e manutenção difícil no futuro.

---

## 7. Representantes legais

### 7.1. Finalidade

O bloco de representantes legais existe para identificar pessoas que possuem representação legal sobre o terceiro, seja ele pessoa física ou jurídica.

A definição apresentada é que representação legal é a faculdade concedida por lei para agir em nome de outra pessoa, recaindo sobre esta última os efeitos dos atos praticados.

A documentação visual registra o objetivo como identificar os representantes legais do terceiro. [Frame 07 — 28:12]

### 7.2. Atividade específica do representante legal

O apresentador afirma que representantes legais devem estar previamente registrados como terceiros com o **código de atividade 45**.

A documentação visual confirma que o nome completo do representante deve corresponder a alguém previamente cadastrado no sistema e identificado pela atividade 45, utilizada no Reef.core para terceiros classificados como representantes legais. [Frame 08 — 32:13]

A apresentação também informa que:

- atividades de **1 a 99** pertencem ao núcleo corporativo;
- essas atividades não devem ser reutilizadas livremente;
- a partir da atividade **100**, as companhias locais podem criar atividades para propósitos que não façam parte da funcionalidade do núcleo.

Não foi apresentada uma lista completa de atividades corporativas, nem a regra detalhada de governança para criação das atividades locais.

### 7.3. Implicação operacional

Para associar alguém como representante legal de um agente ou de outro terceiro, a pessoa precisa primeiro estar cadastrada como terceiro com atividade 45.

O apresentador entende que essa dependência deve constar do manual operacional da companhia, especialmente para áreas que mantêm os dados de agentes. A sequência operacional seria:

```text
Cadastrar a pessoa como terceiro com atividade 45
↓
Identificá-la por tipo e chave de documento
↓
Associá-la como representante legal do terceiro desejado
```

Essa sequência é uma explicação reorganizada do procedimento descrito na reunião.

### 7.4. Tipos de representação legal

Foram mencionados dois tipos corporativos de representação legal:

| Código | Tipo informado | Explicação dada |
|---:|---|---|
| 1 | Representante legal | Pode decorrer de documento formal, estatuto de empresa ou disposição legal. |
| 2 | Apoderado | Nomeado por meio de poder específico, como poder notarial, escritura pública ou documento privado. |

O apresentador afirma que os tipos são corporativos e que uma terceira modalidade exigiria uma solicitação de evolução ao núcleo, porque esses códigos podem estar associados a validações ou tratamentos internos.

### 7.5. Campos citados

A documentação visual mostra os seguintes campos do formulário de representantes legais: [Frame 07 — 28:12]

- tipo de documento do representante legal;
- documento/chave do representante legal;
- nome completo;
- tipo de representante legal;
- data de início;
- data de fim;
- data de validade;
- inabilitado;
- pessoa politicamente exposta;
- pessoa investigada;
- descrição de atividades ilícitas.

A documentação subsequente reforça que:

- o nome completo é obtido a partir do terceiro previamente registrado;
- o tipo de representação legal vem de valores corporativos;
- datas de início, fim e validade têm papéis distintos. [Frame 08 — 32:13]

### 7.6. Marcas de risco e conformidade

Foram mencionadas marcas para:

- pessoa politicamente exposta;
- pessoa investigada;
- envolvimento em atividades ilícitas;
- descrição observacional associada.

O ponto central da explicação é que registrar uma marca não produz automaticamente uma consequência de negócio. A marca disponibiliza informação para que a companhia implemente controles, processos ou tratamentos posteriores conforme suas regras.

A reunião não detalha quais processos consomem essas marcas, quais regras de prevenção à lavagem de dinheiro são aplicadas, nem quais controles são obrigatórios em cada país.

---

## 8. Acionistas

### 8.1. Escopo

O bloco de acionistas é apresentado como aplicável apenas a **pessoas jurídicas**. Para pessoas físicas, esse bloco não é habilitado.

A documentação visual mostra campos para identificação documental, nome, datas, código e percentual de participação, além de marca de pessoa politicamente exposta. [Frame 10 — 40:15]

### 8.2. Objetivo e limitação operacional

O apresentador enfatiza que o bloco não deve ser interpretado como uma tentativa de registrar todos os movimentos societários de grandes empresas em tempo real.

Foi usado o exemplo de companhias com milhares, dezenas de milhares ou milhões de acionistas. A mensagem é que manter manualmente toda a movimentação acionária seria impraticável.

A recomendação apresentada é considerar processamento **batch** para cargas de informação acionária quando houver necessidade de grande volume.

### 8.3. Uso orientado a necessidade de negócio

O bloco é considerado útil quando o negócio precisa controlar acionistas que ultrapassem determinado limite de participação.

Exemplo citado:

- registrar acionistas com mais de **5%** ou **10%** das ações, ou de participação relevante segundo exigência local.

O exemplo não deve ser interpretado como uma regra corporativa obrigatória para todos os países. O apresentador o apresenta como hipótese de uso sujeita à legislação ou necessidade local.

### 8.4. Informações mencionadas

Foram citados os seguintes dados para acionistas:

- tipo de documento;
- chave do documento;
- nacionalidade;
- nome e sobrenomes;
- data de alta como acionista;
- data de baixa como acionista;
- percentual acionário;
- cargo no terceiro;
- data de validade;
- pessoa politicamente exposta;
- inabilitação.

A documentação visual confirma, pelo menos, tipo e chave de documento, nacionalidade, nome e sobrenomes. [Frame 10 — 40:15]

### 8.5. Percentual acionário: ponto em aberto

O apresentador manifesta uma dúvida relevante: o campo de percentual acionário não deixa claro se representa:

- percentual de direitos econômicos; ou
- percentual de direitos de voto.

Ele sugere que esse ponto poderia demandar evolução, mas não apresenta uma decisão, regra definida ou roadmap.

Portanto, não é possível concluir pela reunião qual interpretação é efetivamente utilizada pelo sistema.

### 8.6. Nacionalidade e contexto regulatório

A nacionalidade do acionista é relacionada pelo apresentador a necessidades de prevenção à lavagem de dinheiro e a normas como FATCA, mencionada explicitamente na fala.

A reunião não detalha como essas informações são validadas, quais regras regulatórias concretas são implementadas, nem como a informação é usada em processos de conformidade.

---

## 9. Meios de cobrança e pagamento

### 9.1. Objetivo

O bloco registra meios de cobrança e pagamento associados ao terceiro em diferentes períodos, como:

- contas bancárias;
- cartões;
- pagamentos móveis;
- carteiras eletrônicas;
- outros meios suportados.

O objetivo é armazenar informações necessárias para cobrança, pagamento e tratamento operacional do terceiro.

A tela de documentação mostra que existe uma categoria “TIPO de MEDIOS de COBRO/PAGO”, aplicada a pessoas físicas ou jurídicas perante a entidade seguradora. [Frame 11 — 44:16]

### 9.2. Tipos corporativos e classes locais

A apresentação diferencia dois níveis:

| Elemento | Governança descrita |
|---|---|
| Tipo de meio de cobrança/pagamento | Corporativo, fornecido pelo núcleo; não pode ser removido nem complementado livremente localmente. |
| Classe do meio | Subclassificação que pode ser configurada localmente conforme a realidade do país. |

Exemplo explicado:

```text
Tipo: conta bancária
↓
Classe: conta corrente, conta salário, conta de valores, conta de poupança, conta online etc.
```

Outro exemplo envolve cartões e meios móveis:

```text
Tipo: cartão bancário ou pagamento móvel
↓
Classe: crédito, débito, pré-pago, revolving, carteira digital, solução de pagamento móvel etc.
```

Os nomes de soluções de pagamento citados na transcrição têm ruído de reconhecimento de voz; por isso, não é seguro tratá-los como uma lista oficial de integrações ou produtos suportados.

### 9.3. Entidade comercializadora e entidade bancária

O apresentador distingue:

- **entidade comercializadora**, que pode ser banco ou outra organização;
- **entidade bancária**, quando aplicável;
- país associado à entidade bancária;
- titular do meio de cobrança/pagamento.

O exemplo de cartões vinculados a programas de milhas ilustra que a entidade comercializadora não precisa ser necessariamente o banco.

### 9.4. Tokenização

A apresentação descreve um campo relacionado a tokenização de meios de pagamento, especialmente cartões.

O racional exposto é:

```text
Dados sensíveis do cartão
↓
Tokenização
↓
Redução da necessidade de manter os dados brutos no sistema próprio
↓
Uso de um terceiro detentor dos dados para viabilizar transações online ou móveis
```

O apresentador afirma que a intenção é não manter a informação completa do cartão nos sistemas internos e usar o terceiro que detenha os dados reais durante o pagamento.

A reunião não identifica:

- o fornecedor de tokenização;
- a arquitetura de integração;
- protocolos;
- padrões de segurança;
- regras de criptografia;
- certificações;
- escopo de dados retidos pelo Reef.core;
- fluxos de autorização ou liquidação.

### 9.5. Movimento, uso e moeda

Foram mencionados atributos para indicar:

- se o meio se usa para cobrança, pagamento ou ambos;
- qual o uso específico;
- moeda;
- valor do meio, como IBAN, código SWIFT ou identificador bancário aplicável;
- sequência interna gerada pelo sistema;
- mês e ano de vencimento;
- validade;
- validação;
- inabilitação;
- meio padrão;
- meio prioritário.

O apresentador observa que o campo de uso parece possuir, no ambiente demonstrado, pouca granularidade. Foi mencionado que havia apenas um uso genérico disponível, o que sugere limitação funcional ou de configuração naquele ambiente. Não foi indicada decisão de evolução.

### 9.6. Meio prioritário versus meio padrão

Essa distinção é uma das explicações operacionais mais importantes da sessão.

- **Meio prioritário:** único entre todos os meios de cobrança e pagamento associados ao terceiro.
- **Meio padrão:** definido dentro de uma determinada tipologia de meio.

Exemplo demonstrado:

```text
Terceiro com:
- cartão Visa;
- cartão Mastercard;
- conta bancária.

Meio prioritário:
- um único meio entre os três.

Meio padrão:
- um cartão padrão dentro da tipologia “cartões”;
- uma conta padrão dentro da tipologia “conta bancária”.
```

A apresentação explica que o meio prioritário e o meio padrão podem coincidir, mas não necessariamente precisam ser o mesmo registro.

### 9.7. Validação e inabilitação

A orientação dada é que, depois de um meio ser validado, a operação esperada é não permitir sua alteração livre; o tratamento deveria ser inabilitá-lo a partir de determinada data, caso deixe de poder ser usado.

A justificativa é preservar a lógica e o histórico do cadastro.

---

## 10. Dados específicos do agente

### 10.1. Data de validade do agente

A data de validade define a partir de quando o agente pode atuar.

O exemplo apresentado esclarece que, se o agente tem validade a partir de 1º de janeiro de 2024, ele não pode ser usado como agente principal para emitir uma apólice em data anterior.

A consequência é direta:

```text
Data de validade do agente posterior à data da operação
↓
Sistema não deve permitir usar o agente naquela operação
```

O apresentador reforça que a data de validade também sustenta o histórico de mudanças no perfil ou na classificação do agente.

### 10.2. Situação versus inabilitação

A reunião distingue dois conceitos:

| Conceito | Papel explicado |
|---|---|
| Situação do agente | Pode indicar, por exemplo, ativo, inativo ou retirado. |
| Inabilitação | Identifica restrições e motivos de inabilitação para processos específicos. |

O apresentador destaca que não se deve confundir “inativo” com “inabilitado”.

A inabilitação pode restringir, por exemplo:

- nova produção;
- modificações em apólices;
- atuação sobre a carteira existente.

A definição de quais restrições aplicar é apresentada como decisão comercial e operacional.

### 10.3. Impacto da inabilitação na emissão

Foi afirmado que, se o agente estiver inabilitado para nova produção, o processo de emissão não deve permitir a emissão de apólice nova associada a ele.

A lógica indicada é:

```text
Agente inabilitado
+ motivo/restrição aplicável à nova produção
↓
Tentativa de emissão de nova apólice
↓
Bloqueio do processo pelo comportamento predefinido do sistema
```

A reunião não detalha quais mensagens de erro são exibidas, em quais transações específicas ocorre o bloqueio ou se existem exceções autorizadas.

### 10.4. Tipo, qualidade e classificação do agente

Foram mencionados campos de classificação do agente, incluindo:

- tipo de agente;
- qualidade do terceiro;
- tipo de classificação;
- agrupamento;
- forma de gestão;
- vínculo com a entidade;
- condição de subvencionado;
- escopo de atuação;
- portfólio de produtos;
- outras classificações comerciais.

O apresentador insiste que esses campos devem ter uso coerente e não devem ser preenchidos apenas por formalidade. Como exemplos possíveis — não como configurações obrigatórias — menciona-se a possibilidade de distinguir agentes por:

- atuação local ou global;
- multiproduto ou outro perfil de portfólio;
- agente ou corretor;
- agente subvencionado;
- forma de vinculação;
- responsabilidades operacionais.

Esses exemplos ilustram capacidade de classificação; a reunião não define um catálogo corporativo único para tais atributos.

### 10.5. Escritório comercial padrão

Para cada agente, o sistema exige a associação a um escritório comercial padrão, no terceiro nível da estrutura comercial, segundo a apresentação.

Esse escritório é relevante para a contabilização de prêmios em processos como fechamentos mensais.

A fala distingue claramente o papel do escritório comercial do papel da fonte de produção:

| Elemento | Finalidade explicada |
|---|---|
| Escritório comercial | Onde prêmios são computados ou contabilizados para processos comerciais/fechamentos. |
| Fonte de produção | Permite analisar o canal e o desempenho/margem de intermediação do agente. |

### 10.6. Executivo de conta, assessor e organizador

Foram citadas figuras comerciais que podem se relacionar ao agente:

- executivo de conta;
- assessor;
- organizador.

A explicação dada é que o executivo de conta possui determinada classificação/atividade, mas não recebe comissões como as outras duas figuras mencionadas.

O assessor é exemplificado como alguém que pode apoiar comercialmente o agente em produtos nos quais este tenha menor especialização. O organizador é descrito como outra figura com comissões próprias que pode ser associada ao agente.

A reunião não fornece regras completas de elegibilidade, cálculo de remuneração, papéis de sistema ou relacionamentos formais dessas figuras.

### 10.7. Retenções fiscais

Foram mencionados:

- tipo de retenção;
- indicação de aplicação ou não de retenção;
- dependência de definição pela área financeira/administrativa.

O contexto é a retenção sobre comissões pagas ao agente pelos serviços prestados na comercialização de apólices.

### 10.8. Exclusão do pagamento de comissões

O cadastro permite indicar se o agente será excluído do pagamento de comissões.

O apresentador trata essa opção como uma decisão com influência da área comercial e relacionada ao processo de liquidação, que pode ter periodicidade mensal, semanal, quinzenal, diária ou outra definida localmente.

A reunião não detalha como essa exclusão interage com contratos existentes, ajustes pendentes ou regras retroativas.

### 10.9. Cobrança de prêmios pelo agente

Foi citada uma situação particular de alguns países: agentes podem cobrar prêmios de seus segurados.

Nesse cenário, o valor é associado a uma conta de “prêmios avisados” ligada ao agente. O apresentador observa que a cobrança pelo agente não implica automaticamente o reconhecimento da comissão até que ocorra o depósito.

A reunião não detalha o fluxo contábil, os eventos de conciliação, o tratamento de inadimplência nem a integração com tesouraria.

### 10.10. Dados contratuais e credenciais

Foram citados também:

- identificador contratual do agente;
- data de alta do contrato;
- data de baixa;
- número de colegiação ou registro local;
- data de credenciamento;
- vencimento da credencial;
- observações.

A apresentação ressalta que a data de alta do contrato não precisa ser igual à data de validade do agente.

---

## 11. Escritórios habilitados

### 11.1. Conceito

Além do escritório comercial padrão, o agente pode possuir outros escritórios habilitados.

A associação é feita com data de validade, permitindo que o conjunto de escritórios disponíveis varie ao longo do tempo.

### 11.2. Exemplo apresentado

O exemplo descrito é:

```text
Agente criado com escritório padrão válido desde 01/01/2024
↓
Segundo escritório habilitado em 12/11/2024
↓
Antes de 12/11/2024: apenas o escritório original pode ser utilizado
A partir de 12/11/2024: ambos os escritórios podem ser utilizados
```

Ao emitir uma apólice após a habilitação do segundo escritório, o usuário emissor deverá selecionar a qual escritório a apólice será associada.

### 11.3. Implicação

O mecanismo permite representar expansão, alteração ou coexistência de atuação comercial do agente em diferentes escritórios sem apagar o histórico.

---

## 12. Fontes de produção habilitadas

### 12.1. Conceito

Fontes de produção representam canais pelos quais o agente intermedeia apólices. O apresentador usa o exemplo de atuação por telefone em oposição ao atendimento por escritório.

A fonte de produção não deve ser confundida com o escritório comercial.

### 12.2. Finalidade

A finalidade explicitada é analisar o desempenho ou a margem de intermediação do agente por canal. Essa informação pode apoiar decisões comerciais, como:

- avaliação de desempenho;
- concessão de incentivos;
- subsídios;
- rapéis;
- análise de rentabilidade.

### 12.3. Limite da explicação

Embora a apresentação relacione fontes de produção à estrutura de canais configurada no sistema, ela não detalha:

- quais canais existem;
- como são cadastrados;
- como o desempenho é calculado;
- quais indicadores compõem a margem;
- como a análise alimenta decisões automáticas.

---

## 13. Quadros de comissões habilitados

### 13.1. Finalidade

Os quadros de comissão habilitados definem quais estruturas de comissão podem ser utilizadas para determinado agente durante o processo de emissão.

O objetivo é permitir que o usuário emissor escolha, quando necessário, o quadro adequado para a apólice.

### 13.2. Exemplo

O apresentador usa o seguinte exemplo:

| Produto/Tratamento | Comissão ilustrativa |
|---|---:|
| Automóveis | 10% da prima bonificada |
| Lar/Hogar | 15% |

Os percentuais são exemplos didáticos, não uma política de remuneração declarada.

### 13.3. Associação por tratamento de emissão

A associação não é descrita como direta a um ramo específico, mas ao **tratamento de emissão**.

Foram citados, de maneira ilustrativa, tratamentos como:

- automóveis;
- transportes;
- vida.

O apresentador explica que essa escolha arquitetural já foi feita: os quadros de comissão são relacionados ao agente por meio do tratamento de emissão, não diretamente pelo ramo.

### 13.4. Vários quadros para o mesmo tratamento

Foi dito que um mesmo tratamento, como automóveis, pode ter mais de um quadro de comissões se a estrutura de produtos exigir distinções — por exemplo, entre automóveis e motocicletas.

A reunião não detalha como o processo de emissão escolhe automaticamente ou valida a escolha entre os quadros disponíveis.

### 13.5. Histórico e inabilitação

Assim como em outros blocos, os quadros de comissão possuem:

- data de validade;
- inabilitação;
- possível restrição a nova produção ou carteira.

Isso permite preservar histórico das alterações nas regras aplicáveis ao agente.

---

## 14. Subvenções

### 14.1. Conceito

Subvenções são valores ou benefícios concedidos ao agente em determinados contextos comerciais ou operacionais.

A apresentação cita como exemplo um agente que cobra recibos de apólices em países onde essa prática ocorre. Se o agente atingir determinado desempenho de cobrança, ele pode receber uma subvenção ou rapel.

### 14.2. Possibilidades citadas

Foram mencionadas classificações ou modalidades como:

- subvenção mensal;
- subvenção por cobrança;
- subvenção por anulação de cobrança;
- aplicação por valor;
- aplicação por percentual;
- aplicação por regra de negócio.

Também foram citados:

- período de vigência;
- data de início;
- data de fim ou caducidade;
- moeda;
- valor mínimo a ser cobrado;
- código de conceito de ajuste;
- regra de negócio configurada.

### 14.3. Exemplo de desempenho

O apresentador fornece um exemplo hipotético no qual um agente cobra 58% de 100% das primas previstas e, por aliviar a carga administrativa da seguradora, poderia receber uma subvenção.

O exemplo não define um patamar mínimo, cálculo obrigatório ou regra corporativa.

### 14.4. Papel das áreas

A fala sugere uma divisão de responsabilidades:

| Tema | Área citada ou inferida diretamente da fala |
|---|---|
| Critérios comerciais da subvenção | Área comercial |
| Conceito de ajuste e liquidação | Tesouraria/área administrativa |
| Implementação de lógica de negócio | Tecnologia |
| Pagamento em processo de liquidação de comissões | Operação de liquidação |

A apresentação não define fluxo formal de aprovação, responsáveis nominais, níveis de autorização ou mecanismos de auditoria.

---

## 15. Modelo de integração e dependências entre áreas

A reunião não apresenta uma arquitetura técnica de APIs, eventos, bancos de dados ou mensageria. Portanto, não é possível afirmar um desenho de integração tecnológica completo.

Ainda assim, ela descreve dependências funcionais entre módulos, rotinas e áreas.

```text
Rotina de Terceiros
↓
Cadastro e manutenção de agentes
├── Identificação e dados comuns
├── Dados específicos do agente
├── Escritórios e fontes de produção
├── Meios de cobrança/pagamento
├── Representantes legais e acionistas
└── Referências a comissão e subvenções
↓
Processos consumidores
├── Emissão de apólices
├── Gestão de carteira
├── Tesouraria
├── Liquidação de comissões
├── Processos comerciais
└── Controles e procedimentos locais
```

> **Importante:** este é um modelo lógico consolidado da conversa; não corresponde a um diagrama técnico apresentado literalmente.

### 15.1. Dependência com tesouraria

O apresentador delimita o escopo da sessão: o treinamento está centrado no terceiro/agente. Atividades próprias de tesouraria, como parametrizações específicas para liquidação de comissões, devem ser feitas no módulo ou processo de tesouraria.

### 15.2. Dependência com emissão

Os dados do agente impactam a emissão por meio de:

- data de validade;
- inabilitação;
- escritório habilitado;
- quadro de comissões habilitado;
- associação comercial relevante.

### 15.3. Dependência com área comercial

A área comercial é apontada como provável responsável pela manutenção de agentes e por decisões relacionadas a:

- cadastro;
- habilitação;
- inabilitação;
- classificação;
- fontes de produção;
- escritórios;
- assessores e organizadores;
- subvenções;
- tratamento comercial do agente.

### 15.4. Dependência com área financeira/administrativa

A área financeira ou administrativa é associada a:

- tipos de retenção;
- catálogos ligados a tesouraria;
- meios de cobrança/pagamento;
- conceitos de ajuste;
- pagamentos e liquidação de comissões.

---

## 16. Modelo operacional e governança

### 16.1. Acesso por atividade

A rotina de terceiros é descrita como acessível a muitas pessoas, mas com acessos habilitados por usuário e por atividade.

A expectativa operacional apresentada é que pessoas não ligadas à área responsável não tenham autorização para criar, modificar, inabilitar ou alterar dados de determinada atividade, como agentes.

O apresentador reforça que os impactos de certos atributos exigem que apenas usuários qualificados tenham acesso.

### 16.2. Separação por domínio

A lógica de responsabilidade apresentada pode ser organizada assim:

| Domínio | Responsabilidade indicada |
|---|---|
| Agentes | Área comercial |
| Tramitadores, supervisores e entidades ligadas a sinistros | Área técnica de sinistros |
| Tipos de retenção e elementos de tesouraria | Área financeira/administrativa |
| Lógicas de negócio que exigem implementação/configuração | Tecnologia |
| Manuais operacionais | Áreas de negócio/operacionais da companhia |

Essa divisão é apresentada em termos de práticas esperadas, não como organograma formal obrigatório.

### 16.3. Manual operacional

O apresentador faz uma distinção importante entre:

- manual operacional da companhia; e
- manual de operações de informática.

A necessidade de cadastrar previamente um representante legal, por exemplo, deveria constar do manual operacional do negócio, e não ser tratada apenas como uma instrução técnica de TI.

### 16.4. Configuração local versus núcleo corporativo

A reunião descreve uma fronteira recorrente:

| Elementos predominantemente corporativos | Elementos com espaço para configuração local |
|---|---|
| Tipos de meio de cobrança/pagamento | Classes de meio de cobrança/pagamento |
| Atividades corporativas de 1 a 99 | Atividades locais a partir de 100 |
| Tipos de representação legal | Uso de classificações e catálogos locais quando permitidos |
| Tipos fornecidos pelo núcleo | Procedimentos, regras e práticas locais |

O princípio destacado é que itens corporativos não devem ser alterados localmente por conveniência. Quando houver uma necessidade real não coberta, deve-se solicitar evolução.

---

## 17. Perguntas e respostas relevantes

### 17.1. Pergunta: com qual atividade os representantes legais são cadastrados?

**Contexto da pergunta:** durante a explicação de representantes legais, um participante pergunta sobre a atividade associada a eles.

**Resposta:** representantes legais utilizam a atividade **45**. Essa atividade é específica e não deve ser reutilizada para outras finalidades.

**O que isso esclarece:** um representante legal precisa existir previamente como terceiro em uma atividade específica antes de ser associado a outro terceiro.

---

### 17.2. Pergunta implícita: por que existem documentos alternativos se há documentos oficiais?

**Resposta apresentada:** documentos alternativos permitem identificar o terceiro de forma colateral por códigos não necessariamente aceitos como documento oficial de identificação.

**O que isso esclarece:** documentos alternativos são mecanismos de busca ou correlação cadastral, não substitutos universais do documento principal em processos de emissão, contratos, sinistros ou prestações.

---

### 17.3. Pergunta implícita: o que significa marcar uma pessoa como investigada, politicamente exposta ou relacionada a atividade ilícita?

**Resposta apresentada:** a marca, por si só, não produz automaticamente um efeito de negócio; ela disponibiliza um dado para que a companhia aplique os controles que considerar necessários.

**O que isso esclarece:** o cadastro suporta sinalização de risco e conformidade, mas o comportamento operacional depende de processos adicionais da companhia.

---

### 17.4. Pergunta implícita: o percentual de participação acionária representa direitos econômicos ou direitos de voto?

**Resposta:** o apresentador não consegue afirmar com segurança. Ele sugere que pode haver necessidade de evolução, pois o sistema aparenta possuir apenas um campo genérico para percentual acionário.

**O que isso esclarece:** a semântica do percentual acionário não está suficientemente definida pela reunião.

---

### 17.5. Pergunta implícita: qual a diferença entre escritório habilitado e fonte de produção?

**Resposta:** escritórios estão ligados à estrutura comercial e à contabilização de prêmios; fontes de produção identificam o canal por meio do qual o agente intermediou a operação e permitem analisar desempenho/margem por canal.

**O que isso esclarece:** são dimensões distintas e não devem ser tratadas como sinônimos.

---

### 17.6. Pergunta implícita: qual a diferença entre meio prioritário e meio padrão?

**Resposta:** o prioritário é único entre todos os meios associados ao terceiro; o padrão é definido dentro de uma determinada categoria ou tipologia de meio.

**O que isso esclarece:** um terceiro pode ter vários meios de pagamento ou cobrança, com padrões diferentes por categoria e uma única preferência global.

---

## 18. Números e códigos citados

> Os valores abaixo são os declarados na reunião ou apresentados nas telas; não representam validação externa.

| Elemento | Valor mencionado | Contexto |
|---|---:|---|
| Blocos comuns de informação | 9 | Dados aplicáveis à criação de qualquer terceiro. |
| Blocos específicos inicialmente citados para agentes | 3 | Informação do agente, fontes de produção e escritórios habilitados. |
| Informações complementares do agente | 2 | Quadros de comissão e subvenções. |
| Atividade de agente | 2 | Código citado para a atividade de agentes. |
| Atividade de representante legal | 45 | Código específico para terceiros representantes legais. |
| Faixa de atividades corporativas | 1 a 99 | Atividades do núcleo, não destinadas à criação livre local. |
| Atividades locais | A partir de 100 | Possibilidade citada de criação local para finalidades fora do núcleo. |
| Tipos de representação legal | 2 | Representante legal e apoderado. |
| Exemplo de limite acionário | 5% ou 10% | Exemplos hipotéticos de participação relevante. |
| Exemplo de comissão em automóveis | 10% | Exemplo didático. |
| Exemplo de comissão em lar/hogar | 15% | Exemplo didático. |
| Exemplo de cobrança pelo agente | 58% | Exemplo hipotético de desempenho de cobrança. |
| Exemplo de código de agente | 3321 | Código usado na demonstração de tela. |
| Exemplo de validade de segundo escritório | 12/11/2024 | Data usada no exemplo demonstrado. |

---

## 19. Limitações e ressalvas reconhecidas

### 19.1. Limitações funcionais mencionadas

- Documentos alternativos não devem ser utilizados em gestão de apólices/contratos ou em gestão de sinistros/prestações.
- O cadastro de todos os acionistas e movimentos acionários manualmente é considerado impraticável em organizações com grande volume.
- A informação de acionistas, se não tiver processo consumidor posterior, pode resultar em esforço de captura sem uso operacional.
- O campo de percentual acionário não teve sua semântica totalmente esclarecida.
- O uso disponível para meios de cobrança/pagamento parecia pouco granular no ambiente demonstrado.
- Algumas regras dependem de procedimentos, maturidade operacional e legislação local.
- Marcas de pessoa investigada, pessoa politicamente exposta ou atividade ilícita não produzem, por si só, uma ação automática.
- Uma terceira tipologia de representação legal não pode ser criada localmente sem evolução do núcleo.
- Tipos corporativos de meios de cobrança/pagamento não podem ser livremente complementados ou removidos localmente.
- Dados de cartão devem idealmente ser tokenizados, mas a implementação técnica não foi detalhada.

### 19.2. Correções e incertezas durante a apresentação

O apresentador se corrige em alguns momentos durante a demonstração, principalmente ao explicar:

- datas de validade;
- relação entre inatividade e inabilitação;
- exemplo de configuração de cartão, moeda e tipo de movimento.

Essas correções indicam que alguns exemplos de tela eram demonstrativos e continham configurações propositalmente simplificadas ou inconsistentes.

---

## 20. Riscos e desafios

### 20.1. Riscos explicitamente sugeridos na reunião

| Risco | Consequência possível segundo o contexto apresentado |
|---|---|
| Reutilizar campo para finalidade diferente da prevista | Incoerência semântica e dificuldade de manutenção/evolução. |
| Permitir acesso inadequado à rotina de terceiros | Alterações com impacto em emissão, carteira, comissões e operação comercial. |
| Cadastrar dados sem processo consumidor | Esforço operacional sem benefício efetivo. |
| Não respeitar datas de validade | Uso de agente, escritório, meio de pagamento ou condição comercial fora do período aplicável. |
| Confundir situação e inabilitação | Aplicação incorreta de bloqueios ou permissões operacionais. |
| Manter dados sensíveis de cartão sem proteção adequada | Exposição indevida de informações de pagamento; a tokenização é apresentada como resposta desejável. |
| Tentar manter acionistas manualmente em grande escala | Operação inviável e desatualizada. |

### 20.2. Desafios derivados do contexto — análise

> Esta seção representa interpretação analítica, não afirmações literais da reunião.

1. **Governança de catálogos e campos:** a coexistência de tipos corporativos, configurações locais e necessidades regulatórias de cada país exige disciplina para não fragmentar o modelo.

2. **Qualidade e temporalidade dos dados:** como muitos blocos possuem validade, início, fim, inabilitação e histórico, a operação depende de processos maduros para evitar dados conflitantes.

3. **Integração entre áreas:** a manutenção do agente cruza comercial, financeiro, tesouraria, tecnologia, emissão e sinistros. Falhas de coordenação podem resultar em cadastros tecnicamente válidos, mas operacionalmente incompletos.

4. **Escalabilidade de dados societários:** o uso de processos batch é apresentado como alternativa plausível, mas a reunião não detalha origem dos dados, frequências, validações ou reconciliação.

5. **Segurança de dados de pagamento:** a direção de tokenização reduz a exposição, mas o desenho efetivo de segurança depende de decisões técnicas que não foram mostradas.

---

## 21. Transformações estruturais observadas — análise

> As leituras abaixo são inferências fundamentadas no conjunto de explicações, não declarações literais dos participantes.

### 21.1. De cadastro estático para cadastro operacional

O terceiro não é tratado apenas como um registro mestre de identificação. No caso dos agentes, seu cadastro determina condições de atuação, limites operacionais, meios de pagamento, comissionamento, canais e vínculos comerciais.

```text
Cadastro básico
↓
Cadastro com validade, regras, classificações e controles
↓
Cadastro como insumo para operações de negócio
```

### 21.2. De personalização irrestrita para configuração governada

A fala reforça repetidamente que certos elementos pertencem ao núcleo e não devem ser alterados ou usados fora da finalidade prevista. Isso indica uma direção de padronização e governança de produto, na qual necessidades locais devem ser tratadas por configuração permitida ou evolução formal.

### 21.3. De uma visão única de agente para uma visão multidimensional

O agente é modelado simultaneamente como:

- terceiro;
- pessoa física ou jurídica;
- participante comercial;
- recebedor potencial de comissões;
- titular ou usuário de meios de pagamento;
- entidade ligada a escritórios e canais;
- sujeito a retenções, regras contratuais e classificações;
- possível objeto de controles de risco e conformidade.

Essa multiplicidade explica a quantidade de blocos e dependências apresentadas.

### 21.4. De dados sem temporalidade para histórico controlado

A repetição do conceito de data de validade mostra uma orientação para preservar mudanças ao longo do tempo, em vez de simplesmente sobrescrever dados.

---

## 22. O que a reunião não permite concluir

A apresentação não detalha suficientemente os itens abaixo. Portanto, não devem ser presumidos em documentos futuros:

### Arquitetura técnica

- tecnologia de banco de dados usada pelo Reef.core, exceto a referência visual a uma sequência Oracle para geração automática de código documental;
- modelo de deployment;
- infraestrutura cloud;
- containers, Kubernetes ou orquestração;
- APIs específicas;
- eventos ou mensageria;
- integração por arquivos;
- protocolos de comunicação;
- modelo de dados físico;
- mecanismos de versionamento ou CI/CD.

### Segurança e identidade

- modelo de IAM;
- papéis e permissões detalhados;
- autenticação;
- autorização;
- auditoria;
- retenção de logs;
- criptografia;
- gestão de chaves;
- certificações ou aderência formal a padrões de pagamento.

### Operação

- SLA;
- horários de processamento;
- frequência de cargas batch;
- mecanismos de monitoramento;
- tratamento de incidentes;
- processo de aprovação para criação, alteração ou inabilitação de agentes;
- trilha de auditoria de alterações;
- procedimentos de reversão.

### Regras de negócio

- cálculo completo de comissões;
- fórmula de subvenções;
- critérios de seleção automática de quadros de comissão;
- regras de retenção fiscal por país;
- regras obrigatórias para acionistas relevantes;
- uso concreto das marcas de PEP, investigação ou atividade ilícita;
- critérios formais de bloqueio de carteira;
- catálogo completo de fontes de produção, escritórios, qualidades e classificações.

### Roadmap

A única indicação futura clara é que, na semana seguinte, seria apresentado um tema transcrito como “SIGWRF” ou termo semelhante. O reconhecimento de voz não permite identificar esse assunto com segurança.

Também é mencionado que futuras sessões poderiam detalhar a atividade de segurados, apresentada como uma das mais relevantes para o trabalho dos participantes.

---

## 23. Conclusões

A reunião apresenta o cadastro de agentes no Reef.core como um processo funcional amplo, baseado no modelo de terceiros e estruturado por blocos de informação comuns e específicos.

O entendimento essencial é que:

1. **Agentes são terceiros**, mas possuem atributos adicionais que controlam sua atuação comercial e operacional.
2. **A temporalidade é central**: datas de validade, início, fim e inabilitação sustentam histórico e bloqueios corretos.
3. **Escritórios e fontes de produção têm funções distintas**: um se relaciona com estrutura comercial e contabilização de prêmios; o outro, com canal e análise de intermediação.
4. **Representantes legais e acionistas exigem atenção à governança**, sobretudo por dependerem de cadastro prévio, atividade específica ou grandes volumes de dados.
5. **Meios de cobrança/pagamento exigem classificação, validação e proteção**, com tokenização apresentada como direção para dados sensíveis.
6. **Comissões e subvenções dependem de cadastros habilitadores**, mas seus cálculos e liquidações pertencem a processos mais amplos, especialmente ligados a tesouraria e operação financeira.
7. **O núcleo corporativo deve ser respeitado**: tipos e atividades corporativas não devem ser alterados ou reutilizados para improvisar soluções locais.
8. **O cadastro tem impacto direto no negócio**: decisões aparentemente cadastrais podem bloquear emissão, limitar carteira, determinar escritórios disponíveis, alterar pagamentos ou condicionar incentivos.

A sessão, portanto, não é apenas um treinamento de telas. Ela transmite um modelo de governança funcional no qual a qualidade do cadastro de terceiros sustenta operações comerciais, financeiras, contratuais e de conformidade em toda a seguradora.
