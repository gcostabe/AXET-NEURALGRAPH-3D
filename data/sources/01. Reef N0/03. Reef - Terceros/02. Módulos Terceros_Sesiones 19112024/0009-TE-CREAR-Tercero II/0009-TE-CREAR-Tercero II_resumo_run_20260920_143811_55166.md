# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `0009-TE-CREAR-Tercero II.mp4`
**Data de processamento:** 20/09/2026 14:43:06
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada — Cadastro de Terceiros, Dados Associados e Terceiros Não Desejados

## 1. Síntese executiva

A sessão foi um treinamento funcional sobre a operação de **criação e manutenção de terceiros** em uma plataforma de seguros. A transcrição menciona os nomes “Rizcor”, “RISCOR” e, em um trecho, “Driftcore”; há forte indício de variações ou erros de reconhecimento de voz para o mesmo produto/plataforma, mas a transcrição não permite confirmar a nomenclatura oficial.

O foco principal foi explicar os blocos de informação compartilhados no cadastro de terceiros — especialmente contatos, endereços, documentos alternativos, representantes legais, acionistas e meios de cobrança/pagamento — e como atributos como **validade**, **inabilitação**, **verificação** e **prioridade** sustentam histórico, qualidade de dados e coerência entre módulos.

A reunião também apresentou o conceito de **terceiro não desejado**. Esse mecanismo não necessariamente inabilita uma pessoa ou entidade de forma global: ele permite classificá-la como inadequada para determinadas combinações de atividade, setor, ramo, agente ou escritório comercial. A exploração dessa classificação nos processos de emissão, subscrição ou outros fluxos depende de regras adicionais da seguradora; a apresentação afirma que o núcleo, por si só, registra a informação, mas não executa automaticamente todas as ações de negócio possíveis a partir dela.

A mensagem estrutural da reunião é que o cadastro de terceiros funciona como uma base transversal para múltiplas atividades do negócio segurador. Por isso, a qualidade, a temporalidade e a governança dos dados cadastrados afetam diretamente operações posteriores, como emissão de apólices, sinistros, atendimento ao cliente, tesouraria, obrigações fiscais, controles de prevenção à lavagem de dinheiro e processos comerciais.

---

## 2. Escopo da sessão e delimitações

A apresentação tratou da operação de **criar terceiro**, descrita como uma operação que permite cadastrar dados compartilhados por diferentes atividades associadas a um mesmo terceiro.

Foram abordados, principalmente:

- contatos;
- endereços;
- documentos alternativos;
- representantes legais;
- acionistas;
- meios de cobrança e pagamento;
- classificação de terceiros não desejados.

Também houve referências a blocos específicos da atividade de segurado, mas eles foram explicitamente deixados para uma sessão posterior:

- informações específicas de segurado;
- consentimentos;
- indicação de segurado não desejado durante o próprio processo de alta;
- perfil analítico;
- licença de condução.

A apresentação afirma que a criação de terceiros contém **nove blocos de informação compartilhados entre atividades**, mas a transcrição não enumera com absoluta clareza todos os nove blocos em uma única lista consolidada. A sessão detalha alguns deles, enquanto outros parecem pertencer a atividades específicas ou a blocos não explorados integralmente naquele momento.

---

## 3. Contexto e antecedentes

O treinamento parte do pressuposto de que a plataforma possui um cadastro centralizado de terceiros, utilizado por diferentes módulos e atividades. Um terceiro pode atuar, por exemplo, como:

- segurado;
- tomador;
- agente;
- representante legal;
- pessoa física;
- pessoa jurídica;
- titular de um meio de cobrança ou pagamento.

A lógica apresentada é que os dados não devem ser tratados como campos isolados de uma tela. Eles possuem efeitos em processos posteriores e precisam ser configurados de forma coerente com:

- políticas locais de cada companhia;
- estrutura de produtos;
- ramos técnicos;
- estrutura geográfica;
- catálogos corporativos;
- regras de tesouraria;
- regras fiscais;
- prevenção à lavagem de dinheiro;
- processos de emissão e sinistros.

A sessão enfatiza repetidamente que muitas capacidades do sistema existem como possibilidade funcional, mas sua aplicação concreta depende da configuração, das políticas e dos processos de cada país ou companhia.

---

## 4. Princípios funcionais recorrentes

### 4.1. Sequências automáticas

Diversos blocos possuem um código ou sequência atribuída automaticamente pelo sistema no momento da inclusão de um registro.

Esse princípio foi citado para:

- contatos;
- endereços;
- meios de cobrança e pagamento.

A sequência não deve ser reutilizada quando um registro é inabilitado. O entendimento apresentado é que o código “nasce para toda a vida”: se um contato, endereço ou meio de pagamento deixa de ser válido, ele é inabilitado e um novo registro recebe uma nova sequência.

### 4.2. Datas de validade como mecanismo de histórico

A data de validade é um dos elementos mais importantes da modelagem apresentada. Ela determina a partir de quando um dado está vigente e pode ser usado pela plataforma.

A data não representa necessariamente apenas o dia de digitação no sistema. Ela pode refletir, conforme a política da companhia:

- a data em que o cliente forneceu os dados;
- a data em que um formulário foi entregue a um agente;
- a data em que o agente entregou o formulário em uma unidade comercial;
- a data em que a informação foi efetivamente capturada na aplicação;
- uma data futura, se a vigência ainda não começou;
- uma data passada, quando o registro é inserido posteriormente para representar uma situação já existente.

A apresentação reforça que as datas de validade precisam ser coerentes entre módulos. Por exemplo, se um terceiro será indicado como tomador de uma apólice, sua data de vigência precisa permitir sua utilização no processo de emissão.

### 4.3. Inabilitação em vez de alteração de dados validados

Um padrão recomendado, embora não imposto como regra universal para todos os países, é:

1. validar determinado dado;
2. impedir sua alteração direta;
3. inabilitar o registro antigo quando houver mudança;
4. criar um novo registro com nova vigência.

Essa abordagem foi sugerida para:

- contatos;
- endereços;
- documentos alternativos;
- meios de cobrança e pagamento.

A justificativa é preservar o histórico e evitar que informações já verificadas sejam alteradas sem rastreabilidade.

### 4.4. Configuração por catálogos

A apresentação mostra que muitos campos dependem de catálogos configuráveis, tais como:

- tipos de contato;
- tipos de meios de contato;
- cargos;
- departamentos;
- tipos de endereço;
- tipos de documento;
- causas de inabilitação;
- motivos de inabilitação;
- tipos de representação legal;
- tipos e classificações de meios de cobrança/pagamento;
- moedas;
- entidades comercializadoras;
- entidades bancárias;
- tokens;
- ramos, setores, atividades e estruturas comerciais.

A consequência prática é que a funcionalidade depende não apenas da interface, mas também da qualidade e abrangência das tabelas de definição configuradas por companhia, atividade ou país.

---

## 5. Modelo lógico consolidado

Abaixo está uma representação analítica do funcionamento descrito. Ela não foi apresentada como diagrama literal durante a reunião.

```text
Cadastro de Terceiro
│
├── Dados compartilhados entre atividades
│   ├── Contatos
│   ├── Endereços
│   ├── Documentos alternativos
│   ├── Representantes legais
│   ├── Acionistas
│   └── Meios de cobrança e pagamento
│
├── Dados específicos por atividade
│   ├── Segurado
│   │   ├── Informações específicas de segurado
│   │   ├── Consentimentos
│   │   ├── Perfil analítico
│   │   ├── Licença de condução
│   │   └── Terceiro não desejado no próprio fluxo de alta
│   │
│   ├── Agente
│   └── Outras atividades, como tramitadores
│
└── Uso por processos posteriores
    ├── Emissão de apólices
    ├── Sinistros
    ├── Atendimento/call center
    ├── Tesouraria
    ├── Cobranças
    ├── Pagamentos de indenização
    ├── Regras fiscais
    ├── Controles de AML/prevenção à lavagem de dinheiro
    └── Regras locais da seguradora
```

Uma leitura possível é que o cadastro de terceiro atua como uma camada mestre de dados para o ecossistema segurador, enquanto cada atividade adiciona informações específicas de seu contexto operacional.

---

## 6. Bloco de contatos

### 6.1. Finalidade

O bloco de contatos permite registrar um ou mais meios de contato associados a um terceiro.

Os contatos podem se referir tanto a pessoas físicas quanto a pessoas jurídicas. Isso explica por que o bloco reúne informações que, em alguns casos, parecem heterogêneas: ele pode conter desde o telefone pessoal de um segurado até os dados de um assistente, de um contato comercial ou de um departamento de uma empresa.

### 6.2. Tipos de contato e usos possíveis

A sessão cita que o contato pode ser classificado conforme seu uso ou contexto, por exemplo:

- pessoal;
- profissional;
- familiar;
- bancário;
- comercial;
- assistente;
- outro tipo definido pela organização.

Essas classificações são tratadas como tipologias corporativas configuráveis.

### 6.3. Tipo e valor do meio de contato

O tipo de meio de contato determina como seu valor deve ser preenchido e validado. Exemplos mencionados:

| Tipo de meio | Valor esperado |
|---|---|
| Telefone | Número telefônico conforme a codificação local |
| E-mail | Endereço eletrônico em formato de e-mail |
| Fax | Número telefônico |
| Outros meios | Valor compatível com a tipologia configurada |

Para telefones, a reunião cita a possibilidade de validação por expressões regulares, considerando elementos como:

- código do país;
- códigos de longa distância;
- códigos de área;
- estrutura local de numeração.

Foram mencionados, como exemplo, os códigos internacionais `+34` para a Espanha e `+52` para o México.

### 6.4. Verificação de e-mail

A apresentação diferencia duas situações:

- validar o formato do e-mail no cadastro;
- verificar se o e-mail efetivamente pertence ao terceiro.

Foi sugerido, como prática desejável de qualidade de dados, o envio de um e-mail de confirmação com um vínculo para validação pelo destinatário. Contudo, a reunião não afirma que esse fluxo já esteja implementado no sistema.

### 6.5. Dados de pessoa de contato

Quando o contato representa uma pessoa — como um assistente ou um contato corporativo — podem ser registrados, conforme disponibilidade e política local:

- nome;
- primeiro sobrenome;
- segundo sobrenome;
- tipo de documento;
- código ou chave de documento;
- cargo;
- departamento.

A apresentação ressalta que esses dados não necessariamente serão obrigatórios em todos os países.

### 6.6. Contato padrão e contato prioritário

A reunião faz uma distinção importante entre dois conceitos.

| Conceito | Regra apresentada |
|---|---|
| Contato padrão | Existe um por tipo de meio de contato |
| Contato prioritário | Existe apenas um em toda a relação de contatos do terceiro |

Exemplo analítico:

- Um terceiro pode possuir vários telefones e e-mails.
- Para cada tipo de contato, pode haver um registro padrão.
- Entre todos os contatos — telefones, e-mails, assistentes e demais meios — apenas um é marcado como prioritário.

O contato padrão é descrito como o que deve aparecer por padrão em formulários, atendimentos ou processos internos. O contato prioritário é o principal para situações em que a seguradora precisa entrar em contato com o terceiro.

### 6.7. Contato validado

Se um contato estiver marcado como validado, a orientação apresentada é que ele não deveria ser modificado diretamente. Em caso de mudança, o procedimento recomendado seria:

```text
Contato antigo validado
↓
Inabilitar o registro anterior
↓
Criar novo contato
↓
Definir nova data de validade
↓
Validar novamente, quando aplicável
```

A transcrição apresenta essa lógica como a abordagem mais adequada para preservar histórico, não como uma regra obrigatória já implementada para todos os casos.

### 6.8. Terceiro de referência e prevenção à lavagem de dinheiro

O campo “terceiro de referência” foi apresentado como uma marca aplicável em um contexto específico:

1. a companhia precisa ter ativado um parâmetro de controle relacionado à prevenção à lavagem de dinheiro;
2. o terceiro cadastrado deve ser uma pessoa jurídica;
3. a pessoa jurídica deve atuar na atividade 1, identificada na apresentação como segurado;
4. entre os contatos da pessoa jurídica, um deles pode ser marcado como terceiro de referência.

A finalidade descrita é direcionar notificações ao contato indicado quando houver uma situação relacionada a suspeitas de lavagem de dinheiro ou a solicitações de informação vinculadas a esse tipo de controle.

O exemplo utilizado foi uma grande empresa, como “Mercado Libre”, com múltiplos departamentos e contatos. Nesse cenário, apenas um contato poderia ser marcado como referência, possivelmente pertencente a uma área jurídica ou de assessoria.

A apresentação sugere que a seguradora poderia comunicar autoridades competentes conforme a legislação local, mas não detalha:

- o fluxo de investigação;
- as integrações externas;
- as autoridades envolvidas;
- as regras de escalonamento;
- os requisitos legais específicos por país.

---

## 7. Bloco de endereços

### 7.1. Evolução em relação ao modelo anterior

A apresentação afirma que o modelo de dados anterior permitia no máximo três endereços:

- residência;
- comercial;
- correspondência.

No modelo apresentado, o terceiro pode possuir **N endereços de qualquer tipo**. Foram citados exemplos como:

- duas ou mais residências;
- imóvel de praia;
- residência em uma cidade e outro imóvel em outra localidade;
- endereço comercial;
- caixa postal.

Essa mudança amplia a flexibilidade do cadastro e evita limitar a realidade do terceiro a apenas três categorias fixas.

### 7.2. Estrutura geográfica

Os endereços utilizam uma estrutura geográfica hierárquica, que pode incluir:

- país;
- estado ou província;
- cidade;
- localidade;
- distrito;
- níveis geográficos adicionais, do primeiro ao quinto nível;
- código postal.

A estrutura exata depende da configuração e da realidade administrativa de cada país.

### 7.3. Captura por endereço ou por código postal

A apresentação descreve duas possibilidades de navegação/captura:

```text
Opção A
País
↓
Níveis geográficos
↓
Código postal
```

```text
Opção B
País
↓
Código postal
↓
Carga automática de níveis geográficos associados
↓
Preenchimento final de nível local/distrito, se necessário
```

A escolha entre essas opções depende de um parâmetro no nível da companhia e da maturidade dos dados geográficos disponíveis em cada país.

A transcrição não especifica como essa carga automática é tecnicamente implementada, nem se ela ocorre por catálogo interno, serviço externo ou outro mecanismo.

### 7.4. Padronização de logradouro

O tipo de endereço ou logradouro é tratado como uma codificação corporativa. Exemplos citados:

- rua;
- avenida;
- passeio;
- outras denominações locais.

A motivação é evitar variações livres de escrita, como abreviações diferentes para a mesma categoria de logradouro. Esse controle é apresentado como medida de qualidade de dados, reduzindo a necessidade de processos posteriores de normalização.

### 7.5. Dados adicionais de endereço

Foram mencionados os seguintes elementos:

- nome do logradouro;
- número;
- extensão ou complemento;
- urbanização ou informação complementar;
- extensão de país, quando o endereço estiver em país distinto daquele da companhia;
- latitude;
- longitude.

A latitude e longitude foram associadas ao endereço do terceiro, e não à localização de risco segurado. A apresentação deixa explícito que esses conceitos não devem ser confundidos.

### 7.6. Endereço validado

O endereço pode possuir uma marca de comprovação/validação. Se estiver comprovado, o entendimento apresentado é que seus campos não deveriam ser modificados diretamente.

Exceções possíveis foram citadas, como uma reclassificação oficial de código postal por órgão postal local. Mesmo nesse caso, a prática recomendada seria inabilitar o endereço antigo e criar um novo registro.

### 7.7. Endereço padrão

Entre vários endereços, um pode ser definido como padrão. A apresentação usa como exemplo sua utilização em comunicações postais dirigidas ao terceiro.

### 7.8. Domicílio fiscal

A reunião afirma que somente um dos endereços pode ser marcado como domicílio fiscal.

A razão é a necessidade de coerência com regras de tesouraria e tributação. O domicílio fiscal pode permitir identificar a localização territorial relevante para aplicação de impostos ou retenções.

Foi dado o exemplo de diferenças territoriais dentro da Espanha, como País Basco, Navarra e Catalunha. Esse exemplo ilustra o princípio de que a localização fiscal do terceiro precisa estar alinhada às regras tributárias que a companhia configurou.

A transcrição não detalha:

- quais tributos são calculados;
- quais integrações existem com a tesouraria;
- como os regimes fiscais são modelados;
- se o cálculo é automático no núcleo.

---

## 8. Documentos alternativos

### 8.1. Finalidade

Documentos alternativos são documentos adicionais associados ao terceiro, distintos do documento principal de identificação.

A apresentação cita como exemplos possíveis:

- número de identificação complementar;
- cartão BP/British Petroleum;
- outros códigos que a seguradora decida reconhecer como documentos alternativos.

A lista concreta é definida pela companhia, e não deve ser aberta para que cada terceiro cadastre livremente qualquer documento.

### 8.2. Restrição nos processos de emissão e sinistros

Um direcionamento foi afirmado de forma enfática:

> Mesmo que um terceiro possua documentos alternativos, eles não devem ser capturados nos processos de emissão e sinistros.

Segundo a apresentação, documentos alternativos devem nascer e ser associados no cadastro do terceiro. O processo de emissão não deve permitir, por exemplo, que uma apólice seja emitida para um tomador usando um documento alternativo como sua identificação principal.

A justificativa informada é que esse é um critério adotado no núcleo da plataforma.

### 8.3. Campos e verificações

Foram mencionados os seguintes campos ou possibilidades:

- tipo de documento;
- código do documento;
- data de emissão;
- data de expiração;
- país emissor;
- marca de documento comprovado;
- observações;
- data de comprovação;
- data de validade;
- inabilitação.

### 8.4. Inconsistência observada no ambiente de demonstração

Durante a demonstração, o apresentador tentou cadastrar um documento que aparentemente não deveria ser permitido como documento alternativo. O sistema aceitou o registro, e isso foi classificado explicitamente como um **bug**.

O comportamento esperado, segundo a explicação, seria validar que o tipo de documento selecionado está marcado no catálogo como documento alternativo. A transcrição não informa se o defeito foi registrado formalmente, corrigido ou reproduzido em outro ambiente.

### 8.5. Modelo de validação

A apresentação repete o padrão já discutido:

- se o documento foi comprovado, idealmente não deveria ser alterado;
- quando necessário, ele deveria ser inabilitado e substituído por novo registro;
- a verificação pode ser feita por área interna, por pessoas responsáveis ou por processo batch noturno;
- se não houver dados, processo ou capacidade operacional para validar, o registro permanece aberto sem essa garantia.

---

## 9. Representantes legais

### 9.1. Aplicabilidade

O bloco de representantes legais foi apresentado como particularmente adequado para:

- pessoas jurídicas;
- pessoas físicas que atuam como autônomas ou em situação que exija representação legal.

Um representante legal pode ser pessoa física ou pessoa jurídica, desde que esteja identificado na estrutura de terceiros com a atividade correspondente.

### 9.2. Atividade específica

A apresentação cita a atividade **45** como a atividade do núcleo destinada a informar representantes legais.

O representante selecionado deve estar associado a essa atividade, e a partir do seu documento o sistema pode recuperar informações como nome e sobrenomes.

A transcrição não detalha a nomenclatura oficial da atividade 45, apenas afirma que ela corresponde à utilização relacionada a representantes legais.

### 9.3. Dados e marcas citados

Foram mencionados:

- tipo de documento;
- chave/código de documento;
- nome e sobrenomes recuperados do cadastro, quando disponíveis;
- tipo de representação legal;
- data de início/validade;
- data de término;
- indicador de pessoa politicamente exposta;
- inabilitação;
- investigação;
- marca de atividade ilícita;
- motivo associado à atividade ilícita.

### 9.4. Pessoas politicamente expostas e atividade ilícita

O bloco permite registrar marcas relacionadas a:

- pessoa politicamente exposta;
- pessoa investigada;
- possível atividade ilícita.

O apresentador ressalta que isso não significa que todos os representantes legais devem ser investigados manualmente pelo usuário. Ele sugere que essas informações poderiam ser obtidas por algoritmos ou fontes externas, mas não detalha qualquer integração específica.

### 9.5. Relação com regras de negócio

Foi apresentada uma possibilidade de uso: se uma regra corporativa determinar que um representante legal marcado com atividade ilícita deve afetar também o representado, o cadastro oferece uma forma de suportar essa relação.

Contudo, a reunião não afirma que essa regra já esteja implementada no núcleo. A explicação indica que o sistema disponibiliza as marcas; a exploração operacional delas depende de decisões e regras adicionais.

### 9.6. Tipos de representação

Foram citados exemplos de tipos como:

- representante;
- procurador/apoderado.

O apresentador declara não entrar no detalhe jurídico da diferença entre esses tipos. A interpretação oferecida é que um tipo pode permitir assinatura e outro representar sem as mesmas atribuições, mas isso não foi confirmado como regra formal do sistema.

Também foi afirmado que, naquele momento, não havia funcionalidade implementada no núcleo que executasse ações específicas com base no tipo de representação legal. O tipo funcionaria principalmente como classificação, podendo ser explorado posteriormente por processos locais.

---

## 10. Acionistas

### 10.1. Finalidade e limites de uso

O bloco de acionistas aplica-se a pessoas jurídicas.

A apresentação enfatiza que ele **não deve ser tratado como repositório massivo da estrutura acionária completa** de grandes companhias listadas em bolsa. Exemplos como Mercado Libre, Grupo Carso, Telefónica, Repsol e outros foram usados para mostrar que seria impraticável manter todos os milhões de acionistas e todas as mudanças diárias de negociação.

O uso pretendido é mais seletivo: identificar acionistas que atendam a critérios específicos de relevância ou obrigação.

### 10.2. Critérios possíveis

Como exemplos de critérios, foram citados:

- participação acionária acima de determinado percentual;
- referência de 15% como exemplo;
- exigências legais locais;
- necessidades de controle;
- requisitos fiscais;
- necessidades de prevenção ou monitoramento.

A reunião não estabelece que 15% seja uma regra universal. Esse número foi apresentado como exemplo de um limiar que poderia ser adotado localmente.

### 10.3. Formas de manutenção

A manutenção da informação poderia ocorrer:

- manualmente, para um conjunto limitado de acionistas relevantes;
- por processo batch, quando houver necessidade e capacidade para isso.

A transcrição não especifica fontes de mercado, integrações ou fornecedores de dados acionários.

### 10.4. Dados citados

Foram mencionados:

- tipo de documento;
- código de documento;
- nacionalidade;
- nome e sobrenomes;
- data de alta como acionista;
- data de baixa;
- percentual de participação;
- cargo do acionista;
- data de validade;
- marca de pessoa politicamente exposta.

O percentual de participação é tratado de forma genérica. O apresentador observa que, no estado descrito, não há distinção explícita entre:

- percentual de direitos econômicos;
- percentual de direitos de voto.

Essa evolução seria possível, mas não estaria implementada naquele momento.

### 10.5. Diferença entre marcação do acionista e do terceiro

A transcrição destaca uma diferença conceitual:

- uma pessoa pode estar marcada como politicamente exposta no repositório de terceiros, incluindo relações associadas;
- no bloco de acionistas, a marca pode se referir especificamente ao acionista como tal.

A apresentação não aprofunda como essas marcas são reconciliadas entre os diferentes blocos.

---

## 11. Meios de cobrança e pagamento

### 11.1. Finalidade

O bloco registra os meios pelos quais o terceiro pode realizar pagamentos à seguradora ou receber pagamentos dela.

Foram citados como tipos possíveis:

- conta bancária;
- cartão;
- pagamento móvel/celular;
- carteira digital;
- moeda virtual;
- pagamento on-line.

A lista exata de opções depende dos tipos configurados pela companhia.

### 11.2. Tipo e classificação do meio

A estrutura apresentada possui ao menos dois níveis:

1. tipo principal de meio de cobrança/pagamento;
2. classificação ou subtipo.

Exemplos citados:

| Tipo principal | Possíveis classificações |
|---|---|
| Conta bancária | Corrente, investimento/valores, poupança, on-line |
| Pagamento móvel | Apple Pay, Google Pay, Samsung Pay, conforme catalogação |
| Cartão bancário | Crédito, débito, revolving, pré-pago, carteira |

Os exemplos de marcas e produtos não devem ser interpretados como lista oficial ou integração confirmada da plataforma; foram usados para ilustrar a classificação.

### 11.3. Entidade comercializadora e entidade bancária

A apresentação diferencia:

- entidade comercializadora do meio;
- entidade bancária.

Uma entidade comercializadora pode ser:

- banco;
- fintech;
- emissora de cartão;
- outro tipo configurado.

Foi usado o exemplo de uma emissora como “Iberia Cards”, que não seria necessariamente um banco tradicional, embora o cartão possa estar associado a uma conta bancária para débitos.

Também foi explicado que, no modelo de dados novo, entidades bancárias podem ser tratadas como terceiros, algo que não seria possível no modelo anterior. A transcrição não detalha as implicações técnicas dessa mudança.

### 11.4. País e titularidade

Foram citados:

- país da entidade associada ao meio de cobrança/pagamento;
- titular do meio;
- moeda associada;
- sequência automática do registro.

O país corresponde ao primeiro nível da estrutura geográfica utilizada pela solução.

### 11.5. Proteção, mascaramento, tokenização e criptografia

A reunião menciona mecanismos de proteção de dados:

- mascaramento;
- tokens;
- valor tokenizado;
- valor criptografado;
- controle de acesso à informação.

A explicação deixa claro que nem todos os usuários devem enxergar todos os meios ou todos os dados sensíveis relacionados a eles.

Entretanto, alguns termos foram usados de forma parcialmente imprecisa na transcrição. O apresentador afirma que o valor criptografado seria o valor visualizado em tela, mas a conversa não apresenta uma definição técnica formal que permita estabelecer com segurança a diferença operacional entre:

- valor real;
- valor mascarado;
- valor tokenizado;
- valor criptografado.

Também é mencionado que a criptografia deveria ser realizada por algum serviço de arquitetura, mas não há detalhamento de algoritmo, cofre, HSM, padrão de tokenização, integração externa ou controles de chave.

### 11.6. Cobranças e pagamentos

O meio pode ser classificado conforme seu uso em movimentos:

- cobrança;
- pagamento;
- ambos, conforme configuração.

Exemplos apresentados:

- cobrança de prêmio/recibo de seguro em conta do tomador;
- pagamento de indenização de sinistro;
- transferência para beneficiários;
- eventual pagamento por cheque, citado como alternativa considerada arcaica.

A cadeia de responsabilidades descrita para indenizações é:

```text
Área técnica de sinistros
↓
Define/gera a ordem de pagamento
↓
Tesouraria executa o pagamento
↓
Pagamento utiliza meio de cobrança/pagamento elegível
```

Esse desenho é uma reconstrução analítica do que foi explicado verbalmente. A transcrição não detalha interfaces, eventos, serviços ou módulos técnicos envolvidos nessa integração.

### 11.7. Uso do meio de cobrança/pagamento

Há referência a um campo de uso do meio, configurável conforme a gestão de tesouraria. No ambiente mostrado, haveria apenas o valor “qualquer”, porque a funcionalidade aparentemente não era explorada em maior profundidade.

Foram mencionadas possibilidades como classificar um meio para:

- cobrança de prêmios;
- pagamento de indenizações;
- outros fins operacionais.

A apresentação esclarece que a ausência de uso detalhado não significa necessariamente que a capacidade não exista; pode significar que ela não foi configurada ou explorada pelo núcleo naquele contexto.

### 11.8. Validação do meio

A validação pode envolver, por exemplo, uma tentativa de cobrança de valor zero em um cartão para verificar:

- número;
- mês de expiração;
- ano de expiração;
- consistência dos dados.

Esse cenário foi apresentado como exemplo de implementação possível, não como confirmação de um fluxo já ativo.

Após validação, a recomendação é não modificar diretamente o registro. Quando um cartão vence ou seus dados mudam, a ação adequada seria:

```text
Meio validado existente
↓
Inabilitar registro anterior
↓
Cadastrar novo meio
↓
Atribuir nova sequência e vigência
↓
Executar nova validação, quando aplicável
```

### 11.9. Meio padrão e prioritário

O bloco também diferencia meio padrão e prioritário.

| Conceito | Regra apresentada |
|---|---|
| Meio padrão | Meio apresentado por padrão em processos operacionais |
| Meio prioritário | Meio principal dentro da categoria/tipo de meio |

Foi dado o exemplo de cobrança de prêmio: se o tomador tiver vários meios, o meio padrão seria aquele inicialmente apresentado para uso no processo.

A transcrição indica que existe apenas um prioritário por tipo de meio de cobrança/pagamento. Por exemplo:

- um cartão prioritário;
- uma conta corrente prioritária.

### 11.10. Coerência temporal

A data de validade do meio deve ser respeitada nos processos posteriores. O apresentador afirma que não deveria ser permitido cobrar um prêmio em um meio cujo início de validade seja posterior à data da cobrança.

---

## 12. Terceiros não desejados

### 12.1. Conceito

Um terceiro não desejado é um terceiro já existente no sistema que é classificado como inadequado para determinadas operações, contextos ou combinações de negócio.

A apresentação deixa claro que essa classificação não equivale necessariamente a:

- inabilitar o terceiro de forma global;
- impedir todas as operações;
- remover o cadastro;
- bloquear automaticamente qualquer relação com a companhia.

O objetivo é permitir restrições seletivas.

### 12.2. Exemplo apresentado

Foi utilizado o exemplo de uma pessoa envolvida em acidente automobilístico sob efeito de drogas ou álcool, com perda total do veículo.

A explicação foi que essa pessoa poderia ser considerada inadequada para operações de automóveis, mas não necessariamente para outros produtos, como seguros de vida, pets ou outros ramos.

Esse exemplo é apenas ilustrativo e não deve ser interpretado como regra de subscrição definida pela plataforma.

### 12.3. Pré-requisito

Para marcar um terceiro como não desejado, ele precisa existir previamente no sistema.

A apresentação mostrou a criação mínima de uma pessoa e, posteriormente, sua marcação como terceiro não desejado.

### 12.4. Dimensões de classificação

A classificação pode considerar combinações de elementos como:

- qualidade/classificação;
- causa;
- setor;
- ramo;
- escritório comercial;
- agente;
- atividade;
- comentário;
- data de validade;
- estado de controle/liberação.

A combinação permite granularidade. Um terceiro poderia, por exemplo, ser inadequado:

- para todos os setores;
- para um setor específico;
- para um ramo específico;
- para determinado escritório;
- para um agente específico;
- para uma combinação de agente, escritório e ramo.

### 12.5. Estado de controle

Foram mencionados estados como:

- controle atribuído;
- liberação;
- liberação permanente.

O entendimento transmitido é que o estado pode ser usado para controlar o efeito temporal ou operacional da marcação, mas a transcrição não define um workflow completo para mudanças de estado.

### 12.6. Causa e motivo

A apresentação diferencia:

- causa de inabilitação;
- motivo associado à causa;
- relação entre causa, atividade e catálogos de configuração.

As causas parecem ser configuradas por companhia, enquanto os motivos podem depender da atividade. O exemplo mostrado no ambiente incluía uma causa de falta de pagamento, mas o apresentador destacou que o ambiente de desenvolvimento tinha poucos códigos configurados e não representava a totalidade dos usos possíveis.

### 12.7. Exploração nos processos de negócio

A marcação, por si só, registra a condição do terceiro. A reação do negócio precisa ser implementada ou configurada nos processos que consomem a informação.

Foi citado como exemplo que uma seguradora poderia:

- impedir a emissão de determinada apólice;
- permitir a emissão, mas aplicar acréscimo de 150% no prêmio líquido bonificado;
- restringir apenas determinado ramo;
- aplicar tratamento diferenciado para combinações específicas de agente, escritório e produto.

A apresentação deixa explícito que o núcleo não possui, necessariamente, regras automáticas implementadas para todas essas possibilidades. A plataforma fornece a informação; cabe à seguradora definir e explorar a regra.

### 12.8. Evolução para outras atividades

A funcionalidade teria nascido originalmente para a atividade 1, associada a segurados.

Segundo a apresentação, houve uma evolução — atribuída de forma incerta a Panamá ou Honduras — para permitir a marcação de terceiros não desejados em outras atividades, como agentes.

A transcrição não permite confirmar:

- o país que demandou a evolução;
- a versão em que ela foi entregue;
- o escopo exato da alteração;
- quais atividades adicionais são suportadas.

### 12.9. Diferença entre segurado e demais atividades

Para segurados, a marca de terceiro não desejado pode ser feita durante o próprio fluxo de alta, no bloco específico da atividade de segurado.

Para outras atividades, o fluxo descrito é:

```text
Criar terceiro para a atividade
↓
Finalizar o cadastro
↓
Modificar o terceiro
↓
Marcá-lo como terceiro não desejado
```

Essa diferença é explicada como resultado de uma evolução funcional: o segurado possui um procedimento específico, enquanto as demais atividades precisam seguir o fluxo posterior de modificação.

---

## 13. Relações de causa e efeito identificadas

Abaixo está uma consolidação analítica das relações explicadas ao longo da sessão.

### 13.1. Qualidade de dados e histórico

```text
Dados alterados sem rastreabilidade
↓
Perda de histórico e inconsistência
↓
Necessidade de controlar validade, verificação e inabilitação
↓
Criação de novo registro em vez de alteração de registro validado
```

### 13.2. Cadastro de terceiros e processos posteriores

```text
Cadastro do terceiro
↓
Disponibilização de contatos, endereços e meios de pagamento
↓
Uso em emissão, atendimento, sinistros e tesouraria
↓
Necessidade de coerência transversal entre módulos
```

### 13.3. Ausência de padronização

```text
Captura livre de logradouros, tipos e classificações
↓
Variações e duplicidades na base
↓
Dificuldade de tratamento posterior
↓
Uso de catálogos e codificações corporativas
```

### 13.4. Regras genéricas versus exploração local

```text
Núcleo disponibiliza campos, catálogos e marcas
↓
Cada companhia define políticas, processos e regras
↓
A mesma capacidade pode gerar comportamentos diferentes por país ou entidade
```

### 13.5. Terceiro não desejado

```text
Terceiro apresenta condição de risco ou inadequação contextual
↓
Necessidade de restringir apenas certas operações
↓
Classificação por setor, ramo, agente, escritório e atividade
↓
Aplicação de regras locais em emissão ou outros processos
```

---

## 14. Modelo operacional descrito

### 14.1. Manutenção de dados

A sessão reconhece que nem todas as informações serão cadastradas ou validadas on-line no momento da alta.

A manutenção pode ser feita por:

- usuários operacionais;
- áreas especializadas;
- departamentos de validação;
- processos batch noturnos;
- algoritmos alimentados por fontes externas, em hipótese mencionada.

A transcrição não informa quais desses mecanismos existem de fato no ambiente demonstrado.

### 14.2. Validação e governança

A lógica recomendada é:

- cadastrar;
- validar, quando aplicável;
- proteger o dado validado contra alteração direta;
- inabilitar o dado antigo;
- inserir novo dado quando houver mudança;
- preservar data de validade e rastreabilidade.

### 14.3. Correção de defeitos

O apresentador observou um comportamento considerado incorreto no cadastro de documentos alternativos. Ele reforçou que inconsistências detectadas no núcleo devem ser corrigidas.

Também foi mencionado que a forma de atuação entre grupos de trabalho deveria estar definida no modelo de relacionamento do projeto, embora o apresentador declare não conhecer detalhes de escopo, custo ou contratos.

---

## 15. Governança e responsabilidades

A transcrição não apresenta uma estrutura formal completa de governança, mas permite identificar algumas responsabilidades funcionais.

| Tema | Responsabilidade indicada ou inferida do discurso |
|---|---|
| Configuração de catálogos | Companhia, país ou equipes de configuração |
| Políticas de validade | Companhia seguradora |
| Validação de dados | Área, pessoas ou processos automáticos, conforme capacidade local |
| Emissão de apólices | Processo de emissão, respeitando dados vigentes e regras de negócio |
| Sinistros | Área técnica de sinistros, com interação posterior com tesouraria |
| Pagamentos | Tesouraria executa a ordem de pagamento |
| AML/prevenção à lavagem de dinheiro | Configuração da companhia e área responsável pelos controles |
| Regras de terceiros não desejados | Companhia define como explorar a marcação nos processos |
| Correção de falhas no núcleo | Modelo de relacionamento entre os grupos do projeto, não detalhado |

Não foram detalhados:

- Product Owner;
- Product Manager;
- Scrum Master;
- estrutura de arquitetura;
- modelo de releases;
- SLA;
- modelo de suporte;
- esteiras de CI/CD;
- governança de segurança;
- modelo de auditoria.

---

## 16. Perguntas, confirmações e respostas relevantes

A transcrição contém poucas perguntas formais de participantes. Predominam perguntas retóricas usadas pelo instrutor para guiar o treinamento e obter confirmação de entendimento.

### 16.1. “Está claro por agora?”

**Objetivo da pergunta:** verificar se a explicação sobre endereços, datas de validade e blocos de informação havia sido compreendida.

**Resposta observada:** não há uma resposta detalhada registrada; o instrutor prossegue com o conteúdo.

**O que isso esclarece:** a sessão tem formato didático, com validações de entendimento intermediárias, mas não há debate aprofundado registrado nesse ponto.

### 16.2. “Entendido isto?”

**Objetivo da pergunta:** confirmar a compreensão sobre terceiro de referência, contato padrão, contato prioritário e validação.

**Resposta observada:** há respostas breves de concordância, sem questionamentos adicionais.

**O que isso esclarece:** o apresentador considera essencial distinguir contato padrão, prioritário e terceiro de referência, pois são marcas semelhantes, mas com finalidades distintas.

### 16.3. Questão implícita: por que registrar acionistas?

**Resposta apresentada:** não para cadastrar todos os acionistas de empresas grandes, mas para identificar participações relevantes conforme critérios de negócio, legais ou de controle.

**O que isso esclarece:** o bloco não é uma base de mercado de capitais; é um cadastro seletivo de informações relevantes para a relação seguradora–pessoa jurídica.

### 16.4. Questão implícita: a marca de terceiro não desejado bloqueia tudo?

**Resposta apresentada:** não necessariamente. Ela identifica o terceiro em determinado contexto; os processos posteriores decidem se bloqueiam, encarecem, restringem ou tratam o caso de outra forma.

**O que isso esclarece:** a funcionalidade é um mecanismo de classificação e controle, não uma regra universal de bloqueio automático.

### 16.5. Questão implícita: documentos alternativos podem ser usados na emissão?

**Resposta apresentada:** não. Eles devem ser cadastrados no terceiro, mas não devem ser aceitos como documento de identificação no processo de emissão ou sinistros.

**O que isso esclarece:** há uma separação entre dados complementares do cadastro e identificação válida para processos transacionais centrais.

---

## 17. Limitações e ressalvas reconhecidas

### 17.1. Dependência de políticas locais

Diversas decisões dependem das políticas de cada companhia ou país:

- data de validade a ser usada;
- obrigatoriedade de campos;
- tipos de contato;
- estrutura geográfica;
- regras de validação;
- utilização de cargos e departamentos;
- classificação de meios de pagamento;
- regras para acionistas relevantes;
- uso de terceiros não desejados.

### 17.2. Funcionalidade disponível não implica uso efetivo

A apresentação reforça que vários campos existem, mas podem não estar sendo utilizados no núcleo ou pelas entidades. Exemplos:

- uso detalhado do meio de cobrança/pagamento;
- ações baseadas em tipos de representação legal;
- exploração de marcas de atividade ilícita;
- manutenção ampla de acionistas;
- regras automáticas a partir de terceiro não desejado.

### 17.3. Validação não necessariamente é on-line

A transcrição afirma que a verificação de contatos, documentos, endereços e outros dados pode depender de processos posteriores, áreas especializadas ou batches noturnos.

### 17.4. Ambiente de desenvolvimento

O ambiente demonstrado contém dados de exemplo e configurações limitadas. O apresentador alerta que:

- determinados catálogos possuem poucos valores;
- alguns comportamentos podem refletir ambiente de desenvolvimento;
- ao menos um comportamento foi identificado como bug;
- o ambiente não deve ser tomado como referência completa da configuração produtiva.

### 17.5. Limitações declaradas pelo apresentador

O próprio apresentador declara não conhecer em profundidade:

- diferenças jurídicas entre todos os tipos de representação;
- detalhes de custos e escopo do projeto;
- forma contratual de tratamento de defeitos;
- detalhes de criptografia;
- detalhes da evolução atribuída a Panamá ou Honduras;
- decisões específicas de cada país.

---

## 18. Riscos e desafios

### 18.1. Riscos explicitamente reconhecidos

| Risco ou problema | Evidência na sessão |
|---|---|
| Uso de documento alternativo indevido em emissão/sinistros | O apresentador afirma que isso não deve ser permitido |
| Inconsistência por alteração de dados validados | Recomendação de inabilitar e criar novo registro |
| Uso de contato ou meio de pagamento antes da vigência | Ênfase na data de validade e coerência transversal |
| Cadastro massivo inviável de acionistas | Alerta explícito contra essa finalidade |
| Falta de configuração dos catálogos | Diversos fluxos dependem de catálogos corporativos e locais |
| Bugs no núcleo | Demonstração aceitou documento que não deveria ser alternativo |
| Falta de alinhamento operacional entre grupos | Apresentador recomenda definir cedo a forma de atuar diante de inconsistências |

### 18.2. Desafios derivados do contexto — análise

As observações abaixo são interpretações analíticas fundamentadas na sessão, não afirmações literais dos participantes.

#### Gestão de dados mestres

A quantidade de blocos, marcas, vigências e catálogos indica que a solução exigirá governança forte de dados mestres. Sem regras consistentes para manutenção, validação e inabilitação, a flexibilidade do modelo pode levar à degradação da qualidade da base.

#### Consistência entre domínios

A sessão evidencia dependências entre cadastro de terceiros, emissão, sinistros, tesouraria, fiscalidade e compliance. A ausência de regras de integração claras pode causar situações como:

- tentativa de uso de terceiro ainda não vigente;
- cobrança em meio de pagamento inválido;
- tributação incompatível com domicílio fiscal;
- uso inadequado de contato ou endereço;
- aplicação inconsistente de regras de terceiro não desejado.

#### Configuração versus desenvolvimento

Parte significativa do comportamento depende de catálogos e políticas configuráveis. Isso reduz rigidez do núcleo, mas aumenta a necessidade de diferenciar:

- problema de configuração;
- lacuna de regra de negócio;
- necessidade de evolução;
- defeito do produto.

#### Proteção de dados financeiros

A presença de dados bancários, cartões, mascaramento, tokenização e criptografia indica alto grau de sensibilidade. A reunião, porém, não detalha controles técnicos, perfis de acesso, gestão de chaves, retenção, auditoria ou conformidade regulatória aplicável.

---

## 19. O que a reunião não permite concluir

A transcrição não fornece detalhe suficiente para afirmar com segurança:

- qual é o nome oficial da plataforma: “Rizcor”, “RISCOR” e “Driftcore” podem ser erros de transcrição ou referências distintas;
- qual tecnologia é utilizada pelo sistema;
- se a solução é monolítica, baseada em microserviços ou possui outra arquitetura;
- quais bancos de dados são utilizados;
- se existem APIs, eventos, mensageria ou integrações síncronas/assíncronas para os fluxos descritos;
- como são implementados mascaramento, tokenização e criptografia;
- quais padrões criptográficos, cofres ou mecanismos de gestão de chaves são usados;
- quais integrações externas validam documentos, endereços, cartões ou pessoas politicamente expostas;
- quais regras AML estão implementadas e em quais países;
- quais autoridades recebem notificações em caso de suspeita;
- quais regras de privacidade e proteção de dados pessoais se aplicam;
- se há autenticação multifator, IAM, segregação de funções ou trilhas de auditoria;
- como ocorre a aprovação de alterações de dados;
- quais são os SLAs de suporte, correção de defeitos ou manutenção;
- quais versões, releases ou roadmap técnico existem;
- se os exemplos de validação por cobrança de valor zero estão implementados;
- quais regras efetivamente utilizam a marca de terceiro não desejado;
- se existem limites legais universais para acionistas relevantes;
- como são tratados regimes fiscais fora do exemplo espanhol;
- se a marcação de pessoa politicamente exposta é integrada a fontes externas;
- se há automação real por batch ou se isso foi apenas apresentado como possibilidade;
- qual país solicitou a evolução funcional mencionada entre Panamá e Honduras.

---

## 20. Transformações estruturais identificadas — análise

### 20.1. De cadastro simples para domínio mestre transversal

A reunião sugere uma transformação de um cadastro limitado, com poucos endereços e informações estáticas, para uma estrutura de dados mais ampla, temporal e reutilizável.

```text
Cadastro simples e limitado
↓
Múltiplos registros por categoria
↓
Validade e histórico
↓
Dados reutilizados em múltiplos processos
↓
Cadastro mestre de terceiros
```

### 20.2. De atualização direta para preservação de histórico

A insistência em inabilitar e criar novos registros revela uma direção de preservação histórica. O objetivo não parece ser apenas impedir alteração: é manter rastreabilidade de como contatos, endereços, documentos e meios de pagamento evoluíram ao longo do tempo.

### 20.3. De bloqueio global para controle contextual

O mecanismo de terceiro não desejado indica uma mudança de paradigma importante:

```text
Pessoa totalmente habilitada ou totalmente inabilitada
↓
Classificação contextual por ramo, agente, escritório e setor
↓
Decisão de negócio aplicada no processo adequado
```

Essa abordagem permite que uma condição negativa em um contexto não inviabilize automaticamente todas as relações comerciais com o mesmo terceiro.

### 20.4. De dados financeiros expostos para proteção seletiva

A discussão sobre mascaramento, tokenização e controle de acesso aponta para uma preocupação com a visibilidade seletiva de dados de pagamento. A reunião não detalha a arquitetura de segurança, mas mostra que dados financeiros não devem ser visíveis indistintamente a todos os usuários.

---

## 21. Conclusões principais

1. A criação de terceiros é uma base funcional compartilhada por diferentes atividades e processos da seguradora.

2. Contatos, endereços, documentos, representantes legais, acionistas e meios de pagamento devem ser tratados como dados com vigência, histórico, validação e regras de uso.

3. A data de validade é central para a coerência entre módulos. Um dado só deve ser utilizado quando estiver vigente para a operação correspondente.

4. Dados validados deveriam, idealmente, ser inabilitados e substituídos por novos registros em caso de alteração, preservando rastreabilidade.

5. O sistema é altamente orientado por catálogos e configurações. Muitas capacidades dependem da definição local de políticas, classificações e regras operacionais.

6. O bloco de documentos alternativos não deve ser usado como substituto do documento principal nos processos de emissão e sinistros.

7. O bloco de acionistas deve ser usado seletivamente para participações relevantes, e não como repositório completo de alterações acionárias de grandes empresas.

8. Os meios de cobrança e pagamento servem tanto a cobranças de prêmios quanto, potencialmente, a pagamentos de indenizações, conectando cadastro, sinistros e tesouraria.

9. Terceiro não desejado é uma classificação contextual, não um bloqueio automático e universal. Seu efeito real depende das regras que a seguradora implementar nos processos consumidores.

10. A demonstração revelou ao menos um bug relacionado à validação de documentos alternativos e reforçou a necessidade de alinhar, desde cedo, como os grupos envolvidos identificarão, registrarão e corrigirão inconsistências do núcleo.
