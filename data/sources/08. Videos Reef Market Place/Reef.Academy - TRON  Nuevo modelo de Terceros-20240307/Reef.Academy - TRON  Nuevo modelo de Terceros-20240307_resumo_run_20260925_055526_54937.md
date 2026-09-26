# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.Academy - TRON  Nuevo modelo de Terceros-20240307.mp4`
**Data de processamento:** 25/09/2026 05:59:27
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Análise estruturada — Capacitação REEF/TRON: Ramos Técnicos e novo modelo de dados de Terceiros

## 1. Síntese executiva

A sessão foi uma capacitação técnica sobre o sistema **TRON**, apoiada pela documentação disponível no portal **MAPFRE Marketplace / REEF**. O encontro teve dois blocos principais:

1. conclusão da explicação sobre a configuração de **Ramos Técnicos**, incluindo controles antifraude, regras operacionais corporativas, contabilização de prêmios, seleção externa de riscos e inativação lógica;
2. continuação da apresentação do **novo modelo de dados de Terceiros**, com foco nos dados de segurados, contatos, documentos alternativos, representantes legais, consentimentos, endereços, meios de cobrança e pagamento e informações analíticas.

A mensagem central é que TRON evoluiu de um modelo de terceiros mais restrito e concentrado em poucas estruturas para um modelo mais flexível, multirregistro, histórico e apto a suportar necessidades locais, comerciais, regulatórias e de prevenção a fraudes. A evolução não elimina automaticamente o modelo anterior: ambos podem coexistir temporariamente entre entidades MAPFRE atendidas.

A capacitação também deixou claros alguns limites: várias capacidades são apenas estruturas de dados ou marcas de configuração; para produzirem efeito operacional, precisam de processos locais, regras de negócio, integrações ou tratamentos adicionais. A documentação e a configuração do núcleo oferecem mecanismos, mas não substituem a definição operacional de cada país.

---

## 2. Escopo, fontes e confiabilidade

Esta análise foi construída exclusivamente a partir de:

- transcrição automática da sessão, sujeita a ruído e erros de reconhecimento;
- evidências visuais extraídas de telas e slides;
- perguntas e respostas ao fim da reunião.

### Convenções adotadas

- **Fato explícito:** informação afirmada na fala ou visível nas telas.
- **Explicação contextual:** reorganização das explicações apresentadas, sem acrescentar fatos.
- **Leitura analítica:** inferência lógica sinalizada explicitamente como tal.

Há termos cuja transcrição parece degradada. Por exemplo:

- “**Platea**” aparece de forma consistente no contexto de plataforma antifraude e também está visível na documentação como `PLATEA`;
- “**ACO**” é apresentado como ligado à Área Corporativa de Operações, mas a sigla não é expandida integralmente;
- “**TRON**, **TronWeb** e **NewTron**” são citados, porém a sessão não detalha sua arquitetura interna, tecnologias, banco de dados, infraestrutura ou modelo de implantação;
- algumas referências a tabelas e códigos foram parcialmente perdidas pela transcrição. Onde o código não é inteligível, esta análise preserva a função explicada sem inventar identificadores.

---

## 3. Contexto e antecedentes

A reunião retoma uma capacitação anterior. O instrutor informa que havia ficado pendente a conclusão do tema de **estrutura de produtos**, especialmente a seção de **Ramos Técnicos**, antes de iniciar ou retomar a explicação do módulo de **Terceiros**.

O portal visualizado é o **MAPFRE Marketplace**, em um componente denominado **“documentación reef”**, cujo owner é `map-capacitacion` e lifecycle é `wip` [Frame 02, 07:56]. A estrutura de capacitação inclui ao menos as áreas:

- Infraestructura;
- Arquitectura;
- Metodología;
- Desarrollo;
- TRON;
- sessões de formação.

No bloco de TRON, a documentação navega pela definição de módulos comuns e estrutura de produto, chegando à configuração de **Ramo Técnico** [Frame 04, 15:47]. Posteriormente, a apresentação consulta termos comuns, tipos funcionais e diagramas navegáveis do domínio de Terceiros [Frames 05 a 07].

A apresentação não é uma demonstração de implantação nem de desenvolvimento de código. Ela se concentra no entendimento funcional e de dados do sistema, na finalidade de propriedades e tabelas e em como esses mecanismos podem ser empregados pelas entidades locais.

---

## 4. Problemas e necessidades tratados

### 4.1 Necessidade de controle antifraude no ciclo securitário

O sistema precisa permitir controles de risco e fraude tanto na:

- emissão e gestão de apólices e contratos;
- gestão de sinistros e prestações.

A necessidade é apresentada como uma integração entre TRON e uma plataforma antifraude chamada **PLATEA**. A intenção é identificar precocemente riscos potencialmente fraudulentos e prevenir fraudes no momento da contratação [Frame 04, 15:47].

### 4.2 Restrições do modelo anterior de Terceiros

O instrutor relembra que o modelo antigo apresentava restrições para certos conceitos. O exemplo mais claro são os endereços: anteriormente o modelo permitia apenas **três endereços**, enquanto o novo modelo passa a operar com registros múltiplos.

Outros elementos também são citados como tendo limitações ou estruturas anteriores específicas:

- contatos;
- meios de cobrança e pagamento;
- contas bancárias e cartões;
- dados de segurados;
- tratamento de terceiros não desejados.

### 4.3 Necessidade de dados mais completos para áreas além da operação

A evolução do modelo de Terceiros não foi apresentada apenas como uma mudança técnica. O objetivo inclui enriquecer a informação disponível para áreas como:

- marketing;
- controles antifraude;
- prevenção à lavagem de dinheiro;
- atendimento a obrigações regulatórias;
- processos comerciais e de análise de perfil.

A reunião enfatiza que a companhia local deve executar seus próprios controles conforme sua regulamentação aplicável.

### 4.4 Necessidade de rastreabilidade e histórico

O novo modelo busca manter a história das alterações em dados de terceiros, identificando:

- quem realizou a alteração;
- quando ela foi realizada;
- quais mudanças ocorreram.

A estratégia operacional recorrente é a **inativação lógica**, e não a exclusão física. Após um dado validado ser alterado ou deixar de ser aplicável, o comportamento recomendado é inativá-lo, preservando seu histórico.

---

## 5. Solução e direcionamento apresentados

A solução apresentada é uma combinação de:

- parametrização do produto por meio de Ramos Técnicos;
- controles e integrações de risco, quando aplicáveis;
- evolução do modelo de dados de Terceiros;
- capacidade de adaptação local por configuração, validações e processos complementares;
- manutenção de histórico das informações;
- utilização de dados estruturados para fins operacionais, comerciais, regulatórios e analíticos.

O novo modelo não deve ser entendido como uma regra fixa e plenamente automatizada para todos os países. O instrutor reforça que vários comportamentos dependem de:

- definição da entidade local;
- legislação local;
- configuração de catálogos;
- validações no frontal;
- processos adicionais implementados localmente;
- cargas batch;
- integrações ainda inexistentes ou não descritas.

---

## 6. Arquitetura lógica consolidada

A reunião não apresentou um diagrama arquitetural completo de infraestrutura. A representação abaixo é uma **consolidação analítica**, baseada nas relações funcionais explicitadas:

```text
Usuários / Frontal TRON
        ↓
Validações configuráveis por país, atividade e tipo de pessoa
        ↓
Módulos TRON
├── Estrutura de Produto / Ramos Técnicos
│   ├── Emissão de apólices e contratos
│   ├── Suplementos
│   ├── Contabilização de prêmios
│   ├── Seleção externa de riscos, quando configurada
│   └── Controles técnicos
│
└── Módulo de Terceiros
    ├── Segurados
    ├── Contatos
    ├── Direções
    ├── Documentos alternativos
    ├── Representantes legais
    ├── Consentimentos
    ├── Acionistas
    ├── Terceiros não desejados
    ├── Obrigações fiscais
    ├── Dados analíticos
    └── Meios de cobrança e pagamento
        ↓
Integrações e tratamentos externos / locais
├── PLATEA — plataforma antifraude
├── Serviço externo de seleção de riscos, quando habilitado
├── Processos locais de compliance e prevenção à lavagem de dinheiro
├── Processos regulatórios
└── Cargas batch para informação analítica
```

Essa estrutura não permite concluir:

- quais APIs, protocolos ou padrões de mensageria são utilizados;
- se PLATEA ou seleção de riscos operam de forma síncrona ou assíncrona;
- quais bancos de dados ou tecnologias de armazenamento sustentam o modelo;
- como ocorre a autenticação entre os componentes;
- quais mecanismos de observabilidade, auditoria técnica, CI/CD ou recuperação de desastre existem.

---

## 7. Ramos Técnicos: propriedades e funcionamento

## 7.1 PLATEA: controles antifraude

A documentação apresenta PLATEA como uma plataforma tecnológica antifraude criada para MAPFRE e utilizada para MAPFRE. A finalidade é aplicar indicadores de fraude e níveis de risco associados, permitindo ao sistema transacional realizar controles.

As propriedades visíveis para o Ramo Técnico permitem indicar se devem ser aplicados controles antifraude em:

- processos de gestão de apólices e contratos;
- processos de gestão de sinistros e prestações.

Quando os indicadores e níveis de severidade assim exigirem, o resultado pode ser a definição e execução de controles técnicos que deixam operações de emissão ou sinistro **retidas por controle**.

### Implicação

A integração é apresentada como mecanismo de bloqueio ou retenção técnica da operação diante de determinadas avaliações de risco. A reunião não detalha:

- os indicadores concretos utilizados;
- a escala de severidade;
- a lógica de decisão;
- os responsáveis pela liberação;
- os fluxos de exceção;
- a forma técnica de integração com PLATEA.

---

## 7.2 ACO e Processo Proativo de Marcas

A documentação também apresenta propriedades relacionadas a **ACO**, descrito verbalmente como vinculado à Área Corporativa de Operações.

O mecanismo é comparado a PLATEA, mas não é idêntico. Enquanto PLATEA opera com indicadores antifraude disponibilizados pela plataforma, o processo de **marcas** é orientado às definições de cada companhia local sobre o que deseja controlar.

As propriedades destacadas são:

- aplicação ou não do Processo Proativo de Marcas;
- número de anos considerados na busca dos dados relacionados às marcas.

As marcas são explicadas no contexto do módulo de Terceiros. Um exemplo dado é o de uma pessoa que, por motivos previamente identificados — como um comportamento ou histórico considerado relevante pela companhia — deva ser submetida a controle quando tentar realizar uma emissão ou outro tipo de operação.

Quando o processo estiver ativo, podem ser executados controles técnicos capazes de reter operações de:

- cotação;
- emissão;
- suplementos.

### Relação de causa e efeito

```text
Informação ou marca relevante sobre um terceiro
        ↓
Configuração local do ramo para aplicar o processo
        ↓
Consulta a tabelas ou catálogos de suporte
        ↓
Execução de controles técnicos
        ↓
Operação pode ser retida para controle
```

### Limite explícito

A reunião não especifica:

- a taxonomia completa de marcas;
- a origem dos dados;
- as tabelas concretas consultadas;
- regras de aprovação, desbloqueio ou rejeição;
- se o processo é executado sempre de forma automática.

---

## 7.3 Regeneração de suplementos retroativos

A propriedade **“Regenerar Suplementos Retroactivos”** é apresentada como descontinuada e obsoleta no núcleo do sistema. A documentação é explícita: ela não deve ser usada nem reutilizada para propósitos locais [Frame 04, 15:47].

Originalmente, a propriedade indicava a TronWeb / NewTron se, após a autorização de controles técnicos, poderia continuar a regeneração de suplementos anulados por um suplemento retroativo.

### Direcionamento

Trata-se de funcionalidade histórica mantida na documentação para contexto, e não de uma capacidade recomendada para novas configurações.

---

## 7.4 Atributo “Real” do Ramo Técnico

A propriedade **Real** indica que um Ramo Técnico pode ser utilizado no processo de gestão de apólices e contratos, pois está habilitado para emissão.

O contraste apresentado é o ramo de código genérico **999**:

- é fictício;
- necessário para uso interno e exclusivo da aplicação;
- não deve ser utilizado para emitir apólices;
- é o caso citado em que a marca de ramo real deve permanecer desativada.

---

## 7.5 Data contábil para contabilização de prêmios

A sessão aborda uma evolução na definição da data contábil usada para contabilizar prêmios de apólices e seus movimentos.

A documentação visível lista três opções [Frame 05, 19:42]:

| Tipo | Descrição |
|---|---|
| 1 | Maior data entre a data contábil e a data de emissão do suplemento |
| 2 | Por objeto |
| 3 | Maior data entre a data contábil e a data de efeito do suplemento |

O instrutor explica que:

- havia uma definição anterior baseada na tabela de datas de processo;
- a evolução passou a contemplar especificamente a data contábil de suplementos;
- a configuração ocorre no Ramo Técnico;
- a escolha determina como a operação de emissão obtém a data contábil a ser usada quando a apólice ou suplemento é finalizado e não fica retido por controle.

### Opção “por objeto”

A segunda modalidade depende de um procedimento ou implementação local para calcular a data contábil. A reunião atribui essa responsabilidade à área local de Tecnologia e Processos.

### Limite explícito

Não foram detalhados:

- o formato do procedimento por objeto;
- os critérios de cálculo;
- os eventos contábeis gerados;
- a integração com sistemas contábeis;
- regras de reprocessamento ou conciliação.

---

## 7.6 Serviço externo de seleção de riscos

O instrutor menciona propriedades relativamente novas que indicam se um ramo contará com um **serviço externo de seleção de riscos**. O exemplo dado são ramos de Vida.

Quando a propriedade estiver habilitada:

- o processo de emissão em NewTron realiza chamada à solução externa de seleção de riscos;
- deve haver lógica para avaliar dinamicamente os critérios de negócio que determinam quando o serviço será executado.

### Limite explícito

A reunião não identifica:

- o serviço externo;
- o fornecedor;
- o protocolo;
- os dados enviados;
- os critérios de decisão;
- o comportamento em caso de indisponibilidade;
- a forma de retorno da avaliação.

---

## 7.7 Inativação lógica

Como em outras tabelas do sistema, o Ramo Técnico pode ser desabilitado, caracterizando uma baixa lógica do registro. A sessão reforça esse padrão em diversos objetos do modelo: em vez de apagar dados, registra-se a inativação e preserva-se histórico.

---

## 8. Módulo de Terceiros: contexto da evolução

A segunda parte da reunião é dedicada ao modelo de dados de Terceiros, sobretudo aos segurados.

Segundo o instrutor, o módulo evoluiu para atender objetivos como:

- adaptação parcial ao novo modelo de referência de clientes da área corporativa de negócio/clientes;
- suporte a multirregistro para conceitos antes restringidos;
- enriquecimento de informações de segurados;
- disponibilização de dados úteis para marketing, prevenção a fraude, prevenção à lavagem de dinheiro e controles;
- manutenção de histórico e rastreabilidade das mudanças.

O instrutor afirma que o modelo antigo e o novo **convivem temporariamente** entre entidades MAPFRE que recebem manutenção do sistema. Não há, portanto, uma afirmação de substituição imediata e simultânea em todas as entidades.

### Leitura analítica

A evolução sugere uma mudança de um cadastro predominantemente operacional, com estruturas mais rígidas, para uma base de terceiros mais rica e reutilizável entre áreas. Isso não significa que todas as capacidades estejam automaticamente operacionalizadas: várias dependem de configuração, processo e uso local.

---

## 9. Princípios do novo modelo de dados

## 9.1 Validações no frontal e por contexto

A informação é armazenada conforme validações realizadas no frontal ou validações que podem ser definidas localmente.

Essas validações podem variar conforme:

- país;
- atividade do terceiro;
- pessoa física ou jurídica;
- obrigatoriedade local de determinados dados.

O exemplo conceitual dado é que uma informação não obrigatória para todos os países pode ser obrigatória em um país específico.

---

## 9.2 Atividade do terceiro

A atividade é um elemento recorrente na identificação dos dados. Na apresentação, para segurados, é citado o valor de atividade **1**. Também é dito que determinadas tabelas podem ser compartilhadas por outras atividades, como agentes.

A reunião não apresenta o catálogo completo de atividades nem todos os códigos existentes.

---

## 9.3 Chave única transversal

Além da identificação de TRON por tipo e código de documento, existe uma chave única que identifica o terceiro em diversos aplicativos da companhia.

Essa chave:

- não precisa ser o mesmo identificador usado no próprio TRON;
- é descrita como comum a vários aplicativos;
- aparece em diferentes estruturas do novo modelo.

A reunião não informa o nome técnico definitivo dessa chave, seu método de geração, unicidade entre países ou governança.

---

## 9.4 Histórico e inativação

Vários objetos do novo modelo incluem:

- data de vigência;
- data de captura;
- usuário que capturou;
- marca de habilitação/inabilitação;
- data de registro no histórico.

Quando informações verificadas deixam de ser válidas ou precisam ser substituídas, o comportamento indicado como apropriado é inativar o registro, preservando o histórico, em vez de alterar diretamente seu conteúdo.

---

## 10. Componentes do novo modelo de Terceiros

## 10.1 Contatos

A tabela de contatos permite registrar múltiplos meios de contato para um terceiro. A chave é descrita com elementos como:

- companhia;
- tipo de documento;
- código de documento;
- atividade;
- sequência do meio de contato.

A sequência é gerada incrementalmente pelo sistema, de 1 a N, refletindo o caráter multirregistro da estrutura.

### Informações mencionadas

- data de vigência;
- chave única transversal do terceiro;
- uso do contato, como pessoal, trabalho ou residência;
- categoria/tipo de meio de contato;
- valor do meio de contato;
- prioridade;
- marca de verificação;
- observações;
- dados da pessoa de contato, quando aplicável;
- cargo e departamento;
- documento da pessoa de contato;
- referência geográfica, quando o contato estiver em outro país;
- indicação de contato de referência para prevenção à lavagem de dinheiro;
- informações de histórico.

### Pessoas físicas e jurídicas

Para pessoa física, os exemplos incluem telefone e e-mail, com usos pessoais ou profissionais distintos.

Para pessoa jurídica, o modelo pode registrar várias pessoas de contato, com diferentes:

- departamentos;
- cargos;
- meios de contato;
- papéis na relação com a companhia.

### Contato padrão e prioritário

A reunião diferencia:

- valor padrão por categoria de meio de contato;
- meio de contato prioritário.

Há somente um meio de contato prioritário entre os meios ativos do terceiro, e não um prioritário por categoria.

### Verificação

Quando um contato é marcado como comprovado e verificado, a orientação é que ele não seja mais modificado. Posteriormente, a ação adequada seria inativá-lo.

### Relação com prevenção à lavagem de dinheiro

Para pessoas jurídicas, a companhia pode identificar, entre os diversos contatos, aquele que deve ser considerado contato de referência em situações ligadas a prevenção à lavagem de dinheiro.

A reunião não detalha:

- as condições que disparam esse contato;
- os procedimentos de comunicação;
- as regras de proteção de dados;
- a operação regulatória subsequente.

---

## 10.2 Pessoas politicamente expostas

Há uma estrutura para identificar se um terceiro mantém relação ou cargo ligado a uma **pessoa politicamente exposta**.

Os dados explicados incluem:

- marca de relação;
- data de alta;
- data de baixa;
- tipo e código do documento da pessoa envolvida;
- datas de vigência;
- inativação;
- usuário e data de captura;
- registro histórico.

O instrutor ressalta que, após a captura, a informação não deve ser apagada. Caso deixe de se aplicar, deve ser inativada, preservando a trilha histórica.

A reunião não define:

- critérios para classificar uma pessoa como politicamente exposta;
- regras de due diligence;
- medidas transacionais automáticas;
- obrigações específicas por jurisdição.

---

## 10.3 Representantes legais

A estrutura de representantes legais identifica a pessoa física ou jurídica que atua, ou pode atuar, como representante legal de um terceiro.

### Informações citadas

- tipo e código de documento do representante;
- datas de alta, baixa e vigência;
- relação com pessoa politicamente exposta;
- inabilitação;
- tipo de representação legal;
- usuário e data de captura;
- histórico.

O instrutor cita exemplos possíveis de tipologia de representação:

- direta;
- indireta;
- ativa;
- passiva;
- legal;
- voluntária;
- por interesse próprio;
- por interesse do representado.

Esses exemplos não foram apresentados como catálogo fechado. A codificação e o tratamento dependem da operação local.

### Limite funcional importante

As marcas existentes na tabela não realizam, por si só, ações automáticas. O próprio instrutor explica que uma marca não faz o sistema agir isoladamente: é necessário implementar ou executar processos que consultem e tratem essas informações.

---

## 10.4 Documentos alternativos

Os documentos alternativos permitem associar ao terceiro identificadores que não são documentos oficiais usados para emissão.

O exemplo utilizado é um programa interno chamado **“Te Cuidamos”**. O terceiro pode ter um código associado a esse programa, mas esse código não substitui seu documento oficial para fins de emissão.

### Regra central

Um documento alternativo:

- pode ser registrado como dado complementar do terceiro;
- não pode ser usado como tipo de documento para emitir uma apólice;
- não substitui o documento identificador oficial, como RUT, DNI, cédula ou outro definido pela entidade.

### Informações mencionadas

- tipo e código do documento principal;
- identificação do documento alternativo;
- vigência;
- data de emissão, quando disponível;
- data de vencimento, quando disponível;
- país de emissão, quando aplicável;
- marca de revisão/verificação;
- data de verificação;
- observações sobre o processo de validação;
- histórico.

Depois de revisado e verificado, o documento alternativo deve ser inativado em vez de modificado.

---

## 10.5 Acionistas

A estrutura de acionistas é dirigida a pessoas jurídicas e destina-se a registrar participações acionárias relevantes.

O instrutor alerta que ela **não** deve ser usada para manter uma lista completa e dinâmica de todos os acionistas de companhias grandes e amplamente negociadas, como os exemplos de Telmex ou Petrobras.

O uso esperado é para posições acionárias significativas e relativamente estáveis, por exemplo, acionistas com participação superior a determinado percentual definido pela necessidade local.

### Informações mencionadas

- identidade do acionista;
- possibilidade de acionista ser pessoa física ou jurídica;
- percentual de participação acionária;
- cargo na empresa, quando aplicável;
- marca ligada a pessoa politicamente exposta;
- datas de alta e baixa;
- usuário e data de captura;
- histórico.

### Limite explícito

O modelo não é indicado para acompanhar continuamente milhares de alterações de pequenas posições acionárias em grandes companhias.

---

## 10.6 Consentimentos

A tabela de consentimentos é apresentada como específica para terceiros segurados.

Ela registra autorizações ou negativas relacionadas ao tratamento de dados e a ações como:

- publicidade;
- uso de dados;
- ações comerciais;
- perfilamento;
- cross-selling.

### Elementos descritos

- terceiro identificado por companhia, tipo e código de documento e atividade;
- tipo de consentimento;
- âmbito de uso;
- código de consentimento;
- classificação conforme a legislação local;
- consentimento expresso, tácito ou ausência de consentimento;
- data de concessão ou retirada;
- vigência;
- inativação;
- usuário e data de captura;
- histórico.

A reunião reforça que a legislação de proteção de dados varia entre países. Por isso, não há uma regra única apresentada para consentimentos.

### Pergunta respondida

A criação de um terceiro não gera automaticamente um registro de consentimento. O consentimento deve ser criado e identificado manual ou automaticamente por processo adicional, por exemplo, se vier de outra fonte de dados.

---

## 10.7 Terceiros ou clientes não desejados

A estrutura permite classificar terceiros como não desejados para contextos específicos, sem necessariamente bloqueá-los globalmente.

Os critérios podem envolver combinações de:

- setor;
- ramo técnico;
- níveis da estrutura comercial;
- geografia;
- agente ou corretor;
- valores genéricos e específicos.

O instrutor usa exemplos em que uma pessoa poderia:

- ser não desejada para determinado ramo, como Vida;
- ser permitida em outro ramo;
- ser bloqueada em uma região e aceita em outra;
- sofrer restrição dependendo do agente que realiza a operação.

### Relação funcional

```text
Terceiro identificado
        +
Contexto comercial ou operacional
        ↓
Regra de “não desejado”
        ↓
Permissão ou restrição para determinada operação
```

### Configuração

O mecanismo usa combinações de valores genéricos e concretos para reduzir a necessidade de criar múltiplos registros excessivamente específicos.

### Pergunta respondida: uso para corretores

Foi perguntado se o mecanismo pode ser usado para corretores, inclusive quando se deseja bloquear um corretor apenas em determinados contextos e não para tudo.

A resposta foi positiva: é possível usar a estrutura com combinações de valores, por exemplo, bloqueando um corretor para todos os negócios ou somente para determinado produto, desde que:

- o corretor seja corretamente identificado no novo modelo;
- as instruções de cadastro sejam seguidas;
- o registro seja criado manualmente ou por processo automatizado local.

---

## 10.8 Obrigações fiscais em outros países

Há uma tabela específica para registrar países onde o terceiro possui obrigações fiscais.

O exemplo dado é o de uma pessoa residente no México com obrigação fiscal também na Espanha. Em caso de solicitação regulatória, a entidade poderia localizar terceiros com obrigações fiscais em outros países e atender à demanda aplicável.

### Finalidade explicada

- identificação de obrigações fiscais internacionais;
- apoio a pedidos de reguladores;
- suporte a cumprimento regulatório;
- mitigação de riscos associados a descumprimento.

O instrutor alerta que descumprimentos desse tipo podem gerar multas significativas.

### Limite explícito

A sessão não especifica:

- regras de reporte;
- autoridades envolvidas;
- frequência de atualização;
- validação da declaração fiscal;
- regras de retenção ou transferência internacional de dados.

---

## 10.9 Endereços

A evolução dos endereços é um dos exemplos mais claros de mudança do modelo.

### Modelo anterior

O modelo anterior permitia apenas três endereços, associados a campos e finalidades fixas, como residência, endereço comercial e correspondência.

### Novo modelo

O novo modelo é multirregistro, permitindo cadastrar diversos endereços, cada um com:

- sequência automática;
- data de vigência;
- chave única do terceiro;
- uso do endereço;
- tipo de via;
- dados de endereço;
- campos complementares;
- referências geográficas;
- código postal;
- latitude;
- longitude;
- endereço padrão;
- domicílio fiscal;
- marca de verificação;
- inativação;
- usuário, data de captura e histórico.

### Endereços internacionais

Quando o endereço estiver em outro país e os catálogos geográficos locais não contemplarem aquela geografia, o modelo permite capturar a informação complementar manualmente.

### Endereço fiscal

Entre os múltiplos endereços possíveis, somente um pode ser marcado como domicílio fiscal.

### Verificação

Assim como em contatos e documentos, endereços marcados como comprovados e verificados devem ser inativados, e não modificados, caso deixem de ser aplicáveis.

---

## 10.10 Latitude e longitude

O modelo permite registrar latitude e longitude associadas ao endereço.

### Pergunta respondida

Foi perguntado se esses valores seriam recebidos automaticamente por algum serviço de georreferenciamento ou se precisariam ser informados.

A resposta foi que, no estado descrito na reunião, a captura é **manual**. Não há, naquele momento, um web service que identifique automaticamente a geolocalização do risco.

O instrutor comenta que uma utilização futura poderia fazer sentido em linhas como:

- seguro residencial;
- seguro comercial;
- outros cenários em que a geolocalização seja relevante e relativamente estável.

Isso foi apresentado como possibilidade, não como solução já implementada.

---

## 10.11 Informações analíticas carregadas em batch

Foi mencionada uma tabela cuja alimentação normalmente não ocorre por captura manual no processo de alta do terceiro. A informação é carregada em **batch**.

A finalidade é analítica, voltada à área corporativa de negócio/clientes e a processos de marketing.

### Exemplos de informação mencionada

- probabilidade de abandono;
- probabilidade de venda adicional;
- propensão a venda de seguros, como Automóvel, Residencial ou outros;
- número total de apólices contratadas;
- canal preferido do terceiro;
- classificação de crédito.

O instrutor enfatiza que os campos são definidos para que as entidades falem uma linguagem comum. Um código isolado, sem definição corporativa, não possui significado operacional por si só.

### Limite explícito

A reunião não detalha:

- origem dos dados;
- modelos analíticos usados;
- frequência do batch;
- qualidade e governança dos dados;
- responsáveis pela carga;
- regras de atualização ou exclusão.

---

## 10.12 Meios de cobrança e pagamento

O novo modelo trata meios de cobrança e pagamento de modo multirregistro, superando a restrição anterior em que a possibilidade de múltiplas contas e cartões dependia de configuração específica da companhia.

### Exemplos de tipos e classificações

O modelo pode distinguir:

- conta bancária;
- cartão bancário;
- pagamento por celular;
- carteira virtual;
- conta corrente;
- conta de poupança;
- conta de valores;
- conta contratada on-line;
- cartão de crédito;
- cartão de débito;
- cartão pré-pago;
- cartão revolvente.

Também pode registrar se a instituição é:

- banco;
- entidade emissora;
- entidade processadora que não necessariamente é banco.

### Informações mencionadas

- companhia;
- tipo e código de documento do terceiro;
- atividade;
- sequência do meio;
- vigência;
- categoria e classificação;
- instituição financeira;
- código do meio;
- titular;
- valor mascarado;
- token e tipo de token;
- uso do meio;
- moeda;
- mês e ano de vencimento;
- marca de verificação;
- indicação de meio preferido;
- inativação;
- usuário, data de captura;
- chave transversal do terceiro;
- histórico.

### Uso específico do meio

O modelo pode restringir o uso de um meio de cobrança ou pagamento. Por exemplo, uma conta bancária poderia ser usada apenas para depósitos de indenizações de sinistro, sem ser usada para devolução de prêmios.

### Mascaramento e tokenização

A reunião cita:

- valor mascarado do meio de cobrança/pagamento;
- tipo de token;
- token associado;
- uso de sequências internas, mencionadas no contexto de Oracle, para completar o mascaramento.

A apresentação não fornece detalhes criptográficos, algoritmos, rotação de chaves, armazenamento de tokens ou escopo de conformidade aplicável.

---

## 10.13 Tabela criptografada de meios de cobrança e pagamento

Além da tabela principal, existe uma tabela criptografada, com informação semelhante, para armazenar o valor cifrado do meio de cobrança/pagamento e a chave de criptografia associada.

O instrutor afirma que essa captura e manutenção são responsabilidade da companhia local.

### Informações destacadas

- valor criptografado do meio;
- chave de criptografia;
- tipo e código do documento;
- atividade;
- token;
- vigência;
- titular da conta ou cartão;
- usuário e data de captura;
- chave do terceiro;
- histórico.

### Limite explícito

A reunião não permite concluir:

- onde as chaves são armazenadas;
- se há HSM, KMS ou mecanismo equivalente;
- quem possui acesso aos valores descriptografados;
- se os meios de pagamento atendem normas como PCI DSS;
- como ocorre rotação, revogação ou auditoria de chaves.

---

## 11. Modelo de integração

As integrações explicitamente mencionadas foram:

| Integração ou relação | Papel apresentado | Detalhes não fornecidos |
|---|---|---|
| TRON ↔ PLATEA | Aplicação de controles antifraude em emissão e sinistros | Tecnologia, protocolo, eventos, SLA e regras de retorno |
| NewTron ↔ serviço externo de seleção de riscos | Chamada a serviço externo quando a propriedade do ramo estiver habilitada | Serviço, fornecedor, payload, autenticação e tratamento de falha |
| TRON ↔ processos locais de compliance | Uso de dados de terceiros para ações regulatórias, PEP, lavagem de dinheiro e obrigações fiscais | Processos concretos, responsáveis e automações |
| TRON ↔ cargas batch analíticas | Alimentação de dados analíticos para marketing e negócio/clientes | Origem, frequência, transformação e qualidade |
| Modelo de Terceiros ↔ demais aplicativos | Uso de chave única transversal do terceiro | Nome da chave, mecanismo de sincronização e escopo |

Não houve menção explícita a APIs REST, SOAP, eventos, filas, arquivos, mensageria ou replicação de banco.

---

## 12. Modelo operacional e responsabilidades

A reunião apresenta um modelo em que o núcleo de TRON oferece capacidades estruturais, mas as entidades locais assumem papel relevante na operação.

### Responsabilidades locais citadas ou implicadas diretamente

- definir validações obrigatórias por país;
- configurar catálogos e critérios aplicáveis;
- definir quais marcas e controles usar;
- implementar procedimentos locais de data contábil “por objeto”;
- criar processos que utilizem dados de representantes legais, PEPs ou marcas;
- carregar e manter dados analíticos;
- capturar e manter dados de cobrança e pagamento criptografados;
- atender regulações locais;
- identificar corretamente terceiros, agentes e corretores;
- definir tratamentos de compliance, fraude e lavagem de dinheiro.

### Operação baseada em histórico

O padrão operacional enfatizado é:

```text
Captura do dado
        ↓
Validação / verificação, quando aplicável
        ↓
Uso operacional
        ↓
Se o dado deixar de ser aplicável:
inativação lógica
        ↓
Preservação do histórico
```

Não foram detalhados processos de:

- suporte;
- incidentes;
- releases;
- hotfixes;
- monitoramento;
- auditoria técnica;
- versionamento de configurações;
- aprovação de mudanças.

---

## 13. Governança e organização

A governança apresentada é parcialmente corporativa e parcialmente local.

### Elementos corporativos citados

- Área Corporativa de Operações, associada às propriedades ACO;
- Área Corporativa de Negócio e Clientes, associada ao modelo de referência de clientes e a dados analíticos;
- definição corporativa de campos para permitir linguagem comum entre entidades;
- documentação e capacitação centralizadas no portal REEF.

### Elementos locais citados

- definição de obrigatoriedades e validações;
- escolha de controles;
- configuração de catálogos;
- tratamento regulatório;
- processos para prevenção à lavagem de dinheiro;
- implementação de lógicas e procedimentos complementares;
- manutenção de dados criptografados de meios de pagamento.

A reunião não apresenta organograma, papéis formais de Product Manager, Product Owner, Scrum Master, arquitetura, FinOps, segurança, infraestrutura ou cloud.

---

## 14. Dados, tabelas e modelo físico

A apresentação visual inclui um **Diagrama Navegável de TRN TERCEROS** [Frame 06, 23:38], com agrupamentos como:

- Asegurados;
- Agentes;
- Comunes;
- Supervisores;
- Tramitadores;
- Aseguradoras;
- Reaseguradoras;
- Brokers;
- Empleados Agente;
- Proveedores.

Também há uma evidência visual de um diagrama entidade-relacionamento [Frame 07, 27:33], no qual aparece, entre outras, uma entidade identificada como:

`TRON2000.DF_THP_NWT_XX_CNT`

Alguns atributos visíveis incluem:

- `CMP_VAL`;
- `THP_DCM_TYP_VAL`;
- `THP_DCM_VAL`;
- `THP_ACV_VAL`;
- `CNH_SQN_VAL`;
- `VLD_DAT`.

Contudo, a evidência fornecida do diagrama está incompleta. Não é seguro relacionar essa entidade a uma função específica do modelo explicada oralmente, nem reconstruir todo o modelo físico ou as chaves entre tabelas.

---

## 15. Perguntas e respostas

## 15.1 Documento alternativo pode ser usado para emitir apólice?

### Pergunta

Foi perguntado se, ao criar um documento alternativo para um terceiro, seria possível emitir uma apólice usando esse documento.

### Resposta

Não. O documento alternativo serve como informação complementar, mas não pode identificar o segurado para emissão de uma apólice.

O exemplo foi o de um código associado a uma entidade ou programa de varejo, comparado a Falabella ou El Corte Inglés. Esse código poderia existir no cadastro como documento alternativo, mas o segurado ainda precisaria ter seu documento oficial — como RUT, cédula ou documento equivalente — para emitir a apólice.

### O que isso esclarece

Há separação entre:

- identificador oficial do terceiro para operação securitária;
- identificadores complementares usados em contextos internos, comerciais ou de relacionamento.

---

## 15.2 Consentimento é criado automaticamente com o terceiro?

### Pergunta

Foi perguntado se, ao criar um terceiro, o registro de consentimento seria gerado automaticamente.

### Resposta

Não por padrão. O consentimento deve ser criado e identificado separadamente, manualmente ou automaticamente por algum processo que carregue esses dados de outra fonte.

### O que isso esclarece

O cadastro de terceiro e a gestão de consentimento são capacidades relacionadas, mas independentes. Não se deve presumir que a existência do terceiro implique consentimento válido.

---

## 15.3 Cliente não desejado pode ser aplicado a corretores?

### Pergunta

Foi perguntado se a lógica de cliente não desejado pode ser utilizada para corretores, especialmente para bloquear operações em cenários específicos sem bloqueá-las globalmente.

### Resposta

Sim. O instrutor explica que é possível jogar com combinações de valores genéricos e específicos para restringir um corretor:

- em todas as apólices;
- em um ramo específico;
- em um contexto determinado.

Para isso funcionar, o corretor precisa estar adequadamente identificado no novo modelo, e a regra deve ser cadastrada manualmente ou por processo local.

### O que isso esclarece

O mecanismo não está limitado à ideia simplificada de bloqueio total de cliente. Ele permite granularidade contextual, desde que a modelagem e o cadastro estejam corretos.

---

## 15.4 A nova tabela de endereços substitui a anterior?

### Pergunta

Foi perguntado se a nova tabela substitui a tabela anterior de endereços ou se ambas poderiam ser usadas em paralelo.

### Resposta

A nova estrutura substitui a anterior para a captura de informação quando o novo modelo de terceiros estiver identificado como ativo na configuração da companhia.

O instrutor ressalva que modificações locais existentes — mencionando alterações relacionadas a endereços de apólices — podem continuar existindo. Porém, grande parte do que estiver implementado precisará mudar para consumir a nova fonte de informação.

### O que isso esclarece

A substituição não é necessariamente uma eliminação imediata de todo código ou customização local, mas representa mudança na fonte principal de dados para o novo modelo.

---

## 15.5 Latitude e longitude são obtidas automaticamente?

### Pergunta

Foi perguntado se latitude e longitude seriam baixadas ou preenchidas automaticamente por referência, ou se precisariam ser digitadas manualmente.

### Resposta

No momento descrito, precisam ser inseridas manualmente. Não existe web service que identifique automaticamente a geolocalização do risco.

### O que isso esclarece

O modelo suporta geolocalização, mas não possui, conforme a explicação, uma automação nativa de enriquecimento geográfico.

---

## 16. Limitações e ressalvas reconhecidas

| Tema | Limitação ou ressalva |
|---|---|
| Regeneração de suplementos retroativos | Propriedade obsoleta; não deve ser utilizada nem reutilizada |
| Modelo antigo e novo de Terceiros | Convivem temporariamente entre entidades; não foi afirmada migração uniforme |
| Marcas, representantes legais e PEP | Marcas por si só não executam tratamento; exigem processos locais |
| Consentimentos | Não são criados automaticamente ao cadastrar um terceiro |
| Documentos alternativos | Não servem para emissão de apólices |
| Acionistas | Não é estrutura para acompanhar todas as posições dinâmicas de grandes companhias |
| Latitude e longitude | Captura manual; não há web service de geolocalização no cenário apresentado |
| Seleção externa de riscos | Existe propriedade para habilitação, mas não foram descritos o serviço e a implementação |
| Dados analíticos | Alimentação normalmente em batch; origem e lógica não foram detalhadas |
| Meios de pagamento | Há mascaramento, tokenização e criptografia mencionados, mas sem especificação técnica de segurança |
| Controles regulatórios | Aplicação depende de regulação, processos e operação de cada país |
| Data contábil “por objeto” | Depende de implementação local pela área de Tecnologia e Processos |

---

## 17. Riscos e desafios

## 17.1 Riscos explicitamente mencionados

### Fraude

A necessidade de integração com PLATEA e de processos de marcas evidencia risco de fraude em emissão e sinistros.

### Lavagem de dinheiro e obrigações regulatórias

O enriquecimento dos dados de terceiros, contatos, representantes legais e obrigações fiscais é associado a necessidades de controles contra lavagem de dinheiro e atendimento regulatório.

### Penalidades por descumprimento

O instrutor alerta que descumprimentos relacionados a obrigações fiscais e regulatórias podem gerar multas relevantes.

### Uso incorreto de dados ou estruturas

Exemplos de risco operacional apresentados:

- usar documentos alternativos para emissão;
- usar a tabela de acionistas para controlar todas as posições de mercado;
- reutilizar propriedade obsoleta de suplementos retroativos;
- alterar dados verificados em vez de inativá-los;
- não identificar corretamente terceiros ou corretores ao aplicar regras de bloqueio.

---

## 17.2 Desafios derivados do contexto

As observações abaixo são **leitura analítica**, e não afirmações literais dos participantes.

### Governança de dados

O novo modelo amplia a quantidade e sensibilidade dos dados tratados: documentos, endereços, dados fiscais, contatos, representantes legais, consentimentos e meios de pagamento. Isso tende a aumentar a necessidade de regras claras de qualidade, acesso, retenção e responsabilidade sobre os dados.

### Consistência entre entidades locais

Como há validações, catálogos, regras de negócio e procedimentos definidos localmente, existe potencial de divergência funcional entre países. A padronização corporativa dos campos parece buscar reduzir esse risco, mas a reunião não descreve mecanismos formais de governança para garanti-la.

### Migração e coexistência

A coexistência entre modelos antigo e novo pode gerar desafios de integração, reconciliação e adaptação de customizações locais, sobretudo porque foi dito que implementações existentes precisam passar a consumir as novas estruturas.

### Automação incompleta

Há capacidades de modelo e configuração sem automação nativa demonstrada, como geolocalização e tratamento de diversas marcas de compliance. Isso pode gerar trabalho manual, inconsistências de cadastro ou necessidade de desenvolvimento adicional local.

---

## 18. Transformações estruturais identificadas

## 18.1 Transformação do cadastro rígido para cadastro multirregistro

A evidência mais direta é a evolução de endereços:

```text
Modelo anterior:
três endereços em campos predefinidos
        ↓
Novo modelo:
múltiplos registros, com uso, vigência, prioridade,
verificação, inativação e histórico
```

O mesmo padrão aparece em contatos e meios de cobrança/pagamento.

---

## 18.2 Transformação de dado transacional para dado corporativo reutilizável

O modelo de Terceiros passa a atender não apenas emissão e sinistros, mas também:

- marketing;
- perfilamento;
- prevenção à fraude;
- controles regulatórios;
- lavagem de dinheiro;
- análise de crédito;
- propensão comercial.

Isso sugere uma ampliação do papel do cadastro de terceiros para uma base corporativa de relacionamento e risco.

---

## 18.3 Transformação de alteração direta para histórico e inativação

A orientação recorrente é preservar histórico e inativar registros em vez de apagá-los ou alterar dados já verificados.

Essa abordagem favorece rastreabilidade, auditoria e entendimento da evolução cadastral, embora a reunião não detalhe regras de retenção, governança ou consulta ao histórico.

---

## 18.4 Transformação de configuração genérica para controle contextual

O tratamento de terceiros não desejados mostra que o sistema pode aplicar regras conforme contexto de:

- ramo;
- setor;
- geografia;
- estrutura comercial;
- agente ou corretor.

A leitura possível é que o sistema busca evitar bloqueios excessivamente genéricos, permitindo políticas mais específicas por contexto operacional.

---

## 19. Números e indicadores citados

Os números abaixo foram mencionados durante a sessão e não representam informação auditada externamente.

| Indicador ou referência | Valor mencionado | Contexto |
|---|---:|---|
| Código de ramo técnico genérico/fictício | 999 | Ramo interno, não emissível |
| Endereços permitidos no modelo antigo | 3 | Restrição do modelo anterior |
| Sequência de contatos, endereços e meios | 1 a N | Estruturas multirregistro |
| Tipos de obtenção de data contábil | 3 | Configuração para emissão e suplementos |
| Operações funcionais de sinistros visíveis na documentação | L1 a L9 | Criar, valorar, modificar, terminar e reabilitar sinistros/expedientes |
| Exemplo de participação acionária relevante | superior a 3% | Exemplo ilustrativo; não foi apresentado como regra universal |
| Atividade de segurado citada | 1 | Exemplo usado no modelo |
| Tempo adicional declarado ao fim da sessão | mais de 3 minutos | Comentário de encerramento, sem relevância funcional |

---

## 20. O que a reunião não permite concluir

A sessão oferece amplo contexto funcional, mas não permite determinar com segurança:

- tecnologia de backend de TRON;
- banco de dados utilizado de forma geral, embora haja menção a sequência Oracle no contexto de tokenização;
- arquitetura de cloud ou on-premises;
- modelo de alta disponibilidade;
- recuperação de desastre;
- estratégia de backup;
- APIs, protocolos e padrões de integração;
- mensageria, eventos ou chamadas síncronas;
- modelo de IAM, autenticação e autorização;
- mecanismos concretos de criptografia;
- gestão de chaves criptográficas;
- requisitos de PCI DSS ou outros padrões de segurança;
- SLAs, tempos de resposta e critérios de disponibilidade;
- ferramentas de CI/CD;
- modelo de observabilidade;
- mecanismos de auditoria técnica;
- catálogo completo de tabelas do novo modelo;
- plano de migração entre modelo antigo e novo;
- cronograma de rollout por país;
- critérios completos de antifraude, PEP, lavagem de dinheiro ou seleção de riscos;
- fornecedores e contratos de serviços externos;
- roadmap formal de evolução da plataforma.

Também não é possível afirmar que todas as entidades MAPFRE utilizam ou utilizarão todas as capacidades apresentadas. A reunião enfatiza que configurações, procedimentos e aplicações podem variar localmente.

---

## 21. Conclusões

A capacitação apresenta TRON como uma plataforma configurável em que a parametrização do Ramo Técnico e o novo modelo de Terceiros sustentam capacidades operacionais e de controle relevantes para o negócio segurador.

No âmbito de produtos, os Ramos Técnicos concentram decisões que afetam:

- controles antifraude;
- marcas e retenções técnicas;
- uso de seleção externa de riscos;
- contabilização de prêmios;
- habilitação efetiva para emissão.

No âmbito cadastral, o novo modelo de Terceiros amplia a capacidade de armazenar e rastrear informações de segurados e outros participantes, com estruturas multirregistro, histórico, validações e dados voltados a operação, relacionamento, compliance e análise.

A principal ressalva da reunião é que o modelo não deve ser confundido com uma solução totalmente automática. Muitos campos, marcas e tabelas fornecem a base para controles e tratamentos, mas a eficácia depende de decisões locais, configuração adequada, qualidade de cadastro, integrações e processos complementares.

A documentação REEF/TRON, os diagramas navegáveis e as sessões de formação aparecem como instrumentos para orientar esse uso. Ainda assim, para transformar o material em uma especificação técnica implementável, seriam necessários detalhes adicionais sobre integrações, regras locais, catálogo de dados, segurança, migração e operação.
