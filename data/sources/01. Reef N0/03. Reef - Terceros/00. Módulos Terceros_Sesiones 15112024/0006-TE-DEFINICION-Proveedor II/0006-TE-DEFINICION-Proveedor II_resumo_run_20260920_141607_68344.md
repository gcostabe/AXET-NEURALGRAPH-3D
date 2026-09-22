# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `0006-TE-DEFINICION-Proveedor II.mp4`
**Data de processamento:** 20/09/2026 14:21:09
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise Estruturada — Configuração de Terceiros Fornecedores, Tarifas, Fraudes e IQRFs no RIFCOR

> **Base documental:** transcrição fornecida, sem timestamps ou numeração de linhas.  
> **Nota de terminologia:** a transcrição registra variações como “Riftcore”, “RIFCOR” e “Rizcor”. Neste documento, será utilizado **RIFCOR**, por ser a forma mais recorrente e aparentemente referida ao mesmo sistema. Isso é uma normalização editorial, não uma confirmação formal do nome do produto.

## 1. Síntese executiva

A reunião é predominantemente um treinamento funcional sobre a configuração do domínio de **terceiros fornecedores** no RIFCOR, com foco em fornecedores que participam da operação de sinistros: oficinas, clínicas, hospitais, prestadores de assistência, guinchos e outros tipos de rede.

O conteúdo descreve como a companhia pode configurar catálogos para definir:

- quais serviços os fornecedores podem prestar;
- quais serviços se aplicam a cada atividade, tipologia e categoria de fornecedor;
- como os fornecedores são escolhidos para executar um serviço;
- como as zonas geográficas influenciam a atribuição e a tarifação;
- como tarifas, conceitos tarifários, moedas e limites de pagamento são administrados;
- como medir o desempenho dos fornecedores;
- como estruturar a identificação, classificação e tratamento de fraudes;
- como tratar incidências, queixas, reclamações e felicitações relacionadas a fornecedores.

A mensagem central é que o RIFCOR disponibiliza uma estrutura altamente configurável, mas grande parte do comportamento operacional não nasce automaticamente dos catálogos. Em vários pontos, a configuração depende de **lógicas de negócio implementadas em pacotes Oracle**, regras locais, processos batch, integrações com sinistros e decisões tomadas pelas áreas de negócio de cada país.

A apresentação reconhece que a modelagem atual parece estar mais amadurecida para o ramo de automóveis — especialmente oficinas, veículos, guinchos e redes de assistência —, mas sustenta que o modelo conceitual pode ser adaptado para outros ramos, como saúde, vida e acidentes. Essa adaptação, porém, pode exigir evolução funcional e tecnológica, principalmente em portais de autosserviço e em atributos específicos de cada tipo de fornecedor.

---

## 2. Contexto e antecedentes

A sessão dá continuidade a um treinamento anterior. O ponto de partida mencionado são os “convênios de pagamento por ramo e atividade”, avançando agora para definições específicas relacionadas aos serviços prestados por fornecedores terceirizados.

O treinamento parece fazer parte de uma formação sobre a configuração do RIFCOR, possivelmente destinada a pessoas que atuarão no levantamento de requisitos, implementação ou parametrização em diferentes países. O instrutor enfatiza repetidamente que os participantes devem compreender o modelo funcional para conseguirem extrair requisitos das áreas locais.

A perspectiva apresentada é corporativa, associada à estratégia do grupo MAPFRE. Ainda assim, a transcrição ressalta que a operação concreta varia muito entre países e estruturas locais:

- países podem possuir organizações, regulações e necessidades diferentes;
- estruturas locais podem ter autonomia prática sobre a implementação;
- regras corporativas podem existir, mas nem sempre podem ser aplicadas literalmente;
- há casos em que será necessário realizar mapeamentos entre modelos locais e modelos corporativos.

Um exemplo citado é o de uma definição corporativa de estrutura de produtos que, segundo a fala, não pôde ser adotada integralmente no Uruguai. A transcrição não detalha o motivo dessa impossibilidade, mas indica que pode ser necessário mapear informações locais para permitir comparações corporativas consistentes.

---

## 3. Problemas e necessidades abordados

### 3.1. Necessidade de catalogar serviços de fornecedores

A companhia precisa identificar, de forma estruturada, quais serviços podem ser prestados por fornecedores. Essa necessidade não se restringe a um único ramo: embora os exemplos sejam concentrados em automóveis, o modelo pretende acomodar diferentes atividades.

Exemplos mencionados:

- reparação de chapa;
- pintura;
- reparação de vidros;
- serviços de assistência;
- cessão de veículo de cortesia;
- hospedagem em situações de assistência em estrada;
- atos médicos;
- serviços de clínicas e hospitais.

A consequência de não estruturar esses serviços seria dificultar a associação entre fornecedores, pagamentos, sinistros, tarifas e critérios de seleção.

### 3.2. Necessidade de selecionar o fornecedor adequado

O sistema precisa permitir que a companhia determine a quem um serviço será atribuído quando houver vários fornecedores possíveis.

A seleção pode considerar, entre outros fatores citados:

- proximidade do evento;
- capacidade do fornecedor;
- avaliação do fornecedor;
- indicadores ou KPIs;
- atividade;
- tipologia;
- categoria;
- zona geográfica;
- regras próprias da operação local.

A transcrição deixa claro que o catálogo não resolve automaticamente a seleção. Ele suporta a definição dos critérios, mas a decisão efetiva depende de uma lógica de negócio que deve ser implementada.

### 3.3. Necessidade de separar geografias operacionais

A estrutura geográfica oficial de um país — estados, províncias, municípios, localidades e outros níveis administrativos — não necessariamente atende às necessidades da operação de fornecedores.

A reunião diferencia pelo menos duas visões geográficas:

1. **Estrutura geográfica do país**  
   Representa sua organização territorial.

2. **Estrutura zonal para fornecedores**  
   Representa uma divisão operacional criada pela companhia, que pode ser usada para:
   - tarifação;
   - atribuição de serviços a fornecedores.

A necessidade existe porque uma zona operacional pode reunir partes de diferentes divisões administrativas. Uma zona de fornecedores, portanto, não precisa corresponder a uma única província, município ou região oficial.

### 3.4. Necessidade de controlar valores pagos a fornecedores

A companhia precisa estruturar tarifas aplicáveis a fornecedores e estabelecer:

- códigos de tarifa;
- conceitos tarifários;
- zonas de aplicação;
- moedas;
- valores mínimos;
- valores máximos;
- associação entre tarifas e perfis de fornecedores.

O objetivo aparente é criar uma base controlada para pagamentos derivados da tramitação de sinistros, especialmente nos conceitos associados a honorários e despesas.

### 3.5. Necessidade de acompanhar desempenho e utilização dos canais

A reunião apresenta métricas de serviço para fornecedores. Essas métricas podem ser usadas para avaliar:

- uso do autosserviço ou portal de fornecedores;
- tempo de resposta;
- tempo de espera;
- número ou percentual de recusas;
- valores;
- dias;
- horas.

A configuração da métrica, isoladamente, não gera uma ação automática. A companhia precisa definir como medi-la e o que fazer quando objetivos não forem cumpridos.

### 3.6. Necessidade de identificar e tratar fraudes

O modelo inclui diversos catálogos para fraudes relacionados a clientes e fornecedores. O objetivo é estruturar informações como:

- indicadores de fraude;
- tipos de fraude;
- conclusões;
- classificações;
- motivos;
- estados da gestão;
- relacionamento entre motivo, tipo e conclusão;
- controles de valores em liquidações por ramo.

A configuração pretende apoiar o tratamento do fraude, mas não substitui os processos operacionais, jurídicos, técnicos ou regulatórios necessários após sua identificação.

### 3.7. Necessidade de registrar IQRFs de fornecedores

A transcrição usa a sigla **IQRF** para se referir a incidências, queixas, reclamações e felicitações. Há catálogos transversais, pertencentes ao módulo de comuns, e catálogos específicos do domínio de fornecedores.

A finalidade é registrar e classificar comunicações relacionadas à experiência com fornecedores, como uma queixa sobre o atendimento de uma oficina, clínica, central telefônica ou prestador considerado “embaixador” da companhia.

---

## 4. Modelo conceitual da solução apresentada

A solução descrita não é uma única funcionalidade, mas uma rede de catálogos interdependentes. Esses catálogos configuram os elementos que serão utilizados por outros processos, sobretudo pela tramitação de sinistros.

Uma representação analítica do modelo apresentado é:

```text
Fornecedor
├── Atividade
├── Tipologia
├── Categoria
├── Serviços que pode prestar
├── Zonas em que atua
├── Tarifas aplicáveis
├── Capacidade e horários de atendimento
├── Métricas de desempenho
├── Histórico e tratamento de fraude
└── IQRFs associados

Sinistro / expediente
├── Identifica a necessidade de um serviço
├── Aplica critérios de atribuição
├── Seleciona ou propõe fornecedor
├── Registra serviços e liquidações
├── Usa conceitos contábeis associados
├── Calcula ou controla valores
├── Pode medir desempenho operacional
└── Pode registrar fraude ou IQRF
```

A transcrição sugere que os catálogos funcionam como a base declarativa da solução, enquanto o comportamento efetivo — seleção, cálculo, validação, priorização ou sanção — pode depender de implementações adicionais.

---

## 5. Arquitetura funcional consolidada

> O diagrama abaixo é uma **consolidação analítica** do conteúdo explicado na reunião. Não foi apresentado literalmente dessa forma.

```text
Áreas locais / Operação / Negócio
        ↓
Definição de regras, critérios e necessidades do país
        ↓
Catálogos de fornecedores no RIFCOR
        ├── Serviços
        ├── Atividade, tipologia e categoria
        ├── Critérios de atribuição
        ├── Zonas
        ├── Tarifas e conceitos tarifários
        ├── Métricas
        ├── Fraudes
        └── IQRFs
        ↓
Lógicas de negócio implementadas
(em pacotes Oracle, segundo a transcrição)
        ↓
Módulo de sinistros
        ├── Tramitação de expediente
        ├── Atribuição de fornecedor
        ├── Liquidação
        ├── Reservas
        ├── Indenizações
        ├── Honorários
        └── Gastos
        ↓
Tesouraria / conceitos de cobrança e pagamento diversos
        ↓
Fornecedor, portal/autosserviço e canais externos
```

### 5.1. Papel do módulo de sinistros

O módulo de fornecedores é apresentado como fortemente dependente de sinistros. A fala é explícita ao afirmar que “fornecedores sem sinistros não são nada”, no sentido de que a maior parte da utilidade operacional dos cadastros se materializa quando há tramitação de um expediente.

No fluxo descrito:

1. ocorre um sinistro ou evento;
2. o expediente exige determinado serviço;
3. uma lógica seleciona ou define fornecedor;
4. o serviço é atribuído;
5. o fornecedor executa ou registra etapas no autosserviço;
6. há liquidação associada a conceitos de sinistro;
7. os valores se conectam a conceitos contábeis de cobrança e pagamento;
8. a operação pode gerar medições, IQRFs ou investigação de fraude.

### 5.2. Papel dos pacotes Oracle

A transcrição menciona diversas vezes “paqueteria Oracle” ou “pacotes Oracle”. A fala sugere que essas implementações concentram regras que não são resolvidas apenas pela parametrização.

Entre os comportamentos possivelmente implementados nesses pacotes estão:

- aplicação dos critérios de atribuição;
- definição do fornecedor selecionado;
- resolução de sobreposições entre regras;
- cálculos ou obtenção de valores;
- controles relacionados a fraudes;
- validações específicas;
- execução de lógicas dependentes do país.

A transcrição não especifica a tecnologia, linguagem, estrutura interna, repositório ou responsáveis por esses pacotes.

---

## 6. Catálogo de serviços de fornecedores

O primeiro grupo de tabelas apresentado diz respeito aos serviços prestados por fornecedores.

### 6.1. Catálogo corporativo ou por companhia de serviços

A primeira tabela registra, por companhia:

- código do serviço;
- tipologia do serviço;
- idioma;
- descrição;
- indicador de inabilitação.

A ideia é manter um catálogo amplo de serviços possíveis, abrangendo as atividades de todos os fornecedores da companhia.

A tipologia indicada possui duas categorias principais:

| Tipologia | Significado explicado |
|---|---|
| Serviço normal ou padrão | Serviço ordinário ligado à atividade principal do fornecedor |
| Serviço de valor agregado | Serviço adicional oferecido além da execução principal |

Exemplos apresentados para automóveis:

| Tipo | Exemplos citados |
|---|---|
| Normal | reparação de chapa, pintura, vidros, reparação de danos |
| Valor agregado | veículo de cortesia, hospedagem durante assistência em estrada |

A transcrição indica que a tipologia é tratada como um tipo fixo, sem previsão de alteração livre no catálogo.

### 6.2. Serviços por atividade, tipologia e categoria de fornecedor

Em uma camada mais específica, o sistema relaciona serviços a combinações de:

- companhia;
- código de atividade do terceiro;
- tipologia do fornecedor;
- categoria do fornecedor;
- código de serviço;
- período de validade;
- conceito contábil.

O objetivo é determinar quais serviços daquele catálogo geral são aplicáveis a determinado perfil de fornecedor.

Exemplo conceitual derivado da explicação:

```text
Atividade: oficina
Tipologia: determinada tipologia de oficina
Categoria: determinada classificação
↓
Serviços permitidos:
- reparação
- pintura
- vidro
- veículo de cortesia
```

O modelo permite que clínicas, hospitais, oficinas e outros fornecedores tenham conjuntos de serviços diferentes.

### 6.3. Integração com conceitos contábeis

O atributo mais relevante dessa tabela, segundo a apresentação, é o **conceito contábil**.

Esse conceito é descrito como:

- um código contábil;
- denominado “conceito de cobrança e pagamento diverso”;
- utilizado transversalmente no RIFCOR;
- presente em tesouraria, terceiros, resseguro e outros módulos;
- associado ao pagamento do fornecedor que atuou em um expediente.

Durante a tramitação de sinistros, esse conceito serviria de base para a liquidação relacionada ao fornecedor.

A transcrição não detalha a estrutura técnica completa desses conceitos nem a regra exata que determina sua associação no momento da liquidação.

---

## 7. Critérios de atribuição de serviços

O sistema possui uma tabela para configurar critérios de atribuição de serviços a fornecedores.

Os principais elementos mencionados são:

- companhia;
- código de atividade;
- lógica de negócio;
- critérios definidos pelas áreas locais.

A finalidade é permitir que a companhia defina como escolher, entre fornecedores possíveis, aquele que receberá determinado serviço.

### 7.1. Critérios exemplificados

Foram citados os seguintes critérios possíveis:

- proximidade em relação ao evento;
- capacidade do fornecedor;
- avaliação do fornecedor;
- KPIs ou ratios de desempenho;
- demais critérios considerados adequados pela companhia.

A reunião não afirma que todos esses critérios são obrigatórios nem que coexistem em todas as implementações.

### 7.2. Resultado esperado da lógica

A lógica de atribuição deveria devolver o fornecedor ao qual o serviço será direcionado, normalmente por meio de seu código.

Em termos funcionais:

```text
Necessidade de serviço
↓
Identificação dos fornecedores elegíveis
↓
Avaliação de critérios locais
↓
Execução da lógica de negócio
↓
Retorno do fornecedor selecionado
```

### 7.3. Papel dos participantes no levantamento

O instrutor orienta que o trabalho dos participantes envolve perguntar às áreas locais como elas atuam hoje, buscando entender:

- como distribuem serviços;
- quais regras usam;
- como avaliam fornecedores;
- quais exceções existem;
- quem define prioridades;
- como a lógica deve ser traduzida para a solução.

A transcrição reforça que a configuração correta depende desse entendimento do procedimento local.

---

## 8. Modelo geográfico e zonal

### 8.1. Estrutura geográfica do país

A estrutura geográfica é apresentada como um conjunto comum de níveis territoriais de cada país, tais como:

- estados;
- comunidades autônomas;
- províncias;
- localidades;
- municípios;
- comunas;
- colônias;
- distritos.

Essa estrutura não deve ser confundida com estruturas comerciais ou operacionais.

### 8.2. Estrutura comercial

A estrutura comercial é citada no contexto da emissão de apólices e da contabilização de prêmios.

Segundo a explicação:

- cada apólice está associada a um agente;
- o agente possui uma oficina padrão;
- o agente pode atuar em mais de uma oficina;
- no processo de emissão, o usuário seleciona a oficina aplicável à apólice;
- essa escolha influencia a contabilização.

Essa estrutura comercial é apresentada como uma abstração da geografia do país, adaptada às necessidades comerciais da seguradora.

### 8.3. Estrutura zonal para fornecedores

Para fornecedores, pode ser necessária uma estrutura diferente da geografia oficial e também da estrutura comercial.

O sistema permite configurar duas classes de zona:

| Tipo de zona | Finalidade |
|---|---|
| Zona tarifária | Aplicação de tarifas |
| Zona de atribuição | Seleção ou distribuição de serviços entre fornecedores |

As duas estruturas podem coexistir, mas não precisam ter os mesmos limites ou códigos.

A apresentação usa um exemplo hipotético:

- uma zona tarifária poderia dividir o território por um paralelo;
- uma zona de atribuição poderia dividir o território por um meridiano.

Esse exemplo foi declarado como ilustrativo e não representa uma configuração real.

### 8.4. Catálogo de zonas geográficas

O catálogo inclui, segundo a transcrição:

- código da companhia;
- tipo de zona;
- código da zona;
- idioma;
- descrição.

O código de zona é criado especificamente para a estrutura de fornecedores. Não deve ser confundido com código de província, localidade ou outro identificador territorial oficial.

### 8.5. Relação entre zonas e geografia oficial

Outro catálogo associa a zona de fornecedores à estrutura geográfica do país.

A associação pode chegar até o quarto nível geográfico, mas a transcrição afirma que não chega ao quinto nível.

A explicação menciona que, quando a necessidade for trabalhar por código postal, isso deverá ser resolvido por uma lógica implementada, e não necessariamente pelo catálogo zonal padrão.

A configuração possui ainda:

- indicador de inabilitação;
- data de validade.

Esses atributos fazem sentido porque a associação geográfica pode mudar ao longo do tempo.

### 8.6. Zonas por perfil de fornecedor

Há uma terceira camada para associar zonas a:

- atividade;
- tipologia;
- categoria do fornecedor.

Assim, uma oficina e uma clínica podem ter zonas operacionais diferentes, ainda que estejam no mesmo país ou na mesma localização geográfica.

---

## 9. Tarifas de fornecedores

A reunião descreve quatro tabelas relacionadas a tarifas de fornecedores.

> **Ressalva importante:** a tarifa de fornecedor não deve ser confundida com o código de tarifa utilizado no processo de emissão de apólices, citado como um conceito visto anteriormente em outro contexto.

### 9.1. Códigos de tarifa

A primeira tabela permite definir, por companhia:

- código de tarifa;
- idioma;
- descrição.

Exemplos hipotéticos citados:

| Código | Exemplo de descrição |
|---|---|
| 1 | Tarifa para oficinas padrão |
| 2 | Tarifa para oficinas premium |
| 3 | Tarifa para oficinas embaixadoras |
| Outro | Tarifa para guinchos |

Esses exemplos não representam uma lista oficial nem valores reais.

### 9.2. Conceitos tarifários

Uma tabela adicional define conceitos de tarifa, contendo:

- companhia;
- idioma;
- código do conceito;
- descrição;
- conceito contábil associado.

O conceito tarifário é uma classificação utilizada para estruturar os componentes de pagamento associados à tarifa.

A reunião relaciona esses conceitos a categorias presentes em sinistros:

- indenização;
- honorários;
- despesas.

Foi enfatizado que, para fornecedores, determinadas categorias podem não fazer sentido. Por exemplo, a fala sugere que normalmente não se indeniza um fornecedor como se indeniza um segurado, mas podem existir honorários e despesas.

### 9.3. Conceitos tarifários por zona, tarifa e moeda

Uma tabela associa:

- companhia;
- código de tarifa;
- conceito tarifário;
- zona geográfica;
- moeda;
- importe mínimo;
- importe máximo.

Isso permite que a mesma tarifa tenha condições diferentes de acordo com a zona e moeda aplicável.

Exemplo conceitual:

```text
Tarifa A
├── Zona A
│   ├── Moeda X
│   └── Conceitos e limites próprios
└── Zona B
    ├── Moeda X
    └── Conceitos e limites diferentes
```

A transcrição chama a atenção para a possibilidade de haver várias moedas no sistema, mas explica que não é necessário habilitar todas elas para fornecedores. A companhia pode configurar apenas as moedas relevantes para essa operação.

### 9.4. Valores mínimos e máximos

O importe mínimo é apresentado como o menor valor que pode ser atribuído a um conceito tarifário em determinada moeda.

O importe máximo representa o limite máximo de pagamento aplicável a esse conceito.

O exemplo utilizado envolve um ato médico hipotético, no qual a companhia poderia estabelecer que:

- não pagaria abaixo de determinado valor;
- não pagaria acima de outro valor definido.

Os valores usados no exemplo são ilustrativos e não devem ser considerados regra de negócio real.

### 9.5. Tarifas por atividade, tipologia e categoria

A quarta tabela associa códigos de tarifa a:

- atividade do terceiro;
- tipologia do fornecedor;
- categoria do fornecedor;
- companhia;
- validade;
- inabilitação.

Assim, o sistema permite determinar quais tarifas podem ser utilizadas para determinado tipo de fornecedor.

---

## 10. Pergunta relevante: sobreposição entre tarifa zonal e perfil de fornecedor

### Pergunta

Foi perguntado como o sistema prioriza regras quando existem simultaneamente:

- tarifas ou condições por zona geográfica;
- tarifas ou condições por tipologia de fornecedor.

A dúvida é se essas configurações poderiam ser incompatíveis ou se sobrepor.

### Resposta

O instrutor afirma não conseguir informar uma regra de prioridade definitiva naquele momento.

A resposta indica que:

- a resolução provavelmente dependerá da lógica implementada;
- pode haver um pacote Oracle responsável por isso;
- o sistema pode permitir sobreposição mesmo quando ela representa erro de configuração;
- a situação deve ser tratada como caso de teste durante a implementação;
- alguém da companhia precisará decidir a regra que deve prevalecer.

### O que isso esclarece

A resposta revela uma limitação importante: a presença dos catálogos não determina, por si só, uma hierarquia universal de precedência entre regras.

A prioridade pode depender de:

- padrão do núcleo;
- decisão corporativa;
- legislação local;
- implementação específica;
- regras adotadas pelo país.

### Diretriz corporativa versus realidade local

A discussão evolui para a hipótese de que uma área corporativa poderia definir uma prioridade padrão — por exemplo, zona geográfica prevalecendo sobre tipologia de fornecedor.

O instrutor concorda que, quando houver um pacote padrão do núcleo e uma decisão corporativa aplicável, essa deveria ser a estratégia a seguir, desde que não conflite com a legislação local.

Contudo, ressalta que, na prática, as estruturas territoriais e locais acabam sendo determinantes, pois conhecem as condições reais de cada operação.

---

## 11. Horários, capacidade e recursos dos fornecedores

A reunião menciona que alguns aspectos de atendimento dos fornecedores são definidos em listas de valores corporativas, e não em catálogos configuráveis específicos.

### 11.1. Tipo de tramo de atendimento

Exemplos de valores possíveis:

- segunda-feira a domingo;
- atendimento por dia;
- atendimento por período;
- atendimento por faixa horária;
- tramo 1;
- tramo 2;
- tramo 3.

A finalidade é registrar como o fornecedor atende ao longo da semana e em quais faixas possui capacidade.

Exemplo conceitual apresentado:

```text
Segunda-feira
├── 08:00–12:00: capacidade maior
└── 14:00–18:00: capacidade menor
```

Os valores concretos seriam definidos por convenções corporativas em listas fechadas.

### 11.2. Tipo de recurso do fornecedor

Foi mencionado um tipo de recurso voltado a exemplos como:

- ambulâncias;
- guinchos.

A transcrição indica que esse modelo está bastante orientado à realidade de automóveis e assistência, mas poderá exigir evolução quando aplicado a outros ramos.

### 11.3. Limitação documental apresentada

O instrutor relata que um documento ou referência apontava para si mesmo e não carregava o conteúdo esperado. Ele afirma que tentaria corrigir ou subir o material posteriormente.

Portanto, a transcrição não permite concluir:

- quais são todas as listas de valores disponíveis;
- quais códigos exatos elas possuem;
- quais valores são obrigatórios;
- como se dá sua administração técnica.

---

## 12. Portal ou autosserviço de fornecedores

A reunião cita um autosserviço de fornecedores integrado à gestão de sinistros.

O portal é apresentado como um canal pelo qual fornecedores podem, potencialmente:

- receber trabalhos atribuídos;
- registrar uso da ferramenta;
- informar etapas da execução;
- refletir capacidade ou disponibilidade;
- interagir com processos ligados a sinistros.

O instrutor menciona também que há estruturas de autosserviço relacionadas a:

- clientes;
- agentes;
- intermediários;
- fornecedores.

Essas estruturas aparentemente compartilham elementos comuns, como procedimentos de enrolamento ou cadastramento.

### 12.1. Adaptação para outros ramos

A solução atual parece conter atributos muito ligados a oficinas, veículos e marcas atendidas.

Exemplo citado:

- uma oficina pode informar quais marcas de veículo atende.

Para ramos de vida ou saúde, o instrutor afirma que esses atributos não fariam sentido da mesma forma. Em seu lugar, poderiam ser necessários elementos como:

- atos médicos;
- serviços clínicos;
- outras capacidades relacionadas ao fornecedor de saúde.

Essa observação não confirma um modelo já existente para vida ou saúde; ela aponta uma possível necessidade de evolução do autosserviço.

### 12.2. Pergunta sobre configurações negativas

Foi perguntado se, em um caso no qual um fornecedor atende todas as marcas exceto algumas, seria possível registrar essa exceção de modo negativo.

### Resposta

O instrutor indica que acredita que a solução trabalha de forma positiva e específica:

- se o fornecedor atende duas marcas, devem ser criados dois registros;
- se atende dezessete marcas, devem ser criados dezessete registros;
- não há confirmação de suporte a uma regra genérica do tipo “todas exceto estas duas”.

A explicação dada é que, no RIFCOR, o comportamento tende a ser:

```text
Busca configuração específica
↓
Se não encontrar, busca configuração genérica
↓
Se não encontrar nenhuma, não permite atribuir, associar ou executar a ação aplicável
```

### O que isso esclarece

A resposta sugere uma modelagem baseada em registros positivos, específicos e explícitos. Porém, o instrutor usa expressões como “creo que no”, portanto a inexistência de configuração negativa não deve ser tratada como confirmação técnica definitiva sem validação no sistema ou na documentação.

---

## 13. Métricas de serviço dos fornecedores

As métricas de serviço são apresentadas como mecanismos para avaliar desempenho, mas não como gatilhos automáticos completos.

A configuração inclui:

- companhia;
- código de métrica;
- tipologia;
- idioma;
- descrição;
- objetivo ou valor-alvo.

### 13.1. Tipologias mencionadas

A transcrição menciona as seguintes tipologias:

| Código/Tipo citado | Interpretação apresentada |
|---|---|
| Check | Uso do autosserviço ou portal de fornecedores |
| D | Importes |
| P | Percentuais |
| Dias | Medição em dias |
| H | Medição em horas |

Há um momento em que o instrutor identifica possível inconsistência em um exemplo de “número de rejeições” classificado como percentual. Ele reconhece que pode haver erro no material ou que o exemplo poderia representar uma taxa percentual de rejeições.

Essa inconsistência deve ser preservada: a transcrição não permite confirmar a codificação correta de todas as tipologias.

### 13.2. Exemplos de métricas

Foram citados, de forma ilustrativa:

- uso da ferramenta corporativa;
- número de rejeições;
- percentual de rejeições;
- tempo de espera;
- tempo de entrada do veículo na oficina;
- capacidade diária de atendimento;
- cumprimento de tempo máximo.

Um exemplo apresentado:

```text
A oficina recebe a atribuição de um veículo às 08:00.
A expectativa é que registre sua entrada até 10:00.
Se isso não ocorrer, o objetivo de duas horas foi ultrapassado.
```

### 13.3. Ações possíveis após medição

O sistema não é apresentado como responsável por decidir automaticamente o que fazer após o descumprimento de uma métrica.

A reunião sugere que outras regras ou processos podem decidir ações como:

- envio de comunicação ao fornecedor;
- plano de formação;
- alteração de tarifa;
- suspensão temporária;
- inabilitação;
- rompimento do acordo comercial;
- outras medidas previstas contratualmente.

Essas ações são exemplos possíveis. A transcrição não afirma que todas estejam implementadas ou automatizadas.

---

## 14. Gestão de fraudes

A apresentação menciona oito catálogos relacionados a fraude, embora nem todos sejam enumerados de maneira consolidada. O tema é tratado como transversal a fornecedores e clientes.

### 14.1. Indicadores de fraude

O catálogo de indicadores de fraude é descrito como uma configuração por companhia que pode incluir:

- tipo de indicador;
- lógica;
- validade.

O instrutor afirma não entender plenamente um elemento referido como “secuencial” e indica que a explicação está pendente. Também menciona uma “função dinâmica” associada a pacote Oracle.

Portanto, não é possível determinar com segurança:

- o significado exato de “secuencial”;
- como a função dinâmica é chamada;
- qual estrutura de dados ela retorna;
- quais indicadores já existem;
- como as lógicas são versionadas.

### 14.2. Tipologias de conclusão de fraude

O catálogo permite registrar uma conclusão e indicar se ela representa ou não fraude confirmado.

Exemplos de descrição mencionados:

- procedente;
- rejeitado.

O ponto central é a necessidade de uma marca objetiva que permita informar ao corporativo quantos fraudes foram identificados em determinado país, período ou contexto.

### 14.3. Classificações de fraude

As classificações são definidas por:

- companhia;
- idioma;
- código;
- descrição.

A transcrição não fornece uma taxonomia oficial. O instrutor sugere que, como o catálogo pode reunir fraudes de vários ramos, a própria codificação poderia ajudar na organização.

Exemplo de convenção proposta apenas como possibilidade:

```text
1 a 100      → automóveis
101 a 300    → saúde
demais faixas → outros domínios
```

Essa proposta não foi apresentada como padrão existente, apenas como uma sugestão que poderia ser considerada se o país não possuísse codificação definida.

### 14.4. Estados da gestão de fraude

Há um catálogo para registrar o estado de tratamento de um possível fraude.

Estados exemplificados:

- atribuído;
- concluído;
- em investigação;
- em revisão.

A reunião indica que diferentes áreas podem assumir a investigação, dependendo da estrutura da companhia e do país.

### 14.5. Tipos de fraude

A apresentação menciona categorias como:

- fraude confirmado;
- fraude não confirmado;
- fraude parcial;
- pagamento *ex gratia*.

O instrutor demonstra incerteza sobre alguns detalhes funcionais da classificação corporativa e afirma não conseguir detalhar todos os casos.

#### Pagamento *ex gratia*

A transcrição descreve pagamento *ex gratia* como um pagamento realizado por razões comerciais, mesmo que não seja estritamente devido, por exemplo para preservar um cliente relevante ou evitar impacto reputacional.

A reunião o menciona como possível tipologia dentro do universo de fraude ou de gestão associada a fraude. Não é possível concluir, apenas a partir da transcrição, se o pagamento *ex gratia* é formalmente classificado como fraude no modelo de dados ou se é apenas analisado em conjunto por razões de controle.

### 14.6. Motivos de fraude

O catálogo de motivos registra, por companhia e idioma:

- código de motivo;
- descrição.

Exemplos citados:

- fraude interno;
- uso diverso do contratado;
- mudança de condutor;
- acidentes de alto impacto;
- simulações;
- delinquência organizada;
- solicitação de valor superior ao autorizado;
- documentação falsa;
- assinatura apócrifa.

Os exemplos são diversos e alguns estão fortemente associados a automóveis, enquanto outros se relacionam a vida e benefícios.

### 14.7. Relação entre tipo, conclusão e motivo

Um catálogo específico relaciona:

- companhia;
- tipo de fraude;
- tipo de conclusão;
- motivo de fraude;
- data de validade.

Esse relacionamento permite restringir ou estruturar combinações válidas entre os elementos anteriormente definidos.

### 14.8. Controle de importes por ramo

Há um catálogo para controlar valores de liquidações no processo de sinistros, por ramo técnico ou setor.

A configuração pode considerar:

- setor;
- ramo técnico;
- possibilidade de modificar o valor de salvamentos;
- tipo padrão de salvamento;
- forma de obtenção do valor;
- possibilidade de modificar honorários;
- forma de obtenção de honorários;
- lógica de negócio associada.

A transcrição explica que salvamentos fazem mais sentido no contexto de automóveis e danos materiais, como perda total de veículos, do que em vida ou pessoas.

O objetivo é permitir controles relacionados a potenciais fraudes em liquidações, mas a transcrição não detalha todas as validações implementadas.

---

## 15. Relação entre fraude, operação e governança

A reunião não descreve um processo único e padronizado de resposta ao fraude. Contudo, identifica possíveis consequências e responsáveis:

| Situação | Possíveis desdobramentos mencionados |
|---|---|
| Fraude com impacto elevado | controles adicionais, investigação, decisões operacionais |
| Obrigação regulatória | reporte ao regulador, conforme legislação local |
| Fraude de fornecedor | possível bloqueio ou encerramento da relação comercial |
| Fraude comprovado | possível atuação jurídica |
| Tendência detectada por métricas | análise por áreas de processos, técnica ou outras áreas responsáveis |
| Pagamento ou liquidação acima de limites | exigência de autorização adicional, conforme regra implementada |

A reunião destaca que o tratamento concreto depende do país, da legislação, das áreas responsáveis e dos procedimentos locais.

---

## 16. IQRFs: incidências, queixas, reclamações e felicitações

### 16.1. Definições transversais e definições específicas

A transcrição diferencia dois grupos:

1. **Catálogos comuns e transversais**  
   Aplicáveis a diferentes domínios do sistema.

2. **Catálogos específicos de fornecedores**  
   Voltados a IQRFs relacionados a terceiros fornecedores.

Os catálogos específicos de fornecedores mencionados são:

- informantes;
- afetados;
- classificações;
- motivos de IQRF.

### 16.2. Informantes

O catálogo de informantes identifica quem comunica uma IQRF.

Exemplos citados:

- segurado;
- agente;
- terceiro.

A configuração parece incluir:

- código;
- idioma;
- nome ou descrição;
- validade;
- habilitação.

### 16.3. Afetados

O catálogo de afetados identifica quem sofre o impacto da ocorrência registrada.

A distinção apresentada é:

- **informante:** quem abre ou comunica a ocorrência;
- **afetado:** quem é impactado pela ocorrência.

Exemplo explicado:

```text
Uma pessoa abre uma queixa sobre atendimento em uma oficina.
├── Informante: pessoa que comunica a queixa
└── Afetado: parte definida conforme o caso configurado
```

A transcrição menciona possibilidades como terceiro, jurídico e redes sociais, mas não fornece um catálogo completo nem uma definição fechada para essas categorias.

### 16.4. Classificações de IQRF

O catálogo permite classificar IQRFs pelo canal de comunicação.

O canal não deve ser confundido com a estrutura de canais usada para comercialização ou intermediação de apólices.

Exemplos de canal citados:

- autosserviço de clientes;
- correio;
- web;
- atendimento presencial em escritório;
- formulário físico.

A reunião menciona o autosserviço de clientes como equivalente, no contexto da Espanha, à “Oficina Internet MAPFRE”, segundo a fala do instrutor.

### 16.5. Motivos de IQRF

O catálogo de motivos contém, segundo a explicação:

- tipo de gestão IQRF;
- momento do motivo;
- código do motivo;
- idioma;
- descrição;
- validade;
- inabilitação.

O motivo pode estar associado a:

- abertura;
- encerramento;
- reabertura.

Exemplos citados incluem:

| Momento | Exemplo |
|---|---|
| Abertura | felicitação, atendimento inadequado, problema em fornecedor |
| Encerramento | motivos aplicáveis ao fechamento da ocorrência |
| Reabertura | fechamento incorreto, descumprimento de compromisso |

Também foram mencionados possíveis motivos relacionados a:

- defesa legal;
- revisão de serviço;
- fornecedor de assistência;
- atendimento de ajustador;
- atendimento de perito;
- atendimento de chefe de oficina;
- atendimento telefônico;
- experiência com call center.

A mensagem funcional é que um catálogo mais detalhado permite melhor exploração posterior das informações.

---

## 17. Caso operacional: fornecedor “embaixador”

A apresentação menciona fornecedores “embaixadores de marca”, descritos como fornecedores que representam diretamente a companhia na percepção do segurado.

Essa condição eleva a importância operacional e reputacional do fornecedor, principalmente em atividades como oficinas, clínicas ou hospitais.

Uma leitura contextual sustentada pela fala é:

> Fornecedores classificados como embaixadores tendem a demandar atenção especial na gestão de qualidade, distribuição de serviços e tratamento de IQRFs, pois funcionam como uma extensão visível da seguradora perante os clientes.

Isso é uma interpretação da relevância atribuída pelo instrutor, não uma regra formal de sistema explicitamente apresentada.

---

## 18. Relações de causa e efeito identificadas

### 18.1. Seleção de fornecedores

```text
Existência de vários fornecedores elegíveis
↓
Necessidade de decidir quem recebe o serviço
↓
Definição de critérios locais
↓
Implementação de lógica de negócio
↓
Atribuição do serviço a fornecedor específico
```

### 18.2. Configuração territorial

```text
Geografia administrativa não representa necessariamente a operação
↓
Necessidade de cobertura, tarifação e atribuição específicas
↓
Criação de zonas próprias para fornecedores
↓
Associação das zonas à estrutura geográfica oficial
↓
Uso em tarifas e seleção de prestadores
```

### 18.3. Medição de desempenho

```text
Serviço atribuído ao fornecedor
↓
Fornecedor executa e interage com o portal/autosserviço
↓
Indicadores registram tempo, uso, recusas ou valores
↓
A companhia avalia cumprimento de objetivo
↓
Processos ou regras externas definem eventual ação
```

### 18.4. Fraude e controle operacional

```text
Evento suspeito, comportamento irregular ou inconsistência
↓
Classificação por tipo, motivo, estado e conclusão
↓
Confirmação ou descarte da suspeita
↓
Aplicação de procedimento local, jurídico, técnico ou regulatório
↓
Possíveis controles futuros, bloqueios, autorizações ou medidas contratuais
```

---

## 19. Modelo operacional e responsabilidades

A transcrição sugere a participação de diferentes áreas, embora não apresente uma matriz formal de responsabilidades.

| Área ou papel mencionado | Participação sugerida |
|---|---|
| Áreas locais | Definição de critérios, processos e requisitos do país |
| Área corporativa de operações | Definições corporativas e possíveis padrões do núcleo |
| Área técnica | Participação em melhorias e controles operacionais |
| Área de processos | Melhoria contínua, especialmente diante de queixas ou métricas |
| Sinistros | Tramitação, atribuição, liquidação e uso dos fornecedores |
| Tesouraria | Configuração e uso de conceitos de cobrança e pagamento |
| Jurídico | Possível atuação diante de fraude confirmado |
| Segurança / áreas de revisão | Investigação ou análise de determinados casos |
| TI / manutenção do RIFCOR | Manutenção de configurações e lógicas locais |
| Equipes de portais/autosserviços | Evolução do autosserviço de fornecedores, clientes e agentes |

A transcrição não permite determinar:

- papéis formais;
- níveis de aprovação;
- responsáveis nominativos;
- fluxos de escalonamento;
- SLAs;
- políticas corporativas oficiais.

---

## 20. Governança e padronização corporativa

A reunião apresenta uma tensão recorrente entre dois vetores:

1. **Padronização corporativa**  
   O núcleo e as áreas corporativas podem estabelecer estruturas, regras e diretrizes comuns.

2. **Adequação territorial e local**  
   Países possuem legislações, operações, moedas, maturidades e práticas diferentes.

A posição apresentada não é de autonomia irrestrita, mas de adaptação governada. A regra corporativa deve ser seguida quando houver um padrão aplicável e quando ele não conflitar com exigências locais. Entretanto, a operação local precisa ser compreendida porque é ela que conhece as condições práticas de implementação.

Uma leitura analítica possível é que a solução busca equilibrar:

```text
Padronização corporativa
+
Flexibilidade configurável
+
Lógicas específicas por país
=
Modelo comum adaptável a operações locais
```

---

## 21. Números e indicadores citados

Os números abaixo foram usados principalmente como exemplos didáticos. Não devem ser tratados como métricas reais, compromissos ou parâmetros oficiais.

| Indicador ou elemento | Valor citado | Contexto |
|---|---:|---|
| Capacidade diária hipotética de oficina | 50 veículos | Exemplo de capacidade de fornecedor multimarca |
| Objetivo de entrada de veículo | 2 horas | Exemplo de métrica operacional |
| Exemplo de limite mínimo de ato médico | 10 euros | Exemplo ilustrativo de tarifa |
| Exemplo de preço informado pelo fornecedor | 8,30 | Exemplo ilustrativo |
| Exemplo de limite máximo | 40 ou 57 euros | Exemplos ilustrativos e não consistentes entre si |
| Faixa hipotética de classificação de fraude automóvel | 1 a 100 | Sugestão de convenção, não padrão |
| Faixa hipotética de classificação de fraude saúde | 101 a 300 | Sugestão de convenção, não padrão |
| Quantidade hipotética de fraudes em mês | 25 dolosos e 4 ocasionais | Exemplo para explicar análise gerencial |
| Valor hipotético de fraude | meio milhão | Exemplo para justificar reação operacional |
| Limite hipotético de autorização | 1.000 euros | Exemplo de controle de liquidação |
| Exemplo de capital alterado | 5 milhões para 15 milhões | Exemplo de tentativa de fraude documental |

---

## 22. Limitações e ressalvas explicitamente reconhecidas

### 22.1. Modelo mais orientado a automóveis

O instrutor afirma repetidamente que o modelo apresentado está, naquele momento, muito focado em automóveis, oficinas, guinchos e assistência relacionada a veículos.

Embora seja considerado conceitualmente aplicável a outros domínios, a transcrição reconhece que:

- atributos atuais podem não fazer sentido para vida ou saúde;
- portais podem precisar evoluir;
- novos requisitos locais podem exigir mudanças;
- a aplicação prática depende do ramo e país.

### 22.2. Regras de prioridade não esclarecidas

Não foi possível confirmar como o sistema resolve sobreposições entre:

- tarifas por zona;
- tarifas por tipologia;
- demais condições potencialmente conflitantes.

A resposta aponta para a necessidade de verificar pacotes, testes e decisões locais.

### 22.3. Catálogos não produzem comportamento automático

A reunião enfatiza que vários catálogos apenas registram definições. Eles não necessariamente:

- calculam valores;
- selecionam fornecedores;
- bloqueiam pagamentos;
- disparam sanções;
- resolvem fraude;
- notificam usuários;
- alteram tarifas automaticamente.

Para isso, podem ser necessários processos, lógicas, tarefas batch, daemons ou intervenções de áreas responsáveis.

### 22.4. Material documental incompleto ou com erros

Foram reconhecidos problemas no material apresentado:

- referência que apontava para si mesma;
- conteúdo que não pôde ser carregado;
- exemplo de métrica aparentemente inconsistente;
- catálogo de motivos de IQRF duplicado ou incorreto no documento.

Esses pontos devem ser validados antes de serem usados como especificação funcional definitiva.

### 22.5. Detalhes desconhecidos pelo instrutor

Em alguns trechos, o instrutor declara não saber ou não conseguir detalhar:

- o significado exato de determinado campo sequencial;
- regras completas de fraude;
- hierarquia de prioridade entre regras;
- funcionamento preciso de certos pacotes Oracle;
- motivo específico de uma limitação citada para o Uruguai.

Essas lacunas não devem ser preenchidas por suposição.

---

## 23. Riscos e desafios

### 23.1. Riscos explicitamente mencionados ou fortemente evidenciados

| Risco | Evidência na reunião |
|---|---|
| Configuração inadequada de prioridades | Possibilidade de sobreposição entre tarifas e regras sem controle suficiente |
| Incompatibilidade entre padrão corporativo e contexto local | Países podem ter necessidades e legislações diferentes |
| Uso excessivo de exemplos de automóveis em outros ramos | Atributos como marcas e veículos não se aplicam diretamente a vida ou saúde |
| Falha de documentação | Materiais com links, referências ou conteúdos incorretos |
| Falta de ação após medir indicadores | Métricas sem processo associado não produzem melhoria |
| Tratamento insuficiente de fraude | Identificar e classificar não garante prevenção, investigação ou resposta |
| Impacto reputacional | Especialmente em fornecedores embaixadores ou incidentes visíveis |
| Risco regulatório | Alguns fraudes podem exigir reporte conforme legislação local |

### 23.2. Desafios derivados do contexto — análise

> Esta seção apresenta interpretações analíticas baseadas no conjunto da transcrição.

1. **Complexidade combinatória de configuração**  
   A combinação entre atividade, tipologia, categoria, zona, tarifa, moeda, conceito tarifário, validade e regras de negócio pode gerar grande volume de registros e cenários de teste.

2. **Governança de regras distribuídas**  
   Parte das regras parece residir em catálogos; outra, em pacotes Oracle; outra, em processos operacionais. Sem governança clara, pode ser difícil identificar onde determinada decisão é tomada.

3. **Rastreabilidade entre regra e resultado**  
   Quando um fornecedor é selecionado, um valor é calculado ou uma fraude é classificada, será importante conseguir explicar quais critérios foram aplicados. A reunião não detalha mecanismos de auditoria ou observabilidade para isso.

4. **Evolução do modelo para ramos de pessoas**  
   A reutilização conceitual é viável, mas a adaptação de telas, portais, atributos e critérios exigirá cuidado para evitar transportar conceitos de automóveis de forma inadequada.

5. **Dependência de conhecimento local**  
   A qualidade da implementação depende da capacidade de entrevistar corretamente as áreas locais e transformar práticas muitas vezes implícitas em regras explícitas.

---

## 24. O que a reunião não permite concluir

A transcrição não detalha suficientemente os seguintes temas:

- tecnologia de banco de dados, além da referência a pacotes Oracle;
- arquitetura de integração do portal de fornecedores;
- APIs, mensageria, eventos ou arquivos de integração;
- modelo de autenticação e autorização dos portais;
- processo de enrolamento ou cadastro de fornecedores;
- modelo de dados completo;
- mecanismo de auditoria das alterações de catálogo;
- gestão de versões de lógicas de negócio;
- estratégia de testes automatizados;
- tratamento de erros e exceções técnicas;
- SLA de portais, sinistros ou fornecedores;
- processo de monitoramento técnico;
- infraestrutura de execução de batch ou “daemons”;
- modelo de segurança e segregação de funções;
- forma de armazenamento de documentos;
- política de retenção de dados;
- regras específicas de proteção de dados;
- procedimento de investigação de fraudes;
- critérios formais de bloqueio ou desligamento de fornecedores;
- regras definitivas de prioridade quando configurações se sobrepõem;
- lista oficial de estados, tipos, motivos e classificações de fraude;
- lista oficial de métricas e seus respectivos limiares;
- definição formal da sigla IQRF;
- detalhes do caso citado sobre o Uruguai;
- roadmap com datas, países, marcos ou responsáveis.

---

## 25. Conclusões principais

1. O domínio de fornecedores no RIFCOR é configurado por uma ampla rede de catálogos interligados, e não por uma única tabela ou funcionalidade.

2. A estrutura foi apresentada como especialmente madura para automóveis, mas com ambição de ser reutilizável para outros ramos, desde que sejam feitas adaptações adequadas.

3. Serviços, zonas, tarifas, métricas, fraudes e IQRFs são dimensões complementares da gestão de fornecedores.

4. A integração com o módulo de sinistros é central: é durante a tramitação e liquidação dos expedientes que grande parte das configurações ganha efeito operacional.

5. Conceitos contábeis de cobrança e pagamento diversos funcionam como elo entre fornecedores, sinistros e tesouraria.

6. Muitos comportamentos críticos não são resolvidos apenas pelos catálogos. Eles dependem de lógicas de negócio, possivelmente implementadas em pacotes Oracle, e de decisões operacionais locais.

7. A implementação exige levantamento detalhado com as áreas do país, especialmente para critérios de atribuição, hierarquias de prioridade, capacidade, cobertura geográfica, tarifas, métricas e tratamento de fraude.

8. Métricas e classificações, por si só, não melhoram a operação. Elas precisam estar conectadas a procedimentos, responsáveis e ações concretas.

9. A governança precisa equilibrar diretrizes corporativas e realidades locais, sem assumir que uma configuração única atenderá a todos os países.

10. A documentação apresentada possui lacunas e inconsistências reconhecidas durante a reunião; portanto, deve ser usada como base de entendimento, mas não como substituto de validação funcional e técnica no sistema.
