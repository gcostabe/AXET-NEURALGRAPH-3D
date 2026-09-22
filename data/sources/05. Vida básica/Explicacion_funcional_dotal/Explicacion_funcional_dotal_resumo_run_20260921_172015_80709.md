# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Explicacion_funcional_dotal.mp4`
**Data de processamento:** 21/09/2026 17:28:36
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada — Fluxo de cotação, subscrição e emissão de seguro de vida

## 1. Síntese executiva

A reunião apresentou, de forma demonstrativa, o fluxo de contratação de um produto de seguro de vida operado no Uruguai e a adaptação planejada para o Panamá. O processo começa em um **frontal de cotação e emissão utilizado por agentes**, passa por APIs, regras configuradas no produto, integrações locais e, quando necessário, análise de subscrição realizada no back-office.

A principal mensagem foi que a lógica de negócio não está concentrada no frontal. O frontal atua predominantemente como camada de interação com o agente, enquanto campos, validações, listas de valores, regras de aceitação, recargos, controles técnicos, módulos de cobertura e formulários são devolvidos ou determinados por APIs e por configurações armazenadas em componentes como **MongoDB**, **Neutron/Tron Web** — nomenclatura registrada de forma inconsistente na transcrição — e o componente denominado **Valida Paso**.

A solução busca combinar um portfólio de produtos corporativos reutilizáveis com adaptações locais necessárias. O Uruguai utiliza um produto corporativo já implantado; para o Panamá, devido a diferenças relevantes de coberturas e informações regulatórias exigidas, foi decidido criar um segundo produto corporativo, e não uma personalização isolada do produto uruguaio.

O processo admite emissão automática diretamente pelo frontal em determinados cenários. Quando há fatores de risco, respostas de saúde, ocupação, esporte, capital segurado ou outras condições que exijam avaliação, a solicitação entra em **controle técnico** ou **subscrição**. Nesse caso, a emissão é finalizada no back-office. Foi informado que, no Uruguai, aproximadamente **50%** dos casos estavam sendo emitidos e cobrados integralmente pelo frontal; há uma evolução em curso para elevar esse percentual.

---

## 2. Contexto e antecedentes

A apresentação tratou de produtos de vida configurados em uma plataforma mencionada como **RIF**, **RIZ** ou “herriz” em diferentes trechos da transcrição. Como há inconsistência do reconhecimento de voz, não é possível afirmar com segurança se essas formas representam o mesmo nome técnico, embora o contexto indique que se referem ao ambiente central de configuração e consulta do produto.

O modelo operacional apresentado possui os seguintes elementos principais:

- um **frontal** utilizado por agentes para cotar e iniciar contratações;
- um ambiente de configuração de produto, onde são definidos dados variáveis de apólice e risco, coberturas, planos de pagamento, formulários, validações e outros parâmetros;
- APIs usadas pelo frontal para obter dados e executar regras;
- **MongoDB**, utilizado de modo relevante para regras de módulos, seleção de risco, recargos, controles técnicos e definição dinâmica de formulários e documentos;
- um ambiente de back-office, referido como **Neutron**, **Tron Web** ou variações semelhantes;
- integrações específicas de cada país, por exemplo, validação de identidade, gateway de pagamento, assinatura digital e ferramentas locais de subscrição.

O fluxo demonstrado é o do Uruguai, mas parte dele serve como referência para o Panamá. A intenção declarada não é criar uma versão inteiramente personalizada para cada país, e sim manter produtos corporativos no portfólio sempre que possível, permitindo sua implantação em outros mercados que tenham necessidades compatíveis.

---

## 3. Problemas e necessidades tratados

### 3.1 Necessidade de cotação e contratação por agentes

No Uruguai, a cotação e a emissão desse produto iniciam pelo frontal utilizado pelos agentes. Segundo a apresentação, a contratação não começa no back-office das unidades da companhia.

Isso indica que o processo comercial foi desenhado para que o agente consiga:

- identificar-se no sistema;
- consultar cotações em andamento;
- iniciar uma nova cotação;
- coletar os dados do tomador, segurado e beneficiários;
- apresentar módulos e coberturas;
- gerar documentação de projeto;
- obter assinatura;
- acompanhar o estado da solicitação.

### 3.2 Necessidade de separar interação do usuário e regras de negócio

Foi enfatizado que há “muita pouca regra de negócio” no frontal. Em vez disso, o frontal chama APIs que devolvem:

- campos a serem exibidos;
- obrigatoriedade de preenchimento;
- listas de valores;
- validações;
- integrações a executar;
- dados para cálculo;
- condições de recargo;
- necessidade de controle técnico;
- documentos e formulários que devem ser solicitados.

A necessidade subjacente parece ser evitar que regras de produto fiquem rigidamente programadas na camada de tela, permitindo que produtos e fluxos sejam configuráveis.

### 3.3 Necessidade de adequação local sem perder reutilização corporativa

As diferenças entre Uruguai e Panamá incluem:

- coberturas opcionais distintas;
- módulos com capitais diferentes;
- quantidade de dados solicitados;
- exigências regulatórias;
- integrações locais;
- gateways de pagamento;
- procedimentos de subscrição.

A resposta apresentada foi criar dois produtos corporativos distintos, em vez de forçar as diferenças do Panamá como personalização do produto uruguaio.

### 3.4 Necessidade de tratamento de riscos não automatizáveis

O fluxo reconhece que nem todas as contratações podem ser emitidas diretamente. Alguns fatores podem exigir avaliação humana, como:

- ocupação;
- soma segurada;
- respostas a questionários de saúde;
- índice de massa corporal;
- esportes praticados;
- outras regras configuradas de aceitação e risco.

Nessas situações, a solicitação é retida para controle técnico e análise de subscrição.

---

## 4. Solução apresentada

A solução é um fluxo guiado de contratação de seguros de vida dividido em telas, chamadas de “tela zero” até “tela nove”. O agente percorre esse fluxo para obter uma cotação, registrar dados, apresentar uma proposta, coletar informações complementares e encaminhar a solicitação para emissão automática ou subscrição.

A arquitetura apresentada combina configuração de produto e orquestração de serviços:

```text
Agente
↓
Frontal de cotação e emissão
↓
APIs / tarefas de validação
↓
Configurações de produto e regras
├─ Plataforma de produto citada como RIF/RIZ
├─ MongoDB
├─ Neutron / Tron Web
└─ Valida Paso
↓
Integrações locais
├─ Serviço regulatório de identificação
├─ Ferramenta de documentos
├─ Gateway de pagamento
├─ Assinatura digital
└─ Ferramenta local de subscrição
```

> O desenho acima é uma consolidação analítica do fluxo explicado na reunião. Não foi apresentado como diagrama literal.

---

## 5. Fluxo funcional de contratação

## 5.1 Tela zero: acompanhamento de cotações e processos

A “tela zero” é apresentada como o ponto inicial para o agente. Ela mostra processos de cotação ou contratação já iniciados.

A API chamada nessa tela devolve, conforme o usuário conectado:

- identidade do agente;
- supervisor do agente, quando aplicável;
- processos em andamento;
- possíveis apólices emitidas em determinada data.

Foram citados estados associados ao avanço do processo:

| Estado citado | Significado relatado |
|---|---|
| Solicitud / Solicitação | Estado inicial, mencionado como aplicável até aproximadamente a tela 3. |
| Proyecto / Projeto | Estado citado para uma etapa mais avançada, após determinadas telas. |
| Cancelado | Processo iniciado pelo agente, mas interrompido sem continuidade. |
| Pendente de assinatura digital | Situação possível quando a assinatura ainda não foi concluída. |
| Pendente de anexar documentação | Situação possível quando faltam documentos requeridos. |
| Subscrição | Estado visível quando o caso demanda análise técnica. |
| Emitido | Resultado posterior da conclusão da emissão. |

A sequência precisa dos estados foi discutida com alguma hesitação durante a demonstração. Portanto, não é possível derivar da transcrição uma máquina de estados completa e inequívoca.

---

## 5.2 Início de uma nova cotação

Ao iniciar uma nova cotação, o agente é identificado pelo seu código. O sistema recupera informações como:

- agente responsável;
- quadro de comissões aplicável;
- escritório associado à contratação;
- possibilidade de o agente estar vinculado a um ou mais escritórios.

A primeira tela coleta dados básicos para apresentar opções de seguro. As informações exibidas e exigidas são determinadas por APIs configuradas para o produto.

---

## 5.3 Consulta de dados de identidade no Uruguai

Quando é informado um documento de identidade — especialmente uma cédula — o fluxo uruguaio chama um serviço integrado a um órgão regulatório ou entidade local. Esse serviço retorna, segundo a apresentação:

- nome;
- sobrenome;
- data de nascimento.

A finalidade é obter dados confiáveis do tomador, segurado ou terceiro envolvido no processo de contratação.

A integração foi descrita como específica do Uruguai. A reunião deixou claro que ela não deve ser automaticamente considerada reutilizável em outros países. Para integrações desse tipo:

1. o país disponibiliza o endpoint;
2. o país fornece a especificação;
3. são definidos dados de entrada e retorno;
4. são tratados erros;
5. a equipe integra o serviço ao fluxo de contratação.

O Panamá também teria solicitado integrações de natureza semelhante, mas a transcrição não detalha quais serviços específicos seriam usados.

---

## 5.4 Configuração de coberturas e planos de pagamento

O produto apresentado possui:

- duas coberturas principais obrigatórias;
- coberturas opcionais;
- regras de permanência ou máxima segurabilidade;
- diferentes modalidades de pagamento.

A cotação pode ser feita com:

- prêmio único;
- prêmio periódico mensal;
- prêmio periódico trimestral;
- prêmio periódico semestral;
- prêmio periódico anual.

O produto demonstrado é vendido apenas em dólares.

### Prêmio único

No prêmio único, o sistema apresenta dois módulos de produto. A transcrição menciona módulos associados a “garantizado 100%” e “garantizado 150%”.

Pelo que foi explicado:

- a cobertura de falecimento é referência para os capitais;
- no módulo de 150%, a cobertura de sobrevivência é associada a 150% da cobertura principal de falecimento;
- no módulo de 100%, a cobertura de sobrevivência corresponde ao mesmo capital da cobertura de falecimento.

Não foram detalhados todos os critérios atuariais ou contratuais desses módulos.

No fluxo de prêmio único:

- são apresentadas apenas as coberturas principais;
- não há seleção de coberturas opcionais;
- não há coleta de cartão para cobrança;
- o pagamento deve ser realizado por transferência bancária, devido aos valores elevados envolvidos.

### Prêmio periódico

No prêmio periódico, o sistema apresenta módulos diferentes e disponibiliza as coberturas opcionais para seleção.

As coberturas opcionais aparecem inicialmente não contratadas. O agente pode selecioná-las conforme o interesse do cliente. Após essa seleção, é necessário recalcular a cotação.

Foi apresentado um exemplo no qual a contratação da cobertura de falecimento acidental obriga também a contratação de invalidez total e permanente. Essa dependência é tratada como regra de negócio configurada no MongoDB.

---

## 5.5 Recalculo e composição da prima

Após alterações em módulos, coberturas ou informações de risco, o sistema executa novamente regras e cálculos.

A prima exibida na tela de cobertura pode incluir:

- valores das coberturas;
- impostos;
- direitos de emissão;
- recargos por fracionamento;
- impostos específicos do Uruguai mencionados na transcrição como “impuesto de caja bancaria” e “impuesto de sangre”.

Essas denominações devem ser preservadas com cautela, pois podem conter erro de reconhecimento de voz.

A prima ainda pode mudar posteriormente se forem identificados fatores como:

- ocupação;
- esporte de risco;
- condição de saúde;
- sobreprima;
- análise manual de subscrição.

Quando o risco entra em controle técnico, a prima deixa de ser exibida nas telas seguintes, sinalizando que aquele valor é potencialmente provisório.

---

## 6. Papel do MongoDB

O MongoDB foi descrito como componente fundamental do fluxo de produtos de vida. Segundo a demonstração, nele são configurados ou definidos elementos como:

- módulos disponíveis para cotação;
- regras de seleção de risco;
- critérios de oferta em função dos dados do risco;
- regras de recargo automático;
- regras que geram controle técnico;
- regras para formularios;
- dados adicionais a solicitar;
- documentos a gerar;
- documentos a enviar para assinatura;
- critérios para solicitar documentação complementar.

A apresentação também mencionou integração entre:

```text
Frontal ↔ MongoDB
Oracle ↔ MongoDB
```

A transcrição não detalha:

- como essas integrações são implementadas;
- se são síncronas ou assíncronas;
- qual é o papel específico do Oracle;
- quais dados são persistidos em cada tecnologia;
- como ocorre versionamento de regras.

---

## 7. Dados adicionais de risco e controles técnicos

## 7.1 Dados pessoais, fiscais e regulatórios

No caso uruguaio, são solicitados dados como:

- endereço pessoal;
- endereço habitual;
- dados de contato;
- condição de pessoa politicamente exposta;
- residência no país;
- residência fiscal;
- residência fiscal em outros países.

Parte dessas exigências também foi mencionada como aplicável ao Panamá.

## 7.2 Ocupação

A ocupação pode:

- gerar recargo automático;
- gerar controle técnico;
- levar à avaliação pela área de subscrição;
- resultar em recargo manual;
- eventualmente resultar em rejeição.

A transcrição diferencia ocupações com recargo automático de ocupações que exigem análise técnica.

## 7.3 Esportes

A prática de esporte pode alterar a aceitação e o preço. O fluxo pode considerar, entre outros aspectos:

- tipo de esporte;
- prática com competição ou sem competição;
- condição de amador ou profissional.

O formulário permite selecionar um ou mais esportes. As listas, as regras de recargo e as condições para controle técnico são configuradas conforme a necessidade do país.

## 7.4 Saúde

O questionário de saúde pode acionar:

- coleta de dados adicionais;
- recargo automático;
- necessidade de análise manual;
- retenção para subscrição;
- impedimento de emissão automática.

Foi exemplificada uma pergunta sobre pressão arterial. Se a resposta for positiva, novos dados são solicitados.

Também foi informado que existe uma evolução em curso no Uruguai para retirar uma pergunta sobre histórico oncológico ou cardíaco em familiares diretos. A justificativa apresentada foi que muitas pessoas respondiam positivamente, mas essa resposta não levava a uma ação posterior. A retirada dessa pergunta deve reduzir retenções desnecessárias e aumentar a parcela de emissões diretamente pelo frontal.

---

## 8. Formulários e documentação

Os formulários apresentados dependem das respostas e características do caso.

Podem ser solicitados, entre outros:

- formulário de saúde;
- formulário financeiro;
- formulário relacionado a lavagem de ativos;
- documentos de identificação;
- solicitação assinada;
- questionário de saúde assinado.

O formulário de saúde foi descrito como obrigatório em todos os casos demonstrados. Já os demais formulários podem depender de fatores como capital segurado ou outras regras configuradas.

As perguntas, respostas permitidas, listas de valores e validações dos formulários foram descritas como configuráveis na plataforma de produto.

---

## 9. Documento de projeto e documento de solicitação

## 9.1 Projeto

Após a cotação, o sistema pode gerar um documento de projeto para apresentação ao cliente.

O documento pode conter:

- número de projeto;
- data;
- dados solicitados pelo negócio;
- coberturas selecionadas;
- capitais dos módulos;
- prêmios para periodicidades distintas;
- valores de resgate;
- seguro saldado;
- projeção de prêmios;
- valores garantidos ao longo da vigência.

A geração utiliza uma ferramenta de documentação integrada via API. As plantillas ou modelos de documento ficam em uma ferramenta específica, não identificada pelo nome na reunião. Os dados são preenchidos por integração via XML.

O projeto pode ser:

- enviado por e-mail ao tomador e ao agente;
- baixado pelo agente.

Foi informado que não é possível avançar no fluxo sem executar uma dessas ações.

## 9.2 Solicitação

Em uma etapa posterior é gerado o documento de solicitação. Ele apresenta elementos como:

- dados gerais da solicitação;
- produto;
- dados de identificação do tomador;
- coberturas contratadas;
- beneficiários;
- cláusulas;
- meio de pagamento;
- moeda.

Quando o caso está em controle técnico, a prima pode não aparecer nesse documento. Isso levou a uma dúvida explícita sobre o cliente assinar uma solicitação sem conhecer o preço definitivo.

A resposta indicou que, nesses casos, o documento deixa claro que a situação é provisória e pode estar sujeita a recargo. Contudo, a transcrição não detalha a redação jurídica exata, o mecanismo de aceite após eventual sobreprima ou as condições contratuais que protegem as partes nessa situação.

---

## 10. Assinatura digital e assinatura presencial

O processo prevê duas modalidades.

### Assinatura digital

Na assinatura digital:

- documentos são enviados ao cliente;
- é enviado e-mail para assinatura;
- há uso de PIN;
- foi mencionada a possibilidade de uso por dispositivo móvel;
- a ferramenta citada foi transcrita como “logaltid”, nome que pode estar incorreto.

A reunião não permite confirmar o nome do fornecedor de assinatura digital.

### Assinatura presencial

Na assinatura presencial:

- os documentos devem ser baixados;
- os documentos são assinados fora do sistema;
- a solicitação e o questionário de saúde assinados devem ser anexados;
- documentos de identidade também podem ser solicitados.

Foi relatado um caso de e-mail cadastrado incorretamente, que impede a continuidade da assinatura digital até que haja correção ou reenvio. Foi dito que o back-office pode alterar o e-mail por uma rotina de terceiros e reenviar o processo.

---

## 11. Pagamento e tokenização

## 11.1 Prêmio único

Para prêmio único, não são solicitados dados financeiros nem de cartão. A tela apresenta os dados bancários para que o cliente realize uma transferência.

A justificativa fornecida foi que os valores são altos e não seriam normalmente cobrados em cartão ou débito.

## 11.2 Prêmios periódicos

Para prêmios periódicos, há integração com um gateway de pagamento local do Uruguai, transcrito como **“de local”**. O nome pode estar incorreto devido ao reconhecimento de voz.

A integração utiliza campos fornecidos pelo próprio gateway. Foi explicado que:

- o sistema não retém os dados do cartão;
- os dados são tokenizados pelo provedor;
- a companhia fica com um token;
- a tela executa uma verificação de cartão válida, chamada de “cobro cero”;
- nessa etapa não há cobrança efetiva;
- o token é utilizado posteriormente para cobrança.

Quando a emissão não é concluída diretamente pelo frontal, a cobrança ocorre por um processo diário. Esse processo verifica recibos vencidos e executa a cobrança usando o token no gateway.

### Parcelamento e financiamento

No caso uruguaio, para uma periodicidade anual, foi citada a possibilidade de o cliente parcelar na própria administradora de cartão, em opções entre uma e dez parcelas.

Nesse cenário:

- para a seguradora, existe um único recibo anual;
- a seguradora cobra o valor anual;
- o parcelamento é tratado pela administradora do cartão.

Quando o fracionamento é feito pela própria seguradora, como em pagamentos mensais ou trimestrais, esse campo de número de parcelas não é exibido.

---

## 12. Modelo de subscrição

## 12.1 Entrada em subscrição

Quando uma regra indica controle técnico, o agente ainda pode chegar à tela final, mas o processo é enviado para análise. O agente não pode alterar a cotação depois que ela entra nesse estado.

O agente visualiza que o processo está em subscrição. A partir daí, a decisão é conduzida pela área responsável.

Os possíveis resultados citados foram:

- autorização;
- rejeição;
- solicitação de documentos ou exames adicionais;
- aplicação de recargo manual;
- emissão posterior.

## 12.2 Operação atual no Uruguai

Foi informado que o módulo de subscrição próprio ainda está em desenvolvimento.

Enquanto isso, no Uruguai:

1. a solicitação retida gera um e-mail para uma caixa disponibilizada pelo país;
2. um robô monitora essa caixa;
3. o robô extrai dados estruturados;
4. o robô abre um caso em uma ferramenta local do país;
5. a equipe de subscrição trata o caso nessa ferramenta.

A ferramenta local é usada para atividades como:

- análise de subscrição;
- solicitação de exames médicos;
- envio de notificações;
- controle de casos pendentes.

A transcrição não especifica:

- o nome dessa ferramenta;
- como o robô funciona;
- quais campos exatos são transmitidos;
- o padrão técnico usado no e-mail;
- critérios de priorização ou SLA dos casos.

## 12.3 Situação no Panamá

Foi informado que o Panamá também iniciará com algum grau de manualidade no processo de subscrição, pois o módulo corporativo de subscrição ainda não está disponível.

---

## 13. Operação no back-office

No back-office, o subscritor consulta o orçamento ou proposta retida. São exibidos dados como:

- status provisório;
- dados principais da solicitação;
- tomador;
- segurado;
- agente;
- beneficiários;
- atributos do risco;
- coberturas;
- controles técnicos;
- fatores associados ao cálculo da prima.

Foi informado que o subscritor consegue ver informações técnicas ligadas ao cálculo, incluindo:

- tabela de mortalidade;
- gastos sobre a apólice;
- gastos administrativos;
- existência ou não de sobreprima;
- fatores que intervieram na tarifa.

Entretanto, nem todos esses fatores podem ser alterados pelo subscritor. A tabela de mortalidade foi citada como exemplo de elemento não editável. Já o subscritor pode aplicar um recargo manual, como uma sobreprima por saúde.

### Alternativas de emissão

Foram citadas duas opções de operação no back-office:

| Opção mencionada | Uso relatado |
|---|---|
| Emitir apólice a partir de orçamento | Emissão nas mesmas condições do orçamento. |
| Emitir orçamento a partir de orçamento | Usado quando é necessário alterar condições, como incluir recargo manual. |

A nomenclatura foi registrada em espanhol e pode não representar o nome exato dos menus do sistema.

---

## 14. Comissões e venda compartilhada

No Uruguai, existe a possibilidade de dois agentes realizarem uma venda compartilhada.

Nesse cenário:

- dois agentes podem ser associados à mesma venda;
- a comissão é dividida entre eles;
- foi mencionado um rateio de 50% para cada agente em uma venda compartilhada;
- os quadros de comissão dependem de fatores como duração, tipo de prêmio, modalidade e ano da apólice;
- também há distribuição associada ao supervisor do agente.

Foi citado como exemplo que a distribuição pode variar entre os anos zero a cinco e os anos seis a dez da apólice.

As regras de comissão utilizam funcionalidades da plataforma de produto e estruturas criadas para produtos de vida, especialmente para lidar com duração e ano de vigência da apólice.

---

## 15. Segurança e acesso à informação sensível

Foi levantada uma pergunta sobre acesso a formulários de saúde e financeiros após a emissão da apólice.

A resposta indicou que:

- o agente que conduz o processo e seu supervisor têm acesso durante a contratação;
- os documentos ficam armazenados em uma estrutura da plataforma;
- no back-office, a consulta depende dos papéis atribuídos;
- o acesso é controlado pelos papéis do Neutron/Tron Web;
- usuários da área técnica de vida normalmente podem acessar as informações necessárias ao seu trabalho;
- nem todos os usuários podem consultar todas as apólices ou ramos.

A reunião não detalhou:

- modelo de segregação de dados;
- regras de mascaramento;
- trilhas de auditoria;
- criptografia;
- retenção documental;
- classificação de dados;
- política de privacidade;
- critérios de acesso mínimo necessário.

---

## 16. Valida Paso

O componente chamado **Valida Paso** foi apontado como relevante e teria sessões próprias de aprofundamento planejadas para a primeira semana de março.

Segundo a explicação, o Valida Paso é acionado em uma ou mais etapas do fluxo e concentra configurações e chamadas relacionadas a:

- validações por tela;
- integração com o serviço de identificação;
- integração com gateway de pagamento;
- obtenção de token;
- consulta ao MongoDB para determinar formulários;
- regras de documentos a assinar;
- regras de documentos a anexar;
- chamadas a componentes PL ou Java.

A transcrição contém uma aparente contradição ou ambiguidade técnica:

- em um momento, pergunta-se se o Valida Paso é um elemento Java, e a resposta indica que não seria um elemento PL;
- em seguida, é dito que a configuração inteira está em PL.

A interpretação mais prudente é que pode existir uma separação entre o componente executor e sua configuração, mas a reunião não fornece detalhe suficiente para confirmar essa arquitetura.

Também foi dito que o Valida Paso é usado, por enquanto, apenas em produtos de vida e no fluxo de cobrança recorrente.

---

## 17. Diferenças entre Uruguai e Panamá

| Aspecto | Uruguai | Panamá |
|---|---|---|
| Produto corporativo | Produto já utilizado como referência. | Será criado um segundo produto corporativo. |
| Módulos | Foram demonstrados módulos de 100% e 150%. | Módulos diferentes; o segundo foi mencionado como inferior a 150%, sem valor preciso. |
| Coberturas opcionais | Conjunto próprio do produto uruguaio. | Coberturas opcionais diferentes. |
| Dados solicitados | Endereços, dados fiscais, ocupação, esporte, saúde e outros. | Maior volume de informações. |
| Referências | Não foram citadas como obrigatórias. | Três referências: pessoal, comercial e bancária. |
| Formulário de saúde e financeiro | Menos dados que no Panamá. | Mais detalhados. |
| Integrações | Serviço local de identificação, gateway e ferramenta local de subscrição. | Integrações locais ainda não detalhadas. |
| Subscrição | Ferramenta local e robô de e-mail enquanto o módulo corporativo não está pronto. | Saída também deve ter manualidade por indisponibilidade do módulo de subscrição. |

A razão declarada para a criação de dois produtos corporativos é que as diferenças entre Uruguai e Panamá eram significativas demais para tratar o Panamá apenas como uma variação simples do primeiro produto.

---

## 18. Organização e governança do produto

O modelo apresentado sugere uma divisão entre responsabilidades corporativas e locais.

### Responsabilidades corporativas citadas

- construção de produtos corporativos;
- avaliação funcional dos produtos;
- orientação aos países;
- busca de reutilização em outros mercados;
- manutenção do portfólio corporativo;
- compartilhamento de coberturas comuns entre produtos.

### Responsabilidades locais citadas

- integrações específicas de cada país;
- especificação e disponibilização de endpoints locais;
- regras de contabilidade;
- fechamentos;
- relatórios para órgãos reguladores;
- particularidades operacionais e regulatórias;
- ferramentas locais enquanto módulos corporativos não estão disponíveis.

Uma leitura analítica possível é que existe uma tentativa de equilibrar padronização corporativa com autonomia local inevitável em temas regulatórios, financeiros e operacionais.

---

## 19. Números e indicadores citados

| Indicador | Valor mencionado | Contexto |
|---|---:|---|
| Produtos corporativos de vida no portfólio após a iniciativa Panamá | 2 | Produto uruguaio e novo produto corporativo para Panamá. |
| Coberturas principais obrigatórias | 2 | Produto de vida apresentado. |
| Emissão e cobrança integral pelo frontal no Uruguai | Aproximadamente 50% | Percentual informado como situação atual. |
| Agentes em venda compartilhada | 2 | Possibilidade de dois agentes participarem de uma venda. |
| Divisão de comissão em venda compartilhada | 50% / 50% | Regra mencionada para o Uruguai. |
| Referências solicitadas no Panamá | 3 | Uma pessoal, uma comercial e uma bancária. |
| Parcelas no cartão para plano anual | 1 a 10 | Opção apresentada no gateway de pagamento uruguaio. |
| Sessões previstas sobre Valida Paso | 3 | Planejadas para a primeira semana de março. |

> Os números acima foram declarados na reunião e não devem ser tratados como dados auditados externamente.

---

## 20. Perguntas e respostas relevantes

## 20.1 A configuração do produto é uma personalização específica do país?

**Pergunta:** Foi questionado se as diferenças entre Uruguai e Panamá seriam tratadas como personalização de país.

**Resposta:** Foi explicado que o produto uruguaio foi concebido com intenção corporativa. Como o Panamá apresentou diferenças relevantes, decidiu-se criar um novo produto corporativo, e não uma cópia personalizada por país.

**O que isso esclarece:** A estratégia busca manter ativos reutilizáveis no portfólio corporativo, mas admite múltiplos produtos quando as diferenças funcionais justificam essa separação.

---

## 20.2 O que pode levar um caso à subscrição?

**Pergunta:** Foi perguntado se a retenção para subscrição ocorria por ocupação ou por outros fatores.

**Resposta:** Foram citados ocupação, soma segurada, respostas do questionário de saúde, peso, altura, índice de massa corporal e esporte.

**O que isso esclarece:** A subscrição é alimentada por múltiplas regras de risco, não apenas por uma categoria isolada.

---

## 20.3 O agente pode alterar uma cotação depois que ela entra em subscrição?

**Pergunta:** Foi questionado se o agente poderia fazer modificações após o caso entrar em análise.

**Resposta:** O agente pode chegar à tela final, mas, uma vez que o processo entra em subscrição, ele não retorna ao frontal para ajustes. A área de subscrição finaliza o tratamento.

**O que isso esclarece:** Há uma transferência de controle do processo comercial para a operação técnica.

---

## 20.4 O cliente pode mudar a periodicidade após receber uma sobreprima?

**Pergunta:** Foi levantada a possibilidade de o cliente desejar trocar a forma de pagamento depois de saber que houve uma sobreprima.

**Resposta:** A resposta não foi conclusiva para todos os cenários. Foi dito que a forma de pagamento é escolhida durante a cotação, mas que, no back-office, pode haver possibilidade de selecionar outra modalidade durante a conclusão da emissão.

**O que isso esclarece:** A transcrição não permite afirmar que essa alteração seja sempre possível. O comportamento parece depender da etapa e da atuação do subscritor.

---

## 20.5 Quem pode acessar formulários de saúde e financeiros?

**Pergunta:** Foi questionado se qualquer pessoa que consultasse a apólice poderia ver formulários com informações sensíveis.

**Resposta:** O acesso é controlado por papéis do sistema. Agente e supervisor acessam durante o processo; usuários autorizados da área técnica de vida podem consultar os documentos conforme os perfis definidos.

**O que isso esclarece:** Há controle por papéis, mas não foram detalhadas políticas de proteção de dados além desse mecanismo.

---

## 20.6 O cliente assina uma solicitação sem prima definitiva?

**Pergunta:** Foi questionado como o cliente conhece o valor final se o caso está em controle técnico e a solicitação não mostra a prima.

**Resposta:** Foi indicado que a solicitação é provisória e pode estar sujeita a recargo. Porém, a discussão não detalhou o procedimento formal de aceite do cliente após definição da prima final.

**O que isso esclarece:** Esse é um ponto relevante de experiência do cliente e de conformidade, mas a reunião não forneceu detalhamento suficiente para documentar seu tratamento completo.

---

## 20.7 As taxas e fatores usados no cálculo ficam disponíveis para subscrição?

**Pergunta:** Foi perguntado se a área técnica consegue visualizar as taxas, recargos e fatores que determinaram a prima.

**Resposta:** Foi demonstrado que o back-office mostra, por cobertura, elementos como tabela de mortalidade, gastos, gastos administrativos, sobreprima e outros fatores de cálculo.

**O que isso esclarece:** O processo possui rastreabilidade operacional dos fatores utilizados na tarifação, ao menos para usuários com acesso ao back-office.

---

## 20.8 O que é o Valida Paso?

**Pergunta:** Foi perguntado sobre o componente Valida Paso, mencionado como evento ou elemento importante do fluxo.

**Resposta:** Foi explicado que ele é acionado nas etapas de validação e integração, incluindo identificação, gateway, MongoDB, formulários e documentos.

**O que isso esclarece:** O Valida Paso parece atuar como mecanismo central de orquestração ou validação por etapa, embora sua implementação técnica exata não tenha sido detalhada com clareza.

---

## 21. Limitações explicitamente reconhecidas

- O módulo corporativo de subscrição ainda estava em desenvolvimento.
- Uruguai e Panamá dependiam, no momento, de processos locais ou manuais para subscrição.
- A demonstração de assinatura digital não foi concluída porque o e-mail usado estava incorreto.
- A ferramenta de documentação não teve seu nome confirmado.
- O nome da ferramenta de assinatura digital não está confiável na transcrição.
- O nome do gateway de pagamento foi transcrito de forma possivelmente incorreta.
- A sequência completa de estados não foi formalmente consolidada.
- Não foi possível responder com 100% de certeza se o cliente pode alterar a periodicidade após uma sobreprima.
- Não foi apresentada a arquitetura detalhada do Valida Paso.
- Não foram mostradas regras detalhadas de aceitação, tabelas de taxas ou critérios específicos de recargo.
- Não foi demonstrado o fluxo integral de assinatura digital.
- O serviço de validação de endereços não estava ativo para esse produto de vida no Uruguai.

---

## 22. Riscos e desafios

## 22.1 Riscos explicitamente mencionados

- E-mail incorreto pode impedir ou atrasar assinatura digital.
- Respostas de saúde podem levar o processo a subscrição e impedir emissão automática.
- Ocupações, esportes e capitais podem exigir controle técnico ou resultar em rejeição.
- Dados de cartão precisam ser tratados por tokenização, não retidos diretamente pela companhia.
- Regras excessivamente sensíveis podem reter grande volume de casos sem produzir ação útil, como no exemplo da pergunta sobre histórico familiar.
- A ausência temporária do módulo corporativo de subscrição impõe dependência de ferramentas e rotinas locais.

## 22.2 Desafios derivados do contexto

> Os pontos abaixo são leitura analítica baseada na reunião, não afirmações literais dos participantes.

- A coexistência de produtos corporativos e exigências locais tende a demandar governança forte para evitar divergência excessiva entre países.
- A dependência de e-mail e robôs para integrar subscrição pode introduzir fragilidade operacional até que o módulo corporativo esteja disponível.
- A existência de informações de saúde, financeiras e regulatórias exige controles de acesso, auditoria e proteção de dados robustos, embora esses mecanismos não tenham sido detalhados.
- A assinatura de uma solicitação sem prima final, em casos retidos, pode exigir comunicação muito clara com o cliente para evitar expectativa incorreta de preço.
- O crescimento da emissão direta depende de calibrar regras de risco para evitar retenções desnecessárias sem reduzir a qualidade da subscrição.

---

## 23. Transformações identificadas

## 23.1 De fluxo manual para contratação digital assistida

O fluxo busca permitir que o agente conduza uma contratação com cotação, documentação, assinatura e, em certos casos, emissão e cobrança diretamente pelo frontal.

A reunião mencionou que o modelo comercial uruguaio procura concluir a venda, idealmente, em uma única entrevista com o cliente. O sistema também permite salvar e retomar a cotação posteriormente.

## 23.2 De regras embutidas na interface para regras configuráveis

A lógica de negócio foi deslocada do frontal para APIs, configurações de produto e MongoDB. Isso permite que a mesma camada de interação seja usada com diferentes configurações, coberturas e exigências de país.

## 23.3 De produto local isolado para portfólio corporativo

A criação de produtos corporativos reutilizáveis é apresentada como forma de aproveitar conhecimento e componentes entre países. Ao mesmo tempo, reconhece-se que algumas diferenças demandam produtos corporativos distintos, como ocorreu entre Uruguai e Panamá.

## 23.4 De emissão puramente administrativa para subscrição orientada por regras

O processo usa respostas de risco para decidir quando a emissão pode ser automática e quando precisa de intervenção humana. A subscrição não é eliminada; ela é aplicada seletivamente aos casos que exigem avaliação.

---

## 24. O que a reunião não permite concluir

A transcrição não fornece elementos suficientes para afirmar:

- qual é a tecnologia exata do frontal;
- qual é a tecnologia das APIs;
- qual é o banco de dados Oracle utilizado e sua responsabilidade detalhada;
- se MongoDB é a fonte de verdade de regras ou um repositório complementar;
- como ocorre versionamento, homologação e promoção de regras;
- se existem APIs síncronas, filas, eventos ou mensageria;
- qual é a infraestrutura de nuvem ou on-premises;
- se há uso de contêineres, Kubernetes ou orquestração;
- como funciona autenticação, autorização, IAM e SSO;
- quais controles específicos protegem dados de saúde;
- como são feitas criptografia, retenção, descarte e auditoria de documentos;
- quais são os SLAs para subscrição;
- como são monitoradas falhas de integração;
- quais são os critérios exatos de aceitação, recargo e rejeição;
- quais são os valores ou limites de capital que acionam formulários financeiros;
- como é realizado o consentimento final após a definição de uma sobreprima;
- qual é a ferramenta de assinatura digital;
- qual é o gateway de pagamento citado;
- qual é a ferramenta local de subscrição do Uruguai;
- se o Panamá usará os mesmos provedores de pagamento, assinatura e identidade;
- qual é a data de implantação do produto do Panamá;
- em que data absoluta ocorrerá a “primeira semana de março” mencionada;
- quais métricas, metas ou prazos formais estão associados ao aumento de emissão direta.

---

## 25. Conclusões

A reunião descreveu um modelo de contratação de seguro de vida orientado por configuração, APIs e regras de risco. O agente conduz a venda por um frontal, mas a inteligência de produto, validação, tarifação, seleção de risco e documentação é distribuída entre plataformas de configuração, MongoDB, APIs, back-office e integrações locais.

O Uruguai representa a implementação de referência. O Panamá reutilizará a abordagem geral, mas com produto corporativo próprio devido a diferenças relevantes em coberturas, dados obrigatórios e exigências regulatórias.

A emissão automática é uma meta importante, mas não absoluta. O processo preserva a atuação de subscrição para situações de maior risco ou incerteza. A iniciativa de remover uma pergunta de saúde com alto volume de respostas positivas e pouca consequência operacional evidencia uma tentativa de calibrar esse equilíbrio para aumentar a automação sem abandonar o controle técnico.

A arquitetura apresentada aponta para uma organização que procura padronizar produtos e capacidades em nível corporativo, mantendo localmente aquilo que depende de regulação, operação, contabilidade, relatórios e integrações específicas de cada país.
