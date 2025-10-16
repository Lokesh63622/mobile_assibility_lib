import os
import subprocess
import json
import base64
import re
from datetime import datetime
from PIL import Image, ImageDraw, ImageFont
from lxml import etree

class ComprehensiveMobileAccessibilityScanner:
    def __init__(self, rules_config=None):
        self.screenshot_dir = "screenshots"
        self.report_dir = "reports"
        self.report_file_base = "report.json"
        os.makedirs(self.screenshot_dir, exist_ok=True)
        os.makedirs(self.report_dir, exist_ok=True)

        # Load WCAG rules coverage
        self.wcag_coverage = self.load_wcag_coverage()
        
        # Enhanced rules configuration
        self.default_rules = {
            # Perceivable - Text Alternatives
            "text-alternatives": {
                "enabled": True,
                "priority": "critical",
                "description": "Provide text alternatives for any non-text content",
                "guideline": "1.1.1"
            },
            
            # Perceivable - Info and Relationships
            "info-relationships": {
                "enabled": True,
                "priority": "high",
                "description": "Information and relationships must be programmatically determinable",
                "guideline": "1.3.1"
            },
            
            # Perceivable - Use of Color
            "color-not-only": {
                "enabled": True,
                "priority": "high",
                "description": "Color should not be used as the only visual means of conveying information",
                "guideline": "1.4.1"
            },
            
            # Perceivable - Contrast
            "color-contrast": {
                "enabled": True,
                "priority": "high",
                "description": "Ensure sufficient contrast between text and background",
                "guideline": "1.4.3",
                "threshold": 4.5
            },
            
            # Perceivable - Images of Text
            "images-of-text": {
                "enabled": True,
                "priority": "medium",
                "description": "Use text instead of images of text when possible",
                "guideline": "1.4.5"
            },
            
            # Perceivable - Text Spacing
            "text-spacing": {
                "enabled": True,
                "priority": "medium",
                "description": "Ensure text spacing can be adjusted",
                "guideline": "1.4.12"
            },
            
            # Operable - Focus Order
            "focus-order": {
                "enabled": True,
                "priority": "high",
                "description": "Ensure logical focus order",
                "guideline": "2.4.3"
            },
            
            # Operable - Link Purpose
            "link-purpose": {
                "enabled": True,
                "priority": "high",
                "description": "Make link purpose clear from context",
                "guideline": "2.4.4"
            },
            
            # Operable - Focus Visible
            "focus-visible": {
                "enabled": True,
                "priority": "high",
                "description": "Ensure keyboard focus is visible",
                "guideline": "2.4.7"
            },
            
            # Operable - Pointer Gestures
            "pointer-gestures": {
                "enabled": True,
                "priority": "medium",
                "description": "Support alternative input methods for complex gestures",
                "guideline": "2.5.1"
            },
            
            # Operable - Label in Name
            "label-in-name": {
                "enabled": True,
                "priority": "high",
                "description": "Ensure visible labels match accessible names",
                "guideline": "2.5.3"
            },
            
            # Operable - Target Size
            "touch-target-size": {
                "enabled": True,
                "priority": "high",
                "description": "Ensure touch targets are of sufficient size",
                "guideline": "2.5.5",
                "min_size": 44
            },
            
            # Operable - Enhanced Target Size
            "enhanced-target-size": {
                "enabled": True,
                "priority": "medium",
                "description": "Provide larger touch targets for critical functions",
                "guideline": "2.5.8",
                "min_size": 48
            },
            
            # Understandable - Language
            "page-language": {
                "enabled": True,
                "priority": "high",
                "description": "Identify the primary language of the page",
                "guideline": "3.1.1"
            },
            
            # Understandable - Consistent Navigation
            "consistent-navigation": {
                "enabled": True,
                "priority": "medium",
                "description": "Maintain consistent navigation mechanisms",
                "guideline": "3.2.3"
            },
            
            # Understandable - Error Suggestion
            "error-suggestion": {
                "enabled": True,
                "priority": "medium",
                "description": "Suggest corrections when errors are detected",
                "guideline": "3.3.3"
            },
            
            # Robust - Name Role Value
            "name-role-value": {
                "enabled": True,
                "priority": "high",
                "description": "Expose name, role, and value for all UI components",
                "guideline": "4.1.2"
            },
            
            # Mobile Specific - Touch Target Size
            "mobile-touch-target": {
                "enabled": True,
                "priority": "high",
                "description": "Ensure touch targets are at least 44x44 pixels",
                "guideline": "M.1.1",
                "min_size": 44
            },
            
            # Mobile Specific - Platform Conventions
            "platform-conventions": {
                "enabled": True,
                "priority": "medium",
                "description": "Follow platform-specific accessibility conventions",
                "guideline": "M.1.3"
            },
            
            # Mobile Specific - Touchscreen Navigation
            "touchscreen-navigation": {
                "enabled": True,
                "priority": "high",
                "description": "Ensure touchscreen navigation is accessible",
                "guideline": "M.1.7"
            },
            
            # Mobile Specific - Focus Management
            "mobile-focus-management": {
                "enabled": True,
                "priority": "high",
                "description": "Manage focus appropriately on mobile devices",
                "guideline": "M.1.9"
            },
            
            # Mobile Specific - Contrast
            "mobile-contrast": {
                "enabled": True,
                "priority": "high",
                "description": "Ensure sufficient contrast for mobile viewing conditions",
                "guideline": "M.2.5",
                "threshold": 4.5
            },
            
            # Mobile Specific - Layout
            "mobile-layout": {
                "enabled": True,
                "priority": "medium",
                "description": "Create responsive layouts for mobile devices",
                "guideline": "M.2.7"
            },
            
            # Mobile Specific - Testing
            "mobile-testing": {
                "enabled": True,
                "priority": "low",
                "description": "Test accessibility on actual mobile devices",
                "guideline": "M.3.1"
            },
            
            # Additional common rules
            "missing-labels": {
                "enabled": True,
                "priority": "critical",
                "description": "Clickable elements must have visible text labels or content descriptions",
                "guideline": "1.3.1"
            },
            
            "image-descriptions": {
                "enabled": True,
                "priority": "critical",
                "description": "Images must include descriptive text for screen readers",
                "guideline": "1.1.1"
            },
            
            "overlapping-elements": {
                "enabled": True,
                "priority": "medium",
                "description": "Clickable elements must not overlap to avoid confusion",
                "guideline": "2.5.1"
            },
            
            "form-labels": {
                "enabled": True,
                "priority": "high",
                "description": "Form inputs must have associated labels",
                "guideline": "3.3.2"
            },
            
            "button-purpose": {
                "enabled": True,
                "priority": "high",
                "description": "Button purpose must be clear from its text or context",
                "guideline": "2.4.4"
            }
        }

        # Load custom rules if provided
        self.rules = self.load_rules_config(rules_config)
        
    def load_wcag_coverage(self):
        """Load the WCAG coverage data"""
        return {
            "report_title": "Mobile Accessibility WCAG Coverage Report",
            "generated_on": datetime.now().isoformat(),
            "summary": {
                "total_rules": 120,
                "covered_rules": 32,
                "pending_rules": 88
            },
            "rules": [
                {
                    "principle": "Perceivable",
                    "guideline": "1.1.1 Text Alternatives",
                    "description": "Provide text alternatives for any non-text content",
                    "status": "Covered"
                },
                {
                    "principle": "Perceivable",
                    "guideline": "1.3.1 Info and Relationships",
                    "description": "Information and relationships must be programmatically determinable",
                    "status": "Covered"
                },
                # ... include other rules as needed
            ]
        }
        
    def load_rules_config(self, rules_config):
        """Load rules configuration from JSON or use defaults"""
        if rules_config is None:
            return self.default_rules
            
        if isinstance(rules_config, str):
            try:
                with open(rules_config, 'r') as f:
                    custom_rules = json.load(f)
            except FileNotFoundError:
                print(f"❌ Rules config file not found: {rules_config}, using defaults")
                return self.default_rules
        else:
            custom_rules = rules_config
            
        merged_rules = self.default_rules.copy()
        for rule_id, rule_config in custom_rules.items():
            if rule_id in merged_rules:
                merged_rules[rule_id].update(rule_config)
            else:
                merged_rules[rule_id] = rule_config
                
        return merged_rules

    # ---------------------------
    # ADB and Capture Methods
    # ---------------------------
    def adb_exec(self, cmd):
        result = subprocess.run(["adb"] + cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if result.returncode != 0:
            print("ADB Error:", result.stderr)
        return result.stdout.strip()

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

    def parse_bounds(self, bounds_str):
        try:
            parts = bounds_str.replace("][", ",").replace("[", "").replace("]", "").split(",")
            x1, y1, x2, y2 = map(int, parts)
            x1, x2 = min(x1, x2), max(x1, x2)
            y1, y2 = min(y1, y2), max(y1, y2)
            return (x1, y1, x2, y2)
        except:
            return None

    def get_formatted_xpath(self, element):
        try:
            standard_xpath = element.getroottree().getpath(element)
            class_name = element.get('class', '').split('.')[-1]
            text = element.get('text', '')
            content_desc = element.get('content-desc', '')
            resource_id = element.get('resource-id', '')
            
            if resource_id:
                return f"//{class_name}[@resource-id='{resource_id}']"
            elif content_desc:
                return f"//{class_name}[@content-desc='{content_desc}']"
            elif text:
                return f"//{class_name}[@text='{text}']"
            else:
                return standard_xpath
        except Exception as e:
            print(f"XPath generation error: {e}")
            return ""

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
    # Enhanced Analysis Methods for WCAG Coverage
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
        all_elements = []
        clickable_elements = []
        focusable_elements = []
        form_elements = []

        # First pass: collect all elements and basic information
        for node in root.iter("node"):
            bounds_str = node.attrib.get("bounds")
            coords = self.parse_bounds(bounds_str) if bounds_str else None
            
            element_data = {
                "node": node,
                "bounds": coords,
                "text": node.attrib.get("text", "").strip(),
                "content_desc": node.attrib.get("content-desc", "").strip(),
                "clickable": node.attrib.get("clickable", "false") == "true",
                "focusable": node.attrib.get("focusable", "false") == "true",
                "long_clickable": node.attrib.get("long-clickable", "false") == "true",
                "checkable": node.attrib.get("checkable", "false") == "true",
                "checked": node.attrib.get("checked", "false") == "true",
                "class": node.attrib.get("class", ""),
                "resource_id": node.attrib.get("resource-id", ""),
                "package": node.attrib.get("package", ""),
                "xpath": self.get_formatted_xpath(node) if coords else ""
            }
            
            all_elements.append(element_data)
            
            if element_data["clickable"]:
                clickable_elements.append(element_data)
                
            if element_data["focusable"]:
                focusable_elements.append(element_data)
                
            if self.is_form_element(element_data):
                form_elements.append(element_data)

        # Run all enabled rule checks
        rule_checks = [
            ("text-alternatives", self.check_text_alternatives),
            ("info-relationships", self.check_info_relationships),
            ("color-not-only", self.check_color_not_only),
            ("color-contrast", self.check_color_contrast),
            ("images-of-text", self.check_images_of_text),
            ("text-spacing", self.check_text_spacing),
            ("focus-order", self.check_focus_order),
            ("link-purpose", self.check_link_purpose),
            ("focus-visible", self.check_focus_visible),
            ("pointer-gestures", self.check_pointer_gestures),
            ("label-in-name", self.check_label_in_name),
            ("touch-target-size", self.check_touch_target_size),
            ("enhanced-target-size", self.check_enhanced_target_size),
            ("page-language", self.check_page_language),
            ("consistent-navigation", self.check_consistent_navigation),
            ("error-suggestion", self.check_error_suggestion),
            ("name-role-value", self.check_name_role_value),
            ("mobile-touch-target", self.check_mobile_touch_target),
            ("platform-conventions", self.check_platform_conventions),
            ("touchscreen-navigation", self.check_touchscreen_navigation),
            ("mobile-focus-management", self.check_mobile_focus_management),
            ("mobile-contrast", self.check_mobile_contrast),
            ("mobile-layout", self.check_mobile_layout),
            ("missing-labels", self.check_missing_labels),
            ("image-descriptions", self.check_image_descriptions),
            ("overlapping-elements", self.check_overlapping_elements),
            ("form-labels", self.check_form_labels),
            ("button-purpose", self.check_button_purpose),
        ]
        
        for rule_id, check_method in rule_checks:
            if self.rules.get(rule_id, {}).get('enabled', True):
                rule_issues = check_method(all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file)
                if rule_issues:
                    issues.extend(rule_issues)

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

    def is_form_element(self, element_data):
        """Check if element is a form input element"""
        class_name = element_data["class"]
        return any(form_class in class_name for form_class in [
            "EditText", "Spinner", "CheckBox", "RadioButton", "Switch", "SeekBar"
        ])

    # ---------------------------
    # Individual Rule Check Methods
    # ---------------------------
    
    def check_text_alternatives(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """1.1.1 Text Alternatives - Provide text alternatives for any non-text content"""
        issues = []
        for element in all_elements:
            class_name = element["class"]
            if "ImageView" in class_name and not element["content_desc"] and not element["text"]:
                issues.append({
                    "rule": "text-alternatives",
                    "priority": self.rules["text-alternatives"].get("priority", "critical"),
                    "message": f"Image element missing text alternative (content description)",
                    "bounds": element["bounds"],
                    "xpath": element["xpath"],
                    "resource_id": element["resource_id"],
                    "guideline": "1.1.1"
                })
        return issues

    def check_info_relationships(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """1.3.1 Info and Relationships - Information and relationships must be programmatically determinable"""
        issues = []
        for element in all_elements:
            # Check if important elements have proper identifiers
            if element["clickable"] and not element["resource_id"] and not element["content_desc"]:
                issues.append({
                    "rule": "info-relationships",
                    "priority": self.rules["info-relationships"].get("priority", "high"),
                    "message": f"Interactive element missing programmatic identification",
                    "bounds": element["bounds"],
                    "xpath": element["xpath"],
                    "resource_id": element["resource_id"],
                    "guideline": "1.3.1"
                })
        return issues

    def check_color_not_only(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """1.4.1 Use of Color - Color should not be the only visual means of conveying information"""
        issues = []
        # This would require more sophisticated analysis of visual cues
        # For now, we can check for elements that might rely solely on color
        for element in all_elements:
            text = element["text"]
            if text and self.is_color_dependent_text(text):
                issues.append({
                    "rule": "color-not-only",
                    "priority": self.rules["color-not-only"].get("priority", "high"),
                    "message": f"Element may rely solely on color to convey information",
                    "bounds": element["bounds"],
                    "xpath": element["xpath"],
                    "resource_id": element["resource_id"],
                    "guideline": "1.4.1"
                })
        return issues

    def is_color_dependent_text(self, text):
        """Check if text seems to rely on color cues"""
        color_indicators = ["red", "green", "blue", "color", "colored", "highlighted", "coloured"]
        return any(indicator in text.lower() for indicator in color_indicators)

    def check_color_contrast(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """1.4.3 Contrast (Minimum) - Ensure sufficient contrast between text and background"""
        issues = []
        threshold = self.rules["color-contrast"].get("threshold", 4.5)
        
        for element in all_elements:
            if element["bounds"] and element["text"] and ("TextView" in element["class"] or "Button" in element["class"]):
                contrast = self.calculate_color_contrast(screenshot_file, element["bounds"])
                if contrast and contrast < threshold:
                    issues.append({
                        "rule": "color-contrast",
                        "priority": self.rules["color-contrast"].get("priority", "high"),
                        "message": f"Text has insufficient color contrast ({contrast}:1)",
                        "bounds": element["bounds"],
                        "xpath": element["xpath"],
                        "resource_id": element["resource_id"],
                        "contrast": contrast,
                        "guideline": "1.4.3"
                    })
        return issues

    def check_images_of_text(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """1.4.5 Images of Text - Use text instead of images of text when possible"""
        issues = []
        for element in all_elements:
            if "ImageView" in element["class"] and element["content_desc"]:
                # If an image has text as its description, it might be an image of text
                desc = element["content_desc"]
                if len(desc) > 20:  # Heuristic: long descriptions might be text content
                    issues.append({
                        "rule": "images-of-text",
                        "priority": self.rules["images-of-text"].get("priority", "medium"),
                        "message": f"Image appears to contain text that should be real text",
                        "bounds": element["bounds"],
                        "xpath": element["xpath"],
                        "resource_id": element["resource_id"],
                        "guideline": "1.4.5"
                    })
        return issues

    def check_text_spacing(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """1.4.12 Text Spacing - Ensure text spacing can be adjusted"""
        # This is difficult to test automatically, but we can check for potentially problematic layouts
        issues = []
        return issues

    def check_focus_order(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """2.4.3 Focus Order - Ensure logical focus order"""
        issues = []
        # Check focusable elements for logical spatial order
        focusable_with_bounds = [e for e in focusable_elements if e["bounds"]]
        focusable_with_bounds.sort(key=lambda e: (e["bounds"][1], e["bounds"][0]))  # Sort by Y then X
        
        for i in range(1, len(focusable_with_bounds)):
            prev = focusable_with_bounds[i-1]
            curr = focusable_with_bounds[i]
            
            # Check if focus order seems illogical (jumping around the screen)
            if self.has_illogical_focus_order(prev, curr):
                issues.append({
                    "rule": "focus-order",
                    "priority": self.rules["focus-order"].get("priority", "high"),
                    "message": f"Potential illogical focus order between elements",
                    "bounds": curr["bounds"],
                    "xpath": curr["xpath"],
                    "resource_id": curr["resource_id"],
                    "guideline": "2.4.3"
                })
        return issues

    def has_illogical_focus_order(self, prev_element, curr_element):
        """Check if focus order between two elements seems illogical"""
        prev_bounds = prev_element["bounds"]
        curr_bounds = curr_element["bounds"]
        
        # If current element is significantly above previous element, order might be illogical
        return curr_bounds[1] < prev_bounds[1] - 100  # More than 100 pixels above

    def check_link_purpose(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """2.4.4 Link Purpose - Make link purpose clear from context"""
        issues = []
        for element in clickable_elements:
            text = element["text"]
            if text and self.is_unclear_link_text(text):
                issues.append({
                    "rule": "link-purpose",
                    "priority": self.rules["link-purpose"].get("priority", "high"),
                    "message": f"Link purpose may be unclear: '{text}'",
                    "bounds": element["bounds"],
                    "xpath": element["xpath"],
                    "resource_id": element["resource_id"],
                    "guideline": "2.4.4"
                })
        return issues

    def is_unclear_link_text(self, text):
        """Check if link text is unclear"""
        unclear_texts = ["click here", "read more", "link", "here", "this", "more info"]
        return text.lower() in unclear_texts or len(text.strip()) < 3

    def check_focus_visible(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """2.4.7 Focus Visible - Ensure keyboard focus is visible"""
        # This is difficult to test automatically without interaction
        # We can check if focusable elements have visual indicators
        issues = []
        return issues

    def check_pointer_gestures(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """2.5.1 Pointer Gestures - Support alternative input methods for complex gestures"""
        issues = []
        # Check for elements that might require complex gestures
        for element in all_elements:
            if element["long_clickable"] and not element["clickable"]:
                issues.append({
                    "rule": "pointer-gestures",
                    "priority": self.rules["pointer-gestures"].get("priority", "medium"),
                    "message": f"Element requires long-press gesture without simple click alternative",
                    "bounds": element["bounds"],
                    "xpath": element["xpath"],
                    "resource_id": element["resource_id"],
                    "guideline": "2.5.1"
                })
        return issues

    def check_label_in_name(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """2.5.3 Label in Name - Ensure visible labels match accessible names"""
        issues = []
        for element in all_elements:
            visible_text = element["text"]
            accessible_name = element["content_desc"]
            
            if visible_text and accessible_name and visible_text != accessible_name:
                # Check if they are substantially different
                if not self.texts_are_similar(visible_text, accessible_name):
                    issues.append({
                        "rule": "label-in-name",
                        "priority": self.rules["label-in-name"].get("priority", "high"),
                        "message": f"Visible text '{visible_text}' doesn't match accessible name '{accessible_name}'",
                        "bounds": element["bounds"],
                        "xpath": element["xpath"],
                        "resource_id": element["resource_id"],
                        "guideline": "2.5.3"
                    })
        return issues

    def texts_are_similar(self, text1, text2):
        """Check if two texts are substantially similar"""
        t1 = text1.lower().strip()
        t2 = text2.lower().strip()
        return t1 in t2 or t2 in t1 or t1 == t2

    def check_touch_target_size(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """2.5.5 Target Size - Ensure touch targets are of sufficient size"""
        return self._check_target_size(all_elements, "touch-target-size", "2.5.5")

    def check_enhanced_target_size(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """2.5.8 Target Size (Enhanced) - Provide larger touch targets for critical functions"""
        return self._check_target_size(all_elements, "enhanced-target-size", "2.5.8")

    def _check_target_size(self, all_elements, rule_id, guideline):
        """Generic target size checker"""
        issues = []
        min_size = self.rules[rule_id].get("min_size", 44)
        
        for element in all_elements:
            if element["bounds"] and element["clickable"]:
                x1, y1, x2, y2 = element["bounds"]
                width = x2 - x1
                height = y2 - y1
                
                if width < min_size or height < min_size:
                    issues.append({
                        "rule": rule_id,
                        "priority": self.rules[rule_id].get("priority", "high"),
                        "message": f"Touch target too small {width}x{height}px (minimum {min_size}x{min_size}px)",
                        "bounds": element["bounds"],
                        "xpath": element["xpath"],
                        "resource_id": element["resource_id"],
                        "guideline": guideline
                    })
        return issues

    def check_page_language(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """3.1.1 Language of Page - Identify the primary language of the page"""
        # This would require detecting the language of text content
        issues = []
        return issues

    def check_consistent_navigation(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """3.2.3 Consistent Navigation - Maintain consistent navigation mechanisms"""
        # This requires multiple screenshots/pages to compare
        issues = []
        return issues

    def check_error_suggestion(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """3.3.3 Error Suggestion - Suggest corrections when errors are detected"""
        # This requires detecting error states and suggestions
        issues = []
        return issues

    def check_name_role_value(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """4.1.2 Name, Role, Value - Expose name, role, and value for all UI components"""
        issues = []
        for element in all_elements:
            if element["clickable"] or element["focusable"]:
                # Check if essential accessibility properties are present
                has_name = element["text"] or element["content_desc"]
                has_role = element["class"]  # Class gives some indication of role
                
                if not has_name:
                    issues.append({
                        "rule": "name-role-value",
                        "priority": self.rules["name-role-value"].get("priority", "high"),
                        "message": f"Interactive element missing accessible name",
                        "bounds": element["bounds"],
                        "xpath": element["xpath"],
                        "resource_id": element["resource_id"],
                        "guideline": "4.1.2"
                    })
        return issues

    # Mobile-specific checks
    def check_mobile_touch_target(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """M.1.1 Touch Target Size - Ensure touch targets are at least 44x44 pixels"""
        return self._check_target_size(all_elements, "mobile-touch-target", "M.1.1")

    def check_platform_conventions(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """M.1.3 Platform Conventions - Follow platform-specific accessibility conventions"""
        issues = []
        # Check for platform-specific patterns
        for element in all_elements:
            class_name = element["class"]
            # Example: Check for non-standard UI components
            if "Custom" in class_name and not element["resource_id"]:
                issues.append({
                    "rule": "platform-conventions",
                    "priority": self.rules["platform-conventions"].get("priority", "medium"),
                    "message": f"Custom UI component may not follow platform conventions",
                    "bounds": element["bounds"],
                    "xpath": element["xpath"],
                    "resource_id": element["resource_id"],
                    "guideline": "M.1.3"
                })
        return issues

    def check_touchscreen_navigation(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """M.1.7 Touchscreen Navigation - Ensure touchscreen navigation is accessible"""
        issues = []
        # Check for navigation elements that should be easily reachable
        for element in clickable_elements:
            if element["bounds"]:
                x1, y1, x2, y2 = element["bounds"]
                screen_center_y = 1000  # Approximate screen center (would need actual screen dimensions)
                
                # Check if important navigation is at extreme edges
                if y1 < 100 or y2 > 1900:  # Assuming 1080p screen
                    issues.append({
                        "rule": "touchscreen-navigation",
                        "priority": self.rules["touchscreen-navigation"].get("priority", "high"),
                        "message": f"Navigation element at screen edge may be hard to reach",
                        "bounds": element["bounds"],
                        "xpath": element["xpath"],
                        "resource_id": element["resource_id"],
                        "guideline": "M.1.7"
                    })
        return issues

    def check_mobile_focus_management(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """M.1.9 Mobile Focus Management - Manage focus appropriately on mobile devices"""
        issues = []
        return issues

    def check_mobile_contrast(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """M.2.5 Mobile Contrast - Ensure sufficient contrast for mobile viewing conditions"""
        # Use the same logic as regular contrast but with mobile context
        return self.check_color_contrast(all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file)

    def check_mobile_layout(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """M.2.7 Mobile Layout - Create responsive layouts for mobile devices"""
        issues = []
        # Check for layout issues that might affect mobile usability
        return issues

    # Additional common rule checks
    def check_missing_labels(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """Check for missing labels on interactive elements"""
        issues = []
        for element in clickable_elements:
            if not element["text"] and not element["content_desc"]:
                issues.append({
                    "rule": "missing-labels",
                    "priority": self.rules["missing-labels"].get("priority", "critical"),
                    "message": f"Clickable element has no visible label or content description",
                    "bounds": element["bounds"],
                    "xpath": element["xpath"],
                    "resource_id": element["resource_id"],
                    "guideline": "1.3.1"
                })
        return issues

    def check_image_descriptions(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """Check for images without descriptions"""
        issues = []
        for element in all_elements:
            if "ImageView" in element["class"] and not element["content_desc"]:
                issues.append({
                    "rule": "image-descriptions",
                    "priority": self.rules["image-descriptions"].get("priority", "critical"),
                    "message": f"Image missing content description",
                    "bounds": element["bounds"],
                    "xpath": element["xpath"],
                    "resource_id": element["resource_id"],
                    "guideline": "1.1.1"
                })
        return issues

    def check_overlapping_elements(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """Check for overlapping interactive elements"""
        issues = []
        for i in range(len(clickable_elements)):
            for j in range(i+1, len(clickable_elements)):
                elem1 = clickable_elements[i]
                elem2 = clickable_elements[j]
                
                if elem1["bounds"] and elem2["bounds"]:
                    if self.elements_overlap(elem1["bounds"], elem2["bounds"]):
                        issues.append({
                            "rule": "overlapping-elements",
                            "priority": self.rules["overlapping-elements"].get("priority", "medium"),
                            "message": f"Clickable elements overlap and may cause touch errors",
                            "bounds": elem1["bounds"],
                            "xpath": elem1["xpath"],
                            "resource_id": elem1["resource_id"],
                            "guideline": "2.5.1"
                        })
        return issues

    def elements_overlap(self, bounds1, bounds2):
        """Check if two elements overlap"""
        x1, y1, x2, y2 = bounds1
        x3, y3, x4, y4 = bounds2
        
        overlap_x = not (x2 < x3 or x4 < x1)
        overlap_y = not (y2 < y3 or y4 < y1)
        return overlap_x and overlap_y

    def check_form_labels(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """Check form elements have proper labels"""
        issues = []
        for element in form_elements:
            if not element["text"] and not element["content_desc"]:
                issues.append({
                    "rule": "form-labels",
                    "priority": self.rules["form-labels"].get("priority", "high"),
                    "message": f"Form element missing label",
                    "bounds": element["bounds"],
                    "xpath": element["xpath"],
                    "resource_id": element["resource_id"],
                    "guideline": "3.3.2"
                })
        return issues

    def check_button_purpose(self, all_elements, clickable_elements, focusable_elements, form_elements, screenshot_file):
        """Check button purposes are clear"""
        issues = []
        for element in clickable_elements:
            if "Button" in element["class"]:
                text = element["text"]
                if not text or self.is_unclear_button_text(text):
                    issues.append({
                        "rule": "button-purpose",
                        "priority": self.rules["button-purpose"].get("priority", "high"),
                        "message": f"Button purpose may be unclear: '{text}'",
                        "bounds": element["bounds"],
                        "xpath": element["xpath"],
                        "resource_id": element["resource_id"],
                        "guideline": "2.4.4"
                    })
        return issues

    def is_unclear_button_text(self, text):
        """Check if button text is unclear"""
        unclear_texts = ["submit", "ok", "cancel", "yes", "no", "click", "button"]
        return text.lower() in unclear_texts or len(text.strip()) == 0

    # ---------------------------
    # Screenshot and Report Methods
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

    def group_issues_by_rule(self, issues_list):
        """Group issues by rule within the same priority"""
        grouped = {}
        for issue in issues_list:
            rule = issue["rule"]
            if rule not in grouped:
                grouped[rule] = {
                    'rule': rule,
                    'priority': issue['priority'],
                    'description': self.rules.get(rule, {}).get('description', 'No description available.'),
                    'instances': []
                }
            grouped[rule]['instances'].append(issue)
        return grouped

    def generate_report(self, issues, screenshot_file):
        # Enhanced to include WCAG coverage information
        json_file = os.path.join(self.report_dir, self.report_file_base)
        html_file = json_file.replace(".json",".html")

        # Calculate coverage statistics based on found issues
        covered_guidelines = set()
        for issue in issues:
            if "guideline" in issue:
                covered_guidelines.add(issue["guideline"])
        
        # Update WCAG coverage data
        self.wcag_coverage["summary"]["covered_rules"] = len(covered_guidelines)
        self.wcag_coverage["summary"]["pending_rules"] = (
            self.wcag_coverage["summary"]["total_rules"] - len(covered_guidelines)
        )

        # Calculate audit score
        summary = {"critical":0,"high":0,"medium":0,"low":0}
        for i in issues:
            p = i.get("priority")
            if p in summary: summary[p] += 1

        total_issues = len(issues)
        weighted_sum = summary["critical"]*3 + summary["high"]*2 + summary["medium"]*1 + summary["low"]*0.5
        audit_score = 100 if total_issues == 0 else max(0, 100 - int((weighted_sum/max(total_issues, 1))*20))

        # Save enhanced JSON report
        report_data = {
            "summary": summary,
            "audit_score": audit_score,
            "issues": issues,
            "wcag_coverage": self.wcag_coverage,
            "timestamp": datetime.now().isoformat()
        }
        
        with open(json_file,"w") as f:
            json.dump(report_data, f, indent=2)

        # Prepare screenshot for HTML
        screenshot_b64 = ""
        if screenshot_file and os.path.exists(screenshot_file):
            with open(screenshot_file,"rb") as f:
                screenshot_b64 = base64.b64encode(f.read()).decode("utf-8")

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
            grouped_issues = self.group_issues_by_rule(pr_issues)
            
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

    def run_scan(self):
        print("🚀 Starting comprehensive mobile accessibility scan...")
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
    scanner = ComprehensiveMobileAccessibilityScanner()
    scanner.run_scan()