export function onInputRule(node) {
  // Check if the node triggers context change on input
  if (node.userInputChangeContext && !node.userInformed) {
    return {
      rule: "on-input",
      description:
        "Changing the setting of this UI component automatically causes a change of context without user notification.",
      wcag: "WCAG 3.2.2: On Input",
      level: "A",
      wcag_version: "2.0",
      android:
        "https://developer.android.com/guide/topics/ui/accessibility/apps#input",
      node: node.className,
      bounds: node.bounds,
      triggeredChange: node.userInputChangeContext
    };
  }

  return null;
}
