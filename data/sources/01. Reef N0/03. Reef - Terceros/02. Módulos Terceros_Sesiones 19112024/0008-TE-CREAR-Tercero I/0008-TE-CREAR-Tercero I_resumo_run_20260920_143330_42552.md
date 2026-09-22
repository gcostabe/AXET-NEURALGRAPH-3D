# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `0008-TE-CREAR-Tercero I.mp4`
**Data de processamento:** 20/09/2026 14:37:58
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada — Criação e gestão de terceiros no sistema

> **Base de rastreabilidade:** a transcrição não possui timestamps ou numeração de linhas. As afirmações abaixo foram organizadas exclusivamente a partir do conteúdo apresentado.  
> **Nota sobre terminologia:** a sessão mistura espanhol, português e termos técnicos. Alguns nomes parecem decorrentes de reconhecimento automático de voz — por exemplo, “Riscor”, “Neutron”, “NITH/NIF”, “RCC” e “homoclave”. Onde não há confirmação suficiente, a forma registrada foi preservada ou tratada com ressalva.

## 1. Síntese executiva

A reunião é um treinamento funcional sobre a operação de **criação de terceiros** em um sistema de seguros, aparentemente associado ao núcleo denominado na transcrição como “Riscor”. O conceito de “terceiro” abrange pessoas físicas e jurídicas que participam de processos do sistema, tais como segurados, clientes, beneficiários, tomadores, pagadores de prêmio, condutores, agentes, supervisores, peritos, tramitadores e outros papéis.

O foco da sessão não é a definição de tabelas de configuração, já apresentada em treinamentos anteriores, mas sua aplicação operacional: como cadastrar terceiros, como os dados são validados, como diferentes atividades utilizam uma base comum de informação e quais campos ou blocos variam conforme atividade, tipo de pessoa e regras locais.

A criação de um terceiro é apresentada como um processo baseado em até **nove blocos de informação compartilhados**. Esses blocos organizam informações como dados básicos, identificação, endereços, contatos, documentos alternativos, representantes legais, acionistas, condição de pessoa politicamente exposta e meios de cobrança e pagamento. Nem todos os blocos necessariamente estarão disponíveis para todas as atividades ou tipos de pessoa.

A mensagem central é que a flexibilidade do sistema possui limites: há comportamentos estruturais do núcleo que não podem ser alterados apenas por parametrização local. Ao mesmo tempo, há espaço para configurações, validações específicas e adequações por país. A apresentação reforça a necessidade de equilíbrio entre capturar muitos dados e garantir que tais dados tenham uso real, sejam confiáveis e possam ser explorados posteriormente.

---

## 2. Contexto e antecedentes

A sessão ocorre após módulos anteriores sobre:

- dados comuns;
- tabelas de configuração;
- atividades de terceiros;
- tipos de documento;
- catálogos geográficos;
- catálogos de idiomas;
- categorias;
- ocupações;
- atividades econômicas;
- níveis de estudos;
- parâmetros de instalação;
- permissões de usuários;
- menus e rotinas do sistema.

O instrutor descreve a evolução do treinamento como a montagem de um “edifício” composto por várias camadas de configuração e conceitos funcionais. A criação operacional de terceiros depende diretamente dessas definições anteriores: os dados que aparecem, as validações aplicadas e as listas de valores disponíveis derivam dos catálogos e parâmetros já configurados.

A transcrição também indica que o sistema precisa coexistir com realidades distintas entre países. Cada país pode estar em estágio diferente de adoção, configuração ou evolução funcional. Por isso, embora o núcleo forneça capacidades comuns, a parametrização local deve ser considerada conforme legislação, procedimentos e necessidades específicas de cada operação.

---

## 3. Problemas identificados

### 3.1 Risco de duplicidade de terceiros

Um dos problemas centrais é o risco de uma mesma pessoa existir no sistema em múltiplos registros, especialmente quando é cadastrada com documentos distintos.

Exemplo apresentado:

- uma mesma pessoa pode possuir DNI, NIF, passaporte ou outros documentos;
- se o sistema busca apenas por tipo e código de documento, uma pessoa cadastrada com um NIF pode não ser encontrada ao se pesquisar por um DNI;
- isso pode permitir a criação de registros distintos para a mesma pessoa.

A funcionalidade de **documento principal** é apresentada como mecanismo para relacionar documentos alternativos e reduzir esse risco. Ainda assim, a própria explicação reconhece que, no comportamento descrito, a validação de existência ocorre pelo conjunto de tipo de documento, chave/documento e código de terceiro quando aplicável. Portanto, sem o adequado relacionamento dos documentos, a duplicidade pode ocorrer.

### 3.2 Captura excessiva de dados sem uso posterior

O instrutor enfatiza repetidamente que o sistema permite capturar muitos atributos, mas questiona o sentido de coletá-los sem utilizá-los.

A preocupação é que:

- o cadastro se torne lento e oneroso;
- usuários ou canais preencham informações sem qualidade;
- campos obrigatórios levem à inserção de dados fictícios;
- dados não utilizados em processos, análises, comunicação ou regras de negócio gerem apenas custo e baixa confiabilidade.

A fala exemplifica esse risco com datas de vencimento de documentos: se um campo é obrigatório, mas a informação não está disponível, o usuário pode inserir uma data fictícia apenas para concluir o cadastro. Isso prejudica a qualidade do dado e reduz a utilidade posterior da informação.

### 3.3 Inconsistências entre configuração, descrição e uso

O ambiente demonstrado apresenta exemplos de dados aparentemente inconsistentes, como categorias ou regimes fiscais cuja descrição parece associada a pessoa jurídica, embora apareçam em um contexto de pessoa física.

O instrutor não confirma se isso é um defeito do produto ou uma inconsistência de configuração do ambiente de desenvolvimento. A recomendação implícita é verificar:

- como o catálogo foi configurado;
- se a marcação de uso para pessoa física ou jurídica está correta;
- se a descrição corresponde à finalidade efetiva do código;
- se a lista apresentada deveria estar disponível para aquela atividade ou tipo de pessoa.

### 3.4 Excesso de permissões operacionais

A rotina de terceiros pode atender diversas atividades e papéis. O instrutor alerta que não é adequado permitir que todos os usuários alterem qualquer tipo de terceiro indiscriminadamente.

A preocupação operacional é que áreas distintas da seguradora normalmente sejam responsáveis por grupos específicos, por exemplo:

- área comercial para agentes e intermediários;
- outras áreas para supervisores, peritos, tramitadores ou terceiros relacionados a sinistros;
- equipes centrais ou especializadas para manutenção de dados cadastrais.

O sistema dispõe de permissões por usuário e atividade, mas cabe à organização definir os controles adequados.

---

## 4. Solução apresentada

A solução apresentada é um modelo centralizado de cadastro e gestão de terceiros, organizado por:

1. **Código de atividade**;
2. **Tipo de documento**;
3. **Dados comuns de terceiro**;
4. **Dados específicos da atividade**;
5. **Regras configuráveis por país, companhia ou atividade**;
6. **Validações estruturais do núcleo**;
7. **Permissões de acesso e operação por usuário**.

O terceiro pode desempenhar diversos papéis no sistema, mas cada papel é tratado em função de uma atividade específica. O instrutor reforça que pessoa física e pessoa jurídica são, no contexto apresentado, categorias de terceiro, e não conceitos separados da entidade “terceiro”.

A criação de um segurado, por exemplo, é formada por duas camadas:

- uma camada comum: **criar terceiro**;
- uma camada específica: **criar segurado**.

O mesmo padrão se aplica a outras atividades, como agente, supervisor, terceiro genérico ou tramitador. A base cadastral é compartilhada, mas determinadas atividades exigem ou permitem informações específicas.

---

## 5. Arquitetura e funcionamento lógico

### 5.1 Modelo lógico consolidado

O desenho abaixo é uma consolidação analítica da explicação verbal; não foi apresentado como diagrama literal.

```text
Usuário autenticado
↓
Perfil, menu e permissões de atividade
↓
Rotina de terceiros
↓
Criação / consulta / modificação de terceiro
↓
Validação de atividade + documento + regras de configuração
↓
Blocos comuns de informação
↓
Dados específicos da atividade
↓
Histórico de alterações
↓
Uso posterior por processos de emissão, sinistros, notificações,
cobrança, pagamentos, consolidação e outros processos do sistema
```

### 5.2 Princípios funcionais destacados

- O terceiro é identificado e operado conforme um **código de atividade**.
- As atividades de núcleo possuem códigos numéricos de três posições, de `1` a `999`.
- Esses códigos de núcleo não podem ser livremente redefinidos, trocados ou duplicados por parametrização local.
- É possível particularizar comportamentos para atender legislação ou procedimentos locais, mas sem descaracterizar o significado central da atividade.
- As regras e validações aplicadas na operação on-line também devem ser aplicadas em cargas ou alterações por processamento batch.
- As configurações locais podem estabelecer obrigatoriedade e validações adicionais, mas não podem eliminar certas regras estruturais do núcleo.

### 5.3 On-line e batch

A transcrição afirma que a mesma lógica de validação deve ser respeitada nos dois modos de execução:

```text
Operação on-line
↓
Validações de cadastro e catálogos
↓
Criação ou alteração do terceiro

Carga ou manutenção batch
↓
As mesmas validações de cadastro e catálogos
↓
Retorno de erros equivalentes quando houver inconsistência
```

Exemplos mencionados:

- campo obrigatório configurado para determinada atividade;
- tentativa de informar um código de classificação que não existe no catálogo;
- necessidade de corrigir a carga e executá-la novamente após erro de validação.

A transcrição não detalha tecnologia de execução batch, fila, mecanismo de importação ou formato de arquivos.

---

## 6. Atividades de terceiros

### 6.1 Atividade 1: segurado e papéis correlatos

A atividade `1` é apresentada como aplicável a figuras como:

- segurado;
- cliente;
- beneficiário;
- tomador;
- pagador de prêmio;
- condutor;
- outros participantes da emissão de apólices.

O instrutor afirma que essas figuras de emissão utilizam a chave de atividade `1`.

Operações mencionadas:

- criar segurado;
- criar segurado tomando como base outro terceiro;
- modificar;
- consultar;
- gerar documentos do terceiro;
- identificar terceiro não desejado, em contexto posterior ainda não detalhado na sessão.

### 6.2 Outras atividades citadas

Foram mencionadas, sem detalhamento completo de suas regras:

- agente, associado à atividade `2`;
- terceiro genérico;
- supervisor;
- tramitador;
- perito;
- advogado;
- recuperador;
- ajustador.

A transcrição não permite mapear com segurança todos os códigos de atividade dessas figuras. O código `26` é citado como exemplo de “recuperador”, mas não é possível afirmar se esse é o mapeamento definitivo do núcleo ou apenas uma referência do ambiente demonstrado.

### 6.3 Limitação estrutural do código de atividade

O instrutor enfatiza que não se deve criar uma nova atividade equivalente à já existente no núcleo, como “segurado plus”, para substituir ou contornar a atividade padrão de segurado.

A implicação é que a personalização deve ocorrer sobre a atividade existente, mediante configurações e regras locais, e não pela criação de estruturas paralelas que alterem o significado do modelo-base.

---

## 7. Blocos de informação do terceiro

A criação de terceiros é descrita como composta por **nove possíveis blocos de informação**. Nem todos os blocos são enumerados de forma consolidada em um único trecho da transcrição, mas os seguintes são explicitamente mencionados:

| Bloco ou conjunto de dados | Finalidade descrita |
|---|---|
| Dados básicos | Identificação inicial do terceiro, atividade, documento e vínculo com documento principal |
| Dados de identificação | Informações pessoais ou societárias, nome, estado civil, nacionalidade, profissão e outros atributos |
| Endereços | Registro de possíveis endereços do terceiro |
| Contatos | Registro de contatos disponíveis |
| Documentos alternativos | Relação entre múltiplos documentos associados ao mesmo terceiro |
| Pessoa politicamente exposta | Identificação de PEP ou de vínculo com pessoa exposta |
| Obrigações fiscais em outros países | País, identificador fiscal e período de vigência da obrigação |
| Representantes legais | Aplicável, em princípio, a pessoas jurídicas |
| Acionistas | Aplicável, em princípio, a pessoas jurídicas |
| Meios de cobrança e pagamento | Dados para operações financeiras relacionadas ao terceiro |

Embora a transcrição mencione “nove blocos”, a enumeração verbal inclui mais conceitos quando se consideram subblocos. Portanto, não é possível afirmar com segurança a composição técnica exata dos nove blocos formais da interface.

### 7.1 Disponibilidade por atividade

Os blocos são apresentados como uma base compartilhada, mas sua habilitação pode variar conforme atividade.

Exemplo relevante: na atividade de tramitador ou supervisor demonstrada, o bloco de **meios de cobrança e pagamento** não estava disponível.

A justificativa apresentada é prevenção de fraude: um tramitador poderia, em tese, criar meios de pagamento associados a si mesmo e gerar liquidações indevidas. A ausência desse bloco reduz a possibilidade de usar a atividade operacional para direcionar pagamentos ao próprio usuário.

Isso não impede que a mesma pessoa tenha meios de cobrança e pagamento em outra atividade, por exemplo como segurado. A restrição é relacionada ao papel desempenhado naquela atividade específica.

---

## 8. Dados básicos e identificação inicial

### 8.1 Pesquisa antes da criação

O instrutor recomenda que o usuário pesquise antes de criar um novo terceiro.

A lógica operacional é:

```text
Informar critérios de busca
↓
Verificar se o terceiro já existe
↓
Se existir, consultar ou reutilizar informações
↓
Se não existir, iniciar criação
```

A recomendação é preventiva: evitar registros duplicados e impedir a criação desnecessária de múltiplas versões de uma mesma pessoa.

A transcrição menciona “nove critérios de busca”, mas não os lista integralmente de maneira confiável. São citados explicitamente:

- tipo de documento;
- código/chave do documento;
- código de terceiro;
- atividade.

### 8.2 Validação durante a criação

Mesmo que o usuário não faça a pesquisa prévia, o sistema executa uma validação ao avançar na criação.

O fluxo explicado é:

```text
Usuário informa atividade e dados básicos
↓
Sistema verifica se o terceiro existe
↓
Se existir em outras atividades:
    ├─ usuário pode descartar as atividades encontradas e continuar do zero
    ├─ usuário pode consultar uma atividade existente
    └─ usuário pode selecionar uma atividade e copiar suas informações
↓
Criação da nova atividade do terceiro
```

### 8.3 Reaproveitamento de informação

Quando o terceiro já existe em outra atividade, o usuário pode transferir informações da atividade existente para a nova atividade.

Exemplo apresentado:

- se o terceiro já possui quatro endereços em outra atividade;
- a transferência pode copiar esses endereços para o novo cadastro de atividade.

A transcrição é explícita sobre uma exceção: **dados bancários ou meios de cobrança e pagamento não são transferidos** entre atividades.

O motivo informado não é tecnicamente detalhado; o instrutor o apresenta como critério fixo do sistema.

---

## 9. Documento principal e documentos alternativos

### 9.1 Função do documento principal

O documento principal é o mecanismo apresentado para relacionar diferentes documentos pertencentes à mesma pessoa.

Exemplos citados:

- NIF na Espanha;
- RUT no Chile;
- RFC no México.

O objetivo é garantir que documentos alternativos — como DNI, passaporte ou outros identificadores — sejam rastreados contra um documento principal, evitando que o sistema trate a mesma pessoa como múltiplas entidades independentes.

### 9.2 Limitação reconhecida

A validação padrão explicada ocorre pelo tipo de documento e pelo código/chave correspondente. Por isso, uma pessoa já cadastrada com um tipo de documento pode não ser encontrada se for pesquisada com outro documento, a menos que exista o relacionamento cadastrado entre ambos.

Essa é uma limitação operacional relevante: o documento principal ajuda a tratar a unicidade, mas depende de cadastro e vinculação adequados.

### 9.3 Tipo de documento e natureza da pessoa

O tipo de documento pode determinar se o terceiro é:

- pessoa física;
- pessoa jurídica;
- ambos.

Exemplos apresentados:

- o DNI demonstrado estava configurado como documento exclusivo de pessoa física;
- o NIF/NITH exibido no ambiente permitia a seleção de pessoa física ou jurídica, aparentemente porque sua configuração não restringia a natureza da pessoa.

Portanto, na operação demonstrada, a determinação de pessoa física ou jurídica não decorre apenas da atividade. Ela também depende de como o tipo de documento foi configurado.

---

## 10. Regras por atividade e tipo de pessoa

A apresentação diferencia duas dimensões de comportamento:

1. **Código de atividade**;
2. **Tipo de pessoa: física ou jurídica**.

### 10.1 Variação por atividade

A obrigatoriedade e a habilitação de campos podem variar por atividade.

Exemplo citado:

- o campo referente ao nome da empresa em que a pessoa trabalha pode ser relevante para segurados;
- esse mesmo campo pode não ser aplicável ou necessário para agentes, pois o agente já seria identificado no contexto operacional correspondente.

A transcrição não detalha todas as regras por atividade, mas deixa claro que a mesma tela ou bloco de cadastro pode apresentar comportamentos diferentes conforme o código de atividade.

### 10.2 Variação por natureza jurídica

Exemplos explicitamente apresentados:

| Campo | Pessoa física | Pessoa jurídica |
|---|---|---|
| Tratamento | Aplicável, como senhor/senhora | Não aplicável nos mesmos termos |
| Estado civil | Aplicável | Não aplicável |
| Tipo de sociedade | Não aplicável | Aplicável |
| Acionistas | Não aplicável | Aplicável |
| Folio registral | Não aplicável em regra | Aplicável |
| Data de constituição | Não aplicável | Aplicável |

O sistema não permite simplesmente inverter esse comportamento por configuração local. O instrutor afirma que são validações “de caixa”, isto é, comportamentos nativos do núcleo.

Caso exista uma necessidade excepcional de mudar tal comportamento, isso exigiria processo de evolução do núcleo e governança conjunta com a organização mencionada na transcrição como Mapfre. A transcrição não define esse processo, responsáveis ou critérios de aprovação.

---

## 11. Configurações, personalizações e limites do núcleo

### 11.1 Parâmetros de instalação

Foram relembrados parâmetros de instalação relacionados ao modelo de terceiros, entre eles:

- utilização ou não do modelo de terceiros;
- tipo genérico de documento identificador;
- código identificador genérico;
- múltiplas contas;
- múltiplos cartões;
- consulta limitada de segurados por empregados de agência.

A apresentação informa que o treinamento está baseado no **novo modelo de terceiros**.

Esse parâmetro não é descrito como uma chave que possa ser ativada ou desativada livremente no dia a dia. Segundo o instrutor, ele nasce definido na instalação e não deve ser alterado posteriormente.

### 11.2 Validações configuráveis

Além das validações nativas, podem existir regras locais definidas por configuração, por exemplo:

- exigir e-mail para determinada atividade;
- exigir telefone de contato;
- exigir algum atributo específico;
- restringir valores permitidos;
- determinar se um campo é obrigatório.

Também podem ser implementadas validações mais específicas nas telas de terceiros, além das regras de tabelas de configuração.

### 11.3 Limites destacados

O instrutor diferencia:

- o que é configurável localmente;
- o que é comportamento nativo do núcleo;
- o que poderia exigir evolução de produto.

Não se pode concluir, pela transcrição, quais tecnologias são usadas para implementar essas personalizações, nem qual mecanismo técnico é empregado para extensões locais.

---

## 12. Modelo de acesso e segregação operacional

O acesso à rotina de terceiros depende de:

- autenticação com usuário;
- perfil ou papel atribuído;
- programas liberados ao perfil;
- menu e submenu disponíveis;
- permissões de tratamento por atividade.

A rotina aparece dentro de uma agrupação funcional de gestão de terceiros, acessível a partir do menu principal conforme as permissões concedidas.

A transcrição indica que uma tabela de atribuição por usuário define quais atividades cada pessoa pode tratar. Um usuário pode, por exemplo, possuir ou não permissão para criar ou modificar terceiros da atividade de ajustador, recuperador, agente ou outra categoria.

### Implicação analítica

A estrutura descrita sugere um modelo de segregação de funções: o acesso à entidade “terceiro” não é necessariamente geral, mas condicionado ao escopo funcional do usuário. Essa leitura é derivada da explicação de permissões e não constitui uma declaração formal sobre o desenho completo de segurança da aplicação.

---

## 13. Dados de identificação do terceiro

O bloco de identificação é amplo e pode conter atributos pessoais, fiscais, profissionais, societários e de comunicação.

### 13.1 Identificador único corporativo

O instrutor diferencia dois identificadores:

| Identificador | Finalidade |
|---|---|
| Código de terceiro | Identificador no âmbito do sistema citado como Riscor |
| Identificador único | Código que pode ser usado para reconhecer o mesmo terceiro em múltiplos sistemas corporativos |

O identificador único é apresentado como relevante em cenários com sistemas legados, CRM e outros aplicativos. A intenção é manter um código comum para o mesmo terceiro em toda a companhia.

O código de terceiro pode ser manual ou automático. Caso seja automático, a companhia precisa implementar um mecanismo de geração. Foi citado, como exemplo, o uso de uma sequência Oracle, mas isso aparece como possibilidade e não como tecnologia confirmada do ambiente.

### 13.2 Dados documentais

Foram citados:

- data de emissão do documento;
- data de vencimento;
- país emissor;
- verificador do documento;
- data de verificação;
- observações sobre a verificação.

O país emissor é associado ao primeiro nível da estrutura geográfica: países.

A transcrição sugere que informações poderiam ser pré-carregadas conforme o tipo de documento e o contexto local, mas não afirma que isso esteja implementado.

### 13.3 Verificação documental

O sistema permite identificar:

- quem verificou o documento;
- se ele foi verificado;
- data da verificação;
- observações ou método empregado.

O instrutor propõe como exemplo futuro ou possível a integração com módulo de notificações, algoritmos ou inteligência artificial para verificar documentos e atualizar o terceiro em batch. Contudo, ele é explícito: **não existe, no momento apresentado, automatismo implementado para isso**.

A ideia é ilustrativa:

```text
Documento recebido
↓
Validação por processo, algoritmo ou IA
↓
Resultado armazenado
↓
Atualização posterior do terceiro por batch
↓
Registro de método e observações de verificação
```

Esse fluxo não deve ser tratado como arquitetura atual confirmada.

---

## 14. Pessoa politicamente exposta e obrigações fiscais

### 14.1 Pessoa politicamente exposta

Ao marcar um terceiro como pessoa politicamente exposta, o sistema habilita um bloco específico.

Os dados mencionados incluem:

- data de início;
- data de fim ou inativação;
- indicação de que o próprio terceiro é PEP;
- ou identificação de pessoa relacionada;
- tipo e código do documento da pessoa relacionada;
- cargo ou tipo de relação;
- condição de ativo ou inativo.

A limitação informada é relevante: o sistema, no comportamento atual descrito, permite identificar apenas **uma** relação ou pessoa associada no bloco apresentado. O instrutor observa que “hoje por hoje é assim”.

### 14.2 Obrigações fiscais em outros países

Ao indicar que o terceiro possui obrigações fiscais em outros países, o sistema habilita o respectivo bloco de informação.

Os dados descritos são:

- país;
- identificador fiscal;
- validações de formato ou chave do identificador;
- data de início;
- data de fim ou inativação.

A lógica apresentada é que uma pessoa residente em um país pode possuir obrigação fiscal em outro. O país deve configurar as validações que conseguir sustentar para os identificadores de países relevantes.

A transcrição não define cobertura global automática para validação de todos os países.

---

## 15. Dados pessoais, profissionais e econômicos

O bloco de identificação pode armazenar diversos dados. A presença do campo não significa que ele deve necessariamente ser exigido ou usado em todos os canais.

### 15.1 Dados pessoais

Foram citados:

- tratamento;
- nome;
- segundo nome;
- sobrenome;
- sobrenome de casada;
- sufixo;
- estado civil;
- nome do cônjuge;
- data de nascimento;
- data de falecimento;
- residência no país desde determinada data;
- nacionalidade;
- tipo de nacionalidade;
- país de nascimento;
- localidade de nascimento;
- idioma;
- gênero;
- percentual de incapacidade;
- número de filhos.

A transcrição reconhece que muitos desses dados podem não estar disponíveis no momento do cadastro, especialmente quando a informação vem de agente, formulário web ou outro canal indireto.

### 15.2 Data de falecimento

A data de falecimento é apresentada como informação que poderia ser atualizada a partir de processos de sinistros, por exemplo após comprovação documental.

O instrutor defende que a informação deve ser usada para sua finalidade real, e não mantida como mero campo cadastral. A atualização poderia ser feita por uma equipe central de terceiros, caso esse seja o procedimento definido pela companhia.

### 15.3 Idioma de comunicação

O idioma escolhido pelo terceiro deve fazer sentido apenas se houver suporte operacional para utilizá-lo.

O exemplo apresentado é:

```text
Idioma cadastrado no terceiro
↓
Seleção de modelo de comunicação nesse idioma
↓
Geração de documento, SMS ou notificação
↓
Envio ao terceiro
```

Se a companhia não mantiver modelos em múltiplos idiomas, o campo perde coerência prática. O instrutor relaciona essa decisão a custo, volume de clientes e manutenção de templates.

### 15.4 Profissão, ocupação e atividade econômica

Esses atributos são obtidos de catálogos configurados.

O instrutor defende que, idealmente, a organização use catálogos padronizados entre países para permitir comparações consolidadas. Caso cada país use códigos diferentes para a mesma ocupação, será necessário um mapeamento posterior, com custo adicional.

Essa posição é apresentada como recomendação e lógica desejável; a transcrição não confirma que haja um catálogo corporativo único em operação.

### 15.5 Dados econômicos e financeiros

Foram mencionados:

- renda mensal aproximada;
- moeda;
- perfil financeiro;
- atividade principal;
- atividades secundárias;
- condição de trabalhador por conta própria;
- tipo de emprego;
- empresa em que trabalha;
- tipo de empresa.

Esses dados podem apoiar regras de subscrição, análise de risco, tratamento comercial ou outras finalidades. O instrutor ilustra a possibilidade de usar renda para avaliar coberturas relacionadas a acidentes e incapacidade, mas não declara que essa seja uma regra atualmente configurada.

### 15.6 Princípio de uso coerente dos campos

Um ponto recorrente é que campos criados para determinada finalidade não devem ser reutilizados arbitrariamente para armazenar informações de outra natureza.

O exemplo dado é o uso inadequado de perfil financeiro para registrar outra classificação que não possui campo próprio. A orientação é preservar a semântica original do atributo para não comprometer integrações, análises e entendimento futuro dos dados.

---

## 16. Histórico de alterações

A demonstração mostra que determinados dados de terceiros possuem histórico.

O instrutor cria um terceiro com informações mínimas, altera alguns campos e consulta o histórico. O sistema exibe dois momentos:

1. criação;
2. modificação posterior.

Também é possível identificar os campos que mudaram entre os dois estados, incluindo exemplos como:

- alias;
- tratamento;
- sufixo;
- data de nascimento;
- estado civil.

A precisão temporal depende de uma configuração de instalação relacionada à composição de data e hora, incluindo hora, minuto e segundo.

A transcrição não detalha:

- prazo de retenção do histórico;
- se todos os campos são historificados;
- mecanismos de auditoria;
- usuário responsável pela alteração;
- imutabilidade do log;
- integração com controles de compliance.

---

## 17. Casos e exemplos demonstrados

### 17.1 Criação mínima de um segurado

Foi demonstrada a criação de um terceiro na atividade `1` com informações mínimas:

- documento DNI;
- nome;
- sobrenome;
- estado civil solteiro.

O objetivo foi mostrar que, no ambiente demonstrado, a criação pode ser concluída com poucos dados quando não há outras validações obrigatórias ativas para aquela combinação de atividade e documento.

### 17.2 Criação de um supervisor e pesquisa de existência

O instrutor tentou criar um terceiro associado a uma atividade de supervisor, usando um documento que já existia em outras atividades.

O sistema identificou a existência do terceiro em atividades como:

- segurado;
- agente;
- perito.

A demonstração mostrou que o usuário pode consultar os registros existentes, selecioná-los e eventualmente transferir informações para a nova atividade.

O ambiente apresentou falhas e bloqueios durante a execução. O instrutor atribuiu isso ao fato de estar em ambiente de desenvolvimento e a possíveis intervenções ou alterações realizadas por outras pessoas no mesmo ambiente.

### 17.3 Documento DNI versus NIF/NITH

Foram comparados dois tipos de documento:

- DNI, configurado como pessoa física;
- NIF/NITH, aparentemente configurado de modo a permitir pessoa física ou jurídica.

A intenção da demonstração foi evidenciar que o tipo de documento influencia a habilitação da marca de natureza física/jurídica.

### 17.4 Pessoa politicamente exposta

Foi demonstrado o preenchimento do bloco de PEP para uma pessoa que seria ela própria politicamente exposta, com exemplo de cargo associado a um tribunal superior.

O exemplo é funcional e ilustrativo; não deve ser interpretado como dado real de uma pessoa ou como configuração obrigatória do sistema.

---

## 18. Perguntas e respostas relevantes

### Pergunta 1 — É possível duplicar uma pessoa se ela estiver cadastrada com outro tipo de documento?

**O que se buscava entender**  
A dúvida foi se uma pessoa cadastrada, por exemplo, com NIF poderia ser novamente cadastrada com DNI, pois a busca parece ocorrer pelo tipo e código do documento.

**Resposta dada**  
O instrutor confirmou que a validação ocorre por tipo de documento, chave/código e, quando aplicável, código de terceiro. Portanto, registros com documentos distintos podem coexistir.

A função do documento principal é justamente relacionar esses documentos para que a pessoa seja tratada como uma única entidade lógica.

**O que a resposta esclarece**  
O modelo não garante unicidade absoluta entre documentos distintos apenas pela busca padrão. A qualidade do relacionamento entre documentos é essencial para reduzir duplicidade.

---

### Pergunta 2 — Informações como país emissor de documento não poderiam ser comuns a todas as instâncias?

**O que se buscava entender**  
A pergunta questiona se determinadas informações ou catálogos poderiam ser centralizados para todas as instâncias, em vez de serem tratados localmente.

**Resposta dada**  
O instrutor concorda que, conceitualmente, algumas informações poderiam ser elevadas ou tratadas de forma mais comum e coerente. Contudo, afirma que o sistema evoluiu ao longo do tempo e que a realidade atual contém decisões históricas que nem sempre parecem ideais.

**O que a resposta esclarece**  
Há uma distinção entre arquitetura desejável e comportamento atual. A sessão documenta o que existe no produto naquele momento, não necessariamente o desenho considerado mais elegante ou padronizado.

---

### Pergunta 3 — Como identificar pessoa física ou jurídica?

**O que se buscava entender**  
O instrutor questiona os participantes sobre o elemento que determina se é possível cadastrar pessoa física, jurídica ou ambas.

**Resposta dada**  
A resposta é que isso depende do tipo de documento configurado. O documento pode estar associado a pessoa física, pessoa jurídica ou ambas.

**O que a resposta esclarece**  
A classificação não é determinada exclusivamente pela atividade do terceiro. O tipo de documento exerce papel estrutural na habilitação da natureza da pessoa.

---

## 19. Limitações reconhecidas

| Limitação | Descrição |
|---|---|
| Alteração de atividades de núcleo | Não é permitido criar ou substituir livremente atividades que já existem no núcleo |
| Modelo de terceiros | O parâmetro não é descrito como algo ativável e desativável livremente após a instalação |
| Pessoa física versus jurídica | Certas regras de habilitação são nativas e não podem ser revertidas por simples configuração |
| Meios de pagamento | Não são transferidos ao copiar informações de uma atividade para outra |
| PEP | O bloco demonstrado suporta apenas uma relação ou pessoa associada |
| Busca de duplicidade | A busca por tipo e código de documento pode não identificar a mesma pessoa cadastrada com outro documento |
| Automação de verificação documental | Foi apresentada como possibilidade, mas não como capacidade implementada |
| Ambiente demonstrado | O ambiente de desenvolvimento apresentou falhas e inconsistências |
| Dados e validações por país | Nem todas as validações documentais ou fiscais estão necessariamente disponíveis para todos os países |
| Obrigatoriedade excessiva | Regras mal definidas podem induzir usuários a preencher dados fictícios |
| Campos disponíveis | A existência de um campo não significa que seu uso seja útil, obrigatório ou operacionalmente suportado |

---

## 20. Riscos e desafios

### 20.1 Riscos explicitamente mencionados

- fraude associada à inclusão de meios de cobrança e pagamento em determinados papéis operacionais;
- criação de registros duplicados para a mesma pessoa;
- dados falsos inseridos para contornar campos obrigatórios;
- captura de grande volume de informação sem uso posterior;
- configuração inconsistente de catálogos;
- acesso excessivo de usuários a atividades que não deveriam tratar;
- uso inadequado de campos para finalidades diferentes daquelas para as quais foram concebidos;
- dependência de procedimentos locais e de qualidade na execução operacional.

### 20.2 Desafios derivados do contexto

> Os pontos abaixo são interpretações analíticas sustentadas pela conversa, não decisões literais dos participantes.

- **Governança de dados mestres:** a entidade terceiro parece funcionar como dado transversal para emissão, sinistros, cobrança, pagamentos e comunicações. Isso exige ownership claro sobre cadastro, qualidade, deduplicação e atualização.
- **Padronização internacional:** a convivência entre países, documentos, catálogos e necessidades legais torna difícil manter comparabilidade corporativa sem um modelo comum de referência.
- **Equilíbrio entre compliance e experiência do usuário:** exigir muitos atributos pode atender objetivos de risco, fiscais ou comerciais, mas pode deteriorar a jornada de cadastro em canais como web, agentes ou operações internas.
- **Uso responsável de dados pessoais:** atributos como gênero, deficiência, profissão, renda, nacionalidade e obrigações fiscais exigem finalidade legítima, processos bem definidos e controle de acesso. A transcrição cita preocupações com proteção de dados, mas não descreve o modelo de conformidade aplicável.
- **Rastreabilidade e confiança:** a existência de histórico é positiva, mas sua utilidade depende de o sistema registrar adequadamente quem alterou, quando alterou e por qual procedimento.

---

## 21. Relações de causa e efeito reconstruídas

### 21.1 Duplicidade cadastral

```text
Múltiplos tipos de documento por pessoa
↓
Busca baseada em tipo e código de documento
↓
Possibilidade de não localizar registros com documento alternativo
↓
Risco de criar a mesma pessoa mais de uma vez
↓
Necessidade de documento principal e relacionamento entre documentos
```

### 21.2 Excesso de obrigatoriedade

```text
Campo obrigatório sem fonte confiável de informação
↓
Usuário precisa preencher algo para concluir o processo
↓
Inserção de dado fictício ou de baixa qualidade
↓
Perda de confiabilidade cadastral
↓
Necessidade de calibrar obrigatoriedade conforme processo e finalidade
```

### 21.3 Dados sem exploração

```text
Cadastro de muitos atributos
↓
Maior esforço operacional e atrito no canal
↓
Dados armazenados sem uso em processos ou decisões
↓
Custo sem benefício proporcional
↓
Necessidade de vincular captura a uma finalidade concreta
```

### 21.4 Permissões amplas

```text
Rotina única para múltiplas atividades de terceiros
↓
Possibilidade de usuários acessarem dados ou operações indevidas
↓
Risco operacional e de fraude
↓
Necessidade de autorização por perfil, programa e atividade
```

---

## 22. Transformações e direcionamentos identificados

### 22.1 De cadastros isolados para uma visão de terceiro compartilhada

A estrutura apresentada indica uma direção de centralização de dados de terceiro. Um mesmo indivíduo ou empresa pode participar em várias atividades, e o sistema busca reutilizar ou relacionar informações entre elas.

Essa visão é diferente de tratar cada papel — segurado, agente, perito ou supervisor — como cadastro inteiramente independente.

### 22.2 De configuração genérica para comportamento contextual

A reunião demonstra que o cadastro não é estático. O comportamento depende de:

- atividade;
- tipo de documento;
- natureza física ou jurídica;
- regras locais;
- catálogos;
- permissões;
- necessidades de negócio.

A interpretação é que a solução busca ser uma plataforma configurável, mas com limites de núcleo para preservar coerência funcional.

### 22.3 De coleta de dados para uso orientado a processo

O instrutor insiste que os atributos cadastrais devem existir porque serão utilizados, por exemplo, em:

- notificações;
- marketing;
- subscrição;
- sinistros;
- consolidação corporativa;
- segmentação;
- obrigações fiscais;
- controles de risco.

A transformação sugerida é de uma mentalidade de “preencher todos os campos disponíveis” para “coletar dados úteis, verificáveis e vinculados a uma finalidade”.

---

## 23. O que a reunião não permite concluir

A transcrição não fornece detalhes suficientes para concluir, com segurança:

- a arquitetura técnica completa do sistema;
- a linguagem de programação, framework ou banco de dados do núcleo;
- se Oracle é efetivamente o banco utilizado ou apenas um exemplo para geração de sequência;
- a tecnologia de APIs, eventos, mensageria ou integrações;
- o mecanismo de processamento batch;
- a existência de microserviços;
- o modelo de autenticação e autorização além de usuários, menus e permissões;
- a estratégia de IAM;
- o modelo de auditoria completo;
- políticas de retenção de histórico;
- modelo de LGPD, GDPR ou outra regulamentação de privacidade;
- modelo de criptografia de dados;
- gestão de consentimentos, apesar de ser mencionado que há consentimentos específicos na atividade de segurado;
- modelo de backup, recuperação de desastre ou disponibilidade;
- SLA, métricas operacionais ou observabilidade;
- fluxo formal para evolução do núcleo;
- responsáveis por aprovar customizações;
- critério para tornar um campo obrigatório;
- lista completa dos nove blocos de informação;
- relação completa entre códigos de atividade e papéis de negócio;
- cobertura efetiva por país;
- roadmap futuro do produto;
- ambiente produtivo versus desenvolvimento;
- quais falhas vistas no ambiente de desenvolvimento também poderiam ocorrer em produção.

---

## 24. Principais conclusões

1. O cadastro de terceiros é uma capacidade transversal e central para operações de seguros, não apenas uma tela isolada de manutenção cadastral.

2. A entidade terceiro é compartilhada entre diferentes papéis, mas cada atividade possui regras, permissões e informações específicas.

3. Os nove blocos de informação formam uma base comum, porém sua disponibilidade e obrigatoriedade dependem de atividade, natureza da pessoa, documento e regras locais.

4. A criação deve idealmente começar com pesquisa de existência para reduzir duplicidade e aproveitar informações já cadastradas.

5. O documento principal é fundamental para relacionar documentos alternativos e representar uma pessoa como uma entidade única, mas depende de disciplina e qualidade no cadastro.

6. A validação on-line e a validação batch devem obedecer à mesma lógica de regras e catálogos.

7. O núcleo possui comportamentos estruturais que não podem ser alterados apenas por parametrização local, especialmente em relação a atividades de núcleo e distinções entre pessoa física e jurídica.

8. Configurações locais devem ser usadas com propósito claro. Tornar campos obrigatórios sem fonte confiável ou uso posterior tende a gerar dados fictícios e baixa qualidade cadastral.

9. O controle de acesso por atividade é essencial para evitar alterações indevidas e reduzir riscos operacionais ou de fraude.

10. A existência de muitos campos não significa que todos devam ser usados. O valor do cadastro depende de dados coerentes, verificáveis e efetivamente explorados pelos processos de negócio.

11. A sessão termina antes da conclusão dos demais blocos de informação. Ficaram pendentes, segundo o próprio instrutor, a continuidade da criação de terceiros, a explicação de “terceiro não desejado” e o detalhamento de consentimentos relacionados ao segurado.
