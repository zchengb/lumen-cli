#!/usr/bin/env python3
"""Discover Jira project spaces and boards via the TWG CLI."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional

SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from jira_sync import parse_twg_json, run_twg, twg_ready


def twg_error_message(output: str, fallback: str) -> str:
    payload = parse_twg_json(output)
    if isinstance(payload, dict):
        error = payload.get("error")
        if isinstance(error, dict) and error.get("message"):
            return str(error["message"])
        if payload.get("message"):
            return str(payload["message"])
    clean = re.sub(r"\s+", " ", output).strip()
    return clean or fallback


def normalize_spaces(payload: Any) -> List[Dict[str, str]]:
    if isinstance(payload, list):
        items = payload
    elif isinstance(payload, dict):
        items = payload.get("spaces") or payload.get("items") or payload.get("data") or []
        if isinstance(items, dict):
            items = items.get("spaces") or items.get("items") or []
    else:
        items = []

    spaces: List[Dict[str, str]] = []
    seen = set()
    for item in items:
        if not isinstance(item, dict):
            continue
        key = str(item.get("key", "")).strip()
        if not key or key in seen:
            continue
        seen.add(key)
        spaces.append(
            {
                "key": key,
                "name": str(item.get("name", "")).strip() or key,
                "id": str(item.get("id", "")).strip(),
            }
        )
    spaces.sort(key=lambda entry: entry["name"].lower())
    return spaces


def list_jira_spaces(keyword: str = "", limit: int = 50) -> List[Dict[str, str]]:
    ready, reason = twg_ready()
    if not ready:
        raise RuntimeError(reason)

    command = ["spaces", "query", "--limit", str(limit), "-o", "json"]
    if keyword.strip():
        command.extend(["--keyword", keyword.strip()])

    returncode, output = run_twg(command)
    if returncode != 0:
        raise RuntimeError(twg_error_message(output, "twg spaces query failed"))

    payload = parse_twg_json(output)
    spaces = normalize_spaces(payload)
    if not spaces:
        raise RuntimeError("No Jira project spaces found for the current TWG account.")
    return spaces


def normalize_boards(payload: Any) -> List[Dict[str, str]]:
    if not isinstance(payload, dict):
        return []
    data = payload.get("data") if isinstance(payload.get("data"), dict) else payload
    boards = data.get("boards") or []
    result: List[Dict[str, str]] = []
    for board in boards:
        if not isinstance(board, dict):
            continue
        board_id = board.get("id")
        if board_id is None:
            continue
        result.append(
            {
                "id": str(board_id),
                "name": str(board.get("name", "")).strip() or str(board_id),
                "type": str(board.get("type", "")).strip(),
            }
        )
    return result


def list_jira_boards(project_key: str) -> List[Dict[str, str]]:
    ready, reason = twg_ready()
    if not ready:
        raise RuntimeError(reason)

    project_key = project_key.strip()
    if not project_key:
        raise RuntimeError("project_key is required")

    returncode, output = run_twg(
        ["jira", "board", "query", "--project", project_key, "-o", "json"]
    )
    if returncode != 0:
        raise RuntimeError(twg_error_message(output, "twg jira board query failed"))

    payload = parse_twg_json(output)
    return normalize_boards(payload)


def choose_default_board(boards: List[Dict[str, str]]) -> Optional[str]:
    if not boards:
        return None
    if len(boards) == 1:
        return boards[0]["id"]
    scrum = [board for board in boards if board.get("type") == "scrum"]
    if len(scrum) == 1:
        return scrum[0]["id"]
    return None
