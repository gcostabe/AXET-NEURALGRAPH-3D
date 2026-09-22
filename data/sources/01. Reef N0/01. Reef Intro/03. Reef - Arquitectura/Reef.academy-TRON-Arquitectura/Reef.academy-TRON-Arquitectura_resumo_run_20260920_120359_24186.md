# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.academy-TRON-Arquitectura.mp4`
**Data de processamento:** 20/09/2026 12:09:18
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada da reunião: arquitetura, integração e evolução da plataforma RIF/RIB

> **Nota de qualidade da fonte:** a transcrição contém um trecho inicial extremamente repetitivo — “Y a todos los que están en el mundo” — sem conteúdo contextual identificável. Esse trecho foi tratado como ruído de reconhecimento/transcrição e não foi usado para inferências.  
>
> Também há nomes, siglas e termos técnicos potencialmente deformados pelo reconhecimento de voz, como **RIF/RIB**, **TRXX**, **PIHETS**, **MAR/MAR20**, **tron 2000**, **mardo cero**, **DUP**, **RTE**, **CELFOS TRM** e outros. Eles foram preservados como registrados quando não havia evidência suficiente para corrigi-los.

---

## 1. Síntese executiva

A reunião apresentou uma visão técnica da evolução de uma plataforma associada ao core segurador **Tron**, referida predominantemente como **RIF**, embora em alguns momentos a transcrição registre **RIB**. O foco principal foi mostrar como a plataforma busca reduzir o acoplamento entre o core, os sistemas locais de cada país, os front-ends e serviços externos.

Foram abordados cinco grandes temas:

1. **Evolução do modelo de dados e da execução de processos**, incluindo separação de esquemas, tratamento de permissões e restrições para código executado contra Oracle.
2. **Integração por APIs REST**, com uma arquitetura composta por **API Edge**, **API Business**, uma API voltada a processos pesados — registrada como **API Badge** — e uma API de convivência sob responsabilidade de cada país.
3. **Integração orientada a eventos**, apresentada como uma mudança de paradigma para desacoplar processos, permitir comunicações assíncronas e ampliar resiliência e flexibilidade.
4. **Capacidades documentais e de reporting**, incluindo geração, distribuição, entrada, administração e visualização de documentos.
5. **Implantações em cloud**, com exemplos relacionados ao Panamá e ao produto de vida no Uruguai, citando automação de infraestrutura, observabilidade, integração por eventos e componentes serverless.

A mensagem central foi que APIs e eventos têm papéis complementares: **APIs são usadas para solicitar ações**, em geral de forma síncrona; **eventos comunicam fatos já ocorridos**, permitindo que outros sistemas reajam de modo assíncrono e desacoplado.

---

## 2. Contexto e antecedentes

A apresentação parte de um cenário em que o core Tron possui lógica de negócio e processos historicamente implementados em banco de dados, incluindo procedimentos em **PL/SQL**. Também existem instalações locais em diferentes países, com realidades distintas: alguns usam Tron como sistema local e pelo menos um caso citado, Panamá, utiliza um sistema chamado **SISMAP**.

A arquitetura proposta parece responder a alguns desafios recorrentes:

- necessidade de manter uma plataforma central sem impor impactos excessivos às instalações locais;
- necessidade de atualizar versões do core com menor interferência nos países;
- existência de lógicas e integrações historicamente concentradas no banco de dados;
- necessidade de expor capacidades do core de maneira mais padronizada;
- necessidade de conectar sistemas locais, front-ends, terceiros e novos ativos da plataforma;
- redução de integrações síncronas excessivamente acopladas;
- evolução da execução de tarefas pesadas para fora da base de dados, quando apropriado.

A reunião não detalha o histórico completo da plataforma, tampouco define formalmente as siglas RIF e RIB. O uso alternado dessas formas pode indicar erro de transcrição ou nomenclatura semelhante para componentes distintos; não é possível determinar isso com segurança.

---

## 3. Problemas e necessidades identificados

### 3.1 Acoplamento entre o core e instalações locais

Foi explicitado que o objetivo de parte da evolução é instalar versões do core minimizando o impacto nos países, idealmente de forma quase transparente.

A necessidade parece decorrer da coexistência entre um core ou plataforma central e sistemas locais que podem variar por país. Esse cenário exige mecanismos de convivência e integração que reduzam dependências diretas entre os ambientes.

### 3.2 Uso de estado de sessão no banco de dados

Foi explicado que front-ends, BFFs e um backend Java se conectam ao Oracle por meio de pools de conexão. Portanto, as sessões são descritas como **desconectadas**.

A consequência técnica apontada é que o desenvolvimento não deve depender de variáveis globais em nível de pacote, usadas tradicionalmente. Segundo a explicação, a sessão pode ser reinicializada quando um front-end acessa a base de dados, o que inviabiliza assumir que informações de estado serão mantidas entre requisições.

### 3.3 Processos pesados executados no banco

A apresentação menciona tarefas do Tron Web tradicionalmente desenvolvidas em processos de banco de dados, em PL/SQL. Isso pode gerar carga no banco e aumentar riscos, especialmente quando esses processos realizam chamadas a serviços externos.

Foi apresentada uma evolução que permite desenvolver determinadas tarefas em Java, removendo parte da carga da base de dados e evitando situações como bloqueios relacionados a chamadas externas feitas a partir dela.

### 3.4 Integrações síncronas acopladas

A discussão sobre eventos descreveu limitações das integrações síncronas por API:

- dependência direta de contratos entre sistemas;
- maior acoplamento entre chamador e chamado;
- possibilidade de lentidão ou falha em um serviço afetar a transação originadora;
- maior dificuldade de adicionar novos consumidores sem alterar o fluxo original.

A apresentação não afirmou que APIs serão abandonadas. Ao contrário, reforçou que elas continuam necessárias para execução de ações.

### 3.5 Cargas periódicas e informação não imediata

Em casos como **Ficha Cliente 360** e a iniciativa **CELFOS TRM**, foram citados processos tradicionais de carga em lote ou periódicos. A integração por eventos foi apresentada como alternativa para disponibilizar mudanças de forma mais imediata, reduzindo a dependência de sincronizações periódicas.

---

## 4. Direcionamento geral da solução

A plataforma apresentada combina múltiplas capacidades, cada uma com uma responsabilidade distinta:

```text
Front-ends / Sistemas locais / Sistemas externos
                    │
                    ├── APIs REST síncronas
                    │       ├── API Edge
                    │       ├── API Business
                    │       ├── API para processos pesados
                    │       └── API de convivência local
                    │
                    └── Eventos assíncronos
                            ├── Broker de eventos
                            ├── Tópicos isolados por país
                            ├── Produtores
                            └── Consumidores / assinantes

                                  ↓

                        Core Tron e seus módulos

                                  ↓

                      Banco de dados, processos,
                documentos, tarifação, cobrança e outros ativos
```

> **Leitura analítica:** a solução apresentada indica uma direção de desacoplamento progressivo. O core continua sendo o centro funcional, mas suas capacidades passam a ser expostas e consumidas por APIs e eventos, em vez de depender exclusivamente de integrações diretas, chamadas internas ou lógicas concentradas no banco.

---

## 5. Modelo de dados, esquemas e execução de processos

### 5.1 Esquemas mencionados

A transcrição começa a apresentar uma estrutura de esquemas, mas os nomes não foram reconhecidos com clareza. São mencionados termos como:

- “esquema de L”;
- “TRXX de L”;
- “tron 2000”;
- “tron 2000 XX”.

Não é possível reconstituir com segurança os nomes corretos ou a estrutura integral desses esquemas.

Ainda assim, é possível identificar os seguintes pontos:

- haveria um esquema associado a acessos a dados e interfaces para camadas superiores;
- um esquema identificado como “TRXX” alojaria objetos de definição de produto;
- a experiência do Uruguai teria demonstrado a necessidade de mover um pacote ou conjunto de componentes originalmente associados ao Tron local;
- essa “paquetería” estaria, no momento da reunião, alojada em um esquema “TRXX de L”, devido ao acoplamento com o modelo físico “tron 2000”;
- estaria sendo criado um novo esquema, registrado como “tron 2000 XX”, para receber essa lógica e permissões existentes.

### 5.2 Finalidade do novo esquema

Segundo a explicação, o novo esquema teria permissões para acessar o modelo físico e sua definição, seguindo normas do Tron Web, mas seria destinado apenas a determinados processos:

- processos dinâmicos;
- processos batch;
- processos muito específicos.

A transcrição não especifica os critérios técnicos usados para classificar um processo como apto a ficar nesse esquema.

### 5.3 Implicação arquitetural

A reorganização descrita sugere uma tentativa de separar:

- objetos de definição de produto;
- modelo físico;
- lógica de processos específicos;
- permissões de acesso associadas à execução desses processos.

> **Leitura analítica:** o movimento parece buscar reduzir o acoplamento entre pacotes originalmente desenvolvidos para uma instalação específica e a evolução do modelo físico central. Entretanto, a transcrição não fornece detalhes suficientes para afirmar se haverá isolamento completo, migração total de código ou apenas redistribuição de objetos entre esquemas.

---

## 6. Modelo de conexão com Oracle e restrições de desenvolvimento

### 6.1 Sessões desconectadas por pool de conexões

Foi explicado que os front-ends, BFFs e backend Java se conectam ao Oracle por meio de pools de conexão. Isso implica reutilização e limpeza de sessões.

Em contraste, o Tron Web original foi descrito como funcionando com sessão conectada.

### 6.2 Restrição sobre variáveis globais de pacote

Como a sessão é reiniciada ou “resetada”, não se deve depender de variáveis globais armazenadas em pacotes PL/SQL para preservar estado de requisição ou sessão.

A consequência prática é que lógicas antigas que assumem uma sessão persistente podem precisar de adaptação ao novo modelo.

### 6.3 O que não foi detalhado

A reunião não informa:

- como o estado de contexto deve ser transportado entre as camadas;
- quais padrões de desenvolvimento substituem formalmente as variáveis globais;
- como autenticação, autorização ou identidade de usuário chegam ao banco;
- se há mecanismos de contexto transacional, correlação ou rastreamento distribuído;
- quais componentes realizam o reset de sessão e em que condições.

---

## 7. Integração por APIs REST

## 7.1 Conceito apresentado

A API foi explicada como um catálogo de serviços que permite a comunicação entre sistemas ou aplicações. APIs REST foram descritas como a forma de publicar e consumir esses serviços por meio de HTTP.

A analogia usada foi a de um restaurante:

| Elemento da analogia | Papel arquitetural associado |
|---|---|
| Cardápio | Catálogo de serviços |
| Prato | Serviço individual |
| Garçom | API |
| Cozinha | Core segurador / Tron |
| Comensais | Outros sistemas e aplicações |

A ideia central é que sistemas consumidores não acessam a implementação interna do core diretamente. Eles utilizam serviços publicados por meio da API.

---

## 7.2 API Edge

A **API Edge** foi apresentada como a API que expõe diretamente funcionalidades do core Tron.

### Características mencionadas

- comunica-se diretamente com o core;
- usa linguagem, estrutura e nomenclatura mais próximas do Tron;
- é mais ligada ao modelo de dados e à estrutura interna do core;
- é segmentada por domínios funcionais;
- possui mais de 500 serviços no catálogo, segundo a apresentação;
- pode ser consumida por aplicações internas, aplicações próprias do Tron e sistemas locais de cada país.

### Domínios citados

Foram dados exemplos de módulos ou APIs Edge para:

- emissão;
- tesouraria;
- sinistros.

A transcrição não apresentou a lista completa de domínios nem os serviços existentes em cada um.

### Implicação

A API Edge atua como camada de exposição funcional relativamente próxima ao core. Isso torna sua utilização adequada para consumidores que conhecem o domínio e a estrutura do Tron, mas menos conveniente quando se busca uma interface mais uniforme e menos dependente de terminologia interna.

---

## 7.3 API Business

A **API Business** foi apresentada como uma forma de expor serviços com linguagem mais clara, uniforme e menos orientada ao Tron.

### Responsabilidade

Ela realiza a tradução necessária para se comunicar com a API Edge. O objetivo é permitir que consumidores trabalhem com uma interface de negócio sem precisarem conhecer diretamente o modelo e a nomenclatura do core.

### Componentes fornecidos

Segundo a apresentação, a plataforma fornece:

- o catálogo de serviços da API Business;
- uma implementação padrão, chamada de “preconstruido” na transcrição;
- a tradução entre a API Business e a API Edge.

### Capacidades transversais

Foi dito que tanto a API Edge quanto a API Business vêm “de caixa” com:

- segurança;
- cache;
- geração de logs;
- logs para auditoria.

A transcrição não detalha os protocolos de segurança, modelo de autenticação, política de cache, formato de logs nem regras de auditoria.

---

## 7.4 API para processos pesados

A transcrição registra uma API chamada **API Badge**. O nome pode estar incorreto, mas não há evidência suficiente para corrigi-lo.

Essa API é destinada a chamadas de processos considerados pesados, seja por:

- grande volume de dados;
- tempo de execução;
- ou ambos.

Ela é associada a tarefas do Tron Web e à evolução dessas tarefas de PL/SQL para Java.

### Motivação apresentada

A execução de tarefas em Java pode:

- reduzir a carga na base de dados;
- evitar problemas relacionados a determinados tipos de processos feitos no banco;
- evitar potenciais bloqueios quando processos executados no banco chamam serviços externos.

A apresentação foi explícita ao afirmar que não se recomenda realizar chamadas a serviços externos diretamente da base de dados.

---

## 7.5 Integração entre RIF e o sistema local do país

A integração entre a plataforma e cada sistema local foi descrita como uma integração síncrona, com pontos de entrada definidos.

O sistema local pode ser:

- uma instalação local de Tron;
- outro sistema, como o SISMAP no Panamá.

### Regra para integrações de entrada

Foi afirmado que todas as integrações síncronas de entrada devem ocorrer por meio de uma API registrada na transcrição como **PIHETS**.

Esse componente deve:

- ser o ponto único de entrada das integrações síncronas;
- disponibilizar para RIF a funcionalidade local necessária;
- ser uma API REST;
- seguir a normativa corporativa de definição de APIs;
- seguir uma referência registrada como “MAR”, descrita como arquitetura definida para MAPFRE.

A transcrição não permite confirmar a grafia correta de “PIHETS” ou “MAR”.

### API de convivência

O acesso síncrono à funcionalidade dos sistemas do país deve ser realizado por uma **API de convivência**.

Foi destacado que a API de convivência:

- é responsabilidade do país;
- é implantada em servidores locais escolhidos pelo país;
- deve disponibilizar a funcionalidade local necessária à plataforma.

---

## 8. Integração orientada a eventos

## 8.1 Eventos como paradigma, não apenas como tecnologia

A gestão de eventos foi apresentada não apenas como capacidade de integração, mas como uma nova maneira de construir sistemas.

A arquitetura orientada a eventos foi descrita como um modelo no qual componentes de software reagem ao receber notificações de eventos.

A apresentação associou esse paradigma a:

- menor acoplamento;
- isolamento de processos;
- integração ágil;
- respostas mais próximas do tempo real;
- eficiência operacional;
- maior resiliência;
- maior flexibilidade.

---

## 8.2 Definição de evento

Foram apresentadas definições atribuídas a fontes externas, incluindo Gartner, Confluent e Red Hat. Sem validar essas fontes externamente, o conteúdo exposto pode ser sintetizado assim:

- evento é a representação de algo que aconteceu;
- evento pode representar uma mudança de estado;
- eventos são tratados como registros imutáveis;
- os eventos permanecem acumulados no broker ou nos blocos de eventos;
- o conteúdo de um evento não deve ser alterado após sua publicação.

### Exemplo dado: emissão de apólice

No modelo tradicional descrito:

```text
Emissão de apólice
    ↓
Pós-processamentos
    ↓
Chamadas diretas para serviços relacionados
    ↓
Impressão de condições particulares, integrações e outras ações
```

No modelo orientado a eventos:

```text
Emissão de apólice
    ↓
Publicação do evento de emissão
    ↓
Consumidores inscritos recebem o evento
    ↓
Cada consumidor executa sua responsabilidade
    ├── Impressão das condições particulares
    ├── Integrações
    └── Outros pós-processamentos
```

Nesse modelo, a emissão da apólice se concentra em emitir a apólice. Os demais processos reagem ao fato consumado, sem que a emissão precise chamar diretamente todos os serviços posteriores.

---

## 8.3 Plataforma de eventos

A plataforma inclui um broker de eventos fornecido por um serviço da Confluent.

Foi informado que esse broker está implantado em uma infraestrutura registrada como **WDS**, na região da Irlanda. A sigla WDS não foi explicada, portanto não é possível determinar a infraestrutura ou provedor correspondente.

### Conectores com instalações originais de Tron

A plataforma possui conectores para bases de dados de instalações originais do Tron. A justificativa apresentada é que grande parte da lógica de negócio ainda está implementada em PL/SQL.

Esses conectores permitem usar as bases como fontes de mensagens ou eventos. A transcrição menciona mensagens registradas como “SCOTMS”, posteriormente transformadas em eventos. O nome não pode ser confirmado com segurança.

### Emissão de eventos a partir da base

Foi dito que, a partir da versão **23.01**, existe capacidade de emitir eventos a partir do banco de dados por meio de serviços oferecidos pelo próprio Tron.

Não foram detalhados:

- o formato dos eventos;
- a estrutura dos tópicos;
- as garantias de entrega;
- a política de reprocessamento;
- a ordenação;
- a retenção;
- o mecanismo técnico usado para publicação a partir do banco.

---

## 8.4 Isolamento por país

Os tópicos de eventos de cada país seriam isolados dos demais. Segundo a apresentação:

- cada país vê somente seus próprios tópicos;
- sistemas locais podem conectar-se ao broker;
- sistemas locais podem publicar eventos;
- sistemas locais podem consumir eventos.

Isso sugere uma separação lógica de tráfego e visibilidade por país.

> **Leitura analítica:** o isolamento por tópicos parece ser um mecanismo de segregação funcional entre países. A transcrição, contudo, não permite concluir se esse isolamento é apenas lógico, se existe segregação física, como são administradas as permissões ou como são tratados cenários regionais e transnacionais.

---

## 8.5 Segurança das conexões com o broker

As conexões com os tópicos do broker foram descritas como protegidas por:

- **OAuth**;
- **Azure AD corporativo global** como identity provider.

Não foram mencionados detalhes sobre escopos, roles, autorização por tópico, certificados, rotação de credenciais ou auditoria de acesso.

---

## 9. APIs e eventos: papéis complementares

A apresentação fez uma distinção clara entre APIs e eventos.

| Aspecto | APIs | Eventos |
|---|---|---|
| Propósito | Solicitar uma ação | Comunicar que um fato ocorreu |
| Momento | Antes ou durante a ação | Após o fato |
| Comunicação | Predominantemente síncrona | Assíncrona |
| Exemplo | Cobrar um recibo | Informar que o recibo foi cobrado |
| Acoplamento | Mais forte | Mais fraco |
| Modelo de integração | Ponto a ponto | Um para muitos |
| Efeito de lentidão do consumidor | Pode afetar a transação | Tende a ficar isolado no consumidor |
| Inclusão de novos consumidores | Pode exigir alteração do fluxo original | Pode ocorrer sem alterar o produtor |

### Exemplo de complementaridade

```text
Sistema consumidor
    ↓
Invoca API para cobrar recibo
    ↓
Core executa a cobrança
    ↓
Core publica evento de recibo cobrado
    ↓
Consumidores reagem ao evento
    ├── Atualização de outro sistema
    ├── Notificação
    └── Novo processamento ou integração
```

A mensagem não é que eventos substituem APIs, mas que ambos os mecanismos devem coexistir.

---

## 10. Limitações e cuidados no modelo orientado a eventos

A apresentação reconheceu que arquiteturas orientadas a eventos aumentam a flexibilidade e a resiliência, mas também elevam a complexidade do tratamento de erro.

Foi destacado que consumidores precisam considerar, por projeto:

- o caminho positivo;
- o caminho negativo;
- comportamentos de falha.

A transcrição não detalhou mecanismos específicos para:

- retries;
- filas de erro;
- dead-letter queues;
- idempotência;
- compensação;
- correlação;
- monitoramento de consumidores;
- reprocessamento;
- consistência eventual.

Esses temas são particularmente relevantes, mas não podem ser assumidos como existentes.

---

## 11. Casos de uso de eventos apresentados

## 11.1 Gestão de inadimplência

Foi citado um novo sistema de inadimplência ou impagos, construído já com integração nativa por eventos.

Os processos do Tron que alteram gestores de cobrança ou estados dos recibos devem emitir eventos quando:

- um recibo entra em inadimplência;
- um recibo deixa de estar inadimplente;
- há mudanças relacionadas ao estado de cobrança.

Esses eventos permitem que o sistema de inadimplência reaja, por exemplo para criar ou remover atividades correspondentes.

A transcrição não detalha:

- regras de classificação de inadimplência;
- quais dados são publicados;
- se existe tratamento de reversão;
- qual sistema é fonte definitiva de cada estado.

---

## 11.2 Autosserviço de fornecedores

O primeiro autosserviço citado como consumidor dessa tecnologia é o **autosserviço de fornecedores**.

Fluxo descrito:

```text
Atualização de fornecedor no Tron
    ↓
Emissão de evento
    ↓
Autosserviço de fornecedores consome o tópico
    ↓
Identifica alta, baixa ou alteração
    ↓
Executa comunicações pertinentes com o fornecedor
    ↓
Habilita ou ajusta acessos ao autosserviço
```

Foi mencionado especificamente o relacionamento com oficinas ou “talleres”, conforme o termo em espanhol usado na transcrição.

---

## 11.3 Ficha Cliente 360

Foi informado que a Ficha Cliente 360 recebe, atualmente, informações por processos tradicionais batch e cargas periódicas.

Para uma iniciativa de vida que estaria próxima de entrar em produção, a sincronização de clientes entre o Tron local e o Tron disponibilizado em RIF seria feita por eventos.

A transcrição menciona “RIF de Vida” e possivelmente uma implementação em curso, mas não fornece nome oficial completo, datas nem critérios de entrada em produção.

---

## 11.4 CELFOS TRM

Foi citada uma iniciativa chamada **CELFOS TRM**.

Segundo a apresentação, informações geradas no Tron — como cotações, orçamentos e apólices — seriam sincronizadas com CELFOS por eventos, evitando cargas periódicas e permitindo disponibilização mais imediata dos dados.

Não é possível determinar, pela reunião:

- a finalidade de CELFOS;
- o significado de TRM;
- se CELFOS é sistema interno, produto ou plataforma externa;
- quais dados específicos serão enviados;
- se haverá consumo bidirecional.

---

## 11.5 Sistema de prestações de saúde na Espanha

Foi mencionada uma iniciativa para o fim do ano e o ano seguinte relacionada a um sistema de prestações de saúde na Espanha.

Nesse cenário:

- EDA — Event-Driven Architecture — seria uma das arquiteturas de referência;
- a principal arquitetura mencionada seria “MAR20”;
- internamente, os domínios e as comunicações entre domínios utilizariam EDA.

A transcrição não detalha o escopo funcional, cronograma, equipes, sistemas envolvidos ou o significado confirmado de MAR20.

---

## 12. Reporting e gestão documental

A plataforma também apresentou capacidades relacionadas a documentos e relatórios.

### Componentes e serviços mencionados

Foram citados, com grafia preservada da transcrição:

- compositor de documentos;
- serviço “FIS”;
- serviço “dependés”;
- serviço de documentos;
- visualizador de documentos;
- visualizador “demos”;
- JasperReports, registrado como “hasper report”;
- serviço “WTW doner report”;
- visualizador “cd2”.

Vários desses nomes podem conter erros de reconhecimento. Não é possível identificá-los com segurança.

---

## 12.1 Evolução em relação aos relatórios anteriores

Nos Tron originais, relatórios eram gerados com JasperReports. As templates ou plantillas eram disponibilizadas em um serviço ou módulo registrado como “WTW doner report”.

Foi dito que foram criados módulos no Tron que, por configuração, permitem explorar as capacidades técnicas da plataforma documental.

### Módulo de reports

O módulo permite definir, com base em templates, se a composição do documento será feita por:

- JasperReports;
- FIS.

A transcrição não informa como essa seleção é configurada, nem quais critérios orientam a escolha entre os dois mecanismos.

---

## 12.2 Módulo de documentos de saída

Foi apresentado um módulo de documentos de saída, organizado por famílias como:

- apólices;
- recibos;
- sinistros;
- clientes.

Por configuração, seria possível determinar:

- quais documentos devem ser gerados;
- quais destinatários devem recebê-los;
- quais meios de distribuição devem ser usados.

Os canais citados foram:

- e-mail;
- SMS;
- área ou zona de download;
- envio ou subida para documentos.

A expressão final sobre “subir a documento” não ficou clara na transcrição. Não é possível afirmar se se refere a repositório documental, armazenamento específico ou outro mecanismo.

---

## 12.3 Módulo de documentos de entrada

Foi apresentado um módulo capaz de parametrizar quais documentos são necessários para que determinada operação possa ser concluída.

Quando documentos obrigatórios não estão disponíveis, o módulo poderia levantar controles técnicos pertinentes.

A reunião não detalhou:

- tipos documentais;
- regras de validação;
- origem dos documentos;
- mecanismos de aprovação;
- controle de versões;
- assinatura digital;
- retenção;
- segurança ou classificação documental.

---

## 12.4 Administração e visualização de documentos

Também foi citado um módulo de administração documental que permite associar documentos a entidades principais do sistema, tais como:

- apólice;
- orçamento;
- recibo;
- serviço;
- sinistro;
- expediente;
- fatura.

Além disso, foi implementada uma alternativa ao visualizador “cd2”, com funcionalidades de visualização e upload de documentos.

---

## 13. Casos de implantação em cloud

## 13.1 Caso Panamá

Foi apresentada uma implantação de RIF associada ao Panamá.

### Informações explicitamente mencionadas

- o primeiro RIF em cloud teria nascido em Oracle Cloud;
- a transcrição também menciona uma “região principal em Google, na América”;
- o disaster recovery estaria em San José;
- os componentes nasceram como se fossem implantados on-premise, com servidores WebLogic;
- a infraestrutura foi automatizada com Terraform;
- a observabilidade da plataforma utiliza Dynatrace;
- alguns serviços locais, como a API de convivência, também foram incluídos na observabilidade;
- foi reutilizado um framework de gestão documental existente no datacenter de Miami;
- a API de convivência conecta o sistema local do Panamá, SISMAP, ao sistema RIF/Tron;
- foi instalado um agente de Control-M para comunicação com um mestre localizado em um ambiente registrado como “espacio máfrico”.

### Inconsistência de cloud

Há uma inconsistência literal na transcrição: ela afirma que o primeiro RIF em cloud nasceu em Oracle Cloud, mas em seguida registra região principal no Google e disaster recovery em San José.

Não é possível concluir se:

- há múltiplos provedores;
- houve migração;
- a palavra “Google” foi transcrita incorretamente;
- Oracle Cloud foi mencionada como origem e outra infraestrutura como destino;
- ou se os ambientes pertencem a contextos diferentes.

Portanto, qualquer detalhamento adicional seria especulativo.

---

## 13.2 Caso Vida / Uruguai

Foi apresentada uma implementação associada ao produto de vida no Uruguai, vinculada à América do Sul.

### Informações explicitamente mencionadas

- o produto seria implantado em São Paulo;
- o disaster recovery estaria em Ohio, nos Estados Unidos;
- componentes Java do Tron passaram por reengenharia em sua maior parte;
- esses componentes seriam implantados como serviços serverless;
- a tecnologia ou serviço citado para execução serverless foi AWS Fargate;
- para banco de dados seria usado Oracle em um serviço RDS da AWS;
- a arquitetura foi criada com arquétipos registrados como “mardo cero”;
- a infraestrutura como código permitiria implantações automatizadas em regiões desejadas;
- observabilidade e monitoramento foram levados para Dynatrace em todos os ambientes;
- a integração de dados de clientes entre RIF e o sistema local do Uruguai seria realizada por eventos;
- foram criados serviços para seleção de riscos, em termos registrados como “DUP”;
- foram criados serviços para seleção de módulos, em termos registrados como “RTE”;
- a gestão documental também foi levada para AWS, aparentemente em Fargate;
- foi criado um cotizador integrado ao core RIF, seguindo os mesmos arquétipos;
- o cotizador teria sido criado em um ambiente registrado como “audubles”.

### Pontos não confirmados

Não é possível confirmar:

- o significado de “OBS” citado antes da descrição do ambiente;
- o significado de “mardo cero”;
- o significado de DUP, RTE e “audubles”;
- se São Paulo e Ohio são regiões específicas dos mesmos serviços de cloud;
- quais componentes efetivamente permanecem em WebLogic, Oracle ou outros serviços;
- se o banco RDS Oracle é gerenciado integralmente ou apenas consumido como serviço de banco.

---

## 14. Modelo operacional, observabilidade e automação

### 14.1 Infraestrutura como código

Nos casos de cloud citados, a infraestrutura foi descrita como automatizada por Terraform ou por arquétipos que permitem infraestrutura como código.

Os benefícios explicitamente associados são:

- automação de infraestrutura;
- capacidade de implantar em regiões desejadas;
- padronização de arquitetura.

### 14.2 Observabilidade

Dynatrace foi citado como ferramenta de observabilidade e monitoramento:

- na plataforma do caso Panamá;
- em alguns serviços locais;
- em todos os ambientes do caso de vida na América do Sul.

A reunião não detalha:

- métricas monitoradas;
- alertas;
- dashboards;
- SLOs;
- SLAs;
- tracing distribuído;
- retenção de logs;
- processos de resposta a incidentes.

### 14.3 Agendamento de tarefas

No caso Panamá, foi mencionado o uso de um agente Control-M que se comunica com um mestre em outro ambiente corporativo.

A reunião não detalhou:

- quais tarefas são agendadas;
- se o Control-M é usado para processos batch do core;
- como ocorre recuperação após falhas;
- responsabilidades operacionais;
- modelo de suporte.

---

## 15. Organização de responsabilidades

| Responsabilidade | Entidade ou camada indicada |
|---|---|
| Exposição de capacidades do core | API Edge |
| Tradução para linguagem mais uniforme de negócio | API Business |
| Execução de processos pesados | API registrada como API Badge |
| Entrada síncrona para capacidades locais | PIHETS, conforme transcrição |
| Disponibilização da funcionalidade local | API de convivência |
| Implantação da API de convivência | País |
| Escolha dos servidores locais da API de convivência | País |
| Publicação de eventos | Core, banco, sistemas locais e outros ativos, conforme o caso |
| Consumo de eventos | Sistemas ou componentes inscritos nos tópicos |
| Identidade nas conexões com broker | Azure AD corporativo global |
| Broker de eventos | Serviço da Confluent |
| Observabilidade nos casos citados | Dynatrace |
| Automação de infraestrutura | Terraform e arquétipos citados |

Não foram apresentadas estruturas formais de Product Manager, Product Owner, Scrum Master, FinOps, governança de portfólio, segurança, arquitetura corporativa ou gestão de produto. Portanto, não é possível inferir um modelo organizacional completo.

---

## 16. Perguntas e respostas

## 16.1 Pergunta: uso de API Business para integração de pagamentos

### Contexto da pergunta

Um participante da República Dominicana explicou que utiliza uma instalação com “SIMS del 2022”, sem Neutron, mas com Tron Web.

O cenário descrito envolve uma passarela de pagamento:

- o sistema cobra a partir do Tron;
- a integração sai para um autorizador externo;
- foi desenvolvida uma API Business;
- essa API se conecta ao autorizador;
- a chamada é consumida a partir do Tron;
- a integração suporta pagamentos recorrentes e pagamentos únicos.

O participante perguntou se é correto consumir, desde o Tron, uma API Business que realiza o acesso ao sistema externo.

### Resposta recebida

A resposta não avaliou explicitamente se a implementação atual está correta ou incorreta. Em vez disso, explicou a arquitetura futura do RIF:

- no RIF haveria front-ends web com fluxos web;
- esses fluxos passariam por uma camada de servidor;
- nessa camada seria possível criar extensões;
- essas extensões poderiam realizar integrações com as APIs necessárias.

### O que a resposta esclarece

A resposta indica que, no modelo futuro apresentado, integrações com serviços externos devem ser feitas em uma camada de backend Java ou servidor, anterior ao banco de dados.

Ela não confirma formalmente que a implementação atual no Tron Web usando API Business é aprovada, nem descreve uma estratégia de migração para a República Dominicana.

---

## 16.2 Pergunta: futuro de UTL_FILE e UTL_HTTP

### Contexto da pergunta

O participante afirmou utilizar intensamente:

- `UTL_FILE`;
- `UTL_HTTP`;
- leitura de XML — reconhecido como “KML” na transcrição, provavelmente com erro;
- leitura e envio de JSON.

A pergunta foi se, caso essas bibliotecas deixem de ser utilizadas diretamente a partir do banco de dados, haveria alternativas.

### Resposta sobre UTL_FILE

Foi explicado que, no Tron Web, o `UTL_FILE` é tratado por meio de um pacote registrado como **Ternecalis**.

Esse pacote teria sobrecarga de métodos para evitar o uso direto do sistema de arquivos da máquina do banco de dados. Em vez disso, a informação seria gravada em uma tabela temporária e os arquivos seriam construídos a partir dessa estrutura.

Também foi dito que, no futuro, tarefas que geram arquivos deveriam preferencialmente ser implementadas em Java, fora da base de dados.

### Resposta sobre UTL_HTTP

A resposta indicou que, dependendo da necessidade de integração, existem camadas na arquitetura onde extensões podem ser feitas.

Foi mencionado um backend Java anterior à base de dados, onde poderiam ser implementadas integrações com os serviços desejados.

### O que a resposta esclarece

A direção arquitetural apresentada é:

```text
Geração de arquivos:
Banco de dados / UTL_FILE
    ↓
Tabelas temporárias e abstrações existentes
    ↓
Evolução desejada para tarefas Java externas ao banco

Chamadas HTTP externas:
Banco de dados / UTL_HTTP
    ↓
Camada de backend Java
    ↓
Integrações externas por extensões nessa camada
```

A resposta não forneceu:

- cronograma de remoção ou descontinuação de UTL_FILE e UTL_HTTP;
- compatibilidade por versão;
- mecanismo de migração;
- APIs específicas;
- critérios para decidir quando permanecer no banco;
- exemplos de código ou padrões de implementação.

---

## 17. Roadmap e iniciativas futuras

A reunião citou alguns direcionamentos futuros, sem detalhamento completo de prazo.

| Iniciativa | Situação ou horizonte citado |
|---|---|
| Evolução de tarefas de banco para Java | Direção desejada para o futuro |
| Emissão de eventos pelo Tron | Disponível desde a versão 23.01, segundo a reunião |
| Sincronização de clientes para RIF de Vida | Próxima de produção, segundo a fala |
| CELFOS TRM | Iniciativa em andamento |
| Sistema de prestações de saúde na Espanha | Final do ano e próximo ano |
| Uso de EDA em saúde | Arquitetura de referência em domínios e comunicação entre domínios |
| Autosserviço de fornecedores | Primeiro autosserviço citado como usuário da tecnologia de eventos |
| Novo sistema de inadimplência | Construído já integrado à plataforma de eventos |

Não foram apresentados:

- marcos formais;
- responsáveis;
- dependências;
- orçamento;
- riscos de cronograma;
- critérios de sucesso;
- datas absolutas.

---

## 18. Números e indicadores citados

| Indicador | Valor mencionado | Contexto |
|---|---:|---|
| Serviços no catálogo da API Edge | Mais de 500 | Serviços expostos pela API Edge |
| Versão com capacidade citada de emissão de eventos | 23.01 | Emissão de eventos desde a base por serviços do Tron |
| Tempo restante da apresentação de reporting/cloud | Cerca de 10 minutos | Comentário operacional durante a reunião |
| Número de perguntas principais no encerramento | Ao menos 1 participante com duas perguntas | Pergunta sobre integração de pagamento e uso de UTL_FILE/UTL_HTTP |

Os números foram registrados conforme declarados na reunião e não foram validados externamente.

---

## 19. Riscos e desafios

## 19.1 Riscos explicitamente mencionados

### Dependência de variáveis globais em sessões desconectadas

O uso de pools de conexão e reinicialização de sessões torna inadequada a dependência de variáveis globais de pacote para manter estado.

### Bloqueios no banco de dados

Chamadas a serviços externos a partir de processos de banco podem gerar bloqueios ou problemas operacionais. A apresentação afirmou que esse tipo de chamada não é recomendado.

### Propagação de latência em integrações síncronas

Em integrações por API, um serviço lento pode aumentar o tempo de resposta de todo o fluxo que o invoca. Foi dado o exemplo de uma chamada que, em vez de um segundo, demora 60 segundos.

### Complexidade do tratamento de erros em eventos

Embora eventos tragam desacoplamento, os consumidores precisam prever casos positivos e negativos. Isso aumenta a responsabilidade de projeto e tratamento de falhas.

---

## 19.2 Desafios derivados do contexto

> **Esta seção é analítica. Os pontos abaixo são implicações possíveis do que foi apresentado, não afirmações literais dos participantes.**

### Governança de contratos

A coexistência de API Edge, API Business, APIs de convivência e eventos exige controle rigoroso de contratos, versões e responsabilidades. A transcrição afirma que há normativa corporativa para APIs, mas não detalha o ciclo de governança.

### Migração de lógica de banco para Java

A evolução de tarefas PL/SQL para Java pode exigir revisão de processos existentes, testes de equivalência funcional, desenho de observabilidade e planejamento de implantação. A reunião apresentou a direção, mas não descreveu o processo de migração.

### Operação distribuída

A presença de ambientes locais, cloud, APIs, broker de eventos, Control-M, bancos Oracle, serviços serverless e documentais sugere um cenário operacional distribuído. Isso tende a exigir clareza sobre suporte, ownership, monitoramento e tratamento de incidentes, pontos que não foram detalhados.

### Consistência e reprocessamento de eventos

Como eventos podem ser consumidos de modo assíncrono e por múltiplos sistemas, a plataforma possivelmente precisa tratar duplicidade, reprocessamento, consistência eventual e falhas de consumidores. A reunião não confirma quais mecanismos foram adotados.

---

## 20. Transformações estruturais identificadas

## 20.1 Transformação arquitetural: de integração direta para camadas e eventos

A reunião mostra uma direção de evolução em que integrações deixam de depender exclusivamente de acesso direto ao core ou de chamadas síncronas ponto a ponto.

```text
Integração direta e lógica centralizada
    ↓
APIs para exposição controlada de capacidades
    ↓
Eventos para comunicação de fatos e pós-processamentos desacoplados
```

Essa leitura é sustentada pela diferenciação explícita entre APIs, API Business, APIs de convivência e broker de eventos.

---

## 20.2 Transformação de execução: banco de dados para componentes Java

A evolução de tarefas tradicionalmente implementadas em PL/SQL para Java foi apresentada como forma de reduzir carga no banco e evitar problemas associados a chamadas externas realizadas no contexto do banco de dados.

Não se trata, pelo conteúdo apresentado, de eliminação completa de PL/SQL: a plataforma ainda reconhece que grande parte da lógica de negócio está nas bases de dados das instalações Tron.

---

## 20.3 Transformação operacional: infraestrutura automatizada

Os exemplos em cloud destacam:

- Terraform;
- arquétipos;
- infraestrutura como código;
- automação de implantação;
- observabilidade com Dynatrace.

> **Leitura analítica:** a direção parece ser de padronização e repetibilidade da implantação entre regiões e ambientes. No entanto, a reunião não detalha pipelines de CI/CD, política de mudanças ou governança de infraestrutura.

---

## 20.4 Transformação de integração: de cargas periódicas para atualização orientada a eventos

Nos casos de Ficha Cliente 360 e CELFOS TRM, a integração por eventos foi apresentada como mecanismo para reduzir a dependência de processos batch e disponibilizar informação mais rapidamente após mudanças no sistema de origem.

---

## 21. O que a reunião não permite concluir

A apresentação fornece uma visão arquitetural relevante, mas não permite afirmar com segurança diversos detalhes que seriam essenciais para documentação técnica completa.

### Tecnologia e infraestrutura

Não foram detalhados:

- desenho completo de rede;
- conectividade entre países, ambientes locais e cloud;
- modelo de alta disponibilidade;
- RTO e RPO;
- disaster recovery além das localidades mencionadas;
- estratégia de backup;
- modelo de tenancy;
- topologia dos clusters ou serviços;
- configuração de WebLogic;
- modelo de banco Oracle;
- política de patching;
- custos ou FinOps.

### Segurança

Não foram detalhados:

- IAM além de OAuth e Azure AD para eventos;
- autorização por API;
- autorização por tópico;
- gestão de segredos;
- certificados;
- criptografia em trânsito e em repouso;
- auditoria de acessos;
- segregação de funções;
- gestão de vulnerabilidades;
- requisitos regulatórios ou de privacidade.

### Eventos

Não foram detalhados:

- formato dos eventos;
- esquema de mensagens;
- versionamento de eventos;
- garantia de entrega;
- ordenação;
- retenção;
- replay;
- idempotência;
- tratamento de duplicidade;
- dead-letter queues;
- monitoramento de consumidores;
- políticas de retry.

### APIs

Não foram detalhados:

- mecanismo de autenticação e autorização;
- API gateway;
- versionamento;
- rate limiting;
- SLA;
- catálogo técnico;
- documentação OpenAPI;
- política de descontinuação;
- governança de contratos;
- modelo de testes.

### Organização e produto

Não foram detalhados:

- responsáveis por cada domínio;
- modelo de Product Management;
- times estáveis;
- backlog;
- cadência de entrega;
- priorização;
- roadmap formal;
- orçamento;
- modelo de suporte;
- matriz de responsabilidades entre plataforma e países.

---

## 22. Conclusões

A reunião apresentou uma plataforma em evolução, orientada a tornar o core Tron mais integrável, menos acoplado aos sistemas locais e mais preparado para cenários distribuídos entre países e ambientes cloud.

Os principais direcionamentos foram:

1. **Expor capacidades do core por APIs**, separando uma camada próxima ao Tron — API Edge — de uma camada mais uniforme de negócio — API Business.
2. **Estabelecer APIs de convivência sob responsabilidade local**, permitindo integrar a plataforma aos sistemas específicos de cada país.
3. **Adotar eventos para comunicar fatos de negócio já ocorridos**, desacoplando pós-processamentos e reduzindo impacto de consumidores lentos ou indisponíveis no fluxo originador.
4. **Migrar seletivamente processos pesados e integrações externas para Java**, reduzindo dependência de execução no banco de dados.
5. **Expandir capacidades documentais**, com módulos configuráveis para geração, entrada, distribuição, administração e visualização de documentos.
6. **Padronizar implantações em cloud**, usando infraestrutura como código e observabilidade, com exemplos no Panamá e no produto de vida relacionado ao Uruguai.
7. **Manter APIs e eventos como mecanismos complementares**, e não concorrentes: APIs para executar ações; eventos para propagar fatos.

A apresentação também deixou claro que a transformação não está completamente concluída. Persistem lógicas no banco, integrações locais específicas, dependências por país e iniciativas em andamento. O conteúdo indica uma direção de modernização progressiva, mas não fornece elementos suficientes para afirmar a arquitetura final, os cronogramas definitivos ou o modelo operacional completo.
