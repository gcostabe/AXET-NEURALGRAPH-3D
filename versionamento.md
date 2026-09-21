# VERSIONAMENTO

## Status

Repositório git inicializado neste workspace (`/Users/gcostabe/dev/RAG-LOCAL-REEF`) na branch principal `main`.
Conectado ao repositório remoto oficial: `https://github.com/gberbert/RAG-LOCAL-REEF.git`.

## Convenção adotada

- Branch principal: `main`
- Commits estruturados com conventional commits (`feat:`, `fix:`, `chore:`, `docs:`, etc.)
- Push e sincronização com GitHub autorizados pelo usuário
- Arquivos sensíveis (`.env`, credenciais, chaves do API Gateway, dados de banco e vetores) protegidos rigorosamente pelo `.gitignore` — utilizar sempre `.env.example` e `frontend/.env.local.example` como templates públicos.

## Histórico de Versionamento

1. `TASK-20260920-2233-GIT-SETUP-PUSH`:
   - Criação do `.gitignore` robusto cobrindo Python, Next.js, Qdrant, Postgres, Docker e SO.
   - `git init -b main`
   - `git remote add origin https://github.com/gberbert/RAG-LOCAL-REEF.git`
   - Commit inicial com o sistema completo (arquitetura de memória do agente, backend FastAPI com RAG/Auth, frontend Next.js com identidade visual NTT DATA e orquestração Docker Compose).
   - Push inicial para `origin main`.
