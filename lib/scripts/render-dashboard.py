#!/usr/bin/env python3
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path


def load_json(path: Path, default):
    try:
        with path.open(encoding="utf-8") as handle:
            return json.load(handle)
    except Exception:
        return default


def normalize_title(text) -> str:
    value = re.sub(r"[^a-z0-9]+", "-", str(text or "").lower())
    return value.strip("-")


def issue_file_path(issue: dict) -> str:
    if issue.get("file"):
        return issue["file"]
    fingerprint = issue.get("fingerprint") or ""
    if fingerprint and not re.fullmatch(r"[a-f0-9]{64}", fingerprint):
        parts = fingerprint.split(":")
        if len(parts) >= 2:
            return parts[1]
    return ""


def issue_match_key(issue: dict) -> str:
    repo = issue.get("repository") or ""
    file_path = issue_file_path(issue)
    if repo and file_path:
        return f"{repo}|{file_path}"
    title = normalize_title(issue.get("title"))
    if repo and title:
        return f"{repo}|{title}"
    return issue.get("id") or ""


def deduplicate_issues(issues: list) -> list:
    groups = {}
    for issue in issues:
        key = issue_match_key(issue)
        groups.setdefault(key, []).append(issue)

    merged = []
    for group in groups.values():
        if len(group) == 1:
            merged.append(group[0])
            continue
        best = sorted(
            group,
            key=lambda item: (
                1 if str(item.get("id", "")).startswith("ISSUE-") else 0,
                str(item.get("last_seen_at") or ""),
            ),
            reverse=True,
        )[0]
        merged.append(best)
    return merged


def severity_counts(findings):
    counts = {"High": 0, "Medium": 0, "Low": 0}
    for finding in findings or []:
        severity = finding.get("severity", "Low")
        counts[severity] = counts.get(severity, 0) + 1
    return counts


def rel(root: Path, path) -> str:
    if not path:
        return ""
    try:
        return str(Path(path).resolve().relative_to(root.resolve()))
    except Exception:
        value = str(path)
        if value.startswith("http://") or value.startswith("https://"):
            return value
        return value


def main() -> int:
    workspace_arg = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("LUMEN_WORKSPACE", ".")
    root = Path(workspace_arg).resolve()
    common = load_json(root / "config" / "common.json", {})
    repos = load_json(root / "config" / "repos.json", {"repositories": []})
    registry = load_json(root / "state" / "issue-registry.json", {"issues": []})
    product = common.get("product", {})
    results_dir = root / common.get("paths", {}).get("results_dir", "results")
    logs_dir = root / common.get("paths", {}).get("logs_dir", "logs")
    data_path = root / "dashboard-data.js"

    runs = []
    latest_run = None
    latest_path = results_dir / "scan-result.json"
    latest_data = load_json(latest_path, {})
    if latest_data:
        latest_run = {
            "id": latest_path.stem,
            "finished_at": latest_data.get("finished_at", ""),
            "status": latest_data.get("scan_status", ""),
            "findings": latest_data.get("findings", []),
        }

    for path in sorted(results_dir.glob("scan-result-*.json"), reverse=True):
        data = load_json(path, {})
        if not data:
            continue
        counts = severity_counts(data.get("findings", []))
        report = data.get("report", {})
        run = {
            "id": path.stem,
            "started_at": data.get("started_at", ""),
            "finished_at": data.get("finished_at", ""),
            "status": data.get("scan_status", ""),
            "repos": data.get("repositories_scanned", 0),
            "high": counts["High"],
            "medium": counts["Medium"],
            "low": counts["Low"],
            "prs": len(data.get("prs", [])),
            "html": rel(root, report.get("html_path")),
            "pdf": rel(root, report.get("pdf_path")),
            "json": rel(root, path),
            "feishu": data.get("feishu", {}).get("status", ""),
            "failures": len(data.get("failures", [])),
            "findings": data.get("findings", []),
        }
        runs.append(run)
        if latest_run is None:
            latest_run = {
                "id": run["id"],
                "finished_at": run["finished_at"],
                "status": run["status"],
                "findings": run["findings"],
            }

    issues = deduplicate_issues(registry.get("issues", []))
    issue_counts = {}
    for issue in issues:
        status = issue.get("status", "unknown")
        issue_counts[status] = issue_counts.get(status, 0) + 1

    logs = [
        {"name": path.name, "href": rel(root, path)}
        for path in sorted(logs_dir.glob("*.log"), reverse=True)[:10]
    ]

    payload = {
        "generated_at": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        "product": {
            "name": product.get("name", "Lumen"),
            "tagline": product.get("tagline", "Illuminate code health across your repositories"),
            "codename": product.get("codename", "lumen"),
        },
        "config": common,
        "repositories": repos.get("repositories", []),
        "runs": runs,
        "latest_run": latest_run,
        "issues": issues,
        "issue_counts": issue_counts,
        "logs": logs,
    }

    js_text = "window.DASHBOARD_DATA = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n"
    data_path.write_text(js_text, encoding="utf-8")
    print(data_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
