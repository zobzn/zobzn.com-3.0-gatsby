import closest from "./closest";
import qsa from "./qsa";

function on(events, element, selector, callback) {
  if (typeof element === "string") {
    qsa(element).forEach(element => {
      on(events, element, selector, callback);
    });
  } else if (typeof selector === "string" && typeof callback === "function") {
    const listener = e => {
      const source = e.target || e.srcElement;
      const target = closest(source, selector);
      if (target) {
        callback.call(target, e);
      }
    };

    events
      .split(/\s+/)
      .forEach(event => element.addEventListener(event, listener));
  } else if (typeof selector === "function") {
    element.addEventListener(events, selector);
  }
}

export default on;
