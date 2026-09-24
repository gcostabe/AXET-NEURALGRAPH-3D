# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.core - Emisión - DEFINICIÓN ramo (3).mp4`
**Data de processamento:** 24/09/2026 15:39:16
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Análise estruturada — Reef.core: definição de ramo no módulo de emissão

> **Base documental:** transcrição automática da sessão e evidências visuais extraídas do portal de documentação.  
> **Rastreabilidade:** os horários entre colchetes referem-se aos frames visuais fornecidos. A transcrição de fala não possui marcação temporal detalhada.  
> **Nota terminológica:** a fala transcrita registra repetidamente “RIF”, “RIFCORE” e “tron/tronco”, enquanto as telas identificam o produto/documentação como **Reef.core** e a reunião como **“Reef.core - Emisión - DEFINICIÓN ramo (3)”** [17:47]. Há forte evidência contextual de que “RIF/RIFCORE” na transcrição se refere a **Reef.core**, mas esta equivalência é uma interpretação sustentada pelo contexto, não uma correção literal silenciosa.

## 1. Síntese executiva

A sessão foi um treinamento funcional sobre a **definição e parametrização de ramos** no módulo de emissão de Reef.core. O foco foi explicar como uma configuração de ramo determina o comportamento de emissão de apólices, orçamentos, suplementos, riscos, coberturas, transportes, cosseguro, resseguro, sinistros e cálculo de prêmios.

A principal mensagem é que o processo de emissão é tratado como **único e comum** entre diferentes linhas de negócio — como automóveis, vida, saúde, transportes e ramos gerais —, mas seu comportamento é adaptado por meio de parametrizações. Assim, não haveria um processo de emissão completamente separado para cada ramo: as diferenças operacionais decorrem da definição configurada para aquele ramo.

A apresentação percorreu propriedades já vistas em sessões anteriores e introduziu novos itens relacionados a:

- reutilização de declarações prévias em ramos de transporte;
- conversão de aplicações de transporte em apólices;
- modalidades de cosseguro;
- modalidades de resseguro;
- integração com um sistema externo de resseguro, identificado na transcrição como “R21” e, em alguns trechos, como “Reventu uno”;
- controles técnicos para falhas de comunicação com o sistema externo;
- validações de sinistros durante a emissão de suplementos;
- cálculo proporcional ou por escala para prêmios de períodos inferiores ou diferentes de um ano;
- aplicação de lógicas de negócio para modificar coeficientes de cálculo.

A reunião teve natureza predominantemente explicativa. Houve uma pergunta relevante sobre o efeito de ativar a colocação de resseguro em sistema externo e um relato de uso no Chile. A resposta indicou que a ativação não elimina completamente todos os cálculos e definições no Reef.core, mas transfere a gestão do resseguro para o sistema externo, com detalhes ainda não confirmados pela apresentadora.

---

## 2. Contexto e antecedentes

### 2.1 Contexto da sessão

A reunião ocorreu no Microsoft Teams, com 46 participantes visíveis na evidência de tela [17:47]. O título registrado foi:

> “Reef.core - Emisión - DEFINICIÓN ramo (3)”.

O treinamento fazia parte de um conjunto maior de conteúdos disponíveis em um portal de documentação. A apresentação mostrou uma estrutura que inclui:

- documentação de Reef;
- capacitação funcional;
- capacitação técnica;
- modelo operacional;
- sessões Reef;
- certificações em elaboração para a universidade corporativa;
- glossário ou documento de termos utilizados na documentação.

A apresentadora explicou que os materiais são organizados por módulos, formações específicas, conteúdos introdutórios e documentação relacionada a cada funcionalidade.

### 2.2 Estrutura documental apresentada

No portal, o módulo de **Emisión** contém a área de definição de ramo. A estrutura exibida sugere uma organização por tipos de negócio e por níveis de definição.

A evidência visual mostra conteúdos relacionados a:

- numeração;
- ramo;
- suplemento;
- contrato;
- subcontrato;
- apólice grupo;
- apólice cliente;
- dias de carência;
- dias de carência por contrato;
- dias de carência por subcontrato;
- integração com Platea;
- documentos;
- validações;
- comissões de agentes;
- intermediários;
- informações econômicas de recibos.

[21:20]

### 2.3 Conceito central: emissão única, comportamento parametrizado

A apresentadora afirmou que a emissão no Reef.core é única. Em termos práticos, o sistema não teria processos inteiramente independentes para emissão de automóveis, transportes, vida ou ramos gerais.

O que varia é a definição do ramo. Essa parametrização determina, entre outros aspectos:

- quais dados serão solicitados;
- quais configurações serão exigidas;
- quais fluxos de emissão estarão disponíveis;
- quais elementos complementares precisam ser definidos;
- como os riscos, coberturas e apólices serão tratados.

Uma explicação contextual possível é que a plataforma busca conciliar um fluxo operacional comum com especializações por produto ou linha de negócio. Essa leitura decorre da fala sobre a unicidade da emissão e da configuração específica de cada ramo; não foi apresentada como uma formulação arquitetural formal.

---

## 3. Problemas e necessidades abordados

A reunião não foi estruturada como uma apresentação explícita de “problemas”, mas diversas necessidades operacionais foram descritas. Elas podem ser organizadas da seguinte forma.

### 3.1 Necessidade de acomodar diferentes linhas de negócio em um processo comum

A plataforma precisa suportar produtos de automóveis, vida, saúde, transportes, ramos gerais e, possivelmente, outros tratamentos mencionados, sem criar necessariamente um processo de emissão completamente distinto para cada um.

**Consequência tratada:** o comportamento da emissão precisa ser configurável por ramo.

**Direcionamento apresentado:** utilizar propriedades e definições do ramo para determinar fluxo, dados, riscos, coberturas, cálculos e controles aplicáveis.

### 3.2 Necessidade de tratar configurações comuns e específicas

Parte das definições pode afetar a emissão, mas não pertencer exclusivamente ao módulo ou ramo em análise. A sessão distinguiu:

- definições comuns, potencialmente usadas por diferentes áreas ou domínios;
- definições específicas do ramo;
- definições de apólice;
- definições de risco;
- definições de cobertura;
- elementos exclusivos de determinada linha de negócio, como automóveis ou transportes.

**Consequência tratada:** a documentação e a parametrização precisam separar escopos para evitar confundir o que é comum, o que é aplicável à apólice e o que é aplicável a cada risco.

### 3.3 Necessidade de controlar regras de emissão e autorização

O sistema precisa acomodar cenários em que:

- a emissão direta de apólice é permitida ou proibida;
- um orçamento é obrigatório;
- um orçamento pode originar uma ou várias apólices;
- uma validação técnica retém um orçamento;
- a autorização prévia de orçamento é obrigatória ou dispensável;
- um movimento suspenso pode ser retomado apenas pelo mesmo usuário ou por qualquer usuário autorizado.

### 3.4 Necessidade de adequar numeração a exigências locais

Foi citada a necessidade de alguns países manterem numeração consecutiva de apólices, sem lacunas.

A apresentadora explicou que, no comportamento padrão descrito, uma apólice retida por controle técnico pode reservar um número; se posteriormente for rejeitada, esse número é liberado, o que pode gerar saltos ou mudança na sequência percebida. A propriedade de alteração de numeração existe para acomodar exigências locais.

A reunião não detalhou quais países possuem essa exigência nem o algoritmo exato de numeração.

### 3.5 Necessidade de tratar produtos de transporte com estrutura própria

Os ramos de transporte foram apresentados como tendo uma lógica particular:

- apólice marco;
- aplicações associadas a essa apólice;
- declarações prévias associadas à apólice marco;
- possibilidade de reutilização ou não dessas declarações;
- possibilidade de a aplicação tornar-se uma apólice fixa.

Esse desenho atende a operações em que há um contrato anual com condições gerais e viagens ou operações concretas declaradas posteriormente.

### 3.6 Necessidade de suportar compartilhamento de risco entre companhias

A sessão abordou:

- cosseguro, quando várias companhias participam diretamente do seguro;
- resseguro, quando uma companhia assegura parte do risco assumido por outra.

A configuração de ramo precisa definir que modalidades podem ser emitidas e como as condições serão determinadas.

### 3.7 Necessidade de coexistência com sistema externo de resseguro

Foi mencionado que Reef.core possui módulo próprio de resseguro, mas que alguns países usam uma aplicação externa identificada como “R21”, “Reventu uno” ou variação semelhante na transcrição.

A necessidade é parametrizar se a colocação de resseguro será conduzida no módulo do Reef.core ou por esse sistema externo, incluindo controles técnicos e o momento de envio das informações.

### 3.8 Necessidade de calcular prêmios para períodos não anuais

A plataforma trabalha, segundo a explicação, com períodos e informações econômicas anualizados. Quando a vigência não corresponde a um ano inteiro, é necessário definir como converter a informação anual em prêmio aplicável ao período:

- proporcionalmente ao tempo, por pró-rata;
- segundo escala definida pela companhia;
- por lógica de negócio que altere o coeficiente resultante.

---

## 4. Solução apresentada

## 4.1 Definição de ramo como mecanismo de configuração

O ramo foi apresentado como a estrutura que identifica o tipo de negócio que está sendo configurado e as características que governarão o comportamento de suas apólices.

A definição inclui, segundo a explicação:

- chave do ramo;
- nome;
- descrição ou nome visível nas telas, embora a transcrição esteja pouco clara nesse ponto;
- propriedades funcionais;
- tratamento do ramo;
- parametrizações necessárias para apólices, riscos, coberturas e operações.

A evidência do portal descreve “RAMO” como configuração das características gerais das apólices, incluindo dias ou ano, coletivos, cláusulas e tipo de apólice temporal [21:20].

## 4.2 Modelo lógico consolidado

A seguir está uma reconstrução analítica do modelo descrito na reunião. Não foi exibido como diagrama literal.

```text
Linha de negócio / Tratamento do ramo
        ↓
Definição de ramo
        ↓
Propriedades de comportamento
        ├── Emissão e orçamentos
        ├── Apólices e riscos
        ├── Coberturas e modalidades
        ├── Suplementos
        ├── Numeração
        ├── Documentos, cláusulas e anexos
        ├── Transporte
        ├── Cosseguro
        ├── Resseguro
        ├── Sinistros
        └── Prêmios e coeficientes
        ↓
Fluxo único de emissão configurado para cada produto
```

## 4.3 Relação de causa e efeito identificada

```text
Diversidade de produtos e linhas de negócio
        ↓
Necessidade de comportamentos distintos na emissão
        ↓
Uso de uma emissão única, sem processos totalmente independentes por ramo
        ↓
Parametrização do ramo e de seus elementos associados
        ↓
Fluxo, dados, controles e cálculos adaptados ao produto configurado
```

Essa relação é uma reorganização explicativa das falas, não uma citação literal.

---

## 5. Arquitetura funcional e funcionamento apresentado

## 5.1 Organização por camadas de definição

A reunião diferenciou vários níveis de configuração.

### Definições comuns

São definições que podem afetar a emissão, mas não pertencem exclusivamente ao módulo de emissão ou a um ramo específico. Foram citados, de forma pouco clara na transcrição, possíveis elementos relacionados a terceiros, contabilidade e outras áreas.

A apresentação sugere que essas definições são reutilizáveis ou transversais.

### Definição de ramo

Determina a estrutura do ramo, o que poderá ser feito com ele, quais definições serão necessárias e parte do fluxo de emissão.

### Definições de apólice

São específicas do comportamento do processo de emissão e afetam a apólice como um todo, bem como todos os riscos nela contidos.

### Definições de risco

Afetam exclusivamente cada risco da apólice. As configurações aplicadas nesse nível não seriam propagadas indiscriminadamente a todos os riscos, mas incidiriam sobre o risco emitido ou alterado.

### Definições específicas de linha de negócio

Para automóveis, por exemplo, a apresentação mencionou:

- dados do risco, como tipo de veículo;
- catálogos;
- categorias;
- tipos de tração;
- modelos;
- marcas;
- acessórios;
- definições de cobertura.

A lógica descrita é que parte da estrutura é comum, enquanto os componentes específicos variam conforme o tratamento do ramo.

---

## 6. Componentes e propriedades mencionados

## 6.1 Identificação básica do ramo

O ramo possui uma chave para identificação e um nome. A transcrição também menciona outro campo associado à apresentação do ramo nas telas, mas sua denominação não foi reconhecida com clareza.

A documentação visual confirma que o ramo possui propriedades gerais e operacionais comuns [24:52].

## 6.2 Multirriscos

A propriedade “Multi riesgo” informa ao Reef.core se o ramo permite a contratação de mais de um objeto segurado na mesma apólice [24:52].

Segundo a explicação:

- se o ramo não permitir múltiplos riscos, uma apólice contém um único risco;
- para assegurar diversos automóveis, por exemplo, seriam necessárias apólices separadas;
- se o ramo for multirriscos, vários riscos podem constar da mesma apólice.

## 6.3 Identificador do objeto segurado

Essa propriedade define como os objetos segurados serão descritos e nomeados dentro das apólices.

A documentação visual informa que seu objetivo é facilitar a identificação unívoca dos riscos nos diferentes módulos do sistema e que é necessário desenvolver uma lógica de negócio para obter esse nome nos processos de emissão [24:52].

A apresentadora explicou que o nome normalmente é recuperado de dados variáveis do risco.

**Limite identificado:** a reunião não detalha como essa lógica é implementada, em qual tecnologia, nem quais regras de negócio concretas são usadas.

## 6.4 Multiperíodos

A temporalidade de uma apólice pode ser de:

- um ano;
- menos de um ano;
- mais de um ano.

Para apólices com duração superior a um ano, a configuração define se cada anualidade será tratada como período independente.

| Configuração | Comportamento descrito |
|---|---|
| Multi períodos: Sim | Cada anualidade é tratada como um período. A apólice terá tantos períodos quanto anualidades. |
| Multi períodos: Não | As anualidades são agrupadas e tratadas como um único período. |

[24:52]

## 6.5 Registro obrigatório de hora e minutos

Quando ativada, a propriedade exige a captura de hora e minuto na data de efeito da apólice ou suplemento.

A finalidade apresentada foi permitir validar se um sinistro ocorrido no mesmo dia da vigência aconteceu antes ou depois da contratação. A apresentadora citou também a possibilidade de controle de fraude como exemplo de motivação.

A documentação visual confirma que a captura é obrigatória quando a propriedade está ativa [24:52].

## 6.6 Respeito ao dia de vencimento

Essa propriedade se aplica à renovação de apólices temporais que renovam pela mesma temporalidade do período vigente.

Quando ativa, o sistema deve manter o dia de vencimento do período vigente no cálculo da nova vigência. A apresentadora deu como exemplo um cálculo que levaria ao dia 30, mas que deve ser ajustado para o dia 31 se o período anterior venceu no dia 31.

[24:52]

## 6.7 Cláusulas

A ativação da propriedade de cláusulas indica que apólices, objetos segurados ou coberturas podem ter cláusulas associadas.

A documentação define cláusulas como elementos que modificam e individualizam o contrato de seguro, limitando ou ajustando as condições gerais ou particulares [24:52].

## 6.8 Anexos

Foram mencionadas propriedades relacionadas a anexos:

- anexos livres;
- anexos por objeto segurado;
- arraste de anexos a partir de orçamento;
- anexos em vários idiomas;
- anexos predefinidos.

### Anexos livres

Permitem incluir texto livre na apólice.

### Anexos por objeto segurado

Permitem que anexos sejam incluídos não apenas na apólice, mas também em cada risco.

### Arraste de anexos desde o orçamento

Quando uma apólice é emitida a partir de orçamento e há anexos no orçamento, a configuração determina se esses anexos serão levados para a apólice.

### Anexos em vários idiomas

Como o anexo pode ser texto livre digitado diretamente na apólice, a propriedade permite registrar o mesmo conteúdo em mais de um idioma, possivelmente para fins de impressão ou comunicação ao cliente.

### Anexos predefinidos

A explicação indica que o sistema pode disponibilizar um texto previamente definido. O texto é recuperado na apólice e pode ser modificado.

A transcrição contém trechos com reconhecimento imperfeito nessa parte. A interpretação acima segue o sentido geral exposto, mas alguns nomes de propriedades podem estar incompletos ou deformados.

## 6.9 Emissão obrigatória de orçamento

A propriedade determina se a apólice pode ser emitida diretamente ou se deve obrigatoriamente decorrer de um orçamento.

| Configuração | Comportamento |
|---|---|
| Obrigatória | Não permite emissão direta de apólice; é necessário emitir primeiro um orçamento e, depois, a apólice. |
| Não obrigatória | A apólice pode ser emitida diretamente. |

## 6.10 Reutilização de orçamento

A propriedade define se um mesmo orçamento pode ser usado para emitir várias apólices.

A documentação visual ilustra os dois comportamentos [28:24]:

| Configuração | Exemplo apresentado |
|---|---|
| Reutilização permitida | Um orçamento, como `PPTO-1`, pode originar várias apólices, como `POL-1`, `POL-2` e `POL-3`. |
| Reutilização não permitida | Cada orçamento origina apenas uma apólice. |

## 6.11 Autorização obrigatória de orçamento

Quando um orçamento fica pendente de auditoria em razão de alguma validação de controle técnico, a configuração determina se a autorização é necessária antes da conversão em apólice.

| Configuração | Efeito |
|---|---|
| Obrigatória | Não é possível emitir a apólice até que alguém autorize o orçamento retido. |
| Não obrigatória | A apólice pode ser emitida mesmo que o orçamento ainda não esteja autorizado. |

A apresentadora observou que controles técnicos podem voltar a ser aplicados na própria apólice e exigir autorização nesse momento.

[28:24]

## 6.12 Retomada de movimento suspenso

A emissão de uma apólice ou de outro movimento pode ser suspensa, mantendo os dados já informados para retomada posterior.

A propriedade “Póliza a disposición de cualquier usuario” define quem pode retomar o movimento:

| Configuração | Quem retoma |
|---|---|
| Ativa | Qualquer usuário com a função necessária. |
| Inativa | Apenas o usuário que suspendeu o movimento. |

[28:24]

## 6.13 Controles técnicos em anulação de suplementos

A documentação visual informa que, naturalmente, controles técnicos não são executados em movimentos sem ação do usuário, como ocorre em determinada anulação de suplemento [28:24].

A apresentadora explicou que, em uma anulação de suplemento, o usuário não altera dados: a operação anula a situação gerada anteriormente. Ainda assim, foi solicitado que os controles técnicos fossem avaliados nesse cenário, e a propriedade existe para permitir essa execução.

## 6.14 Alteração de numeração de apólice

A propriedade permite adaptar a numeração de apólices a necessidades locais, especialmente quando se exige sequência sem saltos.

A explicação não permite determinar:

- o mecanismo interno de reserva ou liberação de números;
- se a renumeração ocorre em tempo real;
- se a numeração anterior fica auditável;
- quais países usam essa funcionalidade.

## 6.15 Captura de motivo de suplemento

A sessão mencionou uma propriedade para capturar um ou vários motivos pelos quais um suplemento é emitido.

Os motivos são tipificados. A companhia pode decidir se permite apenas um motivo ou vários motivos para identificar a razão da alteração.

## 6.16 Registro de mudança no plano de pagamentos

Foi apresentada uma configuração para registrar a alteração do plano de pagamentos como suplemento.

A explicação indica que uma mudança de plano de pagamento pode refinanciar uma dívida sem necessariamente alterar a apólice. Em alguns países, foi solicitada a representação dessa alteração como um suplemento nominativo que não altera prêmio.

A lógica associada pode avaliar condições da apólice para determinar se a marca se aplica.

## 6.17 Alteração do plano de pagamento em suplementos

Além de existir suplemento específico para modificação de plano de pagamento, foi apresentada uma propriedade para permitir que um suplemento comum tenha plano de pagamento próprio.

A regra explicada foi:

- o plano de pagamento definido para o suplemento aplica-se ao valor gerado por esse suplemento;
- os recibos anteriores não são regenerados;
- o suplemento pode gerar seus próprios recibos segundo um plano diferente.

### Exemplo apresentado

| Elemento | Valor/condição citada |
|---|---|
| Apólice original | Plano de pagamento com duas parcelas |
| Suplemento seguinte | Valor de 600, distribuído em quatro parcelas |
| Outro suplemento | Valor de 300, distribuído em duas parcelas |

A finalidade do exemplo foi demonstrar que cada suplemento pode gerar recebíveis próprios sem reconfigurar os recibos anteriores.

## 6.18 Formação de modalidades

A configuração de modalidade define como as coberturas serão agrupadas ou identificadas na emissão.

Foram citadas três possibilidades.

| Tipo de modalidade | Funcionamento descrito |
|---|---|
| Explícita | Há um dado ou chave concreta de modalidade, informado pelo usuário, que determina as coberturas. |
| Implícita | Não há uma chave explícita de modalidade. A combinação de diversos dados variáveis forma os grupos de cobertura. |
| Avaliação unitária | Os atributos são avaliados separadamente para compor as coberturas aplicáveis. |

A apresentadora exemplificou uma modalidade implícita com atributos como tipo de cliente e condição de imóvel alugado. O sistema poderia avaliar uma condição, obter certas coberturas, avaliar outra condição e obter coberturas adicionais.

## 6.19 Imagens do ramo

“Imagem” foi descrita como uma forma de identificar diferentes modificações realizadas no ramo ao longo do tempo.

A propriedade define qual data será usada para selecionar a imagem aplicável em um suplemento:

- data do sistema;
- data de efeito do suplemento;
- data de efeito da apólice.

A lógica descrita é que o sistema busca uma imagem cuja data seja menor ou igual à data de referência escolhida.

| Critério | Data usada para determinar a imagem |
|---|---|
| Data do sistema | Data atual da emissão |
| Data de efeito do suplemento | Data de efeito do suplemento emitido |
| Data de efeito da apólice | Data de efeito original da apólice |

## 6.20 Tratamento do ramo

A propriedade “Tratamiento” identifica o tipo de ramo ou linha de negócio. Foram mencionados:

- gerais/diversos;
- automóveis;
- transportes;
- vida.

A apresentadora afirmou que esse tratamento influencia como a emissão se comporta e quais elementos estarão disponíveis. Mencionou que lógica semelhante seria vista posteriormente para sinistros e contabilidade.

## 6.21 Caução

Foi citada a possibilidade de permitir ramos de caução.

A explicação sobre o conceito foi breve e parcialmente comprometida pela transcrição automática. Não há detalhes suficientes para documentar regras operacionais, participantes ou fluxos de caução.

## 6.22 Associação de inspeção na emissão

Em determinados produtos ou coberturas, um risco pode exigir inspeção.

A propriedade apresentada permite que, durante a emissão, o sistema busque inspeção existente para associá-la à apólice. A busca pode ser feita:

- por dados variáveis;
- por lógica de negócio.

Também foi mencionada uma lógica de exclusão de inspeção: mesmo quando o ramo ou cobertura normalmente exige inspeção, uma lógica pode determinar que determinado risco, dadas certas condições, esteja dispensado.

---

## 7. Transporte: apólice marco, aplicações e declarações prévias

## 7.1 Modelo de apólice marco

O ramo de transportes foi apresentado como um caso especial.

A empresa contratante pode celebrar uma apólice anual que estabelece condições gerais, como:

- limite máximo do valor da mercadoria;
- tipo de mercadoria transportada;
- tipo de veículo utilizado;
- outras condições contratuais.

Essa apólice é chamada de **apólice marco**.

A apólice marco não assegura, por si só, um transporte concreto. Ela estabelece o quadro contratual dentro do qual operações específicas serão declaradas.

## 7.2 Aplicações

As aplicações são utilizadas para declarar operações concretas — no exemplo, viagens de transporte de mercadorias.

Exemplo narrado:

```text
Empresa de transporte
        ↓
Contrato anual com condições gerais
        ↓
Apólice marco
        ↓
Declaração de viagem concreta:
origem, destino, datas, mercadoria e características
        ↓
Aplicação
        ↓
Registro de sinistro, se houver
```

A apresentadora enfatizou que, quando ocorre um sinistro, ele é registrado sobre a aplicação, e não sobre a apólice marco.

As aplicações foram descritas como semelhantes a “pequenas apólices”, pois possuem duração própria — por exemplo, a duração da viagem assegurada.

## 7.3 Declarações prévias

As declarações prévias equivalem, conceitualmente, a orçamentos da aplicação. Elas precisam estar associadas a uma apólice marco, pois as características da operação estão submetidas às condições definidas nessa apólice.

## 7.4 Reutilização de declaração prévia

A propriedade determina se uma declaração pode ser usada como modelo para emitir várias aplicações da mesma apólice marco.

| Configuração | Funcionamento |
|---|---|
| Reutilização permitida | Uma declaração pode ser usada para gerar várias aplicações dentro da mesma apólice marco. |
| Reutilização não permitida | Cada aplicação exige sua própria declaração. |

A apresentadora comparou explicitamente essa lógica à reutilização de orçamento para emissão de várias apólices.

## 7.5 Numeração em aplicações

A alteração de numeração de apólice em aplicações só se aplica a ramos de transporte e depende de a configuração principal de alteração de numeração de apólice estar habilitada.

Na explicação:

- os elementos de identificação de um movimento incluem número da apólice e número do suplemento;
- em transporte, incluem também número da aplicação e número do suplemento da aplicação;
- suplementos e aplicações usam números consecutivos;
- o número de apólice é formado por elementos configurados, como ramo, rede comercial — termo reconhecido com incerteza — e consecutivo.

## 7.6 Conversão de aplicação em apólice

Quando se fala em “mudar a numeração de apólice em aplicações”, não se trata apenas de alterar o número de uma aplicação. A aplicação passa a ser tratada como apólice de transporte fixa.

Essa apólice:

- mantém a duração da aplicação;
- preserva os dados da aplicação;
- passa a ser independente;
- não renova;
- não permite novas aplicações.

A apresentadora informou que essa necessidade foi solicitada por algum país, mas não recordava qual.

---

## 8. Cosseguro

## 8.1 Conceito apresentado

O cosseguro ocorre quando várias companhias participam do seguro de uma apólice, e o cliente tem conhecimento dessa participação.

Há uma companhia líder, responsável por gerir a apólice, os sinistros e, segundo a explicação, a cobrança de recibos. A líder se relaciona com as demais participantes para tratar valores decorrentes de recebimentos, sinistros e outros elementos do acordo.

## 8.2 Cosseguro cedido e aceito

Na explicação apresentada:

| Situação da MAPFRE | Classificação mencionada |
|---|---|
| MAPFRE é líder da apólice | Cosseguro cedido |
| Outra companhia é líder e MAPFRE participa | Cosseguro aceito |

Essa nomenclatura foi explicada oralmente e deve ser entendida dentro da terminologia usada na sessão.

## 8.3 Modalidades configuráveis

| Configuração | Comportamento descrito |
|---|---|
| Isento | Não permite emitir apólices com cosseguro. |
| Somente cedido | Permite cosseguro apenas quando a MAPFRE é líder. |
| Somente aceito | A MAPFRE não pode ser líder; participa em apólice liderada por outra companhia. |
| Cedido e aceito | A modalidade é definida na emissão, conforme a apólice e o papel da MAPFRE. Também pode haver apólice sem cosseguro. |

## 8.4 Quadro de cosseguro obrigatório

O quadro de cosseguro pode registrar previamente:

- companhias participantes;
- percentuais de participação;
- comissões;
- eventual repartição de despesas da companhia líder.

A configuração determina se o quadro deve existir obrigatoriamente antes da emissão.

| Configuração | Consequência |
|---|---|
| Quadro obrigatório | As condições não podem ser definidas livremente apenas na emissão; é necessário ter um quadro prévio. |
| Quadro não obrigatório | A explicação sugere que as condições podem ser definidas na própria apólice, conforme a negociação. |

## 8.5 Comissão de cosseguro externa

A propriedade determina se as comissões de cosseguro serão calculadas ou definidas dentro do ramo/Reef.core ou por processo externo.

A apresentadora explicou que, quando um processo externo determina os valores, não seria necessário definir no ramo os conceitos usados para cálculo dessas comissões. O processo externo identificaria o montante a enviar ou receber de cada companhia.

**Limite:** não foram informados o sistema externo, os contratos, a periodicidade, as interfaces ou os critérios de cálculo.

---

## 9. Resseguro

## 9.1 Conceito apresentado

O resseguro foi explicado de maneira simplificada como o mecanismo pelo qual uma companhia assegura outra companhia de seguros em relação a riscos assumidos.

A apresentadora observou que nem todas as empresas podem atuar como resseguradoras. Mencionou uma distinção entre entidades MAPFRE de seguro direto e uma entidade MAPFRE de resseguro, mas a transcrição não permite afirmar com precisão os nomes societários, jurídicos ou operacionais dessas entidades.

## 9.2 Modalidades mencionadas

A configuração do ramo pode restringir ou permitir diferentes tipos de apólice relacionados a resseguro.

| Modalidade | Descrição apresentada |
|---|---|
| Somente seguro direto | A MAPFRE não atua como resseguradora no ramo. Isso não impede, segundo a explicação, que outra companhia ressegure a MAPFRE. |
| Resseguro aceito com contrato | As participantes possuem contrato prévio contendo capacidades e demais informações de resseguro. |
| Resseguro facultativo | O resseguro é definido especificamente por apólice, de forma semelhante à definição manual de participação no cosseguro. |
| Direto e aceito | Permite emitir apólices de seguro direto e apólices de resseguro aceito, por contrato ou facultativo. |

A apresentadora observou que, em sessão futura sobre resseguro, seria explicado que contrato e facultativo podem ser combinados. Esse aprofundamento não ocorreu nesta reunião.

## 9.3 Colocação de resseguro em sistema externo

A reunião indicou que o Reef.core possui módulo próprio de resseguro, com operações necessárias para sua gestão.

Também foi citado um sistema externo identificado como:

- “R21”;
- “Reventu uno”;
- possivelmente outra forma fonética do mesmo nome.

A equivalência exata entre esses nomes não pode ser determinada com segurança a partir do material fornecido.

A propriedade de colocação de resseguro em sistema externo define se o país utiliza o módulo do Reef.core ou o sistema externo.

A apresentadora afirmou que a direção corporativa tenderia a usar a solução externa, mas também deixou claro que nem todos os países estavam nela naquele momento.

## 9.4 Integração Reef.core ↔ sistema externo de resseguro

O modelo relatado pode ser reconstruído assim:

```text
Emissão no Reef.core
        ↓
Cálculos e definições ainda existentes, ao menos em parte
        ↓
Envio de informações ao sistema externo
        ↓
Gestão da parte de resseguro pelo sistema externo
        ↓
Retorno ou alimentação de informações para relatórios e outros usos
```

Essa representação é analítica. A reunião não apresentou protocolo, API, mensageria, formato de arquivo, frequência, tratamento de erros técnico ou modelo de dados.

## 9.5 Controles técnicos de integração

Foram citadas propriedades para criar controle técnico quando:

- não há comunicação com o sistema externo de resseguro;
- não é possível enviar dados;
- ocorre algum erro na integração.

A mesma ideia foi mencionada para sinistros.

## 9.6 Momento de colocação do resseguro

A configuração também determina se o processo de emissão:

- envia online as informações para colocação de resseguro;
- ou deixa o envio para um processo posterior.

A reunião não detalhou como esse processo posterior é acionado, sua periodicidade ou responsabilidade operacional.

---

## 10. Modelo operacional relatado: caso Chile

Durante a pergunta sobre a integração externa de resseguro, uma participante relatou um cenário do Chile.

Segundo esse relato:

- o Chile possui “Trongo/Tronco”, termo registrado com incerteza pela transcrição;
- os resseguros são tratados no sistema externo mencionado;
- todas as apólices são enviadas ao sistema externo, independentemente de serem classificadas como resseguro retido ou cedido;
- ao fim do mês, e possivelmente em outros ciclos mencionados de forma pouco clara, o sistema externo alimenta determinadas informações;
- essas informações são usadas para continuidade de relatórios;
- no sistema local citado não haveria, em termos estritos, resseguro operacional completo;
- uma tabela de contabilização identificada como “2.570” seria atualizada, enquanto outros elementos permaneceriam no sistema externo.

A participante também mencionou que estavam ativando a colocação para tabelas e que o cálculo interno em “Tronco” já estaria obsoleto. Esse trecho contém vários termos sujeitos a ruído de reconhecimento de voz; deve ser usado com cautela.

A apresentadora respondeu que:

- a ativação da integração externa não desativa completamente tudo relacionado ao resseguro no Reef.core;
- cálculos e alguns aspectos continuam existindo no sistema;
- informações são enviadas ao sistema externo, que realiza a gestão do resseguro;
- ela não poderia afirmar até que ponto as definições permanecem no Reef.core, pois não era responsável pela área de resseguro;
- acreditava que a propriedade pode ter sido introduzida aproximadamente no período em que o cenário citado começou a ser implantado, mas não tinha certeza.

---

## 11. Validações de sinistros na emissão

As propriedades relacionadas a sinistros não definem como o módulo de sinistros funciona. Elas definem como a emissão reage à existência de sinistros quando se tenta emitir um suplemento.

Foram citados dois grupos de validação:

- sinistros pendentes;
- sinistros terminados.

Para ambos, a configuração permite:

1. validar se há sinistros na data relevante do suplemento;
2. apenas mostrar um aviso;
3. impedir a continuidade da emissão do suplemento.

| Tipo de validação | Possível comportamento |
|---|---|
| Sinistro pendente | Verifica existência de sinistro pendente na data do suplemento. |
| Sinistro terminado | Verifica existência de sinistro terminado na data do suplemento. |
| Aviso | Informa ao emissor, sem necessariamente impedir continuidade. |
| Bloqueio | Não permite continuar ou emitir o suplemento. |

A reunião não detalha:

- critérios para classificar sinistro como pendente ou terminado;
- quais datas de sinistro são consideradas;
- se a regra varia por cobertura, risco ou apólice;
- como o bloqueio é autorizado ou contornado.

---

## 12. Prêmios, pró-rata, escalas e coeficientes

## 12.1 Princípio de anualização

Segundo a apresentação, o Reef.core trabalha com períodos, prêmios e informações econômicas anualizados.

Quando uma apólice ou movimento tem duração diferente de um ano, o sistema precisa calcular o valor correspondente à vigência efetiva.

## 12.2 Cálculo pró-rata

No cálculo pró-rata, o prêmio é proporcional ao tempo de vigência.

### Exemplos apresentados

| Vigência | Proporção citada | Prêmio anual de referência | Resultado |
|---|---:|---:|---:|
| 180 dias | 50% | 1.000 | 500 |
| 90 dias | 25% | 1.000 | 250 |

A apresentadora usou esses exemplos como simplificação didática.

## 12.3 Cálculo por escala

No cálculo por escala, a companhia define percentuais específicos para cada quantidade de dias. Não se trata de simples proporcionalidade temporal.

### Exemplos apresentados

| Vigência | Percentual proporcional | Percentual de escala citado |
|---|---:|---:|
| 90 dias | 25% | 35% |
| 180 dias | 50% | 60% |

Assim, um prêmio anual de referência pode gerar valor diferente do cálculo pró-rata, mesmo para a mesma quantidade de dias.

A apresentadora ressaltou que a escala deve ser definida especificamente por quantidade de dias; não seria, conforme a fala, uma definição genérica por faixa como “de 1 a 15 dias”.

## 12.4 Alteração do critério no momento da emissão

A propriedade de alteração permite definir se o critério padrão — pró-rata ou escala — pode ser mudado no momento de emissão de movimento temporário.

| Configuração inicial | Alteração permitida? | Consequência |
|---|---|---|
| Pró-rata | Não | Todos os movimentos temporários do ramo são calculados pró-rata. |
| Pró-rata | Sim | O padrão é pró-rata, mas um movimento pode usar escala. |
| Escala | Não | Todos os movimentos temporários usam escala. |
| Escala | Sim | O padrão é escala, mas pode haver alteração conforme o movimento. |

## 12.5 Lógica de negócio para coeficiente

O sistema converte o cálculo aplicável em um coeficiente. A apresentadora descreveu exemplos como:

- 50% → coeficiente 0,5;
- 25% → coeficiente 0,25.

Uma lógica de negócio pode alterar esse coeficiente conforme condições determinadas. A lógica foi descrita informalmente como um “programita”, isto é, uma implementação específica que avalia condições e retorna outro coeficiente.

Exemplo citado: para determinado suplemento, independentemente de sua duração, a companhia pode desejar cobrar o valor anual completo. Nesse caso, a lógica retornaria coeficiente 1.

## 12.6 Baixa de risco

Quando ocorre baixa de risco, a propriedade pode fazer com que o cálculo não siga o comportamento normal de emissão.

Em vez disso, pode usar:

- escala;
- coeficiente de anulação;
- lógica de negócio específica;
- outro critério equivalente ao usado para anulação de apólice.

A finalidade é calcular a baixa de risco como se fosse uma anulação, quando essa for a regra desejada.

---

## 13. Perguntas e respostas

## 13.1 Pergunta: integração externa desativa completamente a colocação manual de resseguro no Reef.core?

### Pergunta

Uma participante perguntou se a propriedade de colocação de resseguro em sistema externo desativa completamente a colocação manual de resseguro no Reef.core.

### Resposta

A apresentadora respondeu que não completamente.

Segundo ela:

- cálculos e outros elementos continuam no Reef.core;
- as informações são enviadas ao sistema externo;
- o sistema externo passa a gerir a parte de resseguro;
- as definições ainda precisariam permanecer no Reef.core em algum nível, mas ela não soube precisar até onde;
- a área de resseguro não era sua especialidade direta.

### O que essa resposta esclarece

A resposta esclarece que a ativação do sistema externo não equivale necessariamente a remover todo o domínio de resseguro do Reef.core. O modelo apresentado parece ser de integração e delegação operacional parcial, e não de eliminação completa da responsabilidade do sistema de origem.

Essa é uma interpretação prudente do diálogo. A reunião não fornece uma fronteira funcional completa entre Reef.core e o sistema externo.

## 13.2 Relato complementar: cenário Chile

### Pergunta ou contribuição

A participante descreveu o uso do sistema externo no Chile e perguntou se a parametrização vista poderia estar relacionada a uma versão posterior à utilizada localmente.

### Resposta

A apresentadora disse acreditar que a propriedade foi introduzida aproximadamente no período de início da implementação mencionada, mas declarou não ter certeza.

### O que essa resposta esclarece

O diálogo revela que a disponibilidade ou uso da propriedade pode variar conforme país e versão. Contudo, a reunião não confirma versões, datas de implantação ou matriz de disponibilidade por país.

---

## 14. Números e indicadores citados

| Indicador | Valor mencionado | Contexto |
|---|---:|---|
| Participantes da reunião | 46 | Exibidos no Teams [17:47]. |
| Duração registrada no frame | 18:33 | Duração exibida naquele momento da reunião [17:47]. |
| Apólices por orçamento, com reutilização | Várias | Um orçamento pode originar múltiplas apólices [28:24]. |
| Prêmio anual de exemplo | 1.000 | Usado para ilustrar cálculos pró-rata e por escala. |
| Vigência de exemplo | 180 dias | Equivalente a 50% no exemplo pró-rata. |
| Vigência de exemplo | 90 dias | Equivalente a 25% no exemplo pró-rata. |
| Escala de exemplo para 180 dias | 60% | Comparada com 50% do pró-rata. |
| Escala de exemplo para 90 dias | 35% | Comparada com 25% do pró-rata. |
| Parcelas da apólice original no exemplo | 2 | Exemplo de plano de pagamentos. |
| Valor de suplemento no exemplo | 600 | Distribuído em quatro parcelas. |
| Parcelas do suplemento de 600 | 4 | Exemplo de plano de pagamento específico. |
| Valor de outro suplemento | 300 | Exemplo adicional. |
| Parcelas do suplemento de 300 | 2 | Exemplo adicional. |
| Tabela mencionada no relato Chile | 2.570 | Referência reconhecida com incerteza na transcrição. |

> Os números acima foram declarados ou exibidos durante a sessão e não foram auditados externamente.

---

## 15. Limitações reconhecidas

## 15.1 Limitações explicitamente reconhecidas pela apresentadora

- A apresentadora declarou não ser responsável pela área de resseguro.
- Ela não soube informar exatamente até que ponto definições de resseguro permanecem no Reef.core quando há sistema externo.
- Não tinha certeza sobre o momento exato em que a propriedade de integração externa foi introduzida.
- Não recordava qual país solicitou a conversão de aplicação de transporte em apólice.
- Alguns assuntos foram deliberadamente adiados para sessões futuras, especialmente detalhes de resseguro, operações e outros módulos.

## 15.2 Limitações decorrentes da transcrição

A transcrição automática contém vários termos potencialmente deformados, entre eles:

- “RIF”, “RIFCORE”, possivelmente Reef.core;
- “tron/tronco”, termo não confirmado;
- “Reventu uno”, possivelmente relacionado ao sistema externo “R21”;
- “polisomarco”, interpretado como apólice marco;
- “cine”, interpretado como sinistro em um exemplo;
- nomes de tabelas, versões e termos locais do relato do Chile.

Esses termos foram preservados ou explicados com ressalvas, sem correção categórica quando não há evidência suficiente.

---

## 16. Riscos e desafios

## 16.1 Riscos explicitamente mencionados

| Risco ou situação | Tratamento apresentado |
|---|---|
| Sinistro no mesmo dia da emissão | Exigir hora e minuto para verificar se ocorreu antes ou depois do início de vigência. |
| Potencial fraude ou disputa sobre momento de emissão | Registro de horário de efeito como mecanismo de validação. |
| Orçamento retido por controle técnico | Exigir ou dispensar autorização antes da emissão de apólice. |
| Falha de comunicação com sistema externo de resseguro | Criar controle técnico específico. |
| Erro no envio ao sistema externo de resseguro | Criar controle técnico específico. |
| Suplemento com sinistro pendente ou terminado | Avisar ou bloquear emissão conforme configuração. |
| Quebra de sequência de numeração | Configuração de mudança de numeração para atender exigências locais. |
| Uso indevido ou mudança não controlada de movimento suspenso | Restringir retomada ao usuário original ou permitir a usuários com função adequada. |

## 16.2 Desafios derivados do contexto

As observações abaixo são interpretações analíticas, não afirmações literais dos participantes.

### Complexidade de parametrização

A quantidade de propriedades apresentadas indica um modelo altamente configurável. Isso tende a ampliar a capacidade de adequação a produtos e países, mas também pode tornar a governança de configuração mais exigente.

### Consistência entre países

A coexistência de módulo interno e sistema externo de resseguro, além de exigências locais de numeração e regras específicas, sugere o desafio de manter comportamento funcional coerente entre países com diferentes versões, soluções e parametrizações.

### Rastreabilidade de regras

Propriedades como imagens do ramo, lógicas de negócio, escalas, autorizações e controles técnicos indicam necessidade de forte rastreabilidade para entender por que determinado movimento foi emitido, bloqueado ou calculado de determinada forma.

### Dependência de conhecimento especializado

A própria apresentadora reconheceu limites de domínio em resseguro. Isso sugere que a correta operação e evolução da solução depende de colaboração entre especialistas de emissão, resseguro, sinistros, contabilidade e equipes locais.

---

## 17. Roadmap e próximos passos citados

A reunião não apresentou um roadmap estruturado com datas, responsáveis ou marcos de produto.

Foram mencionados os seguintes próximos passos:

| Item | Situação mencionada |
|---|---|
| Certificações pela universidade corporativa | Em elaboração. |
| Explicações operacionais mais detalhadas | Seriam vistas posteriormente, ao tratar operações. |
| Módulo de resseguro | Seria abordado em sessão futura. |
| Abertura de sinistros | Indicada como tema da próxima semana, embora a apresentadora tenha demonstrado incerteza sobre a data exata. |
| Próxima sessão de definição de ramo | Convocação seria enviada posteriormente. |
| Uso da solução externa de resseguro | Direção futura indicada como corporativa, mas ainda não adotada por todos os países. |

Não é possível determinar, a partir da reunião:

- data absoluta das próximas sessões;
- cronograma de migração dos países;
- prazo de adoção do sistema externo;
- versão alvo;
- responsáveis;
- critérios de sucesso.

---

## 18. Transformações identificadas

## 18.1 Transformação de processo para plataforma configurável

Uma leitura possível é que a solução busca substituir múltiplos fluxos isolados de emissão por um fluxo comum sustentado por parametrização de ramo.

```text
Processos específicos por produto
        ↓
Fluxo comum de emissão
        ↓
Configuração de ramo, apólice, risco e cobertura
        ↓
Comportamento especializado por linha de negócio
```

Essa interpretação é sustentada pela afirmação de que a emissão é única e pelas propriedades descritas, mas não foi formalizada dessa maneira na reunião.

## 18.2 Transformação de regras fixas para regras governadas por configuração

A reunião apresentou diversas decisões que podem ser controladas sem que tenham sido descritas como alteração de código padrão:

- obrigatoriedade de orçamento;
- reutilização de orçamento ou declaração;
- autorização;
- retomada de movimentos;
- cosseguro;
- resseguro;
- modalidade;
- cálculo de prêmio;
- controles de sinistros;
- seleção de imagem do ramo.

Isso sugere uma direção de governança por parametrização. A sessão não detalha como alterações são aprovadas, auditadas, versionadas ou implantadas.

## 18.3 Integração gradual de domínio especializado externo

A coexistência entre módulo de resseguro do Reef.core e sistema externo sugere uma arquitetura em transição ou convivência.

A direção corporativa mencionada parece apontar para maior uso da solução externa, mas a reunião deixa claro que a adoção não é uniforme entre países e que certos cálculos ou definições continuam no ambiente de origem.

---

## 19. O que a reunião não permite concluir

A sessão não fornece elementos suficientes para concluir, com segurança:

### Arquitetura técnica

- tecnologia de implementação do Reef.core;
- linguagem de programação;
- framework;
- banco de dados;
- infraestrutura de cloud ou on-premises;
- uso de contêineres, Kubernetes ou orquestração;
- modelo de APIs;
- mensageria;
- formato de integração com o sistema externo de resseguro;
- protocolo de transporte;
- sincronismo, frequência ou latência das integrações;
- mecanismo de retentativa para falhas;
- estratégia de idempotência;
- estratégia de observabilidade.

### Segurança e identidade

- modelo de autenticação;
- IAM;
- perfis e permissões detalhados;
- segregação de funções;
- criptografia;
- retenção de dados;
- auditoria;
- proteção de dados pessoais;
- gestão de acessos entre países.

### Operação e qualidade

- SLA;
- RTO/RPO;
- contingência;
- disaster recovery;
- monitoramento;
- gestão de incidentes;
- processo de release;
- CI/CD;
- testes automatizados;
- estratégia de homologação;
- gestão de versões de parametrizações;
- processo de rollback.

### Governança

- responsáveis por cada módulo;
- processo de aprovação de propriedades;
- ownership do sistema externo de resseguro;
- modelo de custos;
- FinOps;
- critérios formais de adoção por país;
- calendário de migração;
- indicadores de resultado.

### Regras de negócio específicas

- lista completa de ramos disponíveis;
- regras exatas de cálculo de prêmios;
- regras de seleção de modalidades;
- catálogo de controles técnicos;
- critérios de sinistro pendente ou terminado;
- parâmetros concretos de cosseguro e resseguro;
- comportamento completo de aplicações de transporte;
- regras de documentação, impressão ou idiomas;
- definição exata dos termos “Tronco”, “R21” e “Reventu uno”.

---

## 20. Conclusões principais

1. **A definição de ramo é o principal mecanismo funcional de especialização da emissão.** Ela determina comportamentos, dados, fluxos, controles e regras aplicáveis às apólices.

2. **O Reef.core foi apresentado como plataforma de emissão comum para várias linhas de negócio.** Automóveis, vida, transportes e outros tratamentos compartilham uma base de emissão, diferenciando-se por parametrização.

3. **A configuração não se limita à emissão inicial.** Ela também alcança orçamentos, suplementos, numeração, retomada de movimentos, anexos, modalidades, inspeções, sinistros, prêmios, cosseguro e resseguro.

4. **Transportes possui modelo funcional particular.** A combinação de apólice marco, declarações e aplicações permite representar contratos gerais e operações concretas, como viagens.

5. **Cosseguro e resseguro são tratados como capacidades configuráveis por ramo.** A plataforma permite restringir modalidades, definir exigência de quadros prévios e determinar se cálculos ou gestão ocorrem interna ou externamente.

6. **A integração externa de resseguro é relevante, mas não está completamente detalhada.** A sessão indica que o Reef.core continua participando de cálculos e definições, enquanto a gestão especializada pode ocorrer em sistema externo.

7. **As propriedades de cálculo permitem adequação a regras comerciais e locais.** O sistema suporta pró-rata, escala, alteração por movimento e lógicas específicas de coeficiente.

8. **A reunião reforça a importância de não extrapolar a documentação.** Muitos conceitos foram apresentados de forma funcional, sem detalhamento técnico, operacional ou de governança suficiente para assumir tecnologia, arquitetura física ou regras completas.
