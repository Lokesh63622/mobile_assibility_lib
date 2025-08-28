export function reflowRule(node) {
  // Check if node is a container with content
  if (node.container && node.content) {
    if (!node.reflowable) {
      return {
        rule: "reflow",
        description:
          "Content does not reflow properly without loss of information or functionality, or requires two-dimensional scrolling.",
        wcag: "WCAG 1.4.10: Reflow",
        level: "AA",
        wcag_version: "2.1",
        android:
          "https://developer.android.com/guide/topics/ui/accessibility/apps#responsive-layouts",
        node: node.className,
        bounds: node.bounds
      };
    }
  }

  return null;
}
