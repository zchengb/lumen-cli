#!/usr/bin/env bash
set -euo pipefail

# Usage: run-scan.sh <workspace-dir>
WORKSPACE_ROOT="${1:?Usage: run-scan.sh <workspace-dir>}"
LUMEN_LIB_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

PROMPT_FILE="${WORKSPACE_ROOT}/config/scan-prompt.md"
COMMON_CONFIG="${WORKSPACE_ROOT}/config/common.json"

model_from_config() {
  if [[ ! -f "${COMMON_CONFIG}" ]]; then
    return 0
  fi
  if command -v node >/dev/null 2>&1; then
    node -e "try{const c=require('${COMMON_CONFIG}');process.stdout.write((c.execution&&c.execution.model)||'')}catch(e){}" 2>/dev/null
  elif command -v python3 >/dev/null 2>&1; then
    python3 -c "import json,sys
try:
    with open('${COMMON_CONFIG}') as f:
        c = json.load(f)
    sys.stdout.write(c.get('execution', {}).get('model', ''))
except Exception:
    pass"
  fi
}

MODEL="${CURSOR_AGENT_MODEL:-$(model_from_config)}"
MODEL="${MODEL:-composer-2.5}"
SANDBOX_MODE="${CURSOR_AGENT_SANDBOX:-disabled}"
OUTPUT_FORMAT="${CURSOR_AGENT_OUTPUT_FORMAT:-stream-json}"
STREAM_PARTIAL="${CURSOR_AGENT_STREAM_PARTIAL:-1}"
LOCK_DIR="${WORKSPACE_ROOT}/state/run.lock"
RUN_ID="$(date -u '+%Y%m%d-%H%M%S')"
LOG_FILE="${WORKSPACE_ROOT}/logs/run-${RUN_ID}.log"

cd "${WORKSPACE_ROOT}"

load_env_file() {
  local file="$1"
  if [[ -f "${file}" ]]; then
    set -a
    # shellcheck disable=SC1090
    source "${file}"
    set +a
  fi
}

fail() {
  printf 'Error: %s\n' "$1" >&2
  exit 1
}

is_pid_alive() {
  local pid="$1"
  [[ -n "${pid}" ]] && kill -0 "${pid}" 2>/dev/null
}

clear_stale_lock() {
  if [[ ! -d "${LOCK_DIR}" ]]; then
    return 0
  fi

  local old_pid=""
  if [[ -f "${LOCK_DIR}/pid" ]]; then
    old_pid="$(tr -d '[:space:]' < "${LOCK_DIR}/pid")"
  fi

  if is_pid_alive "${old_pid}"; then
    local started_at="unknown"
    if [[ -f "${LOCK_DIR}/started_at" ]]; then
      started_at="$(tr -d '[:space:]' < "${LOCK_DIR}/started_at")"
    fi
    printf 'Another Lumen scan is already running.\n' >&2
    printf '  PID: %s\n' "${old_pid}" >&2
    printf '  Started: %s\n' "${started_at}" >&2
    printf '  Lock: %s\n' "${LOCK_DIR}" >&2
    printf 'If this is stale, stop the process or remove the lock after confirming no scan is active.\n' >&2
    exit 2
  fi

  printf 'Removing stale run lock at %s\n' "${LOCK_DIR}" >&2
  rm -rf "${LOCK_DIR}"
}

command -v agent >/dev/null 2>&1 || fail "Cursor CLI 'agent' was not found in PATH. Install it from https://cursor.com/cli before running a scan."
[[ -f "${PROMPT_FILE}" ]] || fail "Prompt file not found: ${PROMPT_FILE}. Run 'lumen init' in this workspace first."
mkdir -p "${WORKSPACE_ROOT}/state" "${WORKSPACE_ROOT}/logs"

clear_stale_lock
mkdir "${LOCK_DIR}"
trap 'rmdir "${LOCK_DIR}" 2>/dev/null || true' EXIT
printf '%s\n' "$$" > "${LOCK_DIR}/pid"
date -u '+%Y-%m-%dT%H:%M:%SZ' > "${LOCK_DIR}/started_at"

load_env_file "${WORKSPACE_ROOT}/.env.common"
load_env_file "${WORKSPACE_ROOT}/.env.local"

printf 'Lumen workspace: %s\n' "${WORKSPACE_ROOT}"
printf 'Prompt file: %s\n' "${PROMPT_FILE}"
printf 'Cursor model: %s\n' "${MODEL}"
printf 'Sandbox mode: %s\n' "${SANDBOX_MODE}"
printf 'Output format: %s\n' "${OUTPUT_FORMAT}"
printf 'Run log: %s\n' "${LOG_FILE}"

if [[ -z "${FEISHU_WEBHOOK_URL:-}" ]]; then
  printf 'Notice: FEISHU_WEBHOOK_URL is not set. Feishu sending should be skipped or reported as unavailable by the agent.\n'
fi

if ! command -v gh >/dev/null 2>&1; then
  printf 'Notice: GitHub CLI (gh) is not installed. Scanning can continue, but automated PR creation will be skipped.\n'
elif ! gh auth status >/dev/null 2>&1; then
  printf 'Notice: GitHub CLI is installed but not authenticated. Scanning can continue, but automated PR creation will be skipped.\n'
fi

printf '\nStarting Lumen scan agent at %s UTC...\n' "$(date -u '+%Y-%m-%d %H:%M:%S')"
printf 'A full scan often takes 15-45 minutes across all repositories.\n'
printf 'The agent may stay quiet for several minutes before the first visible output.\n'
printf 'Watch live progress in another terminal:\n'
printf '  lumen watch --workspace "%s"\n\n' "${WORKSPACE_ROOT}"

AGENT_ARGS=(
  --workspace "${WORKSPACE_ROOT}"
  --sandbox "${SANDBOX_MODE}"
  --trust
  -p
  -f
  --output-format "${OUTPUT_FORMAT}"
  --model "${MODEL}"
)

if [[ "${OUTPUT_FORMAT}" == "stream-json" && "${STREAM_PARTIAL}" == "1" ]]; then
  AGENT_ARGS+=(--stream-partial-output)
fi

set +e
agent "${AGENT_ARGS[@]}" "$(cat "${PROMPT_FILE}")" 2>&1 | tee "${LOG_FILE}"
AGENT_EXIT=${PIPESTATUS[0]}
set -e

if [[ "${AGENT_EXIT}" -ne 0 ]]; then
  printf '\nLumen scan agent exited with status %s. See log: %s\n' "${AGENT_EXIT}" "${LOG_FILE}" >&2
  exit "${AGENT_EXIT}"
fi

printf '\nLumen scan agent finished at %s UTC.\n' "$(date -u '+%Y-%m-%d %H:%M:%S')"

DASHBOARD_SCRIPT="${LUMEN_LIB_DIR}/render-dashboard.sh"
if [[ -f "${DASHBOARD_SCRIPT}" ]]; then
  if LUMEN_WORKSPACE="${WORKSPACE_ROOT}" bash "${DASHBOARD_SCRIPT}" "${WORKSPACE_ROOT}"; then
    printf 'Dashboard data refreshed: %s/dashboard-data.js\n' "${WORKSPACE_ROOT}"
  else
    printf 'Warning: dashboard-data.js was not refreshed. Open dashboard.html after fixing the renderer.\n' >&2
  fi
fi
