#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_ROOT="${1:-${LUMEN_WORKSPACE:-$(pwd)}}"

if command -v node >/dev/null 2>&1; then
  exec node "${SCRIPT_DIR}/render-dashboard.js" "${WORKSPACE_ROOT}"
fi

if command -v python3 >/dev/null 2>&1 && [[ -f "${SCRIPT_DIR}/render-dashboard.py" ]]; then
  exec python3 "${SCRIPT_DIR}/render-dashboard.py" "${WORKSPACE_ROOT}"
fi

printf 'Error: Node.js or Python 3 is required to regenerate dashboard-data.js.\n' >&2
printf 'Install Node.js, or run a Lumen scan which refreshes dashboard-data.js automatically.\n' >&2
exit 1
