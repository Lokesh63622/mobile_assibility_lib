export function onFocusRule(node) {
  // Check if the node is focusable and triggers a context change
  if (node.focusable && node.onFocusChangeContext) {
    return {
      rule: "on-focus",
      description:
        "Focusable element initiates a change of context when it receives focus.",
      wcag: "WCAG 3.2.1: On Focus",
      level: "A",
      wcag_version: "2.0",
      android:
        "https://developer.android.com/guide/topics/ui/accessibility/apps#focusable",
      node: node.className,
      bounds: node.bounds,
      triggeredChange: node.onFocusChangeContext
    };
  }

  return null;
}
