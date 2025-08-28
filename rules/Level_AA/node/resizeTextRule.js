export function resizeTextRule(node) {
  // Check if node has text
  if (node.text) {
    if (!node.resizable) {
      return {
        rule: "resize-text",
        description:
          "Text cannot be resized up to 200% without loss of content or functionality.",
        wcag: "WCAG 1.4.4: Resize Text",
        level: "AA",
        wcag_version: "2.0",
        android:
          "https://developer.android.com/guide/topics/ui/accessibility/apps#text-scaling",
        node: node.className,
        bounds: node.bounds
      };
    }
  }

  return null;
}
