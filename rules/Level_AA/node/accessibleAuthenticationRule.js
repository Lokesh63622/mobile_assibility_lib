export function accessibleAuthenticationRule(node) {
  // Check if node is an authentication input (like password, login, or PIN field)
  if (node.className?.includes("EditText") && node.authentication) {
    return {
      rule: "accessible-authentication",
      description: "Authentication processes do not rely on cognitive function tests unless alternatives are provided.",
      wcag: "WCAG 3.3.8: Accessible Authentication (Minimum)",
      level: "AA",
      wcag_version: "2.2",
      android: "https://developer.android.com/guide/topics/ui/accessibility/apps#authentication",
      node: node.className,
      bounds: node.bounds
    };
  }
  return null;
}
