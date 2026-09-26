# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `MicrosoftTeams-video.mp4`
**Data de processamento:** 25/09/2026 05:56:46
**Modelo de transcrição:** whisper.cpp Metal (base) — idioma: es
**Modo de Análise:** Com OCR + Visão Multimodal (Frames de Tela + Áudio)
**Modelo de Visão/IA:** LLM Gateway (gpt-5.6-terra)
**Prompt utilizado:** análise multimodal avançada (documentação funcional, OCR de telas, formulários, tabelas, arquitetura)

---

# Análise estruturada — Capacitação REEF/TRON: módulo de elementos comuns

> **Base documental:** transcrição automática (com trechos reconhecidamente ruidosos) e evidências visuais OCR de telas do portal MAPFRE.  
> **Rastreabilidade:** quando disponível, as referências usam os timestamps dos frames apresentados. Termos preservados em espanhol refletem a nomenclatura exibida no portal ou usada na sessão.

## 1. Síntese executiva

A reunião foi uma sessão teórica de capacitação sobre o módulo de **elementos comuns** do sistema TRON, dentro do portal de documentação REEF da MAPFRE. O foco principal foi o catálogo de **companhias/entidades do sistema** e, ao final, foram introduzidos os catálogos de **idiomas** e **moedas**.

A principal mensagem transmitida é que os elementos configurados no módulo de comuns são **transversais**: embora diversos atributos tenham efeitos mais perceptíveis em módulos como terceiros, emissão, sinistros, financeiro, comercial ou fidelização, sua definição ocorre no nível da companhia e pode influenciar o comportamento de toda a aplicação. Por isso, a configuração não deve ser tratada como um detalhe isolado de cada processo ou ramo.

O sistema foi apresentado como multicompanhia, multilíngue e multimoeda. Ele é entregue parcialmente sem conteúdo para que cada instalação local complete as configurações de acordo com suas necessidades, regras locais e contexto regulatório. Ao mesmo tempo, a sessão reforçou que essa flexibilidade exige governança: configurações inadequadas podem impedir o uso de funcionalidades ou causar comportamentos incoerentes entre componentes.

A apresentação não descreveu uma arquitetura técnica de infraestrutura, APIs, bancos de dados, cloud ou mensageria. Ela descreveu predominantemente uma **arquitetura funcional e de configuração**, baseada em catálogos comuns que orientam os módulos consumidores.

---

## 2. Contexto e antecedentes

A sessão foi iniciada como a primeira parte da formação sobre o módulo de **comunes**. O facilitador informou que as sessões têm caráter prioritariamente teórico: o objetivo não era demonstrar apenas operações de cadastro, alteração ou consulta, mas explicar:

- como o sistema foi concebido;
- o que ele permite ou não permite;
- qual é a finalidade de atributos existentes nos catálogos;
- como determinadas configurações afetam processos posteriores;
- quais usos parecem mais adequados conforme o contexto local.

Foi mencionada uma formação anterior sobre terceiros, realizada “em janeiro”, sem indicação suficiente do ano absoluto. A reunião atual prepararia o terreno para uma sessão posterior dedicada ao novo modelo de dados de terceiros.

A documentação é disponibilizada em um portal REEF, apresentado como repositório vivo de documentos e vídeos de formação. A intenção declarada é facilitar a compreensão e reduzir a necessidade de reconstruir conhecimento apenas pela experiência operacional.

### Evidência visual do portal

No frame de `11:00`, o portal mostra a documentação **“documentación reef”**, com:

| Campo | Valor exibido |
|---|---|
| Componente | documentación reef |
| Owner | map-capacitación |
| Lifecycle | wip |
| Versão exibida | 1.0.0 |
| Seções de capacitação | Infraestructura, Arquitectura, Metodología, Desarrollo e TRON |
| Navegação | Home, 01 TRON, 02 ARQUITECTURA e 99 SESION |

A presença do status `wip` sugere que a documentação estava em evolução naquele momento. Isso não permite concluir quais conteúdos já estavam completos ou homologados.

---

## 3. Objetivo da capacitação

A formação buscou transmitir um modelo mental sobre os catálogos comuns e seus impactos. O facilitador destacou que esses cadastros não são meras tabelas técnicas: cada atributo teria sido criado para uma finalidade funcional concreta.

Em termos práticos, a sessão orientou os participantes a:

1. entender a finalidade original das propriedades;
2. avaliar se elas se aplicam à realidade local;
3. evitar criar estruturas paralelas para informações que já possuem representação prevista no núcleo;
4. considerar os efeitos transversais de uma configuração;
5. respeitar as configurações já centralizadas ao construir soluções ou portais locais.

Também foi solicitado que os participantes respondessem a uma pesquisa de satisfação, apresentada como mecanismo para ajustar sessões futuras às necessidades do público.

---

## 4. Conceitos centrais apresentados

### 4.1. Elementos comuns como capacidade transversal

O módulo de comuns foi apresentado como um conjunto de definições reutilizáveis por todos os módulos da aplicação. Assim, ele não pertence exclusivamente a:

- emissão;
- sinistros;
- tesouraria;
- contabilidade;
- resseguros;
- terceiros;
- fidelização;
- qualquer outro módulo específico.

A consequência funcional é que uma decisão tomada nesse módulo pode repercutir em diversos processos. Por exemplo, uma configuração de captura de nomes, validação de identificadores, dias úteis ou moeda local não deve ser interpretada como uma preferência de um único ramo de seguros.

### 4.2. Configuração centralizada

A reunião reforçou repetidamente que diversas propriedades são definidas no nível da companhia. Isso significa que, conforme a explicação apresentada, elas se aplicam à entidade como um todo, e não seletivamente a apenas um ramo — por exemplo, automóveis, saúde ou acidentes.

A formulação recorrente foi que o sistema é “quase todo configurável”, com a ressalva explícita de que nem tudo necessariamente o é. Portanto, não se deve interpretar a sessão como garantia de configuração irrestrita.

### 4.3. Entrega parcialmente vazia

O sistema é entregue às instalações com um repositório de informação parcialmente sem conteúdo. Cada país ou companhia MAPFRE deve completar os dados necessários para sua instalação.

Isso estabelece uma relação de causa e efeito relevante:

```text
Sistema parametrizável e multicompanhia
↓
Instalação inicial parcialmente sem conteúdo
↓
Necessidade de preencher catálogos locais
↓
Dependência de regras regulatórias, comerciais e operacionais de cada país
↓
Necessidade de governança e entendimento funcional antes da configuração
```

---

## 5. Estrutura funcional apresentada

A seguir está uma consolidação analítica — não um diagrama literal exibido na reunião — da organização funcional descrita:

```text
Portal REEF / Documentação / Vídeos de capacitação
↓
TRON
↓
Módulo de elementos comuns
├── Definição de companhias/entidades
├── Definição de idiomas
├── Definição de moedas e câmbios
├── Estrutura geográfica
├── Atividades de terceiros
└── Outros catálogos comuns
↓
Módulos consumidores
├── Terceiros
├── Emissão
├── Sinistros
├── Financeiro e comercial
├── Resseguros
├── Fidelização
├── Usuários e permissões
└── Outros processos da aplicação
```

Essa estrutura indica um padrão de dependência funcional: os módulos consumidores devem respeitar as definições realizadas nos catálogos comuns. A transcrição não detalha como essa dependência é implementada tecnicamente — por exemplo, por chamadas de serviço, acesso a banco, eventos ou componentes compartilhados.

---

## 6. Solução documental REEF

A documentação REEF foi mostrada como o ponto de consulta para as definições funcionais do TRON.

No frame de `18:17`, a navegação visual indica o caminho:

```text
DOCUMENTACIÓN REEF
└── 01 TRON
    └── 01 Documentacion
        └── 01 Modulos
            └── 01 Comunes
                └── 01 Definicion
                    └── DEFINICION de Compania
```

A página exibida contém a documentação da definição de companhia, incluindo objetivo, propriedades gerais e propriedades operativas divididas por domínio.

### Interpretação contextual

A organização documental parece refletir uma tentativa de separar:

- conteúdo de capacitação;
- documentação por módulo;
- definições funcionais;
- material para consulta posterior.

Essa leitura é sustentada pelo uso do portal durante a sessão e pela recomendação de rever os vídeos quando surgirem dúvidas. Contudo, a transcrição não especifica o processo editorial, responsáveis pelas atualizações ou critérios de aprovação da documentação.

---

## 7. Catálogo de companhias / entidades do sistema

### 7.1. Finalidade

O núcleo do sistema permite codificar múltiplas companhias em um repositório específico. A documentação exibida afirma que podem ser definidas até **99 entidades** diferentes.

Cada entidade pode ser identificada por:

- código;
- chave;
- denominação ou texto descritivo;
- abreviatura;
- nome curto.

O facilitador exemplificou uma instalação que poderia conter companhia de seguros não vida, companhia de seguros vida e uma companhia financeira. Ao mesmo tempo, esclareceu que a existência de uma entidade financeira cadastrada não implica automaticamente que ela esteja integrada operacionalmente ou “trabalhe automaticamente” no sistema.

### 7.2. Limite quantitativo

| Item | Valor informado | Fonte |
|---|---:|---|
| Máximo de entidades configuráveis | 99 | Documentação visual em `18:17`; fala da sessão |

A fala automática reconhece em determinado trecho “90 y 90idades”, mas a evidência visual é clara ao indicar **99** entidades. Portanto, 99 é a leitura com maior sustentação.

### 7.3. Agrupamento das propriedades

A documentação exibida apresenta os seguintes grupos:

| Grupo | Finalidade geral inferida do conteúdo |
|---|---|
| Propiedades Generales | Identificação e informações institucionais da entidade |
| Propiedades Operativas de Terceros | Regras para cadastro e tratamento de terceiros |
| Propiedades Operativas Financieras y Comerciales | Comportamentos financeiros, comerciais e dados bancários/fiscais |
| Propiedades Operativas de Emisión | Regras relacionadas à emissão e contratos |
| Propiedades Operativas de Siniestros | Regras relacionadas a sinistros |
| Propiedades Operativas Plan de Fidelización | Regras do plano de fidelização |
| Resto Propiedades Operativas | Propriedades não enquadradas nas categorias anteriores |

Essa classificação não substitui a estrutura física de tabelas. O facilitador explicou que ela foi pensada para abstrair o nível técnico e organizar atributos conforme sua finalidade funcional.

---

## 8. Propriedades gerais da companhia

### 8.1. Chave e código de identificação

Esses atributos indicam a forma de identificação tributária usada localmente em cada país.

A documentação usa a Espanha como exemplo:

- **NIF** para identificação fiscal;
- **DNI** para pessoas físicas;
- **NIE** para estrangeiros;
- **CIF** como antecedente histórico para pessoas jurídicas.

O facilitador citou também, de forma exemplificativa, o RUT no Chile. Esses exemplos não significam que todos os países devam usar a mesma estrutura documental; a regra apresentada é justamente a adequação ao padrão local.

### 8.2. Chave de identificação patronal

A chave patronal identifica a entidade conforme a legislação do país em que a companhia está estabelecida. O facilitador a relacionou a códigos atribuídos por reguladores para entidades que prestam serviços de seguros diretos ou resseguros.

O ponto central foi: esse atributo existe para representar uma identificação institucional/regulatória já existente, e não para justificar a criação de estruturas locais paralelas.

### 8.3. Chave de identificação societária

Essa propriedade identifica a chave contábil da companhia segundo diretrizes corporativas da MAPFRE.

A documentação informa que ela deve corresponder ao identificador da sociedade no sistema contábil corporativo, com exemplos:

| Sociedade | Código exibido |
|---|---:|
| Mapfre España | 0002 |
| Mapfre Paraguay Seguros | 0233 |
| Mapfre Dominicana, S.A. | 0378 |

Não foram detalhados o nome, arquitetura ou processo de integração do sistema contábil corporativo.

### 8.4. Razão social

A razão social representa o nome pelo qual a entidade ou sociedade mercantil MAPFRE está registrada local e legalmente.

### 8.5. Estrutura geográfica

A estrutura geográfica deve ser definida previamente e, depois, atribuída à companhia. A sequência funcional apresentada foi:

```text
Definir estrutura geográfica
↓
Atualizar catálogo de companhias
↓
Associar a estrutura à razão social da entidade
↓
Usar a estrutura nos processos que dependem da localização
```

O facilitador ressalvou que a ordem não deve ser confundida com uma exigência genérica de preenchimento técnico de todos os campos. A explicação procurou destacar dependências funcionais entre catálogos.

### 8.6. Endereço, telefone e fax

O catálogo permite registrar:

- endereço postal da sede social;
- caixa postal;
- prefixo telefônico do país;
- código de área;
- telefone;
- fax.

A documentação observa que nem todos os países exigem código de área para conexões telefônicas.

### 8.7. Nome e sobrenome do CEO

Existem atributos para identificar o nome e os sobrenomes do principal responsável pela companhia. O facilitador não afirmou que esses campos são necessariamente usados hoje em todos os países ou processos; ele deu como hipótese o uso em documentos que eventualmente precisem trazer a assinatura ou os dados do responsável.

Portanto, a existência do campo não comprova uso operacional atual.

### 8.8. Moeda do país

A companhia possui uma moeda local identificada por código ISO. Foram citados como exemplos:

- Honduras: lempira;
- Espanha e Portugal: euro;
- México: peso mexicano;
- Chile: peso chileno.

A moeda local da companhia não torna o sistema obrigatoriamente monomoeda. A solução foi apresentada como multimoeda, desde que as moedas e respectivas relações de câmbio sejam configuradas.

### 8.9. Companhia de resseguro externo

A documentação identifica um atributo associado ao sistema corporativo de resseguros **RE21**. A transcrição automática alterna entre “RE21”, “reventuuno” e termos semelhantes; a evidência visual do frame usa explicitamente **RE21**.

O facilitador explicou que a marca permite distinguir instalações que usam esse sistema corporativo de resseguros das que não o usam localmente. Como exemplos, afirmou que Peru utilizaria RE21 e que México não o utilizaria naquele contexto.

Não foram apresentados:

- mecanismo de integração;
- interfaces;
- sincronização de dados;
- responsabilidades operacionais;
- critérios para habilitar ou desabilitar a marca.

### 8.10. Feriados laboráveis

Dois atributos permitem indicar se sábado e domingo são dias não úteis. O exemplo dado foi o de processos relacionados à falta de pagamento ou cancelamento de apólices, nos quais pode ser relevante calcular prazos em dias corridos ou úteis.

A configuração parece permitir definir se fins de semana devem ser considerados em determinados cálculos de prazo. A transcrição não esclarece quais processos consomem automaticamente essa informação nem se existe calendário de feriados nacionais ou regionais além de sábado e domingo.

### 8.11. Atividade que identifica a entidade

A entidade possui um código de atividade associado no novo modelo de terceiros. A sessão indica que:

- terceiros podem ser pessoas físicas ou jurídicas;
- são identificados por atividades;
- atividades ajudam a determinar o que cada terceiro pode fazer ou representar no sistema;
- companhias de seguros possuem uma atividade própria nesse modelo;
- bancos e agências bancárias passaram a ter atividades próprias no novo modelo.

O facilitador indicou que a entidade/companhia seria identificada pela atividade **39** e que, no novo modelo, bancos seriam identificados pela atividade **40**. Essa informação foi apresentada oralmente e não foi confirmada pela evidência visual compartilhada.

---

## 9. Propriedades operativas de terceiros

### 9.1. Tratamento e pós-nome

O sistema pode ser configurado para capturar tratamentos — como “Don”, “Doña”, “Señor” ou equivalentes — e sufixos ou pós-nomes, como “Junior” ou “Jr.”.

A finalidade apresentada é acomodar convenções locais de nomenclatura. A configuração ocorre no nível da companhia e, portanto, teria alcance transversal para os processos da entidade.

### 9.2. Captura de sobrenomes de pessoas físicas

A propriedade permite modular a captura de primeiro e segundo sobrenome em campos separados.

O facilitador explicou que isso atende diferenças entre países. O exemplo foi o contraste entre países em que as pessoas físicas usualmente possuem dois sobrenomes e o contexto norte-americano, no qual poderia haver apenas um.

A orientação prática foi que componentes e soluções locais devem respeitar essa configuração centralizada. Caso um portal local seja criado, ele deveria consultar ou obedecer a essas regras, em vez de impor comportamento independente.

### 9.3. Nome composto

A propriedade regula a captura de nomes compostos em dois campos separados, como “José Ramón”.

O problema de negócio explicado foi a qualidade e a consistência do dado: diferentes formas de registrar a mesma pessoa dificultam consultas, contagens e identificação. Foram citadas variações como abreviações e grafias divergentes para ilustrar como uma mesma pessoa poderia aparecer de múltiplas formas.

O facilitador também mencionou que hoje existem algoritmos e processos que podem ajudar na unificação de informação, mas não especificou quais são esses algoritmos nem se fazem parte do núcleo do sistema.

### 9.4. Exibição do segundo sobrenome

A configuração pode habilitar ou desabilitar a captura ou apresentação do segundo sobrenome, conforme o padrão cultural ou regulatório de cada país.

### 9.5. RGPD e ferramenta de RGPD

A sessão mencionou uma propriedade para indicar se a companhia deve considerar um regulamento local relacionado à proteção de dados pessoais e qual seria a tipologia da ferramenta correspondente.

A transcrição utiliza “R.G.P.D.”, aparentemente como referência ao regime de proteção de dados. Contudo, a reunião não detalhou:

- quais obrigações são atendidas;
- qual ferramenta é usada;
- como consentimentos, direitos dos titulares ou retenção são tratados;
- se há integração com uma solução corporativa;
- se a propriedade produz controles automatizados.

### 9.6. Código postal versus endereço postal

A configuração permite escolher uma entre duas abordagens de captura:

1. capturar primeiro o código postal e preencher ou orientar o restante do endereço;
2. capturar primeiro informações de endereço e derivar ou informar o código postal posteriormente.

O facilitador destacou que não se trata de habilitar simultaneamente os dois fluxos para uma mesma configuração: a marca indicaria uma possibilidade ou outra.

### 9.7. Extensão postal

Caso a estrutura geográfica e o código postal não sejam suficientes, existe uma marca para habilitar informação postal adicional.

A transcrição não detalha o formato, tamanho, obrigatoriedade ou processos consumidores dessa extensão.

### 9.8. Duplicidade de terceiros entre companhias

Em instalações multicompanhia, pode haver uma configuração para replicar automaticamente alterações de um terceiro entre todas as companhias do sistema.

O exemplo utilizado foi o de uma pessoa que muda de endereço e possui relação com três entidades diferentes — seguro de vida, seguro não vida e financeira. Em vez de alterar o endereço três vezes, a atualização poderia ser propagada.

Isso sugere uma capacidade de compartilhamento ou replicação de dados mestres entre companhias. A reunião não esclarece:

- se a replicação é imediata ou agendada;
- se há exceções por companhia;
- como conflitos são resolvidos;
- se há trilha de auditoria;
- se a funcionalidade é configurável por tipo de dado ou apenas globalmente.

### 9.9. Identificação de terceiros duplicados

A propriedade pode verificar, no cadastro de um terceiro, se a pessoa já existe com outro tipo e número de documento.

O exemplo foi uma pessoa cadastrada anteriormente com passaporte e posteriormente incluída com NIF. O objetivo é alertar para possível duplicidade, reduzindo a criação de registros repetidos.

O facilitador ressalvou que essa é uma medida preventiva inicial e que podem existir algoritmos ou processos adicionais para limpeza e melhoria da qualidade de dados.

### 9.10. Identificador único de terceiros

Foi mencionada a possibilidade de um terceiro possuir uma chave única. A sessão descreveu dois níveis de configuração:

```text
Nível da companhia
↓
Define se a funcionalidade pode existir para atividades de terceiros
↓
Nível da atividade do terceiro
↓
Define se aquela atividade específica utilizará ou não chave única
```

O exemplo citado foi a consulta de um agente por um identificador próprio, sem necessidade de informar o tipo e o número do documento.

### 9.11. Informação parcial e visibilidade por perfil

A sessão afirmou que TRON Web e “Nitron” — grafia incerta devido à transcrição — permitem restringir a visualização de informações conforme o papel do usuário.

O exemplo foi o de um usuário que precisa consultar apólices de agentes, mas não deve visualizar valores de comissão. A configuração é descrita como um segundo nível:

| Nível | Papel informado |
|---|---|
| Companhia | Define a possibilidade geral de restrição |
| Módulo de usuários / usuário | Define o que cada perfil pode visualizar |

A reunião não detalhou tecnologia de identidade, autenticação, autorização, papéis predefinidos, segregação de funções ou auditoria de acesso.

---

## 10. Propriedades financeiras e comerciais

### 10.1. Funcionários de agentes

O sistema pode permitir identificar funcionários de agentes. A utilidade citada está relacionada à emissão e à identificação de quem emitiu ou intermediou determinada operação, considerando estruturas comerciais, acordos e tipos de agentes.

A transcrição não apresenta o modelo de dados desses funcionários, sua relação contratual, nem regras de remuneração.

### 10.2. Formato de conta corrente

Há uma propriedade para definir o formato esperado de contas bancárias no cadastro de terceiros, como IBAN, SWIFT ou outro padrão local.

A finalidade é orientar validações na captura da informação bancária. Não foi detalhado se a validação é apenas de formato, se ocorre validação bancária externa ou se há verificação de titularidade.

### 10.3. Tipo de IVA

A propriedade permite decidir se determinados terceiros ou atividades terão informação de tipo de IVA capturada.

O exemplo apresentado buscou mostrar que condições tributárias podem variar conforme localidade. Foram citadas, de maneira ilustrativa:

- Chihuahua, no México;
- quinta região e Santiago, no Chile.

A fala não deve ser interpretada como uma regra tributária formal para essas localidades. O ponto funcional é que o sistema pode capturar ou não essa informação conforme a configuração da companhia e das atividades aplicáveis.

### 10.4. Atividade padrão na separação de emissão

Foi mencionada uma propriedade relacionada à obtenção de dados de um terceiro a partir de outro, considerando uma atividade padrão. O exemplo dado foi copiar informações de um segurado para facilitar a inclusão de outro, especialmente em apólices coletivas nominadas.

A transcrição é pouco clara quanto ao nome exato da propriedade — reconhecida como algo próximo de “propiedad de separación de la emisión”. Portanto, não é possível determinar sua denominação técnica com segurança.

---

## 11. Propriedades de emissão

### 11.1. Comprimento de textos anexos e cláusulas

Foram citados atributos que definem ou limitam o tamanho máximo de textos anexos e cláusulas em processos de emissão de apólices e contratos.

O facilitador classificou essa capacidade como possivelmente antiga, mas explicou sua origem funcional: controlar o tamanho permitido para textos contratuais complementares.

### 11.2. Limite de prêmios

O sistema pode definir limites de prêmios vigentes associados a pessoas físicas ou jurídicas. O exemplo foi a geração de alerta quando um segurado ou empresa atinge um volume de prêmios que demande análise adicional, inclusive para fins de prevenção a fraude ou cumprimento de procedimentos internos.

Pontos relevantes:

- o limite não se refere necessariamente a uma única apólice;
- pode considerar a carteira total associada à pessoa;
- a pessoa pode participar como tomador, beneficiário, segurado, pagador ou outra função;
- a marca gera alerta, mas não substitui o processo local de análise;
- a reunião não informou valores reais de limite nem regras formais de investigação.

---

## 12. Propriedades de sinistros

A sessão mencionou propriedades associadas a sinistros, embora sem aprofundamento.

Entre os comportamentos citados:

- definição do programa ou comportamento relacionado à abertura de sinistros ou expedientes;
- consideração da oficina tramitadora ou da oficina emissora no contexto de controles técnicos;
- captura ou associação de sinistro no registro de faturas, em um submódulo relacionado.

O facilitador reconheceu que esse conteúdo seria visto mais adiante. Assim, a reunião não permite concluir:

- quais programas específicos são chamados;
- quais controles técnicos existem;
- quais regras definem oficina emissora versus tramitadora;
- como faturas e sinistros são integrados;
- se essas propriedades ainda são plenamente utilizadas na versão atual.

---

## 13. Plano de fidelização

A reunião citou propriedades operativas de um plano de fidelização, aparentemente disponíveis em “Neutron” ou “Nitron” — o nome não é suficientemente claro na transcrição.

Foram mencionados:

- moeda do plano, identificada por código ISO;
- número mínimo de “tréboles” para permitir resgate;
- número máximo de “tréboles” que podem ser usados em um pagamento.

Os “tréboles” foram descritos como uma moeda fictícia ou unidade de fidelização acumulada por clientes e potencialmente utilizada para pagar parte ou todo o valor de recibos.

Exemplo conceitual apresentado:

```text
Cliente acumula tréboles
↓
É necessário atingir um mínimo para realizar resgate
↓
Mesmo que o cliente possua saldo alto, pode existir teto máximo de resgate por pagamento
↓
O recibo pode ser total ou parcialmente compensado com tréboles
```

A reunião não detalhou como esses pontos são acumulados, em quais campanhas, quais produtos participam, nem como ocorre a contabilização financeira do benefício.

---

## 14. Catálogo de idiomas

O sistema foi apresentado como multilíngue. Um usuário poderia, por exemplo, visualizar etiquetas do sistema em inglês enquanto outro usuário, na mesma companhia, visualizaria em espanhol.

O catálogo de idiomas serve para codificar:

- código do idioma;
- descrição;
- abreviatura;
- representação em diferentes idiomas, conforme a explicação.

A sessão também mencionou a possibilidade de uma apólice ou condições particulares serem produzidas em outro idioma. Contudo, o facilitador alertou que cadastrar o idioma não basta: seria necessário que a companhia configurasse adequadamente o fluxo e encaminhasse a informação ao componente responsável por compor ou imprimir o documento.

### Implicação importante

```text
Idioma cadastrado no catálogo
≠
Garantia automática de documento gerado naquele idioma
```

A geração documental dependeria de configuração adicional, não detalhada na sessão.

---

## 15. Catálogo de moedas e modelo multimoeda

### 15.1. Conceito geral

O sistema foi apresentado como multimoeda. As moedas podem ser usadas, entre outros contextos citados, para:

- cálculo de prêmios;
- associação de apólices;
- gestão de sinistros;
- pagamento ou liquidação de expedientes;
- liquidação de comissões de agentes.

A moeda local, definida no catálogo de companhia, é o ponto de referência para relações de câmbio.

### 15.2. Atributos de moeda

A reunião mencionou:

| Atributo | Finalidade |
|---|---|
| Código ISO da moeda | Identificação padronizada da moeda |
| Descrição | Nome ou descrição da moeda |
| Número de decimais | Precisão geral da moeda no sistema |
| Indicador de moeda real ou não real | Diferencia moeda convencional de unidade de referência/indexação |
| Tipo de câmbio | Relação com a moeda local da companhia |
| Data e horário do câmbio | Momento de vigência do valor de câmbio |

Foi citado explicitamente o padrão **ISO 4217**. O facilitador reforçou que não se deve utilizar códigos arbitrários como “ABC” ou sequências numéricas internas no lugar de códigos ISO.

### 15.3. Decimais

O número de decimais pode ser definido de forma geral para uma moeda. O facilitador ressaltou que isso não impede que determinados ramos tenham cálculos de prêmio com precisão diferente, se o sistema oferecer essa capacidade em outro nível.

Portanto, a configuração geral de moeda não foi apresentada como necessariamente a única regra de precisão em todos os cálculos.

### 15.4. Moedas não físicas e unidades indexadas

Foram apresentados exemplos de unidades que não têm necessariamente cédulas ou circulação física, mas podem ser usadas como referência de valor, como:

- UF no Chile;
- unidade de fomento no Peru;
- unidades de investimento no México.

A fala mencionou também a possibilidade de contextos inflacionários levarem ao uso de unidades indexadas. O objetivo seria manter preços referenciados em uma unidade estável, enquanto o valor equivalente em moeda local varia conforme o câmbio ou índice.

O exemplo apresentado foi conceitual: um imóvel poderia continuar precificado em determinada quantidade de unidades, ainda que o equivalente em moeda local variasse ao longo do tempo.

### 15.5. Tipos de câmbio

O tipo de câmbio é registrado em relação à moeda local da companhia. A sessão destacou dois pontos:

1. pode haver um único câmbio para uma data/hora específica;
2. como a data pode incluir hora, minuto e segundo, pode haver mais de uma cotação no mesmo dia, desde que os momentos sejam distintos.

O facilitador alertou que outras configurações poderiam restringir a granularidade temporal. Assim, caso a companhia configure uma regra que não aceite horários, poderia ficar limitada a uma cotação por dia.

### 15.6. Carga de cotações

Foi dito explicitamente que o núcleo não possui, pelo menos no cenário descrito, um processo pronto que consulte automaticamente um banco central para obter e carregar taxas de câmbio.

A responsabilidade pela carga pode pertencer a uma área financeira ou administrativa, seja:

- manualmente;
- por processo local desenvolvido pela entidade.

A reunião não detalhou validações, aprovações, fontes autorizadas, periodicidade, trilha de auditoria ou mecanismos de contingência para ausência de cotação.

---

## 16. Perguntas e respostas relevantes

### Pergunta: como associar um banco a uma função de credor hipotecário?

Um participante identificado como **Ernesto** perguntou como uma atividade de banco poderia ser associada a um contexto como o de credor hipotecário.

### Resposta dada

O facilitador explicou que era importante não misturar conceitos:

- em TRON Web, existiria uma tabela específica de bancos;
- no processo de emissão, para uma determinada atividade, haveria uma tipologia de beneficiário que permite identificar o credor hipotecário;
- no novo modelo de terceiros, bancos passariam a ter atividade própria;
- criar uma nova tipologia não faria o núcleo reconhecer automaticamente o comportamento esperado, pois haveria dados do núcleo que não devem ser alterados livremente.

Também explicou que, em apólices de habitação associadas a crédito bancário, o banco pode ser solicitado como interveniente ou credor hipotecário, desde que o produto ou ramo esteja configurado para isso.

### O que a resposta esclarece

A resposta revela três pontos importantes:

1. **atividade, tipologia e papel na apólice não são necessariamente a mesma coisa**;
2. há diferenças entre o comportamento de TRON Web e o novo modelo de terceiros;
3. parte do comportamento está embutida em dados de núcleo, não sendo seguro pressupor que novas parametrizações locais reproduzirão automaticamente as regras existentes.

### Limitação da resposta

A resposta não detalhou:

- qual tabela específica de bancos existe;
- qual é o identificador técnico da tipologia de credor hipotecário;
- quais dados são considerados de núcleo;
- quais permissões ou procedimentos seriam necessários para uma alteração.

---

## 17. Números e indicadores citados

| Indicador | Valor mencionado | Contexto |
|---|---:|---|
| Máximo de entidades do sistema | 99 | Catálogo multicompanhia |
| Código societário Mapfre España | 0002 | Exemplo de identificação contábil corporativa |
| Código societário Mapfre Paraguay Seguros | 0233 | Exemplo de identificação contábil corporativa |
| Código societário Mapfre Dominicana, S.A. | 0378 | Exemplo de identificação contábil corporativa |
| Atividade de companhia no novo modelo de terceiros | 39 | Informação oral; não confirmada visualmente |
| Atividade de bancos no novo modelo de terceiros | 40 | Informação oral; não confirmada visualmente |
| Exemplo de prazo | 45 dias | Ilustração de cálculo considerando dias úteis/não úteis |
| Exemplo de mínimo de tréboles | 20 | Exemplo ilustrativo, não confirmado como regra produtiva |
| Exemplo de máximo de tréboles | 100 | Exemplo ilustrativo, não confirmado como regra produtiva |
| Exemplo de limite de prêmio pessoa física | 1.500 ou 5.000 euros | Valores hipotéticos falados, não regra definida |
| Exemplo de limite de prêmio empresa | 50.000 euros | Valor hipotético falado, não regra definida |

> Os números de tréboles e limites de prêmio foram usados como exemplos didáticos. A reunião não permite tratá-los como parâmetros oficiais.

---

## 18. Limitações reconhecidas durante a sessão

A reunião reconheceu explicitamente ou indicou as seguintes limitações:

- nem todos os elementos comuns estavam documentados no portal naquele momento;
- a documentação seria complementada ao longo do tempo;
- alguns conteúdos, especialmente sinistros e o novo modelo de terceiros, seriam aprofundados em sessões futuras;
- a existência de um atributo não garante que ele seja utilizado atualmente por todas as companhias;
- a configuração de idioma, isoladamente, não garante geração documental no idioma desejado;
- a definição de moeda local não impede operações multimoeda, mas exige configuração coerente de moedas e câmbios;
- o núcleo não possui processo pronto mencionado para buscar taxas de câmbio automaticamente em bancos centrais;
- determinadas regras são de núcleo e não deveriam ser alteradas simplesmente por criação de dados locais;
- algumas funcionalidades podem depender da configuração específica de país, companhia, ramo ou produto;
- a sessão não apresentou todas as propriedades de sinistros nem confirmou a atualidade de algumas delas.

---

## 19. Riscos e desafios

### 19.1. Riscos explicitamente sustentados pela reunião

| Risco | Consequência potencial descrita ou inferida diretamente |
|---|---|
| Configuração inadequada de atributos comuns | Perda ou limitação de funcionalidades disponíveis |
| Soluções locais que ignorem a configuração central | Incoerência de comportamento entre portais, módulos e processos |
| Cadastro inconsistente de nomes e sobrenomes | Duplicidade, dificuldade de consulta e baixa qualidade de dados |
| Cadastro com documentos distintos para a mesma pessoa | Duplicidade de terceiros |
| Configuração incorreta de câmbio e granularidade temporal | Impossibilidade de registrar as cotações necessárias |
| Criação livre de dados que deveriam ser de núcleo | Comportamentos não reconhecidos automaticamente pelo sistema |
| Tratamento inadequado de dados pessoais | Necessidade de considerar requisitos locais de proteção de dados |
| Falta de configuração de feriados/fins de semana | Cálculos de prazo potencialmente incompatíveis com regras operacionais |

### 19.2. Desafios derivados do contexto — análise

A sessão indica um desafio relevante de governança: o sistema oferece alta capacidade de parametrização, mas essa flexibilidade aumenta a responsabilidade das equipes locais.

Uma leitura possível é que a qualidade da implantação não depende apenas de conhecimento técnico. Ela depende também de:

- conhecimento regulatório local;
- entendimento de processos de seguros;
- domínio de modelos de terceiros;
- disciplina de dados mestres;
- alinhamento entre negócio, configuração e soluções locais;
- uso consistente da documentação.

Essa é uma inferência analítica baseada na ênfase dada à configuração, à transversalidade dos catálogos e aos riscos de uso incoerente.

---

## 20. Transformações identificadas — camada analítica

### 20.1. De cadastro local isolado para dado mestre compartilhado

A funcionalidade de replicar alterações de terceiros entre companhias aponta para uma direção de compartilhamento de dados mestres em ambiente multicompanhia.

```text
Várias companhias no mesmo sistema
↓
Mesmo terceiro pode se relacionar com mais de uma entidade
↓
Atualizações repetidas geram esforço e inconsistência
↓
Configuração pode permitir replicação entre companhias
↓
Direção de centralização ou sincronização de dados mestres
```

A reunião não confirma se há um cadastro mestre único ou apenas mecanismos de replicação configurável. Essa distinção é importante e permanece em aberto.

### 20.2. De regras distribuídas para configuração central

A insistência em respeitar atributos de companhia sugere uma busca por concentrar regras comuns em um único ponto de configuração.

Exemplos apresentados:

- nomes e sobrenomes;
- códigos postais;
- moeda;
- dias úteis;
- tratamento de dados de terceiros;
- visibilidade de informação;
- validações bancárias;
- duplicidades.

Isso reduz a necessidade de cada componente decidir independentemente como se comportar. Porém, o ganho só ocorre se todos os consumidores respeitarem as configurações centralizadas.

### 20.3. De modelo de terceiros genérico para segmentação por atividade

A explicação sobre bancos, companhias e agências bancárias indica uma evolução no modelo de terceiros, com atividades mais específicas.

A sessão sugere que o novo modelo procura diferenciar melhor:

- segurados;
- tomadores;
- beneficiários;
- condutores;
- bancos;
- companhias;
- agências;
- intermediários;
- outros terceiros.

Não foram detalhados o modelo de transição, migração de dados ou coexistência entre estruturas antigas e novas.

### 20.4. De operação monolíngue e monomoeda para suporte internacionalizado

A combinação de suporte multilíngue, multicompanhia, multimoeda, estruturas geográficas e identificações locais aponta para uma plataforma destinada a operar em múltiplos países e contextos regulatórios.

A reunião deixa claro, contudo, que internacionalização não é automática: cada país precisa configurar catálogos e regras adequadamente.

---

## 21. O que a reunião não permite concluir

A sessão não fornece detalhe suficiente para determinar com segurança:

- tecnologia de infraestrutura, cloud, servidores ou containers;
- banco de dados utilizado;
- modelo de APIs, mensageria ou eventos;
- integrações técnicas com RE21;
- integrações técnicas com o sistema contábil corporativo;
- arquitetura do portal REEF;
- mecanismo físico de armazenamento dos catálogos;
- modelo de IAM, autenticação ou SSO;
- catálogo completo de papéis e permissões;
- trilha de auditoria para alterações de configuração;
- processo de aprovação de mudanças em propriedades corporativas;
- estratégia de backup, recuperação de desastre ou alta disponibilidade;
- processo de CI/CD;
- SLA, suporte, incidentes, hotfixes ou releases;
- governança de qualidade dos dados;
- regras completas de RGPD ou ferramenta associada;
- critérios para ativar a replicação de terceiros entre companhias;
- comportamento diante de conflitos em atualizações replicadas;
- origem oficial e frequência de carga de câmbio;
- modelo de cálculo de câmbio em transações;
- roadmap formal do REEF, TRON ou novo modelo de terceiros;
- cronograma da continuação da formação, além da indicação de que ela ocorreria na semana seguinte.

---

## 22. Conclusões

A sessão estabeleceu que o módulo de elementos comuns é uma camada funcional de alto impacto no TRON. O catálogo de companhias concentra definições institucionais, regulatórias e operacionais que repercutem em terceiros, emissão, sinistros, finanças, comercial, resseguro e fidelização.

A configuração deve ser compreendida como uma responsabilidade de negócio e tecnologia. Ela precisa refletir a realidade de cada companhia e país, mas sem criar regras paralelas para capacidades já previstas pelo núcleo.

A documentação REEF foi posicionada como fonte de consulta e capacitação contínua. A reunião também evidenciou que o conhecimento necessário para operar a solução não está limitado a telas de cadastro: envolve entender o propósito dos atributos, suas dependências e os efeitos de uma parametrização no ecossistema inteiro.

Por fim, a fala encerrou antes de concluir a explicação sobre a tabela de moedas e tipos de câmbio. A continuidade foi indicada para a semana seguinte, sem conteúdo adicional registrado nesta transcrição.
