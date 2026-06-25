#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"

if [[ ! -d "$ROOT/nikola/node_modules" ]]; then
  echo "Installing dependencies (first run)..."
  npm run install:all --prefix "$ROOT"
fi

echo ""
echo "Starting full dev stack:"
echo "  - wallet-toolkit (build + watch)"
echo "  - Sass"
echo "  - Pug"
echo "  - json-server  → http://localhost:3000"
echo "  - live-server  → http://localhost:5500"
echo ""

npm run start --prefix "$ROOT/nikola"
