export function helpRule(nodes) {
  // Placeholder logic: check if any node provides context-sensitive help
  const hasHelp = nodes.some(node => node.providesHelp);

  if (!hasHelp) {
    return [{
      rule: "help-available",
      description: "Context-sensitive help is not available.",
      wcag: "WCAG 3.3.5: Help",
      level: "AAA",
      wcag_version: "2.0",
      android: "https://developer.android.com/guide/topics/ui/accessibility/apps",
      node: null // Multi-node, so specific node may not apply
    }];
  }

  return null;
}
