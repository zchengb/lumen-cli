# Visual Delivery Rules

1. Read the approved Visual Delivery Contract before editing.
2. Inspect and reuse every mapped component, design token, and styling convention before creating anything new.
3. Implement every state in the Visual State Matrix without adding a new styling system or component library.
4. Preserve responsive layout, safe areas, focus, keyboard, accessibility, and platform conventions.
5. Add the approved stable `data-testid` or React Native `testID` markers when they help future diagnostics, but do not rely on Lumen to run automated screenshot comparison during delivery verification.
6. Do not claim visual completion from source inspection alone. During implementation, inspect the rendered UI yourself against the approved Figma reference and design-context snapshot. Visual correctness is guaranteed by the delivery agent, not by automated Playwright pixel diff in Lumen verification.
7. When an `# Approved Figma Design Context` section is present, use the approved MCP design context before coding. If it is unavailable, use the committed design-context snapshot and approved reference instead.
