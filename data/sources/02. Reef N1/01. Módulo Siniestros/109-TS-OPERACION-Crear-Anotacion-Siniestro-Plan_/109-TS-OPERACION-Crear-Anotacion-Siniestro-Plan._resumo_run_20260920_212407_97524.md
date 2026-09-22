# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `109-TS-OPERACION-Crear-Anotacion-Siniestro-Plan..mp4`
**Data de processamento:** 20/09/2026 21:25:25
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise Estruturada — Anotações Livres, Avisos e Menu do Tramitador

## 1. Síntese executiva

A transcrição registra uma demonstração funcional de um sistema de gestão de sinistros e expedientes, com foco na diferença entre **anotações livres** e **avisos** utilizados pelo tramitador no fluxo de trabalho.

A mensagem central é que ambos os recursos permitem registrar ou sinalizar informações no contexto de um sinistro, expediente ou trâmite, mas têm finalidades operacionais distintas:

- **Anotações livres** servem para deixar informações registradas, sem gerar pendência nem exigir encerramento.
- **Avisos** representam pendências de trabalho ou lembretes. Eles permanecem visíveis no menu do tramitador até serem explicitamente finalizados.

A apresentação também explica que as anotações podem ser criadas em três níveis de escopo:

1. **Nível de sinistro**: visível para os tramitadores envolvidos nos expedientes daquele sinistro.
2. **Nível de expediente**: limitada ao expediente específico.
3. **Nível de trâmite**: associada a uma etapa ou atividade concreta do fluxo de tratamento.

O menu do tramitador é apresentado como ponto de entrada operacional para o trabalho diário. Por meio dele, o usuário consegue consultar expedientes conforme critérios como ramo, setor, avisos pendentes, atribuições e pendências até determinada data.

---

## 2. Contexto e antecedentes

A conversa parece fazer parte de um treinamento ou demonstração de sistema. A pessoa que conduz a explicação já havia tratado da definição de tipos de anotações e passa a demonstrar sua criação e consulta na prática.

O domínio funcional é o tratamento de sinistros. A transcrição menciona elementos como:

- sinistro;
- expediente;
- trâmite;
- plano de tratamento;
- tramitador;
- segurado;
- perito;
- liquidação;
- fatura do segurado;
- central telefônica.

Não é possível determinar, pela transcrição, o nome do sistema demonstrado, a tecnologia utilizada, a organização responsável ou o produto de seguros em que ele se insere.

O cenário apresentado sugere uma operação em que diferentes pessoas podem atuar sobre expedientes de um mesmo sinistro, sendo necessário registrar informações, manter rastreabilidade e controlar atividades pendentes.

---

## 3. Problema funcional tratado

O problema central discutido é a necessidade de distinguir adequadamente entre dois tipos de informação no processo operacional:

1. **Informações que precisam apenas ficar registradas** no contexto do sinistro, expediente ou trâmite.
2. **Ações que precisam ser lembradas e concluídas posteriormente**, gerando uma pendência explícita para o tramitador.

Sem essa diferenciação, uma informação meramente informativa poderia gerar uma pendência desnecessária, enquanto uma atividade que exige acompanhamento poderia passar despercebida.

### Relação de causa e efeito apresentada

```text
Necessidade de registrar informações operacionais
↓
Necessidade de distinguir comentários de atividades futuras
↓
Uso de anotações livres para registro
e avisos para pendências/lembretes
↓
Menu do tramitador concentra os avisos e expedientes pendentes
↓
O usuário prioriza e conclui o trabalho diário
```

---

## 4. Conceitos principais

## 4.1. Anotação livre

A anotação livre é apresentada como um registro textual associado a algum contexto do processo. Ela pode ser utilizada para comunicar uma observação, uma constatação ou uma situação relevante.

Exemplos citados:

- “Cuidado, se han visto cosas raras.”
- O documento do segurado aparentemente não está correto.
- A conta parece não estar correta.
- Não encontro o segurado.
- Não encontro o perito.
- Não foi possível realizar a liquidação porque a fatura do segurado não chegou.
- Houve contato com o segurado.

A anotação não gera um lembrete e não permanece como uma pendência operacional a ser encerrada.

A explicação é direta: a anotação “já nasce terminada”. Ou seja, sua existência representa o registro da informação, e não uma tarefa aberta.

## 4.2. Aviso

O aviso é apresentado como uma pendência ou lembrete ativo. Ele aparece no menu do tramitador e continua sendo contabilizado como pendente até que seja concluído manualmente.

A finalidade do aviso é alertar o usuário de que existe uma ação ou acompanhamento futuro necessário.

Exemplo citado:

- Entrar em contato com o segurado dentro de quatro dias.

Nesse caso, não basta registrar que houve uma situação; é necessário lembrar o tramitador de realizar uma ação em data posterior. Por isso, o recurso adequado seria um aviso.

## 4.3. Agenda

A transcrição também menciona “agenda” como um item com lembrete e datas. Pelo contexto, a agenda está associada a uma pendência temporalizada ou atividade que possui data de início e pode ser finalizada manualmente.

Um exemplo é mencionado em relação a uma alteração de avaliação/valoração e ao recebimento pendente de uma fatura. A agenda deveria avisar no dia 7.

A transcrição não permite afirmar se “agenda” é uma funcionalidade independente do aviso ou um tipo específico de aviso/pêndencia dentro do sistema. A relação exata entre ambos não foi detalhada com segurança.

---

## 5. Diferença entre aviso, anotação livre e agenda

| Elemento | Finalidade | Gera pendência? | Exige finalização? | Possui lembrete/data? | Exemplo citado |
|---|---|---:|---:|---:|---|
| Anotação livre | Registrar informação ou contexto | Não | Não | Não | “Não encontro o perito” |
| Aviso | Sinalizar uma ação ou acompanhamento pendente | Sim | Sim | Sim, no sentido de alertar o tramitador | Contatar o segurado em quatro dias |
| Agenda | Registrar uma atividade com acompanhamento temporal | Aparentemente sim | Sim, conforme o exemplo | Sim; a transcrição menciona data de início e encerramento | Avisar no dia 7 sobre pendência de fatura |

A diferença mais enfatizada durante a demonstração é a seguinte:

> Uma anotação livre registra algo que se deseja deixar documentado; um aviso chama atenção para algo que precisa ser tratado ou concluído.

---

## 6. Escopos das anotações livres

A demonstração organiza as anotações livres em três níveis. Essa divisão é relevante porque define quem poderá visualizar a anotação e a qual objeto do processo ela pertence.

## 6.1. Anotação em nível de sinistro

A anotação em nível de sinistro é associada ao sinistro como um todo.

Pela explicação, ela pode ser visualizada por todos os tramitadores dos expedientes relacionados ao mesmo sinistro. É indicada para observações que devem ser compartilhadas entre os profissionais envolvidos em diferentes expedientes daquele caso.

### Exemplo citado

A apresentadora cria uma anotação com o conteúdo aproximado:

> “Cuidado, se han visto cosas raras.”

A frase é mantida na forma próxima à transcrição porque não há contexto suficiente para determinar que tipo de irregularidade ou situação “estranha” estava sendo referida.

### Uso esperado

Esse nível pode ser adequado para mensagens como:

- alerta sobre documentos do segurado;
- inconsistência relacionada à conta;
- informação relevante para todos os expedientes de um sinistro.

A apresentação sugere que esse tipo de anotação pode ser usado quando se deseja que todos os tramitadores daquele sinistro tenham visibilidade da mesma informação.

## 6.2. Anotação em nível de expediente

A anotação em nível de expediente é associada somente a um expediente específico.

Segundo a explicação, ela não deve ser visualizada por todos os tramitadores de todos os expedientes do sinistro. A transcrição indica que ela será visualizada pelo tramitador relacionado àquele expediente.

### Exemplos citados

- “No encuentro al asegurado.”
- “No encuentro al perito.”
- “No encuentro a nadie.”

Esses exemplos representam situações específicas do tratamento de um expediente, sem necessidade de disseminação para todos os demais expedientes do sinistro.

## 6.3. Anotação em nível de trâmite

A anotação em nível de trâmite é vinculada a uma etapa específica do fluxo de tratamento.

O exemplo apresentado refere-se à liquidação:

> “No he podido realizar la liquidación porque no ha llegado la factura del asegurado.”

Há um trecho em que a transcrição registra “rigida”, aparentemente decorrente de falha de reconhecimento de voz. Pelo contexto, a intenção parece ser “liquidación”, pois a pessoa já havia mencionado a impossibilidade de realizar a liquidação devido à ausência da fatura do segurado.

### Uso esperado

Esse tipo de anotação preserva o motivo pelo qual uma atividade do fluxo não pôde ser concluída. Isso cria rastreabilidade diretamente no trâmite afetado, sem transformar necessariamente o registro em uma pendência futura.

---

## 7. Visibilidade e privacidade

Durante a demonstração, há a possibilidade de marcar uma anotação como “privada”.

A explicação relaciona essa opção especialmente à visibilidade na central telefônica:

- Em um caso, a anotação é marcada como privada “para que não apareça na central telefônica”.
- Em outro caso, a anotação não é marcada como privada porque se deseja que a central telefônica veja o motivo pelo qual a liquidação não foi concluída.

Assim, a configuração de privacidade parece controlar, ao menos parcialmente, se determinado conteúdo será exibido à central telefônica.

Contudo, a transcrição não informa:

- quais outros perfis ou áreas podem visualizar anotações privadas;
- se a privacidade impede o acesso de todos os demais usuários;
- como as regras de autorização são configuradas;
- se há auditoria de acesso;
- se existem restrições por papel, filial, país ou unidade organizacional.

---

## 8. Tipos de anotação predefinidos e possibilidade de edição

A apresentadora menciona que havia definido previamente tipos de anotações. Em um dos exemplos, um “pontinho” teria sido configurado para permitir que o usuário escrevesse o texto que desejasse.

Também é dito que determinado tipo de anotação poderia ser modificado.

Isso indica, sem permitir detalhamento adicional, que o sistema parece possuir uma etapa de configuração de tipos de anotação, potencialmente distinguindo entre:

- anotações predefinidas;
- anotações com texto livre;
- anotações editáveis;
- anotações não editáveis.

A transcrição não detalha:

- onde essa configuração é feita;
- quem pode criar ou alterar tipos de anotação;
- quais atributos configuráveis existem;
- se há versionamento;
- se existem regras por plano, ramo ou produto;
- quais são as validações aplicadas.

---

## 9. Menu do tramitador como ponto de entrada operacional

O menu do tramitador é apresentado como a principal forma de o usuário iniciar seu trabalho.

Segundo a explicação, o tramitador entra pelo menu e, a partir dele, pode localizar os expedientes sobre os quais precisa atuar. A lógica não exige necessariamente digitar manualmente o número do sinistro ou do expediente.

A demonstração reforça que a lista de trabalho pode ser obtida por filtros e condições operacionais, permitindo localizar expedientes relevantes para o dia ou para determinadas situações.

## 9.1. Informações disponíveis no menu

A apresentadora afirma que o tramitador poderá visualizar, conforme definido na configuração:

- expedientes atribuídos;
- trâmites pendentes;
- avisos pendentes;
- expedientes pendentes até determinada data;
- um resumo da situação de trabalho.

Há uma ressalva importante: o “detalhe” ou resumo ainda seria definido posteriormente com os participantes. Portanto, não se deve assumir que a composição exibida na demonstração é definitiva.

## 9.2. Exemplos de filtros apresentados

A transcrição menciona uma busca por critérios como:

- setor 3;
- ramo 300;
- expedientes de danos próprios materiais;
- expedientes com avisos pendentes;
- expedientes atribuídos ao usuário;
- expedientes não tocados em determinado período;
- expedientes pendentes até o dia atual.

Esses exemplos demonstram a existência de filtros operacionais. Porém, os termos “setor 3”, “ramo 300” e “danos próprios materiais” aparecem como ilustrações da demonstração e não devem ser interpretados como uma taxonomia completa ou definitiva do sistema.

## 9.3. Tratamento de avisos no menu

Ao realizar uma busca por expedientes com avisos pendentes, o sistema apresenta os expedientes relevantes. O aviso permanece pendente até que o usuário entre no contexto correspondente e o finalize.

A demonstração mostra uma tentativa de encerramento e um erro operacional: a pessoa percebe que não havia confirmado/aceitado a operação antes de finalizar.

Isso revela que a finalização aparentemente requer uma sequência explícita de ações, incluindo confirmação ou aceite.

Após a finalização dos avisos pendentes demonstrados, a apresentadora afirma que eles deixam de aparecer como pendências no menu.

---

## 10. Modelo de funcionamento consolidado

A representação abaixo é uma consolidação analítica do fluxo descrito. Não foi apresentado um diagrama literal na transcrição.

```text
Tramitador
↓
Menu do tramitador
↓
Busca por critérios operacionais
    ├── avisos pendentes
    ├── expedientes atribuídos
    ├── trâmites pendentes
    ├── expedientes pendentes até determinada data
    └── outros filtros demonstrados
↓
Seleção de expediente / plano de tratamento
↓
Registro ou consulta de informação
    ├── anotação em nível de sinistro
    ├── anotação em nível de expediente
    ├── anotação em nível de trâmite
    └── aviso ou agenda com pendência temporal
↓
Quando aplicável: finalização manual do aviso ou agenda
```

---

## 11. Fluxo operacional por tipo de necessidade

## 11.1. Quando é necessário apenas deixar registro

```text
Situação observada
↓
Usuário cria anotação livre
↓
Define o nível adequado:
sinistro, expediente ou trâmite
↓
Define privacidade quando aplicável
↓
A informação fica registrada
↓
Não há pendência a finalizar
```

### Exemplo

O tramitador contatou o segurado e deseja deixar constância desse fato.

A orientação apresentada é usar uma anotação livre, pois o objetivo é apenas registrar a informação.

## 11.2. Quando é necessário lembrar uma ação futura

```text
Necessidade de atuação posterior
↓
Usuário cria aviso ou agenda
↓
O item fica pendente no menu do tramitador
↓
O usuário recebe indicação de pendência
↓
A ação é realizada
↓
O aviso ou agenda é finalizado manualmente
```

### Exemplo

O tramitador precisa entrar em contato com o segurado dentro de quatro dias.

A orientação apresentada é usar um aviso, pois existe uma ação futura que deve ser lembrada e concluída.

---

## 12. Exemplos funcionais citados

| Situação | Recurso mais adequado segundo a explicação | Motivo |
|---|---|---|
| Registrar que houve contato com o segurado | Anotação livre | Apenas deixa constância no expediente |
| Entrar em contato com o segurado em quatro dias | Aviso | Requer lembrete e permanece pendente até conclusão |
| Informar possível problema no documento do segurado | Anotação em nível de sinistro, conforme o exemplo de visibilidade ampla | A informação pode interessar aos tramitadores dos expedientes do sinistro |
| Informar que a conta parece incorreta | Anotação, possivelmente em nível de sinistro conforme a explicação geral | É uma observação para conhecimento dos envolvidos |
| Informar que o segurado não foi encontrado | Anotação em nível de expediente | Refere-se ao expediente específico |
| Informar que o perito não foi encontrado | Anotação em nível de expediente | Refere-se ao expediente específico |
| Informar impossibilidade de liquidar pela ausência de fatura | Anotação em nível de trâmite | Registra o motivo dentro da atividade de liquidação |
| Relembrar pendência de fatura em determinada data | Agenda, conforme o exemplo | Há acompanhamento temporal e necessidade de aviso |

---

## 13. Perguntas e respostas

## Pergunta 1 — A funcionalidade de aviso não poderia cobrir a anotação?

### O que se buscava entender

A pergunta questiona se seria necessário manter uma funcionalidade específica de anotação livre, já que os avisos também podem comunicar informações no contexto do expediente.

### Resposta dada

A resposta diferencia os dois recursos pelo comportamento operacional:

- O aviso gera uma pendência.
- O aviso aparece no menu do tramitador.
- O aviso permanece pendente até ser finalizado.
- A anotação livre é apenas um registro.
- A anotação não possui lembrete.
- A anotação não precisa ser finalizada.

### O que essa resposta esclarece

A resposta estabelece uma separação funcional importante:

- **Aviso** é orientado a ação e controle de pendências.
- **Anotação livre** é orientada a registro e rastreabilidade contextual.

Essa diferenciação evita que o mecanismo de pendências seja usado como repositório de observações, o que poderia poluir a fila de trabalho do tramitador.

---

## 14. Decisões e direcionamentos identificados

A transcrição não apresenta decisões formais, com responsáveis ou aprovação registrada. Ainda assim, há direcionamentos operacionais claros na demonstração.

### 14.1. Separar registro de informação e controle de pendências

O direcionamento mais evidente é utilizar:

- anotações livres para registros;
- avisos para ações pendentes;
- agenda para acompanhamento temporal, conforme o exemplo apresentado.

### 14.2. Usar o escopo da anotação de acordo com a abrangência da informação

A informação deve ser associada ao nível apropriado:

- sinistro, quando interessa ao conjunto de expedientes relacionados;
- expediente, quando se aplica somente àquele expediente;
- trâmite, quando explica uma etapa específica do processo.

### 14.3. Configurar a visão do menu do tramitador

A apresentadora indica que a composição detalhada do resumo do menu será definida com os participantes. Isso sugere que há espaço de parametrização ou definição futura sobre quais indicadores e filas de trabalho deverão ser exibidos.

---

## 15. Limitações e pontos ainda não detalhados

## 15.1. Configuração do resumo do menu

A apresentadora afirma que o resumo mostrado no menu ainda não havia sido definido e que seria construído com os participantes.

Portanto, não é possível concluir:

- quais indicadores farão parte da tela final;
- qual será a priorização dos itens;
- quais filtros estarão disponíveis em produção;
- quais regras determinarão o que é pendente;
- se haverá metas, SLA ou ordenação automática.

## 15.2. Relação exata entre aviso e agenda

A transcrição apresenta agenda como um elemento com lembrete, data de início e possibilidade de finalização manual. Contudo, não explica com precisão:

- se agenda é um subtipo de aviso;
- se aviso e agenda são recursos distintos;
- quais regras de criação diferenciam um do outro;
- se ambos aparecem da mesma maneira no menu do tramitador.

## 15.3. Regras de privacidade

Embora seja possível marcar uma anotação como privada, faltam detalhes sobre:

- usuários autorizados;
- perfis de acesso;
- impacto sobre os demais tramitadores;
- histórico e auditoria;
- critérios de visibilidade para a central telefônica.

## 15.4. Configuração de tipos de anotação

A apresentação menciona anotações definidas previamente e a possibilidade de permitir alteração de texto. Não foram detalhados:

- catálogo de tipos;
- administração dos tipos;
- regras de edição;
- obrigatoriedade de campos;
- validações;
- vigência das configurações.

---

## 16. Riscos e desafios

## 16.1. Riscos explicitamente mencionados

A transcrição não apresenta uma seção formal de riscos nem descreve riscos sistêmicos, legais, financeiros ou de segurança.

Há referências pontuais a possíveis problemas operacionais, como:

- documentação do segurado aparentemente incorreta;
- conta aparentemente incorreta;
- dificuldade para localizar segurado ou perito;
- ausência da fatura necessária para liquidação.

Esses casos são apresentados como exemplos de uso das anotações, não como análise formal de riscos do sistema.

## 16.2. Desafios derivados do contexto apresentado

As considerações abaixo são leituras analíticas do fluxo demonstrado, não afirmações literais dos participantes.

### Uso incorreto de avisos para simples comentários

Se anotações livres e avisos não forem utilizados conforme a finalidade apresentada, a lista de pendências poderá conter itens que não exigem ação. Isso pode reduzir a clareza operacional do menu do tramitador.

### Escolha incorreta do nível de anotação

Uma anotação colocada em nível de expediente, quando deveria estar em nível de sinistro, pode deixar outros tramitadores sem acesso a uma informação relevante. O inverso também pode expor uma informação além do necessário.

### Dependência de finalização manual

Como os avisos permanecem pendentes até a finalização, a operação depende de disciplina do usuário para manter a fila de trabalho atualizada.

### Sensibilidade da configuração de privacidade

A possibilidade de tornar anotações privadas indica que a visibilidade da informação exige atenção. Uma configuração inadequada poderia fazer com que informações necessárias não fossem vistas pela central telefônica ou, ao contrário, fossem expostas quando deveriam permanecer restritas.

---

## 17. Leitura analítica das transformações implícitas

## 17.1. Organização do trabalho por fila operacional

Uma leitura possível é que o sistema busca organizar o trabalho do tramitador por uma fila de itens relevantes, em vez de depender apenas da busca manual por número de sinistro ou expediente.

O menu concentra itens pendentes, avisos, expedientes atribuídos e critérios de busca. Isso favorece uma operação baseada em priorização e acompanhamento do trabalho diário.

## 17.2. Separação entre conhecimento e ação

A distinção entre anotação e aviso representa uma separação funcional entre:

```text
Informação para consulta e rastreabilidade
≠
Ação que exige acompanhamento e conclusão
```

Essa separação permite que o histórico do caso seja preservado sem transformar toda observação em tarefa.

## 17.3. Granularidade de contexto

A existência de anotações em nível de sinistro, expediente e trâmite sugere uma preocupação com granularidade. A mesma informação pode ter alcance diferente conforme sua natureza:

```text
Informação global ao sinistro
↓
Informação específica de um expediente
↓
Informação vinculada a uma etapa concreta do fluxo
```

A consequência esperada é maior precisão na comunicação operacional, desde que os usuários escolham corretamente o escopo.

---

## 18. Números e indicadores citados

A transcrição não apresenta indicadores gerenciais, métricas de desempenho, volumes, SLAs ou números consolidados de operação.

Os únicos valores numéricos mencionados aparecem como exemplos de filtro ou situação operacional.

| Referência | Valor mencionado | Contexto |
|---|---:|---|
| Setor | 3 | Exemplo de busca no menu do tramitador |
| Ramo | 300 | Exemplo de filtro para localizar expedientes |
| Prazo de contato | 4 dias | Exemplo de aviso para contato futuro com o segurado |
| Data de aviso | dia 7 | Exemplo de agenda relacionada a pendência de fatura |

Esses números devem ser tratados como elementos ilustrativos da demonstração, não como parâmetros universais ou regras definitivas.

---

## 19. Roadmap e evolução futura

Não há roadmap de produto, datas de implantação, fases de projeto ou planejamento de evolução detalhado na transcrição.

O único ponto prospectivo identificado é a intenção de definir, junto com os participantes, o detalhe do resumo exibido no menu do tramitador.

Não é possível determinar:

- quando essa definição ocorrerá;
- quem participará;
- quais mudanças serão priorizadas;
- se haverá implantação posterior;
- se a configuração será diferente por área, produto ou unidade.

---

## 20. O que a reunião não permite concluir

A transcrição não oferece elementos suficientes para determinar, com segurança:

- o nome do sistema demonstrado;
- a organização, país ou unidade responsável pelo sistema;
- a arquitetura técnica da aplicação;
- tecnologias de front-end, back-end ou banco de dados;
- uso de APIs, eventos, mensageria ou integrações externas;
- modelo de autenticação e autorização;
- critérios completos de privacidade;
- perfil de usuários autorizados a criar, editar ou visualizar anotações;
- existência de auditoria ou trilha de alterações;
- modelo de notificações além do comportamento descrito para avisos e agenda;
- regras de SLA, priorização ou escalonamento;
- processo de criação e manutenção dos tipos de anotação;
- relação técnica exata entre aviso e agenda;
- regras de disponibilidade, monitoramento, contingência ou recuperação;
- integrações com a central telefônica;
- abrangência do “plano de tratamento” mencionado;
- significado técnico ou operacional de termos que possam ter sido deformados pela transcrição automática.

---

## 21. Conclusões

A reunião demonstra um modelo de gestão operacional de sinistros baseado em três princípios principais:

1. **Registrar informação no nível correto do processo**  
   As anotações livres podem ser associadas ao sinistro, ao expediente ou ao trâmite, conforme a abrangência da informação.

2. **Separar informação de pendência**  
   A anotação livre serve para documentar uma situação; o aviso serve para lembrar e controlar uma ação que precisa ser concluída.

3. **Centralizar a rotina do tramitador em uma visão de trabalho**  
   O menu do tramitador permite consultar expedientes e pendências por critérios operacionais, reduzindo a necessidade de acesso exclusivamente por identificadores manuais de sinistro ou expediente.

A principal orientação prática extraída da demonstração é simples:

> Se algo deve apenas ficar registrado, utiliza-se uma anotação livre. Se algo precisa ser lembrado, acompanhado e finalizado, utiliza-se um aviso — ou uma agenda, quando houver componente temporal, conforme o exemplo apresentado.

A transcrição oferece uma visão funcional consistente sobre esse comportamento, mas não detalha a arquitetura técnica, as regras completas de segurança, a governança de configuração ou o roadmap da solução.
