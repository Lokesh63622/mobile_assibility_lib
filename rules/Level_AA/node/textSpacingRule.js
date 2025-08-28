export function textSpacingRule(node) {
  // Check if node has text
  if (node.text) {
    if (!node.supportsTextSpacing) {
      return {
        rule: "text-spacing",
        description:
          "Content or functionality is lost when users override text spacing properties.",
        wcag: "WCAG 1.4.12: Text Spacing",
        level: "AA",
        wcag_version: "2.1",
        android:
          "https://developer.android.com/guide/topics/ui/accessibility/apps#text-scaling",
        node: node.className,
        bounds: node.bounds
      };
    }
  }

  return null;
}
