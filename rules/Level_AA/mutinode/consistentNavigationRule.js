export function consistentNavigationRule(nodes) {
  // Collect all navigation nodes (example: className includes "Navigation" or "Nav")
  const navNodes = nodes.filter(n => n.className?.includes("Navigation") || n.contentDescription?.toLowerCase().includes("nav"));

  const issues = [];
  const seenOrder = [];

  navNodes.forEach((node, index) => {
    const label = node.text || node.contentDescription || "";
    if (seenOrder[index] && seenOrder[index] !== label) {
      issues.push({
        rule: "consistent-navigation",
        description:
          "Navigational elements are not in a consistent order across repeated sections.",
        wcag: "WCAG 3.2.3: Consistent Navigation",
        level: "AA",
        wcag_version: "2.0",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps#navigation",
        node: node.className,
        bounds: node.bounds,
        label
      });
    }
    seenOrder.push(label);
  });

  return issues.length ? issues : null;
}
