import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.auth.models import Base, JSON_TYPE, UUID_TYPE


class KnowledgeDocument(Base):
    """Metadados executivos e tópicos semânticos centrais de cada documento indexado."""

    __tablename__ = "knowledge_documents"

    source_path: Mapped[str] = mapped_column(String(500), primary_key=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    content_hash: Mapped[str] = mapped_column(String(64), nullable=False)
    summary: Mapped[str] = mapped_column(Text, nullable=False)
    topics: Mapped[list[str]] = mapped_column(JSON_TYPE, nullable=False, default=list)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )


class KnowledgeEdge(Base):
    """Arestas do Grafo de Conhecimento relacionando documentos (GraphRAG)."""

    __tablename__ = "knowledge_edges"

    id: Mapped[uuid.UUID] = mapped_column(UUID_TYPE, primary_key=True, default=uuid.uuid4)
    source_path: Mapped[str] = mapped_column(String(500), index=True, nullable=False)
    target_path: Mapped[str] = mapped_column(String(500), index=True, nullable=False)
    # Exemplos: ATUALIZA, SUBSTITUI, COMPLEMENTA, REFERENCIA, DEPENDE_DE
    relation_type: Mapped[str] = mapped_column(String(50), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    weight: Mapped[float] = mapped_column(Float, default=1.0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class KnowledgeConflict(Base):
    """Registro de contradições, divergências e obsolescências normativas entre documentos."""

    __tablename__ = "knowledge_conflicts"

    id: Mapped[uuid.UUID] = mapped_column(UUID_TYPE, primary_key=True, default=uuid.uuid4)
    source_path_new: Mapped[str] = mapped_column(String(500), index=True, nullable=False)
    source_path_existing: Mapped[str] = mapped_column(String(500), index=True, nullable=False)
    # Exemplos: CONTRADICAO, OBSOLESCENCIA, DIVERGENCIA
    conflict_type: Mapped[str] = mapped_column(String(50), nullable=False)
    explanation: Mapped[str] = mapped_column(Text, nullable=False)
    resolved: Mapped[bool] = mapped_column(Boolean, default=False)
    # Estratégias: PREVALENCE_NEW, PREVALENCE_EXISTING, AI_SYNTHESIS, CUSTOM_RULE, UPLOAD_REPLACEMENT, MANUAL
    resolution_strategy: Mapped[str | None] = mapped_column(String(50), nullable=True)
    resolution_details: Mapped[str | None] = mapped_column(Text, nullable=True)
    resolved_by_user_id: Mapped[uuid.UUID | None] = mapped_column(UUID_TYPE, nullable=True)
    resolved_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class KnowledgeEntity(Base):
    """Nós de entidades críticas do subgrafo de conhecimento (códigos, leis, sistemas, cláusulas)."""

    __tablename__ = "knowledge_entities"

    id: Mapped[uuid.UUID] = mapped_column(UUID_TYPE, primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    # Categorias: REGULATORIO, SISTEMA, MODULO, CLAUSULA, CONCEITO
    entity_type: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    canonical_id: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    description: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class KnowledgeEntityMention(Base):
    """Arestas conectando Documentos às Entidades citadas em seu conteúdo."""

    __tablename__ = "knowledge_entity_mentions"

    id: Mapped[uuid.UUID] = mapped_column(UUID_TYPE, primary_key=True, default=uuid.uuid4)
    entity_id: Mapped[uuid.UUID] = mapped_column(
        UUID_TYPE, ForeignKey("knowledge_entities.id", ondelete="CASCADE"), index=True, nullable=False
    )
    source_path: Mapped[str] = mapped_column(String(500), index=True, nullable=False)
    mention_count: Mapped[int] = mapped_column(Integer, default=1)
    context_sample: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


