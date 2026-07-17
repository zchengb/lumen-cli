#!/usr/bin/env python3
"""Serialize delivery runs per docs workspace."""

from __future__ import annotations

import json
import os
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterator


class DeliveryLockError(RuntimeError):
    pass


def utc_now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def process_alive(pid: int) -> bool:
    if pid <= 0:
        return False
    try:
        os.kill(pid, 0)
    except OSError:
        return False
    return True


def read_lock_metadata(lock_dir: Path) -> dict:
    meta_path = lock_dir / "lock.json"
    if not meta_path.is_file():
        return {}
    try:
        payload = json.loads(meta_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return {}
    return payload if isinstance(payload, dict) else {}


def lock_error_message(lock_dir: Path, docs_dir: Path) -> str:
    meta = read_lock_metadata(lock_dir)
    message = (
        f"another Lumen delivery run is already active for this docs workspace. "
        f"Check `lumen delivery status {docs_dir}`."
    )
    pid = meta.get("pid")
    if isinstance(pid, int) and pid > 0:
        state = "running" if process_alive(pid) else "not running (stale lock)"
        message += f" Lock pid={pid} ({state})."
    started_at = meta.get("started_at")
    story = meta.get("story")
    if started_at:
        message += f" Started at {started_at}."
    if story:
        message += f" Story={story}."
    return message


@contextmanager
def delivery_lock(lock_dir: Path, *, docs_dir: Path, story: str) -> Iterator[None]:
    lock_dir.parent.mkdir(parents=True, exist_ok=True)
    try:
        lock_dir.mkdir()
    except FileExistsError as exc:
        raise DeliveryLockError(lock_error_message(lock_dir, docs_dir)) from exc

    meta_path = lock_dir / "lock.json"
    meta_path.write_text(
        json.dumps(
            {"pid": os.getpid(), "started_at": utc_now(), "story": story},
            indent=2,
            ensure_ascii=False,
        )
        + "\n",
        encoding="utf-8",
    )
    try:
        yield
    finally:
        meta_path.unlink(missing_ok=True)
        try:
            lock_dir.rmdir()
        except OSError:
            pass
