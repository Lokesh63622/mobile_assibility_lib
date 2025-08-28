export function audioVideoAlternativeRule(nodes) {
  // Multi-node check (allNodes list)
  for (let node of nodes) {
    if (node.className?.includes("Audio") || node.className?.includes("Video")) {
      // Check if alternative (like transcript/caption) exists
      if (!node.hasTranscript && !node.hasCaptions && !node.altText) {
        return {
          rule: "audio-video-alternative",
          description:
            "Prerecorded audio-only or video-only content does not have a text alternative (e.g., transcript or description).",
          wcag: "WCAG 1.2.1: Audio-only and Video-only (Prerecorded)",
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
