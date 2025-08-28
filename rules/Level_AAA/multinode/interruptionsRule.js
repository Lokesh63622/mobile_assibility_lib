export function interruptionsRule(allNodes) {
  const issues = [];

  for (const node of allNodes) {
    if (node.interruptsUser && !node.canBePostponed) {
      issues.push({
        rule: "interruptions",
        description: "Interruptions can be postponed or suppressed by the user, except for emergencies.",
        wcag: "WCAG 2.2.4: Interruptions",
        level: "AAA",
        wcag_version: "2.0",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps#interruptions",
        node: node.className
      });
    }
  }

  return issues.length ? issues : null;
}
