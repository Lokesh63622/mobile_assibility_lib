export function liveCaptionsRule(node) {
  // Check if node is a live media element that plays audio
  if (node.media && node.liveAudio) {
    if (!node.captionsAvailable) {
      return {
        rule: "live-captions",
        description: "Live audio content does not provide captions.",
        wcag: "WCAG 1.2.4: Captions (Live)",
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
