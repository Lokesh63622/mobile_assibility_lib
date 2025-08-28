export function threeFlashesRule(node) {
  // Check if element has flashing content
  if (node.flashingFrequency && node.flashingFrequency > 3) {
    return {
      rule: "three-flashes",
      description:
        "Element flashes more than three times per second or exceeds red/flash thresholds.",
      wcag: "WCAG 2.3.1: Three Flashes or Below Threshold",
      level: "A",
      wcag_version: "2.0",
      android:
        "https://developer.android.com/guide/topics/ui/accessibility/apps#animations",
      node: node.className,
      bounds: node.bounds,
      flashesPerSecond: node.flashingFrequency
    };
  }

  return null;
}
