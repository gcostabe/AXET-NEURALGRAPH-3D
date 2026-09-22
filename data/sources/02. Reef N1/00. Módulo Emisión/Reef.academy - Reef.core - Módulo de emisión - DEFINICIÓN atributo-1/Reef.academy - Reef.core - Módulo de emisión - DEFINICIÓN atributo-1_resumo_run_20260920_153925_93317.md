# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.academy - Reef.core - Módulo de emisión - DEFINICIÓN atributo-1.mp4`
**Data de processamento:** 20/09/2026 15:44:12
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada — Configuração de atributos no RIFCore

## 1. Síntese executiva

A sessão foi um treinamento funcional e técnico sobre o conceito de **atributos** no sistema citado como **RIFCore** — em alguns trechos, a transcrição registra variações como “Rift Core” ou “RIFCOR”. O foco central foi explicar como atributos permitem registrar informações necessárias para produtos de seguros que não existem nativamente no sistema ou que, embora já existam em outras entidades, precisam ser explicitamente declaradas porque influenciam a tarifação.

A principal mensagem é que atributos não são apenas campos adicionais de tela. Eles compõem formulários em diversos níveis da apólice, participam da formação de modalidades/ofertas comerciais, podem receber valores derivados por lógica de negócio, podem disparar recálculo de prêmio, controlar unicidade, aparecer em sinistros, integrar-se ao resseguro, apoiar inspeções e, em certos casos, representar uma soma segurada.

A reunião também destacou que a configuração incorreta de um atributo — especialmente quanto ao nível em que ele é associado e à indicação de impacto tarifário — pode produzir efeitos relevantes: descontos aplicados indevidamente a diversos riscos ou coberturas, ausência de recálculo após uma alteração tarifária e, consequentemente, condições e prêmios potencialmente inconsistentes.

A apresentação permaneceu majoritariamente conceitual. Ao final, foi informado que a intenção é avançar posteriormente para demonstrações de operações do sistema, como renovação e revalorização de capitais, embora o instrutor tenha feito a ressalva de que não poderia garantir a cobertura de todos os cenários antes do término da formação.

---

## 2. Contexto e antecedentes

### 2.1. Sistema sem produtos pré-configurados

Foi explicado que o RIFCore, historicamente, não vinha configurado “de fábrica” com produtos prontos, tais como seguro de automóvel, residência ou vida. Isto significa que o sistema não possuiria, por padrão, a definição funcional completa dos riscos, coberturas, cláusulas e dados específicos de cada ramo.

Como consequência, ao construir um ramo ou produto, a organização precisa identificar quais informações são necessárias para:

- emitir apólices;
- realizar suplementos/endossos;
- elaborar orçamentos;
- tarifar riscos;
- identificar bens ou pessoas seguradas;
- apoiar sinistros, inspeções e integrações.

O instrutor indicou que, mais recentemente, as áreas de negócio estariam chegando a definições mais padronizadas para determinados ramos. Segundo a explicação, essa evolução reduz a dificuldade de levar um ramo para diferentes países, pois características como coberturas e cláusulas poderiam passar a ter maior consenso. A transcrição não detalha quais países, áreas ou padrões foram formalmente definidos.

### 2.2. Problema de modelagem do risco

O exemplo recorrente foi o seguro de automóvel. Para identificar um veículo, podem ser necessários dados como:

- marca;
- modelo;
- ano de fabricação;
- valor;
- placa/matrícula;
- número de série.

Esses elementos não seriam necessariamente disponibilizados como propriedades nativas do sistema. Assim, devem ser configurados como atributos quando necessários para o produto.

A mesma necessidade pode surgir para outros dados específicos, como:

- país de destino;
- campanha comercial;
- situação de garagem;
- endereço da garagem;
- percentual de desconto;
- modalidade comercial, como ouro, prata ou bronze.

---

## 3. Conceito de atributo

## 3.1. Definição funcional

Segundo a explicação apresentada, um atributo é utilizado em duas situações principais:

1. **Informação necessária que não existe previamente no sistema**  
   Exemplo: marca, modelo, placa, número de série ou campanha comercial.

2. **Informação que já existe no sistema, mas afeta a tarifa**  
   Exemplo: data de nascimento, sexo, código postal, país ou província, quando tais informações influenciam o cálculo do seguro.

No segundo caso, o sistema exigiria que a propriedade existente fosse também declarada como atributo do ramo quando ela participa da tarifação. A data de nascimento, por exemplo, poderia já existir no cadastro de terceiro/segurado; contudo, se influenciar o prêmio de um seguro de vida ou acidentes, deve ser disponibilizada também como atributo tarifário.

### 3.2. Atributo como referência a uma informação existente

Quando o dado já existe em outra entidade, o atributo não necessariamente representa uma duplicação manual da informação. A reunião mostrou que ele pode ser alimentado por uma lógica que busca o valor na origem adequada.

Exemplo discutido:

```text
Cadastro do terceiro / segurado
        ↓
Data de nascimento
        ↓
Lógica de negócio
        ↓
Atributo tarifário da apólice ou do risco
        ↓
Cálculo ou recálculo da tarifa
```

Nesse cenário, a data de nascimento registrada no cadastro do segurado seria transportada para o atributo. A intenção é que a pessoa que emite a apólice não precise alterar esse valor diretamente, pois a correção deveria acontecer na origem — isto é, no cadastro do terceiro.

---

## 4. Problemas que os atributos resolvem

| Problema | Consequência sem atributos | Uso apresentado para o atributo |
|---|---|---|
| O sistema não possui determinado dado específico do produto | Não há onde registrar informações necessárias à contratação, identificação ou operação | Criar atributos como marca, placa, modelo, país de destino ou campanha |
| Uma propriedade existente influencia o preço | O motor de cálculo pode não considerar formalmente a alteração desse dado | Declarar a propriedade como atributo que afeta a tarifa |
| Um dado deve variar por apólice, risco ou cobertura | O valor pode ser aplicado na granularidade errada | Associar o atributo ao formulário correto |
| O dado possui valor previsível ou derivado | A emissão pode exigir preenchimento manual desnecessário | Aplicar lógica ou valor padrão |
| Um identificador não pode se repetir em apólices vigentes | Pode haver duplicidade ou potencial sobreseguro/fraude | Configurar o atributo como único |
| A informação é relevante para sinistros ou inspeções | O operador precisa consultar diversas telas ou não consegue localizar o risco | Exibir em sinistros e usar como critério de inspeção |
| Um capital depende de informação declarada na contratação | A soma segurada não é alimentada adequadamente | Transformar atributo numérico em soma segurada de cobertura |

---

## 5. Atributos como formulários

Os atributos formam formulários exibidos durante operações como emissão de apólice. A reunião descreve quatro níveis de formulário:

1. **Formulário de apólice**
2. **Formulário de risco**
3. **Formulário de cobertura**
4. **Formulário de ocorrência**

O quarto nível — ocorrência — foi mencionado, mas não explicado em profundidade nesta sessão. Portanto, não é possível determinar com segurança sua finalidade operacional específica apenas com base nesta transcrição.

### 5.1. Efeito do nível de associação

A escolha do nível em que o atributo é criado altera seu alcance funcional.

O exemplo usado foi um atributo de percentual de desconto:

```text
Atributo no nível da apólice
        ↓
Um único percentual é aplicado aos riscos da apólice
```

```text
Atributo no nível do risco
        ↓
Cada risco pode possuir seu próprio percentual
```

```text
Atributo no nível da cobertura
        ↓
Cada cobertura de cada risco pode possuir um percentual específico
```

A apresentação reforçou que essa escolha deve ser feita com cuidado. Um atributo definido em um nível excessivamente amplo pode afetar diversos riscos ou coberturas sem que essa seja a intenção do produto.

### 5.2. Exemplo: desconto em apólice com três riscos

Se uma apólice possuir três riscos e o atributo “percentual de desconto” for definido no nível da apólice, um desconto de 15% impactará os três riscos.

Caso o mesmo atributo seja definido no nível de risco, cada risco poderá ter um desconto próprio. Se definido no nível de cobertura, a granularidade será ainda maior.

---

## 6. Definição básica de um atributo

A configuração apresentada contém, ao menos, os seguintes elementos.

| Propriedade | Finalidade apresentada |
|---|---|
| Nome/chave | Identificador do atributo |
| Descrição | Texto que poderá ser exibido para quem emite a apólice |
| Tipo | Define se o conteúdo é caráter, numérico ou data |
| Tamanho máximo | Limita o tamanho do valor informado |
| Nível/formulário | Define se o atributo pertence à apólice, risco, cobertura ou ocorrência |
| Ordem | Define a posição do atributo no formulário |
| Data de validade | Indica quando a configuração passa a produzir efeito |
| Associação ao ramo | Permite usar o atributo no ramo correspondente |
| Associação a cobertura | Necessária quando o atributo é configurado no nível de cobertura |
| Formação de modalidade | Determina se participa da composição de modalidades/ofertas |
| Ajuda | Define apoio à seleção de valores |
| Valor padrão/lógica | Permite preencher ou controlar o conteúdo automaticamente |
| Afeta cálculo | Indica se sua alteração exige tarifação ou recálculo |
| Único | Controla duplicidade em apólices vigentes |
| Solicitar em orçamento | Define se deve ser exigido na cotação/orçamento |
| Exibir em sinistro | Determina se aparece em tela de sinistro |
| Obrigatório | Indica se deve possuir valor |
| Validação | Permite validar o valor por lógica de negócio |
| Controle técnico | Permite preservar o atributo no log de uma operação rejeitada |
| Resseguro | Indica se deve ser enviado a ferramenta de resseguro |
| Inspeção | Determina participação em formulários e buscas de inspeção |
| Soma segurada | Permite que um atributo numérico seja usado como capital de cobertura |
| Revalorização | Define o tratamento futuro de um capital vinculado ao atributo |

---

## 7. Convenções de nomenclatura

O instrutor recomendou utilizar chaves alfanuméricas que indiquem o conteúdo do atributo. Foi uma recomendação de legibilidade e manutenção, não uma imposição apresentada como regra técnica obrigatória.

Exemplos citados ou sugeridos:

| Prefixo ou nome | Significado indicado |
|---|---|
| `COD` | Código |
| `FEC` | Data |
| `IMP` | Valor/importância monetária |
| `MCA` | Marca ou indicador de sim/não |
| `NOM` | Nome |
| `APE` | Apelido/sobrenome |
| `PCT` | Percentual |
| `TIPO` | Valores predefinidos com consequências distintas |
| `VAL` | Valor genérico |

Exemplos de chaves ilustrativas:

- `COD_PAIS`
- `FEC_TARIFA`
- `PCT_DESCUENTO_CAMPANA`

A lógica da convenção é que, ao visualizar o atributo em configurações futuras, seja possível inferir rapidamente o tipo ou finalidade do valor sem depender exclusivamente da descrição.

---

## 8. Tipo e formato dos valores

## 8.1. Tipos mencionados

Foram citados três tipos principais:

- caracteres;
- numéricos;
- datas.

Os campos numéricos foram associados a valores como importes, descontos e percentuais.

## 8.2. Datas

Foi explicado que o preenchimento de datas ocorre sem separadores, isto é, sem hífen e sem barra. A transcrição exemplifica o formato com dia, mês e ano em quatro posições para o ano.

Também foi mencionado que a configuração inicial do sistema pode definir formatos diferentes de data para determinados contextos, incluindo a ordem mês-dia-ano em casos associados aos Estados Unidos.

A reunião não detalha o mecanismo exato dessa parametrização, nem especifica todos os formatos suportados.

## 8.3. Comprimento máximo

O tamanho máximo deve ser configurado de acordo com o formato e o domínio esperado.

Exemplos:

- percentual de até `99,99`: comprimento cinco;
- data sem separadores: comprimento oito.

---

## 9. Reutilização e associação ao ramo

Foi explicado que o atributo é definido no nível da companhia para permitir reutilização entre diferentes ramos. Por exemplo, um atributo de percentual de desconto poderia ser criado uma única vez e associado a diversos produtos.

```text
Definição corporativa do atributo
        ↓
Reutilização em diferentes ramos
        ↓
Configuração específica por ramo
```

Para ramos de vida, foi mencionada uma possibilidade adicional: associar um atributo a uma ou mais **modalidades de vida**. O instrutor ressaltou que, nesse ponto, não se tratava da oferta comercial, mas de modalidades de vida.

A transcrição não detalha tecnicamente a diferença completa entre modalidades de vida e modalidades de oferta comercial.

---

## 10. Ordem e data de validade

## 10.1. Ordem do formulário

Como os atributos são apresentados como formulários, a ordem define a posição em que cada campo aparecerá para o usuário.

## 10.2. Data de validade

A data de validade foi apresentada como um substituto prático do versionamento numérico. Em vez de trabalhar explicitamente com versões 1, 2 ou 3, configura-se a partir de qual data determinada definição ou alteração passa a valer.

Exemplo apresentado:

- um atributo é definido como válido a partir de 15 de dezembro;
- antes dessa data, uma associação ou modificação realizada não deve ser exibida ou exigida;
- mudanças posteriores também possuem sua própria efetividade.

A explicação sugere que a data de validade controla a aplicação histórica das configurações. Porém, a transcrição não detalha como o sistema resolve conflitos entre múltiplas alterações efetivas na mesma data.

---

## 11. Atributos na formação de modalidades e ofertas comerciais

A reunião retomou conceitos discutidos em sessões anteriores sobre formação de oferta comercial. Foram citados três cenários:

1. o ramo não trabalha com oferta comercial;
2. a modalidade/oferta é explícita;
3. a modalidade/oferta é implícita.

A transcrição informa que atributos podem participar da formação dessas modalidades.

### 11.1. Modalidade explícita

Segundo a explicação, a modalidade explícita é formada por um dado ou atributo. Um exemplo ilustrativo seria uma escolha entre:

- ouro;
- prata;
- bronze.

Nesse caso, o atributo informado identifica diretamente a modalidade.

### 11.2. Modalidade implícita

A modalidade implícita pode depender de vários atributos. As respostas combinadas pelo usuário determinariam a modalidade formada.

### 11.3. Implicação funcional

Ao marcar que um atributo “forma modalidade”, a configuração indica que ele será considerado posteriormente na definição da oferta comercial e, conforme a explicação, poderá ajudar a determinar as coberturas ofertadas.

---

## 12. Ajuda ao preenchimento

Foi apresentada uma configuração de ajuda para orientar a pessoa que emite a apólice. O exemplo foi um atributo de modalidade com valores como ouro, prata e bronze.

A ajuda seria acionada por um elemento visual descrito como “lupa”, exibindo uma lista de valores permitidos ou disponíveis.

A explicação mencionou que a configuração pode se vincular a tabelas Oracle — nome pronunciado de formas diferentes na transcrição — e que seria possível escolher uma versão da lista apresentada.

Exemplo conceitual:

| Versão da ajuda | Forma de apresentação ilustrada |
|---|---|
| Versão 1 | Chave + descrição: `1 - Ouro`, `2 - Prata`, `3 - Bronze` |
| Versão 2 | Somente descrição: `Ouro`, `Prata`, `Bronze` |

O instrutor classificou essa parte como técnica e orientou participantes não desenvolvedores a reterem principalmente o conceito: é possível configurar como a ajuda aparecerá ao usuário.

### Limitação de entendimento

A reunião não detalha:

- estrutura das tabelas;
- modelo de acesso aos dados;
- regras de segurança;
- mecanismo de versionamento;
- como as ajudas são mantidas;
- se a consulta é síncrona, local ou integrada.

---

## 13. Valores padrão e lógica de negócio

## 13.1. Propósito

Uma lógica de negócio pode fornecer automaticamente o valor inicial de um atributo. Além disso, essa lógica pode determinar se o usuário poderá modificar o valor apresentado.

Foram descritos três comportamentos principais:

| Comportamento | Exemplo apresentado |
|---|---|
| Valor padrão modificável | País de nascimento inicialmente preenchido com Guatemala, mas alterável se necessário |
| Valor padrão não modificável | Data de nascimento buscada no cadastro do segurado |
| Valor fixo configurado sem lógica | “Não” como valor padrão para a pergunta sobre o veículo dormir em garagem |

## 13.2. Exemplo: país de nascimento

Se a emissão ocorre na Guatemala, o sistema poderia apresentar “Guatemala” como valor padrão do país de nascimento. Porém, se o segurado nasceu em outro país, a pessoa que emite a apólice poderia alterar o valor.

## 13.3. Exemplo: data de nascimento

Quando a data de nascimento é obtida automaticamente do cadastro do segurado e é relevante para tarifação, a orientação apresentada é não permitir alteração no atributo.

A justificativa é preservar a consistência: se a data estiver errada, o ajuste deve ser feito no cadastro do terceiro, não em uma cópia localizada no atributo.

## 13.4. Atualização e suplementos

Foi explicado que o valor não modificável pode ser atualizado/“refrescado” em operações posteriores, como um suplemento.

O exemplo utilizou idade e data de nascimento: em uma alteração posterior, o sistema poderia buscar novamente a informação adequada, desde que a lógica esteja preparada para isso. O ponto central é que o usuário não altera livremente o dado no formulário de atributos; a atualização viria da origem ou da lógica configurada.

---

## 14. Atributos que afetam cálculo e recálculo

## 14.1. Função da marcação “afeta a tarifa”

A propriedade “afeta cálculo” ou “afeta tarifa” determina que o valor do atributo pode modificar o custo do seguro.

Exemplos discutidos:

- data de nascimento;
- percentual de desconto;
- código postal;
- informações que aumentem ou reduzam a avaliação de risco;
- idade que leve à aplicação de recargo.

O exemplo de idade sugeriu um recargo para condutores abaixo de determinada faixa etária, embora o percentual e a faixa tenham sido apresentados apenas como ilustração.

## 14.2. Gatilho de recálculo

O sistema utilizaria essa marcação para saber quando precisa recalcular a apólice durante um suplemento.

```text
Alteração em atributo marcado como tarifário
        ↓
Sistema identifica mudança relevante ao cálculo
        ↓
Recálculo/tarifação é executado
        ↓
Resultado pode gerar cobrança, devolução ou nenhum ajuste de prêmio
```

O instrutor reforçou que o recálculo não significa necessariamente cobrança adicional. O resultado depende da nova tarifação e das condições alteradas.

## 14.3. Exemplo: alteração da data de nascimento

Foi apresentado o seguinte cenário:

1. a apólice é emitida com determinada data de nascimento;
2. o sistema calcula a tarifa com base nessa informação;
3. posteriormente, em um suplemento, altera-se apenas a data de nascimento;
4. mesmo sem alterar coberturas, capitais ou franquias, o sistema deve recalcular se o atributo estiver marcado como tarifário.

## 14.4. Exemplo: alteração do percentual de desconto

Da mesma forma, alterar um desconto de 10% para 15% deve disparar recálculo se o atributo estiver corretamente classificado como impactante para a tarifa.

## 14.5. Risco de configuração incorreta

A reunião foi enfática nesse ponto.

### Se um atributo afeta a tarifa, mas for configurado como não tarifário

O sistema pode registrar a alteração, mas não recalcular o prêmio. Segundo o instrutor, isso pode gerar consequências graves, pois condições relevantes da apólice seriam alteradas sem refletir adequadamente no cálculo.

### Se um atributo não afeta a tarifa, mas for configurado como tarifário

O sistema poderá recalcular desnecessariamente. O instrutor avaliou esse caso como, em princípio, menos grave do que deixar de recalcular uma mudança realmente tarifária, mas reconheceu que também pode produzir efeitos inadequados, inclusive geração indevida de prêmio dependendo da configuração do produto.

---

## 15. Unicidade de atributos

## 15.1. Objetivo

A marcação de atributo único indica que determinado valor só deve existir em uma apólice vigente por vez.

O exemplo principal foi a placa/matrícula de veículo.

```text
Placa de veículo
        ↓
Busca em carteira para a data relevante
        ↓
Existe apólice vigente com a mesma placa?
        ├── Sim → erro
        └── Não → registro permitido
```

A busca considera a vigência. Portanto, seria possível que a mesma placa aparecesse em apólices distintas em períodos não sobrepostos, como após cancelamento de uma apólice anterior e contratação de outra em período posterior.

## 15.2. Possíveis finalidades

A transcrição menciona evitar duplicidade e cita, em discussão, o risco de sobreseguro ou fraude. A finalidade exata dependeria da regra de negócio definida para o produto.

## 15.3. Questão sobre reabilitação de apólice anulada

Um participante perguntou se, ao reabilitar uma apólice anulada, a validação de unicidade também ocorreria.

O instrutor não confirmou o comportamento. Ele afirmou acreditar que talvez a reabilitação não realizasse essa validação e classificou a possibilidade como um potencial bug, sugerindo que o cenário deveria ser testado.

### Conclusão rastreável

Não é possível concluir, pela reunião, como o sistema efetivamente se comporta em reabilitações. O comportamento precisa ser validado no ambiente ou na documentação do produto.

---

## 16. Valor padrão em atributos únicos

Foi detalhado um comportamento específico: quando um atributo único possui valor padrão e a apólice registra exatamente esse valor padrão, o sistema não realiza a busca por duplicidade na carteira.

O exemplo foi:

```text
Atributo: placa
Único: sim
Valor padrão: “sem placa”
```

Cenário:

- uma apólice possui placa `A1111`;
- outra possui placa `A2222`;
- novas apólices ainda podem receber o valor padrão “sem placa”, caso o veículo ainda não possua placa conhecida;
- nessas situações, o sistema não acusaria duplicidade por “sem placa”;
- quando a placa real for informada em suplemento/endosso, a validação de unicidade deverá ser aplicada.

A justificativa é operacional: em alguns países, a placa só é conhecida no momento da entrega do veículo. Assim, não seria viável impedir múltiplas propostas ou apólices temporariamente registradas com esse valor provisório.

---

## 17. Solicitação de atributos em orçamento

A reunião distinguiu orçamento de apólice. O orçamento é uma operação própria e, segundo o instrutor, a seguradora costuma possuir uma obrigação temporária de respeitar as condições oferecidas.

A configuração permite determinar se determinado atributo será solicitado durante a elaboração do orçamento.

### 17.1. Regra funcional apresentada

Atributos que não afetam a tarifa podem, em certos casos, não ser solicitados no orçamento, tornando o processo mais rápido.

Entretanto, se o atributo influencia o cálculo, o sistema não permitiria defini-lo como dispensado no orçamento, pois isso poderia levar à apresentação de um preço incorreto.

```text
Atributo necessário à tarifa
        ↓
Deve ser solicitado no orçamento
        ↓
Preço pode ser calculado com os dados relevantes
```

---

## 18. Exibição de atributos em sinistros

Foi explicado que a pessoa responsável pela abertura ou tramitação de um sinistro pode consultar a apólice. Além disso, as telas de sinistro possuiríam uma área que apresenta informações da apólice sem exigir navegação adicional.

A propriedade apresentada determina se um atributo deve aparecer nessa área.

Exemplo:

- a placa do veículo pode ser exibida na tela de sinistros;
- isso evita que o analista de sinistros precise abrir a consulta completa da apólice apenas para identificar o veículo.

A transcrição não detalha quais telas, fluxos ou perfis de usuário têm acesso a essas informações.

---

## 19. Obrigatoriedade condicional

## 19.1. Obrigatoriedade convencional

A marcação “obrigatório” indica que o atributo deve possuir valor. Foi confirmado que, na interface, isso é normalmente indicado por um asterisco vermelho.

## 19.2. Exceção por lógica prévia

A reunião explicou uma exceção relevante: um atributo obrigatório pode permanecer sem valor quando uma lógica anterior determina que ele não deve ser solicitado ou não pode ser alterado.

O exemplo foi a localização da garagem.

### Estrutura do exemplo

```text
Veículo dorme em garagem?
        ↓
Se sim:
        ↓
Garagem fica no mesmo endereço?
        ↓
Se não:
        ↓
Solicitar rua, número e código postal da garagem
```

Se a garagem estiver no mesmo endereço do proprietário ou condutor, o sistema já possuiria essa informação no cadastro existente. Nesse caso, não seria necessário solicitar novamente rua, número e código postal.

Se estiver em endereço diferente, os campos de endereço precisam ser informados.

### Comportamento da lógica

A lógica anterior pode:

- limpar os valores dos campos que deixaram de ser necessários;
- torná-los não editáveis;
- impedir que sejam solicitados ao operador;
- permitir que permaneçam vazios mesmo se estiverem configurados como obrigatórios.

A explicação sugere que, para o sistema, a lógica que decide que o campo não deve ser solicitado prevalece sobre a exigência convencional de obrigatoriedade.

### Implicação

A obrigatoriedade não deve ser interpretada isoladamente. Ela precisa ser analisada junto das regras de valor padrão, editabilidade e lógica de negócio.

---

## 20. O que deve — e o que não deve — ser atributo tarifário

Um participante questionou se todos os dados que influenciam a tarifa e não pertencem ao cadastro de terceiro deveriam ser armazenados como atributos.

A resposta foi que **não necessariamente**.

Foram citados dados básicos da própria apólice que também podem afetar o cálculo sem se tornarem atributos, tais como:

- moeda;
- data de efeito/início;
- vencimento.

Segundo o instrutor, atributos tarifários são frequentemente — “em 99,9% dos casos”, na estimativa verbal apresentada — propriedades de terceiro relacionadas ao risco, como:

- data de nascimento;
- sexo;
- código postal.

A interpretação correta é que atributos complementam o modelo nativo da apólice e do risco, mas não substituem todos os dados básicos que já possuem tratamento estrutural próprio no sistema.

---

## 21. Maiúsculas e minúsculas

Foi apresentada uma propriedade para determinar se o atributo admite letras minúsculas.

O instrutor informou que, normalmente, o registro de informações no RIFCore ocorre em letras maiúsculas, mas reconheceu que alguns atributos poderiam exigir preservação ou aceitação de minúsculas.

A transcrição não esclarece:

- se a regra afeta armazenamento, apenas exibição ou ambos;
- se há conversão automática;
- se caracteres especiais são tratados;
- quais atributos exigiriam minúsculas.

---

## 22. Validação de atributos

## 22.1. Lógica de validação

É possível associar uma lógica de negócio para verificar se o conteúdo informado é válido.

Exemplo:

```text
Atributo: país
        ↓
Lógica consulta tabela de países do sistema
        ↓
Valor existe?
        ├── Sim → validação aprovada
        └── Não → valor inválido
```

O instrutor indicou que o sistema possui uma tabela de países, mas não detalhou sua origem, manutenção ou abrangência.

## 22.2. Comportamento para atributo vazio

Foi explicada uma distinção importante:

| Situação | Validação padrão |
|---|---|
| Atributo não obrigatório e vazio | A validação não é acionada |
| Atributo obrigatório e vazio | O sistema devolve erro de obrigatoriedade |
| Atributo obrigatório e preenchido | A lógica de validação pode ser executada |
| Campo dispensado por lógica prévia | A lógica que controla o campo prevalece |

## 22.3. Forçar validação em campo vazio

Foi citada uma propriedade incomum que permite executar a validação mesmo quando o atributo não é obrigatório e está vazio.

Um participante resumiu corretamente a intenção: essa configuração “força” que a validação seja executada sempre, independentemente da obrigatoriedade. O instrutor confirmou essa leitura.

A reunião não detalha os casos de negócio que justificariam essa configuração.

---

## 23. Controle técnico e rastreabilidade de movimentos rejeitados

Foi retomado o conceito de **controle técnico**. Segundo a explicação:

- uma apólice ou suplemento pode ficar retido nesse controle;
- nesse estado, uma grande parte das informações é gravada, mas o processo ainda não está completo;
- elementos como plano de pagamento, recibos ou outras etapas ainda podem não ter sido gerados;
- se o movimento for autorizado, a geração é concluída;
- se for rejeitado, a apólice ou suplemento é apagado.

O instrutor afirmou que o apagamento é uma das poucas operações de exclusão no sistema. Ainda assim, permaneceria um log/trilha com algumas informações básicas, como dados do tomador, agente, início e vencimento.

A propriedade discutida permite definir se o valor de um atributo deve ser preservado nesse log quando o movimento for rejeitado.

Exemplo:

- se a placa for marcada para gravação no controle técnico;
- e uma apólice for rejeitada;
- a placa poderá ficar registrada na trilha/log da operação rejeitada.

### Limitação

Não foram detalhados:

- prazo de retenção;
- políticas de acesso;
- proteção de dados pessoais;
- conteúdo completo do log;
- mecanismo de consulta;
- auditoria sobre mudanças nesses registros.

---

## 24. Integração com resseguro

A sessão indicou que o sistema possui módulo próprio de resseguro e também poderia integrar-se a outro módulo citado como **RE21**.

A transcrição afirma que o RE21 teria sido desenvolvido na Mapfre e estaria ligado à Mapfre Re/Mapfre Resseguro. O nome e a relação organizacional foram citados oralmente, mas não foram tecnicamente detalhados ou validados nesta sessão.

A propriedade de resseguro do atributo define se seu valor deve ser enviado para a ferramenta de resseguro integrada.

Exemplo conceitual:

```text
Atributo da apólice ou risco
        ↓
Configuração de envio para resseguro
        ↓
Ferramenta de resseguro integrada
```

### O que não foi detalhado

A reunião não permite concluir:

- quais atributos são obrigatórios para resseguro;
- qual formato de integração é utilizado;
- se a transmissão é em tempo real, lote, arquivo ou API;
- como erros de integração são tratados;
- se há retorno da ferramenta de resseguro;
- se RE21 é a única integração suportada.

---

## 25. Inabilitação e reativação de atributos

A propriedade “inabilitado” permite retirar um atributo de novas apólices.

Comportamento descrito:

- apólices existentes que já possuem o atributo continuam exibindo-o;
- novas apólices deixam de receber o atributo;
- o atributo pode ser reativado posteriormente;
- se reativado e obrigatório, poderá ser exigido em suplementos futuros;
- em renovação automática em lote, a ausência de valor pode gerar erro, salvo se houver valor padrão.

A resposta sobre a reativação foi direta: um atributo inabilitado pode voltar a ficar ativo.

### Implicação operacional

A inabilitação não equivale à exclusão histórica do atributo. Trata-se de uma descontinuação para novas utilizações, preservando a visibilidade de registros já existentes.

---

## 26. Relação dos atributos com inspeções

## 26.1. Papel do módulo de inspeções

Foi mencionado um módulo de inspeções cuja finalidade é ajudar a determinar se um risco é segurável.

Exemplos de objetos potencialmente inspecionáveis:

- veículo;
- fábrica;
- pessoa;
- outros riscos.

A inspeção pode ocorrer:

- antes da contratação/emissão;
- após a emissão.

Em um cenário prévio à emissão, pode haver solicitação de inspeção mesmo antes de existir orçamento ou apólice.

## 26.2. Formulário de inspeção

A pessoa responsável pela inspeção — chamada de perito ou inspetor — precisa preencher um formulário com dados que identifiquem e descrevam o risco.

No caso de um veículo, foram citados exemplos como:

- placa;
- número de série;
- marca;
- modelo;
- ano;
- cor.

Os atributos são usados para compor esse formulário.

## 26.3. Atributos que devem constar na inspeção

Nem todo atributo da apólice precisa estar no formulário de inspeção.

Exemplo:

| Atributo | Participação esperada na inspeção segundo o exemplo |
|---|---|
| Placa | Sim, porque ajuda a identificar o veículo |
| Número de série | Sim, porque ajuda a identificar o veículo |
| Marca/modelo/cor | Possivelmente sim, conforme a inspeção |
| Veículo dorme em garagem | Não necessariamente, pois não seria central para identificação física do risco no exemplo |

## 26.4. Retenção da emissão por inspeção

Quando a contratação determina que o risco é inspecionável, a apólice pode ficar retida enquanto o sistema tenta localizar uma inspeção correspondente.

```text
Emissão da apólice
        ↓
Risco exige inspeção?
        ├── Não → fluxo segue
        └── Sim
             ↓
       Sistema procura inspeção correspondente
             ↓
       Inspeção encontrada e favorável?
             ├── Sim → emissão pode seguir
             └── Não / não encontrada → apólice fica retida
```

A transcrição utiliza um termo que parece ser “CAO” para um determinado estado ou resultado de inspeção, mas não explica a sigla. Portanto, ela não deve ser expandida ou interpretada além do que foi dito.

---

## 27. Busca de riscos no módulo de inspeções

## 27.1. Atributos como chaves de busca

Atributos podem ser configurados como elementos usados para localizar o risco no módulo de inspeções.

Exemplo:

```text
Informações registradas na inspeção
        ↓
Placa + número de série + demais atributos definidos
        ↓
Busca na emissão da apólice
        ↓
Localização da inspeção correspondente
```

A escolha dos atributos de busca é crítica. A reunião enfatizou que usar dados pouco seletivos, como cor ou marca, pode tornar a busca lenta ou pouco precisa.

## 27.2. Operadores de comparação

Foram citados dois modos:

- igualdade;
- aproximação, associada pelo instrutor ao operador `LIKE` de Oracle.

A transcrição não define todos os operadores disponíveis nem seu comportamento exato.

## 27.3. Ordem de busca

Também é necessário definir a ordem dos atributos usados na busca.

A recomendação foi priorizar atributos com maior capacidade de distinguir o risco, isto é, maior cardinalidade.

Exemplo de raciocínio:

```text
Menos eficiente:
marca → modelo → cor → número de série
```

```text
Mais eficiente:
número de série → placa → demais informações
```

A lógica apresentada é que começar por elementos pouco exclusivos pode obrigar o sistema a examinar um volume maior de candidatos antes de encontrar o risco correto.

## 27.4. Cardinalidade

Foi explicado que atributos binários, como “sim/não”, possuem baixa cardinalidade, enquanto placa, documento ou número de série tendem a possuir maior capacidade de diferenciação.

| Exemplo de atributo | Cardinalidade relativa no contexto explicado | Adequação como primeiro critério de busca |
|---|---:|---|
| Veículo em garagem: sim/não | Baixa | Baixa |
| Cor | Baixa ou média | Baixa |
| Marca | Média | Limitada |
| Código postal | Maior que binários, mas compartilhado | Moderada |
| Documento do tomador | Alta | Alta, conforme a regra |
| Placa | Alta | Alta |
| Número de série | Muito alta | Muito alta |

Essa tabela é uma reorganização analítica dos exemplos apresentados; a reunião não forneceu números formais de cardinalidade.

---

## 28. Atributos como soma segurada

## 28.1. Conceito

Um atributo numérico pode funcionar como soma segurada ou capital de uma cobertura.

O exemplo utilizado foi o valor do veículo:

```text
Valor informado para o veículo: 10.200
        ↓
Atributo numérico
        ↓
Utilização como soma segurada de uma cobertura
```

O instrutor reforçou que a soma segurada pertence inicialmente ao contexto das coberturas, mas pode ser alimentada por um atributo.

## 28.2. Restrição por tipo

Essa funcionalidade se aplica somente a atributos numéricos. Não faria sentido para atributos de data ou caráter.

Exemplos:

| Atributo | Pode ser soma segurada? |
|---|---|
| Valor do veículo | Sim |
| Percentual de desconto | Não, apesar de ser numérico |
| Data de nascimento | Não |
| Marca do veículo | Não |

---

## 29. Revalorização de somas seguradas

## 29.1. Possibilidades apresentadas

Quando um atributo numérico é definido como soma segurada, pode-se indicar se ele será revalorizado ou depreciado em renovações.

Foram citadas as seguintes possibilidades:

- não revalorizar;
- definir a revalorização no próprio ramo;
- definir a revalorização na contratação;
- utilizar capital atual;
- utilizar capital inicial;
- usar IPC;
- usar outro índice;
- usar uma lógica/objeto de negócio.

A expressão “objeto” foi definida como uma lógica que estabelece o tipo de revalorização.

## 29.2. Exemplos de comportamento

### Veículo

Foi indicado que veículos normalmente se depreciam. Um veículo que vale 10.200 em um período poderia valer menos em uma renovação futura.

### Imóvel

Foi apresentado como exemplo de bem que poderia ser revalorizado para cima, de acordo com a regra estabelecida.

Esses exemplos são didáticos; a reunião não afirmou que todos os produtos de automóvel ou residência adotam essas regras.

## 29.3. Capital atual versus capital inicial

A diferença foi explicada com um exemplo de capital inicial de 100.000.

| Momento | Capital |
|---|---:|
| Emissão | 100.000 |
| Primeira renovação após incremento ilustrativo | 101.000 |
| Segunda renovação | Pode trabalhar sobre 101.000 ou sobre 100.000 |

- **Capital atual:** a nova revalorização incide sobre o valor já atualizado, como 101.000.
- **Capital inicial:** a referência permanece o valor original, como 100.000.

O instrutor esclareceu que isso define a base sobre a qual a revalorização será aplicada, mas não define, por si só, o índice ou percentual da atualização.

## 29.4. IPC

O IPC foi explicado como índice de preços ao consumidor, associado ao aumento do custo de vida.

Foi citado que haveria um catálogo com registros por ano e mês, usado para identificar a variação aplicável entre uma renovação e outra.

### Pergunta sobre periodicidade

Uma participante perguntou se seria possível realizar atualização por IPC mensal, semestral ou em outro período, inclusive por suplemento.

A resposta foi que seria possível:

- ter apólices com temporalidade mensal e renovação mensal;
- realizar atualização por suplemento/endosso em uma apólice anual.

A reunião não detalhou as parametrizações, os gatilhos automáticos, as regras de cálculo ou os controles necessários para cada periodicidade.

### Contexto econômico mencionado

Uma participante observou que uma atualização anual por IPC seria considerada muito favorável em seu contexto, mencionando experiências relacionadas à Argentina e à necessidade de lidar com coberturas e moedas em cenários inflacionários. O comentário contextualiza a relevância operacional da revalorização frequente, mas não descreve uma configuração específica implementada.

---

## 30. Modelo lógico consolidado

A representação abaixo é uma consolidação analítica do conteúdo da reunião, não um diagrama literal apresentado na sessão.

```text
Definição corporativa do atributo
        ↓
Nome, descrição, tipo, tamanho e validade
        ↓
Associação ao ramo
        ↓
Definição do nível funcional
(apólice, risco, cobertura ou ocorrência)
        ↓
Formulário apresentado na operação
        ↓
Lógicas opcionais
 ├── valor padrão
 ├── bloqueio de alteração
 ├── validação
 ├── obrigatoriedade condicional
 └── ajuda ao preenchimento
        ↓
Comportamentos especializados
 ├── formação de modalidade
 ├── impacto tarifário e recálculo
 ├── unicidade na carteira
 ├── exibição em sinistros
 ├── persistência no controle técnico
 ├── envio a resseguro
 ├── formulário e busca de inspeção
 └── soma segurada e revalorização
```

---

## 31. Perguntas e respostas relevantes

## 31.1. Atributos oferecem flexibilidade por produto?

### Pergunta

Foi perguntado se os atributos permitem acrescentar os campos necessários conforme cada produto.

### Resposta

Sim. O instrutor confirmou que os atributos oferecem essa flexibilidade, inclusive para necessidades como campanhas comerciais que não existam nativamente no sistema.

### O que esclarece

A plataforma foi apresentada como configurável por produto e ramo, sem depender de um conjunto fixo de campos para todos os seguros.

---

## 31.2. O desconto no nível da apólice afeta todos os riscos?

### Pergunta

Foi discutido o que ocorre se um percentual de desconto for definido no nível da apólice e houver três riscos.

### Resposta

O desconto afeta os três riscos. Caso seja necessário tratar descontos individualmente, o atributo deve estar no nível de risco ou de cobertura, conforme a granularidade desejada.

### O que esclarece

O local de configuração do atributo altera diretamente seu escopo funcional e financeiro.

---

## 31.3. Valor padrão não modificável pode ser atualizado?

### Pergunta

Foi perguntado se um valor padrão bloqueado fica definitivamente imutável.

### Resposta

O valor não pode ser alterado manualmente pela pessoa que emite a apólice, mas pode ser atualizado/refrescado por lógica em operações futuras, como suplementos.

### O que esclarece

“Não modificável” refere-se à edição manual no formulário, não necessariamente à impossibilidade de atualização automática pelo sistema.

---

## 31.4. O recálculo ocorre automaticamente?

### Pergunta

Foi perguntado se, uma vez definido que o atributo afeta cálculo, o sistema realiza o recálculo automaticamente após sua alteração.

### Resposta

Sim. Se o valor for diferente do anterior e o atributo estiver marcado como impactante para a tarifa, o sistema deve recalcular.

### O que esclarece

O atributo funciona como um sinalizador de dependência tarifária para o processo de suplemento/endosso.

---

## 31.5. A unicidade é validada na reabilitação de apólice anulada?

### Pergunta

Foi perguntado se uma apólice anulada, ao ser reabilitada, executa novamente a validação de atributo único.

### Resposta

O instrutor não confirmou o comportamento. Manifestou a suspeita de que a validação talvez não ocorra e sugeriu teste, tratando isso como possível defeito.

### O que esclarece

Esse cenário permanece pendente de validação prática. Não deve ser tratado como comportamento garantido do sistema.

---

## 31.6. Todo dado que afeta tarifa deve ser atributo?

### Pergunta

Uma participante perguntou se todos os elementos de risco que influenciam a tarifa precisam ser armazenados como atributos.

### Resposta

Não. Dados estruturais básicos da apólice, como moeda, data de início/efeito e vencimento, também podem afetar a tarifa sem serem atributos. Atributos são particularmente relevantes para informações adicionais, muitas vezes derivadas de dados de terceiro ou do risco.

### O que esclarece

O modelo de atributos não substitui o modelo principal de dados da apólice.

---

## 31.7. Campo obrigatório aparece com asterisco?

### Pergunta

Foi perguntado se a configuração de obrigatoriedade produz o asterisco vermelho na interface.

### Resposta

Sim, normalmente. Contudo, no caso de atributos dispensados por lógica prévia, o campo pode aparecer como obrigatório em termos de configuração, mas não ser solicitado naquele contexto.

### O que esclarece

A indicação visual de obrigatoriedade deve ser entendida junto da lógica condicional do formulário.

---

## 31.8. Validação pode ser forçada em campo não obrigatório?

### Pergunta

Houve uma dúvida sobre uma configuração que parece obrigar a validação mesmo quando o atributo não é obrigatório.

### Resposta

Sim. A confirmação foi que essa opção força a execução da validação mesmo em condições nas quais ela normalmente não seria disparada.

### O que esclarece

O mecanismo de validação possui comportamento independente da obrigatoriedade convencional.

---

## 31.9. IPC define a base ou a forma de revalorização?

### Pergunta

Foi questionado se o percentual de atualização aplicado ao capital atual viria do IPC ou de outro tipo de referência.

### Resposta

O instrutor diferenciou dois conceitos:

1. capital sobre o qual será aplicada a atualização — atual ou inicial;
2. regra/índice usado para atualizar — IPC, outro índice ou lógica.

### O que esclarece

A base de cálculo e o índice de revalorização são configurações separadas.

---

## 31.10. É possível atualizar por IPC em período diferente de um ano?

### Pergunta

Foi perguntado se atualizações mensais, semestrais ou por suplemento poderiam ser realizadas.

### Resposta

Sim, conforme a explicação. Isso poderia ocorrer por renovação em temporalidade menor ou por suplemento/endosso.

### O que esclarece

A revalorização não foi apresentada como limitada a um ciclo anual, embora os detalhes de configuração não tenham sido demonstrados.

---

## 31.11. Haverá demonstração mais prática no sistema?

### Pergunta

Foi perguntado se a formação deixaria de ser apenas teórica e mostraria detalhes operacionais no sistema.

### Resposta

O instrutor respondeu que essa é sua intenção: avançar das definições para operações como renovação, revalorização de capital e cobertura. Contudo, reconheceu que talvez não fosse possível demonstrar tudo antes do fim da formação.

### O que esclarece

A sessão analisada é predominantemente conceitual; demonstrações operacionais ficaram como intenção futura, não como entrega confirmada.

---

## 32. Números e indicadores citados

Os valores abaixo foram apresentados como exemplos didáticos ou estimativas verbais durante o treinamento. Eles não devem ser tratados como métricas auditadas de operação.

| Indicador ou valor | Contexto |
|---:|---|
| 3 riscos | Exemplo de apólice impactada por desconto definido no nível da apólice |
| 15% | Exemplo de percentual de desconto |
| 99,99 | Exemplo de limite de percentual numérico |
| 8 posições | Exemplo de comprimento de data sem separadores |
| 50 para 60 posições | Exemplo de alteração de configuração/versionamento por validade |
| 10% para 15% | Exemplo de alteração de desconto que exige recálculo |
| 5% | Exemplo ilustrativo de recargo para determinada faixa etária |
| 2020, 2023 e 2024 | Exemplo de vigências distintas para a mesma placa |
| 10.200 | Exemplo de valor de veículo usado como soma segurada |
| 100.000 e 101.000 | Exemplo de capital inicial e capital atualizado |
| 1.000 | Exemplo de incremento de capital |
| 3% e 1,5% | Exemplos de IPC para revalorização |
| “99,9%” | Estimativa verbal de que atributos tarifários normalmente seriam propriedades de terceiros |
| 100.000 atributos | Exemplo hipotético usado ao explicar cardinalidade e busca em inspeções |

---

## 33. Limitações e ressalvas explicitamente reconhecidas

1. **A sessão não demonstrou todas as operações no sistema.**  
   O conteúdo se concentrou em definições e parametrizações.

2. **O comportamento da reabilitação de apólice diante de atributos únicos não foi confirmado.**  
   O instrutor sugeriu que deveria ser testado.

3. **A finalidade do formulário de ocorrência não foi explicada.**

4. **A integração de resseguro foi mencionada apenas em nível conceitual.**  
   Não foram mostrados formatos, protocolos, eventos, APIs ou tratamento de falhas.

5. **A parte de ajuda baseada em tabelas Oracle foi deliberadamente tratada de forma superficial.**

6. **As regras completas de cálculo, cobertura e revalorização foram postergadas para sessões futuras.**

7. **A possibilidade de demonstrar todas as operações durante a formação não foi garantida.**

8. **A sigla/estado de inspeção registrado como “CAO” não foi definido.**

9. **A transcrição apresenta ruídos, interrupções de áudio e possíveis erros de reconhecimento de voz.**  
   Termos como “RIFCore”, “Rift Core”, “RIFCOR”, “RIF” e variações similares parecem se referir ao mesmo sistema, mas a grafia oficial não pode ser comprovada exclusivamente pelo conteúdo fornecido.

---

## 34. Riscos identificados

## 34.1. Riscos explicitamente mencionados

| Risco | Consequência apresentada |
|---|---|
| Atributo tarifário marcado como não tarifário | O sistema pode registrar alteração sem recalcular o prêmio |
| Atributo não tarifário marcado como tarifário | Pode haver recálculo desnecessário e possíveis efeitos inadequados no prêmio |
| Atributo associado ao nível errado | Descontos ou condições podem ser aplicados a riscos/coberturas além do desejado |
| Critério de unicidade mal definido | Pode permitir ou bloquear registros indevidamente |
| Valor padrão em atributo único mal compreendido | Pode ocultar duplicidade temporária, pois o valor padrão não dispara busca |
| Ordem de busca de inspeção inadequada | Pesquisa lenta ou pouco eficiente |
| Uso de atributos pouco seletivos em busca | Maior dificuldade para localizar a inspeção correspondente |
| Dados derivados editáveis fora da origem | Inconsistência entre atributo e cadastro do terceiro |
| Reativação de atributo obrigatório sem valor padrão | Erros em suplementos ou renovações em lote |

## 34.2. Desafios derivados do contexto — leitura analítica

As observações abaixo são interpretações fundamentadas no conteúdo, não afirmações literais dos participantes.

### Governança de atributos tende a ser crítica

Como atributos podem afetar tarifação, sinistros, inspeções, resseguro, modalidade e capitais, sua configuração parece exigir governança multidisciplinar. Uma decisão aparentemente simples de criar ou alterar um campo pode ter reflexos financeiros e operacionais.

### Reutilização corporativa exige disciplina semântica

A possibilidade de criar atributos no nível da companhia e reutilizá-los em diversos ramos traz ganho de padronização. Ao mesmo tempo, exige cuidado para que o mesmo atributo mantenha significado consistente entre produtos.

### Lógicas de negócio aumentam flexibilidade, mas também complexidade

O uso de lógica para preencher, bloquear, limpar, validar ou dispensar campos permite criar formulários adaptativos. Porém, aumenta a necessidade de documentação, testes e rastreabilidade das regras.

### Configurações de inspeção precisam equilibrar precisão e desempenho

A seleção dos atributos e a ordem de busca podem afetar tanto a qualidade do pareamento entre risco e inspeção quanto o tempo de processamento. Esse é um ponto que conecta modelagem de dados e desempenho operacional.

---

## 35. Relações de causa e efeito reconstruídas

## 35.1. Ausência de dados nativos

```text
Produto ou ramo possui necessidades específicas
        ↓
Sistema não possui todas as propriedades de fábrica
        ↓
Necessidade de registrar novos dados
        ↓
Criação de atributos
        ↓
Formulários específicos por apólice, risco ou cobertura
```

## 35.2. Dados existentes que afetam a tarifa

```text
Informação já existe no cadastro ou em outra entidade
        ↓
Informação passa a influenciar o custo do seguro
        ↓
Deve ser declarada como atributo tarifário
        ↓
Alterações passam a acionar recálculo
```

## 35.3. Necessidade de consistência de dados

```text
Data é originada no cadastro do terceiro
        ↓
Atributo é preenchido automaticamente
        ↓
Edição direta pode gerar divergência
        ↓
Atributo é bloqueado para alteração manual
        ↓
Correção deve ocorrer na origem
```

## 35.4. Necessidade de identificar riscos em inspeções

```text
Inspeção ocorre antes ou durante contratação
        ↓
Sistema precisa relacionar inspeção ao risco da apólice
        ↓
Atributos são usados como critérios de busca
        ↓
Critérios mais exclusivos e bem ordenados melhoram a localização
```

## 35.5. Necessidade de adaptar valores segurados no tempo

```text
Atributo numérico representa capital segurado
        ↓
Capital pode se depreciar ou valorizar em renovações
        ↓
Configuração define base e regra de revalorização
        ↓
Apólice pode refletir evolução do valor segurado
```

---

## 36. Transformações e direções observadas — leitura analítica

## 36.1. De produto fixo para produto configurável

A reunião indica uma direção de configuração de produtos de seguro baseada em metadados e regras, em vez de depender exclusivamente de campos estáticos predefinidos para cada ramo.

Essa leitura decorre da possibilidade de:

- criar atributos por necessidade;
- associá-los a ramos e coberturas;
- reutilizá-los entre produtos;
- definir validade;
- controlar comportamento por lógica;
- usá-los em tarifação e processos posteriores.

## 36.2. De dado de tela para dado operacional

O atributo não foi apresentado apenas como um campo de captura. Ele participa de:

- precificação;
- descontos;
- orçamento;
- sinistro;
- inspeção;
- resseguro;
- controle técnico;
- capital segurado;
- revalorização.

Isso sugere que a modelagem do atributo possui impacto transversal no ciclo de vida da apólice.

## 36.3. De preenchimento manual para comportamento guiado por regras

A apresentação indica uma direção de automação baseada em:

- valores padrão;
- valores derivados;
- bloqueio de edição;
- validação;
- obrigatoriedade condicional;
- atualização posterior por suplemento.

A finalidade aparente é reduzir preenchimentos manuais, evitar inconsistências e adaptar o formulário ao contexto da contratação.

---

## 37. O que a reunião não permite concluir

A transcrição não fornece detalhamento suficiente para concluir com segurança sobre os seguintes temas:

- arquitetura técnica do RIFCore;
- linguagem de programação, framework ou banco de dados principal;
- versão do Oracle ou do sistema;
- infraestrutura de cloud, on-premises ou híbrida;
- uso de containers, Kubernetes ou orquestradores;
- modelo de APIs, eventos, mensageria ou integração por arquivos;
- modelo de autenticação, autorização ou IAM;
- segregação de dados entre companhias, países ou produtos;
- proteção de dados pessoais e requisitos regulatórios;
- criptografia de dados em trânsito ou em repouso;
- auditoria detalhada de alterações de atributos;
- fluxo de aprovação e governança de mudanças de configuração;
- SLA, disponibilidade, recuperação de desastre ou continuidade;
- estratégia de testes de regras e lógicas de negócio;
- CI/CD, versionamento técnico e promoção entre ambientes;
- desempenho mensurado das buscas de inspeção;
- comportamento definitivo da validação de unicidade em reabilitação;
- definição da sigla ou estado “CAO” no processo de inspeção;
- regras completas de formação de modalidade explícita e implícita;
- forma exata de integração com RE21;
- catálogo, fonte e manutenção dos índices de IPC;
- regras de cálculo detalhadas de revalorização;
- processos completos de orçamento, emissão, suplemento e renovação;
- objetivo e funcionamento do formulário de ocorrência.

---

## 38. Conclusões principais

1. **Atributos são o principal mecanismo de extensibilidade funcional apresentado para produtos de seguro no RIFCore.**

2. **Eles devem ser criados tanto para informações inexistentes no modelo nativo quanto para propriedades existentes que precisam participar formalmente da tarifação.**

3. **A escolha do nível — apólice, risco, cobertura ou ocorrência — é uma decisão funcional importante, pois determina o alcance do valor informado.**

4. **A configuração “afeta cálculo” é especialmente crítica, pois controla quando alterações devem provocar recálculo de prêmio.**

5. **Lógicas de negócio permitem transformar atributos em campos inteligentes: preenchidos automaticamente, bloqueados, validados, limpos ou dispensados conforme o contexto.**

6. **Atributos podem ter papel transversal em orçamento, sinistro, inspeção, controle técnico, resseguro, formação de modalidade e soma segurada.**

7. **A unicidade de atributos permite controlar duplicidades em apólices vigentes, mas possui nuances importantes quando há valor padrão e em cenários de reabilitação.**

8. **No módulo de inspeções, a qualidade e a ordem dos atributos escolhidos para busca afetam diretamente a eficiência e a precisão da localização do risco.**

9. **Atributos numéricos podem alimentar capitais de cobertura e participar de regras de revalorização ou depreciação ao longo das renovações.**

10. **A sessão estabeleceu uma base conceitual robusta, mas não substitui documentação técnica nem testes práticos para regras específicas, especialmente em integrações, inspeções, reabilitações e revalorização.**
