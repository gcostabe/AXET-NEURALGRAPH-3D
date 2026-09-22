# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `0001-DEFINICION-Elementos-Comunes.mp4`
**Data de processamento:** 20/09/2026 12:45:08
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada — Parâmetros de instalação no RISCore

## 1. Síntese executiva

A sessão apresenta o conceito de **parâmetros de instalação** da plataforma registrada na transcrição como **RISCore** — em alguns trechos, o reconhecimento automático também produz variações como “RIFCOR” e “Rift Core”. O tema central é explicar como configurações persistidas no modelo de dados ajustam o comportamento da solução para cada instalação, país, companhia e módulo funcional.

A mensagem principal é que a plataforma foi concebida para ser configurável por meio de dados e parâmetros, e não por alterações arbitrárias no código ou por reutilização indevida de campos existentes. Alguns parâmetros são transversais à instalação; outros afetam domínios específicos, como emissão, sinistros, resseguro, tesouraria, terceiros, consultas, idioma e comportamento do front-end.

O treinamento enfatiza que esses parâmetros são normalmente definidos na implantação inicial e tendem a permanecer estáveis ao longo do tempo. Embora exista flexibilidade para acomodar diferenças entre países e companhias, essa flexibilidade deve ser usada dentro da finalidade originalmente prevista para cada parâmetro. O palestrante alerta que reutilizar atributos para finalidades não previstas cria conhecimento implícito e dificulta a manutenção futura.

Também foi destacada uma decisão estrutural relevante: a instalação utiliza **ou o modelo antigo de terceiros ou o novo modelo de terceiros**, de forma mutuamente exclusiva quanto ao armazenamento da informação. Certas funcionalidades, como processos em lote denominados “buzones”, podem operar em contextos associados a ambos os modelos, mas isso não significa que os dois modelos gravem simultaneamente os mesmos terceiros.

---

## 2. Contexto e antecedentes

A apresentação faz parte de um treinamento progressivo sobre a plataforma. O palestrante utiliza a metáfora de construção com “tijolos”:

- os elementos básicos são configurações, definições e parâmetros;
- esses elementos, isoladamente, parecem pouco expressivos;
- combinados, formam estruturas funcionais mais amplas da solução.

Nesse contexto, a tabela de parâmetros de instalação é apresentada como um desses elementos fundamentais. Ela representa uma forma de registrar, no próprio modelo de dados, decisões de configuração que alteram ou modulam o funcionamento do sistema.

A ideia histórica relatada é que “tudo tinha que estar gravado no modelo de dados”. O palestrante reconhece, em tom informal, que essa visão foi construída em outro momento tecnológico, mas reforça que ela explica por que há tantos parâmetros e configurações persistidos em tabelas.

A transcrição menciona que a plataforma é usada em diferentes países e pode atender instalações com características distintas. Assim, alguns parâmetros atendem diferenças locais, como:

- primeiro dia da semana;
- idioma padrão;
- formato de datas;
- identificação de pessoas físicas e jurídicas;
- estrutura com uma ou várias companhias locais;
- adoção do modelo antigo ou novo de terceiros.

---

## 3. Conceito de parâmetros de instalação

Os parâmetros de instalação são descritos como valores codificados e identificáveis em uma tabela do modelo de dados. Eles influenciam funcionalidades e comportamentos de diferentes módulos da solução.

Segundo a explicação apresentada, o catálogo de parâmetros é entregue inicialmente às entidades com conteúdo pré-carregado. Há dois objetivos complementares:

1. **Viabilizar a operação da plataforma**  
   Alguns parâmetros são necessários para que a instalação funcione corretamente.

2. **Permitir configuração controlada**  
   Outros parâmetros fornecem liberdade de adaptação às necessidades da instalação, país, companhia ou módulo.

Esses parâmetros podem ser:

- **transversais**, aplicáveis à solução como um todo;
- **específicos por módulo**, afetando emissão, sinistros, resseguro ou tesouraria;
- **relacionados a terceiros**, incluindo pessoas físicas e jurídicas;
- **técnicos**, ligados a banco de dados, formatos, conjunto de caracteres e identificadores da instalação;
- **voltados ao front-end**, como forma de apresentar campos de data.

> **Leitura contextual:** a tabela de parâmetros funciona como uma camada de configuração centralizada. Essa conclusão decorre da descrição dos múltiplos módulos e comportamentos regulados por valores persistidos, não de uma definição arquitetural formal apresentada na reunião.

---

## 4. Problema tratado

O problema não é apresentado como um incidente pontual, mas como uma necessidade estrutural: a mesma plataforma precisa acomodar realidades operacionais distintas sem que cada instalação se torne uma solução inteiramente independente.

A transcrição sustenta os seguintes desafios.

### 4.1. Variações entre países e instalações

Um mesmo comportamento pode precisar ser diferente dependendo do país. O exemplo mais simples citado é o início da semana:

- em alguns países, a semana pode começar na segunda-feira;
- em outros, no domingo.

Embora pareça um detalhe, o palestrante o apresenta como uma decisão operacional relevante, que precisa estar expressa no sistema.

### 4.2. Variações entre módulos funcionais

Módulos como emissão, sinistros, resseguro e tesouraria possuem regras e necessidades próprias. A plataforma precisa ativar, desativar ou ajustar determinados comportamentos por meio de parâmetros.

### 4.3. Coexistência de instalações em diferentes estágios evolutivos

A organização precisa dar suporte a países que usam modelos distintos de terceiros:

- alguns permanecem no modelo antigo;
- outros usam o novo modelo.

São citados como exemplos de países que utilizariam o novo modelo: Panamá, Honduras e Brasil. A transcrição não afirma que essa lista seja completa.

### 4.4. Risco de uso indevido da configurabilidade

O palestrante chama atenção para a possibilidade de reutilizar um parâmetro existente para uma necessidade diferente daquela para a qual foi criado. Ele classifica essa prática como inadequada, porque o significado real da configuração ficaria conhecido apenas por quem a implementou.

A consequência implícita é perda de clareza, maior dificuldade de manutenção e risco de comportamento inconsistente entre instalações.

---

## 5. Solução apresentada

A solução apresentada é um modelo de parametrização persistido no banco de dados. A instalação recebe um conjunto de parâmetros com valores iniciais, que pode ser configurado conforme as necessidades legítimas da implantação.

O funcionamento conceitual pode ser representado da seguinte forma:

```text
Necessidade operacional ou local
            ↓
Parâmetro de instalação correspondente
            ↓
Valor registrado no modelo de dados
            ↓
Comportamento do módulo, processo ou front-end
```

Em vez de depender exclusivamente de lógica fixa, a plataforma consulta valores de configuração que definem comportamentos como:

- se há BPM em determinado processo;
- como horários padrão devem ser tratados na emissão;
- quantos registros devem ser processados em uma chamada de integração;
- se uma operação de tesouraria pode abranger várias companhias;
- qual modelo de terceiros a instalação utiliza;
- quantos resultados uma consulta pode exibir;
- como datas aparecem no front-end;
- qual idioma é usado por padrão.

> **Importante:** a reunião não detalha como a aplicação tecnicamente lê esses parâmetros, em que momento são carregados, se há cache, se há validações centralizadas, nem como alterações são propagadas entre ambientes.

---

## 6. Arquitetura lógica inferida a partir da explicação

A reunião não apresenta um diagrama formal de arquitetura. Ainda assim, é possível consolidar a relação lógica entre os elementos descritos.

```text
Configuração da instalação
    ├── Parâmetros transversais
    ├── Parâmetros por módulo
    ├── Definição de companhias
    └── Idioma da instalação
                ↓
Tabela de parâmetros no modelo de dados
                ↓
Módulos funcionais da plataforma
    ├── Emissão
    ├── Sinistros e prestações
    ├── Resseguro
    ├── Tesouraria
    ├── Terceiros
    ├── Consultas
    ├── Gerador de produtos
    └── Front-end
                ↓
Integrações externas e processos operacionais
    ├── BPM, quando habilitado
    ├── R21, para contexto de resseguro
    └── Processos batch (“buzones”)
```

### Ressalvas sobre esse desenho

Esse diagrama é uma **consolidação analítica** das relações explicadas oralmente. Não é um diagrama literal exibido na reunião.

A transcrição não permite determinar com segurança:

- a topologia de implantação;
- os serviços internos envolvidos;
- se existe arquitetura de microserviços;
- o mecanismo técnico de integração com BPM;
- como R21 é integrado;
- se os processos batch usam arquivos, filas, APIs ou outro meio;
- o banco de dados completo da plataforma, embora Oracle seja mencionado em contexto técnico;
- os mecanismos de segurança, IAM, auditoria, monitoramento ou contingência.

---

## 7. Componentes e categorias de parâmetros mencionados

## 7.1. Parâmetros transversais

Os parâmetros transversais afetam a aplicação de maneira geral, independentemente de um módulo específico.

### Exemplo: início da semana

Foi citado um parâmetro que indica em qual dia começa a semana. A finalidade é adaptar a instalação a convenções operacionais ou locais.

Exemplos apresentados:

- início na segunda-feira;
- início no domingo.

O palestrante ressalta que, embora pareça um detalhe menor, essa definição pode ser necessária conforme a realidade de cada país.

### Exemplo: data de registro — “PEC Actu”

A transcrição registra um campo ou parâmetro denominado **“PEC Actu”**. O palestrante o associa a um campo presente nas tabelas do sistema, que indica quando o registro foi gravado.

Foi explicado que esse campo seria do tipo data no Oracle e que a informação pode estar:

- truncada, sem a parte de horário;
- registrada com hora, minutos e segundos.

O nome “PEC Actu” deve ser tratado com cautela, pois pode haver erro de reconhecimento automático. A transcrição, contudo, o apresenta como uma referência técnica importante para a data de atualização ou gravação de registros.

---

## 7.2. Emissão

No domínio de emissão, foi mencionado um parâmetro que define a hora e os minutos padrão para suplementos.

O palestrante explica que, em alguns ramos técnicos, a vigência de uma apólice pode exigir mais do que apenas uma data. Por exemplo, uma cobertura pode iniciar:

- ao meio-dia de uma determinada data;
- às 24 horas;
- às 0 horas;
- em outro horário configurado.

A motivação indicada é que essa precisão temporal também terá repercussão no módulo de sinistros.

### BPM em gestão de apólices e contratos

Foi citado um indicador que define se a plataforma possui, ou não, um BPM subjacente para o processo de gestão de apólices e contratos.

A transcrição não informa:

- qual produto ou tecnologia de BPM é usado;
- quais processos são orquestrados;
- se o BPM é obrigatório em determinadas instalações;
- como ocorre a integração entre o BPM e o módulo de emissão.

---

## 7.3. Sinistros e prestações

Para sinistros, foi mencionado um parâmetro equivalente ao de emissão: uma marca que indica se há BPM no processo de gestão de sinistros e prestações.

A explicação confirma que a presença de BPM pode variar por processo ou instalação.

A transcrição não detalha:

- quais fluxos de sinistros são tratados pelo BPM;
- se o BPM atua apenas em sinistros, prestações ou ambos;
- quais regras ativam esse comportamento;
- quais impactos existem quando o BPM não está habilitado.

---

## 7.4. Resseguro

No contexto de resseguro, foi citado um parâmetro que determina a quantidade de registros ou riscos tratados em chamadas ao **R21**.

O palestrante descreve R21 como uma plataforma corporativa da MAPFRE voltada à gestão de resseguro. Ela é apresentada como externa ao RISCore, mas integrada a ele.

### Papel do parâmetro

O parâmetro controla o número máximo de riscos que o RISCore permite processar em chamadas realizadas para gravar uma proposta no R21.

A relação pode ser resumida assim:

```text
RISCore
   ↓
Chamada de integração para R21
   ↓
Quantidade máxima de riscos definida por parâmetro
```

### Pontos não detalhados

A reunião não permite concluir:

- se a integração é síncrona ou assíncrona;
- se usa APIs, arquivos, mensageria ou outro mecanismo;
- quais mensagens ou contratos são utilizados;
- como erros, reprocessamentos ou indisponibilidades são tratados;
- por que o limite possui o valor configurado em cada instalação.

---

## 7.5. Tesouraria e recebimentos de múltiplas companhias

Foi mencionado um parâmetro de tesouraria que determina se é possível realizar cobranças ou recebimentos de recibos de várias companhias em uma única caixa ou operação de caixa.

A explicação parte de uma premissa relevante: uma entidade em uma instalação pode ter uma ou várias companhias.

Exemplos citados:

| Entidade mencionada | Quantidade de companhias mencionada |
|---|---:|
| MAPFRE Puerto Rico | 3 |
| MAPFRE Honduras | 1 |
| MAPFRE Perú | 1 |

O palestrante ressalta que esses exemplos servem para demonstrar que a estrutura pode variar e que uma relação um para um é mais comum, mas não obrigatória.

### Implicação operacional

Um caixa pode estar habilitado para uma companhia e não possuir papel equivalente em outra. Contudo, dependendo da configuração:

- o mesmo usuário pode atuar como caixa em mais de uma companhia;
- ele pode registrar cobranças em ambas;
- a plataforma pode ou não permitir concentrar recibos de diferentes companhias em uma única caixa.

> **Leitura analítica:** o parâmetro parece tratar uma regra de escopo operacional e de segregação por companhia. Essa interpretação decorre do exemplo dado; a reunião não apresenta a regra completa de autorização, contabilidade ou conciliação associada.

---

## 7.6. Modelo de terceiros

O modelo de terceiros é apresentado como um dos pontos mais relevantes da parametrização.

### Modelo antigo e novo modelo

A plataforma pode operar com:

- modelo antigo de terceiros;
- novo modelo de terceiros.

O parâmetro correspondente é descrito como uma marca, provavelmente com valores “S” ou “N”, que indica se a instalação utiliza o novo modelo.

O palestrante enfatiza que os países podem estar em estágios diferentes de evolução. Assim, a organização precisa suportar instalações que ainda utilizam o modelo antigo e outras que já adotaram o novo modelo.

### Exclusividade entre os modelos

A pergunta mais importante associada ao tema é se os modelos podem coexistir para o mesmo uso. A resposta é explícita:

> Os modelos são excludentes para a informação de terceiros: ou se grava em um conjunto de tabelas, ou se grava em outro.

A explicação fornecida é que cada modelo possui estrutura de dados própria. Portanto, não se trata de uma preferência livre de uma equipe local, mas de uma condição definida pelo núcleo da plataforma.

O palestrante recomenda que novas utilizações adotem o novo modelo.

### Funcionalidades comuns e “buzones”

Embora os modelos sejam excludentes quanto à gravação da informação, foi citado que certas funcionalidades podem funcionar em contextos associados tanto ao modelo antigo quanto ao novo. O exemplo são os **“buzones”**, descritos como processos batch capazes de executar operações semelhantes às do canal online.

Exemplo citado:

```text
Operação online: criar agente
            ↓
Operação batch por “buzón”: criar agente
```

A transcrição menciona que o uso desses processos depende de esquemas que o sistema precisa. O termo reconhecido automaticamente como “acle” não está suficientemente claro para ser normalizado sem risco de erro.

### Limitação de interpretação

A reunião não especifica:

- o que tecnicamente são os “buzones”;
- como os dados são submetidos;
- se são caixas de entrada, jobs, arquivos, filas ou outro mecanismo;
- quais operações estão disponíveis;
- quais são os esquemas ou dependências técnicas mencionados;
- como são tratados erros de processamento.

---

## 7.7. Identificação genérica no novo modelo de terceiros

Foi citado um tipo de documento específico para identificar determinados terceiros genéricos no novo modelo, particularmente no exemplo de uma companhia seguradora tratada como pessoa jurídica.

A transcrição registra o tipo de documento como:

```text
THP / CERPARTY
```

Há incerteza sobre a grafia exata, pois a fala registra “THP, CERPARTY” e pode haver erro de reconhecimento. O palestrante, contudo, afirma que “THP” seria o tipo documental usado como identificador para terceiros genéricos.

Também foi citado o código numérico:

```text
999999
```

Esse código é apresentado como um valor genérico ou constante aplicável em determinados atributos ou tabelas que aceitam valores genéricos.

### Lógica de identificação de terceiros

A explicação estabelece que pessoas físicas e jurídicas são identificadas, de forma transversal, por:

```text
Tipo de documento + código de documento
```

Exemplos mencionados:

- passaporte + número correspondente;
- NIF + número correspondente;
- DNI + número correspondente.

A forma concreta de identificação pode variar por país, como Espanha, México, Honduras e Brasil.

### Motivo apresentado para o novo tratamento

Historicamente, companhias seguradoras eram definidas em uma tabela própria e não eram tratadas como terceiros. Com o novo modelo, elas podem ser registradas como pessoas jurídicas dentro do universo de terceiros, permitindo aproveitar sinergias relacionadas a:

- contatos;
- endereços;
- informações associadas à companhia.

> **Leitura analítica:** o novo modelo parece buscar centralizar atributos compartilhados de entidades relacionadas. Essa é uma interpretação fundamentada no exemplo de contatos e endereços, não uma declaração formal de arquitetura de dados.

---

## 7.8. Contas bancárias e meios de cobrança/pagamento de terceiros

Foi explicado que o novo modelo de terceiros já permite múltiplas contas bancárias ou múltiplos meios de cobrança e pagamento.

No modelo antigo, havia necessidade de um parâmetro que definisse se um segurado poderia ter:

- uma única conta corrente;
- várias contas correntes.

O mesmo raciocínio é mencionado para cartões.

No novo modelo, segundo o palestrante, esse parâmetro perde sentido porque o modelo já suporta quantidade variável de contas ou meios associados ao terceiro.

A transcrição não esclarece:

- se há limite técnico para o número de contas no novo modelo;
- se existe limite funcional configurável;
- como uma conta principal é definida;
- quais tipos de meios de pagamento são suportados.

---

## 7.9. Visibilidade de informações em consultas

Foi citado um parâmetro relacionado à visibilidade de informações em programas de consulta.

O exemplo usado é o de agentes e corretoras. O palestrante afirma que certas informações precisam ser restringidas, pois um agente não deve visualizar a carteira ou as informações de outro agente.

Também é descrita uma tipologia de terceiro que identifica um terceiro como empregado de um agente ou corretora. No exemplo:

- existe uma corretora chamada “Pepito SL”;
- ela possui 25 empregados;
- um empregado pode ver toda a informação da corretora ou apenas suas próprias apólices;
- um parâmetro pode determinar esse comportamento.

### Interpretação funcional

Esse parâmetro parece controlar o escopo de consulta de colaboradores vinculados a uma corretora ou agente.

A transcrição não detalha:

- quais entidades podem ser visualizadas;
- como o vínculo empregado–corretora é registrado;
- se a regra depende de perfil, papel, companhia ou combinação desses fatores;
- se há trilha de auditoria de consultas;
- como a segurança é implementada tecnicamente.

---

## 7.10. Parâmetros técnicos históricos

A transcrição menciona parâmetros mais antigos e voltados à parte técnica. Entre os exemplos citados estão:

- tipo de banco de dados do sistema;
- versão do Oracle;
- formato de data;
- uso de separadores em datas;
- equivalência de constantes como “yes” ou “no” em diferentes idiomas;
- conjunto de caracteres;
- chave ou código da instalação.

O palestrante relaciona esses parâmetros a uma época em que a configuração técnica precisava ser mais explicitamente controlada no modelo de dados.

### Oracle

Oracle é citado como o banco de dados associado à plataforma, inclusive no contexto de campos de data. Contudo, a reunião não esclarece se:

- todas as instalações atuais usam Oracle;
- a possibilidade de outro banco era apenas histórica;
- há versões suportadas;
- existem dependências de recursos específicos do Oracle.

---

## 7.11. Chave ou código de instalação

Cada país ou instalação possui uma chave ou código associado. O palestrante menciona que códigos com o prefixo ou terminação “TRN” estariam ligados ao núcleo da solução.

A transcrição alterna entre “RISCore”, “RIFCOR”, “Rift Core” e “núcleo”, sem permitir afirmar se todos são o mesmo nome técnico ou se parte dessas variações decorre do reconhecimento de voz.

Foram dados exemplos de códigos:

| Código mencionado | Associação relatada |
|---|---|
| MMT | MAPFRE Malta |
| EUR | Chile |
| MMX | MAPFRE México |

### Observações sobre os exemplos

- O código **MMT** é associado a MAPFRE Malta. O palestrante comenta que originalmente a companhia era “MAFREMIDELSI”, nome que pode estar incorretamente transcrito.
- O código **EUR** é relacionado ao Chile e teria origem em uma configuração inicial associada a “EUROAMERICA”.
- O código **MMX** é associado a MAPFRE México.

O objetivo dos códigos é facilitar a identificação de para qual país ou instalação determinado pacote, código ou artefato técnico foi produzido.

A reunião não define:

- a estrutura completa desses códigos;
- se são únicos globalmente;
- onde são administrados;
- se fazem parte de nomenclatura de pacotes, banco de dados, aplicação ou todos esses elementos.

---

## 7.12. Limite de registros em consultas

Foi mencionado um parâmetro que define o número máximo de registros exibidos em consultas.

A justificativa é de desempenho: uma busca genérica sobre todos os terceiros, sem critérios específicos, pode levar a uma leitura ampla da tabela e ser custosa.

O palestrante menciona que esse tipo de limitação fazia mais sentido em contextos tecnológicos anteriores, mas ainda pode explicar por que uma consulta mostra, por exemplo:

- 15 registros;
- mesmo quando se sabe que há 25 registros no sistema.

Nesse caso, o usuário deve considerar a possibilidade de haver um parâmetro limitando a paginação ou a quantidade de resultados exibidos.

A transcrição não informa:

- qual é o valor padrão;
- se o limite é por tela, consulta, usuário ou instalação;
- se a paginação é técnica ou funcional;
- se há mecanismo de busca avançada para contornar o limite.

---

## 7.13. Gerador de produtos

Foi mencionado um parâmetro associado ao gerador de produtos.

O palestrante relaciona esse contexto ao que teria sido demonstrado por “Freddy” em “tron web”, envolvendo definições de:

- coberturas;
- conceitos de desagregação;
- atributos no nível de apólice.

A fala indica que o gerador de produtos, também chamado de portal de configuração, está passando por mudanças em um novo projeto. Porém, o palestrante afirma não possuir mais informações e, por isso, não aprofunda o tema.

### Limitação reconhecida

Não há informações suficientes para concluir:

- qual é o novo projeto;
- quais mudanças serão realizadas;
- cronograma;
- responsáveis;
- impacto em instalações existentes;
- compatibilidade com a configuração atual;
- substituição ou evolução do portal existente.

---

## 7.14. Idioma da instalação

Há um parâmetro que determina o idioma padrão em que etiquetas e informações são exibidas nos programas da plataforma.

A configuração é apresentada como parte da instalação inicial e não como algo que se altera regularmente ao longo do tempo.

Exemplo citado:

- para uma instalação inicial do RISCore no Brasil, o idioma seria português, identificado como `PT`.

O palestrante enfatiza que não se espera que uma instalação configurada para português seja alterada posteriormente para outro idioma, como inglês dos Estados Unidos.

### Relação com outros elementos

O entendimento da tabela de parâmetros deve ser complementado pela análise de:

- definição de companhias;
- componente de idiomas.

---

## 7.15. Formatação de datas no front-end

A transcrição menciona parâmetros que controlam como campos de data são apresentados na interface gráfica.

Uma companhia pode definir, para toda a aplicação, formatos como:

- ano, mês, dia;
- dia, mês, ano;
- mês, dia, ano;
- somente ano.

O exemplo de Porto Rico é citado para ilustrar que preferências locais ou da companhia podem influenciar a apresentação das datas.

É feita uma distinção entre:

- decisões de um usuário individual, que seriam tratadas no sistema de segurança;
- decisões globais da companhia, aplicadas à interface da aplicação.

A transcrição não detalha:

- se usuários podem sobrescrever o formato corporativo;
- quais formatos são efetivamente suportados;
- se a formatação afeta apenas visualização ou também entrada e validação de dados;
- como a regra se relaciona ao idioma e à localidade.

---

## 8. Modelo de dados e tabela física

O palestrante reforça que a documentação apresentada é funcional e não mostra necessariamente a tabela física. Contudo, ele revela que existe uma tabela de parâmetros cujo nome foi transcrito como:

```text
G000000000
```

Ele próprio demonstra incerteza sobre a quantidade exata de zeros. Portanto, esse nome não deve ser considerado tecnicamente confirmado sem validação direta no ambiente ou na documentação técnica.

Segundo a explicação:

- a tabela possui aproximadamente cinco ou seis colunas;
- nela estão registrados os parâmetros e seus valores;
- nela também estaria a configuração ligada à truncagem ou não da data associada a “PEC Actu”;
- uma consulta filtrada por determinada companhia mostraria os parâmetros disponíveis, suas finalidades e valores possíveis.

A reunião não fornece:

- estrutura exata da tabela;
- nomes das colunas;
- chaves primárias;
- chaves estrangeiras;
- índices;
- modelo de versionamento;
- regras de atualização;
- mecanismos de auditoria;
- permissões de alteração.

---

## 9. Modelo de integração

A reunião menciona integrações ou dependências com três elementos principais.

| Elemento | Papel descrito | Detalhes disponíveis |
|---|---|---|
| BPM | Suporte a processos de emissão e/ou sinistros/prestações quando habilitado | Apenas a existência é mencionada; tecnologia não informada |
| R21 | Plataforma corporativa de gestão de resseguro, externa ao RISCore | Há parâmetro para limitar riscos em chamadas de proposta |
| “Buzones” | Processos batch capazes de executar operações semelhantes ao online | Mecanismo técnico, formato e orquestração não detalhados |

### Princípio de integração observado

A integração com R21 é regulada por configuração, especificamente pelo número máximo de riscos processados por chamada. Isso sugere a necessidade de controle de volume em operações de integração.

> **Leitura analítica:** esse limite pode estar relacionado a capacidade, desempenho, contrato de integração ou restrições operacionais. A causa exata não foi explicitada, portanto não pode ser afirmada.

---

## 10. Modelo operacional

A reunião descreve principalmente o modelo de configuração, não o modelo completo de operação da solução. Ainda assim, alguns aspectos operacionais aparecem.

### 10.1. Configuração inicial e estabilidade

Os parâmetros transversais são configurados no início da instalação e, em condições normais, não devem mudar ao longo da vida da solução.

Essa orientação se aplica especialmente a parâmetros como:

- idioma de instalação;
- estrutura fundamental de modelos;
- comportamento transversal;
- identificadores de instalação.

### 10.2. Configuração por companhia

A configuração geral é descrita como sendo, em muitos casos, realizada por código de companhia.

Isso é relevante quando uma instalação possui múltiplas companhias, pois regras de caixa, acesso e operação podem variar entre elas.

### 10.3. Consultas e desempenho

Limites de resultado podem restringir a quantidade de registros retornados em telas de consulta, evitando buscas amplas e potencialmente custosas.

### 10.4. Processamento online e batch

A mesma operação de negócio pode existir no canal online e em processos batch, chamados de “buzones”. O exemplo fornecido é a criação de agente.

---

## 11. Governança e orientação de uso

Embora a reunião não apresente uma estrutura formal de governança, ela estabelece princípios claros de uso.

### 11.1. Configurar para a finalidade original

Os parâmetros devem ser utilizados para o propósito para o qual foram criados. Não se deve reutilizar um tipo documental, código ou parâmetro apenas porque está disponível tecnicamente.

O motivo apresentado é a preservação do conhecimento coletivo: se uma configuração é usada para uma finalidade não documentada ou não prevista, apenas quem a criou saberá seu significado.

### 11.2. Suporte a instalações em diferentes estágios

A equipe precisa considerar a realidade de todos os países, inclusive aqueles que permanecem com estruturas antigas. A evolução para o novo modelo não elimina automaticamente a necessidade de suportar instalações legadas.

### 11.3. Preferência pelo novo modelo de terceiros

Para novos usos, a orientação verbal é clara: o normal ou recomendado é seguir para o novo modelo de terceiros.

Essa recomendação não vem acompanhada de plano formal de migração, prazo obrigatório ou critérios de elegibilidade.

---

## 12. Relações de causa e efeito identificadas

A reunião permite reconstruir algumas relações lógicas.

### 12.1. Diversidade geográfica e operacional

```text
Diferenças entre países e companhias
            ↓
Necessidade de adaptar comportamentos do sistema
            ↓
Configurações persistidas no modelo de dados
            ↓
Parâmetros de instalação e parâmetros por módulo
```

### 12.2. Estruturas distintas de terceiros

```text
Existência de modelo antigo e novo modelo de terceiros
            ↓
Estruturas de dados diferentes
            ↓
Necessidade de seleção explícita do modelo
            ↓
Exclusividade de gravação entre um modelo e outro
```

### 12.3. Consultas amplas e desempenho

```text
Pesquisa sem critérios específicos
            ↓
Leitura ampla de registros
            ↓
Custo de processamento
            ↓
Limite configurável de resultados ou paginação
```

### 12.4. Integração de resseguro e volume de dados

```text
Propostas com riscos a serem enviados ao R21
            ↓
Necessidade de controlar o volume por chamada
            ↓
Parâmetro de máximo de riscos por integração
```

---

## 13. Mudanças de paradigma identificáveis

## 13.1. Configuração em dados em vez de comportamento inteiramente fixo

A plataforma é apresentada como configurável por meio de parâmetros gravados no modelo de dados. Isso permite adaptar parte do comportamento sem que cada instalação seja necessariamente uma implementação distinta.

Essa leitura é sustentada pelo uso de parâmetros para idioma, datas, BPM, resseguro, tesouraria, terceiros e consultas.

## 13.2. Modelo antigo de terceiros para modelo novo de terceiros

A transcrição descreve uma transição funcional e de dados entre dois modelos. O novo modelo amplia a capacidade de tratar entidades como companhias seguradoras dentro do universo de terceiros, aproveitando informações compartilhadas, como contatos e endereços.

Não há elementos suficientes para afirmar que se trata de uma migração obrigatória, concluída ou universal.

## 13.3. Operações online e batch

A existência dos “buzones” revela que determinadas operações de negócio podem ser executadas tanto em canal online quanto em processamento batch.

A reunião não permite concluir se esse modelo é orientado a eventos, integração por arquivos, filas ou outro padrão técnico.

---

## 14. Números e indicadores citados

Os valores abaixo foram mencionados durante a apresentação e não devem ser tratados como dados externos auditados.

| Indicador ou referência | Valor mencionado | Contexto |
|---|---:|---|
| Companhias em MAPFRE Puerto Rico | 3 | Exemplo de instalação com múltiplas companhias |
| Companhias em MAPFRE Honduras | 1 | Exemplo de instalação com uma companhia |
| Companhias em MAPFRE Perú | 1 | Exemplo de instalação com uma companhia |
| Empregados da corretora “Pepito SL” | 25 | Exemplo de visibilidade de informações por colaborador |
| Resultados exibidos em uma consulta | 15 | Exemplo de possível limitação por parâmetro |
| Registros conhecidos no sistema | 25 | Comparação com o exemplo de limitação de consulta |
| Colunas da tabela de parâmetros | 5 ou 6 | Estimativa verbal do palestrante |
| Parâmetros possíveis | 64, 70 ou 200 | Faixa ilustrativa; o palestrante não fixa um total |
| Código genérico mencionado | 999999 | Identificação genérica no contexto do novo modelo de terceiros |

---

## 15. Perguntas e respostas relevantes

## 15.1. Os modelos antigo e novo de terceiros são excludentes?

### Pergunta

A documentação sugere a dúvida sobre se os modelos de terceiros seriam excludentes ou se poderiam operar simultaneamente, especialmente considerando os processos batch chamados de “buzones”.

### Resposta

A resposta é que os modelos são excludentes quanto à persistência da informação de terceiros:

- ou a informação é gravada nas tabelas do modelo antigo;
- ou é gravada nas tabelas do novo modelo.

Não há opção intermediária em que o mesmo tratamento de terceiros grave livremente nos dois conjuntos de tabelas.

### O que isso esclarece

A presença de funcionalidades que podem operar em ambos os contextos, como os “buzones”, não elimina a exclusividade estrutural do modelo de dados.

---

## 15.2. É possível usar funcionalidades comuns com qualquer modelo de terceiros?

### Pergunta

A dúvida implícita é se funcionalidades como processos batch podem continuar sendo utilizadas independentemente do modelo de terceiros adotado.

### Resposta

O palestrante afirma que há funcionalidades comuns que podem operar com o modelo antigo ou novo. Os “buzones” são citados como exemplo.

Contudo, também existem dependências técnicas, mencionadas de forma pouco clara na transcrição como “esquemas del acle que el riesgo necesita”.

### O que isso esclarece

A exclusividade do modelo de dados não significa que todas as capacidades funcionais sejam completamente diferentes. Porém, a compatibilidade técnica depende de pré-requisitos não detalhados na reunião.

---

## 15.3. Por que há parâmetro para múltiplas contas bancárias se o novo modelo já suporta várias?

### Pergunta

A apresentação levanta a aparente redundância de um parâmetro que limita ou permite múltiplas contas bancárias.

### Resposta

No novo modelo de terceiros, o recurso já suporta várias contas ou meios de cobrança/pagamento. O parâmetro fazia mais sentido no modelo antigo, em que era necessário controlar se o segurado poderia ter apenas uma conta ou várias.

### O que isso esclarece

Alguns parâmetros refletem compatibilidade histórica e convivência com instalações ou modelos mais antigos, não necessariamente uma necessidade do desenho mais recente.

---

## 15.4. Por que uma consulta pode mostrar menos registros do que existem?

### Pergunta

Foi apresentado o cenário em que uma consulta mostra 15 registros, embora se saiba que existem 25.

### Resposta

Pode haver um parâmetro limitando a quantidade de resultados ou a paginação em tela.

### O que isso esclarece

Nem toda diferença entre a quantidade esperada e a quantidade exibida representa ausência de dados; pode ser consequência de configuração de desempenho ou usabilidade.

---

## 16. Limitações e ressalvas reconhecidas

A apresentação contém várias limitações explícitas.

### 16.1. Informações não investigadas

Há ao menos um parâmetro cuja finalidade o palestrante declara não ter investigado tecnicamente. Portanto, ele não é explicado.

### 16.2. Gerador de produtos em mudança

O portal ou gerador de produtos estaria sendo alterado como parte de um novo projeto, mas o palestrante informa não ter mais detalhes.

### 16.3. Incerteza sobre nomenclaturas

Diversos termos podem ter sido afetados por reconhecimento de voz. Entre eles:

- RISCore / RIFCOR / Rift Core;
- PEC Actu;
- THP / CERPARTY;
- “buzones”;
- “esquemas del acle”;
- G000000000;
- “tron web”;
- nomes históricos de companhias mencionadas no contexto de Malta e Chile.

Esses termos devem ser confirmados em fontes técnicas antes de serem usados como referência oficial.

### 16.4. Documentação funcional não substitui documentação técnica

A documentação mostrada é descrita como funcional e não apresenta a tabela física ou todos os detalhes técnicos. O palestrante sugere que o conhecimento da tabela real facilitará a atuação futura, mas essa informação não está integralmente exposta no material discutido.

---

## 17. Riscos e desafios

## 17.1. Riscos explicitamente mencionados ou diretamente sustentados

### Reutilização indevida de parâmetros

Usar parâmetros existentes para finalidades diferentes daquelas para as quais foram definidos cria dependência de conhecimento informal e dificulta a compreensão por outras pessoas.

### Convivência de modelos de terceiros

A necessidade de suportar países em diferentes estágios — alguns no modelo antigo, outros no novo — adiciona complexidade ao suporte e à evolução funcional.

### Consultas muito amplas

Consultas sem filtros específicos podem gerar acesso custoso a grandes volumes de dados, o que justifica limites configuráveis de resultado.

### Configurações fundamentais alteradas indevidamente

Parâmetros como idioma da instalação, formato ou comportamentos transversais são apresentados como configurações de base. Alterá-los posteriormente pode ser inadequado, embora a reunião não descreva consequências técnicas concretas.

## 17.2. Desafios derivados do contexto — interpretação analítica

As observações abaixo são inferências, não afirmações literais dos participantes.

### Governança de configuração

A grande quantidade de parâmetros e sua abrangência sugerem a necessidade de governança rigorosa sobre quem pode alterá-los, em que ambiente e com qual validação.

### Rastreabilidade entre modelo funcional e físico

Como a documentação funcional não mostra a estrutura física completa, equipes técnicas podem depender de conhecimento adicional para mapear adequadamente parâmetros, tabelas e impactos.

### Evolução entre modelos de terceiros

A coexistência de instalações em modelos distintos pode elevar o esforço de suporte, testes e evolução, principalmente quando uma funcionalidade precisa atender instalações legadas e instalações no novo modelo.

---

## 18. O que a reunião não permite concluir

A transcrição não fornece detalhe suficiente para concluir com segurança sobre os pontos abaixo.

### Tecnologia e infraestrutura

- arquitetura de aplicação;
- uso de monólito, microserviços ou serviços modulares;
- infraestrutura de cloud, on-premises ou híbrida;
- containerização;
- Kubernetes;
- balanceamento de carga;
- rede;
- ambientes existentes;
- estratégia de alta disponibilidade;
- recuperação de desastre;
- backup.

### Banco de dados

- versão efetivamente usada do Oracle;
- se Oracle é obrigatório em todas as instalações atuais;
- esquema físico da tabela de parâmetros;
- índices;
- relacionamentos;
- particionamento;
- estratégia de auditoria;
- histórico de alterações.

### Integrações

- protocolo e contrato da integração com R21;
- tecnologia de BPM;
- mecanismo de integração com BPM;
- implementação técnica dos “buzones”;
- tratamento de erro;
- reprocessamento;
- mensageria;
- filas;
- arquivos;
- APIs;
- autenticação entre sistemas.

### Segurança

- modelo de IAM;
- perfis e papéis;
- segregação de funções;
- autorização por companhia;
- auditoria de consultas;
- proteção de dados pessoais;
- criptografia;
- gestão de credenciais;
- conformidade regulatória.

### Operação e ciclo de vida

- processo de release;
- homologação de alterações de parâmetros;
- gestão de incidentes;
- monitoramento;
- observabilidade;
- SLA;
- responsáveis pela administração;
- processo formal de migração do modelo antigo para o novo modelo de terceiros.

### Roadmap

- cronograma do novo projeto do gerador de produtos;
- países previstos para migração;
- datas de descontinuação do modelo antigo;
- próximos marcos de evolução da plataforma.

---

## 19. Roadmap citado

A reunião traz apenas uma referência limitada de evolução:

| Tema | Situação mencionada | Detalhe disponível |
|---|---|---|
| Gerador de produtos / portal de configuração | Está variando ou sendo alterado em um novo projeto | Não há mais informações, segundo o palestrante |
| Novo modelo de terceiros | É recomendado como direção normal para uso | Não há cronograma, plano de migração ou obrigatoriedade formal |
| Suporte a países legados | Necessário enquanto houver instalações no modelo antigo | Não há lista completa de países nem prazo de suporte |

Não foram citadas datas absolutas, responsáveis, entregáveis ou marcos formais.

---

## 20. Conclusões principais

1. **A parametrização é parte estrutural da plataforma.**  
   Os parâmetros de instalação não são detalhes acessórios; eles determinam comportamentos fundamentais de módulos e processos.

2. **A configuração é persistida no modelo de dados.**  
   A tabela de parâmetros é apresentada como ponto central para armazenar decisões de instalação e comportamento.

3. **Há parâmetros transversais e parâmetros específicos por domínio.**  
   Emissão, sinistros, resseguro, tesouraria, terceiros, consultas, idioma e front-end possuem exemplos de configuração própria.

4. **A plataforma busca acomodar diferenças locais sem perder uma base comum.**  
   Países e companhias podem variar em idioma, estrutura societária, documentos, formato de data e regras operacionais.

5. **O novo modelo de terceiros é a direção recomendada, mas a realidade legada continua relevante.**  
   A organização precisa suportar instalações em estágios diferentes de evolução.

6. **Modelo antigo e novo modelo de terceiros são mutuamente exclusivos para armazenamento dos dados de terceiros.**  
   A decisão não é uma convenção local: decorre do núcleo e das tabelas utilizadas por cada modelo.

7. **Reutilizar parâmetros fora de sua finalidade é explicitamente desaconselhado.**  
   A prática compromete entendimento, manutenção e continuidade do conhecimento.

8. **A documentação funcional precisa ser complementada por conhecimento técnico.**  
   A apresentação mostra a finalidade dos parâmetros, mas não detalha integralmente tabelas, estruturas físicas, integrações ou mecanismos operacionais.

9. **Existem lacunas importantes que não devem ser preenchidas por suposição.**  
   Aspectos como arquitetura, segurança, BPM, R21, batch, governança de mudanças e roadmap permanecem pouco detalhados.

---

## 21. Glossário de termos mencionados

| Termo | Significado segundo a transcrição | Grau de certeza |
|---|---|---|
| RISCore | Nome principal registrado para a plataforma | Médio; há variações de transcrição |
| RIFCOR / Rift Core | Variações registradas para o nome da plataforma | Baixo; podem ser erros de reconhecimento |
| Parâmetros de instalação | Configurações persistidas que modulam comportamentos da solução | Alto |
| PEC Actu | Campo ou referência associada à data de gravação/atualização de registros | Médio; nomenclatura precisa confirmar |
| BPM | Componente ou mecanismo de processos para emissão e sinistros/prestações, quando habilitado | Médio |
| R21 | Plataforma corporativa da MAPFRE para gestão de resseguro, externa ao RISCore | Alto |
| Buzones | Processos batch que podem executar operações semelhantes às online | Médio |
| Novo modelo de terceiros | Modelo mais recente para tratar pessoas físicas e jurídicas | Alto |
| Modelo antigo de terceiros | Estrutura anterior de tratamento de terceiros | Alto |
| THP / CERPARTY | Tipo documental citado para identificação genérica de terceiros no novo modelo | Baixo a médio; grafia precisa confirmar |
| 999999 | Código genérico citado no contexto de terceiros | Alto |
| Gerador de produtos | Componente/portal de configuração de produtos, coberturas e atributos | Médio |
| Tron web | Nome citado no contexto de demonstração do gerador de produtos | Baixo; pode haver erro de transcrição |
| TRN | Referência associada ao núcleo da plataforma | Médio |
