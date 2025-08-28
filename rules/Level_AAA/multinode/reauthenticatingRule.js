export function reauthenticatingRule(allNodes) {
  const issues = [];

  for (const node of allNodes) {
    if (node.sessionExpired && !node.dataPreserved) {
      issues.push({
        rule: "re-authenticating",
        description: "Data is preserved when re-authenticating after a session expires.",
        wcag: "WCAG 2.2.5: Re-authenticating",
        level: "AAA",
        wcag_version: "2.0",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps#session",
        node: node.className
      });
    }
  }

  return issues.length ? issues : null;
}
