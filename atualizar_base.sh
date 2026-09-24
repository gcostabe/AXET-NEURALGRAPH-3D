#!/usr/bin/env bash
# ==============================================================================
# atualizar_base.sh
# Restauração Segura e One-Click de Snapshots da Base de Conhecimento (Opção 1)
# ==============================================================================
set -e

DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

echo "==============================================================================="
echo "  🔄 NTT DATA — AXET-NEURALGRAPH-3D"
echo "  Atualização Segura de Base de Conhecimento Local (Opção 1 - Snapshots)"
echo "==============================================================================="
echo ""

# 1. Garantir que os containers estejam ativos
if ! docker compose ps | grep -q "backend"; then
    echo "[INFO] Inicializando containers locais via Docker Compose..."
    docker compose up -d
fi

# Aguardar backend responder
echo "Verificando se o backend local está pronto..."
ATTEMPTS=0
while [ $ATTEMPTS -lt 25 ]; do
    if curl -s -I http://localhost:8000/health >/dev/null 2>&1; then
        break
    fi
    sleep 1
    ATTEMPTS=$((ATTEMPTS + 1))
done

if ! curl -s -I http://localhost:8000/health >/dev/null 2>&1; then
    echo "[ERRO] Backend não está respondendo na porta 8000. Verifique os logs do Docker."
    exit 1
fi

# 2. Localizar o arquivo de snapshot
TARGET_FILE="$1"

if [ -z "$TARGET_FILE" ]; then
    # Procurar o pacote mais recente em data/snapshots/exports ou data/snapshots
    LATEST_QPACK=$(find data/snapshots/exports -name "*.qpack" 2>/dev/null | sort -r | head -n 1 || true)
    if [ -z "$LATEST_QPACK" ]; then
        LATEST_QPACK=$(find data/snapshots -maxdepth 2 -name "*.qpack" -o -name "*.snapshot" 2>/dev/null | grep -v "/qdrant/" | sort -r | head -n 1 || true)
    fi
    TARGET_FILE="$LATEST_QPACK"
fi

if [ -z "$TARGET_FILE" ] || [ ! -f "$TARGET_FILE" ]; then
    echo "[AVISO] Nenhum arquivo de snapshot (.qpack ou .snapshot) especificado ou encontrado."
    echo "Uso:"
    echo "  ./atualizar_base.sh caminho/do/pacote.qpack"
    echo ""
    echo "Ou coloque o arquivo .qpack gerado pelo Administrador dentro da pasta: data/snapshots/"
    exit 1
fi

echo "[INFO] Pacote detectado: $TARGET_FILE"
FILE_SIZE=$(du -h "$TARGET_FILE" | cut -f1)
echo "       Tamanho: $FILE_SIZE"

# 3. Autenticação para restauração local (usuário comum ou admin)
echo "[INFO] Autenticando com credencial local..."
# Obter token de acesso local
TOKEN=$(curl -s -X POST http://localhost:8000/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"gcostabe@emeal.nttdata.com","password":"admin123"}' \
    | grep -o '"access_token":"[^"]*' | cut -d'"' -f4 || true)

if [ -z "$TOKEN" ]; then
    # Tentar com conta comum caso admin não esteja disponível nesta máquina
    TOKEN=$(curl -s -X POST http://localhost:8000/auth/login \
        -H "Content-Type: application/json" \
        -d '{"email":"admin@example.com","password":"admin"}' \
        | grep -o '"access_token":"[^"]*' | cut -d'"' -f4 || true)
fi

# 4. Enviar para restauração atômica
echo "[INFO] Restaurando no motor vetorial Qdrant e grafo neural local..."
START_TIME=$(date +%s)

RESPONSE=$(curl -s -X POST http://localhost:8000/snapshots/import \
    -H "Authorization: Bearer $TOKEN" \
    -F "file=@$TARGET_FILE")

END_TIME=$(date +%s)
ELAPSED=$((END_TIME - START_TIME))

echo ""
if echo "$RESPONSE" | grep -q '"success":true'; then
    POINTS=$(echo "$RESPONSE" | grep -o '"points_count":[0-9]*' | cut -d':' -f2)
    DOCS=$(echo "$RESPONSE" | grep -o '"documents_restored":[0-9]*' | cut -d':' -f2)
    EDGES=$(echo "$RESPONSE" | grep -o '"edges_restored":[0-9]*' | cut -d':' -f2)
    SHA=$(echo "$RESPONSE" | grep -o '"sha256":"[^"]*' | cut -d'"' -f4)

    echo "==============================================================================="
    echo "  ✅ BASE DE CONHECIMENTO LOCAL ATUALIZADA COM SUCESSO!"
    echo "==============================================================================="
    echo "  Tempo de Restauração: ${ELAPSED}s"
    echo "  Pontos Vetoriais:     $POINTS"
    echo "  Documentos no Grafo:  $DOCS"
    echo "  Sinapses Relacionais: $EDGES"
    echo "  SHA-256 Confirmado:   $SHA"
    echo "  Garantia de Isolamento: 100% localhost (Zero Vazamento Externo)"
    echo "==============================================================================="
    echo ""
    echo "Abra o navegador em http://localhost:3001/graph para visualizar o Grafo 3D atualizado."
else
    echo "==============================================================================="
    echo "  ⚠️ FALHA NA RESTAURAÇÃO DA BASE"
    echo "==============================================================================="
    echo "  Detalhe: $RESPONSE"
    echo "==============================================================================="
    exit 1
fi
