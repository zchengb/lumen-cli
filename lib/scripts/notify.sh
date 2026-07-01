#!/usr/bin/env bash
set -euo pipefail

# Usage: notify.sh <title> <message>
TITLE="${1:-Lumen}"
MESSAGE="${2:-}"

escape_for_osascript() {
  printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g'
}

if [[ "$(uname -s 2>/dev/null)" == "Darwin" ]] && command -v osascript >/dev/null 2>&1; then
  osascript -e "display notification \"$(escape_for_osascript "${MESSAGE}")\" with title \"$(escape_for_osascript "${TITLE}")\"" >/dev/null 2>&1 || true
elif command -v notify-send >/dev/null 2>&1; then
  notify-send "${TITLE}" "${MESSAGE}" >/dev/null 2>&1 || true
fi

exit 0
