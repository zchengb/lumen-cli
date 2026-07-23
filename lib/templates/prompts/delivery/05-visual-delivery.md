# Visual Delivery Rules

1. Read the approved Visual Delivery Contract in `technical-plan.md` before editing UI.
2. Inspect and reuse every mapped component, design token, and styling convention before creating anything new.
3. Implement every state in the Visual State Matrix without adding a new styling system or component library.
4. Preserve responsive layout, safe areas, focus, keyboard, accessibility, and platform conventions.
5. Add the approved stable `data-testid` or React Native `testID` markers when they help future diagnostics, but do not rely on Lumen to run automated screenshot comparison during delivery verification.
6. Visual correctness is guaranteed by the delivery agent, not by automated Playwright pixel diff in Lumen verification.
7. When an `# Authenticated Web Session` section is present, use the provided local session helper before inspecting rendered UI. Never handle raw credentials yourself.
8. When an `# Approved Figma Design Context` section is present, use the approved MCP design context before coding. If it is unavailable, use the committed design-context snapshot and approved reference instead.

## Agent Visual QA (mandatory)

Do not claim visual completion from source inspection alone. Before `ready_for_finalize`, complete every item below for each state in the Visual State Matrix.

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

For multi-select controls, verify at least empty, one-selected, four-selected with long names,
all-selected, loading, delayed-response, and API-error states. Confirm computed geometry and
interaction behavior in addition to visual appearance: shared left edges, title baseline,
font metrics, trigger dimensions, tag wrapping, no overlap with neighboring sections, toggle
off clearing, remove-chip behavior, and save/edit payload round-trip.

## Rendered UI acceptance gate

Treat the approved reference and the nearest existing sibling controls as measurement anchors,
not as general inspiration. Before changing CSS, inspect the sibling checkbox rows and selector
components already used on the same screen. Record their bounding boxes and computed styles, then
compare the new section at the same viewport and scroll position.

- Compare the section checkbox, label, nested controls, and trigger against the sibling rows by
  left edge, vertical baseline, indentation, and gap. A `width: 100%` child with a left margin
  that pushes it outside the parent is a failure.
- Check computed `font-family`, `font-size`, `font-weight`, `line-height`, `color`, border,
  radius, padding, and icon dimensions for the title, placeholder, tags, and chevron. Reuse the
  existing page token/component when the values differ.
- For selected states, close the menu before taking the evidence screenshot. The trigger must be
  a real visible container whose height grows with wrapped tags; every tag's bounding box must be
  inside the trigger, and the chevron must remain centered in the full trigger height. Never pass
  a fixed-height trigger whose tags overflow, overlap the checkbox/title row, or cover the next
  section.
- Explicitly test 0, 1, 4, long-name/multi-line, and all selections. For 4+ selections, assert
  `tag.bottom <= trigger.bottom`, `tag.right <= trigger.right - chevronArea`, no overlap with
  the title or following section, and a stable gap after the expanded trigger.
- Re-run the full matrix after every visual correction. A component existing, lint passing, or a
  screenshot with the menu open is not evidence of a selected-state pass.

Record the measured anchors, state screenshots, and any failed geometry assertion in
`delivery-result.json`. If the geometry gate fails, keep Delivery in implementation/verification
and fix the UI; do not finalize on a subjective “close enough” comparison.

If you cannot run the app, authenticate, or reach a matrix state, set `delivery_status` to `blocked` and explain what blocked rendered inspection.
