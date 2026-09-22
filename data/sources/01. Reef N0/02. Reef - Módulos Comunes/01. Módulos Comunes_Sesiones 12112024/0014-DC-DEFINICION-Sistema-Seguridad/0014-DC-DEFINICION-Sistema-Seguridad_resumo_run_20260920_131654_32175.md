# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `0014-DC-DEFINICION-Sistema-Seguridad.mp4`
**Data de processamento:** 20/09/2026 13:21:40
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada — Sistema de Segurança, Perfis e Restrições de Acesso

> **Nota de fidelidade:** esta análise foi elaborada exclusivamente a partir da transcrição fornecida. Ela contém termos possivelmente afetados por reconhecimento automático de voz — como “Risco”, “Neutron”, “Tron Web”, “NUMA”, “edad”, “Objereitor” e “VEI”. Esses termos foram preservados quando não há evidência suficiente para corrigi-los com segurança. Não foram disponibilizados timestamps ou numeração de linhas para rastreabilidade precisa.

## 1. Síntese executiva

A reunião foi um treinamento funcional e técnico sobre o que os participantes denominam de **sistema de segurança** da aplicação. Esse sistema não se limita à autenticação: ele reúne os catálogos, parâmetros, papéis, permissões e restrições que determinam quem pode acessar a aplicação, quais programas cada pessoa enxerga, quais operações pode executar e quais dados pode consultar ou modificar.

O modelo apresentado é composto por diversas camadas de configuração. Primeiro, existe um cadastro geral de usuários do sistema; depois, há configurações específicas por companhia. A cada usuário podem ser associados um ou mais papéis, chamados de **roles**, que habilitam funcionalidades e programas. Em níveis mais detalhados, a solução permite restringir ações por atividade de terceiros, estrutura comercial, produto, ramo técnico e operação específica.

Também foi apresentada uma camada mais sofisticada denominada **informação parcial**. Ela permite controlar a visualização ou alteração de informações em diferentes granularidades: um conceito lógico inteiro, uma linha de informação ou até um atributo específico. Como exemplo, seria possível impedir que um usuário veja contatos de pessoas físicas, uma determinada direção/endereço ou somente o nome da rua em uma direção.

A principal mensagem é que a segurança da plataforma resulta da combinação de múltiplos cadastros e decisões organizacionais. Embora a aplicação permita configurações detalhadas, a reunião reforça que a definição de acessos não deveria ser responsabilidade isolada da área de tecnologia. Recursos Humanos, gestores de negócio, áreas operacionais e segurança corporativa devem participar da definição de quem pode fazer o quê.

---

## 2. Contexto e antecedentes

A explicação parte da necessidade de diferenciar três conceitos que poderiam ser confundidos:

1. **Autenticação**: o usuário entra no sistema usando código e senha.
2. **Autorização funcional**: após autenticar-se, o usuário somente pode executar as funções permitidas pelos seus roles.
3. **Autorização sobre informação**: mesmo podendo abrir um programa, o usuário pode ter restrições sobre os dados que vê, modifica ou cria.

O treinamento parece ocorrer no contexto de uma plataforma de seguros associada à MAPFRE, com referências a companhias, apólices, suplementos, agentes, sinistros, resseguro, tesouraria, comissões, emissão e terceiros.

A aplicação aparenta ter componentes de diferentes gerações:

- **Tron Web** é tratado como um componente mais antigo, com configurações históricas e parte da arquitetura considerada defasada.
- **Neutron** é apresentado como uma plataforma mais moderna, associada à gestão de acessos a operações e a regras de informação parcial.
- **Risco** é citado em conjunto com Neutron e parece designar uma plataforma ou contexto funcional relacionado à operação da aplicação. A transcrição não permite determinar se “Risco” é o nome exato do produto, módulo ou ambiente.
- Existem também “frontais” ou aplicações relacionadas a tesouraria, sinistros e ordens de serviço.

A reunião enfatiza repetidamente que parte das configurações existe por razões históricas. Algumas delas tinham maior utilidade quando a aplicação transacional era usada também para análises gerenciais; atualmente, segundo o expositor, esse tipo de análise deveria ser realizado preferencialmente em soluções de “VEI” — termo registrado pela transcrição e aparentemente usado como referência a ferramentas analíticas ou de inteligência de negócio, sem confirmação suficiente para expandir a sigla.

---

## 3. Problemas identificados

### 3.1. Autenticação não é suficiente para proteger o sistema

O fato de uma pessoa conseguir entrar no sistema não significa que ela deva acessar todas as áreas, todos os programas ou todos os dados disponíveis.

A necessidade apresentada é controlar, de forma configurável:

- quais módulos aparecem para cada usuário;
- quais operações são executáveis;
- quais dados podem ser consultados;
- quais dados podem ser modificados;
- quais informações precisam permanecer ocultas;
- quem pode autorizar exceções a regras de negócio.

### 3.2. Acesso excessivo a informações sensíveis

A reunião cita diversos exemplos de informação que não deveria ser visível para todos:

- comissões recebidas por agentes;
- informações financeiras;
- dados de folha de pagamento;
- dados de terceiros;
- contatos e direções/endereço;
- informações de apólices e sinistros;
- informações vinculadas a uma estrutura comercial específica.

O problema não é apenas esconder telas inteiras, mas impedir que usuários com acesso a determinada rotina visualizem ou alterem dados fora do seu escopo de atuação.

### 3.3. Necessidade de diferenciação entre perfis operacionais

A aplicação precisa atender pessoas com atribuições diferentes, como:

- subscritores;
- subscritores seniores;
- atuários;
- caixas;
- tramitadores de sinistros;
- supervisores;
- agentes;
- usuários de administração;
- empregados de bancos parceiros;
- empregados de concessionárias ou outras empresas parceiras.

A transcrição deixa claro que não basta associar permissões genericamente: os acessos precisam refletir a função efetivamente exercida por cada pessoa.

### 3.4. Regras de negócio exigem exceções controladas

Um exemplo apresentado é o de uma companhia que, por causa de alta sinistralidade, poderia decidir não permitir a emissão de determinado tipo de seguro de veículo durante um período.

Nesse cenário, a aplicação pode bloquear a operação por meio de um controle técnico. Contudo, um usuário com autoridade superior poderia ter permissão para autorizar a exceção. A reunião distingue essa situação de simplesmente “burlar” a regra: a ideia é que alguém com responsabilidade e conhecimento suficientes possa aprovar uma exceção de forma controlada.

### 3.5. Complexidade e legado técnico

O expositor reconhece que existem muitas tabelas e tarefas de manutenção, especialmente no contexto de Tron Web. Algumas configurações são descritas como antigas, defasadas ou pouco utilizadas atualmente.

A consequência é dupla:

- o conhecimento do modelo continua necessário para administrar e compreender o ambiente;
- porém, nem todas as estruturas antigas devem ser tratadas como práticas desejáveis para evoluções futuras.

---

## 4. Solução apresentada: modelo de segurança por camadas

A solução apresentada é uma combinação de configurações que atuam em diferentes níveis.

```text
Autenticação do usuário
        ↓
Cadastro geral de usuário no sistema
        ↓
Cadastro do usuário por companhia
        ↓
Atribuição de roles ao usuário
        ↓
Associação de roles a programas e funcionalidades
        ↓
Restrições por atividade, estrutura comercial, produto, ramo e operação
        ↓
Restrições de informação parcial por conceito, linha ou atributo
```

A estrutura não é apresentada como um único mecanismo centralizado. Pelo contrário, o controle de acesso depende de vários catálogos e parâmetros que precisam estar coerentes entre si.

Uma leitura analítica possível é que a plataforma adota uma abordagem de segurança configurável e altamente granular, porém com considerável complexidade administrativa. A segurança depende tanto do desenho técnico quanto da governança do processo de concessão e revisão de acessos.

---

## 5. Arquitetura lógica do funcionamento

O desenho abaixo é uma consolidação analítica do que foi explicado, e não um diagrama literal exibido durante a reunião.

```text
Usuário físico ou externo
        ↓
Código de identificação no catálogo de usuários do sistema
        ↓
Cadastro por companhia
        ↓
Roles funcionais atribuídos ao usuário
        ↓
Programas habilitados pelos roles
        ↓
Permissões específicas
 ├── atividades de terceiros
 ├── estruturas comercial e territorial
 ├── estrutura de produtos
 ├── ramo técnico
 └── operação específica
        ↓
Restrições de informação parcial
 ├── conceito lógico completo
 ├── linha específica
 └── atributo específico
        ↓
Dados de terceiros, apólices, sinistros, recibos e demais objetos de negócio
```

Também existe uma dependência importante entre configurações globais e configurações individuais:

```text
Parâmetro configurado na companhia
        ↓
Habilita ou desabilita o uso de informação parcial
        ↓
Configuração do usuário por companhia
        ↓
Determina se o usuário estará sujeito às restrições
        ↓
Roles e regras de informação parcial
        ↓
Aplicação efetiva da restrição nos programas que a implementam
```

A transcrição ressalta que nem todos os programas de consulta implementam as mesmas capacidades. Portanto, uma configuração pode existir no modelo, mas só produzir efeito em programas que tenham sido desenvolvidos para respeitá-la.

---

## 6. Componentes e cadastros mencionados

### 6.1. Catálogo de usuários do sistema

O primeiro nível é um catálogo geral de usuários, anterior à configuração por companhia.

Elementos mencionados:

- chave ou código de usuário;
- identificador único;
- nome;
- idioma preferencial;
- possivelmente um menu padrão;
- informações relacionadas à autenticação ou ao ambiente técnico.

O expositor usa o termo **NUMA** para representar o identificador único de usuários na MAPFRE. A transcrição sugere que esse identificador pode ser alfanumérico, apesar de ser chamado de “número”.

O uso de NUMA parece ser o padrão interno esperado, mas não obrigatório em todos os casos. Usuários externos, como empregados de bancos parceiros, podem não possuir o mesmo identificador corporativo e poderiam usar outro código.

### 6.2. Idioma do usuário

O idioma é definido no cadastro geral do usuário e não por companhia. Isso indica que o usuário tende a manter a mesma preferência linguística ao acessar diferentes companhias da entidade.

O exemplo dado foi Porto Rico, onde poderia haver usuários que preferem espanhol e outros que preferem inglês.

### 6.3. Menu padrão

O cadastro de usuário pode conter uma definição de menu padrão, especialmente no contexto de Tron Web.

Entretanto, o expositor sugere que, na prática, o menu que o usuário vê é principalmente consequência dos roles e dos programas associados a esses roles. Um administrador vê mais opções porque possui mais permissões.

### 6.4. Roles por companhia

Um role é apresentado como um agrupador de funcionalidades. Ele pode:

- habilitar uma grande coleção de operações;
- habilitar apenas uma operação específica;
- ser atribuído a um ou mais usuários;
- ser associado a um ou mais programas.

Exemplos funcionais citados:

- emitir apólices;
- emitir aplicações para transportes;
- retomar apólices suspensas;
- retomar aplicações suspensas;
- emitir suplementos;
- realizar anulações totais ou parciais;
- executar resgates totais ou parciais;
- fazer aportações extraordinárias.

A granularidade é configurável. Um role poderia, por exemplo, permitir todas as operações de nova produção; outro poderia permitir apenas a emissão de apólices.

### 6.5. Associação entre usuários e roles

Depois de criar os usuários e os roles, é necessário associá-los.

Um usuário pode ter de um a vários roles. A visibilidade de programas é resultado da soma dos programas associados a todos os seus roles.

A explicação usa a expressão “produto cartesiano”, mas logo corrige o raciocínio para indicar que, na prática, o usuário enxerga a combinação ou soma dos programas autorizados pelos seus roles.

### 6.6. Programas e roles

Os programas precisam ser associados aos roles que podem acessá-los. Portanto:

```text
Role → programas permitidos
Usuário → roles atribuídos
Resultado → programas disponíveis no menu do usuário
```

O acesso a um programa não implica necessariamente acesso irrestrito a tudo que existe dentro dele. Há camadas adicionais de restrição, especialmente para terceiros, operações e informações consultadas.

### 6.7. Parâmetros de consulta por usuário

Existe uma configuração, majoritariamente associada ao contexto antigo de Tron Web, que permite definir como cada usuário consulta informações econômicas.

A configuração pode considerar:

- companhia;
- usuário;
- moeda;
- apólice ou suplemento;
- tipo de consulta;
- tipo de cálculo;
- tipo de informação;
- possibilidade de detalhamento;
- valores líquidos ou brutos de resseguro;
- inclusão ou não de financiamento.

Nem todos os programas de consulta respeitam essas configurações.

### 6.8. Agrupamentos de usuários

A aplicação permite agrupar usuários por códigos e descrições. Esses agrupamentos podem refletir características comuns, como:

- usuários de centros de emissão;
- usuários de centros tramitadores;
- subscritores juniores;
- usuários de uma estrutura geográfica ou organizacional específica.

A reunião não estabelece uma regra única para construir esses grupos. O expositor afirma que a melhor estratégia depende da estrutura de pessoal e das necessidades de cada companhia ou país.

### 6.9. Usuários por companhia

Além do catálogo geral, há um cadastro específico por companhia.

Dados citados:

- companhia;
- chave de usuário;
- nome;
- identificador único;
- tipo e número de documento;
- e-mail corporativo;
- vínculo com terceiro nível da estrutura comercial;
- agrupamento de usuários;
- indicador de informação parcial;
- indicador de usuário de agência ou externo.

O vínculo à estrutura comercial é relevante porque pode servir de base para restringir consultas a determinadas unidades, escritórios ou estruturas de distribuição.

### 6.10. Usuários externos ou de agência

A aplicação pode identificar usuários que não pertencem diretamente à companhia seguradora.

Exemplos apresentados:

- empregados de bancos parceiros;
- empregados de concessionárias;
- empregados de empresas vinculadas a acordos comerciais.

O exemplo citado descreve a possibilidade de empregados de uma concessionária emitirem uma apólice diretamente para que o cliente retire seu veículo já segurado.

---

## 7. Modelo de integração e autenticação

### 7.1. Diretório corporativo

A transcrição menciona repetidamente o termo “edad”, possivelmente afetado por reconhecimento de voz. Pelo contexto, parece representar um diretório corporativo ou mecanismo central de identidade, mas o nome técnico exato não pode ser determinado com segurança.

Segundo a explicação:

- a carga de usuários poderia ser realizada a partir desse diretório;
- o mecanismo deveria gerenciar a autenticação de usuários;
- após a criação da identidade, ainda seria necessário associar roles e permissões dentro da aplicação;
- os roles necessários para o acesso transacional não parecem ser criados automaticamente pelo diretório.

### 7.2. Usuário de aplicação e usuário de rede

Foram citadas propriedades que determinam se o usuário de aplicação coincide ou não com o usuário de rede.

A configuração é apresentada como parte de estruturas históricas de Tron Web, com pouca relevância para o modelo mais moderno. A transcrição não detalha o funcionamento técnico atual desse mecanismo.

### 7.3. Conexão a banco de dados

Há referência a uma configuração antiga de conexão entre usuário, servidor de aplicações e banco de dados, incluindo usuário e senha de acesso ao banco.

O expositor afirma que essa abordagem está ultrapassada e sugere risco de exposição caso pessoas indevidas tivessem acesso à tabela. Também afirma que a senha poderia ser criptografada, mas não entra em detalhes sobre o mecanismo de proteção.

A reunião não permite concluir:

- qual banco de dados é usado;
- qual algoritmo de criptografia é aplicado;
- como segredos são gerenciados atualmente;
- se há rotação automática de credenciais;
- qual é o modelo atual de conexão de Neutron.

---

## 8. Controle de funcionalidades e operações

### 8.1. Controle por role

O role é o primeiro mecanismo de autorização funcional. Ele determina quais programas e capacidades gerais estarão disponíveis ao usuário.

Exemplo:

```text
Usuário com role de emissão
        ↓
Pode acessar programas associados à emissão
        ↓
Mas ainda pode estar limitado por ramo, operação ou informação
```

### 8.2. Controle por atividade de terceiros

Mesmo que um usuário tenha acesso ao programa de terceiros, ele pode não ter permissão para criar ou modificar terceiros de qualquer atividade.

A transcrição menciona que terceiros podem possuir atividades como:

- agente;
- tramitador;
- supervisor;
- procurador;
- outras atividades corporativas.

Um usuário de informática, por exemplo, poderia acessar a rotina de terceiros, mas não teria necessariamente autorização para cadastrar agentes, pois essa atividade deveria estar sob controle da área comercial.

A configuração é descrita como feita por:

```text
Companhia
+ usuário
+ código de atividade
→ permissão para atuar sobre aquele tipo de terceiro
```

### 8.3. Controle por estrutura comercial

A aplicação permite limitar o acesso de um usuário de acordo com níveis da estrutura comercial.

Foram citados:

- primeiro nível;
- segundo nível;
- terceiro nível;
- agente;
- empregado de agente.

Em uma configuração ampla, códigos genéricos podem conceder acesso a toda a estrutura. Em uma configuração específica, o usuário pode visualizar apenas apólices ligadas a determinada unidade, escritório, agente ou estrutura.

### 8.4. Controle por estrutura de produtos

Também é possível restringir acessos de acordo com a estrutura de produtos:

- setor;
- subsetor;
- ramo técnico.

Exemplos mencionados:

- vida;
- não vida;
- vida risco;
- vida poupança;
- acidentes pessoais;
- saúde.

A estrutura é configurável conforme o modelo adotado pela companhia. Portanto, os exemplos não constituem uma taxonomia obrigatória e universal.

### 8.5. Controle por ramo técnico e operação

Neutron permite controlar o acesso por ramo técnico e por operação.

A lógica apresentada é:

```text
Companhia
+ ramo técnico
+ usuário
+ operação
→ acesso permitido ou negado
```

Isso permite que um usuário acesse determinado ramo, mas não possa realizar todas as operações disponíveis para ele.

Exemplos de operações mencionadas:

- emissão de apólice a partir de orçamento;
- emissão de apólice;
- suspensão;
- resgate;
- aportação extraordinária;
- alteração de endereço sem impacto em prêmio, mediante determinado tipo de suplemento.

A reunião enfatiza que os códigos de operação são finitos e definidos pela aplicação. O administrador não cria códigos arbitrários para representar novas operações.

---

## 9. Modelo de consulta e visualização de informação

### 9.1. Visualização por apólice ou suplemento

Para determinados programas de consulta, o usuário pode ser configurado para ver informações por apólice ou por suplemento.

Exemplo apresentado:

- uma apólice de automóvel possui prêmio de mil euros;
- posteriormente, um suplemento adiciona um condutor e aumenta o prêmio em trezentos euros.

Se a consulta estiver configurada **por apólice**, o usuário verá um registro consolidado de 1.300 euros.

Se estiver configurada **por suplemento**, verá dois registros:

| Registro | Valor |
|---|---:|
| Produção inicial da apólice | 1.000 euros |
| Suplemento | 300 euros |

### 9.2. Tipo de consulta

Foram citados tipos de consulta que podem ser usados por programas que implementem essa funcionalidade:

- terceiro;
- agente;
- grupo de informação;
- estrutura comercial;
- apólice;
- grupo de contratos;
- executivo de contas.

Essas opções permitem organizar ou limitar a forma como a informação é consultada e agrupada.

### 9.3. Tipo de cálculo

Há uma configuração para exibir:

- valores da última anualidade;
- valores totais acumulados, independentemente da anualidade.

O expositor dá como exemplo novembro de 2024: a última anualidade poderia representar o período entre 1º de janeiro de 2024 e a data atual.

### 9.4. Agrupamento econômico

Em programas que suportam a funcionalidade, a informação econômica pode ser agrupada por:

- apólice;
- ramo;
- setor;
- total.

A explicação ressalta que esse tipo de recurso tinha maior relevância antes da disseminação de soluções analíticas externas à aplicação transacional.

### 9.5. Detalhamento ou drill-down

Há uma marca que pode permitir aprofundar a consulta para alcançar maior nível de detalhe.

O expositor compara esse comportamento ao drill-down de uma solução analítica, mas manifesta uma posição crítica sobre seu uso em sistemas transacionais de grande porte. A preocupação é o consumo de recursos, especialmente em companhias grandes, como o Brasil é citado como exemplo.

### 9.6. Valores líquidos ou brutos de resseguro

A consulta pode ser configurada para exibir valores:

- líquidos de resseguro;
- totais ou brutos de resseguro.

A decisão depende de como se deseja analisar os valores econômicos em contextos que envolvem cobertura ressegurada.

### 9.7. Financiamento e recargo por fracionamento

Existe uma marca relacionada à inclusão ou não de juros de financiamento nos valores consultados.

O expositor reconhece uma dúvida não resolvida durante a reunião: não confirmou se a configuração atual funciona adequadamente com planos de pagamento modernos ou se estava vinculada a um modelo anterior que dependia de suplementos para representar o fracionamento.

Esse ponto deve ser tratado como pendência técnica, não como comportamento confirmado.

---

## 10. Informação parcial

### 10.1. Finalidade

A informação parcial é uma camada de segurança que restringe a visualização ou atuação sobre dados específicos, mesmo quando o usuário já possui acesso ao programa ou à área funcional correspondente.

Ela é apresentada como um recurso especialmente associado a Neutron.

### 10.2. Dependências para funcionar

A aplicação das restrições depende de pelo menos duas condições anteriores:

1. a companhia deve estar configurada para considerar roles de informação parcial;
2. o usuário deve estar configurado de modo que a informação parcial seja aplicável a ele.

Além disso, os programas precisam implementar esse comportamento. A existência da configuração não garante efeito em todos os programas.

### 10.3. Granularidade da restrição

A reunião menciona três níveis de restrição:

| Nível | Significado |
|---|---|
| Conceito lógico | Oculta ou restringe um conjunto completo de informações, como direções ou contatos. |
| Linha | Restringe um registro específico dentro de um conjunto de dados. |
| Atributo | Restringe uma propriedade específica, como o nome da rua em uma direção. |

### 10.4. Exemplo de conceito lógico

No contexto de terceiros, poderiam existir conceitos lógicos como:

- direções/endereço;
- contatos;
- meios de cobrança e pagamento.

A transcrição afirma que um conceito lógico pode reunir dados provenientes de diferentes tabelas do modelo. O expositor compara essa ideia a uma visão, sem detalhar a implementação técnica exata.

### 10.5. Exemplo de restrição por atributo

Foi dado o exemplo, considerado pelo próprio expositor como extremo ou pouco usual, de permitir que o usuário veja uma direção, mas não o nome da rua.

Nesse caso, a restrição seria aplicada a uma propriedade específica dentro do conceito lógico de direção.

### 10.6. Exemplo de restrição por linha

O exemplo dado considera uma pessoa que pode ter várias direções:

- direção de correspondência;
- residência;
- trabalho;
- direção comercial;
- casa de praia.

A plataforma poderia permitir a visualização de algumas direções e ocultar somente uma delas, como a direção comercial.

### 10.7. Restrições por pessoa física ou jurídica

Foi apresentado um caso em que o role de informação parcial restringe contatos apenas quando o terceiro é pessoa física.

Nesse cenário:

- ao consultar uma pessoa física, o usuário não veria contatos;
- ao consultar uma pessoa jurídica, os contatos continuariam visíveis.

A transcrição indica que a configuração pode considerar:

- companhia;
- atividade do terceiro;
- role afetado;
- natureza física, jurídica ou ambas;
- conceito lógico;
- propriedade, quando aplicável;
- tipo de restrição.

### 10.8. Tipos de restrição

Os valores mencionados para o tipo de restrição foram:

- oculto;
- somente leitura;
- somente criação.

O expositor menciona um critério adotado especificamente na rotina de terceiros: se o usuário não tem acesso completo aos dados do terceiro, ele não deveria poder modificá-los. A lógica é evitar que alguém altere algo que não consegue consultar adequadamente depois.

---

## 11. Aplicações de software e responsabilidades de arquitetura

### 11.1. Catálogo de aplicações

Existe uma tabela de aplicações de software, administrada pelo time de arquitetura.

Ela contém, segundo a explicação:

- código da aplicação;
- descrição ou nomenclatura;
- URL base;
- indicador técnico relacionado a portal ou microfrontend;
- indicador de inabilitação;
- data de validade.

Exemplos de aplicações citadas na transcrição:

- GDC, descrito como gestor de conceitos ou manutenção de tabelas de configuração;
- frontal de tesouraria;
- frontal de sinistros;
- frontal de ordens de serviço.

Alguns nomes aparecem deformados pela transcrição e não devem ser tratados como identificadores oficiais sem validação adicional.

### 11.2. Limite de responsabilidade dos administradores funcionais

A reunião é clara ao afirmar que usuários de negócio ou administradores funcionais não deveriam criar aplicações arbitrárias nesse catálogo.

A criação e gestão dessas aplicações são apresentadas como responsabilidade da arquitetura.

### 11.3. Relação entre aplicações e roles de informação parcial

Depois de existirem aplicações registradas, os roles de informação parcial podem ser associados a elas.

A associação considera:

- aplicação;
- usuário;
- tipo de role;
- código do role;
- situação de inabilitação;
- data de validade.

---

## 12. Tipos corporativos de roles de informação parcial

Ao contrário dos roles funcionais gerais, que podem ser definidos com código e descrição, os tipos de roles de informação parcial são apresentados como uma lista corporativa fechada.

Foram mencionados códigos ou categorias relacionadas a:

| Tipo mencionado | Finalidade descrita |
|---|---|
| Operações | Restrições relacionadas a operações. |
| Terceiros | Restrições sobre informações de terceiros. |
| Emissão | Restrições ligadas à emissão. |
| Controle técnico | Restrições ou controles relacionados a regras técnicas. |
| Caixas | Referência a um domínio funcional de caixas. |
| Tipos de ordem de pagamento | Restrições ligadas a ordens de pagamento. |
| Conceito lógico | Restrição em nível de conceito. |
| Atributo | Restrição em nível de propriedade. |
| Linha | Restrição em nível de registro. |

A transcrição menciona valores numéricos como 01, 10, 11, 12, 13, 20, 21 e 22, mas não permite garantir a nomenclatura exata de todos eles sem acesso ao catálogo original.

---

## 13. “Objereitor” e conceitos lógicos

A reunião menciona uma facilidade interna chamada, na transcrição, de **“Objereitor”**, comparada de forma informal a “Terminator”.

Esse recurso parece servir para consultar os conceitos lógicos existentes na aplicação e suas propriedades. Ele é relevante para identificar quais informações podem ser sujeitas a restrições de informação parcial.

A transcrição não permite concluir:

- o nome oficial da ferramenta;
- se ela é uma aplicação, biblioteca, catálogo ou utilitário técnico;
- se é utilizada diretamente por usuários finais;
- como ela se relaciona tecnicamente com o banco de dados.

O ponto confirmado é que os conceitos lógicos formam uma relação finita, embora ampla, e podem representar informações originadas de diferentes estruturas do modelo de dados.

---

## 14. Modelo operacional e manutenção

### 14.1. Ordem de configuração

A reunião sugere uma sequência de configuração composta por diversos catálogos e tarefas. Embora a enumeração não tenha sido reproduzida integralmente de forma estável na transcrição, a lógica geral é:

1. criar ou carregar usuários do sistema;
2. criar roles por companhia;
3. associar roles aos usuários;
4. definir parâmetros de consulta quando aplicável;
5. configurar usuários por companhia;
6. definir agrupamentos, vínculos comerciais e características do usuário;
7. conceder acessos a atividades de terceiros;
8. configurar acessos por estrutura comercial e de produtos;
9. configurar acessos por ramo e operação;
10. configurar roles de informação parcial e suas associações.

### 14.2. Tarefas de cópia de usuário

A plataforma possui utilidades ou tarefas que permitem copiar a configuração de um usuário para outro.

O objetivo é evitar a manutenção manual de diversas tabelas quando um novo usuário deve receber uma configuração semelhante à de outro.

A reunião não detalha:

- quais tabelas são copiadas;
- se a cópia é total ou seletiva;
- como a operação é auditada;
- quais controles impedem cópias indevidas de privilégios.

### 14.3. Parâmetros Java por usuário

Foi citado um cadastro antigo de parâmetros Java por usuário, associado a Tron Web.

Exemplos citados:

- exercício contábil do usuário;
- companhia padrão;
- imagem de fundo da aplicação;
- valor de uma variável configurável.

O expositor reconhece que parte desses parâmetros parece antiga ou de menor importância atual, mas destaca que alguns ainda podem ter significado funcional, como o exercício contábil e a companhia padrão.

---

## 15. Governança e responsabilidades

### 15.1. Recursos Humanos

O expositor considera que Recursos Humanos deveria ser responsável pela informação básica de usuários, como:

- entradas;
- saídas;
- alterações de vínculo;
- identificação das pessoas.

A visão apresentada é que RH tende a possuir a informação mais atualizada sobre quem trabalha na organização.

### 15.2. Gestores de área

Os gestores devem definir quais roles seus colaboradores precisam.

Exemplos:

- o gestor de uma área técnica decide qual perfil cabe a um atuário;
- o gestor de sinistros decide permissões ligadas a tramitadores ou supervisores;
- a área comercial deve controlar permissões relacionadas a agentes.

### 15.3. Segurança corporativa

A reunião menciona a direção de segurança e meio ambiente da MAPFRE, referida como “DISMA” na transcrição.

Segundo a explicação, a política de segurança deveria impedir o uso de usuários genéricos e exigir usuários nominais para garantir rastreabilidade das operações.

### 15.4. Tecnologia e informática

A área de informática não deveria decidir sozinha os acessos funcionais de negócio.

O expositor é enfático ao afirmar que a responsabilidade por determinar “quem faz o quê” não deveria recair sobre tecnologia, especialmente sobre profissionais externos à companhia.

Tecnologia e arquitetura aparecem como responsáveis por:

- manter componentes técnicos;
- administrar aplicações e seus catálogos;
- suportar a configuração;
- garantir a infraestrutura necessária;
- não substituir a decisão de negócio sobre permissões.

---

## 16. Usuários genéricos e rastreabilidade

A reunião reconhece uma tensão entre a política desejada e a realidade operacional.

### Posição recomendada

O ideal, segundo o expositor, é que cada pessoa utilize um usuário nominal, por razões de:

- rastreabilidade;
- segurança;
- responsabilização por operações;
- aderência a políticas corporativas.

### Situação reconhecida

Apesar disso, foram mencionados usuários genéricos de administração, como “Tron Web” ou equivalente, usados por várias pessoas para facilitar o acesso completo ao ambiente.

O expositor reconhece que esses usuários existem “em todos os lados”, embora isso não seja apresentado como prática recomendada.

### Implicação analítica

Há uma diferença entre a política de segurança desejada e práticas administrativas historicamente toleradas. Essa diferença representa risco potencial de auditoria e de rastreabilidade, embora a reunião não detalhe controles compensatórios, planos de eliminação de contas genéricas ou evidências de incidentes.

---

## 17. Casos concretos e exemplos apresentados

### 17.1. Porto Rico e preferência de idioma

O exemplo foi usado para explicar que um mesmo sistema pode atender usuários com preferências linguísticas diferentes, como espanhol e inglês.

### 17.2. Parceiros bancários

A aplicação pode ser utilizada por pessoal de bancos parceiros, como Banco Santander, Banco Río de la Plata ou outros bancos hipotéticos mencionados.

Essas pessoas podem não possuir o identificador corporativo padrão da MAPFRE, mas ainda assim podem ter um código de usuário na aplicação.

### 17.3. Concessionária Toyota

Foi apresentado um cenário hipotético de parceria com a Toyota, em que empregados de concessionárias poderiam acessar a aplicação para emitir apólices diretamente no momento da venda ou retirada de veículos.

O exemplo serve para explicar a existência de usuários externos ou de agência.

### 17.4. Restrição de seguro de veículo

O exemplo de uma companhia com alta sinistralidade ilustra o uso de controles técnicos e níveis de autorização:

```text
Alta sinistralidade
        ↓
Decisão de restringir determinada contratação
        ↓
Controle técnico bloqueia a emissão
        ↓
Usuário autorizado pode aprovar exceção, quando justificada
```

### 17.5. Comissões de agentes

O exemplo reforça que dados econômicos, como comissões, devem ser acessíveis apenas a grupos específicos, como determinados profissionais de administração e finanças.

### 17.6. Restrição de contatos de pessoas físicas

O exemplo demonstra uma regra de informação parcial em que contatos de pessoas físicas seriam ocultados, mas contatos de pessoas jurídicas poderiam continuar visíveis.

---

## 18. Perguntas e respostas relevantes

### Pergunta: é possível ter níveis de usuário, como subscritor júnior e sênior?

**Resposta:** o expositor afirma que isso pode ser modelado por meio de classificação, códigos ou outros campos, mas não como um “nível” simples nativamente associado ao role da forma proposta.

**O que esclarece:** o modelo não parece possuir, pelo menos no trecho apresentado, uma hierarquia automática de níveis de usuário. A diferenciação depende de configuração de roles, classificações e outros atributos.

---

### Pergunta: o usuário precisa estar cadastrado em NUMA para acessar o sistema?

**Resposta:** não necessariamente. É possível utilizar outro código, embora o NUMA seja o mais lógico para usuários corporativos. Usuários externos, como empregados de bancos parceiros, podem utilizar identificadores diferentes.

**O que esclarece:** a identidade no sistema não está estritamente limitada ao identificador corporativo interno.

---

### Pergunta: os roles são atribuídos às pessoas individualmente? Quem não recebe determinado role deixa de ver o módulo?

**Resposta:** sim. Os roles são atribuídos a usuários e, por trás deles, há associação com programas. O usuário vê a soma dos programas permitidos pelos roles que possui.

**O que esclarece:** a visibilidade de menus e programas é controlada por roles, não apenas por um cadastro estático de menu.

---

### Pergunta: roles podem conter controles ou regras de negócio associadas?

**Resposta:** é possível associar níveis de autorização a controles técnicos. Um usuário pode executar uma operação, mas somente alguns roles podem autorizar exceções a determinadas regras.

**O que esclarece:** o role pode ter papel não apenas na navegação e execução, mas também na autorização de exceções operacionais.

---

### Pergunta: as propriedades técnicas são preenchidas automaticamente quando o usuário é criado?

**Resposta:** em geral, sim. O expositor explica que determinados valores podem ser carregados por padrão, mas que historicamente havia várias tabelas e programas de manutenção separados.

**O que esclarece:** há automação ou cargas padrão em parte do processo, mas o modelo contém configurações legadas que podem exigir manutenção específica.

---

### Pergunta implícita: por que existem tantas tabelas e parâmetros antigos?

**Resposta:** porque a aplicação evoluiu ao longo de décadas. Parte das configurações foi criada em um período em que o sistema transacional também era usado para consultas gerenciais e possuía uma arquitetura diferente.

**O que esclarece:** nem toda estrutura existente deve ser interpretada como arquitetura atual recomendada; algumas são heranças históricas.

---

## 19. Limitações reconhecidas

### 19.1. Nem todos os programas respeitam todas as configurações

A reunião repete que algumas configurações de consulta e informação parcial só funcionam em programas que foram implementados para suportá-las.

### 19.2. Recursos históricos podem estar obsoletos

Foram explicitamente tratados como defasados ou com pouco uso atual:

- configurações de Tron Web;
- listagens geradas a partir de telas;
- alguns parâmetros Java por usuário;
- mecanismos antigos de conexão com banco;
- consultas analíticas no transacional;
- determinados controles ligados a sistemas operacionais antigos.

### 19.3. Dúvida sobre juros de financiamento

O expositor não confirma o comportamento da configuração de financiamento com os planos de pagamento atuais.

### 19.4. Não existe resposta única para agrupamentos de usuários

A melhor forma de agrupar usuários depende do país, companhia, estrutura de pessoal e necessidade operacional.

### 19.5. Acesso por informações parciais depende de múltiplos pré-requisitos

Uma restrição de informação parcial não funciona apenas porque o role foi criado. Ela depende de:

- configuração da companhia;
- configuração do usuário;
- configuração do role;
- associação ao conceito lógico;
- associação ao contexto funcional;
- implementação do suporte pelo programa.

### 19.6. A transcrição não confirma a configuração real do ambiente

Muitos exemplos foram apresentados de forma didática, hipotética ou demonstrativa. Eles não comprovam que determinada companhia, país ou ambiente produtivo esteja configurado exatamente daquela maneira.

---

## 20. Riscos e desafios

### 20.1. Riscos explicitamente mencionados

| Risco ou preocupação | Contexto |
|---|---|
| Falta de rastreabilidade | Uso de usuários genéricos de administração. |
| Acesso indevido a informação | Usuários vendo dados de comissões, folha, terceiros ou outras áreas sem necessidade. |
| Sobrecarga de recursos | Drill-down e consultas detalhadas em ambiente transacional de grande porte. |
| Administração inadequada de acessos | Tecnologia ou pessoas externas definindo permissões de negócio. |
| Exposição de credenciais | Configuração antiga envolvendo usuário e senha de banco de dados. |
| Complexidade de manutenção | Muitas tabelas e configurações dependentes entre si. |

### 20.2. Desafios derivados do contexto

> **Leitura analítica, não afirmação literal da reunião.**

A arquitetura apresentada parece exigir governança rigorosa porque a segurança é distribuída entre diversos cadastros. Uma alteração isolada pode não produzir efeito se outras configurações dependentes não estiverem alinhadas.

Também existe potencial para excesso de privilégios quando se utiliza cópia de usuários, roles muito amplos ou códigos genéricos para conceder acesso total. A transcrição não relata incidentes nem falhas concretas, mas a combinação de granularidade elevada, estruturas legadas e contas genéricas torna esse tipo de risco plausível.

---

## 21. Transformações identificadas

### 21.1. De permissões amplas para controle granular

A reunião apresenta uma evolução de autorização baseada apenas em acesso geral para um modelo com controles por:

- programa;
- atividade;
- estrutura comercial;
- produto;
- ramo;
- operação;
- conceito lógico;
- linha;
- atributo.

### 21.2. De análise no transacional para análise em soluções especializadas

O expositor indica que funcionalidades antigas de consulta, agrupamento e detalhamento tinham maior importância décadas atrás, quando soluções analíticas eram menos disseminadas.

A direção atual sugerida é usar ferramentas analíticas externas ao transacional para consultas de gestão e detalhe econômico.

### 21.3. De manutenção técnica isolada para governança compartilhada

A reunião defende que a definição de acessos não seja tratada apenas como tarefa técnica. A segurança depende de decisões compartilhadas entre RH, gestores, segurança, arquitetura e áreas operacionais.

### 21.4. De acesso simples a controles condicionais

O modelo não se limita a permitir ou negar o acesso. Ele pode condicionar o acesso conforme:

- companhia;
- função;
- estrutura organizacional;
- tipo de terceiro;
- ramo;
- operação;
- tipo de pessoa;
- atributo específico da informação.

---

## 22. O que a reunião não permite concluir

A transcrição não detalha suficientemente os seguintes pontos:

- tecnologia de cloud utilizada;
- banco de dados utilizado;
- mecanismo de autenticação exato associado ao termo “edad”;
- uso ou não de LDAP, Active Directory ou outro diretório específico;
- arquitetura de microsserviços;
- mecanismo de mensageria ou eventos;
- APIs expostas ou consumidas;
- estratégia de CI/CD;
- modelo de versionamento;
- modelo de IAM corporativo;
- MFA;
- segregação de ambientes;
- auditoria de concessão e revogação de acessos;
- SLA de suporte;
- processo de revisão periódica de roles;
- política formal de contas genéricas;
- criptografia exata de senhas;
- gestão de segredos;
- recuperação de desastre;
- disponibilidade;
- tenancy;
- métricas de segurança;
- integração técnica entre Neutron, Tron Web e os frontais citados;
- roadmap de descontinuação de componentes legados;
- responsáveis nominais pelos catálogos;
- lista completa de operações, atividades, tipos de role e conceitos lógicos.

---

## 23. Conclusões

O sistema de segurança apresentado é um modelo de autorização altamente configurável, projetado para controlar tanto o acesso a funcionalidades quanto o acesso a dados em uma plataforma de seguros complexa.

A estrutura combina usuários, roles, programas, atividades, estruturas comerciais, produtos, ramos, operações e regras de informação parcial. Isso permite atender cenários sofisticados, como separar acessos entre áreas, parceiros externos, agentes, subscritores, usuários financeiros e usuários de sinistros.

Ao mesmo tempo, a reunião evidencia que o modelo carrega elementos históricos, especialmente em Tron Web, que precisam ser compreendidos sem serem automaticamente tratados como referência arquitetural moderna. A operação segura depende de coordenação entre áreas de negócio, Recursos Humanos, segurança, arquitetura e tecnologia.

A principal conclusão prática é que a configuração de acessos deve ser tratada como processo de governança, e não como simples cadastro técnico. Em especial, a atribuição de roles, a limitação de operações sensíveis, a aplicação de informação parcial e a eliminação ou controle de usuários genéricos são elementos centrais para garantir rastreabilidade, segregação de funções e proteção de dados.
