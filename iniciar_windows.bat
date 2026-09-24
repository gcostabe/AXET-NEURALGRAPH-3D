@echo off
chcp 65001 >nul
title NTT DATA - AXET-NEURALGRAPH-3D (:3001)

echo ===============================================================================
echo   [NTT DATA] - AXET-NEURALGRAPH-3D
echo   Iniciando a Plataforma Neural 3D e Sistema RAG Local...
echo ===============================================================================
echo.

set "SCRIPT_DIR=%~dp0"
if "%SCRIPT_DIR:~-1%"=="\" set "SCRIPT_DIR=%SCRIPT_DIR:~0,-1%"

:: 1. Converter caminho para o formato WSL
set "WSL_PROJECT_DIR="
for /f "tokens=*" %%a in ('wsl wslpath -u "%SCRIPT_DIR%" 2^>nul') do set "WSL_PROJECT_DIR=%%a"

if "%WSL_PROJECT_DIR%"=="" (
    echo [ERRO] Nao foi possivel comunicar com o WSL2.
    echo Certifique-se de que o WSL esta instalado executando 'instalar_windows.bat'.
    pause
    exit /b 1
)

:: 2. Testar se o Frontend ja esta rodando na porta 3001
powershell -Command "$client = New-Object System.Net.Sockets.TcpClient; try { $client.Connect('127.0.0.1', 3001); exit 0 } catch { exit 1 }" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] O aplicativo ja esta ativo e respondendo na porta 3001!
    echo Abrindo o navegador...
    start http://localhost:3001/
    timeout /t 2 /nobreak >nul
    exit /b 0
)

:: 3. Garantir que o servico do Docker esteja ativo no WSL2
wsl -d Ubuntu -u root -- service docker status >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] Iniciando servico do Docker Engine no WSL2...
    wsl -d Ubuntu -u root -- service docker start >nul 2>&1
)

:: 4. Subir todos os containers via Docker Compose
echo [INFO] Inicializando os 5 containers da solucao...
echo        - Frontend Next.js / Three.js 3D (:3001)
echo        - Backend FastAPI REST & SSE (:8000)
echo        - aXet / Okta API Gateway (:8766)
echo        - PostgreSQL 16 Relacional (:5432)
echo        - Qdrant Vector Engine (:6333)
echo.

start "AXET-NEURALGRAPH-3D Docker" /min wsl -d Ubuntu -- bash -c "cd '%WSL_PROJECT_DIR%' && docker compose up -d"

:: 4.1. Verificar se existe pacote de atualizacao pendente da base (Opcao 1)
if exist "%SCRIPT_DIR%\data\snapshots\auto_import.qpack" (
    echo [INFO] Pacote de atualizacao pendente detectado em data\snapshots\auto_import.qpack...
    call "%SCRIPT_DIR%\atualizar_base.bat" "%SCRIPT_DIR%\data\snapshots\auto_import.qpack"
    ren "%SCRIPT_DIR%\data\snapshots\auto_import.qpack" auto_import.qpack.imported >nul 2>&1
)

:: 5. Aguardar inicializacao e abrir o navegador automaticamente
echo Aguardando o servico web responder na porta 3001...
set /a ATTEMPTS=0

:WAIT_LOOP
timeout /t 1 /nobreak >nul
set /a ATTEMPTS+=1

powershell -Command "$client = New-Object System.Net.Sockets.TcpClient; try { $client.Connect('127.0.0.1', 3001); exit 0 } catch { exit 1 }" >nul 2>&1
if %errorlevel% equ 0 (
    goto OPEN_BROWSER
)

if %ATTEMPTS% geq 35 (
    echo [AVISO] Tempo de espera limite atingido. Abrindo o navegador...
    goto OPEN_BROWSER
)

goto WAIT_LOOP

:OPEN_BROWSER
echo.
echo ===============================================================================
echo   [OK] AXET-NEURALGRAPH-3D pronto e conectado em http://localhost:3001/
echo ===============================================================================
echo.
start http://localhost:3001/

timeout /t 3 /nobreak >nul
exit /b 0
