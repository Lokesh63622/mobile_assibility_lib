export function identifyPurposeRule(node) {
  // Check if the node is an input, icon, or UI region
  if (
    node.className?.includes("EditText") ||
    node.className?.includes("ImageView") ||
    node.className?.includes("ViewGroup")
  ) {
    return {
      rule: "identify-purpose",
      description: "The purpose of UI components, icons, and regions can be programmatically determined.",
      wcag: "WCAG 1.3.6: Identify Purpose",
      level: "AAA",
      wcag_version: "2.1",
      android: "https://developer.android.com/guide/topics/ui/accessibility/apps#purpose",
      node: node.className,
      bounds: node.bounds
    };
  }
  return null;
}
