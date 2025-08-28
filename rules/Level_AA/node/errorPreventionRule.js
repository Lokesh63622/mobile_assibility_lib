export function errorPreventionRule(node) {
  // Check if the node represents a form for sensitive data
  if (node.className?.includes("EditText") && node.sensitiveData) {
    return {
      rule: "error-prevention",
      description: "Forms handling legal, financial, or user data provide mechanisms to review, confirm, and correct information.",
      wcag: "WCAG 3.3.4: Error Prevention (Legal, Financial, Data)",
      level: "AA",
      wcag_version: "2.0",
      android: "https://developer.android.com/guide/topics/ui/accessibility/apps#error-prevention",
      node: node.className,
      bounds: node.bounds
    };
  }
  return null;
}
