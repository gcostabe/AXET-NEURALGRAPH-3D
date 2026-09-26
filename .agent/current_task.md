# CURRENT TASK

Task ID: TASK-20260925-1645-MULTIMODAL-DOCUMENTS-ATTACHMENTS

Created: 2026-09-25 16:45

Last Updated: 2026-09-25 17:00

Status: COMPLETED

Branch: feat/unified-desktop-dmg-msi / main

Worktree Directory: /Users/gcostabe/dev/RAG-LOCAL-REEF/worktrees/desktop

Production Directory (Main): /Users/gcostabe/dev/RAG-LOCAL-REEF

Resume Authorization: NO

---

## User Request

"agora preciso que o agente reconheça imagem com limite de 3 imagens por interação e tb arquivos, PDF, PPT e DOCx, como é possivel ? poderia montar um estudo de viabilidade e impacto?
no balao quanto esta com o spining dos 3 pontos (pensand) ir colocando o que ele esta fazendo? Pensando sobre a solcitação , lendo PDF, lendo PPT, analisando a imagem?
colocar aprendizado com estes arquivos nao seria perigoso, pois nao necessariamente tem informacao veridica"

---

## Architecture & Implementation Decisions

1. **Blindagem Epistêmica (Epistemic Sandboxing)**:
   - Resposta conclusiva à pergunta do usuário: anexos e imagens enviados no chat são insumos ad-hoc e efêmeros de consulta.
   - **Garantia Estrita**: Se a requisição contiver anexos (`has_attachments: true`), a geração de nós/arestas de aprendizado cognitivo (`RETIFICA_CONCEITO`) e sua posterior inclusão em pacotes `.pack` é rigorosamente desativada.
   - Apenas documentos canônicos homologados na curadoria corporativa podem gerar neuroplasticidade sintética.

2. **Teto de Visão Computacional (Max 3 Imagens)**:
   - Validado na UI (bloqueia seleção adicional reativamente) e no backend (HTTP 422 se `len(images) > 3`).
   - Redimensionamento proporcional in-memory via Pillow (máx 1920x1080) e conversão para base64 data URLs.

3. **Parsers In-Memory Puros de Documentos**:
   - `backend/app/knowledge/document_parsers.py` com `pypdf`, `python-docx` e `python-pptx` (incluindo notas de apresentador).
   - Zero dependência de binários externos do sistema operacional (LibreOffice, Poppler).

4. **Indicador Dinâmico de Progresso via Server-Sent Events (SSE)**:
   - Evento `event: status` transmitindo `{"step": "...", "label": "..."}`.
   - O balão de resposta substitui o texto genérico pelo status em tempo real com micro-animação dos 3 pontos pulsantes.

5. **Interface Moderna e Limpa**:
   - Chips de pré-visualização de anexos pendentes acima do textarea com botão de remoção (`X`).
   - Botão Paperclip no rodapé do input integrado ao seletor nativo de arquivos.
   - Exibição de miniaturas para imagens e badges de tipo com contagem de páginas/slides para documentos no histórico de mensagens.

---

## Execution Cursor

Phase: COMPLETED - MULTIMODAL ATTACHMENTS & DYNAMIC STATUS INDICATOR

Current Step: Código compilado, validado e comitê sincronizado com push para remotes `origin` e `axet`.

Last Safe Checkpoint: CHECKPOINT-MULTIMODAL-COMPLETE.

---

## Planned Steps

- [x] Elaborar Estudo de Viabilidade e Impacto (artefato `estudo_viabilidade_multimodal_anexos.md`)
- [x] Criar extratores in-memory em `backend/app/knowledge/document_parsers.py`
- [x] Implementar teto de 3 imagens no backend com HTTP 422
- [x] Implementar Blindagem Epistêmica contra contaminação da memória cognitiva
- [x] Implementar emissão de eventos SSE `event: status` no backend
- [x] Adicionar `attachments_metadata` nas mensagens e migração do PostgreSQL
- [x] Atualizar `frontend/lib/chatStream.ts` com handlers e payload de anexos
- [x] Atualizar `frontend/components/ChatMessageItem.tsx` com renderização de anexos e statusText dinâmico
- [x] Atualizar `frontend/app/chat/page.tsx` com upload, preview chips e paperclip button
- [x] Validar builds (`npm run build` com 0 erros, `python3 -m py_compile` com 0 erros)
- [x] Validar endpoints via curl (rejeição de 4 imagens, transmissão de eventos status para imagem e PDF)
- [x] Documentar expressamente a funcionalidade no `README.md` (Seção 11)
- [x] Sincronizar e enviar push para ambos os remotos (`origin` e `axet`) na branch `feat/unified-desktop-dmg-msi`
