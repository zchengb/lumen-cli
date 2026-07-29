from __future__ import annotations

import subprocess
import tempfile
import unittest
from pathlib import Path

LIB_DIR = Path(__file__).resolve().parents[1] / "lib" / "scripts"
import sys

if str(LIB_DIR) not in sys.path:
    sys.path.insert(0, str(LIB_DIR))

from git_sync import force_push_conflict, read_conflict, save_conflict  # noqa: E402


def git(repo: Path, *args: str) -> str:
    result = subprocess.run(["git", "-C", str(repo), *args], check=True, capture_output=True, text=True)
    return result.stdout.strip()


class GitSyncTests(unittest.TestCase):
    def test_force_push_uses_the_remote_revision_seen_by_the_conflict(self) -> None:
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            remote = root / "remote.git"
            local = root / "local"
            other = root / "other"
            state = root / "state"
            subprocess.run(["git", "init", "--bare", str(remote)], check=True, capture_output=True)
            subprocess.run(["git", "init", "-b", "main", str(local)], check=True, capture_output=True)
            git(local, "config", "user.email", "lumen@example.test")
            git(local, "config", "user.name", "Lumen Test")
            (local / "file.txt").write_text("base\n", encoding="utf-8")
            git(local, "add", "file.txt")
            git(local, "commit", "-m", "base")
            git(local, "remote", "add", "origin", str(remote))
            git(local, "push", "-u", "origin", "main")

            subprocess.run(["git", "clone", str(remote), str(other)], check=True, capture_output=True)
            git(other, "config", "user.email", "lumen@example.test")
            git(other, "config", "user.name", "Other")
            (other / "remote.txt").write_text("remote\n", encoding="utf-8")
            git(other, "add", "remote.txt")
            git(other, "commit", "-m", "remote update")
            git(other, "push", "origin", "main")

            (local / "local.txt").write_text("local\n", encoding="utf-8")
            git(local, "add", "local.txt")
            git(local, "commit", "-m", "local update")
            git(local, "fetch", "origin", "main")
            remote_oid = git(local, "rev-parse", "origin/main")
            local_oid = git(local, "rev-parse", "HEAD")
            save_conflict(state, repo=local, branch="main", remote_oid=remote_oid, local_oid=local_oid, reason="test")

            self.assertEqual(local_oid, force_push_conflict(state))
            self.assertEqual(local_oid, git(local, "ls-remote", "origin", "refs/heads/main").split()[0])
            self.assertEqual({}, read_conflict(state))


if __name__ == "__main__":
    unittest.main()
