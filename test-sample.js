
import fs from "fs";
import { runMobileAudit } from "./index.js";

const sampleXml = fs.readFileSync("./sample-ui.xml", "utf-8");

runMobileAudit(sampleXml).then((issues) => {
  console.log("Accessibility Issues Found:");
  console.log(JSON.stringify(issues, null, 2));

  // Save result to JSON file
  fs.writeFileSync("./audit-result.json", JSON.stringify(issues, null, 2), "utf-8");
  console.log("✅ Results saved to audit-result.json");
});
