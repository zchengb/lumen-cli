from __future__ import annotations

import logging
from concurrent.futures import ThreadPoolExecutor
from typing import Any, Callable, Optional

from agents.dylan.jobs import ConversationJobStore, ScopeLockManager
from feishu.config import load_agents_config
from risk.store import utc_now

_LOG = logging.getLogger("lumen.dylan.runtime")
_EXECUTOR: Optional[ThreadPoolExecutor] = None
_SCOPE_LOCKS = ScopeLockManager()


def _max_workers() -> int:
    try:
        cfg = load_agents_config()
        dylan = cfg.get("dylan") if isinstance(cfg.get("dylan"), dict) else {}
        return max(int(dylan.get("max_concurrent_jobs") or 3), 1)
    except Exception:
        return 3


def get_executor() -> ThreadPoolExecutor:
    global _EXECUTOR
    if _EXECUTOR is None:
        _EXECUTOR = ThreadPoolExecutor(max_workers=_max_workers(), thread_name_prefix="dylan-conv")
    return _EXECUTOR


def submit_conversation_job(
    *,
    message_id: str,
    chat_id: str,
    thread_id: str,
    user_id: str,
    worker: Callable[[], Any],
) -> dict[str, Any]:
    bootstrap = ConversationJobStore()
    try:
        existing = bootstrap.get_by_message_id(message_id) if message_id else None
        if existing is not None:
            return {"status": "duplicate", "job": existing}
        job_message_id = message_id or f"local-{chat_id}-{thread_id}-{user_id}"
        job = bootstrap.create(
            {
                "message_id": job_message_id,
                "chat_id": chat_id,
                "thread_id": thread_id,
                "user_id": user_id,
                "state": "queued",
            }
        )
    finally:
        bootstrap.close()

    def _run() -> Any:
        jobs = ConversationJobStore()
        try:
            lock = _SCOPE_LOCKS.lock_for(chat_id, thread_id)
            with lock:
                jobs.update(job_message_id, state="routing")
                try:
                    result = worker()
                    jobs.update(
                        job_message_id,
                        state="completed",
                        intent=str((result or {}).get("action") or ""),
                        completed_at=utc_now(),
                    )
                    return result
                except Exception as exc:
                    _LOG.exception("conversation job failed")
                    jobs.update(
                        job_message_id,
                        state="failed",
                        error_code="worker_error",
                        error_detail=str(exc)[:300],
                    )
                    raise
        finally:
            jobs.close()

    future = get_executor().submit(_run)
    return {"status": "queued", "job": job, "future": future}
