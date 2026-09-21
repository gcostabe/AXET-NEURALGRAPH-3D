# CURRENT PROJECT STATE

Last Updated: 2026-09-20

---

## Current Version

Sistema RAG local implementado e operacional com Docker Compose, autenticação multiusuário, suporte a Local AI Gateway e interface visual moderna NTT DATA. Repositório Git inicializado na branch `main` e conectado a `https://github.com/gberbert/RAG-LOCAL-REEF.git`.

---

## System Summary

Projeto **RAG-LOCAL-REEF**: sistema RAG local (preparado para deploy online futuro) que indexa arquivos `.md` de múltiplas fontes, com chat de IA sobre esse conteúdo em streaming SSE, autenticação com aprovação de ADM, isolamento total de histórico por usuário e painel administrativo de gestão/reindexação de fontes.

---

## Current Architecture

- Backend: FastAPI (Python 3.11, SQLAlchemy, asyncpg/psycopg2, Pydantic, Passlib/Bcrypt, PyJWT, httpx)
- Vector DB: Qdrant
- Banco relacional: PostgreSQL 16 (usuários, conversas, mensagens, auditoria, configurações)
- Embeddings: Modo dual (Local BGE-m3 ou API via Local AI Gateway)
- LLM: Adapters OpenAI-compatible (`/codex/v1`) e Anthropic-compatible (`/v1/messages`)
- Frontend: Next.js 14 (React, TypeScript, Tailwind CSS, Lucide icons, SSE stream) com identidade visual NTT DATA
- Orquestração: Docker Compose (`qdrant`, `postgres`, `backend`, `frontend`)

---

## Relevant Components

- `backend/app/ingestion/`: Chunker, embedder, parser de Markdown e vector store Qdrant.
- `backend/app/auth/`: Modelos SQLAlchemy, schemas Pydantic, rotas de autenticação, hashing seguro e tokens JWT.
- `backend/app/llm/`: Adapters e factory de provedores LLM.
- `backend/app/api/`: Endpoints de `/chat`, `/conversations`, `/auth`, `/admin` e `/health`.
- `frontend/app/`: Rotas de `/chat`, `/login`, `/register`, `/pending` e `/admin`.
- `frontend/components/`: Componentes de chat assíncrono, logo NTT DATA, avatar, painel de fontes e guarda de autenticação.
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
