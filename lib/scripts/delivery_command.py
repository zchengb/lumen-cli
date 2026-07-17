#!/usr/bin/env python3
"""Structured subprocess execution for delivery orchestration."""

from __future__ import annotations

import subprocess
import sys
import threading
from dataclasses import dataclass, field
from pathlib import Path
from typing import IO, Callable, Sequence


@dataclass
class CommandResult:
    exit_code: int
    stdout: str = ""
    stderr: str = ""
    formatter_exit_code: int | None = None
    formatter_warning: str = ""
    thread_errors: list[str] = field(default_factory=list)


def _append_log_line(log_file: Path | None, line: str, log_state: dict[str, object]) -> None:
    if log_file is None or not log_state.get("enabled", True):
        return
    try:
        with log_file.open("a", encoding="utf-8") as handle:
            handle.write(line)
    except OSError as exc:
        log_state["enabled"] = False
        if not log_state.get("warned"):
            log_state["warned"] = True
            log_state["warning"] = f"delivery log writing disabled: {exc}"


def _stream_reader(
    source: IO[str],
    *,
    log_file: Path | None,
    stream: bool,
    capture: bool,
    on_line: Callable[[str], None] | None,
    sink: list[str],
    log_state: dict[str, object] | None = None,
    thread_errors: list[str] | None = None,
) -> None:
    state = log_state if log_state is not None else {"enabled": True, "warned": False}
    for line in source:
        sink.append(line)
        _append_log_line(log_file, line, state)
        if on_line is not None:
            on_line(line)
        elif stream:
            sys.stdout.write(line)
            sys.stdout.flush()
    warning = state.get("warning")
    if isinstance(warning, str) and warning and thread_errors is not None:
        thread_errors.append(warning)


def run_command(
    args: Sequence[str],
    *,
    cwd: Path | None = None,
    env: dict[str, str] | None = None,
    log_file: Path | None = None,
    stream: bool = True,
    capture: bool = False,
    on_line: Callable[[str], None] | None = None,
) -> CommandResult:
    if log_file is not None:
        log_file.parent.mkdir(parents=True, exist_ok=True)

    process = subprocess.Popen(
        list(args),
        cwd=str(cwd) if cwd else None,
        env=env,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )
    sink: list[str] = []
    log_state: dict[str, object] = {"enabled": True, "warned": False}
    thread_errors: list[str] = []
    assert process.stdout is not None
    exit_code = 1
    try:
        _stream_reader(
            process.stdout,
            log_file=log_file,
            stream=stream,
            capture=capture,
            on_line=on_line,
            sink=sink,
            log_state=log_state,
            thread_errors=thread_errors,
        )
        exit_code = process.wait()
    except KeyboardInterrupt:
        process.terminate()
        try:
            exit_code = process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            process.kill()
            exit_code = process.wait()
        raise
    finally:
        if process.stdout is not None:
            process.stdout.close()
    return CommandResult(
        exit_code=exit_code,
        stdout="".join(sink) if capture else "",
        thread_errors=thread_errors,
    )


def run_command_with_formatter(
    args: Sequence[str],
    formatter_args: Sequence[str],
    *,
    cwd: Path | None = None,
    env: dict[str, str] | None = None,
    log_file: Path | None = None,
) -> CommandResult:
    if log_file is not None:
        log_file.parent.mkdir(parents=True, exist_ok=True)

    formatter = subprocess.Popen(
        list(formatter_args),
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )
    process = subprocess.Popen(
        list(args),
        cwd=str(cwd) if cwd else None,
        env=env,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )
    sink: list[str] = []
    formatter_failed = False
    thread_errors: list[str] = []
    log_state: dict[str, object] = {"enabled": True, "warned": False}
    forward_lock = threading.Lock()

    def forward_agent_output() -> None:
        nonlocal formatter_failed
        try:
            assert process.stdout is not None
            for line in process.stdout:
                sink.append(line)
                _append_log_line(log_file, line, log_state)
                with forward_lock:
                    failed = formatter_failed
                if not failed and formatter.stdin is not None:
                    try:
                        formatter.stdin.write(line)
                        formatter.stdin.flush()
                    except (BrokenPipeError, OSError):
                        with forward_lock:
                            formatter_failed = True
                        failed = True
                if failed:
                    sys.stdout.write(line)
                    sys.stdout.flush()
            warning = log_state.get("warning")
            if isinstance(warning, str) and warning:
                thread_errors.append(warning)
        except Exception as exc:
            thread_errors.append(f"agent forward thread failed: {exc}")

    def print_formatted_output() -> None:
        try:
            assert formatter.stdout is not None
            for line in formatter.stdout:
                sys.stdout.write(line)
                sys.stdout.flush()
        except Exception as exc:
            thread_errors.append(f"formatter output thread failed: {exc}")

    forward_thread = threading.Thread(target=forward_agent_output, daemon=True)
    print_thread = threading.Thread(target=print_formatted_output, daemon=True)
    forward_thread.start()
    print_thread.start()
    try:
        forward_thread.join()
        if formatter.stdin is not None and not formatter.stdin.closed:
            try:
                formatter.stdin.close()
            except OSError:
                pass
        print_thread.join()
        agent_exit = process.wait()
        formatter_exit = formatter.wait()
    except KeyboardInterrupt:
        process.terminate()
        formatter.terminate()
        raise
    finally:
        if process.stdout is not None:
            process.stdout.close()
        if formatter.stdout is not None:
            formatter.stdout.close()

    warning = ""
    if formatter_exit != 0:
        warning = f"stream formatter exited with status {formatter_exit}"
        if agent_exit == 0:
            sys.stderr.write(f"Warning: {warning}\n")

    return CommandResult(
        exit_code=agent_exit,
        stdout="".join(sink),
        formatter_exit_code=formatter_exit,
        formatter_warning=warning,
        thread_errors=thread_errors,
    )
