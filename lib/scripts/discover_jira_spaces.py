#!/usr/bin/env python3
"""List Jira project spaces for Lumen init and config flows."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from jira_spaces import list_jira_spaces


def cmd_list(keyword: str, limit: int) -> int:
    try:
        spaces = list_jira_spaces(keyword=keyword, limit=limit)
    except RuntimeError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    sys.stdout.write(json.dumps(spaces, indent=2, ensure_ascii=False) + "\n")
    return 0


def cmd_select(keyword: str, limit: int, selection: str) -> int:
    try:
        spaces = list_jira_spaces(keyword=keyword, limit=limit)
    except RuntimeError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    tokens = [part.strip() for part in selection.split(",") if part.strip()]
    if not tokens:
        print("Error: selection is empty.", file=sys.stderr)
        return 1

    if len(tokens) == 1 and tokens[0].lower() == "all":
        chosen = spaces
    else:
        chosen = []
        for token in tokens:
            if token.isdigit():
                index = int(token) - 1
                if index < 0 or index >= len(spaces):
                    print(f"Error: invalid selection number: {token}", file=sys.stderr)
                    return 1
                chosen.append(spaces[index])
                continue
            match = next((space for space in spaces if space["key"].lower() == token.lower()), None)
            if match is None:
                print(f"Error: unknown project key: {token}", file=sys.stderr)
                return 1
            chosen.append(match)

    sys.stdout.write(json.dumps(chosen, indent=2, ensure_ascii=False) + "\n")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Discover Jira spaces via TWG CLI")
    subparsers = parser.add_subparsers(dest="command", required=True)

    list_parser = subparsers.add_parser("list", help="List visible Jira project spaces")
    list_parser.add_argument("--keyword", default="")
    list_parser.add_argument("--limit", type=int, default=50)

    select_parser = subparsers.add_parser("select", help="Select spaces by number or key")
    select_parser.add_argument("selection")
    select_parser.add_argument("--keyword", default="")
    select_parser.add_argument("--limit", type=int, default=50)

    args = parser.parse_args()
    if args.command == "list":
        return cmd_list(args.keyword, args.limit)
    if args.command == "select":
        return cmd_select(args.keyword, args.limit, args.selection)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
