export function animationFromInteractionsRule(allNodes) {
  const issues = [];

  for (const node of allNodes) {
    if (node.animatesOnInteraction && !node.canDisableAnimation) {
      issues.push({
        rule: "animation-from-interactions",
        description: "A mechanism is available to disable animation triggered by interaction, unless the animation is essential.",
        wcag: "WCAG 2.3.3: Animation from Interactions",
        level: "AAA",
        wcag_version: "2.2",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps",
        node: node.className
      });
    }
  }

  return issues.length ? issues : null;
}
