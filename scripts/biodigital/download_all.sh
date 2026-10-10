#!/bin/bash
# Script sederhana untuk download asset gambar BioDigital ke folder public/assets/biodigital
TARGET_DIR="public/assets/biodigital"
mkdir -p "$TARGET_DIR"

echo "Memulai download assets ke $TARGET_DIR..."
while IFS=$t read -r url filename; do
  if [ -n "$url" ]; then
    echo "Downloading: $filename"
    curl -s "$url" -o "$TARGET_DIR/$filename"
  fi
done < "$(dirname "$0")/urls.txt"

echo "Selesai! Semua assets tersimpan di $TARGET_DIR"
