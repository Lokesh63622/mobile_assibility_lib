export function overlappingElementsRule(node, allNodes) {
  if (!node.bounds) return null;
  const [x1, y1, x2, y2] = node.bounds.match(/\d+/g).map(Number);

  for (let other of allNodes) {
    if (other === node || !other.bounds) continue;
    const [ox1, oy1, ox2, oy2] = other.bounds.match(/\d+/g).map(Number);

    const overlap =
      x1 < ox2 && x2 > ox1 &&
      y1 < oy2 && y2 > oy1;

    if (overlap) {
      return {
        rule: "overlapping-elements",
        description: "Overlapping elements detected",
        wcag: "WCAG 1.4.11: Non-text Contrast",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps",
        level: "AA",
        node: node.className,
        bounds: node.bounds,
        overlapsWith: other.className
      };
    }
  }
  return null;
}
