# Visual Delivery Rules

1. Read the approved Visual Delivery Contract in `technical-plan.md` before editing UI.
2. Inspect and reuse every mapped component, design token, and styling convention before creating anything new.
3. Implement every state in the Visual State Matrix without adding a new styling system or component library.
4. Preserve responsive layout, safe areas, focus, keyboard, accessibility, and platform conventions.
5. Add the approved stable `data-testid` or React Native `testID` markers when they help future diagnostics, but do not rely on Lumen to run automated screenshot comparison during delivery verification.
6. Visual correctness is guaranteed by the delivery agent, not by automated Playwright pixel diff in Lumen verification.
7. When a `# Quick Login` section is present in the composed delivery prompt, authenticate with those workspace instructions before inspecting rendered UI.
8. When an `# Approved Figma Design Context` section is present, use the approved MCP design context before coding. If it is unavailable, use the committed design-context snapshot and approved reference instead.

## Agent Visual QA (mandatory)

Do not claim visual completion from source inspection alone. Before `ready_for_finalize`, complete every item below for each state in the Visual State Matrix.

1. Start the app locally using the worktree and runtime commands from the delivery context.
2. Authenticate with the `# Quick Login` instructions when present.
3. Navigate to the target screen and reproduce the fixture or route named in the matrix.
4. Inspect the rendered UI in the browser or device. Compare against the approved Figma reference, design-context snapshot, and committed reference image.
5. Verify layout structure: spacing, alignment, typography scale, font weight, line height, border radius, shadows, icon size, and color tokens.
6. Verify component states: disabled, empty, selected, hover/focus where applicable, loading/error if in scope, and tag/chip removal behavior.
7. Verify copy: titles, placeholders, button labels, and empty states match the approved plan (including locale overrides).
8. Verify interaction: open/close dropdowns, multi-select behavior, checkbox enable/disable, and payload-affecting toggles.
9. Fix visual defects with the smallest safe change. Re-check the affected state after each fix.
10. Record visual QA notes in `delivery-result.json` under `visual_qa` when any state required correction or could not be fully verified.

If you cannot run the app, authenticate, or reach a matrix state, set `delivery_status` to `blocked` and explain what blocked rendered inspection.
