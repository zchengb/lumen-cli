#!/usr/bin/env python3
"""Run mandatory delivery verification checks in repository worktrees."""

from __future__ import annotations

import argparse
import json
import os
import re
import shlex
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Any, Optional

from delivery_progress import append_verification, docker_available
from delivery_workspace import (
    StoryContext,
    delivery_result_path,
    load_delivery_config,
    load_story_context,
    read_json,
    write_json,
)
from visual_delivery import execute as run_visual_delivery


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
        "id": "test_suite",
        "label": "Unit, Integration, And Architecture Tests",
        "command": ["./gradlew", "test"],
        "optional": False,
        "allow_no_tests": True,
        "requires_docker": False,
    },
]


def detect_java_gradle(repo_path: Path) -> bool:
    return (repo_path / "build.gradle").is_file() or (repo_path / "build.gradle.kts").is_file()


def has_pmd(repo_path: Path) -> bool:
    text = "\n".join(
        path.read_text(encoding="utf-8", errors="ignore")
        for path in (repo_path / "build.gradle", repo_path / "build.gradle.kts")
        if path.is_file()
    )
    return "pmd" in text.lower()


def java_gradle_steps(repo_path: Path) -> list[dict[str, Any]]:
    steps = [DEFAULT_JAVA_GRADLE_STEPS[0]]
    if has_pmd(repo_path):
        steps.append(DEFAULT_JAVA_GRADLE_STEPS[1])
    test_step = dict(DEFAULT_JAVA_GRADLE_STEPS[2])
    sources = [repo_path / "build.gradle", repo_path / "build.gradle.kts", repo_path / "src" / "test"]
    uses_testcontainers = any(
        "testcontainers" in path.read_text(encoding="utf-8", errors="ignore").lower()
        for path in sources
        if path.is_file()
    )
    if not uses_testcontainers and (repo_path / "src" / "test").is_dir():
        uses_testcontainers = any(
            "testcontainers" in path.read_text(encoding="utf-8", errors="ignore").lower()
            for path in (repo_path / "src" / "test").rglob("*")
            if path.is_file()
        )
    test_step["requires_docker"] = uses_testcontainers
    steps.append(test_step)
    return steps


def php_lint_step(repo_path: Path) -> Optional[dict[str, Any]]:
    if not any(path.suffix == ".php" for path in repo_path.rglob("*.php")):
        return None
    return {"id": "php_syntax", "label": "PHP Syntax Check", "kind": "php_lint"}


def frontend_syntax_step(repo_path: Path) -> Optional[dict[str, Any]]:
    if not (repo_path / "package.json").is_file():
        return None
    local_bin = repo_path / "node_modules" / ".bin"
    if (repo_path / "tsconfig.json").is_file() and (local_bin / "tsc").is_file():
        return {
            "id": "typecheck",
            "label": "TypeScript Syntax Check",
            "command": [str(local_bin / "tsc"), "--noEmit"],
            "allow_no_tests": True,
        }
    if (local_bin / "eslint").is_file():
        return {
            "id": "lint",
            "label": "ESLint Syntax Check",
            "command": [str(local_bin / "eslint"), "."],
            "allow_no_tests": True,
        }
    return {"id": "syntax_profile", "label": "Syntax Profile", "kind": "missing_local_tooling"}


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

    configured_steps = verification.get("steps", {}).get(repo_path.name)
    if isinstance(configured_steps, list) and configured_steps:
        return configured_steps

    if detect_java_gradle(repo_path):
        configured = verification.get("java_gradle", {}).get("steps")
        if isinstance(configured, list) and configured:
            return configured
        return java_gradle_steps(repo_path)

    php_step = php_lint_step(repo_path)
    if php_step:
        return [php_step]
    frontend_step = frontend_syntax_step(repo_path)
    if frontend_step:
        return [frontend_step]
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


def parse_java_major(repo_path: Path) -> Optional[int]:
    java_version = repo_path / ".java-version"
    if java_version.is_file():
        match = re.search(r"\b(8|11|17|21)\b", java_version.read_text(encoding="utf-8", errors="ignore"))
        if match:
            return int(match.group(1))

    text = "\n".join(
        path.read_text(encoding="utf-8", errors="ignore")
        for path in (repo_path / "build.gradle", repo_path / "build.gradle.kts")
        if path.is_file()
    )
    for pattern in (
        r"JavaLanguageVersion\.of\((\d+)\)",
        r"(?:sourceCompatibility|targetCompatibility)\s*=\s*(?:JavaVersion\.VERSION_|['\"]?)(\d+)",
        r"(?:sourceCompatibility|targetCompatibility)\s+['\"]?(\d+)",
    ):
        match = re.search(pattern, text)
        if match:
            return int(match.group(1))
    return None


def find_java_home(major: int) -> Optional[Path]:
    sdkman_root = Path.home() / ".sdkman" / "candidates" / "java"
    if sdkman_root.is_dir():
        for candidate in sorted(sdkman_root.glob(f"{major}*"), reverse=True):
            if (candidate / "bin" / "java").is_file():
                return candidate
    completed = subprocess.run(
        ["/usr/libexec/java_home", "-v", str(major)],
        check=False,
        capture_output=True,
        text=True,
    )
    if completed.returncode == 0 and completed.stdout.strip():
        candidate = Path(completed.stdout.strip())
        if (candidate / "bin" / "java").is_file():
            return candidate
    return None


def colima_environment() -> tuple[dict[str, str], str]:
    if not shutil.which("colima"):
        return {}, "Colima is not installed"
    completed = subprocess.run(["colima", "ls", "-j"], check=False, capture_output=True, text=True)
    if completed.returncode != 0:
        return {}, (completed.stderr or completed.stdout or "Unable to inspect Colima").strip()
    try:
        profiles = json.loads(completed.stdout)
    except json.JSONDecodeError:
        return {}, "Colima returned invalid status JSON"
    if isinstance(profiles, dict):
        nested = profiles.get("profiles")
        profiles = nested if isinstance(nested, list) else [profiles]
    if not isinstance(profiles, list):
        return {}, "Colima returned an unsupported status format"
    running = next((item for item in profiles if item.get("status") == "Running"), None)
    if not isinstance(running, dict):
        return {}, "Colima is not running. Run: colima start --network-address"
    address = str(running.get("address", "")).strip()
    if not address:
        return {}, "Colima lacks a network address. Restart once with: colima start --network-address"
    socket = Path.home() / ".colima" / "default" / "docker.sock"
    if not socket.exists():
        return {}, f"Colima Docker socket not found: {socket}"
    return {
        "DOCKER_HOST": f"unix://{socket}",
        "TESTCONTAINERS_DOCKER_SOCKET_OVERRIDE": "/var/run/docker.sock",
        "TESTCONTAINERS_HOST_OVERRIDE": address,
    }, f"Colima {address}"


def resolve_codeartifact_token(env: dict[str, str]) -> tuple[dict[str, str], str]:
    if env.get("CODEARTIFACT_AUTH_TOKEN"):
        return {}, "CodeArtifact token already provided"
    command = env.get("CODEARTIFACT_TOKEN_COMMAND", "").strip()
    if not command:
        return {}, "No CodeArtifact token command configured"
    completed = subprocess.run(command, shell=True, check=False, capture_output=True, text=True, env=env)
    token = completed.stdout.strip()
    if completed.returncode != 0 or not token:
        detail = (completed.stderr or completed.stdout or "token command returned no token").strip()
        return {}, f"Unable to refresh CodeArtifact token: {detail[-300:]}"
    return {"CODEARTIFACT_AUTH_TOKEN": token}, "CodeArtifact token refreshed"


def runtime_environment(
    repo_path: Path,
    requires_docker: bool,
    step_environment: Optional[dict[str, Any]] = None,
) -> tuple[dict[str, str], list[str], Optional[str]]:
    env = dict(os.environ)
    details: list[str] = []
    if detect_java_gradle(repo_path):
        major = parse_java_major(repo_path)
        if major:
            java_home = find_java_home(major)
            if not java_home:
                return env, details, f"JDK {major} was required by {repo_path.name} but was not found"
            env["JAVA_HOME"] = str(java_home)
            env["PATH"] = f"{java_home / 'bin'}{os.pathsep}{env.get('PATH', '')}"
            details.append(f"JDK {major}")
        token_env, token_detail = resolve_codeartifact_token(env)
        env.update(token_env)
        if token_env:
            details.append(token_detail)

    if requires_docker:
        docker_env, docker_detail = colima_environment()
        if not docker_env:
            return env, details, docker_detail
        env.update(docker_env)
        details.append(docker_detail)
    if isinstance(step_environment, dict):
        env.update({str(key): str(value) for key, value in step_environment.items()})
    return env, details, None


def run_command(repo_path: Path, command: list[str], env: dict[str, str]) -> tuple[int, str]:
    if command and command[0] == "./gradlew":
        wrapper = gradle_wrapper(repo_path)
        command = [str(wrapper), *command[1:]]
    completed = subprocess.run(
        command,
        cwd=str(repo_path),
        check=False,
        capture_output=True,
        text=True,
        env=env,
    )
    output = (completed.stdout or "") + ("\n" + completed.stderr if completed.stderr else "")
    return completed.returncode, output.strip()


def run_php_lint(repo_path: Path, env: dict[str, str]) -> tuple[int, str]:
    php = shutil.which("php", path=env.get("PATH"))
    if not php:
        return 0, "PHP is not installed; syntax check skipped"
    files = [
        path
        for path in repo_path.rglob("*.php")
        if "vendor" not in path.parts and ".git" not in path.parts
    ]
    for path in files:
        completed = subprocess.run([php, "-l", str(path)], check=False, capture_output=True, text=True, env=env)
        if completed.returncode != 0:
            return completed.returncode, (completed.stdout or "") + (completed.stderr or "")
    return 0, f"PHP syntax passed for {len(files)} files"


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
    kind = str(step.get("kind", "")).strip()

    requires_docker = step_requires_docker(step, policy)
    if requires_docker and policy.get("check_before_run") and not docker_ok:
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

    if kind == "missing_local_tooling":
        return {
            "id": step_id,
            "label": label,
            "command": "",
            "exit_code": 0,
            "summary": "Skipped — no installed local typecheck or lint tool",
            "status": "skipped",
        }

    if kind != "php_lint" and (not isinstance(command, list) or not command):
        return {
            "id": step_id,
            "label": label,
            "command": "",
            "exit_code": 1,
            "summary": "Missing verification command",
            "status": "failed",
        }

    environment, runtime_details, runtime_error = runtime_environment(
        repo_path,
        requires_docker,
        step.get("environment"),
    )
    if runtime_error:
        return {
            "id": step_id,
            "label": label,
            "command": "php -l <project files>" if kind == "php_lint" else " ".join(shlex.quote(str(part)) for part in command),
            "exit_code": 1,
            "summary": runtime_error,
            "status": "failed",
        }

    command_text = "php -l <project files>" if kind == "php_lint" else " ".join(shlex.quote(str(part)) for part in command)
    print(f"[verification] {repo_path.name}: {label} …", flush=True)
    if kind == "php_lint":
        exit_code, output = run_php_lint(repo_path, environment)
    else:
        exit_code, output = run_command(repo_path, [str(part) for part in command], environment)
    allow_no_tests = bool(step.get("allow_no_tests"))
    status = "passed" if exit_code == 0 else "failed"
    summary = "Passed" if exit_code == 0 else output[-2000:] or f"Exit code {exit_code}"

    if kind == "php_lint" and output == "PHP is not installed; syntax check skipped":
        status = "skipped"
        summary = output

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
    if runtime_details:
        result["runtime"] = runtime_details
    if requires_docker:
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
    workspace_root: Optional[Path] = None,
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
    if not any(item.get("status") == "failed" for item in results):
        visual_results = run_visual_delivery(context, result_path)
        for visual in visual_results:
            item = {
                "repository": visual.get("repository", ""),
                "id": "visual",
                "label": f"Visual: {visual.get('screen', '')} / {visual.get('state', '')}",
                "status": visual.get("status", "failed"),
                "failure_category": visual.get("failure_category", ""),
            }
            append_verification(progress_root, item)
            results.append(item)
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
