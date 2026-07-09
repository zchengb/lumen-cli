#!/usr/bin/env python3
import hashlib
import html
import json
import os
import re
import shutil
import subprocess
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, Optional, Tuple
SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

from jira_sync import sync_jira_issues


SECRET_PATTERNS = [
    re.compile(r"gh[pousr]_[A-Za-z0-9_]{20,}"),
    re.compile(r"https://open\.feishu\.cn/open-apis/bot/v2/hook/[A-Za-z0-9._-]+"),
    re.compile(r"(?i)(password\s*[=:]\s*)['\"][^'\"]{6,}['\"]"),
    re.compile(r"(?i)(token\s*[=:]\s*)['\"][^'\"]{8,}['\"]"),
    re.compile(r"(?i)(secret\s*[=:]\s*)['\"][^'\"]{8,}['\"]"),
    re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----.*?-----END [A-Z ]*PRIVATE KEY-----", re.S),
]


def redact(text) -> str:
    value = "" if text is None else str(text)
    for pattern in SECRET_PATTERNS:
        if pattern.pattern.startswith("(?i)("):
            value = pattern.sub(lambda m: f"{m.group(1)}\"[REDACTED]\"", value)
        else:
            value = pattern.sub("[REDACTED]", value)
    return value


def load_json(path: Path, default: dict) -> dict:
    if not path.exists():
        return default
    with path.open(encoding="utf-8") as handle:
        return json.load(handle)


def write_json(path: Path, data: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as handle:
        json.dump(data, handle, indent=2, ensure_ascii=False)
        handle.write("\n")


def get_scan_window_days(common: dict) -> int:
    execution = common.get("execution", {})
    if not isinstance(execution, dict):
        return 7
    try:
        days = int(execution.get("scan_window_days", 7))
    except (TypeError, ValueError):
        return 7
    return max(days, 1)


def parse_iso_datetime(value: str) -> Optional[datetime]:
    raw = str(value or "").strip()
    if not raw:
        return None
    if raw.endswith("Z"):
        raw = raw[:-1] + "+00:00"
    try:
        parsed = datetime.fromisoformat(raw)
    except ValueError:
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def finding_within_scan_window(
    finding: dict,
    scan_window_days: int,
    reference: datetime,
) -> bool:
    for field in ("commit_date", "source_date", "introduced_at", "change_date"):
        raw = finding.get(field)
        if not raw:
            continue
        parsed = parse_iso_datetime(str(raw))
        if parsed is None:
            continue
        age_days = (reference - parsed).days
        if age_days > scan_window_days:
            return False
    return True


def apply_scan_window_policy(scan: dict, common: dict) -> dict:
    scan_window_days = get_scan_window_days(common)
    scan["scan_window"] = f"Last {scan_window_days} Days"
    reference = parse_iso_datetime(str(scan.get("started_at", ""))) or datetime.now(timezone.utc)
    findings = scan.get("findings", [])
    if not isinstance(findings, list):
        findings = []
    kept: list = []
    excluded = 0
    for finding in findings:
        if not isinstance(finding, dict):
            continue
        if finding_within_scan_window(finding, scan_window_days, reference):
            kept.append(finding)
        else:
            excluded += 1
    scan["findings"] = kept
    scan["excluded_findings_outside_scan_window"] = excluded
    return scan


def severity_counts(findings: list) -> dict:
    counts = {"High": 0, "Medium": 0, "Low": 0}
    for finding in findings:
        severity = finding.get("severity", "Low")
        counts[severity] = counts.get(severity, 0) + 1
    return counts


def normalize(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def issue_fingerprint(finding: dict) -> str:
    trigger_hash = hashlib.sha256(redact(finding.get("trigger", "")).encode("utf-8")).hexdigest()[:12]
    raw = "|".join(
        [
            finding.get("repository", ""),
            finding.get("file", ""),
            normalize(finding.get("title", "")),
            finding.get("severity", ""),
            trigger_hash,
        ]
    )
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


def issue_file_path(item: dict) -> str:
    file_path = item.get("file", "")
    if file_path:
        return file_path
    fingerprint = item.get("fingerprint", "")
    if fingerprint and not re.fullmatch(r"[a-f0-9]{64}", fingerprint or ""):
        parts = fingerprint.split(":")
        if len(parts) >= 2:
            return parts[1]
    return ""


def issue_match_key(item: dict) -> str:
    repo = item.get("repository", "")
    file_path = issue_file_path(item)
    if repo and file_path:
        return f"{repo}|{file_path}"
    title = normalize(item.get("title", ""))
    if repo and title:
        return f"{repo}|{title}"
    legacy = legacy_fingerprint_key(item.get("fingerprint", ""))
    if legacy:
        return legacy
    return item.get("fingerprint") or item.get("id") or ""


def legacy_fingerprint_key(fingerprint: str) -> str:
    if not fingerprint or re.fullmatch(r"[a-f0-9]{64}", fingerprint or ""):
        return ""
    parts = fingerprint.split(":")
    if len(parts) >= 3:
        return f"{parts[0]}|{parts[1]}|{normalize(parts[2])}"
    return ""


def merge_issue_entries(primary: dict, secondary: dict) -> dict:
    merged = dict(primary)
    for field in [
        "file",
        "line_range",
        "impact",
        "trigger",
        "suggestion",
        "pr_url",
        "pr_branch",
        "root_cause",
        "validation",
        "jira_key",
        "jira_url",
        "jira_synced_at",
    ]:
        if not merged.get(field) and secondary.get(field):
            merged[field] = secondary[field]
    if secondary.get("first_seen_at") and (
        not merged.get("first_seen_at") or secondary["first_seen_at"] < merged["first_seen_at"]
    ):
        merged["first_seen_at"] = secondary["first_seen_at"]
    if secondary.get("last_seen_at") and (
        not merged.get("last_seen_at") or secondary["last_seen_at"] > merged["last_seen_at"]
    ):
        merged["last_seen_at"] = secondary["last_seen_at"]
    if secondary.get("status") == "pr_open" and merged.get("status") in {"open", "in_progress"}:
        merged["status"] = "pr_open"
    return merged


def normalize_issue_id(issue: dict) -> str:
    issue_id = issue.get("id", "")
    if str(issue_id).startswith("ISSUE-"):
        return issue_id
    fingerprint = issue.get("fingerprint", "")
    if re.fullmatch(r"[a-f0-9]{64}", fingerprint or ""):
        return f"ISSUE-{fingerprint[:10]}"
    key = issue_match_key(issue)
    if key:
        return f"ISSUE-{hashlib.sha256(key.encode('utf-8')).hexdigest()[:10]}"
    return f"ISSUE-{hashlib.sha256(str(issue_id).encode('utf-8')).hexdigest()[:10]}"


def deduplicate_registry(issues: list) -> list:
    groups = {}
    for issue in issues:
        key = issue_match_key(issue)
        if not key:
            key = issue.get("fingerprint") or issue.get("id") or str(id(issue))
        groups.setdefault(key, []).append(issue)

    merged_issues = []
    for group in groups.values():
        if len(group) == 1:
            issue = dict(group[0])
            issue["id"] = normalize_issue_id(issue)
            merged_issues.append(issue)
            continue

        best = sorted(
            group,
            key=lambda item: (
                1 if str(item.get("id", "")).startswith("ISSUE-") else 0,
                len([field for field in item if item.get(field) not in (None, "")]),
                item.get("last_seen_at", ""),
            ),
            reverse=True,
        )[0]
        combined = dict(best)
        for other in group:
            if other is best:
                continue
            combined = merge_issue_entries(combined, other)
        combined["id"] = normalize_issue_id(combined)
        fingerprint = issue_fingerprint(combined) if combined.get("repository") and combined.get("title") else combined.get("fingerprint")
        if fingerprint:
            combined["fingerprint"] = fingerprint
        merged_issues.append(combined)
    return merged_issues


def build_issue_indexes(issues: list) -> Tuple[Dict[str, dict], Dict[str, dict]]:
    by_fingerprint = {}
    by_match_key = {}
    for issue in issues:
        fingerprint = issue.get("fingerprint")
        if fingerprint:
            by_fingerprint[fingerprint] = issue
        key = issue_match_key(issue)
        if key:
            by_match_key[key] = issue
    return by_fingerprint, by_match_key


def find_existing_issue(by_fingerprint: dict, by_match_key: dict, finding: dict, fingerprint: str) -> Optional[dict]:
    if fingerprint in by_fingerprint:
        return by_fingerprint[fingerprint]
    key = issue_match_key(finding)
    if key and key in by_match_key:
        return by_match_key[key]
    return None


def reconcile_issue_registry(
    scan: dict,
    registry_path: Path,
    persist: bool = True,
    stale_after_days: int = 7,
) -> dict:
    registry = load_json(registry_path, {"schema_version": "1.0", "issues": []})
    issues = deduplicate_registry(registry.setdefault("issues", []))
    by_fingerprint, by_match_key = build_issue_indexes(issues)
    now = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    new_count = 0
    matched_issue_ids = set()

    for finding in scan.get("findings", []):
        fingerprint = issue_fingerprint(finding)
        existing = find_existing_issue(by_fingerprint, by_match_key, finding, fingerprint)
        status = "pr_open" if finding.get("pr_url") else "open"
        if existing:
            existing.update(
                {
                    "last_seen_at": now,
                    "fingerprint": fingerprint,
                    "title": redact(finding.get("title", "")),
                    "severity": finding.get("severity"),
                    "repository": finding.get("repository"),
                    "file": finding.get("file"),
                    "line_range": finding.get("line_range"),
                    "impact": redact(finding.get("impact", "")),
                    "trigger": redact(finding.get("trigger", "")),
                    "suggestion": redact(finding.get("suggestion", "")),
                    "root_cause": redact(finding.get("root_cause", "")),
                    "validation": redact(finding.get("validation", "")),
                    "pr_url": finding.get("pr_url"),
                    "jira_key": existing.get("jira_key"),
                    "jira_url": existing.get("jira_url"),
                }
            )
            if finding.get("jira_key"):
                existing["jira_key"] = finding.get("jira_key")
            if finding.get("jira_url"):
                existing["jira_url"] = finding.get("jira_url")
            if existing.get("status") in {"open", "in_progress"} and status == "pr_open":
                existing["status"] = "pr_open"
            existing["id"] = normalize_issue_id(existing)
            finding["issue_id"] = existing["id"]
            finding["issue_status"] = existing.get("status", status)
            if existing.get("jira_key"):
                finding["jira_key"] = existing.get("jira_key")
            if existing.get("jira_url"):
                finding["jira_url"] = existing.get("jira_url")
            matched_issue_ids.add(existing["id"])
            by_fingerprint[fingerprint] = existing
            match_key = issue_match_key(existing)
            if match_key:
                by_match_key[match_key] = existing
        else:
            new_count += 1
            issue_id = f"ISSUE-{fingerprint[:10]}"
            entry = {
                "id": issue_id,
                "fingerprint": fingerprint,
                "status": status,
                "first_seen_at": now,
                "last_seen_at": now,
                "title": redact(finding.get("title", "")),
                "severity": finding.get("severity"),
                "repository": finding.get("repository"),
                "file": finding.get("file"),
                "line_range": finding.get("line_range"),
                "impact": redact(finding.get("impact", "")),
                "trigger": redact(finding.get("trigger", "")),
                "suggestion": redact(finding.get("suggestion", "")),
                "root_cause": redact(finding.get("root_cause", "")),
                "validation": redact(finding.get("validation", "")),
                "pr_url": finding.get("pr_url"),
            }
            issues.append(entry)
            by_fingerprint[fingerprint] = entry
            match_key = issue_match_key(entry)
            if match_key:
                by_match_key[match_key] = entry
            finding["issue_id"] = issue_id
            finding["issue_status"] = status
            matched_issue_ids.add(issue_id)

    registry["issues"] = deduplicate_registry(issues)

    for resolved in scan.get("resolved_issues", []):
        target_id = resolved.get("issue_id") or resolved.get("id")
        for issue in registry["issues"]:
            if issue.get("id") == target_id or (
                issue.get("repository") == resolved.get("repository")
                and normalize(issue.get("title", "")) == normalize(resolved.get("title", ""))
            ):
                issue["status"] = "resolved"
                issue["resolved_at"] = now
                issue["resolution_reason"] = redact(resolved.get("reason", "verified_fixed"))
                issue["last_seen_at"] = now

    registry["issues"] = deduplicate_registry(registry["issues"])
    now_dt = parse_iso_datetime(now) or datetime.now(timezone.utc)
    for issue in registry["issues"]:
        if issue.get("status") not in {"open", "in_progress", "pr_open"}:
            issue["stale"] = False
            continue
        if issue.get("id") in matched_issue_ids:
            issue["stale"] = False
            continue
        last_seen = parse_iso_datetime(str(issue.get("last_seen_at", "")))
        issue["stale"] = bool(last_seen and (now_dt - last_seen).days > max(stale_after_days, 1))

    summary = {
        "path": str(registry_path),
        "new_issues": new_count,
        "existing_open_issues": sum(1 for i in registry["issues"] if i.get("status") == "open"),
        "stale_open_issues": sum(
            1
            for i in registry["issues"]
            if i.get("status") in {"open", "in_progress", "pr_open"} and i.get("stale")
        ),
        "pr_open_issues": sum(1 for i in registry["issues"] if i.get("status") == "pr_open"),
        "resolved_issues": sum(1 for i in registry["issues"] if i.get("status") == "resolved"),
    }
    registry["updated_at"] = now
    if persist:
        write_json(registry_path, registry)
    scan["issue_registry"] = summary
    return registry


def header_template(findings: list, scan_status: str) -> str:
    if scan_status == "failed":
        return "grey"
    counts = severity_counts(findings)
    if counts["High"] > 0:
        return "red"
    if counts["Medium"] > 0:
        return "orange"
    return "green"


def severity_icon(severity: str) -> str:
    return {"High": "🔴", "Medium": "🟡", "Low": "🟢"}.get(severity, "⚪")


def scan_status_label(scan_status: str) -> str:
    mapping = {
        "completed": "Completed",
        "completed_with_findings": "Completed with findings",
        "completed_with_failures": "Completed with failures",
        "failed": "Failed",
    }
    return mapping.get(scan_status, scan_status)


def escape_markdown(text: str) -> str:
    return (
        redact(text)
        .replace("\\", "\\\\")
        .replace("*", "\\*")
        .replace("_", "\\_")
        .replace("`", "\\`")
        .replace("[", "\\[")
        .replace("]", "\\]")
    )


def jira_site_host(common: dict) -> str:
    jira = (common.get("notifications") or {}).get("jira") or {}
    site = str(jira.get("site", "")).strip()
    if site:
        if site.startswith("http://") or site.startswith("https://"):
            return site.rstrip("/")
        if "." in site:
            return f"https://{site}".rstrip("/")
        return f"https://{site}.atlassian.net"

    auth_conf = Path.home() / ".config" / "twg" / "auth.conf"
    if auth_conf.is_file():
        for line in auth_conf.read_text(encoding="utf-8").splitlines():
            if line.strip().startswith("domain="):
                domain = line.split("=", 1)[1].strip().strip('"')
                if domain:
                    if domain.startswith("http://") or domain.startswith("https://"):
                        return domain.rstrip("/")
                    return f"https://{domain}".rstrip("/")
    return ""


def jira_browse_url_for_finding(finding: dict, common: dict) -> str:
    url = str(finding.get("jira_url", "")).strip()
    if url:
        return url

    key = str(finding.get("jira_key", "")).strip()
    if not key:
        return ""

    host = jira_site_host(common)
    if not host:
        return ""
    return f"{host}/browse/{key}"


def feishu_jira_line(finding: dict, common: dict) -> str:
    key = str(finding.get("jira_key", "")).strip()
    url = jira_browse_url_for_finding(finding, common)
    if not key and not url:
        return ""

    if url:
        return f"**Jira:** {url}"
    return f"**Jira:** `{escape_markdown(key)}`"


def build_feishu_card(scan: dict, product_name: str = "Lumen", common: Optional[dict] = None) -> dict:
    counts = severity_counts(scan.get("findings", []))
    elements = [
        {
            "tag": "markdown",
            "content": (
                f"**Scan Window:** {scan.get('scan_window', 'Last 7 Days')}\n"
                f"**Repositories Scanned:** {scan.get('repositories_scanned', 0)}\n"
                f"**Status:** {scan_status_label(scan.get('scan_status', 'completed'))}"
            ),
        },
        {"tag": "hr"},
        {
            "tag": "markdown",
            "content": (
                "**Overall Summary**\n"
                f"🔴 High: **{counts['High']}**\n"
                f"🟡 Medium: **{counts['Medium']}**\n"
                f"🟢 Low: **{counts['Low']}**"
            ),
        },
        {"tag": "hr"},
    ]

    findings = scan.get("findings", [])
    if findings:
        for index, finding in enumerate(findings, start=1):
            if index > 1:
                elements.append({"tag": "hr"})
            lines = [
                f"**Finding {index} — {escape_markdown(finding.get('title', 'Untitled'))}**",
                f"**Severity:** {severity_icon(finding.get('severity', 'Low'))} {finding.get('severity', 'Low')}",
                f"**Repository:** `{escape_markdown(finding.get('repository', 'unknown'))}`",
                f"**Impact:** {escape_markdown(finding.get('impact', ''))}",
                f"**Trigger:** {escape_markdown(finding.get('trigger', ''))}",
            ]
            if finding.get("severity") == "High" and finding.get("pr_url"):
                lines.append(f"**PR:** {finding['pr_url']}")
            jira_line = feishu_jira_line(finding, common or {})
            if jira_line:
                lines.append(jira_line)
            elements.append({"tag": "markdown", "content": "\n".join(lines)})
            elements.append(
                {
                    "tag": "collapsible_panel",
                    "expanded": False,
                    "header": {"title": {"tag": "plain_text", "content": "View detail"}},
                    "elements": [
                        {
                            "tag": "markdown",
                            "content": (
                                f"**File:** `{escape_markdown(finding.get('file', ''))}:{escape_markdown(finding.get('line_range', ''))}`\n"
                                f"**Code Snippet:** `{escape_markdown(finding.get('code_snippet', ''))}`\n"
                                f"**Suggestion:** {escape_markdown(finding.get('suggestion', ''))}"
                            ),
                        }
                    ],
                }
            )
    else:
        elements.append({"tag": "markdown", "content": "**Findings:** No confirmed findings were detected in this scan window."})

    if scan.get("failures"):
        failure_lines = "\n".join(
            f"- {escape_markdown(item.get('repository', 'unknown'))}: {escape_markdown(item.get('error', 'unknown'))}"
            for item in scan["failures"]
        )
        elements.extend([{"tag": "hr"}, {"tag": "markdown", "content": f"**Failures:**\n{failure_lines}"}])

    return {
        "msg_type": "interactive",
        "card": {
            "schema": "2.0",
            "config": {"wide_screen_mode": True},
            "header": {
                "template": header_template(findings, scan.get("scan_status", "completed")),
                "title": {"tag": "plain_text", "content": f"🔎 {product_name} — Code Quality & Security Scan Report"},
            },
            "body": {"elements": elements},
        },
    }


def h(text) -> str:
    return html.escape(redact(text), quote=True)


def render_optional_field(label: str, value) -> str:
    if not value:
        return ""
    return f"<dt>{h(label)}</dt><dd>{h(value)}</dd>"


def render_finding_html(finding: dict, index: int) -> str:
    pr = finding.get("pr_url")
    pr_html = f'<div><b>PR:</b> <a href="{h(pr)}">{h(pr)}</a></div>' if pr else ""
    optional_fields = (
        render_optional_field("Root cause", finding.get("root_cause"))
        + render_optional_field("Validation", finding.get("validation"))
    )
    return f"""
    <section class="finding">
      <div class="finding-head">
        <div>
          <h3>{index}. [{h(finding.get('severity', 'Low'))}] {h(finding.get('title', 'Untitled'))}</h3>
          <div class="muted">{h(finding.get('repository', 'unknown'))} · {h(finding.get('issue_id', 'untracked'))} · {h(finding.get('issue_status', 'open'))}</div>
        </div>
      </div>
      <dl>
        <dt>Impact</dt><dd>{h(finding.get('impact', ''))}</dd>
        <dt>Trigger</dt><dd>{h(finding.get('trigger', ''))}</dd>
        <dt>File</dt><dd><code>{h(finding.get('file', ''))}:{h(finding.get('line_range', ''))}</code></dd>
        <dt>Code</dt><dd><pre>{h(finding.get('code_snippet', ''))}</pre></dd>
        <dt>Suggestion</dt><dd>{h(finding.get('suggestion', ''))}</dd>
        {optional_fields}
      </dl>
      {pr_html}
    </section>
    """


def write_html(scan: dict, output_path: Path) -> None:
    counts = severity_counts(scan.get("findings", []))
    findings_html = "\n".join(render_finding_html(f, i) for i, f in enumerate(scan.get("findings", []), start=1))
    if not findings_html:
        findings_html = '<p class="empty">No confirmed findings were detected in this scan window.</p>'

    html_text = f"""<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Code Quality & Security Review Report</title>
  <style>
    @page {{ size: A4; margin: 18mm; }}
    * {{ box-sizing: border-box; }}
    html, body {{ max-width: 100%; overflow-x: hidden; }}
    body {{
      font-family: Arial, Helvetica, sans-serif; color: #111; line-height: 1.42; font-size: 13px;
      overflow-wrap: break-word; word-wrap: break-word; word-break: break-word;
    }}
    h1 {{ font-size: 28px; margin: 0 0 8px; overflow-wrap: break-word; }}
    h2 {{ font-size: 18px; margin: 28px 0 10px; border-bottom: 1px solid #ccc; padding-bottom: 6px; }}
    h3 {{ font-size: 15px; margin: 0 0 4px; overflow-wrap: break-word; }}
    .meta, .muted {{ color: #666; overflow-wrap: break-word; }}
    .summary {{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 18px 0; }}
    .metric {{ border: 1px solid #ddd; padding: 10px; background: #f7f7f7; overflow: hidden; }}
    .metric b {{ display: block; font-size: 20px; }}
    table {{ width: 100%; max-width: 100%; table-layout: fixed; border-collapse: collapse; margin: 10px 0; }}
    th, td {{
      border-bottom: 1px solid #ddd; padding: 7px; text-align: left; vertical-align: top;
      overflow-wrap: break-word; word-wrap: break-word; word-break: break-word;
    }}
    th {{ background: #f0f0f0; }}
    .finding {{ page-break-inside: avoid; border-top: 1px solid #ddd; padding-top: 14px; margin-top: 16px; overflow: hidden; }}
    dl {{ display: grid; grid-template-columns: 95px 1fr; gap: 6px 10px; max-width: 100%; }}
    dt {{ font-weight: bold; color: #333; overflow-wrap: break-word; }}
    dd {{ margin: 0; min-width: 0; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; }}
    pre {{
      white-space: pre-wrap; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word;
      background: #f5f5f5; padding: 8px; border: 1px solid #ddd; max-width: 100%; overflow-x: hidden;
    }}
    code {{
      font-family: Menlo, Consolas, monospace; overflow-wrap: break-word; word-wrap: break-word;
      word-break: break-word; white-space: pre-wrap;
    }}
    .empty {{ color: #666; }}
  </style>
</head>
<body>
  <h1>Code Quality & Security Review Report</h1>
  <div class="meta">Generated: {h(datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC'))}</div>
  <div class="meta">Scan window: {h(scan.get('scan_window', 'Last 7 Days'))} · Status: {h(scan_status_label(scan.get('scan_status', 'completed')))}</div>

  <h2>1. Summary</h2>
  <div class="summary">
    <div class="metric"><span>High</span><b>{counts['High']}</b></div>
    <div class="metric"><span>Medium</span><b>{counts['Medium']}</b></div>
    <div class="metric"><span>Low</span><b>{counts['Low']}</b></div>
    <div class="metric"><span>Repositories</span><b>{h(scan.get('repositories_scanned', 0))}</b></div>
  </div>

  <h2>2. Findings</h2>
  {findings_html}

  <h2>3. PR Summary</h2>
  <p>{h(len(scan.get('prs', [])))} PR(s) created in this run.</p>

  <h2>4. Decisions</h2>
  <p>Only confirmed High severity issues are eligible for automated fixes and PRs. Medium and Low issues remain report-only unless policy changes.</p>
</body>
</html>
"""
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(html_text, encoding="utf-8")


def find_chrome_binary() -> Optional[str]:
    candidates = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
        "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
        shutil.which("google-chrome"),
        shutil.which("chromium"),
        shutil.which("chromium-browser"),
    ]
    for candidate in candidates:
        if candidate and Path(candidate).exists():
            return candidate
    return None


def convert_via_chrome(html_path: Path, pdf_path: Path) -> None:
    chrome = find_chrome_binary()
    if not chrome:
        raise RuntimeError("Chrome/Chromium/Edge headless was not found")
    file_url = html_path.resolve().as_uri()
    subprocess.run(
        [
            chrome,
            "--headless",
            "--disable-gpu",
            "--no-pdf-header-footer",
            f"--print-to-pdf={pdf_path}",
            file_url,
        ],
        check=True,
        capture_output=True,
        text=True,
        timeout=120,
    )


def resolve_pdf_engine_preference(common: dict) -> list:
    configured = common.get("reporting", {}).get("pdf_engine_preference", [])
    if "chrome" in configured:
        return ["chrome"]
    if configured:
        return ["chrome"]
    return ["chrome"]


def report_run_stamp(result_path: Path, scan: dict) -> str:
    stem = result_path.stem
    if stem.startswith("scan-result-"):
        return stem.replace("scan-result-", "", 1)

    for value in (scan.get("finished_at"), scan.get("started_at")):
        if not value:
            continue
        try:
            normalized = str(value).replace("Z", "+00:00")
            parsed = datetime.fromisoformat(normalized)
            return parsed.strftime("%Y%m%d-%H%M%S")
        except ValueError:
            continue

    return datetime.now().strftime("%Y%m%d-%H%M%S")


def sync_archived_scan_results(workspace_root: Path, scan: dict) -> None:
    results_dir = workspace_root / "results"
    if not results_dir.is_dir():
        return

    started_at = scan.get("started_at")
    report = scan.get("report")
    if not started_at or not isinstance(report, dict):
        return

    for path in results_dir.glob("scan-result-*.json"):
        data = load_json(path, {})
        if data.get("started_at") != started_at:
            continue
        data["report"] = report
        if scan.get("feishu"):
            data["feishu"] = scan["feishu"]
        if scan.get("jira"):
            data["jira"] = scan["jira"]
        if scan.get("finished_at"):
            data["finished_at"] = scan["finished_at"]
        write_json(path, data)


def convert_html_to_pdf(html_path: Path, pdf_path: Path, engine_preference: list) -> str:
    if find_chrome_binary():
        convert_via_chrome(html_path, pdf_path)
        return "chrome"
    raise RuntimeError(
        "PDF export requires a system browser (Google Chrome, Chromium, or Microsoft Edge). "
        "HTML report was still generated."
    )


def send_feishu(card: dict, webhook_url: str) -> None:
    payload = json.dumps(card).encode("utf-8")
    request = urllib.request.Request(webhook_url, data=payload, headers={"Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(request, timeout=30) as response:
        body = response.read().decode("utf-8")
        if response.status >= 400:
            raise RuntimeError(f"Feishu webhook returned HTTP {response.status}: {redact(body)}")
        parsed = json.loads(body)
        if parsed.get("code") not in (0, None):
            if parsed.get("StatusCode") not in (0, None) and parsed.get("code") is None:
                return
            if parsed.get("code") not in (0,):
                raise RuntimeError(f"Feishu webhook error: {redact(body)}")


def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: render-report-and-notify.py <scan-result.json>", file=sys.stderr)
        return 1

    result_path = Path(sys.argv[1]).resolve()
    scan = load_json(result_path, {})
    dry_run = os.environ.get("LUMEN_DRY_RUN", "").strip().lower() in {"1", "true", "yes"} or bool(scan.get("dry_run"))
    workspace_root = result_path.parent.parent
    reports_dir = workspace_root / "reports"
    state_dir = workspace_root / "state"
    registry_path = state_dir / "issue-registry.json"
    common = load_json(workspace_root / "config" / "common.json", {})
    product_name = common.get("product", {}).get("name", "Lumen")
    pdf_engine_preference = resolve_pdf_engine_preference(common)
    issue_tracking = common.get("issue_tracking", {})
    stale_after_days = 7
    if isinstance(issue_tracking, dict):
        try:
            stale_after_days = int(issue_tracking.get("stale_after_days", 7))
        except (TypeError, ValueError):
            stale_after_days = 7

    scan = apply_scan_window_policy(scan, common)

    registry = reconcile_issue_registry(
        scan,
        registry_path,
        persist=not dry_run,
        stale_after_days=stale_after_days,
    )
    scan["jira"] = sync_jira_issues(
        scan,
        registry,
        registry_path,
        common,
        dry_run=dry_run,
        persist=not dry_run,
    )

    reports_dir.mkdir(parents=True, exist_ok=True)
    run_stamp = report_run_stamp(result_path, scan)
    html_path = reports_dir / f"code-quality-security-scan-{run_stamp}.html"
    pdf_path = reports_dir / f"code-quality-security-scan-{run_stamp}.pdf"

    write_html(scan, html_path)
    try:
        engine_used = convert_html_to_pdf(html_path, pdf_path, pdf_engine_preference)
        if pdf_path.is_file():
            scan["report"] = {
                "html_path": str(html_path),
                "pdf_path": str(pdf_path),
                "status": "generated",
                "engine": engine_used,
            }
        else:
            scan["report"] = {
                "html_path": str(html_path),
                "pdf_path": None,
                "status": "pdf_failed",
                "error": "PDF file was not created by the browser exporter.",
            }
    except Exception as exc:
        scan["report"] = {"html_path": str(html_path), "pdf_path": None, "status": "pdf_failed", "error": redact(str(exc))}

    webhook_url = os.environ.get("FEISHU_WEBHOOK_URL", "").strip()
    if dry_run:
        scan["feishu"] = {"status": "dry_run_skipped", "error": None}
    elif not webhook_url:
        scan["feishu"] = {"status": "not_sent", "error": "FEISHU_WEBHOOK_URL is not set"}
    else:
        try:
            card = build_feishu_card(scan, product_name, common)
            send_feishu(card, webhook_url)
            scan["feishu"] = {"status": "sent", "error": None}
        except Exception as exc:
            scan["feishu"] = {"status": "failed", "error": redact(str(exc))}

    scan["finished_at"] = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    write_json(result_path, scan)
    sync_archived_scan_results(workspace_root, scan)
    dashboard_status = "not_generated"
    dashboard_error = None
    dashboard_script = workspace_root / "scripts" / "render-dashboard.sh"
    if dashboard_script.exists():
        try:
            subprocess.run(["bash", str(dashboard_script)], check=True)
            dashboard_status = "generated"
        except Exception as exc:
            dashboard_status = "failed"
            dashboard_error = redact(str(exc))
    print(json.dumps({
        "html_path": str(html_path),
        "pdf_path": scan["report"].get("pdf_path"),
        "report_status": scan["report"]["status"],
        "dashboard_status": dashboard_status,
        "dashboard_error": dashboard_error,
        "feishu_status": scan["feishu"]["status"],
        "feishu_error": scan["feishu"]["error"],
        "jira_status": scan.get("jira", {}).get("status"),
        "jira_created": scan.get("jira", {}).get("created", 0),
        "jira_updated": scan.get("jira", {}).get("updated", 0),
        "jira_failed": scan.get("jira", {}).get("failed", 0),
        "jira_error": "; ".join(scan.get("jira", {}).get("errors", [])[:1]) or None,
    }))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
