export function missingLabelRule(node) {
  if (
    (node.className?.includes("Button") || node.clickable) &&
    !node.text &&
    !node.contentDescription
  ) {
    return {
      rule: "missing-label",
      description: "Interactive element has no accessible label",
      wcag: "WCAG 2.5.3: Label in Name",
      level: "A",
      android: "https://developer.android.com/guide/topics/ui/accessibility/apps#label-ui",
      node: node.className,
      bounds: node.bounds
    };
  }
  return null;
}
