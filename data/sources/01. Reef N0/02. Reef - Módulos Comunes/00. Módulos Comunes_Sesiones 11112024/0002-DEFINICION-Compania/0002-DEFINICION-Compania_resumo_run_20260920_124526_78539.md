# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `0002-DEFINICION-Compania.mp4`
**Data de processamento:** 20/09/2026 12:48:59
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada — Configuração de companhias no núcleo de uma plataforma seguradora

## 1. Síntese executiva

A reunião é um treinamento técnico-funcional sobre a configuração do cadastro de **companhias** — ou entidades seguradoras — no núcleo de uma plataforma corporativa de seguros. Esse cadastro é apresentado como uma das bases da instalação inicial (“quilômetro zero”) do sistema, pois diversos comportamentos, dados, permissões e processos passam a ser condicionados pela companhia configurada.

A mensagem central é que criar múltiplas companhias no sistema não deve ser tratado como uma decisão simples de organização interna. Embora a plataforma suporte múltiplas entidades, cada companhia adicional multiplica a necessidade de configuração, manutenção, usuários, idiomas, tabelas e controles. Portanto, a decisão deve ser motivada por uma necessidade efetiva, especialmente legal, regulatória ou operacional — e não apenas por preferência técnica.

O treinamento percorre propriedades do cadastro de companhia que influenciam domínios diferentes: identificação institucional, dados societários, endereço, moeda, calendário, cadastro de terceiros, privacidade, emissão de apólices, prevenção à lavagem de dinheiro, sinistros, fidelização, usuários e integrações corporativas. Também reforça princípios de governança: utilizar os campos previstos pelo núcleo, evitar tabelas paralelas ou reaproveitamento indevido de parâmetros e escalar mudanças estruturais para a governança corporativa apropriada.

> **Observação sobre nomenclatura:** a transcrição parece registrar nomes como “Riscor”, “Neutron”, “Reventiuno” e “Mafre/MAPFRE”. Há forte indício contextual de que “Mafre” se refere a **MAPFRE**, mas os demais nomes não podem ser normalizados com segurança sem outra fonte. Neste documento, termos duvidosos são preservados ou identificados como possíveis falhas de reconhecimento de voz.

---

## 2. Contexto e antecedentes

O conteúdo ocorre no contexto de uma plataforma seguradora aparentemente utilizada em múltiplos países e entidades. A solução foi desenhada para atender realidades locais distintas, incluindo países com diferentes níveis de maturidade operacional, regras legais, estruturas de endereço, moedas, práticas de identificação de pessoas e necessidades de negócio.

O componente de companhias é apresentado depois de uma etapa anterior de parametrização. Segundo o instrutor, ele é uma das configurações obrigatórias e representa uma base para o restante da instalação.

A plataforma parece possuir um núcleo comum, inicialmente entregue com repositório de informações vazio ou parcialmente preenchido. Nesse núcleo, são cadastradas as entidades seguradoras que utilizarão a solução. A transcrição declara que podem ser codificadas até **99 entidades**, limitação associada a um código numérico de duas posições no modelo de dados.

Há referência a uma estrutura corporativa que consolida informações contábeis, técnicas e comerciais de participadas. Assim, identificadores de companhia não existem apenas para exibição operacional: eles também parecem suportar a consistência de informações encaminhadas ao nível corporativo.

---

## 3. Problemas identificados

### 3.1. Criação excessiva ou desnecessária de companhias

O principal problema discutido é a tendência de usar múltiplas companhias como solução fácil para separar produtos, ramos ou necessidades internas.

O instrutor exemplifica uma possível divisão entre:

- uma companhia para ramos de vida;
- uma companhia para ramos de não vida.

A ressalva é que essa divisão pode ser inadequada se, juridicamente e operacionalmente, a seguradora for uma única entidade. A existência de uma opção técnica não significa que ela deva ser usada.

#### Consequências apontadas

Criar duas companhias gera, entre outros efeitos:

- duplicação de tabelas de configuração;
- necessidade de manutenção paralela;
- duplicação potencial de grupos de usuários;
- repetição de idiomas;
- aumento da complexidade administrativa;
- necessidade de tratar dados e comportamentos por companhia.

A reunião descreve essa decisão como algo que pode transformar uma configuração aparentemente simples em uma “loucura” de manutenção.

### 3.2. Uso de estruturas paralelas para dados já existentes no núcleo

Outro problema destacado é a criação de tabelas, constantes ou campos paralelos para dados que já possuem local previsto no cadastro de companhia.

Dois exemplos principais foram apresentados:

- chave de identificação patronal;
- razão social.

A orientação é buscar o dado no cadastro central da companhia e reutilizá-lo via serviços disponibilizados pelo núcleo, em vez de registrar a mesma informação em uma estrutura local paralela — por exemplo, uma tabela contábil específica de um país.

#### Consequência

A duplicação de dados aumenta o risco de inconsistência, pois a informação pode ser corrigida em uma estrutura e permanecer incorreta nas demais.

### 3.3. Reutilização indevida de parâmetros

A reunião enfatiza que cada parâmetro “nasce para algo”. Portanto, um campo existente não deve ser reutilizado para uma finalidade distinta apenas porque seu formato parece conveniente.

O exemplo mais explícito envolve o limite de prêmios configurado para prevenção à lavagem de dinheiro. Esse limite não deve ser automaticamente reutilizado para tratar limites legais de contribuição ou prêmio em produtos de vida ou previdência.

### 3.4. Configuração inconsistente entre parâmetros e controles

Há preocupação com situações em que uma funcionalidade é configurada parcialmente ou de modo incoerente.

Exemplo: o controle de visualização parcial de informações depende:

1. de uma marca configurada no nível da companhia;
2. de papéis de informação parcial atribuídos adequadamente.

Caso os papéis estejam configurados, mas a marca da companhia esteja incorreta, o controle pode não funcionar como esperado. O instrutor orienta que, se a equipe identificar esse tipo de erro, deve sinalizá-lo para correção.

### 3.5. Tratamento inadequado de particularidades locais

O sistema é apresentado como uma solução que precisa operar em países com realidades muito diferentes. Foram citadas diferenças relacionadas a:

- moedas;
- endereços;
- códigos postais;
- nomes e sobrenomes;
- identificação de pessoas;
- feriados;
- meios de cobrança;
- regimes fiscais;
- requisitos legais.

A mensagem é que a configuração local deve respeitar essas diferenças, sem assumir que o padrão de um país será aplicável a todos os demais.

---

## 4. Solução apresentada

A solução apresentada é a configuração centralizada de entidades seguradoras em uma tabela ou catálogo de companhias do núcleo do sistema.

Esse cadastro funciona como um ponto de controle para:

- identificação institucional;
- dados societários;
- dados de contato e localização;
- moeda principal;
- parâmetros operacionais;
- regras de terceiros;
- emissão;
- sinistros;
- fidelização;
- usuários;
- controles de privacidade;
- integrações corporativas.

A proposta não é que a tabela de companhias resolva toda a lógica de negócio por si só. Ela fornece parâmetros que outros módulos devem consultar para aplicar comportamentos coerentes. Em várias passagens, o instrutor reforça que processos e programas não devem codificar regras fixas quando existe parâmetro corporativo ou de companhia que possa ser consultado.

### Modelo mental apresentado

```text
Necessidade legal, regulatória ou operacional
↓
Definição correta das companhias a cadastrar
↓
Configuração centralizada de atributos da entidade
↓
Módulos do núcleo consultam esses atributos
↓
Comportamentos locais coerentes em terceiros, emissão,
sinistros, cobrança, fidelização e segurança
↓
Menor duplicação, maior governança e manutenção sustentável
```

---

## 5. Arquitetura ou funcionamento lógico

A transcrição não apresenta um diagrama formal, nem detalha tecnologias como banco de dados, APIs, mensageria, nuvem ou infraestrutura. Ainda assim, é possível consolidar o funcionamento lógico descrito.

> **Representação analítica:** o fluxo abaixo é uma organização do conteúdo apresentado; não corresponde a um diagrama literal exibido na reunião.

```text
Configuração da companhia
│
├── Identificação institucional e societária
│   ├── Chave e código da companhia
│   ├── Identificação patronal
│   ├── Identificação societária
│   ├── Razão social
│   └── Dados de contato e endereço
│
├── Configuração territorial e financeira
│   ├── Estrutura geográfica
│   ├── Moeda do país
│   ├── Feriados e dias úteis
│   └── Integração corporativa de resseguro, quando aplicável
│
├── Módulo de terceiros
│   ├── Identificação de pessoas e entidades
│   ├── Nomes e sobrenomes
│   ├── Endereço e CEP
│   ├── Duplicidade e ID único
│   ├── Informação parcial
│   └── Regras de privacidade
│
├── Emissão
│   ├── Atividades/intervenções padrão
│   ├── Textos anexos e cláusulas
│   ├── Limites de prêmios para PLD
│   └── Controles técnicos para certos ramos
│
├── Sinistros e prestações
│   ├── Programa de abertura de sinistros
│   ├── Critério de escritório para controles técnicos
│   └── Captura de número de sinistro em faturas
│
├── Fidelização
│   ├── Moeda do programa
│   ├── Mínimo para resgate
│   └── Máximo para utilização em recibos
│
└── Administração de usuários
    ├── Requisitos de documento para identificação
    └── Uso de identificadores únicos por atividade
```

### Princípio arquitetural implícito

Uma leitura possível da arquitetura apresentada é a de um **núcleo parametrizável e multiempresa**, no qual os módulos funcionais dependem de parâmetros mestres de companhia. Isso reduz a necessidade de desenvolver variantes locais para cada regra, mas exige disciplina de configuração e governança sobre as mudanças.

---

## 6. Componentes mencionados

## 6.1. Tabela ou catálogo de companhias

### Finalidade

Cadastrar as entidades seguradoras que utilizam a plataforma e concentrar parâmetros relevantes para o comportamento do sistema.

### Capacidade

A transcrição informa suporte a até **99 entidades**, devido ao modelo de codificação numérica de duas posições.

### Limitação e evolução

O limite de 99 é descrito como consequência do modelo atual, não como uma limitação imutável. Caso a necessidade de negócio exigisse mais entidades — por exemplo, 999 — seria necessário realizar uma mudança maior, pois as tabelas do modelo de dados aparentemente possuem referência por companhia.

Foi citado que códigos de agentes estariam sendo ampliados em um contexto associado a “Maudi” ou termo semelhante, indicando que o modelo pode evoluir quando necessário.

> Não é possível determinar pela transcrição qual produto, país ou iniciativa está associado a “Maudi”.

---

## 6.2. Identificação da companhia

A companhia possui, no mínimo:

- uma chave;
- um código de identificação.

Esses dois atributos identificam a entidade dentro do sistema.

Também foram citados:

- chave de identificação patronal;
- chave de identificação societária;
- razão social;
- abreviaturas ou denominações reduzidas.

### Chave de identificação patronal

É indicada como o campo adequado para armazenar a identificação patronal da entidade, especialmente se essa informação precisar ser:

- consultada;
- impressa em condições particulares de apólices;
- utilizada por processos do sistema.

A orientação explícita é não criar um dado variável, uma constante ou tabela alternativa para essa informação.

### Chave de identificação societária

É descrita como um identificador utilizado principalmente para fins contábeis e corporativos. O objetivo é assegurar que informações de entidades diferentes não sejam indevidamente misturadas na consolidação.

O instrutor exemplifica que uma companhia brasileira não deve receber o identificador societário de uma entidade espanhola.

A definição do código correto é atribuída ao negócio ou à área responsável, e não à equipe técnica que configura a tabela.

### Razão social

A razão social deve ser mantida de forma centralizada no cadastro da companhia. Processos de impressão devem consultar esse cadastro, em vez de manter textos fixos ou constantes específicas por ramo.

---

## 6.3. Estrutura geográfica e dados de contato

A tabela de companhias contém atributos relacionados a:

- estrutura geográfica;
- endereço;
- caixa postal;
- telefone;
- fax;
- localização física da entidade.

A estrutura geográfica deve ser definida previamente e então vinculada à companhia conforme sua razão social e localização.

A transcrição não detalha o modelo de endereçamento, nem como a estrutura geográfica é implementada tecnicamente.

---

## 6.4. Responsável máximo ou CEO

Existe campo para registrar nome e sobrenomes do principal responsável pela companhia, referido na transcrição como CEO.

A pessoa pode ou não estar identificada também como terceiro no sistema; isso dependeria de regras do módulo de terceiros, que não foram aprofundadas nesta reunião.

---

## 6.5. Moeda da companhia

A companhia possui uma moeda principal definida por código ISO. Foram citados exemplos como:

| País mencionado | Moeda citada |
|---|---|
| Estados Unidos | Dólar americano |
| Espanha | Euro |
| França | Euro |
| Brasil | Real |
| Honduras | Lempira |
| México | Peso mexicano |

A reunião afirma que a configuração é de uma única moeda por companhia.

### Situações não totalmente cobertas

Foi levantado o exemplo de El Salvador e do uso de Bitcoin. A resposta não definiu como o sistema trata cenários com mais de uma moeda relevante ou criptomoedas. O instrutor afirmou que, caso essa necessidade surja, seria necessário avaliar uma evolução, possivelmente com estrutura auxiliar.

---

## 6.6. Integração corporativa de resseguro

Há referência a um atributo que indica se a companhia utiliza algo transcrito como “Reventiuno” como plataforma corporativa para gestão de resseguro.

> O nome da plataforma não pode ser confirmado com segurança a partir da transcrição.

O conteúdo não detalha:

- como a integração funciona;
- se é por API, arquivos, eventos ou banco de dados;
- quais processos são integrados;
- quais campos são trocados;
- quais responsabilidades pertencem a cada sistema.

---

## 6.7. Feriados e dias úteis

A tabela permite indicar se sábados e domingos são considerados dias não úteis ou feriados para fins operacionais.

Foi dado como exemplo o processo de remessa ou cobrança de recibos. Em determinados países, pode haver exigência legal de antecedência mínima entre a remessa e a cobrança bancária.

O parâmetro permitiria que o processo considere a regra local de dias úteis sem codificar diretamente essa regra no pacote de cobrança.

### Relação causal apresentada

```text
Legislação local ou regra operacional
↓
Necessidade de calcular prazo de cobrança/remessa
↓
Necessidade de saber quais dias são úteis
↓
Configuração de feriados e finais de semana na companhia
↓
Processos devem consultar o parâmetro ao calcular as datas
```

---

## 6.8. Atividade de companhia no módulo de terceiros

A transcrição informa que as companhias são identificadas como um tipo de atividade no novo modelo de terceiros.

Foi mencionado o código **39** como atividade associada a companhias.

> O documento não permite confirmar se esse código é universal para todas as instalações ou específico do modelo apresentado.

---

## 6.9. Tratamento, posposto, nomes e sobrenomes

A tabela de companhias contém parâmetros que influenciam a captura de informações de pessoas físicas no módulo de terceiros.

### Tratamento

Permite definir formas de tratamento, como:

- senhor;
- senhora;
- dom;
- dona;
- ilustríssimo;
- excelentíssimo;
- ausência de tratamento.

### Posposto

O instrutor distingue “posposto” de “sufixo”, afirmando que o termo correto no contexto apresentado é “posposto”. Foram citados exemplos como:

- júnior;
- sênior;
- segundo.

### Separação de sobrenomes

Existe configuração para indicar se os sobrenomes de pessoas físicas serão capturados separadamente.

Foi explicado que o modelo prevê primeiro e segundo sobrenome, mas que alguns países podem não ter essa necessidade.

### Separação de nomes compostos

Também há um atributo que permite capturar nomes em dois campos. O exemplo usado foi “José Ramón”, com “José” em um campo e “Ramón” em outro.

### Exibição ou captura de segundo sobrenome

Há parâmetro para permitir ou não a captura do segundo sobrenome. O instrutor associou a necessidade de um único sobrenome ao contexto anglófono, usando os Estados Unidos como exemplo.

### Observação importante

Essas configurações devem estar coerentes entre si. A transcrição afirma que não seria lógico exibir ou estruturar um segundo sobrenome sem que a captura correspondente esteja adequadamente definida.

---

## 6.10. Privacidade e RGPD

Há parâmetros relacionados a:

- presença de RGPD;
- ferramenta de RGPD;
- captura de endereço;
- captura de código postal;
- extensão de código postal.

A reunião não aprofunda:

- qual ferramenta de RGPD seria utilizada;
- quais controles específicos são aplicados;
- como consentimento, retenção ou direitos dos titulares são operacionalizados;
- se a referência a RGPD se aplica apenas a companhias sujeitas à regulamentação europeia.

O instrutor indica que esses campos precisam ser preenchidos quando aplicáveis, sem entrar no conteúdo regulatório.

---

## 6.11. Código postal e endereço

O sistema pode ser configurado para capturar primeiro o código postal e, a partir dele, preencher ou obter parte da estrutura geográfica.

No entanto, a reunião enfatiza que isso não é universal. Alguns países podem não operar com códigos postais estruturados ou podem possuir endereços baseados em referências textuais e pontos de localização.

O exemplo dado é uma descrição semelhante a “junto ao posto de gasolina” ou “perto da sorveteria verde”, usada para ilustrar realidades em que o endereçamento formal é menos padronizado.

### Implicação

A configuração deve ser definida de acordo com a realidade local. Não se deve presumir que a presença de código postal permita sempre derivar automaticamente país, estado, cidade ou endereço.

---

## 6.12. Extensão de código postal

Existe um parâmetro que habilita ou não a captura de extensão de código postal na criação ou alteração de terceiros.

A decisão tem impacto transversal: ela não afeta apenas segurados, mas todos os tipos de terceiros, como:

- agentes;
- brokers;
- tramitadores;
- clínicas;
- pessoas físicas;
- pessoas jurídicas.

Por isso, a configuração não deve ser tomada considerando apenas uma categoria de usuário ou cliente.

---

## 6.13. Múltiplas companhias e replicação de terceiros

Quando há mais de uma companhia no sistema, a solução pode tratar terceiros duplicados ou replicar suas informações entre companhias.

O exemplo apresentado foi:

```text
Companhia 1:
Ramón Olivera cadastrado como segurado
↓
Processo automático ou parametrizado
↓
Replicação de Ramón Olivera para a Companhia 2
```

A reunião não descreve tecnicamente o processo, mas menciona que “há algo” ou “um processo” responsável por essa replicação.

### Motivação de negócio

A preocupação é evitar que uma mesma pessoa seja contabilizada várias vezes em consolidações corporativas apenas porque possui múltiplas apólices ou registros.

Foi dado o exemplo de uma pessoa com três apólices — automóvel, residência e animais de estimação. Para fins corporativos, essa pessoa deve ser compreendida como um cliente único, não como três clientes distintos.

---

## 6.14. Identificador único de terceiros

A companhia pode definir se os terceiros terão um ID único de uso interno.

Quando esse atributo está ativo, o sistema permite a existência do identificador, mas, segundo o instrutor, a área de tecnologia precisa implementar a lógica necessária para atribuí-lo. O sistema “permite, mas não faz” automaticamente.

### Limitação reconhecida

A transcrição não especifica:

- como o identificador é gerado;
- se é sequencial, externo ou baseado em regras;
- se há integração com cadastro mestre;
- como conflitos e duplicidades são resolvidos;
- quais áreas seriam responsáveis pela implementação.

---

## 6.15. Informação parcial e restrições de visualização

A configuração de informação parcial permite restringir visualizações no sistema conforme papéis atribuídos aos usuários.

O exemplo usado foi a comissão de um agente. Um colaborador da área administrativo-financeira não necessariamente deve ter acesso ao valor de comissão recebido por determinado agente.

A funcionalidade parece depender de:

- uma marca habilitada no cadastro da companhia;
- papéis de informação parcial;
- configuração adequada de restrições por usuário ou função.

### Implicação analítica

A reunião sugere um modelo de controle de acesso orientado não apenas por módulo, mas também por visibilidade de informações específicas. Porém, a transcrição não detalha se esse modelo utiliza RBAC, ABAC ou outro mecanismo técnico.

---

## 6.16. Exportação de terceiros e cartões de cobrança/pagamento

Foram mencionadas propriedades consideradas pelo instrutor como mais antigas ou menos relevantes para o momento, incluindo:

- número máximo de registros para exportação de terceiros;
- permissão de criação de cartões em meios de cobrança e pagamento.

Não foram fornecidos detalhes de funcionamento, regras ou casos de uso.

---

## 6.17. Funcionários de intermediários

A companhia pode indicar se trata ou não empregados de intermediários.

O objetivo é habilitar estruturas do núcleo relacionadas a funcionários de agências vinculadas a agentes que intermediam apólices.

A transcrição não especifica:

- quais funcionalidades são habilitadas;
- como o vínculo entre empregado, agência e agente é modelado;
- quais impactos existem na emissão, comissionamento ou atendimento.

---

## 6.18. Tipo de IVA

Há atributo que define se o sistema deve contemplar a captura de tipo de IVA no cadastro e na alteração de terceiros.

O instrutor explica que campos classificados como “tipo” possuem conjunto finito de valores. No caso de IVA, foram citados:

- isento;
- normal;
- reduzido.

Caso um país necessite de novo valor, não cabe à instalação local simplesmente criar uma quarta opção. A necessidade deve ser escalada e discutida com a equipe corporativa competente.

### Princípio de governança apresentado

```text
Necessidade local de novo valor
↓
Não criar valor local diretamente
↓
Escalar para avaliação corporativa
↓
Avaliar necessidade, momento e local adequado da mudança
↓
Evoluir o modelo somente se aprovado
```

Esse princípio é apresentado como aplicável a tipos e valores finitos em diferentes partes da aplicação, não apenas no módulo de terceiros.

---

## 6.19. Propriedades de emissão

A tabela de companhias contém propriedades relacionadas ao processo de emissão de apólices.

### Atividade padrão

Existe configuração de atividade padrão para intervenções ou terceiros envolvidos em uma apólice.

O instrutor usa exemplos de:

- tomador;
- segurado;
- condutores;
- beneficiários;
- veículo;
- cliente que paga os direitos econômicos da apólice.

O objetivo parece ser definir uma atividade base para apoiar registros ou cópias relacionadas a outras intervenções. A explicação transcrita é fragmentada, portanto não é possível determinar a regra exata.

### Textos anexos e cláusulas

A companhia pode configurar a extensão ou comprimento de textos anexos e cláusulas.

As cláusulas são descritas como textos predefinidos ou textos inseridos pelo usuário que condicionam ou modulam o comportamento da apólice.

### Limites de prêmios para prevenção à lavagem de dinheiro

Há possibilidade de definir, para pessoas físicas e jurídicas e em determinada moeda, um limite de prêmios associado à prevenção à lavagem de dinheiro.

O sistema pode permitir mostrar ou alertar que determinado segurado excedeu o limite configurado.

A reunião não afirma que o sistema obrigatoriamente bloqueia novas apólices ou aumento de capital segurado. Esses seriam exemplos possíveis de uso, cuja regra de negócio deve ser definida localmente.

---

## 6.20. Controles de textos em caução e crédito

Para ramos de caução e crédito, foram citados termos ou frases obrigatórias que podem funcionar como controles técnicos sobre textos anexos.

A motivação é evitar que usuários menos experientes insiram textos que ultrapassem sua alçada e possam provocar problemas posteriores, inclusive na gestão de sinistros.

A reunião não detalha:

- quais termos são obrigatórios;
- como a validação é realizada;
- se há bloqueio, alerta ou aprovação;
- quais usuários estão sujeitos ao controle.

---

## 6.21. Sinistros, prestações e faturas

A tabela de companhias possui atributos relacionados a sinistros e prestações, incluindo:

- programa de abertura de sinistros;
- programa de abertura de outros expedientes;
- escritório usado nos controles técnicos de sinistros;
- captura do número de sinistro no registro de faturas.

### Escritório considerado para controles técnicos

Pode ser definida uma referência de escritório — emissor ou tramitador — a ser considerada na execução de controles técnicos durante sinistros ou prestações.

A decisão depende da estrutura comercial e do modelo de gestão da companhia, incluindo elementos como:

- agente principal;
- estrutura de emissão;
- estrutura de tratamento;
- escritório emissor;
- escritório tramitador.

A configuração deve ser preenchida com o código de escritório que a organização indicar.

---

## 6.22. Programa de fidelização

A transcrição menciona programa de fidelização associado a “tréboles”, apresentados como uma moeda ou unidade utilizada para descontos em recibos de prêmio.

O instrutor esclarece que os tréboles não são moeda corrente como no jogo Monopoly, mas podem ter efeito econômico ao permitir descontos no pagamento de prêmios.

### Parâmetros citados

| Parâmetro | Finalidade |
|---|---|
| Moeda do plano de fidelização | Identificar a unidade usada pelo programa |
| Número mínimo de tréboles | Definir o mínimo necessário para realizar resgate |
| Número máximo de tréboles | Limitar o total que pode ser usado no pagamento de recibos |

### Exemplo fornecido

Se o mínimo configurado for 25 tréboles:

- cliente com 23 não pode utilizar o benefício;
- cliente com 37 pode estar limitado a utilizar apenas 25, caso esse seja o máximo configurado.

A moeda do plano deve existir previamente na tabela de moedas.

---

## 6.23. Identificação de usuários

Há parâmetro que influencia programas de criação e alteração de usuários, tornando obrigatória ou não a captura de:

- tipo de documento;
- código do documento.

A reunião associa esse tema ao modelo de terceiros, em que pessoas físicas, jurídicas e entidades são identificadas por tipo e número de documento.

Também foi explicado que, para certas atividades — como agente — pode existir código único que simplifique a captura durante a emissão de apólices.

---

## 6.24. Abreviaturas da entidade

A definição da entidade possui duas abreviaturas ou descrições reduzidas.

O instrutor destaca que não há obrigação corporativa geral para seu uso. Foi apresentado o caso de uma entidade nas Filipinas que teria usado uma abreviatura para indicar seu tipo empresarial, com o valor “Corp”.

Esse uso é descrito como decisão local, e não como padrão obrigatório.

---

## 7. Modelo de integração

A reunião menciona integrações e compartilhamentos de informação, mas não apresenta detalhes técnicos suficientes para documentar um modelo de integração completo.

## 7.1. Integrações ou relacionamentos explicitamente citados

| Relação | Informação disponível |
|---|---|
| Companhia ↔ núcleo do sistema | A companhia é configurada em tabela central do núcleo |
| Companhia ↔ modelo de dados | Diversas tabelas possuem referência por companhia ou equivalente |
| Companhia ↔ terceiros | Regras de nome, sobrenome, endereço, identificadores, duplicidade e informação parcial |
| Companhia ↔ emissão | Atividade padrão, cláusulas, textos anexos, limites de prêmio |
| Companhia ↔ sinistros | Programa de abertura, escritório de referência, número de sinistro em faturas |
| Companhia ↔ fidelização | Moeda, mínimo e máximo de tréboles |
| Companhia ↔ plataforma corporativa de resseguro | Referência a uso ou não de plataforma transcrita como “Reventiuno” |
| Companhia ↔ consolidação corporativa | Identificação societária para coerência de informação técnica, comercial e contábil |

## 7.2. O que não foi detalhado

A transcrição não permite confirmar:

- APIs utilizadas;
- contratos de serviço;
- integrações síncronas ou assíncronas;
- mensageria;
- eventos;
- formatos de arquivos;
- bancos de dados compartilhados;
- frequência de replicação de terceiros;
- tratamento de erro;
- observabilidade das integrações;
- mecanismos de reconciliação;
- segurança de integração.

---

## 8. Modelo operacional

O modelo operacional discutido é predominantemente de configuração e manutenção de parâmetros mestres.

### Responsabilidades sugeridas

| Tema | Responsabilidade indicada ou inferida do contexto |
|---|---|
| Definição de necessidade de múltiplas companhias | Negócio, requisitos legais e decisão organizacional |
| Preenchimento de identificadores societários | Área de negócio responsável |
| Configuração técnica | Equipe que administra ou mantém a aplicação |
| Evolução de modelo ou novos valores | Governança corporativa e equipes competentes |
| Implementação de ID único de terceiros | Tecnologia |
| Uso de limite de PLD | Possivelmente compliance, quando existente |
| Regras locais de cobrança e feriados | Área local competente |
| Controles de emissão e sinistros | Áreas responsáveis por emissão, sinistros e regras de negócio |

### Correção contínua

O instrutor reconhece que podem existir erros de configuração ou comportamentos incorretos na aplicação. A orientação é que equipes de manutenção identifiquem e levantem esses problemas para que sejam corrigidos ao longo do tempo, conforme prioridade e ordem definidas pela organização.

---

## 9. Governança

A reunião enfatiza governança em diversos momentos, ainda que não apresente uma estrutura formal de comitês, papéis ou fluxos de aprovação.

## 9.1. Decisões que não devem ser tomadas isoladamente

Não devem ser decididos unilateralmente pela equipe local:

- criação de novas companhias sem necessidade;
- criação de novos valores em catálogos de tipos finitos;
- ampliação estrutural de códigos ou capacidade do modelo;
- reutilização de parâmetros para outra finalidade;
- definição de identificadores societários;
- evoluções de dados para novas moedas ou situações especiais.

## 9.2. Evolução do sistema

A plataforma é descrita como dinâmica, sujeita a mudanças e evoluções. O instrutor afirma que algumas estruturas podem tornar-se obsoletas, enquanto outras precisam ser ampliadas de acordo com necessidades futuras.

Entretanto, a transcrição não define:

- quem possui autoridade final sobre mudanças;
- qual é o canal formal de solicitação;
- processo de priorização;
- prazo de atendimento;
- critérios de aprovação;
- modelo de versionamento ou release.

Há menção a um possível “mundo Riscor” e à possibilidade de participação de um “equipo de José de Abreu”, mas os nomes e a estrutura de governança não podem ser confirmados.

---

## 10. Organização das equipes

Não houve explicação detalhada de estrutura organizacional, squads, Product Owners, Scrum Masters ou times de produto.

Ainda assim, a reunião cita ou sugere a participação de diversas áreas:

| Área ou papel | Papel indicado |
|---|---|
| Negócio | Informar regras, identificadores e necessidades locais |
| Tecnologia | Implementar funcionalidades complementares, como ID único |
| Compliance | Potencial usuária de limites relacionados à prevenção à lavagem de dinheiro |
| Administração/manutenção da aplicação | Configurar parâmetros e identificar inconsistências |
| Corporativo | Avaliar evoluções de modelo e novos valores de catálogos |
| Emissão | Utilizar parâmetros de intervenções, cláusulas e textos |
| Sinistros | Usar configurações de abertura e controles técnicos |
| Área financeira/comercial | Relacionada a propriedades de terceiros, agentes, IVA e cobrança |

---

## 11. Modelo de produto e configuração

O modelo apresentado é mais próximo de uma plataforma corporativa configurável do que de um produto completamente isolado por país.

### Características observadas

- núcleo comum compartilhado;
- parametrização por companhia;
- capacidade de adaptação a realidades locais;
- governança central para mudanças estruturais;
- catálogos com valores controlados;
- necessidade de evitar customizações locais desnecessárias;
- integração entre módulos por meio de parâmetros de companhia.

### Mudança de paradigma identificada

> **Leitura analítica:** o conteúdo indica uma transição ou disciplina de “customização local livre” para “configuração governada sobre uma plataforma comum”.

Essa leitura é sustentada pelas repetidas orientações de:

- não criar tabelas paralelas;
- não reaproveitar parâmetros fora de sua finalidade;
- não criar novos valores localmente;
- consultar o cadastro mestre;
- escalar evoluções estruturais;
- considerar impactos de manutenção antes de criar novas companhias.

---

## 12. Reutilização e padronização

Não foi apresentado marketplace, catálogo de soluções reutilizáveis entre países ou mecanismo formal de publicação e consumo de componentes.

No entanto, o princípio de reutilização aparece indiretamente em dois aspectos:

1. **Reutilização de dados mestres:** razão social, identificações e demais dados devem ser consultados no cadastro central.
2. **Reutilização de capacidades do núcleo:** as funções existentes devem ser usadas conforme sua finalidade, evitando recriação local.

Portanto, a reunião não permite afirmar que exista um marketplace, mas sustenta a existência de uma orientação forte à padronização e ao uso de estruturas compartilhadas.

---

## 13. Casos concretos apresentados

## 13.1. Brasil

O Brasil é mencionado como possível país inicial de implantação e como exemplo de moeda, o real.

Também aparece no contexto de risco de criar uma estrutura paralela específica — como uma tabela contábil “B” para Brasil — para armazenar dados que já deveriam estar no cadastro central da companhia.

Não foram apresentados detalhes sobre produtos, arquitetura local ou roadmap brasileiro.

---

## 13.2. Porto Rico

Porto Rico é citado como exemplo de ambiente com mais de uma companhia no sistema.

Nesse cenário, o módulo de terceiros pode lidar com duplicidade ou replicação de dados de uma companhia para outra.

---

## 13.3. Filipinas

Foi citado um caso de uma entidade da MAPFRE nas Filipinas que teria utilizado uma das abreviaturas da entidade para indicar o tipo societário, com “Corp”.

O caso é apresentado como decisão local, sem obrigatoriedade corporativa.

---

## 13.4. El Salvador

El Salvador é usado como exemplo de país em que a existência de Bitcoin poderia levantar discussão sobre suporte a moedas adicionais ou criptomoedas.

Não foi apresentada solução existente para o caso.

---

## 13.5. Estados Unidos

Os Estados Unidos são citados em dois contextos:

- uso do dólar americano;
- possibilidade de utilização de apenas um sobrenome no padrão anglófono.

---

## 13.6. Espanha, França, Honduras e México

Esses países aparecem como exemplos de:

- moeda;
- diferenças geográficas e operacionais;
- diversidade de maturidade e práticas locais.

Não há detalhes adicionais de implementação para cada caso.

---

## 14. Roadmap

A transcrição não apresenta um roadmap formal com datas, marcos, responsáveis ou entregas.

Há apenas referências gerais à evolução contínua do sistema:

- possibilidade de ampliar limites estruturais, como códigos;
- necessidade de evoluir o modelo quando surgirem novas demandas;
- correção progressiva de falhas ou inconsistências;
- necessidade de definir canal e autoridade para aprovar evoluções.

### Itens que podem exigir evolução futura

| Tema | Situação apresentada |
|---|---|
| Mais de 99 companhias | Exigiria mudança relevante no modelo |
| Moedas especiais ou múltiplas moedas relevantes | Deve ser analisado se surgir necessidade |
| Novos valores de tipo | Devem ser escalados para decisão corporativa |
| Geração de ID único de terceiros | Exige implementação tecnológica |
| Correções de comportamento inconsistente | Devem ser identificadas e priorizadas |

---

## 15. Números e indicadores citados

Os números abaixo foram declarados durante a reunião e não foram auditados ou validados externamente.

| Indicador | Valor mencionado | Contexto |
|---|---:|---|
| Máximo de entidades/companhias | 99 | Limite decorrente de código numérico de duas posições |
| Código de atividade de companhia | 39 | Identificação de companhias no modelo de terceiros |
| Exemplo de antecedência para cobrança/remessa | 15 dias | Exemplo hipotético de requisito legal |
| Exemplo de produtos de uma pessoa | 3 | Automóvel, residência e animais de estimação |
| Número mínimo de tréboles no exemplo | 25 | Mínimo para resgate no programa de fidelização |
| Número de tréboles acumulados no exemplo | 23 | Insuficiente para resgate no exemplo |
| Número de tréboles acumulados no exemplo | 37 | Exemplo de saldo acima do mínimo |
| Número máximo de tréboles no exemplo | 25 | Limite hipotético de uso em um recibo |
| Exemplo de código de ramo | 317 ou 400 | Referências transcritas; contexto exato não é totalmente claro |
| Exemplo de código de ramo | 327 | Referência transcrita em contexto de impressão de razão social |

> Os códigos de ramo e exemplos associados a “Freddy” não podem ser interpretados como especificações confirmadas, pois a transcrição é imprecisa nesses trechos.

---

## 16. Perguntas e respostas

## 16.1. Limite de prêmios em produtos de vida ou previdência

### Pergunta

Foi perguntado se o limite de prêmios poderia ser usado em produtos de vida, especialmente produtos semelhantes a previdência, nos quais pode haver limites definidos por legislação e não necessariamente por companhia.

### Resposta

O instrutor esclareceu que o limite específico discutido serve para **prevenção à lavagem de dinheiro**. Portanto, não deveria ser usado automaticamente para outro tipo de limite.

Para limites legais de um ramo ou produto específico, seria necessário avaliar outro controle técnico ou outra forma de implementação.

### O que a resposta esclarece

A resposta reforça que os parâmetros possuem finalidade delimitada e não devem ser reutilizados apenas por parecerem funcionalmente semelhantes.

Também indica que controles de produto, emissão, sinistros e compliance podem ter naturezas diferentes, mesmo quando todos envolvem valores de prêmio.

---

## 16.2. Como o limite de prêmios será utilizado

### Pergunta implícita

O treinamento questiona como o limite de prêmios configurado será efetivamente usado: alerta, bloqueio de nova apólice, bloqueio de aumento de capital segurado ou outro mecanismo.

### Resposta

Não foi definida uma regra obrigatória. O instrutor afirma que a companhia local deve decidir como tratar o limite.

### O que a resposta esclarece

O cadastro oferece capacidade de parametrização, mas não substitui a definição de política de negócio e compliance.

---

## 16.3. Quem utiliza o limite de prevenção à lavagem de dinheiro

### Pergunta implícita

Se o parâmetro é de prevenção à lavagem de dinheiro, qual área deveria utilizá-lo?

### Resposta

O instrutor sugere que, logicamente, seria a área de compliance, quando ela existir. Também ressalta que nem todas as companhias possuem estrutura de compliance.

### O que a resposta esclarece

A existência de um parâmetro no sistema não garante que todas as entidades tenham a mesma estrutura organizacional para operá-lo.

---

## 16.4. Moedas como Bitcoin em países com cenário monetário particular

### Pergunta implícita

Como a plataforma trata países em que Bitcoin ou outra moeda adicional seja relevante?

### Resposta

Não houve resposta definitiva. O instrutor afirma que seria necessário avaliar a necessidade e possivelmente evoluir o modelo ou usar estrutura auxiliar.

### O que a resposta esclarece

A configuração atual é apresentada como de uma moeda principal por companhia. Cenários monetários mais complexos não estão detalhados como capacidade já existente.

---

## 17. Limitações reconhecidas

A reunião reconhece explicitamente diversas limitações ou pontos que dependem de definição adicional.

### 17.1. Limite de 99 companhias

O modelo atual suporta até 99 entidades, por limitação de código numérico de duas posições. Expandir esse limite exigiria mudança maior no modelo.

### 17.2. Uma única moeda por companhia

A configuração apresentada trabalha com uma moeda principal. Casos de múltiplas moedas relevantes ou criptomoedas não têm solução confirmada na reunião.

### 17.3. Geração de ID único não é automática

O sistema permite indicar que terceiros possuem ID único, mas não gera esse identificador por conta própria. A implementação cabe à tecnologia.

### 17.4. Necessidade de governança para novos valores

Valores adicionais em campos de tipo não devem ser criados unilateralmente. É necessária avaliação corporativa.

### 17.5. Nem todos os países compartilham o mesmo modelo de endereço

Código postal, estrutura geográfica e padronização de endereços não podem ser considerados universais.

### 17.6. Nem todas as entidades têm os mesmos processos organizacionais

A reunião menciona que nem todas as companhias possuem área de compliance, o que pode afetar a operação de determinados controles.

### 17.7. Diversos detalhes técnicos não foram apresentados

O treinamento não detalha implementação de:

- serviços;
- APIs;
- replicação;
- geração de identificadores;
- segurança;
- persistência;
- integrações;
- controles de acesso;
- regras de validação.

---

## 18. Riscos e desafios

## 18.1. Riscos explicitamente mencionados

### Complexidade causada por múltiplas companhias

Criar companhias sem necessidade amplia esforço de configuração e manutenção.

### Duplicidade e inconsistência de dados

Criar tabelas paralelas ou manter dados fixos em processos pode produzir divergências em dados institucionais, societários e contábeis.

### Configuração incoerente

Parâmetros de companhia e regras de módulos podem ficar desalinhados, como no caso de informação parcial e papéis de acesso.

### Uso incorreto de parâmetros

Reutilizar limite de prevenção à lavagem de dinheiro para outras finalidades pode produzir controles inadequados.

### Contagem incorreta de clientes

Sem controle de duplicidades, uma mesma pessoa pode ser contabilizada diversas vezes em relatórios corporativos.

### Mudanças locais não governadas

Criar novos valores ou tipos sem avaliação corporativa pode comprometer a consistência transversal da plataforma.

---

## 18.2. Desafios derivados do contexto

> **Os itens abaixo são leituras analíticas derivadas da reunião, não declarações literais dos participantes.**

### Governar configuração multi-país

Uma plataforma usada em muitos países precisa equilibrar:

- padronização corporativa;
- exigências legais locais;
- diferentes práticas operacionais;
- qualidade e consistência de dados.

Esse equilíbrio tende a exigir processos claros de decisão e evolução, que não foram detalhados na reunião.

### Evitar dependências ocultas

Como os parâmetros da companhia influenciam vários módulos, uma alteração aparentemente simples pode produzir impactos em terceiros, emissão, sinistros, cobrança e fidelização.

### Garantir rastreabilidade de configurações

A transcrição demonstra que diversos atributos são críticos para processos posteriores. Isso sugere necessidade de documentação, validação e gestão cuidadosa de mudanças, embora esses mecanismos não tenham sido apresentados.

---

## 19. O que a reunião não permite concluir

A transcrição não fornece informação suficiente para concluir com segurança os itens abaixo.

### Tecnologia e infraestrutura

- linguagem de programação;
- arquitetura de microsserviços, monólito ou modular;
- banco de dados utilizado;
- ambiente de nuvem ou on-premises;
- uso de contêineres;
- Kubernetes;
- mecanismos de cache;
- estratégia de escalabilidade;
- alta disponibilidade;
- disaster recovery;
- backup;
- observabilidade;
- monitoramento;
- logs;
- gestão de incidentes.

### Integrações

- padrão de integração com a plataforma de resseguro;
- APIs disponíveis;
- protocolos;
- autenticação;
- mensageria;
- periodicidade de sincronização;
- regras de replicação de terceiros;
- tratamento de falhas;
- reconciliação de dados.

### Segurança e privacidade

- modelo de IAM;
- autenticação;
- autorização detalhada;
- gestão de perfis;
- criptografia;
- segregação de dados por companhia;
- auditoria;
- retenção de dados;
- implementação concreta de RGPD;
- tratamento de consentimento.

### Operação e entrega

- processo de release;
- hotfixes;
- CI/CD;
- versionamento de configuração;
- homologação;
- aprovação de mudanças;
- SLA;
- suporte;
- responsabilidades formais por módulo.

### Governança

- órgão decisório final;
- critérios para aprovar novas entidades;
- canal formal de solicitação de evolução;
- responsáveis pelos catálogos corporativos;
- processo de priorização;
- roadmap oficial da plataforma.

---

## 20. Relações de causa e efeito reconstruídas

## 20.1. Criação de companhias

```text
Necessidade percebida de separar operação, ramo ou entidade
↓
Possibilidade técnica de criar múltiplas companhias
↓
Aumento de tabelas, usuários, idiomas e manutenção
↓
Maior complexidade operacional
↓
Necessidade de validar previamente a necessidade legal e de negócio
```

## 20.2. Dados mestres centralizados

```text
Necessidade de usar razão social ou identificação institucional
↓
Existência de campo apropriado no cadastro de companhia
↓
Consulta centralizada em processos e serviços
↓
Evita tabelas paralelas e valores fixos
↓
Maior consistência e manutenção em um único ponto
```

## 20.3. Catálogos com valores finitos

```text
Necessidade local de novo tipo ou valor
↓
Risco de alterar comportamentos transversais da aplicação
↓
Não criar valor localmente
↓
Escalar para avaliação corporativa
↓
Evolução governada do modelo
```

## 20.4. Dados de terceiros em múltiplas companhias

```text
Mesma pessoa cadastrada em mais de uma companhia
↓
Risco de duplicidade operacional e gerencial
↓
Possibilidade de replicação e/ou identificação única
↓
Melhor qualidade na consolidação de clientes e terceiros
```

---

## 21. Transformações estruturais identificadas

## 21.1. De configuração isolada para configuração com impacto transversal

A companhia não é apresentada como simples cadastro institucional. Ela opera como contexto organizador de diversos comportamentos funcionais do sistema.

Essa mudança de entendimento é importante: configurar a companhia significa afetar como o sistema tratará dados, processos, usuários e controles em vários módulos.

## 21.2. De adaptação local improvisada para evolução corporativa governada

A reunião insiste que mudanças estruturais devem ser avaliadas no nível adequado. Isso vale para:

- novos valores de catálogos;
- expansão de limites do modelo;
- tratamento de novos cenários de moeda;
- uso de atributos;
- criação de entidades.

## 21.3. De duplicação de dados para fonte central de verdade

A orientação de buscar razão social, identificações e demais dados diretamente da tabela de companhias aponta para um modelo de fonte central de verdade para informações institucionais.

## 21.4. De permissões genéricas para acesso condicionado à informação

O caso de informação parcial indica uma preocupação com controle de visibilidade de dados específicos, como comissões, e não apenas com acesso amplo a módulos.

---

## 22. Conclusões principais

1. O cadastro de companhias é uma configuração estrutural do núcleo da plataforma seguradora.
2. Múltiplas companhias só devem ser criadas quando houver justificativa legal, de negócio ou operacional consistente.
3. Cada companhia adicional amplia significativamente o custo e a complexidade de configuração e manutenção.
4. Dados institucionais devem ser mantidos no cadastro central e reutilizados por processos, evitando tabelas paralelas e valores fixos.
5. A configuração da companhia influencia domínios diversos: terceiros, emissão, sinistros, cobrança, fidelização, usuários, privacidade e consolidação corporativa.
6. O sistema busca atender países com realidades distintas; por isso, parâmetros de endereço, moeda, nomes, sobrenomes, feriados e identificação precisam ser definidos localmente com cuidado.
7. Catálogos de valores finitos devem ser evoluídos por governança corporativa, não por criação local improvisada.
8. Limites de prêmio discutidos na reunião possuem finalidade específica de prevenção à lavagem de dinheiro e não devem ser reutilizados automaticamente para outros controles.
9. O tratamento de terceiros em múltiplas companhias exige atenção a replicação, identificadores únicos e duplicidade para evitar contagens incorretas.
10. A reunião apresenta uma plataforma parametrizável e evolutiva, mas não detalha aspectos técnicos fundamentais como integrações, infraestrutura, segurança, operação e processos formais de governança.
