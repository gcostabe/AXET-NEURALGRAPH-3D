# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `REEF.Academy-REEF.Core-Emisión-API de canal.mp4`
**Data de processamento:** 25/09/2026 06:04:48
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Análise estruturada — APIs de Canal para emissão no core REEF/TRON

> **Base documental:** transcrição automática de fala e evidências visuais extraídas de slides e telas da apresentação.  
> **Tema da sessão:** módulo preconstruído de **APIs de Canal** para simplificar a emissão de seguros no core **TRON**, dentro do ecossistema **REEF / Reef.M**.  
> **Data indicada nos slides:** março de 2024.  
> **Rastreabilidade:** os timestamps indicados referem-se às evidências visuais. A transcrição textual não contém timestamps por fala.  
> **Observação terminológica:** a transcrição automática apresenta deformações recorrentes, especialmente em “REEF”, “TRON”, “API Edge”, “API Business”, “Swagger”, “Newtron” e “Marketplace”. Onde a associação é sustentada pelos slides e pelo contexto, ela foi normalizada com ressalva.

---

## 1. Síntese executiva

A apresentação descreve uma abordagem para expor serviços de emissão de seguros a canais externos — como bancos, intermediários, dealers, financeiras ou grandes clientes — sem obrigá-los a integrar diretamente com a complexidade técnica do core TRON.

O problema central apresentado é que a **API Edge de TRON**, embora ampla e capaz de suportar emissão para diferentes ramos, utiliza objetos, campos e terminologia muito próximos do modelo interno do core. Isso torna a integração mais difícil, exige conhecimento específico de TRON/Newtron e aumenta a possibilidade de erro. Em um exemplo demonstrado, uma emissão via API Edge exige um JSON de mais de 800 linhas e o preenchimento de estruturas internas relacionadas a “buzones” e processos batch.

A solução proposta é a construção de **APIs de Canal** sobre a camada de **API Business**. Essas APIs são desenhadas para um ramo, operação e canal específicos. Elas recebem apenas os dados efetivamente relevantes para o integrador externo, aplicam validações sintáticas antecipadas por meio do contrato OpenAPI/Swagger, complementam internamente os dados obrigatórios do core por configuração do canal e chamam a API Edge para efetivar a emissão.

A principal mensagem da reunião é que novos casos de integração para emissão não devem, preferencialmente, ser orientados à API Edge diretamente. A direção recomendada é utilizar uma camada de negócio e APIs de canal, permitindo contratos mais compreensíveis, menor acoplamento com TRON, configuração de parâmetros internos por canal e maior autonomia dos países após implantação e capacitação.

---

## 2. Escopo e contexto da apresentação

A sessão foi conduzida por uma pessoa identificada na transcrição como Pablo, apresentada como responsável pelas APIs do core REEF/TRON. O objetivo declarado foi divulgar um módulo construído recentemente para facilitar a implementação de serviços de emissão no core TRON.

O escopo principal foi a emissão baseada em APIs de Canal, incluindo:

- a posição das APIs de Canal na arquitetura REEF/TRON;
- a diferença entre API Edge, API Business e APIs de Canal;
- a complexidade de emitir diretamente pela API Edge;
- a simplificação obtida por contratos de canal;
- o uso de configuração por canal para preencher dados internos obrigatórios;
- um exemplo de emissão de seguro automóvel;
- uma implantação prática na República Dominicana;
- dúvidas sobre versões, extensibilidade, segurança, catálogo de APIs, sinistros e atualização de versões.

A apresentação não se propõe a detalhar toda a arquitetura operacional ou de infraestrutura de REEF/TRON. Também não descreve tecnologias de cloud, banco de dados, CI/CD, observabilidade, níveis de serviço, topologia de rede ou estratégia de disaster recovery.

---

## 3. Contexto e antecedentes

### 3.1. O core TRON como sistema central

TRON é apresentado como o core sobre o qual ocorre a operação de seguros. A emissão de uma apólice, orçamento, endosso ou renovação envolve o preenchimento de estruturas internas e a execução de processos batch.

A apresentação diferencia a funcionalidade do core de suas camadas de exposição:

```text
Consumidores externos / canais de emissão
                ↓
            API Gateway
                ↓
     API Business / APIs de Canal
                ↓
            API Edge TRON
                ↓
             Core TRON
```

Esse desenho é uma consolidação analítica baseada nos slides e na explicação oral; não representa necessariamente um diagrama completo de infraestrutura.

### 3.2. Evolução da exposição do core

Segundo a apresentação, no passado não existia a camada de APIs de TRON da forma apresentada. A API Edge passou a ser usada para expor funcionalidades do core e, no futuro, é descrita como devendo se tornar o “único ponto de entrada” para TRON.

A API Edge é apresentada como uma camada técnica próxima ao core, enquanto a API Business surge como uma camada voltada a linguagem de negócio, integração com outros sistemas e exposição mais adequada a consumidores externos.

### 3.3. Disponibilidade por versão

O módulo de APIs de Canal é descrito como disponível:

- “de caixa” em instalações REEF;
- também em instalações de APIs de TRON a partir da versão **CIMS 2021.01**.

Durante perguntas, foi reforçado que o funcionamento seguro do módulo é garantido para versões superiores ou equivalentes a essa referência. Para países em versões anteriores, foi mencionada a possibilidade de avaliar implementações parciais ou casos específicos, mas sem compromisso genérico de cobertura.

> **Limitação importante:** a apresentação não detalha tecnicamente como esse suporte parcial funcionaria em versões anteriores a CIMS 2021.01.

---

## 4. Problemas identificados

## 4.1. Complexidade da integração direta com a API Edge

A API Edge é apresentada como tecnicamente próxima ao core TRON. Ela usa nomenclatura, objetos e estruturas internas de TRON/Newtron, o que torna sua adoção mais difícil para consumidores externos.

No exemplo de emissão direta, o integrador precisaria preencher estruturas relacionadas a:

- dados gerais;
- dados variáveis de apólice;
- riscos;
- intervenientes;
- coberturas;
- informações de terceiros;
- estruturas utilizadas para execução batch;
- códigos e parâmetros obrigatórios de TRON.

A reunião enfatiza que, para um canal externo, termos internos e campos como companhia, ramo, códigos de produto, estrutura comercial, agente, quadro de comissão e dados técnicos de “buzones” não são necessariamente compreensíveis ou relevantes.

### Consequência

A integração direta exige conhecimento específico de TRON e aumenta o risco de erros de preenchimento, especialmente quando o consumidor não conhece os objetos internos nem a terminologia Newtron.

---

## 4.2. Contratos excessivamente amplos para canais específicos

Foi apresentado o caso hipotético de um banco que deseja emitir somente seguros de automóvel e fornece apenas sete ou oito dados relevantes para essa operação.

A crítica à abordagem direta é que não seria adequado exigir que esse banco consuma um contrato com centenas de campos ou com estruturas genéricas, arrays e campos internos que não fazem parte da realidade de seu processo.

### Consequência

Um contrato amplo demais gera incerteza para o consumidor externo:

- quais campos devem ser enviados;
- quais campos são obrigatórios;
- quais códigos internos devem ser conhecidos;
- quais estruturas são aplicáveis ao caso;
- quais campos são condicionais;
- quais erros surgirão apenas depois do processamento batch.

---

## 4.3. Validações tardias

A apresentação cita um caso em que TRON permite tecnicamente a entrada de uma cadeia de caracteres longa em determinado “buzón”, mas uma regra funcional posterior aceita apenas um tamanho menor.

No exemplo verbal:

- o campo interno poderia suportar até 80 caracteres;
- uma regra funcional associada ao negócio poderia aceitar apenas 10;
- o erro ocorreria apenas durante ou após a execução batch.

### Consequência

O consumidor pode receber uma falha funcional tardia, mesmo quando a chamada inicial aparentemente foi aceita pela camada técnica.

---

## 4.4. Dependência de dados obrigatórios internos

Para emitir em TRON, determinados dados são obrigatórios, como informações de canal, agente, gestor de cobrança, quadro de comissão, níveis de estrutura comercial ou outros parâmetros do core.

Esses dados nem sempre devem ser informados pelo integrador externo. Em alguns cenários, fornecê-los externamente poderia ser inadequado do ponto de vista de segurança ou controle operacional.

### Consequência

Sem uma camada intermediária, o canal externo pode ser obrigado a lidar com informações que deveriam permanecer configuradas e governadas internamente.

---

## 4.5. Descoberta limitada de APIs existentes

Participantes relataram dificuldade em identificar se uma funcionalidade já existe na API Edge ou na API Business. Essa dificuldade pode levar a duplicação de desenvolvimento ou à criação de integrações sem reutilizar capacidades já disponíveis.

O apresentador reconheceu explicitamente que a documentação precisa evoluir e citou o Marketplace como fonte atual de consulta.

---

## 5. Solução apresentada: APIs de Canal

As APIs de Canal são apresentadas como uma camada construída sobre a API Business para expor operações de emissão adaptadas à necessidade de um canal específico.

Em vez de entregar ao consumidor externo uma API técnica e genérica do core, a organização define um contrato mais simples e orientado ao negócio.

### Características centrais

1. **Serviço adaptado ao canal**  
   O contrato expõe apenas os dados relevantes para o canal emissor.

2. **Linguagem mais natural**  
   Os campos podem ser apresentados em terminologia de negócio, desacoplada da nomenclatura interna de TRON/Newtron.

3. **Validação sintática antecipada**  
   O contrato OpenAPI/Swagger pode conter regras de formato, obrigatoriedade, tamanho e outros limites sintáticos.

4. **Preenchimento interno por configuração**  
   Dados necessários para TRON, mas não fornecidos pelo canal, são preenchidos com base na configuração do canal autenticado.

5. **Uso de bibliotecas preconstruídas**  
   O módulo inclui bibliotecas que auxiliam na construção de objetos e estruturas exigidos pela API Edge.

6. **Integração com API Gateway**  
   A exposição externa ocorre normalmente por API Gateway, que participa do processo de autenticação e identificação do canal.

---

## 6. Arquitetura e funcionamento lógico

## 6.1. Camadas descritas

A arquitetura apresentada pode ser entendida da seguinte maneira:

```text
Canais de emissão externos
- Banco
- Dealer
- Financeira
- Intermediário
- Grande cliente
- Front-end externo
                ↓
          API Gateway
                ↓
       API de Canal / API Business
                ↓
      Configuração específica do canal
                ↓
 Bibliotecas de mapeamento e preenchimento
                ↓
            API Edge TRON
                ↓
             Core TRON
                ↓
     Processos batch e resultado da emissão
```

### Observação

O fluxo acima é uma reconstrução conceitual baseada em slides e explicações. A reunião não detalha todos os componentes físicos, protocolos, formatos de segurança, barramentos, bancos de dados ou serviços de infraestrutura envolvidos.

---

## 6.2. API Edge

Segundo o slide “Arquitectura APIs en REEF”, a API Edge:

- expõe funcionalidade do core, inclusive funcionalidades personalizadas;
- utiliza nomenclatura e objetos de TRON;
- possui módulos identificados como:
  - CMN;
  - ISU;
  - THP;
  - LSS;
  - TSY;
  - RPT;
  - BTC;
  - SPL;
- tinha aproximadamente **600 operações expostas** em março de 2024;
- evolui continuamente.

A API Edge é a camada que efetivamente conversa com o core TRON e permite a execução de suas operações, incluindo emissão.

---

## 6.3. API Business

Segundo os slides e a explicação oral, a API Business:

- oferece um catálogo de serviços em linguagem de negócio;
- comunica-se com a API Edge e com outros sistemas;
- é normalmente exposta por API Gateway;
- tinha aproximadamente **300 operações preconstruídas expostas** em março de 2024;
- busca reduzir a dependência de terminologia interna de TRON;
- é utilizada por ativos corporativos, como autosserviços e outros canais.

A apresentação também menciona uma tendência de nomenclatura para “API REEF” ou “API RIS” — o reconhecimento automático torna a sigla incerta. A intenção descrita é dar uma orientação mais ligada ao ecossistema REEF, e não apenas à ideia de uma API de negócio genérica.

---

## 6.4. API de Canal

A API de Canal é uma especialização da camada de negócio para um caso de emissão específico.

Ela recebe uma requisição compatível com o processo do canal. Por exemplo, para emissão de automóvel, o contrato pode solicitar:

- data de início;
- data de fim;
- dados do tomador;
- dados do veículo;
- placa;
- marca;
- modelo;
- submodelo;
- ano;
- valor;
- uso;
- tipo;
- produto comercial.

Internamente, a API:

1. identifica o canal autenticado;
2. recupera sua configuração;
3. preenche dados obrigatórios de TRON não fornecidos externamente;
4. transforma os campos de negócio em estruturas requeridas pela API Edge;
5. chama a API Edge;
6. retorna o resultado da emissão em um formato simplificado.

---

## 6.5. Emissão batch no core TRON

A emissão via API Edge foi explicada como um processo em que:

```text
Preenchimento de “buzones”
        ↓
Execução do processo batch de emissão
        ↓
Leitura do resultado do processo
```

O slide de referência indica que essa dinâmica se aplica a operações como:

- apólice;
- orçamento;
- endossos;
- renovação;
- outros processos batch.

A reunião não explica a implementação interna dos “buzones”, nem sua persistência, modelo de dados ou mecanismo de execução batch.

---

## 7. Comparação entre emissão direta e emissão por API de Canal

| Aspecto | API Edge direta | API de Canal |
|---|---|---|
| Linguagem | Próxima a TRON/Newtron | Próxima ao negócio e ao canal |
| Público-alvo | Equipes com conhecimento de TRON | Consumidores externos e canais específicos |
| Contrato | Genérico e amplo | Adaptado à operação e ao canal |
| Dados enviados | Inclui estruturas internas e dados técnicos | Apenas dados relevantes ao canal |
| Complexidade | Alta | Reduzida, segundo a apresentação |
| Configurações internas | Podem precisar ser informadas ou conhecidas | Preenchidas por preconfiguração |
| Validação | Parte das falhas pode ocorrer no batch | Regras sintáticas podem ser antecipadas no OpenAPI |
| Acoplamento com core | Alto | Menor para o consumidor externo |
| Risco de erro | Descrito como maior | Descrito como reduzido |

> A classificação de “menor acoplamento” é uma leitura analítica sustentada pela separação proposta entre contrato de canal e modelo interno de TRON. Não foi apresentada como uma formulação literal pelos participantes.

---

## 8. Demonstração técnica apresentada

## 8.1. Contrato Swagger de uma API de Canal

Em tela, foi demonstrado um arquivo identificado como:

```text
channelAPI.yaml
```

O caminho visível sugere um repositório relacionado a `core_tron_business_api`, mas essa informação deve ser tratada apenas como evidência do ambiente de demonstração, não como definição oficial de estrutura de repositórios.

O contrato exibiu uma operação identificada como:

```yaml
operationId: postPolicyAuto308
```

O serviço foi descrito como criação de uma apólice Auto 308.

Entre os elementos apresentados estavam:

- cabeçalho `Accept-Language`, obrigatório;
- cabeçalho `userBK`, opcional, descrito como “Backend user”;
- corpo JSON;
- resposta `200`;
- respostas de erro `400`, `401` e `403`.

O Swagger também mostrava um modelo de dados com estruturas como:

- `FixedData`;
- `PolicyHolderData`;
- `VariableData`.

## 8.2. Exemplo de dados de veículo

O exemplo de JSON exibido continha campos como:

```json
{
  "vehicleBrandCode": 1,
  "vehicleModelCode": 1,
  "vehicleSubModelCode": 1,
  "vehicleSubModelYearNum": 2020,
  "vehicleValue": 17875,
  "drivingZone": "A",
  "vehicleUseCode": 1,
  "vehicleTypeCode": 1,
  "vehiclePlateNumber": "NS04619381",
  "commercialProductCode": 301
}
```

Esses campos representam uma demonstração específica de emissão de automóvel. A reunião não afirma que todos eles serão obrigatórios em todos os produtos, canais ou países.

---

## 8.3. Demonstração da API Edge no Postman

Foi exibida uma chamada POST para uma API Edge de emissão. A URL visível continha elementos associados a ambiente de pré-produção ou desenvolvimento, mas não deve ser reproduzida como endpoint operacional fora do contexto da apresentação.

A demonstração mostrou:

- resposta `200 OK`;
- tempo aproximado de resposta de `1751 ms`;
- retorno com valores de companhia e número de apólice.

O payload continha estruturas com nomes técnicos e campos abreviados, como `cmpVal`, `plyVal`, `qtnVal`, `enrSqn`, `itcVal` e outros. Isso reforça visualmente a tese da apresentação: o contrato da API Edge está fortemente associado ao modelo interno de TRON.

---

## 8.4. Simplificação demonstrada

A apresentação contrapõe:

- uma emissão direta com aproximadamente **800 linhas** de JSON;
- uma API de Canal que solicita somente dados do período, do veículo e do terceiro.

O objetivo não é afirmar que toda emissão por API Edge terá exatamente 800 linhas, nem que toda API de Canal será curta. O ponto demonstrado é que o contrato externo pode ser significativamente simplificado quando modelado para um canal e operação específicos.

---

## 9. Configuração por canal

A configuração por canal é um dos elementos mais importantes da solução.

Quando um canal realiza uma emissão, ele pode não fornecer dados como:

- agente;
- quadro de comissão;
- canais;
- níveis de estrutura comercial;
- gestor de cobrança;
- idioma;
- outros parâmetros obrigatórios para o funcionamento do core.

Esses dados são preenchidos pela solução a partir de uma configuração associada ao canal.

### Exemplo conceitual apresentado

```text
Canal 1 autenticado
        ↓
Recuperação da preconfiguração do Canal 1
        ↓
Preenchimento de agente, comissão, níveis comerciais e outros dados internos
        ↓
Construção dos objetos exigidos por TRON
        ↓
Chamada de emissão à API Edge
```

Se outro canal utilizar o mesmo serviço, a solução pode aplicar uma configuração diferente para esse outro canal.

### Implicação operacional

A mesma operação de negócio pode ser exposta para múltiplos canais sem exigir que cada um informe todos os detalhes internos da emissão.

---

## 10. Modelo de serviço “a máximos” e adaptação por canal

Uma pergunta relevante tratou do versionamento ou multiplicação de APIs quando há vários canais para o mesmo ramo.

A resposta apresentada foi que não é necessário criar uma API completamente distinta para cada canal. A proposta é:

1. definir uma implementação de serviço “a máximos” para um ramo;
2. incluir, nesse contrato base, os dados potencialmente necessários para a emissão daquele ramo;
3. adaptar ou “achatar” a exposição para cada canal;
4. preencher por preconfiguração os dados que o canal não deve ou não precisa informar.

### Exemplo citado

Para o ramo 308, referido como automóvel no exemplo:

- haveria um serviço base;
- esse serviço poderia contemplar todos os dados variáveis relevantes;
- um canal poderia fornecer apenas cinco ou seis campos;
- os demais dados seriam preenchidos pela configuração daquele canal.

### Interpretação analítica

Esse modelo sugere uma tentativa de equilibrar dois objetivos:

- reutilização de uma capacidade funcional comum por ramo;
- personalização controlada da experiência de integração por canal.

A apresentação não detalha como esse “recorte” é implementado tecnicamente — por exemplo, se há contratos separados, transformação em gateway, parametrização de schemas ou outra estratégia.

---

## 11. Simplificação e “achatamento” de estruturas

O apresentador explica que a API Edge pode exigir estruturas em array ou pares código/valor para dados variáveis e intervenientes. Nas APIs de Canal, essas estruturas podem ser transformadas em atributos explícitos e orientados ao domínio.

Em vez de algo conceitualmente semelhante a:

```text
código de marca + valor
código de modelo + valor
```

o contrato de canal pode expor diretamente campos como:

```text
vehicleBrandCode
vehicleModelCode
```

Segundo a explicação, a biblioteca de apoio realiza o mapeamento entre o campo simplificado da API de Canal e as estruturas internas esperadas por TRON.

### Benefício declarado

O consumidor externo deixa de precisar conhecer:

- códigos técnicos internos;
- arrays de dados variáveis;
- estruturas de intervenientes;
- tabelas e “buzones” de TRON;
- terminologia Newtron.

---

## 12. Extensibilidade para particularidades locais

A apresentação reconhece que países podem possuir tabelas, estruturas ou validações locais além do núcleo padrão de TRON.

Foi citado o caso da República Dominicana, em que, para o tratamento de terceiros, eram necessários dados adicionais em estruturas locais, relacionadas a validações específicas. A fala menciona verificações ligadas a arquivos de “blanqueo de capitales” ou expressão semelhante; devido à qualidade da transcrição, o termo exato deve ser considerado incerto, mas o contexto sugere controles locais relacionados a validações de terceiros.

A abordagem descrita foi:

1. implementar uma nova operação local na API Edge;
2. estender a camada Business;
3. estender a biblioteca usada para preenchimento das estruturas;
4. integrar o preenchimento local à emissão padrão.

### Conclusão factual

A camada proposta não é apresentada como imutável. Ela pode ser estendida para acomodar funcionalidades locais.

### Limitação

A reunião não detalha governança, critérios de aprovação, versionamento, testes ou responsabilidades para extensões locais.

---

## 13. Modelo de integração e segurança

## 13.1. Papel do API Gateway

O API Gateway é apresentado como a camada por meio da qual APIs expostas externamente costumam ser publicadas e protegidas.

A reunião descreve que o Gateway participa da identificação do canal:

1. o consumidor externo faz login com credenciais;
2. o Gateway identifica o usuário ou a identidade autenticada;
3. por configuração, essa identidade é associada a um usuário de TRON;
4. a solução utiliza essa associação para determinar qual preconfiguração de canal aplicar;
5. a emissão é executada com o contexto interno adequado.

## 13.2. O usuário externo não deve informar o usuário TRON

Uma dúvida levantada tratou de autenticação de intermediários externos e da relação com usuário TRON.

A resposta foi clara em um ponto: o consumidor externo não deve enviar, como parâmetro, um identificador de usuário TRON. Isso foi caracterizado como um risco de segurança, pois permitiria tentar suplantar a identidade de outro usuário caso seu identificador fosse conhecido.

A associação entre credenciais externas e contexto TRON deve ocorrer internamente, via configuração do Gateway e da integração.

### O que isso esclarece

- A identidade externa e o usuário TRON não são necessariamente a mesma coisa.
- Um usuário autenticado, por exemplo em diretório corporativo, pode ser mapeado para um usuário TRON operacional.
- A definição de agente, comissões e estrutura comercial pode decorrer desse mapeamento e da preconfiguração.
- O canal não deve controlar livremente o contexto interno de TRON.

## 13.3. O que não foi detalhado

A reunião não permite concluir:

- qual protocolo de autenticação é utilizado;
- se há OAuth 2.0, OpenID Connect, SAML ou outro mecanismo;
- como ocorre a rotação de credenciais;
- como são armazenados segredos;
- quais são as regras de autorização no Gateway;
- se há segregação por tenant;
- como ocorrem auditoria e rastreabilidade de chamadas;
- se há limitação de taxa, WAF ou mecanismos de proteção contra abuso.

---

## 14. Operações, catálogo e Marketplace

## 14.1. Quantidade de operações citadas

A apresentação informou, em março de 2024:

| Camada | Quantidade mencionada | Contexto |
|---|---:|---|
| API Edge | Aproximadamente 600 operações | Operações técnicas do core TRON |
| API Business | Aproximadamente 300 operações preconstruídas | Serviços em linguagem mais próxima do negócio |
| APIs de Canal | Não foi informada uma quantidade fixa | São criadas conforme necessidade de ramo/canal |

Esses números foram declarados durante a apresentação e não são apresentados como inventário auditado ou permanente.

## 14.2. Marketplace como fonte de documentação

O Marketplace foi citado como local onde as APIs disponíveis no ecossistema TRON estão documentadas.

Segundo a explicação:

- é possível filtrar APIs relacionadas a TRON;
- é possível consultar APIs da camada Edge;
- é possível consultar APIs da camada de mediação/API Business;
- é possível acessar operações disponíveis;
- em alguns casos, é possível baixar o Swagger.

A apresentação menciona que a ferramenta teria substituído uma solução anterior identificada na transcrição como “RAM”. A grafia e o nome exato da ferramenta anterior não foram confirmados pelos slides.

## 14.3. Evolução planejada da busca

Foi mencionado que, no futuro, o Marketplace deverá oferecer um mecanismo de busca facilitado por inteligência artificial, permitindo perguntas em linguagem mais natural sobre a existência de operações.

Exemplo conceitual citado: perguntar se existe operação para obter estados civis.

> **Importante:** isso foi apresentado como trabalho em andamento ou intenção futura. Não há na reunião detalhes sobre prazo, escopo, tecnologia, disponibilidade ou garantias dessa capacidade.

---

## 15. Caso concreto: MAPFRE BHD Seguros — República Dominicana

O slide “Implantaciones” apresenta uma implantação na **MAPFRE BHD Seguros**, na República Dominicana.

### Dados declarados

| Item | Informação apresentada |
|---|---|
| Esforço de trabalho | 2 semanas |
| Operações expostas | 12 |
| Ramos | 5 |
| Operações de negócio | Emissão de orçamento, emissão de apólice, endossos e simulação |
| Ramos citados | Entre outros, automóvel e viagens |
| Complementos | Catálogos associados |
| Exposição | API Gateway |

### Aspectos adicionais relatados oralmente

A apresentação afirma que a equipe:

- ajudou o país a implementar a solução;
- forneceu formação para que o país se tornasse mais autônomo;
- buscou habilitar autonomia para inclusão de novos ramos;
- buscou habilitar autonomia para criação de novas preconfigurações por canal.

Também foi citado que a implantação dominicana exigiu uma extensão local no tratamento de terceiros, devido a validações específicas do país.

### Limites da evidência

A reunião não informa:

- quais foram exatamente os cinco ramos;
- quais foram as 12 operações;
- se as duas semanas incluem análise, desenvolvimento, testes e implantação;
- quais canais externos consumiam as APIs;
- volumes processados;
- indicadores de redução de erros;
- resultados de negócio ou financeiros;
- modelo de sustentação após a implantação.

---

## 16. Outros países e ativos mencionados

Os países foram citados principalmente como exemplos de implantação, integração ou disponibilidade de capacidades.

| País | Contexto citado | Grau de detalhe |
|---|---|---|
| República Dominicana | Implantação de APIs de Canal; autosserviços; extensão local | Maior detalhamento |
| México | Integrações diretas com API Edge; referência a versão anterior de TRON; uso em sinistros | Detalhamento parcial |
| Paraguai | Autosserviço de clientes corporativo | Apenas menção |
| Brasil | Autosserviço de clientes mencionado | Apenas menção |
| Chile | Próximo a implementar autosserviço de provedores; primeiro a implementar algo associado a chatbot, segundo a transcrição | Termo parcialmente incerto |
| Peru | API Business em versão anterior; projeto paralelo de atualização CIMS 2024 | Detalhamento parcial |
| Panamá | Integração relacionada a abertura de sinistros via API Edge | Apenas menção |
| Costa Rica | Mencionada em conversa histórica sobre sinistros | Apenas menção |

> A transcrição contém ruídos e termos deformados em alguns trechos relacionados a países, produtos e ativos corporativos. A tabela preserva apenas as associações suficientemente sustentadas pelo contexto.

---

## 17. Operações além de emissão

Embora a apresentação tenha foco em emissão, foram citadas outras capacidades:

- orçamento;
- apólice;
- endossos;
- renovação;
- simulação;
- consulta de catálogos;
- consulta de terceiros;
- consulta de agentes;
- abertura de sinistros;
- autosserviço de clientes;
- autosserviço de distribuidores;
- autosserviço de provedores;
- ativos relacionados a chatbot, em formulação parcialmente incerta na transcrição.

A API Edge é apresentada como abrangente e capaz de expor operações de múltiplos domínios do core, não somente emissão.

---

## 18. Perguntas e respostas relevantes

## 18.1. Compatibilidade com versões antigas de TRON

### Pergunta

Um participante perguntou se o módulo cobriria uma implementação mais recente em um contexto e também versões anteriores de TRON usadas em outro país, com menção ao México.

### Resposta

O apresentador afirmou que as APIs de Canal funcionam com versões de TRON superiores à release CIMS 2021.01. Para países abaixo dessa versão, seria necessário avaliar casos específicos, podendo existir alguma possibilidade de implementar parte da camada para determinadas funcionalidades.

### O que isso esclarece

A compatibilidade mínima declarada é CIMS 2021.01. A possibilidade de uso em versões anteriores não é uma garantia geral.

---

## 18.2. É preciso criar uma API para cada canal?

### Pergunta

Foi perguntado se, para cada canal, seria necessário manter uma API separada ou um versionamento diferente.

### Resposta

A resposta foi que a abordagem não exige uma implementação completamente distinta por canal. O recomendável é construir um serviço do ramo “a máximos” e adaptar a exposição por canal, utilizando preconfigurações para preencher o que o canal não envia.

### O que isso esclarece

A solução pretende reutilizar a lógica do ramo e variar a configuração por canal, evitando duplicação completa de serviços.

---

## 18.3. Os países podem construir suas próprias APIs de Canal?

### Pergunta

Um participante perguntou se teria autonomia para criar essas APIs ou se seria necessário abrir uma solicitação ao time central.

### Resposta

Foi citado o caso da República Dominicana como evidência de que o país recebeu apoio inicial, implementação e formação para se tornar autônomo tanto na inclusão de novos ramos quanto na criação de novas preconfigurações por canal.

### O que isso esclarece

O modelo não é apresentado como centralizado exclusivamente no time corporativo. Entretanto, a reunião não define formalmente o limite entre autonomia local e necessidade de apoio corporativo.

---

## 18.4. Existem contratos Swagger prontos para todos os países?

### Pergunta

Foi perguntado se os links ou contratos Swagger dos serviços já estariam disponíveis.

### Resposta

O apresentador explicou que o Swagger demonstrado foi criado para a demo. Cada país e implementação define seu próprio contrato, de acordo com o ramo e a forma como deseja receber os dados.

### O que isso esclarece

Não existe um Swagger universal de API de Canal que possa ser usado sem adaptação. As APIs de Canal são específicas ao contexto de implementação.

---

## 18.5. O modelo cobre apenas emissão de apólices novas?

### Pergunta

Foi perguntado se os serviços se aplicariam a outros tipos de emissão, além de apólices novas, e se haveria operações como consulta de apólices ou sinistros.

### Resposta

Foi respondido que a API Edge possui cerca de 600 operações e a API Business cerca de 300, incluindo operações de sinistros. Foi citado que autosserviços corporativos já utilizam APIs da camada de negócio para abertura de sinistros em alguns países.

### O que isso esclarece

A arquitetura é mais ampla que o caso de emissão apresentado. Contudo, a sessão não detalha APIs de Canal específicas para sinistros.

---

## 18.6. Onde consultar as APIs disponíveis?

### Pergunta

Participantes perguntaram onde poderiam consultar o índice de operações existentes.

### Resposta

Foi indicado o Marketplace como local de documentação das APIs expostas no ecossistema TRON, com consulta de operações e possibilidade de baixar Swagger em determinados casos.

### O que isso esclarece

O Marketplace é a fonte de descoberta atualmente indicada, embora a própria apresentação reconheça limitações na documentação e na facilidade de busca.

---

## 18.7. Como o canal autenticado é identificado com segurança?

### Pergunta

Foi apresentada uma situação de intermediário externo que deseja integrar sua plataforma para emitir apólices. A dúvida era como relacionar sua autenticação à configuração de comissão, agente e demais parâmetros internos.

### Resposta

O apresentador explicou que o usuário externo não fornece um usuário TRON como parâmetro. O API Gateway autentica o consumidor e, por configuração, associa sua identidade a um usuário ou contexto TRON. Esse contexto determina a preconfiguração a ser usada.

### O que isso esclarece

A definição de canal e contexto de emissão deve ocorrer de forma controlada no backend/Gateway, e não por informação livremente enviada pelo integrador externo.

---

## 18.8. Atualização de CIMS e compatibilidade com APIs existentes

### Pergunta

Um participante do Peru perguntou se a atualização de CIMS 2022 para CIMS 2024 poderia afetar APIs já implantadas.

### Resposta

Foi afirmado que APIs de TRON e API Business evoluem buscando retrocompatibilidade. Caso um serviço local específico enfrente conflito durante a atualização, seria necessário resolver o caso naquele momento. Também foi recomendado atualizar a API Business para sua versão mais recente, para aproveitar o modelo apresentado.

### O que isso esclarece

Há uma intenção de preservação de compatibilidade, mas não uma garantia absoluta de ausência de conflitos em implementações locais.

---

## 18.9. Como evitar duplicar APIs já existentes?

### Pergunta

Foi relatado que equipes de arquitetura exigem validação prévia para assegurar que uma funcionalidade nova não exista na API Edge.

### Resposta

O apresentador reconheceu a dificuldade de documentação e recomendou consultar o Marketplace ou entrar em contato com o time corporativo quando houver necessidade concreta.

### O que isso esclarece

A organização reconhece uma lacuna na descoberta de capacidades existentes. A estratégia atual depende de documentação disponível e apoio do time corporativo.

---

## 19. Modelo operacional e responsabilidades

A apresentação permite identificar algumas responsabilidades, embora não detalhe uma estrutura formal de governança.

### Equipe corporativa de APIs

É apresentada como responsável por:

- construir e evoluir o módulo;
- apoiar países em implantações;
- orientar a escolha de APIs;
- ajudar na exposição via API Gateway;
- fornecer formação em casos de necessidade;
- evoluir documentação e capacidades de descoberta.

### Países

São apresentados como potenciais responsáveis por:

- definir quais ramos e operações precisam expor;
- decidir quais informações seus canais enviarão;
- configurar canais;
- criar preconfigurações;
- implementar serviços específicos com apoio inicial;
- evoluir seus contratos conforme suas necessidades.

### Consumidores externos

São entendidos como canais que:

- autenticam-se no ambiente exposto;
- consomem APIs simplificadas;
- enviam dados de negócio previstos no contrato;
- não devem fornecer parâmetros internos de TRON;
- podem depender de catálogos expostos para preencher determinados campos de domínio.

---

## 20. Processo de implantação sugerido

A apresentação descreve uma sequência de implementação, que pode ser organizada da seguinte forma:

```text
1. Definir como o ramo será exposto
                ↓
2. Projetar o serviço e seu contrato
                ↓
3. Definir dados que serão fornecidos pelo canal
                ↓
4. Criar preconfiguração dos dados internos não fornecidos
                ↓
5. Mapear campos de negócio para objetos TRON
                ↓
6. Expor de forma segura no API Gateway
                ↓
7. Integrar o canal e operar a emissão
```

### Detalhamento

1. **Decidir como expor o ramo**  
   Identificar quais dados devem estar disponíveis para tornar o ramo emitível.

2. **Desenhar o serviço**  
   Construir o contrato de API e definir os campos expostos.

3. **Definir a exposição “a máximos”**  
   Criar uma visão ampla da capacidade de emissão do ramo.

4. **Analisar cada canal**  
   Identificar quais informações cada canal realmente poderá ou deverá informar.

5. **Criar preconfiguração por canal**  
   Configurar dados fixos ou internos que devem completar a emissão.

6. **Integrar à API Edge**  
   Utilizar bibliotecas para mapear o contrato de canal para os objetos internos de TRON.

7. **Publicar no API Gateway**  
   Expor o serviço de forma segura e associar autenticação ao contexto adequado.

---

## 21. Limitações reconhecidas

## 21.1. Não existe contrato universal de API de Canal

Cada Swagger deve ser definido conforme ramo, país, canal e necessidade de negócio. O exemplo mostrado não é um modelo obrigatório ou reaproveitável de maneira automática.

## 21.2. Dependência de versão mínima

A funcionalidade é declaradamente suportada a partir de CIMS 2021.01. Cenários anteriores exigem avaliação particular.

## 21.3. Necessidade de desenho funcional

A simplificação técnica não elimina a necessidade de decidir quais dados são necessários para emitir um produto. A apresentação afirma que existe trabalho prévio para entender como cada canal realizará a emissão.

## 21.4. Extensões locais podem ser necessárias

Países com validações, tabelas ou estruturas próprias podem precisar estender API Edge, API Business e bibliotecas.

## 21.5. Documentação ainda é insuficiente

O apresentador reconhece que a descoberta de APIs pode ser difícil e que a documentação precisa melhorar.

## 21.6. Formação não é apresentada como programa amplo e imediato

Quando perguntado sobre capacitação planejada para países, o apresentador afirmou que não havia, no curto prazo, um plano geral de treinamento. O apoio é descrito como orientado a necessidades concretas.

## 21.7. Retrocompatibilidade não elimina riscos locais

A evolução das APIs busca retrocompatibilidade, mas conflitos em serviços específicos podem exigir tratamento durante atualizações.

---

## 22. Riscos e desafios

## 22.1. Riscos explicitamente mencionados

| Risco | Contexto |
|---|---|
| Maior probabilidade de erro | Integração direta com API Edge e payloads complexos |
| Erros funcionais tardios | Campos aceitos tecnicamente, mas inválidos para regras de negócio |
| Uso indevido de identidade | Permitir que consumidor externo envie livremente usuário TRON |
| Duplicação de desenvolvimento | Falta de visibilidade sobre APIs já existentes |
| Dependência de versão | Países abaixo de CIMS 2021.01 podem não ter cobertura completa |
| Conflitos em atualização | APIs locais podem exigir ajustes ao atualizar CIMS |

## 22.2. Desafios derivados do contexto — análise

Os pontos a seguir são inferências analíticas, não afirmações literais dos participantes.

### Governança de contratos

Como cada país pode criar contratos próprios para ramos e canais, há potencial necessidade de governança para evitar divergência excessiva entre APIs semelhantes.

### Gestão de preconfigurações

O modelo transfere parte relevante da complexidade para configurações por canal. Isso reduz complexidade para o integrador, mas pode exigir controle rigoroso sobre alterações de agente, comissão, estrutura comercial e outros parâmetros internos.

### Evolução de contratos

A necessidade de atender novos canais, produtos ou campos pode exigir gestão cuidadosa de versões de APIs e compatibilidade com integradores já conectados.

### Observabilidade e suporte

Como o fluxo passa por Gateway, API de Canal, API Business, API Edge e processos batch, diagnósticos de falha podem exigir rastreabilidade entre múltiplas camadas. A apresentação não descreve como isso é realizado.

---

## 23. Transformações estruturais identificadas

## 23.1. Transformação arquitetural

A apresentação indica uma direção de evolução de integração diretamente acoplada ao core para integração mediada por camadas de negócio.

```text
Integração direta com estruturas TRON
                ↓
Contratos de negócio por canal
                ↓
Mapeamento interno para o core
```

Essa transformação é sustentada pela recomendação explícita de não orientar novos países diretamente à API Edge quando o objetivo for integração externa de emissão.

## 23.2. Transformação de integração

A API Edge é descrita como uma interface técnica e genérica. A API de Canal é apresentada como interface orientada a uma experiência de integração específica.

A mudança não elimina a API Edge; ela a reposiciona como camada subjacente, enquanto a API Business/API de Canal se torna a camada recomendada para consumidores externos.

## 23.3. Transformação de responsabilidade

A solução desloca a responsabilidade de interpretar estruturas internas de TRON:

```text
Antes: consumidor externo precisa conhecer o core
Depois: a camada de canal interpreta e mapeia para o core
```

Essa é uma leitura diretamente suportada pelas explicações sobre linguagem natural, simplificação do Swagger e uso de bibliotecas de mapeamento.

## 23.4. Transformação de segurança e controle

A identificação do canal passa a ser associada à autenticação e à configuração interna, em vez de depender de parâmetros internos enviados pelo consumidor.

Isso sugere um modelo em que autorização e contexto operacional são tratados de forma centralizada na camada de exposição.

---

## 24. Relações de causa e efeito reconstruídas

## 24.1. Complexidade do core e necessidade de APIs de Canal

```text
API Edge próxima ao core TRON
        ↓
Objetos técnicos, códigos e terminologia Newtron
        ↓
Integração difícil para consumidores externos
        ↓
Maior chance de erro e necessidade de conhecimento especializado
        ↓
Necessidade de contratos simplificados
        ↓
APIs de Canal sobre a API Business
```

## 24.2. Dados obrigatórios internos e configuração por canal

```text
TRON exige dados internos para emissão
        ↓
Canais externos não devem ou não conseguem informar esses dados
        ↓
Necessidade de completar a emissão internamente
        ↓
Preconfiguração associada ao canal autenticado
```

## 24.3. Erros tardios e validação antecipada

```text
Regras funcionais podem falhar durante o batch
        ↓
Retorno de erro tardio ao integrador
        ↓
Necessidade de validar formato e limites antes do processamento
        ↓
Uso de regras sintáticas no contrato OpenAPI/Swagger
```

## 24.4. Falta de visibilidade e Marketplace

```text
Grande quantidade de operações disponíveis
        ↓
Dificuldade de saber se uma capacidade já existe
        ↓
Risco de duplicação de desenvolvimento
        ↓
Uso do Marketplace como catálogo
        ↓
Planejamento de busca mais inteligente no futuro
```

---

## 25. Roadmap e direcionamentos citados

A reunião não apresentou um roadmap formal com datas, responsáveis e marcos. Ainda assim, foram citadas direções de evolução:

| Direcionamento | Situação apresentada |
|---|---|
| Evolução contínua de APIs de Canal | Declarada como em andamento |
| Ampliação de funcionalidades expostas | Declarada como intenção contínua |
| API Edge como ponto de entrada futuro para TRON | Direção arquitetural declarada |
| Crescimento da API Business | Operações seguem sendo adicionadas |
| Atualização de API Business em países | Recomendada para aproveitar o modelo apresentado |
| Melhoria da documentação | Reconhecida como necessidade |
| Busca assistida por IA no Marketplace | Mencionada como trabalho futuro |
| Formação de países sob demanda | Apoio quando houver necessidade concreta |

> Não há base na reunião para inferir datas de entrega, orçamento, prioridade relativa, patrocinadores ou cronograma detalhado para esses direcionamentos.

---

## 26. O que a reunião não permite concluir

A apresentação não fornece detalhes suficientes para concluir com segurança:

### Infraestrutura e plataforma

- ambiente de cloud utilizado;
- provedores de cloud;
- uso de contêineres ou Kubernetes;
- topologia de servidores;
- redes, sub-redes ou conectividade;
- balanceamento de carga;
- alta disponibilidade;
- disaster recovery;
- backups;
- persistência dos “buzones”.

### Segurança

- protocolo de autenticação;
- modelo de autorização;
- gestão de credenciais;
- segregação por tenant;
- criptografia em trânsito e em repouso;
- auditoria;
- retenção de logs;
- gestão de chaves;
- políticas de acesso a APIs.

### Engenharia e operação

- linguagem de programação da solução;
- framework utilizado;
- processo de CI/CD;
- estratégia de testes;
- gestão de versões de contratos;
- modelo de observabilidade;
- métricas de desempenho;
- SLAs e SLOs;
- processo de incidentes;
- responsabilidades de suporte de primeiro, segundo e terceiro níveis.

### Negócio

- retorno financeiro das implantações;
- redução medida de tempo de integração;
- redução medida de erros;
- quantidade de consumidores por país;
- volume de apólices emitidas;
- custo de implantação;
- critérios para priorizar novos ramos ou países.

---

## 27. Conclusões

A reunião apresenta as APIs de Canal como uma estratégia para tornar a integração de emissão no core TRON mais acessível, mais orientada ao negócio e menos dependente do conhecimento técnico interno do core.

A API Edge continua sendo uma peça central e ampla, com centenas de operações, mas é caracterizada como técnica e complexa para uso direto por canais externos. A API Business e as APIs de Canal funcionam como camadas de mediação que isolam o consumidor externo de estruturas, códigos e regras internas de TRON.

O valor da proposta está em combinar:

- contratos simples e específicos por canal;
- linguagem de negócio;
- validação antecipada;
- preenchimento interno de dados obrigatórios;
- identificação segura do canal via API Gateway;
- reutilização da lógica de emissão;
- possibilidade de extensão local;
- apoio corporativo para implantação e autonomia progressiva dos países.

A implantação na República Dominicana é apresentada como a principal evidência prática do modelo, com cinco ramos, doze operações e duas semanas de trabalho declaradas. Ao mesmo tempo, a sessão deixa claro que a adoção não é totalmente automática: requer definição funcional do ramo, entendimento do canal, configuração, modelagem do contrato, possível extensão local e atenção à versão do ambiente.

A direção recomendada para novas integrações externas é explícita: evitar, quando possível, a integração direta dos canais com a API Edge de TRON e privilegiar APIs de negócio e APIs de Canal construídas sobre o módulo preconstruído.
