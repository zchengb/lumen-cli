#!/usr/bin/env python3
"""Interactive Jira project space picker for Lumen init and config."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import List, Optional

SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from jira_spaces import choose_default_board, list_jira_boards, list_jira_spaces


def parse_args(argv: List[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Select a Jira project space")
    parser.add_argument("--output", default="")
    parser.add_argument("--keyword", default="")
    parser.add_argument("--limit", type=int, default=50)
    parser.add_argument("--assign-active-sprint", action="store_true")
    parser.add_argument("--default-key", default="")
    return parser.parse_args(argv)


def can_run_interactive() -> bool:
    if sys.stdin.isatty() or sys.stderr.isatty():
        return True
    try:
        handle = open("/dev/tty", "rb")
        handle.close()
        return True
    except OSError:
        return False


def write_result(payload: dict, output_path: str) -> None:
    text = json.dumps(payload, indent=2, ensure_ascii=False) + "\n"
    if output_path:
        Path(output_path).write_text(text, encoding="utf-8")
        return
    sys.stdout.write(text)


def prompt_line(message: str, default_value: str = "") -> str:
    prompt = message
    if default_value:
        prompt += f" [{default_value}]"
    prompt += ": "
    sys.stderr.write(prompt)
    sys.stderr.flush()
    answer = sys.stdin.readline()
    if answer is None:
        return ""
    answer = answer.strip()
    if not answer:
        return default_value
    return answer


def resolve_space_choice(spaces: List[dict], selection: str) -> Optional[str]:
    token = selection.strip()
    if not token:
        return None
    if token.lower() in {"q", "quit", "cancel"}:
        return "__cancel__"
    if token == "/":
        return "__search__"
    if token.lower() in {"m", "manual"}:
        return "__manual__"

    if token.isdigit():
        index = int(token) - 1
        if 0 <= index < len(spaces):
            return spaces[index]["key"]
        return None

    upper = token.upper()
    for space in spaces:
        if space["key"].upper() == upper:
            return space["key"]
    return None


def run_space_picker(spaces: List[dict], keyword: str, default_key: str) -> tuple:
    default_index = 0
    if default_key:
        for index, space in enumerate(spaces):
            if space["key"].upper() == default_key.upper():
                default_index = index
                break

    while True:
        sys.stderr.write("\nJira project spaces\n")
        if keyword:
            sys.stderr.write(f"Filter: {keyword}\n")
        sys.stderr.write("\n")

        for index, space in enumerate(spaces, start=1):
            marker = ">" if index - 1 == default_index else " "
            sys.stderr.write(f"  {marker} {index}) {space['key']} - {space['name']}\n")

        sys.stderr.write("\n")
        sys.stderr.write("  /  Search by keyword\n")
        sys.stderr.write("  m  Enter project key manually\n")
        sys.stderr.write("  q  Cancel\n")
        sys.stderr.write("\n")
        sys.stderr.flush()

        selection = prompt_line("Enter number or project key")
        resolved = resolve_space_choice(spaces, selection)
        if resolved == "__cancel__":
            return "cancel", "", keyword
        if resolved == "__search__":
            keyword = prompt_line("Jira space keyword", keyword)
            return "search", "", keyword
        if resolved == "__manual__":
            return "manual", "", keyword
        if resolved:
            return "space", resolved, keyword

        sys.stderr.write("Invalid selection. Enter a list number, project key, /, m, or q.\n")


def resolve_board_choice(boards: List[dict], selection: str) -> Optional[str]:
    token = selection.strip()
    if not token:
        return None
    if token.lower() in {"q", "quit", "cancel"}:
        return "__cancel__"

    if token.isdigit():
        if any(board["id"] == token for board in boards):
            return token
        index = int(token) - 1
        if 0 <= index < len(boards):
            return boards[index]["id"]
        return None

    return None


def run_board_picker(project_key: str, boards: List[dict]) -> str:
    default_id = choose_default_board(boards) or boards[0]["id"]

    while True:
        sys.stderr.write(f"\nScrum/Kanban boards for {project_key}\n\n")
        for index, board in enumerate(boards, start=1):
            marker = ">" if board["id"] == default_id else " "
            board_type = board.get("type") or "board"
            sys.stderr.write(
                f"  {marker} {index}) {board['id']} - {board['name']} ({board_type})\n"
            )
        sys.stderr.write("\n  q  Cancel\n\n")
        sys.stderr.flush()

        selection = prompt_line("Enter board number or board id", default_id)
        resolved = resolve_board_choice(boards, selection)
        if resolved == "__cancel__":
            return ""
        if resolved:
            return resolved
        if selection.strip().isdigit() and len(boards) == 1:
            return boards[0]["id"]

        sys.stderr.write("Invalid selection. Enter a list number, board id, or q.\n")


def resolve_board_id(project_key: str, assign_active_sprint: bool) -> str:
    if not assign_active_sprint:
        return ""

    boards = list_jira_boards(project_key)
    if not boards:
        return ""

    default_board = choose_default_board(boards)
    if default_board and len(boards) == 1:
        return default_board

    if default_board and len(boards) > 1:
        sys.stderr.write(
            f"\nMultiple boards found for {project_key}. "
            f"Default scrum board: {default_board}\n"
        )
        use_default = prompt_line("Press Enter to use default board, or type n to choose", "")
        if use_default.lower() not in {"n", "no"}:
            return default_board

    if not can_run_interactive():
        return default_board or boards[0]["id"]

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
            keyword = prompt_line("Jira space keyword", keyword)
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
            project_key = prompt_line("Jira project key", default_key).strip().upper()
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
