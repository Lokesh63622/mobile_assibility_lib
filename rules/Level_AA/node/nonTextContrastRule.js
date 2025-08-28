export function nonTextContrastRule(node) {
  // Check if node is a UI component or graphical object
  if (node.uiComponent || node.graphic) {
    const fg = node.foregroundColor;
    const bg = node.backgroundColor;

    if (fg && bg) {
      const contrastRatio = calculateContrast(fg, bg);
      if (contrastRatio < 3) {
        return {
          rule: "non-text-contrast",
          description:
            "UI components and graphical objects have insufficient contrast (less than 3:1).",
          wcag: "WCAG 1.4.11: Non-text Contrast",
          level: "AA",
          wcag_version: "2.1",
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
  const lum = (hex) => {
    const rgb = parseInt(hex.replace("#", ""), 16);
    const r = ((rgb >> 16) & 0xff) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = (rgb & 0xff) / 255;
    const adjust = (c) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return 0.2126 * adjust(r) + 0.7152 * adjust(g) + 0.0722 * adjust(b);
  };
  const L1 = lum(fg);
  const L2 = lum(bg);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}
