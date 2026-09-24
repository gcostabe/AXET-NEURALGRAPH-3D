# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.acedemy-TRON-Arquitectura.mp4`
**Data de processamento:** 24/09/2026 15:28:25
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Análise Estruturada — Arquitetura TRON no Ecossistema Reef.M

**Fonte analisada:** transcrição de apresentação e evidências visuais extraídas de slides.  
**Data exibida no material:** 26 de outubro de 2023.  
**Apresentador principal identificado no slide:** David Jiménez Domínguez, área de Arquitetura.  
**Contexto:** sessão da Reef Academy, associada à MAPFRE.

> **Nota sobre terminologia:** a fala transcrita registra repetidamente “RIF”, enquanto os slides exibem “Reef.M” e “Reef Academy”. Pela consistência visual e contextual, este documento usa **Reef.M** para se referir à plataforma, preservando ressalvas quando necessário. Termos como “Neutron”, “Fuji”, “GDC” e “MAR 2.0” foram identificados a partir da combinação entre fala e slides; alguns podem conter variações de reconhecimento automático.

---

## 1. Síntese executiva

A reunião apresentou a arquitetura do **TRON** como o core central dentro de uma plataforma mais ampla, identificada visualmente como **Reef.M**. O objetivo não foi explicar todos os produtos do ecossistema, mas detalhar como o TRON se organiza em camadas de interface, backend Oracle, APIs, eventos, documentos, reporting e infraestrutura cloud.

A mensagem central é que o TRON deixa de ser tratado apenas como uma instalação local com frontend legado e lógica concentrada em banco de dados. A arquitetura apresentada busca separar o **core comum**, o código específico de cada país, as integrações e os frontends, reduzindo acoplamento com o modelo físico do banco e diminuindo o impacto de atualizações do core.

Foram apresentados quatro eixos principais de evolução:

1. **Modernização dos frontends**, com coexistência de TRON Web, NewTRON, gerador de telas e microfrontends.
2. **Arquitetura backend em camadas no Oracle**, com separação entre modelo lógico, acesso a dados, regras de negócio, orquestração de serviços, produto e mediação com o legado.
3. **Integração por APIs e eventos**, em que APIs representam chamadas síncronas para executar ações e eventos representam fatos já ocorridos, processados de forma desacoplada.
4. **Adoção de capacidades cloud e operacionais**, incluindo infraestrutura como código, monitoramento, disaster recovery, execução serverless em alguns cenários e integração com plataformas documentais.

A apresentação também mostrou que a transformação não é uniforme: há coexistência de sistemas locais, TRON Web, processos legados, customizações históricas e novos componentes. Portanto, a arquitetura funciona como uma direção de evolução e padronização, não como evidência de que todos os países já utilizam a mesma topologia tecnológica.

---

## 2. Contexto e antecedentes

A apresentação parte da premissa de que o TRON é a peça central de um ecossistema maior. Segundo a introdução, a plataforma possui diversas capacidades ao redor do core, tais como gestão de documentos, cotizadores, impagos e outros ativos que poderiam ser aprofundados em sessões futuras.

O foco da sessão foi o próprio TRON e suas camadas arquiteturais. O conteúdo sugere um cenário anterior marcado por:

- uso histórico de **TRON Web**, desenvolvido em Java Swing;
- lógica de negócio predominantemente implementada no Oracle, por meio de pacotes e objetos de banco;
- forte dependência do modelo físico de dados em parte do legado;
- presença de instalações locais e sistemas de país;
- necessidade de integrar frontends, plataformas locais e capacidades corporativas;
- necessidade de reduzir o impacto da evolução do core sobre implementações nacionais.

A evolução apresentada procura responder a esse cenário sem eliminar imediatamente todos os elementos anteriores. O TRON Web, por exemplo, ainda aparece como componente temporariamente necessário para telas de Tesouraria, enquanto fluxos equivalentes são migrados gradualmente para microfrontends.

---

## 3. Problemas e necessidades identificados

### 3.1 Fragmentação de interfaces e múltiplos pontos de acesso

A apresentação descreve a existência de vários frontends, cada um atendendo necessidades diferentes. Sem uma camada unificadora, o usuário poderia precisar acessar múltiplas aplicações, URLs e fluxos isolados.

Como resposta, foi apresentado o **Fuji**, descrito como ponto único de acesso e orquestrador de navegação entre os frontends.

**Consequência abordada:** sem essa camada, haveria dispersão da experiência do usuário e maior dificuldade de navegação entre fluxos distribuídos em aplicações diferentes.

---

### 3.2 Dependência do modelo físico do banco de dados

O backend anterior é descrito como fortemente ligado às tabelas e ao modelo físico do TRON. A apresentação ressalta que esse acoplamento dificulta a evolução do sistema, porque alterações no modelo físico podem afetar diretamente código consumidor.

A arquitetura proposta introduz um modelo lógico baseado em **type objects** e camadas de acesso a dados que realizam a transformação entre o modelo físico e os conceitos lógicos de negócio.

**Problema central:** acesso direto e disseminado ao modelo físico.  
**Direção apresentada:** encapsular o modelo físico e fazer as camadas superiores conversarem apenas por interfaces e objetos lógicos.

---

### 3.3 Personalizações capazes de comprometer a evolução do core

A reunião afirma explicitamente que:

- o código do core não deve ser alterado;
- não é permitida a personalização por substituição de sinônimos do core;
- o código específico de cada país deve permanecer separado fisicamente;
- a customização deve ocorrer por configuração, parametrização e, quando previsto, execução dinâmica.

Esse direcionamento parece responder a um problema de personalizações que poderiam tornar atualizações do core mais caras, arriscadas ou imprevisíveis.

---

### 3.4 Uso de integrações externas diretamente pela base de dados

O uso de `UTL_HTTP` e `UTL_FILE` é apontado como uma prática que trouxe problemas no passado. A orientação apresentada é evitar comunicações externas a partir da camada de pacotes Oracle.

A justificativa é arquitetural e operacional: integrações externas devem ocorrer em camadas superiores, fora da base de dados, reduzindo bloqueios e evitando que a disponibilidade de terceiros interfira na execução de transações do core.

---

### 3.5 Processos síncronos excessivamente acoplados

A apresentação contrapõe integrações síncronas por API e integrações orientadas a eventos. Nas APIs, o consumidor conhece o contrato e depende diretamente da resposta do serviço chamado. Em eventos, o produtor publica um fato ocorrido e os consumidores reagem de forma independente.

O problema discutido não é que APIs sejam inadequadas, mas que elas não devem ser usadas para todos os tipos de integração. Processos posteriores a uma transação — como impressão de documentos após emissão de uma apólice — podem ser desacoplados do fluxo original por eventos.

---

### 3.6 Persistência de componentes e processos legados

Há referências a:

- TRON Web ainda mantido corretivamente;
- processos locais e sistemas locais de país;
- pacotes originais de TRON a serem acomodados em estruturas específicas;
- necessidade de manter determinados processos dinâmicos, batch ou altamente específicos;
- experiência do Uruguai como motivação para tratar pacotes herdados.

Isso evidencia uma convivência entre arquitetura alvo e legado. A modernização não é apresentada como uma substituição imediata e integral.

---

## 4. Solução arquitetural apresentada

A solução é formada por um conjunto de camadas e capacidades integradas. Em termos conceituais, ela procura organizar o TRON como um core governado, extensível e integrado ao ecossistema Reef.M.

### Visão consolidada da arquitetura

> A representação abaixo é uma consolidação analítica baseada nos slides e na explicação oral; não corresponde necessariamente a um diagrama literal único apresentado na reunião.

```text
Usuários
  ↓
Fuji — ponto único de acesso, SSO e orquestração
  ↓
Frontends
  ├─ TRON Web
  ├─ NewTRON
  ├─ GDC / gerador de telas
  ├─ Microfrontends por domínio
  └─ Frontends específicos de país
  ↓
Camadas de integração
  ├─ API Business
  ├─ API EDGE
  ├─ API de Convivência
  └─ Plataforma de Eventos
  ↓
TRON / Core Oracle
  ├─ Modelo lógico e objetos
  ├─ Acesso a dados e interfaces
  ├─ Regras de negócio
  ├─ Orquestração e serviços
  ├─ Produto
  ├─ Mediação com TRON2000
  └─ Filas Oracle AQ / emissão de eventos
  ↓
Sistemas locais, plataformas corporativas e consumidores externos
```

A proposta se apoia em separação de responsabilidades:

- o frontend apresenta e orquestra a experiência do usuário;
- APIs expõem operações e catálogos de serviços;
- eventos propagam fatos já ocorridos;
- o core concentra capacidades de negócio;
- o país possui espaço arquitetural próprio para extensões e particularidades;
- integrações externas são deslocadas para camadas apropriadas, fora da lógica Oracle central;
- infraestrutura, observabilidade e automação sustentam a operação em cloud ou ambientes híbridos.

---

## 5. Arquitetura de frontends

### 5.1 TRON Web

O **TRON Web** é descrito como um frontend em **Java Swing 1.3**. A apresentação informa que não há novos desenvolvimentos previstos nesse componente; sua manutenção é corretiva.

Seu uso é temporariamente mantido para telas de Tesouraria que ainda não são cobertas pelos demais frontends. A intenção declarada é migrar gradualmente esses fluxos para microfrontends.

| Aspecto | Informação apresentada |
|---|---|
| Tecnologia | Java Swing 1.3 |
| Evolução | Sem novos desenvolvimentos |
| Manutenção | Corretiva |
| Uso atual | Temporário para telas de Tesouraria |
| Direção | Migração progressiva para microfrontends |

**Rastreabilidade:** slide de frontend, [Frame 05 @ 17:40].

---

### 5.2 NewTRON

A transcrição identifica um frontend chamado **NewTRON**, descrito como uma aplicação baseada em AngularJS e Spring MVC. A evidência visual do slide menciona “Angular + Spring Boot” para o gerador de telas; portanto, é importante não assumir que todos os frontends usam exatamente a mesma combinação tecnológica.

Segundo a fala, NewTRON já possui frontends para processos e famílias do TRON, exceto Tesouraria, que ainda depende de outros frontends.

A principal característica apresentada é o uso de componentes modulares e reutilizáveis. A customização pode ser feita manualmente, por desenvolvimento, permitindo maior flexibilidade do que soluções estritamente parametrizadas.

**Leitura contextual:** NewTRON ocupa uma posição intermediária entre o legado TRON Web e as abordagens mais fortemente dirigidas por parametrização, oferecendo cobertura funcional ampla e capacidade de personalização via código.

---

### 5.3 GDC — gerador de telas para manutenção de tabelas

O GDC foi apresentado como um gerador de telas destinado a manutenções de tabelas e catálogos, sem necessidade de codificação completa.

A ferramenta funciona por parametrização e metadados, gerando telas de manutenção com recursos como:

- listas de opções;
- dependências entre campos;
- campos calculados;
- obrigatoriedade;
- formulários de busca;
- listagem de registros;
- regras de habilitação de campos;
- validações por integração com API.

A limitação foi explicitada: não se trata de um frontend totalmente personalizável. Seu escopo é atender manutenções simples e padronizadas, não fluxos complexos ou interfaces livres.

| Aspecto | Informação apresentada |
|---|---|
| Objetivo | Manutenção de tabelas/catálogos |
| Modelo | Zero code / parametrização |
| Base tecnológica citada | Angular + Spring Boot |
| Base conceitual | MAR 2.0 |
| Geração | Metadados de tabelas Oracle |
| Limite | Não permite personalização além do escopo previsto |

**Rastreabilidade:** [Frame 06 @ 21:12].

---

### 5.4 Microfrontends por domínio funcional

A arquitetura inclui microfrontends organizados por domínio funcional. O slide exemplifica os domínios de:

- Emissão;
- Sinistros;
- Tesouraria;
- Provedores;
- Documentos;
- Países.

A fala esclarece que Tesouraria já possuía alguns fluxos em microfrontends e que os fluxos remanescentes do TRON Web estavam em migração.

Esses microfrontends são apresentados como:

- independentes em seu deploy;
- baseados em componentes reutilizáveis;
- configuráveis por banco de dados;
- capazes de renderizar telas geradas por parametrização;
- organizados por domínio funcional.

A explicação oral detalha dois níveis de componentes:

1. **Componentes funcionais**, como dados gerais, agente, endereço ou meio de cobrança.
2. **Componentes técnicos**, como botões, listas, abas, acordeões e mecanismos de navegação.

O programador atua principalmente na composição ou “maquete” dos formulários, enquanto a plataforma parametriza fluxo, ordem, navegação e apresentação. O ganho esperado é a reutilização de componentes em diferentes microfrontends e estados de processo.

**Rastreabilidade:** [Frame 07 @ 24:43].

---

### 5.5 Fuji — ponto único de acesso

O **Fuji** foi apresentado como o componente responsável por unificar a experiência do usuário. Suas responsabilidades declaradas incluem:

- centralizar o acesso dos usuários;
- administrar usuário, menu, companhia e idioma;
- operar com single sign-on por Azure;
- abrir e conectar os diferentes frontends;
- transmitir informações entre aplicações e fluxos;
- permitir que microfrontends específicos de um país sejam integrados, desde que sigam a configuração documentada.

A reunião o descreve como um orquestrador. Portanto, ele não substitui os frontends, mas permite que eles pareçam uma experiência integrada para o usuário final.

---

## 6. Backend Oracle: core e país

### 6.1 Premissa geral

Embora exista backend Java, a apresentação afirma que a lógica de negócio estava predominantemente em pacotes Oracle e banco de dados. O backend Java é descrito como uma camada de passagem e de personalização, não como o local principal da lógica de negócio no estado apresentado.

O backend é explicado sob duas perspectivas:

- **backend core**, comum e protegido;
- **backend país**, separado e destinado a particularidades locais.

---

### 6.2 Princípios do core backend

Os slides apresentam uma arquitetura em camadas organizadas por esquemas Oracle. Cada camada possui propósito próprio.

Os princípios explicitamente citados foram:

- arquitetura em camadas baseada em esquemas;
- modelo lógico baseado em type objects;
- código core não alterável;
- proibição de customização por substituição de sinônimos;
- suporte a múltiplos países e múltiplas companhias;
- separação entre código de país e core;
- utilitários de diagnóstico de erros em execução;
- proibição do uso de `UTL_HTTP` e `UTL_FILE` para comunicações externas.

**Rastreabilidade:** [Frame 08 @ 28:14].

---

### 6.3 Camadas lógicas do core

A nomenclatura abaixo foi inferida da fala e conferida, quando possível, com o slide. Alguns códigos de esquema podem ter sido deformados pela transcrição automática.

| Camada / esquema citado | Papel descrito |
|---|---|
| NWT / objetos | Disponibilização de type objects, constantes e definições estáticas |
| TRON2000 | Pacotes e vistas originais; preservação do modelo físico legado |
| NWT_DL | Acesso ao modelo físico e transformação entre dados físicos e objetos lógicos |
| NWT_IL | Interface de acesso para camadas superiores; evita acesso direto ao físico |
| NWT_BL | Regras e validações de negócio por atributo e conceito |
| NWT_SR | Orquestrações, processos e interfaces de serviço expostas |
| NWT_IL / mediação | Integração entre modelo lógico moderno e estruturas tradicionais |
| TRP_XX | Definição de produtos e lógica associada a produto |
| NWT_AQ_DL / NWT_AQ_APP | Gestão de filas Oracle AQ e emissão de eventos |
| NWT_DM_APP | Acesso externo ao modelo de dados, conforme explicado na fala |
| TRON2000_APP | Acesso normalizado para execução de lógica vinculada ao TRON Web |

> **Ressalva de fidelidade:** a transcrição contém variações como “Nitron”, “NWT”, “Trondosmil” e “terrepexx”. Os slides exibem nomes como `NWT_APP`, `NWT_SR`, `NWT_BL`, `NWT_DL`, `NWT_IL`, `TRON2000`, `TRON2000_APP` e `TRP_XX`. Este documento preserva a nomenclatura visual sempre que disponível.

---

### 6.4 Separação entre modelo físico e modelo lógico

O mecanismo central de desacoplamento é a camada de acesso a dados.

Segundo a explicação:

1. a camada inferior acessa tabelas e estruturas físicas;
2. ela converte dados físicos em objetos/conceitos de negócio;
3. ela também converte objetos lógicos de volta para o modelo físico;
4. as camadas superiores devem operar por meio de interfaces e conceitos lógicos;
5. o acesso direto ao modelo físico deixa de ser permitido nessas camadas superiores.

A mudança é relevante porque o modelo físico pode evoluir sem exigir alterações generalizadas em todos os consumidores de dados.

**Leitura analítica:** isso indica uma tentativa de transformar a base de dados de um ponto de acoplamento direto em um detalhe encapsulado pela arquitetura.

---

### 6.5 Regras de negócio e orquestração

A camada `BL` foi apresentada como local de validações relacionadas a atributos e conceitos do domínio.

A camada `SR` foi apresentada como responsável por orquestração, incluindo:

- orquestrações de atributos;
- coordenação de objetos dentro de processos;
- interface de serviços exposta para consumo externo.

A separação sugerida é:

```text
Dados físicos
  ↓
Objetos lógicos e interfaces de dados
  ↓
Validações de negócio
  ↓
Orquestração de processos
  ↓
Serviços publicados
```

Essa organização não elimina a lógica de negócio do Oracle; ao contrário, organiza a lógica existente em responsabilidades arquiteturais mais explícitas.

---

### 6.6 Mediação com TRON2000 e legado

A apresentação reconhece a necessidade de manter comunicação com funcionalidade originalmente presente no TRON2000.

A camada de mediação realiza transformação entre:

- o modelo lógico utilizado pelas camadas modernas;
- o modelo de `type record` associado ao TRON Web e à lógica tradicional.

O exemplo mencionado é a execução dinâmica: quando NewTRON precisa acessar funcionalidade original do TRON2000, a camada de mediação transforma os dados e integra os dois modelos.

---

### 6.7 Produtos e eventos no backend

A lógica associada à definição de produto é alocada em esquema próprio identificado como `TRP_XX`.

Também foi apresentada a capacidade de gerar eventos a partir do banco Oracle, por meio de:

- serviços PL/SQL;
- filas Oracle AQ;
- esquemas específicos para gestão de filas.

Essa capacidade conecta o backend Oracle à estratégia de arquitetura orientada a eventos discutida posteriormente.

---

### 6.8 Conexões e sessões desconectadas

Um ponto técnico importante é a diferença entre o comportamento tradicional do TRON Web e os componentes mais recentes.

A apresentação informa que os frontends, BFFs e componentes Java se conectam ao Oracle por pools de conexão, caracterizando sessões desconectadas. Nessas condições:

- as sessões são limpas ou reinicializadas;
- não se pode depender de variáveis globais em nível de pacote;
- práticas tradicionais baseadas na permanência de estado de sessão deixam de ser seguras.

O TRON Web original é descrito como conectado, em contraste com os demais componentes da plataforma.

**Implicação técnica:** código de país e extensões precisam ser desenhados para não depender de estado global de sessão Oracle.

---

## 7. Backend de país

O backend de país foi apresentado como reflexo estrutural do core, preservando camadas semelhantes para objetos, dados, negócio, serviços e produto.

A diferença é que ele existe para acomodar personalizações e particularidades nacionais sem alterar o core.

### Princípios apresentados

- código independente do core;
- arquitetura em camadas similar à do core;
- personalização por parametrização e execução dinâmica;
- menor acoplamento ao modelo físico;
- objetivo de minimizar impactos de novas versões do core;
- necessidade de cuidado com globais de pacote devido a sessões desconectadas.

**Rastreabilidade:** [Frame 10 @ 35:16].

---

### 7.1 Tratamento de dívida técnica e processos legados

A reunião menciona a experiência do Uruguai como referência para uma necessidade prática: transferir pacotes originais do TRON local.

Inicialmente, parte desse conteúdo teria sido acomodada em estruturas de país. Porém, a proposta passa a incluir um novo esquema, citado como `TRON2000_XX`, destinado a:

- alojar determinados pacotes e permissões originais;
- acessar o modelo físico quando necessário;
- manter processos de execução dinâmica;
- acomodar batch e processos muito específicos;
- respeitar a forma de programação associada ao TRON Web.

A apresentação classifica parte desse movimento como tratamento de dívida técnica.

---

## 8. Modelo de integração por APIs

### 8.1 Conceito de API apresentado

A apresentação define API como um catálogo de serviços que permite a comunicação entre sistemas ou aplicações. No caso de APIs REST, a comunicação é feita por HTTP.

A analogia utilizada foi a de um restaurante:

| Elemento da analogia | Correspondência arquitetural |
|---|---|
| Cardápio | Catálogo de serviços |
| Prato | Serviço |
| Garçom | API |
| Cozinha | Core segurador / TRON |
| Cliente/comensal | Outro sistema ou aplicação |

A intenção da analogia é reforçar que aplicações consumidoras não precisam acessar diretamente a complexidade interna do core.

---

### 8.2 API EDGE

A API EDGE é apresentada como a interface mais próxima do modelo e da nomenclatura do TRON.

Características citadas:

- expõe funcionalidade do core;
- possui organização por domínios funcionais, como Emissão, Tesouraria e Sinistros;
- pode ser consumida por aplicações internas;
- pode ser usada por sistemas locais de país;
- possui catálogo com mais de 500 serviços, segundo a fala;
- inclui API Batch para tarefas pesadas ou demoradas;
- integra tarefas originalmente desenvolvidas em PL/SQL;
- passou a permitir tarefas desenvolvidas em Java.

A adoção de tarefas Java foi justificada pela possibilidade de aliviar a carga do banco e reduzir problemas como bloqueios causados por chamadas externas executadas dentro da base.

**Rastreabilidade:** [Frame 11 @ 38:47].

---

### 8.3 API Business

A API Business foi descrita como uma camada com linguagem mais padronizada, clara e menos orientada às estruturas internas do TRON.

Seu papel é:

1. expor um catálogo de serviços em linguagem mais uniforme;
2. traduzir internamente as chamadas para a API EDGE;
3. disponibilizar uma implementação padrão, chamada de “preconstruída”;
4. fornecer capacidades de segurança, cache, logging e auditoria.

A apresentação afirma que tanto API Business quanto API EDGE contam, “de caixa”, com capacidades de segurança, cache e logs de auditoria.

---

### 8.4 Integração com sistemas locais: API de Convivência

Para integração síncrona entre Reef.M e o sistema local de cada país, foi definida uma arquitetura de pontos únicos de entrada:

```text
Frontends Reef
  ↓
API Business
  ↓
API EDGE
  ↓
Core TRON

Sistema local do país
  ↓
API de Convivência
  ↓
Core local
```

A API de Convivência deve:

- ser responsabilidade do país;
- ser implantada em servidores locais escolhidos pelo país;
- expor a funcionalidade local que precisa ser disponibilizada para Reef.M;
- seguir o padrão REST;
- seguir a normativa corporativa de definição de APIs mencionada como disponível em “MAR”.

A integração foi explicitamente caracterizada como **síncrona**.

**Rastreabilidade:** [Frame 13 @ 45:49].

---

## 9. Arquitetura orientada a eventos

### 9.1 Conceito e objetivo

A apresentação posiciona eventos como mais do que um mecanismo de integração: seriam uma nova forma de conceber aplicações e processos.

O material visual cita Gartner para definir arquitetura orientada a eventos como um paradigma no qual um componente executa em resposta ao recebimento de notificações de eventos. O ponto enfatizado é o menor acoplamento: quem publica o evento não precisa conhecer os componentes que o consumirão.

A definição operacional adotada na reunião é que um evento representa um fato:

- que já aconteceu;
- imutável;
- persistido;
- associado a uma mudança de estado no sistema.

**Rastreabilidade:** [Frame 14 @ 49:20] e [Frame 15 @ 52:52].

---

### 9.2 Exemplo: emissão de apólice

O exemplo apresentado diferencia uma abordagem tradicional de uma orientada a eventos.

#### Modelo mais acoplado

```text
Emissão da apólice
  ↓
Chamada direta para impressão
  ↓
Chamada direta para outros pós-processamentos
```

Nesse modelo, o processo de emissão conhece e dispara explicitamente seus pós-processamentos.

#### Modelo orientado a eventos

```text
Emissão da apólice
  ↓
Publicação do evento "apólice emitida"
  ↓
Consumidores independentes
  ├─ Impressão de condições particulares
  ├─ Outros pós-processamentos
  └─ Novas capacidades futuras
```

A emissão se concentra em emitir a apólice. A impressão, por exemplo, passa a reagir ao evento publicado, sem estar acoplada diretamente ao fluxo emissor.

---

### 9.3 Plataforma de eventos

A plataforma apresentada utiliza um broker baseado em Kafka, fornecido como serviço pela Confluent.

| Elemento | Informação apresentada |
|---|---|
| Broker | Serviço Kafka oferecido pela Confluent |
| Conceito de Kafka citado | Plataforma open source para publicar, assinar, armazenar e processar fluxos em tempo real |
| Emissão Oracle | Serviços PL/SQL e filas Oracle AQ |
| Emissão adicional | Componentes Java e sistemas locais |
| Segurança | OAuth via Azure AD corporativo |
| Isolamento | Tópicos de cada país isolados dos demais |

O slide de arquitetura mostra TRON e sistemas locais de vários países conectados à **REEF Event Platform**, bem como componentes como Centro América, Vida LATAM e Ativos. Também são citados ativos como Autosserviços, Cotizadores, Re21, RTE, Impagos e Ficha Cliente 360.

**Rastreabilidade:** [Frame 15 @ 52:52].

---

### 9.4 Separação de tópicos por país

A apresentação afirma que cada país acessará seus próprios tópicos, isolados dos demais. Essa informação aponta para uma separação lógica de comunicação na plataforma de eventos.

A reunião, contudo, não detalha:

- como esse isolamento é implementado;
- se existe segregação por ambiente;
- como ocorre autorização por aplicação;
- como se governa o compartilhamento entre países;
- política de retenção, particionamento ou versionamento de eventos.

---

## 10. APIs e eventos: papéis complementares

A apresentação foi explícita ao afirmar que eventos não substituem APIs. As duas abordagens atendem momentos diferentes.

| Aspecto | APIs | Eventos |
|---|---|---|
| Papel | Executar uma ação | Comunicar um fato ocorrido |
| Exemplo | Cobrar recibo ou emitir apólice | Recibo cobrado ou apólice emitida |
| Comunicação | Principalmente síncrona | Assíncrona, descrita como “semi-online” |
| Acoplamento | Mais forte, por contrato direto | Mais fraco, produtor não conhece consumidores |
| Relação | Frequentemente ponto a ponto | Um para muitos |
| Falha/latência | Pode afetar a transação chamadora | Tende a isolar o consumidor com problema |
| Evolução | Novo contrato ou adaptação do fluxo | Novo consumidor pode reagir sem alterar produtor |

A apresentação reconhece que arquiteturas orientadas a eventos também tornam o tratamento de erro mais exigente. Cada consumidor precisa considerar explicitamente cenários positivos e negativos.

**Leitura analítica:** a direção arquitetural não é abandonar chamadas síncronas, mas reservar APIs para comandos e eventos para propagação desacoplada de fatos de negócio.

---

## 11. Casos concretos de uso de eventos

### 11.1 Gestão de impagos

O sistema de impagos é citado como componente construído já integrado à plataforma de eventos. Alterações em gestores de cobrança ou estados de recibos podem gerar eventos para disparar cargas ou descargas relacionadas ao processo de impago.

---

### 11.2 Autosserviço de provedores

No autosserviço de provedores, uma atualização de provedor no TRON gera um evento. O consumidor identifica se o evento representa:

- novo provedor;
- baixa;
- modificação.

A partir disso, o autosserviço realiza as comunicações pertinentes, mencionadas em relação a oficinas/talleres.

---

### 11.3 Ficha Cliente 360

A reunião descreve que a Ficha Cliente 360 era alimentada por processos tradicionais batch, com extração e carga periódicas.

A evolução proposta para Reef de Vida prevê sincronização de clientes entre o TRON local e o TRON implantado em Reef.M por eventos.

**Mudança de paradigma identificada:** carga periódica e batch para sincronização baseada em eventos. Essa leitura é sustentada pela comparação feita pelo próprio apresentador.

---

### 11.4 Selfoster / processo de carteira

Foi citada uma iniciativa denominada, na transcrição, “Selfoster-RM” ou termo semelhante. O reconhecimento automático não permite confirmar o nome com segurança.

O caso consiste em integrar processos do TRON e sincronizar em modo online informações de:

- cotações;
- orçamentos;
- propostas;
- apólices.

A motivação indicada é evitar cargas periódicas e disponibilizar a informação imediatamente ao sistema consumidor.

---

### 11.5 Prestação ou saúde na Espanha

Para o final do ano e anos seguintes — sem ano absoluto claramente determinado na fala — foi mencionada uma iniciativa espanhola relacionada a sistema de prestação ou saúde.

A apresentação afirma que:

- MAR 2.0 seria a arquitetura principal;
- EDA seria usada internamente nos domínios;
- EDA também seria usada nas comunicações entre domínios.

> A transcrição não permite confirmar o nome exato do sistema nem detalhar seu escopo funcional.

---

## 12. Documentos e reporting

A reunião apresentou capacidades de documentos e reporting associadas à plataforma documental.

### 12.1 Composição e gestão documental

Foram citados:

- serviço FIS como compositor de documentos;
- serviço de documentos para gestão e tratamento documental;
- visualizador de documentos;
- alternativa ao visualizador original de “Demos” — o nome não está plenamente claro na transcrição.

O TRON possui módulos configuráveis para explorar essas capacidades.

---

### 12.2 Documentos de saída

Foi apresentado um módulo que permite parametrizar, por família funcional — como apólices, recibos, sinistros e clientes — aspectos como:

- quais documentos devem ser gerados;
- destinatários;
- canais de distribuição;
- integração com a plataforma documental;
- envio por e-mail;
- envio por SMS;
- disponibilização em zona de descarga;
- eventual subida ao repositório documental.

A apresentação sugere que essa configuração é controlada por parametrização, não necessariamente por desenvolvimento específico para cada caso.

---

### 12.3 Documentos de entrada

O módulo de documentos de entrada permite parametrizar documentos necessários e aplicar controles técnicos quando os documentos exigidos não estiverem disponíveis.

A reunião não detalha:

- regras de validação documental;
- fluxo de aprovação;
- armazenamento;
- OCR;
- classificação;
- retenção;
- integrações de assinatura ou evidência digital.

---

### 12.4 Evolução de geração de relatórios

A fala menciona que, nos TRONs originais, relatórios eram gerados com “Super Report” ou termo semelhante, e que templates eram disponibilizados por um serviço web. O reconhecimento automático não permite confirmar o nome exato da ferramenta.

A arquitetura atual permite parametrizar se a composição será feita por Jasper ou pelo serviço FIS.

---

## 13. Cloud, infraestrutura e operação

### 13.1 Primeiro Reef em cloud: Oracle Cloud

O primeiro Reef em cloud mencionado teria sido implantado na Oracle Cloud Infrastructure.

| Aspecto | Informação apresentada |
|---|---|
| Cloud | Oracle Cloud Infrastructure (OCI) |
| Região principal | Ashburn, Estados Unidos |
| Disaster Recovery | San José, Estados Unidos |
| Middleware | WebLogic, com topologia similar a on-premise |
| Automação | Terraform |
| Observabilidade | Dynatrace |
| Documentos | Reutilização de framework documental no datacenter de Miami |
| Integração local | API de Convivência com SISMA, no Panamá |
| Agendamento | Agente Control-M conectado ao master em espaço MAPFRE |

A apresentação afirma que a arquitetura nasceu em cloud, mas inicialmente com componentes implantados de forma semelhante ao ambiente on-premise, em servidores WebLogic.

---

### 13.2 Reef de Vida na AWS

Para um produto de Vida associado ao Uruguai, foi apresentada uma arquitetura em AWS.

| Aspecto | Informação apresentada |
|---|---|
| Cloud | AWS |
| Região principal | São Paulo |
| Disaster Recovery | Ohio, Estados Unidos |
| Componentes Java | Serviços serverless em Fargate |
| Banco de dados | Oracle em serviço RDS, conforme informado |
| Arquitetura | Criada com arquétipos de MAR 2.0 |
| Infraestrutura como código | Sim |
| Observabilidade | Dynatrace em todos os ambientes |
| Integração com sistema local | Eventos para dados de clientes entre Reef e sistema local uruguaio |
| Serviços adicionais | Seleção de riscos em “DUB” e seleção de módulos em “RTE”, conforme transcrição |
| Documentos | Hospedados na AWS, também em Fargate |
| Cotizador | Integrado ao core, seguindo arquétipos de MAR 2.0 |

> **Ressalva:** a reunião afirma “Oracle RDS” no contexto AWS. A transcrição não detalha a modalidade exata do serviço, configuração de banco, alta disponibilidade, backup ou licenciamento.

---

## 14. Perguntas e respostas

### Pergunta 1 — Uso atual de API Business para cobrança por cartão

Um participante da República Dominicana explicou que possui uma instalação de 2022, sem NewTRON, com TRON Web e backend Oracle. O país está implementando uma passarela de pagamento para cobrança por cartão.

O participante informou que:

- criou uma API Business que se conecta ao autorizador externo;
- consome essa API a partir do TRON;
- utiliza `UTL_HTTP` para tratar requisições e respostas JSON;
- deseja saber se essa abordagem está correta;
- deseja saber qual alternativa existirá caso `UTL_HTTP` e `UTL_FILE` deixem de poder ser usados na base de dados.

### Resposta sobre `UTL_FILE`

A resposta explicou que, no TRON Web, existiria um pacote chamado aproximadamente “Ternecalis” — nome não plenamente confirmado pela transcrição — no qual foram implementadas sobrecargas de métodos para evitar o uso direto do sistema de arquivos da máquina de banco.

Em vez de gerar arquivos diretamente no filesystem do banco, a solução registra as informações em tabela temporária e constrói o conteúdo a partir dela.

A direção futura seria levar a geração de arquivos para tarefas Java, executadas externamente à base de dados.

### Resposta sobre `UTL_HTTP`

A orientação foi que integrações externas deveriam ocorrer em camadas de personalização ou backend Java, antes da chegada ao banco Oracle.

Para fluxos web do Reef.M, a explicação afirma que haverá uma camada servidor em que extensões poderão realizar as integrações contra APIs externas.

### Esclarecimento adicional do participante

O participante ressaltou que sua instalação atual ainda não possui as camadas intermediárias descritas. Ela contém core, TRON Web e pacotes Oracle, sendo a integração atual executada diretamente a partir desse contexto.

### Complemento da resposta

A resposta reforçou que o cenário futuro em Reef.M teria frontends web e camada servidor, permitindo realizar extensões e integrações fora da base de dados.

### O que a troca esclarece

Essa pergunta evidencia que:

1. a restrição a `UTL_HTTP` e `UTL_FILE` é uma direção arquitetural relevante, mas não significa necessariamente que instalações legadas já tenham uma substituição pronta e imediata;
2. a arquitetura alvo depende de camadas que podem não existir em versões ou instalações anteriores;
3. a migração de integrações externas para camadas Java/servidor exige evolução da topologia da instalação;
4. a situação específica da República Dominicana não recebeu, na transcrição, um plano de migração detalhado, cronograma ou solução concreta de transição.

---

## 15. Números e indicadores citados

| Indicador | Valor mencionado | Contexto |
|---|---:|---|
| Participantes no início da sessão | 100 | Número mencionado antes da apresentação começar |
| Serviços da API EDGE | Mais de 500 | Catálogo de serviços citado pelo apresentador |
| Fluxos de Tesouraria em microfrontends | 10, no momento citado | A fala informa que havia “de momento hay diez flujos” |
| Data do slide | 26 de outubro de 2023 | Data exibida no material visual |
| Regiões OCI citadas | Ashburn e San José | Produção e disaster recovery do primeiro Reef cloud |
| Regiões AWS citadas | São Paulo e Ohio | Produção e disaster recovery para Reef de Vida |

> Os números refletem declarações da apresentação. Não há evidência de auditoria externa, atualização posterior ou confirmação operacional posterior à data da sessão.

---

## 16. Roadmap e direcionamentos de evolução

A reunião apresenta direcionamentos, mas não um roadmap completo com marcos, responsáveis, orçamento ou datas precisas.

### Direções explicitamente citadas

- migração de telas de Tesouraria do TRON Web para microfrontends;
- manutenção apenas corretiva do TRON Web;
- fortalecimento do uso de parametrização e componentes reutilizáveis;
- separação física entre core e código dos países;
- redução do acoplamento ao modelo físico do banco;
- limitação do uso de comunicações externas diretamente pelo Oracle;
- evolução de tarefas de banco para tarefas Java em determinados cenários;
- adoção de eventos para sincronização de dados e pós-processamentos;
- uso de EDA como arquitetura de referência em iniciativas futuras de Espanha;
- ativação ou evolução de Reef de Vida no contexto do Uruguai;
- expansão de integrações de autosserviços, impagos, Ficha Cliente 360, cotizadores e outros ativos pela plataforma de eventos.

### O que não foi apresentado como roadmap detalhado

A reunião não fornece, de forma suficiente:

- sequência formal de migração por país;
- cronograma de desativação do TRON Web;
- datas de adoção obrigatória de eventos;
- plano de substituição de `UTL_HTTP` em instalações existentes;
- versões mínimas do core para cada capacidade;
- critérios de priorização por domínio;
- orçamento, responsáveis ou métricas de sucesso.

---

## 17. Limitações reconhecidas

### Limitações dos frontends

- TRON Web não recebe novos desenvolvimentos; permanece apenas para corretivos e uso temporário em Tesouraria.
- GDC atende manutenção de tabelas, mas não permite customização completa.
- A adoção de microfrontends não implica que todos os fluxos já tenham sido migrados.
- Instalações antigas podem não possuir as camadas intermediárias assumidas pela arquitetura alvo.

### Limitações do backend

- O core não pode ser alterado diretamente.
- Não é permitida substituição de sinônimos para personalização do core.
- Não se deve depender de variáveis globais de pacote em ambientes de sessão desconectada.
- Integrações externas a partir da base de dados são desestimuladas ou bloqueadas na arquitetura apresentada.

### Limitações de integração

- APIs de Convivência dependem da responsabilidade, implantação e implementação de cada país.
- Eventos não substituem APIs.
- A arquitetura orientada a eventos exige maior cuidado no tratamento de falhas dos consumidores.
- A reunião não descreve mecanismos concretos de reprocessamento, idempotência, ordenação ou dead-letter queues.

### Limitações de documentação e reporting

- Nomes de alguns serviços e ferramentas foram prejudicados pela transcrição automática.
- A reunião apresenta capacidades gerais, mas não detalha modelo de armazenamento, segurança documental, retenção ou governança de templates.

---

## 18. Riscos e desafios

### 18.1 Riscos explicitamente mencionados

- Alterações ou integrações externas executadas dentro do banco podem causar bloqueios ou problemas de execução.
- Integrações síncronas podem aumentar o tempo de resposta de transações quando um serviço dependente demora ou falha.
- Variáveis globais de pacote não funcionam adequadamente em cenários de pool de conexões e sessão desconectada.
- Customizações diretas no core podem comprometer a evolução e atualização do produto.
- Processos consumidores de eventos precisam contemplar casos positivos e negativos.

### 18.2 Desafios derivados do contexto apresentado

> Os itens abaixo são leituras analíticas derivadas do conteúdo, não afirmações literais dos participantes.

1. **Migração do legado sem ruptura operacional**  
   A coexistência entre TRON Web, pacotes Oracle tradicionais, sistemas locais e novos frontends exige uma migração cuidadosa. O desafio é modernizar sem interromper fluxos críticos, especialmente Tesouraria e integrações de cobrança.

2. **Disciplina de arquitetura nos países**  
   A separação core/país depende de adoção consistente dos padrões de parametrização, APIs de Convivência, camadas de país e limites de customização.

3. **Governança do ecossistema de eventos**  
   À medida que mais consumidores se conectam a tópicos de país, tornam-se importantes práticas de versionamento, monitoramento, idempotência e gestão de contratos. Esses mecanismos não foram detalhados na reunião.

4. **Observabilidade ponta a ponta**  
   A adoção de Dynatrace foi citada para infraestrutura e componentes, mas a reunião não detalha como será feita a rastreabilidade transacional entre APIs, eventos, Oracle, sistemas locais e consumidores.

5. **Capacitação de equipes**  
   A mudança de integrações diretas em banco para APIs, tarefas Java e eventos implica mudança de práticas de desenvolvimento e operação.

---

## 19. Transformações estruturais identificadas

### 19.1 De customização direta para extensão governada

A arquitetura limita alterações no core e substituição de sinônimos. Em seu lugar, propõe:

- parametrização;
- execução dinâmica em pontos previstos;
- esquemas de país;
- camadas de personalização;
- APIs e extensões externas à base.

**Leitura analítica:** a direção é reduzir customização irrestrita e substituí-la por extensibilidade com limites arquiteturais.

---

### 19.2 De acesso físico a modelo lógico

A criação de objetos lógicos, interfaces e camada de acesso a dados indica afastamento do consumo direto de tabelas Oracle.

**Causa e efeito reconstruídos:**

```text
Acesso direto ao modelo físico
  ↓
Acoplamento e alto impacto de mudanças
  ↓
Dificuldade para evoluir o core
  ↓
Criação de camadas de dados e interfaces
  ↓
Uso de objetos lógicos nas camadas superiores
```

---

### 19.3 De frontend monolítico e legado para ecossistema de interfaces

A existência simultânea de TRON Web, NewTRON, GDC, microfrontends e Fuji sugere uma evolução gradual:

```text
TRON Web legado
  ↓
Cobertura por NewTRON e geradores parametrizados
  ↓
Microfrontends por domínio
  ↓
Orquestração unificada pelo Fuji
```

A apresentação não permite concluir que TRON Web será eliminado em prazo específico, apenas que seu papel tende a ser reduzido.

---

### 19.4 De integração ponto a ponto para capacidades complementares

A apresentação não propõe substituir APIs por eventos. Ela posiciona os dois mecanismos de forma complementar:

```text
Comando ou solicitação de ação
  ↓
API síncrona
  ↓
Ação concluída
  ↓
Evento publicado
  ↓
Consumidores independentes reagem
```

Essa combinação permite que uma transação de negócio permaneça síncrona quando necessário, enquanto os efeitos posteriores são desacoplados.

---

### 19.5 De cargas periódicas para sincronização orientada a eventos

O caso da Ficha Cliente 360 e a sincronização de clientes entre TRON local e Reef de Vida ilustram a mudança de cargas batch periódicas para atualização baseada em eventos.

A motivação declarada inclui maior agilidade e disponibilidade mais imediata das informações.

---

### 19.6 De infraestrutura manual para infraestrutura automatizada

A adoção de Terraform e a referência explícita a infraestrutura como código indicam uma orientação à automação de ambientes. Em AWS, isso foi associado também a componentes serverless em Fargate.

A reunião, contudo, não detalha o pipeline de CI/CD, processo de aprovação, estratégia de rollback ou gestão de configuração entre ambientes.

---

## 20. O que a reunião não permite concluir

A apresentação é rica em visão arquitetural, mas não fornece detalhes suficientes para concluir com segurança os itens abaixo:

- modelo completo de IAM, além da referência a OAuth e Azure AD;
- políticas de autorização por tópico Kafka;
- estratégia de versionamento de APIs e eventos;
- contratos, schemas ou formatos de payload;
- política de idempotência para consumidores de eventos;
- tratamento de mensagens com falha, reprocessamento ou dead-letter queues;
- retenção, particionamento e disponibilidade do Kafka;
- tecnologia de API gateway, gateway de segurança ou rate limiting;
- topologia de rede entre clouds, países e ambientes locais;
- criptografia em trânsito e em repouso;
- estratégia de backup e recovery do banco Oracle;
- RPO e RTO de disaster recovery;
- modelo de alta disponibilidade;
- processo de CI/CD;
- ferramentas de versionamento e gestão de código;
- SLAs, SLOs ou métricas operacionais;
- modelo de custos, FinOps ou chargeback;
- estrutura organizacional de produto, ownership e suporte;
- plano detalhado de migração de cada país;
- cronograma de descontinuação de TRON Web;
- versões exatas de TRON que passam a emitir eventos;
- escopo preciso de MAR 2.0;
- tecnologia exata de cada BFF;
- nome e características completas de diversos serviços mencionados de forma parcial pela transcrição.

---

## 21. Conclusões

A apresentação descreve uma arquitetura que procura preservar o TRON como core funcional, ao mesmo tempo em que reduz dependências históricas em torno dele. O movimento central é de organização e desacoplamento:

- separar core e país;
- separar modelo físico e modelo lógico;
- separar execução transacional de pós-processamentos;
- separar interfaces por domínio;
- separar integração síncrona de propagação assíncrona de fatos;
- separar infraestrutura da configuração manual por meio de automação.

O TRON não é apresentado como um componente isolado. Ele integra um ecossistema composto por frontends, APIs, eventos, plataformas documentais, sistemas locais, ferramentas de monitoramento, clouds e serviços corporativos.

A principal restrição prática é que essa visão arquitetural convive com instalações legadas e realidades nacionais distintas. A existência de TRON Web, pacotes locais, sistemas como SISMA, integrações Oracle existentes e processos específicos mostra que a transformação é gradual.

Por fim, a reunião reforça que a arquitetura proposta não é apenas uma escolha técnica. Ela procura permitir evolução mais segura do core, reutilização de componentes, menor impacto de atualizações, integração mais ágil entre capacidades e uma operação mais automatizada em ambientes cloud e híbridos.
