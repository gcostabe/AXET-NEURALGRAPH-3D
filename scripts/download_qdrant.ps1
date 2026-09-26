[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$targetDir = Join-Path $PSScriptRoot "..\bin\qdrant"
if (!(Test-Path $targetDir)) {
    New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
}

$exePath = Join-Path $targetDir "qdrant.exe"
if (Test-Path $exePath) {
    Write-Output "Qdrant already downloaded: $exePath"
    exit 0
}

$zipPath = Join-Path $targetDir "qdrant.zip"
Write-Output "Downloading native Qdrant for Windows..."
$url = "https://github.com/qdrant/qdrant/releases/download/v1.19.1/qdrant-x86_64-pc-windows-msvc.zip"
(New-Object System.Net.WebClient).DownloadFile($url, $zipPath)

Write-Output "Extracting Qdrant..."
Expand-Archive -Path $zipPath -DestinationPath $targetDir -Force
Remove-Item $zipPath -Force

if (Test-Path $exePath) {
    Write-Output "SUCCESS: Qdrant extracted to $exePath"
    & $exePath --version
} else {
    Write-Error "Failed to extract qdrant.exe"
    exit 1
}
