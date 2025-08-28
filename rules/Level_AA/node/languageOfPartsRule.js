export function languageOfPartsRule(node) {
  if (node.text && !node.lang) {
    return {
      rule: "language-of-parts",
      description:
        "The human language of this passage or phrase cannot be programmatically determined.",
      wcag: "WCAG 3.1.2: Language of Parts",
      level: "AA",
      wcag_version: "2.0",
      android:
        "https://developer.android.com/guide/topics/ui/accessibility/apps#text-language",
      node: node.className,
      bounds: node.bounds
    };
  }
  return null;
}
