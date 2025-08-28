export function statusMessagesRule(node) {
  // Check if the node is a status message element
  if (node.role === "status" || node.className?.includes("TextView")) {
    return {
      rule: "status-messages",
      description: "Status messages can be programmatically determined so they can be presented by assistive technologies without receiving focus.",
      wcag: "WCAG 4.1.3: Status Messages",
      level: "AA",
      wcag_version: "2.1",
      android: "https://developer.android.com/guide/topics/ui/accessibility/apps#status-messages",
      node: node.className,
      bounds: node.bounds
    };
  }
  return null;
}
