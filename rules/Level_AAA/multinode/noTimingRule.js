export function noTimingRule(allNodes) {
  const issues = [];

  for (const node of allNodes) {
    if (node.requiresTiming) {
      issues.push({
        rule: "no-timing",
        description: "Timing is not essential for any activity.",
        wcag: "WCAG 2.2.3: No Timing",
        level: "AAA",
        wcag_version: "2.0",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps#timing",
        node: node.className
      });
    }
  }

  return issues.length ? issues : null;
}
