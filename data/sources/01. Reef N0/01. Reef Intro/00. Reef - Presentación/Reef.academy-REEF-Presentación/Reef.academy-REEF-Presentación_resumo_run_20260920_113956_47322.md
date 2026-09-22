# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.academy-REEF-Presentación.mp4`
**Data de processamento:** 20/09/2026 11:44:24
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada — Apresentação da plataforma RIF

## 1. Síntese executiva

A sessão apresentou a **RIF**, descrita como uma plataforma aberta de seguros da MAPFRE, orientada à oferta de capacidades como serviço. A transcrição explica que a iniciativa nasce como resposta às limitações observadas na distribuição histórica do sistema **TRON** — também referido como “TRON 2000”, “TRON Web” e, em alguns trechos, “New TRON”.

O problema central apresentado é a existência de múltiplas cópias descentralizadas do sistema nos países. Essas cópias podem possuir diferentes versões, customizações locais e alterações inclusive em componentes considerados de núcleo. Isso dificulta atualização, suporte, governança, reutilização de funcionalidades, tratamento de obsolescência e controle de segurança.

A RIF busca mudar esse modelo ao concentrar capacidades de seguros em uma plataforma administrada, baseada em um core TRON hospedado e operado de forma centralizada. A plataforma combina esse core com serviços globais, microserviços, componentes de integração, geração e gestão documental, mecanismos de precificação e subscrição, marketplace de soluções e um modelo formal de governança.

A principal mensagem da reunião é que a RIF não deve ser entendida apenas como uma nova instalação de TRON. Ela é apresentada como um ecossistema de capacidades reutilizáveis, integráveis por APIs e gestão de eventos, que pode ser consumido integralmente por meio de uma instância RIF ou parcialmente por países que precisem apenas de componentes específicos.

---

## 2. Escopo, participantes e natureza da sessão

A reunião ocorreu no contexto da **Rift Academy**, nome registrado dessa forma na transcrição. O termo pode corresponder à iniciativa de disseminação de conhecimento relacionada à RIF, mas a transcrição não detalha formalmente sua estrutura, responsáveis ou periodicidade.

A apresentação foi conduzida principalmente por:

- **José de Abreu**, apresentado como diretor-geral de implementações dentro de soluções tecnológicas na ACT;
- **Pilar**, responsável pela exposição do modelo de governança, catálogo de serviços, organização das equipes e marketplace;
- **Marcelo**, citado como possível apoio para o tema de RIF Vida, embora não tenha desenvolvido uma explicação extensa no trecho transcrito.

Houve participantes de diferentes países, incluindo referências a Madrid, Guatemala, Puerto Rico, Chile, Uruguai, Panamá e República Dominicana. A sessão teve caráter de divulgação e alinhamento, com espaço para perguntas ao final.

> **Rastreabilidade:** a transcrição não contém timestamps ou numeração de linhas. Assim, os fatos abaixo são rastreáveis por blocos temáticos e falas, mas não por posição temporal precisa.

---

## 3. Contexto e antecedentes

### 3.1. Evolução mencionada do sistema TRON

A apresentação posiciona a RIF como parte de uma evolução que parte do sistema TRON. Foram mencionadas diferentes denominações ou etapas:

- TRON;
- “TRON 2000”;
- TRON Web;
- “New TRON”;
- core da RIF.

A transcrição não permite determinar se essas denominações representam versões formais, produtos distintos, fases evolutivas ou apenas modos de se referir à trajetória do mesmo sistema.

### 3.2. Modelo histórico de distribuição

O cenário anterior foi descrito como fortemente descentralizado:

1. Uma cópia do software era enviada aos países.
2. Cada país fazia sua própria instalação.
3. O pacote local podia ser alterado.
4. Em alguns casos, alterações ocorriam até em partes consideradas de núcleo.
5. A atualização de versões dependia das prioridades, capacidades e necessidades de cada país.

Segundo a apresentação, esse modelo levou à existência de muitas versões e variantes instaladas. Foi mencionada a existência de **23 cópias do programa**, embora não tenha sido detalhado se esse número corresponde a países, instalações, ambientes ou outra unidade operacional.

Também foi citado que Filipinas já havia saído da MAPFRE, mas ainda mantinha suporte relacionado ao TRON.

### 3.3. Origem estratégica da RIF

A RIF foi apresentada como uma iniciativa recente, nascida no plano estratégico de **2022–2024**. A reunião a posiciona como um objetivo estratégico desse período.

A sigla foi explicada como derivada de:

> **MAPFRE Open Insurers Platform**

A formulação em inglês foi traduzida na apresentação como uma plataforma aberta de seguros para a MAPFRE.

---

## 4. Problemas identificados

## 4.1. Descentralização das instalações

O primeiro problema descrito é a descentralização das instalações de TRON. Em vez de uma plataforma centralmente administrada, existiriam diversas cópias locais do software.

### Consequências apresentadas

- Dificuldade para manter uma visão uniforme do sistema;
- diferenças de versão entre países;
- maior esforço de suporte;
- dificuldade para atualizar capacidades de maneira coordenada;
- menor capacidade de reutilização entre operações.

A reunião relaciona esse problema ao fato de o núcleo corporativo precisar lidar com múltiplas instalações independentes.

---

## 4.2. Dispersão causada por alterações locais

A apresentação utiliza o conceito de **dispersão** para se referir, especialmente, às alterações feitas em partes do núcleo do sistema.

Segundo a explicação, a possibilidade de modificar o software localmente produziu divergências entre as instalações. Isso reduz a previsibilidade de comportamento entre países e torna mais difícil transferir funcionalidades de uma operação para outra.

### Relação de causa e efeito reconstruída

```text
Instalações locais alteráveis
↓
Customizações e mudanças no núcleo
↓
Dispersão entre versões e comportamentos
↓
Maior dificuldade de atualização, suporte e reutilização
↓
Necessidade de uma plataforma mais governada
```

Essa cadeia é uma reconstrução analítica baseada nas falas da apresentação; não foi exibida literalmente como diagrama.

---

## 4.3. Atualizações lentas e heterogêneas

A atualização de TRON foi descrita como dependente das condições de cada país: necessidades locais, disponibilidade de tempo e capacidade de implantação.

A consequência é que nem todos os países estariam na mesma versão ou receberiam melhorias no mesmo ritmo. Foram citadas versões muito antigas e versões recentes, com menção específica ao México como uma instalação recente.

---

## 4.4. Reutilização insuficiente

Apesar de TRON ser percebido como um sistema comum entre os países, a forma de distribuição não permitiria reutilizar capacidades com a velocidade desejada.

Foram citados como exemplos de ativos potencialmente reutilizáveis:

- produtos de seguros;
- soluções para clientes;
- autosserviços;
- “portais” ou termo similar — a transcrição registra “potambai”, provavelmente afetada por reconhecimento de voz;
- automações de tarefas;
- conectividade com ecossistemas externos.

A ideia central é que uma funcionalidade construída com investimento de um país deveria poder ser aproveitada por outros, sem exigir uma reconstrução integral.

---

## 4.5. Obsolescência e segurança

A reunião associa a existência de 23 cópias do sistema à multiplicação de riscos de:

- obsolescência;
- segurança;
- suporte técnico;
- atualização de componentes.

Não foram detalhadas vulnerabilidades específicas, incidentes reais, tecnologias de segurança ou métricas de risco. Portanto, não é possível concluir quais controles técnicos concretos já existem ou serão adotados.

---

## 4.6. Necessidade de conectividade

Outro problema ou necessidade recorrente é a capacidade de conectar o core de seguros a outros sistemas e ecossistemas.

A apresentação defende que o core precisa ser “aberto” e conectável. Essa necessidade fundamenta a ênfase em APIs e gestor de eventos, bem como a rejeição explícita a integrações por database link.

---

## 5. Solução apresentada: RIF como plataforma de seguros como serviço

A RIF foi apresentada como uma plataforma que centraliza capacidades de seguros e as disponibiliza como serviço.

A proposta não é apenas hospedar o TRON em um ambiente central. Ela busca combinar:

- um core de seguros;
- serviços globais;
- componentes satélites;
- microserviços;
- integrações;
- mecanismos de governança;
- capacidades reutilizáveis disponibilizadas via marketplace.

A formulação conceitual apresentada pode ser resumida da seguinte forma:

```text
Capacidades de seguros administradas centralmente
↓
Disponibilização como serviços e APIs
↓
Uso por diferentes países, operações ou sistemas
↓
Maior reutilização, padronização e governança
```

A apresentação compara conceitualmente a lógica de serviço da RIF a soluções que já nascem nessa modalidade, citando SAP como exemplo. Não foram informados produtos SAP específicos, nem foi apresentada qualquer relação tecnológica direta entre SAP e RIF.

---

## 6. Arquitetura lógica e funcionamento

## 6.1. Visão consolidada da arquitetura

A apresentação exibiu diagramas, mas a transcrição não preserva os elementos visuais completos. Com base nas explicações verbais, a arquitetura lógica pode ser reconstruída da seguinte forma:

```text
Canais e sistemas locais
├── Portais de agentes
├── Cotizadores / emissores web
├── Sistemas administrativos e contábeis
├── Sistemas locais existentes
└── Consumidores de APIs e eventos
            ↓
Camada de integração
├── APIs
├── Web services
└── Gestor de eventos
            ↓
Plataforma RIF
├── Core TRON / serviços de API / frontal associado
├── Produtos e processos de seguros
├── Cotização e emissão
├── Subscrição de risco
├── Precificação
├── Gestão documental
├── Produção de documentos
├── Dados de cliente
├── BPM
└── Marketplace funcional
            ↓
Integrações com sistemas locais e externos
```

> **Nota de fidelidade:** esse desenho é uma consolidação analítica da explicação oral. Não corresponde necessariamente ao diagrama visual original nem permite inferir tecnologias de infraestrutura, bancos de dados, rede, cloud ou mecanismos de autenticação.

---

## 6.2. Core da RIF

O core da RIF foi descrito como o TRON colocado em nuvem e administrado centralmente.

Nesse núcleo estariam implementados:

- configuração de produtos;
- processos de emissão;
- sinistros comuns;
- tesouraria.

A apresentação chama esse conjunto de “núcleo da RIF”.

Não foram detalhados:

- o provedor de nuvem;
- a topologia do ambiente;
- o banco de dados;
- a estratégia de alta disponibilidade;
- mecanismos de backup;
- recuperação de desastre;
- CI/CD;
- tecnologias de containerização;
- modelo de identidade e acesso.

---

## 6.3. Serviços globais e componentes complementares

Além do core, foram mencionados serviços globais e componentes de apoio, tais como:

- autosserviços;
- cotizadores;
- emissores;
- gestão documental;
- BPM;
- motores de regras;
- gestor de eventos;
- dados de clientes;
- microserviços de cotização;
- microserviços de subscrição de risco;
- componentes disponibilizados por marketplace.

O ecossistema foi descrito como evolutivo, isto é, não estático. Novas soluções poderiam ser incorporadas progressivamente.

---

## 6.4. Múltiplas instâncias da RIF

Um ponto importante esclarecido durante a reunião é que RIF não significa necessariamente uma única instância global.

A apresentação afirmou explicitamente que podem existir múltiplas instâncias, definidas de acordo com fatores como:

- volumetria de negócio;
- região de operação;
- necessidades operacionais.

Foram citadas duas instâncias existentes no momento da apresentação:

| Instância | Situação apresentada |
|---|---|
| América Central | Em uso no Panamá |
| RIF Vida | Prevista para operar com Uruguai a partir de novembro |

A transcrição não permite determinar o ano exato desse “novembro”, embora o contexto indique que a apresentação discutia planos anuais associados a 2024 e anos posteriores.

---

## 7. Componentes mencionados

## 7.1. DOPE — Dynamic Underwriting and Pricing

O componente foi apresentado como **DOPE**, sigla explicada como *Dynamic Underwriting and Pricing*.

### Finalidade descrita

- Introduzir correções em tarifas;
- aplicar regras de negócio;
- evitar descontos excessivos;
- apoiar cálculo relacionado à subscrição.

A transcrição sugere que esse componente já estava sendo usado no contexto de Vida.

### Limitações de informação

Não foram detalhados:

- regras específicas;
- algoritmos de precificação;
- modelo de governança de tarifas;
- fontes de dados;
- responsáveis pela aprovação de ajustes;
- integração técnica detalhada com o core.

---

## 7.2. Cotizador

O cotizador foi descrito como um frontal web conectado aos serviços necessários para realizar cotações.

Durante as perguntas, foi esclarecido que o cotizador foi pensado para operar de forma “standalone”, com tarifas carregadas conforme o produto e utilização de componentes independentes, como o RTE.

### Capacidade indicada

O cotizador pode ser utilizado como componente isolado em determinados cenários, por meio de APIs, recebendo elementos necessários à cotação e retornando o caso completo.

### Ressalva importante

A reunião deixou claro que isso não significa que uma instalação local de TRON possa ser “automaticamente” conectada à RIF apenas por receber uma atualização ou nivelamento técnico.

A compatibilidade depende da solução e das customizações existentes. O palestrante foi explícito ao afirmar que esse processo “não é tão mágico”.

---

## 7.3. OpenText Documentum

A transcrição registra “Open Test Documentum”, mas o termo provavelmente se refere a **OpenText Documentum**. Como a reunião não confirma formalmente a grafia, esse deve ser tratado como interpretação contextual de alta confiança.

### Papel descrito

- Gestão documental;
- armazenamento de informações associadas a documentos;
- suporte ao “mapa documental”;
- integração com o core da RIF;
- tratamento de documentos produzidos pela plataforma e recebidos dos negócios.

Não foram detalhados requisitos de retenção, classificação documental, busca, segurança documental ou políticas de acesso.

---

## 7.4. FIS

O FIS foi apresentado como a ferramenta de geração de documentos.

### Exemplos de documentos mencionados

- formulários;
- condições particulares;
- contratos;
- faturas.

A transcrição não explica o significado da sigla FIS, nem especifica o fornecedor, linguagem de templates, processos de aprovação, mecanismos de assinatura ou canais de entrega dos documentos.

---

## 7.5. RTE — Rate Engine

O RTE, ou *Rate Engine*, foi descrito como um microserviço de cálculo independente do processo de Oracle.

### Finalidade

- Executar cálculos fora do core;
- atender diferentes conectores e cotizadores;
- separar a capacidade de cálculo da dependência direta do processo central.

A expressão “processo de Oracle” aparece na transcrição, mas não fica claro se se refere a um produto Oracle, banco de dados, motor específico ou componente interno associado a Oracle.

---

## 7.6. Gestor de eventos

O gestor de eventos foi apresentado como peça importante da arquitetura de integração.

### Objetivos atribuídos

- Facilitar integração entre sistemas externos e internos à RIF;
- permitir comunicação entre módulos;
- promover desacoplamento;
- apoiar uso de funcionalidades que dependam de eventos, como a ficha de clientes 360.

Em resposta a uma pergunta, foi explicado que, quando um sistema publica eventos como “novo cliente” ou “modificação de cliente”, a ficha 360 pode consumir esses eventos.

A tecnologia de mensageria, protocolo de eventos, modelo de entrega, retenção, ordenação, segurança e tratamento de falhas não foram informados.

---

## 7.7. BPM

O BPM foi mencionado como capacidade que se pretende conectar à solução RIF, especialmente no roadmap da América Central.

A transcrição também registra que “o BPM é o DIN”, mas a expressão pode conter erro de reconhecimento ou ser uma sigla interna não explicada. Não é possível afirmar com segurança qual produto, ferramenta ou plataforma está por trás desse BPM.

---

## 7.8. Ficha de clientes 360

A ficha de clientes 360 foi mencionada como capacidade que poderia ser conectada à RIF e consumida por países mesmo sem adoção completa do core RIF.

Segundo a explicação:

1. O sistema publica eventos, como criação ou modificação de cliente;
2. a ficha 360 consome esses eventos;
3. a funcionalidade pode ser usada como componente integrado.

Não foram detalhadas quais informações são exibidas na ficha, quais sistemas são fontes de dados, nem quais controles de privacidade ou proteção de dados são aplicados.

---

## 7.9. Módulo de impagos

O módulo de gestão de impagos foi mencionado como uma nova funcionalidade que seria conectada nativamente à RIF e como solução potencialmente consumível via marketplace.

A transcrição não apresenta fluxos operacionais, integrações financeiras, regras de cobrança ou estado de maturidade desse módulo.

---

## 8. Modelo de integração

## 8.1. APIs e gestor de eventos como padrão

A apresentação foi explícita ao defender que as integrações devem ocorrer:

- por APIs;
- por gestor de eventos;
- por web services em alguns cenários descritos.

No caso da integração com sistemas locais, foi afirmado que não devem existir:

- database links;
- outras conexões não declaradas.

A intenção declarada é preservar o isolamento do módulo RIF e tornar as integrações explícitas e controladas.

### Princípio arquitetural extraído

```text
Integrações explícitas por API/eventos
↓
Menor acoplamento direto entre bancos e aplicações
↓
Maior isolamento do core RIF
↓
Maior governabilidade das conexões
```

Essa formulação é uma leitura analítica sustentada pela apresentação.

---

## 8.2. Integração com o Uruguai

No caso de RIF Vida para Uruguai, foram mencionadas integrações com:

- sincronização de terceiros;
- sistemas administrativos e contábeis;
- portal de agentes;
- S400;
- serviços para sincronização de cobranças;
- consultas;
- ordens de pagamento;
- outros web services não detalhados.

A referência a **S400** aparece dessa forma na transcrição. Não é possível determinar com segurança se se trata de IBM AS/400, de um sistema chamado S400 ou de outra denominação.

---

## 8.3. Integração com América Central e Panamá

A instância da América Central, já em uso no Panamá, teria diversas integrações locais, algumas descritas como complexas.

Foram citados:

- gestão documental;
- produção e armazenamento de documentos;
- conexão com gestor de eventos;
- integrações com sistema local;
- APIs de convivência;
- produto corporativo de automóvel.

A expressão “APIs de convivencia” foi usada no discurso. O sentido provável é a coexistência entre RIF e sistemas locais, mas a transcrição não detalha a definição formal do conceito.

---

## 9. Modelo operacional

## 9.1. Operação centralizada e responsabilidades distribuídas

A plataforma exige um modelo operacional capaz de garantir que cada serviço funcione de forma coerente.

A governança deve documentar procedimentos relacionados a:

- operação dos serviços;
- versionamento de software;
- regularização de dados;
- gestão de incidentes;
- gestão de evolutivos;
- releases;
- patches;
- hotfixes;
- catalogação de ativos no marketplace;
- instalação de versões;
- suporte;
- integração com sistemas locais.

A apresentação não detalha fluxos específicos de aprovação, ferramentas utilizadas, janelas de manutenção, tempos de atendimento ou escalonamentos.

---

## 9.2. Suporte

Foram citados diferentes níveis e domínios de suporte:

- suporte funcional de nível 1 e nível 2 local ou regional;
- suporte funcional corporativo ao core;
- suporte ao software de produto;
- suporte relacionado à operação e exploração da plataforma.

A distribuição precisa de responsabilidades entre país, região e unidade corporativa é apresentada como elemento essencial, mas a transcrição não fornece a matriz completa.

---

## 9.3. Observabilidade e monitoramento

A apresentação menciona ferramentas de observabilidade e monitoramento como parte do catálogo operacional.

No entanto, não foram identificadas:

- ferramentas específicas;
- métricas monitoradas;
- níveis de alerta;
- painéis;
- SLIs ou SLOs;
- políticas de retenção de logs;
- processos de resposta a incidentes.

---

## 9.4. Controle de dispersão

O controle de dispersão é apresentado como preocupação operacional relevante. Uma pergunta citada foi:

> “Quanto de longe ou de perto estamos das últimas versões de núcleo?”

Isso evidencia a intenção de acompanhar a distância entre uma instalação e a versão mais recente do core.

A transcrição não estabelece um índice, métrica, política de atualização obrigatória ou critério de aceitação de divergências.

---

## 9.5. Segurança e desastre

Foram mencionados “controle de segurança” e “desastre”, mas a expressão seguinte foi reconhecida de forma imprecisa como “COVID-19”, provavelmente decorrente de erro de transcrição.

Não é possível afirmar se a apresentação tratava de recuperação de desastre, continuidade de negócio, um plano específico ou outro procedimento.

---

## 10. Governança

## 10.1. Motivações do modelo de governança

Pilar apresentou cinco motivações principais para a governança da RIF:

1. Garantir a operação dos serviços;
2. estabelecer e registrar procedimentos;
3. controlar e otimizar custos;
4. ampliar progressivamente a cobertura funcional;
5. deixar claras as responsabilidades entre corporativo, países e regiões.

---

## 10.2. Gestão de custos e FinOps

A apresentação menciona FinOps como parte do modelo de governança.

O objetivo descrito é conhecer o custo dos componentes da RIF, acompanhar seu consumo e manter esses custos sob controle e ajustados às necessidades reais.

### Implicação analítica

A menção a FinOps indica que a plataforma não é tratada apenas como ativo tecnológico. Ela também é vista como serviço cujo uso precisa ser economicamente acompanhado e governado.

Não foram apresentados:

- modelo de cobrança;
- critérios de rateio;
- preços;
- métricas de consumo;
- orçamento;
- responsável formal por aprovações financeiras.

---

## 10.3. Cobertura funcional

A governança também deve assegurar a expansão gradual da cobertura de negócio da RIF.

Foram citadas áreas de crescimento como:

- Vida;
- sistema de impagos;
- autosserviço.

A ideia é que a plataforma se torne progressivamente mais útil e abrangente para as necessidades de negócio.

---

## 10.4. RIF Manager e RIF Consig

A estrutura de governança mencionada inclui:

| Elemento | Papel descrito |
|---|---|
| RIF Manager | Responsável geral pela RIF; José de Abreu foi citado nessa posição |
| RIF Consig | Órgão máximo de governança da RIF, conforme a apresentação |

O nome “RIF Consig” foi transcrito dessa forma. Pode haver erro de reconhecimento em relação à denominação oficial.

### Responsabilidades atribuídas ao RIF Consig

- Definir visão;
- definir estratégia;
- definir roadmap;
- orientar expansão por países;
- estabelecer objetivos;
- definir “key results”;
- estabelecer políticas;
- promover boas práticas;
- garantir boa operação da plataforma.

A palestra associa esses “key results” ao conceito de OKRs, embora a transcrição registre “OCRs” em determinado momento.

---

## 11. Organização das equipes e modelo de produto

## 11.1. Organização orientada a produto

A RIF foi apresentada como uma mudança na forma de trabalho: uma organização orientada a produto.

Nesse modelo, “produto” corresponde às capacidades ofertadas na plataforma, como:

- produto de gestão documental;
- produto de APIs;
- produto de Vida;
- outras capacidades funcionais ou técnicas.

Os times são descritos como:

- estáveis;
- autônomos;
- multidisciplinares;
- multinacionais;
- responsáveis por produtos.

---

## 11.2. Comunidades transversais

Além dos times de produto, foram citadas comunidades que apoiam transversalmente os produtos:

- transformação;
- arquitetura;
- segurança;
- infraestrutura;
- FinOps;
- cloud.

A apresentação sugere que essas comunidades trabalham conjuntamente com os times de produto. Não foi detalhado se possuem autoridade decisória, papel consultivo ou responsabilidade operacional direta.

---

## 11.3. Papéis de produto

Foram citados:

- Product Manager;
- Product Owner;
- Scrum Master;
- área de negócio envolvida na criação e evolução do produto.

A transcrição registra “una hernau” ao se referir a uma figura ligada a produto, provavelmente por erro de reconhecimento. Não é possível identificar qual papel adicional estava sendo mencionado.

---

## 11.4. Backlog, sprints e entregas

O funcionamento descrito inclui:

- backlog comum;
- visão compartilhada do trabalho;
- planejamento de curto prazo;
- entregas contínuas;
- sprints de aproximadamente três semanas;
- eventos diários;
- retrospectivas ao final dos sprints.

O objetivo declarado é concentrar esforços na entrega de valor por meio de produtos.

---

## 12. Indicadores e números citados

Os números abaixo foram declarados durante a reunião. Não há evidência de auditoria externa, período completo de apuração ou definições formais de cada métrica.

| Indicador | Valor mencionado | Contexto |
|---|---:|---|
| Cópias do programa TRON | 23 | Referência ao desafio de suporte, atualização, segurança e obsolescência |
| Período do plano estratégico | 2022–2024 | Período em que a RIF teria surgido como objetivo estratégico |
| Tempo de trabalho orientado a produto | De dezembro de 2021 até 3 de outubro, “quase dois anos” | Contexto da evolução do modelo de equipes |
| Equipes, comunidades e suporte | 16 | Estrutura apresentada no momento da medição |
| Pessoas com tarefas atribuídas | Cerca de 59 | Equipe envolvida |
| Épicos | 169 | Volume de trabalho mencionado |
| Compromissos estratégicos | 27 | Compromissos do período |
| Compromissos estratégicos a resolver no restante do ano | 13 | Meta mencionada |
| Histórias de usuário concluídas | Cerca de 1.800 | Trabalho acumulado |
| Pilotos de equipes orientadas a produto | 4 | Experiências mencionadas |
| Story points médios por sprint | 680 | Indicador declarado |
| Story points realizados por sprint | Cerca de 420 | Indicador declarado |
| Soluções no marketplace | 22 | Quantidade disponível naquele momento |
| Novas soluções esperadas até o fim do ano | 5 ou 6 | Objetivo do marketplace |
| Crescimento esperado de soluções no ano | 20 | Meta mencionada em outro trecho |
| Instâncias RIF citadas | 2 | América Central e Vida/Uruguai |
| Países planejados na América Central | 6 | Honduras, Nicarágua, Costa Rica, El Salvador, Guatemala e Panamá |
| Produtos previstos para América Central | 10 | Planejamento para os próximos quatro anos |
| Economia recorrente estimada | Cerca de € 1,2 milhão | Associada ao descomissionamento de sistemas até 2028 |
| Duração aproximada dos sprints | 3 semanas | Modelo de trabalho |
| Publicação de notícias do marketplace | A cada duas semanas | Comunicação interna sobre evolução das soluções |

### Observação sobre inconsistências aparentes

A apresentação menciona 22 soluções no marketplace, intenção de adicionar 5 ou 6 até o fim do ano e, em outro trecho, crescimento de 20 soluções no ano. Esses números podem ser compatíveis se o crescimento de 20 representar o total anual e as 5 ou 6 forem as restantes para atingir a meta, mas a transcrição não permite confirmar isso com precisão.

---

## 13. Marketplace e reutilização

## 13.1. Finalidade

O marketplace foi apresentado como o local onde soluções são tornadas visíveis e reutilizáveis dentro da MAPFRE.

Não se trata apenas de disponibilizar o core. O marketplace inclui soluções satélites e capacidades funcionais já existentes, aprovadas e em uso.

Exemplos mencionados:

- soluções para sinistros;
- soluções para subscrição;
- gestão de impagos;
- ficha de clientes 360;
- componentes de integração;
- outras soluções funcionais disponíveis.

---

## 13.2. Objetivos

Os objetivos explicitamente associados ao marketplace são:

- reduzir custos;
- evitar desenvolver novamente algo que já existe;
- prevenir desenvolvimento duplicado;
- reduzir dispersão;
- tornar soluções visíveis;
- facilitar o contato com responsáveis pelas soluções;
- permitir avaliação de integração e consumo econômico.

---

## 13.3. Informações disponibilizadas por solução

Segundo a apresentação, cada solução no marketplace deve conter:

- vídeo de apresentação;
- descrição funcional;
- descrição de integração;
- informações sobre como integrar com sistemas locais;
- informações sobre consumo econômico;
- pessoa de contato;
- possibilidade de solicitar mais detalhes operacionais.

A transcrição não informa o endereço do marketplace, embora a apresentação dissesse que um link estava disponível nos slides.

---

## 13.4. Critérios para inclusão

Foi mencionado um procedimento de catalogação de ativos no marketplace e uma análise de viabilidade antes de considerar uma solução publicável.

A transcrição não detalha critérios formais, tais como:

- requisitos mínimos de segurança;
- documentação obrigatória;
- níveis de suporte;
- padrões de API;
- custos;
- maturidade;
- aprovação arquitetural.

---

## 14. Casos concretos apresentados

## 14.1. América Central e Panamá

### Contexto

A RIF da América Central foi apresentada como uma instância já utilizada no Panamá.

### Componentes e capacidades citadas

- Core RIF;
- produto corporativo padronizado de automóvel;
- gestão documental;
- produção e armazenamento de documentos;
- gestor de eventos;
- integrações com sistemas locais;
- APIs de convivência;
- futuras ativações de ficha 360 e gestão de impagos.

### Diferencial de produto

O produto de automóvel é apresentado como corporativo e padronizado para os países da América Central.

### Desafio reconhecido

O desafio não seria técnico apenas. Para que um produto seja compartilhado entre países, ele precisa ser efetivamente homologado e igual para todos eles.

### Roadmap associado

A intenção é expandir a solução para seis países e dez produtos em quatro anos, além de incorporar cotizador comum e capacidades de BPM e BBI.

A sigla **BBI** foi citada, mas não explicada.

---

## 14.2. Uruguai — RIF Vida

### Contexto

O Uruguai foi apresentado como o caso de implantação de RIF Vida, com início operacional previsto para novembro.

### Capacidades mencionadas

- Produto Vida Total;
- cotizador e emissor web;
- DOPE;
- RTE;
- subscrição de risco;
- cálculo de módulos;
- produtos corporativos de Vida;
- subset local de coberturas e dados;
- sincronização de terceiros;
- integrações administrativas e contábeis;
- integração com portal de agentes;
- integração com S400;
- serviços relacionados a cobranças, consultas e ordens de pagamento.

### Modelo de produto

A apresentação diferencia o caso de Vida do caso de automóvel na América Central:

- Na América Central, o produto é caracterizado como regional;
- Em Vida, o produto seria produzido pela área corporativa de negócio e depois adaptado ao Uruguai com subconjunto de coberturas e outros dados locais.

### Potência destacada

A capacidade de copiar e intercambiar produtos entre diferentes instâncias RIF foi apresentada como um diferencial importante.

---

## 14.3. Puerto Rico

Puerto Rico surgiu em uma pergunta sobre países fora do roadmap.

### Esclarecimento dado

A resposta foi que um país fora do roadmap pode consumir soluções individuais do marketplace sem necessariamente implantar o core RIF.

Por exemplo, capacidades como:

- DOPE;
- gestão de impagos;
- clientes 360;

poderiam ser consumidas por APIs, dependendo da integração.

### Limitação explicitamente reconhecida

Foi dito que não seria possível assegurar, naquele momento, a compatibilidade ou integração com a versão local de TRON de Puerto Rico, descrita como muito dispersa.

---

## 14.4. Chile

Um participante perguntou sobre nivelar TRON, instalar componentes base e utilizar posteriormente soluções RIF, especialmente o cotizador.

### Esclarecimento dado

O cotizador pode operar de forma independente e receber tarifas conforme o produto. Entretanto, levar produtos ou capacidades diretamente para uma instalação local de TRON exige análise caso a caso.

A existência de customizações antigas pode impedir que a integração ocorra de maneira simples.

---

## 14.5. Guatemala

Um participante da Guatemala perguntou sobre uma solução para controle de cotações relacionada a Salesforce.

### Resposta dada

Foi informado que a RIF pretende incorporar autosserviços e gestão de contact center, e que havia desenvolvimento para a República Dominicana que se pretendia incorporar à RIF.

Também foram mencionadas integrações entre Salesforce e “Hennys” — termo registrado dessa forma, sem explicação suficiente para confirmar sua identidade.

### Limitação

Não havia roadmap concreto para esse item específico no momento da apresentação.

---

## 14.6. República Dominicana

A República Dominicana foi mencionada em relação a um desenvolvimento em andamento, potencialmente associado à ficha de clientes 360 e a capacidades de autosserviço ou contact center.

A transcrição não permite determinar com precisão:

- qual solução estava sendo desenvolvida;
- seu estágio;
- se já havia sido aprovada para o marketplace;
- prazo de disponibilização.

---

## 14.7. México

México foi citado em dois contextos:

- como país com versão recente de TRON;
- como objeto de futuro assessment de produtos de Vida.

Não foram fornecidos resultados do assessment, escopo, cronograma ou decisão de adoção.

---

## 14.8. Espanha e Saúde

Foi dito que a Espanha está desenhando uma solução de Saúde e que a ACT participa dessa iniciativa, com a ideia de incorporar futuramente essa solução à RIF.

Componentes ou capacidades associados à futura solução de Saúde:

- nomenclátor;
- gestão de provedores;
- assistências do sistema de saúde.

A transcrição não confirma que a solução esteja pronta, aprovada, em roadmap formal da RIF ou disponível para consumo.

---

## 15. Roadmap apresentado

## 15.1. América Central

O roadmap da América Central inclui:

- extensão para seis países;
- dez produtos nos quatro anos seguintes;
- implantação simultânea de produtos em RIF para os países;
- desenvolvimento de cotizador;
- conexão de BPM e BBI;
- expansão além do Panamá;
- possível descomissionamento de sistemas até 2028.

Países citados:

1. Honduras;
2. Nicarágua;
3. Costa Rica;
4. El Salvador;
5. Guatemala;
6. Panamá.

A economia recorrente estimada, condicionada à eliminação de sistemas, é de aproximadamente **€ 1,2 milhão** até 2028.

---

## 15.2. Vida

Para Vida, o roadmap mencionado inclui:

- iniciar o MVP de Vida Total no Uruguai em novembro;
- ampliar capacidades globais;
- desenvolver produtos adicionais;
- incluir elementos como suplementos especializados;
- manter produtos corporativos que possam ser customizados nos países;
- utilizar frontal web de cotização integrado à plataforma;
- considerar posteriormente América Central e México no roadmap de Vida.

O termo “MVP” foi transcrito como “MWP” em um trecho, mas o contexto sugere alta probabilidade de referência a **MVP**. Ainda assim, a transcrição não oferece confirmação textual perfeita.

---

## 15.3. Marketplace

O roadmap do marketplace prevê:

- incorporar novas soluções;
- aumentar o catálogo;
- divulgar atualizações internas a cada duas semanas;
- encerrar o ano com mais cinco ou seis soluções adicionadas;
- manter crescimento anual de soluções reutilizáveis.

---

## 16. Perguntas e respostas relevantes

## 16.1. Países fora do roadmap, como Puerto Rico

### Pergunta

Como países que ainda não estão no roadmap poderiam entrar ou aproveitar a iniciativa, com exemplo de Puerto Rico?

### Resposta

A resposta distinguiu duas possibilidades:

1. Implantar o core RIF;
2. Consumir componentes individuais do marketplace por API.

Foi explicado que países fora do roadmap podem usar soluções específicas, mesmo que não implementem uma instância RIF completa.

### O que isso esclarece

A RIF não é um pacote “tudo ou nada”. Há um modelo de adoção modular, no qual certas capacidades podem ser consumidas isoladamente.

### Limitação revelada

A integração com versões muito customizadas ou dispersas de TRON precisa ser estudada caso a caso.

---

## 16.2. Uso de cotizador após nivelamento de TRON

### Pergunta

Se um país nivelar TRON e instalar componentes base, poderá utilizar o cotizador para calcular prêmios de produtos já configurados localmente sem grande desenvolvimento?

### Resposta

O cotizador foi descrito como uma peça que pode funcionar de forma independente. Porém, a possibilidade de reutilizar produtos existentes, conectá-los a componentes RIF ou migrar comportamentos depende do grau de customização local.

### O que isso esclarece

O nivelamento de TRON não cria automaticamente equivalência funcional com RIF. A compatibilidade não pode ser presumida.

---

## 16.3. Salesforce para controle de cotações

### Pergunta

Existem componentes relacionados a Salesforce para controle de cotações que possam ser usados de forma independente?

### Resposta

Foram mencionadas intenções de incorporar autosserviços e gestão de contact center à RIF. Também foi citada uma iniciativa na República Dominicana e a existência de integrações entre Salesforce e “Hennys”.

### O que isso esclarece

Existe interesse em conectar capacidades de relacionamento, autosserviço e contact center à RIF, mas não havia naquele momento um roadmap definido para o caso concreto de Salesforce solicitado.

---

## 16.4. Uso de funcionalidades de TRON Web em Vida sem nivelamento

### Pergunta

Uma operação de Vida poderia aproveitar determinados serviços sem nivelar completamente o ambiente, considerando que não usa intensamente nem customizou certas funcionalidades de TRON Web?

### Resposta

Foi explicado que melhorias feitas para a RIF também melhoram o TRON Web e seriam distribuídas aos países por meio de “SINs”, com frequência trimestral de produção.

Contudo, algumas capacidades podem exigir componentes adicionais, como gestor de eventos. Caso o país não possua esse componente localmente, teria de conectar-se ao gestor de eventos da RIF.

### O que isso esclarece

Existe uma relação entre evolução da RIF e evolução distribuída do TRON Web, mas o consumo completo de determinadas capacidades pode depender do ecossistema de integração requerido.

---

## 17. Limitações reconhecidas

A reunião reconheceu diversas limitações e dependências.

### 17.1. Adoção não automática

Não basta atualizar ou “nivelar” uma instalação de TRON para torná-la automaticamente parte da RIF ou para permitir uso pleno de todas as capacidades.

### 17.2. Customizações locais

Customizações históricas podem dificultar reutilização de produtos, integração de componentes e convergência com a plataforma.

### 17.3. Compatibilidade depende da solução

O palestrante indicou que deve haver análise “solução a solução”. Isso vale especialmente para países fora do roadmap e instalações muito alteradas.

### 17.4. Nem todos os componentes estão disponíveis em todos os contextos

Exemplo: o cotizador estava presente no cenário de Vida, mas não no caso inicial do Panamá. Sua implementação para outros países da América Central era tratada como trabalho futuro.

### 17.5. Ausência de roadmap para algumas demandas

No caso de Salesforce e controle de cotações, foi dito explicitamente que não havia roadmap concreto naquele momento.

### 17.6. Homologação de produto é desafio de negócio

Para um produto corporativo ser compartilhado entre países, não basta capacidade técnica. O produto precisa ser efetivamente homologado entre os países.

### 17.7. Produtos copiáveis apenas entre ambientes RIF

Foi explicado que produtos podem ser copiados entre ambientes RIF, mas essa capacidade ainda não estaria disponível da mesma forma para ambientes TRON tradicionais, justamente pelas diferenças entre instalações.

---

## 18. Riscos e desafios

## 18.1. Riscos explicitamente mencionados

- Dispersão entre instalações de TRON;
- alterações no núcleo;
- obsolescência;
- segurança;
- complexidade de suporte a múltiplas cópias;
- dificuldade de atualização;
- risco de descontos excessivos, tratado pelo DOPE;
- duplicação de desenvolvimento;
- falta de controle de custos;
- dependência de customizações locais;
- integração com sistemas locais complexos;
- dificuldade de homologar produtos entre países.

---

## 18.2. Desafios derivados do contexto

Os itens abaixo são análises derivadas do conteúdo, não afirmações literais dos participantes.

### Governar diversidade regional sem reintroduzir dispersão

A RIF pretende aumentar reutilização e padronização, mas precisa continuar atendendo particularidades locais. O desafio é permitir configuração e integração sem reproduzir o padrão anterior de customização irrestrita do núcleo.

### Equilibrar centralização e autonomia local

A apresentação distribui responsabilidades entre corporativo, região e país. Isso indica que o sucesso da plataforma depende não apenas de tecnologia, mas de uma definição operacional clara de quem decide, opera, suporta e financia cada capacidade.

### Sustentar interoperabilidade por APIs e eventos

A arquitetura declarada privilegia APIs e eventos em lugar de conexões diretas por banco. Essa estratégia tende a reduzir acoplamento, mas exige maturidade em contratos de integração, observabilidade, governança de eventos e suporte.

### Transformar o marketplace em mecanismo efetivo de adoção

Publicar soluções não garante reutilização. A efetividade do marketplace dependerá de documentação, modelos de consumo, suporte, custos compreensíveis e compatibilidade real com os ambientes locais.

---

## 19. Transformações estruturais identificadas

## 19.1. De software distribuído para plataforma gerenciada

A transformação mais explícita é a passagem de cópias locais de software para uma plataforma administrada como serviço.

```text
Modelo anterior:
software instalado e alterado por país

Direção apresentada:
capacidades centralmente administradas e consumidas como serviço
```

---

## 19.2. De customização do núcleo para composição por serviços

A apresentação valoriza integrações por APIs, eventos e componentes independentes. Isso sugere uma direção de arquitetura em que novas capacidades devem ser adicionadas por composição e integração, e não por alteração direta do núcleo.

Essa é uma interpretação arquitetural sustentada pelas falas sobre isolamento, APIs, gestor de eventos e redução de dispersão.

---

## 19.3. De projeto para produto

A organização apresentada utiliza equipes estáveis, backlog, sprints, Product Manager, Product Owner e comunidades transversais. Isso caracteriza uma mudança de foco: em vez de tratar cada iniciativa exclusivamente como projeto local, a RIF busca gerir capacidades como produtos em evolução contínua.

---

## 19.4. De desenvolvimento local isolado para reutilização corporativa

O marketplace é o mecanismo mais claro dessa transformação. Soluções já aprovadas e em uso podem ser descobertas, avaliadas, integradas e consumidas por outras operações.

---

## 19.5. De custo tecnológico implícito para governança econômica

A inclusão de FinOps no modelo de governo mostra uma preocupação explícita em medir e controlar o custo dos componentes consumidos como serviço.

---

## 20. O que a reunião não permite concluir

A apresentação é rica em visão funcional e organizacional, mas não fornece detalhes suficientes sobre diversos aspectos técnicos e operacionais. Não é possível concluir, com segurança:

- qual provedor de cloud hospeda a RIF;
- se há uma ou mais regiões de infraestrutura;
- qual banco de dados sustenta o core;
- qual é a tecnologia do gestor de eventos;
- se existe mensageria assíncrona, streaming ou outro padrão específico;
- como é realizado o controle de identidade e acesso;
- como são gerenciados dados pessoais e requisitos de privacidade;
- quais padrões de segurança de API são utilizados;
- quais são os SLAs, SLOs ou tempos de recuperação;
- como funciona recuperação de desastre;
- como são feitos backups;
- como funciona CI/CD;
- qual ferramenta suporta backlog, sprints, incidentes e observabilidade;
- como são calculados custos e rateios de FinOps;
- quais são os critérios formais de inclusão no marketplace;
- quais países já consomem cada solução do marketplace;
- quais soluções compõem as 22 publicadas;
- quais integrações são síncronas ou assíncronas;
- quais dados trafegam entre core, sistemas locais e componentes satélites;
- qual é a estratégia de migração de instalações TRON altamente customizadas;
- se há metas obrigatórias de convergência das versões locais;
- qual o cronograma detalhado posterior a 2024;
- se o objetivo de economia de € 1,2 milhão já possui business case validado.

---

## 21. Conclusões

A RIF foi apresentada como uma resposta estratégica aos limites de um modelo histórico de TRON distribuído, com múltiplas cópias locais, versões divergentes e forte capacidade de customização.

A solução propõe um ecossistema de seguros operado como serviço, apoiado em um core TRON centralizado, serviços complementares, APIs, eventos, gestão documental, cálculo, cotização, subscrição e um marketplace de funcionalidades reutilizáveis.

A reunião também deixa claro que a transformação não é puramente tecnológica. Ela envolve:

- nova governança;
- modelo de produto;
- equipes estáveis e multidisciplinares;
- responsabilidades distribuídas;
- controle de custos;
- procedimentos formais;
- padronização progressiva;
- estratégia de reutilização entre países.

Ao mesmo tempo, a apresentação não vende uma simplificação irrealista. Foram reconhecidos limites importantes: instalações locais muito customizadas podem dificultar a adoção, a compatibilidade deve ser estudada por solução, nem todas as capacidades estão disponíveis em todos os cenários e a homologação de produtos entre países é um desafio funcional e de negócio.

A direção geral apresentada é a de transformar um conjunto disperso de instalações de software em uma plataforma corporativa de capacidades de seguros, com maior reutilização, integração controlada, evolução contínua e governança compartilhada.
