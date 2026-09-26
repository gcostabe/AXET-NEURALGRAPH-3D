# CURRENT TASK

Task ID: TASK-20260926-1855-ALL-IN-ONE-MSI-EMBEDDED-BUNDLE

Created: 2026-09-26 18:55
Completed: 2026-09-26 19:22

Status: COMPLETED

Branch: main

Worktree Directory: c:\Users\gusta\OneDrive\Área de Trabalho\AXET-NEURALGRAPH-3D

Resume Authorization: NO

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
   - Garante permissões locais completas de gravação para SQLite e vetores locais sem exigir elevação de privilégios de Administrador (UAC).
   - Executa silenciosamente o supervisor em segundo plano com `CREATE_NO_WINDOW`.
   - Hook assíncrono no `setup` do Tauri para ligar os serviços automaticamente no início da aplicação.

4. **CI/CD no GitHub Actions com Assinatura Corporativa NTT DATA (`desktop-release.yml`)**:
   - Integração do assembler de runtime em `scripts/bump_version.js` para garantir integridade e contornar restrições de escopo de token.
   - Compilação do MSI via WiX Toolset empacotando o recurso embutido.
   - Assinatura Authenticode de todos os binários e do instalador com certificado NTT DATA Corporate.
   - Geração dos artefatos e publicação na release do GitHub (`v1.0.20`).

---

## Execution Cursor

Phase: RELEASE_PUBLISHED
Step 1: Create scripts/prepare_windows_runtime.py for packaging embedded runtime [COMPLETED]
Step 2: Update src-tauri/src/main.rs with resource_dir resolution, extraction and background supervisor [COMPLETED]
Step 3: Update src-tauri/tauri.conf.json to declare bundled resources [COMPLETED]
Step 4: Update bump_version.js for automated end-to-end MSI bundling in GitHub Actions [COMPLETED]
Step 5: Synchronize version bump to 1.0.20 across all descriptors [COMPLETED]
Step 6: Push commit and tag v1.0.20 to GitHub [COMPLETED]
Step 7: GitHub Actions Run #22 finished: Windows MSI compiled, signed with NTT DATA Authenticode, and published to GitHub Release [COMPLETED]
Resume Authorization: NO
