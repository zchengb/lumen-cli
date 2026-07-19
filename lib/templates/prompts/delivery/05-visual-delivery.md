# Visual Delivery Rules

1. Read the approved Visual Delivery Contract before editing.
2. Inspect and reuse every mapped component, design token, and styling convention before creating anything new.
3. Implement every state in the Visual State Matrix without adding a new styling system or component library.
4. Preserve responsive layout, safe areas, focus, keyboard, accessibility, and platform conventions.
5. Add the approved stable `data-testid` or React Native `testID` markers. For React Native states, add a Maestro flow that uses those semantic IDs for taps, text input, and assertions; never use screen coordinates.
6. Do not claim visual completion from source inspection. During implementation, use a visual session only when needed; inspect the device and screenshot evidence yourself. Runtime startup, capture, and cleanup remain owned by Lumen.
7. When an `# Approved Figma Design Context` section is present, use the approved MCP design context before coding. If it is unavailable, use the committed design-context snapshot and approved reference instead.
