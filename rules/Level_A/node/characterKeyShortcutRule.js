export function characterKeyShortcutRule(node) {
  // Skip non-shortcut elements
  if (!node.shortcut || !/^[\w\d\p{P}\p{S}]+$/u.test(node.shortcut)) {
    return null;
  }

  // Check if the shortcut can be turned off, remapped, or restricted to focus
  if (!node.shortcutRemappable && !node.shortcutFocusOnly) {
    return {
      rule: "character-key-shortcut",
      description:
        "Keyboard shortcut using only letter, punctuation, number, or symbol characters is not configurable or focus-restricted",
      wcag: "WCAG 2.1.4: Character Key Shortcuts",
      level: "A",
      wcag_version: "2.1",
      android: "https://developer.android.com/guide/topics/ui/accessibility/apps#KeyboardNavigation",
      node: node.className,
      bounds: node.bounds,
      shortcut: node.shortcut
    };
  }

  return null;
}
