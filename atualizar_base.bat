@echo off
chcp 65001 >nul
title NTT DATA — AXET-NEURALGRAPH-3D (Atualizar Base de Conhecimento)

echo ===============================================================================
echo   🔄 NTT DATA — AXET-NEURALGRAPH-3D
echo   Atualização Segura de Base de Conhecimento Local (Opção 1 - Snapshots)
echo ===============================================================================
echo.

set "SCRIPT_DIR=%~dp0"
if "%SCRIPT_DIR:~-1%"=="\" set "SCRIPT_DIR=%SCRIPT_DIR:~0,-1%"

:: 1. Converter caminho para o formato WSL
for /f "tokens=*" %%a in ('wsl wslpath -u "%SCRIPT_DIR%" 2^>nul') do set "WSL_PROJECT_DIR=%%a"

if "%WSL_PROJECT_DIR%"=="" (
    echo [ERRO] Não foi possível comunicar com o WSL2.
    echo Certifique-se de que o WSL está instalado executando 'instalar_windows.bat'.
    pause
    exit /b 1
)

:: 2. Executar script de atualização dentro do WSL2
set "TARGET_ARG=%~1"
if not "%TARGET_ARG%"=="" (
    for /f "tokens=*" %%b in ('wsl wslpath -u "%TARGET_ARG%" 2^>nul') do set "WSL_TARGET_ARG=%%b"
)

echo [INFO] Executando processo de restauração segura no WSL2...
wsl -d Ubuntu -- bash -c "cd '%WSL_PROJECT_DIR%' && ./atualizar_base.sh '%WSL_TARGET_ARG%'"

echo.
pause
exit /b 0
