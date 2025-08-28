export function audioOnlyLiveRule(node) {
  // Check if the node is a live audio element
  if (node.className?.includes("AudioTrack") || node.className?.includes("MediaPlayer")) {
    return {
      rule: "audio-only-live",
      description: "Provide an alternative for live audio-only content.",
      wcag: "WCAG 1.2.9: Audio-only (Live)",
      level: "AAA",
      wcag_version: "2.0",
      android: "https://developer.android.com/guide/topics/ui/accessibility/apps#media",
      node: node.className,
      bounds: node.bounds
    };
  }
  return null;
}
