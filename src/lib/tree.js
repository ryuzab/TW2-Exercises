// Helpers to inspect the UI tree (React elements) that a view function returns,
// so we can "click" on things without a browser.
export function walk(node, visit) {
  if (node == null || typeof node === "boolean" || typeof node === "string" || typeof node === "number") return;
  if (Array.isArray(node)) {
    node.forEach(function childCB(n) { walk(n, visit); });
    return;
  }
  visit(node);
  walk(node.props && node.props.children, visit);
}

export function findAll(root, predicate) {
  const out = [];
  walk(root, function visitCB(n) { if (predicate(n)) out.push(n); });
  return out;
}
