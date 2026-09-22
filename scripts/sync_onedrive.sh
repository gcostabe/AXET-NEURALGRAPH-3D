#!/usr/bin/env bash
set -e

SOURCE_DIR="${1:-/Users/gcostabe/Library/CloudStorage/OneDrive-NTTDATAEMEAL/REEF Formación - 02. Formaciones Mapfre/_markdown}"
DEST_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/data/sources"

if [ ! -d "$SOURCE_DIR" ]; then
  echo "❌ Diretório de origem não encontrado: $SOURCE_DIR"
  exit 1
fi

echo "🔄 Sincronizando arquivos .md de:"
echo "   $SOURCE_DIR"
echo "   -> $DEST_DIR"

rsync -av --update \
  --include="*/" \
  --include="*.md" \
  --exclude="*" \
  "$SOURCE_DIR/" "$DEST_DIR/"

echo "✅ Sincronização concluída com sucesso!"
