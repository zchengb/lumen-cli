from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LIB = ROOT / "lib"
if str(LIB) not in sys.path:
    sys.path.insert(0, str(LIB))

from agents.runtime.final_response import format_action_receipts_summary, is_planning_reply, prefer_action_summary


def test_planning_reply_detects_status_placeholder() -> None:
    assert is_planning_reply(
        "I'll pull the job status for MBPAS-1491 and report back with a clear owner and next step."
        "Checking Mark’s queue for the MBPAS-1491 test-case job now."
    )
    assert not is_planning_reply("**Job status**: completed\n- Mark failed on Bitable config")


def test_job_list_receipt_becomes_status_reply() -> None:
    receipts = [
        {
            "action": "agent.job.list",
            "status": "succeeded",
            "result": {
                "jobs": [
                    {
                        "job_id": "job_mark_94ccf628fb20",
                        "status": "completed",
                        "target_agent": "mark",
                        "capability": "test_case.generate",
                        "input": {"issue_key": "MBPAS-1491"},
                        "result": {
                            "result": {
                                "status": "failed",
                                "code": "TEST_CASE_CONFIG_MISSING",
                                "message": "No Feishu Bitable app token configured for project mbpass",
                            }
                        },
                    }
                ]
            },
        }
    ]
    placeholder = (
        "I'll pull the job status for MBPAS-1491 and report back with a clear owner and next step."
        "Checking Mark’s queue now."
    )
    text = prefer_action_summary(placeholder, receipts)
    assert "job_mark_94ccf628fb20" in text
    assert "TEST_CASE_CONFIG_MISSING" in text
    assert "I'll pull" not in text
    assert "Action results:" not in format_action_receipts_summary(receipts)


def test_denied_mutation_surfaces_instead_of_planning_lie() -> None:
    from agents.security.access_policy import classify_authorization_intent

    assert classify_authorization_intent("please re-run it") == "mutate_explicit"
    assert classify_authorization_intent("how's MBPAS-1491 going?") == "read"
    receipts = [
        {
            "action": "agent.job.list",
            "status": "succeeded",
            "result": {
                "jobs": [
                    {
                        "job_id": "job_mark_94ccf628fb20",
                        "status": "completed",
                        "target_agent": "mark",
                        "capability": "test_case.generate",
                        "input": {"issue_key": "MBPAS-1491"},
                    }
                ]
            },
        },
        {
            "action": "agent.job.create",
            "status": "denied",
            "error": "mutation denied for zone=RESTRICTED intent=read",
            "error_code": "AUTHORIZATION_DENIED",
            "result": {},
        },
    ]
    invented = (
        "**MBPAS-1491** test-case job check:\n\n"
        "- **Status (last confirmed):** queued — still **no running/completed/failed payload**"
    )
    text = prefer_action_summary(invented, receipts)
    assert "job_mark_94ccf628fb20" in text
    assert "queued" not in text.lower()
    assert "Action blocked" in text
    assert "agent.job.create" in text


if __name__ == "__main__":
    test_planning_reply_detects_status_placeholder()
    test_job_list_receipt_becomes_status_reply()
    test_denied_mutation_surfaces_instead_of_planning_lie()
    print("ok")
