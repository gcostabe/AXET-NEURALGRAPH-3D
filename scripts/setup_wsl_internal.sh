#!/usr/bin/env bash
# ==============================================================================
# scripts/setup_wsl_internal.sh
# Provisionamento automático e silencioso dentro do WSL2 (Ubuntu)
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "===================================================================="
echo " 🧠 [AXET-NEURALGRAPH-3D] Provisionando ambiente interno WSL2..."
echo " Diretório do projeto: $PROJECT_DIR"
echo "===================================================================="

# 1. Atualizar repositórios de pacotes do Ubuntu
echo ">>> [1/5] Atualizando repositórios APT do Ubuntu..."
apt-get update -y || apt-get update --fix-missing -y || true

# 2. Instalar utilitários essenciais
echo ">>> [2/5] Instalando utilitários essenciais (curl, git, certificates)..."
apt-get install -y ca-certificates curl gnupg lsb-release git build-essential openssl

# 3. Garantir instalação do Docker Engine e Compose Plugin
echo ">>> [3/5] Verificando Docker e Docker Compose no WSL2..."
if ! [ -x /usr/bin/docker ] || ! docker --version >/dev/null 2>&1 || [[ "$(which docker 2>/dev/null)" == /mnt/* ]]; then
    echo "    Docker nativo não detectado no Linux. Instalando Docker Engine oficial..."
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg --yes
    chmod a+r /etc/apt/keyrings/docker.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
    apt-get update -y || true
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
fi

# Inicializar o serviço do Docker se estiver parado
service docker start || systemctl start docker || true

# Conceder permissão ao usuário padrão do WSL
DEFAULT_USER=$(id -nu 1000 2>/dev/null || echo "${SUDO_USER:-}")
if [ -n "$DEFAULT_USER" ]; then
    usermod -aG docker "$DEFAULT_USER" || true
fi

# 4. Configurar .env a partir de .env.example
echo ">>> [4/5] Configurando variáveis de ambiente (.env)..."
cd "$PROJECT_DIR"

if [ ! -f ".env" ]; then
    echo "    Criando .env com segredo JWT criptográfico gerado..."
    cp .env.example .env
    JWT_KEY=$(openssl rand -hex 32 2>/dev/null || date +%s%N | sha256sum | head -c 64)
    sed -i "s/changeme-generate-a-strong-random-secret/${JWT_KEY}/g" .env
fi

mkdir -p data/sources

# 5. Build e subida inicial dos 5 containers
echo ">>> [5/5] Compilando e inicializando os 5 serviços via Docker Compose..."
echo "    (Frontend Next.js, Backend FastAPI, aXet Gateway, PostgreSQL, Qdrant)"
docker compose up -d --build

chmod +x scripts/*.sh setup_mac.sh iniciar_mac.command 2>/dev/null || true

echo "===================================================================="
echo " ✅ Ambiente WSL2 configurado e containers em execução!"
echo "===================================================================="
