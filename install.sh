#!/usr/bin/env bash
set -euo pipefail

# Lumen CLI installer.
# Usage:
#   ./install.sh                 Install the CLI only (lumen init later, anywhere)
#   ./install.sh <workspace-dir> Install the CLI AND initialize a scan workspace in one step

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LUMEN_HOME="${LUMEN_HOME:-$HOME/.lumen}"
BIN_DIR="${LUMEN_BIN_DIR:-$HOME/.local/bin}"

BOLD="$(printf '\033[1m')"
GREEN="$(printf '\033[32m')"
YELLOW="$(printf '\033[33m')"
RESET="$(printf '\033[0m')"

echo "${BOLD}Installing Lumen CLI...${RESET}"

mkdir -p "${LUMEN_HOME}/lib"
mkdir -p "${BIN_DIR}"

cp -R "${SCRIPT_DIR}/lib/scripts" "${LUMEN_HOME}/lib/"
cp -R "${SCRIPT_DIR}/lib/templates" "${LUMEN_HOME}/lib/"
cp "${SCRIPT_DIR}/VERSION" "${LUMEN_HOME}/VERSION"

chmod +x "${LUMEN_HOME}/lib/scripts/"*.sh 2>/dev/null || true
chmod +x "${LUMEN_HOME}/lib/scripts/"*.js 2>/dev/null || true
chmod +x "${LUMEN_HOME}/lib/scripts/"*.py 2>/dev/null || true

install -m 0755 "${SCRIPT_DIR}/bin/lumen" "${BIN_DIR}/lumen" 2>/dev/null \
  || { cp "${SCRIPT_DIR}/bin/lumen" "${BIN_DIR}/lumen" && chmod +x "${BIN_DIR}/lumen"; }

echo "${GREEN}✓${RESET} Installed lumen to ${BIN_DIR}/lumen"
echo "${GREEN}✓${RESET} Installed CLI library to ${LUMEN_HOME}"

case ":${PATH}:" in
  *":${BIN_DIR}:"*) ;;
  *)
    echo
    echo "${YELLOW}!${RESET} ${BIN_DIR} is not on your PATH."
    echo "  Add this to your ~/.zshrc or ~/.bashrc, then restart your shell:"
    echo
    echo "    export PATH=\"${BIN_DIR}:\$PATH\""
    echo
    ;;
esac

WORKSPACE_DIR="${1:-}"
if [[ -n "${WORKSPACE_DIR}" ]]; then
  echo
  echo "${BOLD}Initializing scan workspace at: ${WORKSPACE_DIR}${RESET}"
  mkdir -p "${WORKSPACE_DIR}"
  LUMEN_HOME="${LUMEN_HOME}" "${BIN_DIR}/lumen" init "${WORKSPACE_DIR}"
fi

echo
echo "${BOLD}Installation complete.${RESET}"
echo
echo "Next steps:"
if [[ -z "${WORKSPACE_DIR}" ]]; then
  echo "  1. Open a new terminal (or 'source ~/.zshrc') so 'lumen' is on your PATH."
  echo "  2. cd into (or create) a directory for your scan workspace."
  echo "  3. Run: lumen init"
else
  echo "  1. Open a new terminal (or 'source ~/.zshrc') so 'lumen' is on your PATH."
  echo "  2. cd \"${WORKSPACE_DIR}\""
fi
echo "  4. Run: lumen list          (see registered projects and IDs)"
echo "  5. Run: lumen doctor"
echo "  6. Run: lumen scan --project <slug>   (see slugs with: lumen list)"
echo "  7. Open dashboard.html in a browser, or run: lumen dashboard --open"
