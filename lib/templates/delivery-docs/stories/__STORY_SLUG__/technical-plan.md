# Technical Plan: Mini Web Welcome Banner

## Goal

Add a static welcome banner to the mini web app and verify it with lightweight tests.

| Acceptance Criterion | Technical outcome |
|---|---|
| AC1: User sees welcome banner on first page load | Render a semantic banner in the home page component |

## Delivery Checklist

- [ ] 使用者首次進入首頁時可以看到歡迎橫幅。
- [ ] 歡迎橫幅不影響既有首頁內容與操作。

## Business Flow Diagram (Optional)

No diagram is required because this is a simple local UI change.

## Technical Clarifications

| Question | Confirmed answer | Impact on plan |
|---|---|---|
| Should the banner be global or home-page only? | Home-page only | Keep the change scoped to `src/pages/home.tsx` and a presentational component |

## Impacted Repositories

| Repository | Role in this delivery | Change summary | Runtime / verification level |
|---|---|---|---|
| mini-lumen-web | Frontend UI | Add banner markup, styles, and DOM test | Node lightweight unit test |

## Architecture And Module Placement

```text
mini-lumen-web
  src/pages/home -> render banner component
  src/components/WelcomeBanner -> new presentational component
  src/styles -> banner styling
  tests -> DOM render test
```

## Repository Conventions And Architecture Guards

| Repository | Existing layers / module boundary | Existing style to follow | Architecture guard test / rule | Delivery action |
|---|---|---|---|---|
| mini-lumen-web | page -> component -> styles | Existing component and test naming | None found | Preserve folder boundary |

## API And Contract Changes

### Caller impact

- None

### Breaking changes

- None

## Data Model And Migration Plan

- None

Do not introduce database foreign keys. Use application-level relationship validation and ordinary indexes where a data relationship requires them.

## Permission And Data Scope

| Surface | Actor / caller | Permission / role | Tenant, dealer, or ownership scope | Audit / logging | Verification |
|---|---|---|---|---|---|
| Welcome banner | Anonymous page visitor | Public read | Not applicable | Not required | DOM render test |

## Integration And Failure Handling

- None

## Configuration And Secrets

- None

## File-Level Change Plan

### mini-lumen-web

| File | Change |
|---|---|
| `src/components/WelcomeBanner.tsx` | Create banner component |
| `src/pages/home.tsx` | Render banner on page load |
| `src/styles/welcome-banner.css` | Add readable styling |
| `tests/welcome-banner.test.ts` | Add DOM render test |

## Implementation Steps

1. Create `WelcomeBanner` component with semantic markup.
2. Render the component from the home page.
3. Add focused styling for readability.
4. Add a DOM render test.
5. Run verification and create PR.

## Verification Plan

Plan tests based on the actual repository setup. Include unit tests, integration tests, and architecture guards only when the repository already supports them or the story explicitly requires adding them. App/PHP/frontend projects default to syntax/type/lint and explicitly allowed focused tests.

| Level | Repository | Existing capability / guard discovered | Command or manual check | Expected result | Notes |
|---|---|---|---|---|---|
| Syntax / unit | mini-lumen-web | Existing DOM test setup | `npm test` | Welcome banner test passes | Lightweight only |
| Manual | mini-lumen-web | Browser | Open home page manually | Banner is visible on first load | Optional |

## Runtime Profiles

| Repository | Dockerfile / profile source | Java / Node / PHP version | Commands allowed | Commands skipped |
|---|---|---|---|---|
| mini-lumen-web | Project package scripts | Node from project/toolchain | `npm test` | Production build unless explicitly requested |

## Observability And Support

| Area | Plan |
|---|---|
| Logs | Not required |
| Metrics / audit | Not required |
| Support diagnostics | Visual verification only |

## Rollback / Release Notes

- Remove the banner component and home page import.

## Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Styling conflicts with existing home layout | Low visual regression | Keep styles scoped to the banner component |

## Refactoring Notes

No architecture-level refactor is required.

## Out Of Scope

- Backend service
- CI/CD
