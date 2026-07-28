# Visual Delivery QA

Use the approved Visual Delivery Contract when present; otherwise use the rendered page and nearest existing UI as the reference. Read and reuse existing components, tokens, spacing, typography, and interaction patterns before adding new styles.

For each matrix row, or each relevant derived state:

1. Start the app from the prepared worktree and runtime context.
2. Use the prepared authenticated session when present. If it is unavailable, mark the delivery `blocked`; do not claim visual completion from source inspection.
3. Navigate to the target route, activate the fixture or mock data, and inspect the rendered page in a real browser or device. When a mock fixture is provided, use it for deterministic states; do not wait for an unimplemented backend endpoint or invent runtime data.
4. Compare the full screen with the approved design context, reference image, page shell, and at least two nearby sibling controls.
5. Check geometry and computed styles: content width, anchors, spacing, baseline, typography, weight, line height, colors, borders, radius, icons, overflow, responsive behavior, focus, keyboard behavior, and viewport edges.
6. Exercise applicable empty, populated, long-content, loading, delayed, error, disabled, selected, focus, and overlay states. Close overlays for settled-state evidence and capture them separately.
7. Fix defects, rerun the affected state, and record screenshots, measured anchors, comparisons, and blockers in `delivery-result.json`.

A component existing, lint passing, a cropped screenshot, fixed-height clipping, open-overlay screenshot, or unmeasured “close enough” result is not visual proof. Do not run a separate pixel-diff tool unless the approved plan requires it; visual acceptance is based on rendered behavior and evidence.
