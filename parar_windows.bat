@echo off
cd /d "%~dp0"
set "SCRIPT_DIR=%CD%"
chcp 65001 >nul
title Parando AXET-NEURALGRAPH-3D

echo ===============================================================================
echo   [NTT DATA] - AXET-NEURALGRAPH-3D
echo   Encerrando servicos e containers Docker...
echo ===============================================================================
echo.

set "WSL_PROJECT_DIR="
for /f "tokens=*" %%a in ('wsl -d Ubuntu wslpath -u "%SCRIPT_DIR%" 2^>nul ^|^| wsl wslpath -u "%SCRIPT_DIR%" 2^>nul') do set "WSL_PROJECT_DIR=%%a"
set "WSL_PROJECT_DIR=%WSL_PROJECT_DIR:/mnt/host/=/mnt/%"

if not "%WSL_PROJECT_DIR%"=="" (
    wsl -d Ubuntu -u root -- bash -c "cd '%WSL_PROJECT_DIR%' && docker compose stop"
)

wsl --shutdown >nul 2>&1

echo.
echo [OK] Todos os servicos do AXET-NEURALGRAPH-3D foram pausados com sucesso!
powershell -NoProfile -Command "Start-Sleep -Seconds 2" >nul 2>&1
exit /b 0
