from __future__ import annotations

from typing import Any, Optional

from feishu.config import load_agents_config


def workspace_isolation_v2_enabled(config: Optional[dict[str, Any]] = None) -> bool:
    data = config if isinstance(config, dict) else load_agents_config()
    security = data.get("agent_security") if isinstance(data.get("agent_security"), dict) else {}
    if "workspace_isolation_v2" in security:
        return bool(security.get("workspace_isolation_v2"))
    # M0.3.1 ships default-on for conversational agents.
    return True


def security_flags(config: Optional[dict[str, Any]] = None) -> dict[str, Any]:
    data = config if isinstance(config, dict) else load_agents_config()
    security = data.get("agent_security") if isinstance(data.get("agent_security"), dict) else {}
    return {
        "workspace_isolation_v2": workspace_isolation_v2_enabled(data),
        "cursor_api_key_in_child_env": bool(security.get("allow_cursor_api_key_in_child_env", True)),
        "raw": security,
    }
