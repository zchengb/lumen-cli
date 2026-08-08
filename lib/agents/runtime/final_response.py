from __future__ import annotations

import json
import re
from dataclasses import dataclass, field
from typing import Any


_PLANNING_PREFIX = re.compile(
    r"^(?:I'll |I will |Let me |I'm going to |I am going to |Pulling |Checking |Looking |Atlassian |"
    r"Using |Running |Searching |Reading |Investigating ).{0,240}?\n+",
    re.IGNORECASE | re.MULTILINE,
)

_FINAL_ENVELOPE = re.compile(
    r"<FINAL_RESPONSE>\s*(.*?)\s*</FINAL_RESPONSE>",
    re.IGNORECASE | re.DOTALL,
)

_ACTION_ENVELOPE = re.compile(
    r"<ACTION_REQUEST>\s*(.*?)\s*</ACTION_REQUEST>",
    re.IGNORECASE | re.DOTALL,
)

_FORGED_IDENTITY_KEYS = frozenset(
    {
        "actor_user_id",
        "actor",
        "chat_id",
        "thread_id",
        "source_message_id",
        "trace_id",
        "explicit_authorization",
        "agent_id",
        "project_slug",
    }
)


@dataclass
class FinalResponseParse:
    text: str
    mode: str
    valid: bool
    fallback_used: bool
    error_code: str = ""
    action_requests: list[dict[str, Any]] = field(default_factory=list)


def sanitize_feishu_answer(text: str) -> str:
    raw = str(text or "").strip()
    if not raw:
        return raw
    cleaned = raw
    for _ in range(6):
        nxt = _PLANNING_PREFIX.sub("", cleaned, count=1).lstrip()
        if nxt == cleaned:
            break
        cleaned = nxt
    if "### " in cleaned or "## " in cleaned:
        for marker in ("\n### ", "\n## ", "\n**"):
            idx = cleaned.find(marker)
            if idx > 40:
                head = cleaned[:idx].strip()
                if any(tok in head.lower() for tok in ("i'll ", "pulling ", "checking ", "looking ", "via `", "mcp")):
                    cleaned = cleaned[idx + 1 :].lstrip()
                    break
    return cleaned.strip() or raw


def _strip_forged_identity(payload: dict[str, Any]) -> dict[str, Any]:
    cleaned = {k: v for k, v in payload.items() if k not in _FORGED_IDENTITY_KEYS}
    resource = cleaned.get("resource")
    if isinstance(resource, dict):
        cleaned["resource"] = {k: v for k, v in resource.items() if k not in _FORGED_IDENTITY_KEYS}
    arguments = cleaned.get("arguments")
    if isinstance(arguments, dict):
        cleaned["arguments"] = {k: v for k, v in arguments.items() if k not in _FORGED_IDENTITY_KEYS}
    return cleaned


def extract_action_requests(raw: str) -> list[dict[str, Any]]:
    text = str(raw or "")
    requests: list[dict[str, Any]] = []
    for match in _ACTION_ENVELOPE.finditer(text):
        body = match.group(1).strip()
        if not body:
            continue
        try:
            payload = json.loads(body)
        except json.JSONDecodeError:
            continue
        if not isinstance(payload, dict):
            continue
        action = str(payload.get("action") or "").strip()
        if not action:
            continue
        cleaned = _strip_forged_identity(payload)
        cleaned["action"] = action
        if "resource" not in cleaned or not isinstance(cleaned.get("resource"), dict):
            cleaned["resource"] = {}
        if "arguments" not in cleaned or not isinstance(cleaned.get("arguments"), dict):
            cleaned["arguments"] = {}
        requests.append(cleaned)
    return requests


def extract_final_response(raw: str) -> FinalResponseParse:
    text = str(raw or "").strip()
    actions = extract_action_requests(text)
    if not text:
        return FinalResponseParse(
            text="",
            mode="empty",
            valid=False,
            fallback_used=True,
            error_code="EMPTY_RESPONSE",
            action_requests=actions,
        )
    match = _FINAL_ENVELOPE.search(text)
    if match:
        body = match.group(1).strip()
        if body:
            return FinalResponseParse(
                text=body,
                mode="final_response_envelope",
                valid=True,
                fallback_used=False,
                action_requests=actions,
            )
    without_actions = _ACTION_ENVELOPE.sub("", text).strip()
    cleaned = sanitize_feishu_answer(without_actions or text)
    return FinalResponseParse(
        text=cleaned,
        mode="legacy_sanitizer",
        valid=bool(cleaned),
        fallback_used=True,
        error_code="" if cleaned else "SANITIZE_EMPTY",
        action_requests=actions,
    )


_STATUS_READ_ACTIONS = frozenset(
    {
        "agent.job.list",
        "agent.job.show",
        "agent.health",
        "agent.list",
        "project.status",
        "workflow.status",
        "schedule.status",
    }
)


def is_planning_reply(text: str) -> bool:
    raw = str(text or "").strip()
    if not raw:
        return True
    lowered = raw.lower()
    starters = (
        "i'll ",
        "i will ",
        "let me ",
        "i'm going to ",
        "i am going to ",
        "checking ",
        "pulling ",
        "looking ",
        "searching ",
        "investigating ",
    )
    if len(raw) > 360:
        return False
    return any(lowered.startswith(s) for s in starters)


def _nested_outcome(job: dict[str, Any]) -> str:
    result = job.get("result") if isinstance(job.get("result"), dict) else {}
    inner = result.get("result") if isinstance(result.get("result"), dict) else result
    if not isinstance(inner, dict):
        return ""
    lines: list[str] = []
    if str(inner.get("status") or "").lower() == "failed":
        code = str(inner.get("code") or "").strip()
        message = str(inner.get("message") or "").strip()
        if code and message:
            lines.append(f"{code} — {message}")
        elif code or message:
            lines.append(code or message)
    else:
        message = str(inner.get("message") or inner.get("summary") or "").strip()
        if message:
            lines.append(message)
    sheet_url = str(inner.get("sheet_url") or result.get("sheet_url") or "").strip()
    view_name = str(inner.get("view_name") or result.get("view_name") or "").strip()
    message = "\n".join(lines)
    if sheet_url and sheet_url not in message:
        label = view_name or "Open Test Cases sheet"
        lines.append(f"[{label}]({sheet_url})")
    return "\n  ".join(lines).strip()


def _issue_key(job: dict[str, Any]) -> str:
    for blob in (job.get("input"), job.get("result")):
        if not isinstance(blob, dict):
            continue
        key = str(blob.get("issue_key") or "").strip()
        if key:
            return key
        resource = blob.get("resource") if isinstance(blob.get("resource"), dict) else {}
        key = str(resource.get("issue_key") or "").strip()
        if key:
            return key
        nested = blob.get("result") if isinstance(blob.get("result"), dict) else {}
        key = str(nested.get("issue_key") or "").strip()
        if key:
            return key
    return ""


def _format_one_job(job: dict[str, Any]) -> str:
    job_id = str(job.get("job_id") or "").strip() or "job"
    status = str(job.get("status") or "unknown").strip()
    capability = str(job.get("capability") or "").strip()
    owner = str(job.get("target_agent") or job.get("delegated_by") or "").strip()
    issue = _issue_key(job)
    outcome = _nested_outcome(job)
    if outcome and status == "completed":
        lower = outcome.lower()
        if "failed" in lower or outcome.startswith("TEST_CASE_"):
            status = "completed (inner failed)"
    head = f"- **{job_id}**"
    bits = [status]
    if owner:
        bits.append(f"owner={owner}")
    if capability:
        bits.append(capability)
    if issue:
        bits.append(issue)
    line = f"{head}: {', '.join(bits)}"
    if outcome:
        line = f"{line}\n  {outcome}"
    return line


def _format_jobs_payload(result: dict[str, Any]) -> str:
    jobs: list[dict[str, Any]] = []
    if isinstance(result.get("jobs"), list):
        jobs = [j for j in result["jobs"] if isinstance(j, dict)]
    elif isinstance(result.get("job"), dict):
        jobs = [result["job"]]
    elif result.get("job_id"):
        jobs = [result]
    summary = result.get("summary") if isinstance(result.get("summary"), dict) else None
    if summary and isinstance(summary.get("children"), list):
        children = [c for c in summary["children"] if isinstance(c, dict)]
        if children:
            jobs = children
        overall = str(summary.get("overall_state") or "").strip()
        parent = str(summary.get("parent_job_id") or result.get("job_id") or "").strip()
        lines = []
        if parent or overall:
            lines.append(f"**Job status**{f' (`{parent}`)' if parent else ''}: {overall or 'unknown'}")
        for child in children or jobs:
            lines.append(_format_one_job(child))
        next_dep = str(summary.get("next_dependency") or "").strip()
        if next_dep:
            lines.append(f"- **Next:** {next_dep}")
        return "\n".join(lines).strip()
    if not jobs:
        return ""
    lines = ["**Job status**"]
    lines.extend(_format_one_job(job) for job in jobs[:12])
    return "\n".join(lines).strip()


def format_action_receipts_summary(receipts: list[dict[str, Any]]) -> str:
    if not receipts:
        return ""
    job_detail = ""
    agent_detail = ""
    note_detail = ""
    for receipt in receipts:
        action = str(receipt.get("action") or "").strip()
        if action not in _STATUS_READ_ACTIONS:
            continue
        if receipt.get("status") != "succeeded":
            continue
        result = receipt.get("result") if isinstance(receipt.get("result"), dict) else {}
        if action in {"agent.job.list", "agent.job.show"} and not job_detail:
            detail = _format_jobs_payload(result)
            if detail:
                job_detail = detail
            continue
        if action in {"agent.health", "agent.list"} and not agent_detail:
            agents = result.get("agents") if isinstance(result.get("agents"), list) else []
            if agents:
                names = [
                    str(a.get("id") or a.get("display_name") or "").strip()
                    for a in agents
                    if isinstance(a, dict)
                ]
                names = [n for n in names if n]
                if names:
                    agent_detail = "**Agents:** " + ", ".join(names[:12])
            continue
        if not note_detail:
            note = str(result.get("note") or result.get("status") or "").strip()
            if note:
                note_detail = f"**{action}:** {note}"
    if job_detail:
        return job_detail
    if agent_detail:
        return agent_detail
    if note_detail:
        return note_detail
    lines = []
    for receipt in receipts:
        action = receipt.get("action") or "action"
        status = receipt.get("status") or "unknown"
        if status == "succeeded":
            lines.append(f"- {action}: succeeded")
        else:
            err = receipt.get("error") or receipt.get("error_code") or status
            lines.append(f"- {action}: {status} ({err})")
    return "Action results:\n" + "\n".join(lines)


def prefer_action_summary(reply_text: str, receipts: list[dict[str, Any]]) -> str:
    summary = format_action_receipts_summary(receipts)
    denials = [r for r in receipts if str(r.get("status") or "") == "denied"]
    denial_lines: list[str] = []
    for receipt in denials:
        action = str(receipt.get("action") or "action").strip()
        err = str(receipt.get("error") or receipt.get("error_code") or "denied").strip()
        denial_lines.append(f"- **{action}** was not executed: {err}")
    denial_text = ""
    if denial_lines:
        denial_text = "**Action blocked**\n" + "\n".join(denial_lines)
    has_status_read = any(
        str(r.get("action") or "").strip() in _STATUS_READ_ACTIONS and r.get("status") == "succeeded"
        for r in receipts
    )
    if has_status_read and summary:
        if denial_text:
            return f"{summary}\n\n{denial_text}"
        return summary
    if denial_text and (not reply_text or is_planning_reply(reply_text)):
        return denial_text
    if denial_text and reply_text and denial_text not in reply_text:
        return f"{reply_text}\n\n{denial_text}"
    if not reply_text:
        return summary
    return reply_text
