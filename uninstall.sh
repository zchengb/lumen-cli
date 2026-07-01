#!/usr/bin/env bash
set -euo pipefail

LUMEN_HOME="${LUMEN_HOME:-$HOME/.lumen}"
BIN_DIR="${LUMEN_BIN_DIR:-$HOME/.local/bin}"

echo "Removing ${BIN_DIR}/lumen..."
rm -f "${BIN_DIR}/lumen"

echo "Removing ${LUMEN_HOME}..."
rm -rf "${LUMEN_HOME}"

echo "Done. Any initialized scan workspaces (created via 'lumen init') were not touched."
