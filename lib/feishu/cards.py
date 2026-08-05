from __future__ import annotations

from typing import Any


def text_card(title: str, body: str) -> dict[str, Any]:
    return {
        "msg_type": "interactive",
        "card": {
            "header": {
                "title": {"tag": "plain_text", "content": title},
                "template": "blue",
            },
            "elements": [
                {"tag": "div", "text": {"tag": "plain_text", "content": body}},
            ],
        },
    }


def ack_card(action: str, project: str = "") -> dict[str, Any]:
    detail = f"Action: {action}"
    if project:
        detail = f"{detail}\nProject: {project}"
    return text_card("Dylan · 已收到", detail)


def progress_card(run_id: str, status: str, detail: str = "") -> dict[str, Any]:
    body = f"Run: {run_id}\nStatus: {status}"
    if detail:
        body = f"{body}\n{detail}"
    return text_card("Dylan · Scan", body)


def scan_summary_card(run_id: str, scan: dict[str, Any]) -> dict[str, Any]:
    status = scan.get("scan_status") or scan.get("status") or "unknown"
    findings = scan.get("findings") if isinstance(scan.get("findings"), list) else []
    high = sum(1 for item in findings if str(item.get("severity", "")).lower() == "high")
    body = (
        f"Run: {run_id}\n"
        f"Status: {status}\n"
        f"Findings: {len(findings)} (High: {high})"
    )
    return text_card("Dylan · Scan 完成", body)
