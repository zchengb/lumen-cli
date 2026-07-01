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

project_name_from_config() {
  if [[ ! -f "${COMMON_CONFIG}" ]]; then
    return 0
  fi
  if command -v node >/dev/null 2>&1; then
    node -e "try{const c=require('${COMMON_CONFIG}');process.stdout.write((c.project&&c.project.display_name)||'')}catch(e){}" 2>/dev/null
  elif command -v python3 >/dev/null 2>&1; then
    python3 -c "import json,sys
try:
    with open('${COMMON_CONFIG}') as f:
        c = json.load(f)
    sys.stdout.write(c.get('project', {}).get('display_name', ''))
except Exception:
    pass"
  fi
}

notify_system() {
  local notify_script="${LUMEN_LIB_DIR}/notify.sh"
  if [[ -f "${notify_script}" ]]; then
    bash "${notify_script}" "$1" "$2" >/dev/null 2>&1 || true
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
DRY_RUN="${LUMEN_DRY_RUN:-0}"
PROJECT_NAME="$(project_name_from_config)"
PROJECT_NAME="${PROJECT_NAME:-$(basename "${WORKSPACE_ROOT}")}"
SCAN_LABEL="Scan"
if [[ "${DRY_RUN}" == "1" || "${DRY_RUN}" == "true" || "${DRY_RUN}" == "yes" ]]; then
  SCAN_LABEL="Dry-run scan"
fi

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

refresh_dashboard() {
  local dashboard_script="${LUMEN_LIB_DIR}/render-dashboard.sh"
  if [[ -f "${dashboard_script}" ]]; then
    if LUMEN_WORKSPACE="${WORKSPACE_ROOT}" bash "${dashboard_script}" "${WORKSPACE_ROOT}"; then
      printf 'Dashboard data refreshed: %s/dashboard-data.js\n' "${WORKSPACE_ROOT}"
    else
      printf 'Warning: dashboard-data.js was not refreshed. Open dashboard.html after fixing the renderer.\n' >&2
    fi
  fi
}

run_dry_scan() {
  command -v node >/dev/null 2>&1 || fail "Node.js is required for dry-run mode."
  [[ -f "${WORKSPACE_ROOT}/config/common.json" ]] || fail "Workspace config not found. Run 'lumen init' first."

  printf 'Lumen workspace: %s\n' "${WORKSPACE_ROOT}"
  printf 'Mode: DRY-RUN (Cursor agent will not run)\n'
  printf 'Run log: %s\n' "${LOG_FILE}"

  local dry_run_script="${LUMEN_LIB_DIR}/dry-run-scan.js"
  [[ -f "${dry_run_script}" ]] || fail "Dry-run script not found: ${dry_run_script}"

  printf '\nGenerating mock scan result at %s UTC...\n' "$(date -u '+%Y-%m-%d %H:%M:%S')"
  {
    printf '[dry-run] started_at=%s\n' "$(date -u '+%Y-%m-%dT%H:%M:%SZ')"
    printf '[dry-run] generating mock scan-result.json\n'
    node "${dry_run_script}" "${WORKSPACE_ROOT}" "${RUN_ID}"
    printf '[dry-run] mock scan-result.json written\n'
  } 2>&1 | tee "${LOG_FILE}"

  local result_file="${WORKSPACE_ROOT}/results/scan-result.json"
  [[ -f "${result_file}" ]] || fail "Dry-run did not produce ${result_file}"

  local report_script="${LUMEN_LIB_DIR}/render-report-and-notify.py"
  if [[ -f "${report_script}" ]]; then
    printf '\n[dry-run] generating HTML report\n'
    if command -v python3 >/dev/null 2>&1; then
      LUMEN_DRY_RUN=1 LUMEN_WORKSPACE="${WORKSPACE_ROOT}" python3 "${report_script}" "${result_file}" | tee -a "${LOG_FILE}" || \
        printf 'Warning: report generation step failed. See log for details.\n' >&2
    else
      printf 'Warning: python3 not found; skipped HTML/PDF post-processing.\n' >&2
    fi
  fi

  refresh_dashboard

  printf '\nDry-run finished at %s UTC.\n' "$(date -u '+%Y-%m-%d %H:%M:%S')"
  printf 'No Cursor agent, git worktrees, PRs, or Feishu messages were sent.\n'
  printf 'Open %s/dashboard.html to review the mock result.\n' "${WORKSPACE_ROOT}"
}

run_real_scan() {
  command -v agent >/dev/null 2>&1 || fail "Cursor CLI 'agent' was not found in PATH. Install it from https://cursor.com/cli before running a scan."
  [[ -f "${PROMPT_FILE}" ]] || fail "Prompt file not found: ${PROMPT_FILE}. Run 'lumen init' in this workspace first."

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
  printf '  lumen watch --project <slug>\n\n'

  local agent_args=(
    --workspace "${WORKSPACE_ROOT}"
    --sandbox "${SANDBOX_MODE}"
    --trust
    -p
    -f
    --output-format "${OUTPUT_FORMAT}"
    --model "${MODEL}"
  )

  if [[ "${OUTPUT_FORMAT}" == "stream-json" && "${STREAM_PARTIAL}" == "1" ]]; then
    agent_args+=(--stream-partial-output)
  fi

  set +e
  agent "${agent_args[@]}" "$(cat "${PROMPT_FILE}")" 2>&1 | tee "${LOG_FILE}"
  local agent_exit=${PIPESTATUS[0]}
  set -e

  if [[ "${agent_exit}" -ne 0 ]]; then
    printf '\nLumen scan agent exited with status %s. See log: %s\n' "${agent_exit}" "${LOG_FILE}" >&2
    exit "${agent_exit}"
  fi

  printf '\nLumen scan agent finished at %s UTC.\n' "$(date -u '+%Y-%m-%d %H:%M:%S')"
  refresh_dashboard
}

mkdir -p "${WORKSPACE_ROOT}/state" "${WORKSPACE_ROOT}/logs" "${WORKSPACE_ROOT}/results" "${WORKSPACE_ROOT}/reports"

clear_stale_lock
mkdir "${LOCK_DIR}"

on_scan_exit() {
  local exit_code=$?
  rmdir "${LOCK_DIR}" 2>/dev/null || true
  if [[ "${exit_code}" -eq 0 ]]; then
    notify_system "Lumen" "${SCAN_LABEL} finished: ${PROJECT_NAME}"
  else
    notify_system "Lumen" "${SCAN_LABEL} failed: ${PROJECT_NAME} (exit ${exit_code})"
  fi
  return "${exit_code}"
}
trap on_scan_exit EXIT

printf '%s\n' "$$" > "${LOCK_DIR}/pid"
date -u '+%Y-%m-%dT%H:%M:%SZ' > "${LOCK_DIR}/started_at"

load_env_file "${LUMEN_HOME:-$HOME/.lumen}/env"
load_env_file "${WORKSPACE_ROOT}/.env.common"
load_env_file "${WORKSPACE_ROOT}/.env.local"

notify_system "Lumen" "${SCAN_LABEL} started: ${PROJECT_NAME}"

if [[ "${DRY_RUN}" == "1" || "${DRY_RUN}" == "true" || "${DRY_RUN}" == "yes" ]]; then
  run_dry_scan
else
  run_real_scan
fi
