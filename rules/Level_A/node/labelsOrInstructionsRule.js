export function labelsOrInstructionsRule(node) {
  // Check if node is an input or interactive element that requires input
  if (node.input && !node.label && !node.contentDescription) {
    return {
      rule: "labels-or-instructions",
      description:
        "Input element requires user input but no label or instructions are provided.",
      wcag: "WCAG 3.3.2: Labels or Instructions",
      level: "A",
      wcag_version: "2.0",
      android:
        "https://developer.android.com/guide/topics/ui/accessibility/apps#labels",
      node: node.className,
      bounds: node.bounds
    };
  }

  return null;
}
