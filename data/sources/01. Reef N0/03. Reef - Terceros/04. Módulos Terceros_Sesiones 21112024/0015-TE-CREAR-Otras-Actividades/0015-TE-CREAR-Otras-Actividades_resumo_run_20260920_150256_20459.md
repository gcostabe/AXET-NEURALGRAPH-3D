# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `0015-TE-CREAR-Otras-Actividades.mp4`
**Data de processamento:** 20/09/2026 15:06:18
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada — Cadastro de terceiros, intermediários, companhias e estruturas comerciais

> **Escopo e rastreabilidade:** esta análise foi construída exclusivamente a partir da transcrição fornecida. Não há timestamps, identificação de participantes ou material de apoio disponível; portanto, as referências são temáticas, e não temporais.  
> Alguns nomes de sistemas e termos podem conter erros de reconhecimento de voz. Em especial, a transcrição alterna formas como **“Trifcore”** e **“Riftcore”**; este documento preserva essa incerteza e usa **Riftcore/Trifcore** quando necessário.

## 1. Síntese executiva

A reunião é parte de um treinamento sobre o novo modelo de dados de terceiros de um sistema de seguros identificado na transcrição como Riftcore/Trifcore. O foco não está em processos de emissão ou sinistros em si, mas no cadastro, na classificação e na manutenção de diferentes tipos de entidades que participam do ecossistema segurador.

A apresentação percorre, principalmente, quatro grupos de cadastros: **brokers de seguros**, **empregados de agentes**, **companhias do sistema**, **entidades e agências bancárias**, além dos níveis da **estrutura comercial**. O padrão recorrente é que cada entidade seja tratada como um terceiro com blocos comuns de dados — identificação, contatos, endereços e possivelmente documentos alternativos — acrescidos por informações específicas de sua atividade.

A mensagem central é que o novo modelo busca organizar dados antes dispersos em cadastros ou tabelas específicas sob uma estrutura de terceiros mais uniforme. Contudo, a reunião também expõe limitações e inconsistências herdadas, especialmente o uso do catálogo de “planos de pagamento” da emissão para definir a frequência da relação comercial com brokers.

Também há uma preocupação operacional importante: nem todo dado possível deve ser capturado apenas porque o sistema permite. Os dados precisam fazer sentido para o negócio, ter uma finalidade clara de uso e possuir responsáveis por sua manutenção.

---

## 2. Contexto e antecedentes

### 2.1. Continuidade de um treinamento anterior

A reunião começa retomando conteúdos vistos anteriormente. Já teriam sido abordadas operações relacionadas a:

- segurados;
- terceiros em geral;
- criação de registros;
- terceiro genérico;
- marcação de terceiro não desejado;
- supervisores;
- tramitadores;
- seguradoras.

A apresentação afirma que operações de alteração e consulta ainda precisarão ser vistas, mas são consideradas mais simples depois que os participantes compreendem quais dados são capturados para cada atividade.

### 2.2. Mudança para um modelo de terceiros

A explicação sugere uma transformação de modelagem de dados: cadastros que antes existiam de forma mais linear ou em tabelas próprias passam a ser tratados como tipos de terceiro, com blocos de informação comuns e atributos específicos por atividade.

Essa mudança aparece claramente no exemplo das companhias: elas teriam existido inicialmente em uma tabela própria do modelo de dados de Riftcore/Trifcore, mas, devido a sinergias com informações do “mundo dos terceiros”, passaram a ser modeladas como uma atividade específica do núcleo, identificada pelo código 39.

### 2.3. Estrutura comum dos cadastros

A reunião menciona repetidamente uma estrutura de blocos de informações compartilhada pelas atividades. Para brokers, são citados “nove blocos de informação comuns”; em outros casos, como entidades bancárias, são citados quatro ou cinco blocos principais.

Embora a transcrição não forneça uma lista única e completa dos nove blocos, ela menciona como exemplos:

- dados básicos de identificação;
- contatos;
- direções/endereço;
- possíveis documentos alternativos;
- dados bancários;
- representantes legais;
- informações específicas da atividade.

A quantidade exata de blocos e sua composição podem variar conforme a entidade tratada. A transcrição não permite estabelecer uma taxonomia completa e definitiva desses blocos.

---

## 3. Problemas e necessidades discutidos

## 3.1. Necessidade de diferenciar entidades semelhantes

Um problema recorrente é evitar a confusão entre entidades que desempenham papéis próximos no negócio, mas têm significados operacionais distintos.

Exemplos enfatizados:

- broker não é agente;
- empregado de agente não é o agente comissionado;
- companhia do sistema não é seguradora;
- tipo de entidade bancária não é o mesmo que tipo de instituição bancária;
- o atributo de “permitir emissão” não equivale a inabilitar uma unidade comercial.

Essa preocupação é relevante porque tratar entidades distintas como equivalentes poderia levar a erros em comissões, emissão, integrações, manutenção de cadastros e uso de dados operacionais.

## 3.2. Reutilização inadequada de catálogo de emissão para brokers

O principal problema funcional explicitamente criticado é o uso de um catálogo de planos de pagamento, originalmente pertencente ao processo de emissão de apólices, no cadastro de brokers.

No processo de emissão, um plano de pagamento representa a estrutura de parcelas de uma apólice — por exemplo, anual, semestral, trimestral ou uma combinação mais específica de vencimentos. No cadastro do broker, entretanto, a intenção seria identificar a periodicidade da relação econômica e operacional da seguradora com esse intermediário.

A consequência é uma ambiguidade: códigos de plano de pagamento podem representar estruturas de parcelas muito específicas, como cinco cobranças com uma primeira parcela de seis meses e as demais distribuídas em intervalos distintos. Esse tipo de código não representa claramente a periodicidade de contato com o broker.

## 3.3. Risco de capturar dados sem finalidade de negócio

A apresentação ressalta que o aumento da quantidade de dados cadastrados não é automaticamente positivo. A orientação é que cada atributo seja capturado quando:

- fizer sentido para o negócio;
- for desejado pelas áreas de negócio;
- tiver uso ou exploração posterior;
- tiver alguém responsável por conhecê-lo, mantê-lo e administrá-lo.

Esse ponto surge com maior clareza no cadastro de entidades bancárias e suas classificações. A reunião alerta que dados podem se tornar incoerentes entre cadastros distintos caso sejam preenchidos sem integração ou sem uma definição comum de negócio.

## 3.4. Preservação de histórico

A reunião afirma que a informação no sistema não é simplesmente apagada. Ela pode ser historizada ou movida para repositórios de informação, mas continua existindo.

Isso é apresentado no contexto de alterações na estrutura bancária, tais como aquisições entre bancos. O cadastro de uma entidade compradora permitiria rastrear a evolução dessa estrutura ao longo do tempo.

---

## 4. Conceitos centrais apresentados

## 4.1. Terceiro

“Terceiro” é o conceito estruturante apresentado. Diferentes entidades — pessoas, companhias, bancos, brokers e outras — são cadastradas no sistema dentro desse modelo, recebendo:

1. uma identificação única;
2. dados comuns, quando aplicáveis;
3. informações específicas segundo sua atividade.

A reunião também utiliza a expressão “terceiros fake” para alguns cadastros técnicos ou estruturais. Isso parece referir-se a registros como unidades bancárias ou unidades da estrutura comercial, que podem não representar uma pessoa ou empresa com uma relação comercial típica. Essa expressão é informal e não deve ser interpretada como uma classificação oficial do sistema.

## 4.2. Atividade

A atividade identifica o tipo funcional ou de negócio assumido pelo terceiro no sistema. Alguns códigos explicitamente mencionados são:

| Atividade | Código mencionado | Finalidade descrita |
|---|---:|---|
| Broker de seguros | 16 | Cadastro de intermediário entre cliente final e seguradora |
| Empregado de agente | 37 | Associação de pessoas que trabalham para um agente ou agência |
| Companhia do sistema | 39 | Cadastro de companhia dentro do modelo de terceiros |
| Entidade bancária | 40 | Cadastro de banco |
| Agência/oficina bancária | 41 | Cadastro de unidade bancária |

A transcrição não permite determinar se essa numeração é universal, local, configurável ou exclusiva da implantação demonstrada.

## 4.3. Chave única

Para determinadas atividades, o sistema exige uma identificação única. No caso do broker, a apresentação destaca que a atividade possui a necessidade de identificação por uma chave única.

Não são detalhadas as regras de formação, validação ou unicidade dessa chave.

---

## 5. Arquitetura lógica e funcionamento reconstruído

A reunião não apresenta um diagrama técnico formal de componentes, APIs, bancos de dados, eventos ou infraestrutura. Ainda assim, é possível reconstruir uma visão funcional do modelo descrito.

> **Representação analítica consolidada — não é um diagrama literal exibido na reunião:**

```text
Processos funcionais e operacionais
│
├── Emissão de apólices
│   ├── Uso de agentes e estrutura comercial
│   ├── Possível identificação de empregado do agente
│   └── Definição de planos de pagamento da apólice
│
├── Cálculo e pagamento de comissões
│   ├── Agente associado à apólice
│   ├── Quadro de comissões
│   ├── Movimentos de nova produção, carteira e suplementos
│   └── Relação comercial entre seguradora e agente
│
├── Relações com brokers
│   ├── Dados do broker
│   ├── Tributação aplicável
│   ├── Possível relação com resseguro
│   └── Periodicidade de interação econômico-operacional
│
└── Modelo de terceiros
    ├── Dados de identificação
    ├── Contatos e direções
    ├── Documentos alternativos
    ├── Dados bancários e representantes legais, quando aplicáveis
    └── Informação específica por atividade
        ├── Broker
        ├── Empregado de agente
        ├── Companhia
        ├── Entidade bancária
        ├── Agência bancária
        └── Estrutura comercial
```

### 5.1. Modelo de dados

A lógica apresentada pode ser sintetizada da seguinte forma:

```text
Terceiro
↓
Atividade atribuída
↓
Blocos comuns de informações
↓
Bloco específico da atividade
↓
Uso por processos de negócio
    ├── Emissão
    ├── Comissões
    ├── Tesouraria
    ├── Cobrança e pagamento
    ├── Estrutura comercial
    ├── Fidelização
    └── Controle operacional
```

### 5.2. Limites da reconstrução arquitetural

A reunião não detalha:

- banco de dados;
- tecnologias de front-end;
- APIs;
- integrações síncronas ou assíncronas;
- mensageria;
- cloud;
- segurança;
- autenticação;
- autorização;
- deployment;
- observabilidade técnica;
- pipelines de CI/CD;
- topologia de ambientes.

Portanto, não é possível concluir como a arquitetura técnica é implementada internamente.

---

## 6. Broker de seguros

## 6.1. Conceito de broker

O broker de seguros é apresentado como um intermediário entre o cliente final e a companhia seguradora.

A explicação faz uma separação explícita entre broker e agente:

- o broker pode intermediar uma apólice;
- o broker não deve ser confundido com o agente responsável pelo cálculo de comissões;
- o agente é associado a uma relação contratual com a seguradora e ao cálculo de comissões;
- o broker pode estar envolvido na intermediação comercial, mas não representa automaticamente a “chave do agente” para fins comissionais.

A reunião afirma que uma apólice pode ser intermediada por um broker, mas que a pessoa ou terceiro que efetivamente receberia cálculo de comissão seria o agente associado, não necessariamente o broker.

## 6.2. Cadastro do broker

O processo apresentado consiste em:

1. criar o terceiro;
2. criar ou preencher a informação específica da atividade de broker;
3. registrar os dados necessários à sua identificação e relacionamento operacional.

A atividade do broker é identificada pelo código 16.

## 6.3. Atributos específicos mencionados

A tela do broker é descrita como pequena e com poucas informações. Os atributos mencionados foram:

| Atributo | Finalidade descrita |
|---|---|
| Nome curto | Nome descritivo do broker |
| Inabilitado | Indica se o broker está habilitado ou não |
| Causa de inabilitação | Motivo da inabilitação, quando aplicável |
| País de origem | País de constituição do broker de seguros e resseguros |
| Tipologia do broker | Classificação do broker; são mencionados quatro valores possíveis, sem detalhamento |
| Imposto de renda | Código definido pela tesouraria para tratamento tributário do terceiro |
| Imposto sobre juros de depósitos de resseguro | Possível tratamento tributário relacionado a depósitos de resseguro |
| Plano de pagamento | Campo usado para representar a periodicidade da relação com o broker |

A transcrição menciona que o país de origem utiliza o primeiro nível da estrutura geográfica configurada em catálogos comuns.

## 6.4. Relação com tesouraria e tributação

O código de imposto de renda é atribuído ao broker para orientar a tesouraria sobre como trabalhar com os serviços realizados por esse terceiro para a companhia.

Também é mencionado um possível imposto relacionado a juros de depósitos de resseguro. O exemplo considera um broker que intermedeie apólices ou operações vinculadas a resseguro, possivelmente em relação a uma operação local da MAPFRE.

A transcrição não detalha:

- regras tributárias;
- países onde se aplicam;
- fórmulas de cálculo;
- integração entre o cadastro e a tesouraria;
- eventos financeiros gerados;
- obrigações regulatórias envolvidas.

## 6.5. Problema do campo “plano de pagamento”

A explicação caracteriza esse campo como conceitualmente inadequado ou, ao menos, mal nomeado e mal suportado pelo catálogo utilizado.

### O que “plano de pagamento” significa na emissão

No processo de emissão, plano de pagamento representa a quantidade e a distribuição de recibos de uma apólice. São citados exemplos como:

- anual;
- semestral;
- trimestral;
- quadrimestral;
- mensal;
- planos específicos por cliente.

Um plano poderia conter uma estrutura irregular, por exemplo:

- cinco quotas ao longo de um ano;
- primeira quota cobrindo seis meses;
- outras quatro quotas distribuídas em períodos de aproximadamente um mês e meio.

### O que seria necessário para o broker

No relacionamento com broker, a necessidade apresentada parece ser outra: indicar com que frequência a seguradora deve realizar contatos ou trocas econômico-operacionais com o broker.

Esses contatos podem envolver:

- entrega de bordereaux de prêmios e sinistros;
- entrega de informações de sinistralidade;
- interação sobre contas ou acordos comerciais.

Nesse contexto:

| Periodicidade desejada | Número de contatos anuais esperado |
|---|---:|
| Anual | 1 |
| Semestral | 2 |
| Quadrimestral | 3 |
| Mensal | 12 |

### Análise

> **Leitura analítica:** o problema apontado é uma inconsistência semântica entre o catálogo reutilizado e a finalidade funcional do campo. Um código adequado para parcelamento de apólice não é necessariamente adequado para definir cadência de relacionamento com um broker.

A apresentação não confirma se essa inconsistência já possui correção planejada. Também não informa se há uma evolução aprovada para separar catálogos de parcelamento de apólices e periodicidade de relacionamento com brokers.

---

## 7. Empregados de agentes ou agências

## 7.1. Conceito

Os empregados de agente são pessoas vinculadas a agentes ou agências. O objetivo do cadastro não é calcular diretamente comissões para esses empregados, mas permitir identificá-los e associá-los ao agente do qual dependem.

O apresentador esclarece que as agências mencionadas nesse contexto podem abranger entidades que efetivamente atuam como agentes e calculam comissões, identificadas pela atividade 2. A transcrição não detalha formalmente a atividade 2, mas afirma que ela corresponde à chave de agente dentro da companhia.

## 7.2. Origem funcional

A funcionalidade é associada a uma necessidade surgida em Malta. Segundo a reunião, nem todas as companhias utilizam essa capacidade, mas ela foi criada para permitir identificar quais empregados trabalhavam para determinado agente.

Não é possível determinar:

- se a funcionalidade nasceu exclusivamente em Malta;
- se está ativa em todos os países;
- quais países a utilizam além do caso mencionado;
- se existem configurações locais obrigatórias.

## 7.3. O que o empregado de agente não é

A reunião enfatiza alguns limites:

- não é o agente principal;
- não recebe cálculo de comissões diretamente da seguradora;
- não possui, no sistema apresentado, dados tributários ou de retenção para pagamento comissionado;
- não altera a relação comercial primária entre a seguradora e o agente.

A seguradora paga o agente. Caso o agente repasse parte de sua remuneração aos empregados, isso é tratado como um critério interno do agente, fora da responsabilidade da seguradora e fora do escopo do sistema apresentado.

## 7.4. Finalidade de negócio

A funcionalidade pode permitir que a seguradora saiba qual empregado do agente participou de determinada operação, especialmente na emissão de uma apólice.

O exemplo apresentado é de uma pequena assessoria com cinco empregados. Caso o agente informe qual empregado participou em determinada situação, esse empregado pode ser registrado no processo de emissão.

A fala ressalva que, mesmo nesse caso, a intermediação formal é do agente. O empregado seria apenas uma referência operacional ou de participação dentro da estrutura do agente.

## 7.5. Atividade e atributos específicos

A atividade de empregado de agente é identificada pelo código 37.

Os atributos específicos mencionados são:

| Atributo | Finalidade descrita |
|---|---|
| Agente do qual depende | Identifica o agente responsável ou associado |
| Agrupamento do empregado de agente | Classificação por agrupamento, se fizer sentido para a companhia |
| Classe de beneficiário | Classificação com base em catálogo genérico |
| Código de colegiado | Registro profissional, quando necessário para intermediação em nome do agente |
| Inabilitado | Situação de habilitação do empregado |
| Causa de inabilitação | Motivo da inabilitação |
| Percentual de participação | Percentual associado ao empregado em uma operação, quando informado |

A reunião não explica os valores possíveis para “classe de beneficiário”, “agrupamento” ou “código de colegiado”.

## 7.6. Percentual de participação

O percentual de participação pode ser:

- fixo;
- variável.

Quando for variável, a reunião afirma que deve existir alguma regra ou definição para determinar o percentual, mas não descreve qual seria essa regra.

A fala é enfática ao afirmar que a seguradora não precisa necessariamente usar esse percentual para calcular ou pagar algo ao empregado do agente. O dado pode ser meramente informativo do ponto de vista da companhia.

O apresentador chega a caracterizar informalmente o dado como “trucho” para a seguradora, no sentido de que ele não teria efeito financeiro direto para a companhia, embora possa ser útil ao agente ou para identificação operacional.

## 7.7. Relação com emissão e comissões

A sequência descrita é:

```text
Apólice
↓
Agente associado
↓
Quadro de comissões aplicável
↓
Movimentos de nova produção, carteira ou suplementos
↓
Cálculo ou recálculo de comissões
↓
Valor devido ao agente principal
```

O empregado de agente pode ser registrado como participante no processo de emissão, caso essa informação seja conhecida. Contudo, a remuneração calculada pela seguradora permanece vinculada ao agente principal.

## 7.8. Agentes vinculados, exclusivos e multimarca

A reunião diferencia situações de relacionamento entre agentes e seguradora:

- agentes vinculados à companhia;
- agentes exclusivos;
- agentes que são empregados da MAPFRE;
- agentes multimarca.

No caso de agentes multimarca, eles podem vender produtos de diferentes seguradoras, sendo citados exemplos como MAPFRE, Mutua Valenciana, AXA e Zurich.

A transcrição não define as regras contratuais, regulatórias ou sistêmicas para cada modalidade.

---

## 8. Companhia do sistema

## 8.1. Distinção fundamental: companhia versus seguradora

A reunião alerta explicitamente para não confundir:

- **companhias do sistema**, identificadas pela atividade 39;
- **seguradoras**, que podem ser outras seguradoras com as quais a MAPFRE se relaciona localmente, por exemplo em cosseguro.

Essa distinção é central. A companhia do sistema parece ser uma entidade organizacional ou operacional interna ao modelo de dados; uma seguradora pode ser uma contraparte externa ou participante de uma relação de seguros.

## 8.2. Evolução de modelagem

Anteriormente, a companhia estaria registrada em uma tabela própria. Posteriormente, devido às semelhanças com os dados de terceiros, teria sido incorporada ao modelo de terceiros como uma atividade específica do núcleo.

> **Leitura analítica:** isso indica uma direção de consolidação de dados mestre. Em vez de manter uma estrutura totalmente independente para companhias, o modelo passa a reaproveitar capacidades comuns de identificação, contatos e endereços.

A reunião não informa quando essa mudança ocorreu, como foi feita a migração ou se ainda existem companhias no modelo antigo.

## 8.3. Identificação

No modelo antigo, é mencionado que a companhia poderia usar NIF ou CIF como código de identificação fiscal. No novo modelo, é mencionada uma identificação por “THP como tipo de documento fictício”, combinada ao código da companhia.

A transcrição não esclarece o significado da sigla THP. Ela não deve ser expandida ou reinterpretada sem evidência adicional.

## 8.4. Blocos comuns aplicáveis

Para companhias, são citados:

- dados básicos de identificação;
- dados de pessoa jurídica;
- contatos;
- direções;
- documentos ou identificadores correspondentes.

Como uma companhia é pessoa jurídica, certos dados próprios de pessoa física, como data de nascimento, não seriam solicitados ou ficariam inabilitados.

O CEO, por exemplo, deixa de ser tratado como um atributo linear isolado e passa a ser entendido como um contato associado ao terceiro companhia.

## 8.5. Atributos específicos mencionados

| Atributo | Finalidade descrita |
|---|---|
| Código da companhia | Identificação da companhia |
| Abreviatura | Nome reduzido ou identificador abreviado |
| Razão social | Nome jurídico da companhia |
| Moeda da companhia | Moeda vinculada à companhia, segundo ISO do país |
| Chave de identificação patronal | Identificador patronal |
| Chave de identificação societária | Identificador societário |
| Companhia de resseguro “sterres” | Termo registrado de forma incerta na transcrição |
| RE-21 | Campo citado, sem detalhamento funcional suficiente |
| Moeda local-origem | Possível referência para tratamento de câmbio |
| Sábados e domingos laboráveis/festivos | Definição de calendário operacional |
| Moeda do programa de fidelização de tréboles | Moeda associada ao programa |
| Mínimo de tréboles para resgate | Limite mínimo de pontos para uso |
| Máximo de tréboles | Limite máximo de pontos, possivelmente aberto |

Os termos “sterres” e “RE-21” podem ter sido reconhecidos incorretamente. A transcrição não permite normalizá-los com segurança.

## 8.6. Moeda local-origem

A reunião remete a um exemplo anterior sobre câmbio, indicando que a moeda local-origem pode influenciar se as conversões passam ou não por uma moeda intermediária ou de origem.

Como o exemplo anterior não está na transcrição fornecida, não é possível detalhar:

- as regras cambiais;
- a moeda intermediária;
- as fontes de cotação;
- o impacto contábil ou financeiro.

## 8.7. Programa de fidelização

É mencionado um programa de fidelização baseado em “tréboles”, aplicado a segurados. Para a companhia, podem existir atributos como:

- moeda associada ao programa;
- quantidade mínima de tréboles para resgate;
- quantidade máxima de tréboles;
- possibilidade de manter determinado limite em aberto.

A transcrição não explica como os tréboles são obtidos, convertidos, resgatados ou integrados a outros processos.

---

## 9. Entidades bancárias

## 9.1. Contexto

As entidades bancárias já teriam sido vistas em outro módulo ou no contexto de “dados comuns”. No novo modelo, também são tratadas como terceiros, com dados comuns e informações específicas de atividade.

A atividade de entidade bancária é identificada pelo código 40.

## 9.2. Necessidade de coerência entre cadastros

A reunião alerta para a possibilidade de divergência entre:

- o cadastro de terceiro da entidade bancária;
- os meios de cobrança e pagamento associados a apólices ou segurados;
- as informações da atividade bancária.

A orientação é que, se for desejável unificar ou relacionar essas informações, a entidade bancária cadastrada como terceiro deve complementar e permitir explorar os dados bancários no contexto adequado.

> **Leitura analítica:** a preocupação parece ser evitar cadastros paralelos e semanticamente divergentes para o mesmo banco.

## 9.3. Atributos específicos mencionados

| Atributo | Finalidade descrita |
|---|---|
| Código de atividade | Identifica a atividade bancária |
| Tipologia da entidade bancária | Classificação do banco |
| Tipo de domiciliação | Conta, cartão ou ambos |
| Tipo de instituição | Outra classificação institucional, distinta do tipo de entidade |
| Referência bancária | Chave ou referência da entidade |
| Inabilitado | Situação de habilitação |
| Código SIF | Termo citado em relação à zona SEPA; pode conter erro de transcrição |
| Dias adicionais | Utilizados para compor data-valor |
| Entidade compradora | Registro de aquisições ou mudanças estruturais |
| Data de constituição | Data de criação da entidade |
| Nacionalidade do banco | Nacionalidade associada ao banco |
| Tipo de pessoa jurídica | Classificação a partir do catálogo de pessoas jurídicas |

O termo registrado como “código SIF” é incerto. Pela contextualização com SEPA, pode fazer referência a algum identificador bancário, mas a transcrição não permite determinar qual.

## 9.4. Tipologia da entidade bancária e tipo de instituição

A apresentação insiste para que esses dois conceitos não sejam confundidos.

O “tipo de instituição” recebe exemplos que, pela transcrição, parecem equivaler a classificações como:

- minorista;
- comercial;
- desenvolvimento comunitário.

Contudo, os termos exatos e sua taxonomia não estão suficientemente claros para serem apresentados como uma lista oficial.

## 9.5. Tipo de domiciliação

A entidade bancária pode permitir domiciliação:

- em conta;
- em cartão;
- em ambas as modalidades.

A reunião considera que essa tipologia pode soar arcaica, por ser herdada de versões ou concepções antigas do sistema.

## 9.6. Data-valor

O número de dias adicionais é relacionado à definição de data-valor, que não precisa ser igual à data da operação.

A transcrição não fornece fórmula de cálculo, exemplos numéricos, regras por país ou impactos financeiros.

## 9.7. Estrutura societária e aquisições bancárias

O atributo “entidade compradora” é apresentado como um mecanismo para registrar mudanças históricas, como fusões ou aquisições de bancos.

O exemplo citado é “Bankia e Caixa”, aparentemente usado para ilustrar que entidades financeiras podem mudar ao longo do tempo.

A finalidade seria preservar rastreabilidade histórica, já que os dados não são apagados do sistema.

## 9.8. Responsabilidade de manutenção

A reunião questiona quem deve manter esse tipo de informação e afirma que essa responsabilidade não deveria ser da informática isoladamente. Deve existir alguém — não identificado — que conheça, explore e mantenha os dados dessa atividade.

---

## 10. Agências ou oficinas bancárias

## 10.1. Atividade

A atividade de agência bancária é identificada pelo código 41.

Ela é apresentada como relacionada, mas distinta, da entidade bancária. Enquanto a atividade 40 trata do banco, a atividade 41 trata de suas unidades ou sucursais.

## 10.2. Atributos mencionados

| Atributo | Finalidade descrita |
|---|---|
| Entidade bancária da qual depende | Banco associado à agência |
| Código da agência bancária | Código interno da unidade ou sucursal |
| ID da agência bancária | Identificador conforme estrutura do banco |
| Código SWIFT da agência | Possível código específico da unidade, se aplicável |
| Inabilitado | Situação de habilitação da agência |

A explicação distingue o código interno da agência e o identificador conforme a estrutura do banco, mas a diferença não é detalhada tecnicamente.

## 10.3. Limitação na inabilitação

A reunião identifica uma possível inconsistência: o cadastro permite marcar a agência como inabilitada, mas não parece permitir registrar um tipo ou uma causa de inabilitação, diferentemente de outras atividades.

Duas possibilidades são apresentadas:

1. isso pode ser uma lacuna ou evolução futura;
2. pode ter sido deliberado porque esses “terceiros” técnicos não exigiriam tal detalhamento, especialmente em companhias que ainda não utilizam plenamente o novo modelo de terceiros.

A reunião não confirma qual dessas hipóteses é correta.

---

## 11. Estrutura comercial

## 11.1. Níveis citados

A reunião menciona três níveis da estrutura comercial:

1. primeiro nível;
2. segundo nível;
3. terceiro nível.

A modelagem parece representar uma hierarquia organizacional ou comercial utilizada na emissão e na organização de unidades comerciais.

## 11.2. Primeiro nível

Para o primeiro nível, são citados poucos campos:

- observações;
- indicação de permitir ou não emissão;
- inabilitação.

O apresentador considera esse cadastro simples.

## 11.3. Segundo nível

O segundo nível é associado a um primeiro nível. A reunião sugere exemplos como subcentral ou territorial, mas não confirma que esses sejam nomes formais de níveis.

Os dados seriam semelhantes aos do primeiro nível, acrescidos da dependência hierárquica.

## 11.4. Terceiro nível

O terceiro nível — associado a uma oficina ou unidade comercial — deve informar:

- de qual primeiro nível depende;
- de qual segundo nível depende;
- observações;
- possibilidade de uso em emissão;
- situação de inabilitação.

## 11.5. Uso em emissão

O atributo relacionado à emissão não deve ser interpretado como mecanismo geral para desativar uma unidade.

O propósito descrito é diferenciar registros genéricos de registros reais ou utilizáveis em emissão. Um nível genérico pode facilitar a manutenção da estrutura, mas não deveria ser associado diretamente a uma apólice ou utilizado como local comercial concreto da intermediação.

A reunião ressalta:

- um registro genérico não deveria ser usado no processo de emissão;
- uma unidade que não deve participar de nenhum processo deveria ser inabilitada;
- usar o atributo “não permite emissão” para substituir a inabilitação é possível indiretamente, mas não é o uso conceitualmente correto.

> **Leitura analítica:** há uma distinção entre restrição de uso em um processo específico e desativação completa do cadastro. Essa diferença é importante para preservar semântica funcional e qualidade de dados.

---

## 12. Relação entre emissão, intermediários e comissões

## 12.1. Agente como unidade principal de comissionamento

O modelo apresentado situa o agente como destinatário do cálculo de comissões pela seguradora. O cálculo depende do quadro de comissões associado à apólice e pode ocorrer em movimentos de:

- nova produção;
- carteira;
- suplementos.

Os valores podem ser calculados ou recalculados e são devidos ao agente principal segundo o acordo definido entre a companhia e o agente.

## 12.2. Broker e empregado de agente

Nem o broker nem o empregado de agente são apresentados como destinatários automáticos de comissões no modelo descrito:

- o broker intermedeia, mas não é automaticamente a chave de agente que recebe comissões;
- o empregado do agente pode ser identificado, mas sua eventual remuneração é responsabilidade do agente, não da seguradora.

## 12.3. Implicação funcional

> **Leitura analítica:** a modelagem separa pelo menos três papéis:
>
> 1. intermediação comercial por broker;
> 2. relação contratual e comissionamento por agente;
> 3. participação operacional ou comercial de empregados do agente.
>
> Essa separação reduz o risco de atribuir remuneração, tributação ou responsabilidade contratual ao ator errado.

---

## 13. Modelo operacional e governança de dados

A reunião não descreve uma operação completa de suporte, incidentes, releases, monitoramento ou governança formal. Ainda assim, algumas diretrizes de operação e governança de dados aparecem.

## 13.1. Princípios identificados

| Princípio | Evidência na reunião |
|---|---|
| Capturar apenas dados com finalidade | O apresentador questiona se cada dado faz sentido, é desejado pelo negócio e será explorado |
| Manter coerência entre cadastros | Alerta sobre inconsistências entre informação bancária de terceiros e meios de pagamento |
| Preservar histórico | A informação não deve simplesmente desaparecer; pode ser historizada |
| Definir responsáveis | Alguém deve conhecer, explorar e manter a informação da atividade |
| Distinguir semânticas | Broker, agente, empregado, companhia e seguradora não devem ser confundidos |
| Usar atributos segundo sua finalidade | “Permitir emissão” não substitui “inabilitar” |

## 13.2. Responsabilidade de manutenção

Não foram definidos papéis formais, áreas, responsáveis ou níveis de aprovação. A reunião apenas reforça que a responsabilidade por determinados dados de negócio não deve ser atribuída genericamente à área de informática.

---

## 14. Casos e exemplos concretos citados

## 14.1. Malta — empregados de agente

A funcionalidade de empregados de agentes teria surgido por uma necessidade de Malta.

O exemplo apresentado envolve uma agência ou assessoria pequena com vários empregados, onde a seguradora poderia identificar qual empregado participou de uma determinada operação ou emissão.

Não foi descrita uma implementação específica, nem informado se Malta usa percentuais fixos ou variáveis, ou se a funcionalidade é obrigatória no país.

## 14.2. Países europeus e SEPA

A reunião menciona operações ou presença da MAPFRE em países como:

- Alemanha;
- Itália;
- Portugal;
- Malta;
- Reino Unido, com referência a Londres;
- França, com referência a Paris.

Essas menções aparecem no contexto de entidades bancárias, zona SEPA, operações e escritórios de representação ou Global Risk.

A transcrição não permite determinar:

- quais sistemas estão instalados em cada país;
- quais países usam o mesmo modelo de dados;
- quais regulações locais se aplicam;
- qual é o escopo de Global Risk.

## 14.3. Chile e JP Morgan

É dado um exemplo hipotético de uma subsidiária local do JP Morgan no Chile ou de uso para a América Latina, para ilustrar a captura da nacionalidade de um banco.

Não deve ser interpretado como confirmação de uma integração, contrato ou operação real entre a organização e o JP Morgan.

## 14.4. Bankia e Caixa

Os nomes aparecem como exemplo de alterações estruturais no mercado bancário e da necessidade de preservar histórico de entidades compradoras.

A reunião não detalha qualquer processo específico relacionado a essas instituições.

---

## 15. Perguntas e respostas relevantes

## 15.1. Pergunta implícita: o que representa o plano de pagamento do broker?

### O que se buscava esclarecer

A apresentação questiona qual seria o significado de códigos de plano de pagamento de emissão quando aplicados ao cadastro de brokers, como um código associado a cinco quotas ou a um plano específico.

### Resposta dada

A explicação afirma que, para broker, o campo deveria representar a periodicidade de contato econômico-operacional da seguradora com o broker, e não a estrutura detalhada de recebimentos da apólice.

### O que isso esclarece

Esclarece que o conceito usado no cadastro de broker não é equivalente ao plano de pagamento de emissão, embora esteja sendo suportado pelo mesmo catálogo.

---

## 15.2. Pergunta explícita: “Entendido?”

### Contexto

Após explicar a inconsistência do plano de pagamento, o apresentador pergunta se o grupo compreendeu e solicita alguma resposta.

### Resposta

Um participante responde brevemente “algo”, em tom informal.

### O que isso esclarece

A interação não acrescenta conteúdo funcional novo, mas confirma que o apresentador percebia o tema como potencialmente confuso e buscava validar a compreensão do grupo.

---

## 15.3. Pergunta implícita: empregado de agente recebe comissão?

### O que se buscava esclarecer

A explicação trabalha repetidamente a distinção entre o empregado do agente e o agente principal.

### Resposta dada

Não. A seguradora calcula e paga comissão ao agente associado. Se o agente paga parte de sua remuneração aos seus empregados, isso decorre de regras internas do agente, não de uma relação direta entre seguradora e empregado.

### O que isso esclarece

Esclarece a separação entre:

- identificação operacional de quem participou de uma venda;
- titularidade da relação comercial;
- cálculo de comissão;
- eventual distribuição interna da remuneração pelo agente.

---

## 15.4. Pergunta implícita: por que registrar percentual de participação do empregado?

### Resposta dada

O percentual pode ser registrado se o agente fornecer essa informação e se a companhia desejar identificar a participação do empregado. Contudo, a seguradora não precisa fazer nada com esse percentual para fins de comissão ou retenções.

### O que isso esclarece

O dado pode ter valor informativo ou operacional, mas não representa necessariamente uma obrigação financeira da companhia.

---

## 15.5. Pergunta implícita: por que não há causa de inabilitação para agência bancária?

### Resposta dada

A reunião sugere duas explicações possíveis:

- a ausência do campo pode ser uma lacuna que justificaria uma evolução;
- pode ser uma simplificação deliberada para cadastros técnicos ou para companhias que não exploram integralmente o novo modelo.

### O que isso esclarece

Não existe uma resposta definitiva. O ponto permanece como uma limitação ou questão de evolução.

---

## 15.6. Pergunta implícita: “não permitir emissão” significa inabilitar uma unidade?

### Resposta dada

Não. O atributo de permitir emissão serve principalmente para diferenciar registros genéricos de registros utilizáveis no processo de emissão. Se uma unidade precisa ser excluída de todos os processos, o atributo correto é inabilitá-la.

### O que isso esclarece

Distingue restrição funcional por processo de inativação geral do registro.

---

## 16. Números e identificadores citados

| Item | Valor mencionado | Contexto |
|---|---:|---|
| Blocos comuns para atividades | 9 | Referência aos blocos de informação comuns no cadastro de broker |
| Valores possíveis para tipologia do broker | 4 | A transcrição menciona quatro valores, sem listá-los |
| Atividade de broker | 16 | Código de atividade |
| Atividade de empregado de agente | 37 | Código de atividade |
| Atividade de companhia | 39 | Código de atividade |
| Atividade de entidade bancária | 40 | Código de atividade |
| Atividade de agência bancária | 41 | Código de atividade |
| Contatos anuais em periodicidade quadrimestral | 3 | Exemplo de frequência de relação com broker |
| Contatos anuais em periodicidade mensal | 12 | Exemplo de frequência de relação com broker |
| Agentes empregados no exemplo | 5 | Exemplo de pequena assessoria/agência |
| Código de companhia no exemplo de criação | 45 | Exemplo demonstrativo |
| Código “RE-21” | Não especificado | Atributo citado para companhia, sem explicação suficiente |
| Plano de pagamento “1004” | Não especificado | Exemplo de código cuja semântica é questionada |
| Plano com cinco quotas | 5 | Exemplo de plano de pagamento de emissão |

> Os números acima foram declarados ou usados como exemplos durante a reunião. Não há evidência de auditoria, validação externa ou aplicabilidade universal.

---

## 17. Limitações e inconsistências reconhecidas

## 17.1. Plano de pagamento de broker

A reunião reconhece que usar um catálogo próprio de emissão para definir temporalidade de relacionamento com broker é um erro conceitual ou, no mínimo, uma escolha inadequada.

## 17.2. Falta de causa de inabilitação em agência bancária

A atividade de agência bancária aparentemente permite inabilitação sem registrar sua causa ou tipologia. O apresentador identifica isso como possível lacuna e potencial evolução.

## 17.3. Dados potencialmente não explorados

Diversos atributos, como classificações bancárias, agrupamentos e classes de beneficiário, só fazem sentido se houver interesse do negócio em utilizá-los. A reunião não confirma que todos os dados sejam usados em todas as companhias ou países.

## 17.4. Empregado de agente sem efeito financeiro direto

O percentual de participação de um empregado de agente pode não gerar cálculo, retenção ou pagamento pela seguradora. Seu uso pode ser apenas informativo.

## 17.5. Termos incertos na transcrição

Há termos que não podem ser corrigidos silenciosamente:

- Riftcore/Trifcore;
- THP;
- SIF;
- RE-21;
- “sterres” ou expressão similar relacionada a resseguro;
- alguns nomes de módulos, possivelmente “Tronweb”.

A transcrição não permite determinar com segurança a grafia, expansão ou significado oficial desses termos.

---

## 18. Riscos e desafios

## 18.1. Riscos explicitamente sustentados pela reunião

| Risco | Consequência possível |
|---|---|
| Confundir broker com agente | Erros no entendimento de comissões e responsabilidade contratual |
| Reutilizar catálogo de emissão para broker | Interpretação errada da periodicidade operacional |
| Cadastrar dados sem objetivo de negócio | Dados ociosos, inconsistentes ou difíceis de manter |
| Duplicidade ou desalinhamento de cadastros bancários | Divergência entre terceiros e meios de pagamento |
| Usar “não permite emissão” como inabilitação | Semântica incorreta e potencial uso indevido de atributos |
| Não atribuir responsabilidade de manutenção | Dados desatualizados ou sem governança |
| Alterar classificações sem rastreabilidade | Dificuldade para analisar impacto em código e integrações |

## 18.2. Desafios derivados do contexto

> **Análise, não afirmação literal dos participantes:**

1. **Governança de dados mestre:** a variedade de atividades, campos específicos e dependências entre processos sugere necessidade de regras consistentes para proprietários de dados, cadastros e revisões.

2. **Padronização entre países:** a reunião cita diferentes países, modalidades de agentes, contexto SEPA e necessidades locais. Isso sugere o desafio de equilibrar um modelo global com variações regulatórias e operacionais.

3. **Evolução sem quebrar legado:** a presença de atributos considerados arcaicos, dados herdados e referências a modelos antigos indica que evoluções precisam preservar histórico e compatibilidade.

4. **Qualidade semântica dos catálogos:** a reutilização de catálogos para finalidades diferentes pode reduzir a confiabilidade dos dados e tornar relatórios ou regras de negócio ambíguos.

---

## 19. Relações de causa e efeito identificadas

### 19.1. Consolidação de dados de companhia

```text
Informações de companhia em tabela própria
↓
Identificação de sinergias com dados de terceiros
↓
Necessidade de evitar modelagem isolada
↓
Companhia tratada como atividade específica no núcleo
↓
Reaproveitamento de identificação, contatos e endereços
```

### 19.2. Controle de participação de empregados de agentes

```text
Agentes podem possuir empregados
↓
A seguradora pode precisar saber quem participou de determinada operação
↓
Necessidade de identificação sem criar relação comissionável direta
↓
Criação da atividade de empregado de agente
↓
Possibilidade de registrar dependência e percentual de participação
```

### 19.3. Necessidade de periodicidade com brokers

```text
Relação econômico-operacional com brokers
↓
Necessidade de entregar bordereaux, sinistralidade ou informações comerciais
↓
Necessidade de definir frequência de contato
↓
Uso de campo denominado “plano de pagamento”
↓
Inconsistência por reutilização de catálogo de emissão
```

### 19.4. Manutenção de estrutura bancária histórica

```text
Bancos podem sofrer aquisições ou mudanças estruturais
↓
Informações anteriores não devem desaparecer
↓
Necessidade de preservar histórico e rastreabilidade
↓
Registro de entidade compradora e dados de constituição/nacionalidade
```

---

## 20. Transformações estruturais sugeridas pelo conteúdo

## 20.1. De cadastros isolados para um modelo de terceiros

> **Leitura analítica:** a mudança mais clara é a passagem de cadastros específicos e lineares para uma estrutura baseada em terceiros, atividades e blocos reutilizáveis de informação.

Isso é explicitamente sustentado pelo caso das companhias e repetido para bancos, brokers, empregados de agentes e unidades da estrutura comercial.

## 20.2. De atributos rígidos para contatos e dados relacionais

O exemplo do CEO de uma companhia sugere que informações antes mantidas como campos específicos passam a ser modeladas como contatos vinculados ao terceiro.

> **Leitura analítica:** isso aponta para uma estrutura potencialmente mais flexível, em que a mesma entidade pode ter múltiplos contatos e direções sem depender de atributos exclusivos para cada caso.

## 20.3. De dados técnicos para dados governados por negócio

A reunião reforça que capturar informação não é suficiente. É necessário que ela tenha finalidade, exploração e responsabilidade de manutenção.

> **Leitura analítica:** há uma transformação de foco: o cadastro deixa de ser apenas uma preocupação técnica e passa a ser tratado como ativo de negócio que exige governança.

## 20.4. Separação de papéis no ecossistema de intermediação

A apresentação diferencia claramente broker, agente e empregado de agente.

> **Leitura analítica:** essa separação indica uma tentativa de reduzir sobreposição de responsabilidades entre intermediação, remuneração, vínculo contratual e identificação operacional.

---

## 21. O que a reunião não permite concluir

A transcrição não fornece detalhes suficientes para concluir com segurança sobre os itens abaixo:

### Arquitetura técnica

- linguagem de programação;
- banco de dados;
- APIs;
- integrações;
- eventos;
- mensageria;
- arquitetura de microserviços ou monólito;
- infraestrutura;
- cloud;
- ambientes;
- topologia de rede;
- estratégia de disponibilidade;
- recuperação de desastre;
- backups;
- observabilidade;
- monitoramento.

### Segurança e conformidade

- modelo de autenticação;
- autorização e perfis;
- gestão de identidade;
- criptografia;
- proteção de dados pessoais;
- auditoria;
- segregação de funções;
- requisitos de LGPD, GDPR ou regulações equivalentes;
- política de retenção de dados;
- tratamento de dados fiscais e tributários.

### Operação e entrega

- processo de incidentes;
- SLAs;
- suporte;
- gestão de mudanças;
- releases;
- patches;
- hotfixes;
- versionamento;
- CI/CD;
- testes;
- homologação;
- estratégia de rollout.

### Regras de negócio

- fórmula de cálculo de comissões;
- catálogo completo de tipos de broker;
- catálogo de agrupamentos;
- catálogo de classes de beneficiário;
- regras de colegiamento;
- valores e uso de RE-21;
- definição formal de THP;
- definição formal de SIF;
- regras fiscais por país;
- critérios para planos de fidelização em tréboles;
- regra de uso obrigatório ou opcional de cada atividade;
- roadmap de correção do campo de plano de pagamento do broker.

---

## 22. Principais conclusões

1. O treinamento apresenta um modelo de cadastro orientado a terceiros e atividades, no qual entidades diferentes compartilham blocos comuns de informação e mantêm atributos específicos.

2. Broker, agente e empregado de agente possuem papéis distintos. A comissão é associada ao agente, enquanto broker e empregado podem ter funções de intermediação ou identificação operacional.

3. O campo de “plano de pagamento” do broker é reconhecido como inadequadamente apoiado por um catálogo de emissão. A necessidade real seria representar frequência de relacionamento com o broker, e não parcelamento de apólices.

4. Companhias passaram a ser modeladas como terceiros em razão das sinergias entre seus dados e os cadastros gerais. A companhia do sistema não deve ser confundida com seguradora.

5. Entidades e agências bancárias possuem informações específicas, mas a captura deve ser orientada pelo uso real do negócio e mantida com responsabilidade clara.

6. A estrutura comercial possui níveis hierárquicos e diferencia registros genéricos de unidades efetivamente utilizáveis em emissão. “Não permitir emissão” não substitui a inabilitação do cadastro.

7. O conteúdo reforça a importância de preservar histórico, manter coerência entre cadastros e evitar que atributos técnicos sejam usados fora de sua finalidade semântica.

8. A reunião não apresenta arquitetura técnica detalhada, roadmap formal, responsáveis nomeados, tecnologia de integração ou regras completas de segurança e operação. Esses pontos exigiriam documentação complementar para que o conteúdo se torne uma referência técnica integral.
