#!/usr/bin/env python3
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path


def load_json(path: Path, fallback):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return fallback


def iso_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def main() -> int:
    workspace = Path(sys.argv[1] if len(sys.argv) > 1 else os.environ.get("LUMEN_WORKSPACE", "")).resolve()
    run_id = (
        sys.argv[2]
        if len(sys.argv) > 2
        else iso_now().replace("-", "").replace(":", "").replace("T", "-")[:15]
    )

    if not workspace.exists():
        sys.stderr.write("Usage: dry_run_scan.py <workspace-dir> [run-id]\n")
        return 1

    common = load_json(workspace / "config" / "common.json", {})
    repos = load_json(workspace / "config" / "repos.json", {"repositories": []})
    results_dir = workspace / common.get("paths", {}).get("results_dir", "results")
    state_dir = workspace / common.get("paths", {}).get("state_dir", "state")
    registry_path = state_dir / "issue-registry.json"
    registry = load_json(registry_path, {"schema_version": "1.0", "issues": []})
    scan_window_days = common.get("execution", {}).get("scan_window_days", 7)
    project_name = common.get("project", {}).get("display_name") or workspace.name
    started_at = iso_now()

    results_dir.mkdir(parents=True, exist_ok=True)

    repository_list = repos.get("repositories", []) if isinstance(repos.get("repositories"), list) else []
    if repository_list:
        findings = []
        for index, repo in enumerate(repository_list):
            findings.append(
                {
                    "title": f"[Dry-run] Sample review finding in {repo.get('name', 'unknown')}",
                    "severity": "High" if index == 0 else "Low",
                    "repository": repo.get("name", "unknown"),
                    "impact": "Dry-run mock finding used to verify the Lumen pipeline without running the Cursor agent.",
                    "trigger": "This is not a real security issue. It exists only to validate report, dashboard, and notification wiring.",
                    "file": "src/example/DryRunSample.java",
                    "line_range": "1-3",
                    "code_snippet": "// dry-run placeholder",
                    "suggestion": "No action required. Re-run without --dry-run for a real scan.",
                    "pr_url": None,
                    "issue_id": f"ISSUE-dryrun-{index + 1:03d}",
                    "issue_status": "open",
                }
            )
    else:
        findings = [
            {
                "title": "[Dry-run] No repositories configured",
                "severity": "Low",
                "repository": "none",
                "impact": "Dry-run completed, but config/repos.json has no repositories to mock.",
                "trigger": "Add repositories to config/repos.json, then re-run the dry-run.",
                "file": "config/repos.json",
                "line_range": "1-1",
                "code_snippet": '{ "repositories": [] }',
                "suggestion": "Edit config/repos.json and add at least one repository.",
                "pr_url": None,
                "issue_id": "ISSUE-dryrun-001",
                "issue_status": "open",
            }
        ]

    open_issues = sum(
        1
        for issue in registry.get("issues", [])
        if issue.get("status") in {"open", "in_progress", "pr_open"}
    )

    scan = {
        "scan_status": "completed_with_findings",
        "dry_run": True,
        "scan_window": f"Last {scan_window_days} Days (dry-run)",
        "project_name": project_name,
        "started_at": started_at,
        "finished_at": iso_now(),
        "repositories_scanned": len(repository_list),
        "repositories_failed": 0,
        "findings": findings,
        "issue_registry": {
            "path": str(registry_path),
            "new_issues": 0,
            "existing_open_issues": open_issues,
            "stale_open_issues": 0,
            "pr_open_issues": 0,
            "resolved_issues": 0,
        },
        "prs": [],
        "failures": [],
        "validation_results": [
            {
                "repository": repo.get("name", "unknown"),
                "status": "skipped",
                "reason": "Dry-run: Cursor agent was not executed",
            }
            for repo in repository_list
        ],
        "worktree_notes": [
            {
                "repository": repo.get("name", "unknown"),
                "note": "Dry-run: no git worktree changes were made",
            }
            for repo in repository_list
        ],
        "feishu": {"status": "dry_run_skipped", "error": None},
        "report": {"status": "pending", "html_path": None, "pdf_path": None, "error": None},
    }

    archived_name = f"scan-result-{run_id}.json"
    archived_path = results_dir / archived_name
    latest_path = results_dir / "scan-result.json"
    payload = json.dumps(scan, indent=2) + "\n"
    archived_path.write_text(payload, encoding="utf-8")
    latest_path.write_text(payload, encoding="utf-8")

    sys.stdout.write(
        json.dumps(
            {
                "archived_path": str(archived_path),
                "latest_path": str(latest_path),
                "findings": len(findings),
                "repositories": len(repository_list),
            }
        )
        + "\n"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
