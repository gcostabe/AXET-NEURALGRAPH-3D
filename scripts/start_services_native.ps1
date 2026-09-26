param(
    [switch]$NonInteractive
)

$scriptDir = Split-Path -Parent $PSScriptRoot

# 1. Qdrant
$qdrantExe = Join-Path $scriptDir "bin\qdrant\qdrant.exe"
$qdrantRunning = $false
try {
    $c = New-Object System.Net.Sockets.TcpClient
    $c.Connect("127.0.0.1", 6333)
    $c.Close()
    $qdrantRunning = $true
} catch {}

if (!$qdrantRunning) {
    if (!$NonInteractive) { Write-Host "[1/3] Iniciando Qdrant Vector DB nativo (porta 6333)..." }
    Start-Process -FilePath $qdrantExe -ArgumentList "--config-path bin\qdrant\config\config.yaml" -WorkingDirectory $scriptDir -WindowStyle Hidden
} else {
    if (!$NonInteractive) { Write-Host "[1/3] Qdrant ja ativo na porta 6333." }
}

# 2. Gateway
$pythonExe = Join-Path $scriptDir ".venv_windows\Scripts\python.exe"
if (!(Test-Path $pythonExe)) {
    $pythonExe = Join-Path $env:LOCALAPPDATA "Programs\Python\Python311\python.exe"
}

$gatewayRunning = $false
try {
    $c = New-Object System.Net.Sockets.TcpClient
    $c.Connect("127.0.0.1", 8766)
    $c.Close()
    $gatewayRunning = $true
} catch {}

if (!$gatewayRunning) {
    if (!$NonInteractive) { Write-Host "[2/3] Iniciando aXet AI Gateway (porta 8766)..." }
    Start-Process -FilePath $pythonExe -ArgumentList "gateway\local_ai_gateway.py" -WorkingDirectory $scriptDir -WindowStyle Hidden
} else {
    if (!$NonInteractive) { Write-Host "[2/3] aXet AI Gateway ja ativo na porta 8766." }
}

# 3. Backend FastAPI
$backendRunning = $false
try {
    $c = New-Object System.Net.Sockets.TcpClient
    $c.Connect("127.0.0.1", 8000)
    $c.Close()
    $backendRunning = $true
} catch {}

if (!$backendRunning) {
    if (!$NonInteractive) { Write-Host "[3/3] Iniciando Backend FastAPI cognitivo (porta 8000)..." }
    $env:PYTHONPATH = Join-Path $scriptDir "backend"
    Start-Process -FilePath $pythonExe -ArgumentList "-m uvicorn app.main:app --host 0.0.0.0 --port 8000" -WorkingDirectory (Join-Path $scriptDir "backend") -WindowStyle Hidden
} else {
    if (!$NonInteractive) { Write-Host "[3/3] Backend FastAPI ja ativo na porta 8000." }
}

# 4. Aguardar porta 8000 responder
$attempts = 0
$maxAttempts = 30
while ($attempts -lt $maxAttempts) {
    Start-Sleep -Milliseconds 600
    $attempts++
    try {
        $c = New-Object System.Net.Sockets.TcpClient
        $c.Connect("127.0.0.1", 8000)
        $c.Close()
        if (!$NonInteractive) {
            Write-Host ""
            Write-Host "==============================================================================="
            Write-Host "  [OK] AXET-NEURALGRAPH-3D NATIVO PRONTO E CONECTADO!"
            Write-Host "  Backend: http://localhost:8000/"
            Write-Host "  Gateway: http://localhost:8766/"
            Write-Host "  Qdrant:  http://localhost:6333/dashboard"
            Write-Host "==============================================================================="
            Write-Host ""
            Write-Host "[STATUS] Servicos cognitivos em execucao ativa em segundo plano."
            Write-Host "Voce pode utilizar o AXET Desktop App normalmente."
            Write-Host "Para encerrar os servicos a qualquer momento, execute 'parar_windows_nativo.bat'."
            Write-Host ""
        }
        exit 0
    } catch {}
}

if (!$NonInteractive) {
    Write-Warning "Tempo limite de espera atingido para a porta 8000."
}
exit 1
