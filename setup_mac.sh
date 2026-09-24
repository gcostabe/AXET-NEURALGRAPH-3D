#!/usr/bin/env bash
# ==============================================================================
# setup_mac.sh
# Instalador e configurador automatizado de ambiente local para macOS
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "==============================================================================="
echo "  🧠 NTT DATA — AXET-NEURALGRAPH-3D"
echo "  Instalador Automatizado de Ambiente Local para macOS"
echo "==============================================================================="
echo ""

# 1. Verificar runtime do Docker e Docker Compose
echo "[1/4] Verificando Docker e Docker Compose..."
if ! command -v docker >/dev/null 2>&1 || ! docker compose version >/dev/null 2>&1; then
    echo "    Docker ou Docker Compose não foram encontrados no PATH."
    if command -v brew >/dev/null 2>&1; then
        echo "    Homebrew detectado. Você pode instalar o Docker Desktop via:"
        echo "      brew install --cask docker"
        echo "    Ou ambiente leve via Colima:"
        echo "      brew install colima docker docker-compose && colima start"
    else
        echo "    Para instalar o Docker no macOS, baixe em: https://www.docker.com/products/docker-desktop/"
    fi
    echo ""
    read -p "Pressione Enter após instalar ou iniciar o Docker..."
fi

# 2. Verificar se o daemon do Docker está rodando
echo "[2/4] Verificando se o serviço do Docker está ativo..."
if ! docker info >/dev/null 2>&1; then
    echo "    Docker daemon não está respondendo. Tentando inicializar..."
    if [ -d "/Applications/Docker.app" ]; then
        open -a Docker
        echo "    Aguardando inicialização do Docker Desktop..."
        ATTEMPTS=0
        while [ $ATTEMPTS -lt 25 ]; do
            if docker info >/dev/null 2>&1; then
                break
            fi
            sleep 2
            ATTEMPTS=$((ATTEMPTS + 1))
        done
    elif command -v colima >/dev/null 2>&1; then
        echo "    Iniciando Colima..."
        colima start || true
    fi
fi

if ! docker info >/dev/null 2>&1; then
    echo "    [ERRO] Não foi possível conectar ao Docker daemon."
    echo "    Certifique-se de que o Docker Desktop ou Colima está aberto e em execução."
    exit 1
fi
echo "    Docker daemon ativo: $(docker --version)"

# 3. Configurar variáveis de ambiente (.env)
echo "[3/4] Configurando variáveis de ambiente (.env)..."
if [ ! -f ".env" ]; then
    echo "    Criando .env a partir de .env.example..."
    cp .env.example .env
    JWT_SECRET=$(openssl rand -hex 32 2>/dev/null || date +%s%N | sha256sum | head -c 64)
    sed -i '' "s/changeme-generate-a-strong-random-secret/${JWT_SECRET}/g" .env 2>/dev/null || \
    sed -i "s/changeme-generate-a-strong-random-secret/${JWT_SECRET}/g" .env
fi

mkdir -p data/sources

# 4. Ajustar permissões e criar atalho na Mesa (Desktop)
echo "[4/4] Criando atalho na Mesa (Desktop)..."
chmod +x scripts/*.sh setup_mac.sh iniciar_mac.command 2>/dev/null || true

DESKTOP_DIR="$HOME/Desktop"
SHORTCUT="$DESKTOP_DIR/Iniciar AXET-NEURALGRAPH-3D.command"

cat <<EOF > "$SHORTCUT"
#!/usr/bin/env bash
cd "$SCRIPT_DIR"
exec ./iniciar_mac.command
EOF
chmod +x "$SHORTCUT"

# 5. Build inicial e subida dos 5 containers
echo ""
echo ">>> Compilando e inicializando os 5 containers da solução..."
echo "    (Frontend Next.js 3D, Backend FastAPI, aXet Gateway, PostgreSQL, Qdrant)"
docker compose up -d --build

echo ""
echo "==============================================================================="
echo "  ✅ INSTALAÇÃO CONCLUÍDA COM SUCESSO NO MACOS!"
echo "==============================================================================="
echo ""
echo "Atalho criado na sua Mesa:"
echo "  $SHORTCUT"
echo ""
read -p "Deseja abrir a aplicação agora? (S/n): " RESP
RESP="${RESP:-s}"
if [[ "$RESP" =~ ^[Ss]$ ]]; then
    exec ./iniciar_mac.command
fi
