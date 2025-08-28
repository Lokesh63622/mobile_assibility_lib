export function contentOnHoverFocusRule(node) {
  // Check if node has hover/focus triggered content
  if (node.revealsContentOnHover || node.revealsContentOnFocus) {
    if (!node.dismissable || !node.persistent) {
      return {
        rule: "content-on-hover-focus",
        description:
          "Additional content triggered by hover or focus cannot be dismissed, hovered, or made persistent as required.",
        wcag: "WCAG 1.4.13: Content on Hover or Focus",
        level: "AA",
        wcag_version: "2.1",
        android:
          "https://developer.android.com/guide/topics/ui/accessibility/apps#hover-focus",
        node: node.className,
        bounds: node.bounds
      };
    }
  }

  return null;
}
