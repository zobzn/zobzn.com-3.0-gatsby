import matches from "./matches";

// @see https://developer.mozilla.org/ru/docs/Web/API/Element/closest
export default function closest(element, selector) {
  let node = element;

  while (node) {
    if (matches(node, selector)) {
      return node;
    } else {
      node = node.parentElement;
    }
  }

  return null;
}
