from __future__ import annotations

import json
from pathlib import Path
from typing import Any


DEFAULT_PERMISSIONS = {
    "permissions": {
        "allow": [
            "Read(**)",
            "Write(**)",
            "Shell(git)",
            "Shell(lumen)",
            "Shell(pytest)",
            "Shell(npm)",
            "Shell(pnpm)",
            "Shell(yarn)",
            "Shell(gradle)",
            "Shell(./gradlew)",
            "Shell(python)",
            "Shell(python3)",
        ],
        "deny": [
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
        ],
    }
}


def write_permission_profile(workspace: Path) -> Path:
    cursor_dir = Path(workspace).expanduser().resolve() / ".cursor"
    cursor_dir.mkdir(parents=True, exist_ok=True)
    path = cursor_dir / "cli.json"
    if not path.is_file():
        path.write_text(json.dumps(DEFAULT_PERMISSIONS, indent=2) + "\n", encoding="utf-8")
    return path


def validate_workspace_bound(session_workspace: str, resolved_workspace: Path) -> None:
    left = str(Path(session_workspace).expanduser().resolve())
    right = str(Path(resolved_workspace).expanduser().resolve())
    if left != right:
        raise RuntimeError(f"workspace mismatch for session: {left} != {right}")
