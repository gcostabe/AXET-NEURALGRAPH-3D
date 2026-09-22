# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `0016-DC-DEFINICION-Programas 1.mp4`
**Data de processamento:** 20/09/2026 13:30:02
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada da sessão sobre configuração de programas, menus, operações e elementos de interface do RISCOR

> **Nota de fidelidade:** a transcrição contém variações aparentes de reconhecimento de voz para o nome da plataforma, registradas como “Rizkor”, “Riftcore” e formas similares. Neste documento, será utilizado **RISCOR/Rift Core** quando o contexto indicar a mesma plataforma, preservando a ressalva de que a grafia oficial não pode ser confirmada exclusivamente pela transcrição.  
>
> Termos como **Neutron**, **TronWeb**, **TRN**, **SLS**, **MPE**, **MMX**, **PL**, **GDC**, **TSI** e outros foram mantidos conforme aparecem no conteúdo, sem expansão além do que foi explicado durante a sessão.

---

## 1. Síntese executiva

A sessão apresentou, sob uma perspectiva predominantemente funcional e de configuração, como o RISCOR organiza e disponibiliza funcionalidades para seus usuários por meio de **programas**, **operações**, **menus**, **papéis de acesso**, **textos**, **etiquetas**, **mensagens** e **listas de valores**.

O ponto central não foi o desenvolvimento de uma funcionalidade isolada, mas a explicação de um conjunto de catálogos de configuração que sustenta o funcionamento da aplicação. Esses catálogos permitem distinguir o que pertence ao núcleo padrão da plataforma do que foi personalizado localmente por uma instalação ou país; definir programas e suas versões; controlar quais programas são acessíveis por cada papel; estruturar menus; configurar operações no Neutron; e manter elementos de interface multilíngue.

A apresentação enfatizou que o sistema possui uma longa trajetória e convive com dois mundos tecnológicos:

- **TronWeb**, descrito como uma solução mais antiga e que, apesar do nome, não deve ser interpretada como uma aplicação web moderna;
- **Neutron**, apresentado como o ambiente mais atual, organizado em operações e com uma arquitetura de camadas que será detalhada posteriormente por outra equipe ou módulo de formação.

A mensagem principal foi que, embora muitos elementos possam parecer apenas tabelas de configuração, eles têm efeitos diretos sobre:

- segurança e segregação de funções;
- experiência de navegação do usuário;
- consistência funcional;
- reutilização do núcleo padrão;
- manutenção futura;
- evolução dos programas;
- qualidade de traduções e textos;
- governança sobre personalizações locais.

A reunião também deixou claro que criar ou alterar programas não deve ser tratado como uma atividade isolada. Em geral, depende de configurações prévias, convenções de nomenclatura, atribuição de papéis, integração com a arquitetura e respeito à separação entre o núcleo TRN e os elementos locais de cada instalação.

---

## 2. Contexto e antecedentes

### 2.1. O RISCOR como plataforma para operações de seguros

O sistema foi apresentado como uma plataforma que suporta operações de uma companhia de seguros. Segundo a explicação, ele pode contemplar, entre outras capacidades:

- gestão de apólices;
- gestão de contratos;
- gestão de sinistros;
- tesouraria;
- contabilidade interna;
- integração com uma ferramenta corporativa mencionada como “SAV”, aparentemente utilizada para contabilidade.

A fala deixa claro que o RISCOR não foi descrito como a solução mais especializada possível para cada domínio, mas como uma plataforma capaz de gerir diversas operações de uma seguradora de maneira abrangente.

### 2.2. Núcleo padrão e personalizações locais

Um dos conceitos estruturantes da sessão foi a distinção entre:

- o **núcleo** da plataforma;
- as configurações, extensões ou personalizações de cada instalação local.

O núcleo é associado ao código **TRN**. Ele contém o código padrão compartilhado e não deve ser modificado diretamente por países ou instalações locais.

A necessidade de diferenciar o padrão do núcleo das adaptações locais aparece como consequência do fato de que cada país, entidade ou operação pode ter demandas específicas. Portanto, código e configurações padrão podem coexistir com código e configurações locais.

A apresentação resumiu esse princípio da seguinte forma:

```text
Núcleo TRN
↓
Funcionalidade padrão compartilhada
↓
Coexistência com configuração ou código local
↓
Adaptação às necessidades do país ou instalação
```

### 2.3. Convivência entre TronWeb e Neutron

A sessão descreve um cenário de transição ou coexistência entre dois ambientes:

| Ambiente | Como foi caracterizado |
|---|---|
| TronWeb | Ambiente mais antigo, associado a programas, menus e convenções históricas. Apesar do nome, foi dito explicitamente que não é “web” no sentido moderno; foi descrito como cliente-servidor “puro e duro”. |
| Neutron | Ambiente mais atual, associado a operações, painéis de informação, componentes gráficos e arquitetura em camadas. |

Foi mencionado que algumas instalações já possuem parte das funcionalidades em Neutron e parte em TronWeb. Portanto, o atributo que indica o tipo de instalação — TronWeb ou Neutron — não necessariamente representa integralmente a realidade de uma instalação híbrida.

A própria pessoa que conduzia a apresentação afirmou não saber com segurança como esse atributo é mantido em instalações que convivem com os dois ambientes. A conclusão explícita foi que o atributo mais relevante para distinguir o padrão do local é o **código da instalação**, e não o indicador TronWeb/Neutron.

---

## 3. Objetivo da sessão

A sessão buscou explicar os catálogos e regras necessários para que programas possam ser criados, configurados, disponibilizados em menus e utilizados no frontal da aplicação.

O conteúdo foi organizado em torno da seguinte necessidade:

```text
Necessidade funcional ou local
↓
Criação ou adaptação de um programa / operação
↓
Configurações prévias em catálogos transversais
↓
Inclusão em menus
↓
Atribuição de papéis de acesso
↓
Configuração de textos, mensagens, etiquetas e listas de valores
↓
Disponibilização controlada no frontal
```

A apresentação não estabeleceu uma regra universal para decidir quando um novo programa deve ser criado. A resposta foi explicitamente contextual: depende da necessidade local e da funcionalidade já existente no sistema.

---

## 4. Problemas e necessidades identificados

## 4.1. Necessidade de ampliar funcionalidades sem alterar o núcleo

O sistema precisa permitir que países ou instalações complementem suas funcionalidades sem modificar diretamente o código padrão do núcleo.

Isso leva à necessidade de identificar claramente:

- o que é padrão TRN;
- o que foi criado ou alterado localmente;
- qual instalação é responsável por cada elemento.

### Consequência

Sem essa separação, a manutenção e a evolução do sistema poderiam tornar-se difíceis, especialmente em ambientes com múltiplos países, instalações ou fornecedores.

---

## 4.2. Necessidade de configurar programas em uma ordem coerente

Foi enfatizado que programas dependem de catálogos pré-existentes. A criação de programas não é apresentada como o primeiro passo.

Antes de definir ou disponibilizar um programa, podem ser necessárias configurações de:

- instalação;
- módulos;
- operações;
- painéis;
- textos;
- papéis;
- menus;
- permissões;
- listas de valores.

A ordem é importante porque várias configurações posteriores dependem de referências previamente existentes.

---

## 4.3. Risco de permissões inadequadas

A apresentação tratou a atribuição de papéis e acessos como um tema relevante de segurança e governança.

Foi dado o exemplo de um usuário que deveria atuar como subscritor júnior e que, por erro de configuração, poderia acabar com permissões de caixa ou tesouraria.

A preocupação não foi apresentada apenas como falha operacional. Foram mencionadas possíveis consequências como:

- exposição indevida de dados;
- alteração indevida de informações;
- acesso a recursos financeiros;
- risco de fraude;
- possibilidade de multas para a seguradora.

---

## 4.4. Risco de inconsistência entre múltiplos pontos de configuração

O modelo de segurança não está concentrado em um único ponto. O acesso de um usuário pode depender de combinações de configurações, tais como:

- papéis atribuídos ao usuário;
- programas associados aos papéis;
- permissões de consulta ou alteração;
- restrições de visualização;
- estrutura comercial visível;
- estrutura de produtos visível;
- controles implementados dentro dos próprios programas.

A apresentação alertou que configurações contraditórias podem gerar reclamações ou comportamentos inconsistentes. Por exemplo:

```text
Papel concede acesso ao programa
↓
Outra configuração restringe visualização ou alteração
↓
Usuário recebe comportamento inesperado
↓
Surge inconsistência operacional ou reclamação
```

---

## 4.5. Dificuldade de manutenção em um ecossistema grande

Foi mencionado que o ambiente possui milhares de programas e milhares de tabelas. A fala cita, de forma aproximada, “duzentas e tantas” tabelas — possivelmente “duas mil e tantas”, pois a transcrição registra “2000 y pico tablas” — mas não foi apresentado um número formalmente validado.

A preocupação central é que, em um sistema desse porte:

- nomes inadequados dificultam manutenção;
- atributos mal nomeados dificultam busca e entendimento;
- ausência de documentação compromete continuidade;
- personalizações fora da nomenclatura padrão criam dívida operacional.

O exemplo usado foi o de um atributo chamado “Pepito Pérez” em vez de um nome relacionado à sua finalidade. Nesse caso, quem criou a solução pode saber o significado, mas futuros mantenedores não necessariamente entenderão sua função.

---

## 5. Modelo conceitual apresentado

A reunião apresenta o RISCOR como uma plataforma altamente configurável, na qual diversos elementos são controlados por catálogos.

A lógica pode ser reconstruída da seguinte maneira:

```text
Instalação
├── Distingue núcleo TRN de configuração local
│
├── Módulos
│   └── Organizam domínios funcionais
│
├── Operações
│   └── Representam fluxos operacionais habilitados
│
├── Programas
│   ├── Podem ser menus, tarefas, consultas ou outros tipos
│   ├── Possuem código, versão e tipologia
│   └── Podem ser vinculados a funções específicas
│
├── Papéis
│   └── Determinam quais programas podem ser acessados
│
├── Menus
│   └── Organizam programas e operações em uma navegação funcional
│
├── Painéis
│   └── Estruturam visualmente blocos de informação
│
├── Textos, etiquetas e mensagens
│   └── Permitem apresentação multilíngue e contextual
│
└── Listas de valores
    └── Representam conjuntos curtos e fechados de opções codificadas
```

Essa representação é uma consolidação analítica do conteúdo da reunião, e não um diagrama literal exibido na apresentação.

---

# 6. Catálogos e componentes mencionados

## 6.1. Instalações do RISCOR

### Finalidade

O catálogo de instalações identifica a versão ou origem das informações de configuração que possuem esse atributo no modelo de dados.

A principal finalidade é distinguir:

- elementos do núcleo;
- elementos personalizados por uma entidade seguradora ou instalação local.

### Código de instalação

O código da instalação foi apresentado como o atributo mais importante desse catálogo.

Segundo a explicação, o núcleo técnico é identificado pelo código **TRN**. O código TRN representa o padrão do núcleo, e não uma seguradora real ou uma operação completa de seguros.

O objetivo é permitir a coexistência entre:

- configurações padrão do núcleo;
- personalizações locais de um país ou instalação.

### Códigos citados

Foram citados alguns códigos de instalação:

| Código mencionado | Interpretação apresentada |
|---|---|
| TRN | Núcleo padrão / RISCOR Standard |
| SLS | Associado historicamente a uma aquisição; a transcrição sugere relação com “Seguros La Seguridad” e menciona posteriormente Mapfre Venezuela |
| MPE | Mapfre Peru |
| MMX | Mapfre México |
| PHP | Código associado ao caso de Mapfre Filipinas |

A apresentação também menciona que um código pode refletir uma denominação histórica da entidade adquirida. O caso de MMX foi associado a Mapfre México, com referência a uma denominação anterior que a transcrição registra de forma pouco clara.

### Instalações por país

Foi dito que, em um país, idealmente deveriam coexistir apenas dois códigos principais:

```text
TRN
+
Código local da instalação
```

Isso permitiria distinguir com clareza aquilo que pertence ao núcleo daquilo que foi modificado ou criado localmente.

### Tipo de instalação: TronWeb ou Neutron

O catálogo possui um atributo que indica se a instalação está em TronWeb ou Neutron. Porém, foi reconhecido que esse atributo pode não refletir adequadamente cenários híbridos.

A apresentação não permitiu concluir:

- se instalações híbridas usam um valor específico;
- se o atributo é atualizado ao migrar para Neutron;
- se existe uma regra corporativa para essa classificação.

---

## 6.2. Módulos

### Finalidade

O catálogo de módulos identifica domínios funcionais da aplicação e sustenta convenções de nomenclatura utilizadas em programas, tabelas, objetos e outros elementos técnicos.

O identificador numérico do módulo tem importância especial na nomenclatura histórica dos programas, principalmente em TronWeb.

### Uso na nomenclatura

A lógica apresentada foi a seguinte:

```text
Código do programa
↓
Indica módulo funcional
↓
Permite identificar a área responsável ou o domínio de negócio
↓
Facilita entendimento e manutenção futura
```

Foi dado como exemplo que determinados códigos de programa podem revelar se pertencem à emissão, sinistros, faturamento ou outro módulo.

### Módulos mencionados

A transcrição traz diversos exemplos. Alguns nomes ou siglas foram reconhecidos com possíveis distorções, portanto a tabela abaixo preserva a interpretação disponível:

| Sigla ou referência | Finalidade aparente |
|---|---|
| TRN | Núcleo |
| SSS / SLS | Sistema de segurança; há variação na transcrição |
| DC | Dados comuns |
| EM | Emissão geral |
| ET | Emissão de transporte |
| EV | Emissão de vida |
| EA | Emissão de automóveis |
| ED | Emissão de diversos |
| TS / TSS | Tramitação de sinistros |
| GC | Gestão de cobranças / tesouraria, conforme contexto |
| RE | Resseguro |
| CEA | Cosseguro; a transcrição também registra uma segunda associação pouco clara |

A transcrição não permite confirmar a lista completa e oficial de módulos nem todas as expansões das siglas.

---

## 6.3. Painéis de informação por companhia

### Finalidade

Os painéis organizam visualmente informações de objetos de negócio, como:

- apólices;
- sinistros;
- recibos.

A intenção é agrupar dados de natureza semelhante em blocos, facilitando captura e consulta.

### Exemplo apresentado

No contexto de emissão de uma apólice de automóveis, foram mencionados painéis como:

- informação básica da apólice;
- informação geral;
- intervenientes;
- informações contratuais;
- dados do tomador;
- escritório comercial;
- fonte de produção.

Os campos e a composição dos painéis dependem da configuração do produto e dos atributos variáveis da apólice.

### Propriedades mencionadas

| Propriedade | Finalidade descrita |
|---|---|
| Companhia | Contextualiza o painel dentro de uma entidade |
| Código do painel | Identificador do painel |
| ID do ícone | Ícone associado ao painel |
| Módulo | Módulo funcional ao qual o painel pertence |
| Texto | Identificador de etiqueta ligado ao texto exibido |
| Tipo de componente gráfico | Define como o componente será interpretado visualmente |
| Estado colapsado | Determina se o painel aparece aberto ou fechado |

### Tipos de componente gráfico

Foram mencionados tipos fechados de componentes, tais como:

- input text;
- checkbox;
- calendário;
- input number;
- painel;
- acordeão.

A sessão enfatizou que se trata de uma lista de tipos definida e limitada. Não foi apresentada a lista oficial completa nem os códigos numéricos de cada tipo, exceto a referência de que o tipo associado a “painel” seria o valor 5 em determinado contexto.

### Dependência de arquitetura

O ID de ícone e certos aspectos visuais devem seguir diretrizes do departamento de arquitetura. O apresentador afirmou não possuir um documento de referência nem domínio sobre os valores disponíveis.

---

## 6.4. Operações do núcleo

### Conceito

As operações foram definidas como fluxos operacionais habilitados no sistema.

Elas são particularmente relevantes para o mundo Neutron, embora o RISCOR como um todo inclua elementos dos dois ambientes.

### Criação de novas operações

Foi afirmado que é possível criar uma operação ou associá-la a um programa, mas essa ação deve ser feita em conjunto com a arquitetura.

A justificativa é que as operações têm natureza transversal e não devem ser tratadas como iniciativas isoladas de uma única equipe.

### Propriedades mencionadas

| Propriedade | Finalidade |
|---|---|
| ID da operação | Identificador da operação |
| Idioma | Suporte à apresentação multilíngue |
| Nome / descrição | Descrição funcional da operação |
| Módulo | Módulo ao qual a operação pertence |
| Convenção de nomenclatura | Regra para codificação do nome da operação |
| Indicador relacionado a marcas | Define se determinada funcionalidade se aplica à operação, conforme o ramo |

### Convenção de nomenclatura

Foi citado um exemplo aparentemente relacionado à emissão de apólice:

```text
ISU + PLI
```

A fala sugere que:

- uma parte representa um verbo ou ação;
- outra parte representa o objeto de negócio;
- as abreviações seguem uma convenção formal;
- a nomenclatura deve ser respeitada ao criar novas operações.

A apresentação não detalhou oficialmente a tabela completa de verbos, objetos ou siglas.

---

## 6.5. Funcionalidade de marcas

A sessão antecipou uma funcionalidade que seria abordada em outro momento: as **marcas**.

Segundo a explicação, determinadas operações podem considerar uma funcionalidade de alerta vinculada ao ramo de seguro e à operação em execução.

### Exemplo usado

Foi usado o exemplo hipotético de uma pessoa que, em uma apólice anterior, teria cometido fraude em uma comunicação de sinistro. Ao solicitar uma nova apólice ou orçamento no futuro, o sistema poderia apresentar um alerta, caso a seguradora tenha configurado essa regra.

A reunião não afirmou que esse caso específico esteja implementado dessa forma em todos os países. Ele foi apresentado como exemplo para explicar o objetivo da funcionalidade.

### Leitura funcional

```text
Pessoa ou objeto com informação relevante registrada
↓
Nova operação em ramo configurado
↓
Verificação da aplicabilidade de marcas
↓
Possível alerta ou ação antecipada
↓
Decisão da seguradora sobre o tratamento
```

### Limitação

Não foram detalhados:

- os tipos de marcas disponíveis;
- os critérios técnicos de detecção;
- o modelo de armazenamento;
- os fluxos de decisão posteriores ao alerta;
- quais países ou ramos utilizam a funcionalidade.

---

## 6.6. Programas da aplicação

### Conceito

Programas são elementos executáveis utilizados no frontal da aplicação. Podem representar funcionalidades, consultas, tarefas, menus ou outros tipos de comportamento.

Foi dito que programas podem ser criados quando necessário, por exemplo, para disponibilizar uma nova tarefa ou uma nova funcionalidade em um menu.

### Propriedades mencionadas

| Propriedade | Descrição |
|---|---|
| Código do programa | Identificador funcional e técnico do programa |
| Versão | Permite manter histórico e múltiplas versões |
| Tipologia | Define o tipo de programa |
| Nome | Nome associado ao programa |
| Indicador de tarefa | Indica se o programa pode ser executado como tarefa |
| Lógica Java | Mencionada como atributo, sem detalhamento adicional |
| Indicador de programa externo | Aparentemente obsoleto |
| Código TronWeb | Atributo histórico, descontinuado |
| ID de ícone | Ícone exibido na interface |
| Número de sessões | Controle mais ligado ao TronWeb |
| Status | Atributo histórico de ativo/inativo, descrito como descontinuado |

### Versionamento de programas

O catálogo permite definir versões de um mesmo programa. Isso possibilita manter histórico ou disponibilizar variantes em momentos diferentes.

Foi explicitamente reconhecido que a reunião não definiu:

- quando uma nova versão deve ser criada;
- quais critérios de versionamento devem ser utilizados;
- como o versionamento de programas se relaciona com outras práticas de versionamento;
- qual é o acordo operacional entre fornecedor e Mapfre sobre esse tema.

A questão foi deixada como ponto que deveria ser discutido e formalizado.

### Tipologias e legado

Foram citadas tipologias históricas, como:

- diálogo modal;
- mensagens;
- FRM;
- INP;
- TAR, associada a tarefas.

A fala observou que algumas classificações são antigas e refletem a história de mais de trinta anos da plataforma. Isso não foi apresentado como um julgamento de qualidade, mas como uma realidade decorrente da longevidade e diversidade de contextos atendidos pelo sistema.

### Tarefas

Programas do tipo tarefa podem ser executados por meio de um lançador de tarefas. Esses programas podem ou não possuir parâmetros.

A transcrição menciona um exemplo anterior em que um lançador não exibiu determinados resultados, aparentemente por erro do ambiente de formação. Não foram detalhados os códigos ou objetos associados.

---

## 6.7. Programas por idioma

O catálogo principal de programas não contém diretamente o idioma em sua estrutura apresentada. Por isso, foi criado um catálogo adicional para associar programas a idiomas.

### Estrutura conceitual

```text
Programa
+
Idioma
+
Nome apresentado
```

Esse catálogo permite que o mesmo programa seja exibido com nomes distintos em diferentes idiomas.

### Motivação

A criação posterior desse catálogo foi apresentada como uma evolução necessária para que a plataforma pudesse ser efetivamente multilíngue.

---

## 6.8. Associação entre papéis e programas

### Finalidade

Esse catálogo relaciona programas aos papéis que podem acessá-los.

A lógica é:

```text
Usuário
↓
Possui um ou mais papéis ativos
↓
Papéis possuem acesso a programas
↓
Usuário visualiza e executa apenas o que seus papéis permitem
```

### Tipos de acesso citados

O acesso pode incluir, conforme a configuração:

- visualização;
- consulta;
- consulta e modificação;
- restrições de visualização.

### Exemplos de papéis

Foram citados, como exemplos:

| Papel | Possíveis capacidades |
|---|---|
| Tramitador de sinistros | Acesso a programas de sinistros, potencialmente com segmentação por senioridade ou especialidade |
| Consultas gerais | Acesso a programas de consulta de apólices, recibos, ordens de pagamento e sinistros |
| Emissor | Acesso a programas de emissão, suplementos e atividades relacionadas |

### Segregação de funções

A apresentação ressaltou que diferentes usuários podem precisar de diferentes níveis de acesso. Por exemplo:

- um tramitador de danos materiais pode ter necessidades diferentes de um tramitador de responsabilidade civil;
- determinados casos podem exigir intervenção de advogados;
- usuários de consulta podem não ter permissão para visualizar informações econômicas;
- o simples acesso ao programa não garante que todos os atributos sejam visíveis.

### Dependência de implementação

A reunião foi clara ao afirmar que o programa precisa implementar adequadamente os controles de segurança.

Não basta configurar papéis no menu ou no catálogo de acessos se o programa não respeitar essas configurações.

Essa foi uma das mensagens técnicas mais importantes da sessão:

```text
Configuração de papel e acesso
+
Implementação do controle dentro do programa
=
Controle efetivo de segurança
```

Caso o programa não implemente a validação necessária, a configuração de segurança pode não produzir o efeito esperado.

---

## 6.9. Relação entre programas, permissões e arquitetura

Houve uma pergunta sobre se os programas precisam ser desenvolvidos com uma estrutura específica para validar papéis e permissões, ou se a configuração de acesso seria suficiente.

A resposta foi que a configuração, por si só, não é suficiente.

Além da associação entre papéis e programas, os programas devem contemplar:

- controles de acesso;
- permissões de consulta;
- restrições sobre estrutura comercial;
- restrições sobre produtos;
- controles de visualização de objetos, atributos ou conceitos.

Foi dito que a ausência dessa implementação pode ser consequência de erro, omissão ou falta de consideração adequada no desenvolvimento.

Também foi reconhecido que nem todos os programas existentes necessariamente implementam esses controles de maneira uniforme.

---

## 6.10. Relação entre programas, operações e TronWeb

Foi apresentado um catálogo que conecta elementos do mundo TronWeb a operações e permissões utilizadas no contexto Neutron.

Esse catálogo foi descrito como uma forma de relacionar:

- código de programa;
- tipologia de operação funcional;
- URL de acesso;
- operação;
- acessibilidade pelo menu;
- aplicação associada.

### Interpretação apresentada

No caso de programas originados no TronWeb, permissões legadas podem ser consideradas para uso em operações do Neutron.

Quando há permissões próprias do Neutron, a operação precisa estar alinhada ao atributo que identifica a operação correspondente.

A explicação foi reconhecida pelo próprio apresentador como complexa ou “enredada”, recomendando que a compreensão seja complementada pela observação direta da tabela no PL.

### Aplicações citadas

Foram mencionadas aplicações como:

| Código | Interpretação apresentada |
|---|---|
| GDC | Gestor de conceitos |
| TSI | Novo frontal de tesouraria |

A lista completa de aplicações não foi apresentada.

---

## 6.11. Menus e organização da navegação

### Objetivo

Menus agrupam e organizam programas e operações para facilitar o uso funcional da aplicação.

A apresentação reforçou que a organização funcional é preferível à exibição de uma lista extensa e desestruturada de programas.

### Benefícios apontados

- melhora a navegação;
- torna as funcionalidades mais encontráveis;
- organiza programas por domínio;
- facilita manutenção;
- facilita associação de papéis;
- torna a experiência mais compreensível para usuários.

### Estrutura no TronWeb

No TronWeb, foi citado um menu principal com código semelhante a:

```text
AM00000
```

A partir dele, podem existir menus de continuação ou submenus. Os menus também são programas, identificados por uma tipologia específica.

Foi recomendada a coerência entre:

- programas classificados como menu;
- nomenclatura de menu;
- módulo funcional;
- sequência numérica.

Não foi confirmado se existe uma chave estrangeira ou validação formal no modelo de dados para garantir essa coerência.

### Estrutura no Neutron

No Neutron, o menu principal foi identificado como:

```text
Main
```

A partir do `Main`, são configurados menus intermediários e operações funcionais.

A mesma tabela pode conter tanto menus quanto operações, dependendo do nível da estrutura.

### Estrutura lógica do Neutron

```text
Main
↓
Menus de primeiro nível
↓
Submenus
↓
Operações funcionais
```

Foram citadas, como exemplos de opções de primeiro nível, áreas relacionadas a:

- emissão;
- sinistros;
- tesouraria;
- terceiros;
- tarefas;
- relatórios e cartas;
- outras funções cuja designação foi afetada pela transcrição.

---

## 6.12. Ordenação dos menus

A ordem dos registros de menu determina a sequência em que itens são exibidos na interface.

Esse ponto foi tratado como importante especialmente quando se pretende inserir uma nova operação em uma posição intermediária do menu.

### Cenário simples

```text
Novo programa é incluído no final do menu
↓
A ordem existente pode ser preservada
```

### Cenário mais complexo

```text
Novo programa precisa aparecer no meio do menu
↓
É necessário revisar a sequência dos itens existentes
↓
A apresentação dos itens é reorganizada
```

Foi mencionado que esse tipo de alteração já causou dificuldades para alguém, reforçando a importância de entender o mecanismo de ordenação antes de modificar um menu existente.

---

## 6.13. Operações favoritas

### Finalidade

Operações favoritas permitem que usuários acessem mais rapidamente funcionalidades utilizadas com frequência.

A ideia é reduzir a navegação por estruturas de menu potencialmente longas.

### Funcionamento apresentado

O usuário pode marcar ou desmarcar operações como favoritas por meio do menu contextual da aplicação.

Essas operações passam a aparecer em uma área mais direta, equivalente conceitualmente a um atalho ou ambiente de trabalho personalizado.

### Relação com o TronWeb

No TronWeb, foi mencionada uma possibilidade anterior de deixar opções recorrentes no “escritório” ou área principal do usuário. No Neutron, a funcionalidade de favoritos foi apresentada como uma solução semelhante em finalidade, embora não necessariamente idêntica em implementação.

---

## 6.14. Mensagens

### Finalidade

O catálogo de mensagens permite que a interface comunique:

- advertências;
- observações;
- erros;
- informações;
- validações funcionais.

### Estrutura mencionada

As mensagens são identificadas por elementos como:

- companhia;
- código de instalação;
- idioma;
- código da mensagem;
- texto;
- marca de controle histórica, atualmente obsoleta.

### Separação entre núcleo e local

Mensagens TRN pertencem ao núcleo. Mensagens locais podem ser criadas para a instalação do país ou entidade correspondente.

### Exemplo

Foi citado um exemplo em que, durante o cadastro de um terceiro — como segurado, condutor, agente ou corretor — o sistema valida a existência do tipo de documento informado.

Caso o valor não exista no catálogo de documentos identificadores, pode ser exibida uma mensagem identificada como:

```text
TRN 2001-2001
```

A interpretação apresentada foi “código inexistente”.

A transcrição não permite confirmar a estrutura oficial desse código, apenas o exemplo informado durante a sessão.

---

## 6.15. Etiquetas e ajudas

### Finalidade

Etiquetas identificam textos exibidos em campos, formulários, programas e páginas da aplicação. O objetivo é permitir que a interface apresente textos consistentes e multilíngues.

### Estrutura conceitual

As etiquetas podem ser identificadas por:

```text
Companhia
+
Instalação
+
Módulo
+
Idioma
+
Código da etiqueta
```

A combinação entre módulo e código de etiqueta foi apresentada como relevante para que a arquitetura identifique o texto correto a ser exibido.

### Separação entre TRN e local

Etiquetas TRN pertencem ao núcleo e não devem ser modificadas localmente, pois alterações poderiam comprometer a padronização do núcleo em diferentes instalações.

### Relação com o modelo de dados

Foi recomendado associar etiquetas a colunas de banco de dados quando aplicável. O objetivo é facilitar:

- entendimento semântico;
- busca de elementos;
- manutenção;
- consistência do texto entre telas;
- reaproveitamento de conceitos.

### Exemplo conceitual

Se várias tabelas utilizam um campo com um nome padronizado para identificar uma operação, e esse campo está associado a uma etiqueta conhecida, torna-se mais fácil preservar coerência na interface.

O contraponto foi novamente o risco de nomes arbitrários, como “Pepito Pérez”, que não revelam a finalidade do atributo.

---

## 6.16. Traduções e qualidade multilíngue

Uma pergunta relevante abordou se a tradução de uma etiqueta recém-criada é automática ou se precisa ser feita pelo desenvolvedor.

A resposta foi explícita: o apresentador não soube confirmar o modelo operacional de tradução nem quem seria responsável por ele no relacionamento entre NTT e Mapfre.

Foram mencionadas possibilidades, sem confirmação de processo oficial:

- existência de um serviço de traduções na Mapfre;
- busca de textos já traduzidos na aplicação;
- tradução manual;
- uso de ferramentas de tradução;
- apoio de IA, mencionado informalmente como possibilidade.

### Risco destacado

O apresentador citou exemplos de traduções incorretas ou inadequadas, como:

| Termo de negócio | Tradução inadequada citada |
|---|---|
| Bouquet, no contexto técnico ou de ramo | Tradução literal como “bouquet”/ramo de flores em inglês, conforme o exemplo apresentado |
| Pool de resseguro | Tradução literal como “piscina” |

A mensagem central é que tradução literal sem contexto de negócio pode produzir erros graves de entendimento, especialmente em instalações internacionais.

### Conclusão operacional

Embora não exista processo confirmado na reunião, a orientação implícita foi:

```text
Antes de criar nova tradução
↓
Verificar se já existe tradução apropriada
↓
Usar contexto funcional e de negócio
↓
Evitar tradução literal sem validação humana
```

---

## 6.17. Textos da interface

Além das etiquetas de campos, foi explicado um catálogo para textos exibidos em menus e operações.

### Exemplos de textos

Foram mencionadas opções como:

- emissão;
- sinistros;
- terceiros;
- gestor de conceitos;
- relatórios e cartas.

### Convenção recomendada

Quando o texto representa uma operação funcional, o nome deveria refletir a ação executada, utilizando verbos como:

- consultar;
- emitir;
- criar;
- abrir expediente;
- modificar.

Também foram recomendados:

- respeito à ortografia;
- uso correto de acentos;
- evitar abreviações;
- consistência com a nomenclatura de operações.

A apresentação reconhece que essas normas podem não ser seguidas de maneira uniforme em todos os elementos existentes.

---

## 6.18. Listas de valores

### Conceito

Listas de valores representam conjuntos pequenos, fechados e codificados de opções.

Elas são utilizadas quando não é necessário criar uma tabela de negócio específica para um conjunto de valores reduzido.

### Exemplos mencionados

- tipos;
- tipo de envio;
- tipo de parentesco;
- tipo de retenção;
- tipos de efeitos de quotas;
- classes de gestores;
- momento processual de liquidação de sinistros.

### Estrutura

A estrutura conceitual envolve:

```text
Lista de valores
↓
Código da lista
↓
Opções possíveis
↓
Ordem de apresentação
↓
Descrição por idioma
```

### Separação entre TRN e local

Como em outros catálogos, existe código de instalação para distinguir valores padrão TRN de valores locais.

A orientação predominante foi:

> Tipos e listas de valores do núcleo normalmente não devem ser alterados, ampliados ou modificados sem entendimento do impacto.

Foi recomendado perguntar em caso de dúvida, pois uma mudança aparentemente pequena pode comprometer funcionalidades do núcleo.

### Exemplo: tipo de envio

Foi usado um exemplo de “tipo de envio” com quatro valores possíveis, exibidos durante a emissão de uma apólice.

Também foi explicado o uso de um valor genérico, aparentemente `999`, para fazer uma mesma lista valer para todos os ramos, evitando duplicar os mesmos valores para cada ramo.

### Exemplo: parentesco

Foi citado um tipo de parentesco com valores como:

- próprio;
- cônjuge;
- descendente;
- ascendente;
- colateral.

### Exemplo: fase judicial em sinistros

Foi citado um tipo relacionado à liquidação de sinistros em fase judicial, com opções como:

- em processo;
- demanda;
- sentença;
- outros.

A sigla e os valores específicos foram descritos como exemplo de que códigos podem ser alfanuméricos, não apenas numéricos.

---

# 7. Arquitetura e funcionamento lógico

## 7.1. Arquitetura funcional consolidada

A sessão não apresentou um diagrama formal de arquitetura. Ainda assim, é possível consolidar o modelo funcional discutido da seguinte forma:

```text
Usuário
↓
Papéis ativos
↓
Menus e favoritos
↓
Programas / Operações
↓
Controles de acesso e visualização
↓
Camadas da aplicação
↓
Objetos, tabelas, pacotes e demais elementos internos
↓
Dados e configurações de negócio
```

Essa representação é uma leitura analítica baseada nas explicações dadas e não deve ser entendida como arquitetura técnica oficial.

---

## 7.2. Diferença entre TronWeb e Neutron

| Aspecto | TronWeb | Neutron |
|---|---|---|
| Natureza apresentada | Ambiente legado / cliente-servidor | Ambiente mais atual |
| Organização principal | Programas e menus | Operações e menus |
| Relação com interface | Programas históricos | Componentes gráficos e operações |
| Controle de sessões | Relevante | Menos relevante segundo a apresentação |
| Menus | Menu principal e submenus | `Main`, menus intermediários e operações |
| Arquitetura | Não detalhada; descrita como não-web | Associada a serviços e camadas, a serem explicadas posteriormente |

### Ressalva

A reunião não detalhou tecnologias específicas, protocolos, bancos, padrões de API ou mecanismos de autenticação. Portanto, não é possível concluir, a partir desta sessão, a arquitetura técnica completa de nenhum dos dois ambientes.

---

## 7.3. Camadas e integração

Em resposta a uma pergunta, foi dito que no Neutron existem camadas e que será necessário conhecer essas camadas em um momento posterior da formação.

Foi mencionado que, por baixo da interface, existem elementos como:

- PL;
- tabelas;
- pacotes;
- papéis;
- usuários;
- instâncias.

Também foi dito que não se deve acessar diretamente o modelo de dados sem passar pela camada correspondente.

A fala sugere um direcionamento arquitetural de encapsulamento e uso de camadas, especialmente em Neutron. Contudo, a transcrição não detalha:

- quais são todas as camadas;
- como elas se comunicam;
- quais protocolos são utilizados;
- como autenticação e autorização são propagadas;
- se há APIs REST, SOAP, mensageria ou outros mecanismos.

---

## 7.4. Integração externa

Foi mencionado que, para integração com frontais externos — como um possível frontal de banco-seguro ou do Banco Santander em algum país — devem ser utilizadas APIs apropriadas.

A fala indica que o sistema possui mecanismos de integração e APIs, mas não apresenta:

- catálogo de APIs;
- padrões de autenticação;
- formatos de payload;
- modelo de autorização;
- políticas de versionamento;
- contratos de integração;
- limites de consumo.

Portanto, a existência de APIs foi citada, mas seu funcionamento não foi detalhado.

---

# 8. Modelo operacional e de manutenção

## 8.1. Criação e alteração de configurações

A criação de novos elementos deve considerar dependências entre catálogos. Por exemplo, para criar uma nova operação ou programa, pode ser necessário definir ou validar:

- instalação;
- módulo;
- operação;
- programa;
- versão;
- idioma;
- texto;
- etiqueta;
- papel;
- menu;
- ordem de menu;
- permissões;
- controles de acesso internos;
- listas de valores associadas.

---

## 8.2. Participação da arquitetura

A arquitetura aparece como área responsável ou consultada para temas como:

- criação de operações;
- IDs de ícones;
- convenções de nomenclatura;
- códigos de aplicações;
- entendimento das camadas do Neutron;
- boas práticas de desenvolvimento;
- possível governança sobre estruturas e componentes.

A reunião sugere que alterações relevantes devem ser tratadas de forma conjunta entre as equipes locais e a arquitetura.

---

## 8.3. Evolução e versionamento

O catálogo de programas suporta versões, mas o modelo operacional de versionamento não foi definido.

Não foi esclarecido:

- quando usar uma nova versão;
- como descontinuar versões;
- como garantir compatibilidade entre versões;
- como relacionar versões de programa a versões de núcleo;
- como distribuir versões entre países;
- como tratar rollback.

---

## 8.4. Obsolescência de atributos

Vários atributos ou mecanismos históricos foram descritos como obsoletos ou descontinuados, embora ainda permaneçam no modelo de dados.

Exemplos mencionados:

| Elemento | Situação descrita |
|---|---|
| Indicador de programa externo | Descontinuado |
| Código do programa TronWeb | Descontinuado |
| Controle de status para envio ou não de programas | Descontinuado |
| Marca de controle em mensagens | Obsoleta |
| Marca de controle em etiquetas | Obsoleta |

A presença desses atributos no modelo não significa, segundo a explicação, que ainda sejam utilizados operacionalmente.

---

# 9. Governança, segurança e responsabilidade

## 9.1. Governança do núcleo

O núcleo TRN deve ser preservado como padrão compartilhado. Alterações locais precisam ser identificadas pela instalação correspondente, sem modificar diretamente o padrão do núcleo.

Isso indica uma preocupação com:

- padronização;
- reutilização;
- comparabilidade entre instalações;
- manutenção centralizada;
- evolução controlada.

---

## 9.2. Governança de segurança

A segurança depende de múltiplas configurações coerentes:

```text
Usuário
+
Papéis
+
Programas permitidos
+
Modo de acesso
+
Restrições de visualização
+
Estrutura comercial
+
Estrutura de produtos
+
Controle implementado no programa
```

A falha em qualquer um desses pontos pode gerar exposição indevida.

---

## 9.3. Governança de dados e nomenclatura

Foi mencionada a existência de uma área de gestão de dados e de algo transcrito como “obviereitor”, possivelmente o nome de uma ferramenta, repositório ou processo. Não é possível confirmar sua grafia ou finalidade exata.

O princípio transmitido foi:

```text
Codificar de forma padronizada
↓
Reutilizar elementos existentes
↓
Evitar criar conceitos duplicados
↓
Preservar entendimento ao longo do tempo
```

---

## 9.4. Modelo de relacionamento futuro

O apresentador mencionou que o modelo de relacionamento entre a organização e a Mapfre pode mudar ao longo do tempo, mas afirmou não saber como seria esse modelo nos próximos anos.

Portanto, não foram estabelecidas decisões formais sobre:

- responsabilidades futuras;
- divisão de atividades entre fornecedores;
- manutenção de TronWeb;
- manutenção de Neutron;
- modelo de suporte;
- governança de traduções;
- evolução das configurações locais.

---

# 10. Perguntas e respostas relevantes

## 10.1. Instalações híbridas entre TronWeb e Neutron

### Pergunta

Em instalações que possuem simultaneamente TronWeb e Neutron, qual valor deve ser utilizado no atributo que identifica o tipo da instalação?

### Resposta

O apresentador afirmou não saber com certeza. Supôs que, após uma transição, talvez fosse utilizado Neutron, mas não tratou isso como informação confirmada.

### O que isso esclarece

O atributo TronWeb/Neutron não deve ser considerado uma fonte plenamente confiável para representar a realidade de instalações híbridas. O código de instalação foi reforçado como elemento mais relevante para distinguir núcleo e personalização local.

---

## 10.2. Programas precisam validar papéis internamente?

### Pergunta

A associação de programas a papéis é suficiente, ou os programas precisam ter estrutura própria para validar permissões e acessos?

### Resposta

A resposta foi que não basta associar o programa a um papel. O programa deve implementar os controles apropriados de acesso, visualização e restrição.

Também foi mencionado que devem ser considerados:

- parâmetros de consulta;
- estrutura comercial;
- estrutura de produtos;
- controle sobre objetos, atributos ou conceitos visíveis.

### O que isso esclarece

A segurança é responsabilidade tanto da configuração quanto da implementação. A configuração de menu e papéis não substitui a validação dentro do programa.

---

## 10.3. Neutron possui serviços ou camadas para permissões?

### Pergunta

Neutron foi entendido como um frontal com serviços e uma camada que gerencia permissões, papéis e configurações. Seria necessário consumir esses serviços ao gerar telas?

### Resposta

A resposta confirmou, de forma geral, que a arquitetura e as camadas serão explicadas posteriormente. Foi dito que existem tabelas, pacotes, papéis, usuários e instâncias abaixo da interface, e que não se deve acessar diretamente o modelo de dados sem passar pela camada correspondente.

### O que isso esclarece

A plataforma aparenta adotar uma estrutura em camadas, especialmente em Neutron. No entanto, a sessão não detalhou tecnicamente os contratos, serviços ou APIs envolvidos.

---

## 10.4. A tradução de novas etiquetas é automática?

### Pergunta

Ao criar uma etiqueta, sua tradução precisa ser feita pelo desenvolvedor ou ocorre automaticamente?

### Resposta

O apresentador não soube responder. Mencionou que a Mapfre possui um serviço de traduções, mas não confirmou se ele é usado nesse fluxo nem como se organiza a responsabilidade entre equipes.

### O que isso esclarece

Não existe, na transcrição, um processo definido de tradução para novas etiquetas. Esse tema precisa ser validado antes de assumir automação ou responsabilidade de uma equipe específica.

---

## 10.5. Devem ser buscadas traduções existentes antes de criar novas?

### Pergunta implícita

Vale a pena procurar se uma etiqueta já existe traduzida antes de criar uma nova?

### Resposta

A orientação prática foi que sim, embora tenha sido reconhecido que, em alguns casos, procurar pode consumir mais tempo do que traduzir. Ainda assim, a reutilização foi considerada desejável para evitar duplicidade e inconsistência.

### O que isso esclarece

A recomendação geral é equilibrar produtividade imediata com consistência futura, evitando criar traduções redundantes sem necessidade.

---

# 11. Limitações reconhecidas na sessão

A reunião explicitamente não detalhou ou não confirmou diversos aspectos.

## 11.1. Limitações sobre arquitetura

Não foram detalhados:

- componentes técnicos completos do Neutron;
- tecnologias de front-end;
- tecnologias de back-end;
- bancos de dados, embora Oracle tenha sido mencionado em exemplos;
- modelo de implantação;
- topologia de ambientes;
- autenticação;
- IAM;
- controle de sessão;
- observabilidade;
- monitoramento;
- logs;
- auditoria;
- CI/CD;
- versionamento técnico;
- disaster recovery;
- alta disponibilidade;
- rede;
- cloud;
- containers;
- Kubernetes;
- mensageria;
- eventos.

---

## 11.2. Limitações sobre processos

Não foram definidos:

- processo oficial para criar programas;
- processo de aprovação de novos menus;
- regras oficiais de versionamento de programas;
- processo de tradução;
- responsáveis formais por manutenção de catálogos;
- modelo de atendimento ou suporte;
- fluxo de incidentes;
- processo de publicação entre núcleo e instalações;
- critérios de descontinuação;
- critérios formais para criação de novas instalações.

---

## 11.3. Limitações sobre segurança

Embora a importância da segurança tenha sido reforçada, não foram detalhados:

- matriz de segregação de funções;
- modelo de autenticação;
- ciclo de vida de usuários;
- integração com recursos humanos;
- aprovação de acessos;
- revisão periódica de permissões;
- trilha de auditoria;
- política de mínimos privilégios;
- mecanismos de prevenção de fraude além do exemplo de marcas.

---

# 12. Riscos e desafios

## 12.1. Riscos explicitamente mencionados

| Risco | Consequência possível |
|---|---|
| Papéis incorretamente atribuídos | Usuário pode acessar funções incompatíveis com sua responsabilidade |
| Ausência de controle dentro de programas | Configurações de segurança podem não ser respeitadas |
| Alteração indevida de tipos ou listas TRN | Possível comprometimento de funcionalidade do núcleo |
| Traduções literais ou sem contexto | Textos incorretos e perda de entendimento funcional em outros países |
| Nomenclatura inadequada | Dificuldade de manutenção e dependência de conhecimento individual |
| Inserção de menu sem revisão da ordem | Navegação inadequada ou necessidade de renumerar itens existentes |
| Modificação do núcleo TRN | Perda de padronização entre instalações |
| Configurações incoerentes entre catálogos | Comportamentos contraditórios e reclamações de usuários |

---

## 12.2. Desafios derivados do contexto

> **Leitura analítica:** os pontos abaixo não foram necessariamente declarados como riscos formais durante a reunião, mas decorrem do modelo apresentado.

### Complexidade de coexistência entre plataformas

A convivência entre TronWeb e Neutron exige que equipes compreendam:

- conceitos históricos;
- estruturas legadas;
- novas operações;
- diferenças de menu;
- diferenças de permissões;
- atributos obsoletos ainda presentes no modelo.

Isso aumenta a necessidade de documentação e formação.

### Dependência de conhecimento especializado

Muitos pontos dependem de arquitetura, nomenclatura, dados, tradução e contexto de negócio. Se esse conhecimento não estiver bem documentado, a manutenção pode ficar concentrada em poucas pessoas.

### Risco de customização excessiva

A separação entre TRN e instalações locais permite flexibilidade, mas também pode favorecer divergência entre países se não houver governança suficiente.

### Risco de inconsistência multilíngue

Textos, etiquetas, programas, menus e mensagens possuem componentes multilíngues. Isso exige disciplina para evitar que a mesma funcionalidade tenha traduções inconsistentes ou inadequadas em diferentes idiomas.

---

# 13. Relações de causa e efeito reconstruídas

## 13.1. Personalização local versus preservação do núcleo

```text
Necessidades específicas de países e entidades
↓
Criação de configurações ou programas locais
↓
Necessidade de distinguir padrão e customização
↓
Uso de códigos de instalação
↓
Preservação do núcleo TRN
```

---

## 13.2. Grande volume de elementos versus padronização

```text
Milhares de programas, tabelas, atributos e formulários
↓
Dificuldade para localizar e entender elementos
↓
Necessidade de nomenclatura padronizada e reutilização
↓
Maior capacidade de manutenção e continuidade
```

---

## 13.3. Segurança versus implementação

```text
Papéis atribuídos a usuários
↓
Acesso a programas e operações
↓
Necessidade de restrições sobre dados e ações
↓
Controles precisam existir também dentro dos programas
↓
Sem implementação adequada, a segurança configurada pode falhar
```

---

## 13.4. Multilinguismo versus qualidade de contexto

```text
Interface disponível em múltiplos idiomas
↓
Necessidade de textos, mensagens e etiquetas por idioma
↓
Risco de tradução literal sem contexto de negócio
↓
Necessidade de validação e reutilização de traduções corretas
```

---

# 14. Mudanças de paradigma identificáveis

> **Análise interpretativa baseada no conjunto da sessão.**

## 14.1. De programa isolado para ecossistema configurado

A reunião sugere que um programa não deve ser entendido apenas como código executável. Ele faz parte de um ecossistema de configuração que envolve menus, papéis, operações, etiquetas, mensagens, traduções, módulos e regras de segurança.

```text
Programa isolado
↓
Programa integrado a catálogos, segurança, interface e negócio
```

---

## 14.2. De permissões superficiais para segurança em múltiplas camadas

A explicação sobre papéis e programas indica uma direção de segurança em camadas:

```text
Visibilidade no menu
+
Permissão do papel
+
Restrição de consulta
+
Restrição por estrutura comercial ou produto
+
Controle implementado no programa
```

Isso sugere que o controle de acesso não é apenas uma configuração de menu, mas um mecanismo distribuído pela aplicação.

---

## 14.3. De personalização direta para diferenciação governada

A existência de instalações locais não foi apresentada como liberdade irrestrita para modificar qualquer elemento. A orientação é preservar TRN, identificar customizações por instalação e envolver arquitetura nas mudanças relevantes.

```text
Necessidade local
↓
Configuração ou extensão local identificada
↓
Preservação do padrão compartilhado
↓
Evolução governada
```

---

## 14.4. De navegação técnica para navegação funcional

A organização de programas em menus e operações busca aproximar a aplicação da forma como o usuário trabalha:

```text
Lista técnica de programas
↓
Agrupamento por processo e domínio funcional
↓
Navegação mais compreensível
↓
Acesso mais eficiente às operações
```

---

# 15. Números e indicadores citados

| Indicador | Valor mencionado | Contexto |
|---|---:|---|
| Idade aproximada do sistema | “30 e tantos anos” | Referência à longa trajetória e ao legado de tipologias antigas |
| Quantidade aproximada de tabelas | “2000 y pico” | Menção informal para ilustrar a grande dimensão do sistema; não apresentada como métrica oficial |
| Níveis de menu recomendados | 3 ou 4 no máximo, como percepção do apresentador | Não foi apresentada como regra formal |
| Número de opções em um menu Neutron demonstrado | 9 | Exemplo do menu principal exibido |
| Número de registros em um submenu de exemplo | 12 | Exemplo apresentado ao navegar em uma estrutura de menu |
| Valores de uma lista de tipo de envio | 4 | Exemplo de lista curta de valores |
| Valores em exemplo de parentesco | 5 | Próprio, cônjuge, descendente, ascendente e colateral |

> Os números acima foram mencionados no contexto de treinamento e exemplos. Não devem ser tratados como indicadores corporativos auditados.

---

# 16. Roadmap e próximos tópicos mencionados

A sessão não apresentou um roadmap formal de produto, datas, marcos ou entregas.

Foram mencionados, porém, próximos conteúdos de formação:

- funcionalidade de marcas;
- emissão;
- sinistros;
- tesouraria;
- arquitetura e camadas do Neutron;
- práticas de desenvolvimento;
- outras funcionalidades específicas da plataforma.

Também foi indicado que a formação continuaria após uma pausa, com quatro tópicos ainda pendentes.

Não é possível concluir:

- calendário oficial do treinamento;
- roadmap de evolução tecnológica;
- plano de migração TronWeb → Neutron;
- cronograma de países;
- prioridades de produto;
- responsáveis por cada iniciativa.

---

# 17. O que a reunião não permite concluir

A sessão não fornece base suficiente para afirmar com segurança:

1. Qual é a grafia oficial da plataforma: RISCOR, Rift Core ou outra variação.
2. Quais são todos os módulos existentes e suas siglas oficiais.
3. Qual é a lista oficial de códigos de instalação.
4. Se o atributo TronWeb/Neutron é confiável em instalações híbridas.
5. Como funciona tecnicamente o Neutron em nível de front-end, back-end, serviços ou APIs.
6. Qual é a arquitetura de autenticação e autorização.
7. Qual mecanismo impede acesso direto ao banco ou modelo de dados.
8. Quais APIs existem, como são autenticadas e como são versionadas.
9. Qual banco de dados é utilizado de forma oficial, embora Oracle tenha sido citado em exemplos.
10. Como ocorre o versionamento de programas na prática.
11. Qual processo deve ser seguido para criar uma nova operação.
12. Como funciona a aprovação de novos programas, menus ou papéis.
13. Como se processam traduções de forma oficial.
14. Quem é responsável por validar traduções de negócio.
15. Como ocorre distribuição de mensagens, etiquetas e alterações entre núcleo e países.
16. Quais atributos obsoletos ainda são tecnicamente consumidos em alguma instalação.
17. Se todos os programas existentes implementam corretamente controles de segurança.
18. Quais mecanismos de auditoria, logs, observabilidade ou monitoramento existem.
19. Qual é a estratégia de migração de TronWeb para Neutron.
20. Qual será o modelo futuro de relacionamento entre NTT e Mapfre.

---

# 18. Conclusões principais

A sessão apresentou uma visão abrangente do modelo de configuração que suporta a navegação, segurança, multilíngue e extensibilidade do RISCOR.

Os principais aprendizados são:

1. **O núcleo TRN deve ser preservado.**  
   Customizações locais devem ser identificadas pela instalação correspondente, sem confundir ou modificar o padrão compartilhado.

2. **Programas dependem de um ecossistema de catálogos.**  
   Criar um programa pode exigir configuração de módulos, operações, papéis, menus, textos, etiquetas, mensagens e permissões.

3. **Segurança não depende apenas do menu.**  
   Papéis e acessos precisam estar alinhados à implementação dos programas, às restrições de visualização e à estrutura organizacional ou comercial.

4. **Neutron e TronWeb coexistem.**  
   O entendimento da plataforma exige conhecer tanto as estruturas históricas de TronWeb quanto as operações e camadas associadas ao Neutron.

5. **Nomenclatura e reutilização são fatores de sustentabilidade.**  
   Em um ambiente com milhares de elementos, nomes padronizados, uso de catálogos existentes e documentação são essenciais para manutenção futura.

6. **Menus organizam processos, não apenas telas.**  
   A estrutura de menus deve refletir a lógica funcional da operação, facilitar a navegação e ser mantida com atenção à sequência dos itens.

7. **Multilinguismo requer governança.**  
   Etiquetas, mensagens, programas e textos precisam respeitar idioma, contexto de negócio e consistência. Traduções literais sem validação podem causar erros relevantes.

8. **Listas de valores exigem cautela.**  
   Valores do núcleo, especialmente tipos fechados, não devem ser modificados sem avaliar impacto funcional e sem consultar quem domina a governança correspondente.

9. **Vários pontos continuam em aberto.**  
   A sessão foi didática e funcional, mas não definiu processos formais de versionamento, tradução, arquitetura, integração, segurança operacional ou responsabilidades futuras.

Em síntese, a reunião não descreve apenas como cadastrar itens em tabelas. Ela revela um modelo de plataforma em que configuração, arquitetura, segurança, internacionalização e manutenção precisam operar de forma coordenada para que novas funcionalidades sejam criadas sem comprometer o núcleo, a consistência dos dados e a experiência dos usuários.
