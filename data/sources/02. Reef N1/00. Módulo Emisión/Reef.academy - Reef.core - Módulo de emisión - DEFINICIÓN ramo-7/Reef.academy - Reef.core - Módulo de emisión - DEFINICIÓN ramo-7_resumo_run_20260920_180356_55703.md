# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.academy - Reef.core - Módulo de emisión - DEFINICIÓN ramo-7.mp4`
**Data de processamento:** 20/09/2026 18:07:42
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada — Parametrização de ramos, comissões, contabilização e controles de risco em Rizcore

## 1. Síntese executiva

A sessão é um treinamento funcional e técnico sobre a parametrização de um ramo de seguros no sistema referido na transcrição como **Rizcore/RicCore**. O nome aparece com variações decorrentes do reconhecimento de voz; a transcrição não permite confirmar formalmente a grafia do produto.

O conteúdo percorre regras que determinam o comportamento operacional de apólices, suplementos, comissões, agentes, estrutura comercial, contabilização e mecanismos de controle de risco e fraude. A mensagem central é que o sistema possui numerosos parâmetros de produto/ramo, muitos deles ativáveis ou desativáveis, que permitem adaptar a operação às práticas de cada companhia e país sem necessariamente alterar o núcleo do sistema.

A reunião também mostra que a configuração de um produto não é responsabilidade exclusiva de uma única área. A definição envolve, conforme o assunto, equipes comerciais, financeiras, contábeis, atuariais, técnicas, de operações e de negócio. Várias decisões de parametrização têm impactos diretos sobre contabilização, comissão, governança comercial, emissão e aceitação de riscos.

---

## 2. Escopo da conversa

A apresentação trata principalmente de:

- tratamento do dia 29 de fevereiro em cálculos de vigência;
- acesso a quadros de comissão;
- distinção entre comissão de nova produção e de carteira;
- composição e regras de agentes em uma apólice;
- imputação da produção à estrutura comercial;
- regras de fechamento contábil mensal;
- tratamento contábil de apólices com vigência futura;
- redistribuição manual de comissões entre recibos;
- integração com um aplicativo externo denominado **Platea**, voltado à avaliação de risco de fraude;
- uso de “marcas” para registrar e consultar informações de risco;
- integração externa de seleção de riscos, especialmente em seguros de vida e acidentes;
- inativação de ramos já não comercializados;
- evolução histórica de parâmetros que se tornaram obsoletos ou foram substituídos por configurações mais flexíveis.

---

## 3. Contexto e antecedentes

A sessão ocorre no contexto de uma explicação progressiva da definição de ramos de seguro. O instrutor menciona que, ao longo do treinamento, foram vistos parâmetros de recibos, agentes, quadros de comissão, versões/imagens de produto, suplementos, fechamento contábil e outros conceitos relacionados.

A definição de um ramo é apresentada como uma configuração ampla, composta por “centenas de parâmetros”. Esses parâmetros estabelecem, por exemplo:

- quais funcionalidades estarão disponíveis;
- como o sistema calcula determinados períodos;
- como comissões são obtidas e distribuídas;
- quantos agentes podem participar de uma apólice;
- como a produção será atribuída à estrutura comercial;
- quando movimentos serão contabilizados;
- quando integrações externas deverão ser chamadas;
- como o produto reage a sinais de risco ou fraude;
- se o ramo continua disponível para novas emissões.

A conversa reforça que o objetivo não é apenas cadastrar um produto comercialmente, mas definir seu comportamento operacional, financeiro, contábil e de controle.

---

## 4. Problemas e necessidades discutidos

### 4.1. Divergência de interpretação sobre o dia 29 de fevereiro

O primeiro problema abordado é a diferença de entendimento sobre como tratar o dia 29 de fevereiro em cálculos de vigência.

Foi dado o exemplo de uma apólice iniciada em 1º de março de um ano não bissexto e terminada em 1º de março de um ano bissexto. Embora o intervalo calendário possa conter 366 dias, o sistema trabalha, para determinados cálculos de importes, com bases de **365 ou 360 dias**, dependendo de outro parâmetro mencionado anteriormente.

O ponto específico surge em um suplemento emitido em 29 de fevereiro. A dúvida é se esse movimento possui:

- um dia de vigência; ou
- zero dias de vigência.

A transcrição informa que países diferentes tinham interpretações distintas: alguns defendiam que o dia deveria ser considerado; outros, que não deveria.

### 4.2. Necessidade de flexibilidade por companhia ou país

A solução apresentada para o caso do 29 de fevereiro não é uma regra única imposta pelo sistema. O parâmetro permite que cada consumidor/configuração determine se considera ou não esse dia.

A mesma lógica de flexibilidade aparece em outros temas:

- uso ou não de comissão de carteira;
- forma de consultar o quadro de comissão;
- possibilidade de redistribuir comissões manualmente;
- escolha de contabilizar apólices futuras no mês de emissão ou no mês de início de vigência;
- ativação de integrações externas;
- ações tomadas diante de risco de fraude;
- comportamento de marcas preventivas e reativas.

### 4.3. Risco de inconsistência contábil por mudanças na estrutura comercial

A alteração de agente ou de escritório comercial associado a uma apólice pode afetar lançamentos contábeis e pendências financeiras.

O instrutor explica que, se uma apólice foi originalmente contabilizada em uma estrutura comercial — por exemplo, Buenos Aires — e depois o agente é alterado para outra estrutura — por exemplo, Rosário —, cobranças posteriores podem ser atribuídas ao novo local, enquanto pendências anteriores continuam vinculadas ao local original.

A consequência descrita é um potencial descasamento contábil. A transcrição usa uma expressão coloquial para indicar que a situação pode se tornar bastante confusa.

### 4.4. Risco de contabilizar antecipadamente apólices futuras

Outro problema relevante é a emissão de uma apólice com efeito futuro.

Exemplo discutido:

- uma apólice é emitida em 2 de dezembro;
- sua vigência começa em 15 de janeiro de 2025;
- a data contábil padrão do sistema ainda corresponde a dezembro.

Se a contabilização ocorrer em dezembro, podem ser reconhecidas primas, pendências e reservas antes de o risco entrar efetivamente em vigor e antes de o primeiro recibo ser cobrado, o que provavelmente ocorreria em janeiro.

A necessidade identificada é permitir que certos ramos contabilizem movimentos futuros no período de vigência, e não necessariamente no período de emissão.

### 4.5. Necessidade de controlar risco e fraude antes e depois da contratação

A apresentação descreve dois tipos de necessidade:

1. **Preventiva/proativa:** avaliar o risco antes da emissão da apólice.
2. **Reativa:** identificar e tratar indícios de fraude ou risco depois que a apólice já está ativa, especialmente no contexto de sinistros.

Essa necessidade é abordada por duas capacidades distintas:

- integração externa com o aplicativo Platea;
- mecanismo interno de “marcas”.

---

## 5. Conceitos funcionais centrais

## 5.1. Apólice, suplemento e emissão

A emissão de uma nova apólice é tratada pelo sistema como um tipo de suplemento, denominado pelo instrutor de **“suplemento zero”**.

A transcrição distingue:

- **emissão:** criação de uma nova apólice;
- **suplemento:** alteração/movimento relacionado a uma apólice existente;
- **renovação:** continuidade ou renovação da apólice, tratada em algumas explicações como um novo ciclo contratual.

Essa distinção é importante porque vários parâmetros usam a data de efeito da apólice ou a data de efeito do suplemento para determinar comissão, contabilização e outras regras.

## 5.2. Nova produção e carteira

A sessão define dois períodos para efeito de comissão:

| Conceito | Significado apresentado |
|---|---|
| Nova produção | Primeiro ano da apólice |
| Carteira | Período a partir da primeira renovação |

A justificativa apresentada é comercial: conquistar uma nova apólice exige mais esforço do agente do que apenas mantê-la nas renovações seguintes. Por isso, uma companhia pode optar por uma comissão maior no primeiro ano e menor nos períodos posteriores.

Contudo, isso não é obrigatório. Algumas companhias podem optar por não trabalhar com comissão de carteira. Nesse caso, o sistema pode aplicar o percentual de nova produção também às renovações.

---

## 6. Tratamento do dia 29 de fevereiro

### 6.1. Regra apresentada

O sistema possui um parâmetro que define se o dia 29 de fevereiro deve ser considerado no cálculo de vigência de certos movimentos.

No exemplo apresentado:

- apólice: de 1º de março de 2023 a 1º de março de 2024;
- suplemento: com data de 29 de fevereiro de 2024.

Dependendo do parâmetro:

- se o dia 29 for considerado, o suplemento pode ter **um dia de vigência**;
- se o dia 29 não for considerado, o suplemento pode ter **zero dias de vigência**.

### 6.2. Limite da explicação

A conversa diferencia esse tratamento da base geral de cálculo de importes. Mesmo que o 29 de fevereiro seja considerado para a vigência do movimento, o cálculo de importes continua sujeito à convenção de 365 ou 360 dias, conforme outro parâmetro já tratado no treinamento.

A transcrição não detalha a fórmula financeira nem esclarece todos os cenários de cálculo em que a decisão sobre o dia bissexto é aplicada.

### 6.3. Implicação analítica

Uma leitura possível é que o sistema busca separar:

- a contagem operacional de dias de vigência de um movimento; e
- a convenção financeira usada para cálculo de importes.

Essa separação permite acomodar regras locais sem necessariamente alterar a base de cálculo financeiro adotada pela companhia.

---

## 7. Quadros de comissão

## 7.1. Finalidade

Os quadros de comissão são descritos como agrupamentos que definem os percentuais de comissão pagos às figuras participantes de uma operação.

A parametrização pode ser feita:

- por ramo;
- por cobertura dentro do ramo;
- por uma cobertura genérica, aplicável às coberturas não configuradas especificamente.

### Exemplo apresentado

Para um mesmo ramo, como automóvel, a companhia pode definir:

| Cobertura | Comissão ilustrativa mencionada |
|---|---:|
| Cobertura específica A | 10% |
| Cobertura específica B | 5% |
| Demais coberturas | Percentual genérico |

Os percentuais são exemplos didáticos fornecidos pelo instrutor, não uma regra universal do sistema.

## 7.2. Forma de acesso ao quadro de comissão

O sistema permite definir qual data será usada para acessar o quadro de comissão. As alternativas mencionadas são:

1. **Data de efeito do suplemento**
2. **Data de efeito da apólice**
3. **Data contábil**

### Acesso pela data de efeito do suplemento

Se cada suplemento possui uma data de efeito própria, uma atualização posterior do quadro de comissão pode fazer com que o suplemento use uma comissão diferente da aplicada na emissão original ou em movimentos anteriores.

### Acesso pela data de efeito da apólice

Nesse caso, a tendência é manter o mesmo percentual para a apólice, pois a consulta sempre se baseia na data de efeito original da apólice.

### Acesso pela data contábil

Também é possível usar a data contábil do movimento como chave de consulta dos percentuais de comissão.

### Implicação

A escolha da data de consulta é uma decisão de negócio e governança de comissionamento. Ela influencia se alterações posteriores nos quadros de comissão afetam ou não os suplementos e movimentos subsequentes de apólices já existentes.

---

## 8. Modelo de agentes e participantes da comissão

## 8.1. Figuras de agente

O sistema permite até seis figuras relacionadas a agentes:

| Figura | Papel descrito |
|---|---|
| Agente principal | Agente com percentual próprio definido no quadro de comissão |
| Até três agentes secundários | Participam da operação, mas recebem a comissão a partir do agente principal |
| Organizador | Superior/hierarquicamente relacionado ao agente principal |
| Assessor | Pessoa que participou da obtenção do negócio |

A descrição indica que há um total máximo de seis figuras considerando:

- um agente principal;
- até três agentes secundários;
- um organizador;
- um assessor.

## 8.2. Comissão dos agentes secundários

Durante a sessão, o instrutor pergunta de onde os agentes secundários recebem comissão. A resposta dada pelos participantes é que ela vem do **agente principal**.

Isso significa que os agentes secundários não possuem, segundo a explicação, um percentual próprio definido diretamente no quadro de comissão.

## 8.3. Organizador e assessor

O organizador e o assessor também possuem percentuais declarados no quadro de comissão.

O organizador é descrito como o “chefe” do agente principal. O assessor é a pessoa que colaborou na obtenção do negócio.

## 8.4. Número máximo de agentes por ramo

O ramo pode predeterminar quantas figuras de agente serão solicitadas durante a emissão.

Exemplos conceituais:

- um ramo pode aceitar apenas agente principal;
- outro pode admitir mais figuras;
- quando o ramo já sabe que não utilizará agentes secundários, o sistema deixa de solicitar essas informações na emissão.

A finalidade do parâmetro é simplificar a captura de dados, evitando perguntas que não fazem sentido para determinado ramo.

---

## 9. Estrutura comercial e oficina de imputação

## 9.1. Finalidade da estrutura comercial

Cada agente é associado a uma estrutura comercial. O instrutor a compara a uma estrutura geográfica adaptada à organização da companhia, com divisões como norte, sul, leste/oeste e centro.

A apólice nasce vinculada a uma estrutura comercial. Essa atribuição permite análises posteriores, como:

- emissão por região;
- recibos cobrados ou pendentes;
- sinistralidade;
- comparação entre receitas, despesas e resultados;
- acompanhamento de desempenho comercial.

## 9.2. Vínculo do agente a múltiplas estruturas

O sistema pode permitir que um agente atue em mais de uma estrutura comercial.

No exemplo didático usado:

- o agente pode produzir negócios em Buenos Aires;
- o mesmo agente pode produzir negócios em Rosário.

Nesse cenário, no momento da emissão é necessário determinar a qual estrutura comercial a apólice será atribuída.

## 9.3. Comportamento do parâmetro de oficina de imputação

O parâmetro determina se a oficina/estrutura de imputação será:

- assumida automaticamente a partir do padrão do agente; ou
- disponibilizada para escolha durante a emissão.

Caso seja configurado para permitir escolha, o sistema pode apresentar a estrutura padrão do agente, mas liberar o campo para que o emissor selecione, por exemplo, Buenos Aires ou Rosário.

## 9.4. Limites para alteração posterior

Foi esclarecido que:

- na **renovação**, a estrutura comercial pode ser alterada;
- em um **suplemento**, essa alteração não é permitida.

A justificativa dada é o impacto contábil. Mudar a estrutura no meio de uma apólice poderia gerar inconsistências entre o local em que primas e pendências foram originalmente registradas e o local ao qual cobranças posteriores seriam atribuídas.

## 9.5. Troca de agente

Ao mudar um agente por suplemento, o novo agente deveria, em princípio, pertencer à mesma estrutura comercial do agente anterior.

O sistema pode permitir a alteração para uma estrutura diferente, mas emite um aviso de que a contabilidade pode ficar descasada.

### Relação de causa e efeito apresentada

```text
Apólice originalmente imputada a uma estrutura comercial
↓
Primas, pendências e registros contábeis vinculados a essa estrutura
↓
Mudança de agente para outra estrutura
↓
Cobranças futuras atribuídas ao novo local
↓
Pendências anteriores permanecem no local original
↓
Possível descasamento contábil
```

---

## 10. Organizador e assessor na emissão

Quando uma apólice é emitida e o agente principal é informado, o sistema busca a configuração cadastral desse agente.

Se houver organizador e/ou assessor definidos para o agente, essas informações são carregadas automaticamente para a apólice.

Por padrão, os valores iniciais não podem ser alterados. Um parâmetro específico pode liberar a alteração, permitindo:

- remover o organizador;
- trocar o organizador;
- remover ou modificar o assessor.

A transcrição não detalha quais regras de auditoria, autorização ou rastreabilidade são aplicadas quando esses dados são alterados manualmente.

---

## 11. Distribuição e alteração de comissões

## 11.1. Relação com o plano de pagamento

O plano de pagamento determina:

- quantidade de recibos ou parcelas;
- distribuição dos importes entre os recibos;
- distribuição das comissões entre os recibos.

Foi destacado que a distribuição da comissão não precisa ser proporcional à distribuição financeira da prima.

### Exemplo fornecido

Em uma operação com 12 recibos, a regra poderia definir:

- primeiro recibo: 100% da comissão;
- 11 recibos restantes: 0% de comissão.

## 11.2. Alteração manual de comissão

Há um parâmetro que permite alterar manualmente a distribuição das comissões nos recibos.

Essa possibilidade não permite mudar o total da comissão calculada. A regra é:

```text
Total de comissão definido
↓
Pode ser redistribuído entre os recibos
↓
Não pode ser aumentado ou reduzido manualmente
```

Exemplo apresentado:

- se o total de comissão for 100, a soma das comissões de todos os recibos deve continuar sendo 100;
- o usuário pode mudar como esse total será repartido.

## 11.3. Papel do plano de pagamento

O instrutor comenta que certos parâmetros antigos foram delegados ao plano de pagamento. Isso significa que a regra de distribuição de comissão passou a ser controlada principalmente por essa configuração, e não por parâmetros isolados mais antigos.

---

## 12. Nova produção e carteira

## 12.1. Configuração de percentuais diferentes

A companhia pode definir percentuais distintos para:

- nova produção;
- carteira.

A nova produção corresponde ao primeiro ano. A carteira passa a vigorar a partir da primeira renovação.

## 12.2. Possibilidade de não usar carteira

Algumas companhias não desejam trabalhar com comissão de carteira.

Nessa situação, o sistema pode ser configurado para aplicar o percentual de nova produção também nas renovações, em vez de usar um percentual separado de carteira.

A apresentação indica que, nesse modelo, a companhia poderia manter o campo de carteira com zero ou deixar de utilizá-lo operacionalmente, porque a lógica aplicaria nova produção.

---

## 13. Evolução de regras de comissão e parâmetros obsoletos

A reunião registra a existência de parâmetros antigos que já não produzem efeito.

Um exemplo está relacionado a suplementos e mudança de agente:

- no passado, um suplemento sempre utilizava a comissão aplicada na emissão;
- quando o agente era alterado, o novo agente recebia as comissões do agente anterior;
- posteriormente, foi incluída a capacidade de recalcular comissões em mudança de agente;
- atualmente, segundo o instrutor, todas as mudanças de agente recalculam comissão.

Isso evidencia uma evolução do produto. Parâmetros antigos podem continuar visíveis em determinadas telas ou materiais, mas já não representam o comportamento atual efetivo.

---

## 14. Modelo operacional de fechamento contábil

## 14.1. Data contábil do movimento

Cada movimento realizado no sistema recebe uma data contábil.

Essa data é usada posteriormente nos processos de contabilização. Os movimentos citados incluem:

- novas apólices;
- suplementos;
- recibos novos;
- recibos remetidos;
- recibos cobrados;
- sinistros abertos;
- sinistros pagos;
- sinistros com importes a satisfazer;
- movimentações relacionadas a reservas.

## 14.2. Fechamento de mês

O sistema possui um processo chamado de fechamento de mês.

Esse processo é responsável por gerar lançamentos contábeis associados a movimentos registrados em determinado período, incluindo, conforme explicado:

- emissão e renovação de apólices;
- suplementos;
- primas;
- reservas de recibos;
- pendências de pagamentos fracionados;
- sinistros;
- reservas de sinistros.

## 14.3. Catálogo ou local central da data contábil

A explicação menciona um local central, descrito como um catálogo, no qual está configurada a data usada para registrar os movimentos.

Em uma situação normal:

- enquanto o catálogo indica 30 de novembro, os movimentos são registrados contabilmente em novembro;
- após o fechamento, a data pode ser alterada para 31 de dezembro;
- novos movimentos passam a ser registrados em dezembro.

Essa mudança permite fechar contabilmente o período anterior sem bloquear o registro de operações do novo período.

## 14.4. Antecipação de fechamento

A companhia não precisa necessariamente esperar o último dia do mês para avançar a data contábil.

Foi apresentado o exemplo de dezembro:

- em 20 de dezembro, a companhia pode configurar a data contábil para 31 de janeiro;
- a partir daí, as operações passam a ser registradas contabilmente em janeiro;
- a equipe pode executar e revisar o fechamento de dezembro antes das festas de fim de ano.

O objetivo prático descrito é evitar a necessidade de realizar fechamento e conferências no dia 31 de dezembro ou no início do ano seguinte.

## 14.5. Implicação operacional

A data contábil é apresentada como um mecanismo de controle do período operacional, não apenas como um reflexo da data de calendário.

Uma leitura analítica possível é que o sistema permite desacoplar parcialmente:

- a data em que o usuário executa uma operação; e
- o período contábil em que essa operação será registrada.

---

## 15. Contabilização de apólices com vigência futura

## 15.1. Cenário discutido

Foi analisada uma apólice emitida em dezembro, mas com início de vigência em janeiro.

Sem uma regra especial, o sistema pode atribuir a data contábil de dezembro, por ser o período aberto no momento da emissão.

## 15.2. Consequências apontadas

Contabilizar em dezembro uma apólice cujo risco começa em janeiro pode causar:

- reconhecimento de prima antes do início de vigência;
- geração de pendências antes do primeiro recebimento;
- necessidade de registrar reservas relacionadas a um risco ainda não iniciado;
- desalinhamento entre contabilização e momento esperado de cobrança do primeiro recibo.

## 15.3. Regra parametrizável

O sistema permite decidir, para apólices futuras, se o registro contábil deve ocorrer:

- no período contábil atual, correspondente à emissão; ou
- no período futuro, correspondente ao início de vigência/efeito do movimento.

A transcrição esclarece que essa configuração pode ser feita por ramo.

## 15.4. Regra tipificada mais recente

Um parâmetro antigo foi descrito como descontinuado/depreciado porque a lógica foi “tipificada”, ou seja, deixou de ser tratada apenas como um simples sim/não e passou a oferecer formas mais específicas de comportamento.

A regra explicada usa a maior data entre:

- a data contábil registrada; e
- a data de efeito do suplemento.

Com essa lógica:

- se o suplemento tiver efeito atual ou passado, utiliza-se a data contábil registrada;
- se o suplemento tiver efeito futuro, a data futura pode prevalecer.

A transcrição indica que essa tipificação substitui a necessidade de um parâmetro anterior de data contábil do suplemento.

---

## 16. Governança da definição de produto

A conversa deixa claro que a configuração de produto atravessa várias áreas.

Foram citados, direta ou indiretamente:

- contabilidade;
- tesouraria;
- financeiro;
- atuária;
- técnicos de seguros;
- operações;
- área comercial;
- negócio.

A pergunta de um participante sugere que decisões contábeis seriam tipicamente definidas por contabilidade ou tesouraria, e o instrutor concorda com a participação dessas áreas.

Entretanto, a resposta destaca que a tela/configuração de ramo reúne decisões que dependem de diversos papéis. O sistema é configurado por ramo, mas as regras não pertencem necessariamente a uma única unidade organizacional.

### Implicação analítica

A definição de um ramo parece funcionar como um ponto de convergência de decisões multidisciplinares:

```text
Comercial
+ Operações
+ Técnica de seguros
+ Atuária
+ Financeiro/Contabilidade
+ Tesouraria
↓
Parametrização do ramo
↓
Comportamento operacional, comercial, financeiro e de risco do produto
```

---

## 17. Integração externa com Platea

## 17.1. Natureza do componente

**Platea** é apresentado como um aplicativo externo ao Rizcore/RicCore.

O instrutor o descreve como uma aplicação capaz de determinar ou estimar o grau de fraude esperado para um risco que está sendo emitido ou analisado.

A transcrição não informa:

- fornecedor;
- tecnologia;
- modelo de integração;
- protocolo;
- algoritmo;
- origem dos dados;
- método de cálculo;
- critérios de explicabilidade;
- requisitos de privacidade ou proteção de dados.

## 17.2. Retorno funcional

O aplicativo retorna uma classificação qualitativa de risco, e não necessariamente um percentual numérico.

As categorias mencionadas são:

- risco muito alto;
- risco alto;
- risco normal;
- risco baixo;
- risco muito baixo;
- ausência de risco, conforme uma formulação usada pelo instrutor.

Há uma pergunta de participante tratando o retorno como percentual de risco. O instrutor esclarece que, na explicação apresentada, o retorno é descrito principalmente por níveis ou categorias de risco.

## 17.3. Uso na emissão

Durante a emissão, depois de registrar informações do risco, o sistema pode enviar essas informações ao Platea.

Com base na resposta, o ramo pode definir ações diferentes.

| Retorno de risco | Ação possível mencionada |
|---|---|
| Muito alto | Bloqueio/rejeição da contratação |
| Alto | Controle técnico de auditoria; apólice fica retida para decisão |
| Normal | Controle informativo ou nenhuma ação |
| Muito baixo | Nenhuma ação |

As ações não são impostas pelo Platea. O Platea retorna uma classificação; o produto parametrizado no sistema decide o que fazer com ela.

## 17.4. Uso em sinistros

A integração também pode existir no módulo de sinistros.

Nesse caso, o uso é descrito como reativo: o risco já foi contratado, mas um sinistro pode apresentar indícios que merecem investigação.

### Exemplo fornecido

O instrutor cita como exemplo real uma declaração de furto das quatro rodas de um veículo sem acionamento de guincho.

A situação é apresentada como suspeita porque a ausência de guincho após a remoção de várias rodas parece incomum. Contudo, o próprio instrutor reconhece que poderia haver explicações alternativas, como o segurado ter contratado guincho por conta própria ou não saber que possuía essa cobertura.

Esse exemplo demonstra que o mecanismo fornece sinais para análise, não uma prova automática de fraude.

## 17.5. Modelo lógico consolidado

A representação abaixo é uma consolidação analítica baseada na explicação, não um diagrama literal exibido na sessão:

```text
Emissão ou sinistro
↓
Coleta de informações do risco/evento
↓
Integração com Platea
↓
Retorno de classificação de risco de fraude
↓
Regra parametrizada no ramo
↓
Sem ação
ou controle informativo
ou retenção para auditoria/autorização
ou rejeição/bloqueio
```

---

## 18. Marcas: mecanismo interno de informação de risco

## 18.1. Conceito

O sistema permite criar “marcas”, entendidas como informações classificatórias associadas a pessoas, riscos, veículos, apólices ou até registros que não pertencem à carteira da companhia.

O instrutor alerta que “marcas” não se refere a marcas comerciais de veículos ou eletrodomésticos. Trata-se de um mecanismo de registro de informação.

## 18.2. Níveis de gravidade

Para cada marca, podem ser definidos níveis.

O exemplo didático fornecido foi uma marca relacionada a alcoolismo, com níveis como:

- alto;
- médio;
- baixo.

O próprio instrutor reforça que o exemplo é inventado e não deve ser tratado como um caso real de uso. Ele também observa que, em determinados contextos, como o espanhol, questões de proteção de dados poderiam tornar certas práticas inviáveis ou problemáticas.

## 18.3. Possíveis associações

Segundo a explicação, uma marca pode ser associada a:

- uma apólice da carteira;
- uma pessoa registrada no sistema;
- um risco contratado;
- uma pessoa ou risco não existentes na carteira da companhia.

Também foram citadas, como exemplos conceituais, marcas relacionadas a fraude ou drogas.

## 18.4. Uso preventivo/proativo

Durante a emissão, o sistema pode consultar marcas associadas ao risco, ao veículo, ao condutor ou a outra entidade relevante.

Se encontrar uma marca, a companhia pode configurar respostas como:

- rejeitar a contratação;
- reter a apólice para auditoria;
- gerar um controle técnico;
- não tomar ação.

Esse uso foi caracterizado como proativo ou preventivo, pois ocorre antes de a companhia assumir o novo risco.

## 18.5. Uso reativo

Após registrar uma marca, a companhia também pode tomar ações em relação a apólices já existentes.

O instrutor menciona, como possibilidade, a anulação de uma apólice. Contudo, a transcrição não detalha:

- em quais condições a anulação é permitida;
- se exige aprovação humana;
- se há processo jurídico ou regulatório;
- se existem limitações contratuais;
- como são tratados direitos do segurado.

Portanto, não é possível concluir que qualquer marca leve automaticamente à anulação de uma apólice.

## 18.6. Vigência histórica da busca

Um parâmetro permite definir quantos anos serão considerados na busca proativa de marcas.

Exemplos citados:

- dois anos;
- três anos;
- cinco anos.

Se a busca proativa estiver ativa, o sistema consulta o histórico dentro do período configurado quando uma nova apólice é emitida.

---

## 19. Comparação entre Platea e marcas

| Aspecto | Platea | Marcas |
|---|---|---|
| Origem da informação | Aplicativo externo | Informação registrada/configurada no sistema |
| Finalidade principal | Avaliação de risco de fraude | Registro e consulta de informações ou sinais de risco |
| Uso na emissão | Sim | Sim |
| Uso em sinistros | Sim, segundo a explicação | A transcrição enfatiza sobretudo o uso preventivo e possíveis ações posteriores |
| Tipo de retorno | Classificação de risco | Existência e nível de marca associado |
| Ação no produto | Configurável por ramo | Configurável por ramo |
| Natureza | Integração externa | Capacidade interna de parametrização e consulta |

Essa tabela é uma reorganização explicativa do conteúdo. A transcrição não apresenta uma comparação formal entre os dois mecanismos.

---

## 20. Integração com serviço externo de seleção de riscos

Outro parâmetro trata de integração com um serviço externo voltado à seleção de riscos.

O instrutor associa esse uso especialmente a:

- seguros de vida;
- seguros de acidentes;
- situações que requerem exames clínicos;
- formulários preenchidos pela pessoa que deseja contratar o seguro.

O serviço é descrito como uma integração com um sistema externo, mas o nome foi reconhecido de forma pouco clara na transcrição. Não é possível confirmar a denominação do sistema nem suas características técnicas.

Também há uma lógica de negócio que define em quais casos o serviço deve ser chamado.

A transcrição não especifica:

- critérios de acionamento;
- tipo de dados enviados;
- resultado retornado;
- responsabilidades de aprovação;
- requisitos de consentimento;
- regras de privacidade;
- impacto em recusa, precificação ou aceitação.

---

## 21. Ramo real e ramo fictício/genérico

A sessão explica o uso de uma informação fictícia para representar uma configuração aplicável a qualquer ramo.

O exemplo é a configuração de comissão por cobertura:

- para automóvel e cobertura de roubo, 15%;
- para automóvel e cobertura de quebra de vidros, 10%;
- para as demais coberturas, um percentual genérico.

Para suportar uma regra genérica, pode ser criado um ramo fictício com chave composta por “todos nove”, marcado como não real.

Quando uma parametrização deve valer para qualquer ramo, utiliza-se essa chave genérica.

### Interpretação do mecanismo

```text
Ramo real específico
↓
Aplica configuração explícita quando existente
↓
Na ausência de regra específica
↓
Pode-se recorrer ao ramo fictício/genérico
↓
Aplica-se a regra transversal
```

A transcrição não detalha a ordem completa de precedência entre regras específicas e genéricas, embora o exemplo sugira que a configuração genérica atende aos casos não especificados diretamente.

---

## 22. Inativação de ramos

Um ramo pode ser inabilitado quando deixa de ser comercializado.

Quando isso ocorre:

- não são permitidas novas apólices daquele ramo;
- não são permitidos novos orçamentos daquele ramo;
- o ramo deixa de aparecer na emissão de novos negócios.

Ao mesmo tempo, o ramo inabilitado continua permitindo operações sobre apólices já vigentes, incluindo:

- renovações;
- suplementos;
- outros movimentos relacionados à carteira existente.

### Relação de causa e efeito

```text
Produto/ramo deixa de ser comercializado
↓
Ramo é inabilitado
↓
Novas vendas e novos orçamentos são bloqueados
↓
Apólices existentes permanecem operáveis
↓
Renovações e suplementos continuam possíveis
```

Essa abordagem permite retirar um produto da oferta sem interromper a administração dos contratos já emitidos.

---

## 23. Perguntas e respostas relevantes

## 23.1. O 29 de fevereiro deve contar como dia de vigência?

### Pergunta

A dúvida é se o sistema considera o 29 de fevereiro nos cálculos de vigência.

### Resposta

A configuração é parametrizável. Uma companhia pode considerar que o movimento em 29 de fevereiro possui um dia de vigência; outra pode considerar zero dias.

### O que esclarece

Não existe uma regra única obrigatória para todos os contextos. O parâmetro resolve divergências de interpretação entre países ou operações.

---

## 23.2. O cálculo continua usando 365 dias?

### Pergunta

Um participante questiona se, mesmo considerando o 29 de fevereiro, o cálculo permanece baseado em 365 dias.

### Resposta

O instrutor confirma que a discussão do 29 de fevereiro é distinta da regra de cálculo de importes baseada em 365 ou 360 dias.

### O que esclarece

A contagem de vigência e a base de cálculo financeiro são tratadas como conceitos diferentes.

---

## 23.3. De onde vem a comissão dos agentes secundários?

### Pergunta

Foi perguntado de quem os agentes secundários recebem sua comissão.

### Resposta

A comissão vem do agente principal.

### O que esclarece

Os agentes secundários não possuem percentual próprio no quadro de comissão, segundo a configuração apresentada.

---

## 23.4. A estrutura comercial pode mudar em suplementos ou renovações?

### Pergunta

Um participante pergunta se a escolha entre estruturas como Buenos Aires e Rosário pode ser modificada em suplementos ou renovações.

### Resposta

A alteração é permitida na renovação, mas não no suplemento.

### O que esclarece

A renovação é tratada como momento adequado para reatribuição comercial. A alteração durante um suplemento pode gerar impactos contábeis difíceis de reconciliar.

---

## 23.5. É possível mudar o padrão de comissão trazido pela configuração?

### Pergunta

Foi questionado se, após a configuração padrão, é possível alterar o que foi trazido automaticamente.

### Resposta

Sim, é possível redistribuir a comissão entre recibos, desde que o total da comissão seja preservado.

### O que esclarece

Há flexibilidade operacional, mas ela é limitada por uma regra de conservação do total financeiro.

---

## 23.6. Platea retorna percentual de fraude e o usuário pode contratar mesmo assim?

### Pergunta

O participante questiona se Platea retorna um percentual de risco e se o usuário ainda poderia prosseguir com a contratação.

### Resposta

O instrutor explica que Platea retorna uma classificação de risco, e que a ação depende da regra configurada no produto. O produto pode bloquear, reter para auditoria, informar ou não agir.

### O que esclarece

Platea não determina sozinho a decisão de emissão. O sistema usa o resultado como entrada para regras de negócio do ramo.

---

## 23.7. A contabilização de apólices futuras é definida por companhia ou por ramo?

### Pergunta

Um participante pergunta se a definição é geral para a companhia ou se pode variar por ramo.

### Resposta

A resposta é que pode variar por ramo. Há ramos que permitem contabilização futura e outros que não.

### O que esclarece

A política contábil pode ser configurada com granularidade por produto/ramo.

---

## 23.8. Quem define esse tipo de configuração?

### Pergunta

Foi perguntado se definições como as de contabilização são normalmente feitas por contabilidade, tesouraria ou negócio.

### Resposta

O instrutor reconhece a participação dessas áreas, mas destaca que a definição de produto envolve muitos papéis diferentes: financeiro, atuária, técnicos de seguro, operações, comercial e outros.

### O que esclarece

A parametrização é tecnicamente centralizada no produto/ramo, mas sua governança é multidisciplinar.

---

## 23.9. Por que uma propriedade aparece como descontinuada?

### Pergunta

Um participante aponta que determinada propriedade aparece como descontinuada e não deveria ser usada.

### Resposta

O instrutor confirma que o comportamento evoluiu: a configuração foi tipificada, substituindo uma propriedade mais simples por uma lógica mais detalhada.

### O que esclarece

A presença de parâmetros visíveis não significa necessariamente que eles estejam ativos ou sejam recomendados para novas configurações.

---

## 24. Limitações e ressalvas reconhecidas

1. **Termos e nomes possivelmente imprecisos:**  
   Alguns nomes foram afetados pela transcrição automática. O nome do sistema aparece como Rizcore/RicCore; o nome de outro sistema externo de seleção de riscos não é suficientemente claro.

2. **Exemplos não devem ser tratados como regras universais:**  
   Diversos cenários — como álcool, drogas, fraude e localidade — foram apresentados apenas como exemplos didáticos.

3. **Proteção de dados:**  
   O instrutor alerta que certos exemplos de marcas poderiam ser inviáveis em determinados contextos por questões de proteção de dados.

4. **Platea não é prova de fraude:**  
   O aplicativo fornece uma classificação de risco. A decisão de bloquear, reter ou liberar depende da configuração do produto.

5. **Marcas não implicam automaticamente anulação:**  
   A possibilidade de anular apólices é mencionada como uma ação possível, mas não são fornecidas regras detalhadas, critérios ou salvaguardas.

6. **Parâmetros obsoletos:**  
   Alguns parâmetros são antigos, não têm mais efeito ou foram substituídos por lógicas tipificadas.

7. **Mecanismos técnicos não detalhados:**  
   Não há detalhes sobre APIs, protocolos, dados trafegados, arquitetura de integração, autenticação, logs, tratamento de falhas ou segurança.

---

## 25. Riscos e desafios

### 25.1. Riscos explicitamente mencionados

| Risco | Contexto |
|---|---|
| Divergência no cálculo de vigência | Tratamento do 29 de fevereiro |
| Inconsistência contábil | Mudança de estrutura comercial ou de agente |
| Contabilização antecipada | Emissão de apólice com vigência futura |
| Fraude potencial | Avaliação via Platea e análise de sinistros |
| Risco associado a marcas | Consulta preventiva ou posterior a registros de risco |
| Uso inadequado de parâmetros antigos | Propriedades obsoletas/descontinuadas |

### 25.2. Desafios derivados do contexto

As observações a seguir são leituras analíticas, não afirmações literais dos participantes:

- A grande quantidade de parâmetros pode aumentar a complexidade de governança e homologação de produtos.
- A participação de muitas áreas na definição de um ramo pode exigir forte coordenação entre negócio, contabilidade, operação e tecnologia.
- A flexibilidade por ramo e por país pode acomodar necessidades locais, mas também pode aumentar a variação de comportamento entre produtos.
- Integrações de risco e fraude exigem critérios claros de decisão para evitar que classificações externas sejam usadas de forma automática ou sem revisão adequada.
- A possibilidade de distribuir comissões manualmente demanda controles, pois altera a alocação temporal de pagamentos mesmo quando preserva o total.

---

## 26. Transformações estruturais identificadas

## 26.1. De regras rígidas para parametrização flexível

A reunião mostra uma evolução de regras antes fixas para comportamentos configuráveis.

Exemplos:

- escolha sobre considerar o 29 de fevereiro;
- seleção da data usada para buscar comissão;
- decisão sobre comissão de carteira;
- política de contabilização de apólices futuras;
- ações diferentes conforme classificação de risco;
- substituição de parâmetros simples por configurações tipificadas.

Essa transformação permite adaptar o sistema a diferentes práticas operacionais sem necessariamente alterar o código central.

## 26.2. De emissão isolada para emissão governada por controles

A emissão não é tratada apenas como criação de uma apólice. Ela pode ser condicionada a:

- dados do risco;
- análise externa de fraude;
- marcas internas;
- controles técnicos;
- auditoria;
- decisão de rejeição;
- estrutura comercial;
- política contábil;
- regras de comissão.

Uma leitura possível é que a emissão funciona como um ponto de orquestração de múltiplas regras de produto e controles corporativos.

## 26.3. De cadastro comercial para gestão integrada de resultado

A associação de agentes e apólices à estrutura comercial não tem apenas finalidade cadastral. Ela sustenta análises de resultado, envolvendo produção, cobrança, pendências, sinistralidade, receitas e despesas.

Isso sugere uma integração conceitual entre:

- distribuição comercial;
- operação de seguros;
- cobrança;
- sinistros;
- contabilidade;
- acompanhamento de desempenho.

## 26.4. De parâmetros históricos para modelos mais expressivos

A sessão registra que alguns parâmetros antigos foram substituídos por configurações mais específicas. A “tipificação” mencionada parece representar uma evolução do modelo de parametrização, oferecendo mais opções do que um simples ativo/inativo.

---

## 27. Números e limites citados

| Indicador ou limite | Valor mencionado | Contexto |
|---|---:|---|
| Base de cálculo de importes | 365 ou 360 dias | Dependente de parâmetro mencionado anteriormente |
| Agentes principais por apólice | 1 | Figura com percentual próprio |
| Agentes secundários | Até 3 | Comissão vinculada ao agente principal |
| Organizador | 1 | Figura adicional de comissão |
| Assessor | 1 | Figura adicional de comissão |
| Total de figuras de agente | Até 6 | Principal, secundários, organizador e assessor |
| Exemplo de cobertura de roubo | 15% | Exemplo didático de comissão |
| Exemplo de cobertura de vidros | 10% | Exemplo didático de comissão |
| Exemplo de recibos | 12 | Exemplo de distribuição de comissão |
| Comissão no primeiro recibo | 100% | Exemplo possível de distribuição |
| Anos de busca de marcas | 2, 3 ou 5 | Exemplos de período configurável |
| Fechamento antecipado de dezembro | Dia 20 | Exemplo operacional para avançar o período contábil |

Esses números foram declarados durante a sessão e não constituem, por si só, especificação contratual, regulatória ou técnica auditada.

---

## 28. O que a reunião não permite concluir

A transcrição não fornece detalhes suficientes para determinar:

- tecnologia utilizada pelo Rizcore/RicCore;
- arquitetura de deployment;
- banco de dados;
- modelo de integração com Platea;
- uso de APIs, eventos, filas, arquivos ou mensageria;
- autenticação e autorização nas integrações;
- modelo de IAM;
- requisitos de LGPD/GDPR ou outras normas de proteção de dados;
- criptografia de dados em trânsito ou em repouso;
- modelo de auditoria de decisões de fraude;
- critérios exatos de classificação do Platea;
- responsáveis formais por aprovações;
- processo de exceção para bloqueios de emissão;
- processo de contestação ou revisão de uma marca;
- SLA de integrações externas;
- disponibilidade, contingência ou retentativa de chamadas externas;
- tratamento de falha do Platea durante a emissão;
- regras completas de precedência entre comissões por ramo, cobertura e regra genérica;
- fórmula exata de cálculo de comissão;
- plano contábil, tipos de lançamentos e contas envolvidas;
- regras de reserva detalhadas;
- critérios jurídicos para cancelamento de apólices com base em marcas;
- modelo de versionamento e promoção de configurações entre ambientes;
- controles de segregação de funções para alteração de parâmetros;
- países específicos que usam cada comportamento.

---

## 29. Conclusões principais

1. A definição de um ramo é uma configuração extensa que determina como o produto se comporta em emissão, comissão, contabilidade, distribuição comercial, risco e manutenção de carteira.

2. O sistema busca acomodar diferenças operacionais entre companhias e países por meio de parâmetros, evitando uma regra única para situações como o tratamento do 29 de fevereiro, comissão de carteira e contabilização futura.

3. Comissões são configuráveis por ramo e cobertura, podem distinguir nova produção de carteira e podem ser distribuídas entre recibos, preservando o total calculado.

4. A estrutura comercial é relevante não apenas para gestão de agentes, mas também para análise de resultados e consistência contábil.

5. O fechamento mensal é sustentado por uma data contábil central, que permite separar a operação do calendário e organizar a contabilização por períodos controlados.

6. Apólices com efeito futuro exigem atenção contábil. O sistema pode registrar a contabilização no período atual ou futuro, conforme a configuração do ramo.

7. Platea e o mecanismo de marcas são instrumentos de apoio à gestão de risco. Ambos podem orientar ações preventivas e controles técnicos, mas a decisão final depende da lógica configurada no produto.

8. Parâmetros antigos podem permanecer visíveis, mas alguns foram descontinuados ou substituídos por regras mais flexíveis. A configuração atual precisa ser interpretada à luz dessa evolução.

9. A governança de produto é multidisciplinar: a configuração técnica do ramo consolida decisões de áreas comerciais, operacionais, técnicas, atuariais, financeiras e contábeis.

10. A sessão não fornece detalhes de arquitetura técnica, segurança, integração ou governança operacional suficientes para produzir uma especificação de implementação. Ela é mais forte como documentação funcional e de regras de negócio do que como documento técnico de infraestrutura.
