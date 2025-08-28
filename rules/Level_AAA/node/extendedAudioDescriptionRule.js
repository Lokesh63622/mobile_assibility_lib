export function extendedAudioDescriptionRule(node) {
  // Check if the node is a media element (video) that requires extended audio description
  if (node.className?.includes("VideoView") || node.className?.includes("MediaPlayer")) {
    return {
      rule: "extended-audio-description-prerecorded",
      description: "Provide extended audio description for prerecorded video content when pauses are insufficient.",
      wcag: "WCAG 1.2.7: Extended Audio Description (Prerecorded)",
      level: "AAA",
      wcag_version: "2.0",
      android: "https://developer.android.com/guide/topics/ui/accessibility/apps#media",
      node: node.className,
      bounds: node.bounds
    };
  }
  return null;
}
