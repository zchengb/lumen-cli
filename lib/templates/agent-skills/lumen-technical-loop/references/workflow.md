<!-- Lumen managed: agent-skill -->

# Technical Loop workflow

Preflight safely refreshes the docs and relevant clean repositories. For a Story with `metadata.json.jiraKey`, invoke `$lumen-jira-story-import` before reading requirements. If `jiraSyncStatus` is `changed`, ask exactly: `Jira changed since this Story was confirmed. A. Pull and reconcile the Jira changes in the Business Loop B. Keep the local Story and continue technical planning C. Review the difference first`. Only A returns to the Business Loop; B is an explicit local-source decision and may continue planning. Gate on one Story with `businessStatus: ready`; keep `technicalStatus` as `draft` until explicit approval. Inspect real repositories, build/test setup, permission patterns, and affected modules before planning. Never modify application source code.

Recommend a profile, explain why, and let the user override. Use the five-section structure in `templates/technical-plan.md`: Scope & DC Checklist; Baseline & Decisions; Design & Architecture; Change Contract & Implementation; Verification, Performance & Delivery. **Light** is one localized repository change with no public API, migration, authorization/data scope, integration, async/scheduled change, or meaningful rollback risk; keep the plan short and omit diagrams when they add no clarity. **Standard** is normal moderate impact; include the diagrams, contracts, and conditional sections that the change actually needs. **Complex** applies to multi-repository, migration/backfill, permissions/data scope, public/cross-service API, integrations, async/scheduled flow, state machine, high rollback risk, or significant placement decisions. Complex plans must include an end-to-end Mermaid flowchart, a class/component diagram, the full identifier contract, dependency-ordered file changes, performance assessment, and rollback/release order. Do not add a "why this is complex" section or irrelevant boilerplate.

Ask every remaining high-impact technical clarification in one checklist turn unless the user asks for progressive single-question mode. Prefer 2–4 options per question with one `Recommended` when reasonable, and always allow a custom answer.

For important decisions, add concise repository evidence: decision, `repository/path → symbol` (with an optional stable line range), and what it proves. Use a 3–8 line excerpt only when path and symbol are insufficient.

For any query, collection, batch, API, asynchronous job, scheduled flow, integration, or large UI list, assess performance before approval: current and expected data volume, growth, call frequency, concurrency, latency/timeout expectations, result bounds, indexes, pagination, batching, caching, idempotency, resource usage, and failure behavior. Prefer existing evidence such as query plans, indexes, metrics, repository conventions, or measured timing. Never invent precise scale or latency values. If an unknown could change the design, ask a batched Technical Loop checklist question covering: (A) data volume and growth, (B) frequency/concurrency, (C) latency or SLA, and (D) available index/measurement evidence. Keep the plan draft until resolved or explicitly recorded as an owner-approved assumption. If the change is demonstrably local and performance-neutral, record `No material performance impact` with the reason.

For Complex plans, enumerate every new or changed method, API property, persistence field, DTO property, UI state, and semantic local/query variable in the Identifier Contract. Reuse existing names when the concept is unchanged. Add failure, retry, migration, permission, and rollback behavior to the same implementation contract; do not leave these decisions only in chat.

If repository facts expose a business ambiguity affecting ACs, rules, user-visible behavior, actors/roles, permission/data visibility, scope, failure behavior, or promised freshness/timing/availability: keep technical status draft, show evidence and business options/consequences, ask the owner/BA to run Business Loop, and resume only after `story.md` changes and business status is ready. Do not alter `story.md` yourself. Pure implementation decisions belong in the plan.

For a UI Story that cites a Figma URL, use the available Figma MCP during planning to inspect every referenced node. Commit a concise `assets/<screen>.design.md` snapshot recording the node URL/ID, capture time, layout, typography, spacing, colors, variants, and states. Put that path and the approved reference image in the Visual Delivery Contract. A screenshot is comparison evidence, not a replacement for MCP design context. If MCP cannot read a referenced node, keep the plan draft and record the blocker; do not approve it.

Before approval, complete repository investigation, selected profile, questions, concrete verification, and the quality bar; no blocking TBD. Present profile/reason, repositories, approach, architecture/domain decisions, applicable data/API/permission/integration/runtime impact, verification, risks, and out-of-scope. Ask exactly:

```text
A. Approve this Technical Plan
B. Continue refining
C. Keep it as draft
D. Request a Business Loop revision
```

Only explicit A may set `metadata.json.technicalStatus` to `approved`. A substantive approved-plan change returns it to draft and requires approval again; typographical or formatting-only changes do not.
