from __future__ import annotations

import json
import os
import subprocess
import threading
import uuid
from pathlib import Path
from typing import Any, Optional


def _docs_dir(workspace: Path) -> Path:
    root = Path(workspace).expanduser().resolve()
    if (root / "stories").is_dir():
        return root
    for child in ("docs", "mbpass-docs"):
        candidate = root / child
        if (candidate / "stories").is_dir():
            return candidate
    parent = root.parent
    if (parent / "stories").is_dir():
        return parent
    return root


def _find_story_dir(docs_dir: Path, story_ref: str) -> Optional[Path]:
    needle = str(story_ref or "").strip()
    if not needle:
        return None
    stories = docs_dir / "stories"
    if not stories.is_dir():
        return None
    direct = stories / needle
    if direct.is_dir():
        return direct
    upper = needle.upper()
    for path in stories.iterdir():
        if not path.is_dir():
            continue
        meta_path = path / "metadata.json"
        if meta_path.is_file():
            try:
                meta = json.loads(meta_path.read_text(encoding="utf-8"))
            except Exception:
                meta = {}
            if str(meta.get("jiraKey") or "").upper() == upper:
                return path
            if str(meta.get("storyId") or "").upper() == upper:
                return path
        if upper in path.name.upper():
            return path
    return None


def _load_progress(workspace_root: Path) -> dict[str, Any]:
    for candidate in (
        workspace_root / "lumen" / "results" / "delivery-progress.json",
        workspace_root / "results" / "delivery-progress.json",
    ):
        if candidate.is_file():
            try:
                data = json.loads(candidate.read_text(encoding="utf-8"))
                return data if isinstance(data, dict) else {}
            except Exception:
                return {}
    return {}


def _load_result(workspace_root: Path, run_id: str = "") -> dict[str, Any]:
    results_dirs = (
        workspace_root / "lumen" / "results",
        workspace_root / "results",
    )
    for results in results_dirs:
        path = results / "delivery-result.json"
        if path.is_file():
            try:
                data = json.loads(path.read_text(encoding="utf-8"))
                if isinstance(data, dict):
                    if not run_id or str(data.get("run_id") or "") == run_id:
                        return data
            except Exception:
                pass
        if run_id:
            named = results / f"{run_id}.json"
            if named.is_file():
                try:
                    data = json.loads(named.read_text(encoding="utf-8"))
                    if isinstance(data, dict):
                        return data
                except Exception:
                    pass
    return {}


class DeliveryActionAdapter:
    def readiness(self, *, workspace: Path, story: str) -> dict[str, Any]:
        docs = _docs_dir(workspace)
        story_dir = _find_story_dir(docs, story)
        if story_dir is None:
            return {
                "status": "not_ready",
                "code": "STORY_NOT_FOUND",
                "story_id": story,
                "message": f"Story not found for {story}",
            }
        meta_path = story_dir / "metadata.json"
        if not meta_path.is_file():
            return {
                "status": "not_ready",
                "code": "METADATA_MISSING",
                "story_id": story,
                "message": "metadata.json is missing",
            }
        try:
            metadata = json.loads(meta_path.read_text(encoding="utf-8"))
        except Exception as exc:
            return {
                "status": "not_ready",
                "code": "METADATA_INVALID",
                "story_id": story,
                "message": str(exc)[:200],
            }
        story_md = story_dir / "story.md"
        plan = story_dir / str(metadata.get("technicalPlanFile") or "technical-plan.md")
        if not story_md.is_file():
            return {
                "status": "not_ready",
                "code": "STORY_MISSING",
                "story_id": story,
                "message": "story.md is missing",
            }
        if not plan.is_file():
            return {
                "status": "not_ready",
                "code": "TECHNICAL_PLAN_MISSING",
                "story_id": story,
                "message": "technical-plan.md is missing",
            }
        if str(metadata.get("businessStatus") or "") != "ready":
            return {
                "status": "not_ready",
                "code": "BUSINESS_NOT_READY",
                "story_id": story,
                "message": f"businessStatus={metadata.get('businessStatus')}",
                "metadata": metadata,
            }
        if str(metadata.get("technicalStatus") or "") != "approved":
            return {
                "status": "not_ready",
                "code": "TECHNICAL_PLAN_NOT_APPROVED",
                "story_id": story,
                "message": f"technicalStatus={metadata.get('technicalStatus')}",
                "metadata": metadata,
            }
        repos = metadata.get("linkedRepos") if isinstance(metadata.get("linkedRepos"), list) else []
        if not repos:
            return {
                "status": "not_ready",
                "code": "REPOS_MISSING",
                "story_id": story,
                "message": "linkedRepos is empty",
            }
        return {
            "status": "ready",
            "code": "READY",
            "story_id": str(metadata.get("jiraKey") or story),
            "story_dir": str(story_dir),
            "repositories": repos,
            "metadata": {
                "businessStatus": metadata.get("businessStatus"),
                "technicalStatus": metadata.get("technicalStatus"),
                "jiraKey": metadata.get("jiraKey"),
            },
        }

    def status(self, *, workspace: Path, story: str = "", run_id: str = "") -> dict[str, Any]:
        root = Path(workspace).expanduser().resolve()
        workspace_root = root.parent if root.name in {"lumen", ".lumen"} else root
        progress = _load_progress(workspace_root)
        result = _load_result(workspace_root, run_id=run_id)
        return {
            "status": "ok",
            "story_id": story or progress.get("jira_key") or progress.get("story_id") or "",
            "run_id": run_id or progress.get("run_id") or result.get("run_id") or "",
            "delivery_status": progress.get("delivery_status") or result.get("status") or "unknown",
            "progress": progress,
            "result": result,
        }

    def result(self, *, workspace: Path, run_id: str = "") -> dict[str, Any]:
        root = Path(workspace).expanduser().resolve()
        workspace_root = root.parent if root.name in {"lumen", ".lumen"} else root
        payload = _load_result(workspace_root, run_id=run_id)
        if not payload:
            return {"status": "not_found", "code": "RESULT_NOT_FOUND", "run_id": run_id}
        return {"status": "ok", "run_id": run_id or payload.get("run_id"), "result": payload}

    def start(
        self,
        *,
        workspace: Path,
        story: str,
        actor: str = "",
        source_message_id: str = "",
        trace_id: str = "",
        dry_run: bool = False,
    ) -> dict[str, Any]:
        ready = self.readiness(workspace=workspace, story=story)
        if ready.get("status") != "ready":
            return {
                "status": "blocked",
                "code": ready.get("code") or "NOT_READY",
                "story_id": story,
                "message": ready.get("message") or "Story is not ready for delivery",
                "readiness": ready,
            }
        docs = _docs_dir(workspace)
        run_id = f"delivery-{uuid.uuid4().hex[:12]}"
        env = os.environ.copy()
        if dry_run:
            env["LUMEN_DRY_RUN"] = "1"
        if actor:
            env["LUMEN_DELIVERY_ACTOR"] = actor
        if source_message_id:
            env["LUMEN_DELIVERY_SOURCE_MESSAGE_ID"] = source_message_id
        if trace_id:
            env["LUMEN_DELIVERY_TRACE_ID"] = trace_id
        env["LUMEN_DELIVERY_RUN_ID"] = run_id
        lumen_bin = env.get("LUMEN_CLI_BIN") or str(Path.home() / ".local" / "bin" / "lumen")
        cmd = [lumen_bin, "delivery", "run", "--story", story, str(docs)]
        if dry_run:
            cmd.insert(3, "--dry-run")

        def _bg() -> None:
            try:
                subprocess.run(cmd, env=env, check=False, capture_output=True, text=True)
            except Exception:
                pass

        threading.Thread(target=_bg, daemon=True).start()
        return {
            "status": "started",
            "run_id": run_id,
            "story_id": ready.get("story_id") or story,
            "workspace": str(docs),
            "repositories": ready.get("repositories") or [],
            "dry_run": dry_run,
            "actor": actor,
            "source_message_id": source_message_id,
            "trace_id": trace_id,
            "next_poll_after_seconds": 5,
        }

    def cancel(self, *, workspace: Path, run_id: str, actor: str = "") -> dict[str, Any]:
        return {
            "status": "unsupported",
            "code": "CANCEL_NOT_IMPLEMENTED",
            "run_id": run_id,
            "message": "Cancel is not implemented in Mark M1.0; stop the delivery process manually if needed.",
            "actor": actor,
        }
