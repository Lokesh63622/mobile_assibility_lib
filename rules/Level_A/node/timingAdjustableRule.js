export function timingAdjustableRule(node) {
  // Check if the element has a time limit
  if (node.timeLimit && !node.userControllable) {
    return {
      rule: "timing-adjustable",
      description:
        "Element has a time limit but does not provide user controls to turn off, adjust, or extend it.",
      wcag: "WCAG 2.2.1: Timing Adjustable",
      level: "A",
      wcag_version: "2.0",
      android:
        "https://developer.android.com/guide/topics/ui/accessibility/apps#time-limits",
      node: node.className,
      bounds: node.bounds,
      timeLimit: node.timeLimit
    };
  }

  return null;
}
