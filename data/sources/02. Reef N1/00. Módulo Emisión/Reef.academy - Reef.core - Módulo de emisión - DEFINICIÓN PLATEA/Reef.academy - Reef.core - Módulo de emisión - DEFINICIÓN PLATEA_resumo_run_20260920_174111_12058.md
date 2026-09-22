# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.academy - Reef.core - Módulo de emisión - DEFINICIÓN PLATEA.mp4`
**Data de processamento:** 20/09/2026 17:43:12
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada — Integração entre RISCORE e Platea para avaliação de risco e antifraude

> **Nota de fidelidade:** esta análise foi elaborada exclusivamente a partir da transcrição fornecida. Não há timestamps, nomes completos dos participantes nem documentação complementar. Alguns termos podem conter imprecisões de reconhecimento de voz; quando isso afeta o entendimento, a incerteza é indicada.

## 1. Síntese executiva

A conversa apresentou uma integração entre o sistema **RISCORE** e o aplicativo **Platea**, descrito como um desenvolvimento próprio da direção de segurança da **MAPFRE** — registrada na transcrição como “MaFre”.

O papel de Platea é receber informações de um risco, analisá-las em tempo real e devolver uma classificação de risco ou de “assegurabilidade”. A escala mencionada possui cinco níveis: **muito baixo, baixo, normal, alto e muito alto**. Platea não toma decisões diretamente dentro do processo de negócio: ele devolve uma pontuação, severidade ou avaliação.

A decisão sobre o que fazer com essa resposta ocorre no RISCORE. Para isso, foi construída uma camada de parametrização que permite à área de negócio configurar, por ramo, indicador, processo, operação, contexto geográfico, estrutura comercial, produto e canal, quais ações deverão ocorrer para cada nível de risco retornado.

No processo de emissão, as ações são mais restritas e se concentram em controles técnicos: permitir continuidade com observação, reter a operação para auditoria/aprovação ou impedir a emissão. No processo de sinistros, a solução permite ações mais amplas, como acionar planos de tramitação que podem orientar investigações adicionais, inclusive com referência a atuação de detetives em cenários de suspeita de fraude.

A conversa também tratou de persistência das informações e segurança. A resposta bruta de Platea aparentemente não é armazenada de forma automática, mas pode deixar rastros indiretos por meio das ações configuradas, como controles técnicos associados à apólice. Para informações de apólices e sinistros, foram descritos níveis de controle de acesso à tela, às operações permitidas e ao conteúdo efetivamente visível para cada usuário.

---

## 2. Contexto e antecedentes

A reunião parece fazer parte de uma explicação funcional ou treinamento sobre a configuração de ramos no RISCORE e sua integração com Platea.

O foco não está na construção técnica da integração — por exemplo, não foram detalhados APIs, protocolos, bancos de dados ou mecanismos de mensageria —, mas na forma como o negócio pode configurar o comportamento do RISCORE após uma avaliação de risco recebida de Platea.

A solução foi apresentada como uma forma de separar responsabilidades:

- **Platea** analisa informações recebidas e devolve uma avaliação de risco.
- **RISCORE** aplica regras e ações de negócio com base nessa avaliação.
- **A área de negócio de cada país** define quais regras e consequências devem ser adotadas.

Essa separação é relevante porque evita que Platea seja apresentado como o componente que cancela emissões, bloqueia operações ou inicia investigações. Segundo a explicação, Platea apenas classifica ou pontua; a reação a essa classificação é configurada no RISCORE.

---

## 3. Problema tratado

### 3.1 Necessidade de avaliar riscos durante processos operacionais

O problema central é a necessidade de avaliar, em tempo real, se determinado risco deve ser tratado como aceitável, suspeito ou potencialmente fraudulento durante processos de seguros.

A avaliação pode ocorrer a partir de dados registrados no processo, principalmente informações do próprio risco. A transcrição menciona que podem existir informações adicionais, mas destaca que “quase a totalidade” do que é enviado corresponde às informações do risco registrado.

Exemplo citado:

- Durante a emissão de uma apólice de veículo, são registrados dados do veículo, incluindo a matrícula/placa.
- Esses dados são enviados a Platea.
- Platea pode indicar que aquela matrícula esteve envolvida em vários sinistros.
- O RISCORE usa essa avaliação para determinar a ação configurada para aquele cenário.

### 3.2 Necessidade de transformar avaliação em ação operacional

Uma pontuação isolada não resolve o problema operacional. A área de negócio precisa decidir como agir diante de cada retorno.

A conversa descreve exemplos de decisões possíveis:

- risco muito alto → cancelar ou impedir a emissão;
- risco alto → reter a apólice para análise mais aprofundada;
- risco normal, baixo ou muito baixo → continuar sem intervenção, dependendo da regra configurada.

Assim, o problema não é apenas identificar um risco, mas garantir que sua classificação resulte em um comportamento consistente no processo de emissão ou sinistro.

### 3.3 Necessidade de contextualizar a regra

A mesma evidência pode ter significados diferentes conforme o contexto. A discussão reconhece que um evento pode ser considerado normal em uma região e suspeito em outra.

Foram citados diversos fatores de contexto:

- ramo de seguro;
- módulo ou processo;
- operação específica;
- tipo de expediente/sinistro;
- tipo de dano;
- localização geográfica;
- estrutura comercial;
- estrutura de produto;
- canal;
- período de validade da regra.

Isso sugere uma necessidade de evitar regras globais e indiscriminadas para todos os produtos, países, regiões e operações.

---

## 4. Solução apresentada

A solução consiste em uma integração configurável entre RISCORE e Platea.

### 4.1 Papel de Platea

Platea é apresentado como:

- um aplicativo da direção de segurança da MAPFRE;
- um desenvolvimento próprio;
- um componente capaz de avaliar informações de risco em tempo real;
- um fornecedor de uma classificação ou grau de risco/assegurabilidade.

A classificação mencionada tem cinco níveis:

| Nível retornado por Platea | Significado apresentado |
|---|---|
| Muito baixo | Risco muito baixo |
| Baixo | Risco baixo |
| Normal | Risco considerado normal |
| Alto | Risco alto |
| Muito alto | Risco muito alto |

A transcrição alterna termos como “puntuación”, “nivel de peligro”, “grado de asegurabilidad”, “grado de riesgo” e “severidad”. Eles parecem se referir ao resultado de avaliação retornado por Platea, mas não foi detalhado se todos são tecnicamente a mesma estrutura de dados.

### 4.2 Papel do RISCORE

O RISCORE recebe ou utiliza a avaliação retornada por Platea para executar as consequências previamente configuradas pelo negócio.

A solução permite que a área de negócio determine, por exemplo:

- em que ramos haverá integração com Platea;
- em quais processos haverá consulta;
- quais indicadores Platea pode devolver;
- em quais operações cada indicador terá efeito;
- a quais áreas geográficas, produtos, estruturas comerciais ou canais a regra se aplica;
- quais ações devem ser tomadas para cada nível de risco.

### 4.3 Princípio de parametrização de negócio

A reunião enfatiza que foi criada uma “tela de parametrização” para que o negócio determine o comportamento desejado.

A intenção apresentada é que a configuração não fique limitada a uma decisão fixa de tecnologia. Em vez disso, o negócio pode estabelecer, por exemplo:

- se determinado indicador é relevante para emissão, sinistros ou ambos;
- se deve produzir somente uma observação;
- se exige revisão humana;
- se deve bloquear a continuidade da operação;
- se deve disparar um plano de tramitação em sinistros.

---

## 5. Fluxo funcional consolidado

O fluxo abaixo é uma reconstrução analítica baseada na explicação verbal, e não um diagrama literalmente apresentado na reunião.

```text
Registro de informações do risco no RISCORE
        ↓
Verificação de que o ramo está configurado para integrar com Platea
        ↓
Envio de informações do risco a Platea
        ↓
Avaliação em tempo real por Platea
        ↓
Retorno de indicador(es) e nível de risco
        ↓
Consulta das regras parametrizadas no RISCORE
        ↓
Aplicação da ação de negócio configurada
        ↓
Continuidade, marcação, retenção, bloqueio ou plano de tramitação
```

A transcrição indica que Platea avalia a informação enviada e retorna uma classificação. O RISCORE, então, verifica o contexto da operação e aplica a regra configurada.

---

## 6. Pontos de integração mencionados

A integração pode ser ativada por ramo. Antes de configurar indicadores e ações, é necessário definir se aquele ramo se conectará ou não a Platea.

Os processos de integração mencionados são:

| Processo | Situação descrita |
|---|---|
| Emissão de apólice | Integração prevista e tratada em detalhe |
| Emissão de suplementos | A chamada é mencionada como existente |
| Abertura de sinistro | Integração mencionada |
| Tratamento/tramitação de danos | Integração mencionada |
| Tramitação de sinistros | Associada a ações mais amplas, como planos de tramitação |

A explicação se concentrou principalmente na **emissão**, embora tenha descrito diferenças importantes em relação aos sinistros.

Se o ramo for configurado sem conexão com Platea, não há chamada ao aplicativo e, consequentemente, não haverá retorno de avaliação.

---

## 7. Arquitetura lógica e responsabilidades

> **Importante:** a reunião não detalha a arquitetura técnica de implementação. O diagrama abaixo representa apenas as responsabilidades funcionais inferidas da explicação.

```text
Usuário / Processo de negócio
        ↓
RISCORE
  ├─ Cadastro e registro do risco
  ├─ Configuração de ramos
  ├─ Parametrização de indicadores
  ├─ Parametrização de escopo e aplicabilidade
  ├─ Parametrização de ações
  └─ Aplicação de controles técnicos ou planos de tramitação
        ↓
Integração com Platea
        ↓
Platea
  ├─ Análise das informações recebidas
  └─ Retorno de avaliação de risco/assegurabilidade
```

### Responsabilidades atribuídas a Platea

- Receber informações do risco.
- Realizar análise em tempo real.
- Devolver uma classificação de risco.
- Retornar indicadores ou informações que contextualizam o risco.

### Responsabilidades atribuídas ao RISCORE

- Decidir se um ramo utilizará a integração.
- Determinar em quais processos a integração será aplicada.
- Manter indicadores configuráveis.
- Associar indicadores a módulos, operações e demais contextos.
- Aplicar ações segundo o nível devolvido por Platea.
- Registrar consequências de negócio, quando aplicável.
- Controlar o acesso às informações por meio de níveis de segurança.

---

## 8. Indicadores

### 8.1 Conceito apresentado

Os indicadores foram definidos como elementos que Platea pode devolver para contextualizar o risco existente na operação.

A explicação distingue o risco segurado do risco associado ao contexto ou comportamento observado. Em outras palavras, um indicador pode sinalizar uma circunstância potencialmente suspeita, relevante para análise de fraude ou elegibilidade.

Cada indicador possui, ao menos:

- um código;
- uma descrição;
- aplicabilidade ao módulo de emissão, sinistros ou ambos.

### 8.2 Exemplos citados

Os exemplos abaixo devem ser entendidos como exemplos didáticos dados durante a reunião, não necessariamente como regras efetivamente implantadas.

| Indicador exemplificado | Interpretação apresentada |
|---|---|
| Roubo de várias rodas sem acionamento de guincho | Situação considerada potencialmente estranha, pois um veículo sem rodas possivelmente demandaria guincho |
| Matrícula/placa envolvida em diversos sinistros | Sinal de atenção durante a análise de emissão |
| Veículo registrado como perda total sem terceiros envolvidos | Exemplo de situação que pode merecer avaliação adicional |
| Situação de saúde ou acidente que demande apuração adicional | Exemplo associado à abertura ou tramitação de sinistro e possível investigação |

### 8.3 Aplicabilidade por módulo

Um indicador pode ser classificado como válido para:

- emissão;
- sinistros;
- ambos.

A reunião apresentou como exemplo a possibilidade de um mesmo indicador ser relevante tanto para emissão quanto para sinistros.

---

## 9. Escopo e aplicabilidade das regras

Após definir o indicador, o RISCORE permite indicar em que contexto ele deve produzir efeitos.

### 9.1 Módulo e operação

É possível associar o indicador a determinado módulo e operação.

Exemplos mencionados:

- nova emissão de apólice;
- abertura de sinistro;
- abertura de dano;
- operação relacionada a determinado tipo de expediente de sinistro.

Isso permite que um indicador exista no catálogo, mas seja aplicado somente onde fizer sentido operacionalmente.

### 9.2 Tipo de expediente e tipo de dano

Para sinistros, a configuração pode considerar:

- tipo de expediente;
- tipo de dano.

O exemplo utilizado foi o roubo de rodas. A regra poderia aplicar-se a sinistros relacionados a roubo, na abertura de sinistro ou abertura de dano.

### 9.3 Escopo geográfico

Foi mencionado que as regras podem ser limitadas por zona geográfica não comercial, em níveis como:

- país;
- estado;
- província;
- código postal.

O exemplo didático apresentado foi o de roubos de rodas serem frequentes em uma região e pouco frequentes em outra. A configuração poderia fazer com que determinado indicador fosse considerado em uma região específica e não em outra.

### 9.4 Estruturas comerciais, de produto e de canal

Também foram mencionadas configurações baseadas em “pirâmides” ou hierarquias de:

- estrutura comercial;
- estrutura de produto;
- estrutura de canal.

A transcrição não detalha a composição dessas hierarquias, seus níveis ou a forma como são modeladas.

### 9.5 Vigência

As regras possuem uma data de validade ou vigência. A transcrição menciona uma “fecha de validez”, embora a formulação esteja parcialmente truncada.

Esse ponto indica que a aplicabilidade das regras pode ser temporal, mas não foram detalhadas regras de início de vigência, expiração, versionamento ou tratamento de conflitos entre regras.

---

## 10. Ações configuráveis no RISCORE

### 10.1 Lógica geral

O RISCORE permite configurar o que deve ocorrer quando Platea devolve um determinado nível de risco para um indicador em um contexto específico.

A lógica descrita pode ser representada assim:

```text
Indicador retornado por Platea
+ Nível de risco
+ Ramo
+ Módulo
+ Operação
+ Escopo geográfico/comercial/produto/canal
+ Vigência
        ↓
Ação configurada no RISCORE
```

### 10.2 Ações no processo de emissão

Segundo a apresentação, as ações disponíveis na emissão são mais limitadas e se concentram em controles técnicos.

Foram descritos três níveis:

| Nível de controle técnico | Efeito descrito |
|---|---|
| Observação | A emissão pode continuar, mas a apólice fica marcada com o controle técnico |
| Auditoria | A emissão ou operação fica retida para que alguém com nível adequado aprove ou rejeite |
| Rejeição | O usuário não pode continuar a emissão |

Também foi mencionada a possibilidade de não fazer nada, conforme a regra configurada.

### 10.3 Exemplo de decisão na emissão

A reunião apresentou uma lógica ilustrativa:

| Retorno de Platea | Possível ação configurada |
|---|---|
| Muito baixo | Controle técnico de observação |
| Baixo | Controle técnico de observação |
| Normal | Não foi estabelecida uma regra obrigatória; pode variar conforme configuração |
| Alto | Controle técnico de auditoria |
| Muito alto | Impedir continuidade da emissão |

Esse exemplo não foi apresentado como uma configuração universal. A intenção é demonstrar que o negócio pode decidir a ação para cada nível.

### 10.4 Ações no processo de sinistros

No módulo de sinistros, as ações podem ser mais amplas.

A transcrição cita:

- ativação de plano de tramitação;
- definição de novo nível de plano;
- execução de etapas adicionais no tratamento do sinistro.

Um plano de tramitação é explicado como um conjunto de passos que orienta o que deve ser feito no tratamento de um sinistro.

O exemplo citado envolve possível fraude: um plano poderia determinar contato com um detetive, encaminhamento do caso, solicitação de investigação e recebimento de um relatório.

Esse exemplo é ilustrativo e não confirma a existência de um fluxo efetivamente implantado com detetives para um caso específico.

---

## 11. Diferença entre emissão e sinistros

| Aspecto | Emissão | Sinistros |
|---|---|---|
| Uso da resposta de Platea | Definir controles técnicos ou bloqueio | Definir ações mais abrangentes de tramitação |
| Ações destacadas | Observação, auditoria, rejeição, continuidade | Ativação de planos e etapas de tratamento |
| Intervenção humana | Possível na auditoria | Pode ocorrer como parte do plano de tramitação |
| Exemplo citado | Reter ou impedir emissão de apólice | Investigar possível fraude com plano específico |

A mensagem principal é que a emissão trabalha principalmente com controles sobre a continuidade da operação, enquanto sinistros permitem orquestrar respostas operacionais mais complexas.

---

## 12. Persistência, rastreabilidade e registro da avaliação

### 12.1 Pergunta levantada

Uma participante perguntou onde a informação retornada por Platea é armazenada e se o aviso fica associado à apólice ou ao cliente.

### 12.2 Resposta dada

A resposta foi que, **no estado atual descrito**, a resposta de Platea não é armazenada diretamente como tal.

O que pode ficar registrado é a ação tomada no RISCORE.

Exemplos:

- Se o retorno de Platea levar à geração de um controle técnico de observação, esse controle ficará associado à apólice.
- Se gerar um controle técnico de auditoria, a apólice ficará marcada e dependerá de decisão de uma pessoa autorizada.
- Se a regra for de rejeição, a emissão não continua e, conforme a explicação, não há apólice emitida na qual registrar o controle.

### 12.3 Implicação analítica

Uma leitura possível é que a rastreabilidade operacional está concentrada no efeito de negócio produzido no RISCORE, e não necessariamente no armazenamento integral da resposta original de Platea.

A reunião não permite concluir:

- se o retorno bruto de Platea é registrado em logs técnicos;
- se há armazenamento temporário;
- se existem mecanismos de auditoria de chamadas;
- se a resposta pode ser recuperada posteriormente para investigação;
- se o resultado é associado ao cliente, ao risco, à apólice, ao suplemento ou a outro identificador interno.

---

## 13. Segurança e controle de acesso

A discussão avançou para o acesso a informações de apólices, sinistros e dados sensíveis.

Foram apresentados três níveis principais de segurança.

### 13.1 Primeiro nível: acesso à tela ou funcionalidade

O primeiro nível determina se um usuário pode acessar determinada tela ou área do sistema.

Exemplos mencionados:

- consulta de apólice;
- emissão de apólices;
- abertura de sinistro.

Um usuário pode ter ou não acesso a cada uma dessas funcionalidades.

A consulta de apólice foi descrita como uma área que pode permitir navegar por informações associadas, como:

- recibos;
- sinistros;
- resseguro;
- informações de pagamento;
- contas bancárias associadas a recebimentos.

### 13.2 Segundo nível: operações permitidas na tela

Mesmo que o usuário possa acessar uma tela, ele pode ter restrições sobre quais operações pode executar.

O exemplo dado envolve a tela única de suplementos. Por perfil ou pessoa, é possível configurar quais suplementos ou operações podem ser realizados.

Exemplos citados:

- não poder cancelar;
- não poder reabilitar uma apólice;
- não poder anular ou reabilitar apólices de saúde;
- não poder realizar determinadas operações em qualquer apólice.

### 13.3 Terceiro nível: acesso ao conteúdo da informação

O terceiro nível controla quais informações o usuário pode visualizar, mesmo quando possui acesso à apólice ou ao processo.

Exemplos mencionados:

- um agente externo pode visualizar apenas as apólices que ele próprio gerou;
- um agente não pode visualizar a apólice trazida por outro agente;
- um usuário pode consultar uma apólice, mas não visualizar comissões;
- um usuário pode não visualizar informações sensíveis de saúde declaradas na apólice.

### 13.4 Relação com o direito de acesso do segurado

Uma participante esclareceu que sua pergunta estava relacionada ao direito do segurado de acessar os próprios dados, incluindo documentos ou extratos que contenham dados pessoais, salvo impactos sobre direitos de terceiros.

A resposta reconhece que a informação é armazenada e que existem controles de acesso, mas não confirma de forma conclusiva como o sistema atende a solicitações de titulares de dados.

O participante responsável pela explicação afirmou não conhecer em detalhe a situação da Espanha, pois sua experiência de implantações estaria concentrada em outros países. Ele mencionou ter participado de implantações em 26 países, mas não na Espanha.

Assim, não foi possível confirmar:

- quais dados devem ser fornecidos ao segurado em um pedido de acesso;
- quais exceções legais são aplicadas;
- como informações sensíveis ou antifraude são tratadas nesse processo;
- se a resposta original de Platea é disponibilizada ao cliente;
- se há processo automatizado para atendimento a solicitações de acesso;
- como são conciliados direito de acesso, sigilo, prevenção à fraude e direitos de terceiros.

---

## 14. Organização e governança das regras

### 14.1 Papel do negócio

A área de negócio do país é apresentada como responsável por decidir o comportamento diante do retorno de Platea.

Entre as decisões que podem ser tomadas pelo negócio estão:

- ativar ou não a integração para determinado ramo;
- definir os indicadores relevantes;
- determinar em quais processos e operações os indicadores se aplicam;
- configurar o contexto geográfico, comercial, de produto e canal;
- definir a ação correspondente a cada retorno de risco.

### 14.2 Papel de Platea

Platea é tratado como o componente de avaliação. A conversa sugere que alguém ou alguma estrutura em Platea define a lógica de análise dos dados e devolve um valor ou nível de risco.

Contudo, a reunião não detalha:

- quem administra Platea;
- como são criados os modelos ou regras de avaliação;
- quais dados externos ou internos Platea utiliza;
- como os indicadores são calculados;
- como são calibrados os níveis de risco;
- se há inteligência artificial, regras determinísticas, análise estatística ou outro mecanismo.

### 14.3 Papel do RISCORE

O RISCORE atua como plataforma de aplicação das regras de negócio e das consequências operacionais.

A solução permite governança descentralizada por país ou contexto, ao mesmo tempo em que oferece uma estrutura de parametrização comum.

---

## 15. Perguntas e respostas relevantes

### Pergunta 1 — Os indicadores e os limites de ação são definidos pelo negócio?

**O que se buscava entender:**  
A pergunta procurou confirmar se a área de negócio define os indicadores e se, depois de Platea retornar um valor, o negócio decide faixas de ação, como “não fazer nada”, “exigir aprovação” ou “bloquear”.

**Resposta dada:**  
A resposta confirmou essa interpretação. Foi explicado que Platea pode devolver indicadores e um nível de risco, enquanto o RISCORE permite configurar a quais processos o indicador se aplica e o que deve ocorrer para cada retorno de risco.

**O que isso esclarece:**  
A avaliação de risco e a decisão operacional são separadas. Platea avalia; o RISCORE aplica as regras de negócio.

---

### Pergunta 2 — Onde a informação retornada por Platea é armazenada?

**O que se buscava entender:**  
A pergunta questionou se o alerta ou retorno ficaria associado à apólice ou ao cliente.

**Resposta dada:**  
Foi informado que a resposta de Platea, em si, não é armazenada atualmente. O que pode ser registrado é a ação tomada, como um controle técnico de observação ou auditoria.

**O que isso esclarece:**  
A rastreabilidade depende da configuração da ação. Se o negócio quiser que o resultado deixe marca na apólice, pode configurar um controle técnico de observação, por exemplo.

---

### Pergunta 3 — A informação de um plano de sinistro fica registrada e é acessível ao segurado?

**O que se buscava entender:**  
A pergunta foi refinada para tratar do direito do segurado de acessar dados pessoais e documentos associados a seu caso.

**Resposta dada:**  
A resposta explicou a existência de diferentes níveis de segurança para acesso à tela, às operações e ao conteúdo da informação. Contudo, não confirmou exatamente como o direito de acesso do segurado é operacionalizado, especialmente no contexto espanhol.

**O que isso esclarece:**  
O sistema tem mecanismos de controle de visibilidade, mas a transcrição não demonstra uma regra funcional fechada para atendimento a solicitações de acesso do titular.

---

### Pergunta 4 — A informação de Platea pode ficar na apólice?

**O que se buscava entender:**  
A pergunta buscou confirmar se, ao receber um risco alto, o retorno seria armazenado em um atributo da apólice.

**Resposta dada:**  
Foi esclarecido que o retorno bruto não é armazenado diretamente, mas pode haver registro indireto por meio de um controle técnico configurado.

**O que isso esclarece:**  
O desenho apresentado prioriza a persistência da consequência de negócio, e não necessariamente do dado de risco devolvido por Platea.

---

## 16. Números e referências quantitativas citadas

| Item | Valor mencionado | Contexto |
|---|---:|---|
| Níveis de risco retornados por Platea | 5 | Muito baixo, baixo, normal, alto e muito alto |
| Países em que o sistema teria sido implantado | 26 | Informação declarada pelo participante, sem validação externa |
| Proporção de agentes externos fora da Espanha | “99%” | Afirmativa contextual, aparentemente ilustrativa; não foi detalhado escopo, período ou fonte |

> Os números refletem declarações feitas na reunião e não foram auditados ou corroborados por fontes externas.

---

## 17. Limitações reconhecidas

A reunião reconheceu, explicitamente ou por ausência de detalhe, as seguintes limitações.

### 17.1 A resposta original de Platea não é armazenada diretamente

Foi dito que “hoje em dia” a resposta de Platea não é guardada como resposta bruta. O sistema registra, quando configurado, a ação tomada.

### 17.2 A solução depende da configuração do negócio

O comportamento não é automático nem universal. A reação ao nível de risco depende das regras parametrizadas por ramo, processo, operação e contexto.

### 17.3 O conhecimento apresentado sobre Espanha é limitado

O participante declarou não ter experiência de implantação do sistema na Espanha, apesar de afirmar experiência em outros países. Por isso, não pôde confirmar detalhes sobre obrigações de acesso a dados sensíveis naquele país.

### 17.4 As ações na emissão são mais limitadas

Na emissão, as ações destacadas são controles técnicos e bloqueio da continuidade. A capacidade de orquestrar ações é apresentada como mais ampla em sinistros.

### 17.5 Nem todos os processos parecem estar igualmente detalhados

Embora emissão, suplementos, abertura de sinistro e tratamento de danos tenham sido mencionados, a explicação aprofundou principalmente a emissão e, em menor grau, sinistros.

---

## 18. Riscos e desafios

### 18.1 Riscos explicitamente mencionados

- Fraude ou potencial fraude associada a indicadores retornados por Platea.
- Matrículas/placas envolvidas em múltiplos sinistros.
- Situações potencialmente anômalas em sinistros de veículos.
- Casos de sinistros que podem demandar investigação adicional.
- Exposição de informações sensíveis, especialmente em apólices de saúde.
- Acesso indevido a informações de clientes, apólices, comissões ou dados financeiros.

### 18.2 Desafios derivados do contexto apresentado

> Esta subseção contém análise e não afirmações literais dos participantes.

1. **Governança de parametrizações:** como as regras podem variar por ramo, operação, geografia, produto, estrutura comercial e canal, há potencial de alta complexidade de manutenção.

2. **Rastreabilidade de decisões:** a ausência de armazenamento direto da resposta de Platea pode dificultar auditorias ou análises retrospectivas, dependendo de quais controles técnicos tenham sido configurados.

3. **Consistência entre países:** como o negócio de cada país pode definir ações diferentes, é possível haver variação relevante no tratamento de situações semelhantes.

4. **Equilíbrio entre prevenção à fraude e experiência operacional:** regras muito restritivas podem bloquear emissões legítimas; regras pouco restritivas podem reduzir a efetividade da prevenção a fraude.

5. **Proteção de dados e transparência:** o tratamento de dados sensíveis e informações antifraude precisa ser compatibilizado com controles de acesso e obrigações legais aplicáveis em cada país.

---

## 19. Relações de causa e efeito identificadas

A cadeia abaixo é uma reconstrução analítica sustentada pelas falas da reunião.

```text
Necessidade de identificar riscos e possíveis fraudes
        ↓
Uso de Platea para analisar dados do risco em tempo real
        ↓
Retorno de indicadores e nível de risco
        ↓
Necessidade de transformar o resultado em consequência operacional
        ↓
Criação de parametrização no RISCORE
        ↓
Configuração de ações por ramo, processo, contexto e severidade
        ↓
Observação, auditoria, rejeição ou plano de tramitação
```

Outra relação identificada:

```text
Informações de apólices e sinistros podem ser sensíveis
        ↓
Nem todos os usuários devem acessar todos os dados
        ↓
Necessidade de controles de segurança em múltiplos níveis
        ↓
Restrição de acesso à tela, operação e conteúdo da informação
```

---

## 20. Transformações estruturais sugeridas pela reunião

> Esta seção apresenta uma leitura interpretativa baseada no conjunto das falas.

### 20.1 De avaliação isolada para decisão operacional configurável

A integração não se limita a consultar Platea. Ela introduz um modelo em que a avaliação externa é conectada a ações configuráveis dentro do processo de negócio.

A mudança relevante é:

```text
Pontuação de risco isolada
        ↓
Regra parametrizada
        ↓
Ação operacional no processo de seguro
```

### 20.2 De regras genéricas para regras contextuais

A configuração por geografia, canal, produto, estrutura comercial, operação e vigência sugere uma direção de contextualização das regras.

Isso permite que um mesmo indicador tenha impacto distinto conforme o cenário em que ocorre.

### 20.3 De controle manual ad hoc para fluxos orientados

Nos sinistros, a possibilidade de ativar um plano de tramitação indica uma tentativa de estruturar a resposta a eventos suspeitos em passos operacionais definidos, em vez de depender exclusivamente da decisão informal de cada analista.

### 20.4 De acesso amplo à informação para segurança em camadas

A explicação dos três níveis de segurança indica uma estrutura de proteção que separa:

- acesso à funcionalidade;
- permissão para executar operações;
- visibilidade sobre conteúdos específicos.

---

## 21. O que a reunião não permite concluir

A transcrição não fornece detalhe suficiente para determinar com segurança os seguintes pontos:

### Arquitetura técnica

- tecnologia usada no RISCORE;
- tecnologia usada no Platea;
- protocolo de integração;
- existência e formato de APIs;
- chamadas síncronas ou assíncronas;
- uso de mensageria, eventos ou filas;
- autenticação entre sistemas;
- mecanismos de timeout, retry ou contingência;
- versionamento da integração;
- monitoramento técnico e observabilidade.

### Dados e persistência

- campos enviados pelo RISCORE a Platea;
- estrutura exata do retorno de Platea;
- se Platea devolve somente severidade ou também evidências detalhadas;
- onde ficam logs técnicos das chamadas;
- retenção de dados;
- associação do retorno a cliente, apólice, suplemento, sinistro ou risco;
- mecanismos de auditoria e histórico das regras aplicadas.

### Segurança e privacidade

- modelo de IAM;
- perfis, papéis e permissões concretas;
- criptografia;
- mascaramento de dados;
- segregação de funções;
- atendimento operacional a pedidos de titulares;
- critérios para ocultar dados de antifraude;
- políticas de retenção e descarte;
- tratamento legal de dados sensíveis em cada país.

### Governança e operação

- responsáveis por aprovar regras;
- processo de publicação e revisão de parametrizações;
- gestão de conflitos entre regras;
- critérios de priorização;
- métricas de fraude;
- indicadores de falso positivo e falso negativo;
- SLA de Platea;
- modelo de suporte;
- gestão de incidentes;
- processo de testes antes da publicação de regras;
- roadmap futuro da integração.

---

## 22. Conclusões

A reunião apresentou um modelo funcional de integração entre RISCORE e Platea para apoiar a avaliação de risco e possíveis cenários de fraude em processos de seguros.

Platea é responsável por analisar dados do risco e devolver uma classificação de risco em tempo real. O RISCORE transforma essa classificação em consequências operacionais configuradas pelo negócio. Essa configuração pode variar conforme ramo, processo, operação, geografia, estrutura comercial, produto, canal e vigência.

Na emissão, o mecanismo atua principalmente por meio de controles técnicos: observação, auditoria ou rejeição. Em sinistros, pode ativar planos de tramitação mais abrangentes, capazes de orientar ações adicionais de investigação.

A conversa também deixou claro que a avaliação bruta de Platea não é necessariamente persistida como um dado próprio no RISCORE. A rastreabilidade, quando existe, decorre da ação configurada e registrada — como um controle técnico associado à apólice.

Por fim, o sistema foi descrito como possuindo controles de segurança em múltiplas camadas, distinguindo o acesso a telas, a operações e ao conteúdo sensível. Contudo, permanecem abertas questões importantes sobre arquitetura técnica, persistência detalhada, auditoria, governança de regras, proteção de dados e atendimento a direitos de titulares.
