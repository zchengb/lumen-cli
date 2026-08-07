from __future__ import annotations

from pathlib import Path
from typing import Any

from feishu.config import agents_home, load_agents_config, save_agents_config

AGENT_META = {
    "dylan": {
        "display_name": "Dylan",
        "role": "scan",
        "workflow": "auto_scan",
        "title": "Engineering Risk Analyst",
    },
    "mark": {
        "display_name": "Mark",
        "role": "delivery",
        "workflow": "auto_delivery",
        "title": "Delivery Lead",
    },
}


def packaged_soul_path(agent_id: str) -> Path:
    agent = str(agent_id or "").strip().lower()
    return Path(__file__).resolve().parent / agent / "soul.md"


def soul_override_path(agent_id: str) -> Path:
    agent = str(agent_id or "").strip().lower()
    return agents_home() / "souls" / f"{agent}.md"


def load_agent_soul(agent_id: str) -> tuple[str, str]:
    agent = str(agent_id or "").strip().lower()
    override = soul_override_path(agent)
    if override.is_file():
        return override.read_text(encoding="utf-8"), "override"
    packaged = packaged_soul_path(agent)
    if packaged.is_file():
        return packaged.read_text(encoding="utf-8"), "packaged"
    return "", "missing"


def save_agent_soul(agent_id: str, text: str) -> Path:
    agent = str(agent_id or "").strip().lower()
    if agent not in AGENT_META:
        raise ValueError(f"Unknown agent: {agent}")
    path = soul_override_path(agent)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(str(text or "").rstrip() + "\n", encoding="utf-8")
    return path


def _ensure_dict(parent: dict[str, Any], key: str) -> dict[str, Any]:
    value = parent.get(key)
    if not isinstance(value, dict):
        value = {}
        parent[key] = value
    return value


def _agent_section(config: dict[str, Any], agent_id: str) -> dict[str, Any]:
    return _ensure_dict(config, agent_id)


def _conversation_v4(agent_cfg: dict[str, Any]) -> dict[str, Any]:
    return _ensure_dict(agent_cfg, "conversation_v4")


def agent_settings_view(agent_id: str, config: dict[str, Any] | None = None) -> dict[str, Any]:
    agent = str(agent_id or "").strip().lower()
    meta = AGENT_META.get(agent)
    if meta is None:
        raise ValueError(f"Unknown agent: {agent}")
    data = config if isinstance(config, dict) else load_agents_config()
    agent_cfg = data.get(agent) if isinstance(data.get(agent), dict) else {}
    v4 = agent_cfg.get("conversation_v4") if isinstance(agent_cfg.get("conversation_v4"), dict) else {}
    provider = v4.get("provider") if isinstance(v4.get("provider"), dict) else {}
    runtime = v4.get("runtime") if isinstance(v4.get("runtime"), dict) else {}
    reaction = v4.get("reaction") if isinstance(v4.get("reaction"), dict) else {}
    soul_cfg = v4.get("soul") if isinstance(v4.get("soul"), dict) else {}
    profiles = data.get("profiles") if isinstance(data.get("profiles"), dict) else {}
    profile = profiles.get(agent) if isinstance(profiles.get(agent), dict) else {}
    soul_text, soul_source = load_agent_soul(agent)
    return {
        "id": agent,
        "display_name": meta["display_name"],
        "title": meta["title"],
        "role": str(profile.get("role") or meta["role"]),
        "workflow": str(profile.get("workflow") or meta["workflow"]),
        "conversation_enabled": bool(v4.get("enabled", False)),
        "mode": str(v4.get("mode") or "autonomous_workspace"),
        "model": str(provider.get("model") or "cursor-grok-4.5-medium"),
        "soft_timeout_seconds": int(runtime.get("soft_timeout_seconds") or 90),
        "hard_timeout_seconds": int(runtime.get("hard_timeout_seconds") or 300),
        "reaction_enabled": bool(reaction.get("enabled", True)),
        "max_concurrent_jobs": int(agent_cfg.get("max_concurrent_jobs") or 3),
        "soul_version": str(soul_cfg.get("version") or ""),
        "soul": soul_text,
        "soul_source": soul_source,
        "soul_override_path": str(soul_override_path(agent)),
    }


def agents_settings_payload() -> dict[str, Any]:
    config = load_agents_config()
    return {
        "enabled": bool(config.get("enabled", False)),
        "home": str(agents_home()),
        "config_path": str(agents_home() / "config.json"),
        "agents": [agent_settings_view(agent_id, config) for agent_id in AGENT_META],
    }


def apply_agent_settings(payload: dict[str, Any]) -> dict[str, Any]:
    config = load_agents_config()
    if "enabled" in payload:
        config["enabled"] = bool(payload.get("enabled"))
    profiles = _ensure_dict(config, "profiles")
    agents = payload.get("agents")
    if not isinstance(agents, list):
        raise ValueError("agents must be a list")
    for item in agents:
        if not isinstance(item, dict):
            continue
        agent_id = str(item.get("id") or "").strip().lower()
        if agent_id not in AGENT_META:
            raise ValueError(f"Unknown agent: {agent_id}")
        meta = AGENT_META[agent_id]
        agent_cfg = _agent_section(config, agent_id)
        if "max_concurrent_jobs" in item:
            jobs = int(item.get("max_concurrent_jobs") or 3)
            if jobs < 1 or jobs > 32:
                raise ValueError("max_concurrent_jobs must be between 1 and 32")
            agent_cfg["max_concurrent_jobs"] = jobs
        v4 = _conversation_v4(agent_cfg)
        if "conversation_enabled" in item:
            v4["enabled"] = bool(item.get("conversation_enabled"))
        if not v4.get("mode"):
            v4["mode"] = "autonomous_workspace"
        if "mode" in item and str(item.get("mode") or "").strip():
            v4["mode"] = str(item.get("mode")).strip()
        provider = _ensure_dict(v4, "provider")
        provider.setdefault("type", "cursor_cli")
        provider.setdefault("output_format", "stream-json")
        provider.setdefault("resume_sessions", True)
        if "model" in item:
            model = str(item.get("model") or "").strip()
            if not model:
                raise ValueError(f"{agent_id} model is required")
            provider["model"] = model
        runtime = _ensure_dict(v4, "runtime")
        if "soft_timeout_seconds" in item:
            soft = int(item.get("soft_timeout_seconds") or 90)
            if soft < 10 or soft > 3600:
                raise ValueError("soft_timeout_seconds must be between 10 and 3600")
            runtime["soft_timeout_seconds"] = soft
        if "hard_timeout_seconds" in item:
            hard = int(item.get("hard_timeout_seconds") or 300)
            if hard < 30 or hard > 7200:
                raise ValueError("hard_timeout_seconds must be between 30 and 7200")
            runtime["hard_timeout_seconds"] = hard
        soft = int(runtime.get("soft_timeout_seconds") or 90)
        hard = int(runtime.get("hard_timeout_seconds") or 300)
        if hard < soft:
            raise ValueError("hard_timeout_seconds must be >= soft_timeout_seconds")
        reaction = _ensure_dict(v4, "reaction")
        if "reaction_enabled" in item:
            reaction["enabled"] = bool(item.get("reaction_enabled"))
        reaction.setdefault("emoji_type", "Typing")
        reaction.setdefault("add_immediately", True)
        reaction.setdefault("remove_on_success", True)
        reaction.setdefault("remove_on_failure", True)
        soul_cfg = _ensure_dict(v4, "soul")
        if "soul_version" in item and str(item.get("soul_version") or "").strip():
            soul_cfg["version"] = str(item.get("soul_version")).strip()
        soul_cfg.setdefault("bootstrap_once", True)
        profile = _ensure_dict(profiles, agent_id)
        profile["role"] = str(item.get("role") or profile.get("role") or meta["role"]).strip() or meta["role"]
        profile["workflow"] = str(item.get("workflow") or profile.get("workflow") or meta["workflow"]).strip() or meta["workflow"]
        if "soul" in item:
            save_agent_soul(agent_id, str(item.get("soul") or ""))
    save_agents_config(config)
    return agents_settings_payload()
