export function consistentHelpRule(nodes) {
  const issues = [];

  // Collect all help elements across nodes
  const helpNodes = nodes.filter((n) => n.role === "help" || n.isHelp);

  // Simple check: are all help elements at the same bounds (location) or type
  if (helpNodes.length > 1) {
    const firstBounds = helpNodes[0].bounds;
    const firstType = helpNodes[0].className;

    for (let i = 1; i < helpNodes.length; i++) {
      const node = helpNodes[i];
      if (node.bounds !== firstBounds || node.className !== firstType) {
        issues.push({
          rule: "consistent-help",
          description:
            "Help mechanisms are not presented consistently across pages.",
          wcag: "WCAG 3.2.6: Consistent Help",
          level: "A",
          wcag_version: "2.2",
          android:
            "https://developer.android.com/guide/topics/ui/accessibility/apps#help",
          node: node.className,
          bounds: node.bounds
        });
      }
    }
  }

  return issues.length > 0 ? issues : null;
}
