# CURRENT TASK

Task ID: TASK-20260924-1707-DEBUG-SSO-FAILED-TO-FETCH

Created: 2026-09-24 17:07

Last Updated: 2026-09-24 17:15

Status: COMPLETED

Resume Authorization: YES

---

## User Request

"Veja a imagem, ao tentar fazer o SSO deu este problema, analise" (Modal OneNTT SSO com erro "Failed to fetch")

---

## Root Cause Analysis & Solution

1. **Subsolo WSL2 Inativo (Timeout de Sessão)**:
   - O `iniciar_windows.bat` executava `docker compose up -d`, abria o navegador e imediatamente saía (`exit /b 0`).
   - Sem nenhuma janela de console do Windows vinculada ao WSL2, o subsistema encerrava a distribuição Ubuntu após alguns segundos de inatividade.
   - Quando o usuário clicava em "Login Corporativo NTT DATA" no navegador, a chamada `fetch("http://localhost:8000/auth/okta/start")` encontrava a porta inacessível (conexão recusada), resultando no erro padrão do navegador: `TypeError: Failed to fetch`.
   - **Solução**: Ajustado o [iniciar_windows.bat](file:///c:/Branchs/Berbert/AXET-NEURALGRAPH-3D-main/iniciar_windows.bat) para manter a sessão ativa via `tail -f /dev/null` enquanto a janela permanecer aberta/minimizada, garantindo que o WSL2 e os 5 containers permaneçam operacionais ininterruptamente.

2. **CORS e Binding de Redes**:
   - Ajustado `CORS_ALLOWED_ORIGINS` no `.env` e em `app/config.py` para incluir explicitamente tanto `http://localhost:3001` quanto `http://127.0.0.1:3001`, `localhost:3000` e `127.0.0.1:3000`.

3. **Validação do Endpoint `/auth/okta/start`**:
   - Testado o endpoint com sucesso: retornou HTTP 200 OK com `device_code`, `user_code` e a URL completa de ativação do Okta (`https://onentt.okta.com/activate?user_code=...`).

4. **Script de Encerramento Limpo**:
   - Criado [parar_windows.bat](file:///c:/Branchs/Berbert/AXET-NEURALGRAPH-3D-main/parar_windows.bat) para parar os containers e desligar o WSL de forma limpa quando desejado.

---

## Objective

1. Analisar a causa raiz da mensagem "Failed to fetch" no modal de SSO.
2. Corrigir o problema de encerramento do WSL2 e políticas de CORS.
3. Testar a requisição de SSO diretamente no backend.
4. Garantir persistência dos serviços.

---

## Execution Cursor

Phase: COMPLETED

Current Step: SSO Okta testado com sucesso (HTTP 200), keepalive ativo e scripts consolidados.

Last Safe Checkpoint: CHECKPOINT-094.

---

## Planned Steps

- [x] Verificar estado do WSL e distribuições instaladas via PowerShell.
- [x] Testar comandos internos de `instalar_windows.bat` e executar o script.
- [x] Identificar falhas/erros reportados na execução.
- [x] Ajustar `instalar_windows.bat`, `setup_wsl_internal.sh`, `docker-compose.yml` e `iniciar_windows.bat`.
- [x] Validar a execução completa com sucesso.
- [x] Registrar checkpoint e atualizar persistent memory.
