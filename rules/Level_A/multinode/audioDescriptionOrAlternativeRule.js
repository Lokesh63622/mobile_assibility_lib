export function audioDescriptionOrAlternativeRule(nodes) {
  for (let node of nodes) {
    // Check if node is a Video without audio description or alternative
    if (node.className?.includes("Video")) {
      const hasAudioDescription = node.hasAudioDescription || false;
      const hasTranscript = node.hasTranscript || false;

      if (!hasAudioDescription && !hasTranscript) {
        return {
          rule: "audio-description-or-alternative",
          description:
            "Prerecorded video content does not have an audio description or media alternative (transcript).",
          wcag: "WCAG 1.2.3: Audio Description or Media Alternative (Prerecorded)",
          level: "A",
          wcag_version: "2.0",
          android:
            "https://developer.android.com/guide/topics/media-apps/video-app",
          node: node.className,
          bounds: node.bounds
        };
      }
    }
  }
  return null;
}
