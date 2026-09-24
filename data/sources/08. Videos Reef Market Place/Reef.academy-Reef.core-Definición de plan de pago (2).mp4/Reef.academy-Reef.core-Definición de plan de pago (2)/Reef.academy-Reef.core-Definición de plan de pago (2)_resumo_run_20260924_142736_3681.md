# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef.academy-Reef.core-Definición de plan de pago (2).mp4`
**Data de processamento:** 24/09/2026 14:35:42
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Relatório Técnico-Funcional Multimodal — REEF PaaS / MAPFRE

> **Base de evidências e método.** Elaborado exclusivamente a partir da transcrição Whisper e dos Frames 01–12 fornecidos. Frames 01–02 são videoconferência/transição e foram filtrados. Nomes foneticamente degradados foram normalizados apenas quando confirmados visualmente: “RIF/risk” refere-se contextualmente a **REEF**; “Tronador” a **TRON**. Lacunas permanecem declaradas.
>
> **Níveis de afirmação.** Informações faladas ou visíveis são fatos da sessão. Organização didática é explicação contextual. Conclusões derivadas são marcadas como **Análise**.

---

## 1. Síntese executiva

A reunião apresenta o **REEF** como plataforma de soluções seguradoras em modalidade *as a Service* para companhias MAPFRE. A iniciativa responde à distribuição descentralizada do TRON: cópias instaladas em países, versões diferentes, customizações locais — inclusive em núcleo —, baixa reutilização, suporte complexo, obsolescência e segurança.

A solução reúne Core baseado em TRON, soluções globais, microserviços, Marketplace e modelo de governo. Países podem consumir capacidades diretamente na plataforma ou conectá-las a sistemas locais por APIs. [Evidência Visual: Frame 06 @ 20:20]

A mensagem executiva é substituir evolução isolada de cópias locais por uma plataforma governada e reutilizável. A fala cita América Central/Panamá, Vida no Uruguai, evolução regional de Automóveis e expansão de Vida, Saúde e Marketplace.

---

## 2. Contexto e antecedentes

O TRON é descrito como sistema distribuído mundialmente na MAPFRE. Países recebem cópias e as instalam localmente. Essa descentralização permitiu alterações no pacote, até em partes de núcleo que não deveriam ser tocadas; o apresentador chama o efeito de **dispersão**.

A atualização depende da necessidade, capacidade e momento de cada país, resultando em versões antigas e recentes — México é exemplo de instalação recente. Filipinas é citado como país já fora da MAPFRE, mas ainda com TRON e suporte. A fala menciona cerca de 23 cópias do programa, dificultando suporte e reutilização.

O slide de necessidades consolida a motivação: incorporar rapidamente produtos, autosserviços, Quote&Buy, apps, automação e conectividade por API, enfrentando obsolescência e segurança. [Evidência Visual: Frame 05 @ 16:58]

---

## 3. Problemas e necessidades identificados

### 3.1. Cópias descentralizadas de TRON

**Problema.** Cada país instala sua própria cópia. **Impacto.** Evolução e suporte atendem instalações heterogêneas. **Prioridade.** Reduzir evolução isolada sustenta a criação do REEF.

### 3.2. Dispersão por alteração do núcleo

**Problema.** Pacotes locais podem alterar componentes de núcleo. **Impacto.** Diminui reutilização e dificulta governo de versões. **Prioridade.** A plataforma pretende manter base mais controlada.

### 3.3. Entrega lenta de capacidades de negócio

**Problema.** Países demandam produtos, canais digitais, automação e integrações rapidamente. **Impacto.** Soluções financiadas por um país não chegam facilmente a outros. **Prioridade.** REEF disponibiliza capacidades como serviço. [Evidência Visual: Frame 05 @ 16:58]

### 3.4. Obsolescência e segurança

**Problema.** Múltiplas cópias ampliam desafios de atualização e segurança. **Impacto.** Não são apresentados incidentes ou métricas. **Prioridade.** Gestão centralizada é parte da resposta declarada.

### 3.5. Duplicação e invisibilidade de soluções

**Problema.** Capacidades existentes podem não ser conhecidas por outras unidades. **Impacto.** Desenvolvimento duplicado, custo e dispersão. **Prioridade.** Marketplace reúne soluções aprovadas/em uso, com documentação e integração.

---

## 4. Solução apresentada: visão conceitual

REEF é a plataforma que permite às seguradoras MAPFRE consumir soluções seguradoras como serviço, diretamente ou de forma “apificada” com sistemas locais. [Evidência Visual: Frame 06 @ 20:20]

A fala explica o nome como **MAPFRE Open Insurance Platform**. REEF nasce como objetivo do Plano Estratégico de TI 2022–2024, associado à Digitalização 2.0, cobertura funcional, Marketplace e governança. [Evidência Visual: Frame 06 @ 20:20]

O modelo reúne Core, serviços globais, microserviços e ativos próprios, de mercado ou Insurtech. Não exige uma única instância para toda a organização: podem existir instâncias conforme região e volumetria.

**Análise.** A proposta desloca o foco de distribuição de software para consumo governado de capacidades. A sessão não afirma migração completa de todos os países.

---

## 5. Arquitetura e funcionamento: reconstrução lógica

A arquitetura apresentada é funcional; não há provedor de nuvem, banco, rede, protocolos, autenticação ou containers identificados.

```text
Países / sistemas locais / canais digitais
        │
        ├─ Consumo direto
        └─ APIs e/ou gestor de eventos
                    │
                    ▼
             REEF PaaS / Instância REEF
 ┌────────────────────────────────────────────┐
 │ CORE TRON                                  │
 │ Produtos | Emissão | Sinistros | Administração│
 ├────────────────────────────────────────────┤
 │ Cotizador | FIS | Documentum | BPM/LowCode │
 │ DUP | RTE | microsserviços | eventos/Kafka │
 ├────────────────────────────────────────────┤
 │ Marketplace funcional                      │
 └────────────────────────────────────────────┘
                    │
                    ▼
     Sistemas locais, portais e integrações regionais
```

O Core é responsável por configuração de produtos, emissão, sinistros, administração e comuns. [Evidência Visual: Frame 07 @ 23:43] A fala diz que TRON foi colocado em nuvem e administrado, mas não detalha hospedagem ou dados.

A extensibilidade ocorre por configuração, APIs, eventos e composição de serviços. Para América Central, o apresentador declara APIs ou gestor de eventos e exclui *database links*.

---

## 6. Componentes e conceitos mencionados

### 6.1. REEF

Plataforma PaaS seguradora MAPFRE para consumo direto ou conectado. [Evidência Visual: Frame 06 @ 20:20]

### 6.2. TRON / Core REEF

Core com produtos, emissão, sinistros, administração e comuns; a fala também menciona tesouraria. Não há versão, linguagem ou modelo de dados informado. [Evidência Visual: Frame 07 @ 23:43]

### 6.3. Taller de Productos

Capacidade de configuração de produtos dentro do Core; sem interface ou regras demonstradas.

### 6.4. DUP — Dynamic Underwriting & Pricing

Ativo de subscrição e precificação dinâmica parametrizável pelo negócio. A fala o associa a correção de tarifas e uso em Vida. [Evidência Visual: Frame 08 @ 27:05]

### 6.5. RTE

Microserviço tarificador/cotizador para componentes econômicos da prima e simulações. A fala usa “Rating Engine” de forma contextual. [Evidência Visual: Frame 08 @ 27:05]

### 6.6. Cotizador

Frontal web de cotação e emissão; telas geradas segundo produto no TRON. É citado cotizador-emissor Vida Total no Uruguai; o cotizador comum de Automóveis ainda não estava no Panamá. [Evidência Visual: Frame 08 @ 27:05]

### 6.7. FIS CSF

Geração e distribuição de documentos — faturas, comunicados e contratos — a partir de modelos. [Evidência Visual: Frame 08 @ 27:05]

### 6.8. OpenText Documentum

Gestor documental corporativo: armazenamento, conservação, rastreabilidade, segurança e expurgo. [Evidência Visual: Frame 08 @ 27:05]

### 6.9. Gestor de eventos

Serviço PaaS com Kafka. Fatos de negócio são publicados e aplicações inscritas recebem notificação em tempo real. [Evidência Visual: Frame 08 @ 27:05]

### 6.10. BPM & LowCode / DIN

O diagrama lista BPM&LowCode. A fala chama a solução BPM de “DIN”, sem expansão confirmada.

### 6.11. Clientes 360º

Ficha/capacidade de cliente ativável por eventos e citada como item de Marketplace. Sem telas ou modelo de dados expostos.

### 6.12. Gestão de impagos

Módulo de inadimplência citado como integração nativa e também consumível por API por países fora do roadmap do Core.

### 6.13. Finametrix, fraude/scoring, IoT, IA, Data HUB, Analytics & BI

Capacidades rotuladas no diagrama sem funcionamento ou disponibilidade detalhados. [Evidência Visual: Frame 07 @ 23:43]

### 6.14. Marketplace

Catálogo de componentes em uso/aprovados na MAPFRE. Havia 22 soluções, com documentação, vídeo, integração, possível consumo econômico e contato.

### 6.15. Re21

Não ocorre de modo confirmável nas evidências atuais. Não é possível atribuir-lhe função de resseguro.

---

## 7. Especificação funcional das telas e interfaces (OCR & Evidências Visuais)

Os frames são slides, não telas transacionais; não mostram campos editáveis, máscaras, botões de formulário ou erros.

| Tela / slide | Conteúdo OCR | Evidência |
|---|---|---|
| Título | “Presentación Reef PaaS”, 5 outubro 2023, Reef.M/Reef.academy, MAPFRE; José De Abreu Freitas e Pilar Ruiz Martínez | Frame 03 @ 10:13 |
| Agenda | Antecedentes; PaaS; serviços; instâncias; roadmap | Frame 04 @ 13:35 |
| Necessidades | Produtos, autosserviço, Quote&Buy, apps, automação, APIs, obsolescência e segurança | Frame 05 @ 16:58 |

| Área do diagrama | Elementos visíveis |
|---|---|
| Preventa | Gestão documental, cotizador, Data HUB, IoT, IA, APIs, Analytics & BI, BPM&LowCode, tesouraria, fraude/scoring |
| Venda | No Vida / Saúde / Vida; DUP; Clientes 360º; Finametrix; RTE; impagos |
| Core | Taller de Productos; Emisión; Siniestros; Administración |
| Pós-venda | Marketplace |

[Evidência Visual: Frame 07 @ 23:43]

| Produto | Descrição confirmada |
|---|---|
| DUP | Subscrição e precificação dinâmica |
| RTE | Tarificador/cotizador para prima e simulações |
| Cotizador | Frontal de cotação/emissão segundo produto TRON |
| FIS | Documentos a partir de modelos |
| Documentum | Repositório documental |
| Gestor de eventos | Kafka para publicação/assinatura de fatos |

[Evidência Visual: Frame 08 @ 27:05]

O governo busca garantir operação e procedimentos; o Reef Council é mensal. [Evidência Visual: Frames 09 @ 30:28 e 10 @ 33:50] O slide de atividade registra 16 equipes, 59 pessoas, 169 épicas e 1,8 mil histórias concluídas. [Evidência Visual: Frame 11 @ 37:13]

---

## 8. Modelo de integração

REEF é consumível diretamente ou por APIs; o gestor de eventos usa Kafka para publicação e assinatura de fatos de negócio. [Evidência Visual: Frame 08 @ 27:05]

Na América Central, integrações são via APIs ou gestor de eventos, sem *database link*. Para o Uruguai são citadas sincronização de terceiros, integrações administrativas e contábeis, portal de agentes e serviços web de cobranças, consultas e pagamentos. “S4” aparece foneticamente na transcrição, sem expansão segura.

| Integração/capacidade | Mecanismo | Contexto |
|---|---|---|
| Sistemas locais | APIs | Consumo de capacidades REEF |
| Eventos | Kafka | Notificação em tempo real |
| América Central | APIs/eventos; sem database link | Isolamento declarado |
| Uruguai Vida | APIs, web services, sincronização | Administração, contabilidade, portal e cobranças |
| Clientes 360 | Publicação/consumo de eventos | Exemplo de desacoplamento |

Não há contratos de API, payloads, tópicos Kafka, frequência de sincronização ou SLA.

---

## 9. Modelo operacional

### 9.1. Configuração antes da operação

A operação pressupõe configurar produtos, ativar componentes aplicáveis e definir integrações locais. Vida no Uruguai reúne Vida Total, cotizador-emissor, DUP e RTE. América Central reúne integrações, gestão documental, FIS, Documentum e eventos.

Produtos corporativos podem ser padronizados, mas precisam ser efetivamente homologados para uso regional.

### 9.2. Dados compartilhados em tempo real

Tempo real é atribuído explicitamente ao gestor de eventos. Não há evidência de replicação integral de dados entre países ou instâncias.

O governo prevê procedimentos para incidentes, demanda, versionamento, regularização de dados, releases, hotfixes, catálogo, observabilidade, segurança e disaster recovery, sem fluxos ou tempos de atendimento detalhados.

---

## 10. Governança, versionamento e evolução

### 10.1. Procedimentos corporativos mencionados

O governo garante operação e estabelece procedimentos para incidentes, demandas, versionamento, regularização de dados, hotfixes e catalogação. [Evidência Visual: Frame 09 @ 30:28] FinOps é citado para acompanhar e ajustar custos, sem fórmula de cobrança.

### 10.2. Evolutivos e mudanças no núcleo

Soluções novas devem conectar-se nativamente e por configuração ao REEF; impagos e Clientes 360 são exemplos. Corporativo responde por software de produto, qualidade, documentação e releases; países/regiões participam de personalizações e integrações.

Não há fluxo formal de aprovação de Core, homologação ou ferramenta de controle de código.

### 10.3. Estado de versões

Versões heterogêneas de TRON são problema inicial. Melhorias de TRON para REEF devem viajar por SINS aos países, com *release* maior trimestral. SINS não é expandido na fonte. Não há matriz de compatibilidade ou versão de plataforma.

---

## 11. Organização das equipes e responsabilidades

REEF é uma família de equipes estáveis, autônomas e multidisciplinares orientadas a produto. São citados Product Manager, Product Owner e Scrum Master.

Comunidades: segurança, operações e infraestrutura, arquitetura, FinOps, transformação e implantações regionais. [Evidência Visual: Frame 10 @ 33:50] O Reef Council define visão, estratégia, roadmap, OKRs, políticas, boas práticas, prioridades, riscos e conflitos.

Há planejamento e retrospectiva a cada três semanas e eventos diários. [Evidência Visual: Frame 11 @ 37:13] Responsabilidades são repartidas entre corporativo, regiões e países.

---

## 12. Modelo de produto

### 12.1. Produtos pré-configurados citados

Não há catálogo completo de produtos prontos. São citados Automóveis para América Central e Vida Total para Uruguai. Vida Total possui definição corporativa e chega ao Uruguai com subconjunto de coberturas e dados locais.

### 12.2. Direção de padronização

REEF busca reutilizar produtos e capacidades. Automóveis regional depende de homologação real entre países; produtos corporativos de Vida podem ser customizados localmente.

**Análise.** Padronização não elimina diferenças locais; combina reutilização com adaptação de coberturas e dados.

---

## 13. Terceiros, atividades e modelo de dados

### 13.1. Papel do módulo de terceiros

Há sincronização de terceiros no Uruguai e Clientes 360 baseado em eventos. Não há cadastro único, pessoa física/jurídica, prestadores ou atributos demonstrados.

### 13.2. Atividades e papéis

Não há catálogo de atividades. São citados usuários de negócio, agentes, clientes, distribuidores e usuários de portal, sem permissões detalhadas.

### 13.3. Incompatibilidades e regras de validação

Não são apresentadas regras entre tipos de terceiro ou papéis.

### 13.4. Proteção de dados e consentimentos

LGPD, GDPR/RGPD, consentimentos, retenção e mascaramento não são mencionados.

---

## 14. Produtos, tarifas, impostos e regras locais

### 14.1. Tarifação e impostos

RTE calcula componentes econômicos da prima; DUP ajusta subscrição e preço. Impostos, fórmulas, tabelas e regras atuariais locais não são explicados.

### 14.2. Gerador de produtos

Taller de Productos aparece no Core. Há reutilização de produtos entre instâncias, mas não há motor, tela, ciclo de aprovação ou regras de cobertura demonstradas.

### 14.3. Rating e motores de cálculo

DUP e RTE são os motores descritos. DUP atende *underwriting* e precificação; RTE é microserviço de cálculo e simulação. [Evidência Visual: Frame 08 @ 27:05]

---

## 15. Sinistros, documentos e notificações

### 15.1. Documentos e faturas

O Core inclui sinistros. FIS gera faturas, comunicados e contratos a partir de modelos; Documentum administra documentação digital. [Evidência Visual: Frame 08 @ 27:05]

### 15.2. Notificações

O gestor de eventos notifica aplicações assinantes em tempo real. Não confirma e-mail, SMS ou carta para cliente.

### 15.3. Limitação de formatos corporativos

Não há formatos corporativos obrigatórios demonstrados para apólice, certificado, recibo ou fatura.

---

## 16. Cosseguro e resseguro

A sessão não descreve coaseguro, cessões, retenções, tratados proporcionais/não proporcionais ou módulo de resseguro. Re21 não é confirmado nos slides ou na fala. Não se deve inferir suporte a resseguro apenas pela presença do Core segurador.

---

## 17. Casos concretos mencionados

### 17.1. Panamá / América Central

**Contexto.** Instância REEF para América Central em uso no Panamá. **Arquitetura.** Integrações locais, gestão documental, FIS, Documentum e eventos. **Particularidade.** APIs/eventos sem *database link*; Automóveis regional; cotizador comum ainda pendente. **Roadmap.** Honduras, Nicarágua, Costa Rica, El Salvador, Guatemala e Panamá; dez produtos em quatro anos, BPM e BI.

### 17.2. Uruguai — Vida

**Contexto.** Segunda instância para Vida. **Arquitetura.** Vida Total, cotizador-emissor, DUP, RTE, terceiros, integrações administrativas/contábeis e portal. **Particularidade.** Produto corporativo com coberturas/dados locais; possibilidade declarada de intercâmbio entre instâncias.

### 17.3. Puerto Rico

**Contexto.** Pergunta sobre país fora do roadmap. **Resposta.** Pode consumir Marketplace por API sem Core REEF; compatibilidade com TRON disperso não foi garantida.

### 17.4. Chile

**Contexto.** Pergunta sobre nivelamento de TRON e cotizador. **Resposta.** Cotizador pode operar padronizado/isolado, mas migração de produto exige estudo de customizações. Não há implantação chilena confirmada.

### 17.5. Guatemala

**Contexto.** Pergunta sobre Salesforce para cotações. **Resposta.** Autosserviços e contact center são interesses; não há roadmap fechado.

### 17.6. México, Espanha e República Dominicana

México é citado para *assessment* de Vida. Espanha desenha solução de Saúde com nomenclátor, gestão de prestadores e assistências potencialmente incorporáveis. República Dominicana é mencionada em desenvolvimento ligado à ficha 360.

---

## 18. Roadmap e evolução

- Plano Estratégico de TI: 2022–2024. [Evidência Visual: Frame 06 @ 20:20]
- Vida no Uruguai: início citado para novembro após apresentação de outubro de 2023.
- América Central: seis países e dez produtos nos próximos quatro anos.
- Horizonte até 2028: redução declarada de recorrentes em cerca de €1,2 milhão por descomissionamento; sem memória de cálculo.
- Próximo ano: cotizador comum de Automóveis para América Central.
- Vida: novos recursos, suplementos especializados, outros produtos e avaliação no México.
- Marketplace: 22 soluções, expectativa de mais cinco ou seis até fim do ano; também há meta citada de crescer 20 soluções, sem total final determinável.

Não há cronograma detalhado por país, release ou responsável.

---

## 19. Números e indicadores citados

| Indicador / Métrica | Valor declarado | Contexto |
|---|---:|---|
| Cópias de TRON | 23 | Fator de suporte complexo. |
| Plano de TI | 2022–2024 | Origem do REEF. |
| Instâncias REEF | 2 | América Central e Vida/Uruguai. |
| Países América Central | 6 | Honduras, Nicarágua, Costa Rica, El Salvador, Guatemala, Panamá. |
| Produtos no plano regional | 10 | Horizonte de quatro anos. |
| Redução de recorrentes | ~€1,2 milhão | Meta associada a 2028. |
| Soluções Marketplace | 22 | No momento da apresentação. |
| Possíveis novas soluções | 5 ou 6 | Até fim do ano, expectativa. |
| Tempo de vida | quase 2 anos | Até 3/10/2023. |
| Equipes | 16 | Produto, comunidades e suporte. |
| Pessoas | 59 | Com tarefas atribuídas. |
| Épicas | 169 | 27 compromissos estratégicos; 13 em Q4. |
| Histórias concluídas | 1,8 mil | Dado acumulado. |
| Pilotos | 4 | Orientados a produto. |
| Sprints paralelos | 2 | Dado do slide. |
| Cadência | 3 semanas | Planejamento e retrospectiva. |
| Story points/sprint | +680 | Prioridade alta. |
| Story points feitos/sprint | +420 | Prioridade alta. |

[Evidência Visual: Frame 11 @ 37:13 para métricas de atividade]

---

## 20. Mapa cronológico integrado da sessão (Fala + Telas)

| Timestamp | Frame / Tela | Evidência visual chave | Tópico da fala |
|---|---|---|---|
| 03:28 | Frame 01 | Videoconferência; filtrada. | Sem conteúdo técnico confiável. |
| 06:50 | Frame 02 | Transição de apresentadores. | Abertura. |
| 10:13 | Frame 03 | Título e data. | Início da apresentação. |
| 13:35 | Frame 04 | Agenda de cinco tópicos. | Estrutura da sessão. |
| 16:58 | Frame 05 | Necessidades dos países. | Descentralização TRON e demandas. |
| 20:20 | Frame 06 | REEF PaaS e plano 2022–2024. | Conceito/origem. |
| 23:43 | Frame 07 | Core, preventa, venda, Marketplace. | Arquitetura e Uruguai. |
| 27:05 | Frame 08 | DUP, RTE, Cotizador, FIS, Documentum, Kafka. | Componentes. |
| 30:28 | Frame 09 | Operação e procedimentos. | Governo. |
| 33:50 | Frame 10 | Reef Council/comunidades. | Organização. |
| 37:13 | Frame 11 | Métricas de times e sprints. | Operação ágil. |
| 40:36 | Frame 12 | OCR incompleto. | Catálogo, Marketplace, instâncias e roadmap pela fala. |

Após 40:36, a correlação usa sobretudo a fala; não foram fornecidos frames legíveis adicionais.

---

## 21. Perguntas e respostas relevantes (Q&A Exaustivo)

### 21.1. Países fora do roadmap, como Puerto Rico, podem usar REEF?

**Pergunta.** Como entrar no futuro? **Resposta.** Podem consumir soluções do Marketplace por API sem montar Core REEF. **Esclarece.** Adesão é modular.

### 21.2. TRON muito disperso integra-se automaticamente?

**Pergunta.** A dispersão de Puerto Rico impede uso? **Resposta.** Integração com aquela versão não foi assegurada; soluções API podem ser avaliadas. **Esclarece.** Compatibilidade de Core não é garantia.

### 21.3. Nivelar TRON basta para adotar REEF integralmente?

**Pergunta.** Após nivelamento, tudo funciona automaticamente? **Resposta.** Não; é necessário avaliar solução a solução porque customizações podem impedir conversão integral. **Esclarece.** Nivelamento não elimina análise.

### 21.4. O cotizador usa produtos configurados no TRON local?

**Pergunta.** Pode ser usado sem grande desenvolvimento? **Resposta.** Opera padronizado e pode ser consumido isoladamente por API; levar produto inteiro ao TRON local exige estudo. **Esclarece.** Reuso não é portabilidade automática.

### 21.5. Clientes 360 pode ser usado fora do Core REEF?

**Pergunta.** A ficha depende da instância completa? **Resposta.** Eventos de alta/alteração podem ser publicados e consumidos pela ficha. **Esclarece.** Há desacoplamento por eventos, com requisitos não detalhados.

### 21.6. Salesforce para cotações já está disponível?

**Pergunta.** Há solução independente? **Resposta.** Autosserviços/contact center são interesses; há discussão com Salesforce e DIN, mas não roadmap fechado. **Esclarece.** Não há disponibilidade confirmada.

### 21.7. Funções de TRON Web/Vida chegam sem nivelamento?

**Pergunta.** País pode acessá-las pontualmente? **Resposta.** Melhorias viajam por SINS; elementos como eventos podem requerer integração/investimento local. **Esclarece.** Receber melhoria não equivale a ecossistema completo.

### 21.8. Pode haver mais de uma instância REEF?

**Pergunta.** Serviço implica plataforma única? **Resposta.** Não; podem existir instâncias por volumetria/região, e havia duas. **Esclarece.** Há segmentação operacional declarada.

### 21.9. Produtos são compartilháveis entre instâncias?

**Pergunta.** O que permite reutilização? **Resposta.** Produtos podem ser copiados/intercambiados; Vida Total chega ao Uruguai com adaptações. **Esclarece.** Compartilhamento admite localizações.

### 21.10. Por que Automóveis regional é desafio?

**Pergunta.** O problema é técnico? **Resposta.** O produto precisa ser realmente homologado/igual entre países. **Esclarece.** É desafio de negócio e padronização.

### 21.11. Há conexão direta a banco na América Central?

**Pergunta.** São usados database links? **Resposta.** Não; APIs ou gestor de eventos. **Esclarece.** Fronteira declarada é serviços/eventos.

### 21.12. Para que serve o governo REEF?

**Pergunta.** Vai além de acompanhamento? **Resposta.** Garante operação, procedimentos, incidentes, demanda, custos, cobertura e responsabilidades. **Esclarece.** Governo abrange operação/evolução.

### 21.13. Como custos são tratados?

**Pergunta.** Há governo econômico? **Resposta.** FinOps acompanha e ajusta custos a uso/necessidade. **Esclarece.** Não existe precificação demonstrada.

### 21.14. Marketplace exige Core REEF?

**Pergunta.** É preciso ter TRON na plataforma? **Resposta.** Não; solução de Marketplace pode ser usada sem Core. **Esclarece.** Catálogo é independente do pacote Core.

### 21.15. O que há em uma ficha do Marketplace?

**Pergunta.** Como avaliar uma solução? **Resposta.** Documentação, vídeo, descrição, integração, consumo econômico quando aplicável e contato. **Esclarece.** O catálogo apoia avaliação.

### 21.16. Quais ritos ágeis são usados?

**Pergunta.** Como times se sincronizam? **Resposta.** Planning e retrospectiva a cada três semanas, eventos diários e Reef Council. **Esclarece.** Cadência declarada sem ferramentas de backlog.

### 21.17. O que ocorre com melhorias de TRON para REEF?

**Pergunta.** Outros países as recebem? **Resposta.** Via SINS, com release maior trimestral. **Esclarece.** Não há garantia de adoção imediata ou compatibilidade.

---

## 22. Limitações reconhecidas

1. Whisper contém ruído, repetição e termos fonéticos imperfeitos.
2. Não há infraestrutura, banco, rede, autenticação, segurança técnica, observabilidade ou DR detalhados.
3. Não há garantia de integração com TRON muito disperso.
4. Nivelamento não produz adoção automática; cada solução requer estudo.
5. Produtos regionais exigem homologação real.
6. Salesforce/contact center não têm roadmap confirmado.
7. Marketplace tinha 22 soluções, sem catálogo integral no material.
8. APIs/eventos não têm contratos, payloads, tópicos, SLA ou política de erro expostos.
9. Só foram mostrados slides, não telas operacionais.

---

## 23. Riscos e desafios

### 23.1. Riscos explicitamente mencionados

- Dispersão de TRON por versões e mudanças no núcleo.
- Obsolescência e segurança em múltiplas cópias.
- Suporte complexo e demorado.
- Integração não garantida com versões muito dispersas.
- Customizações locais impedindo aproveitamento integral.
- Desenvolvimento duplicado e custo sem reuso de Marketplace.

### 23.2. Desafios derivados do contexto

- **Análise:** Conciliar autonomia local, responsabilidades regionais e padrão corporativo é crítico.
- **Análise:** Produtos compartilhados exigem alinhamento funcional/regulatório além de cópia técnica.
- **Análise:** Sem contratos de integração, esforço, latência e confiabilidade não podem ser estimados.
- **Análise:** Múltiplas instâncias exigem disciplina de catálogo/versionamento, cujo mecanismo não foi explicado.

---

## 24. Transformações estruturais identificadas

1. **Cópias locais → plataforma governada.**
2. **Core isolado → ecossistema com cotizador, documentos, eventos e motores.**
3. **Integração local não especificada → APIs e eventos declarados; sem database links na América Central.**
4. **Desenvolvimento duplicado → descoberta/reuso por Marketplace.**
5. **Demanda pontual → equipes de produto, comunidades e Reef Council.**

São sínteses do material, não prova de migração completa.

---

## 25. O que a reunião NÃO permite concluir

- Provedor/região de nuvem, zonas, topologia ou alta disponibilidade.
- Banco, esquema, replicação, linguagens ou frameworks de TRON/REEF.
- Autenticação, versionamento e monitoramento de APIs.
- Tópicos, retenção e garantias Kafka.
- SLA, RTO/RPO, backup, DR e resposta a incidentes.
- Custos unitários ou modelo de cobrança.
- Catálogo integral das 22 soluções e elegibilidade por país.
- Compatibilidade concreta entre versões TRON e REEF.
- Resseguro, coaseguro, impostos ou contabilidade por país.
- Datas fechadas de implantação e *go-live*.

---

## 26. Glossário terminológico, siglas e entidades

| Termo / Sigla | Significado / expansão | Papel |
|---|---|---|
| REEF | MAPFRE Open Insurance Platform, conforme fala | Plataforma seguradora como serviço. |
| PaaS | Plataforma como Serviço | Modalidade do REEF. |
| TRON | Não expandido | Core operacional. |
| DUP | Dynamic Underwriting & Pricing | Subscrição e preço dinâmicos. |
| RTE | Não expandido no slide | Tarificador/cotizador; associado oralmente a Rating Engine. |
| FIS CSF | Não expandido | Geração/distribuição de documentos. |
| OpenText Documentum | Nome exibido | Gestor documental. |
| Kafka | Nome exibido | Base do gestor de eventos. |
| BPM | Business Process Management | Capacidade de processos. |
| LowCode | Termo exibido | Capacidade operacional. |
| FinOps | Operação financeira de tecnologia | Controle de custos. |
| Marketplace | Catálogo de soluções | Descoberta e consumo de ativos. |
| Clientes 360º | Nome de capacidade | Ficha/visão de cliente. |
| Impagos | Inadimplência | Módulo citado. |
| SINS | Não expandido | Canal de entrega de melhorias TRON. |
| Reef Council | Nome próprio | Comitê máximo de governo. |
| OKR | Objectives and Key Results | Objetivos/resultados acompanhados. |
| Vida Total | Nome citado | Produto de Vida no Uruguai. |
| Quote&Buy | Termo exibido | Cotação e compra digital. |
| Nomenclátor | Termo citado | Possível componente de Saúde. |

---

## 27. Conclusões principais

REEF é apresentado como resposta corporativa à descentralização e dispersão do TRON. Ele preserva TRON como Core e o integra a capacidades globais, motores, documentos, eventos e Marketplace.

As evidências de execução incluem duas instâncias citadas — América Central/Panamá e Vida/Uruguai —, integração por APIs/eventos, governança e indicadores de equipes. Reutilização de produtos e serviços depende de compatibilidade e homologação entre países.

Os direcionamentos declarados são expandir América Central, amadurecer Vida e Vida Total, avaliar México, acompanhar Saúde na Espanha e ampliar o Marketplace. A reunião não sustenta cronogramas fechados nem detalhes técnicos de infraestrutura, integração ou segurança.
