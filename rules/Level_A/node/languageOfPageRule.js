export function languageOfPageRule(node) {
  // Check if node represents the main page/container
  if (node.className === "Page" && (!node.lang || node.lang.trim() === "")) {
    return {
      rule: "language-of-page",
      description: "Page does not have a programmatically determined language.",
      wcag: "WCAG 3.1.1: Language of Page",
      level: "A",
      wcag_version: "2.0",
      android:
        "https://developer.android.com/guide/topics/ui/accessibility/apps#locale",
      node: node.className,
      bounds: node.bounds
    };
  }

  return null;
}
