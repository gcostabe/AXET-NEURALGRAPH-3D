# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.acedemy-TRON-Arquitectura.mp4`
**Data de processamento:** 21/09/2026 20:14:39
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada da transcrição — Arquitetura RIF/TRON, APIs, eventos, documentos e cloud

## 1. Síntese executiva

A reunião apresentou capacidades arquiteturais e operacionais associadas à plataforma denominada na transcrição como **RIF** — em alguns trechos, “RIB” ou “rift”, provavelmente por falhas de reconhecimento de voz — e à evolução do core **TRON**. O conteúdo abordou principalmente quatro frentes:

1. desacoplamento de banco de dados e processos do core;
2. integração síncrona por APIs REST;
3. integração assíncrona orientada a eventos;
4. capacidades de documentos, reporting e implantação em cloud.

A direção geral é reduzir o acoplamento entre sistemas, preservar a evolução do core com menor impacto nos países e permitir integrações mais governadas. APIs são apresentadas como mecanismo para executar ações síncronas; eventos, como mecanismo para publicar fatos já ocorridos e permitir reações assíncronas de múltiplos consumidores.

A transcrição também descreve dois cenários de implantação: Panamá, em Oracle Cloud, e uma iniciativa de Vida associada ao Uruguai, em AWS. Ambos mantêm elementos de automação de infraestrutura, observabilidade e integração com sistemas locais, embora os detalhes técnicos sejam apresentados com qualidade desigual devido aos erros de transcrição.

> **Ressalva de qualidade da fonte:** a primeira parte do material contém uma repetição massiva da frase em espanhol “Y a todos los que están en el mundo”, sem contexto útil. Isso é tratado como ruído de transcrição e não permite inferir qualquer conteúdo de negócio ou técnico.

---

## 2. Contexto e antecedentes

A reunião parece fazer parte de uma apresentação técnica sobre a evolução de uma plataforma corporativa de seguros baseada no core TRON e em sua arquitetura associada, chamada na transcrição de RIF.

O cenário de partida envolve:

- sistemas TRON já instalados em diferentes países;
- países que possuem sistemas locais próprios além de TRON;
- lógica de negócio historicamente concentrada em banco de dados, especialmente em PL/SQL;
- integrações síncronas entre o core e sistemas externos ou locais;
- necessidade de executar tarefas pesadas, processos batch e funcionalidades específicas;
- necessidade de reduzir impacto local ao atualizar versões do core.

Foram citados explicitamente:

- **Uruguai**, em relação à migração ou hospedagem de “paquetería” original;
- **Panamá**, cujo sistema local é denominado na transcrição como **SISMAP**;
- **República Dominicana**, no caso prático de integração com autorizador de pagamentos;
- **Espanha**, em uma iniciativa de sistema de prestações de saúde;
- uma iniciativa de **Vida** associada ao Uruguai e à América do Sul.

A principal motivação arquitetural declarada é permitir que novas versões do core sejam instaladas minimizando o impacto nos países, idealmente de forma quase transparente para eles.

---

## 3. Problemas e necessidades identificados

### 3.1. Acoplamento entre customizações locais e modelo físico do core

Foi relatada uma experiência do Uruguai na qual havia necessidade de transportar ou manter uma “paquetería original” associada ao TRON local. Essa expressão pode indicar pacotes, objetos ou customizações de banco de dados, mas a transcrição não define formalmente seu significado.

A situação estava vinculada ao acoplamento com o modelo físico denominado na transcrição como **“tron 2000”**. Em resposta, foi mencionado o surgimento de um novo esquema, também referido como **“tron 2000 XX”**, destinado a abrigar essa paquetería e os respectivos privilégios de acesso ao modelo físico.

### 3.2. Uso de estado em sessões de banco de dados

A apresentação explicou uma diferença relevante entre o TRON Web original e a nova arquitetura:

- o TRON Web original opera com **sessão conectada**;
- front-ends, BFFs e back-end Java acessam Oracle com **pools de conexão** e, portanto, sessões desconectadas;
- outros componentes oferecidos pela plataforma também adotam sessões desconectadas.

Como consequência, não é apropriado depender de variáveis globais em pacotes de banco de dados, pois a sessão pode ser reutilizada, limpa ou reinicializada entre chamadas. A reunião menciona que, quando um front-end acessa o banco, ocorre um reset de sessão para impedir que a execução mantenha um estado indevido.

### 3.3. Integrações síncronas excessivamente acopladas

A apresentação diferencia integrações por API e por eventos. A limitação apontada para APIs não é que sejam inadequadas, mas que elas podem:

- criar dependência direta entre cliente e contrato do serviço;
- propagar problemas de disponibilidade ou lentidão;
- aumentar a latência do fluxo de origem;
- tornar alterações mais difíceis quando muitas integrações dependem diretamente do mesmo fluxo.

### 3.4. Processos pesados no banco de dados

Foi mencionado que tarefas historicamente implementadas em banco de dados, em PL/SQL, podem ser pesadas em termos de volume ou tempo de execução. A evolução proposta permite implementar certas tarefas em Java.

O motivo apresentado é reduzir carga no banco e evitar problemas como bloqueios relacionados a chamadas de serviços externos feitas a partir de processos de banco de dados. A apresentação afirma que essas chamadas externas a partir do banco não são recomendadas.

### 3.5. Cargas periódicas em vez de atualização por eventos

Em casos como a Ficha Cliente 360, a informação é atualmente abastecida por processos tradicionais batch e cargas periódicas. A adoção de eventos foi apresentada como alternativa para obter sincronização mais imediata em determinadas iniciativas.

---

## 4. Solução e direcionamento arquitetural apresentados

A solução descrita não é um único produto isolado, mas um conjunto de capacidades em torno do core TRON e da plataforma RIF:

- APIs Edge e APIs Business para integração síncrona;
- APIs específicas para processos pesados, denominadas **API Badge** na transcrição;
- APIs de convivência para comunicação com sistemas locais;
- plataforma de eventos baseada em broker;
- conectores para capturar eventos de bases de dados TRON;
- evolução de processos do banco para Java;
- capacidades de documentos, reporting, geração, distribuição e visualização;
- infraestrutura automatizada e observável em cloud.

A intenção é organizar as integrações de acordo com sua natureza:

| Necessidade | Mecanismo apresentado |
|---|---|
| Executar uma ação no core | API síncrona |
| Comunicar um fato já ocorrido | Evento assíncrono |
| Integrar RIF a uma funcionalidade local | API de convivência |
| Executar processamento pesado | API Badge / tarefas de TRON Web, potencialmente em Java |
| Publicar fatos oriundos de bases TRON legadas | Conectores de banco e transformação de mensagens em eventos |
| Gerar e distribuir documentos | Plataforma documental configurável |

---

## 5. Arquitetura lógica consolidada

O diagrama abaixo é uma **consolidação analítica** baseada nas falas da reunião; não foi apresentado literalmente dessa forma.

```text
Aplicações / Front-ends / BFFs / Sistemas locais
                    │
                    ├── APIs REST síncronas
                    │     ├── API Business
                    │     ├── API Edge por domínio
                    │     ├── API Badge para tarefas pesadas
                    │     └── API de convivência do país
                    │
                    ├── Eventos assíncronos
                    │     ├── Broker de eventos
                    │     ├── Topics isolados por país
                    │     ├── Produtores
                    │     └── Consumidores / assinantes
                    │
                    ▼
          Plataforma RIF / Core TRON
                    │
                    ├── Componentes Java
                    ├── Processos PL/SQL existentes
                    ├── Banco de dados Oracle
                    ├── Processos batch e tarefas
                    └── Módulos documentais e de reporting
                    │
                    ▼
          Sistemas locais, terceiros e canais
```

### 5.1. Princípio de desacoplamento

O desacoplamento aparece como objetivo recorrente em três níveis:

- **banco de dados:** evitar estado em sessão e reduzir dependência de objetos globais;
- **integração:** distinguir comandos síncronos de eventos assíncronos;
- **evolução do core:** reduzir impactos nos países durante a instalação de novas versões.

Uma leitura possível é que a organização busca preservar o core como fornecedor de capacidades, evitando que integrações locais dependam excessivamente de detalhes internos ou de fluxos rígidos.

---

## 6. Modelo de banco de dados e execução de processos

### 6.1. Esquemas e objetos de definição de produto

A apresentação menciona um esquema “TRXX de L” e posteriormente “tron 2000 XX”. Esses nomes estão claramente sujeitos a erro de reconhecimento de voz, portanto não devem ser tratados como nomenclaturas oficiais sem validação adicional.

O que pode ser afirmado com segurança é:

- havia uma estrutura usada para hospedar objetos de definição de produto;
- a experiência do Uruguai gerou necessidade de transportar ou acomodar paquetería original;
- foi proposto ou criado um novo esquema com permissões de acesso ao modelo físico e à definição desse modelo;
- esse novo esquema seguiria normas associadas ao TRON Web;
- seu uso seria restrito a determinados processos dinâmicos, batch ou muito específicos.

### 6.2. Sessões desconectadas e pools de conexão

A arquitetura descrita utiliza pools de conexão entre front-ends/BFFs/back-end Java e Oracle. Isso significa que a sessão de banco não deve ser interpretada como estado exclusivo e contínuo de uma única operação de negócio.

A consequência técnica explicitamente apresentada é:

- não utilizar variáveis globais de pacote como mecanismo de manutenção de estado;
- considerar que sessões podem ser limpas ou reinicializadas;
- adaptar a programação legada que dependia de estado de sessão persistente.

### 6.3. Evolução de tarefas PL/SQL para Java

As tarefas do TRON Web são descritas como historicamente implementadas como processos PL/SQL. Foi comunicada uma evolução que permite desenvolvê-las em Java.

A finalidade declarada é:

- retirar carga da base de dados;
- reduzir riscos de bloqueio;
- evitar a realização de certos tipos de chamadas externas diretamente a partir do banco de dados.

A reunião não detalha:

- quais tarefas já foram migradas;
- critérios formais para decidir entre PL/SQL e Java;
- mecanismos de agendamento;
- padrões de tratamento de erro;
- modelo de observabilidade dessas tarefas.

---

## 7. Integração por APIs REST

## 7.1. Conceito apresentado

API foi explicada como um catálogo de serviços que permite a comunicação entre sistemas ou aplicações. REST foi apresentado como a forma de exposição e consumo desses serviços usando HTTP.

A analogia utilizada foi a de um restaurante:

| Elemento da analogia | Equivalente técnico |
|---|---|
| Cardápio | Catálogo de serviços |
| Prato | Serviço |
| Garçom | API |
| Cozinha | Core segurador / core TRON |
| Clientes do restaurante | Outros sistemas e aplicações |

A ideia central é que consumidores não acessam diretamente a complexidade interna do core: eles utilizam os serviços publicados pela API.

### 7.2. API Edge

A **API Edge** é descrita como a camada que expõe a funcionalidade do core TRON e se comunica diretamente com ele.

Características apresentadas:

- possui linguagem mais próxima do modelo e da nomenclatura do TRON;
- está ligada ao modelo de dados e à estrutura interna do core;
- é organizada por domínios funcionais;
- há menção a APIs Edge de emissão, tesouraria e sinistros;
- o catálogo contava, no momento da apresentação, com mais de **500 serviços**;
- é voltada principalmente a aplicações internas ou próprias do ecossistema TRON;
- também pode ser utilizada por outras aplicações e pelo sistema local do país.

### 7.3. API Badge

A transcrição denomina uma API especial como **“API Badge”**. O nome pode ter sido transcrito incorretamente, mas a finalidade foi descrita com clareza: permitir chamadas para processos pesados.

Esses processos podem ser pesados por:

- alto volume de dados;
- longa duração;
- ambos os fatores simultaneamente.

A API é relacionada às tarefas do TRON Web e à possibilidade de implementá-las em Java.

### 7.4. API Business

A **API Business** foi apresentada como uma camada com linguagem mais clara, uniforme e menos orientada ao modelo interno do TRON.

Seu papel é:

- disponibilizar um catálogo voltado ao negócio;
- traduzir chamadas para a API Edge;
- reduzir exposição direta ao modelo interno do core;
- oferecer uma implementação padrão, denominada “preconstruido” na transcrição, responsável pela tradução.

Tanto a API Edge quanto a API Business já incluem, segundo a apresentação:

- segurança;
- cache;
- geração de logs;
- logs de auditoria.

A reunião não detalha os mecanismos concretos de autenticação, autorização, rate limiting, versionamento ou governança do catálogo de APIs.

---

## 8. Integração entre RIF e sistemas locais dos países

### 8.1. Cenários locais mencionados

O sistema local de um país pode ser:

- outra instalação de TRON;
- um sistema diferente, como o sistema denominado **SISMAP** no Panamá.

A necessidade é permitir comunicação entre a plataforma RIF e esses sistemas locais.

### 8.2. Regra para integrações síncronas de entrada

A apresentação estabelece uma regra arquitetural: todas as integrações síncronas de entrada devem passar por um ponto de entrada denominado na transcrição como **“PIHETS”**.

Esse nome não é confiável como denominação oficial devido ao reconhecimento de voz. Porém, sua responsabilidade foi descrita como:

- concentrar as integrações síncronas de entrada;
- expor a funcionalidade local que precisa ser disponibilizada ao RIF;
- operar como uma API REST;
- seguir a normativa corporativa de definição de APIs disponível em “MAR”, descrita como arquitetura definida para MAPFRE.

### 8.3. API de convivência

Para acessar de forma síncrona a funcionalidade do sistema local, a reunião menciona uma **API de convivência**.

Características declaradas:

- é responsabilidade do país;
- é implantada em servidores locais escolhidos pelo país;
- constitui a interface de comunicação entre RIF e funcionalidades locais.

A reunião não permite concluir se há um padrão tecnológico obrigatório para implantação, gateway, autenticação, CI/CD ou monitoramento dessa API em todos os países.

---

## 9. Arquitetura orientada a eventos

## 9.1. Conceito

A gestão de eventos foi apresentada como mais que uma capacidade de integração: trata-se de um novo paradigma de construção de sistemas.

A definição atribuída a Gartner descreve arquitetura orientada a eventos como um desenho em que componentes de software executam em resposta a notificações de eventos. A vantagem central seria menor acoplamento em comparação ao modelo cliente-servidor tradicional.

### 9.2. O que é um evento

Foram apresentadas duas caracterizações:

- uma representação de algo que aconteceu;
- um registro de mudança de estado em um sistema.

Também foi ressaltado que eventos são imutáveis: uma vez registrados no broker, seu conteúdo não deve ser alterado.

### 9.3. Fluxo exemplificado: emissão de apólice

O exemplo apresentado estabelece a seguinte separação:

```text
Emissão da apólice
        │
        ▼
Publicação do evento “apólice emitida”
        │
        ├── Consumidor: impressão de condições particulares
        ├── Consumidor: outros pós-processamentos
        └── Consumidores adicionais, se necessários
```

No modelo tradicional descrito, a emissão poderia disparar diretamente outros serviços no mesmo fluxo. No modelo orientado a eventos:

- o processo de emissão se concentra em emitir a apólice;
- publica o fato de que a emissão ocorreu;
- consumidores inscritos recebem esse evento;
- cada consumidor executa sua responsabilidade de forma independente.

### 9.4. Relação causal apresentada

```text
Processo de negócio executado
        ↓
Mudança de estado ou fato relevante
        ↓
Publicação de evento
        ↓
Consumidores interessados reagem
        ↓
Novas ações, chamadas de API ou novos eventos
```

Essa cadeia não significa que todos os processos devam ser convertidos para eventos. A própria apresentação afirma que APIs e eventos são complementares.

---

## 10. Plataforma de eventos e segurança

### 10.1. Broker de eventos

A plataforma de eventos utiliza um broker fornecido pela Confluent. A transcrição associa a Confluent ao time que originalmente projetou Apache Kafka.

Foi informado que o serviço está implantado em:

- **WDS**, na região da **Irlanda**.

A expressão “WDS” não é explicada na reunião. Portanto, não é possível identificar com segurança o provedor ou ambiente correspondente.

### 10.2. Conectores para bases TRON

Como grande parte da lógica de negócio permanece em PL/SQL, a plataforma possui conectores para as bases de dados TRON, permitindo que essas bases atuem como fontes de eventos.

A transcrição menciona mensagens “SCOTMS”, posteriormente transformadas em eventos. Esse nome é incerto e deve ser validado antes de ser usado como referência técnica oficial.

### 10.3. Evolução de capacidade por versão

A apresentação informa que instâncias mais recentes do core passam a oferecer emissão de eventos a partir da versão **23.01**.

Segundo a reunião:

- o TRON pode emitir eventos desde a base de dados usando serviços do próprio core;
- sistemas locais também podem gerar e consumir eventos;
- os países podem se conectar ao broker e aos tópicos correspondentes;
- tópicos são isolados por país, e cada país visualiza apenas seus próprios tópicos.

### 10.4. Segurança de acesso aos tópicos

As conexões aos tópicos do broker são descritas como protegidas por:

- **OAuth**;
- **Azure AD corporativo global** como identity provider.

A transcrição não informa:

- escopos;
- política de autorização;
- rotação de credenciais;
- modelo de service principals;
- criptografia em trânsito;
- retenção de mensagens;
- governança de schemas;
- política de acesso entre países.

---

## 11. Casos de uso de eventos

## 11.1. Sistema de inadimplência / impagos

A apresentação menciona um novo sistema de impagos, ou inadimplência, já integrado nativamente à plataforma de eventos.

O fluxo relatado é:

- processos TRON alteram gestores de cobrança ou estados de recibos;
- mudanças como entrada ou saída de inadimplência geram eventos;
- esses eventos permitem carga ou descarga de trabalho no sistema de impagos.

A transcrição não detalha o significado operacional exato de “carga” e “descarga” da tarefa, nem os estados possíveis do ciclo de inadimplência.

### 11.2. Autosserviço de fornecedores

O primeiro autosserviço que fará uso da tecnologia de eventos é descrito como **autosserviço de fornecedores**.

Fluxo apresentado:

```text
Atualização de fornecedor no TRON
        │
        ▼
Emissão de evento
        │
        ▼
Autosserviço de fornecedores consome o tópico
        │
        ├── identifica inclusão
        ├── identifica alteração
        └── realiza comunicações necessárias com o fornecedor
```

Foi citado especificamente o contexto de comunicação com oficinas para habilitar acesso ao novo autosserviço.

### 11.3. Ficha Cliente 360

A Ficha Cliente 360 é atualmente abastecida por processos batch e cargas periódicas.

No cenário de Vida em desenvolvimento, que seria colocado em produção em breve segundo a reunião, a sincronização de clientes entre:

- TRON local;
- TRON elevado ou disponibilizado no RIF;

passaria a ocorrer por eventos.

O trecho não esclarece:

- se a sincronização é unidirecional ou bidirecional;
- quais atributos de cliente são sincronizados;
- como conflitos de dados são tratados;
- como são tratadas exclusões ou fusões de registros.

### 11.4. CELFOS / TRM

Foi citada uma iniciativa denominada na transcrição como **“CELFOS TRM”**, cuja grafia e nome oficial não podem ser confirmados.

O objetivo relatado é sincronizar, a partir do TRON, cotações, orçamentos e apólices para esse sistema, evitando cargas periódicas e permitindo disponibilidade imediata de informações.

### 11.5. Sistema de prestações de saúde na Espanha

Para o final do ano e o ano seguinte, foi mencionada uma iniciativa na Espanha relacionada a um sistema de prestações de saúde.

A arquitetura orientada a eventos seria uma das arquiteturas de referência usadas. A principal arquitetura foi referida como **MAR20**, mas esse nome não foi explicado.

A proposta é usar arquitetura orientada a eventos internamente nos domínios e nas comunicações entre domínios.

---

## 12. APIs e eventos: papéis complementares

A apresentação enfatiza que eventos não substituem APIs.

| Critério | APIs | Eventos |
|---|---|---|
| Natureza | Ação solicitada | Fato ocorrido |
| Comunicação | Predominantemente síncrona | Assíncrona |
| Exemplo | Cobrar um recibo | Recibo foi cobrado |
| Acoplamento | Mais forte, baseado em contrato direto | Mais fraco entre produtor e consumidores |
| Topologia | Ponto a ponto | Um para muitos |
| Efeito de lentidão em dependência | Pode degradar o fluxo de origem | Tende a isolar o consumidor afetado |
| Evolução de consumidores | Pode exigir alteração no fluxo original | Novos assinantes podem reagir sem alterar o produtor |

O raciocínio exposto é o seguinte:

```text
Uma aplicação chama uma API
        ↓
A API executa uma ação
        ↓
A ação gera uma mudança de estado
        ↓
A mudança pode gerar um evento
        ↓
Consumidores reagem ao evento
        ↓
Consumidores podem executar outras ações por APIs
        ↓
Novos eventos podem ser publicados
```

### 12.1. Limitações e cuidados de arquitetura orientada a eventos

Apesar dos benefícios, foi reconhecido que a arquitetura orientada a eventos torna o controle de erros mais complexo.

Os consumidores precisam ser desenhados considerando:

- caso positivo;
- caso negativo;
- comportamento adequado diante de falhas.

A reunião não detalha mecanismos como retry, fila de erro, idempotência, ordenação, deduplicação ou compensação transacional.

---

## 13. Reporting e gestão documental

A apresentação descreve uma plataforma documental com capacidades para composição, armazenamento, tratamento, distribuição, consulta e upload de documentos.

### 13.1. Componentes mencionados

Foram citados:

- compositor de documentos;
- serviço “FIS”;
- serviço de gestão e tratamento de documentos;
- visualizador original;
- visualizador alternativo implementado;
- módulos de reports;
- módulo de documentos de saída;
- módulo de documentos de entrada;
- módulo de administração de documentos.

Alguns nomes próprios foram transcritos de forma inconsistente — por exemplo, “dependés”, “WTW doner report”, “hasper report” e “visualizador de demos”. A intenção funcional é compreensível, mas os nomes técnicos devem ser validados.

### 13.2. Composição de relatórios

No cenário anterior, os relatórios eram gerados com “hasper report”, aparentemente referindo-se a **JasperReports**, embora essa correção não possa ser tratada como certa sem fonte adicional.

As templates eram disponibilizadas em um serviço ou módulo cujo nome foi transcrito de maneira imprecisa.

O novo módulo de reports permite, por configuração, definir se a composição do documento será feita:

- pelo mecanismo anterior de relatórios;
- pelo serviço FIS.

### 13.3. Documentos de saída

O módulo de documentos de saída permite parametrizar, por família funcional — como apólice, recibo, sinistro ou cliente — aspectos como:

- documentos que devem ser gerados;
- destinatários;
- meios de distribuição.

Os meios citados foram:

- e-mail;
- SMS;
- área ou zona de download;
- envio para uma plataforma de documentos.

A mensagem principal é que essa distribuição é configurável, não exigindo necessariamente desenvolvimento específico para cada combinação de operação e canal.

### 13.4. Documentos de entrada

O módulo de documentos de entrada permite parametrizar quais documentos são necessários para que uma operação seja concluída.

Se os documentos exigidos não estiverem disponíveis, o sistema pode disparar controles técnicos correspondentes.

A transcrição não detalha:

- quais tipos documentais existem;
- quais regras validam os documentos;
- se há OCR, classificação automática ou assinatura;
- critérios de aceite ou rejeição;
- requisitos de auditoria e retenção.

### 13.5. Administração e visualização de documentos

O módulo administrativo organiza documentos associados a entidades principais do sistema, como:

- apólice;
- orçamento;
- recibo;
- serviço;
- sinistro;
- expediente;
- fatura.

Também foi implementada uma alternativa ao visualizador denominado “CD2” na transcrição, com funcionalidades de visualização e upload de documentos.

---

## 14. Implantação em cloud: caso Panamá

## 14.1. Ambiente principal e disaster recovery

Foi apresentado o primeiro RIF em cloud, implantado em Oracle Cloud.

A transcrição informa:

- região principal em “google en américa”;
- disaster recovery em San José.

Há inconsistência aparente: a apresentação afirma Oracle Cloud, mas registra “google en américa”. Não é possível concluir se houve erro de transcrição, menção a uma região geográfica, referência a outro provedor ou arquitetura multicloud.

Portanto, o único ponto seguro é que foi relatada:

- uma implantação principal;
- uma implantação de disaster recovery em San José;
- associação inicial do caso a Oracle Cloud.

### 14.2. Componentes e automação

Os componentes foram descritos como inicialmente implantados de modo semelhante a uma instalação on-premises, usando servidores WebLogic.

A infraestrutura foi automatizada com:

- **Terraform**.

A observabilidade foi implementada com:

- **Dynatrace**.

A cobertura de observabilidade inclui alguns serviços locais, como a API de convivência mencionada na integração.

### 14.3. Integração com o Panamá

O sistema local do Panamá é denominado **SISMAP**.

Foi criada uma API de convivência para conectar:

```text
Sistema local SISMAP
        │
        ▼
API de convivência
        │
        ▼
RIF / Core TRON
```

Também foi instalado um agente do **Control-M**, integrado a um “maestro” existente em um ambiente que a transcrição registra como “espacio máfrico”. O nome desse ambiente não está suficientemente claro.

---

## 15. Implantação em cloud: iniciativa Vida / Uruguai

## 15.1. Plataforma e localidades

Para a iniciativa de Vida na América do Sul, associada ao produto do Uruguai, foi informado:

- implantação em AWS;
- ambiente a ser implantado em São Paulo;
- disaster recovery em Ohio, Estados Unidos.

### 15.2. Componentes Java e serverless

A maior parte dos componentes Java do TRON passou por reengenharia e seria implantada como serviços serverless em **AWS Fargate**.

### 15.3. Banco de dados

Foi informado o uso de Oracle na AWS, por meio de um serviço denominado “RDS” na transcrição.

> **Limitação importante:** a descrição “Oracle, uma RDS” pode ser simplificação ou erro de reconhecimento. A reunião não permite determinar a configuração exata do banco, o serviço efetivamente utilizado, sua topologia ou responsabilidades operacionais.

### 15.4. Infraestrutura como código e observabilidade

A arquitetura foi criada usando arquétipos denominados “mardo cero” na transcrição. Esse nome não está claro.

A finalidade informada é permitir:

- infraestrutura como código;
- automação de implantações em regiões desejadas;
- padronização arquitetural;
- observabilidade e monitoramento em Dynatrace para todos os ambientes.

### 15.5. Integrações e capacidades adicionais

Foram citados:

- sincronização de dados de clientes entre RIF e sistema local do Uruguai por eventos;
- serviços para seleção de riscos em “DUP”;
- seleção de módulos em “RTE”;
- gestão documental em AWS e Fargate;
- um cotizador integrado ao core RIF;
- uso dos mesmos arquétipos na construção desse cotizador.

Os nomes “DUP” e “RTE” não foram explicados. Não é possível determinar sua função precisa além da relação com seleção de riscos e módulos.

---

## 16. Perguntas e respostas

## 16.1. Pergunta: é correto consumir um autorizador externo por API Business a partir do TRON?

Um participante da República Dominicana descreveu uma implementação de passarela de pagamento:

- o ambiente utiliza uma versão ou configuração transcrita como “SIMS del 2022”;
- não utiliza Neutron;
- possui TRON Web;
- realiza cobrança a partir do TRON para um autorizador externo;
- desenvolveu uma API Business para comunicar-se com o autorizador;
- essa API é consumida a partir do ambiente TRON;
- há pagamentos recorrentes e pagamentos únicos.

A dúvida era se a abordagem de utilizar API Business para sair do TRON e consumir serviços externos estava correta.

### Resposta dada

A resposta não validou de forma direta e inequívoca a implementação atual como padrão definitivo. Em vez disso, explicou o modelo futuro ou o modelo RIF:

- em uma arquitetura RIF haverá front-ends web e fluxos web;
- os fluxos passam por uma camada de servidor;
- nessa camada é possível criar extensões;
- as integrações com APIs externas podem ser realizadas nessa camada antes de chegar à base de dados.

### O que a resposta esclarece

A resposta indica uma preferência arquitetural por colocar integrações externas em uma camada Java/servidor, em vez de realizá-las diretamente no banco de dados.

No entanto, a reunião não afirma explicitamente que a API Business existente na República Dominicana é incorreta. Ela sugere que, no modelo arquitetural mais evoluído, a integração será posicionada em uma camada intermediária adequada para extensões.

---

## 16.2. Pergunta: o que substituiria UTL_FILE e UTL_HTTP?

O participante informou usar:

- **UTL_HTTP**;
- **UTL_FILE**;
- leitura de arquivos XML e JSON;
- envio de requisições e leitura de respostas a partir da base de dados.

A dúvida era qual seria a alternativa futura caso essas bibliotecas deixassem de ser usadas no banco.

### Resposta sobre UTL_FILE

Foi explicado que, em TRON Web, o UTL_FILE é tratado por meio de um pacote chamado na transcrição de **“Ternecalis”**.

A solução implementa uma sobrecarga dos métodos para não utilizar diretamente o sistema de arquivos da máquina de banco de dados. Em vez disso:

- as informações são gravadas em tabela temporária;
- os dados do arquivo são construídos nessa estrutura;
- os arquivos são gerados diretamente no TRON Web.

Também foi informado que, futuramente, o objetivo é que tarefas de geração de arquivos deixem de ser feitas diretamente na base e sejam realizadas por tarefas Java, capazes de gerar arquivos externamente ao banco.

### Resposta sobre UTL_HTTP

Foi explicado que a alternativa depende da necessidade de integração.

Para integrações relacionadas a processos de front-end:

- existem camadas na arquitetura onde personalizações podem ser feitas;
- há um back-end Java antes de chegar à base de dados;
- extensões podem ser desenvolvidas nessa camada;
- essas extensões podem realizar integrações com os serviços necessários.

### O que a resposta esclarece

A orientação é deslocar responsabilidades de integração e manipulação externa de arquivos para camadas fora do banco de dados, especialmente Java e camada servidor.

A reunião não apresentou uma matriz completa de migração, bibliotecas Java recomendadas, padrões de segurança nem cronograma para remoção efetiva de UTL_HTTP e UTL_FILE.

---

## 17. Números e indicadores citados

| Indicador | Valor mencionado | Contexto |
|---|---:|---|
| Serviços no catálogo da API Edge | Mais de 500 | Funcionalidades do core expostas pela API Edge |
| Versão com capacidade de emissão de eventos | 23.01 | Versões mais modernas do core passam a emitir eventos desde o banco via serviços do TRON |
| Local do broker Confluent | Região da Irlanda | Ambiente descrito como WDS |
| Período da iniciativa espanhola de saúde | Final do ano e próximo ano | Sem ano absoluto informado |
| Duração restante da sessão no momento do reporting | Cerca de 10 minutos | Controle de tempo da reunião |

Esses valores foram declarados durante a apresentação e não foram verificados externamente.

---

## 18. Decisões e direcionamentos identificados

### 18.1. Direcionamentos explicitamente apresentados

- Minimizar o impacto nos países durante instalações de novas versões do core.
- Evitar uso de variáveis globais de pacote como estado de execução em arquitetura baseada em pools de conexão.
- Concentrar integrações síncronas de entrada no ponto de entrada definido pela arquitetura.
- Manter a API de convivência sob responsabilidade do país e em infraestrutura local escolhida por ele.
- Adotar APIs REST para comandos e eventos para fatos ocorridos.
- Isolar tópicos de eventos por país.
- Utilizar OAuth e Azure AD corporativo para proteger acesso aos tópicos.
- Expandir uso de tarefas Java para reduzir carga e riscos no banco de dados.
- Utilizar infraestrutura como código e automação nas implantações cloud apresentadas.
- Utilizar Dynatrace para observabilidade nos ambientes apresentados.

### 18.2. Decisões que não podem ser confirmadas

A reunião não permite confirmar se houve decisão formal sobre:

- descontinuação obrigatória de UTL_HTTP e UTL_FILE;
- data de migração das tarefas PL/SQL para Java;
- adoção mandatória de eventos para todos os países;
- substituição de APIs por eventos;
- substituição de todos os sistemas locais;
- definição definitiva dos provedores cloud para cada caso;
- critérios de escolha entre Oracle Cloud e AWS.

---

## 19. Transformações estruturais observadas

Esta seção apresenta leitura analítica baseada no conjunto das falas, não declarações literais dos participantes.

### 19.1. Transformação arquitetural: do acoplamento direto para capacidades mediadas

A arquitetura apresentada busca diminuir o acesso direto à complexidade interna do core TRON. A API Business atua como uma camada mais estável e orientada ao domínio, enquanto a API Edge permanece mais próxima da estrutura do core.

Uma leitura possível é a seguinte:

```text
Consumidor acessa detalhes internos do core
        ↓
Maior dependência de modelo, nomenclatura e estrutura interna
        ↓
Maior impacto de evolução
        ↓
Necessidade de abstração
        ↓
APIs por domínio e APIs Business
```

### 19.2. Transformação operacional: do processamento no banco para componentes externos

A evolução de tarefas PL/SQL para Java sugere uma mudança na distribuição de responsabilidades:

```text
Lógica e processamento pesado no banco
        ↓
Risco de carga, bloqueios e integrações externas no banco
        ↓
Necessidade de separar responsabilidades
        ↓
Execução em tarefas Java e camadas de servidor
```

Essa direção não implica que PL/SQL deixe de existir. Pelo contrário, a reunião reconhece que ainda há lógica importante no banco e apresenta conectores para integrar bases TRON à plataforma de eventos.

### 19.3. Transformação de integração: de fluxos síncronos rígidos para reações assíncronas

O uso de eventos permite que novos consumidores sejam adicionados sem alterar necessariamente o produtor do evento.

```text
Fluxo de emissão chama diretamente todos os pós-processamentos
        ↓
Acoplamento e propagação de falhas
        ↓
Publicação do fato “emissão concluída”
        ↓
Consumidores independentes reagem conforme sua necessidade
```

A reunião, entretanto, não propõe abandonar integrações síncronas. O modelo é híbrido: APIs para comandos, eventos para propagação de fatos.

### 19.4. Transformação de produto e plataforma

A presença de catálogos de APIs, serviços documentais configuráveis, tópicos por país, arquétipos e infraestrutura automatizada sugere uma direção de plataforma reutilizável.

Essa é uma interpretação analítica: a reunião não usa explicitamente a expressão “produto de plataforma” como modelo organizacional.

---

## 20. Limitações reconhecidas

### 20.1. Limitações técnicas explicitamente mencionadas

- Não se deve depender de variáveis globais de pacotes em sessões desconectadas.
- Chamadas externas a partir de processos de banco podem causar problemas e não são recomendadas.
- APIs síncronas podem aumentar acoplamento e propagar latência ou indisponibilidade.
- Eventos introduzem maior complexidade no tratamento de erros dos consumidores.
- Processos consumidores precisam ser desenhados para cenários positivos e negativos.
- Sistemas e países podem estar em estágios diferentes de modernização e capacidade de emissão de eventos.
- A capacidade de emissão de eventos desde o core foi associada à versão 23.01.

### 20.2. Limitações de escopo da apresentação

A reunião não detalha:

- mecanismo de governança de schemas de eventos;
- catálogo efetivo de tópicos;
- versionamento de APIs;
- política de compatibilidade entre versões;
- SLAs;
- estratégia de idempotência;
- modelo de retentativas;
- dead-letter queues;
- garantia de entrega;
- ordenação de eventos;
- gestão de duplicidades;
- política de retenção;
- modelo de auditoria ponta a ponta;
- custos operacionais;
- critérios para escolha entre cloud providers;
- estratégia de backup e restauração;
- arquitetura de rede;
- segregação de ambientes;
- modelo completo de identidade e permissões;
- testes de disaster recovery.

---

## 21. Riscos e desafios

## 21.1. Riscos explicitamente mencionados

| Risco | Contexto |
|---|---|
| Estado incorreto de sessão | Uso de variáveis globais em pacotes com pools de conexão e reset de sessão |
| Bloqueios no banco | Execução de processos pesados ou chamadas externas no banco |
| Latência propagada | Integrações síncronas por API com dependências lentas |
| Falha em cadeia | Serviço síncrono indisponível pode afetar a transação de origem |
| Complexidade de erro em EDA | Consumidores precisam tratar casos positivos e negativos |

### 21.2. Desafios derivados do contexto

As observações abaixo são análises derivadas, não afirmações literais da reunião.

- A coexistência de países com TRON legados, sistemas locais e versões diferentes do core tende a exigir forte disciplina de integração.
- A adoção de eventos entre países pode demandar governança consistente de contratos de eventos, acesso, observabilidade e tratamento de falhas.
- A migração de processos PL/SQL para Java pode criar um período de convivência tecnológica e exigir critérios claros de responsabilidade.
- A combinação de Oracle Cloud e AWS, se confirmada, pode aumentar a necessidade de padrões comuns de automação, segurança e observabilidade.
- A descentralização da API de convivência, sob responsabilidade de cada país, pode exigir governança para evitar divergência entre implementações.

---

## 22. O que a reunião não permite concluir

Não é possível determinar com segurança:

1. o significado oficial de RIF, RIB, RIV ou “rift”;
2. os nomes corretos de vários componentes transcritos de forma imprecisa;
3. a estrutura exata dos esquemas de banco “TRXX de L” e “tron 2000 XX”;
4. a versão precisa do ambiente da República Dominicana;
5. se “hasper report” corresponde efetivamente a JasperReports;
6. se “FIS” é o nome oficial do compositor documental;
7. a identificação de “PIHETS” como nome oficial do ponto de entrada;
8. a identificação oficial dos conectores ou mensagens “SCOTMS”;
9. o provedor cloud principal efetivo do caso do Panamá, devido à inconsistência entre Oracle Cloud e “google en américa”;
10. a composição exata do disaster recovery de cada ambiente;
11. a arquitetura detalhada do Oracle na AWS;
12. a natureza dos arquétipos “mardo cero”;
13. os significados de DUP, RTE, CELFOS e TRM;
14. se os eventos possuem semântica de entrega ao menos uma vez, exatamente uma vez ou outra;
15. como são tratadas falhas, reprocessamentos e mensagens duplicadas;
16. como ocorre governança de API, eventos, tópicos e schemas;
17. quais países já utilizam a plataforma de eventos em produção;
18. quais são os responsáveis por produto, arquitetura, segurança, operações ou suporte;
19. quais métricas são usadas para avaliar sucesso das iniciativas;
20. quais prazos absolutos se aplicam ao roadmap.

---

## 23. Conclusão

A reunião descreve uma evolução arquitetural do ecossistema TRON/RIF baseada em separação de responsabilidades, maior padronização de integração e redução de acoplamento.

As APIs REST permanecem essenciais para executar operações síncronas e expor capacidades do core. A camada Business busca proteger consumidores da complexidade interna do TRON, enquanto a API Edge preserva uma relação mais direta com os domínios e estruturas do core.

A arquitetura orientada a eventos é apresentada como complemento, não substituição: ela propaga fatos já ocorridos e permite reações independentes, assíncronas e potencialmente múltiplas. Seus benefícios esperados incluem menor acoplamento, mais flexibilidade, melhor isolamento de falhas e atualização mais imediata em casos antes atendidos por cargas batch.

A plataforma também avança na retirada gradual de processamento e integrações externas do banco de dados, no uso de Java para determinadas tarefas, na configuração documental e na automação de infraestrutura em cloud. Porém, a transcrição não fornece detalhes suficientes para transformar essa visão em especificação técnica completa. Para esse fim, seriam necessários documentos adicionais sobre contratos, topologias, segurança, operação, versionamento, recuperação de falhas e responsabilidades.
