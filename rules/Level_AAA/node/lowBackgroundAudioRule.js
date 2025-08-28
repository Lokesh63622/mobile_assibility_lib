export function lowBackgroundAudioRule(node) {
  if (node.className?.includes("AudioView") && node.backgroundAudio) {
    // Example check: mark if background audio is present or cannot be controlled
    return {
      rule: "low-background-audio",
      description: "For prerecorded audio-only content, background sounds are low or can be turned off.",
      wcag: "WCAG 1.4.7: Low or No Background Audio",
      level: "AAA",
      wcag_version: "2.0",
      android: "https://developer.android.com/guide/topics/ui/accessibility/apps#audio",
      node: node.className,
      bounds: node.bounds
    };
  }
  return null;
}
