export function focusVisibleRule(node) {
  // Check if element is focusable
  if (node.focusable) {
    // Assume a property indicating visible focus; in practice, this may need custom detection
    if (!node.focusVisible) {
      return {
        rule: "focus-visible",
        description:
          "Focusable element does not have a visible focus indicator.",
        wcag: "WCAG 2.4.7: Focus Visible",
        level: "AA",
        wcag_version: "2.0",
        android:
          "https://developer.android.com/guide/topics/ui/accessibility/apps#focus-indicators",
        node: node.className,
        bounds: node.bounds
      };
    }
  }

  return null;
}
