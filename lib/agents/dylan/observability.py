from __future__ import annotations

from agents.runtime.observability import *  # noqa: F403
from agents.runtime.observability import Observability as _RuntimeObservability


class Observability(_RuntimeObservability):
    def __init__(self, store=None, *, agent_id: str = "dylan") -> None:
        super().__init__(store, agent_id=agent_id)
