export function focusOrderRule(nodes) {
  const issues = [];

  // Filter only focusable elements
  const focusableNodes = nodes.filter((n) => n.focusable);

  // Check focus sequence visually (simplified heuristic)
  for (let i = 1; i < focusableNodes.length; i++) {
    const prev = focusableNodes[i - 1];
    const curr = focusableNodes[i];

    const [px1, py1] = prev.bounds.match(/\d+/g).slice(0, 2).map(Number);
    const [cx1, cy1] = curr.bounds.match(/\d+/g).slice(0, 2).map(Number);

    // Simplified: focus should generally move top-to-bottom or left-to-right
    if (cy1 < py1 || (cy1 === py1 && cx1 < px1)) {
      issues.push({
        rule: "focus-order",
        description:
          "Focusable elements do not follow a logical visual order.",
        wcag: "WCAG 2.4.3: Focus Order",
        level: "A",
        wcag_version: "2.0",
        android:
          "https://developer.android.com/guide/topics/ui/accessibility/apps#focusable",
        node: curr.className,
        bounds: curr.bounds,
        previousNode: prev.className
      });
    }
  }

  return issues.length > 0 ? issues : null;
}
