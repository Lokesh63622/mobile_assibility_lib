export function draggingMovementsRule(node) {
  if (node.draggable) {
    // Assume a property indicating if dragging can be done without drag gesture
    if (!node.singlePointerAlternative) {
      return {
        rule: "dragging-movements",
        description:
          "Interactive element requires dragging; ensure functionality can be achieved with a single pointer without dragging unless essential.",
        wcag: "WCAG 2.5.7: Dragging Movements",
        level: "AA",
        wcag_version: "2.2",
        android:
          "https://developer.android.com/guide/topics/ui/accessibility/apps#gestures",
        node: node.className,
        bounds: node.bounds
      };
    }
  }
  return null;
}
