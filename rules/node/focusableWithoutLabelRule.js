export function focusableWithoutLabelRule(node) {
  if (node.focusable && !node.text && !node.contentDescription) {
    return {
      rule: "focusable-without-label",
      description: "Focusable element has no accessible name",
      wcag: "WCAG 4.1.2: Name, Role, Value",
      level: "A", 
      android: "https://developer.android.com/guide/topics/ui/accessibility/apps#focusable",
      node: node.className
    };
  }
  return null;
}
