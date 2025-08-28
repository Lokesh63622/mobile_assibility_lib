export function signLanguageRule(node) {
  // Check if the node is a media element requiring sign language support
  if (node.className?.includes("VideoView") || node.className?.includes("MediaPlayer")) {
    return {
      rule: "sign-language-prerecorded",
      description: "Provide sign language interpretation for prerecorded audio content in synchronized media.",
      wcag: "WCAG 1.2.6: Sign Language (Prerecorded)",
      level: "AAA",
      wcag_version: "2.0",
      android: "https://developer.android.com/guide/topics/ui/accessibility/apps#media",
      node: node.className,
      bounds: node.bounds
    };
  }
  return null;
}
