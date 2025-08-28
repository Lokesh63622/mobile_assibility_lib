export function changeOnRequestRule(nodes) {
  // Placeholder logic: check for elements that trigger context change automatically
  const issues = [];

  nodes.forEach(node => {
    if (node.triggersContextChange && !node.hasUserControl) {
      issues.push({
        rule: "change-on-request",
        description: "Changes of context are initiated without user request or no mechanism to turn them off.",
        wcag: "WCAG 3.2.5: Change on Request",
        level: "AAA",
        wcag_version: "2.0",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps",
        node: node.className,
        bounds: node.bounds
      });
    }
  });

  return issues.length ? issues : null;
}
