#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import signal
import sys
from pathlib import Path

LIB_DIR = Path(__file__).resolve().parent.parent
if str(LIB_DIR) not in sys.path:
    sys.path.insert(0, str(LIB_DIR))

from feishu.channel import FeishuChannel
from feishu.client_registry import configured_agents
from feishu.config import agents_enabled, agents_home, load_agents_config


def _load_dotenv(path: Path) -> None:
    if not path.is_file():
        return
    for line in path.read_text(encoding="utf-8").splitlines():
        raw = line.strip()
        if not raw or raw.startswith("#") or "=" not in raw:
            continue
        key, value = raw.split("=", 1)
        key = key.strip()
        value = value.strip().strip("'").strip('"')
        if key and key not in os.environ:
            os.environ[key] = value


def bootstrap_env() -> None:
    home = Path(os.environ.get("LUMEN_HOME", Path.home() / ".lumen"))
    _load_dotenv(home / ".env.local")
    _load_dotenv(Path.home() / ".lumen" / ".env.local")


def pid_path() -> Path:
    return agents_home() / "gateway.pid"


def status_path() -> Path:
    return agents_home() / "gateway-status.json"


def write_status(payload: dict) -> None:
    status_path().write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def cmd_status() -> int:
    path = pid_path()
    config = load_agents_config()
    clients = configured_agents(["dylan"])
    running = False
    pid = None
    if path.is_file():
        try:
            pid = int(path.read_text(encoding="utf-8").strip())
            os.kill(pid, 0)
            running = True
        except Exception:
            running = False
    print(json.dumps({
        "running": running,
        "pid": pid if running else None,
        "agents_enabled": agents_enabled(config),
        "clients": [item.agent_id for item in clients],
        "home": str(agents_home()),
    }, indent=2))
    return 0


def cmd_stop() -> int:
    path = pid_path()
    if not path.is_file():
        print("Agent gateway is not running.")
        return 0
    try:
        pid = int(path.read_text(encoding="utf-8").strip())
    except Exception:
        path.unlink(missing_ok=True)
        print("Removed stale gateway pid file.")
        return 0
    try:
        os.kill(pid, signal.SIGTERM)
        print(f"Stopped agent gateway pid {pid}")
    except ProcessLookupError:
        print("Agent gateway process not found; cleared pid file.")
    except Exception as exc:
        print(f"Failed to stop gateway: {exc}", file=sys.stderr)
        return 1
    path.unlink(missing_ok=True)
    write_status({"running": False})
    return 0


def cmd_start() -> int:
    config = load_agents_config()
    if not agents_enabled(config):
        print(
            "Agents are disabled. Set agents.enabled=true in "
            f"{agents_home() / 'config.json'} or export LUMEN_AGENTS_ENABLED=1",
            file=sys.stderr,
        )
        return 1
    clients = configured_agents(["dylan"])
    if not clients:
        print(
            "No Dylan credentials found. Set FEISHU_DYLAN_APP_ID and FEISHU_DYLAN_APP_SECRET.",
            file=sys.stderr,
        )
        return 1
    path = pid_path()
    if path.is_file():
        try:
            existing = int(path.read_text(encoding="utf-8").strip())
            os.kill(existing, 0)
            print(f"Agent gateway already running (pid {existing})", file=sys.stderr)
            return 1
        except Exception:
            path.unlink(missing_ok=True)

    path.write_text(str(os.getpid()), encoding="utf-8")
    write_status({
        "running": True,
        "pid": os.getpid(),
        "clients": [item.agent_id for item in clients],
    })

    def _cleanup(*_args) -> None:
        path.unlink(missing_ok=True)
        write_status({"running": False})
        sys.exit(0)

    signal.signal(signal.SIGTERM, _cleanup)
    signal.signal(signal.SIGINT, _cleanup)
    channel = FeishuChannel(clients=clients)
    try:
        channel.start()
    except Exception as exc:
        print(str(exc), file=sys.stderr)
        path.unlink(missing_ok=True)
        write_status({"running": False, "error": str(exc)})
        return 1
    return 0


def main(argv: list[str] | None = None) -> int:
    bootstrap_env()
    parser = argparse.ArgumentParser(description="Lumen Feishu Agent Gateway")
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("start", help="Start Dylan Feishu gateway (foreground)")
    sub.add_parser("status", help="Show gateway status")
    sub.add_parser("stop", help="Stop gateway via pid file")
    args = parser.parse_args(argv)
    if args.command == "start":
        return cmd_start()
    if args.command == "status":
        return cmd_status()
    if args.command == "stop":
        return cmd_stop()
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
