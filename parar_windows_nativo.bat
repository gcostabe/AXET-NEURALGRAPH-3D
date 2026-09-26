@echo off
cd /d "%~dp0"
chcp 65001 >nul
title Parando servicos nativos AXET-NEURALGRAPH-3D

echo ===============================================================================
echo   [NTT DATA] - Encerrando servicos cognitivos nativos AXET
echo ===============================================================================
echo.

echo [1/3] Encerrando Qdrant...
taskkill /F /IM qdrant.exe >nul 2>&1

echo [2/3] Encerrando processos na porta 8000 (Backend)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000 ^| findstr LISTENING 2^>nul') do (
    taskkill /F /PID %%a >nul 2>&1
)

echo [3/3] Encerrando processos na porta 8766 (Gateway)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8766 ^| findstr LISTENING 2^>nul') do (
    taskkill /F /PID %%a >nul 2>&1
)

echo.
echo [OK] Todos os servicos nativos foram encerrados com sucesso.
echo.
timeout /t 2 >nul
exit /b 0
