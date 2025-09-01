// import fs from "fs";

// // 1. Load audit-result.json
// const raw = fs.readFileSync("./audit-result.json", "utf-8");
// const data = JSON.parse(raw);

// // 2. Deduplicate results
// const seen = new Set();
// const unique = [];

// for (const item of data) {
//   const key = JSON.stringify(item, Object.keys(item).sort());
//   if (!seen.has(key)) {
//     seen.add(key);
//     unique.push(item);
//   }
// }

// // 3. Summarize
// const summary = {
//   total_issues: unique.length,
//   by_rule: {},
//   by_level: {},
// };

// for (const item of unique) {
//   if (item.rule) {
//     summary.by_rule[item.rule] = (summary.by_rule[item.rule] || 0) + 1;
//   }
//   if (item.level) {
//     summary.by_level[item.level] = (summary.by_level[item.level] || 0) + 1;
//   }
// }

// // 4. Save deduplicated JSON
// fs.writeFileSync(
//   "./audit-result-deduplicated.json",
//   JSON.stringify(unique, null, 2),
//   "utf-8"
// );

// // 5. Generate HTML report
// const html = `
// <!doctype html>
// <html lang="en">
// <head>
// <meta charset="utf-8" />
// <title>Accessibility Audit Report</title>
// <style>
//   body { font-family: Arial, sans-serif; background:#f5f7fa; color:#222; margin:0; padding:20px; }
//   h1 { margin-top:0; }
//   .cards { display:flex; gap:20px; margin-bottom:20px; }
//   .card { background:white; padding:20px; border-radius:10px; box-shadow:0 2px 5px rgba(0,0,0,.1); flex:1; }
//   table { width:100%; border-collapse:collapse; margin-top:10px; }
//   th, td { padding:8px 12px; border:1px solid #ddd; text-align:left; }
//   th { background:#eee; }
// </style>
// </head>
// <body>
//   <h1>Accessibility Audit Report</h1>
//   <p><b>Total unique issues:</b> ${summary.total_issues}</p>

//   <div class="cards">
//     <div class="card">
//       <h3>By Rule</h3>
//       <table>
//         <thead><tr><th>Rule</th><th>Count</th></tr></thead>
//         <tbody>
//           ${Object.entries(summary.by_rule)
//             .map(([rule, count]) => `<tr><td>${rule}</td><td>${count}</td></tr>`)
//             .join("")}
//         </tbody>
//       </table>
//     </div>
//     <div class="card">
//       <h3>By WCAG Level</h3>
//       <table>
//         <thead><tr><th>Level</th><th>Count</th></tr></thead>
//         <tbody>
//           ${Object.entries(summary.by_level)
//             .map(([level, count]) => `<tr><td>${level}</td><td>${count}</td></tr>`)
//             .join("")}
//         </tbody>
//       </table>
//     </div>
//   </div>

//   <h3>All Issues</h3>
//   <table>
//     <thead><tr><th>#</th><th>Rule</th><th>Level</th><th>Message</th><th>Bounds</th></tr></thead>
//     <tbody>
//       ${unique
//         .map(
//           (item, i) =>
//             `<tr><td>${i + 1}</td><td>${item.rule}</td><td>${item.level}</td><td>${item.message || ""}</td><td>${item.bounds || ""}</td></tr>`
//         )
//         .join("")}
//     </tbody>
//   </table>
// </body>
// </html>
// `;

// fs.writeFileSync("./audit-report.html", html, "utf-8");

// console.log("✅ Report generated: audit-report.html");


import fs from "fs";

// 1. Load audit-result.json
const raw = fs.readFileSync("./audit-result.json", "utf-8");
const data = JSON.parse(raw);

// 2. Deduplicate results
const seen = new Set();
const unique = [];

for (const item of data) {
  const key = JSON.stringify(item, Object.keys(item).sort());
  if (!seen.has(key)) {
    seen.add(key);
    unique.push(item);
  }
}

// 3. Summarize
const summary = {
  total_issues: unique.length,
  by_rule: {},
  by_level: {},
};

// Count issues per rule & level
for (const item of unique) {
  if (item.rule) {
    summary.by_rule[item.rule] = (summary.by_rule[item.rule] || 0) + 1;
  }
  if (item.level) {
    summary.by_level[item.level] = (summary.by_level[item.level] || 0) + 1;
  }
}

// 4. TalkBack Support Check
function checkTalkBackSupport(results) {
  // Example condition: If any element has missing label / focus issue → Not supported
  const blockingRules = ["missing-label", "focus-not-obscured", "audio-only-live"];
  const blocking = results.filter((r) => blockingRules.includes(r.rule));

  if (blocking.length > 0) {
    return {
      supported: false,
      issues: blocking.map((b) => b.rule),
    };
  }
  return { supported: true, issues: [] };
}

const talkback = checkTalkBackSupport(unique);
summary.talkback_support = talkback.supported ? "Yes ✅" : "No ❌";

// 5. Save deduplicated JSON
fs.writeFileSync(
  "./audit-result-deduplicated.json",
  JSON.stringify({ results: unique, summary }, null, 2),
  "utf-8"
);

// 6. Generate HTML report
const html = `
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Accessibility Audit Report</title>
<style>
  body { font-family: Arial, sans-serif; background:#f5f7fa; color:#222; margin:0; padding:20px; }
  h1 { margin-top:0; }
  .cards { display:flex; gap:20px; margin-bottom:20px; }
  .card { background:white; padding:20px; border-radius:10px; box-shadow:0 2px 5px rgba(0,0,0,.1); flex:1; }
  table { width:100%; border-collapse:collapse; margin-top:10px; }
  th, td { padding:8px 12px; border:1px solid #ddd; text-align:left; }
  th { background:#eee; }
</style>
</head>
<body>
  <h1>Accessibility Audit Report</h1>
  <p><b>Total unique issues:</b> ${summary.total_issues}</p>
  <p><b>TalkBack Supported:</b> ${summary.talkback_support}</p>

  <div class="cards">
    <div class="card">
      <h3>By Rule</h3>
      <table>
        <thead><tr><th>Rule</th><th>Count</th></tr></thead>
        <tbody>
          ${Object.entries(summary.by_rule)
            .map(([rule, count]) => `<tr><td>${rule}</td><td>${count}</td></tr>`)
            .join("")}
        </tbody>
      </table>
    </div>
    <div class="card">
      <h3>By WCAG Level</h3>
      <table>
        <thead><tr><th>Level</th><th>Count</th></tr></thead>
        <tbody>
          ${Object.entries(summary.by_level)
            .map(([level, count]) => `<tr><td>${level}</td><td>${count}</td></tr>`)
            .join("")}
        </tbody>
      </table>
    </div>
  </div>

  <h3>All Issues</h3>
  <table>
    <thead><tr><th>#</th><th>Rule</th><th>Level</th><th>Message</th><th>Bounds</th></tr></thead>
    <tbody>
      ${unique
        .map(
          (item, i) =>
            `<tr><td>${i + 1}</td><td>${item.rule}</td><td>${item.level}</td><td>${item.message || ""}</td><td>${item.bounds || ""}</td></tr>`
        )
        .join("")}
    </tbody>
  </table>
</body>
</html>
`;

fs.writeFileSync("./audit-report.html", html, "utf-8");

console.log("✅ Report generated: audit-report.html");
