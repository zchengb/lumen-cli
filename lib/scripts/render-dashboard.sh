#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_ROOT="${1:-${LUMEN_WORKSPACE:-$(pwd)}}"

if ! command -v python3 >/dev/null 2>&1; then
  printf 'Error: Python 3 is required to regenerate dashboard-data.js.\n' >&2
  printf 'Install Python 3, then run a Lumen scan which refreshes dashboard-data.js automatically.\n' >&2
  exit 1
fi

exec python3 "${SCRIPT_DIR}/render-dashboard.py" "${WORKSPACE_ROOT}"
