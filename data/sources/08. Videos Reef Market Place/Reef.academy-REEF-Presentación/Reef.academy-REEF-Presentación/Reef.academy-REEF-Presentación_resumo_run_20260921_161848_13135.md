# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.academy-REEF-Presentación.mp4`
**Data de processamento:** 21/09/2026 16:27:26
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise Estruturada — Apresentação da Plataforma RIF

> **Base documental:** esta análise foi produzida exclusivamente a partir da transcrição fornecida.  
> **Rastreabilidade:** a transcrição não contém timestamps, identificação formal de todos os participantes nem os slides apresentados; por isso, as referências são feitas pelo contexto das falas.  
> **Terminologia:** há sinais claros de reconhecimento automático de voz. Termos como “Tron”, “RIF”, “Duke/DOPE”, “RTE”, “FIS”, “DIN”, “RIF Consig” e alguns nomes de produtos foram preservados conforme o contexto. Quando a nomenclatura não é totalmente segura, a incerteza é indicada.

---

## 1. Síntese executiva

A sessão apresentou a **RIF**, descrita como uma plataforma de seguros aberta, operada como serviço e criada para enfrentar limitações históricas da distribuição descentralizada do sistema **Tron** — também referido como “Tronador”, “Tron 2000”, “Tron Web” e “New Tron” na transcrição.

O problema central relatado é que o Tron foi distribuído como múltiplas cópias instaladas localmente nos países. Esse modelo permitiu adaptações locais, mas produziu dispersão do núcleo do sistema, personalizações extensas, diferentes ritmos de atualização, dificuldades de suporte, riscos de obsolescência e barreiras à reutilização de capacidades entre países.

A RIF é apresentada como uma mudança de modelo: em vez de apenas distribuir software para instalação e alteração local, busca-se disponibilizar capacidades seguradoras centralmente, com um **core administrado**, componentes globais, APIs, microserviços, gestão de eventos, governança, catálogo de serviços e um marketplace funcional de soluções reutilizáveis.

A plataforma não é descrita como uma instalação única e universal. Há mais de uma instância de RIF, definidas conforme necessidades como região e volume de negócio. Foram mencionadas, em particular, uma instância para a América Central — já utilizada no Panamá — e outra relacionada ao projeto de Vida no Uruguai.

Além da transformação tecnológica, a apresentação descreve uma transformação operacional e organizacional: equipes estáveis e multidisciplinares orientadas a produtos, comunidades transversais de arquitetura, infraestrutura, segurança, cloud e FinOps, planejamento por backlog e sprints, governança central e repartição explícita de responsabilidades entre áreas corporativas, regionais e locais.

---

## 2. Contexto e antecedentes

### 2.1. Evolução do sistema de origem

A apresentação posiciona a RIF como continuidade de uma trajetória de evolução do sistema Tron. Foram citadas diferentes denominações ou fases:

- Tronador;
- Tron 2000;
- Tron Web;
- New Tron;
- o core atual associado à RIF.

A transcrição não explica tecnicamente as diferenças entre cada uma dessas versões. O ponto relevante é que o Tron é apresentado como uma solução amplamente distribuída pela organização, com instalações em diversos países e diferentes níveis de atualização.

### 2.2. Modelo anterior de distribuição

O funcionamento histórico descrito consiste no envio de cópias do software para instalação nos países. Cada país instala e opera sua própria versão, podendo realizar alterações locais.

Segundo a apresentação, esse modelo trouxe autonomia, mas também introduziu problemas estruturais:

```text
Distribuição de cópias locais do software
↓
Instalações independentes por país
↓
Alterações e personalizações locais, inclusive no núcleo
↓
Divergência entre versões e configurações
↓
Atualizações, suporte e reutilização mais difíceis
↓
Necessidade de uma plataforma governada e operada como serviço
```

### 2.3. Alcance internacional do Tron

Foi mencionado que o sistema está distribuído mundialmente e que coexistem versões muito antigas e versões recentes, sendo o México citado como exemplo de instalação recente.

Também foi citado que as Filipinas, embora já não façam parte da organização segundo a fala, ainda mantêm suporte relacionado ao Tron. A transcrição não detalha o formato, o escopo ou as condições desse suporte.

---

## 3. Problemas identificados

## 3.1. Descentralização operacional

O primeiro problema apontado é a descentralização do modelo de instalação. Ao haver cópias independentes em diversos países, cada instalação passa a ter seu próprio ciclo de operação, evolução e atualização.

### Consequências relatadas

- diferentes versões do sistema em uso;
- ritmos distintos de atualização;
- dificuldade para levar novas capacidades a todos os países;
- suporte mais complexo;
- menor padronização operacional.

A apresentação menciona “23 cópias do programa”. Esse número deve ser entendido como declarado durante a sessão, sem evidência externa de auditoria ou atualização posterior.

---

## 3.2. Alterações no núcleo e dispersão

Foi destacado que as instalações locais puderam ser modificadas, inclusive em elementos considerados parte do núcleo do sistema e que, idealmente, não deveriam ser alterados.

A apresentação chama esse fenômeno de **dispersão**: alterações locais em componentes centrais provocam divergência entre as instalações, tornando mais difícil manter uma base comum.

### Consequência de negócio e tecnologia

A dispersão reduz a capacidade de reutilizar soluções. Mesmo quando uma melhoria é desenvolvida em um país, pode não ser simples transferi-la para outro, pois os ambientes podem ter estruturas, versões e personalizações incompatíveis.

---

## 3.3. Atualizações lentas e heterogêneas

A atualização de cada instalação depende das necessidades, capacidades e prioridades locais. Isso faz com que a adoção de versões mais recentes seja desigual.

A apresentação associa esse cenário a ciclos longos para atualização do sistema e a uma maior dificuldade para garantir que o núcleo evolua de forma consistente em todos os países.

---

## 3.4. Personalização intensa

A forte personalização foi apresentada como uma característica recorrente das instalações do Tron.

Embora a personalização possa responder a necessidades locais, a apresentação aponta um efeito negativo: quanto maior a distância entre uma instalação local e uma base comum, mais difícil se torna:

- aplicar melhorias;
- migrar funcionalidades;
- reutilizar produtos;
- integrar novos componentes;
- reduzir esforço de suporte;
- elevar versões sem impacto significativo.

---

## 3.5. Reutilização insuficiente

Foi relatado que, embora os países compartilhem o Tron como base comum, o modelo anterior não favorece a reutilização de capacidades na intensidade desejada.

Os exemplos de capacidades reutilizáveis mencionados incluem:

- produtos de seguros;
- soluções de atendimento ao cliente;
- autosserviços;
- portais;
- automação de tarefas;
- funcionalidades de conectividade;
- componentes de cotação, emissão, subscrição e documentos.

A necessidade implícita é evitar que uma solução financiada e desenvolvida por um país precise ser recriada por outro.

---

## 3.6. Obsolescência e segurança

A existência de múltiplas cópias do sistema é associada a um aumento de exposição a obsolescência e temas de segurança.

A fala sugere a seguinte lógica:

```text
Múltiplas cópias do sistema
↓
Múltiplos ciclos de atualização e múltiplas variações técnicas
↓
Mais possibilidades de versões defasadas
↓
Maior dificuldade de controle de segurança e obsolescência
```

A reunião não detalha vulnerabilidades específicas, incidentes, tecnologias de segurança, processos de IAM, requisitos regulatórios ou métricas de risco.

---

## 4. Necessidades que motivaram a iniciativa

A apresentação descreve necessidades comuns aos países e à operação de seguros:

- incorporar rapidamente novos serviços e capacidades;
- reutilizar produtos entre países;
- disponibilizar soluções de cliente e autosserviço;
- acelerar automação;
- abrir o core para conexão com ecossistemas;
- reduzir obsolescência;
- melhorar governança;
- tornar atualizações e suporte mais gerenciáveis;
- evitar duplicação de desenvolvimento.

A RIF é posicionada como resposta a essas necessidades, não apenas como uma evolução técnica do Tron.

---

## 5. Solução apresentada: RIF

## 5.1. Conceito central

A RIF é apresentada como uma **plataforma de seguros operada como serviço**.

A expansão do acrônimo foi registrada na transcrição como:

> **MAPRE Open Insurers Platform**

Há indícios de possível erro de reconhecimento no nome da organização, pois o restante da transcrição se refere a “Mafre”. Por fidelidade ao conteúdo, a sigla é preservada como registrada.

A ideia central é concentrar e administrar capacidades seguradoras como uma plataforma. Essas capacidades podem ser utilizadas diretamente ou acessadas por APIs.

## 5.2. Objetivo da plataforma

A plataforma busca permitir que capacidades funcionais e técnicas sejam consumidas de maneira mais padronizada, integrada e governada.

A proposta pode ser reconstruída da seguinte forma:

```text
Capacidades seguradoras centralizadas e administradas
↓
Serviços e componentes acessíveis pela plataforma ou por APIs
↓
Integração com ambientes e sistemas locais
↓
Reutilização entre países
↓
Menor duplicidade de desenvolvimento e menor dispersão
```

## 5.3. Origem estratégica

A RIF foi apresentada como iniciativa nascida no plano estratégico de 2022, no período 2022–2024, e como um objetivo estratégico recente.

A reunião não detalha:

- a formulação integral do plano estratégico;
- patrocinadores executivos;
- orçamento;
- metas financeiras formais;
- marcos de aprovação;
- critérios de priorização entre países.

---

## 6. Arquitetura e funcionamento lógico

> O desenho abaixo é uma **consolidação analítica** baseada na apresentação verbal. Não corresponde necessariamente a um diagrama literal ou completo dos slides.

```text
Canais e soluções de consumo
- Cotizadores
- Emissores
- Autosserviços
- Portais
- Sistemas locais
- Soluções do marketplace
        ↓
Camada de integração
- APIs
- Gestor de eventos
        ↓
Plataforma RIF
- Core baseado no Tron
- Frontais associados
- Configuração de produtos
- Processos de emissão
- Sinistros comuns
- Tesouraria
        ↓
Serviços e componentes globais
- Gestão documental
- Produção documental
- BPM
- Motores de regras
- Dados de clientes
- Microserviços de cotação
- Microserviços de subscrição
- Motor de cálculo
- Componentes de pricing
        ↓
Integrações
- Sistemas locais
- Sistemas administrativos e contábeis
- Portais de agentes
- Outros sistemas internos e externos
```

## 6.1. Core da RIF

O core da RIF é descrito como o Tron colocado na nuvem e administrado centralmente.

Foram atribuídas ao núcleo as seguintes capacidades:

- configuração de produtos;
- processos de emissão;
- processos comuns de sinistros;
- tesouraria;
- serviços de API;
- frontal e componentes associados.

A transcrição não permite concluir:

- qual provedor de nuvem é utilizado;
- como ocorre a segregação entre instâncias;
- qual banco de dados suporta o core;
- se há arquitetura de microsserviços para o core;
- se existe contêiner, Kubernetes ou outro orquestrador;
- como são implementados alta disponibilidade, recuperação de desastre ou backup.

---

## 6.2. Componentes globais

Além do core, a RIF reúne soluções globais e serviços complementares. Foram citados:

- autosserviços;
- cotizadores;
- emissores;
- gestão documental;
- BPM;
- motores de regras;
- gestores de eventos;
- dados de clientes;
- microserviços de cotação;
- microserviços de subscrição de risco;
- marketplace funcional.

A apresentação reforça que o ecossistema não é estático: novos componentes podem ser incorporados progressivamente.

---

## 6.3. Princípio de modularidade

Um ponto importante é que nem todo consumo precisa envolver a adoção completa do core da RIF.

Foi explicitado que um país pode utilizar uma solução do marketplace sem ter o core RIF implementado. Isso sugere um modelo em que determinados componentes podem ser consumidos separadamente, desde que a integração seja viável.

> **Leitura analítica:** a arquitetura e o modelo de serviço apontam para uma estratégia de adoção gradual. Em vez de exigir uma migração completa para gerar valor, a organização busca viabilizar a adoção de capacidades específicas via integração.

Essa leitura é uma inferência sustentada pelas falas, não uma declaração literal de uma estratégia formal de migração.

---

## 7. Componentes mencionados

## 7.1. DOPE / “Duke”

A transcrição apresenta um componente chamado **DOPE**, expandido como:

> Dynamic Underwriting and Pricing

Também há trechos em que o termo aparece como “Duke”, provavelmente por erro de reconhecimento automático de voz.

### Finalidade descrita

- aplicar correções a tarifas;
- operar conforme regras de negócio;
- evitar descontos excessivos;
- apoiar cálculo para subscrição;
- ser utilizado no contexto de Vida.

A transcrição não detalha:

- regras específicas de underwriting;
- modelos de risco;
- fontes de dados;
- algoritmo de precificação;
- governança das regras;
- responsáveis por configurar ou aprovar alterações.

---

## 7.2. Cotizador

O cotizador é descrito como um frontal web conectado aos serviços necessários para realizar cotações.

Também foi explicado que ele pode funcionar de forma independente ou “standalone”, com tarifas carregadas conforme o produto, utilizando componentes como o RTE.

### Pontos importantes

- pode ser consumido sem necessariamente adotar todo o core RIF;
- pode chamar APIs e retornar o resultado completo da cotação;
- sua adoção depende da análise de compatibilidade com cada ambiente;
- um upgrade ou nivelamento do Tron não conecta automaticamente um país à RIF;
- personalizações locais podem impedir ou dificultar o reuso direto de produtos e funcionalidades.

---

## 7.3. OpenText Documentum

A transcrição menciona **OpenText Documentum**, embora o reconhecimento de voz registre formas como “Open Test Documentum”.

### Finalidade descrita

- gestão documental;
- armazenamento de documentos;
- manutenção do mapa documental;
- integração com o core RIF;
- centralização de informações associadas a documentos produzidos ou recebidos pela operação.

A reunião não detalha:

- modelo de retenção documental;
- busca e indexação;
- segurança documental;
- políticas de acesso;
- integração técnica específica;
- requisitos de auditoria ou conformidade.

---

## 7.4. RTE / Rate Engine

O **RTE**, descrito como *Rate Engine*, é apresentado como um microserviço independente do processo principal, voltado à execução de cálculos fora do core.

### Finalidade descrita

- executar cálculos de forma independente;
- servir conectores e cotizadores;
- desacoplar a lógica de cálculo do core;
- apoiar a cotação e produtos relacionados.

> **Leitura analítica:** a existência de um motor de cálculo independente indica uma tentativa de separar capacidades de precificação ou cálculo da operação transacional principal. A reunião não especifica o grau de independência técnica, o modelo de deploy nem o contrato das APIs.

---

## 7.5. FIS

O **FIS** é apresentado como ferramenta de geração de documentos.

### Exemplos de documentos citados

- formulários;
- condições particulares;
- contratos;
- faturas.

A apresentação não esclarece o significado da sigla FIS, a tecnologia usada, nem se os documentos são produzidos de forma síncrona ou assíncrona.

---

## 7.6. Gestor de eventos

O gestor de eventos é descrito como componente importante para facilitar integração com sistemas internos e externos à RIF.

Também foi indicado que todas as integrações devem ocorrer por APIs ou pelo gestor de eventos, e não por mecanismos de acesso direto ao banco.

### Papel arquitetural descrito

- comunicar módulos;
- facilitar integração;
- favorecer desacoplamento;
- receber e distribuir eventos, por exemplo de criação ou alteração de clientes;
- apoiar funcionalidades como a ficha de clientes 360.

A transcrição não informa:

- produto ou tecnologia de mensageria;
- garantias de entrega;
- ordenação de eventos;
- retenção;
- observabilidade;
- tratamento de falhas;
- padrões de eventos ou esquema de dados.

---

## 7.7. Ficha de clientes 360

A ficha de clientes 360 foi mencionada como uma capacidade que pode receber eventos, como:

- novo cliente;
- modificação de cliente.

A partir desses eventos, a solução “vai bebendo” as informações, conforme a expressão usada na apresentação.

A transcrição sugere que essa solução pode ser utilizada por países que publiquem os eventos necessários, mesmo sem implantar o core RIF.

---

## 7.8. Módulo de gestão de inadimplência

Foi mencionado um módulo ou capacidade de gestão de inadimplência, também referido como “impagos”.

Segundo a apresentação:

- novas funcionalidades como gestão de inadimplência passam a ser criadas para conexão nativa com RIF;
- a solução pode ser acessada por APIs;
- pode ser utilizada por países que não estejam no roadmap de implantação do core RIF, desde que a integração seja viável.

A reunião não detalha regras de cobrança, processos de recuperação, integrações financeiras ou cobertura funcional exata do módulo.

---

## 7.9. BPM / DIN

Foi mencionado BPM e uma solução chamada “DIN”, com indicação de que o BPM é conectado à RIF.

A transcrição não permite confirmar a grafia ou expansão de “DIN”, nem detalha os processos de negócio modelados nessa ferramenta.

---

## 8. Modelo de integração

## 8.1. Integração por APIs e eventos

Um princípio foi explicitamente reforçado:

> Todas as integrações devem ocorrer por API ou pelo gestor de eventos.

Também foi declarado que não há uso de:

- database link;
- outras conexões diretas não declaradas entre bancos.

A intenção declarada é preservar o isolamento do módulo RIF.

```text
Sistema local ou canal
↓
API e/ou eventos publicados
↓
RIF e seus componentes
↓
Resposta, processo, documento, cálculo ou dado integrado
```

## 8.2. Isolamento e desacoplamento

A apresentação relaciona o gestor de eventos ao desacoplamento entre módulos.

> **Leitura analítica:** a proibição de integrações diretas por banco, somada ao uso de APIs e eventos, indica uma direção arquitetural de maior encapsulamento dos componentes e redução de dependências técnicas diretas.

A reunião não informa se todos os sistemas legados já aderem a esse padrão nem como exceções são tratadas.

---

## 8.3. Integrações do Uruguai

No caso de Vida no Uruguai, foram mencionadas integrações com:

- sincronização de terceiros;
- processos administrativos e contábeis;
- portal de agentes;
- “S400” — nome preservado conforme a transcrição;
- web services para manter sincronizados:
  - cobranças;
  - consultas;
  - ordem de pagamento;
  - outros processos não especificados.

A transcrição não detalha contratos de API, sistemas de origem, sentido de cada fluxo, frequência de sincronização ou mecanismos de reconciliação.

---

## 8.4. Integrações da América Central

No caso da América Central, foi relatado que a instância já possui diversas integrações com o país, algumas consideradas complexas.

Foram citados:

- serviços de gestão documental;
- produção e armazenamento de documentos;
- conexão com o gestor de eventos;
- integração com sistemas locais;
- APIs de convivência — expressão preservada como registrada;
- possibilidade futura de ativar ficha de clientes 360 e gestão de inadimplência.

---

## 9. Modelo operacional

## 9.1. Necessidade de governança operacional

A apresentação defende que uma plataforma prestada como serviço exige um modelo de governo para garantir operação consistente e adequada.

Os objetivos declarados incluem:

- garantir a operação dos serviços;
- definir procedimentos;
- estabelecer práticas de versionamento;
- orientar regularização de dados;
- organizar a gestão de incidentes;
- esclarecer como incidentes e evolutivos entram, são tratados e acompanhados;
- controlar custos;
- expandir cobertura funcional;
- definir responsabilidades entre corporação, região e país.

---

## 9.2. Procedimentos operacionais citados

Foram mencionados procedimentos publicados ou em desenvolvimento para orientar a operação da plataforma, incluindo:

- releases;
- patches;
- hotfixes do Tron;
- regularização de dados;
- catalogação de ativos no marketplace;
- gestão de incidentes;
- gestão de evolutivos;
- instalação de versões;
- gestão de software de produto;
- gestão de software personalizado.

A apresentação afirma que esses procedimentos são compartilhados com os participantes, mas a transcrição não inclui os documentos, seus conteúdos ou links verificáveis.

---

## 9.3. Suporte e responsabilidades

Foram mencionadas responsabilidades distribuídas entre áreas corporativas, regionais e locais.

### Serviços associados ao software de produto

- desenvolvimento;
- documentação;
- garantia de qualidade;
- geração de releases;
- suporte;
- instalação de versões.

### Serviços associados ao software personalizado

- adaptação a necessidades locais ou regionais;
- integrações com sistemas locais;
- desenvolvimento de personalizações;
- configuração de produtos;
- garantia de qualidade;
- releases de software local.

### Operação e plataforma

- gestão de infraestrutura;
- observabilidade;
- monitoramento;
- controle da dispersão;
- atualização de software;
- segurança;
- desastre/recovery — a transcrição apresenta trecho pouco claro, possivelmente relacionado a continuidade ou recuperação de desastre;
- exploração operacional;
- atendimento via Service Desk;
- suporte funcional de nível 1 e nível 2 local ou regional;
- suporte corporativo ao core;
- deploy do core e do software local.

A reunião não define claramente quais responsabilidades pertencem a cada entidade para todos os cenários. Ela informa que uma matriz de responsabilidades existe ou está sendo construída, mas não reproduz integralmente seu conteúdo.

---

## 10. Governança

## 10.1. Finalidade da governança

A governança é apresentada como condição necessária para que a RIF opere como uma plataforma de serviços.

Os cinco motivos mais enfatizados foram:

1. garantir operação coerente dos serviços;
2. estabelecer procedimentos;
3. controlar e otimizar custos;
4. ampliar a cobertura funcional;
5. distribuir responsabilidades entre corporação, regiões e países.

---

## 10.2. FinOps

Foi citado **FinOps** como parte do modelo de governo.

A finalidade apresentada é:

- conhecer os custos dos componentes;
- acompanhar esses custos;
- tornar o consumo eficiente;
- evitar custos sem controle;
- ajustar custo à necessidade efetivamente atendida.

A transcrição não descreve modelo de cobrança, alocação de custos, métricas, rateio, orçamento, limites de consumo ou ferramentas de FinOps.

---

## 10.3. Órgão de governo: “RIF Consig”

Foi mencionado um comitê chamado “RIF Consig” — grafia incerta devido à transcrição — descrito como o órgão máximo de governo da RIF.

### Responsabilidades atribuídas

- definir visão;
- definir estratégia;
- definir roadmap;
- orientar expansão para países;
- estabelecer objetivos;
- definir *key results*;
- estabelecer políticas;
- promover melhores práticas;
- garantir boa operação da plataforma.

A fala também relaciona os *key results* aos “OCRs”, provavelmente uma referência a OKRs, mas essa correção não pode ser afirmada com total segurança. A transcrição registra “OCRs”.

---

## 10.4. Gestão da RIF

Foi mencionado um **RIF Manager**, identificado como José de Abreu — a transcrição também registra “José de Abril” em outro trecho, possivelmente por erro de reconhecimento.

A função foi apresentada como posição acima das equipes de produto e comunidades, dentro da estrutura organizacional da RIF.

---

## 11. Organização das equipes e modelo de produto

## 11.1. Mudança para uma organização orientada a produto

A RIF foi apresentada como uma iniciativa que também altera a forma de trabalho. Em vez de organizar a atividade apenas por projetos pontuais, busca-se operar por produtos oferecidos na plataforma.

Exemplos de produtos citados:

- produto de gestão documental;
- produto de APIs;
- produto de Vida.

## 11.2. Características das equipes

As equipes são descritas como:

- estáveis;
- autônomas;
- multidisciplinares;
- multinacionais;
- responsáveis por produtos específicos.

Também foram mencionadas comunidades transversais de:

- transformação;
- arquitetura;
- segurança;
- infraestrutura;
- FinOps;
- cloud.

Essas comunidades apoiam os times de produto e trabalham de forma transversal.

## 11.3. Papéis citados

Foram mencionados:

- Product Manager;
- Product Owner;
- Scrum Master — transcrito como “ExoMaster” em um trecho;
- áreas de negócio;
- equipes de produto;
- comunidades transversais.

O negócio é apresentado como participante da criação e evolução dos produtos.

## 11.4. Backlog, sprints e entregas

O modelo operacional inclui:

- backlog único;
- planejamento de curto prazo;
- entregas contínuas;
- sprints de aproximadamente três semanas;
- eventos diários;
- retrospectivas ao fim de cada sprint;
- acompanhamento da evolução da atividade.

A mensagem central é que o modelo busca concentrar o trabalho na entrega de valor do produto.

---

## 12. Números e indicadores citados

> Os valores abaixo foram declarados durante a apresentação e refletem o momento da coleta relatado. Não há evidência na transcrição de validação externa ou atualização posterior.

| Indicador | Valor mencionado | Contexto |
|---|---:|---|
| Período de trabalho orientado a produto | De dezembro de 2021 até 3 de outubro | Período usado na apresentação para consolidar números |
| Tempo de existência referido | Quase 2 anos | Momento da medição apresentada |
| Equipes entre produtos, comunidades e suporte | 16 | Estrutura de trabalho da RIF |
| Pessoas com tarefas atribuídas | Cerca de 59 | Capacidade reportada |
| Épicos | 169 | Volume de trabalho mencionado |
| Compromissos estratégicos | 27 | Total reportado |
| Compromissos a resolver no restante do ano | 13 | Meta declarada para o período |
| Histórias de usuário concluídas | Cerca de 1.800 | Acumulado citado |
| Pilotos de equipes orientadas a produto | 4 | Experiência organizacional mencionada |
| Sprints principais em paralelo | 2 | Vida e “o restante” |
| Story points médios por sprint | 680 | Valor declarado |
| Story points realizados por sprint | Cerca de 420 | Média declarada |
| Soluções no marketplace | 22 | Quantidade disponível no momento da apresentação |
| Novas soluções pretendidas até o fim do ano | 5 ou 6 | Intenção declarada |
| Crescimento de soluções no ano | 20 soluções | Meta ou expectativa apresentada |
| Países da América Central no plano | 6 | Honduras, Nicarágua, Costa Rica, El Salvador, Guatemala e Panamá |
| Produtos previstos para América Central | 10 | Horizonte de quatro anos |
| Redução de recorrentes esperada em 2028 | Cerca de € 1,2 milhão | Associada à eliminação de sistemas, conforme fala |
| Instâncias RIF existentes | 2 | América Central e Vida/Uruguai |

Há possível tensão entre o dado de “680 story points de média por sprint” e “420 story points feitos por sprint”, mas a apresentação não explica se representam capacidade planejada, volume comprometido, realizado ou métricas diferentes.

---

## 13. Marketplace e reutilização

## 13.1. Finalidade

O marketplace é apresentado como o local onde soluções se tornam visíveis e disponíveis para consumo por outras áreas ou países.

Não se limita ao core. Inclui satélites e soluções funcionais já existentes, aprovadas e em uso.

### Objetivos declarados

- tornar soluções existentes descobertas e reutilizáveis;
- reduzir custos;
- evitar desenvolvimento duplicado;
- reduzir dispersão;
- permitir que países encontrem capacidades já disponíveis;
- facilitar contato com responsáveis pelas soluções.

## 13.2. Conteúdo de cada solução

Segundo a apresentação, cada item do marketplace pode conter:

- vídeo de apresentação;
- descrição funcional;
- descrição de integração;
- informações sobre consumo econômico;
- pessoa de contato;
- informações adicionais de operação.

## 13.3. Atualização do marketplace

Foi informado que são publicadas notícias a cada duas semanas na intranet sobre soluções adicionadas ao marketplace.

Também foi relatado que existem mais soluções além das 22 então publicadas, e que a expectativa era encerrar o ano com mais cinco ou seis.

## 13.4. Critério de elegibilidade

As soluções apresentadas no marketplace são descritas como:

- existentes na organização;
- aprovadas;
- em uso;
- potencialmente reutilizáveis.

A reunião não detalha o processo completo de aprovação, critérios técnicos, critérios de segurança, modelo contratual, SLA, política de versionamento ou critérios de descontinuação das soluções.

---

## 14. Casos concretos apresentados

## 14.1. América Central e Panamá

### Contexto

Foi criada uma instância RIF para a América Central, já utilizada no Panamá.

### Capacidades relatadas

- conexão com diversas integrações locais;
- gestão documental;
- produção documental;
- armazenamento documental;
- conexão com o gestor de eventos;
- possibilidade de ativação futura de ficha de clientes 360;
- possibilidade de ativação futura de módulo de gestão de inadimplência.

### Produtos

Foi citado um produto corporativo padronizado de Automóvel, com intenção de funcionar para os diferentes países da América Central.

### Limitação destacada

A limitação não é atribuída à capacidade técnica do sistema de administrar o produto, mas à necessidade de que o produto esteja realmente homologado e seja equivalente entre países.

### Integração

Foi reforçado que integrações ocorrem por APIs ou pelo gestor de eventos, sem database links ou conexões diretas por banco.

---

## 14.2. Vida no Uruguai

### Contexto

O Uruguai foi apresentado como projeto de implementação de RIF Vida. A operação deveria começar a ser gerida a partir de novembro, conforme a fala.

### Capacidades citadas

- cotizador e emissor para produto Vida Total;
- DOPE/Duke para subscrição e pricing;
- RTE para cálculos;
- produtos corporativos padronizados;
- integração com sistemas administrativos e contábeis;
- sincronização de terceiros;
- integração com portal de agentes;
- integração com “S400”;
- web services para cobranças, consultas e ordens de pagamento.

### Diferencial apresentado

No caso de Vida, o produto é definido pela área corporativa de negócio e depois adaptado para o Uruguai por meio de um subconjunto de coberturas e outros dados.

A RIF é apresentada como capaz de copiar e intercambiar produtos entre diferentes instâncias RIF.

### Limitação

Essa capacidade de copiar produtos é explicitamente associada a ambientes RIF. O apresentador afirmou que ainda não é possível fazer o mesmo diretamente para ambientes Tron em geral, devido às diferenças e personalizações existentes entre eles.

---

## 14.3. Saúde na Espanha

Foi informado que a Espanha está desenhando uma solução de Saúde e que a ACT participa dessa iniciativa com a intenção de, futuramente, incorporar a solução ao ecossistema RIF.

Foram citados como possíveis componentes:

- nomenclador;
- gestão de provedores;
- assistências;
- componentes do sistema de saúde.

A reunião não confirma que esses componentes já estejam implementados, nem apresenta prazo, arquitetura, países-alvo, modelo operacional ou decisão formal de incorporação.

---

## 15. Roadmap citado

## 15.1. América Central

O plano apresentado para a América Central inclui:

- extensão da solução aos seis países:
  - Honduras;
  - Nicarágua;
  - Costa Rica;
  - El Salvador;
  - Guatemala;
  - Panamá;
- dez produtos previstos em um horizonte de quatro anos;
- implantação de produto de Automóvel para os países;
- desenvolvimento de cotizador comum, ausente no caso inicial do Panamá;
- conexão de capacidades de BPM e BBI — a sigla BBI não foi explicada;
- aumento gradual da penetração da RIF no ramo de Automóvel;
- continuidade do roadmap durante 2024, com sequência já considerada relativamente clara na fala.

Também foi mencionada expectativa de, em 2028, com eliminação de sistemas, obter redução de recorrentes de aproximadamente € 1,2 milhão.

A transcrição não detalha o cálculo dessa economia, os sistemas a eliminar, custos atuais, premissas ou responsáveis.

---

## 15.2. Vida

Para Vida, foram mencionadas as seguintes direções:

- início do MVP de Vida Total no Uruguai no mês de novembro;
- expansão de capacidades globais;
- desenvolvimento de suplementos especializados;
- desenvolvimento de outros produtos;
- manutenção de produtos padronizados no nível corporativo;
- possibilidade de customização nos países;
- manutenção de frontal web de cotação integrado à plataforma;
- continuidade do roadmap de Vida;
- avaliação dos produtos de Vida existentes no México;
- eventual expansão para outros países, incluindo novamente a América Central.

A reunião não informa o ano absoluto associado a “próximo novembro” nem detalha o escopo funcional do MVP de Vida Total.

---

## 15.3. Marketplace

O roadmap do marketplace inclui expansão contínua das soluções publicadas, com uma meta mencionada de crescimento no ano e expectativa de novas publicações até o fim do período.

---

## 16. Perguntas e respostas

## 16.1. Pergunta: como países fora do roadmap, como Porto Rico, podem participar?

### O que foi perguntado

Um participante perguntou se havia planos futuros para países ainda não incluídos no roadmap, usando Porto Rico como exemplo.

### Resposta dada

A resposta enfatizou que a RIF não é apenas o core. Países fora do roadmap podem utilizar soluções do marketplace, inclusive componentes que se conectam por API a outros cores.

Foi reconhecido que o Tron de Porto Rico é muito disperso. O apresentador declarou não poder garantir integração com a versão local do Tron, mas afirmou que soluções como DOPE/Duke, gestão de inadimplência e ficha de clientes 360 podem ser conectadas via API.

### O que isso esclarece

- estar fora do roadmap do core não impede necessariamente o consumo de serviços;
- a reutilização depende de integração e compatibilidade;
- a dispersão local pode limitar ou dificultar a adoção;
- a estratégia é permitir adoção de capacidades pontuais, não apenas implantação integral da RIF.

---

## 16.2. Pergunta: após nivelar o Tron, é possível utilizar o cotizador RIF com os produtos existentes?

### O que foi perguntado

O participante perguntou se, após nivelar o Tron e instalar componentes base da RIF, seria possível usar um cotizador RIF sem grande desenvolvimento, calculando prêmios para produtos já configurados no Tron local.

### Resposta dada

A resposta afirmou que o cotizador foi construído para funcionar de forma independente, podendo receber tarifas conforme o produto e utilizar componentes como o RTE.

Entretanto, o apresentador deixou claro que a conexão com a RIF não é automática nem “mágica”. Um upgrade do Tron não garante aderência direta à RIF, pois personalizações locais podem dificultar ou impedir a reversão para um padrão comum.

Foi indicado que cada solução deve ser avaliada individualmente.

### O que isso esclarece

- o cotizador pode ser isolado e consumido como peça independente;
- a compatibilidade com produtos existentes deve ser estudada;
- o nivelamento técnico do Tron não elimina automaticamente divergências funcionais;
- a personalização histórica é um risco central para a adoção.

---

## 16.3. Pergunta: há suporte da RIF para Salesforce no controle de cotações?

### O que foi perguntado

Um participante perguntou se havia algo na RIF relacionado a Salesforce para controle de cotações, e se poderia ser utilizado independentemente.

### Resposta dada

Foi informado que a intenção é incorporar autosserviços e gestão de contact center à RIF. A ficha de clientes 360 já estaria em desenvolvimento para a República Dominicana, com intenção de incorporação à plataforma.

Quanto a Salesforce especificamente, não havia roadmap definido para aquele elemento no momento da reunião. A demanda foi anotada, e foi mencionado que existem conversas e integrações relacionadas a Salesforce e “Hennys” — nome preservado conforme a transcrição.

### O que isso esclarece

- Salesforce não foi apresentado como capacidade já disponível para esse cenário;
- há interesse em avaliar sua integração;
- a estratégia de incorporação à RIF exige possibilidade de isolar a solução e conectá-la por API;
- a resposta não representa compromisso de entrega ou prazo.

---

## 16.4. Pergunta: países de Vida podem usar serviços mesmo sem nivelar o Tron?

### O que foi perguntado

Uma participante perguntou se poderia acessar funcionalidades relevantes para Vida sem esperar sua vez no roadmap e sem nivelar o Tron, especialmente porque determinadas funcionalidades do Tron Web não são utilizadas nem altamente personalizadas localmente.

### Resposta dada

O apresentador afirmou que melhorias desenvolvidas para a RIF e incorporadas ao Tron Web devem seguir para outros países por meio de “SINs” — sigla não explicada na transcrição.

Foi explicado que a instância na nuvem recebe funcionalidades de forma mais rápida, enquanto versões distribuídas localmente podem não estar tão sincronizadas. Também foi indicado que, para utilizar certos elementos, pode ser necessário conectar-se a componentes da RIF, como o gestor de eventos.

Foi informado que a frequência de produção dos “SINs” teria mudado para trimestral.

### O que isso esclarece

- melhorias no Tron Web associadas à RIF podem ser distribuídas para outros países;
- a disponibilidade efetiva pode exigir componentes adicionais;
- há diferença entre evolução da plataforma central e atualização de instalações distribuídas;
- a capacidade de copiar produtos entre instâncias RIF não está, naquele momento, disponível para ambientes Tron em geral.

---

## 17. Limitações reconhecidas

A apresentação não foi inteiramente promocional; diversas limitações e dependências foram reconhecidas.

### 17.1. Integração não garantida com versões locais

Não foi possível garantir integração com qualquer versão local de Tron, especialmente em países com instalações muito dispersas.

### 17.2. Upgrade não significa adoção automática da RIF

Foi explicitamente dito que nivelar ou atualizar o Tron não conecta automaticamente um país à RIF.

### 17.3. Personalizações podem impedir reaproveitamento

Personalizações acumuladas ao longo dos anos podem dificultar:

- uso de produtos padronizados;
- conexão de componentes;
- reversão para arquitetura mais alinhada ao core;
- migração ou reutilização direta de capacidades.

### 17.4. Análise deve ser feita solução a solução

A possibilidade de adoção depende do componente específico, da integração necessária e da compatibilidade com o sistema local.

### 17.5. Salesforce sem roadmap confirmado

Não havia roadmap definido para a necessidade específica de controle de cotações com Salesforce.

### 17.6. Produtos padronizados exigem homologação de negócio

A dificuldade para uso regional de produtos não é apenas técnica. É necessário que os produtos sejam efetivamente homologados entre os países.

### 17.7. Marketplace não resolve automaticamente a integração

Uma solução estar disponível no marketplace não significa que sua integração com qualquer ambiente será simples ou automática.

---

## 18. Riscos e desafios

## 18.1. Riscos explicitamente mencionados

- dispersão entre instalações locais do Tron;
- alterações no núcleo;
- obsolescência;
- temas de segurança;
- dificuldade de suporte para múltiplas cópias;
- diferentes ritmos de atualização;
- personalizações que não podem ser revertidas integralmente;
- dificuldade de padronizar produtos entre países;
- dependência de integração com sistemas locais;
- ausência de roadmap para determinadas demandas específicas;
- risco de duplicidade de desenvolvimento sem marketplace e reutilização.

## 18.2. Desafios derivados do contexto

> Os pontos abaixo são análises derivadas do conjunto das falas, não declarações literais dos participantes.

### Governar diversidade sem perder aderência local

A RIF busca reduzir dispersão, mas ainda precisa atender países, produtos, integrações e necessidades regionais distintas. O desafio é equilibrar padronização e flexibilidade sem reproduzir o mesmo padrão de customizações que a plataforma pretende controlar.

### Sustentar interoperabilidade real

A estratégia de APIs e eventos depende de contratos de integração estáveis, qualidade de dados, disciplina de publicação de eventos e capacidade dos sistemas locais de aderir ao modelo.

### Transformar catálogo em adoção efetiva

O marketplace reduz a invisibilidade de soluções, mas seu resultado depende de documentação útil, modelos de custo claros, suporte, viabilidade de integração e disposição dos países para adotar componentes já existentes.

### Evidenciar ganhos econômicos e operacionais

A apresentação aponta FinOps, redução de duplicação e expectativa de redução de recorrentes. Para consolidar a transformação, será necessário demonstrar que os benefícios esperados se materializam de forma mensurável.

---

## 19. Transformações estruturais identificadas

## 19.1. Transformação tecnológica: cópias locais para plataforma administrada

A principal mudança é a passagem de um modelo baseado em distribuição de cópias do software para um modelo de plataforma centralmente administrada.

```text
Antes
Instalação local + alteração local + atualização local

Direção apresentada
Plataforma administrada + componentes reutilizáveis + integração padronizada
```

---

## 19.2. Transformação arquitetural: acesso direto e dispersão para APIs e eventos

A apresentação estabelece uma direção clara de integração por APIs e gestor de eventos, com rejeição a database links e conexões diretas entre bases.

Essa direção busca isolamento de módulos e desacoplamento entre sistemas.

---

## 19.3. Transformação operacional: software para serviço

A RIF é tratada como serviço, o que exige:

- catálogo;
- procedimentos;
- suporte;
- níveis de serviço;
- versionamento;
- observabilidade;
- controle de custos;
- divisão de responsabilidades.

---

## 19.4. Transformação organizacional: projetos para produtos

A organização orientada a produto, com equipes estáveis e backlog contínuo, representa uma mudança no modo de estruturar desenvolvimento e evolução das capacidades.

---

## 19.5. Transformação econômica: desenvolvimento isolado para reutilização

O marketplace e o modelo de consumo de componentes apontam para a redução de duplicidade e para melhor aproveitamento de investimentos realizados por países ou áreas.

---

## 20. O que a reunião não permite concluir

A apresentação fornece uma visão rica de objetivos, componentes e governança, mas não permite determinar com segurança diversos aspectos técnicos e operacionais relevantes.

Não foram detalhados:

- provedor de nuvem;
- arquitetura de infraestrutura;
- uso ou não de containers e Kubernetes;
- bancos de dados;
- topologia de rede;
- mecanismos de identidade e acesso;
- controles de segurança específicos;
- criptografia;
- segregação de dados entre países ou instâncias;
- LGPD, requisitos regulatórios ou residência de dados;
- plano de recuperação de desastre;
- RTO e RPO;
- estratégia de backup;
- ferramentas de CI/CD;
- processos de testes automatizados;
- observabilidade técnica concreta;
- ferramentas de logs, métricas e tracing;
- tecnologias usadas pelo gestor de eventos;
- padrões de mensageria;
- contratos de API;
- modelo de versionamento de APIs;
- modelo de dados comum;
- SLAs ou ANS específicos;
- modelo completo de cobrança;
- custos de adesão às soluções do marketplace;
- processo de aprovação de novas soluções;
- critérios de descontinuação;
- cronograma detalhado de todos os países;
- responsáveis por cada entrega do roadmap;
- escopo completo do MVP de Vida Total;
- definição precisa de siglas como SINs, BBI, FIS, DIN e “RIF Consig”.

---

## 21. Conclusões principais

A RIF foi apresentada como uma resposta à necessidade de superar a dispersão de instalações e personalizações do Tron, sem restringir a evolução apenas a uma substituição de sistema. O objetivo é constituir uma plataforma de seguros reutilizável, governada, integrada e operada como serviço.

O core baseado no Tron permanece central, mas a proposta é maior que o core: inclui componentes globais, APIs, eventos, documentos, motores de cálculo, capacidades de subscrição e pricing, marketplace, governança e uma nova organização orientada a produto.

A apresentação também deixa claro que a transformação não elimina automaticamente as dificuldades históricas. Aderir à RIF depende de compatibilidade, integração, padronização de produtos e análise das personalizações existentes em cada país.

O marketplace emerge como instrumento prático para ampliar adoção gradual: mesmo países fora do roadmap do core podem avaliar e consumir capacidades específicas, desde que possam integrá-las adequadamente.

Por fim, a iniciativa representa uma direção de longo prazo: reduzir desenvolvimento duplicado, aumentar reutilização, centralizar governança e tornar a evolução das capacidades seguradoras mais sustentável entre países, regiões e áreas corporativas.
