#!/usr/bin/env python3
"""Interactive repository picker for Lumen init."""

from __future__ import annotations

import json
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from discover_repos import discover, parse_selection


def parse_args(argv: list) -> tuple:
    workspace_root = ""
    output_path = ""
    index = 0
    while index < len(argv):
        arg = argv[index]
        if arg == "--output":
            output_path = argv[index + 1] if index + 1 < len(argv) else ""
            index += 2
            continue
        if not workspace_root:
            workspace_root = arg
        index += 1
    return workspace_root, output_path


def can_run_interactive() -> bool:
    if sys.stdin.isatty() or sys.stderr.isatty():
        return True
    try:
        handle = open("/dev/tty", "rb")
        handle.close()
        return True
    except OSError:
        return False


def prompt_line(message: str) -> str:
    sys.stderr.write(message)
    sys.stderr.flush()
    answer = sys.stdin.readline()
    if answer is None:
        return ""
    return answer.strip()


def write_result(result: list, output_path: str) -> None:
    payload = json.dumps(result, indent=2) + "\n"
    if output_path:
        Path(output_path).write_text(payload, encoding="utf-8")
        return
    sys.stdout.write(payload)


def print_repo_menu(workspace_root: str, repos: list, selected: set) -> None:
    sys.stderr.write(f"\nRepositories under {workspace_root}\n\n")
    for index, repo in enumerate(repos, start=1):
        mark = "x" if index - 1 in selected else " "
        sys.stderr.write(
            f"  [{mark}] {index}) {repo['name']} "
            f"({repo['default_branch']}, {repo['runtime_profile']})\n"
        )
    count = len(selected)
    noun = "repository" if count == 1 else "repositories"
    sys.stderr.write(f"\nSelected: {count} {noun}\n\n")
    sys.stderr.write("  1,3,5   toggle repositories by number\n")
    sys.stderr.write("  all     select all\n")
    sys.stderr.write("  clear   clear selection\n")
    sys.stderr.write("  manual  add repository manually\n")
    sys.stderr.write("  Enter   continue with selected repositories\n")
    sys.stderr.write("  q       cancel\n\n")
    sys.stderr.flush()


def apply_toggle(selected: set, repos: list, answer: str) -> bool:
    lowered = answer.strip().lower()
    if lowered in {"all", "a"}:
        selected.clear()
        selected.update(range(len(repos)))
        return True
    if lowered in {"clear", "c", "none"}:
        selected.clear()
        return True

    try:
        indices = parse_selection(answer, len(repos))
    except RuntimeError as exc:
        sys.stderr.write(f"{exc}\n")
        return False

    for index in indices:
        zero_based = index - 1
        if zero_based in selected:
            selected.remove(zero_based)
        else:
            selected.add(zero_based)
    return True


def run_interactive(workspace_root: str, repos: list, output_path: str) -> int:
    selected: set = set()

    while True:
        print_repo_menu(workspace_root, repos, selected)
        answer = prompt_line("Selection: ")

        if answer.lower() in {"q", "quit", "cancel"}:
            return 130
        if answer.lower() in {"manual", "m", "+"}:
            return 2
        if answer == "":
            if not selected:
                sys.stderr.write("Select at least one repository, or type manual to add one by URL.\n")
                continue
            result = [repos[index] for index in sorted(selected)]
            write_result(result, output_path)
            return 0

        apply_toggle(selected, repos, answer)


def usage() -> None:
    sys.stderr.write("Usage: select_repos.py <workspace-root> [--output <file>]\n")
    raise SystemExit(1)


def main() -> int:
    workspace_root, output_path = parse_args(sys.argv[1:])
    if not workspace_root:
        usage()

    if not can_run_interactive():
        sys.stderr.write("Interactive repository selection requires a TTY.\n")
        return 1

    repos = discover(workspace_root)
    if not repos:
        sys.stderr.write("No repositories found.\n")
        return 1

    return run_interactive(workspace_root, repos, output_path)


if __name__ == "__main__":
    raise SystemExit(main())
