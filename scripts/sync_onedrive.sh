#!/usr/bin/env bash
set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST_DIR="$PROJECT_ROOT/data/sources"
DEST_VIDEOS="$PROJECT_ROOT/data/sources/08. Videos Reef Market Place"

# 1. Pasta ativa atual de vídeos gerados no OneDrive
ONEDRIVE_VIDEOS="/Users/gcostabe/Library/CloudStorage/OneDrive-NTTDATAEMEAL/MAPFRE REEF VIDEOS/_Markdown"
if [ -d "$ONEDRIVE_VIDEOS" ]; then
  echo "🔄 Sincronizando vídeos Markdown do OneDrive:"
  echo "   $ONEDRIVE_VIDEOS"
  echo "   -> $DEST_VIDEOS"
  mkdir -p "$DEST_VIDEOS"
  rsync -av --update \
    --include="*/" \
    --include="*.md" \
    --exclude="*" \
    "$ONEDRIVE_VIDEOS/" "$DEST_VIDEOS/"
fi

# 2. Pasta anterior de Formações Mapfre se existir
ONEDRIVE_LEGACY="/Users/gcostabe/Library/CloudStorage/OneDrive-NTTDATAEMEAL/REEF Formación - 02. Formaciones Mapfre/_markdown"
if [ -d "$ONEDRIVE_LEGACY" ]; then
  echo "🔄 Sincronizando formações legado:"
  echo "   $ONEDRIVE_LEGACY"
  echo "   -> $DEST_DIR"
  rsync -av --update \
    --include="*/" \
    --include="*.md" \
    --exclude="*" \
    "$ONEDRIVE_LEGACY/" "$DEST_DIR/"
fi

echo "✅ Sincronização com OneDrive concluída com sucesso!"
