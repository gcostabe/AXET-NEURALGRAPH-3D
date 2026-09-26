@echo off
cd /d "%~dp0"
set "SCRIPT_DIR=%CD%"
chcp 65001 >nul

set "IS_NON_INTERACTIVE=0"
if "%~1"=="--non-interactive" set "IS_NON_INTERACTIVE=1"
if "%NON_INTERACTIVE%"=="1" set "IS_NON_INTERACTIVE=1"

if "%IS_NON_INTERACTIVE%"=="0" (
    title NTT DATA - AXET-NEURALGRAPH-3D (:3001)
    echo ===============================================================================
    echo   [NTT DATA] - AXET-NEURALGRAPH-3D
    echo   Iniciando a Plataforma Neural 3D e Sistema RAG Local...
    echo ===============================================================================
    echo.
)

:: 1. Tentar primeiro o Docker Desktop nativo do Windows (se estiver ativo)
docker compose version >nul 2>&1
if %errorlevel% equ 0 (
    echo [INFO] Docker Desktop nativo do Windows detectado. Subindo containers...
    docker compose up -d >nul 2>&1
    if %errorlevel% equ 0 goto CONTAINERS_STARTED
)

:: 2. Fallback: Converter caminho para o formato WSL2 Ubuntu
set "WSL_PROJECT_DIR="
for /f "tokens=*" %%a in ('wsl -d Ubuntu wslpath -u "%SCRIPT_DIR%" 2^>nul ^|^| wsl wslpath -u "%SCRIPT_DIR%" 2^>nul') do set "WSL_PROJECT_DIR=%%a"
set "WSL_PROJECT_DIR=%WSL_PROJECT_DIR:/mnt/host/=/mnt/%"

if "%WSL_PROJECT_DIR%"=="" (
    echo [ERRO] Nao foi possivel comunicar com o WSL2 ou Docker Desktop.
    echo Certifique-se de que o Docker Desktop ou WSL2 esta configurado.
    if "%IS_NON_INTERACTIVE%"=="0" pause
    exit /b 1
)

:: 3. Garantir que o servico do Docker esteja ativo no WSL2
wsl -d Ubuntu -u root -- service docker status >nul 2>&1
if %errorlevel% neq 0 (
    wsl -d Ubuntu -u root -- service docker start >nul 2>&1
)

:: 4. Subir containers via WSL2
wsl -d Ubuntu -u root -- bash -c "cd '%WSL_PROJECT_DIR%' && docker compose up -d"

:CONTAINERS_STARTED
:: Se for execução não-interativa disparada pelo Desktop App, encerra imediatamente com sucesso
if "%IS_NON_INTERACTIVE%"=="1" exit /b 0

:: 4.1. Verificar se existe pacote de atualizacao pendente da base (Opcao 1)
if exist "%SCRIPT_DIR%\data\snapshots\auto_import.qpack" (
    echo [INFO] Pacote de atualizacao pendente detectado em data\snapshots\auto_import.qpack...
    call "%SCRIPT_DIR%\atualizar_base.bat" "%SCRIPT_DIR%\data\snapshots\auto_import.qpack"
    ren "%SCRIPT_DIR%\data\snapshots\auto_import.qpack" auto_import.qpack.imported >nul 2>&1
)

:: 5. Aguardar inicializacao e abrir o navegador automaticamente
echo Aguardando o servico responder na porta 3001...
set /a ATTEMPTS=0

:WAIT_LOOP
powershell -NoProfile -Command "Start-Sleep -Seconds 1" >nul 2>&1
set /a ATTEMPTS+=1

powershell -Command "$c = New-Object System.Net.Sockets.TcpClient; try { $c.Connect('127.0.0.1', 3001); exit 0 } catch { exit 1 }" >nul 2>&1
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
echo.
echo [STATUS] A solucao esta em execucao ativa.
echo Para parar e encerrar o AXET-NEURALGRAPH-3D, feche esta janela ou aperte CTRL+C.
echo.

wsl -d Ubuntu -u root -- bash -c "cd '%WSL_PROJECT_DIR%' && tail -f /dev/null"
exit /b 0
