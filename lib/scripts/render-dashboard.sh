#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_ROOT="${1:-${LUMEN_WORKSPACE:-$(pwd)}}"
LUMEN_HOME="${LUMEN_HOME:-$HOME/.lumen}"
DASHBOARD_TEMPLATE="${LUMEN_HOME}/lib/templates/dashboard.html"
WORKSPACE_DASHBOARD="${WORKSPACE_ROOT}/dashboard.html"

if ! command -v python3 >/dev/null 2>&1; then
  printf 'Error: Python 3 is required to regenerate dashboard-data.js.\n' >&2
  printf 'Install Python 3, then run a Lumen scan which refreshes dashboard-data.js automatically.\n' >&2
  exit 1
fi

sync_dashboard_html() {
  if [[ ! -f "${DASHBOARD_TEMPLATE}" ]]; then
    return 0
  fi

  if [[ ! -f "${WORKSPACE_DASHBOARD}" ]]; then
    cp "${DASHBOARD_TEMPLATE}" "${WORKSPACE_DASHBOARD}"
    printf 'Dashboard UI installed: %s\n' "${WORKSPACE_DASHBOARD}"
    return 0
  fi

  if ! cmp -s "${DASHBOARD_TEMPLATE}" "${WORKSPACE_DASHBOARD}"; then
    cp "${DASHBOARD_TEMPLATE}" "${WORKSPACE_DASHBOARD}"
    printf 'Dashboard UI refreshed: %s\n' "${WORKSPACE_DASHBOARD}"
  fi
}

sync_dashboard_html
exec python3 "${SCRIPT_DIR}/render-dashboard.py" "${WORKSPACE_ROOT}"
