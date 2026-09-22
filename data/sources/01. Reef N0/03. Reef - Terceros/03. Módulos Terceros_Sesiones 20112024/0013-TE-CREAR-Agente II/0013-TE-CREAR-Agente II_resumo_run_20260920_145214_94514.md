# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `0013-TE-CREAR-Agente II.mp4`
**Data de processamento:** 20/09/2026 14:57:22
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise Estruturada — Cadastro de Terceiros, Agentes, Sinistros, Companhias e Resseguradoras

> **Base documental:** transcrição de treinamento funcional/técnico sobre a rotina de terceiros de um sistema de seguros, aparentemente denominado “Ricor/Riskor” em alguns trechos. A grafia exata do nome do sistema não pode ser confirmada devido a possíveis erros de reconhecimento de voz.  
>
> **Rastreabilidade:** a transcrição não contém timestamps ou numeração de linhas; por isso, as informações abaixo são rastreáveis pelos trechos temáticos e exemplos reproduzidos conceitualmente.  
>
> **Nota de fidelidade:** termos, siglas e nomes potencialmente deformados foram preservados ou tratados como incertos quando não havia evidência suficiente para corrigi-los.

---

## 1. Síntese executiva

A sessão apresentou o funcionamento da **rotina de terceiros** em uma plataforma de seguros, com foco na criação, configuração e manutenção de diferentes tipos de entidades que participam da operação: agentes, terceiros genéricos — como médicos, procuradores, clínicas e oficinas —, supervisores, tramitadores de sinistros, companhias e companhias resseguradoras.

A principal mensagem do treinamento é que o cadastro de um terceiro não é uma atividade isolada. Ele depende de tabelas e catálogos de configuração definidos anteriormente e influencia diretamente processos posteriores, especialmente emissão de apólices, comissionamento, liquidação, sinistros, distribuição de trabalho, tributação e integração operacional.

O instrutor explica que o sistema combina:

- blocos comuns de dados para diversos tipos de terceiros;
- blocos específicos conforme a atividade exercida;
- tabelas externas à rotina principal de terceiros;
- parâmetros por companhia, atividade, estrutura comercial, produto, ramo ou tratamento;
- controles de validade, habilitação e inabilitação;
- regras de segurança e autorização de usuários.

O conteúdo também evidencia uma transição ou convivência entre um **modelo de dados antigo** e um **modelo mais novo**, no qual entidades antes mantidas em tabelas próprias — como companhias, bancos e unidades organizacionais — passam a ser tratadas como terceiros, reutilizando estruturas de informação comuns.

---

## 2. Contexto e antecedentes

A reunião faz parte de um treinamento progressivo sobre operações de terceiros. O instrutor informa que os participantes já haviam visto:

- os componentes comuns aplicáveis a terceiros;
- os “nove blocos” principais de informação;
- a rotina específica de terceiros;
- parte das configurações relacionadas a agentes;
- tabelas de classificação, agrupamento, atividade e outros catálogos de suporte.

A sessão ocorre antes de treinamentos sobre emissão e sinistros. Segundo o instrutor, o mesmo padrão conceitual será reencontrado nesses módulos: existe uma camada de configuração prévia que determina como as operações posteriores poderão funcionar.

### 2.1 Princípio de configuração prévia

A plataforma foi apresentada como altamente orientada por parâmetros. Antes de realizar operações de negócio, é necessário que tabelas, catálogos, classificações, estruturas e regras estejam configurados.

A lógica relatada pode ser representada assim:

```text
Tabelas e catálogos de configuração
↓
Definição de entidades, classificações e permissões
↓
Cadastro de terceiros e suas capacidades operacionais
↓
Processos de emissão, sinistros, liquidação e demais operações
```

O instrutor alerta que essa flexibilidade oferece muitas possibilidades à seguradora, mas também aumenta o risco de configurações inadequadas ou incoerentes.

### 2.2 Implantação nova versus ambiente já configurado

Foi feita uma distinção importante entre dois cenários:

| Cenário | Característica destacada |
|---|---|
| Instalação nova | Há mais trabalho de configuração inicial, mas também maior controle sobre as definições criadas. |
| Instalação existente | É necessário conviver com configurações herdadas; por isso, compreender os conceitos e impactos torna-se essencial para evitar efeitos negativos no negócio. |

A ideia central é que uma configuração aparentemente local pode afetar outras partes do sistema. Essa dependência torna o conhecimento das estruturas prévias indispensável para equipes de implantação, suporte, fornecedores e operação.

---

## 3. Problemas e desafios identificados

## 3.1 Dependência entre cadastros e operações futuras

O sistema não “deduz” automaticamente quais operações um agente, tramitador ou terceiro pode realizar. As permissões e capacidades precisam estar explicitamente cadastradas.

Um exemplo apresentado foi o do agente cuja única fonte de produção habilitada é uma determinada oficina comercial. Nesse caso, durante a emissão, o agente somente poderá intermediar apólices dentro daquele contexto configurado.

### Consequência

Se a fonte, canal ou escritório necessário não estiver habilitado para o agente, o processo de emissão ficará limitado, mesmo que o agente exista e esteja ativo no cadastro.

---

## 3.2 Risco de inconsistência temporal

O instrutor mostrou um exemplo em que uma fonte de produção possuía data de validade anterior à data de alta do agente. Ele considera que, em condições lógicas normais, isso deveria ser tratado como erro ou *bug* no ambiente.

### Relação de causa e efeito

```text
Cadastro ou carga direta sem validações adequadas
↓
Datas de validade incoerentes entre agente e fonte de produção
↓
Possibilidade de comportamento inconsistente em emissão
↓
Necessidade de validações de vigência no processo operacional
```

O instrutor associa esse tipo de situação a ambientes clonados ou a manipulações feitas diretamente “por baixo”, isto é, em tabelas ou mecanismos técnicos, sem o uso das telas e validações normais da aplicação.

---

## 3.3 Limitações e indisponibilidade dos ambientes de demonstração

Ao longo da sessão, vários ambientes de desenvolvimento, integração ou treinamento apresentaram falhas, restrições ou ausência de acesso. Isso impediu a demonstração completa de algumas operações.

Foram mencionados problemas como:

- funcionalidades bloqueadas;
- telas indisponíveis;
- erros de instalação ou manutenção de ambiente;
- dados incompletos;
- serviços aparentemente inativos;
- permissões insuficientes para determinadas atividades;
- uso de modelo de dados antigo em alguns ambientes;
- comportamentos anômalos associados a dados carregados via PL/SQL, fora das validações usuais do sistema.

Essas limitações não anulam a explicação funcional, mas reduzem a possibilidade de verificar todos os passos diretamente na interface.

---

## 3.4 Controle de acesso por atividade

O instrutor tentou criar ou modificar terceiros em determinadas atividades, como médicos ou procuradores, mas o sistema não permitiu a operação. A explicação apresentada foi que existe uma configuração de acesso que restringe quais atividades cada usuário pode consultar ou manter.

Isso demonstra que a segurança não se limita a permitir ou negar acesso ao sistema como um todo. Ela pode restringir:

- quais atividades um usuário pode acessar;
- se o usuário pode apenas consultar ou também alterar;
- quais informações um usuário pode visualizar;
- quais atributos sensíveis podem ficar ocultos mesmo em modo de consulta.

---

## 4. Modelo conceitual da rotina de terceiros

A rotina de terceiros é apresentada como uma base transversal da plataforma. Nela são cadastradas pessoas físicas ou jurídicas que assumem diferentes papéis no negócio de seguros.

A estrutura geral parece combinar:

```text
Terceiro
├── Dados comuns
│   ├── Dados básicos e identificação
│   ├── Contatos
│   ├── Endereços
│   ├── Documentação
│   ├── Representantes e acionistas, quando aplicável
│   ├── Informações de cobrança e pagamento, quando aplicável
│   └── Outros blocos comuns
│
└── Dados específicos por atividade
    ├── Agente
    ├── Terceiro genérico
    ├── Supervisor
    ├── Tramitador
    ├── Companhia
    └── Companhia resseguradora
```

A transcrição menciona repetidamente “nove blocos” comuns de informação para terceiros. Contudo, a reunião não fornece uma lista consolidada e completa desses nove blocos. Alguns foram citados explicitamente, mas não é possível determinar com segurança todos eles apenas a partir do material.

---

## 5. Arquitetura funcional consolidada

Abaixo está uma representação analítica da arquitetura funcional descrita. Não corresponde a um diagrama literal exibido na reunião.

```text
Configurações corporativas e por companhia
├── Estrutura comercial
├── Atividades de terceiros
├── Classificações
├── Qualidades
├── Tipos de retenção
├── Causas de inabilitação
├── Quadros de comissão
├── Subvenções
├── Critérios de atribuição de sinistros
├── Estados de supervisores e tramitadores
├── Usuários, papéis e permissões
└── Parâmetros de produto, ramo e sinistros
        ↓
Rotina de terceiros
├── Cadastro de agentes
├── Cadastro de terceiros genéricos
├── Cadastro de supervisores
├── Cadastro de tramitadores
├── Cadastro de companhias
└── Cadastro de companhias resseguradoras
        ↓
Processos consumidores
├── Emissão de apólices
├── Intermediação e distribuição
├── Cálculo e liquidação de comissões
├── Subvenções
├── Sinistros
├── Atribuição de expedientes
├── Tesouraria
├── Tributação
├── Fidelização
└── Resseguro
```

### Leitura analítica

Uma leitura possível é que a plataforma adota uma arquitetura funcional baseada em **cadastros mestres configuráveis**. O terceiro não é somente uma entidade cadastral; ele se torna uma unidade operacional cuja atuação depende de parametrizações específicas.

---

## 6. Agentes

## 6.1 Papel do agente

O agente é um terceiro com atividade específica e dados próprios. Além das informações comuns, o sistema solicita elementos relacionados à sua operação comercial e à possibilidade de intermediar apólices.

Foram citados, entre outros, os seguintes campos ou conceitos:

- tipo de agente;
- escritório ou oficina de produção padrão;
- fonte de produção padrão;
- organizador, assessor ou executivo de conta;
- qualidade;
- tipo de retenção;
- situação de inabilitação;
- causa de inabilitação.

A transcrição sugere que o agente pode ser pessoa física ou jurídica, mas não detalha todos os critérios de classificação aplicáveis.

---

## 6.2 Dados básicos imutáveis

O instrutor explica que alguns dados nascem com o cadastro do agente e não podem ser alterados posteriormente, principalmente os dados básicos de identificação.

Outros dados podem ser modificados ao longo do tempo, desde que respeitados os períodos de validade.

### Implicação funcional

A separação entre dados imutáveis e dados com vigência sugere que o sistema preserva a identidade histórica do terceiro, enquanto permite a evolução controlada de atributos operacionais.

---

## 6.3 Fonte de produção e escritório comercial

Ao criar um agente, o sistema exige a associação de uma oficina ou escritório pertencente ao terceiro nível da estrutura comercial. Essa associação é tratada como obrigatória.

Contudo, o instrutor esclarece que o simples preenchimento da oficina padrão não basta para habilitar toda a operação do agente. É necessário cadastrar também as demais fontes de produção ou distribuição nas quais o agente poderá atuar.

### Modelo apresentado

```text
Agente
├── Oficina comercial padrão obrigatória
└── Fontes de produção ou distribuição habilitadas
    ├── Código da fonte/escritório/canal
    ├── Data de início de validade
    ├── Data de inabilitação, se aplicável
    └── Estado de habilitação
```

### Efeito na emissão

No processo de emissão, o sistema deve validar se:

1. a apólice está associada à fonte ou escritório utilizado;
2. o agente está habilitado para aquela fonte;
3. a vigência da habilitação cobre a data de efeito da apólice.

---

## 6.4 Fontes de produção não são necessariamente escritórios

O instrutor faz uma ressalva importante: fontes de distribuição não devem ser entendidas apenas como escritórios físicos.

Elas representam os meios ou canais pelos quais o contrato de seguro é concluído com o cliente. Foram mencionados exemplos como:

- atendimento telefônico;
- canal online;
- escritório físico;
- outros meios configurados pela seguradora.

Em alguns ambientes demonstrados, fontes de produção pareciam coincidir com escritórios comerciais porque o ambiente possuía apenas esse tipo de configuração. Essa coincidência não deve ser interpretada como regra geral do produto.

---

## 6.5 Datas de validade e inabilitação

Uma fonte de produção pode ser vinculada a um agente com data de início própria, que pode ser diferente da data de alta do agente.

Também é possível marcar uma fonte como inabilitada. O instrutor observa que seria incomum criar uma fonte já inabilitada, mas que a aplicação permite esse cenário.

| Elemento | Finalidade |
|---|---|
| Data de validade | Define a partir de quando a fonte pode ser utilizada pelo agente. |
| Inabilitação | Interrompe ou restringe a possibilidade de atuação naquela fonte. |
| Data de inabilitação | Registra quando a restrição passa a vigorar. |

---

## 6.6 Quadros de comissão habilitados

Além da rotina de terceiros, o agente precisa receber os quadros de comissão aplicáveis. Esses registros são mantidos no **GDC**, apresentado como “Gerador de Conceitos” ou aplicação de manutenção de conceitos. A expansão exata da sigla não é completamente confirmada pela transcrição, embora o instrutor a associe a “generador de conceptos”.

O fluxo apresentado é:

```text
Definir quadros de comissão no nível da companhia
↓
Associar os quadros de comissão ao agente
↓
Aplicar o quadro conforme o tratamento aplicável
```

Os quadros são atribuídos por tratamento, e não diretamente por ramo. Foram citados quatro tratamentos:

- vida;
- transportes;
- automóveis;
- diversos.

### Exemplo explicado

Se um agente intermediar apólices de vida e de automóveis, deverá possuir pelo menos dois registros de quadro de comissão, pois se tratam de dois tratamentos distintos.

### Inabilitação por processo

A configuração pode indicar que determinado quadro de comissão está inabilitado para:

- nova produção;
- carteira;
- ou ambos os contextos, conforme a lógica configurada.

A reunião não detalha completamente os valores possíveis nem o comportamento exato de cada marca no cálculo de comissão.

---

## 6.7 Subvenções habilitadas

As subvenções do agente também são configuradas fora da rotina principal de terceiros, no GDC.

Foram mencionados os seguintes atributos:

| Atributo | Descrição apresentada |
|---|---|
| Código do agente | Identifica quem recebe a subvenção. |
| Classificação da subvenção | Define a tipologia aplicável. |
| Periodicidade ou gatilho | Mensal ou associada ao recebimento/anulação de recebimentos. |
| Forma de aplicação | Valor, percentual ou regra de negócio. |
| Conceito de ajuste | Conceito utilizado na liquidação de comissões. |
| Agrupamento contábil | Relacionado a tratamento contábil, a ser visto em tesouraria. |
| Data inicial | Início da concessão. |
| Data de vencimento | Fim da vigência da subvenção. |
| Moeda | Aplicável quando a subvenção é por valor. |
| Valor mínimo | Aplicável em determinados cenários de cobrança ou anulação. |
| Percentual | Aplicável quando a subvenção é percentual. |
| Estado/habilitação | Indica se a subvenção está ativa. |

O instrutor reconhece uma dúvida não resolvida durante a reunião: não foi possível confirmar se determinado valor mínimo é acumulado ou analisado individualmente.

> **Limitação explícita:** a transcrição não permite concluir a regra de acumulação utilizada para o valor mínimo citado nas subvenções.

---

## 6.8 Agente como terceiro não desejado

O agente pode ser classificado como “terceiro não desejado”, usando mecanismo semelhante ao aplicado a segurados e terceiros genéricos.

O processo descrito envolve:

1. localizar o terceiro por dados de identificação, alias, telefone, e-mail ou outros critérios;
2. selecionar o registro;
3. acessar o painel de informação de terceiros não desejados;
4. definir o escopo da restrição;
5. atribuir estado, classificação, motivo e período.

A transcrição menciona que a classificação pode ser direcionada por setor, ramo, escritório ou agente, conforme as possibilidades da estrutura.

---

## 7. Terceiros genéricos

## 7.1 Conceito

Terceiros genéricos são pessoas físicas ou jurídicas associadas a atividades que, embora distintas operacionalmente, compartilham a mesma estrutura de informação específica.

Foram citados como exemplos:

- médicos — atividade 5;
- procuradores — atividade 7;
- cobradores — atividade 12;
- clínicas — atividade 18;
- oficinas — atividade 17;
- advogados;
- julgados ou tribunais, em referência a uma possível atividade;
- vidraceiros;
- encanadores;
- guinchos, embora o termo tenha sido reconhecido de forma incerta em um trecho.

A transcrição não fornece uma relação oficial e exaustiva das atividades.

---

## 7.2 Estrutura padronizada

O instrutor afirma que um médico, procurador, cobrador, clínica ou oficina utiliza essencialmente o mesmo painel específico de terceiro genérico. O que muda são valores e catálogos associados à atividade.

Os dados citados incluem:

- associação a escritório comercial;
- agrupamento comercial;
- compensação;
- qualidade;
- tipo de retenção;
- data de validade;
- inabilitação e causa;
- classificação;
- número de colegiado, quando aplicável;
- identificador fiscal;
- situação tributária;
- IVA ou imposto equivalente;
- observações.

### Implicação funcional

A plataforma busca reutilizar um modelo único para muitas atividades profissionais, evitando a criação de uma estrutura de cadastro específica para cada profissão.

---

## 7.3 Tributação e retenção

O instrutor explica que o tipo de retenção funciona como uma indicação inicial ligada à atividade profissional. Dependendo da configuração, pode determinar se há retenção fiscal e, em camadas posteriores, quais regras tributárias devem ser aplicadas.

Também é mencionado que a situação tributária pode variar conforme:

- operação realizada;
- natureza do serviço;
- existência de isenção;
- jurisdição;
- localidade, incluindo eventual zona franca.

O cadastro do terceiro captura uma configuração inicial, mas não determina necessariamente de forma definitiva a tributação de todas as operações futuras.

---

## 7.4 Necessidade de mudanças na estrutura

O instrutor afirma que, em princípio, a estrutura genérica utilizada para essas atividades tem sido suficiente por muitos anos.

Caso um país necessite de campos ou estrutura específica para determinada atividade, isso seria tecnicamente possível, mas deveria ser discutido com o grupo responsável pelo núcleo da solução:

- o que será alterado;
- como será alterado;
- por que será alterado;
- qual o impacto no núcleo comum.

### Leitura analítica

Isso indica uma governança central sobre alterações estruturais, buscando evitar que necessidades locais produzam mudanças não coordenadas no modelo comum.

---

## 7.5 Terceiro genérico não desejado

O procedimento para marcar terceiros genéricos como não desejados é descrito como igual ao usado para agentes e segurados.

A reunião enfatiza que se trata de uma manutenção comum de terceiros não desejados, e não de uma funcionalidade exclusiva de cada atividade.

---

## 8. Supervisores de sinistros

## 8.1 Papel operacional

O supervisor é uma atividade específica, identificada pelo código 8. Ele participa da estrutura de gestão de sinistros e pode supervisionar um ou mais tramitadores.

A transcrição descreve o supervisor como alguém que possui sob sua responsabilidade um conjunto de tramitadores de sinistros, potencialmente em uma cadeia hierárquica que pode incluir supervisores de supervisores.

---

## 8.2 Informações específicas

Além dos blocos comuns de terceiros, o supervisor possui uma tela ou painel específico. Foram citados:

| Campo ou conceito | Finalidade |
|---|---|
| Código do supervisor | Identificador do supervisor no sistema. |
| Código de usuário | Liga o supervisor a um usuário da companhia. |
| Atividade | Herdada dos dados básicos; para supervisor, atividade 8. |
| Terceiro nível da estrutura comercial | Unidade organizacional à qual está associado. |
| Estado | Situação operacional do supervisor. |
| Data de validade | Vigência do cadastro ou condição operacional. |
| Número de sinistros atribuídos | Quantidade atual sob sua gestão. |
| Supervisor responsável | Possível superior na cadeia de supervisão. |
| Inabilitação e causa | Estado e razão de indisponibilidade. |

Os estados mencionados foram:

- ativo;
- baixa;
- baixa definitiva;
- suspenso;
- suspenso para atribuição.

A transcrição não confirma se esses são todos os estados possíveis no catálogo.

---

## 8.3 Suspensão de atribuição

Quando um supervisor está suspenso para atribuição, o processo de distribuição de sinistros não deve encaminhar novos expedientes aos tramitadores vinculados a esse supervisor, desde que as regras de atribuição considerem esse estado.

O instrutor sugere que essa situação pode ser usada para controlar carga de trabalho ou interromper temporariamente novas atribuições.

---

## 8.4 Número de sinistros atribuídos

O número de sinistros atribuídos ao supervisor é atualizado automaticamente conforme ocorrem eventos como:

- abertura;
- encerramento;
- atribuição;
- reatribuição de sinistros.

Na alta inicial do supervisor, esse campo não deve possuir valor operacional relevante, pois ainda não haverá sinistros sob sua responsabilidade.

---

## 8.5 Interface operacional de sinistros

O instrutor menciona que supervisores e tramitadores possuem menus ou funcionalidades específicas para facilitar a gestão da carteira de expedientes.

Essas funcionalidades devem permitir, por exemplo:

- visualizar quantidade de expedientes;
- identificar estados;
- filtrar por fase;
- acompanhar expedientes em liquidação ou outras situações;
- organizar o trabalho diário.

O detalhamento dessa operação seria apresentado posteriormente por uma pessoa chamada Marta, no treinamento específico do módulo de sinistros.

---

## 9. Tramitadores de sinistros

## 9.1 Conceito

O tramitador é a atividade 9 e representa o profissional ou usuário que executa a gestão de sinistros e expedientes.

A atividade possui:

- blocos comuns de terceiros;
- um painel de informações específico;
- critérios de atribuição;
- cessões temporárias;
- papéis de atuação secundários.

A transcrição também sugere que a documentação ou configuração de um ambiente estava inconsistente quanto ao bloco de meios de cobrança e pagamento para tramitadores. O instrutor afirma que esse bloco não deveria estar presente para essa atividade.

> **Limitação explícita:** não é possível concluir se a presença desse bloco era apenas erro de documentação, erro de ambiente ou comportamento efetivamente previsto em alguma versão do sistema.

---

## 9.2 Informações do tramitador

Foram mencionados os seguintes dados:

| Campo ou conceito | Descrição |
|---|---|
| Código do tramitador | Identificador interno do tramitador. |
| Código de usuário | Usuário da companhia utilizado para acesso ao sistema. |
| Atividade | Herdada dos dados básicos; para tramitador, atividade 9. |
| Tipologia do tramitador | Subclassificação operacional. |
| Estrutura comercial | Unidade organizacional associada. |
| Supervisor padrão | Supervisor responsável pelo tramitador. |
| Estado | Ativo, baixa, baixa definitiva, suspenso ou suspenso de atribuição. |
| Causa de inabilitação | Motivo da indisponibilidade, quando aplicável. |
| Marca de perguntas/consequências | Define comportamento da tela de abertura de sinistro. |
| Número de expedientes atribuídos | Contador atualizado automaticamente. |
| Número máximo de expedientes | Limite individual de carga. |
| Modificação de data de controle | Permissão específica, condicionada a parâmetros corporativos. |

---

## 9.3 Tipologias de tramitador

A transcrição menciona as seguintes tipologias, embora haja alguma ambiguidade na quantidade total de tipos:

- tramitador puro;
- recepcionista;
- operador de centro telefônico ou *call center*;
- advogado;
- colaborador externo.

O instrutor indica que a classificação define capacidades e papéis possíveis no tratamento de sinistros.

### Exemplo

Um operador de centro telefônico pode estar limitado à abertura inicial do sinistro, sem permissão para executar etapas avançadas da tramitação.

Já um advogado pode atuar em processos específicos, especialmente relacionados a expedientes judiciais, e eventualmente receber um papel secundário que lhe permita atuar como tramitador em determinados contextos.

---

## 9.4 Marca de perguntas e consequências

Existe uma marca cuja ativação altera a apresentação de informações na abertura de sinistros.

Segundo o instrutor:

- quando ativada, o sistema exibe perguntas associadas às consequências;
- quando não ativada, o sistema pode mostrar descrições das consequências.

O objetivo apresentado é apoiar profissionais menos experientes durante a abertura de sinistros, funcionando como uma espécie de guia operacional.

### Interpretação contextual

A funcionalidade parece servir como mecanismo de adaptação da interface ao nível de experiência do tramitador, reduzindo a dependência de conhecimento prévio em cenários de maior complexidade.

---

## 9.5 Controle da carga de trabalho

O sistema mantém automaticamente o número de expedientes atribuídos a cada tramitador. Esse contador é alterado quando ocorre, entre outras ações:

- abertura;
- encerramento;
- reabertura;
- atribuição;
- reatribuição;
- outras alterações que afetem a composição da carteira do tramitador.

Além disso, o cadastro permite definir um número máximo de expedientes para cada pessoa.

### Motivação apresentada

O limite não é necessariamente um mecanismo para restringir tramitadores juniores. Pode ser usado, por exemplo, para:

- proteger um profissional recém-chegado;
- respeitar diferenças de produtividade;
- controlar carga de especialistas;
- direcionar casos complexos a profissionais seniores;
- equilibrar capacidade conforme a natureza dos expedientes.

---

## 9.6 Data de controle

O cadastro pode indicar se determinado tramitador está autorizado a modificar a data de controle de um expediente.

Essa possibilidade depende de duas condições:

1. a companhia deve ter configurado que os planos de tramitação trabalham com data de controle;
2. o tramitador deve possuir a marca individual que permite a alteração.

---

## 10. Critérios de atribuição de sinistros

## 10.1 Objetivo

Os critérios de atribuição definem em quais contextos um tramitador pode receber expedientes. Eles são utilizados pelo processo de atribuição automática de sinistros.

O instrutor deixa claro que não existe um processo padrão único para todas as companhias. A lógica de distribuição depende de decisões de negócio locais e das regras configuradas pela área responsável, com implementação pelo time de tecnologia.

---

## 10.2 Níveis de especialização

Os critérios podem restringir ou ampliar o escopo de atuação de um tramitador segundo múltiplas dimensões.

| Critério citado | Possível finalidade |
|---|---|
| Setor | Especializar por segmento ou estrutura de produto. |
| Ramo técnico | Restringir a atuação a um ramo específico. |
| Apólice | Direcionar uma apólice específica a determinado tramitador. |
| Grupo de apólices | Direcionar uma carteira ou agrupamento. |
| Contrato ou subcontrato | Atribuir segundo estruturas contratuais. |
| Agente | Tratar sinistros de apólices intermediadas por determinado agente. |
| Estrutura comercial | Considerar primeiro nível, segundo nível ou escritório específico. |
| Tipo de expediente | Especializar por natureza do sinistro. |
| Processos judiciais | Incluir ou excluir expedientes com juízo ou litígio. |
| Perda total | Incluir ou excluir determinados casos de perda total. |
| Ocorrência no exterior | Considerar ou excluir sinistros internacionais. |
| Cliente VIP | Direcionar clientes estratégicos ou de tratamento diferenciado. |
| Contrário também segurado pela companhia | Considerar cenários específicos de conflito ou tratamento. |

---

## 10.3 Exemplo de especialização por apólice relevante

Foi citado o caso de uma apólice relacionada à Pemex, empresa petrolífera mexicana, com prêmio mencionado como podendo chegar a “500 milhões de dólares”. A transcrição apresenta o exemplo como ilustração de uma apólice de grande porte e complexidade.

O propósito do exemplo é demonstrar que uma apólice estratégica, de alto valor ou associada a cliente VIP pode exigir encaminhamento a uma equipe ou tramitador especializado.

> **Ressalva:** o valor citado é uma fala do instrutor em contexto exemplificativo. A reunião não fornece documentação independente que confirme a existência, o valor ou as condições exatas dessa apólice.

---

## 10.4 Exemplo por tipo de expediente

O instrutor contrasta:

- sinistros simples de vidros de automóveis;
- sinistros envolvendo lesões corporais, morte ou danos permanentes.

A ideia é que tipos de expediente mais sensíveis ou complexos podem exigir profissionais especializados, enquanto casos padronizados podem ser distribuídos de forma mais ampla.

---

## 10.5 Balanceamento de carga

Durante a sessão, um participante pergunta se existe um balanceador de carga ou mecanismo semelhante para distribuir sinistros entre os tramitadores.

A resposta é que esse comportamento depende dos critérios de atribuição e das regras específicas de cada companhia. Não há, segundo o instrutor, um processo padrão universal.

### O que essa resposta esclarece

- O sistema possui informações necessárias para apoiar a distribuição de trabalho.
- A estratégia de balanceamento não é apresentada como produto fechado ou algoritmo fixo.
- A regra pode considerar diferença percentual de carga, limites individuais, especialização e outras condições.
- A área de operações ou sinistros deve definir o comportamento desejado, que posteriormente será implementado tecnicamente.

---

## 11. Cessões temporárias

## 11.1 Objetivo

As cessões temporárias permitem que os expedientes de um tramitador sejam transferidos para outro durante um período determinado.

O exemplo principal é a ausência por férias, mas a transcrição não restringe a funcionalidade a esse caso.

```text
Tramitador cedente
↓
Cessão válida por período definido
↓
Tramitador destinatário
↓
Continuidade no tratamento dos expedientes
```

### Problema que a funcionalidade busca evitar

Sem reassociação adequada, expedientes poderiam permanecer sem tratamento, gerando demora e eventualmente reclamações de segurados.

---

## 11.2 Dados mencionados

| Atributo | Finalidade |
|---|---|
| Atividade | Herdada dos dados básicos; corresponde ao tramitador. |
| Tramitador cedente | Pessoa que transfere temporariamente a carteira. |
| Tramitador destinatário | Pessoa que receberá os expedientes. |
| Data de início | Início da cessão. |
| Data de fim ou retorno | Período até a volta do cedente ou encerramento da necessidade. |

A transcrição não detalha como ocorre o retorno automático ou manual dos expedientes após o fim da cessão.

---

## 12. Papéis de atuação secundários

## 12.1 Finalidade

Os papéis secundários permitem alterar, em escopos específicos, o papel operacional de determinados tramitadores.

A funcionalidade é apresentada como exceção controlada, usada quando uma necessidade operacional exige que alguém atue de forma diferente da sua tipologia principal.

### Exemplo relatado

Um advogado, normalmente associado a atividades jurídicas, pode receber temporariamente um papel de tramitador para determinado:

- setor;
- ramo técnico;
- tipo de expediente;
- conjunto genérico de casos.

---

## 12.2 Restrições de uso

A transcrição indica que a funcionalidade é permitida para determinadas tipologias de tramitador, listadas pelo instrutor como:

- recepcionista;
- operador de centro telefônico;
- advogado;
- colaborador;
- possivelmente outra tipologia citada de forma pouco clara.

O instrutor observa que não faria sentido atribuir a um tramitador puro um papel secundário de tramitador, pois essa já seria sua função principal.

> **Limitação:** a quantidade exata de tipologias existentes e a lista oficial de tipologias elegíveis não podem ser confirmadas integralmente pela transcrição.

---

## 13. Modelo operacional e governança

## 13.1 Segurança e permissões

A operação da rotina de terceiros é governada por usuários, papéis, aplicações e permissões.

Foram mencionados:

- catálogo de aplicações;
- usuários;
- papéis;
- acesso por atividade;
- acesso somente para consulta;
- restrição de alteração;
- restrição de visualização de certas informações.

A transcrição indica que o GDC e as demais rotinas dependem de acesso autorizado, concedido conforme usuário e papel.

---

## 13.2 Separação de responsabilidades

Embora muitas pessoas possam acessar a rotina de terceiros, o instrutor sugere que a manutenção de atividades relacionadas a sinistros deveria ficar principalmente sob responsabilidade de equipes de sinistros.

Essa observação é apresentada como prática lógica de segregação operacional, não como regra técnica absoluta confirmada para todos os ambientes.

### Leitura analítica

A estrutura descrita aponta para uma governança baseada em:

```text
Segurança de acesso
+
Especialização por área
+
Configuração de atividades
+
Permissões de consulta e alteração
=
Controle operacional sobre dados mestres
```

---

## 13.3 Configuração versus execução

A reunião diferencia repetidamente dois níveis:

| Nível | Exemplo |
|---|---|
| Configuração | Definir critérios de atribuição, limites de carga, estados, tipologias e estruturas. |
| Operação | Abrir, atribuir, tratar, encerrar ou reatribuir sinistros. |

A rotina de terceiros parece configurar os participantes da operação. Já o módulo de sinistros executa efetivamente o ciclo de vida dos expedientes.

---

## 14. Companhia como terceiro

## 14.1 Contexto de migração de modelo

A atividade 39 representa a companhia no novo modelo de terceiros.

O instrutor explica que, no modelo antigo, companhias eram mantidas em uma estrutura própria de parâmetros de companhia. Entretanto, como parte dessas informações se assemelhava a dados de terceiros — como identificação, endereço e contatos — decidiu-se representar a companhia também como terceiro no novo modelo.

### Mudança de paradigma identificada

```text
Modelo anterior
Companhia em tabela ou manutenção própria
↓
Modelo novo
Companhia tratada como terceiro com atividade específica
```

Essa transformação não significa que todos os dados de uma companhia sejam idênticos aos de um terceiro comum. Há atributos específicos que permanecem exclusivos da companhia.

---

## 14.2 Blocos de informação disponíveis

Para a atividade de companhia, o instrutor relata uma estrutura mais restrita do que a de uma pessoa jurídica genérica. Alguns blocos não são habilitados, como:

- meios de cobrança e pagamento;
- representantes legais;
- documentos alternativos.

A reunião não fornece uma lista formal completa de blocos ativos e inativos.

---

## 14.3 Informações específicas da companhia

Foram citados os seguintes atributos:

| Atributo | Descrição contextual |
|---|---|
| Código da companhia | Identificador da companhia. |
| Abreviatura | Nome resumido. |
| Razão social | Nome legal. |
| Moeda | Moeda associada à companhia. |
| Moeda local de origem | Parâmetro que afeta conversões entre moedas. |
| País | Informação relacionada à companhia. |
| Chave patronal | Identificador relacionado à estrutura corporativa ou trabalhista. |
| Chave societária | Identificador de acordo com o grupo. |
| Uso de ferramenta corporativa de resseguro | Relacionado ao “RE21”, conforme a fala. |
| Sábados e domingos laborais | Parâmetros de calendário operacional. |
| Programa de fidelização | Parâmetros ligados a pontos chamados “trebles”, conforme transcrição. |
| Limite mínimo e máximo de pontos | Parâmetros de uso do programa de fidelização. |

---

## 14.4 RE21

O termo “RE21” foi mencionado como ferramenta corporativa relacionada a cessão e colocação de resseguro.

A transcrição afirma que essa ferramenta é corporativa e tem custo elevado, razão pela qual não seria utilizada por todos.

> **Limitação:** a reunião não descreve arquitetura, integrações, fornecedores, protocolo técnico ou funcionamento interno do RE21. Não é possível concluir se “RE21” é a grafia exata do nome.

---

## 14.5 Programa de fidelização e “trebles”

A companhia pode ter parâmetros para um programa de fidelização, incluindo moeda e quantidade mínima e máxima de pontos chamados “trebles” na transcrição.

O instrutor relaciona esse mecanismo a:

- segurados;
- tesouraria;
- desconto no recebimento de prêmios ou recibos;
- obtenção de pontos;
- resgate de pontos.

A lógica descrita depende da correta configuração de todas essas partes.

> **Limitação:** a reunião não detalha como os pontos são calculados, acumulados, resgatados ou integrados aos processos financeiros.

---

## 14.6 Moeda local de origem e conversão cambial

O instrutor explica que a marca de “moeda local de origem” altera a lógica de conversão cambial.

O exemplo apresentado usa dólares e pesetas/euros apenas para ilustrar que a ordem de conversão e o arredondamento podem produzir resultados contábeis diferentes.

### Ideia central

Quando o parâmetro não está ativado, a conversão pode ser feita diretamente em uma direção. Quando está ativado, o cálculo parte da moeda local, passa pela outra moeda e pode retornar, gerando diferenças de arredondamento.

### Implicação de negócio

A definição não é meramente técnica. Ela possui impacto contábil e precisa ser decidida pela área financeira.

---

## 15. Companhia resseguradora

## 15.1 Conceito

A companhia resseguradora é cadastrada como terceiro com atividade 14.

O instrutor destaca que todas as companhias resseguradoras com as quais a companhia local trabalha devem ser identificadas dessa forma no sistema.

Diferentemente da atividade de companhia, a resseguradora aparentemente utiliza os nove grupos de informação de terceiros, além de um bloco específico.

---

## 15.2 Dados específicos mencionados

| Atributo | Finalidade apresentada |
|---|---|
| Tipologia da resseguradora | Indica se é afiliada local, não afiliada, estrangeira ou outra categoria equivalente. |
| Nome abreviado | Identificação resumida. |
| Código de rating | Classificação específica para resseguradoras. |
| País de origem | Aplicável principalmente a entidades estrangeiras. |
| Código do corretor de resseguro | Identifica broker relacionado, quando houver. |
| Data de efeito | Início da relação entre companhia local e resseguradora. |
| Data de vencimento | Término da relação comercial. |
| Imposto sobre juros de depósitos de resseguro | Código tributário aplicável. |
| Retenção | Retenção fiscal aplicável às operações. |
| Plano de pagamento | Periodicidade de liquidação econômica. |
| Capital subscrito | Dado mantido para a resseguradora; o motivo exato não foi confirmado. |
| Chave perante superintendência de seguros | Identificador regulatório local. |
| Inabilitação e causa | Estado operacional e justificativa. |

---

## 15.3 Rating específico

O instrutor afirma que o rating de resseguradoras utiliza catálogo próprio, distinto do rating aplicável a terceiros em geral.

A classificação é configurada conforme decisão ou necessidade da área local responsável.

---

## 15.4 Relação com brokers

Caso a resseguradora trabalhe localmente com um broker específico, o broker deve ser identificado por código.

Esse broker também é tratado como outro terceiro no sistema, porém com atividade específica que não foi detalhada na reunião.

---

## 15.5 Relação econômica e liquidação

O plano de pagamento define a periodicidade esperada de liquidação das operações com a resseguradora. Foram citados exemplos como liquidação mensal, trimestral ou semestral, dependendo de fatores como:

- número de operações;
- tipo de contrato de resseguro;
- tamanho da companhia;
- capacidade contratual;
- acordos comerciais.

A reunião menciona a emissão de bordereaux de resseguro, mas não detalha formato, integração, geração ou validação desses documentos.

---

## 15.6 Relação entre produto e resseguro

O cadastro da resseguradora é apenas uma parte do cenário. O instrutor destaca que o resseguro também depende de configurações no produto e em suas coberturas.

Foi mencionado que, no gerador de produtos, uma cobertura pode ser marcada como possuindo ou não resseguro. Quando possui, configurações adicionais tornam-se necessárias.

### Exemplo apresentado

No seguro de automóveis, coberturas como danos materiais, roubo, incêndio e vidros podem usar bases distintas de cálculo, mas o capital de resseguro não deve ser simplesmente somado sem considerar a regra específica.

O instrutor usa o valor do veículo como ilustração para explicar que o capital ressegurado de coberturas correlatas não pode necessariamente exceder de forma indevida a exposição econômica real.

---

## 16. Perguntas e respostas relevantes

## 16.1 Existe balanceamento automático de carga entre tramitadores?

### Pergunta

Um participante pergunta se há um balanceador de carga ou mecanismo similar na distribuição de sinistros.

### Resposta

O instrutor responde que o processo de atribuição considera os critérios cadastrados, mas que a lógica não é padronizada entre companhias. Cada seguradora pode definir suas próprias regras de distribuição.

### O que isso esclarece

A plataforma fornece informações e critérios para suportar a atribuição, mas não foi apresentada como possuidora de um algoritmo universal de balanceamento.

---

## 16.2 O supervisor pode redistribuir expedientes?

### Pergunta

O participante pergunta se o responsável hierárquico pode entrar, assumir ou redistribuir os expedientes de uma pessoa que esteja bloqueada para receber novos casos.

### Resposta

O instrutor afirma que, se possuir o acesso adequado, o supervisor pode acessar a rotina e alterar o que for necessário nos dados específicos do tramitador.

### O que isso esclarece

A gestão manual depende de permissões. A existência da relação hierárquica entre supervisor e tramitador não implica, por si só, acesso irrestrito: o usuário responsável precisa estar autorizado.

---

## 16.3 Por que não era possível alterar médicos ou procuradores durante a demonstração?

### Pergunta implícita

Durante a tentativa de operar atividades genéricas, o sistema não permitiu acesso ou alteração.

### Resposta

O instrutor explica que seu usuário não possuía acesso àquelas atividades, em razão de uma tabela ou configuração de permissões.

### O que isso esclarece

A rotina de terceiros possui controle de acesso granular por atividade, não apenas por módulo.

---

## 17. Números, códigos e indicadores citados

Os dados abaixo foram declarados durante a sessão e não foram auditados externamente.

| Indicador ou código | Valor mencionado | Contexto |
|---|---:|---|
| Blocos comuns de terceiros | 9 | Estrutura geral de dados compartilhados. |
| Atividade de agente | 2 | Código citado para agentes. |
| Atividade de médico | 5 | Exemplo de terceiro genérico. |
| Atividade de procurador | 7 | Exemplo de terceiro genérico. |
| Atividade de supervisor | 8 | Cadastro de supervisor de sinistros. |
| Atividade de tramitador | 9 | Cadastro de gestor de sinistros. |
| Atividade de cobrador | 12 | Exemplo de terceiro genérico. |
| Atividade de resseguradora | 14 | Companhia resseguradora. |
| Atividade de oficina | 17 | Exemplo de terceiro genérico. |
| Atividade de clínica | 18 | Exemplo de terceiro genérico. |
| Atividade de companhia | 39 | Companhia no novo modelo de terceiros. |
| Tratamentos de comissão citados | 4 | Vida, transportes, automóveis e diversos. |
| Limite de expedientes em exemplo | 3 | Valor demonstrado para um tramitador em ambiente de treinamento. |
| Prêmio citado no exemplo Pemex | 500 milhões de dólares | Exemplo ilustrativo de apólice de grande porte. |
| Fonte/escritório padrão de exemplo | 11-03 | Exemplo de oficina comercial. |
| Fontes de exemplo | 1001, 1002, 5111 | Códigos usados em demonstração. |
| Data de exemplo | 28/10 | Data associada a alta ou validade em exemplo demonstrado. |
| Data de exemplo | 01/01/2016 | Vigência anterior apresentada como possível inconsistência. |

---

## 18. Limitações reconhecidas

## 18.1 Ambientes inconsistentes

A demonstração prática foi prejudicada por falhas nos ambientes. O instrutor reconhece que várias telas, registros e operações não puderam ser exibidos adequadamente.

## 18.2 Dados carregados sem validação da aplicação

O instrutor sugere que certos comportamentos incorretos ocorrem porque alguns dados foram criados diretamente por PL/SQL ou por mecanismos técnicos, sem passar pelas validações da aplicação.

## 18.3 Regras de subvenção não confirmadas

Não foi possível confirmar se determinado valor mínimo de subvenção é tratado de modo acumulado ou individual.

## 18.4 Algoritmo de distribuição não definido

Não existe, conforme apresentado, uma regra universal de balanceamento ou atribuição de sinistros. A definição depende de cada companhia.

## 18.5 Detalhamento de sinistros postergado

O treinamento não detalha a operação completa de sinistros, submódulos judiciais, perícias, faturamento ou planos de renda. Esses tópicos seriam tratados posteriormente em treinamento específico.

## 18.6 GDC parcialmente demonstrado

O GDC foi explicado conceitualmente, mas a demonstração de telas de subvenções e quadros de comissão foi limitada por falhas dos ambientes.

---

## 19. Riscos e desafios

## 19.1 Riscos explicitamente mencionados

- Configurações inadequadas podem afetar o negócio.
- Fontes de produção não habilitadas limitam emissão e intermediação.
- Datas incoerentes podem gerar comportamento anômalo.
- Cargas diretas em banco ou manipulações fora da aplicação podem burlar validações.
- Expedições sem reatribuição temporária podem ficar sem tratamento.
- Atrasos em sinistros podem provocar reclamações de segurados.
- Alterações locais em estruturas genéricas devem ser discutidas com o núcleo da solução.
- Permissões insuficientes ou mal configuradas podem impedir operações necessárias ou expor informações indevidas.

## 19.2 Desafios derivados do contexto — análise

As interpretações abaixo não são afirmações literais dos participantes.

### Complexidade de parametrização

A quantidade de catálogos, vigências, atividades, estruturas comerciais e critérios indica que a flexibilidade do sistema exige uma governança forte de configuração. Sem isso, há risco de inconsistências difíceis de diagnosticar.

### Dependência entre áreas

A configuração de terceiros influencia emissão, sinistros, comissões, tesouraria, tributação, fidelização e resseguro. Isso sugere que mudanças cadastrais relevantes devem ser coordenadas entre áreas de negócio, operação, tecnologia e finanças.

### Potencial de divergência entre ambientes

As referências a clones, ambientes de integração, ambientes antigos e cargas técnicas sugerem risco de divergência de comportamento entre ambientes de treinamento, desenvolvimento e operação.

---

## 20. Transformações estruturais identificadas

## 20.1 De cadastro isolado para cadastro operacional

Os terceiros não são tratados apenas como contatos ou cadastros administrativos. Eles possuem atributos que determinam como participam de operações críticas.

```text
Cadastro básico
↓
Habilitação operacional
↓
Capacidade de atuar em processos de negócio
```

---

## 20.2 De regra fixa para configuração por companhia

A distribuição de sinistros, tratamento de comissões, subvenções, acesso e especialização não são descritos como comportamentos rígidos e universais. A solução parece apoiar configurações específicas por companhia.

---

## 20.3 De entidade técnica isolada para modelo comum de terceiros

A inclusão de companhias como terceiros no modelo novo indica um movimento de consolidação de entidades que compartilham características cadastrais.

```text
Tabelas específicas no modelo antigo
↓
Reutilização de blocos de terceiros no modelo novo
↓
Atributos específicos preservados por atividade
```

---

## 20.4 De gestão genérica para especialização de sinistros

O modelo de tramitadores permite especializar a gestão por:

- ramo;
- setor;
- apólice;
- agente;
- escritório;
- tipo de expediente;
- complexidade;
- condição jurídica;
- perfil de cliente.

Isso aponta para uma operação de sinistros orientada a capacidade, experiência e criticidade, não apenas a distribuição uniforme de volume.

---

## 21. O que a reunião não permite concluir

A transcrição não fornece detalhes suficientes para determinar com segurança:

- a grafia oficial e a arquitetura técnica do sistema chamado “Ricor/Riskor”;
- linguagem de programação, banco de dados ou infraestrutura utilizada;
- tecnologia de front-end;
- uso de APIs, eventos, mensageria ou integrações por arquivos;
- estratégia de CI/CD;
- ambiente de cloud ou infraestrutura local;
- modelo de IAM além das permissões mencionadas;
- mecanismos de auditoria;
- SLA, SLO ou métricas operacionais;
- plano de contingência, disaster recovery ou alta disponibilidade;
- estrutura completa dos nove blocos de terceiros;
- catálogo integral de atividades;
- catálogo integral de estados de supervisores e tramitadores;
- algoritmo ou regra padrão de distribuição de sinistros;
- critérios de cálculo de comissões;
- critério de acumulação dos valores mínimos de subvenções;
- detalhamento técnico do GDC;
- funcionamento interno do RE21;
- regras completas de fidelização e dos “trebles”;
- formato e periodicidade técnica dos bordereaux de resseguro;
- integração entre produto, emissão, sinistros, tesouraria e resseguro;
- roadmap formal com datas, responsáveis e entregas.

---

## 22. Conclusões principais

1. A rotina de terceiros é uma fundação operacional da plataforma de seguros e influencia múltiplos módulos posteriores.

2. O sistema depende fortemente de configuração prévia. Tabelas, catálogos, estruturas, vigências e permissões definem quais operações serão possíveis.

3. Agentes precisam ter fontes de produção ou distribuição corretamente habilitadas para poder intermediar apólices nos canais correspondentes.

4. Quadros de comissão e subvenções são mantidos fora da rotina principal de terceiros, no GDC, e complementam a habilitação operacional do agente.

5. Terceiros genéricos reutilizam uma mesma estrutura de informação, reduzindo a necessidade de modelos exclusivos para cada profissão ou fornecedor.

6. Supervisores e tramitadores possuem informações específicas voltadas à gestão de sinistros, carga de trabalho, hierarquia, permissões e especialização.

7. Os critérios de atribuição permitem grande granularidade na distribuição de sinistros, mas a lógica final precisa ser definida por cada companhia.

8. Cessões temporárias evitam que expedientes permaneçam sem tratamento quando um tramitador se ausenta.

9. Papéis secundários permitem exceções operacionais controladas, como habilitar determinadas tipologias a atuarem de forma diferente em cenários delimitados.

10. A atividade de companhia no novo modelo de terceiros representa uma evolução do modelo de dados, incorporando entidades antes mantidas em cadastros próprios.

11. Companhias resseguradoras são tratadas como terceiros especializados, com atributos operacionais, tributários, financeiros e regulatórios específicos.

12. A transcrição reforça a necessidade de governança, segurança de acesso, gestão de configuração e coordenação entre negócio e tecnologia para evitar impactos operacionais decorrentes de cadastros inconsistentes.
