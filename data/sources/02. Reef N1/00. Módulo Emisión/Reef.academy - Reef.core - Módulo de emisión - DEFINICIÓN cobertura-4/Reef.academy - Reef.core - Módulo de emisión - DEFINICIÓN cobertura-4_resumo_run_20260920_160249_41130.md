# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.academy - Reef.core - Módulo de emisión - DEFINICIÓN cobertura-4.mp4`
**Data de processamento:** 20/09/2026 16:04:54
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise Estruturada — Configuração de Coberturas em Suplementos/Endossos

## 1. Síntese executiva

A reunião foi um treinamento funcional sobre a definição de regras de comportamento de uma **cobertura de seguro** quando uma apólice passa por um **suplemento/endosso**. O foco não foi criar ou incluir uma nova cobertura, mas determinar como uma cobertura já contratada deve reagir a alterações posteriores na apólice.

O ponto central apresentado é que o sistema diferencia alterações que **afetam a tarifação** das que **não afetam a tarifação**. A partir dessa classificação, a configuração da cobertura precisa prever o que ocorre em três situações relativas à soma assegurada: aumento, redução ou manutenção do valor.

A combinação dos dois eixos — impacto na tarifação e variação da soma assegurada — produz seis cenários possíveis. Para cada cenário, a configuração pode definir ações como aplicar a tarifa vigente, preservar a tarifa original, usar uma regra mista ou delegar o cálculo a uma lógica de negócio customizada, denominada na transcrição como “objeto” ou “lógica”.

Ao final, foram apresentados mecanismos de validação da cobertura e da prima. Essas validações são executadas depois que o usuário deixa de editar a cobertura na tela de contratação e podem impedir a emissão caso a regra de negócio conclua que a configuração está inválida.

---

## 2. Contexto e objetivo do treinamento

O treinamento continua a explicação da definição de uma cobertura dentro de um sistema cujo nome aparece na transcrição como **“Riftcore”**. Esse nome deve ser tratado com cautela, pois pode ter sido afetado por reconhecimento automático de voz; a transcrição não permite confirmar a grafia oficial do produto.

A explicação parte de um cenário de seguros no qual uma apólice já emitida pode ser alterada por meio de suplementos ou endossos. Nesses movimentos, o sistema precisa decidir:

- se deve recalcular a prima;
- qual tabela ou tarifa deve ser aplicada;
- como tratar mudanças na soma assegurada;
- quando manter condições históricas;
- quando usar uma lógica de negócio específica;
- quando validar se a cobertura e sua prima continuam corretas.

A mensagem principal é que a cobertura não possui um único comportamento fixo em suplementos. Seu comportamento é configurável conforme a natureza da alteração realizada.

---

## 3. Conceitos fundamentais apresentados

### 3.1 Cobertura

A cobertura é o elemento da apólice para o qual são definidos valores como soma assegurada, franquia, acessórios, ocorrências, critérios de tarifação e validações.

A reunião não detalha a estrutura de dados completa da cobertura, nem a tecnologia usada para implementá-la. Contudo, deixa claro que ela possui propriedades configuráveis que orientam seu cálculo e sua validação ao longo do ciclo de vida da apólice.

### 3.2 Suplemento ou endosso

Os termos “suplemento” e “endosso” são usados no treinamento para representar uma alteração posterior à emissão da apólice.

Exemplos apresentados incluem:

- alteração de um atributo da apólice;
- mudança de placa de veículo;
- correção de endereço;
- troca de credor hipotecário;
- alteração de percentual de desconto;
- mudança de franquia;
- inclusão ou alteração de acessórios;
- alteração de ocorrências;
- aumento ou redução da soma assegurada;
- inclusão ou exclusão de cobertura.

### 3.3 Tarifação e recalculação

A tarifação é apresentada como o processo que determina a prima da cobertura. A necessidade de recalcular não significa, necessariamente, que o valor final da prima será diferente.

A lógica apresentada é:

```text
Alteração em elemento configurado como relevante para cálculo
↓
Sistema identifica que houve mudança com impacto tarifário
↓
Sistema entende que precisa recalcular
↓
O novo cálculo pode ou não produzir uma prima diferente
```

A reunião ressalta que pode ocorrer uma alteração considerada relevante para cálculo sem alteração efetiva no custo final. Ainda assim, o sistema precisa reconhecer a necessidade de avaliar novamente a tarifação.

---

## 4. Critério para identificar alterações que afetam a tarifa

A classificação de uma alteração depende da configuração prévia dos elementos da apólice e da cobertura.

Um atributo pode ser definido como:

- afetando o cálculo/tarifação;
- não afetando o cálculo/tarifação.

Quando um atributo marcado como relevante para o cálculo tem seu valor alterado durante um suplemento, o sistema entende que houve uma mudança que afeta a tarifa.

A transcrição indica que o sistema reconhece a necessidade de recalcular quando ocorre alteração em pelo menos um dos seguintes elementos:

| Elemento alterado | Condição indicada |
|---|---|
| Atributo de nível de apólice | Deve estar definido como afetando o cálculo |
| Atributo de nível de risco | Deve estar definido como afetando o cálculo |
| Franquia | A cobertura deve possuir franquia e seu conteúdo deve variar |
| Acessório | Deve ser criado ou modificado |
| Ocorrência | Seu conteúdo deve variar |
| Inclusão de cobertura | A cobertura incluída deve ser calculada |
| Exclusão de cobertura | O treinamento menciona a retirada de uma cobertura da apólice |

A reunião não detalha como o sistema persiste essa configuração, nem informa se a detecção é realizada por comparação de versões, eventos, regras declarativas ou outro mecanismo técnico.

---

## 5. Alterações que não afetam a tarifa

Uma alteração pode ocorrer na apólice sem que seja considerada relevante para a tarifação, desde que o elemento modificado tenha sido configurado como não impactante para o cálculo.

Os exemplos apresentados foram:

- mudança da placa de um veículo;
- correção do número de uma rua em um endereço;
- alteração do credor hipotecário de um bem financiado, por exemplo, de um banco para outro.

No exemplo da placa, o treinamento deixa claro que a placa pode ser considerada um atributo que não afeta a tarifa. Assim, mesmo havendo uma alteração no suplemento, o sistema a classifica como uma mudança sem impacto tarifário.

Isso não significa que nenhuma outra regra poderá ser aplicada. A soma assegurada ainda pode ser alterada, e essa alteração exige que a cobertura execute o comportamento configurado para aquele cenário.

---

## 6. Modelo decisório: seis cenários de comportamento

A configuração da cobertura considera dois fatores:

1. houve ou não alteração que afeta a tarifa;
2. a soma assegurada aumentou, diminuiu ou foi mantida.

A combinação forma seis cenários:

| Impacto tarifário | Variação da soma assegurada | Cenário |
|---|---|---|
| Não há mudança que afete a tarifa | Aumento | 1 |
| Não há mudança que afete a tarifa | Redução | 2 |
| Não há mudança que afete a tarifa | Manutenção | 3 |
| Há mudança que afete a tarifa | Aumento | 4 |
| Há mudança que afete a tarifa | Redução | 5 |
| Há mudança que afete a tarifa | Manutenção | 6 |

### Representação lógica consolidada

```text
Suplemento / Endosso
│
├── Há alteração que afeta a tarifação?
│   │
│   ├── Não
│   │   ├── Soma assegurada aumentou
│   │   ├── Soma assegurada diminuiu
│   │   └── Soma assegurada foi mantida
│   │
│   └── Sim
│       ├── Soma assegurada aumentou
│       ├── Soma assegurada diminuiu
│       └── Soma assegurada foi mantida
│
└── Aplicar a ação configurada para o cenário identificado
```

Esse diagrama é uma consolidação analítica do conteúdo explicado no treinamento; não há indicação de que tenha sido apresentado visualmente dessa forma.

---

## 7. Ações disponíveis para o cálculo da cobertura

A reunião apresenta quatro possibilidades principais de comportamento.

| Ação | Descrição |
|---|---|
| Tarifa atual | Recalcula a cobertura usando a tarifa vigente no momento do suplemento |
| Tarifa original | Usa a tarifa existente quando a apólice ou cobertura foi originalmente emitida |
| Tarifa mista | Mantém a tarifa original sobre a parcela histórica da soma assegurada e aplica a tarifa atual sobre o incremento |
| Objeto/lógica | Executa uma lógica de negócio que define como a prima será calculada |

A transcrição afirma que as opções padronizadas — tarifa atual, tarifa original e tarifa mista — são “fechadas” e, em princípio, não podem ser alteradas. A formulação exata sugere que se trata de comportamentos fornecidos pelo sistema, não de regras livremente editáveis pelos usuários.

A opção chamada “objeto” representa uma lógica de negócio capaz de definir o cálculo em tempo de execução. A reunião não informa:

- a linguagem de programação dessa lógica;
- como ela é cadastrada;
- quem pode criá-la ou alterá-la;
- quais dados ela recebe;
- quais validações técnicas existem;
- como seu resultado é auditado.

---

## 8. Cenário 1 — Sem alteração tarifária e com aumento da soma assegurada

### 8.1 Situação

Neste cenário, o suplemento altera apenas elementos que não afetam a tarifa, mas a soma assegurada da cobertura é aumentada.

Exemplo apresentado:

```text
Alteração da placa do veículo
+
Soma assegurada da cobertura aumenta de 10.000 para 15.000
```

Mesmo que a alteração de placa não influencie a tarifação, há alteração da soma assegurada. Portanto, a cobertura precisa aplicar uma regra de cálculo para o novo valor.

### 8.2 Ações possíveis

| Ação | Funcionamento apresentado |
|---|---|
| Tarifa atual | Aplica a tarifa vigente sobre a nova soma assegurada |
| Tarifa original | Aplica a tarifa de emissão da apólice sobre a nova soma assegurada |
| Tarifa mista | Mantém a tarifa original sobre o capital anterior e aplica a tarifa atual somente sobre o incremento |
| Objeto/lógica | A lógica customizada decide o cálculo da prima |

### 8.3 Exemplo de tarifa atual

O treinamento usa um exemplo no qual:

- a apólice foi emitida com taxa de **1 por mil**;
- três meses depois, a taxa vigente passou a ser **1,5 por mil**;
- a soma assegurada aumenta de **10.000 para 15.000**.

Com a opção de tarifa atual, a nova soma assegurada de 15.000 receberia a taxa vigente de 1,5 por mil.

### 8.4 Exemplo de tarifa original

No mesmo contexto, a opção de tarifa original preservaria a taxa de 1 por mil, aplicada quando a apólice foi emitida, mesmo que a taxa atual seja de 1,5 por mil.

### 8.5 Exemplo de tarifa mista

A tarifa mista é explicada como uma separação entre a parcela original e a parcela acrescida.

```text
Soma original: 10.000
Soma após suplemento: 15.000
Incremento: 5.000

10.000 → tarifa original
5.000  → tarifa vigente
```

O racional apresentado é preservar a condição econômica aplicada ao capital que já estava contratado e aplicar a tarifa atual somente sobre o novo montante incluído.

### 8.6 Exemplo numérico adicional apresentado

A reunião também traz um exemplo com valores diferentes:

| Item | Valor |
|---|---:|
| Cobertura inicial | 100.000 |
| Tarifa original | 1% |
| Prima inicial | 1.000 |
| Nova soma assegurada | 150.000 |
| Incremento | 50.000 |

A explicação informa que a tarifa mista mantém a taxa de 1% sobre os 100.000 originais e aplica a nova tarifa sobre os 50.000 adicionais.

O resultado informado para a prima após o suplemento é **1.250**. A transcrição afirma que houve redução relevante da nova taxa, mas não registra de forma suficientemente clara o percentual da tarifa aplicada sobre o incremento. Portanto, não é possível reconstruir integralmente a fórmula numérica apenas a partir do conteúdo fornecido.

---

## 9. Cenário 2 — Sem alteração tarifária e com redução da soma assegurada

### 9.1 Situação

Ocorre uma mudança que não impacta a tarifação, acompanhada de redução da soma assegurada.

Exemplo apresentado:

```text
Alteração da placa do veículo
+
Redução da soma assegurada de 10.000 para 8.000
```

### 9.2 Ações disponíveis

| Ação | Situação |
|---|---|
| Tarifa atual | Aplica a taxa vigente à nova soma assegurada |
| Tarifa original | Mantém a taxa originalmente aplicada |
| Objeto/lógica | Delega o cálculo a uma lógica específica |

A tarifa mista não é disponibilizada para esse cenário. A justificativa apresentada é que ela não faria sentido quando o capital é reduzido.

A reunião não detalha como o sistema determina qual parcela do capital histórico foi reduzida, nem como trata situações em que a cobertura foi alterada em múltiplos suplementos anteriores.

---

## 10. Cenário 3 — Sem alteração tarifária e com manutenção da soma assegurada

### 10.1 Situação

A alteração ocorre em um elemento que não afeta a tarifa, mas a soma assegurada da cobertura não é modificada.

Exemplo:

```text
Alteração da placa do veículo
+
Cobertura permanece com a mesma soma assegurada
```

### 10.2 Ações disponíveis

| Ação | Comportamento explicado |
|---|---|
| Tarifa original | Mantém as condições originais; não haveria cobrança adicional nem devolução apenas por esse cenário |
| Objeto/lógica | Permite comportamento específico definido por lógica de negócio |

O instrutor descreve a tarifa original como o comportamento “lógico” nesse caso. Como não houve mudança tarifária e o capital permaneceu igual, não haveria motivo para variar a prima.

Ainda assim, a opção de lógica customizada pode ser usada. O treinamento menciona que isso ocorre em alguns casos, especialmente quando as tarifas não estão bem definidas. Essa afirmação sugere uma exceção operacional, mas não especifica os critérios de governança, aprovação ou controle para esse uso.

---

## 11. Cenário 4 — Alteração tarifária e aumento da soma assegurada

### 11.1 Situação

Neste caso, houve alteração em algo configurado como impactante para a tarifa, e a soma assegurada também foi aumentada.

O exemplo principal usa um atributo que representa um percentual de desconto:

```text
Percentual de desconto é alterado
+
Soma assegurada aumenta de 10.000 para 15.000
```

O percentual de desconto deve ser definido como atributo que afeta o cálculo, pois sua alteração pode modificar diretamente a prima.

### 11.2 Ações disponíveis

| Ação | Funcionamento |
|---|---|
| Tarifa atual | Recalcula a cobertura com as condições vigentes após a alteração |
| Objeto/lógica | Delega o cálculo a uma lógica de negócio customizada |

A tarifa original e a tarifa mista não são apresentadas como opções para esse cenário.

A interpretação funcional é que, se houve alteração em um parâmetro tarifário — como um desconto — e também houve aumento de capital, a configuração tende a recalcular usando a condição atual. Essa é uma leitura baseada na explicação do instrutor, não uma regra geral aplicável fora do sistema discutido.

---

## 12. Cenário 5 — Alteração tarifária e redução da soma assegurada

### 12.1 Situação

Ocorre alteração em um elemento relevante para tarifação e, ao mesmo tempo, há redução da soma assegurada.

Exemplo informado:

```text
Desconto passa de 0% para 5%
+
Soma assegurada é reduzida de 10.000 para 8.000
```

### 12.2 Ações disponíveis

| Ação | Funcionamento indicado |
|---|---|
| Tarifa atual | Tarifa a nova soma assegurada usando as condições vigentes |
| Objeto/lógica | Executa uma lógica de negócio específica |

O treinamento menciona que, em tese, a redução de 2.000 poderia gerar devolução proporcional, calculada segundo a tarifa atual. No entanto, não são apresentadas regras completas sobre vigência, pro rata, estornos, impostos, datas de efeito ou tratamento financeiro da devolução.

---

## 13. Cenário 6 — Alteração tarifária e manutenção da soma assegurada

### 13.1 Situação

Há alteração em um elemento que afeta a tarifa, mas a soma assegurada é mantida.

Exemplo implícito no treinamento:

```text
Alteração de percentual de desconto
+
Soma assegurada permanece inalterada
```

### 13.2 Ações disponíveis

A transcrição indica como opções:

- tarifa atual;
- lógica de negócio customizada.

Há uma correção verbal durante a explicação: o instrutor afirma ter se equivocado em um rótulo e esclarece que estava tratando do caso de manutenção da soma assegurada.

---

## 14. Resumo consolidado das opções por cenário

| Alteração afeta a tarifa? | Soma assegurada | Opções apresentadas |
|---|---|---|
| Não | Aumenta | Tarifa atual, tarifa original, tarifa mista, objeto/lógica |
| Não | Diminui | Tarifa atual, tarifa original, objeto/lógica |
| Não | Mantém | Tarifa original, objeto/lógica |
| Sim | Aumenta | Tarifa atual, objeto/lógica |
| Sim | Diminui | Tarifa atual, objeto/lógica |
| Sim | Mantém | Tarifa atual, objeto/lógica |

Essa tabela consolida a explicação oral. Alguns trechos têm pequenas imprecisões e autocorreções, mas a estrutura geral apresentada sustenta essa classificação.

---

## 15. Relação entre tarifação pura e componente comercial

O instrutor comenta que a lógica discutida estaria afetando a “tarifa pura”, entendida como a componente não influenciada pela parte comercial.

Entretanto, em seguida é feita uma ressalva: isso depende de como o ramo foi definido. A transcrição não traz detalhamento suficiente para determinar:

- o que compõe a tarifa pura;
- como a parte comercial é modelada;
- quais descontos, carregamentos ou componentes são considerados comerciais;
- como a separação entre tarifa técnica e comercial é feita no sistema;
- se o percentual de desconto do exemplo pertence formalmente a uma dessas camadas.

Portanto, é possível afirmar apenas que a reunião reconhece uma distinção conceitual entre tarifação pura e influência comercial, condicionada à configuração do ramo.

---

## 16. Lógica customizada (“objeto”)

### 16.1 Finalidade

O “objeto” é apresentado como uma alternativa para definir uma lógica de negócio livre, executada em tempo de execução, para determinar como a prima da cobertura será calculada.

A lógica pode decidir “qualquer coisa” dentro de sua responsabilidade de cálculo, segundo a explicação do instrutor.

### 16.2 Papel na configuração

A lógica customizada aparece como alternativa em praticamente todos os grupos de cenários. Ela permite tratar situações que não são suficientemente atendidas pelas ações padronizadas de tarifa atual, original ou mista.

### 16.3 Limitações de informação

A reunião não permite concluir:

- se “objeto” é uma classe, script, regra, serviço ou artefato configurável;
- se há versionamento da lógica;
- como a lógica é testada;
- se ela pode acessar dados externos;
- se há trilha de auditoria sobre sua execução;
- qual é seu comportamento em caso de erro;
- se existe aprovação técnica ou de negócio antes de publicação.

---

## 17. Propriedades de validação da cobertura

Após concluir as regras de comportamento tarifário, o treinamento apresenta propriedades de validação.

A validação acontece quando o usuário deixa de editar a cobertura na tela de contratação — descrito como o momento em que “se perde o foco” da cobertura.

A lógica de validação pode verificar, entre outros aspectos:

- se a soma assegurada é correta;
- se a franquia selecionada é válida;
- se a cobertura deveria ou não ser contratada;
- se há incompatibilidade entre coberturas;
- se duas coberturas mutuamente excludentes foram selecionadas.

### Fluxo de validação apresentado

```text
Usuário edita a cobertura
↓
Usuário deixa o campo ou a cobertura deixa de estar em foco
↓
Sistema executa lógica de validação
↓
Lógica retorna aprovação ou reprovação
↓
Se houver reprovação, o sistema apresenta erro
↓
Usuário responsável pela emissão deve corrigir a situação
```

A transcrição registra a resposta da lógica como algo semelhante a “ok ou cao”; a segunda expressão provavelmente sofreu erro de reconhecimento de voz. O sentido contextual é claro: a lógica informa se a cobertura está correta ou incorreta.

---

## 18. Validação de cobertura versus validação de prima

O treinamento diferencia dois grupos de validação.

### 18.1 Validação da cobertura

Está orientada à validade das condições da cobertura, incluindo:

- soma assegurada;
- franquia;
- necessidade ou proibição de contratação;
- compatibilidade entre coberturas;
- regras de exclusão mútua.

### 18.2 Validação da prima

É apresentada como uma validação específica para confirmar se a prima está correta.

O instrutor observa que, em princípio, não deveria haver muitos problemas nesse ponto, pois a tarifação normalmente é automática. Contudo, existem ramos nos quais pode haver prêmio manual.

A reunião cita, como exemplo de riscos mais complexos, fábricas e situações em que a tarifação é realizada apólice a apólice.

A transcrição não informa:

- como a prima manual é inserida;
- quem pode aprová-la;
- quais regras evitam inconsistências;
- se existe dupla validação;
- se há limite de alçada;
- como a validação se relaciona com o cálculo automático.

---

## 19. Modelo funcional consolidado

A seguir está uma reconstrução funcional do comportamento descrito.

```text
Configuração do ramo / produto
│
├── Atributos definidos como afetando ou não afetando cálculo
├── Coberturas com soma assegurada, franquias e demais propriedades
├── Acessórios e ocorrências associados quando aplicável
└── Regras de ação por cenário de suplemento
    │
    ├── Sem mudança tarifária
    │   ├── Aumento de soma assegurada
    │   ├── Redução de soma assegurada
    │   └── Manutenção de soma assegurada
    │
    └── Com mudança tarifária
        ├── Aumento de soma assegurada
        ├── Redução de soma assegurada
        └── Manutenção de soma assegurada

Suplemento / Endosso
│
├── Sistema identifica os elementos alterados
├── Classifica se a alteração afeta a tarifa
├── Compara soma assegurada anterior e posterior
├── Identifica um dos seis cenários
├── Executa a ação configurada
│   ├── Tarifa atual
│   ├── Tarifa original
│   ├── Tarifa mista, quando disponível
│   └── Lógica customizada
│
└── Executa validações de cobertura e/ou prima
    ├── Aprovado → processo pode seguir
    └── Reprovado → usuário deve corrigir a informação
```

Esse modelo é uma explicação consolidada a partir da reunião, não um desenho técnico literal fornecido pelos participantes.

---

## 20. Relações de causa e efeito identificadas

### 20.1 Alteração relevante para cálculo

```text
Atributo, franquia, acessório ou ocorrência é modificado
+
Elemento está configurado como relevante para cálculo
↓
Sistema identifica impacto tarifário
↓
Sistema precisa recalcular ou aplicar a ação configurada
```

### 20.2 Alteração não relevante para cálculo com variação de capital

```text
Informação administrativa é modificada
↓
Não há impacto tarifário por essa alteração
↓
Soma assegurada é modificada
↓
Sistema aplica a regra configurada para aumento ou redução de capital
```

### 20.3 Alteração de parâmetros tarifários

```text
Percentual de desconto ou outro atributo tarifário é alterado
↓
Condição de cálculo da cobertura muda
↓
Sistema classifica a alteração como tarifária
↓
Tarifa atual ou lógica customizada é aplicada, conforme configuração
```

### 20.4 Validação após edição

```text
Usuário conclui a edição da cobertura
↓
Lógica de validação é executada
↓
Cobertura ou prima é aprovada/rejeitada
↓
Em caso de rejeição, a informação deve ser corrigida
```

---

## 21. Perguntas e respostas relevantes

A reunião possui poucas perguntas formais; grande parte da interação ocorre por solicitações frequentes do instrutor para confirmar entendimento.

### Pergunta recorrente: “Está entendido?”

O instrutor pede confirmação diversas vezes após explicar:

- a diferença entre alterações que afetam ou não a tarifa;
- os critérios que forçam recálculo;
- a classificação nos seis cenários;
- as opções de tarifa atual, original e mista;
- as validações de cobertura e prima.

### Resposta dos participantes

Os participantes respondem, de forma breve, que sim.

### O que isso esclarece

As confirmações não acrescentam novos requisitos, mas evidenciam que o encontro tinha natureza didática. O instrutor estava construindo gradualmente o modelo mental necessário para configurar o comportamento das coberturas.

---

### Pergunta: há dúvidas sobre validação de prima?

Ao final da explicação sobre validações, o instrutor pergunta se há alguma dúvida.

### Resposta

Os participantes respondem negativamente.

### O que isso esclarece

A reunião é encerrada após essa confirmação, indicando que o escopo do treinamento foi considerado concluído: definição de comportamento tarifário em suplementos e propriedades de validação de cobertura.

---

## 22. Limitações e ressalvas explicitamente reconhecidas

| Limitação ou ressalva | Contexto |
|---|---|
| O recálculo pode ser necessário mesmo sem alteração final de custo | O sistema precisa identificar que um elemento tarifário mudou |
| A tarifa mista não se aplica à redução de soma assegurada | O instrutor afirma que não faria sentido nesse cenário |
| A lógica customizada pode ser usada quando as tarifas não estão bem definidas | Comentário do instrutor sobre casos observados |
| A tarifação manual existe em alguns ramos | Citados riscos complexos, como fábricas |
| A separação entre tarifa pura e parte comercial depende da definição do ramo | Não há regra universal apresentada |
| Algumas expressões e nomes podem estar imprecisos | A transcrição aparenta conter erros de reconhecimento de voz |
| Não há detalhamento técnico de implementação | A reunião é funcional/configuracional, não uma especificação técnica de arquitetura |

---

## 23. Riscos e desafios

### 23.1 Riscos explicitamente mencionados

A reunião não apresenta uma seção formal de riscos, mas os seguintes pontos são reconhecidos de forma direta ou contextual:

- tarifas mal definidas podem levar ao uso de lógica customizada mesmo em casos aparentemente simples;
- ramos de alta complexidade podem exigir tarifação manual;
- alterações em atributos tarifários precisam ser corretamente marcadas como relevantes para cálculo;
- coberturas incompatíveis precisam ser identificadas por validações;
- a ausência de validação adequada pode permitir configurações incorretas de soma assegurada, franquia ou combinação de coberturas.

### 23.2 Desafios derivados do contexto

As observações abaixo são interpretações analíticas sustentadas pelo conteúdo, não declarações literais dos participantes.

- **Governança da configuração:** como a classificação “afeta cálculo” determina se haverá recálculo, erros de parametrização podem gerar prêmios indevidos ou impedir recalculações necessárias.
- **Manutenção de regras customizadas:** o uso do “objeto” amplia flexibilidade, mas pode aumentar a complexidade de testes, auditoria, rastreabilidade e suporte.
- **Consistência histórica:** a aplicação de tarifa original e tarifa mista exige preservar informações históricas confiáveis sobre condições de emissão e alterações posteriores.
- **Complexidade combinatória:** embora o treinamento apresente seis cenários principais, a combinação entre atributos, franquias, acessórios, ocorrências, descontos e regras específicas pode ampliar significativamente o esforço de configuração e teste.
- **Experiência operacional:** validações executadas após a edição da cobertura podem ser importantes para prevenir erros, mas precisam produzir mensagens compreensíveis para quem emite a apólice.

---

## 24. Mudanças de paradigma observáveis

A reunião não apresenta uma iniciativa de transformação organizacional ampla, mas permite identificar uma direção funcional relevante.

### 24.1 De cálculo fixo para comportamento configurável

Uma leitura possível é que o sistema busca evitar uma regra única de cálculo para todos os suplementos. Em vez disso, a cobertura recebe comportamentos configuráveis conforme:

- o tipo de alteração;
- o impacto tarifário;
- a alteração de soma assegurada;
- a regra de negócio aplicável.

### 24.2 De recálculo indiferenciado para recálculo orientado por impacto

O modelo apresentado separa mudanças administrativas de mudanças relevantes para tarifa. Isso indica uma tentativa de tornar o recálculo mais contextual, evitando tratar toda alteração de apólice como equivalente.

### 24.3 De regras padronizadas para extensibilidade controlada

As opções de tarifa atual, original e mista representam regras padronizadas. A lógica customizada representa uma via de extensão para exceções ou cenários de negócio não cobertos pelas opções predefinidas.

A transcrição não esclarece se essa extensibilidade possui controles de governança, aprovação ou segurança.

---

## 25. Números e exemplos quantitativos citados

| Indicador ou exemplo | Valor mencionado | Contexto |
|---|---:|---|
| Soma assegurada inicial | 10.000 | Exemplo de cobertura |
| Soma assegurada após aumento | 15.000 | Exemplo de incremento de capital |
| Soma assegurada após redução | 8.000 | Exemplo de redução de capital |
| Taxa original | 1 por mil | Exemplo inicial de tarifação |
| Taxa atual | 1,5 por mil | Exemplo de alteração de tarifa |
| Capital inicial no exemplo de tarifa mista | 100.000 | Cobertura de roubo |
| Capital após suplemento | 150.000 | Exemplo de aumento de capital |
| Incremento no exemplo | 50.000 | Diferença entre 100.000 e 150.000 |
| Tarifa original no segundo exemplo | 1% | Usada sobre o capital histórico |
| Prima inicial no segundo exemplo | 1.000 | Resultado de 1% sobre 100.000 |
| Prima após suplemento | 1.250 | Resultado informado pelo instrutor |
| Desconto exemplificado | 0%, 5% e 10% | Exemplos de atributo que afeta tarifa |

Os valores acima são exemplos didáticos fornecidos durante a reunião. Não devem ser interpretados como taxas, regras comerciais ou valores efetivamente vigentes em algum produto real.

---

## 26. O que a reunião não permite concluir

A transcrição não oferece informação suficiente sobre os itens abaixo:

- nome oficial e grafia correta do sistema mencionado como “Riftcore”;
- arquitetura técnica da solução;
- tecnologias de desenvolvimento;
- bancos de dados;
- mecanismos de integração;
- APIs, eventos, mensageria ou processamento em lote;
- modelo de autenticação e autorização;
- auditoria e rastreabilidade das alterações;
- versionamento de tarifas e lógicas customizadas;
- processo de publicação de configurações;
- separação entre ambientes de desenvolvimento, homologação e produção;
- tratamento de erros de cálculo;
- estratégia de testes automatizados;
- tratamento de vigência, pro rata, estorno, impostos e parcelamento;
- critérios de aprovação de prêmio manual;
- responsabilidades por configurar atributos como impactantes ou não para cálculo;
- governança para criação e manutenção das lógicas denominadas “objeto”;
- limites funcionais de uma cobertura;
- regras completas para inclusão ou exclusão de coberturas;
- diferenças formais entre suplemento e endosso;
- definição precisa de “tarifa pura” e “parte comercial”;
- calendário, roadmap ou responsáveis pela evolução do sistema.

---

## 27. Conclusões

A reunião encerra a explicação sobre a definição de uma cobertura, com foco específico em seu comportamento durante suplementos ou endossos.

O conhecimento central transmitido pode ser resumido da seguinte forma:

1. A cobertura deve saber identificar se uma alteração realizada no suplemento afeta ou não a tarifação.
2. Essa identificação depende principalmente da configuração dos atributos e demais elementos como relevantes ou não para cálculo.
3. A soma assegurada pode aumentar, diminuir ou permanecer igual.
4. A combinação desses dois fatores gera seis cenários de tratamento.
5. Cada cenário pode usar tarifa atual, tarifa original, tarifa mista — quando aplicável — ou uma lógica customizada.
6. A tarifa mista preserva a tarifa original sobre o capital existente e usa a tarifa atual apenas sobre o incremento.
7. A cobertura também pode possuir validações funcionais, capazes de impedir a continuidade do processo quando valores, franquias ou combinações de cobertura forem inválidos.
8. Existe validação de prima, especialmente relevante para ramos com tarifação complexa ou possibilidade de prima manual.

A apresentação descreve um modelo de configuração funcional que busca equilibrar padronização de cálculo, preservação de condições históricas e flexibilidade para regras de negócio específicas.
