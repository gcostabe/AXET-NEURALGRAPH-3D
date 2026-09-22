# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `0021-DC-DEFINICION-Marcas.mp4`
**Data de processamento:** 20/09/2026 13:50:22
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada — Funcionalidade de Marcas no processo de emissão

> **Base e rastreabilidade:** esta análise foi elaborada exclusivamente a partir da transcrição fornecida. Não há timestamps, identificação de participantes nem material visual disponível.  
> **Nota terminológica:** a transcrição alterna termos que soam como “Driftcore”, “Riftcore” e “Tron Web/neutral”. Não é possível confirmar a grafia oficial ou se todos designam componentes distintos. Este documento preserva as referências com ressalvas quando necessário.

## 1. Síntese executiva

A sessão apresentou a funcionalidade de **marcas**, descrita como um mecanismo de controle aplicável ao processo de **emissão** de seguros. Seu objetivo é identificar condições de negócio relacionadas a terceiros, apólices e objetos segurados — por exemplo, histórico de fraude ou inadimplência — e desencadear ações preventivas antes da consolidação de uma operação, ou ações posteriores quando a apólice ou o terceiro já existem na carteira.

A funcionalidade foi contextualizada como parte de uma trilogia de mecanismos de controle: **controles técnicos**, **seleção digital de risco integrada a uma plataforma externa chamada “Platea”** e **marcas**. Enquanto Platea parece ser uma integração corporativa externa voltada à análise de risco, as marcas foram apresentadas como uma configuração interna do sistema, com menor maturidade de adoção e capacidades atualmente limitadas.

Na implementação descrita, marcas podem ser associadas a gravidades, fatos e ações antecipadas. Contudo, a capacidade efetivamente implementada hoje é restrita: no fluxo proativo de emissão, o sistema aparentemente só consegue usar o **número da apólice** como dado fixo e, como ação automática, somente acionar um **controle técnico** — como rejeição ou auditoria — que pode reter o movimento para avaliação.

O treinamento também enfatizou que o mecanismo depende de configuração coerente entre áreas, especialmente emissão e sinistros. Uma marca baseada, por exemplo, em alcoolemia positiva só produzirá resultado útil se a informação for devidamente registrada no processo de sinistros e puder ser recuperada pelo processo de emissão.

---

## 2. Contexto e antecedentes

A conversa se inicia retomando controles técnicos, apresentados como mecanismos comuns em seguradoras e outras organizações. Foi feita uma advertência sobre excesso de controle: áreas técnicas podem tentar controlar “absolutamente tudo”, mas essa busca por completude pode tornar a operação inviável. Segundo a explicação, quando controles excessivos começam a bloquear demasiadas situações, a organização pode acabar autorizando exceções indiscriminadamente, esvaziando o propósito original do controle.

Em seguida, foi mencionado um processo de **seleção digital de risco**, integrado a uma plataforma externa chamada, na transcrição, de “Platea”. Essa plataforma seria mantida por outra área corporativa do grupo, possivelmente ligada à direção de segurança, e utilizaria dados e análises para fornecer indicadores de risco. Cada país poderia aderir ou não à integração, conforme políticas corporativas, disponibilidade local e decisão de implementação.

O tema principal da sessão foi a terceira parte dessa trilogia: as **marcas**. A funcionalidade foi descrita como algo separado da integração externa, pois pode operar internamente no sistema. Ela teria surgido a partir de uma demanda do México há cerca de dois anos, mas o instrutor afirmou não ter certeza de que nem mesmo o México a utilize atualmente.

---

## 3. Problemas identificados

### 3.1 Excesso de controles técnicos

O primeiro problema discutido foi o risco de controle excessivo. A lógica apresentada é:

```text
Tentativa de controlar todas as situações
↓
Grande volume de bloqueios e exceções
↓
Dificuldade operacional e perda de completude
↓
Autorização indiscriminada de situações bloqueadas
↓
Perda de efetividade dos controles
```

A mensagem não é que controles técnicos sejam inadequados, mas que precisam ser definidos com equilíbrio e governança pelas áreas responsáveis.

### 3.2 Necessidade de avaliar histórico antes de emitir ou renovar

A funcionalidade de marcas busca tratar situações em que informações já conhecidas sobre uma pessoa, apólice ou risco devem influenciar uma nova operação. Foram citados exemplos como:

- fraude associada a um tomador;
- inadimplência de recibos de apólices anteriores;
- possível alcoolememia positiva identificada em um sinistro;
- necessidade de evitar renovação, elevar prêmio ou alterar a forma de pagamento.

O problema de negócio é impedir que eventos históricos relevantes permaneçam isolados em registros anteriores sem influenciar decisões futuras de subscrição, emissão ou renovação.

### 3.3 Falta de coerência entre módulos e áreas

A sessão destacou que não basta configurar uma marca na emissão. Para que um fato, como uma alcoolememia positiva, gere efeito futuro, ele precisa ser corretamente identificado e registrado no módulo ou processo onde ocorre — no exemplo, sinistros.

A relação apresentada é:

```text
Evento relevante ocorre em sinistros
↓
Informação precisa ser registrada de forma estruturada
↓
Processo de marcas deve conseguir localizar essa informação
↓
Emissão ou renovação usa o resultado para aplicar controle
```

Sem esse alinhamento, a configuração de marcas não teria utilidade prática.

### 3.4 Capacidade funcional ainda limitada

A transcrição reconhece repetidamente que a funcionalidade é simples e limitada. Entre as limitações citadas:

- disponibilidade atual apenas para emissão;
- utilização pouco disseminada;
- uso atual de apenas um dado fixo: número da apólice;
- capacidade atual de executar somente controles técnicos;
- ausência de automação completa de ações como anulação, recálculo de prêmio ou outros suplementos;
- necessidade de evolução para ampliar fontes de dados e tipos de ação.

---

## 4. Solução apresentada: conceito de marcas

Uma **marca** foi explicada inicialmente em sentido geral: algo que permite distinguir uma pessoa, objeto ou elemento de outros, indicando uma condição, qualidade ou pertencimento.

Aplicado ao sistema, o conceito de marca serve para controlar se determinadas condições de negócio são atendidas durante processos de emissão de uma seguradora. Essas condições podem ser verificadas sobre:

- terceiros envolvidos;
- objetos segurados;
- riscos;
- apólices em processo de contratação;
- apólices já existentes na carteira;
- terceiros já cadastrados na base de clientes.

As marcas podem atuar de duas maneiras.

### 4.1 Controle proativo ou antecipado

Ocorre antes da consolidação de uma informação ou movimento no sistema. Foi associado principalmente a:

- emissão de uma nova apólice;
- orçamento;
- suplemento;
- operação que ainda será consolidada.

O objetivo é identificar previamente se a operação atende a uma condição configurada e, em caso positivo, disparar o controle correspondente.

### 4.2 Controle reativo ou diferido

Ocorre quando a apólice ou o terceiro já existe na carteira. Nesse caso, o sistema ou processo analisa fatos posteriores e pode orientar ações relacionadas, por exemplo, a renovação ou tratamento da apólice.

A transcrição usa exemplos de decisão posterior, como:

- não renovar uma apólice;
- aplicar aumento de prêmio;
- impedir parcelamento;
- exigir pagamento anual integral;
- restringir uma ação associada a uma apólice existente.

---

## 5. Arquitetura lógica reconstruída

O desenho abaixo é uma consolidação analítica da explicação verbal; não corresponde a um diagrama exibido na transcrição.

```text
Dados de terceiros, apólices, riscos e intervenções
                    ↓
Catálogos de configuração de marcas
  ├─ Tipologias de marca
  ├─ Definições de marca
  ├─ Marcas por companhia e ramo técnico
  ├─ Severidades
  ├─ Fatos a controlar
  ├─ Detalhes e critérios de busca
  └─ Ações antecipadas
                    ↓
Processo de emissão
  ├─ Emissão de apólice
  ├─ Orçamento
  └─ Suplemento
                    ↓
Verificação de coincidências e fatos configurados
                    ↓
Controle técnico acionado
  ├─ Auditoria
  ├─ Rejeição
  └─ Retenção do movimento para tratamento
                    ↓
Avaliação e autorização conforme regras existentes
```

Em uma visão mais ampla, o mecanismo depende de integração lógica entre processos:

```text
Sinistros / histórico operacional
                    ↓
Registro estruturado de fatos relevantes
                    ↓
Base de terceiros e apólices
                    ↓
Funcionalidade de marcas
                    ↓
Emissão / renovação / tratamento de movimento
```

A transcrição não informa como esses componentes compartilham dados tecnicamente. Não há confirmação de APIs, eventos, mensageria, banco compartilhado ou outro padrão de integração.

---

## 6. Componentes e catálogos mencionados

### 6.1 Tipologias de marca

O primeiro catálogo citado permite definir tipologias de marca por companhia. Foram mencionados campos como:

- companhia;
- tipologia;
- idioma;
- descrição;
- observações.

O instrutor esclareceu que “tipologia” pode soar como um conjunto corporativo pré-definido, mas, nesse caso, a companhia aparentemente pode configurar seus próprios códigos. Portanto, trata-se de uma classificação configurável pela seguradora.

### 6.2 Definição de marcas

O segundo catálogo registra as marcas propriamente ditas. Entre os elementos mencionados:

- companhia;
- código da marca;
- idioma;
- nomenclatura;
- descrição;
- tipologia;
- observações;
- indicador de inabilitação;
- data de validade.

O exemplo usado foi uma marca relacionada a fraude ou inadimplência de um tomador. O código identificaria a marca e a descrição explicaria a condição que se deseja controlar.

A presença de inabilitação e data de validade evidencia preocupação com histórico e vigência de configuração. Não se trata apenas de cadastrar uma regra permanente, mas de permitir sua desativação ou aplicação em períodos determinados.

### 6.3 Marcas por ramo técnico

Para que uma marca seja aplicada em determinado ramo, ela precisa ser associada ao contexto de:

- companhia;
- ramo técnico;
- código da marca;
- inabilitação;
- data de validade.

O instrutor destacou que essa estrutura segue um padrão recorrente: há uma configuração no nível da companhia e, depois, uma especialização para o objeto de negócio específico — neste caso, o ramo técnico.

### 6.4 Parâmetros do ramo técnico

A aplicação proativa de marcas depende de parâmetros do ramo técnico. Segundo a explicação, esse parâmetro indica:

- se o processo proativo de marcas se aplica ao ramo;
- por quantos anos a busca histórica deve considerar eventos ou apólices.

Foi dado o exemplo de uma seguradora querer evitar, durante cinco anos, a emissão de nova apólice para uma pessoa que deixou de pagar recibos de uma apólice anterior.

A transcrição diferencia esse parâmetro da configuração associada a Platea. Platea teria outros atributos de ativação por ramo, ligados a emissão e sinistros; já o parâmetro de marcas seria associado à área corporativa de operações, referida como “ACO”.

### 6.5 Severidades

Há um catálogo de severidades definido por companhia, com elementos como:

- código de severidade;
- idioma;
- nomenclatura;
- inabilitação;
- data de validade.

A severidade representa o grau de gravidade atribuído à condição controlada. A classificação não é determinada automaticamente pelo sistema; ela deve ser definida pela companhia segundo seus próprios critérios internos.

Foram citadas classificações ilustrativas como:

- bom;
- regular;
- mau;
- crítico;
- indiferente.

Esses exemplos não foram apresentados como uma taxonomia oficial obrigatória.

### 6.6 Fatos

Os fatos representam os controles ou condições que se deseja verificar. Eles podem estar relacionados a:

- terceiros intervenientes;
- tomador;
- pagador;
- tomador alternativo;
- segurado;
- beneficiário;
- condutor;
- credor hipotecário;
- outros papéis configurados para o ramo;
- apólice;
- objetos segurados;
- riscos.

A estrutura do fato inclui, conforme explicado:

- companhia;
- ramo técnico;
- código de marca;
- severidade;
- identificador do fato;
- sequência;
- tipologia de objeto;
- referência ao atributo ou dado a analisar;
- valor, quando aplicável.

### 6.7 Detalhe dos fatos e busca

O sistema pode realizar busca para localizar apólices que atendam aos critérios configurados. O exemplo usado foi consultar quantas apólices uma pessoa possui.

Após o resultado da busca, a transcrição indica que pode haver uma decisão manual de incluir ou excluir determinado resultado do tratamento de marcas. Essa exclusão seria realizada por um usuário com acesso ao programa correspondente.

A fala é explícita ao afirmar que, nesse ponto, não há automação total: a inclusão ou exclusão pode depender de intervenção humana e do critério do usuário autorizado.

### 6.8 Ações antecipadas

Depois de configurar a marca, severidade e fatos, é necessário definir o que ocorrerá quando houver correspondência.

A ação é parametrizada para uma combinação que pode incluir:

- companhia;
- ramo técnico;
- estrutura de canais;
- contrato, subcontrato, apólice ou grupo, conforme o contexto;
- operação funcional do módulo de emissão;
- marca;
- severidade;
- tipo de ação;
- controle técnico a executar;
- possível lógica Oracle customizada;
- inabilitação;
- data de validade.

Na capacidade atual descrita, a ação possível é disparar um controle técnico. O controle pode reter o movimento e submetê-lo ao fluxo de auditoria, rejeição ou autorização já existente.

---

## 7. Tipologias de objeto e fontes de informação

A configuração dos fatos pode obter dados a partir de diferentes tipos de objeto.

### 7.1 Dado fixo

A transcrição afirma que, embora conceitualmente seja possível trabalhar com dados fixos da apólice, a implementação atual permite obter apenas o **número da apólice**.

Foram citados como exemplos de evoluções futuras possíveis:

- moeda de emissão;
- data de efeito da apólice;
- outros dados fixos da apólice.

Esses itens foram mencionados como possibilidades de evolução, não como capacidades disponíveis.

### 7.2 Dado variável

Se a tipologia de objeto for um dado variável, seria possível associar ao fato um atributo variável configurado no ramo. Foram citados exemplos como:

- tipo de tarifa;
- modalidade de contratação;
- atributos no nível da apólice;
- atributos no nível do risco.

A transcrição sugere que essa possibilidade existe no modelo ou na configuração conceitual, mas não detalha se todos esses casos estão implementados e operacionais hoje.

### 7.3 Intervenção de terceiro

Quando o objeto é uma intervenção, a configuração identifica qual papel do terceiro deve ser avaliado. A seleção depende das intervenções permitidas pelo ramo técnico.

Podem existir papéis como:

- tomador;
- tomador alternativo;
- segurado;
- beneficiário;
- condutor;
- outros intervenientes configuráveis.

O instrutor menciona que a intervenção, no contexto de emissão, utiliza código de atividade 1, mas a transcrição não explica formalmente o significado técnico completo dessa codificação.

### 7.4 Atributos de terceiros

Quando a marca se refere a um terceiro, a configuração pode detalhar qual informação deve ser obtida. Foram mencionados:

- tipo de documento;
- código ou chave do documento;
- e-mail;
- telefone;
- nome;
- segundo nome;
- primeiro sobrenome;
- segundo sobrenome;
- nome empresarial de pessoa jurídica;
- dados de endereço;
- estado;
- complemento de endereço;
- observações.

A obtenção desses atributos depende de as informações terem sido efetivamente cadastradas no bloco correspondente do cadastro de terceiros.

---

## 8. Consistência de dados de terceiros

Um ponto relevante do treinamento foi a necessidade de manter coerência entre como a informação é configurada e como ela é armazenada.

O exemplo apresentado envolve nomes e sobrenomes. Se a configuração de companhia prevê primeiro e segundo sobrenomes em campos separados, o cadastro de terceiros também deve preservar essa separação. Caso a informação seja armazenada de forma unificada em outro lugar, será necessário tratamento adicional para extrair ou recompor os campos, criando inconsistência entre módulos.

A mensagem pode ser sintetizada assim:

```text
Configuração de campos
↓
Forma de captura de dados
↓
Estrutura do cadastro de terceiros
↓
Capacidade de consulta e controle por marcas
```

Isso indica que a funcionalidade de marcas não é isolada: sua eficácia depende diretamente da qualidade e da padronização do modelo de dados cadastral.

---

## 9. Modelo de integração

### 9.1 Integração com Platea

A conversa menciona uma integração com uma plataforma externa chamada “Platea”, aparentemente utilizada para seleção digital de risco. Essa plataforma seria alimentada por dados e capacidades analíticas de uma área corporativa ligada à segurança.

O que pode ser afirmado com base na transcrição:

- Platea é apresentada como componente externo à funcionalidade de marcas;
- a integração parece ser opcional por país;
- sua adoção depende de políticas corporativas, disponibilidade local e decisão de cada país;
- a integração tem custo;
- há uma estratégia corporativa mais voltada a Platea do que especificamente à funcionalidade de marcas.

O que não pode ser concluído:

- tecnologia usada por Platea;
- protocolo de integração;
- fornecedor;
- natureza dos modelos analíticos;
- fontes de dados;
- dados trocados;
- critérios de segurança, privacidade ou compliance;
- custos ou modelo de cobrança.

### 9.2 Integração entre emissão e sinistros

A funcionalidade de marcas pressupõe que eventos identificados em sinistros possam, em certos cenários, ser considerados em emissão. O exemplo de alcoolemia positiva ilustra essa necessidade.

Contudo, a transcrição não define como essa comunicação ocorre tecnicamente. Pode ser uma consulta à mesma base, um processo interno, uma rotina de carga ou outra abordagem; não há informação suficiente para determinar.

---

## 10. Modelo operacional

### 10.1 Operação proativa

No modo proativo, a verificação acontece antes da consolidação da operação. O instrutor associou esse fluxo a emissão de apólice, orçamento e suplemento.

Exemplo ilustrativo apresentado:

```text
Nova emissão para um tomador
↓
Sistema identifica histórico de fraude ou inadimplência
↓
Marca e severidade aplicáveis são encontradas
↓
Ação antecipada configurada é acionada
↓
Controle técnico é gerado
↓
Movimento pode ser retido, auditado, autorizado ou rejeitado
```

### 10.2 Operação reativa

No modo reativo, a apólice ou terceiro já existe na carteira. A organização pode avaliar um fato e aplicar medidas futuras, especialmente relacionadas a renovação ou condições comerciais.

Exemplos citados:

- não renovar;
- aplicar aumento de prêmio de 200%;
- permitir emissão, mas exigir pagamento anual integral;
- impedir fracionamento de pagamento;
- impedir reabilitação ou cancelamento em determinadas situações;
- tratar apólices em diferentes estados.

Esses exemplos ilustram possibilidades de negócio; a transcrição não confirma que todas sejam automatizadas pelo sistema no estado atual.

### 10.3 Decisão manual de inclusão ou exclusão

Após uma busca identificar resultados, um usuário pode incluir ou excluir registros do tratamento. A sessão ressalta que essa ação depende de intervenção manual, sem detalhar:

- quais perfis possuem essa permissão;
- quais trilhas de auditoria existem;
- quais critérios formais orientam a decisão;
- se há duplo controle;
- se há aprovação por níveis.

---

## 11. Situações de apólice consideradas

No catálogo de fatos por marca, foi mencionado que o estado da apólice pode ser usado para caracterizar a situação no momento do cumprimento do fato. Os valores citados foram:

- expirada;
- vigente;
- anulada;
- reabilitada;
- suspensa.

O instrutor observou que a escolha desse estado deve ser coerente com o objetivo da ação. Por exemplo, controlar uma não renovação faz mais sentido com uma apólice ainda vigente do que com uma já expirada.

Também foi mencionada a data de efeito e de vencimento do último suplemento da apólice que cumpre o fato, embora a explicação indique que parte dessas informações parece ser carregada ou registrada como resultado do processo, e não necessariamente configurada manualmente como regra.

---

## 12. Particularidade de transportes: aplicação

A transcrição introduz o conceito de “aplicação” no contexto de apólices de transportes. Nesse cenário, uma aplicação corresponderia a uma viagem dentro da apólice.

A configuração pode determinar se a apólice ou uma aplicação deve ser incluída ou excluída do tratamento de ações antecipadas.

O documento não permite concluir:

- como aplicações são cadastradas;
- como são vinculadas a eventos;
- se a funcionalidade já está em uso para transportes;
- quais regras específicas de transportes existem;
- quais efeitos operacionais são aplicáveis a uma aplicação excluída.

---

## 13. Controles técnicos como ação resultante

A ação atualmente disponível para uma marca, segundo o instrutor, é disparar um controle técnico. Esse controle pode ser configurado como:

- controle de rejeição;
- controle de auditoria;
- retenção do movimento para tratamento.

A definição da ação pode apontar diretamente para um código de controle técnico. Alternativamente, pode existir uma lógica em pacote Oracle para determinar dinamicamente qual controle deve ser lançado — por exemplo, escolhendo entre códigos como 27, 31 ou 47 conforme regras adicionais.

Essa possibilidade de lógica Oracle foi apresentada como opção para evitar que o código do controle seja necessariamente fixo. A transcrição não detalha:

- a estrutura dos pacotes Oracle;
- linguagem ou versão do banco;
- critérios de execução;
- mecanismo de implantação;
- governança de desenvolvimento;
- tratamento de falhas;
- auditoria;
- testes.

---

## 14. Uso de datas de validade e histórico

O instrutor atribuiu importância especial ao uso de datas de validade nos catálogos. A recomendação foi que códigos customizados também respeitem a validade configurada, pois os dados podem mudar ao longo do tempo.

A preocupação apresentada é evitar implementações que ignorem a vigência configurada e tratem registros como se fossem eternamente válidos. Isso permitiria manter histórico e alterar configurações sem perder rastreabilidade.

A relação de causa e efeito apresentada pode ser resumida assim:

```text
Catálogos permitem inabilitação e data de validade
↓
Configurações podem mudar historicamente
↓
Código customizado precisa considerar vigência
↓
Evita comportamento incorreto ou perda de funcionalidade
```

---

## 15. Casos concretos e exemplos citados

### 15.1 Fraude ou inadimplência do tomador

**Contexto:** uma pessoa possui histórico de fraude ou deixou de pagar recibos de apólices anteriores.

**Uso pretendido:** ao tentar emitir uma nova apólice para essa pessoa, o sistema pode identificar a condição e gerar um controle técnico.

**Possíveis consequências citadas:**

- submeter o caso a análise;
- autorizar ou rejeitar a operação;
- impedir determinada condição de pagamento;
- não permitir fracionamento;
- exigir pagamento anual integral.

A transcrição não estabelece que todas essas consequências sejam implementadas diretamente pela funcionalidade atual; elas foram usadas para explicar decisões de negócio possíveis.

### 15.2 Não renovação ou aumento de prêmio

**Contexto:** uma apólice anterior apresentou inadimplência ou outro evento relevante.

**Uso pretendido:** na renovação, a seguradora poderia não renovar ou aplicar aumento de prêmio.

**Exemplo numérico mencionado:** aumento de 200% no prêmio.

Esse percentual foi apenas um exemplo verbal do instrutor; não representa regra, política ou configuração confirmada.

### 15.3 Alcoolemia positiva em sinistro

**Contexto:** em um acidente de trânsito, um relatório policial pode registrar alcoolemia positiva de uma pessoa envolvida.

**Uso pretendido:** se essa informação estiver corretamente registrada no processo de sinistros e a funcionalidade estiver configurada de modo coerente, uma emissão futura para a mesma pessoa poderia gerar uma marca e um controle técnico.

**Dependência crítica:** sinistros e emissão precisam compartilhar entendimento, dados e processos. Sem esse alinhamento, configurar a regra em emissão não produziria resultado útil.

### 15.4 México

A origem da funcionalidade foi atribuída ao México, em uma solicitação feita aproximadamente dois anos antes da sessão. Porém, o instrutor afirmou acreditar que nem mesmo o México a utiliza atualmente.

Não foram apresentados detalhes sobre:

- projeto mexicano;
- implementação;
- volume de uso;
- resultados;
- status oficial;
- responsáveis;
- cronograma.

---

## 16. Números e indicadores citados

| Indicador ou referência | Valor mencionado | Contexto |
|---|---:|---|
| Tempo desde o surgimento da demanda do México | Cerca de 2 anos | Origem da funcionalidade de marcas |
| Quantidade inicial de tabelas/catálogos | 7 | Estimativa do instrutor para a configuração |
| Janela de histórico usada como exemplo | 5 anos | Exemplo de período para controlar inadimplência |
| Aumento de prêmio usado como exemplo | 200% | Ilustração de possível medida após identificação de fato |
| Dado fixo efetivamente disponível | Número da apólice | Limitação atual mencionada |
| Ação atualmente disponível | Controle técnico | Limitação funcional atual |
| Código de atividade da intervenção em emissão | 1 | Referência feita pelo instrutor |
| Códigos de controle técnico usados como exemplo | 27, 31, 47 | Exemplos de seleção por lógica Oracle |

> Os números acima foram declarados oralmente no treinamento e não foram auditados ou confirmados por documentação externa.

---

## 17. Perguntas e respostas relevantes

### Pergunta: quem define as severidades?

A fala faz referência a uma pergunta realizada anteriormente sobre quem configura as severidades, aparentemente no contexto de Platea e controles relacionados.

**Resposta apresentada:** alguém da companhia define o grau de gravidade conforme sua classificação interna. O sistema não decide autonomamente se um caso é crítico, regular ou pouco relevante.

**O que isso esclarece:** a severidade é um elemento de governança de negócio, não uma classificação técnica automática.

---

### Pergunta implícita: quais dados podem ser usados para compor os fatos?

**Resposta apresentada:** conceitualmente, fatos podem usar dados fixos, dados variáveis ou intervenções. Contudo, a funcionalidade atual só permite, entre dados fixos, o número da apólice.

**O que isso esclarece:** existe diferença entre o modelo conceitual configurável e a capacidade realmente implementada.

---

### Pergunta implícita: é possível automatizar ações como cancelamento ou aumento de prêmio?

**Resposta apresentada:** no estado atual, não. A capacidade indicada é criar um controle técnico. No futuro, poderia haver evolução para executar automaticamente suplementos de anulação ou incremento de prêmio, possivelmente por mecanismos batch.

**O que isso esclarece:** ações de negócio mais complexas foram tratadas como cenário futuro, não como funcionalidade disponível.

---

### Pergunta implícita: o que acontece depois que a busca encontra uma coincidência?

**Resposta apresentada:** um usuário pode avaliar manualmente o resultado e excluir ou manter o registro no processo de ações antecipadas.

**O que isso esclarece:** o tratamento não é totalmente automatizado; há uma etapa humana de decisão.

---

### Pergunta implícita: como a marca baseada em sinistro funciona se a emissão é outro processo?

**Resposta apresentada:** ela só faz sentido se a área de sinistros conseguir registrar o fato e se houver configuração coerente para que a emissão leia e trate essa informação.

**O que isso esclarece:** o uso de marcas exige alinhamento transversal de dados, processos e responsabilidades.

---

## 18. Limitações reconhecidas

A sessão foi explícita sobre diversas limitações.

### 18.1 Escopo restrito a emissão

A funcionalidade está disponível, no momento apresentado, apenas para emissão. Embora o modelo de dados pudesse permitir extensão a outros processos, isso não foi confirmado como implementado.

### 18.2 Adoção limitada

O instrutor afirmou que não há país, além da referência inicial ao México, que esteja utilizando a funcionalidade. Mesmo no caso mexicano, a utilização efetiva foi colocada em dúvida.

### 18.3 Dado fixo limitado

O único dado fixo disponível hoje seria o número da apólice. Outros dados, como moeda ou data de efeito, exigiriam evolução.

### 18.4 Ação limitada a controle técnico

A ação disponível atualmente é lançar um controle técnico. A automação de ações de negócio, como:

- cancelar;
- não renovar;
- emitir suplemento;
- aumentar prêmio;
- alterar condições de pagamento;

foi descrita como possibilidade futura, não como comportamento atual.

### 18.5 Intervenção manual

A exclusão de resultados da busca depende de decisão manual do usuário autorizado.

### 18.6 Dependência de qualidade e coerência de dados

A funcionalidade depende de:

- dados de terceiros devidamente cadastrados;
- campos estruturados de forma consistente;
- configuração correta dos ramos;
- alinhamento entre emissão e sinistros;
- correspondência entre regras de negócio e dados efetivamente disponíveis.

### 18.7 Custo de integrações

Foi mencionado que integrações, como a integração com Platea, possuem custo. Isso pode influenciar a decisão de países com menor orçamento por utilizar alternativas internas, como marcas.

---

## 19. Riscos e desafios

### 19.1 Riscos explicitamente mencionados

- excesso de controles técnicos pode inviabilizar ou enfraquecer a operação;
- regras mal configuradas podem gerar controles sem utilidade;
- falta de coerência entre módulos pode tornar a funcionalidade ineficaz;
- código customizado que ignore vigência de catálogo pode produzir comportamento incorreto;
- limitações da funcionalidade podem levar a expectativas além do que o sistema entrega;
- integrações corporativas podem ter custo impeditivo para alguns países.

### 19.2 Desafios derivados do contexto

> Os itens a seguir são leitura analítica do conteúdo, não afirmações literais dos participantes.

- **Governança de regras:** como marcas, severidades e fatos representam políticas de risco e negócio, a manutenção descentralizada sem governança pode gerar comportamentos inconsistentes entre ramos ou países.
- **Rastreabilidade de decisões manuais:** como um usuário pode incluir ou excluir resultados encontrados, parece necessário haver controles de permissão e auditoria, embora a transcrição não informe se eles existem.
- **Qualidade cadastral:** regras baseadas em documentos, nomes, contatos e endereços podem ser afetadas por dados incompletos, inconsistentes ou estruturados de maneiras diferentes.
- **Acoplamento operacional:** a dependência entre sinistros e emissão indica que mudanças em um domínio podem comprometer regras de outro se não forem coordenadas.
- **Evolução técnica:** ampliar tipos de dados e ações exigirá desenvolvimento adicional e poderá aumentar a complexidade de manutenção.

---

## 20. Transformações estruturais percebidas

> Esta seção representa uma interpretação fundamentada na reunião, não uma afirmação literal do instrutor.

### 20.1 De regras isoladas para decisão baseada em histórico

A funcionalidade de marcas indica uma direção em que eventos históricos — inadimplência, fraude, incidentes em sinistros — podem ser considerados em decisões futuras de emissão e renovação.

```text
Histórico de eventos
↓
Classificação por marca e severidade
↓
Aplicação de regra em nova operação
↓
Controle ou intervenção de negócio
```

### 20.2 De controle genérico para controle contextualizado

A configuração combina ramo técnico, marca, severidade, canal, contrato, operação e possivelmente lógica customizada. Isso indica uma tentativa de aplicar controles de maneira contextual, em vez de uma regra global indistinta.

### 20.3 De tratamento manual para possível automação futura

Hoje, o processo ainda é limitado e parcialmente manual. Contudo, a menção a suplementos automáticos, processos batch e lógica Oracle indica uma direção potencial de evolução para maior automação operacional.

### 20.4 De integração externa para alternativa interna de menor custo

Platea foi apresentada como uma estratégia corporativa com capacidade analítica e integração externa, mas com custo. As marcas aparecem como alternativa interna que pode atender certos controles em países que não adotem a integração externa.

Essa leitura não significa que marcas substituam Platea integralmente; a própria transcrição sugere que possuem escopo e maturidade diferentes.

---

## 21. O que a reunião não permite concluir

A transcrição não fornece detalhes suficientes sobre os itens abaixo:

- nome oficial dos sistemas mencionados como “Driftcore”, “Riftcore”, “Tron Web” ou “Tron Web Neutral”;
- arquitetura técnica do sistema;
- banco de dados efetivamente utilizado, além da menção a possíveis pacotes Oracle;
- versão de Oracle ou estrutura dos pacotes;
- APIs, eventos, mensageria, arquivos ou outros mecanismos de integração;
- modelo de dados completo de marcas;
- chaves e relacionamentos entre tabelas;
- regras de autorização para inclusão ou exclusão manual;
- matriz de perfis, papéis e níveis de acesso;
- trilhas de auditoria;
- SLAs, tempos de processamento ou requisitos de disponibilidade;
- tratamento de falhas;
- observabilidade, monitoramento ou alertas;
- segurança de dados, privacidade, LGPD/GDPR ou retenção de informação;
- critérios corporativos de severidade;
- política de risco, fraude ou crédito;
- critérios formais para rejeição, auditoria ou aprovação;
- funcionamento interno da plataforma Platea;
- custos da integração com Platea;
- países que adotam Platea;
- uso efetivo de marcas no México;
- roadmap formal, responsáveis ou datas de entrega;
- mecanismo técnico de compartilhamento de informações entre sinistros e emissão;
- capacidade real e atual de uso de dados variáveis e intervenções;
- critérios de busca e algoritmos de correspondência de terceiros;
- cobertura para produtos, ramos ou canais específicos.

---

## 22. Conclusões

A funcionalidade de marcas foi apresentada como um mecanismo configurável de apoio à gestão de risco e ao controle de operações de emissão. Ela permite relacionar condições de negócio a informações de terceiros, apólices e riscos, classificá-las por severidade e transformar correspondências encontradas em controles técnicos.

A principal utilidade está em trazer para o processo de emissão informações históricas relevantes, como fraude, inadimplência ou eventos identificados em sinistros. Porém, sua utilidade depende de dados corretos, configuração consistente e cooperação entre áreas responsáveis por diferentes etapas do ciclo de vida do seguro.

No estado descrito, a funcionalidade tem limitações importantes: escopo concentrado em emissão, baixa adoção, um conjunto reduzido de dados fixos utilizáveis e uma única ação operacional efetiva — a criação de controles técnicos. Assim, ela deve ser entendida como uma base configurável e potencialmente extensível, não como uma solução madura e automatizada para todas as decisões de risco.

A mensagem central do treinamento é que controles devem ser configurados com equilíbrio. Uma regra só agrega valor se houver clareza sobre o fato que se deseja detectar, a qualidade dos dados disponíveis, a severidade atribuída, a ação resultante e a responsabilidade operacional para tratar o caso.
