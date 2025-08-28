export function nameRoleValueRule(node) {
  // Check if node is a UI component
  if (node.uiComponent) {
    const hasName = node.text || node.contentDescription;
    const hasRole = node.role;
    const hasValue = node.value !== undefined;

    if (!hasName || !hasRole || !hasValue) {
      return {
        rule: "name-role-value",
        description:
          "UI component does not have a programmatically determinable name, role, or value.",
        wcag: "WCAG 4.1.2: Name, Role, Value",
        level: "A",
        wcag_version: "2.0",
        android:
          "https://developer.android.com/guide/topics/ui/accessibility/apps#name-role-value",
        node: node.className,
        bounds: node.bounds
      };
    }
  }

  return null;
}
