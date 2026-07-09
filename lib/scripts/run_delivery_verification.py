#!/usr/bin/env python3
"""Run mandatory delivery verification checks in repository worktrees."""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path
from typing import Any

from delivery_progress import append_verification, docker_available
from delivery_workspace import (
    StoryContext,
    delivery_result_path,
    load_delivery_config,
    load_story_context,
    read_json,
    write_json,
)


DEFAULT_JAVA_GRADLE_STEPS = [
    {
        "id": "language_grammar",
        "label": "Language Grammar Check",
        "command": ["./gradlew", "compileJava", "compileTestJava", "-x", "test"],
        "optional": False,
    },
    {
        "id": "pmd",
        "label": "PMD Check",
        "command": ["./gradlew", "pmdMain", "pmdTest"],
        "optional": False,
    },
    {
        "id": "unit_test",
        "label": "Unit Test",
        "command": [
            "./gradlew",
            "test",
            "--tests",
            "*ApplicationTest",
            "--tests",
            "*HelperTest",
            "--tests",
            "*RendererTest",
            "--tests",
            "*PropertiesTest",
            "--tests",
            "*MergerTest",
            "--tests",
            "*PusherTest",
            "--tests",
            "*QueryApplicationTest",
        ],
        "optional": False,
        "allow_no_tests": True,
    },
    {
        "id": "integration_test",
        "label": "Integration Test",
        "command": [
            "./gradlew",
            "test",
            "--tests",
            "*ControllerTest",
            "--tests",
            "*BaseTest",
            "--tests",
            "*IntegrationTest",
            "--tests",
            "*IT",
        ],
        "optional": False,
        "allow_no_tests": True,
        "requires_docker": True,
    },
]


def detect_java_gradle(repo_path: Path) -> bool:
    build_file = repo_path / "build.gradle"
    if not build_file.is_file():
        return False
    text = build_file.read_text(encoding="utf-8", errors="ignore")
    return "id 'pmd'" in text or 'id "pmd"' in text


def gradle_wrapper(repo_path: Path) -> Path:
    wrapper = repo_path / "gradlew"
    if wrapper.is_file():
        return wrapper
    return Path("./gradlew")


def docker_policy(delivery_config: dict) -> dict[str, Any]:
    verification = delivery_config.get("verification", {})
    if not isinstance(verification, dict):
        return {
            "mode": "host_testcontainers",
            "required_for": ["integration_test"],
            "skip_if_unavailable": False,
            "check_before_run": True,
        }
    docker_cfg = verification.get("docker", {})
    if not isinstance(docker_cfg, dict):
        docker_cfg = {}
    required_for = docker_cfg.get("required_for")
    if not isinstance(required_for, list) or not required_for:
        required_for = ["integration_test"]
    return {
        "mode": str(docker_cfg.get("mode", "host_testcontainers")),
        "required_for": [str(item) for item in required_for],
        "skip_if_unavailable": bool(docker_cfg.get("skip_if_unavailable", False)),
        "check_before_run": bool(docker_cfg.get("check_before_run", True)),
    }


def verification_steps(delivery_config: dict, repo_path: Path) -> list[dict[str, Any]]:
    verification = delivery_config.get("verification", {})
    if not isinstance(verification, dict):
        verification = {}

    if detect_java_gradle(repo_path):
        configured = verification.get("java_gradle", {}).get("steps")
        if isinstance(configured, list) and configured:
            return configured
        return DEFAULT_JAVA_GRADLE_STEPS

    configured_steps = verification.get("steps", {}).get(repo_path.name)
    if isinstance(configured_steps, list) and configured_steps:
        return configured_steps
    return []


def looks_like_no_tests(output: str) -> bool:
    lowered = output.lower()
    needles = [
        "no tests found",
        "no matching tests",
        "no test found",
        "filter matched 0 tests",
    ]
    return any(needle in lowered for needle in needles)


def run_command(repo_path: Path, command: list[str]) -> tuple[int, str]:
    if command and command[0] == "./gradlew":
        wrapper = gradle_wrapper(repo_path)
        command = [str(wrapper), *command[1:]]
    completed = subprocess.run(
        command,
        cwd=str(repo_path),
        check=False,
        capture_output=True,
        text=True,
    )
    output = (completed.stdout or "") + ("\n" + completed.stderr if completed.stderr else "")
    return completed.returncode, output.strip()


def step_requires_docker(step: dict[str, Any], policy: dict[str, Any]) -> bool:
    step_id = str(step.get("id", ""))
    if bool(step.get("requires_docker")):
        return True
    return step_id in set(policy.get("required_for") or [])


def run_step(
    repo_path: Path,
    step: dict[str, Any],
    policy: dict[str, Any],
    docker_ok: bool,
    docker_detail: str,
) -> dict[str, Any]:
    step_id = str(step.get("id", "unknown"))
    label = str(step.get("label", step_id))
    command = step.get("command") or []

    if step_requires_docker(step, policy) and policy.get("check_before_run") and not docker_ok:
        if policy.get("skip_if_unavailable"):
            return {
                "id": step_id,
                "label": label,
                "command": "",
                "exit_code": 0,
                "summary": f"Skipped — Docker unavailable ({docker_detail})",
                "status": "skipped",
                "docker": {"required": True, "available": False},
            }
        return {
            "id": step_id,
            "label": label,
            "command": "",
            "exit_code": 1,
            "summary": (
                "Docker is required for integration tests (Testcontainers). "
                f"Start Docker/Colima and retry. Detail: {docker_detail}"
            ),
            "status": "failed",
            "docker": {"required": True, "available": False},
        }

    if not isinstance(command, list) or not command:
        return {
            "id": step_id,
            "label": label,
            "command": "",
            "exit_code": 1,
            "summary": "Missing verification command",
            "status": "failed",
        }

    command_text = " ".join(str(part) for part in command)
    print(f"[verification] {repo_path.name}: {label} …", flush=True)
    exit_code, output = run_command(repo_path, [str(part) for part in command])
    allow_no_tests = bool(step.get("allow_no_tests"))
    status = "passed" if exit_code == 0 else "failed"
    summary = "Passed" if exit_code == 0 else output[-2000:] or f"Exit code {exit_code}"

    if exit_code != 0 and allow_no_tests and looks_like_no_tests(output):
        status = "skipped"
        summary = "No matching tests for this repository profile"

    icon = {"passed": "✓", "failed": "✗", "skipped": "-"}.get(status, "?")
    print(f"[verification] {repo_path.name}: {label} {icon}", flush=True)

    result = {
        "id": step_id,
        "label": label,
        "command": command_text,
        "exit_code": exit_code,
        "summary": summary,
        "status": status,
    }
    if step_requires_docker(step, policy):
        result["docker"] = {"required": True, "available": docker_ok, "mode": policy.get("mode")}
    return result


def merge_verification_results(result_path: Path, results: list[dict[str, Any]]) -> None:
    payload = read_json(result_path, {})
    existing = payload.get("verification_results") or []
    if not isinstance(existing, list):
        existing = []
    payload["verification_results"] = existing + results
    write_json(result_path, payload)


def run_verification(
    context: StoryContext,
    delivery_config: dict,
    result_path: Path,
    workspace_root: Path | None = None,
) -> list[dict[str, Any]]:
    results: list[dict[str, Any]] = []
    verification = delivery_config.get("verification", {})
    auto_run = True
    if isinstance(verification, dict) and "auto_run_after_agent" in verification:
        auto_run = bool(verification.get("auto_run_after_agent"))
    if not auto_run:
        return results

    policy = docker_policy(delivery_config)
    docker_ok, docker_detail = docker_available()
    if policy.get("check_before_run"):
        if docker_ok:
            print(f"[verification] Docker: available ({policy.get('mode')})", flush=True)
        else:
            print(f"[verification] Docker: unavailable — {docker_detail}", flush=True)

    progress_root = workspace_root or context.workspace_root

    for repo in context.repos:
        worktree = repo.worktree_path
        if not worktree.is_dir():
            item = {
                "repository": repo.name,
                "id": "worktree",
                "label": "Worktree",
                "command": "",
                "exit_code": 1,
                "summary": f"Worktree not found: {worktree}",
                "status": "failed",
            }
            results.append(item)
            append_verification(progress_root, item)
            continue

        steps = verification_steps(delivery_config, repo.path)
        if not steps:
            item = {
                "repository": repo.name,
                "id": "profile",
                "label": "Verification Profile",
                "command": "",
                "exit_code": 0,
                "summary": "No automatic verification profile for this repository",
                "status": "skipped",
            }
            results.append(item)
            append_verification(progress_root, item)
            continue

        print(f"[verification] Repository: {repo.name} ({worktree})", flush=True)
        for step in steps:
            item = run_step(worktree, step, policy, docker_ok, docker_detail)
            item["repository"] = repo.name
            results.append(item)
            append_verification(progress_root, item)

    if result_path.is_file():
        merge_verification_results(result_path, results)
    return results


def main() -> int:
    parser = argparse.ArgumentParser(description="Run delivery verification checks.")
    parser.add_argument("docs_dir")
    parser.add_argument("--story", default="")
    parser.add_argument("--result", default="")
    parser.add_argument("--workspace-root", default="")
    args = parser.parse_args()

    docs_dir = Path(args.docs_dir).expanduser().resolve()
    try:
        context = load_story_context(docs_dir, args.story)
    except (OSError, ValueError, FileNotFoundError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    result_path = (
        Path(args.result).expanduser().resolve()
        if args.result
        else delivery_result_path(context.workspace_root)
    )
    workspace_root = (
        Path(args.workspace_root).expanduser().resolve()
        if args.workspace_root
        else context.workspace_root
    )
    delivery_config = context.delivery_config or load_delivery_config(docs_dir, context.workspace_root)

    results = run_verification(context, delivery_config, result_path, workspace_root)
    print(json.dumps(results, indent=2, ensure_ascii=False))

    failed = [item for item in results if item.get("status") == "failed"]
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
