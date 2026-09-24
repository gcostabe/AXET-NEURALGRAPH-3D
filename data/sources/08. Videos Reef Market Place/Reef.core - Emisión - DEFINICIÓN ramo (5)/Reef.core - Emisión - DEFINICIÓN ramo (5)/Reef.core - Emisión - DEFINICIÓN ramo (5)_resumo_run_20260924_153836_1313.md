# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.core - Emisión - DEFINICIÓN ramo (5).mp4`
**Data de processamento:** 24/09/2026 15:45:40
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Análise Estruturada — Treinamento sobre Definição de Ramos no Reef.core

## 1. Síntese executiva

A reunião foi uma sessão de capacitação funcional sobre propriedades de configuração de um **ramo** no sistema **Reef.core** — nome registrado na documentação visual como “Reef.core” e mencionado oralmente também como “RIF” ou “REIT”, aparentando ser variação ou ruído de transcrição para o mesmo produto.

O foco foi explicar como uma definição de ramo influencia o comportamento de emissão de apólices, suplementos, aplicações de transportes, prêmios, recibos, comissões, cosseguro, resseguro, controles técnicos, antifraude, inspeções, seleção de risco e contabilização.

A principal mensagem é que o ramo funciona como uma unidade de parametrização funcional: por meio de propriedades e, em alguns casos, lógicas de negócio configuráveis, a organização define regras de operação para produtos ou linhas de negócio. Essas regras podem variar por país, companhia, tipo de seguro e processo operacional.

Ao final, surgiu uma discussão adicional sobre dois temas: a integração com um sistema chamado **Reventu** — grafia incerta devido à transcrição — para resseguro; e a necessidade de suportar múltiplos pagadores ou tomadores alternativos em estruturas corporativas. Foi informado que a funcionalidade de múltiplos pagadores ainda estava em desenvolvimento.

---

## 2. Escopo e natureza da sessão

A sessão foi identificada como a quinta de uma série de treinamentos sobre Reef.core. A pessoa responsável pela apresentação declarou que faria uma revisão rápida das propriedades já discutidas e seguiria para propriedades relacionadas à geração de recibos.

A documentação visual exibida durante a reunião aparenta estar publicada no **MAPFRE Catalog Marketplace**, dentro de uma área de documentação e treinamento do Reef.core. O menu visual registra conteúdos como:

- documentação Reef;
- capacitação funcional Reef;
- capacitação técnica Reef;
- modelo operativo Reef;
- sessões Reef.

A página mostrada no vídeo tinha o título **“Definición de conceptos de emisión”** e descrevia a documentação como organizada por tipo de negócio, pois cada negócio define os elementos necessários para operar um módulo funcional.

### Tipos de negócio apresentados visualmente

A evidência visual sugere categorias como:

- multirrisco;
- automóvel;
- vida/saúde;
- transportes;
- saúde;
- lar/hogar.

Não foi explicado, na fala transcrita, se todas essas categorias são tratamentos operacionais independentes dentro do produto, taxonomias de catálogo ou apenas agrupamentos da documentação.

---

## 3. Contexto e antecedentes

A apresentação parte do pressuposto de que o Reef.core possui uma definição estruturada de ramo. Essa definição não se limita a identificar uma linha de negócio; ela determina como diversas funções do sistema se comportam.

Entre os comportamentos configuráveis abordados estão:

- composição de apólices e objetos segurados;
- emissão direta ou por orçamento;
- tratamento de períodos;
- anexos e cláusulas;
- autorização por controles técnicos;
- numeração de apólices;
- modalidades e coberturas;
- inspeção;
- aplicações em transportes;
- cosseguro e resseguro;
- cálculo de prêmios;
- emissão e cobrança de recibos;
- comissão de intermediários;
- prevenção a fraude;
- marcas de controle;
- data contábil;
- integração com serviços externos;
- desativação de ramos.

A sessão não apresenta um problema de implantação específico. Trata-se principalmente de um treinamento para explicar a lógica funcional da configuração e seus impactos operacionais.

---

## 4. Modelo mental apresentado: o ramo como núcleo de parametrização

A explicação sugere o seguinte modelo conceitual:

```text
Ramo
│
├── Identificação e características gerais
├── Regras de emissão
├── Regras de orçamento e autorização
├── Regras de versão da definição (“imagem”)
├── Regras de cálculo de prêmio
├── Regras de recibos e cobrança
├── Regras de intermediários e comissões
├── Regras de cosseguro e resseguro
├── Regras de sinistros e controles técnicos
├── Integrações externas
├── Controles de fraude e marcas
└── Regras contábeis e de comercialização
```

Essa é uma consolidação analítica das explicações dadas, e não um diagrama literal exibido durante a reunião.

Uma leitura possível é que o sistema foi desenhado para acomodar diferenças entre países, companhias e produtos de seguros sem exigir necessariamente alterações no núcleo do software. Essa leitura é sustentada pelas diversas propriedades que permitem definir numeração, cálculo, integrações, regras de cobrança e comportamento de controles técnicos por ramo.

---

## 5. Conceitos fundamentais explicados

### 5.1 Ramo

O ramo é apresentado como a estrutura pela qual se definem características e regras das apólices que serão emitidas.

A configuração do ramo inclui:

- chave e nomes de identificação;
- tipo de emissão;
- regras de coberturas;
- regras de cálculo;
- regras de recibos;
- regras de integração;
- comportamentos para sinistros, fraude, resseguro e comissões.

### 5.2 Apólice

A apólice é o contrato de seguro emitido no sistema. A reunião menciona apólices de diversos tipos, como:

- diversos;
- automóveis;
- transportes;
- vida.

A transcrição também menciona apólices marco em transportes, que funcionam como uma espécie de contrato-base para posteriores aplicações.

### 5.3 Suplemento

O suplemento é tratado como um movimento de alteração relacionado a uma apólice. Ele pode envolver, por exemplo:

- alteração de informações;
- ajuste de plano de pagamento;
- modificação de risco;
- alteração de coberturas;
- cancelamento ou anulação em determinados contextos.

### 5.4 Aplicação

No contexto de transportes, uma aplicação é descrita como a emissão vinculada a uma apólice marco, associada a uma viagem ou operação específica.

A apresentadora descreve as aplicações como algo semelhante a “miniapólices”, embora esse termo pareça explicativo e não uma definição formal da plataforma.

### 5.5 Declaração prévia

A declaração prévia é apresentada como um orçamento de uma aplicação em transportes. Dependendo da configuração, ela pode ser:

- reutilizada para emitir várias aplicações da mesma apólice marco; ou
- usada apenas uma vez para emitir uma única aplicação.

---

## 6. Propriedades gerais e de emissão

## 6.1 Multirriscos

A propriedade de multirriscos define se uma apólice pode conter vários objetos segurados ou se cada objeto deve resultar em uma apólice distinta.

### Implicação funcional

Quando multirriscos é permitido, uma única apólice pode concentrar mais de um objeto segurado. A transcrição não detalha os critérios de agrupamento, limites de objetos ou impactos em cobrança e sinistros.

---

## 6.2 Identificador do objeto segurado

Essa propriedade define como o objeto segurado será nomeado e apresentado no sistema.

A reunião não informa se esse identificador é livre, padronizado, derivado de outra entidade ou integrado a sistemas externos.

---

## 6.3 Multiperíodos

A configuração de multiperíodos se aplica a apólices com duração superior a um ano.

Quando habilitada, a vigência pode ser tratada como composta por períodos. A apresentadora usa como referência a ideia de que cada anuidade pode representar um período.

Essa configuração é relevante principalmente para:

- cálculo de recibos;
- distribuição de parcelas;
- tratamento da vigência;
- potencialmente, cálculo de prêmios e regras de negócio associadas.

---

## 6.4 Registro de hora e minutos

A propriedade permite registrar não apenas a data, mas também a hora e os minutos da emissão.

O motivo apresentado é operacional: permitir controles relacionados à comunicação de sinistros ocorridos antes da emissão da apólice.

### Relação de causa e efeito

```text
Emissão registrada apenas por data
↓
Menor precisão temporal para comparar emissão e ocorrência do sinistro
↓
Risco de disputa ou dificuldade de controle
↓
Registro de hora e minutos
```

---

## 6.5 Respeito ao dia de vencimento

Essa propriedade regula o cálculo das datas de vencimento para preservar o dia originalmente associado à apólice.

A explicação indica que ela evita que cálculos posteriores deixem de considerar o dia de vencimento inicial. A reunião não detalha como o sistema se comporta em meses sem o mesmo dia ou em anos bissextos nesse ponto específico.

---

## 6.6 Cláusulas e anexos

Foram explicadas possibilidades de uso de:

- cláusulas;
- anexos de texto livre;
- anexos por objeto segurado;
- anexos herdados do orçamento;
- anexos em múltiplos idiomas.

### Anexos por objeto

Além de anexos no nível da apólice, o sistema pode permitir anexos específicos para cada risco ou objeto segurado.

### Arraste de anexos do orçamento

Quando uma apólice é emitida a partir de um orçamento, os anexos existentes no orçamento podem ser levados para a apólice, conforme configuração.

### Anexos em vários idiomas

O sistema pode permitir registrar o mesmo texto livre em mais de um idioma. A transcrição associa isso ao idioma de comunicação usado na apólice.

---

## 6.7 Emissão obrigatória a partir de orçamento

Quando essa propriedade é habilitada, não se pode emitir uma apólice diretamente: o processo deve obrigatoriamente começar pela emissão de um orçamento.

### Implicação

```text
Emissão obrigatória por orçamento
↓
Toda apólice passa por uma etapa prévia de proposta/orçamento
↓
Maior padronização do fluxo comercial e de validação
```

A reunião não afirma que essa configuração seja obrigatória para todos os ramos.

---

## 6.8 Reutilização de orçamento

A propriedade determina se um orçamento pode gerar:

- várias apólices; ou
- apenas uma apólice.

Quando não reutilizável, cada orçamento só pode ser convertido uma vez.

---

## 6.9 Autorização obrigatória de orçamento

A sessão explica que um orçamento pode ficar retido por controles técnicos. Quando a autorização é obrigatória, esses erros ou alertas precisam ser resolvidos antes de transformar o orçamento em apólice.

Quando não é obrigatória, a emissão pode prosseguir e os controles podem reaparecer na emissão da apólice.

### Implicação

A propriedade define em que ponto do processo de negócio a organização exige a resolução dos controles técnicos:

```text
Orçamento com retenção técnica
├── Autorização obrigatória: resolver antes de emitir a apólice
└── Autorização não obrigatória: permitir avanço e avaliar novamente na apólice
```

---

## 6.10 Suspensão de movimentos e retomada por outros usuários

O sistema permite suspender a emissão de um movimento para retomá-lo posteriormente, mantendo os dados já inseridos.

A propriedade **“Póliza a disposición de cualquier usuario”**, visível na documentação e explicada oralmente, determina quem pode retomar o movimento:

- somente o usuário que o suspendeu; ou
- qualquer usuário que tenha o papel necessário.

Essa regra também é importante quando um movimento fica pendente por controle técnico e precisa ser alterado antes de seguir.

---

## 6.11 Execução de controles técnicos na anulação de suplementos

Segundo a explicação, em uma anulação de suplemento o usuário não modifica informações. Por esse motivo, os controles técnicos não seriam executados naturalmente.

A propriedade permite forçar a execução desses controles técnicos mesmo nesse tipo de operação.

A documentação exibida confirma esse comportamento: a ativação da propriedade indica que as validações técnicas devem ser executadas durante a anulação de suplementos.

---

## 6.12 Numeração própria de apólice

A propriedade de troca de numeração permite que a apólice não permaneça com a numeração padrão atribuída pelo Reef.core.

O funcionamento descrito é:

1. durante a emissão, o Reef.core trabalha com sua numeração interna ou provisória;
2. quando a apólice se torna definitiva, ela recebe uma numeração específica determinada pela companhia;
3. a apólice passa a ser gravada com essa numeração própria.

A documentação visual confirma que o Reef.core usa sua numeração de forma provisória até a apólice se tornar definitiva.

A transcrição não detalha a origem dessa numeração externa, se ela vem de integração, sequência configurada ou inserção manual.

---

## 6.13 Motivos de emissão de suplemento

Por padrão, o processo exige o registro do motivo ou causa da modificação realizada em uma apólice.

A propriedade permite determinar se a emissão de suplemento aceitará:

- um único motivo; ou
- múltiplos motivos.

---

## 6.14 Registro de alteração do plano de pagamento

Foi mencionado que uma alteração de plano de pagamento normalmente refinancia a dívida, sem necessariamente gerar um registro como suplemento na apólice.

Quando a propriedade correspondente está ativa, a alteração pode gerar um suplemento nominativo registrado na apólice.

Também foi mencionada uma lógica que pode condicionar a geração desse registro a determinadas situações.

---

## 6.15 Plano de pagamento específico em suplementos

A propriedade permite que suplementos tenham planos de pagamento diferentes do plano de pagamento da apólice.

A reunião não detalha regras de compatibilidade, restrições de parcelas ou consequências contábeis dessa diferença.

---

## 7. Modalidades, coberturas e versões de ramo

## 7.1 Formação de modalidade

A modalidade define como as coberturas podem ser agrupadas e oferecidas dentro do ramo.

Foram apresentados os seguintes modelos:

| Modelo | Explicação apresentada |
|---|---|
| Sem modalidade | Todas as coberturas são exibidas. |
| Modalidade explícita | Existe uma chave ou dado específico que identifica a modalidade. |
| Modalidade implícita | A modalidade é derivada dos valores de dados variáveis. |

### Modalidade implícita por combinação de atributos

Nesse caso, vários atributos determinam conjuntamente a modalidade. A combinação dos valores define o grupo de coberturas disponível.

### Modalidade implícita por resposta unitária de atributos

Nesse modelo, cada atributo é avaliado de forma independente. A composição dos grupos de cobertura é feita progressivamente a partir das respostas de cada atributo.

A documentação visual registra que os grupos de coberturas podem ser determinados “por el valor de cada atributo que determina la modalidad de forma independiente”.

---

## 7.2 Formação de imagem: versionamento do ramo

A reunião explica que a definição de um ramo pode mudar ao longo do tempo, por exemplo:

- inclusão ou remoção de atributos;
- inclusão ou remoção de coberturas;
- outras alterações na definição.

Cada alteração pode ser gravada como uma nova versão, identificada por data. Essa versão é denominada **imagem**.

Na emissão, o sistema precisa identificar qual imagem do ramo será usada como referência para determinar as informações aplicáveis ao movimento.

### Datas possíveis para selecionar a imagem

A documentação visual e a fala mencionam:

- data do sistema;
- data de efeito do suplemento;
- data de efeito da apólice.

O sistema busca a versão cuja data seja a menor data compatível e mais próxima da data de referência escolhida.

### Implicação analítica

O modelo apresentado indica que o Reef.core trata a definição de produto como algo temporalmente versionado. Isso permite que a mesma linha de negócio tenha regras diferentes conforme a data de vigência aplicável.

---

## 8. Tratamentos de emissão por tipo de negócio

A apresentadora cita tratamentos de emissão associados a diferentes tipos de apólice:

| Tratamento mencionado | Descrição apresentada |
|---|---|
| Diversos | Comportamento padrão. |
| Automóveis | Apólices para veículos. |
| Transportes | Pode envolver apólice marco, declarações e aplicações. |
| Vida | Mencionado como tipo de emissão. |

A transcrição também faz referência a comportamentos específicos para sinistros e contabilidade, mas sem detalhar como esses tratamentos são tecnicamente implementados.

---

## 9. Inspeções

## 9.1 Necessidade de inspeção na emissão

A configuração pode indicar que determinada apólice exige inspeção prévia.

A inspeção pode ser associada:

- durante o processo de emissão;
- posteriormente por módulo ou processo de inspeção;
- no momento de autorização da apólice.

A transcrição registra uma referência a um possível “módulo de inspeção”, mas o nome exato não está claro.

---

## 9.2 Lógica para associar inspeção

A associação pode ser feita de duas formas:

1. comparando dados variáveis da inspeção com dados variáveis da apólice;
2. por meio de uma lógica ou peça de software desenvolvida para identificar a inspeção correspondente.

A propriedade registra o nome dessa lógica quando ela existe.

---

## 9.3 Lógica de exclusão de inspeção

Mesmo em ramos nos quais a inspeção é normalmente necessária, uma lógica pode avaliar características do risco e excluir determinados casos da obrigação de inspeção.

A documentação visual registra que essa lógica pode excluir determinados riscos da necessidade de inspeção após avaliar suas características.

---

## 10. Transportes: apólice marco, declarações e aplicações

## 10.1 Reutilização de declaração prévia

Em transportes, uma declaração prévia funciona como orçamento de uma aplicação.

A configuração define se uma mesma declaração pode ser reutilizada para emitir várias aplicações da mesma apólice marco.

A documentação visual reforça que essa reutilização permite usar uma declaração anterior como modelo para emissão de aplicações.

---

## 10.2 Conversão de aplicação em apólice individual

A propriedade de troca de numeração em aplicações só pode ser ativada quando:

- o ramo utiliza tratamento de emissão de transportes; e
- o ramo está configurado para alterar a numeração da apólice.

Quando uma aplicação se torna definitiva, ela pode receber uma numeração específica da companhia e passar a operar como apólice individual.

A consequência destacada é que ela deixa de permitir novas aplicações sobre si, pois deixa de funcionar como apólice marco.

---

## 10.3 Rejeição e suspensão de aplicações

Quando uma aplicação fica pendente de autorização devido a controle técnico, a propriedade pode permitir que ela seja rejeitada e suspensa.

Isso evita a necessidade de reemitir toda a aplicação desde o início: o usuário pode retomar a emissão e modificar a informação que causou a retenção.

---

## 11. Cosseguro e resseguro

## 11.1 Cosseguro

A reunião menciona configurações para definir se o ramo permite apólices:

- sem cosseguro;
- cedidas;
- aceitas;
- cedidas e aceitas.

Os termos exatos “cedido” e “aceptado” foram afetados pela qualidade da transcrição, mas o sentido geral é a definição dos tipos de cosseguro que o ramo aceita.

### Quadro obrigatório de cosseguro

Quando o cosseguro é configurado com quadro obrigatório, as condições e participações das companhias não são inseridas livremente na emissão. Elas precisam estar previamente definidas em um quadro.

### Comissão de cosseguradores externos

A reunião menciona que as comissões destinadas a companhias cosseguradoras podem ser calculadas em processo externo, em vez de serem definidas diretamente nos conceitos de emissão.

---

## 11.2 Resseguro

Foram mencionadas opções de resseguro como:

- seguro direto;
- resseguro afetado por contratos;
- resseguro facultativo;
- definição manual do tipo de resseguro na apólice.

A transcrição tem trechos pouco claros nesse ponto; portanto, a nomenclatura e a abrangência exata das modalidades não podem ser confirmadas integralmente.

### Sistema externo para colocação de resseguro

A configuração pode indicar que a colocação de resseguro é tratada por sistema externo.

Durante a sessão, foi citado um sistema chamado **“Reventu”**, ou possivelmente termo semelhante. A grafia não é confiável por causa da transcrição automática.

A integração aparenta ter os seguintes objetivos:

```text
Reef.core
↓
Envio ou avaliação de informações de resseguro
↓
Sistema externo mencionado como “Reventu”
↓
Resultado da colocação / validação
↓
Controle técnico no Reef.core, se houver problema
```

Também foi mencionado que o envio das informações ao sistema externo pode ocorrer:

- no momento da emissão; ou
- de forma diferida.

A reunião não detalha protocolo de integração, APIs, eventos, mensageria, autenticação ou tratamento de indisponibilidade.

---

## 12. Propriedades relacionadas a sinistros

A sessão menciona validações relacionadas a sinistros durante a emissão de suplementos.

É possível validar se o risco possui:

- sinistros pendentes;
- sinistros fechados ou terminados.

Essas validações podem resultar em:

- erro impeditivo; ou
- aviso ao emissor, sem bloquear a continuidade da emissão.

A evidência visual confirma um caso no qual, ao encontrar sinistro fechado na data do movimento, o sistema pode apenas exibir aviso sem impedir a emissão do suplemento.

---

## 13. Prêmios, prorrata e cálculo

## 13.1 Prorrata

A prorrata regula como os valores associados a coberturas e conceitos de detalhamento são calculados quando a duração da apólice ou aplicação é temporal.

A documentação visual define que, quando ativa, a prorrata calcula valores proporcionalmente ao período de vigência.

Quando desativada, o cálculo é feito por meio de uma escala.

| Método | Descrição |
|---|---|
| Prorrata temporis | Cálculo proporcional ao tempo de vigência. |
| Escala | Uso de percentuais ou valores definidos para períodos/dias. |

---

## 13.2 Alteração de prorrata pelo usuário

A propriedade permite que o usuário, durante a emissão de uma apólice temporal, escolha se o cálculo será feito por prorrata ou por escala.

---

## 13.3 Lógica de coeficiente

Além da regra de prorrata ou escala, pode existir uma lógica desenvolvida para determinar o coeficiente aplicado na passagem de valores anuais para a temporalidade do movimento.

A transcrição não informa a linguagem, mecanismo de execução ou critérios técnicos usados por essa lógica.

---

## 13.4 Baixa de risco tratada como anulação

A sessão diferencia:

- anulação de apólice; e
- remoção de risco por suplemento.

Normalmente, a retirada de um risco é tratada como suplemento comum. Uma propriedade pode instruir o sistema a tratá-la como anulação de apólice para fins de cálculo.

---

## 13.5 Ano comercial e ano natural

A configuração pode definir se o cálculo considera:

- ano de 360 dias, com meses de 30 dias; ou
- ano de 365 dias, respeitando a quantidade real de dias de cada mês.

Também existe uma configuração relacionada ao tratamento de 29 de fevereiro para cálculo de coeficientes.

A explicação indica que essa propriedade não transforma necessariamente o ano de normalidade em bissexto, mas influencia o cálculo quando fevereiro está envolvido.

---

## 13.6 Prêmios manuais

O sistema permite definir se os prêmios serão:

| Modalidade | Descrição |
|---|---|
| Sempre automáticos | Calculados conforme coberturas e conceitos definidos. |
| Sempre manuais | Inseridos manualmente durante a emissão. |
| Manual/automático | Usuário pode informar valores; se deixá-los em branco, o sistema calcula automaticamente. |

Foi destacado que a configuração geral não impede que certos conceitos de detalhamento sejam definidos como automaticamente calculados, independentemente da modalidade manual permitida no ramo.

### Formas de informar prêmio manual

A apresentadora menciona que o usuário pode informar:

- o valor do movimento conforme a temporalidade;
- o valor anual;
- a taxa.

Quando a taxa é informada, o sistema pode calcular o valor anual e depois levá-lo à temporalidade do movimento.

---

## 13.7 Taxa de câmbio

Quando a moeda da apólice é diferente da moeda local, o sistema recupera a taxa de câmbio da emissão.

Se a propriedade estiver ativa, essa taxa pode ser modificada. Uma lógica pode validar a alteração, por exemplo impedindo desvios acima de determinado percentual.

O percentual e a política de validação não foram especificados.

---

## 13.8 Exibição de valores totais

A propriedade permite mostrar o valor total da apólice na tela de coberturas ao concluir a contratação.

Segundo a explicação, essa opção só pode ser selecionada quando a apólice não permite múltiplos riscos.

---

## 13.9 Preço dinâmico

A transcrição menciona um ativo ou mecanismo capaz de receber informações do risco, ajustar a tarifa e devolver uma orientação ao processo de emissão.

Esse retorno pode resultar em:

- aumento de prêmio;
- redução de prêmio;
- geração de controle técnico.

A propriedade correspondente habilita o uso desse mecanismo, e uma lógica adicional pode determinar em quais apólices ele se aplica.

A reunião não identifica o nome da ferramenta externa, a tecnologia utilizada ou os critérios atuariais desse ajuste.

---

## 14. Recibos e cobrança

## 14.1 Geração de recibos por período

A propriedade só faz sentido para ramos que suportam multiperíodos.

Quando ativa, o plano de pagamento é aplicado individualmente a cada período da apólice.

### Exemplo apresentado

Foi apresentado o seguinte cenário:

| Item | Valor |
|---|---:|
| Vigência total | 01/01/2024 a 01/09/2025 |
| Número de períodos | 2 |
| Primeiro período | 12 meses |
| Valor do primeiro período | 1.200 |
| Segundo período | 8 meses |
| Valor do segundo período | 800 |
| Valor total da apólice | 2.000 |
| Plano de pagamento | 2 parcelas |

Com geração de recibos por período, o plano de pagamento é aplicado a cada período:

- primeiro período: dois recibos de 600;
- segundo período: recibos calculados sobre 800, exemplificados como 600 e 200;
- total: quatro recibos.

Sem geração por período, o plano de pagamento é executado sobre o valor total da apólice no primeiro período:

- duas parcelas de 1.000;
- datas dos recibos concentradas no primeiro período.

A distribuição de 600 e 200 no segundo período decorre do exemplo apresentado; a transcrição não detalha a regra matemática completa usada para definir essas datas e valores.

---

## 14.2 Alteração manual de recibos

Quando habilitada, uma operação específica permite modificar recibos já gerados e definitivos.

A modificação não permite alterar:

- o valor total da apólice;
- o valor total de cada conceito associado aos recibos.

Ela permite redistribuir os valores entre parcelas.

Também é possível alterar a data de efeito dos recibos, desde que a nova data permaneça entre a data original de efeito e vencimento do recibo.

### Exemplo apresentado

A apresentadora usa o exemplo de dois recibos com prêmio de 450 cada, totalizando 900. Após redistribuição, os valores podem se tornar 500 e 400, desde que a soma continue sendo 900.

A mesma lógica se aplica a bonificações e demais conceitos: os valores podem ser redistribuídos, mas a soma total de cada conceito deve ser preservada.

---

## 14.3 Estados do recibo

A reunião apresentou os seguintes estados:

| Estado | Significado informado |
|---|---|
| Emitido pendente | Recibo foi emitido, mas ainda não foi colocado para cobrança/pagamento. |
| Remessado | Recibo chegou ao momento de cobrança, foi enviado ao banco, cliente ou disponibilizado para pagamento. |
| Cobrado | Recibo foi pago ou cobrado. |

A explicação menciona um processo de tesouraria que coloca os recibos em estado remessado quando chega o momento adequado.

---

## 14.4 Remessa de recibos na emissão

Por padrão, caso a propriedade não esteja ativa, os recibos emitidos saem como **emitidos pendentes**.

Quando ativa, os recibos cuja data de efeito seja menor ou igual à data de emissão podem sair já remessados.

### Exemplo apresentado

A data considerada no exemplo era 01/05/2025. Em uma apólice com quatro parcelas:

- recibos com efeito em 01/01 e 01/04 já poderiam ser remessados;
- recibos com efeito em 01/07 e 01/10 não seriam remessados naquele momento.

Também pode haver lógica adicional para decidir se os recibos devem ser remessados.

Um exemplo de regra citado foi:

- emissão em escritório: recibo pode ser remessado imediatamente;
- emissão por canal telefônico: a regra poderia ser diferente.

---

## 14.5 Emissão sem recibos

Em regra, a emissão de apólices gera recibos. A propriedade permite exceções.

O caso principal apresentado foi o de transportes:

- uma apólice marco pode cobrar um prêmio de depósito e, nesse caso, ter recibo;
- alternativamente, a apólice marco pode funcionar apenas como contrato-base;
- nesse segundo caso, os recibos são gerados nas aplicações, conforme cada viagem declarada;
- portanto, a apólice marco pode ser emitida sem recibos.

Uma lógica adicional pode avaliar se a emissão sem recibos é permitida em cada caso. O exemplo fornecido foi verificar se uma apólice marco possui ou não prêmio de depósito.

---

## 14.6 Cobro de recibos a partir da emissão

A funcionalidade pode permitir chamar o processo de cobrança diretamente da emissão, sem o usuário precisar sair para uma área de tesouraria ou operações de recibos.

Entretanto, o emissor precisa possuir papel de **caixa** para realizar operações de tesouraria.

### Implicação de segurança funcional

```text
Permissão de emissão
≠
Permissão automática de cobrança

Permissão de cobrança durante a emissão
↓
Exige que o usuário também tenha papel de caixa
```

---

## 15. Intermediários e comissões

## 15.1 Quadros de comissão versionados

Os quadros de comissão são apresentados como estruturas que agrupam percentuais aplicáveis ao cálculo de comissões segundo tipos de intervenção.

Eles também possuem versões por data, de forma independente das versões do ramo.

A configuração define qual data será usada para localizar a versão aplicável do quadro de comissão:

- data de efeito do suplemento;
- data de efeito da apólice;
- data de emissão;
- data contábil do movimento.

### Implicação

O ramo e o quadro de comissão podem evoluir em ritmos independentes. Isso permite, ao menos conceitualmente, alterar percentuais de comissão sem necessariamente mudar a definição integral do ramo.

---

## 15.2 Data contábil

A data contábil é a data na qual um movimento será contabilizado.

Foi explicado que:

- há um fechamento mensal;
- o fechamento define ou atualiza uma data contábil/de processo;
- cada movimento registra sua própria data contábil;
- essa data pode ser usada, entre outros fins, para selecionar a versão do quadro de comissão.

A sessão não detalha o comportamento em reabertura de períodos, lançamentos retroativos ou regras de auditoria.

---

## 15.3 Quantidade máxima de agentes

A apresentação menciona até seis figuras de intervenção:

| Figura | Condição informada |
|---|---|
| Agente principal | Obrigatório. |
| Organizador | Pode estar associado ao agente principal. |
| Assessor | Pode estar associado ao agente principal. |
| Até três agentes secundários | Opcionais. |

A propriedade de quantidade máxima de agentes considera o agente principal e agentes secundários. O valor máximo informado é quatro:

- um agente principal;
- até três agentes secundários.

Organizador e assessor não entram nessa contagem.

---

## 15.4 Alteração da oficina de imputação

Agentes possuem uma oficina associada, relacionada à estrutura comercial. Essa oficina é gravada na apólice.

Quando a propriedade está ativa, o usuário pode alterar, na emissão, a oficina de imputação sugerida pelo agente.

Isso permite que um agente comercialize apólices vinculadas a diferentes escritórios ou estruturas comerciais.

---

## 15.5 Alteração de organizador e assessor

Organizador e assessor podem ser recuperados automaticamente a partir da definição do agente principal.

A configuração permite que, durante a emissão, o usuário:

- remova essas figuras para uma apólice específica;
- substitua-as por outras figuras.

---

## 15.6 Distribuição de comissão por parcela

Normalmente, a distribuição de comissão segue uma regra uniforme entre as figuras de intervenção.

Com a propriedade de modificação de comissão por intervenção em parcela, é possível definir, para cada parcela e para cada tipo de intervenção, qual percentual da comissão será pago.

### Exemplo apresentado

Para um plano de pagamento com duas parcelas:

| Figura | Parcela 1 | Parcela 2 |
|---|---:|---:|
| Agente principal | 100% | 0% |
| Organizador | 0% | 100% |
| Assessor | 50% | 50% |

O exemplo é didático e não representa uma regra padrão universal.

---

## 15.7 Alteração manual de comissões

Assim como ocorre com os valores de recibos, é possível redistribuir comissões entre parcelas já geradas.

A restrição é preservar o total de comissão de cada figura:

- agente principal;
- assessor;
- organizador.

Não é permitido alterar o total devido a cada participante; apenas sua distribuição entre parcelas.

---

## 15.8 Comissão de nova produção e comissão de carteira

Os quadros de comissão podem definir percentuais diferentes para:

- nova produção: vigência inicial da apólice e movimentos nesse período;
- carteira: movimentos após a primeira renovação.

A propriedade “respeitar comissão de carteira” define se o sistema usará os percentuais específicos de carteira após a renovação.

Quando não selecionada, a explicação indica que os percentuais de nova produção podem continuar sendo usados durante toda a vida da apólice.

---

## 16. Controles de fraude e marcas

## 16.1 Integração com Platea

Foi mencionada uma aplicação chamada **Platea**, responsável por avaliar riscos para identificar possível fraude.

A integração pode ser usada tanto em:

- emissão;
- sinistros.

O fluxo descrito é:

```text
Processo de emissão ou sinistro
↓
Envio das informações para Platea
↓
Avaliação de possível fraude
↓
Retorno de grau/resultado de fraude
↓
Definição de ação no Reef.core
```

O Reef.core precisa ser configurado não apenas para chamar Platea, mas também para decidir o que fazer com o retorno.

Entre as possíveis respostas mencionadas estão:

- gerar controle técnico;
- impedir emissão;
- permitir ou aplicar outra decisão definida pela organização.

A reunião não detalha critérios de score, protocolo de integração, regras de privacidade ou responsabilidades pela decisão final.

---

## 16.2 Controle por marcas

As marcas são dados configurados no sistema para registrar fatos que precisam ser controlados.

Elas podem ser aplicadas a:

- terceiros;
- apólices;
- possivelmente outros elementos, embora isso não tenha sido detalhado.

A apresentação descreve dois modos de atuação:

| Tipo | Funcionamento |
|---|---|
| Proativo | Avalia marca antes da emissão de uma nova apólice. |
| Reativo | Avalia marcas sobre apólices já existentes e decide o que fazer. |

### Exemplo citado: alcoolemia

Foi apresentado um exemplo de uma marca relacionada a álcool ou alcoolemia:

1. um terceiro registra resultado positivo em controle de alcoolemia;
2. esse fato gera marca;
3. ao emitir uma apólice envolvendo esse terceiro, a organização pode decidir não fazer nada, aplicar ação ou impedir a emissão;
4. para apólices existentes, a organização pode tomar ações como cancelar a apólice ou emitir suplemento para retirar cobertura.

A reunião ressalta que a decisão depende de fatores como a gravidade da ocorrência.

### Vigência das marcas

Há uma propriedade que define por quantos anos o processo deve considerar o histórico de marcas. Foram citados exemplos como:

- um ano;
- três anos;
- cinco anos.

Esses valores foram exemplos, não definição padrão informada.

---

## 17. Ramos reais e ramos fictícios

A apresentadora explicou que certos ramos podem ser definidos apenas para servir como referência de configurações comuns.

Esses ramos fictícios:

- não são comercializados;
- não devem aparecer entre os ramos disponíveis para emissão;
- podem concentrar definições aplicáveis a diversos ramos que não possuam configuração específica.

A explicação sugere uma estratégia de reutilização de parametrização:

```text
Definição específica existe para o ramo?
├── Sim: aplicar a definição específica
└── Não: aplicar a definição associada ao ramo fictício/comum
```

Essa é uma interpretação do exemplo fornecido. A transcrição não descreve formalmente a regra de precedência.

---

## 18. Obtenção da data contábil

A sessão retorna ao tema da data contábil para explicar como ela pode ser determinada para um movimento.

Entre os critérios mencionados:

- maior data entre a data contábil e a data de emissão do último suplemento;
- maior data entre a data contábil e a data de efeito do suplemento;
- determinação por objeto ou lógica de negócio.

A apresentadora esclarece que “objeto”, nesse contexto, é uma peça de software ou lógica de negócio.

### Exemplo de motivação

Caso o mês anterior ainda não esteja fechado, pode ser desejável contabilizar determinado suplemento no mês atual se sua data de efeito for posterior à data contábil ainda vigente.

A transcrição não permite concluir quais políticas contábeis devem ser adotadas, apenas que o sistema suporta diferentes critérios de determinação.

---

## 19. Serviço externo de seleção de risco

A seleção de risco é descrita como um processo que avalia o risco a ser contratado.

O exemplo mais claro foi o de seguros de vida, nos quais formulários de saúde podem ser usados para avaliar a aceitação do cliente, das coberturas ou da própria apólice.

Segundo a apresentação, essa seleção pode ser feita:

- internamente no Reef.core, usando dados variáveis; ou
- por integração com uma aplicação externa especializada.

A apresentadora afirma que a capacidade interna do Reef.core é mais limitada nesse aspecto, pois se baseia principalmente em dados variáveis.

Quando há serviço externo:

1. a propriedade indica que o ramo utiliza esse serviço;
2. uma lógica de negócio define em quais condições ele será chamado;
3. o serviço externo devolve a orientação ou decisão aplicável.

A transcrição não informa o nome do serviço, os critérios médicos ou atuariais, nem como a decisão externa é registrada ou auditada.

---

## 20. Desabilitação de ramo

A marca de habilitação permite indicar que um ramo não está mais habilitado para novas emissões.

Nesse caso:

- não devem ser emitidas novas apólices nesse ramo;
- apólices vigentes existentes continuam sendo mantidas.

A explicação representa uma descontinuação comercial controlada, sem necessariamente encerrar ou migrar contratos existentes.

---

## 21. Perguntas e respostas relevantes

## 21.1 Integração com “Reventu” para resseguro

### Pergunta

Uma participante pergunta se o Reef.core está integrado a um sistema referido na transcrição como “Reventu” e menciona que esse sistema possui diversas funcionalidades relacionadas ao resseguro.

Também comenta que uma equipe da Espanha está trabalhando no tema de fracionamento de pagamentos, pois os movimentos de recibos são relevantes para essa integração.

### Resposta

A apresentadora confirma que existe integração e explica que o ramo pode indicar se o resseguro será tratado por esse sistema.

No entanto, ela declara não dominar profundamente a parte de resseguro e direciona a participante para um responsável chamado **Javier Brau / Brau Zapata**, grafia parcialmente incerta, que acompanha o tema.

A apresentadora acrescenta que houve mais avanço na integração com o sistema externo do que na funcionalidade de resseguro dentro do Reef.core, especialmente em uma parte da transcrição que parece se referir a sinistros ou outro módulo; esse trecho não está suficientemente claro para interpretação definitiva.

### O que a resposta esclarece

- Existe uma integração de resseguro com sistema externo.
- O assunto possui dependências funcionais relacionadas a recibos e fracionamentos.
- O conhecimento sobre a evolução não estava centralizado na apresentadora.
- A reunião não fornece status, cronograma, escopo funcional fechado ou arquitetura detalhada dessa integração.

---

## 21.2 Tomadores alternativos e múltiplos pagadores

### Pergunta

A participante relata uma necessidade para grupos grandes, como cadeias de supermercados, em que cada unidade ou estabelecimento possa administrar seus próprios recibos e respectivos fracionamentos.

Ela afirma que, em uma implementação anterior, foram criadas apólices em outro ramo, relacionadas à apólice principal, para permitir que tomadores alternativos fossem tratados separadamente.

Também menciona que essa solução aumenta a complexidade, especialmente para enviar todos os recibos relacionados a uma apólice principal ao sistema externo de resseguro.

### Resposta

A apresentadora informa que há uma figura de **pagador** sendo desenvolvida.

Segundo a resposta:

- atualmente existe suporte a um único pagador;
- está em desenvolvimento o suporte a múltiplos pagadores;
- a intenção é que os recibos possam ser associados a cada pagador.

A apresentadora não confirma que essa funcionalidade resolverá integralmente o cenário relatado. Ela solicita que a participante descreva o caso detalhadamente no canal RIF Academy para que as opções sejam avaliadas.

### O que a resposta esclarece

- O cenário de múltiplos responsáveis financeiros ainda não está plenamente resolvido no produto.
- A solução baseada em apólices relacionadas foi descrita pela participante como complexa e não ideal.
- Há uma funcionalidade em desenvolvimento que pode atender parte da necessidade, mas não havia confirmação de disponibilidade, data ou aderência total ao caso.

---

## 22. Limitações reconhecidas

| Tema | Limitação ou ressalva |
|---|---|
| Resseguro | A apresentadora declara não conhecer profundamente a parte de resseguro. |
| Integração com “Reventu” | Não foram apresentados arquitetura, status, contrato de integração ou roadmap. |
| Seleção de risco interna | A capacidade nativa do Reef.core foi descrita como limitada e baseada em dados variáveis. |
| Múltiplos pagadores | A funcionalidade ainda estava em desenvolvimento. |
| Tomadores alternativos | Não foi apresentada solução padrão definitiva para o caso descrito. |
| Lógicas de negócio | Diversas propriedades dependem de lógicas externas ou “objetos”, sem detalhes de implementação. |
| Platea | Não foram explicados critérios de fraude, pontuação, regras de decisão ou governança do modelo. |
| Marca de controle | Foram apresentados exemplos, mas não o modelo completo de gestão, segurança e auditoria das marcas. |
| Integrações externas | Não foram detalhados protocolos, formatos, retentativas, monitoramento ou tratamento de falhas. |

---

## 23. Riscos e desafios

## 23.1 Riscos explicitamente sustentados pela reunião

### Dependência de lógicas específicas

Muitas decisões importantes dependem de lógicas de negócio configuráveis, tais como:

- remessa de recibos;
- exclusão de inspeção;
- seleção de risco externa;
- alteração de taxa de câmbio;
- determinação de data contábil;
- habilitação de preço dinâmico;
- emissão sem recibos.

Isso evidencia que a configuração funcional pode depender de desenvolvimento adicional.

### Complexidade operacional de recibos e comissões

A possibilidade de redistribuir:

- valores de recibos;
- datas de efeito;
- comissões;
- distribuição de comissão por parcela;

exige controles operacionais sólidos para preservar consistência financeira.

### Evolução incompleta de múltiplos pagadores

O caso de tomadores alternativos mostra que organizações com estruturas empresariais complexas podem precisar de soluções temporárias enquanto a funcionalidade de múltiplos pagadores não está disponível.

---

## 23.2 Desafios derivados do contexto — análise

Os pontos abaixo são interpretações analíticas sustentadas pela estrutura apresentada, não afirmações literais dos participantes.

### Governança de parametrização

A quantidade de propriedades e lógicas indica que a governança da configuração é relevante. Configurações inadequadas podem afetar simultaneamente emissão, cobrança, comissões, controles técnicos e contabilidade.

### Rastreabilidade de regras temporais

Como ramos e quadros de comissão podem possuir versões por data, torna-se importante saber:

- qual versão foi aplicada;
- por qual data ela foi selecionada;
- em qual momento a configuração mudou.

A reunião explica a existência dessas versões, mas não detalha mecanismos de auditoria ou rastreabilidade.

### Coordenação entre produto, negócio e tecnologia

A reunião mostra que várias decisões não são estritamente técnicas. Exemplos:

- política de cobrança;
- distribuição de comissão;
- aceitação de risco;
- ação diante de fraude;
- critérios para inspeção;
- tratamento de pagadores.

Isso indica que a parametrização exige participação coordenada entre áreas de negócio, operação, finanças, risco, tecnologia e possivelmente resseguro.

---

## 24. Transformações estruturais observáveis

## 24.1 De comportamento fixo para comportamento configurável

A reunião descreve um sistema no qual muitas regras são ajustáveis por ramo, em vez de serem universais.

Exemplos:

```text
Regra única para todos os produtos
↓
Configuração por ramo
↓
Variação por tipo de negócio, companhia ou contexto operacional
```

Essa leitura é sustentada pela quantidade de propriedades específicas explicadas.

---

## 24.2 De definição estática para definição versionada

A noção de “imagem” indica que o ramo evolui ao longo do tempo e que o sistema precisa selecionar a versão correta durante a emissão.

```text
Definição única e permanente
↓
Versões datadas da definição de ramo
↓
Aplicação conforme data de referência do movimento
```

---

## 24.3 De cálculo exclusivamente interno para decisões apoiadas em serviços externos

Foram citados serviços externos para:

- colocação de resseguro;
- seleção de risco;
- prevenção a fraude;
- possivelmente preço dinâmico.

Isso sugere um modelo no qual o Reef.core atua como núcleo operacional e orquestrador de decisões que podem ser tomadas por capacidades externas especializadas.

Essa é uma leitura analítica; a transcrição não apresenta uma arquitetura formal de orquestração.

---

## 24.4 De apólice como entidade isolada para ecossistema de movimentos

A sessão evidencia que a operação de uma apólice envolve diversos movimentos e entidades associadas:

```text
Apólice
├── Orçamento
├── Suplementos
├── Coberturas
├── Objetos segurados
├── Recibos
├── Comissões
├── Intermediários
├── Inspeções
├── Sinistros
├── Resseguro
├── Marcas
└── Controles técnicos
```

Essa representação é analítica e consolida os elementos tratados na capacitação.

---

## 25. Números e indicadores citados

| Indicador ou limite | Valor mencionado | Contexto |
|---|---:|---|
| Sessão do treinamento | 5ª sessão | A apresentadora afirma que a reunião era a quinta sessão. |
| Agentes secundários | Até 3 | Além do agente principal. |
| Máximo de agentes na propriedade | 4 | Agente principal + até três secundários. |
| Figuras de intervenção mencionadas | Até 6 | Principal, organizador, assessor e até três secundários. |
| Exemplo de períodos | 2 | Apólice multiperíodo apresentada. |
| Exemplo de valor total da apólice | 2.000 | Exemplo de recibos por período. |
| Primeiro período do exemplo | 1.200 | Exemplo de 12 meses. |
| Segundo período do exemplo | 800 | Exemplo de 8 meses. |
| Plano de pagamento do exemplo | 2 parcelas | Exemplo de geração de recibos. |
| Recibos no cenário por período | 4 | Dois para cada período, no exemplo. |
| Recibos no cenário sem divisão por período | 2 | Parcelas de 1.000 no primeiro período, no exemplo. |
| Exemplo de prêmio redistribuído | 900 | Dois recibos de 450 redistribuídos sem alterar o total. |
| Janela de marcas | 1, 3 ou 5 anos | Valores exemplificativos, não padrão obrigatório. |

Esses números foram mencionados como exemplos didáticos durante a reunião e não devem ser interpretados como parâmetros universais ou auditados.

---

## 26. Evidências visuais relevantes

As telas extraídas do vídeo reforçam alguns pontos abordados oralmente:

| Frame | Tempo | Evidência |
|---|---:|---|
| Frame 04 | 15:48 | Página “Definición de conceptos de emisión”, tipos de negócio e estrutura de documentação do Reef.core. |
| Frame 05 | 19:44 | Propriedades sobre autorização de orçamento, retomada de movimento por usuários, controles técnicos em anulação de suplemento e numeração própria de apólice. |
| Frame 06 | 23:40 | Formação de modalidade e formação de imagem por versões datadas do ramo. |
| Frame 07 | 27:35 | Reutilização de declaração prévia, mudança de numeração em aplicações e suspensão de aplicações. |
| Frame 08 | 31:31 | Prorrata e possibilidade de escolher prorrata ou escala. |

As evidências visuais mostram documentação em espanhol. Algumas expressões orais divergentes decorrem provavelmente da transcrição automática e não devem ser usadas para redefinir os nomes oficiais exibidos nas telas.

---

## 27. O que a reunião não permite concluir

A reunião não detalha suficientemente os seguintes assuntos:

- tecnologia de implementação do Reef.core;
- linguagem de programação;
- modelo de hospedagem ou cloud;
- bancos de dados;
- APIs, contratos, formatos ou protocolos de integração;
- mensageria, eventos ou processamento assíncrono;
- mecanismo técnico das “lógicas” ou “objetos” de negócio;
- CI/CD, versionamento de código ou promoção de configurações;
- gestão de acessos, IAM ou segregação de funções além do exemplo do papel de caixa;
- trilhas de auditoria;
- requisitos de LGPD, privacidade ou retenção de dados;
- políticas de segurança para integrações externas;
- SLA, disponibilidade, recuperação de desastre ou continuidade;
- governança de mudança de versões de ramos;
- estratégia de testes para configurações;
- modelo de monitoramento de integrações;
- regras detalhadas de contabilização;
- roadmap com datas para múltiplos pagadores;
- escopo completo da integração com “Reventu”;
- definição formal de como Platea calcula risco de fraude;
- política completa para ações derivadas de marcas de controle.

---

## 28. Conclusões

A reunião apresenta o Reef.core como uma plataforma fortemente orientada à parametrização funcional de seguros. O ramo é o principal ponto de controle para determinar como produtos operam, desde a emissão até cobrança, comissão, fraude, resseguro, inspeção e contabilização.

A capacidade de configurar versões por data, regras por tipo de negócio, integrações externas e lógicas condicionais indica uma solução voltada a cenários heterogêneos entre produtos, países e companhias. Ao mesmo tempo, essa flexibilidade introduz dependência de governança, desenho cuidadoso de regras e domínio funcional por parte das equipes responsáveis pela parametrização.

Os exemplos de transportes, recibos multiperíodo, distribuição de comissões e múltiplos pagadores mostram que o comportamento do sistema depende não apenas de uma propriedade isolada, mas da combinação entre configuração do ramo, lógica de negócio, processo operacional e integrações externas.

Por fim, a discussão sobre resseguro e múltiplos pagadores revela que existem capacidades em evolução e cenários ainda não inteiramente resolvidos. Em especial, o suporte a múltiplos pagadores era explicitamente descrito como funcionalidade em desenvolvimento, sem cronograma ou confirmação de disponibilidade na reunião.
