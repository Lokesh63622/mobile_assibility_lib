export function linkPurposeLinkOnlyRule(allNodes) {
  const issues = [];

  for (const node of allNodes) {
    if (node.tagName === "a" && (!node.text || node.text.trim() === "")) {
      issues.push({
        rule: "link-purpose-link-only",
        description: "A mechanism is available to identify the purpose of each link from link text alone.",
        wcag: "WCAG 2.4.9: Link Purpose (Link Only)",
        level: "AAA",
        wcag_version: "2.0",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps",
        node: node.className
      });
    }
  }

  return issues.length ? issues : null;
}
