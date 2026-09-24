# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.academy-Reef.core-Trazas frontal.mp4`
**Data de processamento:** 24/09/2026 15:04:50
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Relatório Técnico-Funcional Multimodal — Rastreabilidade de Frontais no REEF.core
## NEWTron, novos frontais, classes Java, serviços, logs e investigação de erros

> **Base de evidências.** Este documento usa exclusivamente a transcrição Whisper e os Frames 05–09 fornecidos na solicitação. Trechos iniciais sem contexto ou corrompidos foram descartados.
>
> **Critério de certeza.** Informações legíveis nos frames ou compreensíveis na fala são fatos; reorganizações são explicações contextuais; deduções aparecem como **Análise**. Lacunas são declaradas sem preenchimento especulativo.
>
> **Nomenclatura.** O Whisper alterna “Rift Core/RIFCORE”, “Neutron/Newton” e “Tron”. Os slides exibem `Reef.core`, `NEWTron`, `TRON` e módulos `CORE_TRON_*`; estes nomes prevalecem quando há evidência visual.

---

## 1. Síntese executiva

A sessão é uma formação técnica sobre rastreabilidade nas camadas de frontal do REEF.core. A instrutora delimita que não tratará funcionalidade de negócio: ensina como seguir uma ação de interface até os serviços backend para descobrir quais elementos participam da execução e onde um erro pode ocorrer.

São comparadas duas construções. A arquitetura **GAIA**, usada pelo NEWTron, percorre JavaScript no cliente, controller Java no frontal servidor, serviço Java de backend e construção PL/SQL. A arquitetura **Nuevos Frontales** organiza componentes funcionais, managers, controllers e serviços, podendo alcançar serviços TRON/NEWTron, APIs ou TronWeb conforme a implementação. [Evidência Visual: Frame 06 @ 23:18]

O caso prático é o **Lanzador de tareas**: `Aceptar` aciona `plyPlyPssVSrv.runTskFns`, que chama `/api/nwt/ply/ply/pssV/runTskFns`; o controller `PlyPlyPssVController` recebe `pmTskVal`, e sua implementação permite localizar a lógica de negócio/backend correspondente. [Evidência Visual: Frames 08 @ 31:02 e 09 @ 34:54]

A mensagem central é combinar DevTools do navegador, pesquisa de código, tabela de erros por sessão quando disponível, traças de backend e logs por artefato/camada. A sessão reconhece que não detalha a comunicação exata entre Angular/frontend cliente e o backend-for-frontend Java, nem resolve o acesso do Peru ao código no Bitbucket.

## 2. Contexto e antecedentes

A instrutora apresenta o encontro como continuação da formação anterior sobre rastreabilidade de backend. O recorte desta sessão é o frontal do REEF.core; a próxima sessão retomaria logs e a definição de managers.

REEF.core possui outras aplicações que também operam contra TRON, como gestão de inadimplência e ficha de cliente, segundo exemplos orais. Elas foram construídas com metodologias diferentes e ficam fora do escopo. A fala supõe que gerem logs e tenham mecanismos próprios de acesso, mas não confirma que usem o mesmo fluxo demonstrado.

O escopo é NEWTron e novos frontais integrados à funcionalidade TRON, pois são os casos para os quais o time tem rastreabilidade acessível a partir do núcleo. O slide afirma que a construção de frontais evoluiu usando duas arquiteturas distintas. [Evidência Visual: Frame 06 @ 23:18]

A prática descrita responde a uma necessidade de diagnóstico: um erro apresentado no frontal pode ser apenas comunicação entre camadas. O código `20123` é citado como exemplo de retorno genérico, sem informar a causa funcional.

## 3. Problemas e necessidades identificados

### 3.1. Localizar o caminho da interface ao backend

**Problema.** A ação de tela não revela, sozinha, quais classes e serviços foram executados.

**Como ocorre.** Na GAIA, entre JavaScript e PL/SQL há controller Java, interface/implementação de serviço Java e Gaia PL Invoker. [Evidência Visual: Frame 07 @ 27:10]

**Impacto.** A investigação pode parar na tela sem chegar ao serviço backend que executa a lógica.

**Prioridade.** É o objetivo explícito da formação: identificar o caminho e o serviço backend acionado.

### 3.2. Diferenciar erro de frontal e erro controlado de backend

**Problema.** Uma falha exibida na interface pode não ser do frontal.

**Como ocorre.** Erro não controlado de frontal requer seguir interfaces e implementações; erro controlado de backend permite focar implementações para achar o PL chamado.

**Impacto.** O diagnóstico pode atuar na camada errada.

**Prioridade.** A distinção determina se será necessário percorrer toda a cadeia de classes ou priorizar a chamada backend.

### 3.3. Diagnosticar códigos genéricos entre camadas

**Problema.** Códigos como `20123` não revelam a causa funcional.

**Como ocorre.** No exemplo narrado, o código comunica um problema entre camadas, mas não explica por que a execução falhou.

**Impacto.** O retorno ao usuário/analista não permite correção direta.

**Prioridade.** É necessário consultar tabela de erros, código e traças dos pacotes/orquestradores envolvidos.

### 3.4. Isolar a requisição correta no navegador

**Problema.** Uma tela pode executar várias chamadas em segundo plano.

**Como ocorre.** A instrutora limpa/filtra Network, identifica serviço, entrada em Payload e resposta em Preview.

**Impacto.** A associação errada entre objeto, componente ou erro e requisição prejudica o rastreio.

**Prioridade.** DevTools é a fonte inicial de evidência de frontal.

### 3.5. Acesso insuficiente ao código-fonte local

**Problema.** O participante do Peru informa que recebe artefatos compilados nas releases, sem fontes nem Bitbucket.

**Como ocorre.** A equipe usa descompilador para tentar entender o fluxo.

**Impacto.** Fica difícil reproduzir a busca por JavaScript, controller, implementação e classe de negócio.

**Prioridade.** A apresentadora consultará a possibilidade de acesso, sem confirmá-lo.

## 4. Solução apresentada: visão conceitual

A solução é um processo de rastreabilidade técnica. Parte-se da funcionalidade de tela, captura-se a chamada, identifica-se o artefato frontend, percorrem-se classes Java e chega-se ao serviço backend/PL que concentra a investigação.

Na GAIA: JavaScript recolhe dados; controller Java os recebe; implementação do controller aponta para classe de serviço backend; implementação do serviço indica o serviço PL/NEWTron/TRON; Gaia PL Invoker atua como intérprete/tradutor na ligação com o backend, conforme a fala. [Evidência Visual: Frame 07 @ 27:10]

Nos novos frontais, a apresentação pode estar em HTML/Jade e há manager Java por componente funcional. O manager contém métodos como aceitar, validar e inicializar e pode usar serviços TRON/NEWTron, APIs ou controllers que alcançam TronWeb. A implementação interna das APIs não foi detalhada.

**Análise.** O método privilegia encadeamento explícito de artefatos e nomes de endpoint/dependência, em vez de confiar apenas na mensagem exibida pela tela.

## 5. Arquitetura e funcionamento: reconstrução lógica

Os slides demonstram arquitetura lógica, não infraestrutura física, rede, autenticação, mensageria, clusters ou deployment.

```text
ARQUITETURA GAIA / NEWTron

Frontal cliente: AngularJS + Bootstrap + jQuery
  Serviço JavaScript (ex.: plyPlyPssVSrv.runTskFns)
        ↓
Frontal servidor Java Spring
  Controller: interface + implementação
        ↓
Backend Java Spring
  Interface + implementação transacional
  Gaia PL Invoker
        ↓
Construção NWT PL/SQL (.sps / .spb / .pdc)
        ↓
Repositórios de dados Oracle
```

```text
ARQUITETURA NUEVOS FRONTALES

Frontal cliente: Angular + Bootstrap / componentes funcionais
        ↓
Frontal servidor Java Spring
  Managers por componente funcional
  Controllers / apresentação / orquestração
        ├─ Serviços de negócio TRON/NEWTron
        ├─ APIs (interior não detalhado)
        └─ TronWeb, em alguns frontais
        ↓
Backend Java / lógica de negócio → Oracle
```

O slide lista novo módulo de tramitação de expedientes, gestão de ordem de serviço, novo frontal de tesouraria, GDC e orquestrador Fuji. A fala não confirma que todos adotem a mesma rota. [Evidência Visual: Frame 06 @ 23:18]

No exemplo, o JavaScript usa a base `api/nwt/ply/ply/pssV`, define `runTskFns(pmTskVal)` e chama `httpSrv`. A interface Java mapeia `POST`; a implementação recebe `pmTskVal` e injeta `IsrCmnTskQry`, `IsrPrtLobTnf` e `IsrCmnRer`. A chamada final está cortada. [Evidência Visual: Frames 08 @ 31:02 e 09 @ 34:54]

## 6. Componentes e conceitos mencionados

### 6.1. REEF.core

Core/plataforma contextual da formação. Não há expansão da sigla, versão, infraestrutura ou limite funcional exposto.

### 6.2. TRON

Nome recorrente em serviços e repositórios `CORE_TRON_*`; é destino de serviços de negócio e da construção PL/SQL mostrada. A relação completa com REEF.core e TronWeb não foi definida.

### 6.3. NEWTron / NWT

O Whisper diz “Neutron/Newton”; os frames mostram `NEWTron`, `NWT` e caminhos `nwt`. Contextualmente a fala se refere ao NEWTron, construído com GAIA. [Evidência Visual: Frame 06 @ 23:18]

### 6.4. Arquitetura GAIA

Camada cliente AngularJS/Bootstrap/jQuery, frontal servidor Java Spring e backend Java Spring; o slide distingue lógica de apresentação, navegação, negócio, “escaparate” e dados. [Evidência Visual: Frame 06 @ 23:18]

### 6.5. Novos frontais

Arquitetura com componentes funcionais e managers Java especializados. Não usa o mesmo serviço JavaScript rastreado no caso GAIA, segundo a fala; isso não comprova ausência total de JavaScript, pois o slide mostra Angular/Bootstrap.

### 6.6. Manager

Classe Java ligada a componente funcional; reúne métodos como aceitar, validar e inicializar e pode chamar serviços, APIs ou TronWeb.

### 6.7. Controller Java

Recebe informação de tela e a direciona à classe Java de backend. Há interface com URL e implementação que revela chamada efetiva.

### 6.8. Serviço JavaScript

Elemento cliente que recolhe dados e chama o controller. `plyPlyPssVSrv.runTskFns` usa `httpSrv` e promise `$q`; resolve quando `objFormSrv.isFrmOk(...)` aprova o formulário. O snippet é parcial. [Evidência Visual: Frame 08 @ 31:02]

### 6.9. Gaia PL Invoker

Interface com `@GaiaPlInvoker` em `CORE_BK_NWT`; descrita oralmente como intérprete/tradutor de ligação ao backend NEWTron. Protocolo e implementação não foram mostrados.

### 6.10. Oracle

Repositório de dados exibido nos dois diagramas. Sem versão, esquema, modelo, disponibilidade ou mecanismo de acesso.

### 6.11. TronWeb

Camada de negócio citada para o novo frontal de tesouraria; contrato e componentes internos não foram demonstrados.

### 6.12. APIs de negócio

Rota citada para manutenção de fornecedores alcançar funcionalidade NEWTron. A apresentadora não sabe informar o tipo de API entre cliente e BFF.

### 6.13. Splunk

Ferramenta de logs citada oralmente e pronunciada como “Splunt”. A identificação como Splunk é contextual, não confirmada em frame.

## 7. Especificação funcional das telas e interfaces (OCR & Evidências Visuais)

### 7.1. Filtro de ruído visual

Os Frames 05–09 são slides e screenshots técnicos. Não há descrição de videoconferência, webcams, barras do sistema ou menus irrelevantes.

### 7.2. Comparação arquitetural

| Área observada | Nuevos Frontales | Arquitetura GAIA |
|---|---|---|
| Cliente | Angular/Bootstrap e componentes `ThpAcv`, `ThpPrs`, `Other` | AngularJS, Bootstrap e jQuery |
| Frontal servidor | Apresentação, orquestração, manager e controller especializados | Apresentação, navegação e controller |
| Backend Java | Serviços e lógica Java Spring | Serviços e lógica Java Spring |
| Dados | Oracle | Oracle |
| Elementos visuais | “fe view” para componentes | View/controller/service e widget/grid/service |

NEWTron é declarado como GAIA; os novos módulos listados usam Nuevos Frontales. [Evidência Visual: Frame 06 @ 23:18]

### 7.3. Matriz de artefatos GAIA

| Área técnica | Artefato | Papel descrito |
|---|---|---|
| `CORE_TRON_FE_NWT` cliente | Serviço JavaScript | Recolhe informação de tela. |
| `CORE_TRON_FE_NWT` servidor | Controller Java: interface + implementação | Interface define controller; implementação contém `@ResponseBody`, `@RealController` e chama serviço Java backend. |
| `CORE_TRON_BE_NWT` | `ISrFmlClgOpr.java` com `@GaiaService`; `SrFmlClgOpr.java` com `@NwtService` e `@Transaccional` | Serviço backend; há comentário com requisito funcional NWT. |
| `CORE_BK_NWT` | `ISrFmlClgOpr.java` com `@GaiaPlInvoker` | Intérprete, conforme fala/slide. |
| `CORE_BK_NWT` PL/SQL | `.sps`, `.spb`, `.pdc` | Construção NWT PL/SQL e exposição de serviço a outros clientes. |

[Evidência Visual: Frame 07 @ 27:10]

### 7.4. Tela TRON: Lanzador de tareas

| Elemento | Tipo/ação observada | Observação |
|---|---|---|
| `TAREA` | Campo com busca | Máscara, obrigatoriedade e valores não visíveis. |
| `ATRIBUTOS` | Seção expansível | Conteúdo fechado. |
| `Cancelar` | Botão | Função não detalhada. |
| `Aceptar` | Botão | Dispara `runTskFns` no exemplo. |

Não há mensagem de erro ou validação visível. [Evidência Visual: Frame 08 @ 31:02]

### 7.5. URL, JavaScript e HTTP observados

| Item | Evidência |
|---|---|
| URL destacada | `https://trn.desa.mapfre.net/nwt_fe-web/api/nwt/ply/ply/pssV/runTskFns` |
| Base JavaScript | `api/nwt/ply/ply/pssV` |
| Método | `runTskFns(pmTskVal)` |
| Transporte | `httpSrv(url + 'runTskFns', {'pmTskVal': ...})` |
| Resultado | Promise resolve com `objFormSrv.isFrmOk(...)`; reject nos demais casos |
| Mapeamento Java | `@RequestMapping(...runTskFns, method = RequestMethod.POST)` |
| Parâmetro | `@RequestParam String pmTskVal` |

“desa” parece ser indicador de ambiente, mas significado, autenticação, headers, payload completo e contrato de resposta não podem ser confirmados. [Evidência Visual: Frames 08 @ 31:02 e 09 @ 34:54]

### 7.6. Repositório e classes exibidos

| Arquivo | Evidência | Papel |
|---|---|---|
| `PlyPlyPssVController.java` | `@Controller`, interface, POST, `@ResponseBody`, `pmTskVal` | Localiza contrato/endpoint. |
| `PlyPlyPssVControllerImpl.java` | `@RealController`, `@Autowired`, logger e `runTskFns` | Ponto para identificar serviço backend. |

O caminho visual é `MAP_CORE_TRON / TRON_BE_FRONTALES / CORE_TRON_FE_NWT`; `master` e commit `3d13307` são metadados pontuais, não política de versionamento. [Evidência Visual: Frame 09 @ 34:54]

## 8. Modelo de integração

Há chamada HTTP interna JavaScript → controller Java: rota `/api/nwt/ply/ply/pssV/runTskFns`, método `POST` e parâmetro `pmTskVal`. Isso confirma requisição/resposta síncrona no exemplo, mas não contrato integral, serialização, autenticação, timeout, gateway ou padrão REST corporativo.

GAIA conecta frontend, controller, serviço Java backend, Gaia PL Invoker e PL/SQL. O diagrama mostra APIs; a fala cita novos frontais que chegam por APIs. Não foram mostrados endpoints dessas APIs, mensageria, eventos, filas, arquivos batch ou integrações externas.

Caminhos narrados para managers: (1) serviços TRON/NEWTron; (2) APIs de negócio na manutenção de fornecedores; (3) controllers até TronWeb no novo frontal de tesouraria. Não há GAP analysis global/local nem catálogo de sistemas externos.

## 9. Modelo operacional

### 9.1. Configuração antes da operação

O diagnóstico exige capturar o serviço no navegador, localizar artefatos no repositório e ativar traças nas camadas backend necessárias. A fala afirma que não se ativam traças no frontal como no backend; no frontal consultam-se logs.

É citada uma tabela de globais de sessão. NEWTron e novos frontais seriam sessões desconectadas da base; ao chamar lógica de negócio, enviam dados de tela e globais/contexto. Nome técnico, estrutura, persistência e ciclo de vida não foram mostrados.

A tabela de erros pode registrar erros backend por sessão quando a geração de traças do usuário está afirmativa. Nome, comandos de ativação, autorização, retenção e esquema não foram informados.

### 9.2. Dados compartilhados em tempo real

Não houve demonstração de replicação entre países/instâncias. A troca é a de dados de tela e globais durante a requisição; isso não comprova sincronização persistente.

Há logs por camada, por API e por componentes como terceiros, fornecedores, ordens, sinistros e emissão. A infraestrutura fornece acesso à ferramenta de logs. Em exemplo de integração há duas máquinas, uma NEWTron e outra TronWeb. Releases, hotfixes, SLAs e suporte não foram detalhados.

## 10. Governança, versionamento e evolução

### 10.1. Procedimentos corporativos mencionados

Os slides identificam ACT — Área de Soluciones Tecnológicas Corporativas. A apresentação seria publicada em módulo “comunes” de ambiente pronunciado como “RIFACADEMI/RIFACADEMY”, onde a pergunta técnica seria encaminhada. A grafia oficial não está comprovada.

A área de infraestrutura fornece acessos a logs. Não foram exibidos processos formais de aprovação, auditoria ou gestão de mudança.

### 10.2. Evolutivos e mudanças no núcleo

A sessão ensina leitura de código/logs, não quem altera o core. O encaminhamento concreto é consultar um colega sobre acesso do Peru ao Bitbucket. Não há decisão, SLA ou responsável final.

Anotações como `@NwtService`, `@Transaccional`, `@GaiaService`, `@GaiaPlInvoker` e `@RealController` são padrões técnicos visíveis, não política de governança.

### 10.3. Estado de versões

Os screenshots mostram `master` e `3d13307`. Não há versões de REEF.core, NEWTron, TRON, Java, Spring, Oracle, Angular ou ferramenta de logs. “Releases” é citado apenas como distribuição de compilados ao Peru.

## 11. Organização das equipes e responsabilidades

A instrutora domina mais backend que frontal e não responde à comunicação cliente/BFF. Os papéis demonstrados são:

- **Analista/desenvolvedor técnico:** usa DevTools, tabela de erros, repositórios e traças backend.
- **Equipe de desenvolvimento:** deve ativar traças nos pacotes/orquestradores do caso de erro.
- **Infraestrutura:** fornece acesso a logs.
- **Especialista de frontal:** será consultado para a dúvida de comunicação Angular/BFF.
- **Equipe do Peru:** usa NEWTron/APIs TRON, recebe binários e solicita fontes/Bitbucket.

Não são citados Product Managers, Product Owners, Scrum Masters, arquitetos formais ou matriz de responsabilidade.

## 12. Modelo de produto

### 12.1. Produtos pré-configurados citados

Não há produtos de negócio, coberturas ou catálogo comercial. Tramitação de expedientes, ordem de serviço, tesouraria, GDC, Fuji, fornecedores e sinistros são módulos/frontais ou exemplos técnicos.

### 12.2. Direção de padronização

A padronização é arquitetural e de rastreabilidade: nomenclaturas relacionadas, interface/implementação e managers por componente. A tabela de definição de managers é prometida para outra sessão.

**Análise.** Esses padrões facilitam investigação, mas coexistem rotas por serviços, APIs e TronWeb; não há uniformidade total comprovada.

## 13. Terceiros, atividades e modelo de dados

### 13.1. Papel do módulo de terceiros

A demonstração narrativa usa funcionalidade do frontal de terceiros; Network exibiria companhia e dado de terceiro na entrada. O frame dessa execução não foi fornecido e os nomes completos são ilegíveis. Isso não permite descrever cadastro único ou modelo de entidades.

### 13.2. Atividades e papéis

`ThpAcv` e `ThpPrs` aparecem como componentes funcionais. A fala cita atividade de pessoa e endereço. Siglas, atividades padrão e papéis não são definidos.

### 13.3. Incompatibilidades e regras de validação

Não há regras entre atividade, documento, perfil ou tipo de terceiro. A menção a dados obrigatórios/incorretos é apenas exemplo de erro funcional esperado, não regra concreta.

### 13.4. Proteção de dados e consentimentos

Não há LGPD, GDPR, consentimento, mascaramento, criptografia, retenção ou controles de acesso demonstrados.

## 14. Produtos, tarifas, impostos e regras locais

### 14.1. Tarifação e impostos

Não foram tratados tarifa, tributos, moeda ou regras fiscais.

### 14.2. Gerador de produtos

Não foi exibido gerador de produtos, cobertura ou parametrização comercial.

### 14.3. Rating e motores de cálculo

Não há DUP, RT ou motores de precificação. São citadas somente camadas técnicas TRON/NEWTron, APIs e TronWeb.

## 15. Sinistros, documentos e notificações

### 15.1. Documentos e faturas

Não há apólices, faturas, certificados, recibos ou layouts. Operações de sinistro são exemplo oral de novo frontal que usa serviços NEWTron, sem fluxo funcional detalhado.

### 15.2. Notificações

Não há e-mail, SMS, carta, push ou notificação de cliente. Logs são diagnóstico técnico.

### 15.3. Limitação de formatos corporativos

Não há padrões documentais, formatos ou adaptações locais apresentados.

## 16. Cosseguro e resseguro

Não foram abordados cosseguro, resseguro, Re21, cessões, retenções ou contratos.

## 17. Casos concretos mencionados

### 17.1. NEWTron — Lanzador de tareas

**País / cenário.** Nenhum país. O domínio contém `desa`, sem semântica confirmada.

**Arquitetura adotada.** GAIA: JavaScript, controller interface/implementação, classe Java de negócio, invoker e PL/SQL.

**Diferenciais.** `Aceptar` chama `runTskFns`; recebe `pmTskVal`; há o comentário `ISI-8968 - EJECUTAR TRATAR tarea poliza`. [Evidência Visual: Frames 08 e 09]

**Situação e lição.** Exemplo didático; a lógica completa não está visível.

### 17.2. Operações de sinistro — novos frontais

**País / cenário.** Não informado.

**Arquitetura adotada.** Uso da camada de negócio e serviços NEWTron, segundo a fala.

**Diferenciais.** Sem manager, endpoint, serviço ou tela demonstrados.

**Situação e lição.** Apenas exemplo de rota possível; não documenta processo de sinistro.

### 17.3. Manutenção de fornecedores — novos frontais

**País / cenário.** Não informado.

**Arquitetura adotada.** Acesso a funcionalidade NEWTron por APIs.

**Diferenciais.** O interior das APIs é declarado como não tratado.

**Situação e lição.** Nem todo novo frontal usa o mesmo caminho GAIA.

### 17.4. Novo frontal de tesouraria — TronWeb

**País / cenário.** Não informado.

**Arquitetura adotada.** Managers podem chegar a TronWeb por outros elementos/controllers.

**Diferenciais.** Não há diagrama específico nem implementação.

**Situação e lição.** Demonstra diversidade de rotas.

### 17.5. Peru — acesso ao código-fonte

**País / cenário.** Uso intensivo de NEWTron e APIs TRON.

**Arquitetura adotada.** Não detalhada; a questão é acesso a repositórios.

**Diferenciais.** Recebe compilados nas releases e utiliza descompilador.

**Situação e lição.** Acesso Bitbucket será consultado; não há solução confirmada.

## 18. Roadmap e evolução

A evolução explicitamente anunciada é didática: a próxima sessão retomará logs por artefato e poderá mostrar tabela de definição de managers. A coexistência de GAIA e Nuevos Frontales é antecedente técnico, não roadmap datado.

Não há cronograma por país, releases futuros, migração de legados, descontinuação de GAIA ou substituição de NEWTron/TronWeb.

## 19. Números e indicadores citados

| Indicador / Métrica | Valor declarado | Contexto |
|---|---:|---|
| Página de encerramento | 20 | Frame 05. |
| Página do comparativo | 21 | Frame 06. |
| Página da matriz GAIA | 23 | Frame 07. |
| Página do exemplo JavaScript | 24 | Frame 08. |
| Arquiteturas comparadas | 2 | Nuevos Frontales e GAIA. |
| Métodos exemplo de manager | 3 | Aceitar, validar, inicializar. |
| Código de erro | `20123` | Genérico entre camadas. |
| Máquinas no exemplo INT | 2 | NEWTron e TronWeb. |
| Requisito | `ISI-8968` | Tratar tarefa/pólice. |
| Commit | `3d13307` | Metadado pontual. |
| Parâmetro | `pmTskVal` | Entrada do endpoint. |

Não há volumes, latência, SLA, taxa de erro ou métricas de desempenho.

## 20. Mapa cronológico integrado da sessão (Fala + Telas)

> Referência temporal: os Frames 01–03 foram descartados como videoconferência; o Frame 04 e o Frame 10 são tratados com cautela, pois a planilha e o conteúdo parcial não suportam extrações além do texto legível.

| Timestamp | Frame / Tela | Evidência visual chave & OCR | Tópico na fala |
|---|---|---|---|
| 19:26 | Frame 05 | “Gestión de Trazas en Reef.core”; fim de backend PL. | Contexto: agora será tratado frontal. |
| 23:18 | Frame 06 | GAIA e Nuevos Frontales; Angular, Spring, Oracle. | Escopo e diferenças arquiteturais. |
| 27:10 | Frame 07 | Módulos `CORE_TRON_*`, interfaces, invoker e PL/SQL. | Cadeia JS/controller/serviço/backend. |
| 31:02 | Frame 08 | Lanzador, URL `runTskFns`, serviço JavaScript. | Ação `Aceptar` e rastreio inicial. |
| 34:54 | Frame 09 | Controllers Java, POST e `pmTskVal`. | Interface/implementação para alcançar backend. |
| Sem frame | Demonstração no navegador. | F12, Console, Network, Payload, Preview; tabela de erros. | Erro `20123`, busca e traças. |
| Sem frame | Demonstração de logs. | Logs por camada/API/componente; ferramenta pronunciada “Splunt”. | Classe Java e serviço backend via log. |
| Sem frame | Perguntas finais. | Comunicação BFF e acesso Bitbucket Peru. | Lacunas e encaminhamentos. |

## 21. Perguntas e respostas relevantes (Q&A Exaustivo)

### 21.1. Como frontend cliente comunica com middleware Java / BFF?

**Pergunta.** Há API intermediária entre Angular/cliente e backend-for-frontend? Como a informação chega ao BFF?

**Resposta.** A apresentadora não sabe responder, pois não domina a construção de frontal. Sabe que managers usam APIs de negócio, mas não conhece tipo de API nem comunicação com BFF; consultará um colega.

**O que esclarece.** Não há base para afirmar protocolo, endpoint ou contrato entre Angular e BFF.

### 21.2. O que fazer quando a interface devolve `20123`?

**Pergunta.** Como investigar código de comunicação que não revela causa funcional?

**Resposta.** Verificar tabela de erros da sessão com geração de traças ativa; se insuficiente, localizar serviço no navegador, JavaScript, controller, implementação, lógica de negócio e PL; equipe ativa traças nos pacotes/orquestradores.

**O que esclarece.** `20123` não é causa raiz; a resposta define diagnóstico escalonado.

### 21.3. É possível ativar traças no frontal?

**Pergunta.** Como instrumentar frontal durante investigação?

**Resposta.** Não é possível ativar traças no frontal como no backend; consulta-se log de funcionalidade e ativam-se traças em backend.

**O que esclarece.** Logs de frontal e traças backend possuem papéis diferentes.

### 21.4. Onde ver serviço, entrada e resposta da chamada?

**Pergunta.** Onde obter evidência da execução do frontend?

**Resposta.** Chrome/F12: Console para erros JavaScript; Network/Headers para serviço; Payload para entrada; Preview para resposta.

**O que esclarece.** DevTools inicia a correlação entre ação, URL, entrada e resposta.

### 21.5. Como localizar controller e backend pela URL?

**Pergunta.** Como seguir a chamada a partir do nome/URL?

**Resposta.** Buscar serviço JavaScript/URL no fonte, abrir repositório NEWTron, localizar controller e priorizar implementação; ela aponta classe de negócio cuja implementação revela PL/backend.

**O que esclarece.** Interfaces confirmam rota; implementações revelam chamada efetiva.

### 21.6. Como logs são organizados e quem concede acesso?

**Pergunta.** Como acessar e dividir logs?

**Resposta.** Há logs por camada (NFE/NBE), API e componentes como terceiros, fornecedores, ordens, sinistros e emissão; infraestrutura fornece acesso. Exemplo INT usa duas máquinas, NEWTron e TronWeb.

**O que esclarece.** Há segmentação por artefato/ambiente, sem detalhes de índices, credenciais ou retenção.

### 21.7. Como obter Bitbucket e fontes para Peru?

**Pergunta.** A equipe recebe compilados, não fontes; como ter acesso ao repositório?

**Resposta.** A apresentadora perguntará se é possível e retornará por e-mail.

**O que esclarece.** Não houve acesso aprovado na reunião.

### 21.8. Como tratar outras aplicações REEF.core fora do escopo?

**Pergunta.** O método vale para todos os frontais que chamam TRON?

**Resposta.** Outras aplicações provavelmente geram logs, mas foram desenvolvidas de outro modo e não serão tratadas.

**O que esclarece.** Não se deve generalizar a técnica sem validar arquitetura/ferramentas de cada aplicação.

## 22. Limitações reconhecidas

1. A apresentadora não domina a comunicação detalhada frontend/BFF.
2. A formação exclui funcionalidade de negócio.
3. Outros frontais REEF.core podem usar metodologias/logs diferentes.
4. A tabela de managers é adiada para próxima sessão.
5. Não há ativação de traças no frontal como no backend; há logs.
6. `20123` é genérico e não traz causa funcional.
7. Ferramenta/acesso a logs dependem de infraestrutura.
8. Acesso Peru/Bitbucket não foi confirmado.
9. Grafias de termos Whisper como “RIFACADEMI” e “Splunt” não são seguras.
10. Código dos frames está cortado antes da cadeia completa.

## 23. Riscos e desafios

### 23.1. Riscos explicitamente mencionados

- Erro genérico pode ocultar mensagem funcional.
- Sem traças/tabela de erros, o diagnóstico precisa atravessar classes manualmente.
- GAIA, managers, APIs e TronWeb impedem supor fluxo único.
- Binários sem fonte levam a descompilação local.
- Comunicação cliente/BFF depende de especialista posterior.

### 23.2. Desafios derivados do contexto

- **Análise:** rastreio depende de coerência entre URL, JavaScript, controller e classe de negócio.
- **Análise:** logs segmentados exigem selecionar corretamente ambiente, máquina e artefato.
- **Análise:** globais de sessão podem conter contexto ausente do Payload observado.
- **Análise:** APIs encapsulam comportamento não detalhado e reduzem visibilidade.
- **Análise:** acesso desigual a repositório/logs pode criar assimetria entre times centrais e locais.

## 24. Transformações estruturais identificadas

1. **GAIA para Nuevos Frontales:** coexistem JavaScript/controller/serviço/invoker e managers por componente com várias rotas.
2. **Backend isolado para rastreabilidade ponta a ponta:** a sessão liga DevTools de frontal a serviços backend/PL.
3. **Conceitos para componentes funcionais:** terceiros, atividade e endereço são tratados como componentes com managers.
4. **Pesquisa de código para logs segmentados:** logs podem revelar classe Java e encurtar investigação.

São leituras da evolução relatada; não há programa formal de modernização ou datas de migração.

## 25. O que a reunião NÃO permite concluir

- Protocolo, autenticação, headers, payload/resposta completos, gateway ou timeout de APIs/BFF.
- Implementação interna de Gaia PL Invoker, managers, APIs ou TronWeb.
- Lógica completa de `PlyPlyPssVControllerImpl.runTskFns` e serviços chamados.
- Banco além de Oracle; schema, tabela de globais/erros, transações, retenção ou acesso.
- Causa raiz de `20123`, orquestrador/pacotes afetados ou correção.
- Grafia/natureza oficial de “RIFACADEMI” e “Splunt”.
- Política de permissões, branch, distribuição de fontes ou garantia de Bitbucket Peru.
- Regras de negócio para sinistros, fornecedores ou tesouraria.
- Países adicionais, tributos, privacidade, SLA, DR, nuvem, rede ou mensageria.

## 26. Glossário terminológico, siglas e entidades

| Termo / Sigla | Significado / Expansão | Papel |
|---|---|---|
| REEF.core | Não expandido | Core/plataforma da formação. |
| TRON | Não expandido | Serviços/construção backend. |
| NEWTron / NWT | Não expandido | Frontal associado a GAIA e caminhos `nwt`. |
| GAIA | Não expandido | Arquitetura do NEWTron. |
| Nuevos Frontales | Novos frontais | Arquitetura com managers por componente. |
| FE / BE | Frontend / Backend | Camadas referidas em `CORE_TRON_*`. |
| `CORE_TRON_FE_NWT` | Módulo técnico | JavaScript e controllers de frontend. |
| `CORE_TRON_BE_NWT` | Módulo técnico | Serviços Java backend. |
| `CORE_BK_NWT` | Módulo técnico | Invoker e construção PL/SQL. |
| Manager | Classe Java | Métodos de componente funcional. |
| Controller | Classe/interface Java | Endpoint entre tela e serviço backend. |
| `@RealController` | Anotação visível | Implementação de controller; sem semântica completa. |
| `@ResponseBody` | Anotação visível | Padrão de controller mostrado. |
| `@GaiaService` | Anotação visível | Interface de serviço backend. |
| `@GaiaPlInvoker` | Anotação visível | Interface intérprete Java/PL. |
| `@NwtService` | Anotação visível | Classe backend exibida. |
| `@Transaccional` | Anotação visível | Sem comportamento detalhado. |
| PL/SQL | Linguagem/artefato | Arquivos `.sps`, `.spb`, `.pdc`. |
| Oracle | SGBD exibido | Repositório de dados. |
| TronWeb | Não expandido | Camada de negócio do caso tesouraria. |
| `plyPlyPssVSrv` | Serviço JavaScript | Exemplo de tratar tarefa/pólice. |
| `runTskFns` | Método/rota | Ação do lançador de tarefas. |
| `pmTskVal` | Parâmetro | Valor de tarefa no endpoint. |
| `PlyPlyPssVController` | Interface Java | Declara endpoint. |
| `PlyPlyPssVControllerImpl` | Classe Java | Implementa controller e revela próxima chamada. |
| `ISI-8968` | Identificador | Requisito “EJECUTAR TRATAR tarea poliza”. |
| DevTools / F12 | Ferramenta navegador | Console e Network. |
| Payload / Preview | Abas Network | Entrada e resposta da chamada. |
| `20123` | Código de erro | Comunicação entre camadas, não causa funcional. |
| Globais de sessão | Conceito | Contexto enviado à lógica de negócio. |
| Splunk | Identificação contextual | Ferramenta de logs pronunciada aproximadamente. |
| Bitbucket | Repositório | Código demonstrado e acesso solicitado. |
| ACT | Área de Soluciones Tecnológicas Corporativas | Rodapé dos slides. |

## 27. Conclusões principais

A formação estabelece um método de rastreabilidade de frontais: coletar evidência no navegador e atravessar artefatos de código até o backend. Em NEWTron/GAIA, o caminho é JavaScript, controller, serviço Java, invoker e PL/SQL; em novos frontais, managers podem usar serviços, APIs ou TronWeb.

`runTskFns` concretiza o método: `Aceptar` gera URL, serviço JavaScript e controller cuja implementação identifica o backend. Diante de `20123`, a estratégia é verificar erros por sessão, rastrear classes e ativar traças backend.

DevTools e logs por camada complementam a navegação de código. Persistem lacunas sobre BFF, APIs internas, infraestrutura, segurança, dados e acesso Bitbucket no Peru; nenhuma delas foi preenchida por inferência.
