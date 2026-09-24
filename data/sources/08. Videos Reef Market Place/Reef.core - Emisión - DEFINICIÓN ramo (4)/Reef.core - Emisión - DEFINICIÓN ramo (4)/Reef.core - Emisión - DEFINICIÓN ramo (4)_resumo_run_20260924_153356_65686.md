# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.core - Emisión - DEFINICIÓN ramo (4).mp4`
**Data de processamento:** 24/09/2026 15:39:23
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Análise Estruturada — Treinamento de Documentação Técnica do Reef.core

> **Base documental:** transcrição automática de fala e evidências visuais/OCR extraídas de telas da documentação Reef.core.  
> **Fidelidade:** este documento utiliza exclusivamente o conteúdo fornecido. Termos potencialmente distorcidos pela transcrição foram preservados ou sinalizados.  
> **Rastreabilidade:** as referências de tempo entre parênteses, como `OCR 14:12`, apontam para os frames visuais disponibilizados. A transcrição de fala não contém timestamps internos detalhados.

---

## 1. Síntese executiva

A sessão foi um treinamento técnico-funcional sobre a documentação de definição de **ramos** no sistema **Reef.core**, associado no material visual à MAPFRE. O foco não foi demonstrar a implementação técnica interna do produto, mas explicar como propriedades parametrizáveis de um ramo influenciam a emissão de apólices, orçamentos, suplementos, aplicações, cálculos de prêmio, inspeções, resseguro, cosseguro, sinistros e comportamento operacional.

A principal mensagem transmitida é que a configuração de um ramo no Reef.core é composta por diversas propriedades, muitas delas binárias ou com valores enumerados. Essas propriedades podem ter dois efeitos principais:

1. determinar diretamente o comportamento dos processos de emissão e gestão; ou  
2. habilitar, exigir ou condicionar definições adicionais — por exemplo, lógicas de negócio, configurações de cláusulas, modelos de anexos, regras de cálculo, inspeções ou integrações externas.

O treinamento percorre propriedades gerais e propriedades específicas por tipo de tratamento de negócio. São apresentados exemplos de ramos de automóvel, diversos, transportes e vida; modalidades comerciais; seguros com múltiplos riscos; ciclos de orçamento e emissão; cálculo automático ou manual de prêmio; contratos de transporte com apólice marco e aplicações; e integrações externas para resseguro e precificação dinâmica.

Também aparecem limites importantes: determinadas capacidades dependem da configuração do ramo, de lógicas customizadas da companhia ou de módulos externos. A sessão não detalha tecnologias de infraestrutura, bancos de dados, APIs, mecanismos de autenticação, cloud, SLAs ou processos de deploy.

---

## 2. Contexto e antecedentes

A apresentação ocorre no portal de documentação do Reef.core, acessado pelo navegador. O material visual mostra um ambiente de documentação com menus como:

- Página principal / Home;
- Capacitação funcional Reef;
- Capacitação técnica Reef;
- Modelo operativo Reef;
- Sessões Reef.

A apresentadora informa que o grupo está revisando a área de **definição de emissão** e, mais especificamente, o documento de configuração de **ramo**. Ela explica que a navegação pode ocorrer por diferentes tipos de negócio — citando automóveis como exemplo — e que há seções para operações de produção, emissão de apólices e orçamentos, suplementos e outras definições.

A sessão é posicionada como uma continuação de uma revisão já iniciada: várias propriedades teriam sido vistas anteriormente, e a apresentadora faz uma retomada rápida antes de avançar para novos itens. Ao final, ela indica que a definição de ramo ainda possui muitas propriedades e que a intenção era concluir o tema em uma próxima sessão, adiada por um feriado em Madrid.

---

## 3. Problema funcional tratado

O problema central não é um incidente ou falha específica. Trata-se da necessidade de configurar adequadamente o comportamento de diferentes produtos ou ramos de seguros dentro do Reef.core.

A apresentação demonstra que ramos possuem comportamentos muito distintos. Exemplos mencionados:

- uma apólice pode proteger um ou vários objetos segurados;
- uma contratação pode exigir orçamento prévio ou permitir emissão direta;
- uma apólice pode ter cálculo de prêmio automático, manual ou híbrido;
- o produto pode ter tratamento de automóvel, transportes, vida ou comportamento padrão;
- pode haver necessidade de inspeção antes da conclusão da emissão;
- a apólice pode usar numeração padrão do Reef.core ou numeração definitiva da companhia;
- o ramo pode ter cosseguro, resseguro ou gestão externa de resseguro;
- uma modificação pode ser bloqueada, advertida ou permitida conforme a existência de sinistros pendentes.

A relevância da parametrização deriva do fato de que essas decisões impactam diretamente:

- o fluxo operacional dos emissores;
- a validação e retenção de movimentos por controles técnicos;
- a estrutura de apólices, orçamentos e suplementos;
- a experiência do usuário nas telas de emissão;
- os cálculos financeiros e temporais;
- as responsabilidades entre Reef.core, regras da companhia e sistemas externos.

---

## 4. Modelo mental apresentado para a definição de ramo

A explicação sugere o seguinte modelo conceitual:

```text
Ramo de seguro
↓
Propriedades gerais e operacionais
↓
Comportamento de emissão, cálculo, sinistro e integração
↓
Definições complementares quando necessárias
   ├─ lógicas de negócio
   ├─ atributos e dados variáveis
   ├─ coberturas
   ├─ conceitos de cálculo
   ├─ cláusulas e anexos
   ├─ regras de inspeção
   ├─ quadros de cosseguro
   └─ integrações com sistemas externos
↓
Operação de orçamento, apólice, suplemento, aplicação e sinistro
```

Essa representação é uma consolidação analítica do conteúdo explicado, não um diagrama literal apresentado na reunião.

A apresentadora reforça que muitas propriedades são “marcas” que indicam “sim” ou “não”. Contudo, elas não devem ser entendidas apenas como parâmetros isolados: algumas alteram diretamente um processo, enquanto outras exigem que a companhia tenha configurado elementos adicionais para que o comportamento funcione adequadamente.

---

## 5. Identificação básica do ramo

### 5.1 Chave, nome e abreviatura

O ramo é identificado por:

- uma chave;
- um nome;
- uma abreviatura.

A apresentadora explica que, em algumas telas, será exibido o nome e, em outras, a abreviatura, dependendo do espaço disponível.

No material visual, aparecem exemplos de códigos de ramo:

| Código | Descrição | Sigla |
|---:|---|---|
| 210 | Seguro de hogar | SHO |
| 100 | Vida ahorro | VAH |

Segundo o texto visível no material, todos os ramos definidos devem estar obrigatoriamente associados a um setor e, dentro dele, a um subsetor, de acordo com a estrutura de produtos parametrizada no sistema. (`OCR 02:54`)

### 5.2 O que não é detalhado

A reunião não explica:

- qual é a estrutura de dados que armazena esses identificadores;
- como setores e subsetores são cadastrados;
- se os códigos são globais ou específicos por companhia;
- como a unicidade dos identificadores é validada.

---

## 6. Propriedades operacionais comuns

O material visual apresenta essas propriedades como aplicáveis aos ramos definidos no sistema, independentemente de seu tratamento de emissão. (`OCR 02:54`)

### 6.1 Multi-risco

A propriedade **multi-risco** determina se uma única apólice pode conter mais de um objeto segurado.

| Estado | Comportamento |
|---|---|
| Ativa | Permite vários objetos segurados na mesma apólice. |
| Inativa | Cada objeto segurado deve corresponder a uma apólice distinta. |

A explicação utiliza como referência a diferença entre uma apólice com vários riscos e uma apólice individual por objeto.

#### Implicação funcional

Essa propriedade afeta a modelagem da emissão e também outras capacidades. Mais adiante, a apresentadora esclarece que a propriedade visual de mostrar o total da apólice na etapa de coberturas só pode ser usada para ramos sem multi-risco, porque, em uma apólice com múltiplos riscos, o primeiro risco contratado ainda não necessariamente permite calcular o total definitivo da apólice.

---

### 6.2 Identificador do objeto segurado

Essa propriedade define como os objetos segurados serão descritos ou nomeados dentro das apólices do ramo.

Exemplos fornecidos:

| Ramo / contexto | Possível identificador |
|---|---|
| Automóvel | Matrícula do veículo |
| Seguro residencial ou ramos diversos | Endereço do imóvel |

O material visual registra que esse comportamento requer o desenvolvimento de uma lógica de negócio capaz de obter o nome durante os processos de emissão, segundo critérios definidos para identificar rapidamente um risco. (`OCR 02:54`)

#### Interpretação contextual

A propriedade não parece representar apenas um rótulo fixo de interface. Pela explicação, ela pode envolver uma regra que extrai ou monta a identificação a partir de atributos da apólice ou do risco.

#### Limitação

A reunião não detalha:

- a linguagem ou tecnologia usada para desenvolver essa lógica;
- como a lógica é versionada;
- como erros de identificação são tratados;
- quais atributos podem ser usados na composição do nome.

---

### 6.3 Multi-períodos

A propriedade determina como uma apólice com duração superior a um ano será tratada em termos de períodos.

| Configuração | Comportamento |
|---|---|
| Multi-períodos habilitado | Cada anualidade é considerada um período distinto. |
| Multi-períodos desabilitado | Toda a vigência pode ser considerada um único período. |

A explicação deixa claro que isso se aplica a apólices de mais de um ano e influencia a forma como a vigência é particionada pelo sistema.

---

### 6.4 Registro de hora e minuto

A propriedade permite registrar a hora e o minuto exatos da emissão de uma apólice.

A justificativa apresentada é permitir validações posteriores, especialmente em contexto de sinistro. Não são detalhadas as validações específicas, nem como esse registro é armazenado ou auditado.

---

### 6.5 Respeitar o dia de vencimento

Essa propriedade se aplica a apólices temporárias e busca garantir que a renovação preserve o mesmo dia de vencimento.

O exemplo explicado é:

- a apólice possui um vencimento associado ao dia 28;
- um cálculo de data poderia resultar no dia 29;
- com a propriedade ativada, o sistema ajusta o resultado para o dia 28, preservando o padrão de vencimento.

A reunião não detalha todos os cenários de calendário envolvidos, como meses sem o dia original, fusos horários ou regras específicas para renovação anual.

---

## 7. Cláusulas e anexos

### 7.1 Cláusulas

A propriedade de cláusulas indica se o ramo permitirá cláusulas nas apólices.

Quando essa opção é habilitada, será necessário definir posteriormente quais cláusulas existem e como se comportam. A sessão não entra na modelagem dessas cláusulas.

---

### 7.2 Anexos

Os anexos são descritos como textos livres que podem ser incluídos em uma apólice. (`OCR 05:44`)

A apresentação aborda diferentes controles relacionados:

| Propriedade | Efeito descrito |
|---|---|
| Anexos | Permite incluir texto livre na apólice. |
| Anexos por objeto segurado | Permite que os textos sejam incluídos por risco/objeto segurado, e não apenas na apólice como um todo. |
| Arrastar anexos do orçamento | Copia anexos do orçamento para novo orçamento ou apólice definitiva. |
| Anexos em vários idiomas | Permite registrar textos anexos em mais de um idioma. |
| Anexos previamente definidos | Permite usar textos-modelo ou plantilhas pré-configuradas. |

### 7.3 Anexos por objeto segurado

A distinção apresentada é:

- se essa possibilidade não estiver habilitada, os anexos ficam no nível da apólice;
- se estiver habilitada, os anexos também podem ser associados individualmente a cada risco ou objeto segurado.

### 7.4 Arrastar anexos desde o orçamento

Quando a emissão de uma apólice ocorre a partir de um orçamento que contém anexos:

| Configuração | Efeito |
|---|---|
| Ativa | Os anexos são transportados para a apólice. |
| Inativa | Os anexos não são trazidos automaticamente; precisam ser novamente digitados. |

O material visual acrescenta que os anexos copiados podem ser modificados no novo orçamento ou na nova apólice. (`OCR 05:44`)

### 7.5 Anexos em vários idiomas

A apresentadora explica que a informação da apólice normalmente é preenchida em um idioma, compatível com o usuário emissor, mas podem existir necessidades de impressão ou comunicação em diferentes idiomas.

Com a propriedade ativa, a tela permite informar versões do anexo em idiomas distintos.

### 7.6 Anexos previamente definidos

O sistema pode trabalhar com chaves de anexos associadas a textos previamente configurados. Esses textos funcionam como modelos recuperáveis durante a emissão e, segundo a explicação, ainda podem ser modificados pelo usuário.

#### Relação de causa e efeito

```text
Necessidade de repetir textos padronizados
↓
Configuração prévia de modelos de anexos
↓
Recuperação do texto durante a emissão
↓
Menor necessidade de digitação manual
↓
Possibilidade de ajuste pontual pelo emissor
```

Essa cadeia é uma reorganização do que foi explicado, não uma afirmação literal da apresentadora.

---

## 8. Orçamento, emissão e reutilização

### 8.1 Emissão de orçamento obrigatória

Quando a propriedade está ativada, a apólice não pode ser emitida diretamente. O fluxo obrigatório é:

```text
Orçamento
↓
Emissão da apólice a partir do orçamento
```

O material visual confirma que, nesse cenário, sempre deve existir um orçamento prévio para que a apólice seja emitida. (`OCR 05:44`)

### 8.2 Reutilizar orçamento

Essa propriedade determina se um mesmo orçamento pode gerar mais de uma apólice.

| Configuração | Comportamento |
|---|---|
| Ativa | Um orçamento pode ser utilizado para emitir diversas apólices. |
| Inativa | Cada orçamento gera uma única apólice. |

### 8.3 Autorização de orçamento obrigatória

A apresentadora descreve o cenário em que um orçamento fica retido por controles técnicos.

| Configuração | Consequência para emissão da apólice |
|---|---|
| Ativa | Todos os controles técnicos do orçamento precisam ser autorizados antes de utilizá-lo para emitir a apólice. |
| Inativa | A apólice pode ser emitida mesmo com controles técnicos não autorizados no orçamento; esses controles poderão aparecer na apólice e demandar autorização ali. |

#### Implicação operacional

Essa configuração desloca o ponto em que a validação precisa ser resolvida: antes da emissão definitiva, no orçamento, ou posteriormente, já no fluxo da apólice.

---

## 9. Suspensão e retomada de movimentos

A emissão pode envolver movimentos como:

- apólice;
- orçamento;
- suplemento;
- aplicação.

A apresentadora explica que esses movimentos podem ser suspensos para continuidade posterior.

### 9.1 Retomada por qualquer usuário

| Configuração | Quem pode retomar o movimento suspenso |
|---|---|
| Ativa | Qualquer usuário com o papel necessário. |
| Inativa | Apenas o usuário que suspendeu o movimento. |

O material visual reforça que, sem a propriedade ativa, somente o usuário que suspendeu o movimento poderá retomá-lo. (`OCR 08:34`)

### 9.2 Rejeitar e suspender aplicações

Para aplicações de apólices marco — tema tratado na seção de transportes — a propriedade pode permitir que uma aplicação rejeitada por controle técnico seja suspensa em vez de descartada integralmente.

O objetivo explicado é evitar que o usuário tenha de iniciar uma emissão do zero. A aplicação rejeitada e suspensa pode ser retomada e modificada.

---

## 10. Controles técnicos

### 10.1 Execução em anulação de suplementos

Por padrão, segundo a explicação, os controles técnicos não são executados em movimentos sem ação do usuário.

Na anulação de um suplemento:

- o usuário não modifica informações;
- portanto, naturalmente não haveria execução dos controles técnicos.

Quando a propriedade é ativada, o sistema deve executar essas validações mesmo em anulação de suplementos. (`OCR 08:34`)

### 10.2 Controles técnicos e inspeção

A necessidade de inspeção pode fazer com que a apólice fique retida por controle técnico até que uma inspeção seja localizada ou registrada.

Também é mencionado que lógicas de negócio podem determinar, conforme as características da apólice, se a busca por inspeção deve ocorrer já no processo de emissão ou em momento posterior.

---

## 11. Numeração de apólices e aplicações

### 11.1 Alterar numeração da apólice

O Reef.core possui uma numeração padrão de apólices. A apresentadora explica que essa numeração pode gerar saltos, por exemplo:

1. uma apólice recebe um número;
2. fica retida por controle técnico;
3. é rejeitada;
4. o número é reutilizado depois;
5. outras apólices podem ter sido emitidas no intervalo.

Em alguns contextos, inclusive legais segundo a fala, pode ser necessário que a numeração definitiva seja consecutiva.

Nesse cenário:

- o Reef.core trabalha internamente com uma numeração própria e provisória;
- no momento em que a apólice se torna definitiva, ela recebe a numeração determinada pela companhia.

O material visual também descreve esse comportamento. (`OCR 08:34`)

### 11.2 Alterar numeração em aplicações

A lógica para aplicações é diferente porque elas estão inicialmente vinculadas a uma apólice marco.

A apresentadora descreve:

```text
Apólice marco
↓
Aplicações numeradas como consecutivos vinculados à apólice marco
↓
Configuração de mudança de numeração
↓
Aplicação passa a ser uma apólice individual
↓
Deixa de ser aplicação e não é renovável
↓
Passa a possuir efeito, vencimento, recibos e suplementos próprios
```

Essa é uma consolidação fiel da explicação, com organização analítica.

---

## 12. Suplementos e motivos

### 12.1 Um ou vários motivos para suplemento

Por padrão, o processo exige capturar a causa ou o motivo de uma modificação na apólice.

Exemplos dados:

- solicitação do usuário;
- decisão da companhia;
- anulação por falta de pagamento.

| Configuração | Comportamento |
|---|---|
| Ativa | Permite selecionar mais de um motivo para o suplemento. |
| Inativa | Permite selecionar apenas um motivo. |

O material visual informa que os motivos ou causas de suplementos são codificados por razões de padronização e posterior exploração. (`OCR 08:34`)

### 12.2 Geração de registro em mudança de plano de pagamento

Uma alteração no plano de pagamento normalmente refinancia uma dívida, mas não necessariamente gera um suplemento.

Quando a propriedade está ativa:

- a alteração gera um suplemento;
- ela fica refletida na apólice;
- o suplemento é descrito como “sem movimento de prêmio”.

Há ainda uma lógica que pode modificar esse comportamento conforme condições da apólice, permitindo que a geração ocorra apenas em determinados casos.

### 12.3 Plano de pagamento em suplementos

Essa propriedade permite que um suplemento tenha plano de pagamento diferente do plano da apólice.

O efeito descrito é restrito ao valor do suplemento:

- o valor daquele suplemento gera recibos conforme o plano de pagamento do suplemento;
- isso não altera necessariamente o plano de pagamento geral da apólice.

---

## 13. Formação de modalidade

A propriedade de **formação da modalidade** define como serão obtidas, na emissão, as coberturas e outros elementos associados a elas. (`OCR 11:23`)

São apresentados três modelos.

### 13.1 Sem modalidade

Nesse modelo, todas as coberturas definidas no ramo são apresentadas no processo de emissão, e o usuário seleciona as que deseja contratar.

### 13.2 Modalidade explícita

Na modalidade explícita:

- existe um atributo que identifica a modalidade;
- o usuário conhece previamente a oferta comercial;
- ele escolhe explicitamente essa modalidade;
- a modalidade determina o conjunto inicial de coberturas oferecidas.

A apresentadora acrescenta que ainda pode haver seleção dentro do grupo de coberturas apresentado.

### 13.3 Modalidade implícita

Na modalidade implícita:

- o usuário não precisa conhecer uma chave de modalidade;
- as coberturas oferecidas são determinadas pelas respostas dadas a dois ou mais atributos;
- a modalidade funciona como uma agrupação interna resultante dessas respostas.

A apresentadora menciona duas formas de determinação:

1. por combinação dos valores dos atributos que formam a modalidade;
2. por resposta unitária, buscando coberturas com base em cada resposta dos dados.

### 13.4 Comparação resumida

| Modalidade | Como é determinada | Conhecimento do emissor |
|---|---|---|
| Sem modalidade | Todas as coberturas são exibidas | Escolhe coberturas diretamente |
| Explícita | Um atributo identifica a modalidade | Conhece e escolhe a oferta |
| Implícita | Combinação ou respostas de dois ou mais atributos | Não precisa conhecer a chave interna |

---

## 14. Formação de imagem do ramo

A apresentadora descreve que cada modificação de um ramo pode ser gravada como se fosse uma “imagem” com datas distintas.

No momento de emitir ou modificar uma apólice, é necessário determinar qual imagem do ramo será usada. São citadas três alternativas:

| Critério de busca | Explicação apresentada |
|---|---|
| Data do sistema | Usa a modificação mais próxima da data atual, mesmo que a apólice tenha outra data de efeito. |
| Data de efeito do suplemento | Busca a imagem mais próxima da data de efeito do movimento em emissão. |
| Data de efeito da apólice | Todos os movimentos da apólice usam a imagem mais próxima do efeito da própria apólice. |

### O que não é detalhado

A reunião não informa:

- como uma imagem é tecnicamente persistida;
- se alterações retroativas são permitidas;
- se imagens podem ser comparadas;
- como conflitos entre versões são resolvidos;
- se existe governança ou aprovação para publicação de uma imagem.

---

## 15. Tratamentos por tipo de negócio

A propriedade de tratamento de emissão é apresentada como orientada ao tipo de negócio. Ao definir o tratamento, indica-se que o ramo terá comportamentos e definições específicas. (`OCR 14:12`)

| Tratamento | Descrição | Comportamento citado |
|---|---|---|
| D | Diversos | Comportamento padrão do Reef.core |
| A | Automóvel | Elementos como marca, modelo, matrícula e acessórios |
| T | Transportes | Suporte a apólices padrão e apólices flutuantes com aplicações |
| V | Vida | Características relacionadas a risco sobre pessoas, modalidades, suplementos específicos, resgates e questionários |

### 15.1 Diversos

É apresentado como o comportamento padrão do Reef.core.

### 15.2 Automóvel

Possibilita trabalhar com características próprias de veículos, como:

- marca;
- modelo;
- matrícula;
- acessórios.

### 15.3 Transportes

O tratamento de transportes permite tanto apólices convencionais quanto apólices flutuantes.

#### Apólice convencional

Possui efeito, vencimento, recibos e funcionamento semelhante a uma apólice de outros ramos.

#### Apólice flutuante

A apresentadora descreve uma estrutura composta por:

```text
Apólice marco
↓
Contrato-base com vigência definida
↓
Declarações periódicas
↓
Aplicações geradas sob as condições do contrato
↓
Objetos segurados identificados nas aplicações
```

Embora seja chamado de tratamento de transportes por sua origem, a explicação indica que ele pode ser utilizado por outros ramos que necessitem de declarações periódicas.

### 15.4 Vida

O tratamento de vida incorpora capacidades relacionadas a seguros cujo risco é uma pessoa, incluindo:

- modalidades;
- suplementos específicos, como resgates;
- questionários;
- outros elementos não detalhados.

### 15.5 Tratamentos de sinistros e contábil

A apresentadora indica que uma apólice pode ter tratamento específico na emissão e comportamento diferente em sinistros ou contabilmente.

O material visual registra que o tratamento de sinistros define a tipologia ou variante do processo de gestão de sinistros e prestações aplicável às apólices do ramo, utilizando os mesmos valores apresentados para tratamento de emissão. (`OCR 14:12`)

---

## 16. Seguro de caução e gestão de fundos

### 16.1 Caução

A propriedade de caução indica que o ramo suporta operações específicas desse tipo de seguro.

O seguro de caução é explicado como aquele em que se assegura o cumprimento das obrigações assumidas pelo tomador perante o segurado. (`OCR 17:02`)

### 16.2 Gestão de fundos

A gestão de fundos só pode ser ativada quando o tratamento do ramo for Vida.

A propriedade identifica um ramo de **Unit Linked** — termo explicitamente destacado no material visual — que permite poupar e investir em fundos de investimento ou cestas de valores ao mesmo tempo em que se subscreve um seguro de vida. (`OCR 17:02`)

### O que não é possível concluir

A reunião não especifica:

- quais fundos ou ativos podem ser utilizados;
- como são calculados rendimentos;
- regras de suitability;
- integração com custodiante, gestora ou mercado financeiro;
- requisitos regulatórios;
- liquidez, resgate ou tributação.

---

## 17. Inspeções no processo de emissão

### 17.1 Associação de inspeção durante a emissão

Em alguns casos, um risco precisa de inspeção. A propriedade determina se, no próprio processo de emissão ou modificação, o sistema deve buscar uma inspeção já registrada para aquele risco.

| Configuração | Comportamento descrito |
|---|---|
| Ativa | O sistema busca, durante a emissão, uma inspeção existente que permita concluir o movimento. |
| Inativa | Se a inspeção for necessária, a apólice pode ficar retida por controle técnico; a inspeção pode ser associada depois manualmente ou quando o controle técnico for avaliado. |

### 17.2 Lógica que decide quando buscar inspeção

Mesmo que o ramo esteja configurado para buscar inspeção na emissão, uma lógica de negócio pode avaliar condições adicionais e decidir postergar essa busca em determinados casos.

### 17.3 Lógica que busca a inspeção

A associação pode ocorrer:

1. por atributos ou dados variáveis que existam tanto na apólice quanto na inspeção; ou  
2. por uma lógica específica desenvolvida pela companhia.

A apresentadora afirma que, no segundo caso, a propriedade armazena o nome dessa lógica.

### 17.4 Lógica que decide se a inspeção é exigida

Uma inspeção pode ser obrigatória em geral, mas dispensada para determinados casos, dependendo de características da apólice ou das coberturas contratadas.

A lógica avalia se a inspeção será de fato exigida. Se concluir que não, a apólice não fica retida por ausência de inspeção.

---

## 18. Declarações e aplicações em apólices marco

A apresentação estabelece uma analogia direta:

| Fluxo convencional | Fluxo de apólice marco |
|---|---|
| Orçamento | Declaração |
| Apólice | Aplicação |

Uma declaração é descrita como um orçamento de uma aplicação. A partir dela, pode ser emitida uma aplicação sob uma apólice marco.

### 18.1 Reutilização de declaração

| Configuração | Comportamento |
|---|---|
| Ativa | A mesma declaração pode gerar várias aplicações. |
| Inativa | Cada declaração gera uma única aplicação. |

---

## 19. Cosseguro e resseguro

### 19.1 Tipo de cosseguro permitido

São citadas quatro possibilidades:

| Tipo | Papel da companhia segundo a explicação |
|---|---|
| Sem cosseguro | A apólice não trabalha com cosseguro |
| Apenas cedido | A companhia atua como líder e cede participação a outras companhias |
| Apenas aceito | A companhia aceita cosseguro liderado por outra companhia |
| Cedido e aceito | Permite ambos os modelos |

A decisão concreta sobre o tipo de cosseguro da apólice é tomada durante a emissão, dentro das possibilidades permitidas pelo ramo.

### 19.2 Quadro de cosseguro obrigatório

No cosseguro, deve ser determinada a participação percentual das companhias cosseguradoras.

Essa distribuição pode ser:

- definida diretamente na apólice; ou
- recuperada de um quadro previamente configurado.

Quando o quadro é obrigatório, a distribuição deve vir de quadros predefinidos e não pode ser informada livremente na apólice.

### 19.3 Comissões externas de cosseguro

A apresentadora diferencia essas comissões das comissões de agentes. Elas correspondem a comissões que a companhia líder repercute às demais companhias cosseguradoras.

Normalmente, poderiam ser calculadas a partir da definição da apólice e dos conceitos econômicos. Porém, se houver um processo externo que determine essas comissões, a propriedade deve ser ativada e esse processo deve existir.

### 19.4 Resseguro permitido

São citadas as seguintes possibilidades:

| Tipo | Explicação fornecida |
|---|---|
| Seguro direto | A MAPFRE não atua como resseguradora |
| Resseguro aceito com contrato prévio | A distribuição do resseguro segue um contrato previamente definido |
| Resseguro aceito facultativo | A distribuição é específica para cada apólice |
| Resseguro cedido e aceito | O ramo permite ambos os sentidos |

A apresentadora enfatiza que o ramo habilita possibilidades, mas a decisão aplicável à apólice é tomada na emissão.

### 19.5 Resseguro em sistema externo

Quando a propriedade correspondente está ativa:

- as apólices do ramo não utilizam o módulo de resseguro do Reef.core;
- utilizam um módulo externo;
- a apresentadora cita o **R21** como o sistema atualmente utilizado.

> **Observação de fidelidade:** “R21” foi preservado como transcrito. A reunião não explica sua expansão, fornecedor, arquitetura, interface ou relação organizacional com o Reef.core.

### 19.6 Colocação de resseguro e controles técnicos

Há propriedades para:

- reter a apólice por controle técnico quando não for possível colocar o resseguro no sistema externo;
- tratar comportamento equivalente para sinistros;
- realizar a colocação de resseguro durante a emissão online;
- ou realizá-la de forma diferida por processo posterior.

| Modalidade | Comportamento |
|---|---|
| Online | A emissão tenta enviar diretamente as informações de resseguro à aplicação externa. |
| Diferida | O envio ocorre posteriormente, em processo separado. |

---

## 20. Sinistros pendentes e suplementos

A apresentação menciona validações ao alterar um risco por meio de suplemento.

São citadas duas situações:

- sinistros pendentes;
- sinistros não encerrados.

A lógica geral é:

```text
Movimento de suplemento em um risco
↓
Verificação de sinistro pendente ou não encerrado
↓
Configuração define se há bloqueio ou apenas aviso
↓
Usuário decide continuar, quando aplicável
```

### 20.1 Efeito da validação

| Configuração combinada | Resultado |
|---|---|
| Validação ativa + sem aviso | O movimento não pode continuar se existir sinistro na situação validada. |
| Validação ativa + com aviso | O sistema alerta o emissor, que decide se continua. |
| Validação inativa | Não há a validação descrita. |

A reunião não detalha a diferença funcional completa entre “sinistro pendente” e “sinistro não terminado”, além da existência dessas duas verificações.

---

## 21. Prêmio, temporalidade e pró-rata

### 21.1 Conceito geral

A apresentadora explica que o Reef.core usa o valor anualizado como referência para cálculos. A forma de levar esse valor à temporalidade efetiva do movimento depende das propriedades de pró-rata.

### 21.2 Pró-rata proporcional ou por escala

| Modelo | Descrição |
|---|---|
| Pró-rata | O valor anual é proporcionalizado pela duração do movimento. |
| Escala | Existe uma definição com coeficientes por dia de movimento. |

Exemplo apresentado:

- uma vigência de seis meses pode corresponder, aproximadamente, a 50% do valor anual;
- no modelo por escala, o cálculo depende do coeficiente definido para a duração específica.

### 21.3 Alterar pró-rata na emissão

Uma propriedade adicional permite decidir, na própria emissão da apólice, se o cálculo será pró-rata ou por escala.

Sem essa propriedade, o ramo já definiria diretamente o comportamento.

### 21.4 Lógica para cálculo do coeficiente

Também pode existir uma lógica que calcule o coeficiente utilizado para levar o valor anual à temporalidade do movimento.

A reunião não detalha como essa lógica é implementada nem quais dados recebe.

---

## 22. Baixa de risco como suplemento ou anulação

A apresentadora explica que, quando um risco é removido em um suplemento, o comportamento normal é tratá-lo como suplemento, aplicando as definições correspondentes.

Uma propriedade permite que essa baixa de risco seja tratada como uma anulação de apólice, utilizando os coeficientes definidos para anulação.

---

## 23. Ano comercial, ano natural e 29 de fevereiro

### 23.1 Ano de 360 ou 365 dias

O Reef.core precisa considerar, para cálculos, se o ano terá:

- 360 dias; ou
- 365 dias.

A apresentadora caracteriza:

| Base | Interpretação |
|---|---|
| 360 dias | Ano comercial; cada mês é considerado com 30 dias. |
| 365 dias | Ano natural; meses mantêm sua quantidade de dias. |

O valor anual de uma apólice continua representando um ano inteiro em ambas as convenções. A diferença aparece na proporcionalização de movimentos com duração inferior a um ano.

### 23.2 Exemplo de seis meses em 2024

Foi utilizado um exemplo de apólice de 1º de janeiro a 1º de julho de 2024, com valor anual de mil euros.

| Convenção | Dias no período conforme explicação |
|---|---:|
| Ano de 365 dias | 182 dias |
| Ano comercial de 360 dias | 180 dias |

A consequência é a alteração do coeficiente aplicado ao valor do movimento temporal.

### 23.3 Consideração do dia 29 de fevereiro

A propriedade de considerar o dia 29 de fevereiro só faz sentido quando o ano é tratado com 365 dias. No modelo de 360 dias, todos os meses possuem 30 dias e essa distinção não é relevante.

| Configuração | Tratamento de fevereiro em ano bissexto |
|---|---|
| Considerar 29 de fevereiro | Fevereiro pode ter 29 dias para o cálculo. |
| Não considerar | Fevereiro é considerado com 28 dias para esse cálculo. |

A apresentadora compara períodos de 1º de janeiro a 1º de julho de 2024 e de 2025, ambos com valor anual de mil euros:

| Cenário | Dias de vigência mencionados |
|---|---:|
| Ano bissexto, considerando 29 de fevereiro | 182 |
| Ano não bissexto | 181 |
| Ano bissexto, ignorando 29 de fevereiro | 181 |

A principal conclusão apresentada é que o valor anualizado não muda, mas o valor temporal pode mudar porque o coeficiente de vigência varia.

---

## 24. Prêmios manuais, automáticos e híbridos

### 24.1 Conceito

No Reef.core, é necessário definir:

- as coberturas;
- como a prima é calculada;
- como são calculados outros conceitos, como recargos e descontos;
- demais elementos que afetam o prêmio total de uma cobertura.

A propriedade de prêmios manuais determina se a emissão usa os cálculos definidos automaticamente ou se permite informar valores manualmente.

### 24.2 Modos de cálculo

| Modo | Comportamento |
|---|---|
| Automático | Valores não podem ser informados manualmente; o sistema usa as definições de cálculo. |
| Manual | Usuário pode informar valores de prima e conceitos. |
| Manual/automático | A escolha é realizada na apólice durante a emissão. |

### 24.3 Comportamento quando valores manuais ficam vazios

A apresentadora esclarece que cálculo manual não significa que todos os valores precisam ser obrigatoriamente digitados.

Quando um valor manual não é informado:

- o sistema recorre à definição automática correspondente;
- calcula o valor conforme as regras configuradas.

Esse comportamento é explicado tanto para o modo manual quanto para o modo manual/automático quando a apólice foi escolhida como manual.

### 24.4 Exemplo de cálculo automático

A apresentação usa três coberturas em uma apólice de seis meses:

| Cobertura / conceito | Regra anual apresentada |
|---|---|
| Cobertura 1 | Prima de 20% do capital |
| Cobertura 2 | Prima de 5% do capital |
| Cobertura 2 — recargo | 10% da prima |
| Cobertura 3 | Prima de 10% do capital |

Valores exemplificados:

| Item | Capital / base | Valor anual | Valor de movimento para seis meses |
|---|---:|---:|---:|
| Cobertura 1 | 1.000 | 200 | 100 |
| Cobertura 2 — prima | 2.000 | 100 | 50 |
| Cobertura 2 — recargo | 10% de 100 | 10 | 5 |
| Cobertura 3 | 1.200 | 120 | 60 |

### 24.5 Exemplo de cálculo manual

No exemplo, alguns valores são preenchidos manualmente:

| Item | Valor informado | Comportamento explicado |
|---|---|---|
| Cobertura 1 | Valor do movimento: 150 | Sistema calcula o anualizado: 300 |
| Cobertura 2 — prima | Valor anual: 120 | Sistema calcula o valor do movimento |
| Cobertura 2 — recargo | Sem valor informado | Sistema usa definição automática de 10% da prima |
| Cobertura 3 | Valor anual: 200 | Sistema calcula o valor do movimento |

A apresentadora enfatiza que não se informa simultaneamente o valor anualizado e o valor do movimento: ao informar um, o sistema calcula o outro.

---

## 25. Pergunta e resposta — conceitos de desgloses no cálculo manual

### Pergunta

Uma participante pergunta se, para conceitos como recargo, desconto ou elementos similares, a escolha entre cálculo automático e manual é configurada diretamente no conceito.

### Resposta

A apresentadora explica que, na tela de coberturas, é possível informar:

- a prima;
- e, em uma janela específica, os conceitos de desgloses.

Ela ressalta que, mesmo se o ramo permitir cálculo manual, alguns conceitos podem ser definidos para sempre calcular automaticamente.

O exemplo dado é o de impostos: seria lógico que impostos não fossem informados manualmente pelo usuário.

### O que isso esclarece

A configuração de “prêmios manuais” no ramo não implica liberdade manual absoluta sobre todos os componentes financeiros.

Há uma camada adicional de definição no nível dos conceitos de desgloses, que pode restringir determinados itens ao cálculo automático.

### Limitação

A sessão declara que a definição detalhada dos conceitos de desgloses seria abordada posteriormente. Portanto, não há detalhamento suficiente sobre:

- tipos de conceitos;
- precedência entre regras;
- fórmulas;
- dependências entre conceitos;
- comportamento de descontos;
- tributação;
- auditoria de alterações manuais.

---

## 26. Informar prêmio por taxa

Além de informar valores monetários, existe outra forma de entrada manual: informar uma taxa aplicada ao capital.

Essa possibilidade se aplica à prima e é apresentada como exclusiva em relação à entrada por valores.

| Estratégia | Entrada manual habilitada |
|---|---|
| Por valores | Valor anualizado ou valor do movimento |
| Por taxa | Taxa aplicada ao capital |

A apresentadora afirma que:

- se o cálculo for manual, seja configurado no ramo ou selecionado na apólice, pode-se optar por informar taxa;
- nesse caso, os campos de valor ficam desabilitados;
- a taxa informada é usada para calcular os valores;
- se a taxa não for informada, o sistema recorre à definição automática da cobertura.

No exemplo:

| Cobertura | Taxa manual informada | Resultado |
|---|---:|---|
| Cobertura 1 | 15% | Calcula prêmio anual de 150 sobre capital de 1.000 e, depois, o valor temporal |
| Cobertura 2 | Não informada | Usa a taxa configurada de 5% do capital |

---

## 27. Moedas e alteração de taxa de câmbio

O sistema permite emissão de apólices em diferentes moedas, dentro das moedas permitidas pelo ramo.

Quando uma apólice é emitida em moeda diferente da moeda local:

1. o sistema recupera a taxa de câmbio na data de emissão;
2. essa taxa relaciona a moeda da apólice com a moeda local;
3. o valor correspondente na moeda local é calculado.

### 27.1 Alteração manual da taxa

Uma propriedade pode permitir modificar, durante a emissão, a taxa recuperada pelo sistema para uma apólice específica.

A apresentadora informa que essa capacidade surgiu por solicitação de um país, sem identificar qual país.

### 27.2 Exemplo apresentado

| Item | Valor citado |
|---|---|
| Moeda local | Euro |
| Moeda estrangeira | Dólar |
| Valor da apólice | 1.000 na moeda da apólice |
| Taxa inicial exemplificada | 1,1 |
| Taxa alterada exemplificada | 1,05 |

A alteração da taxa modifica o valor da apólice quando convertido para moeda local.

### 27.3 Lógica de validação

Existe uma lógica que pode validar a alteração da taxa, por exemplo restringindo quanto ela pode variar para cima ou para baixo em relação à taxa originalmente recuperada.

Essa lógica pode:

- impedir a continuidade com erro; ou
- permitir a continuidade conforme a regra definida.

A propriedade armazena o nome da lógica de validação.

### Risco explicitamente reconhecido

A apresentadora alerta que essa opção é “sensível” e deve ser usada com cuidado, pois altera o resultado financeiro em moeda local.

---

## 28. Mostrar valores totais da apólice

Essa é uma propriedade apresentada como visual, embora a apresentadora observe que também afeta internamente a parte técnica dos cálculos.

Ela permite mostrar, na tela de coberturas, o valor total da apólice após a seleção das coberturas e a execução dos cálculos.

### Restrição principal

A propriedade só é permitida para ramos sem multi-risco.

### Justificativa

Em uma apólice com múltiplos riscos:

- o valor exibido após o primeiro risco pode não ser o valor total real;
- podem existir cálculos executados apenas depois que todos os riscos foram contratados;
- portanto, a exibição antecipada poderia induzir o usuário ao erro.

A apresentadora menciona “coberturas fictícias” como elementos utilizados exclusivamente para cálculos, executados quando todos os riscos já foram identificados.

### Interpretação contextual

A restrição parece atuar como uma proteção contra exibir um valor que ainda não representa o custo total consolidado da apólice.

---

## 29. Cálculo de conceitos de desgloses em execução batch

Essa propriedade é caracterizada como mais técnica.

O fluxo usual descrito é:

```text
Cálculo de primas de todas as coberturas
↓
Cálculo dos conceitos de desgloses para cada cobertura
```

Em algumas situações, devido a dependências de cálculo, pode ser necessário que cada cobertura processe todos os seus cálculos no mesmo ponto.

A propriedade permite alterar o local ou a ordem em que os conceitos são calculados.

A apresentadora explica que:

- no processamento batch, esse modo é o padrão citado;
- no processamento online, o comportamento não é normalmente utilizado por razões associadas a mensagem e tela;
- a propriedade deve ser ativada apenas quando houver uma necessidade clara decorrente da casuística do ramo.

### O que não é detalhado

Não foram fornecidos detalhes sobre:

- arquitetura do batch;
- filas, agendamento ou paralelismo;
- impacto de performance;
- reprocessamento;
- tratamento de falhas;
- mecanismo técnico de cálculo.

---

## 30. Precificação dinâmica

O termo transcrito aparece como algo próximo de “para ese indenámico” ou “para ese dinâmico”. Pelo contexto e pela explicação, ele parece se referir a **precificação dinâmica**. Essa normalização é uma interpretação contextual e não uma correção literal confirmada pela transcrição.

### 30.1 Funcionamento descrito

A capacidade é apresentada como um serviço externo, não pertencente ao Reef.core.

Após a contratação das coberturas:

1. o sistema executa um serviço externo;
2. o serviço reavalia o risco e as coberturas;
3. devolve uma ação e, quando aplicável, um valor;
4. o Reef.core aplica o resultado mediante configurações do ramo.

O serviço pode determinar:

- aumento de prêmio, por exemplo, 5% ou determinado valor;
- redução de prêmio;
- necessidade de autorização;
- impossibilidade de contratação do risco.

### 30.2 Cobertura fictícia

A apresentadora esclarece que o serviço não grava diretamente o diferencial em uma cobertura fictícia.

Em vez disso:

- o serviço devolve o que deve ser feito;
- no ramo, precisam existir coberturas configuradas para receber e aplicar esse resultado;
- essas coberturas podem incrementar ou decrementar valores;
- também podem resultar em controle técnico, retenção da apólice ou rejeição.

### 30.3 Lógica condicional

Uma lógica adicional pode modificar a aplicação dessa propriedade, permitindo que a precificação dinâmica seja usada apenas quando a apólice satisfizer determinadas condições.

---

## 31. Pergunta e resposta — relação com “prima proposta”

### Pergunta

Uma participante pergunta se o mecanismo funcionaria de forma parecida com algo que ela identifica como “prima proposta” existente atualmente e se geraria o diferencial nas coberturas fictícias.

### Resposta

A apresentadora responde que não se recorda exatamente de como funciona a “prima proposta”, mas esclarece que, nesse caso:

- trata-se de um serviço externo ao Reef.core;
- ele devolve a ação necessária;
- o ramo deve ter coberturas configuradas para aplicar o retorno;
- uma cobertura fictícia pode ser utilizada para aumentar, reduzir ou acionar controles técnicos;
- o serviço não grava diretamente o resultado.

### O que isso esclarece

A integração de precificação dinâmica não é apenas uma substituição automática de valor. Ela depende de uma configuração interna no ramo para interpretar e aplicar a resposta de um serviço externo.

---

## 32. Modelo de integração identificado

A reunião cita alguns padrões de integração, embora não forneça detalhes tecnológicos.

```text
Reef.core
├─ Regras e definições internas do ramo
├─ Lógicas de negócio configuradas pela companhia
├─ Controles técnicos
├─ Coberturas e conceitos de cálculo
├─ Inspeções
├─ Módulo interno ou externo de resseguro
└─ Serviços externos, como precificação dinâmica
```

### Integrações explicitamente mencionadas

| Integração / mecanismo | Finalidade |
|---|---|
| Lógica de identificação de objeto segurado | Montar nome ou identificador do risco |
| Lógica de inspeção | Determinar necessidade, busca e associação de inspeções |
| Lógica de taxa de câmbio | Validar alteração manual do câmbio |
| Processo externo de cosseguro | Calcular comissões externas, quando aplicável |
| Sistema externo R21 | Gerenciar resseguro quando configurado |
| Serviço externo de precificação dinâmica | Reavaliar risco e devolver ações de preço/aceitação |

### Limitação de arquitetura

A reunião não permite concluir se essas integrações são realizadas por:

- APIs REST;
- SOAP;
- eventos;
- mensageria;
- arquivos;
- banco de dados;
- chamadas síncronas;
- chamadas assíncronas;
- mecanismos proprietários.

A única diferenciação temporal explicitada é a de colocação de resseguro online ou diferida.

---

## 33. Modelo operacional percebido

A sessão fornece indícios de um modelo operacional configurável e governado por definições de ramo.

Elementos identificados:

- usuários emissores;
- usuários com papéis necessários para retomar movimentos;
- controles técnicos;
- autorização de controles;
- suspensão e retomada de movimentos;
- processos online;
- processos batch;
- processamento diferido;
- lógicas específicas da companhia;
- módulos externos em determinados cenários.

### Responsabilidades inferidas com cautela

Uma leitura possível é que a operação se divide entre:

| Papel / capacidade | Responsabilidade aparente |
|---|---|
| Usuário emissor | Emite, modifica, suspende e, conforme permissões, retoma movimentos |
| Usuário autorizado | Pode retomar movimentos de outros usuários quando a propriedade permitir |
| Configuração do ramo | Define comportamentos e habilita capacidades |
| Lógicas da companhia | Avaliam condições específicas e complementam regras padrão |
| Serviços externos | Realizam funções especializadas como resseguro ou precificação dinâmica |

Essa divisão é analítica; a reunião não apresenta uma matriz formal de responsabilidades.

---

## 34. Números e indicadores citados

Os números abaixo são exemplos funcionais usados durante o treinamento, e não indicadores de produção, desempenho ou volume operacional.

| Indicador / exemplo | Valor mencionado | Contexto |
|---|---:|---|
| Códigos de ramo | 210 e 100 | Seguro residencial e vida poupança no material visual |
| Modalidades de tratamento | 4 | Diversos, automóvel, transportes e vida |
| Formas de modalidade | 3 | Sem modalidade, explícita e implícita |
| Ano comercial | 360 dias | Base de cálculo |
| Ano natural | 365 dias | Base de cálculo |
| Período de seis meses em 2024 | 182 dias | Considerando ano natural e 29 de fevereiro |
| Período de seis meses em 2025 | 181 dias | Ano não bissexto |
| Prêmio anual de exemplo | 1.000 euros | Exemplo de temporalidade |
| Capital da cobertura 1 | 1.000 | Exemplo de cálculo automático |
| Taxa da cobertura 1 | 20% | Exemplo de prima |
| Capital da cobertura 2 | 2.000 | Exemplo de cálculo automático |
| Taxa da cobertura 2 | 5% | Exemplo de prima |
| Recargo no exemplo | 10% da prima | Conceito de desgloses |
| Taxa manual no exemplo | 15% | Cálculo por taxa |
| Taxas de câmbio exemplificadas | 1,1 e 1,05 | Alteração manual de câmbio |
| Ajuste de preço dinâmico exemplificado | 5% | Exemplo de incremento de prêmio |

---

## 35. Limitações reconhecidas durante a sessão

### 35.1 Limitações funcionais

- Mostrar valor total na tela de coberturas é permitido apenas para ramos sem multi-risco.
- A propriedade de considerar 29 de fevereiro só faz sentido para cálculo baseado em 365 dias.
- A gestão de fundos só pode ser ativada em ramos com tratamento Vida.
- A entrada manual por taxa e a entrada manual por valores são excludentes.
- Em cálculo manual, determinados conceitos podem continuar obrigatoriamente automáticos.
- Uma apólice com necessidade de inspeção pode ficar retida até que a inspeção seja associada.
- A numeração definitiva da companhia depende de configuração específica; sem ela, usa-se a numeração padrão do Reef.core.
- A colocação de resseguro pode depender de sistema externo.
- A precificação dinâmica depende de um serviço externo e de coberturas configuradas para aplicar sua resposta.

### 35.2 Limitações de conhecimento declaradas ou evidenciadas

- A apresentadora não recorda com precisão como funciona a “prima proposta” citada pela participante.
- O detalhe dos conceitos de desgloses não é aprofundado porque seria tratado em outra parte da capacitação.
- Diversas propriedades mencionam “lógicas de negócio”, mas a reunião não detalha seu desenvolvimento, ciclo de vida ou tecnologia.

---

## 36. Riscos e desafios

### 36.1 Riscos explicitamente mencionados

| Risco | Contexto |
|---|---|
| Taxa de câmbio manual é sensível | Alterar a taxa pode modificar o valor na moeda local |
| Exibição de total em multi-risco pode induzir ao erro | O valor exibido antes de todos os riscos e cálculos não é necessariamente definitivo |
| Numeração padrão pode apresentar saltos | Apólices retidas e rejeitadas podem afetar a sequência |
| Falta de inspeção pode reter a apólice | Necessidade de inspeção sem associação disponível |
| Falha na colocação de resseguro pode reter a apólice | Quando configurado controle técnico para esse cenário |

### 36.2 Desafios derivados do contexto

> **Análise derivada, não afirmação literal da reunião.**

1. **Governança de configuração:** a quantidade de propriedades e lógicas condicionais sugere que alterações em ramos exigem controle rigoroso, documentação e validação para evitar combinações inconsistentes.

2. **Complexidade operacional:** escolhas aparentemente simples, como habilitar uma propriedade, podem mudar quem pode retomar um movimento, quando controles técnicos são exigidos e em que etapa um processo pode ser concluído.

3. **Dependência de serviços externos:** resseguro externo e precificação dinâmica podem ampliar capacidades, mas introduzem dependências de disponibilidade, contratos de integração e interpretação de respostas.

4. **Rastreabilidade financeira:** cálculos manuais, taxas editáveis e diferentes convenções de dias aumentam a necessidade de auditoria sobre origem, justificativa e aprovação dos valores.

---

## 37. Transformações estruturais identificáveis

> **Esta seção apresenta interpretação analítica fundamentada no conteúdo da reunião.**

### 37.1 De produto fixo para produto configurável

O Reef.core é apresentado como uma plataforma em que o comportamento de um ramo não depende apenas de código estático. Ele é amplamente definido por propriedades, regras, lógicas e configurações complementares.

```text
Produto de seguro
↓
Configuração de ramo
↓
Propriedades e lógicas
↓
Fluxo operacional específico
```

### 37.2 De cálculo único para cálculo governado por contexto

A forma de calcular prêmio pode variar conforme:

- prazo;
- base de dias;
- consideração de ano bissexto;
- pró-rata ou escala;
- cálculo automático ou manual;
- entrada por valor ou taxa;
- conceitos que devem sempre ser automáticos;
- serviço externo de precificação dinâmica.

Isso revela um modelo de cálculo altamente contextualizado.

### 37.3 De emissão isolada para processo controlado

A emissão não é tratada apenas como criação de uma apólice. Ela pode passar por:

```text
Orçamento ou declaração
↓
Controles técnicos
↓
Autorização
↓
Inspeção
↓
Resseguro
↓
Suspensão / retomada
↓
Emissão definitiva
```

Nem todos esses passos são obrigatórios em todos os ramos; sua aplicação depende da configuração.

### 37.4 De módulo interno para ecossistema integrado

A reunião mostra que o Reef.core pode operar com:

- regras internas;
- lógicas específicas da companhia;
- módulo interno de resseguro;
- sistema externo de resseguro;
- serviço externo de precificação.

Isso indica uma direção de composição por capacidades, embora a arquitetura técnica das integrações não tenha sido apresentada.

---

## 38. Roadmap e próximos passos mencionados

A apresentadora informa que esperava concluir a definição de ramo na próxima semana, mas não haveria sessão no próximo “jueves” devido a feriado em Madrid.

O planejamento comunicado foi:

| Momento relativo | Atividade prevista |
|---|---|
| Próxima semana imediata | Não haveria sessão por feriado em Madrid |
| Quinta-feira seguinte | Tentar concluir a definição de ramo |
| Terça-feira posterior, se necessário | Continuar os itens restantes |

Não é possível determinar com segurança o ano ou as datas absolutas desses encontros a partir da transcrição.

---

## 39. O que a reunião não permite concluir

A sessão é rica em comportamento funcional, mas não contém detalhe suficiente sobre os temas abaixo:

### 39.1 Tecnologia e infraestrutura

- linguagem de programação do Reef.core;
- modelo de hospedagem;
- cloud utilizada;
- Kubernetes, containers ou orquestração;
- banco de dados;
- cache;
- mecanismo de execução batch;
- observabilidade;
- logs;
- monitoramento;
- tracing;
- gestão de erros técnicos;
- disaster recovery;
- alta disponibilidade.

### 39.2 Integrações

- protocolos utilizados pelo R21;
- tecnologia dos serviços de precificação dinâmica;
- APIs, eventos, mensageria ou arquivos;
- contratos de integração;
- segurança de transporte;
- mecanismos de autenticação e autorização entre sistemas;
- tratamento técnico de indisponibilidade;
- retentativas, idempotência e reconciliação.

### 39.3 Governança e segurança

- modelo de IAM;
- papéis detalhados e permissões;
- segregação de funções;
- aprovação de alterações de configuração;
- auditoria de modificações manuais;
- proteção de dados pessoais;
- conformidade regulatória;
- retenção de dados;
- políticas de acesso.

### 39.4 Operação e qualidade

- SLA;
- SLO;
- processo de incidentes;
- gestão de releases;
- CI/CD;
- testes automatizados;
- gestão de versões das lógicas;
- homologação de configurações de ramo;
- processo de migração entre imagens de ramo.

### 39.5 Negócio

- países em que cada configuração está em uso;
- produtos reais configurados;
- volumes de apólices;
- regras de aceitação;
- definição detalhada de coberturas;
- critérios de sinistro;
- regras contábeis;
- critérios financeiros para câmbio, impostos e resseguro.

---

## 40. Conclusões

A sessão apresenta a definição de ramo do Reef.core como um centro de configuração essencial para o funcionamento dos produtos de seguros. O ramo não é apenas um cadastro identificador: ele estabelece regras sobre estrutura da apólice, emissão, orçamento, modalidades, cálculos, vigências, inspeções, controles técnicos, sinistros, cosseguro, resseguro e integrações externas.

A arquitetura funcional descrita combina comportamentos padrão do Reef.core com extensibilidade por lógicas de negócio e serviços externos. Isso permite adaptar o sistema a diferentes linhas de negócio, países e regras de companhia, mas aumenta a necessidade de governança sobre configurações, cálculos e integrações.

As questões feitas pelas participantes reforçam dois pontos relevantes: primeiro, cálculos manuais continuam sujeitos a regras específicas por conceito; segundo, a precificação dinâmica não grava diretamente resultados no Reef.core, mas devolve ações que devem ser aplicadas por configurações internas do ramo.

A reunião encerra antes de concluir todas as propriedades disponíveis. Portanto, este documento deve ser entendido como uma reconstrução fiel da parte de definição de ramo efetivamente abordada, e não como uma especificação completa de todas as capacidades do Reef.core.
