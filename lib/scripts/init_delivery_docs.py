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
    return f"{example_key}-mini-web-welcome".replace("_", "-")


def render_text(text: str, values: dict[str, str]) -> str:
    rendered = text
    for key, value in values.items():
        rendered = rendered.replace(f"__{key}__", value)
    return rendered


def copy_rendered(src: Path, dest: Path, values: dict[str, str], force: bool) -> None:
    if dest.exists() and not force:
        raise FileExistsError(f"Refusing to overwrite existing file: {dest}")
    dest.parent.mkdir(parents=True, exist_ok=True)
    if src.suffix.lower() in {".md", ".json", ".txt", ".mdc"} or src.name == "AGENTS.md":
        dest.write_text(render_text(src.read_text(encoding="utf-8"), values), encoding="utf-8")
    else:
        shutil.copy2(src, dest)


def init_docs(target: Path, project_name: str, example_key: str, force: bool) -> None:
    src_root = template_root()
    if not src_root.exists():
        raise FileNotFoundError(f"Delivery docs templates not found: {src_root}")

    target = target.expanduser().resolve()
    if target.exists() and any(target.iterdir()) and not force:
        raise FileExistsError(f"Target is not empty: {target}. Re-run with --force to merge/overwrite templates.")
    target.mkdir(parents=True, exist_ok=True)

    values = {
        "PROJECT_NAME": project_name,
        "JIRA_KEY": example_key,
        "STORY_SLUG": story_slug(example_key),
        "TODAY": dt.datetime.now().strftime("%Y-%m-%d"),
    }

    for src in src_root.rglob("*"):
        if src.is_dir():
            continue
        rel = render_text(str(src.relative_to(src_root)), values)
        copy_rendered(src, target / rel, values, force)

    for keep_dir in [
        target / "stories",
        target / "standards" / "repos",
        target / ".lumen" / "logs" / "delivery",
    ]:
        keep_dir.mkdir(parents=True, exist_ok=True)
        (keep_dir / ".gitkeep").touch()

    print(f"✓ Initialized delivery docs project: {target}")
    print(f"✓ Example story: stories/{story_slug(example_key)}/")
    print("Next:")
    print(f"  cd {target}")
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
