#!/usr/bin/env bash

ensure_lumen_path() {
  local lumen_bin="${1:-}"
  local bin_dirs=()
  local seen="" result="" dir tool_dir entry

  if [[ -n "${lumen_bin}" ]]; then
    dir="$(cd "$(dirname "${lumen_bin}")" && pwd)"
    bin_dirs+=("${dir}")
  fi

  if [[ -n "${HOME:-}" ]]; then
    bin_dirs+=("${HOME}/.local/bin")
  fi
  bin_dirs+=("/usr/local/bin" "/opt/homebrew/bin")

  export PATH="$(IFS=:; printf '%s' "${bin_dirs[*]}"):${PATH:-/usr/bin:/bin}"

  if command -v agent >/dev/null 2>&1; then
    tool_dir="$(cd "$(dirname "$(command -v agent)")" && pwd)"
    bin_dirs+=("${tool_dir}")
  fi
  if command -v gh >/dev/null 2>&1; then
    tool_dir="$(cd "$(dirname "$(command -v gh)")" && pwd)"
    bin_dirs+=("${tool_dir}")
  fi
  if command -v python3 >/dev/null 2>&1; then
    tool_dir="$(cd "$(dirname "$(command -v python3)")" && pwd)"
    bin_dirs+=("${tool_dir}")
  fi

  for entry in "${bin_dirs[@]}" "/usr/bin" "/bin"; do
    [[ -n "${entry}" && -d "${entry}" ]] || continue
    case ":${seen}:" in
      *":${entry}:"*) continue ;;
    esac
    seen="${seen}:${entry}"
    if [[ -n "${result}" ]]; then
      result="${result}:${entry}"
    else
      result="${entry}"
    fi
  done

  export PATH="${result}:${PATH:-/usr/bin:/bin}"
}

schedule_path_export() {
  local lumen_bin="${1:-}"
  ensure_lumen_path "${lumen_bin}"
  printf 'PATH="%s"' "${PATH}"
}
