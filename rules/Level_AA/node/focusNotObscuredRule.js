export function focusNotObscuredRule(node, allNodes) {
  if (!node.focusable || !node.bounds) return null;

  const [x1, y1, x2, y2] = node.bounds.match(/\d+/g).map(Number);
  let obscured = false;

  for (const other of allNodes) {
    if (other === node || !other.bounds) continue;
    const [ox1, oy1, ox2, oy2] = other.bounds.match(/\d+/g).map(Number);

    const overlap =
      x1 < ox2 && x2 > ox1 &&
      y1 < oy2 && y2 > oy1;

    if (overlap) {
      obscured = true;
      break;
    }
  }

  if (obscured) {
    return {
      rule: "focus-not-obscured",
      description:
        "Focusable element is obscured by other content when receiving focus.",
      wcag: "WCAG 2.4.11: Focus Not Obscured (Minimum)",
      level: "AA",
      wcag_version: "2.2",
      android:
        "https://developer.android.com/guide/topics/ui/accessibility/apps#focus-indicators",
      node: node.className,
      bounds: node.bounds
    };
  }

  return null;
}
