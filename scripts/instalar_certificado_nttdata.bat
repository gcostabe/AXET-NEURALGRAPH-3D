@echo off
chcp 65001 >nul
echo ======================================================================
echo   INSTALADOR DE CERTIFICADO DIGITAL CORPORATIVO - NTT DATA
echo   AXET-NeuralGraph 3D Enterprise Desktop
echo ======================================================================
echo.
echo Instalando o certificado publico da NTT DATA no repositorio confiavel do Windows...
echo.
certutil -addstore -user "Root" "%~dp0NTT-DATA-Corporate.cer"
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ======================================================================
    echo   [SUCESSO] O certificado da NTT DATA foi instalado com sucesso!
    echo   O Windows agora reconhece o AXET-NeuralGraph como confiavel.
    echo ======================================================================
) else (
    echo.
    echo [AVISO] Tentando instalar com permissoes elevadas...
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process certutil -ArgumentList '-addstore', 'Root', '%~dp0NTT-DATA-Corporate.cer' -Verb RunAs"
)
echo.
echo Pressione qualquer tecla para fechar esta janela...
pause >nul
