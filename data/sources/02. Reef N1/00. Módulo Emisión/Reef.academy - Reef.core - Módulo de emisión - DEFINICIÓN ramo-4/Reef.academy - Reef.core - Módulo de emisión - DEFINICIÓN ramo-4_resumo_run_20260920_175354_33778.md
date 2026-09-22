# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.academy - Reef.core - Módulo de emisión - DEFINICIÓN ramo-4.mp4`
**Data de processamento:** 20/09/2026 17:57:18
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada — Configuração de ramos, emissão, inspeções, cosseguro e resseguro no RIF Core

## 1. Síntese executiva

A sessão é um treinamento funcional sobre parâmetros de definição de produtos ou ramos de seguros em uma plataforma identificada na transcrição principalmente como **RIF Core** — em alguns trechos, porém, aparece como “RIV”, possivelmente por erro de reconhecimento de voz. O foco é explicar como escolhas feitas na configuração de um ramo condicionam o comportamento operacional do sistema, especialmente durante a emissão de apólices.

Foram abordados tratamentos específicos para determinados ramos, como transporte, caução/crédito e Unit Linked; a gestão de documentos de entrada e saída; a associação de inspeções de risco à emissão; e mecanismos de retenção, suspensão e retomada de propostas ou apólices.

A maior parte da reunião aprofunda os modelos de **cosseguro** e **resseguro**. No cosseguro, diversas seguradoras participam diretamente de uma mesma operação, havendo uma seguradora líder e possíveis seguradoras aceitantes. No resseguro, a seguradora direta compartilha parte do risco com resseguradoras, normalmente de forma não visível ao cliente. A sessão explica papéis, dados operacionais, contratos, limites de capital, resseguro facultativo e a possibilidade de usar módulo interno ou externo para gerir o processo.

A mensagem central é que a definição de um ramo não é apenas cadastral: ela define quais fluxos serão habilitados, que controles técnicos poderão ocorrer, quais integrações serão necessárias e que informações serão exigidas no processo de emissão.

---

## 2. Contexto e antecedentes

A reunião ocorre em um contexto de treinamento sobre telas, cartões ou parâmetros de configuração de ramos de seguro. O instrutor percorre diversas propriedades e procura relacioná-las a efeitos práticos no ciclo de vida de uma apólice.

A ideia recorrente é a seguinte:

```text
Definição do ramo/produto
        ↓
Regras habilitadas no sistema
        ↓
Dados solicitados durante a emissão
        ↓
Controles técnicos e retenções possíveis
        ↓
Operação de apólices, documentos, inspeções, cosseguro e resseguro
```

O treinamento parece ser uma continuidade de sessões anteriores. Há referências a conteúdos já vistos, tais como:

- documentos de entrada e saída;
- processo de transporte;
- conceitos econômicos;
- terceiros e suas atividades;
- controle técnico;
- coberturas e capitais;
- dados de apólices;
- emissão online e batch.

Não é possível determinar, apenas pela transcrição, a estrutura completa do treinamento, a versão do produto, o país de implantação, nem quais parâmetros efetivamente seriam adotados pela organização dos participantes.

---

## 3. Problemas e necessidades funcionais discutidos

### 3.1. Necessidade de diferenciar comportamentos por ramo

A configuração do ramo precisa indicar se ele possui características específicas que alteram a emissão e a operação. Entre os exemplos mencionados estão:

- transporte;
- caução e crédito;
- Unit Linked;
- cosseguro;
- resseguro;
- inspeção de risco.

A consequência prática é que o sistema pode solicitar campos, aplicar regras, habilitar módulos ou impedir certos fluxos conforme a configuração escolhida.

### 3.2. Necessidade de controlar riscos antes ou durante a emissão

Determinados riscos não podem ser aceitos automaticamente sem avaliação prévia. O exemplo dado envolve:

- veículos usados, que podem precisar de inspeção;
- pessoas, em produtos de vida ou saúde, que podem demandar reconhecimento médico ou formulários;
- fábricas, cuja aceitação pode depender de aspectos como segurança e localização;
- imóveis ou outras exposições que podem exigir avaliação de risco.

O problema operacional é decidir se a inspeção deve existir antes da emissão ou se a emissão pode ficar retida enquanto a inspeção é realizada ou validada.

### 3.3. Necessidade de evitar perda de trabalho quando uma apólice é recusada parcialmente

O exemplo discutido é uma apólice retida por desconto superior a 15%. A pessoa responsável pelo controle entende que 15% não é aceitável, mas que 12% poderia ser aprovado.

Uma recusa definitiva eliminaria o registro e obrigaria o emissor a reiniciar ou perder o trabalho já realizado. Para esse cenário, a reunião apresenta o mecanismo de rejeição com suspensão: a apólice permanece recuperável para correção e posterior retomada.

### 3.4. Necessidade de distribuir riscos entre companhias

A reunião trata de dois mecanismos distintos:

- **cosseguro**, em que mais de uma seguradora participa diretamente de uma apólice;
- **resseguro**, em que a seguradora transfere parte do risco para resseguradoras.

A necessidade subjacente é não concentrar integralmente o risco em uma única companhia, especialmente em cenários de maior exposição ou de eventos potencialmente catastróficos.

### 3.5. Necessidade de padronizar distribuições recorrentes de cosseguro

Quando uma companhia líder cede frequentemente participações semelhantes às mesmas seguradoras, preencher manualmente os percentuais em cada emissão é considerado trabalhoso. Como resposta, o sistema permite criar “quadros de cosseguro”, isto é, distribuições pré-configuradas para reutilização.

### 3.6. Necessidade de controlar integrações externas de resseguro

Caso a gestão de resseguro seja delegada a um módulo externo, a emissão passa a depender de integração. Isso introduz riscos operacionais adicionais, como indisponibilidade de conexão, falha de comunicação ou queda de servidor.

---

## 4. Solução e modelo funcional apresentados

A solução apresentada é uma plataforma de seguros com parâmetros configuráveis por ramo. Esses parâmetros definem quais capacidades, regras e comportamentos estarão disponíveis durante a emissão e a operação das apólices.

De forma consolidada, o modelo explicado pode ser representado assim:

```text
Definição do ramo
    ├── Tratamentos específicos
    │   ├── Transporte
    │   ├── Caução e crédito
    │   └── Unit Linked
    │
    ├── Processos documentais
    │   ├── Documentos de entrada
    │   └── Documentos de saída / impressão
    │
    ├── Controles de emissão
    │   ├── Inspeção de risco
    │   ├── Controle técnico
    │   ├── Retenção
    │   └── Suspensão e retomada
    │
    ├── Compartilhamento de risco
    │   ├── Cosseguro
    │   └── Resseguro
    │
    └── Integrações
        ├── Módulo interno
        └── Sistemas externos via APIs
```

O instrutor enfatiza que nem todas as opções devem necessariamente ser usadas. Algumas telas ou parâmetros apresentados são declarados como obsoletos, e outras opções dependem da política operacional da seguradora.

---

## 5. Arquitetura e funcionamento lógico reconstruídos

> **Nota metodológica:** o desenho abaixo é uma consolidação analítica das explicações dadas na reunião. Não foi apresentado literalmente como diagrama técnico. A transcrição não informa protocolos, tecnologias de infraestrutura, banco de dados, mensageria ou mecanismos de autenticação.

```text
Usuário emissor / operação
        ↓
Processo de emissão de apólice
        ↓
Definição do ramo e regras configuradas
        ├── Validações e controles técnicos
        ├── Busca ou associação de inspeção
        ├── Gestão documental / impressão
        ├── Tratamento de transporte
        ├── Cosseguro
        └── Resseguro
                ↓
        Módulo interno de resseguro do RIF Core
                ou
        Módulo externo integrado por APIs
                ↓
        Seguradoras, cosseguradoras e resseguradoras
```

### 5.1. Fluxo de emissão com inspeção

```text
Emissão ou cotação
        ↓
Avaliação das características do risco
        ↓
O risco exige inspeção?
        ├── Não → segue o fluxo normal
        │
        └── Sim
             ├── Existe inspeção válida e aprovada?
             │     ├── Sim → apólice pode ser emitida
             │     └── Não → apólice fica retida
             │
             └── Em alguns modelos operacionais:
                   a inspeção é solicitada antes da emissão
```

### 5.2. Fluxo de cosseguro como companhia líder

```text
Seguradora líder emite a apólice ao cliente
        ↓
Define companhias participantes
        ↓
Informa os percentuais de participação
        ↓
Percentuais devem totalizar 100%
        ↓
Líder cobra o cliente e administra a apólice
        ↓
Repasse proporcional às companhias aceitantes
```

### 5.3. Fluxo de cosseguro como companhia aceitante

```text
Seguradora líder comunica a operação
        ↓
Companhia aceitante registra sua apólice
        ↓
Define-se a participação da aceitante no risco
        ↓
A aceitante possui recibo, mas não o envia à cobrança
        ↓
A líder cobra o cliente e realiza o repasse correspondente
```

### 5.4. Fluxo de resseguro sob contrato

```text
Seguradora direta emite apólice
        ↓
Consulta contrato de resseguro
        ↓
Valida limites e participações das resseguradoras
        ├── Dentro dos limites → cessão ocorre conforme contrato
        └── Fora dos limites → controle técnico / retenção
                                      ↓
                           Manter integralmente o risco
                                      ou
                           contratar resseguro facultativo
```

---

## 6. Componentes e conceitos mencionados

## 6.1. Tratamento de transporte

O treinamento menciona um “tratamento de transporte” que condiciona alguns aspectos da definição e da operação do ramo. Não foram detalhadas todas as características desse tratamento neste trecho, mas há referência a uma terminologia própria.

No contexto de transporte:

- “aplicação” parece representar um transporte ou viagem;
- a transcrição informa que, nesse caso, não se utiliza a denominação “declaração” da mesma maneira que em outros contextos;
- uma declaração, para o sistema referido como RIF/RIV, é explicada como o orçamento de uma aplicação;
- esse orçamento pode ser reutilizado, de maneira semelhante ao reaproveitamento de um orçamento como modelo ou template.

### Identificação de aplicações

Em condições normais, a aplicação ou declaração não possui número próprio independente. O identificador é composto a partir do número da apólice e de um número sequencial, no formato exemplificado como:

```text
[número da apólice]-[sequencial]
```

Exemplo verbalizado:

```text
pol2-1
```

O instrutor afirma que essa numeração pode ser alterada, embora não detalhe quais formatos alternativos são permitidos nem como a alteração é configurada.

---

## 6.2. Tratamento de caução e crédito

O treinamento menciona um tratamento especial para ramos de **caução e crédito**, caracterizados como ramos muito específicos.

O exemplo utilizado é a construção de uma rodovia. A explicação associa esse tipo de seguro à necessidade de assegurar o cumprimento de uma obra de grande porte, possivelmente executada por várias empresas reunidas em uma união temporária.

Elementos explicitamente mencionados:

- obras de infraestrutura, como rodovias;
- participação do Estado em construções desse tipo;
- necessidade de respeitar prazos;
- existência de seguro para assegurar o cumprimento associado ao empreendimento.

A transcrição não detalha:

- o nome formal do produto de caução;
- os tipos de garantias envolvidos;
- o processo de sinistro;
- os requisitos regulatórios;
- as regras específicas de precificação ou subscrição.

---

## 6.3. Documentos de entrada e saída

A reunião recupera uma explicação anterior sobre documentos:

| Tipo de documento | Origem | Exemplos citados |
|---|---|---|
| Documento de saída | Gerado pela seguradora | condições particulares, carta comunicando que o seguro foi realizado |
| Documento de entrada | Fornecido pelo cliente | cópia de carteira de motorista, documento de identificação |

Segundo o instrutor, havia anteriormente outro módulo de impressão. Contudo, ele informa que, em novas instalações, esse módulo anterior não deve ser utilizado. O módulo utilizado seria o de entrada e saída.

Também são mencionados processos de impressão associados a:

- apólices;
- orçamentos;
- controle técnico.

No caso de uma apólice retida por controle técnico, o processo poderia comunicar ao cliente que a apólice estava em revisão ou que não pôde ser emitida naquele momento.

### Limitação de entendimento

A transcrição não permite concluir:

- se o módulo antigo está removido, apenas descontinuado ou ainda disponível;
- quais modelos de documentos existem;
- como são feitas personalizações;
- quais canais de entrega são utilizados;
- se há assinatura eletrônica, armazenamento documental ou integração com ferramentas externas.

---

## 6.4. Inspeção de risco

A inspeção é apresentada como uma avaliação necessária para conceder aprovação a determinados riscos.

Os exemplos utilizados foram:

| Tipo de risco | Possível necessidade de inspeção |
|---|---|
| Vida ou saúde | reconhecimento médico e preenchimento de formulários |
| Veículo usado | avaliação de danos e condições do veículo |
| Fábrica | segurança, localização e eventual exposição a riscos |
| Outros riscos | análise de condições específicas antes da aceitação |

A reunião distingue dois momentos possíveis:

1. **Inspeção anterior à emissão**  
   A seguradora já identifica previamente que o risco exigirá inspeção, a inspeção é realizada e, se estiver aprovada, a apólice pode ser emitida.

2. **Inspeção identificada durante a emissão**  
   Durante o processo de emissão, uma regra detecta que a inspeção é necessária. Como exemplo, foi citado um veículo de ano de fabricação 2020. A apólice pode então ficar retida enquanto a inspeção não estiver disponível ou não tiver resultado aprovado.

### Parâmetro de busca de inspeção

A configuração discutida define se o processo de emissão deve investir tempo em buscar uma inspeção existente quando detectar que o risco exige inspeção.

A lógica exposta foi:

| Modelo operacional da companhia | Comportamento esperado |
|---|---|
| A inspeção só é solicitada após o controle técnico | Não faria sentido buscar inspeção durante a emissão, pois ela ainda não existiria |
| A inspeção é solicitada antecipadamente | A emissão pode procurar a inspeção e emitir a apólice se ela existir e estiver aprovada |

O parâmetro não determina por si só a necessidade de inspeção; ele define se, quando a necessidade for identificada, o processo de emissão tentará localizar uma inspeção prévia.

### Gestão de inspeções

Em resposta a uma pergunta, o instrutor afirma que há:

- um módulo para gestão e controle de inspeções de risco;
- possibilidade de integração com sistemas externos;
- integração externa mencionada de forma genérica como realizada por APIs.

Não foram apresentados detalhes sobre APIs, entidades de dados, estados da inspeção, responsáveis, prazos ou fornecedores externos.

---

## 6.5. Parâmetros declarados obsoletos

Em determinado momento, o instrutor corrige uma informação e afirma que alguns campos ou itens estão fora de uso e deveriam ser removidos da tela ou do material.

Foram citados como obsoletos:

- item que o instrutor inicialmente não recordava;
- dados de captura de apólice;
- objeto segurado;
- modalidade;
- acessórios;
- plano de pagamento.

A orientação dada aos participantes foi “esquecer” esses itens, pois estariam fora de uso.

> A transcrição não informa se tais itens foram descontinuados funcionalmente, substituídos por outros recursos, mantidos por compatibilidade ou apenas indevidamente exibidos no material de treinamento.

---

## 6.6. Unit Linked

O treinamento menciona um parâmetro que indica se o ramo está orientado a “Unilink” ou “Unit Linked”.

O conceito é explicado como um tipo de apólice associado a investimento em cestas de valores, fundos de poupança ou fundos de investimento.

A configuração aparenta ser binária:

```text
Sim / Não
```

Não foram fornecidos detalhes sobre:

- cálculo de valor;
- fundos disponíveis;
- gestão de carteira;
- regras regulatórias;
- movimentações financeiras;
- riscos de investimento;
- integrações com instituições financeiras.

---

## 6.7. Rejeição, suspensão e retomada

A reunião explica uma funcionalidade operacional aplicável a apólices retidas, e avalia se ela deve também ser aplicada às aplicações de transporte.

### Exemplo apresentado

1. Um emissor registra os dados de uma apólice.
2. A apólice recebe desconto de campanha acima de 15%.
3. O excesso de desconto gera um controle técnico e a apólice fica retida.
4. A pessoa com competência para aprovar ou rejeitar entende que 15% não é permitido, mas 12% poderia ser aceito.
5. A aprovação não é possível no estado atual, e a rejeição definitiva faria a informação desaparecer.
6. A pessoa utiliza a opção descrita como “rejeitar suspendendo”.
7. A apólice passa para o estado suspenso.
8. O emissor retoma a apólice, altera o desconto de 15% para 12% e então pode prosseguir com a emissão.

### Distinção operacional

A suspensão também é comparada a um cenário no qual uma pessoa ainda não terminou de registrar todos os riscos de uma apólice e precisa continuar posteriormente.

A funcionalidade discutida permite preservar o trabalho já realizado sem autorizar uma condição que não atende à regra de negócio.

---

## 7. Modelo de integração

## 7.1. Integração de inspeções

O instrutor afirma que a gestão de inspeções pode ocorrer:

- por um módulo interno de gestão e controle de inspeções;
- por integração com sistemas externos;
- mediante APIs.

Não há descrição de chamadas síncronas ou assíncronas, eventos, mensageria, arquivos, formatos de payload, SLA de integração ou mecanismos de contingência.

## 7.2. Integração de resseguro

O RIF Core possui, segundo a apresentação, um módulo interno de resseguro. Esse módulo pode realizar funções como:

- consultar contratos de resseguro;
- identificar resseguradoras participantes;
- determinar percentuais de participação;
- controlar limites de capitais;
- enviar informações sobre apólices;
- comunicar riscos, coberturas, capitais e prêmios;
- encaminhar informações financeiras relacionadas a recebimentos;
- comunicar sinistros e apurar valores que devem ser recuperados das resseguradoras.

O sistema também pode trabalhar com módulo externo de resseguro. Nesse caso, o módulo externo passa a realizar esse trabalho operacional.

### Implicação da integração externa

A reunião ressalta que o uso de módulo externo reduz o controle direto do sistema principal sobre o resultado do processo. Foram mencionados exemplos de falhas possíveis:

- inexistência de conexão;
- queda de comunicações;
- queda de servidor;
- tentativa de emissão sem retorno do módulo externo.

A consequência indicada é a necessidade de controles adicionais e, em determinados casos, de geração de controle técnico.

---

## 8. Modelo operacional

## 8.1. Emissão

A emissão pode ocorrer, pelo menos conceitualmente, em dois modos mencionados:

- online;
- batch.

O treinamento afirma que a situação de suspensão é mais fácil de visualizar em emissões online, pois há uma pessoa inserindo dados no sistema.

## 8.2. Controles técnicos

Os controles técnicos aparecem como mecanismos de retenção quando determinada regra não é satisfeita. Foram citados como exemplos:

| Situação | Efeito mencionado |
|---|---|
| Desconto de campanha superior a 15% | apólice fica retida |
| Necessidade de inspeção sem inspeção válida disponível | apólice pode ficar retida |
| Capital acima da capacidade contratada de resseguro | controle técnico e retenção |
| Problemas em integração externa de resseguro | necessidade de controles adicionais; possibilidade de controle técnico |

A transcrição não detalha a matriz completa de controles técnicos, seus responsáveis, tempos de tratamento, níveis de alçada ou critérios de escalonamento.

## 8.3. Comunicação com clientes

No contexto de documentos e controle técnico, o instrutor cita a possibilidade de informar o cliente de que sua apólice está em revisão ou não pôde ser processada.

Não há descrição sobre:

- canais de comunicação;
- modelos de mensagem;
- regras de envio;
- momento do envio;
- comunicação com corretores, bancos ou parceiros.

---

## 9. Cosseguro

## 9.1. Conceito apresentado

O instrutor diferencia cosseguro de resseguro pelo grau de visibilidade para o cliente.

| Tema | Explicação dada |
|---|---|
| Resseguro | o cliente não tem consciência de que a seguradora compartilha o risco com outras companhias |
| Cosseguro | o cliente é consciente de que há participação de outras companhias; em certos casos, pode até solicitar isso |

A reunião não aprofunda as bases legais, regulatórias ou contratuais dessa distinção.

## 9.2. Papéis no cosseguro

Foram explicados dois papéis principais:

| Papel | Descrição |
|---|---|
| Líder / cedente | emite a apólice ao cliente e cede parte do risco a outras companhias |
| Aceitante | recebe parte do risco cedido pela líder |

A própria companhia pode ser configurada para atuar de formas diferentes dependendo do ramo:

| Configuração | Efeito |
|---|---|
| Exento | não haverá cosseguro |
| Apenas cedente/líder | a companhia emite e cede risco |
| Apenas aceitante | a companhia recebe participação de uma líder |
| Líder e aceitante | a companhia pode atuar nos dois papéis |

> Os rótulos exatos podem estar afetados por reconhecimento de voz. A ideia funcional apresentada é que o ramo pode restringir ou permitir o papel da companhia na operação de cosseguro.

## 9.3. Efeito na emissão

A configuração simplifica ou amplia o processo de emissão:

- se o ramo for isento de cosseguro, o sistema não precisa perguntar informações relativas a cosseguro;
- se o ramo permitir cosseguro, a emissão precisa coletar dados compatíveis com o papel assumido;
- os campos exibidos mudam conforme a companhia atue como líder ou aceitante.

## 9.4. Operação como companhia líder

Quando a companhia é líder:

- ela registra a apólice completa;
- emite para o cliente;
- gera prêmios;
- cobra recebimentos;
- paga sinistros;
- posteriormente repassa valores às companhias aceitantes na proporção que lhes corresponde.

O instrutor comenta que a líder precisa declarar:

- as companhias participantes;
- os percentuais de participação;
- a própria participação.

A soma das participações deve totalizar 100%.

## 9.5. Operação como companhia aceitante

Quando a companhia aceita cosseguro de uma líder:

- ela também possui uma apólice;
- essa apólice possui características especiais;
- há um recibo associado à sua participação;
- esse recibo não deve ser enviado para cobrança diretamente ao cliente ou banco;
- a companhia líder, após cobrar o cliente, deve repassar o valor correspondente à aceitante.

O instrutor também menciona que, em caso de sinistro, o registro ou a comunicação se relaciona com a companhia líder.

## 9.6. Dados apresentados na tela de cosseguro

### Quando a companhia atua como líder/cedente

A tela permite:

- adicionar companhias seguradoras participantes;
- informar percentuais de participação;
- registrar múltiplas companhias;
- incluir a própria companhia na distribuição.

Há uma regra explícita de consistência:

```text
A soma das participações deve ser 100%.
```

As empresas selecionadas precisam estar cadastradas como companhias seguradoras na atividade de terceiros.

### Quando a companhia atua como aceitante

A transcrição menciona os seguintes dados:

- companhia líder;
- número da apólice criada pela líder;
- suplemento ou conceito de suplemento da líder;
- percentual de participação da companhia aceitante;
- identificadores enviados pela líder;
- percentuais relacionados a agentes, gastos, recargos e outros.

A referência aos percentuais econômicos é associada a conceitos vistos anteriormente, mas a reunião não detalha o cálculo nem a finalidade financeira de cada campo.

## 9.7. Quadros de cosseguro

Os quadros de cosseguro são distribuições pré-definidas de participação entre seguradoras.

Exemplo conceitual dado:

```text
Companhia A: 30%
Companhia B: 30%
Companhia da própria operação: 40%
Total: 100%
```

A finalidade é evitar que, em cada emissão, o usuário precise cadastrar novamente companhias e percentuais para estruturas recorrentes.

O fluxo esperado é:

```text
Quadro pré-configurado
        ↓
Seleção do quadro durante a emissão
        ↓
Preenchimento automático da distribuição definida
```

A transcrição não informa:

- quem cria e aprova os quadros;
- se há versionamento;
- se os percentuais podem ser alterados na emissão;
- se há vigência;
- como o sistema trata alterações após a emissão.

## 9.8. Comissão externa de cosseguro

O instrutor menciona um parâmetro relacionado a “comissão de cosseguro externa”, mas afirma explicitamente não se recordar do significado e evita fornecer uma explicação incorreta.

Portanto, não é possível concluir, com segurança:

- o que essa comissão representa;
- como é calculada;
- para quem é paga;
- em que cenários se aplica;
- como afeta a emissão ou a liquidação.

---

## 10. Resseguro

## 10.1. Conceito apresentado

No resseguro, a companhia que vende a apólice pode ceder parte do risco a resseguradoras. Diferentemente do cosseguro, o cliente não é apresentado como parte consciente dessa divisão de risco.

O objetivo explicado é reduzir a exposição da seguradora, inclusive diante de eventos de grande impacto ou potencialmente catastróficos.

## 10.2. Papéis possíveis

A reunião apresenta três possibilidades de configuração do ramo:

| Configuração | Interpretação funcional |
|---|---|
| Somente seguro direto | a companhia emite seguros e pode ceder parte dos riscos, mas não atua recebendo riscos de outras seguradoras como resseguradora |
| Somente resseguro aceito | a companhia atua como resseguradora para esse ramo |
| Seguro direto e resseguro aceito | a companhia pode tanto emitir e ceder riscos quanto receber riscos cedidos por outras companhias |

O instrutor ressalta que não toda companhia seguradora pode atuar como resseguradora.

É citado como exemplo o grupo Mapfre, com menção a “Mapfre Re” como estrutura voltada a aceitar riscos em resseguro. Essa referência é utilizada apenas como ilustração durante a explicação.

## 10.3. Contrato de resseguro

O contrato é apresentado como o arranjo padrão para cessão de riscos de um ramo.

Segundo a explicação, o contrato define, em termos gerais:

- quais resseguradoras participarão;
- a ordem ou distribuição entre elas;
- percentuais cedidos;
- parcela do risco que permanece com a seguradora direta;
- limites de capitais ou cobertura aceitos.

O exemplo conceitual é que, para todas as apólices de determinado ramo, a seguradora pode ceder percentuais previamente definidos a diferentes resseguradoras.

### Limites de capacidade

As resseguradoras podem aceitar risco somente até determinado limite. O exemplo dado utiliza o valor de 100.000, associado a uma cobertura.

A lógica explicada é:

```text
Cobertura dentro do limite contratual
        ↓
Resseguradoras aceitam automaticamente conforme o contrato

Cobertura acima do limite contratual
        ↓
Controle técnico
        ↓
Apólice pode ficar retida
```

O instrutor usa como exemplo uma cobertura de acidentes de 90.000, dentro de uma capacidade de 100.000. Em seguida, explica que uma cobertura acima do limite aciona o problema de capacidade.

> Há uma pequena inconsistência verbal no trecho: o instrutor menciona “com 100.000” após explicar que o limite é “até 100.000”. Não é possível determinar se o limite é inclusivo, exclusivo ou se houve imprecisão na fala. O ponto funcional inequívoco é que coberturas acima da capacidade contratada exigem tratamento adicional.

## 10.4. Resseguro facultativo

O resseguro facultativo é explicado como um contrato específico, ou ad hoc, para uma apólice concreta.

Ele se torna necessário quando o contrato padrão não permite ceder determinado risco, por exemplo, porque o capital supera os limites previstos.

As opções apresentadas são:

1. a seguradora direta permanece integralmente com o risco;
2. a seguradora negocia um contrato facultativo para aquela apólice.

As resseguradoras do facultativo podem ou não ser as mesmas participantes do contrato padrão. O instrutor ressalta que as condições podem ser diferentes.

## 10.5. Módulo interno de resseguro do RIF Core

O RIF Core possui um módulo interno de resseguro, responsável, de maneira resumida, por:

- tratar contratos de resseguro;
- identificar companhias participantes;
- identificar percentuais de risco;
- verificar limites de capital;
- transmitir informações da apólice às resseguradoras;
- comunicar riscos, coberturas, capitais e prêmios;
- tratar repasses relacionados a recebimentos;
- comunicar sinistros;
- apoiar a cobrança de valores devidos pelas resseguradoras em razão de sua participação no risco.

O instrutor deixa claro que essa descrição é simplificada e não pretende cobrir todos os detalhes do processo.

## 10.6. Módulo externo de resseguro

Como alternativa, o RIF Core pode integrar-se a um módulo externo que executa as atividades de resseguro.

A escolha entre módulo interno e externo é apresentada como um parâmetro de definição do ramo ou da operação.

### Implicações operacionais destacadas

| Uso do módulo interno | Uso de módulo externo |
|---|---|
| o sistema possui maior controle direto sobre o processo | a operação depende de integração |
| o sistema pode identificar internamente problemas de capacidade e completude | pode haver indisponibilidade de conexão, comunicação ou servidor |
| controles fazem parte do próprio ambiente | são necessários controles adicionais para lidar com falhas externas |

A reunião não especifica como ocorrem retentativas, filas, reconciliações, contingência, compensação financeira ou consistência transacional quando o módulo externo está indisponível.

---

## 11. Perguntas e respostas relevantes

## 11.1. Existe sistema ou módulo para acompanhamento de inspeções?

### Pergunta

Um participante pergunta se existe um sistema para acompanhamento, solicitação e controle de inspeções, e se ele está dentro do RIF ou em módulo separado.

### Resposta

O instrutor informa que existem “dois sabores”:

- um módulo que permite gestão e controle das inspeções de risco;
- integração com sistemas externos, por APIs.

Ele afirma que a funcionalidade será vista posteriormente no treinamento.

### O que a resposta esclarece

A inspeção não é apenas uma regra abstrata de emissão. Há uma capacidade operacional específica para gerenciar o ciclo de inspeções, embora a transcrição não detalhe suas telas, seus estados ou integrações.

---

## 11.2. A aplicação de transporte pode ser reutilizada?

### Pergunta implícita

A explicação aborda se o orçamento de uma aplicação de transporte — chamado de declaração — pode ser reutilizado.

### Resposta

Sim. A declaração, entendida como orçamento de um transporte ou viagem, pode ser reaproveitada de forma semelhante a um orçamento usado como template para emissão.

### O que a resposta esclarece

O tratamento de transporte permite reutilização de estruturas prévias, reduzindo a necessidade de recriar integralmente orçamentos de viagens semelhantes.

---

## 11.3. O que ocorre quando uma apólice retida precisa de correção, mas não deve ser excluída?

### Pergunta implícita

Como tratar uma apólice cujo desconto não pode ser aprovado no valor solicitado, mas que pode ser ajustado para um valor permitido?

### Resposta

Utiliza-se a opção de rejeitar suspendendo. A apólice deixa de estar apenas retida, passa a ficar suspensa e pode ser retomada pelo emissor para ajuste.

### O que a resposta esclarece

O sistema distingue rejeição definitiva de uma rejeição que exige correção. A segunda preserva a informação registrada e viabiliza continuidade operacional.

---

## 11.4. Quem cobra o recibo no cosseguro aceito?

### Pergunta

O instrutor pergunta quem paga ou abona o recibo da companhia aceitante.

### Resposta

Os participantes respondem que é a companhia líder. O instrutor confirma: a líder cobra o cliente e repassa à aceitante a parcela correspondente.

### O que a resposta esclarece

A companhia aceitante pode possuir recibo interno, mas não deve encaminhá-lo diretamente à cobrança. A relação financeira operacional com o cliente é centralizada na companhia líder.

---

## 11.5. A companhia pode atuar como líder e aceitante?

### Pergunta implícita

A explicação verifica se os participantes entendem que uma mesma companhia pode ter papéis diferentes em operações de cosseguro.

### Resposta

Sim. Conforme a configuração do ramo, a companhia pode:

- não operar cosseguro;
- atuar apenas como líder/cedente;
- atuar apenas como aceitante;
- atuar em ambos os papéis.

### O que a resposta esclarece

O papel no cosseguro é configurável e influencia tanto as perguntas feitas durante a emissão quanto os dados e controles disponíveis.

---

## 11.6. O que significa comissão de cosseguro externa?

### Pergunta implícita

O instrutor inicia uma explicação sobre comissão externa de cosseguro.

### Resposta

Ele declara não se recordar do significado e prefere não fornecer uma resposta potencialmente errada. Informa que retornará ao tema posteriormente.

### O que a resposta esclarece

Esse assunto permaneceu em aberto. Não deve ser documentado como entendido ou configurado a partir desta reunião.

---

## 12. Números e limites mencionados

> Os números abaixo foram declarados durante a reunião como exemplos didáticos. Não há evidência de que representem configuração real de uma seguradora específica.

| Indicador ou valor | Valor mencionado | Contexto |
|---|---:|---|
| Desconto de campanha que gera retenção | acima de 15% | exemplo de controle técnico |
| Desconto que poderia ser aceito após correção | 12% | exemplo de ajuste pelo emissor |
| Participação de cosseguro — exemplo A | 30% | quadro ilustrativo |
| Participação de cosseguro — exemplo B | 30% | quadro ilustrativo |
| Participação da própria companhia — exemplo | 40% | quadro ilustrativo; o instrutor inicialmente diz 60% e se corrige para 40% |
| Soma das participações em cosseguro | 100% | regra explícita |
| Limite de capacidade de resseguro — exemplo | 100.000 | exemplo de limite contratual |
| Cobertura de acidentes — exemplo | 90.000 | exemplo dentro da capacidade indicada |
| Veículo usado como exemplo de inspeção | ano 2020 | exemplo de regra de inspeção por ano de fabricação |

---

## 13. Limitações e ressalvas reconhecidas durante a reunião

A sessão contém várias limitações assumidas pelo próprio instrutor.

### 13.1. Itens que o instrutor não soube explicar naquele momento

Foram explicitamente deixados para esclarecimento posterior:

- um parâmetro inicialmente lido pelo instrutor, mas que ele não recordava;
- o significado de comissão externa de cosseguro;
- algumas explicações mais detalhadas sobre contratos de resseguro.

Em vez de completar com suposições, o instrutor declara que não quer dizer algo incorreto.

### 13.2. Funcionalidades obsoletas

Alguns parâmetros ainda apareciam no material ou na interface, mas foram declarados fora de uso. Isso indica possível defasagem entre a tela ou material e a configuração atualmente recomendada.

### 13.3. Detalhamento técnico insuficiente

A reunião não detalha:

- arquitetura física do RIF Core;
- tecnologia das APIs;
- modelos de integração;
- serviços, endpoints ou contratos;
- banco de dados;
- mensageria;
- mecanismos de autenticação;
- autorização;
- auditoria;
- criptografia;
- observabilidade;
- tratamento de erros;
- contingência;
- recuperação de desastre;
- acordos de nível de serviço;
- regras contábeis e financeiras completas;
- aspectos regulatórios de cosseguro e resseguro.

### 13.4. Interrupções técnicas

A reunião sofre interrupções de áudio, quedas e problemas de compartilhamento de tela. A transcrição termina durante uma explicação sobre emissão de seguro residencial no Chile, em área sujeita a terremotos.

Portanto, a conclusão daquele exemplo não está disponível.

---

## 14. Riscos e desafios

## 14.1. Riscos explicitamente mencionados

| Risco ou desafio | Evidência na reunião |
|---|---|
| Emissão sem inspeção necessária | apólice deve ser retida ou depender de inspeção aprovada |
| Aplicação de desconto fora da política | controle técnico e necessidade de correção |
| Cobertura acima da capacidade de resseguro | retenção e necessidade de assumir risco ou buscar facultativo |
| Falha de integração com módulo externo | falta de conexão, queda de comunicações ou servidor |
| Cobrança indevida em cosseguro aceito | recibo da aceitante não deve ir diretamente ao banco ou cliente |
| Erro na distribuição de cosseguro | percentuais precisam somar 100% |
| Trabalho operacional repetitivo | preenchimento recorrente de participantes e percentuais sem uso de quadro pré-configurado |

## 14.2. Desafios derivados do contexto

> Os itens abaixo são interpretações analíticas baseadas nas explicações da reunião, e não declarações literais dos participantes.

### Dependência entre configuração e operação

A configuração de ramo concentra decisões capazes de afetar diretamente a emissão, o tratamento de exceções e a integração. Isso sugere que alterações de parâmetros devem ser tratadas com cuidado, pois podem mudar fluxos já operacionais.

### Complexidade crescente em operações compartilhadas

Cosseguro e resseguro introduzem dependências financeiras, contratuais e operacionais adicionais. Quanto maior a quantidade de participantes e exceções, maior tende a ser a necessidade de controles consistentes sobre percentuais, comunicações, recibos, sinistros e limites.

### Governança de integrações externas

Quando o resseguro é gerenciado externamente, a emissão parece depender de condições que não estão inteiramente sob controle do sistema central. Uma leitura possível é que o desenho precisa prever monitoramento, tratamento de indisponibilidade e reconciliação — embora tais mecanismos não tenham sido explicados.

---

## 15. Transformações e direcionamentos identificados

> Esta seção apresenta leitura analítica sustentada pelo conjunto de explicações, sem atribuir aos participantes afirmações que não fizeram literalmente.

## 15.1. De configuração cadastral para governança operacional

A reunião indica que a configuração do ramo não deve ser entendida apenas como cadastro de produto. Ela opera como mecanismo de governança do comportamento da plataforma:

```text
Parâmetro do ramo
        ↓
Regra operacional habilitada
        ↓
Dados exigidos na emissão
        ↓
Retenção, aprovação, integração ou fluxo financeiro
```

Isso é visível em inspeções, cosseguro, resseguro, impressão, transporte e Unit Linked.

## 15.2. De emissão simples para emissão controlada por exceções

O fluxo não é apresentado como linear. A emissão pode ser condicionada por:

- inspeção;
- desconto;
- capital acima da capacidade;
- participação de terceiros;
- regras de cosseguro;
- disponibilidade de módulo externo.

A plataforma parece orientar uma emissão capaz de parar, reter, suspender, retomar ou encaminhar a operação conforme controles de risco e regras de negócio.

## 15.3. De risco integral para risco distribuído

Cosseguro e resseguro aparecem como mecanismos diferentes para compartilhar exposição:

```text
Cosseguro
→ participação direta de diversas seguradoras na operação visível ao cliente

Resseguro
→ transferência de parte do risco pela seguradora, sem essa visibilidade para o cliente
```

A distinção não é apenas conceitual; ela repercute nos dados registrados, na cobrança, na relação com o cliente e nas integrações.

## 15.4. De preenchimento manual recorrente para reutilização de configurações

Os quadros de cosseguro e a reutilização de orçamentos ou declarações de transporte apontam para uma busca de eficiência operacional por meio de modelos reutilizáveis.

---

## 16. O que a reunião não permite concluir

A transcrição não fornece base suficiente para concluir com segurança:

1. Qual é o nome oficial e a versão da plataforma.  
   O termo mais recorrente é “RIF Core”, mas há ocorrências de “RIV”, possivelmente causadas pela transcrição automática.

2. Quais ramos efetivamente serão implantados ou configurados pelos participantes.

3. Se os exemplos de transporte, Chile, rodovia, desconto, veículo de 2020, Mapfre e limites de 100.000 representam operações reais ou apenas casos didáticos.

4. Quais critérios exatos determinam a necessidade de inspeção.

5. Como é calculado o desconto, quais perfis podem autorizar exceções e quais são as alçadas.

6. Qual o ciclo de vida completo de uma apólice retida, suspensa, retomada, rejeitada ou emitida.

7. Como são modeladas as regras de cosseguro e resseguro no banco de dados ou em APIs.

8. Como ocorre a troca de informação com companhias líderes, aceitantes e resseguradoras.

9. Como são realizados os pagamentos, repasses, liquidações e conciliações financeiras.

10. Como os sinistros de cosseguro ou resseguro são operacionalizados em detalhe.

11. Qual é o modelo de segurança, identidade, autorização e auditoria.

12. Quais são os mecanismos de observabilidade, monitoramento e tratamento de indisponibilidade em integrações externas.

13. O que significa, funcional e contabilmente, a comissão externa de cosseguro.

14. Quais parâmetros obsoletos foram substituídos e por quais recursos.

15. Como o caso de imóvel no Chile sujeito a terremotos seria concluído, pois a explicação foi interrompida antes do desfecho.

---

## 17. Conclusões

A reunião apresenta uma visão funcional de como uma plataforma de seguros transforma regras de produto em comportamento operacional. A emissão de uma apólice depende não só dos dados básicos do segurado e do risco, mas também de parâmetros que podem habilitar documentos, inspeções, controles técnicos, retenções, suspensão, cosseguro, resseguro e integrações externas.

O ponto mais importante é a conexão entre configuração e operação: ao definir um ramo, a seguradora também define quais cenários de risco devem ser controlados e como o sistema responderá a eles.

No cosseguro, a configuração determina se a companhia será líder, aceitante, ambas ou se não participará desse tipo de operação. No resseguro, a configuração define se a companhia atua somente como seguradora direta, como resseguradora ou nos dois papéis, além de influenciar o uso de contratos, facultativos e módulos internos ou externos.

A reunião também preserva limites importantes: nem todos os parâmetros foram esclarecidos, alguns elementos foram declarados obsoletos e a explicação final foi interrompida. Assim, este documento consolida o conhecimento efetivamente transmitido, mas não substitui documentação técnica, regras contratuais, manuais operacionais ou validação com especialistas de negócio e de resseguro.
