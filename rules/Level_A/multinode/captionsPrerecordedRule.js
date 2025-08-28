export function captionsPrerecordedRule(nodes) {
  for (let node of nodes) {
    // Check if node is a Video (with audio track)
    if (node.className?.includes("Video") && node.hasAudio) {
      // Validate if captions are missing
      if (!node.hasCaptions) {
        return {
          rule: "captions-prerecorded",
          description:
            "Prerecorded video with audio does not have captions.",
          wcag: "WCAG 1.2.2: Captions (Prerecorded)",
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
