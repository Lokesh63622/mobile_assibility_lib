export function useOfColorRule(nodes) {
  // Expecting nodes = array of UI elements
  const results = [];

  nodes.forEach((node) => {
    // Check if element uses color-based state (e.g., red/green classnames)
    const colorRelated =
      /red|green|blue|orange|yellow|#(?:[0-9a-fA-F]{3}){1,2}/.test(
        node.style?.color || ""
      ) || /error|success|warning/i.test(node.className || "");

    // If it's color-dependent but has no text/icon alternative
    if (colorRelated) {
      const hasText =
        node.text && node.text.trim().length > 0 && !/^\s*$/.test(node.text);
      const hasContentDescription = !!node.contentDescription;
      const hasIcon =
        node.role === "image" || node.role === "icon" ? true : false;

      if (!hasText && !hasContentDescription && !hasIcon) {
        results.push({
          rule: "use-of-color",
          description:
            "Element relies on color alone to convey information (missing text, icon, or content description).",
          wcag: "WCAG 1.4.1: Use of Color",
          level: "A",
          wcag_version: "2.0",
          android:
            "https://developer.android.com/guide/topics/ui/accessibility/apps",
          node: node.className,
          bounds: node.bounds,
          style: node.style
        });
      }
    }
  });

  return results.length > 0 ? results : null;
}
