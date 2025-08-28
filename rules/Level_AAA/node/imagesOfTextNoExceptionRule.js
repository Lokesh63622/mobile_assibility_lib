export function imagesOfTextNoExceptionRule(node) {
  if (node.className?.includes("Image")) {
    // Check if the image is not purely decorative and user can't customize text
    if (!node.contentDescription && !node.isDecorative) {
      return {
        rule: "images-of-text-no-exception",
        description: "Images of text are only used for pure decoration or where text can be customized by the user.",
        wcag: "WCAG 1.4.9: Images of Text (No Exception)",
        level: "AAA",
        wcag_version: "2.0",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps#content-desc",
        node: node.className,
        bounds: node.bounds
      };
    }
  }
  return null;
}
