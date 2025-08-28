export function focusAppearanceRule(node) {
  if (!node.focusable) return null;

  // Assume we have properties for focus indicator size and contrast
  const focusSize = node.focusIndicatorSize || 0; // e.g., in pixels
  const contrastRatio = node.focusContrast || 0; // e.g., 1-21 scale

  if (focusSize < 2 || contrastRatio < 3) {
    return {
      rule: "focus-appearance",
      description:
        "Focusable element's visual focus indicator does not meet minimum size or contrast requirements.",
      wcag: "WCAG 2.4.13: Focus Appearance (Minimum)",
      level: "AA",
      wcag_version: "2.2",
      android:
        "https://developer.android.com/guide/topics/ui/accessibility/apps#focus-indicators",
      node: node.className,
      bounds: node.bounds
    };
  }

  return null;
}
