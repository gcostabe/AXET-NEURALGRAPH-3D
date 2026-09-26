@echo off
cd /d "%~dp0"
set "SCRIPT_DIR=%CD%"
chcp 65001 >nul

set "PYTHON_EXE=%SCRIPT_DIR%\.venv_windows\Scripts\python.exe"
if not exist "%PYTHON_EXE%" (
    if exist "%LOCALAPPDATA%\Programs\Python\Python311\python.exe" (
        set "PYTHON_EXE=%LOCALAPPDATA%\Programs\Python\Python311\python.exe"
    ) else (
        set "PYTHON_EXE=python"
    )
)

if "%~1"=="--non-interactive" goto NON_INTERACTIVE
if "%NON_INTERACTIVE%"=="1" goto NON_INTERACTIVE

title NTT DATA - AXET-NEURALGRAPH-3D (Nativo)
"%PYTHON_EXE%" "%SCRIPT_DIR%\scripts\supervisor_windows.py"
exit /b %errorlevel%

:NON_INTERACTIVE
powershell -NoProfile -Command "Start-Process -FilePath '%PYTHON_EXE%' -ArgumentList '\"%SCRIPT_DIR%\scripts\supervisor_windows.py\"' -WorkingDirectory '%SCRIPT_DIR%' -WindowStyle Hidden"
:: Aguardar porta 8000 responder por ate 20 segundos
for /l %%i in (1,1,30) do (
    powershell -NoProfile -Command "$c = New-Object System.Net.Sockets.TcpClient; try { $c.Connect('127.0.0.1', 8000); $c.Close(); exit 0 } catch { exit 1 }" >nul 2>&1
    if !errorlevel! equ 0 exit /b 0
    powershell -NoProfile -Command "Start-Sleep -Milliseconds 600" >nul 2>&1
)
exit /b 0
