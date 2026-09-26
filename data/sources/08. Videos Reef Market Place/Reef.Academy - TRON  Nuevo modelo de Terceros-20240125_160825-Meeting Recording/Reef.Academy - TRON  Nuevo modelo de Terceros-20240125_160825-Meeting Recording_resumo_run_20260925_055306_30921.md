# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.Academy - TRON  Nuevo modelo de Terceros-20240125_160825-Meeting Recording.mp4`
**Data de processamento:** 25/09/2026 05:56:52
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Análise estruturada — evolução do modelo de dados de terceiros em TRON / Neutron

## 1. Síntese executiva

A reunião foi uma sessão de formação funcional e técnica sobre a evolução do **modelo de dados de terceiros** no ecossistema TRON, com foco nos registros de **assegurados**. O objetivo não foi apresentar uma linha do tempo detalhada da evolução, mas explicar as diferenças entre o modelo associado ao “TRON Web” e o novo modelo disponível em “Neutron” — nomes preservados conforme registrados na transcrição.

A principal motivação apresentada foi enriquecer e flexibilizar o cadastro de terceiros, especialmente para suportar necessidades relacionadas a marketing, prevenção a fraude, controles de branqueamento de capitais, identificação unívoca em múltiplas aplicações, qualidade de dados, auditoria e particularidades regulatórias locais.

O novo modelo mantém parte das estruturas antigas, mas introduz tabelas específicas e estruturas de múltiplos registros para informações antes limitadas, principalmente:

- endereços;
- contatos;
- meios de cobrança e pagamento;
- relações com pessoas politicamente expostas;
- histórico de alterações.

A sessão foi deliberadamente centrada no **modelo de dados**, e não na operação completa das telas. O instrutor reforçou diversas vezes que os campos, validações, obrigatoriedades e usos efetivos dependem de configuração e decisão local de cada entidade/país, embora o núcleo disponibilize capacidades comuns.

A apresentação não foi concluída na reunião. Foram discutidas principalmente as tabelas de atividade do terceiro, dados fixos, estruturas legadas de assegurados e as novas tabelas de pessoas politicamente expostas, direções e contatos. A parte de meios de cobrança/pagamento ficou pendente para uma próxima sessão.

---

## 2. Contexto e antecedentes

### 2.1. Contexto da formação

A reunião foi apresentada como parte de um conjunto mais amplo de documentação e capacitação sobre módulos do sistema. O instrutor menciona um portal de documentação — transcrito como “RIF”; há indícios visuais de uma aba denominada “DOCUMENTACIÓN REEF”, portanto o nome exato do portal não pode ser determinado com segurança.

Dentro da documentação do módulo de terceiros, foram mencionados conteúdos relacionados a:

- processos batch;
- operação de cadastro ou tratamento de terceiros;
- definições específicas por atividade;
- elementos comuns a diferentes tipos de terceiros;
- operações relacionadas às pessoas;
- modelo de dados.

A sessão teve natureza híbrida:

- **funcional**, porque explica o significado e a finalidade dos dados;
- **técnica**, porque utiliza diagramas de banco de dados, entidades, atributos, chaves e relacionamentos.

O próprio apresentador reconhece que o tema poderia ser denso e abstrato para pessoas fora das áreas de tecnologia.

### 2.2. Escopo efetivo

O escopo foi restrito ao cadastro de terceiros na atividade de **assegurados**, identificada como “atividade 1” no discurso. Foi destacado, porém, que o modelo de terceiros é compartilhado por outras atividades e tipos de terceiros.

O navegador exibido durante a reunião reforça esse contexto. O menu do diagrama navegável do sistema TRON inclui as categorias:

- Asegurados;
- Agentes;
- Comunes;
- Supervisores;
- Tramitadores;
- Aseguradoras;
- Reaseguradoras;
- Brokers;
- Empleados Agente;
- Proveedores.

A análise apresentada se concentrou em **Asegurados**, sem significar que o restante do modelo esteja limitado a esse tipo de terceiro.

### 2.3. Convivência entre modelos

Um dos pontos centrais foi a possibilidade de coexistência de modelos distintos entre entidades.

O instrutor explicou que diferentes países ou instalações podem operar em condições diferentes: algumas entidades podem ainda utilizar o modelo anterior, enquanto outras, em contextos de implantação ou projetos novos, podem utilizar o novo modelo de terceiros.

Foram citados exemplos de países ou entidades, mas a transcrição contém ruído relevante nesses trechos. É possível identificar referências aparentes a Porto Rico, Panamá e Uruguai, mas não é seguro registrar detalhes de implantação por país como fatos confirmados.

A lógica apresentada é:

```text
Modelo anterior em determinadas instalações
+
Novo modelo de terceiros em outras instalações
↓
Convivência corporativa entre modelos
↓
Comportamento parametrizado por entidade/companhia
```

Segundo a explicação, a configuração da companhia pode indicar se o novo modelo de terceiros está ativo. A partir disso, o sistema pode adaptar a forma como os dados aparecem e são tratados nos front-ends.

---

## 3. Problemas identificados

## 3.1. Limitações de cardinalidade no modelo anterior

O problema mais claro foi a limitação de registros para certos tipos de informação.

### Endereços

No modelo antigo, o terceiro estaria limitado a, no máximo, três endereços:

- endereço principal;
- endereço comercial;
- um terceiro endereço complementar.

No novo modelo, a apresentação indica suporte a múltiplos endereços, sem que tenha sido informado um limite numérico específico.

### Contatos

No modelo anterior, haveria limitação a um único contato. O novo modelo introduz uma estrutura específica de contatos com múltiplos registros.

### Meios de cobrança/pagamento

O modelo antigo foi descrito como limitado inicialmente a uma única conta bancária. O instrutor afirma que houve evolução intermediária para permitir múltiplas contas, mas que o novo modelo desloca essa informação para uma tabela específica de meios de cobrança/pagamento, oferecendo mais flexibilidade.

### Relações e informações complementares

O novo modelo amplia a possibilidade de registrar:

- relações com pessoas politicamente expostas;
- dados de verificação documental;
- endereços fora do país da entidade;
- geolocalização por latitude e longitude;
- contatos múltiplos com finalidades distintas;
- histórico de modificações.

---

## 3.2. Necessidade de enriquecer a informação de terceiros

O instrutor relaciona a evolução do modelo à necessidade de complementar e enriquecer os dados dos terceiros.

Os usos citados incluem:

- marketing e mercadotecnia;
- prevenção a fraude;
- branqueamento de capitais;
- controles regulatórios;
- comunicação com clientes;
- identificação consistente em múltiplos sistemas;
- auditoria sobre inclusão e alteração de dados.

A apresentação indica que o cadastro de terceiros deixa de ser apenas um repositório operacional mínimo e passa a suportar múltiplas necessidades de negócio, controle e conformidade.

---

## 3.3. Fragmentação da identidade do terceiro

Foi apresentado o risco de uma mesma pessoa existir no sistema com vários documentos identificadores, por exemplo:

- passaporte;
- documento nacional;
- identificação fiscal;
- outros documentos aceitos localmente.

O instrutor utilizou o exemplo de uma pessoa identificada por quatro documentos diferentes, mas que deve continuar sendo um único cliente para a organização.

A necessidade identificada é distinguir:

1. o identificador do terceiro dentro do universo TRON;
2. uma chave corporativa que permita identificar a mesma pessoa de maneira unívoca entre aplicações diferentes.

---

## 3.4. Exigências regulatórias e diferenças locais

A reunião evidencia que o sistema precisa acomodar obrigações que variam por país, entidade, regulador e processo operacional.

Foram citados, entre outros:

- documentos de identificação;
- verificação documental;
- obrigações fiscais em outros países;
- pessoas politicamente expostas;
- comunicação de informações ao regulador;
- classificação de atividade econômica;
- estruturas geográficas;
- identificação de contatos de referência em pessoas jurídicas;
- requisitos ligados a prevenção a lavagem/branqueamento de capitais.

A solução não foi apresentada como uma regra única e automaticamente aplicada a todos os países. Ao contrário, a disponibilidade do campo não implica que o país já possua processo, política ou integração para utilizá-lo.

---

## 4. Solução apresentada

A solução apresentada é uma evolução do modelo de dados de terceiros, com foco em maior capacidade de registro, parametrização, integração e rastreabilidade.

O modelo combina três ideias principais:

```text
Reutilização de estruturas existentes
+
Novas tabelas especializadas
+
Configuração e uso local
```

### 4.1. Reutilização

Parte das tabelas antigas permanece compartilhada entre o modelo anterior e o novo. A transição, portanto, não foi descrita como substituição integral e imediata de todas as estruturas.

### 4.2. Especialização

As informações que no modelo anterior estavam concentradas ou limitadas passam a ser suportadas em tabelas específicas, especialmente:

- endereços;
- contatos;
- pessoas politicamente expostas;
- meios de cobrança/pagamento.

### 4.3. Configuração local

O sistema permite parametrizar:

- se o novo modelo está ativo em determinada instalação;
- obrigatoriedade de dados;
- validações por tipo de pessoa;
- validações por tipo de terceiro;
- expressões regulares para melhorar a qualidade dos dados;
- catálogos locais;
- comportamentos de front-end.

A apresentação deixa claro que os campos podem existir no modelo, mas seu uso concreto depende de decisões locais de negócio, operação, compliance e tecnologia.

---

## 5. Arquitetura e funcionamento lógico

> A representação abaixo é uma consolidação analítica baseada na explicação e nas evidências visuais. Não foi apresentada como diagrama arquitetural literal durante a reunião.

```text
Front-end / operação de cadastro de terceiros
↓
Validações conforme:
- tipo de terceiro;
- pessoa física ou jurídica;
- parametrização local;
- catálogos e expressões regulares;
↓
Módulo de terceiros / atividade de assegurados
↓
Modelo de dados TRON / Neutron
├── dados fixos do terceiro;
├── atividades do terceiro;
├── estruturas legadas compartilhadas;
├── direções múltiplas;
├── contatos múltiplos;
├── relações com pessoas politicamente expostas;
├── meios de cobrança e pagamento;
└── histórico e auditoria;
↓
Uso por outros módulos e aplicações da companhia
```

## 5.1. Princípios de funcionamento identificados

### Identificação por chaves compostas

Diversas tabelas utilizam como elementos identificadores:

- companhia;
- tipo de documento;
- código do documento;
- atividade do terceiro;
- sequências ou chaves adicionais.

As evidências visuais confirmam, por exemplo, que as tabelas `A1001390` e `A1001399` utilizam `COD_CIA`, `TIP_DOCUM` e `COD_DOCUM` como parte de suas chaves primárias.

### Diferenciação entre pessoa física e jurídica

A captura, validação e utilidade de determinados atributos depende de o terceiro ser pessoa física ou pessoa jurídica.

Exemplos apresentados:

| Tema | Pessoa física | Pessoa jurídica |
|---|---|---|
| Nome | Nome, sobrenomes, nomes compostos, apelido | Razão/identificação societária, conforme o modelo |
| Dados pessoais | estado civil, nacionalidade, profissão, ocupação, nascimento | constituição, tipo societário, perfis financeiros |
| Contatos | familiares, amigos, contatos pessoais | diretor financeiro, operações, comercial, departamento |
| Dados fiscais | pode haver obrigações fiscais internacionais | pode haver obrigações fiscais e atividade econômica |
| Relação com PEP | identificação própria ou relação com PEP | não foi detalhado de forma equivalente |

### Validação no front-end e/ou na base

A informação seria armazenada conforme validações realizadas:

- no front-end;
- ou em procedimentos de banco de dados.

Não foram detalhados os procedimentos técnicos, a tecnologia do front-end, o SGBD efetivamente utilizado em produção ou a implementação de tais validações.

### Histórico e exclusão lógica

A reunião reforça que as alterações não seriam removidas fisicamente em determinadas tabelas do novo modelo.

O comportamento descrito é:

```text
Registro criado
↓
Registro alterado ou desabilitado
↓
Registro preservado para histórico
↓
Rastreabilidade de mudanças e auditoria
```

A exclusão lógica é especialmente enfatizada para direções e contatos.

---

## 6. Componentes e estruturas mencionados

## 6.1. Diagrama navegável de TRON

As evidências visuais mostram o uso de uma documentação navegável, aparentemente produzida com **erwin Report Designer**.

Foram visualizados:

- um diagrama principal de `TRN TERCEROS`;
- a categoria `ASEGURADOS`;
- visualizações nos formatos `Diagram`, `Tabular` e `Hierarchical`;
- tabelas e campos com chaves, comentários, nulidade e tipos de dado.

Isso demonstra que a formação utiliza documentação técnica do modelo de dados como apoio para explicar os conceitos funcionais.

---

## 6.2. Tabela A1001390 — atividades de um terceiro

A evidência visual identifica a tabela `A1001390` com o comentário:

> “ACTIVIDADES DE UN TERCERO”

Os campos visíveis incluem:

| Campo | Papel indicado | Significado descrito |
|---|---|---|
| `COD_CIA` | Chave primária | Companhia |
| `TIP_DOCUM` | Chave primária | Tipo de documento identificador |
| `COD_DOCUM` | Chave primária | Documento identificador |
| `COD_ACT_TERCERO` | Chave primária | Classificação da atividade do terceiro |
| `COD_USR` | Não-chave | Usuário que registra ou atualiza |
| `FEC_ACTU` | Não-chave | Data de captura ou atualização |
| `COD_TERCERO` | Não-chave | Chave interna do terceiro |
| `TIP_DOCUM_PADRE` | Não-chave | Tipo de documento principal |
| `COD_DOCUM_PADRE` | Não-chave | Documento principal |

### Finalidade explicada

A tabela foi apresentada como estrutura para identificar a atividade do terceiro por companhia e documento.

O `COD_TERCERO` foi explicado como uma chave interna que pode ser atribuída manual ou automaticamente, dependendo da atividade e de regras do sistema.

Os campos de documento “pai” permitem associar diferentes documentos de uma mesma pessoa a uma identificação principal. Assim, diversos documentos podem corresponder a uma única entidade lógica.

### Limite de interpretação

A reunião não detalha:

- o algoritmo de atribuição do `COD_TERCERO`;
- em quais cenários ele é manual ou automático;
- o mecanismo de deduplicação entre documentos;
- regras de conflito quando documentos apontam para pessoas diferentes;
- integrações responsáveis por consolidar a identidade.

---

## 6.3. Tabela A1001399 — dados fixos do terceiro

A evidência visual identifica a tabela `A1001399` com o comentário:

> “DATOS FIJOS DE TERCERO”

Entre os campos visíveis estão:

| Campo | Descrição observada |
|---|---|
| `COD_CIA` | Companhia |
| `TIP_DOCUM` | Tipo de documento |
| `COD_DOCUM` | Código do documento |
| `MCA_FISICO` | Indica pessoa física ou jurídica |
| `APE1_TERCERO` | Primeiro sobrenome |
| `APE2_TERCERO` | Segundo sobrenome |
| `NOM_TERCERO` | Nome do terceiro |
| `COD_USR` | Usuário que registrou/atualizou |
| `FEC_ACTU` | Data de atualização |
| `COD_SOC_GL` | Identificador societário, conforme explicação oral |
| `TLF_MOVIL` | Telefone móvel |
| `NOM_ALIAS` | Apelido/alias |
| `NOM2_TERCERO` | Segundo ou sucessivo nome |
| `TIP_SUFIJO_NOMBRE` | Sufixo do nome |
| `TIP_PREFIJO_NOMBRE` | Prefixo/tratamento |
| `IDN_THP_VAL` | Identificador único entre aplicações, conforme explicação |
| `MCA_PERS_EXP_POLITICA` | Marca de pessoa politicamente exposta |
| `FEC_EMISION_DOCUM` | Data de emissão do documento |
| `FEC_CADUCIDAD_DOCUM` | Data de vencimento do documento |
| `COD_PAIS_DOCUM` | País de emissão do documento |
| `MCA_DOCUM_COMPROBADO` | Marca de documento verificado |
| `FEC_DOCUM_COMPROBADO` | Data da verificação |
| `OBS_METODO_COMPROBADO` | Observação sobre método de verificação |
| `COD_VERIFICADOR_DOCUM` | Identificador de quem verificou |
| `COD_REG_FISCAL` | Regime fiscal |
| `MCA_CUENTA_PROPIA` | Marca relacionada a conta própria |
| `TXT_FOLIO_REGISTRAL` | Folio de registro |
| `FEC_CONSTITUCION` | Data de constituição |
| `COD_EST_CIVIL` | Estado civil |
| `TIP_NACIONALIDAD` | Tipo de nacionalidade |
| `COD_NACIONALIDAD` | Nacionalidade |
| `COD_PROFESION` | Profissão |
| `COD_OCUPACION` | Ocupação |
| `COD_IDIOMA` | Idioma |
| `COD_PAIS_NACIMIENTO` | País de nascimento |
| `COD_ESTADO_NACIMIENTO` | Estado de nascimento |
| `COD_PROV_NACIMIENTO` | Província de nascimento |
| `COD_LOCALIDAD_NACIMIENTO` | Localidade de nascimento |
| `FEC_NACIMIENTO` | Data de nascimento |
| `COD_PERFIL_FINAN_ACT_PPAL` | Perfil financeiro de atividade principal |
| `COD_PERFIL_FINAN_OTRAS_ACT` | Perfil financeiro de outras atividades |
| `MCA_OBL_FISCAL_OTROS_PAISES` | Marca de obrigações fiscais em outros países |
| `COD_TIP_SOC` | Tipo societário |
| `MCA_SEXO` | Marca de sexo/gênero, conforme modelo atual |
| `TIP_ACT_ECONOMICA` | Tipo de atividade econômica |
| `COD_ACT_ECONOMICA` | Código de atividade econômica |

---

## 6.4. Chave de identificação corporativa do terceiro

Um campo transcrito como `IDN_THP_VAL` foi descrito pelo instrutor como uma chave que permite identificar o terceiro de forma única e inequívoca em diferentes aplicações da companhia.

O exemplo conceitual foi:

```text
Uma mesma pessoa
↓
TRON Web / Neutron / CRM / outros sistemas
↓
Mesmo identificador corporativo
```

A diferença estabelecida foi:

| Identificador | Uso explicado |
|---|---|
| Código interno do terceiro | Identificação no universo TRON |
| Chave corporativa unívoca | Identificação do terceiro entre várias aplicações e processos da companhia |

A transcrição não permite confirmar o nome técnico exato do campo ou da chave. O código acima foi extraído do OCR da tela, enquanto a fala contém ruído.

---

## 6.5. Dados documentais e verificação

O modelo contempla dados ligados ao documento identificador do terceiro, incluindo:

- data de emissão;
- data de vencimento;
- país de emissão;
- indicação de que o documento foi comprovado;
- data de comprovação;
- método de comprovação;
- pessoa ou código responsável pela verificação.

A marca de documento comprovado não executa, por si só, um processo de negócio. Ela registra que a verificação ocorreu. A companhia local precisa definir:

- quem verifica;
- em que processo;
- de que forma;
- quais consequências decorrem de um documento não verificado;
- quais integrações ou fontes públicas podem ser utilizadas.

Foi mencionado que alguns países podem dispor de fontes ou registros públicos para auxiliar a validação, mas não foram identificados países, integrações ou mecanismos concretos.

---

## 6.6. Dados pessoais e societários

A tabela de dados fixos cobre atributos diferentes conforme a natureza do terceiro.

### Para pessoa física

Foram mencionados:

- primeiro e segundo sobrenomes;
- nomes compostos;
- alias ou apelido;
- prefixo de tratamento;
- sufixo de nome;
- estado civil;
- nacionalidade;
- profissão;
- ocupação;
- idioma preferencial;
- país, estado, província e localidade de nascimento;
- data de nascimento;
- marca de sexo/gênero.

O instrutor observa que a marca disponível no modelo distingue masculino e feminino e reconhece que essa estrutura está “um pouco antiga”, mas é o que existe no momento descrito.

### Para pessoa jurídica

Foram mencionados:

- identificador societário;
- data de constituição;
- folio ou registro de constituição;
- tipo societário;
- perfis financeiros de atividade principal e secundária;
- regime fiscal;
- atividade econômica;
- obrigações fiscais em outros países.

A utilização depende de disponibilidade da informação e de definição local.

---

## 6.7. Pessoas politicamente expostas

O novo modelo incorpora uma estrutura para identificar:

1. se o próprio terceiro é uma pessoa politicamente exposta;
2. se o terceiro mantém relação com outra pessoa politicamente exposta.

O modelo permite registrar, segundo a apresentação:

- identificação da pessoa relacionada;
- tipo de documento;
- código do documento;
- tipo da relação;
- indicação de que é familiar ou colaborador;
- data de início de vigência;
- data de término ou desativação da relação.

O apresentador ressalta que o sistema disponibiliza a capacidade de identificação, mas não decide automaticamente o que a companhia deve fazer a partir dela.

A lógica apresentada é:

```text
Capacidade técnica de identificar PEP
↓
Definição local de controles e procedimentos
↓
Uso por negócio, compliance ou áreas adequadas
```

### Limite importante

Não foram detalhados:

- critérios legais para classificação de PEP;
- fonte de dados utilizada;
- periodicidade de atualização;
- fluxo de aprovação;
- bloqueios automáticos;
- integração com listas externas;
- retenção de evidências.

---

## 6.8. Estrutura de direções no novo modelo

A nova tabela de direções foi apresentada como um dos avanços mais relevantes.

### Capacidades mencionadas

- múltiplos endereços por terceiro;
- sequência criada automaticamente;
- identificação do uso do endereço;
- data de vigência;
- indicação de endereço padrão;
- indicação de endereço fiscal;
- verificação de endereço;
- desabilitação lógica;
- histórico;
- suporte a endereço fora do país;
- latitude e longitude;
- dados de auditoria.

### Sequência automática

Cada direção possui uma sequência de registro gerada automaticamente. A ideia é evitar que o usuário precise controlar manualmente números como “1”, “2” ou “3”.

### Uso do endereço

O endereço pode ser classificado conforme sua finalidade, como:

- residência;
- segunda residência;
- comercial;
- correspondência.

A transcrição não fornece uma lista completa de valores válidos.

### Endereços nacionais e estrangeiros

Para endereços no país da entidade, o sistema pode utilizar a estrutura geográfica cadastrada, com níveis como:

- país;
- estado;
- província;
- localidade;
- código postal.

Quando o endereço estiver em outro país, a reunião indica que pode haver captura complementar sem depender da estrutura geográfica local previamente carregada.

Foi citado um exemplo de cliente segurado no México cuja correspondência deveria ser enviada para Corpus Christi, nos Estados Unidos.

### Latitude e longitude

Os campos de latitude e longitude são apresentados como novidades em relação ao modelo anterior. O instrutor não impõe um caso de uso obrigatório; a exploração desses dados dependeria de decisão local.

### Endereço padrão e fiscal

Entre múltiplos endereços, pode-se definir:

- o endereço padrão exibido pelo sistema;
- o endereço fiscal utilizado para fins legais, fiscais, sinistros ou comunicações formais relacionadas, por exemplo, a inadimplência.

### Histórico e exclusão lógica

A mudança de endereço não implica remoção física do registro. O modelo preserva histórico por meio de campos associados a temporalidade e versionamento do registro.

---

## 6.9. Estrutura de contatos no novo modelo

A tabela de contatos também foi apresentada como uma estrutura de múltiplos registros.

### Finalidade

Registrar formas de contato e pessoas relacionadas ao terceiro, adaptando-se à natureza de pessoa física ou jurídica.

### Para pessoa física

O modelo pode registrar, conforme permitido e disponível:

- contatos familiares;
- amigos;
- outras relações pessoais;
- nome da pessoa de contato;
- documento do contato;
- meio de contato;
- indicação de contato prioritário;
- observações sobre a relação.

O instrutor ressalta que as informações devem ser obtidas de maneira adequada. Ele menciona, de forma condicional, que dados públicos ou redes sociais poderiam ser considerados apenas se a obtenção e o uso forem permitidos, sem detalhar regras de privacidade ou bases legais.

### Para pessoa jurídica

O modelo pode registrar contatos organizacionais, como:

- diretor financeiro;
- diretor de operações;
- diretor comercial;
- contatos ligados a determinados departamentos;
- contato de referência para determinadas comunicações.

Também pode registrar:

- cargo;
- departamento;
- tipo de meio de contato;
- valor do contato;
- prioridade;
- validação;
- observações;
- histórico.

### Tipo e valor do meio de contato

A reunião distingue:

- **tipo do meio de contato**: e-mail, telefone fixo, telefone móvel, fax, página web ou outro tipo configurado;
- **valor do meio de contato**: o valor efetivo correspondente, como endereço de e-mail ou número de telefone.

Esse ponto foi esclarecido de forma explícita em pergunta e resposta.

### Contato de referência para prevenção a lavagem de dinheiro

Para pessoas jurídicas, desde que a prevenção a branqueamento de capitais esteja ativa, o modelo pode indicar um contato de referência que deve receber determinadas comunicações formais.

O exemplo dado envolve uma empresa com diversos contatos, como diretor financeiro, comercial e de compliance. Um deles poderia ser marcado como destinatário de comunicações relacionadas a exigências legais ou controles de lavagem/branqueamento de capitais.

---

## 6.10. Estruturas legadas de assegurados

O instrutor menciona que, no modelo anterior, as informações dos assegurados estavam concentradas aproximadamente em cinco tabelas, incluindo:

- atividade do terceiro;
- dados do terceiro;
- dados do assegurado;
- informações sobre pessoas não desejadas ou inabilitadas para determinadas operações;
- multicontas.

Os nomes técnicos completos dessas cinco tabelas não foram fornecidos de forma confiável na transcrição.

Foi enfatizado que as tabelas antigas podem continuar existindo e sendo compartilhadas, mas o novo modelo não utiliza necessariamente todas as informações nelas armazenadas.

---

## 7. Modelo de integração

## 7.1. Integração entre módulos

O instrutor descreve o sistema como integrado entre módulos. A existência de certos campos no modelo de terceiros é conhecida por outras áreas funcionais, como:

- emissão;
- gestão de clientes;
- outros módulos do sistema.

O exemplo citado é a verificação documental: a informação de que um documento foi ou não verificado pode ser relevante para processos de emissão ou outros controles, desde que a companhia configure regras para utilizá-la.

## 7.2. Integração entre aplicações

A chave corporativa unívoca foi apresentada como mecanismo para assegurar que o mesmo terceiro seja reconhecido em sistemas distintos, tais como:

- TRON Web;
- Neutron;
- CRM;
- outras aplicações da companhia.

Não foi informado:

- se a integração ocorre por API;
- se há mensageria;
- se há replicação de banco;
- se há barramento corporativo;
- se existe MDM;
- quais sistemas efetivamente consomem ou produzem essa chave.

## 7.3. Integração com catálogos e estruturas comuns

Vários atributos dependem de catálogos ou estruturas comuns, incluindo:

- documentos;
- tipos societários;
- atividades econômicas;
- níveis geográficos;
- departamentos;
- nacionalidades;
- estados civis;
- tipos de vias;
- usos de endereço;
- tipos de contato.

A qualidade da informação depende da configuração adequada desses catálogos antes da operação.

---

## 8. Modelo operacional

## 8.1. Captura e atualização

A apresentação indica que os dados podem ser capturados ou atualizados por usuários, com registro de:

- usuário responsável;
- data de captura ou atualização;
- comentários ou observações;
- status de validação;
- data de validade;
- data de desativação, quando aplicável.

Os campos `COD_USR` e `FEC_ACTU`, observados nas tabelas, reforçam a preocupação com rastreabilidade.

## 8.2. Validações

As validações podem ser influenciadas por:

- tipo de terceiro;
- tipo de pessoa: física ou jurídica;
- documentos aceitos;
- obrigatoriedade definida pela companhia;
- expressões regulares;
- catálogos configurados;
- estrutura geográfica;
- procedimentos locais.

O instrutor cita explicitamente o uso de expressões regulares no novo modelo para validar e melhorar a qualidade dos dados em front-end.

## 8.3. Auditoria

A rastreabilidade é tratada como requisito importante. A combinação de usuário, data de atualização, histórico e exclusão lógica permite saber, em tese:

- quem alterou;
- quando alterou;
- o que foi mantido em histórico;
- qual informação estava ativa ou desabilitada.

Não foram apresentados relatórios, trilhas de auditoria, mecanismos de retenção ou controles de acesso específicos.

---

## 9. Governança e responsabilidades

## 9.1. Responsabilidade do núcleo versus responsabilidade local

A reunião diferencia nitidamente dois níveis de responsabilidade:

| Nível | Responsabilidade apresentada |
|---|---|
| Núcleo do sistema | Disponibilizar campos, estruturas, validações e capacidades |
| Companhia/país | Decidir políticas, procedimentos, obrigatoriedades, controles e uso operacional |

Essa distinção aparece diversas vezes, especialmente em temas como:

- verificação de documentos;
- pessoas politicamente expostas;
- controles anti-fraude;
- branqueamento de capitais;
- obrigação fiscal internacional;
- uso de geolocalização;
- classificação de qualidade;
- comunicação com contatos empresariais.

## 9.2. Governança de dados

Embora não tenha sido apresentado um modelo formal de governança, a reunião sugere preocupação com:

- qualidade;
- padronização;
- reutilização;
- rastreabilidade;
- controles locais;
- aderência a requisitos regulatórios.

Uma leitura analítica possível é que o modelo busca equilibrar uma base corporativa comum com autonomia local de configuração.

---

## 10. Casos e exemplos concretos

## 10.1. Uma pessoa com vários documentos

Foi dado o exemplo de uma pessoa que pode ser identificada no sistema por vários documentos, como passaporte, documento nacional, identificação fiscal ou outro identificador local.

O objetivo é evitar que esses documentos sejam tratados como pessoas diferentes quando representam o mesmo terceiro.

## 10.2. Endereço de correspondência em outro país

Foi usado o exemplo de uma pessoa segurada no México que deseja receber documentos em Corpus Christi, nos Estados Unidos.

O exemplo demonstra que o novo modelo busca acomodar endereços externos sem exigir que toda a estrutura geográfica estrangeira esteja cadastrada como parte da estrutura local da companhia.

## 10.3. Atividade econômica com mais de cem categorias

Uma participante relatou que o regulador exigiria uma classificação de atividade econômica com mais de cem códigos e questionou se o campo suportaria isso.

A resposta foi que houve confusão entre:

- tipo de atividade econômica;
- código de atividade econômica.

Segundo a explicação:

- o tipo de atividade econômica é um código numérico de dois dígitos;
- o código de atividade econômica é um campo alfanumérico de até quinze caracteres.

O instrutor afirmou que, se houver necessidade de evolução, ela pode ser avaliada com a equipe de desenvolvimento, mas considerou que o exemplo provavelmente já seria suportado pelo campo de código.

## 10.4. Contatos distintos em uma pessoa jurídica

Foi apresentado o exemplo de uma empresa — citada como “Repsol” ou nome semelhante — com necessidades diferentes:

- um e-mail do departamento financeiro para pagamento de prêmios;
- um contato de recursos humanos para sinistros relacionados, por exemplo, a acidentes de trabalho.

A resposta foi que a pessoa jurídica teria ao menos dois contatos, cada um com:

- uso ou finalidade distinta;
- tipo de meio de contato;
- valor correspondente, como e-mail ou telefone.

---

## 11. Perguntas e respostas relevantes

## 11.1. Classificação de atividade econômica

### Pergunta

A participante questionou se o código de atividade econômica, aparentemente visualizado como numérico de dois dígitos, suportaria uma classificação regulatória com mais de cem opções.

### Resposta

O instrutor distinguiu o tipo de atividade econômica do código concreto de atividade econômica:

- o tipo seria uma classificação mais ampla;
- o código seria o campo específico, com capacidade alfanumérica de até quinze caracteres.

Também afirmou que o sistema pode evoluir com apoio da equipe de desenvolvimento se houver necessidade.

### O que essa resposta esclarece

A estrutura parece prever uma hierarquia entre classificação macro e código detalhado. Porém, a transcrição não fornece o catálogo padrão, os valores permitidos nem confirma a aderência a um regulador específico.

---

## 11.2. Controle técnico para pessoas politicamente expostas

### Pergunta

Foi perguntado se haveria algum controle técnico ou alguma funcionalidade central que tratasse automaticamente a identificação de pessoas politicamente expostas, considerando uma situação local mencionada como Guatemala.

### Resposta

O instrutor respondeu que o núcleo permite identificar esse tipo de pessoa, mas que cabe à companhia utilizar os meios e as fontes apropriadas para determinar a classificação e tomar decisões.

### O que essa resposta esclarece

O sistema oferece capacidade de registro, mas não substitui o processo local de compliance, a consulta a fontes oficiais ou a tomada de decisão da entidade.

---

## 11.3. Local do e-mail ou telefone de um contato empresarial

### Pergunta

Foi perguntado onde registrar o e-mail de uma pessoa de recursos humanos vinculada a uma empresa, quando outro contato, como o departamento financeiro, é utilizado para pagamentos.

### Resposta

O instrutor explicou que devem existir contatos distintos, com finalidades distintas. O valor real do meio de contato deve ser registrado no campo correspondente:

- se o tipo for e-mail, o valor será o endereço eletrônico;
- se o tipo for telefone fixo, o valor será o número fixo;
- se o tipo for telefone móvel, o valor será o número móvel;
- se for página web, o valor será a URL ou referência correspondente.

### O que essa resposta esclarece

O modelo separa a identidade ou finalidade do contato do canal utilizado para contatá-lo, permitindo múltiplos contatos para uma mesma pessoa jurídica.

---

## 12. Roadmap e continuidade

A reunião não apresentou um roadmap de produto, datas de implantação ou cronograma corporativo detalhado.

O compromisso explícito foi realizar uma nova sessão para concluir a formação sobre o modelo de dados de terceiros.

A continuidade prevista incluiria, especialmente:

- conclusão dos temas não abordados;
- meios de cobrança e pagamento;
- demais tabelas do novo modelo;
- aprofundamento de capacidades de múltiplos registros.

Também foram mencionadas futuras formações relacionadas a módulos comuns e sinistros, mas sem datas definitivas. O instrutor corrigiu a referência inicial a “terça-feira seguinte” e afirmou que precisaria reagendar.

---

## 13. Números e indicadores citados

> Os números abaixo foram mencionados durante a reunião ou observados nas evidências visuais. Não representam indicadores auditados externamente.

| Indicador | Valor mencionado | Contexto |
|---|---:|---|
| Participantes adicionais observados | +16, +18, +31, +81 | Contadores em mosaicos de videoconferência capturados nos frames |
| Tabelas antigas de assegurados | Aproximadamente 5 | Estruturas mencionadas no modelo anterior |
| Endereços no modelo antigo | Até 3 | Principal, comercial e complementar |
| Contatos no modelo antigo | 1 | Limitação descrita pelo instrutor |
| Contas bancárias no modelo antigo | Inicialmente 1 | Posteriormente teria havido evolução para múltiplas contas |
| Colunas visíveis na tabela `A1001390` | 9 | Evidência OCR da tela tabular |
| Tipo de atividade econômica | 2 dígitos | Resposta do instrutor; provavelmente referente ao atributo de tipo, não ao código detalhado |
| Código de atividade econômica | Até 15 caracteres | Campo `VARCHAR2(15)` identificado na evidência visual |
| Textos auxiliares citados | 1 a 9 | O instrutor recomendou não utilizar os campos de 5 a 9, sem explicar integralmente a regra |

---

## 14. Limitações reconhecidas

## 14.1. O sistema disponibiliza campos, mas não define o processo

Diversos campos foram descritos como capacidades disponíveis, não como processos automaticamente resolvidos. Isso se aplica a:

- verificação de documento;
- classificação como pessoa politicamente exposta;
- comunicação com contatos de referência;
- tratamento de obrigações fiscais internacionais;
- uso de geolocalização;
- atualização de óbito;
- uso de qualidade ou agrupamento do terceiro.

## 14.2. Dependência de configuração local

A utilização efetiva depende de:

- definição da companhia;
- catálogo local;
- decisão de negócio;
- exigência regulatória;
- processo operacional;
- disponibilidade dos dados;
- implementação em cada país.

## 14.3. Dados não obrigatórios em todos os cenários

O instrutor afirma que nem toda informação é obrigatória no cadastro de um terceiro. Alguns campos podem ser capturados apenas quando a entidade possui o dado e decidiu utilizá-lo.

## 14.4. Limitações de qualidade da transcrição

A transcrição contém trechos incompletos, repetições e erros de reconhecimento de voz. Exemplos de termos cuja forma exata não pode ser garantida:

- “TRON Web”;
- “Neutron”;
- “RIF” ou “REEF”;
- nomes de módulos, tabelas e campos citados apenas oralmente;
- referências a países;
- termos como “trebles”, possivelmente relacionados a um mecanismo de pagamento, mas não identificável com segurança.

Sempre que possível, esta análise utiliza nomes confirmados pelo OCR das telas. Onde isso não foi possível, a incerteza foi preservada.

---

## 15. Riscos e desafios

## 15.1. Riscos explicitamente mencionados ou diretamente suportados

| Risco ou desafio | Evidência na reunião |
|---|---|
| Uso inadequado de campos disponíveis | O instrutor reforça que os campos não devem ser preenchidos sem finalidade ou processo definido |
| Dados de baixa qualidade | Foram citadas validações, expressões regulares, verificação de documentos e contatos |
| Inconsistência entre aplicações | A chave unívoca corporativa foi apresentada para evitar identificação divergente do mesmo terceiro |
| Limitação do modelo antigo | Endereços, contatos e meios de pagamento estavam limitados |
| Falta de atualização de dados | Foi citado o exemplo da data de falecimento sem processo interno que a mantenha atualizada |
| Configuração incorreta de catálogos | Vários dados dependem de catálogos locais e estruturas geográficas |
| Uso incorreto de campos de texto auxiliares | Foi pedido que determinados campos de texto não fossem utilizados |

## 15.2. Desafios derivados do contexto

> Esta seção contém interpretação analítica, não declarações literais dos participantes.

### Governança de dados mestres

A existência de múltiplos documentos para uma mesma pessoa e de uma chave corporativa entre sistemas indica um desafio de governança de identidade de cliente ou terceiro.

### Consistência regulatória entre países

Como o sistema atende entidades com necessidades locais distintas, a padronização de estruturas não elimina a necessidade de governar catálogos, regras, validações e processos por país.

### Adoção operacional

A evolução do modelo só produz benefício se usuários e áreas locais souberem:

- quais campos preencher;
- em quais processos;
- com que qualidade;
- sob quais regras;
- como manter os dados atualizados.

### Proteção de dados pessoais

A reunião trata de dados sensíveis ou potencialmente sensíveis, como documentos, nacionalidade, dados de nascimento, relações pessoais, informações fiscais e classificação de PEP. Embora a transcrição não tenha detalhado privacidade, LGPD, GDPR, IAM ou retenção, esses temas representam uma consideração relevante derivada do tipo de informação manipulada.

---

## 16. Transformações identificadas

> As transformações abaixo são leituras analíticas sustentadas pelo conteúdo da reunião.

## 16.1. De cadastro limitado para perfil ampliado de terceiro

O modelo anterior parece concentrar informações em estruturas mais rígidas e com menor cardinalidade. O novo modelo amplia a representação do terceiro como entidade rica, com:

- múltiplos endereços;
- múltiplos contatos;
- diferentes meios de pagamento;
- vínculos e relações;
- qualidade e verificação de dados;
- histórico.

```text
Cadastro operacional limitado
↓
Perfil de terceiro com múltiplas dimensões
```

## 16.2. De informação estática para informação auditável

A valorização de usuário, data de alteração, vigência, histórico e exclusão lógica demonstra uma mudança de foco para rastreabilidade e auditoria.

```text
Registro atual
↓
Registro atual + histórico de mudanças
↓
Maior capacidade de auditoria e investigação
```

## 16.3. De identificação local para identidade corporativa

A separação entre código interno do TRON e chave unívoca compartilhada entre aplicações indica uma direção de integração corporativa.

```text
Identificador válido no sistema local
↓
Identificador corporativo entre sistemas
```

## 16.4. De estrutura fixa para capacidades configuráveis

O novo modelo parece buscar uma arquitetura funcionalmente extensível por configuração, com catálogos, regras, obrigatoriedades e expressões regulares adaptáveis às entidades.

```text
Campos e regras rígidas
↓
Estruturas parametrizáveis por país ou companhia
```

---

## 17. Relações de causa e efeito reconstruídas

## 17.1. Múltiplos canais e necessidades de contato

```text
Um único contato ou endereço no modelo anterior
↓
Dificuldade para representar diferentes áreas, finalidades e canais
↓
Necessidade de múltiplos registros
↓
Tabelas específicas de contatos e direções
```

## 17.2. Necessidade de compliance e controle

```text
Exigências de prevenção a fraude, branqueamento de capitais e regulação
↓
Necessidade de identificar e verificar terceiros
↓
Campos para PEP, documentos, verificação e obrigações fiscais
↓
Uso condicionado a processos e decisões locais
```

## 17.3. Diversidade entre sistemas corporativos

```text
Um terceiro pode existir em vários sistemas
↓
Risco de identificação inconsistente
↓
Necessidade de uma chave unívoca corporativa
↓
Possibilidade de reconhecimento do mesmo terceiro entre aplicações
```

## 17.4. Necessidade de auditoria

```text
Dados de terceiros sofrem alterações ao longo do tempo
↓
Necessidade de saber quem alterou e quando
↓
Histórico, usuário de atualização e exclusão lógica
↓
Maior rastreabilidade operacional
```

---

## 18. O que a reunião não permite concluir

A reunião não fornece detalhe suficiente para afirmar com segurança:

- qual banco de dados é utilizado em produção, embora os tipos exibidos como `VARCHAR2`, `NUMBER` e `DATE` sejam compatíveis com convenções frequentemente associadas a Oracle;
- quais tecnologias compõem TRON Web ou Neutron;
- se Neutron é um novo front-end, um produto, uma plataforma ou uma evolução completa do core;
- como ocorre a integração técnica entre TRON, Neutron, CRM e demais aplicações;
- se existem APIs, eventos, mensageria, ETL, replicação ou acesso direto a banco;
- qual componente gera a chave corporativa unívoca;
- como ocorre a deduplicação de terceiros;
- quais controles de IAM, perfis ou segregação de funções existem;
- quais regras de retenção, privacidade, mascaramento ou proteção de dados pessoais são aplicadas;
- quais países efetivamente já utilizam o novo modelo;
- quais são os critérios legais completos para classificação de PEP;
- quais listas externas, bases públicas ou fontes regulatórias são integradas;
- quais campos são obrigatórios por país;
- quais são os limites máximos de direções, contatos ou meios de pagamento;
- quais relatórios e indicadores de qualidade de dados existem;
- como é realizado backup, recuperação de desastre ou continuidade operacional;
- qual é o SLA do sistema;
- quais ferramentas são usadas para deploy, versionamento, CI/CD, observabilidade ou monitoramento;
- em que momento a parte pendente do modelo de meios de cobrança/pagamento seria apresentada.

---

## 19. Conclusões

A reunião posiciona o novo modelo de terceiros como uma evolução funcional e estrutural do cadastro de assegurados e demais terceiros no ecossistema TRON / Neutron.

A mudança não foi apresentada apenas como criação de novas tabelas. Ela responde a limitações concretas do modelo anterior, principalmente a rigidez no tratamento de endereços, contatos e dados de cobrança/pagamento. Ao mesmo tempo, amplia a capacidade de atender necessidades de conformidade, qualidade de dados, auditoria e integração entre aplicações.

A principal mensagem é que o sistema oferece uma base de capacidades compartilhadas, mas não substitui a governança local. Cada entidade precisa definir como utilizar os campos, quais controles ativar, quais catálogos manter, que processos operar e quais obrigações regulatórias atender.

A sessão também evidencia que o modelo está em transição ou convivência: estruturas antigas continuam relevantes, enquanto novas tabelas trazem mais flexibilidade e maior granularidade. A adoção adequada depende de conhecimento técnico, entendimento funcional e decisões coordenadas entre tecnologia, negócio, operação e compliance.
