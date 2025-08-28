export function bypassBlocksRule(node) {
  // Check if the element is a repeated content block
  if (node.repeatedBlock && !node.bypassMechanism) {
    return {
      rule: "bypass-blocks",
      description:
        "Repeated content block does not provide a mechanism to bypass it.",
      wcag: "WCAG 2.4.1: Bypass Blocks",
      level: "A",
      wcag_version: "2.0",
      android:
        "https://developer.android.com/guide/topics/ui/accessibility/apps#navigation",
      node: node.className,
      bounds: node.bounds
    };
  }

  return null;
}
