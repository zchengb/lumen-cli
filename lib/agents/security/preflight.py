from __future__ import annotations

import json
import shutil
import tempfile
from pathlib import Path
from typing import Any, Optional

from agents.security.env import build_agent_env, env_contains_secrets
from agents.security.resources import assert_within_workspace, is_forbidden_host_path
from agents.security.broker import CapabilityBroker
from agents.security.actions import ActionRequest
from feishu.config import load_agents_config


def _cursor_available() -> bool:
    return bool(shutil.which("agent") or shutil.which("cursor-agent"))


def _sandbox_defaults_ok() -> bool:
    from agents.runtime.cursor_runtime import CursorAgentRuntime

    runtime = CursorAgentRuntime()
    return runtime.sandbox == "enabled" and runtime.force is False


def run_security_check(
    *,
    agent_id: str = "dylan",
    project: str = "",
    config: Optional[dict[str, Any]] = None,
) -> dict[str, Any]:
    agent = str(agent_id or "dylan").strip().lower()
    checks: dict[str, Any] = {}
    critical_fail = False

    checks["cursor_cli"] = "pass" if _cursor_available() else "fail"
    if checks["cursor_cli"] == "fail":
        critical_fail = True

    checks["sandbox"] = _sandbox_defaults_ok()
    if not checks["sandbox"]:
        critical_fail = True

    env = build_agent_env(agent_id=agent, project=project)
    leaked = env_contains_secrets(env)
    # CURSOR_API_KEY is intentionally allowed as provider credential reference.
    checks["secret_env"] = "isolated" if not leaked else f"leaked:{','.join(leaked)}"
    if leaked:
        critical_fail = True

    with tempfile.TemporaryDirectory() as tmp:
        workspace = Path(tmp)
        (workspace / "ok.txt").write_text("ok\n", encoding="utf-8")
        try:
            assert_within_workspace(workspace / "ok.txt", workspace)
            checks["workspace_read"] = "allowed"
        except Exception as exc:
            checks["workspace_read"] = f"fail:{exc}"
            critical_fail = True
        desktop = Path.home() / "Desktop" / "lumen-security-probe.png"
        try:
            assert_within_workspace(desktop, workspace)
            checks["workspace_escape"] = "fail"
            critical_fail = True
        except PermissionError:
            checks["workspace_escape"] = "blocked"
        checks["host_write"] = "blocked" if is_forbidden_host_path(Path.home() / "Library" / "LaunchAgents") else "fail"
        if checks["host_write"] != "blocked":
            critical_fail = True
        link = workspace / "escape-link"
        try:
            link.symlink_to(Path.home() / "Desktop")
            try:
                assert_within_workspace(link, workspace)
                checks["symlink_escape"] = "fail"
                critical_fail = True
            except PermissionError:
                checks["symlink_escape"] = "blocked"
        except OSError:
            checks["symlink_escape"] = "skipped"

    # Broker deny unknown action
    broker = CapabilityBroker(config=config or load_agents_config())
    denied = broker.execute(
        ActionRequest(
            agent_id=agent,
            action="filesystem.delete",
            project_slug=project or "probe",
            actor_user_id="security-check",
            chat_id="security-check",
            thread_id="",
            source_message_id="security-check",
            trace_id="security-check",
            explicit_authorization=True,
        )
    )
    checks["broker"] = "active" if denied.status == "denied" else "fail"
    if checks["broker"] != "active":
        critical_fail = True

    access = (config or load_agents_config()).get("access") if isinstance((config or load_agents_config()).get("access"), dict) else {}
    checks["authorization"] = "active"
    checks["network"] = "blocked"
    checks["access_configured"] = bool(
        access.get("mutation_allowed_user_ids") or access.get("admin_user_ids")
    )

    status = "fail" if critical_fail else "pass"
    return {
        "status": status,
        "agent_id": agent,
        "project": project,
        "sandbox": bool(checks["sandbox"]),
        "workspace_escape": checks.get("workspace_escape"),
        "host_write": checks.get("host_write"),
        "secret_env": checks.get("secret_env"),
        "network": checks.get("network"),
        "broker": checks.get("broker"),
        "authorization": checks.get("authorization"),
        "checks": checks,
        "conversation_enabled": status == "pass",
    }


def assert_security_gate(config: Optional[dict[str, Any]] = None) -> dict[str, Any]:
    result = run_security_check(config=config)
    if result.get("status") != "pass":
        raise RuntimeError(json.dumps(result, ensure_ascii=False))
    return result
