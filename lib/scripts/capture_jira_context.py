#!/usr/bin/env python3
"""Capture a JIRA work item payload for an auditable Lumen delivery context."""

from __future__ import annotations

import argparse
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from delivery_workspace import load_story_context, workspace_lumen_dir
from jira_sync import parse_twg_json, run_twg, twg_ready


IMAGE_URL = re.compile(r"https?://[^\s'\")>]+\.(?:png|jpe?g|gif|webp)(?:\?[^\s'\")>]*)?", re.IGNORECASE)


def values_for_keys(value: Any, names: set[str]) -> list[Any]:
    found: list[Any] = []
    if isinstance(value, dict):
        for key, item in value.items():
            if key.lower() in names:
                found.append(item)
            found.extend(values_for_keys(item, names))
    elif isinstance(value, list):
        for item in value:
            found.extend(values_for_keys(item, names))
    return found


def image_urls(value: Any) -> list[str]:
    text = json.dumps(value, ensure_ascii=False)
    return sorted(set(IMAGE_URL.findall(text)))


def normalize_data(payload: Any) -> Any:
    if isinstance(payload, dict) and "data" in payload:
        return payload["data"]
    return payload


def capture(docs_dir: Path, story_ref: str) -> tuple[Path, dict[str, Any]]:
    context = load_story_context(docs_dir, story_ref, validate_gates=False)
    jira_key = str(context.metadata.get("jiraKey") or "").strip()
    if not jira_key:
        raise ValueError("Story has no jiraKey")
    ready, reason = twg_ready()
    if not ready:
        raise RuntimeError(reason)
    code, output = run_twg(["jira", "workitem", "get", jira_key, "-o", "json"])
    if code != 0:
        raise RuntimeError((output or f"Unable to read JIRA {jira_key}").strip()[-1000:])
    raw = parse_twg_json(output)
    if raw is None:
        raise RuntimeError("TWG returned no JSON JIRA payload")
    item = normalize_data(raw)
    comments = values_for_keys(item, {"comments", "comment"})
    attachments = values_for_keys(item, {"attachments", "attachment"})
    snapshot = {
        "schema_version": "1.0",
        "captured_at": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        "jira_key": jira_key,
        "source": "twg jira workitem get <key> -o json",
        "workitem": item,
        "comments": comments,
        "attachments": attachments,
        "image_urls": image_urls({"workitem": item, "attachments": attachments}),
        "coverage": {
            "comments_returned": bool(comments),
            "attachments_returned": bool(attachments),
            "images_returned": bool(image_urls({"workitem": item, "attachments": attachments})),
        },
    }
    output_path = workspace_lumen_dir(context.workspace_root) / "context" / context.story_dir.name / "jira-context.json"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(snapshot, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return output_path, snapshot


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("docs_dir")
    parser.add_argument("--story", required=True)
    args = parser.parse_args()
    try:
        output_path, snapshot = capture(Path(args.docs_dir), args.story)
    except (OSError, ValueError, RuntimeError, json.JSONDecodeError) as exc:
        print(f"Error: {exc}", file=__import__("sys").stderr)
        return 1
    print(json.dumps({"path": str(output_path), "coverage": snapshot["coverage"]}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
