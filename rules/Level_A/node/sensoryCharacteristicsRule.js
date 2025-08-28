export function sensoryCharacteristicsRule(node) {
  if (node.role === "text" || node.role === "label") {
    const text = node.text?.toLowerCase() || "";

    // Common sensory-only instruction patterns
    const sensoryPatterns = [
      /left|right|above|below|top|bottom/,
      /red|green|blue|round|square|circle|triangle/,
      /big|small|large|tiny/,
      /sound|tone|beep/
    ];

    if (sensoryPatterns.some((p) => p.test(text))) {
      return {
        rule: "sensory-characteristics",
        description:
          "Instructions rely solely on sensory characteristics (shape, size, visual location, orientation, or sound).",
        wcag: "WCAG 1.3.3: Sensory Characteristics",
        level: "A",
        wcag_version: "2.0",
        android:
          "https://developer.android.com/guide/topics/ui/accessibility/apps",
        node: node.className,
        bounds: node.bounds,
        snippet: node.text
      };
    }
  }

  return null;
}
