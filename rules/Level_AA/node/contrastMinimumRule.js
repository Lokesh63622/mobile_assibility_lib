export function contrastMinimumRule(node) {
  // Check if node has text or text image
  if (node.text || node.textImage) {
    // Assume node.foregroundColor and node.backgroundColor exist
    const fg = node.foregroundColor;
    const bg = node.backgroundColor;

    if (fg && bg) {
      const contrastRatio = calculateContrast(fg, bg);
      if (contrastRatio < 4.5) {
        return {
          rule: "contrast-minimum",
          description:
            "Text or images of text have insufficient contrast (less than 4.5:1).",
          wcag: "WCAG 1.4.3: Contrast (Minimum)",
          level: "AA",
          wcag_version: "2.0",
          android:
            "https://developer.android.com/guide/topics/ui/accessibility/apps#contrast",
          node: node.className,
          bounds: node.bounds,
          contrastRatio
        };
      }
    }
  }

  return null;
}

// Helper function to calculate contrast ratio
function calculateContrast(fg, bg) {
  // Convert colors from hex to luminance (simplified)
  const lum = (hex) => {
    const rgb = parseInt(hex.replace("#", ""), 16);
    const r = ((rgb >> 16) & 0xff) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = (rgb & 0xff) / 255;
    const adjust = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    return 0.2126 * adjust(r) + 0.7152 * adjust(g) + 0.0722 * adjust(b);
  };
  const L1 = lum(fg);
  const L2 = lum(bg);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}
