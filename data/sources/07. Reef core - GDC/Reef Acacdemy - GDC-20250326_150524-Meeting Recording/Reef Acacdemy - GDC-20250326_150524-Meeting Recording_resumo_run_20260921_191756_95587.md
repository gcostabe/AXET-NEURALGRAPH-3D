# Relatório de Análise Avançada de Transcrição

**Arquivo de origem:** `Reef Acacdemy - GDC-20250326_150524-Meeting Recording.mp4`
**Data de processamento:** 21/09/2026 19:25:54
**Modelo de transcrição:** whisper.cpp Metal (small) — idioma: es
**Modelo de interpretação IA:** axet-code (gpt-5.6-terra)
**Prompt utilizado:** análise sênior avançada (documentação funcional, arquitetura, negócio, riscos, Q&A, anti-alucinação)

---

# Análise estruturada da formação sobre GDC

## 1. Síntese executiva

A reunião foi uma formação prática sobre a ferramenta **GDC**, apresentada como um mecanismo de desenvolvimento orientado por parametrização. O objetivo principal é viabilizar a criação e a manutenção de telas para manutenção de tabelas sem que toda a experiência de interface precise ser programada manualmente.

O modelo apresentado separa duas preocupações complementares:

1. **Parametrização de front-end e manutenção de dados**, configurada em tabelas próprias do GDC: campos, telas, rótulos, ajudas, listas de valores, validações básicas e comportamento visual.
2. **Validação de regra de negócio**, executada no lado servidor por meio de uma API Java, chamada na transcrição de **CMN API** ou, em alguns trechos, “Semeneapi” — provavelmente uma variação causada pelo reconhecimento de voz.

A formação também explicou o ciclo de vida de um conceito GDC: geração inicial a partir dos metadados de uma tabela, personalização funcional, criação de traduções, associação de ajudas, implementação de validações no back-end e promoção entre ambientes por arquivos CSV versionados em repositórios de configuração, com automação de publicação e implantação.

A principal mensagem é que o GDC acelera a construção de manutenções de tabelas padronizadas, mas não elimina a necessidade de desenvolvimento quando existem regras funcionais. A parametrização cobre grande parte da interface e das validações de formato; a lógica de negócio deve continuar protegida e validada pela API.

---

## 2. Contexto e antecedentes

A formação situa o GDC dentro de três tipos de desenvolvimento que vinham sendo trabalhados. Os outros dois mencionados foram:

- **Neutron**;
- novos front-ends.

Não há detalhes suficientes na transcrição para determinar a função precisa de Neutron ou dos “novos front-ends”, mas o GDC foi apresentado como uma abordagem específica para casos em que se deseja criar telas de manutenção de tabelas baseadas em configuração.

A documentação relacionada estaria disponível em um ambiente chamado **Marketplace**, dentro de uma área referida como **Rift** e, mais especificamente, **Rift Core**. Esses nomes foram reproduzidos conforme a transcrição; não é possível confirmar se todos correspondem exatamente à nomenclatura oficial dos produtos ou repositórios.

Segundo a apresentação, o Marketplace reúne:

- documentação de arquitetura;
- documentação de desenvolvimento;
- materiais de formações já realizadas;
- apresentação sobre arquitetura do GDC;
- vídeo da formação de arquitetura;
- guia de desenvolvimento;
- modelo de dados relacional;
- exemplos de validações;
- documentação sobre tipos de campo;
- formatos;
- ajudas;
- listas de opções;
- listas de valores.

A reunião foi estruturada como uma demonstração prática. Primeiro, foi mostrado como gerar e ajustar uma parametrização GDC. Depois, outro participante apresentou a implementação das validações Java. Por fim, foi explicado como exportar a configuração e promovê-la entre ambientes.

---

## 3. Problemas e necessidades abordados

### 3.1 Necessidade de criar manutenções de tabelas com rapidez

O cenário apresentado parte da necessidade de criar telas para consultar, inserir, editar, copiar e remover registros de tabelas. Construir individualmente cada tela exigiria configurar campos, rótulos, ordenações, filtros, formatos, listas de valores e validações.

O GDC foi apresentado como forma de reduzir esse esforço por meio de parametrização.

Relação de causa e efeito identificada:

```text
Necessidade de manter tabelas
↓
Repetição de padrões de interface e operações CRUD
↓
Necessidade de reduzir desenvolvimento manual
↓
Parametrização de telas e campos no GDC
↓
Geração de manutenções funcionais e padronizadas
```

### 3.2 Necessidade de diferenciar validações de interface e regras de negócio

A reunião destacou que há dois níveis de validação:

- validações de front-end, como obrigatoriedade, tamanho, formato, faixa numérica e expressões regulares;
- validações funcionais ou de negócio, executadas no back-end.

A necessidade de validação no servidor foi apresentada também como uma preocupação de segurança. Mesmo quando um campo está bloqueado ou desabilitado no front-end, um usuário poderia, segundo o exemplo dado, interceptar e alterar a requisição no navegador antes de ela chegar ao serviço.

Portanto:

```text
Validação visual no front-end
não é suficiente
↓
Uma requisição pode ser manipulada antes do envio
↓
Regras críticas precisam ser revalidadas no back-end
↓
CMN API executa a validação antes de insert ou update
```

### 3.3 Necessidade de promover configurações entre ambientes de forma controlada

A configuração GDC não deve depender de ajustes manuais repetidos em cada ambiente. A apresentação enfatizou que a exportação e a instalação podem ser feitas manualmente, mas essa não é a abordagem recomendada.

O fluxo desejado é:

```text
Conceito configurado no GDC
↓
Exportação para CSV
↓
Versionamento no repositório GDC Conf
↓
Promoção entre branches
↓
Automatismos publicam artefatos
↓
Implantação no ambiente correspondente
```

---

## 4. Solução apresentada: GDC

O GDC foi descrito como uma ferramenta para desenvolver manutenções de tabelas por parametrização, com uma aplicação visual referida na transcrição como “WixiWik”. Esse nome pode ter sido afetado pelo reconhecimento automático de voz; a transcrição não permite confirmar a grafia ou o produto exato.

A solução permite:

- gerar uma base de configuração para uma tabela;
- visualizar e executar a manutenção correspondente;
- configurar campos, telas, rótulos e traduções;
- definir como os campos aparecem em busca, listagem, criação e edição;
- associar listas de valores e listas de opções;
- configurar dependências entre campos;
- definir valores padrão;
- configurar validações básicas no cliente;
- chamar APIs externas para ajudas e validações;
- enviar a operação para validação funcional antes de persistir os dados;
- exportar a configuração para arquivo CSV;
- promover essa configuração entre ambientes por automação.

A aplicação consulta a configuração armazenada no banco de dados do GDC e, com base nela, interage com a base de dados do ambiente referido como **Rift**.

---

## 5. Arquitetura e funcionamento lógico

A reunião não apresentou um diagrama formal, mas a arquitetura lógica pode ser reconstruída da seguinte forma.

> **Representação analítica consolidada a partir da explicação verbal; não corresponde necessariamente a um diagrama literal exibido durante a reunião.**

```text
Usuário final
↓
Aplicação integrada ao “Fuji”
↓
Tela GDC gerada por parametrização
↓
Tabelas de configuração do GDC
  - Conceito
  - Campo
  - Tela
  - Tela-Campo
  - Traduções
  - Ajudas
  - Configurações externas
↓
Operações sobre tabelas de negócio no ambiente Rift
↓
Validação funcional via CMN API
↓
Serviço Java específico do conceito
↓
Camada de acesso a dados / consultas JDBC / mapeadores
↓
Base de dados e tabelas de negócio
```

### 5.1 Fluxo de consulta e manutenção

A ferramenta gera uma experiência de interface padronizada para manutenção de tabelas:

```text
Busca
↓
Consulta de registros
↓
Ações disponíveis conforme permissões:
- consultar;
- editar;
- copiar;
- excluir;
- criar novo registro.
```

A aparência e o comportamento da tela dependem da configuração do conceito e de seus campos.

### 5.2 Fluxo de insert ou update

Quando um usuário tenta salvar uma alteração:

```text
Usuário cria ou edita um registro
↓
GDC aplica validações configuradas no cliente
↓
GDC chama a API de validação associada ao conceito
↓
CMN API executa a lógica Java
↓
Se houver erros:
  API devolve lista de erros
  ↓
  GDC exibe os erros ao usuário
↓
Se não houver erros:
  GDC executa insert ou update
```

A transcrição indica que a validação pode retornar diversos erros acumulados, não apenas o primeiro problema encontrado.

### 5.3 Fluxo de listas de valores e ajudas externas

Para campos que precisam oferecer opções dinâmicas:

```text
Campo configurado com ajuda externa
↓
Identificador da ajuda aponta para configuração externa
↓
GDC chama uma API padronizada de lista de opções ou valores
↓
API devolve código e descrição
↓
GDC apresenta lupa, combo ou outro componente configurado
```

---

## 6. Papéis e permissões no GDC

A formação explicou que o acesso ao GDC depende de papéis associados ao usuário. Foram citados quatro papéis principais.

| Papel | Finalidade descrita |
|---|---|
| Usuário | Acessa apenas os conceitos disponíveis para uso final. |
| Gestor | Pode definir a configuração das telas. |
| Configurador | Pode configurar elementos da ferramenta, como ajudas, APIs externas e sentenças. |
| Administrador | Tem acesso amplo para manter tabelas de parametrização do GDC. |

O usuário final não deveria visualizar a “cabeceira” administrativa da ferramenta, pois o GDC estaria integrado a um sistema referido como **Fuji**.

A transcrição não detalha:

- o mecanismo de autenticação;
- como os papéis são atribuídos;
- quais permissões específicas existem dentro de cada papel;
- se há segregação adicional por país, companhia ou ambiente.

---

## 7. Modelo de parametrização

### 7.1 Conceito

Um conceito representa a manutenção configurada para uma tabela ou conjunto de dados.

Na definição do conceito foram mencionados:

- identificador;
- nome funcional;
- etiqueta ou rótulo;
- associação com validação externa;
- associação com menu;
- referência para configurações externas.

O nome do conceito foi apresentado como uma referência funcional que pode ser escolhida de forma mais amigável para facilitar buscas e manutenção. Não parece ser necessariamente restrito ao nome técnico da tabela.

### 7.2 Campo

A tabela de campos contém a parametrização de cada coluna da tabela de negócio.

Para cada campo podem ser configurados aspectos como:

- coluna correspondente na tabela;
- indicação de chave primária;
- tipo de dado;
- rótulo;
- texto de ajuda;
- visibilidade;
- obrigatoriedade;
- possibilidade de edição;
- presença em busca;
- presença em listagem;
- ordem de exibição;
- tipo visual;
- validações;
- tamanho mínimo e máximo;
- valores mínimos e máximos para números;
- ajuda para busca;
- ajuda para edição ou criação;
- descrição exibida;
- criptografia de dados sensíveis;
- dependências em relação a outros campos;
- valor padrão;
- formato de data;
- estilos ou ajustes visuais.

### 7.3 Tela e Tela-Campo

Por padrão, os campos de uma manutenção podem aparecer agrupados em um único bloco. Quando é necessário estruturar visualmente uma tela em seções, usa-se a parametrização de telas.

A tabela de telas permite criar agrupadores com título. A tabela de relação tela-campo associa cada campo ao agrupador correspondente.

O exemplo apresentado mencionou uma tela com seis registros na tabela de telas, cada um correspondendo a uma seção ou agrupamento visual.

### 7.4 Traduções

Rótulos e textos precisam ser configurados para suportar múltiplos idiomas.

O processo descrito foi:

1. identificar a etiqueta gerada ou definida no conceito;
2. solicitar ou cadastrar a etiqueta no “modelo de dados”, quando ela ainda não existir;
3. registrá-la na tabela de tradução do GDC;
4. informar idioma e valor traduzido;
5. realizar o cadastro, pelo menos, em espanhol e inglês;
6. recarregar a aplicação para visualizar o rótulo atualizado.

A transcrição menciona que algumas etiquetas podem já existir em outro contexto, aparentemente relacionado a Neutron. Entretanto, não há detalhes suficientes para determinar o modelo completo de internacionalização.

---

## 8. Acelerador de geração de conceitos

Um dos recursos centrais apresentados foi o acelerador de geração de conceitos.

Ele permite selecionar uma tabela de negócio, ler seus metadados e gerar automaticamente o “primeiro esqueleto” da parametrização.

Esse esqueleto cria principalmente a configuração inicial das quatro estruturas abaixo:

1. conceito;
2. campo;
3. tela;
4. tela-campo.

O acelerador reduz trabalho manual especialmente para tabelas com muitas colunas. Foi citado o caso de tabelas com 20 ou 30 colunas.

### 8.1 Comportamento apresentado

Ao buscar uma tabela:

- se já existir manutenção configurada, a opção aparece em amarelo e não pode ser selecionada;
- se ainda não existir manutenção, a opção aparece em verde e pode ser selecionada;
- ao gerar o conceito, o GDC lê metadados e cria a parametrização básica;
- campos de auditoria ou campos que não devem ser mantidos podem ser excluídos da visualização;
- alguns campos podem ter sua obrigatoriedade derivada dos metadados da tabela;
- o conceito gerado torna-se funcional para operações básicas;
- após a geração, ainda é necessário ajustar rótulos, traduções, ajudas, tipos visuais e regras específicas.

### 8.2 Exemplo demonstrado

Foi criado um conceito relacionado a uma tabela cujo nome foi transcrito aproximadamente como:

> “zona asignación proveedor por actividad tipología y categoría”

A nomenclatura técnica exata da tabela não pode ser confirmada apenas pela transcrição.

O conceito criado recebeu o identificador **1363**, embora em alguns trechos tenha sido mencionado “363” e “1663”. Essa inconsistência provavelmente decorre de fala rápida ou reconhecimento de voz. Portanto, o identificador não deve ser tratado como referência confiável fora do exemplo didático.

O conceito gerado foi demonstrado como funcional: o apresentador realizou uma busca, editou um valor de “N” para “S”, salvou e confirmou a atualização.

---

## 9. Busca, listagem e comportamento dos campos

A parametrização permite controlar quais campos aparecem em busca e listagem.

### 9.1 Campos de busca

Foi explicado que:

- valor `0` ou `-1` em determinada configuração significa que o campo não aparece no buscador;
- os demais valores definem a ordem em que os campos aparecem.

A experiência padrão da ferramenta foi descrita como:

```text
Buscador
↓
Resultado da busca
↓
Ações de consulta, cópia, remoção, edição ou criação
```

### 9.2 Campos de listagem

A mesma lógica de ordenação é aplicada às colunas do resultado da busca.

A parametrização permite selecionar:

- quais colunas serão exibidas;
- em que ordem;
- se serão apresentados somente códigos;
- se será apresentada descrição;
- se serão apresentados código e descrição.

### 9.3 Campo de descrição

Quando uma ajuda retorna códigos, pode ser necessário exibir uma descrição mais compreensível.

A reunião explicou que, para isso, a ajuda precisa ser marcada como “cacheable” e o campo deve ser configurado para mostrar:

- apenas a descrição; ou
- código e descrição.

Esse comportamento foi demonstrado com uma ajuda de “atividade de terceiro/provedor”.

---

## 10. Tipos de campos e validações de front-end

O GDC permite configurar diversos tipos visuais de campo. Foram citados:

- campo numérico;
- data;
- checkbox;
- radio;
- lupa;
- combo;
- campo de texto;
- campos derivados de ajudas ou listas de valores.

As validações de cliente citadas incluem:

- alfanumérico;
- código;
- decimais;
- e-mail;
- moeda;
- número;
- texto;
- expressão regular;
- obrigatoriedade;
- visibilidade;
- possibilidade de edição;
- conversão para maiúsculas;
- tamanho mínimo e máximo;
- valor numérico mínimo e máximo.

As validações predefinidas foram descritas como expressões regulares já existentes na ferramenta. Caso seja necessária uma validação nova, a reunião indicou que há local específico para cadastrá-la, documentado no Marketplace.

### 10.1 Exemplo de campo numérico

Foi citado um campo numérico que deveria ser positivo, com mínimo igual a 1 e máximo mencionado como 99. Posteriormente, a demonstração exibiu uma mensagem indicando valor máximo 999.

Há uma divergência entre os números mencionados. A transcrição não permite confirmar qual limite foi efetivamente configurado no exemplo.

### 10.2 Datas

Para campos de data, foram apresentados dois formatos:

- simples: usado quando somente a data é relevante;
- estendido: usado quando também se trabalha com horário.

A ferramenta permite configurar esse formato por campo.

### 10.3 Valores padrão e expressões

Foram citados valores padrão fixos ou calculados por expressão.

Exemplos:

| Campo ou contexto | Expressão mencionada |
|---|---|
| Data de modificação | `sysdate` |
| Companhia | expressão associada ao usuário, transcrita aproximadamente como `usuario.compania` |

Esses exemplos mostram que a ferramenta pode preencher automaticamente alguns campos de auditoria ou contexto.

---

## 11. Dados sensíveis

A parametrização contempla a possibilidade de marcar campos como criptografados.

O caso citado foi o de informações como:

- usuário de API;
- senha de API;
- outros dados sensíveis usados em configuração.

Segundo a explicação, quando esses dados são sensíveis, eles não devem ser devolvidos pelo serviço de forma visível, inclusive em ferramentas de depuração do navegador.

A reunião não detalhou:

- algoritmo de criptografia;
- mecanismo de armazenamento de segredos;
- rotação de credenciais;
- política de acesso;
- integração com cofre de segredos;
- mascaramento de logs;
- auditoria de uso de credenciais.

---

## 12. Dependências entre campos

O GDC permite declarar dependências entre campos.

O exemplo utilizado foi o de marca e modelo:

```text
Marca
↓
Modelo depende da marca
↓
Ao mudar a marca
↓
A ajuda ou lista de valores de modelo é recarregada
```

Também é possível usar dependências para limitar opções de um campo com base em valores selecionados anteriormente.

Isso é particularmente relevante para listas de valores de criação ou edição, nas quais uma opção pode depender de outro dado já informado na tela.

---

## 13. Ajudas, listas de opções e listas de valores

### 13.1 Tipos de ajuda

Foram mencionados três tipos de ajuda:

| Tipo | Uso descrito |
|---|---|
| Fixa | Valores definidos diretamente na configuração. |
| Sentença | Consulta direta, usada internamente pela ferramenta. |
| Acesso externo | Consulta via API, associada a listas de opções ou valores. |

### 13.2 Ajuda fixa

O exemplo apresentado foi a ajuda “S/N”, utilizada para campos que armazenam “S” ou “N”.

A reunião explicou que o sistema referido como Tron não interpreta diretamente valores como:

- `0`;
- `true`;
- booleanos em geral.

Em vez disso, para esse cenário, a persistência utiliza “S” e “N”.

A ajuda fixa é configurada com:

- código;
- etiqueta;
- tradução correspondente.

### 13.3 Ajuda por sentença

A utilização de sentenças foi desaconselhada para desenvolvimento comum.

A justificativa apresentada foi que a ferramenta possui listas de opções e listas de valores para esse objetivo, enquanto as sentenças seriam utilizadas mais internamente pelo próprio GDC.

Foi dado como exemplo uma sentença que consulta tabelas do GDC para devolver conceitos já criados.

### 13.4 Ajuda externa

A ajuda externa é o mecanismo recomendado para obter valores dinâmicos.

O identificador foi descrito com uma nomenclatura composta por:

```text
Identificador da lista
@
Versão
@
V ou O
+
Instalação
```

A explicação foi que:

- `V` representa lista de valores;
- `O` representa lista de opções;
- a instalação pode ser, por exemplo, `TRN`.

A grafia exata do padrão não ficou totalmente clara na transcrição, especialmente quanto aos separadores e concatenação final. O princípio central, porém, foi explicitado: a identificação da ajuda carrega referência à lista, versão, tipo e instalação.

### 13.5 Diferença entre ajuda de busca e ajuda de edição

Um mesmo campo pode usar duas ajudas diferentes:

- uma para busca;
- outra para criação e edição.

O exemplo foi novamente o de marca e modelo.

Na busca, talvez não seja obrigatório informar marca; portanto, a lista de modelos pode precisar devolver todos os modelos.

Na edição ou criação, a lista de modelos pode depender da marca previamente selecionada; portanto, deve retornar apenas os modelos correspondentes.

Essa diferenciação permite adequar a experiência de busca à experiência de preenchimento de dados.

---

## 14. Configuração de integrações externas

A tabela de configuração externa armazena referências para APIs utilizadas pelo GDC.

Foram mencionados os seguintes dados:

- identificador;
- descrição;
- base URL;
- context URL;
- usuário;
- senha;
- parâmetros de formatação;
- configuração por instalação.

Um identificador chamado aproximadamente de **TestTRON** foi mencionado como referência padrão para determinadas ajudas externas. A grafia exata não pode ser confirmada.

A arquitetura permite que, durante desenvolvimento local, um desenvolvedor crie uma configuração externa apontando para sua máquina local ou API local.

O fluxo descrito é:

```text
Desenvolvedor cria configuração externa local
↓
Associa essa configuração temporariamente ao conceito
↓
Executa e testa a API em ambiente local
↓
Conclui o desenvolvimento
↓
Restaura a referência do conceito para a configuração padrão
↓
Entrega API e conceito nos repositórios correspondentes
```

Isso sugere uma estratégia de desenvolvimento que desacopla a interface GDC da URL definitiva do serviço, permitindo validação local sem alterar permanentemente a configuração padrão.

---

## 15. Teste de listas de opções e valores

A apresentação mostrou que as listas externas podem ser testadas diretamente por uma interface de API, aparentemente Swagger.

Foi citado um endpoint ou operação chamada aproximadamente de:

> “evaluar option list”

Os parâmetros de teste incluíam, conforme a demonstração:

- cacheable;
- instalação;
- tipo de lista;
- identificador;
- versão;
- idioma;
- usuário;
- dados adicionais exigidos pela lista.

A aplicação normalmente envia automaticamente idioma e usuário a partir da sessão. Porém, para testes diretos pela interface de API, esses valores precisam ser enviados manualmente.

### 15.1 Diagnóstico de falhas

Foi apresentada uma abordagem prática para investigar listas de valores que não retornam resultados:

```text
Ajuda não retorna valor no GDC
↓
Verificar definição da ajuda
↓
Testar a lista diretamente pela API
↓
Se a API retornar resultados:
  investigar parametrização ou ferramenta
↓
Se a API não retornar resultados:
  investigar a própria API, seus dados ou parâmetros
```

Em um exemplo de tipologias, a lista não retornou dados. A conclusão explicitamente apresentada foi que, naquele caso, o problema não parecia estar na definição da ajuda nem na ferramenta, mas no fato de a API não devolver registros para os dados enviados.

---

## 16. Validação funcional no CMN API

### 16.1 Papel da API

A validação funcional é executada antes da persistência. A API recebe os dados enviados pela tela e decide se a operação pode prosseguir.

Se a validação for bem-sucedida:

- o fluxo permite o insert ou update.

Se houver erro:

- a API devolve erros configurados;
- o GDC mostra esses erros ao usuário;
- a persistência não é executada.

### 16.2 Serviço de validação

A implementação Java deve seguir uma convenção de nomenclatura. A transcrição cita uma interface ou serviço chamado:

> `Validation API Service`

Também foi dito que o nome do serviço deve combinar essa denominação com o nome do conceito.

A nomenclatura exata de classes, pacotes e anotações não deve ser considerada plenamente confiável devido à qualidade da transcrição, mas a intenção é clara: cada conceito deve possuir um serviço de validação identificado de forma padronizada.

### 16.3 Método de validação

O serviço precisa implementar um método chamado aproximadamente:

> `Concept Validation`

Esse método recebe um corpo com:

- dados novos;
- dados antigos;
- dados do usuário;
- companhia;
- conceito;
- informações necessárias à execução da validação.

A presença de dados antigos indica que se trata de atualização. A ausência de dados antigos indica criação.

```text
Dados antigos presentes
→ operação de modificação

Dados antigos ausentes
→ operação de criação
```

### 16.4 Exemplo de validação

Foi demonstrado um caso em que um usuário alterou um código relacionado a grupo de estrutura para um valor inexistente.

O fluxo explicado foi:

```text
Usuário altera dado
↓
GDC envia dados novos e antigos
↓
Serviço Java verifica a existência do dado
↓
Dado não existe
↓
Erro é criado e acumulado
↓
API devolve erro
↓
GDC mostra mensagem na tela
```

Também foi citado o caso de um campo que não pode ser modificado. Mesmo que esteja desabilitado no front-end, a API precisa comparar o valor antigo com o novo e rejeitar a alteração se ela ocorrer.

---

## 17. Acúmulo de erros de validação

As validações não foram descritas como “falha rápida” no primeiro problema encontrado. Em vez disso, o serviço cria uma lista ou pilha de erros.

O fluxo é:

```text
Executar validação 1
↓
Se falhar, adicionar erro à lista
↓
Executar validação 2
↓
Se falhar, adicionar erro à lista
↓
Continuar pelas demais validações
↓
Devolver a coleção completa de erros
```

A finalidade é permitir que o usuário receba vários erros de uma vez, reduzindo o ciclo de corrigir um problema, reenviar e descobrir outro.

---

## 18. Acesso a dados nas validações

As validações podem consultar tabelas usando componentes chamados na transcrição de “dados de acesso a dados”, provavelmente uma referência a objetos ou camadas de acesso a dados.

O modelo descrito inclui:

- interface de acesso a dados;
- implementação correspondente;
- consulta SQL;
- execução por JDBC;
- `RowMapper`;
- objeto de saída;
- injeção da dependência na classe de validação, por `Autowired`.

O fluxo lógico é:

```text
Serviço de validação
↓
Componente de acesso a dados
↓
Consulta SQL via JDBC
↓
Mapeamento das colunas via RowMapper
↓
Resultado convertido em objeto
↓
Validação decide se cria erro
```

A apresentação explicou que o `RowMapper` relaciona colunas retornadas pela tabela com campos do objeto de saída.

### 18.1 Exemplo de validação por existência

Foi demonstrada uma regra conceitual:

```text
Se o campo não for nulo
↓
Consultar se o valor existe
↓
Se não existir:
  lançar ou capturar exceção
  ↓
  adicionar erro à lista de validação
```

Também foram mencionadas validações baseadas em constantes, além de validações de alteração de campos não modificáveis.

---

## 19. Segurança e integridade da validação

Um ponto relevante da formação foi a defesa de validação em camadas.

A apresentação esclareceu que:

- uma regra de campo desabilitado no front-end melhora a experiência do usuário;
- porém, ela não é suficiente para proteger a integridade da regra;
- uma pessoa poderia manipular a requisição no navegador;
- por isso, a mesma regra deve ser validada na API.

Essa é uma conclusão explicitamente defendida pelos participantes, não apenas uma interpretação analítica.

```text
Controle visual no cliente
↓
Pode ser contornado por alteração da requisição
↓
Regra de negócio deve existir no servidor
↓
API rejeita alteração indevida
```

---

## 20. Exemplo de erro devolvido

Na demonstração, foi apresentado um caso no qual o valor de uma atividade foi alterado para algo que não poderia ser modificado.

A resposta exibida indicava, aproximadamente, que:

> a atividade/definição de terceiro não pode ser modificada.

O nome técnico exato do campo e a redação integral da mensagem não podem ser confirmados com segurança, mas o propósito do exemplo foi evidenciar que:

- a API detecta a mudança;
- inclui o erro na resposta;
- o GDC mostra o erro ao usuário.

---

## 21. Promoção entre ambientes

### 21.1 Exportação

O GDC possui uma funcionalidade de importação e exportação.

Para exportar um conceito:

1. localizar o conceito pelo código;
2. marcar “elementos adicionais”;
3. exportar;
4. obter o arquivo CSV resultante.

A reunião enfatizou que marcar “elementos adicionais” é importante, pois sem isso podem faltar itens associados ao conceito, como:

- ajudas;
- etiquetas;
- possivelmente outras configurações dependentes.

### 21.2 Conteúdo do CSV

O arquivo CSV contém a parametrização do conceito nas tabelas GDC, incluindo:

- tabelas principais de configuração;
- ajudas;
- etiquetas;
- demais elementos associados, desde que a exportação inclua elementos adicionais.

### 21.3 Repositório GDC Conf

O arquivo CSV deve ser submetido a um repositório referido como:

> Oretron GDC Conf

A grafia pode estar incorreta devido à transcrição. O conceito central é que existe um repositório específico de configuração GDC.

A organização apresentada separa:

- um repositório de conceitos de Core;
- repositórios próprios por país, contendo conceitos locais.

### 21.4 Fluxo por branches

O processo descrito inclui branches de feature e promoção por estágios. Foram mencionadas branches ou referências como:

- feature;
- development;
- release;
- master.

Também foram mencionados ambientes ou estágios como:

- desenvolvimento;
- integração contínua;
- IC;
- “intempree”, possivelmente um nome de ambiente reconhecido de forma imprecisa;
- uma versão ou referência “2502”.

A transcrição não permite estabelecer com segurança o mapeamento exato entre todas as branches, ambientes e versões.

O fluxo geral apresentado foi:

```text
Branch de feature
↓
Entrega de CSV
↓
Promoção por branches
↓
Automatismo coleta CSVs da branch
↓
Publicação de artefato no Azure Artifact
↓
Implantação no ambiente correspondente
```

### 21.5 Instalação manual

A ferramenta permite importar o CSV manualmente. Entretanto, a orientação explícita foi evitar esse processo como caminho padrão.

A recomendação foi:

> entregar sempre por automatismos, por meio do repositório GDC Conf.

---

## 22. Modelo operacional observado

A reunião não detalhou uma operação completa de produção, mas apresentou elementos de um modelo operacional baseado em configuração versionada e automação.

| Aspecto | O que foi apresentado |
|---|---|
| Configuração de telas | Feita no GDC e armazenada nas tabelas de parametrização. |
| Versionamento | CSVs entregues ao repositório GDC Conf. |
| Promoção entre ambientes | Automatizada por branches e publicação de artefatos. |
| Teste de ajudas | Pode ser feito diretamente contra a API. |
| Desenvolvimento local | Possível por configuração externa apontando para API local. |
| Validação de negócio | Executada no CMN API. |
| Importação manual | Possível, mas não recomendada como processo padrão. |

Não foram detalhados:

- gestão de incidentes;
- processo de rollback;
- monitoramento;
- observabilidade;
- SLAs;
- aprovação de releases;
- gestão de mudanças;
- política de versionamento de APIs;
- governança de dados;
- estratégia de recuperação de desastre.

---

## 23. Governança e organização

A formação não apresentou uma estrutura organizacional ampla, como Product Managers, Product Owners, Scrum Masters ou comitês de arquitetura.

Ainda assim, alguns papéis e responsabilidades podem ser identificados:

| Papel ou área | Responsabilidade observada |
|---|---|
| Desenvolvedor GDC | Configura conceitos, campos, ajudas, traduções e telas. |
| Desenvolvedor Java | Implementa validações funcionais no CMN API. |
| Modelo de dados | Parece participar do cadastro ou solicitação de novas etiquetas. |
| Usuário final | Utiliza conceitos autorizados na aplicação integrada. |
| Administrador GDC | Mantém qualquer tabela de parametrização da ferramenta. |
| Configurador | Configura a ferramenta, ajudas, APIs externas e elementos relacionados. |
| Gestor | Define configuração de telas, conforme descrição apresentada. |

A reunião também indicou uma prática de suporte informal: caso surjam dúvidas durante o uso, os participantes poderiam procurar os apresentadores e consultar exemplos existentes ou a documentação do Marketplace.

---

## 24. Casos concretos apresentados

### Caso 1 — Geração de manutenção para tabela de atribuição de fornecedor

**Contexto**  
Foi criada uma manutenção baseada em uma tabela relacionada a zona, fornecedor, atividade, tipologia e categoria.

**Arquitetura utilizada**  
O conceito foi gerado pelo acelerador com base nos metadados da tabela.

**Componentes utilizados**

- conceito;
- campos;
- busca;
- listagem;
- etiquetas;
- traduções;
- ajudas;
- validações de cliente;
- validações de API;
- exportação CSV.

**Diferenciais demonstrados**

- criação rápida de configuração inicial;
- geração automática de campos;
- obrigatoriedade derivada de metadados;
- funcionalidade CRUD inicial;
- posterior personalização de etiquetas e tipos de campo.

**Limitações ou ressalvas**

- o esqueleto não resolve toda a configuração;
- rótulos, multidioma, ajudas e ajustes funcionais ainda precisam ser configurados;
- regras de negócio precisam ser implementadas no back-end.

### Caso 2 — Campo S/N configurado como seleção

**Contexto**  
Um campo inicialmente criado de forma genérica foi ajustado para representar um valor S/N.

**Configuração**

- tipo visual configurado como radio, segundo a demonstração;
- ajuda fixa associada;
- valores “S” e “N” usados como persistência.

**O que demonstra**  
A geração inicial por metadados não conhece todas as intenções funcionais da coluna. O desenvolvedor precisa ajustar o tipo de controle apropriado.

### Caso 3 — Ajuda para atividade de terceiro/provedor

**Contexto**  
Foi configurada uma ajuda externa para retornar atividades relacionadas a terceiro ou fornecedor.

**Diferencial**  
A lista pôde ser marcada como cacheable e configurada para exibir:

- apenas descrição;
- código e descrição.

**O que demonstra**  
O GDC pode transformar códigos técnicos em valores mais compreensíveis na experiência de usuário.

### Caso 4 — Lista de tipologias sem retorno

**Contexto**  
Uma ajuda para tipologias não retornou dados durante a demonstração.

**Diagnóstico apresentado**

- a parametrização foi revisada;
- a ajuda foi testada diretamente;
- a conclusão foi que a API não retornava dados para os parâmetros fornecidos.

**O que demonstra**  
O teste direto de listas externas ajuda a separar problemas de interface, configuração e API.

### Caso 5 — Bloqueio de alteração de campo por validação Java

**Contexto**  
Foi demonstrado um campo que não podia ser alterado após a criação.

**Regra**  
Se o valor novo for diferente do antigo durante uma modificação, a API gera erro.

**O que demonstra**  
Restrições críticas não devem existir somente na tela; precisam ser impostas no servidor.

---

## 25. Perguntas e respostas relevantes

A reunião não registrou uma rodada formal extensa de perguntas dos participantes. Grande parte do conteúdo foi apresentada de forma demonstrativa, com perguntas retóricas e explicações antecipando dúvidas comuns.

### Pergunta implícita: como criar rapidamente uma manutenção de tabela?

**Resposta**  
Usar o acelerador de conceitos, que lê os metadados da tabela e gera o esqueleto de parametrização.

**O que isso esclarece**  
O GDC não exige começar a configuração campo a campo, embora a personalização posterior continue necessária.

---

### Pergunta implícita: por que um campo precisa de duas ajudas?

**Resposta**  
A ajuda de busca pode ter regras diferentes da ajuda de criação ou edição. Em busca, pode ser necessário retornar todos os valores; em edição, a lista pode depender de outro campo já selecionado.

**O que isso esclarece**  
A ferramenta diferencia contexto de consulta e contexto de preenchimento.

---

### Pergunta implícita: onde descobrir por que uma lista de valores não retorna dados?

**Resposta**  
Testar diretamente a operação correspondente na API, passando os parâmetros necessários.

**O que isso esclarece**  
A investigação deve separar falhas de configuração GDC, falhas de ferramenta e falhas do serviço de listas de valores.

---

### Pergunta implícita: por que validar no back-end se o campo já está bloqueado na tela?

**Resposta**  
Porque a requisição pode ser manipulada no navegador antes de chegar ao servidor.

**O que isso esclarece**  
A validação de interface é insuficiente como mecanismo de integridade ou segurança.

---

### Pergunta implícita: como testar uma API local durante o desenvolvimento?

**Resposta**  
Criar uma configuração externa apontando para localhost ou para a API local e associá-la temporariamente ao conceito.

**O que isso esclarece**  
A configuração de endpoint é desacoplada do conceito e pode ser adaptada temporariamente para desenvolvimento.

---

### Pergunta implícita: como promover um conceito para outros ambientes?

**Resposta**  
Exportar o conceito com elementos adicionais, versionar o CSV no repositório GDC Conf e permitir que os automatismos façam a publicação e implantação.

**O que isso esclarece**  
A promoção entre ambientes deve ser baseada em repositório e automação, não em ajustes manuais.

---

## 26. Limitações reconhecidas

### 26.1 O acelerador gera apenas um esqueleto

A geração automática não produz uma configuração finalizada. Ainda é necessário configurar:

- etiquetas;
- traduções;
- tipos visuais;
- ajudas;
- dependências;
- regras específicas;
- possíveis ajustes de listagem e busca.

### 26.2 Nem toda regra pode ser resolvida no front-end

Validações de formato, obrigatoriedade e limites podem ser feitas na camada configurada do GDC, mas regras funcionais precisam ser validadas na API.

### 26.3 APIs podem não devolver resultados mesmo com configuração correta

O exemplo de tipologias mostrou que a ausência de retorno não implica necessariamente erro na configuração da ajuda ou na ferramenta.

### 26.4 Algumas configurações não devem ser manipuladas frequentemente

Foram citados elementos que, em princípio, já vêm configurados na instalação e não precisam ser alterados normalmente, como:

- formato de datas;
- separadores numéricos;
- determinados parâmetros externos;
- personalização CSS.

### 26.5 Sentenças não são recomendadas para desenvolvimento funcional comum

Embora existam, foram apresentadas como mecanismo mais interno da ferramenta. Para listas dinâmicas, a orientação foi usar listas de opções e listas de valores por acesso externo.

### 26.6 Importação manual é possível, mas não é o processo recomendado

A ferramenta permite importar CSVs manualmente, porém a orientação é usar o repositório e os automatismos de implantação.

---

## 27. Riscos e desafios

### 27.1 Riscos explicitamente mencionados

| Risco | Consequência apresentada | Mitigação mencionada |
|---|---|---|
| Manipulação de requisição no navegador | Alteração indevida de campo desabilitado no front-end | Revalidar a regra no back-end. |
| Exportar sem elementos adicionais | Ajudas, etiquetas ou elementos associados podem não ser promovidos | Marcar elementos adicionais na exportação. |
| Lista de valores sem retorno | Campo pode ficar sem opções para o usuário | Testar diretamente a API e revisar parâmetros. |
| Dados sensíveis visíveis | Credenciais poderiam aparecer em respostas ou depuração | Marcar informações sensíveis como criptografadas. |
| Instalação manual de configuração | Inconsistência entre ambientes | Priorizar promoção automatizada por repositório. |

### 27.2 Desafios derivados do contexto

> Os itens abaixo são leitura analítica baseada no conteúdo apresentado, não afirmações literais dos participantes.

#### Governança de configuração

Como a solução é altamente parametrizável, sua qualidade depende de disciplina na nomenclatura, no versionamento, no cadastro de traduções e na promoção dos CSVs.

#### Rastreabilidade entre configuração e API

Um conceito GDC pode depender de:

- configurações de campos;
- ajudas;
- listas externas;
- endpoints;
- serviço Java de validação;
- estrutura de dados.

Essa distribuição aumenta a necessidade de documentação e testes integrados.

#### Consistência de ambientes

A possibilidade de apontar temporariamente para uma API local é útil para desenvolvimento, mas exige cuidado para que referências locais não sejam promovidas indevidamente a ambientes compartilhados.

#### Dependência de APIs externas

Campos com ajudas externas dependem da disponibilidade e do contrato das APIs correspondentes. Uma falha no serviço de listas pode afetar diretamente a usabilidade da tela.

---

## 28. Transformações estruturais identificadas

> Esta seção apresenta interpretação analítica fundamentada no conjunto da reunião.

### 28.1 Desenvolvimento manual de telas para desenvolvimento orientado por metadados

O GDC desloca parte do esforço de desenvolvimento de código de interface para parametrização de metadados:

```text
Tela codificada manualmente
↓
Campos, rótulos, filtros e listas repetidos
↓
Configuração centralizada em tabelas GDC
↓
Tela gerada e padronizada por conceito
```

Isso sugere uma transformação de desenvolvimento de telas específicas para composição de interfaces a partir de configuração.

### 28.2 Interface padronizada com lógica de negócio especializada

A arquitetura separa claramente:

```text
GDC
→ experiência de manutenção padronizada

CMN API
→ regras funcionais específicas de cada conceito
```

Essa separação favorece reutilização da interface sem concentrar regras de negócio exclusivamente na camada de apresentação.

### 28.3 Ajustes manuais para entrega versionada e automatizada

A promoção por CSV, repositório e automatismos indica um direcionamento de infraestrutura e configuração como artefatos versionados.

```text
Configuração feita na ferramenta
↓
Exportada como CSV
↓
Versionada no repositório
↓
Publicada como artefato
↓
Implantada automaticamente
```

### 28.4 Validação de experiência para validação defensiva

A reunião reforça uma mudança de postura importante:

```text
Campo bloqueado no front-end
não é uma garantia de integridade
↓
Regras críticas precisam ser reexecutadas no servidor
```

---

## 29. Roadmap e evolução

A reunião não apresentou um roadmap formal com datas, marcos, responsáveis ou capacidades futuras.

Foram mencionadas algumas práticas de evolução:

- criação inicial de conceitos pelo acelerador;
- ajustes posteriores de configuração;
- exportação e promoção entre ambientes;
- possibilidade de modificar um conceito já existente, exportá-lo novamente e promover as mudanças;
- manutenção de conceitos Core em repositório próprio;
- manutenção de conceitos específicos de cada país em repositórios próprios.

Não é possível concluir:

- quais funcionalidades futuras do GDC estão planejadas;
- quais países usam ou usarão a solução;
- quais versões estão previstas;
- datas de rollout;
- critérios de adoção;
- responsáveis pelo roadmap.

---

## 30. Números e indicadores citados

Os números abaixo são referências declaradas durante a formação e não foram auditados externamente.

| Indicador | Valor mencionado | Contexto |
|---|---:|---|
| Estruturas básicas de um conceito | 4 tabelas | Conceito, campo, tela e tela-campo. |
| Colunas em tabelas que podem se beneficiar do acelerador | 20 a 30 | Exemplo de tabelas grandes. |
| Tipos principais de ajuda | 3 | Fixa, sentença e acesso externo. |
| Papéis principais | 4 | Usuário, gestor, configurador e administrador. |
| Idiomas explicitamente citados para traduções | 2 | Espanhol e inglês. |
| Conceitos ou ajuda externa | mais de 100 | Referência aproximada ao conjunto de listas externas; contexto não totalmente preciso. |
| Exemplo de conceito gerado | 1363 | Há inconsistência na transcrição com 363 e 1663. |
| Exemplo de telas em caso apresentado | 6 registros | Agrupadores de tela no exemplo. |

---

## 31. O que a reunião não permite concluir

A formação fornece visão detalhada de parametrização e validação, mas não detalha vários aspectos relevantes para uma documentação técnica completa.

Não é possível determinar com segurança:

- qual tecnologia implementa a aplicação GDC;
- qual framework de front-end é usado;
- qual banco de dados é utilizado;
- a estrutura física das tabelas do GDC;
- o modelo de autenticação;
- o modelo de autorização além dos quatro papéis citados;
- o mecanismo concreto de criptografia de dados sensíveis;
- onde credenciais são armazenadas;
- a tecnologia de cloud;
- uso ou não de Kubernetes;
- estratégia de CI/CD completa;
- estratégia de rollback;
- políticas de backup e recuperação de desastre;
- SLAs ou SLOs;
- observabilidade, logs, métricas e alertas;
- tratamento de indisponibilidade de APIs externas;
- controle de versão das APIs de listas de valores;
- governança de alterações nas listas externas;
- políticas de cache das ajudas;
- mecanismos de auditoria sobre alterações de conceitos;
- impacto de alterações de configuração em conceitos já utilizados;
- processo de testes automatizados;
- modelo de revisão de código para serviços Java;
- critérios para diferenciar conceitos Core de conceitos específicos por país;
- nomes oficiais de vários produtos, ambientes e repositórios citados de maneira possivelmente imprecisa pela transcrição.

---

## 32. Conclusões

O GDC foi apresentado como uma plataforma de parametrização para construção de manutenções de tabelas com experiência padronizada. Seu valor está em acelerar a criação de telas e reduzir desenvolvimento repetitivo para funcionalidades CRUD comuns.

A solução opera por uma combinação de:

- metadados armazenados em tabelas GDC;
- geração de conceitos a partir de metadados de tabelas;
- campos, telas, rótulos, traduções e ajudas configuráveis;
- integração com APIs para listas de valores;
- validações de formato no front-end;
- validações funcionais no CMN API;
- exportação da configuração em CSV;
- versionamento e implantação automatizada por repositório.

A reunião reforça que GDC não deve ser entendido como substituto integral da lógica de negócio. Ele resolve a camada configurável e repetitiva da manutenção de dados, enquanto regras funcionais, integridade e proteção contra manipulação de requisições devem permanecer no back-end.

Por fim, a adoção correta da ferramenta depende de três práticas essenciais apresentadas durante a formação:

1. configurar os conceitos com atenção a rótulos, ajudas, dependências e validações;
2. implementar regras funcionais no serviço Java associado ao conceito;
3. promover configurações de forma versionada e automatizada, evitando ajustes manuais entre ambientes.
