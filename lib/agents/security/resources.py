from __future__ import annotations

from pathlib import Path


FORBIDDEN_HOST_ROOTS = (
    ".ssh",
    ".gnupg",
    ".aws",
    ".lumen",
    "Library/Keychains",
    "Library/LaunchAgents",
    "Library/LaunchDaemons",
    "Desktop",
    "Documents",
    "Downloads",
)


def _home() -> Path:
    return Path.home().resolve()


def forbidden_paths() -> tuple[Path, ...]:
    home = _home()
    roots = [home / name for name in FORBIDDEN_HOST_ROOTS]
    roots.extend(
        [
            Path("/System").resolve(),
            Path("/Library").resolve(),
            Path("/etc").resolve(),
            Path("/private/etc").resolve(),
            Path("/private/var/db").resolve(),
        ]
    )
    return tuple(roots)


def canonicalize(path: str | Path) -> Path:
    return Path(path).expanduser().resolve()


def is_forbidden_host_path(path: str | Path) -> bool:
    resolved = canonicalize(path)
    for root in forbidden_paths():
        try:
            if resolved == root or resolved.is_relative_to(root):
                return True
        except (OSError, ValueError):
            continue
    return False


def assert_within_workspace(path: str | Path, workspace: str | Path) -> Path:
    resolved = canonicalize(path)
    root = canonicalize(workspace)
    if is_forbidden_host_path(resolved):
        raise PermissionError(f"host path denied: {resolved}")
    try:
        if not resolved.is_relative_to(root):
            raise PermissionError(f"workspace escape denied: {resolved}")
    except ValueError as exc:
        raise PermissionError(f"workspace escape denied: {resolved}") from exc
    # Symlink escape: if the path is under workspace but a parent symlink left the root,
    # resolve() already followed links; re-check relative_to after resolve covers that.
    return resolved


def assert_read_allowed(path: str | Path, workspace: str | Path) -> Path:
    return assert_within_workspace(path, workspace)


def assert_write_denied_outside_worktree(path: str | Path, allowed_root: str | Path | None = None) -> None:
    resolved = canonicalize(path)
    if is_forbidden_host_path(resolved):
        raise PermissionError(f"host write denied: {resolved}")
    if allowed_root is None:
        raise PermissionError(f"write denied outside managed worktree: {resolved}")
    root = canonicalize(allowed_root)
    if not resolved.is_relative_to(root):
        raise PermissionError(f"write denied outside managed worktree: {resolved}")
