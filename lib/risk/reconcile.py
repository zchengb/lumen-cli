from __future__ import annotations

import re
from pathlib import Path
from typing import Any, Optional

from risk.registry_mirror import sync_registry_status_from_finding
from risk.status_display import dashboard_status
from risk.store import RiskStore


def _norm_title(value: str) -> str:
    return re.sub(r"\s+", " ", str(value or "").strip().lower())


def _load_findings(workspace: Path, project_slug: str = "") -> list[dict[str, Any]]:
    store = RiskStore(workspace)
    try:
        slug = str(project_slug or "").strip()
        if not slug:
            common_path = Path(workspace) / "config" / "common.json"
            if common_path.is_file():
                import json

                common = json.loads(common_path.read_text(encoding="utf-8"))
                project = common.get("project") if isinstance(common.get("project"), dict) else {}
                slug = str(project.get("slug") or "").strip()
        if not slug:
            return [dict(row) for row in store.fetchall("SELECT * FROM finding ORDER BY current_risk_score DESC")]
        return [dict(row) for row in store.list_findings(slug)]
    finally:
        store.close()


def _match_issue(finding: dict[str, Any], issues: list[dict[str, Any]]) -> Optional[dict[str, Any]]:
    registry_issue_id = str(finding.get("registry_issue_id") or "").strip()
    if registry_issue_id:
        for issue in issues:
            if str(issue.get("id") or "") == registry_issue_id:
                return issue
    finding_id = str(finding.get("id") or "").strip()
    if finding_id:
        for issue in issues:
            if str(issue.get("risk_finding_id") or "") == finding_id:
                return issue
    fingerprint = str(finding.get("canonical_fingerprint") or "").strip()
    if fingerprint:
        for issue in issues:
            if str(issue.get("canonical_fingerprint") or "").strip() == fingerprint:
                return issue
    repo = str(finding.get("repository") or "").strip().lower()
    title = _norm_title(str(finding.get("title") or ""))
    if repo and title:
        for issue in issues:
            if str(issue.get("repository") or "").strip().lower() != repo:
                continue
            if _norm_title(str(issue.get("title") or "")) == title:
                return issue
    return None


def _normalize_registry_status(status: str) -> str:
    current = str(status or "").strip().lower()
    if current in {"in_progress", "pr_open", "reopened"}:
        return "open"
    if current in {"accepted_risk", "false_positive"}:
        return "resolved"
    return current


def reconcile_project(
    workspace: Path,
    *,
    project_slug: str = "",
    repair: bool = False,
) -> dict[str, Any]:
    root = Path(workspace).expanduser().resolve()
    import sys

    scripts_dir = Path(__file__).resolve().parents[1] / "scripts"
    if str(scripts_dir) not in sys.path:
        sys.path.insert(0, str(scripts_dir))
    from issue_registry import load_registry

    registry = load_registry(root)
    issues = [item for item in registry.get("issues", []) if isinstance(item, dict)]
    findings = _load_findings(root, project_slug=project_slug)

    mismatched: list[dict[str, Any]] = []
    repaired: list[dict[str, Any]] = []
    unmapped: list[dict[str, Any]] = []
    matched = 0

    for finding in findings:
        issue = _match_issue(finding, issues)
        if issue is None:
            unmapped.append({"finding_id": finding.get("id"), "title": finding.get("title")})
            continue
        matched += 1
        desired = dashboard_status(finding)
        desired_mirror = "open" if desired == "reopened" else desired
        current_norm = _normalize_registry_status(str(issue.get("status") or ""))
        if current_norm == desired_mirror:
            continue
        row = {
            "finding_id": finding.get("id"),
            "issue_id": issue.get("id"),
            "risk_status": desired,
            "registry_status": issue.get("status"),
            "desired_mirror": desired_mirror,
        }
        mismatched.append(row)
        if repair:
            result = sync_registry_status_from_finding(root, finding)
            repaired.append({**row, "repair": result})

    return {
        "project": project_slug,
        "checked": len(findings),
        "matched": matched,
        "mismatched": len(mismatched),
        "repaired": len(repaired),
        "unmapped": unmapped,
        "mismatches": mismatched,
        "repairs": repaired,
    }
