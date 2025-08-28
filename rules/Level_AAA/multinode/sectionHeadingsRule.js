export function sectionHeadingsRule(allNodes) {
  const issues = [];

  // Collect all heading elements (h1–h6)
  const headings = allNodes.filter(n => /^H[1-6]$/i.test(n.tagName));

  // Example check: ensure at least one heading exists
  if (headings.length === 0) {
    issues.push({
      rule: "section-headings",
      description: "Section headings are used to organize the content.",
      wcag: "WCAG 2.4.10: Section Headings",
      level: "AAA",
      wcag_version: "2.0",
      android: "https://developer.android.com/guide/topics/ui/accessibility/apps",
      node: null
    });
  }

  return issues.length ? issues : null;
}
