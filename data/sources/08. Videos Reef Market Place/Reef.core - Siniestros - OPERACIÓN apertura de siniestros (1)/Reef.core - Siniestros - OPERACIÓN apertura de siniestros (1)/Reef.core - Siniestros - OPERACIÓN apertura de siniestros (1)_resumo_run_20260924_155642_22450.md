# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.core - Siniestros - OPERACIÓN apertura de siniestros (1).mp4`
**Data de processamento:** 24/09/2026 16:02:21
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Análise Estruturada — Treinamento Reef.core: Abertura de Sinistros (Parte 1)

> **Base documental:** transcrição de fala e evidências visuais extraídas do vídeo.  
> **Idioma predominante da reunião:** espanhol.  
> **Escopo efetivamente coberto:** primeira parte da operação de criação/abertura de sinistros no Reef.core, com foco na identificação do sinistro, regras de validação, parametrizações e informações iniciais.  
> **Rastreabilidade:** as referências de tempo indicam os frames visuais disponíveis; a fala não contém timestamps individuais por trecho.

---

## 1. Síntese executiva

A sessão foi um treinamento funcional sobre a operação de **criar sinistro** no **Reef.core**, dentro do módulo de sinistros. O objetivo não foi apenas ensinar o preenchimento da tela: o treinamento procurou explicar quais informações são solicitadas durante a abertura e, principalmente, como o comportamento dessa abertura pode ser configurado sem alterar o core do sistema.

A mensagem central é que a abertura de sinistros é conduzida por uma combinação de dados operacionais — como data de ocorrência, apólice, risco, causa e contato — e por definições previamente mantidas no sistema. Essas definições controlam obrigatoriedade de campos, valores iniciais, regras de vigência, exceções, validações de temporalidade, controles técnicos e lógicas de negócio.

A sessão também apresentou uma visão de documentação no **MAPFRE Catalog Marketplace**, que concentra materiais de treinamento e documentação funcional/técnica sobre o Reef. A documentação da operação estabelece como premissas a existência de um ramo previamente definido, dos catálogos necessários ao processo de sinistros e, em regra, de uma apólice vigente na data de ocorrência.

O treinamento foi encerrado antes de completar toda a abertura. A próxima sessão, denominada informalmente de **“Apertura 2”**, deveria abordar os elementos restantes, incluindo a cabeceira do sinistro e outros componentes ainda não detalhados.

---

## 2. Contexto e antecedentes

### 2.1. Contexto do treinamento

A reunião faz parte de uma série de sessões de capacitação sobre Reef.core. Antes de iniciar o conteúdo principal, a apresentadora relembra que os vídeos das sessões já realizadas ficam disponíveis na área de sessões da documentação.

A evidência visual mostra uma página de sessões no MAPFRE Catalog Marketplace, com materiais de capacitação funcional, capacitação técnica, modelo operacional e sessões Reef. A tabela visível inclui, entre outros, treinamentos sobre:

- emissão;
- definição de ramo;
- Copilot;
- Marketplace;
- terceiros;
- causas e consequências de sinistros;
- nova versão do Reef.core.

**Rastreabilidade visual:** Frame 05, `18:37`.

### 2.2. Estado da documentação apresentado

Foi explicado que há dois grandes recortes de documentação para o módulo de sinistros:

1. **Definição:** contém o que precisa ser configurado nos módulos, incluindo tratamento de sinistros, expedientes, liquidações, fraude e o termo registrado pela transcrição como “SQL refes” ou similar. O nome exato desse módulo não pode ser confirmado com segurança a partir da transcrição.
2. **Operação:** descreve como executar as operações no sistema.

Segundo a apresentação, as operações de sinistros já estavam documentadas, enquanto a documentação de expedientes começava a ser produzida.

Dentro da operação de sinistros, foram citadas as ações:

- criar sinistro;
- modificar sinistro;
- terminar sinistro;
- reabilitar um sinistro terminado para incluir um novo expediente;
- consultar sinistros, com detalhamento por abas e campos.

Foi feita uma ressalva: a opção de terminar sinistro mencionada se aplica a sinistros que não tenham expedientes.

### 2.3. Objetivo pedagógico da sessão

A sessão procurou desenvolver dois tipos de entendimento:

- **operacional:** quais informações o sistema solicita na abertura;
- **funcional/configuracional:** como definir os valores e as regras que alteram esse comportamento sem modificar o core.

A apresentadora enfatiza que os participantes devem saber não apenas “o que preencher”, mas também:

- onde cada comportamento é definido;
- quando um campo é obrigatório;
- quando uma informação pode ser pré-preenchida;
- quais exceções podem ser habilitadas;
- quais regras dependem do ramo ou de lógica de negócio.

---

## 3. Problema funcional tratado

O problema funcional central é a necessidade de registrar um novo sinistro de forma consistente, vinculando-o corretamente à cobertura contratada e às condições vigentes no momento da ocorrência.

A abertura precisa responder, entre outras, às seguintes perguntas:

- quando ocorreu o sinistro;
- quando a companhia foi notificada;
- a qual apólice ele pertence;
- se há uma aplicação relacionada;
- qual risco específico foi afetado;
- qual versão ou movimento da apólice, aplicação e risco deve ser considerada;
- se há causa de origem;
- se existe evento catastrófico associado;
- quem comunicou o sinistro;
- quais coberturas estavam contratadas na data de ocorrência.

A complexidade decorre de que uma apólice pode conter:

- vários movimentos ou suplementos;
- dados fixos;
- dados variáveis por ramo;
- intervenientes;
- aplicações, quando não se trata de uma apólice fixa;
- um ou vários riscos;
- coberturas por risco;
- alterações temporárias que podem ou não ser relevantes para sinistros.

---

## 4. Relação de causa e efeito reconstruída

A relação abaixo é uma consolidação analítica do raciocínio transmitido no treinamento, não um diagrama literal exibido na reunião.

```text
Diversidade de produtos, ramos, apólices e riscos
↓
Necessidade de identificar a cobertura vigente na data e hora do evento
↓
Necessidade de validar apólice, aplicação, risco e regras do ramo
↓
Parametrização de obrigatoriedade, exceções, valores iniciais e controles
↓
Abertura de sinistro orientada por configuração, sem alterar o core
↓
Registro operacional consistente e possibilidade de análise posterior
```

A apresentação sugere que o Reef.core busca equilibrar padronização do processo com flexibilidade por ramo, produto, país ou regra de negócio. Essa é uma **leitura analítica sustentada pelas explicações sobre configurações**, e não uma declaração literal de uma estratégia corporativa mais ampla.

---

## 5. Solução apresentada: abertura configurável de sinistros

A solução descrita é uma operação de criação de sinistro organizada em etapas e governada por configurações anteriores.

A documentação visual da operação “CREAR siniestro” informa que ela permite criar um novo sinistro no Reef.core e que seu objetivo é orientar sobre a informação mínima necessária para a operação.

As premissas documentadas são:

- definição prévia do ramo;
- definição dos catálogos dos processos de sinistro;
- existência de apólice vigente na data do sinistro;
- apresentação de informações adicionais conforme a configuração de sinistros realizada para o ramo.

**Rastreabilidade visual:** Frame 06, `22:20`.

A estrutura exibida na documentação inclui:

1. identificação do sinistro;
2. informação do sinistro;
3. intervenção externa — pessoa de contato;
4. coberturas contratadas na apólice-risco na data de ocorrência;
5. pessoas físicas e jurídicas relacionadas à apólice-risco na data de ocorrência;
6. cabeceira de sinistros;
7. atributos antes das consequências;
8. consequências;
9. atributos após as consequências, parcialmente visíveis.

A transcrição cobre, em profundidade, principalmente os cinco primeiros tópicos, sendo os dois últimos tratados como consultas na primeira etapa. A explicação de cabeceira, atributos e consequências foi adiada para a sessão seguinte.

---

## 6. Arquitetura funcional e fluxo lógico da operação

A representação abaixo consolida o funcionamento explicado. Não corresponde a um diagrama técnico literal apresentado no vídeo.

```text
Operador inicia a abertura de sinistro
↓
Informa dados temporais
- Data e hora de ocorrência
- Data e hora de notificação
↓
Sistema identifica o contexto contratual
- Apólice
- Aplicação, quando aplicável
- Risco
↓
Sistema recupera automaticamente dados vigentes na ocorrência
- Suplemento/movimento da apólice
- Suplemento/movimento da aplicação
- Suplemento/movimento do risco
- Descrição do risco
↓
Sistema aplica validações configuradas
- Futuro
- Vigência
- Temporalidade
- Retenção por controle técnico
- Exceções por lógica de negócio
↓
Operador complementa informação do sinistro
- Evento catastrófico, se aplicável
- Causa/origem
- Estimativa de valor, se configurada
- Pessoa de contato
↓
Sistema disponibiliza consultas contextuais
- Coberturas contratadas
- Capital contratado
- Franquias/dedutíveis
- Pessoas relacionadas à apólice e ao risco
↓
Continuação prevista na próxima sessão
- Cabeceira
- Outros componentes da abertura
```

---

## 7. Conceitos fundamentais explicados

## 7.1. Apólice

A apólice é apresentada como a estrutura contratual à qual o sinistro deve ser associado. Ela pode conter:

- movimentos, chamados de **suplementos**;
- dados fixos;
- intervenções;
- dados variáveis por ramo.

Os dados fixos são aqueles que, conforme a explicação, não variam por ramo. Foram citados como exemplos:

- data de efeito;
- data de vencimento;
- agente atribuído;
- ramo ao qual a apólice pertence.

As intervenções representam a forma como pessoas físicas ou jurídicas se relacionam com a apólice. Exemplos mencionados:

- tomador;
- credor hipotecário;
- banco ou instituição relacionada a um bem hipotecado.

Os dados variáveis são aqueles que dependem do ramo.

## 7.2. Aplicação

A aplicação existe no caso de apólices não fixas. A apresentadora usou transporte como exemplo: uma apólice pode cobrir vários deslocamentos, e cada viagem pode ser tratada como uma aplicação.

A aplicação também pode ter:

- suplementos;
- dados fixos;
- intervenções;
- dados variáveis.

Nos ramos em que não há aplicação, como foi indicado para a maioria dos ramos de automóveis e gerais, o sistema trabalha com a **aplicação 0**.

A apresentação inicialmente associa aplicação a transporte, mas em seguida corrige a própria formulação: não é simplesmente “uma apólice de transporte”; o ponto relevante é que a apólice seja não fixa. Ainda assim, os exemplos detalhados de aplicação foram todos baseados em transporte.

## 7.3. Risco

Uma apólice pode conter um ou mais riscos. Foram citados exemplos como:

- vários veículos em uma mesma apólice;
- mais de uma residência;
- múltiplas empresas;
- várias pessoas seguradas.

O risco possui:

- movimento ou suplemento que o afeta;
- dados fixos próprios;
- data de efeito e vencimento;
- intervenções próprias;
- dados variáveis por ramo;
- coberturas contratadas.

A diferença destacada é que informações mantidas no nível da apólice afetam todos os riscos, enquanto as informações mantidas no nível de risco afetam apenas aquele risco específico.

Exemplos de dados variáveis por risco:

| Ramo/exemplo | Dados variáveis citados |
|---|---|
| Automóveis | marca, modelo, tipo de veículo, número de lugares, matrícula |
| Residencial | endereço, características da residência, menção a extintores |
| Outros ramos | informações que descrevem o objeto segurado |

## 7.4. Suplementos ou movimentos

Os movimentos realizados sobre a apólice são chamados de suplementos. O sistema precisa recuperar o suplemento válido na data de ocorrência do sinistro.

A mesma lógica é aplicada a:

- suplemento da apólice;
- suplemento da aplicação;
- suplemento do risco.

A apresentadora destacou a importância de suplementos temporários. Eles podem alterar temporariamente a cobertura, por exemplo, para aumentar uma cobertura durante um período de férias. Caso um sinistro ocorra dentro desse período, pode ser necessário considerar a alteração temporária.

Por outro lado, a apresentação reconhece que algumas instalações podem usar suplementos temporários apenas para cálculos internos. Nesse cenário, a companhia pode parametrizar se esses suplementos podem ser considerados em sinistros.

As opções indicadas para essa configuração foram:

- sim;
- não;
- lógica de negócio.

---

## 8. Identificação do sinistro

A identificação do sinistro é a primeira etapa operacional apresentada.

Seu propósito é localizar o sinistro no contexto correto de:

- apólice;
- aplicação, se houver;
- risco;
- suplementos vigentes na data de ocorrência.

A documentação visual confirma que, ao selecionar a apólice, o sistema busca o suplemento de apólice, aplicação, suplemento de aplicação, risco e suplemento que modifica o risco na data de ocorrência.

**Rastreabilidade visual:** Frame 07, `26:02`.

### 8.1. Dados solicitados

A documentação visual mostra os seguintes dados dentro da identificação:

- data de ocorrência;
- hora de ocorrência;
- data de notificação;
- hora de notificação;
- apólice;
- aplicação.

**Rastreabilidade visual:** Frame 07, `26:02`.

Na demonstração visual, a tela de informação do sinistro inclui campos de data e hora de ocorrência e notificação, seguidos da seção de apólice.

**Rastreabilidade visual:** Frame 08, `29:45`.

---

## 9. Data e hora de ocorrência

## 9.1. Finalidade

A data de ocorrência representa a data em que o sinistro aconteceu.

Segundo a explicação, ela normalmente não pode ser posterior à data atual. Há, porém, uma configuração por ramo que permite abertura de sinistros futuros.

A documentação visual confirma a existência da propriedade “Se pueden abrir siniestros a Futuro”, que controla se pode ser registrado um sinistro com data de ocorrência posterior ao dia atual.

**Rastreabilidade visual:** Frame 09, `33:27`.

## 9.2. Exemplo de sinistro futuro

Foi citado o ramo de saúde como motivação para permitir sinistros futuros. O exemplo é o segurado que solicita autorização para uma operação que provavelmente ocorrerá em uma data futura.

A documentação visual registra o mesmo contexto: a propriedade teria sido incluída para ramos de saúde, nos quais algumas companhias registram antecipadamente uma operação provável.

**Rastreabilidade visual:** Frame 09, `33:27`.

## 9.3. Configuração possível

Os valores visuais documentados para a propriedade são:

1. sim;
2. não;
3. lógica de negócio;
4. lógica de negócio.

O fato de os valores 3 e 4 aparecerem ambos como “Lógica de Negocio” é preservado porque foi extraído do OCR; a transcrição não explica a diferença entre eles. Portanto, não é possível determinar se se trata de duas modalidades distintas, um erro de leitura ou outro modelo de parametrização.

Quando a regra não é simplesmente “sim” ou “não”, a documentação indica que deve ser definida uma lógica de negócio baseada em outros fatores.

## 9.4. Valor inicial

A data de ocorrência pode receber valor inicial configurável. A apresentadora indica que uma lógica pode, por exemplo, devolver a data atual ou outro valor.

Isso não significa que o valor inicial elimina as validações posteriores; a data ainda precisa obedecer às regras configuradas para o ramo.

## 9.5. Hora de ocorrência

A hora de ocorrência informa o horário em que o sinistro aconteceu.

A obrigatoriedade da hora depende da configuração do ramo e, mais especificamente, da exigência de registrar horas e minutos na vigência da apólice. Se horas e minutos forem obrigatórios na definição do produto, a hora de ocorrência também será obrigatória.

Foi explicado que, se a hora for preenchida e a apólice tiver controle de horas e minutos, a vigência será validada não apenas pela data, mas pela combinação de data e hora.

---

## 10. Data e hora de notificação

## 10.1. Finalidade

A data de notificação é a data em que a companhia toma conhecimento do sinistro.

A transcrição estabelece duas validações básicas:

- não pode ser anterior à data de ocorrência;
- não pode ser posterior à data atual.

A hora de notificação representa o horário em que a companhia recebeu conhecimento do sinistro. Caso a notificação ocorra no próprio dia, a hora não pode ser posterior à hora do sistema.

## 10.2. Temporalidade ou extemporaneidade

A apresentação usa o termo registrado na transcrição como “temporanidad”; a documentação visual apresenta “Valida Extemporaneidad”. Pelo contexto, ambos se referem à validação do tempo transcorrido entre ocorrência e notificação.

A regra consiste em determinar o número máximo de dias que pode transcorrer entre:

```text
Data de ocorrência
↓
Prazo máximo configurado por setor e ramo
↓
Data de notificação à companhia
```

Para que essa validação seja efetiva, a apresentadora afirma que é necessário:

1. configurar no ramo que a temporalidade deve ser validada;
2. definir, por setor e ramo, o número máximo de dias permitido.

Também foi descrita a possibilidade de não validar essa regra para determinado ramo ou de usar lógica de negócio, por exemplo para não aplicar a validação a um cliente específico.

A documentação visual confirma que a propriedade de validação de extemporaneidade considera o número máximo de dias, mas o texto disponível está cortado antes de apresentar toda a regra.

**Rastreabilidade visual:** Frame 09, `33:27`.

---

## 11. Apólice: busca, vigência e exceções

## 11.1. Papel da apólice na abertura

A apólice é o contrato que será afetado pelo sinistro. Em regra, precisa estar vigente na data de ocorrência.

A tela demonstrada contém um campo de apólice com mecanismo de busca, indicado por uma lupa. A apresentadora explica que o operador pode pesquisar apólices por múltiplos critérios, tais como:

- contrato;
- ramo;
- segurado;
- tomador;
- tipo e código de documento;
- nome;
- sobrenome;
- matrícula;
- agente.

## 11.2. Significado dos ícones

A explicação menciona dois indicadores de interface:

| Indicador | Significado informado |
|---|---|
| Símbolo registrado como “más” na transcrição | Campo para introdução de informação |
| Lupa | Além de permitir digitação, oferece ajuda ou busca |

A transcrição provavelmente se refere a um ícone visual específico; o símbolo exato não pode ser determinado apenas pelo texto extraído.

## 11.3. Validação de vigência

Como regra geral, a apólice deve estar vigente na data do sinistro.

Contudo, existem configurações para permitir sinistro em apólice não vigente, especialmente diferenciando:

- apólice não vigente que não seja de transporte;
- apólice não vigente de transporte;
- lógica de negócio para avaliar circunstâncias específicas.

Um exemplo fornecido foi o ramo de vida: pode haver situações em que a apólice tenha sido anulada antes da ocorrência relacionada a uma morte, e a companhia deseje permitir a abertura conforme sua regra.

A apresentadora ressalta que a regra normal é exigir vigência, mas exceções podem ser configuradas.

## 11.4. Controle técnico sobre apólice

Mesmo que a apólice esteja vigente, o sistema verifica se ela está retida por controle técnico.

Segundo a explicação, algo retido por controle técnico “não existe” para efeitos operacionais do sistema e também não é considerado no fechamento enquanto não for autorizado. A mesma lógica é aplicada aos sinistros.

---

## 12. Aplicação: quando é solicitada

A aplicação é solicitada apenas quando a apólice possui aplicações.

O exemplo apresentado é uma apólice de transporte que cobre várias viagens. Nesse caso, a aplicação identifica qual viagem está sendo afetada pelo sinistro.

Quando não há aplicação, o sistema utiliza a aplicação 0.

Como a apólice, a aplicação:

- pode ter busca assistida;
- pode ter valor inicial;
- deve estar vigente na data de ocorrência;
- pode ter exceções configuradas.

Foi apresentado um caso em que uma viagem começa dentro da vigência, mas termina alguns dias depois do fim da vigência da apólice. A configuração pode permitir essa exceção e, se desejado, reter a situação em controle técnico para autorização.

---

## 13. Risco: seleção, vigência e descrição

## 13.1. Seleção do risco

Se a apólice possuir apenas um risco, o sistema o propõe automaticamente.

Se ela for multirrisco, o operador deve selecionar qual risco foi afetado. Foram usados exemplos de:

- vários veículos;
- várias casas;
- diversas empresas;
- várias pessoas.

A seleção deve ocorrer entre os riscos vigentes na data de ocorrência, salvo exceções configuradas.

## 13.2. Exceções de vigência

Tal como em apólices e aplicações, a vigência do risco pode receber exceções para:

- riscos não vigentes não relacionados a transporte;
- riscos não vigentes de transporte;
- cenários avaliados por lógica de negócio.

## 13.3. Dados recuperados automaticamente

Depois de definidos data de ocorrência, apólice, aplicação — quando necessária — e risco, o sistema recupera, sem intervenção manual:

- suplemento da apólice;
- suplemento/modificação da aplicação;
- suplemento/modificação do risco;
- nome ou descrição do risco.

Esses campos não são preenchidos manualmente pelo operador.

## 13.4. Importância da descrição do risco

A apresentação atribui grande relevância à composição da descrição do risco.

A descrição pode ser construída por uma lógica de negócio destinada a identificar o objeto segurado. Exemplos:

| Tipo de risco | Possíveis elementos da descrição |
|---|---|
| Automóvel | marca, modelo, matrícula, chassi; ou marca, modelo e ano de fabricação |
| Vida | sobrenomes e nome do segurado; ou certificado e sobrenomes |

A razão funcional é facilitar a seleção em apólices multirriscos. Uma descrição como “Toyota Corolla” ou outro identificador inteligível permite que o operador selecione o risco adequado rapidamente. Em contraste, descrições genéricas como “risco 1”, “risco 2” ou “risco 3” exigiriam consultas adicionais.

---

## 14. Informação do sinistro

Depois da identificação, o sistema apresenta informações adicionais sobre o sinistro.

A apresentadora afirma que, nesse ponto, já é exibido o número de sinistro configurado pelo sistema. Não foram detalhadas na sessão as regras de numeração.

Os principais elementos abordados foram:

- evento catastrófico;
- causa ou origem do sinistro;
- estimativa de valor do sinistro.

---

## 15. Evento catastrófico

## 15.1. Finalidade

Um evento catastrófico permite associar sinistros a uma ocorrência coletiva, como:

- inundação;
- terremoto;
- furacão;
- “gota fria”, termo usado na apresentação;
- sismo.

O objetivo declarado é permitir análise posterior da sinistralidade associada ao evento, incluindo a avaliação de quanto uma inundação, um furacão ou outro evento custou para a companhia.

## 15.2. Definição do evento

Antes de associar um sinistro ao evento, é necessário cadastrá-lo. Foram citados os seguintes atributos:

- tipo de evento;
- data de início;
- data de fim;
- data máxima de denúncia;
- território ou regiões afetadas.

A apresentadora menciona que os tipos de evento já são predefinidos. A transcrição não lista integralmente esses tipos, nem esclarece se eles podem ser mantidos ou ampliados.

## 15.3. Território

O evento deve indicar as zonas afetadas, que podem ser:

- estados;
- províncias;
- outras áreas geográficas.

A finalidade é delimitar a área potencialmente impactada pelo evento.

## 15.4. Validação

Ao associar o evento catastrófico ao sinistro, o sistema valida se a data de ocorrência do sinistro está entre a data de início e a data de fim do evento.

Não foi detalhado se há validação territorial automática baseada no risco, no endereço, na apólice ou em outro dado.

---

## 16. Causa, origem e consequências

## 16.1. Causa de origem

A causa é explicada como a origem do sinistro. As causas precisam ser definidas previamente no nível de companhia.

A configuração mencionada envolve:

- causa tratável ou não tratável;
- tipo de causa utilizado na abertura;
- situação de habilitada ou desabilitada.

A documentação visual reforça que, quando a causa for “NO TRAMITABLE”, o sistema não mostra consequências e segue para atributos posteriores às consequências, se houver informação definida nesse ponto.

**Rastreabilidade visual:** Frame 06, `22:20`.

## 16.2. Distinção entre causa e consequência

A apresentação diferencia a origem do dano das consequências decorrentes dela.

Exemplo 1:

```text
Incêndio do veículo
↓
Roubo dos itens que estavam dentro
```

Nesse caso, a causa seria o incêndio, enquanto os danos posteriores são tratados como consequências.

Exemplo 2:

```text
Roubo do veículo
↓
Veículo levado a outro local
↓
Incêndio posterior
```

Nesse caso, a causa é o roubo, porque ele teria originado a cadeia de eventos.

A explicação indica que causas de origem devem ser relacionadas às respectivas consequências por meio de definição prévia.

## 16.3. Limite do que a sessão esclarece

A sessão não detalha:

- a modelagem completa das consequências;
- como as consequências afetam pagamentos, reservas ou expedientes;
- a relação com regras de cobertura;
- o conteúdo de atributos antes e depois das consequências.

Esses tópicos aparecem na estrutura da documentação, mas não foram desenvolvidos na parte da reunião fornecida.

---

## 17. Estimativa de valor do sinistro

A abertura pode permitir a introdução de uma estimativa de valor do sinistro, caso essa opção tenha sido configurada.

A apresentadora deixa explícito que essa estimativa:

- é uma informação de referência;
- pode ser informada, por exemplo, por um perito;
- não tem efeito contábil;
- não entra no cálculo de reservas;
- não entra nos relatórios ou dados econômicos citados na explicação.

O sistema pode pedir ou não esse dado conforme um parâmetro configurado. Foram novamente mencionadas opções equivalentes a:

- sim;
- não;
- dependente de necessidade ou lógica configurada.

O texto não detalha o nome técnico preciso do parâmetro.

---

## 18. Intervenção externa: pessoa de contato

## 18.1. Finalidade

A pessoa de contato representa quem comunica o sinistro ou a pessoa externa relacionada à abertura.

A apresentadora afirma que não é um preenchimento obrigatório por padrão, mas pode ser tornado obrigatório por controle técnico em certos ramos.

## 18.2. Tipo de relação

O primeiro elemento é o tipo de relação da pessoa de contato com o segurado. Foram citados exemplos predefinidos como:

- cônjuge;
- irmão;
- amigo;
- segurado;
- condutor;
- nenhum.

A transcrição contém palavras repetidas e possivelmente imprecisas nessa lista, mas esses são os sentidos contextualmente identificáveis.

## 18.3. Preenchimento por lógica de negócio

O sistema pode usar uma lógica de negócio para recuperar automaticamente os dados do contato a partir do tipo de relação.

Exemplos explicados:

| Tipo de relação informado | Possível fonte dos dados |
|---|---|
| Segurado | Dados do segurado presentes na apólice |
| Agente | Código e dados do agente da apólice |
| Condutor | Dados do condutor |
| Proprietário | Dados do proprietário |

Essa lógica pode preencher os demais dados após a escolha do relacionamento.

## 18.4. Dados possíveis do contato

Foram citados os seguintes campos:

- tipo de documento;
- código ou número do documento;
- nome;
- sobrenome;
- telefone;
- celular;
- e-mail.

Todos podem ter valores iniciais configurados e podem ser preenchidos pela lógica associada ao tipo de relação.

## 18.5. Validação documental

A validação do documento é descrita como baseada em um catálogo que define, por tipo de documento:

- se admite números;
- se admite letras;
- qual formato é válido, por meio de expressões regulares.

Foram citados como exemplos de documentos:

- DNI;
- RUC;
- RFC;
- RUT.

Não foi possível determinar se esses exemplos são todos suportados em uma mesma instalação, se variam por país ou se foram apenas usados como ilustração.

---

## 19. Consultas disponíveis durante a abertura

Após identificar o sinistro e informar os dados iniciais, a tela disponibiliza informações de consulta que não são preenchidas manualmente.

## 19.1. Coberturas contratadas

É possível consultar as coberturas da apólice-risco válidas na data de ocorrência.

A consulta pode mostrar:

- coberturas contratadas;
- capitais contratados;
- franquias ou dedutíveis;
- moeda da franquia;
- cobertura relacionada, se houver.

O ponto temporal é relevante: a cobertura considerada é a existente na data de ocorrência, que pode ser diferente da cobertura vigente no dia atual.

## 19.2. Pessoas físicas e jurídicas relacionadas

Também podem ser consultadas as pessoas associadas à apólice e ao risco na data de ocorrência.

Foram citados como exemplos:

- tomador;
- segurado;
- agente;
- supervisor no contexto de sinistros;
- advogado principal, quando houver litígio.

A apresentação não explica como essas pessoas são cadastradas, nem a regra de determinação do supervisor ou do advogado.

---

## 20. Controles técnicos

Os controles técnicos são apresentados como verificações que podem ser aplicadas durante etapas da abertura.

A apresentação indica que os controles podem ser executados por grupos de informação:

1. após a identificação do sinistro;
2. após os dados fixos ou informações do sinistro, como evento, causa e valor;
3. potencialmente em outros pontos do fluxo, embora não detalhados.

Os resultados possíveis mencionados são:

| Resultado de controle | Efeito descrito |
|---|---|
| Observação | Registro de alerta/informação |
| Retenção | Exige autorização ou rejeição posterior |
| Rejeição | Impede a abertura ou processamento conforme a regra |

Exemplos citados:

- sinistro notificado após mais de um ano;
- apólice com alta sinistralidade;
- segurado marcado com possível fraude;
- regra específica sobre determinado evento catastrófico;
- causa que a companhia deseja controlar.

Em uma hipótese, a companhia poderia reter por controle técnico os sinistros notificados após mais de um ano, mesmo que a regra de temporalidade exista, para permitir análise e autorização humana.

---

## 21. Modelo de configuração e governança funcional

A reunião apresenta um modelo em que o comportamento da abertura é governado por manutenção de definições e catálogos.

Os mecanismos mencionados incluem:

- definição de ramo;
- definição de produto de emissão;
- catálogos de sinistros;
- parâmetros;
- valores iniciais;
- lógicas de negócio;
- regras de vigência;
- validações;
- controles técnicos;
- catálogos de documentos;
- catálogo de composição da descrição do risco.

A apresentação não fornece uma estrutura organizacional formal de governança — por exemplo, quem aprova alterações, como elas são implantadas ou quais equipes são responsáveis pela manutenção. Portanto, não é possível concluir como ocorre a governança operacional dessas definições.

---

## 22. Componentes e responsabilidades mencionados

| Componente ou conceito | Responsabilidade apresentada |
|---|---|
| Reef.core | Sistema em que a operação de abertura de sinistro ocorre |
| MAPFRE Catalog Marketplace | Portal de documentação e materiais de treinamento |
| Ramo | Define comportamentos, requisitos e validações da abertura |
| Produto de emissão | Base cuja definição antecede a configuração de sinistros |
| Catálogos de sinistros | Sustentam causas, eventos, documentos e outros valores usados no processo |
| Apólice | Contrato afetado pelo sinistro |
| Aplicação | Elemento usado em apólices não fixas, como viagens no exemplo de transporte |
| Risco | Objeto específico afetado pelo sinistro |
| Suplemento/movimento | Alteração contratual considerada conforme a data de ocorrência |
| Lógica de negócio | Mecanismo para comportamentos condicionais e preenchimentos derivados |
| Controle técnico | Mecanismo de observação, retenção ou rejeição |
| Terceiros | Fonte de dados de pessoas relacionadas, inclusive contatos |
| Evento catastrófico | Agrupador de sinistros para análise por ocorrência coletiva |

---

## 23. Casos concretos e exemplos apresentados

## 23.1. Saúde: sinistro futuro

**Contexto:** segurado solicita autorização para uma operação que ainda ocorrerá.

**Uso funcional:** registrar o sinistro com data futura.

**Dependência:** o ramo precisa permitir abertura de sinistros futuros ou ter lógica de negócio aplicável.

**Limitação:** a transcrição não detalha quais outras condições, aprovações ou produtos de saúde usam essa possibilidade.

---

## 23.2. Transporte: aplicação como viagem

**Contexto:** apólice não fixa, com viagens tratadas como aplicações.

**Uso funcional:** selecionar a viagem específica relacionada ao sinistro.

**Exceção discutida:** uma viagem pode começar durante a vigência da apólice e terminar alguns dias após o fim dessa vigência.

**Tratamento possível:** permitir a exceção por definição e, se desejado, aplicar controle técnico para autorização.

---

## 23.3. Automóveis: apólice multirrisco

**Contexto:** uma mesma apólice pode conter vários veículos.

**Uso funcional:** o operador deve selecionar qual veículo foi afetado quando houver mais de um risco.

**Dados relevantes do risco:** marca, modelo, matrícula, tipo de veículo e outros atributos.

**Implicação:** uma descrição clara do risco reduz a necessidade de abrir cada registro para identificar o veículo correto.

---

## 23.4. Residencial: alteração temporária de cobertura

**Contexto:** segurado se ausenta durante férias e realiza suplemento temporário para aumentar a cobertura de roubo.

**Uso funcional:** se o sinistro ocorrer no período do suplemento, a abertura deve considerar a cobertura temporária.

**Ponto de configuração:** definir se suplementos temporários são considerados para sinistros.

---

## 23.5. Vida: apólice não vigente

**Contexto:** foi citado o caso de uma apólice anulada antes de uma morte.

**Uso funcional:** uma regra de exceção pode permitir abertura de sinistro mesmo com apólice não vigente.

**Limitação:** o treinamento não define a regra de elegibilidade desse cenário; apenas mostra que ela pode ser configurada.

---

## 23.6. Evento catastrófico

**Contexto:** inundação, furacão, terremoto ou outro evento coletivo.

**Uso funcional:** associar sinistros a um mesmo evento para posterior análise de sinistralidade.

**Dependências:** evento previamente cadastrado, período definido e territórios associados.

---

## 24. Perguntas e respostas

A interação de perguntas durante a sessão foi limitada. A apresentadora pergunta se há dúvidas após a demonstração da identificação, mas não houve uma pergunta funcional substantiva registrada. No encerramento, participantes confirmaram presença e agradeceram.

Apesar disso, o treinamento antecipa dúvidas recorrentes ao responder, ao longo da explicação, questões implícitas.

### 24.1. Quando a hora de ocorrência é obrigatória?

**Resposta dada:** depende da configuração do ramo e da exigência de registrar horas e minutos na vigência da apólice.

**O que isso esclarece:** a obrigatoriedade não é fixa para todos os produtos; ela depende da definição funcional.

---

### 24.2. A data de ocorrência pode ser futura?

**Resposta dada:** em regra, não. Pode ser permitida se o ramo tiver configuração específica ou lógica de negócio, com exemplo de saúde.

**O que isso esclarece:** a regra geral possui exceções configuráveis.

---

### 24.3. A apólice precisa estar vigente?

**Resposta dada:** normalmente sim, mas podem existir exceções por ramo ou lógica de negócio, inclusive para situações de vida e transporte.

**O que isso esclarece:** a vigência é uma regra padrão, não necessariamente absoluta.

---

### 24.4. Por que selecionar uma aplicação?

**Resposta dada:** somente quando a apólice não for fixa e tiver aplicações, como viagens em transporte.

**O que isso esclarece:** aplicação não é um campo universal; sua presença depende da estrutura contratual.

---

### 24.5. O que ocorre se houver apenas um risco?

**Resposta dada:** o sistema propõe automaticamente o risco existente.

**O que isso esclarece:** a seleção manual só é necessária em contexto multirrisco.

---

### 24.6. O valor estimado afeta reservas ou contabilidade?

**Resposta dada:** não. É apenas uma informação estimativa e não tem efeito contábil, de reserva ou econômico conforme a explicação.

**O que isso esclarece:** não se deve confundir a estimativa inicial com valores financeiros processados no sinistro.

---

### 24.7. A pessoa de contato precisa ser preenchida manualmente?

**Resposta dada:** não necessariamente. Uma lógica de negócio pode buscar seus dados conforme o tipo de relacionamento, por exemplo a partir do segurado, agente, condutor ou proprietário.

**O que isso esclarece:** o fluxo pode reutilizar dados existentes em vez de exigir redigitação.

---

## 25. Roadmap e continuidade citados

O roadmap explicitamente citado é restrito à continuidade do treinamento.

| Item | Situação indicada |
|---|---|
| Abertura de sinistros — Parte 1 | Conteúdo apresentado na sessão |
| Abertura de sinistros — Parte 2 | Prevista para a próxima sessão, após a Semana Santa |
| Cabeceira do sinistro e demais componentes | Seriam tratados na próxima sessão |
| Documentação de sinistros | Indicada como já documentada |
| Documentação de expedientes | Indicada como em início de documentação |

Não foram fornecidas datas absolutas para a próxima sessão na fala. A página de sessões exibida visualmente traz uma programação de janeiro a abril de 2025, mas não permite afirmar com segurança a data da gravação ou da continuação específica desta sessão.

---

## 26. Números e indicadores citados

| Indicador ou regra numérica | Valor mencionado | Contexto |
|---|---:|---|
| Sessões de treinamento exibidas | 10 linhas visíveis | Programação de sessões entre 30/01/2025 e 03/04/2025 |
| Prazo de exemplo para operação futura | 15 dias | Operação futura em ramo de saúde |
| Quantidade de riscos possível em uma apólice | Um ou mais | Estrutura de apólice |
| Exemplos de veículos em apólice multirrisco | Três carros da família | Exemplo ilustrativo |
| Duração possível de viagem após fim de vigência | 4 ou 5 dias | Exemplo de aplicação de transporte |
| Prazo de exemplo para retenção técnica | Após um ano | Exemplo de sinistro notificado tardiamente |
| Ramo demonstrado | 300 | A apresentadora cita ramo 300 como automóveis |

Esses números são declarações ou exemplos apresentados no treinamento; não representam indicadores auditados de operação, volume ou desempenho.

---

## 27. Limitações reconhecidas

As limitações ou condições explicitamente reconhecidas incluem:

1. **Abertura de sinistros futuros não é uma regra geral.** Depende de definição por ramo ou lógica de negócio.
2. **Hora de ocorrência pode ser opcional ou obrigatória.** Depende da configuração de horas e minutos na vigência do produto.
3. **A temporalidade pode ou não ser validada.** Sua aplicação depende de configuração e pode ser condicionada por lógica.
4. **Apólice, aplicação e risco normalmente devem estar vigentes.** Exceções precisam ser configuradas.
5. **Suplementos temporários não necessariamente devem afetar sinistros.** Isso depende de seu uso na companhia e da parametrização.
6. **Pessoa de contato não é obrigatória por padrão.** Pode se tornar obrigatória por controle técnico.
7. **Estimativa de valor não tem efeito contábil ou de reservas.**
8. **Evento catastrófico precisa existir previamente.** Não é criado automaticamente no momento da abertura.
9. **Causa não tratável impede a exibição de consequências.** A documentação visual afirma que, nesse caso, o fluxo segue para atributos posteriores, se configurados.
10. **A sessão não completou a operação inteira.** Cabeceira e demais componentes foram adiados.

---

## 28. Riscos e desafios

## 28.1. Riscos explicitamente mencionados

| Risco ou situação | Tratamento mencionado |
|---|---|
| Notificação fora do prazo | Validação de temporalidade ou controle técnico |
| Apólice retida por controle técnico | Não considerada operacionalmente até autorização |
| Apólice, aplicação ou risco não vigentes | Bloqueio padrão ou exceção configurada |
| Suplemento temporário inadequadamente considerado | Parametrização de sim, não ou lógica de negócio |
| Segurado com possível fraude | Observação, retenção ou rejeição por controle técnico |
| Evento catastrófico associado fora do período | Validação da data de ocorrência contra início e fim do evento |
| Risco mal identificado em apólice multirrisco | Melhorar a composição do nome do risco |

## 28.2. Desafios derivados do contexto

As observações abaixo são análises derivadas do conteúdo, não afirmações literais dos participantes.

### Complexidade de configuração

A operação depende de muitos parâmetros distribuídos entre ramo, produto, catálogos, lógicas de negócio e controles técnicos. Isso sugere que mudanças aparentemente simples na experiência de abertura podem exigir avaliação cuidadosa de impactos funcionais.

### Qualidade de dados mestres

A eficiência operacional parece depender da qualidade de elementos como:

- descrição do risco;
- dados de terceiros;
- causas;
- eventos;
- regras de vigência;
- configurações de ramo.

Uma descrição de risco pouco informativa, por exemplo, pode aumentar o esforço manual de identificação.

### Governança de exceções

A existência de múltiplas exceções — para vigência, temporalidade, suplementos temporários e abertura futura — indica a necessidade de governança para que regras especiais não reduzam a consistência do processo.

### Dependência de lógica de negócio

A lógica de negócio é apresentada como mecanismo flexível e recorrente. Isso pode ser valioso para atender particularidades, mas a transcrição não esclarece como essas lógicas são desenvolvidas, testadas, versionadas ou auditadas.

---

## 29. Transformações e implicações identificáveis

## 29.1. De fluxo rígido para fluxo parametrizável

A principal transformação funcional apresentada é a passagem de uma abertura fixa para uma abertura governada por definição.

Em vez de depender de alterações no core para cada necessidade, o comportamento pode variar conforme:

- ramo;
- produto;
- regras de vigência;
- valores iniciais;
- lógicas de negócio;
- controles técnicos.

Essa interpretação é sustentada pela repetição da mensagem de que é possível personalizar a abertura “sem tocar o core”.

## 29.2. De simples registro para contextualização contratual

A abertura não é descrita como mero cadastro de evento. Ela exige reconstruir o contexto contratual válido no instante da ocorrência:

```text
Data e hora de ocorrência
↓
Apólice e respectivo suplemento vigente
↓
Aplicação, quando aplicável
↓
Risco e respectivo suplemento vigente
↓
Coberturas e pessoas válidas naquele momento
```

Isso mostra que a data de ocorrência é o eixo que conecta o sinistro à versão correta da relação contratual.

## 29.3. De tratamento isolado para análise agregada

O uso de eventos catastróficos permite agrupar sinistros e analisar sinistralidade por ocorrência coletiva. A apresentação relaciona diretamente essa associação à capacidade de calcular o impacto de uma inundação, furacão ou sismo.

## 29.4. De preenchimento manual para reutilização de dados

A lógica de preenchimento da pessoa de contato demonstra uma direção de reaproveitamento de dados existentes — do segurado, agente, condutor ou proprietário — em vez de exigir que o operador digite repetidamente a mesma informação.

---

## 30. O que a reunião não permite concluir

A transcrição e os frames não detalham suficientemente os itens abaixo. Portanto, eles não devem ser presumidos em documentos posteriores.

### Tecnologia e arquitetura técnica

Não é possível determinar:

- linguagem de programação;
- banco de dados;
- infraestrutura de cloud;
- uso de contêineres ou Kubernetes;
- arquitetura de APIs;
- mensageria ou eventos técnicos;
- integração síncrona ou assíncrona;
- modelo de autenticação e IAM;
- observabilidade;
- arquitetura de rede;
- criptografia;
- backup e disaster recovery;
- CI/CD;
- versionamento das configurações e lógicas de negócio.

### Operação e suporte

Não é possível determinar:

- SLA;
- modelo de suporte;
- responsáveis por incidentes;
- fluxo de aprovação de controles técnicos;
- tempos de atendimento;
- políticas de release, patch ou hotfix;
- ambientes de desenvolvimento, homologação e produção.

### Governança e organização

Não é possível determinar:

- quem configura ramos, causas, eventos e lógicas;
- quem aprova exceções;
- quais áreas são responsáveis por dados mestres;
- se há Product Owner, Product Manager, Scrum Master ou equipes estáveis;
- como a documentação é mantida;
- como alterações são auditadas.

### Regras funcionais não detalhadas

Não é possível concluir:

- como se calcula reserva;
- como se realiza pagamento ou liquidação;
- como funcionam expedientes;
- como fraude é avaliada além do exemplo de controle técnico;
- como se relacionam causa, consequência, cobertura e indenização;
- quais ramos usam cada regra;
- se os exemplos são globais ou específicos de uma instalação;
- se as configurações são iguais em todos os países ou companhias.

---

## 31. Conclusões

A primeira parte do treinamento apresenta a abertura de sinistro no Reef.core como um processo funcionalmente rico, baseado em contexto contratual e fortemente dirigido por configuração.

A abertura começa com a identificação temporal e contratual do sinistro. A data e hora de ocorrência definem qual apólice, aplicação, risco, suplemento e cobertura devem ser considerados. A partir dessa identificação, o sistema permite registrar informações iniciais, como evento catastrófico, causa, estimativa e contato, aplicando controles técnicos conforme as regras definidas.

O valor central do modelo apresentado está na capacidade de adaptar a operação por configuração — incluindo obrigatoriedade, valores iniciais, validações, exceções e lógicas de negócio — sem alterar o core. Ao mesmo tempo, essa flexibilidade exige definição prévia e consistente de ramos, produtos, catálogos, dados de risco e regras de negócio.

A sessão também reforça que o processo não se esgota no formulário de abertura. Ele depende de uma cadeia de dados e definições anteriores, e seus resultados suportam controles operacionais, tratamento de exceções e análises posteriores, especialmente em casos como sinistros vinculados a eventos catastróficos.

A operação completa não foi concluída no material fornecido. A continuação prevista deveria abordar a cabeceira do sinistro e os demais componentes da abertura ainda não explicados.
