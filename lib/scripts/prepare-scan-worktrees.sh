#!/usr/bin/env bash
set -euo pipefail

LUMEN_LIB_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_ROOT="${1:?Usage: prepare-scan-worktrees.sh <workspace-dir> [refresh|remove]}"
MODE="${2:-refresh}"

if ! command -v python3 >/dev/null 2>&1; then
  printf 'Error: python3 is required.\n' >&2
  exit 1
fi

python3 "${LUMEN_LIB_DIR}/prepare_scan_worktrees.py" "${MODE}" "${WORKSPACE_ROOT}"
