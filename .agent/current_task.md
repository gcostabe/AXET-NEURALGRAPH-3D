# CURRENT TASK

Task ID: TASK-20260926-1855-ALL-IN-ONE-MSI-EMBEDDED-BUNDLE

Created: 2026-09-26 18:55
Updated: 2026-09-26 19:04

Status: COMPLETED_READY_FOR_CI_RELEASE

Branch: main

Worktree Directory: c:\Users\gusta\OneDrive\Área de Trabalho\AXET-NEURALGRAPH-3D

Resume Authorization: YES

---

## User Request

O teste deve ser feito com a compilação no git com assinatura pela NTT DATA como estava antes. O usuário irá baixar de lá e testar a instalação. Não deve haver nenhuma ação manual do usuário final: todas as dependências (Python runtime, Qdrant, Gateway, Backend, dependências pip e frontend) e inicialização automática são coordenadas pelo instalador MSI do Windows.

---

## Architecture & Implementation Plan

1. **Bare-Metal Zero Virtualization**:
   - Modelos SQLAlchemy adaptados para cross-engine (SQLite WAL nativo local e PostgreSQL).
   - Qdrant binário nativo para Windows (`qdrant.exe` + DLLs VC++).
   - aXet Gateway com compatibilidade multiplataforma (sem travamento por `fcntl`).
   - SQLite configurado automaticamente sem necessidade de Docker ou WSL2.

2. **Embedded Zero-Touch Runtime (`scripts/prepare_windows_runtime.py`)**:
   - Cria o arquivo único de alta eficiência `src-tauri/resources/axet-runtime.zip`.
   - Empacota Python 3.11 Embeddable + `python311._pth` + dependências pip com wheel PyTorch CPU otimizada.
   - Empacota binário nativo do Qdrant + DLLs MSVC + `config.yaml`.
   - Empacota backend (`app/`), gateway (`gateway/`), supervisor e `.env` configurado.

3. **Ciclo de Vida Automático e Silencioso (`src-tauri/src/main.rs`)**:
   - Extrai de forma transparente o runtime para `%LOCALAPPDATA%\AXET-NeuralGraph\runtime` via `tar.exe` nativo ou PowerShell caso ainda não exista.
   - Garante permissões de escrita completas para SQLite e vetores locais sem exigir elevação de privilégios de Administrador (UAC).
   - Executa silenciosamente o supervisor em segundo plano com `CREATE_NO_WINDOW`.
   - Hook assíncrono no `setup` do Tauri para ligar os serviços automaticamente no início da aplicação.

4. **CI/CD no GitHub Actions com Assinatura Corporativa NTT DATA (`desktop-release.yml`)**:
   - Removido `sparse-checkout` (checkout completo do repositório).
   - Adicionada etapa do Python 3.11 para montagem do runtime embutido.
   - Compilação do MSI via WiX Toolset empacotando o recurso embutido.
   - Assinatura Authenticode de todos os binários e do instalador com certificado NTT DATA Corporate.
   - Geração dos artefatos e publicação na release do GitHub (`v1.0.20`).

---

## Execution Cursor

Phase: READY_FOR_CI_DISPATCH
Step 1: Create scripts/prepare_windows_runtime.py for packaging embedded runtime [COMPLETED]
Step 2: Update src-tauri/src/main.rs with resource_dir resolution, extraction and background supervisor [COMPLETED]
Step 3: Update src-tauri/tauri.conf.json to declare bundled resources [COMPLETED]
Step 4: Update .github/workflows/desktop-release.yml for automated end-to-end MSI bundling and signing [COMPLETED]
Step 5: Synchronize version bump to 1.0.20 across all descriptors [COMPLETED]
Step 6: Commit and push changes to remote repository and dispatch GitHub release [NEXT_ACTION]
Resume Authorization: YES
