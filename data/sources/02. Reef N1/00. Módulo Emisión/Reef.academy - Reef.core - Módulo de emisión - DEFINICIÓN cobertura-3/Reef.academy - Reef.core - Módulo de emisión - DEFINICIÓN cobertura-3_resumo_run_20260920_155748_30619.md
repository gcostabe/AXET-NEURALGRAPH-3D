# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.academy - Reef.core - Módulo de emisión - DEFINICIÓN cobertura-3.mp4`
**Data de processamento:** 20/09/2026 16:02:42
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada — Parametrização de coberturas, franquias, tarifação e revalorização em seguros

> **Base documental:** transcrição de treinamento técnico em espanhol, com trechos possivelmente afetados por reconhecimento automático de voz.  
> **Rastreabilidade:** a transcrição não contém timestamps ou numeração de linhas; por isso, as referências são feitas pelos temas, exemplos e sequências apresentados.  
> **Termos incertos:** a solução principal é citada como “Rift Core” ou “RIFCORE”; a ferramenta de resseguro integrada é citada como “RE21”. Esses nomes foram preservados conforme a transcrição, sem validação externa.

---

## 1. Síntese executiva

A sessão foi um treinamento sobre a configuração de **coberturas de seguros** em um sistema de gestão de apólices, aparentemente denominado **Rift Core/RIFCORE** na transcrição. O foco não foi a operação cotidiana de emissão de uma apólice, mas a definição parametrizada de regras que controlam como cada cobertura se comporta.

Foram discutidos, principalmente:

- relações de dependência entre coberturas;
- capital ou soma segurada;
- cálculo automático de capitais dependentes;
- obrigatoriedade e habilitação de coberturas;
- acessórios em seguros de automóvel;
- resseguro por cobertura;
- inspeção de riscos;
- comissionamento;
- contabilização;
- franquias ou dedutíveis;
- moeda de franquias e tarifas;
- cálculo de prêmio técnico;
- descontos associados a franquias;
- revalorização ou depreciação de capitais.

A mensagem central é que o sistema foi apresentado como uma plataforma altamente parametrizável: uma cobertura não é apenas um item comercial da apólice, mas um objeto configurável com regras de contratação, capital, precificação, resseguro, comissões, inspeção, contabilização, franquias e atualização ao longo do tempo.

A reunião também evidencia uma separação conceitual importante:

```text
Definição corporativa
↓
Associação ao ramo / modalidade / cobertura
↓
Oferta e regras aplicáveis à contratação
↓
Emissão, renovação, suplemento e sinistro
```

---

## 2. Contexto e antecedentes

A sessão parece dar continuidade a um treinamento iniciado anteriormente. Há referências recorrentes a assuntos vistos “ontem”, “há dias” ou “agora veremos”, indicando uma trilha de capacitação sobre a modelagem de ramos, modalidades, coberturas, atributos, comissões, controles técnicos e resseguro.

O contexto principal é o de uma seguradora que precisa configurar produtos de seguros para diferentes ramos — como residencial, automóvel, vida, saúde e outros ramos gerais — sem depender necessariamente de desenvolvimento específico para cada regra de negócio.

A lógica apresentada parte de uma definição genérica de cobertura e permite que seu comportamento seja refinado por:

- ramo;
- modalidade;
- tipo de risco;
- tipo de veículo;
- data de vigência;
- regras de negócio;
- parametrizações de capital, franquia e tarifa.

Os exemplos mais recorrentes foram:

| Exemplo | Contexto utilizado |
|---|---|
| Continente | Estrutura física de uma residência: paredes, teto e pisos. |
| Roubo | Cobertura dependente do capital de continente. |
| Incêndio | Exemplo de cobertura com 100% do capital de outra cobertura. |
| Danos por água | Exemplo de cobertura com percentual inferior sobre uma base. |
| Responsabilidade civil de automóvel | Exemplo de cobertura que, em princípio, não exige inspeção nem depende de acessórios. |
| Danos ao próprio veículo | Exemplo de cobertura afetada por acessórios e potencialmente sujeita a inspeção. |
| Assistência sanitária / hospitalar | Exemplo para franquias e tarifas. |

---

## 3. Problemas e necessidades tratados

### 3.1 Necessidade de vincular coberturas entre si

O primeiro problema tratado foi a necessidade de configurar coberturas cujo capital não é informado de maneira totalmente independente.

No exemplo residencial, a cobertura de **roubo** foi configurada para depender da cobertura de **continente**. Isso evita que a cobertura dependente tenha um capital arbitrário ou incompatível com a cobertura principal.

A relação apresentada foi:

```text
Continente
↓
define ou fornece a base de capital
↓
Roubo
↓
recebe um percentual do capital de continente
```

A consequência prática é que, se a soma segurada de continente for alterada, o capital de roubo pode ser recalculado automaticamente segundo o percentual configurado.

---

### 3.2 Necessidade de impedir contratações incoerentes

A dependência não foi apresentada apenas como um mecanismo de cálculo de capital.

Segundo a explicação, se uma cobertura dependente estiver vinculada a uma cobertura principal e esta não possuir capital ou não estiver presente na contratação, as coberturas dependentes não poderão ser contratadas.

Assim, a dependência opera em duas dimensões:

1. **financeira**, pois o capital da cobertura filha é derivado do capital da cobertura pai;
2. **de elegibilidade**, pois a existência da cobertura pai condiciona a contratação da cobertura filha.

---

### 3.3 Necessidade de configurar produtos por contexto comercial

A reunião demonstrou que uma mesma cobertura pode ter comportamentos diferentes conforme a modalidade de produto.

Por exemplo, uma cobertura pode ser definida como obrigatória no nível do ramo, mas tornar-se opcional em uma modalidade específica, como uma modalidade hipotética chamada “Bronze”.

Isso atende à necessidade de reutilizar uma mesma definição-base em produtos comerciais diferentes, sem duplicar toda a estrutura da cobertura.

---

### 3.4 Necessidade de governar risco, resseguro e retenção de apólices

O treinamento abordou a necessidade de decidir, cobertura por cobertura:

- se ela é cedida ao resseguro;
- qual política de resseguro será aplicada;
- o que acontece se a cessão não puder ser realizada;
- se a apólice deve ser retida por controle técnico.

A regra apresentada reduz o risco de emitir uma apólice cuja parcela de risco deveria ter sido ressegurada, mas não pôde ser distribuída devido a restrições operacionais ou contratuais.

---

### 3.5 Necessidade de modelar franquias de maneira flexível

A franquia — também chamada de dedutível — foi tratada como uma configuração que pode afetar:

- a responsabilidade financeira do segurado no sinistro;
- os limites de cobertura;
- o valor do prêmio;
- a forma de contratação;
- a moeda aplicável;
- os mínimos e máximos de responsabilidade do segurado.

A necessidade central é permitir que cada cobertura ofereça diferentes alternativas de franquia e que essas alternativas possam variar por ramo, modalidade, cobertura e, no caso de automóveis, tipo de veículo.

---

### 3.6 Necessidade de separar prêmio técnico de condições comerciais

A reunião distinguiu a precificação “pura” ou técnica da cobertura de outros fatores comerciais.

O valor técnico da cobertura foi descrito como aquele que não deveria incluir, ao menos conceitualmente:

- impostos;
- campanhas;
- descontos comerciais;
- recargos comerciais.

A intenção é separar:

```text
Prêmio técnico da cobertura
↓
ajustes, descontos, recargos e campanhas
↓
impostos e demais componentes
↓
valor final da apólice
```

A transcrição não detalha o fluxo integral de cálculo do prêmio final nem os componentes posteriores à tarifa técnica.

---

## 4. Solução apresentada: modelo de cobertura parametrizável

A solução apresentada é um modelo de definição de cobertura com atributos que controlam seu ciclo de vida e comportamento operacional.

Uma cobertura pode concentrar regras relativas a:

- tipo de capital;
- relação de dependência;
- percentual de participação;
- obrigatoriedade;
- acessórios de veículo;
- resseguro;
- inspeção;
- comissões;
- impressão em documentos;
- habilitação para novas apólices;
- ramo contábil;
- franquias;
- moeda;
- tarifa;
- revalorização;
- lógicas de negócio.

A reunião sugere que a plataforma busca evitar que essas decisões precisem ser codificadas individualmente para cada produto. Em vez disso, regras são declaradas em cadastros e objetos parametrizáveis.

> **Leitura analítica:** a arquitetura funcional apresentada aponta para um modelo orientado a configuração, no qual o comportamento do produto é composto por parâmetros e lógicas de negócio referenciadas. Isso reduz a dependência de regras rígidas embutidas diretamente no processo de emissão.

---

## 5. Arquitetura funcional reconstruída

A transcrição não apresentou um diagrama técnico formal de infraestrutura, APIs, bancos de dados ou microsserviços. Portanto, não é possível concluir a arquitetura tecnológica da plataforma.

Ainda assim, é possível reconstruir a arquitetura funcional descrita:

```text
Definições corporativas
├── Coberturas
├── Franquias
├── Índices de atualização
├── Moedas
├── Lógicas de negócio
├── Regras de comissão
├── Regras de resseguro
└── Ramos contábeis
        ↓
Configuração de ramo
├── Tratamento do ramo
├── Coberturas aplicáveis
├── Regras de resseguro
├── Regras de franquia
└── Regras de contabilização
        ↓
Modalidades
├── Ajustes sobre a definição do ramo
└── Possibilidade de sobrepor obrigatoriedade
        ↓
Contratação / emissão
├── Seleção de coberturas
├── Definição de capital
├── Declaração de acessórios
├── Escolha ou cálculo de franquia
├── Conversão de moeda
├── Aplicação de tarifa
└── Controles técnicos
        ↓
Operação posterior
├── Renovação
├── Suplementos
├── Sinistros
├── Resseguro
├── Comissões
└── Fechamentos contábeis
```

> **Importante:** este desenho é uma consolidação analítica das relações explicadas na reunião. Não corresponde a um diagrama literal exibido pelo instrutor.

---

## 6. Relação entre coberturas

### 6.1 Cobertura principal e cobertura dependente

A reunião introduziu um tipo de cobertura chamado, na transcrição, de **“real dependente”**. O nome pode ter sido afetado pelo reconhecimento automático de voz, mas seu comportamento foi explicado de forma clara.

Esse tipo de cobertura possui:

- capital;
- prêmio;
- dependência em relação a outra cobertura.

A cobertura dependente foi representada como uma “filha”, enquanto a cobertura que fornece a base é representada como “mãe” ou “pai”.

No exemplo:

```text
Cobertura principal: Continente
Cobertura dependente: Roubo
```

A cobertura de roubo depende de continente porque seu capital nasce da soma segurada da cobertura principal.

---

### 6.2 Relação por chave, não por nome

O vínculo entre coberturas não é estabelecido pelo nome textual exibido ao usuário.

A reunião esclareceu que a associação é feita por uma **chave identificadora da cobertura**. O instrutor reforçou que praticamente todas as definições do sistema possuem uma chave.

Representação lógica:

```text
Cobertura 2
↓ depende de
Chave da Cobertura 1
```

No exemplo didático:

```text
Cobertura de roubo
↓
depende da chave da cobertura de continente
```

---

### 6.3 Percentual de participação

Após definir de qual cobertura a dependente deriva, é preciso configurar em qual percentual ela participa do capital da cobertura principal.

Exemplo apresentado:

```text
Capital de continente: 100.000
Percentual de roubo: 80%
Capital de roubo: 80.000
```

Outros percentuais citados como possíveis:

- 100%;
- 75%;
- 50%;
- 30%;
- 80%.

Foi perguntado se um percentual de 200% seria permitido. A resposta foi incerta: o instrutor acreditava que talvez fosse possível, mas não confirmou e afirmou que verificaria posteriormente.

> **Limitação explícita:** a transcrição não confirma se a plataforma aceita percentuais superiores a 100% para uma cobertura dependente.

---

### 6.4 Efeito da dependência sobre a contratação

A dependência afeta mais do que o cálculo do capital.

Segundo o treinamento, se não houver capital informado para a cobertura principal, todas as coberturas dependentes dela deixam de ser contratáveis.

Exemplo:

```text
Sem capital de continente
↓
Cobertura de roubo dependente não pode ser contratada
```

Essa regra evita a existência de uma cobertura de roubo vinculada a uma base inexistente ou indefinida.

---

### 6.5 Efeito da revalorização sobre coberturas dependentes

Se a cobertura principal for revalorizada, a dependente pode ser ajustada automaticamente.

Exemplo mencionado:

```text
Continente inicial: 100.000
Revalorização: 3%
Continente renovado: 103.000
Roubo: 80% de continente
Roubo renovado: 82.400
```

A cobertura dependente não precisaria necessariamente de uma revalorização própria se seu capital for completamente derivado da principal.

> **Leitura analítica:** a dependência cria um encadeamento de atualização. Em vez de recalcular cada cobertura manualmente, a atualização da cobertura-base propaga seu efeito para as coberturas dependentes.

---

## 7. Capital, soma segurada e atualização de valor

### 7.1 Continente como referência de valor

No exemplo residencial, “continente” foi explicado como a parte estrutural da residência:

- paredes;
- teto;
- pisos;
- estrutura do imóvel.

Foi sugerido que esse capital poderia representar o valor da residência vazia, ou seja, sem considerar necessariamente conteúdo, bens ou itens pessoais.

---

### 7.2 Valor de compra não é necessariamente soma segurada

A reunião destacou que o valor pago pelo imóvel não significa automaticamente que esse será o valor segurado.

Foram mencionadas possibilidades como:

- uso de baremos;
- valor cadastral;
- preço por metro quadrado;
- multiplicação por área;
- informação fornecida pelo cliente;
- lógica aplicada antes da solicitação ou contratação da cobertura.

No contexto da Espanha, foi citado o valor cadastral como referência potencial, em contraposição ao valor de mercado.

> **Limitação:** a reunião não definiu qual método deve ser usado em cada país, produto ou seguradora. O ponto enfatizado foi a flexibilidade de parametrização.

---

### 7.3 Atualização por renovação

Foi explicado que o capital pode ser revalorizado ou depreciado na renovação da apólice.

Uma possibilidade é usar o IPC — índice de inflação ou custo de vida mencionado na reunião.

Exemplo:

```text
Capital atual: 100.000
IPC: 3%
Capital na próxima renovação: 103.000
```

O cliente também passaria a pagar um prêmio compatível com o novo capital segurado.

---

### 7.4 Alteração por suplemento

Caso não haja revalorização automática, o capital pode ser alterado por suplemento, desde que as regras de negócio permitam.

Exemplo apresentado:

```text
Capital atual: 100.000
Cliente deseja alterar: 105.000
↓
Emissão de suplemento
↓
Capital atualizado
```

---

### 7.5 Subseguro e impacto em sinistros

A reunião introduziu, sem aprofundar o processo de sinistros, o risco de subseguro.

Foi dado o exemplo de um imóvel declarado com soma segurada de 100.000, embora seu valor real fosse 300.000. Segundo a explicação, em certos contextos de sinistro pode ser aplicada uma proporcionalidade entre a soma segurada e o valor efetivo do bem.

Exemplo didático:

```text
Soma segurada declarada: 100.000
Valor efetivo estimado: 300.000
Relação: 1/3
↓
Possível indenização proporcional
```

Foi mencionado o exemplo de substituição de um lavabo, em que a seguradora talvez não pagasse 100% do item se o imóvel estivesse subsegurado.

> **Limitação explícita:** o instrutor afirmou que esse tema pertence mais ao domínio de sinistros e não detalhou quais regras exatas de proporcionalidade ou regulação são aplicadas.

---

## 8. Obrigatoriedade e sobreposição por modalidade

### 8.1 Obrigatoriedade no nível da cobertura

A cobertura pode ser marcada como obrigatória ou não obrigatória.

Isso permite que a seguradora defina se o cliente terá liberdade para optar pela contratação.

```text
Cobertura obrigatória
↓
deve ser incluída na contratação
```

ou:

```text
Cobertura opcional
↓
cliente pode contratar ou não
```

---

### 8.2 Modalidade pode sobrescrever a definição do ramo

Uma regra importante apresentada é que a modalidade pode alterar a obrigatoriedade definida para a cobertura no nível do ramo.

Exemplo:

```text
Definição do ramo:
Continente = obrigatória

Modalidade Bronze:
Continente = não obrigatória
```

Nesse caso, ao contratar a modalidade Bronze, a cobertura deixa de ser obrigatória.

A conclusão apresentada foi:

```text
Definição da modalidade
↓ sobrescreve
Definição da cobertura no ramo
```

> **Leitura analítica:** o modelo parece utilizar uma hierarquia de parametrização em que a modalidade funciona como uma camada de especialização comercial do ramo.

---

## 9. Acessórios em seguros de automóvel

### 9.1 Aplicabilidade restrita a ramos com tratamento de automóvel

A propriedade de acessórios foi apresentada como exclusiva de ramos que utilizam tratamento de automóveis.

A transcrição menciona diferentes tratamentos de ramo, como:

- automóveis;
- vida;
- transportes;
- diversos ou gerais.

Não foram detalhados tecnicamente os critérios de cada tratamento.

---

### 9.2 Objetivo da declaração de acessórios

A propriedade determina se a contratação da cobertura pode ser afetada por acessórios adicionados ao veículo após sua compra.

Exemplos citados:

- rodas de liga leve;
- proteções dianteiras e traseiras;
- itens adicionais instalados pelo proprietário.

---

### 9.3 Coberturas afetadas e não afetadas

O exemplo distinguiu duas coberturas:

| Cobertura | Relação com acessórios |
|---|---|
| Responsabilidade civil | Em princípio, não é afetada pelos acessórios. |
| Danos ao próprio veículo | Pode ser afetada, pois o capital pode incluir o veículo e seus acessórios. |

Quando alguma cobertura da contratação exige declaração de acessórios, o sistema abre uma tela para que a pessoa responsável pela emissão informe os itens adicionais.

Essa tela foi descrita como não obrigatória: se o cliente não quiser declarar os acessórios, não precisa fazê-lo. Porém, itens não declarados não estarão cobertos.

Exemplo:

```text
Acessório instalado e declarado
↓
pode integrar a cobertura

Acessório instalado e não declarado
↓
não será coberto em eventual sinistro
```

---

## 10. Resseguro por cobertura

### 10.1 Conceito explicado

O resseguro foi explicado como a cessão de parte do risco da seguradora para outras seguradoras ou resseguradoras.

A seguradora que emite a apólice pode não querer ou não poder reter 100% do risco assumido. Assim, distribui parte desse risco conforme contratos ou políticas de resseguro.

A explicação reforçou que, em situações normais, o cliente final não necessariamente percebe esse processo.

---

### 10.2 Resseguro, cosseguro e facultativo

A reunião diferenciou, de maneira resumida:

| Conceito | Explicação apresentada |
|---|---|
| Resseguro | Distribuição do risco entre seguradora e outras companhias, normalmente sem percepção direta do cliente. |
| Cosseguro | Situação em que o cliente tem conhecimento, pois há participação compartilhada de seguradoras. |
| Facultativo | Caso que pode exigir informações adicionais, frequentemente quando os capitais superam capacidades ou não se enquadram nos contratos usuais. |

> **Limitação:** a reunião não apresentou definição jurídica completa nem fluxo operacional detalhado para cosseguro, resseguro facultativo ou contratos automáticos.

---

### 10.3 Política individual por cobertura

O sistema permite definir se cada cobertura será ou não cedida ao resseguro.

Isso significa que uma mesma apólice pode conter:

```text
Cobertura A → cedida ao resseguro
Cobertura B → não cedida ao resseguro
Cobertura C → cedida sob política ou contrato distinto
```

O processo de resseguro é descrito como realizado cobertura a cobertura:

1. verifica se a cobertura é ressegurável;
2. identifica a política ou os contratos aplicáveis;
3. distribui o risco conforme a configuração.

---

### 10.4 Retenção de apólice quando a cessão falha

Se uma cobertura marcada para resseguro não puder ser distribuída, a apólice pode ficar retida por controle técnico.

Motivos exemplificados:

- contrato de resseguro vencido;
- contrato inativo;
- capital acima da capacidade disponível;
- impossibilidade de realizar a distribuição.

A retenção foi apresentada como uma regra embutida no sistema para esse cenário, não exigindo a criação de um controle técnico manual.

Exemplo:

```text
Cobertura exige resseguro
↓
Distribuição não pode ser realizada
↓
Erro de controle técnico
↓
Apólice fica retida
```

---

### 10.5 Exceção associada à integração com “RE21”

Foi apresentada uma exceção quando há integração com uma ferramenta chamada “RE21”.

Segundo a transcrição, caso exista integração e a companhia tenha configurado que a emissão deve continuar mesmo quando a distribuição não pôde ser efetuada, a apólice pode não ficar retida.

O instrutor observou que isso representa um risco e depende de decisão da companhia.

A lógica descrita foi:

```text
Sem integração ou sem exceção configurada
↓
Não foi possível distribuir ao resseguro
↓
Apólice retida

Com integração com “RE21” e exceção configurada
↓
Não foi possível distribuir ao resseguro
↓
Companhia pode permitir continuidade da emissão
```

> **Termo incerto:** “RE21” foi preservado conforme a transcrição. Não há elementos suficientes para identificar a ferramenta com segurança.  
> **Termo incerto:** “Rift Core” foi descrito como integrado a um módulo de resseguro que, segundo o instrutor, não faria parte direta de “Rift”, mas estaria integrado a ele.

---

## 11. Inspeção de risco

### 11.1 Objetivo da propriedade

A cobertura pode indicar se sua contratação exige inspeção do risco.

A inspeção foi apresentada como um mecanismo para verificar o estado prévio do bem e reduzir risco de fraude ou disputa sobre danos preexistentes.

---

### 11.2 Exemplo: responsabilidade civil versus danos próprios

| Cobertura | Necessidade de inspeção segundo o exemplo |
|---|---|
| Responsabilidade civil | Em princípio, não exige inspeção, pois cobre danos causados a terceiros. |
| Danos ao próprio veículo | Pode exigir inspeção, especialmente para veículos não novos. |

A responsabilidade civil cobre danos a pessoas ou bens de terceiros provocados pelo veículo.

Já a cobertura de danos ao próprio veículo cobre os danos sofridos pelo próprio veículo segurado, inclusive em situações em que o segurado tenha sido responsável pelo acidente.

---

### 11.3 Razão para inspecionar danos ao próprio veículo

A inspeção é relevante porque o veículo pode já possuir danos antes da contratação.

Sem inspeção, um segurado poderia tentar incluir danos antigos como se fossem decorrentes de um sinistro posterior.

A reunião apresentou o seguinte raciocínio:

```text
Veículo não novo
↓
pode possuir danos preexistentes
↓
inspeção identifica e registra tais danos
↓
sinistro posterior pode ser analisado com base no estado prévio
```

---

## 12. Comissões de nova produção e carteira

A cobertura pode controlar se gera comissões de:

- nova produção;
- carteira.

A reunião reforçou que, mesmo que a tabela de comissões preveja um percentual — como 10% — a cobertura pode impedir o cálculo dessa comissão.

Exemplo:

```text
Tabela de comissão prevê: 10%
Cobertura marcada como “não paga comissão de nova produção”
↓
Comissão não é calculada para essa cobertura
```

As combinações citadas como possíveis incluem:

- pagar nova produção e carteira;
- pagar nova produção e não pagar carteira;
- não pagar nova produção e pagar carteira;
- não pagar nenhuma das duas.

> **Leitura analítica:** a regra de comissão parece resultar da combinação entre a tabela de comissões e atributos específicos da cobertura. A cobertura pode funcionar como uma regra restritiva ou habilitadora sobre a tabela.

---

## 13. Impressão, habilitação e ciclo de vida da cobertura

### 13.1 Impressão de cobertura não contratada

A reunião explicou que uma cobertura pode ser impressa no documento da apólice mesmo quando não tiver sido contratada.

Nesse caso, ela apareceria como não incluída ou excluída da contratação.

Essa configuração pode ser útil quando a companhia deseja deixar explícito ao cliente que determinada proteção existe no produto, mas não foi adquirida.

---

### 13.2 Habilitação para novas apólices

A propriedade “habilitada/inabilitada” define se a cobertura pode continuar sendo oferecida em novas contratações.

```text
Cobertura habilitada
↓
pode aparecer para novas apólices

Cobertura inabilitada
↓
não aparece para novas apólices
```

---

### 13.3 Tratamento da carteira existente

A inabilitação não elimina automaticamente a cobertura das apólices já emitidas.

As apólices existentes continuam podendo trabalhar com a cobertura, inclusive para:

- suplementos;
- renovação;
- demais operações relacionadas.

Porém, caso a cobertura seja retirada na renovação, não poderá ser adicionada novamente posteriormente, pois já está inabilitada para novas inclusões.

---

## 14. Ramo contábil

O ramo contábil foi explicado como a definição de onde ou como a cobertura será contabilizada.

O sistema realiza contabilização no nível de cobertura, especialmente em processos de fechamento citados como:

- anuais;
- trimestrais;
- outros processos de fechamento, embora a transcrição tenha ruídos nesse trecho.

A definição do ramo contábil orienta a destinação da informação contábil associada à cobertura.

O instrutor indicou que essa parametrização normalmente é definida pelo departamento:

- contábil;
- financeiro.

A reunião não detalhou:

- plano de contas;
- lançamentos contábeis;
- eventos geradores;
- critérios de reconhecimento;
- integração contábil;
- normas regulatórias aplicáveis.

---

## 15. Franquias e dedutíveis

## 15.1 Conceito

A franquia, também chamada de dedutível, representa a parcela do custo do sinistro que fica sob responsabilidade do segurado.

Ela pode ser usada para:

1. compartilhar o custo do sinistro entre segurado e seguradora;
2. limitar ou postergar o início de determinadas prestações.

---

### 15.2 Exemplo de franquia fixa por valor

Foi apresentado o exemplo de uma franquia de 1.000 unidades monetárias.

```text
Franquia: 1.000
Custo do sinistro: 900
Responsabilidade do segurado: 900
Responsabilidade da seguradora: 0
```

Nesse caso, como o sinistro não ultrapassa a franquia, o segurado arca integralmente com o custo.

---

### 15.3 Exemplo de franquia percentual

Foi apresentado um sinistro de 900 unidades monetárias com franquia de 10%.

```text
Custo do sinistro: 900
Franquia: 10%
Responsabilidade do segurado: 90
Responsabilidade da seguradora: 810
```

Nesse modelo, segurado e seguradora compartilham o custo do sinistro.

---

### 15.4 Franquias em dias ou horas

A franquia não precisa ser exclusivamente financeira.

Foram citados exemplos baseados em tempo:

| Tipo | Exemplo |
|---|---|
| Dias | Internação hospitalar com franquia de cinco dias. |
| Horas | Possível utilização em serviços como assistência residencial. |

No exemplo hospitalar:

```text
Franquia: cinco dias
Duração da internação: seis dias
↓
Segurado suporta os cinco primeiros dias
Seguradora suporta o período excedente
```

No exemplo de veículo substituto, a reunião indicou que limites de tempo também podem controlar o benefício, embora não tenha detalhado se esse caso é tratado exatamente pela mesma estrutura de franquia.

---

## 16. Tipos de franquia disponíveis

Segundo a reunião, os tipos de franquia disponíveis no sistema são fixos:

| Tipo | Significado |
|---|---|
| Percentual | Segurado assume um percentual definido. |
| Importe | Segurado assume valor monetário definido. |
| Dias | Segurado assume determinada quantidade de dias. |
| Horas | Segurado assume determinada quantidade de horas. |

A franquia possui uma chave identificadora, como os demais objetos de configuração.

A estrutura conceitual apresentada foi:

```text
Franquia
├── Chave
├── Tipo
├── Valor
└── Moeda, quando aplicável a importes
```

---

## 17. Moeda da franquia

Quando a franquia é do tipo valor monetário, sua moeda deve ser definida.

A reunião esclareceu que a moeda da franquia não precisa ser igual à moeda da soma segurada da cobertura.

Exemplo citado:

```text
Soma segurada: libra esterlina
Franquia: dólares
```

O sistema permite tanto:

```text
Mesma moeda da cobertura
```

quanto:

```text
Moeda da franquia diferente da moeda da cobertura
```

Foi mencionado que essa flexibilidade pode ser relevante em contextos de inflação ou de indexação de determinados valores.

> **Limitação:** a reunião não detalha como são tratadas conversões, arredondamentos, datas de câmbio ou regras de sinistro quando soma segurada e franquia utilizam moedas diferentes.

---

## 18. Associação de franquias a ramo, modalidade e cobertura

A franquia é primeiramente definida em nível corporativo e depois associada ao contexto em que poderá ser utilizada.

A associação pode considerar:

- ramo;
- modalidade, no caso de vida;
- cobertura;
- tipo de veículo, no ramo de automóveis;
- vigência ou versão.

A reunião apresentou a seguinte lógica:

```text
Definição corporativa de franquia
↓
Associação ao ramo
↓
Associação à cobertura
↓
Oferta ao cliente no momento da contratação
```

---

### 18.1 Oferta de múltiplas franquias

Uma cobertura pode oferecer várias opções ao cliente.

Exemplo:

```text
Opções percentuais:
10%, 20%, 30%

Opções por valor:
100, 200, 300 unidades monetárias
```

No momento da contratação, o cliente ou operador pode selecionar uma entre as franquias oferecidas.

---

### 18.2 Franquia por tipo de veículo

No ramo automóvel, as franquias podem variar conforme o tipo de veículo.

Exemplos de tipos mencionados:

- automóvel;
- motocicleta;
- caminhão;
- ônibus;
- pick-up;
- furgoneta.

Assim, uma franquia de 10% poderia estar disponível para automóveis e motocicletas, mas não para caminhões ou furgonetas.

---

### 18.3 Vigência e versão

A associação da franquia possui data de validade, descrita como equivalente ao conceito de versão.

Isso indica que a oferta de franquias pode ser modificada ao longo do tempo sem necessariamente alterar contratos já emitidos.

---

## 19. Franquia padrão, franquia obrigatória e franquia zero

### 19.1 Franquia padrão

Quando uma cobertura disponibiliza várias franquias, uma delas pode ser marcada como padrão.

Exemplo:

```text
Franquias ofertadas: 10%, 20%, 30%
Franquia padrão: 20%
```

Na contratação, a franquia de 20% aparece inicialmente selecionada, embora o usuário possa alterá-la se houver permissão.

---

### 19.2 Cobertura configurada para trabalhar com franquia

A transcrição indica que uma cobertura pode ser declarada como tendo franquia.

Quando isso ocorre, a contratação de uma franquia torna-se obrigatória.

A dúvida levantada foi: como atender situações em que a companhia não quer aplicar franquia, embora a cobertura seja configurada para trabalhar com ela?

A resposta foi definir uma franquia de 0%.

Exemplo:

```text
Cobertura trabalha com franquia
↓
Franquia selecionada: 0%
↓
Seguradora assume integralmente o sinistro
```

Essa solução preserva a regra estrutural de que a cobertura possui franquia, mas permite comercializar uma opção sem participação financeira do segurado.

---

## 20. Mínimos e máximos de franquia

A franquia pode conter limites mínimos e máximos.

### 20.1 Mínimo

As opções mencionadas para o mínimo foram:

| Forma | Exemplo |
|---|---|
| Sem mínimo | Aplica-se apenas o valor normal da franquia. |
| Percentual da soma segurada | Mínimo de 2% da soma segurada. |
| Valor fixo | Mínimo de 100 unidades monetárias. |
| Lógica de negócio | Valor calculado conforme características da apólice. |

Exemplo:

```text
Franquia: 10% do sinistro
Mínimo: 100
↓
Mesmo que 10% resulte em 30, o segurado paga ao menos 100.
```

---

### 20.2 Máximo

Também é possível limitar o valor máximo suportado pelo segurado.

As alternativas citadas foram:

| Forma | Exemplo |
|---|---|
| Sem máximo | Não há teto configurado. |
| Percentual da soma segurada | Máximo de 3% da soma segurada. |
| Valor fixo | Máximo de 300 unidades monetárias. |
| Lógica de negócio | Teto definido dinamicamente. |

Exemplo:

```text
Franquia: 10%
Máximo: 300
↓
Mesmo que o percentual resulte em valor maior, o segurado não paga mais de 300.
```

Os limites não são obrigatórios. Uma franquia pode ter:

- apenas mínimo;
- apenas máximo;
- mínimo e máximo;
- nenhum dos dois.

---

## 21. Base de cálculo da franquia

A franquia pode incidir sobre:

- custo do sinistro;
- soma segurada.

Exemplo:

```text
Franquia de 10% sobre o custo do sinistro
```

não é equivalente a:

```text
Franquia de 10% sobre a soma segurada
```

A reunião não detalhou como essa escolha interage com todos os tipos de cobertura, mas deixou claro que a base precisa ser explicitamente configurada.

---

## 22. Efeito da franquia no prêmio

A contratação de franquia foi associada, em geral, a uma redução de prêmio.

O raciocínio apresentado foi:

```text
Maior participação do segurado no sinistro
↓
Menor risco financeiro suportado pela seguradora
↓
Possibilidade de prêmio menor
```

Exemplo didático:

```text
Cobertura sem franquia: prêmio de 100
Cobertura com determinada franquia: prêmio de 70 ou 80
```

---

### 22.1 Desconto incluído na tarifa ou calculado separadamente

O sistema permite duas abordagens:

1. o efeito da franquia já está embutido no cálculo da tarifa da cobertura;
2. o desconto da franquia é configurado separadamente.

Quando o desconto não estiver incluído na tarifa, pode ser calculado por:

- percentual;
- tanto por mil;
- valor fixo;
- lógica de negócio.

Exemplos citados:

```text
Franquia de 10%
↓
desconto de 3%
```

ou:

```text
desconto fixo de 6 unidades monetárias
```

ou:

```text
desconto calculado por lógica de negócio
```

> **Limitação:** a reunião não detalha a ordem exata entre cálculo da tarifa, desconto de franquia, outros descontos, campanhas, impostos e recargos.

---

## 23. Lógica de negócio aplicada à franquia

Além da franquia padrão, a plataforma permite associar uma lógica de negócio à cobertura.

Essa lógica pode determinar, no momento da contratação:

- qual franquia se aplica;
- quais mínimos e máximos devem valer;
- se o operador pode alterar a franquia.

Exemplo apresentado:

```text
Franquias disponíveis: 10%, 20%, 30%
Padrão configurado: 20%

Lógica de negócio avalia a apólice
↓
determina que deve ser aplicada a franquia de 30%
↓
define mínimo de 200
↓
define máximo de 1.000
↓
bloqueia alteração pelo operador
```

A lógica não cria uma franquia fora do conjunto definido; ela seleciona ou ajusta elementos dentro das opções configuradas.

---

## 24. Cálculo de prêmio técnico

### 24.1 Conceito de prêmio “puro”

A reunião passou a tratar do custo da cobertura, descrito como prêmio puro ou técnico.

Esse valor deveria representar o custo técnico da cobertura antes de elementos como:

- impostos;
- campanhas comerciais;
- descontos comerciais;
- recargos comerciais.

Foi relacionado ao valor que permitiria à seguradora suportar sinistros e operar de forma economicamente sustentável.

> **Ressalva:** o instrutor reconheceu que a realidade comercial pode alterar esse valor posteriormente.

---

### 24.2 Moeda da tarifa

A tarifa de uma cobertura pode ter moeda própria, diferente:

- da moeda do país;
- da moeda de emissão da apólice;
- da moeda da soma segurada.

Exemplo apresentado:

```text
País: México
Moeda local: peso mexicano
Tarifa da cobertura: dólar
Apólice emitida em: euro
```

Segundo a explicação, o sistema realiza as conversões de moeda e aplica os tipos de câmbio necessários nos processos de emissão e suplemento.

> **Limitação:** não foram informados a fonte dos câmbios, a periodicidade de atualização, as regras de arredondamento ou o momento exato em que cada taxa é aplicada.

---

### 24.3 Tarifa com moeda explícita

No exemplo da cobertura de roubo, a tarifa era baseada em faixas de soma segurada e valores fixos já expressos em moeda.

Exemplo ilustrativo da transcrição:

| Faixa de soma segurada | Prêmio fixo |
|---|---:|
| 1.000 a 10.000 | 80 dólares |
| Acima de 10.000 até 20.000 | 180 dólares |
| Demais faixas | Valores progressivos até 50.000, sem detalhamento integral na transcrição |

Nesse caso, como há valor monetário fixo, a tarifa precisa ter moeda definida para permitir conversão quando a apólice for emitida em outra moeda.

---

### 24.4 Tarifa por taxa

No exemplo de assistência sanitária, a tarifa também usava intervalos de soma segurada, mas era baseada em taxa, e não em valor monetário fixo.

Exemplo:

```text
Faixa de soma segurada
↓
aplicação de taxa de 0,80
```

A transcrição não deixa absolutamente claro se “0,80” representa percentual, taxa específica ou outra convenção de cálculo. O ponto central é que a tarifa, nesse caso, não precisava necessariamente ser declarada em uma moeda fixa, pois a taxa seria aplicada sobre uma base monetária da própria apólice.

---

## 25. Métodos de cálculo de tarifa

A reunião listou as seguintes possibilidades para calcular o prêmio técnico de uma cobertura:

| Método | Descrição |
|---|---|
| Percentual sobre soma segurada | Aplica percentual sobre o capital segurado. |
| Tanto por mil | Aplica taxa por mil sobre a soma segurada. |
| Importe fixo | Define valor monetário fixo. |
| Lógica de negócio | Delegação do cálculo a uma lógica parametrizada. |
| Tarifa padrão | Mencionada, mas não detalhada durante a sessão. |
| Sem cálculo | Possibilidade de oferecer a cobertura sem custo. |

---

### 25.1 Percentual sobre soma segurada

Exemplo citado:

```text
Soma segurada: 26.000
Taxa: 0,5%
Prêmio: 130
```

A moeda final depende do contexto aplicável à cobertura e à apólice.

---

### 25.2 Tanto por mil

Exemplo citado:

```text
Soma segurada: 26.000
Taxa: 7 por mil
Prêmio: 182
```

---

### 25.3 Importe fixo

Exemplo citado:

```text
Prêmio fixo: 600 dólares
```

---

### 25.4 Lógica de negócio

O sistema permite que uma lógica de negócio determine o cálculo.

A transcrição indica que essa é uma alternativa amplamente utilizada, afirmando que “em 29,9% das vezes” se utiliza lógica. O valor foi preservado exatamente como aparece, embora seja incomum e não haja contexto metodológico sobre a origem desse percentual.

Foi também mencionada uma lógica chamada “tarifa multivariável”, que seria explicada posteriormente.

> **Limitação explícita:** a tarifa multivariável foi apenas anunciada; seu funcionamento não foi apresentado nesta transcrição.

---

### 25.5 Cobertura sem cálculo

Foi indicada a possibilidade de “regalar” uma cobertura, isto é, atribuir custo zero diretamente.

O instrutor observou que isso não seria necessariamente a forma mais limpa de modelagem. Uma alternativa preferível poderia ser:

```text
Cobertura possui prêmio técnico
↓
desconto de 100%
↓
cobertura é ofertada sem custo final
```

Essa abordagem preserva o valor técnico e torna o subsídio comercial mais explícito.

---

## 26. Revalorização e depreciação de coberturas

### 26.1 Objetivo

A revalorização permite atualizar o capital segurado da cobertura ao longo do tempo, especialmente em renovações.

Também foi mencionada a possibilidade de depreciação.

---

### 26.2 Tipos de revalorização

Foram apresentadas três opções principais:

| Tipo | Comportamento |
|---|---|
| Não revaloriza | Mantém o capital até que haja alteração por suplemento. |
| Especial | Forma de revalorização definida na configuração da cobertura. |
| Por risco | Forma de revalorização escolhida pelo cliente no momento da emissão. |

---

### 26.3 Não revaloriza

Quando a cobertura não revaloriza:

```text
Capital inicial: 100.000
Renovação seguinte: 100.000
Renovações posteriores: 100.000
```

A exceção é uma alteração formal, por exemplo, via suplemento solicitado pelo cliente.

---

### 26.4 Revalorização especial

A opção “especial” indica que a forma de atualização será configurada no “taller”, termo utilizado pelo instrutor para se referir ao ambiente de definição ou configuração.

Nesse caso, a cobertura é configurada para seguir uma regra definida previamente.

---

### 26.5 Revalorização por risco

Quando o tipo é “por risco”, a decisão sobre como atualizar — ou não atualizar — a cobertura é transferida para o momento da emissão da apólice.

O cliente pode, por exemplo, escolher aplicar IPC ou não revalorizar.

> **Leitura analítica:** essa opção introduz maior flexibilidade comercial, mas também pode resultar em maior variação entre apólices semelhantes, pois a atualização deixa de ser totalmente padronizada pela definição central da cobertura.

---

## 27. Métodos de atualização do capital

Quando a cobertura é configurada para revalorizar, a reunião apresentou as seguintes alternativas:

| Método | Descrição |
|---|---|
| Sobre capital atual | Aplica percentual sobre o capital vigente no momento da atualização. |
| Sobre capital inicial | Aplica percentual sobre o capital original. |
| IPC | Aplica índice de inflação registrado no sistema. |
| Outro índice | Aplica índice específico definido pela organização. |
| Lógica de negócio | Determina o valor ou percentual em tempo de renovação. |

---

### 27.1 Capital atual versus capital inicial

A diferença é conceitual e relevante.

```text
Capital atual
↓
percentual é aplicado sobre o valor vigente na renovação

Capital inicial
↓
percentual é aplicado sempre sobre o valor original
```

A reunião não apresentou uma fórmula completa com várias renovações sucessivas, mas deixou clara a distinção entre as bases de cálculo.

---

### 27.2 IPC

Quando a atualização é por IPC, o sistema utiliza um catálogo que registra mensalmente a evolução de preços.

Exemplo citado:

```text
IPC anual: 4%
Capital atual: 100.000
Capital revalorizado: 104.000
```

A transcrição menciona que o catálogo também poderia refletir decrementos de preços.

---

### 27.3 Outro índice

O sistema permite criar índices ad hoc, identificados como índices “a DOC” na transcrição.

Esse termo pode estar incorreto devido ao reconhecimento de voz. O sentido transmitido é que a plataforma permite definir um índice próprio e utilizá-lo para revalorizar ou depreciar a soma segurada.

---

### 27.4 Lógica de negócio para atualização

Uma lógica de negócio pode determinar dinamicamente o valor de revalorização na renovação.

Exemplo:

```text
Renovação do ano 1: 3%
Renovação do ano 2: 6%
```

A taxa pode variar conforme regras avaliadas no momento da renovação.

---

## 28. Demonstração de tela e ordem de configuração

No encerramento, o instrutor acessou uma versão visual do ambiente de definição — chamada informalmente de “versão do século passado” — para mostrar os campos de cobertura.

A demonstração confirmou que a configuração de cobertura reúne campos como:

- ramo contábil;
- impressão;
- habilitação;
- moeda;
- tipo de capital;
- relação com outra cobertura;
- percentual de dependência;
- cálculo de capital;
- acessórios;
- comissão de nova produção;
- comissão de carteira;
- resseguro;
- franquia;
- moeda da franquia;
- lógica de franquia;
- mínimos e máximos;
- obrigatoriedade;
- alteração de capital;
- revalorização.

A demonstração também reforçou o fluxo da revalorização:

```text
Tipo de revalorização
↓
Não revaloriza / Especial / Por risco
↓
Se “Especial”:
base de cálculo
↓
Capital atual / Capital inicial / IPC / Outro índice / Lógica
↓
Configuração adicional necessária:
percentual, índice ou nome da lógica
```

---

## 29. Perguntas e respostas relevantes

### Pergunta 1 — A relação entre coberturas serve apenas para a soma segurada?

**Questão levantada:** a dependência entre coberturas controla apenas o capital ou também impede a contratação isolada da cobertura dependente?

**Resposta:** serve para ambos. Se a cobertura principal não possuir capital, as coberturas dependentes não poderão ser contratadas.

**O que esclarece:** a dependência é uma regra estrutural de elegibilidade e cálculo, não apenas uma fórmula financeira.

---

### Pergunta 2 — A relação é feita por código, ordem ou nome?

**Questão levantada:** como o sistema identifica a cobertura da qual outra depende?

**Resposta:** a relação é feita pela chave da cobertura, e não pelo nome exibido.

**O que esclarece:** o modelo usa identificadores técnicos estáveis para estabelecer vínculos.

---

### Pergunta 3 — É possível definir dependência de 200%?

**Questão levantada:** uma cobertura dependente pode ter capital superior ao da cobertura-base?

**Resposta:** o instrutor acredita que talvez seja possível, mas não confirmou e afirmou que verificaria.

**O que esclarece:** a transcrição não permite concluir os limites aceitos pelo sistema para o percentual de participação.

---

### Pergunta 4 — O valor do continente pode aumentar com a valorização do imóvel?

**Questão levantada:** a soma segurada pode ser atualizada quando o valor do imóvel aumenta?

**Resposta:** sim, a cobertura pode ser revalorizada ou depreciada, em especial na renovação. Também pode haver alteração por suplemento.

**O que esclarece:** o capital não é necessariamente estático durante toda a vida da apólice.

---

### Pergunta 5 — O valor de compra do imóvel define automaticamente a cobertura?

**Questão levantada:** o valor pago pelo imóvel é a base obrigatória da soma segurada?

**Resposta:** não necessariamente. Podem existir baremos, valor cadastral, preço por metro quadrado, regras ou informação direta do cliente.

**O que esclarece:** a determinação do capital é configurável e depende da política da seguradora.

---

### Pergunta 6 — O cliente conhece o resseguro?

**Questão levantada:** o segurado tem ciência de que o risco foi ressegurado?

**Resposta:** em condições normais, não. O instrutor fez ressalvas para situações como cosseguro ou facultativo, nas quais pode haver conhecimento ou solicitação de informação adicional.

**O que esclarece:** o resseguro foi apresentado como um mecanismo interno de gestão de risco da seguradora.

---

### Pergunta 7 — A moeda da franquia precisa ser a mesma da soma segurada?

**Questão levantada:** franquia e cobertura podem utilizar moedas diferentes?

**Resposta:** sim. O sistema permite que sejam iguais ou distintas.

**O que esclarece:** há independência configurável entre moeda do capital e moeda da franquia.

---

### Pergunta 8 — Se uma cobertura tem franquia, ela sempre precisa aplicar franquia?

**Questão levantada:** como comercializar uma cobertura configurada com franquia, mas sem participação do segurado em certos casos?

**Resposta:** pode-se configurar uma franquia de 0%.

**O que esclarece:** a estrutura de franquia permanece presente, mas seu efeito financeiro pode ser neutralizado por parametrização.

---

### Pergunta 9 — O desconto da franquia sempre é calculado separadamente?

**Questão levantada:** a redução de prêmio decorrente da franquia precisa ser configurada em um campo específico?

**Resposta:** não. O desconto pode estar embutido na tarifa da cobertura ou ser calculado separadamente.

**O que esclarece:** a modelagem comercial da franquia pode ocorrer em mais de uma camada de precificação.

---

## 30. Números e indicadores citados

> Os números abaixo foram utilizados como exemplos didáticos durante o treinamento. Não há indicação de que representem valores reais de produto, portfólio ou operação.

| Indicador ou exemplo | Valor mencionado | Contexto |
|---|---:|---|
| Dependência de roubo sobre continente | 80% | Capital de roubo derivado do capital de continente. |
| Capital de continente | 100.000 | Exemplo de soma segurada. |
| Capital de roubo | 80.000 | Resultado de 80% sobre 100.000. |
| Revalorização por IPC | 3% | Exemplo de atualização anual. |
| Capital após IPC | 103.000 | Resultado de 100.000 com acréscimo de 3%. |
| Cobertura de incêndio | 100% | Exemplo de cobertura dependente. |
| Cobertura de roubo | 75% | Exemplo de participação. |
| Danos por água | 50% | Exemplo de participação. |
| Soma segurada de exemplo | 111.111 | Base para o exemplo de percentuais. |
| Franquia fixa | 1.000 | Exemplo de responsabilidade máxima inicial do segurado. |
| Sinistro de exemplo | 900 | Usado para explicar franquia fixa e percentual. |
| Franquia percentual | 10% | Exemplo de participação no sinistro. |
| Responsabilidade do segurado | 90 | 10% de sinistro de 900. |
| Responsabilidade da seguradora | 810 | Restante de sinistro de 900. |
| Franquia hospitalar | 5 dias | Exemplo de franquia temporal. |
| Internação | 6 dias | Exemplo de período acima da franquia. |
| Franquias ofertadas | 10%, 20%, 30% | Opções possíveis para uma cobertura. |
| Franquia padrão | 20% | Exemplo de valor selecionado por padrão. |
| Mínimo de franquia | 2% da soma segurada | Exemplo de limite mínimo. |
| Mínimo fixo | 100 | Exemplo de limite mínimo monetário. |
| Máximo de franquia | 3% da soma segurada | Exemplo de teto. |
| Máximo fixo | 300 | Exemplo de teto monetário. |
| Prêmio sem franquia | 100 | Exemplo de prêmio. |
| Prêmio com franquia | 70 ou 80 | Exemplos de prêmio reduzido. |
| Desconto por franquia | 3% | Exemplo de desconto. |
| Tarifa por percentual | 0,5% | Exemplo de cálculo sobre 26.000. |
| Soma segurada para tarifa | 26.000 | Exemplo de cálculo. |
| Resultado do percentual | 130 | Exemplo de prêmio. |
| Tarifa por mil | 7‰ | Exemplo de cálculo. |
| Resultado do tanto por mil | 182 | Exemplo de prêmio. |
| Prêmio fixo | 600 dólares | Exemplo de tarifa fixa. |
| Uso de lógica | 29,9% | Afirmação do instrutor; sem metodologia detalhada. |
| IPC alternativo | 4% | Exemplo de atualização por índice. |

---

## 31. Limitações reconhecidas durante a reunião

1. **Percentuais acima de 100% em coberturas dependentes:** não foram confirmados.
2. **Detalhamento de sinistros:** o tema de proporcionalidade por subseguro foi apenas introduzido.
3. **Tarifa multivariável:** foi citada, mas não explicada.
4. **Tipos de câmbio:** não foram detalhados critérios, origem, momento de conversão ou arredondamentos.
5. **RE21:** a ferramenta foi citada, mas não foi descrita com profundidade.
6. **Arquitetura técnica:** não foram mencionados banco de dados, APIs, mensageria, cloud, containers, segurança ou CI/CD.
7. **Resseguro:** não foram detalhados contratos, cálculos de distribuição, limites, participantes ou fluxo de exceção completo.
8. **Contabilização:** não foram informados plano de contas, regras contábeis nem integrações financeiras.
9. **Inspeção:** não foram explicados fluxos operacionais, responsáveis, evidências, prazos ou tratamento de reprovação.
10. **Cálculo final do prêmio:** foram separados prêmio técnico e componentes comerciais, mas não foi demonstrado o cálculo completo da apólice.
11. **Revalorização por risco:** não foram detalhadas permissões, telas, restrições ou critérios para a escolha do cliente.
12. **Índices customizados:** foi mencionada a possibilidade, mas não sua governança ou processo de manutenção.

---

## 32. Riscos e desafios

### 32.1 Riscos explicitamente mencionados

| Risco | Contexto |
|---|---|
| Emissão sem cessão de resseguro | Pode ocorrer se a companhia decidir prosseguir após falha de distribuição em integração externa. |
| Subseguro | Capital inferior ao valor efetivo pode reduzir indenizações de forma proporcional. |
| Acessórios não declarados | Itens adicionais podem não estar cobertos em sinistro. |
| Danos preexistentes | Sem inspeção, pode haver dificuldade para separar dano anterior de dano novo. |
| Cobertura dependente sem base | Dependência evita contratação sem capital da cobertura principal. |
| Franquia inadequada | Configuração de mínimos, máximos e base de cálculo pode alterar significativamente a responsabilidade do segurado. |
| Cobertura inabilitada | Pode deixar de estar disponível para novas contratações ou reinclusões futuras. |

---

### 32.2 Desafios derivados do contexto — interpretação analítica

> Esta subseção contém leitura analítica baseada nas explicações, não declarações literais dos participantes.

1. **Complexidade de parametrização:** o grande número de propriedades por cobertura exige governança rigorosa. Uma configuração inconsistente pode afetar emissão, sinistros, comissão, contabilidade e resseguro simultaneamente.

2. **Governança de lógicas de negócio:** como lógicas podem determinar tarifas, franquias, mínimos, máximos e revalorização, elas se tornam componentes críticos para auditabilidade e manutenção.

3. **Coerência entre moeda, tarifa e franquia:** permitir moedas diferentes aumenta flexibilidade, mas demanda controles claros sobre conversão e comunicação ao cliente.

4. **Gestão de versões:** a presença de datas de vigência e possibilidade de inabilitação exige disciplina para preservar contratos existentes enquanto se alteram produtos para novas emissões.

5. **Dependência entre coberturas:** relações pai-filho facilitam consistência, mas tornam alterações no capital-base potencialmente impactantes para várias coberturas associadas.

6. **Equilíbrio entre flexibilidade e padronização:** a plataforma permite múltiplas exceções e lógicas. Isso pode atender cenários locais, mas pode aumentar dispersão de regras entre ramos, modalidades e países.

---

## 33. Transformações estruturais identificadas

### 33.1 De cobertura isolada para cobertura como objeto de negócio

A cobertura não foi tratada apenas como uma garantia comercial com preço. Ela é um objeto de negócio que concentra regras de:

- elegibilidade;
- capital;
- dependências;
- precificação;
- resseguro;
- comissão;
- sinistro;
- contabilização;
- renovação.

> **Leitura analítica:** isso sugere uma transformação de uma visão estática de “produto” para uma visão de capacidades configuráveis de seguro.

---

### 33.2 De configuração única para hierarquia de regras

A reunião mostrou diferentes níveis de decisão:

```text
Companhia
↓
Ramo
↓
Modalidade
↓
Cobertura
↓
Tipo de risco ou tipo de veículo
↓
Apólice individual
```

A modalidade pode sobrescrever uma regra do ramo, e uma lógica de negócio pode ajustar o comportamento no momento da contratação.

> **Leitura analítica:** há uma arquitetura de regras em camadas, com especialização progressiva do comportamento do produto.

---

### 33.3 De precificação fixa para precificação configurável

A tarifa pode ser:

- percentual;
- taxa por mil;
- valor fixo;
- lógica;
- tarifa padrão;
- custo zero.

Além disso, descontos de franquia podem estar embutidos na tarifa ou calculados separadamente.

> **Leitura analítica:** a plataforma busca acomodar produtos simples e produtos com cálculo sofisticado sem obrigar todos a seguir uma única estratégia de precificação.

---

### 33.4 De capital estático para capital evolutivo

O capital segurado pode:

- permanecer fixo;
- ser alterado por suplemento;
- ser revalorizado por percentual;
- ser atualizado por IPC;
- seguir outro índice;
- ser calculado por lógica de negócio;
- ser decidido no momento da emissão.

Essa flexibilidade responde à necessidade de manter a soma segurada coerente com mudanças econômicas e com características do risco.

---

## 34. O que a reunião não permite concluir

A transcrição não fornece detalhe suficiente para determinar:

- a tecnologia de implementação do sistema;
- linguagem de programação;
- banco de dados;
- arquitetura de microsserviços ou monólito;
- uso de APIs, eventos ou mensageria;
- modelo de autenticação e autorização;
- segregação de funções;
- trilha de auditoria;
- criptografia;
- gestão de dados pessoais;
- conformidade regulatória;
- estratégia de backup e recuperação de desastre;
- SLA, SLO ou indicadores operacionais;
- modelo de observabilidade;
- pipeline de CI/CD;
- mecanismo de versionamento técnico das configurações;
- gestão de aprovação de alterações em tarifas e regras;
- estrutura real de tabelas ou entidades de dados;
- cálculo atuarial detalhado;
- cálculo de impostos;
- ordem completa de aplicação de descontos, recargos e comissões;
- fluxo de sinistro;
- governança de índices de atualização;
- funcionamento detalhado da ferramenta “RE21”;
- definição exata do termo “Rift Core/RIFCORE”;
- escopo real da “tarifa multivariável”.

---

## 35. Conclusões

A reunião apresentou um modelo de parametrização de seguros no qual a cobertura é o principal ponto de configuração funcional do produto.

A partir dela, é possível controlar:

```text
Contratação
+ capital
+ dependência
+ franquia
+ tarifa
+ moeda
+ revalorização
+ comissão
+ resseguro
+ inspeção
+ impressão
+ contabilização
+ ciclo de vida
```

Os exemplos demonstraram que regras aparentemente comerciais — como oferecer roubo, definir acessórios ou escolher franquia — possuem impacto direto em processos técnicos e operacionais, incluindo cálculo de capital, emissão, sinistro, resseguro, comissão e contabilidade.

A principal conclusão é que a plataforma foi apresentada como um ambiente de composição de regras de negócio para seguros. Sua flexibilidade permite adaptar produtos a diferentes necessidades, mas exige atenção especial à governança das parametrizações, à gestão de versões, à coerência entre coberturas dependentes e à validação das lógicas de negócio associadas.
