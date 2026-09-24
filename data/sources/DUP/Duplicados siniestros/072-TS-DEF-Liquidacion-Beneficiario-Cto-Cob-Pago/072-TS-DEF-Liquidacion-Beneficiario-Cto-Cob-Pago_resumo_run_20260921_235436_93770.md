# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `072-TS-DEF-Liquidacion-Beneficiario-Cto-Cob-Pago.mp4`
**Data de processamento:** 21/09/2026 23:56:12
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise Estruturada — Configuração de Cobros e Pagamentos por Atividade em Sinistros

> **Escopo e rastreabilidade:** este documento foi elaborado exclusivamente a partir da transcrição fornecida. Não há timestamps, identificação de participantes, nome confirmado da plataforma ou material visual disponível. Alguns termos parecem resultar de reconhecimento automático de voz; essas incertezas são preservadas e sinalizadas.

## 1. Síntese executiva

A reunião trata da configuração de regras que controlam **quem pode receber pagamentos em processos de sinistro**, **para quais atividades** esses pagamentos podem ser realizados, **qual natureza de reserva financeira** se aplica e **qual conceito de cobrança e pagamento** deve ser utilizado.

O modelo apresentado parte de configurações anteriores por tipo de expediente — aparentemente processos ou tipos de sinistro — e avança para uma camada adicional de controle. Nessa nova camada, a organização precisa definir os beneficiários possíveis, as atividades associadas a cada beneficiário e os conceitos financeiros permitidos em cada combinação.

A principal finalidade é impedir pagamentos inadequados ou inconsistentes. Por exemplo, um segurado ou beneficiário de terceiro pode ser indenizado, enquanto um perito ou advogado deve receber honorários e despesas, não uma indenização por exercer sua profissão. A configuração é apresentada como um mecanismo de governança operacional e financeira que evita que um expediente permita pagamentos apenas por conter determinada informação cadastrada.

---

## 2. Contexto e antecedentes

A explicação parte de uma etapa já concluída: foram definidos os **conceitos de cobrança e pagamento por tipo de expediente**. A transcrição não explica em detalhe como essa configuração anterior funciona, mas deixa claro que ela, isoladamente, não é suficiente para liberar pagamentos.

O passo seguinte consiste em especificar:

1. quais beneficiários poderão receber pagamentos em sinistros;
2. quais atividades são permitidas para esses beneficiários;
3. quais conceitos de reserva financeira podem ser utilizados;
4. quais conceitos de cobrança e pagamento serão aplicáveis.

A apresentação utiliza exemplos vinculados ao setor de automóvel, com referências a oficinas, clínicas, peritos, advogados, segurados, transportadores/reboques, investigadores e outros prestadores relacionados ao tratamento de sinistros.

### Relação de causa e efeito reconstruída

A sequência lógica exposta pode ser representada assim:

```text
Configuração de conceitos por tipo de expediente
↓
Ainda existe risco de permitir combinações financeiras indevidas
↓
Necessidade de controlar beneficiário, atividade e natureza da despesa
↓
Definição de conceitos por atividade
↓
Pagamento permitido somente quando todas as regras forem compatíveis
```

Essa representação é uma **consolidação analítica** do fluxo descrito, e não um diagrama literal apresentado na reunião.

---

## 3. Problemas identificados

### 3.1. Risco de pagar destinatários ou atividades inadequados

A configuração não pode assumir que qualquer entidade presente em um expediente está automaticamente habilitada a receber qualquer tipo de pagamento.

Foi indicado que, mesmo que o expediente contenha uma configuração associada a determinado pagamento, a operação poderá ser bloqueada se a atividade e o conceito correspondente não estiverem explicitamente habilitados na manutenção de regras.

### 3.2. Confusão entre papel da pessoa e natureza do pagamento

Uma mesma pessoa pode exercer papéis distintos em um contexto de sinistro. O exemplo mais claro é o do advogado:

- quando atua como advogado, a transcrição indica que deve receber **honorários e despesas**;
- se for indenizado em razão de sua relação como segurado, o pagamento não deve ser tratado como pagamento profissional de advogado.

A apresentação busca evitar que o sistema interprete uma pessoa apenas pela sua profissão, ignorando o papel pelo qual ela está sendo paga naquele caso.

### 3.3. Necessidade de alinhar pagamentos e reservas

A configuração deve relacionar cada atividade a um **conceito de reserva**. Isso diferencia, por exemplo:

- indenizações destinadas a segurados ou beneficiários;
- honorários e despesas pagos a peritos, médicos ou advogados.

A consequência é que a natureza financeira do pagamento precisa corresponder ao tipo de destinatário e à atividade configurada.

### 3.4. Necessidade de compatibilidade tributária

Os conceitos de cobrança e pagamento devem estar definidos no nível da companhia e conter sua respectiva associação a impostos e retenções.

A transcrição não esclarece como são calculados os impostos, quais tributos são considerados ou quais regras de retenção existem. Contudo, deixa explícito que essa associação tributária é requisito para os conceitos utilizados na operação.

---

## 4. Solução apresentada

A solução apresentada é uma configuração de **conceitos de cobrança e pagamento por atividade**, complementando a configuração já existente por tipo de expediente.

Em termos funcionais, para permitir um pagamento de sinistro, é necessário determinar:

- o setor aplicável;
- o tipo de beneficiário, quando o destinatário for uma pessoa relacionada à apólice;
- a atividade exercida ou classificação operacional do destinatário;
- o conceito de reserva correspondente;
- o conceito de cobrança e pagamento autorizado.

A configuração funciona como uma matriz de permissão. Ela define quais combinações são aceitas e, consequentemente, bloqueia combinações não cadastradas.

### Regra operacional central

A apresentação sugere a seguinte lógica:

```text
Para realizar um pagamento:
  o destinatário deve estar associado a uma atividade permitida
  AND a atividade deve aceitar o conceito de reserva aplicável
  AND a combinação deve ter um conceito de cobrança e pagamento configurado
  AND esse conceito deve estar definido para a companhia, incluindo impostos e retenções.
```

Trata-se de uma reconstrução funcional baseada nos exemplos apresentados. A transcrição não fornece uma especificação técnica formal do motor de validação.

---

## 5. Arquitetura ou funcionamento lógico

Não foi apresentado um diagrama técnico, APIs, bancos de dados, eventos ou integrações externas. Ainda assim, é possível reconstruir o funcionamento lógico da configuração.

```text
Tipo de expediente / sinistro
↓
Beneficiário ou destinatário do pagamento
↓
Tipo de beneficiário, quando relacionado à apólice
↓
Atividade do destinatário
↓
Conceito de reserva
↓
Conceito de cobrança e pagamento
↓
Agrupamento de impostos e retenções
↓
Validação de permissão para pagamento
```

### Observação sobre o tipo de beneficiário

Segundo a explicação, o campo de tipo de beneficiário deve ser preenchido apenas quando o destinatário é uma **pessoa relacionada à apólice**. Foram citadas as seguintes relações:

- tomador;
- proprietário;
- condutor;
- segurado;
- beneficiário.

A transcrição não esclarece se essas relações são mutuamente exclusivas, como são modeladas no sistema, nem se existem outras relações disponíveis.

---

## 6. Componentes e conceitos mencionados

## 6.1. Tipo de expediente

O tipo de expediente parece funcionar como uma classificação inicial do processo de sinistro. A reunião informa que os conceitos de cobrança e pagamento por tipo de expediente já haviam sido definidos antes da etapa explicada.

Não é possível determinar, pela transcrição:

- quais são todos os tipos de expediente;
- como eles são criados;
- se correspondem a produtos, ramos, coberturas ou fluxos operacionais;
- quais regras específicas são aplicadas em cada tipo.

## 6.2. Beneficiário

O beneficiário é o destinatário potencial do pagamento de sinistro.

Quando o destinatário é uma pessoa vinculada à apólice, é necessário identificar sua relação, como tomador, proprietário, condutor, segurado ou beneficiário.

A explicação usa o termo “beneficiário” tanto como conceito genérico de recebedor quanto como uma das possíveis relações de uma pessoa com a apólice. Essa dupla utilização deve ser considerada na leitura funcional.

## 6.3. Atividade

A atividade representa a classificação do destinatário ou da finalidade operacional do pagamento. Ela é um elemento central da regra de autorização.

Foram mencionadas, entre outras, atividades ou categorias associadas a:

- oficinas;
- clínicas;
- peritos;
- inspetores;
- médicos;
- advogados;
- processadores ou supervisores;
- fornecedores da companhia;
- cobradores;
- seguradoras;
- empregados;
- tribunais/julgados;
- prestadores de serviços de vidro;
- profissionais de reparo, como fontaneiros/plomeros;
- eletricistas;
- serviços de guincho;
- investigadores;
- recuperadores de salvamentos;
- ferreiros.

A transcrição afirma que as atividades até o código 50 já estariam definidas pelo “core”. O termo **core** é mencionado, mas não há detalhes sobre qual sistema é esse, sua tecnologia, responsabilidade técnica ou modelo de integração.

Também foi indicado que podem existir outras atividades cadastradas pela própria companhia.

## 6.4. Conceito de reserva

O conceito de reserva determina a natureza financeira a ser utilizada para determinado pagamento.

A transcrição diferencia especialmente:

- **indenização**, aplicável, por exemplo, a segurados ou beneficiários de terceiros;
- **honorários e despesas**, aplicável a profissionais como peritos, médicos e advogados.

Em determinado trecho, aparecem referências a “tipo H” e “tipo G”, aparentemente relacionadas à classificação de conceitos ou reservas. Contudo, a transcrição não permite determinar com segurança o significado desses tipos. Eles devem ser preservados como termos não esclarecidos.

## 6.5. Conceito de cobrança e pagamento

O termo é repetido diversas vezes e aparece transcrito de forma provavelmente imperfeita como “cobre y pago barrio” ou formulações semelhantes.

Pelo contexto, trata-se de um código ou conceito financeiro usado para registrar ou processar pagamentos. A transcrição cita exemplos como:

| Código/conceito mencionado | Associação contextual |
|---|---|
| 01 | Indenização |
| 04 | Oficinas |
| 07 | Associado, no exemplo, a peritos com reserva de honorários |

> Os códigos foram reproduzidos conforme aparecem na transcrição. Não é possível confirmar sua numeração, nomenclatura oficial ou abrangência fora dos exemplos apresentados.

---

## 7. Modelo de integração e dependências

A reunião não apresenta integração entre sistemas no sentido técnico de APIs, mensageria, banco de dados, arquivos ou chamadas síncronas/assíncronas.

O que pode ser identificado são dependências funcionais internas entre cadastros e regras:

```text
Cadastro de atividades
↓
Configuração de atividades permitidas para pagamento
↓
Vinculação da atividade a um conceito de reserva
↓
Vinculação a um conceito de cobrança e pagamento
↓
Definição do conceito no nível da companhia
↓
Associação a impostos e retenções
```

### Dependência em relação ao core

A transcrição indica que determinadas atividades — até a atividade 50 — já vêm definidas pelo core. Isso sugere que o cadastro ou catálogo de atividades possui uma origem central para parte de seus itens.

Entretanto, não é possível concluir:

- se o core é um sistema externo ou o núcleo da própria solução;
- se a sincronização é automática;
- se a companhia pode alterar atividades oriundas do core;
- como novas atividades são incorporadas;
- se há validação de versões ou controles de governança.

---

## 8. Modelo operacional

A operação descrita é predominantemente configuracional. O fluxo explicado parece ser:

1. verificar as atividades disponíveis;
2. definir quais atividades podem receber pagamentos no contexto de sinistros;
3. associar cada atividade ao conceito de reserva adequado;
4. vincular o conceito de cobrança e pagamento correspondente;
5. salvar ou aceitar a configuração;
6. utilizar a matriz para validar pagamentos em expedientes futuros.

Foi exibido ou descrito um menu/manutenção denominado, aproximadamente:

> “conceitos de cobrança e pagamento por atividade”.

A transcrição não informa:

- quem possui permissão para realizar essa manutenção;
- se existe dupla aprovação;
- como são tratadas alterações de configuração;
- se há vigência temporal;
- se existem auditorias;
- como são tratadas exceções;
- se os pagamentos bloqueados geram mensagens de erro específicas.

---

## 9. Governança financeira e de configuração

A principal forma de governança apresentada é preventiva: só podem ser pagos destinatários e atividades que tenham sido previamente configurados.

Essa governança ocorre em pelo menos três níveis:

| Nível | Finalidade indicada |
|---|---|
| Tipo de expediente | Determinar conceitos aplicáveis ao tipo de processo |
| Atividade e beneficiário | Restringir quem pode receber e para qual finalidade |
| Companhia | Garantir que o conceito financeiro tenha impostos e retenções associados |

A apresentação reforça que a configuração serve para evitar “equivocações”, isto é, pagamentos incorretos em razão de cadastros amplos ou interpretações inadequadas da função exercida pelo destinatário.

Não foram apresentados comitês, papéis formais de aprovação, indicadores, políticas de segurança, controles de acesso ou processos de auditoria.

---

## 10. Casos e exemplos concretos

## 10.1. Oficina no setor de automóvel

A oficina é usada como exemplo de beneficiário ou atividade no contexto do setor de automóvel.

A transcrição cita uma “indenização da oficina”, mas o reconhecimento de voz não permite determinar com precisão se a intenção é classificar o pagamento à oficina como indenização ou se o termo foi utilizado de maneira genérica no exemplo.

Mais adiante, foi mencionado que às oficinas poderia ser associado o código/conceito “04”, identificado como “oficinas”.

## 10.2. Segurado e beneficiário de terceiros

A explicação indica que segurados e beneficiários de terceiros podem receber indenização.

Também é dito que não se deve pagar honorários e despesas a um segurado ou beneficiário de terceiros no papel de destinatário indenizatório.

## 10.3. Perito

O perito é apresentado como destinatário que recebe honorários e despesas, não indenização por sua atividade profissional.

No exemplo de manutenção, foi configurado para os peritos:

- uma atividade identificada como “3”;
- um conceito de reserva relacionado a honorários;
- um conceito de cobrança e pagamento indicado como “07”.

A transcrição não permite confirmar se esses valores são códigos oficiais ou apenas valores usados no ambiente demonstrado.

## 10.4. Médico

O médico é usado como exemplo de bloqueio de pagamento.

A explicação afirma que, mesmo que o expediente possua uma definição relacionada ao pagamento de médicos, o pagamento não será permitido caso não exista, na matriz de atividade, o médico associado ao conceito necessário.

Esse é um dos exemplos mais importantes da reunião porque demonstra que a configuração por tipo de expediente não substitui a configuração por atividade.

## 10.5. Advogado

O advogado deve receber honorários e despesas quando o pagamento decorrer de sua atividade profissional.

A apresentação também explora uma situação em que o advogado possa ter relação com uma companhia ou ser tratado em outro papel. A formulação transcrita é pouco clara, mas a intenção aparente é reforçar que a classificação do pagamento depende do papel assumido no evento: como advogado, recebe honorários; como segurado, recebe indenização.

Essa leitura é contextual e deve ser tratada como interpretação, pois a frase transcrita contém ruído.

## 10.6. Seguradoras

Foi citado um caso em que uma seguradora contrária poderia receber pagamento em situação de perdas ou danos de terceiros quando a responsabilidade fosse da própria companhia.

O trecho contém aparente repetição ou contradição, pois depois afirma que “às seguradoras também não vamos pagar”. Uma leitura possível é que a apresentação estivesse diferenciando situações específicas de ressarcimento ou responsabilidade de outras situações em que seguradoras não são destinatárias habilitadas.

A transcrição não permite consolidar uma regra definitiva sobre pagamentos a seguradoras.

## 10.7. Empregados

Os empregados não devem ser pagos como empregados no fluxo descrito. Caso recebam pagamento em razão de cobertura securitária, seriam tratados como segurados, e não como empregados.

## 10.8. Tribunais e consignações judiciais

Foi mencionado que tribunais ou julgados podem ser destinatários de pagamentos quando houver necessidade de consignações judiciais.

A transcrição não descreve o processo judicial, os tipos de consignação, os requisitos documentais ou o tratamento contábil.

## 10.9. Recuperadores de salvamentos

Os investigadores foram relacionados a pessoas ou entidades pagas para recuperar veículos roubados ou mercadorias roubadas. A transcrição os chama de “recuperadores de salvamentos”.

Esse exemplo evidencia que o catálogo de atividades não se restringe a prestadores tradicionais, como oficinas e clínicas, mas também contempla operações especializadas ligadas à recuperação de bens.

---

## 11. Perguntas e respostas

Não há uma seção formal de perguntas e respostas na transcrição. A maior parte do conteúdo assume formato de explicação didática, com perguntas retóricas feitas pela própria pessoa que apresenta o tema.

Ainda assim, essas perguntas estruturam o raciocínio e esclarecem aspectos importantes.

### Pergunta: “O que preciso fazer agora?”

**Resposta apresentada:** definir os beneficiários, isto é, as atividades às quais será possível realizar pagamentos em sinistros, e associar a elas os conceitos de cobrança e pagamento.

**O que isso esclarece:** a configuração por tipo de expediente é apenas uma etapa. A regra de pagamento depende de uma autorização adicional por atividade e destinatário.

---

### Pergunta: “O que significa o tipo de beneficiário?”

**Resposta apresentada:** indica uma pessoa relacionada à apólice, podendo ser tomador, proprietário, condutor, segurado ou beneficiário.

**O que isso esclarece:** o tipo de beneficiário não é um campo genérico para qualquer fornecedor. Ele deve ser preenchido quando há uma relação com a apólice.

---

### Pergunta: “Por que não se pagam honorários e despesas a um segurado ou beneficiário de terceiros?”

**Resposta apresentada:** porque esses destinatários devem ser indenizados; honorários e despesas se aplicam a profissionais, como peritos ou advogados.

**O que isso esclarece:** a classificação financeira do pagamento está vinculada ao papel desempenhado pelo recebedor.

---

### Pergunta: “O que ocorre se tentarmos pagar um médico?”

**Resposta apresentada:** o sistema não permitirá o pagamento se o médico não estiver configurado, naquela manutenção, com o conceito correspondente, mesmo que o expediente traga uma definição de pagamento a médicos.

**O que isso esclarece:** há validação cumulativa entre expediente e atividade. A permissão exige coerência entre as configurações.

---

## 12. Limitações reconhecidas

A transcrição apresenta várias lacunas que devem ser explicitamente preservadas.

### 12.1. Termos com possível erro de reconhecimento

Os seguintes termos aparecem de forma incerta:

- “cobre y pago barrio”;
- “ininización”;
- “horonarios”;
- “terrageros”;
- “julgados”;
- “concepto de reservados”;
- “tipo H” e “tipo G”.

Em alguns casos, o contexto sugere “cobrança e pagamento”, “indenização”, “honorários”, “tribunais” ou expressões similares, mas não é apropriado normalizá-los como nomenclatura oficial sem confirmação.

### 12.2. Escopo não detalhado do core

Embora tenha sido dito que atividades até a 50 já estão definidas pelo core, não se esclarece:

- qual é o sistema core;
- quem o mantém;
- quais atividades ele fornece;
- como ocorre a evolução desse catálogo.

### 12.3. Ausência de detalhes sobre configuração tributária

A necessidade de agrupamento de impostos e retenções foi mencionada, mas não foram descritos:

- tributos;
- alíquotas;
- regras por país ou região;
- critérios de incidência;
- tratamento de exceções.

### 12.4. Ausência de detalhamento técnico

A reunião não permite determinar com segurança:

- tecnologia da aplicação;
- banco de dados;
- APIs;
- mensageria;
- modelo de autenticação e autorização;
- trilha de auditoria;
- regras de versionamento;
- processo de implantação;
- regras de concorrência;
- comportamento em caso de falha;
- integrações contábeis ou de tesouraria.

---

## 13. Riscos e desafios

## 13.1. Riscos explicitamente abordados

| Risco | Como foi abordado |
|---|---|
| Pagamento para atividade não autorizada | A atividade deve estar cadastrada com o conceito aplicável |
| Uso incorreto de natureza financeira | A reserva diferencia indenização de honorários e despesas |
| Confusão entre relação contratual e profissão | O pagamento deve considerar o papel assumido no caso |
| Pagamento sem enquadramento tributário | O conceito deve existir no nível da companhia com impostos e retenções |
| Configuração incompleta | Mesmo havendo informação no expediente, o pagamento pode ser bloqueado |

## 13.2. Desafios derivados do contexto

As observações abaixo são inferências analíticas, não afirmações literais da reunião.

- **Manutenção da matriz de regras:** quanto maior o número de atividades, setores e conceitos, maior tende a ser o esforço para manter combinações coerentes.
- **Governança de alterações:** mudanças em conceitos ou atividades podem afetar a capacidade operacional de realizar pagamentos, especialmente se forem feitas sem validação adequada.
- **Qualidade cadastral:** o funcionamento depende de que o destinatário esteja corretamente classificado em seu papel e atividade.
- **Compreensão pelos usuários:** distinções entre segurado, beneficiário, fornecedor e profissional podem gerar erros de operação se os critérios não estiverem documentados e treinados.

---

## 14. Implicações técnicas e de negócio

### 14.1. Implicação de negócio

O modelo reduz a liberdade para pagamentos genéricos e direciona a operação para regras previamente aprovadas. Isso tende a reforçar consistência no tratamento de despesas e indenizações de sinistro.

### 14.2. Implicação financeira

A associação entre atividade, reserva, conceito de cobrança e pagamento, impostos e retenções indica que o pagamento não é tratado apenas como uma transferência financeira. Ele precisa ter uma classificação funcional e financeira compatível com sua natureza.

### 14.3. Implicação operacional

Os usuários precisam identificar corretamente o papel do destinatário no sinistro. Uma mesma pessoa pode ter classificações distintas conforme o contexto do pagamento.

### 14.4. Implicação de controle

O bloqueio de pagamento a médicos não configurados demonstra que o sistema pretende aplicar uma validação de negócio antes de permitir a operação. A regra funciona como proteção contra cadastros ou decisões inconsistentes no nível do expediente.

---

## 15. Mudança de paradigma identificável

A reunião não descreve uma transformação organizacional ampla, migração de arquitetura ou roadmap tecnológico. Contudo, há uma direção funcional claramente identificável:

```text
Pagamento definido apenas pelo expediente
↓
Pagamento governado por uma combinação de expediente,
beneficiário, atividade, reserva e conceito financeiro
```

Essa evolução pode ser interpretada como uma passagem de uma regra mais ampla para um modelo mais granular e controlado de autorização de pagamentos.

Essa é uma leitura analítica sustentada pelos exemplos apresentados, especialmente pelo caso do médico que não pode ser pago sem configuração por atividade.

---

## 16. Números e códigos citados

| Item | Valor mencionado | Contexto |
|---|---:|---|
| Atividades definidas pelo core | Até a 50 | A apresentação informa que atividades até esse número já estariam definidas pelo core |
| Conceito de indenização | 01 | Exemplo de conceito vinculado ao tomador |
| Conceito de oficinas | 04 | Exemplo de conceito vinculado a oficinas |
| Atividade de peritos | 3 | Exemplo apresentado na manutenção |
| Conceito associado a peritos | 07 | Exemplo vinculado a peritos e honorários |

> Os valores acima são os declarados na transcrição e não foram validados em ambiente, documentação ou sistema. A reunião não esclarece se são códigos permanentes, exemplos de treinamento ou valores específicos de uma configuração demonstrada.

---

## 17. O que a reunião não permite concluir

A transcrição não permite concluir com segurança:

1. o nome do sistema ou produto demonstrado;
2. a definição oficial de “conceitos de cobrança e pagamento”;
3. o significado preciso de “tipo H” e “tipo G”;
4. quais atividades estão efetivamente disponíveis no catálogo completo;
5. quais atividades são obrigatórias para cada ramo de seguro;
6. se as regras variam por país, unidade, produto ou apólice;
7. se existem datas de vigência para as configurações;
8. como são aprovadas alterações de regras;
9. quais usuários podem configurar ou executar pagamentos;
10. quais mensagens ou comportamentos o sistema apresenta ao bloquear uma operação;
11. como impostos e retenções são calculados;
12. como ocorre integração com contabilidade, tesouraria, fornecedores ou sistemas externos;
13. se há auditoria, histórico de alterações, segregação de funções ou trilha de aprovação;
14. como o sistema trata exceções legítimas de pagamento;
15. se as referências a seguradoras constituem regra geral ou exceção específica.

---

## 18. Conclusões principais

A reunião descreve uma etapa de configuração essencial para controlar pagamentos em sinistros. Após definir conceitos de cobrança e pagamento por tipo de expediente, a organização deve completar a modelagem com regras por beneficiário e atividade.

O princípio central é que o pagamento só deve ocorrer quando houver coerência entre:

- o processo de sinistro;
- o destinatário;
- seu vínculo com a apólice, quando aplicável;
- a atividade exercida;
- o conceito de reserva;
- o conceito de cobrança e pagamento;
- a configuração tributária no nível da companhia.

A apresentação enfatiza que a mesma pessoa ou entidade pode receber pagamentos de naturezas diferentes conforme seu papel no caso. Por isso, o modelo busca separar indenizações de pagamentos profissionais, como honorários e despesas.

O exemplo do médico sintetiza a regra de governança: a simples existência de uma possibilidade de pagamento no expediente não basta. A atividade também precisa estar explicitamente habilitada com o conceito correto.
