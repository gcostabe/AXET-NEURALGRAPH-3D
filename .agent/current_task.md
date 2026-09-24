# CURRENT TASK

Task ID: TASK-20260924-1301-SUBGRAFO-ENTIDADES-NER-FASE-2

Created: 2026-09-24 13:01

Last Updated: 2026-09-24 13:10

Status: COMPLETED

Resume Authorization: YES

---

## User Request

"execute fase a fase" -> Usuário confirmou avanço para a FASE 2: Subgrafo de Entidades Críticas com NER Leve.

---

## Objective

1. **Modelagem de Entidades e Menções no Banco de Dados (`backend/app/knowledge/models.py`)**:
   - Criar `KnowledgeEntity`: `id`, `name`, `entity_type`, `canonical_id` (indexado e normalizado), `description`, `created_at`.
   - Criar `KnowledgeEntityMention`: `id`, `entity_id` (FK), `source_path` (indexado), `mention_count`, `context_sample`, `created_at`.

2. **Módulo de Extração Determinística de Entidades (`backend/app/knowledge/entity_extractor.py`)**:
   - Desenvolver motor de NER leve, determinístico e de ultra-baixa latência (0 chamadas LLM externas, <30ms por documento).
   - Cobrir padrões corporativos do ecossistema REEF:
     - Regulatórios e Normas: Circulares SUSEP, Resoluções CNSP, Leis Federais, Artigos do Código Civil.
     - Sistemas e Módulos: Códigos TRON (TRON_01, etc.), DEF, BATCH, APIs, REEF Core.
     - Cláusulas e Regras Contratuais: Cláusulas de apólice, Condições Gerais, Franquia, etc.
   - Fornecer funções `extract_entities_from_text` e `detect_entities_in_query`.

3. **Integração na Ingestão (`backend/app/knowledge/analyzer.py`)**:
   - Conectar o extrator de entidades no ciclo de evolução de documentos (`process_document_cognitive_evolution`).
   - Persistir/sincronizar entidades e menções no PostgreSQL, e limpar menções em `remove_document_knowledge`.

4. **Integração no Motor de Busca e Chat (`backend/app/retrieval/search.py` e `backend/app/api/chat.py`)**:
   - Criar `get_query_entities_context` para resgatar entidades citadas e documentos correlatos.
   - Injetar no `build_context` um bloco de alta autoridade: `### [ENTIDADES CRÍTICAS RECONHECIDAS NA CONSULTA (Subgrafo NER)]`.
   - Bonificar os documentos que contêm menção direta à entidade no Re-ranker (+0.18).

5. **Validação & Testes**:
   - Criar testes em `backend/tests/test_entities.py`.
   - Validar execução no container Docker e verificar endpoints e integridade.
   - Registrar CHECKPOINT-086, comitar e realizar push dual para `origin` e `axet`.

---

## Execution Cursor

Phase: COMPLETED

Current Step: Fase 2 concluída com 100% dos testes aprovados. Pronto para avançar para a FASE 3 (Graph-Augmented Embeddings).

Last Safe Checkpoint: CHECKPOINT-086.

---

## Planned Steps

- [x] Registrar decisão e iniciar FASE 2.
- [x] Criar modelos `KnowledgeEntity` e `KnowledgeEntityMention` em `models.py`.
- [x] Criar módulo `entity_extractor.py` com regex e padrões corporativos do REEF.
- [x] Integrar no pipeline de ingestão em `analyzer.py`.
- [x] Integrar detecção na query e injeção contextual em `search.py` e `chat.py`.
- [x] Criar e executar suite de testes `test_entities.py` (13/13 testes aprovados).
- [x] Validar saúde do backend e containers Docker (`/health` OK).
- [x] Registrar CHECKPOINT-086, comitar e push dual para `origin` e `axet`.

