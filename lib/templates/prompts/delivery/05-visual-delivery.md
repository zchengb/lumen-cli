# Visual Delivery Rules

1. Read the approved Visual Delivery Contract in `technical-plan.md` when present; otherwise use the rendered page and its existing UI as the reference.
2. Inspect and reuse every mapped component, design token, and styling convention before creating anything new.
3. Implement every state in the Visual State Matrix when present; otherwise derive the relevant empty, populated, loading, error, disabled, focus, and overflow states from the feature.
4. Preserve responsive layout, safe areas, focus, keyboard, accessibility, and platform conventions.
5. Add the approved stable `data-testid` or React Native `testID` markers when they help future diagnostics, but do not rely on Lumen to run automated screenshot comparison during delivery verification.
6. Visual correctness is guaranteed by the delivery agent, not by automated Playwright pixel diff in Lumen verification.
7. When an `# Authenticated Web Session` section is present, use the provided local session helper before inspecting rendered UI. Never handle raw credentials yourself.
8. When an `# Approved Figma Design Context` section is present, use the approved MCP design context before coding. If it is unavailable, use the committed design-context snapshot and approved reference instead.

## Agent Visual QA (mandatory)

Do not claim visual completion from source inspection alone. Before `ready_for_finalize`, complete every item below for each relevant state in the Visual State Matrix, or the feature's derived state set when no matrix exists.

1. Start the app locally using the worktree and runtime commands from the delivery context.
2. Use the prepared `# Authenticated Web Session` when present; if it is unavailable, classify the issue as an environment block.
3. Navigate to the target screen and reproduce the fixture or route named in the matrix.
4. Inspect the rendered UI in the browser or device. Compare against the approved Figma reference, design-context snapshot, and committed reference image.
5. Verify layout structure: spacing, alignment, typography scale, font weight, line height, border radius, shadows, icon size, and color tokens.
6. Verify component states: disabled, empty, selected, hover/focus where applicable, loading/error if in scope, and tag/chip removal behavior.
7. Verify copy: titles, placeholders, button labels, and empty states match the approved plan (including locale overrides).
8. Verify interaction: open/close dropdowns, multi-select behavior, checkbox enable/disable, and payload-affecting toggles.
9. Fix visual defects with the smallest safe change. Re-check the affected state after each fix.
10. Record visual QA notes in `delivery-result.json` under `visual_qa` when any state required correction or could not be fully verified.

For controls with dynamic content, verify empty, populated, long-content, loading, delayed-response,
error, disabled, focus, and overflow states when applicable. Confirm computed geometry and
interaction behavior in addition to visual appearance: shared page anchors, typography metrics,
container dimensions, wrapping, clipping, overlays, keyboard behavior, and state transitions.

## Whole-screen rendered UI acceptance gate

Treat the approved reference, the page shell, and the nearest existing sibling components as
measurement anchors, not as general inspiration. Before changing CSS, inspect the header/sidebar,
content container, grid or form rhythm, and at least two nearby existing controls. Record their
bounding boxes and computed styles, then compare the full relevant screen at the same viewport,
font readiness, scroll position, and animation state.

- Compare page shell, content width, section spacing, control alignment, typography hierarchy,
  color tokens, borders, radii, shadows, icons, and responsive behavior against the existing page.
- Compare each new control with at least two same-page siblings by left edge, right edge,
  vertical baseline, indentation, gap, height, and computed font metrics. A child whose margin
  plus width pushes it outside its parent is a failure.
- Capture one full-screen evidence image and one focused image for each important state. Close
  menus, popovers, and dialogs for the settled-state image; capture overlays separately. Do not
  treat a component-only crop as proof that the surrounding page is harmonious.
- Assert that dynamic content stays inside its container, expands or scrolls intentionally, and
  never overlaps titles, controls, sticky regions, footers, or the next section. Verify long text,
  empty data, loading/error placeholders, keyboard focus, disabled controls, and viewport edges.
- Re-run the affected full-screen and focused states after every visual correction. A component
  existing, lint passing, or an unmeasured “close enough” screenshot is not a pass.

Record the measured page anchors, sibling comparisons, state screenshots, and any failed geometry
assertion in `delivery-result.json`. If the whole-screen gate fails, keep Delivery in
implementation/verification and fix the UI; do not finalize on a subjective “close enough” comparison.

If you cannot run the app, authenticate, or reach a matrix state, set `delivery_status` to `blocked` and explain what blocked rendered inspection.
