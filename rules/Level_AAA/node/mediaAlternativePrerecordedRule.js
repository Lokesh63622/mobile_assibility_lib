export function mediaAlternativePrerecordedRule(node) {
  // Check if the node is a media element (video/audio) that requires a text alternative
  if (node.className?.includes("VideoView") || node.className?.includes("MediaPlayer")) {
    return {
      rule: "media-alternative-prerecorded",
      description: "Provide a full text alternative for prerecorded synchronized media.",
      wcag: "WCAG 1.2.8: Media Alternative (Prerecorded)",
      level: "AAA",
      wcag_version: "2.0",
      android: "https://developer.android.com/guide/topics/ui/accessibility/apps#media",
      node: node.className,
      bounds: node.bounds
    };
  }
  return null;
}
