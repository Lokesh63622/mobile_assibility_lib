export function orientationRule(node) {
  // Check if node restricts orientation
  if (node.screen && node.orientationLocked) {
    return {
      rule: "orientation",
      description:
        "Content restricts its view and operation to a single display orientation.",
      wcag: "WCAG 1.3.4: Orientation",
      level: "AA",
      wcag_version: "2.1",
      android:
        "https://developer.android.com/guide/topics/ui/manifest/activity-element#screenOrientation",
      node: node.className,
      bounds: node.bounds
    };
  }

  return null;
}
