# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Arquitectura REEF - Introduccion-20240927_100342-Meeting Recording.mp4`
**Data de processamento:** 20/09/2026 12:03:51
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada — Plataforma BRIEF/RIFT, core TRON/Neutron e modelo de evolução

> **Nota de rastreabilidade e nomenclatura:** a transcrição não contém timestamps ou numeração de linhas. Alguns nomes aparentam sofrer efeitos de reconhecimento automático de voz. Este documento preserva as denominações mais recorrentes — como **BRIEF**, **RIFT**, **TRON**, **Neutron**, **Fuji**, **GDC**, **AQ**, **Zeus** e **MAR** — sem afirmar grafias oficiais quando isso não pôde ser confirmado. Em especial, “BRIEF” e “RIFT” parecem ser usados em trechos próximos para se referir à oferta/plataforma gerida; a relação exata entre os dois nomes não é explicitada com total segurança.

## 1. Síntese executiva

A reunião apresentou a evolução de uma plataforma de seguros oferecida como serviço aos países, centrada em um core histórico denominado **TRON** e em sua evolução web, **Neutron**. A proposta é transformar uma implantação tradicional — em que cada país recebe e opera sua própria instalação — em um serviço operado centralmente, hospedado em cloud e reutilizável por múltiplos países, preservando configurações por país e companhia.

A plataforma reúne o core transacional, aplicações de suporte, front-ends funcionais, APIs de negócio, uma camada de eventos, componentes complementares e um marketplace de soluções. A arquitetura combina um legado fortemente apoiado em Oracle/PLSQL com aplicações Java, Angular, Spring, APIs e uma esteira de eventos baseada em filas Oracle AQ, Kafka e consumidores locais.

A conversa também explorou o modelo operacional e de desenvolvimento: gestão centralizada das instâncias, processo de integração contínua, uso de Jira, Git, Jenkins, Zeus, Splunk, Dynatrace e mecanismos de testes automáticos. Foram reconhecidas limitações relevantes, como a ausência de cobertura de testes unitários para o core, observabilidade mais limitada em ambientes tradicionais e detalhes ainda pendentes sobre infraestrutura, multirregião, bases de dados e operação de containers.

A principal transformação apresentada é a passagem de um software de core instalado país a país para uma plataforma de produto e serviço, com operação centralizada, versões progressivamente homogêneas, capacidade multipaís/multicompanhia e reutilização de componentes.

---

## 2. Contexto e antecedentes

O ponto de partida é um core de seguros historicamente implantado de forma independente em diversos países. A transcrição indica que o **TRON** foi distribuído ao longo dos anos para países da América Latina e também para alguns outros locais, como Turquia e possivelmente Malta. Cada país possuía sua instalação e, em cenários anteriores, operava localmente o software e sua infraestrutura.

Esse histórico trouxe alguns elementos estruturais:

- presença relevante de lógica de negócio em **PLSQL**;
- forte dependência de banco de dados Oracle;
- aplicações antigas de interface;
- integrações construídas em diferentes momentos e com padrões distintos;
- personalizações específicas de país;
- necessidade de suportar múltiplos produtos, ramos, companhias e particularidades locais.

A iniciativa apresentada como BRIEF/RIFT busca reposicionar esse cenário. Em vez de entregar o software para instalação e operação local, a organização central passa a implantar, operar e evoluir o core como um serviço para os países.

A lógica apresentada pode ser resumida assim:

```text
Modelo anterior
País recebe o software
↓
País instala e opera sua instância
↓
Maior dispersão operacional e tecnológica

Direção apresentada
Core oferecido como serviço
↓
Instância implantada e operada centralmente
↓
País consome a plataforma
↓
Maior padronização, reutilização e governança
```

Essa mudança não elimina a necessidade de configurações e adaptações locais, mas procura manter um núcleo comum e controlar a extensão do produto por mecanismos definidos.

---

## 3. Problemas e necessidades identificados

### 3.1. Evolução de aplicações históricas

A plataforma possui diferentes gerações de aplicações:

- uma solução anterior chamada **TRON Web**, descrita como antiga e feita em “Swing ou Java 1.3”, com ressalva de que a versão exata pode ter sido afetada pela transcrição;
- uma aplicação web intermediária, também denominada na transcrição como “Web TRON”;
- a solução atual chamada **Neutron**, construída como aplicação web com Angular e Spring.

A necessidade principal era modernizar interfaces e fluxos, sem interromper a convivência com a lógica de negócio já consolidada no core.

### 3.2. Crescimento excessivo do Neutron

Foi relatado que o Neutron estava se tornando muito grande. Como resposta, iniciou-se a separação dos fluxos por domínio funcional, com componentes específicos para áreas como:

- emissão;
- sinistros;
- tesouraria;
- fornecedores;
- documentos;
- funcionalidades específicas de país.

A motivação apresentada foi reduzir a concentração de funcionalidades em um único front-end e evoluir progressivamente os fluxos para módulos mais especializados.

### 3.3. Necessidade de evitar desenvolvimento repetitivo

No caso de manutenção de tabelas, foi identificado que havia centenas de operações simples de cadastro, alteração e cruzamento de dados. Desenvolver uma tela específica para cada manutenção seria repetitivo e custoso.

A resposta foi a criação do **GDC**, uma ferramenta configurável para geração dinâmica de telas de manutenção. A intenção é reduzir desenvolvimento de front-end para operações simples e recorrentes.

### 3.4. Integração com ecossistemas locais

Mesmo com a centralização do core como serviço, os países continuam tendo sistemas locais e necessidades de sincronização. A plataforma precisa integrar-se com:

- sistemas locais;
- bancos;
- oficinas;
- fornecedores;
- aplicações de autosserviço;
- gestão de inadimplência;
- visão de cliente;
- plataformas documentais;
- consumidores externos.

A integração não é tratada como um único mecanismo: APIs e eventos coexistem conforme o caso de uso.

### 3.5. Homogeneidade de versões versus realidade dos países

A aspiração explicitada é que uma nova versão de core seja implantada em todos os hubs/instâncias, mantendo uma versão homogênea. Entretanto, os participantes reconheceram que isso nem sempre ocorre simultaneamente, pois cada país pode precisar:

- realizar testes próprios;
- validar particularidades;
- executar personalizações;
- adaptar elementos locais.

Portanto, existe uma tensão natural entre a padronização de produto e as necessidades de implantação por país.

---

## 4. Solução apresentada: plataforma de seguros como serviço

A plataforma foi descrita como uma **plataforma seguradora como serviço**. Seu núcleo é o core, responsável por configurar:

- produtos;
- processos;
- regras e operações transacionais;
- funcionalidades associadas ao negócio segurador.

Ao redor do core, a solução reúne aplicações e capacidades complementares para os usuários finais, distribuidores e operações internas.

### 4.1. Visão lógica consolidada

A representação abaixo é uma reconstrução analítica baseada na conversa; não foi apresentada como diagrama literal.

```text
Usuários internos, clientes, distribuidores e consumidores externos
↓
Front-ends funcionais e canais
- Fuji
- Neutron
- módulos especializados
- cotizadores
- aplicações adjacentes
↓
Camada de APIs
- APIs de negócio
- APIs expostas pelo core
↓
Core transacional
- TRON / Neutron
- lógica Oracle PLSQL
- lógica Java
- configuração por país e companhia
↓
Integração e eventos
- Oracle AQ
- artefato leitor de filas
- Kafka
- consumidores locais ou de país
↓
Sistemas e ativos complementares
- sistemas locais
- gestão documental
- inadimplência
- fornecedores
- ficha de cliente 360
- reporting/informacional
```

### 4.2. Conceito de BRIEF/RIFT

A transcrição apresenta BRIEF como uma plataforma seguradora como serviço. Em seguida, utiliza “RIFT” ao descrever a operação centralizada do core, a hospedagem cloud e as instâncias regionais. A leitura mais prudente é que RIFT represente a iniciativa, serviço ou modelo operacional associado ao core entregue centralmente, mas a relação nominal exata entre BRIEF e RIFT não é definida de maneira inequívoca.

O que fica claro é o modelo operacional:

- a organização central implanta o core;
- a organização central opera as instâncias;
- os países deixam de assumir integralmente a operação da instalação;
- a oferta é executada em cloud nos cenários descritos;
- os países utilizam a solução como serviço.

---

## 5. Arquitetura e funcionamento do core

## 5.1. Evolução das interfaces

A evolução mencionada segue, em linhas gerais, este caminho:

```text
TRON Web legado
↓
solução web intermediária de curta adoção
↓
Neutron
↓
módulos funcionais separados e orquestrados por Fuji
```

### TRON Web legado

Foi descrita como uma aplicação antiga, possivelmente baseada em Swing ou Java 1.3. A transcrição não permite confirmar com segurança a tecnologia e a versão precisas.

### Solução web intermediária

Houve uma versão web que teve implantação em poucos países e não permaneceu como linha evolutiva principal.

### Neutron

O Neutron é apresentado como a aplicação web em evolução, construída com:

- Angular;
- Spring;
- lógica Java;
- integração com a lógica existente do core.

Segundo a reunião, praticamente todos os processos da solução web anterior já foram migrados para Neutron, exceto Tesouraria, que estava em migração no momento da conversa.

## 5.2. Back-end Oracle/PLSQL e Java

O back-end do TRON é descrito como predominantemente implementado em **PLSQL** sobre Oracle. Há integrações e lógicas tanto na camada PLSQL quanto na camada Java do Neutron.

A arquitetura não aparenta, no núcleo legado, utilizar uma camada de API intermediária entre o front-end e toda a lógica PLSQL. Foi dito que os front-ends podem chamar diretamente lógicas do Neutron/TRON e que, no entendimento dos participantes, não há uma camada de API ou integração posicionada entre cada tela e o core legado.

Essa afirmação deve ser lida como descrição de alto nível da arquitetura apresentada, não como garantia de ausência absoluta de serviços intermediários em todos os fluxos.

## 5.3. Esquemas e camadas descritas

A apresentação citou uma organização de esquemas Oracle e camadas de software:

| Elemento registrado | Papel descrito |
|---|---|
| `TRON2000` | Modelo físico do core, segundo a apresentação. |
| Usuário/esquema Neutron `MPB` | Acesso ao modelo físico. |
| Usuário/esquema Neutron `APP` | Acesso à parte de programação. |
| Esquemas `TS`, `TV`, `TD` | Mecanismo de comunicação e compatibilidade entre funcionalidades TRON Web e Neutron. |
| DSR | Camada que expõe funcionalidade a Java e, conforme citado, a TRON Web. |
| BL | *Business Logic*, isto é, lógica de negócio. |
| DL | *Data Logic*, isto é, camada de acesso a dados. |
| AQ | Filas Oracle AQ usadas para emissão e extração de eventos. |

A nomenclatura detalhada dos esquemas e seus significados completos não foi explicada integralmente. O documento preserva os nomes registrados sem expandir siglas não confirmadas.

## 5.4. Compatibilidade entre TRON Web e Neutron

A migração do legado para Neutron não foi tratada como uma substituição instantânea. Foram criados mecanismos para permitir que:

- TRON Web invoque funcionalidades do Neutron;
- Neutron invoque funcionalidades do TRON Web;
- a lógica que não estava orientada a objetos no legado possa coexistir com a abordagem orientada a objetos do Neutron.

A reunião indica que os esquemas intermediários viabilizam esse acoplamento durante a transição.

---

## 6. Front-ends e módulos funcionais

## 6.1. Fuji: ponto único de acesso

O **Fuji** foi descrito como uma aplicação posicionada à frente dos diversos front-ends. Seu propósito é organizar a experiência do usuário e evitar acessos dispersos às várias aplicações.

As responsabilidades mencionadas incluem:

- ser o único ponto de entrada para usuários;
- orquestrar os front-ends;
- gerir idioma;
- gerir companhia;
- gerir menu de usuário;
- comunicar front-ends entre si;
- fornecer *single sign-on* com Azure.

A reunião caracteriza Fuji como uma “carcaça” ou camada de integração da experiência. Não foi detalhada a tecnologia de implementação, o modelo completo de autenticação nem o protocolo utilizado para SSO.

## 6.2. Módulos por domínio funcional

Como resposta ao crescimento do Neutron, foram criados componentes ou front-ends associados a fluxos específicos. Foram citados:

- emissão;
- sinistros;
- tesouraria;
- fornecedores;
- documentos;
- particularidades de países.

A estratégia é levar progressivamente fluxos novos e fluxos antigos para esses componentes. A transcrição não detalha quais domínios já foram totalmente extraídos, quais permanecem no Neutron principal nem qual a sequência formal da migração.

## 6.3. GDC: manutenção configurável de tabelas

O **GDC** foi criado inicialmente no contexto de uma implantação no México. O problema identificado era a necessidade de manter muitas tabelas e cruzamentos simples, potencialmente exigindo centenas de telas.

A solução permite configurar:

- a tabela a ser mantida;
- telas de alta;
- telas de alteração;
- telas de manutenção;
- operações de cruzamento de dados.

A geração é dinâmica e orientada por configuração. Para operações simples, a ferramenta evita desenvolvimento de front-end. Para telas mais complexas, existe capacidade adicional, mas a transcrição afirma que casos realmente complexos podem ser desenvolvidos sob medida.

A manutenção do GDC é centralizada pela equipe responsável pela plataforma.

---

## 7. Modelo de personalização por país

A plataforma busca manter um core único, mas reconhece a necessidade de variações por país.

O modelo descrito segue uma ordem de decisão:

```text
País apresenta um novo requisito
↓
Equipe central avalia se a necessidade pode atender outros países
↓
Se reutilizável, a evolução é incorporada ao core
↓
Se específica, é tratada como personalização do país
↓
Código é criado em esquemas próprios e acionado dinamicamente
```

### 7.1. Prioridade para evolução de core

Antes de criar código específico, a solicitação é avaliada pela equipe central. Caso a funcionalidade tenha potencial de atender mais países, ela deve ser incorporada diretamente ao core.

Esse processo demonstra uma tentativa de limitar a fragmentação e preservar a reutilização do produto.

### 7.2. Extensões específicas

Quando uma necessidade não deve entrar no core, a personalização é levada a esquemas próprios de país, citados como esquemas `TRC` ou nome semelhante. A grafia não é totalmente segura devido à transcrição.

O mecanismo descrito utiliza pontos de extensão configurados:

- o core não é alterado diretamente;
- determinados pontos do processo verificam, por configuração, se devem executar uma lógica de país;
- a lógica específica é compilada no esquema do país;
- a orquestração decide quando chamar core, país ou ambos.

### 7.3. Implicação analítica

**Leitura analítica:** o modelo apresentado sugere uma arquitetura de extensibilidade controlada. O objetivo é preservar um núcleo comum e reduzir alterações diretas no core, mantendo particularidades locais em mecanismos de extensão configuráveis.

A reunião não detalha catálogo de pontos de extensão, política de versionamento das customizações, testes obrigatórios ou limites técnicos para esse modelo.

---

## 8. Modelo de implantação e operação cloud

## 8.1. Transição de implantação local para serviço operado centralmente

No modelo anterior, cada país recebia uma instalação de TRON, tipicamente em ambiente local ou infraestrutura tradicional. No modelo BRIEF/RIFT, a equipe central:

- realiza o deploy;
- opera a plataforma;
- suporta as instâncias;
- presta o core como serviço aos países.

Os países não operam diretamente as instâncias RIFT, conforme respondido durante a reunião.

## 8.2. Sabores de implantação mencionados

Foram citados pelo menos dois modelos tecnológicos:

| Ambiente/caso citado | Hospedagem mencionada | Características registradas |
|---|---|---|
| Panamá / hub da América Central | OCI, referido como “cloud Oracle” | Banco Oracle e aplicações/middleware em WebLogic, em modelo descrito como mais tradicional. |
| Uruguai / solução de Vida | AWS, pronunciado como “AWS” | Uso de containers. |
| Core tradicional em países | On-premises / CPD | Instalações locais anteriores ou ainda existentes. |

A conversa usa termos como “OCI”, “AWS”, “WebLogic”, “containers” e possivelmente “Odo LS” por falha de transcrição. A interpretação mais consistente é OCI/Oracle Cloud Infrastructure, AWS e WebLogic, mas o texto não deve ser tomado como confirmação de topologias detalhadas.

## 8.3. Hub da América Central

O primeiro país produtivo do hub da América Central foi o Panamá. A mesma instância deverá incorporar outros países da região.

Foi mencionado:

- Panamá em produção;
- Honduras prevista para entrada em novembro;
- El Salvador e possivelmente Guatemala considerados no roadmap do ano seguinte.

A referência a “ano seguinte” é relativa ao momento da reunião; a transcrição não fornece ano absoluto.

A instância é apresentada como multitenant/multipaís, permitindo que vários países compartilhem os mesmos serviços enquanto mantêm dados e configurações separados.

## 8.4. Instâncias dedicadas ou compartilhadas

A estratégia prevê que determinados países possam integrar-se a hubs compartilhados, enquanto outros podem demandar instância própria.

O Brasil foi utilizado como exemplo hipotético de país que provavelmente não se integraria ao hub centro-americano e poderia ter uma instância dedicada.

Os critérios explicitamente citados foram:

- país;
- volume;
- estratégia de implantação;
- necessidade de decidir entre instância dedicada ou compartilhada.

Não foram detalhados critérios formais de soberania de dados, latência, regulação, custo, capacidade ou recuperação de desastre.

## 8.5. Multitenancy

A resposta dada foi que a plataforma é multitenant e multicompanhia:

- os serviços são compartilhados;
- cada país pode ter sua própria base de dados;
- o mesmo serviço decide o contexto conforme quem o consome;
- há configuração por país e companhia;
- uma mesma instância pode atender múltiplos países;
- um país pode conter múltiplas companhias.

A separação exata entre dados, esquemas, bancos e credenciais não foi detalhada.

---

## 9. Integrações por APIs

## 9.1. APIs de negócio

A plataforma possui uma camada de APIs de negócio exposta a consumidores externos, tais como:

- bancos;
- oficinas;
- aplicações externas;
- front-ends complementares;
- cotizadores;
- outras aplicações BRIEF/RIFT.

Essas APIs traduzem a linguagem técnica/histórica do core para uma linguagem mais orientada ao negócio. O exemplo dado foi a diferença entre expor uma operação técnica com identificador interno e disponibilizar uma operação clara como “emitir uma apólice”.

A intenção é que o consumidor não precise conhecer códigos internos ou nomenclaturas específicas do TRON.

## 9.2. APIs do core

Também existem APIs associadas diretamente ao TRON/core, chamadas na transcrição de “API X” ou denominação semelhante. Elas são descritas como mais próximas das capacidades genéricas do core.

A distinção apresentada foi:

| Tipo de API | Característica descrita |
|---|---|
| API de negócio | Orientada a produtos, ramos ou capacidades compreensíveis para o consumidor. |
| API do core/TRON | Expõe capacidades mais genéricas e transversais do core. |
| Ambas | Implementadas em Java, segundo a reunião. |

## 9.3. Critério de uso entre APIs

A escolha depende do consumidor e do cenário:

- quando o front-end ou consumidor precisa de uma capacidade multirramos, multiproduto e genérica, tende-se a usar as APIs mais próximas do core;
- quando há uma necessidade de negócio bem delimitada por ramo ou produto, a API de negócio pode ser mais adequada;
- os participantes afirmaram que o uso pode ser misto.

### Implicação analítica

A arquitetura parece buscar conciliar dois objetivos:

1. oferecer contratos mais simples e semânticos para consumidores externos;
2. evitar reconstruir uma camada específica de negócio para cada combinação possível de produto, ramo e país.

A reunião não informou governança de versionamento de APIs, catálogo técnico, políticas de autenticação detalhadas, SLA ou estratégia de depreciação.

---

## 10. Arquitetura orientada a eventos

## 10.1. Eventos extraídos do core

A plataforma está introduzindo eventos para disseminar mudanças relevantes do core. Foram citados eventos relacionados a:

- emissão de apólice;
- atualização de terceiros;
- sinistros;
- outras operações transacionais.

A intenção também é usar eventos para sincronizar RIFT com sistemas locais dos países.

## 10.2. Fluxo técnico descrito

A reconstrução do fluxo relatado é:

```text
Operação no core Oracle/PLSQL
↓
Pacote/função PL é chamado no ponto necessário
↓
Evento é registrado em filas Oracle AQ
↓
Artefato implantado em ambiente cloud lê as filas
↓
Evento é publicado em Kafka
↓
Consumidor local ou de país processa o evento
↓
Sistema local é atualizado ou executa ação correspondente
```

A transcrição indica que a emissão de eventos depende da inserção de chamadas em pontos relevantes da lógica PLSQL. Não se trata, pelo que foi descrito, de uma solução de CDC (*Change Data Capture*) tradicional baseada diretamente na captura de alterações de banco.

## 10.3. Ativação por configuração

Para determinados eventos disponibilizados pelo core, a sincronização pode ser ativada por configuração. O exemplo citado foi a sincronização de terceiros para o Panamá quando uma determinada release estivesse disponível.

Também foi dito que países podem utilizar o pacote fornecido para emitir eventos específicos de suas personalizações.

## 10.4. Segurança

Foi afirmado que a solução é “toda securizada”, com referência a OAuth e Azure AD. A transcrição não fornece elementos suficientes para determinar:

- fluxos OAuth;
- tipo de tokens;
- escopos;
- proteção de tópicos;
- modelo de autorização;
- gestão de identidades de aplicações;
- criptografia;
- segmentação de rede.

## 10.5. Casos de uso mencionados

| Caso | Integração relatada |
|---|---|
| Gestão de inadimplência | Sincronização de recibos não pagos do TRON com o ativo de gestão de inadimplência. |
| Autosserviço de fornecedores no Chile | Sincronização de dados de terceiros entre TRON Chile e o autosserviço. |
| Ficha Cliente 360 | Sincronização de dados de clientes do transacional para o ativo de visão 360. |
| Sistemas locais e RIFT | Eventos para atualização de informação, como terceiros, entre a plataforma e o país. |

---

## 11. Reporting, dados e plataforma documental

## 11.1. Extração para finalidade analítica

Foi perguntado como dados operacionais do TRON são levados ao ambiente informacional/analítico. A resposta indicou que:

- o uso de eventos para esse objetivo é uma iniciativa futura, não uma capacidade atual consolidada;
- atualmente há processos batch;
- há conexões diretas para extração de dados;
- existem modelos de consulta;
- há extrações a partir da base de dados.

Portanto, a plataforma ainda não utiliza a arquitetura de eventos como principal via de disponibilização analítica, embora essa seja uma direção futura mencionada.

## 11.2. Documentação e documentos

Foram citados ativos complementares ligados à gestão documental:

- módulo de documentos de saída;
- módulo de documentos de entrada;
- gestor documental;
- módulo ou repositório de documentos antigo;
- front-end para gestão de documentos.

A apresentação não detalhou o produto documental, suas integrações, armazenamento físico, indexação, retenção, segurança documental nem arquitetura de repositório.

---

## 12. Marketplace de componentes e reutilização

O marketplace foi apresentado como um catálogo de soluções e ativos disponíveis para países e entidades.

Ele não é descrito apenas como um API portal. Embora tenha pontos em comum — como documentação de integrações e capacidades — seu objetivo é mais amplo: tornar visível o conjunto de soluções que os países podem adotar além do core.

As informações esperadas por ativo incluem:

- o que a solução faz;
- como se integra;
- operações ou funcionalidades envolvidas;
- condições de faturamento, quando aplicável;
- documentação associada;
- disponibilidade para adoção por países.

A implementação citada inicialmente usa um ambiente de trabalho/documentação e está sendo avaliada ou transferida para um marketplace corporativo em Backstage. A transcrição não confirma se a migração já estava concluída.

### Por que o marketplace foi criado

A motivação relatada é permitir que entidades conheçam capacidades já disponíveis, descubram soluções complementares ao core e reduzam dispersão de informação.

### Leitura analítica

O marketplace sugere uma direção de reutilização entre países: uma solução desenvolvida ou disponibilizada no ecossistema pode ser conhecida, avaliada e potencialmente adotada por outras entidades, em vez de permanecer restrita a um contexto local.

---

## 13. Modelo operacional e governança

## 13.1. Operação centralizada

A operação das instâncias RIFT é centralizada em equipe responsável por:

- implantação;
- operação;
- consultoria;
- suporte das instalações e instâncias.

Os países consumidores não operam diretamente as instâncias do serviço.

## 13.2. Gestão de mudanças e releases

O objetivo declarado é que uma mesma versão de core seja distribuída aos hubs existentes. Contudo, foram reconhecidas exceções práticas devido a testes, necessidades específicas e adaptações por país.

A reunião não definiu:

- frequência oficial de releases;
- critérios de aprovação;
- janelas de manutenção;
- processo de rollback;
- gestão de incompatibilidades;
- matriz de responsabilidade por incidentes em produção.

## 13.3. Observabilidade e incidentes

Foram citadas duas realidades:

| Contexto | Ferramenta / situação relatada |
|---|---|
| Ambientes core tradicionais | Splunk para logs. Não foi reconhecida, pelos participantes, uma ferramenta estabelecida de métricas e observabilidade ampla. |
| Ambientes RIFT | Dynatrace em implantação ou uso. |
| Alertas | Chegam inicialmente ao time de operação. |
| Investigação posterior | Equipes de desenvolvimento podem acessar a console para analisar o ocorrido. |

A informação foi dada com ressalvas como “até onde sei”, portanto não deve ser lida como inventário completo e definitivo das ferramentas de observabilidade da organização.

---

## 14. Processo de desenvolvimento e entrega

## 14.1. Gestão da demanda

As tarefas chegam por **Jira**, onde são registradas como:

- incidências;
- evolutivos;
- outras demandas.

Quando é uma incidência, a equipe busca reproduzir o problema, identificar uma solução, desenvolver a correção e testar nos ambientes locais.

## 14.2. Papéis identificados

Foram destacados dois tipos de papel:

| Papel | Responsabilidade relatada |
|---|---|
| Desenvolvedor | Implementa a demanda, trabalha em sua branch e realiza testes locais. |
| Integrador | Integra o código dos fornecedores/equipes na linha de desenvolvimento central, conduz merges e participa da preparação de deploys. |

A estrutura organizacional completa — Product Owner, Product Manager, Scrum Master, equipes de produto ou comunidades — não foi abordada na transcrição.

## 14.3. Estratégia de branches

O fluxo relatado é aproximadamente:

```text
Branch feature do desenvolvedor
↓
Branch de fornecedor / provider
↓
Branch development
↓
Branch release
↓
Ambientes superiores de integração e entrega
```

Foram citadas convenções como:

- `feature`;
- `deprov`;
- `deprov 24.04`, como exemplo de versão em curso;
- `development`;
- `release 24.04`, como exemplo.

A nomenclatura exata pode variar conforme a versão e o processo vem sendo evoluído, segundo a própria apresentação.

## 14.4. Integração contínua

O processo descrito inclui:

1. desenvolvimento em branch de feature;
2. subida para branch de fornecedor;
3. preenchimento de planilha compartilhada com descrição, identificador, desenvolvedor e destino da mudança;
4. atuação de integradores para levar as mudanças à branch de desenvolvimento;
5. uso de Zeus e automações para preparar deploy no ambiente de integração contínua;
6. execução de testes automáticos de regressão;
7. recebimento de resultados por e-mail;
8. correção de falhas antes da continuidade da esteira.

Foi dito que a integração contínua ocorre quase diariamente, salvo quando há falhas pendentes da integração anterior.

## 14.5. Releases e patches

A planilha compartilhada também registra se a mudança deve:

- entrar na release atual;
- ser aplicada a releases anteriores como patch.

A transcrição não detalha política de manutenção de versões, critérios para hotfixes, ciclo de homologação ou aprovação formal de patches.

---

## 15. Ferramentas de desenvolvimento, automação e qualidade

| Área | Ferramentas ou práticas mencionadas |
|---|---|
| Gestão de tarefas | Jira |
| Repositório e branches | Git |
| Integração e automação | Jenkins, Zeus |
| IDEs | IntelliJ e Visual Studio/Visual Studio Code, conforme entendimento da transcrição |
| Front-end | Angular |
| Back-end Java | Spring |
| Banco e lógica de core | Oracle e PLSQL |
| Logs | Splunk |
| Observabilidade em RIFT | Dynatrace |
| Qualidade Java | Sonar ou regras Sonar em IDE |
| Testes web automatizados | Selenium, aparentemente referido como “Conselenio” |
| Autenticação/SSO | Azure / Azure AD |
| Eventos | Oracle AQ e Kafka |

## 15.1. Geração de front-ends

Para os novos front-ends modulares, foi relatada uma capacidade de geração de esqueleto base de formulários Angular a partir de “conceitos lógicos”. Essa automação gera uma base que depois precisa ser adaptada manualmente.

Não há evidência de um framework abrangente de geração de código para todas as camadas da plataforma.

## 15.2. Testes

A situação apresentada foi:

- novos front-ends possuem testes unitários;
- o core, como um todo, não possui testes unitários;
- existem testes automatizados via Selenium, em nível mais funcional/end-to-end;
- não há acelerador citado para construção de testes automatizados.

Essa é uma limitação relevante, especialmente para uma plataforma que combina lógica de negócio extensa em PLSQL, compatibilidade com legado e customizações por país.

## 15.3. Análise estática

Para Java, há regras de Sonar que podem ser executadas no IDE. Para PLSQL, os participantes relataram não conseguir obter alertas equivalentes no ambiente de desenvolvimento, possivelmente devido à versão da ferramenta ou a uma limitação de integração.

A transcrição não permite afirmar se não existe análise estática de PLSQL em toda a organização; apenas indica que a equipe participante não conseguiu utilizá-la no IDE mencionado.

---

## 16. Containers, escalabilidade e plataformas

A reunião esclareceu que coexistem cenários distintos:

```text
Core tradicional
↓
CPD / on-premises e ambientes tradicionais

Instância RIFT em OCI
↓
Máquinas virtuais e WebLogic, conforme entendimento da conversa

Instância RIFT em AWS
↓
Containers
```

Foi mencionado o uso de **MAR**, aparentemente uma plataforma ou conjunto de capacidades de containerização, para utilizar recursos como:

- autoscaling;
- perfilamento;
- ajustes de aplicação;
- gestão de capacidades de containers.

A transcrição sugere que havia duas opções internas relacionadas a containers, possivelmente “MAR” e outra opção, mas os nomes e a arquitetura não ficaram claros.

### Ponto ainda aberto

Os próprios participantes sugeriram uma reunião específica para aprofundar:

- arquitetura PLSQL;
- estrutura de banco de dados;
- esquemas;
- plataforma de containers;
- operação de MAR;
- configurações de escalabilidade;
- observabilidade de infraestrutura.

---

## 17. Casos concretos apresentados

## 17.1. Panamá e hub da América Central

**Contexto:** primeiro país produtivo no modelo RIFT para a região.

**Hospedagem relatada:** OCI/cloud Oracle.

**Características:**

- base Oracle;
- front-ends e middleware em WebLogic;
- modelo de implantação cloud gerenciado centralmente;
- base para consolidar outros países da América Central.

**Próximos passos citados:**

- Honduras prevista para novembro;
- outros países, como El Salvador e possivelmente Guatemala, considerados para o período seguinte.

**Limitação:** a transcrição não detalha as funcionalidades implantadas no Panamá, a data de entrada em produção, o desenho de rede ou a estratégia de continuidade.

## 17.2. Uruguai / Vida

**Contexto:** outra instância RIFT em produção.

**Hospedagem relatada:** AWS.

**Características:**

- uso de containers;
- associada à linha de Vida.

**Limitação:** não foram detalhados os componentes instalados, a topologia dos containers, o orquestrador usado, a base de dados ou o modelo de segregação.

## 17.3. México e GDC

**Contexto:** implantação em que se identificou grande quantidade de tabelas e cruzamentos a manter.

**Solução:** criação do GDC para configurar e gerar telas dinâmicas de manutenção.

**Resultado esperado:** reduzir desenvolvimento repetitivo de front-end em manutenções simples.

## 17.4. Chile e autosserviço de fornecedores

**Contexto:** integração entre TRON Chile e o ativo de autosserviço de fornecedores.

**Mecanismo mencionado:** sincronização de dados de terceiros.

**Limitação:** não foram descritos contrato de evento, direção completa de sincronização, tratamento de erro ou reconciliação.

---

## 18. Roadmap citado

| Horizonte ou contexto | Item mencionado | Grau de certeza |
|---|---|---|
| Situação atual da reunião | Panamá em produção no hub centro-americano | Diretamente mencionado |
| Novembro, sem ano absoluto | Entrada de Honduras na mesma instância | Diretamente mencionado |
| Ano seguinte, sem ano absoluto | Possível incorporação de El Salvador e Guatemala | Mencionado com incerteza sobre Guatemala |
| Estratégia futura | Mais países poderão entrar em hubs compartilhados ou instâncias dedicadas | Diretamente mencionado |
| Futuro | Próximas implantações tenderiam a AWS, segundo trecho final da conversa | Mencionado, mas há passagem truncada |
| Futuro | Uso de eventos para disponibilização de dados informacionais | Iniciativa mencionada, ainda não implementada |
| Evolução contínua | Migração de fluxos do Neutron para módulos funcionais | Diretamente mencionado |
| Evolução contínua | Migração da Tesouraria para Neutron | Em andamento no momento da reunião |

---

## 19. Números e indicadores citados

A reunião não apresentou indicadores quantitativos consolidados de pessoas, custos, volumes, disponibilidade ou cobertura funcional. Os números identificáveis foram principalmente relacionados a versões e ao conjunto de países.

| Indicador | Valor ou referência mencionada | Contexto |
|---|---|---|
| Países em produção no hub América Central | 1 | Panamá, no momento da reunião |
| Próximo país previsto para o hub | 1 | Honduras, em novembro |
| Países futuros citados para o hub | ao menos 1, possivelmente 2 | El Salvador e possivelmente Guatemala |
| Instâncias RIFT em produção citadas | 2 | Hub da América Central e instância do Uruguai |
| Versão de branch exemplificada | `24.04` | Branch de fornecedor e release em curso |
| Ciclo de integração contínua | quase diário | Desde que a integração anterior esteja certificada |
| Tecnologias legadas referidas | “Java 1.3”, com incerteza | Associada a TRON Web antigo |

> Os valores acima são declarações feitas na reunião e não foram auditados externamente.

---

## 20. Perguntas e respostas relevantes

## 20.1. O marketplace é um API portal?

**Pergunta:** qual tecnologia sustenta o marketplace e se ele é equivalente a um API portal.

**Resposta:** inicialmente, o marketplace foi montado em um ambiente de documentação/workplace. Estava sendo levado ou avaliado para um marketplace corporativo em Backstage. Sua finalidade é documentar soluções, integrações, operações e possíveis condições de faturamento.

**O que isso esclarece:** o marketplace não se limita à publicação de APIs. Ele atua como catálogo de ativos e soluções disponíveis para adoção pelos países.

---

## 20.2. Como TRON se comunica com outras soluções?

**Pergunta:** como o TRON, especialmente sua lógica PLSQL, se integra a soluções externas e ao front-end.

**Resposta:** há integrações feitas em PLSQL e outras na camada Java do Neutron. Os front-ends históricos acessam diretamente lógicas do core; em seguida, foram apresentadas as camadas de APIs e eventos para integrações externas.

**O que isso esclarece:** coexistem integrações históricas mais diretas com mecanismos arquiteturais mais recentes, como APIs de negócio e eventos.

---

## 20.3. A plataforma é implantada por país?

**Pergunta:** se cada país possui sua própria plataforma/instância.

**Resposta:** no modelo histórico, havia instalações por país. No modelo RIFT, a equipe central oferece e opera o core como serviço em cloud. Os países podem compartilhar hubs ou ter instâncias dedicadas conforme estratégia e volume.

**O que isso esclarece:** a evolução não elimina a separação por contexto de país, mas substitui a operação local por uma oferta centralizada.

---

## 20.4. O modelo é multitenant?

**Pergunta:** se os países compartilham a mesma infraestrutura ou se há tenancies separados.

**Resposta:** a plataforma é multitenant/multicompanhia. Serviços podem ser compartilhados, com configuração por país e companhia, e cada país pode manter uma base distinta.

**O que isso esclarece:** o desenho busca reutilização de serviços sem perder a identificação do contexto organizacional de cada país.

---

## 20.5. Como se mantém a versão homogênea entre hubs?

**Pergunta:** se um evolutivo de core é implantado simultaneamente em todos os hubs.

**Resposta:** esse é o objetivo, mas na prática pode haver diferenças temporárias por testes, personalizações e necessidades de cada país.

**O que isso esclarece:** existe intenção de padronização, porém a governança de versões precisa acomodar realidades de implantação local.

---

## 20.6. Quem opera as instâncias RIFT?

**Pergunta:** se os países ou a plataforma RIFT operam as instâncias.

**Resposta:** os países não operam. Há uma equipe central de implantação, operação e consultoria responsável pelas instalações.

**O que isso esclarece:** o modelo de serviço inclui responsabilidade operacional centralizada.

---

## 20.7. Como um país realiza uma customização?

**Pergunta:** se a customização é feita diretamente pelo país ou centralizada.

**Resposta:** o requisito é analisado com a equipe central. Se puder ser reutilizado, entra no core; se for específico, é implementado nos esquemas de país e acionado dinamicamente por pontos configurados.

**O que isso esclarece:** existe um processo de triagem para evitar que customizações locais fragmentem o produto.

---

## 20.8. Fuji decide a lógica de país?

**Pergunta:** se Fuji, por fazer login e identificar usuário, companhia e país, também orienta a lógica de personalização no back-end.

**Resposta:** a resposta enfatizou que idioma, companhia e usuário são enviados em cada requisição ou recuperados da sessão do Neutron. Não foi dito que Fuji seja o único responsável por toda a decisão de roteamento de customizações.

**O que isso esclarece:** o contexto de país e companhia é transportado na arquitetura, mas a reunião não confirmou que a decisão de extensão seja centralizada especificamente em Fuji.

---

## 20.9. APIs de negócio substituem APIs do core?

**Pergunta:** se todos os front-ends deveriam consumir APIs de negócio para garantir unicanalidade e consistência.

**Resposta:** depende do caso. APIs de negócio são mais orientadas a ramos e produtos; APIs do core são mais genéricas e úteis para front-ends multirramos ou multiproduto. O uso pode ser misto.

**O que isso esclarece:** não há uma diretriz absoluta de que todo consumidor deva usar exclusivamente APIs de negócio.

---

## 20.10. Eventos exigem instalação local específica?

**Pergunta:** se cada país precisa instalar uma solução de captura como CDC.

**Resposta:** não há CDC como tal. Existe um pacote/função PLSQL que gera eventos, disponibilizado pelo core e ativável por configuração em determinados casos.

**O que isso esclarece:** a emissão de eventos é baseada em instrumentação explícita de pontos de negócio, não em captura genérica de mudanças do banco.

---

## 20.11. Como dados vão para o ambiente analítico?

**Pergunta:** se a integração informacional ocorre por batch, espelho de banco ou eventos.

**Resposta:** atualmente ocorre por batch, conexões diretas e modelos de consulta. Eventos para esse fim são uma iniciativa futura.

**O que isso esclarece:** a arquitetura de eventos ainda não substituiu os mecanismos atuais de extração analítica.

---

## 20.12. Há automação de desenvolvimento e testes?

**Pergunta:** se existem ferramentas geradoras, IA ou aceleradores para requisitos, construção e testes.

**Resposta:** há geração de esqueleto para alguns formulários Angular e testes unitários em novos front-ends. Para o core, não há testes unitários; existem testes automatizados de maior nível, aparentemente via Selenium.

**O que isso esclarece:** a automação de engenharia existe em pontos específicos, mas não cobre todo o legado nem todas as fases de desenvolvimento.

---

## 21. Limitações reconhecidas

A reunião explicitou ou deixou evidente as seguintes limitações:

1. **Tesouraria ainda estava em migração** para Neutron.
2. **Nem todos os países recebem releases simultaneamente**, apesar da intenção de homogeneidade.
3. **A arquitetura informacional ainda não é orientada a eventos**; há batches e conexões diretas.
4. **O core não possui testes unitários**, segundo os participantes.
5. **A análise estática PLSQL no IDE não está funcionando ou não está disponível** para a equipe.
6. **A observabilidade do core tradicional é limitada**, com Splunk citado para logs e ausência de uma solução de métricas reconhecida pelos participantes.
7. **Há coexistência de legado e moderno**, incluindo lógica PLSQL, integração com TRON Web e novas aplicações Java/Angular.
8. **Detalhes de containers, banco e infraestrutura não foram apresentados integralmente.**
9. **A arquitetura de hubs pode mudar**, pois a alocação futura de países foi descrita como uma fotografia inicial sujeita a ajustes.
10. **O processo de integração e branches está em evolução**, e alguns diagramas ou descrições disponíveis podem estar desatualizados.

---

## 22. Riscos e desafios

## 22.1. Riscos explicitamente mencionados ou reconhecidos

- Falhas na integração contínua podem bloquear a continuidade das subidas até correção e certificação.
- Personalizações e testes de país podem impedir sincronização simultânea de versões.
- O processo de implantação varia por plataforma e país.
- Parte das ferramentas, fluxos e documentação pode não estar atualizada.
- A ausência de testes unitários no core reduz a proteção automatizada para lógica central.
- A observabilidade não parece uniforme entre core tradicional e ambientes RIFT.

## 22.2. Desafios derivados do contexto — análise

Os itens abaixo são interpretações derivadas do cenário apresentado, não afirmações literais da reunião.

### Governar a convivência entre core comum e extensões locais

A plataforma tenta manter um core único por meio de pontos de extensão e avaliação central de requisitos. O desafio é assegurar que customizações de país permaneçam compatíveis com evoluções futuras, sem criar dependências difíceis de atualizar.

### Padronizar entregas entre tecnologias heterogêneas

A convivência de PLSQL, Oracle, Java, Angular, WebLogic, containers, OCI, AWS, APIs e eventos exige uma esteira de entrega capaz de tratar diferentes tipos de artefato com nível consistente de qualidade e rastreabilidade.

### Ampliar observabilidade de ponta a ponta

Como as operações atravessam front-ends, APIs, Oracle AQ, Kafka, consumidores locais e sistemas de país, a ausência de visibilidade unificada pode dificultar diagnóstico e reconciliação de falhas.

### Evoluir a integração analítica

A utilização atual de batches e acessos diretos atende ao cenário presente, mas a intenção de publicar eventos para dados informacionais indica uma futura transição que exigirá definição de contratos, qualidade de dados e governança.

---

## 23. Transformações estruturais identificadas

## 23.1. Transformação tecnológica

A reunião mostra a evolução de aplicações antigas para uma composição de:

- front-ends web;
- Angular;
- Spring;
- Java;
- APIs;
- eventos;
- Kafka;
- autenticação integrada a Azure;
- infraestrutura cloud;
- containers em determinados cenários.

Isso não significa substituição completa do legado: a lógica PLSQL e os mecanismos de compatibilidade continuam fazendo parte central da arquitetura.

## 23.2. Transformação arquitetural

A direção observada é:

```text
Aplicação central extensa e fortemente acoplada
↓
separação progressiva por fluxos funcionais
↓
front-end orquestrador único
↓
APIs de negócio para consumidores externos
↓
eventos para sincronização e integração
```

Essa é uma leitura analítica. A transcrição não afirma que o core já tenha sido integralmente transformado em microserviços, nem que o legado tenha sido substituído.

## 23.3. Transformação operacional

O movimento mais explícito é a troca de instalações operadas por país por um serviço centralmente implantado e operado. Isso altera responsabilidades de infraestrutura, suporte, release e governança.

## 23.4. Transformação de produto e reutilização

O marketplace, o core multitenant, as APIs e a avaliação central de requisitos sugerem uma visão de produto compartilhado entre países. A intenção é incorporar ao core aquilo que pode ser útil em múltiplos contextos e disponibilizar ativos reutilizáveis no ecossistema.

---

## 24. O que a reunião não permite concluir

Apesar da riqueza do material, não é possível determinar com segurança:

- a grafia oficial e a relação exata entre BRIEF e RIFT;
- a arquitetura completa de rede;
- o modelo de IAM, escopos, papéis e autorização;
- detalhes de OAuth, tokens e integração com Azure AD;
- se há Kubernetes, qual orquestrador de containers é utilizado ou como ele é administrado;
- estratégia de backup, recuperação de desastre, alta disponibilidade e continuidade de negócio;
- topologia de banco de dados por país, companhia ou tenant;
- critérios formais para escolha entre hub compartilhado e instância dedicada;
- SLAs, SLOs, RTOs, RPOs ou métricas operacionais;
- modelo de custos, chargeback, FinOps ou faturamento interno;
- políticas de versionamento e depreciação de APIs;
- política de retenção, auditoria e segurança de eventos;
- mecanismo completo de tratamento de falhas, reprocessamento e idempotência em Kafka;
- catálogo de pontos de extensão para personalizações de país;
- cobertura real de testes automatizados, métricas de qualidade ou metas de cobertura;
- processo completo após a branch de release;
- ferramentas oficiais obrigatórias de IDE para todos os desenvolvedores;
- estrutura organizacional completa de produto, arquitetura, segurança e operações;
- cronograma oficial de expansão para todos os países;
- situação atual de migração para Backstage;
- implementação detalhada da plataforma MAR e seus recursos de autoscaling.

---

## 25. Conclusões

A reunião apresentou uma plataforma de seguros em processo de modernização e consolidação operacional. Seu núcleo continua apoiado em um core Oracle/PLSQL maduro, mas a evolução ocorre por meio de aplicações web modernas, modularização de fluxos, APIs orientadas ao negócio, eventos e hospedagem cloud centralizada.

O modelo BRIEF/RIFT procura transformar o core em um serviço multipaís e multicompanhia, reduzindo a necessidade de operação local pelos países e promovendo maior reutilização de funcionalidades. A estratégia de hubs compartilhados, instâncias dedicadas quando necessário e configuração por país demonstra uma tentativa de conciliar padronização com necessidades locais.

A plataforma já possui elementos importantes para essa transformação — Fuji como ponto único de acesso, GDC para reduzir desenvolvimento repetitivo, APIs para exposição de capacidades, eventos para sincronização e um marketplace de ativos. Ao mesmo tempo, há desafios reconhecidos em testes do core, observabilidade, harmonização de versões, coexistência com legado, extração de dados analíticos e aprofundamento da arquitetura de infraestrutura.

A principal mensagem é que a organização não está apenas modernizando telas ou movendo aplicações para cloud. Está evoluindo de um conjunto de implantações locais de core para uma oferta governada, operada centralmente e progressivamente estruturada como plataforma reutilizável para múltiplos países.
