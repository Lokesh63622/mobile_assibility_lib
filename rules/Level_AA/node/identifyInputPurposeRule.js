export function identifyInputPurposeRule(node) {
  // Check if node is an input element
  if (node.input) {
    if (!node.inputPurpose) {
      return {
        rule: "identify-input-purpose",
        description:
          "The purpose of this input field cannot be programmatically determined.",
        wcag: "WCAG 1.3.5: Identify Input Purpose",
        level: "AA",
        wcag_version: "2.1",
        android:
          "https://developer.android.com/guide/topics/ui/accessibility/apps#input-purpose",
        node: node.className,
        bounds: node.bounds
      };
    }
  }

  return null;
}
