# CURRENT PROJECT STATE

Last Updated: 2026-09-20

---

## Current Version

Sistema RAG local implementado e operacional com Docker Compose, autenticação multiusuário, suporte a Local AI Gateway e interface visual moderna NTT DATA. Repositório Git inicializado na branch `main` e conectado a `https://github.com/gberbert/RAG-LOCAL-REEF.git`.

---

## System Summary

Projeto **RAG-LOCAL-REEF**: sistema RAG local (preparado para deploy online futuro) que indexa arquivos `.md` de múltiplas fontes de forma contínua e autônoma, com monitor em tempo real (watchdog), extração cognitiva de auto-resumos/tópicos, Grafo de Conhecimento relacional (GraphRAG), detecção de conflitos/obsolescências normativas, chat de IA sobre esse conteúdo em streaming SSE com injeção de contexto relacional, autenticação com aprovação de ADM e painel administrativo moderno NTT DATA.

---

## Current Architecture

- Backend: FastAPI (Python 3.11, SQLAlchemy, asyncpg, Pydantic, Passlib/Bcrypt, PyJWT, httpx, watchdog, faster-whisper, ffmpeg)
- Vector DB: Qdrant (porta 6333)
- Banco relacional: PostgreSQL 16 (usuários, conversas, mensagens, auditoria, configurações, nós de conhecimento, arestas do grafo e conflitos)
- aXet / Okta API Gateway: Serviço embedado autônomo Python 3.11 (`gateway:8766`) gerenciando tokens Okta Bearer corporativos para proxy OpenAI e Anthropic
- Embeddings: Modo dual (Local BGE-m3 ou API via aXet Gateway interno `http://gateway:8766/codex`)
- LLM: Adapters OpenAI-compatible (`http://gateway:8766/codex/v1`) e Anthropic-compatible (`/v1/messages`) com suporte a streaming e chamadas estruturadas para modelos reasoning
- Frontend: Next.js 14 / Three.js 3D (porta 3001) com grafo neural encefálico, casca vítrea `brain.glb`, abas de Fontes, Usuários, Grafo/Cognição e Processamento de Vídeo
- Orquestração: Docker Compose de 5 microsserviços (`qdrant`, `postgres`, `gateway`, `backend`, `frontend`)
- Sincronização Remota: Push simultâneo automático em dois repositórios remotos (`RAG-LOCAL-REEF` e `AXET-NEURALGRAPH-3D`)

---

## Relevant Components

- `backend/app/ingestion/`: Chunker, embedder, parser de Markdown, vector store Qdrant e serviço de File Watcher com debounce (`watcher.py`).
- `backend/app/knowledge/`: Modelos de dados (`models.py`) e analisador cognitivo por LLM (`analyzer.py`) para resumos executivos, tópicos, arestas GraphRAG e conflitos.
- `backend/app/retrieval/`: Motor de busca vetorial e enriquecimento de contexto relacional com alertas de obsolescência (`search.py`).
- `backend/app/auth/`: Modelos SQLAlchemy, schemas Pydantic, rotas de autenticação, hashing seguro e tokens JWT.
- `backend/app/llm/`: Adapters e factory de provedores LLM (streaming e completion).
- `backend/app/api/`: Endpoints de `/chat`, `/conversations`, `/auth`, `/admin` (incluindo `/admin/knowledge` e fontes) e `/health`.
- `frontend/app/`: Rotas de `/chat`, `/login`, `/register`, `/pending` e `/admin`.
- `frontend/components/`: Componentes de chat assíncrono, logo NTT DATA, avatar, painel de fontes, painel cognitivo (`KnowledgePanel.tsx`) e guarda de autenticação.
- `docker-compose.yml`: Serviços conteinerizados e redes internas.
- `.gitignore`: Proteção robusta contra vazamento de segredos, dependências e volumes.

---

## Project Operational Context

Repositório Git inicializado na branch `main` com remote origin configurado para `https://github.com/gberbert/RAG-LOCAL-REEF.git`. Arquitetura de memória do agente ativa em `.agent/*` e `AGENTS.md`.

---

## Known Issues

- Nenhum bug impeditivo identificado nos testes de integração.

---

## Recent Changes

- 2026-09-20: Inicialização do repositório Git com branch `main`, configuração do remote `origin` para `https://github.com/gberbert/RAG-LOCAL-REEF.git`, criação de `.gitignore` robusto com proteção contra segredos e caches, e preparação do commit inicial.
- 2026-09-20: Atualização do favicon do navegador com o emblema oficial quadrado da NTT DATA.
- 2026-09-20: Alinhamento assimétrico de mensagens (perguntas à direita, respostas à esquerda) e avatar oficial do assistente.

---

## Important Constraints

- Não comitar variáveis de ambiente reais (`.env`), dados locais (`postgres_data/`, `qdrant_storage/`) ou dependências (`node_modules/`, `.venv/`).
- Não usar comandos destrutivos sem confirmação.
- Isolamento de histórico por usuário deve ser mantido no nível de query do backend (filtro obrigatório por `user_id` do JWT).
