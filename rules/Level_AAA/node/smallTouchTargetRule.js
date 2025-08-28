export function smallTouchTargetRule(node) {
  if (node.clickable && node.bounds) {
    const [x1, y1, x2, y2] = node.bounds.match(/\d+/g).map(Number);
    const width = x2 - x1;
    const height = y2 - y1;
    if (width < 44 || height < 44) {
      return {
        rule: "small-touch-target",
        description: "Touch target size is too small (<44x44px)",
        wcag: "WCAG 2.5.5: Target Size",
        level: "AAA",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps#touch-target",
        node: node.className,
        bounds: node.bounds
      };
    }
  }
  return null;
}
