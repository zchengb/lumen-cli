#!/usr/bin/env python3
from __future__ import annotations

import argparse
import datetime as dt
import shutil
import sys
from pathlib import Path


def template_root() -> Path:
    return Path(__file__).resolve().parents[1] / "templates" / "delivery-docs"


def story_slug(example_key: str) -> str:
    return "mini-web-welcome"


def render_text(text: str, values: dict[str, str]) -> str:
    rendered = text
    for key, value in values.items():
        rendered = rendered.replace(f"__{key}__", value)
    return rendered


def copy_rendered(src: Path, dest: Path, values: dict[str, str], force: bool) -> None:
    if dest.exists() and not force:
        raise FileExistsError(f"Refusing to overwrite existing file: {dest}")
    dest.parent.mkdir(parents=True, exist_ok=True)
    if src.suffix.lower() in {".md", ".json", ".txt", ".mdc"} or src.name in {"AGENTS.md", ".gitignore"}:
        dest.write_text(render_text(src.read_text(encoding="utf-8"), values), encoding="utf-8")
    else:
        shutil.copy2(src, dest)


def init_docs(target: Path, project_name: str, example_key: str, force: bool) -> None:
    src_root = template_root()
    if not src_root.exists():
        raise FileNotFoundError(f"Delivery docs templates not found: {src_root}")

    target = target.expanduser().resolve()
    docs_root = target
    if target.exists() and any(target.iterdir()) and not force:
        raise FileExistsError(f"Target is not empty: {target}. Re-run with --force to merge/overwrite templates.")
    target.mkdir(parents=True, exist_ok=True)

    values = {
        "PROJECT_NAME": project_name,
        "JIRA_KEY": example_key,
        "STORY_SLUG": story_slug(example_key),
        "TODAY": dt.datetime.now().strftime("%Y-%m-%d"),
        "WORKSPACE_ROOT": str(docs_root),
        "DOCS_ROOT": str(docs_root),
        "DOCS_REPO_NAME": ".",
    }

    for src in src_root.rglob("*"):
        if src.is_dir():
            continue
        rel = render_text(str(src.relative_to(src_root)), values)
        dest = target / rel
        copy_rendered(src, dest, values, force)

    for keep_dir in [
        target / "topics",
        target / "stories",
        target / "repos",
        docs_root / ".lumen" / "config",
        docs_root / ".lumen" / "worktrees",
        docs_root / ".lumen" / "results",
        docs_root / ".lumen" / "logs" / "delivery",
    ]:
        keep_dir.mkdir(parents=True, exist_ok=True)
        (keep_dir / ".gitkeep").touch()

    print(f"✓ Initialized delivery docs project: {target}")
    print(f"✓ Workspace root: {docs_root}")
    print(f"✓ Code repositories directory: {target / 'repos'}")
    print(f"✓ Workspace config: {docs_root / '.lumen' / 'config' / 'workspace.json'}")
    print(f"✓ Example story: stories/{story_slug(example_key)}/")
    print("Next:")
    print(f"  cd {target}")
    print("  Add repositories under repos/ or run the interactive repo setup from lumen set-up-docs")
    print("  git init  # optional, recommended for team sharing")


def main() -> int:
    parser = argparse.ArgumentParser(description="Initialize a Lumen delivery docs project.")
    parser.add_argument("--target", required=True)
    parser.add_argument("--project-name", default="Delivery Docs")
    parser.add_argument("--example-key", default="DEMO-001")
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()
    try:
        init_docs(Path(args.target), args.project_name, args.example_key, args.force)
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
