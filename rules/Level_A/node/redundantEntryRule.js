export function redundantEntryRule(node) {
  // Check if node is an input that requires re-entry
  if (node.input && node.requiresRedundantEntry) {
    // Ensure either auto-populated or selectable
    if (!node.autoPopulated && !node.selectablePrevious) {
      return {
        rule: "redundant-entry",
        description:
          "Information previously entered is required again but is not auto-populated or selectable.",
        wcag: "WCAG 3.3.7: Redundant Entry",
        level: "A",
        wcag_version: "2.2",
        android:
          "https://developer.android.com/guide/topics/ui/accessibility/apps#input",
        node: node.className,
        bounds: node.bounds
      };
    }
  }

  return null;
}
