#!/usr/bin/env python3
"""Interactive Jira project space picker for Lumen init and config."""

from __future__ import annotations

import argparse
import json
import sys
import termios
import tty
from pathlib import Path
from typing import Dict, List, Optional

SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from jira_spaces import choose_default_board, list_jira_boards, list_jira_spaces

SEARCH_ROW = 0
MANUAL_ROW = 1


def parse_args(argv: List[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Select a Jira project space")
    parser.add_argument("--output", default="")
    parser.add_argument("--keyword", default="")
    parser.add_argument("--limit", type=int, default=50)
    parser.add_argument("--assign-active-sprint", action="store_true")
    parser.add_argument("--default-key", default="")
    return parser.parse_args(argv)


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


def read_key(handle) -> str:
    chunk = handle.read(1)
    if not chunk:
        return ""
    if chunk == b"\x1b":
        rest = handle.read(2)
        return (chunk + rest).decode("utf-8", errors="ignore")
    return chunk.decode("utf-8", errors="ignore")


def restore_terminal() -> None:
    sys.stderr.write("\x1b[?25h\x1b[0J\n")


def write_result(payload: dict, output_path: str) -> None:
    text = json.dumps(payload, indent=2, ensure_ascii=False) + "\n"
    if output_path:
        Path(output_path).write_text(text, encoding="utf-8")
        return
    sys.stdout.write(text)


def format_space_line(space: dict, active: bool, selected: bool) -> str:
    marker = "›" if active else " "
    circle = "●" if selected else "○"
    return f"{marker} {circle} {space['key']} — {space['name']}"


def format_footer(label: str, active: bool) -> str:
    marker = "›" if active else " "
    return f"{marker} {label}"


def render_spaces(
    spaces: List[dict],
    cursor: int,
    selected: int,
    footer_cursor: Optional[int],
    keyword: str,
    status_message: str,
) -> None:
    lines = ["Jira project spaces", ""]
    if keyword:
        lines.append(f"Filter: {keyword}")
        lines.append("")
    for index, space in enumerate(spaces):
        active = footer_cursor is None and cursor == index
        lines.append(format_space_line(space, active, selected == index))
    lines.append("")
    lines.append(format_footer("Search by keyword", footer_cursor == SEARCH_ROW))
    lines.append(format_footer("Enter project key manually", footer_cursor == MANUAL_ROW))
    lines.append("")
    lines.append("↑↓ move   Enter confirm   / search   m manual   q cancel")
    if status_message:
        lines.append(status_message)
    sys.stderr.write("\x1b[?25l\x1b[2J\x1b[H" + "\n".join(lines))


def render_boards(
    project_key: str,
    boards: List[dict],
    cursor: int,
    selected: int,
    status_message: str,
) -> None:
    lines = [
        f"Scrum/Kanban boards for {project_key}",
        "",
    ]
    for index, board in enumerate(boards):
        active = cursor == index
        marker = "›" if active else " "
        circle = "●" if selected == index else "○"
        board_type = board.get("type") or "board"
        lines.append(f"{marker} {circle} {board['id']} — {board['name']} ({board_type})")
    lines.append("")
    lines.append("↑↓ move   Enter confirm   q cancel")
    if status_message:
        lines.append(status_message)
    sys.stderr.write("\x1b[?25l\x1b[2J\x1b[H" + "\n".join(lines))


def prompt_text(message: str, default_value: str = "") -> str:
    restore_terminal()
    prompt = f"{message}"
    if default_value:
        prompt += f" [{default_value}]"
    prompt += ": "
    sys.stderr.write(prompt)
    sys.stderr.flush()
    answer = sys.stdin.readline().strip()
    if not answer:
        return default_value
    return answer


def run_space_picker(spaces: List[dict], keyword: str, default_key: str) -> tuple:
    handle = open_tty_input()
    if handle is None:
        raise RuntimeError("Interactive Jira selection requires a TTY.")

    selected = 0
    if default_key:
        for index, space in enumerate(spaces):
            if space["key"].upper() == default_key.upper():
                selected = index
                break

    cursor = selected
    footer_cursor = None
    status_message = ""
    raw_mode = sys.stdin.isatty()
    old_settings = None
    if raw_mode:
        old_settings = termios.tcgetattr(sys.stdin)
        tty.setraw(sys.stdin.fileno())

    try:
        render_spaces(spaces, cursor, selected, footer_cursor, keyword, status_message)
        while True:
            key = read_key(sys.stdin.buffer if raw_mode else handle)

            status_message = ""

            if key in {"\x03", "q"}:
                return "cancel", "", keyword

            if key == "/":
                keyword = prompt_text("Jira space keyword", keyword)
                return "search", "", keyword

            if key == "m":
                return "manual", "", keyword

            if key == "\x1b[A":
                if footer_cursor is not None:
                    footer_cursor = SEARCH_ROW if footer_cursor == MANUAL_ROW else None
                    if footer_cursor is None:
                        cursor = len(spaces) - 1
                elif cursor > 0:
                    cursor -= 1
                render_spaces(spaces, cursor, selected, footer_cursor, keyword, status_message)
                continue

            if key == "\x1b[B":
                if footer_cursor is None:
                    if cursor < len(spaces) - 1:
                        cursor += 1
                    else:
                        footer_cursor = SEARCH_ROW
                elif footer_cursor == SEARCH_ROW:
                    footer_cursor = MANUAL_ROW
                render_spaces(spaces, cursor, selected, footer_cursor, keyword, status_message)
                continue

            if key == " ":
                if footer_cursor is None:
                    selected = cursor
                    render_spaces(spaces, cursor, selected, footer_cursor, keyword, status_message)
                continue

            if key in {"\r", "\n"}:
                if footer_cursor == SEARCH_ROW:
                    keyword = prompt_text("Jira space keyword", keyword)
                    return "search", "", keyword
                if footer_cursor == MANUAL_ROW:
                    return "manual", "", keyword
                return "space", spaces[selected]["key"], keyword
    finally:
        restore_terminal()
        if raw_mode and old_settings is not None:
            termios.tcsetattr(sys.stdin, termios.TCSADRAIN, old_settings)
        if handle is not sys.stdin:
            handle.close()

    return "cancel", "", keyword


def run_board_picker(project_key: str, boards: List[dict]) -> str:
    handle = open_tty_input()
    if handle is None:
        raise RuntimeError("Interactive board selection requires a TTY.")

    selected = 0
    cursor = 0
    status_message = ""
    raw_mode = sys.stdin.isatty()
    old_settings = None
    if raw_mode:
        old_settings = termios.tcgetattr(sys.stdin)
        tty.setraw(sys.stdin.fileno())

    try:
        render_boards(project_key, boards, cursor, selected, status_message)
        while True:
            key = read_key(sys.stdin.buffer if raw_mode else handle)
            status_message = ""

            if key in {"\x03", "q"}:
                return ""

            if key == "\x1b[A" and cursor > 0:
                cursor -= 1
            elif key == "\x1b[B" and cursor < len(boards) - 1:
                cursor += 1
            elif key == " ":
                selected = cursor
            elif key in {"\r", "\n"}:
                return boards[selected]["id"]

            render_boards(project_key, boards, cursor, selected, status_message)
    finally:
        restore_terminal()
        if raw_mode and old_settings is not None:
            termios.tcsetattr(sys.stdin, termios.TCSADRAIN, old_settings)
        if handle is not sys.stdin:
            handle.close()

    return ""


def resolve_board_id(project_key: str, assign_active_sprint: bool) -> str:
    if not assign_active_sprint:
        return ""

    boards = list_jira_boards(project_key)
    if not boards:
        return ""

    default_board = choose_default_board(boards)
    if default_board:
        return default_board

    if not can_run_interactive():
        return boards[0]["id"]

    picked = run_board_picker(project_key, boards)
    return picked


def run_interactive(args: argparse.Namespace) -> int:
    keyword = args.keyword
    default_key = args.default_key

    while True:
        try:
            spaces = list_jira_spaces(keyword=keyword, limit=args.limit)
        except RuntimeError as exc:
            sys.stderr.write(f"{exc}\n")
            if not can_run_interactive():
                return 1
            keyword = prompt_text("Jira space keyword", keyword)
            continue

        if not can_run_interactive():
            sys.stderr.write("Interactive Jira selection requires a TTY.\n")
            return 1

        action, project_key, keyword = run_space_picker(spaces, keyword, default_key)
        if action == "cancel":
            return 130
        if action == "search":
            continue
        if action == "manual":
            project_key = prompt_text("Jira project key", default_key).strip().upper()
            if not project_key:
                sys.stderr.write("Cancelled.\n")
                return 130
            break
        if action == "space":
            break

    board_id = resolve_board_id(project_key, args.assign_active_sprint)
    write_result(
        {
            "project_key": project_key,
            "board_id": board_id,
            "assign_to_active_sprint": bool(args.assign_active_sprint),
        },
        args.output,
    )
    return 0


def main() -> int:
    args = parse_args(sys.argv[1:])
    try:
        return run_interactive(args)
    except RuntimeError as exc:
        sys.stderr.write(f"Error: {exc}\n")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
