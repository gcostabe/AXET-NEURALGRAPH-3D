# CURRENT TASK

Task ID: TASK-20260924-0440-ONE-CLICK-LOCAL-INSTALLERS

Created: 2026-09-24 04:40

Last Updated: 2026-09-24 04:40

Status: COMPLETED

Resume Authorization: NO

---

## User Request

"preciso que tambem disponibilize um processo de instalação em maquinas local windowns e mac seguindo o padrao abaixo que usamos para outro app

🚀 Instalação e Execução Local Rápida
🪟 No Windows (Instalador One-Click via WSL2)
...
🍏 No macOS (Instalador One-Click)
..."

---

## Objective

1. Criar `instalar_windows.bat` para instalação automatizada no Windows via WSL2 (Ubuntu), detecção/habilitação de WSL2, Docker e criação do atalho `Iniciar AXET-NEURALGRAPH-3D.bat` na Área de Trabalho (Desktop).
2. Criar `scripts/setup_wsl_internal.sh` para provisionamento interno silencioso no Ubuntu WSL2 (Docker Engine / Compose, utilitários, permissões e subida do stack).
3. Criar `iniciar_windows.bat` para iniciar o stack no Windows via WSL2, aguardar a porta 3001 e abrir o navegador automaticamente em `http://localhost:3001/`.
4. Criar `setup_mac.sh` para validação e setup no macOS, verificação de Docker/Colima/Homebrew, criação do atalho `Iniciar AXET-NEURALGRAPH-3D.command` na Mesa (Desktop) e geração automática de `.env`.
5. Criar `iniciar_mac.command` para inicialização com duplo clique no macOS, checagem do daemon Docker, subida dos 5 containers e abertura automática do navegador em `http://localhost:3001/`.
6. Atualizar o `README.md` com a seção "🚀 Instalação e Execução Local Rápida" (Windows WSL2 e macOS One-Click) e sincronizar nos 2 repositórios remotos.

---

## Execution Cursor

Phase: COMPLETED

Current Step: One-click scripts created and tested; README updated and pushed to both remotes.

Last Safe Checkpoint: CHECKPOINT-077.

---

## Planned Steps

- [x] Criar `scripts/setup_wsl_internal.sh` para provisionamento no WSL2 Ubuntu.
- [x] Criar `instalar_windows.bat` (one-click installer para Windows).
- [x] Criar `iniciar_windows.bat` (one-click launcher para Windows).
- [x] Criar `setup_mac.sh` (one-click installer para macOS).
- [x] Criar `iniciar_mac.command` (one-click launcher para macOS).
- [x] Testar `setup_mac.sh` e `iniciar_mac.command` localmente no macOS.
- [x] Atualizar `README.md` com o sumário e o guia completo de instalação local rápida.
- [x] Registrar checkpoint no `execution_journal.md`.
- [x] Realizar commit e push simultâneo para ambos os repositórios remotos (`origin` e `axet`).
