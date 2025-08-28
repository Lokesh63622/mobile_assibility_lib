export function visualPresentationRule(node) {
  // Example: apply to text containers that can have adjustable styles
  if (node.className?.includes("TextView") || node.className?.includes("ContentBlock")) {
    return {
      rule: "visual-presentation",
      description: "Provide mechanisms to control foreground and background colors, line length, spacing, and text block width.",
      wcag: "WCAG 1.4.8: Visual Presentation",
      level: "AAA",
      wcag_version: "2.0",
      android: "https://developer.android.com/guide/topics/ui/accessibility/apps#text-adjustment",
      node: node.className,
      bounds: node.bounds
    };
  }
  return null;
}
