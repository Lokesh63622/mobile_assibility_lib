export function nonTextContentRule(node) {
  if (node.className?.includes("Image") && !node.contentDescription) {
    return {
      rule: "non-text-content",
      description: "Image element does not have an alternative text",
      wcag: "WCAG 1.1.1: Non-text Content",
      level: "A",
      wcag_version: "2.0",
      android: "https://developer.android.com/guide/topics/ui/accessibility/apps#content-desc",
      node: node.className,
      bounds: node.bounds
    };
  }
  return null;
}
