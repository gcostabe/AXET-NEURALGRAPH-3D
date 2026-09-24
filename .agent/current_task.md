# CURRENT TASK

Task ID: TASK-20260924-0740-LOCAL-SNAPSHOT-SYNC-OPTION1

Created: 2026-09-24 07:40

Last Updated: 2026-09-24 07:40

Status: COMPLETED

Resume Authorization: NO

---

## User Request

"contrua a opção 1 atualizando toda info no readme.md"

---

## Objective

1. **Infraestrutura Docker (`docker-compose.yml`)**:
   - Mapear volume persistente `./data/snapshots:/qdrant/snapshots` no serviço `qdrant`.
   - Mapear volume compartilhado `./data/snapshots:/data/snapshots` no serviço `backend`.
   - Garantir diretório `data/snapshots` criado no host.

2. **Backend de Snapshots (`backend/app/api/snapshots.py`)**:
   - `POST /admin/snapshots/export`: Gera snapshot no Qdrant com timeout estendido, calcula hash SHA-256 e gera manifesto com metadados.
   - `GET /admin/snapshots`: Lista snapshots disponíveis com nome, data, tamanho e checksum.
   - `GET /admin/snapshots/{filename}/download`: Download em stream do arquivo `.snapshot`.
   - `DELETE /admin/snapshots/{filename}`: Exclusão de snapshots antigos.
   - `POST /snapshots/import`: Endpoint para upload e restauração atômica de snapshots no Qdrant com validação de checksum SHA-256.
   - `GET /snapshots/status`: Métricas e status da base vetorial local.
   - Registrar rotas em `backend/app/main.py`.

3. **Frontend**:
   - Tipos e métodos em `frontend/lib/api.ts`.
   - Componente `KnowledgeSnapshotModal.tsx` com drag-and-drop, indicador de checksum e feedback de restauração.
   - Integrar no `AppHeader.tsx` para acesso fácil do usuário.
   - Adicionar seção de gerenciamento e exportação de Snapshots no painel Admin (`frontend/app/admin/page.tsx`).

4. **Scripts de Automação**:
   - Criar `atualizar_base.sh` e `atualizar_base.bat` para restauração one-click de snapshots colocados em `data/snapshots/`.
   - Atualizar `iniciar_mac.command` e `iniciar_windows.bat` com detecção automática.

5. **Documentação Exaustiva no `README.md`**:
   - Detalhar arquitetura da Opção 1, isolamento de rede `localhost`, garantia contra vazamento de informações (Air-Gapped/Local-Only).
   - Passo a passo para o Administrador (indexar `.md`, exportar snapshot, assinar e distribuir).
   - Passo a passo para os Usuários (importar via interface ou via script).

6. **Compilação, Testes e Sincronização Git Dual-Remote**:
   - Rebuild dos containers Docker.
   - Validação da geração, download e restauração de snapshots.
   - Commit e push simultâneo para `origin` e `axet`.

---

## Execution Cursor

Phase: COMPLETED

Current Step: Option 1 fully implemented, validated, and ready for dual git push.

Last Safe Checkpoint: CHECKPOINT-081.

---

## Planned Steps

- [x] Criar diretório `data/snapshots` no host e atualizar volumes em `docker-compose.yml`.
- [x] Implementar `backend/app/api/snapshots.py` e registrar em `backend/app/main.py`.
- [x] Atualizar `frontend/lib/api.ts` com métodos de snapshot.
- [x] Criar `frontend/components/KnowledgeSnapshotModal.tsx` e integrar em `AppHeader.tsx`.
- [x] Adicionar seção de Snapshots no Painel Admin (`frontend/app/admin/page.tsx`).
- [x] Criar scripts `atualizar_base.sh` e `atualizar_base.bat`.
- [x] Atualizar `iniciar_mac.command` e `iniciar_windows.bat`.
- [x] Atualizar exaustivamente o `README.md` com a Opção 1 e guias operacionais.
- [x] Rebuild e reinicialização dos containers (`backend` e `frontend`).
- [x] Validar fluxos de exportação e restauração via API e Browser.
- [x] Registrar CHECKPOINT-081 em `.agent/execution_journal.md`, comitar e enviar push dual.

