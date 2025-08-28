export function threeFlashesRules(allNodes) {
  const issues = [];

  // Assuming each node has a `flashCount` property (number of flashes per second)
  for (const node of allNodes) {
    if (node.flashCount && node.flashCount > 3) {
      issues.push({
        rule: "three-flashes",
        description: "Web pages do not contain anything that flashes more than three times in any one second period.",
        wcag: "WCAG 2.3.2: Three Flashes",
        level: "AAA",
        wcag_version: "2.0",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps",
        node: node.className,
        flashCount: node.flashCount
      });
    }
  }

  return issues.length ? issues : null;
}
