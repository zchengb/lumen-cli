#!/usr/bin/env python3
from __future__ import annotations

import sys
import time
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LIB = ROOT / "lib"
if str(LIB) not in sys.path:
    sys.path.insert(0, str(LIB))

from feishu.catchup import StartupCatchup, is_outdated_message, message_create_time


class CatchupTests(unittest.TestCase):
    def test_message_create_time_seconds_and_ms(self) -> None:
        self.assertEqual(message_create_time({"create_time": "1700000000"}), 1700000000.0)
        self.assertEqual(message_create_time({"create_time": "1700000000000"}), 1700000000.0)

    def test_outdated_before_boot(self) -> None:
        boot = 1_700_000_100.0
        self.assertTrue(is_outdated_message(create_time=1_700_000_000.0, started_at=boot))
        self.assertFalse(is_outdated_message(create_time=1_700_000_099.0, started_at=boot))
        self.assertFalse(is_outdated_message(create_time=0.0, started_at=boot))

    def test_catchup_keeps_latest_only(self) -> None:
        flushed: list[str] = []
        seen: list[str] = []
        started = time.time()
        catchup = StartupCatchup(
            started_at=started,
            on_flush=lambda event, _client: flushed.append(event["event"]["message"]["message_id"]),
            mark_seen=lambda _agent, message_id: seen.append(message_id),
            catchup_seconds=5.0,
            debounce_seconds=0.2,
        )
        client = object()
        older = {
            "event": {
                "message": {
                    "message_id": "om_old",
                    "chat_id": "oc_chat",
                    "create_time": str(int(started - 30)),
                }
            }
        }
        newer = {
            "event": {
                "message": {
                    "message_id": "om_new",
                    "chat_id": "oc_chat",
                    "create_time": str(int(started - 5)),
                }
            }
        }
        self.assertEqual(
            catchup.offer(
                agent_id="milchick",
                chat_id="oc_chat",
                message_id="om_old",
                create_time=started - 30,
                event=older,
                client=client,
                now=started + 0.1,
            ),
            "catchup_buffer",
        )
        self.assertEqual(
            catchup.offer(
                agent_id="milchick",
                chat_id="oc_chat",
                message_id="om_new",
                create_time=started - 5,
                event=newer,
                client=client,
                now=started + 0.2,
            ),
            "catchup_buffer",
        )
        self.assertIn("om_old", seen)
        deadline = time.time() + 2.0
        while time.time() < deadline and not flushed:
            time.sleep(0.05)
        self.assertEqual(flushed, ["om_new"])

    def test_after_catchup_outdated(self) -> None:
        flushed: list[str] = []
        seen: list[str] = []
        started = time.time() - 20
        catchup = StartupCatchup(
            started_at=started,
            on_flush=lambda event, _client: flushed.append("x"),
            mark_seen=lambda _agent, message_id: seen.append(message_id),
            catchup_seconds=5.0,
            debounce_seconds=0.1,
        )
        decision = catchup.offer(
            agent_id="milchick",
            chat_id="oc_chat",
            message_id="om_stale",
            create_time=started - 60,
            event={"event": {"message": {"message_id": "om_stale"}}},
            client=object(),
            now=time.time(),
        )
        self.assertEqual(decision, "outdated")
        self.assertEqual(seen, ["om_stale"])
        self.assertEqual(flushed, [])


if __name__ == "__main__":
    unittest.main()
