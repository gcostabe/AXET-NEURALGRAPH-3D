@echo off
cd /d "%~dp0"
set "SCRIPT_DIR=%CD%"
chcp 65001 >nul
title Instalador AXET-NEURALGRAPH-3D (Windows WSL2)

echo ===============================================================================
echo   [NTT DATA] - AXET-NEURALGRAPH-3D
echo   Instalador Automatizado de Ambiente Local para Windows (via WSL2)
echo ===============================================================================
echo.

:: 1. Verificar se o comando WSL esta disponivel no Windows
echo [1/5] Verificando subsistema WSL2 no Windows...
where wsl >nul 2>&1
if %errorlevel% equ 0 goto WSL_AVAILABLE

echo.
echo [ERRO] O comando 'wsl' nao foi encontrado no PATH do seu Windows.
echo Este aplicativo requer o Windows 10 versao 2004 ou superior, ou Windows 11.
echo.
echo Para instalar o WSL manualmente, abra o Prompt ou PowerShell como Administrador e execute:
echo     wsl --install
echo.
echo Pressione qualquer tecla para abrir o guia oficial da Microsoft no navegador...
pause
start https://learn.microsoft.com/pt-br/windows/wsl/install
goto ERROR_EXIT

:WSL_AVAILABLE
:: 2. Verificar se o Ubuntu esta instalado no WSL
echo [2/5] Verificando distribuicao Ubuntu no WSL...
wsl -d Ubuntu -e true >nul 2>&1
if %errorlevel% equ 0 goto UBUNTU_AVAILABLE

echo.
echo [AVISO] A distribuicao Ubuntu do WSL2 ainda nao esta instalada ou inicializada.
echo Instalando Ubuntu automaticamente agora via WSL...
echo Se o Windows solicitar confirmacao de Administrador, clique em SIM ou Permitir.
echo.
wsl --install -d Ubuntu --no-launch
if %errorlevel% equ 0 goto UBUNTU_INSTALLED

echo.
echo [ERRO] Falha ao instalar o Ubuntu automaticamente via WSL.
echo Se esta for a primeira vez instalando o WSL no computador, pode ser necessario:
echo 1. Reiniciar o Windows para ativar os recursos de virtualizacao.
echo 2. Executar este instalador novamente apos reiniciar.
echo.
goto ERROR_EXIT

:UBUNTU_INSTALLED
echo Ubuntu instalado com sucesso!

:UBUNTU_AVAILABLE
:: 3. Converter o caminho do projeto para o formato do Linux (/mnt/c/...)
echo [3/5] Identificando diretorio do projeto no subsistema Linux...
set "WSL_PROJECT_DIR="
for /f "tokens=*" %%a in ('wsl wslpath -u "%SCRIPT_DIR%"') do set "WSL_PROJECT_DIR=%%a"

if not "%WSL_PROJECT_DIR%"=="" goto PATH_CONVERTED

echo.
echo [ERRO] Nao foi possivel converter o caminho do Windows para o WSL.
echo Caminho Windows: "%SCRIPT_DIR%"
echo.
goto ERROR_EXIT

:PATH_CONVERTED
echo    Diretorio Windows: %SCRIPT_DIR%
echo    Diretorio WSL:     %WSL_PROJECT_DIR%
echo.

:: 4. Executar o provisionamento interno de dependencias
echo [4/5] Instalando dependencias e iniciando os 5 containers Docker...
echo (Qdrant, PostgreSQL, aXet Gateway, Backend FastAPI e Frontend Next.js 3D)
echo Isso pode levar alguns minutos na primeira execucao para baixar as imagens.
echo Por favor, aguarde...
echo.

wsl -d Ubuntu -u root -- bash -c "cd '%WSL_PROJECT_DIR%' && chmod +x scripts/*.sh && ./scripts/setup_wsl_internal.sh"
if %errorlevel% equ 0 goto PROVISION_OK

echo.
echo [ERRO] Ocorreu uma falha durante o provisionamento no WSL2.
echo Verifique as mensagens de erro acima.
echo.
goto ERROR_EXIT

:PROVISION_OK
:: 5. Criar atalho na Area de Trabalho do Windows
echo.
echo [5/5] Criando atalho na Area de Trabalho...

set "DESKTOP_DIR="
for /f "tokens=2*" %%A in ('reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders" /v Desktop 2^>nul') do set "DESKTOP_DIR=%%B"
if not "%DESKTOP_DIR%"=="" call set "DESKTOP_DIR=%DESKTOP_DIR%"

if "%DESKTOP_DIR%"=="" set "DESKTOP_DIR=%USERPROFILE%\Desktop"
if not exist "%DESKTOP_DIR%" if exist "%USERPROFILE%\Desktop" set "DESKTOP_DIR=%USERPROFILE%\Desktop"
if not exist "%DESKTOP_DIR%" if exist "%USERPROFILE%\OneDrive\Desktop" set "DESKTOP_DIR=%USERPROFILE%\OneDrive\Desktop"

set "SHORTCUT_BAT=%DESKTOP_DIR%\Iniciar AXET-NEURALGRAPH-3D.bat"

if not exist "%DESKTOP_DIR%" goto DESKTOP_NOT_FOUND

echo @echo off> "%SHORTCUT_BAT%"
echo title AXET-NEURALGRAPH-3D>> "%SHORTCUT_BAT%"
echo cd /d "%SCRIPT_DIR%">> "%SHORTCUT_BAT%"
echo call "%SCRIPT_DIR%\iniciar_windows.bat">> "%SHORTCUT_BAT%"
echo.
echo Atalho criado com sucesso na sua Area de Trabalho:
echo   "%SHORTCUT_BAT%"
goto SHORTCUT_DONE

:DESKTOP_NOT_FOUND
echo.
echo [AVISO] Nao foi possivel detectar automaticamente a pasta da Area de Trabalho.
echo Um atalho foi mantido na pasta do projeto:
echo   "%SCRIPT_DIR%\iniciar_windows.bat"

:SHORTCUT_DONE
echo.
echo ===============================================================================
echo   [OK] INSTALACAO CONCLUIDA COM SUCESSO!
echo ===============================================================================
echo.
echo Deseja iniciar a aplicacao agora mesmo?
echo [1] Sim, iniciar e abrir o navegador em http://localhost:3001/ (Padrao)
echo [2] Nao, iniciar mais tarde pelo atalho na Area de Trabalho
echo.
set "OPT=1"
set /p "OPT=Escolha uma opcao (1 ou 2, ou pressione Enter para 1): "

if "%OPT%"=="2" goto DO_NOT_START

echo.
echo Iniciando os servicos do AXET-NEURALGRAPH-3D...
call "%SCRIPT_DIR%\iniciar_windows.bat"
goto END_SCRIPT

:DO_NOT_START
echo.
echo Tudo pronto! Para iniciar a qualquer momento, de duplo clique no atalho da Area de Trabalho.
echo.
goto END_SCRIPT

:ERROR_EXIT
echo.
echo ===============================================================================
echo   [FALHA] A execucao encontrou um erro. Leia as informacoes acima.
echo ===============================================================================
echo.
pause
exit /b 1

:END_SCRIPT
echo.
echo Pressione qualquer tecla para fechar esta janela...
pause >nul
exit /b 0
