#!/usr/bin/env python3
import json
import re
import sys
from pathlib import Path
from typing import List, Optional, Tuple

TOOL_LABELS = {
    "shellToolCall": "Shell",
    "readToolCall": "Read",
    "writeToolCall": "Write",
    "editToolCall": "Edit",
    "deleteToolCall": "Delete",
    "globToolCall": "Search files",
    "grepToolCall": "Search",
    "lsToolCall": "List directory",
    "fetchToolCall": "Fetch",
    "webSearchToolCall": "Web search",
    "mcpToolCall": "MCP tool",
    "todoToolCall": "Todo update",
}

WORKTREES_MARKER = "/worktrees/"
RESULTS_MARKER = "/results/"


def humanize_tool_key(key: str) -> str:
    if key in TOOL_LABELS:
        return TOOL_LABELS[key]
    label = key.replace("ToolCall", "")
    label = re.sub(r"([a-z])([A-Z])", r"\1 \2", label)
    return label[:1].upper() + label[1:] if label else "Tool"


def collapse_whitespace(text: str) -> str:
    return re.sub(r"\s+", " ", str(text or "")).strip()


def truncate(text: str, maximum: int) -> str:
    clean = collapse_whitespace(text)
    if len(clean) <= maximum:
        return clean
    return clean[: maximum - 1] + "…"


def shorten_path(path: str) -> str:
    value = str(path or "").strip()
    if not value:
        return ""

    if "/config/prompts/" in value:
        return "prompts/" + Path(value).name
    if "/config/" in value:
        return "config/" + Path(value).name
    if "/state/" in value:
        return "state/" + Path(value).name

    marker_index = value.find(WORKTREES_MARKER)
    if marker_index >= 0:
        remainder = value[marker_index + len(WORKTREES_MARKER) :]
        parts = remainder.split("/", 1)
        if len(parts) == 2:
            return f"{parts[0]}/{Path(parts[1]).name}"
        return remainder

    marker_index = value.find(RESULTS_MARKER)
    if marker_index >= 0:
        return "results/" + Path(value).name

    if value.startswith("/"):
        return Path(value).name
    return value


def shorten_shell_command(command: str) -> str:
    clean = collapse_whitespace(command)
    if not clean:
        return ""
    first_segment = clean.split(";")[0].split("&&")[0].strip()
    return truncate(first_segment, 100)


def infer_phase(text: str) -> Optional[str]:
    lower = text.lower()
    if "scan result json" in lower or "writing the scan result" in lower:
        return "Write results"
    if "auto-fix pr" in lower or "creating an auto-fix" in lower:
        return "Auto-fix PR (High)"
    if "fetching recent commits" in lower or "scan window" in lower:
        return "Scan"
    if "scanning recent" in lower or "security and correctness" in lower:
        return "Scan"
    if "worktree" in lower or "run directory" in lower or "scan pipeline" in lower:
        return "Setup"
    return None


def extract_assistant_text(event: dict) -> str:
    message = event.get("message") or {}
    parts = []
    for part in message.get("content") or []:
        if part.get("type") == "text" and part.get("text"):
            parts.append(str(part["text"]))
    return "".join(parts)


def is_partial_assistant_chunk(event: dict, text: str) -> bool:
    if event.get("model_call_id"):
        return False
    stripped = text.strip()
    if not stripped:
        return True
    if stripped.startswith("Scan status:") and len(stripped) > 80:
        return False
    if stripped.endswith("\n") and len(stripped) >= 40:
        return False
    return True


def parse_summary_field(pattern: str, text: str) -> Optional[str]:
    match = re.search(pattern, text, re.IGNORECASE | re.MULTILINE)
    return match.group(1).strip() if match else None


def parse_summary_items(text: str, section: str) -> List[str]:
    pattern = rf"{section}:\s*(\d+)\s*\n((?:- .+\n?)*)"
    match = re.search(pattern, text, re.IGNORECASE)
    if not match:
        count_match = re.search(rf"{section}:\s*(\d+)", text, re.IGNORECASE)
        if count_match:
            return []
        return []
    block = match.group(2)
    return [collapse_whitespace(line[2:]) for line in block.splitlines() if line.startswith("- ")]


def format_summary_block(text: str) -> List[str]:
    lines = ["", "▸ Summary"]
    status = parse_summary_field(r"Scan status:\s*(\S+)", text) or "unknown"
    repos = parse_summary_field(r"Repositories scanned:\s*(\d+)", text) or "?"
    failures = parse_summary_field(r"Failures:\s*(\d+)", text) or "0"
    lines.append(f"  Status:     {status}")
    lines.append(f"  Repos:      {repos} scanned, {failures} failed")

    for section, label in [("High", "High"), ("Medium", "Medium"), ("Low", "Low")]:
        count = parse_summary_field(rf"{section}:\s*(\d+)", text) or "0"
        items = parse_summary_items(text, section)
        if items:
            lines.append(f"  {label + ':':10} {count}  {items[0]}")
            for item in items[1:]:
                lines.append(f"  {'':10}    {item}")
        else:
            lines.append(f"  {label + ':':10} {count}")

    pr_count = parse_summary_field(r"PRs created:\s*(\d+)", text) or "0"
    pr_items = parse_summary_items(text, "PRs created")
    lines.append(f"  {'PRs:':10} {pr_count} created")
    for item in pr_items:
        lines.append(f"  {'':10}    {item}")

    resolved_count = parse_summary_field(r"Resolved issues:\s*(\d+)", text)
    if resolved_count:
        resolved_items = parse_summary_items(text, "Resolved issues")
        lines.append(f"  {'Resolved:':10} {resolved_count} issues")
        for item in resolved_items:
            lines.append(f"  {'':10}    {item}")

    skipped_items = parse_summary_items(text, "Skipped steps")
    if skipped_items:
        lines.append(f"  {'Skipped:':10}")
        for item in skipped_items[:3]:
            lines.append(f"  {'':10}    {item}")
        if len(skipped_items) > 3:
            lines.append(f"  {'':10}    … and {len(skipped_items) - 3} more")

    return lines


def format_report_json(payload: dict) -> str:
    lines = ["", "Generating report and sending Feishu notification..."]
    html_path = payload.get("html_path")
    pdf_path = payload.get("pdf_path")
    if html_path:
        lines.append(f"  HTML:  {shorten_path(str(html_path))}")
    if pdf_path:
        lines.append(f"  PDF:   {shorten_path(str(pdf_path))}")
    report_status = payload.get("report_status")
    if report_status and report_status != "generated":
        lines.append(f"  Report: {report_status}")
    feishu_status = payload.get("feishu_status")
    if feishu_status:
        lines.append(f"  Feishu: {feishu_status}")
        if payload.get("feishu_error"):
            lines.append(f"         {payload['feishu_error']}")
    jira_status = payload.get("jira_status")
    if jira_status and jira_status != "disabled":
        created = payload.get("jira_created", 0)
        failed = payload.get("jira_failed", 0)
        lines.append(f"  Jira:  {jira_status} ({created} created, {failed} failed)")
        if payload.get("jira_error"):
            lines.append(f"         {payload['jira_error']}")
    dashboard_status = payload.get("dashboard_status")
    if dashboard_status and dashboard_status != "not_generated":
        lines.append(f"  Dashboard: {dashboard_status}")
    return "\n".join(lines)


def tool_call_info(tool_call: dict) -> Tuple[str, str]:
    if not isinstance(tool_call, dict):
        return "Tool", ""
    key = next(iter(tool_call), None)
    payload = tool_call.get(key) if key else None
    label = humanize_tool_key(key) if key else "Tool"
    description = ""
    if isinstance(payload, dict):
        args = payload.get("args") or {}
        description = payload.get("description") or ""
        if not description and key in {"readToolCall", "editToolCall", "writeToolCall", "deleteToolCall"}:
            description = shorten_path(str(args.get("path", "")))
        elif not description and key == "grepToolCall":
            description = collapse_whitespace(str(args.get("pattern", "")))
        elif not description and key == "globToolCall":
            description = collapse_whitespace(str(args.get("globPattern", "")))
        elif not description and key == "shellToolCall":
            description = args.get("description") or shorten_shell_command(str(args.get("command", "")))
    return label, str(description)


def tool_result_status(tool_call: dict):
    if not isinstance(tool_call, dict):
        return None
    key = next(iter(tool_call), None)
    payload = tool_call.get(key) if key else None
    if not isinstance(payload, dict):
        return None
    result = payload.get("result")
    if not isinstance(result, dict):
        return None
    success = result.get("success")
    if isinstance(success, dict):
        exit_code = success.get("exitCode")
        if isinstance(exit_code, int) and exit_code != 0:
            return {"ok": False, "detail": f"exit {exit_code}"}
        return {"ok": True, "detail": ""}
    error = result.get("error")
    if error is not None:
        message = error.get("message") if isinstance(error, dict) else error
        return {"ok": False, "detail": truncate(str(message), 120)}
    return None


class ScanLogFormatter:
    def __init__(self) -> None:
        self.summary_printed = False
        self.seen_messages = set()
        self.last_tool_signature = ""
        self.last_phase = None

    def print_lines(self, lines: List[str]) -> None:
        for line in lines:
            print(line)

    def handle_assistant(self, event: dict) -> None:
        text = extract_assistant_text(event)
        if not text.strip():
            return
        if is_partial_assistant_chunk(event, text):
            return

        normalized = collapse_whitespace(text)
        if normalized in self.seen_messages:
            return
        self.seen_messages.add(normalized)

        if "Scan status:" in text:
            if not self.summary_printed:
                self.summary_printed = True
                self.print_lines(format_summary_block(text))
            return

        phase = infer_phase(text)
        body = collapse_whitespace(text)
        lines = []
        if phase:
            if phase != self.last_phase:
                lines.append("")
                lines.append(f"▸ Phase: {phase}")
                self.last_phase = phase
            lines.append(f"  {body}")
        else:
            lines.append("")
            lines.append(f"  {body}")
        self.print_lines(lines)

    def handle_result(self, event: dict) -> None:
        if event.get("is_error"):
            message = truncate(str(event.get("result") or "unknown error"), 200)
            self.print_lines(["", f"✗ Scan agent reported an error: {message}"])
            return

        result_text = str(event.get("result") or "")
        if "Scan status:" in result_text and not self.summary_printed:
            summary_start = result_text.find("Scan status:")
            self.summary_printed = True
            self.print_lines(format_summary_block(result_text[summary_start:]))

        self.print_lines(["", "✓ Scan agent run finished."])

    def format_line(self, line: str) -> None:
        trimmed = line.strip()
        if not trimmed:
            return

        try:
            event = json.loads(trimmed)
        except json.JSONDecodeError:
            if trimmed.startswith("{") and '"html_path"' in trimmed:
                try:
                    payload = json.loads(trimmed)
                    print(format_report_json(payload))
                except json.JSONDecodeError:
                    print(trimmed)
            else:
                print(trimmed)
            return

        event_type = event.get("type")
        subtype = event.get("subtype")

        if event_type == "system" and subtype == "init":
            print(f"▸ Session started (model: {event.get('model', 'unknown')})")
            return

        if event_type == "assistant":
            self.handle_assistant(event)
            return

        if event_type == "tool_call" and subtype == "started":
            label, description = tool_call_info(event.get("tool_call") or {})
            signature = f"{label}|{description}"
            if signature == self.last_tool_signature:
                return
            self.last_tool_signature = signature
            if description:
                print(f"▸ {label}  {truncate(description, 100)}")
            else:
                print(f"▸ {label}")
            return

        if event_type == "tool_call" and subtype == "completed":
            self.last_tool_signature = ""
            status = tool_result_status(event.get("tool_call") or {})
            if status and not status["ok"]:
                label, _ = tool_call_info(event.get("tool_call") or {})
                detail_text = status.get("detail")
                detail = ""
                if detail_text and str(detail_text) not in {"None", ""}:
                    detail = f" ({detail_text})"
                print(f"✗ {label} failed{detail}")
            return

        if event_type == "result":
            self.handle_result(event)
            return


def main() -> int:
    if len(sys.argv) == 3 and sys.argv[1] == "--report-json":
        try:
            payload = json.loads(sys.argv[2])
        except json.JSONDecodeError as exc:
            print(f"Error: invalid report JSON: {exc}", file=sys.stderr)
            return 1
        print(format_report_json(payload))
        return 0

    formatter = ScanLogFormatter()
    for line in sys.stdin:
        formatter.format_line(line.rstrip("\n"))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
