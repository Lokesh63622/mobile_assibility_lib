export function pageTitledRule(node) {
  // Check if the page or main container has a descriptive title
  if (node.className === "Page" && (!node.title || node.title.trim() === "")) {
    return {
      rule: "page-titled",
      description: "Page does not have a descriptive title.",
      wcag: "WCAG 2.4.2: Page Titled",
      level: "A",
      wcag_version: "2.0",
      android:
        "https://developer.android.com/guide/topics/ui/accessibility/apps#content-desc",
      node: node.className,
      bounds: node.bounds
    };
  }

  return null;
}
