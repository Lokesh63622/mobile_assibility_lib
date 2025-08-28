import fs from "fs";
import { runMobileAudit } from "./index.js";

const sampleXml = fs.readFileSync("./sample-ui.xml", "utf-8");

runMobileAudit(sampleXml).then((issues) => {
  console.log("Accessibility Issues Found:");
  console.log(JSON.stringify(issues, null, 2));
});
