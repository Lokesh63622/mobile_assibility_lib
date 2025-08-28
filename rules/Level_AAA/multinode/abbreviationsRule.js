export function abbreviationsRule(nodes) {
  const issues = [];

  for (const node of nodes) {
    if (!node.text) continue;

    // Example: match uppercase abbreviations of 2–5 letters
    const matches = node.text.match(/\b[A-Z]{2,5}\b/g);
    if (matches?.length) {
      issues.push({
        rule: "abbreviations",
        description: "A mechanism for identifying the expanded form or meaning of abbreviations is available.",
        wcag: "WCAG 3.1.4: Abbreviations",
        level: "AAA",
        wcag_version: "2.0",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps",
        node: node.className,
        abbreviations: matches
      });
    }
  }

  return issues.length ? issues : null;
}
