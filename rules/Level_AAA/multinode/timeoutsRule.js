export function timeoutsRule(allNodes) {
  const issues = [];

  for (const node of allNodes) {
    if (node.hasTimeout && !node.timeoutWarningShown && node.timeoutDuration < 20 * 60 * 60) {
      issues.push({
        rule: "timeouts",
        description: "Users are warned of any inactivity timeout that could result in data loss.",
        wcag: "WCAG 2.2.6: Timeouts",
        level: "AAA",
        wcag_version: "2.1",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps#timeouts",
        node: node.className
      });
    }
  }

  return issues.length ? issues : null;
}
