#!/usr/bin/env bash
# ==============================================================================
# iniciar_mac.command
# Lançador de duplo clique para macOS (Finder / Mesa)
# ==============================================================================
set -e

DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

echo "==============================================================================="
echo "  🚀 NTT DATA — AXET-NEURALGRAPH-3D (macOS Launcher)"
echo "==============================================================================="
echo ""

# 1. Verificar se a aplicação já está rodando na porta 3001
if curl -s -I http://localhost:3001/ >/dev/null 2>&1; then
    echo "[OK] AXET-NEURALGRAPH-3D já está online na porta 3001!"
    echo "Abrindo o navegador..."
    open "http://localhost:3001/"
    sleep 2
    exit 0
fi

# 2. Verificar se o Docker daemon está ativo
if ! docker info >/dev/null 2>&1; then
    echo "[INFO] Docker daemon não está rodando. Tentando inicializar..."
    if [ -d "/Applications/Docker.app" ]; then
        open -a Docker
        echo "Aguardando inicialização do Docker Desktop..."
        ATTEMPTS=0
        while [ $ATTEMPTS -lt 25 ]; do
            if docker info >/dev/null 2>&1; then
                break
            fi
            sleep 2
            ATTEMPTS=$((ATTEMPTS + 1))
        done
    elif command -v colima >/dev/null 2>&1; then
        echo "Iniciando Colima..."
        colima start || true
    fi
fi

if ! docker info >/dev/null 2>&1; then
    echo "[ERRO] Docker não está disponível. Inicie o Docker Desktop ou Colima e tente novamente."
    sleep 5
    exit 1
fi

# 3. Subir todos os 5 containers via Docker Compose
echo "[INFO] Subindo containers da solução via Docker Compose..."
docker compose up -d

# 3.1. Verificar se existe pacote de atualização pendente da base (Opção 1)
if [ -f "data/snapshots/auto_import.qpack" ]; then
    echo "[INFO] Pacote de atualização pendente detectado em data/snapshots/auto_import.qpack..."
    ./atualizar_base.sh "data/snapshots/auto_import.qpack" || true
    mv "data/snapshots/auto_import.qpack" "data/snapshots/auto_import.qpack.imported" || true
fi

# 4. Aguardar o frontend responder
echo "Aguardando o Frontend 3D responder na porta 3001..."
ATTEMPTS=0
while [ $ATTEMPTS -lt 30 ]; do
    if curl -s -I http://localhost:3001/ >/dev/null 2>&1; then
        break
    fi
    sleep 1
    ATTEMPTS=$((ATTEMPTS + 1))
done

echo ""
echo "==============================================================================="
echo "  ✅ AXET-NEURALGRAPH-3D online! Abrindo navegador..."
echo "  Interface Web: http://localhost:3001/"
echo "  Backend API:   http://localhost:8000/docs"
echo "  aXet Gateway:  http://localhost:8766/health"
echo "==============================================================================="
echo ""

open "http://localhost:3001/"

sleep 4
