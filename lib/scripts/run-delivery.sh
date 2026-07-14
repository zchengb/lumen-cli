#!/usr/bin/env bash
set -euo pipefail

LUMEN_LIB_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LUMEN_HOME="${LUMEN_HOME:-$HOME/.lumen}"

DOCS_DIR=""
STORY_REF=""
DRY_RUN="${LUMEN_DRY_RUN:-0}"
WORKSPACE_DIR_NAME="lumen"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --story)
      STORY_REF="${2:-}"
      shift 2
      ;;
    --dry-run)
      DRY_RUN="1"
      shift
      ;;
    --*)
      printf 'Error: unknown option: %s\n' "$1" >&2
      exit 1
      ;;
    *)
      if [[ -z "${DOCS_DIR}" ]]; then
        DOCS_DIR="$1"
      else
        STORY_REF="$1"
      fi
      shift
      ;;
  esac
done

[[ -n "${DOCS_DIR}" ]] || { printf 'Usage: run-delivery.sh <docs-dir> [--story <slug>] [--dry-run]\n' >&2; exit 1; }

if [[ -f "${LUMEN_LIB_DIR}/ensure-path.sh" ]]; then
  # shellcheck source=/dev/null
  source "${LUMEN_LIB_DIR}/ensure-path.sh"
  ensure_lumen_path ""
fi

DOCS_DIR="$(cd "${DOCS_DIR}" && pwd)"

load_env_file() {
  local file="$1"
  if [[ -f "${file}" ]]; then
    set -a
    # shellcheck disable=SC1090
    source "${file}"
    set +a
  fi
}

workspace_root_from_docs() {
  local resolve_py="${LUMEN_LIB_DIR}/resolve_delivery_workspace.py"
  if [[ -f "${resolve_py}" ]]; then
    python3 "${resolve_py}" "${DOCS_DIR}"
    return
  fi
  python3 -c "from pathlib import Path
import json
docs = Path('${DOCS_DIR}').resolve()
config = docs / 'lumen' / 'config' / 'workspace.json'
if not config.is_file():
    config = docs / '.lumen' / 'config' / 'workspace.json'
if config.is_file():
    data = json.loads(config.read_text())
    root = str(data.get('workspace_root', '')).strip()
    if root in {'.', './'}:
        print(str(docs), end='')
        raise SystemExit(0)
    if root:
        print(root, end='')
        raise SystemExit(0)
print(str(docs), end='')"
}

WORKSPACE_ROOT="$(workspace_root_from_docs)"
if [[ ! -d "${WORKSPACE_ROOT}/${WORKSPACE_DIR_NAME}" && -d "${WORKSPACE_ROOT}/.lumen" ]]; then
  WORKSPACE_DIR_NAME=".lumen"
fi
WORKSPACE_DIR="${WORKSPACE_ROOT}/${WORKSPACE_DIR_NAME}"
DELIVERY_CONFIG="${WORKSPACE_DIR}/config/delivery.json"
RUN_ID="$(date -u '+%Y%m%d-%H%M%S')"
LOG_DIR="${WORKSPACE_DIR}/logs/delivery"
LOG_FILE="${LOG_DIR}/run-${RUN_ID}.log"
RESULT_FILE="${WORKSPACE_DIR}/results/delivery-result.json"
STARTED_FILE="${WORKSPACE_DIR}/results/delivery-started.json"
PROGRESS_PY="${LUMEN_LIB_DIR}/delivery_progress.py"
ARCHIVE_PY="${LUMEN_LIB_DIR}/archive_delivery_run.py"

mkdir -p "${LOG_DIR}" "${WORKSPACE_DIR}/results" "${WORKSPACE_DIR}/config" "${WORKSPACE_DIR}/worktrees"

# Feature worktrees are Story-isolated, but one docs workspace has one delivery
# control plane. Serializing agent runs prevents shared result/progress state,
# JIRA transitions, and expensive verification resources from colliding.
LOCK_DIR="${WORKSPACE_DIR}/locks/delivery-run"
mkdir -p "${WORKSPACE_DIR}/locks"
if ! mkdir "${LOCK_DIR}" 2>/dev/null; then
  printf 'Error: another Lumen delivery run is already active for this docs workspace. Check `lumen delivery status %s`.\n' "${DOCS_DIR}" >&2
  exit 1
fi
trap 'rmdir "${LOCK_DIR}" 2>/dev/null || true' EXIT

# Scan and delivery share the workspace-local environment. Root-level files are
# read only as a compatibility fallback for docs projects created before init
# became the unified initializer.
load_env_file "${DOCS_DIR}/${WORKSPACE_DIR_NAME}/.env.common"
load_env_file "${DOCS_DIR}/${WORKSPACE_DIR_NAME}/.env.local"
load_env_file "${DOCS_DIR}/.env.common"
load_env_file "${DOCS_DIR}/.env.local"

fail() {
  local message="$1"
  if [[ -f "${PROGRESS_PY}" ]]; then
    python3 "${PROGRESS_PY}" phase --workspace-root "${WORKSPACE_ROOT}" "${CURRENT_PHASE:-notify}" failed --detail "${message}" || true
    python3 "${PROGRESS_PY}" finish --workspace-root "${WORKSPACE_ROOT}" failed --detail "${message}" || true
    python3 "${PROGRESS_PY}" report --workspace-root "${WORKSPACE_ROOT}" || true
  fi
  local failure_py="${LUMEN_LIB_DIR}/write_delivery_failure.py"
  if [[ -f "${failure_py}" ]]; then
    python3 "${failure_py}" "${DOCS_DIR}" --story "${STORY_REF}" --result "${RESULT_FILE}" \
      --run-id "${RUN_ID}" --phase "${CURRENT_PHASE:-delivery}" --message "${message}" || true
    local render_py="${LUMEN_LIB_DIR}/render-delivery-and-notify.py"
    if [[ -f "${render_py}" ]]; then
      python3 "${render_py}" "${RESULT_FILE}" --event delivery.failed | tee -a "${LOG_FILE}" || true
    fi
  fi
  sync_delivery_docs_metadata
  archive_delivery || true
  printf 'Error: %s\n' "${message}" >&2
  exit 1
}

archive_delivery() {
  [[ -f "${ARCHIVE_PY}" ]] || return 0
  python3 "${ARCHIVE_PY}" \
    --workspace-root "${WORKSPACE_ROOT}" \
    --result "${RESULT_FILE}" \
    --progress "${WORKSPACE_DIR}/results/delivery-progress.json" \
    --log-file "${LOG_FILE}" >/dev/null
}

cleanup_completed_worktrees() {
  local cleanup_py="${LUMEN_LIB_DIR}/cleanup_delivery_worktrees.py"
  [[ -f "${cleanup_py}" ]] || return 0
  python3 "${cleanup_py}" "${DOCS_DIR}" --story "${STORY_REF}" | tee -a "${LOG_FILE}" || \
    printf 'Warning: completed delivery worktree cleanup failed. See log: %s\n' "${LOG_FILE}" >&2
}

sync_delivery_docs_metadata() {
  local sync_py="${LUMEN_LIB_DIR}/sync_delivery_docs.py"
  [[ -f "${sync_py}" ]] || return 0
  set +e
  python3 "${sync_py}" "${DOCS_DIR}" --story "${STORY_REF}" | tee -a "${LOG_FILE}"
  local sync_exit=${PIPESTATUS[0]}
  set -e
  if [[ "${sync_exit}" -ne 0 ]]; then
    progress_message "Warning: delivery metadata commit/push failed; see ${LOG_FILE}"
    printf 'Warning: delivery metadata commit/push failed. See log: %s\n' "${LOG_FILE}" >&2
  else
    progress_message "Delivery metadata committed and pushed to docs repository"
  fi
}

progress_phase() {
  local phase_id="$1"
  local status="$2"
  local detail="${3:-}"
  local step="${4:-}"
  CURRENT_PHASE="${phase_id}"
  [[ -f "${PROGRESS_PY}" ]] || return 0
  python3 "${PROGRESS_PY}" phase --workspace-root "${WORKSPACE_ROOT}" "${phase_id}" "${status}" \
    --detail "${detail}" --step "${step}" || true
}

progress_message() {
  local text="$1"
  [[ -f "${PROGRESS_PY}" ]] || return 0
  python3 "${PROGRESS_PY}" message --workspace-root "${WORKSPACE_ROOT}" "${text}" || true
}

init_delivery_progress() {
  [[ -f "${PROGRESS_PY}" ]] || return 0
  python3 "${PROGRESS_PY}" init \
    --workspace-root "${WORKSPACE_ROOT}" \
    --docs-dir "${DOCS_DIR}" \
    --story "${STORY_REF}" \
    --run-id "${RUN_ID}" \
    --log-file "${LOG_FILE}" || true
  python3 "${PROGRESS_PY}" report --workspace-root "${WORKSPACE_ROOT}" || true
}

finish_delivery_progress() {
  local status="$1"
  local detail="${2:-}"
  [[ -f "${PROGRESS_PY}" ]] || return 0
  python3 "${PROGRESS_PY}" finish --workspace-root "${WORKSPACE_ROOT}" "${status}" --detail "${detail}" || true
  python3 "${PROGRESS_PY}" report --workspace-root "${WORKSPACE_ROOT}" || true
}

model_from_config() {
  if [[ ! -f "${DELIVERY_CONFIG}" ]]; then
    return 0
  fi
  if command -v python3 >/dev/null 2>&1; then
    python3 -c "import json
try:
    with open('${DELIVERY_CONFIG}') as f:
        c = json.load(f)
    print(c.get('execution', {}).get('model', '') or '', end='')
except Exception:
    pass" 2>/dev/null
  fi
}

MODEL="${CURSOR_AGENT_MODEL:-$(model_from_config)}"
MODEL="${MODEL:-composer-2.5}"
SANDBOX_MODE="${CURSOR_AGENT_SANDBOX:-disabled}"
OUTPUT_FORMAT="${CURSOR_AGENT_OUTPUT_FORMAT:-stream-json}"
STREAM_PARTIAL="${CURSOR_AGENT_STREAM_PARTIAL:-1}"

prepare_delivery() {
  local prepare_py="${LUMEN_LIB_DIR}/prepare_delivery_run.py"
  [[ -f "${prepare_py}" ]] || fail "prepare_delivery_run.py not found"
  local dry_flag=""
  [[ "${DRY_RUN}" == "1" ]] && dry_flag="--dry-run"
  python3 "${prepare_py}" "${DOCS_DIR}" --story "${STORY_REF}" --json ${dry_flag}
}

sync_delivery_references() {
  local sync_py="${LUMEN_LIB_DIR}/sync_delivery_workspace.py"
  [[ -f "${sync_py}" ]] || return 0
  python3 "${sync_py}" "${DOCS_DIR}" --story "${STORY_REF}"
}

run_sync_delivery() {
  set +e
  sync_delivery_references 2>&1 | tee -a "${LOG_FILE}"
  local sync_exit=${PIPESTATUS[0]}
  set -e
  if [[ "${sync_exit}" -ne 0 ]]; then
    fail "Delivery reference sync failed. See log: ${LOG_FILE}"
  fi
}

enrich_delivery_progress() {
  local prepare_json="$1"
  [[ -f "${PROGRESS_PY}" ]] || return 0
  python3 "${PROGRESS_PY}" enrich --workspace-root "${WORKSPACE_ROOT}" --prepare-json "${prepare_json}" || true
}

run_prepare_delivery() {
  local prepare_json
  set +e
  prepare_json="$(prepare_delivery 2>&1 | tee -a "${LOG_FILE}")"
  local prep_exit=${PIPESTATUS[0]}
  set -e
  if [[ "${prep_exit}" -ne 0 ]]; then
    progress_phase preflight failed "Story gates or worktree preparation failed"
    fail "${prepare_json##*$'\n'}"
  fi
  enrich_delivery_progress "${prepare_json}"
}

send_started_notification() {
  local render_py="${LUMEN_LIB_DIR}/render-delivery-and-notify.py"
  local starter_py="${LUMEN_LIB_DIR}/write_delivery_started.py"
  if [[ ! -f "${render_py}" || ! -f "${starter_py}" ]]; then
    return 0
  fi
  local starter_result="${STARTED_FILE}"
  python3 "${starter_py}" "${DOCS_DIR}" "${starter_result}" --story "${STORY_REF}" || return 0
  python3 "${render_py}" "${starter_result}" --event delivery.started | tee -a "${LOG_FILE}" || true
}

load_delivery_prompt() {
  local compose_py="${LUMEN_LIB_DIR}/compose_delivery_prompt.py"
  [[ -f "${compose_py}" ]] || fail "compose_delivery_prompt.py not found"
  python3 "${compose_py}" "${DOCS_DIR}" "${STORY_REF}" "$@"
}

remediation_max_attempts() {
  [[ -f "${DELIVERY_CONFIG}" ]] || { printf '2'; return; }
  python3 - "${DELIVERY_CONFIG}" <<'PY'
import json
import sys

try:
    with open(sys.argv[1], encoding="utf-8") as handle:
        config = json.load(handle)
    remediation = config.get("verification", {}).get("remediation", {})
    if not isinstance(remediation, dict) or not remediation.get("enabled", True):
        print(0, end="")
    else:
        print(max(0, int(remediation.get("max_attempts", 2))), end="")
except Exception:
    print(2, end="")
PY
}

run_delivery_agent() {
  local prompt="$1"
  local stage_label="$2"
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

  printf 'Starting %s at %s UTC...\n' "${stage_label}" "$(date -u '+%Y-%m-%d %H:%M:%S')"
  set +e
  if [[ "${OUTPUT_FORMAT}" == "stream-json" ]] && command -v python3 >/dev/null 2>&1 && [[ -f "${LUMEN_LIB_DIR}/format_scan_log.py" ]]; then
    agent "${agent_args[@]}" "${prompt}" 2>&1 | tee -a "${LOG_FILE}" | python3 "${LUMEN_LIB_DIR}/format_scan_log.py"
  else
    agent "${agent_args[@]}" "${prompt}" 2>&1 | tee -a "${LOG_FILE}"
  fi
  local agent_exit=${PIPESTATUS[0]}
  set -e
  return "${agent_exit}"
}

run_verification_profile() {
  local verify_py="${LUMEN_LIB_DIR}/run_delivery_verification.py"
  [[ -f "${verify_py}" ]] || return 0
  set +e
  python3 "${verify_py}" "${DOCS_DIR}" --story "${STORY_REF}" --result "${RESULT_FILE}" --workspace-root "${WORKSPACE_ROOT}" | tee -a "${LOG_FILE}"
  local verify_exit=${PIPESTATUS[0]}
  set -e
  return "${verify_exit}"
}

run_remediation_loop() {
  local max_attempts
  max_attempts="$(remediation_max_attempts)"
  [[ "${max_attempts}" =~ ^[0-9]+$ ]] || max_attempts=2
  [[ "${max_attempts}" -gt 0 ]] || return 1

  local remediation_py="${LUMEN_LIB_DIR}/prepare_delivery_remediation.py"
  [[ -f "${remediation_py}" ]] || return 1
  local attempt remediation_prompt
  for ((attempt = 1; attempt <= max_attempts; attempt++)); do
    progress_message "Verification failed; starting bounded remediation attempt ${attempt}/${max_attempts}"
    progress_phase agent in_progress "Remediation attempt ${attempt}/${max_attempts}: diagnose and minimally fix verification failures"
    python3 "${remediation_py}" --result "${RESULT_FILE}" --attempt "${attempt}" --max-attempts "${max_attempts}" || return 1
    remediation_prompt="$(load_delivery_prompt --remediation)" || return 1
    if ! run_delivery_agent "${remediation_prompt}" "Lumen delivery remediation ${attempt}/${max_attempts}"; then
      progress_phase agent failed "Remediation agent exited during attempt ${attempt}/${max_attempts}"
      return 1
    fi
    [[ -f "${RESULT_FILE}" ]] || return 1
    python3 "${remediation_py}" --result "${RESULT_FILE}" --restore || return 1
    progress_phase agent completed "Remediation attempt ${attempt}/${max_attempts} finished; result updated"

    progress_phase verification in_progress "Verification after remediation attempt ${attempt}/${max_attempts}"
    printf '\n[delivery] Verification after remediation %s/%s\n' "${attempt}" "${max_attempts}"
    if run_verification_profile; then
      python3 "${remediation_py}" --result "${RESULT_FILE}" --complete || true
      progress_message "Verification passed after remediation attempt ${attempt}/${max_attempts}"
      return 0
    fi
  done
  return 1
}

run_dry_delivery() {
  local dry_py="${LUMEN_LIB_DIR}/dry_run_delivery.py"
  [[ -f "${dry_py}" ]] || fail "dry_run_delivery.py not found"

  init_delivery_progress
  progress_phase preflight in_progress "Validate story gates and metadata"
  printf '\n[delivery] Phase 1/5 — Sync references and preflight\n'
  run_sync_delivery
  progress_phase worktrees in_progress "Prepare feature worktrees"
  printf '[delivery] Phase 2/5 — Feature worktrees\n'
  run_prepare_delivery
  progress_phase preflight completed "Gates passed"
  progress_phase worktrees completed "Worktrees ready"

  progress_phase agent skipped "Dry run — agent not started"
  progress_phase verification skipped "Dry run — verification not executed"
  progress_phase jira_start skipped "Dry run"
  progress_phase jira_done skipped "Dry run"

  printf '[delivery] Phase 3/5 — Dry-run result\n'
  python3 "${dry_py}" "${DOCS_DIR}" "${STORY_REF}" "${RUN_ID}" | tee -a "${LOG_FILE}"
  [[ -f "${RESULT_FILE}" ]] || fail "Dry run did not produce ${RESULT_FILE}"

  progress_phase notify in_progress "Dry-run notification preview"
  local render_py="${LUMEN_LIB_DIR}/render-delivery-and-notify.py"
  if [[ -f "${render_py}" ]]; then
    LUMEN_DRY_RUN=1 python3 "${render_py}" "${RESULT_FILE}" --event delivery.dev_done | tee -a "${LOG_FILE}" || true
  fi
  progress_phase notify completed "Dry-run notification preview sent"
  finish_delivery_progress completed "Dry run finished"
  archive_delivery
  printf '\nDry-run delivery finished. No Cursor agent, commits, or PRs were created.\n'
}

run_real_delivery() {
  command -v agent >/dev/null 2>&1 || fail "Cursor CLI 'agent' was not found in PATH."
  if [[ -z "${CURSOR_API_KEY:-}" ]] && ! agent status >/dev/null 2>&1; then
    fail "Cursor agent is not authenticated. Add CURSOR_API_KEY to ${DOCS_DIR}/.env.local."
  fi

  init_delivery_progress

  progress_phase preflight in_progress "Validate story gates and metadata"
  printf '\n[delivery] Phase 1/8 — Sync references and preflight\n'
  run_sync_delivery
  progress_phase worktrees in_progress "Create or refresh feature worktrees"
  printf '[delivery] Phase 2/8 — Feature worktrees\n'
  run_prepare_delivery
  progress_phase preflight completed "Gates passed"
  progress_phase worktrees completed "Worktrees ready"

  progress_phase jira_start in_progress "Notify JIRA IN DEV"
  printf '[delivery] Phase 3/8 — JIRA IN DEV\n'
  send_started_notification
  progress_phase jira_start completed "Started notification sent"

  local delivery_prompt
  delivery_prompt="$(load_delivery_prompt)" || fail "Failed to compose delivery prompt."

  printf 'Docs repository: %s\n' "${DOCS_DIR}"
  printf 'Workspace root: %s\n' "${WORKSPACE_ROOT}"
  printf 'Cursor model: %s\n' "${MODEL}"
  printf 'Run log: %s\n' "${LOG_FILE}"
  progress_message "Model=${MODEL}; sandbox=${SANDBOX_MODE}"

  if [[ -z "${FEISHU_WEBHOOK_URL:-}" ]]; then
    printf 'Notice: FEISHU_WEBHOOK_URL is not set. Delivery Feishu notifications will be skipped.\n'
  fi
  if ! command -v gh >/dev/null 2>&1; then
    printf 'Notice: GitHub CLI (gh) is not installed. PR creation may be skipped by the agent.\n'
  elif ! gh auth status >/dev/null 2>&1; then
    printf 'Notice: GitHub CLI is not authenticated. PR creation may be skipped by the agent.\n'
  fi

  progress_phase agent in_progress "Cursor implementation agent"
  printf '\n[delivery] Phase 4/8 — Implementation agent\n'
  printf 'Starting Lumen delivery agent at %s UTC...\n' "$(date -u '+%Y-%m-%d %H:%M:%S')"

  if ! run_delivery_agent "${delivery_prompt}" "Lumen delivery implementation agent"; then
    progress_phase agent failed "Agent exited with a non-zero status"
    fail "Lumen delivery agent exited with a non-zero status. See log: ${LOG_FILE}"
  fi

  [[ -f "${RESULT_FILE}" ]] || fail "Delivery agent did not write ${RESULT_FILE}"
  progress_phase agent completed "Agent finished; result written"

  progress_phase verification in_progress "Compile, PMD, unit and integration tests"
  printf '\n[delivery] Phase 5/8 — Verification\n'
  if ! run_verification_profile; then
    if ! run_remediation_loop; then
      progress_phase verification failed "Verification failed after bounded remediation attempts"
      fail "Delivery verification failed after bounded remediation. See log: ${LOG_FILE}"
    fi
    progress_phase verification completed "All verification checks passed"
  else
    progress_phase verification completed "All verification checks passed"
  fi

  progress_phase finalize in_progress "Commit verified changes, push feature branches, and create PRs"
  printf '\n[delivery] Phase 6/8 — Commit, push, and PR\n'
  local finalize_py="${LUMEN_LIB_DIR}/finalize_delivery.py"
  if [[ ! -f "${finalize_py}" ]]; then
    progress_phase finalize failed "Finalization runner not installed"
    fail "Delivery finalization runner not found: ${finalize_py}"
  fi
  set +e
  python3 "${finalize_py}" "${DOCS_DIR}" --story "${STORY_REF}" --result "${RESULT_FILE}" | tee -a "${LOG_FILE}"
  local finalize_exit=${PIPESTATUS[0]}
  set -e
  if [[ "${finalize_exit}" -ne 0 ]]; then
    progress_phase finalize failed "Commit, push, or PR creation failed"
    fail "Delivery finalization failed. See log: ${LOG_FILE}"
  fi
  progress_phase finalize completed "Feature branches pushed and PRs opened"

  progress_phase jira_done in_progress "Sync JIRA DEV DONE"
  progress_phase notify in_progress "Feishu and metadata updates"
  printf '[delivery] Phase 7/8 — JIRA DEV DONE\n'
  printf '[delivery] Phase 8/8 — Notifications\n'
  local render_py="${LUMEN_LIB_DIR}/render-delivery-and-notify.py"
  if [[ -f "${render_py}" ]]; then
    python3 "${render_py}" "${RESULT_FILE}" --event delivery.dev_done | tee -a "${LOG_FILE}" || \
      printf 'Warning: delivery notification step failed. See log for details.\n' >&2
  fi
  sync_delivery_docs_metadata
  progress_phase jira_done completed "JIRA sync attempted"
  progress_phase notify completed "Notifications sent"
  finish_delivery_progress completed "Delivery run finished"
  archive_delivery
  cleanup_completed_worktrees
  printf '\nLumen delivery run finished at %s UTC.\n' "$(date -u '+%Y-%m-%d %H:%M:%S')"
}

cd "${DOCS_DIR}"

if [[ "${DRY_RUN}" == "1" || "${DRY_RUN}" == "true" || "${DRY_RUN}" == "yes" ]]; then
  run_dry_delivery
else
  run_real_delivery
fi
