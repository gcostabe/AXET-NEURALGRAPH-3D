# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.core - Siniestros - Definición de tipo de expediente (1).mp4`
**Data de processamento:** 24/09/2026 15:51:45
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Análise Estruturada — Sessão de Formação MAPFRE Reef.core  
## Definição de Tipos de Expediente no Módulo de Sinistros

> **Escopo e rastreabilidade:** esta análise foi produzida exclusivamente a partir da transcrição de fala fornecida e das evidências visuais extraídas dos slides/telas. A fala está em espanhol e contém ruídos e erros típicos de reconhecimento automático; termos ambíguos foram preservados ou sinalizados.  
>
> **Referências disponíveis:** não há timestamps por frase na transcrição. As referências visuais são indicadas como `Frame XX @ mm:ss`.

---

## 1. Síntese executiva

A sessão é uma formação funcional sobre a definição de **tipos de expediente** no Reef.core, solução apresentada como uma plataforma integral para gestão do ciclo de vida de apólices das entidades MAPFRE. O foco específico foi o módulo de sinistros e, mais precisamente, a configuração necessária para que um dano decorrente de um sinistro possa ser tratado operacionalmente pelo sistema.

O conceito central apresentado é que um **sinistro** representa o evento comunicado à seguradora — por exemplo, um alagamento, uma colisão ou um roubo —, enquanto os **expedientes** representam os danos ou tratamentos individualizados derivados desse evento. Cada expediente deve ter uma tipologia, denominada *tipo de expediente*. Um único sinistro pode, portanto, originar vários expedientes de naturezas distintas, como dano próprio, dano a terceiros, lesões ou responsabilidade civil.

A formação busca não apenas ensinar o preenchimento técnico da configuração, mas também orientar a decisão de negócio sobre **quando criar um novo tipo de expediente** e quando reutilizar uma tipologia existente. Essa decisão é apresentada como relevante porque o tipo de expediente condiciona a informação solicitada, o plano de tramitação, o cálculo de reservas, os módulos envolvidos, a possibilidade de automação e os avisos operacionais.

A configuração é exposta em dois níveis:

1. **Nível de companhia:** criação de uma chave, descrição e propriedades básicas da tipologia.
2. **Nível de ramo/produto:** definição de como aquele tipo de expediente se comportará em um ramo específico, incluindo moeda, unicidade, estrutura de dados, plano de tramitação, reservas, uso de módulos e regras automáticas.

A sessão também mostrou que a solução ainda contém funcionalidades em evolução. O caso de recobro de franquias/dedutíveis, por exemplo, possui marcas de configuração já existentes, mas o tratamento operacional completo ainda não estava finalizado. Da mesma forma, a documentação do plano de renda não estava disponível no portal no momento da sessão, embora existisse material em Word que poderia ser fornecido.

---

## 2. Contexto e antecedentes

### 2.1. Contexto da formação

A reunião faz parte de uma série de sessões de capacitação vinculada ao ambiente chamado na transcrição de “Riz Fakademi” ou expressão semelhante. Pela evidência visual, há forte indicação de que a referência correta seja **Reef.academy**, pois o portal informa que os materiais estão em `Teams > Equipo Reef.academy > General > Archivos` (`Frame 05 @ 18:30`).

A apresentadora informa que a sessão está sendo gravada e que as formações anteriores ficam organizadas por ano e mês no Teams. O portal de documentação também lista sessões e indica a localização de cada material no Teams.

A evidência visual mostra uma área denominada **“Sesiones de formación”**, com treinamentos sobre emissão, terceiros, sinistros, apresentação do Reef e infraestrutura/observabilidade (`Frame 05 @ 18:30`). Isso indica que a formação analisada integra uma trilha mais ampla de capacitação funcional e técnica.

### 2.2. Contexto da plataforma Reef.core

O portal exibido identifica o produto como **Reef.core** e o define como uma:

> “Solución integral de Gestión de Seguros que permite a las entidades MAPFRE gestionar el ciclo de vida de sus pólizas.”

Essa formulação aparece na introdução da documentação (`Frame 06 @ 22:11`).

O menu do portal também evidencia que a documentação está organizada em áreas como:

- TRON;
- Arquitetura;
- Infraestrutura;
- Marco normativo;
- Metodologia;
- Qualidade;
- DevOps;
- Implantações;
- Sessões;
- Módulos;
- Certificação;
- Termos.

A transcrição não detalha a arquitetura técnica de Reef.core, tais como tecnologias de cloud, bancos de dados, APIs ou mecanismos de integração. Entretanto, a estrutura documental sugere que a solução possui documentação funcional, arquitetural, normativa e operacional separada.

### 2.3. Relação entre emissão, sinistros e tesouraria

A apresentadora explica o posicionamento do módulo de sinistros no fluxo maior do negócio de seguros:

```text
Apólice
↓
Sinistro
↓
Expedientes
↓
Ordens de pagamento
↓
Tesouraria
```

Ela usa uma metáfora para indicar que sinistros ocupa uma posição intermediária no processo: parte-se da apólice, abre-se o sinistro e, posteriormente, geram-se ordens de pagamento. Nesse encadeamento, emissão está na origem, e tesouraria atua no processamento financeiro posterior.

A própria apresentadora resume essa relação como uma espécie de “sanduíche”, no qual sinistros seria o “presunto” entre emissão e tesouraria. Essa metáfora não representa uma arquitetura formal, mas comunica a dependência funcional entre as áreas.

---

## 3. Conceitos funcionais fundamentais

### 3.1. Sinistro

Na explicação apresentada, o sinistro é o fato ou evento comunicado à companhia. Os exemplos fornecidos incluem:

- inundação de um imóvel;
- colisão;
- dano causado a terceiros;
- roubo;
- ocorrência envolvendo veículo;
- dano em residência.

O sinistro é, portanto, o registro principal do evento segurado.

### 3.2. Expediente

O expediente representa um dano específico decorrente do sinistro. A apresentadora faz uma distinção explícita:

- **Sinistro:** o evento comunicado.
- **Expediente:** cada dano individual associado ao evento.

Exemplos apresentados:

| Contexto | Possíveis expedientes |
|---|---|
| Acidente de automóvel | Danos materiais ao veículo segurado, danos ao veículo de terceiro, lesões |
| Seguro residencial | Danos por água, responsabilidade civil perante vizinho |
| Roubo | Expediente relacionado ao roubo |
| Acidente com terceiros | Um ou vários expedientes de danos ou lesões a terceiros |

Um sinistro pode conter mais de um expediente. Os expedientes podem possuir tipologias distintas.

### 3.3. Tipo de expediente

O tipo de expediente é a classificação funcional do expediente. Ele identifica a natureza do dano e define como o sistema deve tratar aquele caso.

A formação utiliza exemplos como:

- roubo;
- danos por água;
- morte;
- danos materiais;
- danos próprios;
- responsabilidade civil;
- lesões;
- recobros;
- salvamentos.

A regra conceitual explicitada é:

> Todo expediente é de um tipo.

Além disso, a formação enfatiza que o tipo de expediente não é apenas uma descrição classificatória. Ele funciona como um ponto de configuração para determinar:

- quais dados serão solicitados;
- qual plano de tramitação será utilizado;
- se haverá cálculo de reservas;
- quais módulos poderão ser acionados;
- se poderá haver processos automáticos;
- quais notificações ou avisos serão emitidos;
- em qual moeda o expediente será valorado;
- se a tipologia poderá ocorrer uma ou várias vezes no mesmo sinistro.

---

## 4. Problema central tratado

O problema central não é descrito como um incidente tecnológico específico, mas como uma necessidade funcional e de modelagem operacional:

> Como configurar corretamente um tipo de expediente — e como decidir se um novo tipo deve ou não ser criado.

A apresentadora sinaliza que essa área gera muitas dúvidas. A dificuldade não estaria apenas em preencher campos de configuração, mas em compreender as consequências de se criar, reutilizar ou separar tipologias.

### 4.1. Problemas identificados

| Problema | Consequência descrita ou implícita |
|---|---|
| Não saber quando criar um novo tipo de expediente | Risco de modelagem inadequada do processo de sinistros |
| Não conhecer as coberturas do produto | Dificuldade para definir os expedientes necessários à tramitação |
| Cobertura sem tipo de expediente associado | Impossibilidade ou inadequação para abertura/tratamento do dano correspondente |
| Tipos de expediente excessivamente genéricos | Possível dificuldade para aplicar planos de tramitação, dados e regras específicos |
| Tipos de expediente excessivamente fragmentados | Maior complexidade de manutenção e configuração |
| Falta de informação na abertura do expediente | Alterações, reaberturas ou correções posteriores |
| Regras automáticas dependentes de dados insuficientes | Abertura automática pode não ser possível ou adequada |
| Funcionalidades ainda incompletas, como dedutíveis | Configuração disponível sem cobertura operacional integral |

### 4.2. Relação de causa e efeito reconstruída

A seguinte cadeia é sustentada pelo conteúdo apresentado:

```text
Produto de seguros definido em emissão
↓
Coberturas configuradas para o produto
↓
Coberturas sinistráveis precisam ser tratáveis em sinistros
↓
Necessidade de associá-las a tipos de expediente
↓
Cada tipo determina informações, processos, reservas e módulos
↓
A configuração inadequada pode dificultar a operação ou exigir retrabalho
```

Essa cadeia é uma **reorganização analítica** do raciocínio transmitido na sessão; não foi exibida como diagrama literal.

---

## 5. Solução apresentada: definição governada de tipos de expediente

A solução apresentada é um modelo de configuração no Reef.core que separa a criação básica da tipologia da definição de seu comportamento por ramo.

### 5.1. Primeira etapa: definição a nível de companhia

A primeira ação é registrar o tipo de expediente em nível de companhia.

Segundo a explicação, esse catálogo é corporativo porque o mesmo tipo pode ser usado em diferentes ramos. O exemplo dado é um tipo de expediente de roubo que poderia ser utilizado em mais de um ramo, desde que seu comportamento específico seja posteriormente definido para cada ramo.

Nesse nível são configurados, entre outros elementos:

- chave do tipo de expediente;
- descrição;
- uso em sinistros;
- natureza positiva ou negativa;
- agrupamento por natureza;
- habilitação;
- propriedades específicas de recobro.

### 5.2. Segunda etapa: associação e comportamento por ramo

Depois de criar a tipologia em nível de companhia, ela é associada a um ramo. É nessa etapa que se define o comportamento operacional daquele tipo de dano para determinado produto ou ramo.

A apresentadora divide essas características em três grupos:

1. **Propriedades gerais do ramo;**
2. **Propriedades relacionadas a processos automáticos;**
3. **Propriedades ligadas ao uso de outros módulos.**

Essa separação é importante porque evidencia que o mesmo nome de tipo de expediente pode comportar-se de formas diferentes em contextos de produto distintos.

---

## 6. Dependência em relação às coberturas de emissão

### 6.1. Coberturas como ponto de partida

A formação afirma reiteradamente que a definição de tipos de expediente deve partir das coberturas configuradas em emissão.

A lógica apresentada é:

```text
Emissão define o produto
↓
O produto possui coberturas
↓
Algumas coberturas são sinistráveis
↓
As coberturas sinistráveis precisam estar contidas em algum tipo de expediente
```

A apresentadora afirma que nem toda cobertura pode gerar sinistro. Foram mencionadas categorias que, conforme a fala, não são sinistráveis:

- cobertura informativa;
- cobertura básica adicional;
- cobertura utilizada para cálculos internos em emissão.

A formulação exata de uma das categorias na transcrição aparece degradada como “peticias”, possivelmente por erro de reconhecimento de voz. Não é possível determinar com segurança o termo funcional original.

### 6.2. Necessidade de conhecer o produto

Quem define tipos de expediente precisa conhecer profundamente o produto e suas coberturas, incluindo:

- franquias ou dedutíveis;
- limites de cobertura;
- cláusulas;
- condições de risco;
- informações necessárias para tramitação.

A apresentadora dá o exemplo de uma cobertura com limite de mil dólares: esse limite representa o máximo que a seguradora poderá pagar no contexto daquela cobertura.

Também é explicado que pode ser necessário criar tipos de cobertura voltados especificamente à operação de sinistros, inclusive quando uma cláusula ou condição contratual não possui uma cobertura específica suficiente para suportar a tramitação.

### 6.3. Leitura analítica

Uma leitura possível é que a definição de tipos de expediente atua como uma camada de conexão entre o desenho comercial/técnico do produto, realizado em emissão, e sua execução operacional em sinistros.

Ou seja:

```text
Cobertura contratada
↓
Necessidade de tratamento de sinistro
↓
Tipo de expediente
↓
Dados, processos, reservas, módulos e pagamentos
```

Essa é uma interpretação estrutural baseada na explicação apresentada, não uma afirmação literal de arquitetura da solução.

---

## 7. Arquitetura funcional reconstruída

A sessão não apresentou um diagrama técnico de componentes, APIs ou infraestrutura. Ainda assim, é possível reconstruir uma arquitetura funcional de alto nível baseada no fluxo descrito.

```text
Emissão / Produto / Apólice
    ↓
Coberturas e condições contratuais
    ↓
Registro de sinistro
    ↓
Abertura de expediente
    ↓
Tipo de expediente
    ├── Estrutura de dados solicitados
    ├── Plano de tramitação
    ├── Regras de reserva
    ├── Regras de moeda
    ├── Regras de abertura automática
    ├── Regras de notificação
    └── Habilitação de módulos
            ├── Juízos / processos judiciais
            ├── Peritagens e investigações
            ├── Faturação
            └── Plano de renda
    ↓
Liquidações / ordens de pagamento
    ↓
Tesouraria
    ↓
Pagamentos e, quando aplicável, compensação contra recibos
```

> **Observação:** este desenho é uma consolidação analítica do conteúdo da reunião. Não corresponde a um diagrama visual formal apresentado pela MAPFRE.

---

## 8. Componentes e capacidades mencionados

### 8.1. Reef.core

**Finalidade:** solução integral de gestão de seguros para o ciclo de vida de apólices.

**Evidência:** a documentação apresentada descreve esse objetivo diretamente (`Frame 06 @ 22:11`).

**O que a reunião permite afirmar:**

- possui documentação funcional estruturada;
- contém módulos, incluindo sinistros;
- relaciona-se com emissão e tesouraria no fluxo operacional;
- possui manutenção de dados parcialmente disponível em TRONweb;
- ainda possui manutenções em ambiente/tecnologia anterior, conforme explicado pela apresentadora.

**O que não é possível concluir:**

- tecnologia de implementação;
- arquitetura de microsserviços;
- banco de dados;
- cloud utilizada;
- modelo de autenticação;
- métodos de integração técnica;
- SLA ou modelo de disponibilidade.

### 8.2. TRON / TRONweb

A evidência visual mostra a área “TRON” na documentação de Reef.core (`Frame 06 @ 22:11`). A apresentadora também menciona “TRONweb”.

Segundo a explicação, existe uma migração gradual de manutenções para um ambiente chamado TRONweb, mas várias manutenções ainda permanecem em outra interface. A fala afirma, em essência, que “vamos pouco a pouco fazendo los mantenimientos en [termo pouco claro], pero de momento hay muchos que todavía siguen aquí”.

A captura visual mostra uma tela com aparência de sistema legado ou terminal, identificada como “Creación y Modificación de Datos”, com referência a `TRON2000` (`Frame 08 @ 29:33`).

**Interpretação cautelosa:** há indício de coexistência entre uma interface mais nova, chamada TRONweb, e telas históricas/legadas associadas a TRON2000. A transcrição não detalha a arquitetura, a estratégia de migração ou os prazos dessa evolução.

### 8.3. Módulo de sinistros

É o módulo central da sessão.

Responsabilidades apresentadas:

- registrar e tratar sinistros;
- abrir expedientes;
- classificar expedientes por tipo;
- valorá-los;
- controlar reservas;
- gerar liquidações;
- acionar planos de tramitação;
- integrar-se funcionalmente a módulos como peritagens, faturação, juízos e renda.

### 8.4. Emissão

A emissão é apresentada como origem do produto e de suas coberturas.

Responsabilidades citadas:

- definir produtos;
- configurar coberturas;
- fornecer a base contratual utilizada pelo módulo de sinistros.

### 8.5. Tesouraria

A tesouraria é apresentada como área/módulo posterior à geração de ordens de pagamento.

No caso discutido sobre exonerar o pagamento de prêmios, a apresentadora propõe que liquidações de sinistros possam ser compensadas contra recibos pendentes por meio da tesouraria.

### 8.6. Peritagens e investigações

O tipo de expediente pode ser configurado para entrar no módulo de peritagens.

Exemplos:

- danos próprios materiais;
- danos materiais a terceiros.

A apresentadora diferencia casos em que a peritagem é obrigatória daqueles em que pode não ser necessária, como no exemplo de reparação de vidro/parabrisa realizada diretamente por fornecedor.

### 8.7. Faturação

O tipo de expediente pode ser configurado para utilizar o módulo de faturação.

A apresentadora afirma que ele é usado normalmente em expedientes de saúde, mas poderia ser usado em outros tipos. Sua função seria substituir, em grande medida, a valoração e a liquidação tradicionais, pois o processamento seria conduzido por faturas.

### 8.8. Juízos

A palavra “juicio” aparece no sentido de processo judicial ou litígio.

O tipo de expediente pode:

- ser associado a um processo judicial;
- permitir um ou vários processos judiciais associados.

O exemplo fornecido é uma situação em que a seguradora pode demandar ou ser demandada por vários terceiros.

### 8.9. Plano de renda

O plano de renda é apresentado como mecanismo para gerar pagamentos periódicos, normalmente relacionado a invalidez temporária ou permanente em produtos de acidentes de trabalho, acidentes pessoais ou contextos semelhantes.

A funcionalidade busca evitar que um tramitador tenha de gerar manualmente uma liquidação todos os meses.

---

## 9. Configuração do tipo de expediente em nível de companhia

### 9.1. Chave identificadora

O tipo de expediente recebe uma chave de três posições.

Exemplos mencionados ou sugeridos:

- `ROB` para roubo;
- `DA` ou expressão semelhante para danos por água;
- uma chave para morte;
- `ZZZ` como tipo genérico usado em determinadas definições;
- `REF` como exemplo criado durante a demonstração.

A recomendação é que as três posições sejam claras para que o operador possa identificar rapidamente o tipo de dano que está sendo tratado.

### 9.2. Descrição

A chave recebe uma descrição legível, como:

- roubo;
- danos por água;
- morte;
- danos próprios.

A captura do sistema legado mostra um exemplo de código `DAM`, descrito como `DAÑOS MAT. TERCERO / DAMAGE`, com natureza `RC`, associada a “RESPONSABILIDAD CIVIL” (`Frame 08 @ 29:33`).

### 9.3. Uso em sinistros

A configuração define se o tipo será utilizado efetivamente em operações de sinistros.

A apresentadora explica que certos tipos podem existir apenas como recursos de configuração. O exemplo é `ZZZ`, utilizado para aplicar uma definição a todos os tipos de expediente sem que seja necessário configurar cada um individualmente.

Também é mencionado que tipos não operacionais podem ser usados em carga de carteira de sistema antigo, quando os expedientes são migrados apenas para histórico, sem intenção de abrir novos expedientes daquele tipo.

### 9.4. Expediente real

A evidência visual mostra o campo “Expediente Real” marcado no exemplo de tipo de expediente (`Frame 08 @ 29:33`). A fala indica que, em geral, os tipos usados operacionalmente em sinistros são definidos como reais.

A transcrição não fornece uma definição formal completa de todas as implicações do campo “Expediente Real”.

### 9.5. Natureza positiva ou negativa

O tipo de expediente deve ser classificado como positivo ou negativo.

A explicação indica que essa classificação está ligada à valoração do expediente. A apresentadora menciona explicitamente que, no caso de recobros positivos, a classificação será positiva.

A transcrição não detalha integralmente a semântica contábil ou atuarial dessa classificação para todos os cenários.

### 9.6. Agrupamento de tipos de expediente

O agrupamento permite consolidar tipos diferentes que possuem a mesma natureza funcional.

Exemplos:

- lesão de condutor e lesão de ocupante podem ser agrupadas como lesões;
- diferentes tipos de responsabilidade civil podem ser agrupados como responsabilidade civil;
- danos próprios com nomes distintos podem ser agrupados como danos próprios.

A finalidade é permitir análise conjunta, como cálculo ou consulta de sinistralidade por agrupamento, independentemente de diferenças de nomenclatura ou ramo.

A apresentadora afirma que o core já traz alguns agrupamentos, mas que podem ser definidos agrupamentos locais conforme a necessidade.

### 9.7. Habilitação

O campo de habilitação determina se o tipo de expediente está disponível para abertura.

A fala não detalha regras adicionais de governança, aprovação ou histórico de habilitação/desabilitação.

---

## 10. Recobros, salvamentos e dedutíveis

### 10.1. Recobro

A configuração deve indicar se o tipo de expediente é ou não de recobro.

Quando for de recobro, deve-se informar o tipo correspondente.

A apresentadora distingue ao menos duas situações:

| Tipo de recobro | Descrição apresentada |
|---|---|
| Material | Associado a salvamentos, como veículo ou material recuperado que será vendido |
| Econômico | Recuperação de valores, como franquia/dedutível do segurado ou valor devido por terceiro responsável |

### 10.2. Exemplos de recobro

Foram apresentados os seguintes cenários:

- segurado com franquia/dedutível: a companhia paga uma parte e busca recuperar a parte atribuída ao segurado;
- acidente causado por terceiro: a companhia busca recuperar do responsável ou da seguradora dele os valores pagos ao segurado;
- alagamento causado pelo vizinho superior: a companhia pode buscar recuperar o valor pago ao segurado junto ao vizinho ou à seguradora correspondente;
- veículo roubado, indenizado e posteriormente recuperado: a companhia passa a ter o veículo e poderá vendê-lo.

### 10.3. Efeito no cálculo de reservas

Historicamente, segundo a apresentadora, quando o TRON foi criado a regra era simples:

- expedientes que não eram recobros calculavam reservas;
- recobros não calculavam reservas.

A necessidade encontrada no México e depois em outros países levou a uma flexibilização. No caso de recobro material, um veículo recuperado pode reduzir o custo esperado do sinistro e, consequentemente, a reserva necessária.

Exemplo apresentado:

```text
Reserva original: 1.000 dólares
Valor estimado do veículo recuperado: 500 dólares
Reserva ajustada: 500 dólares
```

A configuração atual permitiria definir, para o tipo de expediente:

- calcula reservas;
- não calcula reservas;
- calcula conforme lógica de negócio.

A lógica de negócio poderia depender de informação registrada no próprio expediente, como a indicação de que o bem foi recuperado.

### 10.4. Recobro de dedutíveis/franquias: funcionalidade incompleta

Uma pergunta levantou se o tipo de recobro de dedutível seria novo e se teria comportamento específico.

A resposta dada esclarece que:

- é possível criar um tipo de expediente de recobro associado a dedutíveis/franquias;
- ele serve para diferenciar esse expediente de outros recobros;
- existem marcas/configurações relacionadas ao tema;
- há intenção de desenvolver uma funcionalidade completa baseada em dedutíveis;
- a funcionalidade desejada envolveria, entre outros aspectos, valoração negativa em expedientes positivos;
- os processos operacionais ainda não incorporaram integralmente essa capacidade;
- existe uma pré-análise, mas a funcionalidade completa ainda não havia sido fechada.

Esse é um dos principais limites reconhecidos durante a sessão.

---

## 11. Configuração por ramo

### 11.1. Associação ao ramo

Após a criação corporativa, o tipo de expediente é associado ao ramo em que será utilizado.

A apresentadora explica que é nessa associação que se definem as características reais do comportamento do tipo de dano dentro do produto.

### 11.2. Unicidade dentro do sinistro

A configuração pode indicar se o tipo de expediente é único no sinistro.

Isso significa que pode existir no máximo um expediente daquela tipologia para um mesmo sinistro.

Exemplos de tipos únicos:

- perda total do veículo segurado;
- morte do condutor.

Exemplos de tipos não únicos:

- lesões, pois pode haver várias pessoas lesionadas;
- danos a terceiros, pois um evento pode afetar vários terceiros;
- alagamento de vários vizinhos, cada um potencialmente associado a um expediente.

Essa configuração reflete uma regra de negócio por tipologia, e não uma limitação técnica genérica do sistema.

### 11.3. Moeda de valoração

O tipo de expediente deve definir a moeda na qual será valorado.

A apresentadora distingue claramente:

- **moeda de valoração/reserva do expediente**;
- **moeda efetiva de pagamento.**

Essas duas moedas podem ser diferentes.

Exemplos mencionados:

- a apólice pode estar em dólares ou pesos;
- o expediente pode usar a moeda da apólice;
- uma fatura pode precisar ser paga em outra moeda, em casos de viagem, aviação, transporte de mercadorias ou ocorrência no exterior.

O código `99` é mencionado como indicação para que o expediente seja aberto na mesma moeda da apólice.

### 11.4. Moeda única

A configuração também define se a moeda é única.

| Configuração | Efeito |
|---|---|
| Moeda única = sim | O tramitador não pode alterar a moeda do expediente |
| Moeda única = não | O sistema propõe a moeda definida, mas o tramitador pode alterá-la |

A apresentadora usa como exemplo uma situação em que a legislação exige que todos os expedientes sejam abertos na moeda do país. Nesse caso, seria definida a moeda local e marcada como única.

---

## 12. Estruturas de informação

### 12.1. Código de estrutura

O código de estrutura define quais informações devem ser solicitadas para um tipo de expediente.

A apresentadora explica que ele representa um conjunto de propriedades ou atributos solicitados no processo de abertura e tratamento do expediente.

Exemplos de informações que podem compor uma estrutura:

- local do roubo;
- circunstâncias do evento;
- tipo de lesão;
- dados do lesionado;
- documento de identificação;
- número identificador;
- nome;
- sobrenomes;
- telefone;
- data de notificação;
- obrigatoriedade de preenchimento;
- validação contra catálogos;
- valores iniciais.

### 12.2. Estrutura fixa

Uma estrutura pode ser fixa para determinado tipo de expediente.

Exemplo: uma estrutura denominada, hipoteticamente, “dados do lesionado” pode solicitar documento, nome, telefone e tipo de lesão.

### 12.3. Estrutura condicionada por informação anterior

A estrutura pode depender de uma informação selecionada previamente no sinistro.

Exemplo apresentado:

- tipo de expediente de danos próprios;
- se a consequência for vidro/parabrisa, pode ser solicitada menos informação;
- se a consequência for dano próprio mais amplo, pode ser solicitada uma estrutura completa.

Isso demonstra que o tipo de expediente pode ter comportamento variável conforme dados anteriores da abertura ou classificação do sinistro.

### 12.4. Ausência de estrutura específica

Também é possível que um tipo de expediente não solicite informação específica.

A apresentadora descreve essa alternativa como uma estrutura “todo nueves” ou expressão semelhante — provavelmente uma referência a um código composto por noves, mas a transcrição não permite confirmar a nomenclatura exata.

---

## 13. Plano de tramitação

### 13.1. Finalidade

O plano de tramitação determina os procedimentos necessários para tratar o expediente desde sua abertura até sua conclusão.

A apresentadora afirma que ele pode incluir, entre outros:

- pedido de peritagem;
- envio de cartas ao segurado;
- envio de cartas a advogado;
- intervenções de fornecedores;
- atendimento hospitalar;
- atuação médica;
- revisões;
- ações de oficina;
- demais trâmites necessários para resolução do caso.

### 13.2. Diferentes tipos de dano exigem planos distintos

A sessão reforça que danos materiais, lesões e outros tipos de expediente não devem necessariamente seguir o mesmo fluxo.

Exemplos:

| Tipo de expediente | Possível tramitação |
|---|---|
| Danos materiais | Perito, oficina, fornecedor, reparação |
| Lesões | Hospital, médico, revisões, documentação de saúde |
| Vidro/parabrisa | Atendimento direto por fornecedor, fluxo simplificado |
| Perda total | Peritagem, classificação de perda total, contato com segurado |

### 13.3. Plano fixo ou condicionado

O plano pode ser:

- fixo;
- determinado por informação inserida anteriormente.

O exemplo usado é novamente o dano próprio em veículo:

- danos gerais podem exigir peritagem e tratamento completo;
- dano exclusivo de vidro pode ter um fluxo simplificado, no qual o fornecedor atende, repara e a seguradora apenas realiza o pagamento.

### 13.4. Critério para criar novo tipo de expediente

A apresentadora sugere que a necessidade de um plano de tramitação totalmente distinto pode ser um indicador de que deve ser criado um novo tipo de expediente.

O mesmo vale quando a informação solicitada for substancialmente diferente.

Essa é uma orientação funcional importante:

```text
Dados diferentes de forma relevante
ou
Plano de tramitação diferente de forma relevante
↓
Pode justificar novo tipo de expediente
```

---

## 14. Reservas, abertura e causas operacionais

### 14.1. Cálculo de reservas

A configuração define se o tipo de expediente participa ou não do cálculo de reservas no fechamento de período.

As opções apresentadas são:

- sim;
- não;
- conforme lógica de negócio.

### 14.2. Causas de abertura

O sistema possui causas associadas a operações como:

- abertura;
- modificação;
- anulação de liquidação;
- habilitação;
- terminação de sinistro;
- modificação de expediente.

A apresentação indica que essas causas precisam ser definidas previamente em outras configurações.

O tipo de expediente pode exigir que, ao ser aberto, seja informada a causa da abertura.

### 14.3. Uso analítico das causas

A apresentadora sugere que a recorrência de modificações, reaberturas ou ajustes pode revelar problemas de desenho operacional.

Exemplos de interpretações oferecidas durante a fala:

- se o expediente é frequentemente reaberto, talvez esteja sendo fechado cedo demais;
- se a informação é constantemente alterada, talvez faltem dados na abertura;
- se há necessidade recorrente de correção, talvez seja necessário solicitar determinada informação desde o início.

Essa não é apresentada como uma regra automática da ferramenta, mas como uma prática de análise do processo.

### 14.4. Valoração inicial: manual ou média

Na abertura, o sistema pode permitir:

- uma valoração inicial ajustada manualmente pelo tramitador;
- uma valoração média, previamente definida em tabelas.

A configuração permite bloquear a alteração manual e obrigar o uso da valoração média.

| Configuração | Resultado |
|---|---|
| Valoração ajustada permitida | Tramitador pode escolher valoração manual ou automática/média |
| Valoração ajustada não permitida | Sistema sempre assume a valoração média configurada |

A apresentadora explica que algumas companhias preferem não permitir alteração até que exista informação suficiente para uma valoração mais precisa.

---

## 15. Uso de módulos por tipo de expediente

### 15.1. Juízos

A configuração pode definir:

- se o tipo de expediente pode estar associado a um processo judicial;
- se pode ter um ou vários processos judiciais.

### 15.2. Peritagens e investigações

A configuração indica se o tipo de expediente será tratado pelo módulo de peritagens.

Exemplos de uso:

- dano próprio material: normalmente aplicável;
- dano material a terceiro: normalmente aplicável;
- lesão de ocupante: no exemplo da apresentadora, poderia não exigir peritagem.

### 15.3. Obrigatoriedade de peritagem

A obrigatoriedade pode ser:

- sim;
- não;
- dependente de outras condições.

Quando obrigatória, a liquidação verifica se a peritagem foi realizada.

O exemplo de vidro/parabrisa é usado para mostrar uma exceção: se há fornecedor especializado que recebe o segurado, repara o item e informa/aciona a companhia, a peritagem pode não ser necessária.

### 15.4. Faturação

A configuração define se o tipo de expediente utilizará o módulo de faturação.

Segundo a sessão:

- é usado normalmente em expedientes de saúde;
- pode ser usado em outros contextos;
- pode substituir parte relevante da valoração e da liquidação convencionais;
- o processamento passa a ocorrer por faturas.

### 15.5. Plano de renda mensal

O tipo de expediente pode ser marcado para uso do plano de renda.

A funcionalidade foi associada a casos em que a seguradora paga periodicamente um valor ao segurado, como em invalidez temporária ou permanente.

---

## 16. Modelo operacional do plano de renda

### 16.1. Objetivo

O plano de renda busca automatizar pagamentos periódicos, evitando a necessidade de criação manual de liquidações em cada período.

### 16.2. Funcionamento descrito

Na abertura ou tratamento do expediente:

1. associa-se um plano de renda;
2. o plano define uma periodicidade e quantidade de pagamentos;
3. o sistema gera as liquidações conforme as regras do plano;
4. há um processo periódico que revisa planos próximos do vencimento e gera liquidações futuras conforme aplicável.

A apresentadora afirma que o sistema pode gerar, por exemplo, as liquidações de um ano inteiro, e que um processo mensal revisa os planos para gerar novos pagamentos necessários.

### 16.3. Pergunta sobre exonerar pagamento de prêmios

Foi questionado se o plano de renda poderia ser usado para uma cobertura de exonerar o pagamento de prêmios, isto é, considerar pagos os recibos futuros de uma apólice até o vencimento.

A resposta inicial foi cautelosa: a apresentadora observou que o plano de renda gera pagamentos, enquanto a necessidade descrita era dar recibos como cobrados/pagos.

Após esclarecimento adicional, ela indica uma alternativa funcional:

1. configurar um plano de renda com o valor total e número de parcelas;
2. gerar liquidações periódicas correspondentes aos recibos;
3. em tesouraria, compensar ou “netear” a liquidação de sinistros com o recibo pendente.

Exemplo citado:

```text
10 recibos de 500
↓
Plano de renda de 5.000
↓
10 liquidações de 500
↓
Compensação periódica contra os recibos pendentes
```

### 16.4. Limite documental

A apresentadora informa que a funcionalidade de plano de renda ainda não estava documentada no portal, mas que havia bastante documentação em Word que poderia ser disponibilizada.

---

## 17. Processos automáticos de abertura de expedientes

A parte final da sessão introduz configurações ligadas à abertura automática de expedientes.

### 17.1. Dependência do ramo

A regra é apresentada em dois níveis:

1. o ramo deve permitir abertura automática de expedientes;
2. o tipo de expediente deve definir se poderá ser aberto automaticamente.

### 17.2. Possibilidades de decisão

Para cada tipo de expediente, a abertura automática pode ser:

- permitida;
- não permitida;
- dependente de condições ou parâmetros.

Exemplo dado:

- se um expediente de lesão chega de uma fonte mencionada na transcrição como “colectiente” ou termo semelhante;
- e se os dados de documento e tipo de identificação estiverem disponíveis;
- então o sistema pode abrir o expediente automaticamente;
- caso contrário, não o abre.

O nome da fonte de dados foi reconhecido de forma imprecisa pela transcrição. Não é possível identificar com segurança o sistema ou canal de origem.

### 17.3. Quantidade de expedientes automáticos

A automação também pode definir quantos expedientes do mesmo tipo devem ser abertos.

Exemplo:

- uma informação de origem indica duas pessoas lesionadas;
- uma chamada Maria e outra Pedro;
- se o tipo de expediente for “lesionados”, o sistema pode abrir dois expedientes.

### 17.4. Avisos operacionais

A configuração pode determinar avisos ao tramitador quando:

- um expediente é aberto;
- um expediente é reatribuído;
- um expediente é modificado.

O exemplo dado para reatribuição é um expediente que entra em processo judicial e precisa ser transferido a um tramitador habilitado para esse tipo de caso.

---

## 18. Fluxo de definição do tipo de expediente

A evidência visual apresenta um fluxograma formal para definição de um tipo de expediente por ramo (`Frame 07 @ 25:52`).

```text
Definir tipo de expediente da companhia
↓
Definir tipo de expediente do ramo
↓
Verificar se os conceitos de reserva estão definidos
├── Não/necessário → Definir conceitos de reserva
↓
Definir coberturas do tipo de expediente
↓
Verificar se é tipo de expediente de recobro
├── Sim → Definir recobros por tipo de expediente
↓
Verificar se existem tipos incompatíveis no mesmo sinistro
├── Sim → Definir tipos de expediente excludentes
↓
Definir definições extras
↓
Fim
```

A documentação exibida também lista os tópicos relacionados:

1. Definir tipo de expediente da companhia;
2. Definir tipo de expediente do ramo;
3. Definir conceito de reserva;
4. Definir coberturas do tipo de expediente;
5. Definir recobros por tipo de expediente;
6. Definir tipos de expediente excludentes;
7. Definir validações de expedientes.

### 18.1. Observação sobre escopo

A transcrição abordou detalhadamente apenas parte desse fluxo, especialmente:

- definição da companhia;
- associação ao ramo;
- moeda;
- estrutura;
- plano de tramitação;
- reservas;
- módulos;
- automação.

Os seguintes itens foram mostrados no fluxograma, mas não aprofundados na fala transcrita:

- conceitos de reserva;
- coberturas do tipo de expediente;
- tipos de expediente excludentes;
- validações de expedientes;
- definições extras.

---

## 19. Exemplo visual de configuração

A tela exibida no `Frame 08 @ 29:33` mostra um exemplo concreto de cadastro de tipo de expediente.

| Campo visível | Valor apresentado |
|---|---|
| Tipo de expediente | `DAM` |
| Descrição | `DAÑOS MAT. TERCERO / DAMAGE` |
| Natureza do expediente | `RC` |
| Descrição da natureza | `RESPONSABILIDAD CIVIL` |
| Expediente Real | Marcado |
| Expediente de Recobro | Desmarcado |
| Expediente Positivo | Marcado |
| Tipo de recobro | Vazio |
| Situação de inabilitação | Campo indicado como “Inhabilitado” |

A própria documentação exibida afirma que o tipo de expediente é a chave que identificará os diferentes danos decorrentes do sinistro e que uma mesma chave poderá ser usada para um ou vários ramos.

---

## 20. Perguntas e respostas relevantes

### 20.1. Pergunta: o recobro de dedutível é um tipo novo? Ele se comporta como recobro normal?

**Intenção da pergunta:** entender se o recobro associado a franquias/dedutíveis possui comportamento específico ou se serve apenas para classificação.

**Resposta apresentada:**

- ele pode ser criado como tipo de expediente de recobro para franquias;
- serve para distingui-lo dos demais recobros;
- existem configurações/marcas previstas;
- uma funcionalidade completa de dedutíveis ainda está em desenvolvimento/análise;
- a intenção é permitir tratamento mais completo, incluindo valoração negativa em expedientes positivos;
- os processos ainda não incorporaram integralmente essa funcionalidade.

**O que a resposta esclarece:**  
A configuração de um tipo não garante, por si só, que todo o comportamento operacional esperado esteja implementado. Há separação entre existência de campos de configuração e disponibilidade completa dos processos de negócio.

---

### 20.2. Pergunta: o plano de renda pode ser usado para exonerar o pagamento de prêmios?

**Intenção da pergunta:** verificar se uma funcionalidade de pagamentos periódicos poderia ser reutilizada para tratar recibos futuros da apólice como pagos.

**Resposta apresentada:**

- o plano de renda gera pagamentos/liquidações;
- dar recibos como cobrados é uma necessidade diferente;
- seria possível estruturar um plano com o valor total e as parcelas;
- as liquidações poderiam ser geradas periodicamente;
- em tesouraria, seria necessário compensá-las contra os recibos pendentes.

**O que a resposta esclarece:**  
A funcionalidade poderia ser adaptada por composição de mecanismos existentes, mas depende de integração operacional com tesouraria e de uma lógica de compensação entre liquidações de sinistros e recibos.

---

### 20.3. Pergunta: a mensalidade do plano de renda é gerada automaticamente ou exige ação manual?

**Intenção da pergunta:** compreender o nível de automação do plano de renda.

**Resposta apresentada:**

- não é necessário clicar mensalmente;
- o sistema pode gerar as liquidações previstas no plano;
- pode gerar pagamentos do mês, do ano ou conforme a configuração;
- há processo periódico que revisa os planos e gera as liquidações futuras necessárias.

**O que a resposta esclarece:**  
O plano de renda é apresentado como mecanismo de automação de pagamentos recorrentes, com processamento periódico do sistema.

---

## 21. Limitações e pontos explicitamente reconhecidos

### 21.1. Funcionalidade de dedutíveis ainda incompleta

Embora haja configuração para recobro de dedutíveis, o tratamento completo ainda não estava finalizado.

### 21.2. Documentação de plano de renda ausente do portal

A apresentadora afirma que o plano de renda ainda não está documentado no portal, apesar de existir documentação em Word.

### 21.3. Coexistência de manutenções em interfaces diferentes

A formação afirma que parte das manutenções vem sendo levada gradualmente para TRONweb, mas muitas ainda permanecem na interface anterior.

### 21.4. Continuidade da formação

A sessão não encerra todos os temas. A apresentadora informa que os parâmetros automáticos seriam retomados e detalhados no encontro seguinte.

### 21.5. Itens do fluxo não aprofundados

Embora o fluxograma mostre conceitos de reserva, coberturas, recobros, incompatibilidades e validações, a transcrição não permite reconstruir em detalhe a configuração de todos eles.

---

## 22. Riscos e desafios

### 22.1. Riscos explicitamente mencionados

| Risco ou problema | Evidência na sessão |
|---|---|
| Definição inadequada de tipos de expediente | A formação enfatiza a dúvida sobre criar ou não criar novos tipos |
| Falta de dados na abertura | Pode levar a modificações, reaberturas ou necessidade de complementar dados |
| Encerramento precoce de expediente | Mencionado como hipótese para reaberturas recorrentes |
| Uso de funcionalidade parcialmente desenvolvida | Caso de recobro de dedutíveis |
| Configuração de automação com dados insuficientes | Abertura automática depende da qualidade das informações recebidas |
| Ausência de documentação centralizada para plano de renda | Material estaria disponível em Word, não no portal |

### 22.2. Desafios derivados do contexto

> **Análise derivada, não afirmação literal dos participantes.**

1. **Governança de catálogo:** como os tipos são criados em nível de companhia e associados a ramos, é necessário evitar duplicação semântica e inconsistências entre produtos.

2. **Alinhamento entre emissão e sinistros:** a correta tramitação depende de as coberturas refletirem necessidades reais de sinistros, inclusive cláusulas e condições especiais.

3. **Qualidade de dados de origem:** a abertura automática depende de dados recebidos em nível suficiente para identificar o tipo e, quando aplicável, a quantidade de expedientes.

4. **Complexidade configuracional:** cada tipo pode combinar moeda, estrutura, plano, reserva, causas, módulos, automações e avisos. Isso exige testes e governança antes de produção.

5. **Evolução funcional:** recursos parcialmente implementados exigem cuidado para que a configuração disponível não seja interpretada como uma capacidade operacional completa.

---

## 23. Transformações e implicações observadas

> Esta seção apresenta leituras analíticas sustentadas pelo conjunto de falas. Não substitui declarações formais da organização.

### 23.1. De classificação simples para orquestração operacional

O tipo de expediente é apresentado não apenas como categoria de dano, mas como um elemento que orquestra diversos comportamentos do processo.

```text
Tipo de expediente
≠ apenas nome do dano

Tipo de expediente
= regra de processo, dados, reserva, moeda, módulos, automação e comunicação
```

### 23.2. De produto isolado para ciclo integrado

A formação deixa claro que o sinistro não pode ser modelado isoladamente. Ele depende da emissão, impacta reservas e gera consequências em tesouraria.

Isso aponta para uma visão de ciclo de vida:

```text
Produto e cobertura
↓
Apólice
↓
Sinistro
↓
Expediente
↓
Liquidação
↓
Tesouraria
```

### 23.3. De operação manual para automação condicionada

A plataforma prevê abertura automática, geração periódica de liquidações e avisos operacionais. Contudo, a automação é condicionada por:

- configuração do ramo;
- configuração do tipo;
- qualidade dos dados;
- lógica de negócio;
- informações recebidas na abertura.

A mensagem não é de automação irrestrita, mas de automação governada por regras.

### 23.4. De processos homogêneos para tratamento específico por natureza de dano

A apresentação reforça que danos materiais, lesões, perdas totais, vidros, recobros e outros cenários possuem fluxos diferentes. O tipo de expediente é o mecanismo configurável que permite adaptar o processo sem necessariamente modificar o núcleo do sistema.

---

## 24. Números e indicadores mencionados

Os números abaixo foram declarados durante a sessão e não foram auditados externamente.

| Indicador | Valor mencionado | Contexto |
|---|---:|---|
| Posições da chave do tipo de expediente | 3 | Identificador recomendado para a tipologia |
| Valor de reserva no exemplo | 1.000 dólares | Reserva de um sinistro antes da recuperação do bem |
| Valor do veículo recuperado no exemplo | 500 dólares | Bem recuperado que reduziria o custo estimado |
| Reserva resultante no exemplo | 500 dólares | Reserva após considerar veículo recuperado |
| Recibos no exemplo de plano de renda | 10 | Recibos futuros a compensar |
| Valor de cada recibo no exemplo | 500 | Valor unitário dos recibos/liquidações |
| Valor total do plano no exemplo | 5.000 | Soma de 10 parcelas de 500 |
| Sessões previstas no mês | Pelo menos 3 | A apresentadora afirma que os participantes a ouviriam pelo menos três vezes no mês |
| Exemplo de geração anual | 12 liquidações | Plano mensal anualizado |

---

## 25. Roadmap e evolução citados

### 25.1. Próxima sessão

A apresentadora informa que a formação continuaria no encontro seguinte, com retomada e aprofundamento das “marcas automáticas” ou parâmetros ligados a processos automáticos.

### 25.2. TRONweb

Há uma evolução gradual das manutenções para TRONweb. Não foram apresentados:

- cronograma;
- escopo exato de migração;
- responsáveis;
- critérios de priorização;
- data de término.

### 25.3. Dedutíveis

Existe intenção de desenvolver uma funcionalidade completa baseada em dedutíveis/franquias, incluindo o tratamento mencionado de valorações negativas em expedientes positivos.

A reunião não apresenta prazo, responsável ou compromisso formal de entrega.

### 25.4. Documentação do plano de renda

A documentação ainda não estava no portal, mas a apresentadora afirma que há material em Word que pode ser compartilhado.

---

## 26. O que a reunião não permite concluir

A sessão é rica em configuração funcional, mas não fornece detalhes suficientes sobre diversos temas importantes.

Não é possível concluir com segurança:

- qual linguagem de programação compõe o Reef.core;
- se o sistema utiliza microsserviços, monólito ou arquitetura híbrida;
- qual banco de dados é usado;
- qual provedor de cloud é utilizado;
- se há Kubernetes, containers ou orquestração semelhante;
- como APIs e integrações são implementadas;
- quais mecanismos de mensageria ou eventos existem;
- como funciona IAM, autenticação, autorização ou segregação de acesso;
- como são tratados LGPD, privacidade, retenção e proteção de dados;
- quais são os SLAs, RTOs, RPOs ou estratégias de disaster recovery;
- como ocorre CI/CD;
- quais ambientes existem além dos mencionados em tela;
- como são promovidas configurações entre ambientes;
- como são auditadas alterações de configuração;
- quais regras exatas definem reservas;
- como são implementadas as regras de incompatibilidade entre expedientes;
- como são feitos testes funcionais, regressivos ou de integração;
- qual é o modelo de suporte e incidentes;
- qual é a estrutura organizacional responsável pelo produto;
- quais países utilizam cada capacidade;
- qual é o status de implantação de TRONweb;
- se o material exibido representa produção, homologação, treinamento ou ambiente acadêmico.

---

## 27. Conclusões principais

1. **O tipo de expediente é uma peça central de configuração funcional no módulo de sinistros.** Ele não representa apenas uma classificação de dano: define dados, tramitação, reservas, módulos, automação e comunicação operacional.

2. **A definição deve começar pelas coberturas do produto.** Coberturas sinistráveis precisam estar associadas a tipos de expediente que permitam seu tratamento.

3. **Há uma separação entre catálogo corporativo e comportamento por ramo.** A companhia cria a tipologia; o ramo define como ela se comporta no contexto do produto.

4. **A decisão de criar um novo tipo deve ser orientada por diferenças reais de dados e processo.** Estruturas de informação, planos de tramitação e necessidades operacionais diferentes podem justificar a separação.

5. **A solução suporta processos complexos e condicionais.** Moedas, reservas, peritagens, faturação, juízos, planos de renda e aberturas automáticas podem variar por tipo e por regra de negócio.

6. **A automação depende de qualidade e disponibilidade de dados.** Abertura automática e geração de expedientes requerem parâmetros e informações suficientemente completas.

7. **Nem toda configuração disponível corresponde a uma funcionalidade madura.** O caso dos dedutíveis evidencia que existem capacidades configuracionais cuja implementação processual ainda está em evolução.

8. **A documentação é tratada como ativo operacional.** O portal Marketplace reúne documentação e referências às sessões, enquanto parte do conhecimento ainda reside em materiais complementares, como documentos Word.

9. **A formação continua em sessões posteriores.** A reunião analisada encerra com temas pendentes, especialmente a explicação detalhada dos parâmetros automáticos.
