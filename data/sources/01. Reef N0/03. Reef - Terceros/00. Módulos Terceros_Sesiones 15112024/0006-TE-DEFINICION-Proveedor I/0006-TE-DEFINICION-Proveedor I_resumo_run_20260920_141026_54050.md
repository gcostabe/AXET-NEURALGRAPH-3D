# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `0006-TE-DEFINICION-Proveedor I.mp4`
**Data de processamento:** 20/09/2026 14:15:53
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise funcional e técnica — Configuração de terceiros, sinistros e fornecedores no Rift Core

> **Nota de fidelidade:** a transcrição parece originada de reconhecimento automático de voz, contém espanhol com termos técnicos e algumas inconsistências. Nesta análise, termos como “Rift Core” e “Trifor” foram preservados conforme registrados; o contexto indica que provavelmente se referem ao mesmo ecossistema, mas a transcrição não permite confirmar isso com segurança.  
> As informações abaixo são reconstruídas exclusivamente a partir da reunião. Onde houver interpretação, isso é indicado explicitamente.

## 1. Síntese executiva

A reunião foi uma sessão de treinamento funcional sobre configurações de **terceiros** em um sistema chamado na transcrição de **Rift Core**, com foco inicial na operação de sinistros e, posteriormente, na gestão de fornecedores.

A explicação parte de uma premissa central: o sistema deve ser entendido como um conjunto integrado, e não como módulos isolados. Decisões tomadas na estrutura de produtos, estrutura comercial, geografia, terceiros, sinistros, tesouraria e resseguro influenciam-se mutuamente. A configuração correta dos dados mestres e dos catálogos é, portanto, condição para que os processos operacionais funcionem de forma coerente.

A primeira parte aborda a organização do trabalho de sinistros por meio de:

- supervisores;
- tramitadores, isto é, profissionais que tratam expedientes de sinistro;
- critérios automáticos de distribuição;
- cessão temporária de expedientes;
- alterações de função ou papel do tramitador;
- especialização por produto, setor, apólice, tipo de expediente e outras marcas operacionais.

A segunda parte apresenta tipos específicos de terceiros, incluindo:

- companhias seguradoras e resseguradoras;
- brokers;
- empregados de agências e agentes;
- entidades bancárias;
- agências ou sucursais bancárias;
- níveis da estrutura comercial;
- fornecedores.

A parte mais extensa da reunião trata da evolução do modelo de fornecedores. O sistema permite identificar fornecedores por atividade, mas o simples cadastro de um terceiro em uma atividade marcada como fornecedora não o transforma automaticamente em fornecedor plenamente utilizável nos processos de sinistros. Para isso, são necessários catálogos complementares de configuração, envolvendo serviços, zonas geográficas, tarifas, avaliações, fraudes, capacidade, atendimento, perfis de acesso, tipos, categorias, estados e convênios de pagamento.

A mensagem principal foi que a plataforma procura suportar realidades operacionais distintas entre países e empresas do grupo, oferecendo estruturas de configuração amplas. A contrapartida é que cada país deve decidir cuidadosamente quais opções aplicam ao seu contexto, sem assumir que todas as funcionalidades disponíveis precisam ser utilizadas.

---

## 2. Contexto e antecedentes

A reunião ocorre no contexto de treinamento sobre o funcionamento funcional do sistema, especialmente sobre a gestão de terceiros e sua relação com sinistros.

O instrutor reforça repetidamente que o sistema não deve ser compreendido como uma soma de áreas independentes. A configuração de um ramo, por exemplo, não pode ser feita considerando apenas cálculo de prêmio ou emissão. Ela deve considerar impactos em:

- sinistros;
- tesouraria;
- contabilidade;
- resseguro;
- cosseguro;
- estrutura comercial;
- estrutura geográfica;
- cadastro de terceiros;
- fornecedores.

A fala sugere que Rift Core atende organizações de diferentes tamanhos e países. Por isso, vários parâmetros são configuráveis por companhia e devem acomodar desde empresas pequenas até operações com milhares de colaboradores e estruturas hierárquicas mais complexas.

Também foi mencionada uma transição ou coexistência entre um **modelo antigo de dados de terceiros** e um **novo modelo de dados de terceiros**. No modelo anterior, várias informações pareciam estar concentradas em uma única tabela. No novo modelo, essas informações são distribuídas em múltiplas tabelas, inclusive tabelas comuns e específicas ou “satélites”.

A transcrição não detalha:

- a tecnologia de banco de dados utilizada pelo sistema como um todo;
- a versão exata do produto;
- a data da sessão;
- o estágio de implantação do novo modelo de terceiros;
- como ocorre a migração entre o modelo antigo e o novo.

Há menções explícitas a tabelas Oracle no contexto de configurações de supervisão, mas isso não permite concluir que toda a arquitetura da solução dependa exclusivamente de Oracle.

---

## 3. Problemas e necessidades operacionais discutidos

### 3.1 Distribuir sinistros de forma adequada

A reunião apresenta como necessidade central a distribuição de sinistros e expedientes para pessoas com capacidade técnica, disponibilidade e perfil compatíveis.

A simples distribuição aleatória ou baseada em critérios irrelevantes é tratada como inadequada. O instrutor usa, de modo informal, o exemplo de distribuir mais casos a alguém por sobrenome, para mostrar que a distribuição precisa seguir critérios operacionais e técnicos.

Os critérios podem considerar, entre outros:

- carga de trabalho atual;
- setor;
- ramo técnico;
- apólice específica;
- apólice-grupo;
- tipo de expediente;
- especialidade do profissional;
- experiência;
- atuação em sinistros ocorridos no exterior;
- participação de partes contrárias também vinculadas à seguradora;
- perfil ou papel do tramitador;
- limites máximos de expedientes atribuídos.

### 3.2 Tratar sinistros simples e complexos de maneira diferente

A reunião diferencia casos massivos ou rotineiros de casos relevantes ou complexos.

Exemplos apresentados:

- quebra de vidros de veículos;
- pequenos danos em automóveis;
- sinistros de grande impacto econômico;
- incêndio do edifício Windsor, em Madri;
- referência hipotética às Torres Gêmeas;
- transporte de carga geral versus carga como petróleo;
- sinistros de responsabilidade civil;
- ocorrências em viagens internacionais;
- sinistros com danos materiais, lesões, morte ou responsabilidade civil.

A necessidade implícita é evitar que todos os casos recebam o mesmo tratamento. Casos de maior complexidade, impacto, sensibilidade ou relevância para o cliente podem exigir concentração da gestão em supervisores ou tramitadores específicos.

### 3.3 Manter continuidade operacional durante ausências

A reunião identifica a necessidade de evitar que expedientes fiquem sem tratamento quando um tramitador se ausenta por motivos como:

- férias;
- doença;
- licença-maternidade;
- licença-paternidade;
- afastamento temporário;
- outras situações operacionais.

O mecanismo apresentado para tratar esse problema é a **cessão temporária de expedientes**, permitindo que um tramitador transfira sua carteira de trabalho para outro.

### 3.4 Administrar redes de fornecedores de forma controlada

No contexto de fornecedores, a necessidade é ir além do simples cadastro de oficinas, clínicas, vidraçarias, chaveiros ou peritos.

A organização precisa definir, conforme cada atividade:

- que informações devem ser coletadas;
- quais serviços o fornecedor presta;
- em quais zonas pode atuar;
- quais tarifas podem ser aplicadas;
- como será avaliado;
- quais papéis podem acessar ou alterar suas informações;
- em quais condições pode receber novas designações;
- como será tratado em casos de fraude, baixa qualidade ou renegociação;
- quais prazos de pagamento foram convencionados.

---

## 4. Visão funcional apresentada

A solução apresentada é baseada em catálogos de configuração. Esses catálogos permitem parametrizar como pessoas, organizações, fornecedores e entidades relacionadas operam dentro do sistema.

A lógica geral pode ser representada assim:

```text
Estruturas corporativas e de produto
        ↓
Configuração de terceiros e atividades
        ↓
Perfis, especializações e regras de elegibilidade
        ↓
Distribuição de sinistros / gestão de expedientes
        ↓
Interação com fornecedores e execução operacional
        ↓
Liquidação técnica e pagamento via tesouraria
```

> **Leitura analítica:** a configuração funciona como uma camada de regras operacionais que determina quem pode atuar, em qual contexto, com quais permissões e sob quais condições. Isso sugere uma arquitetura fortemente orientada a dados mestres e parametrização, embora a transcrição não detalhe o mecanismo técnico de execução dessas regras.

---

## 5. Arquitetura lógica consolidada

A reunião não apresentou um diagrama formal. A representação abaixo é uma consolidação analítica dos componentes mencionados.

```text
Usuários da companhia
├── Supervisores
│   ├── Supervisionam tramitadores
│   └── Podem supervisionar outros supervisores
│
├── Tramitadores
│   ├── Recepcionistas / call center
│   ├── Tramitadores especializados
│   ├── Advogados
│   └── Colaboradores, conforme tipologia configurada
│
└── Usuários com papéis de fornecedores
    └── Acesso configurado por companhia, atividade e papel

Cadastro de terceiros
├── Pessoas e entidades genéricas
├── Companhias seguradoras / resseguradoras
├── Entidades bancárias
├── Sucursais bancárias
├── Níveis da estrutura comercial
├── Tramitadores
├── Supervisores
└── Fornecedores

Módulo de sinistros
├── Registro de sinistro
├── Um sinistro pode gerar 0, 1 ou N expedientes
├── Distribuição automática de expedientes
├── Cessão de expedientes
├── Atuação por papel do tramitador
└── Integração funcional com fornecedores

Gestão de fornecedores
├── Atividades marcadas como fornecedoras
├── Blocos de informação por atividade
├── Tipologias e categorias
├── Serviços e serviços de valor agregado
├── Zonas geográficas
├── Tarifas
├── Atendimento e capacidade
├── Avaliação
├── Fraude
├── Formação
└── Convênios de pagamento

Tesouraria
└── Executa pagamentos originados tecnicamente no processo de sinistros
```

---

## 6. Supervisores no módulo de sinistros

### 6.1 Conceito de supervisor

O supervisor é descrito como uma pessoa que gerencia ou supervisiona o trabalho dos tramitadores sob sua responsabilidade.

O supervisor não precisa ter a mesma quantidade de tramitadores que outros supervisores. A distribuição organizacional pode variar conforme:

- porte da companhia;
- estrutura interna;
- especialização;
- ramo;
- produto;
- país;
- decisões da direção técnica de sinistros.

O instrutor menciona que empresas maiores podem ter estruturas mais complexas, incluindo supervisores de supervisores. Como exemplo comparativo, foi mencionada a possibilidade de uma estrutura mais hierárquica em “Mapfre Brasil” do que em “Mapfre Honduras”, embora esses nomes tenham sido transcritos em meio a uma fala informal e não representem necessariamente uma arquitetura oficial documentada.

### 6.2 Critérios de atribuição de supervisores

O sistema permite configurar critérios para direcionar sinistros a supervisores. Esses critérios podem estar relacionados a:

- carga de trabalho;
- setor;
- ramo técnico;
- apólice;
- especialidade;
- combinação entre critérios técnicos e critérios de gestão.

A finalidade é distribuir automaticamente os sinistros entre os supervisores elegíveis.

### 6.3 Especialização por produto

Foram mencionados critérios que permitem definir se um supervisor pode receber sinistros de:

- todos os setores;
- um setor específico;
- todos os ramos de um setor;
- um ramo técnico específico;
- uma ou mais apólices específicas.

A combinação setor + ramo técnico é apresentada como forma de aumentar a granularidade da especialização.

### 6.4 Casos de alta relevância

A reunião usa como exemplo o incêndio do edifício Windsor, em Madri, para ilustrar a possibilidade de vincular uma apólice ou caso específico a um supervisor determinado.

O raciocínio exposto é que, em sinistros de grande relevância, maior centralização de informação e interlocução pode ser desejável. O supervisor pode atuar como “os olhos e a cara” da seguradora diante do cliente.

Isso contrasta com sinistros massivos e simples, como pequenos danos ou quebra de vidros de veículos, que tendem a operar com maior volume e menor necessidade de centralização individual.

### 6.5 Hierarquia de supervisores

Existe uma configuração destinada a registrar relações de responsabilidade entre supervisores.

A estrutura pode considerar:

- companhia;
- código do supervisor responsável;
- código do supervisor subordinado ou associado;
- setor;
- ramo técnico.

A reunião afirma que essa estrutura é mantida em uma tabela de configuração, mencionada explicitamente como tabela Oracle.

---

## 7. Tramitadores e distribuição de expedientes

### 7.1 Papel do tramitador

O tramitador é apresentado como a pessoa que gerencia expedientes de sinistro.

A transcrição associa os tramitadores à **atividade 9**. Também afirma que atividades de 1 a 99, além da 999, são atividades de núcleo e não devem ser alteradas por países ou instalações locais. Quando for necessária uma atividade específica de um país, a orientação é utilizar códigos a partir de 100.

### 7.2 Sinistro e expediente

A reunião faz uma distinção conceitual importante:

- um **sinistro** pode ter 0, 1 ou N expedientes;
- cada expediente representa uma parte da gestão, especialmente a parte econômica, quando aplicável.

A transcrição informa que esse assunto seria aprofundado em módulo específico de sinistros. Portanto, não detalha completamente:

- a estrutura de dados de sinistro;
- a definição de expediente;
- os eventos de criação;
- as regras contábeis;
- os estados possíveis de um expediente.

### 7.3 Critérios de distribuição para tramitadores

A configuração de critérios de atribuição de tramitadores pode considerar:

| Critério citado | Finalidade descrita |
|---|---|
| Código do tramitador | Identificar o profissional elegível |
| Setor | Especializar por segmento de produto |
| Ramo técnico | Especializar por ramo |
| Número de apólice | Direcionar casos específicos |
| Apólice-grupo | Associar gestão a agrupamentos de apólices |
| Estrutura comercial | Especializar por níveis comerciais, incluindo oficina |
| Tipo de expediente | Direcionar por especialidade, como danos próprios ou responsabilidade civil |
| Carga de trabalho | Evitar sobrecarga |
| Ocorrência no exterior | Direcionar para quem tem experiência nesse cenário |
| Parte contrária vinculada à seguradora | Evitar situações consideradas inadequadas |
| Perda total | Identificar profissionais habilitados para esse tipo de caso |
| Processos judiciais | Especializar casos com litígio |
| Clientes VIP | Direcionar atendimento diferenciado |

Os critérios devem ser tratados como parte de um único registro de regra de atribuição, e não como decisões isoladas.

### 7.4 Capacidade, experiência e desempenho

O instrutor reforça que o sistema pode suportar políticas de distribuição que considerem experiência e capacidade.

Uma pessoa recém-contratada, por exemplo, não deveria necessariamente receber o mesmo tipo ou volume de casos que uma pessoa experiente.

Também foi discutido que métricas de produtividade não deveriam considerar apenas quantidade de casos tratados. Foram citados, de forma ilustrativa:

- quantidade de expedientes;
- qualidade;
- tempo ou velocidade de tramitação;
- erros;
- cumprimento de metas;
- bonificação variável.

O exemplo compara uma pessoa que tratou mil expedientes, mas demorou mais ou cometeu mais erros, com outra que tratou setecentos expedientes de forma mais eficiente.

> **Importante:** a reunião não afirma que essas métricas já estão implementadas de determinada forma no sistema, nem que compõem formalmente remuneração variável. Elas foram apresentadas como exemplos de critérios que uma companhia poderia considerar com participação de áreas como direção técnica e recursos humanos.

### 7.5 Tipos de tramitador e alteração de papel

Além da atividade 9, um tramitador pode ter uma tipologia ou papel específico.

Exemplos citados:

- recepcionista;
- profissional de call center;
- tramitador;
- advogado;
- colaborador.

O exemplo de recepcionista ou call center mostra uma limitação funcional: esse profissional pode abrir um sinistro, mas não necessariamente executar todas as etapas posteriores de gestão.

O sistema permite configurar atuações secundárias ou alteração de papel para permitir que um tramitador realize funções que originalmente não poderia executar, para combinações específicas de:

- setor;
- ramo técnico;
- tipo de expediente.

Também pode haver mudança de papel ao longo do tempo, inclusive de uma função mais ampla para uma função mais restrita, e não apenas no sentido de evolução.

A transcrição menciona que, para valores genéricos em campos alfanuméricos, o sistema pode utilizar preenchimento com noves ou letras “Z”. Esse ponto foi apresentado como detalhe técnico de modelagem e não foi aprofundado.

---

## 8. Cessão temporária de expedientes

### 8.1 Finalidade

A cessão temporária permite transferir expedientes de um tramitador para outro, mantendo a continuidade da operação.

Os motivos citados incluem:

- férias;
- doença;
- afastamentos;
- licenças;
- necessidade de balanceamento de carga;
- eficiência operacional.

### 8.2 Elementos configuráveis

A configuração inclui, segundo a explicação:

- companhia;
- atividade;
- tramitador cedente;
- tramitador destinatário;
- data de validade ou início da cessão.

A atividade é mantida na configuração mesmo quando todos os envolvidos atuais são tramitadores de atividade 9, pois a intenção original poderia abranger, no futuro, cessões entre supervisores.

### 8.3 Limitação reconhecida

O instrutor afirma, com ressalva, que acredita que a funcionalidade de cessão entre supervisores não está habilitada no momento da documentação utilizada no treinamento.

A orientação foi validar esse ponto com “Marta” no módulo de sinistros.

Portanto, não é possível concluir com segurança:

- se a cessão entre supervisores está disponível atualmente;
- em quais versões essa funcionalidade existe;
- quais permissões seriam necessárias;
- se há restrições adicionais para cessões parciais ou totais.

### 8.4 Limites de carga

A configuração de cessão e distribuição deve considerar:

- número máximo de expedientes atribuíveis a um tramitador;
- número de sinistros pendentes;
- carga adicional gerada por expedientes recebidos por cessão.

Isso evita que a automação direcione casos a alguém que tecnicamente atende aos critérios, mas já esteja sobrecarregado.

---

## 9. Outras categorias de terceiros

### 9.1 Companhias seguradoras e resseguradoras

A reunião menciona catálogos voltados à qualificação ou rating de companhias seguradoras.

Os ratings são apresentados como classificações de solvência ou capacidade financeira. Foram citadas três tipologias:

1. classificação de emissor de curto prazo;
2. classificação de emissor de longo prazo;
3. fortaleza financeira.

O propósito apresentado é apoiar decisões de negócio, especialmente ao trabalhar com riscos relevantes, contratos, resseguro ou contrapartes seguradoras.

Exemplo apresentado: riscos de grande porte, como centros de dados de uma empresa global, poderiam demandar seguradoras com elevada capacidade financeira.

Também foi dito que um registro de rating inabilitado não poderá ser associado ou reutilizado no cadastro de uma companhia resseguradora.

### 9.2 Inconsistência de códigos de atividade

A transcrição apresenta uma inconsistência:

- em um trecho, afirma que companhia seguradora possui atividade 13;
- em outro, afirma que companhia seguradora possui atividade 14;
- posteriormente, afirma que o código 39 identifica companhias da entidade seguradora no novo modelo de terceiros.

Não é possível determinar, somente pela reunião, qual código deve ser usado em cada contexto. A hipótese mais prudente é que os códigos possam referir-se a categorias diferentes, modelos diferentes ou que haja erro de transcrição, mas isso não foi explicado.

### 9.3 Brokers e empregados de agência

Foi informado que, na data do treinamento, não existiam catálogos específicos para brokers de seguros nem para empregados de agências ou agentes.

Isso não significa que essas entidades não sejam suportadas pelo sistema. Significa apenas que não foram apresentados catálogos funcionais adicionais específicos para esses tipos de terceiros.

A reunião ressalta que isso pode mudar no futuro.

### 9.4 Entidades bancárias

No novo modelo de terceiros, entidades bancárias são associadas à atividade 40.

A reunião descreve campos possíveis para sua identificação e cadastro, incluindo:

- companhia;
- código de atividade;
- tipo de documento;
- chave ou número do documento;
- código de entidade bancária;
- nome;
- abreviação;
- dados de contato;
- dados geográficos;
- tipo de entidade;
- tipo de instituição bancária;
- tipo de empresa jurídica;
- tipo de domiciliação;
- data de constituição;
- nacionalidade;
- código de referência;
- indicação de entidade nova ou antiga;
- número de dias para cálculo de data-valor;
- situação de inabilitação.

A finalidade do número de dias adicionais é apoiar a determinação da data-valor em operações financeiras.

Foram citados exemplos de classificações possíveis, como:

- banco;
- caixa de poupança;
- cooperativa de crédito;
- instituição de pagamento;
- instituição de moeda eletrônica;
- instituição financeira;
- entidade de câmbio;
- banco comercial;
- banco de investimento;
- neobanco;
- banco de desenvolvimento comunitário.

A reunião enfatiza que cada país deve utilizar os valores que façam sentido localmente, ainda que o núcleo suporte opções mais amplas.

### 9.5 Sucursais ou escritórios bancários

As sucursais bancárias são associadas à atividade 41.

A estrutura informacional é semelhante à das entidades bancárias, mas inclui referência à entidade bancária à qual a sucursal pertence.

Foram mencionados:

- código da entidade bancária;
- código interno da sucursal;
- nome;
- abreviação;
- dados de localização;
- contato;
- dados geográficos;
- chave SWIFT, quando aplicável.

A estrutura geográfica considerada nesses cadastros vai até o quarto nível, correspondente à localidade, e não até o quinto nível, que a reunião associa a distritos.

### 9.6 Estrutura comercial como terceiros

A reunião relaciona níveis da estrutura comercial a atividades específicas no novo modelo de terceiros:

| Nível citado | Atividade mencionada |
|---|---:|
| Primeiro nível da estrutura comercial | 42 |
| Segundo nível | 43 |
| Terceiro nível | 44 |

O terceiro nível foi associado a escritórios. A reunião afirma que esses níveis não possuem um catálogo funcional adicional próprio naquele ponto, pois seu cadastro ou alteração ocorre na rotina de terceiros, com dados distribuídos nas tabelas pertinentes do novo modelo.

---

## 10. Processamento online e batch

A reunião explica que operações realizadas online também podem ser processadas em modo batch.

O conceito de batch é associado ao uso de “buzones” ou caixas de entrada de informação. Os dados são carregados nesses repositórios e, quando uma tarefa é executada, o sistema processa a criação ou atualização de registros.

Exemplos de cargas possíveis:

- níveis da estrutura comercial;
- sucursais bancárias;
- tramitadores;
- agentes.

A mensagem principal é que as validações aplicadas online também se aplicam ao processamento batch.

Exemplo dado: se um campo, como e-mail, for obrigatório para determinada atividade no processo online, ele também será obrigatório na carga batch.

A reunião não detalha:

- formato de arquivo;
- tecnologia de integração;
- periodicidade;
- mecanismos de reprocessamento;
- tratamento de erros;
- auditoria;
- mensageria;
- APIs envolvidas.

---

## 11. Modelo de fornecedores

### 11.1 Identificação de fornecedor por atividade

O modelo de fornecedores começa no catálogo de atividades.

Cada atividade pode ter uma marca indicando se ela representa ou não uma atividade fornecedora. A identificação é realizada no nível da atividade, e não individualmente no terceiro.

Exemplos citados:

- oficinas, atividade 17;
- vidraceiros, atividade 20;
- chaveiros;
- clínicas;
- peritos;
- outras atividades de prestação de serviços.

A consequência apresentada é:

```text
Terceiro cadastrado em atividade marcada como fornecedora
↓
É identificado como fornecedor em potencial
↓
Ainda precisa de configurações complementares
↓
Torna-se utilizável conforme regras do módulo de fornecedores e sinistros
```

### 11.2 Fornecedor cadastrado não é necessariamente fornecedor operacional

A reunião enfatiza que cadastrar um terceiro em uma atividade fornecedora não significa, por si só, que ele já possa operar como fornecedor designável no sistema.

Para que seja tratado efetivamente como fornecedor, é necessário configurar catálogos específicos relacionados a:

- blocos de informação;
- serviços;
- zonas;
- tarifas;
- tipologias;
- categorias;
- acesso;
- avaliação;
- fraudes;
- pagamento;
- outros elementos operacionais.

Essa distinção é relevante porque evita associar automaticamente qualquer oficina, clínica ou prestador cadastrado a uma rede de atendimento ativa.

### 11.3 Autosserviço de fornecedores

Foi mencionado um autosserviço de fornecedores, descrito como aplicação web “irmã” ou nativa, criada para a organização.

A finalidade indicada é permitir interação web dos fornecedores com a companhia e com os processos relacionados a sinistros.

Entretanto, o acesso ao autosserviço não é automático. A reunião descreve um processo prévio de enrolamento, análise, aprovação e contrato.

O fluxo conceitual apresentado é:

```text
Interesse ou identificação do fornecedor
↓
Análise e avaliação pela companhia
↓
Contrato de prestação de serviços
↓
Configuração das informações exigidas
↓
Habilitação coerente no sistema
↓
Possível acesso ao autosserviço de fornecedores
```

A transcrição não detalha:

- requisitos de segurança;
- autenticação;
- aprovação formal;
- assinatura contratual;
- workflow de onboarding;
- integração entre portal e núcleo;
- dados obrigatórios por atividade;
- critérios de exclusão ou suspensão no portal.

---

## 12. Blocos de informação de fornecedores

### 12.1 Conceito

Blocos de informação são seções de dados organizadas dentro da rotina de fornecedores.

A reunião mostra, como exemplo de tela ou navegação, blocos como:

- serviços;
- marcas;
- serviços de valor agregado;
- zonas de atribuição;
- tarifas;
- dados de atendimento;
- dados de avaliação;
- fraude;
- QRF ou termos semelhantes;
- capacidades;
- formação.

> **Nota de transcrição:** “QRF”, “QRS” e “correfe” aparecem de formas inconsistentes. Não é possível determinar a sigla correta nem seu significado completo a partir do conteúdo apresentado.

### 12.2 Configuração por atividade

Os blocos aplicáveis são definidos por:

- companhia;
- atividade do terceiro;
- marca de aplicabilidade para cada bloco.

A lógica é que diferentes atividades exigem informações diferentes.

Exemplo conceitual apresentado:

```text
Oficina automotiva
├── Tarifas
├── Zonas
├── Serviços
├── Capacidade
├── Avaliação
└── Fraude

Hospital ou clínica
├── Especialidades e serviços
├── Zonas
├── Atendimento
├── Capacidade
├── Avaliação
└── Possivelmente blocos específicos de sua operação
```

O instrutor ressalta que uma oficina e um hospital não devem necessariamente ter o mesmo conjunto de informações.

### 12.3 Finalidade dos blocos

Os blocos permitem personalizar o cadastro e o tratamento do fornecedor conforme sua atividade.

Foram mencionados como possíveis blocos:

| Bloco | Uso apresentado |
|---|---|
| Tarifas | Registrar condições econômicas aplicáveis |
| Zonas geográficas | Definir áreas de atuação ou designação |
| Serviços | Identificar serviços prestados |
| Serviços de valor agregado | Registrar serviços adicionais |
| Dados de atendimento | Registrar faixas, horários e características de atendimento |
| Capacidade | Distinguir capacidade operacional de fornecedores |
| Avaliação | Medir desempenho do fornecedor |
| Fraude | Registrar ou tratar aspectos relacionados a fraude |
| Formação | Registrar necessidades de formação |
| QRF / sigla incerta | Configuração adicional específica de fornecedores |

### 12.4 Capacidade operacional

O bloco de capacidade é associado à necessidade de distinguir fornecedores de portes diferentes.

O exemplo apresentado compara uma pequena oficina com poucos colaboradores a uma oficina com dezenas de funcionários. A ideia é que não possuem necessariamente a mesma capacidade para absorver demanda.

A transcrição não define:

- como a capacidade é medida;
- se é numérica;
- se é usada automaticamente na distribuição;
- se é declarada pelo fornecedor ou avaliada pela companhia;
- se existe cálculo de capacidade disponível.

---

## 13. Controle de acesso no módulo de fornecedores

O modelo de segurança apresentado possui três camadas de configuração:

1. blocos de informação por atividade;
2. papéis de acesso por atividade;
3. permissões por bloco de informação.

### 13.1 Papéis de acesso

O sistema permite atribuir papéis a usuários para acesso ao módulo de fornecedores.

A configuração considera:

- companhia;
- atividade do terceiro;
- usuário ou papel;
- papel previamente definido em estrutura de segurança geral.

A reunião afirma que esses papéis se relacionam com configurações de segurança vistas anteriormente em um módulo de “comuns”.

### 13.2 Permissões por bloco

Para cada combinação de companhia, atividade e papel, o acesso pode ser definido separadamente para os blocos de informação.

As modalidades de acesso citadas são:

| Tipo de acesso | Significado |
|---|---|
| Não acessível | O usuário não visualiza ou não acessa o bloco |
| Consulta | O usuário apenas consulta |
| Atualização e consulta | O usuário consulta e modifica |

Essa granularidade permite, por exemplo, que usuários mais experientes possam alterar tarifas ou avaliações, enquanto usuários juniores tenham acesso apenas de consulta.

> **Leitura analítica:** esse desenho indica uma separação entre autorização de entrada no módulo e autorização de ação sobre cada domínio de informação. A transcrição não permite concluir se o modelo utiliza controle baseado em papéis, permissões diretas, grupos ou outro mecanismo técnico específico.

---

## 14. Tipologias e categorias de fornecedores

### 14.1 Tipologia

O sistema permite configurar tipos de fornecedores por companhia, idioma, código e descrição.

Foram citados exemplos ilustrativos como:

- agência;
- multimarca.

A tipologia possui uma marca de “real” ou “genérica”. O instrutor afirma que só pode existir um único registro com determinada propriedade de tipo real por conjunto de companhia e idioma, mas o comportamento técnico completo não foi explicado.

### 14.2 Categoria

Além do tipo, existe uma classificação por categoria.

Exemplos ilustrativos citados:

- recomendado;
- recomendado plus;
- embaixador de marca.

A categoria também é configurada por companhia, código, idioma e descrição.

Há referência a um valor genérico representado por “ZZZ”, mas a transcrição não esclarece todos os contextos em que esse valor é utilizado.

### 14.3 Combinação por atividade

Após definir tipos e categorias de forma geral para a companhia, é necessário restringir quais combinações são aplicáveis a cada atividade.

Isso evita, por exemplo, que uma classificação desenhada para oficinas seja usada indevidamente para hospitais ou clínicas.

A configuração pode considerar:

- companhia;
- atividade;
- tipo;
- categoria;
- data de validade;
- estado de habilitação.

A data de validade permite manter histórico das combinações permitidas ao longo do tempo.

---

## 15. Estados e causas do fornecedor

### 15.1 Estados possíveis

A reunião apresenta três estados principais para fornecedores:

- ativo;
- suspenso para atribuição;
- baixa.

O estado “suspenso para atribuição” é descrito como uma situação em que o fornecedor não foi definitivamente baixado, mas não deve receber novos casos.

Exemplos de causas possíveis:

- investigação de fraude;
- renegociação de tarifas;
- necessidade de revisão;
- outros motivos operacionais.

### 15.2 Causas dos estados

Para cada estado, o sistema permite configurar causas ou motivos mais detalhados.

A finalidade é evitar classificações excessivamente genéricas e permitir análise posterior.

Exemplos discutidos:

- ativo inicial;
- ativo por reabilitação;
- ativo como fornecedor júnior;
- ativo como fornecedor experiente;
- baixa por doença;
- baixa por fraude;
- baixa por qualidade insuficiente;
- suspensão durante investigação;
- suspensão durante renegociação.

Os exemplos são ilustrativos; a transcrição não estabelece um catálogo obrigatório de causas.

### 15.3 Histórico e reativação

A existência de datas de validade permite identificar o estado de um fornecedor em uma data específica.

Foi apresentado um exemplo hipotético:

```text
1º de janeiro de 2025: ativo
31 de março de 2025: baixa
25 de maio de 2025: reativado
```

O instrutor ressalta que uma reativação pode ser registrada como uma causa de ativo diferente do ativo inicial.

### 15.4 Governança sobre reativação

A reunião sugere que a reativação de um fornecedor pode exigir papéis restritos, como direção técnica ou outro papel de alta responsabilidade.

Esse ponto foi apresentado como exemplo de desenho de controle, não como regra obrigatória implementada.

---

## 16. Zonas geográficas, serviços e tarifas

### 16.1 Zonas geográficas de fornecedores

A rede de fornecedores pode seguir uma divisão geográfica diferente da estrutura comercial usada para venda de seguros.

A reunião reforça que não se deve assumir uma relação um a um entre:

- províncias;
- escritórios comerciais;
- regiões de atendimento de fornecedores.

As zonas são configuradas para indicar onde fornecedores podem atuar ou ser designados, considerando atividade, tipologia e categoria.

### 16.2 Serviços

Os serviços prestados por fornecedores são configurados de forma específica.

A transcrição indica que há catálogos para:

- serviços;
- critérios de atribuição de serviços;
- relação entre serviço, atividade, tipo e categoria;
- serviços de valor agregado.

Não foram detalhados os campos, fluxos ou regras exatas desses catálogos, pois o instrutor informa que seriam tratados posteriormente.

### 16.3 Tarifas

As tarifas podem variar conforme:

- zona geográfica;
- atividade;
- tipo;
- categoria;
- serviço;
- fornecedor.

A reunião usa como exemplo oficinas em cidades diferentes, ressaltando que não é realista assumir valores iguais para todos os fornecedores.

A diferença de tarifa pode refletir:

- localização;
- nível de serviço;
- capacidade;
- categoria;
- desempenho;
- contexto operacional.

---

## 17. Avaliação, qualidade e fraude

### 17.1 Avaliação de desempenho

A reunião apresenta a possibilidade de estabelecer métricas de desempenho para fornecedores desde o início do relacionamento.

O objetivo é avaliar como trabalham e apoiar decisões futuras.

Foram citadas dimensões como:

- qualidade do atendimento;
- cumprimento de tempos;
- capacidade;
- quantidade de reclamações;
- nível de serviço;
- cumprimento de acordos.

O exemplo compara fornecedores capazes de reparar veículos em três dias com outros que levam cinco dias, destacando que desempenho e tarifa podem variar por região.

### 17.2 Fraude

Há catálogos específicos relacionados a fraude envolvendo fornecedores ou clientes em processos de sinistro.

A reunião não detalha:

- tipos de fraude;
- algoritmo de detecção;
- processo investigativo;
- integração com outras áreas;
- evidências necessárias;
- consequências automáticas.

A única afirmação sustentada é que existem configurações relacionadas a fraude dentro do universo de fornecedores e que uma investigação pode justificar suspensão de atribuições.

### 17.3 Qualidade e penalização

A reunião apresenta como exemplo a possibilidade de dar baixa ou penalizar um fornecedor por baixa qualidade, inclusive em cenários de reclamações acima de parâmetros acordados.

Isso foi apresentado como possibilidade de negócio e governança. Não é possível concluir que o sistema execute penalizações automaticamente.

---

## 18. Convênios de pagamento

### 18.1 Objetivo

Os convênios de pagamento definem prazos estimados de pagamento associados a fornecedores.

Eles podem ser configurados considerando:

- ramo;
- atividade do terceiro;
- tipo de documento;
- código de documento;
- fornecedor específico;
- tipologia;
- categoria;
- número de dias;
- data de validade.

### 18.2 Uso no processo de sinistros

Quando uma liquidação é gerada no contexto de sinistros, o número de dias do convênio pode ser somado à data de geração da ordem para calcular uma data estimada de pagamento.

Exemplo apresentado:

```text
Fornecedor: oficina
Atividade: 17
Tipologia: agência
Categoria: recomendado
Convênio: 8 dias

Data estimada de pagamento
= data de geração da ordem + 8 dias
```

A reunião também apresenta a possibilidade de prazos diferentes para:

- categoria recomendada;
- categoria recomendada plus;
- agência;
- multimarca;
- fornecedor específico.

### 18.3 Separação de responsabilidades

A reunião diferencia duas responsabilidades:

| Área | Responsabilidade apresentada |
|---|---|
| Sinistros | Estabelecer tecnicamente a ordem de pagamento |
| Tesouraria | Executar o pagamento |

Também foi destacado que políticas financeiras e características como moeda podem influenciar o tratamento operacional, embora o processo completo não tenha sido detalhado.

---

## 19. Modelo operacional e governança

### 19.1 Decisões locais e diretrizes corporativas

A reunião indica que diversas configurações dependem do país e da companhia local.

As áreas citadas como relevantes incluem:

- direção técnica;
- direção técnica de sinistros;
- direção técnica de subscrição;
- gerência de sinistros;
- recursos humanos ou capital humano;
- direção financeira;
- áreas de negócio;
- responsáveis pela implementação local.

A estrutura pode variar entre países. Uma companhia pode ter direções técnicas separadas para subscrição e sinistros ou uma estrutura unificada.

### 19.2 Papel da companhia local

A companhia local deve identificar:

- quais atividades são usadas;
- quais tipos e categorias fazem sentido;
- quais critérios de distribuição devem ser configurados;
- se o autosserviço de fornecedores será utilizado;
- quais blocos de informação são necessários;
- quais valores locais devem ser usados em catálogos globais;
- quais políticas de pagamento e operação aplicam.

### 19.3 Papel do núcleo

O núcleo do sistema fornece:

- atividades pré-definidas;
- catálogos configuráveis;
- estruturas genéricas;
- opções para múltiplos países;
- validações comuns para operações online e batch;
- mecanismos de especialização.

A reunião enfatiza que o núcleo deve atender diversas operações do grupo e, por isso, oferece possibilidades que talvez não sejam usadas em todos os países.

---

## 20. Casos concretos e exemplos apresentados

| Caso ou exemplo | O que ilustra |
|---|---|
| Incêndio do edifício Windsor, em Madri | Necessidade de gestão centralizada e supervisor específico em sinistro relevante |
| Torres Gêmeas, como hipótese | Exemplo extremo de sinistro de grande porte |
| Quebra de vidros de veículos | Sinistro massivo e rotineiro |
| Transporte de carga geral versus petróleo | Necessidade de especialização conforme risco transportado |
| Acidente no exterior durante viagem | Necessidade de tramitador habilitado para sinistros fora do país |
| Parte contrária também segurada | Critério de distribuição para evitar situações inadequadas |
| Oficinas de Madri versus Albacete | Diferença de tarifa, capacidade e tempo de serviço por região |
| Banco Santander, BBVA e Caixa | Exemplos de entidades bancárias e identificadores locais |
| Fusão ou transformação entre entidades bancárias | Uso de atributo de entidade nova ou antiga |
| Centros de dados de empresa global | Relevância da fortaleza financeira de seguradoras |
| Clínica pequena versus rede hospitalar | Necessidade de classificações e capacidades diferentes |
| Oficina pequena versus oficina com 75 colaboradores | Diferença de capacidade operacional |
| Oficina em investigação de fraude | Suspensão de atribuições sem baixa definitiva |

---

## 21. Números e códigos citados

> Os valores abaixo são transcritos da reunião e não foram auditados externamente.

| Elemento | Valor mencionado | Contexto |
|---|---:|---|
| Atividades de núcleo | 1 a 99, além da 999 | Atividades não modificáveis |
| Atividades locais | A partir de 100 | Uso específico de instalações ou países |
| Atividade de tramitadores | 9 | Código citado para tramitadores |
| Atividade de oficinas | 17 | Exemplo de atividade fornecedora |
| Atividade de vidraceiros | 20 | Exemplo de atividade fornecedora |
| Atividade de entidades bancárias | 40 | Novo modelo de terceiros |
| Atividade de sucursais bancárias | 41 | Novo modelo de terceiros |
| Primeiro nível comercial | 42 | Novo modelo de terceiros |
| Segundo nível comercial | 43 | Novo modelo de terceiros |
| Terceiro nível comercial | 44 | Novo modelo de terceiros |
| Estados de fornecedor | 3 | Ativo, suspenso para atribuição e baixa |
| Exemplo de convênio | 8 dias | Prazo de pagamento para cenário ilustrativo |
| Exemplo de produtividade | 1.000 versus 700 casos | Comparação hipotética de volume e qualidade |
| Exemplo de prazo de tramitação | 5 dias | Cenário ilustrativo de velocidade |
| Exemplo de atraso | 7, 9 ou 6 dias | Cenário ilustrativo de desempenho |
| Exemplo de fornecedores em equipe | 3 ou 75 pessoas | Comparação de capacidade |
| Exemplo de reclamações | mais de 5 por trimestre | Cenário hipotético de baixa qualidade |

---

## 22. Perguntas, respostas e esclarecimentos

### Pergunta: por que configurar atividade na cessão se todos os tramitadores têm atividade 9?

**Resposta apresentada:** a atividade é mantida porque a funcionalidade foi pensada também para permitir, no futuro, cessões entre supervisores.

**O que isso esclarece:** a configuração foi desenhada com possibilidade de extensão futura, mesmo que a funcionalidade entre supervisores aparentemente não esteja habilitada.

---

### Pergunta: os critérios de atribuição precisam ser apenas técnicos?

**Resposta apresentada:** não. Podem ser técnicos, de gestão ou uma combinação dos dois, conforme decisão da companhia.

**O que isso esclarece:** a distribuição de trabalho não é apenas uma regra de produto; ela pode refletir capacidade, organização interna e estratégia operacional.

---

### Pergunta: todos os fornecedores cadastrados em atividade fornecedora já podem operar?

**Resposta apresentada:** não. O cadastro na atividade identifica o terceiro como fornecedor, mas são necessárias outras configurações para que ele possa ser tratado operacionalmente como tal.

**O que isso esclarece:** há diferença entre identificação cadastral e habilitação efetiva na rede de fornecedores.

---

### Pergunta: o autosserviço de fornecedores é obrigatório?

**Resposta apresentada:** não. Sua utilização depende de decisão local.

**O que isso esclarece:** a funcionalidade é disponibilizada pela solução, mas não necessariamente adotada por todos os países ou companhias.

---

### Pergunta: as validações batch são diferentes das validações online?

**Resposta apresentada:** não. As validações são as mesmas.

**O que isso esclarece:** o processamento em lote não deve permitir contornar regras de obrigatoriedade ou consistência aplicadas na operação online.

---

### Pergunta: um tramitador pode mudar de papel?

**Resposta apresentada:** sim. Pode mudar de papel para exercer funções antes não permitidas, e a mudança pode ocorrer em ambos os sentidos — de função mais limitada para mais ampla ou o contrário.

**O que isso esclarece:** a permissão funcional está relacionada não apenas à atividade, mas também ao tipo ou papel configurado para o tramitador.

---

## 23. Limitações explicitamente reconhecidas

1. **Cessão entre supervisores:** o instrutor acredita que não está habilitada, mas recomenda validação posterior.
2. **Catálogos de brokers e empregados de agência:** não existiam catálogos específicos na data mencionada.
3. **Uso do autosserviço de fornecedores:** depende de decisão local e não é automaticamente adotado.
4. **Informações de modelo de dados:** parte da explicação sobre dispersão de tabelas foi tratada como assunto técnico posterior.
5. **Detalhamento de sinistros:** diversos conceitos, como expedientes, causas e consequências, seriam aprofundados no módulo de sinistros.
6. **Serviços de fornecedores:** a reunião informa que seriam detalhados em etapa posterior.
7. **Formação de fornecedores:** existe como bloco possível, mas o instrutor sugere que seu uso prático deve ser validado no módulo específico.
8. **Siglas QRF/QRS:** a transcrição não permite determinar seu significado ou nomenclatura correta.
9. **Códigos de atividade de seguradoras:** há inconsistência na transcrição entre os códigos 13, 14 e 39.

---

## 24. Riscos e desafios

### 24.1 Riscos explicitamente mencionados

- Distribuir expedientes a profissionais sem experiência adequada.
- Sobrecarregar tramitadores que já possuem muitos casos pendentes.
- Deixar expedientes sem gestão durante férias ou afastamentos.
- Direcionar casos que exigem conhecimento internacional a pessoas sem experiência nesse cenário.
- Atribuir casos envolvendo partes contrárias vinculadas à própria seguradora sem considerar possíveis conflitos ou situações inadequadas.
- Tratar fornecedores sem avaliação adequada de qualidade.
- Manter fornecedores em operação durante investigação de fraude.
- Usar categorias genéricas como “outros”, reduzindo a capacidade de análise posterior.
- Configurar inadequadamente estruturas de produto, comercial ou geográfica e reproduzir esse erro nos módulos dependentes.

### 24.2 Desafios derivados do contexto

> **Análise derivada, não declaração literal dos participantes.**

- A grande flexibilidade configurável aumenta o risco de inconsistências entre países ou companhias se não houver governança clara.
- O modelo exige qualidade elevada de dados mestres, pois várias decisões operacionais dependem de atividades, papéis, setores, ramos, zonas, tipos, categorias e estados.
- A distribuição automática de sinistros tende a depender de regras cuidadosamente calibradas para equilibrar especialização, produtividade e carga.
- A coexistência ou transição entre modelos antigo e novo de terceiros pode exigir atenção redobrada em documentação, treinamento e integrações.
- A configuração granular de acesso pode aumentar a segurança, mas também elevar a complexidade administrativa de papéis e permissões.
- A habilitação de fornecedores exige coordenação entre áreas técnicas, operacionais, contratuais e de sinistros.

---

## 25. Transformações estruturais percebidas

> Esta seção reúne leituras analíticas sustentadas pelo conjunto das falas. Não são necessariamente formulações literais da reunião.

### 25.1 De cadastro simples para ecossistema de capacidades

O tratamento de terceiros parece ir além de um cadastro básico. Um terceiro pode assumir papéis distintos e ser configurado conforme sua atividade, capacidade, localização, serviços, permissões e relacionamento operacional.

No caso de fornecedores, a mudança é especialmente visível:

```text
Cadastro de fornecedor
↓
Classificação e habilitação
↓
Configuração de serviços, zonas, tarifas e capacidade
↓
Avaliação e governança
↓
Uso em processos de sinistro
```

### 25.2 De distribuição manual para distribuição governada

A atribuição de sinistros é apresentada como processo que pode ser automatizado, mas não aleatório. A automação depende de critérios de elegibilidade, especialização e carga.

Isso indica uma direção de distribuição governada por regras operacionais.

### 25.3 De projeto local para plataforma multiempresa e multipaís

A reunião reforça que o sistema deve atender diferentes países, estágios de maturidade e realidades regulatórias ou operacionais.

A plataforma oferece múltiplas opções, mas cada país deve selecionar e configurar apenas o que fizer sentido. Isso aponta para um modelo de plataforma corporativa com adaptação local.

### 25.4 De fornecedor externo para parceiro operacional gerenciado

O fornecedor não é tratado apenas como destinatário de pagamentos. Ele pode ser classificado, avaliado, suspenso, reativado, treinado, tarifado e integrado ao processo de sinistros.

Essa abordagem sugere uma transformação do fornecedor em parte ativa da capacidade operacional da seguradora.

---

## 26. O que a reunião não permite concluir

A transcrição não detalha suficientemente os seguintes pontos:

- tecnologia de cloud utilizada;
- arquitetura de microsserviços;
- uso de APIs, eventos, mensageria ou filas;
- modelo de autenticação e IAM;
- mecanismos de auditoria;
- trilhas de aprovação;
- banco de dados completo;
- modelos de backup, disaster recovery ou continuidade;
- níveis de SLA;
- observabilidade, monitoramento e alertas;
- CI/CD;
- versionamento de configurações;
- processo de implantação entre ambientes;
- criptografia e proteção de dados;
- regras formais de segregação de funções;
- política completa de fraude;
- workflow completo de onboarding de fornecedores;
- integração técnica entre autosserviço e núcleo;
- funcionamento detalhado das liquidações;
- regras contábeis e fiscais;
- critérios formais de cálculo de capacidade;
- algoritmo exato de distribuição automática;
- definição precisa das siglas QRF, QRS ou termos similares;
- significado exato das inconsistências de códigos de atividade para companhias seguradoras.

---

## 27. Conclusões principais

1. O sistema utiliza uma abordagem ampla de parametrização para suportar a gestão de terceiros, sinistros e fornecedores em diferentes contextos organizacionais e geográficos.

2. Supervisores e tramitadores são elementos centrais na operação de sinistros. A distribuição de trabalho pode ser configurada com base em especialização, produto, apólice, tipo de expediente, carga, experiência e outros critérios.

3. A continuidade do tratamento de sinistros é suportada por cessões temporárias de expedientes, especialmente para lidar com férias, afastamentos e necessidades de balanceamento operacional.

4. O fornecedor é tratado como uma entidade operacional complexa. A atividade fornecedora é apenas o ponto de partida; a utilização efetiva depende de configurações adicionais de serviços, acesso, zonas, tarifas, avaliação, estado e pagamento.

5. A governança é distribuída entre áreas de negócio, direção técnica, sinistros, finanças, recursos humanos e responsáveis locais pela implementação.

6. A solução foi apresentada como altamente flexível, mas essa flexibilidade exige decisões conscientes, dados mestres consistentes e governança forte para evitar configurações incoerentes.

7. A reunião reforça uma visão sistêmica: produto, comercial, geografia, terceiros, sinistros, tesouraria e fornecedores precisam ser desenhados de forma integrada para que a operação funcione corretamente.
