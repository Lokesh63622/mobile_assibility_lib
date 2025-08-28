export function keyboardNoExceptionRule(allNodes) {
  const issues = [];

  // Check all focusable nodes
  const focusableNodes = allNodes.filter(n => n.focusable);
  for (const node of focusableNodes) {
    if (node.requiresTimingForKeystrokes) {
      issues.push({
        rule: "keyboard-no-exception",
        description: "All functionality must be operable through a keyboard interface without requiring specific timings for individual keystrokes.",
        wcag: "WCAG 2.1.3: Keyboard (No Exception)",
        level: "AAA",
        wcag_version: "2.0",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps#keyboard",
        node: node.className
      });
    }
  }

  return issues.length ? issues : null;
}
