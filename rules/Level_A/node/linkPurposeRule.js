export function linkPurposeRule(node) {
  // Check if element is a link
  if (node.className?.includes("Link")) {
    // Determine if link text is missing or ambiguous
    const linkText = node.text?.trim() || "";
    const context = node.context?.trim() || "";
    if (!linkText || !isMeaningful(linkText, context)) {
      return {
        rule: "link-purpose",
        description:
          "Link purpose cannot be determined from the link text or its context.",
        wcag: "WCAG 2.4.4: Link Purpose (In Context)",
        level: "A",
        wcag_version: "2.0",
        android:
          "https://developer.android.com/guide/topics/ui/accessibility/apps#links",
        node: node.className,
        bounds: node.bounds,
        linkText,
        context
      };
    }
  }
  return null;
}

// Helper function to determine if link text is meaningful
function isMeaningful(text, context) {
  // Simple heuristic: text length >= 2 or context provides info
  return text.length >= 2 || context.length > 0;
}
