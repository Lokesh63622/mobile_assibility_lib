import os
import subprocess
import json
import base64
import xml.etree.ElementTree as ET
from datetime import datetime
from PIL import Image, ImageDraw


class MobileAccessibilityScanner:
    def __init__(self):
        self.screenshot_dir = "screenshots"
        self.report_dir = "reports"
        os.makedirs(self.screenshot_dir, exist_ok=True)
        os.makedirs(self.report_dir, exist_ok=True)

    # ---------------------------
    # Utility: run adb command
    # ---------------------------
    def adb_exec(self, cmd):
        result = subprocess.run(["adb"] + cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if result.returncode != 0:
            print("ADB Error:", result.stderr)
        return result.stdout.strip()

    # ---------------------------
    # Capture screenshot + XML dump
    # ---------------------------
    def capture_state(self):
        ts = datetime.now().strftime("%Y%m%d_%H%M%S")
        screenshot_file = os.path.join(self.screenshot_dir, f"screenshot_{ts}.png")
        xml_file = os.path.join(self.report_dir, f"uidump_{ts}.xml")

        # Screenshot
        self.adb_exec(["exec-out", "screencap", "-p", ">", screenshot_file])

        # UI dump
        self.adb_exec(["shell", "uiautomator", "dump", "/sdcard/uidump.xml"])
        self.adb_exec(["pull", "/sdcard/uidump.xml", xml_file])

        return screenshot_file, xml_file

    # ---------------------------
    # Parse bounds from XML attribute
    # ---------------------------
    def parse_bounds(self, bounds_str):
        # format: [x1,y1][x2,y2]
        try:
            parts = bounds_str.replace("][", ",").replace("[", "").replace("]", "").split(",")
            return tuple(map(int, parts))  # (x1,y1,x2,y2)
        except:
            return None

    # ---------------------------
    # Accessibility checks
    # ---------------------------
    def analyze_accessibility(self, xml_file):
        tree = ET.parse(xml_file)
        root = tree.getroot()
        issues = []

        for node in root.iter("node"):
            bounds = node.attrib.get("bounds")
            coords = self.parse_bounds(bounds) if bounds else None
            text = node.attrib.get("text", "").strip()
            content_desc = node.attrib.get("content-desc", "").strip()
            clickable = node.attrib.get("clickable", "false") == "true"

            # Missing label
            if clickable and not text and not content_desc:
                issues.append({
                    "rule": "missing-label",
                    "message": "Clickable element has no label",
                    "bounds": coords
                })

            # Touch target size < 48dp (assume px for now)
            if coords:
                w = coords[2] - coords[0]
                h = coords[3] - coords[1]
                if w < 100 or h < 100:  # ~48dp at mdpi
                    issues.append({
                        "rule": "small-touch-target",
                        "message": f"Element too small: {w}x{h}px",
                        "bounds": coords
                    })

        return issues

    # ---------------------------
    # Mark screenshot with issues
    # ---------------------------
    def mark_screenshot(self, screenshot_file, issues):
        if not os.path.exists(screenshot_file):
            print("❌ Screenshot not found:", screenshot_file)
            return None

        img = Image.open(screenshot_file).convert("RGBA")
        draw = ImageDraw.Draw(img, "RGBA")

        for issue in issues:
            if not issue.get("bounds"):
                continue
            x1, y1, x2, y2 = issue["bounds"]
            color = (231, 76, 60, 180) if issue["rule"] == "missing-label" else (243, 156, 18, 180)
            draw.rectangle([x1, y1, x2, y2], outline=color, width=5)

        defected_file = screenshot_file.replace(".png", "_defected.png")
        img.save(defected_file)
        return defected_file

    # ---------------------------
    # Generate HTML report
    # ---------------------------
    def generate_report(self, issues, screenshot_file):
        ts = datetime.now().strftime("%Y%m%d_%H%M%S")
        json_file = os.path.join(self.report_dir, f"report_{ts}.json")
        html_file = os.path.join(self.report_dir, f"report_{ts}.html")

        # Save JSON
        with open(json_file, "w") as f:
            json.dump({"issues": issues}, f, indent=2)

        # Screenshot to base64
        screenshot_b64 = ""
        if screenshot_file and os.path.exists(screenshot_file):
            with open(screenshot_file, "rb") as imgf:
                screenshot_b64 = base64.b64encode(imgf.read()).decode("utf-8")

        # Build HTML
        html = ["<html><head><title>Accessibility Report</title></head><body>"]
        html.append("<h1>Accessibility Report</h1>")

        if screenshot_b64:
            html.append("<h2>Screenshot</h2>")
            html.append(f"<img src='data:image/png;base64,{screenshot_b64}' style='max-width:100%;'/>")

        html.append("<h2>Issues</h2><ul>")
        for issue in issues:
            html.append(f"<li><b>{issue['rule']}</b>: {issue['message']} {issue.get('bounds','')}</li>")
        html.append("</ul></body></html>")

        with open(html_file, "w", encoding="utf-8") as f:
            f.write("\n".join(html))

        print("✅ Reports generated:", json_file, html_file)

    # ---------------------------
    # Run full scan
    # ---------------------------
    def run_scan(self):
        screenshot_file, xml_file = self.capture_state()
        issues = self.analyze_accessibility(xml_file)
        defected = self.mark_screenshot(screenshot_file, issues)
        self.generate_report(issues, defected or screenshot_file)


if __name__ == "__main__":
    scanner = MobileAccessibilityScanner()
    scanner.run_scan()
