#!/usr/bin/env python3
"""Internal Visual Delivery contracts, runtime detection, diagnostics, and execution."""

from __future__ import annotations

import argparse
import atexit
import json
import os
import re
import shlex
import shutil
import signal
import struct
import subprocess
import sys
import time
import urllib.error
import urllib.request
import zlib
from pathlib import Path
from typing import Any

from delivery_workspace import StoryContext, read_json, workspace_lumen_dir, write_json


FAILURE_CATEGORIES = {
    "environment_failed",
    "runtime_failed",
    "authentication_failed",
    "fixture_failed",
    "navigation_failed",
    "stability_failed",
    "capture_failed",
    "visual_difference",
    "cleanup_failed",
}


def visual_section(text: str) -> str:
    text = re.sub(r"(?s)<!--.*?-->", "", text)
    match = re.search(r"(?ms)^## Visual Delivery Contract\s*$\n(.*?)(?=^## (?!#)|\Z)", text)
    return match.group(1).strip() if match else ""


def subsection(text: str, title: str) -> str:
    match = re.search(rf"(?ms)^### {re.escape(title)}\s*$\n(.*?)(?=^### |\Z)", text)
    return match.group(1).strip() if match else ""


def markdown_table(text: str) -> list[dict[str, str]]:
    lines = [line.strip() for line in text.splitlines() if line.strip().startswith("|")]
    if len(lines) < 2:
        return []
    rows = [[cell.strip().strip("`") for cell in line.strip("|").split("|")] for line in lines]
    headers = rows[0]
    if not all(re.fullmatch(r":?-{3,}:?", cell.replace(" ", "")) for cell in rows[1]):
        return []
    return [dict(zip(headers, row)) for row in rows[2:] if len(row) == len(headers)]


def visual_contract(path: Path) -> dict[str, Any] | None:
    if not path.is_file():
        return None
    section = visual_section(path.read_text(encoding="utf-8", errors="ignore"))
    if not section:
        return None
    runtime_rows = markdown_table(subsection(section, "Runtime"))
    runtime = {
        row.get("Property", "").strip().lower().replace(" ", "_"): row.get("Value", "").strip()
        for row in runtime_rows
    }
    references = markdown_table(subsection(section, "Design Source"))
    states = markdown_table(subsection(section, "Visual State Matrix"))
    verification = markdown_table(subsection(section, "Visual Verification"))
    mappings = markdown_table(subsection(section, "Figma-to-Code Component Mapping"))
    checks = {
        (row.get("Screen", ""), row.get("State", "")): row for row in verification
    }
    scenarios: list[dict[str, Any]] = []
    for row in states:
        screen, state = row.get("Screen", ""), row.get("State", "")
        check = checks.get((screen, state), {})
        threshold = str(check.get("Maximum difference", "1%")).strip()
        ratio: float | None = None
        if threshold.upper() != "N/A":
            try:
                ratio = float(threshold.rstrip("%")) / (100 if threshold.endswith("%") else 1)
            except ValueError:
                ratio = None
        scenarios.append(
            {
                "screen": screen,
                "state": state,
                "fixture": row.get("Fixture", ""),
                "reference": row.get("Reference", ""),
                "stable_marker": row.get("Stable marker", ""),
                "comparison": check.get("Comparison", "Full content area"),
                "maximum_difference_ratio": ratio,
                "maximum_difference": threshold,
            }
        )
    return {
        "runtime": runtime,
        "references": references,
        "states": states,
        "mappings": mappings,
        "platform_rules": subsection(section, "Platform Rules"),
        "scenarios": scenarios,
    }


def validate_contract(contract: dict[str, Any]) -> list[str]:
    runtime = contract.get("runtime", {})
    def absent(value: Any) -> bool:
        return not str(value or "").strip() or str(value).strip().upper() == "TBD"
    missing = [
        label for key, label in (
            ("repository", "target repository"),
            ("runtime_profile", "runtime profile"),
            ("platform", "platform"),
            ("navigation", "navigation"),
            ("authentication", "authentication"),
        ) if absent(runtime.get(key))
    ]
    if not contract.get("references") or not any(
        not absent(row.get("Node ID")) or not absent(row.get("Approved reference"))
        for row in contract.get("references", [])
    ):
        missing.append("Figma node or approved reference")
    if not contract.get("scenarios"):
        missing.append("required visual states")
    else:
        for index, item in enumerate(contract["scenarios"], 1):
            for key in ("screen", "state", "fixture", "reference", "stable_marker"):
                if absent(item.get(key)):
                    missing.append(f"visual state {index} {key.replace('_', ' ')}")
            if str(item.get("maximum_difference", "")).strip().upper() == "TBD":
                missing.append(f"visual state {index} verification expectation")
    if not contract.get("mappings") or all(absent(row.get("Figma component")) for row in contract.get("mappings", [])):
        missing.append("component mapping")
    if absent(contract.get("platform_rules")):
        missing.append("platform-specific behavior")
    return missing


def package_manager(repo: Path) -> str:
    for lock, manager in (("pnpm-lock.yaml", "pnpm"), ("yarn.lock", "yarn"), ("package-lock.json", "npm")):
        if (repo / lock).is_file():
            return manager
    return "npm"


def package_scripts(repo: Path) -> dict[str, str]:
    package = read_json(repo / "package.json", {})
    scripts = package.get("scripts") if isinstance(package.get("scripts"), dict) else {}
    return {str(key): str(value) for key, value in scripts.items()}


def detect_runtime(repo: Path) -> tuple[str, dict[str, Any]] | None:
    if not (repo / "package.json").is_file():
        return None
    manager = package_manager(repo)
    scripts = package_scripts(repo)
    package = read_json(repo / "package.json", {})
    dependencies = {**(package.get("dependencies") or {}), **(package.get("devDependencies") or {})}
    install = f"{manager} install" + (" --frozen-lockfile" if manager == "pnpm" else "")
    is_mobile = bool({"react-native", "expo"} & set(dependencies)) or any((repo / name).exists() for name in ("ios", "android", "app.json"))
    if is_mobile:
        metro_script = "start" if "start" in scripts else ""
        runtime = {
            "platform": "react-native",
            "package_manager": manager,
            "install_command": install,
            "metro_command": f"{manager} {metro_script}" if metro_script else "",
            "ready_url": "http://127.0.0.1:8081/status",
            "launch_strategy": "preinstalled-debug-app",
            "auth_strategy": "saved-session",
            "fixture_strategy": "",
            "ios": {"device": "iPhone 15", "os_version": ""},
            "ready_timeout_seconds": 120,
        }
        return "react-native-ios-visual", {"runtime_status": "incomplete", "runtime": runtime}
    start_script = next((name for name in ("dev", "start:dev", "start") if name in scripts), "")
    web_evidence = (
        any(repo.glob("vite.config.*"))
        or any(repo.glob("next.config.*"))
        or "react-scripts" in dependencies
        or bool(start_script)
    )
    if not web_evidence:
        return None
    start = f"{manager} run {start_script}" if manager == "npm" else f"{manager} {start_script}"
    port = 3000 if any(repo.glob("next.config.*")) or "react-scripts" in dependencies else 5173
    runtime = {
        "platform": "web",
        "package_manager": manager,
        "install_command": install,
        "start_command": start,
        "base_url": f"http://127.0.0.1:{port}",
        "ready_url": f"http://127.0.0.1:{port}",
        "ready_timeout_seconds": 60,
        "browser": "chromium",
        "auth_strategy": "playwright-storage-state",
        "auth_storage_state_env": "LUMEN_VISUAL_STORAGE_STATE",
        "fixture_strategy": "",
    }
    return "web-visual", {"runtime_status": "incomplete", "runtime": runtime}


def repos_config(workspace_root: Path) -> Path:
    return workspace_lumen_dir(workspace_root) / "config" / "repos.json"


def enrich_repositories(workspace_root: Path) -> list[dict[str, Any]]:
    path = repos_config(workspace_root)
    config = read_json(path, {"repositories": []})
    repositories = config.get("repositories") if isinstance(config.get("repositories"), list) else []
    for item in repositories:
        if not isinstance(item, dict) or item.get("runtime"):
            continue
        repo = Path(str(item.get("path", ""))).expanduser()
        if not repo.is_absolute():
            repo = (workspace_root / repo).resolve()
        detected = detect_runtime(repo)
        if detected:
            profile, values = detected
            item["runtime_profile"] = profile
            item.update(values)
    config["repositories"] = repositories
    write_json(path, config)
    return repositories


def redact(text: str, env: dict[str, str]) -> str:
    redacted = text
    for key, value in env.items():
        if value and len(value) >= 4 and (key.startswith("LUMEN_VISUAL_") or any(word in key.upper() for word in ("PASSWORD", "SECRET", "TOKEN"))):
            redacted = redacted.replace(value, "[REDACTED]")
    return redacted


def doctor(workspace_root: Path) -> int:
    repositories = read_json(repos_config(workspace_root), {}).get("repositories", [])
    configured = [item for item in repositories if isinstance(item, dict) and isinstance(item.get("runtime"), dict)]
    if not configured:
        print("Visual Delivery: Not Configured")
        return 0
    failed = False
    for item in configured:
        name = str(item.get("name", "repository"))
        runtime = item["runtime"]
        platform = str(runtime.get("platform", ""))
        problems: list[str] = []
        manager = str(runtime.get("package_manager", ""))
        if not manager or not shutil.which(manager):
            problems.append(f"package manager '{manager or 'missing'}' is not available")
        if platform == "web":
            if not runtime.get("start_command"):
                problems.append("start_command is missing")
            if not runtime.get("ready_url"):
                problems.append("ready_url is missing")
            if not shutil.which("node"):
                problems.append("Node.js is not available")
            repo = Path(str(item.get("path", ""))).expanduser()
            if not repo.is_absolute():
                repo = (workspace_root / repo).resolve()
            if not (repo / "node_modules" / "playwright").exists() and not (repo / "node_modules" / "@playwright" / "test").exists():
                problems.append("Playwright dependencies are not installed in the repository")
            auth_env = str(runtime.get("auth_storage_state_env", ""))
            if runtime.get("auth_strategy") == "playwright-storage-state" and (not auth_env or not os.environ.get(auth_env)):
                problems.append(f"authentication state environment variable '{auth_env or 'missing'}' is not set")
        elif platform == "react-native":
            for tool in ("xcrun", "maestro"):
                if not shutil.which(tool):
                    problems.append(f"{tool} is not available")
            device = str((runtime.get("ios") or {}).get("device", ""))
            if not device:
                problems.append("iOS simulator device is missing")
            elif shutil.which("xcrun"):
                devices = subprocess.run(["xcrun", "simctl", "list", "devices", "available"], check=False, capture_output=True, text=True)
                if devices.returncode != 0 or device not in devices.stdout:
                    problems.append(f"configured simulator '{device}' was not found")
            if not runtime.get("metro_command"):
                problems.append("metro_command is missing")
            if not runtime.get("bundle_id"):
                problems.append("bundle_id is missing")
            if not runtime.get("deep_link_scheme"):
                problems.append("deep_link_scheme is missing")
            if not runtime.get("maestro_flow") and not runtime.get("settle_seconds"):
                problems.append("maestro_flow or an explicit settle_seconds fallback is missing")
        if not runtime.get("fixture_strategy"):
            problems.append("fixture_strategy is missing")
        elif runtime.get("fixture_strategy") in {"mock-server", "local-fixture-server", "seed-endpoint"} and not (
            runtime.get("fixture_command") or runtime.get("fixture_start_command")
        ):
            problems.append("configured fixture strategy has no fixture command")
        status = "Not Ready" if problems or item.get("runtime_status") != "ready" else "Ready"
        print(f"\nVisual Delivery: {status}\nRepository: {name}\nPlatform: {platform or 'unknown'}")
        if problems:
            failed = True
            for problem in problems:
                print(f"✗ {problem}")
            print(f"Fix: update {repos_config(workspace_root)} for repository '{name}'.")
        else:
            print("✓ runtime configuration and local tooling are ready")
    return 1 if failed else 0


def run_owned(command: str, cwd: Path, env: dict[str, str], processes: list[subprocess.Popen[str]]) -> subprocess.Popen[str]:
    process = subprocess.Popen(
        shlex.split(command), cwd=cwd, env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        text=True, start_new_session=True,
    )
    processes.append(process)
    return process


def wait_ready(url: str, timeout: int, process: subprocess.Popen[str] | None = None) -> None:
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        if process and process.poll() is not None:
            raise RuntimeError("configured runtime process exited before readiness")
        try:
            with urllib.request.urlopen(url, timeout=2) as response:
                if response.status < 500:
                    return
        except (urllib.error.URLError, TimeoutError):
            time.sleep(0.5)
    raise TimeoutError(f"readiness URL did not respond within {timeout}s: {url}")


def web_capture(repo: Path, runtime: dict[str, Any], scenario: dict[str, Any], actual: Path, env: dict[str, str]) -> None:
    base = str(runtime.get("base_url", "")).rstrip("/")
    navigation = str(scenario.get("navigation", ""))
    url = navigation if navigation.startswith(("http://", "https://")) else f"{base}/{navigation.lstrip('/')}"
    marker = str(scenario.get("stable_marker", ""))
    state_env = str(runtime.get("auth_storage_state_env", "LUMEN_VISUAL_STORAGE_STATE"))
    storage = env.get(state_env, "") if runtime.get("auth_strategy") == "playwright-storage-state" else ""
    if runtime.get("auth_strategy") == "playwright-storage-state" and (not storage or not Path(storage).is_file()):
        raise PermissionError(f"storage state from {state_env} is unavailable")
    viewport = runtime.get("viewport") if isinstance(runtime.get("viewport"), dict) else {"width": 1280, "height": 720}
    script = """
const { chromium } = require('playwright');
(async () => { const [url,out,marker,storage,width,height] = process.argv.slice(1);
 const browser = await chromium.launch({headless:true});
 const context = await browser.newContext({viewport:{width:+width,height:+height}, locale:'en-US', timezoneId:'UTC', ...(storage?{storageState:storage}:{})});
 const page = await context.newPage(); await page.goto(url,{waitUntil:'networkidle'});
 if(marker) await page.getByTestId(marker).waitFor({state:'visible'});
 await page.addStyleTag({content:'*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}'});
 await page.screenshot({path:out,fullPage:false}); await browser.close();
})().catch(e=>{console.error(e.message);process.exit(1)});
"""
    completed = subprocess.run(
        ["node", "-e", script, url, str(actual), marker, storage, str(viewport.get("width", 1280)), str(viewport.get("height", 720))],
        cwd=repo, env=env, check=False, capture_output=True, text=True,
    )
    if completed.returncode != 0:
        detail = redact((completed.stderr or completed.stdout or "Playwright screenshot failed").strip(), env)
        if "waiting for getByTestId" in detail or "Timeout" in detail:
            raise TimeoutError(detail[-500:])
        if "Cannot find module 'playwright'" in detail:
            raise ModuleNotFoundError("Playwright is not installed in the repository")
        raise RuntimeError(detail[-500:])


def png_pixels(path: Path) -> tuple[int, int, int, bytes]:
    data = path.read_bytes()
    if not data.startswith(b"\x89PNG\r\n\x1a\n"):
        raise ValueError(f"not a PNG image: {path}")
    offset, width, height, channels, compressed = 8, 0, 0, 0, bytearray()
    while offset < len(data):
        length = struct.unpack(">I", data[offset:offset + 4])[0]
        kind, chunk = data[offset + 4:offset + 8], data[offset + 8:offset + 8 + length]
        offset += length + 12
        if kind == b"IHDR":
            width, height, depth, color, _, _, interlace = struct.unpack(">IIBBBBB", chunk)
            if depth != 8 or color not in {2, 6} or interlace:
                raise ValueError("Visual Delivery supports non-interlaced 8-bit RGB/RGBA PNG references")
            channels = 3 if color == 2 else 4
        elif kind == b"IDAT":
            compressed.extend(chunk)
        elif kind == b"IEND":
            break
    raw, stride, rows, previous = zlib.decompress(bytes(compressed)), width * channels, bytearray(), bytearray(width * channels)
    pos = 0
    for _ in range(height):
        mode, row = raw[pos], bytearray(raw[pos + 1:pos + 1 + stride]); pos += stride + 1
        for index in range(stride):
            left = row[index - channels] if index >= channels else 0
            up = previous[index]
            upper_left = previous[index - channels] if index >= channels else 0
            if mode == 1: row[index] = (row[index] + left) & 255
            elif mode == 2: row[index] = (row[index] + up) & 255
            elif mode == 3: row[index] = (row[index] + ((left + up) // 2)) & 255
            elif mode == 4:
                p = left + up - upper_left; pa, pb, pc = abs(p-left), abs(p-up), abs(p-upper_left)
                row[index] = (row[index] + (left if pa <= pb and pa <= pc else up if pb <= pc else upper_left)) & 255
            elif mode != 0: raise ValueError(f"unsupported PNG filter {mode}")
        rows.extend(row); previous = row
    return width, height, channels, bytes(rows)


def write_diff(path: Path, width: int, height: int, pixels: bytes) -> None:
    raw = b"".join(b"\0" + pixels[row * width * 3:(row + 1) * width * 3] for row in range(height))
    def chunk(kind: bytes, body: bytes) -> bytes:
        return struct.pack(">I", len(body)) + kind + body + struct.pack(">I", zlib.crc32(kind + body) & 0xffffffff)
    path.write_bytes(b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0)) + chunk(b"IDAT", zlib.compress(raw)) + chunk(b"IEND", b""))


def compare_png(expected: Path, actual: Path, diff: Path) -> float:
    ew, eh, ec, ep = png_pixels(expected); aw, ah, ac, ap = png_pixels(actual)
    if (ew, eh) != (aw, ah):
        raise ValueError(f"image dimensions differ: expected {ew}x{eh}, actual {aw}x{ah}")
    changed, out = 0, bytearray()
    for pixel in range(ew * eh):
        e = ep[pixel * ec:pixel * ec + 3]; a = ap[pixel * ac:pixel * ac + 3]
        different = e != a
        changed += different
        out.extend(b"\xff\x00\x00" if different else bytes(value // 3 for value in a))
    write_diff(diff, ew, eh, bytes(out))
    return changed / (ew * eh)


def stage_result(category: str, detail: str, scenario: dict[str, Any]) -> dict[str, Any]:
    stages = {key: "not_run" for key in ("environment", "runtime", "authentication", "fixture", "navigation", "stability", "capture", "visual_comparison", "cleanup")}
    mapping = {
        "environment_failed": "environment", "runtime_failed": "runtime", "authentication_failed": "authentication",
        "fixture_failed": "fixture", "navigation_failed": "navigation", "stability_failed": "stability",
        "capture_failed": "capture", "visual_difference": "visual_comparison", "cleanup_failed": "cleanup",
    }
    stages[mapping[category]] = "failed"
    return {**scenario, "status": "failed", "failure_category": category, "summary": detail, "stages": stages}


def execute(context: StoryContext, result_path: Path) -> list[dict[str, Any]]:
    contract = visual_contract(context.technical_plan)
    if not contract:
        return []
    runtime_contract = contract["runtime"]
    repo_name = runtime_contract.get("repository", "")
    repo_target = next((repo for repo in context.repos if repo.name == repo_name), None)
    config_items = read_json(repos_config(context.workspace_root), {}).get("repositories", [])
    repo_config = next((item for item in config_items if isinstance(item, dict) and item.get("name") == repo_name), None)
    scenarios = contract.get("scenarios", [])
    if not repo_target or not repo_config or not isinstance(repo_config.get("runtime"), dict):
        results = [stage_result("environment_failed", f"runtime configuration not found for {repo_name}", item) for item in scenarios]
        merge_visual_result(result_path, runtime_contract.get("runtime_profile", ""), results)
        return results
    runtime = repo_config["runtime"]
    env = dict(os.environ)
    processes: list[subprocess.Popen[str]] = []
    def cleanup() -> None:
        for process in reversed(processes):
            if process.poll() is None:
                try:
                    os.killpg(process.pid, signal.SIGTERM)
                    process.wait(timeout=5)
                except (ProcessLookupError, subprocess.TimeoutExpired):
                    if process.poll() is None:
                        try: os.killpg(process.pid, signal.SIGKILL)
                        except ProcessLookupError: pass
                        process.wait()
    atexit.register(cleanup)
    results: list[dict[str, Any]] = []
    evidence = workspace_lumen_dir(context.workspace_root) / "results" / "visual" / time.strftime("%Y%m%d-%H%M%S", time.gmtime())
    evidence.mkdir(parents=True, exist_ok=True)
    runtime_error = ""
    try:
        if repo_config.get("runtime_status") != "ready":
            raise EnvironmentError("repository runtime_status is not ready; run lumen doctor")
        fixture_start = str(runtime.get("fixture_start_command", ""))
        if fixture_start:
            run_owned(fixture_start, repo_target.worktree_path, env, processes)
        platform = str(runtime.get("platform", ""))
        if platform == "web":
            server = run_owned(str(runtime.get("start_command", "")), repo_target.worktree_path, env, processes)
            wait_ready(str(runtime.get("ready_url", "")), int(runtime.get("ready_timeout_seconds", 60)), server)
        elif platform == "react-native":
            metro = run_owned(str(runtime.get("metro_command", "")), repo_target.worktree_path, env, processes)
            wait_ready(str(runtime.get("ready_url", "http://127.0.0.1:8081/status")), int(runtime.get("ready_timeout_seconds", 120)), metro)
        else:
            raise EnvironmentError(f"unsupported visual platform: {platform}")
    except (OSError, ValueError, TimeoutError) as exc:
        runtime_error = str(exc)

    for index, scenario in enumerate(scenarios, 1):
        scenario = dict(scenario)
        scenario.update({"repository": repo_name, "platform": runtime_contract.get("platform", runtime.get("platform", "")), "navigation": runtime_contract.get("navigation", "")})
        stem = re.sub(r"[^a-z0-9]+", "-", f"{scenario['screen']}-{scenario['state']}".lower()).strip("-") or f"scenario-{index}"
        reference = context.story_dir / str(scenario.get("reference", ""))
        expected, actual, diff = evidence / f"{stem}-expected.png", evidence / f"{stem}-actual.png", evidence / f"{stem}-diff.png"
        try:
            if runtime_error:
                raise RuntimeError(runtime_error)
            if not reference.is_file():
                raise FileNotFoundError(f"approved reference not found: {reference}")
            fixture_command = str(runtime.get("fixture_command", ""))
            if fixture_command:
                command = fixture_command.replace("{fixture}", str(scenario.get("fixture", "")))
                prepared = subprocess.run(shlex.split(command), cwd=repo_target.worktree_path, env=env, check=False, capture_output=True, text=True)
                if prepared.returncode != 0:
                    raise ChildProcessError(redact((prepared.stderr or prepared.stdout or "fixture command failed").strip(), env)[-500:])
            shutil.copy2(reference, expected)
            if runtime.get("platform") == "web":
                web_capture(repo_target.worktree_path, runtime, scenario, actual, env)
            else:
                device = str((runtime.get("ios") or {}).get("device", ""))
                subprocess.run(["xcrun", "simctl", "boot", device], check=False, capture_output=True, text=True)
                boot = subprocess.run(["xcrun", "simctl", "bootstatus", device, "-b"], check=False, capture_output=True, text=True)
                if boot.returncode != 0: raise EnvironmentError(redact((boot.stderr or boot.stdout).strip(), env))
                installed = subprocess.run(["xcrun", "simctl", "get_app_container", device, str(runtime.get("bundle_id", ""))], check=False, capture_output=True, text=True)
                if installed.returncode != 0: raise EnvironmentError("configured debug app is not installed on the simulator")
                opened = subprocess.run(["xcrun", "simctl", "openurl", device, str(scenario["navigation"])], check=False, capture_output=True, text=True)
                if opened.returncode != 0: raise ConnectionError(redact((opened.stderr or opened.stdout).strip(), env))
                flow = str(runtime.get("maestro_flow", ""))
                if flow:
                    checked = subprocess.run(["maestro", "test", flow], cwd=repo_target.worktree_path, check=False, capture_output=True, text=True)
                    if checked.returncode != 0: raise TimeoutError(redact((checked.stderr or checked.stdout).strip(), env))
                elif runtime.get("settle_seconds"):
                    time.sleep(float(runtime["settle_seconds"]))
                else:
                    raise TimeoutError("no Maestro stable-marker flow or explicit settle fallback is configured")
                captured = subprocess.run(["xcrun", "simctl", "io", device, "screenshot", str(actual)], check=False, capture_output=True, text=True)
                if captured.returncode != 0: raise RuntimeError(redact((captured.stderr or captured.stdout).strip(), env))
            ratio = compare_png(expected, actual, diff)
            threshold = scenario.get("maximum_difference_ratio")
            status = "passed" if threshold is None or ratio <= threshold else "failed"
            result = {**scenario, "expected": str(expected), "actual": str(actual), "diff": str(diff), "difference_ratio": ratio, "status": status}
            result["stages"] = {key: "passed" for key in ("environment", "runtime", "authentication", "fixture", "navigation", "stability", "capture", "visual_comparison", "cleanup")}
            if status == "failed":
                result["failure_category"] = "visual_difference"
                result["stages"]["visual_comparison"] = "failed"
            results.append(result)
        except PermissionError as exc: results.append(stage_result("authentication_failed", str(exc), scenario))
        except ChildProcessError as exc: results.append(stage_result("fixture_failed", str(exc), scenario))
        except FileNotFoundError as exc: results.append(stage_result("environment_failed", str(exc), scenario))
        except ModuleNotFoundError as exc: results.append(stage_result("environment_failed", str(exc), scenario))
        except ConnectionError as exc: results.append(stage_result("navigation_failed", str(exc), scenario))
        except TimeoutError as exc: results.append(stage_result("stability_failed", str(exc), scenario))
        except EnvironmentError as exc: results.append(stage_result("environment_failed", str(exc), scenario))
        except (RuntimeError, ValueError) as exc:
            category = "runtime_failed" if runtime_error else "capture_failed"
            results.append(stage_result(category, str(exc), scenario))
    cleanup()
    atexit.unregister(cleanup)
    merge_visual_result(result_path, runtime_contract.get("runtime_profile", ""), results)
    return results


def merge_visual_result(result_path: Path, profile: str, results: list[dict[str, Any]]) -> None:
    payload = read_json(result_path, {})
    status = "passed" if results and all(item.get("status") == "passed" for item in results) else "failed"
    payload["visual_verification"] = {"status": status, "runtime_profile": profile, "results": results}
    verification = payload.get("verification_results") if isinstance(payload.get("verification_results"), list) else []
    verification.extend({
        "repository": item.get("repository", ""), "id": "visual", "label": f"Visual: {item.get('screen', '')} / {item.get('state', '')}",
        "command": "internal visual delivery", "exit_code": 0 if item.get("status") == "passed" else 1,
        "summary": item.get("summary") or (f"Difference {item.get('difference_ratio', 0):.2%}" if "difference_ratio" in item else item.get("failure_category", "")),
        "status": item.get("status", "failed"), "failure_category": item.get("failure_category", ""),
        "expected": item.get("expected", ""), "actual": item.get("actual", ""), "diff": item.get("diff", ""),
        "difference_ratio": item.get("difference_ratio"), "maximum_difference_ratio": item.get("maximum_difference_ratio"),
    } for item in results)
    payload["verification_results"] = verification
    write_json(result_path, payload)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)
    for name in ("detect", "doctor"):
        command = sub.add_parser(name); command.add_argument("--workspace-root", required=True)
    args = parser.parse_args()
    root = Path(args.workspace_root).expanduser().resolve()
    if root.name in {"lumen", ".lumen"}:
        root = root.parent
    if args.command == "detect":
        print(json.dumps({"repositories": enrich_repositories(root)}, indent=2, ensure_ascii=False)); return 0
    return doctor(root)


if __name__ == "__main__":
    raise SystemExit(main())
