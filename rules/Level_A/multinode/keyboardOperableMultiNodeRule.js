export function keyboardOperableMultiNodeRule(nodes) {
  const issues = [];

  // Filter only interactive nodes
  const interactiveNodes = nodes.filter(
    (n) => n.clickable || n.focusable
  );

  for (let i = 0; i < interactiveNodes.length; i++) {
    const node = interactiveNodes[i];

    // Node must be focusable
    if (!node.focusable) {
      issues.push({
        rule: "keyboard-operable",
        description:
          "Interactive element is not operable using a keyboard interface",
        wcag: "WCAG 2.1.1: Keyboard",
        level: "A",
        android:
          "https://developer.android.com/guide/topics/ui/accessibility/apps#KeyboardNavigation",
        node: node.className,
        bounds: node.bounds
      });
    }

    // Check focus order (simple visual-top-to-bottom left-to-right heuristic)
    if (i < interactiveNodes.length - 1) {
      const nextNode = interactiveNodes[i + 1];
      if (node.bounds && nextNode.bounds) {
        const [x1, y1] = node.bounds.match(/\d+/g).slice(0, 2).map(Number);
        const [nx1, ny1] = nextNode.bounds.match(/\d+/g).slice(0, 2).map(Number);

        // If next element is visually above current element → out-of-order
        if (ny1 < y1) {
          issues.push({
            rule: "keyboard-focus-order",
            description:
              "Keyboard focus order does not match the visual sequence",
            wcag: "WCAG 2.1.1: Keyboard",
            level: "A",
            android:
              "https://developer.android.com/guide/topics/ui/accessibility/apps#KeyboardNavigation",
            node: `${node.className} -> ${nextNode.className}`,
            bounds: { current: node.bounds, next: nextNode.bounds }
          });
        }
      }
    }
  }

  return issues.length > 0 ? issues : null;
}
