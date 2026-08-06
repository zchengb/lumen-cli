from __future__ import annotations

import logging
from pathlib import Path
from typing import Any

from risk.status_display import dashboard_status

_LOG = logging.getLogger("lumen.risk.registry_mirror")


def sync_registry_status_from_finding(workspace: Path, finding: dict[str, Any]) -> dict[str, Any]:
    import sys

    scripts_dir = Path(__file__).resolve().parents[1] / "scripts"
    if str(scripts_dir) not in sys.path:
        sys.path.insert(0, str(scripts_dir))
    from issue_registry import find_issue, load_registry, set_issue_status, write_json, registry_path, utc_now

    root = Path(workspace).expanduser().resolve()
    finding_id = str(finding.get("id") or "").strip()
    registry_issue_id = str(finding.get("registry_issue_id") or "").strip()
    target_status = dashboard_status(finding)
    if target_status not in {"open", "resolved", "reopened", "ignored"}:
        return {"status": "skipped", "reason": "unsupported_status", "finding_id": finding_id}

    mirror_status = "open" if target_status == "reopened" else target_status
    registry = load_registry(root)
    issue = None
    if registry_issue_id:
        issue = find_issue(registry, registry_issue_id)
    if issue is None and finding_id:
        for item in registry.get("issues", []):
            if not isinstance(item, dict):
                continue
            if str(item.get("risk_finding_id") or "") == finding_id:
                issue = item
                break
    if issue is None:
        return {"status": "unmapped", "finding_id": finding_id, "registry_issue_id": registry_issue_id}

    issue_id = str(issue.get("id") or "")
    try:
        set_issue_status(
            root,
            issue_id,
            mirror_status,
            reason=str(finding.get("resolution_basis") or finding.get("verification_status") or ""),
        )
        path = registry_path(root)
        reg = load_registry(root)
        for item in reg.get("issues", []):
            if not isinstance(item, dict) or str(item.get("id")) != issue_id:
                continue
            item["risk_finding_id"] = finding_id
            if target_status == "reopened":
                item["reopened_from_risk"] = True
            else:
                item.pop("reopened_from_risk", None)
            break
        reg["updated_at"] = utc_now()
        write_json(path, reg)
        _LOG.info(
            "registry.status.synced finding=%s issue=%s mirror=%s",
            finding_id,
            issue_id,
            mirror_status,
        )
        return {
            "status": "synced",
            "issue_id": issue_id,
            "mirror_status": mirror_status,
            "finding_id": finding_id,
        }
    except Exception as exc:
        _LOG.warning("registry.status.sync_failed finding=%s issue=%s err=%s", finding_id, issue_id, exc)
        return {
            "status": "error",
            "code": "registry_sync_failed",
            "message": str(exc)[:300],
            "finding_id": finding_id,
        }
