## Severity Guideline

Use exactly `High`, `Medium`, or `Low`. This is an operational triage label, not a CVSS score.

Before assigning a severity, confirm all three:

1. **Evidence** — concrete code and exact location.
2. **Impact** — what fails or is exposed in production.
3. **Trigger** — a realistic action or condition that causes it.

If any is missing, omit the finding or use `Low` only when the weak signal is worth tracking. When tiers are close, choose the lower one unless production impact is clear.

### High

Confirmed issue + realistic trigger + production impact involving security, permissions, identity, payment, data loss/corruption, critical outage, dangerous migration, or critical business logic. Examples: SQL injection, SSRF, IDOR, missing sensitive-endpoint auth, hardcoded live credential, lost update, wrong payment or permission.

Do not use High for theoretical attacks, dev/test-only paths, or implausible behavior.

### Medium

Confirmed correctness, reliability, validation, consistency, or API-contract bug with limited or non-critical impact. Medium is report-only; it does not receive an automated PR.

### Low

Minor maintainability, observability, optimization, UX, or low-confidence issue without a clear production trigger. Omit noise.

Across runs, raise severity only with stronger evidence, lower it when the trigger or impact is reduced, and keep the same title/repository/file/trigger wording for the same issue.
