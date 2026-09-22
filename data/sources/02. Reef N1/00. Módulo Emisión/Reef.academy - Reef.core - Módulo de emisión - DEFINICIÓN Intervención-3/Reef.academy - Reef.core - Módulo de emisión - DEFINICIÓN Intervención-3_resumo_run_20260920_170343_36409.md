# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.academy - Reef.core - Módulo de emisión - DEFINICIÓN Intervención-3.mp4`
**Data de processamento:** 20/09/2026 17:06:59
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada — Configuração de intervenções em ramos de seguros

> **Escopo e rastreabilidade:** esta análise foi produzida exclusivamente a partir da transcrição fornecida. Não foram disponibilizados timestamps, identificação dos participantes, nome da plataforma ou documentação complementar. Termos como “ramo”, “intervenção”, “terceiro”, “endoso/suplemento” e “emissão” foram preservados conforme o contexto apresentado.

## 1. Síntese executiva

A reunião consiste em um treinamento funcional sobre a configuração de **intervenções** dentro de um **ramo de seguro**. Uma intervenção representa um papel desempenhado por terceiros em uma apólice ou em um risco, como segurado, tomador, proprietário, condutor, beneficiário, pagador ou entidade financeira.

A ideia central apresentada é que as intervenções disponíveis não são criadas livremente durante a definição de um ramo. Elas já devem existir previamente no sistema; caso seja necessária uma nova, sua inclusão deve ser solicitada. A configuração do ramo determina quais dessas intervenções serão utilizadas, em qual contexto, em que ordem serão solicitadas e quais regras funcionais serão aplicadas.

O treinamento detalha como tornar uma intervenção obrigatória ou opcional, limitar a quantidade de terceiros associados, indicar terceiros principais, selecionar manual ou automaticamente a pessoa usada no cálculo tarifário, registrar percentuais, cessão de direitos, marcação VIP, referências entre intervenções, validações por lógica de negócio e carregamento automático em massa.

Também foi explicado que a solicitação de uma intervenção durante a emissão pode ser condicionada por regras. O exemplo principal foi o de financiamento: uma entidade financeira só deve ser solicitada quando o risco estiver financiado. Caso deixe de estar financiado em um endoso ou renovação, há uma configuração que pode remover automaticamente a entidade financeira previamente registrada.

A principal mensagem é que o sistema permite configurar, por ramo, tanto a **estrutura de participantes** de uma apólice quanto o seu **comportamento operacional**, combinando propriedades parametrizáveis e rotinas de negócio em PL/SQL.

---

## 2. Contexto e antecedentes

O conteúdo parte da premissa de que o sistema possui um conjunto prévio de intervenções cadastradas. Essas intervenções representam figuras ou papéis que podem participar de uma apólice ou de um risco.

Exemplos mencionados durante o treinamento incluem:

- segurado;
- tomador;
- pagador;
- proprietário;
- condutor;
- endossatário;
- beneficiário;
- entidade financeira;
- terceiros associados a cessão de direitos.

A atividade demonstrada não é a criação dessas figuras, mas sua associação a um ramo que está sendo definido. O palestrante reforça que uma nova intervenção não pode ser criada diretamente nessa etapa; ela depende de solicitação de inclusão prévia.

A configuração parece estar orientada por ramo de seguro. Foram usados exemplos ligados principalmente a:

- seguros de automóvel;
- riscos financiados;
- beneficiários em caso de morte;
- emissão e alteração posterior de apólices.

A transcrição também indica que a definição de um ramo pode envolver vários perfis de negócio e técnicos, incluindo pessoas das áreas financeira, de resseguro, atuarial e técnica. Não foram detalhadas as responsabilidades formais, permissões ou fluxo de aprovação de cada perfil.

---

## 3. Conceitos fundamentais

### 3.1 Ramo

O “ramo” é o objeto funcional que está sendo configurado. Para cada ramo, define-se quais intervenções serão utilizadas e como elas devem se comportar ao longo da emissão e manutenção da apólice.

A transcrição sugere que o ramo pode possuir intervenções de dois níveis:

- **intervenções de apólice**;
- **intervenções de risco**.

Não foi explicado em detalhes o critério completo de separação entre os níveis, mas o treinamento deixa claro que essa distinção precisa ser realizada durante a parametrização.

### 3.2 Intervenção

Uma intervenção é uma categoria funcional pela qual um ou mais terceiros podem participar de uma apólice ou de um risco.

Por exemplo:

- em um seguro de automóvel, pode haver intervenção de proprietário, condutor e tomador;
- em uma cobertura por morte, pode haver beneficiários;
- em um risco financiado, pode haver uma entidade financeira;
- em determinados cenários, pode haver pagador ou endossatário.

A intervenção não é, por si só, a pessoa cadastrada. Ela é o papel que uma ou mais pessoas, entidades ou terceiros desempenham dentro daquele contrato de seguro.

### 3.3 Terceiro

O terceiro é a pessoa ou entidade registrada dentro de uma intervenção. A identificação ocorre, conforme o exemplo apresentado, por:

- tipo de documento;
- número de documento.

O sistema recupera ou apresenta dados do terceiro, como nome e sobrenome, desde que ele já esteja cadastrado.

### 3.4 Emissão

A emissão é o momento em que a apólice está sendo registrada no sistema. Nesse processo, o usuário informa os dados do risco, as intervenções, os atributos e as coberturas, conforme a ordem configurada.

---

## 4. Problemas e necessidades tratados

Embora a reunião tenha caráter predominantemente instrucional, é possível identificar as necessidades funcionais que justificam as configurações apresentadas.

### 4.1 Necessidade de padronizar intervenções

As intervenções já são estabelecidas previamente e não podem ser criadas livremente na definição do ramo.

**Consequência buscada:** evitar que cada ramo, produto ou usuário crie papéis semelhantes com nomes ou comportamentos divergentes.

**Direcionamento apresentado:** utilizar intervenções previamente definidas e solicitar formalmente a inclusão de uma nova quando necessário.

### 4.2 Necessidade de adequar participantes ao tipo de seguro

Nem todos os ramos exigem os mesmos participantes. Em um seguro de automóvel, por exemplo, proprietário e condutor podem ser relevantes. Em uma situação de financiamento, a entidade financeira pode ser necessária. Para beneficiários, podem ser necessários percentuais de participação.

**Consequência buscada:** permitir que cada ramo tenha apenas as intervenções relevantes ao seu processo.

### 4.3 Necessidade de diferenciar obrigatoriedade de solicitação

A reunião faz uma distinção importante entre dois conceitos:

1. se uma intervenção possui terceiros obrigatórios ou opcionais;
2. se a própria intervenção será solicitada durante a emissão.

Esses conceitos não são equivalentes.

Uma intervenção pode existir na configuração do ramo, mas ser solicitada somente em determinadas condições. O exemplo foi a entidade financeira: ela pode ser configurada no ramo, mas só precisa ser informada se o risco estiver financiado.

### 4.4 Necessidade de identificar a pessoa relevante para cálculo

Em determinados ramos, especialmente no exemplo de automóvel, pode ser necessário determinar qual condutor será considerado para o cálculo tarifário.

Essa seleção pode ocorrer:

- por regra automática;
- por indicação manual;
- ou simplesmente não ocorrer, quando a intervenção é apenas informativa.

### 4.5 Necessidade de controlar alterações posteriores

A reunião aborda situações em que informações de intervenções podem ser alteradas por endoso/suplemento ou renovação, como:

- troca de beneficiários;
- alteração de percentuais;
- inclusão ou remoção de terceiros;
- alteração da pessoa usada no cálculo;
- retirada de uma entidade financeira quando o risco deixa de ser financiado.

---

## 5. Solução apresentada

A solução apresentada é um modelo de parametrização por ramo, no qual cada intervenção associada recebe propriedades que determinam:

- se é de apólice ou de risco;
- sua ordem de solicitação;
- se está habilitada;
- se é obrigatória ou opcional;
- a quantidade mínima e máxima de terceiros;
- a existência de terceiro principal;
- a possibilidade de múltiplos principais;
- a necessidade de indicação manual para cálculo;
- a lógica automática de seleção para cálculo;
- a exigência de percentual;
- a validação de soma de percentuais;
- a cessão de direitos;
- a marcação VIP;
- a referência a outra intervenção;
- a necessidade de ser diferente do tomador;
- a lógica condicional para solicitar a intervenção;
- a remoção de terceiros quando a intervenção deixa de ser solicitada;
- a validação dos terceiros registrados;
- o ponto do fluxo de emissão em que a intervenção é solicitada;
- a carga automática ou massiva de terceiros.

O modelo combina dois mecanismos principais:

| Mecanismo | Papel no funcionamento |
|---|---|
| Propriedades parametrizáveis | Configuram comportamentos diretos, em geral opções de “sim/não”, ordem, quantidades e regras funcionais. |
| Lógica de negócio | Implementa comportamentos mais complexos, tais como determinar o terceiro de cálculo, validar terceiros, definir valores padrão e decidir se uma intervenção deve ser solicitada. |

A transcrição afirma que essas lógicas de negócio são implementadas como rotinas em **PL/SQL**.

---

## 6. Arquitetura funcional reconstruída

O diagrama abaixo é uma **consolidação analítica** baseada na sequência explicada no treinamento. Não foi apresentado literalmente como diagrama na reunião.

```text
Definição do ramo
        ↓
Associação de intervenções previamente cadastradas
        ↓
Configuração por intervenção
  ├─ Nível: apólice ou risco
  ├─ Ordem de solicitação
  ├─ Obrigatoriedade e quantidade de terceiros
  ├─ Regras de principal e cálculo
  ├─ Percentuais, cessão de direitos e VIP
  ├─ Referência entre intervenções
  ├─ Regras de solicitação condicional
  ├─ Validações
  └─ Ponto do fluxo de emissão
        ↓
Processo de emissão
  ├─ Informações do risco
  ├─ Intervenções
  ├─ Atributos
  └─ Coberturas
        ↓
Regras PL/SQL executadas conforme a configuração
        ↓
Registro, validação, cálculo e manutenção dos terceiros
```

### 6.1 Sequência de emissão mencionada

A ordem exibida no sistema foi descrita como:

```text
Informações do risco
↓
Intervenções
↓
Atributos
↓
Coberturas
```

Entretanto, a configuração permite alterar o ponto em que determinadas intervenções são solicitadas:

- antes dos atributos;
- depois dos atributos;
- para intervenções de apólice, antes dos atributos de apólice ou ao pressionar o botão de término;
- para intervenções de risco, antes ou depois dos atributos de risco.

A transcrição não detalha todos os estados, telas, regras de navegação ou comportamentos de interface associados a essas opções.

---

## 7. Configuração das intervenções

### 7.1 Associação da intervenção ao ramo

O primeiro passo é declarar para qual ramo a configuração será feita e selecionar, entre as intervenções existentes, quais serão utilizadas.

A intervenção pode ser associada ao nível:

- **apólice**;
- **risco**.

Em seguida, é definido o papel que será utilizado. O treinamento menciona exemplos como pagador, tomador, proprietário, condutor e endossatário.

### 7.2 Ordem de solicitação

A configuração define a ordem em que as intervenções serão requeridas no processo.

O palestrante exemplifica que se poderia solicitar primeiro os segurados, depois o pagador, em seguida o condutor e por último o proprietário. Em outro exemplo, a ordem apresentada foi proprietário, condutor e endossatário.

A ordem não altera, segundo a explicação apresentada, a natureza da intervenção; ela determina a sequência em que o sistema a solicita.

### 7.3 Habilitação da intervenção

A configuração permite habilitar ou desabilitar uma intervenção a partir de determinada data.

O exemplo mencionado foi:

- a partir de 15 de agosto, proprietários deixam de ser solicitados para novas apólices;
- a carteira existente pode continuar contendo proprietários;
- ainda seria possível manter, alterar, remover ou incluir proprietários em contratos existentes.

**Interpretação analítica:** essa capacidade sugere suporte à evolução de regras de produto sem exigir a eliminação imediata de dados históricos. A transcrição não detalha o mecanismo técnico de vigência, versionamento ou migração.

---

## 8. Obrigatoriedade e quantidade de terceiros

### 8.1 Intervenção obrigatória

A obrigatoriedade é determinada pelo preenchimento de uma propriedade de quantidade de terceiros.

Quando é informado um valor, a intervenção passa a exigir pelo menos um terceiro.

Exemplo apresentado:

- se o valor informado for `2`, o sistema exige no mínimo um terceiro e permite no máximo dois.

Portanto, conforme o treinamento:

```text
Valor informado = intervenção obrigatória
Mínimo = 1
Máximo = valor informado
```

### 8.2 Intervenção opcional

Quando esse campo é deixado em branco, a intervenção se torna opcional.

Isso significa que:

- algumas apólices podem registrar terceiros nessa intervenção;
- outras podem não registrar nenhum terceiro.

O exemplo utilizado foi a entidade financeira de um risco financiado. Caso o risco não seja financiado, não seria necessário registrar uma entidade financeira.

### 8.3 Múltiplos terceiros

Uma mesma intervenção pode conter vários terceiros.

O exemplo foi o de condutores de um veículo:

- um veículo pode ter três condutores;
- todos podem ser registrados na intervenção “condutor”;
- a configuração pode exigir que um deles seja identificado como principal.

---

## 9. Terceiro principal

### 9.1 Exigência de principal

Quando uma intervenção pode conter vários terceiros, pode haver a necessidade de indicar qual deles é o principal.

No exemplo da intervenção “condutor”:

- vários condutores podem ser informados;
- um deles pode ser marcado como o condutor principal;
- o treinamento afirma que, nesse cenário, deve haver “um e somente um” principal.

### 9.2 Múltiplos principais

Existe também uma propriedade que permite indicar se pode haver mais de um principal.

Quando essa opção está habilitada, a emissão pode registrar mais de um terceiro como principal.

A transcrição não detalha em quais produtos ou cenários de negócio essa possibilidade é aplicada, nem como o sistema trata conflitos entre múltiplos principais em processos posteriores.

### 9.3 Situações sem principal

O palestrante esclarece que a definição de principal não é obrigatória para todas as intervenções.

No caso de beneficiários em uma cobertura por morte, por exemplo, foi dito que pode não haver:

- principal;
- pessoa de cálculo;
- qualquer outra regra de seleção.

Nesse caso, a intervenção teria finalidade predominantemente informativa e de definição de distribuição da indenização.

---

## 10. Seleção do terceiro para cálculo

### 10.1 Contexto

Em determinados ramos, pode ser necessário selecionar uma pessoa entre os terceiros declarados para realizar cálculos, especialmente de tarifação.

O exemplo principal foi o seguro de automóvel, em que a tarifa pode depender do condutor.

### 10.2 Seleção automática por regra de negócio

A forma considerada normal pelo palestrante é a existência de uma regra que determine automaticamente o terceiro utilizado no cálculo.

Foi mencionado como exemplo, atribuído ao México:

> entre os condutores declarados, o cálculo seria realizado com base no homem mais jovem.

Segundo a explicação, uma rotina poderia:

1. acessar os dados dos terceiros;
2. obter sexo e data de nascimento;
3. comparar os participantes;
4. selecionar o homem mais jovem;
5. utilizá-lo como base para o cálculo.

O palestrante também observa que essa regra “não pode” ser aplicada na Europa, mas não detalha o motivo, a abrangência regulatória ou os países envolvidos.

### 10.3 Seleção manual para cálculo

Se não houver uma regra automática clara, ou se o negócio determinar que um dos terceiros deve ser escolhido manualmente, a configuração pode exigir que o usuário indique quem será a pessoa usada no cálculo.

Nesse caso, durante o registro dos terceiros, um deles deve receber a propriedade de cálculo com valor positivo.

A resposta dada a uma dúvida foi que isso **não é obrigatório em todos os casos**. A indicação manual só se aplica quando a configuração do ramo decide que a tarifação precisa ser feita por um dos terceiros informados e não existe uma regra automática para selecioná-lo.

### 10.4 Intervenções sem cálculo

O treinamento ressalta que uma intervenção pode ser meramente informativa. O exemplo dos beneficiários ilustra que nem toda intervenção precisa definir:

- principal;
- pessoa de cálculo;
- lógica de tarifação.

---

## 11. Percentuais de participação

### 11.1 Registro de percentual

Uma intervenção pode exigir o registro de percentual para cada terceiro associado.

O caso mais evidente foi o de beneficiários:

- pode haver mais de um beneficiário;
- cada beneficiário pode receber um percentual;
- esse percentual serviria para definir a distribuição de uma indenização.

### 11.2 Validação de soma igual a 100

Há duas propriedades distintas:

1. indicar se o percentual será informado;
2. indicar se a soma dos percentuais deve ser igual a 100.

O palestrante enfatiza que exigir percentual não implica necessariamente exigir que a soma seja 100. Embora não tenha conseguido lembrar outro exemplo concreto, foi dito que existem situações em que percentuais são registrados sem a obrigação de totalização em 100.

Para beneficiários, o comportamento esperado apresentado foi:

```text
Beneficiário A + Beneficiário B + ... = 100%
```

### 11.3 Implicação para sinistros

No exemplo de beneficiários, o percentual seria utilizado para determinar a distribuição da indenização em caso de sinistro.

A transcrição não especifica:

- regras de arredondamento;
- tratamento de percentuais inválidos;
- alteração de percentuais após sinistro aberto;
- regras legais aplicáveis a beneficiários;
- forma de cálculo da indenização.

---

## 12. Alterações por endoso, suplemento e renovação

Foi discutida a possibilidade de modificar dados de intervenções posteriormente.

### 12.1 Alterações em beneficiários e percentuais

Foi levantada uma pergunta sobre alterar beneficiários e percentuais por um endoso.

A resposta indicou que:

- alterações somente de nomes, beneficiários ou percentuais podem, em princípio, ocorrer em um endoso “nominativo”, conforme a terminologia usada na reunião;
- esse entendimento depende de a alteração não afetar a tarifação;
- o palestrante reforça que se deve avaliar o tipo de endoso ao final, pois uma alteração de dados pode coexistir com mudanças econômicas, como inclusão de cobertura.

A terminologia “nominativo” e “indeterminado” foi tratada de modo parcialmente confuso na transcrição. Não é possível reconstruir com segurança a taxonomia completa de endosos adotada pelo sistema.

### 12.2 Alterações que afetam a tarifa

Foi dado o exemplo de troca da pessoa usada para cálculo:

- inicialmente, a tarifação é feita por um terceiro identificado como “222”;
- em um endoso, a base de cálculo passa a ser o terceiro “333”;
- essa mudança pode gerar alteração de prêmio.

Isso evidencia que, embora intervenções possam parecer dados cadastrais, algumas delas possuem impacto econômico.

---

## 13. Cessão de direitos

### 13.1 Finalidade

A cessão de direitos é associada ao cenário em que o risco está financiado.

Quando essa configuração é habilitada para uma intervenção, o sistema pede, na emissão:

- número de contrato;
- data de vencimento da cessão;
- valor cedido.

### 13.2 Exemplo de indenização

O exemplo apresentado foi:

- existe um veículo financiado;
- ainda restam 200 euros de financiamento;
- ocorre um sinistro com liquidação de 500 euros;
- 200 euros poderiam ser destinados à entidade financeira;
- 300 euros poderiam ser destinados ao cliente.

A finalidade da informação seria apoiar a decisão do módulo de sinistros sobre a distribuição da indenização entre financeira e cliente.

### 13.3 Limites de conclusão

A reunião permite concluir que a cessão de direitos influencia a informação disponível para sinistros. Contudo, não detalha:

- se a distribuição é automática;
- se depende de regra adicional;
- quais integrações existem entre emissão e sinistros;
- como são tratadas múltiplas entidades financeiras;
- se há validação de saldo devedor;
- se a cessão possui efeitos jurídicos automáticos no sistema.

---

## 14. Marcação VIP

### 14.1 Funcionamento

A configuração permite que um ou mais terceiros de uma intervenção sejam identificados como VIP.

O palestrante é explícito: essa marcação não produz consequência funcional automática no sistema.

Ela serve apenas como registro de que determinada pessoa é VIP dentro daquela intervenção.

### 14.2 Caso real apresentado

Foi citado um caso em que seguros são comercializados por bancos:

- o banco é responsável por obter o negócio, embora não seja quem emite a apólice;
- o banco informa as apólices que devem ser emitidas;
- o banco deseja saber se há um terceiro classificado como VIP em sua própria base;
- a seguradora registra essa informação;
- ao enviar dados da apólice ao banco, ele consegue identificar a presença de um terceiro VIP;
- o banco utiliza essa informação conforme sua própria necessidade.

O palestrante reforça que a seguradora, no caso apresentado, não toma nenhuma ação adicional sobre a classificação VIP.

---

## 15. Referências entre intervenções

### 15.1 Objetivo

Uma mesma pessoa pode participar de diversas intervenções. Em seguros de automóvel, por exemplo, o tomador pode também ser proprietário e condutor.

Para evitar a repetição desnecessária de dados, uma intervenção pode apontar outra como referência.

### 15.2 Valor padrão

Quando uma intervenção possui referência, o sistema utiliza o terceiro registrado na intervenção de referência como valor padrão.

Exemplo apresentado:

```text
Tomador registrado
↓
Ao solicitar o segurado, o sistema traz o tomador como padrão
↓
Se segurado = tomador, não é necessário informar nada adicional
↓
Se segurado ≠ tomador, o usuário altera documento e número do documento
```

Isso reduz o esforço operacional quando as figuras coincidem.

### 15.3 Definição por lógica de negócio

Quando o valor padrão não pode ser simplesmente copiado de outra intervenção, é possível associar uma lógica de negócio.

O exemplo hipotético mencionado foi selecionar, em uma intervenção de referência, “o homem mais velho” para ser utilizado como valor padrão da intervenção que está sendo configurada.

Esse exemplo foi apresentado pelo próprio palestrante como peculiar e ilustrativo.

### 15.4 Restrição de igualdade com o tomador

Existe uma propriedade para determinar se o terceiro de determinada intervenção deve ser obrigatoriamente diferente do tomador.

Quando essa regra estiver habilitada:

- se o documento informado na intervenção for igual ao documento do tomador;
- o sistema deve retornar erro.

O palestrante não recorda um caso real com segurança, mas sugere como possibilidade uma entidade financeira que não poderia ser o tomador da apólice.

Essa justificativa foi apresentada como hipótese, não como regra de negócio confirmada.

---

## 16. Solicitação condicional de intervenções

### 16.1 Conceito

A reunião diferencia novamente:

- obrigatoriedade de terceiros dentro de uma intervenção;
- necessidade de solicitar a intervenção no fluxo de emissão.

Uma intervenção pode não ser solicitada em certas condições, mesmo estando associada ao ramo.

### 16.2 Exemplo: risco financiado

O exemplo detalhado foi o da intervenção de entidade financeira.

Fluxo funcional apresentado:

```text
Pergunta: o risco está financiado?
        ↓
Resposta: sim
        ↓
A lógica de negócio determina que a intervenção financeira deve ser solicitada
        ↓
Usuário informa banco ou entidade financeira
```

Caso a resposta seja “não”:

```text
Pergunta: o risco está financiado?
        ↓
Resposta: não
        ↓
A lógica de negócio determina que a intervenção financeira não deve ser solicitada
```

A lógica de negócio avalia respostas dadas em outros atributos da emissão para decidir se a intervenção será requerida.

### 16.3 Remoção de intervenções já registradas

Foi apresentado um cenário de alteração posterior:

1. a apólice foi emitida quando o risco estava financiado;
2. a intervenção financeira foi preenchida, por exemplo, com Banco Santander;
3. em um suplemento ou renovação, o cliente informa que o risco não está mais financiado;
4. o sistema deixa de solicitar a intervenção financeira;
5. sem configuração adicional, o registro anterior poderia permanecer;
6. existe uma propriedade que, quando respondida positivamente, remove o banco ou terceiro já registrado da intervenção financeira.

O palestrante explica que, nesse cenário, o Banco Santander seria excluído da intervenção financeira.

---

## 17. Validação de terceiros

Além das regras parametrizadas, é possível validar se um terceiro pode participar de determinada intervenção.

### 17.1 Mecanismo

A validação é implementada por uma rotina em PL/SQL.

Durante a emissão:

1. o usuário informa um terceiro;
2. a lógica de validação é executada;
3. a rotina pode não retornar erro, aceitando o terceiro;
4. ou pode retornar um erro;
5. o erro é exibido na tela;
6. o usuário deve substituir ou corrigir o terceiro informado.

### 17.2 Limites de informação

A transcrição não detalha:

- critérios de validação concretos;
- formato de retorno da rotina;
- catálogo de erros;
- regras de auditoria;
- execução síncrona ou assíncrona;
- permissões para cadastrar ou alterar rotinas PL/SQL.

---

## 18. Posição da intervenção no fluxo de emissão

A configuração permite definir em que momento uma intervenção será solicitada.

### Para intervenções de apólice

As opções citadas foram:

- antes dos atributos da apólice;
- ao pressionar o botão de término.

### Para intervenções de risco

As opções citadas foram:

- antes dos atributos do risco;
- depois dos atributos do risco.

O exemplo conceitual apresentado foi:

- intervenção de segurado solicitada antes dos atributos;
- intervenção financeira solicitada depois dos atributos.

Essa organização permite que informações inseridas em atributos sejam usadas para decidir se outra intervenção precisa ser solicitada.

---

## 19. Carga automática e massiva

É possível associar uma lógica de negócio para carregar intervenções automaticamente.

O exemplo, declarado como hipotético pelo palestrante, foi:

- uma empresa possui uma lista de trabalhadores;
- esses trabalhadores precisam ser tratados como intervenção;
- o cliente fornece um arquivo Excel;
- o sistema realiza carga massiva das pessoas.

A reunião não informa:

- formato exato do arquivo;
- modelo de dados;
- regras de validação;
- tamanho máximo;
- tratamento de erros;
- processo de aprovação;
- se a carga é executada diretamente na interface ou por processo externo.

---

## 20. Componentes e capacidades mencionados

| Componente ou conceito | Finalidade descrita | Observações |
|---|---|---|
| Ramo | Contexto de configuração das intervenções. | Pode possuir intervenções de apólice e de risco. |
| Intervenção | Papel funcional associado a terceiros. | Deve estar previamente estabelecida. |
| Terceiro | Pessoa ou entidade vinculada a uma intervenção. | Identificado por tipo e número de documento. |
| Emissão de apólice | Processo de registro da apólice. | Inclui informações de risco, intervenções, atributos e coberturas. |
| Atributos | Informações do processo de emissão. | Podem ser usados por lógicas para decidir se uma intervenção será solicitada. |
| Coberturas | Etapa posterior aos atributos na sequência mostrada. | Não foram detalhadas no treinamento. |
| Rotina PL/SQL | Implementação de lógica de negócio. | Pode selecionar, validar ou determinar comportamento das intervenções. |
| Módulo de sinistros | Consumidor potencial das informações de cessão de direitos. | A integração não foi detalhada. |
| Endoso/suplemento | Mecanismo de alteração posterior da apólice. | Pode ou não afetar prêmio, dependendo do dado alterado. |

---

## 21. Modelo operacional observado

O treinamento sugere um modelo operacional em que a definição de um ramo é feita por pessoas de negócio com participação de diversos especialistas.

Foram mencionados perfis como:

- financeiros;
- especialistas em resseguro;
- atuários;
- técnicos;
- outros papéis não especificados.

A configuração de intervenções, porém, parece exigir articulação entre negócio e tecnologia, pois algumas decisões dependem de rotinas PL/SQL.

### Responsabilidades inferidas do fluxo

| Decisão ou atividade | Papel provável segundo o contexto | Grau de certeza |
|---|---|---|
| Definir quais intervenções o ramo utiliza | Pessoas que definem o ramo, possivelmente de negócio. | Explicitamente mencionado. |
| Determinar obrigatoriedade, ordem e comportamento | Pessoas responsáveis pela definição do ramo. | Explicitamente mencionado. |
| Definir critérios de cálculo | Negócio. | Explicitamente mencionado. |
| Implementar rotina PL/SQL | Área técnica ou equipe com capacidade de desenvolvimento. | Inferência contextual; não foi atribuído formalmente. |
| Operar a emissão | Pessoa que emite a apólice. | Explicitamente mencionado. |

---

## 22. Perguntas e respostas relevantes

### 22.1 É sempre necessário haver um terceiro para cálculo?

**Pergunta:** uma participante pergunta se sempre deve existir um terceiro para cálculo.

**Resposta:** não. A necessidade depende da configuração do ramo e da intervenção. Só é necessária quando alguém definiu que a tarifação deve usar um dos terceiros registrados e não existe regra automática clara para selecioná-lo.

**O que isso esclarece:** a indicação de terceiro para cálculo não é uma propriedade universal das intervenções; é uma necessidade específica de determinados produtos e regras tarifárias.

---

### 22.2 Como a lógica automática determina a pessoa usada para cálculo?

**Pergunta:** como a rotina decide qual terceiro será usado no cálculo?

**Resposta:** depende da regra de negócio. No exemplo mexicano, a rotina consulta sexo e data de nascimento dos condutores e seleciona o homem mais jovem.

**O que isso esclarece:** a configuração pode delegar decisões complexas a lógica programada em PL/SQL, em vez de depender apenas de parâmetros fixos.

---

### 22.3 O percentual informado precisa sempre totalizar 100?

**Pergunta:** se a intervenção exige percentual, esse valor precisa necessariamente somar 100?

**Resposta:** não. São propriedades independentes: uma indica que o percentual será informado; outra determina se a soma deve ser 100.

**O que isso esclarece:** o sistema modela cenários em que percentuais possuem finalidade diferente de divisão integral de indenização.

---

### 22.4 Beneficiários e percentuais podem ser alterados posteriormente?

**Pergunta:** dados como beneficiários e percentuais podem ser modificados por endoso?

**Resposta:** sim, em princípio. Se a mudança for apenas desses dados e não afetar tarifação, seria tratada como endoso nominativo, conforme a explicação. Porém, deve-se avaliar o conjunto da alteração, porque uma alteração simultânea de cobertura, por exemplo, pode mudar o enquadramento.

**O que isso esclarece:** a classificação da alteração não depende apenas do campo modificado isoladamente, mas do impacto global sobre a apólice e o prêmio.

---

### 22.5 Para que serve o indicador VIP?

**Pergunta:** qual a utilidade prática da classificação VIP?

**Resposta:** foi relatado um caso de bancos que comercializam seguros e desejam saber se uma apólice envolve um terceiro VIP de sua carteira. A seguradora apenas registra e transmite a informação; não realiza ação adicional.

**O que isso esclarece:** VIP é uma marca informativa e pode existir para suportar necessidades de parceiros, sem necessariamente alterar cálculo, cobertura ou operação interna da seguradora.

---

## 23. Casos concretos apresentados

### 23.1 Seguro de automóvel

**Contexto:** ramo em que podem existir proprietário, condutor e tomador, possivelmente com sobreposição entre esses papéis.

**Capacidades ilustradas:**

- múltiplos condutores;
- condutor principal;
- múltiplos principais, se permitido;
- seleção manual do condutor de cálculo;
- seleção automática por regra;
- referência entre tomador e segurado ou outras intervenções;
- restrição para impedir igualdade com tomador, quando aplicável.

### 23.2 Risco financiado

**Contexto:** veículo ou outro risco vinculado a financiamento.

**Capacidades ilustradas:**

- intervenção financeira opcional ou condicional;
- cessão de direitos;
- registro de contrato, vencimento e valor cedido;
- uso potencial dessas informações no módulo de sinistros;
- exclusão da entidade financeira quando o risco deixa de estar financiado.

### 23.3 Beneficiários em caso de morte

**Contexto:** intervenção com múltiplos beneficiários.

**Capacidades ilustradas:**

- registro de beneficiários;
- percentual por beneficiário;
- validação de soma igual a 100;
- distribuição de indenização em caso de sinistro;
- ausência de necessidade de principal ou pessoa de cálculo.

### 23.4 Comercialização por bancos

**Contexto:** banco obtém o negócio e envia informações para emissão da apólice.

**Capacidade ilustrada:**

- registro de terceiros como VIP;
- devolução dessa informação ao banco;
- uso posterior da informação pelo próprio banco.

### 23.5 Carga de trabalhadores de uma empresa

**Contexto:** exemplo hipotético de intervenção associada à lista de trabalhadores de uma empresa.

**Capacidade ilustrada:**

- recebimento de arquivo Excel;
- carga massiva de terceiros;
- execução por lógica de negócio.

---

## 24. Números, regras e valores citados

| Item | Valor ou regra mencionada | Contexto |
|---|---:|---|
| Data de desabilitação ilustrativa | 15 de agosto | Exemplo de data a partir da qual proprietários não seriam solicitados em novas apólices. |
| Mínimo de terceiros quando há quantidade definida | 1 | Se existe valor na quantidade, a intervenção passa a exigir ao menos um terceiro. |
| Máximo de terceiros no exemplo | 2 | Se a quantidade configurada é 2, permite-se de 1 a 2 terceiros. |
| Quantidade de condutores no exemplo | 3 | Exemplo de veículo com três condutores. |
| Regra de principal | 1 e somente 1 | Cenário em que a intervenção exige um terceiro principal. |
| Exemplo de saldo financiado | 200 euros | Valor ainda devido à financeira. |
| Exemplo de liquidação de sinistro | 500 euros | Valor de indenização usado para ilustrar distribuição entre financeira e cliente. |
| Distribuição exemplificada | 200 / 300 euros | 200 à financeira e 300 ao cliente. |
| Percentual esperado em beneficiários | 100% | Quando a regra de totalização está habilitada. |

> Os valores acima são exemplos didáticos citados durante o treinamento e não constituem parâmetros universais ou números auditados.

---

## 25. Limitações e ressalvas explicitamente reconhecidas

A reunião contém várias limitações ou pontos não detalhados, que devem ser preservados para evitar interpretações indevidas.

- As intervenções não podem ser criadas livremente na definição do ramo; novas intervenções precisam ser solicitadas.
- Não foi detalhado o processo para aprovar, criar ou publicar novas intervenções.
- O palestrante não recordava um caso real específico para a regra que obriga determinado terceiro a ser diferente do tomador.
- O palestrante também não recordava um exemplo concreto em que percentuais fossem informados sem exigência de soma igual a 100.
- A relação entre determinados tipos de endoso foi explicada de forma parcialmente ambígua, não permitindo reconstruir com segurança a classificação completa.
- Alguns ramos exibidos na demonstração eram fictícios e, segundo o palestrante, muitas vezes não tinham sentido funcional completo.
- Houve dificuldades durante a demonstração para localizar um ramo com intervenções configuradas.
- Não há detalhamento das tecnologias além da referência a rotinas PL/SQL.
- Não há detalhamento da integração entre emissão e sinistros.
- Não há explicação sobre como as regras de negócio são governadas, testadas, versionadas ou implantadas.

---

## 26. Riscos e desafios

### 26.1 Riscos explicitamente ou diretamente indicados

| Risco ou desafio | Evidência no conteúdo |
|---|---|
| Manutenção de dados históricos | A desabilitação de uma intervenção para novas apólices não deve eliminar a possibilidade de manter ou alterar os dados existentes em carteira. |
| Impacto econômico de mudanças cadastrais | A mudança do terceiro utilizado para tarifação pode gerar alteração de prêmio. |
| Persistência de informação obsoleta | Uma financeira pode continuar registrada mesmo quando o risco deixa de estar financiado, se não houver regra para removê-la. |
| Regras inadequadas de seleção para cálculo | Sem uma regra clara, a pessoa usada para cálculo precisa ser indicada manualmente. |
| Registro inválido de terceiros | Lógicas de validação devem impedir terceiros que não possam participar de determinada intervenção. |
| Distribuição incorreta de indenização | Percentuais e cessão de direitos influenciam a definição de quem recebe valores em sinistro. |

### 26.2 Desafios derivados do contexto

> Esta subseção contém interpretação analítica, não afirmações literais dos participantes.

- **Complexidade de parametrização:** a quantidade de propriedades por intervenção sugere que a definição de um ramo depende de conhecimento funcional profundo. Configurações incorretas podem afetar emissão, tarifa, sinistros e manutenção de carteira.
- **Dependência entre negócio e desenvolvimento:** a presença de rotinas PL/SQL indica que nem todos os comportamentos podem ser resolvidos exclusivamente por parametrização. Isso pode exigir coordenação entre áreas de negócio e equipes técnicas.
- **Governança de regras:** como diferentes ramos podem usar lógicas específicas, há provável necessidade de governança para evitar regras redundantes, inconsistentes ou difíceis de manter. A reunião não explicou se essa governança existe.
- **Rastreabilidade de alterações:** alterações em intervenções podem produzir efeitos econômicos. Isso sugere a importância de registrar a origem e a vigência das mudanças, embora a transcrição não tenha detalhado mecanismos de auditoria.

---

## 27. Relações de causa e efeito reconstruídas

### 27.1 Risco financiado

```text
Risco financiado
↓
Necessidade de identificar entidade financeira
↓
Necessidade de registrar cessão de direitos
↓
Disponibilização de contrato, vencimento e valor cedido
↓
Apoio à distribuição de indenização no módulo de sinistros
```

### 27.2 Múltiplos condutores

```text
Vários condutores associados ao mesmo risco
↓
Necessidade de identificar condutor relevante
↓
Definição de principal, regra automática ou seleção manual
↓
Uso do terceiro selecionado na tarifação, quando aplicável
```

### 27.3 Informação condicional

```text
Intervenção aplicável apenas em determinados cenários
↓
Necessidade de evitar solicitação desnecessária
↓
Lógica de negócio avalia atributos da emissão
↓
Intervenção é solicitada ou omitida conforme a resposta
```

### 27.4 Mudança de condição ao longo da vigência

```text
Risco inicialmente financiado
↓
Entidade financeira registrada
↓
Cliente quita o financiamento
↓
Risco deixa de estar financiado
↓
Intervenção deixa de ser solicitada
↓
Regra adicional pode excluir a entidade financeira anteriormente registrada
```

---

## 28. Leitura analítica da transformação apresentada

> Esta seção é uma interpretação fundamentada no conjunto da reunião. Não deve ser lida como declaração literal dos participantes.

### 28.1 De cadastro estático para comportamento configurável

As intervenções não funcionam apenas como campos cadastrais. Elas possuem comportamento configurável que pode afetar:

- a obrigatoriedade de informação;
- a sequência operacional;
- a tarifação;
- a validação;
- a composição de indenizações;
- a manutenção da apólice.

Isso indica um modelo em que a estrutura de participantes de uma apólice é tratada como parte relevante da lógica de produto.

### 28.2 De regras fixas para parametrização com extensibilidade

Há uma combinação entre:

- parâmetros declarativos, como ordem, quantidade, percentual e obrigatoriedade;
- regras programáveis, por meio de PL/SQL.

Essa combinação permite atender cenários comuns por configuração e casos específicos por lógica personalizada.

### 28.3 Integração funcional entre emissão, tarifa e sinistros

Mesmo que a arquitetura técnica não tenha sido descrita, a reunião evidencia um encadeamento funcional:

```text
Emissão
↓
Registro e validação de intervenções
↓
Definição de pessoa de cálculo, quando aplicável
↓
Possível impacto na tarifa
↓
Uso posterior de informações em sinistros
```

O caso da cessão de direitos mostra que informações capturadas na emissão podem influenciar decisões posteriores de indenização.

### 28.4 Evolução controlada de produto

A possibilidade de desabilitar intervenções para novas apólices, mantendo dados de carteira, sugere uma preocupação com evolução de produto sem perda de capacidade de manutenção de contratos já emitidos.

---

## 29. O que a reunião não permite concluir

A transcrição não fornece informação suficiente para determinar com segurança:

- o nome do sistema ou plataforma utilizada;
- a arquitetura técnica completa;
- banco de dados adotado;
- versão do Oracle ou ambiente de execução do PL/SQL;
- modelo de APIs, eventos, mensageria ou integrações;
- estratégia de segurança, autenticação e autorização;
- modelo de dados de terceiros, intervenções e apólices;
- regras de auditoria e trilha de alterações;
- gestão de versões de regras PL/SQL;
- processo de testes e homologação;
- estratégia de implantação de novas configurações;
- critérios formais para aprovação de uma nova intervenção;
- catálogos de erros de validação;
- regras de vigência e retroatividade;
- comportamento em caso de falha na rotina PL/SQL;
- mecanismo exato de integração com o módulo de sinistros;
- tratamento de múltiplas entidades financeiras;
- tratamento de dados pessoais e requisitos regulatórios;
- SLA, disponibilidade, contingência ou recuperação de desastre;
- critérios completos para classificar endosos ou suplementos;
- detalhes sobre o que diferencia intervenções de apólice e de risco além do contexto de configuração;
- regras completas para VIP, além do caso relatado com bancos;
- formatos, controles e validações da carga por arquivo Excel.

---

## 30. Conclusões

A reunião apresenta um modelo funcional robusto para controlar a participação de terceiros em apólices de seguro. O ramo define quais intervenções são aplicáveis, enquanto cada intervenção recebe regras específicas de quantidade, obrigatoriedade, ordem, cálculo, percentual, validação e comportamento no processo de emissão.

A configuração não se limita à coleta de dados. Dependendo do cenário, ela influencia a seleção da pessoa usada para tarifação, a necessidade de informar entidades financeiras, a distribuição de indenizações e o tratamento de alterações posteriores em endosos, suplementos ou renovações.

O uso de rotinas PL/SQL amplia a capacidade de adaptação do modelo a regras específicas de negócio. Ao mesmo tempo, essa extensibilidade aumenta a necessidade de governança, rastreabilidade e validação das regras configuradas.

A transcrição deixa claro que o objetivo não é cadastrar indiscriminadamente todos os participantes possíveis, mas modelar cada ramo de forma coerente com suas necessidades operacionais, tarifárias e de sinistros.
