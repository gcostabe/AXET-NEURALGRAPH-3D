# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.core - Terceros - DEFINICIÓN Proveedor..mp4`
**Data de processamento:** 24/09/2026 16:56:32
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Análise estruturada — Capacitação funcional sobre definição de fornecedores no Reef.core

## 1. Síntese executiva

A sessão apresentada é uma capacitação funcional sobre a **definição e a administração de fornecedores** no ecossistema **Reef.core**, com demonstrações no ambiente identificado visualmente como **Fuji**. O foco não é o cadastro operacional de um fornecedor em si, mas o conjunto de **catálogos, parâmetros e regras de configuração** que tornam possível classificá-lo, autorizá-lo, disponibilizá-lo para processos e controlar sua atuação.

O raciocínio central é que um fornecedor, no sistema, é прежде de tudo um **Terceiro** — pessoa física ou jurídica — ao qual são atribuídas características específicas. A principal característica estrutural é o **código de atividade**, que determina os processos e as capacidades do sistema aplicáveis àquele Terceiro. Um fornecedor pode ser, por exemplo, oficina, clínica, hospital, vidraceiro ou chaveiro; essas atividades possuem necessidades operacionais muito diferentes e, portanto, exigem configurações diferentes.

A capacitação explica uma evolução de modelo: inicialmente, os fornecedores eram identificados por um código genérico de atividade, aparentemente o código 10. Essa abordagem mostrou-se insuficiente porque agrupava realidades muito distintas sob uma única classificação. O modelo atual permite indicar, no catálogo de atividades de Terceiros, se uma atividade corresponde ou não a um fornecedor. Assim, novas categorias de fornecedores podem ser configuradas sem, segundo a explicação dada, exigir alteração do código da aplicação.

O conteúdo também estabelece que os fornecedores são fortemente conectados a dois domínios do Reef.core:

1. **Autosserviço de fornecedores**, descrito como uma aplicação web voltada à interação operacional do fornecedor com a MAPFRE;
2. **Módulo de sinistros**, que utiliza as informações de fornecedor para atribuir serviços, aplicar critérios de capacidade, utilizar tarifas, gerar liquidações e originar ordens de pagamento.

A primeira sessão termina após abordar o grupo de definições relacionado a **identificação e acesso**. Ficaram anunciados para a sessão seguinte os grupos relativos a serviços, zonas geográficas de atribuição, tarifas, atenção, avaliação, fraude e SICURF.

> **Nota sobre nomenclatura:** a transcrição automática registra diversas variações fonéticas, como “Riftcore”, “RIFCOR”, “RIFACADEMI” e “TRONwell”. As telas exibem, com maior confiabilidade contextual, os nomes **Reef.core**, **Reef.academy** e **TRONweb**. Onde a transcrição é ambígua, esta análise preserva a ressalva.

---

## 2. Escopo e natureza da sessão

A apresentação faz parte de uma formação composta por **duas sessões**, realizadas em quintas-feiras consecutivas:

- **Primeira sessão:** fornecedor visto como um Terceiro, com introdução às definições específicas e aprofundamento inicial em identificação e acesso.
- **Segunda sessão:** continuidade dos catálogos de fornecedor, com foco anunciado em serviços, zonas de atribuição, tarifas, atendimento e outros grupos ainda não detalhados nesta reunião.

O instrutor ressalta que a sessão não pretende revisar todos os fundamentos de Terceiros em profundidade, pois parte do público já teria recebido formações anteriores. Ainda assim, ele retoma conceitos que considera indispensáveis para compreender fornecedores.

A documentação visual utilizada vem do portal **Reef.academy**, dentro de um espaço de documentação Reef acessível pelo Marketplace MAPFRE. A tela de referência mostra seções como:

- Capacitação funcional Reef;
- Capacitação técnica Reef;
- Modelo operativo Reef;
- Sessões Reef.

> **Rastreabilidade visual:** Frame 04, aproximadamente `16:29`.

---

## 3. Contexto e antecedentes

### 3.1. Fornecedor como conceito de negócio

O instrutor apresenta fornecedor como uma pessoa ou entidade jurídica que fornece serviços à companhia seguradora. A abrangência é ampla e varia conforme o ramo ou a necessidade operacional.

Os exemplos fornecidos incluem:

| Domínio | Exemplos de fornecedores citados |
|---|---|
| Automóveis | Oficinas/talleres |
| Saúde e pessoas | Médicos, clínicas, hospitais |
| Seguros residenciais | Vidraceiros, chaveiros, eletricistas, encanadores |
| Outros cenários de seguros | Prestadores cuja natureza depende do ramo e do serviço necessário |

A mensagem principal é que “fornecedor” não representa um tipo homogêneo de entidade. Uma oficina mecânica, uma clínica e um chaveiro podem estar sob a mesma macroclassificação de fornecedor, mas possuem serviços, capacidades, critérios de atendimento e necessidades de configuração profundamente distintos.

### 3.2. Reef.core, legado e evolução

O instrutor situa Reef.core como parte de uma trajetória tecnológica anterior. A transcrição menciona que antes houve **TRONweb** e outro elemento cujo nome não é confiável no reconhecimento de voz — algo registrado como “controlador”. Não é possível determinar, apenas com a reunião, se esse termo identifica um produto, módulo ou conceito específico.

A informação relevante é que o modelo de fornecedores tem histórico e foi evoluindo em resposta à necessidade de representar melhor os diferentes tipos de prestadores.

### 3.3. Modelo anterior de identificação

Segundo a explicação, havia originalmente uma atividade genérica de código **10** para identificar fornecedores. Essa solução concentrava, sob uma classificação única, fornecedores de naturezas muito diferentes.

A consequência era a necessidade de criar códigos de atividade mais específicos para distinguir perfis como:

- oficinas;
- clínicas ou hospitais;
- prestadores de serviços patrimoniais, como encanadores, chaveiros ou vidraceiros.

O instrutor associa essa evolução a um problema de manutenção: para incorporar uma nova atividade de fornecedor, aparentemente seria necessário alterar o código da aplicação para que ela a contemplasse. Ele caracteriza esse procedimento como inadequado.

### 3.4. Modelo atual: marca de fornecedor por atividade

O modelo atual descrito substitui a dependência de uma atividade genérica por uma configuração no catálogo de atividades de Terceiros:

- cada Terceiro recebe um código de atividade;
- a atividade pode possuir uma marca que informa se ela representa um fornecedor;
- essa marca habilita o ingresso daquele Terceiro no “mundo de fornecedores” do sistema.

Assim, uma oficina, um vidraceiro ou outra atividade pode ser considerada fornecedora mediante configuração, sem que a classificação de fornecedor fique limitada a um único código genérico.

> **Leitura analítica:** a mudança apresentada sugere uma evolução de um modelo rígido, dependente de código, para um modelo mais configurável, baseado em metadados de atividade. A reunião não detalha a implementação técnica interna dessa configuração.

---

## 4. Problemas identificados

### 4.1. Classificação excessivamente genérica dos fornecedores

**Problema:** tratar todos os fornecedores sob uma atividade genérica não distingue as necessidades operacionais de cada categoria.

**Como ocorre:** uma única classificação pode agrupar oficina, clínica, hospital, chaveiro e outros prestadores.

**Consequência:** o sistema teria dificuldade para aplicar regras, dados e fluxos específicos por natureza de prestador.

**Resposta apresentada:** vincular cada fornecedor a códigos de atividade mais específicos e utilizar uma marca configurável para indicar se a atividade é fornecedora.

---

### 4.2. Necessidade de alterações de código para novas atividades

**Problema:** a criação de novas categorias de fornecedores poderia demandar mudança na aplicação.

**Consequência:** maior dependência de desenvolvimento e menor autonomia para adequar a instalação à realidade local.

**Resposta apresentada:** usar a marca de fornecedor no catálogo de atividades, permitindo ampliar o conjunto de atividades fornecedoras por configuração.

> A reunião não explica se essa mudança elimina completamente intervenções técnicas em todos os cenários. O que foi afirmado é que ela simplifica a identificação de fornecedores no sistema.

---

### 4.3. Heterogeneidade dos serviços e capacidades

**Problema:** fornecedores não prestam serviços equivalentes.

**Exemplos citados:**

- uma oficina pode oferecer mecânica, funilaria, pintura, elétrica ou vidros;
- um hospital pode oferecer cirurgia, especialidades médicas ou outros serviços assistenciais;
- um fornecedor residencial pode ter serviços relacionados a chaves, vidros, reparos elétricos ou hidráulicos.

**Consequência:** não é suficiente classificar o fornecedor apenas como pessoa física ou jurídica; são necessários catálogos e blocos de informação adequados à atividade.

**Resposta apresentada:** configurar blocos de dados, serviços, zonas, tarifas, capacidades e outros elementos por atividade.

---

### 4.4. Necessidade de governar acesso e manutenção de dados

**Problema:** diferentes usuários podem precisar apenas consultar ou também atualizar informações de fornecedores.

**Consequência:** permitir acesso irrestrito poderia comprometer o controle operacional sobre tarifas, serviços, zonas e demais dados relevantes.

**Resposta apresentada:** uso de papéis e permissões por companhia, atividade e bloco de informação, com níveis como:

- sem acesso;
- consulta;
- atualização.

---

### 4.5. Controle do ciclo de vida e qualidade do fornecedor

**Problema:** fornecedores podem deixar de atender requisitos, apresentar baixa qualidade, enfrentar restrições temporárias ou estar envolvidos em investigação de fraude.

**Consequência:** a companhia precisa impedir ou restringir a atribuição de novos serviços, sem necessariamente perder todo o histórico do fornecedor.

**Resposta apresentada:** fluxo de estados, causas por estado, eventual controle de alteração de estado por permissão e configurações relacionadas a qualidade, fraude e SICURF.

---

## 5. Conceitos funcionais fundamentais

## 5.1. Terceiros

Na documentação demonstrada, pessoas físicas e jurídicas são tratadas pelo termo **Terceiros**.

> “En Reef.core se denominan tanto a las personas físicas como a las personas jurídicas con el término Terceros.”  
> **Rastreabilidade visual:** Frame 05, aproximadamente `20:35`.

Todo fornecedor é um Terceiro, mas nem todo Terceiro é um fornecedor. A sessão reforça que Terceiros podem incluir segurados, agentes, peritos, empregados, seguradoras, escritórios bancários e outras categorias dependentes do modelo utilizado na instalação.

## 5.2. Atividade do Terceiro

A atividade é apresentada como uma qualidade vinculada ao Terceiro que informa sua capacidade de exercer determinada função no sistema.

A documentação visual define que as atividades associadas aos Terceiros identificam inequivocamente os processos, procedimentos e fluxos operacionais dos quais eles participam ou podem participar.

> **Rastreabilidade visual:** Frame 06, aproximadamente `24:41`.

O exemplo dado na documentação é particularmente relevante:

- um Terceiro com atividade de **intermediário ou agente** pode participar automaticamente do processo de apuração de comissões;
- a mesma pessoa, identificada como **perito**, pode participar de atribuições e perícias em sinistros;
- identificada como **empregado**, pode se beneficiar de descontos comerciais em emissão.

A explicação oral usa esse modelo para reforçar que a atividade determina comportamento operacional e não apenas uma etiqueta cadastral.

## 5.3. Códigos de atividade reservados

A documentação indica que os códigos de atividade de **1 a 99**, além dos códigos **110 e 999**, são reservados e de uso exclusivo do núcleo do sistema.

> **Rastreabilidade visual:** Frames 06 e 08, aproximadamente `24:41` e `32:53`.

A tabela visível inclui, entre outros:

| Código | Descrição |
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

> A tela não mostra a lista integral de códigos. Não é possível concluir, a partir do material fornecido, todos os valores ou descrições existentes no catálogo.

## 5.4. Fornecedor como atividade marcada

A atividade de Terceiro pode ser marcada como correspondente a fornecedor. A documentação visual descreve essa propriedade como o atributo que identifica ou não fornecedores no sistema.

Quando a marca está habilitada, a atividade passa a contar com definições próprias de fornecedores, como:

- zonas de atuação;
- serviços permitidos;
- horários;
- outros elementos de configuração.

> **Rastreabilidade visual:** Frame 07, aproximadamente `28:47`.

A mesma tela apresenta como exemplos de atividades usualmente marcadas como fornecedor:

| Atividade | Nome | Fornecedor |
|---:|---|---|
| 17 | Talleres Concertados | Sim |
| 20 | Cristaleros | Sim |
| 21 | Cerrajeros | Sim |

---

## 6. Arquitetura funcional e relações entre módulos

A reunião não apresenta uma arquitetura de infraestrutura — não há detalhamento de cloud, banco de dados, APIs, mensageria, rede ou mecanismos de autenticação. Ainda assim, é possível reconstruir uma **arquitetura funcional lógica** a partir do que foi explicado.

### 6.1. Representação funcional consolidada

> O desenho abaixo é uma consolidação analítica do conteúdo da reunião; não corresponde a um diagrama literal exibido pelo instrutor.

```text
Catálogos e parâmetros de instalação
        ↓
Módulo de Terceiros
        ↓
Atividade do Terceiro
        ↓
Marca de fornecedor
        ↓
Configurações específicas de fornecedor
  ├─ Identificação e acesso
  ├─ Tipologias e categorias
  ├─ Serviços
  ├─ Zonas de atribuição
  ├─ Tarifas
  ├─ Atendimento e capacidades
  ├─ Qualidade / avaliação
  ├─ Fraude
  ├─ SICURF
  └─ Estados e causas
        ↓
Uso operacional em módulos integrados
  ├─ Autosserviço de fornecedores
  ├─ Sinistros
  └─ Tesouraria / pagamentos
```

### 6.2. Relação entre dados transversais e dados específicos

A apresentação separa dois níveis de informação:

| Nível | Características |
|---|---|
| Dados comuns de Terceiros | Aplicáveis a qualquer Terceiro: contatos, endereços, meios de pagamento, documentos, categorias, agrupamentos, classificações e outros catálogos compartilhados. |
| Dados específicos de fornecedores | Aplicáveis quando a atividade do Terceiro está configurada como fornecedor: tipologia, categoria, estado, serviços, zonas, tarifas, atendimento, avaliação de fraude e outros blocos específicos. |

Essa separação é demonstrada na interface do Reef/Fuji. No ambiente exibido, é possível consultar fornecedores em **Terceros > Gestión proveedores > Proveedores**, utilizando filtros como atividade, zona de atribuição, estado, categoria, documento e código do Terceiro.

> **Rastreabilidade visual:** Frame 09, aproximadamente `36:59`.

### 6.3. Acoplamento funcional com sinistros

O instrutor afirma repetidamente que as definições de fornecedores estão ligadas ao módulo de sinistros. A relação explicada é:

1. o cadastro/configuração do fornecedor define suas capacidades, serviços, zonas, tarifas e condições;
2. o módulo de sinistros utiliza essas informações ao atribuir serviços ou tratar expedientes;
3. a liquidação de sinistros considera configurações relacionadas a tarifas e convênios;
4. as ordens de pagamento originadas no contexto de sinistros seguem para o processo de tesouraria.

São citados exemplos de uso:

- atribuição de uma ordem de serviço para reparação de veículo;
- seleção de fornecedor conforme capacidade, horário e critérios aplicáveis;
- uso de tarifas para liquidar expedientes;
- consideração de convênios específicos de pagamento.

### 6.4. Acoplamento funcional com o autosserviço de fornecedores

O autosserviço é descrito como uma aplicação web nativa do universo MAPFRE/Reef.core, voltada a permitir que fornecedores executem determinadas operações.

As capacidades citadas incluem:

- alta e acesso de fornecedores;
- visão global de informações;
- agenda de trabalho;
- notificações emitidas pela MAPFRE;
- gestão operacional de compromissos/citas;
- gestão de serviços disponibilizados;
- faturamento;
- manutenção de dados e capacidades do fornecedor.

A reunião não detalha:

- como ocorre a autenticação;
- quais usuários externos acessam o autosserviço;
- se há APIs entre Reef.core e o autosserviço;
- quais ações exigem aprovação interna;
- se há integração em tempo real ou processos assíncronos.

---

## 7. Modelo de configuração de fornecedores

O instrutor organiza as definições em **oito grandes grupos**. A primeira sessão aprofunda majoritariamente o primeiro grupo e toca em estados e convênios de pagamento.

| Grupo mencionado | Finalidade descrita | Profundidade nesta sessão |
|---|---|---|
| 1. Identificação e acesso | Blocos de informação, papéis, permissões, tipologias e categorias | Detalhado |
| 2. Serviços | Serviços prestados por fornecedores | Anunciado, sem detalhamento completo |
| 3. Zonas geográficas | Redes e áreas de atuação de fornecedores | Explicado conceitualmente |
| 4. Tarifas | Configuração para uso em processos de sinistros e liquidação | Explicado conceitualmente |
| 5. Atenção/atendimento | Dados de atendimento e capacidades | Explicado conceitualmente |
| 6. Avaliação | Avaliação de desempenho e qualidade | Explicado conceitualmente |
| 7. Fraude | Tratamento de possíveis fraudes | Explicado conceitualmente |
| 8. SICURF | Incidências, reclamações, queixas e felicitações | Explicado conceitualmente |

> **Observação:** a transcrição fala em “SICURRF” ou formas semelhantes. A grafia exata não pode ser confirmada somente pela reunião. Esta análise usa **SICURF** como aproximação ao termo ouvido, preservando a incerteza.

---

## 8. Grupo 1 — Identificação e acesso

## 8.1. Blocos de informação

Os blocos de informação permitem personalizar a informação disponível para cada atividade de fornecedor.

A ideia apresentada é que uma oficina e um hospital não devem necessariamente possuir os mesmos blocos:

- oficina pode precisar de marcas atendidas, serviços automotivos e capacidades relacionadas à reparação;
- hospital pode requerer informações de especialidades ou serviços assistenciais;
- chaveiro, encanador ou vidraceiro podem ter configurações distintas de ambos.

A configuração é realizada, segundo a fala, por:

- companhia;
- código de atividade do Terceiro;
- bloco de informação aplicável.

O instrutor reforça que esses blocos não devem ser interpretados como um módulo isolado: eles sustentam tanto o autosserviço como os processos de sinistros.

### Blocos citados na explicação

Foram mencionados, de forma parcial, os seguintes blocos ou áreas de configuração:

- tarifas;
- zonas de atribuição;
- serviços;
- serviços de valor agregado;
- dados de atendimento;
- capacidades;
- SICURF;
- fraudes;
- formação, prevista para evolução futura.

A formação é particularmente relevante como limitação: o instrutor afirma que o bloco relacionado à formação **não estaria implementado na data da sessão**, embora o sistema já o contemplasse como possibilidade futura.

> A reunião não informa a data absoluta da sessão. Portanto, não é possível converter “na data de hoje” em uma data de calendário confiável.

---

## 8.2. Papéis de acesso

A reunião explica que o acesso ao mundo de fornecedores precisa ser governado por papéis. Esses papéis são associados a usuários e utilizados para controlar ações sobre dados de fornecedor.

O instrutor relaciona esse mecanismo ao módulo transversal de segurança, no qual os papéis são definidos. No contexto de fornecedores, eles são aplicados de forma específica conforme atividade e necessidades de acesso.

A apresentação sugere a seguinte lógica:

```text
Usuário
   ↓
Papel de segurança
   ↓
Companhia + atividade de fornecedor
   ↓
Permissão por bloco de informação
```

Não foi detalhado:

- o modelo de autenticação;
- a origem dos usuários;
- a gestão de ciclo de vida de contas;
- se os papéis são atribuídos diretamente ou por grupos;
- auditoria de alterações de permissão.

---

## 8.3. Permissões por bloco

As permissões permitem definir o que cada papel pode fazer em cada bloco de informação de fornecedor.

Os níveis de acesso explicitamente citados são:

| Nível | Significado |
|---|---|
| Sem acesso | Usuário não visualiza nem opera o bloco |
| Consulta | Usuário visualiza, mas não modifica |
| Atualização | Usuário pode manter ou alterar dados |

O instrutor esclarece que a lógica se repete para blocos distintos — como tarifas, zonas geográficas, serviços e serviços de valor agregado — embora as permissões possam variar entre eles.

### Implicação operacional

Uma pessoa com permissão para consultar tarifas não necessariamente pode atualizá-las. Outro usuário pode atuar sobre zonas, sem ter qualquer acesso a tarifas. Isso permite uma matriz de responsabilidades compatível com áreas distintas da seguradora.

> **Leitura analítica:** o modelo apresentado sugere segregação de funções e controle de acesso por responsabilidade operacional. A reunião não usa explicitamente o termo “segregação de funções”, portanto esta é uma interpretação funcional.

---

## 8.4. Tipologias de fornecedores

As tipologias são apresentadas como uma classificação de fornecedores definida **no nível da companhia**, e não diretamente no nível da atividade.

Exemplos mencionados ou visíveis na explicação incluem:

- agência;
- multimarca;
- outras tipologias específicas de oficinas ou de outros perfis de fornecedor.

O instrutor ressalta uma recomendação de organização: como as tipologias são cadastradas em um catálogo comum à companhia, é desejável adotar uma convenção de codificação que evite misturar indiscriminadamente tipos de atividades diferentes.

Exemplo de boa prática conceitual citado:

| Faixa hipotética | Uso sugerido pelo instrutor |
|---|---|
| 1 a 100 | Tipologias de automóveis |
| 101 a 200 | Tipologias de hospitais |
| 201 a 300 | Tipologias de chaveiros |

Essas faixas são ilustrativas. Não foram apresentadas como padrão obrigatório do Reef.core.

### Tipo real e tipo genérico

A reunião afirma que existe uma marca indicando se o tipo é real ou não real/genérico. Apenas um tipo poderia ser não real, destinado a uso interno do núcleo.

Foram citadas referências típicas de valor genérico, como “999” ou “Z”, mas não há definição suficiente para afirmar se esses valores são universais, obrigatórios ou apenas exemplos técnicos.

---

## 8.5. Categorias de fornecedores

As categorias funcionam como outra dimensão de classificação, também definida no nível da companhia.

O exemplo mencionado associa um fornecedor a:

- uma tipologia;
- uma categoria de fornecedor.

O instrutor explica que, isoladamente, códigos de tipologia e categoria não produzem comportamento automático. Eles ganham significado quando são utilizados por regras ou algoritmos operacionais — por exemplo, para atribuir serviços de maneira diferenciada.

### Relação entre tipologia, categoria e atividade

A configuração ocorre em camadas:

```text
Companhia
   ↓
Catálogo geral de tipologias
Catálogo geral de categorias
   ↓
Atividade de fornecedor
   ↓
Tipologias permitidas para aquela atividade
   ↓
Combinações permitidas entre tipologia e categoria
   ↓
Fornecedor específico
```

Essa estrutura permite que uma companhia mantenha um vocabulário comum de tipos e categorias, mas restrinja quais combinações fazem sentido para cada atividade.

---

## 8.6. Tipologias permitidas por atividade

Depois de configurar o catálogo geral de tipologias, a companhia define quais tipologias podem ser utilizadas para cada atividade de fornecedor.

Exemplos conceituais:

- oficinas podem utilizar tipologias relacionadas a oficinas;
- hospitais podem utilizar tipologias relacionadas a prestadores de saúde;
- outras atividades terão seu próprio conjunto permitido.

A apresentação menciona uma marca de inabilitação. Quando uma tipologia é inabilitada:

- não deve ser utilizada em novas configurações;
- pode continuar existindo em registros antigos que já a utilizavam.

Essa abordagem é apresentada como consistente com outros catálogos do sistema.

---

## 8.7. Matriz de tipologia e categoria

Há um catálogo adicional que combina:

- companhia;
- código de atividade;
- tipologia;
- categoria;
- validade;
- indicador de inabilitação.

O objetivo é restringir e organizar as combinações permitidas de tipologia e categoria por atividade.

No exemplo oral, uma oficina multimarca pode atender veículos de diferentes marcas, enquanto uma oficina mais especializada pode ter segmentação diferente. A reunião não formaliza regras de negócio específicas para marcas ou categorias; usa esses exemplos apenas para ilustrar por que a matriz é necessária.

---

## 9. Estados do fornecedor e ciclo de vida

## 9.1. Estados disponíveis

O instrutor afirma que o núcleo trabalha com cinco estados de fornecedor, e somente esses cinco:

| Estado | Interpretação apresentada |
|---|---|
| Pendente de autorização | Fornecedor ainda não está plenamente habilitado; documentação, formação, configuração ou avaliação podem estar em curso. |
| Ativo | Fornecedor atende requisitos e pode operar. |
| Suspenso de atribuição | Fornecedor temporariamente não deve receber atribuições ou serviços. |
| Baixa total | Relação com o fornecedor é encerrada/desativada. |
| Solicitação rejeitada | Pedido de entrada ou autorização foi recusado. |

A terminologia exata em espanhol sofreu variações na transcrição, mas o sentido desses cinco estados é claro pelo contexto da explicação.

## 9.2. Fluxo usual apresentado

O fluxo mais comum descrito é:

```text
Pendente de autorização
        ↓
Ativo
        ↓
Suspenso de atribuição ─────→ Ativo
        ↓
Baixa total
```

Também há possibilidade de:

```text
Pendente de autorização
        ↓
Solicitação rejeitada
```

Esse fluxo não é apresentado como obrigatório para todas as companhias. A reunião afirma que cada instalação pode configurar um fluxo usando esses cinco estados, de acordo com sua realidade.

## 9.3. Significado operacional dos estados

### Pendente de autorização

Representa uma fase inicial em que o fornecedor ainda não está pronto para operar. São citados, como exemplos de pendências:

- documentação em análise;
- contrato em revisão;
- necessidade de documentação adicional;
- necessidade de formação;
- configuração incompleta.

### Ativo

Indica que o fornecedor está apto a operar e pode ser utilizado pelo módulo de sinistros.

### Suspenso de atribuição

Pode ser aplicado quando o fornecedor:

- não possui requisitos legalmente exigíveis;
- não possui licenças ou permissões necessárias;
- apresenta descumprimentos de obrigações;
- não atinge qualidade técnica esperada;
- não cumpre prazos;
- está sob estudo por possível fraude;
- enfrenta limitação temporária de capacidade operacional.

O exemplo dado para capacidade é uma oficina que perde temporariamente funcionários e, por isso, não consegue absorver a mesma carga de serviços.

### Baixa total

Pode ocorrer, entre outros motivos mencionados, por:

- término de contrato;
- descumprimento grave;
- não atendimento de requisitos;
- qualidade insuficiente;
- fraude.

### Solicitação rejeitada

Pode ocorrer quando o candidato a fornecedor não atende condições exigidas ou apresenta situação incompatível com a contratação.

O instrutor usa como exemplo hipotético um perito que busca trabalhar com a MAPFRE, mas é rejeitado por mau desempenho ou histórico de fraude. Esse exemplo ilustra o conceito e não representa um caso real documentado na reunião.

---

## 9.4. Causas por estado

Além do estado, o sistema permite configurar a causa ou o motivo relacionado à situação do fornecedor.

A finalidade é evitar classificações excessivamente genéricas. Dizer apenas que o fornecedor está suspenso ou em baixa não explica a razão e dificulta seu tratamento administrativo e operacional.

Exemplos de causas citadas:

| Estado | Exemplos de causa mencionados |
|---|---|
| Ativo | Cumpre requisitos; reativado |
| Baixa total | Não cumpre requisitos; término de contrato; descumprimento grave |
| Pendente de autorização | Documentação incompleta; contrato em revisão; análise pendente |
| Suspenso de atribuição | Falta de requisitos; perda de permissões; baixa qualidade; prazos; investigação de fraude |
| Solicitação rejeitada | Não atende requisitos para atuar como fornecedor |

O instrutor reforça que os códigos e descrições podem ser adaptados conforme necessidade da seguradora local.

---

## 9.5. Restrição para mudança de estado

A apresentação menciona um parâmetro de instalação específico de fornecedores que pode restringir a contratação, aceitação ou rejeição de fornecedores por meio do controle de estado.

A intenção explicada é que **nem qualquer usuário deve poder alterar estados**. Para a restrição operar, são necessários:

1. parâmetro de instalação ativado;
2. papel adequado para o usuário responsável.

A reunião não informa:

- o nome técnico do parâmetro;
- quais estados são afetados;
- se há aprovação em múltiplas etapas;
- se a alteração gera auditoria;
- se há notificações associadas.

---

## 10. Serviços, zonas, capacidades e atendimento

Esses temas seriam aprofundados posteriormente, mas a primeira sessão fornece elementos importantes sobre sua finalidade.

## 10.1. Serviços

Os serviços precisam ser configurados por atividade, pois o catálogo aplicável a uma oficina não é o mesmo aplicável a um hospital ou fornecedor residencial.

Exemplos dados:

| Tipo de fornecedor | Serviços exemplificados |
|---|---|
| Oficina | Vidros, mecânica, funilaria, pintura, elétrica |
| Hospital | Cirurgias, especialidades médicas, serviços hospitalares |
| Outros prestadores | Serviços próprios de sua atividade |

A finalidade é permitir que o sistema saiba o que cada fornecedor pode efetivamente executar.

## 10.2. Zonas de atribuição

A zona de atribuição representa uma rede específica de fornecedores e não precisa coincidir com:

- estrutura geográfica administrativa do país;
- estrutura comercial da companhia;
- divisão territorial tradicional.

O instrutor explica que a cobertura de uma rede hospitalar tende a ser menor e diferente da cobertura de uma rede de oficinas. Portanto, cada atividade pode possuir lógica geográfica própria.

> **Leitura analítica:** essa separação indica que “zona de atribuição” é uma estrutura operacional de rede, e não simplesmente uma referência de endereço. A reunião não detalha o modelo de dados que implementa essa estrutura.

## 10.3. Capacidades e horários

A capacidade operacional é apresentada como critério relevante para a atribuição de serviços.

Exemplos:

- uma pequena oficina de bairro não deve receber duzentos veículos por semana se não tiver capacidade;
- uma oficina maior ou de marca pode ter capacidade superior;
- fornecedores não necessariamente atendem 24x7;
- horários e limites podem influenciar a seleção pelo módulo de sinistros.

A reunião sugere que, ao emitir uma ordem de serviço, o sistema não deveria escolher fornecedores aleatoriamente. A decisão pode considerar critérios como:

- capacidade disponível;
- horário;
- perfil do segurado;
- complexidade do caso;
- outros critérios operacionais não especificados.

Não foram detalhados os algoritmos de atribuição, pesos, regras de priorização ou exceções manuais.

## 10.4. Dados de atendimento

O instrutor menciona um grupo de dados de atenção/atendimento, mas não detalha os campos ou seu comportamento. Pelo contexto, esses dados se relacionam à operação do fornecedor e à capacidade de atendê-lo adequadamente em processos da seguradora.

---

## 11. Tarifas e convênios de pagamento

## 11.1. Tarifas

O grupo de tarifas não é apresentado como simples cadastro administrativo. Sua finalidade é apoiar o processamento financeiro e operacional de sinistros.

A lógica descrita é:

```text
Configuração de tarifas de fornecedor
        ↓
Uso pelo módulo de sinistros em liquidações
        ↓
Geração de ordens de pagamento
        ↓
Execução financeira pela tesouraria
```

O instrutor usa os seguintes exemplos:

- preço de hora de funilaria ou pintura em uma oficina;
- diferenças entre tarifas de oficinas;
- diferença radical entre tarifas automotivas e hospitalares;
- necessidade de considerar acordos específicos com oficinas da rede.

A argumentação de negócio é que a seguradora pode estabelecer convênios com determinados fornecedores para:

- controlar custos;
- organizar a rede de prestadores;
- direcionar segurados para oficinas ou prestadores preferenciais;
- preservar padrão de qualidade.

Também é citado o exemplo de um veículo de alto padrão, como uma Ferrari, para ilustrar que a qualidade e especialização do prestador importam na seleção de fornecedor.

> O exemplo é ilustrativo. A reunião não estabelece uma regra formal de que veículos de determinadas marcas devem ser atribuídos a oficinas específicas.

## 11.2. Convênios de pagamento por ramo, atividade e Terceiro

A sessão menciona a possibilidade de existirem convênios de pagamento específicos considerando:

- ramo;
- atividade do Terceiro;
- fornecedor concreto;
- tipo/código de documento do Terceiro;
- tipologia;
- categoria;
- número de dias utilizado no cálculo de data estimada de pagamento.

O exemplo é uma oficina que pode ter condições de pagamento diferentes para ramos relacionados a:

- caminhões;
- automóveis;
- motocicletas.

Quando configurado, o convênio deve ser considerado pelo módulo de sinistros e, posteriormente, pela tesouraria.

A reunião deixa claro que a configuração existe como recurso funcional, mas não afirma que todos os países, companhias ou fornecedores a utilizam.

---

## 12. Qualidade, fraude e SICURF

## 12.1. Avaliação de desempenho e qualidade

A companhia pode ter interesse em avaliar a qualidade dos fornecedores ao longo do tempo. Essa avaliação pode apoiar decisões como:

- manter fornecedor ativo;
- suspender atribuições;
- dar baixa;
- diferenciar tratamento operacional.

O motivo declarado é proteger a qualidade do serviço que chega ao segurado por meio da rede de fornecedores.

A reunião não detalha:

- indicadores de qualidade;
- notas;
- periodicidade de avaliação;
- responsáveis pela avaliação;
- automatismos;
- relação formal entre avaliação e alteração de estado.

## 12.2. Fraude

O instrutor reconhece que fornecedores — ou pessoas que atuam dentro de pessoas jurídicas — podem cometer fraudes. Por isso, há grupo de catálogos associado ao tema.

Fraude é citada como uma possível razão para:

- investigação;
- suspensão de atribuição;
- rejeição;
- baixa.

Não foram apresentados casos reais, mecanismos de detecção, regras antifraude ou integrações com sistemas especializados.

## 12.3. SICURF

O termo é descrito como relacionado a:

- incidências;
- queixas;
- reclamações;
- felicitações pelo serviço prestado por fornecedores.

O instrutor destaca um ponto operacional importante: habilitar a capacidade de registrar SICURF não é suficiente se a companhia não tiver processo e responsáveis para tratar essas ocorrências.

A relação de causa e efeito apresentada é:

```text
Registro de queixas/incidências
        ↓
Tratamento efetivo pela companhia
        ↓
Avaliação de fornecedor
        ↓
Possível decisão sobre continuidade, suspensão ou baixa
```

Sem o tratamento posterior, a configuração seria pouco útil.

---

## 13. Modelo operacional implícito

A reunião não apresenta um modelo operacional completo, mas permite identificar algumas responsabilidades implícitas.

| Papel ou área mencionada | Responsabilidade sugerida |
|---|---|
| Área técnica da seguradora | Configurar a matriz de papéis, acessos e catálogos relacionados a fornecedores |
| Área de negócio | Definir se determinada atividade utilizará tarifas, zonas, serviços e demais capacidades |
| Sinistros | Utilizar informações de fornecedor para atribuição, liquidação e tratamento de expedientes |
| Tesouraria | Executar ou processar pagamentos derivados de ordens geradas a partir de sinistros |
| Responsáveis por qualidade | Registrar, tratar e utilizar informações de qualidade/SICURF, quando o processo existir |
| Responsáveis por fraude | Investigar e tratar possíveis casos relacionados a fornecedores |
| Fornecedor | Manter informações, capacidades, agenda, serviços e possivelmente faturamento via autosserviço |
| Segurança / administração de sistema | Definir papéis de segurança utilizados no controle de acesso |

> A reunião não informa estruturas organizacionais formais, nomes de equipes, responsáveis individuais, SLA, escalonamento de incidentes ou governança de aprovação.

---

## 14. Evidências da interface e documentação

## 14.1. Portal Reef.academy

A documentação apresentada possui material funcional e técnico, incluindo um percurso de capacitação específico do Reef.core.

> **Rastreabilidade visual:** Frame 04, aproximadamente `16:29`.

Itens vistos:

- Reef.core;
- módulos e funcionalidades;
- capacitação funcional;
- capacitação técnica;
- modelo operativo;
- sessões Reef.

## 14.2. Definições de Terceiros

A documentação mostra que existem configurações prévias de instalação e configurações específicas do módulo de Terceiros.

> **Rastreabilidade visual:** Frame 05, aproximadamente `20:35`.

As configurações são separadas entre:

| Tipo | Descrição mostrada |
|---|---|
| Parâmetros de instalação | Afetam transversalmente o comportamento da aplicação |
| Parâmetros do módulo de Terceiros | Afetam funcionalidade e usabilidade do módulo de Terceiros na instalação Reef.core |

A explicação oral conecta esse ponto ao uso do modelo novo ou antigo de Terceiros, afirmando que Reef.core direciona instalações para o modelo novo, por oferecer mais funcionalidades. A reunião não descreve diferenças detalhadas entre os modelos.

## 14.3. Consulta de fornecedores no ambiente Fuji

Na tela do ambiente Fuji, o filtro de fornecedores mostra, entre outros, os campos:

| Campo visível | Exemplo/valor exibido |
|---|---|
| Tipo de documento do Terceiro | Vazio |
| Atividade do Terceiro | `17 - TALLERES CONCERTADOS/WORKSHOP` |
| Zona de atribuição | Vazio |
| Documento | Vazio |
| Código de Terceiro | Vazio |
| Tipologia | Vazio |
| Nome | Vazio |
| Tipo de estado do fornecedor | `AC - ACTIVO` |
| Categoria de fornecedor | Vazio |

> **Rastreabilidade visual:** Frame 09, aproximadamente `36:59`.

Essa evidência visual confirma que, na interface demonstrada, atividade, zona, tipologia, estado e categoria fazem parte da consulta operacional de fornecedores.

---

## 15. Relações de causa e efeito reconstruídas

## 15.1. Diferentes tipos de fornecedor exigem configuração específica

```text
Fornecedores de naturezas muito distintas
        ↓
Dados, serviços e capacidades não equivalentes
        ↓
Necessidade de distinguir atividades
        ↓
Configuração por código de atividade
        ↓
Blocos, serviços, zonas, tarifas e regras específicas
```

Essa relação é diretamente sustentada pelos exemplos recorrentes de oficina, hospital, clínica, chaveiro, vidraceiro e outros prestadores.

## 15.2. Atividade genérica não suporta evolução adequada

```text
Atividade genérica de fornecedor
        ↓
Agrupamento excessivo de perfis heterogêneos
        ↓
Necessidade de novas atividades específicas
        ↓
Dependência de alteração no código da aplicação
        ↓
Adoção de marca configurável de fornecedor por atividade
```

O último passo representa a evolução explicada pelo instrutor.

## 15.3. Dados de fornecedor sustentam decisões de sinistro

```text
Serviços + zonas + capacidade + horários + tarifas
        ↓
Informações disponíveis sobre a rede de fornecedores
        ↓
Atribuição de serviço em sinistros
        ↓
Liquidação e ordem de pagamento
        ↓
Tesouraria
```

A reunião não detalha tecnicamente como as informações são transferidas entre módulos, mas sustenta claramente a relação funcional.

## 15.4. Controle de qualidade e fraude influencia disponibilidade operacional

```text
Incidências, qualidade insuficiente ou suspeita de fraude
        ↓
Avaliação pela companhia
        ↓
Mudança de estado ou suspensão de atribuição
        ↓
Redução ou interrupção do uso do fornecedor em novos serviços
```

---

## 16. Perguntas, intervenções e respostas

A sessão possui poucas perguntas formais registradas. A maior parte do conteúdo é expositiva. Ainda assim, há intervenções relevantes.

## 16.1. Confirmação de áudio e visualização

### Pergunta/intervenção

No início, o instrutor pergunta se os participantes o escutam e se visualizam a área de trabalho e a página principal da Reef.academy.

### Resposta

Participantes confirmam que a tela está visível.

### O que esclarece

A reunião utiliza demonstração de documentação e sistema, não apenas apresentação verbal.

---

## 16.2. Intervenção em português sobre propriedades operacionais

### Pergunta/intervenção

Uma participante intervém em português. A transcrição é imperfeita, mas o contexto indica uma pergunta ou observação sobre as propriedades operacionais dos Terceiros e sua definição/configuração.

### Resposta

O instrutor confirma que propriedades operacionais específicas são definidas na configuração e afetam o módulo de Terceiros. Em seguida, explica que um parâmetro importante é o modelo de Terceiros utilizado pela instalação — antigo ou novo.

### O que esclarece

A resposta reforça que há parâmetros prévios à configuração operacional dos Terceiros e que o modelo utilizado pela instalação tem impacto nas funcionalidades disponíveis.

> Não é possível reconstruir literalmente a pergunta devido à baixa confiabilidade do trecho transcrito.

---

## 16.3. Pergunta retórica sobre criação de novos fornecedores

### Pergunta

O instrutor pergunta aos participantes o que ocorreria se fosse necessário criar um novo fornecedor quando as atividades dependiam de definição rígida na aplicação.

### Resposta

A resposta implícita é que seria necessário alterar o código da aplicação para incluir o novo código de atividade.

### O que esclarece

Esse ponto justifica a evolução para uma marca configurável de fornecedor no catálogo de atividades.

---

## 16.4. Convite a dúvidas no encerramento

### Pergunta

Ao final, o instrutor convida os participantes a enviarem dúvidas ou perguntas sobre o conteúdo apresentado.

### Resposta

Não há perguntas técnicas adicionais registradas antes do encerramento.

### O que esclarece

A sessão termina sem debate adicional sobre os temas pendentes; a continuidade foi encaminhada para a semana seguinte.

---

## 17. Limitações reconhecidas durante a reunião

| Limitação ou ressalva | Evidência/contexto |
|---|---|
| Nem toda atividade ou fornecedor precisa utilizar todos os blocos de informação | O uso depende da atividade e da realidade de cada instalação |
| Nem todos os países ou instalações têm os mesmos ramos, fornecedores ou necessidades | O instrutor cita diferenças por país e por realidade local |
| Zonas de fornecedores não precisam coincidir com geografia administrativa ou estrutura comercial | A rede de fornecedores possui lógica própria |
| Tarifas, zonas e demais recursos dependem de decisão e maturidade do negócio local | A companhia pode estar em estágios diferentes de desenvolvimento |
| Formação de fornecedores não estaria implementada no sistema na data da sessão | O instrutor aponta o tema como possibilidade futura/evolutiva |
| O modelo de estado utiliza cinco estados do núcleo | Não há indicação de criação de estados adicionais |
| Registrar SICURF sem processo de tratamento não gera valor operacional | É necessária gestão efetiva das ocorrências |
| Tipologia e categoria isoladas não produzem comportamento automático | Dependem de regras ou algoritmos que as utilizem |
| Convênios de pagamento podem existir, mas não são apresentados como universais | Aplicação depende da configuração local |
| O autosserviço é mencionado, mas não é demonstrado em profundidade | Não foram detalhados fluxos de autenticação, integrações ou telas específicas |

---

## 18. Riscos e desafios

## 18.1. Riscos explicitamente mencionados

### Qualidade inadequada de fornecedores

Fornecedores com desempenho insuficiente podem comprometer a qualidade do serviço entregue aos segurados. A resposta operacional pode envolver avaliação, suspensão ou baixa.

### Fraude

A possibilidade de fraude é reconhecida como motivo para investigação, suspensão, rejeição ou encerramento da relação com o fornecedor.

### Falta de capacidade operacional

Um fornecedor pode temporariamente não atender à demanda, por exemplo devido à indisponibilidade de funcionários. A atribuição de serviços sem considerar esse fator pode gerar sobrecarga e baixa qualidade.

### Falta de documentação, permissões ou requisitos

A ausência de documentação, permissões legais, contratos ou requisitos necessários pode impedir autorização ou justificar suspensão.

### Uso inadequado de catálogos de qualidade/SICURF

Apenas registrar ocorrências sem tratá-las corretamente é apresentado como insuficiente para controlar a qualidade dos fornecedores.

---

## 18.2. Desafios derivados do contexto — análise

> Esta subseção contém inferências analíticas baseadas no conteúdo da reunião, não declarações literais dos participantes.

### Governança de dados mestres

A quantidade de catálogos — atividades, blocos, serviços, zonas, tipologias, categorias, estados, causas, tarifas e convênios — indica que a qualidade do modelo depende de governança forte de dados mestres. Configurações inconsistentes podem reduzir a confiabilidade da atribuição em sinistros.

### Complexidade de configuração entre atividades

A flexibilidade por atividade reduz rigidez, mas aumenta a necessidade de desenhar corretamente cada perfil de fornecedor. Uma configuração inadequada pode expor blocos irrelevantes, ocultar dados necessários ou permitir combinações impróprias de tipologia e categoria.

### Dependência entre áreas

A solução exige alinhamento entre negócio, sinistros, tesouraria, segurança e áreas responsáveis pela rede de fornecedores. O instrutor deixa claro que a tecnologia não substitui decisões de negócio, como definir tarifas, capacidade ou critérios de qualidade.

### Risco de automação baseada em dados incompletos

A atribuição automatizada de serviços depende de dados atualizados sobre capacidades, horários, zonas e serviços. Se tais dados não forem mantidos, as decisões de atribuição podem ser inadequadas.

---

## 19. Transformações estruturais identificadas

## 19.1. De classificação genérica para configuração por capacidade

A trajetória descrita vai de uma categoria ampla de fornecedor para uma configuração baseada em atividade e atributos específicos.

```text
Fornecedor genérico
        ↓
Atividades diferenciadas
        ↓
Marca de fornecedor por atividade
        ↓
Configurações específicas por perfil operacional
```

Isso sugere uma transformação de classificação puramente cadastral para uma representação mais operacional do fornecedor.

## 19.2. De cadastro isolado para rede integrada a processos

O fornecedor não é apresentado como um registro independente. Ele é parte de uma rede utilizada por:

- sinistros;
- autosserviço;
- tesouraria;
- mecanismos de qualidade;
- controles de fraude;
- gestão de reclamações e incidências.

A principal transformação é tratar o fornecedor como capacidade operacional da seguradora, e não apenas como um cadastro de contato.

## 19.3. De manutenção técnica rígida para parametrização

A marca de fornecedor no catálogo de atividades é apresentada como resposta à necessidade de evitar alteração de código para cada nova classificação de fornecedor.

> **Leitura analítica:** isso indica uma direção de parametrização e desacoplamento parcial entre evolução de regras de negócio e alteração da aplicação.

## 19.4. De seleção informal para atribuição orientada por critérios

A discussão sobre zonas, serviços, capacidade, horários, tarifas, qualidade e categoria indica uma direção para decisões de atribuição mais estruturadas no módulo de sinistros.

A reunião não confirma que todos esses critérios já sejam utilizados automaticamente em todas as instalações. Ela demonstra que o modelo de configuração existe para suportar esse tipo de operação.

---

## 20. Números e indicadores citados

| Indicador ou dado | Valor mencionado | Contexto |
|---|---:|---|
| Sessões da formação | 2 | Capacitação sobre fornecedores |
| Grandes grupos de configuração de fornecedores | 8 | Identificação/acesso, serviços, zonas, tarifas, atendimento, avaliação, fraude e SICURF |
| Estados de fornecedor do núcleo | 5 | Ativo, suspenso de atribuição, baixa total, pendente de autorização e solicitação rejeitada |
| Códigos de atividade reservados | 1 a 99; 110; 999 | Uso exclusivo do núcleo, segundo documentação exibida |
| Atividade de oficinas concertadas | 17 | Visível no filtro e nos exemplos de fornecedor |
| Atividade de vidraceiros | 20 | Exemplo exibido na documentação |
| Atividade de chaveiros | 21 | Exemplo exibido na documentação |
| Duração excedida da sessão | 12 minutos | O instrutor informa que ultrapassou o horário antes de encerrar |
| Possível meta de capacidade de oficina pequena | “200 veículos por semana” | Exemplo hipotético de limite de capacidade; não é métrica oficial |

> Os números acima são declarações ou evidências mostradas durante a reunião. Não representam dados auditados externamente.

---

## 21. Roadmap e próximos passos mencionados

A continuidade planejada é explícita:

### Próxima sessão de capacitação

A sessão seguinte trataria dos demais grupos de definição de fornecedores, em especial:

- serviços;
- zonas geográficas de atribuição;
- tarifas;
- atendimento;
- e os demais catálogos não detalhados no primeiro encontro.

### Evolução relacionada a formação

O instrutor menciona que um bloco de informação relacionado a formação de fornecedores ainda não estaria implementado, mas seria contemplado por evolução futura.

Não foram citados:

- prazo;
- versão;
- responsável;
- prioridade;
- critérios de aceite;
- data de disponibilização.

---

## 22. O que a reunião não permite concluir

A reunião oferece uma visão funcional rica, mas não permite concluir com segurança os pontos abaixo:

### Infraestrutura e arquitetura técnica

- tecnologia de cloud utilizada;
- bancos de dados;
- Kubernetes, containers ou orquestração;
- topologia de ambientes;
- padrões de disponibilidade;
- disaster recovery;
- backup;
- observabilidade;
- monitoramento;
- logs;
- métricas técnicas;
- CI/CD;
- versionamento de configurações;
- arquitetura de rede.

### Integrações

- se a integração entre Reef.core, sinistros, tesouraria e autosserviço ocorre por API, banco, eventos, arquivos ou outro mecanismo;
- se as integrações são síncronas ou assíncronas;
- contratos de API;
- tratamento de falhas;
- reprocessamento;
- idempotência;
- latência;
- mecanismos de consistência de dados.

### Segurança e identidade

- modelo de IAM;
- autenticação de usuários internos e fornecedores;
- MFA;
- autorização técnica detalhada;
- auditoria de acesso;
- trilhas de auditoria para mudança de estado;
- retenção de logs;
- segregação formal de responsabilidades.

### Operação e governança

- SLA de atendimento;
- responsáveis formais por cada catálogo;
- workflow de aprovação de fornecedor;
- alçadas para tarifas e convênios;
- processo formal de avaliação de qualidade;
- regras de detecção e investigação de fraude;
- métricas de qualidade;
- critérios objetivos de ativação, suspensão e baixa;
- gestão de incidentes;
- governança entre países.

### Regras funcionais detalhadas

- algoritmo de atribuição de fornecedor;
- prioridade entre zona, custo, capacidade, qualidade e categoria;
- como é calculada a capacidade;
- como são definidas tarifas;
- relação exata entre tipologia/categoria e regras de sinistro;
- campos completos de cada bloco de fornecedor;
- estrutura integral de atividades e códigos do núcleo;
- diferenças completas entre modelo antigo e novo de Terceiros.

---

## 23. Conclusões principais

1. **Fornecedor é uma especialização de Terceiro.**  
   Pessoas físicas e jurídicas são modeladas como Terceiros, e uma atividade marcada como fornecedora habilita dados e comportamentos adicionais.

2. **O código de atividade é o principal eixo funcional.**  
   Ele define o contexto operacional no qual o Terceiro atua e permite diferenciar perfis como oficina, hospital, clínica ou chaveiro.

3. **O modelo evoluiu para reduzir rigidez.**  
   A substituição de uma identificação genérica de fornecedor por uma marca configurável por atividade busca permitir maior adaptação sem alteração recorrente do código da aplicação.

4. **A configuração de fornecedores é transversal.**  
   Ela não serve apenas ao cadastro: influencia autosserviço, sinistros, liquidações, pagamentos, atendimento, qualidade, fraude e gestão de incidências.

5. **A flexibilidade vem acompanhada de governança necessária.**  
   Blocos de informação, serviços, zonas, tarifas, papéis, permissões, estados, causas, tipologias e categorias devem ser configurados de forma coerente com a operação da seguradora.

6. **O módulo de sinistros é consumidor central dessas definições.**  
   Ele utiliza informações de fornecedor para atribuir serviços, considerar capacidades e tarifas e originar operações que podem seguir para tesouraria.

7. **Estados e causas permitem controlar o ciclo de vida do fornecedor.**  
   O modelo prevê ativação, suspensão, baixa, pendência de autorização e rejeição, com motivos configuráveis para tornar a situação operacionalmente compreensível.

8. **A apresentação é funcional, não técnica de infraestrutura.**  
   Ela oferece uma visão sólida de regras e catálogos de negócio, mas não detalha mecanismos de integração, arquitetura de sistemas, segurança técnica ou operação de plataforma.

A principal mensagem da reunião é que a gestão de fornecedores no Reef.core deve ser entendida como uma capacidade corporativa configurável: não se trata apenas de registrar prestadores, mas de estruturar uma rede operacional capaz de atender processos de seguros com critérios de serviço, cobertura, capacidade, custo, qualidade e controle.
