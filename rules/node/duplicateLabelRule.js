export function duplicateLabelRule(node, seenLabels) {
  const label = node.text || node.contentDescription;
  if (label && seenLabels.has(label)) {
    return {
      rule: "duplicate-label",
      description: "Duplicate accessible label found",
      wcag: "WCAG 3.2.4: Consistent Identification",
      android: "https://developer.android.com/guide/topics/ui/accessibility/apps",
      node: node.className,
      label
    };
  }
  if (label) seenLabels.add(label);
  return null;
}
