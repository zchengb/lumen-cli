# Delivery Plan: __JIRA_KEY__ Mini Web Welcome Banner

## Goal

Add a static welcome banner to the mini web app and verify it with lightweight tests.

| Acceptance Criterion | Technical outcome |
|---|---|
| AC1: User sees welcome banner on first page load | Render a semantic banner in the home page component |

## Impacted Repositories

| Repository | Role in this delivery | Change summary |
|---|---|---|
| mini-lumen-web | Frontend UI | Add banner markup, styles, and DOM test |

## Architecture Summary

```text
mini-lumen-web
  src/pages/home -> render banner component
  src/components/WelcomeBanner -> new presentational component
  src/styles -> banner styling
  tests -> DOM render test
```

## Design Decisions

| Decision | Chosen approach | Rejected alternatives | Reason |
|---|---|---|---|
| Banner placement | Home page only | Global layout injection | Story scope is limited to first page load |

## API And Contract Changes

### Breaking changes

- None

## Data And Migration Changes

- None

## Configuration Changes

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
5. Run `npm test` and create PR.

## Verification

| Step | Repository | Command or manual check | Expected result |
|---|---|---|---|
| 1 | mini-lumen-web | `npm test` | Welcome banner test passes |
| 2 | mini-lumen-web | Open home page manually | Banner is visible on first load |

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
