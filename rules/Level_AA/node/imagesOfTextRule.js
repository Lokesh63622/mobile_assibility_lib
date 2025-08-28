export function imagesOfTextRule(node) {
  // Check if node is an image representing text
  if (node.image && node.textImage) {
    if (!node.essentialPurpose) {
      return {
        rule: "images-of-text",
        description:
          "Use of images for text is not allowed unless essential; use real text instead.",
        wcag: "WCAG 1.4.5: Images of Text",
        level: "AA",
        wcag_version: "2.0",
        android:
          "https://developer.android.com/guide/topics/ui/accessibility/apps#content-desc",
        node: node.className,
        bounds: node.bounds
      };
    }
  }

  return null;
}
