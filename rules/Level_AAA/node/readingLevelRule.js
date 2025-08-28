export function readingLevelRule(node) {
  if (!node.text) return null;

  // Example: flag long/complex text; you can integrate a real readability check later
  const wordCount = node.text.trim().split(/\s+/).length;
  const sentenceCount = node.text.split(/[.!?]/).length;

  // Simple heuristic: more than 50 words or more than 3 sentences may need simpler version
  if (wordCount > 50 || sentenceCount > 3) {
    return {
      rule: "reading-level",
      description: "Text may require reading ability more advanced than lower secondary level; provide supplemental content or alternative version.",
      wcag: "WCAG 3.1.5: Reading Level",
      level: "AAA",
      wcag_version: "2.0",
      android: "https://developer.android.com/guide/topics/ui/accessibility/apps",
      node: node.className,
      text: node.text
    };
  }

  return null;
}
