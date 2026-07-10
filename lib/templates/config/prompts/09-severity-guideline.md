## Severity Guideline (Lumen Standard)

This is the official Lumen severity standard. Classify every finding into exactly one of: `High`, `Medium`, or `Low`.

Lumen severity is an **operational triage label** for local code review automation. It is **not** a CVSS score, CWE score, or formal compliance rating. It is inspired by common application-security practice (likelihood × impact) but simplified into three actionable tiers that drive reporting, Feishu card color, and automated PR policy.

### Required inputs before assigning severity

Every finding must already have:

1. **Confirmation** — you can point to concrete code evidence, not speculation.
2. **Impact** — what can go wrong in production if unfixed.
3. **Trigger** — a realistic sequence of actions or conditions that causes the impact.

If any of the three is missing, do not report the finding, or mark it `Low` only when the suspicion is worth tracking.

### Decision flow

Apply this order:

```text
1. Is the issue confirmed with code evidence?
   No  -> omit or Low (low-confidence only)
   Yes -> continue

2. If exploited or triggered, could it cause security breach, data loss/corruption,
   payment/identity/permission error, critical-path outage, or dangerous migration?
   Yes -> High
   No  -> continue

3. Is there a real correctness, reliability, validation, or consistency bug with
   limited blast radius or non-critical user impact?
   Yes -> Medium
   No  -> continue

4. Is it minor maintainability, style, observability, or optimization only?
   Yes -> Low
```

When two tiers seem possible, **choose the lower tier** unless production impact is clearly realistic.

### High

Assign `High` only when **all** are true:

- The issue is **confirmed** in code.
- A **realistic trigger** exists in normal or plausible production usage.
- Impact is **production-impacting** and not merely inconvenient.

Typical High examples:

| Category | Example |
|----------|---------|
| Security | SQL injection, SSRF, IDOR, missing auth on sensitive endpoint, hardcoded live credential |
| Access control | User can modify another user's data, role check bypass |
| Data integrity | Silent write failure, destructive migration without guard, lost updates |
| Business logic | Wrong payment amount, incorrect permission grant, wrong identity assignment |
| Reliability | Confirmed crash on critical path under realistic load or input |
| Validation mismatch | Frontend/backend mismatch that allows invalid critical operations |

Do **not** assign High for: theoretical attacks without a reachable path, issues only reachable in dev/test, or problems requiring implausible user behavior.

### Medium

Assign `Medium` when the issue is **confirmed** but impact is **limited**, **non-critical**, or **contained**:

| Category | Example |
|----------|---------|
| Validation | Missing validation on non-critical field |
| Logic | Edge-case bug outside critical path |
| Reliability | Unhandled exception in secondary flow |
| Consistency | Cache/retry/timeout causing limited stale reads |
| API contract | Non-critical frontend/backend field mismatch |

Medium findings are report-only. Do not open automated PRs.

### Low

Assign `Low` for **minor** or **low-confidence** items:

| Category | Example |
|----------|---------|
| Maintainability | Confusing naming, dead code, minor duplication |
| Suspicion | Possible bug without solid trigger |
| Optimization | Performance improvement without proven user impact |
| UX / observability | Minor logging or error-message improvement |

If confidence is low, prefer `Low` or omit entirely.

### Severity change rules across runs

- Increase severity only when new code evidence proves worse impact or a realistic trigger.
- Decrease severity when the original trigger is no longer reachable or impact was overstated.
- Reuse the same title/repository/file/trigger wording for the same underlying issue so the registry can track severity changes.

### Automated PR eligibility

Only `High` findings may receive automated fix commits and PRs, and only when the separate auto-fix policy also passes (safe minimal fix, repo allows auto-fix). Post-scan Python opens PRs using `GH_TOKEN`.

### Anti-patterns (never do this)

- Inflating Medium/Low issues to High to force attention.
- Using High for "might be exploitable someday" without code proof.
- Using severity as priority for refactoring or style preferences.
- Assigning severity before writing impact and trigger.
