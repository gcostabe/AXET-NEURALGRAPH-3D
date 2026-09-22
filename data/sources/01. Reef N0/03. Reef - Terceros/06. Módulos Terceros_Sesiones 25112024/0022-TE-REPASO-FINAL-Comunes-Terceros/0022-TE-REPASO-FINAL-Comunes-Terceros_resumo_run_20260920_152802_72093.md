# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `0022-TE-REPASO-FINAL-Comunes-Terceros.mp4`
**Data de processamento:** 20/09/2026 15:32:06
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada da transcrição — configuração transversal, terceiros e governança funcional no “Rift Core/Riscor”

> **Nota de fidelidade terminológica:** a transcrição alterna formas como “Rift Core”, “Riscor”, “Rizcor” e “Rift Core legacy/Tron Web”. Este documento preserva a ambiguidade. Há forte indicação contextual de que se trata de uma mesma plataforma ou de componentes relacionados, mas a reunião não define formalmente a nomenclatura nem a arquitetura técnica completa.  
> **Rastreabilidade:** a transcrição fornecida não contém timestamps nem numeração de linhas; por isso, as referências são temáticas e textuais.

---

## 1. Síntese executiva

A sessão teve caráter predominantemente formativo e orientado à configuração de uma plataforma de seguros identificada na transcrição como “Rift Core/Riscor”. O foco foi demonstrar que os módulos de **Comuns**, **Terceiros** e **Segurança** não devem ser tratados como cadastros isolados: suas definições afetam emissão, sinistros, produtos, canais, documentos, controles técnicos, estrutura comercial, contabilidade e operação cotidiana.

A principal mensagem foi a necessidade de manter **coerência entre configurações relacionadas**. O instrutor reforça repetidamente que copiar tabelas entre ambientes, países ou versões sem compreender seus atributos pode introduzir inconsistências funcionais. A orientação é analisar o significado de cada parâmetro, a vigência dos dados, os efeitos sobre o histórico e as dependências com outros módulos antes de configurar ou alterar qualquer elemento.

A reunião também apresenta uma visão de governança operacional: acessos devem ser concedidos de acordo com papéis, atividades e responsabilidades de negócio; usuários não devem receber permissões indiscriminadas; e o processo de criação e alteração de usuários não pode depender informalmente de pessoas externas ou da área técnica sem procedimento definido.

Do ponto de vista de negócio, a transcrição descreve a plataforma como um ecossistema integrado de seguros. Produtos, terceiros, agentes, estrutura comercial, emissão, sinistros, documentos, controles de risco, reasseguro e processos de auditoria são apresentados como elementos interdependentes. A conclusão explícita é que a formação de equipes sem entendimento transversal do sistema tende a produzir erros de implementação.

---

## 2. Contexto e antecedentes

A conversa parece encerrar ou consolidar um treinamento sobre tabelas de definição, cadastros e operações de manutenção da plataforma. O instrutor relembra conteúdos vistos anteriormente — inclusive em sessões anteriores — e concentra a explicação nos elementos considerados mais sensíveis pela experiência prática.

O cenário pressupõe uma operação seguradora com possíveis particularidades locais, especialmente referências a Brasil, Espanha, Honduras, Estados Unidos, Portugal, Turquia, Panamá e outros contextos nacionais. Entretanto, esses países aparecem como exemplos de escala, localização ou implementação; a reunião não fornece uma comparação formal entre suas arquiteturas.

Há também uma preocupação recorrente com coexistência ou migração entre ambientes/sistemas:

- uma instalação baseada em “Rift Core”;
- componentes ou histórico denominados “legacy”;
- menções a “Tron Web”;
- estruturas existentes em uma operação local, como “MAPFRE Brasil”;
- possível participação da NTT na manutenção ou configuração inicial de uma solução para o Brasil.

A relação contratual, operacional ou tecnológica entre MAPFRE Brasil e NTT não é esclarecida. O próprio instrutor afirma não conhecer o modelo vigente entre as organizações.

---

## 3. Problemas identificados

### 3.1. Configuração por cópia sem entendimento funcional

O risco mais enfatizado é copiar tabelas de outro ambiente, país ou sistema como se seus dados fossem automaticamente compatíveis.

O exemplo apresentado envolve uma tabela de parâmetros de instalação. Mesmo que uma organização local já possua uma tabela equivalente, ela pode ter sido configurada para um modelo legado diferente. Importar seus dados para outro modelo, sem validar os atributos e as relações funcionais, pode gerar incoerências — por exemplo, um atributo pode indicar que determinada entidade não está habilitada no modelo de terceiros da nova plataforma.

**Consequência:** a instalação pode iniciar com dados aparentemente completos, mas semanticamente incompatíveis com o modelo funcional em uso.

**Direcionamento apresentado:** cada atributo deve ser entendido e configurado conforme o ambiente de destino. A reunião rejeita explicitamente a prática de “copiar e colar” tabelas entre contextos diferentes.

---

### 3.2. Falta de visão transversal entre módulos

O instrutor alerta que uma definição aparentemente local pode afetar processos em outras áreas. Um cadastro de terceiros pode influenciar emissão; uma regra de sinistros pode demandar informações ou documentos configurados em terceiros; uma estrutura comercial pode impactar apropriação de prêmios e controles contábeis.

**Consequência:** equipes segmentadas por módulo, sem conhecimento das dependências, podem implementar configurações inconsistentes ou incompletas.

**Direcionamento apresentado:** tratar a plataforma como um todo integrado, e não como conjuntos funcionais independentes.

---

### 3.3. Alterações sem considerar vigência e carteira histórica

A validade temporal dos cadastros é apresentada como um ponto crítico. Produtos, atividades de terceiros e outras configurações podem possuir data de validade. Uma alteração futura pode permitir determinado comportamento para novos registros, mas não necessariamente para registros existentes.

O instrutor destaca uma pergunta obrigatória antes de implementar mudanças:

> “O que ocorre com a carteira e com os registros prévios?”

**Consequência:** alterações feitas sem avaliar dados históricos podem produzir tratamento incorreto de apólices, terceiros ou regras já existentes.

---

### 3.4. Cadastro excessivo ou sem propósito analítico

Vários catálogos são apresentados como mecanismos para exploração posterior de informação: categorias, classificações, regimes fiscais, ratings, perfis financeiros, entidades de cobrança e pagamento, entre outros.

O alerta é que preencher códigos apenas para completar campos reduz a qualidade informacional. Se todos escolherem o primeiro valor disponível, o catálogo deixa de produzir segmentação útil.

**Consequência:** perda de capacidade analítica, operacional e regulatória sobre os dados cadastrados.

---

### 3.5. Acesso amplo e criação informal de usuários

A transcrição questiona práticas em que usuários recebem acesso amplo por possuírem acesso a uma rotina, ou em que a área técnica cria contas mediante solicitações informais de negócio.

**Consequência:** acesso indevido a atividades, fragilidade de governança e execução de ações que não correspondem à responsabilidade do usuário.

**Direcionamento apresentado:** deve existir procedimento local para alta de usuários, com participação das áreas relevantes — como área comercial, recursos humanos e segurança/acessos — e definição explícita de funções, atividades e permissões.

---

### 3.6. Controles técnicos excessivos

A reunião reconhece que empresas frequentemente desejam controlar todas as situações possíveis. O instrutor adverte que esse excesso pode transformar controles técnicos em uma cadeia improdutiva de auditorias e aprovações.

**Consequência:** ineficiência operacional, atraso na emissão ou em outros processos e criação de uma “churrera de aprovação”, expressão usada para ilustrar um fluxo excessivamente repetitivo.

**Direcionamento apresentado:** configurar controles técnicos de forma seletiva, com definição clara de quando revisar, quem aprova e quais regras justificam a intervenção.

---

## 4. Solução e modelo mental apresentados

A solução apresentada não é uma nova arquitetura a ser criada, mas um modelo de operação e configuração da plataforma. Esse modelo se apoia nos seguintes princípios:

1. **Configuração consciente:** cada tabela e atributo devem ser entendidos antes da carga ou alteração.
2. **Coerência funcional:** definições em Comuns, Terceiros, Segurança, Produtos, Canais e outros domínios devem estar alinhadas.
3. **Vigência dos dados:** configurações com data de validade devem ser tratadas considerando efeitos futuros e registros históricos.
4. **Governança de acesso:** permissões devem refletir papéis e responsabilidades específicos.
5. **Aproveitamento de catálogos:** classificações devem ser configuradas para gerar valor operacional e analítico posterior.
6. **Controle proporcional:** regras de negócio e controles técnicos devem prevenir riscos reais sem bloquear desnecessariamente a operação.
7. **Integração documental e sistêmica:** documentos, notificações, templates e integrações devem ser configurados de forma consistente entre o transacional e componentes externos.
8. **Visão ponta a ponta:** produtos e processos devem ser analisados em relação à comercialização, emissão, sinistros, terceiros, reasseguro, contabilidade e demais domínios envolvidos.

---

## 5. Arquitetura e funcionamento lógico reconstruídos

A reunião não apresenta um diagrama formal de infraestrutura. Ainda assim, permite reconstruir uma visão lógica do funcionamento da solução.

> **Representação analítica consolidada:** o desenho abaixo reorganiza o conteúdo da reunião; não foi apresentado literalmente como diagrama.

```text
Usuários e áreas de negócio
    ↓
Menus, programas, operações, idiomas e papéis de segurança
    ↓
Módulos funcionais da plataforma
    ├── Comuns
    ├── Terceiros
    ├── Emissão
    ├── Sinistros
    ├── Tesouraria
    ├── Contabilidade
    ├── Reasseguro
    └── Documentos de entrada e saída
    ↓
Catálogos, parâmetros, estruturas organizacionais e regras de negócio
    ↓
Dados de produtos, apólices, terceiros, agentes, documentos e processos
    ↓
Integrações mencionadas
    ├── Gestor documental corporativo
    ├── Compositor/gerador de documentos
    ├── Plataforma corporativa de seleção de riscos
    └── Possíveis serviços ou sistemas locais
```

### 5.1. Núcleo de configuração

O módulo de Comuns funciona como uma camada transversal de definições. Ele concentra parâmetros de instalação, idiomas, moedas, estruturas geográficas, estruturas comerciais, produtos, canais, segurança, menus, mensagens, listas de valores, documentos, controles técnicos e catálogos diversos.

A transcrição afirma que alterações em Comuns ou em Terceiros se refletem automaticamente no restante dos módulos. Essa afirmação sugere que tais domínios possuem papel central na consistência do sistema.

### 5.2. Camada de Terceiros

O módulo de Terceiros é descrito como responsável por pessoas físicas, pessoas jurídicas, agentes, segurados, relações, meios de cobrança e pagamento, informações fiscais, classificações, documentos de identificação e outras atividades vinculadas a entidades cadastradas.

A estrutura de Terceiros alimenta processos de emissão e sinistros. O instrutor destaca, por exemplo, que uma pessoa segurada, pagadora, tomadora, beneficiária ou interveniente pode estar vinculada a uma atividade específica no processo de emissão.

### 5.3. Camada operacional

A operação é realizada por programas, menus, tarefas, consultas e operações de criação/modificação. A plataforma possui mecanismos de segurança por usuário, empresa, função, atividade, ramo técnico e restrição parcial de informação.

Há menção a tarefas online e batch. Tarefas batch são apresentadas como adequadas a processamentos que não devem afetar a performance transacional, especialmente quando executados em janelas noturnas.

### 5.4. Integrações

Foram citadas integrações com:

- uma plataforma corporativa de seleção de riscos;
- gestor documental corporativo;
- componente de composição e envio de documentos;
- sistemas ou contextos denominados “legacy” e “Tron Web”.

A transcrição não especifica protocolos, tecnologias de API, mensageria, bancos de dados, padrões de autenticação, infraestrutura ou mecanismos de observabilidade dessas integrações.

---

## 6. Componentes e domínios mencionados

### 6.1. Módulo de Comuns

O módulo é caracterizado como um domínio de definição, e não de operação transacional. Entre seus principais elementos, foram mencionados:

- catálogo de parâmetros de instalação;
- companhias seguradoras;
- idiomas;
- moedas;
- estrutura geográfica;
- estrutura comercial;
- estrutura de produtos;
- estrutura de canais;
- segurança;
- estruturas de informação;
- tarefas;
- menus, programas e mensagens;
- listas de valores;
- documentos de entrada e saída;
- controles técnicos;
- seleção de riscos e marcas;
- incidências, queixas, reclamações e felicitações;
- catálogos transversais.

O instrutor reforça que alguns desses elementos têm manutenção esporádica, enquanto outros são naturalmente dinâmicos ao longo do tempo.

---

### 6.2. Parâmetros de instalação

Os parâmetros de instalação afetam transversalmente o comportamento da solução. Alguns exemplos mencionados incluem formatos de data e parâmetros relacionados ao modelo de Terceiros.

A orientação é que esses parâmetros sejam definidos no início e não sejam alterados constantemente. Ainda assim, sua importância é alta porque podem condicionar como a plataforma se comporta em toda a instalação.

**Limitação reconhecida:** a transcrição não detalha todos os atributos existentes nessa tabela nem suas regras técnicas.

---

### 6.3. Companhias seguradoras

A configuração de companhia seguradora é apresentada como relevante para habilitação de características que podem surgir ao longo do tempo, tais como:

- plano de fidelização;
- moeda do programa de fidelização;
- empregados de agentes como atividade;
- limites de prêmios;
- controles relacionados à prevenção de lavagem de dinheiro;
- restrições de acesso parcial à informação.

O ponto central é que habilitar um atributo não basta por si só. Se uma companhia decide introduzir um programa de fidelização, por exemplo, será necessário configurar regras de obtenção e resgate de pontos, operações de tesouraria para descontos e elementos relacionados à moeda usada no programa.

---

### 6.4. Idiomas

Os idiomas influenciam documentação, etiquetas e textos apresentados na aplicação.

O instrutor recomenda iniciar com um idioma único, mesmo que a operação futura possa requerer português, espanhol, inglês ou outros idiomas. Em paralelo, outras equipes poderiam preparar descrições e nomenclaturas para os demais idiomas.

A preocupação não é apenas técnica: a terminologia de seguros deve ser validada por quem possui responsabilidade funcional e linguística. A transcrição usa como exemplos termos como “sinistro”, “buquete” e “pool de resseguro”, alertando contra traduções inadequadas ou simplificadas por ferramentas automáticas.

---

### 6.5. Moedas

A recomendação é cadastrar apenas as moedas efetivamente necessárias à operação. Ter o catálogo completo de moedas ISO não é apresentado como um objetivo em si.

Como exemplo, caso a companhia opere apenas com moeda local, dólar americano e euro, seriam essas as moedas relevantes para a configuração.

---

### 6.6. Estrutura geográfica

A estrutura geográfica tende a sofrer pouca alteração, exceto em situações como:

- expansão urbana;
- criação de novos códigos postais;
- necessidade de detalhamento territorial em países extensos;
- alterações em níveis finais de divisão territorial, como distrito ou colônia.

A transcrição não detalha a quantidade exata de níveis geográficos nem o modelo de dados utilizado.

---

### 6.7. Estrutura comercial

A estrutura comercial é descrita como mais dinâmica do que a estrutura geográfica, especialmente em organizações de maior porte. Ela inclui, conforme os exemplos:

- territorial;
- subcentral;
- escritórios;
- vínculo de agentes;
- vínculo de usuários;
- localização de prestadores;
- apropriação de prêmios;
- efeitos contábeis;
- acompanhamento orçamentário.

A oficina/escritório é apresentada como unidade relevante para comercialização, contabilização e acompanhamento de resultados.

O instrutor alerta contra o uso indiscriminado de uma categoria genérica como “Outros”. Caso seja inevitável, deveria existir procedimento claro sobre quando ela pode ser usada e quem deve autorizar sua utilização.

---

### 6.8. Estrutura de produtos

A estrutura de produtos é apontada como uma das configurações mais relevantes e mutáveis. A transcrição menciona níveis como:

```text
Setor
↓
Subsetor
↓
Ramo técnico
↓
Sub-ramo técnico
↓
Modalidades
↓
Coberturas
↓
Conceitos de desagregação
↓
Conceitos econômicos do recibo de prêmio
```

Há referência a modalidades mais comerciais, possivelmente relacionadas ao conceito de “pacotes”, embora a nomenclatura possa variar localmente.

A estrutura possui vigência. Portanto, mudanças em produtos exigem atenção a datas de validade e à forma como novos elementos se relacionarão com apólices e cadastros já existentes.

---

### 6.9. Estrutura de canais e fontes de produção

A estrutura de canais está associada especialmente à atividade de agentes e aos meios pelos quais contratos são formalizados com segurados ou tomadores.

A finalidade apresentada é permitir que a companhia avalie a qualidade ou desempenho de cada meio para determinado agente, inclusive em relação à margem de intermediação.

A estrutura possui dois primeiros níveis corporativos e um terceiro nível configurável conforme atributos locais. São mencionadas possibilidades como classificações de vínculo, multiproduto ou uniproduto.

A fonte de produção é associada ao agente e capturada na emissão da apólice. Segundo a explicação, essa fonte permanece associada à apólice até sua renovação e não muda durante esse intervalo.

---

### 6.10. Sistema de segurança

O sistema de segurança inclui diversos catálogos e regras:

- papéis por companhia;
- associação de papéis a usuários;
- parâmetros de consulta;
- configuração de usuários no servidor de aplicações;
- programas e parâmetros Java por usuário;
- agrupamento de usuários;
- usuários por entidade e por companhia;
- acesso a operações de criação e modificação de terceiros;
- acessos por ramo técnico;
- papéis de informação parcial;
- aplicações;
- conceitos lógicos e propriedades;
- restrições de acesso à informação de terceiros.

A reunião diferencia:

- papel de usuário;
- acesso a programas;
- acesso a atividades de terceiros;
- papel de informação parcial;
- papel de autorização de controles técnicos.

Essas categorias não devem ser confundidas.

---

### 6.11. Informação parcial

A funcionalidade de informação parcial restringe o que determinado grupo ou usuário pode consultar. A configuração pode ser realizada por:

- companhia;
- usuário;
- papel de informação parcial;
- conceito lógico;
- propriedade de um conceito lógico.

O exemplo usado é o conceito lógico de endereço. Dependendo do papel, um usuário poderia visualizar parte dos atributos de endereço, mas não todos.

A funcionalidade pode ser ativada inicialmente apenas para determinado grupo. À medida que a operação se expande, novos usuários não deveriam simplesmente herdar permissões por cópia indiscriminada.

---

### 6.12. Estruturas de informação

As estruturas de informação são apresentadas como catálogos para organização dos dados registrados pela companhia, principalmente nos processos de emissão e, mais intensamente, de sinistros.

Elas podem ser agrupadas por domínio, como:

- terceiros;
- liquidações de sinistros;
- expedientes/processos de sinistro.

O objetivo é oferecer flexibilidade para capturar grupos de dados variáveis sem necessariamente alterar a lógica principal de cada processo.

---

### 6.13. Tarefas

Tarefas são programas que podem executar atividades como:

- notificações;
- geração de cartas;
- envio de e-mails;
- leitura de carteira de apólices;
- obtenção de prêmio líquido emitido em um intervalo;
- processamento acumulado do dia.

A reunião diferencia execução online e batch. A recomendação é evitar colocar no fluxo transacional tarefas que possam afetar desempenho. Processos batch podem executar em horários noturnos, quando há menor impacto operacional.

**Leitura analítica:** a reunião sugere uma preocupação explícita com separação entre operação interativa e processamento em lote, embora não detalhe mecanismos técnicos de agendamento, filas, reprocessamento ou monitoramento.

---

### 6.14. Menus, programas, operações e mensagens

Os menus e programas fazem parte da instalação da plataforma. A transcrição menciona:

- módulos disponíveis;
- painéis de informação;
- operações;
- nomenclatura de menus;
- menus principais e de continuação;
- operações favoritas por usuário;
- idiomas dos usuários;
- mensagens por idioma;
- etiquetas e ajudas na interface;
- menus suspensos de programas.

As operações são descritas como elementos ligados à arquitetura e ao núcleo da plataforma. Não seriam, segundo a explicação, funcionalidades que cada companhia cria livremente para sua instalação.

Também há menção à relação entre operações do ambiente legado/“Tron Web” e operações do ambiente “Neutron”, mas sem detalhamento suficiente para concluir como funciona tecnicamente essa integração.

---

### 6.15. Listas de valores e campos referenciados

A plataforma possui listas de valores e opções de listas. Algumas são corporativas e fechadas, portanto não podem ser alteradas localmente.

O exemplo dado é o tipo de localização de endereço:

- a lista seria “tipo de via”;
- as opções poderiam incluir rua, avenida, praça, rotatória etc.

Também são citados campos referenciados e filtros, usados para restringir informações apresentadas em consultas ou configurações reais. O exemplo remete à filtragem de ramos no processo de emissão.

A orientação é sempre verificar se uma lista:

1. pode ser modificada;
2. pode ser particularizada para uma instalação;
3. de que forma essa particularização é permitida.

---

### 6.16. Anotações e documentos de entrada e saída

A transcrição apresenta uma evolução funcional:

```text
Anotações
↓
Documentos de entrada e saída
```

As anotações são descritas como um mecanismo mais básico, associado principalmente a sinistros e ao disparo de ações como envio de carta ou e-mail.

Os documentos de entrada e saída ampliam esse modelo para controlar:

- notificações;
- arquivos cuja existência ou inexistência deve ser validada;
- documentos necessários à operação;
- fluxos de recebimento;
- destinatários;
- envio de documentação a mais de uma parte;
- integração com gestão documental e composição de documentos.

O formulário de saúde em um produto de saúde é citado como exemplo de documento de entrada. Sua entrega pode ocorrer junto com outros documentos, antes ou depois de determinada operação, e isso influencia as validações e fluxos configurados.

Como exemplo de documento de saída, são mencionadas condições particulares enviadas a agente e cliente.

---

### 6.17. Integração documental

O objetivo dos documentos de saída é integrar:

- a plataforma transacional;
- um gestor documental corporativo;
- um componente de composição e envio de documentos.

A geração e o envio de documentos possuem custo. Por isso, nem todas as companhias estariam em condições de usar componentes externos para essa finalidade. Companhias menores poderiam gerar documentos internamente na própria plataforma.

A integração depende de consistência entre:

- código de template;
- template existente no gestor/compositor;
- estrutura de dados transmitida;
- atributos esperados pelo template;
- representação em JSON mencionada pelo instrutor.

A transcrição não especifica formato de API, transporte do JSON, segurança, tratamento de falhas ou governança de versões de templates.

---

### 6.18. Controles técnicos

Os controles técnicos são regras de negócio configuradas para intervir em pontos específicos dos processos. A reunião menciona três possíveis resultados ou tipologias:

- observação;
- auditoria;
- rejeição.

A rejeição não elimina necessariamente toda a informação: no exemplo de emissão, o movimento pode retornar a uma situação suspensa para que os dados que causaram o controle sejam corrigidos.

Também foram citados:

- pontos específicos de execução dos controles;
- lógicas implementadas pela área técnica;
- níveis de autorização;
- papéis específicos para controles;
- usuários associados a esses papéis;
- áreas responsáveis pelo tratamento;
- atuação de diferentes áreas em um mesmo controle, como comercial e resseguro.

Quando o último controle é aprovado ou rejeitado, o movimento associado é definitivamente autorizado ou rejeitado.

---

### 6.19. Palavras reservadas

As palavras reservadas aparecem como mecanismo mais evoluído para impedir que usuários utilizem determinados termos em textos, cláusulas ou anexos.

A motivação apresentada é reduzir risco de ambiguidades que possam gerar interpretação legal inadequada em caso de sinistro.

---

### 6.20. Seleção de riscos e marcas

A seleção de riscos é relacionada a uma plataforma corporativa da MAPFRE integrada à solução. A integração é mencionada principalmente no processo de emissão, ainda que também possa ter relação com sinistros.

A plataforma externa retornaria indicadores e valores — mencionados como 100, 75, 50, 25 ou ausência de cumprimento de determinado indicador — e a solução local decidiria como tratá-los, inclusive por meio de controles técnicos.

As marcas representam fatos registrados sobre uma pessoa ou situação, podendo ter efeito:

- **a priori:** antes de contratar uma nova apólice;
- **a posteriori:** após um fato já ocorrido, com possíveis efeitos sobre suplementos, sobreprêmios ou renovação.

O exemplo utilizado envolve acidente associado a alcoolemia acima de “0,2 por cento”, conforme reconhecido pela transcrição. Esse valor pode ter sido afetado por reconhecimento de voz; o documento não permite validar sua unidade ou enquadramento legal.

---

### 6.21. Incidências, queixas, reclamações e felicitações

A transcrição usa a sigla ou expressão “EQR/EQRF”, cuja forma exata não é segura, para abranger incidências, queixas, reclamações e felicitações.

Foram mencionados catálogos por companhia para:

- severidades;
- causas;
- tipologias de gestão;
- categorias específicas para incidências;
- categorias específicas para reclamações;
- categorias específicas para felicitações.

A reunião indica que pode haver distinção entre situações que exigem ressarcimento e situações de mera discordância com a gestão.

---

### 6.22. Catálogos transversais

Como exemplos de catálogos comuns, foram citados:

- datas de processo;
- formas de compensação;
- conceitos econômicos;
- conceitos econômicos publicados em comissões;
- códigos de sistema.

A relação de catálogos pode crescer ao longo do tempo, mas a sessão se concentrou nos mais recorrentes para os módulos abordados.

---

## 7. Modelo de Terceiros

### 7.1. Parâmetros específicos do modelo

A transcrição indica que o novo modelo de Terceiros será utilizado obrigatoriamente no contexto do treinamento.

São citados parâmetros relacionados a:

- novo modelo de terceiros;
- documento identificador de terceiros genéricos;
- atividades que representam extensões do modelo legado;
- bancos;
- escritórios;
- estruturas comerciais;
- código de identificação do terceiro genérico;
- elementos herdados do legado;
- meios de pagamento;
- contas e cartões;
- cobranças e pagamentos;
- cartões revolving;
- pagamentos por internet;
- cartão de crédito;
- cartão de débito;
- contas correntes;
- outros tipos de conta.

A reunião afirma que alguns elementos legados deixam de fazer sentido porque o novo modelo permite capturar contas e cartões com maior detalhamento de uso.

---

### 7.2. Atividades

As atividades são tratadas como um elemento fundamental. A transcrição menciona códigos de atividade de 1 a 99, além de uma atividade genérica 999, consideradas parte do núcleo. Também seria possível criar atividades locais.

Criar ou usar uma atividade afeta vários aspectos:

- usuários que podem mantê-la;
- processos em que ela pode ser solicitada;
- intervenientes disponibilizados na emissão;
- utilização em sinistros;
- causas de inabilitação;
- acesso a operações de manutenção.

A reunião usa como exemplos as atividades de segurados e agentes. Os números específicos citados para algumas atividades — como atividade 2 para agentes e atividade 37 para empregados de agentes — devem ser tratados com cautela, pois derivam de uma transcrição automática.

---

### 7.3. Dados identificadores e imutabilidade

Depois de criado um terceiro, alguns dados não poderiam ser modificados, incluindo:

- código único;
- tipo de documento;
- chave do documento.

Se houver erro nesses campos, a solução extrema seria uma exclusão física por informática/tecnologia. O instrutor afirma que isso não ocorreria em produção como operação normal.

**Implicação:** a qualidade da carga inicial e dos dados de identificação é crítica. O processo de inclusão precisa evitar erros que não possam ser corrigidos funcionalmente depois.

---

### 7.4. Pessoas físicas e jurídicas

Os catálogos são organizados por:

- comuns a todas as pessoas;
- específicos de pessoas físicas;
- específicos de pessoas jurídicas;
- específicos por atividade.

Para pessoas físicas, foram citados exemplos como:

- carteira de motorista;
- estado da licença;
- suspensão;
- baixa de pontos;
- profissões;
- titulações;
- nível de estudos.

Para pessoas jurídicas, são mencionados:

- cargos;
- atividades econômicas;
- tipologia de pessoa jurídica;
- departamentos;
- relações organizacionais.

---

### 7.5. Documentos identificadores

Os documentos identificadores determinam se são aplicáveis a:

- pessoa física;
- pessoa jurídica;
- ambas.

Quando um documento for aplicável a ambos os tipos, o usuário pode definir no momento online a natureza da pessoa de acordo com o contexto de captura.

Também há referência a documentos alternativos e não alternativos, mas sem detalhamento completo das regras de aceitação entre eles.

---

### 7.6. Agrupamentos, categorias e classificações

A transcrição diferencia agrupamentos de categorias:

- **agrupamentos** podem se relacionar a características comuns e, conforme o contexto, a atividades;
- **categorias** distinguem pessoa física e jurídica, mas não necessariamente atividade.

Também foram mencionados:

- códigos de qualidade;
- classificação de terceiros;
- regimes fiscais;
- ratings;
- perfis financeiros;
- entidades de cobrança e pagamento;
- tipos de tokenização;
- meios de cobrança e pagamento.

A finalidade é permitir posterior exploração da informação, e não apenas preenchimento administrativo.

---

### 7.7. Relações entre terceiros

Foram mencionadas possibilidades como:

- parentescos;
- relações entre terceiros;
- grupos familiares;
- grupos hierarquizados;
- relações de supervisão;
- supervisores de supervisores;
- critérios de atribuição a supervisores;
- grupos de tramitadores;
- cessões temporárias entre tramitadores;
- atuações secundárias.

O instrutor apresenta parte desses exemplos como possibilidades a considerar no levantamento local, e não como requisitos obrigatórios já definidos.

---

### 7.8. Agentes e comissões

Para agentes, a transcrição menciona:

- tipos de agentes;
- quadros de comissões;
- quadros de comissões habilitados por companhia;
- habilitação de quadros para agente específico;
- quadros de distribuição de comissões;
- agente principal, secundário, terceiro e alternário;
- percentuais de comissão;
- executivo de conta;
- assessor;
- organizador;
- atividades secundárias;
- escritório padrão;
- escritórios habilitados;
- subvenções;
- fontes de produção;
- métodos de envio.

Os quadros de distribuição de comissões facilitariam a captura, pelo usuário emissor, de agentes participantes de uma apólice e de suas proporções de comissão.

Os métodos de envio são apresentados como uma funcionalidade que deveria se tornar obsoleta em favor do módulo de documentos de entrada e saída.

---

## 8. Modelo de integração

### 8.1. Integração funcional entre módulos

A integração mais claramente estabelecida é funcional e baseada em cadastros compartilhados:

```text
Comuns e Terceiros
    ↓
Emissão
    ↓
Apólices, intervenientes, produtos e canais
    ↓
Sinistros, documentos, pagamentos, controles e reasseguro
```

Exemplos destacados:

- uma atividade de terceiro configurada em Terceiros pode precisar de causa de inabilitação correspondente;
- a estrutura comercial influencia distribuição de agentes, usuários, escritórios, prêmios e efeitos contábeis;
- documentos definidos em Comuns podem ser exigidos ou enviados durante emissão, sinistros, tesouraria ou contabilidade;
- produtos precisam considerar o que será necessário em sinistros, reasseguro e demais processos;
- informações de Terceiros podem restringir ou habilitar intervenientes na emissão.

---

### 8.2. Integração com gestão documental

O modelo documental conecta o sistema transacional ao gestor documental e ao componente de composição/envio. A integração parece depender de:

1. um documento configurado na plataforma;
2. destinatários definidos;
3. template correspondente;
4. código de template compatível entre os dois lados;
5. dados estruturados, mencionados como JSON;
6. armazenamento em meio documental apropriado.

---

### 8.3. Integração com seleção de riscos

A plataforma de seleção de riscos retorna indicadores que podem ser traduzidos em decisões ou controles no sistema transacional.

A transcrição permite concluir que existe integração funcional, mas não permite determinar:

- se é síncrona ou assíncrona;
- se usa API, arquivos, banco ou mensageria;
- como erros e indisponibilidades são tratados;
- quais dados são transmitidos;
- como a plataforma externa é autenticada.

---

### 8.4. Relação com sistemas legados

A reunião menciona ambiente legado e “Tron Web”, além de operações “Neutron”. Parece haver tabelas de relação entre operações de ambientes diferentes.

Entretanto, não é possível determinar com segurança:

- se são sistemas distintos;
- se “Tron Web” é um front-end;
- se “Neutron” é um componente técnico ou funcional;
- se existe migração em andamento;
- quais domínios ainda dependem do legado.

---

## 9. Modelo operacional

### 9.1. Criação, alteração e consulta

As operações principais mencionadas são:

- criar;
- modificar;
- atualizar;
- consultar;
- executar alterações em diferido;
- selecionar e detalhar mudanças;
- lançar uma tarefa;
- revisar informações.

A consulta pode depender de uma data específica. Em Terceiros, a data de validade é apresentada como especialmente importante.

### 9.2. Alteração de dados validados

Para blocos de informação previamente comprovados, o instrutor sugere que a organização pode optar por impedir alterações, permitindo apenas inabilitação. O exemplo é uma direção/endereço já validado: em vez de modificá-lo, poderia ser inabilitado e um novo endereço seria incluído.

A regra não é apresentada como obrigatória. A companhia deve definir sua norma de atuação, e a implementação deve respeitá-la.

### 9.3. Operações em diferido e tratamento de erros

Há referência a operações em diferido para alterações em massa ou processadas por tarefa.

Se ocorrerem erros, a revisão atualmente dependeria da intervenção da área de tecnologia. Essa área analisaria tabelas onde os erros são registrados e orientaria a correção na origem dos dados.

**Limitação reconhecida:** a transcrição afirma que, “hoje por hoje”, esse tratamento ocorre com participação de tecnologia. Não é descrito um mecanismo de autosserviço funcional para diagnóstico ou correção.

### 9.4. Processamento batch

O processamento batch é recomendado para tarefas que possam afetar a performance online. Entre os usos possíveis:

- notificações;
- cartas;
- e-mails;
- cálculo ou leitura de informações de carteira;
- processamento acumulado por período.

A reunião não detalha janela operacional, agendador, prioridade, reexecução, logs ou mecanismos de recuperação.

---

## 10. Governança e responsabilidades

### 10.1. Governança de cadastro de usuários

O processo de alta de usuários deve envolver áreas que conheçam o momento, a justificativa e as responsabilidades do usuário. A transcrição cita especialmente:

- área comercial;
- recursos humanos;
- áreas participantes do processo local;
- tecnologia/informática;
- responsáveis por segurança e perfis.

A crítica principal é ao cenário em que alguém informa informalmente à pessoa técnica que determinado usuário deve ser criado. Esse comportamento é classificado pelo instrutor como inadequado.

### 10.2. Governança de acesso

Ter acesso a uma rotina de terceiros ou fornecedores não implica acesso a todas as atividades disponíveis nela.

O exemplo indica que a área comercial deveria controlar determinadas atividades relacionadas a agentes ou empregados de agentes, em articulação com recursos humanos.

A governança deve definir:

- quem pode criar;
- quem pode modificar;
- quais atividades pode manter;
- quais informações pode consultar;
- quais ramos pode acessar;
- quais controles técnicos pode tratar;
- em quais companhias está habilitado.

### 10.3. Governança de nomenclaturas e idiomas

A terminologia funcional não deve ser deixada exclusivamente sob responsabilidade técnica. Há recomendação implícita de validar traduções, etiquetas e nomenclaturas com responsáveis adequados.

### 10.4. Governança de controles técnicos

Cada controle precisa ter:

- regra de negócio;
- ponto de execução;
- área responsável;
- papel de autorização;
- usuários associados;
- níveis de autorização;
- definição de efeitos de aprovação ou rejeição.

---

## 11. Modelo de produto e transformação organizacional

A reunião não apresenta formalmente um modelo de produto com Product Owner, Product Manager, Scrum Master, sprints ou backlog. Portanto, não é possível documentar esses papéis como parte do contexto apresentado.

Ainda assim, há uma transformação de postura claramente sustentada pela fala: o sistema deve ser tratado como uma plataforma integrada, e não como uma coleção de tabelas ou projetos isolados por módulo.

### Leitura analítica — mudança de paradigma identificada

```text
Configuração local isolada
↓
Análise de impactos entre módulos
↓
Governança de dados, acessos e regras
↓
Operação integrada de uma plataforma de seguros
```

Essa leitura não corresponde a uma declaração literal do instrutor, mas decorre da ênfase contínua em relações entre produtos, terceiros, emissão, sinistros, estrutura comercial, reasseguro e controles.

---

## 12. Casos e exemplos concretos apresentados

### 12.1. Brasil

O Brasil é mencionado em diferentes contextos:

- possível instalação de “Rift Core para Brasil” mantida ou configurada pela NTT em determinado momento;
- necessidade de avaliar o modelo atual entre MAPFRE Brasil e NTT;
- maior dinamismo esperado na estrutura comercial devido ao porte do país;
- existência potencial de dados locais em sistemas legados;
- utilização futura de ramos de vida, poupança/vida e risco, conforme termos reconhecidos na transcrição.

A reunião não permite determinar o status exato da implantação no Brasil, a arquitetura local, o escopo funcional ou o cronograma.

### 12.2. Panamá

O “Know Your Client” do Panamá é mencionado como exemplo de geração de documento de terceiro. A captura de informação de um segurado geraria documentação por meio do módulo documental e de template específico.

O exemplo é usado para demonstrar a necessidade de compatibilidade entre template, código de template e estrutura JSON enviada pelo sistema transacional.

### 12.3. Países citados como exemplos de escala ou estrutura

Foram mencionados:

- Honduras;
- Espanha;
- Estados Unidos;
- Portugal;
- Turquia.

Esses países são usados principalmente para contrastar a complexidade de estruturas comerciais ou geográficas. Não há detalhes suficientes sobre implementações específicas.

---

## 13. Números e indicadores citados

| Indicador ou referência | Valor mencionado | Contexto |
|---|---:|---|
| Faixa de atividades do núcleo | 1 a 99 | Atividades de Terceiros consideradas do núcleo |
| Atividade genérica | 999 | Código genérico citado para Terceiros |
| Grupo inicial de usuários | 10 usuários | Exemplo de usuários especialistas para início de operação |
| Possível número de usuários de companhia pequena | 50 usuários | Exemplo ilustrativo, não métrica oficial |
| Retornos/valores de seleção de riscos | 100, 75, 50, 25 | Exemplos de valores retornados por indicadores |
| Exemplo de alcoolemia | “0,2 por cento” | Dado potencialmente afetado pela transcrição automática |
| Idiomas hipotéticos | português, espanhol, inglês e outros | Exemplo de estratégia multilíngue |
| Companhia com três moedas | local, dólar americano e euro | Exemplo de catálogo mínimo de moedas |

> Os números acima foram declarados durante a reunião como exemplos explicativos. Não foram apresentados como indicadores auditados, metas formais ou dados corporativos oficiais.

---

## 14. Perguntas e respostas

### 14.1. Perguntas formais dos participantes

Não há, na transcrição fornecida, perguntas substantivas feitas por participantes e respondidas pelo instrutor. Ao final, o instrutor pergunta se há dúvidas, mas nenhuma interação posterior é registrada.

### 14.2. Perguntas didáticas levantadas pelo instrutor

Embora não haja perguntas formais dos participantes, a explicação usa perguntas recorrentes para orientar decisões de configuração.

#### Pergunta: “O que ocorre com a carteira e com os registros prévios?”

**Resposta transmitida:** antes de alterar uma configuração com vigência, é necessário entender os efeitos sobre registros existentes. Não basta definir uma regra para o futuro sem avaliar apólices, terceiros ou cadastros já criados.

**O que esclarece:** a vigência não é apenas atributo técnico; ela é uma decisão funcional com impacto em histórico e carteira.

---

#### Pergunta: “Quem pode acessar determinada informação ou atividade?”

**Resposta transmitida:** o acesso não deve ser definido apenas pelo programa. Ele depende de papéis, atividades, empresa, ramo técnico, informação parcial e regras específicas de cada domínio.

**O que esclarece:** uma rotina pode ser acessível a um usuário, mas determinadas atividades internas dessa rotina devem permanecer restritas.

---

#### Pergunta: “Uma lista de valores pode ser modificada ou particularizada?”

**Resposta transmitida:** depende da lista. Algumas são corporativas e devem ser respeitadas; outras podem possuir possibilidades de particularização. É necessário identificar o tipo de lista e a regra aplicável.

**O que esclarece:** catálogos do núcleo não devem ser assumidos como livremente customizáveis.

---

#### Pergunta: “Faz sentido controlar tudo por controles técnicos?”

**Resposta transmitida:** não necessariamente. Controles excessivos podem gerar ineficiência, auditorias redundantes e fluxo de aprovações sem valor proporcional.

**O que esclarece:** controle deve ser proporcional ao risco e à necessidade operacional.

---

#### Pergunta: “Quem deve criar um usuário?”

**Resposta transmitida:** não deve ser resultado de comunicação informal com tecnologia. O processo precisa envolver as áreas responsáveis e um procedimento local definido.

**O que esclarece:** o cadastro de usuário é um processo de governança, não mera tarefa administrativa técnica.

---

## 15. Limitações reconhecidas

A reunião reconhece, explícita ou implicitamente, as seguintes limitações:

1. **Relação entre MAPFRE Brasil e NTT:** não foi detalhada pelo instrutor.
2. **Arquitetura técnica das integrações:** não foram explicadas tecnologias, protocolos ou componentes de infraestrutura.
3. **Possibilidade de alteração de listas:** depende de cada lista; não existe regra única.
4. **Uso de documentos externos:** nem todas as companhias podem arcar com o custo de geração e envio por componentes externos.
5. **Tratamento de erros em operações diferidas:** depende atualmente da área de tecnologia.
6. **Exclusão física de terceiros:** não seria uma operação normal de produção; seria excepcional e realizada por tecnologia.
7. **Acesso parcial à informação:** pode não existir no início do projeto e ser necessário apenas quando a base de usuários crescer.
8. **Estrutura comercial:** sua complexidade depende do país e do porte da operação.
9. **Controles técnicos:** só podem ser configurados em pontos específicos dos processos, não em qualquer local desejado.
10. **Regras locais:** várias decisões dependem de definição da companhia local, incluindo bloqueio de alteração em dados verificados, uso de categorias, procedimento de criação de usuários e regras de documentos.

---

## 16. Riscos e desafios

### 16.1. Riscos explicitamente mencionados

- copiar configurações entre ambientes incompatíveis;
- não configurar causa de inabilitação para atividades que podem ser inabilitadas;
- modificar estruturas sem considerar vigência;
- cadastrar dados identificadores incorretos e não conseguir corrigi-los funcionalmente;
- usar “Outros” sem regra clara;
- criar catálogos sem utilidade futura;
- conceder permissões excessivas;
- criar usuários sem procedimento formal;
- executar tarefas pesadas online;
- traduzir termos de negócio sem validação adequada;
- controlar excessivamente operações por controles técnicos;
- utilizar palavras inadequadas em cláusulas ou textos;
- armazenar grande quantidade de documentos sem tipificação e meio documental adequado.

### 16.2. Desafios derivados do contexto

> **Análise derivada, não declaração literal dos participantes.**

- **Qualidade de dados na migração:** como dados de Terceiros possuem atributos imutáveis e podem vir de legados, a carga inicial exige validação forte.
- **Governança multinacional:** a existência de países, idiomas, estruturas comerciais e particularidades locais sugere necessidade de equilibrar padrões corporativos e adaptações locais.
- **Escalabilidade organizacional:** permissões que funcionam para um grupo inicial pequeno podem se tornar inadequadas quando a operação se abre para muitos usuários.
- **Sustentabilidade operacional:** a dependência de tecnologia para analisar erros de processos diferidos pode se tornar gargalo com aumento de volume.
- **Governança documental:** integração com gestor documental e compositor exige disciplina de templates, destinatários, tipos documentais e custos.

---

## 17. Relações de causa e efeito reconstruídas

### 17.1. Configuração sem contexto

```text
Cópia de tabelas entre sistemas ou ambientes
↓
Atributos herdados sem significado no destino
↓
Incoerência com o modelo de Terceiros ou com módulos dependentes
↓
Falhas de validação ou comportamento funcional inadequado
↓
Necessidade de configuração baseada no significado de cada atributo
```

### 17.2. Mudança sem vigência

```text
Alteração de produto, atividade ou regra sem avaliar validade
↓
Dúvida sobre apólices, carteira e registros anteriores
↓
Tratamento inconsistente de dados históricos
↓
Necessidade de analisar efeitos temporais antes da implementação
```

### 17.3. Controle excessivo

```text
Desejo de revisar todas as situações
↓
Grande quantidade de controles técnicos
↓
Fila de auditorias e aprovações
↓
Perda de eficiência operacional
↓
Necessidade de priorizar controles relevantes
```

### 17.4. Acesso genérico

```text
Acesso a programa sem restrição de atividade ou informação
↓
Usuários visualizam ou alteram o que não lhes compete
↓
Risco operacional e de governança
↓
Necessidade de papéis, atividades e restrições de informação parcial
```

---

## 18. O que a reunião não permite concluir

A transcrição não permite determinar com segurança:

- qual banco de dados é usado, embora haja menção a estruturas “Oracle” em contexto técnico;
- qual infraestrutura de cloud, on-premises ou híbrida suporta a plataforma;
- uso de contêineres, Kubernetes, máquinas virtuais ou orquestração;
- protocolos de integração entre módulos e sistemas externos;
- mecanismos de IAM, autenticação, autorização técnica ou segregação de funções em nível de infraestrutura;
- modelo de auditoria, logs, observabilidade, monitoramento ou alertas;
- SLAs, RTO, RPO, estratégia de backup ou disaster recovery;
- arquitetura de CI/CD, ambientes, versionamento ou estratégia de releases;
- padrões de mensageria, eventos ou processamento assíncrono;
- estrutura formal de squads, papéis ágeis ou gestão de produto;
- responsáveis nominais por decisões;
- cronograma ou roadmap com datas;
- escopo exato da operação brasileira;
- status da migração entre legado, “Tron Web”, “Neutron” e “Rift Core/Riscor”;
- critérios legais específicos de prevenção à lavagem de dinheiro, tratamento de pessoas politicamente expostas, documentos ou restrições de risco;
- regras exatas de cálculo de comissões, fidelização, prémios ou resseguro.

---

## 19. Principais conclusões

1. **Comuns e Terceiros são domínios estruturantes.** Suas definições propagam efeitos para o restante da plataforma.
2. **Não há configuração segura por simples replicação.** Tabelas, atributos, catálogos e parâmetros precisam ser compreendidos no contexto funcional e técnico de destino.
3. **Vigência é um elemento central de implementação.** Toda mudança deve ser analisada em relação à carteira e aos registros históricos.
4. **A estrutura de produtos é uma das áreas mais dinâmicas.** Ela organiza ramos, modalidades, coberturas e conceitos econômicos, e possui forte relação com emissão e demais processos.
5. **Segurança é granular.** Papéis de programa, atividades, empresas, informação parcial e controles técnicos representam dimensões diferentes de autorização.
6. **Dados de Terceiros exigem alta qualidade desde a origem.** Alguns atributos identificadores não podem ser alterados funcionalmente depois da inclusão.
7. **Documentos são parte da operação, não apenas anexos.** Eles podem ser requisitos de entrada, notificações de saída e objetos de integração com sistemas documentais.
8. **Controles técnicos precisam ser governados.** Seu objetivo é reduzir risco, não criar filas indiscriminadas de revisão.
9. **A configuração precisa ter propósito operacional e analítico.** Catálogos só produzem valor quando seus valores são usados de forma consistente.
10. **O conhecimento das equipes precisa ser transversal.** Produtos, comercial, terceiros, emissão, sinistros, reasseguro, documentos, contabilidade e segurança fazem parte de uma mesma cadeia funcional.

---

## 20. Mensagem final da reunião

A mensagem de encerramento é inequívoca: a plataforma deve ser compreendida como um sistema integrado. Não é adequado definir produtos sem considerar comercial, sinistros, segurados, cosseguro, resseguro e demais impactos. Da mesma forma, decisões em Terceiros podem afetar emissão, e definições de sinistros podem exigir mudanças em cadastros, documentos ou regras de negócio.

> **Leitura final:** a reunião defende uma implementação orientada por relações entre domínios, vigência, governança e entendimento funcional profundo. O maior risco não é apenas um erro de configuração isolado, mas a criação de soluções locais que ignorem os efeitos sistêmicos de cada definição.
