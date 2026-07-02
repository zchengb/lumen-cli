#!/usr/bin/env python3
import json
import os
import sys
import termios
import tty
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from discover_repos import discover

CONTINUE_ROW = 0
MANUAL_ROW = 1


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


def open_tty_input():
    if sys.stdin.isatty():
        return sys.stdin
    try:
        return open("/dev/tty", "rb", buffering=0)
    except OSError:
        return None


def can_run_interactive() -> bool:
    if sys.stdin.isatty() or sys.stderr.isatty():
        return True
    try:
        handle = open("/dev/tty", "rb")
        handle.close()
        return True
    except OSError:
        return False


def format_repo_line(repo: dict, selected: bool, active: bool) -> str:
    marker = "›" if active else " "
    circle = "●" if selected else "○"
    return f"{marker} {circle} {repo['name']}  ({repo['default_branch']}, {repo['runtime_profile']})"


def format_footer_line(label: str, active: bool) -> str:
    marker = "›" if active else " "
    return f"{marker} {label}"


def render(workspace_root: str, repos: list, selected: set, cursor: int, footer_cursor, status_message: str) -> None:
    lines = [
        f"Repositories under {workspace_root}",
        "",
    ]
    for index, repo in enumerate(repos):
        active = footer_cursor is None and cursor == index
        lines.append(format_repo_line(repo, index in selected, active))
    lines.append("")
    count = len(selected)
    noun = "repository" if count == 1 else "repositories"
    continue_label = f"Continue with {count} selected {noun}"
    lines.append(format_footer_line(continue_label, footer_cursor == CONTINUE_ROW))
    lines.append(format_footer_line("Add repository manually", footer_cursor == MANUAL_ROW))
    lines.append("")
    lines.append("↑↓ move   Space toggle   Enter confirm   a select all   q cancel")
    if status_message:
        lines.append(status_message)
    sys.stderr.write("\x1b[?25l\x1b[2J\x1b[H" + "\n".join(lines))


def restore_terminal() -> None:
    sys.stderr.write("\x1b[?25h\x1b[0J\n")


def write_result(result: list, output_path: str) -> None:
    payload = json.dumps(result, indent=2) + "\n"
    if output_path:
        Path(output_path).write_text(payload, encoding="utf-8")
        return
    sys.stdout.write(payload)


def read_key(handle) -> str:
    chunk = handle.read(1)
    if not chunk:
        return ""
    if chunk in {b"\x1b"}:
        rest = handle.read(2)
        return (chunk + rest).decode("utf-8", errors="ignore")
    return chunk.decode("utf-8", errors="ignore")


def run_interactive(workspace_root: str, repos: list, output_path: str) -> int:
    handle = open_tty_input()
    if handle is None:
        sys.stderr.write("Interactive repository selection requires a TTY.\n")
        return 1

    selected = set()
    cursor = 0
    footer_cursor = None
    status_message = ""
    raw_mode = sys.stdin.isatty()
    old_settings = None
    if raw_mode:
        old_settings = termios.tcgetattr(sys.stdin)
        tty.setraw(sys.stdin.fileno())

    try:
        render(workspace_root, repos, selected, cursor, footer_cursor, status_message)
        while True:
            if raw_mode:
                key = read_key(sys.stdin.buffer)
            else:
                key = read_key(handle)

            status_message = ""

            if key in {"\x03", "q"}:
                return 130

            if key == "a":
                if len(selected) == len(repos):
                    selected.clear()
                else:
                    selected.clear()
                    selected.update(range(len(repos)))
                render(workspace_root, repos, selected, cursor, footer_cursor, status_message)
                continue

            if key == "\x1b[A":
                if footer_cursor is not None:
                    if footer_cursor == MANUAL_ROW:
                        footer_cursor = CONTINUE_ROW
                    else:
                        footer_cursor = None
                        cursor = len(repos) - 1
                elif cursor > 0:
                    cursor -= 1
                render(workspace_root, repos, selected, cursor, footer_cursor, status_message)
                continue

            if key == "\x1b[B":
                if footer_cursor is not None:
                    if footer_cursor == CONTINUE_ROW:
                        footer_cursor = MANUAL_ROW
                elif cursor < len(repos) - 1:
                    cursor += 1
                else:
                    footer_cursor = CONTINUE_ROW
                render(workspace_root, repos, selected, cursor, footer_cursor, status_message)
                continue

            if key == " ":
                if footer_cursor is None:
                    if cursor in selected:
                        selected.remove(cursor)
                    else:
                        selected.add(cursor)
                    render(workspace_root, repos, selected, cursor, footer_cursor, status_message)
                continue

            if key in {"\r", "\n"}:
                if footer_cursor == MANUAL_ROW:
                    return 2
                if not selected:
                    status_message = "Select at least one repository (Space to toggle), or choose manual entry."
                    render(workspace_root, repos, selected, cursor, footer_cursor, status_message)
                    continue
                result = [repos[index] for index in sorted(selected)]
                write_result(result, output_path)
                return 0

            if key.startswith("\x1b"):
                continue
    finally:
        restore_terminal()
        if raw_mode and old_settings is not None:
            termios.tcsetattr(sys.stdin, termios.TCSADRAIN, old_settings)
        if handle is not sys.stdin:
            handle.close()

    return 1


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
