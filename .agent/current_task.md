# CURRENT TASK

Task ID: TASK-20260924-1200-MULTI-HOP-GRAPH-RETRIEVAL-FASE-1

Created: 2026-09-24 12:00

Last Updated: 2026-09-24 12:04

Status: COMPLETED

Resume Authorization: NO

---

## User Request

"execute fase a fase"

---

## Objective

1. **Implementar a FASE 1: Expansão Multi-Hop no Retrieval (2-Hop Reasoning)**:
   - Evoluir a função `get_graph_context_for_sources` em `backend/app/retrieval/search.py` para realizar a travessia de 2 passos no Grafo de Conhecimento (`KnowledgeEdge` e `KnowledgeConflict` no PostgreSQL).
   - Filtrar a expansão de 2-hop priorizando arestas de alta criticidade semântica (`SUBSTITUI`, `DEPENDE_DE`, `ATUALIZA`, `COMPLEMENTA`), com ordenação e teto defensivo (máximo 8 arestas secundárias e 4 documentos ancestrais) para prevenir *prompt bloat* e diluição de atenção (*lost in the middle*).
   - Resgatar resumos executivos (`KnowledgeDocument`) dos nós ancestrais críticos alcançados no 2º salto e integrá-los à hierarquia de contexto.
   - Atualizar `build_context` para formatar e rotular explicitamente as cadeias transitivas (1-Hop direto e 2-Hop encadeado).
   - Atualizar `backend/app/api/chat.py` para incorporar os nós estruturantes de 2-hop às fontes com precisão (`🔗 Título (Via Grafo)`).

2. **Validação e Testes**:
   - Desenvolver testes automatizados cobrindo a lógica de expansão 1-hop e 2-hop, filtragem de arestas, prevenção de ciclos e montagem do prompt topológico em `backend/tests/test_multihop.py`.
   - Executar testes no ambiente Docker do backend (100% aprovados).
   - Validar endpoint de saúde e compilação.
   - Registrar CHECKPOINT-085, comitar e realizar push simultâneo para `origin` e `axet`.

---

## Execution Cursor

Phase: COMPLETED

Current Step: Handover Fase 1 to user and prepare for Fase 2 (NER).

Last Safe Checkpoint: CHECKPOINT-085.

---

## Planned Steps

- [x] Escrever checkpoint write-ahead no `execution_journal.md`.
- [x] Implementar expansão 2-hop filtrada e resumos em `backend/app/retrieval/search.py`.
- [x] Adaptar `build_context` e integração em `backend/app/api/chat.py`.
- [x] Criar e executar suite de testes em `backend/tests/test_multihop.py`.
- [x] Validar containers e rotas da API.
- [x] Registrar CHECKPOINT-085 no journal, comitar e push dual para `origin` e `axet`.
