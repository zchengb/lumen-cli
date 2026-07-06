#!/usr/bin/env bash

build_lumen_path() {
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

  printf '%s' "${result}"
}

ensure_lumen_path() {
  local lumen_bin="${1:-}"
  local minimal
  minimal="$(build_lumen_path "${lumen_bin}")"
  export PATH="${minimal}:${PATH:-/usr/bin:/bin}"
}

schedule_path_export() {
  local lumen_bin="${1:-}"
  local saved_path="${PATH:-/usr/bin:/bin}"
  PATH="/usr/bin:/bin:/usr/local/bin:/opt/homebrew/bin"
  [[ -n "${HOME:-}" ]] && PATH="${HOME}/.local/bin:${PATH}"
  printf 'PATH="%s"' "$(build_lumen_path "${lumen_bin}")"
  PATH="${saved_path}"
}
