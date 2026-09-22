# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `0002-TE-DEFINICION-Tercero-por-Actividad.mp4`
**Data de processamento:** 20/09/2026 14:02:24
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise Estruturada — Módulo de Terceiros no RIFCOR/Riftcore

> **Base documental:** transcrição fornecida, aparentemente derivada de reconhecimento automático de voz.  
> **Rastreabilidade:** a transcrição não contém timestamps ou numeração de linhas; por isso, as referências são feitas pelos trechos e contextos em que os assuntos aparecem.  
> **Nota terminológica:** a transcrição alterna grafias como “RIFCOR”, “Riftcore” e possivelmente “Reefcore”. Este documento preserva a referência como **RIFCOR/Riftcore**, sem afirmar qual é a grafia oficial. Também aparecem “Newtron”, “tron web” e “Neutron”; há indícios de que se refiram a componentes relacionados, mas a transcrição não permite confirmar a nomenclatura exata.

---

## 1. Síntese executiva

A sessão é um treinamento funcional sobre o **módulo de terceiros** do sistema RIFCOR/Riftcore, com foco inicial na camada de **definições e catálogos de configuração**, e não nas operações práticas de cadastro. O conceito central apresentado é que um “terceiro” pode ser qualquer pessoa física ou jurídica com a qual a seguradora ou seus processos mantenham relação: clientes, agentes, peritos, fornecedores, empregados, oficinas, seguradoras, médicos, advogados, entre outros.

A principal mensagem da reunião é que a identidade funcional de um terceiro no sistema não é determinada apenas por seus dados cadastrais ou por ele ser pessoa física ou jurídica. Ela é estruturada principalmente pelo conceito de **atividade**. A atividade define a capacidade daquele terceiro de participar de processos específicos, habilita informações e catálogos aplicáveis, influencia validações e pode permitir integrações com outros módulos, como emissão, sinistros e tesouraria.

A reunião também reforça que o sistema é altamente configurável, mas que essa flexibilidade exige governança. Vários catálogos permitem agrupar, categorizar, classificar ou qualificar terceiros. Contudo, o uso desses mecanismos deve ser coerente e estável: não se deve usar um mesmo catálogo para finalidades desconexas, nem exigir dados obrigatórios que a organização não consiga validar ou utilizar efetivamente.

Outro ponto relevante é a coexistência entre um modelo antigo de terceiros e um **novo modelo** mais amplo. Novas instalações devem, segundo a apresentação, adotar o modelo novo por orientação corporativa atribuída à MAPFRE. Entretanto, a migração é descrita como possível, porém complexa, porque exige não apenas transportar dados legados, mas complementar e reorganizar informações para aproveitar as capacidades do novo modelo.

---

## 2. Contexto e antecedentes

### 2.1 Escopo da sessão

A sessão dá continuidade a uma sequência de treinamento sobre o sistema. O facilitador informa que o grupo deixa o “módulo de comuns” e passa ao módulo de terceiros. O conteúdo do dia é assumidamente teórico e voltado a catálogos, parâmetros e definições.

A parte operacional — criação, alteração e uso prático de terceiros — ficaria para uma sessão posterior. O instrutor antecipa que, nesse momento prático, os participantes conseguiriam visualizar como cada bloco da tela de cadastro consome os catálogos definidos previamente.

### 2.2 Posição do módulo de terceiros no sistema

O módulo de terceiros não é apresentado como um cadastro isolado. Ele é descrito como uma base transversal para outros módulos e processos do sistema, incluindo exemplos de:

- emissão de apólices;
- sinistros;
- tesouraria;
- documentação e notificações;
- controle de acessos para usuários de agências;
- campanhas, segmentações e eventuais usos comerciais;
- dados de cobrança e pagamento;
- obrigações ou informações fiscais.

A apresentação diferencia com cuidado:

- o que é configurado no **módulo de terceiros**;
- o que pertence a outros módulos, ainda que se relacione ao mesmo terceiro.

Por exemplo, um agente pode possuir dados cadastrais e classificações no módulo de terceiros, mas seus adiantamentos, comissões ou contas correntes podem ser tratados na tesouraria. Da mesma forma, regras de produto, cobertura e desconto podem pertencer ao módulo de emissão.

### 2.3 Modelo antigo e novo modelo de terceiros

A reunião informa que existe um sistema anterior de terceiros e um “novo modelo”. O novo modelo amplia a funcionalidade disponível no cadastro de terceiros.

Como exemplo, é dito que o novo modelo pode suportar diversas direções para um mesmo terceiro — “5, 10, 15, 20 direções” —, com classificações como residência, segunda residência, endereço comercial ou local de trabalho. No sistema antigo, o limite citado era de três endereços:

1. correspondência;
2. postal;
3. comercial.

A transcrição afirma que houve implementação de código para permitir migração do legado para o novo sistema. Porém, a migração não é tratada como trivial: cada instalação pode ter evoluído durante anos com suas próprias particularizações e critérios.

A orientação apresentada é:

- novas instalações devem ir para o novo modelo;
- instalações legadas podem coexistir com elementos do novo modelo em determinadas situações;
- uma migração só faz sentido se vier acompanhada de enriquecimento ou adequação dos dados.

Migrar apenas para armazenar no novo modelo exatamente os mesmos dados existentes no legado é descrito como uma iniciativa sem benefício claro.

---

## 3. Conceito de “terceiro”

### 3.1 Definição funcional

No contexto apresentado, um terceiro é uma pessoa física ou jurídica que precisa ser identificada e armazenada no sistema porque participa de processos da companhia.

O conceito inclui, entre outros exemplos mencionados:

- clientes;
- tomadores;
- segurados;
- condutores;
- beneficiários;
- credores pignoratícios;
- agentes;
- peritos;
- inspetores de risco;
- médicos;
- advogados;
- procuradores;
- supervisores;
- reguladores ou tratadores de sinistros;
- fornecedores;
- executivos de conta;
- cobradores;
- seguradoras;
- resseguradoras;
- empregados;
- representantes legais;
- oficinas;
- vidraceiros;
- chaveiros.

A condição de pessoa física ou jurídica é relevante para determinar quais dados podem ou devem ser capturados. Porém, ela não esgota a identidade funcional do terceiro no sistema.

### 3.2 Atividade não é papel de acesso

A distinção mais enfatizada pela apresentação é entre **atividade** e **role/papel**.

A atividade:

- é um código associado ao terceiro;
- identifica a função que ele pode exercer em processos de negócio;
- pode habilitar dados, regras e comportamentos específicos;
- permite que módulos distintos reconheçam aquele terceiro conforme sua capacidade funcional.

Os papéis de usuário, por outro lado, parecem se relacionar a permissões de utilização do sistema. Um empregado pode ser registrado como terceiro com atividade de empregado e, separadamente, receber um usuário com papéis compatíveis com sua área de atuação.

Exemplo apresentado:

- uma pessoa pode ser cadastrada como cliente, por ter apólices;
- a mesma pessoa pode ser cadastrada também como agente;
- essas duas condições podem corresponder a registros de atividade distintos, com informações específicas diferentes.

O sistema pode compartilhar dados gerais — como nome, sobrenome, gênero e data de nascimento —, mas a informação operacional ligada a cada atividade pode variar.

---

## 4. Problemas e necessidades endereçados

## 4.1 Necessidade de modelar um mesmo indivíduo em contextos distintos

Uma pessoa pode ter mais de uma relação com a companhia. O exemplo central é alguém que seja simultaneamente cliente e agente.

### Consequência

Cada relação exige dados, regras e processos diferentes. Um cliente não precisa necessariamente ter quadros de comissão, mas um agente pode precisar deles para que operações de emissão sejam concluídas.

### Resposta do modelo

A atividade permite registrar e tratar essas relações de forma independente, sem reduzir o terceiro a uma única condição funcional.

---

## 4.2 Limitações do modelo anterior

O sistema anterior é descrito como mais restritivo, especialmente no volume e variedade de informações que pode armazenar, como no exemplo das três direções por terceiro.

### Consequência

A estrutura antiga pode ser insuficiente para representar cenários cadastrais mais complexos.

### Resposta do modelo novo

O novo modelo amplia as possibilidades de cadastro. Contudo, a transcrição não descreve integralmente o modelo de dados nem detalha todas as diferenças técnicas entre as duas versões.

---

## 4.3 Necessidade de coerência na configuração

O sistema possui vários catálogos capazes de segmentar ou classificar terceiros. A apresentação alerta que o uso indiscriminado desses mecanismos pode produzir ambiguidade e dificultar a exploração posterior dos dados.

### Consequência

Se uma mesma tabela for usada para finalidades diferentes e não relacionadas, diferentes áreas poderão interpretar o mesmo código de maneira incompatível.

### Direcionamento apresentado

Cada catálogo deve ter um propósito único e coerente dentro da companhia. Exemplos:

- se uma agrupação for usada para identificar clientes de bancasseguros, deve manter essa finalidade;
- se uma classificação depende da atividade, deve ser armazenada no catálogo específico por atividade;
- se uma segmentação é aplicável apenas a pessoas físicas ou jurídicas, deve-se considerar um catálogo que preserve essa distinção.

---

## 4.4 Obrigatoriedade de campos sem processo de qualidade

O facilitador chama atenção para o risco de tornar campos obrigatórios sem garantir que os dados sejam reais, válidos ou aproveitados.

O exemplo dado é o e-mail:

- pode-se forçar sua captura no cadastro;
- porém, se o usuário não possuir o dado, pode preencher valores fictícios;
- isso atende formalmente à validação, mas reduz a qualidade do cadastro.

### Implicação

A obrigatoriedade de dados deve vir acompanhada de uma política operacional clara, idealmente incluindo validação adequada. O exemplo citado foi o envio de um link de confirmação por e-mail, embora a transcrição não afirme que esse processo exista no sistema.

---

## 5. Solução conceitual apresentada

A solução apresentada é uma estrutura de cadastro e configuração baseada em:

1. **terceiros** como entidades físicas ou jurídicas;
2. **atividades** para identificar a capacidade funcional de cada terceiro;
3. **catálogos comuns** reutilizáveis por diferentes atividades;
4. **catálogos específicos por atividade**, quando a natureza do terceiro exige dados ou regras próprias;
5. **regras de obrigatoriedade e validação** para adequar a captura de dados a necessidades locais;
6. **integração funcional com outros módulos**, que utilizam a atividade e os dados do terceiro em seus próprios processos.

O modelo é configurável por companhia e, em alguns casos, por idioma, atividade, tipo de pessoa, ramo técnico, intervenção no processo e conceito lógico de dados.

---

## 6. Arquitetura funcional reconstruída

> **Observação:** o desenho abaixo é uma consolidação analítica do que foi explicado verbalmente. Não corresponde a um diagrama literal exibido na transcrição.

```text
Processos de negócio
(emissão, sinistros, tesouraria, documentação, acesso de agências)
                    ↓
Identificação do terceiro por atividade
                    ↓
Módulo de terceiros
├── Dados de identificação
│   ├── Tipo e código de documento
│   ├── Documento principal e documentos alternativos
│   └── Código interno do terceiro, quando aplicável
├── Dados conforme pessoa física ou jurídica
├── Catálogos comuns
│   ├── Agrupações
│   ├── Categorias
│   ├── Códigos de qualidade
│   ├── Meios de cobrança e pagamento
│   ├── Regimes fiscais
│   └── Catálogo multipropósito
├── Catálogos específicos por atividade
│   ├── Agentes
│   ├── Segurados/clientes
│   ├── Tratadores de sinistros
│   └── Fornecedores, entre outros
└── Regras e validações configuráveis
    ├── Campos obrigatórios
    ├── Regras de negócio em Oracle
    ├── Validações de formato
    └── Mascaramento de dados sensíveis
                    ↓
Módulos consumidores
├── Emissão
├── Sinistros
├── Tesouraria
├── Documentação/notificações
└── Canais e usuários de agências
```

### 6.1 Papel da atividade no fluxo

A atividade é apresentada como um elemento de acesso e direcionamento de dados. O facilitador afirma que o código de atividade integra a “primary key” de acesso às tabelas onde as informações residem, embora a transcrição não detalhe a estrutura exata das chaves ou tabelas.

A justificativa é que um mesmo indivíduo pode possuir registros em mais de uma atividade, cada um com atributos particulares.

### 6.2 Relação com outros módulos

A atividade não executa automaticamente uma regra de negócio por si só. Ela disponibiliza uma condição que precisa ser usada por algoritmos e configurações dos módulos consumidores.

Exemplos mencionados:

- um agente pode entrar em processo de cálculo ou pagamento de comissões na tesouraria;
- um perito pode ser considerado para atribuição de sinistros;
- um empregado pode receber desconto comercial, desde que o ramo/produto e suas regras estejam configurados para isso;
- uma atividade pode permitir ou bloquear geração de documentação;
- uma atividade pode permitir ou bloquear consultas por usuários de agências.

A apresentação reforça que cadastrar a informação não basta: a funcionalidade depende de implementação e configuração nos processos correspondentes.

---

## 7. Configurações prévias e parâmetros

Antes de entrar nos catálogos, o facilitador recupera parâmetros de instalação e de companhia que modulam o comportamento do módulo de terceiros.

Entre os elementos citados:

- uso ou não do novo modelo de terceiros;
- tipo de documento identificador utilizado por novas atividades criadas no novo módulo;
- dados de cobrança e pagamento, incluindo contas bancárias e cartões;
- parâmetros transversais do sistema, como formato de captura de campos de data e conjunto de caracteres.

A distinção apresentada é:

- parâmetros globais ou transversais podem afetar vários módulos;
- parâmetros específicos de terceiros afetam diretamente o comportamento desse módulo.

---

## 8. Atividades de terceiros

## 8.1 Finalidade

Uma atividade identifica a capacidade de um terceiro de realizar funções específicas no sistema. Ela permite associar pessoas e entidades a processos e procedimentos transversais no RIFCOR/Riftcore.

A atividade é descrita como o elemento que “detona” grande parte do comportamento do sistema de terceiros.

## 8.2 Exemplos de comportamento por atividade

| Situação | Efeito explicado |
|---|---|
| Terceiro identificado como agente | Pode participar de processos de comissionamento, conforme configuração da entidade e da tesouraria. |
| Terceiro identificado como perito | Pode ser elegível para tarefas de sinistros, atribuição e perícia. |
| Terceiro identificado como empregado | Pode ser reconhecido por regras de emissão para eventual desconto comercial, caso a regra exista. |
| Atividade identificada como fornecedor | Pode demandar a criação e a manutenção de tabelas ou informações específicas de fornecedores. |
| Atividade permitida para documentação | Pode habilitar a geração de documentos em operações de terceiros. |
| Atividade permitida para usuários de agência | Pode permitir consulta por usuários vinculados a agências ou corretores. |

## 8.3 Códigos reservados

A apresentação informa que os códigos de atividade de **1 a 99**, além do código **999**, são reservados para uso exclusivo do núcleo.

A orientação é explícita: uma instalação não deve criar localmente, por exemplo, um código 87 inexistente. Caso o núcleo passe a utilizá-lo futuramente, poderia ocorrer conflito entre a configuração local e a evolução central.

A partir do código 101, segundo a fala, seria possível criar atividades locais, caso necessário.

## 8.4 Atividades do núcleo citadas

A lista apresentada não foi detalhada até o fim. Os códigos e significados explicitamente mencionados incluem:

| Código | Atividade citada |
|---:|---|
| 1 | Clientes em apólices: tomadores, segurados, condutores, beneficiários, credores pignoratícios e outras tipologias de cliente |
| 2 | Agentes |
| 3 | Peritos |
| 4 | Inspetores de risco |
| 5 | Médicos |
| 6 | Advogados |
| 7 | Procuradores |
| 8 | Supervisores |
| 9 | Tratadores de sinistros |
| 10 | Fornecedores no modelo anterior; o facilitador afirma que isso mudou no novo modelo |
| 11 | Executivos de conta |
| 12 | Cobradores |
| 13 | Seguradoras, conforme a transcrição; há possível inconsistência com o item seguinte |
| 14 | Seguradoras ou resseguradoras, conforme exemplo envolvendo MAPFRE Global Risk |
| 15 | Empregados |
| Até 45 | A transcrição indica que a lista chega a representantes legais, sem detalhar todos os códigos intermediários |

> **Incerteza de transcrição:** os códigos 13 e 14 aparecem ambos associados a “seguradoras”, mas o exemplo do código 14 menciona uma entidade resseguradora. Não é possível determinar com segurança, apenas pela transcrição, a classificação oficial de cada um.

## 8.5 Provedor no novo modelo

No modelo anterior, fornecedores seriam identificados por uma atividade específica, citada como código 10.

No novo modelo, a apresentação afirma que a condição de fornecedor deixa de depender exclusivamente dessa atividade. Há uma marca na tabela de atividades que indica se determinada atividade corresponde a um fornecedor.

Exemplos dados:

- oficinas;
- empresas de reparação de vidros;
- chaveiros.

A implicação é que diferentes atividades podem ser tratadas como fornecedoras sem que todas precisem ser reduzidas a uma única atividade genérica de fornecedor.

## 8.6 Código interno do terceiro

Além da identificação por tipo e número de documento, determinadas atividades podem exigir um código interno numérico para o terceiro.

O exemplo principal é o agente. No processo de emissão de uma apólice, o usuário não precisaria necessariamente informar o documento de identificação do agente; poderia informar o código interno desse agente.

Esse código pode ser:

- obrigatório ou não, conforme a atividade;
- gerado automaticamente;
- informado manualmente pelo usuário;
- validado pelo sistema para evitar duplicidade.

A transcrição cita Oracle Sequence como um possível mecanismo técnico para geração automática, mas deixa claro que essa é uma possibilidade e não uma arquitetura obrigatória.

## 8.7 Estrutura de informação

A atividade pode se associar a uma estrutura de informação que determina quais dados devem ser mantidos para aquele tipo de terceiro.

O raciocínio apresentado é que o conjunto de dados exigido para um agente não é o mesmo exigido para um chaveiro, por exemplo.

A transcrição relaciona esse conceito às estruturas e agrupações de estruturas explicadas em treinamento anterior, mas não detalha o modelo completo nessa sessão.

## 8.8 Geração de documentação

Há uma configuração por atividade para definir se é permitida a geração de documentação.

O exemplo citado é a criação de um agente gerar, ao final do cadastro, uma comunicação automática para uma autoridade reguladora ou órgão local, informando que o agente está autorizado a iniciar operações de intermediação para determinado ramo.

A lógica explicada é:

- se a atividade não permite documentação, esse tipo de funcionalidade não deve ser habilitado;
- ainda que haja mecanismos de avaliação em documentação, a atividade funciona como uma camada inicial de habilitação.

## 8.9 Consulta por usuários de agências

A atividade também pode definir se usuários ligados a agências ou corretores podem consultar informações dessa atividade.

Isso é apresentado como uma camada anterior às restrições usuais de acesso por estrutura comercial, produtos ou outras regras de autorização.

Assim, um usuário de agência pode até ter acesso ao programa de terceiros, mas não necessariamente poderá consultar dados de uma atividade que não esteja habilitada para esse tipo de usuário.

---

## 9. Documentos identificadores

## 9.1 Papel dos documentos

Todo terceiro deve ser identificado por:

- tipo de documento;
- código ou chave do documento.

A apresentação trata essa identificação como obrigatória para todos os terceiros do sistema.

Exemplos de documentos ou identificadores citados:

- DNI;
- NIF;
- passaporte;
- RFC no México;
- RUT no Chile;
- RUT na Colômbia.

> **Nota:** as denominações e usos específicos variam por país. A transcrição utiliza exemplos locais e não estabelece um padrão global completo.

## 9.2 Relação com pessoa física e jurídica

O tipo de documento é apresentado como o elemento que ajuda a determinar se o cadastro pode corresponder a:

- pessoa física;
- pessoa jurídica;
- ambas.

A regra exposta é:

| Marca do documento | Uso permitido |
|---|---|
| Ativada para física | Somente pessoa física |
| Valor “N” | Somente pessoa jurídica |
| Em branco | Pessoa física ou jurídica |

O facilitador usa o NIF espanhol como exemplo de documento que pode identificar tanto pessoas físicas quanto jurídicas.

## 9.3 Documento real e documento alternativo

O catálogo permite marcar se um documento é “real”, entendido na explicação como um documento formal ou físico de identificação, e também permite tratar documentos alternativos.

A ideia de documento alternativo é que um terceiro possa ser localizado por identificadores adicionais ligados ao seu documento principal.

Exemplo ilustrativo da reunião:

- “Juan Pérez Pérez” teria um NIF como identificação principal;
- também poderia possuir outros documentos ou códigos internos alternativos;
- o sistema poderia rastrear esses documentos até o documento “pai” ou principal.

## 9.4 Restrição para emissão e sinistros

O facilitador enfatiza uma regra de negócio: não se deve permitir que o tomador de uma apólice seja capturado usando um documento alternativo.

A mesma restrição é associada aos processos de emissão e sinistros. A fala sugere que, mesmo que tecnicamente fosse possível, isso não deveria ser permitido conforme o critério estabelecido.

## 9.5 Geração automática do código de documento

O catálogo também prevê a possibilidade de geração automática do código de documento associado ao tipo configurado.

A explicação operacional é semelhante à do código interno do terceiro:

- se a geração automática estiver ativa, o sistema deve dispor de lógica para produzir o código;
- se não estiver ativa e o código for obrigatório, o usuário precisará informá-lo manualmente;
- o mecanismo técnico pode usar sequências Oracle ou outro critério definido localmente.

---

## 10. Campos obrigatórios e validações

## 10.1 Objetivo do catálogo

O catálogo de campos obrigatórios permite configurar exigências adicionais para a captura de dados de terceiros.

Ele não substitui validações básicas de tipo de dado, como formato de data ou campo alfanumérico. Seu propósito é estabelecer regras funcionais adicionais, como obrigar a informação de determinado atributo em um contexto específico.

## 10.2 Possíveis dimensões de configuração

Conforme a explicação, a obrigatoriedade pode ser definida considerando:

- companhia;
- atividade;
- todas as atividades ou uma atividade específica;
- ramo técnico;
- intervenção no processo;
- pessoa física ou jurídica;
- atributo do modelo de dados;
- conceito lógico relacionado ao atributo;
- regra de negócio adicional em Oracle.

A transcrição afirma que o catálogo é híbrido entre funcional e técnico, pois requer conhecimento do modelo de dados para configurar corretamente o atributo a ser validado.

## 10.3 Exemplos de regras

| Regra citada | Contexto |
|---|---|
| Obrigatoriedade do dia sugerido de pagamento | Pode ter relação com tesouraria e cobrança de recibos. |
| Obrigatoriedade de idioma | Pode ser necessária em cenários específicos de comunicação ou exigência regulatória. |
| Obrigatoriedade de e-mail | Pode ser definida para todas as atividades ou subconjuntos delas. |
| Obrigatoriedade de gênero | Foi citada como exemplo histórico para condutor, quando a tarifação levava esse atributo em conta. |
| Obrigatoriedade de rating | Exemplo para entidade seguradora estrangeira. |
| Validação de idioma para documento específico | Exemplo de regra condicional com base no documento identificador. |

## 10.4 Intervenção no processo

A reunião apresenta um nível mais granular de obrigatoriedade: não basta identificar a atividade; pode-se diferenciar o papel daquele terceiro em um processo de emissão.

Exemplo:

- uma pessoa pode ser tomador, pagador, segurado, beneficiário ou condutor;
- a companhia poderia exigir o gênero apenas quando o terceiro atua como condutor;
- não seria necessário obrigar o mesmo dado para os demais papéis.

O facilitador observa que esse exemplo de uso de gênero para tarifação seria histórico no contexto da Espanha, pois uma alteração legislativa teria tornado essa diferenciação não aplicável.

## 10.5 Regras de negócio como exceção ou complemento

Além da parametrização, a transcrição menciona a possibilidade de um pacote Oracle avaliar lógica de negócio adicional.

Esse mecanismo poderia:

- complementar as validações de catálogo;
- dispensar uma regra em condição especial;
- inabilitar obrigatoriedade ou validação conforme outros dados.

O exemplo dado — dispensar uma exigência caso o terceiro fosse o presidente da MAPFRE — é explicitamente ilustrativo e não deve ser interpretado como regra real do sistema.

## 10.6 Conceito lógico do atributo

Foi relatada uma evolução no modelo para registrar o “conceito lógico” ao qual um atributo pertence. A razão apresentada é que podem existir campos com o mesmo nome em contextos distintos, como:

- contatos;
- representantes legais;
- dados da pessoa.

Essa distinção evita que uma validação seja aplicada ao atributo homônimo em um conceito incorreto.

---

## 11. Catálogos de agrupamento, segmentação e classificação

## 11.1 Agrupações de terceiros

Uma agrupação é definida como um subconjunto de terceiros que compartilha ao menos uma característica.

A apresentação não impõe uma finalidade fixa para esse catálogo. Ele pode ser utilizado conforme a necessidade local.

Exemplos hipotéticos apresentados:

- segmentação geracional;
- identificação de baby boomers, geração X, millennials ou geração Z;
- clientes do Banco Santander;
- clientes de bancasseguros;
- clientes de uma mutualidade médica.

### Princípio de uso

Uma vez escolhido o propósito de uma agrupação, ele deve ser mantido. Não se deve usar o mesmo código ou estrutura para misturar necessidades de áreas diferentes, como comercial e técnica, quando os critérios forem distintos.

### Estrutura informada

O catálogo pode ser definido por:

- companhia;
- atividade;
- código de agrupação;
- descrição;
- descrição abreviada.

---

## 11.2 Catálogo multipropósito

O facilitador descreve um “catálogo de catálogos”, criado para concentrar diferentes listas de valores em uma mesma tabela, em vez de manter tabelas individuais para cada tipo de dado.

Exemplos de conteúdos possíveis:

- tipos de sociedade;
- grupos empresariais;
- titulações;
- zonas horárias;
- segmentações de clientes;
- canais;
- dispositivos eletrônicos.

A explicação faz uma comparação com listas de valores vistas em treinamento anterior.

### Avaliação apresentada

O facilitador manifesta que o catálogo teria sido criado por uma área de APIs, possivelmente por desconhecimento de capacidades já existentes no núcleo. Isso é uma opinião apresentada durante a sessão, não uma análise técnica comprovada pela transcrição.

Apesar dessa avaliação, o catálogo existe e deve ser conhecido porque pode ser consultado para validar dados durante o cadastro de terceiros.

### Exemplo

Para pessoas jurídicas, o catálogo pode conter:

- tipos societários;
- grupos empresariais;
- códigos e descrições relacionados a essas classificações.

---

## 11.3 Categorias

Categorias são apresentadas como outra forma de classificar ou segmentar terceiros.

Inicialmente, a explicação sugere uso para pessoas físicas, mas depois corrige e esclarece que o catálogo possui atributo para indicar se a categoria se aplica a:

- pessoas físicas;
- pessoas jurídicas;
- ambas.

A apresentação reforça que, se a companhia quiser usar categorias para segmentação geracional — algo naturalmente ligado a pessoas físicas —, isso é possível, mas poderá consumir um mecanismo que também seria capaz de categorizar pessoas jurídicas.

### Estrutura citada

- companhia;
- idioma;
- código de categoria;
- descrição;
- marca de aplicabilidade para pessoa física, jurídica ou ambas.

---

## 11.4 Classificações por atividade

O catálogo de classificações é apresentado como o mecanismo apropriado quando a classificação depende da atividade do terceiro.

Exemplo principal:

- atividade 17: oficinas;
- classificações possíveis: oficina conveniada ou não;
- especialização: mecânica geral, funilaria e pintura, pneus, vidros;
- vínculo com marcas de veículos, como Toyota, BMW ou Mercedes.

A conclusão funcional é que, se o critério de classificação está ligado à atividade, deve-se usar o catálogo específico por atividade, e não um catálogo genérico de agrupação ou categoria.

### Estrutura citada

- companhia;
- código de atividade;
- código de classificação;
- descrição.

---

## 11.5 Códigos de qualidade

Esse catálogo permite atribuir códigos de qualidade aos terceiros por companhia e atividade.

O facilitador trata esse conceito como potencialmente antigo ou limitado, porque uma avaliação de qualidade inserida manualmente por um usuário pode não ser suficiente ou confiável.

Como alternativas conceituais, foram mencionadas de forma especulativa:

- algoritmos;
- CRM;
- redes sociais;
- score de crédito;
- processos em lote;
- participação de marketing e outras áreas.

A transcrição não afirma que tais integrações existam no sistema. Elas foram apresentadas como possibilidades de evolução ou formas mais sofisticadas de qualificar terceiros.

### Ponto de governança

A organização precisa definir:

- qual catálogo será a fonte de determinada informação;
- quem carrega ou atualiza os dados;
- se a atualização será on-line ou em lote;
- quais processos e áreas consultarão essa informação.

---

## 12. Meios de cobrança e pagamento

## 12.1 Papel no cadastro de terceiros

O novo modelo de terceiros possui componente para captura de meios de cobrança e pagamento. Esse bloco pode registrar informações de:

- contas bancárias;
- cartões;
- meios de pagamento móvel;
- carteiras virtuais;
- moedas virtuais;
- pagamento on-line.

A transcrição trata “dados bancários” como parte de uma noção mais ampla de meios de cobrança e pagamento.

## 12.2 Entidades comercializadoras

Há um catálogo para definir entidades comercializadoras dos meios de cobrança e pagamento.

Exemplos mencionados:

- entidades bancárias;
- emissoras de cartão de crédito;
- companhias aéreas que emitam cartões vinculados a programas de pontos;
- fintechs;
- bancos digitais, com exemplos como Revolut e Openbank.

O catálogo é descrito como simples, contendo:

- companhia;
- idioma;
- código da entidade comercializadora;
- descrição.

## 12.3 Tipos de meio de pagamento

A reunião cita uma lista finita de tipos de meio de pagamento com comportamento definido no sistema, identificados pelos códigos de 1 a 6:

| Tipo mencionado | Exemplo ou interpretação da fala |
|---|---|
| Conta bancária | Conta para operações bancárias |
| Cartão bancário | Crédito, débito e outros tipos |
| Pagamento por celular | Apple Pay, Samsung Pay, Google Pay ou Wallet |
| Carteira virtual | Mencionada como possibilidade |
| Moeda virtual | Relacionada ao exemplo de “tréboles” visto anteriormente |
| Pagamento on-line | Meio de pagamento digital |

> **Incerteza:** a associação exata entre cada código de 1 a 6 e cada tipo não foi apresentada de forma inteiramente estruturada na transcrição.

## 12.4 Subtipos e validações

Para cada tipo de meio, podem existir códigos específicos.

Exemplos:

- contas bancárias: conta corrente, conta de valores, conta de poupança, conta on-line/digital;
- cartões: crédito, débito, revolving, pré-pago ou carteira;
- pagamento móvel: Apple Pay, Samsung Pay, Google Pay, Wallet.

O catálogo também pode indicar o método de validação aplicável.

Exemplos de validação explicados:

- conta bancária: estrutura de IBAN, SWIFT ou padrão local;
- pagamento por celular: número de telefone;
- cartão: estrutura numérica do cartão;
- e-mail: validação de formato ou método associado.

## 12.5 Mascaramento

O tipo de meio de pagamento pode indicar um mecanismo de mascaramento para exibição em tela.

Exemplos apresentados:

- exibir apenas os últimos dígitos de uma conta ou cartão;
- ocultar partes centrais do e-mail;
- usar caracteres como “X” para não exibir o dado completo.

O objetivo é permitir reconhecer o meio de pagamento sem expor integralmente informações sensíveis.

---

## 13. Tokens aplicados a meios de cobrança e pagamento

A apresentação menciona outro catálogo voltado a tipos de token aplicáveis a meios de cobrança e pagamento.

Foram citados os conceitos de:

- token real;
- token genérico;
- token de outra entidade;
- token interno;
- sequência Oracle;
- serviço de arquitetura para criptografia ou mascaramento.

A transcrição não detalha o fluxo completo de tokenização, os algoritmos, os serviços de segurança ou a arquitetura de armazenamento. O facilitador adia uma explicação mais prática para a sessão de operações de terceiros.

---

## 14. Regimes fiscais

## 14.1 Finalidade

O catálogo de regimes fiscais permite identificar o regime fiscal de uma pessoa física ou jurídica.

A recomendação apresentada é utilizar esse catálogo para essa finalidade, em vez de criar atributos paralelos ou armazenar a informação em elementos de outros domínios, como dados variáveis de apólice.

## 14.2 Estrutura citada

- companhia;
- idioma;
- código do regime fiscal;
- descrição;
- aplicabilidade para pessoa física, jurídica ou ambas.

## 14.3 Autônomos

A sessão destaca que autônomos não se enquadram de forma simples na divisão entre pessoa física e jurídica.

A transcrição afirma que o sistema permite distingui-los por outro atributo, mas não explica qual é esse atributo nem como ele funciona.

O facilitador observa que a identificação de autônomos pode ser relevante para campanhas comerciais ou de marketing, inclusive em situações específicas de mercado ou eventos locais. O exemplo relacionado a Valencia e à DANA foi usado para ilustrar um possível interesse comercial, não como funcionalidade concreta já configurada.

## 14.4 Pergunta sobre regimes regionais

Um participante pergunta se o catálogo poderia tratar especificidades fiscais de regiões espanholas, como País Basco, com regimes próprios para determinados impostos.

A resposta indica que:

- o catálogo de regimes fiscais poderia ser usado em algum sentido;
- porém, para retenções, impostos e obrigações associadas a agentes, fornecedores ou operações econômicas, o tratamento correto estaria em outros campos, especialmente na área de tesouraria e no cadastro específico conforme a atividade;
- particularidades fiscais regionais precisam ser contempladas quando aplicáveis.

Também são citados, como exemplos comparativos, cenários fiscais especiais em regiões fronteiriças do México e possíveis especificidades na Catalunha. A transcrição não fornece regras fiscais concretas para nenhuma dessas localidades.

---

## 15. Modelo operacional mencionado

A sessão não detalha um modelo operacional completo de suporte, incidentes, releases, hotfixes, monitoramento ou observabilidade. Entretanto, alguns elementos operacionais emergem das explicações.

### 15.1 Cadastro e manutenção

O cadastro de terceiros depende de:

- atividade;
- documento identificador;
- dados exigidos por pessoa física ou jurídica;
- catálogos comuns;
- catálogos específicos por atividade;
- regras de obrigatoriedade;
- eventuais validações técnicas e funcionais.

### 15.2 Responsabilidade distribuída

A manutenção de um terceiro pode envolver várias áreas:

| Área ou domínio citado | Papel sugerido pela reunião |
|---|---|
| Recursos Humanos | Cadastro de empregados e dados pertinentes à relação laboral. |
| Segurança/administração de usuários | Criação ou habilitação de usuário e definição de acessos. |
| Sinistros | Definição de papéis e permissões de uma pessoa que atuará em sinistros. |
| Tesouraria | Comissões, contas correntes, adiantamentos, retenções e informações financeiras relacionadas. |
| Emissão | Regras de produto, cobertura, desconto e uso de dados de terceiros na apólice. |
| Comercial ou administração | Critérios de pagamento e tipologia de agentes. |
| Marketing | Possível definição ou exploração de classificações, qualidade e segmentações. |

> A distribuição acima é uma reorganização explicativa das falas. A reunião não apresentou uma matriz oficial de responsabilidades.

### 15.3 Relevância de procedimentos

A apresentação sugere que o cadastro não pode ser tratado apenas como uma operação de tela. A entrada de dados obrigatórios, como e-mail, documento ou condição fiscal, precisa de procedimentos organizacionais que garantam qualidade e consistência.

---

## 16. Perguntas e respostas relevantes

## 16.1 Migração do modelo anterior para o novo

### Pergunta

Para empresas que usam o sistema antigo de terceiros, a migração para o novo modelo é muito complicada?

### Resposta

A resposta indica que há código implementado para viabilizar a migração do legado para o novo sistema. Ainda assim, o processo é reconhecido como complexo, pois cada instalação pode ter particularizações e evoluções próprias.

A migração deve considerar dados adicionais necessários ao novo modelo. Transportar os mesmos dados sem enriquecimento não seria, segundo o facilitador, uma justificativa suficiente para migrar.

### O que isso esclarece

A existência de mecanismo de migração não significa que a transição seja automática, simples ou recomendada em qualquer cenário. Há dependência de análise de dados, particularizações e objetivo de negócio.

---

## 16.2 Empregado que também possui apólice

### Pergunta

Se uma pessoa é empregada e também possui uma apólice, qual atividade deve ser escolhida?

### Resposta

A pessoa pode existir com atividade de cliente e, separadamente, com atividade de empregado. O exemplo indica atividade 1 para cliente e atividade 15 para empregado.

A área de Recursos Humanos seria, em princípio, responsável por registrar o empregado. Depois, outros processos podem criar um usuário e atribuir papéis conforme o local onde a pessoa atuará.

### O que isso esclarece

O modelo separa identidade cadastral de condições funcionais. Ser empregado não elimina a condição de cliente, e cada condição pode ter seus próprios processos e dados.

---

## 16.3 Qual catálogo utilizar para uma classificação

### Pergunta

Diante de agrupações, categorias, classificações e códigos de qualidade, qual tabela deve ser usada?

### Resposta

Não há uma resposta universal. A escolha depende da necessidade da companhia e do tipo de critério.

O direcionamento dado é:

- se a classificação depende da atividade, usar o catálogo por atividade;
- se depende de pessoa física ou jurídica, considerar catálogos que preservem esse atributo;
- evitar usar um mecanismo para finalidade incompatível com sua estrutura;
- definir uma única finalidade coerente para cada uso configurado.

### O que isso esclarece

A configuração é flexível, mas não autogovernada. A responsabilidade de definir convenções e fontes de verdade é local.

---

## 16.4 Regimes fiscais regionais

### Pergunta

Especificidades fiscais territoriais, como as do País Basco, poderiam ser selecionadas por meio do catálogo de regimes fiscais?

### Resposta

O facilitador indica que o catálogo pode ter relação com o tema, mas que retenções e impostos ligados às relações econômicas com agentes, fornecedores e outros terceiros devem ser tratados em campos específicos de tesouraria e do cadastro conforme a atividade.

### O que isso esclarece

Nem toda necessidade tributária deve ser resolvida pelo catálogo genérico de regime fiscal. A modelagem depende do objetivo: classificação fiscal geral, retenção, impostos ou regras de pagamento.

---

## 17. Limitações reconhecidas

A reunião reconhece ou evidencia as seguintes limitações:

1. **Migração complexa:** embora haja código de migração, instalações antigas podem ter particularizações que dificultam a transição.
2. **Capacidade limitada do sistema antigo:** há exemplo explícito de limitação a três direções por terceiro.
3. **Dados sem uso não agregam valor:** exigir ou cadastrar informações que não serão exploradas aumenta esforço e pode degradar a qualidade.
4. **Obrigatoriedade sem validação pode produzir dados fictícios:** o exemplo do e-mail evidencia esse risco.
5. **Atividade isolada não produz funcionalidade automaticamente:** é necessário que outros módulos estejam configurados para consumir a informação.
6. **Catálogos sobrepostos exigem governança:** agrupações, categorias, classificações e qualidade podem atender necessidades similares, mas não são intercambiáveis sem critério.
7. **Autônomos não são resolvidos apenas pela marca físico/jurídico:** há outro atributo, não detalhado, para distingui-los.
8. **Tokenização e meios de pagamento não foram detalhados integralmente:** a explicação foi interrompida ou adiada para uma sessão prática.
9. **A transcrição não apresenta todos os códigos de atividade:** a lista do núcleo foi parcialmente citada, sem inventário completo.
10. **Não há definição completa de arquitetura técnica:** são mencionados Oracle, tabelas, pacotes e sequências, mas não há detalhes suficientes sobre versões, infraestrutura ou integrações.

---

## 18. Riscos e desafios

## 18.1 Riscos explicitamente mencionados

| Risco | Como aparece na reunião |
|---|---|
| Conflito com códigos reservados | Criar localmente atividades entre 1 e 99 pode causar colisão com futuras evoluções do núcleo. |
| Migração sem ganho funcional | Migrar o legado sem capturar dados complementares pode não justificar o esforço. |
| Dados de baixa qualidade | Obrigar o preenchimento de e-mail pode gerar valores falsos ou genéricos. |
| Uso inadequado de catálogos | Misturar finalidades em agrupações, categorias ou classificações reduz a utilidade dos dados. |
| Expectativa de automação inexistente | Cadastrar uma atividade não implementa automaticamente descontos, comissões ou outros comportamentos. |
| Uso indevido de documento alternativo | Não deve ser permitido para tomador em emissão e sinistros, conforme a regra apresentada. |

## 18.2 Desafios derivados do contexto

> **Leitura analítica, não declaração literal dos participantes.**

1. **Governança de dados mestres:** a quantidade de catálogos e a flexibilidade de uso sugerem necessidade de regras corporativas ou locais claras sobre propriedade, finalidade e qualidade dos dados.
2. **Consistência entre módulos:** como terceiros são consumidos por emissão, sinistros e tesouraria, alterações de cadastro precisam ser compatíveis com regras desses módulos.
3. **Evolução controlada do legado:** coexistência entre modelos pode aumentar complexidade operacional até que haja estratégia clara de migração ou manutenção.
4. **Segurança de dados financeiros e pessoais:** meios de pagamento, mascaramento e tokenização indicam uma área sensível, embora a reunião não detalhe controles de segurança.
5. **Padronização entre países:** a presença de documentos, obrigações fiscais e práticas locais diferentes aponta para desafio de equilibrar um núcleo comum com exigências locais.

---

## 19. Relações de causa e efeito reconstruídas

### 19.1 Identidade múltipla do terceiro

```text
Uma mesma pessoa ou entidade pode exercer papéis de negócio diferentes
↓
Cada papel exige dados e processos próprios
↓
Um único cadastro genérico é insuficiente
↓
O sistema associa atividades ao terceiro
↓
Cada atividade habilita informações, validações e uso por processos específicos
```

### 19.2 Evolução do modelo de terceiros

```text
Modelo antigo com menor capacidade cadastral
↓
Limitações para representar dados mais variados, como múltiplas direções
↓
Necessidade de ampliar o cadastro
↓
Criação ou adoção de novo modelo de terceiros
↓
Migração requer enriquecimento e adequação dos dados, não mera cópia
```

### 19.3 Configuração excessiva sem governança

```text
Diversos catálogos disponíveis para segmentar e classificar terceiros
↓
Possibilidade de uso inconsistente ou duplicado
↓
Dificuldade de exploração e interpretação dos dados
↓
Necessidade de definir finalidade única e fonte correta para cada informação
```

### 19.4 Campo obrigatório sem validação efetiva

```text
Exigência de preenchimento de um atributo
↓
Usuário não possui ou não confirma o dado
↓
Inserção de valor fictício para passar na validação
↓
Cadastro aparentemente completo, porém pouco confiável
↓
Necessidade de política e mecanismos de validação compatíveis
```

---

## 20. Transformações identificadas

> **Esta seção apresenta interpretação analítica baseada no conteúdo, sem atribuir as conclusões literalmente aos participantes.**

### 20.1 De cadastro simples para plataforma de dados de terceiros

Uma leitura possível é que o módulo de terceiros deixa de ser apenas uma tela de cadastro e passa a funcionar como uma base de dados mestre para processos de negócio. A atividade conecta o cadastro a emissão, sinistros, tesouraria, documentação e acessos.

### 20.2 De tipologia genérica para capacidades funcionais

O modelo não se limita a classificar terceiros como pessoa física ou jurídica. Ele os organiza conforme o que podem fazer no ecossistema operacional: vender, intermediar, periciar, tratar sinistros, receber pagamentos, prestar serviços ou atuar internamente.

### 20.3 De fornecedor como categoria única para fornecedor como atributo transversal

A mudança descrita para fornecedores sugere uma evolução de uma atividade única de “fornecedor” para um modelo em que diferentes atividades podem receber a marca de fornecedor. Isso permite preservar a especialização funcional de oficinas, vidraceiros e chaveiros, por exemplo, sem perder o tratamento comum de fornecedor.

### 20.4 De regras rígidas para configuração contextual

A possibilidade de definir obrigatoriedade por companhia, atividade, ramo, intervenção, tipo de pessoa e regra adicional mostra uma direção de configuração contextual. Ao mesmo tempo, a reunião alerta que essa flexibilidade precisa ser usada com critério.

---

## 21. Números e indicadores citados

> Os valores abaixo foram declarados no contexto da apresentação e não foram auditados externamente.

| Indicador ou referência | Valor mencionado | Contexto |
|---|---:|---|
| Duração prevista de pausa | Cerca de 15 minutos | Pausa planejada no treinamento. |
| Direções possíveis no novo modelo | 5, 10, 15 ou 20, como exemplos | Demonstração de maior flexibilidade cadastral. |
| Direções no sistema antigo | 3 | Correspondência, postal e comercial. |
| Códigos reservados do núcleo | 1 a 99 | Atividades exclusivas do núcleo. |
| Código adicional reservado | 999 | Também reservado ao núcleo. |
| Possível início de códigos locais | A partir de 101 | Segundo a explicação do facilitador. |
| Atividade de cliente | 1 | Exemplo apresentado. |
| Atividade de agente | 2 | Exemplo apresentado. |
| Atividade de empregado | 15 | Exemplo apresentado. |
| Atividade de oficinas | 17 | Exemplo apresentado. |
| Limite citado de códigos de atividade listados | Até 45 | A lista foi indicada como chegando a representantes legais. |
| Tipos de meio de pagamento com comportamento definido | 1 a 6 | Conta, cartão, celular, carteira virtual, moeda virtual e pagamento on-line, conforme interpretação da fala. |

---

## 22. O que a reunião não permite concluir

A transcrição não fornece detalhes suficientes para determinar com segurança:

- a grafia oficial e a arquitetura formal do sistema RIFCOR/Riftcore;
- o nome exato e a função completa de “Newtron”, “Neutron” ou “tron web”;
- a lista integral de atividades do núcleo e seus códigos oficiais;
- o modelo físico completo de tabelas Oracle;
- versões de Oracle, banco de dados ou componentes de aplicação;
- arquitetura de APIs, eventos, mensageria ou integrações externas;
- modelo de autenticação, IAM, perfis e segregação de funções;
- controles de proteção de dados, criptografia, tokenização e gestão de chaves;
- políticas de LGPD, retenção, anonimização ou consentimento;
- processos formais de qualidade de dados;
- SLA, suporte, incidentes, observabilidade e monitoramento;
- pipeline de desenvolvimento, CI/CD, versionamento ou estratégias de release;
- estratégia corporativa completa de migração do legado;
- critérios exatos para seleção entre agrupação, categoria, classificação e qualidade;
- regras fiscais concretas para Espanha, México, Panamá, Colômbia, Chile ou outros países;
- funcionamento detalhado da distinção de autônomos;
- quais catálogos são efetivamente utilizados por cada instalação;
- roadmap com datas, responsáveis ou marcos de implantação.

---

## 23. Conclusões principais

1. **Atividade é o eixo central do módulo de terceiros.** Ela identifica a capacidade funcional do terceiro e orienta sua participação em processos de negócio.

2. **Pessoa física e jurídica não são classificações suficientes.** Um mesmo terceiro pode ter atividades distintas, como cliente, agente e empregado, com informações e regras próprias.

3. **O cadastro de terceiros é transversal.** Seus dados são utilizados por emissão, sinistros, tesouraria, documentação e controle de acesso de agências.

4. **O novo modelo amplia a capacidade de cadastro, mas migrar exige justificativa e preparação.** A migração existe, porém é complexa e deve agregar valor por meio de enriquecimento de dados e revisão de particularizações legadas.

5. **A flexibilidade de catálogos exige disciplina de governança.** Agrupações, categorias, classificações e códigos de qualidade devem ter finalidades definidas, estáveis e adequadas à natureza do dado.

6. **Obrigar o preenchimento de dados não garante qualidade.** Regras de obrigatoriedade precisam estar acompanhadas de processos de validação, uso real e responsabilidade operacional.

7. **A configuração não substitui a implementação dos processos consumidores.** Registrar um terceiro como agente, empregado ou perito não cria automaticamente comissões, descontos ou atribuições; os módulos correspondentes precisam estar configurados para utilizar essas condições.

8. **Há forte necessidade de adaptação local.** Documentos, exigências fiscais, meios de pagamento e regras de negócio variam por país e instalação, dentro de um conjunto de capacidades fornecidas pelo núcleo.
