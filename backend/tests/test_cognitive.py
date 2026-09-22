from app.knowledge.analyzer import _extract_json_block
from app.ingestion.watcher import MarkdownEventHandler
from app.retrieval.search import build_context, RetrievedChunk
from app.knowledge.models import KnowledgeConflict, KnowledgeEdge
import uuid


def test_extract_json_block_clean():
    raw = '{"summary": "Teste", "topics": ["rag", "ai"]}'
    res = _extract_json_block(raw)
    assert res == {"summary": "Teste", "topics": ["rag", "ai"]}


def test_extract_json_block_with_markdown_fences():
    raw = """Aqui está a análise:
```json
{
  "relations": [
    {"target_path": "docA.md", "relation_type": "ATUALIZA", "description": "Nova regra"}
  ],
  "conflicts": []
}
```
Fim da resposta.
"""
    res = _extract_json_block(raw)
    assert isinstance(res, dict)
    assert len(res["relations"]) == 1
    assert res["relations"][0]["relation_type"] == "ATUALIZA"


def test_markdown_event_handler_filtering():
    class DummyWatcher:
        def __init__(self):
            self.events = []
        def enqueue_event(self, path, action):
            self.events.append((path, action))

    watcher = DummyWatcher()
    handler = MarkdownEventHandler(watcher)

    assert handler._is_valid_md("/path/to/doc.md") is True
    assert handler._is_valid_md("/path/to/DOC.MD") is True
    assert handler._is_valid_md("/path/to/.hidden.md") is False
    assert handler._is_valid_md("/path/to/~temp.md") is False
    assert handler._is_valid_md("/path/to/doc.tmp") is False
    assert handler._is_valid_md("/path/to/doc.txt") is False


def test_build_context_with_graph_and_conflicts():
    chunks = [
        RetrievedChunk(
            source_path="politica_2026.md",
            title="Política 2026",
            breadcrumb=["Política", "Prazos"],
            text="O novo prazo de reembolso é de 15 dias úteis.",
            score=0.95,
        )
    ]
    edges = [
        KnowledgeEdge(
            id=uuid.uuid4(),
            source_path="politica_2026.md",
            target_path="politica_2024.md",
            relation_type="ATUALIZA",
            description="Substitui a política antiga de 2024 com prazos reduzidos.",
        )
    ]
    conflicts = [
        KnowledgeConflict(
            id=uuid.uuid4(),
            source_path_new="politica_2026.md",
            source_path_existing="politica_2024.md",
            conflict_type="OBSOLESCENCIA",
            explanation="Prazo de 30 dias na política de 2024 foi revogado pelo prazo de 15 dias na de 2026.",
            resolved=False,
        )
    ]

    context = build_context(chunks, edges=edges, conflicts=conflicts)

    # Verifica se os alertas de conflito e relações de grafo estão presentes no contexto
    assert "ALERTAS DE CONFLITOS E OBSOLESCÊNCIA" in context
    assert "OBSOLESCENCIA" in context
    assert "Prazo de 30 dias na política de 2024 foi revogado" in context
    assert "RELAÇÕES DO GRAFO DE CONHECIMENTO" in context
    assert "ATUALIZA" in context
    assert "Substitui a política antiga" in context
    assert "O novo prazo de reembolso é de 15 dias úteis." in context
