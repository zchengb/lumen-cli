#!/usr/bin/env python3
import hashlib
import html
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import urllib.request
from datetime import datetime, timezone
from pathlib import Path


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


def reconcile_issue_registry(scan: dict, registry_path: Path, persist: bool = True) -> dict:
    registry = load_json(registry_path, {"schema_version": "1.0", "issues": []})
    issues = registry.setdefault("issues", [])
    by_fingerprint = {item["fingerprint"]: item for item in issues if item.get("fingerprint")}
    now = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    new_count = 0
    existing_count = 0

    for finding in scan.get("findings", []):
        fingerprint = issue_fingerprint(finding)
        existing = by_fingerprint.get(fingerprint)
        status = "pr_open" if finding.get("pr_url") else "open"
        if existing:
            existing_count += 1
            existing.update(
                {
                    "last_seen_at": now,
                    "title": redact(finding.get("title", "")),
                    "severity": finding.get("severity"),
                    "repository": finding.get("repository"),
                    "file": finding.get("file"),
                    "line_range": finding.get("line_range"),
                    "impact": redact(finding.get("impact", "")),
                    "trigger": redact(finding.get("trigger", "")),
                    "suggestion": redact(finding.get("suggestion", "")),
                    "pr_url": finding.get("pr_url"),
                }
            )
            if existing.get("status") in {"open", "in_progress"} and status == "pr_open":
                existing["status"] = "pr_open"
            finding["issue_id"] = existing["id"]
            finding["issue_status"] = existing.get("status", status)
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
                "pr_url": finding.get("pr_url"),
            }
            issues.append(entry)
            by_fingerprint[fingerprint] = entry
            finding["issue_id"] = issue_id
            finding["issue_status"] = status

    summary = {
        "path": str(registry_path),
        "new_issues": new_count,
        "existing_open_issues": sum(1 for i in issues if i.get("status") == "open"),
        "stale_open_issues": sum(1 for i in issues if i.get("status") == "open" and i.get("last_seen_at") != now),
        "pr_open_issues": sum(1 for i in issues if i.get("status") == "pr_open"),
        "resolved_issues": sum(1 for i in issues if i.get("status") == "resolved"),
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


def build_feishu_card(scan: dict, product_name: str = "Lumen") -> dict:
    counts = severity_counts(scan.get("findings", []))
    registry = scan.get("issue_registry", {})
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


def render_finding_html(finding: dict, index: int) -> str:
    pr = finding.get("pr_url")
    pr_html = f'<div><b>PR:</b> <a href="{h(pr)}">{h(pr)}</a></div>' if pr else ""
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
      </dl>
      {pr_html}
    </section>
    """


def write_html(scan: dict, registry: dict, output_path: Path) -> None:
    counts = severity_counts(scan.get("findings", []))
    issue_summary = scan.get("issue_registry", {})
    findings_html = "\n".join(render_finding_html(f, i) for i, f in enumerate(scan.get("findings", []), start=1))
    if not findings_html:
        findings_html = '<p class="empty">No confirmed findings were detected in this scan window.</p>'

    existing_open = [i for i in registry.get("issues", []) if i.get("status") in {"open", "pr_open", "in_progress"}]
    existing_rows = "\n".join(
        f"<tr><td>{h(i.get('id'))}</td><td>{h(i.get('status'))}</td><td>{h(i.get('severity'))}</td><td>{h(i.get('repository'))}</td><td>{h(i.get('title'))}</td><td>{h(i.get('last_seen_at'))}</td></tr>"
        for i in existing_open
    ) or '<tr><td colspan="6">No open tracked issues.</td></tr>'

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

  <h2>2. Issue Registry Summary</h2>
  <table>
    <tr><th>New</th><th>Open</th><th>Stale open</th><th>PR open</th><th>Resolved</th></tr>
    <tr>
      <td>{issue_summary.get('new_issues', 0)}</td>
      <td>{issue_summary.get('existing_open_issues', 0)}</td>
      <td>{issue_summary.get('stale_open_issues', 0)}</td>
      <td>{issue_summary.get('pr_open_issues', 0)}</td>
      <td>{issue_summary.get('resolved_issues', 0)}</td>
    </tr>
  </table>

  <h2>3. New Issue Findings</h2>
  {findings_html}

  <h2>4. Existing Open / Stale Issues</h2>
  <table>
    <tr><th>ID</th><th>Status</th><th>Severity</th><th>Repository</th><th>Title</th><th>Last seen</th></tr>
    {existing_rows}
  </table>

  <h2>5. PR Summary</h2>
  <p>{h(len(scan.get('prs', [])))} PR(s) created in this run.</p>

  <h2>6. Others</h2>
  <p>Local project validation was skipped by lightweight review-only policy.</p>

  <h2>7. Decisions</h2>
  <p>Only confirmed High severity issues are eligible for automated fixes and PRs. Medium and Low issues remain report-only unless policy changes.</p>
</body>
</html>
"""
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(html_text, encoding="utf-8")


def convert_via_playwright(html_path: Path, pdf_path: Path) -> None:
    node = shutil.which("node")
    if not node:
        raise RuntimeError("node was not found")

    js = f"""
async function main() {{
  const playwright = require('playwright');
  const browser = await playwright.chromium.launch({{ headless: true }});
  const page = await browser.newPage();
  await page.goto('file://{html_path}', {{ waitUntil: 'networkidle' }});
  await page.pdf({{ path: '{pdf_path}', format: 'A4', printBackground: true }});
  await browser.close();
}}
main().catch((err) => {{
  console.error(err);
  process.exit(1);
}});
"""
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False) as handle:
        handle.write(js)
        js_path = handle.name
    try:
        subprocess.run([node, js_path], check=True, capture_output=True, text=True)
    finally:
        Path(js_path).unlink(missing_ok=True)


def convert_via_weasyprint(html_path: Path, pdf_path: Path) -> None:
    python_bin = shutil.which("python3") or shutil.which("python")
    if not python_bin:
        raise RuntimeError("python3 was not found")
    subprocess.run(
        [python_bin, "-c", "import weasyprint"],
        check=True,
        capture_output=True,
        text=True,
    )
    subprocess.run(
        [python_bin, "-m", "weasyprint", str(html_path), str(pdf_path)],
        check=True,
        capture_output=True,
        text=True,
    )


def convert_via_wkhtmltopdf(html_path: Path, pdf_path: Path) -> None:
    binary = shutil.which("wkhtmltopdf")
    if not binary:
        raise RuntimeError("wkhtmltopdf was not found")
    subprocess.run([binary, str(html_path), str(pdf_path)], check=True, capture_output=True, text=True)


PDF_ENGINES = {
    "playwright": convert_via_playwright,
    "weasyprint": convert_via_weasyprint,
    "wkhtmltopdf": convert_via_wkhtmltopdf,
}


def convert_html_to_pdf(html_path: Path, pdf_path: Path, engine_preference: list) -> str:
    errors = []
    for engine in engine_preference or list(PDF_ENGINES.keys()):
        converter = PDF_ENGINES.get(engine)
        if not converter:
            continue
        try:
            converter(html_path, pdf_path)
            return engine
        except Exception as exc:
            errors.append(f"{engine}: {redact(str(exc))}")
    raise RuntimeError("No PDF engine succeeded. Tried: " + "; ".join(errors) if errors else "No PDF engine available.")


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
    pdf_engine_preference = common.get("reporting", {}).get("pdf_engine_preference", ["playwright", "weasyprint", "wkhtmltopdf"])

    registry = reconcile_issue_registry(scan, registry_path, persist=not dry_run)

    stamp = datetime.now().strftime("%Y-%m-%d")
    html_path = reports_dir / f"code-quality-security-scan-{stamp}.html"
    pdf_path = reports_dir / f"code-quality-security-scan-{stamp}.pdf"

    write_html(scan, registry, html_path)
    try:
        engine_used = convert_html_to_pdf(html_path, pdf_path, pdf_engine_preference)
        scan["report"] = {"html_path": str(html_path), "pdf_path": str(pdf_path), "status": "generated", "engine": engine_used}
    except Exception as exc:
        scan["report"] = {"html_path": str(html_path), "pdf_path": None, "status": "pdf_failed", "error": redact(str(exc))}

    webhook_url = os.environ.get("FEISHU_WEBHOOK_URL", "").strip()
    if dry_run:
        scan["feishu"] = {"status": "dry_run_skipped", "error": None}
    elif not webhook_url:
        scan["feishu"] = {"status": "not_sent", "error": "FEISHU_WEBHOOK_URL is not set"}
    else:
        try:
            card = build_feishu_card(scan, product_name)
            send_feishu(card, webhook_url)
            scan["feishu"] = {"status": "sent", "error": None}
        except Exception as exc:
            scan["feishu"] = {"status": "failed", "error": redact(str(exc))}

    scan["finished_at"] = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    write_json(result_path, scan)
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
    }))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
