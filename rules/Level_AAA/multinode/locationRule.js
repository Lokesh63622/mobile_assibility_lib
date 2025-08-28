export function locationRule(allNodes) {
  const issues = [];

  for (const node of allNodes) {
    if (!node.hasLocationInfo) {
      issues.push({
        rule: "location",
        description: "Provide information about the user's location within a set of Web pages.",
        wcag: "WCAG 2.4.8: Location",
        level: "AAA",
        wcag_version: "2.0",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps",
        node: node.className
      });
    }
  }

  return issues.length ? issues : null;
}
