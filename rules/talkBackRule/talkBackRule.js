export function talkBackRule(allNodes) {
  const issues = [];

  for (const node of allNodes) {
    // 1. Missing accessible name → 4.1.2 (A)
    if (!node.contentDescription && !node.text) {
      issues.push({
        rule: "talkback-missing-name",
        description: "Element is missing an accessible name (TalkBack cannot announce).",
        wcag: "WCAG 4.1.2: Name, Role, Value",
        level: "A",
        wcag_version: "2.0",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps#labels",
        node: node.className,
        bounds: node.bounds
      });
    }

    // 2. Missing role mapping → 4.1.2 (A)
    if (!node.role && node.focusable) {
      issues.push({
        rule: "talkback-missing-role",
        description: "Element has no semantic role for TalkBack.",
        wcag: "WCAG 4.1.2: Name, Role, Value",
        level: "A",
        wcag_version: "2.0",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps#roles",
        node: node.className,
        bounds: node.bounds
      });
    }

    // 3. Duplicate labels → 2.4.6 (AA)
    if (node.contentDescription && allNodes.filter(
        n => n.contentDescription === node.contentDescription
      ).length > 1) {
      issues.push({
        rule: "talkback-duplicate-label",
        description: "Multiple elements have the same accessible label, which may confuse TalkBack users.",
        wcag: "WCAG 2.4.6: Headings and Labels",
        level: "AA",
        wcag_version: "2.0",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps#labels",
        node: node.className,
        bounds: node.bounds
      });
    }

    // 4. Focus order issues (overlapping/hidden) → 2.4.3 (A)
    if (node.focusable) {
      const overlapping = allNodes.some(other => {
        if (other === node || !other.bounds) return false;
        return JSON.stringify(other.bounds) === JSON.stringify(node.bounds);
      });
      if (overlapping) {
        issues.push({
          rule: "talkback-focus-order",
          description: "Focusable elements overlap or share the same bounds; TalkBack focus order may be incorrect.",
          wcag: "WCAG 2.4.3: Focus Order",
          level: "A",
          wcag_version: "2.0",
          android: "https://developer.android.com/guide/topics/ui/accessibility/apps#focus",
          node: node.className,
          bounds: node.bounds
        });
      }
    }
  }

  // ✅ Final result with summary
  return {
    supported: issues.length === 0,
    summary: issues.length === 0
      ? "✅ TalkBack is supported with no issues found."
      : `❌ TalkBack NOT supported: ${issues.length} issue(s) found.`,
    issues
  };
}
