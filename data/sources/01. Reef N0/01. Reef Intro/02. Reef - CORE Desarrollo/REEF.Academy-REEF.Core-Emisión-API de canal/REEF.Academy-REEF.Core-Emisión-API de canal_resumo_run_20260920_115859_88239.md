# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `REEF.Academy-REEF.Core-Emisión-API de canal.mp4`
**Data de processamento:** 20/09/2026 12:03:51
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise da Reunião — APIs de Canal, API Business e Integração com TRON

> **Nota sobre a qualidade da fonte:** a transcrição contém grande volume de repetição automática da frase “¿Cómo va el trabajo con la mamá?”, além de algumas palavras potencialmente deformadas por reconhecimento de voz. Esse conteúdo repetitivo foi tratado como ruído e não como parte substantiva da reunião.  
> Não há timestamps, identificação confiável de todos os participantes nem uma agenda formal registrada.

## 1. Síntese executiva

A reunião apresentou um modelo para criar **APIs de canal** que permitam a sistemas externos — como canais comerciais, distribuidores, autosserviços ou intermediários — executar operações no core **TRON** sem precisar conhecer ou manipular diretamente sua terminologia técnica e sua estrutura completa de dados.

A proposta central é evitar que cada canal implemente, de forma independente, uma integração complexa e altamente acoplada às APIs nativas do TRON. Em vez disso, cada país ou implementação pode desenhar uma API orientada ao negócio e ao canal consumidor, expondo apenas os dados realmente necessários para aquele fluxo. Informações obrigatórias, mas fixas para determinado canal, podem ser preenchidas por uma **pré-configuração** associada ao usuário TRON identificado durante a autenticação.

A apresentação também explicou que:

- existe uma camada denominada **API Edge**, aparentemente mais próxima da terminologia e da estrutura interna de TRON/“Neutron”;
- existe uma camada denominada **API Business**, voltada a expor operações em linguagem mais natural e simplificada;
- uma biblioteca de código faz o mapeamento entre os campos amigáveis da API de canal e os campos internos exigidos por TRON;
- o **API Gateway** autentica o chamador e repassa à solução um usuário TRON configurado, sem expor esse identificador como parâmetro aberto ao consumidor externo;
- o **Marketplace** é o ponto de documentação e descoberta das APIs disponíveis;
- há cerca de **600 operações** na API TRON/API Edge e **mais de 300 operações** na API Business, segundo números declarados na reunião.

A principal mensagem foi que essa capacidade já existe e pode ser usada quando houver uma necessidade concreta de integração ou emissão. No entanto, não foi anunciado um programa imediato e amplo de capacitação para todos os países. O modelo apresentado é de apoio do time corporativo conforme surjam demandas reais.

---

## 2. Contexto e antecedentes

A conversa ocorreu como uma sessão de divulgação técnica conduzida por Pablo, aparentemente integrante ou representante de uma equipe corporativa de APIs.

O tema principal foi a exposição de capacidades do core TRON para canais externos. A preocupação não era apenas disponibilizar operações técnicas, mas disponibilizá-las de modo que cada canal consiga operar com uma interface mais simples, coerente com seu processo de negócio e menos dependente de detalhes internos do core.

O cenário apresentado sugere a coexistência de dois níveis de integração:

1. **Integração direta com APIs de TRON/API Edge**  
   Adequada quando a implementação tem domínio da terminologia e dos campos internos do core.

2. **Integração via API Business e APIs de canal**  
   Adequada quando se deseja ocultar parte da complexidade de TRON e oferecer uma interface mais orientada ao negócio, com campos simplificados, regras de preenchimento e pré-configuração por canal.

A reunião não detalha o histórico completo de criação dessas camadas, nem informa quando cada uma foi lançada. Ainda assim, as falas indicam que a API Business vem sendo evoluída e utilizada por ativos corporativos e por países.

---

## 3. Problemas identificados

### 3.1. Complexidade da terminologia e dos campos de TRON

Foi dito que as APIs mais próximas de TRON utilizam uma terminologia própria, referida na transcrição como “neutroniana” ou “Neutron”. Essa terminologia pode ser difícil de compreender mesmo para pessoas que já trabalham com TRON, mas ainda não dominam seus conceitos e campos específicos.

A consequência é que uma integração direta pode exigir conhecimento detalhado de:

- objetos e propriedades do core;
- códigos internos;
- tabelas e colunas associadas;
- campos obrigatórios por operação;
- estrutura completa de entrada exigida pelas APIs técnicas.

### 3.2. Necessidade de evitar duplicação de serviços

Foi ressaltado que a solução evita que um mesmo “ramo” ou capacidade seja implementado repetidamente em múltiplos serviços. O entendimento apresentado é que existe um serviço único, reutilizável, mas cada consumidor pode chamá-lo de modo diferente conforme sua própria pré-configuração.

A relação de causa e efeito apresentada pode ser sintetizada assim:

```text
Múltiplos canais com necessidades e dados de entrada diferentes
↓
Risco de criar serviços redundantes para a mesma operação
↓
Necessidade de um serviço comum com comportamento parametrizável
↓
Pré-configuração por canal/usuário
↓
Reutilização de uma única capacidade de negócio
```

### 3.3. Excesso de dados técnicos no contrato da API

Um dos exemplos centrais foi o tratamento de dados variáveis. Em uma integração técnica, o consumidor poderia precisar informar pares genéricos de código e valor, como um código de marca e seu valor, um código de modelo e seu valor, e assim por diante.

A proposta é “aplainar” ou desnormalizar esse modelo para o consumidor externo. Em vez de enviar estruturas genéricas de `código + valor`, a API de canal poderia expor campos semanticamente claros, como:

- `brand code`, associado à marca;
- `model code`, associado ao modelo.

A tradução entre os nomes amigáveis e os campos internos de TRON seria tratada pela biblioteca de mapeamento.

### 3.4. Risco de segurança ao receber identificadores internos do canal

A reunião destacou que não seria seguro solicitar ao consumidor externo, como parâmetro da API, o usuário TRON ou identificadores internos que definam canal, agente, comissão ou estrutura comercial.

O risco explicitamente mencionado é a possibilidade de alguém tentar se passar por outro usuário apenas conhecendo um identificador TRON.

A abordagem proposta é:

```text
Usuário externo autentica-se no API Gateway
↓
Gateway identifica as credenciais e a configuração associada
↓
Gateway injeta ou repassa um usuário TRON configurado
↓
API busca a pré-configuração desse usuário
↓
Operação é executada com os dados comerciais e operacionais permitidos
```

---

## 4. Solução apresentada

A solução apresentada combina APIs, pré-configuração, bibliotecas de mapeamento e autenticação centralizada.

Em termos conceituais, a organização não propõe simplesmente publicar as APIs técnicas de TRON para qualquer consumidor. A proposta é criar uma camada de negócio e de canal que adapte a interface à realidade de quem irá utilizá-la.

Essa adaptação inclui:

- selecionar quais dados o canal precisa informar;
- ocultar campos técnicos e internos;
- preencher automaticamente informações conhecidas e fixas;
- associar cada chamada a um usuário TRON controlado;
- preservar as regras de autorização do core;
- permitir extensões locais quando um país tiver necessidades próprias.

### 4.1. Separação entre API técnica, API de negócio e API de canal

A reunião sugere a seguinte organização lógica:

```text
Canal externo / Front-end / Plataforma de parceiro
↓
API Gateway
↓
API de canal
↓
API Business
↓
API Edge / API TRON
↓
Core TRON e dados associados
```

> **Importante:** este desenho é uma consolidação analítica baseada nas explicações da reunião. Não foi apresentado como um diagrama literal e completo de todos os componentes técnicos.

A função de cada camada, conforme descrita, pode ser entendida assim:

| Camada | Papel descrito |
|---|---|
| API Gateway | Autentica o chamador e repassa o contexto/usuário TRON aplicável. |
| API de canal | Expõe uma interface adequada a um canal, produto ou implementação concreta. |
| API Business | Simplifica e expõe operações em linguagem mais natural, reduzindo a dependência da terminologia interna de TRON. |
| API Edge / API TRON | Disponibiliza operações mais próximas do core e de sua terminologia técnica. |
| TRON | Core utilizado para executar as operações de negócio, como emissão e abertura de sinistros. |

---

## 5. Arquitetura e funcionamento explicados

### 5.1. Serviço único com pré-configuração por consumidor

Foi explicado que uma mesma operação pode atender diferentes consumidores sem que seja necessário criar uma versão independente do serviço para cada um.

O comportamento varia conforme a pré-configuração associada ao usuário TRON identificado na chamada. Dessa forma:

- um canal pode operar com determinados valores fixos;
- outro canal pode usar valores comerciais diferentes;
- a API pode preencher dados que o canal não envia;
- cada consumidor permanece limitado à configuração que lhe corresponde.

A reunião não detalha onde essa pré-configuração é persistida, qual é seu formato técnico ou como sua manutenção é governada.

### 5.2. Simplificação e aplainamento de dados

O apresentador usou o caso de participantes de uma apólice para explicar a simplificação do contrato da API.

Em determinado produto, foi definido que o tomador e o segurado seriam a mesma pessoa. Nesse cenário, a API de canal não exigiria que o consumidor repetisse os dados da mesma pessoa em dois blocos distintos.

A lógica apresentada foi:

```text
Definição funcional do produto:
tomador = segurado
↓
Não solicitar duas vezes o mesmo conjunto de informações
↓
Reduzir e aplainar o payload exposto ao canal
↓
Mapear o payload simplificado para a estrutura interna exigida por TRON
```

O apresentador reconheceu que esse modelo depende da realidade do produto. Caso tomador, condutor e segurado possam ser pessoas diferentes, a API precisa permitir essa distinção.

### 5.3. Biblioteca de mapeamento

Uma biblioteca de código foi citada como o mecanismo responsável por converter campos amigáveis da API de canal para estruturas e campos esperados por TRON.

No exemplo, um campo exposto como `brand code` seria associado a um campo interno chamado algo como `code marca`. A biblioteca permitiria construir estruturas internas sem exigir que o desenvolvedor do canal monte manualmente todos os elementos técnicos da operação.

A transcrição não identifica:

- o nome da biblioteca;
- sua linguagem de programação;
- seu repositório;
- sua forma de distribuição;
- seus mecanismos de versionamento;
- seus critérios de compatibilidade.

---

## 6. Extensibilidade para necessidades locais

A reunião deixou claro que o modelo permite extensões locais quando a implementação de um país requer informações adicionais.

Foi mencionado um caso da República Dominicana — registrada por vezes como “Dominicana” e, em trechos da transcrição, com reconhecimento aparentemente impreciso — em que, ao inserir informações de terceiros, era necessário também preencher elementos locais utilizados em validações adicionais.

A explicação menciona possíveis verificações relacionadas a arquivos e a “blanqueo de capitales”, expressão em espanhol normalmente associada à prevenção à lavagem de dinheiro. Contudo, a transcrição não detalha a regra, o sistema local, a tabela ou o processo regulatório envolvido. Portanto, não é possível afirmar com segurança qual controle era executado.

### 6.1. Caso de extensão local na República Dominicana

Segundo a explicação:

1. A operação padrão preenchia os dados principais do terceiro no core.
2. Havia necessidade local de preencher dados ou estruturas adicionais.
3. Uma nova operação específica foi implementada no lado local, aparentemente em uma peça denominada “API Edge”.
4. A lógica de negócio da biblioteca de emissão foi estendida.
5. Durante o preenchimento dos dados do terceiro, a solução fazia uma chamada adicional para completar informações locais.

A leitura analítica possível é que o modelo busca combinar padronização corporativa com extensões locais controladas, em vez de obrigar todos os países a utilizarem exatamente o mesmo fluxo.

---

## 7. Etapas sugeridas para implantar uma API de emissão

O apresentador descreveu um fluxo de trabalho para implementar esse tipo de integração.

### 7.1. Definir o que será exposto

O primeiro passo é decidir como o ramo ou produto será exposto para o mundo externo: quais dados serão disponibilizados e quais informações serão necessárias para tornar a emissão possível.

### 7.2. Desenhar o serviço

Em seguida, deve-se desenhar a API:

- quais campos serão solicitados;
- quais campos não serão expostos;
- como as regras do produto serão representadas;
- quais dados serão preenchidos por pré-configuração.

### 7.3. Analisar os canais consumidores

O terceiro passo é analisar os clientes, canais ou consumidores que utilizarão a API. O objetivo é entender com quais dados cada canal conseguirá operar.

A ideia é que os canais, em geral, informem menos dados do que o máximo potencialmente necessário para a operação completa. Os valores que forem fixos ou conhecidos para aquele canal seriam adicionados por pré-configuração.

### 7.4. Expor o serviço por meio da camada de APIs

O último passo mencionado foi expor o serviço para uso seguro e rápido por canais. A expressão “API Edge” aparece em trechos onde a qualidade da transcrição é imprecisa; ainda assim, o contexto indica que a solução é publicada dentro da arquitetura corporativa de APIs.

---

## 8. Autenticação, autorização e contexto de canal

### 8.1. Papel do API Gateway

O API Gateway foi apresentado como a peça responsável por identificar quem está chamando a API.

O fluxo descrito é:

1. O consumidor realiza login no Gateway usando suas credenciais.
2. O Gateway identifica o usuário autenticado.
3. Por configuração, esse usuário externo é relacionado a um usuário TRON.
4. Ao chamar as APIs internas, o Gateway fornece o usuário TRON correspondente.
5. A aplicação usa esse usuário para recuperar a pré-configuração adequada.
6. A chamada é executada conforme os acessos e parâmetros daquele contexto.

### 8.2. Usuário externo não é necessariamente usuário TRON

Foi esclarecido que o usuário que realiza login externamente não precisa ser o mesmo usuário TRON.

O login pode ocorrer, por exemplo, contra:

- Azure AD, mencionado na transcrição como “Azura D”;
- Active Directory;
- outro mecanismo de autenticação configurado no Gateway.

A associação entre a identidade externa e a identidade TRON é tratada por configuração do Gateway, e não por um parâmetro enviado pelo cliente a cada chamada.

### 8.3. Dados comerciais preenchidos por configuração

A pré-configuração pode incluir dados necessários à emissão e que não devem ser livremente informados pelo canal externo, como:

- códigos de canal;
- códigos de nível comercial;
- código de agente;
- percentuais ou regras de comissão;
- elementos da estrutura comercial;
- demais informações obrigatórias para a emissão.

A reunião não especifica todos os campos disponíveis nem define se comissão é sempre preenchida por esse mecanismo. O tema foi usado como exemplo de informação que pode ser determinada pelo contexto autenticado.

---

## 9. Componentes mencionados

### 9.1. TRON

TRON foi apresentado como o core que executa operações de negócio, incluindo emissão e sinistros.

A transcrição sugere que suas APIs mais técnicas utilizam terminologia própria. Não foram detalhados:

- arquitetura interna do core;
- linguagem;
- banco de dados;
- modelo de implantação;
- infraestrutura;
- mecanismos de alta disponibilidade;
- controles de segurança internos.

### 9.2. API Edge / API TRON

A API Edge, também referida como API TRON em alguns trechos, parece ser a camada mais próxima das operações e termos internos de TRON.

Características mencionadas:

- contém aproximadamente 600 operações;
- oferece operações relacionadas a terceiros, segurados e outros domínios;
- pode disponibilizar Swagger para documentação;
- é usada diretamente em algumas implementações;
- sua terminologia pode ser complexa para equipes que não dominam TRON/Neutron;
- está vinculada a uma versão de “SIM” ou “SIMS”, termo que apresenta variação na transcrição.

### 9.3. API Business

A API Business foi apresentada como uma camada de negócio que expõe operações em linguagem mais natural.

Características mencionadas:

- possui mais de 300 operações, segundo a reunião;
- reduz a necessidade de lidar diretamente com a terminologia interna de TRON;
- é usada por ativos corporativos;
- pode ser atualizada independentemente da versão de “SIMS”, segundo a explicação;
- é apontada como base para APIs de canal e para simplificação de operações.

### 9.4. APIs de canal

As APIs de canal são serviços desenhados especificamente para um cenário de uso, país, produto ou consumidor.

Não existe, segundo a reunião, um Swagger único e universal para todos os países e ramos. Cada implementação decide:

- quais campos solicitar;
- quais regras de produto representar;
- quais dados preencher por configuração;
- quais pessoas ou papéis devem ser informados;
- qual estrutura funcional atende ao produto local.

### 9.5. Biblioteca de integração

A biblioteca citada mapeia a interface amigável da API de canal para as estruturas internas exigidas por TRON.

Ela também pode ser estendida para tratar particularidades locais, como o preenchimento adicional de informações em uma implementação nacional.

### 9.6. Marketplace

O Marketplace foi apresentado como o local onde são documentadas as APIs disponíveis no ecossistema TRON.

Entre as capacidades mencionadas:

- consulta das APIs disponíveis;
- filtros por país;
- navegação por ativo ou tipo de API;
- visualização de operações;
- download de Swagger em certos casos;
- descoberta de APIs de TRON/API Edge e da camada de negócio.

Foi mencionado que o Marketplace substituiu uma ferramenta anterior chamada “RAM”. A transcrição não explica o nome completo da ferramenta anterior, nem detalha o processo de migração.

---

## 10. Modelo de integração

### 10.1. Integração direta com API Edge

A reunião citou países e situações em que sistemas consomem diretamente as APIs mais próximas de TRON.

Exemplos apresentados:

- México utiliza diretamente a API Edge para abertura de sinistros, por meio de um ativo chamado “AMA”;
- Panamá possui uma abordagem descrita como semelhante, embora não necessariamente por meio de AMA.

Não foram detalhadas as razões arquiteturais ou de negócio que levaram esses países a optar por integração direta.

### 10.2. Integração simplificada por API Business

Em outros cenários, ativos corporativos consomem operações simplificadas expostas na API Business.

Foram citados autosserviços corporativos e uma API de abertura de sinistros utilizada pelo autosserviço de clientes.

### 10.3. Integração por APIs de canal

O modelo de API de canal fica entre o consumidor externo e as capacidades corporativas. Ele adapta a operação à realidade do produto e do canal.

Exemplo conceitual consolidado:

```text
Intermediário externo
↓
Autenticação no API Gateway
↓
Identidade externa vinculada, por configuração, a um usuário TRON
↓
API de canal recebe apenas os campos necessários
↓
Pré-configuração completa canal, agente, níveis e dados fixos
↓
Biblioteca transforma os campos amigáveis no formato exigido
↓
API Business ou API Edge executa a operação no TRON
```

---

## 11. Casos concretos mencionados

### 11.1. República Dominicana

A República Dominicana foi o caso mais detalhado.

#### Contexto

O país precisou implementar serviços de emissão com urgência após um acordo com determinado cliente, conforme relatado pelo apresentador.

#### Implementação

Foram mencionados exemplos de ramos:

- **viagem:** campos como destino, número de dias e plano de viagem;
- **automóvel:** possibilidade de informar tomador, condutor e segurado quando essas pessoas pudessem ser diferentes.

#### Particularidade local

A implementação exigiu preenchimento adicional de informações locais associadas ao terceiro, aparentemente para validações específicas. O fluxo foi estendido por meio de uma nova operação e alterações na biblioteca de integração.

#### Limitações de interpretação

A reunião não informa:

- o cliente envolvido;
- a data da implementação;
- os ramos completos;
- os contratos de API;
- as regras regulatórias locais;
- o mecanismo técnico exato das validações adicionais.

### 11.2. Paraguai

Paraguai foi citado como país que já possui autosserviço de clientes corporativo e que, juntamente com a República Dominicana, conhece a abertura de sinistros por uma API exposta na API Business.

Não foram fornecidos detalhes adicionais sobre sua arquitetura local.

### 11.3. Brasil

Brasil foi mencionado como país que possui um ativo de autosserviço de clientes. A reunião não detalha se utiliza integralmente as peças corporativas nem como se integra ao core.

### 11.4. México

México foi citado em dois contextos:

- possui um ativo semelhante de autosserviço, embora possa não utilizar as peças corporativas da mesma forma;
- usa a API Edge para abertura de sinistros, aparentemente por meio de AMA.

A transcrição não explica o significado da sigla AMA.

### 11.5. Chile

Chile foi mencionado como país próximo de implantar o autosserviço de fornecedores. Também foi descrito como o primeiro país a implementar o ativo corporativo de chatbot.

A reunião não informa cronograma, arquitetura ou escopo funcional dessas implementações.

### 11.6. Panamá

Panamá foi citado como um caso de abertura de sinistros por integração direta semelhante à do México, sem que fosse detalhado se usa AMA.

### 11.7. Peru

Peru levantou uma dúvida sobre impacto de atualização de versão. Foi mencionado que o país possui API Business em uma versão associada a “TRON 2022” e um projeto paralelo ligado à implementação de “SIM 2024”.

A resposta foi que, em princípio, não deveria haver impacto, pois as APIs são evoluídas com preocupação de retrocompatibilidade. Ainda assim, foi feita uma ressalva: se houver conflito entre a forma como o serviço foi implementado no Peru e a atualização de versão, será necessário tratá-lo no momento apropriado.

Também foi recomendado que o Peru atualize sua API Business para a versão mais recente a fim de usufruir do módulo apresentado.

---

## 12. Operações e capacidades citadas

### 12.1. Emissão

A emissão é o principal caso de uso apresentado. Ela pode ser exposta por APIs de canal adaptadas ao ramo e ao consumidor.

A API pode decidir:

- quais dados de pessoas solicitar;
- quais campos de produto e risco expor;
- quais dados serão fixos por canal;
- como tratar dados variáveis;
- como mapear os dados para TRON.

### 12.2. Abertura de sinistros

Foi confirmado que existem operações de sinistros tanto na API TRON/API Edge quanto na API de negócio simplificada.

Segundo a reunião:

- autosserviços corporativos de clientes já abrem sinistros usando a API de negócio;
- México e Panamá foram citados como consumidores diretos da API Edge para esse processo.

A reunião não detalha as etapas de regulação, acompanhamento, pagamento ou encerramento de sinistro.

### 12.3. Operações sobre terceiros e segurados

No Marketplace, foram exemplificadas operações relacionadas a terceiros, agentes e segurados. O apresentador indicou que essas operações podem ser consultadas e, em determinados casos, ter seus Swaggers baixados.

### 12.4. Catálogo e linguagem de negócio

Foi citado um ativo de catálogo na API Business, com operações em linguagem mais natural. O exemplo mencionado foi a consulta de gêneros, embora a transcrição tenha uma interrupção de conexão logo após esse ponto.

---

## 13. Documentação, descoberta e capacitação

### 13.1. Não existe Swagger universal para APIs de canal

Uma dúvida perguntou se existiam links de Swagger disponíveis para os serviços de canal.

A resposta foi negativa: não existe um Swagger único e genérico porque cada serviço de canal é desenhado especificamente para cada país e implementação.

O Swagger mostrado durante a demonstração havia sido montado pelo próprio apresentador para fins de demonstração.

### 13.2. Marketplace como fonte de consulta

O Marketplace é a principal fonte de documentação das APIs existentes.

Nele, segundo a demonstração, é possível:

- filtrar APIs por país;
- navegar entre peças ou ativos;
- visualizar operações disponíveis;
- consultar operações técnicas de TRON;
- consultar operações em linguagem de negócio;
- baixar Swagger quando disponibilizado.

### 13.3. Limitações atuais da descoberta

Foi reconhecido que a documentação e a busca de APIs ainda precisam melhorar. Um participante relatou dificuldade para saber se uma funcionalidade já existe antes de criar uma API interna.

A resposta reconheceu esse ponto como uma pendência corporativa a ser melhorada.

### 13.4. Uso futuro de inteligência artificial

Foi mencionado que estão sendo trabalhados módulos de inteligência artificial e ChatGPT para melhorar a descoberta de APIs no Marketplace.

O cenário descrito é que, no futuro, um usuário poderia perguntar algo como se existe uma operação para consultar estado civil e receber como resposta as operações disponíveis.

Esse recurso foi apresentado como trabalho em andamento. A reunião não fornece:

- data de disponibilidade;
- fornecedor;
- arquitetura;
- regras de segurança;
- escopo de países;
- critérios de precisão;
- integração exata com o Marketplace.

---

## 14. Organização e modelo de suporte

O time corporativo de APIs foi apresentado como um grupo que pode apoiar países que tenham uma necessidade concreta de integração.

A lógica de suporte relatada é:

1. O país identifica uma necessidade real.
2. O time corporativo avalia a melhor forma de usar as APIs existentes ou criar uma API de canal.
3. O time ajuda na implementação e no uso da biblioteca.
4. O objetivo é que o país se torne progressivamente autônomo para gerar APIs de canal.

Não foi anunciada uma capacitação imediata ou massiva para todos os países. A divulgação teve como objetivo principal tornar a capacidade conhecida.

---

## 15. Roadmap e evolução citados

| Tema | Direcionamento mencionado | Grau de definição |
|---|---|---|
| Busca no Marketplace | Inclusão futura de um buscador para facilitar a localização de APIs por país. | Futuro, sem data. |
| IA para descoberta de APIs | Uso de IA/ChatGPT para responder dúvidas sobre operações existentes. | Em desenvolvimento, sem data. |
| API Business no Peru | Recomendação de atualizar para a versão mais recente para utilizar o módulo apresentado. | Direcionamento técnico; cronograma não informado. |
| Autosserviço de fornecedores no Chile | Chile estava próximo de implementar. | Sem data concreta. |
| Capacitação ampla para países | Não prevista no curto prazo. | Declaração explícita. |

---

## 16. Números e indicadores citados

> Os números abaixo foram declarados durante a reunião e não foram auditados externamente.

| Indicador | Valor mencionado | Contexto |
|---|---:|---|
| Operações na API TRON/API Edge | Aproximadamente 600 | Operações técnicas disponíveis na camada próxima a TRON. |
| Operações na API Business | Aproximadamente 300 | Operações expostas em linguagem mais natural/de negócio. |
| Versão mínima citada para disponibilidade de API Edge | Superior a 2021 | Declaração feita em relação a “SIMS”; nomenclatura exata não é totalmente clara na transcrição. |
| Versão citada pelo Peru | 2022 | API Business/TRON já implantada, conforme pergunta do participante. |
| Atualização em paralelo no Peru | 2024 | Projeto associado a “SIM 2024”, conforme transcrição. |

---

## 17. Perguntas e respostas relevantes

### 17.1. Haverá documentação para entender propriedades e campos?

**Pergunta:** como futuros desenvolvimentos e personalizações poderiam entender a relação entre propriedades, objetos, tabelas e colunas?

**Resposta:** existe documentação da terminologia de TRON em um dicionário, permitindo entender a que conceito, coluna e tabela corresponde cada propriedade de um objeto.

**O que isso esclarece:** há documentação de baixo nível para o modelo interno de TRON, mas a reunião reconhece que a terminologia pode ser complexa. Por isso, a orientação é preferir APIs de negócio e APIs de canal quando possível.

---

### 17.2. Como tratar dados locais não cobertos pelo core?

**Pergunta:** como proceder quando um país possui tabelas ou necessidades locais que precisam continuar sendo usadas, por exemplo, em emissões batch?

**Resposta:** a peça de integração e a biblioteca podem ser estendidas para incorporar operações e preenchimentos adicionais. Foi citado o caso da República Dominicana.

**O que isso esclarece:** o modelo não exige que todas as necessidades locais sejam abandonadas; ele prevê extensões controladas.

---

### 17.3. Haverá treinamento para os países?

**Pergunta:** existe um plano de curto prazo para capacitar os países a conhecer e implementar as APIs?

**Resposta:** não há, no curto prazo, uma iniciativa ampla de capacitação. A divulgação busca tornar a funcionalidade conhecida, e o time corporativo apoiará necessidades concretas.

**O que isso esclarece:** a adoção é orientada por demanda e suporte direcionado, não por um programa de rollout educacional massivo.

---

### 17.4. Existem links de Swagger para os serviços de canal?

**Pergunta:** os Swaggers dos serviços apresentados estão disponíveis?

**Resposta:** não existe um link universal, porque os serviços de canal são específicos de cada país, produto e implementação. O Swagger mostrado foi criado para a demonstração.

**O que isso esclarece:** o contrato de uma API de canal não é um ativo padronizado e reutilizável integralmente; o padrão está na arquitetura e nas capacidades de integração, não em um payload único.

---

### 17.5. Existem APIs para sinistros?

**Pergunta:** há APIs para abertura de sinistros, considerando conversas anteriores sobre uma integração com fornecedor?

**Resposta:** sim. Há operações na API TRON/API Edge e uma versão simplificada na API Business. Autosserviços corporativos já utilizam essa capacidade.

**O que isso esclarece:** sinistros fazem parte do conjunto de capacidades expostas, não apenas emissão.

---

### 17.6. Como autenticar intermediários externos sem expor o usuário TRON?

**Pergunta:** um intermediário que integra sua plataforma e vende apólices precisa enviar um usuário TRON ou parâmetros contratuais para identificação?

**Resposta:** não. O login ocorre no Gateway com credenciais externas. O Gateway, por configuração, associa essa identidade a um usuário TRON e o utiliza internamente para buscar a pré-configuração adequada.

**O que isso esclarece:** o usuário TRON é um contexto interno de execução, e não um dado que o integrador externo deve enviar livremente.

---

### 17.7. A atualização do Peru afetará a API Business existente?

**Pergunta:** a implementação de uma versão mais nova de “SIM” no Peru impactará a API Business já implantada com a versão de 2022?

**Resposta:** em princípio, não deveria impactar, pois a evolução considera retrocompatibilidade. Porém, conflitos específicos entre o serviço existente e a atualização devem ser tratados caso ocorram.

**O que isso esclarece:** existe intenção de retrocompatibilidade, mas não foi dada garantia absoluta de ausência de impacto em todos os cenários locais.

---

### 17.8. Como saber se uma funcionalidade já existe antes de desenvolver outra?

**Pergunta:** equipes são orientadas a não duplicar funcionalidades já existentes na API TRON, mas enfrentam dificuldade para descobrir o que já está disponível.

**Resposta:** o Marketplace e os Swaggers são as fontes atuais. Caso a busca não seja suficiente, a recomendação é acionar o time corporativo. Também foi mencionado trabalho futuro com IA para melhorar essa descoberta.

**O que isso esclarece:** o problema de catalogação e encontrabilidade foi reconhecido como uma lacuna atual.

---

## 18. Limitações reconhecidas

### 18.1. Não há capacitação ampla de curto prazo

Foi explicitamente dito que não existe, no curto prazo, um plano de capacitação generalizada para todos os países.

### 18.2. Não há Swagger único para APIs de canal

Cada país, produto e cenário de integração pode possuir contratos diferentes. Portanto, não há um único Swagger aplicável universalmente.

### 18.3. Marketplace ainda não resolve totalmente a descoberta

Embora o Marketplace documente APIs e permita navegar por operações, a reunião reconhece que encontrar a operação correta ainda pode ser difícil.

### 18.4. A documentação precisa evoluir

Foi dito que melhorar a documentação das APIs é uma pendência corporativa.

### 18.5. Retrocompatibilidade não elimina todos os conflitos locais

Embora a evolução de APIs considere retrocompatibilidade, foi admitido que conflitos específicos podem exigir análise e resolução no momento de uma atualização.

### 18.6. Não foram detalhados aspectos técnicos essenciais

A reunião não detalha:

- padrões de API, como REST, SOAP ou GraphQL;
- formato dos eventos, se houver;
- mensageria;
- bancos de dados;
- estratégias de cache;
- observabilidade;
- logs;
- monitoramento;
- SLAs;
- disponibilidade;
- disaster recovery;
- CI/CD;
- controle de versões dos contratos;
- segregação de ambientes;
- IAM além do fluxo conceitual de autenticação;
- auditoria;
- criptografia;
- limites de consumo ou rate limiting;
- modelo de custos;
- processo formal de aprovação de extensões locais.

---

## 19. Riscos e desafios

### 19.1. Riscos explicitamente mencionados

| Risco | Descrição |
|---|---|
| Suplantação de identidade | Permitir que o canal externo envie livremente um usuário TRON poderia permitir uso indevido de outra identidade. |
| Complexidade da API técnica | Consumir diretamente a API Edge/TRON pode levar a erros ou dificuldades por causa da terminologia e estrutura internas. |
| Duplicação de desenvolvimento | Países podem criar funcionalidades já existentes se não conseguirem localizar as APIs disponíveis. |
| Conflitos em atualização | Implementações locais podem exigir tratamento específico durante uma mudança de versão, mesmo com preocupação de retrocompatibilidade. |

### 19.2. Desafios derivados do contexto

> **Análise:** os itens abaixo são interpretações fundamentadas no conteúdo apresentado, não declarações literais dos participantes.

- **Governar variações por país:** permitir extensões locais aumenta a flexibilidade, mas exige disciplina para impedir que cada implementação se distancie excessivamente do padrão corporativo.
- **Manter pré-configurações corretas:** o modelo depende fortemente da associação correta entre identidade externa, usuário TRON, permissões e dados comerciais.
- **Documentar contratos específicos:** como cada API de canal pode ser diferente, é necessário garantir documentação funcional e técnica suficiente para cada implementação.
- **Evoluir sem quebrar integrações:** a retrocompatibilidade precisa abranger não apenas APIs corporativas, mas também bibliotecas, contratos de canal, configurações e extensões locais.
- **Equilibrar simplicidade e cobertura:** a simplificação do payload reduz complexidade para o canal, mas precisa manter todos os dados necessários ao core e às regras do produto.

---

## 20. Transformações estruturais identificadas

> Esta seção representa uma leitura analítica do conteúdo apresentado.

### 20.1. De APIs técnicas para capacidades de negócio

A direção apresentada indica uma transição de integração baseada diretamente em estruturas internas de TRON para uma camada de capacidades de negócio mais compreensíveis.

```text
Terminologia e estruturas internas de TRON
↓
Camada de abstração e mapeamento
↓
Operações em linguagem de negócio
↓
APIs específicas para canais e produtos
```

### 20.2. De integração rígida para configuração por canal

A pré-configuração permite que um mesmo serviço seja reutilizado por vários consumidores, mas com regras e valores próprios de cada canal.

Isso sugere uma mudança de um modelo de serviços altamente customizados por consumidor para um modelo de capacidade compartilhada, configurável e governada.

### 20.3. De identidade fornecida pelo cliente para identidade controlada pelo Gateway

A autenticação descrita desloca a responsabilidade de determinar o contexto TRON para a infraestrutura de Gateway e suas configurações. Isso reduz o risco de o cliente externo controlar diretamente atributos internos de autorização.

### 20.4. De conhecimento disperso para catálogo corporativo

O Marketplace é apresentado como tentativa de concentrar a descoberta, a documentação e o reuso de APIs. A iniciativa de busca apoiada por IA reforça essa direção.

---

## 21. O que a reunião não permite concluir

A transcrição não permite afirmar com segurança:

1. Qual é a tecnologia ou linguagem de implementação de TRON, API Edge, API Business ou da biblioteca de mapeamento.
2. Qual protocolo de integração é utilizado nas APIs.
3. Como a pré-configuração é armazenada, versionada, aprovada ou auditada.
4. Quais mecanismos exatos de autorização são aplicados no Gateway.
5. Se Azure AD é o mecanismo padrão ou apenas um exemplo de autenticação.
6. Qual é o significado exato de siglas como “AMA”, “PDETRON”, “P2060”, “P2020”, “SIM” e “SIMS”.
7. Se “Neutron” é um nome formal de domínio, terminologia interna, produto ou erro parcial de transcrição.
8. Quais campos são obrigatórios para cada ramo de emissão.
9. Quais operações compõem integralmente as cerca de 600 APIs técnicas e mais de 300 APIs de negócio.
10. Quais países utilizam API Business, API Edge ou APIs de canal em produção para cada processo.
11. Quais controles regulatórios específicos foram implementados na República Dominicana.
12. Qual é o prazo para o buscador do Marketplace ou para as capacidades de IA mencionadas.
13. Se há um roadmap formal de migração de países para API Business.
14. Quais são os critérios formais para decidir entre integração direta com API Edge e uso de API Business.
15. Quais são os SLAs, custos, limites de consumo, políticas de suporte e responsabilidades operacionais.
16. Como são tratados dados pessoais, consentimento, retenção, criptografia e auditoria.
17. Quais são os processos de testes, homologação, publicação e descontinuação de APIs.

---

## 22. Conclusões

A reunião apresentou uma arquitetura de integração voltada a tornar capacidades do core TRON mais acessíveis a canais externos, sem obrigá-los a conhecer integralmente a estrutura técnica interna do sistema.

O elemento mais relevante do modelo é a combinação de:

- APIs de negócio;
- APIs específicas de canal;
- biblioteca de mapeamento;
- pré-configuração por usuário/canal;
- autenticação centralizada no API Gateway;
- catálogo corporativo de APIs no Marketplace.

A proposta busca reduzir duplicidade de desenvolvimento, diminuir a complexidade para integradores e preservar controles de autorização e contexto comercial. Ao mesmo tempo, reconhece a necessidade de extensões locais e de contratos específicos por país ou produto.

A maturidade do modelo, conforme descrito, ainda depende de evolução em três frentes: melhoria da documentação, descoberta mais eficiente das operações disponíveis e apoio técnico aos países quando houver necessidades concretas de implementação.
