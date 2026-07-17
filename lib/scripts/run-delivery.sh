#!/usr/bin/env bash
set -euo pipefail

LUMEN_LIB_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [[ -f "${LUMEN_LIB_DIR}/ensure-path.sh" ]]; then
  # shellcheck source=/dev/null
  source "${LUMEN_LIB_DIR}/ensure-path.sh"
  ensure_lumen_path ""
fi

ORCHESTRATOR_PY="${LUMEN_DELIVERY_ORCHESTRATOR_PY:-${LUMEN_LIB_DIR}/delivery_orchestrator.py}"
[[ -f "${ORCHESTRATOR_PY}" ]] || { printf 'Error: delivery orchestrator not found: %s\n' "${ORCHESTRATOR_PY}" >&2; exit 1; }

exec python3 "${ORCHESTRATOR_PY}" "$@"
