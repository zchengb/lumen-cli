#!/usr/bin/env python3
import json
import sys
from pathlib import Path


def main() -> int:
    if len(sys.argv) != 2:
        sys.stderr.write("Usage: workspace_configured.py <workspace-dir>\n")
        return 2
    root = Path(sys.argv[1])
    common_path = root / "config" / "common.json"
    if not common_path.exists():
        return 1
    try:
        common = json.loads(common_path.read_text(encoding="utf-8"))
        name = str((common.get("project") or {}).get("display_name") or "").strip()
        workspace_root = str((common.get("project") or {}).get("workspace_root") or "").strip()
        return 0 if name and workspace_root else 1
    except Exception:
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
