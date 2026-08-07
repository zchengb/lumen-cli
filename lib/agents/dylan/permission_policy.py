from __future__ import annotations

import json
from pathlib import Path
from typing import Any


SECURE_PERMISSIONS = {
    "permissions": {
        "allow": [
            "Read(**)",
            "Shell(lumen)",
            "Shell(git)",
            "Shell(rg)",
            "Shell(ls)",
            "Shell(cat)",
            "Shell(head)",
            "Shell(tail)",
            "Shell(find)",
            "Shell(wc)",
            "Shell(pytest)",
        ],
        "deny": [
            "Write(**)",
            "Delete(**)",
            "Read(**/.env*)",
            "Read(**/*.pem)",
            "Read(**/*.key)",
            "Write(**/.env*)",
            "Write(**/*.pem)",
            "Write(**/*.key)",
            "Shell(sudo)",
            "Shell(ssh)",
            "Shell(scp)",
            "Shell(rm)",
            "Shell(curl)",
            "Shell(wget)",
            "Shell(launchctl)",
            "Shell(osascript)",
            "Shell(python)",
            "Shell(python3)",
            "Shell(node)",
            "Shell(npm)",
            "Shell(pnpm)",
            "Shell(yarn)",
        ],
    }
}

# Backward-compatible alias
DEFAULT_PERMISSIONS = SECURE_PERMISSIONS


def write_permission_profile(workspace: Path, *, force: bool = True) -> Path:
    cursor_dir = Path(workspace).expanduser().resolve() / ".cursor"
    cursor_dir.mkdir(parents=True, exist_ok=True)
    path = cursor_dir / "cli.json"
    if force or not path.is_file():
        path.write_text(json.dumps(SECURE_PERMISSIONS, indent=2) + "\n", encoding="utf-8")
    return path


def validate_workspace_bound(session_workspace: str, resolved_workspace: Path) -> None:
    left = str(Path(session_workspace).expanduser().resolve())
    right = str(Path(resolved_workspace).expanduser().resolve())
    if left != right:
        raise RuntimeError(f"workspace mismatch for session: {left} != {right}")
