export function targetSizeRule(node) {
  if (node.clickable && node.bounds) {
    const [x1, y1, x2, y2] = node.bounds.match(/\d+/g).map(Number);
    const width = x2 - x1;
    const height = y2 - y1;

    // Minimum 24x24 CSS pixels
    if (width < 24 || height < 24) {
      return {
        rule: "target-size",
        description:
          "The target for pointer input is smaller than the minimum size (24x24 CSS pixels).",
        wcag: "WCAG 2.5.8: Target Size (Minimum)",
        level: "AA",
        wcag_version: "2.2",
        android:
          "https://developer.android.com/guide/topics/ui/accessibility/apps#touch-target",
        node: node.className,
        bounds: node.bounds
      };
    }
  }
  return null;
}
