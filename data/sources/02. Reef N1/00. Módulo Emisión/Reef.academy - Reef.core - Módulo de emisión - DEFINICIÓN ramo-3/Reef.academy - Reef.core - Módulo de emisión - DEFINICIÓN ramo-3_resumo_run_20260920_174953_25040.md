# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.academy - Reef.core - Módulo de emisión - DEFINICIÓN ramo-3.mp4`
**Data de processamento:** 20/09/2026 17:53:43
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada — Parametrização de emissão, suplementos, modalidades, versões e tratamentos no Rift Core

## 1. Síntese executiva

A sessão foi um treinamento funcional sobre parâmetros de configuração de ramos de seguros no sistema referido na transcrição como **Rift Core**. O foco esteve em como determinados parâmetros alteram o comportamento operacional da emissão de apólices, dos suplementos/endossos, das regras de controle técnico, das modalidades comerciais, do versionamento do ramo e dos chamados “tratamentos” de negócio.

A principal mensagem é que o sistema possui mecanismos amplos de parametrização para acomodar diferenças regulatórias, operacionais e comerciais entre países ou companhias. Em vários momentos, o instrutor explica que certas opções existem não porque sejam obrigatórias ou recomendadas em todos os cenários, mas para preservar compatibilidade com instalações já existentes ou atender necessidades locais específicas — como foi citado para Argentina, Portugal e Malta.

Os temas centrais tratados foram:

- exigência de autorização de orçamento antes de conversão em apólice;
- suspensão e retomada de uma emissão;
- controles técnicos em operações de anulação de suplemento;
- limites para emissão e impressão online de apólices com muitos riscos;
- numeração temporária ou definitiva de apólices;
- registro de motivos de suplementos;
- mudança de plano de pagamento com ou sem suplemento;
- modalidades comerciais explícitas e implícitas;
- imagens/versões de ramo, determinadas por datas de validade;
- tratamentos de ramo: diversos, automóvel, vida e transportes;
- uso de apólice marco, aplicações/declarações e suplementos de aplicação no tratamento de transportes.

A reunião não aprofunda implementação técnica, arquitetura de infraestrutura, APIs, banco de dados, segurança ou integrações externas. O conteúdo é predominantemente funcional e de modelagem/configuração de produto de seguros.

---

## 2. Contexto e antecedentes

A conversa aparenta fazer parte de uma sequência de capacitação sobre a definição e a operação de produtos/“ramos” de seguros no Rift Core. Há referências recorrentes a conteúdos vistos “ontem”, “no outro dia” ou que serão vistos posteriormente na própria interface do sistema.

O instrutor conduz a explicação por meio de parâmetros funcionais. Esses parâmetros parecem ser definidos no nível do ramo ou de sua configuração e determinam comportamentos como:

- obrigatoriedade de autorização;
- possibilidade de múltiplos motivos para um suplemento;
- geração de suplementos diante de alterações no plano de pagamento;
- formação de modalidades comerciais;
- critério para escolha da versão do ramo;
- caracterização do ramo como automóvel, vida, transporte ou “diversos”.

O cenário apresentado não é o de uma única seguradora. Pelo contrário, a explicação mostra que uma mesma base funcional pode ser configurada de formas diferentes para atender exigências de países e instalações distintas.

---

## 3. Problemas e necessidades abordados

### 3.1. Controle da emissão quando existem pendências técnicas

Foi discutida a necessidade de impedir a conversão de um orçamento em apólice enquanto houver pendências decorrentes de controles técnicos.

O exemplo dado foi uma apólice de saúde em que, durante a subscrição, uma regra técnica identifica a necessidade de realização de um exame médico. Enquanto o exame não for realizado e aprovado, o orçamento não poderá ser convertido em apólice.

A regra descrita estabelece a seguinte relação:

```text
Orçamento
↓
Controle técnico identifica pendência
↓
Necessidade de autorização ou regularização
↓
Conversão em apólice bloqueada até a resolução
```

A transcrição contém uma nota de sistema cuja redação foi considerada confusa tanto pelo instrutor quanto pelos participantes. O instrutor se comprometeu a revisá-la, sem apresentar uma interpretação definitiva.

### 3.2. Continuidade de emissões extensas

Foi apresentada a situação de criação de uma apólice com muitos riscos — o exemplo utilizou 100 riscos. O problema operacional é que uma emissão desse porte pode não ser concluída em uma única sessão de trabalho.

O sistema permite suspender a emissão e retomá-la posteriormente. Em condições normais, a retomada é restrita ao usuário que suspendeu a operação. Há, porém, um parâmetro que pode deixar a emissão “à disposição de qualquer usuário”, permitindo que outro colega continue o trabalho caso o operador original não esteja disponível.

Isso atende a uma necessidade de continuidade operacional e reduz dependência de uma única pessoa para concluir uma emissão suspensa.

### 3.3. Necessidade de desfazer alterações feitas na apólice errada

Foi abordado o caso em que um usuário realiza um suplemento com várias alterações — remoção, inclusão ou modificação de coberturas e dados — mas percebe que trabalhou na apólice incorreta.

Em vez de recriar manualmente um suplemento inverso, o sistema dispõe de um movimento de **anulação de suplemento**. Esse movimento desfaz o último suplemento vigente da apólice selecionada.

A explicação destacou que, em princípio:

- a anulação pode ser feita a qualquer momento;
- não foi citada uma janela de tempo obrigatória para essa operação;
- o sistema normalmente anula o último suplemento vigente;
- o usuário não escolhe livremente qualquer suplemento histórico, embora o instrutor mencione que podem existir casos específicos não aprofundados na sessão.

### 3.4. Necessidade de acomodar diferenças entre países

Diversos parâmetros foram explicados como resposta a pedidos de países que adotam práticas distintas. Entre os exemplos:

- Argentina: alteração de plano de pagamento precisa ficar registrada como suplemento;
- Portugal: necessidade de manter apenas um motivo associado a cada suplemento;
- Malta: necessidade de permitir vários motivos por suplemento;
- países não identificados: necessidade de executar controles técnicos na anulação de suplemento.

A lógica recorrente é:

```text
Necessidade específica de um país
↓
Solicitação de alteração funcional
↓
Risco de quebrar o comportamento de instalações anteriores
↓
Criação de parâmetro configurável
↓
Cada instalação preserva o comportamento desejado
```

---

## 4. Solução funcional apresentada

A solução apresentada é uma plataforma de seguros orientada por parametrização. Em vez de impor um único fluxo operacional para todas as instalações, o sistema permite configurar regras que influenciam a emissão, os suplementos, a modalidade comercial, o versionamento e a caracterização do ramo.

A configuração parece atuar em dois níveis principais:

1. **Definição do ramo/produto**  
   Determina características estruturais, como tratamento de automóvel, vida ou transportes; modalidades comerciais; versões; coberturas e atributos.

2. **Operação da apólice**  
   Determina como a emissão, os suplementos, os controles técnicos, os planos de pagamento e as declarações são processados.

Não foram detalhados os meios técnicos de persistência dessas configurações, nem interfaces de integração. A transcrição permite entender o comportamento funcional, mas não a implementação técnica interna.

---

## 5. Modelo funcional consolidado

Abaixo está uma representação analítica do modelo explicado. Trata-se de uma consolidação do conteúdo da reunião, e não de um diagrama literal exibido pelo instrutor.

```text
Definição do ramo
├─ Coberturas
├─ Atributos
├─ Modalidades comerciais
│  ├─ Sem modalidade
│  ├─ Modalidade explícita
│  └─ Modalidade implícita
├─ Imagens / versões por data de validade
├─ Tratamento do ramo
│  ├─ Diversos
│  ├─ Automóvel
│  ├─ Vida
│  └─ Transportes
└─ Parâmetros funcionais
   ├─ Autorização de orçamento
   ├─ Suspensão de emissão
   ├─ Controles técnicos
   ├─ Limite para operações online
   ├─ Numeração de apólices
   ├─ Motivos de suplemento
   ├─ Plano de pagamento
   └─ Critério de escolha da imagem

Operação da apólice
├─ Emissão original
│  └─ Considerada suplemento 0 no modelo de dados
├─ Suplementos / endossos
├─ Anulação de suplemento
├─ Renovação
├─ Reabilitação
└─ No tratamento de transportes:
   ├─ Apólice marco
   ├─ Aplicações / declarações
   └─ Suplementos de aplicação
```

---

## 6. Emissão de apólice e autorização de orçamento

### 6.1. Obrigatoriedade de autorização

A discussão inicial trata da exigência de autorização de um orçamento antes de sua conversão em apólice. O entendimento apresentado é que, quando um orçamento apresenta pendências decorrentes de controles técnicos, ele precisa ser autorizado antes de se tornar uma apólice.

O exemplo citado envolve saúde:

- durante a subscrição, o sistema pode indicar a necessidade de exame médico;
- enquanto o exame não for concluído e considerado adequado, a apólice não poderá ser emitida.

### 6.2. Ponto não esclarecido

Uma nota relacionada à “propriedade de emissão de orçamento obrigatório” foi considerada confusa pelos participantes e pelo instrutor. Não é possível, a partir da transcrição, determinar com segurança:

- o texto correto da propriedade;
- a relação precisa entre autorização obrigatória e emissão obrigatória de orçamento;
- se existe uma dependência funcional entre essas configurações.

Esse item deve ser validado na documentação do sistema ou em demonstração posterior.

---

## 7. Suspensão e retomada de emissão

O sistema permite interromper temporariamente uma emissão que ainda não foi concluída.

### Fluxo explicado

```text
Usuário inicia uma emissão extensa
↓
Usuário suspende a operação
↓
A emissão permanece pendente
↓
Em condições normais, o mesmo usuário a retoma
↓
Se configurado para qualquer usuário,
outro operador pode continuar a emissão
```

### Exemplo apresentado

Foi citado o caso de uma apólice com 100 riscos iniciada próximo ao fim do expediente. O operador pode suspender o trabalho, retomá-lo no dia seguinte ou, se estiver indisponível, permitir que outro colega o conclua — caso o parâmetro correspondente esteja habilitado.

### Implicação operacional

Uma leitura analítica possível é que esse recurso procura equilibrar:

- controle sobre a operação iniciada por um usuário;
- continuidade do atendimento;
- redução de dependência individual em processos demorados.

A transcrição não informa se há trilha de auditoria, bloqueio concorrente, notificação ao novo operador ou regras de conflito caso dois usuários tentem retomar a emissão.

---

## 8. Controles técnicos e anulação de suplementos

### 8.1. Comportamento histórico

Segundo a explicação, controles técnicos normalmente são acionados em operações nas quais o usuário introduz ou modifica dados de negócio — por exemplo, capital segurado, cobertura, dados de risco ou outras informações da apólice.

Em uma anulação de suplemento, o usuário apenas informa qual apólice deve sofrer a anulação. Não está modificando diretamente capital, cobertura ou dados do risco. Por essa razão, historicamente o sistema não executava controles técnicos nesse tipo de movimento.

### 8.2. Parametrização da execução de controles

Alguns países solicitaram que controles técnicos também fossem disparados quando um suplemento fosse anulado. Como resposta, esse comportamento passou a ser parametrizável.

Assim, a anulação de suplemento pode ser configurada para:

- não executar controles técnicos, preservando o comportamento histórico;
- executar controles técnicos, quando a instalação local exigir isso.

### 8.3. Anulação do último suplemento vigente

O instrutor explicou que a anulação normalmente recai sobre o último suplemento vigente. Isso impede, em princípio, que o usuário escolha arbitrariamente um suplemento antigo quando já existirem operações posteriores.

A reunião não detalha:

- os critérios completos para identificar vigência;
- os casos excepcionais em que poderia haver escolha diferente;
- o comportamento se o último suplemento estiver relacionado a outras operações dependentes.

---

## 9. Limites para emissão e impressão online

Foi mencionado um parâmetro para limitar a quantidade de riscos que podem ser emitidos ou impressos online.

### 9.1. Emissão em lote

O instrutor explicou que operações realizadas online também podem ser processadas em batch, isto é, por lote. Apólices com grande quantidade de riscos costumam chegar por arquivos — foram citados Excel ou outros arquivos — e podem ser carregadas/processadas em lote.

O exemplo utilizado foi uma apólice com 1.000 riscos. Nessa situação, o parâmetro pode impedir a emissão online e obrigar o processamento em batch.

### 9.2. Impressão em lote

A mesma lógica se aplica à impressão. Imprimir individualmente uma quantidade muito grande de riscos pode ser custoso; por isso, o sistema pode forçar a impressão por lote.

### 9.3. Limitação reconhecida

O instrutor afirmou que esse parâmetro foi criado há muitos anos e hoje possui pouca utilidade. A transcrição não explica se ele permanece ativo por compatibilidade, por exigências específicas ou por ausência de remoção da funcionalidade.

---

## 10. Numeração de apólices

Foi explicado que o sistema pode apresentar um número de apólice logo no início do processo de emissão. Esse número pode ser temporário, dependendo da configuração aplicável.

O comportamento descrito é:

```text
Início da emissão
↓
Sistema apresenta número
↓
Enquanto a emissão não estiver concluída corretamente,
o número pode ser temporário
↓
Após emissão, controles técnicos e autorizações necessários,
o número é consolidado como definitivo
```

Foi feita referência à Argentina e a uma necessidade relacionada à numeração exigida por uma “super” — provavelmente uma autoridade supervisora, mas o nome completo não está claro na transcrição. Portanto, não é possível afirmar qual órgão é referido.

---

## 11. Motivos de suplemento

### 11.1. Finalidade

O sistema permite registrar o motivo pelo qual um suplemento foi realizado. Esses motivos pertencem a uma lista definida livremente pela companhia.

Não há indicação de que os motivos sejam automaticamente inferidos a partir das mudanças efetuadas. O instrutor foi claro ao explicar que a companhia define sua própria lista de motivos.

### 11.2. Um ou vários motivos

Um parâmetro determina se, ao finalizar um suplemento, o usuário poderá informar:

- apenas um motivo; ou
- vários motivos.

Esse parâmetro não restringe as alterações que podem ser efetuadas no suplemento. Em um mesmo suplemento, o sistema pode permitir, por exemplo:

- aumentar ou reduzir soma segurada;
- alterar dados de risco;
- incluir cobertura;
- reduzir cobertura;
- incluir novo segurado;
- realizar outros tipos de modificação.

A configuração se aplica apenas ao número de motivos registrados ao final do movimento.

### 11.3. Histórico de alterações

Foi explicado que, internamente, o sistema registra as alterações realizadas. O exemplo foi o de atributos de um veículo:

| Suplemento | Marca | Modelo | Cor |
|---|---|---|---|
| 0 — emissão | Toyota | DHR | Branco |
| 1 — alteração | Não repetida | Não repetido | Preto |

A ideia apresentada é que muitas tabelas armazenam apenas o que mudou. Assim, para uma alteração de cor, o suplemento registra somente a nova cor, sem repetir marca e modelo.

### Consequência

Isso permite rastrear as mudanças ocorridas, mas torna mais custosa a reconstrução do estado completo atual ou histórico da apólice, porque é necessário considerar a emissão original e os suplementos subsequentes.

### 11.4. Origem da parametrização

O recurso de múltiplos motivos foi explicado como evolução solicitada por países. Inicialmente, o sistema permitiria apenas um motivo. A necessidade de permitir vários levou à parametrização, preservando instalações que desejavam manter um único motivo.

---

## 12. Mudança de plano de pagamento

O plano de pagamento foi descrito como uma **refinanciação do risco**. Segundo a explicação, o risco e seu custo permanecem os mesmos; o que muda é a forma pela qual o cliente realiza o pagamento.

Por padrão, a troca de plano de pagamento pode ocorrer sem criar suplemento. Entretanto, alguns países — com menção explícita à Argentina — exigem que qualquer alteração na apólice, inclusive a mudança do plano de pagamento, seja formalmente registrada como suplemento.

O parâmetro correspondente permite que essa mudança seja registrada como se fosse um endosso/suplemento.

### Observação importante

O instrutor caracterizou esse suplemento como uma marca ou registro de que houve uma mudança de plano de pagamento. A reunião não esclarece se esse suplemento altera prêmios, parcelas, contabilização, cobrança ou integrações financeiras.

---

## 13. Modalidades e oferta comercial

## 13.1. Conceito geral

“Modalidade”, “produto comercial” e “oferta comercial” são usados na reunião para descrever a possibilidade de vender pacotes de coberturas dentro de um ramo.

Um ramo pode conter diversas coberturas, mas não é obrigatório comercializar todas elas juntas. Algumas podem ser opcionais e outras podem ser mutuamente excludentes.

O exemplo de automóvel incluiu as seguintes coberturas:

- responsabilidade civil;
- acidentes;
- danos ao veículo;
- quebra de vidros/cristais;
- roubo;
- assistência em viagem.

O sistema pode trabalhar sem modalidades. Nesse cenário, as coberturas do ramo são apresentadas sem a formação prévia de pacotes comerciais.

## 13.2. Modalidade explícita

Na modalidade explícita, existe um atributo específico que determina o pacote contratado. O exemplo usa o atributo “modalidade”, com os valores:

- ouro;
- prata;
- bronze.

Esses nomes são apenas nomes comerciais. Não têm significado funcional intrínseco no sistema.

A configuração define previamente quais coberturas são ofertadas para cada valor.

### Exemplo consolidado

| Modalidade | Coberturas ofertadas no exemplo |
|---|---|
| Ouro | Todas as coberturas |
| Prata | Todas, exceto acidentes e assistência em viagem |
| Bronze | Responsabilidade civil, roubo e quebra de vidros; sem acidentes, danos ao veículo e assistência em viagem |

A tabela é uma consolidação analítica da explicação. O exemplo é ilustrativo e não uma definição universal do produto automóvel.

### Funcionamento operacional

```text
Usuário informa atributo “modalidade”
↓
Escolhe Ouro, Prata ou Bronze
↓
Sistema consulta a configuração da modalidade
↓
Sistema apresenta as coberturas previstas para aquele pacote
```

## 13.3. Modalidade implícita

Na modalidade implícita, não há um atributo único, como “Ouro”, “Prata” ou “Bronze”, que determine diretamente as coberturas.

A oferta é determinada por respostas dadas a vários atributos ou perguntas. O instrutor comparou isso a um formulário de contratação e também destacou sua utilidade para ofertas dirigidas.

Os exemplos apresentados foram inventados durante a explicação e incluíram perguntas como:

- “Viaja frequentemente para fora da província?”;
- nível de renda.

Esses exemplos servem apenas para demonstrar a mecânica de configuração e não representam uma regra de subscrição real.

### 13.4. Modalidade implícita por combinação de respostas

Nesse modelo, o sistema aguarda a combinação de respostas para identificar uma modalidade ou conjunto de coberturas.

Exemplo conceitual apresentado:

```text
Viaja frequentemente + renda superior a 10.000
↓
Modalidade 1
↓
Conjunto de coberturas associado à Modalidade 1

Não viaja frequentemente + renda superior a 10.000
↓
Modalidade 2
↓
Conjunto de coberturas associado à Modalidade 2
```

Aqui, a definição depende do conjunto de respostas. A seleção das coberturas ocorre depois que a combinação relevante foi identificada.

### 13.5. Modalidade implícita por resposta unitária

Nesse modelo, cada resposta pode, isoladamente, determinar coberturas a oferecer. Não é necessário esperar todas as respostas para começar a definir a oferta.

O instrutor exemplificou:

- resposta “sim” para viagens frequentes pode liberar determinadas coberturas;
- resposta “não” pode liberar outro conjunto;
- faixa de renda pode adicionar outras coberturas.

Ao final, as coberturas ofertadas resultam da composição das regras disparadas por cada resposta.

### Diferença central

| Aspecto | Combinação de respostas | Resposta unitária |
|---|---|---|
| Momento da decisão | Após avaliar combinação de respostas | A cada resposta individual |
| Resultado intermediário | Identifica modalidade/conjunto | Ativa diretamente coberturas |
| Dependência entre respostas | Maior | Menor, embora a oferta final possa ser composta |

### Ponto de continuidade

Os participantes perguntaram se essa configuração seria demonstrada no sistema. O instrutor confirmou que sim, esclarecendo que a tela/parâmetro atual apenas indica se o ramo possui modalidades; a definição detalhada ocorre em uma seção específica de modalidades que seria vista posteriormente.

---

## 14. Imagens ou versões do ramo

## 14.1. Conceito

O sistema chama de **imagem** aquilo que foi explicado como uma versão do ramo. O objetivo é permitir que a definição do ramo evolua ao longo do tempo, por exemplo:

- inclusão de novo atributo;
- retirada de atributo;
- inclusão de nova cobertura;
- alteração de configuração existente.

O uso de versões não é obrigatório. A justificativa apresentada é a distinção entre:

- **corretivo**: uma correção que pode não exigir a criação de nova versão;
- **evolutivo**: uma alteração funcional que pode justificar uma nova versão.

O sistema não obriga a classificar uma alteração dessa forma nem impõe a criação de versões.

## 14.2. Versões por data de validade

As imagens não são identificadas simplesmente como versão 1, 2 ou 3. Elas possuem uma data de validade.

Exemplo explicado:

| Imagem | Data de validade | Conteúdo |
|---|---|---|
| Imagem inicial | 1º de janeiro de 2024 | Definição inicial do ramo |
| Nova imagem | 1º de maio de 2024 | Inclusão de nova cobertura |

A segunda versão pode ser criada antecipadamente, em fevereiro, para começar a valer em maio.

## 14.3. Critérios para escolher a imagem aplicável

Foi explicado que um parâmetro define qual data o sistema utiliza para selecionar a imagem do ramo durante emissão ou suplemento.

### A. Data do sistema

O sistema usa a data corrente do calendário para selecionar a imagem válida mais recente, sem considerar uma versão futura.

Exemplo:

- em 1º de março, entre imagens de janeiro e maio, é utilizada a imagem de janeiro;
- em junho, é utilizada a imagem de maio.

### B. Data de efeito do suplemento/emissão

O sistema usa a data de efeito do movimento, e não a data em que o usuário está operando.

O instrutor reforça que a emissão original já é tratada como suplemento para fins do modelo; ela é o suplemento 0.

Exemplo:

- em 29 de novembro, um usuário emite apólice com efeito em 1º de março;
- com esse critério, o sistema utiliza a imagem válida em 1º de março;
- entre imagens de janeiro e maio, aplica-se a imagem de janeiro.

### C. Imagem da apólice

Nesse critério, a apólice mantém sempre sua imagem inicial. Mesmo que novas versões do ramo existam posteriormente, os suplementos da apólice continuam usando a imagem vinculada na emissão.

A reunião indica que isso permite escolher entre:

- fazer suplementos acompanharem a evolução das imagens do ramo;
- preservar a imagem original da apólice ao longo de sua vida.

## 14.4. Renovação

Foi esclarecido que a renovação é considerada um suplemento. Contudo, para a Argentina, o participante mencionou que a renovação gera novo número de apólice. O instrutor respondeu que isso depende de parâmetro e confirmou que, no caso argentino, há novo número.

Não foram detalhados:

- todos os critérios que determinam novo número na renovação;
- a configuração aplicável a outros países;
- como a imagem é selecionada em todos os cenários de renovação.

## 14.5. Reabilitação

A reabilitação também foi reconhecida como suplemento. O instrutor comentou que existem quatro formas de reabilitar apólices, mas não as detalhou. Mencionou que a forma “normal” ou “standard” é a anulação do suplemento de anulação de apólice.

Esse ponto foi apenas introduzido, não desenvolvido.

---

## 15. Tratamentos do ramo

## 15.1. Visão geral

O sistema prevê quatro tratamentos:

1. diversos;
2. automóvel;
3. transportes;
4. vida.

Esses tratamentos funcionam como uma caracterização especial do ramo. A seleção orienta o comportamento disponível durante a definição e, em certos casos, durante a operação.

### 15.2. Tratamento “diversos”

É o comportamento padrão. Segundo o instrutor, não possui implicações específicas adicionais.

### 15.3. Tratamento de automóvel

Ao definir um ramo como automóvel, o sistema passa a considerar elementos típicos desse domínio, como:

- marcas;
- modelos;
- placas;
- tipos de veículo;
- usos;
- acessórios.

A explicação não detalha quais campos são obrigatórios, quais são apenas disponíveis, nem como a configuração de cada atributo é realizada.

### 15.4. Tratamento de vida

O tratamento de vida introduz comportamento especializado na definição das coberturas.

Foi citado que, em vida:

- uma mesma cobertura pode ter propriedades distintas conforme a modalidade;
- essas propriedades podem ser operacionais ou contábeis;
- podem existir características como idade de exclusão e idade máxima;
- podem existir conceitos relacionados a mortalidade;
- há suplementos específicos, como resgates totais e parciais.

O instrutor ressalvou não ser especialista em seguros de vida. Portanto, a reunião não deve ser tomada como documentação completa do domínio de vida.

### 15.5. Tratamento de transportes

O tratamento de transportes é o mais detalhado da sessão e introduz uma estrutura operacional diferente.

Em ramos sem esse tratamento, o modelo é:

```text
Apólice
↓
Suplemento 0 — emissão
↓
Suplemento 1, 2, 3...
```

No tratamento de transportes, surgem dois conceitos adicionais:

- aplicação, também chamada de declaração;
- suplemento de aplicação.

---

## 16. Apólice marco, aplicações e suplementos de aplicação

## 16.1. Apólice marco

O exemplo principal envolve seguro de mercadorias transportadas.

A apólice marco estabelece um acordo entre seguradora e transportadora. Ela define condições gerais, como tipos de mercadoria, condições e limites do relacionamento, mas pode não ter prêmio inicialmente porque nenhum transporte concreto ocorreu.

A apólice marco foi apresentada como uma estrutura para estabelecer o “marco de atuação” antes das declarações específicas de cada operação.

## 16.2. Aplicação ou declaração

Uma aplicação corresponde à declaração de uma operação concreta. No exemplo:

- transporte de laranjas;
- origem no ponto A;
- destino no ponto B;
- viagem com características definidas;
- prêmio associado ao transporte específico.

A partir da aplicação, existe algo efetivamente segurado e precificado.

```text
Apólice marco
↓
Declaração de transporte específico
↓
Aplicação
↓
Prêmio associado à operação declarada
```

## 16.3. Suplemento de aplicação

Se houver alteração na operação declarada, a mudança afeta a aplicação, e não necessariamente a apólice marco.

Exemplo:

- inicialmente foi declarada carga de laranjas;
- posteriormente identifica-se que a carga era de chips;
- como o risco e o valor podem ser distintos, é feito um suplemento na aplicação correspondente.

## 16.4. Suplemento da apólice marco

Também é possível alterar a própria apólice marco. O exemplo mencionado foi incluir posteriormente uma categoria de mercadoria antes excluída, como peças de reposição de automóveis.

Essa mudança é realizada como suplemento da apólice marco e pode produzir efeitos para declarações futuras conforme sua data de efeito.

## 16.5. Uso além de transporte de mercadorias

Um participante da Argentina explicou que a mesma lógica é usada em seguros coletivos de vida ou acidentes pessoais, quando o número de segurados varia periodicamente.

O exemplo foi:

- cria-se uma apólice marco sem prêmio, cobertura ou comissão inicialmente;
- a apólice contém cláusulas e condições;
- mensalmente, declara-se a quantidade de pessoas cobertas;
- cada declaração gera a cobrança correspondente.

O instrutor confirmou que esse uso também se enquadra no tratamento de transportes, embora o nome decorra da origem histórica ligada ao transporte de mercadorias.

### Interpretação analítica

O “tratamento de transportes” parece ser um modelo funcional de cobertura por declaração periódica ou transacional, não apenas uma funcionalidade exclusiva para mercadorias em trânsito. Essa é uma leitura derivada dos exemplos apresentados, não uma definição formal explícita do sistema.

---

## 17. Perguntas e respostas relevantes

### 17.1. A anulação de suplemento tem prazo?

**Pergunta:** A anulação deve ser imediata ou existe prazo para realizá-la?

**Resposta:** Em princípio, pode ser realizada a qualquer momento; não foi indicada restrição temporal.

**O que esclarece:** O mecanismo é apresentado como alternativa ao desfazimento manual de alterações, não como uma operação limitada a um curto período após o suplemento.

---

### 17.2. Qual suplemento é anulado se existem vários?

**Pergunta:** Se houver outro suplemento posterior, como o sistema identifica qual deve ser anulado?

**Resposta:** Em princípio, o sistema anula o último suplemento vigente.

**O que esclarece:** A operação não foi apresentada como uma anulação livre de qualquer evento histórico.

---

### 17.3. Múltiplos motivos de suplemento restringem as alterações possíveis?

**Pergunta:** Ter um ou vários motivos muda as alterações permitidas no suplemento?

**Resposta:** Não. As mudanças funcionais podem ocorrer independentemente do parâmetro. O parâmetro apenas controla se, ao encerrar o suplemento, será informado um ou vários motivos.

**O que esclarece:** Motivos são metadados de classificação/registro, não regras de composição do suplemento.

---

### 17.4. Os motivos são pré-definidos?

**Pergunta:** Há uma lista de valores para os motivos?

**Resposta:** Sim, há uma lista, mas a definição é livre para a companhia.

**O que esclarece:** O sistema oferece estrutura para classificar motivos, mas não impõe uma taxonomia universal.

---

### 17.5. “Ouro”, “Prata” e “Bronze” possuem significado predefinido?

**Pergunta:** Esses nomes implicam um significado funcional específico?

**Resposta:** Não. São nomes comerciais definidos pela companhia.

**O que esclarece:** A modalidade não é uma classificação rígida da plataforma; é uma configuração de oferta e cobertura.

---

### 17.6. As modalidades poderão ser vistas na interface?

**Pergunta:** Será possível ver a configuração no sistema?

**Resposta:** Sim. O instrutor informou que seria demonstrada posteriormente em seção específica de modalidades.

**O que esclarece:** O parâmetro discutido naquele momento apenas indica se o ramo usa modalidades; a configuração detalhada ocorre em outra área.

---

### 17.7. A versão é escolhida pela data de emissão ou pela data de efeito?

**Pergunta:** A escolha da imagem considera a data de emissão ou de efeito?

**Resposta:** Depende do critério configurado. Foram explicados os critérios por data do sistema, data de efeito do suplemento e imagem da apólice.

**O que esclarece:** A escolha da imagem é parametrizável e pode produzir resultados diferentes para apólices emitidas em uma data, mas com efeito em outra.

---

### 17.8. Renovação é suplemento?

**Pergunta:** A renovação segue sendo suplemento?

**Resposta:** Sim. Para a Argentina, porém, foi mencionado que ela pode gerar novo número de apólice, dependendo de parâmetro.

**O que esclarece:** A classificação funcional como suplemento não impede que existam regras locais de numeração e identificação.

---

### 17.9. Por que diferenciar tratamento de vida se o produto já é configurado?

**Pergunta:** As propriedades de vida não seriam definidas na configuração do produto?

**Resposta:** O tratamento de vida condiciona o sistema a solicitar e disponibilizar características específicas durante a definição, como idade de exclusão e aspectos associados a vida.

**O que esclarece:** O tratamento atua como pré-caracterização do domínio, orientando quais propriedades funcionais são pertinentes ao ramo.

---

### 17.10. Um suplemento da apólice marco pode ter efeito entre aplicações existentes?

**Pergunta:** É possível incluir suplemento na apólice marco com data de efeito situada entre aplicações/declarações já realizadas?

**Resposta:** Sim. Segundo o instrutor, apólice e aplicações possuem “vidas distintas”; a alteração da apólice pode ser feita independentemente das declarações já existentes.

**O que esclarece:** Há separação entre a evolução da apólice marco e a evolução das aplicações individuais.

---

## 18. Números e exemplos citados

Os valores abaixo foram usados como exemplos didáticos durante o treinamento e não devem ser entendidos como parâmetros universais de negócio.

| Item | Valor citado | Contexto |
|---|---:|---|
| Riscos em emissão extensa | 100 | Exemplo de emissão que pode ser suspensa |
| Riscos para emissão online limitada | 1.000 | Exemplo de apólice que pode precisar de batch |
| Coberturas do exemplo de automóvel | 6 | Responsabilidade civil, acidentes, danos, vidros, roubo e assistência |
| Modalidades comerciais ilustrativas | 3 | Ouro, Prata e Bronze |
| Data de imagem inicial | 1º de janeiro de 2024 | Exemplo de versão do ramo |
| Data de nova imagem | 1º de maio de 2024 | Exemplo de entrada de nova cobertura |
| Valor de renda no exemplo implícito | 10.000 | Exemplo inventado para demonstrar regras |
| Prêmio de aplicação de transporte | 100 dólares | Exemplo de viagem declarada |
| Quantidade de segurados declarados | 25 e 20 | Exemplo de seguro coletivo em Argentina |
| Duração declarada de apólice marco | 1 ano | Exemplo didático |

---

## 19. Limitações reconhecidas durante a reunião

- A nota sobre autorização obrigatória de orçamento foi considerada confusa e não foi esclarecida.
- Alguns parâmetros foram descritos como antigos e de utilidade reduzida atualmente, como o limite de riscos para emissão/impressão online.
- O instrutor mencionou exceções na anulação de suplementos, mas não as detalhou.
- Foram citadas quatro formas de reabilitação de apólice, mas apenas uma foi brevemente caracterizada.
- O funcionamento detalhado da tela de modalidades ficou para uma etapa posterior.
- O instrutor declarou não ser especialista em seguros de vida.
- Não foi apresentada a lista completa de propriedades disponíveis para cada tratamento.
- Não foram detalhadas regras de auditoria, permissões, trilha de alterações ou concorrência de usuários.
- Não foram explicadas as regras completas de cobrança, contabilização ou integração financeira para plano de pagamento e aplicações.

---

## 20. Riscos e desafios

### 20.1. Riscos explicitamente reconhecidos

- **Emissão incompleta:** operações com muitos riscos podem não ser concluídas em uma única sessão.
- **Dependência de usuário:** sem disponibilização para outros usuários, uma emissão suspensa pode depender do operador original.
- **Alterações na apólice errada:** suplementos podem ser realizados em uma apólice incorreta, exigindo anulação.
- **Uso de imagem inadequada:** o critério de seleção de versão pode causar aplicação de configuração diferente da esperada se não for entendido corretamente.
- **Diferenças locais:** uma configuração adequada para um país pode não atender outro.

### 20.2. Desafios derivados do contexto

As interpretações abaixo decorrem do conjunto da reunião e não foram formuladas literalmente pelos participantes.

- **Governança de parametrização:** a quantidade de parâmetros e exceções locais sugere necessidade de forte controle sobre quem configura ramos, modalidades, versões e tratamentos.
- **Complexidade de manutenção:** modalidades implícitas e regras baseadas em combinação de atributos podem se tornar difíceis de entender, testar e manter.
- **Reconstrução histórica:** o armazenamento de apenas mudanças em várias tabelas pode exigir lógica adicional para reconstruir o estado completo de uma apólice em determinado momento.
- **Consistência entre países:** a flexibilidade para atender instalações locais pode aumentar a diversidade de comportamentos e reduzir padronização operacional.
- **Treinamento de usuários:** conceitos como suplemento 0, imagens por data e aplicações exigem entendimento funcional específico para evitar erros de operação.

---

## 21. Transformações e direcionamentos percebidos

### 21.1. De comportamento fixo para comportamento parametrizável

A reunião evidencia uma direção de evolução em que regras antes fixas passam a ser configuráveis. Exemplos:

- um ou vários motivos de suplemento;
- controles técnicos em anulação;
- suplemento obrigatório para mudança de plano de pagamento;
- regras para escolha de imagem;
- disponibilidade de emissão suspensa para outros usuários.

Isso sugere uma plataforma desenhada para reutilização em contextos diversos, evitando alterações de código específicas a cada país sempre que possível.

### 21.2. De produto estático para produto versionado

O conceito de imagem introduz uma forma de evolução temporal do ramo. A definição de produto deixa de ser necessariamente única e permanente, podendo coexistir em versões válidas a partir de datas diferentes.

### 21.3. De oferta genérica para oferta dirigida

As modalidades explícitas e implícitas representam diferentes níveis de sofisticação comercial:

```text
Sem modalidade
↓
Coberturas apresentadas sem pacote comercial prévio
↓
Modalidade explícita
↓
Pacotes comerciais nomeados e predefinidos
↓
Modalidade implícita
↓
Oferta determinada por respostas e atributos do cliente/risco
```

A modalidade implícita foi associada à possibilidade de ofertas dirigidas, pois as coberturas podem variar conforme respostas dadas durante a contratação.

### 21.4. De apólice única para modelo marco-declaração

No tratamento de transportes, a solução se desloca de uma estrutura centrada apenas em apólice e suplemento para uma estrutura com:

- contrato marco;
- declarações/aplicações de eventos concretos;
- alterações independentes da apólice e das aplicações.

Esse modelo acomoda negócios em que o risco efetivo só é conhecido em eventos futuros ou períodos de declaração.

---

## 22. O que a reunião não permite concluir

A transcrição não permite determinar, com segurança:

- a tecnologia utilizada pelo Rift Core;
- linguagem de programação, banco de dados, infraestrutura ou cloud;
- existência e funcionamento de APIs, eventos, mensageria ou integrações por arquivos;
- modelo de autenticação, autorização e gestão de perfis;
- regras de auditoria e rastreabilidade de mudanças;
- modelo de concorrência para emissões suspensas;
- regras de bloqueio, desbloqueio ou escalonamento de controles técnicos;
- composição exata do fluxo de autorização de orçamento;
- algoritmo completo para seleção do “último suplemento vigente”;
- lista de motivos de suplemento de cada instalação;
- regras contábeis e financeiras detalhadas para planos de pagamento;
- critérios completos de renovação e numeração de apólices em todos os países;
- quatro modalidades de reabilitação mencionadas;
- propriedades completas dos tratamentos de automóvel, vida, transporte e diversos;
- estrutura de dados completa usada para armazenar imagens, suplementos, aplicações e alterações;
- procedimentos de teste, homologação, deploy ou governança de mudanças de configuração;
- indicadores operacionais, SLAs, métricas ou responsabilidades formais das equipes.

---

## 23. Conclusões principais

1. O Rift Core foi apresentado como uma solução altamente parametrizável para operações de seguros, capaz de atender diferenças entre países e companhias sem necessariamente mudar a lógica central do sistema.

2. Emissão, suplemento, anulação, pagamento, modalidades e versões não são tratados como comportamentos fixos: diversos aspectos podem ser configurados por parâmetros.

3. A emissão original é considerada suplemento 0 no modelo explicado, o que influencia a compreensão de versões, histórico e movimentos posteriores.

4. O sistema registra alterações de forma incremental em muitas estruturas, preservando rastreabilidade das mudanças, ainda que isso aumente a complexidade para reconstruir o estado completo da apólice.

5. Modalidades explícitas permitem pacotes comerciais diretamente escolhidos; modalidades implícitas permitem ofertas condicionadas às respostas de atributos ou formulários.

6. As imagens do ramo permitem administrar evolução temporal do produto por data de validade, com critérios configuráveis para decidir qual imagem se aplica a uma emissão ou suplemento.

7. O tratamento de transportes amplia o modelo tradicional de apólice e suplemento com aplicações/declarações, permitindo representar riscos que só se tornam concretos em eventos ou períodos posteriores.

8. Há pontos relevantes ainda pendentes de detalhamento, especialmente a regra confusa de autorização de orçamento, exceções de anulação, reabilitação, configuração concreta das modalidades e aspectos técnicos não abordados pela sessão.
