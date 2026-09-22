from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import admin, auth, chat, conversations, health, knowledge
from app.auth.database import engine
from app.auth.models import Base, MessageFeedback  # noqa: F401
from app.config import settings
from app.ingestion.watcher import watcher_service
# Garante o registro dos modelos de conhecimento no metadata do SQLAlchemy
from app.knowledge.models import KnowledgeConflict, KnowledgeDocument, KnowledgeEdge  # noqa: F401


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Garante que as tabelas (incluindo knowledge) existam
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        from sqlalchemy import text
        for sql in [
            "ALTER TABLE knowledge_conflicts ADD COLUMN IF NOT EXISTS resolution_strategy VARCHAR(50);",
            "ALTER TABLE knowledge_conflicts ADD COLUMN IF NOT EXISTS resolution_details TEXT;",
            "ALTER TABLE knowledge_conflicts ADD COLUMN IF NOT EXISTS resolved_by_user_id UUID;",
            "ALTER TABLE knowledge_conflicts ADD COLUMN IF NOT EXISTS resolved_at TIMESTAMP WITH TIME ZONE;",
        ]:
            await conn.execute(text(sql))



    # Reconciliação do status de indexação caso o servidor tenha sido reiniciado durante uma execução ativa
    try:
        import json
        from datetime import datetime, timezone
        from sqlalchemy import select
        from app.api.admin import REINDEX_STATUS_KEY
        from app.auth.database import AsyncSessionLocal
        from app.auth.models import AppSetting

        async with AsyncSessionLocal() as db:
            row = await db.scalar(select(AppSetting).where(AppSetting.key == REINDEX_STATUS_KEY))
            if row and row.value:
                data = json.loads(row.value)
                if data.get("status") == "running":
                    data["status"] = "interrupted"
                    data["interrupted_at"] = datetime.now(timezone.utc).isoformat()
                    data["interrupted_reason"] = "Servidor reiniciado ou desligado durante a indexação."
                    row.value = json.dumps(data)
                    await db.commit()
    except Exception as startup_exc:
        print(f"[startup] aviso ao reconciliar status de indexação: {startup_exc}")

    # Inicia o monitor de arquivos em tempo real (watchdog)
    if settings.watchdog_enabled:
        import asyncio
        loop = asyncio.get_running_loop()
        watcher_service.start(loop=loop)

    try:
        yield
    finally:
        # Finalização limpa das threads do watcher no shutdown
        watcher_service.stop()


app = FastAPI(title="RAG Local Reef", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_allowed_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(conversations.router)
app.include_router(admin.router)
app.include_router(knowledge.router)
app.include_router(knowledge.user_router)
