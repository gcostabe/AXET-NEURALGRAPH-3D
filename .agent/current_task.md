# CURRENT TASK

Task ID: TASK-20260925-0455-ONEDRIVE-FINDER-PICKER-AND-DISTRIBUTION

Created: 2026-09-25 04:55

Last Updated: 2026-09-25 04:58

Status: COMPLETED

Resume Authorization: YES

---

## User Request

"eu quero que a escolha dessa pasta seja feita na tela com um botao abrindo finder pra selecionar o o dir do onedrive"

---

## Analysis & Plan

1. **Separação Conceitual e Simplificação da Interface de Administração**:
   - Tab 1: **"📥 1. Novos Documentos (Ingestão)"** — Entrada de novos arquivos `.md`, vídeos, legislação e reindexação vetorial.
   - Tab 2: **"🚀 2. Distribuição da Base (OneDrive)"** — Exportação e distribuição da base pré-indexada para os usuários.
2. **Integração com Finder Nativo no macOS**:
   - Botão **"Escolher Pasta no Finder"** na tela do Admin que aciona o bridge nativo `http://localhost:8765/pick-folder` com prompt customizado.
   - O caminho selecionado no Finder é salvo automaticamente no PostgreSQL (`AppSetting: onedrive_distribution_path`).
3. **Publicação em 1 Clique sem Ações Manuais do Admin**:
   - Botão master **"Gerar e Publicar Base Oficial no OneDrive"** que:
     - Gera o pacote `.qpack` com Qdrant snapshots + grafo neural Postgres e hash criptográfico SHA-256.
     - Grava o arquivo diretamente na pasta do OneDrive selecionada via daemon local (`axet_knowledge_base_YYYYMMDD_HHMMSS.qpack` e `axet_knowledge_base_latest.qpack`).
     - O cliente macOS OneDrive sincroniza com o SharePoint em segundo plano automaticamente.
4. **Validação & Testes**:
   - Teste de bridge local na porta 8765.
   - Teste de comunicação Docker Backend -> Host Bridge.
   - Compilação do Next.js (`npm run build`) e rebuild do contêiner Docker do frontend.

---

## Execution Cursor

Phase: COMPLETED

Current Step: Todos os endpoints, seletor do Finder, UI administrativa e contêineres Docker atualizados e testados.

Last Safe Checkpoint: CHECKPOINT-097.

---

## Planned Steps

- [x] Configurar bridge `scripts/host_picker.py` para permitir CORS POST e seleção de snapshots mais recentes.
- [x] Implementar endpoints `GET /admin/snapshots/distribution/config`, `PUT /admin/snapshots/distribution/config` e `POST /admin/snapshots/publish-onedrive` no backend FastAPI.
- [x] Adicionar tipagens e métodos no cliente frontend `lib/api.ts`.
- [x] Reformular componente `AdminSnapshotsPanel.tsx` com o botão Finder, card da pasta OneDrive e botão de publicação em 1 clique.
- [x] Reordenar e numerar abas no painel administrativo `admin/page.tsx`.
- [x] Validar compilação (`npm run build`) e atualizar contêiner Docker frontend.
- [x] Testar integração end-to-end do bridge e persistência no banco.
