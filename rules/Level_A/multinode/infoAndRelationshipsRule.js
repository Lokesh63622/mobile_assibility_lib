export function infoAndRelationshipsRule(nodes) {
  for (let node of nodes) {
    // Example 1: Heading styled visually but no semantic role
    if (node.role === "text" && node.fontSize >= 18 && !node.roleSemantic) {
      return {
        rule: "info-and-relationships",
        description:
          "Visually styled text looks like a heading but has no programmatic heading role.",
        wcag: "WCAG 1.3.1: Info and Relationships",
        level: "A",
        wcag_version: "2.0",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps",
        node: node.className,
        bounds: node.bounds
      };
    }

    // Example 2: Table missing headers association
    if (node.role === "table" && !node.hasHeaders) {
      return {
        rule: "info-and-relationships",
        description:
          "Table does not define header associations for rows/columns.",
        wcag: "WCAG 1.3.1: Info and Relationships",
        level: "A",
        wcag_version: "2.0",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps",
        node: node.className,
        bounds: node.bounds
      };
    }

    // Example 3: Grouped inputs missing label
    if (node.role === "group" && !node.label) {
      return {
        rule: "info-and-relationships",
        description:
          "Grouped form elements are missing a programmatic label.",
        wcag: "WCAG 1.3.1: Info and Relationships",
        level: "A",
        wcag_version: "2.0",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps",
        node: node.className,
        bounds: node.bounds
      };
    }
  }
  return null;
}
