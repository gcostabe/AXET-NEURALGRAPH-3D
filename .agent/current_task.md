# CURRENT TASK

Task ID: TASK-20260922-1010-HIDE-SOURCES-WHEN-NOT-FOUND

Created: 2026-09-22 10:10

Last Updated: 2026-09-22 10:10

Status: COMPLETED

NONE | ACTIVE | SUSPENDED | COMPLETED | CANCELLED

Resume Authorization: NO

YES | NO

---

## User Request

"a resposta esta correta mas nao deveria trazer docs de referencia se o sistema nao encontrou referencia , os docs deveriam ser informados somente se as informações foram encontradas."

---

## Objective

Garantir que documentos de referência e consultados **NUNCA** sejam exibidos, transmitidos ou gravados quando o sistema não encontrar referências factuais ou quando a resposta for de recusa de escopo fechado ("Esta informação não consta na base..."):
1. **Backend (`backend/app/api/chat.py`)**:
   - Reforçar detecção de recusa e ausência de informações no texto gerado (`is_refusal_or_not_found`).
   - Não emitir lista de documentos provisórios no início da stream SSE antes de saber se o LLM encontrou a informação.
   - Emitir `event: sources` somente após a resposta completa, garantindo `sources = []` caso haja recusa ou ausência de dados.
   - Salvar `sources = []` no banco de dados para mensagens de recusa.
2. **Frontend (`frontend/app/chat/page.tsx` & `frontend/components/ChatMessageItem.tsx`)**:
   - Atualizar reativamente a mensagem no state quando `onSources` for chamado e no `onDone`.
   - Adicionar defesa em profundidade no `ChatMessageItem.tsx` com `isRefusalOrNotFound(message.content)` para ocultar a lista de fontes mesmo em mensagens históricas carregadas do banco.
3. **Limpeza do Banco de Dados**:
   - Atualizar mensagens de recusa existentes no PostgreSQL para zerar o campo `sources` (`[]`).
4. **Build & Deploy**:
   - Recompilar frontend e reiniciar serviços no Docker Compose.
5. **Aguardar Validação**:
   - Solicitar ao usuário que faça o teste diretamente na interface.

---

## Execution Cursor

Phase: VERIFICATION

Current Step: Correções aplicadas no backend, frontend e banco de dados. Containers reconstruídos e ativos (HTTP 200). Aguardando validação do usuário.

Last Safe Checkpoint: CHECKPOINT-055.

---

## Completed

- [x] Classificação de intenção: NEW_TASK → ACTIVE → COMPLETED
- [x] Diagnóstico da causa raiz (SSE emitia sources no início; frontend não limpava state; mensagens antigas no Postgres continham sources gravadas; ausência de trava defensiva no componente visual)
- [x] Atualização do backend `backend/app/api/chat.py` (fontes emitidas apenas no fim e zeradas em recusas)
- [x] Atualização do frontend `frontend/app/chat/page.tsx` e `frontend/components/ChatMessageItem.tsx` (sincronização de estado e trava visual)
- [x] Limpeza das mensagens de recusa no Postgres (`UPDATE 5`)
- [x] Rebuild e reinicialização dos containers (`rag-local-reef-frontend-1` e `rag-local-reef-backend-1`)
- [x] Registro do CHECKPOINT-055
- [ ] Validação pelo usuário no Chat
