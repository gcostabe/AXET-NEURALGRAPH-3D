from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Diretório amplo montado no container (read-only). O caminho efetivo de
    # ingestão é um subcaminho dentro desta raiz, configurável em runtime
    # pelo painel admin (persistido no Postgres) — ver app/ingestion/sources_settings.py.
    sources_root: str = "/data/sources_root"
    # Caminho real, no HOST (fora do container), que foi montado como sources_root.
    # Usado apenas para traduzir um caminho absoluto colado pelo admin no painel
    # (ex.: "/Users/joao/Documents/notas") para o caminho relativo equivalente
    # dentro do container. Não é usado para acessar o disco — é aritmética de string.
    sources_root_host_path: str = "./data/sources"
    # Subcaminho padrão (relativo a sources_root) usado até o admin configurar outro.
    sources_path: str = "."

    qdrant_host: str = "qdrant"
    qdrant_port: int = 6333
    qdrant_collection: str = "rag_documents"

    postgres_host: str = "postgres"
    postgres_port: int = 5432
    postgres_db: str = "rag_local_reef"
    postgres_user: str = "rag_user"
    postgres_password: str = "changeme"

    embedding_mode: str = "local"  # local | api
    embedding_model_local: str = "BAAI/bge-m3"
    embedding_api_url: str = ""
    embedding_api_key: str = ""

    llm_provider: str = "openai"  # openai | anthropic
    llm_gateway_url: str = "http://localhost:4000"
    llm_gateway_api_key: str = ""
    llm_model: str = "gpt-4o-mini"

    jwt_secret: str = "changeme"
    jwt_access_token_ttl_minutes: int = 1440  # 24 horas para conveniência local
    jwt_refresh_token_ttl_days: int = 7
    bootstrap_admin_email: str = "gcostabe@emeal.nttdata.com"

    # Okta SSO (OneNTT / aXet)
    okta_domain: str = "onentt.okta.com"
    okta_tenant_id: str = "ausf3mzucjRGKYWLy417"
    okta_client_id: str = "0oafbxnffaeuydB7l417"
    okta_scopes: str = "openid profile email offline_access"
    okta_token_url: str = "https://onentt.okta.com/oauth2/ausf3mzucjRGKYWLy417/v1/token"
    okta_device_auth_url: str = "https://onentt.okta.com/oauth2/ausf3mzucjRGKYWLy417/v1/device/authorize"
    gateway_host_url: str = "http://gateway:8766"

    environment: str = "local"
    cors_allowed_origins: str = "http://localhost:3001,http://127.0.0.1:3001,http://localhost:3000,http://127.0.0.1:3000"

    # Monitor de arquivos em tempo real (watchdog)
    watchdog_enabled: bool = True
    watchdog_debounce_seconds: float = 2.0

    # Enriquecimento cognitivo de documentos (auto-resumo, tópicos, grafo e conflitos)
    cognitive_analysis_enabled: bool = True

    # Sincronização remota da base de conhecimento (1 clique - .qpack)
    knowledge_base_sync_url: str = ""

    # Sincronização federada de aprendizados e neuroplasticidade (GitHub Issues e Releases)
    github_repo: str = "gcostabe/AXET-NEURALGRAPH-3D"
    github_token: str = ""
    cognitive_pack_sync_url: str = (
        "https://github.com/gcostabe/AXET-NEURALGRAPH-3D/releases/latest/download/axet_cognitive_synapses_latest.pack"
    )

    # Processamento de vídeo para geração de .md (multimodal_ocr vs audio_only)
    video_processing_mode_default: str = "multimodal_ocr"  # "multimodal_ocr" | "audio_only"
    video_frame_interval_seconds: int = 10
    video_whisper_model: str = "small"
    video_whisper_language: str = "es"
    video_max_frames: int = 30

    database_url: str = ""

    @property
    def postgres_dsn(self) -> str:
        if self.database_url:
            return self.database_url
        if self.postgres_host in ("sqlite", "local", "embedded", ""):
            from pathlib import Path
            db_dir = Path(__file__).resolve().parents[2] / "data"
            db_dir.mkdir(parents=True, exist_ok=True)
            db_path = (db_dir / "axet_local.db").as_posix()
            return f"sqlite+aiosqlite:///{db_path}"
        return (
            f"postgresql+asyncpg://{self.postgres_user}:{self.postgres_password}"
            f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )

    def model_post_init(self, __context):
        import sys
        from pathlib import Path
        if not Path(self.sources_root).exists():
            fallback = Path(__file__).resolve().parents[2] / "data" / "sources"
            if fallback.exists():
                self.sources_root = str(fallback)

        if sys.platform == "win32":
            if self.postgres_host == "postgres":
                self.postgres_host = "sqlite"
            if self.qdrant_host == "qdrant":
                self.qdrant_host = "localhost"
            if "gateway:8766" in self.gateway_host_url:
                self.gateway_host_url = self.gateway_host_url.replace("gateway:8766", "localhost:8766")
            if "gateway:8766" in self.llm_gateway_url:
                self.llm_gateway_url = self.llm_gateway_url.replace("gateway:8766", "localhost:8766")

    class Config:
        from pathlib import Path
        _root_env = Path(__file__).resolve().parents[2] / ".env"
        env_file = (str(_root_env), ".env")
        extra = "ignore"


settings = Settings()
