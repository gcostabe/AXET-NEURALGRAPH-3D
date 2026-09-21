# ARCHITECTURAL DECISIONS

## ADR-001 — Implantar camada de memória persistente do agente antes da implementação do RAG

Date: 2026-09-20

Status: Accepted

### Context

O usuário solicitou explicitamente que, antes de iniciar a implementação do sistema RAG local, fosse implantada uma arquitetura de memória persistente capaz de sobreviver a perda de contexto, compactação de conversa, reinício de sessão/plugin, troca de modelo, etc., e que impedisse memória antiga de ser interpretada como nova ordem.

### Decision

Criar a estrutura `AGENTS.md` + `.agent/{current_task,execution_journal,state,decisions,recovery,history/}` + arquivos de instrução (`.github/copilot-instructions.md`, `.vscode/settings.json`, `.stack_tech.md`, `.stdout-stderr-instructions.md`, `.answer_instructions.md`, `versionamento.md`), com hierarquia de autoridade onde a mensagem atual do usuário sempre vence sobre memória persistida, e onde tarefas ficam com `Resume Authorization: NO` por padrão a menos que explicitamente retomadas.

### Rationale

Sem isso, qualquer nova sessão/perda de contexto poderia levar o agente a repetir trabalho, perder o estado de implementação em andamento, ou pior, executar automaticamente tarefas antigas marcadas como pendentes sem autorização do usuário para aquela sessão específica.

### Consequences

Toda tarefa técnica futura neste workspace deve seguir o protocolo de checkpoint (write-ahead antes de mudanças relevantes, after-action depois). O agente deve classificar toda mensagem nova como NEW_TASK/CONTINUE_TASK/INFORMATIONAL antes de agir.

### Related Files

- AGENTS.md
- .agent/current_task.md
- .agent/execution_journal.md
- .agent/recovery.md

---

## ADR-002 — Arquitetura planejada do sistema RAG (ainda não implementada)

Date: 2026-09-20

Status: Accepted (planejamento; implementação pendente de autorização)

### Context

O usuário quer um sistema RAG local sobre centenas/milhares de arquivos `.md`, preparado para expor online depois, usando um API Gateway já instalado (compatível com formato OpenAI e Anthropic), com chat web, login com aprovação de ADM e isolamento total de histórico por usuário.

### Decision

- Vector DB: Qdrant (suporta metadata filtering, importante com múltiplas fontes/milhares de docs).
- Banco relacional (usuários, conversas, mensagens, auditoria): Postgres — separado do vector DB.
- Embeddings: modo dual, local (sentence-transformers/BGE) OU via endpoint de embeddings do gateway, configurável.
- LLM: camada adapter própria com duas implementações (OpenAI-compatible client e Anthropic-compatible client), selecionável via `.env`, ambas apontando para o gateway já instalado pelo usuário.
- Backend: FastAPI (Python), com streaming SSE para respostas do chat.
- Frontend: Next.js.
- Orquestração: Docker Compose desde o início (Qdrant, Postgres, backend, frontend).
- Autenticação: JWT (access curto + refresh httpOnly cookie), 3 roles (ADMIN, USER, e status PENDING/BLOCKED controlando acesso), auto-registro com aprovação manual de ADM, bootstrap do primeiro admin via env var ou CLI.
- Isolamento de histórico: toda query de conversas/mensagens filtrada obrigatoriamente por `user_id` extraído do JWT no backend; ADM tem rota separada e auditada (`audit_log`) para visualizar histórico de outros usuários.

### Rationale

Detalhado nas respostas do usuário durante o planejamento: preferência por reaproveitar o gateway já existente, volume de dados justifica Qdrant + busca híbrida, necessidade de auditoria para o ADM em vez de bloqueio total de visibilidade.

### Consequences

Qualquer desvio dessas escolhas (ex.: troca de Qdrant por outro vector DB, remoção do Postgres) deve ser registrado como novo ADR antes de ser implementado.

### Related Files

- .stack_tech.md (será populado conforme a implementação avançar e as escolhas forem confirmadas no código real)
