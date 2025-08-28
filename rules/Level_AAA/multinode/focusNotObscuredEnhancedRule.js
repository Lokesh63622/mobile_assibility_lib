export function focusNotObscuredEnhancedRule(allNodes) {
  const issues = [];

  // Filter focusable elements
  const focusableNodes = allNodes.filter(n => n.focusable);

  for (const node of focusableNodes) {
    if (!node.bounds) continue;
    const [x1, y1, x2, y2] = node.bounds.match(/\d+/g).map(Number);

    for (const other of allNodes) {
      if (other === node || !other.bounds) continue;
      const [ox1, oy1, ox2, oy2] = other.bounds.match(/\d+/g).map(Number);

      const overlap = x1 < ox2 && x2 > ox1 && y1 < oy2 && y2 > oy1;
      if (overlap) {
        issues.push({
          rule: "focus-not-obscured-enhanced",
          description: "When a user interface component receives keyboard focus, no part is hidden by other content.",
          wcag: "WCAG 2.4.12: Focus Not Obscured (Enhanced)",
          level: "AAA",
          wcag_version: "2.2",
          android: "https://developer.android.com/guide/topics/ui/accessibility/apps",
          node: node.className,
          bounds: node.bounds,
          overlapsWith: other.className
        });
      }
    }
  }

  return issues.length ? issues : null;
}
