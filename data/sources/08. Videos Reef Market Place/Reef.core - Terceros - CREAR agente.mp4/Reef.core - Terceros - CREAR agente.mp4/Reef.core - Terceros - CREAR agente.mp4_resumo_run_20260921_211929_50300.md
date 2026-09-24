# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.core - Terceros - CREAR agente.mp4.mp4`
**Data de processamento:** 21/09/2026 21:24:38
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada — Treinamento do módulo de terceiros: criação de agentes intermediários

> **Base documental e ressalvas de fidelidade**  
> Esta análise foi produzida exclusivamente a partir da transcrição fornecida. O material apresenta ruídos relevantes de reconhecimento de voz, repetições automáticas, interrupções de áudio e variações na grafia de termos.  
>
> A plataforma é registrada como **“RISCOR”** e também como **“Riftcore”** em diferentes trechos; não há evidência suficiente para determinar a denominação correta. O texto preserva essa incerteza e usa a expressão **plataforma** quando a identificação inequívoca não é necessária.  
>
> Também aparece a referência a uma entidade grafada como **“MAFRE”**. Embora possa haver erro de transcrição, esta análise não corrige o nome sem confirmação na própria reunião.

## 1. Síntese executiva

A reunião consiste em uma sessão de formação sobre o **módulo de terceiros** de uma plataforma usada no contexto de uma companhia de seguros. O foco específico do encontro é o início do processo de criação de um **agente intermediário comercial**, tratado no sistema como um tipo de terceiro associado à **atividade 2**.

A principal mensagem apresentada é que o cadastro de um agente não deve ser entendido apenas como o preenchimento de uma tela específica. Ele é composto por blocos de informação comuns a diferentes tipos de terceiros — como segurados, advogados, clínicas, beneficiários e outros — e por informações específicas da atividade de agente, que seriam abordadas em continuidade posterior do treinamento.

O instrutor demonstra como a plataforma estrutura o cadastro em blocos, explica que parte das validações depende da atividade atribuída ao terceiro, do tipo de documento selecionado, da natureza física ou jurídica da pessoa e de parametrizações locais. Também destaca que determinados campos e recursos existem na solução, mas sua utilidade depende de cada companhia utilizar, manter e incorporar esses dados aos seus processos operacionais.

A sessão cobre, principalmente:

- dados básicos e identificação inicial do terceiro;
- reutilização de informações quando o mesmo terceiro já existe em outra atividade;
- diferenciação entre pessoa física e pessoa jurídica;
- identificação única corporativa;
- classificação de pessoa politicamente exposta;
- dados documentais e validações;
- contatos;
- endereços.

A formação é interrompida antes da conclusão do processo. O instrutor informa que a continuação ocorrerá no dia **28**, a partir do bloco de endereços, seguindo para documentos alternativos e, posteriormente, para as informações específicas do agente, como fontes de produção, escritórios habilitados, quadros de comissão e possíveis subvenções.

---

## 2. Contexto e antecedentes

A reunião retoma uma formação anterior ou uma trilha de capacitação já em andamento. O participante que conduz a sessão informa que o encontro faz parte da formação do módulo de terceiros e que o objetivo do dia é abordar, de forma mais prática e interativa, a criação de agentes intermediários comerciais de uma companhia de seguros.

A proposta declarada não é exclusivamente teórica. O instrutor alterna entre:

1. a documentação disponibilizada em um ambiente denominado marketplace;
2. a navegação pela plataforma;
3. explicações sobre regras de negócio e parametrizações;
4. demonstrações de comportamento da aplicação.

O cadastro de terceiros é apresentado como uma capacidade transversal da solução. Embora o treinamento do dia tenha como caso de uso a criação de um agente, os blocos básicos de dados não pertencem exclusivamente à operação de agentes. Eles podem ser utilizados no cadastro de outros papéis ou atividades de terceiros.

Essa abordagem sugere que a plataforma possui um modelo compartilhado de cadastro, no qual uma mesma pessoa ou entidade pode exercer mais de uma atividade perante a seguradora.

---

## 3. Objetivo declarado da sessão

O objetivo imediato era demonstrar a criação de um agente comercial, entendido como terceiro da atividade 2.

A intenção pedagógica era fazer com que os participantes compreendessem:

- quais blocos de informações fazem parte do cadastro;
- quais informações são comuns a todos os terceiros;
- quais regras variam conforme a atividade do terceiro;
- quais diferenças surgem quando o terceiro é pessoa física ou pessoa jurídica;
- como a plataforma se comporta quando o terceiro já existe em outra atividade;
- quais aspectos dependem de configuração e de adoção local.

A reunião não conclui todo o fluxo de criação do agente. Ela chega aos blocos compartilhados de contatos e endereços, deixando explícito que a parte específica da atividade de agente seria tratada posteriormente.

---

## 4. Modelo conceitual apresentado

### 4.1. Agente como um terceiro

O instrutor afirma que um agente, seja pessoa física ou pessoa jurídica, é tratado como um terceiro na plataforma. A classificação como agente decorre da atividade atribuída ao registro, indicada como **atividade 2**.

Assim, o modelo apresentado pode ser entendido da seguinte forma:

```text
Terceiro
├── Identificação básica
├── Dados de pessoa física ou jurídica
├── Classificações e informações de conformidade
├── Contatos
├── Endereços
├── Documentos complementares
├── Representantes legais
├── Acionistas, quando aplicável
├── Meios de cobrança e pagamento
└── Atividades exercidas perante a companhia
    ├── Agente — atividade 2
    ├── Segurado
    ├── Advogado
    ├── Clínica
    ├── Beneficiário
    └── Outras atividades mencionadas genericamente
```

Essa representação é uma consolidação analítica baseada na explicação do treinamento; não foi exibida literalmente como diagrama.

### 4.2. Blocos compartilhados e blocos específicos

A plataforma divide a informação em blocos. Parte deles é compartilhada por qualquer terceiro, independentemente da atividade. Outros campos, painéis, validações ou blocos aparecem apenas quando determinadas condições são satisfeitas.

O instrutor reforça que a disponibilidade e a obrigatoriedade dos campos podem variar conforme:

- atividade do terceiro;
- tipo de documento;
- pessoa física ou pessoa jurídica;
- configuração de país;
- personalizações locais;
- parâmetros da companhia.

Portanto, a presença de um campo na plataforma não significa que ele será necessariamente solicitado em todos os cadastros.

---

## 5. Problemas e necessidades abordados

Embora a reunião tenha caráter de treinamento, ela evidencia diversas necessidades operacionais e de controle.

### 5.1. Evitar múltiplos registros do mesmo terceiro

Um problema tratado explicitamente é a possibilidade de uma mesma pessoa ou entidade já existir no sistema vinculada a outra atividade.

O exemplo utilizado é o de uma pessoa identificada por determinado documento que já esteja cadastrada como segurado e que passe a precisar ser criada também como agente. A plataforma detecta a existência prévia do documento e permite ao usuário:

- ignorar a informação existente e continuar;
- consultar o terceiro na atividade em que já está registrado;
- transferir ou reaproveitar as informações para a nova atividade;
- cancelar o procedimento.

A necessidade subjacente é reduzir a duplicação de dados e permitir que um mesmo terceiro tenha diferentes vínculos de negócio sem ser necessariamente registrado como pessoas distintas.

### 5.2. Manter identidade consistente entre sistemas

A apresentação diferencia dois identificadores:

- o código do terceiro utilizado dentro da plataforma;
- um identificador único do terceiro, potencialmente válido para várias aplicações da companhia.

O instrutor explica que o identificador único pode apoiar uma visão transversal do terceiro, evitando que uma mesma pessoa seja contada várias vezes em sistemas ou atividades diferentes.

A relação de causa e efeito apresentada pode ser sintetizada assim:

```text
Múltiplas aplicações e múltiplas atividades
↓
Risco de duplicidade e visão fragmentada do terceiro
↓
Necessidade de identificador comum
↓
Identificador único corporativo, quando configurado
```

### 5.3. Adequar o cadastro às características legais e operacionais locais

A reunião destaca que existem dados que dependem do país, da legislação e da prática de cada entidade local. São mencionados, entre outros:

- tipos de documentos;
- documentos identificadores principais;
- códigos postais e estrutura geográfica;
- validação documental por serviços web;
- regime fiscal;
- atividades econômicas;
- dados ligados a residência ou nacionalidade;
- classificações e catálogos locais.

O instrutor ressalta que o núcleo da solução permite comportamentos diversos, mas que há espaço para personalizações locais. A expressão utilizada indica que o núcleo “permite tudo”, enquanto as entidades podem impor obrigatoriedades ou comportamentos adicionais de acordo com necessidades locais.

### 5.4. Garantir qualidade e uso efetivo dos dados

Diversas vezes é enfatizado que registrar um dado não tem valor se a companhia não o utilizar e manter ao longo do tempo.

Esse ponto aparece em exemplos como:

- data de validade de documentos;
- contatos verificados;
- endereço inabilitado;
- perfil financeiro;
- dados de residência;
- campos de classificação.

A preocupação apresentada não é apenas técnica. Trata-se de uma questão de operação e governança de dados: capturar informação sem processo de manutenção, sem uso em decisões ou sem respeito às marcações de validade pode gerar inconsistência operacional.

---

## 6. Solução apresentada: cadastro modular de terceiros

A solução mostrada é um fluxo de cadastro baseado em blocos de informação, com regras condicionais e parametrizáveis.

O processo não é apresentado como uma sequência rigidamente obrigatória na interface. O instrutor comenta que tentou organizar uma sequência lógica para fins de documentação e treinamento, mas que o usuário pode navegar pelos blocos em outra ordem. Ainda assim, ao validar cada bloco, o sistema sinaliza a ausência de informações obrigatórias.

### 6.1. Fluxo lógico consolidado

```text
Criação do terceiro/agente
↓
Dados básicos
↓
Verificação de existência em outras atividades
↓
Identificação e classificação da pessoa
↓
Informações documentais e de conformidade
↓
Contatos
↓
Endereços
↓
Demais blocos comuns
↓
Informações específicas do agente
    ├── Fontes de produção habilitadas
    ├── Escritórios habilitados
    ├── Quadros de comissão
    └── Possíveis subvenções
```

A parte final, específica do agente, é citada mas não demonstrada em detalhe na sessão transcrita.

---

## 7. Arquitetura funcional reconstruída

A reunião não descreve arquitetura tecnológica detalhada — como bancos de dados, microsserviços, eventos, mensageria, infraestrutura ou nuvem. O que ela permite reconstruir é uma arquitetura funcional e de configuração.

```text
Marketplace / documentação
        ↓
Módulo de terceiros da plataforma
        ↓
Rotina de criação e manutenção de terceiros
        ↓
Blocos compartilhados
├── Dados básicos
├── Identificação do terceiro
├── Pessoa politicamente exposta
├── Contatos
├── Endereços
├── Documentos alternativos
├── Representantes legais
├── Acionistas
└── Meios de cobrança e pagamento
        ↓
Blocos condicionais
├── Pessoa física
├── Pessoa jurídica
├── Tipo de documento
├── Atividade
├── Configuração da companhia
└── Personalizações locais
        ↓
Informações específicas da atividade de agente
├── Fontes de produção
├── Escritórios
├── Comissões
└── Subvenções, quando utilizadas
```

> **Limite da evidência:** essa estrutura é uma interpretação funcional da demonstração. A transcrição não permite identificar a implementação técnica interna dos componentes.

---

## 8. Blocos de informação comuns mencionados

O instrutor enumera blocos de informação comuns aos terceiros. Alguns são detalhados durante a sessão; outros apenas são citados.

| Bloco | Situação na reunião | Finalidade descrita |
|---|---|---|
| Dados básicos | Demonstrado | Identificação inicial e vínculo com atividade |
| Identificação do terceiro | Demonstrado | Dados pessoais, jurídicos, documentais e classificatórios |
| Pessoa politicamente exposta | Demonstrado | Registro da condição de PEP ou de vínculo com PEP |
| Contatos | Demonstrado | Registro e classificação de meios de contato |
| Endereços | Demonstrado parcialmente | Registro, classificação e validade de endereços |
| Documentos alternativos | Citado | Complementar documentos de identificação |
| Representantes legais | Citado | Informação sobre representantes, sem detalhamento |
| Acionistas | Citado e demonstrado condicionalmente | Disponível para pessoa jurídica |
| Meios de cobrança e pagamento | Citado | Bloco de informação, sem detalhamento funcional |
| Informações específicas do agente | Citado para continuação | Fontes de produção, escritórios, comissões e subvenções |

---

## 9. Dados básicos

### 9.1. Conteúdo do bloco

O primeiro bloco trata da identificação inicial do terceiro. Entre os elementos destacados estão:

- tipo de documento;
- código ou chave do documento;
- atividade do terceiro;
- código do terceiro.

A atividade 2 é associada aos agentes. O instrutor afirma que os códigos de atividade de 1 a 99, além do código 999, são reservados pelo núcleo da plataforma, embora isso não impeça a existência de atividades específicas criadas localmente em alguns países.

### 9.2. Imutabilidade após a criação

A reunião afirma que os dados básicos principais, uma vez criados, não poderão ser modificados. O instrutor se refere a quatro campos principais, mas a transcrição não permite afirmar com total segurança quais são esses quatro campos além do conjunto apresentado no bloco.

A interpretação mais segura é que o tipo de documento, a chave do documento, a atividade e o código do terceiro fazem parte do núcleo identificador cuja alteração posterior é restringida.

### 9.3. Código do terceiro

O código do terceiro é apresentado como um identificador interno que facilita a captura e a consulta da pessoa na plataforma. Ele é distinto do tipo e da chave do documento.

O instrutor comenta que esse código pode ser informado manualmente e sugere que, em determinadas configurações, também poderia ser atribuído automaticamente pela própria plataforma.

---

## 10. Reutilização de terceiros entre atividades

### 10.1. Detecção de cadastro já existente

Ao tentar cadastrar um terceiro com documento já existente, o sistema pode emitir um alerta. Segundo a explicação, o comportamento de disparar ou não o alerta é parametrizável para determinados atributos.

O alerta indica que aquele terceiro já existe sob outra atividade. No exemplo, o registro existente está associado a um segurado.

### 10.2. Opções demonstradas

O usuário pode:

1. **Continuar sem considerar o cadastro anterior**  
   Prossegue com a criação da nova atividade sem aproveitar os dados existentes.

2. **Consultar os dados existentes**  
   Permite verificar o registro já associado ao mesmo documento.

3. **Selecionar e transferir informações**  
   Reaproveita a informação já registrada na atividade anterior para a atividade que está sendo criada.

4. **Cancelar**  
   Interrompe a operação.

### 10.3. O que isso esclarece

Esse mecanismo indica que a plataforma permite coexistência de múltiplas atividades para uma mesma pessoa ou entidade. A atividade não substitui a identidade do terceiro; ela representa um vínculo ou papel adicional associado àquele terceiro.

> **Leitura analítica:** a funcionalidade sugere uma tentativa de conciliar reutilização de dados com autonomia por atividade. A transcrição, contudo, não detalha se todos os dados são compartilhados, copiados ou mantidos de forma independente após a transferência.

---

## 11. Tipo de documento e natureza da pessoa

### 11.1. Relação entre tipo de documento e pessoa física/jurídica

A classificação como pessoa física ou jurídica não depende apenas da atividade. Ela também pode ser influenciada pela configuração do tipo de documento.

A explicação apresentada é:

- alguns tipos de documentos servem apenas para pessoas físicas;
- alguns servem apenas para pessoas jurídicas;
- outros podem ser usados para ambas.

Quando o tipo de documento é configurado para suportar as duas naturezas, a plataforma permite que o usuário indique se o terceiro é pessoa física ou jurídica.

### 11.2. Exemplo apresentado: DNI e NIF

A reunião usa os termos **DNI** e **NIF** como exemplos.

- O DNI é demonstrado como documento associado exclusivamente a pessoa física.
- O NIF é demonstrado como um tipo de documento que pode permitir pessoa física ou jurídica.

Não é possível concluir que essa configuração seja universal para todos os países ou ambientes. O instrutor apresenta o comportamento como resultado da configuração adotada no sistema demonstrado.

### 11.3. Efeito nos blocos disponíveis

A natureza física ou jurídica altera os painéis e campos disponíveis.

Exemplos informados:

| Situação | Efeito citado |
|---|---|
| Pessoa física | Exibição de estado civil e dados pessoais associados |
| Pessoa jurídica | Exibição de informações societárias e possibilidade de acionistas |
| Documento exclusivamente físico | Não disponibiliza escolha de natureza jurídica |
| Pessoa jurídica | Habilita bloco de acionistas |
| Pessoa física | Não exibe bloco de acionistas |

---

## 12. Identificador único do terceiro

### 12.1. Finalidade

O identificador único do terceiro é apresentado como um campo que pode ser usado para identificar a mesma pessoa ou entidade de forma consistente em várias aplicações da companhia.

Ele não substitui o código de terceiro específico da plataforma. O instrutor diferencia explicitamente:

- **código do terceiro:** identificador próprio da plataforma;
- **ID único:** identificador transversal, potencialmente válido em outras aplicações.

### 12.2. Configuração e implementação

Segundo a explicação, a utilização do ID único depende de um parâmetro definido na tabela ou configuração da companhia.

Quando esse parâmetro está ativo, a área de tecnologia e processos precisa implementar e desenvolver um componente de software responsável por gerar a codificação e preencher o campo automaticamente.

Portanto, a funcionalidade não é apresentada como completamente automática por padrão. Ela depende de:

1. habilitação por configuração;
2. desenvolvimento local de componente responsável pela codificação;
3. utilização efetiva desse identificador pelas demais aplicações.

### 12.3. Implicação de negócio

O instrutor usa como exemplo a consolidação de clientes em uma visão corporativa. Caso uma mesma pessoa possua NIF, DNI e passaporte, todos associados à mesma identidade principal, a companhia poderia contar uma única pessoa em vez de interpretar cada documento como um cliente diferente.

---

## 13. Pessoa politicamente exposta

### 13.1. Condição registrada

A plataforma permite identificar se o terceiro é uma pessoa politicamente exposta. Quando essa condição é marcada, um painel complementar é habilitado.

A reunião não apresenta regras de bloqueio, aprovação, monitoramento ou tratamento de risco decorrentes dessa classificação. Ela se restringe à capacidade de registrar a informação.

### 13.2. Relação direta ou indireta

O instrutor explica que o registro pode indicar:

- que o próprio terceiro é pessoa politicamente exposta;
- que o terceiro tem relação com familiar ou colaborador associado a uma pessoa politicamente exposta.

São mencionados dados como:

- tipo e chave de documento da pessoa relacionada;
- data;
- cargo;
- relação com o cargo ou pessoa exposta.

O exemplo citado menciona um cargo relacionado ao tribunal supremo, mas deve ser entendido apenas como ilustração da demonstração.

### 13.3. Limitação apresentada

O painel não é multirregistro. Conforme informado, só é possível identificar uma pessoa ou relação nesse contexto.

Essa é uma limitação funcional relevante: a transcrição não permite concluir como o sistema trata situações em que o terceiro possua vínculos com mais de uma pessoa politicamente exposta.

---

## 14. Dados documentais e validação

### 14.1. Informações mencionadas

No bloco de identificação, podem ser registrados dados como:

- data de emissão do documento;
- data de validade;
- país emissor;
- indicação de documento verificado;
- data de verificação;
- observações;
- outras classificações associadas ao terceiro.

### 14.2. País emissor

O país emissor do documento é apresentado como relevante em situações nas quais a seguradora se relaciona com pessoas que residem ou possuem bens em um país, mas foram identificadas por documentos emitidos em outro.

O exemplo usado é o de uma pessoa dos Estados Unidos vivendo em Puerto Vallarta, no México.

### 14.3. Serviços de validação documental

O instrutor afirma que, em alguns países, podem existir serviços web para validar documentos ou retornar códigos verificadores. A plataforma permite que esse tipo de validação seja utilizado.

No entanto, a reunião não detalha:

- quais países possuem esses serviços;
- quais documentos podem ser validados;
- qual protocolo técnico é usado;
- se a chamada é síncrona ou assíncrona;
- como falhas são tratadas;
- como o resultado é armazenado ou auditado.

### 14.4. Conhecimento do cliente

A marcação de verificação é relacionada pelo instrutor ao conceito de **Know Your Client**, no contexto de entidades financeiras.

A reunião não especifica obrigações regulatórias, fluxo de aprovação, periodicidade de revisão nem regras de impedimento de negócio vinculadas a essa verificação.

---

## 15. Informações de pessoa física e pessoa jurídica

### 15.1. Pessoa física

Para pessoas físicas, são citados campos como:

- tratamento;
- nome e segundo nome;
- primeiro e segundo sobrenomes;
- sobrenome de casado;
- estado civil;
- nome do cônjuge;
- data de nascimento;
- data de falecimento;
- início de residência;
- nacionalidade;
- tipo de nacionalidade;
- país de nascimento;
- estado, província e localidade;
- idioma preferencial;
- gênero;
- percentual de deficiência;
- profissão;
- ocupação;
- empresa em que trabalha;
- tipo de emprego;
- renda mensal;
- escolaridade;
- perfil financeiro;
- atividade principal.

A disponibilidade e obrigatoriedade desses campos podem variar conforme atividade, natureza do terceiro e parametrizações locais.

### 15.2. Pessoa jurídica

Para pessoas jurídicas, a reunião cita:

- nome ou razão social;
- tipo societário;
- código societário para processos de grupo;
- atividade econômica;
- tipologia de atividade econômica;
- fólio registral;
- data de constituição;
- acionistas.

O instrutor comenta que algumas classificações são corporativas, enquanto outras podem depender de tabelas configuradas localmente.

### 15.3. Dados societários e grupos

É mencionado um campo relativo à consideração do terceiro em processos de grupo e um possível apoio a conciliações corporativas. Porém, a apresentação ressalta que nem todas as companhias capturam essas informações na origem.

> **Limite da evidência:** a transcrição não permite determinar os processos corporativos concretos que utilizam esse dado, nem se sua utilização é obrigatória.

---

## 16. Contatos

### 16.1. Finalidade

O bloco de contatos permite registrar um ou mais meios de contato associados ao terceiro.

O instrutor afirma que os contatos podem ser usados tanto para uma pessoa física quanto para uma pessoa jurídica. No caso de uma corretora, por exemplo, podem ser registrados contatos de pessoas físicas vinculadas à entidade, como secretária, diretor comercial, presidente ou proprietário.

### 16.2. Elementos mencionados

O registro de contato pode conter:

- uso do meio de contato;
- sequência atribuída pelo sistema;
- tipo de meio de contato;
- valor do contato;
- data de validade;
- relação da pessoa de contato com o terceiro;
- cargo ou atividade da pessoa;
- indicação de validação;
- observações;
- marcação de contato prioritário;
- marcação de contato padrão por tipo.

### 16.3. Usos e tipos de contato

A reunião diferencia o uso do contato de seu tipo.

Exemplos de uso mencionados:

- pessoal;
- trabalho;
- principal;
- assistente;
- familiar;
- bancário;
- comercial.

Exemplos de tipo de contato mencionados:

- telefone;
- correio eletrônico;
- WhatsApp.

### 16.4. Prioridade e padrão

A formação explica duas noções diferentes:

- **contato prioritário:** deve haver apenas um para o terceiro;
- **contato padrão por tipo:** utilizado como valor padrão para determinado tipo de meio de contato.

O instrutor demonstra que, se for marcada uma informação como padrão em uma classificação inadequada ou se não existir um padrão para o tipo exigido, o sistema pode gerar validação ao tentar criar o registro.

### 16.5. Verificação de contatos

A plataforma permite registrar se o contato foi verificado e incluir observações sobre a verificação. O exemplo citado é a consulta a páginas amarelas telefônicas para verificar se um telefone corresponde à realidade.

A mensagem central é que marcar o contato como verificado sem usar essa informação nos processos não produz valor operacional.

---

## 17. Endereços

### 17.1. Finalidade

O bloco de endereços serve para registrar e classificar todos os endereços de um terceiro.

A demonstração ainda não é concluída, pois a continuidade seria retomada a partir desse ponto no encontro seguinte. Mesmo assim, diversos atributos e regras são explicados.

### 17.2. Sequência de captura configurável

A plataforma pode trabalhar com duas sequências de captura, configuradas por parâmetros da companhia:

1. informar primeiro o código postal e obter dados da localização;
2. informar primeiro os dados de localização e derivar o código postal.

O instrutor ressalta que a escolha depende do país e de sua capacidade de automatizar ou estruturar esse tipo de informação.

### 17.3. Dados mencionados

Os atributos apresentados incluem:

- uso do endereço;
- sequência automática;
- país;
- estado;
- província;
- cidade;
- distrito;
- código postal;
- tipo de via;
- endereço;
- número;
- complemento;
- complemento de país;
- latitude;
- longitude;
- endereço padrão;
- endereço verificado;
- endereço inabilitado;
- domicílio fiscal;
- data de validade;
- observações.

### 17.4. Uso do endereço

São citados usos como:

- residencial;
- comercial;
- trabalho;
- correspondência.

O sistema atribui a sequência de forma automática conforme novos endereços são adicionados.

### 17.5. Estrutura geográfica

O instrutor descreve cinco níveis de estrutura geográfica:

1. país;
2. estado;
3. província;
4. cidade;
5. distrito.

O código postal aparece como elemento adicional, mesmo quando não corresponde diretamente à estrutura geográfica local.

### 17.6. Endereços internacionais

O campo de complemento de país é explicado como recurso útil quando o endereço não pertence ao país da seguradora e a companhia não possui cadastrada toda a estrutura geográfica estrangeira.

O exemplo remete novamente a uma companhia no México e a um endereço nos Estados Unidos.

### 17.7. Endereço padrão e endereço fiscal

A reunião estabelece duas regras importantes:

- somente um endereço pode ser marcado como padrão;
- somente um endereço pode ser identificado como domicílio fiscal.

O instrutor enfatiza que a existência dessas marcações exige uso coerente nos processos. Não faria sentido, por exemplo, utilizar para envio de documentos um endereço que já foi marcado como inabilitado.

### 17.8. Validade temporal

A data de validade permite definir a partir de quando um endereço deve ser considerado operacional.

O exemplo usado é o de uma pessoa que está comprando uma casa e quer registrar o endereço antes de finalizar a escritura, mas não deseja receber documentação naquele local até que a aquisição esteja efetivamente concluída.

---

## 18. Informações específicas de agentes citadas, mas não demonstradas

A sessão informa que, além dos blocos comuns de terceiros, o agente possui informações específicas que precisam ser consideradas para que a operação de criação esteja completa.

São citadas:

- informações próprias do agente;
- fontes de produção habilitadas;
- escritórios habilitados;
- quadros de comissão;
- subvenções.

### 18.1. Quadros de comissão

O instrutor afirma que, se a companhia deseja que um agente emita apólices e receba as comissões decorrentes da intermediação de seguros, é necessário habilitar quadros de comissão para esse agente.

A transcrição não detalha:

- como os quadros são configurados;
- como são associados ao agente;
- como as comissões são calculadas;
- se existem vigências, exceções ou regras de aprovação;
- como ocorre o pagamento.

### 18.2. Subvenções

As subvenções são citadas como informação que pode ou não ser usada pelas companhias. O instrutor afirma que nem todas utilizam esse recurso.

Não há explicação sobre o significado operacional, contábil ou comercial das subvenções no contexto da solução.

### 18.3. Fontes de produção e escritórios

Fontes de produção e escritórios habilitados são indicados como elementos específicos do agente que seriam vistos posteriormente.

A reunião não permite concluir:

- como essas habilitações impactam a emissão de apólices;
- se possuem vigência;
- se estão relacionadas a território, produto, canal ou estrutura organizacional;
- se dependem de aprovação.

---

## 19. Modelo de integração

A transcrição apresenta poucas informações técnicas diretas sobre integração. Ainda assim, alguns mecanismos são mencionados.

### 19.1. Integração com serviços de validação documental

Em alguns países, a plataforma pode realizar chamadas a serviços web para validar documentos ou obter códigos verificadores.

```text
Rotina de terceiros
↓
Serviço web local ou externo de validação documental
↓
Retorno de validação / código verificador
↓
Tratamento pela companhia
```

Essa é uma reconstrução funcional baseada na explicação. Não há dados sobre tecnologia, autenticação, protocolos, disponibilidade ou monitoramento.

### 19.2. Integração corporativa por identificador único

O identificador único é apresentado como elemento que pode conectar o cadastro da plataforma a outras aplicações da companhia.

```text
Aplicação A
      ┐
Aplicação B ── Identificador único corporativo ── Visão consolidada do terceiro
      ┘
Plataforma de terceiros
```

A reunião não informa se há um cadastro mestre, se a plataforma é a fonte de verdade, se existem integrações em tempo real ou como a sincronização é realizada.

### 19.3. Catálogos e parâmetros

Grande parte do comportamento funcional parece depender de catálogos e parâmetros. São mencionados:

- tipos de documento;
- atividades;
- cargos associados a pessoa politicamente exposta;
- meios e usos de contato;
- tipos de via;
- estrutura geográfica;
- atividades econômicas;
- regimes fiscais;
- parâmetros de companhia.

> **Leitura analítica:** o modelo descrito indica forte orientação à configuração. Isso permite adaptação a países e entidades diferentes, mas também exige governança consistente sobre catálogos, parâmetros e personalizações.

---

## 20. Modelo operacional e de governança de dados

### 20.1. Responsabilidade das companhias locais

A plataforma oferece campos e capacidades, mas a reunião enfatiza que as companhias locais precisam definir:

- quais dados são necessários;
- quais campos devem ser obrigatórios;
- como os dados serão preenchidos;
- como serão mantidos ao longo do tempo;
- em quais processos serão efetivamente utilizados.

Isso aparece em vários momentos, especialmente em relação a dados documentais, perfil financeiro, endereço, contatos e classificações.

### 20.2. Personalizações locais

O instrutor informa que podem existir personalizações que afetam a obrigatoriedade e o comportamento da aplicação. Essas personalizações podem ser feitas em função da importância de um dado em determinado país.

A reunião não detalha:

- quem aprova personalizações;
- como são desenvolvidas;
- como são testadas;
- como se evita divergência excessiva entre países;
- como ocorre a atualização do núcleo quando há personalizações locais.

### 20.3. Risco de captura sem uso

Um dos principais alertas operacionais do treinamento é que dados cadastrados sem consumo em processos posteriores perdem valor e podem criar inconsistência.

Exemplos enfatizados:

| Dado | Risco indicado |
|---|---|
| Data de validade de documento | Ser capturada e nunca considerada nos processos |
| Endereço inabilitado | Continuar sendo usado para envio de documentação |
| Telefone ou e-mail verificado | Marcação sem efeito prático |
| Perfil financeiro | Ser preenchido apenas no cadastro inicial e nunca atualizado |
| Contato prioritário | Ser definido sem utilização nos processos da seguradora |

---

## 21. Perguntas e respostas

### 21.1. Perguntas funcionais relevantes

A transcrição apresenta poucas perguntas de negócio ou arquitetura por parte dos participantes. Grande parte das intervenções está relacionada a problemas de áudio, como “não se ouve”, “agora sim” ou comentários sobre a distância do microfone.

Não há, portanto, um bloco consistente de perguntas e respostas sobre regras de negócio, integração, governança ou operação.

### 21.2. Pergunta implícita: como tratar um terceiro já existente?

Embora não formulada por um participante como pergunta direta, a demonstração responde a uma dúvida operacional importante:

**Questão:** o que acontece se uma pessoa já existe no sistema sob outra atividade e precisa ser cadastrada como agente?

**Resposta demonstrada:** o sistema detecta o documento existente, pode mostrar a atividade atual e permite consultar, transferir dados, descartar o reaproveitamento ou seguir sem considerar o registro anterior.

**O que isso esclarece:** o cadastro suporta múltiplas atividades para uma mesma identidade documental, com possibilidade de reutilização controlada de informações.

### 21.3. Pergunta implícita: quando aparecem acionistas?

**Questão:** em que situação o bloco de acionistas está disponível?

**Resposta demonstrada:** ele aparece quando o terceiro é tratado como pessoa jurídica. A possibilidade de escolher pessoa física ou jurídica depende da configuração do tipo de documento selecionado.

**O que isso esclarece:** a interface é condicional e orientada por regras cadastrais, não apenas por decisão manual do usuário.

### 21.4. Pergunta implícita: para que serve o ID único?

**Questão:** por que manter um identificador além do código interno da plataforma?

**Resposta dada:** o ID único pode permitir que o terceiro seja reconhecido de forma consistente em diferentes aplicações da companhia, evitando duplicidade de visão.

**O que isso esclarece:** o código interno da plataforma não é necessariamente suficiente para uma gestão corporativa integrada de terceiros.

---

## 22. Roadmap e continuidade

O único direcionamento temporal explícito é a continuação do treinamento no dia **28**.

O instrutor informa que o próximo encontro retomará a formação a partir do bloco de endereços e seguirá para:

- documentos alternativos;
- demais blocos comuns ainda não concluídos;
- informações específicas do agente;
- fontes de produção habilitadas;
- escritórios habilitados;
- quadros de comissão;
- subvenções.

Não há roadmap de produto, calendário de implantação, datas de release ou plano de evolução tecnológica apresentados na transcrição.

---

## 23. Números e indicadores citados

A reunião é predominantemente funcional e não apresenta indicadores de adoção, volume, performance, custo ou operação.

| Indicador ou código | Valor mencionado | Contexto |
|---|---:|---|
| Atividade de agentes | 2 | Código associado à atividade de agente |
| Faixa de atividades reservadas | 1 a 99 | Indicada como reservada pelo núcleo |
| Código adicional reservado | 999 | Indicado como reservado pelo núcleo |
| Número de PEPs/relacionamentos no painel | 1 | O painel citado não é multirregistro |
| Contato prioritário | 1 | Apenas um pode ser prioritário |
| Endereço padrão | 1 | Apenas um pode ser padrão |
| Domicílio fiscal | 1 | Apenas um endereço pode ser fiscal |
| Continuação da formação | Dia 28 | Retomada anunciada pelo instrutor |

> Os valores acima são declarações feitas durante o treinamento e não foram auditados externamente.

---

## 24. Limitações reconhecidas

### 24.1. Limitações da própria sessão

- A reunião é interrompida por problemas de áudio.
- A demonstração não chega à parte específica de agentes.
- Não são demonstrados os blocos de documentos alternativos, representantes legais, meios de cobrança e pagamento ou a operação detalhada de acionistas.
- Não há explicação completa sobre comissões, subvenções, fontes de produção ou escritórios.

### 24.2. Limitações funcionais mencionadas

- O painel de pessoa politicamente exposta não é multirregistro.
- Só pode existir um contato prioritário.
- Só pode existir um endereço padrão.
- Só pode existir um domicílio fiscal.
- Certos campos ou blocos aparecem somente para pessoa física ou pessoa jurídica.
- A disponibilidade de campos depende de tipos de documentos, atividades e configurações.
- O identificador único exige configuração e desenvolvimento de componente local.
- A validação documental por serviço web é mencionada apenas como possibilidade existente em alguns países.

### 24.3. Limitações de adoção

O instrutor reforça que a plataforma não garante, por si só, qualidade ou uso efetivo dos dados. A companhia precisa operacionalizar as informações capturadas.

---

## 25. Riscos e desafios

### 25.1. Riscos explicitamente sustentados pela reunião

| Risco | Evidência apresentada |
|---|---|
| Duplicidade de terceiros | Uma mesma pessoa pode existir em atividades diferentes e requer tratamento de reutilização |
| Dados sem valor operacional | Campos podem ser capturados sem serem utilizados ou mantidos |
| Uso indevido de endereço | Um endereço inabilitado pode continuar sendo usado em processos se não houver controle |
| Identidade fragmentada entre aplicações | O código interno não resolve, sozinho, a visão corporativa do terceiro |
| Divergência entre países | Regras, catálogos e validações podem variar localmente |
| Parametrização inadequada | Campos podem ficar obrigatórios, habilitados ou ocultos de forma inadequada |
| Falhas de qualidade cadastral | Contatos, documentos e endereços exigem validação e manutenção |

### 25.2. Desafios derivados do contexto — leitura analítica

Os pontos abaixo são inferências analíticas, não afirmações literais da reunião.

- **Governança de dados mestres:** se a mesma pessoa pode ter diversas atividades e documentos, a consistência de identidade exige regras robustas de deduplicação, consolidação e ownership do dado.
- **Gestão de personalizações:** o uso de configurações e adaptações locais pode atender requisitos de países distintos, mas tende a aumentar a complexidade de manutenção e evolução.
- **Adoção operacional:** a efetividade de campos como endereço padrão, contato prioritário e documento verificado depende de os processos posteriores respeitarem essas marcações.
- **Conformidade:** a presença de dados de PEP, validação documental e identificação do cliente sugere importância de processos de conformidade, embora a reunião não detalhe controles, auditoria ou fluxos decisórios.

---

## 26. Transformações e direções identificadas

### 26.1. De cadastro isolado para visão transversal do terceiro

A reunião apresenta uma direção de gestão centralizada ou, ao menos, integrada da identidade do terceiro. A coexistência de atividades, documentos alternativos e identificador único aponta para uma tentativa de não tratar cada vínculo como uma pessoa inteiramente nova.

```text
Pessoa em uma atividade isolada
↓
Pessoa com múltiplos papéis no negócio
↓
Necessidade de reaproveitar e consolidar dados
↓
Modelo transversal de terceiro
```

### 26.2. De formulário fixo para cadastro configurável

O comportamento da interface depende de regras como:

- natureza da pessoa;
- tipo de documento;
- atividade;
- país;
- configuração de companhia;
- personalização local.

Isso indica uma direção de flexibilidade e adaptação por contexto, em vez de um único formulário universal.

### 26.3. De coleta de dados para governança de dados

O instrutor insiste que dados só devem ser capturados quando puderem ser utilizados e mantidos. A transformação implícita é sair de um modelo de preenchimento burocrático para um modelo em que cada atributo tenha finalidade operacional.

### 26.4. De agente como cadastro simples para agente como entidade habilitada

O agente é apresentado não apenas como uma pessoa ou empresa registrada. Para operar, ele pode precisar de habilitações adicionais, incluindo fontes de produção, escritórios, comissões e, possivelmente, subvenções.

Isso indica que a criação do terceiro é uma condição necessária, mas não suficiente, para que o agente esteja operacionalmente pronto para intermediar seguros.

---

## 27. O que a reunião não permite concluir

A transcrição não fornece informação suficiente para determinar, com segurança:

### Arquitetura técnica

- tecnologias de desenvolvimento;
- banco de dados utilizado;
- uso de microsserviços;
- uso de APIs internas;
- mensageria;
- arquitetura de nuvem;
- infraestrutura;
- contêineres ou Kubernetes;
- mecanismos de cache;
- integração entre ambientes.

### Segurança e conformidade

- modelo de autenticação;
- modelo de autorização;
- segregação de funções;
- trilhas de auditoria;
- criptografia;
- retenção de dados;
- mascaramento de dados pessoais;
- regras formais de prevenção à lavagem de dinheiro;
- fluxo de tratamento de PEP;
- evidências exigidas para Know Your Client.

### Operação e suporte

- SLA;
- suporte a incidentes;
- monitoramento;
- observabilidade;
- processo de atualização;
- versionamento;
- gestão de releases;
- backups;
- recuperação de desastre;
- processo de testes.

### Processo de negócio do agente

- critérios para aprovação de agentes;
- validações legais e regulatórias;
- regras de emissão de apólices;
- regras de cálculo de comissão;
- periodicidade e método de pagamento;
- detalhamento de fontes de produção;
- papel dos escritórios habilitados;
- definição e operação das subvenções;
- gestão de desligamento ou inativação de agentes.

### Governança organizacional

- responsáveis pelo cadastro;
- responsáveis pelos catálogos;
- aprovadores de personalizações;
- processo de gestão de dados mestres;
- autoridade para alterar parâmetros corporativos;
- política de integração com outros sistemas.

---

## 28. Principais conclusões

1. O treinamento aborda a criação de agentes no módulo de terceiros, mas posiciona o agente como um caso particular dentro de um modelo transversal de terceiros.

2. A atividade 2 é apresentada como a atividade correspondente ao agente intermediário comercial.

3. A criação de um agente envolve blocos comuns de cadastro e blocos específicos que não foram detalhados integralmente nesta sessão.

4. A plataforma possui comportamento condicionado por atividade, tipo de documento, natureza física ou jurídica, parâmetros de companhia e possíveis personalizações locais.

5. A identidade do terceiro pode ser reutilizada entre atividades, permitindo consultar ou transferir dados quando a mesma pessoa já existe no sistema.

6. O identificador único é diferente do código interno da plataforma e pode apoiar uma visão integrada do terceiro em múltiplas aplicações, desde que seja configurado e implementado.

7. A qualidade do cadastro depende menos da existência dos campos e mais do uso consistente dos dados nos processos da companhia.

8. Contatos e endereços possuem regras explícitas de prioridade, padrão, validação, inativação e vigência.

9. A classificação de pessoa politicamente exposta pode ser registrada, inclusive por relação com familiar ou colaborador, mas o painel citado possui limitação de um único registro.

10. A operacionalização completa do agente depende de informações adicionais — como comissões, fontes de produção e escritórios habilitados — que ficaram para a continuação da formação.
