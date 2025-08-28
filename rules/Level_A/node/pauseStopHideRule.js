export function pauseStopHideRule(node) {
  // Check if the element has auto-updating, moving, or blinking content
  if (
    (node.autoUpdate || node.blinking || node.scrolling || node.moving) &&
    !node.controlsProvided
  ) {
    return {
      rule: "pause-stop-hide",
      description:
        "Element has moving, blinking, scrolling, or auto-updating content but does not provide controls to pause, stop, or hide it.",
      wcag: "WCAG 2.2.2: Pause, Stop, Hide",
      level: "A",
      wcag_version: "2.0",
      android:
        "https://developer.android.com/guide/topics/ui/accessibility/apps#animations",
      node: node.className,
      bounds: node.bounds,
      contentType: {
        autoUpdate: node.autoUpdate,
        blinking: node.blinking,
        scrolling: node.scrolling,
        moving: node.moving
      }
    };
  }

  return null;
}
