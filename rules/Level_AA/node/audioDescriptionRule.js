export function audioDescriptionRule(node) {
  // Check if node is a prerecorded video element
  if (node.media && node.video && !node.live) {
    if (!node.audioDescriptionAvailable) {
      return {
        rule: "audio-description",
        description: "Prerecorded video content does not provide audio description.",
        wcag: "WCAG 1.2.5: Audio Description (Prerecorded)",
        level: "AA",
        wcag_version: "2.0",
        android:
          "https://developer.android.com/guide/topics/ui/accessibility/apps#media",
        node: node.className,
        bounds: node.bounds
      };
    }
  }

  return null;
}
