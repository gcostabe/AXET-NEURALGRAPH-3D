@echo off
cd /d "%~dp0"
set "SCRIPT_DIR=%CD%"
chcp 65001 >nul
title NTT DATA - AXET-NEURALGRAPH-3D (Atualizar Base de Conhecimento)

echo ===============================================================================
echo   [NTT DATA] - AXET-NEURALGRAPH-3D
echo   Atualizacao Segura de Base de Conhecimento Local (Opcao 1 - Snapshots)
echo ===============================================================================
echo.

:: 1. Converter caminho para o formato WSL
set "WSL_PROJECT_DIR="
for /f "tokens=*" %%a in ('wsl -d Ubuntu wslpath -u "%SCRIPT_DIR%" 2^>nul ^|^| wsl wslpath -u "%SCRIPT_DIR%" 2^>nul') do set "WSL_PROJECT_DIR=%%a"
set "WSL_PROJECT_DIR=%WSL_PROJECT_DIR:/mnt/host/=/mnt/%"

if "%WSL_PROJECT_DIR%"=="" (
    echo [ERRO] Nao foi possivel comunicar com o WSL2.
    echo Certifique-se de que o WSL esta instalado executando 'instalar_windows.bat'.
    pause
    exit /b 1
)

:: 2. Executar script de atualizacao dentro do WSL2
set "TARGET_ARG=%~1"
set "WSL_TARGET_ARG="
if not "%TARGET_ARG%"=="" (
    for /f "tokens=*" %%b in ('wsl -d Ubuntu wslpath -u "%TARGET_ARG%" 2^>nul ^|^| wsl wslpath -u "%TARGET_ARG%" 2^>nul') do set "WSL_TARGET_ARG=%%b"
    set "WSL_TARGET_ARG=%WSL_TARGET_ARG:/mnt/host/=/mnt/%"
)

echo [INFO] Executando processo de restauracao segura no WSL2...
wsl -d Ubuntu -- bash -c "cd '%WSL_PROJECT_DIR%' && ./atualizar_base.sh '%WSL_TARGET_ARG%'"

echo.
pause
exit /b 0
