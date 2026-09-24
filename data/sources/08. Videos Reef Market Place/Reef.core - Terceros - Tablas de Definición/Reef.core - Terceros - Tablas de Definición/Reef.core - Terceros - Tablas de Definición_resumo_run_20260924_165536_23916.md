# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.core - Terceros - Tablas de Definición.mp4`
**Data de processamento:** 24/09/2026 17:02:20
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Análise estruturada — Capacitação sobre catálogos comuns do módulo de Terceiros no Reef.core

## 1. Síntese executiva

A sessão foi uma capacitação funcional/técnica sobre o módulo de **Terceiros** do **Reef.core**, com foco nos **catálogos de definição comuns às diferentes atividades de terceiros**. O conteúdo não abordou a operação cotidiana de cadastrar ou manter uma pessoa; abordou as configurações que precisam existir antes que essa operação possa ocorrer de forma consistente no sistema.

O ponto central apresentado é que, no Reef.core, um terceiro — pessoa física ou jurídica com alguma relação com a seguradora — é tratado segundo um ou mais **códigos de atividade**. Esse código determina quais capacidades, processos, dados e definições se aplicam àquela pessoa ou organização no ecossistema da plataforma. Por exemplo, um agente pode participar de processos de comissionamento, enquanto um perito ou empregado não necessariamente participa do mesmo processo.

A reunião reforçou que os catálogos do módulo de Terceiros possuem natureza **transversal**: embora sejam configurados a partir desse módulo, podem afetar emissão, sinistros, resseguro, tesouraria, contabilidade e outros módulos. Portanto, a configuração não deve ser tratada como uma responsabilidade isolada do time local de Terceiros; ela precisa considerar os requisitos de toda a companhia e dos processos que utilizarão a identificação ou classificação dos terceiros.

Foram detalhados, entre outros, os seguintes grupos de configurações:

- atividades dos terceiros;
- campos obrigatórios por atividade;
- documentos identificadores;
- agrupamentos, categorias, classificações e códigos de qualidade;
- entidades e meios de cobrança/pagamento;
- controle do registro de meios de pagamento;
- o uso limitado do catálogo multipropósito;
- a diferença entre catálogos transversais e catálogos nativos específicos de determinadas atividades, como a tipologia de agentes.

A sessão foi encerrada antes de concluir todos os catálogos. Foi indicada uma continuação em outra sessão, provavelmente no mês de junho, dependendo da agenda dos envolvidos.

---

## 2. Contexto e antecedentes

### 2.1. Natureza da sessão

A reunião foi apresentada como uma sessão de capacitação sobre os catálogos de definição usados para configurar Terceiros no Reef.core. O treinamento partiu da documentação disponível no Marketplace MAPFRE, em uma área identificada visualmente como **“DOCUMENTACIÓN Reef | Beta”**.

A evidência visual mostra uma estrutura de documentação organizada por perspectivas:

1. Introdução;
2. Documentação;
3. Formação;
4. Certificação;
5. Dicionário de termos.

Também há uma separação entre capacitação funcional e técnica, com temas como arquitetura, metodologia, DevOps, qualidade e Reef core.  
**Rastreabilidade visual:** frame 05, aproximadamente `18:22`.

### 2.2. Escopo delimitado

O facilitador distinguiu dois tipos de conteúdo relacionados ao módulo:

- **Operação:** criação e manutenção de pessoas físicas e jurídicas, incluindo o cadastramento e a manutenção de informações.
- **Definição/configuração:** catálogos, parâmetros e ordem de configuração necessários para que o módulo possa operar funcionalmente.

A sessão ficou restrita à segunda categoria. Assim, não foi uma demonstração detalhada da operação de alta ou manutenção de terceiros, mas sim da modelagem de dados e regras de parametrização que sustentam essas operações.

### 2.3. Público-alvo e relação com negócio

A sessão foi inicialmente classificada pelo apresentador como não destinada ao público de negócio, porque determinados catálogos possuem atributos mais ligados à tecnologia. Ainda assim, ele reconheceu que profissionais de negócio poderiam assistir ao conteúdo quando precisassem compreender ou configurar algum catálogo específico.

Essa ressalva é relevante: a apresentação não separa rigidamente o conhecimento técnico do funcional. Ainda que alguns atributos sejam técnicos, as decisões de configuração possuem consequências funcionais e operacionais.

### 2.4. O que é um “terceiro” no contexto apresentado

No Reef.core, o termo **Terceiro** abrange tanto:

- pessoas físicas;
- pessoas jurídicas.

A condição essencial é que exista alguma relação com a companhia seguradora. A documentação visual confirma essa definição: “En Reef.core se denominan tanto a las personas físicas como a las personas Jurídicas con el término Terceros”.  
**Rastreabilidade visual:** frame 06, aproximadamente `22:01`.

A reunião não detalha todos os possíveis vínculos de uma pessoa ou empresa com a seguradora, mas menciona exemplos como:

- tomadores e segurados;
- agentes;
- peritos;
- inspetores;
- médicos;
- advogados;
- procuradores;
- supervisores;
- tramitadores;
- fornecedores;
- executivos de conta;
- cobradores;
- seguradoras;
- resseguradoras;
- empregados.

---

## 3. Problemas e necessidades tratados

## 3.1. Necessidade de configurar antes de operar

O principal problema tratado é que a operação de cadastro de terceiros depende de uma configuração prévia adequada. Sem essa configuração, o sistema pode não capturar os dados necessários, não aplicar corretamente as regras de negócio ou não disponibilizar capacidades esperadas para determinadas atividades.

A apresentação deixa claro que a sequência de definição importa. Há configurações de instalação e de módulo que precisam anteceder os catálogos específicos de terceiros.

### Relação de causa e efeito apresentada

```text
Configuração incompleta ou inadequada
↓
Dados inconsistentes ou insuficientes sobre terceiros
↓
Regras de negócio e processos posteriores comprometidos
↓
Impacto em módulos que dependem desses dados
↓
Necessidade de governança e visão transversal na definição dos catálogos
```

Essa relação é uma reconstrução contextual baseada nas falas do treinamento, não uma formulação literal apresentada em slide.

---

## 3.2. Risco de configurar apenas para um módulo

O facilitador reiterou que os catálogos de Terceiros não devem ser vistos como pertencentes exclusivamente a esse módulo. A identificação e classificação de terceiros pode ser reutilizada em:

- emissão;
- sinistros;
- resseguro;
- tesouraria;
- contabilidade;
- fornecedores;
- outros processos não especificados.

O risco enfatizado é configurar, por exemplo, um documento identificador pensando em uma necessidade local ou pontual, sem verificar se os demais módulos conseguem ou precisam utilizá-lo.

Um exemplo citado foi o seguinte: não basta criar uma tipologia documental destinada ao resseguro se o módulo de resseguro não a considera. Da mesma forma, se o resseguro precisa de determinado tipo de documento, esse documento precisa estar corretamente definido nos catálogos adequados.

---

## 3.3. Risco de usar catálogos genéricos para funções que já possuem configuração nativa

Outro problema recorrente na sessão foi o uso inadequado de catálogos genéricos — agrupamentos, categorias, classificações ou códigos de qualidade — para representar conceitos que já possuem um catálogo específico no sistema.

O exemplo mais detalhado foi a **tipologia de agentes**. O apresentador explicou que não seria correto usar os catálogos transversais para classificar um agente como exclusivo, empregado, independente, assessor comercial-financeiro ou outro tipo de intermediário, caso exista um catálogo específico e nativo de tipologia de agentes.

A regra implícita é:

```text
Se existe uma definição nativa e específica para uma atividade,
ela deve ser preferida a uma classificação genérica transversal.
```

Essa é uma orientação funcional apresentada durante a capacitação.

---

## 3.4. Risco de identificação ambígua ou uso inadequado de documentos alternativos

A reunião atribuiu grande importância ao catálogo de documentos identificadores. A identificação inequívoca de uma pessoa física ou jurídica é apresentada como uma necessidade que ultrapassa o módulo de Terceiros.

O facilitador destacou que um terceiro pode ter vários documentos ou identificadores, como:

- documento fiscal;
- documento nacional;
- passaporte;
- carteira de motorista;
- identificador de programa de fidelidade;
- outra chave alternativa.

No entanto, a sessão afirmou que documentos alternativos não devem ser usados para identificar pessoas em processos de gestão de apólices, contratos e sinistros. Essa é uma limitação funcional importante: o sistema pode permitir localizar a pessoa por identificadores alternativos, mas isso não significa que todos eles sejam aceitos como identificadores válidos em todos os processos.

---

## 4. Solução e modelo conceitual apresentados

## 4.1. Organização geral da configuração

A apresentação organizou a configuração do módulo de Terceiros em três níveis principais:

```text
Configurações prévias
↓
Definições comuns a todas as atividades
↓
Definições específicas por código de atividade
```

### Configurações prévias

Incluem:

- parâmetros de instalação;
- parâmetros específicos do módulo de Terceiros.

Esses parâmetros podem afetar o comportamento geral da aplicação e não apenas o módulo de Terceiros.

A documentação visual distingue:

| Grupo | Finalidade descrita |
|---|---|
| Parâmetros de instalação | Configurações que afetam transversalmente o comportamento da aplicação |
| Parâmetros do módulo de Terceiros | Configurações que afetam funcionalidade e usabilidade do módulo de Terceiros na instalação Reef.core |

**Rastreabilidade visual:** frame 06, aproximadamente `22:01`.

### Definições comuns

São configurações aplicáveis a várias atividades e, em alguns casos, tanto a pessoas físicas quanto jurídicas. Entre elas estão:

- atividades;
- campos obrigatórios;
- documentos identificadores;
- agrupamentos;
- categorias;
- classificações;
- códigos de qualidade;
- entidades de cobrança/pagamento;
- meios de cobrança/pagamento;
- controle sobre meios de cobrança/pagamento;
- tipos de token;
- regimes fiscais;
- tipologias de rating;
- ratings.

Nem todos esses itens foram explicados em profundidade na reunião.

### Definições específicas por atividade

São definições destinadas a uma atividade concreta. O exemplo mais explorado foi a existência de uma configuração específica para tipologias de agentes.

A documentação visual também indica que existem “definições específicas de terceiros por código de atividade”, mas o texto visível está parcialmente cortado.  
**Rastreabilidade visual:** frame 06, aproximadamente `22:01`.

---

## 4.2. Atividade como eixo central do modelo

O **código de atividade** foi apresentado como o elemento fundamental da configuração de Terceiros.

A atividade representa uma qualidade associada ao terceiro e permite relacioná-lo à sua capacidade de executar determinadas funções no sistema. Não é apenas uma classificação descritiva: ela influencia comportamentos e processos.

Exemplo apresentado:

```text
Terceiro tipificado como agente
↓
Pode entrar automaticamente em processo de cálculo/devengo de comissões
↓
Desde que esse processo esteja implementado para a entidade/país
```

Por contraste, um perito ou empregado não entra automaticamente nesse mesmo processo apenas por existir como terceiro.

### Leitura analítica

Uma leitura possível é que a atividade funciona como um mecanismo de habilitação funcional: ela associa uma entidade de terceiro a capacidades, dados e regras aplicáveis no sistema. Essa leitura é derivada da explicação do facilitador; a reunião não descreve internamente como essa associação é implementada em termos técnicos.

---

## 5. Arquitetura lógica e funcionamento reconstruído

A reunião não apresentou uma arquitetura de infraestrutura — não foram detalhados cloud, banco de dados, mensageria, APIs, ambientes, IAM, CI/CD ou rede. Portanto, a representação abaixo é uma **consolidação funcional**, e não um diagrama técnico literal.

```text
Parâmetros de instalação e do módulo
↓
Catálogos comuns de Terceiros
├── Atividades
├── Campos obrigatórios
├── Documentos identificadores
├── Agrupamentos
├── Categorias
├── Classificações
├── Códigos de qualidade
├── Entidades de cobrança/pagamento
├── Meios de cobrança/pagamento
└── Controle de meios de cobrança/pagamento
↓
Definições específicas por atividade
└── Exemplo: tipologia de agentes
↓
Cadastro e manutenção operacional de Terceiros
↓
Uso transversal pelos módulos da aplicação
├── Emissão
├── Sinistros
├── Resseguro
├── Tesouraria
├── Contabilidade
└── Outros módulos mencionados genericamente
```

### Responsabilidade funcional reconstruída

| Camada | Responsabilidade descrita |
|---|---|
| Parâmetros | Definir comportamentos gerais da instalação e do módulo |
| Catálogos comuns | Padronizar dados, classificações e regras aplicáveis a diversos terceiros |
| Catálogos específicos | Modelar regras e atributos próprios de uma atividade concreta |
| Operação de Terceiros | Criar, manter e consultar pessoas físicas e jurídicas |
| Módulos consumidores | Reutilizar os dados e definições de terceiros nos seus processos |

---

## 6. Componentes e catálogos mencionados

## 6.1. Parâmetros de instalação

### Finalidade

São parâmetros que afetam transversalmente a aplicação. A sessão mencionou que alguns impactam emissão, sinistros, resseguro, tesouraria, fornecedores e aspectos tecnológicos.

### Limites da sessão

O apresentador explicitou que não entraria em detalhe nessa parte. Portanto, a reunião não permite determinar:

- a lista completa de parâmetros;
- o formato de configuração;
- os valores possíveis;
- quais parâmetros afetam cada módulo;
- os mecanismos técnicos pelos quais são aplicados.

---

## 6.2. Parâmetros do módulo de Terceiros

### Finalidade

São parâmetros que afetam especificamente as operações com terceiros. Foram citados exemplos de comportamento, como:

- código de identificação genérico de terceiro;
- possibilidade de múltiplas contas bancárias;
- possibilidade de cartões ou outras informações relacionadas.

### Limites da sessão

Os parâmetros foram mencionados apenas para contextualização. Não houve detalhamento de regras, telas, dependências ou efeitos exatos de cada um.

---

## 6.3. Modelo novo e modelo antigo de Terceiros

O apresentador informou que os participantes normalmente trabalharão com o **novo modelo de Terceiros**. O modelo antigo, associado na fala a “NeutronWeb” ou “TronWeb” — o termo pode ter sido afetado pela transcrição automática — foi descrito como descontinuado ou inferior em funcionalidade.

Também foi indicado que algumas estruturas e agrupamentos de estruturas pertencem mais ao contexto desse modelo anterior e não são o foco da plataforma atual.

### Observação de qualidade da transcrição

Os nomes “Neutron”, “NeutronWeb”, “TronWeb” e variações semelhantes aparecem de modo inconsistente na transcrição. A evidência visual mostra referências a **TRONweb** e **Reef.core**, mas não permite confirmar com segurança a grafia e a relação exata de todos os termos falados.

---

## 6.4. Catálogo de Atividades

### Finalidade

Define as atividades que um terceiro pode exercer no contexto da companhia e do sistema.

A atividade determina ou condiciona:

- as funções que o terceiro pode executar;
- os processos aos quais pode ser associado;
- os dados específicos que podem ser exigidos;
- os catálogos e definições específicos que se tornam aplicáveis.

### Exemplos visíveis de atividades do núcleo

A documentação visual apresenta a seguinte relação:

| Código | Atividade |
|---:|---|
| 1 | Tomadores/Asegurados |
| 2 | Agentes |
| 3 | Peritos |
| 4 | Inspectores |
| 5 | Médicos |
| 6 | Abogados |
| 7 | Procuradores |
| 8 | Supervisores |
| 9 | Tramitadores |
| 10 | Proveedores |
| 11 | Ejecutivos de Cta. |
| 12 | Cobradores |
| 13 | Aseguradoras |
| 14 | Reaseguradoras |
| 15 | Empleados |

**Rastreabilidade visual:** frame 08, aproximadamente `29:19`.

Na fala, foi citado também o exemplo de oficinas com código de atividade 17, associadas a fornecedores. Esse código não aparece na tabela visível do frame, que aparentemente é parcial.

### Reservas de códigos

O apresentador afirmou que os códigos de atividade de `1` a `99`, além dos códigos `110` e `99`, estariam reservados ao núcleo da aplicação. Contudo, a formulação na transcrição é pouco clara e contém provável ruído de reconhecimento de voz.

Assim, é possível registrar com segurança apenas a orientação geral:

> Há códigos reservados ao núcleo do sistema que não devem ser utilizados ou alterados localmente.

A reunião não fornece uma especificação confiável e completa de todos os intervalos ou códigos reservados.

### Propriedades operacionais mencionadas

A documentação visual e a fala mencionam propriedades como:

| Propriedade | Finalidade explicada |
|---|---|
| Permite documentos fictícios? | Indicar se uma atividade pode ser associada a terceiros identificados por documentos definidos como não reais ou fictícios |
| Corresponde a fornecedor? | Habilitar definições próprias de fornecedores, como zonas de atuação, serviços permitidos e horários |
| Código de terceiro | Indicar se é obrigatório existir código interno de identificação |
| Geração automática | Definir se o código interno pode ser gerado automaticamente |
| Código de estrutura | Associar uma estrutura ou programa que permite captura, manutenção e consulta de terceiros dessa atividade |
| Agrupamento de estruturas | Indicar o agrupamento ao qual pertence a estrutura de manutenção |
| Permite geração de documentação | Integrar ou habilitar vínculo com o módulo de notificações/saídas documentais |
| Permite consulta por usuários de agências | Controlar visibilidade para determinados usuários ligados a agências |

**Rastreabilidade visual:** frame 09, aproximadamente `32:59`.

### Fornecedor como propriedade da atividade

Quando uma atividade é marcada como correspondente a fornecedor, o sistema disponibiliza definições específicas de fornecedores. Foram citados como exemplos:

- zonas de atuação;
- serviços permitidos;
- horários.

A reunião mencionou exemplos de prestadores como oficinas, vidraceiros, chaveiros, hospitais e outros fornecedores. Esses exemplos ilustram o tipo de atividade, mas não constituem uma lista oficial completa de fornecedores suportados.

### Código interno do terceiro

A propriedade “Código de Terceiro” determina se a atividade exigirá um código interno para identificar o terceiro. Quando esse atributo estiver ativo, pode ser configurada a geração automática desse código.

O apresentador afirmou que, quando há geração automática de código documental ou de terceiros, a área de tecnologia é responsável por configurar o mecanismo de obtenção da chave.

### Estruturas e agrupamentos de estruturas

A documentação visual atribui à Direção de Tecnologia a responsabilidade de decidir a nomenclatura da estrutura e do agrupamento de estruturas associados à atividade.  
**Rastreabilidade visual:** frame 09, aproximadamente `32:59`.

Entretanto, o apresentador também afirmou que essa parte estaria mais ligada a uma solução ou modelo antigo, de forma que não foi aprofundada.

---

## 6.5. Campos obrigatórios por atividade

### Finalidade

Permite determinar quais informações serão obrigatórias no cadastro de terceiros, de acordo com a atividade associada.

O objetivo declarado é validar automaticamente se a informação necessária está completa no momento da criação ou captura do terceiro.

### Exemplos citados

O facilitador citou situações como:

- e-mail ser especialmente relevante para um segurado;
- telefone de contato ser obrigatório ou não conforme a atividade;
- necessidade de padronizar o preenchimento de nomes;
- evitar que alguns segurados tenham determinados dados preenchidos e outros não;
- reduzir inconsistência e dificuldade posterior de tratamento de dados.

### Implicação funcional

A configuração de obrigatoriedade é apresentada como um mecanismo de qualidade de dados. Ela não apenas bloqueia ou permite uma operação: busca garantir que a base de terceiros tenha informações suficientes e padronizadas para processos futuros.

### Limitações

O apresentador classificou esse catálogo como mais “arcaico” ou mais associado ao contexto anterior, embora tenha afirmado que ele ainda é utilizado. A reunião não detalha:

- a lista de campos possíveis;
- a granularidade das validações;
- o comportamento de mensagens de erro;
- se há obrigatoriedade condicional além do código de atividade.

---

## 6.6. Documentos identificadores

### Finalidade

Este foi apresentado como um dos catálogos mais importantes. Ele define os tipos de documentos utilizados para identificar pessoas físicas e jurídicas nos processos da companhia.

A lógica central é:

```text
Tipo de documento
+
Código/valor do documento
=
Identificação do terceiro
```

### Abrangência transversal

Embora o catálogo esteja dentro do universo de Terceiros, sua utilidade não se restringe a esse módulo. A identificação precisa atender às necessidades de todos os módulos que reconhecem ou processam pessoas e organizações.

### Exemplos citados

Foram mencionados, com possíveis imprecisões de reconhecimento automático:

| País ou contexto | Documento citado |
|---|---|
| Espanha | NIF |
| Chile | RUT, descrito como “Rol Único Tributario” |
| Colômbia | RUT, descrito como “Registro Único Tributario” |
| Malta | TIN, associado a “Tax Identification Number” |

Esses exemplos foram usados apenas para ilustrar a diversidade de identificadores locais. A sessão não fornece uma lista normativa por país.

### Propriedades mencionadas

Foram citadas propriedades relacionadas a:

- tipo e descrição do documento;
- aplicabilidade a pessoa física, jurídica ou ambas;
- documento real ou não real/fictício;
- documento alternativo;
- geração automática do código documental;
- validações locais de formato e regra de identificação.

### Documento real, alternativo e fictício

A explicação diferencia conceitos que não são necessariamente equivalentes:

- **Documento real:** identificado pelo apresentador como um documento que representa uma identificação efetiva, física ou digital.
- **Documento alternativo:** outro identificador que pode apontar para a mesma pessoa, sem ser necessariamente o identificador principal.
- **Documento fictício/não real:** documento ou código que não corresponde a um documento real no sentido exemplificado.

O apresentador usou um exemplo hipotético envolvendo uma pessoa chamada “Juan Pérez Pérez”, que poderia possuir:

- NIF;
- um identificador alternativo chamado “NU”;
- um identificador relacionado a um programa de fidelidade, transcrito como “TEC”.

A nomenclatura do terceiro identificador é incerta devido à qualidade da transcrição.

### Restrição crítica

A reunião afirmou que a captura de documentos alternativos não deve ser permitida em processos de:

- gestão de apólices;
- contratos;
- sinistros.

A interpretação apresentada é que esses processos devem identificar a pessoa por documentos apropriados ao processo, e não por chaves alternativas, como identificadores internos ou de fidelidade.

### Geração automática

Quando a geração automática do código documental é utilizada, a Direção de Tecnologia deve configurar como a chave será obtida. A reunião não explica se essa geração ocorre por sequência, regra, integração ou outro mecanismo.

---

## 6.7. Agrupamentos

### Finalidade

Agrupamentos permitem reunir terceiros que compartilham ao menos uma característica, segundo critérios definidos localmente.

A configuração foi descrita como inicialmente vazia, permitindo que cada implantação estabeleça seus próprios agrupamentos.

### Estrutura mencionada

O catálogo pode considerar:

- companhia;
- código de atividade;
- código de agrupamento;
- descrição;
- descrição abreviada.

### Exemplo citado

Foi dado como exemplo hipotético um agrupamento de clientes vinculados a uma parceria de bancasseguros, como “clientes do Banco Santander” ou “clientes de bancasseguros”.

O apresentador reforçou que esse exemplo não deve ser interpretado como modelo obrigatório de implementação.

### Limite de uso

O critério de agrupamento deve ter uma finalidade posterior de exploração, uso ou tratamento. O facilitador alertou que não faria sentido criar agrupamentos sem propósito funcional, usando exemplos deliberadamente irrelevantes como altura, peso ou cor de cabelo de pessoas físicas.

---

## 6.8. Categorias

### Finalidade

Categorias são outra forma de classificar terceiros. Foram explicadas como classe, tipo, condição ou divisão aplicada a terceiros.

### Aplicação conceitual

O apresentador sugeriu que, para pessoas físicas, categorias poderiam se relacionar a critérios como:

- capacidades;
- responsabilidades;
- antiguidade;
- outros critérios definidos localmente.

Para pessoas jurídicas, poderiam representar aspectos como:

- personalidade jurídica;
- classificações da administração pública;
- outras divisões organizacionais.

Esses usos foram apresentados como exemplos, não como configurações obrigatórias.

### Estrutura mencionada

O catálogo envolve:

- companhia;
- idioma;
- código de categoria;
- descrição;
- indicação de aplicação a pessoa física, jurídica ou ambas.

### Diferença em relação aos demais mecanismos

A diferença relevante é que categoria não é descrita como dependente do código de atividade da mesma forma que agrupamentos e classificações. Portanto, usar categorias para um conceito exclusivo de uma atividade pode ser inadequado.

---

## 6.9. Classificações

### Finalidade

Classificações representam uma terceira forma de tipificar ou agrupar terceiros.

### Estrutura mencionada

Foram citados:

- companhia;
- código de atividade;
- código de classificação;
- descrição.

### Característica distintiva

As classificações, assim como os agrupamentos, são associadas ao código de atividade. Isso permite que uma mesma numeração ou classificação tenha significados diferentes em atividades diferentes.

A reunião reforçou que um código `1`, por exemplo, pode significar uma coisa para agentes e outra para segurados, desde que esteja contextualizado pela atividade.

---

## 6.10. Códigos de qualidade

### Finalidade

O código de qualidade permite classificar terceiros segundo uma avaliação ou característica qualitativa associada a uma atividade.

### Estrutura mencionada

Foram citados:

- companhia;
- código de atividade;
- código de qualidade;
- descrição.

### Exemplo para advogados

Como exemplo hipotético, o facilitador sugeriu que advogados poderiam ser classificados segundo características avaliativas como:

- comprometimento;
- espírito de serviço;
- responsabilidade;
- credibilidade;
- fortaleza de ânimo;
- outros critérios de qualidade.

O apresentador enfatizou que esses exemplos não são uma recomendação obrigatória de configuração.

### Justificativa para usar esse catálogo

A explicação destacou que seria inadequado registrar uma qualidade específica de advogados no catálogo de categorias, pois categorias podem se aplicar a pessoa física, pessoa jurídica ou ambas, e não necessariamente a uma atividade específica.

Para uma tipificação exclusiva de advogados, seria mais coerente usar catálogos associados ao código de atividade, como:

- agrupamentos;
- classificações;
- códigos de qualidade.

### Outro exemplo

Foi sugerido, de forma menos clara na transcrição, que outra atividade poderia ter códigos de qualidade ligados a listas de cumprimento ou critérios relacionados a pessoas politicamente expostas, controles estrangeiros ou listas internas. A transcrição desse trecho é ruidosa e não permite determinar:

- a atividade exata;
- os nomes oficiais de listas;
- se o exemplo corresponde a uma funcionalidade efetiva padrão;
- se eram apenas ilustrações conceituais.

---

## 6.11. Tipologia de agentes

### Papel no treinamento

A tipologia de agentes foi usada como exemplo-chave para explicar a diferença entre catálogos transversais e catálogos específicos de atividade.

### Mensagem principal

Não se deve usar agrupamentos, categorias, classificações ou códigos de qualidade para definir o tipo de agente quando existe uma definição nativa específica para isso.

Foram mencionados como exemplos de possíveis tipos de intermediários:

- agentes exclusivos;
- agentes profissionais MAPFRE;
- delegados;
- empregados;
- independentes;
- assessores comerciais-financeiros.

Esses exemplos foram usados para explicar a natureza do problema; a reunião não oferece a lista oficial de valores permitidos no catálogo de tipologia de agentes.

---

## 6.12. Catálogo multipropósito

### Descrição

O catálogo multipropósito foi comparado pelo apresentador à ideia de uma “tabela de tabelas”: um ponto central para definir valores de listas e tabelas específicas do módulo de Terceiros.

### Situação indicada

Foi dito que esse catálogo nasceu em um contexto associado a uma solução anterior e que estaria em processo de descontinuação ou seria evitado sempre que possível.

A mensagem transmitida foi que as configurações devem migrar, na medida do possível, para definições nativas do modelo mais atual.

### Grau de certeza

A fala contém expressões como “acho que vai ser descontinuado”. Portanto:

> A reunião sugere uma direção de redução ou abandono desse catálogo, mas não estabelece um cronograma, uma decisão formal ou uma data de descontinuação.

---

## 6.13. Entidades de cobrança e pagamento

### Finalidade

Esse catálogo define as entidades comercializadoras dos meios de cobrança e pagamento usados por terceiros.

### Estrutura mencionada

Foram citados:

- companhia;
- idioma;
- código da entidade comercializadora;
- descrição da entidade.

### Exemplos

- entidades bancárias;
- emissores ou entidades relacionadas a cartões de crédito;
- entidades financeiras;
- outras entidades que comercializam ou suportam meios de pagamento.

A reunião não detalha se a entidade é necessariamente uma instituição financeira regulada nem quais validações são aplicadas.

---

## 6.14. Meios de cobrança e pagamento

### Finalidade

Esse catálogo define os meios de cobrança e pagamento com os quais a companhia pode operar em relação a terceiros.

### Tipos citados

Foram mencionados como tipos pertencentes ao núcleo:

- conta bancária;
- cartão;
- pagamento móvel/celular;
- carteira virtual;
- moeda virtual;
- pagamento on-line.

O apresentador afirmou que não seria possível criar localmente tipos adicionais de meios de cobrança/pagamento. Caso um novo tipo fosse necessário, seria preciso levá-lo ao núcleo para análise, validação e eventual disponibilização para outros países.

### Exemplos de subtipos

Foram usados exemplos ilustrativos:

| Tipo | Exemplos de classes ou subtipos citados |
|---|---|
| Conta bancária | conta corrente, conta de valores, conta de poupança, conta on-line |
| Pagamento móvel | Apple Pay, Samsung Pay, Google Pay |
| Cartão | crédito, débito, revolving, pré-pago, carteira/monedero |

Esses exemplos explicam como a classificação pode ser estruturada, mas não representam necessariamente todos os valores oficiais disponíveis na plataforma.

### Implicação operacional

A reunião destacou que, se a configuração prevê apenas contas bancárias, o sistema não deveria permitir cadastrar cartões como meio de pagamento de um terceiro. Isso é apresentado como uma forma de manter a consistência entre configuração e operação.

### Responsabilidade local

O apresentador afirmou que a configuração precisa ser discutida especialmente com a direção de administração local, pois ela impacta operações de cobrança e pagamento e pode ser relevante para migração de carteira.

---

## 6.15. Controle sobre meios de cobrança/pagamento

### Finalidade

Esse catálogo foi apresentado como uma forma de controlar se determinados meios de pagamento podem ser registrados diretamente no sistema ou apenas por uma aplicação externa.

### Motivação apresentada

A explicação relaciona esse controle ao uso de gateways de pagamento. Segundo o facilitador, o Reef não é necessariamente o único local onde os dados de cartões e meios de pagamento são capturados; parte da informação pode estar em entidades ou aplicações externas.

Foi mencionado um nome transcrito como “Toku” ou “Toccu”, mas a qualidade da transcrição não permite confirmar o produto, a empresa ou a grafia.

### Comportamento descrito

O controle permitiria indicar, de forma simplificada, se um meio:

- pode ser registrado manualmente no sistema; ou
- deve ser registrado exclusivamente mediante aplicação externa ou gateway de pagamento.

Também foi mencionado que, dependendo da configuração, haveria considerações adicionais como criptografia dos dados. A reunião não detalha:

- quais dados são criptografados;
- onde ocorre a criptografia;
- algoritmos;
- responsabilidades de segurança;
- escopo de conformidade regulatória;
- integração com gateways.

---

## 6.16. Tipos de token, regimes fiscais e ratings

A documentação visual lista também:

- tipos de token;
- regimes fiscais;
- tipos de qualificações/rating;
- qualificações/rating.

**Rastreabilidade visual:** frame 07, aproximadamente `25:40`.

No entanto, a sessão foi encerrada antes de explicar detalhadamente esses temas. Portanto, não é possível concluir:

- como tokens são usados;
- quais meios de pagamento utilizam tokens;
- como regimes fiscais são associados aos terceiros;
- como ratings são calculados, mantidos ou consumidos;
- se ratings possuem impacto em decisões automáticas.

---

## 7. Modelo de integração e transversalidade

## 7.1. Integração funcional entre módulos

A integração descrita na reunião é predominantemente funcional. Os catálogos de Terceiros fornecem dados e regras que podem ser consumidos por diversos processos da companhia.

```text
Módulo de Terceiros
↓
Catálogos e definições compartilhadas
↓
Uso por processos de negócio
├── Emissão
├── Sinistros
├── Resseguro
├── Tesouraria
├── Contabilidade
├── Fornecedores
└── Outros módulos da aplicação
```

A reunião não descreve o mecanismo técnico dessa integração. Não foram informados:

- APIs;
- eventos;
- mensageria;
- replicação de banco;
- integrações síncronas ou assíncronas;
- contratos de serviço;
- modelos de dados físicos.

Portanto, a conclusão segura é que existe reutilização funcional e transversal de definições, não que exista uma arquitetura técnica específica de integração.

---

## 7.2. Integração com notificações

Foi mencionado que uma atividade pode permitir a geração de documentação e, com isso, conectar-se ao módulo de notificações ou às saídas documentais do sistema.

A reunião não permite determinar:

- que tipos de documentos podem ser gerados;
- como são modelados os templates;
- se a geração é síncrona;
- se há canais de envio;
- se há assinatura digital;
- se a funcionalidade se aplica a todas as atividades.

---

## 7.3. Integração com aplicações externas de pagamento

A apresentação reconhece que dados de pagamento podem ser tratados parcialmente por aplicações externas ou gateways. Isso sugere uma fronteira entre o Reef.core e componentes externos especializados em captura ou processamento de pagamentos.

Contudo, a reunião não detalha:

- o produto ou fornecedor externo;
- interfaces de integração;
- fluxo de autorização;
- tokenização;
- conciliação;
- responsabilidade pelo armazenamento de dados;
- mecanismos de tratamento de falhas.

---

## 8. Modelo operacional apresentado

## 8.1. Configuração antes da carga ou migração

O facilitador mencionou que normalmente se trabalha com uma carteira existente, e não com uma companhia criada do zero. Nesse cenário, a definição prévia de entidades e meios de cobrança/pagamento é necessária para suportar a migração de informações de carteira.

Essa menção não detalha um processo de migração, mas revela que a configuração dos catálogos deve antecipar os dados que precisam ser trazidos para o sistema.

## 8.2. Gestão de catálogos

O modelo operacional sugerido depende de decisões coordenadas entre áreas. O responsável local pelo módulo de Terceiros não deve atuar isoladamente, pois a definição precisa atender aos módulos consumidores.

A reunião não definiu formalmente:

- quem possui permissão operacional para alterar catálogos;
- fluxo de aprovação;
- segregação de funções;
- versionamento;
- auditoria;
- gestão de incidentes;
- procedimento de rollback;
- política de mudanças.

---

## 9. Governança e responsabilidades

## 9.1. Direção de Tecnologia

A Direção de Tecnologia foi mencionada como responsável, em determinados casos, por:

- definir nomenclatura de estruturas e agrupamentos de estruturas;
- configurar a forma de geração automática de chaves ou códigos;
- participar de decisões técnicas relacionadas a atributos e catálogos.

A documentação visual atribui explicitamente à Direção de Tecnologia a responsabilidade sobre nomenclaturas de estrutura e agrupamentos de estruturas.  
**Rastreabilidade visual:** frame 09, aproximadamente `32:59`.

## 9.2. Administração local

A Direção de Administração local foi citada como uma área que deve discutir profundamente a configuração de meios de cobrança e pagamento.

Isso indica que os catálogos financeiros ou de pagamento não são meramente técnicos; eles precisam refletir as operações administrativas da entidade local.

## 9.3. Áreas comerciais e técnicas locais

Ao discutir categorias, o apresentador afirmou que os critérios de categorização podem ser estabelecidos pela direção comercial local ou direção técnica local, conforme o objetivo da classificação.

## 9.4. Núcleo da aplicação

O “núcleo” foi apresentado como a instância que controla determinados elementos padronizados, tais como:

- códigos reservados de atividade;
- tipos de meios de cobrança/pagamento;
- análise de novos tipos solicitados por países.

A reunião sugere uma governança central para evitar que cada país crie livremente estruturas que deveriam ser compartilhadas. Não foram fornecidos detalhes sobre o órgão, equipe, processo decisório ou SLA desse núcleo.

---

## 10. Perguntas e respostas relevantes

## 10.1. Pergunta: uma pessoa pode ter mais de uma figura, como agente e cliente?

### O que a pessoa queria entender

Uma participante do México questionou como o sistema trata uma pessoa que, por exemplo, é ao mesmo tempo agente e cliente/segurado. Ela mencionou que, no México, os dados são unificados por uma chave única irrepetível, o RFC, e que hoje existiria um erro ou impedimento ao combinar essas duas figuras.

### Resposta dada

O facilitador explicou que uma mesma pessoa pode exercer papéis distintos, cada um associado a uma atividade diferente:

- como agente, teria uma atividade;
- como segurado, teria outra atividade;
- poderia também ser empregado, advogado ou exercer outras funções.

O documento identificador, como o RFC, identifica a pessoa única. Já as informações específicas de cada papel são mantidas no contexto da respectiva atividade.

Em termos conceituais:

```text
Pessoa única
↓
Documento identificador único, como RFC
↓
Múltiplas atividades possíveis
├── Segurado
├── Agente
├── Empregado
├── Advogado
└── Outras atividades
↓
Dados específicos armazenados conforme cada atividade
```

### O que a resposta esclarece

A resposta reforça a separação entre:

- **identidade da pessoa**, tratada por documentos identificadores;
- **papel ou atividade da pessoa**, tratada pelo código de atividade;
- **dados específicos de cada papel**, tratados pelas definições da atividade correspondente.

### Limitação reconhecida

O facilitador não analisou o erro concreto mencionado pela participante no México. Ele pediu que a questão fosse comunicada pontualmente para orientação posterior.

Portanto, a reunião não permite concluir:

- se há limitação funcional real na implantação mexicana;
- se o problema é de configuração;
- se é um defeito;
- se é uma regra local;
- se o comportamento decorre do uso do RFC;
- como o caso deveria ser corrigido.

---

## 10.2. Pergunta: é correto usar agrupamentos, categorias ou classificações para tipificar intermediários?

### O que a pessoa queria entender

O facilitador perguntou aos participantes se os catálogos genéricos poderiam ser usados para classificar agentes ou intermediários em tipos como exclusivos, independentes, delegados ou empregados.

### Resposta dada

A conclusão foi que isso seria inadequado quando já existe uma configuração específica de tipologia de agentes.

### O que a resposta esclarece

A resposta estabelece um princípio de modelagem:

> Catálogos genéricos não devem substituir catálogos específicos nativos quando o sistema já disponibiliza uma estrutura apropriada para o conceito de negócio.

Essa orientação evita duplicidade semântica, inconsistência e uso de classificações fora do contexto adequado.

---

## 11. Limitações reconhecidas durante a reunião

| Tema | Limitação ou ressalva |
|---|---|
| Escopo da sessão | Não cobre a operação de criação e manutenção de pessoas físicas e jurídicas |
| Parâmetros de instalação | Foram contextualizados, mas não detalhados |
| Campos obrigatórios | Foram descritos como mais antigos/associados ao modelo anterior, embora ainda utilizados |
| Estruturas | Parte considerada mais ligada a solução anterior e não aprofundada |
| Catálogo multipropósito | Apresentado como legado ou em possível descontinuação |
| Tipos de token | Não explicados; ficaram para continuação |
| Regimes fiscais | Citados visualmente, sem explicação na fala |
| Ratings | Citados visualmente, sem explicação na fala |
| Documento alternativo | Pode identificar ou localizar pessoa, mas não deve ser usado em determinados processos de apólices, contratos e sinistros |
| Meios de pagamento | Tipos são controlados pelo núcleo; criação local de tipos novos não é livre |
| Gateway de pagamento | Mencionado sem detalhamento técnico ou de segurança |
| Caso do México | Não resolvido durante a sessão; ficou pendente de análise pontual |
| Próxima sessão | Indicada de forma aproximada, sem data confirmada |

---

## 12. Riscos e desafios

## 12.1. Riscos explicitamente tratados

### Configuração incorreta com impacto transversal

Configurar dados de Terceiros sem considerar os demais módulos pode gerar incompatibilidades e impedir que outras áreas atendam suas necessidades de identificação, classificação ou processamento.

### Uso de catálogo inadequado

Usar categorias, agrupamentos ou classificações para representar uma definição que possui catálogo próprio pode levar a uma modelagem incorreta e dificultar a manutenção futura.

### Qualidade insuficiente de dados

Não configurar adequadamente campos obrigatórios pode permitir cadastros incompletos ou inconsistentes, dificultando a exploração, análise e operação dos dados.

### Uso indevido de documentos alternativos

Permitir documentos alternativos em processos onde eles não devem ser usados pode comprometer a identificação adequada de pessoas em apólices, contratos e sinistros.

### Flexibilidade excessiva em meios de pagamento

A falta de alinhamento entre os meios configurados e os dados que podem ser cadastrados pode gerar inconsistência operacional — por exemplo, tentar registrar cartões quando a configuração só prevê contas bancárias.

---

## 12.2. Desafios derivados do contexto — análise

Os pontos abaixo são inferências analíticas baseadas na reunião, não declarações literais dos participantes.

### Governança de modelo de dados compartilhado

Como Terceiros atende a múltiplos módulos, mudanças em catálogos compartilhados tendem a exigir coordenação entre várias áreas. Isso sugere um desafio de governança: equilibrar requisitos locais com consistência corporativa e reutilização entre países.

### Migração e padronização de carteira

A menção à migração de carteira indica que os catálogos precisam ser preparados não apenas para novos cadastros, mas também para acomodar informações históricas existentes. Isso pode exigir análise de equivalência entre dados legados e valores permitidos pelo Reef.core.

### Convivência entre modelos ou plataformas

As referências a modelos antigos e novos sugerem um período de transição ou convivência de conceitos. Esse cenário pode aumentar a complexidade de treinamento, configuração e suporte, especialmente quando determinadas estruturas continuam existindo por compatibilidade.

### Dados de pagamento e fronteiras de responsabilidade

A utilização de gateways externos para pagamento sugere desafios de delimitação entre:

- dados mantidos no Reef.core;
- dados mantidos em entidades externas;
- capacidade de captura manual;
- necessidades de controle e proteção da informação.

A reunião não detalha como esses desafios são resolvidos tecnicamente.

---

## 13. Transformações estruturais identificáveis

## 13.1. De configuração isolada para modelo corporativo transversal

A reunião sustenta uma mudança de perspectiva: a configuração do módulo de Terceiros não deve ser entendida como tarefa restrita a uma área ou sistema local.

```text
Visão restrita
“Configurar Terceiros para o próprio módulo”
↓
Visão transversal
“Definir dados e regras reutilizáveis pela companhia”
```

Essa transformação é fortemente sustentada pelas várias referências a emissão, sinistros, resseguro, tesouraria e contabilidade.

## 13.2. De classificação livre para configuração governada

A apresentação enfatiza que, embora haja catálogos flexíveis para classificação local, nem toda necessidade deve ser resolvida por eles. Quando existe um conceito nativo, como tipologia de agentes, deve-se utilizar a estrutura específica.

```text
Necessidade de classificação
↓
Verificar se existe catálogo nativo específico
├── Existe → usar a definição específica
└── Não existe → avaliar agrupamento, categoria, classificação ou código de qualidade
```

## 13.3. De dados locais para identidade reutilizável

O tratamento de documentos identificadores mostra uma direção de centralização conceitual da identidade de terceiros. Uma pessoa pode exercer vários papéis, mas sua identificação permanece única e deve ser reconhecida de forma consistente pelos processos da companhia.

## 13.4. De captura direta para integração com meios externos de pagamento

A explicação sobre gateways de pagamento indica uma possível evolução da captura de dados de pagamento: parte dos meios pode não ser registrada diretamente no Reef.core, mas em aplicações externas controladas por regras de integração e permissão.

A reunião não permite afirmar que essa transformação já está concluída em todas as implantações.

---

## 14. Roadmap e próximos passos citados

| Item | Informação mencionada | Grau de certeza |
|---|---|---|
| Continuidade do treinamento | Haverá nova sessão para continuar os catálogos | Confirmado como intenção |
| Período estimado | Em cerca de 15 dias, três semanas ou durante junho | Não confirmado; fala variável |
| Tipos de token | Seriam abordados posteriormente | Confirmado como conteúdo pendente |
| Catálogo multipropósito | Tendência de não uso ou descontinuação | Indicado, mas sem cronograma formal |
| Modelo antigo | Considerado descontinuado ou inferior funcionalmente | Indicado na fala, sem plano formal apresentado |

A reunião não apresenta roadmap formal com marcos, responsáveis, datas fixas ou critérios de aceite.

---

## 15. Números e códigos citados

> Os valores abaixo foram citados durante a reunião ou extraídos das evidências visuais. Não há indicação de que tenham sido auditados externamente.

| Indicador ou código | Valor mencionado | Contexto |
|---|---:|---|
| Código de atividade | 1 | Tomadores/Asegurados |
| Código de atividade | 2 | Agentes |
| Código de atividade | 3 | Peritos |
| Código de atividade | 4 | Inspetores |
| Código de atividade | 5 | Médicos |
| Código de atividade | 6 | Advogados |
| Código de atividade | 7 | Procuradores |
| Código de atividade | 8 | Supervisores |
| Código de atividade | 9 | Tramitadores |
| Código de atividade | 10 | Fornecedores |
| Código de atividade | 11 | Executivos de conta |
| Código de atividade | 12 | Cobradores |
| Código de atividade | 13 | Seguradoras |
| Código de atividade | 14 | Resseguradoras |
| Código de atividade | 15 | Empregados |
| Código de atividade citado em fala | 17 | Oficinas, como exemplo de fornecedor |
| Faixa citada como reservada | 1 a 99 | A formulação é ambígua; não deve ser usada como especificação normativa sem validação |
| Outros códigos citados como reservados | 99 e 110 | Informação transcrita com ambiguidade |
| Próxima sessão | 15 dias / 3 semanas / junho | Estimativa, sem confirmação |

---

## 16. O que a reunião não permite concluir

A sessão não traz detalhes suficientes para determinar com segurança os seguintes aspectos:

### Arquitetura técnica

- tecnologia de banco de dados;
- modelo físico de dados;
- APIs, eventos, filas ou mensageria;
- protocolos de integração;
- arquitetura de microsserviços ou monólito;
- tecnologia de front-end;
- hospedagem em cloud ou on-premises;
- ambientes e estratégia de promoção;
- mecanismos de alta disponibilidade;
- disaster recovery;
- observabilidade;
- logs;
- monitoramento;
- desempenho e escalabilidade.

### Segurança e privacidade

- modelo de IAM;
- autenticação e autorização;
- perfis de acesso;
- segregação de funções;
- criptografia efetivamente utilizada;
- gestão de chaves;
- retenção de dados;
- conformidade legal;
- tratamento de dados pessoais;
- PCI DSS ou outros requisitos para meios de pagamento;
- auditoria de alterações em catálogos.

### Operação e governança

- responsáveis formais por cada catálogo;
- fluxo de solicitação e aprovação de mudanças;
- versionamento de configurações;
- gestão de incidentes;
- SLAs;
- processo de homologação;
- estratégia de rollback;
- processo de publicação de novos tipos no núcleo;
- critério para aceitar demandas locais de países.

### Regras de negócio

- lista oficial e completa de atividades;
- lista oficial de códigos reservados;
- regras completas para documentos fictícios;
- lista de tipos de documento aceitos por país;
- regras de validação de cada documento;
- comportamento exato de terceiros com múltiplas atividades;
- solução específica para o problema relatado no México;
- lista oficial de meios de cobrança/pagamento;
- comportamento de tokenização;
- cálculo ou manutenção de ratings;
- utilização prática dos regimes fiscais.

---

## 17. Conclusões principais

1. **Terceiros é um domínio transversal no Reef.core.**  
   Embora tenha módulo próprio, seus catálogos suportam diversos processos da companhia e não podem ser configurados de maneira isolada.

2. **O código de atividade é o principal organizador funcional do modelo.**  
   Ele determina o papel do terceiro e influencia capacidades, dados, regras e definições específicas aplicáveis.

3. **Identidade e atividade são conceitos distintos.**  
   Uma pessoa pode ser identificada de forma única por seus documentos e, simultaneamente, exercer múltiplas atividades — como agente e segurado — com informações próprias para cada contexto.

4. **A qualidade dos dados depende de configuração prévia.**  
   Campos obrigatórios, documentos identificadores, classificações e meios de pagamento precisam ser definidos antes da operação para evitar dados incompletos ou inconsistentes.

5. **Flexibilidade não deve substituir modelagem correta.**  
   Agrupamentos, categorias, classificações e códigos de qualidade existem para necessidades de categorização, mas não devem substituir catálogos específicos quando o sistema já oferece uma definição nativa.

6. **Documentos alternativos possuem uso limitado.**  
   Podem apoiar identificação ou localização de uma pessoa, mas não devem ser usados indiscriminadamente em processos de apólices, contratos e sinistros.

7. **A configuração de pagamentos envolve dependências externas e governança central.**  
   Há tipos de meios de pagamento controlados pelo núcleo e possibilidade de integração com gateways externos, o que exige alinhamento entre áreas locais, tecnologia e administração.

8. **A capacitação ficou incompleta por escopo e continuará posteriormente.**  
   Temas como controle de meios de pagamento, tipos de token, regimes fiscais e ratings ainda demandam aprofundamento em sessões futuras.
