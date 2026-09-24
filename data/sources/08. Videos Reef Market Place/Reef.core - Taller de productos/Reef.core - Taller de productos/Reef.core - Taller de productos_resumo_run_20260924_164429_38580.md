# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.core - Taller de productos.mp4`
**Data de processamento:** 24/09/2026 16:50:08
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Análise estruturada — MAWDY Taller de Productos

## 1. Síntese executiva

A sessão apresentou o **MAWDY Taller de Productos**, uma aplicação em desenvolvimento destinada a configurar produtos, ramos e elementos relacionados ao domínio segurador para posterior uso nas aplicações de emissão. Segundo o apresentador, o sistema é uma evolução do antigo **Generador de Productos**, preservando boa parte de sua funcionalidade, mas introduzindo uma arquitetura mais atual e desacoplada do core.

O problema central tratado foi a necessidade de administrar configurações de produtos de forma mais flexível, centralizada e reutilizável. No modelo anterior, a configuração estava diretamente associada ao core e à base Oracle. No novo modelo, o Taller mantém definições fora dessa base e permite, posteriormente, exportá-las para a instância correspondente do core, onde poderão ser utilizadas em emissão.

A apresentação também mostrou que o Taller não se limita ao core baseado em Oracle. Ele foi concebido para suportar ativos pertencentes ao ecossistema mencionado na reunião como “RIF”, “RIS” ou termos semelhantes — a transcrição automática não preserva com segurança a nomenclatura exata — inclusive ativos cujas informações residem em outros repositórios, normalmente MongoDB segundo a fala.

A implementação demonstrada está contextualizada no projeto de integração entre **MAWDY** e o core referido na reunião. A primeira companhia indicada para implantação dentro de MAWDY é a **República Dominicana**. O ambiente apresentado era de pré-produção, com suporte a múltiplos âmbitos/bases e múltiplas companhias.

A principal mensagem da reunião é que o Taller de Productos representa uma mudança de modelo: a configuração deixa de ser tratada exclusivamente como manutenção diretamente vinculada a uma base operacional e passa a ser gerida em uma ferramenta dedicada, com controles de acesso, documentação integrada, mecanismos de importação, exportação, replicação e evolução funcional ainda em curso.

---

## 2. Escopo, fontes e cuidados de interpretação

Esta análise foi produzida exclusivamente a partir de:

- transcrição automática da apresentação;
- evidências visuais extraídas de telas e slides;
- perguntas e respostas ocorridas ao final da sessão.

Há termos que sofreram degradação pelo reconhecimento de voz. Em particular, a transcrição alterna referências como “RIF”, “RIS”, “Rive”, “Riff”, “core de RIF” e “RIF Academy”. Como não há base suficiente para corrigir oficialmente a nomenclatura, este documento usa:

- **core referido na reunião**: quando a identificação exata não é indispensável;
- **RIF/RIS**: quando é preciso reproduzir a designação incerta encontrada na transcrição;
- **RIF Academy**: grafia contextual provável para a documentação citada pelo apresentador, mas não confirmada formalmente.

Da mesma forma, alguns nomes de ambientes e regiões aparecem possivelmente deformados, como “MPL”, “MDE”, “Prelatam”, “TAMI” e “EMEA”. Quando há evidência visual, os nomes foram preservados conforme registrados nas telas.

---

## 3. Contexto e antecedentes

### 3.1. Origem da iniciativa

O Taller de Productos foi apresentado como uma evolução do antigo **Generador de Productos**, solução existente “de toda a vida”, segundo o apresentador. A motivação declarada é modernizar essa capacidade sem abandonar o conjunto de funcionalidades que já era necessário ao negócio.

O desenvolvimento do novo ativo ocorre há aproximadamente **um ano e meio ou mais**, segundo a estimativa verbal apresentada. A funcionalidade herdada do gerador é relevante porque o objetivo continua sendo permitir a definição de produtos e ramos que possam ser empregados posteriormente nos processos de emissão.

### 3.2. Contexto do apresentador

O apresentador se identificou como **Germán** e relatou atuar há anos como analista ligado à emissão do core mencionado. Mais recentemente, passou a participar:

- do projeto de integração entre **MAWDY** e o core;
- da análise funcional do novo ativo denominado Taller de Productos.

Essa combinação ajuda a explicar a ênfase da demonstração: a aplicação é apresentada tanto como evolução funcional do configurador existente quanto como elemento de integração para o contexto MAWDY.

### 3.3. Estado atual da solução

A aplicação foi descrita como extensa e ainda em construção. O apresentador foi explícito ao afirmar que:

- novas funcionalidades continuam sendo adicionadas;
- incidências estão sendo resolvidas;
- alguns comportamentos ainda estão sendo ajustados;
- existem entidades recentes no modelo de dados que ainda precisam ser incorporadas à interface;
- parte do roadmap permanece em desenvolvimento.

Portanto, a apresentação não descreve um produto funcionalmente encerrado. Ela descreve uma plataforma em consolidação, já utilizada como base de trabalho para a integração de MAWDY.

---

## 4. Problemas identificados

### 4.1. Acoplamento da configuração ao core e à base Oracle

O antigo modelo é descrito como ligado ao core e à sua base de dados. O Taller busca separar a definição do produto da persistência direta nessa base.

**Consequência do modelo anterior, conforme o contexto apresentado:** a configuração ficava fortemente associada a uma instalação ou ambiente específico do core.

**Direção proposta:** configurar o produto no Taller e, quando sua definição estiver completa, realizar uma exportação para a base correspondente do core.

### 4.2. Necessidade de suportar ativos fora da base Oracle

A apresentação afirma que existem ativos do ecossistema do core que não residem em Oracle, mas em outros repositórios. O apresentador menciona MongoDB como repositório normalmente utilizado nesses casos.

**Problema:** um configurador limitado ao modelo Oracle não atenderia a todos os ativos que precisam ser parametrizados.

**Direção proposta:** permitir que o Taller comporte também configurações destinadas a ativos externos ao core Oracle.

### 4.3. Administração de múltiplos ambientes e companhias

No projeto MAWDY demonstrado, uma instância do Taller precisa administrar mais de um âmbito/base e mais de uma companhia. O ambiente de pré-produção exemplificado foi configurado para operar sobre:

- desenvolvimento;
- integração;
- pré-produção.

Também foi mencionada a existência de duas pré-produções para MAWDY, relacionadas a **LATAM** e **EMEA**, embora a nomenclatura exata de um dos termos tenha sido afetada pela transcrição.

**Problema:** sem uma camada central de gestão, a administração de produtos distribuídos entre bases, companhias e ambientes tende a ficar fragmentada.

### 4.4. Reutilização e transporte de definições

O Taller introduz funcionalidades para:

- importar produtos já existentes na base;
- exportar produtos configurados para a base;
- replicar produtos entre contextos;
- copiar contratos, subcontratos e coberturas;
- transportar elementos comuns;
- baixar e subir informações por Excel.

A necessidade implícita é reduzir retrabalho e permitir movimentação controlada de configurações entre âmbitos e companhias.

### 4.5. Acesso granular à configuração

Como existem capacidades específicas de determinadas instalações — a apresentação cita funcionalidades próprias de MAWDY — é necessário controlar o que cada usuário ou perfil visualiza e altera.

**Direção proposta:** módulo de administração com gestão granular de usuários, papéis e permissões.

---

## 5. Solução apresentada

O MAWDY Taller de Productos é uma aplicação web para configurar produtos e ramos, seus elementos comuns e funcionalidades associadas, com posterior publicação ou exportação para o core aplicável.

A solução apresentada se organiza em três áreas principais visíveis no menu superior:

1. **Productos**
2. **Elementos comunes**
3. **Administración**

Há também uma ação para adicionar produto e uma opção de idioma. A tela observada no ambiente de pré-produção mostra o endereço `front.proddesign-spa.pre.noram.aws.mapfre.net`, embora esse endereço, por si só, não permita concluir detalhes sobre a infraestrutura completa.  
**Rastreabilidade visual:** Frame 05, 19:04; Frame 07, 26:40.

### 5.1. Conceito central

O Taller atua como espaço de configuração anterior ao uso em emissão:

```text
Definição e manutenção no Taller
        ↓
Validação e completude da configuração
        ↓
Exportação para o core / base de dados correspondente
        ↓
Uso do produto nas aplicações de emissão
```

Esse fluxo foi esclarecido de maneira especialmente direta na sessão de perguntas: embora a ferramenta esteja desacoplada da base operacional, o produto pode ser exportado da ferramenta para a base de destino.

### 5.2. Desacoplamento

O desacoplamento não significa ausência de integração. A explicação apresentada indica que:

- o Taller armazena ou organiza a definição do produto em sua própria camada;
- a definição pode ser criada do zero, importada ou replicada;
- quando estiver pronta, pode ser levada à base correspondente;
- em produção, a exportação seria direcionada à base produtiva; em pré-produção, à base daquele ambiente.

### 5.3. Instâncias, âmbitos e companhias

A reunião distingue três conceitos:

| Conceito | Significado apresentado |
|---|---|
| Instância do Taller | Instalação ou contexto separado do Taller para um projeto/implantação do core |
| Âmbito | Contexto de base de dados ou ambiente sobre o qual a instância pode trabalhar |
| Companhia | Entidade empresarial dentro de um âmbito, associada aos produtos configurados |

O apresentador afirmou que haverá instâncias separadas do Taller para contextos diferentes, como:

- MAWDY;
- Centroamérica, quando ocorrer sua implantação;
- projetos de Vida, em integração paralela.

A instância de MAWDY demonstrada possui, ao menos no ambiente exibido, capacidade de operar com mais de um âmbito e mais de uma companhia.

---

## 6. Arquitetura lógica e funcionamento

A reunião não apresentou um diagrama arquitetural formal. A representação abaixo é uma **consolidação analítica** baseada nas explicações e telas exibidas; não deve ser interpretada como diagrama oficial.

```text
Usuários
    ↓
Autenticação Microsoft Azure
    ↓
MAWDY Taller de Productos
    ├── Produtos
    │   ├── Ramo
    │   ├── Póliza
    │   ├── Risco
    │   ├── Coberturas
    │   ├── Ofertas comerciais
    │   ├── Tarifas
    │   ├── Cotizadores
    │   └── Regras de risco
    │
    ├── Elementos comuns
    │   └── Dados reutilizáveis no nível de companhia
    │
    ├── Administração
    │   ├── Usuários
    │   ├── Papéis
    │   └── Permissões
    │
    ├── Documentação integrada
    │   └── Referências à documentação citada como RIF Academy
    │
    ├── Arquivos Excel
    │   ├── Download/exportação parcial
    │   ├── Edição externa
    │   └── Upload/importação
    │
    └── Integrações de configuração
        ├── Core / bases Oracle do contexto referido
        └── Outros ativos e repositórios, normalmente MongoDB segundo a fala
```

### 6.1. Autenticação e autorização

A autenticação de acesso ao Taller é gerida com **Microsoft Azure**, segundo a apresentação.

Além da autenticação, existe administração interna de usuários, papéis e permissões. Isso significa que a entrada na aplicação e a autorização funcional parecem ser camadas distintas:

- Azure controla o acesso/autenticação;
- o módulo de Administração controla o que o usuário pode visualizar ou modificar dentro do Taller.

A transcrição não detalha o modelo de identidade, federação, grupos, MFA, protocolo utilizado ou ciclo de provisionamento de usuários.

### 6.2. Persistência e repositórios

A reunião afirmou que:

- o core tradicionalmente referido trabalha com bases Oracle;
- outros ativos do ecossistema podem armazenar dados em outros repositórios;
- MongoDB foi citado como repositório comum para esses ativos.

Não foi detalhado:

- como o Taller persiste suas próprias configurações;
- quais APIs ou mecanismos são usados para exportação;
- se as exportações são síncronas ou assíncronas;
- se existe mensageria;
- como se comportam falhas ou reversões;
- se há versionamento técnico/auditável de cada publicação.

---

## 7. Estrutura funcional do produto

A configuração principal de um produto foi apresentada como organizada em blocos. A tela do produto demonstrado evidencia menus laterais para:

1. Ramo;
2. Póliza;
3. Risco;
4. Coberturas;
5. Ofertas comerciais;
6. Tarifas;
7. Cotizador;
8. Regras de risco.

O apresentador afirmou que os quatro primeiros blocos representam a configuração mais diretamente relacionada ao ramo e ao modelo herdado do antigo Generador de Productos. Os blocos posteriores representam funcionalidades adicionadas no Taller, com persistência em ativos distintos do core Oracle.

**Rastreabilidade visual:** Frame 10, 38:04; Frame 13, 49:27; Frame 14, 53:15.

### 7.1. Ramo

O ramo é o nível inicial da configuração de produto. No exemplo mostrado:

| Campo | Valor observado |
|---|---|
| Código | 160 |
| Nome | Asistencia en Viaje |
| Abreviatura | VC |
| Data de validade | 12/07/2024 |
| Âmbito | MPL |
| Companhia | 12101 - MAWDY, S.A._RD |
| Setor | 1600 - MIA Travel |
| Subsetor | 1600 - MIA Travel |

**Rastreabilidade visual:** Frame 10, 38:04.

A configuração do ramo contém seções como:

- operativas comuns;
- operativas específicas por tratamento;
- cosseguro e resseguro;
- sinistros;
- prêmios;
- recibos;
- intermediários e comissões.

No exemplo de “Operativas comunes”, aparecem campos como identificador, modalidade, imagem, número máximo de riscos para emissão e impressão online, e configuração relativa à alteração do plano de pagamento.  
**Rastreabilidade visual:** Frame 11, 41:52.

### 7.2. Póliza

O bloco de Póliza reúne dados solicitados uma única vez no momento de emissão ou de suplemento, conforme explicação verbal.

Entre as entidades exibidas estão:

- atributos;
- intervenções;
- cláusulas;
- planos de pagamento;
- distribuição de excesso de comissão;
- distribuição de comissão;
- moedas;
- dias de adiantamento/atraso;
- meses de duração.

O exemplo visual mostra a configuração do atributo `COD_PRODUCTO - PRODUCTO`, com propriedade de habilitação e grupos de propriedades como padrão, ramo, ajuda, gerais, soma segurada, inspeção, validação e várias.  
**Rastreabilidade visual:** Frame 13, 49:27.

### 7.3. Risco

O bloco de Risco concentra entidades que serão solicitadas para cada risco registrado dentro de uma póliza. Como exemplo, o apresentador mostrou intervenções, citando a intervenção de segurado.

A reunião não detalhou todos os tipos de risco nem o ciclo de uso em emissão. A explicação concentrou-se em demonstrar que a estrutura de agrupamento de propriedades é semelhante à utilizada em outros blocos.

### 7.4. Coberturas

As coberturas foram descritas como mais complexas por possuírem grande quantidade de informações dependentes. Ao entrar nesse bloco, o usuário vê as coberturas associadas ao produto e pode acessar seus elementos relacionados.

Na tela exibida para a cobertura “Gastos Farmacéuticos”, são apresentados:

- informação da cobertura;
- atributos;
- porcentagem de comissão;
- franquias;
- conceitos de desgloses;
- cláusulas;
- limites;
- ramos contábeis por dados variáveis;
- exceções de quadros de comissão;
- definição de constantes;
- definição de conceitos;
- variáveis.

**Rastreabilidade visual:** Frame 14, 53:15.

A tela utiliza uma legenda de cores para identificar alterações específicas:

| Cor | Significado observado |
|---|---|
| Azul | Dados editados no contrato |
| Laranja | Dados editados no subcontrato |

Essa sinalização também foi explicada verbalmente como forma de destacar dados particularizados em relação ao valor definido no produto.

---

## 8. Elementos comuns

## 8.1. Finalidade

Os Elementos Comuns reúnem informações configuradas em nível de companhia e necessárias antes da criação ou configuração de produtos. São, portanto, pré-requisitos funcionais para diversas parametrizações no nível de ramo.

O apresentador enfatizou uma relação recorrente:

```text
Configuração no nível de companhia
        ↓
Disponibilização para associação ao produto/ramos
        ↓
Configuração específica do produto
```

Por exemplo, contratos precisam existir previamente em Elementos Comuns para que possam ser associados a um produto.

## 8.2. Grupos observados

A tela de grupos de elementos comuns mostra itens como:

- entidades de companhia;
- estrutura comercial;
- estrutura de produto;
- canal de distribuição;
- comissões;
- controle técnico;
- numeração;
- suplementos.

**Rastreabilidade visual:** Frame 09, 34:16.

No grupo relacionado às entidades de cobertura, foram observados:

| Elemento | Finalidade exibida |
|---|---|
| Coberturas | Definição das coberturas da póliza |
| Desgloses | Definição do detalhe necessário da informação econômica de uma cobertura |
| Franquicias | Definição de franquias ou dedutíveis |

**Rastreabilidade visual:** Frame 08, 30:28.

## 8.3. Listas, filtros e escopo

A demonstração destacou que listas de elementos comuns podem reunir registros de vários âmbitos e companhias. Por esse motivo, o uso de filtros é considerado importante, especialmente quando se trabalha com múltiplos contextos.

O filtro se baseia, entre outros campos, em:

- âmbito;
- companhia;
- setor;
- tratamento.

Na listagem de produtos observada, aparecem companhias como:

- `10100 - MAWDY DIGITAL SERVICES_SR`;
- `12101 - MAWDY, S.A._RD`;
- `50 - MAWDY DIGITAL SERVICES_SR`.

**Rastreabilidade visual:** Frame 07, 26:40.

## 8.4. Habilitação e exclusão

A apresentação explicou que muitas entidades do core possuem indicador de habilitado/desabilitado. Para essas entidades, a regra geral do Taller é não permitir exclusão física; em vez disso, o elemento deve ser desabilitado.

Para entidades que não possuem essa marca, existe possibilidade de exclusão direta dentro do Taller.

A reunião não detalha:

- quais entidades possuem ou não o indicador;
- se há regras de dependência antes de desabilitar ou excluir;
- se há retenção histórica ou restauração.

---

## 9. Constantes, especializações e particularização

A definição de constantes é uma funcionalidade importante demonstrada no nível de ramo. A tela mostra constantes como:

- `PCT_MAX_COMIS_AGENTE`;
- `PCT_IPS_160`;
- `PCT_CO_160`;
- `PCT_MGS_160`;
- `PCT_CC_160`;
- `PCT_RE_160`;
- `PCT_GD_160`;
- `PCT_GI_160`;
- `PCT_GA_160`.

**Rastreabilidade visual:** Frame 12, 45:40.

### 9.1. Especialização

Segundo o apresentador, algumas entidades podem ser particularizadas. Para as constantes, isso permite definir um valor específico conforme campos como:

- estrutura comercial;
- canal de distribuição;
- contrato;
- subcontrato;
- póliza grupo;
- agente, entre outros campos mencionados de forma parcial.

A funcionalidade é denominada **especialização** no Taller.

Exemplo conceitual apresentado:

```text
Constante com valor padrão no produto
        ↓
Especialização por agente
        ↓
Valor diferente da mesma constante para um agente específico
```

Os campos não utilizados em uma especialização são armazenados com valores genéricos, segundo a explicação.

### 9.2. Particularização por contrato e subcontrato

O produto pode ser filtrado por contrato e, quando aplicável, por subcontrato. Ao aplicar esse filtro, o menu passa a exibir apenas os elementos que podem ser configurados naquele nível.

A apresentação esclarece que nem toda informação pode ser particularizada por contrato. Entre os exemplos de itens configuráveis nesse nível, foram citados:

- constantes;
- conceitos;
- cláusulas;
- parâmetros de contrato;
- atributos;
- certos parâmetros de cobertura;
- capital;
- obrigatoriedade;
- franquia.

A tela de coberturas utiliza marcadores visuais para indicar alterações feitas no contrato ou subcontrato em relação à configuração original do produto.

---

## 10. Ofertas comerciais

As ofertas comerciais foram apresentadas como uma forma de configurar pacotes de coberturas, aparentemente com maior flexibilidade do que modelos tradicionais — essa comparação foi sugerida pelo apresentador, não demonstrada em detalhe comparativo.

Uma oferta comercial pode conter:

- dados gerais;
- critérios de especialização;
- regras para determinar quando deve ser exibida;
- coberturas integrantes;
- propriedades de cada cobertura;
- atributos;
- franquias;
- cenários.

### 10.1. Regras de exibição

As regras podem ser compostas por combinações de valores de atributos. A oferta é mostrada ao usuário somente quando as condições configuradas são satisfeitas.

Foram citados exemplos de condições baseadas em:

- código de produto;
- valor de outro atributo;
- destino;
- pertencimento a conjunto de valores;
- intervalo de valores.

O apresentador apontou que uma configuração mostrada como faixa estava incorreta e deveria representar o intervalo de 0 a 366. Esse é um exemplo importante porque demonstra que a própria apresentação exibiu uma configuração em revisão ou com erro.

### 10.2. Coberturas dentro da oferta

Para cada cobertura de uma oferta, podem ser definidos, entre outros aspectos:

- capital;
- obrigatoriedade;
- dependência do capital em relação a outra cobertura;
- origem do capital em dado variável.

A reunião não detalhou a semântica completa de cada atributo nem a forma como essas ofertas são consumidas pela aplicação de emissão ou pelo cotizador.

---

## 11. Tarifas e cálculo multivariável

## 11.1. Configuração das tarifas

O bloco de Tarifas está relacionado ao modelo citado como **tarifa multivariável**. O apresentador afirmou que:

- as tarifas e seus fatores devem ser definidos em Elementos Comuns;
- a associação ou comportamento dos fatores também pode ser configurado no nível de ramo;
- a tarifa é associada às coberturas;
- o conceito de desglose precisa indicar que seu cálculo segue a via da tarifa multivariável.

Caso um conceito de desglose seja calculado de outra maneira — por exemplo, como valor fixo ou porcentagem do capital da cobertura — não seria necessário configurar esse bloco de tarifas multivariáveis.

## 11.2. Fatores e relatividades

Os fatores podem:

- alterar o cálculo do prêmio;
- afetar conceitos diferentes do prêmio.

Foi dado o exemplo de idade:

```text
Dado variável: idade
        ↓
Faixa de idade
        ↓
Relatividade associada
        ↓
Aplicação multiplicativa ao cálculo
```

Como exemplo ilustrativo, foi dito que uma faixa etária poderia receber fator 1 e outra receber fator 1,6. Esse exemplo explica o mecanismo geral, não necessariamente uma regra real em produção.

## 11.3. Teste de tarifa

O Taller possui uma utilidade para testar tarifas por meio de planilha. O fluxo explicado foi:

1. baixar uma planilha modelo;
2. preencher os dados necessários ao cálculo;
3. carregar o arquivo na ferramenta;
4. informar um endereço de e-mail;
5. executar o teste;
6. receber o arquivo de retorno com valores calculados e logs de execução.

O arquivo retornado contém:

- os importes calculados;
- detalhes do cálculo;
- logs dos passos de execução da tarifa.

A apresentação não detalha:

- capacidade máxima da planilha;
- tempo de processamento;
- formato técnico do arquivo;
- segurança do envio por e-mail;
- retenção dos dados submetidos.

---

## 12. Cotizador

O bloco de Cotizador foi apresentado como capacidade de configurar front-ends ou telas de cotação. Entre as possibilidades mencionadas estão:

- definição de painéis;
- seleção de propriedades ou atributos exibidos;
- configuração de etiquetas;
- comportamento de visualização;
- adaptação a celular, tablet e computador;
- validações;
- valores mínimos e máximos.

A reunião demonstra uma intenção de parametrização de interface, mas não fornece detalhes suficientes para concluir:

- se o cotizador é gerado automaticamente;
- se a configuração produz código;
- quais canais consomem a configuração;
- se há integração com front-end específico;
- como o modelo responde a requisitos de identidade visual ou acessibilidade.

---

## 13. Importação, exportação, replicação e reutilização

## 13.1. Importação de elementos comuns

É possível importar elementos comuns a partir de determinado âmbito e companhia. O usuário pode:

- importar todos os auxiliares de uma vez;
- selecionar apenas determinados tipos de elementos.

A função é apresentada como mecanismo para trazer configurações necessárias de outro contexto.

## 13.2. Exportação de elementos comuns

Também é possível levar elementos comuns configurados no Taller para o core correspondente, indicando o âmbito e a companhia de destino.

A demonstração não esclarece se o processo valida conflitos, dependências ou incompatibilidades antes da gravação no destino.

## 13.3. Criação de produto

Foram apresentadas quatro formas de construir produtos:

| Modalidade | Descrição apresentada |
|---|---|
| Criar do zero | Definição manual, considerada pelo apresentador a alternativa provavelmente mais trabalhosa |
| Usar como modelo/plantilha | Replicar um produto já existente no Taller para outro ramo, companhia ou contexto |
| Importar produto | Trazer produto da base de dados para o Taller |
| Exportar produto | Levar produto configurado no Taller para a base de dados correspondente |

### 13.3.1. Replicação por modelo

Ao usar um produto como modelo, o usuário seleciona um ramo já existente no Taller e informa, entre outros elementos:

- destino;
- novo nome de ramo;
- nova data de validade.

O recurso permite transportar uma configuração entre companhias e, conforme a explicação, também entre instâncias ou contextos aplicáveis.

### 13.3.2. Importação a partir da base

A importação traz o produto completo da base de dados para o Taller. Caso o produto ainda não exista no Taller, ele é criado. Se já existir para o mesmo ramo, companhia, âmbito e data de validade, a importação o substitui, conforme relatado.

Essa substituição é um comportamento funcional relevante e deve ser avaliada cuidadosamente em operação. A reunião não detalha se há confirmação adicional, backup, comparação de diferenças ou possibilidade de reversão.

### 13.3.3. Exportação para a base

Ao exportar, o Taller leva a informação configurada para a base correspondente ao âmbito e à companhia selecionados. A pergunta feita ao final confirmou o entendimento de que o desacoplamento não impede a publicação na base operacional.

A mensagem funcional é:

```text
Produto configurado no Taller
        ↓
Ação de exportar
        ↓
Base correspondente ao ambiente, âmbito e companhia
        ↓
Disponibilidade para uso pelo core de emissão
```

## 13.4. Excel para download, edição e reimportação

O produto pode ser baixado parcial ou integralmente em arquivos Excel. Foram citados conteúdos como:

- produto;
- contratos;
- subcontratos;
- tarifas;
- ofertas comerciais.

A finalidade é permitir visualização, exploração e, em alguns casos, edição externa seguida de upload.

A apresentação não detalha validações de integridade, concorrência, bloqueios contra sobrescrita ou auditoria de alterações realizadas na planilha.

## 13.5. Cópia de contratos e subcontratos

Há uma função de copiar contratos e subcontratos entre contextos. Conforme explicado:

- o usuário seleciona contrato de determinado âmbito, companhia e produto;
- replica esse contrato para outro contrato;
- se o destino já existir, ele pode ser sobrescrito;
- se não existir, será criado;
- informações dependentes do contrato também são geradas;
- o mesmo princípio vale para subcontratos.

## 13.6. Cópia de cobertura

Também existe utilidade para copiar uma cobertura proveniente de outro âmbito, companhia ou ramo para o contexto corrente.

O apresentador reconheceu durante a demonstração que o exemplo selecionado não era ideal por apontar para o mesmo contexto, mas esclareceu o objetivo: trazer uma cobertura existente de outro contexto para o produto em edição.

---

## 14. Documentação integrada

O Taller está sendo integrado à documentação chamada pelo apresentador de **RIF Academy**. A apresentação explica que a organização de propriedades no Taller foi ajustada para respeitar a estrutura documental existente.

A intenção é permitir que, ao configurar determinada entidade funcional, o usuário possa acessar diretamente a documentação do bloco correspondente por meio de um ícone ou link.

### 14.1. Benefício pretendido

A organização comum entre interface e documentação busca facilitar:

- entendimento da finalidade de propriedades;
- consulta de exemplos;
- localização de informações;
- redução da distância entre parametrização e conhecimento funcional.

### 14.2. Limitação

O apresentador afirmou que a cobertura dessa integração está sendo revisada e sugeriu que provavelmente a maioria, talvez todas, as entidades terão link para documentação. Isso não foi confirmado como estado final concluído.

---

## 15. Administração, papéis e permissões

A área de Administração é responsável pela gestão de:

- usuários;
- papéis;
- permissões funcionais.

As permissões são distribuídas em três grupos:

1. permissões de Produtos;
2. permissões de Elementos Comuns;
3. permissões de Funcionalidades.

O modelo de permissão foi descrito como incremental. Os níveis apresentados são, em essência:

| Nível | Comportamento explicado |
|---|---|
| Sem permissão | Não permite visualizar nem operar |
| Visível com bloqueio | Mostra item no menu, mas com cadeado |
| Consulta | Permite visualizar |
| Modificar e criar | Permite alteração e criação |
| Modificar, criar e excluir | Permite operações completas, incluindo exclusão |

As permissões podem ser aplicadas por bloco ou individualmente por funcionalidade.

### 15.1. Implicação funcional

O controle granular é especialmente relevante porque algumas entidades são específicas de MAWDY ou de determinada instalação. O apresentador afirmou que essas capacidades podem ser ocultadas para outros perfis, evitando que elementos não aplicáveis sejam exibidos indiscriminadamente.

---

## 16. Casos e contextos concretos citados

## 16.1. MAWDY

O cenário central da apresentação é o projeto de integração MAWDY com o core referido na reunião.

Características mencionadas:

- existe uma instância específica do Taller associada a MAWDY;
- o ambiente exibido era pré-produção;
- a primeira companhia de implantação será a República Dominicana;
- há configuração para operar com vários âmbitos;
- há necessidade de funcionalidades específicas, como herança;
- certas entidades de ofertas comerciais são próprias de MAWDY;
- contratos e ofertas são utilizados como parte importante da configuração demonstrada.

## 16.2. República Dominicana

A companhia da República Dominicana foi indicada como primeira implantação do Taller dentro de MAWDY.

Nas telas, aparecem referências como:

- `12101 - MAWDY, S.A._RD`;
- ramo 160 — Asistencia en Viaje;
- setor/subsetor `1600 - MIA Travel`.

**Rastreabilidade visual:** Frame 10, 38:04.

## 16.3. Projetos de Vida

A apresentação informa que existem integrações paralelas relacionadas a projetos de Vida, inicialmente na Espanha e possivelmente em outra instalação não identificada com segurança pela transcrição.

Também foram citados como necessidades relacionadas a esses projetos:

- manutenção de Póliza Grupo;
- componentes ainda em incorporação;
- funcionalidades de área de seguro, em desenvolvimento ou inclusão.

## 16.4. Centroamérica

Foi mencionado que haverá uma instância própria do Taller para Centroamérica quando a integração for levada àquele contexto. Não foram apresentados cronograma, escopo, companhias ou produtos.

---

## 17. Roadmap e evolução citada

A reunião menciona diversas evoluções, sem datas formais ou compromissos de entrega.

| Item | Situação relatada |
|---|---|
| Exportações parciais | Já iniciadas; ofertas comerciais já possuem esse tipo de capacidade |
| Exportar elementos em menor granularidade | Intenção de evoluir até permitir exportar cobertura, atributo ou outros itens individualmente |
| Área de seguro | Grupo de manutenções sendo incorporado |
| Póliza Grupo | Necessidade ligada ao projeto de Vida |
| RT / cálculo de tarifa | Funcionalidades relacionadas citadas como parte das evoluções |
| Integração com documentação | Em implementação/revisão |
| Entidades recentes do modelo de dados | Algumas ainda precisam ser incorporadas |
| Herança | Necessidade MAWDY em integração, mas não detalhada por falta de tempo |
| Cotizadores | Capacidade em desenvolvimento ou disponibilização mencionada no contexto do Taller |

Não há informações suficientes para determinar:

- datas de entrega;
- responsáveis;
- prioridades;
- dependências;
- orçamento;
- critérios de aceite;
- disponibilidade por país ou ambiente.

---

## 18. Perguntas e respostas

## 18.1. Pergunta: como um produto será exportado para a base produtiva se o Taller está desacoplado?

### O que se queria entender

A participante questionou como o produto configurado na nova ferramenta chegaria à base produtiva, dado que a solução não está “enganchada” diretamente à base habitual.

### Resposta

O apresentador explicou que, ao entrar na configuração de um produto, existe uma ação para exportá-lo. Essa ação leva todas as informações do produto para a base de dados sobre a qual se está trabalhando.

No exemplo demonstrado, a exportação seria direcionada à base do ambiente e da companhia selecionada. Em um ambiente produtivo do Taller, a exportação seria para produção.

### O que isso esclarece

O desacoplamento deve ser entendido como separação entre o espaço de configuração e a base operacional, não como ausência de integração. A publicação é uma etapa explícita do fluxo.

---

## 18.2. Pergunta: como funciona a geração de novas imagens/versões do ramo?

### O que se queria entender

A participante comparou o comportamento com o processo anterior, no qual alterações no produto aparentemente geravam uma nova imagem do ramo. A dúvida era como isso ocorreria no novo modelo desacoplado.

### Resposta

O apresentador explicou que a data de validade é gerida no próprio Taller. É possível criar novas imagens/versões do ramo replicando-o com nova data de validade.

O mesmo conceito se aplica a contratos e subcontratos, que também podem ter diferentes versões por data de validade.

### O que isso esclarece

O Taller incorpora gerenciamento funcional de versões por vigência. A reunião, contudo, não detalha como conflitos entre vigências são prevenidos ou como uma versão é promovida entre ambientes.

---

## 18.3. Pergunta: a utilização exige que o país tenha o core RIF/RIS instalado?

### O que se queria entender

A participante perguntou se a ferramenta poderia ser usada sem a instalação do core no país.

### Resposta

O apresentador respondeu que acredita que existe necessidade de ter o core instalado.

### O que isso esclarece

A resposta indica uma dependência provável do core para o uso pleno da solução, especialmente pela necessidade de exportar produtos para a base correspondente. Entretanto, a resposta foi formulada com incerteza (“eu creio”), portanto não deve ser tratada como regra técnica formalmente confirmada.

---

## 19. Números e indicadores citados

| Indicador | Valor mencionado | Contexto |
|---|---:|---|
| Tempo aproximado de desenvolvimento | Cerca de 1 ano e meio ou mais | Desenvolvimento do Taller de Productos |
| Ambientes habituais citados | 3 | Desenvolvimento, pré-produção e produção |
| Âmbitos/bases no exemplo MAWDY | 3 | Desenvolvimento, integração e pré-produção |
| Pré-produções MAWDY citadas | 2 | Associadas a LATAM e EMEA, conforme fala |
| Grandes blocos no menu de produto | 8 | Ramo, Póliza, Risco, Coberturas, Ofertas Comerciais, Tarifas, Cotizador e Regras de Risco |
| Primeiro ramo demonstrado | 160 | Asistencia en Viaje |
| Código de setor/subsetor exibido | 1600 | MIA Travel |
| Máximo de riscos exibido no exemplo | 99999 | Emissão online e impressão online |
| Faixa exemplificada para fator | 0 a 366 | O apresentador observou que a configuração visualizada estava incorreta, mas deveria representar essa faixa |

Esses números são declarações ou evidências de tela da reunião. Não representam valores auditados ou necessariamente vigentes em todos os ambientes.

---

## 20. Limitações reconhecidas

### 20.1. Solução em evolução

A aplicação ainda está em construção funcional. Existem melhorias, incidências e adições em andamento.

### 20.2. Falta de tempo para detalhar todos os temas

A sessão tinha previsão de uma hora e o apresentador reconheceu que não seria possível aprofundar todos os blocos. Foram mencionados, mas não detalhados adequadamente:

- herança;
- cenários;
- cotizadores;
- algumas capacidades de tarifa;
- importação/exportação por Excel;
- papéis e usuários;
- manutenção de área de seguro;
- Póliza Grupo;
- funcionalidades associadas a RT.

### 20.3. Entidades ainda ausentes

O apresentador afirmou que existem entidades novas no modelo de dados que ainda não foram incorporadas ao Taller.

### 20.4. Configurações específicas de instalação

Algumas entidades são próprias de MAWDY. A solução lida com isso via permissões e ocultação de elementos, mas a reunião não detalha como é administrada a variabilidade entre países ou instalações.

### 20.5. Incerteza sobre uso sem o core

A resposta sobre a necessidade de o país ter o core instalado foi dada com hesitação. Não há confirmação formal de que o Taller seja inutilizável sem o core, embora a integração pareça parte essencial de sua proposta.

---

## 21. Riscos e desafios

## 21.1. Riscos explicitamente evidenciados

### Produto em construção

Como a solução continua evoluindo, existe risco de mudanças de comportamento, indisponibilidade de funcionalidades esperadas ou necessidade de retrabalho de configuração.

### Importação que substitui produto existente

A importação de produto pode substituir a configuração já existente no Taller quando coincidirem ramo, companhia, âmbito e data de validade. Sem mecanismos adicionais de comparação ou backup descritos, isso representa risco operacional.

### Sobrescrita na cópia de contratos/subcontratos

A cópia de contrato pode sobrescrever o destino se ele já existir. A reunião não detalha controles de confirmação, diferenças ou rollback.

### Configurações incorretas

O apresentador identificou ao vivo um exemplo de intervalo configurado incorretamente em uma regra de oferta comercial. Isso demonstra que a ferramenta permite configurações complexas cuja correção depende de validação funcional.

## 21.2. Desafios derivados do contexto — análise

As observações abaixo são interpretações fundamentadas no contexto, não afirmações literais dos participantes.

### Governança de versões e promoções

A capacidade de manter múltiplas datas de validade, replicar produtos e exportar entre ambientes sugere a necessidade de uma governança forte de versões. Sem regras operacionais claras, pode haver risco de promover configuração indevida ou desatualizada.

### Controle de consistência entre Elementos Comuns e Produtos

Como muitos dados precisam existir primeiro no nível de companhia, a configuração de produto depende de uma sequência correta. Isso sugere um desafio de coordenação entre equipes responsáveis por elementos comuns e equipes responsáveis por produtos.

### Expansão para múltiplos países

A existência de funcionalidades específicas de MAWDY, projetos de Vida, Centroamérica e múltiplas companhias indica que a solução deverá equilibrar padronização e particularidades locais.

### Segurança de arquivos Excel

O uso de download, edição e reupload de Excel cria eficiência operacional, mas também pode demandar controles sobre integridade, rastreabilidade, acesso e concorrência. Esses controles não foram abordados na reunião.

---

## 22. Transformações estruturais identificadas — análise

## 22.1. De configurador acoplado a plataforma de configuração desacoplada

A mudança mais evidente é a passagem de um modelo diretamente ligado à base do core para uma ferramenta intermediária de configuração, capaz de importar, versionar, replicar e exportar definições.

```text
Configuração diretamente no contexto do core
        ↓
Configuração governada em uma ferramenta própria
        ↓
Publicação explícita para o core de destino
```

Essa leitura é sustentada pela explicação sobre desacoplamento e exportação.

## 22.2. De configuração local para gestão multiâmbito e multicompanhia

O Taller foi apresentado como capaz de administrar várias bases/âmbitos e companhias em uma mesma instância. Isso aponta para uma direção de centralização funcional.

A centralização, porém, não elimina a separação entre instâncias: cada contexto de implantação parece possuir sua própria instância do Taller.

## 22.3. De parametrização isolada para reutilização controlada

Importação, exportação, replicação, cópia de contratos, cópia de coberturas e uso de Excel indicam uma busca por reutilização de configurações já existentes.

A intenção parece ser reduzir a necessidade de reconstruir produtos integralmente em cada novo contexto, mantendo possibilidade de adaptação local.

## 22.4. De documentação separada para documentação contextual

A integração com a documentação referida como RIF Academy busca aproximar a orientação funcional da atividade de parametrização. Isso pode reduzir a dependência de conhecimento tácito, embora a cobertura completa da integração ainda não esteja confirmada.

## 22.5. De funcionalidades universais para capacidades controladas por perfil

A granularidade de permissões permite que a mesma aplicação contenha funcionalidades específicas de certos contextos sem expô-las indiscriminadamente a todos os usuários. Isso é coerente com uma plataforma que precisa servir a diferentes instalações.

---

## 23. O que a reunião não permite concluir

A apresentação não fornece informações suficientes sobre os pontos abaixo:

### Arquitetura técnica

- tecnologia do front-end;
- tecnologia de back-end;
- linguagem de programação;
- padrão de APIs;
- mecanismos de integração;
- uso de mensageria;
- modelo de eventos;
- orquestração;
- infraestrutura de execução;
- uso de containers ou Kubernetes.

### Dados

- banco de dados utilizado pelo próprio Taller;
- modelo de sincronização com Oracle;
- estrutura de dados exportada;
- tratamento de transações;
- comportamento diante de falhas parciais;
- estratégia de rollback;
- retenção e auditoria de mudanças.

### Segurança

- autenticação detalhada no Azure;
- autorização entre Azure e o módulo interno;
- MFA;
- IAM;
- segregação de funções;
- logs de auditoria;
- criptografia;
- gestão de credenciais;
- política de acesso a planilhas e e-mails de teste.

### Operação

- SLA;
- suporte;
- monitoramento;
- observabilidade;
- gestão de incidentes;
- gestão de mudanças;
- procedimentos de release;
- CI/CD;
- critérios de promoção entre ambientes;
- backups e disaster recovery.

### Negócio

- quais produtos serão priorizados;
- cronograma para República Dominicana;
- cronograma para Centroamérica;
- critérios para adoção por outros países;
- responsáveis por aprovação funcional;
- modelo de ownership;
- métricas de sucesso;
- custos, FinOps ou alocação orçamentária.

---

## 24. Conclusões

O MAWDY Taller de Productos foi apresentado como uma plataforma de configuração de produtos seguradores em evolução, orientada a substituir ou modernizar o antigo Generador de Productos.

Seu diferencial principal é o desacoplamento em relação ao core e à base Oracle: a configuração é trabalhada em uma aplicação dedicada e depois exportada para o destino operacional correspondente. Esse modelo é complementado por suporte a múltiplos âmbitos, companhias, versões, contratos, subcontratos, coberturas, tarifas, ofertas comerciais e cotizadores.

A solução também incorpora preocupações de governança operacional: autenticação via Azure, papéis, permissões granulares, ocultação de funcionalidades específicas, documentação contextual e mecanismos de transporte de configuração.

Ao mesmo tempo, não se trata de uma solução finalizada. A própria apresentação reconhece evolução ativa, incidências em correção, entidades ainda não incorporadas, funcionalidades em desenvolvimento e tópicos que não puderam ser detalhados na sessão.

Para um leitor que não participou da reunião, o ponto essencial é: o Taller não é apenas uma nova tela para cadastro de produtos. Ele representa uma tentativa de estruturar a configuração de produtos como uma capacidade centralizada, reutilizável, versionável e integrada ao ecossistema de emissão, preservando a possibilidade de publicação no core quando a configuração estiver pronta.
