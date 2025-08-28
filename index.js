// import { parseStringPromise } from "xml2js";

// export async function runMobileAudit(xmlString) {
//   const issues = [];
//   const parsed = await parseStringPromise(xmlString, { attrkey: "attrs" });

//   const nodes = [];
//   function traverse(node) {
//     if (node.node) {
//       node.node.forEach((child) => {  
//         nodes.push(child.attrs);
//         traverse(child);
//       });
//     }
//   }
//   traverse(parsed.hierarchy);

//   for (const n of nodes) {
//     if (!n) continue;

//     // Rule 1: Missing label for interactive controls
//     if ((!n.text || n.text.trim() === "") &&
//         (!n["content-desc"] || n["content-desc"].trim() === "") &&
//         (n.clickable === "true" || (n.class || "").includes("Button"))) {
//       issues.push({ rule: "missing-label", node: n.class, bounds: n.bounds });
//     }

//     // Rule 2: Touch target size < 44x44 px
//     if (n.bounds) {
//       const match = n.bounds.match(/\[(\d+),(\d+)\]\[(\d+),(\d+)\]/);
//       if (match) {
//         const [x1, y1, x2, y2] = match.slice(1).map(Number);
//         const width = x2 - x1;
//         const height = y2 - y1;
//         if (width < 44 || height < 44) {
//           issues.push({ rule: "small-touch-target", node: n.class, bounds: n.bounds });
//         }
//       }
//     }
// // Rule 3: Duplicate labels
// const seenLabels = new Map();
// for (const n of nodes) {
//   if (!n) continue;
//   const label = (n.text || "").trim() || (n["content-desc"] || "").trim();
//   if (label) {
//     if (seenLabels.has(label)) {
//       issues.push({
//         rule: "duplicate-label",
//         node: n.class,
//         bounds: n.bounds,
//         label
//       });
//     } else {
//       seenLabels.set(label, true);
//     }
//   }
// }

// // Rule 5: Focusable but no accessible name
// for (const n of nodes) {
//   if (n.focusable === "true" && (!n.text || !n["content-desc"])) {
//     issues.push({
//       rule: "focusable-without-label",
//       node: n.class,
//       bounds: n.bounds
//     });
//   }
// }


//   }

//   return issues;
// }


// import { parseStringPromise } from "xml2js";
// import { nodeRules } from "./rules/index.js";

// export async function runMobileAudit(xmlString) {
//   const parsed = await parseStringPromise(xmlString, { attrkey: "attrs" });

//   const nodes = [];
//   function traverse(node) {
//     if (node.node) {
//       node.node.forEach((child) => {
//         nodes.push(child.attrs);
//         traverse(child);
//       });
//     }
//   }
//   traverse(parsed.hierarchy);

//   const issues = [];

//   // Run node-level rules
//   for (const n of nodes) {
//     if (!n) continue;
//     for (const rule of nodeRules) {
//       const result = rule(n);
//       if (result) issues.push(result);
//     }
//   }

//   // Run multi-node rules
//   for (const rule of multiNodeRules) {
//     const result = rule(nodes);
//     if (result?.length) issues.push(...result);
//   }

//   return issues;
// }


import { parseStringPromise } from "xml2js";
import { nodeRules, multiNodeRules } from "./rules/index.js";

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
