export function targetSizeRules(node) {
  if (node.bounds) {
    const [x1, y1, x2, y2] = node.bounds.match(/\d+/g).map(Number);
    const width = x2 - x1;
    const height = y2 - y1;

    if (width < 44 || height < 44) {
      return {
        rule: "target-size",
        description: "The size of the target for pointer inputs is at least 44 by 44 CSS pixels with exceptions.",
        wcag: "WCAG 2.5.5: Target Size",
        level: "AAA",
        wcag_version: "2.1",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps#touch-target",
        node: node.className,
        bounds: node.bounds
      };
    }
  }
  return null;
}
