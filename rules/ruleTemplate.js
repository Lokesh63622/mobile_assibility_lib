/**
 * Rule Template
 * -------------------------------
 * Use this as a base for creating new rules.
 * Decide whether it is a node-level rule (checks one node at a time)
 * or a multi-node rule (checks relationships between nodes).
 */

// ✅ Node-level Rule Example
// Receives a single node (its attributes)
// Return `null` if no issue, or an object describing the issue
export function exampleNodeRule(node) {
  // Example: Check if a button has no content/label
  if (node.class === "Button" && !node.text) {
    return {
      id: "missing-button-label",
      message: "Button is missing an accessible label",
      node: node, // attach node details for debugging
    };
  }
  return null;
}

// ✅ Multi-node Rule Example
// Receives the full array of nodes
// Return [] if no issues, or an array of issue objects
export function exampleMultiNodeRule(nodes) {
  const issues = [];

  // Example: Find duplicate content-desc values
  const seen = new Map();
  for (const n of nodes) {
    if (n["content-desc"]) {
      if (seen.has(n["content-desc"])) {
        issues.push({
          id: "duplicate-content-desc",
          message: `Duplicate content-desc found: "${n["content-desc"]}"`,
          node: n,
        });
      } else {
        seen.set(n["content-desc"], true);
      }
    }
  }

  return issues;
}
