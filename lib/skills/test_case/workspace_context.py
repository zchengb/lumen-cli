from __future__ import annotations

from pathlib import Path
from typing import Any


def load_workspace_context(*, workspace: Path | None, issue_key: str) -> dict[str, Any]:
    root = Path(workspace).expanduser().resolve() if workspace else None
    payload: dict[str, Any] = {
        "technical_plan": "",
        "related_tests": [],
        "related_sources": [],
    }
    if root is None or not root.is_dir():
        return payload
    story_dirs = [
        root / "stories" / issue_key,
        root / "stories" / issue_key.upper(),
        root / "stories" / issue_key.lower(),
    ]
    for story_dir in story_dirs:
        plan = story_dir / "technical-plan.md"
        if plan.is_file():
            payload["technical_plan"] = plan.read_text(encoding="utf-8")[:8000]
            break
    tests_root = root / "tests"
    if tests_root.is_dir():
        for path in sorted(tests_root.rglob("test_*.py"))[:8]:
            payload["related_tests"].append(str(path.relative_to(root)))
    src_candidates = [root / "src", root / "lib", root / "app"]
    for src in src_candidates:
        if not src.is_dir():
            continue
        for path in sorted(src.rglob("*.py"))[:8]:
            payload["related_sources"].append(str(path.relative_to(root)))
        break
    return payload
