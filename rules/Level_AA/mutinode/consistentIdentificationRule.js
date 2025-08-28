export function consistentIdentificationRule(nodes) {
  const labelMap = new Map();
  const issues = [];

  nodes.forEach(node => {
    const label = node.text || node.contentDescription;
    if (!label) return;

    if (labelMap.has(label)) {
      const existingNode = labelMap.get(label);
      if (existingNode.className !== node.className) {
        issues.push({
          rule: "consistent-identification",
          description: "Components with the same function are not identified consistently.",
          wcag: "WCAG 3.2.4: Consistent Identification",
          level: "AA",
          wcag_version: "2.0",
          android: "https://developer.android.com/guide/topics/ui/accessibility/apps#consistent-labels",
          node: node.className,
          bounds: node.bounds,
          label
        });
      }
    } else {
      labelMap.set(label, node);
    }
  });

  return issues.length ? issues : null;
}
