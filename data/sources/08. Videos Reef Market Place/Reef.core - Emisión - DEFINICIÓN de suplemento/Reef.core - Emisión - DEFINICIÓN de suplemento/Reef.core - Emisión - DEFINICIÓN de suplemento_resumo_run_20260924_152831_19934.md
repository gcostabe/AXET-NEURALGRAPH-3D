# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.core - Emisión - DEFINICIÓN de suplemento.mp4`
**Data de processamento:** 24/09/2026 15:33:36
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Análise estruturada — Definição de suplementos no MAPFRE Reef.core

## 1. Síntese executiva

A sessão foi um treinamento funcional sobre a **definição de suplementos** no módulo de **emissão** do Reef.core, acessado por meio da documentação disponível no MAPFRE Marketplace. O foco não foi a execução operacional detalhada de cada movimento, mas a configuração que deve existir antes que um suplemento possa ser utilizado no processo de emissão.

No contexto apresentado, um suplemento é qualquer modificação registrada em uma apólice. O **tipo de suplemento** determina o fluxo de negócio que será percorrido no Reef.core; por essa razão, embora seja possível definir suplementos, criar um novo tipo de suplemento exige desenvolvimento de um novo fluxo. A reunião distinguiu os suplementos que precisam de definição dos que aparecem apenas como resultado de outros movimentos.

A apresentação detalhou como um suplemento é identificado, associado a um tipo, disponibilizado para apólices ou aplicações, parametrizado para tratar atributos, cláusulas, anexos, recibos, vigência, tarifação, inspeção, anulação, reabilitação, troca de agente e operações específicas de Vida e *Unit Linked*.

A mensagem central é que o Reef.core oferece uma camada de configuração para governar o comportamento dos movimentos de uma apólice, mas parte dessa configuração vem pré-definida pelo núcleo da solução. Assim, nem toda necessidade local pode ser resolvida autonomamente por cada país: determinadas alterações dependem de habilitação, adaptação de fluxo ou decisão do núcleo.

---

## 2. Escopo, fontes e ressalvas de interpretação

Esta análise foi construída exclusivamente a partir de:

- transcrição automática da fala da sessão;
- evidências visuais extraídas de telas e slides;
- documentação exibida no MAPFRE Marketplace durante a apresentação.

Há trechos da transcrição com reconhecimento de voz impreciso. Alguns nomes e termos parecem ter sofrido deformação, especialmente:

- “RIPH Academy”, provavelmente relacionado ao portal ou ambiente de capacitação do Reef, mas sem confirmação suficiente para normalização;
- “Rilcore”, “Rift core” e “rifcore”, interpretados no contexto como referências ao **Reef.core** exibido nas telas;
- “Nitron”, “Neutron”, “Tron-Web” e “neutral”, termos preservados como aparecem na fala quando não há segurança suficiente sobre sua denominação oficial;
- “Uni-Lin”, interpretado contextualmente como **Unit Linked**, pois a explicação trata de fundos de investimento, unidades de participação e componente de seguro de vida.

Os horários indicados nas evidências visuais são usados como rastreabilidade dos conceitos exibidos. A transcrição não contém timestamps por fala; portanto, o vínculo entre conteúdo oral e tela é contextual, não necessariamente literal.

---

## 3. Contexto e antecedentes

### 3.1 Contexto documental

A sessão começou com o compartilhamento de um portal de documentação e capacitação. Nas telas, a estrutura de navegação do Reef apresentava áreas como:

- Capacitación funcional Reef;
- Capacitación técnica Reef;
- Modelo operativo Reef;
- Sesiones Reef.

O ambiente visualmente identificado como **MAPFRE Marketplace** também apresentava menus para:

- Soluciones;
- Arquitecturas;
- APIs;
- Eventos;
- Componentes;
- Cloud;
- Documentación;
- Zeus;
- Reef.

Isso demonstra que o conteúdo de Reef.core é disponibilizado dentro de um ecossistema documental e de catálogo mais amplo, embora a reunião não detalhe como esse marketplace é governado, quem pode publicar ativos ou como funciona seu ciclo de aprovação.

### 3.2 Organização da documentação por ramo de negócio

A documentação de emissão é organizada por tipo de negócio ou ramo. A tela de definição de conceitos de emissão registra que os elementos precisam ser definidos em uma determinada ordem para permitir operações em um módulo funcional.

Foram exibidos ícones referentes a diferentes ramos, incluindo automóvel, vida, transporte, saúde e hogar. Contudo, a apresentadora explicou que determinadas definições do módulo de emissão não são exclusivas de um ramo: embora tenha navegado pela seção de automóveis, a definição de suplementos tratada era apresentada como aplicável, em termos gerais, aos ramos configurados.

**Referência visual:** definição de conceitos de emissão e tipos de negócio — Frame 04, `15:15`; definição do ramo automóvel — Frame 06, `22:50`.

### 3.3 Situação da documentação

A apresentadora reconheceu explicitamente que a documentação ainda estava em construção. Informou que:

- o conteúdo que seria explicado estava documentado;
- faltavam alguns exemplos;
- alguns detalhes de suplementos ainda precisavam ser completados;
- havia links ou referências incorretas em partes do material exibido.

Essa ressalva é relevante: a sessão transmitiu conhecimento funcional útil, mas não deve ser tomada como evidência de que toda a documentação associada já esteja completa, revisada ou livre de inconsistências.

---

## 4. Conceito fundamental: o que é um suplemento

Um suplemento é qualquer modificação realizada em uma apólice e registrada como tal. A emissão inicial também é tratada como um tipo de suplemento, embora, segundo a explicação, não exija uma definição específica no mesmo sentido dos suplementos configuráveis.

A estrutura apresentada separa dois níveis:

1. **Tipo de suplemento**  
   Define o fluxo funcional que será executado no Reef.core.

2. **Definição de suplemento**  
   Configura como determinado suplemento daquele tipo deve se comportar no processo de emissão.

Essa separação é central para entender a solução. Não basta criar uma configuração para obter um novo comportamento funcional de alto nível: se for necessário um novo tipo de suplemento, será preciso desenvolver um novo fluxo.

### Relação de causa e efeito apresentada

```text
Necessidade de uma modificação na apólice
↓
Escolha de um tipo de suplemento
↓
Execução do fluxo correspondente no Reef.core
↓
Aplicação das propriedades definidas para aquele suplemento
↓
Registro do resultado na apólice, podendo haver tipo de saída diferente
```

---

## 5. Tipos de suplemento: entrada, saída e necessidade de definição

### 5.1 Suplementos de entrada

Os suplementos de entrada são os movimentos selecionados para iniciar um fluxo de emissão ou alteração. Eles precisam ter comportamento definido no processo.

Segundo a sessão, os tipos são pré-estabelecidos porque correspondem a fluxos internos do Reef.core. Criar um novo tipo não é apenas inserir um cadastro: demanda desenvolvimento.

### 5.2 Suplementos de saída

Alguns suplementos entram no fluxo com um tipo e são gravados na apólice com outro tipo, denominado na explicação como suplemento de saída.

Esses suplementos de saída não precisam de definição própria, pois representam o resultado do processo executado. O tipo de saída depende do efeito econômico ou funcional produzido pelo suplemento de entrada.

### 5.3 Exemplo: suplemento indeterminado

O suplemento indeterminado foi usado como principal exemplo. Ele permite modificar grande parte das informações da apólice, com exceções específicas. Após sua execução, pode resultar em diferentes suplementos registrados:

| Resultado do movimento | Tipo de saída citado | Interpretação apresentada |
|---|---|---|
| Não há movimento econômico | SM | Modificação sem geração de recibo |
| Há alteração econômica com cobrança, ou movimentações que se compensam economicamente em zero | AD | Modificação adicional; mesmo um resultado líquido zero pode ser classificado assim se houve movimentação econômica |
| Há movimento econômico negativo | AP | Movimento negativo |

A nomenclatura exata de “SM”, “AD” e “AP” não foi expandida de forma consistente na transcrição. A descrição acima preserva o sentido explicado, sem atribuir significados não confirmados às siglas.

---

## 6. Tipos de suplementos mencionados

A documentação visual exibida contém uma tabela de tipos de suplementos e suas descrições. A apresentação oral percorreu vários deles. Nem todos receberam o mesmo nível de detalhamento.

| Código | Tipo exibido | Finalidade descrita |
|---|---|---|
| RF | Renovación | Gera uma nova vigência para a apólice |
| AT | Anulación | Deixa a apólice sem efeito |
| ER | Extinción del riesgo | Encerra um risco sem devolução econômica |
| RE | Rehabilitación | Restabelece uma apólice anteriormente anulada |
| CV | Cambio forma pago | Modifica plano, meio ou gestor de cobrança, conforme documentação visual |
| CA | Cambio de agente | Altera as chaves de agente e recalcula comissões para os novos agentes, conforme documentação |
| MV | Extensión vigencia | Posterga o vencimento da apólice |
| LT | Liquidación de transportes | Ajusta informações econômicas em apólices com declarações e prêmio em depósito |
| DS | Disminución por siniestro | Reduz a soma segurada após sinistro, quando a cobertura possui essa característica |
| RC | Restitución de capital | Restabelece ou eleva novamente a soma segurada após redução por sinistro |
| AN | Anticipo | Permite antecipar parte do capital ao cliente |
| CN | Recobro de anticipo | Anula ou recupera um anticipo |
| RS | Rescate | Resgate total, conforme explicação oral |
| RP | Rescate parcial | Resgate parcial |
| RD | Reducción | Altera o tipo de seguro, passando de pagamento de prêmios estipulados para prêmio único |
| RR | Rehabilitar póliza reducida | Desfaz uma redução |
| AE | Aportaciones extraordinarias | Permite aporte econômico pontual |
| PG | Seguro prorrogado | Reduz ou anula o capital segurado de vida |
| IN | Indeterminado | Permite modificar informações da apólice, exceto campos e operações reservados a tipos específicos |
| AS | Anulación de suplementos | Desfaz o último suplemento vigente automaticamente |
| AX | Anulación de suplemento temporal | Desfaz o último suplemento temporal automaticamente |
| SA | Suplemento en la anualidad anterior | Permite atuar na situação anterior à última renovação por meio de suplemento temporal |
| RG | Regularización | Atua sobre a situação anterior à renovação e permite estabelecer valor a cobrar ou devolver |

**Referências visuais:** tabelas de tipos de suplemento — Frames 05 (`19:02`), 07 (`26:37`) e 08 (`30:25`).

### 6.1 Liquidação de transportes

Embora o nome contenha “transportes”, foi explicado que o suplemento não é mais necessariamente exclusivo desse ramo. A lógica está associada a apólices que possuem declarações e podem ter:

- valor inicialmente cobrado na apólice;
- valores gerados posteriormente em declarações;
- necessidade de comparar o que foi pago inicialmente com o valor resultante das declarações;
- necessidade de cobrar ou devolver a diferença.

A expressão “de transportes” teria permanecido como um resquício de uso anterior, quando o recurso era aplicado apenas a esse tipo de apólice.

### 6.2 Diminuição por sinistro e restituição de capital

A diminuição por sinistro reduz a soma segurada após uma ocorrência. O exemplo dado foi o de um bem segurado parcialmente roubado: a soma segurada precisa refletir a redução do capital coberto.

A restituição de capital permite recuperar a situação anterior — ou até ultrapassá-la — depois de uma redução de soma segurada decorrente de sinistro.

### 6.3 Resgates, redução e suplementos de Vida

Vários tipos foram descritos como aplicáveis a Vida:

- **anticipo:** antecipação de capital ao cliente;
- **recobro de anticipo:** reversão ou anulação do anticipo;
- **rescate:** resgate total; a apólice fica anulada;
- **rescate parcial:** pagamento de apenas parte do capital;
- **reducción:** alteração do tipo de seguro para uma modalidade de prêmio único;
- **rehabilitar póliza reducida:** operação oposta à redução;
- **aportaciones extraordinarias:** aporte econômico pontual;
- **seguro prorrogado:** redução ou anulação de capital segurado de Vida.

---

## 7. Identificação e estrutura básica de um suplemento

Cada suplemento é identificado por duas chaves:

- **Suplemento**;
- **Extensão**.

A explicação indica que as duas chaves juntas identificam a definição. A chave de suplemento pode, por convenção, indicar o ramo ou ser genérica, como `999`. A extensão costuma ser um consecutivo ou outro número definido para completar a identificação.

Cada combinação de suplemento e extensão está vinculada a um único tipo de suplemento.

### Exemplo explicado

A apresentadora mencionou, de forma ilustrativa:

- suplemento `999` com extensão `10`;
- tipo indeterminado;
- uso como suplemento geral capaz de modificar informações da apólice.

Também explicou que é possível haver vários suplementos com extensões distintas para o mesmo tipo, mas uma determinada combinação de suplemento e extensão não pode estar associada simultaneamente a tipos diferentes.

### Nome funcional do suplemento

O nome é configurável e deve apoiar a operação. A recomendação implícita foi que o nome permita ao emissor identificar corretamente qual suplemento escolher.

Exemplo citado:

- anulações calculadas por pró-rata;
- anulações calculadas por escala.

Nesse caso, o nome deveria tornar a diferença visível para quem opera a emissão.

---

## 8. Âmbito de utilização: apólice, aplicação ou ambos

O suplemento pode ser definido para uso em:

- **apólices**;
- **aplicações**;
- **ambos**.

“Aplicações” foram explicadas como declarações realizadas, por exemplo, em apólices com declarações mensais.

A regra demonstrada é que a disponibilidade do suplemento varia conforme o objeto que está sendo alterado:

| Tipo de suplemento configurado | Alteração em apólice | Alteração em aplicação |
|---|---:|---:|
| Exclusivo de apólice | Permitido | Não permitido |
| Exclusivo de aplicação | Não permitido | Permitido |
| Aplicável aos dois | Permitido | Permitido |

Essa configuração serve para impedir que um movimento seja oferecido em um contexto operacional incompatível.

---

## 9. Propriedades de configuração do suplemento

A maior parte da reunião foi dedicada às propriedades que governam o comportamento do suplemento. Elas representam a camada configurável que atua sobre o fluxo associado ao tipo de suplemento.

### 9.1 Habilitado ou inabilitado

Quando um suplemento é marcado como inabilitado, deixa de aparecer na lista de suplementos disponíveis para modificar apólices. A sessão não detalha se isso preserva o histórico nem como se comporta para movimentos já iniciados.

### 9.2 Modificação de atributos

Alguns fluxos, por natureza, não solicitam atributos ou dados variáveis. A propriedade permite indicar que, mesmo nesses casos, o suplemento deve passar pela tela ou etapa de atributos.

Foram citados como tipos que normalmente não pedem atributos:

- anulação;
- reabilitação;
- extinção de risco;
- liquidação;
- mudança de plano de pagamento;
- mudança de agente.

A propriedade altera essa regra padrão.

### 9.3 Cláusulas e textos anexos

A possibilidade de tratar cláusulas e anexos depende de duas camadas:

```text
Ramo permite cláusulas ou textos anexos?
↓
Se sim, o suplemento permite que eles sejam tratados?
↓
Se permitido, a operação poderá acessar e alterar esses elementos
```

Mesmo que o ramo permita cláusulas, um suplemento específico pode bloquear seu tratamento. O mesmo raciocínio se aplica a textos anexos.

### 9.4 Observações obrigatórias

Ao final de um suplemento, podem ser registradas observações em texto livre para indicar motivo ou contexto da alteração. A configuração determina se esse preenchimento será:

- opcional;
- obrigatório.

### 9.5 Suplemento público

A sessão distinguiu dois números:

- número consecutivo do suplemento;
- número público do suplemento.

O número de suplemento é sempre incrementado a cada modificação registrada. Já o número público é associado aos movimentos que precisam ser comunicados ao cliente.

O exemplo apresentado foi a mudança interna de agente depois que um agente se aposenta e sua carteira é transferida. Nesse cenário:

- a companhia registra o movimento;
- o número interno do suplemento avança;
- o cliente não precisa receber essa alteração;
- o número público não avança, evitando lacunas na sequência de suplementos comunicados ao cliente.

Essa propriedade separa a rastreabilidade interna da comunicação externa ao segurado.

---

## 10. Gestão de recibos

### 10.1 Geração de novos recibos

Na emissão, os recibos são gerados conforme o plano de pagamento. Em suplementos, o sistema pode:

- reutilizar recibos emitidos, ainda pendentes e mantidos pela companhia;
- gerar novos recibos, mesmo quando haveria recibos potencialmente reutilizáveis.

A propriedade “gerar novos recibos” força a segunda opção.

### 10.2 Condições de reutilização

Para que um recibo possa ser reutilizado, a explicação indicou, entre outras condições:

- o recibo precisa estar sob posse da companhia, e não do cliente;
- o recibo deve estar pendente;
- o período do novo movimento deve coincidir com o período do recibo existente.

### 10.3 Exemplo de quatro parcelas

Foi apresentado o caso de uma apólice com plano de pagamento de quatro parcelas:

- recibo 1: já cobrado;
- recibo 2: remetido, em posse do cliente;
- recibos 3 e 4: emitidos e pendentes, ainda disponíveis na companhia.

No suplemento que permite reutilização:

- se o período não coincide, um novo recibo é criado;
- se o recibo está com o cliente, ele não é reutilizado;
- se há coincidência de datas e o recibo está pendente, a nova parcela é incorporada ao recibo existente.

No exemplo, as parcelas correspondentes aos recibos 3 e 4 seriam agregadas a eles. Isso significa que o valor a cobrar em cada recibo incluiria tanto o valor anterior quanto o valor decorrente da modificação.

No suplemento configurado para sempre gerar novos recibos, seriam emitidos recibos novos, numerados sequencialmente após os existentes, sem tentativa de reaproveitamento.

### 10.4 Validação do plano de pagamento

Foi explicado que existiam “formas de pagamento” antigas, consideradas mais rígidas, e que os planos de pagamento seriam uma abordagem mais flexível. Segundo a fala, as formas antigas deixaram de ser suportadas pelo Reef.core, e a configuração atual deve operar com planos de pagamento.

A reunião não detalha a diferença técnica completa entre forma de pagamento e plano de pagamento, nem informa quando a descontinuidade ocorreu.

---

## 11. Tarifação, lógica de negócio e inspeção

### 11.1 Tarifação de todos os riscos

Normalmente, ao modificar uma apólice, o sistema recalcula apenas os riscos ou informações afetadas pela alteração. Contudo, um suplemento pode ser configurado para sempre tarifar todos os riscos, mesmo que a mudança não exija isso naturalmente.

A apresentadora explicou que essa decisão pode ser sustentada por uma **lógica de negócio** implementada como procedimento.

Quando questionada se se tratava de uma configuração simples de sim/não ou de programa personalizado, respondeu que era um “PL”. A sigla não foi expandida de forma confiável pela transcrição. O ponto confirmado é que há uma lógica programável ou procedimental para validar condições e decidir se todos os riscos precisam ser tarifados.

Essa propriedade só faz sentido para apólices com mais de um risco.

### 11.2 Inspeção de risco

Em algumas contratações ou alterações, o risco precisa passar por inspeção. Para suplementos, a configuração pode exigir que:

- o risco seja inspecionado novamente;
- a apólice fique retida até a inspeção ser concluída.

Também foi mencionado que uma lógica de negócio pode condicionar esse comportamento, isto é, determinar em quais circunstâncias a reinspeção será necessária.

---

## 12. Vigência, renovação e suplementos temporais

### 12.1 Renovação com vigência padrão

Na vigência padrão, a nova anualidade começa quando a anterior termina. O efeito da renovação coincide com o vencimento da vigência anterior.

### 12.2 Renovação com descontinuidade

A renovação com descontinuidade permite deslocar a data de efeito para um momento posterior ao vencimento da vigência anterior.

Isso pode criar um intervalo sem cobertura:

```text
Fim da vigência anterior
↓
Período sem apólice vigente
↓
Início posterior da nova vigência
```

A apresentadora destacou que a data posterior é permitida, mas não uma data anterior ao vencimento anterior.

Foi também informado que essa capacidade ainda não estava disponível em “Nitron” no momento da sessão, mas estava sendo habilitada. Como a denominação do sistema não está completamente clara na transcrição, esse registro deve ser tratado com cautela.

### 12.3 Extensão de vigência

A extensão de vigência é diferente da renovação. Ela permite modificar o vencimento da vigência atual, ampliando-a, sem necessariamente realizar uma nova renovação.

### 12.4 Suplementos temporais

Um suplemento pode ter efeito até o final da vigência ou apenas durante um intervalo específico.

O exemplo dado foi uma fábrica que, durante o período de Natal, armazena mais produtos do que habitualmente. Nesse período, seria possível elevar temporariamente a soma segurada e, depois, retornar à situação original.

Para isso, o suplemento usado na alteração deve estar definido como temporal.

---

## 13. Cálculos proporcionais, escala e anulação

### 13.1 Pró-rata e escala

A sessão apresentou dois modos de cálculo temporal:

- **pró-rata:** valor proporcional ao tempo;
- **escala:** valor calculado segundo coeficientes previamente definidos por quantidade de dias.

No caso de escala, a companhia pode definir uma tabela com percentuais relacionados a períodos específicos.

### 13.2 Tipos de anulação calculada por escala

Foram apresentados três modos:

1. direto sobre o percentual de anulação;
2. proporcional sobre o percentual de constituição;
3. proporcional sobre o percentual de anulação.

Também foi mencionada a possibilidade de uma lógica de negócio devolver diretamente o coeficiente de anulação a ser usado.

### 13.3 Exemplo conceitual apresentado

A tabela exemplificada tinha, entre outros valores:

| Dias | Percentual de constituição | Percentual de anulação |
|---:|---:|---:|
| 15 | 10 | 90 |
| 30 | 20 | 80 |

No método direto sobre o percentual de anulação, o sistema busca diretamente o coeficiente correspondente à quantidade de dias.

Nos métodos proporcionais, o percentual recuperado é comparado ao percentual de constituição do movimento anterior, como a emissão original. A sessão buscou demonstrar que o cálculo não necessariamente acompanha a proporção simples do tempo transcorrido; a escala pode produzir percentuais distintos da proporcionalidade linear.

A transcrição contém trechos hesitantes nessa explicação. Portanto, a regra matemática completa não pode ser reconstruída com segurança apenas a partir desta sessão.

---

## 14. Numeração de apólice

A configuração pode permitir alteração do número da apólice na emissão ou na renovação.

A motivação descrita foi a necessidade, em determinados contextos — inclusive por exigência legal, segundo a fala — de manter sequências de numeração específicas e sem saltos.

O comportamento envolve:

- um procedimento personalizado para devolver o número que será registrado;
- a possibilidade de mudar a numeração em renovações;
- preservação da relação entre a apólice anterior e a apólice renovada, mesmo quando o número muda.

A configuração simples indica se o suplemento pode mudar o número. A lógica de negócio define em quais condições isso ocorrerá.

A reunião não detalha como esse relacionamento é armazenado, em qual entidade está a rastreabilidade nem quais são os mecanismos de controle para evitar conflitos de numeração.

---

## 15. Anulação de apólice e devolução de valores

Na anulação, conceitos de detalhamento de prêmio podem ou não ser devolvidos, conforme sua definição. A sessão citou os “direitos de emissão” como exemplo.

### Cenários exemplificados

| Cenário | Tratamento explicado |
|---|---|
| Cliente decide cancelar a apólice | Os direitos de emissão podem não ser devolvidos |
| Apólice foi emitida com erro e precisa ser anulada para reemissão | Os direitos de emissão podem ser devolvidos |

A regra apresentada aplica-se a anulações “a início”, isto é, quando a data de efeito da anulação coincide com a data de efeito da apólice.

Se a propriedade estiver ativa, o processo pergunta se devem ser devolvidos todos os valores. Caso a resposta seja positiva, a definição individual dos conceitos deixa de prevalecer. Caso a resposta seja negativa, os conceitos configurados para não devolução permanecem sem devolução.

---

## 16. Reabilitação de apólice

Foram apresentadas quatro modalidades de reabilitação.

| Modalidade | Comportamento descrito |
|---|---|
| Padrão | Desfaz a anulação e recupera a situação anterior, mantendo efeito e vencimento |
| Com extensão de vigência | Permite deslocar a data de efeito e amplia o vencimento pelo mesmo intervalo |
| Sem extensão de vigência | Permite deslocar a data de efeito, mas mantém o vencimento original, reduzindo a vigência útil |
| “Rewrite” | Reabilitação especial semelhante a reemitir a apólice, preservando sua numeração |

### 16.1 Reabilitação padrão

A apólice anulada volta à situação anterior. Nessa modalidade, o suplemento de anulação é efetivamente desfeito.

### 16.2 Reabilitação com extensão de vigência

Se a reabilitação ocorre, por exemplo, um mês após a anulação, esse mês é acrescentado ao vencimento. A vigência é deslocada para compensar o período decorrido.

### 16.3 Reabilitação sem extensão

A data de efeito pode ser posterior, mas o vencimento original é mantido. Assim, a apólice volta a vigorar por um período menor do que teria originalmente.

### 16.4 “Rewrite”

O termo foi pronunciado como “Rigbright” ou equivalente pela transcrição; o contexto aponta para *rewrite*, mas essa correção não é plenamente confirmada.

O comportamento explicado foi:

- manter o número da apólice;
- reconstituir suas informações;
- permitir modificar praticamente tudo;
- não permitir alterar moeda e tomador, segundo a explicação.

A apresentadora descreveu a modalidade como parecida com anular uma apólice e substituí-la por outra, mas sem trocar sua numeração.

---

## 17. Mudança de agente e estrutura comercial

### 17.1 Condição sobre recibos pendentes

Em regra, a mudança de agente deveria ocorrer quando o recibo está emitido, pendente e ainda sob posse da companhia. Uma propriedade pode flexibilizar essa exigência e permitir a mudança em outro momento.

Quando ocorre a troca de agente, a explicação indica que os recibos associados são anulados e reemitidos com o novo agente, respeitando as condições e datas aplicáveis.

### 17.2 Validação da estrutura comercial

Na configuração padrão, os agentes envolvidos devem pertencer à mesma estrutura comercial. A justificativa apresentada foi evitar desequilíbrios contábeis.

Existe uma propriedade para permitir a troca entre estruturas comerciais distintas. Quando ativada, a mudança pode ocorrer mesmo com potencial descasamento contábil, cabendo à companhia tratar o ajuste posteriormente.

### 17.3 Anulação da mudança de agente

Normalmente, uma mudança de agente não é anulada diretamente. Para reverter a situação, deve-se realizar outra mudança de agente, retornando ao agente anterior.

A justificativa é operacional: como os recibos são anulados e reemitidos, uma anulação convencional tornaria o processo mais complexo.

Foi apresentada uma exceção para mudanças de agente realizadas ao final da vigência. Nessa condição, o movimento pode ser gerado como SM e pode ser anulado, pois não envolve a mesma problemática de anulação e reemissão de recibos.

---

## 18. Anulação de suplementos temporais

Em regra, a anulação de suplementos segue uma sequência: anula-se o último suplemento vigente antes de chegar a suplementos anteriores.

Para suplementos temporais, existe uma configuração que permite selecionar qual suplemento temporal será anulado. Sem ela, se houver três suplementos temporais e for necessário anular o primeiro, será preciso anular os posteriores antes.

Essa propriedade não foi apresentada como aplicável a suplementos não temporais.

---

## 19. Operações de Vida e Unit Linked

### 19.1 Resgates com tratamento por sinistros

A apresentadora explicou que o resgate pode ser tratado:

- pela emissão, com geração de recibos para devolver ou pagar valores ao cliente;
- por sinistros, dependendo da implementação.

No caso referido para *Unit Linked*, a operação era feita por sinistros. O suplemento registrava o valor a ser resgatado e o módulo de sinistros abria um sinistro para realizar a liquidação.

Para o resgate total, como a apólice fica anulada, é necessário que a configuração permita abrir sinistro em apólice anulada. Sem essa marca, o módulo de sinistros não conseguiria processar a liquidação.

### 19.2 Cálculo para valores garantidos

Foi mencionada uma propriedade para calcular a parte que precisa estar garantida pela companhia. A sessão não detalha a fórmula, o modelo atuarial, os dados de entrada ou os eventos que disparam o cálculo.

### 19.3 Suplementos específicos de gestão de fundos

Foi explicado que, para o ramo *Unit Linked*, determinadas necessidades foram atendidas aproveitando fluxos padrão do núcleo em vez de criar novos fluxos no sistema mencionado como Neutron.

A configuração altera o comportamento de suplementos padrão para executar finalidades específicas de *Unit Linked*.

Os cenários descritos foram:

| Operação | Finalidade apresentada |
|---|---|
| Atribuição de unidades de participação | Calcula quanto o valor pago equivale em unidades do fundo de investimento |
| Resgate parcial de fundo | Calcula o valor a devolver conforme unidades e valor do fundo |
| Mudança de fundo | Transfere a escolha de investimento de um fundo para outro |
| Aporte pactuado | Gera suplemento periódico conforme valor e periodicidade acordados na emissão |
| Aporte extraordinário | Permite investimento adicional não previsto no plano regular |
| Mudança de aporte pactuado | Altera valor, periodicidade ou forma de aporte acordada |
| Suspensão do plano de aportes | Interrompe aportes periódicos |
| Regularização de Vida | Calcula o componente de cobertura de vida associado ao produto |
| Resgate total | Resgata todo o valor investido e anula a apólice |

### 19.4 Componente de cobertura de Vida

No cenário descrito, o produto *Unit Linked* possui cobertura de vida. A apresentadora informou que o custo dessa cobertura era calculado mensalmente e, no desenho originalmente explicado, descontado do valor investido no fundo.

Ela acrescentou uma ressalva: acredita que, no Peru, esse uso foi alterado para cobrança ao cliente. Como a própria fala foi incerta — “me parece”, “creo” — isso não deve ser tratado como regra geral nem como confirmação de implementação.

---

## 20. Governança de configuração: núcleo versus país

Uma das discussões mais relevantes ocorreu quando um participante perguntou sobre a possibilidade de configurar uma mudança de agente e comparou Reef com sistemas ou versões mencionados como “Neutron” e “Tron-Web”.

A resposta esclareceu que:

- anteriormente, cada país realizava esse tipo de definição à sua maneira;
- no Reef, há uma parte de configuração que vem pré-definida pelo núcleo;
- essa parte comum não é livremente modificável por cada país;
- se uma capacidade precisar ser habilitada, pode ser necessário solicitar análise e decisão sobre sua criação ou disponibilização.

### Leitura analítica

Uma interpretação sustentada pela discussão é que o Reef busca reduzir a autonomia irrestrita de customização local em favor de uma base comum governada centralmente. Isso pode favorecer padronização e reutilização, mas também introduz dependência de decisões do núcleo para necessidades que, em soluções anteriores, poderiam ser configuradas localmente.

A reunião não detalha:

- quem compõe esse núcleo;
- qual é o processo formal de solicitação de mudanças;
- prazos de atendimento;
- critérios de priorização;
- mecanismo de versionamento ou compatibilidade por país.

---

## 21. Perguntas e respostas relevantes

### 21.1 Disponibilidade de movimentos na anualidade anterior

**Pergunta**  
Um participante perguntou se os movimentos para atuar na anualidade anterior estavam disponíveis em todas as versões ou apenas em versões mais recentes.

**Resposta**  
A apresentadora respondeu que, em teoria, esses tipos existem há bastante tempo. Porém, esclareceu que, no sistema mencionado como Neutron, houve uma modificação que envolveu fluxos. Os suplementos utilizados foram sendo adaptados, mas alguns que não foram solicitados ou usados podem não ter sido adaptados.

Ela se comprometeu a verificar especificamente o caso mencionado.

**O que isso esclarece**  
A existência do tipo de suplemento não garante que ele possa ser executado em todas as instalações ou versões. É necessário considerar:

- disponibilidade do tipo;
- existência de definição de suplemento associada;
- adaptação do fluxo;
- uso e priorização histórica daquele suplemento.

### 21.2 Tarifação de todos os riscos: parâmetro ou desenvolvimento?

**Pergunta**  
Foi perguntado se a lógica para tarifar todos os riscos seria uma configuração de sim/não ou envolveria programação personalizada.

**Resposta**  
A apresentadora respondeu que se trata de um “PL”, indicando uma lógica procedimental ou programável.

**O que isso esclarece**  
A configuração funcional não elimina a necessidade de extensibilidade por lógica de negócio. Algumas decisões dependem de condições que não cabem em uma flag simples.

### 21.3 Mudança de agente: possibilidade de customização local

**Pergunta**  
O participante buscou confirmar se o comportamento da mudança de agente poderia ser configurado no núcleo ou se era algo fixo.

**Resposta**  
Foi explicado que o Reef possui uma parcela de configuração predefinida pelo núcleo, diferentemente de modelos anteriores em que cada país definia mais livremente suas próprias regras. Para novas necessidades, seria preciso avaliar e solicitar habilitação ou criação da capacidade.

**O que isso esclarece**  
Há limites de autonomia local. A configuração existe, mas é delimitada pela arquitetura e governança central do produto.

### 21.4 Resgates tratados por sinistros

**Pergunta**  
Foi perguntado como os suplementos de resgate se aplicavam e se normalmente eram processados por sinistros.

**Resposta**  
A resposta foi que podem ser processados por emissão ou por sinistros, dependendo da solução. No caso de *Unit Linked* mencionado, eram tratados por sinistros: o suplemento registrava o valor e o módulo de sinistros realizava a liquidação.

**O que isso esclarece**  
O suplemento não representa necessariamente a liquidação financeira completa. Em certos modelos, ele registra ou inicia o contexto necessário para que outro módulo conclua o processo.

---

## 22. Limitações e pontos reconhecidos durante a sessão

### 22.1 Documentação incompleta

A documentação ainda possuía exemplos e detalhes pendentes. A apresentadora declarou que completaria o material posteriormente.

### 22.2 Links ou referências incorretas

Ao abordar propriedades relacionadas a pró-rata, foram mencionados links incorretos na documentação. Isso limita o uso autônomo do material exibido para entendimento detalhado dos cálculos.

### 22.3 Fluxos possivelmente não adaptados

Mesmo quando um tipo de suplemento existe, alguns fluxos podem não ter sido adaptados em determinada solução, especialmente se não foram solicitados ou utilizados com frequência.

### 22.4 Funcionalidade em habilitação

A renovação com descontinuidade foi mencionada como não disponível no sistema citado como “Nitron” no momento da sessão, embora estivesse sendo habilitada.

### 22.5 Limites do suplemento indeterminado

Apesar de sua flexibilidade, o suplemento indeterminado não permite tudo. Foram citadas limitações como:

- não renovar a apólice;
- não mudar plano de pagamento;
- não alterar ramo;
- não alterar moeda;
- não alterar determinadas chaves de agente;
- não alterar distribuição de cosseguro, conforme a documentação visual.

### 22.6 Limites para mudança de agente

A mudança de agente tem condicionantes sobre recibos, estrutura comercial e reversão. A anulação direta normalmente não é suportada.

### 22.7 Limites de anulação de suplementos temporais

Sem a configuração apropriada, a anulação precisa respeitar a ordem inversa de criação dos suplementos temporais.

---

## 23. Riscos e desafios

### 23.1 Riscos explicitamente mencionados

| Risco ou impacto | Contexto |
|---|---|
| Descadramento contábil | Mudança de agente entre estruturas comerciais diferentes |
| Período sem cobertura | Renovação com descontinuidade de vigência |
| Comunicação confusa ao cliente | Suplementos internos sem uso de numeração pública poderiam gerar saltos aparentes na sequência documental |
| Liquidação impossível por sinistro | Resgate total anula a apólice; sem permissão específica, sinistros não consegue abrir o caso |
| Fluxo indisponível apesar de tipo existente | Suplementos não adaptados em determinada versão ou instalação |
| Aplicação de cálculo inadequado | Uso incorreto de pró-rata, escala ou coeficientes de anulação |

### 23.2 Desafios derivados do contexto

As observações abaixo são interpretações analíticas, e não afirmações literais da sessão.

- A combinação de tipos, propriedades, lógicas de negócio e regras por ramo sugere uma configuração funcional complexa, com risco de inconsistências se a governança documental e de mudanças não for rigorosa.
- A coexistência de comportamentos predefinidos pelo núcleo e necessidades específicas de países pode gerar uma fila de demandas de evolução e exigir critérios transparentes de priorização.
- A dependência entre emissão, cobrança, estrutura comercial, sinistros e fundos indica que alterações aparentemente locais podem ter efeitos financeiros, contábeis e operacionais mais amplos.
- A documentação em evolução pode dificultar onboarding e operação segura se não houver mecanismos claros para indicar versão, completude e aplicabilidade por país.

---

## 24. Modelo lógico consolidado de funcionamento

O diagrama abaixo é uma consolidação analítica baseada na explicação. Não foi apresentado literalmente como arquitetura visual na reunião.

```text
Operador de emissão
↓
Seleciona suplemento disponível
↓
Identificação do suplemento
(suplemento + extensão + tipo)
↓
Aplicação das propriedades de configuração
- âmbito: apólice, aplicação ou ambos
- atributos
- cláusulas e anexos
- observações
- público ou interno
- recibos
- vigência
- tarifação
- inspeção
- regras de anulação/reabilitação
↓
Fluxo do tipo de suplemento no Reef.core
↓
Lógicas de negócio ou procedimentos, quando configurados
↓
Efeitos na apólice
- alteração de dados
- cálculo de prêmio
- emissão, reutilização ou anulação de recibos
- renovação, extensão, anulação ou reabilitação
- mudança de agente
- criação de suplemento de saída
↓
Integrações funcionais citadas
- cobrança/recibos
- sinistros
- fundos de investimento, no caso de Unit Linked
- estrutura comercial e contabilidade
```

---

## 25. Mudanças de paradigma identificadas

### 25.1 De configuração local para configuração governada pelo núcleo

A fala comparou um cenário anterior, no qual países configuravam suas definições de forma mais autônoma, com o Reef, que possui uma parte comum pré-definida pelo núcleo.

Isso indica uma direção de maior padronização e controle central, ainda que a reunião não detalhe o modelo organizacional que suporta essa governança.

### 25.2 De movimento isolado para fluxo com efeitos transversais

Um suplemento não é apenas uma alteração de dado na apólice. Pode afetar:

- tarifação;
- cobertura;
- vigência;
- documentos;
- recibos;
- agente e comissão;
- contabilidade;
- sinistros;
- saldo de fundos de investimento.

A reunião evidencia que a definição funcional precisa considerar esses efeitos antes de disponibilizar um tipo de movimento ao emissor.

### 25.3 De cadastro estático para comportamento condicionado

Diversas propriedades não são tratadas apenas como valores fixos. Há lógicas de negócio para decidir, por condições:

- se todos os riscos devem ser tarifados;
- se haverá inspeção;
- se o número da apólice será alterado;
- qual coeficiente de anulação será utilizado.

Isso indica um modelo híbrido: configuração declarativa combinada com extensões procedimentais.

---

## 26. Números e indicadores citados

A sessão não apresentou indicadores organizacionais, financeiros ou de roadmap quantitativos. Os números mencionados foram principalmente exemplos funcionais.

| Item | Valor mencionado | Contexto |
|---|---:|---|
| Exemplo de suplemento genérico | `999` | Chave de suplemento usada como exemplo |
| Exemplo de extensão | `10` | Extensão associada ao suplemento genérico |
| Parcelas no exemplo de cobrança | 4 | Plano de pagamento usado para explicar reutilização de recibos |
| Percentual de constituição | 10 e 20 | Exemplo de tabela de escala |
| Percentual de anulação | 90 e 80 | Exemplo de tabela de escala |
| Períodos exemplificados | 15 e 30 dias | Exemplo de cálculo por escala |
| Modalidades de reabilitação | 4 | Padrão, com extensão, sem extensão e “rewrite” |

Esses valores são exemplos didáticos apresentados na sessão e não devem ser interpretados como regras universais de negócio.

---

## 27. O que a reunião não permite concluir

A sessão não fornece detalhamento suficiente para concluir com segurança:

- a arquitetura técnica do Reef.core;
- linguagens, frameworks ou bancos de dados utilizados;
- modelo de implantação, cloud ou infraestrutura;
- padrões concretos de API, eventos ou mensageria;
- modelo de autenticação, autorização ou IAM;
- políticas de segurança, auditoria e segregação de funções;
- modelo de versionamento de configurações;
- processo formal de promoção entre ambientes;
- CI/CD, testes automatizados ou validação de regras;
- mecanismos de observabilidade, monitoramento ou rastreabilidade técnica;
- SLA, suporte, operação de incidentes ou processo de hotfix;
- estrutura formal de governança do núcleo;
- países efetivamente habilitados para cada suplemento;
- versões em que cada fluxo está disponível;
- modelo contábil completo associado à troca de agente;
- fórmulas detalhadas de cálculo de prêmio, escala, pró-rata, resgate ou fundos;
- comportamento técnico do módulo de sinistros;
- definição oficial das siglas SM, AD, AP e PL;
- denominação oficial dos sistemas transcritos como Neutron, Nitron e Tron-Web.

---

## 28. Conclusões

A reunião apresentou a definição de suplementos como uma etapa fundacional para operar alterações de apólices no Reef.core. Antes de executar movimentos de emissão, renovação, anulação, reabilitação, mudança de agente ou operações de Vida, é necessário configurar qual suplemento será usado, em qual âmbito, sob quais regras e com quais efeitos sobre recibos, vigência, atributos, tarifação e inspeção.

O tipo de suplemento é o elemento que define o fluxo. Por isso, a solução permite configurar comportamentos de tipos existentes, mas não criar livremente novos fluxos sem desenvolvimento. Essa distinção é essencial para separar necessidades resolvíveis por definição funcional de necessidades que exigem evolução do produto.

A sessão também demonstrou que a configuração de emissão tem efeitos além do próprio módulo: ela alcança cobrança, comunicação com o cliente, estrutura comercial, contabilidade, sinistros e, em produtos *Unit Linked*, gestão de fundos e cálculo de unidades de participação.

Por fim, a apresentação reforça um modelo de produto com componentes comuns fornecidos pelo núcleo e espaço controlado para configuração local. Esse direcionamento pode favorecer consistência entre implantações, mas exige clareza de governança, documentação atualizada e validação cuidadosa de disponibilidade por versão, país e fluxo.
