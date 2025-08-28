export function multipleWaysRule(nodes) {
  // Collect all navigation elements
  const navNodes = nodes.filter(
    (n) =>
      n.className?.includes("Navigation") || n.role === "navigation"
  );

  if (navNodes.length < 2) {
    return [
      {
        rule: "multiple-ways",
        description:
          "Less than two ways available to locate content within the set of pages.",
        wcag: "WCAG 2.4.5: Multiple Ways",
        level: "AA",
        wcag_version: "2.0",
        android:
          "https://developer.android.com/guide/topics/ui/accessibility/apps#navigation",
        nodes: navNodes.map((n) => n.className)
      }
    ];
  }

  return null;
}
