from __future__ import annotations


class RunnerError(RuntimeError):
    def __init__(self, code: str, message: str = "") -> None:
        self.code = str(code or "RUNNER_ERROR")
        super().__init__(message or self.code)
