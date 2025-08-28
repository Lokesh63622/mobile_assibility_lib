export function unusualWordsRule(nodes) {
  const issues = [];
  const dictionary = ["standard", "common", "expected"]; // example of common words

  for (const node of nodes) {
    if (!node.text) continue;
    const words = node.text.split(/\s+/);
    const unusualWords = words.filter(w => !dictionary.includes(w.toLowerCase()));
    
    if (unusualWords.length) {
      issues.push({
        rule: "unusual-words",
        description: "A mechanism is available for identifying specific definitions of words or phrases used in an unusual or restricted way.",
        wcag: "WCAG 3.1.3: Unusual Words",
        level: "AAA",
        wcag_version: "2.0",
        android: "https://developer.android.com/guide/topics/ui/accessibility/apps",
        node: node.className,
        words: unusualWords
      });
    }
  }

  return issues.length ? issues : null;
}
