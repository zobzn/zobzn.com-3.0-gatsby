const p = Element.prototype;
const f =
  p.matches ||
  p.matchesSelector ||
  p.webkitMatchesSelector ||
  p.mozMatchesSelector ||
  p.msMatchesSelector ||
  p.oMatchesSelector ||
  function(s) {
    return (
      Array.prototype.indexOf.call(document.querySelectorAll(s), this) !== -1
    );
  };

export default function matches(el, selector) {
  return el instanceof Element ? f.call(el, selector) : false;
}
