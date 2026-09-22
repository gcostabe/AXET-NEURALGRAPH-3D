# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `0004-TE-DEFINICION-Tercero-Generico.mp4`
**Data de processamento:** 20/09/2026 14:10:08
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise Estruturada — Configuração de Agentes, Comissões e Terceiros no Núcleo de Seguros

> **Base documental:** transcrição fornecida, aparentemente oriunda de treinamento funcional/técnico sobre uma plataforma de seguros registrada como “Rift Core”, “Riscor” ou termo semelhante. A grafia exata do nome da plataforma não pode ser confirmada pela transcrição; neste documento será usada a expressão **plataforma/núcleo** quando não for necessário reproduzir o termo.
>
> **Rastreabilidade:** a transcrição não contém timestamps ou numeração de linhas. As referências são feitas por assunto e sequência da exposição.
>
> **Natureza do conteúdo:** trata-se majoritariamente de explicações de configuração funcional, exemplos hipotéticos e orientações de implementação. Quando houver análise derivada, ela será identificada explicitamente.

---

## 1. Síntese executiva

A reunião aborda a configuração de **agentes e demais terceiros** em uma plataforma central de seguros. O foco principal está em como uma seguradora pode modelar sua rede comercial — especialmente intermediários, agentes, brokers, assessores e organizadores — utilizando catálogos de configuração que determinam tipologias, regras de comissão, distribuição de comissões, escritórios autorizados, fontes de produção, subsídios e formas de comunicação.

A mensagem central é que a plataforma oferece capacidade de configuração ampla, mas a escolha do significado de cada código e catálogo deve ser tomada pela própria seguradora de acordo com sua estratégia comercial, financeira, operacional e de produto. O instrutor alerta repetidamente que não basta preencher códigos: é necessário definir para que a informação será usada e evitar configurações sem propósito operacional claro.

Também é enfatizado que alterações em apólices emitidas devem ocorrer pelo processo formal de suplemento/endosso, e não por manipulação direta de dados. Essa orientação é apresentada como essencial para preservar a integridade operacional e histórica das apólices.

Na parte final, a reunião amplia o escopo dos agentes para tratar de **terceiros genéricos**, suas relações, grupos familiares ou hierárquicos e a possibilidade de relacionar entidades no sistema. O instrutor destaca que tais funcionalidades podem ser úteis, mas requerem governança e qualidade de dados; em escala de milhões de clientes, sua manutenção manual pode ser impraticável.

---

## 2. Contexto e antecedentes

A sessão parece fazer parte de uma formação progressiva sobre a estrutura funcional da plataforma de seguros. O instrutor faz referências recorrentes a temas vistos anteriormente, entre eles:

- estrutura de clientes distribuidores;
- estrutura de produtos;
- setores, subsetores e ramos técnicos;
- tratamentos de produto;
- estrutura comercial;
- estrutura geográfica;
- fontes de produção ou canais;
- tesouraria;
- emissão;
- modelo de dados;
- controles técnicos;
- notificações;
- liquidação de comissões.

A reunião ocorre em um ponto intermediário da formação. O próprio instrutor menciona que os participantes ainda estão em uma etapa conceitual e que a compreensão técnica será aprofundada quando estudarem o modelo de dados e a implementação da solução.

### Cenário funcional apresentado

A plataforma trata agentes como um tipo de **cliente distribuidor**. Um agente pode ser:

- uma pessoa física;
- uma pessoa jurídica;
- um broker/corretor de seguros;
- um profissional individual habilitado para intermediar apólices.

No exemplo referente à Espanha, o instrutor cita a **Dirección General de Seguros (DGS)** como entidade associada à habilitação de profissionais para comercializar ou intermediar apólices. Ele também esclarece que um agente não precisa ser vinculado exclusivamente a uma seguradora e pode vender produtos de diferentes companhias.

### Problema de fundo

A necessidade não é apenas cadastrar agentes, mas modelar de forma consistente:

- quem pode comercializar;
- quais produtos ou tratamentos pode operar;
- em quais escritórios pode atuar;
- por quais canais pode produzir;
- quais regras de comissão lhe são aplicáveis;
- como a comissão é eventualmente dividida com outros participantes;
- quais subsídios ou incentivos pode receber;
- como suas relações com outros terceiros podem ser registradas.

---

## 3. Problemas identificados

### 3.1 Uso de classificações sem finalidade definida

O instrutor questiona a utilidade de criar uma tipologia de agentes sem definir seu uso posterior. A classificação pode existir tecnicamente, mas, se for apenas um atributo descritivo sem impacto em processos, análises, regras comerciais ou financeiras, seu valor é limitado.

Exemplos de classificações que poderiam ser adotadas, desde que tenham finalidade definida:

- volume de prêmios;
- qualidade ou desempenho comercial;
- índice de cobrança;
- grau de vínculo com a seguradora;
- localização física;
- canal de comercialização;
- escopo geográfico;
- autorização para produtos;
- existência ou não de atendimento ao público;
- agente multiproduto, especializado ou monoproduto;
- condição de subvencionado ou não subvencionado.

### 3.2 Objetivos distintos entre áreas da seguradora

A transcrição mostra que a mesma classificação pode ser útil para uma área e pouco relevante para outra.

Por exemplo:

- a área comercial pode se interessar por agentes que ultrapassem determinado volume anual de prêmios de nova produção;
- a área financeira pode valorizar mais o índice real de cobrança em relação aos prêmios emitidos;
- a área operacional pode precisar identificar onde e por quais canais o agente está autorizado a intermediar;
- a área de produto pode precisar saber quais produtos o agente está habilitado a vender.

O instrutor usa como ilustração agentes que podem cumprir metas comerciais em determinado período, mas apresentar queda posterior na cobrança. O exemplo não identifica empresas ou pessoas específicas; sua finalidade é demonstrar que volume de produção e qualidade financeira da carteira podem ser indicadores diferentes.

### 3.3 Risco de erros na emissão

A distribuição de comissões pode envolver várias figuras e percentuais. Solicitar que o usuário responsável pela emissão informe manualmente todos os participantes e percentuais em cada apólice aumenta o risco de erro.

A solução apresentada para reduzir essa complexidade é o uso de **quadros de distribuição de comissões**, que agrupam uma configuração recorrente sob uma única chave/código.

### 3.4 Risco de inconsistência por alteração direta de dados

O instrutor é enfático ao afirmar que correções em apólices já emitidas devem ser realizadas por suplemento/endosso. Alterar diretamente registros internos do sistema, embora tecnicamente possível, é descrito como prática inadequada e gravemente incorreta do ponto de vista operacional e ético.

### 3.5 Complexidade de manutenção de relações entre terceiros

A funcionalidade de relacionar terceiros, grupos familiares e grupos hierárquicos pode ser útil, mas pode se tornar difícil de manter se a seguradora tiver milhões de clientes ou terceiros.

O instrutor sugere que, para grandes volumes, a atualização dessas relações poderia exigir processamento em lote (*batch*) ou algoritmos específicos, em vez de manutenção manual individual.

### 3.6 Dependência de conhecimento funcional acumulado

O treinamento ressalta que a plataforma é extensa e cobre grande parte da operação de uma seguradora. Segundo a experiência relatada pelo instrutor, equipes locais que mantêm conhecimento contínuo do sistema tendem a utilizá-lo melhor do que equipes que dependem de forte terceirização e rotatividade frequente.

Essa é uma visão expressa pelo instrutor, não uma conclusão quantitativamente demonstrada na reunião.

---

## 4. Solução apresentada

A solução apresentada é um conjunto de catálogos e estruturas de configuração associadas ao cadastro de agentes e terceiros.

O modelo exposto parte de uma lógica comum:

1. A seguradora define catálogos corporativos ou por companhia.
2. Os códigos desses catálogos representam classificações, regras ou capacidades.
3. Os agentes recebem associações específicas a esses códigos.
4. Durante a emissão, os dados previamente configurados são recuperados e aplicados.
5. A plataforma reduz a necessidade de informar manualmente dados complexos em cada operação.

A configuração é apresentada como uma forma de equilibrar:

- flexibilidade local;
- padronização;
- controle operacional;
- simplificação da emissão;
- integridade dos dados;
- possibilidade de cálculo de comissões e incentivos.

---

## 5. Arquitetura lógica reconstruída

A transcrição não apresenta um diagrama formal. A representação a seguir é uma **consolidação analítica** do funcionamento descrito:

```text
Estruturas corporativas e por companhia
│
├── Estrutura de produtos
│   ├── Setor
│   ├── Subsetor
│   ├── Ramo técnico
│   └── Código de tratamento
│
├── Estrutura comercial
│   ├── Territorial
│   ├── Regional
│   └── Escritório
│
├── Estrutura de canais / fontes de produção
│   └── Terceiro nível / fonte de produção
│
├── Catálogos de agentes
│   ├── Tipologia de agente
│   ├── Quadros de comissão
│   ├── Quadros de distribuição de comissão
│   ├── Escritórios habilitados
│   ├── Subsídios
│   ├── Fontes de produção habilitadas
│   └── Métodos de envio
│
├── Cadastro do agente / terceiro
│   ├── Chave única do agente
│   ├── Dados e atividade
│   ├── Associações comerciais
│   ├── Autorizações
│   └── Relações com outros terceiros
│
└── Processos operacionais
    ├── Emissão de apólices
    ├── Suplementos/endossos
    ├── Cálculo e liquidação de comissões
    ├── Tesouraria
    ├── Notificações
    └── Contabilização
```

### Leitura analítica da arquitetura

Uma leitura possível é que a plataforma separa:

- **dados mestre e catálogos**, usados para parametrizar regras;
- **cadastro de terceiros**, usado para identificar participantes;
- **dados transacionais de apólices**, usados para registrar fatos de negócio;
- **processos de emissão e liquidação**, responsáveis por aplicar as configurações vigentes.

Essa separação é sustentada pela explicação de que a apólice guarda, entre outras informações, o código do agente, enquanto dados complementares do agente podem ser recuperados conforme sua configuração e vigência.

---

## 6. Agentes e clientes distribuidores

### 6.1 Conceito de agente

O agente é apresentado como um intermediário de seguros e, funcionalmente, como um cliente distribuidor dentro do sistema.

Pode assumir formatos distintos:

- pessoa física;
- pessoa jurídica;
- broker/corretor;
- profissional individual habilitado;
- outras formas de intermediário admitidas pela seguradora e pelo contexto regulatório local.

### 6.2 Não exclusividade do agente

O instrutor ressalta que o agente não é necessariamente vinculado a uma única companhia. Ele pode comercializar produtos de várias seguradoras.

Essa observação é importante porque impede assumir, sem configuração explícita, que todo agente opera exclusivamente para a seguradora que utiliza a plataforma.

### 6.3 Chave única do agente

A associação de configurações ao agente é explicada a partir de uma chave única, isto é, um código de agente que identifica aquela pessoa ou entidade dentro da companhia.

O instrutor contrasta essa escolha com uma modelagem baseada em tipo e número de documento. A preferência apresentada é utilizar um código único de agente quando esse identificador já é suficiente para representar a entidade de maneira consistente.

---

## 7. Tipologia de agentes

### 7.1 Finalidade

A tipologia de agente é um catálogo que permite classificar agentes segundo critérios definidos pela seguradora.

A transcrição deixa claro que não existe uma finalidade única e obrigatória. A empresa deve decidir o que deseja representar com a tipologia.

### 7.2 Critérios possíveis citados

Foram mencionados, como exemplos, os seguintes critérios:

| Critério possível | Uso potencial |
|---|---|
| Grau de vínculo | Diferenciar agentes vinculados e não vinculados |
| Localização física | Escritório, residência, centro de trabalho ou outro local |
| Canal de origem | Tradicional, digital, telefônico |
| Oferta de produtos | Multiproduto, especializado, monoproduto |
| Licenças/autorização | Identificar capacidade para comercializar determinados produtos |
| Escopo geográfico | Global, regional ou local |
| Condição de subsídio | Subvencionado ou não subvencionado |
| Atendimento ao público | Com ou sem atendimento presencial |
| Volume de prêmios | Segmentação comercial |
| Índice de cobrança | Segmentação financeira |

### 7.3 Combinações de critérios

O instrutor menciona que a tipologia pode resultar da combinação de vários atributos, por exemplo:

- grau de vínculo;
- localização;
- oferta de produtos.

Essa combinação é comparada a um “produto cartesiano” de classificações, indicando que a quantidade de códigos pode crescer rapidamente quando múltiplas dimensões são combinadas.

### 7.4 Implicação operacional

A reunião não determina qual tipologia deve ser adotada. A decisão cabe à seguradora.

O ponto principal é que os códigos devem corresponder a uma necessidade real de:

- análise;
- segmentação;
- autorização;
- cálculo;
- gestão comercial;
- gestão financeira;
- controle operacional.

---

## 8. Quadros de comissão

### 8.1 Conceito

O quadro de comissão é apresentado como um conceito interno da plataforma utilizado para agrupar, sob uma mesma chave, características necessárias ao cálculo de comissões.

O instrutor descreve o quadro como uma estrutura que pode combinar elementos heterogêneos relacionados, por exemplo, a:

- estrutura comercial;
- estrutura de canais;
- cliente;
- produto;
- coberturas;
- regras de emissão;
- regras de comissão.

### 8.2 Relação com coberturas e apólices

A configuração das comissões pode depender das coberturas do produto. Para cada cobertura, pode ser definido, entre outros aspectos:

- se a cobertura gera comissão;
- se a comissão se aplica apenas à nova produção;
- se a comissão também se aplica a movimentações posteriores da carteira;
- quais percentuais de comissão serão utilizados.

O instrutor informa que esses detalhes seriam aprofundados em uma sessão posterior conduzida por outra pessoa identificada como “Antonio”.

### 8.3 Estrutura mínima citada

O catálogo de quadros de comissão possui, conforme a explicação:

- companhia;
- código do quadro;
- descrição;
- abreviação.

Foram apresentados exemplos ilustrativos de códigos associados a grupos de produtos, como automóveis, não vida/diversos e vida. Esses exemplos não devem ser tratados como padronização obrigatória.

### 8.4 Associação entre agente e quadro de comissão

Após definir os quadros de comissão no nível da companhia, a seguradora define quais quadros estão habilitados para cada agente.

A associação é realizada considerando:

- companhia;
- chave/código do agente;
- código de tratamento;
- código do quadro de comissão;
- situação de habilitação;
- tipo de inabilitação, quando aplicável.

### 8.5 Tratamento em vez de ramo técnico

A configuração de habilitação de quadros de comissão para o agente é explicada como baseada em **tratamento** e não diretamente em ramo técnico.

O tratamento é descrito como um agrupador de ramos técnicos que orienta como os ramos serão tratados pela aplicação. Foram citados quatro códigos de tratamento, associados a:

- automóveis;
- diversos;
- transportes;
- vida.

A razão declarada para usar tratamento, e não ramo técnico, é obter maior margem de manobra na configuração.

### 8.6 Inabilitação de quadro de comissão

A inabilitação descrita nessa configuração é específica do quadro de comissão e não deve ser confundida com motivos gerais de inabilitação de terceiros.

Um quadro pode ser inabilitado, por exemplo, quando a seguradora não deseja mais que o agente continue utilizando determinada configuração comercial de comissão.

A inabilitação pode afetar:

- somente apólices de nova produção;
- nova produção e movimentos de carteira;
- emissão de suplementos/endossos, conforme a configuração mencionada.

### 8.7 Limitação reconhecida

A transcrição não detalha:

- todos os tipos possíveis de inabilitação;
- a regra exata de cálculo de comissão;
- o modelo completo de configuração por cobertura;
- a forma como os quadros coexistem quando um agente possui mais de um quadro aplicável.

Esses temas foram explicitamente remetidos a conteúdo posterior.

---

## 9. Quadros de distribuição de comissões

### 9.1 Finalidade

O quadro de distribuição de comissões é diferente do quadro de comissão.

- **Quadro de comissão:** define a base/regra que permite calcular a comissão.
- **Quadro de distribuição de comissões:** define como o valor de comissão será repartido entre participantes envolvidos em uma apólice.

A principal finalidade declarada é simplificar o trabalho do usuário emissor e reduzir erros de preenchimento.

### 9.2 Figuras que podem participar

A transcrição informa que uma apólice possui obrigatoriamente uma chave de agente principal e pode, de forma discricionária, possuir outras figuras que também recebem comissão.

Foram citadas até seis figuras:

| Figura | Papel descrito |
|---|---|
| Agente principal | Participante obrigatório da apólice |
| Segundo agente | Participante adicional |
| Terceiro agente | Participante adicional |
| Quarto agente | Participante adicional |
| Organizador | Figura ligada à organização comercial de uma estrutura de agentes, especialmente mencionada no contexto de produtos de vida |
| Assessor | Figura que assessora agentes em produtos considerados mais complexos |

### 9.3 Exemplo de distribuição

O instrutor exemplifica, de maneira simplificada, uma apólice com:

- prêmio de 1.000 euros;
- comissão de 10%, equivalente a 100 euros;
- divisão dessa comissão entre agente principal e outros agentes.

Os percentuais citados no exemplo servem apenas para ilustrar a lógica. O próprio instrutor ressalva que a soma mencionada pode não estar exata.

### 9.4 Organizador e assessor

O organizador é apresentado como uma figura associada à organização comercial de agentes em determinada área geográfica, especialmente para produtos de vida.

O assessor é apresentado como alguém que apoia agentes em produtos mais complexos e pode ter uma atuação geográfica ou zonal.

Ambos são tratados, no sistema, como pessoas identificadas como agentes. Portanto, possuem suas próprias chaves e podem ter seus próprios quadros de comissão associados.

### 9.5 Funcionamento operacional

O usuário emissor pode selecionar um único código de quadro de distribuição. A partir dele, o sistema pode recuperar:

- agente principal;
- agente secundário;
- terceiro agente;
- quarto agente;
- organizador;
- assessor;
- percentuais de distribuição aplicáveis;
- quadro de comissão relacionado, quando configurado.

Essa automação evita que o usuário tenha de conhecer e informar manualmente todos os códigos e percentuais envolvidos.

### 9.6 Obrigatoriedade

A configuração de quadros de distribuição de comissões não é obrigatória.

Ela é apresentada como um facilitador que deve ser adotado localmente quando a operação comercial for suficientemente recorrente ou complexa para justificar a padronização.

### 9.7 Estrutura citada

A definição é realizada por companhia e pode conter:

- código do quadro de distribuição;
- denominação;
- abreviação;
- agente principal;
- quadro de comissão;
- agentes adicionais;
- percentuais relacionados;
- organizador;
- assessor.

A transcrição informa que nem todos os dados precisam necessariamente estar preenchidos na configuração, pois alguns podem ser solicitados no processo de emissão.

---

## 10. Integridade de apólices e suplementos/endossos

### 10.1 Regra operacional destacada

O instrutor afirma que toda alteração em apólice emitida deve ser realizada mediante suplemento/endosso.

A orientação é apresentada como categórica: não se deve corrigir informações alterando diretamente as estruturas internas do sistema.

### 10.2 Motivação

A justificativa implícita é a preservação de:

- histórico;
- rastreabilidade;
- integridade operacional;
- coerência entre dados de emissão, comissões e demais registros;
- conformidade com o processo de negócio.

### 10.3 Risco explicitamente indicado

Alterar diretamente registros internos poderia causar consequências graves. Embora o instrutor reconheça que alguém tecnicamente familiarizado com o modelo de dados possa realizar esse tipo de alteração, ele a caracteriza como uma prática inadequada.

### 10.4 O que a reunião não detalha

A transcrição não especifica:

- quais tabelas podem ser afetadas por um suplemento;
- quais validações formais o suplemento executa;
- quais perfis podem emitir suplementos;
- quais trilhas de auditoria são produzidas;
- como são tratados erros históricos já propagados para outros processos.

---

## 11. Escritórios habilitados para agentes

### 11.1 Estrutura comercial prévia

A seguradora configura sua própria estrutura comercial, composta por três níveis:

1. territorial;
2. regional;
3. escritório.

O instrutor destaca que essa estrutura não precisa coincidir obrigatoriamente com a estrutura geográfica do país.

### 11.2 Importância do escritório

O escritório é apresentado como especialmente relevante porque pode influenciar aspectos contábeis e comerciais.

Segundo a explicação:

- usuários do sistema também estão associados a escritórios;
- para o usuário, essa associação pode não gerar efeito direto;
- para o agente, o escritório comercial pode influenciar onde prêmios serão contabilizados;
- a atribuição pode se relacionar ao acompanhamento de metas, orçamentos, incentivos e penalizações.

### 11.3 Habilitação por agente

Para cada agente, a companhia define em quais escritórios ele pode intermediar apólices.

O agente pode possuir:

- um escritório padrão, normalmente usado para comercialização;
- outros escritórios adicionais habilitados.

O exemplo citado menciona a possibilidade de haver mais três escritórios além do padrão, mas esse valor deve ser entendido como exemplo de exposição, não como limite universal confirmado pela transcrição.

### 11.4 Vigência e inabilitação

A configuração pode possuir:

- indicador de inabilitação;
- data de validade/vigência.

O instrutor chama atenção para a necessidade de considerar a vigência em integrações, customizações locais e processos desenvolvidos fora dos serviços nativos da plataforma.

### 11.5 Questão em aberto: transferência de escritório

O instrutor sugere uma pergunta que a seguradora deve responder:

> O que acontece com a carteira de apólices de um agente quando ele muda de escritório?

A resposta não é definida durante a reunião. O instrutor alerta que a mudança pode ou não:

- recalcular comissões;
- afetar contabilização;
- impactar outros processos;
- gerar uma implementação simples, complexa ou muito complexa.

A decisão deve ser avaliada pelo negócio e monetizada, isto é, comparada ao custo de implementação.

---

## 12. Subsídios a agentes

### 12.1 Conceito

O subsídio é apresentado como uma ajuda econômica concedida pela seguradora à sua força de vendas ou aos agentes.

Pode ser utilizado como estratégia de:

- gratificação;
- reconhecimento;
- incentivo;
- remuneração condicionada a determinados critérios.

### 12.2 Configuração citada

A configuração de subsídio é realizada por:

- companhia;
- chave do agente;
- moeda;
- tipologia/classificação do subsídio;
- forma de aplicação;
- período de vigência;
- valor ou percentual;
- lógica de negócio, quando aplicável;
- valor mínimo de cobrança, em cenários relacionados ao recebimento de prêmios;
- situação de habilitação;
- data de validade.

### 12.3 Formas de aplicação

Foram citadas três formas de aplicação:

| Forma | Descrição apresentada |
|---|---|
| Valor | Subsídio definido por importe monetário |
| Percentual | Subsídio definido por percentual |
| Lógica de negócio | Subsídio calculado por regras comerciais específicas |

### 12.4 Lógica de negócio

Quando o subsídio é determinado por lógica de negócio, deve ser identificado um código associado ao mecanismo que calculará o valor ou percentual aplicável.

A transcrição menciona um “pacote Oracle” como exemplo de implementação desse cálculo. Não é possível concluir, apenas com essa referência, a arquitetura completa da solução nem confirmar que toda a plataforma utiliza Oracle em todos os seus componentes.

### 12.5 Aplicação na cobrança

Foi citada a possibilidade de vincular o subsídio ao recebimento/cobrança de recibos.

Nesse cenário, pode ser definido um valor mínimo que o agente precisa receber para ter direito ao subsídio.

O instrutor declara não saber se esse mínimo é avaliado:

- individualmente por cobrança/recibo;
- de forma consolidada em um período contábil, como um mês.

Esse ponto permanece explicitamente indefinido.

### 12.6 Relação com tesouraria e liquidação

O subsídio é associado a um conceito de ajuste no processo de liquidação de comissões. Esse conceito de ajuste deve aparecer detalhado no documento gerado no processo de liquidação, mencionado como PDF.

---

## 13. Fontes de produção e canais habilitados

### 13.1 Conceito

Além de estar associado a escritórios, um agente pode estar habilitado a determinadas formas de intermediação, representadas por fontes de produção ou pelo terceiro nível da estrutura de canais/clientes distribuidores.

### 13.2 Exemplo citado

Um mesmo agente poderia estar habilitado a vender:

- presencialmente, em escritório;
- por telefone.

Cada forma teria seu próprio código de fonte de produção.

### 13.3 Uso na emissão

No processo de emissão, o usuário deve selecionar, entre as fontes habilitadas para o agente, aquela correspondente à forma pela qual o contrato foi fechado.

A intenção é registrar corretamente se a intermediação ocorreu, por exemplo:

- presencialmente;
- por telefone;
- por outro canal configurado.

### 13.4 Relação com a tipologia de agente

A reunião sugere que deve haver coerência entre:

- a tipologia do agente;
- as fontes de produção habilitadas;
- a forma como o agente efetivamente pode operar.

Contudo, a transcrição não afirma que essa coerência seja validada automaticamente pelo sistema.

---

## 14. Métodos de envio e módulo de notificações

### 14.1 Catálogo de métodos de envio

Existe um catálogo de métodos de envio aplicáveis ao agente, destinado a indicar como informações ou documentos de apólices seriam entregues.

Foram mencionados exemplos como:

- correio eletrônico;
- correio postal;
- fax;
- disponibilização física em escritório;
- outros métodos registrados no catálogo.

### 14.2 Obsolescência reconhecida

O instrutor afirma que esse mecanismo é anterior ou menos adequado em comparação com um módulo de notificações mais moderno.

Segundo a explicação, o módulo de notificações oferece mais possibilidades, como:

- uso de URL privada;
- disponibilização de arquivo;
- encaminhamento a fornecedor para impressão/postalização;
- outros meios de entrega não detalhados.

### 14.3 Direcionamento apresentado

O catálogo de métodos de envio é descrito como existente, mas potencialmente descontinuado ou obsoleto para novas necessidades. O direcionamento implícito é privilegiar o módulo de notificações.

### 14.4 Limitação

A reunião não detalha:

- quais métodos estão de fato ativos;
- se o catálogo legado ainda é utilizado em produção;
- como ocorre a transição para o módulo de notificações;
- quais canais digitais são suportados;
- como é gerenciado consentimento ou preferência de comunicação.

---

## 15. Persistência dos dados de apólices

### 15.1 Pergunta levantada

Um participante pergunta se os catálogos de terceiros, mesmo usados em emissão, são armazenados “no mesmo lugar” ou servem apenas aos processos específicos.

### 15.2 Resposta dada

O instrutor explica que, ao emitir uma apólice, determinadas informações são gravadas em estruturas próprias do modelo de dados da apólice.

Entre os exemplos citados estão:

- número da apólice;
- número do suplemento/endosso;
- número de aplicação, quando aplicável;
- tratamento;
- data de efeito;
- moeda;
- data de vencimento;
- data de emissão;
- informações sobre controle técnico;
- código do agente.

### 15.3 Associação com a configuração do agente

A apólice grava o código do agente. Com base nesse código, na data de vencimento e na vigência da configuração do agente, o sistema pode recuperar as informações associadas ao agente.

Essa explicação indica uma relação entre:

- dado transacional da apólice;
- identificador do agente;
- configuração vigente do agente.

### 15.4 Modelo de dados distribuído

O instrutor explica que não existe necessariamente uma única tabela contendo toda a informação da apólice. Diferentes dados são armazenados em estruturas distintas, tais como:

- apólice;
- controles técnicos;
- coberturas;
- riscos associados;
- intervenientes de cada risco;
- comissões;
- conceitos de detalhamento por risco e cobertura;
- períodos de apólices multiperíodo.

### 15.5 O que essa resposta esclarece

A resposta diferencia:

- **catálogos e configurações mestres**, usados para parametrizar comportamento;
- **dados de apólice**, persistidos na emissão;
- **relações entre ambos**, estabelecidas por chaves e regras de vigência.

---

## 16. Terceiros genéricos

### 16.1 Conceito

A segunda parte da reunião introduz o conceito de terceiros genéricos.

Há atividades no sistema que possuem estruturas de dados próprias e específicas. Por exemplo:

- segurado;
- agente;
- gestor/tramitador de sinistros;
- supervisor de sinistros;
- companhia seguradora.

Por outro lado, existem atividades que, embora sejam diferentes do ponto de vista de negócio, compartilham a mesma estrutura de informação. Essas são chamadas de terceiros genéricos.

### 16.2 Significado de “genérico”

“Terceiro genérico” não significa que a entidade não tenha função. Significa apenas que diversas atividades usam a mesma estrutura de cadastro.

O instrutor exemplifica que uma pessoa física com determinada atividade e um advogado com outra atividade podem ter estruturas de dados equivalentes dentro do núcleo.

### 16.3 Atividades específicas

A transcrição menciona que certas atividades, como companhias seguradoras, possuem tabela própria devido à sua operação específica.

Também há referência a códigos de atividade “13” e “14”, mas a transcrição não permite identificar com segurança todas as atividades correspondentes nem o significado completo desses códigos.

---

## 17. Relações entre terceiros

### 17.1 Catálogo de relações

A plataforma possui um catálogo para definir possíveis relações ou conexões entre terceiros.

A estrutura mencionada é simples:

- companhia;
- código de relação/conexão;
- descrição.

### 17.2 Diferença em relação a parentesco

O instrutor alerta que esse catálogo não deve ser confundido com um catálogo específico de parentesco.

A orientação é:

- usar a estrutura de parentesco para relações familiares;
- usar o catálogo de relações para outros tipos de conexão entre terceiros.

### 17.3 Exemplos possíveis

A reunião menciona, em caráter ilustrativo:

- relação empregador–empregado;
- relação entre autônomo e empregado;
- relações comerciais ou organizacionais;
- relações não familiares que possam ser úteis para campanhas ou segmentações.

### 17.4 Caso hipotético de uso comercial

Foi apresentado um exemplo hipotético em que uma seguradora poderia oferecer desconto a autônomos e seus empregados que contratassem apólices em determinado período e com determinado valor de prêmio.

Nesse caso, a relação entre o autônomo e o empregado permitiria identificar os participantes da campanha.

O instrutor ressalta que esse é apenas um exemplo de possibilidade, não uma funcionalidade pronta ou algoritmo existente na plataforma.

---

## 18. Grupos familiares e grupos hierarquizados

### 18.1 Conceito

Além das relações individuais, o sistema permite definir grupos:

- familiares;
- hierarquizados.

### 18.2 Tipologia

A transcrição menciona dois códigos de tipologia:

| Código mencionado | Significado informado |
|---|---|
| F | Família |
| H | Hierarquia |

### 18.3 Estrutura de configuração

A definição de grupo pode conter:

- companhia;
- tipologia;
- código do grupo;
- descrição;
- tipo de documento;
- identificação da pessoa física ou jurídica que inicia/cria o grupo.

### 18.4 Grupo hierarquizado

O grupo hierarquizado não precisa ser necessariamente um grupo empresarial composto por matriz e subsidiárias. Pode representar qualquer estrutura hierárquica que a companhia decida modelar.

### 18.5 Possível sobreposição funcional

Um participante observa que grupos familiares ou relações podem se sobrepor a outras formas de representar vínculos, como parentesco.

O instrutor concorda que uso incorreto ou redundante dos catálogos pode gerar sobreposição. Essa observação reforça a necessidade de governança de modelagem e definição clara do propósito de cada catálogo.

---

## 19. Configuração da relação entre terceiros

### 19.1 Informações citadas

A configuração da relação entre dois terceiros inclui, conforme a explicação:

- companhia;
- código de atividade do primeiro terceiro;
- tipo de documento do primeiro terceiro;
- chave/documento do primeiro terceiro;
- código de atividade do terceiro relacionado;
- tipo de documento do terceiro relacionado;
- chave/documento do terceiro relacionado;
- nome;
- tipo de relação;
- grupo familiar ou hierárquico, quando aplicável.

### 19.2 Finalidade

A estrutura permite estabelecer conexões entre terceiros, independentemente de serem relações familiares, empregatícias, comerciais ou outra classificação configurada pela seguradora.

### 19.3 Escala e processamento

O instrutor levanta a questão de como manter essas relações em uma base com milhões de clientes.

Sua avaliação é que esse tipo de processamento tenderia a ser mais adequado para execução em lote (*batch*) e eventualmente apoiado por algoritmos, em vez de cadastro manual em massa.

Essa é uma recomendação/opinião apresentada durante a reunião, não uma regra formal confirmada da plataforma.

---

## 20. Caso concreto discutido: desconto para médicos colegiados

### Contexto

Um participante pergunta como poderia ser modelado um desconto para médicos vinculados a um colégio médico específico, decorrente de acordo comercial com a seguradora.

### Alternativas discutidas

Foram levantadas possibilidades como:

- grupo hierarquizado;
- marca/atributo;
- classificação ou catálogo utilizado durante a emissão;
- código promocional apresentado em material de campanha;
- identificação por agente;
- comprovação documental;
- fluxo via módulo de notificações.

### Direcionamento dado

O instrutor considera mais lógico utilizar alguma classificação ou atributo capturado no momento da emissão, em vez de depender apenas de uma relação posterior entre terceiros.

A lógica apresentada é:

1. O cliente se identifica como pertencente ao grupo profissional.
2. Essa informação é capturada no processo de venda/emissão.
3. Uma regra de negócio interpreta esse atributo.
4. O desconto é aplicado, se as condições forem atendidas.

### Possível comprovação

Foram citadas, apenas como possibilidades:

- apresentação de número de registro profissional;
- envio de formulário;
- documento solicitado por notificação;
- validação realizada pelo agente de forma presencial.

A transcrição não define qual processo seria efetivamente utilizado.

### O que esse caso revela

O exemplo mostra que:

- promoções comerciais podem depender de atributos de cliente;
- a aplicação de descontos deve ser pensada no ponto do processo em que os dados são capturados;
- a seguradora precisa definir fluxos de negócio antes de solicitar a configuração técnica;
- a solução depende de regras locais e da forma concreta de intermediação da apólice.

---

## 21. Modelo operacional e responsabilidades

### 21.1 Papel da seguradora

A seguradora é apresentada como soberana na definição de vários elementos, incluindo:

- significado das tipologias de agentes;
- códigos de classificação;
- estrutura comercial;
- fontes de produção;
- políticas de comissão;
- regras de inabilitação;
- regras de subsídio;
- tratamento de mudanças de escritório;
- critérios de campanhas;
- fluxos operacionais locais.

### 21.2 Papel de negócio e processos

O instrutor afirma que áreas de processos ou negócio devem definir os fluxos desejados e fornecer essas definições para que tecnologia configure ou implemente o comportamento necessário.

### 21.3 Papel de tecnologia

A equipe de tecnologia deve:

- configurar a plataforma conforme as definições de negócio;
- preservar vigências e inabilitações;
- evitar alterações diretas indevidas em dados transacionais;
- avaliar custo e complexidade de mudanças;
- implementar processos locais quando necessário;
- considerar impactos em integrações e funcionalidades existentes.

### 21.4 Papel dos usuários emissores

Os usuários emissores realizam a emissão de apólices e selecionam dados operacionais, como:

- fonte de produção;
- quadro de distribuição de comissões, quando aplicável;
- outros dados exigidos pelo processo.

Os quadros de distribuição são apresentados justamente como mecanismo para reduzir a necessidade de conhecimento aprofundado desses usuários sobre regras de comissionamento.

---

## 22. Governança e evolução da configuração

### 22.1 Governança de códigos

A reunião enfatiza que códigos não devem ser criados arbitrariamente. Antes de definir uma codificação, a seguradora deve entender:

- qual informação quer representar;
- quem usará essa informação;
- em qual processo ela terá efeito;
- quais combinações serão necessárias;
- como a manutenção ocorrerá ao longo do tempo.

### 22.2 Vigência como elemento transversal

A data de validade aparece repetidamente como atributo importante nas configurações.

Isso se aplica, entre outros, a:

- escritórios habilitados;
- subsídios;
- outras tabelas de configuração mencionadas.

A mensagem é que processos locais e integrações devem respeitar a vigência para não eliminar ou contornar funcionalidades nativas.

### 22.3 Avaliação econômica de mudanças

O instrutor recomenda que alterações funcionais sejam avaliadas não só por sua possibilidade técnica, mas também por seu custo em relação ao benefício.

O exemplo dado é o de uma mudança que poderia afetar poucas apólices, mas exigir investimento relevante para ser implementada.

### 22.4 Conhecimento contínuo

A manutenção da plataforma exige conhecimento funcional acumulado. O instrutor associa maior continuidade de equipe a uma utilização mais eficaz do sistema.

Essa posição sugere a importância de:

- documentação;
- capacitação;
- redução de rotatividade;
- governança de configuração;
- transferência de conhecimento.

---

## 23. Números e capacidades citados

> Os valores abaixo foram mencionados durante a explicação e não foram auditados externamente.

| Indicador | Valor mencionado | Contexto |
|---|---:|---|
| Estrutura de produtos | 3 níveis | Setor, subsetor e ramo técnico |
| Códigos de tratamento | 4 | Automóveis, diversos, transportes e vida |
| Figuras de comissão possíveis | Até 6 | Agente principal, segundo, terceiro, quarto, organizador e assessor |
| Agentes adicionais citados | 3 além do principal | Segundo, terceiro e quarto agentes |
| Exemplo de prêmio | 1.000 euros | Ilustração de cálculo de comissão |
| Exemplo de comissão | 10% | Ilustração de cálculo de comissão |
| Exemplo de comissão total | 100 euros | 10% sobre 1.000 euros |
| Exemplo de carteira de seguros de veículos | Cerca de 2 milhões | Referência ilustrativa atribuída a uma seguradora na Espanha; não confirmada |
| Exemplo de campanha | 1º de janeiro a 31 de março | Campanha hipotética para desconto |
| Exemplo de prêmio mínimo | Superior a 500 euros | Cenário hipotético de campanha |

---

## 24. Perguntas e respostas relevantes

### 24.1 Os catálogos de terceiros usados na emissão ficam no mesmo lugar dos dados da apólice?

**Pergunta:** um participante questiona se catálogos usados em emissão são armazenados na mesma estrutura dos dados da apólice ou se servem apenas para processos específicos.

**Resposta:** os dados da apólice são gravados em estruturas próprias do modelo de dados. A apólice armazena, entre outras coisas, o código do agente. A partir desse código, da data relevante e da vigência das configurações, é possível associar a apólice às informações do agente.

**O que esclarece:** configurações mestres e dados transacionais não são necessariamente a mesma coisa. A emissão grava referências e dados operacionais, enquanto configurações complementares são recuperadas conforme as regras vigentes.

---

### 24.2 Relações e grupos familiares não se sobrepõem?

**Pergunta:** um participante observa que grupos familiares e relações de parentesco podem parecer redundantes.

**Resposta:** o instrutor diferencia parentesco de relações genéricas. Ele admite que pode haver sobreposição quando os catálogos são usados de maneira incorreta ou sem uma modelagem clara.

**O que esclarece:** a plataforma disponibiliza mecanismos distintos, mas a governança de dados precisa definir quando cada um deve ser utilizado.

---

### 24.3 Como oferecer desconto a médicos vinculados a uma entidade profissional?

**Pergunta:** um participante pergunta se o cenário deveria ser representado por grupo hierarquizado ou por marca/classificação.

**Resposta:** o instrutor entende que seria mais lógico usar um atributo ou classificação capturado no momento da emissão, permitindo que uma regra de negócio aplique o desconto. Também menciona a necessidade de definir o processo de comprovação e o fluxo operacional.

**O que esclarece:** campanhas comerciais dependem não apenas da capacidade de configurar descontos, mas também de dados de entrada, comprovação de elegibilidade e definição de processo.

---

## 25. Limitações reconhecidas

### 25.1 Detalhes de comissionamento não aprofundados

A transcrição não detalha integralmente:

- cálculo de comissões por cobertura;
- percentuais;
- prioridade entre quadros;
- tratamento de exceções;
- regras de renovação;
- comportamento em todos os tipos de movimento de carteira.

Parte desse conteúdo seria abordada posteriormente por outro instrutor.

### 25.2 Subsídio vinculado à cobrança

Não foi possível determinar se o mínimo de cobrança para concessão de subsídio é avaliado:

- por recibo individual;
- por período contábil;
- por total mensal;
- por outra lógica.

### 25.3 Métodos de envio

Embora o catálogo de métodos de envio exista, o instrutor o considera potencialmente obsoleto em relação ao módulo de notificações. A reunião não confirma a estratégia de migração nem o status de uso em cada implantação.

### 25.4 Regras locais

Diversos comportamentos dependem de decisão local da companhia, incluindo:

- definição de tipologias;
- vínculo de agentes;
- estrutura de escritórios;
- regras de subsídio;
- campanhas;
- fontes de produção;
- tratamento de mudança de escritório;
- manutenção de relações entre terceiros.

### 25.5 Processamento de relações em massa

A transcrição sugere *batch* como alternativa para grandes volumes, mas não apresenta:

- mecanismo pronto;
- algoritmo;
- frequência de processamento;
- regras de deduplicação;
- governança de qualidade de dados.

---

## 26. Riscos e desafios

### 26.1 Riscos explicitamente mencionados

| Risco | Consequência indicada |
|---|---|
| Tipologias sem objetivo | Códigos sem valor operacional ou analítico |
| Erro manual na distribuição de comissões | Pagamentos incorretos ou inconsistência na emissão |
| Alteração direta de apólices emitidas | Quebra de integridade e prática operacional inadequada |
| Desconsiderar vigência | Uso indevido de configurações vencidas ou inabilitadas |
| Mau uso de catálogos de relações | Sobreposição e dados inconsistentes |
| Manutenção manual em escala | Inviabilidade operacional em bases com milhões de terceiros |
| Rotatividade e baixo domínio funcional | Uso inadequado ou incompleto da plataforma |

### 26.2 Desafios derivados do contexto

> **Análise derivada, não declaração literal da reunião.**

1. **Governança de dados mestres:** quanto maior o número de catálogos e combinações, maior a necessidade de responsáveis claros pela criação, alteração, expiração e descontinuação de códigos.

2. **Complexidade combinatória:** combinar vínculo, localização, canal, produtos e outras dimensões em uma única tipologia pode gerar quantidade excessiva de códigos e dificultar manutenção.

3. **Conciliação entre áreas:** comercial, finanças, tesouraria, contabilidade, operações e tecnologia podem usar critérios diferentes para avaliar agentes. A modelagem precisa evitar que um único atributo tente atender finalidades incompatíveis.

4. **Rastreabilidade temporal:** regras de vigência exigem cuidado especial para que consultas históricas, cálculos e emissões respeitem a configuração válida no momento correto.

5. **Qualidade das integrações locais:** processos externos ou customizações podem perder regras nativas se não considerarem indicadores de habilitação, vigência e demais validações do núcleo.

---

## 27. Transformações estruturais percebidas

> **Esta seção apresenta leituras analíticas derivadas da reunião.**

### 27.1 De cadastro simples para modelo de capacidades comerciais

A configuração de agentes não é tratada apenas como cadastro de pessoas ou empresas. Ela passa a representar capacidades comerciais:

- onde o agente pode atuar;
- como pode vender;
- quais produtos ou tratamentos pode operar;
- quais comissões pode receber;
- com quem divide comissões;
- quais incentivos possui.

Isso indica uma visão mais rica do agente como participante da operação comercial.

### 27.2 De preenchimento manual para configuração reutilizável

Os quadros de comissão e, especialmente, os quadros de distribuição de comissão representam uma tentativa de deslocar complexidade do usuário emissor para uma configuração reutilizável e governada.

A lógica é:

```text
Configuração recorrente e complexa
↓
Codificação em quadro
↓
Seleção de uma chave na emissão
↓
Recuperação automática de participantes e percentuais
↓
Redução de erro operacional
```

### 27.3 De relações isoladas para potencial segmentação

As relações entre terceiros e grupos hierarquizados podem permitir, em tese, segmentações comerciais ou análises mais sofisticadas.

Contudo, a reunião também demonstra que tal potencial depende da qualidade da manutenção e de processos claros para captura e atualização dos dados.

### 27.4 De comunicação legada para notificações mais flexíveis

A existência de um catálogo de métodos de envio, considerado mais antigo, e a preferência declarada por um módulo de notificações indicam uma evolução possível de formas de comunicação simples para mecanismos mais flexíveis de entrega documental e notificações.

---

## 28. Relações de causa e efeito reconstruídas

### 28.1 Configuração de tipologia

```text
Diversidade de agentes e modelos comerciais
↓
Necessidade de segmentar agentes
↓
Criação de tipologias
↓
Uso potencial em comercial, finanças, operação ou produto
↓
Necessidade de definir claramente o significado de cada código
```

### 28.2 Distribuição de comissões

```text
Múltiplos participantes podem receber comissão
↓
Usuário emissor precisaria informar códigos e percentuais manualmente
↓
Risco de erro e dificuldade operacional
↓
Criação de quadros de distribuição de comissões
↓
Seleção de um único código na emissão
```

### 28.3 Alterações em apólices

```text
Apólice emitida possui múltiplos dados relacionados
↓
Alteração direta pode quebrar integridade e histórico
↓
Necessidade de processo formal de alteração
↓
Uso de suplemento/endosso
```

### 28.4 Relações entre terceiros

```text
Possibilidade de segmentar ou relacionar pessoas e entidades
↓
Necessidade de registrar relações ou grupos
↓
Crescimento do volume de dados
↓
Dificuldade de manutenção manual
↓
Possível necessidade de processamento em lote e governança
```

---

## 29. O que a reunião não permite concluir

A transcrição não fornece informação suficiente para determinar com segurança:

- a grafia ou o nome oficial da plataforma mencionada como “Rift Core”, “Riscor” ou expressão semelhante;
- a arquitetura tecnológica da plataforma;
- a linguagem de programação utilizada;
- o banco de dados principal;
- se o “pacote Oracle” é parte obrigatória da solução ou um mecanismo local/específico;
- uso de microsserviços;
- uso de APIs, eventos ou mensageria;
- existência de Kubernetes, containers ou infraestrutura em nuvem;
- modelo de IAM, autenticação ou autorização;
- política de segurança;
- trilha de auditoria;
- estratégia de backup e recuperação de desastre;
- SLAs;
- estratégia de CI/CD;
- forma exata de cálculo de todas as comissões;
- limites reais de quantidade de agentes, escritórios ou quadros;
- regras exatas de vigência;
- processamento efetivo em lote para relações de terceiros;
- modelo formal de dados;
- responsáveis nominais pela configuração;
- roadmap de evolução da plataforma;
- datas de descontinuação do catálogo de métodos de envio;
- processo final para campanhas de desconto profissional;
- regras de contabilização detalhadas;
- política de retenção de dados.

---

## 30. Conclusões principais

1. A plataforma oferece uma estrutura ampla para modelar agentes como participantes complexos da operação de seguros, e não apenas como registros cadastrais.

2. A seguradora deve definir o propósito de cada catálogo antes de criar códigos, especialmente em tipologias de agentes, relações entre terceiros e classificações comerciais.

3. Os quadros de comissão e os quadros de distribuição de comissão têm finalidades diferentes: os primeiros suportam regras de remuneração; os segundos simplificam a distribuição entre participantes.

4. A emissão deve utilizar configurações previamente definidas para reduzir erros, sobretudo em cenários com múltiplos agentes, organizadores e assessores.

5. Alterações em apólices emitidas devem ocorrer por suplemento/endosso, preservando integridade e histórico.

6. A vigência das configurações é um requisito crítico. Integrações e customizações locais devem respeitar habilitações, inabilitações e datas de validade.

7. Relações e grupos de terceiros podem ser úteis para segmentação e campanhas, mas exigem governança para evitar sobreposição, baixa qualidade de dados e manutenção inviável.

8. A reunião reforça que processos de negócio precisam ser definidos pela seguradora antes de serem transformados em configuração ou desenvolvimento técnico.

9. O conhecimento contínuo da plataforma é apresentado como fator relevante para seu uso adequado e sustentável ao longo do tempo.
