import os
import subprocess
import json
import base64
from datetime import datetime
from PIL import Image, ImageDraw, ImageFont
from lxml import etree


class AdvancedMobileAccessibilityScanner:
    def __init__(self):
        self.screenshot_dir = "screenshots"
        self.report_dir = "Mobile Accessibilty Reports"
        self.report_file_base = "report.json"
        os.makedirs(self.screenshot_dir, exist_ok=True)
        os.makedirs(self.report_dir, exist_ok=True)

        # Rule descriptions and WCAG references
        self.rule_descriptions = {
            "low-color-contrast": "Text or button elements must have sufficient color contrast to ensure readability for visually impaired users.",
            "missing-label": "Clickable elements must have a visible text label or a content description to be accessible to screen readers.",
            "image-no-alt": "Images must include descriptive text (alt text) to convey meaning to users who rely on screen readers.",
            "small-touch-target": "Interactive elements must be large enough to be easily tapped without errors.",
            "overlapping-elements": "Clickable elements must not overlap to avoid confusion and usability issues."
        }

        self.wcag_refs = {
            "low-color-contrast": "WCAG 2.1 – 1.4.3 Contrast (Minimum)",
            "missing-label": "WCAG 2.1 – 2.4.4 Link Purpose (In Context)",
            "image-no-alt": "WCAG 2.1 – 1.1.1 Non-text Content",
            "small-touch-target": "WCAG 2.1 – 2.5.5 Target Size (Minimum)",
            "overlapping-elements": "WCAG 2.1 – 2.4.11 Focus Not Obscured"
        }

    # ---------------------------
    # Helper: ADB + screenshot
    # ---------------------------
    def adb_exec(self, cmd):
        result = subprocess.run(["adb"] + cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        return result.stdout.strip()

    def capture_state(self):
        ts = datetime.now().strftime("%Y%m%d_%H%M%S")
        screenshot_file = os.path.join(self.screenshot_dir, f"screenshot_{ts}.png")
        xml_file = os.path.join(self.report_dir, f"uidump_{ts}.xml")
        subprocess.run(f"adb exec-out screencap -p > {screenshot_file}", shell=True)
        self.adb_exec(["shell", "uiautomator", "dump", "/sdcard/uidump.xml"])
        self.adb_exec(["pull", "/sdcard/uidump.xml", xml_file])
        return screenshot_file, xml_file

    # ---------------------------
    # Helper: Parse bounds + XPath
    # ---------------------------
    def parse_bounds(self, b):
        try:
            parts = b.replace("][", ",").replace("[", "").replace("]", "").split(",")
            return tuple(map(int, parts))
        except:
            return None

    def get_formatted_xpath(self, el):
        cls = el.get("class", "").split(".")[-1]
        txt, desc, rid = el.get("text", ""), el.get("content-desc", ""), el.get("resource-id", "")
        if rid:
            return f"//{cls}[@resource-id='{rid}']"
        elif desc:
            return f"//{cls}[@content-desc='{desc}']"
        elif txt:
            return f"//{cls}[@text='{txt}']"
        return el.getroottree().getpath(el)

    # ---------------------------
    # Color contrast
    # ---------------------------
    def calculate_color_contrast(self, screenshot, bounds):
        if not os.path.exists(screenshot) or not bounds:
            return None
        try:
            img = Image.open(screenshot).convert("RGB").crop(bounds)
            px = list(img.getdata())
            r, g, b = [sum(p[i] for p in px) / len(px) for i in range(3)]
            lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
            c = (lum + 0.05) / (1.0 + 0.05)
            c = max(c, 1 / c)
            return round(c, 2)
        except:
            return None

    # ---------------------------
    # Analyze accessibility
    # ---------------------------
    def analyze_accessibility(self, xml_file, screenshot_file):
        if not os.path.exists(xml_file):
            return []

        parser = etree.XMLParser(recover=True)
        tree = etree.parse(xml_file, parser)
        root = tree.getroot()
        issues, clickables = [], []

        for node in root.iter("node"):
            b = node.attrib.get("bounds")
            coords = self.parse_bounds(b) if b else None
            text = node.attrib.get("text", "").strip()
            desc = node.attrib.get("content-desc", "").strip()
            clickable = node.attrib.get("clickable", "false") == "true"
            cls = node.attrib.get("class", "")
            rid = node.attrib.get("resource-id", "")
            xpath = self.get_formatted_xpath(node)

            if coords and ("TextView" in cls or "Button" in cls):
                c = self.calculate_color_contrast(screenshot_file, coords)
                if c and c < 4.5:
                    issues.append({
                        "rule": "low-color-contrast",
                        "priority": "high",
                        "message": f"{cls} text has low color contrast ({c}:1) ({self.wcag_refs['low-color-contrast']})",
                        "bounds": coords, "xpath": xpath, "resource_id": rid, "contrast": c
                    })

            if clickable and not text and not desc:
                issues.append({
                    "rule": "missing-label",
                    "priority": "critical",
                    "message": f"{cls} clickable element has no label ({self.wcag_refs['missing-label']})",
                    "bounds": coords, "xpath": xpath, "resource_id": rid
                })

            if "ImageView" in cls and not desc:
                issues.append({
                    "rule": "image-no-alt",
                    "priority": "critical",
                    "message": f"{cls} image missing description ({self.wcag_refs['image-no-alt']})",
                    "bounds": coords, "xpath": xpath, "resource_id": rid
                })

            if coords and clickable:
                w, h = coords[2] - coords[0], coords[3] - coords[1]
                if w < 48 or h < 48:
                    issues.append({
                        "rule": "small-touch-target",
                        "priority": "high",
                        "message": f"{cls} touch target too small {w}x{h}px ({self.wcag_refs['small-touch-target']})",
                        "bounds": coords, "xpath": xpath, "resource_id": rid
                    })

            if clickable and coords:
                clickables.append((coords, cls, xpath))

        # Overlapping clickable elements
        for i in range(len(clickables)):
            for j in range(i + 1, len(clickables)):
                r1, c1, x1 = clickables[i]
                r2, c2, x2 = clickables[j]
                if not (r1[2] < r2[0] or r2[2] < r1[0]) and not (r1[3] < r2[1] or r2[3] < r1[1]):
                    issues.append({
                        "rule": "overlapping-elements",
                        "priority": "medium",
                        "message": f"{c1} overlaps {c2} ({self.wcag_refs['overlapping-elements']})",
                        "bounds": r1, "xpath": x1
                    })

        # Deduplicate
        uniq, seen = [], set()
        for i in issues:
            k = (tuple(i.get("bounds", ())), i["rule"])
            if k not in seen:
                uniq.append(i)
                seen.add(k)
        print(f"🔍 {len(uniq)} issues found")
        return uniq

    # ---------------------------
    # Draw rectangles
    # ---------------------------
    def mark_screenshot(self, shot, issues):
        if not os.path.exists(shot):
            return None
        img = Image.open(shot).convert("RGBA")
        draw = ImageDraw.Draw(img, "RGBA")
        colors = {
            "critical": (231, 76, 60, 180),
            "high": (243, 156, 18, 180),
            "medium": (46, 204, 113, 180),
            "low": (128, 128, 128, 180)
        }
        for i, issue in enumerate(issues):
            b = issue.get("bounds")
            if not b:
                continue
            draw.rectangle(b, outline=colors.get(issue["priority"], (128, 128, 128, 180)), width=4)
        out = shot.replace(".png", "_defected.png")
        img.save(out)
        return out

    # ---------------------------
    # Generate HTML with nested accordion
    # ---------------------------
    def generate_report(self, issues, shot):
        html_file = os.path.join(self.report_dir, "report.html")

        # Group by rule
        grouped = {}
        for issue in issues:
            r = issue["rule"]
            grouped.setdefault(r, {"priority": issue["priority"], "desc": self.rule_descriptions[r], "instances": []})
            grouped[r]["instances"].append(issue)

        b64 = ""
        if shot and os.path.exists(shot):
            b64 = base64.b64encode(open(shot, "rb").read()).decode()

        html = [
            "<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Accessibility Report</title>",
            "<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'>",
            "<style>",
            "body{font-family:Arial;background:#f4f4f9;padding:20px;}",
            ".accordion{border-radius:8px;margin:10px 0;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.1)}",
            ".accordion-header{cursor:pointer;padding:15px;background:#f8f9fa;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #dee2e6}",
            ".accordion-content{display:none;padding:15px;}",
            ".accordion.active>.accordion-content{display:block;}",
            ".instance-item{margin-top:8px;border:1px solid #ddd;border-radius:6px;}",
            ".instance-item .accordion-header{background:#eef1f4;padding:10px;}",
            ".detail{margin-bottom:5px;}",
            ".detail b{color:#555;}",
            "</style></head><body>",
            "<h2>Mobile Accessibility Audit Report</h2>",
        ]

        if b64:
            html.append(f"<img src='data:image/png;base64,{b64}' style='max-width:100%;border:2px solid #ccc;border-radius:8px;margin-bottom:20px;'/>")

        for r, info in grouped.items():
            html.append(f"<div class='accordion'>")
            html.append(f"<div class='accordion-header'><b>{r.replace('-', ' ').title()}</b><i class='fas fa-chevron-down'></i></div>")
            html.append("<div class='accordion-content'>")
            html.append(f"<p>{info['desc']}</p>")
            html.append("<div>")
            for i, inst in enumerate(info["instances"], 1):
                html.append("<div class='instance-item accordion'>")
                html.append(f"<div class='accordion-header'><span><i class='fas fa-caret-right'></i> Instance {i}</span><i class='fas fa-chevron-down'></i></div>")
                html.append("<div class='accordion-content'>")
                html.append(f"<div class='detail'><b>Message:</b> {inst['message']}</div>")
                if inst.get('bounds'):
                    b = inst['bounds']
                    html.append(f"<div class='detail'><b>Bounds:</b> X:{b[0]}, Y:{b[1]}, W:{b[2]-b[0]}, H:{b[3]-b[1]}</div>")
                if inst.get('xpath'):
                    html.append(f"<div class='detail'><b>XPath:</b> {inst['xpath']}</div>")
                html.append("</div></div>")
            html.append("</div></div></div>")

        html.append("""
        <script>
        document.querySelectorAll('.accordion-header').forEach(h=>{
            h.addEventListener('click',()=>{
                h.parentElement.classList.toggle('active');
            });
        });
        </script></body></html>
        """)

        with open(html_file, "w", encoding="utf-8") as f:
            f.write("\n".join(html))

        print(f"✅ Report generated: {html_file}")

    def run_scan(self):
        s, x = self.capture_state()
        issues = self.analyze_accessibility(x, s)
        marked = self.mark_screenshot(s, issues)
        self.generate_report(issues, marked or s)
        print("✅ Scan complete.")


if __name__ == "__main__":
    AdvancedMobileAccessibilityScanner().run_scan()
