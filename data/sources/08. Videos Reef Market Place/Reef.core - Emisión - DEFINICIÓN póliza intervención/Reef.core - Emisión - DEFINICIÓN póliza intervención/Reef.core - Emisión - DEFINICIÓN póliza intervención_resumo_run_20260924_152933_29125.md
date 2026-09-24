# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.core - Emisión - DEFINICIÓN póliza intervención.mp4`
**Data de processamento:** 24/09/2026 15:33:50
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Análise funcional e técnica — Definição de Intervenções no MAPFRE Reef.core

## 1. Síntese executiva

A sessão teve como tema principal a configuração de **intervenções** no módulo de emissão do **Reef.core**, dentro do contexto de definição de produtos e ramos de seguros. Em termos funcionais, uma intervenção representa a forma pela qual um terceiro participa de uma apólice — por exemplo, como tomador, segurado, condutor, proprietário, beneficiário ou endossatário.

O problema central tratado foi a necessidade de diferenciar corretamente dois conceitos próximos, porém distintos:

- **atividade de terceiro**: o papel geral desempenhado por uma pessoa ou entidade dentro do sistema;
- **intervenção**: o papel que um terceiro desempenha especificamente no contexto de uma apólice ou de um risco segurado.

A apresentação explicou que as intervenções são previamente estabelecidas pelo núcleo do Reef.core. Os países ou companhias podem configurar quais delas se aplicam aos seus produtos, ramos, níveis de apólice ou risco e regras operacionais, mas não podem criar livremente uma nova intervenção sem uma solicitação ao core. O motivo apresentado é que uma nova intervenção pode exigir comportamento específico do sistema e, portanto, desenvolvimento adicional.

A reunião também demonstrou que a funcionalidade já existe em ambientes mais antigos, identificados na conversa como **TronWeb** e “generador de productos”, ainda que possa aparecer sob a nomenclatura de “terceiros” em vez de “intervenções”. A demonstração final procurou reduzir a percepção de que o modelo seria exclusivo de Reef ou Neutron.

> **Nota de qualidade da fonte:** o início da transcrição contém uma conversa operacional paralela, com forte degradação de reconhecimento de voz, seguida de repetições e trechos sem relação demonstrável com o treinamento. Esses segmentos não permitem reconstrução confiável e não foram tratados como conteúdo funcional da sessão.

---

## 2. Contexto e antecedentes

A sessão parece fazer parte de uma capacitação funcional sobre a documentação do Reef.core, mais especificamente no módulo de **emissão**. A apresentadora navega pela documentação do produto, inicialmente usando o ramo de automóveis como exemplo, mas deixa claro que a lógica de intervenções é aplicável também a outros ramos, como:

- vida;
- transportes;
- saúde;
- ramo citado pela transcrição como “obar”, cuja identificação exata não é segura.

A documentação visual confirma que a definição de automóvel depende de elementos comuns que não pertencem exclusivamente ao módulo de emissão, mas são necessários para que o ramo seja configurado. Entre eles estão companhia, moeda, estrutura comercial, estrutura de produto, canal, comissões, agente, conceitos econômicos, documentos e controle técnico.  
**Rastreabilidade:** frame 05, `19:25`.

Nesse cenário, a definição de intervenções não é apresentada como uma capacidade isolada. Ela compõe a configuração funcional de um produto de seguro e se conecta à forma como pessoas físicas ou jurídicas são registradas, solicitadas, validadas e utilizadas durante a emissão e os movimentos de apólice.

---

## 3. Problemas identificados

### 3.1 Confusão entre atividade de terceiro e intervenção

A principal dúvida explicitamente levantada durante a sessão foi a aparente semelhança entre o conceito de atividade de terceiro e o de intervenção.

A pessoa que perguntou observou que ambos pareciam definir o papel de um terceiro. A resposta esclareceu que a semelhança é compreensível, mas os conceitos operam em níveis diferentes:

| Conceito | Escopo explicado na reunião |
|---|---|
| Atividade de terceiro | Forma geral pela qual o terceiro atua no sistema. |
| Intervenção | Forma pela qual um terceiro, ou um grupo de terceiros, atua dentro de uma apólice. |

A apresentadora usou exemplos para separar os dois níveis:

- peritos, médicos, advogados, procuradores e fornecedores podem possuir atividades no sistema, mas não necessariamente participam da emissão de uma apólice;
- tomadores, segurados, condutores, proprietários e beneficiários são exemplos de terceiros que podem atuar como intervenientes em uma apólice;
- agentes possuem características específicas e presença recorrente na apólice, mas a apresentadora fez ressalvas de que não se trata exatamente do mesmo tipo de intervenção configurável discutido no treinamento.

A conclusão funcional transmitida foi:

> Todo terceiro definido no sistema precisa ter uma atividade, mas nem toda atividade de terceiro corresponde a uma intervenção de apólice.

### 3.2 Necessidade de aplicar apenas intervenções pertinentes a cada ramo

Outro problema tratado é que uma mesma lista global de intervenções não faz sentido para todos os produtos de seguro.

O exemplo mais recorrente foi o de **condutor**:

- faz sentido em uma apólice de automóvel;
- não faria sentido, segundo o exemplo dado, em uma apólice voltada ao seguro de uma residência.

Assim, a configuração por ramo serve para selecionar, dentre as intervenções previamente disponíveis, quais devem ser utilizadas em cada produto.

### 3.3 Necessidade de controlar quando e como uma intervenção é solicitada

A reunião demonstrou que não basta cadastrar uma intervenção para um ramo. É necessário definir, entre outros aspectos:

- se ela é solicitada em nível de apólice ou risco;
- em que ordem ela será solicitada;
- se é obrigatória;
- quantos terceiros podem participar;
- se há terceiro principal;
- se um terceiro influencia cálculo;
- se há percentuais de participação;
- se a intervenção depende de condições da apólice ou do risco;
- se deve ser mantida, removida ou inabilitada em determinados movimentos.

Isso indica que a configuração não representa apenas a exibição de campos. Ela modela comportamento funcional durante a emissão e operações posteriores da apólice.

---

## 4. Solução apresentada

A solução apresentada é um modelo de configuração em duas etapas principais:

```text
1. Associar atividades de terceiro às intervenções
                    ↓
2. Configurar as intervenções aplicáveis a cada ramo
```

Esse fluxo também aparece na documentação visual como:

```text
[Definir atividades de terceiro por intervenção]
                    ↓
[Definir intervenções do ramo]
```

**Rastreabilidade:** frame 07, `27:10`.

### 4.1 Primeira etapa: definir atividades de terceiro por intervenção

Nesta etapa, define-se que tipos de terceiros podem ser incluídos em cada intervenção.

Por exemplo:

- em geral, tomadores, segurados, condutores e beneficiários tendem a estar associados a terceiros com atividade de cliente;
- um endossatário ligado a financiamento pode ser uma entidade financeira, e não necessariamente um cliente;
- a documentação visual de atividades do núcleo mostra categorias como tomadores/segurados, agentes, peritos, médicos, advogados, cobradores, seguradoras e resseguradoras.  
  **Rastreabilidade:** frame 09, `34:54`.

A apresentadora informou que essa relação era inicialmente estabelecida pelo core e que as companhias solicitaram maior abertura para decidir quais atividades poderiam ser associadas às intervenções. A transcrição sugere que a relação passou a poder ser modificada na configuração, mas não detalha os limites técnicos, permissões ou controles de governança dessa alteração.

### 4.2 Segunda etapa: definir intervenções por ramo

Depois de identificadas as intervenções e atividades relacionadas, configura-se quais intervenções serão aplicadas a cada ramo.

Para cada definição, a sessão descreve propriedades como:

- ramo;
- nível de solicitação;
- ordem;
- intervenção requerida;
- status de inabilitação;
- regras de obrigatoriedade;
- regras de principalidade;
- regras de cálculo;
- participação percentual;
- cessão de direitos;
- referências entre intervenções;
- lógicas condicionais;
- validações.

A documentação visual confirma, ao menos parcialmente, a presença de propriedades como ramo, nível de solicitação, ordem, intervenção a requerer e inabilitado.  
**Rastreabilidade:** frame 10, `38:46`.

---

## 5. Arquitetura funcional consolidada

O treinamento não apresentou uma arquitetura de infraestrutura — como cloud, bancos de dados, APIs, mensageria ou microsserviços. O que foi apresentado é uma **arquitetura funcional de configuração de emissão**.

A representação abaixo é uma consolidação analítica da explicação, e não um diagrama literal exibido na reunião:

```text
Cadastro de terceiros
    ↓
Atividades gerais de terceiros
    ↓
Intervenções previamente definidas no Reef.core
    ↓
Associação entre atividade e intervenção
    ↓
Configuração da intervenção por ramo/produto
    ├── Nível: apólice ou risco
    ├── Ordem de solicitação
    ├── Obrigatoriedade e quantidade
    ├── Principalidade e cálculo
    ├── Participação percentual
    ├── Referências e restrições
    ├── Condições de solicitação
    └── Validações
    ↓
Telas de emissão / inclusão de terceiros
    ↓
Validação e persistência da configuração da apólice
```

### 5.1 Distinção entre nível de apólice e nível de risco

A apólice é apresentada como composta por:

1. uma parte geral, que se aplica à apólice como um todo;
2. um ou mais riscos, que representam o objeto segurado.

A configuração de intervenção pode ocorrer em ambos os níveis.

| Nível | Significado funcional |
|---|---|
| Apólice | A intervenção afeta a apólice inteira, independentemente da quantidade de riscos. |
| Risco | A intervenção afeta somente o risco ao qual está associada. |

**Exemplo dado:**

- o **pagador** deve ser configurado em nível de apólice, pois os recibos pertencem à apólice, e não a cada risco individual;
- o **condutor** ou o **proprietário** de um veículo pode ser solicitado em nível de risco, pois uma apólice multirriscos de automóvel pode assegurar vários veículos, cada um com condutores ou proprietários distintos.

A documentação visual confirma a mesma distinção.  
**Rastreabilidade:** frame 10, `38:46`.

---

## 6. Componentes e conceitos mencionados

## 6.1 Reef.core

O Reef.core é apresentado como o núcleo que contém uma lista estabelecida de intervenções possíveis. Ele também fornece uma relação de atividades de terceiros.

A reunião sustenta que:

- as intervenções não são de livre criação pelos países;
- uma nova intervenção exige solicitação ao core;
- a necessidade de solicitação decorre do possível impacto funcional da nova intervenção;
- várias intervenções existentes são resultado de pedidos anteriores dos países.

A transcrição não detalha:

- a equipe responsável pelo core;
- o processo formal de solicitação;
- os critérios de priorização;
- o ciclo de desenvolvimento;
- os mecanismos de aprovação;
- prazos ou versionamento de novas intervenções.

## 6.2 Ramo

O ramo é a unidade funcional para a qual as intervenções são selecionadas e configuradas.

A apresentadora afirma que a definição segue a mesma lógica em diferentes ramos, ainda que as intervenções aplicáveis possam mudar conforme o contexto do seguro.

Exemplos mencionados:

- automóveis;
- transportes;
- vida;
- saúde.

## 6.3 Apólice

A apólice é tratada como a estrutura geral do contrato de seguro e pode conter múltiplos riscos.

A parte geral pode conter informações como:

- tomador;
- vigências;
- moeda;
- intervenções de nível de apólice.

A transcrição registra “ligências”, que, pelo contexto, aparentemente se refere a **vigências**. Esta correção é contextual, não uma confirmação literal da gravação.

## 6.4 Risco

O risco representa a parte específica que está sendo assegurada dentro da apólice.

No exemplo de automóvel, cada veículo pode ser tratado como um risco diferente. Isso justifica solicitar intervenções como proprietário ou condutor no nível do risco, e não no nível geral da apólice.

## 6.5 Terceiro

Terceiro pode ser uma pessoa física ou jurídica. O treinamento afirma que as intervenções podem envolver ambos os tipos.

A documentação de “Definición de Intervenciones” também confirma que, para cada figura, podem ser associados terceiros pessoas físicas ou jurídicas.  
**Rastreabilidade:** frame 06, `23:18`.

## 6.6 Atividade de terceiro

A documentação visual mostra a relação de atividades fornecida pelo núcleo:

| Código | Atividade |
|---:|---|
| 1 | Tomadores/Segurados |
| 2 | Agentes |
| 3 | Peritos |
| 4 | Inspetores |
| 5 | Médicos |
| 6 | Advogados |
| 7 | Procuradores |
| 8 | Supervisores |
| 9 | Tramitadores |
| 10 | Fornecedores |
| 11 | Executivos de conta |
| 12 | Cobradores |
| 13 | Seguradoras |
| 14 | Resseguradoras |

**Rastreabilidade:** frame 09, `34:54`.

A reunião não permite concluir se essa tabela é imutável, extensível, versionada por país ou igual em todas as instalações.

## 6.7 Intervenção

Intervenção é definida como uma agrupação de um ou mais terceiros sob uma figura que descreve como eles atuam dentro da apólice.

A documentação visual registra que as intervenções já foram estabelecidas previamente e que não são de livre criação.  
**Rastreabilidade:** frame 06, `23:18`.

A lista visual de “intervenções de cliente” inclui:

| Código | Tipo |
|---:|---|
| 0 | Tomador |
| 1 | Tomadores alternos |
| 2 | Segurados |
| 3 | Condutores |
| 4 | Proprietários |
| 5 | Beneficiários |
| 6 | Beneficiários vida |
| 7 | Proponente |
| 8 | Endossatário |
| 9 | Preventor |
| 11 | Beneficiários contingentes vida |
| 12 | Consórcio |
| 13 | ACE |

**Rastreabilidade:** frame 08, `31:02`.

> **Observação de fidelidade:** “Preventor” e “ACE” aparecem dessa forma no OCR. A reunião não explica esses termos, e não há base suficiente para expandi-los ou corrigi-los.

---

## 7. Regras funcionais das intervenções

## 7.1 Tomador

O tomador é apresentado como uma figura obrigatória em todas as apólices e ramos.

Segundo a explicação:

- todo contrato tem um tomador;
- o tomador é tratado como um bloco fixo na emissão;
- não é necessário definir sua presença do mesmo modo que as demais intervenções;
- ele permanece em nível de apólice.

A documentação visual lista o tomador como intervenção exclusiva de nível de apólice.  
**Rastreabilidade:** frame 07, `27:10`.

## 7.2 Tomadores alternos

Os tomadores alternos também são apontados como figuras de nível de apólice, pois sua função é semelhante à do tomador.

A reunião demonstra um exemplo de ramo contendo apenas tomadores alternos além do tomador fixo.

## 7.3 Pagador

O pagador é descrito como uma figura em incorporação, cuja funcionalidade “não está 100%” concluída, segundo a apresentadora.

Ele deve permanecer em nível de apólice porque é responsável pelo pagamento dos recibos, que pertencem à apólice.

> **Limitação explicitamente reconhecida:** a funcionalidade do pagador não estava integralmente disponível no momento da apresentação.

## 7.4 Segurado

O segurado é usado como exemplo de intervenção que pode estar associada ao tomador por referência, de forma que os dados do tomador possam ser sugeridos como valor padrão para o segurado.

Também é usado como exemplo de uma intervenção que pode exigir que o terceiro seja diferente do tomador.

## 7.5 Condutor

O condutor é o principal exemplo didático utilizado para explicar:

- obrigatoriedade;
- número máximo de terceiros;
- identificação de principal;
- identificação para cálculo;
- seleção por lógica;
- configuração em nível de risco;
- sequência de solicitação.

## 7.6 Proprietário

O proprietário é usado como exemplo de intervenção em nível de risco, especialmente em apólices com múltiplos veículos.

Também é usado para explicar referências: o proprietário pode, por padrão, receber o valor de outra intervenção previamente solicitada, como condutor ou tomador, desde que a ordem de solicitação permita isso.

## 7.7 Beneficiário

O beneficiário é usado para explicar percentuais de participação, especialmente em situações de indenização por morte do segurado.

A reunião indica que os beneficiários podem receber percentuais distintos de participação.

## 7.8 Endossatário

O endossatário é associado a cenários de financiamento, em que uma entidade financeira possui participação ou vínculo com o bem segurado.

A explicação menciona que, quando aplicável, podem ser solicitados dados relacionados à cessão de direitos, incluindo:

- contrato;
- data de vencimento ou termo equivalente ligado ao financiamento;
- valor financiado.

> **Nota sobre o texto:** a transcrição contém diversos trechos degradados nesta explicação. A interpretação de que esses campos se relacionam ao financiamento está sustentada pelo contexto repetido de “financeira”, “risco financiado” e “cessão de direitos”, mas a nomenclatura exata de todos os campos não é completamente confiável.

---

## 8. Modelo de configuração por ramo

## 8.1 Ramo

A propriedade aponta para o ramo afetado pela definição.

**Rastreabilidade:** frame 10, `38:46`.

## 8.2 Nível de solicitação

A intervenção pode ser solicitada em:

- nível de apólice;
- nível de risco.

A seleção afeta o momento e o contexto em que a informação será pedida durante a emissão.

## 8.3 Ordem

A ordem determina a sequência em que as intervenções serão solicitadas dentro de um mesmo nível.

A apresentadora destaca que essa ordem pode ser importante para suportar dependências, principalmente quando uma intervenção usa outra como referência ou valor padrão.

Exemplo de raciocínio apresentado:

```text
Se proprietário recebe, por padrão, o condutor,
então o condutor deve ser solicitado antes do proprietário.
```

A ordem não é explicada como regra técnica universal; ela é uma configuração relevante quando existem dependências funcionais entre intervenções.

## 8.4 Intervenção requerida

Após definir ramo, nível e ordem, escolhe-se qual das intervenções previamente estabelecidas será aplicada naquela configuração.

## 8.5 Inabilitação

A propriedade de inabilitação permite deixar de disponibilizar uma intervenção para novas inclusões sem apagar seu histórico.

O exemplo dado foi o de um produto que antes aceitava bens financiados e, portanto, solicitava endossatário. Se a companhia deixar de admitir esse cenário:

- a intervenção pode ser inabilitada;
- novas apólices não poderão incluir essa figura;
- apólices de carteira que já possuíam o endossatário não terão sua informação removida automaticamente;
- apólices existentes que ainda não tinham a intervenção tampouco poderão adicioná-la posteriormente.

Isso indica uma preocupação funcional com compatibilidade de carteira e preservação de dados históricos.

---

## 9. Obrigatoriedade e quantidade de terceiros

A reunião explica que uma propriedade numérica tem dupla função:

1. definir o máximo de terceiros permitidos em uma intervenção;
2. indicar se a intervenção é obrigatória.

| Configuração | Efeito explicado |
|---|---|
| Campo vazio | A intervenção não é obrigatória. Pode estar disponível, mas não precisa receber terceiros. |
| Campo preenchido | A intervenção torna-se obrigatória; o mínimo passa a ser um terceiro e o valor define o máximo permitido. |

Exemplo apresentado:

```text
Intervenção: Condutores
Valor configurado: 3

Resultado:
- mínimo de 1 condutor;
- máximo de 3 condutores;
- não é permitido deixar a intervenção sem condutor.
```

A documentação visual também indica que é possível estabelecer um número mínimo e máximo de terceiros em uma intervenção.  
**Rastreabilidade:** frames 06 e 07, `23:18` e `27:10`.

> **Ponto de atenção:** a fala indica que o mínimo é sempre um quando o campo possui valor. A reunião não detalha se há configurações alternativas para mínimo diferente de um, nem como o sistema representa tecnicamente essa regra.

---

## 10. Terceiro principal e terceiro para cálculo

## 10.1 Terceiro principal

Quando uma intervenção permite múltiplos terceiros, pode ser necessário identificar um ou mais como principal.

O exemplo usado foi o de condutores de um veículo:

- pode haver vários condutores;
- pode ser necessário identificar o condutor habitual;
- se a propriedade estiver habilitada, o sistema exige que pelo menos um terceiro seja marcado como principal.

A apresentadora também afirma que há uma propriedade que permite haver vários terceiros principais. Mesmo nesse caso, a validação exige ao menos um principal.

## 10.2 Terceiro para cálculo

Uma intervenção pode ter um terceiro marcado como referência para cálculo.

Exemplo funcional:

- a tarifação de automóvel pode considerar idade, tempo de habilitação ou outros dados do condutor;
- quando existem vários condutores, pode ser necessário identificar qual deles será usado para cálculo.

Foram apresentadas duas alternativas:

| Alternativa | Descrição |
|---|---|
| Identificação manual | O emissor consulta o cliente e marca manualmente o terceiro que será utilizado no cálculo. |
| Lógica automatizada | Uma lógica avalia os dados dos terceiros e escolhe qual será usado no cálculo. |

O exemplo de lógica automatizada mencionado foi selecionar o condutor com menor idade e menor tempo de habilitação.

A reunião também ressalta que:

- nem toda intervenção participa de cálculos;
- não é obrigatório identificar um terceiro de cálculo para todas as intervenções;
- caso não exista marcação manual nem lógica configurada, a tarifação ainda pode utilizar terceiros de outra forma, mas esse comportamento não foi detalhado.

---

## 11. Participação percentual

Quando diversos terceiros em uma mesma intervenção participam de forma distinta, é possível solicitar um percentual de participação.

Exemplos dados:

- beneficiários com percentuais diferentes de indenização;
- múltiplas entidades financeiras associadas a um risco financiado.

Também pode ser configurada uma validação para exigir que a soma dos percentuais seja igual a 100.

```text
Terceiros em uma intervenção
        ↓
Percentuais individuais
        ↓
Validação opcional da soma
        ↓
Se soma ≠ 100, o sistema retorna erro
```

A reunião não detalha:

- quantidade de casas decimais;
- regras de arredondamento;
- se percentuais negativos ou zero são aceitos;
- se a soma deve ser exatamente 100 ou permite tolerância técnica.

---

## 12. Cessão de direitos

A propriedade de cessão de direitos é associada principalmente ao cenário de endossatário e financiamento.

Quando habilitada, a interface solicita dados relacionados ao vínculo financeiro, incluindo, conforme a explicação:

- número de contrato;
- data associada ao financiamento;
- valor financiado.

A sessão indica que esses dados são solicitados para cada terceiro incluído como endossatário em uma intervenção aplicável.

A reunião não permite concluir:

- se o registro de cessão gera integração com instituições financeiras;
- se há documentos comprobatórios;
- se existe validação externa dos dados financeiros;
- se a cessão influencia cálculo, sinistros, cobrança ou liquidação;
- se há regras por país.

---

## 13. Campo informativo de cliente VIP

Foi apresentada uma propriedade identificada na fala como “personal VIP” ou equivalente.

O contexto informado é o de países em que bancos contratam apólices e desejam identificar se os clientes relacionados são clientes VIP.

O comportamento descrito é exclusivamente informativo:

- a marcação permite exibir ou registrar que o terceiro é VIP;
- o sistema não executa comportamento adicional específico a partir dessa indicação;
- a propriedade não produz, segundo a apresentadora, nenhuma ação automática adicional.

Essa é uma limitação importante: a marcação VIP, conforme descrita, não representa uma regra de tarifação, prioridade operacional, workflow ou segmentação automatizada.

---

## 14. Referências entre intervenções

A sessão descreve um grupo de propriedades que permitem usar uma intervenção como referência para outra.

## 14.1 Intervenção de referência

Permite preencher por padrão o terceiro de uma intervenção com o valor já informado em outra intervenção.

Exemplo:

```text
Tomador informado
        ↓
Segurado recebe o tomador como valor sugerido
        ↓
Usuário pode manter ou alterar o valor
```

A apresentadora enfatiza que isso é apenas uma ajuda de preenchimento:

- não obriga que os terceiros sejam os mesmos;
- não impede alteração;
- não representa uma validação de igualdade.

## 14.2 Lógica para determinar terceiro de referência

Além de apontar diretamente uma intervenção de referência, pode existir uma lógica que determine qual terceiro deve ser proposto.

O comportamento detalhado parece ser o mesmo objetivo funcional: sugerir um terceiro por padrão, sem obrigatoriedade. A transcrição não detalha como essa lógica é implementada, parametrizada ou mantida.

## 14.3 Restrição para que o terceiro seja diferente do tomador

Outra propriedade permite impedir que o tomador seja utilizado em uma determinada intervenção.

Exemplo explicado:

- se o segurado deve ser diferente do tomador;
- o sistema retorna erro quando se tenta usar o mesmo terceiro.

Também foi dado o caso de pagador:

- se há uma intervenção específica de pagador, pode-se desejar garantir que ele seja diferente do tomador;
- do contrário, segundo a lógica apresentada, não haveria motivo funcional para registrar o pagador separadamente.

---

## 15. Solicitação condicional de intervenções

A configuração permite usar uma lógica para decidir se uma intervenção será solicitada ou não, com base em condições da apólice ou risco.

O exemplo central foi o de risco financiado:

```text
Risco está financiado?
    ├── Sim → solicitar endossatário
    └── Não → não exibir nem solicitar endossatário
```

A apresentadora distingue claramente dois conceitos:

| Situação | Comportamento |
|---|---|
| Intervenção não obrigatória | Ela continua disponível para inclusão, embora possa permanecer vazia. |
| Intervenção não solicitada por lógica | Ela não é exibida; o usuário não tem sequer a possibilidade de incluí-la. |

Essa diferença é funcionalmente relevante, pois separa uma decisão opcional do usuário de uma regra de aplicabilidade definida pelo produto.

---

## 16. Inabilitação condicional de terceiros existentes

Quando existe uma lógica para decidir que uma intervenção não deve mais ser solicitada, pode haver uma configuração adicional para inabilitar os terceiros já existentes naquela intervenção.

O cenário explicado é:

1. uma apólice possui risco financiado;
2. existe um endossatário previamente incluído;
3. em um suplemento, renovação ou movimento posterior, o risco deixa de ser financiado;
4. a condição passa a indicar que a intervenção não deve ser solicitada;
5. a configuração pode decidir se os terceiros já existentes serão inabilitados.

A apresentadora ressalta que essa propriedade só faz sentido quando existe lógica condicional de solicitação. Caso não haja tal lógica, ela não se aplica.

A transcrição não esclarece:

- se “inabilitar” significa apenas ocultar, encerrar vigência, manter histórico ou remover disponibilidade;
- se há auditoria;
- se essa ação afeta integrações;
- se ocorre automaticamente ou depende de confirmação do usuário.

---

## 17. Validações por intervenção

Foi apresentada uma lógica de validação executada após a inclusão de todos os terceiros de uma intervenção.

A apresentadora reforça que essa validação:

- não é executada individualmente por terceiro;
- é executada quando o conjunto de terceiros da intervenção está completo;
- permite avaliar regras que dependem da totalidade da lista.

Exemplo dado:

```text
Máximo genérico configurado: 99 terceiros
Quantidade de membros da família: 5
                ↓
Validação da intervenção:
não permitir mais de 5 terceiros
```

Esse exemplo mostra que a configuração de quantidade pode estabelecer um limite genérico, enquanto uma lógica adicional pode aplicar limites contextuais baseados em outros dados da apólice ou risco.

A reunião não detalha:

- linguagem de regras;
- ferramenta de configuração;
- tipos de erro;
- mensagens exibidas;
- ordem de execução entre diferentes validações;
- possibilidade de warnings em vez de bloqueios.

---

## 18. Momento de solicitação em relação aos atributos de risco

No nível de risco, a reunião afirma que as intervenções podem ser solicitadas:

- antes dos atributos de risco;
- depois dos atributos de risco.

Os atributos são descritos como dados variáveis.

### 18.1 Intervenções antes dos atributos

Devem ser solicitadas antes quando os atributos dependem de informações dos terceiros.

Exemplos:

- calcular e mostrar a idade atual do segurado;
- utilizar dados de condutor, como data de habilitação, para preencher ou calcular um atributo de risco.

A lógica causal apresentada é:

```text
Atributo precisa de informação do terceiro
        ↓
Terceiro deve ser solicitado primeiro
        ↓
Intervenção deve aparecer antes dos atributos de risco
```

### 18.2 Intervenções depois dos atributos

Devem ser solicitadas depois quando a própria aplicabilidade da intervenção depende de dados informados nos atributos do risco.

Exemplo:

```text
Atributo de risco: “o risco está financiado?”
        ↓
Se sim, solicitar endossatário
        ↓
Logo, o atributo deve ser informado antes da intervenção
```

A reunião menciona que, em nível de apólice, existiria apenas a opção “antes dos atributos de apólice”, pois não havia solicitação de outra forma até aquele momento.

> **Limitação explicitamente mencionada:** até o momento da apresentação, não havia demanda para solicitar intervenções em nível de apólice de maneira diferente da posição antes dos atributos.

---

## 19. Demonstração de interface

A apresentadora mostrou exemplos de telas de emissão e de configuração.

## 19.1 Exemplo de ramo com tomadores alternos

No ramo demonstrado, o tomador estava presente como figura fixa e havia tomadores alternos configurados.

A interface exibiria ou habilitaria campos conforme as propriedades previamente definidas. Entre os comportamentos citados:

- preenchimento por referência, quando configurado;
- exigência de terceiro principal, quando aplicável;
- identificação de terceiro de cálculo, quando aplicável;
- solicitação de percentual de participação, quando aplicável;
- solicitação de dados de cessão de direitos, quando aplicável.

O exemplo demonstrado não possuía várias dessas propriedades habilitadas. Por isso, os campos correspondentes apareciam desabilitados.

## 19.2 Validação ao aceitar a lista de terceiros

A lógica de validação da intervenção seria executada quando o usuário concluísse a inclusão dos terceiros e acionasse o botão de aceite.

Isso reforça a distinção entre:

- validação individual durante o preenchimento de um terceiro;
- validação do conjunto completo de terceiros de uma intervenção.

## 19.3 Intervenções no fluxo da emissão

A demonstração mostra que intervenções podem aparecer em etapas distintas do fluxo de emissão:

```text
Dados gerais da apólice
    ↓
Intervenções de apólice, quando aplicáveis
    ↓
Riscos
    ↓
Intervenções antes dos atributos de risco, quando configuradas
    ↓
Atributos de risco
    ↓
Intervenções depois dos atributos de risco, quando configuradas
```

Esse fluxo é uma reconstrução baseada na explicação da apresentadora. A reunião não apresentou um fluxograma visual completo com todas as combinações possíveis.

---

## 20. Relação com TronWeb e gerador de produtos

Ao final, participantes perguntaram se a capacidade explicada existiria também em seu ambiente, descrito como “clássico TronWeb”, sem Reef ou Neutron.

A resposta foi afirmativa, com ressalvas:

- a funcionalidade existe;
- pode estar identificada como “terceiros” em vez de “intervenções”;
- a apresentadora acessou um gerador de produtos para demonstrar onde as definições aparecem;
- foram mostrados campos equivalentes aos discutidos na sessão, como nível de apólice ou risco, quantidade, principalidade e posição antes/depois dos dados variáveis de risco.

Também foi mencionado que uma das equipes define ramos normalmente por script e utiliza o gerador de produtos apenas para algumas atividades.

### O que essa resposta esclarece

A resposta sugere continuidade funcional entre ambientes ou interfaces diferentes:

```text
TronWeb / configuração histórica
        ↓
Conceito de “terceiros”
        ↓
Reef / configuração atual
        ↓
Conceito mais explicitamente apresentado como “intervenções”
```

> **Leitura analítica:** a sessão indica uma mudança de nomenclatura e/ou de apresentação da funcionalidade, não necessariamente uma mudança completa de capacidade de negócio. Entretanto, a reunião não fornece elementos suficientes para afirmar equivalência técnica total entre TronWeb, Reef e Neutron.

---

## 21. Perguntas e respostas relevantes

## 21.1 Pergunta: intervenção é o mesmo que atividade de terceiro?

### O que se queria entender

A dúvida era se ambos os conceitos descreviam o papel de uma entidade e, portanto, se seriam apenas nomes diferentes para a mesma configuração.

### Resposta

Não são a mesma coisa:

- atividade define a atuação geral do terceiro no sistema;
- intervenção define a atuação do terceiro dentro de uma apólice.

Nem toda atividade é uma intervenção de apólice.

### O que isso esclarece

A resposta estabelece uma separação entre cadastro ou classificação corporativa de terceiros e participação contratual no seguro.

---

## 21.2 Pergunta: seguradoras/co-seguradoras são atividades e também intervenções?

### O que se queria entender

A pessoa perguntou se uma companhia co-seguradora, por possuir uma atividade no sistema, também deveria ser tratada como intervenção.

### Resposta

A resposta indica que há uma parte específica para identificar como ocorre o cosseguro e como atua a companhia co-seguradora, mas que isso não é uma intervenção no sentido tratado naquele treinamento.

### O que isso esclarece

Nem toda entidade relevante para a operação de seguro deve ser modelada como interveniente de apólice. Alguns papéis possuem tratamento funcional próprio em outras partes do sistema.

---

## 21.3 Pergunta: a funcionalidade existe em TronWeb?

### O que se queria entender

O participante queria saber se os conceitos demonstrados em Reef ou Neutron já estavam disponíveis em um ambiente que utilizava TronWeb.

### Resposta

A apresentadora informou que sim, embora a funcionalidade possa aparecer como “terceiros” no ramo e não como “intervenções”.

### O que isso esclarece

O conhecimento funcional apresentado pode ser útil também para equipes que não utilizam a interface ou nomenclatura mais recente.

---

## 21.4 Pergunta implícita: por que não criar novas intervenções diretamente no país?

### O que se queria entender

Embora não haja uma pergunta isolada nesse formato, a apresentação responde a essa questão ao explicar as restrições de criação.

### Resposta

Uma nova intervenção pode exigir comportamento próprio do sistema. Criá-la apenas na configuração não faria com que o sistema passasse automaticamente a tratá-la de modo específico. Por isso, é necessário solicitar a inclusão ao core para avaliar o desenvolvimento requerido.

### O que isso esclarece

O catálogo de intervenções representa capacidades funcionais governadas, e não apenas valores livres de parametrização.

---

## 22. Limitações reconhecidas

| Limitação | Evidência ou explicação |
|---|---|
| Novas intervenções não são de criação livre local | Necessitam solicitação ao core e possível desenvolvimento. |
| Pagador ainda não estava 100% funcional | A apresentadora menciona que a funcionalidade estava em incorporação. |
| Propriedade de posição em nível de apólice possui apenas uma opção | Até então, somente antes dos atributos de apólice. |
| Campo VIP é apenas informativo | Não produz comportamento adicional no sistema. |
| Nem toda atividade de terceiro vira intervenção | Algumas atividades são usadas fora da apólice, como em sinistros. |
| Nem toda intervenção participa de cálculo | A identificação de terceiro de cálculo é opcional e depende do produto. |
| Nem toda intervenção se aplica a todos os ramos | A seleção deve ser feita por ramo. |
| A transcrição não é confiável em todos os trechos | Há perdas de áudio, palavras distorcidas e segmentos sem sentido. |

---

## 23. Riscos e desafios

## 23.1 Riscos explicitamente sustentados pela sessão

### Configuração inadequada de dependências

A ordem incorreta de intervenções pode impedir o uso de uma intervenção como referência de outra, pois o dado ainda não terá sido solicitado.

### Aplicação indevida de uma intervenção ao ramo

Incluir intervenções inadequadas pode introduzir perguntas ou campos sem sentido para determinado produto, como solicitar condutor em um ramo não relacionado a veículos.

### Regras de obrigatoriedade mal configuradas

O preenchimento ou não do campo de quantidade pode alterar a obrigatoriedade da intervenção. Uma configuração incorreta pode:

- obrigar dados que deveriam ser opcionais;
- deixar opcionais dados que deveriam ser exigidos.

### Remoção de aplicabilidade para novas operações

A inabilitação de uma intervenção afeta novas inclusões, mas preserva dados existentes de carteira. Isso exige atenção para evitar interpretações erradas sobre o que acontecerá com apólices já emitidas.

### Inconsistência percentual

Quando há validação de soma para 100%, a configuração ou preenchimento incorreto dos percentuais impede a continuidade da operação.

## 23.2 Desafios derivados do contexto — análise

> Esta seção representa interpretação analítica baseada no conteúdo apresentado, e não afirmação literal dos participantes.

### Governança de catálogo versus autonomia local

O modelo busca equilibrar dois objetivos potencialmente conflitantes:

- permitir que países configurem produtos de acordo com sua realidade;
- impedir que cada país crie figuras funcionais sem comportamento consistente no core.

Esse equilíbrio reduz dispersão funcional, mas pode aumentar a dependência de processos centrais para atender necessidades locais.

### Complexidade configuracional

A flexibilidade apresentada é ampla: nível, ordem, obrigatoriedade, número, principalidade, cálculo, percentual, referência, validação e condição. Isso sugere que a configuração de ramos exige conhecimento funcional aprofundado para evitar comportamentos inesperados.

### Dependência entre definição de produto e fluxo de emissão

A posição da intervenção antes ou depois de atributos de risco demonstra que a modelagem do produto precisa considerar não apenas quais dados serão coletados, mas a sequência de coleta e as dependências entre dados.

---

## 24. Transformações estruturais identificadas

> As observações desta seção são leituras analíticas sustentadas pelo conjunto da apresentação.

## 24.1 De cadastro genérico de terceiros para modelagem contextual de papéis

A separação entre atividade e intervenção demonstra que o sistema distingue:

```text
Quem ou o que é o terceiro no ecossistema do sistema
                    ≠
Como esse terceiro participa de uma apólice específica
```

Essa separação permite que uma mesma pessoa ou entidade seja cadastrada com uma atividade geral e assuma participações distintas em diferentes contratos.

## 24.2 De configuração estática para comportamento condicionado

As intervenções não são apenas campos fixos. Elas podem depender:

- de dados do risco;
- de condição de financiamento;
- de referência entre intervenções;
- de lógica de cálculo;
- de validação de conjunto.

Isso indica um modelo de produto configurável que adapta o fluxo de emissão ao contexto da apólice.

## 24.3 De exclusão simples para preservação de carteira

A inabilitação preserva intervenções existentes em apólices de carteira ao mesmo tempo em que impede novas inclusões. Essa abordagem sugere preocupação com evolução controlada do produto e compatibilidade histórica.

## 24.4 De campos isolados para regras compostas

O treinamento deixa claro que propriedades como quantidade, principalidade, cálculo e percentual não devem ser analisadas isoladamente. Elas compõem o comportamento operacional da intervenção dentro do produto.

---

## 25. Números e indicadores citados

| Indicador | Valor mencionado | Contexto |
|---|---:|---|
| Máximo de condutores no exemplo | 3 | Exemplo de quantidade máxima de terceiros em uma intervenção. |
| Mínimo quando há valor configurado | 1 | A apresentadora afirma que, quando configurado, o mínimo passa a ser um terceiro. |
| Exemplo de limite genérico para validação | 99 | Exemplo hipotético de limite amplo, posteriormente restringido por lógica. |
| Exemplo de membros de uma família | 5 | Exemplo hipotético para validação da quantidade de terceiros. |
| Intervenções exclusivas de apólice listadas visualmente | 3 | Tomador, tomadores alternos e pagador. |
| Tipos de intervenções de cliente exibidos na tabela | 13 | Códigos apresentados no frame visual, de 0 a 13 com lacunas. |
| Atividades de terceiros exibidas na tabela | 14 | Códigos de atividade de 1 a 14. |

> Os números acima foram apresentados como exemplos funcionais, configuração visual ou conteúdo de documentação. Não representam métricas auditadas de operação, volumes de apólices ou indicadores corporativos.

---

## 26. O que a reunião não permite concluir

A sessão foi focada em configuração funcional e não fornece detalhes suficientes sobre os seguintes temas:

- tecnologia de infraestrutura utilizada pelo Reef.core;
- linguagem de desenvolvimento;
- arquitetura de APIs;
- existência ou uso de microsserviços;
- banco de dados;
- modelo de dados físico;
- integração com sistemas externos;
- mensageria ou processamento assíncrono;
- mecanismo técnico das lógicas e validações;
- linguagem ou interface usada para desenvolver scripts;
- ciclo de testes;
- CI/CD;
- versionamento de configurações;
- ambientes de desenvolvimento, homologação e produção;
- trilha de auditoria;
- modelo de autenticação e autorização;
- segregação de funções;
- criptografia ou proteção de dados pessoais;
- requisitos regulatórios;
- SLA;
- recuperação de desastre;
- observabilidade;
- custo de criação ou manutenção de intervenções;
- processo formal para solicitação ao core;
- responsáveis por aprovar novas intervenções;
- roadmap detalhado de Reef, Neutron, TronWeb ou pagador;
- equivalência técnica completa entre TronWeb, Reef e Neutron.

Também não é possível determinar com segurança se todas as regras apresentadas são universais para todos os países, companhias e ramos, ou se algumas podem variar por implantação.

---

## 27. Conclusões principais

A sessão estabelece que **intervenções** são um mecanismo funcional essencial para modelar a participação de terceiros em apólices de seguro.

A ideia central é que uma intervenção não descreve genericamente o que um terceiro é no sistema, mas sim como ele participa de uma apólice ou de um risco. Essa distinção separa o cadastro geral de terceiros da configuração específica de produtos de seguro.

O Reef.core fornece um catálogo governado de intervenções. Os países configuram a aplicação dessas intervenções em seus ramos, mas a criação de uma nova figura depende de solicitação ao core porque pode exigir comportamento adicional do sistema.

A configuração por ramo permite controlar:

- onde a intervenção se aplica;
- quando ela aparece;
- se é obrigatória;
- quantos terceiros pode conter;
- se há terceiro principal;
- qual terceiro influencia cálculo;
- como os percentuais são distribuídos;
- quando dados de cessão devem ser solicitados;
- quais referências ou restrições existem entre figuras;
- como regras condicionais e validações devem funcionar.

Por fim, a discussão com os participantes indica que a funcionalidade não é necessariamente exclusiva de ambientes mais novos. Em TronWeb, a mesma capacidade aparentemente existe sob o conceito de “terceiros”, o que reforça que o ponto principal é o entendimento do modelo funcional, e não apenas a interface utilizada.
