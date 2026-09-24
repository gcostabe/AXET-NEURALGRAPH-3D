@echo off
chcp 65001 >nul
title Instalador AXET-NEURALGRAPH-3D (Windows WSL2)

echo ===============================================================================
echo   [NTT DATA] - AXET-NEURALGRAPH-3D
echo   Instalador Automatizado de Ambiente Local para Windows (via WSL2)
echo ===============================================================================
echo.

set "SCRIPT_DIR=%~dp0"
if "%SCRIPT_DIR:~-1%"=="\" set "SCRIPT_DIR=%SCRIPT_DIR:~0,-1%"

:: 1. Verificar se o comando WSL esta disponivel no Windows
echo [1/4] Verificando subsistema WSL2 no Windows...
where wsl >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] O comando 'wsl' nao foi encontrado.
    echo Este aplicativo requer o Windows 10 (versao 2004+) ou Windows 11.
    echo.
    echo Pressione qualquer tecla para abrir a documentacao oficial da Microsoft...
    pause >nul
    start https://learn.microsoft.com/pt-br/windows/wsl/install
    exit /b 1
)

:: 2. Verificar se o Ubuntu esta instalado no WSL
echo [2/4] Verificando distribuicao Ubuntu no WSL...
wsl -d Ubuntu -e true >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [AVISO] A distribuicao Ubuntu do WSL2 ainda nao esta instalada ou inicializada.
    echo Instalando Ubuntu automaticamente agora via WSL...
    echo.
    wsl --install -d Ubuntu --no-launch
    if %errorlevel% neq 0 (
        echo.
        echo Se esta for a primeira vez instalando o WSL no seu computador,
        echo pode ser necessario reiniciar o Windows e executar este instalador novamente.
        echo.
        pause
        exit /b 1
    )
    echo Ubuntu instalado com sucesso!
)

:: 3. Converter o caminho do projeto para o formato do Linux (/mnt/c/...)
echo [3/4] Identificando diretorio do projeto no subsistema Linux...
set "WSL_PROJECT_DIR="
for /f "tokens=*" %%a in ('wsl wslpath -u "%SCRIPT_DIR%" 2^>nul') do set "WSL_PROJECT_DIR=%%a"

if "%WSL_PROJECT_DIR%"=="" (
    echo [ERRO] Nao foi possivel converter o caminho do Windows para o WSL.
    pause
    exit /b 1
)

echo    Diretorio Windows: %SCRIPT_DIR%
echo    Diretorio WSL:     %WSL_PROJECT_DIR%
echo.

:: 4. Executar o provisionamento interno de dependencias
echo [4/4] Instalando dependencias e iniciando os 5 containers Docker...
echo (Qdrant, PostgreSQL, aXet Gateway, Backend FastAPI e Frontend Next.js 3D)
echo Isso pode levar alguns minutos na primeira execucao para baixar as imagens.
echo Por favor, aguarde...
echo.

wsl -d Ubuntu -u root -- bash -c "cd '%WSL_PROJECT_DIR%' && chmod +x scripts/*.sh && ./scripts/setup_wsl_internal.sh"
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Ocorreu uma falha durante o provisionamento no WSL2.
    pause
    exit /b 1
)

:: 5. Criar atalho na Area de Trabalho do Windows
set "DESKTOP_DIR=%USERPROFILE%\Desktop"
if not exist "%DESKTOP_DIR%" (
    if exist "%USERPROFILE%\OneDrive\Desktop" (
        set "DESKTOP_DIR=%USERPROFILE%\OneDrive\Desktop"
    )
)

set "SHORTCUT_BAT=%DESKTOP_DIR%\Iniciar AXET-NEURALGRAPH-3D.bat"

if exist "%DESKTOP_DIR%" (
    (
        echo @echo off
        echo chcp 65001 ^>nul
        echo title AXET-NEURALGRAPH-3D
        echo cd /d "%SCRIPT_DIR%"
        echo call "%SCRIPT_DIR%\iniciar_windows.bat"
    ) > "%SHORTCUT_BAT%"
    echo.
    echo Atalho criado na sua Area de Trabalho:
    echo   "%SHORTCUT_BAT%"
)

echo.
echo ===============================================================================
echo   [OK] INSTALACAO CONCLUIDA COM SUCESSO!
echo ===============================================================================
echo.
echo Deseja iniciar a aplicacao agora mesmo?
echo [1] Sim, iniciar e abrir o navegador em http://localhost:3001/ (Padrao)
echo [2] Nao, iniciar mais tarde pelo atalho na Area de Trabalho
echo.
set /p "OPT=Escolha uma opcao (1 ou 2): "

if "%OPT%"=="2" (
    echo.
    echo Tudo pronto! Para iniciar a qualquer momento, de duplo clique no atalho da Area de Trabalho.
    pause
    exit /b 0
)

call "%SCRIPT_DIR%\iniciar_windows.bat"
