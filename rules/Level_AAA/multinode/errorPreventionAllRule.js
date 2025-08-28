export function errorPreventionAllRule(nodes) {
  // Placeholder logic: check if all forms have review/confirmation mechanisms
  const formsWithoutReview = nodes.filter(node => node.type === "form" && !node.hasReviewMechanism);

  if (formsWithoutReview.length > 0) {
    return formsWithoutReview.map(node => ({
      rule: "error-prevention-all",
      description: "Form lacks review/confirmation mechanism before submission.",
      wcag: "WCAG 3.3.6: Error Prevention (All)",
      level: "AAA",
      wcag_version: "2.0",
      android: "https://developer.android.com/guide/topics/ui/accessibility/apps",
      node: node.className,
      bounds: node.bounds
    }));
  }

  return null;
}
