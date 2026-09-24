# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.core - Taller de productos.mp4`
**Data de processamento:** 24/09/2026 16:49:33
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Análise Estruturada — Taller de Productos no ecossistema RIF/Reef

> **Base documental:** transcrição de fala produzida por reconhecimento automático e evidências visuais extraídas de telas e slides.  
> **Nota de fidelidade:** alguns nomes e trechos da fala apresentam ruído de transcrição. Quando não foi possível confirmar a grafia, a forma registrada foi preservada ou marcada como incerta. As telas indicam os termos **RIF**, **TRON**, **RTE**, **MAWDY**, **Taller de Productos**, **ADUP** e **Gestor de Colecciones**; porém, nem todos tiveram sua expansão ou tecnologia detalhada.

---

## 1. Síntese executiva

A reunião apresentou o **Taller de Productos** como uma ferramenta centralizada para administrar configurações de produtos dentro de um ecossistema composto por múltiplos ativos — sistemas ou componentes independentes — associados ao ambiente chamado na fala de **RIF/Reef**.

O problema central tratado foi a fragmentação da configuração de produtos. Cada ativo mantém seus próprios dados e precisa conhecer a parcela de configuração que utiliza. Isso cria risco de duplicidade, inconsistência e falhas operacionais quando uma mesma informação precisa ser configurada repetidamente em vários sistemas.

A solução apresentada é um ativo central de manutenção e orquestração de configurações: o Taller de Productos importa dados de sistemas integrados, permite sua administração por uma interface única e exporta as configurações para os respectivos destinos. A intenção futura declarada é que o Taller de Productos se torne a **fonte principal de configuração** — ou *golden source* — substituindo a manutenção direta em TRON, embora essa transição ainda esteja em andamento.

A sessão abordou principalmente:

- estrutura funcional do Taller de Productos;
- organização dos dados de produto e de elementos comuns;
- versionamento e vigências;
- importação, exportação e cópia entre ambientes;
- exportações totais, parciais e com dependências;
- gestão de contratos, subcontratos e especializações;
- permissões por usuário, ambiente, companhia e função;
- uso de arquivos Excel para manutenção de estruturas volumosas.

---

## 2. Contexto e antecedentes

### 2.1. O ecossistema apresentado

O apresentador descreve um cenário formado por diversos ativos relacionados ao ambiente referido como **RIF/Reef**. A transcrição contém trechos ambíguos quanto à denominação exata, mas a estrutura conceitual é clara:

- **TRON** é apresentado como o ativo principal e como um sistema tradicionalmente mais centralizado, comparado a um monólito.
- Ao redor dele, surgiram ativos diferenciados.
- Alguns ativos representam funcionalidades novas.
- Outros representam capacidades que foram extraídas de TRON para formar uma arquitetura mais distribuída.

A apresentação não detalha tecnologias de implementação, infraestrutura, banco de dados, protocolos de comunicação ou mecanismo de autenticação entre esses ativos.

### 2.2. Origem da necessidade

Cada ativo precisa manter dados de configuração para operar sobre um produto. Contudo, cada um mantém sua própria base ou conjunto de dados.

Exemplos mencionados:

- um sistema de tarifação precisa conhecer regras e dados necessários para tarifar um produto;
- um componente de ofertas comerciais precisa saber quais ofertas se aplicam a uma apólice e quais coberturas devem ser incluídas;
- outros ativos podem utilizar subconjuntos distintos da configuração de produto.

O problema não é apenas técnico: um mesmo produto pode conter muitas coberturas, atributos, regras e parâmetros. Configurar essas informações manualmente em cada ativo aumenta substancialmente a carga de manutenção e a possibilidade de divergência.

### 2.3. Relação de causa e efeito reconstruída

A relação abaixo é uma consolidação analítica fiel às explicações da reunião:

```text
Configuração distribuída entre vários ativos
↓
Necessidade de repetir ou sincronizar dados de produto
↓
Risco de esquecer, divergir ou configurar incorretamente informações
↓
Inconsistência operacional entre ativos que trabalham sobre o mesmo produto
↓
Necessidade de uma gestão centralizada da configuração
↓
Taller de Productos como repositório e interface unificada
```

---

## 3. Problemas identificados

### 3.1. Redundância de configuração

O apresentador exemplifica que, se um produto possuir cinquenta coberturas e vários ativos precisarem conhecê-las, a configuração poderá ser repetida em cada um desses destinos.

Isso cria um risco operacional direto: uma cobertura pode ser omitida, configurada incorretamente ou receber valores diferentes entre os sistemas.

### 3.2. Inconsistência de informações

Quando um atributo é necessário em quatro ou cinco ativos, qualquer divergência em um deles faz com que os sistemas passem a operar sobre versões distintas do mesmo produto.

A consequência descrita é uma configuração incoerente do produto no ecossistema, capaz de gerar problemas durante sua utilização pelos ativos.

### 3.3. Complexidade para mover produtos entre ambientes

A apresentação menciona que a transferência de configurações entre ambientes era historicamente problemática, pois um produto é uma configuração extensa e complexa.

A possibilidade de copiar ou transferir produtos entre ambientes no Taller de Productos é apresentada como forma de reduzir essa dificuldade.

### 3.4. Risco de sobrescrita em produção

A exportação completa de um produto pode sobrescrever informações já existentes nos ativos de destino. O apresentador afirma que essa operação gera “vértigo” quando aplicada a produtos existentes em produção.

Esse risco motivou a criação de exportações parciais e especializadas, para reduzir o impacto de alterações pontuais.

### 3.5. Limitações práticas da edição pela interface web

Configurações como tarifas e ofertas comerciais podem conter grande volume de dados. Segundo a apresentação, trabalhar exclusivamente pela interface web pode ser pesado e pouco prático nesses casos.

A exportação e reimportação por Excel foi introduzida como alternativa para manutenção em massa.

---

## 4. Solução apresentada: Taller de Productos

### 4.1. Conceito central

O Taller de Productos foi apresentado pela frase:

> “Un activo único para configurarlos a todos”.

A formulação resume a proposta de centralizar a administração de configurações que antes ficavam distribuídas entre vários ativos.

Conforme o slide exibido, a ferramenta permite:

- gestão centralizada das configurações de diferentes ativos Reef/RIF;
- visão unificada das configurações associadas a um produto;
- exportação e importação das configurações;
- modificação de configurações dos ativos integrados.  
  *Referência visual: Frames 05 e 06, aproximadamente 17:29 e 20:58.*

### 4.2. Papel funcional

O Taller de Productos é descrito como:

- um repositório de configurações;
- uma interface unificada para o usuário;
- uma camada que distribui os dados configurados aos ativos apropriados;
- uma grande tela de manutenção de produtos e de entidades auxiliares.

O usuário deve trabalhar com o conceito de produto, suas coberturas, tarifas, condições e regras, sem precisar saber em qual ativo cada informação será persistida.

### 4.3. Transparência dos destinos técnicos

A interface pretende ocultar a complexidade dos destinos de cada dado. Durante a configuração, algumas informações podem ser enviadas a um ativo, outras a TRON e outras a um componente diferente, sem exigir que o usuário determine manualmente cada destino.

Essa transparência é uma das características mais relevantes da solução apresentada.

### 4.4. Evolução para uma fonte central

Foi afirmado que, no futuro, a intenção é que o Taller de Productos se torne a *golden source* das configurações.

Isso significa que:

- a configuração passaria a ser mantida no Taller de Productos;
- a manutenção direta em TRON deixaria de ser o modelo predominante;
- TRON receberia as configurações a partir do processo de exportação.

Entretanto, a reunião deixa explícito que esse cenário ainda não está plenamente consolidado. Existe um período de transição no qual certas configurações ainda precisam evoluir e podem continuar sendo geridas em TRON.

---

## 5. Arquitetura lógica reconstruída

> **Importante:** o desenho abaixo é uma consolidação analítica do conteúdo apresentado. Não foi exibido como diagrama técnico literal e não detalha protocolos, infraestrutura ou persistência.

```text
Usuários de configuração
        ↓
Taller de Productos
- manutenção unificada de produtos
- elementos comuns
- versões e vigências
- permissões
- importação/exportação
- cópia entre ambientes
        ↓
Distribuição transparente das configurações
        ↓
Ativos integrados do ecossistema
├── TRON
├── Módulos de ofertas comerciais
├── RTE
├── Portal de vendas
├── ADUP
└── Gestor de Colecciones
```

### 5.1. Ativos mencionados

A reunião cita os seguintes ativos conectados ou relacionados:

| Componente | Papel descrito ou inferido diretamente do contexto |
|---|---|
| **TRON** | Ativo principal; origem e destino de configurações; mantém configurações próprias. |
| **Taller de Productos** | Camada centralizada de configuração, importação, exportação e manutenção. |
| **Módulos de ofertas comerciais** | Gerenciam informações de ofertas comerciais aplicáveis a produtos e apólices. |
| **RTE** | Citado como microserviço de tarifação. A sigla não foi expandida. |
| **Portal de vendas** | Citado entre os ativos integrados. Não houve detalhamento funcional adicional. |
| **ADUP** | Citado como destino de determinados dados. A transcrição não esclarece sua finalidade completa. |
| **Gestor de Colecciones** | Ativo independente associado ao armazenamento de determinados identificadores, especialmente relacionados a MAWDY. |
| **Cotizador** | Componente cuja configuração controla campos ou informações mostradas durante a cotação. |
| **Regras de risco** | Área de configuração citada; a integração ainda não estaria disponível no ambiente demonstrado. |

### 5.2. Limitação de arquitetura

A reunião não permite concluir:

- se as integrações usam APIs, arquivos, mensageria, banco compartilhado ou outro mecanismo;
- se a comunicação é síncrona ou assíncrona;
- qual é a tecnologia de persistência;
- se existe orquestração central, fila, reprocessamento ou compensação;
- como são tratados conflitos entre versões importadas e versões existentes;
- como ocorre a autenticação ou autorização técnica entre sistemas.

A fala menciona “tabelas” e “coleções Mongo” em uma passagem, mas sem detalhar a arquitetura. Portanto, não é possível afirmar que a solução utiliza MongoDB de forma abrangente ou exclusiva.

---

## 6. Organização funcional dos dados

## 6.1. Dados vinculados ao produto

Um produto concentra uma estrutura extensa de informações. O exemplo utilizado foi o produto **160 – Asistencia en Viaje**.

A interface organiza os dados em áreas como:

- ramo;
- apólice;
- risco;
- coberturas;
- ofertas comerciais;
- tarifas;
- cotizador;
- regras de risco.

As evidências visuais mostram que a navegação inclui, entre outras áreas:

- **Ramo — Características generales**;
- **Póliza — Detalles de la póliza y condiciones**;
- **Riesgo — Detalles del riesgo**;
- **Coberturas — Detalles de las coberturas incluidas**;
- **Ofertas comerciales**;
- **Tarifas — Detalles de las tarifas incluidas**;
- **Cotizador — Configuración de cotizadores**;
- **Reglas de riesgo — Configuración de reglas de riesgo**.  
  *Referência visual: Frame 11, aproximadamente 38:22.*

### 6.2. Ramo

O ramo aparece como uma área de configuração ampla, com seções como:

- operativas comuns;
- operativas específicas por tratamento;
- cosseguro e resseguro;
- sinistros;
- prêmios;
- recibos;
- intermediários e comissões;
- controle de fraude;
- controle por marcas;
- outras propriedades.

A transcrição não detalha o significado funcional de todas essas seções nem suas integrações específicas.  
*Referência visual: Frame 11.*

### 6.3. Apólice, risco e coberturas

A estrutura do produto contempla dados em diferentes níveis:

- dados de apólice;
- dados de risco;
- dados de coberturas.

Ao acessar uma cobertura, o usuário pode trabalhar com os dados associados a ela. A reunião não lista exaustivamente todos os atributos disponíveis.

Uma tela de tarifas mostra exemplos de coberturas relacionadas a assistência em viagem, incluindo:

- adelanto de fondos para defensa jurídica;
- gastos farmacêuticos;
- gastos médicos no exterior;
- assistência médica em caso de emergência;
- gastos odontológicos no exterior;
- transporte ou repatriação sanitária.  
  *Referência visual: Frame 12, aproximadamente 41:51.*

### 6.4. Ofertas comerciais

As ofertas comerciais possuem área própria no produto. A interface demonstrada inclui subseções como:

- ofertas comerciais;
- simulações;
- identificador MAWDY;
- identificadores AMA;
- valores de dados variáveis;
- preferências;
- margens adicionais.  
  *Referência visual: Frame 07, aproximadamente 24:27.*

Foi explicado que diferentes informações dessa área podem ser destinadas a ativos distintos:

- dados de ofertas comerciais vão ao módulo de ofertas comerciais;
- identificadores MAWDY/AMA podem ser armazenados no Gestor de Colecciones;
- preferências podem ser gravadas em TRON.

### 6.5. Tarifas

O Taller de Productos permite a manutenção de tarifas, incluindo tarifação multivariável.

A tela exibida apresenta:

- listagem de tarifas;
- fatores por ramo;
- coberturas vinculadas à tarifa;
- especializações;
- possibilidade de baixar uma planilha de teste;
- possibilidade de testar tarifa.  
  *Referência visual: Frame 12.*

A reunião não esclarece:

- como o cálculo tarifário é executado;
- onde ocorre a avaliação das regras;
- quais entradas e saídas o teste de tarifa produz;
- como se integra tecnicamente com RTE.

### 6.6. Cotizador

O cotizador é apresentado como um componente que consegue exibir campos configurados na interface de cotação. O exemplo dado é o de uma pessoa, em uma agência, preenchendo informações ao criar uma apólice.

A apresentação evita detalhar esse componente, deixando claro que não era o objetivo aprofundar um ativo concreto.

### 6.7. Regras de risco

Há uma seção de regras de risco, mas o apresentador afirma que ela não estava implantada no ambiente de pré-produção demonstrado e que ainda não estava conectada.

Portanto, a existência funcional da área não permite concluir que a integração estivesse operacional no momento da sessão.

---

## 7. Elementos comuns

### 7.1. Conceito

Além das informações ligadas diretamente a um produto, existem entidades que pertencem ao nível de companhia e podem ser utilizadas por diversos produtos.

Essas entidades foram denominadas **elementos comuns**.

Elas abrangem catálogos, estruturas e dados auxiliares necessários para configurar produtos, mas que não pertencem exclusivamente a um produto individual.

### 7.2. Exemplos visualmente identificados

A tela de elementos comuns apresenta grupos como:

| Grupo | Descrição exibida |
|---|---|
| Entidades companhia | Definição das entidades da companhia |
| Estrutura comercial | Definição das estruturas comerciais |
| Estrutura produto | Definição da estrutura do produto |
| Canal distribuição | Definição do canal de distribuição |
| Comissões | Definição das comissões |
| Controle Técnico | Definição do controle técnico |

*Referência visual: Frame 09, aproximadamente 31:24.*

### 7.3. Uso na configuração de produtos

O apresentador utiliza o exemplo de fatores: um fator utilizado em uma tarifa pode precisar ser definido no nível de companhia antes de ser referenciado por um produto.

Essa relação é importante porque explica o conceito de dependência: um produto pode depender de elementos comuns para funcionar corretamente nos ativos de destino.

---

## 8. Versionamento, vigência e especialização

## 8.1. Versões de produto

O Taller de Productos trabalha com datas de versão ou vigência.

Ao acessar um produto, o usuário pode:

- entrar por padrão na versão mais recente;
- selecionar outras versões disponíveis;
- carregar uma versão específica;
- realizar alterações na versão escolhida.

A reunião trata isso como uma simplificação em relação à complexidade existente nos ativos de origem.

### 8.2. Vigências próprias por entidade

Nem todas as entidades seguem necessariamente a mesma vigência do produto.

Foram citados exemplos de entidades com data própria:

- tarifas;
- definição de conceitos;
- ofertas comerciais;
- contratos;
- subcontratos.

A interface busca deixar explícito em cada tela com qual vigência o usuário está trabalhando.

### 8.3. Tarifas com versões próprias

Além da versão do produto, uma tarifa pode possuir sua própria data de vigência. Isso permite modificar uma tarifa em uma versão específica, sem que a explicação indique que todas as demais estruturas do produto devam ser alteradas.

### 8.4. Especialização de tarifas

A tarifa pode ser especializada por determinados critérios. O exemplo apresentado foi o **agente 3**.

Ao selecionar uma especialização, os ajustes feitos passam a se aplicar àquele contexto específico. Também foram citados, de forma não exaustiva, critérios como:

- canal;
- clima comercial, conforme registro pouco claro na transcrição;
- apólice cliente;
- apólice grupo;
- modalidade.

A grafia de alguns desses termos pode ter sido afetada pelo reconhecimento de voz. O princípio explicado é que uma tarifa pode receber comportamento específico sem alterar necessariamente a configuração genérica.

---

## 9. Importação, exportação e transferência

## 9.1. Conceito de âmbito

A ferramenta suporta conexão com múltiplas instâncias RIF, chamadas de **âmbitos** na apresentação.

Exemplos citados:

- desenvolvimento;
- pré-produção;
- produção;
- produção LATAM;
- ambiente de vida, mencionado como distinto do ambiente demonstrado inicialmente.

A finalidade é permitir que produtos sejam trabalhados, testados e transferidos entre ambientes.

### 9.2. Importação de produto

O fluxo demonstrado para importar um produto é:

```text
Selecionar a opção de adicionar/importar produto
↓
Selecionar o âmbito
↓
Selecionar companhia, produto e vigência
↓
Iniciar o processo de importação
↓
Acompanhar o produto pendente de importação
↓
Consultar a bitácora/status
↓
Produto passa a integrar a lista disponível no Taller
```

A tela de status mostra processos como:

- importação desde TRON;
- importação de ofertas comerciais desde RTE;
- exportação para Excel de tarifas;
- exportação para TRON.  
  *Referência visual: Frame 10, aproximadamente 34:53.*

### 9.3. Importação e acompanhamento de processos

A ferramenta possui uma bitácora ou histórico de execução para acompanhar processos. Ela informa, ao menos:

- data e hora;
- estado;
- âmbito;
- companhia;
- possíveis mensagens de erro.

O apresentador explica que mensagens técnicas detalhadas deixaram de ser expostas de forma ampla por conterem informações de estrutura interna e por motivos de segurança. Por isso, mensagens mais genéricas são exibidas ao usuário.

### 9.4. Exportação total de produto

A exportação total envia a configuração do produto para os ativos integrados.

Segundo a explicação, essa operação exige cuidado porque:

- depende de o produto estar devidamente configurado;
- pode afetar configurações já existentes;
- não deve ser usada indiscriminadamente em contexto produtivo.

### 9.5. Exportação com dependências

A opção **“Exportar con dependencias”**, visível na tela do produto, envia:

- os dados do produto;
- os elementos comuns referenciados pelo produto;
- outras estruturas necessárias para preservar a coerência da configuração.  
  *Referência visual: Frame 11.*

O exemplo citado é o de uma cobertura definida no nível de companhia. Se o produto for enviado sem essa cobertura ou seus parâmetros, o destino poderá ficar incompleto.

A vantagem é reduzir o risco de enviar um produto sem os elementos de que ele depende. A desvantagem é o risco maior de sobrescrever dados.

### 9.6. Exportações parciais

Para reduzir o impacto de alterações, foram criadas exportações mais específicas.

Exemplos citados:

- exportar uma tarifa;
- exportar uma tarifa com dependências;
- exportar uma especialização de tarifa;
- exportar conceitos específicos.

Essa estratégia é apresentada como resposta à preocupação de modificar apenas o necessário, evitando sobrescrever todo o produto ou configurações não relacionadas.

### 9.7. Exportação de especialização

Quando uma tarifa está filtrada ou especializada, por exemplo para o agente 3, a exportação de especialização envia apenas os dados daquela especialização.

A intenção é limitar o alcance da mudança:

```text
Especialização selecionada
↓
Exportação específica
↓
Alteração limitada ao contexto especializado
↓
Menor risco de afetar outros agentes, canais ou configurações gerais
```

### 9.8. Importação e exportação de elementos comuns

Elementos comuns também podem ser importados e exportados.

Durante a importação, o usuário pode selecionar:

- âmbito;
- companhia;
- entidades auxiliares desejadas;
- todas as entidades ou apenas um subconjunto.

O apresentador exemplifica a atualização apenas de moedas caso tenha ocorrido mudança em TRON.

Nem todas as entidades importadas são necessariamente exportáveis. Certas informações podem ser trazidas apenas para permitir relacionamento com o produto, mas não serem consideradas de manutenção pelo Taller de Productos. Foram citados como exemplos agentes e apólices de grupo.

---

## 10. Cópia e reutilização entre ambientes

### 10.1. Criação de produto a partir de outro produto

O Taller de Productos permite criar um produto em branco, mas também permite usar outro produto como modelo.

Esse recurso permite:

- copiar um produto existente;
- alterar código, vigência e atributos necessários;
- reutilizar uma estrutura já configurada;
- potencialmente transferir uma configuração de um ambiente para outro.

### 10.2. Risco de elementos comuns incompatíveis

O apresentador alerta que, ao transferir um produto de um ambiente para outro, é necessário assegurar coerência dos elementos comuns.

Um produto pode ser copiado corretamente, mas falhar posteriormente caso os elementos comuns dos quais depende não tenham sido transferidos ou não existam de forma compatível no destino.

### 10.3. Contratos durante a cópia

Ao copiar um produto, o usuário pode optar por incluir ou não contratos associados.

A lógica explicada é:

- para criar um produto novo, contratos existentes podem não fazer sentido e podem ser excluídos da cópia;
- para replicar uma configuração para testes ou outro ambiente, pode ser desejável incluir também contratos e ofertas comerciais associadas.

---

## 11. Contratos e subcontratos

## 11.1. Finalidade

Contratos e subcontratos são apresentados como formas de especialização de produto para acordos comerciais específicos.

O exemplo citado é o de um cliente grande com condições particulares negociadas, como uma grande empresa ou entidade. Essas condições podem exigir comportamento diferente do produto padrão.

### 11.2. Criação e vínculo com produtos

Um contrato é criado no nível de elementos comuns e depois vinculado a um produto.

Esse vínculo possui data de vigência própria, independente da vigência do produto.

A partir daí, o contrato se torna um ponto de entrada para especializar determinadas configurações do produto.

### 11.3. Configurações especializáveis

A reunião cita que contratos podem alterar, entre outros:

- constantes;
- conceitos;
- códigos de promoção;
- coberturas;
- tarifas;
- ofertas comerciais;
- configurações relacionadas ao cotizador.

A lista não deve ser considerada exaustiva, pois a apresentação não detalha todas as entidades suportadas.

### 11.4. Cópia de contratos

A ferramenta permite copiar um contrato existente — especialmente dentro do mesmo produto — para facilitar a criação de um novo contrato semelhante.

O objetivo é evitar recriar do zero uma configuração complexa quando grande parte dela é comum a outra negociação.

### 11.5. Subcontratos

Subcontratos são apresentados como uma especialização adicional de contratos.

O apresentador afirma que seu funcionamento é basicamente semelhante:

- vinculam-se a um contrato já associado ao produto;
- permitem nova camada de particularização;
- podem atender cenários específicos dentro de uma relação contratual maior.

A transcrição não detalha critérios de negócio, regras de precedência ou resolução de conflitos entre produto, contrato e subcontrato.

### 11.6. Ofertas comerciais por contrato

Em MAWDY, a apresentação indica que determinadas ofertas comerciais são definidas no nível de contrato, e não diretamente no nível de produto.

Em outras empresas do grupo, a configuração pode ocorrer no produto e ser apenas ajustada no contrato.

Isso evidencia que o Taller de Productos busca acomodar diferenças operacionais entre empresas, países ou contextos do grupo, em vez de impor uma única forma de modelar todos os cenários.

---

## 12. Produtos de vida e não vida

### 12.1. Tratamento diferenciado

A sessão demonstrou inicialmente um produto de não vida. Depois, o apresentador explicou que produtos de vida possuem particularidades.

Para produtos de vida:

- a modalidade assume importância central;
- muitos dados dependem da modalidade selecionada;
- a tela pode exigir seleção prévia de modalidade antes de carregar as informações do produto;
- surgem entidades específicas que não aparecem no fluxo de não vida.

### 12.2. Permissões também afetam a visibilidade

Na demonstração de vida, alguns itens apareceram bloqueados ou não acessíveis. O apresentador relaciona esse comportamento ao modelo de permissões.

Portanto, a disponibilidade de telas e ações não depende apenas do tipo de produto: também depende do perfil do usuário.

---

## 13. Modelo de permissões

## 13.1. Objetivo

O modelo de permissões busca controlar:

- o que cada usuário pode visualizar;
- quais entidades pode modificar;
- quais operações pode executar;
- em quais âmbitos e companhias essas permissões se aplicam.

A justificativa apresentada é tanto operacional quanto de segurança: determinados usuários não precisam ver funcionalidades irrelevantes para sua companhia ou país, e ações críticas — especialmente exportações em produção — devem ser restritas.

### 13.2. Escopo das permissões

As permissões são atribuídas por:

- usuário;
- âmbito;
- companhia;
- papel ou rol.

Um mesmo usuário pode possuir papéis diferentes em instâncias diferentes. Por exemplo, pode ter alto nível de acesso em desenvolvimento e acesso reduzido em produção.

### 13.3. Papéis

Um papel é descrito como agrupamento de permissões.

Um usuário pode acumular múltiplos papéis, como:

- gestor de tarifas;
- administrador de coberturas;
- administrador de determinadas configurações comerciais.

A lógica apresentada é aditiva: se algum papel concede uma determinada permissão, o usuário pode executar a ação correspondente.

### 13.4. Níveis de permissão para entidades

A apresentação indica até cinco níveis de controle por tela ou entidade:

| Nível | Significado descrito |
|---|---|
| Ocultar | A entidade não aparece para o usuário. |
| Sem permissão | A entidade aparece, mas bloqueada, por exemplo com cadeado. |
| Ver | Permite visualizar sem editar. |
| Modificar | Permite alterar entidades existentes. |
| Criar | Permite criar e modificar. |
| Apagar e criar | Permite também apagar, quando a entidade admitir exclusão. |

A transcrição menciona “até cinco níveis”, mas lista seis comportamentos quando se considera “ocultar” e “sem permissão” separadamente. Essa inconsistência provavelmente decorre da formulação oral ou do reconhecimento de voz. O conteúdo essencial é que existem níveis graduais de visibilidade e edição.

### 13.5. Permissões funcionais

Além das permissões sobre entidades, existem permissões para ações funcionais, como:

- importar auxiliares;
- exportar auxiliares;
- criar produtos;
- copiar contratos;
- remover produtos não exportados;
- publicar, conforme termo registrado na transcrição.

As operações de exportação são destacadas como particularmente sensíveis em ambientes produtivos.

---

## 14. Uso de Excel

## 14.1. Motivação

A manutenção de grandes volumes de dados em telas web é considerada pouco prática para certos cenários, especialmente tarifas e ofertas comerciais.

Para isso, a ferramenta permite baixar dados em formato Excel, modificá-los e reenviá-los.

### 14.2. Possibilidades mencionadas

O recurso permite, entre outras ações:

- baixar todos os dados de um produto;
- baixar partes específicas;
- baixar uma tarifa específica;
- baixar versões diferentes de uma tarifa;
- baixar dados de um contrato;
- baixar dados de um subcontrato;
- baixar ofertas comerciais;
- baixar determinados identificadores;
- modificar uma configuração e reenviá-la;
- criar um produto do zero por meio da alteração e reenvio de arquivos.

### 14.3. Organização dos arquivos

A exportação pode produzir um arquivo ZIP contendo múltiplos arquivos Excel.

A organização segue o princípio de separar entidades que possuem vigências próprias. Assim, uma tarifa ou uma oferta comercial com vigência independente pode ser exportada em arquivo próprio.

A apresentação menciona também um Excel de entidades pequenas, que podem ser agrupadas por serem mais simples, ainda que possuam datas de vigência.

### 14.4. Comparação de versões

Foi citado o uso de exportações separadas para comparar versões de tarifas ou vigências diferentes em Excel, quando isso for mais conveniente do que comparar pela interface.

### 14.5. Limitações não detalhadas

A reunião não explica:

- o layout completo das planilhas;
- regras de validação;
- tratamento de erros de carga;
- limites de tamanho;
- governança de alteração e aprovação;
- como conflitos são resolvidos;
- se existem mecanismos de bloqueio concorrente.

---

## 15. Modelo operacional observado

### 15.1. Execução assíncrona aparente

A importação e exportação são apresentadas como processos que podem ser lançados e depois acompanhados por status ou bitácora.

A evidência visual mostra etapas com estados como “Completado” e “Pendiente”, sugerindo processamento não imediato para ao menos parte das operações.  
*Referência visual: Frame 10.*

Contudo, a reunião não descreve tecnicamente o modelo de execução. Não é possível afirmar se há fila, agendamento, processamento em lote ou outro mecanismo.

### 15.2. Observabilidade funcional

O histórico de processos permite acompanhar:

- operações realizadas;
- status;
- usuário;
- data e hora;
- destino ou tipo de operação;
- mensagens genéricas de erro.

Esse mecanismo oferece rastreabilidade operacional básica, embora a reunião não apresente detalhes sobre logs, métricas, monitoramento técnico ou alertas.

### 15.3. Segurança da informação em erros

A decisão de ocultar detalhes técnicos de erros foi justificada pelo risco de expor estruturas internas.

Essa é uma decisão operacional relevante: o usuário recebe informação de falha, mas o nível de detalhe é limitado para reduzir exposição de informação interna.

---

## 16. Casos e exemplos concretos apresentados

## 16.1. Produto 160 — Asistencia en Viaje

O produto **160 – Asistencia en Viaje** foi usado como principal exemplo de demonstração.

Foram exibidos dados como:

- código 160;
- nome Asistencia en Viaje;
- vigência 01/01/2015 em uma das telas;
- companhia identificada visualmente como **MAWDY, S.A._RD_SR (12101)**;
- referência a **Mia Travel**.  
  *Referência visual: Frame 12.*

Esse produto foi utilizado para ilustrar:

- importação de TRON;
- navegação pela estrutura do produto;
- tarifas;
- coberturas;
- exportação;
- uso de versões.

### 16.2. Produtos pendentes de importação

A tela de produtos mostrou uma seção de produtos pendentes de importação, incluindo:

- 160 – Asistencia en Viaje;
- 110 – Asistencia en carretera;
- 150 – Multiasistencia.  
  *Referência visual: Frame 10.*

Não há elementos suficientes para concluir que esses itens representem um catálogo completo ou uma situação produtiva real.

### 16.3. Configurações específicas de MAWDY

MAWDY é citada como contexto no qual existem configurações particulares, como:

- identificadores MAWDY;
- identificadores AMA;
- determinadas ofertas comerciais no nível de contrato;
- integração com Gestor de Colecciones.

A apresentação ressalta que essas áreas podem ser ocultadas para usuários de outros países ou empresas que não utilizem tais capacidades.

### 16.4. Vida

Foi utilizado um ambiente com dados de vida para explicar que alguns produtos exigem seleção de modalidade e exibem entidades específicas de vida.

A reunião não detalha os produtos, países, companhias ou regras de negócio desse domínio.

---

## 17. Números e indicadores citados

| Indicador | Valor ou referência | Contexto |
|---|---:|---|
| Coberturas usadas como exemplo | 50 | Exemplo hipotético para demonstrar a dificuldade de configurar o mesmo produto em vários ativos. |
| Ativos que poderiam precisar de um mesmo dado | 4 ou 5 | Exemplo hipotético para explicar risco de inconsistência. |
| Produto demonstrado | 160 | Asistencia en Viaje. |
| Produto listado | 110 | Asistencia en carretera. |
| Produto listado | 150 | Multiasistencia. |
| Companhia exibida | 12101 | MAWDY, S.A._RD_SR, conforme tela. |
| Vigência exibida | 01/01/2015 | Exemplo de versão/configuração do produto 160. |
| Agente usado como exemplo de especialização | 3 | Especialização de tarifa demonstrada. |
| Número de níveis/ações de permissão | “até 5”, com 6 comportamentos descritos | Há inconsistência na fala; não deve ser tratado como número técnico confirmado. |

> Os dados acima foram declarados ou exibidos durante a reunião e não foram auditados externamente.

---

## 18. Perguntas, respostas e esclarecimentos

### 18.1. Houve perguntas técnicas formais?

A sessão contém poucas perguntas substantivas registradas na transcrição. Em vários momentos, o apresentador pergunta se há dúvidas, mas não há respostas técnicas claramente capturadas.

Isso pode decorrer de dois fatores:

- ausência efetiva de perguntas;
- perda de conteúdo causada pela qualidade da transcrição.

### 18.2. Pergunta operacional: a reunião está sendo gravada?

Durante a explicação sobre especialização de tarifas, o apresentador percebe que não sabe se a reunião está sendo gravada e pergunta se alguém iniciou a gravação.

A resposta recebida é afirmativa: a gravação já estava ativa.

#### O que isso esclarece

Não acrescenta informação funcional sobre o sistema, mas confirma que a sessão estava sendo registrada para consulta posterior.

### 18.3. Perguntas implícitas respondidas pela apresentação

Embora não apareçam como perguntas de participantes, a apresentação responde a dúvidas práticas importantes.

#### Como evitar enviar configurações demais?

A resposta foi a criação de exportações parciais e especializadas:

- exportar apenas uma tarifa;
- exportar apenas uma especialização;
- exportar conceitos selecionados;
- escolher exportar com ou sem dependências.

#### Como reduzir o risco de configuração inconsistente?

A resposta apresentada combina:

- centralização no Taller de Productos;
- distribuição automática por ativo;
- exportação com dependências;
- gestão de elementos comuns;
- controle de permissões;
- limitação de ações críticas em produção.

#### Como trabalhar com cenários contratuais específicos?

A resposta é o uso de contratos e subcontratos como camadas de especialização sobre o produto base.

#### Como tornar mais prático o trabalho com dados extensos?

A resposta é o uso de Excel para exportação, alteração e reimportação de dados.

---

## 19. Limitações reconhecidas

### 19.1. Transição ainda incompleta para a fonte central

O Taller de Productos é descrito como futura *golden source*, mas a migração não está concluída. Ainda há elementos em evolução e coexistência com configurações em TRON.

### 19.2. Regras de risco não disponíveis no ambiente demonstrado

A área de regras de risco é mencionada, mas não estava implantada ou conectada na pré-produção mostrada.

### 19.3. Nem todas as entidades possuem exportação parcial

O apresentador afirma que as exportações específicas foram sendo criadas sob demanda, especialmente para entidades modificadas com mais frequência. Nem todas as entidades possuem necessariamente esse tipo de granularidade.

### 19.4. Exportar com dependências pode sobrescrever dados

A exportação com dependências aumenta a completude da transferência, mas também aumenta o risco de sobrescrever configurações existentes.

### 19.5. Algumas informações são apenas importáveis

Certas tabelas ou entidades podem ser importadas para servir de referência, mas não exportadas, porque não são consideradas de manutenção no Taller de Productos.

### 19.6. Detalhes técnicos de erro não são expostos

A ferramenta deliberadamente limita a exposição de erros técnicos detalhados para não divulgar estruturas internas.

### 19.7. Funcionalidades específicas podem variar por empresa ou país

A própria apresentação reconhece que certas telas, identificadores e comportamentos são particulares de MAWDY ou de determinados contextos. A configuração visível pode variar de acordo com companhia, país, perfil e ativo utilizado.

---

## 20. Riscos e desafios

## 20.1. Riscos explicitamente mencionados

| Risco | Consequência apresentada |
|---|---|
| Configuração manual em múltiplos ativos | Duplicidade, esquecimento e inconsistência. |
| Exportação total de produto existente | Sobrescrita de informações e impacto indevido em produção. |
| Cópia de produto sem elementos comuns compatíveis | Produto pode falhar ou ficar incompleto no destino. |
| Exportação sem dependências | Ativos podem não receber entidades necessárias ao funcionamento. |
| Acesso amplo a exportações em produção | Alterações indevidas no ambiente produtivo. |
| Exposição detalhada de erros técnicos | Risco de revelar estrutura interna do sistema. |

## 20.2. Desafios derivados do contexto

> **Os pontos abaixo são leituras analíticas, não declarações literais dos participantes.**

### Governança de mudanças

A possibilidade de importar, editar, exportar, copiar e alterar por Excel exige forte governança operacional. Embora o modelo de permissões reduza parte do risco, a reunião não detalha fluxos de aprovação, segregação de funções ou revisão por pares.

### Coerência entre ambientes

A transferência entre âmbitos facilita testes e promoção de configurações, mas a dependência de elementos comuns exige disciplina para manter equivalência entre os ambientes.

### Complexidade de precedência

A coexistência de produto, tarifa, especialização, contrato, subcontrato, vigência e modalidade indica um modelo poderoso, mas potencialmente complexo. A reunião não detalha as regras de prioridade quando várias camadas definem o mesmo atributo.

### Adoção e capacitação

Como o sistema centraliza muitas funções antes distribuídas, a adoção depende de usuários entenderem:

- o impacto das exportações;
- o uso correto de dependências;
- vigências e versões;
- especializações;
- contratos;
- permissões.

---

## 21. Transformações estruturais identificadas

> **Esta seção apresenta interpretação sustentada pelo conjunto da reunião. Não deve ser lida como afirmação literal de um participante.**

### 21.1. De configuração distribuída para governança centralizada

O movimento mais evidente é a saída de uma configuração dispersa em vários ativos para um ponto central de administração.

Isso não elimina os ativos de destino, mas altera a forma de governar suas configurações.

### 21.2. De manutenção técnica por ativo para visão de produto

O usuário passa a trabalhar prioritariamente com o produto e suas regras de negócio, e não com a estrutura interna de cada ativo.

Essa abstração reduz a necessidade de o operador saber onde cada dado será persistido.

### 21.3. De exportação ampla para mudanças granulares

A criação de exportações de tarifa, especialização e conceitos específicos sinaliza uma evolução operacional:

```text
Exportar tudo
↓
Alto risco de sobrescrita
↓
Necessidade de controle fino
↓
Exportações parciais e especializadas
```

### 21.4. De cópias manuais complexas para reutilização estruturada

A capacidade de copiar produtos entre ambientes, reutilizar produtos como modelo e replicar contratos reduz a necessidade de reconstruir configurações complexas manualmente.

### 21.5. De funcionalidade universal para experiência adaptada por contexto

O modelo de permissões e a possibilidade de ocultar funcionalidades específicas indicam que a solução busca atender múltiplas companhias, países e domínios sem expor todas as opções a todos os usuários.

---

## 22. O que a reunião não permite concluir

A apresentação fornece uma visão funcional rica, mas não permite afirmar com segurança diversos aspectos técnicos e operacionais importantes.

Não foram suficientemente detalhados:

- tecnologia de hospedagem ou cloud;
- arquitetura de rede;
- uso de Kubernetes, containers ou servidores tradicionais;
- bancos de dados efetivamente utilizados por cada ativo;
- protocolo de integração;
- contratos de API;
- mensageria;
- modelo de eventos;
- processamento síncrono ou assíncrono;
- estratégia de reprocessamento;
- idempotência de importações e exportações;
- modelo de IAM;
- autenticação corporativa;
- segregação de funções além dos perfis descritos;
- criptografia;
- auditoria completa de alterações;
- SLA;
- RTO/RPO;
- recuperação de desastre;
- CI/CD;
- testes automatizados;
- gestão de versões de configuração;
- governança de aprovação para publicação em produção;
- tratamento de conflito entre alterações concorrentes;
- critérios para reversão de uma exportação;
- custo, FinOps ou modelo de cobrança;
- responsáveis formais por cada ativo;
- roadmap com datas ou marcos futuros concretos.

Também não é possível expandir com segurança siglas como **RTE**, **ADUP**, **AMA**, **MDE** ou **MPL**, pois a reunião não apresenta seus significados completos.

---

## 23. Conclusões

O Taller de Productos foi apresentado como uma plataforma de centralização e governança da configuração de produtos em um ecossistema distribuído de ativos.

Seu valor principal está em reduzir a duplicidade de manutenção, esconder a complexidade dos destinos técnicos e permitir que a configuração seja tratada de forma orientada ao produto. Para isso, combina:

- estrutura hierárquica de dados;
- elementos comuns reutilizáveis;
- importação e exportação;
- versões e vigências;
- contratos e subcontratos;
- especializações;
- transferências entre ambientes;
- manutenção assistida por Excel;
- permissões detalhadas;
- acompanhamento de processos.

A reunião também deixa claro que essa centralização não elimina os riscos de configuração. Exportações amplas, dependências entre entidades, diferenças entre ambientes e particularidades de companhias exigem controles operacionais e usuários capacitados.

A principal direção estratégica apresentada é a evolução do Taller de Productos para se tornar a fonte central de configuração dos produtos, reduzindo gradualmente a necessidade de manutenção direta em TRON e permitindo uma operação mais coerente entre os diferentes ativos do ecossistema.
