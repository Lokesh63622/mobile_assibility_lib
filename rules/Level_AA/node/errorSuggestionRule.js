export function errorSuggestionRule(node) {
  if (node.className?.includes("EditText") && node.hasError && node.suggestions?.length) {
    return {
      rule: "error-suggestion",
      description: "Input field provides suggestions for correction when an error is detected.",
      wcag: "WCAG 3.3.3: Error Suggestion",
      level: "AA",
      wcag_version: "2.0",
      android: "https://developer.android.com/guide/topics/ui/accessibility/apps#error-suggestion",
      node: node.className,
      bounds: node.bounds
    };
  }
  return null;
}
