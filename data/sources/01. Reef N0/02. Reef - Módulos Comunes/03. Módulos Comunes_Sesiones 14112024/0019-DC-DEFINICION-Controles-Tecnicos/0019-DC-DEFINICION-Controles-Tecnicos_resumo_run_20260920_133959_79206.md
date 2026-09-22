# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `0019-DC-DEFINICION-Controles-Tecnicos.mp4`
**Data de processamento:** 20/09/2026 13:44:06
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada — Controles Técnicos em sistema segurador

> **Base documental:** transcrição de treinamento/apresentação em espanhol, aparentemente gerada por reconhecimento automático de voz.  
> **Escopo:** controles técnicos dinâmicos, autorização, rastreabilidade, configuração, lógica de negócio e uso em operações de seguros.  
> **Nota de fidelidade:** o nome do sistema foi transcrito como **“riscor”**. Não há evidência suficiente para corrigir essa grafia; ele será referido neste documento como **sistema/núcleo segurador** quando não for necessário usar o nome.

---

## 1. Síntese executiva

A reunião apresenta a funcionalidade de **controles técnicos** em um núcleo operacional de seguros. Esses controles são mecanismos dinâmicos de validação de regras de negócio que podem ser acionados durante a execução de operações, especialmente em processos de **emissão de apólices**, **contratos**, **sinistros**, **prestações** e, em determinados casos, **resseguro**, **inspeções** e **documentos de entrada**.

A explicação diferencia claramente os controles técnicos de validações estruturais ou estáticas do sistema. As validações estáticas são obrigatórias e intrínsecas ao modelo de dados — por exemplo, uma apólice precisa ter datas coerentes, um sinistro precisa estar associado a uma apólice e determinados campos exigem tipos de dados específicos. Já os controles técnicos permitem que áreas de negócio, especialmente áreas técnicas, criem regras variáveis conforme produto, risco, período, localização, canal, estrutura comercial ou outros atributos disponíveis no sistema.

A principal mensagem da sessão é dupla:

1. **Controles técnicos são uma ferramenta muito poderosa e amplamente utilizada**, capaz de suportar regras sofisticadas de subscrição, sinistros e governança operacional.
2. **Seu uso excessivo pode paralisar a operação.** Quando tudo exige autorização, os responsáveis podem passar a aprovar controles de forma mecânica, esvaziando o sentido da governança.

O mecanismo prevê três comportamentos possíveis:

- **Observação:** informa o usuário, mas não bloqueia nem retém a operação.
- **Rejeição:** impede a continuidade até que os dados que originaram o controle sejam corrigidos.
- **Auditoria:** retém a operação até que uma pessoa com nível de autorização adequado a aprove ou rejeite.

A reunião também detalha o modelo de configuração: catálogo de controles, tipos, domínios, níveis de salto, lógica Oracle, níveis de autorização, papéis específicos de controles técnicos e associação desses papéis aos usuários. A implementação técnica das regras depende de componentes Oracle — citados como pacotes, funções ou programas Oracle — desenvolvidos e mantidos pela equipe de tecnologia, enquanto o negócio define os critérios que devem ser controlados.

---

## 2. Contexto e antecedentes

A sessão parece fazer parte de um treinamento mais amplo sobre catálogos, parametrizações e módulos de uma aplicação seguradora. O expositor indica que os participantes já haviam visto uma “base” e uma “base ampliada” de catálogos fundamentais em dias anteriores.

Além dos controles técnicos, são mencionados como temas ainda pendentes:

- seleção digital de risco;
- seleção de riscos;
- **IQRF**, sigla explicada como incidências, queixas, reclamações e felicitações;
- processos de emissão;
- gestão de apólices e contratos;
- sinistros e prestações;
- resseguro;
- notificações;
- estruturas de produto e comercial;
- usuários, papéis e níveis de autorização.

A reunião não aprofunda esses temas paralelos. Eles aparecem apenas como contexto para posicionar a funcionalidade de controles técnicos dentro de um ecossistema maior de gestão seguradora.

---

## 3. Problema central discutido

O problema tratado é como uma seguradora pode aplicar regras de negócio variáveis e potencialmente complexas durante a execução de operações sem alterar as validações estruturais permanentes do núcleo.

A necessidade surge porque existem situações em que:

- uma regra não deve ser permanente para toda a instalação;
- uma condição depende de período, produto, cobertura, localidade, cliente, risco ou combinação de fatores;
- uma operação pode precisar de análise excepcional;
- a companhia deseja bloquear uma condição de negócio;
- a companhia precisa registrar a ciência do usuário ou exigir uma justificativa formal de aprovação;
- o critério deve variar por processo, estrutura de produtos ou estrutura comercial.

### Relação de causa e efeito apresentada

```text
Regras técnicas, comerciais, de subscrição ou de sinistros variam conforme contexto
↓
Validações estáticas do modelo não resolvem todos os cenários
↓
É necessário avaliar regras dinamicamente durante a operação
↓
A operação pode seguir, ser bloqueada ou depender de autorização
↓
O sistema utiliza controles técnicos configuráveis e lógica de negócio Oracle
```

---

## 4. Distinção fundamental: validações estáticas versus controles técnicos

## 4.1 Validações estáticas do sistema

As validações estáticas são descritas como validações que fazem parte da própria estrutura da aplicação e que não podem ser ignoradas, desativadas ou personalizadas por instalação.

Exemplos citados:

- não é possível existir um recibo sem uma apólice;
- não é possível abrir um sinistro sem uma apólice associada;
- toda apólice possui data de efeito;
- toda apólice possui data de vencimento;
- toda apólice possui agente associado;
- a data de vencimento deve ser igual ou posterior à data de efeito;
- códigos de gestor de cobrança, quadro de comissões e plano de pagamento devem estar de acordo com a parametrização vigente.

Essas regras existem porque o modelo de dados e os processos essenciais do sistema as exigem. O expositor as caracteriza como algo que não pode ser “obviado”, isto é, contornado.

## 4.2 Controles técnicos

Os controles técnicos são apresentados como validações ou regras **dinâmicas**, executadas em tempo de execução, tanto em operações online quanto em processos batch.

Eles podem ser definidos a partir de regras de negócio baseadas em dados já capturados ou registrados no sistema. Não devem depender de informações que o sistema não possui.

Exemplos citados:

- impedir, em determinado período, a contratação de veículos de um tipo transcrito como “SUV” ou “SV”;
- impedir a emissão de uma apólice empresarial com soma segurada acima de determinado limite para a cobertura de incêndio;
- impedir ou reter uma liquidação parcial de sinistro de danos materiais acima de determinado valor sem perícia prévia;
- avaliar se um segurado que passou a praticar parapente deve ser submetido a controle de risco;
- impedir ou condicionar operações conforme histórico de sinistralidade, agente associado ou outros critérios combinados.

> **Observação sobre transcrição:** o tipo de veículo aparece como “sv”, “sube” e formas similares. O contexto indica que se trata de uma categoria de veículo usada como exemplo, mas a grafia exata não pode ser determinada com segurança.

---

## 5. Solução apresentada

A solução consiste em uma estrutura de configuração e execução de controles técnicos composta por:

1. definição do controle técnico;
2. definição de características operacionais;
3. escolha da tipologia do controle;
4. definição de onde o controle será executado;
5. associação a lógica de negócio Oracle;
6. definição de domínio ou área de autorização;
7. definição de níveis de autorização;
8. criação de papéis específicos de controles técnicos;
9. associação de usuários a esses papéis;
10. especialização do poder de autorização por contexto;
11. registro de rastreabilidade sobre autorizações, rejeições e suspensões.

O expositor apresenta o controle técnico como uma camada flexível sobre os processos de emissão e sinistros. Essa camada avalia condições de negócio e define o comportamento da operação conforme a configuração aplicável.

---

## 6. Modelo lógico de funcionamento

A seguinte representação é uma **consolidação analítica baseada na explicação verbal**, não um diagrama literal exibido na reunião.

```text
Usuário executa uma operação
(emissão, suplemento, renovação, sinistro, liquidação, orçamento etc.)
↓
Sistema chega a um ponto configurado de avaliação
↓
Lógica de negócio Oracle consulta dados relevantes
↓
A condição do controle técnico é avaliada
↓
Se a condição não ocorrer:
    operação continua normalmente
↓
Se a condição ocorrer:
    ├─ Observação: apresenta alerta e registra vínculo com a operação
    ├─ Rejeição: impede a continuidade até a correção da condição
    └─ Auditoria: retém a operação para autorização ou rejeição
↓
Caso seja auditoria:
    usuário autorizado acessa programa de autorização
    ↓
    autoriza ou rejeita, possivelmente com observação obrigatória
    ↓
    sistema registra usuário, data, ação e rastreabilidade
```

---

## 7. Tipos de controle técnico

O sistema possui exatamente três tipos de controle técnico. Segundo o expositor, não é possível criar um quarto ou quinto tipo por parametrização.

| Tipo | Comportamento | Consequência operacional |
|---|---|---|
| Observação | Exibe um alerta ao usuário. | A operação continua; o usuário não pode alegar que não foi informado. |
| Rejeição | Impede a continuidade enquanto a condição estiver presente. | O dado ou condição precisa ser alterado para que a operação prossiga. |
| Auditoria | Retém a operação para decisão de pessoa com autoridade adequada. | A operação fica pendente até ser autorizada ou rejeitada. |

## 7.1 Controles de observação

Os controles de observação são alertas. Eles não bloqueiam, não suspendem e não deixam a operação pendente.

O objetivo é tornar explícita uma condição relevante para o usuário e registrar que houve uma advertência durante a execução. O expositor ressalta que, nesse caso, o usuário precisa continuar conscientemente a operação após receber a mensagem.

Exemplo conceitual:

```text
Usuário tenta executar uma operação
↓
Sistema identifica a condição configurada
↓
Sistema mostra mensagem de alerta
↓
Usuário confirma a continuidade
↓
Operação é concluída
```

## 7.2 Controles de rejeição

Os controles de rejeição não podem ser ultrapassados por autorização. Se a condição estiver presente, a operação não pode prosseguir.

O expositor usa o exemplo de uma regra que impede, entre 1º de janeiro e 31 de março, a contratação de determinado tipo de veículo. Nesse cenário, enquanto o veículo continuar pertencendo à categoria proibida e o período permanecer aplicável, não há autorização que permita concluir a operação.

A lógica apresentada é:

```text
Condição de rejeição identificada
↓
Sistema informa o bloqueio
↓
Usuário deve alterar a condição causadora
↓
Somente após a alteração a operação poderá continuar
```

## 7.3 Controles de auditoria

Os controles de auditoria concentram a parte mais relevante da funcionalidade. Eles permitem que uma operação seja analisada por alguém com autoridade apropriada.

Exemplo citado: a idade permitida para determinada contratação é até 65 anos. Em vez de bloquear definitivamente um cliente de 67 anos, o controle pode reter a operação para que uma autoridade — por exemplo, um gerente técnico — avalie o caso.

A autorização ou rejeição precisa ocorrer por meio do programa específico de autorização de controles técnicos. O sistema registra que a decisão foi tomada por um usuário que possuía competência para isso.

---

## 8. O estado de “limbo” da apólice ou operação

Uma imagem recorrente na explicação é a de que uma apólice retida por controle técnico fica “no limbo”.

Segundo a descrição:

- ela existe no modelo de dados;
- mas ainda não é considerada plenamente válida pelos processos operacionais;
- não participa normalmente dos processos subsequentes;
- não permite cobranças de recibos;
- não permite procedimentos associados ao resseguro;
- não deve ser tratada como uma apólice plenamente operacional enquanto houver controle pendente.

A comparação apresentada foi:

```text
Apólice retida por controle técnico
=
não está no “céu” das apólices efetivas
nem no “inferno” das operações descartadas
```

Trata-se de uma metáfora do expositor para explicar que a operação está registrada, mas não produz todos os efeitos operacionais esperados.

---

## 9. Exemplos de regras de negócio citadas

A reunião reforça que praticamente qualquer regra pode ser implementada, desde que se baseie em dados existentes no sistema.

| Exemplo | Tipo potencial | Contexto |
|---|---|---|
| Bloquear contratação de determinado tipo de veículo em período definido. | Rejeição | Subscrição/emissão. |
| Restringir veículos de uso esportivo acima de determinada antiguidade. | Observação, rejeição ou auditoria, conforme política. | Emissão. |
| Não permitir soma segurada acima de cinco milhões em determinada cobertura. | Rejeição ou auditoria. | Apólice empresarial. |
| Impedir liquidações parciais acima de mil dólares sem perícia prévia. | Rejeição ou auditoria. | Sinistros. |
| Avaliar mudança de risco quando segurado passa a praticar parapente. | Auditoria. | Suplemento e seleção de risco. |
| Controlar sinistralidade de determinado segurado em combinação com faixa de código de agente. | Configurável. | Exemplo de combinação arbitrária de critérios. |
| Proibir contratação para pessoa identificada por documento. | Rejeição. | Exemplo didático deliberadamente extremo. |
| Verificar capacidade de contratos de resseguro para suportar determinado capital segurado. | Controle ligado a resseguro. | Emissão/apólice. |
| Controlar uso de palavras ou frases específicas em cláusulas de caução e crédito. | Controle específico de ramo. | Textos anexos e cláusulas. |

---

## 10. Validação de atributo versus controle técnico

Uma dúvida importante tratada na reunião foi se uma restrição como “idade entre 18 e 65 anos” seria um controle técnico.

A resposta foi que depende do comportamento desejado.

## 10.1 Validação no atributo

Se o objetivo for simplesmente impedir que um dado inválido seja capturado, a regra deve ser configurada como validação do próprio atributo.

Exemplos:

- campo numérico aceita apenas números;
- campo de data aceita datas no formato esperado;
- idade não pode ser inferior a 18 anos;
- idade não pode exceder 65 anos.

Segundo a explicação, os atributos podem ter programas, pacotes Oracle ou funções Oracle associados para validar o valor informado.

Nesse caso, a regra é aplicada no dado, não como controle técnico.

## 10.2 Controle técnico

Se a regra permitir exceção mediante autorização, ela se torna um candidato a controle técnico.

Exemplo:

```text
Regra base: idade máxima de 65 anos
↓
Cliente possui 67 anos
↓
Sistema permite registrar a operação, mas a retém
↓
Responsável com competência avalia o caso
↓
Autoriza ou rejeita a emissão
```

A distinção central é:

| Situação | Mecanismo indicado na explicação |
|---|---|
| Dado jamais pode assumir determinado valor. | Validação do atributo. |
| Dado normalmente não é aceito, mas pode ter exceção autorizada. | Controle técnico de auditoria. |
| Dado jamais pode prosseguir enquanto aquela condição existir. | Controle técnico de rejeição. |

---

## 11. Risco de excesso de controles

O expositor enfatiza repetidamente que controles técnicos devem ser usados com equilíbrio.

O risco explicitamente mencionado é a criação de uma cultura de “controle do controle do requetecontrole”, isto é, tantas regras, aprovações e bloqueios que as operações deixam de fluir.

### Consequência operacional descrita

```text
Muitos controles de auditoria
↓
Grande volume de pendências de autorização
↓
Responsáveis passam a aprovar mecanicamente
↓
Perda de análise efetiva
↓
Controles deixam de proteger a operação
↓
A operação fica mais lenta sem ganho proporcional de qualidade
```

A recomendação do expositor é que a companhia defina até que nível deseja controlar e que cada controle tenha valor real para a gestão do risco e da operação.

> **Leitura analítica:** a reunião sugere que controles técnicos não são apenas uma capacidade de parametrização. Eles exigem desenho operacional, governança, dimensionamento de responsáveis e critérios claros de excepcionalidade.

---

## 12. Componentes de configuração mencionados

O expositor menciona inicialmente “nove tabelas de configuração”, mas ao longo da apresentação detalha diversos catálogos e associações. A transcrição não permite reconstituir com absoluta segurança uma lista formal e exaustiva das nove tabelas.

Os componentes explicitamente descritos incluem:

1. definição de controles técnicos;
2. características do controle técnico;
3. níveis de salto;
4. lógica de negócio de execução;
5. níveis de autorização;
6. papéis de controles técnicos;
7. usuários por papel;
8. níveis de autorização por papel;
9. palavras reservadas para caução e crédito.

---

## 13. Definição do controle técnico

A definição básica do controle técnico é apresentada como um repositório simples contendo:

- chave ou código;
- idioma;
- descrição da mensagem ou do controle.

Exemplo citado:

- erro/código `344`, associado a uma mensagem de que determinado expediente já possui uma liquidação para aquele beneficiário.

O expositor ressalta que essa definição sozinha não produz a regra. Ela é apenas o cadastro inicial. A lógica que determina quando a mensagem deve ocorrer está em outra camada.

---

## 14. Características operacionais do controle

Após criar o controle, é necessário definir suas propriedades operacionais.

As propriedades mencionadas incluem:

- tipo de controle;
- sistema ou departamento de autorização;
- nível de autorização;
- execução em apólice;
- comportamento em orçamento;
- comportamento em suplementos;
- comportamento em renovações;
- avaliação de mudança das condições que originaram o controle;
- lógica de autorização;
- lógica de rejeição;
- ação em caso de rejeição;
- domínio de autorização;
- obrigatoriedade de observações;
- estrutura de informação, identificada como recurso descontinuado.

---

## 15. Sistema ou departamento de autorização

O controle pode ser originado em um processo e ser autorizado por outra área.

Exemplo apresentado:

- o controle nasce durante a emissão;
- a operação fica retida;
- mas a decisão não cabe ao emissor nem à área de emissão;
- a autorização pode pertencer, por exemplo, à área de resseguro.

O expositor pede que os participantes não confundam esse “sistema” ou “departamento” com o módulo técnico da aplicação. A descrição aponta para uma classificação de área responsável.

---

## 16. Níveis de autorização

Os níveis de autorização vão de `0` a `9`.

O expositor não recordava, durante a reunião, qual extremo representa maior ou menor autoridade. Ele considera possível que:

- `0` seja o nível mais baixo e `9` o mais alto; ou
- a escala seja inversa.

Essa incerteza foi explicitamente reconhecida e não deve ser preenchida por suposição.

O ponto confirmado é:

- cada controle de auditoria recebe um nível;
- o usuário precisa possuir competência mínima correspondente para autorizar ou rejeitar;
- a competência decorre da combinação entre papéis, usuários e níveis de autorização configurados.

---

## 17. Execução em orçamento, emissão, suplementos e renovações

A reunião explica que um controle técnico pode ocorrer antes da emissão definitiva, como em um orçamento.

## 17.1 Orçamento versus apólice

Quando uma apólice é emitida a partir de um orçamento que já passou por controle técnico, a configuração pode determinar:

- que o controle seja executado novamente na emissão; ou
- que não seja reexecutado, pois a autorização no orçamento já seria suficiente.

A escolha depende da regra de negócio e da política da companhia.

## 17.2 Suplementos

Um suplemento pode alterar elementos relevantes da apólice, como:

- modalidade do veículo;
- soma segurada;
- cobertura de danos materiais;
- informações sobre o segurado;
- exposição ao risco.

Se a condição que motivou o controle mudar, o sistema pode executar novamente o controle técnico.

O exemplo apresentado é o do segurado que inicialmente não praticava atividade de risco e depois informa que passou a praticar parapente. A alteração pode exigir nova análise da seleção de risco.

## 17.3 Renovações

A renovação é tratada como um tipo específico de suplemento, com relevância própria. O controle pode ou não ser novamente executado na renovação, conforme configuração.

## 17.4 Condições que originaram o controle

O sistema pode avaliar se os dados e condições que causaram a execução do controle técnico mudaram em relação ao estado anterior.

Para isso funcionar, a lógica de negócio implementada pela equipe local de tecnologia precisa gravar explicitamente as condições de execução. O sistema não realiza essa persistência automaticamente “por si só”.

Esse é um ponto técnico importante:

```text
Avaliar mudança de condições entre movimentos
↓
exige que a lógica de negócio registre as condições relevantes
↓
sem esse registro, a comparação não ocorre automaticamente
```

---

## 18. Lógica Oracle de autorização e rejeição

A reunião atribui à tecnologia a implementação de componentes Oracle associados aos controles.

São mencionados:

- programas Oracle;
- pacotes Oracle;
- funções Oracle;
- nomenclaturas definidas pelo time de desenvolvimento.

A lógica pode ser utilizada para:

- determinar se um controle deve ser disparado;
- avaliar se uma autorização pode ser concedida;
- avaliar se uma rejeição pode ser aplicada;
- consultar dados de apólice, sinistro, suplemento, risco, cobertura e atributos;
- registrar condições relevantes;
- aplicar critérios específicos da entidade.

A transcrição indica que, de forma simplificada, a lógica pode devolver algo equivalente a um valor booleano:

```text
true  → condição do controle foi atendida
false → condição do controle não foi atendida
```

> **Limitação:** a reunião não detalha contratos de interface, assinaturas de pacotes, convenções de nomes, banco de dados específico além da referência a Oracle, nem o modelo de versionamento do código.

---

## 19. Ações em caso de rejeição

Quando um controle de auditoria é rejeitado, foram apresentadas duas possibilidades principais.

## 19.1 Rejeitar e eliminar a operação

A companhia pode rejeitar a operação e apagar os dados operacionais capturados.

O expositor observa que, se desejado, a companhia pode manter dados relacionados ao motivo do controle para análise posterior. Contudo, a operação em si deixa de existir como movimento aproveitável.

## 19.2 Rejeitar e suspender

A operação pode ser rejeitada sem que seus dados sejam perdidos. Nesse caso:

- o movimento fica suspenso;
- o usuário pode retomar a operação posteriormente;
- a informação que causou o bloqueio precisa ser alterada;
- não é necessário reiniciar todo o processo do zero.

Exemplo:

```text
Soma segurada solicitada: 5 milhões
↓
Regra não permite esse valor
↓
Companhia propõe 4 milhões
↓
Usuário ou agente negocia com o cliente
↓
Se o cliente aceitar, retoma-se o movimento suspenso
↓
Valor é ajustado
↓
Operação pode ser concluída
```

## 19.3 Limite da suspensão

O expositor esclarece que a suspensão não transforma um controle de rejeição em algo autorizável.

No exemplo de um tipo de veículo proibido em determinado período, manter o movimento suspenso não resolve se a condição essencial não puder mudar. O veículo continuará sendo da categoria proibida.

---

## 20. Rejeição versus conflito entre áreas

Foi levantado um cenário em que uma área comercial poderia querer permitir uma operação que a área técnica definiu como rejeição.

A resposta foi que:

- se a regra for realmente de rejeição, ela não pode ser autorizada;
- um conflito desse tipo pode indicar falta de alinhamento entre áreas;
- a empresa pode precisar revisar o desenho da regra;
- uma alternativa seria transformar a regra em auditoria, com nível alto de autorização;
- nesse cenário, apenas responsáveis muito específicos poderiam aprovar exceções.

O expositor menciona, como exemplos extremos de autoridade possível:

- gerente técnico;
- gerente comercial;
- presidente;
- CEO.

A ideia não é que esses cargos devam necessariamente ser usados, mas que a organização pode configurar o nível de exceção desejado.

---

## 21. Rastreabilidade e auditoria

A reunião confirma que o sistema mantém rastreabilidade sobre o ciclo de vida dos controles técnicos.

É possível identificar, segundo a explicação:

- se a operação foi retida;
- se foi rejeitada;
- se foi rejeitada e suspensa;
- se foi posteriormente aprovada;
- quem tomou cada ação;
- em que data ocorreu a ação;
- quais observações foram registradas.

O expositor reforça que os usuários são nominais e que a segurança local deve impedir práticas em que diferentes pessoas utilizem a mesma conta.

> **Leitura analítica:** a solução apresentada combina controle de exceção com responsabilização individual. O objetivo não é apenas decidir sobre uma operação, mas permitir apuração posterior de decisões, responsáveis e justificativas.

---

## 22. Domínios e classificações de controle

A reunião apresenta classificações de domínio ou contexto operacional para os controles técnicos.

Os tipos mencionados são:

| Domínio ou classificação | Uso citado |
|---|---|
| Padrão | Controles normalmente utilizados em processos gerais. |
| Inspeções | Controles específicos do âmbito de inspeção. |
| Resseguro | Controles relacionados à colocação ou capacidade de resseguro. |
| Documentos de entrada / notificações | Controles ligados à documentação requerida, como formulários. |

O expositor afirma que os controles padrão são os mais usuais.

### Exemplo de resseguro

Uma apólice pode ser emitida corretamente do ponto de vista de emissão, mas ainda gerar um controle específico de resseguro caso não exista capacidade contratual suficiente para suportar determinado capital ou risco.

### Exemplo de documentos de entrada

São mencionados documentos que precisam estar presentes, como um formulário de saúde. A reunião não especifica todos os tipos documentais nem detalha o comportamento operacional completo desse domínio.

---

## 23. Observações obrigatórias

A configuração pode exigir que, ao autorizar ou rejeitar um controle de auditoria, o usuário registre observações.

Quando essa opção estiver ativa:

- o sistema obriga a inclusão de ao menos um motivo ou observação;
- a justificativa passa a compor a rastreabilidade da decisão;
- a autorização não é apenas um clique sem contexto registrado.

Isso reforça o caráter auditável da funcionalidade.

---

## 24. Estrutura de informação descontinuada

É citada uma propriedade relacionada a uma “estrutura de informação”, descrita como uma estrutura semelhante a formulário.

O expositor afirma que essa abordagem está descontinuada:

- ela teve utilidade em contexto associado a “Tron Web”;
- não é mais chamada a partir do programa de autorização ou rejeição de controles técnicos;
- não deve ser tratada como mecanismo atual de autorização.

A transcrição não detalha:

- quando ocorreu a descontinuação;
- se existe substituto formal;
- se há instalações legadas utilizando a funcionalidade;
- quais impactos existem para migrações.

---

## 25. Níveis de salto: onde os controles são disparados

Os controles técnicos não são necessariamente avaliados em cada campo individual da tela. Eles são executados em pontos configurados do processo, chamados de **níveis de salto**.

Segundo a explicação, eles normalmente ocorrem quando o usuário:

- avança em uma tela;
- confirma uma etapa;
- continua uma operação;
- finaliza um movimento;
- alcança um ponto específico do fluxo.

Exemplos de pontos mencionados:

- emissão;
- dados de sinistro;
- dados fixos de liquidações;
- dados de recibo;
- identificação do sinistro;
- relato do sinistro;
- causas e consequências;
- dados complementares;
- dados fixos do expediente.

A tabela de níveis de salto existe como catálogo, mas os níveis são pré-definidos. Os usuários não criam livremente novos níveis apenas porque a tabela existe.

> **Limitação:** a transcrição menciona alguns códigos ou números de nível, como 2, 3, 5 e 7, mas a qualidade do reconhecimento de voz e a ausência de material visual não permitem reconstruir um mapa técnico completo e confiável de todos os níveis.

---

## 26. Especialização da execução

O controle técnico pode ser especializado conforme diversos eixos de contexto.

A reunião cita possibilidade de combinar:

- sistema;
- nível de salto;
- estrutura de produtos;
- setor;
- subsetor;
- ramo;
- estrutura comercial;
- níveis da estrutura comercial;
- escritório ou unidade;
- produto;
- características tarifárias;
- contexto de emissão, sinistros ou liquidações.

### Exemplo apresentado

Um controle pode ser aplicado:

- a todos os escritórios, exceto à sede;
- a determinado produto de automóveis;
- a um produto e não a outro;
- a uma região comercial e não a outra;
- a todos os setores ou apenas a uma combinação específica de setor, subsetor e ramo.

O expositor ressalta que diferentes desenhos de produto podem alcançar objetivos semelhantes. Por exemplo, em vez de criar produtos distintos, pode ser possível usar um único produto com estruturas tarifárias diferentes. A reunião não estabelece uma regra universal; apenas chama atenção para a necessidade de escolher a modelagem adequada.

---

## 27. Lógica de execução

A lógica Oracle associada ao controle técnico consulta os dados necessários para avaliar a condição.

As fontes de informação citadas incluem:

- apólice;
- sinistro;
- suplemento;
- risco;
- segundo risco;
- múltiplos riscos da apólice;
- coberturas;
- atributos das coberturas;
- atributos dos riscos;
- dados de produtos;
- dados comerciais.

A regra é definida pelo negócio, mas sua implementação é técnica.

### Responsabilidades implícitas

| Área | Responsabilidade descrita ou inferida do contexto |
|---|---|
| Negócio / direção técnica | Define o que deve ser controlado e a política aplicável. |
| Tecnologia / desenvolvimento | Implementa pacotes Oracle e a lógica necessária. |
| Administração de segurança / usuários | Garante usuários nominais, papéis e acesso adequado. |
| Responsáveis autorizadores | Autorizam ou rejeitam exceções dentro de sua competência. |
| Operação local | Define como usuários acompanham e tratam pendências. |

> A divisão acima é uma **organização analítica do que foi explicado**; a reunião não apresenta uma matriz RACI formal.

---

## 28. Controles acionados por menus e estruturas específicas

Além dos fluxos de emissão e sinistros, o expositor menciona que controles podem ser vinculados a opções de menu.

O exemplo faz referência a um menu em que seria possível acessar situações como:

- apólices retidas;
- apólices suspensas;
- situação “multiusuário” ou expressão semelhante.

A transcrição contém termos pouco claros nesse ponto, e não permite identificar com segurança os nomes reais dos programas ou opções de tela.

Também foi mencionada a possibilidade de associar lógica a estruturas de informação particulares, especialmente em contexto de sinistros.

---

## 29. Modelo de autorização

Os controles de auditoria exigem um modelo de autorização composto por níveis, papéis e usuários.

## 29.1 Níveis por companhia

Existe um catálogo de níveis de autorização por companhia, contendo ao menos:

- nível;
- descrição;
- abreviação.

## 29.2 Papéis específicos de controles técnicos

Os papéis citados aqui não são os mesmos papéis gerais de usuário ou de acesso a programas. São papéis específicos para o domínio de controles técnicos.

Exemplos de nomes ilustrativos mencionados:

- papel de emissão;
- subscritor júnior;
- papel sênior de emissão de automóveis;
- papel de sinistros;
- papel de tramitação de sinistros.

Esses nomes são exemplos apresentados verbalmente, não uma lista oficial de papéis do sistema.

## 29.3 Associação de usuários aos papéis

Os usuários nominais são associados aos papéis de controles técnicos.

A reunião sugere que, quando uma pessoa entra em uma área, o processo de entrada pode incluir a atribuição do conjunto de papéis esperado para aquela função. O expositor usa como exemplo a possibilidade de a direção técnica de emissão solicitar que todo novo integrante receba determinado papel de controle técnico.

## 29.4 Especialização de níveis por papel

O nível de autorização de um papel pode ser especializado conforme:

- sistema;
- setor;
- subsetor;
- ramo;
- estrutura comercial;
- nível comercial;
- nível de salto;
- processo de emissão, sinistros, recibos ou outro contexto.

Isso permite que o mesmo usuário tenha capacidade diferente conforme o tipo de operação e o contexto organizacional.

---

## 30. Múltiplos controles em uma única operação

Uma apólice, movimento, sinistro, expediente ou liquidação pode gerar vários controles técnicos simultaneamente.

O expositor cita, como exemplo possível:

- controle de automóvel;
- necessidade de inspeção do risco por possuir cobertura de danos materiais;
- controle relacionado à capacidade de resseguro.

Esses controles podem ter:

- diferentes tipos;
- diferentes responsáveis;
- diferentes níveis de autorização;
- diferentes áreas autorizadoras.

A operação somente deixa o estado pendente quando todos os controles relevantes forem resolvidos.

```text
Operação possui N controles técnicos
↓
Alguns podem ser autorizados por níveis mais baixos
↓
Outros exigem nível superior
↓
Outros podem depender de área distinta, como resseguro
↓
Somente a resolução do último controle pendente libera a operação
```

---

## 31. Operação diária e tratamento de pendências

Foi perguntado como a pessoa responsável pela autorização visualiza suas pendências.

A resposta indica que existe um **programa de autorização de controles técnicos**. Nesse programa, o usuário visualiza os controles que está habilitado a autorizar.

A visibilidade depende de fatores como:

- nível de autorização;
- papel associado;
- unidade ou escritório;
- estrutura organizacional;
- permissões atribuídas ao usuário.

O sistema não é apresentado como possuindo, necessariamente, uma solução BPM centralizada que distribua automaticamente cada tarefa aos responsáveis.

Há duas possibilidades operacionais mencionadas:

1. o responsável acessa periodicamente o programa de autorização;
2. o módulo interno de notificações pode enviar uma mensagem.

A reunião enfatiza que o processo precisa ser definido conforme a realidade de cada país e companhia.

---

## 32. Limitações do modelo operacional de pendências

A transcrição deixa claro que não existe, de forma nativa e universal, uma garantia de orquestração sofisticada de tarefas.

O expositor afirma, em essência, que:

- há um programa para consulta e tratamento;
- a empresa pode configurar acessos e eventualmente notificações;
- não existe necessariamente uma “console” ou BPM que organize todo o fluxo automaticamente;
- caso a organização deseje esse comportamento, precisará implementá-lo ou desenhar o processo operacional correspondente.

Isso é relevante porque um modelo de controles técnicos depende não apenas da regra e da autorização, mas também da disciplina operacional para monitorar pendências.

---

## 33. Adequação à realidade local

Um dos pontos mais importantes da reunião é que a solução deve ser ajustada à dimensão e à organização da companhia ou país.

O expositor compara implicitamente contextos diferentes:

- companhias grandes, com múltiplas áreas e pessoas especializadas;
- companhias pequenas, em que uma mesma pessoa desempenha várias funções;
- estruturas com poucas pessoas, nas quais férias ou ausências podem afetar a capacidade de autorização.

A conclusão prática é que não se deve copiar um modelo de níveis e segregação de funções sem entender a operação local.

> **Leitura analítica:** a flexibilidade técnica dos controles precisa ser acompanhada por uma arquitetura operacional proporcional à capacidade da organização. Um desenho excessivamente complexo pode ser inviável em uma estrutura pequena.

---

## 34. Controle de palavras reservadas em caução e crédito

A última parte da reunião apresenta uma funcionalidade específica dos ramos de **caução e crédito**.

O objetivo é controlar palavras, termos ou frases utilizados em textos anexos e cláusulas de apólices. A motivação é evitar redações que possam gerar interpretações inadequadas, especialmente diante de disputas, sinistros ou interpretações judiciais.

O expositor destaca que esses ramos podem envolver elevado impacto econômico e que as direções técnicas desejam reduzir o risco de uso de expressões inadequadas.

## 34.1 Controle técnico associado

É mencionado um código de controle técnico `2209`.

O expositor afirma que esse é o código usado para esse mecanismo, mas não explica por que esse código específico foi escolhido.

## 34.2 Exemplos de termos citados

São mencionadas expressões como:

- “cobertura de licitação provisória excluindo o IVA”;
- “fundos próprios”;
- “cobertura para [termo transcrito de forma incerta] de materiais”;
- “valor bancário”.

> **Nota de qualidade da transcrição:** alguns termos técnicos aparecem distorcidos pelo reconhecimento de voz. Eles foram preservados de forma próxima à transcrição porque não há base suficiente para normalização segura.

## 34.3 Onde a verificação ocorre

A configuração pode definir:

- se a verificação será feita em textos anexos;
- se será feita em cláusulas;
- qual código de texto ou cláusula deve ser avaliado;
- quais palavras, termos ou frases devem ser pesquisados.

São citados campos ou identificadores transcritos como:

- `costexto1`;
- `cotcláusula`.

Esses nomes podem estar incorretamente reconhecidos. A transcrição não permite confirmar os identificadores reais.

## 34.4 Escopo funcional

O expositor afirma que esse recurso é específico de caução e crédito e que não é aplicável, por exemplo, a vida ou automóveis.

---

## 35. Perguntas e respostas relevantes

## 35.1 Pergunta: validação de idade em tela é controle técnico?

### O que se queria entender

Se uma regra de faixa etária, por exemplo impedir idade acima de 65 anos, seria configurada como controle técnico.

### Resposta

Se o objetivo é impedir tecnicamente o valor no próprio atributo, trata-se de validação do dado. A validação pode ser implementada nos atributos associados ao ramo, usando lógica Oracle.

Se, porém, a regra permitir que uma pessoa acima da faixa padrão continue mediante autorização de alguém competente, então faz sentido utilizar controle técnico de auditoria.

### O que isso esclarece

A reunião separa duas camadas:

- qualidade ou validade intrínseca do dado;
- exceção de negócio que pode ser submetida a decisão humana.

---

## 35.2 Pergunta: alguém pode retomar manualmente uma operação bloqueada?

### O que se queria entender

Se uma operação bloqueada por controle técnico de rejeição poderia ser liberada manualmente.

### Resposta

Não, se o controle for de rejeição. O dado ou condição precisa mudar.

Se a empresa quiser permitir uma exceção, a regra deveria ser desenhada como controle de auditoria, potencialmente com nível alto de autorização.

### O que isso esclarece

A tipologia do controle determina o limite de intervenção humana. Rejeição não é uma autorização pendente; é uma proibição baseada na condição atual.

---

## 35.3 Pergunta: existe histórico dos status e decisões?

### O que se queria entender

Se seria possível verificar que uma apólice foi rejeitada, suspensa, aprovada posteriormente ou passou por etapas de tratamento.

### Resposta

Sim. O sistema mantém trilha de auditoria com usuário, datas e ações realizadas.

### O que isso esclarece

A funcionalidade não se limita a bloquear ou liberar operações. Ela registra a trajetória da decisão e apoia responsabilização posterior.

---

## 35.4 Pergunta: onde os autorizadores veem as pendências?

### O que se queria entender

Se existe painel, console ou mensagem automática para as pessoas responsáveis por autorizar controles.

### Resposta

Existe um programa de autorização de controles técnicos, no qual cada pessoa vê o que pode autorizar conforme seus níveis, papéis, unidade e permissões.

O expositor afirma que não há, necessariamente, uma solução BPM centralizada que organize automaticamente todas as pendências. Notificações internas podem ser utilizadas, mas o modelo operacional precisa ser desenhado de acordo com cada organização.

### O que isso esclarece

A capacidade técnica existe, mas a gestão cotidiana de filas de autorização depende de processo operacional, configuração de acessos e, se necessário, implementação adicional.

---

## 36. Números e limites citados

| Item | Valor mencionado | Contexto |
|---|---:|---|
| Tipos de controle técnico | 3 | Observação, rejeição e auditoria. |
| Níveis de autorização | 0 a 9 | Escala de competência; direção crescente ou decrescente não confirmada. |
| Idade usada como exemplo | 65 anos | Limite de referência em exemplo de subscrição. |
| Idade de exceção usada como exemplo | 67 anos | Exemplo de caso potencialmente autorizável. |
| Período usado como exemplo | 1º de janeiro a 31 de março | Janela em que determinado tipo de veículo não poderia ser contratado. |
| Soma segurada usada como exemplo | 5 milhões | Limite hipotético para determinada cobertura empresarial. |
| Soma segurada alternativa usada como exemplo | 4 milhões | Valor hipotético que poderia viabilizar negociação após suspensão. |
| Liquidação parcial usada como exemplo | acima de mil dólares | Cenário que exigiria perícia prévia. |
| Código de exemplo | 344 | Controle associado a expediente que já teria liquidação para beneficiário. |
| Código de palavras reservadas | 2209 | Controle citado para caução e crédito. |
| Exemplo de faixa de código de agente | 27 a 49 | Exemplo deliberadamente arbitrário de combinação de critérios. |
| Estrutura local citada como exemplo | 10 pessoas | Companhia ou direção técnica pequena, usada para ilustrar limitações operacionais. |

> Os valores acima são exemplos apresentados durante o treinamento. Não devem ser interpretados como regras corporativas universais, limites efetivos de produto ou parâmetros obrigatórios do sistema.

---

## 37. Governança implícita na solução

Embora a reunião não apresente um modelo formal de governança, ela deixa evidentes alguns elementos.

## 37.1 Direções técnicas

As áreas técnicas aparecem como principais demandantes e definidoras de controles relacionados a:

- subscrição;
- seleção de risco;
- limites de cobertura;
- exceções;
- cláusulas;
- critérios de sinistro;
- exposição a atividades de risco.

## 37.2 Tecnologia

A equipe de tecnologia é responsável pela implementação técnica da lógica e pelas convenções de nomenclatura dos componentes Oracle.

A reunião deixa claro que usuários de negócio não devem configurar diretamente componentes como pacotes Oracle sem entendimento técnico.

## 37.3 Segurança e identidade

A segurança local é mencionada no contexto de usuários nominais e responsabilidade individual. O modelo pressupõe que cada ação possa ser atribuída a uma pessoa específica.

## 37.4 Operação local

Cada país ou companhia precisa definir:

- quantidade de níveis;
- responsáveis;
- papéis;
- cobertura de ausências;
- acesso ao programa;
- cadência de consulta de pendências;
- uso ou não de notificações.

---

## 38. Transformações estruturais identificáveis

Esta seção apresenta interpretações analíticas fundamentadas na conversa, e não afirmações literais dos participantes.

## 38.1 De validação fixa para política de risco configurável

A solução representa uma separação entre:

```text
Regras estruturais do sistema
↓
imutáveis e necessárias à integridade operacional
```

e:

```text
Regras de negócio e risco
↓
dinâmicas, contextualizáveis e potencialmente autorizáveis
```

Isso permite que a companhia ajuste a política operacional sem necessariamente alterar o núcleo de validações estruturais.

## 38.2 De bloqueio binário para tratamento de exceções

O modelo não trata todas as condições como simples “permitido” ou “proibido”. Ele introduz três respostas graduais:

- avisar;
- bloquear;
- reter para decisão.

Essa gradação permite que a organização diferencie erro, alerta, exceção e proibição.

## 38.3 De controle técnico isolado para governança operacional

A reunião mostra que o controle técnico não é apenas um recurso de desenvolvimento. Ele envolve:

- desenho de processo;
- alçada de decisão;
- papéis;
- níveis;
- rastreabilidade;
- segregação de responsabilidade;
- capacidade operacional local.

## 38.4 De regras genéricas para regras contextualizadas

A possibilidade de especializar controles por produto, ramo, setor, estrutura comercial, escritório e ponto do processo indica uma arquitetura orientada a contexto.

O mesmo princípio de controle pode ser aplicado de maneiras diferentes conforme o ambiente de negócio.

---

## 39. Riscos explicitamente mencionados

| Risco | Descrição |
|---|---|
| Excesso de controles | A empresa pode bloquear excessivamente a operação. |
| Aprovação mecânica | Responsáveis podem aprovar sem análise real quando há volume elevado de pendências. |
| Paralisação operacional | Apólices e operações podem permanecer pendentes sem seguir para cobrança, resseguro ou outros processos. |
| Conflito entre áreas | Técnica e comercial podem divergir sobre o tratamento de exceções. |
| Falta de cobertura operacional | Estruturas pequenas podem não ter pessoas suficientes para suportar muitos níveis e aprovações. |
| Configuração técnica inadequada | Sem persistir as condições de execução na lógica Oracle, a reavaliação de mudanças pode não funcionar como esperado. |
| Uso inadequado de cláusulas | Em caução e crédito, termos mal utilizados podem ter impacto relevante em interpretação de coberturas ou sinistros. |

---

## 40. Desafios derivados do contexto

Os itens abaixo são interpretações analíticas, não declarações literais da reunião.

### 40.1 Manutenção de regras

Quanto mais regras forem implementadas em pacotes Oracle, maior tende a ser a necessidade de governança de código, documentação, testes e gestão de mudanças.

A reunião confirma a existência de lógica Oracle, mas não descreve o ciclo de desenvolvimento, testes, homologação ou versionamento.

### 40.2 Coerência entre configurações e política de negócio

A flexibilidade permite muitas combinações de produtos, estruturas comerciais, níveis de salto e alçadas. Essa mesma flexibilidade pode aumentar o risco de regras duplicadas, contraditórias ou difíceis de explicar se não houver governança funcional adequada.

### 40.3 Gestão de filas de aprovação

Como não foi apresentada uma orquestração BPM nativa centralizada, a organização precisa definir como evitar pendências esquecidas, atrasos ou concentração de decisões em poucos usuários.

### 40.4 Continuidade operacional

A reunião cita férias e estruturas pequenas como exemplo. Isso sugere necessidade de prever substituições, delegações ou modelos alternativos de alçada — embora a transcrição não descreva como o sistema resolve esse problema.

---

## 41. Limitações reconhecidas

A própria reunião reconhece ou sugere as seguintes limitações:

- controles só podem ser baseados em dados capturados ou registrados no sistema;
- o modelo exige equilíbrio para não paralisar a operação;
- a direção dos níveis de autorização de 0 a 9 não foi confirmada pelo expositor;
- a persistência das condições de controle depende de implementação explícita da lógica local;
- não há garantia de um BPM centralizado e automático para pendências;
- o funcionamento prático depende da realidade organizacional de cada país;
- certos comportamentos são modulados por legislação local;
- o recurso de estruturas de informação mencionado foi descontinuado;
- o controle de palavras reservadas é específico para caução e crédito;
- regras de rejeição não podem ser liberadas por autorização enquanto a condição de bloqueio permanecer;
- a reunião não detalha todos os catálogos, apesar de mencionar nove tabelas;
- vários exemplos são ilustrativos e não necessariamente correspondem a regras reais de produção.

---

## 42. O que a reunião não permite concluir

A transcrição não fornece detalhes suficientes para afirmar com segurança:

- nome correto do sistema transcrito como “riscor”;
- versão da aplicação;
- modelo de implantação;
- país ou países em que o sistema está efetivamente operando;
- banco de dados completo, embora Oracle seja explicitamente mencionado para pacotes, funções e lógica;
- estrutura de tabelas;
- nomes reais dos pacotes Oracle;
- convenções formais de nomenclatura;
- linguagem além do uso de componentes Oracle;
- APIs, eventos, mensageria ou integrações externas;
- modelo de IAM;
- autenticação;
- criptografia;
- segregação de funções técnica;
- auditoria de banco;
- gestão de logs;
- observabilidade;
- monitoramento;
- SLA de autorização;
- alertas automáticos;
- escalonamento de pendências;
- processo de release;
- CI/CD;
- testes automatizados;
- estratégia de rollback;
- retenção de dados;
- requisitos regulatórios específicos;
- regras legais por país;
- definição completa dos níveis de salto;
- ordem de autoridade dos níveis 0 a 9;
- todos os domínios de autorização possíveis;
- mecanismo técnico de notificação;
- ciclo de vida de controles descontinuados;
- critérios formais para criação, alteração ou exclusão de controles.

---

## 43. Conclusões principais

1. **Controles técnicos são regras dinâmicas de negócio** aplicadas em tempo de execução, distintas das validações estruturais permanentes do sistema.

2. **A principal aplicação está em emissão, contratos, sinistros e prestações**, embora a solução possa alcançar outros módulos e domínios, como resseguro, inspeções e documentação de entrada.

3. **Há três tipos fixos de comportamento:** observação, rejeição e auditoria.

4. **Controles de auditoria permitem exceção governada**, com níveis, papéis, usuários e registro de justificativas.

5. **Controles de rejeição não são autorizáveis.** A condição causadora precisa ser alterada para a operação continuar.

6. **Operações retidas ficam em estado intermediário**, registradas no modelo de dados, mas sem participar plenamente dos processos posteriores.

7. **A lógica de negócio depende de implementação Oracle**, sob responsabilidade técnica, enquanto as áreas de negócio definem os critérios de controle.

8. **O modelo oferece alta flexibilidade de especialização**, permitindo aplicar regras por sistema, etapa do processo, produto, ramo, estrutura comercial e outros contextos.

9. **O excesso de controles é um risco operacional real.** Uma configuração mal calibrada pode gerar atrasos, aprovações mecânicas e perda de efetividade da governança.

10. **A efetividade da solução depende de desenho organizacional**, não apenas de configuração técnica. Cada companhia precisa adaptar alçadas, papéis, notificações e rotinas à sua capacidade operacional.

11. **O controle de palavras reservadas em caução e crédito é uma aplicação especializada**, voltada a reduzir riscos associados ao uso de linguagem inadequada em cláusulas e textos anexos.

12. **A reunião apresenta uma plataforma de exceções e governança de risco operacional**, não apenas um conjunto de mensagens de validação.
