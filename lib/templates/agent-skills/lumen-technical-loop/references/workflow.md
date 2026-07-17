<!-- Lumen managed: agent-skill -->

# Technical Loop workflow

Preflight safely refreshes the docs and relevant clean repositories. Gate on one Story with `businessStatus: ready`; keep `technicalStatus` as `draft` until explicit approval. Inspect real repositories, build/test setup, permission patterns, and affected modules before planning. Never modify application source code.

Recommend a profile, explain why, and let the user override. **Light** is one localized repository change with no public API, migration, authorization/data scope, integration, async/scheduled change, or meaningful rollback risk; include goal/AC mapping, impacted files, key decision, steps, verification, risks, and out of scope. **Standard** is normal moderate impact and uses `templates/technical-plan.md`. **Complex** applies to multi-repository, migration/backfill, permissions/data scope, public/cross-service API, integrations, async/scheduled flow, state machine, high rollback risk, or significant placement decisions; use the full template depth. Never add irrelevant sections merely to fill a template.

For important decisions, add concise repository evidence: decision, `repository/path → symbol` (with an optional stable line range), and what it proves. Use a 3–8 line excerpt only when path and symbol are insufficient.

If repository facts expose a business ambiguity affecting ACs, rules, user-visible behavior, actors/roles, permission/data visibility, scope, failure behavior, or promised freshness/timing/availability: keep technical status draft, show evidence and business options/consequences, ask the owner/BA to run Business Loop, and resume only after `story.md` changes and business status is ready. Do not alter `story.md` yourself. Pure implementation decisions belong in the plan.

Before approval, complete repository investigation, selected profile, questions, concrete verification, and the quality bar; no blocking TBD. Present profile/reason, repositories, approach, architecture/domain decisions, applicable data/API/permission/integration/runtime impact, verification, risks, and out-of-scope. Ask exactly:

```text
A. Approve this Technical Plan
B. Continue refining
C. Keep it as draft
D. Request a Business Loop revision
```

Only explicit A may set `metadata.json.technicalStatus` to `approved`. A substantive approved-plan change returns it to draft and requires approval again; typographical or formatting-only changes do not.
