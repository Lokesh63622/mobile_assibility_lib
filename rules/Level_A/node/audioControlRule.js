export function audioControlRule(nodes) {

  const nodeArray = nodes ? (Array.isArray(nodes) ? nodes : [nodes]) : [];
  // nodes = list of <audio> or <video> elements
  const results = [];

  nodeArray.forEach((node) => {
    if (node.tagName === "AUDIO" || node.tagName === "VIDEO") {
      const autoPlay = node.attributes?.autoplay === true;
      const duration = node.duration || 0;
      const hasControls = node.attributes?.controls === true;
      const hasMute =
        node.attributes?.muted === true ||
        node.attributes?.volumeControl === true;

      if (autoPlay && duration > 3 && !hasControls && !hasMute) {
        results.push({
          rule: "audio-control",
          description:
            "Audio or video plays automatically for more than 3 seconds without controls to pause, stop, or mute.",
          wcag: "WCAG 1.4.2: Audio Control",
          level: "A",
          wcag_version: "2.0",
          node: node.className || node.id || node.tagName,
          bounds: node.bounds,
          attributes: node.attributes,
        });
      }
    }
  });

  return results.length > 0 ? results : null;
}
