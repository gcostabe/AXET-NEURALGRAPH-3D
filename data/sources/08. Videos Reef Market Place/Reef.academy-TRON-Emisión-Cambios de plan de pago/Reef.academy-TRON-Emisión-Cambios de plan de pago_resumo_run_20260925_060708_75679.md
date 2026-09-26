# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.academy-TRON-Emisión-Cambios de plan de pago.mp4`
**Data de processamento:** 25/09/2026 06:11:10
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Análise estruturada — Alteração de plano de pagamento de apólices no sistema TRON/Neutron

> **Base documental:** transcrição de treinamento e evidências visuais extraídas de telas e slides.  
> **Escopo:** operação intitulada na documentação como **“ALTERAR Póliza plan pago”**, apresentada como uma operação do módulo de emissão.  
> **Nota de fidelidade:** termos como “TRON”, “Neutron”, “emissão”, “suplemento”, “endosso” e “recibo” foram preservados conforme o contexto apresentado. Onde a gravação não detalha aspectos técnicos, funcionais ou organizacionais, isso é explicitamente sinalizado.

---

## 1. Síntese executiva

A sessão apresentou o funcionamento da operação de **alteração de plano de pagamento de uma apólice**, também descrita como refinanciamento total ou parcial dos recibos vinculados à apólice.

A mensagem central é que a operação não altera livremente todos os dados contratuais. Ela é tratada como um **suplemento especial**, cujo objetivo principal é reorganizar a forma de cobrança de valores ainda pendentes. Para isso, o sistema permite selecionar quais recibos pendentes participarão da alteração, cancelar contabilmente esses recibos e constituir novos recibos conforme o plano de pagamento escolhido.

O treinamento enfatiza que:

- nem toda a dívida precisa ser refinanciada;
- apenas recibos em situação **emitido pendente** podem participar diretamente da operação;
- recibos já cobrados ou remetidos para cobrança não são elegíveis enquanto estiverem nesses estados;
- o novo plano pode, em determinadas situações, ser o mesmo plano já utilizado pela apólice;
- a quantidade efetiva de novos recibos pode ser limitada pela vigência da apólice;
- o processo também pode permitir a troca do gestor de cobrança e, quando aplicável, da conta ou cartão utilizados para pagamento;
- cada suplemento/endosso gera novamente a numeração das parcelas, embora os recibos permaneçam como entidades próprias.

A parte prática demonstrou, em um ambiente de testes do sistema denominado **Neutron**, dois movimentos sucessivos:

1. conversão de uma apólice com um único recibo em duas parcelas;
2. refinanciamento de apenas uma dessas parcelas em quatro novos recibos, mantendo a outra parcela inalterada.

A próxima sessão prevista seria dedicada à visão técnica interna do processo, incluindo tabelas, colunas e linhas de banco de dados afetadas. Essa explicação não foi realizada nesta reunião.

---

## 2. Contexto e antecedentes

### 2.1. Contexto do treinamento

A reunião teve formato de treinamento funcional sobre uma operação do módulo de emissão. A operação aparece na documentação visual como:

- **“ALTERAR Póliza plan pago”**;
- vinculada à área de emissão;
- acessível por uma documentação chamada **DOCUMENTACIÓN REEF**;
- classificada visualmente em uma estrutura que contém itens como informação geral, visão técnica e opção econômica.

O apresentador indicou que a operação havia sido inicialmente associada, na navegação ou na organização do conteúdo, ao ramo de automóveis. Contudo, afirmou expressamente que ela pode ser realizada em **qualquer tipo de negócio ou apólice do sistema**.

### 2.2. Problema de negócio tratado

O problema endereçado é a necessidade de alterar a forma como uma dívida de apólice será cobrada após a emissão inicial.

Na prática, isso pode ocorrer quando:

- o cliente não consegue pagar uma parcela originalmente emitida;
- a companhia e o cliente precisam redistribuir o valor devido;
- há necessidade de alterar a periodicidade de cobrança;
- deseja-se refinanciar uma parte específica da dívida, sem afetar todo o saldo pendente;
- há necessidade de alterar a forma ou o responsável pela cobrança.

A reunião não descreve regras comerciais, jurídicas ou de crédito que determinem quando o refinanciamento deve ser autorizado. O foco foi o comportamento funcional do sistema depois que a decisão de realizar o movimento já foi tomada.

### 2.3. Modelo mental apresentado

A alteração de plano de pagamento não foi descrita como simples edição dos recibos existentes. O comportamento apresentado é:

```text
Recibos pendentes selecionados
↓
Cancelamento dos valores originais selecionados
↓
Consolidação do valor cancelado
↓
Aplicação do novo plano de pagamento
↓
Geração de novos recibos
```

A consequência importante desse modelo é que os recibos selecionados não são “repartidos” diretamente no mesmo registro. Em vez disso, o sistema gera movimentos de cancelamento e cria novos recibos para representar a nova estrutura de cobrança.

---

## 3. Problemas identificados e regras de elegibilidade

## 3.1. Restrição por situação do recibo

A principal premissa apresentada é que apenas recibos em situação equivalente a **“emitido pendente”** podem participar diretamente da alteração de plano de pagamento.

A documentação exibida registra:

> “Para que um recibo pueda intervenir, debe encontrarse en situación emitido pendiente.”

Os estados exemplificados foram:

| Situação do recibo | Pode participar diretamente? | Motivo apresentado |
|---|---:|---|
| Cobrado | Não | O valor já foi pago pelo cliente. |
| Remesado | Não | O recibo já foi enviado ao gestor de cobrança. |
| Emitido pendente | Sim | O recibo ainda está sob controle da MAPFRE/sistema para essa finalidade. |

### Exceção citada para recibo remesado

O apresentador explicou que um recibo remesado poderia se tornar elegível caso fosse devolvido pelo gestor de cobrança e tivesse seu estado alterado novamente para uma situação pendente. A transcrição não detalha o processo operacional, permissões, validações ou integrações necessárias para essa devolução.

---

## 3.2. Restrição sobre a apólice

Para iniciar a operação, a apólice precisa existir e não pode estar anulada.

Foi mencionado que, se a apólice estiver anulada, não seria possível realizar movimentos sobre ela, exceto o movimento de reabilitação. A reunião não detalha as regras ou o fluxo dessa reabilitação.

---

## 3.3. Restrição específica para transporte

Foi citada uma regra condicionada ao ramo/tratamento de transportes:

- quando o ramo possui tratamento de transportes e a alteração não afeta a apólice marco, deve ser informada a **aplicação**;
- para outros tratamentos, o número da aplicação não seria exigido.

A transcrição não define tecnicamente o que caracteriza uma “apólice marco”, nem como a aplicação se relaciona internamente com a apólice.

---

## 4. Solução apresentada

A solução é um suplemento — também referido na reunião como endosso — configurado para alterar o plano de pagamento.

O apresentador o classificou como um **suplemento especial**, porque sua atuação é deliberadamente restrita:

- permite alterar o plano de pagamento;
- permite refinanciar a totalidade ou apenas parte dos recibos pendentes;
- permite, adicionalmente, alterar o gestor de cobrança;
- não permite alterar outros tipos de informação da apólice, salvo o gestor de cobrança, conforme foi informado.

A documentação visual descreve que a operação pode atuar tanto sobre uma apólice quanto sobre uma aplicação.

---

## 5. Funcionamento lógico da alteração de plano de pagamento

## 5.1. Fluxo consolidado

A sequência apresentada pode ser reconstruída da seguinte forma:

```text
1. Identificar a apólice ou aplicação
   ↓
2. Selecionar o suplemento de alteração de plano de pagamento
   ↓
3. Informar a data-base para geração dos novos recibos
   ↓
4. Definir o plano de pagamento a ser aplicado
   ↓
5. Informar, se aplicável:
   - valor ou percentual da primeira parcela;
   - tipo de gestor de cobrança;
   - identificação do gestor;
   - conta ou cartão de cobrança.
   ↓
6. Consultar os recibos pendentes elegíveis
   ↓
7. Selecionar quais recibos participarão
   ↓
8. Finalizar o suplemento
   ↓
9. Cancelar os recibos selecionados
   ↓
10. Gerar novos recibos para o valor cancelado
```

> **Leitura analítica:** o processo combina uma seleção controlada de saldo pendente com uma nova constituição de cobrança. Isso indica que a operação foi desenhada para preservar o histórico da dívida original, em vez de simplesmente sobrescrever os registros anteriores.

---

## 5.2. Seleção parcial da dívida

Um dos pontos mais enfatizados foi a possibilidade de refinanciar apenas parte da dívida.

Isso significa que, se uma apólice possui vários recibos pendentes, o operador pode escolher apenas alguns deles. Os recibos não selecionados permanecem sem alteração.

Exemplo conceitual apresentado:

```text
Apólice com dois recibos pendentes
├── Recibo R-3: selecionado
└── Recibo R-4: não selecionado

Resultado:
├── R-3 é cancelado e seu valor é redistribuído
└── R-4 continua com seu valor e vencimento originais
```

A reunião associou essa possibilidade a situações reais em que o cliente não consegue pagar uma parcela específica e precisa refinanciá-la, sem necessariamente reorganizar toda a dívida contratual.

---

## 5.3. Cancelamento e constituição

A documentação e a explicação utilizaram uma convenção visual:

- **vermelho:** cancelamento;
- **verde:** constituição ou geração de novos recibos.

Quando um recibo selecionado participa do movimento:

1. é criado um movimento negativo pelo valor integral do recibo;
2. o recibo original fica com valor líquido igual a zero;
3. o valor cancelado é redistribuído em novos recibos conforme o plano escolhido.

No exemplo de dois recibos de 400,00 cada:

```text
R-3: 400,00
R-4: 400,00
↓
Cancelamentos: -400,00 e -400,00
↓
Valor a redistribuir: 800,00
↓
Novos recibos gerados conforme o novo plano
```

---

## 6. Arquitetura funcional do processo

A reunião não apresentou arquitetura de software, APIs, mensageria, banco de dados, nuvem ou integrações técnicas detalhadas. O que foi apresentado permite apenas reconstruir uma **arquitetura funcional do fluxo**.

```text
Usuário operacional
↓
Módulo de emissão do sistema Neutron
↓
Suplemento de alteração de plano de pagamento
↓
Consulta de apólice / aplicação
↓
Consulta de recibos pendentes
↓
Seleção de recibos participantes
↓
Cancelamento de recibos selecionados
↓
Motor/regra de definição de plano de pagamento
↓
Geração de novos recibos
↓
Gestor de cobrança selecionado
↓
Cobrança por agente, banco, cobrador, cartão,
oficina, companhia líder ou área de inadimplência
```

> **Importante:** esse diagrama é uma consolidação analítica do fluxo funcional relatado. Não foi exibido como um diagrama de arquitetura técnica na reunião.

---

## 7. Componentes e conceitos mencionados

## 7.1. TRON

A documentação visual traz o logotipo e referências a **TRON**, incluindo uma estrutura de documentação e itens de treinamento.

A transcrição menciona “curso de trono”, possivelmente referindo-se ao mesmo termo, mas o reconhecimento de voz não permite afirmar com total segurança a nomenclatura. A evidência visual indica “TRON”.

A reunião não explica:

- se TRON é o nome do produto;
- se é uma camada, módulo ou plataforma;
- sua arquitetura;
- sua relação técnica com Neutron.

---

## 7.2. Neutron

**Neutron** foi apresentado como a interface utilizada na demonstração prática.

O apresentador informou que acessaria um ambiente de testes e mostrou o menu de emissão, no qual usuários podem realizar operações sobre apólices. Ele declarou possuir um perfil administrativo que lhe permitia executar diferentes ações.

No treinamento, Neutron foi utilizado para:

- emitir uma apólice de teste;
- escolher plano de pagamento;
- selecionar gestor de cobrança;
- iniciar o suplemento de alteração de plano;
- consultar recibos;
- validar visualmente os cancelamentos e os novos recibos gerados.

A reunião não informa:

- tecnologia utilizada pelo Neutron;
- arquitetura da aplicação;
- modelo de autenticação;
- perfis de acesso além do perfil administrativo demonstrado;
- integrações técnicas com sistemas externos.

---

## 7.3. DOCUMENTACIÓN REEF / Marketplace

As evidências visuais mostram uma página denominada **DOCUMENTACIÓN REEF**, hospedada em um endereço com domínio `marketplace.mapfre.com`.

A página consultada contém documentação da operação, incluindo:

- em que consiste;
- premissas;
- exemplos;
- cenários;
- processo a seguir;
- informação inicial e final da apólice.

A tela também indica:

- `Owner: map-capacitacion`;
- `Lifecycle: wip`.

Esses dados sugerem que a documentação estava em estado de trabalho (“wip”), mas a reunião não explica o modelo de governança, aprovação, versionamento ou publicação da documentação.

---

## 7.4. Apólice e aplicação

A operação pode ser aplicada a uma apólice ou, em cenários específicos, a uma aplicação.

A aplicação aparece especialmente associada à regra de transportes. Não há detalhamento suficiente para determinar:

- se a aplicação é uma subdivisão contratual;
- se possui numeração própria;
- como é persistida;
- em quais outros ramos é aplicável.

---

## 7.5. Recibo

O recibo é a principal unidade operacional da alteração de plano de pagamento.

Cada recibo possui, no mínimo, informações visíveis de:

- identificação;
- data de efeito;
- data de vencimento;
- situação;
- valor.

Os recibos são os elementos selecionados pelo usuário para refinanciamento. Eles podem ser cancelados e substituídos por outros recibos gerados pelo novo plano.

---

## 7.6. Plano de pagamento

O plano de pagamento define como o valor será fracionado ao longo do tempo.

Foram citados exemplos de planos:

- anual, com uma única parcela;
- semestral, com duas parcelas;
- trimestral, com quatro parcelas em uma vigência anual;
- mensal, normalmente associado a 12 parcelas.

A reunião indica que a definição do plano de pagamento possui regras adicionais, que seriam abordadas em uma próxima sessão. Portanto, não é possível concluir, com base nesta reunião:

- todos os atributos configuráveis de um plano;
- como os planos são cadastrados;
- quais planos permitem extrapolar a vigência da apólice;
- quais regras de arredondamento são aplicadas;
- quais condições autorizam valor diferenciado na primeira parcela.

---

## 7.7. Suplemento / endosso

O suplemento é o movimento usado para efetivar a alteração de plano de pagamento.

A reunião alterna os termos “suplemento” e “endosso”. A evidência mais clara é que cada endosso renumera parcelas, e que o usuário escolhe um suplemento configurado para mudança de plano de pagamento.

Foi citado que o suplemento teria um tipo referido na transcrição como “C, V, C, B, corta”. Esse trecho é ambíguo e provavelmente sofreu erro de reconhecimento de voz. Não é possível determinar com segurança a sigla ou classificação técnica correta.

---

## 8. Casos concretos apresentados

## 8.1. Caso 1 — Apólice anual com quatro recibos trimestrais

### Contexto

A apólice possui vigência de janeiro de 2023 a janeiro de 2024, com plano trimestral e quatro recibos de 400,00.

| Recibo | Efeito | Vencimento | Situação | Valor |
|---|---|---|---|---:|
| R-1 | 01 jan. 2023 | 01 abr. 2023 | Cobrado | 400,00 |
| R-2 | 01 abr. 2023 | 01 jul. 2023 | Remesado | 400,00 |
| R-3 | 01 jul. 2023 | 01 out. 2023 | Emitido pendente | 400,00 |
| R-4 | 01 out. 2023 | 01 jan. 2024 | Emitido pendente | 400,00 |

### Consequência funcional

Somente R-3 e R-4 podem participar diretamente do processo, pois são os únicos em situação pendente.

---

## 8.2. Caso 1A — Refinanciamento de R-3 e R-4 para plano mensal

### Movimento

O novo plano selecionado é mensal, configurado para 12 frações. A alteração é realizada com efeito em 1º de julho de 2023.

Os recibos selecionados são:

| Participa? | Recibo | Valor |
|---|---|---:|
| Sim | R-3 | 400,00 |
| Sim | R-4 | 400,00 |

Total refinanciado: **800,00**.

### Resultado

R-3 e R-4 são cancelados por meio de movimentos negativos. Depois, são gerados novos recibos mensais para redistribuir os 800,00.

Apesar de o novo plano possuir 12 frações, a documentação informa que apenas seis recibos são gerados, porque restam seis meses de vigência entre julho de 2023 e janeiro de 2024.

| Novo recibo | Período indicado | Valor |
|---|---|---:|
| R-5 | 01 jul. 2023 a 01 ago. 2023 | 133,35 |
| R-6 | 01 ago. 2023 a 01 set. 2023 | 133,33 |
| R-7 | 01 set. 2023 a 01 out. 2023 | 133,33 |
| R-8 | 01 out. 2023 a 01 nov. 2023 | 133,33 |
| R-9 | 01 nov. 2023 a 01 dez. 2023 | 133,33 |
| R-10 | 01 dez. 2023 a 01 jan. 2024 | 133,33 |

O pequeno ajuste no primeiro valor, de 133,35 em vez de 133,33, parece corresponder à necessidade de fechar o total de 800,00. A reunião não explica formalmente a regra de arredondamento.

### Regra destacada

A definição de 12 parcelas não garante a emissão efetiva de 12 recibos quando a vigência disponível é menor. Contudo, o apresentador ressalvou que, em outra sessão, seria explicada a possibilidade de configurar planos cuja geração ultrapasse a vigência. Portanto, a limitação demonstrada não deve ser interpretada como regra universal de todos os planos.

---

## 8.3. Caso 1B — Refinanciamento apenas de R-3

### Movimento

R-3 participa da alteração, enquanto R-4 permanece fora.

| Participa? | Recibo | Valor |
|---|---|---:|
| Sim | R-3 | 400,00 |
| Não | R-4 | 400,00 |

### Resultado

- R-3 é cancelado;
- o valor de 400,00 é distribuído nos novos recibos;
- R-4 permanece sem alteração;
- R-1 e R-2 também permanecem inalterados, por estarem respectivamente cobrado e remesado.

Esse cenário foi usado para reforçar que a operação pode atuar sobre parte da dívida.

---

## 8.4. Caso 1C — Refinanciamento apenas de R-4

### Movimento

O apresentador descreveu um terceiro cenário em que apenas R-4 participa.

### Interpretação funcional

Esse cenário representa, por exemplo, uma situação em que o cliente comunica que não consegue pagar uma parcela específica de outubro e precisa refinanciá-la.

### Resultado informado

- R-3 não é cancelado;
- R-4 é cancelado;
- são gerados novos recibos para redistribuir os 400,00 de R-4;
- a quantidade de novos recibos continua condicionada ao período restante e ao plano escolhido.

---

## 8.5. Caso 2 — Uso do mesmo plano de pagamento

### Contexto

Foi apresentado um exemplo para demonstrar que o novo plano não precisa ser diferente do plano original.

A apólice possui vigência anual e plano de pagamento semestral:

```text
Janeiro → Julho: recibo 1
Julho → Janeiro: recibo 2
```

O cliente não consegue pagar o primeiro recibo e solicita que esse valor seja dividido em duas partes.

### Ponto esclarecido

O sistema permite que o movimento utilize um plano de pagamento com a mesma periodicidade nominal do plano original, desde que a dívida selecionada seja apenas uma parte da dívida total.

Em outro exemplo da explicação, uma apólice com quatro recibos trimestrais teve apenas R-1 selecionado. O valor de 400,00 de R-1 foi cancelado e redistribuído em quatro novos recibos de 100,00, enquanto R-2, R-3 e R-4 permaneceram inalterados.

### Conclusão funcional

O “novo” plano de pagamento é novo no contexto do suplemento e da dívida selecionada, mas pode ter a mesma configuração nominal do plano vigente na apólice.

---

## 8.6. Caso 3 — Demonstração prática no ambiente Neutron

### Emissão inicial

No ambiente de testes, o apresentador:

1. acessou o módulo de emissão;
2. iniciou a emissão de uma apólice de um ramo de teste;
3. definiu vigência de 1º de janeiro a 1º de janeiro do ano seguinte;
4. selecionou um tomador já existente;
5. selecionou agente;
6. informou coberturas e valor de responsabilidade civil de 150 mil;
7. escolheu um plano de pagamento com uma única parcela;
8. selecionou agente como gestor de cobrança;
9. finalizou a emissão.

O sistema gerou um recibo único de valor que o apresentador indicou ser 750.

### Primeiro suplemento: uma parcela para duas

Em seguida, foi realizado um suplemento de alteração de plano de pagamento:

- o plano passou de uma parcela para duas;
- o recibo único foi selecionado;
- o recibo original foi cancelado;
- foram gerados dois novos recibos de 375 cada.

A consulta posterior mostrou:

```text
Recibo original: 750
Movimento de cancelamento: -750
Saldo líquido do recibo original: 0
Novos recibos: 375 + 375
```

### Segundo suplemento: refinanciamento de uma das duas parcelas

Na sequência:

- a apólice, então com duas parcelas de 375, foi submetida a novo suplemento;
- foi escolhido plano de pagamento com quatro parcelas;
- apenas uma das parcelas de 375 foi selecionada;
- a outra parcela de 375 permaneceu inalterada;
- foram gerados quatro recibos de 93,75.

O valor de 93,75 corresponde a 375 dividido por quatro.

Esse exemplo prático confirmou o comportamento descrito anteriormente na parte conceitual: seleção parcial, cancelamento do recibo participante e nova distribuição exclusivamente do valor selecionado.

---

## 9. Data de geração dos novos recibos

Uma pergunta relevante tratou da relação entre a data de efeito do suplemento e as datas de efeito dos recibos.

A resposta dada foi que o sistema não obriga que a data utilizada para a alteração de plano de pagamento seja igual à data de efeito de um recibo pendente.

Segundo a explicação:

- a data pode ser informada livremente;
- ela é utilizada como base para a geração dos novos recibos;
- o comportamento final dependerá da definição do plano de pagamento.

A reunião não detalha:

- limites de data;
- validações retroativas ou futuras;
- efeitos contábeis;
- impacto sobre vencimentos;
- regras por ramo ou país;
- tratamento de períodos já vencidos.

---

## 10. Configuração da primeira parcela

## 10.1. Finalidade

O sistema permite informar um valor ou percentual específico para a primeira parcela.

Essa possibilidade pode ser usada tanto na emissão inicial quanto em suplementos de alteração de plano de pagamento.

## 10.2. Comportamentos citados

| Entrada no campo | Comportamento descrito |
|---|---|
| Campo vazio ou zero | Aplica a distribuição padrão do plano de pagamento. |
| Valor fixo | A primeira parcela assume esse valor; o saldo é distribuído entre as demais. |
| Percentual | A primeira parcela assume esse percentual do total; o saldo é distribuído entre as demais. |

## 10.3. Exemplos apresentados

Para uma dívida total de 1.000,00 em plano semestral:

| Cenário | Primeira parcela | Segunda parcela |
|---|---:|---:|
| Percentual de 20% | 200,00 | 800,00 |
| Valor fixo de 300 | 300,00 | 700,00 |
| Sem valor informado | 500,00 | 500,00 |

## 10.4. Limitações reconhecidas

O apresentador deixou claro que essa opção:

- não faz sentido em plano de pagamento de uma única parcela;
- depende de o plano de pagamento estar configurado para permitir essa flexibilização;
- não será necessariamente respeitada se a definição do plano não a autorizar.

A configuração que habilita ou bloqueia essa funcionalidade seria explicada em outra sessão, não incluída na presente reunião.

---

## 11. Gestor de cobrança

## 11.1. Papel do gestor

O gestor de cobrança é a pessoa, entidade, canal ou área responsável por receber ou administrar a cobrança dos valores devidos pelo cliente.

A alteração de plano de pagamento pode manter o gestor existente ou substituí-lo. A mudança de gestor não é obrigatória.

Foi citado, como exemplo, que um cliente pode mudar de cobrança por conta bancária para cobrança por cartão de crédito.

---

## 11.2. Tipos de gestor mencionados

| Tipo citado | Finalidade descrita |
|---|---|
| Agente | Recebe o pagamento do cliente e posteriormente repassa os valores à MAPFRE. |
| Banco | Realiza cobrança associada à conta bancária do cliente. |
| Cobrador | Pessoa que realiza cobrança diretamente, inclusive porta a porta. |
| Débito automático em conta | Cobrança por conta bancária; o apresentador associou o conceito à domiciliação bancária na Espanha. |
| Gestor direto | O apresentador corrigiu sua própria explicação e indicou que corresponde a uma oficina da MAPFRE. |
| Gestor piloto de cosseguro | Aplicável quando a MAPFRE não é líder da apólice; a companhia líder realiza a cobrança. |
| Oficina comercial | Unidade comercial responsável pela cobrança. |
| Débito com cartão de crédito | Cobrança vinculada ao cartão informado pelo cliente. |
| Gestor de inadimplência | Área responsável por tentar recuperar um recibo não pago; ao final, pode haver cobrança ou cancelamento da apólice. |

> **Nota de fidelidade:** a nomenclatura “gestor piloto de cosseguro” foi extraída de uma fala com reconhecimento de voz imperfeito. O significado apresentado, contudo, foi associado ao cenário de cosseguro em que a MAPFRE não é líder.

---

## 11.3. Dependências por tipo de gestor

| Gestor | Informação adicional indicada |
|---|---|
| Agente | Chave do agente principal da apólice. |
| Banco | Entidade financeira e agência/escritório. |
| Cobrador | Chave do cobrador cadastrado como terceiro. |
| Débito automático em conta | Dados da entidade e agência. |
| Gestor direto | Identificação da oficina MAPFRE. |
| Gestor de cosseguro | Identificação da companhia líder. |
| Oficina comercial | Chave da oficina comercial. |
| Cartão de crédito | Dados bancários/entidade associados ao cartão. |
| Gestor de inadimplência | Em princípio, sem codificação específica inicial. |

Foi informado que uma apólice pode possuir até seis figuras que recebem comissão, mas apenas o **agente principal** pode atuar como gestor de cobrança quando essa modalidade é escolhida.

A transcrição não detalha:

- como são cadastrados os agentes, bancos, cobradores e oficinas;
- como ocorre a integração com bancos ou operadoras de cartão;
- regras de validação dos dados financeiros;
- medidas de segurança para dados bancários e cartões.

---

## 12. Conta de cobrança

O sistema permite que o cliente possua mais de uma conta bancária ou cartão de crédito cadastrados.

Quando houver múltiplas alternativas, o operador deve indicar qual conta ou cartão será usado no novo plano de pagamento.

A conta de cobrança funciona, portanto, como a escolha do instrumento financeiro específico a ser utilizado pelo gestor de cobrança selecionado.

A reunião não esclarece:

- se a conta é validada em tempo real;
- se há mascaramento de dados sensíveis;
- como funcionam autorizações de débito;
- se cartões vencidos ou contas inativas são bloqueados;
- como é feita a gestão de consentimento do cliente.

---

## 13. Numeração de parcelas e recibos

Uma pergunta foi feita sobre a numeração de parcelas após a alteração do plano de pagamento.

### Pergunta

Quando o plano original possui, por exemplo, parcelas 1, 2, 3 e 4, que numeração recebem as novas parcelas geradas após uma alteração para 12 parcelas?

### Resposta

O apresentador explicou que a numeração de parcelas é gerada por endosso/suplemento.

Assim, a nova estrutura volta a ter:

```text
Parcela 1
Parcela 2
Parcela 3
...
```

mas vinculada a um novo endosso.

### Esclarecimento importante

A resposta destacou que o recibo possui identidade própria, embora um recibo possa ser composto por uma ou várias parcelas. A rastreabilidade da numeração deve considerar o endosso ao qual a parcela pertence.

### O que a reunião não detalha

Não foram apresentados:

- identificadores técnicos de recibos;
- chaves de endosso;
- relacionamento de banco de dados;
- regras de unicidade;
- comportamento de numeração em estornos ou reemissões.

A próxima sessão deveria mostrar essas estruturas em tabelas de banco de dados.

---

## 14. Processo operacional na interface

## 14.1. Etapa 1 — Identificação da apólice ou aplicação

O sistema solicita:

- apólice;
- aplicação, quando aplicável;
- suplemento/endosso configurado para alteração de plano de pagamento.

A apólice deve existir e não pode estar anulada.

---

## 14.2. Etapa 2 — Data de geração dos recibos

O sistema solicita uma data que servirá de base para gerar os novos recibos.

O apresentador reforçou que essa data não precisa coincidir com a data de efeito de um recibo pendente.

---

## 14.3. Etapa 3 — Definição do plano e condições econômicas

Na área chamada **opção econômica**, o usuário pode informar:

- novo plano de pagamento;
- valor ou percentual da primeira parcela, quando permitido;
- tipo de gestor de cobrança;
- chave do gestor;
- conta de cobrança, quando aplicável.

---

## 14.4. Etapa 4 — Seleção dos recibos

A interface apresenta os recibos pendentes da apólice.

O usuário escolhe, por meio de marcação em linha, quais recibos participarão da operação.

Esse é o principal ponto de controle para decidir se a alteração atingirá:

- toda a dívida pendente;
- apenas uma parte;
- um recibo específico.

---

## 14.5. Etapa 5 — Finalização do suplemento

Depois de preencher os dados e selecionar os recibos, o suplemento é finalizado.

Na demonstração, também houve necessidade de informar:

- observações;
- motivo do suplemento.

O apresentador indicou que a exigência de observações estava associada ao ramo de teste utilizado. Não foi explicado se essa exigência ocorre em todos os ramos.

---

## 15. Perguntas e respostas relevantes

## 15.1. A data do suplemento precisa coincidir com a data de efeito dos recibos?

### Resposta

Não. O sistema não obriga que a data seja igual à data de efeito de um recibo pendente. Pode ser informada uma data escolhida pelo operador.

### O que isso esclarece

A alteração de plano de pagamento possui flexibilidade temporal na data-base de geração. Porém, o resultado depende da definição do plano de pagamento.

---

## 15.2. Por que usar o mesmo plano de pagamento em uma alteração?

### Dúvida

Foi questionado por que alguém faria uma mudança de plano passando, por exemplo, de semestral para semestral.

### Resposta

Porque o que muda não é necessariamente a periodicidade nominal da apólice inteira, mas a forma de redistribuir uma parcela específica da dívida.

O exemplo foi:

```text
Apólice anual
Plano semestral
├── Recibo de janeiro a julho
└── Recibo de julho a janeiro

Cliente não consegue pagar o primeiro recibo.
O sistema pode refinanciar apenas esse valor,
mesmo utilizando um plano com a mesma denominação.
```

### O que isso esclarece

A operação é orientada à dívida selecionada, não apenas à alteração global da periodicidade contratual.

---

## 15.3. Como ficam as numerações das parcelas após a mudança?

### Resposta

As parcelas são renumeradas por endosso. Um novo endosso volta a gerar parcelas iniciando em 1, mas em seu próprio contexto.

### O que isso esclarece

A identificação de uma parcela não deve ser analisada isoladamente; é preciso considerar o endosso ao qual ela pertence.

---

## 16. Limitações e ressalvas reconhecidas

| Limitação ou ressalva | Evidência apresentada |
|---|---|
| Recibos cobrados não participam diretamente. | Foram considerados fora do escopo do refinanciamento. |
| Recibos remesados não participam diretamente. | Precisariam ser devolvidos e voltar a estado pendente. |
| Nem todos os 12 recibos de um plano mensal precisam ser gerados. | A vigência disponível pode limitar a quantidade de recibos. |
| Valor ou percentual de primeira parcela depende da configuração do plano. | O sistema só respeita a regra se o plano permitir. |
| Plano de uma única parcela não comporta primeira parcela diferenciada. | Não há outras parcelas para redistribuição do saldo. |
| Troca de gestor de cobrança não é obrigatória. | Pode-se manter o gestor anterior. |
| Dados adicionais dependem do gestor escolhido. | Banco, agência, agente, cobrador ou oficina podem ser exigidos. |
| A apólice não pode estar anulada. | Exceção mencionada: movimento de reabilitação. |
| A sessão não cobriu a estrutura de banco de dados. | Esse conteúdo foi adiado para o próximo treinamento. |
| A sessão não explicou a definição interna de planos de pagamento. | Esse conteúdo também foi planejado para uma sessão posterior. |

---

## 17. Riscos e desafios

## 17.1. Riscos explicitamente sustentados pela reunião

### Seleção incorreta de recibos

Como o operador possui liberdade para escolher quais recibos pendentes participam, uma seleção incorreta pode refinanciar uma parte diferente da dívida pretendida.

### Dependência do estado do recibo

Recibos cobrados ou remetidos não podem ser incluídos diretamente. Isso pode exigir ações anteriores de devolução ou ajuste de status, especialmente para recibos remetidos.

### Expectativa equivocada sobre número de parcelas

A escolha de um plano de 12 parcelas não garante a geração de 12 novos recibos quando a vigência restante não comporta essa quantidade, conforme o exemplo demonstrado.

### Configuração do plano de pagamento

Recursos como primeira parcela com valor ou percentual diferente dependem da configuração do plano. Logo, a operação não depende apenas da intenção do usuário.

### Dados do gestor de cobrança

A escolha de determinado gestor exige informações adicionais coerentes com esse tipo de gestor. Dados incompletos ou inadequados podem impedir a configuração correta da cobrança, embora a reunião não tenha demonstrado mensagens de erro ou validações.

---

## 17.2. Desafios derivados do contexto — análise

> **Esta seção é interpretativa. Os itens abaixo são leituras decorrentes do fluxo apresentado, não decisões ou afirmações literais dos participantes.**

### Rastreabilidade operacional

Como o processo gera cancelamentos e novos recibos, a consulta e a auditoria precisam distinguir:

- recibos originais;
- movimentos negativos de cancelamento;
- recibos constituídos pelo novo plano;
- endosso/suplemento que originou cada alteração.

A reunião sugere que o sistema preserva essa rastreabilidade, mas não demonstrou relatórios, trilhas de auditoria ou controles de aprovação.

### Complexidade de comunicação com o cliente

O fato de uma parcela original poder ser cancelada e substituída por várias novas parcelas indica a necessidade de comunicação clara sobre:

- valores cancelados;
- novos vencimentos;
- meio de cobrança;
- saldo que não participou do refinanciamento.

Essa necessidade é uma implicação operacional do processo, não uma política formal discutida na reunião.

### Dependência da parametrização

O comportamento do processo depende fortemente da definição de planos de pagamento, gestores e regras do ramo. Isso sugere que a qualidade da parametrização é determinante para o resultado operacional.

---

## 18. Mudanças de paradigma observáveis — análise

> **Esta seção apresenta uma leitura analítica sustentada pelo conteúdo, sem atribuí-la literalmente aos participantes.**

## 18.1. De cobrança rígida para refinanciamento granular

O modelo apresentado não trata a dívida da apólice como um bloco indivisível. Ele permite selecionar recibos específicos, preservando os demais.

```text
Cobrança original
↓
Seleção granular de recebíveis pendentes
↓
Refinanciamento parcial ou total
↓
Nova estrutura de cobrança
```

Isso representa uma capacidade de adaptação operacional às condições de pagamento de cada cliente.

---

## 18.2. De alteração direta para movimentos rastreáveis

Em vez de simplesmente editar o valor ou vencimento de um recibo existente, o sistema cancela o valor original e constitui novos recibos.

Essa abordagem sugere uma preocupação com a preservação do histórico de movimentos, embora a reunião não tenha explicitado os objetivos contábeis, regulatórios ou de auditoria dessa escolha.

---

## 18.3. De plano da apólice para plano aplicado à dívida selecionada

A explicação de que o novo plano pode ter a mesma configuração do plano original demonstra que o plano de pagamento não é apenas uma propriedade estática da apólice.

No contexto do suplemento, ele funciona como uma regra de redistribuição aplicada ao valor dos recibos selecionados.

---

## 19. Números e indicadores citados

| Indicador | Valor mencionado | Contexto |
|---|---:|---|
| Vigência do exemplo principal | 1 ano | Janeiro de 2023 a janeiro de 2024. |
| Recibos no plano trimestral inicial | 4 | Quatro parcelas trimestrais. |
| Valor de cada recibo inicial no exemplo | 400,00 | R-1 a R-4. |
| Recibos elegíveis no exemplo principal | 2 | R-3 e R-4, ambos pendentes. |
| Valor refinanciado no cenário com dois recibos | 800,00 | Soma de R-3 e R-4. |
| Frações do plano mensal escolhido | 12 | Plano configurado como mensal. |
| Novos recibos efetivamente gerados no cenário | 6 | Limitados pelo período restante de vigência no exemplo. |
| Valor aproximado dos novos recibos | 133,33 | Primeiro novo recibo exibido como 133,35 para ajuste do total. |
| Figuras com comissão citadas por apólice | Até 6 | Apenas o agente principal pode ser gestor de cobrança nessa modalidade. |
| Exemplo de dívida total para primeira parcela diferenciada | 1.000,00 | Plano semestral. |
| Exemplo percentual de primeira parcela | 20% | Resulta em 200,00 e 800,00. |
| Exemplo de primeira parcela fixa | 300,00 | Resulta em 300,00 e 700,00. |
| Valor demonstrado no recibo único prático | 750,00 | Valor mencionado durante a consulta no Neutron. |
| Novos recibos do primeiro teste prático | 2 de 375,00 | Conversão de uma parcela de 750,00 em duas. |
| Novos recibos do segundo teste prático | 4 de 93,75 | Redistribuição de uma única parcela de 375,00. |

> Os números acima foram declarados ou exibidos durante a reunião e não foram auditados externamente.

---

## 20. Roadmap e próximos passos citados

A reunião indicou continuidade do treinamento em sessões futuras.

### Próxima sessão técnica

O apresentador informou que a próxima sessão abordaria a visão técnica do movimento, incluindo:

- tabelas de banco de dados;
- colunas afetadas;
- linhas movimentadas;
- forma como as linhas são alteradas;
- “as tripas” do processo, conforme expressão utilizada.

### Próxima sessão sobre definição de plano de pagamento

Também foi mencionado que uma sessão posterior explicaria:

- como um plano de pagamento é definido;
- possibilidades de configuração;
- condições relacionadas a extrapolar ou não a vigência da apólice;
- habilitação de valores ou percentuais de primeira parcela.

### Suporte pós-sessão

Foi informado aos participantes que poderiam utilizar o chat para encaminhar dúvidas e comentários.

Não foram citados:

- datas das próximas sessões;
- responsáveis formais;
- cronograma de implantação;
- roadmap de produto;
- mudanças planejadas no sistema;
- prazos de evolução técnica.

---

## 21. O que a reunião não permite concluir

A transcrição e os frames não permitem determinar com segurança:

### Arquitetura e tecnologia

- tecnologia de implementação do TRON ou do Neutron;
- linguagem de programação;
- banco de dados;
- arquitetura monolítica, modular ou de microserviços;
- uso de APIs, eventos, filas ou mensageria;
- integrações bancárias concretas;
- mecanismo técnico de integração com agentes, cobradores ou cartões;
- estratégia de hospedagem, cloud ou infraestrutura.

### Segurança e conformidade

- modelo de autenticação;
- autorização por perfil;
- segregação de funções;
- mascaramento de dados bancários ou cartões;
- criptografia;
- retenção de dados;
- trilha de auditoria;
- requisitos regulatórios ou de privacidade.

### Operação e governança

- SLA para alteração de planos;
- necessidade de aprovação para refinanciamento;
- regras de elegibilidade comercial;
- tratamento de juros, multas, encargos ou impostos;
- regras de inadimplência por país;
- processos de reversão ou correção de um suplemento;
- tratamento de erros e indisponibilidade;
- governança de versões dos planos de pagamento.

### Regras funcionais detalhadas

- regra exata de arredondamento;
- tratamento de valores residuais;
- como são calculadas datas de vencimento;
- comportamento quando a data-base cai fora da vigência;
- regras completas para planos que extrapolam a vigência;
- restrições de alteração por ramo, país ou produto;
- significado técnico exato da classificação do suplemento citada de forma ambígua na transcrição.

---

## 22. Conclusões

A reunião apresentou uma capacidade funcional de refinanciamento de recibos de apólice por meio de alteração de plano de pagamento.

O processo é estruturado em torno de três princípios:

1. **elegibilidade por status:** apenas recibos pendentes entram diretamente no movimento;
2. **seleção granular:** o operador escolhe quais recibos pendentes serão refinanciados;
3. **reconstituição da cobrança:** os recibos selecionados são cancelados e seu valor é redistribuído em novos recibos conforme o plano escolhido.

A solução também permite ajustar elementos complementares de cobrança, como gestor e conta de pagamento, desde que as regras e os dados exigidos pelo tipo de gestor sejam atendidos.

A principal ressalva é que a sessão teve foco funcional e demonstrativo. Ela não detalhou a arquitetura técnica, as regras de parametrização dos planos, os controles de segurança, o modelo de auditoria ou a estrutura de banco de dados. Esses temas foram explicitamente deixados para treinamentos posteriores.
