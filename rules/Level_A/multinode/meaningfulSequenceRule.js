export function meaningfulSequenceRule(nodes) {
  for (let i = 0; i < nodes.length - 1; i++) {
    const current = nodes[i];
    const next = nodes[i + 1];

    // Example 1: Visually ordered left-to-right, but DOM order reversed
    if (current.bounds && next.bounds) {
      const visuallyBefore =
        current.bounds.y < next.bounds.y ||
        (current.bounds.y === next.bounds.y && current.bounds.x < next.bounds.x);

      const domBefore = i < i + 1;

      if (visuallyBefore !== domBefore) {
        return {
          rule: "meaningful-sequence",
          description:
            "The visual reading sequence does not match the programmatic (DOM) sequence.",
          wcag: "WCAG 1.3.2: Meaningful Sequence",
          level: "A",
          wcag_version: "2.0",
          android:
            "https://developer.android.com/guide/topics/ui/accessibility/apps",
          node: `${current.className} -> ${next.className}`,
          bounds: { current: current.bounds, next: next.bounds }
        };
      }
    }

    // Example 2: Label must precede input in sequence
    if (current.role === "input" && next.role === "label") {
      return {
        rule: "meaningful-sequence",
        description:
          "Form label comes after input in accessibility tree instead of before.",
        wcag: "WCAG 1.3.2: Meaningful Sequence",
        level: "A",
        wcag_version: "2.0",
        android:
          "https://developer.android.com/guide/topics/ui/accessibility/apps",
        node: `${current.className} -> ${next.className}`,
        bounds: { current: current.bounds, next: next.bounds }
      };
    }
  }

  return null;
}
