# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `0016-TE-CREAR-Proveedor.mp4`
**Data de processamento:** 20/09/2026 15:10:11
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise Estruturada — Gestão e Configuração de Fornecedores no “Riftcore” e Integração com Autosserviço

> **Nota de fidelidade:** esta análise foi construída exclusivamente a partir da transcrição fornecida. Alguns termos parecem ter sido afetados pelo reconhecimento automático de voz — especialmente o nome da plataforma, registrado como “Riftcore”, “Rift Core” e, em alguns trechos, de forma semelhante a “Risco”. Neste documento, será adotada a forma **Riftcore** para facilitar a leitura, sem afirmar que esse seja necessariamente o nome oficial do produto.

## 1. Síntese executiva

A reunião foi um treinamento funcional e operacional sobre o cadastro, a configuração e o uso de **fornecedores** dentro do núcleo denominado na transcrição como Riftcore. O exemplo principal utilizado foi o de uma **oficina automotiva**, mas foi reforçado diversas vezes que o mesmo modelo conceitual poderia ser aplicado a outros tipos de fornecedores, como clínicas, hospitais, ambulâncias, guinchos, ajustadores, funerárias e outros prestadores relacionados a diferentes ramos de seguros.

A principal mensagem foi que o cadastro de fornecedor no Riftcore possui duas camadas:

1. **Cadastro do fornecedor como terceiro:** reúne dados cadastrais, identificação, informações fiscais, dados gerais, documentos, representantes, acionistas, meios de pagamento e outros blocos compartilhados com outros tipos de terceiros.
2. **Configuração específica como fornecedor:** define atributos operacionais que permitem seu uso em processos posteriores, especialmente em sinistros e na integração com o **autosserviço de fornecedores**. Entre esses atributos estão serviços prestados, marcas atendidas, capacidades, horários de atendimento, zonas de atuação, tarifas, exceções tarifárias, documentos, avaliações, ocorrências e possíveis registros de fraude.

A apresentação também destacou que o Riftcore **não é o único sistema envolvido**. Há uma plataforma paralela, chamada de autosserviço de fornecedores, responsável por boa parte da operação cotidiana do prestador: gestão de ordens, notificações, agenda, usuários, planos de ação e outras atividades operacionais. Os sistemas são descritos como integrados por APIs e serviços.

A reunião não teve caráter de definição de arquitetura técnica detalhada. Seu foco foi explicar o funcionamento funcional da configuração de fornecedores, demonstrar telas e catálogos, mostrar dependências entre cadastros e alertar que a adoção local depende do modelo corporativo, do país e dos produtos ou ramos implementados.

---

## 2. Contexto e antecedentes

### 2.1. Fornecedor como uma especialização de terceiro

O ponto de partida da explicação é que um fornecedor é, antes de tudo, um **terceiro**. Portanto, boa parte de suas informações é tratada dentro da rotina geral de terceiros.

Foi mencionado que terceiros podem possuir “nove blocos” principais de informação compartilhada entre atividades. Embora a transcrição não enumere esses nove blocos de maneira formal e fechada, ela cita dados como:

- dados básicos;
- dados de identificação;
- informações de pessoa física ou jurídica;
- pessoa politicamente exposta;
- obrigações fiscais;
- contatos;
- direções/endereço;
- representantes legais;
- acionistas;
- meios de cobrança ou pagamento;
- documentos alternativos;
- contratos.

A diferença do fornecedor não está em deixar de ser terceiro, mas em receber uma **identificação adicional por atividade**. A atividade deve ser marcada com um atributo que informa se ela corresponde ou não a um fornecedor.

### 2.2. Evolução funcional relatada

A transcrição afirma que a funcionalidade de tratamento de fornecedores foi ampliada no “mundo de Riftcore atual” ou “novo modelo”. O processo básico apresentado é simples em sua origem:

- configurar ou identificar uma atividade como fornecedora;
- criar o terceiro;
- registrar as informações específicas do fornecedor;
- completar a configuração operacional necessária para o uso nos fluxos posteriores.

Não foram detalhados na reunião os marcos de versão, datas, responsáveis pela evolução nem a tecnologia utilizada nessa ampliação funcional.

### 2.3. Exemplo predominante: oficinas

A maior parte da demonstração usa uma oficina como exemplo porque, segundo o instrutor, esse é o cenário em que a organização mencionada na transcrição — aparentemente “MAPFRE”, embora a gravação registre variações como “Mafre” — concentrou maior esforço funcional.

O instrutor ressalta, porém, que o modelo não deve ser entendido como exclusivo de oficinas. A mesma estrutura poderia ser usada para:

- guinchos;
- ajustadores;
- ambulâncias;
- clínicas;
- hospitais;
- funerárias;
- outros fornecedores vinculados a produtos e ramos específicos.

---

## 3. Problemas e necessidades tratados

## 3.1. Necessidade de diferenciar fornecedores de outros terceiros

O primeiro problema funcional é distinguir um terceiro genérico de um terceiro que atua como fornecedor. Isso é resolvido, conforme descrito, pela associação da atividade a um atributo que indica que ela possui natureza de fornecedor.

### Consequência prática

Sem essa classificação, não seria possível filtrar adequadamente as atividades fornecedoras nem habilitar os blocos específicos usados para configurar o prestador.

---

## 3.2. Necessidade de reunir dados operacionais além do cadastro cadastral

O cadastro básico do terceiro não é suficiente para que um fornecedor possa operar em processos de negócio. Uma oficina, por exemplo, precisa ter definidos:

- serviços que executa;
- marcas de veículos que atende;
- capacidade diária;
- parcela de sua capacidade dedicada à seguradora;
- duração estimada das citações;
- zonas de atribuição;
- tarifas aplicáveis;
- exceções tarifárias;
- horários de atendimento;
- recursos disponíveis;
- documentação;
- indicadores de avaliação;
- informações relacionadas a fraude, quando aplicável.

A reunião apresenta essa necessidade como uma separação entre:

- **quem é o fornecedor**, tratado no cadastro de terceiro;
- **como o fornecedor pode ser utilizado operacionalmente**, tratado na configuração específica de fornecedor.

---

## 3.3. Necessidade de integrar a configuração ao autosserviço

A configuração realizada no Riftcore é apresentada como base para o funcionamento de um autosserviço de fornecedores. Esse autosserviço, segundo a reunião, utiliza APIs para consultar ou consumir informações configuradas no core.

A relação causal apresentada pode ser sintetizada assim:

```text
Cadastro e configuração do fornecedor no Riftcore
↓
Disponibilização de serviços, capacidades, marcas, tarifas e demais atributos
↓
Integração por APIs/serviços com o autosserviço de fornecedores
↓
Operação do fornecedor em processos como ordens de serviço e sinistros
```

---

## 3.4. Necessidade de evitar tratar todas as integrações e capacidades como universais

A reunião repetidamente alerta que a implementação depende de:

- país;
- ramo ou produto;
- modelo local de operação;
- escopo contratado ou acordado;
- capacidade do autosserviço de fornecedores;
- diretrizes corporativas.

Assim, embora o modelo seja apresentado como reutilizável, não há evidência de que todos os países, ramos ou tipos de fornecedores disponham das mesmas funcionalidades prontas.

---

## 4. Solução apresentada

A solução apresentada é um modelo de gestão de fornecedores baseado em cadastro de terceiros, configuração funcional e integração com sistemas operacionais externos ao core.

## 4.1. Etapa 1 — Criar o fornecedor como terceiro

O fornecedor é cadastrado como um terceiro, com os dados compartilhados por outras atividades. Entre os blocos mencionados estão:

- dados básicos;
- dados de identificação;
- tipo de pessoa;
- informações de pessoa física ou jurídica;
- pessoa politicamente exposta;
- obrigações fiscais;
- contratos;
- documentos;
- representantes legais;
- acionistas;
- endereços;
- meios de pagamento ou cobrança.

Para o exemplo de oficina, o instrutor cria uma pessoa jurídica e demonstra o preenchimento de dados cadastrais, embora alguns campos sejam preenchidos apenas como ilustração.

## 4.2. Etapa 2 — Informar atributos específicos de fornecedor

A criação do fornecedor acrescenta blocos específicos, entre eles:

- tipologia e categoria do fornecedor;
- informação geral;
- impostos e retenções;
- informação genérica;
- dados bancários;
- serviços e marcas;
- serviços de valor agregado;
- zonas de atribuição;
- tarifas;
- exceções tarifárias;
- ocorrências;
- dados de atendimento;
- dados de capacidade;
- dados de avaliação;
- possíveis dados de fraude.

## 4.3. Etapa 3 — Usar a configuração nos processos operacionais

Após o cadastro e a configuração, os atributos do fornecedor podem ser usados em processos posteriores, especialmente:

- emissão ou gestão de ordens de serviço;
- tramitação de sinistros;
- agenda e atendimento;
- atribuição automatizada, conforme capacidade e limites;
- cálculo ou tratamento de honorários e pagamentos por serviços prestados;
- acompanhamento de avaliação, reclamações e fraude.

A reunião não detalha o fluxo completo desses processos. O instrutor informa que parte importante do tema seria vista posteriormente com uma pessoa chamada Marta, no contexto de sinistros.

---

## 5. Arquitetura e funcionamento lógico reconstruído

> **Importante:** o desenho abaixo é uma consolidação analítica do que foi explicado verbalmente. Não foi apresentado como diagrama literal durante a reunião.

```text
Usuários internos / equipes operacionais
↓
Riftcore
  ├─ Cadastro geral de terceiros
  ├─ Identificação de atividade fornecedora
  ├─ Configuração específica de fornecedores
  │   ├─ Serviços
  │   ├─ Marcas
  │   ├─ Capacidade
  │   ├─ Atendimento
  │   ├─ Zonas
  │   ├─ Tarifas
  │   ├─ Avaliações
  │   ├─ Ocorrências
  │   └─ Fraudes
  └─ Gestão documental por “Documento”
↓
APIs / serviços
↓
Autosserviço de fornecedores
  ├─ Acesso e registro de fornecedores/candidatos
  ├─ Gestão operacional
  ├─ Ordens de serviço
  ├─ Agenda
  ├─ Notificações
  ├─ Usuários e perfis
  ├─ Planos de ação
  └─ Execução operacional pelo fornecedor
↓
Processos de sinistros e liquidações
  ├─ Atribuição de serviços
  ├─ Uso de capacidades e critérios configurados
  ├─ Controle de serviços prestados
  └─ Pagamento de honorários ao fornecedor
```

## 5.1. Riftcore como núcleo de configuração

O Riftcore é apresentado como o núcleo onde o fornecedor é identificado e configurado. Ele guarda informações que orientam o uso posterior do fornecedor, tais como:

- se sua atividade é fornecedora;
- serviços disponibilizados;
- marcas atendidas;
- capacidade;
- dados de atendimento;
- zonas;
- tarifas;
- exceções;
- documentos;
- indicadores.

## 5.2. Autosserviço como plataforma operacional complementar

O autosserviço de fornecedores é apresentado como um sistema diferente do core, ainda que integrado a ele. A transcrição cita funcionalidades que não fazem parte do Riftcore como tal:

- gestão de candidatos e ofertas de fornecedores;
- recuperação de senha;
- acesso;
- registro de fornecedores e candidatos;
- desbloqueio;
- gestão de usuários;
- determinadas capacidades operacionais;
- gestão de frotas, em cenários específicos;
- geolocalização/GPS de veículos, em cenários específicos;
- execução das operações pelo prestador.

O instrutor enfatiza que, quando o fornecedor é criado no Riftcore, parte significativa da sua jornada operacional pode já estar resolvida em outro sistema.

## 5.3. Sinistros como consumidor relevante das configurações

A área de sinistros aparece como importante consumidora da configuração de fornecedores. São mencionados:

- plano de tramitação de sinistros;
- agendamento de atendimento;
- ordens de serviço;
- execução de ordens;
- liquidações;
- remuneração por honorários de serviços prestados;
- gestão de ocorrências;
- gestão de fraude.

A transcrição sugere que a maior “substância” operacional do tema aparece em sinistros, e não apenas nas telas de cadastro.

---

## 6. Componentes e blocos funcionais mencionados

## 6.1. Atividade fornecedora

### Finalidade

Determinar que uma atividade deve ser tratada como fornecedor.

### Funcionamento descrito

Ao criar ou configurar um fornecedor, os filtros exibem apenas as atividades que foram identificadas como fornecedoras.

### Limitação observada

A transcrição não explica onde, tecnicamente, esse atributo é persistido, quem pode alterá-lo ou quais validações existem para sua manutenção.

---

## 6.2. Tipologia e categoria do fornecedor

### Finalidade

Classificar o fornecedor de acordo com catálogos previamente configurados.

### Elementos citados

- tipologia;
- categoria;
- companhia;
- idioma;
- descrição;
- classificações como “recomendado” ou “recomendado plus”, mencionadas como exemplos.

### Dependência

A tipologia e a categoria dependem de catálogos configurados previamente.

### Observação

A transcrição indica a existência de dois catálogos para tipologias e categorias, mas não especifica seu modelo de dados, governança ou responsáveis por sua manutenção.

---

## 6.3. Informação geral do fornecedor

### Finalidade

Registrar dados operacionais e contratuais gerais do fornecedor.

### Campos e conceitos mencionados

- data de validade;
- estado do fornecedor;
- estado ativo;
- estado suspenso;
- estado de baixa;
- condição de inabilitado;
- número de colegiação ou colegiatura, quando aplicável;
- contrato com a seguradora;
- identificador contratual;
- data de início do contrato;
- data de fim;
- observações;
- causas relacionadas à situação do fornecedor;
- documentos associados.

### Implicação operacional

Foi explicitado que um fornecedor suspenso não pode receber ordens de trabalho ou ordens de serviço. Um fornecedor baixado também deixa de operar, por exemplo, em razão de encerramento de atividade ou outra circunstância semelhante.

### Ponto não detalhado

Não foi explicado quais transições de estado são permitidas, quem as aprova, nem se há workflow formal para suspensão, baixa ou reativação.

---

## 6.4. Dados fiscais e retenções

### Finalidade

Registrar dados necessários ao tratamento fiscal e à remuneração do fornecedor.

### Informações mencionadas

- código de identificação fiscal;
- tipo de IVA/IVA;
- IVA normal, reduzido ou isento;
- tipo de retenção;
- compensação econômica pelos serviços;
- relação com configurações de tesouraria;
- meio de cobrança ou pagamento.

### Dependências

O tipo de retenção é descrito como configurado na tesouraria e posteriormente utilizado no cadastro do fornecedor.

### Limitação

A reunião não descreve regras fiscais por país, moedas, cálculo tributário, retenções efetivas nem fluxos contábeis.

---

## 6.5. Informações genéricas

### Finalidade

Concentrar informações adicionais que, segundo o instrutor, foram agrupadas em um novo bloco para fornecedores.

### Exemplos mencionados

- escritório comercial;
- número de agrupamento;
- código ou classificação de qualidade;
- classificação da atividade.

### Observação

O instrutor demonstra um ambiente no qual determinados valores de catálogo não estavam disponíveis. Isso não foi apresentado como comportamento esperado da solução, mas como limitação daquele ambiente.

---

## 6.6. Documentos e gestão documental

### Finalidade

Permitir anexar e classificar documentos relacionados ao fornecedor.

### Integração funcional

O armazenamento é realizado em um componente ou gestor referido como **“Documento”**.

### Tipologias documentais mencionadas

- documentação administrativa;
- documentação econômica;
- documentação operacional.

### Exemplos de tipos de informação associados

| Categoria | Exemplos citados |
|---|---|
| Administrativa | certificado, contrato, DNI/documento de identidade, fotografia, licença |
| Econômica | fatura, tarifas |
| Operacional | protocolo de atuação |

### Regras e governança citadas

O mapa documental deveria ser definido pelo país, de acordo com seus tipos de documentos e forma de indexação.

### Demonstração realizada

O instrutor demonstra o carregamento de um documento de identidade de exemplo, classificado como documentação administrativa.

### Limitação

Não foram detalhados:

- formatos de arquivo aceitos;
- tamanho máximo;
- controles de segurança;
- versionamento;
- expiração documental;
- aprovação de documentos;
- retenção e descarte;
- modelo de permissões do gestor documental.

---

## 6.7. Serviços do fornecedor

### Finalidade

Definir os serviços que o fornecedor é capaz de prestar.

### Exemplo demonstrado

Para uma oficina:

- funilaria/chapa;
- pintura.

### Atributos citados

- serviço;
- capacidade diária total;
- capacidade diária dedicada à seguradora;
- observações;
- indicador de inabilitado;
- duração de atendimento ou de citação;
- data de validade.

### Exemplo narrado

O instrutor descreve uma oficina com capacidade diária para dez veículos em determinado serviço, dos quais cinco seriam dedicados à seguradora. Para pintura, descreve uma capacidade menor, como três veículos, dos quais dois seriam destinados à seguradora.

Esses valores foram usados apenas como exemplo de demonstração, não como regra do produto.

### Implicação

A capacidade configurada pode influenciar a atribuição de ordens de serviço, especialmente quando os limites configurados são atingidos.

---

## 6.8. Marcas atendidas

### Finalidade

Indicar quais marcas de veículos uma oficina atende.

### Exemplos citados

- Alfa Romeo;
- Audi.

### Atributos mencionados

- marca;
- tipo de veículo;
- observações;
- situação de habilitado ou inabilitado;
- data de vigência.

### Possível evolução mencionada

O instrutor menciona, como hipótese de evolução, a necessidade de discriminar não apenas o tipo de veículo, mas também uma tipologia de motor, por exemplo:

- híbrido;
- outra categoria de motorização não especificada.

Essa possibilidade não foi apresentada como funcionalidade existente, mas como eventual evolução dependente de uso pelo autosserviço de fornecedores.

---

## 6.9. Serviços de valor agregado

### Finalidade

Diferenciar serviços básicos do fornecedor de serviços complementares ou de valor agregado.

### Exemplos citados

- limpeza do veículo antes da entrega ao cliente;
- veículo substituto para evitar que o segurado fique sem mobilidade.

### Classificação

O instrutor diferencia:

- serviços básicos, referidos como um tipo;
- serviços de valor agregado, referidos como outro tipo.

A transcrição não permite confirmar os nomes oficiais dos tipos nem os códigos usados.

---

## 6.10. Zonas de atribuição

### Finalidade

Definir a abrangência geográfica ou a zona em que o fornecedor pode ser utilizado.

### Características citadas

- zonas vêm de catálogo;
- possuem vigência própria;
- podem ser habilitadas ou inabilitadas;
- sua vigência não precisa coincidir com a vigência dos serviços.

### Implicação

Um fornecedor pode ter, por exemplo, um serviço válido em determinada data e uma zona de atribuição válida em outro período. A configuração parece permitir granularidade temporal por elemento.

---

## 6.11. Tarifas e exceções tarifárias

### Finalidade

Associar tarifas ao fornecedor e definir exceções para conceitos específicos.

### Modelo apresentado

```text
Catálogo de tarifas
↓
Código de tarifa
↓
Conceitos vinculados à tarifa
↓
Valores ou regras padrão
↓
Exceção por fornecedor e, possivelmente, por zona
```

### Elementos mencionados

- código de tarifa;
- data de vigência;
- conceitos tarifários;
- valor mínimo;
- valor máximo;
- moeda;
- zona geográfica;
- exceções específicas por fornecedor;
- honorários do fornecedor.

### Distinção importante

O instrutor esclarece que os valores configurados para o fornecedor se relacionam aos honorários por serviços prestados. Eles não devem ser confundidos com:

- despesas de sinistro;
- conceitos de indenização ao segurado.

### Justificativa para exceções

A reunião apresenta como exemplo a possibilidade de um fornecedor receber tratamento tarifário diferenciado por oferecer melhor serviço aos segurados.

### Limitação

Não foram detalhados:

- regras de cálculo;
- precedência entre tarifas;
- conflitos entre vigências;
- aprovação de exceções;
- integração contábil;
- moeda padrão;
- tributação sobre valores;
- mecanismo de liquidação.

---

## 6.12. Ocorrências — termo registrado de forma incerta

A transcrição usa reiteradamente um termo reconhecido de forma semelhante a “icurreses”, “iqrf” ou “eqrf”. O contexto indica que se trata de algum tipo de ocorrência, incidência, reclamação ou registro relacionado ao fornecedor, mas o nome correto não pode ser determinado com segurança.

### Informações associadas ao termo

Foram mencionados campos ou conceitos como:

- estado;
- impacto;
- informante;
- afetados;
- possíveis afetados;
- departamentos afetados;
- se era ou não uma queixa;
- tipos e categorias de ocorrência.

### Limitação explícita

O próprio instrutor afirma que esse tema seria visto de forma mais detalhada no módulo de sinistros. Portanto, a reunião não fornece detalhes suficientes para documentar seu comportamento completo.

---

## 6.13. Dados de atendimento

### Finalidade

Configurar quando o fornecedor pode atender clientes ou segurados.

### Atributos mencionados

- dias da semana;
- atendimento em determinados períodos;
- habilitação ou inabilitação do dia;
- horário;
- vigência;
- possibilidade de configuração de segunda-feira a domingo;
- referência a “7 por 24”, aparentemente para disponibilidade contínua.

### Uso esperado

Os dados de atendimento serviriam para viabilizar agendamento de citações no contexto da tramitação de sinistros.

---

## 6.14. Dados de capacidade

### Finalidade

Controlar recursos e limites operacionais do fornecedor.

### Exemplos citados

- número de vagas;
- limite de serviços pendentes;
- número de recursos atribuídos;
- veículos em uma oficina;
- guinchos disponíveis;
- capacidade de atendimento por tipo de recurso.

### Comportamento descrito

O instrutor afirma que, caso um limite seja alcançado, o automatismo de atribuição de ordens de serviço não deveria encaminhar mais veículos ou serviços para aquele fornecedor.

### Exemplo

Uma oficina com limite de cinco vagas não deveria receber novos veículos por atribuição automática depois de atingir esse limite.

### Observação

A transcrição não especifica se esse bloqueio é obrigatório, configurável, em tempo real ou dependente do autosserviço.

---

## 6.15. Dados de avaliação

### Finalidade

Registrar indicadores e avaliações do fornecedor.

### Itens mencionados

- pontuação;
- número de reclamações;
- data de auditoria;
- métricas;
- observações;
- documentação de evidência, potencialmente anexada ao gestor documental.

### Métricas

O instrutor demonstra uma métrica classificada como valor monetário, afirmando que era a única disponível no catálogo daquele ambiente. Também menciona que métricas poderiam ser definidas por:

- valor;
- percentual;
- dias;
- horas.

### Limitação

Não foram detalhados:

- fórmula das métricas;
- origem dos dados;
- responsáveis pela avaliação;
- periodicidade;
- consequências para a elegibilidade do fornecedor;
- uso da avaliação na seleção automática.

---

## 6.16. Dados de fraude

### Finalidade

Registrar uma suspeita, acompanhamento e eventual conclusão de fraude vinculada ao fornecedor.

### Informações mencionadas

- identificador de fraude;
- código ou registro por estado;
- tipo de fraude;
- possível fraudador;
- fornecedor;
- segurado;
- condutor;
- estado;
- processo de investigação;
- revisão;
- conclusão;
- fraude confirmada ou não confirmada;
- motivo ou tipo de conclusão;
- classificação como ocasional;
- observações;
- data.

### Exemplo demonstrado

O instrutor usa, como exemplo fictício, um dano aparentemente causado manualmente com um martelo. O caso é inicialmente registrado como possível fraude e posteriormente encerrado como não confirmado, após suposta análise pericial.

Esse exemplo é didático e não representa um caso real documentado na reunião.

### Esclarecimento posterior

Após uma pergunta, o instrutor explica que registros com identificadores e códigos distintos podem representar estados diferentes de um mesmo caso de fraude do fornecedor. Contudo, ele também admite não conhecer o modelo de dados físico nem a tabela em que os dados de fraude se acumulam.

---

## 7. Modelo de integração

## 7.1. Integração entre Riftcore e autosserviço de fornecedores

A reunião afirma explicitamente que Riftcore e o autosserviço de fornecedores são integrados por:

- APIs;
- serviços.

O autosserviço utiliza as definições realizadas no Riftcore para operar elementos como:

- capacidades;
- gestão;
- marcas;
- serviços;
- tarifas;
- demais dados operacionais configurados.

## 7.2. Limite de responsabilidade de cada sistema

A divisão apresentada pode ser interpretada assim:

| Domínio | Papel predominante apresentado |
|---|---|
| Riftcore | Cadastro e configuração funcional do fornecedor |
| Autosserviço de fornecedores | Operação cotidiana do fornecedor e sua interação com a plataforma |
| Sinistros | Uso do fornecedor em ordens, tramitação, atendimento e liquidação |
| Documento | Armazenamento e classificação documental |
| Tesouraria | Configuração de retenções e aspectos associados ao pagamento |

> Esta tabela é uma reorganização analítica das falas, não uma definição formal de arquitetura institucional.

## 7.3. Integração com sistemas externos dos próprios fornecedores

O instrutor observa que oficinas pequenas e médias podem ter maior probabilidade de utilizar o autosserviço proposto pela seguradora. Já oficinas grandes ou de marcas podem possuir sistemas próprios.

Foi mencionada a possibilidade de esses fornecedores grandes integrarem seus sistemas via APIs, mas isso não foi descrito como padrão obrigatório ou funcionalidade detalhada.

---

## 8. Modelo operacional apresentado

## 8.1. Criação e configuração

O fluxo operacional demonstrado é aproximadamente:

```text
Selecionar atividade marcada como fornecedor
↓
Criar terceiro
↓
Cadastrar dados básicos e de identificação
↓
Definir tipologia e categoria
↓
Registrar informação geral
↓
Preencher impostos, retenções e dados genéricos
↓
Criar o fornecedor
↓
Acessar blocos específicos de fornecedor
↓
Configurar documentos, serviços, marcas, capacidade,
zonas, tarifas, atendimento, avaliação e demais dados necessários
```

## 8.2. Validações

Foram mencionadas validações de campos obrigatórios e validações específicas por bloco.

Também foi demonstrado um problema no ambiente de desenvolvimento, no qual determinado cadastro não pôde ser criado ou localizado corretamente. O instrutor afirma que o comportamento parece ser um defeito do ambiente ou uma validação inadequada, não uma regra esperada do núcleo.

## 8.3. Vigência e histórico

Vários blocos possuem:

- data de início;
- data de fim ou validade;
- inabilitação;
- histórico de alterações.

A reunião mostra que alterações futuras, como desabilitar um serviço em determinada data, permitem preservar histórico e controlar desde quando uma capacidade deixa de estar disponível.

## 8.4. Operação posterior pelo fornecedor

A operação cotidiana é atribuída principalmente ao autosserviço. São mencionadas ações como:

- tomar conhecimento de ordens de serviço;
- executar atividades;
- operar agenda;
- receber notificações;
- gerenciar usuários;
- realizar ações operacionais;
- administrar planos de ação;
- encerrar ou bloquear atividades, em contexto operacional.

---

## 9. Governança e dependências organizacionais

## 9.1. Papel corporativo

A reunião afirma que o autosserviço de fornecedores possui caráter mais corporativo e é orientado por planos da área de operações corporativa.

A implantação local, portanto, depende de alinhamento com essa estrutura corporativa.

## 9.2. Papel dos países

Cada país parece ter responsabilidade ou influência sobre elementos como:

- mapa documental;
- tipos de documentos;
- tipos de fornecedores;
- necessidades locais;
- catálogo e estruturas aplicáveis;
- implementação por ramo ou produto.

O instrutor menciona que, se um país quiser usar clínicas, hospitais ou outro tipo de fornecedor em determinado ramo, será necessário configurar adequadamente a informação correspondente no Riftcore e avaliar a capacidade do autosserviço.

## 9.3. Papel do acordo de manutenção ou implantação

A transcrição menciona que determinados aspectos podem depender do acordo firmado com a organização citada como “MAPFRE”. Não há detalhes suficientes para determinar:

- natureza do contrato;
- escopo de manutenção;
- fornecedores envolvidos;
- responsabilidades formais;
- níveis de serviço.

---

## 10. Modelo de produto e transformação percebida

> Esta seção contém leitura analítica baseada nas falas. Não representa necessariamente uma formulação literal dos participantes.

A reunião sugere uma transformação de um cadastro meramente administrativo de prestadores para uma abordagem de **fornecedor como capacidade operacional configurável**.

Em vez de tratar uma oficina apenas como uma empresa com dados fiscais e contratuais, o modelo apresentado permite expressar:

- o que ela faz;
- para quais marcas;
- em quais zonas;
- com qual capacidade;
- em quais horários;
- sob quais tarifas;
- com quais exceções;
- com quais critérios de avaliação;
- com quais limites de atribuição.

Uma leitura possível é que isso busca permitir que processos de sinistro usem fornecedores de maneira mais estruturada, automatizável e auditável.

Também há indícios de uma mudança de uma operação isolada por sistema para um ecossistema composto por:

```text
Core de configuração
+
Autosserviço operacional
+
Integrações por APIs
+
Processos de sinistros
+
Gestão documental
+
Configurações de tesouraria
```

A transcrição não apresenta esse modelo como uma arquitetura de microsserviços, nem informa se há mensageria, eventos, banco compartilhado, cloud, containers ou outras características técnicas.

---

## 11. Casos concretos e exemplos apresentados

## 11.1. Oficina automotiva

### Contexto

A oficina é o principal exemplo da demonstração. É tratada como pessoa jurídica e fornecedora de serviços relacionados a automóveis.

### Componentes configurados

- categoria e tipologia;
- dados gerais;
- dados fiscais;
- serviços de funilaria/chapa e pintura;
- capacidade diária;
- capacidade dedicada à seguradora;
- duração de citações;
- marcas atendidas;
- zonas;
- tarifas;
- exceções;
- documentos;
- horários;
- vagas ou capacidade;
- avaliações;
- possíveis registros de fraude.

### Integração

A oficina poderia receber ordens e operar por meio do autosserviço de fornecedores.

### Limitações e particularidades

Foi observado que oficinas grandes ou vinculadas a marcas podem ter sistemas próprios e não necessariamente adotar integralmente o autosserviço da seguradora.

---

## 11.2. Clínicas e hospitais

### Contexto

Clínicas e hospitais são citados como possíveis fornecedores em produtos de saúde, acidentes ou vida.

### Ponto principal

A utilização desse tipo de fornecedor exigiria que:

- as atividades correspondentes fossem configuradas;
- os dados específicos necessários fossem modelados no Riftcore;
- o autosserviço comportasse esse tipo de operação ou fosse evoluído;
- o país e as áreas responsáveis avaliassem a implementação.

### Limitação

A reunião não mostra um caso implementado de clínica ou hospital. Trata-se de exemplo hipotético.

---

## 11.3. Guinchos

### Contexto

Os guinchos são citados como outro tipo potencial de fornecedor.

### Exemplo operacional

O instrutor menciona que, para esse tipo de fornecedor, dados de capacidade poderiam indicar, por exemplo, dois veículos de guincho disponíveis em determinada cidade.

### Limitação

Não foi demonstrado um cadastro completo de guincho nem confirmado que todos os campos exibidos para oficinas sejam utilizados da mesma forma.

---

## 11.4. Ambulâncias, ajustadores e funerárias

Esses tipos de fornecedores são citados como possibilidades em diferentes ramos e contextos. Contudo, não há demonstração funcional completa, regras operacionais, integrações ou catálogos específicos para eles.

---

## 12. Números e valores citados

> Os números abaixo são exemplos de demonstração, não indicadores auditados ou parâmetros obrigatórios do sistema.

| Item | Valor mencionado | Contexto |
|---|---:|---|
| Blocos de informação de terceiro | nove | Referência aos blocos comuns de informação de terceiros |
| Capacidade diária de serviço | 10 veículos | Exemplo para funilaria/chapa |
| Capacidade dedicada à seguradora | 5 veículos | Exemplo de metade da capacidade para a seguradora |
| Capacidade diária de pintura | 3 veículos | Exemplo demonstrativo |
| Capacidade de pintura dedicada à seguradora | 2 veículos | Exemplo demonstrativo |
| Duração de atendimento | 20 minutos | Exemplo para um serviço |
| Duração de atendimento | 10 minutos | Exemplo para outro serviço |
| Limite de vagas | 5 | Exemplo de limite que impediria novas atribuições automáticas |
| Métrica/pontuação | 23 | Exemplo de avaliação |
| Número de reclamações | 0 | Exemplo de avaliação |
| Valor mínimo em exceção tarifária | 10 | Exemplo de valor mínimo |
| Data de inabilitação/validade | diversas datas ilustrativas | Demonstrações de vigência e histórico |

---

## 13. Perguntas e respostas relevantes

## 13.1. Pergunta sobre fraude e existência de expediente

### Pergunta

Uma participante questiona se, ao registrar fraude, haveria um expediente de fraude ou se múltiplas ações possíveis de fraude seriam tratadas de maneira isolada e sem vínculo entre si.

### Resposta

O instrutor responde que existe um identificador de fraude e que registros com códigos distintos podem representar diferentes estados pelos quais a fraude passou. Segundo ele, esses registros são rastreados internamente em relação ao fornecedor.

Ao mesmo tempo, ele reconhece não conhecer o modelo físico de dados nem a tabela real em que esses registros se acumulam.

### O que a resposta esclarece

A resposta sugere que o modelo funcional pretende preservar continuidade entre estados de uma mesma ocorrência de fraude, mesmo que diferentes registros exibam códigos distintos.

### Limitação

Não é possível concluir pela reunião:

- se há um expediente formal;
- se há entidade única de caso;
- como os estados são encadeados;
- quais regras garantem o vínculo;
- como ocorre investigação;
- quais papéis podem abrir, revisar ou encerrar uma fraude.

O próprio instrutor recomenda aprofundar o tema com Marta, no módulo de sinistros.

---

## 13.2. Pergunta implícita sobre o sentido de fraude fora de sinistros

### Questão levantada

Durante a demonstração, surge a dúvida sobre por que os dados de fraude aparecem na configuração de fornecedores, se o tema parece fazer mais sentido em sinistros.

### Resposta

O instrutor concorda que o conteúdo ganha mais sentido em sinistros e informa que será tratado de forma mais substantiva nesse contexto. Ainda assim, reforça que a evolução de fornecedores no Riftcore está ligada ao autosserviço de fornecedores, que consulta a configuração mantida no core.

### O que a resposta esclarece

O cadastro de fraude no fornecedor parece ser uma informação transversal, disponível na configuração do prestador, mas com aplicação operacional mais forte nos processos de sinistro.

---

## 14. Limitações reconhecidas durante a reunião

## 14.1. Ambiente de desenvolvimento instável

O instrutor relata diversos comportamentos inesperados durante a demonstração:

- falha ao criar ou localizar fornecedor;
- comportamento inconsistente em filtros e buscas;
- validações que não parecem pertencer ao núcleo;
- campos ou registros que não se comportam como esperado;
- catálogos ausentes em determinados blocos;
- erros em funcionalidades relacionadas a ocorrências.

Ele classifica esses comportamentos como problemas do ambiente de desenvolvimento, validações inadequadas ou defeitos que deveriam ser reportados.

## 14.2. Nem todos os catálogos estavam disponíveis

Em alguns exemplos, não havia dados configurados no ambiente para:

- agrupamentos;
- classificações;
- serviços de valor agregado;
- ocorrências;
- determinadas métricas;
- outros elementos de catálogo.

Portanto, a ausência de dados em tela não deve ser interpretada como ausência da capacidade funcional no produto.

## 14.3. Dependência do autosserviço

A configuração no Riftcore, sozinha, não garante que o fornecedor esteja operacional. O instrutor menciona que pouco adianta preencher capacidades e demais atributos se, no outro lado:

- o fornecedor não estiver identificado adequadamente;
- não estiver registrado;
- não tiver realizado treinamentos ou cursos necessários;
- não estiver habilitado no autosserviço.

## 14.4. Dependência de evolução por país ou ramo

A utilização de determinados fornecedores, como clínicas ou hospitais, pode exigir evolução funcional e integração adicional. Não há confirmação de que essas capacidades estejam disponíveis de forma uniforme.

## 14.5. Modelo de dados de fraude não conhecido pelo instrutor

O instrutor afirma explicitamente não conhecer a estrutura física de dados de fraude. Portanto, qualquer conclusão técnica sobre tabelas, chaves ou relacionamento de registros seria especulativa.

---

## 15. Riscos e desafios

## 15.1. Riscos explicitamente mencionados

| Risco ou desafio | Evidência na reunião |
|---|---|
| Erros no ambiente de desenvolvimento | Falhas durante criação, busca e validação de fornecedor |
| Dependência de catálogos | Muitos blocos funcionam apenas com catálogos previamente configurados |
| Dependência de integração | O autosserviço precisa consumir corretamente as informações do core |
| Dependência organizacional | Implantação local depende de alinhamento corporativo e do país |
| Fornecedor não operacional fora do core | Cadastro no Riftcore não basta se o fornecedor não estiver preparado no autosserviço |
| Adoção limitada por grandes fornecedores | Grandes oficinas podem usar sistemas próprios e não adotar totalmente o autosserviço |

## 15.2. Desafios derivados do contexto

> Os pontos abaixo são interpretações analíticas e não foram declarados literalmente como riscos pelos participantes.

### Governança de dados mestres

Como serviços, marcas, capacidades, tarifas, zonas e documentos dependem de vários catálogos, o modelo exige governança consistente para evitar configurações divergentes ou incompletas.

### Coerência entre vigências

Há datas de vigência em múltiplos níveis: fornecedor, serviço, zona, marca, tarifa, exceção e atendimento. Isso sugere um desafio relevante de consistência temporal.

### Coordenação entre sistemas

A integração por APIs entre o core e o autosserviço exige que os dados estejam disponíveis, corretos e sincronizados no momento em que uma ordem de serviço ou atribuição for processada.

### Adoção operacional

A efetividade do modelo depende de fornecedores utilizarem a plataforma ou de integrações com os sistemas próprios dos prestadores, especialmente para parceiros grandes.

---

## 16. Relações de causa e efeito identificadas

## 16.1. Necessidade de diferenciação de fornecedor

```text
Terceiros com atividades distintas
↓
Necessidade de identificar quem presta serviços à operação
↓
Atributo de atividade fornecedora
↓
Acesso a blocos específicos de configuração
↓
Uso do fornecedor em processos operacionais
```

## 16.2. Necessidade de suportar seleção e atribuição operacional

```text
Fornecedor cadastrado apenas com dados administrativos
↓
Informação insuficiente para decidir quem pode atender um serviço
↓
Cadastro de serviços, marcas, capacidade, zonas e horários
↓
Possibilidade de orientar atribuições e ordens de serviço
```

## 16.3. Necessidade de reduzir tratamento manual ou desconectado

```text
Operação de fornecedores exige agenda, notificações, ordens e execução
↓
Core não concentra toda a operação diária
↓
Autosserviço de fornecedores complementar
↓
Integração por APIs e serviços
```

## 16.4. Necessidade de controlar condições comerciais

```text
Fornecedores podem ter condições e capacidades diferentes
↓
Tarifa padrão pode não cobrir todos os acordos
↓
Exceções por fornecedor, conceito e potencialmente zona
↓
Tratamento específico de honorários na liquidação
```

---

## 17. O que a reunião não permite concluir

A transcrição não detalha suficientemente os seguintes pontos:

### Arquitetura técnica

- tecnologia usada no Riftcore;
- linguagem de programação;
- banco de dados;
- modelo de deployment;
- cloud utilizada;
- containers;
- Kubernetes;
- mensageria;
- eventos;
- API gateway;
- padrões de autenticação;
- modelo de IAM;
- criptografia;
- observabilidade;
- logs;
- monitoramento;
- tracing;
- disponibilidade;
- disaster recovery;
- backup;
- performance.

### Integração

- contratos formais das APIs;
- formato das mensagens;
- sincronização ou tempo de propagação;
- tratamento de falhas;
- idempotência;
- versionamento de APIs;
- autenticação entre sistemas;
- mapeamento de campos;
- responsabilidade sobre dados mestres.

### Segurança e conformidade

- proteção de dados pessoais;
- gestão de documentos sensíveis;
- controle de acesso;
- segregação de funções;
- auditoria;
- retenção documental;
- tratamento de dados fiscais;
- requisitos regulatórios locais.

### Operação

- SLA;
- suporte;
- gestão de incidentes;
- processo de release;
- hotfixes;
- aprovação de alterações de catálogo;
- critérios de suspensão ou reativação de fornecedor;
- workflow de aprovação de documentos;
- workflow de fraude;
- cálculo financeiro detalhado.

### Governança

- responsáveis formais por cada catálogo;
- responsáveis pelo autosserviço;
- responsáveis por implantação em cada país;
- modelo de priorização;
- roadmap oficial;
- métricas corporativas;
- custos ou FinOps.

---

## 18. Principais conclusões

1. O fornecedor é modelado como um tipo especializado de terceiro, identificado por uma atividade marcada como fornecedora.

2. O cadastro básico não é suficiente para o uso operacional do fornecedor. É necessário configurar serviços, capacidades, marcas, zonas, tarifas, atendimento, documentos e outros atributos específicos.

3. O Riftcore é apresentado como um núcleo de configuração e manutenção de dados relevantes ao fornecedor, não como o único sistema da operação.

4. O autosserviço de fornecedores é apresentado como plataforma complementar, responsável por grande parte da operação diária e integrada ao core por APIs e serviços.

5. Sinistros aparece como um domínio essencial para consumo da configuração, especialmente para ordens de serviço, agendamento, atribuição, liquidações e controle operacional.

6. O exemplo de oficina domina a demonstração, mas o modelo pretende ser reutilizável para outros tipos de fornecedores, desde que existam configurações, catálogos e capacidades adequadas.

7. O funcionamento depende fortemente de catálogos e de configurações prévias. Sem esses elementos, muitos campos e blocos não ficam utilizáveis.

8. A implantação não parece ser puramente técnica ou local: depende de alinhamento corporativo, país, ramo, modelo de operação e capacidade do autosserviço.

9. A demonstração ocorreu em ambiente de desenvolvimento com falhas e inconsistências. Esses problemas não devem ser interpretados automaticamente como comportamento esperado do produto.

10. A reunião fornece boa visão funcional do cadastro e da configuração de fornecedores, mas não permite documentar com segurança a arquitetura técnica interna, o modelo físico de dados, a segurança, a governança completa ou o fluxo operacional detalhado de sinistros e fraude.
