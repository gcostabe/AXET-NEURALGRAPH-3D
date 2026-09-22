# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `0011-TE-CREAR-Asegurado.mp4`
**Data de processamento:** 20/09/2026 14:49:47
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada — Cadastro de terceiros, segurados e agentes no núcleo “Riftcore/Riscor”

> **Nota de fidelidade:** a transcrição é predominantemente em espanhol, com falhas de reconhecimento de voz e nomes de produto potencialmente deformados. O sistema é registrado como “Riftcore”, “Riscor” e variações semelhantes; esta análise preserva a incerteza e o chama de **núcleo/sistema apresentado** quando o nome não for essencial. Não foram fornecidos timestamps ou linhas, portanto não é possível citar posições exatas da fonte.

## 1. Síntese executiva

A sessão é um treinamento funcional sobre o cadastro de terceiros no núcleo de seguros apresentado, com foco principal na criação e no enriquecimento de **segurados**, identificados pela **atividade/código de atividade 1**. O instrutor explica que pessoas envolvidas na emissão de uma apólice — como tomador, pagador, condutor, beneficiário e segurado — podem compartilhar essa atividade e uma base comum de dados de terceiro.

O modelo busca formar uma visão ampla do cliente/segurado, combinando dados cadastrais básicos, classificações comerciais, situação operacional, informações de prevenção à lavagem de dinheiro, fidelização, consentimentos, documentos de condução e perfil analítico. Parte relevante da apresentação consiste em alertar que a existência de um campo não implica que ele deva ser usado indiscriminadamente: cada atributo precisa ser configurado e governado segundo a finalidade correta, evitando duplicidade, inconsistência e degradação do modelo ao longo do tempo.

Também foi demonstrada a criação de um segurado a partir de outro terceiro já existente. Esse recurso reutiliza dados cadastrais, mas não transfere meios de cobrança e pagamento. A demonstração evidenciou validações de coerência, histórico de alterações, busca de terceiros e a possibilidade de relacionar registros que representam a mesma pessoa cadastrada sob documentos ou atividades distintos.

Ao final, a reunião começa a transicionar para a criação de agentes/intermediários, mas esse tópico não chega a ser desenvolvido na transcrição.

---

## 2. Contexto e antecedentes

A reunião continua uma sessão anterior. Segundo o instrutor, no encontro anterior foram abordados:

- a criação de um terceiro;
- os blocos de informação comuns;
- dados básicos e de identificação;
- diferenças de comportamento entre pessoa física e pessoa jurídica;
- validações locais além das validações padrão do núcleo;
- contatos, endereços e meios de cobrança/pagamento;
- alguns catálogos de classificação e configuração.

O modelo apresentado parece organizar o cadastro por **atividades** associadas a um terceiro. A atividade 1 corresponde ao universo de segurados/clientes e, conforme explicado, é aplicável a diferentes papéis participantes de uma apólice, não apenas ao segurado no sentido estrito.

A estrutura de dados possui blocos comuns a diversas atividades e blocos específicos para cada atividade. O instrutor menciona inicialmente **nove blocos comuns de informação**, embora não os enumere integralmente nesta transcrição. Para a atividade 1, são mencionados ainda **cinco blocos específicos**, também sem uma listagem formal e consolidada no início da explicação.

A apresentação enfatiza que a estrutura do núcleo é uma base corporativa e configurável. Os países ou companhias locais podem definir obrigatoriedades, classificações e validações adicionais conforme a própria operação, desde que preservem a finalidade dos componentes.

---

## 3. Problema central tratado

O problema principal não é uma falha isolada de sistema, mas a necessidade de manter um cadastro de terceiros suficientemente flexível para múltiplas operações de seguros, sem transformar essa flexibilidade em desorganização.

A conversa revela quatro preocupações centrais:

1. **Capturar dados adequados para cada operação**  
   O sistema deve permitir registrar informações de pessoa física e jurídica, dados comerciais, fiscais, operacionais e regulatórios.

2. **Evitar uso inadequado de campos e catálogos**  
   O instrutor insiste que campos existentes não devem ser reutilizados para finalidades diferentes das previstas apenas porque podem produzir o mesmo resultado.

3. **Preservar qualidade e coerência cadastral**  
   O cadastro pode ser criado por áreas centralizadas ou por usuários envolvidos na emissão. Essa descentralização pode prejudicar a qualidade caso os indicadores de produtividade não considerem o cadastro como parte relevante do processo.

4. **Suportar processos de negócio posteriores**  
   Os dados cadastrados podem impactar cobrança, segmentação, fidelização, prevenção à lavagem de dinheiro, comunicações, consentimentos, relacionamento comercial e análises de clientes.

---

## 4. Modelo conceitual apresentado

A estrutura apresentada pode ser entendida da seguinte forma:

```text
Terceiro
├── Dados comuns a múltiplas atividades
│   ├── Dados básicos
│   ├── Identificação
│   ├── Contatos
│   ├── Endereços
│   └── Meios de cobrança e pagamento
│
└── Atividade do terceiro
    ├── Atividade 1: segurado / cliente e demais intervenientes de apólice
    │   ├── Classificações e agrupamentos
    │   ├── Situação operacional e retenções
    │   ├── Dados empresariais e comerciais
    │   ├── Fidelização
    │   ├── Consentimentos
    │   ├── Terceiros não desejados
    │   ├── Licença/permissão de condução
    │   └── Perfil analítico
    │
    ├── Outras atividades mencionadas
    │   ├── Agente
    │   ├── Perito
    │   ├── Empregado
    │   └── Tramitador
    │
    └── Relações e histórico de alterações
```

Esse desenho é uma **consolidação analítica** da explicação, não um diagrama literal mostrado na reunião.

---

## 5. Dados comuns e configurações locais

### 5.1 Dados básicos e identificação

O terceiro pode ser criado com um conjunto mínimo de dados, especialmente dados básicos e de identificação. Para pessoa física, isso pode incluir nome e sobrenomes; para pessoa jurídica, o nome empresarial.

O instrutor ressalta que determinados dados podem mudar conforme:

- o tipo de pessoa, física ou jurídica;
- o tipo de documento;
- as configurações da companhia;
- as validações locais;
- as necessidades posteriores de exploração do dado.

O sistema aparenta possuir validações básicas próprias, como verificação de formato de telefone e e-mail. Além disso, cada operação local pode estabelecer regras adicionais, incluindo atributos obrigatórios para determinada atividade.

### 5.2 Obrigações fiscais em outros países

Foi citado como exemplo que, se o terceiro indicar possuir obrigações fiscais em outros países, o sistema exige o detalhamento dos países envolvidos. A transcrição não especifica quais campos, regras fiscais ou processos posteriores são aplicados a essas informações.

### 5.3 Dados opcionais e obrigatoriedade local

O cadastro mínimo de terceiro não exigia, no exemplo citado, contatos ou endereços. Contudo, o instrutor deixa claro que isso não representa uma regra universal: cada país deve configurar suas necessidades operacionais.

---

## 6. Atividade 1: segurado e intervenientes da apólice

A atividade 1 é apresentada como a atividade associada aos clientes/segurados. O instrutor inclui nesse grupo:

- tomador;
- pagador;
- condutor;
- beneficiário;
- segurado.

A explicação sugere que essas figuras são tratadas transversalmente pelo sistema mediante a mesma atividade, recebendo os dados comuns e, quando aplicável, os dados específicos do segurado.

### 6.1 Observação terminológica

Embora o treinamento use frequentemente “segurado”, a atividade 1 parece cobrir um conjunto maior de intervenientes de apólice. Portanto, nem todo atributo descrito necessariamente se aplica de forma idêntica a todas essas figuras; a transcrição não define uma matriz de aplicabilidade por papel.

---

## 7. Classificações, qualidade e agrupamentos comerciais

### 7.1 Classificação do cliente

O sistema possui um catálogo de classificação por companhia, atividade e código de classificação. Esse catálogo pode ser usado para categorizar clientes conforme a necessidade local.

O instrutor usa como exemplo classificações geracionais, como “millennial” e “baby boomer”, mas alerta que isso poderia ser redundante se a data de nascimento já permitir derivar a mesma informação.

**Princípio apresentado:** antes de usar uma classificação, deve-se avaliar se aquela informação já pode ser obtida de maneira confiável em outro dado estruturado.

### 7.2 Qualidade do terceiro

Existe um código de “qualidade” associado ao terceiro. O instrutor não apresenta uma definição universal, mas cita como possíveis interpretações:

- nível de relacionamento;
- quantidade de seguros ou serviços contratados;
- classificação como ouro, platina ou equivalente.

O exemplo é associado a programas de relacionamento de seguradora, nos quais um cliente pode ser classificado conforme seu volume de produtos ou vínculo com a empresa.

### 7.3 Agrupamento comercial

Há também um catálogo de agrupamentos comerciais por companhia e atividade. O instrutor explica que o agrupamento poderia identificar clientes vinculados a determinados acordos comerciais, mas ressalta que essa finalidade pode, em alguns casos, ser inferida por outras estruturas.

O exemplo apresentado é o de clientes intermediados por um banco em um acordo de cosseguro. A associação poderia ser inferida por:

- chave/código de agente;
- apólice de grupo;
- contrato;
- subcontrato;
- outra estrutura usada no processo de emissão.

### 7.4 Diretriz de uso do catálogo correto

A mensagem central é que pode haver mais de uma forma de chegar ao mesmo resultado, mas o uso do catálogo nativo e semanticamente adequado tende a simplificar o acesso e a manutenção.

**Leitura analítica:** o modelo busca reduzir lógica indireta ou consultas complexas a estruturas de apólice quando existe um atributo mestre próprio para a classificação desejada.

---

## 8. Cobrança, retenção e data sugerida de pagamento

### 8.1 Tipo de retenção

O cadastro contempla um tipo de retenção associado aos processos econômicos do cliente com a seguradora. A transcrição não detalha regras de cálculo, tipos existentes ou o fluxo de tesouraria correspondente.

### 8.2 Forma de cobrança

O campo de forma de cobrança é descrito como uma estrutura mais antiga do núcleo. Ele pode conter referências como:

- cheque;
- dinheiro;
- transferência;
- conta de gestão;
- cartão;
- arquivo bancário;
- domiciliação.

O instrutor afirma que esse campo não seria a estrutura mais adequada para o cenário atual, pois o modelo de terceiros já possui meios de cobrança e pagamento específicos.

### 8.3 Meios de cobrança e pagamento

Os meios de cobrança e pagamento são tratados como a fonte operacional mais apropriada para dados bancários, cartão e demais mecanismos necessários à cobrança.

A demonstração posterior confirma uma validação importante:

```text
Forma de cobrança = transferência bancária
↓
É necessário existir meio de cobrança/pagamento compatível
↓
Deve haver, por exemplo, conta bancária cadastrada
```

Quando o instrutor tentou criar um segurado com forma de cobrança por transferência, sem uma conta bancária previamente registrada, o sistema retornou erro exigindo o cadastro da conta.

### 8.4 Dia sugerido de pagamento

O segurado pode informar um dia sugerido para cobrança. Esse dado deve ser considerado pelas políticas de cobrança da seguradora.

O instrutor ilustra o caso de clientes que recebem em datas específicas, como quinzenalmente, e que podem ter menor capacidade financeira. Desconsiderar o dia sugerido pode levar a saldo insuficiente e deteriorar a experiência do cliente.

**Informação explicitamente transmitida:** o campo existe e pode impactar processos de cobrança.  
**Implicação analítica:** a operação precisa decidir se o campo será obrigatório e como ele será respeitado em suas regras de cobrança.

---

## 9. Situação de inabilitação do terceiro

O sistema permite marcar um terceiro como inabilitado. Quando isso acontece, deve-se informar uma causa de inabilitação baseada em catálogo específico por atividade.

Entre os exemplos mencionados está a falta de pagamento, embora a transcrição não liste todas as causas disponíveis.

O instrutor alerta contra o uso redundante do campo de observações para repetir uma causa já codificada. O campo de observação deve complementar a informação, não duplicar o significado do código.

Também é mencionado que a inabilitação pode ser relacionada à funcionalidade de “marcas”, possivelmente para permitir regras ou tratamentos adicionais. A transcrição não descreve tecnicamente como essa integração funciona.

---

## 10. Prevenção à lavagem de dinheiro e controles relacionados

### 10.1 Ativação em nível de companhia

A funcionalidade de controle/prevenção a lavagem de dinheiro é apresentada como parametrizada no nível da companhia. O instrutor menciona limites de prêmio por moeda e distinção entre pessoa física e pessoa jurídica.

A regra, segundo a explicação, poderia se aplicar não apenas ao tomador, mas também a outras figuras da apólice classificadas na atividade 1, como beneficiários, segurados e pagadores.

### 10.2 Contato de referência em pessoa jurídica

Para pessoa jurídica, o cadastro de contatos pode indicar qual contato receberá comunicações relacionadas a esse controle. Isso exige:

- cadastrar contatos da empresa;
- marcar um deles como terceiro ou contato de referência;
- usar esse atributo no contexto previsto.

O instrutor enfatiza que esse marcador não deve ser usado para finalidades genéricas, como envio de felicitações ou comunicações não relacionadas ao propósito da funcionalidade.

### 10.3 Limites de prêmio

Foi demonstrado um exemplo em que a companhia possui, para pessoas físicas e moeda euro, um limite de **800 mil** para o controle mencionado. Em outro exemplo conceitual, o instrutor cita **100 mil euros**.

Esses números devem ser lidos como exemplos ou parâmetros de ambiente demonstrado, e não como uma política corporativa confirmada e universal.

A transcrição indica que o núcleo registra os limites e pode identificar pessoas que os ultrapassem. Contudo, o núcleo não executa automaticamente todo o processo posterior, como análise de carteira, agregação de prêmios ou ação sobre os identificados.

### 10.4 Responsabilidade operacional

Após a identificação de possíveis casos, a companhia deve definir e executar seus próprios procedimentos de atuação. O instrutor pergunta, de forma retórica, o que fazer depois de identificar quatro pessoas acima do limite, indicando que o sistema por si só não substitui o processo operacional e de compliance.

---

## 11. Dados empresariais e comerciais

### 11.1 Número de empregados

O número de empregados é apresentado como dado especialmente útil para:

- pessoas jurídicas;
- autônomos;
- negócios de pequeno porte;
- contextos de seguro de responsabilidade civil.

O exemplo inclui uma empresa ou comércio com número conhecido de funcionários.

### 11.2 Faturamento

O faturamento anual é outro atributo voltado principalmente a empresas e autônomos. Pode suportar tratamento comercial ou análise de risco, embora a transcrição não determine regras automáticas específicas.

### 11.3 Grupo empresarial

O segurado pode ser associado a um grupo empresarial, baseado em uma tabela configurável.

O instrutor levanta uma preocupação operacional: caso a companhia queira manter todos os grupos empresariais de um país manualmente, a manutenção pode se tornar excessivamente onerosa. Ele sugere que a carga pode ser feita em lote, mas não afirma que esse processo já exista.

Também cita que a companhia pode decidir utilizar o atributo apenas para empresas acima de determinado faturamento, como exemplo de critério local.

### 11.4 Rating

Existe um tipo de rating associado ao segurado, com base em uma tabela de classificações. A transcrição não especifica escalas, fontes, cálculo ou uso decisório desse rating.

### 11.5 Escritório comercial

O campo de escritório comercial contém o código do terceiro nível da estrutura comercial, segundo os valores configurados no catálogo de escritórios comerciais.

---

## 12. Datas, documentação e zona horária

### 12.1 Data de registro

A data de registro não deve ser confundida com a data técnica de criação ou atualização do registro no sistema.

Segundo o instrutor, ela registra a data real em que o segurado entregou a documentação necessária. Exemplos citados:

- documento de identidade para pessoa física;
- informações de faturamento;
- últimas contas apresentadas, para pessoa jurídica.

A data técnica de atualização do sistema é distinta e pode ser formada, conforme parâmetro de companhia mencionado, por ano, mês, dia, hora, minuto e segundo.

### 12.2 Zona horária

O cadastro pode associar uma zona horária ao segurado, de acordo com as zonas habilitadas para o país.

Foram citados exemplos de países com múltiplos fusos:

- Espanha: península e Canárias;
- México: quatro fusos, segundo o instrutor;
- Estados Unidos: “outros quatro”, em formulação aproximada;
- Chile: foi mencionado como país com particularidades territoriais, mas sem detalhamento confiável.

A fala sobre Malta e suas ilhas é usada apenas como ilustração de que permissões ou condições podem ser territorialmente restritas. O próprio instrutor pede que não se trate o exemplo como fato preciso.

---

## 13. Fidelização

### 13.1 Participação em plano de fidelização

O sistema permite registrar se o segurado participa de um plano de fidelização. São mencionados:

- indicação de participação;
- data de alta;
- data de baixa;
- identificador do plano;
- pontos acumulados;
- apólice associada ao plano.

O exemplo usado pelo instrutor referencia o programa “Tréboles” e “Te Cuidamos”, associado à MAPFRE na Espanha. Essa referência é apresentada como exemplo local e não como nomenclatura necessariamente aplicável a todos os países.

### 13.2 Atualização dos pontos

Os pontos acumulados não são inseridos manualmente no cadastro. A transcrição afirma que são atualizados por processo batch, com frequência que pode ser diária, noturna, semanal ou mensal, conforme a operação.

### 13.3 Uso dos pontos na cobrança

Os pontos podem ser utilizados para reduzir o valor de uma cobrança, conforme regras parametrizadas pela companhia. O exemplo apresentado é:

- prêmio/recibo anual de 500 euros;
- cliente com 30 pontos;
- mínimo de 25 pontos para uso automático;
- desconto de 25 pontos.

Também se explica que a conversão entre pontos e moeda depende de tabelas de moeda e tipo de câmbio. No exemplo, um “trébol” vale um euro, mas o instrutor deixa claro que isso pode variar localmente.

### 13.4 Limite do que foi explicado

A reunião não explica:

- como se acumulam os pontos;
- como se integra a fidelização ao processo de tesouraria;
- se o desconto é sempre automático;
- regras de elegibilidade;
- comportamento em caso de cancelamento, estorno ou inadimplência.

---

## 14. Cliente Robinson, comunicações e consentimentos

### 14.1 Cliente Robinson

O cadastro pode marcar um segurado como “cliente Robinson”, entendido na explicação como alguém que requer restrição de contatos ou comunicações, de acordo com os consentimentos concedidos.

O instrutor enfatiza que o descumprimento das regras de consentimento pode gerar multas. Embora a fala remeta a obrigações regulatórias, não é citada uma legislação específica.

### 14.2 Estrutura de consentimentos

O módulo permite cadastrar consentimentos associados ao segurado. Entre os tipos mencionados:

- publicidade;
- cessão de dados;
- análise de clientes;
- perfilamento;
- outras tipologias previstas no núcleo.

Há um catálogo mestre de consentimentos contendo, segundo a explicação:

- código;
- descrição;
- idioma;
- tipo de consentimento;
- estado de inabilitação do registro.

### 14.3 Estado ou formato do consentimento

São mencionados estados ou formas como:

- concedido expressamente;
- retirado;
- não concedido;
- tácito.

O instrutor explica que, em certos cenários, o consentimento tácito poderia decorrer de cláusulas ou condições comunicadas ao cliente durante a emissão. O cliente poderia posteriormente se opor por canais como site, telefone ou e-mail.

Essa explicação descreve uma possibilidade de parametrização e operação, não uma regra jurídica universal afirmada para todos os países.

### 14.4 Validade

O consentimento pode possuir:

- data de início;
- data de fim;
- estado de inabilitação.

### 14.5 Coerência entre Robinson e consentimentos

O instrutor destaca uma inconsistência potencial: marcar o cliente como Robinson e, ao mesmo tempo, não registrar nenhum consentimento explícito pode exigir atenção operacional. A recomendação transmitida é evitar tratamento comercial sem base explícita quando os registros forem incoerentes.

---

## 15. Terceiros não desejados

A funcionalidade de “terceiros não desejados” foi mencionada como originada no contexto de segurados, embora possa ser usada em outras atividades após o cadastro do terceiro.

A configuração pode incluir:

- qualidade;
- data de validade;
- setor;
- ramo;
- nível da estrutura comercial;
- abrangência para todos os escritórios ou um escritório específico;
- agente específico;
- estado do terceiro;
- causa de classificação como não desejado;
- comentários.

A transcrição não detalha quais bloqueios, alertas ou ações automáticas ocorrem quando um terceiro recebe essa classificação.

---

## 16. Licença ou permissão de condução

O cadastro do segurado permite informações sobre licença/permissão de condução. Foram citados:

- código da licença;
- situação da licença, como vigente ou expirada;
- data de expedição;
- área geográfica de expedição;
- abrangência geográfica da permissão.

O instrutor afirma que, no momento, o sistema permite apenas uma licença por terceiro. Não fica claro se essa é uma limitação permanente do produto, uma característica da versão demonstrada ou uma regra do ambiente.

A área de expedição parece ser referenciada pelo segundo nível geográfico interno do país, e não simplesmente pelo país ou pela cidade.

---

## 17. Perfil analítico do cliente

### 17.1 Natureza do bloco

O perfil analítico não é preenchido online pelos usuários no fluxo apresentado. Ele é carregado por processo batch, sob responsabilidade local de cada país.

O núcleo fornece a estrutura de campos, mas não executa os cálculos analíticos nem produz automaticamente o perfil. A companhia local deve definir:

- critérios conceituais;
- fontes de dados;
- cálculos;
- planilhas ou processos de carga;
- frequência de atualização.

### 17.2 Relação com diretrizes corporativas

O instrutor menciona que áreas corporativas de negócio e clientes, vinculadas à sede na Espanha no exemplo da MAPFRE, podem indicar o que desejam controlar ou segmentar. Contudo, a transcrição não fornece uma especificação formal dessas diretrizes.

### 17.3 Campos e métricas citados

São mencionados, entre outros:

| Campo ou indicador | Descrição dada na reunião |
|---|---|
| Customer Lifetime Value / CLTV | Valor de vida do cliente; cálculo não detalhado |
| Probabilidade de abandono | Indicador conforme métricas locais |
| Probabilidade de cross-selling | Exemplo para ramos como automóvel, residência e saúde |
| Índice de saturação | Indicador de acordo com normas corporativas, sem fórmula apresentada |
| Índice de integralidade | Relação entre produtos/setores contratados |
| Quantidade de beneficiários | Associada ao cliente/tomador, mas sem definição completa |
| Canal preferido | Canal de relacionamento do cliente |
| Dispositivo preferido | Meio/dispositivo usado para contato |
| Uso de web | Horário, frequência, tempo de navegação, sessões e dispositivos |
| Multi-dispositivo | Indicador de uso de mais de um dispositivo |
| Credit score | Mencionado sem origem ou cálculo |
| Número de aplicações da seguradora utilizadas | Métrica de uso de aplicativos |
| Número de seguidores | Citado como possível atributo, sem detalhamento |

### 17.4 Foco em produtos massificados

O instrutor sugere que esse perfil faz mais sentido para produtos de massa e pessoas físicas, citando especialmente:

- automóvel;
- residência;
- saúde.

Também afirma que pode não ter a mesma relevância em linhas como roubo, múltiplos empresariais ou seguros agrícolas. Essa é uma avaliação do instrutor, não uma limitação técnica formal declarada do sistema.

### 17.5 Catálogos de canal, dispositivo e segmentação

Canal, dispositivo e segmentação de cliente dependem de códigos configurados em catálogo mestre. O instrutor observa que a estrutura atual não seria a modelagem ideal — a preferência seria usar tipos e listas de valores —, mas afirma que o catálogo específico foi criado e precisa ser mantido por razões históricas e de compatibilidade.

---

## 18. Arquitetura lógica de responsabilidades

A reunião permite consolidar o seguinte fluxo lógico:

```text
Usuário / Área operacional
↓
Cadastro transacional de terceiro e atividade
↓
Validações do núcleo
├── Identificação
├── Campos obrigatórios
├── Coerência de meios de cobrança/pagamento
└── Catálogos e códigos habilitados
↓
Dados estruturados do segurado
├── Operação de emissão
├── Cobrança e tesouraria
├── Comunicações e consentimentos
├── Controles de prevenção à lavagem de dinheiro
├── Fidelização
└── Perfil analítico
↓
Processos locais e batch
├── Atualização de pontos
├── Carga de perfil analítico
├── Manutenção de grupos empresariais, se aplicável
└── Tratamento operacional de alertas e controles
```

Esse modelo é uma **interpretação organizada** das relações explicadas. A transcrição não apresenta APIs, mensageria, bancos de dados, eventos, cloud, microserviços ou componentes de infraestrutura.

---

## 19. Criação de segurado a partir de outro terceiro

### 19.1 Finalidade

O sistema permite criar um segurado, pessoa física ou jurídica, usando como origem outro terceiro já registrado.

O terceiro de origem pode possuir outra atividade, como:

- agente;
- empregado;
- perito;
- tramitador;
- segurado.

O exemplo dado é o de um empregado que já existe no sistema e que posteriormente precisa contratar uma apólice como segurado.

### 19.2 Regra de histórico

Quando o terceiro de origem possui histórico de mudanças, a cópia usa apenas a informação mais atual. O sistema não traz os valores antigos de versões anteriores.

### 19.3 Regra crítica: meios de cobrança e pagamento não são copiados

A regra mais importante da operação é que meios de cobrança e pagamento **não são transferidos** para o novo segurado.

Isso evita replicar automaticamente dados financeiros ou bancários do terceiro de origem. Porém, pode gerar uma inconsistência se outros atributos copiados indicarem uma modalidade que exige esses meios.

Exemplo demonstrado:

```text
Origem indica forma de cobrança por transferência
↓
Novo segurado é criado a partir da origem
↓
Dados bancários não são copiados
↓
Ao criar o destino, o sistema valida a ausência de conta bancária
↓
O usuário precisa cadastrar os dados bancários necessários
```

### 19.4 Qualidade cadastral e descentralização

O instrutor comenta que alguns países podem centralizar o cadastro de terceiros para melhorar a qualidade do dado, enquanto outros permitem que usuários de emissão realizem o cadastro.

Ele alerta para um possível conflito de incentivos: usuários medidos pela produtividade de emissão podem priorizar velocidade e não a qualidade completa do cadastro.

**Leitura analítica:** a qualidade de dados é tratada como responsabilidade transversal, não apenas como tarefa da área que registra o terceiro.

---

## 20. Demonstração prática realizada

A demonstração ocorreu em ambiente de desenvolvimento, segundo o próprio instrutor. Houve falhas, buscas sem retorno esperado e tentativas repetidas, que ele atribuiu a erros operacionais, registros de teste e possível comportamento do ambiente.

Os pontos efetivamente evidenciados pela demonstração foram:

- criação de terceiros com dados mínimos;
- seleção da atividade 1;
- cópia de dados a partir de outro terceiro;
- busca por múltiplos atributos, como nome, sobrenome, tipo/documento, atividade e código do terceiro;
- limitação de resultados de busca configurável, citada como 500 no exemplo;
- alerta de possível duplicidade quando um registro com mesmo nome existe;
- existência de histórico de alterações;
- visualização dos atributos alterados entre versões;
- inclusão de meio de contato, como e-mail;
- exigência de marcar um contato como prioritário e padrão;
- busca de terceiros por dados de contato, incluindo e-mail;
- relacionamento entre registros que podem representar a mesma pessoa.

### 20.1 Registros da mesma pessoa

A demonstração cria dois registros que aparentam representar a mesma pessoa, mas com documentos distintos. O instrutor explica que, sem relacionamento, seriam contados como duas pessoas/segurados diferentes.

Ele então menciona a possibilidade de indicar um “documento pai” para relacionar os registros. A transcrição sugere que isso permite rastrear a mesma pessoa entre cadastros diferentes, mas não detalha:

- modelo de deduplicação;
- critérios de sobrevivência de dados;
- efeitos em emissão, cobrança ou sinistros;
- tratamento de conflitos entre os dados dos registros.

---

## 21. Perguntas e respostas relevantes

### Pergunta: os meios de cobrança e pagamento são copiados ao criar um segurado a partir de outro terceiro?

**Resposta:** não. Os meios de cobrança e pagamento não são transferidos da origem ao destino.

**O que isso esclarece:** a cópia cadastral reaproveita dados de terceiro, mas preserva a necessidade de registrar separadamente dados financeiros do novo segurado.

---

### Pergunta: será obrigatório cadastrar novamente os meios de cobrança e pagamento?

**Resposta:** não necessariamente em todos os casos. A exigência depende das validações aplicáveis. Se o segurado estiver configurado com forma de cobrança por transferência, será necessário cadastrar uma conta bancária ou meio compatível.

**O que isso esclarece:** a obrigatoriedade não decorre simplesmente da cópia; decorre da coerência entre os atributos cadastrados e as regras de negócio do núcleo.

---

### Pergunta: por que usar um catálogo específico se a mesma informação pode ser obtida em apólices, contratos ou agentes?

**Resposta:** existem múltiplas alternativas para chegar ao mesmo resultado, mas usar o catálogo semanticamente correto tende a simplificar a implementação e o acesso à informação.

**O que isso esclarece:** o treinamento não impõe uma única solução técnica, mas orienta a priorizar o uso nativo e correto do modelo de dados.

---

### Pergunta implícita: o núcleo realiza automaticamente as análises de lavagem de dinheiro e perfil analítico?

**Resposta:** não foi dito que o núcleo execute esses processos ponta a ponta. Para lavagem de dinheiro, ele pode registrar limites e identificar casos; para perfil analítico, fornece a estrutura, enquanto os dados são carregados por processos locais batch.

**O que isso esclarece:** o núcleo funciona como suporte transacional e repositório estruturado; a inteligência analítica e os procedimentos operacionais dependem de implementações locais.

---

## 22. Governança e modelo operacional

### 22.1 Governança de catálogos

Os catálogos precisam ser configurados e mantidos conforme a finalidade correta. Entre os domínios citados:

- classificações;
- qualidade;
- agrupamentos comerciais;
- causas de inabilitação;
- grupos empresariais;
- ratings;
- escritórios comerciais;
- consentimentos;
- planos de fidelização;
- zonas horárias;
- dispositivos, canais e segmentações analíticas.

### 22.2 Governança de qualidade de dados

O instrutor enfatiza riscos de deterioração funcional causados por:

- rotatividade de pessoal;
- perda do entendimento original de um campo;
- uso inadequado de funcionalidades;
- criação de soluções paralelas;
- reutilização de atributos para fins diferentes.

A orientação é preservar o significado de cada campo e evoluir ou descartar funcionalidades quando elas não forem adequadas, em vez de distorcê-las.

### 22.3 Responsabilidades locais

A companhia ou país local é responsável por definir, quando aplicável:

- obrigatoriedade de campos;
- validações adicionais;
- critérios de classificação;
- processos de manutenção;
- uso de dados analíticos;
- cargas batch;
- procedimentos de compliance;
- políticas de cobrança;
- tratamento de alertas e exceções.

---

## 23. Limitações reconhecidas

A reunião reconhece explicitamente ou por demonstração as seguintes limitações:

1. **Perfil analítico não é calculado pelo núcleo**  
   O núcleo fornece os campos, mas os países devem construir e carregar os dados.

2. **Pontos de fidelização não são capturados manualmente**  
   Eles são atualizados via batch.

3. **O núcleo não define sozinho a atuação sobre alertas de lavagem de dinheiro**  
   A companhia deve possuir seus próprios procedimentos.

4. **Meios de cobrança e pagamento não são copiados na criação derivada de segurado**  
   Eles precisam ser registrados conforme necessário.

5. **A licença de condução parece limitada a um registro por terceiro**  
   A transcrição sugere essa limitação, mas não informa versão, justificativa ou plano de evolução.

6. **A demonstração ocorreu em ambiente de desenvolvimento**  
   Problemas apresentados durante a busca e criação não devem ser interpretados automaticamente como comportamento de produção.

7. **Vários campos dependem de decisão local**  
   A presença de um atributo não torna seu preenchimento obrigatório ou útil em todos os países e ramos.

8. **Há componentes históricos no modelo**  
   O catálogo de canal/dispositivo é citado como uma estrutura criada de forma não ideal, mas mantida por continuidade.

---

## 24. Riscos e desafios

### 24.1 Riscos explicitamente mencionados

- uso de campos para finalidades diferentes das originais;
- duplicidade ou redundância de classificação;
- perda de qualidade cadastral em operações descentralizadas;
- cobrança em data inadequada para o cliente;
- inconsistências entre forma de cobrança e dados bancários;
- falhas no tratamento de consentimentos, com possibilidade de multas;
- preenchimento incoerente de cliente Robinson e consentimentos;
- perda de entendimento funcional devido à rotatividade de equipes;
- manutenção manual excessiva de grupos empresariais;
- duplicidade de pessoas quando existem registros com documentos distintos.

### 24.2 Desafios derivados do contexto — análise

Os pontos abaixo são inferências analíticas, não declarações literais:

- **Governança de dados mestres:** quanto mais campos e catálogos existirem, maior será a necessidade de ownership claro, políticas de qualidade e controle de alterações.
- **Privacidade por desenho:** consentimentos, cliente Robinson, perfil analítico e métricas digitais sugerem necessidade de forte governança de privacidade, ainda que a arquitetura de proteção não tenha sido detalhada.
- **Integração entre módulos:** cobrança, tesouraria, fidelização, emissão, perfil analítico e terceiros precisam manter regras consistentes para evitar dados contraditórios.
- **Deduplicação de identidade:** relacionar registros por documento pai pode reduzir fragmentação, mas exige políticas claras para evitar que pessoas distintas sejam vinculadas indevidamente.
- **Operação multi-país:** a flexibilidade por companhia e país favorece adaptação local, mas pode gerar divergência de uso e dificultar comparabilidade corporativa.

---

## 25. Transformações estruturais identificadas — análise

A transcrição permite identificar algumas direções de transformação, sempre como leitura analítica:

### 25.1 Cadastro simples para visão 360º do cliente

O modelo não trata o terceiro apenas como participante pontual de uma apólice. Ele concentra informações cadastrais, comerciais, de relacionamento, compliance, fidelização e análise.

```text
Cadastro básico
↓
Contexto operacional e regulatório
↓
Relacionamento e segmentação
↓
Visão ampliada do segurado/cliente
```

### 25.2 Campo isolado para modelo governado por catálogos

A recorrência de catálogos indica uma tentativa de padronizar classificações e reduzir valores livres. O benefício esperado é consistência; o risco é a proliferação de catálogos sem governança.

### 25.3 Operação transacional para suporte a processos posteriores

O cadastro alimenta emissão, cobrança, tesouraria, fidelização, marketing, controles de compliance e análises. Assim, a qualidade do dado de terceiros deixa de ser uma preocupação exclusivamente administrativa.

### 25.4 Processamento online para combinação online + batch

O fluxo transacional coleta informações essenciais, enquanto dados analíticos e pontos de fidelização são atualizados em batch. Isso indica separação entre registro operacional imediato e enriquecimento posterior.

---

## 26. Números e indicadores citados

| Item | Valor citado | Contexto |
|---|---:|---|
| Blocos comuns de informação | 9 | Estrutura de cadastro compartilhada por atividades |
| Blocos específicos da atividade 1 | 5 | Informação adicional para segurados/clientes |
| Limite de busca do exemplo | 500 resultados | Parâmetro para tornar pesquisas operacionais |
| Limite de prevenção à lavagem — exemplo | 800 mil em euros | Ambiente/configuração demonstrada para pessoa física |
| Outro limite conceitual citado | 100 mil euros | Exemplo explicativo, não política confirmada |
| Funcionários de empresa exemplo | 47 | Exemplo de dados empresariais |
| Faturamento exemplo | 3,7 milhões em 2022 | Exemplo de empresa fictícia ou ilustrativa |
| Critério hipotético de grupo empresarial | acima de 5 milhões de dólares | Exemplo de regra local possível |
| Pontos disponíveis no exemplo | 30 | Plano de fidelização |
| Pontos mínimos no exemplo | 25 | Condição para desconto automático |
| Valor do recibo anual no exemplo | 500 euros | Demonstração de uso de pontos |
| Conversão de pontos no exemplo | 1 ponto = 1 euro | Exemplo local; pode variar |
| Apólices mencionadas em exemplo pessoal | 7 | Ilustração de cliente VIP/platina |
| Registros de histórico visualizados na demonstração | 3 alterações | Registro criado, copiado e posteriormente modificado |

> Os números são declarações ou exemplos usados durante o treinamento. Não devem ser tratados como parâmetros corporativos auditados ou universais.

---

## 27. Roadmap e próximos tópicos

Não foi apresentado um roadmap formal de produto, prazo, país ou versão.

O próximo tópico imediato indicado pelo instrutor é a **criação de agentes/intermediários**. Ele informa que, assim como segurados, agentes possuem:

- os nove blocos comuns de informação;
- três blocos específicos dentro da rotina de terceiros;
- dois catálogos adicionais relacionados, que não seriam cadastrados diretamente nessa rotina;
- relação futura com um “gestor de conteúdo de conceitos”.

A gravação/transcrição termina antes que esses componentes sejam explicados.

---

## 28. O que a reunião não permite concluir

A transcrição não detalha suficientemente:

- a tecnologia do núcleo apresentado;
- se o nome correto é Riftcore, Riscor ou outro;
- arquitetura de infraestrutura;
- banco de dados, embora Oracle seja mencionado em contexto de formato de data;
- APIs, eventos, mensageria ou integrações técnicas;
- autenticação, autorização, IAM ou segregação de funções;
- criptografia, mascaramento ou proteção de dados pessoais;
- retenção de dados e descarte;
- regras jurídicas específicas de consentimento;
- modelo de prevenção à lavagem de dinheiro e procedimentos de investigação;
- cálculo de rating, credit score, CLTV, abandono, cross-selling, saturação ou integralidade;
- critérios de atualização do perfil analítico;
- fonte dos dados digitais, de aplicativos e de comportamento web;
- mecanismo técnico para relacionamento por documento pai;
- regras de deduplicação e consolidação de cadastro;
- integração da fidelização com tesouraria;
- tratamento de cancelamentos, estornos e alterações em pontos;
- SLAs, monitoramento, observabilidade ou suporte;
- modelo de releases, patches e hotfixes;
- responsáveis nominais pelos catálogos e processos;
- cronograma de evolução do produto.

---

## 29. Conclusões

A reunião apresenta um núcleo de cadastro de terceiros voltado a uma visão abrangente de segurados e demais intervenientes de apólices. A atividade 1 concentra funcionalidades de relacionamento, classificação, cobrança, compliance, fidelização, consentimentos e análise, mas sua utilidade depende fortemente da configuração e da governança local.

A principal mensagem do instrutor é que flexibilidade não deve ser confundida com liberdade para reutilizar campos sem critério. Quando um dado pode ser obtido de outra estrutura, quando um catálogo possui uma finalidade específica ou quando uma regra precisa de processo operacional complementar, a companhia deve avaliar o modelo completo antes de configurar ou desenvolver soluções paralelas.

A criação de segurado a partir de outro terceiro demonstra reaproveitamento de informação, histórico e rastreabilidade, mas preserva separadamente os meios de cobrança e pagamento. Isso reforça a preocupação com coerência cadastral e com o tratamento adequado de dados financeiros.

Por fim, o perfil analítico e a fidelização mostram que o cadastro de terceiros não é somente uma estrutura operacional de emissão: ele funciona como ponto de convergência para estratégias de relacionamento, segmentação e exploração de dados, desde que os países implementem os processos locais necessários para alimentar e governar essas capacidades.
