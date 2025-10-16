# import os
# import subprocess
# import json
# import base64
# from datetime import datetime
# from PIL import Image, ImageDraw, ImageFont
# from lxml import etree

# class AdvancedMobileAccessibilityScanner:
#     def __init__(self):
#         self.screenshot_dir = "screenshots"
#         self.report_dir = "reports"
#         self.report_file_base = "report.json"
#         os.makedirs(self.screenshot_dir, exist_ok=True)
#         os.makedirs(self.report_dir, exist_ok=True)

#         self.rule_descriptions = {
#             "low-color-contrast": "Text or button elements must have sufficient color contrast to ensure readability for visually impaired users. The Web Content Accessibility Guidelines (WCAG) recommend a contrast ratio of at least 4.5:1 for normal text.",
#             "missing-label": "Clickable elements must have a visible text label or a content description to be accessible to screen readers. This helps users with visual impairments understand the purpose of interactive elements.",
#             "image-no-alt": "Images must include descriptive text (alt text) to convey meaning to users who rely on screen readers. Without proper descriptions, images are inaccessible to visually impaired users.",
#             "small-touch-target": "Interactive elements must be large enough to be easily tapped without errors. The recommended minimum touch target size is 48x48 pixels to accommodate users with motor impairments.",
#             "overlapping-elements": "Clickable elements must not overlap to avoid confusion and usability issues. Overlapping elements can cause accidental taps and make navigation difficult for users with motor or visual impairments."
#         }

#     # ---------------------------
#     # Run adb command
#     # ---------------------------
#     def adb_exec(self, cmd):
#         result = subprocess.run(["adb"] + cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
#         if result.returncode != 0:
#             print("ADB Error:", result.stderr)
#         return result.stdout.strip()

#     # ---------------------------
#     # Capture screenshot + XML
#     # ---------------------------
#     def capture_state(self):
#         ts = datetime.now().strftime("%Y%m%d_%H%M%S")
#         screenshot_file = os.path.join(self.screenshot_dir, f"screenshot_{ts}.png")
#         xml_file = os.path.join(self.report_dir, f"uidump_{ts}.xml")

#         # Capture screenshot
#         screenshot_result = subprocess.run(f"adb exec-out screencap -p > {screenshot_file}", 
#                                          shell=True, capture_output=True, text=True)
#         if screenshot_result.returncode != 0:
#             print(f"Screenshot capture failed: {screenshot_result.stderr}")
        
#         # Capture UI hierarchy
#         self.adb_exec(["shell", "uiautomator", "dump", "/sdcard/uidump.xml"])
#         self.adb_exec(["pull", "/sdcard/uidump.xml", xml_file])
        
#         print(f"📸 Captured screenshot: {screenshot_file}")
#         print(f"📄 Captured UI hierarchy: {xml_file}")
#         return screenshot_file, xml_file

#     # ---------------------------
#     # Parse bounds
#     # ---------------------------
#     def parse_bounds(self, bounds_str):
#         try:
#             parts = bounds_str.replace("][", ",").replace("[", "").replace("]", "").split(",")
#             x1, y1, x2, y2 = map(int, parts)
#             x1, x2 = min(x1, x2), max(x1, x2)
#             y1, y2 = min(y1, y2), max(y1, y2)
#             return (x1, y1, x2, y2)
#         except:
#             return None

#     # ---------------------------
#     # Generate XPath
#     # ---------------------------
#     def get_xpath(self, element):
#         try:
#             return element.getroottree().getpath(element)
#         except:
#             return ""

#     # ---------------------------
#     # Calculate color contrast
#     # ---------------------------
#     def calculate_color_contrast(self, screenshot_file, bounds):
#         if not screenshot_file or not os.path.exists(screenshot_file) or not bounds:
#             return None
#         try:
#             x1, y1, x2, y2 = bounds
#             if x1 >= x2 or y1 >= y2:
#                 return None
#             img = Image.open(screenshot_file).convert("RGB")
#             region = img.crop((x1, y1, x2, y2))
#             pixels = list(region.getdata())
#             if not pixels:
#                 return None
#             r_avg = sum(p[0] for p in pixels)/len(pixels)
#             g_avg = sum(p[1] for p in pixels)/len(pixels)
#             b_avg = sum(p[2] for p in pixels)/len(pixels)
#             luminance = (0.2126*r_avg + 0.7152*g_avg + 0.0722*b_avg)/255
#             contrast_ratio = (luminance + 0.05) / (1.0 + 0.05)
#             contrast_ratio = max(contrast_ratio, 1/contrast_ratio)
#             return round(contrast_ratio, 2)
#         except Exception as e:
#             print(f"Color contrast calculation error: {e}")
#             return None

#     # ---------------------------
#     # Analyze accessibility
#     # ---------------------------
#     def analyze_accessibility(self, xml_file, screenshot_file):
#         if not os.path.exists(xml_file):
#             print(f"❌ XML file not found: {xml_file}")
#             return []
            
#         parser = etree.XMLParser(recover=True)
#         try:
#             tree = etree.parse(xml_file, parser)
#             root = tree.getroot()
#         except Exception as e:
#             print(f"❌ Error parsing XML: {e}")
#             return []
            
#         issues = []
#         clickable_elements = []

#         for node in root.iter("node"):
#             bounds_str = node.attrib.get("bounds")
#             coords = self.parse_bounds(bounds_str) if bounds_str else None
#             text = node.attrib.get("text", "").strip()
#             content_desc = node.attrib.get("content-desc", "").strip()
#             clickable = node.attrib.get("clickable", "false") == "true"
#             node_class = node.attrib.get("class", "")
#             xpath = self.get_xpath(node) if coords else ""
#             contrast = None

#             # Low color contrast
#             if coords and ("TextView" in node_class or "Button" in node_class):
#                 contrast = self.calculate_color_contrast(screenshot_file, coords)
#                 if contrast and contrast < 4.5:
#                     issues.append({
#                         "rule": "low-color-contrast",
#                         "priority": "high",
#                         "message": f"{node_class} text has low color contrast ({contrast}:1)",
#                         "bounds": coords,
#                         "xpath": xpath,
#                         "contrast": contrast
#                     })

#             # Missing label
#             if clickable and not text and not content_desc:
#                 issues.append({
#                     "rule": "missing-label",
#                     "priority": "critical",
#                     "message": f"{node_class} clickable element has no label",
#                     "bounds": coords,
#                     "xpath": xpath
#                 })

#             # Image missing description
#             if "ImageView" in node_class and not content_desc:
#                 issues.append({
#                     "rule": "image-no-alt",
#                     "priority": "critical",
#                     "message": f"{node_class} Image missing description",
#                     "bounds": coords,
#                     "xpath": xpath
#                 })

#             # Small touch target
#             if coords and clickable:
#                 w, h = coords[2]-coords[0], coords[3]-coords[1]
#                 if w < 48 or h < 48:  # WCAG recommended minimum
#                     issues.append({
#                         "rule": "small-touch-target",
#                         "priority": "high",
#                         "message": f"{node_class} touch target too small {w}x{h}px (minimum 48x48px)",
#                         "bounds": coords,
#                         "xpath": xpath
#                     })

#             if clickable and coords:
#                 clickable_elements.append((coords, node_class, xpath))

#         # Overlapping clickable elements
#         for i in range(len(clickable_elements)):
#             for j in range(i+1, len(clickable_elements)):
#                 rect1, class1, xpath1 = clickable_elements[i]
#                 rect2, class2, xpath2 = clickable_elements[j]
#                 if rect1 and rect2:
#                     # Check if rectangles overlap
#                     overlap_x = not (rect1[2] < rect2[0] or rect2[2] < rect1[0])
#                     overlap_y = not (rect1[3] < rect2[1] or rect2[3] < rect1[1])
#                     if overlap_x and overlap_y:
#                         issues.append({
#                             "rule": "overlapping-elements",
#                             "priority": "medium",
#                             "message": f"{class1} overlaps {class2}",
#                             "bounds": rect1,
#                             "xpath": xpath1
#                         })

#         # Deduplicate issues
#         unique = []
#         seen = set()
#         for i in issues:
#             key = (tuple(i.get("bounds", ())), i["rule"])
#             if key not in seen:
#                 unique.append(i)
#                 seen.add(key)

#         print(f"🔍 {len(unique)} unique accessibility issues detected")
#         return unique

#     # ---------------------------
#     # Mark screenshot
#     # ---------------------------
#     def mark_screenshot(self, screenshot_file, issues):
#         if not screenshot_file or not os.path.exists(screenshot_file):
#             print(f"❌ Screenshot file not found: {screenshot_file}")
#             return None
            
#         try:
#             img = Image.open(screenshot_file).convert("RGBA")
#             draw = ImageDraw.Draw(img, "RGBA")
            
#             # Try to load a font, fall back to default if not available
#             try:
#                 font = ImageFont.truetype("arial.ttf", 20)
#             except:
#                 font = ImageFont.load_default()
            
#             color_map = {
#                 "critical": (231, 76, 60, 180),    # Red
#                 "high": (243, 156, 18, 180),       # Orange
#                 "medium": (46, 204, 113, 180),     # Green
#                 "low": (128, 128, 128, 180)        # Gray
#             }
            
#             for i, issue in enumerate(issues):
#                 b = issue.get("bounds")
#                 if not b:
#                     continue
                    
#                 x1, y1, x2, y2 = b
#                 color = color_map.get(issue.get("priority","low"))
                
#                 # Draw rectangle around element
#                 draw.rectangle([x1, y1, x2, y2], outline=color, width=4)
                
#                 # Draw issue number
#                 text = str(i+1)
#                 text_bbox = draw.textbbox((0, 0), text, font=font)
#                 text_width = text_bbox[2] - text_bbox[0]
#                 text_height = text_bbox[3] - text_bbox[1]
                
#                 # Draw background for text
#                 text_bg = [x1, y1, x1 + text_width + 8, y1 + text_height + 8]
#                 draw.rectangle(text_bg, fill=(255, 255, 255, 200))
                
#                 # Draw text
#                 draw.text((x1+4, y1+4), text, fill=(0, 0, 0, 255), font=font)
                
#                 # Save individual element screenshot
#                 try:
#                     element_img = Image.open(screenshot_file).convert("RGB")
#                     element_cropped = element_img.crop((max(0, x1-10), max(0, y1-10), 
#                                                        min(element_img.width, x2+10), 
#                                                        min(element_img.height, y2+10)))
#                     el_file = screenshot_file.replace(".png", f"_el{i+1}.png")
#                     element_cropped.save(el_file)
#                     issue["element_screenshot"] = el_file
#                 except Exception as e:
#                     print(f"⚠️ Could not save element screenshot: {e}")
                    
#             defected_file = screenshot_file.replace(".png","_defected.png")
#             img.save(defected_file)
#             print(f"📝 Marked screenshot saved: {defected_file}")
#             return defected_file
            
#         except Exception as e:
#             print(f"❌ Error marking screenshot: {e}")
#             return None

#     # ---------------------------
#     # Generate HTML + JSON report
#     # ---------------------------
#     def generate_report(self, issues, screenshot_file):
#         json_file = os.path.join(self.report_dir, self.report_file_base)
#         html_file = json_file.replace(".json",".html")

#         # Calculate summary statistics
#         summary = {"critical":0,"high":0,"medium":0,"low":0}
#         for i in issues:
#             p = i.get("priority")
#             if p in summary: summary[p] += 1

#         total_issues = len(issues)
#         weighted_sum = summary["critical"]*3 + summary["high"]*2 + summary["medium"]*1 + summary["low"]*0.5
#         audit_score = 100 if total_issues == 0 else max(0, 100 - int((weighted_sum/max(total_issues, 1))*20))

#         # Save JSON report
#         with open(json_file,"w") as f:
#             json.dump({
#                 "summary": summary,
#                 "audit_score": audit_score,
#                 "issues": issues,
#                 "timestamp": datetime.now().isoformat()
#             }, f, indent=2)

#         # Prepare screenshot for HTML
#         screenshot_b64 = ""
#         if screenshot_file and os.path.exists(screenshot_file):
#             with open(screenshot_file,"rb") as f:
#                 screenshot_b64 = base64.b64encode(f.read()).decode("utf-8")

#         # Generate HTML report
#         html = ["<!DOCTYPE html><html lang='en'><head>"]
#         html.append("<meta charset='UTF-8'>")
#         html.append("<meta name='viewport' content='width=device-width, initial-scale=1.0'>")
#         html.append("<title>Mobile Accessibility Audit Report</title>")
#         html.append("<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'>")
#         html.append("<style>")
#         html.append("""
#             :root {
#                 --critical: #dc3545;
#                 --high: #fd7e14;
#                 --medium: #ffc107;
#                 --low: #6c757d;
#                 --success: #28a745;
#                 --primary: #007bff;
#                 --light: #f8f9fa;
#                 --dark: #343a40;
#             }
            
#             * {
#                 margin: 0;
#                 padding: 0;
#                 box-sizing: border-box;
#             }
            
#             body {
#                 font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
#                 line-height: 1.6;
#                 color: #333;
#                 background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
#                 min-height: 100vh;
#             }
            
#             .container {
#                 max-width: 1200px;
#                 margin: 0 auto;
#                 padding: 20px;
#             }
            
#             header {
#                 background: white;
#                 border-radius: 12px;
#                 padding: 30px;
#                 margin-bottom: 30px;
#                 box-shadow: 0 4px 6px rgba(0,0,0,0.1);
#                 text-align: center;
#             }
            
#             .logo {
#                 font-size: 2.5rem;
#                 color: var(--primary);
#                 margin-bottom: 10px;
#             }
            
#             h1 {
#                 color: var(--dark);
#                 margin-bottom: 10px;
#                 font-size: 2.2rem;
#             }
            
#             .subtitle {
#                 color: #6c757d;
#                 font-size: 1.1rem;
#                 margin-bottom: 20px;
#             }
            
#             .score-card {
#                 background: white;
#                 border-radius: 12px;
#                 padding: 25px;
#                 text-align: center;
#                 margin-bottom: 30px;
#                 box-shadow: 0 4px 6px rgba(0,0,0,0.1);
#             }
            
#             .score-value {
#                 font-size: 4rem;
#                 font-weight: bold;
#                 margin: 20px 0;
#             }
            
#             .score-excellent { color: var(--success); }
#             .score-good { color: var(--medium); }
#             .score-poor { color: var(--high); }
#             .score-critical { color: var(--critical); }
            
#             .summary-cards {
#                 display: grid;
#                 grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
#                 gap: 20px;
#                 margin-bottom: 30px;
#             }
            
#             .summary-card {
#                 background: white;
#                 border-radius: 12px;
#                 padding: 20px;
#                 text-align: center;
#                 box-shadow: 0 4px 6px rgba(0,0,0,0.1);
#                 transition: transform 0.3s ease;
#             }
            
#             .summary-card:hover {
#                 transform: translateY(-5px);
#             }
            
#             .summary-card.critical { border-top: 6px solid var(--critical); }
#             .summary-card.high { border-top: 6px solid var(--high); }
#             .summary-card.medium { border-top: 6px solid var(--medium); }
#             .summary-card.low { border-top: 6px solid var(--low); }
            
#             .summary-count {
#                 font-size: 2.5rem;
#                 font-weight: bold;
#                 margin: 10px 0;
#             }
            
#             .summary-card.critical .summary-count { color: var(--critical); }
#             .summary-card.high .summary-count { color: var(--high); }
#             .summary-card.medium .summary-count { color: var(--medium); }
#             .summary-card.low .summary-count { color: var(--low); }
            
#             .screenshot-section {
#                 background: white;
#                 border-radius: 12px;
#                 padding: 25px;
#                 margin-bottom: 30px;
#                 box-shadow: 0 4px 6px rgba(0,0,0,0.1);
#             }
            
#             .screenshot-container {
#                 text-align: center;
#                 margin-top: 15px;
#             }
            
#             .screenshot-img {
#                 max-width: 100%;
#                 border-radius: 8px;
#                 box-shadow: 0 4px 8px rgba(0,0,0,0.2);
#                 border: 2px solid #dee2e6;
#             }
            
#             .issues-section {
#                 background: white;
#                 border-radius: 12px;
#                 padding: 25px;
#                 margin-bottom: 30px;
#                 box-shadow: 0 4px 6px rgba(0,0,0,0.1);
#             }
            
#             .section-title {
#                 color: var(--dark);
#                 margin-bottom: 20px;
#                 padding-bottom: 10px;
#                 border-bottom: 2px solid #e9ecef;
#                 display: flex;
#                 align-items: center;
#                 gap: 10px;
#             }
            
#             .section-title i {
#                 font-size: 1.5rem;
#             }
            
#             .issue-category {
#                 margin-bottom: 30px;
#             }
            
#             .issue {
#                 border-radius: 8px;
#                 margin: 15px 0;
#                 overflow: hidden;
#                 box-shadow: 0 2px 4px rgba(0,0,0,0.05);
#             }
            
#             .issue.critical { border-left: 6px solid var(--critical); }
#             .issue.high { border-left: 6px solid var(--high); }
#             .issue.medium { border-left: 6px solid var(--medium); }
#             .issue.low { border-left: 6px solid var(--low); }
            
#             .accordion-header {
#                 background: var(--light);
#                 padding: 20px;
#                 cursor: pointer;
#                 display: flex;
#                 justify-content: space-between;
#                 align-items: center;
#                 transition: background 0.3s ease;
#             }
            
#             .accordion-header:hover {
#                 background: #e9ecef;
#             }
            
#             .issue-title {
#                 display: flex;
#                 align-items: center;
#                 gap: 10px;
#                 font-weight: 600;
#             }
            
#             .issue-icon {
#                 font-size: 1.2rem;
#             }
            
#             .issue.critical .issue-icon { color: var(--critical); }
#             .issue.high .issue-icon { color: var(--high); }
#             .issue.medium .issue-icon { color: var(--medium); }
#             .issue.low .issue-icon { color: var(--low); }
            
#             .accordion-icon {
#                 transition: transform 0.3s ease;
#             }
            
#             .accordion.active .accordion-icon {
#                 transform: rotate(180deg);
#             }
            
#             .accordion-content {
#                 display: none;
#                 padding: 20px;
#                 background: white;
#                 border-top: 1px solid #e9ecef;
#             }
            
#             .accordion.active .accordion-content {
#                 display: block;
#             }
            
#             .issue-details {
#                 display: grid;
#                 grid-template-columns: 1fr 1fr;
#                 gap: 20px;
#                 margin-bottom: 15px;
#             }
            
#             @media (max-width: 768px) {
#                 .issue-details {
#                     grid-template-columns: 1fr;
#                 }
#             }
            
#             .detail-group {
#                 margin-bottom: 10px;
#             }
            
#             .detail-label {
#                 font-weight: 600;
#                 color: #6c757d;
#                 margin-bottom: 5px;
#             }
            
#             .element-screenshot {
#                 max-width: 200px;
#                 border-radius: 6px;
#                 border: 1px solid #dee2e6;
#                 margin: 10px 0;
#             }
            
#             .copy-btn {
#                 background: var(--primary);
#                 color: white;
#                 border: none;
#                 padding: 5px 10px;
#                 border-radius: 4px;
#                 cursor: pointer;
#                 font-size: 0.8rem;
#                 margin-left: 10px;
#                 transition: background 0.3s ease;
#             }
            
#             .copy-btn:hover {
#                 background: #0056b3;
#             }
            
#             .xpath-container {
#                 background: #f8f9fa;
#                 padding: 10px;
#                 border-radius: 4px;
#                 border: 1px solid #e9ecef;
#                 font-family: monospace;
#                 font-size: 0.9rem;
#                 word-break: break-all;
#                 margin-top: 5px;
#             }
            
#             footer {
#                 text-align: center;
#                 padding: 30px;
#                 color: #6c757d;
#                 font-size: 0.9rem;
#             }
            
#             .timestamp {
#                 margin-top: 10px;
#                 font-size: 0.8rem;
#                 color: #adb5bd;
#             }
#         """)
#         html.append("</style>")
#         html.append("</head><body>")
        
#         html.append("<div class='container'>")
        
#         # Header
#         html.append("<header>")
#         html.append("<div class='logo'><i class='fas fa-mobile-alt'></i></div>")
#         html.append("<h1>Mobile Accessibility Audit Report</h1>")
#         html.append("<p class='subtitle'>Comprehensive analysis of your mobile application's accessibility compliance</p>")
#         html.append("</header>")
        
#         # Score Card
#         score_class = "score-excellent" if audit_score >= 90 else "score-good" if audit_score >= 70 else "score-poor" if audit_score >= 50 else "score-critical"
#         html.append("<div class='score-card'>")
#         html.append("<h2><i class='fas fa-chart-line'></i> Overall Accessibility Score</h2>")
#         html.append(f"<div class='score-value {score_class}'>{audit_score}%</div>")
#         html.append(f"<p>Based on analysis of {total_issues} accessibility issues</p>")
#         html.append("</div>")
        
#         # Summary Cards
#         html.append("<div class='summary-cards'>")
#         for k, v in summary.items():
#             html.append(f"<div class='summary-card {k}'>")
#             html.append(f"<h3>{k.title()}</h3>")
#             html.append(f"<div class='summary-count'>{v}</div>")
#             html.append("<p>Issues</p>")
#             html.append("</div>")
#         html.append("</div>")
        
#         # Screenshot Section
#         if screenshot_b64:
#             html.append("<div class='screenshot-section'>")
#             html.append("<h2 class='section-title'><i class='fas fa-camera'></i> Screen Analysis</h2>")
#             html.append("<div class='screenshot-container'>")
#             html.append(f"<img class='screenshot-img' src='data:image/png;base64,{screenshot_b64}' alt='Analyzed screen with accessibility issues highlighted'/>")
#             html.append("</div>")
#             html.append("</div>")
        
#         # Issues Section
#         html.append("<div class='issues-section'>")
#         html.append("<h2 class='section-title'><i class='fas fa-search'></i> Detailed Issues</h2>")
        
#         for priority in ["critical", "high", "medium", "low"]:
#             pr_issues = [i for i in issues if i["priority"]==priority]
#             if not pr_issues:
#                 continue
                
#             priority_icons = {
#                 "critical": "fas fa-exclamation-circle",
#                 "high": "fas fa-exclamation-triangle", 
#                 "medium": "fas fa-info-circle",
#                 "low": "fas fa-flag"
#             }
            
#             html.append(f"<div class='issue-category'>")
#             html.append(f"<h3 style='color: var(--{priority}); margin: 20px 0 10px;'><i class='{priority_icons[priority]}'></i> {priority.title()} Priority Issues ({len(pr_issues)})</h3>")
            
#             for i, issue in enumerate(pr_issues):
#                 desc = self.rule_descriptions.get(issue["rule"], "No description available.")
#                 el_screenshot_b64 = ""
#                 if "element_screenshot" in issue and os.path.exists(issue["element_screenshot"]):
#                     with open(issue["element_screenshot"], "rb") as f:
#                         el_screenshot_b64 = base64.b64encode(f.read()).decode("utf-8")
                
#                 html.append(f"<div class='accordion issue {priority}'>")
#                 html.append(f"<div class='accordion-header'>")
#                 html.append(f"<div class='issue-title'><i class='issue-icon {priority_icons[priority]}'></i> {i+1}. {issue['rule'].replace('-', ' ').title()}</div>")
#                 html.append(f"<i class='accordion-icon fas fa-chevron-down'></i>")
#                 html.append("</div>")
#                 html.append("<div class='accordion-content'>")
                
#                 html.append("<div class='issue-details'>")
#                 html.append("<div>")
#                 html.append(f"<div class='detail-group'><div class='detail-label'>Description</div><div>{desc}</div></div>")
#                 html.append(f"<div class='detail-group'><div class='detail-label'>Message</div><div>{issue['message']}</div></div>")
#                 if "contrast" in issue:
#                     html.append(f"<div class='detail-group'><div class='detail-label'>Contrast Ratio</div><div>{issue['contrast']}:1 (Minimum recommended: 4.5:1)</div></div>")
#                 html.append("</div>")
                
#                 html.append("<div>")
#                 if issue.get("bounds"):
#                     b = issue["bounds"]
#                     html.append(f"<div class='detail-group'><div class='detail-label'>Element Position</div><div>X:{b[0]}, Y:{b[1]}, Width:{b[2]-b[0]}, Height:{b[3]-b[1]}</div></div>")
#                 if issue.get("xpath"):
#                     xpath_id = f"xpath_{priority}_{i}"
#                     html.append(f"<div class='detail-group'><div class='detail-label'>XPath</div>")
#                     html.append(f"<div class='xpath-container' id='{xpath_id}'>{issue['xpath']}</div>")
#                     html.append(f"<button class='copy-btn' onclick=\"copyText('{xpath_id}')\"><i class='fas fa-copy'></i> Copy XPath</button>")
#                     html.append("</div>")
#                 html.append("</div>")
#                 html.append("</div>")
                
#                 if el_screenshot_b64:
#                     html.append(f"<div class='detail-group'><div class='detail-label'>Element Screenshot</div>")
#                     html.append(f"<img class='element-screenshot' src='data:image/png;base64,{el_screenshot_b64}' alt='Element with accessibility issue'/>")
#                     html.append("</div>")
                    
#                 html.append("</div></div>")
        
#         html.append("</div>")  # Close issues-section
        
#         html.append("</div>")  # Close container
        
#         # Footer
#         html.append("<footer>")
#         html.append("<p>Design and developed by <b>ACOE</b> - Accessibility Center of Excellence</p>")
#         html.append(f"<div class='timestamp'>Report generated on {datetime.now().strftime('%Y-%m-%d at %H:%M:%S')}</div>")
#         html.append("</footer>")
        
#         # JavaScript
#         html.append("<script>")
#         html.append("""
#             function copyText(id){
#                 const el = document.getElementById(id);
#                 navigator.clipboard.writeText(el.innerText).then(() => {
#                     const btn = event.target;
#                     const originalText = btn.innerHTML;
#                     btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
#                     setTimeout(() => {
#                         btn.innerHTML = originalText;
#                     }, 2000);
#                 });
#             }
            
#             document.addEventListener('DOMContentLoaded', () => {
#                 document.querySelectorAll('.accordion-header').forEach(header => {
#                     header.addEventListener('click', () => {
#                         const accordion = header.parentElement;
#                         accordion.classList.toggle('active');
#                     });
#                 });
                
#                 // Auto-expand critical issues
#                 document.querySelectorAll('.issue.critical').forEach(accordion => {
#                     accordion.classList.add('active');
#                 });
#             });
#         """)
#         html.append("</script>")
        
#         html.append("</body></html>")

#         with open(html_file, "w", encoding="utf-8") as f:
#             f.write("\n".join(html))

#         print(f"✅ JSON report saved: {json_file}")
#         print(f"✅ HTML report saved: {html_file}")

#     # ---------------------------
#     # Run full scan
#     # ---------------------------
#     def run_scan(self):
#         print("🚀 Starting mobile accessibility scan...")
#         print("⏳ Capturing screen state...")
#         screenshot_file, xml_file = self.capture_state()
        
#         print("🔍 Analyzing accessibility issues...")
#         issues = self.analyze_accessibility(xml_file, screenshot_file)
        
#         print("📝 Marking issues on screenshot...")
#         defected = self.mark_screenshot(screenshot_file, issues)
        
#         print("📊 Generating reports...")
#         self.generate_report(issues, defected or screenshot_file)
        
#         print("🎯 Scan complete! Check the 'reports' folder for detailed results.")

# # ---------------------------
# if __name__ == "__main__":
#     scanner = AdvancedMobileAccessibilityScanner()
#     scanner.run_scan()

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
        self.report_dir = "reports"
        self.report_file_base = "report.json"
        os.makedirs(self.screenshot_dir, exist_ok=True)
        os.makedirs(self.report_dir, exist_ok=True)

        self.rule_descriptions = {
            "low-color-contrast": "Text or button elements must have sufficient color contrast to ensure readability for visually impaired users. The Web Content Accessibility Guidelines (WCAG) recommend a contrast ratio of at least 4.5:1 for normal text.",
            "missing-label": "Clickable elements must have a visible text label or a content description to be accessible to screen readers. This helps users with visual impairments understand the purpose of interactive elements.",
            "image-no-alt": "Images must include descriptive text (alt text) to convey meaning to users who rely on screen readers. Without proper descriptions, images are inaccessible to visually impaired users.",
            "small-touch-target": "Interactive elements must be large enough to be easily tapped without errors. The recommended minimum touch target size is 48x48 pixels to accommodate users with motor impairments.",
            "overlapping-elements": "Clickable elements must not overlap to avoid confusion and usability issues. Overlapping elements can cause accidental taps and make navigation difficult for users with motor or visual impairments."
        }

    # ---------------------------
    # Run adb command
    # ---------------------------
    def adb_exec(self, cmd):
        result = subprocess.run(["adb"] + cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if result.returncode != 0:
            print("ADB Error:", result.stderr)
        return result.stdout.strip()

    # ---------------------------
    # Capture screenshot + XML
    # ---------------------------
    def capture_state(self):
        ts = datetime.now().strftime("%Y%m%d_%H%M%S")
        screenshot_file = os.path.join(self.screenshot_dir, f"screenshot_{ts}.png")
        xml_file = os.path.join(self.report_dir, f"uidump_{ts}.xml")

        # Capture screenshot
        screenshot_result = subprocess.run(f"adb exec-out screencap -p > {screenshot_file}", 
                                         shell=True, capture_output=True, text=True)
        if screenshot_result.returncode != 0:
            print(f"Screenshot capture failed: {screenshot_result.stderr}")
        
        # Capture UI hierarchy
        self.adb_exec(["shell", "uiautomator", "dump", "/sdcard/uidump.xml"])
        self.adb_exec(["pull", "/sdcard/uidump.xml", xml_file])
        
        print(f"📸 Captured screenshot: {screenshot_file}")
        print(f"📄 Captured UI hierarchy: {xml_file}")
        return screenshot_file, xml_file

    # ---------------------------
    # Parse bounds
    # ---------------------------
    def parse_bounds(self, bounds_str):
        try:
            parts = bounds_str.replace("][", ",").replace("[", "").replace("]", "").split(",")
            x1, y1, x2, y2 = map(int, parts)
            x1, x2 = min(x1, x2), max(x1, x2)
            y1, y2 = min(y1, y2), max(y1, y2)
            return (x1, y1, x2, y2)
        except:
            return None

    # ---------------------------
    # Generate formatted XPath
    # ---------------------------
    def get_formatted_xpath(self, element):
        try:
            # Get the standard XPath
            standard_xpath = element.getroottree().getpath(element)
            
            # Create a formatted XPath in the format: //classname[@attributeName='value']
            class_name = element.get('class', '').split('.')[-1]  # Get only the class name without package
            text = element.get('text', '')
            content_desc = element.get('content-desc', '')
            resource_id = element.get('resource-id', '')
            
            # Prefer resource-id if available
            if resource_id:
                return f"//{class_name}[@resource-id='{resource_id}']"
            # Then content description
            elif content_desc:
                return f"//{class_name}[@content-desc='{content_desc}']"
            # Then text
            elif text:
                return f"//{class_name}[@text='{text}']"
            # Fallback to standard XPath
            else:
                return standard_xpath
                
        except Exception as e:
            print(f"XPath generation error: {e}")
            return ""

    # ---------------------------
    # Calculate color contrast
    # ---------------------------
    def calculate_color_contrast(self, screenshot_file, bounds):
        if not screenshot_file or not os.path.exists(screenshot_file) or not bounds:
            return None
        try:
            x1, y1, x2, y2 = bounds
            if x1 >= x2 or y1 >= y2:
                return None
            img = Image.open(screenshot_file).convert("RGB")
            region = img.crop((x1, y1, x2, y2))
            pixels = list(region.getdata())
            if not pixels:
                return None
            r_avg = sum(p[0] for p in pixels)/len(pixels)
            g_avg = sum(p[1] for p in pixels)/len(pixels)
            b_avg = sum(p[2] for p in pixels)/len(pixels)
            luminance = (0.2126*r_avg + 0.7152*g_avg + 0.0722*b_avg)/255
            contrast_ratio = (luminance + 0.05) / (1.0 + 0.05)
            contrast_ratio = max(contrast_ratio, 1/contrast_ratio)
            return round(contrast_ratio, 2)
        except Exception as e:
            print(f"Color contrast calculation error: {e}")
            return None

    # ---------------------------
    # Create element screenshot with defect highlighting
    # ---------------------------
    def create_element_screenshot(self, screenshot_file, bounds, issue_type, priority, index):
        if not screenshot_file or not os.path.exists(screenshot_file) or not bounds:
            return None
            
        try:
            img = Image.open(screenshot_file).convert("RGBA")
            draw = ImageDraw.Draw(img, "RGBA")
            
            x1, y1, x2, y2 = bounds
            
            # Color mapping for different priorities
            color_map = {
                "critical": (231, 76, 60, 180),    # Red
                "high": (243, 156, 18, 180),       # Orange
                "medium": (46, 204, 113, 180),     # Green
                "low": (128, 128, 128, 180)        # Gray
            }
            
            color = color_map.get(priority, (128, 128, 128, 180))
            
            # Draw rectangle around the defective element
            draw.rectangle([x1, y1, x2, y2], outline=color, width=6)
            
            # Draw issue number
            try:
                font = ImageFont.truetype("arial.ttf", 24)
            except:
                font = ImageFont.load_default()
                
            text = str(index)
            text_bbox = draw.textbbox((0, 0), text, font=font)
            text_width = text_bbox[2] - text_bbox[0]
            text_height = text_bbox[3] - text_bbox[1]
            
            # Draw background for text
            text_bg = [x1, y1, x1 + text_width + 12, y1 + text_height + 12]
            draw.rectangle(text_bg, fill=(255, 255, 255, 220))
            
            # Draw text
            draw.text((x1+6, y1+6), text, fill=(0, 0, 0, 255), font=font)
            
            # Crop to element area with some padding
            padding = 20
            crop_area = (
                max(0, x1 - padding),
                max(0, y1 - padding),
                min(img.width, x2 + padding),
                min(img.height, y2 + padding)
            )
            
            element_img = img.crop(crop_area)
            
            # Save the element screenshot
            el_file = screenshot_file.replace(".png", f"_element_{index}.png")
            element_img.save(el_file, "PNG")
            
            return el_file
            
        except Exception as e:
            print(f"❌ Error creating element screenshot: {e}")
            return None

    # ---------------------------
    # Analyze accessibility
    # ---------------------------
    def analyze_accessibility(self, xml_file, screenshot_file):
        if not os.path.exists(xml_file):
            print(f"❌ XML file not found: {xml_file}")
            return []
            
        parser = etree.XMLParser(recover=True)
        try:
            tree = etree.parse(xml_file, parser)
            root = tree.getroot()
        except Exception as e:
            print(f"❌ Error parsing XML: {e}")
            return []
            
        issues = []
        clickable_elements = []

        for node in root.iter("node"):
            bounds_str = node.attrib.get("bounds")
            coords = self.parse_bounds(bounds_str) if bounds_str else None
            text = node.attrib.get("text", "").strip()
            content_desc = node.attrib.get("content-desc", "").strip()
            clickable = node.attrib.get("clickable", "false") == "true"
            node_class = node.attrib.get("class", "")
            resource_id = node.attrib.get("resource-id", "")
            xpath = self.get_formatted_xpath(node) if coords else ""
            contrast = None

            # Low color contrast
            if coords and ("TextView" in node_class or "Button" in node_class):
                contrast = self.calculate_color_contrast(screenshot_file, coords)
                if contrast and contrast < 4.5:
                    issues.append({
                        "rule": "low-color-contrast",
                        "priority": "high",
                        "message": f"{node_class} text has low color contrast ({contrast}:1)",
                        "bounds": coords,
                        "xpath": xpath,
                        "resource_id": resource_id,
                        "contrast": contrast
                    })

            # Missing label
            if clickable and not text and not content_desc:
                issues.append({
                    "rule": "missing-label",
                    "priority": "critical",
                    "message": f"{node_class} clickable element has no label",
                    "bounds": coords,
                    "xpath": xpath,
                    "resource_id": resource_id
                })

            # Image missing description
            if "ImageView" in node_class and not content_desc:
                issues.append({
                    "rule": "image-no-alt",
                    "priority": "critical",
                    "message": f"{node_class} Image missing description",
                    "bounds": coords,
                    "xpath": xpath,
                    "resource_id": resource_id
                })

            # Small touch target
            if coords and clickable:
                w, h = coords[2]-coords[0], coords[3]-coords[1]
                if w < 48 or h < 48:  # WCAG recommended minimum
                    issues.append({
                        "rule": "small-touch-target",
                        "priority": "high",
                        "message": f"{node_class} touch target too small {w}x{h}px (minimum 48x48px)",
                        "bounds": coords,
                        "xpath": xpath,
                        "resource_id": resource_id
                    })

            if clickable and coords:
                clickable_elements.append((coords, node_class, xpath, resource_id))

        # Overlapping clickable elements
        for i in range(len(clickable_elements)):
            for j in range(i+1, len(clickable_elements)):
                rect1, class1, xpath1, resource_id1 = clickable_elements[i]
                rect2, class2, xpath2, resource_id2 = clickable_elements[j]
                if rect1 and rect2:
                    # Check if rectangles overlap
                    overlap_x = not (rect1[2] < rect2[0] or rect2[2] < rect1[0])
                    overlap_y = not (rect1[3] < rect2[1] or rect2[3] < rect1[1])
                    if overlap_x and overlap_y:
                        issues.append({
                            "rule": "overlapping-elements",
                            "priority": "medium",
                            "message": f"{class1} overlaps {class2}",
                            "bounds": rect1,
                            "xpath": xpath1,
                            "resource_id": resource_id1
                        })

        # Deduplicate issues
        unique = []
        seen = set()
        for i in issues:
            key = (tuple(i.get("bounds", ())), i["rule"])
            if key not in seen:
                unique.append(i)
                seen.add(key)

        print(f"🔍 {len(unique)} unique accessibility issues detected")
        return unique

    # ---------------------------
    # Mark screenshot and create element screenshots
    # ---------------------------
    def mark_screenshot(self, screenshot_file, issues):
        if not screenshot_file or not os.path.exists(screenshot_file):
            print(f"❌ Screenshot file not found: {screenshot_file}")
            return None
            
        try:
            img = Image.open(screenshot_file).convert("RGBA")
            draw = ImageDraw.Draw(img, "RGBA")
            
            # Try to load a font, fall back to default if not available
            try:
                font = ImageFont.truetype("arial.ttf", 20)
            except:
                font = ImageFont.load_default()
            
            color_map = {
                "critical": (231, 76, 60, 180),    # Red
                "high": (243, 156, 18, 180),       # Orange
                "medium": (46, 204, 113, 180),     # Green
                "low": (128, 128, 128, 180)        # Gray
            }
            
            for i, issue in enumerate(issues):
                b = issue.get("bounds")
                if not b:
                    continue
                    
                x1, y1, x2, y2 = b
                color = color_map.get(issue.get("priority","low"))
                
                # Draw rectangle around element
                draw.rectangle([x1, y1, x2, y2], outline=color, width=4)
                
                # Draw issue number
                text = str(i+1)
                text_bbox = draw.textbbox((0, 0), text, font=font)
                text_width = text_bbox[2] - text_bbox[0]
                text_height = text_bbox[3] - text_bbox[1]
                
                # Draw background for text
                text_bg = [x1, y1, x1 + text_width + 8, y1 + text_height + 8]
                draw.rectangle(text_bg, fill=(255, 255, 255, 200))
                
                # Draw text
                draw.text((x1+4, y1+4), text, fill=(0, 0, 0, 255), font=font)
                
                # Create individual element screenshot with defect highlighting
                element_file = self.create_element_screenshot(
                    screenshot_file, 
                    b, 
                    issue["rule"], 
                    issue["priority"], 
                    i+1
                )
                if element_file:
                    issue["element_screenshot"] = element_file
                    print(f"📸 Created element screenshot: {element_file}")
                    
            defected_file = screenshot_file.replace(".png","_defected.png")
            img.save(defected_file)
            print(f"📝 Marked screenshot saved: {defected_file}")
            return defected_file
            
        except Exception as e:
            print(f"❌ Error marking screenshot: {e}")
            return None

    # ---------------------------
    # Generate HTML + JSON report
    # ---------------------------
    def generate_report(self, issues, screenshot_file):
        json_file = os.path.join(self.report_dir, self.report_file_base)
        html_file = json_file.replace(".json",".html")

        # Calculate summary statistics
        summary = {"critical":0,"high":0,"medium":0,"low":0}
        for i in issues:
            p = i.get("priority")
            if p in summary: summary[p] += 1

        total_issues = len(issues)
        weighted_sum = summary["critical"]*3 + summary["high"]*2 + summary["medium"]*1 + summary["low"]*0.5
        audit_score = 100 if total_issues == 0 else max(0, 100 - int((weighted_sum/max(total_issues, 1))*20))

        # Save JSON report
        with open(json_file,"w") as f:
            json.dump({
                "summary": summary,
                "audit_score": audit_score,
                "issues": issues,
                "timestamp": datetime.now().isoformat()
            }, f, indent=2)

        # Prepare screenshot for HTML
        screenshot_b64 = ""
        if screenshot_file and os.path.exists(screenshot_file):
            with open(screenshot_file,"rb") as f:
                screenshot_b64 = base64.b64encode(f.read()).decode("utf-8")

        # Group issues by rule within each priority
        def group_issues_by_rule(issues_list):
            """Group issues by rule within the same priority"""
            grouped = {}
            for issue in issues_list:
                rule = issue["rule"]
                if rule not in grouped:
                    grouped[rule] = {
                        'rule': rule,
                        'priority': issue['priority'],
                        'description': self.rule_descriptions.get(rule, "No description available."),
                        'instances': []
                    }
                grouped[rule]['instances'].append(issue)
            return grouped

        # Generate HTML report
        html = ["<!DOCTYPE html><html lang='en'><head>"]
        html.append("<meta charset='UTF-8'>")
        html.append("<meta name='viewport' content='width=device-width, initial-scale=1.0'>")
        html.append("<title>Mobile Accessibility Audit Report</title>")
        html.append("<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'>")
        html.append("<style>")
        html.append("""
            :root {
                --critical: #dc3545;
                --high: #fd7e14;
                --medium: #ffc107;
                --low: #6c757d;
                --success: #28a745;
                --primary: #007bff;
                --light: #f8f9fa;
                --dark: #343a40;
            }
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                min-height: 100vh;
            }
            
            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
            }
            
            header {
                background: white;
                border-radius: 12px;
                padding: 30px;
                margin-bottom: 30px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                text-align: center;
            }
            
            .logo {
                font-size: 2.5rem;
                color: var(--primary);
                margin-bottom: 10px;
            }
            
            h1 {
                color: var(--dark);
                margin-bottom: 10px;
                font-size: 2.2rem;
            }
            
            .subtitle {
                color: #6c757d;
                font-size: 1.1rem;
                margin-bottom: 20px;
            }
            
            .score-card {
                background: white;
                border-radius: 12px;
                padding: 25px;
                text-align: center;
                margin-bottom: 30px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            
            .score-value {
                font-size: 4rem;
                font-weight: bold;
                margin: 20px 0;
            }
            
            .score-excellent { color: var(--success); }
            .score-good { color: var(--medium); }
            .score-poor { color: var(--high); }
            .score-critical { color: var(--critical); }
            
            .summary-cards {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .summary-card {
                background: white;
                border-radius: 12px;
                padding: 20px;
                text-align: center;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                transition: transform 0.3s ease;
            }
            
            .summary-card:hover {
                transform: translateY(-5px);
            }
            
            .summary-card.critical { border-top: 6px solid var(--critical); }
            .summary-card.high { border-top: 6px solid var(--high); }
            .summary-card.medium { border-top: 6px solid var(--medium); }
            .summary-card.low { border-top: 6px solid var(--low); }
            
            .summary-count {
                font-size: 2.5rem;
                font-weight: bold;
                margin: 10px 0;
            }
            
            .summary-card.critical .summary-count { color: var(--critical); }
            .summary-card.high .summary-count { color: var(--high); }
            .summary-card.medium .summary-count { color: var(--medium); }
            .summary-card.low .summary-count { color: var(--low); }
            
            .screenshot-section {
                background: white;
                border-radius: 12px;
                padding: 25px;
                margin-bottom: 30px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            
            .screenshot-container {
                text-align: center;
                margin-top: 15px;
                position: relative;
            }
            
            .screenshot-img {
                max-width: 100%;
                max-height: 600px;
                object-fit: contain;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                border: 2px solid #dee2e6;
            }
            
            .image-size {
                position: absolute;
                bottom: 10px;
                right: 10px;
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.8rem;
            }
            
            .issues-section {
                background: white;
                border-radius: 12px;
                padding: 25px;
                margin-bottom: 30px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            
            .section-title {
                color: var(--dark);
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 2px solid #e9ecef;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .section-title i {
                font-size: 1.5rem;
            }
            
            .priority-section {
                margin-bottom: 30px;
            }
            
            .priority-title {
                color: var(--dark);
                margin: 25px 0 15px 0;
                padding-bottom: 8px;
                border-bottom: 2px solid #e9ecef;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .issue {
                border-radius: 8px;
                margin: 15px 0;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            }
            
            .issue.critical { border-left: 6px solid var(--critical); }
            .issue.high { border-left: 6px solid var(--high); }
            .issue.medium { border-left: 6px solid var(--medium); }
            .issue.low { border-left: 6px solid var(--low); }
            
            .accordion-header {
                background: var(--light);
                padding: 20px;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: background 0.3s ease;
            }
            
            .accordion-header:hover {
                background: #e9ecef;
            }
            
            .issue-title {
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: 600;
            }
            
            .issue-icon {
                font-size: 1.2rem;
            }
            
            .issue.critical .issue-icon { color: var(--critical); }
            .issue.high .issue-icon { color: var(--high); }
            .issue.medium .issue-icon { color: var(--medium); }
            .issue.low .issue-icon { color: var(--low); }
            
            .accordion-icon {
                transition: transform 0.3s ease;
            }
            
            .accordion.active .accordion-icon {
                transform: rotate(180deg);
            }
            
            .accordion-content {
                display: none;
                padding: 20px;
                background: white;
                border-top: 1px solid #e9ecef;
            }
            
            .accordion.active .accordion-content {
                display: block;
            }
            
            .issue-details {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin-bottom: 15px;
            }
            
            @media (max-width: 768px) {
                .issue-details {
                    grid-template-columns: 1fr;
                }
            }
            
            .detail-group {
                margin-bottom: 10px;
            }
            
            .detail-label {
                font-weight: 600;
                color: #6c757d;
                margin-bottom: 5px;
            }
            
            .element-screenshot {
                max-width: 300px;
                max-height: 300px;
                object-fit: contain;
                border-radius: 6px;
                border: 2px solid #dee2e6;
                margin: 10px 0;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .copy-btn {
                background: var(--primary);
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.8rem;
                margin-left: 10px;
                transition: background 0.3s ease;
            }
            
            .copy-btn:hover {
                background: #0056b3;
            }
            
            .xpath-container {
                background: #f8f9fa;
                padding: 10px;
                border-radius: 4px;
                border: 1px solid #e9ecef;
                font-family: monospace;
                font-size: 0.9rem;
                word-break: break-all;
                margin-top: 5px;
            }
            
            .issue-count {
                background: #6c757d;
                color: white;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 0.8rem;
                margin-left: 10px;
            }
            
            .all-instances {
                margin-top: 15px;
            }
            
            .instance-item {
                margin: 15px 0;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 6px;
                border-left: 3px solid #dee2e6;
            }
            
            .instance-screenshot {
                max-width: 250px;
                max-height: 250px;
                object-fit: contain;
                border-radius: 4px;
                border: 1px solid #dee2e6;
                margin: 8px 0;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            }
            
            footer {
                text-align: center;
                padding: 30px;
                color: #6c757d;
                font-size: 0.9rem;
            }
            
            .timestamp {
                margin-top: 10px;
                font-size: 0.8rem;
                color: #adb5bd;
            }
        """)
        html.append("</style>")
        html.append("</head><body>")
        
        html.append("<div class='container'>")
        
        # Header
        html.append("<header>")
        html.append("<div class='logo'><i class='fas fa-mobile-alt'></i></div>")
        html.append("<h1>Mobile Accessibility Audit Report</h1>")
        html.append("<p class='subtitle'>Comprehensive analysis of your mobile application's accessibility compliance</p>")
        html.append("</header>")
        
        # Score Card
        score_class = "score-excellent" if audit_score >= 90 else "score-good" if audit_score >= 70 else "score-poor" if audit_score >= 50 else "score-critical"
        html.append("<div class='score-card'>")
        html.append("<h2><i class='fas fa-chart-line'></i> Overall Accessibility Score</h2>")
        html.append(f"<div class='score-value {score_class}'>{audit_score}%</div>")
        html.append(f"<p>Based on analysis of {total_issues} accessibility issues</p>")
        html.append("</div>")
        
        # Summary Cards
        html.append("<div class='summary-cards'>")
        for k, v in summary.items():
            html.append(f"<div class='summary-card {k}'>")
            html.append(f"<h3>{k.title()}</h3>")
            html.append(f"<div class='summary-count'>{v}</div>")
            html.append("<p>Issues</p>")
            html.append("</div>")
        html.append("</div>")
        
        # Screenshot Section
        if screenshot_b64:
            html.append("<div class='screenshot-section'>")
            html.append("<h2 class='section-title'><i class='fas fa-camera'></i> Screen Analysis</h2>")
            html.append("<div class='screenshot-container'>")
            html.append(f"<img class='screenshot-img' src='data:image/png;base64,{screenshot_b64}' alt='Analyzed screen with accessibility issues highlighted' onload=\"this.nextElementSibling.textContent=this.naturalWidth+' × '+this.naturalHeight\"/>")
            html.append("<div class='image-size'>Loading dimensions...</div>")
            html.append("</div>")
            html.append("</div>")
        
        # Issues Section
        html.append("<div class='issues-section'>")
        html.append("<h2 class='section-title'><i class='fas fa-search'></i> Detailed Issues</h2>")
        
        # Priority icons mapping
        priority_icons = {
            "critical": "fas fa-exclamation-circle",
            "high": "fas fa-exclamation-triangle", 
            "medium": "fas fa-info-circle",
            "low": "fas fa-flag"
        }
        
        # Display issues by priority level
        for priority in ["critical", "high", "medium", "low"]:
            pr_issues = [i for i in issues if i["priority"] == priority]
            if not pr_issues:
                continue
                
            # Group issues by rule within this priority
            grouped_issues = group_issues_by_rule(pr_issues)
            
            html.append(f"<div class='priority-section'>")
            html.append(f"<h3 class='priority-title' style='color: var(--{priority});'>")
            html.append(f"<i class='{priority_icons[priority]}'></i>")
            html.append(f"{priority.title()} Priority Issues ({len(pr_issues)})")
            html.append("</h3>")
            
            # Display each rule group as a separate accordion
            rule_index = 0
            for rule, group in grouped_issues.items():
                rule_index += 1
                rule_name = rule.replace('-', ' ').title()
                
                html.append(f"<div class='accordion issue {priority}'>")
                html.append(f"<div class='accordion-header'>")
                html.append(f"<div class='issue-title'>")
                html.append(f"<i class='issue-icon {priority_icons[priority]}'></i>")
                html.append(f"{rule_index}. {rule_name}")
                html.append(f"<span class='issue-count'>{len(group['instances'])}</span>")
                html.append("</div>")
                html.append(f"<i class='accordion-icon fas fa-chevron-down'></i>")
                html.append("</div>")
                html.append("<div class='accordion-content'>")
                
                # Rule description
                html.append(f"<div class='detail-group'><div class='detail-label'>Description</div><div>{group['description']}</div></div>")
                
                # Display all instances for this rule
                html.append("<div class='all-instances'>")
                
                for i, instance in enumerate(group['instances']):
                    instance_num = i + 1
                    html.append(f"<div class='instance-item'>")
                    html.append(f"<div class='detail-group'><div class='detail-label'>Instance {instance_num}</div></div>")
                    
                    html.append("<div class='issue-details'>")
                    html.append("<div>")
                    html.append(f"<div class='detail-group'><div class='detail-label'>Message</div><div>{instance['message']}</div></div>")
                    if "contrast" in instance:
                        html.append(f"<div class='detail-group'><div class='detail-label'>Contrast Ratio</div><div>{instance['contrast']}:1 (Minimum recommended: 4.5:1)</div></div>")
                    html.append("</div>")
                    
                    html.append("<div>")
                    if instance.get("bounds"):
                        b = instance["bounds"]
                        html.append(f"<div class='detail-group'><div class='detail-label'>Element Position</div><div>X:{b[0]}, Y:{b[1]}, Width:{b[2]-b[0]}, Height:{b[3]-b[1]}</div></div>")
                    if instance.get("xpath"):
                        xpath_id = f"xpath_{priority}_{rule_index}_{instance_num}"
                        html.append(f"<div class='detail-group'><div class='detail-label'>XPath</div>")
                        html.append(f"<div class='xpath-container' id='{xpath_id}'>{instance['xpath']}</div>")
                        html.append(f"<button class='copy-btn' onclick=\"copyText('{xpath_id}')\"><i class='fas fa-copy'></i> Copy XPath</button>")
                        html.append("</div>")
                    html.append("</div>")
                    html.append("</div>")
                    
                    # Element screenshot
                    instance_el_screenshot_b64 = ""
                    if "element_screenshot" in instance and os.path.exists(instance["element_screenshot"]):
                        with open(instance["element_screenshot"], "rb") as f:
                            instance_el_screenshot_b64 = base64.b64encode(f.read()).decode("utf-8")
                    
                    if instance_el_screenshot_b64:
                        html.append(f"<div class='detail-group'><div class='detail-label'>Element Screenshot</div>")
                        html.append(f"<img class='instance-screenshot' src='data:image/png;base64,{instance_el_screenshot_b64}' alt='Element with accessibility issue - Instance {instance_num}'/>")
                        html.append("</div>")
                    
                    html.append("</div>")  # Close instance-item
                
                html.append("</div>")  # Close all-instances
                html.append("</div></div>")  # Close accordion-content and accordion
            
            html.append("</div>")  # Close priority-section
        
        html.append("</div>")  # Close issues-section
        
        html.append("</div>")  # Close container
        
        # Footer
        html.append("<footer>")
        html.append("<p>Design and developed by <b>ACOE</b> - Accessibility Center of Excellence</p>")
        html.append(f"<div class='timestamp'>Report generated on {datetime.now().strftime('%Y-%m-%d at %H:%M:%S')}</div>")
        html.append("</footer>")
        
        # JavaScript
        html.append("<script>")
        html.append("""
            function copyText(id){
                const el = document.getElementById(id);
                navigator.clipboard.writeText(el.innerText).then(() => {
                    const btn = event.target;
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                    }, 2000);
                });
            }
            
            document.addEventListener('DOMContentLoaded', () => {
                document.querySelectorAll('.accordion-header').forEach(header => {
                    header.addEventListener('click', () => {
                        const accordion = header.parentElement;
                        accordion.classList.toggle('active');
                    });
                });
                
                // Auto-expand critical issues
                document.querySelectorAll('.issue.critical').forEach(accordion => {
                    accordion.classList.add('active');
                });
            });
        """)
        html.append("</script>")
        
        html.append("</body></html>")

        with open(html_file, "w", encoding="utf-8") as f:
            f.write("\n".join(html))

        print(f"✅ JSON report saved: {json_file}")
        print(f"✅ HTML report saved: {html_file}")

    # ---------------------------
    # Run full scan
    # ---------------------------
    def run_scan(self):
        print("🚀 Starting mobile accessibility scan...")
        print("⏳ Capturing screen state...")
        screenshot_file, xml_file = self.capture_state()
        
        print("🔍 Analyzing accessibility issues...")
        issues = self.analyze_accessibility(xml_file, screenshot_file)
        
        print("📝 Marking issues on screenshot...")
        defected = self.mark_screenshot(screenshot_file, issues)
        
        print("📊 Generating reports...")
        self.generate_report(issues, defected or screenshot_file)
        
        print("🎯 Scan complete! Check the 'reports' folder for detailed results.")

# ---------------------------
if __name__ == "__main__":
    scanner = AdvancedMobileAccessibilityScanner()
    scanner.run_scan()