export function noKeyboardTrapRule(nodes) {
  const issues = [];

  // Filter only interactive nodes
  const interactiveNodes = nodes.filter(
    (n) => n.clickable || n.focusable
  );

  // Check if any interactive node traps focus (simplified heuristic)
  // A node is considered trapping if tabbing forward/backward stays on the same node
  for (let i = 0; i < interactiveNodes.length; i++) {
    const node = interactiveNodes[i];

    // If node has no next focusable element → potential trap
    const nextNode = interactiveNodes[i + 1];
    const prevNode = interactiveNodes[i - 1];

    if (!nextNode || !prevNode) {
      // Potential edge case: first or last element
      continue;
    }

    const [x1, y1] = node.bounds.match(/\d+/g).slice(0, 2).map(Number);
    const [nx1, ny1] = nextNode.bounds.match(/\d+/g).slice(0, 2).map(Number);
    const [px1, py1] = prevNode.bounds.match(/\d+/g).slice(0, 2).map(Number);

    // Very basic check: if next and prev are visually same as current → trap
    if ((nx1 === x1 && ny1 === y1) || (px1 === x1 && py1 === y1)) {
      issues.push({
        rule: "no-keyboard-trap",
        description:
          "Keyboard focus may be trapped in this element; users cannot navigate out using keyboard",
        wcag: "WCAG 2.1.2: No Keyboard Trap",
        level: "A",
        android:
          "https://developer.android.com/guide/topics/ui/accessibility/apps#KeyboardNavigation",
        node: node.className,
        bounds: node.bounds
      });
    }
  }

  return issues.length > 0 ? issues : null;
}
