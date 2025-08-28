export function headingsAndLabelsRule(nodes) {
  // Collect all headings and labeled elements
  const headings = nodes.filter(
    (n) =>
      n.role === "heading" ||
      n.className?.toLowerCase().includes("title") ||
      n.className?.toLowerCase().includes("label")
  );

  const issues = [];

  headings.forEach((node) => {
    const labelText = node.text || node.contentDescription;
    if (!labelText || labelText.trim() === "") {
      issues.push({
        rule: "headings-and-labels",
        description:
          "Heading or label does not describe topic or purpose.",
        wcag: "WCAG 2.4.6: Headings and Labels",
        level: "AA",
        wcag_version: "2.0",
        android:
          "https://developer.android.com/guide/topics/ui/accessibility/apps#labels",
        node: node.className,
        bounds: node.bounds
      });
    }
  });

  return issues.length > 0 ? issues : null;
}
