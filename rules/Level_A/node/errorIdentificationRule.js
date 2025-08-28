export function errorIdentificationRule(node) {
  // Check if node is an input and has an error
  if (node.input && node.hasError) {
    return {
      rule: "error-identification",
      description:
        "Input error is detected but the item in error is not properly identified or described to the user.",
      wcag: "WCAG 3.3.1: Error Identification",
      level: "A",
      wcag_version: "2.0",
      android:
        "https://developer.android.com/guide/topics/ui/accessibility/apps#input-errors",
      node: node.className,
      bounds: node.bounds,
      errorMessage: node.errorMessage || null
    };
  }

  return null;
}
