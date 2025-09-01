import { parseStringPromise } from "xml2js";
import { nodeRules , multiNodeRules } from "./rules/index.js";

export async function runMobileAudit(xmlString) {
  const parsed = await parseStringPromise(xmlString, { attrkey: "attrs" });

  const nodes = [];
  function traverse(node) {
    if (node.node) {
      node.node.forEach((child) => {
        nodes.push(child.attrs);
        traverse(child);
      });
    }
  }
  traverse(parsed.hierarchy);

  const issues = [];

  // Run node-level rules
  for (const n of nodes) {
    if (!n) continue;
    for (const rule of nodeRules) {
      const result = rule(n);
      if (result) issues.push(result);
    }
  }

  // Run multi-node rules
  for (const rule of multiNodeRules) {
    const result = rule(nodes);
    if (result?.length) issues.push(...result);
  }

  return issues;
}