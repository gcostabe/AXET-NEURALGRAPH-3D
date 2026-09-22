# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.academy - Reef.core - Módulo de emisión - DEFINICIÓN cobertura-2.mp4`
**Data de processamento:** 20/09/2026 15:57:46
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada — Tipologias de cobertura e parametrização de capitais em um sistema segurador

> **Natureza do encontro:** treinamento/apresentação funcional e técnica sobre a configuração de coberturas em um sistema segurador.  
> **Escopo predominante:** comportamento das coberturas nos módulos de emissão e sinistros, tratamento de capitais, primas, limites, moedas, lógicas de negócio e coberturas internas.  
> **Rastreabilidade:** a transcrição não contém timestamps ou numeração de linhas. As afirmações abaixo foram organizadas exclusivamente a partir do conteúdo fornecido.

---

## 1. Síntese executiva

A reunião explicou como um sistema segurador classifica e configura diferentes tipos de cobertura. O ponto central foi demonstrar que a **tipologia da cobertura não é apenas uma classificação cadastral**: ela determina se a cobertura aparece na contratação, se possui soma assegurada, se possui prima, de onde vem seu capital, se participa de processos de sinistro e como o sistema deve tratá-la ao longo do ciclo de vida da apólice.

Foram apresentados tipos visíveis ao usuário de emissão — como coberturas reais, básicas adicionais, de serviço e de capital ilimitado — e tipos internos, não exibidos na contratação, como coberturas de sinistro e coberturas fictícias. Estas últimas foram tratadas como mecanismos técnicos e econômicos para suportar processos específicos, como convenções entre seguradoras, prêmios mínimos por risco, custos administrativos por apólice e ajustes provenientes de um serviço externo de avaliação de risco.

A apresentação também abordou como a soma assegurada pode ser definida: pelo valor de um veículo, pelos acessórios, por uma lista de limites, por limites duplos, por intervalos ou por valor livre. Em seguida, foram explicados mecanismos de moeda por cobertura, cálculo prévio de capitais por lógica de negócio, possibilidade de alteração manual pelo usuário de emissão e redução ou restauração de capital após sinistros.

A principal mensagem é que a definição de cobertura constitui uma camada de parametrização estruturante do produto segurador. Alterar uma cobertura em produção, principalmente sua tipologia, pode afetar apólices já emitidas, telas de contratação, cálculos, processos de sinistro e dados econômicos, devendo portanto ser tratado com cautela.

---

## 2. Contexto e antecedentes

A conversa ocorre no contexto de definição e parametrização de um ramo de seguros em um sistema cuja denominação não foi informada. O treinamento alterna entre exemplos de seguros residencial, automóvel, acidentes e viagem para explicar conceitos reutilizáveis no modelo de produtos.

O apresentador distingue dois momentos principais:

1. **Definição do produto e das coberturas**
   - As coberturas são criadas no nível da companhia.
   - Posteriormente, são associadas a um ramo.
   - A associação ao ramo inclui propriedades como validade, ordem de apresentação e, em determinados casos, modalidade.

2. **Emissão e operação da apólice**
   - O usuário ou emissor contrata coberturas visíveis.
   - O sistema calcula ou propõe capitais e prêmios.
   - Alguns tipos de cobertura são associados automaticamente à apólice, embora não apareçam na contratação.
   - O módulo de sinistros utiliza determinadas coberturas para definir formas específicas de tramitação.

A reunião não informa o nome comercial do sistema, sua arquitetura tecnológica, banco de dados, infraestrutura, APIs específicas ou fornecedor. O foco é funcional e de parametrização de negócio.

---

## 3. Problemas e necessidades tratados

### 3.1 Necessidade de modelar coberturas com comportamentos distintos

A discussão demonstra que nem toda cobertura tem a mesma natureza operacional. Algumas representam efetivamente um risco segurado; outras representam apenas um serviço; outras são agrupadores visuais; e outras existem exclusivamente para suportar processamento interno.

Sem uma tipificação adequada, o sistema não conseguiria distinguir, por exemplo:

- uma cobertura que deve ter capital e prima;
- uma cobertura que apenas fornece um capital de referência para outras;
- uma cobertura contratada por inclusão/exclusão, sem soma assegurada;
- uma cobertura que deve ser invisível para o cliente e usada somente em sinistros;
- um valor econômico que não deve alterar artificialmente o prêmio de uma cobertura comercial.

### 3.2 Necessidade de manter a origem e a responsabilidade econômica do valor

A reunião enfatiza a diferença entre uma cobertura cujo capital é próprio e uma cobertura cujo capital deriva de outra. Isso é relevante porque, se uma cobertura dependente tomar seu capital de uma cobertura-base que não foi contratada ou possui capital zero, ela também não poderá ser contratada com capital positivo.

Exemplo apresentado:

```text
Continente com capital informado
↓
Roubo do continente toma 100% desse capital
↓
Incêndio do continente toma 80% desse capital
```

Quando o capital da cobertura-base é zero, as coberturas dependentes também ficam com capital zero.

### 3.3 Necessidade de suportar regras econômicas sem distorcer coberturas comerciais

O sistema precisa lidar com situações como:

- prêmio mínimo por risco;
- custo administrativo por apólice;
- desconto ou acréscimo determinado por avaliação externa de risco;
- valores que afetam várias garantias;
- ajustes necessários sem redistribuir artificialmente valores entre coberturas comerciais.

A solução apresentada para isso são as coberturas fictícias, que armazenam informação econômica interna em níveis como risco, apólice ou ajuste.

### 3.4 Necessidade de suportar tramitações de sinistro específicas

A existência de convênios entre seguradoras pode exigir uma tramitação diferente da cobertura padrão de responsabilidade civil. Nesse cenário, uma cobertura interna de sinistro pode representar o tratamento específico de um evento em regime de convênio.

### 3.5 Necessidade de controlar capitais, limites e revalorizações

A reunião mostra que um sistema segurador precisa diferenciar:

- capital livre;
- valores definidos por lista fechada;
- faixas de valores permitidos;
- limites totais por vigência;
- limites máximos por sinistro;
- capitais calculados por lógica;
- capitais editáveis ou não pelo emissor;
- capitais que diminuem ou não após indenização.

---

## 4. Modelo conceitual apresentado

A cobertura é tratada como uma entidade configurável, definida inicialmente no nível da companhia e posteriormente associada a um ramo de seguro.

Na definição básica, foram mencionados pelo menos os seguintes elementos:

- chave ou identificador;
- nome;
- tipo da cobertura;
- ramo ao qual será associada;
- modalidade, quando aplicável;
- período de validade ou versão;
- ordem de apresentação na tela de contratação;
- propriedades de soma assegurada;
- moeda da soma assegurada;
- lógica de negócio para determinação prévia de capital;
- possibilidade ou não de alteração manual do capital;
- comportamento da soma assegurada após sinistro.

A tipologia da cobertura determina grande parte do comportamento do sistema. A reunião deixa claro que os tipos são mutuamente exclusivos: uma cobertura possui um único tipo.

---

## 5. Tipologias de cobertura

## 5.1 Visão consolidada

| Tipologia | Visível na contratação | Soma assegurada/capital | Prima | Finalidade principal |
|---|---:|---:|---:|---|
| Informativa | Sim | Não | Não | Separador ou agrupador visual |
| Básica adicional | Sim | Sim | Não | Fornecer capital a outras coberturas |
| Real dependente | Sim | Sim, derivado de outra cobertura | Sim | Cobertura completa dependente de capital-base |
| Real independente | Sim | Sim, próprio | Sim | Cobertura completa com capital autônomo |
| Serviço | Sim | Não | Sim | Contratação de serviço |
| Capital ilimitado | Sim | Não limitado | Sim | Cobertura não vinculada a limite de capital |
| Sinistro | Não | Não informado na reunião como capital/prima comercial | Não | Tramitação interna de sinistros |
| Fictícia de risco | Não | Sem soma assegurada comercial | Não, embora armazene informação econômica | Ajustes econômicos no nível do risco |
| Fictícia de apólice | Não | Sem soma assegurada comercial | Não, embora armazene informação econômica | Ajustes econômicos no nível da apólice |
| Fictícia de ajuste | Não | Sem soma assegurada comercial | Não, embora armazene informação econômica | Descontos ou recargos derivados de avaliação externa |

> A expressão “não tem prima”, aplicada às coberturas fictícias, não significa ausência de informação econômica. O treinamento esclarece que elas podem carregar valores econômicos que não são classificados como prêmio da cobertura.

---

## 5.2 Cobertura informativa

A cobertura informativa não é considerada uma cobertura de seguro propriamente dita. Seu propósito é funcionar como um separador ou contêiner visual na contratação, permitindo agrupar ou dividir outras coberturas na interface.

Características apresentadas:

- é visível;
- não tem soma assegurada;
- não tem prima;
- não representa risco nem serviço contratado;
- serve para organização da tela ou apresentação das coberturas.

Uma leitura funcional é que esse tipo ajuda a tornar a experiência de emissão mais compreensível, sem introduzir efeitos econômicos ou securitários.

---

## 5.3 Cobertura básica adicional

A cobertura básica adicional possui soma assegurada, mas não possui prima.

Sua principal finalidade é fornecer seu capital — integralmente ou em percentual — a outras coberturas que dependem dela. No exemplo residencial, “continente” e “conteúdo” foram utilizados como referências que podem fornecer capital a coberturas como roubo e incêndio.

Características:

- visível na contratação;
- possui capital;
- não possui prima;
- pode alimentar capital de coberturas dependentes;
- pode receber capital informado manualmente, calculado ou definido por modalidade, conforme a parametrização mencionada.

Exemplo conceitual apresentado:

```text
Continente: capital de 100.000
├─ Roubo de continente: 100% do continente = 100.000
└─ Incêndio de continente: 80% do continente = 80.000
```

A reunião destacou uma consequência relevante: se a cobertura-base recebe capital zero, as coberturas dependentes não podem ter capital positivo, pois dependem dela.

---

## 5.4 Cobertura real dependente

A cobertura real dependente é uma cobertura completa do ponto de vista econômico:

- possui soma assegurada;
- possui prima;
- é visível na contratação.

Sua particularidade é que o capital não nasce nela própria. Ele é obtido a partir de outra cobertura, normalmente por um percentual definido na configuração.

Exemplo usado no treinamento:

```text
Cobertura-base: conteúdo
↓
Roubo de conteúdo: percentual do conteúdo
↓
Incêndio de conteúdo: percentual do conteúdo
```

O apresentador reforça que a dependência não é apenas conceitual: ela afeta o resultado da emissão. Se a cobertura-base não tiver capital, as coberturas dependentes ficam inviabilizadas ou com capital zero.

---

## 5.5 Cobertura real independente

A cobertura real independente também possui capital e prima, mas não depende de outra cobertura para determinar seu capital.

O exemplo citado foi responsabilidade civil em um seguro residencial. A justificativa é que essa cobertura não necessariamente deriva do capital de continente ou conteúdo; ela possui limite próprio.

Características:

- é visível na contratação;
- tem capital;
- tem prima;
- não depende de outra cobertura;
- seu capital pode ser informado, proposto por padrão ou determinado por parametrização.

A transcrição usa a expressão de que a cobertura independente “não está topeada por nada”, mas o contexto indica que ela não depende de uma outra cobertura-base. Isso não significa necessariamente que não possa haver limites ou validações próprias.

---

## 5.6 Cobertura de serviço

A cobertura de serviço não possui soma assegurada, mas possui prima. Ela representa a contratação de uma prestação de serviço, não de uma indenização limitada por capital.

Exemplos citados:

- assistência em viagem;
- guincho para veículo;
- assistência residencial;
- profissional para realizar pequenos serviços em residência;
- chaveiro para abertura de porta.

A contratação não é identificada por valor de capital, pois não existe soma assegurada. Em vez disso, a tela indica se a cobertura está:

- incluída; ou
- excluída.

O apresentador explicou que, para cobertura com capital, a presença de capital diferente de zero indica contratação. Para cobertura de serviço, a contratação é identificada pelo indicador de inclusão/exclusão.

### Formação de preço de uma cobertura de serviço

Em resposta a uma pergunta, foi explicado que o prêmio de serviço pode considerar fatores como:

- distância da assistência em relação ao domicílio;
- quantidade de assistências permitidas por ano;
- outras regras parametrizadas.

Esses foram apresentados como exemplos, não como modelo obrigatório do sistema.

---

## 5.7 Cobertura de capital ilimitado

Esse tipo representa uma cobertura não relacionada a serviço, com prima, mas sem limite definido para a soma assegurada.

Exemplo mencionado:

- assistência médica ilimitada.

O apresentador informou que esse tipo está em desuso, pois considera improvável que seguradoras ofereçam atualmente coberturas não relacionadas a serviços com responsabilidade ilimitada. Ainda assim, o sistema o suporta.

Características:

- visível na contratação;
- possui prima;
- não possui limite de capital declarado;
- não é uma cobertura de serviço;
- existe no sistema, mas foi descrita como pouco utilizada atualmente.

---

## 5.8 Cobertura de sinistro

A cobertura de sinistro é uma cobertura interna, voltada ao módulo de sinistros.

Características explicitamente apresentadas:

- não aparece na tela de contratação;
- não é exibida ao emissor ou ao cliente;
- fica sempre associada à apólice quando estiver definida no ramo;
- é usada para possibilitar uma tramitação específica de sinistro;
- no contexto de sinistros, pode ter validações, valoração e liquidação próprias;
- os tipos de cobertura são exclusivos: uma cobertura de sinistro não é simultaneamente básica adicional, real independente ou serviço.

### Exemplo: cobertura de convênio

O exemplo principal trata de seguros de automóvel e de um possível convênio entre seguradoras.

Coberturas visíveis do ramo de automóvel, no exemplo:

- responsabilidade civil;
- danos ao veículo;
- acidentes;
- roubo.

No caso de um convênio, cada seguradora pode se responsabilizar inicialmente por seu próprio segurado e, posteriormente, ocorrer compensação entre seguradoras. Nessa circunstância, determinada tramitação que seria normalmente associada à responsabilidade civil pode não seguir o fluxo padrão.

A cobertura de sinistro chamada “convênio” foi usada como exemplo para representar esse processo específico.

Representação conceitual:

```text
Apólice de automóvel
├─ Responsabilidade civil
├─ Danos ao veículo
├─ Acidentes
├─ Roubo
└─ Convênio — cobertura interna de sinistro
```

A cobertura de convênio não aparece para contratação, mas pode ser utilizada no módulo de sinistros para selecionar e processar uma tramitação diferente.

### Interpretação analítica

A cobertura de sinistro parece funcionar como um mecanismo de conexão entre a configuração comercial da apólice e os fluxos operacionais de sinistro. Ela permite que o módulo de sinistros reconheça uma modalidade de tratamento que não deve ser exposta ao cliente como garantia contratável.

---

## 5.9 Coberturas fictícias

As coberturas fictícias são internas, não aparecem na contratação e ficam associadas à apólice sempre que estiverem definidas no ramo.

A reunião diferencia três tipos:

1. fictícia de risco;
2. fictícia de apólice;
3. fictícia de ajuste.

Ao contrário da cobertura de sinistro, as coberturas fictícias foram apresentadas como importantes também para o módulo de emissão, pois armazenam informação econômica utilizada no cálculo ou na composição financeira da apólice.

---

### 5.9.1 Fictícia de risco

A fictícia de risco serve para armazenar informação econômica aplicável a um risco específico.

O exemplo utilizado foi o de prêmio mínimo por risco.

```text
Prêmio somado das coberturas de um risco: 8.000
Prêmio mínimo exigido pelo negócio: 10.000
Diferença: 2.000
↓
Fictícia de risco recebe 2.000
```

A intenção é evitar redistribuir a diferença entre todas as coberturas comerciais. Sem a cobertura fictícia, o sistema poderia recalcular e aumentar proporcionalmente os valores das coberturas, o que, segundo o apresentador, pode ser menos limpo e gerar custo de processamento.

No exemplo de uma apólice com duas residências:

- risco 1: residência habitual;
- risco 2: apartamento de praia.

Cada risco poderia ter sua própria fictícia de risco caso não atingisse o prêmio mínimo exigido.

### Ponto de atenção sobre rastreabilidade

Uma pergunta levantou a possibilidade de perda de rastreabilidade quando há mínimos distribuídos entre garantias. A resposta esclareceu que o exemplo era de mínimo **por risco**, e não por cobertura individual.

Se o mínimo fosse específico de uma cobertura, a reunião indica que o valor poderia ser tratado diretamente nessa cobertura. Se afetar várias garantias, a fictícia de risco é apresentada como a alternativa mais limpa.

---

### 5.9.2 Fictícia de apólice

A fictícia de apólice armazena informação econômica no nível da apólice, e não no nível de cada risco.

Exemplo apresentado:

```text
Custo administrativo por apólice: 10
↓
Fictícia de apólice recebe 10
```

O objetivo é evitar que um custo administrativo geral seja incorporado artificialmente a uma cobertura comercial específica.

No exemplo de apólice multirrisco com duas residências, a apólice conteria:

- risco 1: residência habitual;
- risco 2: apartamento de praia;
- risco 0: criado pelo sistema para representar a fictícia de apólice.

Esse “risco zero” foi apresentado como uma forma de armazenar e visualizar a cobertura fictícia de apólice.

---

### 5.9.3 Fictícia de ajuste

A fictícia de ajuste é utilizada quando um sistema ou ativo satélite avalia o risco e devolve uma regra de ajuste econômico.

Exemplos apresentados:

- desconto de 2%;
- desconto de 3%;
- recargo de 5%;
- recargo de 2%.

O fluxo conceitual é:

```text
Risco em emissão
↓
Serviço/ativo satélite avalia o risco
↓
Retorna desconto ou recargo
↓
Fictícia de ajuste registra o valor econômico correspondente
```

A transcrição descreve esse tipo como semelhante à fictícia de risco, mas calculada por último, pois depende do resultado retornado pelo serviço externo.

Não foram detalhados:

- nome do serviço satélite;
- tecnologia de integração;
- regras de avaliação;
- governança sobre descontos e recargos;
- critérios de aprovação;
- auditoria do retorno externo.

---

## 6. Visibilidade das coberturas na contratação

A reunião estabelece uma divisão clara entre coberturas visíveis e internas.

### Coberturas visíveis

- informativa;
- básica adicional;
- real dependente;
- real independente;
- serviço;
- capital ilimitado.

### Coberturas não visíveis

- sinistro;
- fictícia de risco;
- fictícia de apólice;
- fictícia de ajuste.

A cobertura informativa é visível, mas não representa uma garantia comercial; ela é apenas um organizador da interface.

As coberturas internas podem aparecer em consultas internas da apólice, mas não deveriam, em princípio, constar no documento impresso entregue ao cliente. O apresentador ressalva que isso depende da configuração do processo de impressão: se não houver filtro adequado, elas podem aparecer indevidamente.

---

## 7. Modelo de associação entre emissão e sinistros

A reunião apresenta uma separação conceitual entre o módulo de emissão e o módulo de sinistros.

```text
Definição de coberturas
↓
Associação ao ramo
↓
Emissão da apólice
↓
Coberturas visíveis e internas associadas à apólice
↓
Ocorrência de sinistro
↓
Módulo de sinistros identifica cobertura afetada
↓
Aplicação da tramitação correspondente
```

No módulo de emissão:

- são configuradas e contratadas as coberturas visíveis;
- as coberturas internas podem ser associadas automaticamente;
- a tipologia influencia a tela e a forma de contratação.

No módulo de sinistros:

- são definidos os processos de tramitação para as coberturas;
- uma cobertura de sinistro pode ter comportamento próprio;
- podem existir formulários e informações específicas conforme o tipo de cobertura afetada;
- são realizadas validações, valoração e liquidação.

A reunião não detalha o desenho técnico dessa integração. Não é possível concluir se os módulos se comunicam por banco de dados, APIs, eventos, mensageria ou outro mecanismo.

---

## 8. Regras de cálculo e origem da soma assegurada

## 8.1 Tipos de capital mencionados

Para coberturas que possuem soma assegurada, o sistema permite determinar a origem ou a forma de definição do capital.

Os tipos apresentados foram:

- valor do veículo;
- acessórios;
- valor do veículo mais acessórios;
- limite;
- limite duplo;
- livre;
- intervalo.

A reunião indica que essas propriedades não se aplicam a coberturas de serviço, pois elas não possuem capital.

---

## 8.2 Valor do veículo

No exemplo de automóvel, o valor do veículo pode representar a soma assegurada de uma cobertura de danos ao próprio veículo.

O exemplo pressupõe que exista um atributo do risco contendo o valor do veículo. A cobertura pode utilizar esse atributo como capital.

A transcrição cita como situação típica a destruição total do veículo, embora não detalhe regras de indenização, valor venal, depreciação ou outras condições contratuais.

---

## 8.3 Acessórios

A cobertura pode utilizar o valor de acessórios declarados pelo segurado.

Acessórios foram explicados como itens que não vêm de fábrica ou não fazem parte da configuração original do veículo, tais como:

- rodas especiais;
- vidros escurecidos;
- outros elementos adquiridos separadamente.

O modelo descrito é:

```text
Acessório declarado
↓
Valor individual do acessório
↓
Soma de todos os acessórios declarados
↓
Capital de acessórios
```

Também é possível, conforme a explicação, utilizar a soma do valor do veículo com os acessórios.

---

## 8.4 Capital por limite

O capital por limite é definido por uma lista fechada de valores permitidos.

Exemplo conceitual:

```text
Opções possíveis:
- 2.000
- 2.100
```

Nesse caso, não seria permitido contratar 2.050, pois esse valor não pertence à lista.

O limite é associado a uma chave ou identificador. O treinamento menciona que o identificador é o que fica registrado para representar o limite escolhido.

---

## 8.5 Limite duplo

O limite duplo combina dois valores:

1. limite total por anualidade;
2. limite máximo por sinistro.

Exemplo apresentado:

| Limite anual | Limite por sinistro |
|---:|---:|
| 10.000 | 1.000 |
| 12.000 | 1.200 |
| 14.000 | 1.400 |

No primeiro caso:

- o total máximo indenizável durante o período seria 10.000;
- cada sinistro teria indenização máxima de 1.000;
- poderiam ocorrer, por exemplo, dez sinistros indenizados em 1.000, desde que respeitado o teto total.

A reunião esclarece que o limite não controla quantidade de eventos. Ele controla valores indenizáveis. Assim, se os sinistros forem de valor inferior, pode haver mais eventos até que o limite anual seja consumido.

---

## 8.6 Capital livre

Capital livre significa que a soma assegurada não vem de veículo, acessórios, limite ou intervalo.

O apresentador ressalta que “livre” não significa necessariamente “sem qualquer validação”. Ainda podem existir regras, percentuais máximos ou outros controles aplicados em outra camada de configuração.

Também é o tipo para o qual a reunião exemplifica a possibilidade de definir um valor padrão inicial, como uma responsabilidade civil com capital sugerido de 150.000.

---

## 8.7 Capital por intervalo

O intervalo permite configurar uma faixa contínua de valores possíveis.

Exemplo:

```text
Intervalo permitido: 3.000 a 3.600
```

Nesse caso, valores intermediários são aceitos, como 3.001, 3.200 ou 3.599, desde que estejam dentro da faixa.

Também podem existir múltiplos intervalos. Exemplo:

```text
3.000 a 3.600
5.000 a 5.100
```

Nesse cenário:

- 3.200 seria permitido;
- 5.050 seria permitido;
- 4.000 não seria permitido;
- 2.000 não seria permitido;
- 6.000 não seria permitido.

A reunião informa que negócio normalmente define os valores mínimo e máximo dos intervalos.

---

## 9. Revalorização e alteração de limites

Foi levantada uma questão importante sobre a renovação de coberturas configuradas com lista fechada de limites.

Se uma cobertura possui limite de 2.000 e sofre revalorização de 2%, o resultado teórico seria 2.040. Porém, se 2.040 não existir na lista de limites permitidos, a apólice não pode simplesmente assumir esse valor.

A consequência é que a revalorização deve respeitar os valores configurados no catálogo de limites.

Exemplo conceitual:

```text
Limites disponíveis: 2.000 e 2.100
Revalorização teórica de 2.000 em 2%: 2.040
↓
2.040 não pertence à lista
↓
É necessário aplicar uma regra compatível com os limites cadastrados
```

A apresentação não detalha qual regra o sistema aplica automaticamente nesse caso. Apenas alerta que a revalorização exige cuidado quando há valores discretos.

Também foi informado que o sistema permite atualizar limites de forma massiva, por exemplo:

```text
Apólices com limite de 2.000
↓
Processo de renovação
↓
Atualização para limite de 2.500
```

Segundo o apresentador, esse tipo de mudança pode ser executado para renovações, apólices novas ou outros cenários, por meio de locais de configuração e catálogos. Não foram apresentados os passos operacionais, controles, aprovações ou mecanismos de versionamento dessa atualização.

---

## 10. Moeda da apólice e moeda da cobertura

A reunião diferencia duas decisões:

1. moeda em que a apólice é emitida;
2. moeda específica de uma cobertura.

A apólice pode ser emitida em moedas permitidas pelo ramo. Foram citados, como exemplos:

- dólar;
- rupia;
- libra esterlina.

A configuração do ramo também pode contemplar regras de decimais e arredondamentos para elementos como comissões e recibos.

Já uma cobertura pode ter sua soma assegurada fixada em moeda diferente daquela da apólice.

Exemplo apresentado:

```text
Apólice emitida em libra esterlina
↓
Cobertura de despesas médicas: capital em dólar americano
Cobertura de repatriação: capital em euro
Cobertura de cancelamento de viagem: moeda não definida
↓
Cancelamento segue a moeda da apólice
```

A reunião esclarece que, no exemplo:

- a soma assegurada da cobertura pode permanecer em moeda estrangeira;
- a prima da cobertura segue a moeda da apólice;
- o sistema realiza conversão conforme a taxa de câmbio aplicável, embora o critério temporal exato não tenha sido detalhado.

### Implicações citadas

Os participantes associaram essa configuração principalmente a:

- sinistros, porque a indenização pode ter de respeitar a moeda da cobertura;
- resseguro, pois contratos de resseguro também podem estar expressos em moedas distintas;
- tarifa, que pode ser impactada dependendo da configuração.

A reunião informa que o módulo de sinistros é capaz de indenizar na moeda da apólice ou em outra moeda, mas não detalha as regras de câmbio, contabilização, tributação ou reconciliação financeira.

---

## 11. Lógica de negócio prévia à contratação

O sistema permite associar uma lógica de negócio à cobertura. Essa lógica é executada antes de o usuário de emissão tomar controle da contratação.

Essa lógica pode:

- determinar a soma assegurada de uma cobertura;
- decidir se uma cobertura de serviço será incluída ou excluída;
- propor valores iniciais para contratação;
- utilizar atributos do risco e catálogos de negócio.

### Exemplo: cálculo de capital para seguro residencial

O exemplo apresentado utiliza:

- código postal;
- metragem da residência;
- catálogo de valor por metro quadrado.

Fluxo exemplificado:

```text
Código postal: 111
Valor por metro quadrado no catálogo: 1.000
Área da residência: 90 m²
↓
Soma assegurada proposta: 90.000
```

A reunião não afirma que esta seja a única lógica possível nem que esse cálculo seja obrigatório em seguros residenciais. Trata-se de um exemplo para explicar a capacidade de parametrização.

---

## 12. Capital proposto versus capital editável

Depois que a lógica de negócio calcula ou propõe uma soma assegurada, a configuração pode determinar se o emissor poderá alterá-la.

### Cenário A — capital não editável

```text
Lógica calcula 90.000
↓
Usuário não pode alterar
↓
Apólice segue com 90.000
```

### Cenário B — capital editável

```text
Lógica calcula 90.000
↓
Usuário visualiza 90.000
↓
Usuário pode alterar, por exemplo, para 98.000
```

A reunião demonstra que esse comportamento é uma decisão de parametrização: o sistema pode propor um valor e, ao mesmo tempo, permitir ou bloquear sua edição.

---

## 13. Comportamento em suplementos quando houve alteração manual

Foi explicado um caso específico e relevante para a evolução da apólice.

### Situação inicial

1. A lógica calcula capital de 90.000.
2. O usuário emissor altera manualmente para 98.000.
3. A apólice é emitida com capital de 98.000.

### Problema em um suplemento posterior

Quando ocorre um suplemento, o sistema precisa decidir:

- manter o valor efetivamente emitido, de 98.000; ou
- executar novamente a lógica e voltar a propor 90.000.

A execução da lógica pode gerar redução de capital e, consequentemente, alteração de preço. Porém, manter o capital anterior pode contrariar a expectativa de um país ou negócio que deseja reavaliar o risco em cada suplemento.

A solução apresentada é tornar esse comportamento configurável pelo responsável pela definição:

| Opção | Comportamento |
|---|---|
| Respeitar capital existente | Mantém o capital que estava na apólice |
| Relançar lógica | Executa novamente a lógica e utiliza/proporciona o novo resultado |

O apresentador afirma que essa decisão foi introduzida porque, em versões anteriores, a lógica era sempre executada novamente, enquanto diferentes países demonstraram expectativas diferentes.

### Leitura analítica

Esse recurso demonstra uma tensão entre dois princípios legítimos:

- preservar a decisão manual tomada no momento da emissão;
- reavaliar o capital com base em regras atualizadas ou dados atuais.

Em vez de impor uma única regra, o sistema delega essa decisão à configuração do produto.

---

## 14. Redução e restauração da soma assegurada após sinistro

A reunião explica dois comportamentos possíveis após a ocorrência de um sinistro.

### 14.1 Soma assegurada restaurada automaticamente

Em um cenário, a indenização não reduz o limite disponível da cobertura.

Exemplo:

```text
Soma assegurada: 10.000
Indenização: 1.000
↓
Capital permanece/restaura para 10.000
```

A interpretação apresentada é que 10.000 representa o teto de indenização aplicável por evento ou conforme a lógica do produto, sem redução permanente por pagamentos anteriores.

### 14.2 Soma assegurada reduzida pela indenização

Em outro cenário, a indenização reduz o capital restante.

Exemplo:

```text
Soma assegurada inicial: 10.000
Indenização: 4.000
↓
Capital remanescente: 6.000
```

Nesse caso, o processo de sinistros marca a apólice para um suplemento de redução de soma assegurada.

Foi informado que:

- o sistema permite executar esses suplementos automaticamente;
- no momento descrito, eles não são executados automaticamente;
- também é possível executá-los manualmente;
- se for tentado um endosso sem que a redução pendente tenha sido tratada, o sistema emite um alerta.

### Restauração posterior

O cliente pode solicitar restauração do capital original.

Exemplo:

```text
Capital remanescente: 6.000
Cliente deseja retornar a 10.000
↓
Suplemento de restauração de soma assegurada
↓
Cobrança de prima adicional correspondente
```

A reunião não detalha a fórmula de cálculo da prima adicional, o momento de vigência, regras de aceitação ou restrições comerciais para restauração.

---

## 15. Controle de quantidade de utilizações de serviços

Ao final, surgiu uma pergunta sobre coberturas com número máximo de utilizações por ano, como assistência jurídica ou outra assistência.

A resposta indica que isso é possível e que normalmente seria modelado como um atributo no nível da cobertura.

Exemplo conceitual:

```text
Cobertura: assistência em viagem
Atributo: número máximo de assistências
Valor: 4, 5 ou 10 utilizações
↓
Módulo de sinistros controla a quantidade de eventos realizados
```

A reunião não detalha como o contador é persistido, em quais eventos é incrementado, como são tratadas reversões, cancelamentos ou utilizações parciais.

---

## 16. Organização da configuração por níveis

A reunião descreve ao menos dois níveis de definição.

### 16.1 Nível da companhia

É onde a cobertura é definida de forma geral, com elementos como:

- identificador;
- nome;
- tipo.

A tela mencionada aparentemente lista todas as coberturas definidas pela companhia. A transcrição cita como exemplo uma cobertura de roubo de veículo configurada como “real independente”.

### 16.2 Nível do ramo

Depois, a cobertura é associada a um ramo. Nesse nível são definidos elementos como:

- ramo;
- modalidade, em ramos de vida quando aplicável;
- data de validade;
- ordem de apresentação;
- propriedades de capital;
- limites;
- intervalos;
- moeda;
- lógicas associadas.

A validade foi relacionada ao conceito de versão. A ordem determina a sequência em que as coberturas aparecem na tela de contratação.

---

## 17. Riscos de mudança de tipologia em produção

O apresentador alerta explicitamente que alterar a tipologia de uma cobertura já utilizada em produção pode causar problemas significativos.

Exemplo discutido:

```text
Cobertura real independente
↓
Alterada para cobertura de serviço
```

A diferença essencial apontada é que uma cobertura real independente possui soma assegurada, enquanto uma cobertura de serviço não possui. Portanto, apólices existentes, valores registrados, telas, cálculos e processos associados podem tornar-se inconsistentes.

Foi feita uma ressalva: alterar uma cobertura real independente para real dependente pode ser menos problemático em alguns casos, pois ambas possuem capital, embora ainda exija acomodação. Porém, alterar para serviço ou fictícia foi apresentado como um risco maior.

### Implicação analítica

A tipologia funciona como parte do contrato de dados e de comportamento da cobertura. Portanto, após existirem apólices em carteira, uma alteração de tipo não é apenas uma mudança de cadastro; pode exigir estratégia de migração, análise de impacto e governança de produção.

A transcrição não descreve um procedimento formal de migração, rollback, aprovação ou testes para essas mudanças.

---

## 18. Perguntas e respostas relevantes

## 18.1 Diferença entre básica adicional e real independente

### Pergunta

Foi solicitado esclarecimento sobre a relação entre a cobertura básica adicional, representada por continente, e uma cobertura real independente, como incêndio no exemplo.

### Resposta

A cobertura básica adicional possui capital, mas não possui prima. A cobertura real independente possui capital e prima, porém não toma o capital de outra cobertura.

### O que a resposta esclarece

A diferença não está apenas na existência de capital, mas na presença de prima e na origem do capital.

---

## 18.2 O que acontece se a cobertura-base tiver capital zero?

### Pergunta

Foi perguntado o que acontece com coberturas dependentes quando a cobertura-base — como conteúdo — recebe capital zero.

### Resposta

As coberturas dependentes também ficam com capital zero. Sem capital na cobertura-base, não é possível contratar de forma efetiva as coberturas que dependem dela.

### O que a resposta esclarece

A dependência de capital é operacional, não apenas referencial. Ela pode impedir a contratação prática de coberturas dependentes.

---

## 18.3 O capital pode ser informado manualmente ou vir por padrão?

### Pergunta

Foi perguntado se o capital pode ser inserido manualmente ou se vem por padrão.

### Resposta

A reunião indica que ambos os modelos são possíveis. O capital pode ser informado pelo usuário, determinado por dependência, proposto por modalidade, estabelecido por valor padrão ou calculado por lógica de negócio.

### O que a resposta esclarece

O modelo é parametrizável e admite diferentes origens de capital conforme o produto.

---

## 18.4 Como é calculada a prima de uma cobertura de serviço?

### Pergunta

Foi questionado se a prima de uma assistência residencial, por exemplo, seria calculada com base na soma assegurada de outra cobertura ou se seria um valor fixo.

### Resposta

O apresentador afirmou que, normalmente, a precificação pode considerar aspectos do serviço, como distância, quantidade de assistências ou regras semelhantes. A resposta foi dada como exemplo, não como regra absoluta.

### O que a resposta esclarece

Coberturas de serviço não precisam depender de capital para formação de preço.

---

## 18.5 Onde aparece uma cobertura de sinistro como “convênio”?

### Pergunta

Foi questionado como uma cobertura de convênio seria visualizada, já que não aparece na emissão.

### Resposta

Ela não aparece na tela de emissão nem para o cliente. Ela fica associada à apólice e é visível no contexto de sinistros, onde pode ser selecionada para uma tramitação específica.

### O que a resposta esclarece

A visibilidade da cobertura depende do módulo e do papel operacional envolvido.

---

## 18.6 A cobertura de sinistro pode ser liquidada e validada?

### Pergunta

Foi perguntado se uma cobertura de sinistro possui liquidação e validações contra valores da apólice.

### Resposta

No módulo de sinistros, ela é tratada como uma cobertura normal para efeitos de tramitação, validações, valoração e liquidação, embora não seja uma cobertura comercial comum.

### O que a resposta esclarece

A cobertura de sinistro é invisível na contratação, mas operacionalmente relevante no processo de sinistro.

---

## 18.7 Como visualizar uma fictícia de apólice?

### Pergunta

Foi perguntado onde seria possível visualizar um valor registrado em fictícia de apólice.

### Resposta

Quando existem fictícias de apólice, o sistema gera um risco zero. As fictícias de risco ficam associadas aos riscos correspondentes. Elas podem ser vistas na consulta da apólice, com detalhamento da informação econômica associada.

### O que a resposta esclarece

O sistema preserva visibilidade interna dos ajustes fictícios, mesmo que eles não sejam exibidos na contratação.

---

## 18.8 As coberturas fictícias aparecem na impressão da apólice?

### Pergunta

Foi perguntado se as coberturas fictícias aparecem no documento impresso entregue ao cliente.

### Resposta

Em princípio, não deveriam aparecer. Entretanto, isso depende da configuração do processo de impressão; se não forem filtradas corretamente, poderiam ser impressas.

### O que a resposta esclarece

Existe dependência entre a modelagem interna da apólice e a configuração de documentos de saída.

---

## 18.9 O que acontece com fictícias em suplementos e renovações?

### Pergunta

Foi perguntado se uma fictícia gerada para completar prêmio mínimo desaparece quando, em uma renovação ou suplemento, o valor das coberturas passa a atingir o mínimo.

### Resposta

A fictícia pode ser ajustada. Se a necessidade econômica deixar de existir, o valor pode ser devolvido ou não, conforme a regra de negócio desejada.

### O que a resposta esclarece

O tratamento de ajuste econômico é parametrizável e pode refletir decisões comerciais distintas.

---

## 18.10 É possível atualizar limites em massa?

### Pergunta

Foi perguntado se limites podem ser alterados de forma simples, por exemplo, de 2.000 em um ano para 2.500 no seguinte.

### Resposta

Foi informado que há formas de fazer isso de maneira massiva, para renovações, apólices novas ou outros cenários. Também se mencionou a existência de catálogos para configurar esses valores.

### O que a resposta esclarece

A configuração de limites possui mecanismos de evolução, embora o procedimento detalhado não tenha sido demonstrado.

---

## 18.11 É possível aplicar valores mínimos diferentes por moeda?

### Pergunta

Foi perguntado se uma apólice emitida em euro poderia ter um mínimo diferente de uma emitida em dólar.

### Resposta

A resposta foi positiva. Também foi mencionado que o sistema pode aplicar conversão cambial para verificar se o valor atinge o mínimo na moeda da apólice.

### O que a resposta esclarece

Regras econômicas podem ser definidas por moeda ou avaliadas por conversão, conforme configuração.

---

## 18.12 Coberturas podem ter moedas diferentes?

### Pergunta

Foi perguntado se diferentes coberturas poderiam ter moedas distintas.

### Resposta

Sim. Foram citados exemplos de despesas médicas em dólar, repatriação em euro e cancelamento de viagem na moeda da apólice quando não houver moeda específica configurada.

### O que a resposta esclarece

A moeda da cobertura pode ser tratada de forma independente da moeda de emissão da apólice.

---

## 18.13 O sistema controla quantidade anual de assistências?

### Pergunta

Foi perguntado se coberturas como assistência jurídica poderiam ter limite anual de utilizações.

### Resposta

Sim. O apresentador afirmou que isso normalmente seria definido por atributo da cobertura e controlado pelo módulo de sinistros.

### O que a resposta esclarece

O limite de uso de serviços pode ser tratado por atributos, não necessariamente por soma assegurada.

---

## 19. Limitações e ressalvas reconhecidas

### 19.1 Cobertura de capital ilimitado em desuso

O sistema suporta esse tipo, mas o apresentador afirma que ele está praticamente em desuso, pois coberturas ilimitadas não relacionadas a serviços seriam raras no mercado atual.

### 19.2 Ajustes e comportamentos dependem de parametrização

Diversos comportamentos foram apresentados como configuráveis, não universais:

- capital pode ser editável ou bloqueado;
- suplementos de redução podem ser automáticos ou manuais;
- fictícias podem ser devolvidas ou mantidas;
- lógicas podem ser relançadas ou o capital existente pode ser preservado;
- impressão pode ocultar ou expor indevidamente coberturas internas;
- cobertura pode ter moeda própria ou usar a moeda da apólice.

### 19.3 Não há detalhamento da tecnologia

A transcrição não permite identificar:

- arquitetura de aplicação;
- banco de dados;
- modelo de integração entre módulos;
- APIs;
- mensageria;
- mecanismos de auditoria;
- identidade e acesso;
- logs;
- observabilidade;
- controle de versões técnico;
- CI/CD;
- infraestrutura;
- cloud;
- estratégia de backup ou recuperação de desastre.

### 19.4 Regras de negócio permanecem parcialmente abertas

Embora vários mecanismos tenham sido explicados, não foram detalhados:

- fórmulas de tarifação;
- cálculo exato de prêmio;
- critérios de conversão cambial;
- regras fiscais;
- regras de resseguro;
- critérios de aceitação de risco;
- modelo de aprovação de desconto ou recargo;
- cálculo da prima de restauração;
- comportamento padrão ao revalorizar limites discretos;
- tratamento contábil das fictícias.

---

## 20. Riscos e desafios

## 20.1 Riscos explicitamente mencionados

| Risco | Contexto |
|---|---|
| Mudança de tipologia em produção | Pode gerar problemas graves quando já existem apólices em carteira |
| Revalorização de limite discreto | Pode resultar em valor intermediário que não existe na lista permitida |
| Impressão de coberturas internas | Coberturas fictícias ou de sinistro podem aparecer se o processo de impressão não as filtrar |
| Suplemento sem redução de capital pendente | O sistema alerta se houver redução de soma assegurada ainda não formalizada |
| Relançamento de lógica em suplemento | Pode reduzir capital previamente alterado manualmente e produzir impacto de preço inesperado |

## 20.2 Desafios derivados do contexto

> Os pontos abaixo são análises derivadas do conteúdo, não afirmações literais dos participantes.

### Governança de mudanças de produto

Como tipologias, limites, moedas e lógicas influenciam a emissão e os sinistros, mudanças de configuração exigem controle rigoroso. Uma alteração aparentemente simples pode afetar apólices existentes e fluxos operacionais.

### Rastreabilidade econômica

O uso de coberturas fictícias resolve a necessidade de não distorcer coberturas comerciais, mas exige que usuários internos entendam onde os valores estão armazenados, especialmente quando há risco zero e múltiplos níveis de ajuste.

### Consistência entre módulos

A mesma cobertura pode ter relevância diferente em emissão e sinistros. Isso exige alinhamento entre a configuração do produto e a definição dos processos de sinistro.

### Controle de documentos

Como as coberturas internas devem existir na consulta, mas normalmente não devem aparecer ao cliente, os modelos de impressão precisam estar alinhados com a classificação de cobertura.

### Gestão de moedas

Coberturas em moedas distintas da moeda da apólice introduzem dependências de conversão, tarifação, sinistros e resseguro. A reunião reconhece essas interações, mas não detalha seus controles.

---

## 21. Relações de causa e efeito reconstruídas

### 21.1 Dependência de cobertura

```text
Cobertura-base sem capital
↓
Coberturas dependentes não recebem capital
↓
Coberturas dependentes não podem operar como contratadas com valor positivo
```

### 21.2 Prêmio mínimo por risco

```text
Soma dos prêmios das coberturas é inferior ao mínimo exigido
↓
Redistribuir valores entre coberturas pode ser indesejável ou custoso
↓
Fictícia de risco absorve a diferença econômica
```

### 21.3 Custo administrativo por apólice

```text
Existe custo aplicável à apólice como um todo
↓
O custo não pertence a uma cobertura comercial específica
↓
Fictícia de apólice registra o valor
↓
Sistema cria risco zero para representá-la internamente
```

### 21.4 Avaliação externa de risco

```text
Ativo satélite avalia o risco
↓
Retorna desconto ou recargo
↓
Fictícia de ajuste registra o ajuste econômico
```

### 21.5 Convenção entre seguradoras

```text
Existe convênio entre seguradoras
↓
A tramitação padrão de responsabilidade civil pode não ser aplicável
↓
Cobertura interna de sinistro representa o fluxo de convênio
↓
Módulo de sinistros conduz processo específico
```

### 21.6 Capital calculado e modificado manualmente

```text
Lógica propõe capital
↓
Usuário altera o valor
↓
Em suplemento, há ambiguidade:
- manter valor anterior; ou
- recalcular pela lógica
↓
Sistema torna a escolha configurável
```

---

## 22. Transformações e princípios identificados

> Esta seção é interpretativa e sintetiza direções sustentadas pelo conteúdo apresentado.

### 22.1 Separação entre cobertura comercial e mecanismo interno

O modelo diferencia claramente o que o cliente contrata e visualiza daquilo que o sistema precisa manter para operar cálculos, ajustes e sinistros.

```text
Cobertura comercial
≠
Cobertura técnica interna
```

Coberturas de sinistro e fictícias demonstram que a apólice não é apenas uma lista de garantias visíveis; ela também contém elementos técnicos necessários à operação.

### 22.2 Parametrização como substituto de customização pontual

A reunião apresenta múltiplas decisões como configuráveis:

- tipo de cobertura;
- origem do capital;
- percentual de dependência;
- limites;
- intervalos;
- moeda;
- lógica de cálculo;
- edição manual;
- relançamento de lógica;
- redução ou restauração do capital.

Isso sugere uma orientação para suportar diferentes produtos, países ou regras de negócio por parametrização, em vez de depender exclusivamente de alteração de código.

### 22.3 Separação entre prêmio comercial e ajustes econômicos

As coberturas fictícias permitem manter valores econômicos fora das coberturas comerciais. Isso preserva a leitura de que o prêmio de uma garantia deve representar aquela garantia, enquanto mínimos, custos administrativos e ajustes externos ficam identificados separadamente.

### 22.4 Integração entre emissão e sinistros por meio da definição de cobertura

A classificação da cobertura determina não apenas sua apresentação comercial, mas também sua relevância no processo de sinistros. A cobertura de sinistro ilustra um modelo em que a definição de produto fornece elementos para a operação posterior.

---

## 23. O que a reunião não permite concluir

A transcrição não detalha suficientemente os seguintes pontos:

- nome e versão do sistema apresentado;
- arquitetura tecnológica;
- linguagem de programação;
- banco de dados;
- modelo de dados físico;
- integrações técnicas entre emissão, sinistros, resseguro e contabilidade;
- uso de APIs, eventos ou mensageria;
- estratégia de cálculo de câmbio;
- fonte de taxas cambiais;
- regras de arredondamento para cada operação;
- cálculo de tarifa e de prima;
- regras de tributação;
- critérios de aprovação de descontos e recargos;
- governança de ativos satélites;
- segurança, perfis e permissões;
- trilha de auditoria;
- controle de versões e publicação de configurações;
- homologação de regras de produto;
- migração de apólices quando ocorre mudança de tipologia;
- tratamento de cancelamento, estorno ou reversão de sinistros;
- regras de impressão e geração documental;
- SLAs, observabilidade, performance ou escalabilidade;
- regras formais de resseguro;
- processos contábeis associados a múltiplas moedas.

---

## 24. Conclusões

A reunião apresentou um modelo robusto de configuração de coberturas em seguros, no qual cada tipologia possui impacto direto sobre emissão, cálculo, visualização, economia da apólice e tramitação de sinistros.

Os principais conceitos consolidados foram:

1. **Coberturas possuem tipos mutuamente exclusivos**, e o tipo determina seu comportamento.
2. **Coberturas reais** possuem prima e podem ser dependentes ou independentes quanto ao capital.
3. **Coberturas básicas adicionais** possuem capital, mas não prima, e podem alimentar outras coberturas.
4. **Coberturas de serviço** possuem prima, mas não soma assegurada, sendo contratadas por inclusão ou exclusão.
5. **Coberturas de sinistro** são internas e suportam tramitações específicas no módulo de sinistros.
6. **Coberturas fictícias** registram informação econômica interna por risco, apólice ou ajuste.
7. **Capitais podem ser definidos por atributos, listas, limites duplos, intervalos, valores livres ou lógicas de negócio.**
8. **A moeda da cobertura pode ser diferente da moeda da apólice**, com reflexos em sinistros, tarifa e resseguro.
9. **O sistema pode propor capitais e permitir ou impedir sua alteração pelo emissor.**
10. **Suplementos exigem regras explícitas** quando um capital originalmente calculado foi alterado manualmente.
11. **Sinistros podem reduzir ou não a soma assegurada**, e o sistema suporta suplementos de redução e restauração.
12. **Mudanças de tipologia após entrada em produção representam risco elevado**, especialmente quando alteram a presença de soma assegurada, prima ou visibilidade da cobertura.

O conhecimento transmitido sustenta uma visão de produto segurador altamente parametrizável, na qual a configuração de cobertura constitui o ponto de ligação entre a proposta comercial, a emissão, os cálculos econômicos e a operação de sinistros.
