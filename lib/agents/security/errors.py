from __future__ import annotations


class SecurityError(RuntimeError):
    def __init__(self, code: str, message: str = "") -> None:
        self.code = str(code or "SECURITY_ERROR")
        super().__init__(message or self.code)


class CapabilityDenied(SecurityError):
    def __init__(self, message: str = "capability denied") -> None:
        super().__init__("CAPABILITY_DENIED", message)


class AuthorizationDenied(SecurityError):
    def __init__(self, message: str = "authorization denied") -> None:
        super().__init__("AUTHORIZATION_DENIED", message)


class ResourceDenied(SecurityError):
    def __init__(self, message: str = "resource denied") -> None:
        super().__init__("RESOURCE_DENIED", message)


class SandboxUnavailable(SecurityError):
    def __init__(self, message: str = "sandbox unavailable") -> None:
        super().__init__("SANDBOX_UNAVAILABLE", message)
