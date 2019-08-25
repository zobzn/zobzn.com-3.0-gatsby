// import modules from 'ym';
import modules from "./modules";
import is_function from "lodash/isFunction";

/**
 * Example: (window.zbz = window.zbz || []).push(function () {});
 */
export default function(name) {
  const queue = window[name] || [];
  const push = function() {
    let i = 0;
    let len = arguments.length;

    for (; i < len; i++) {
      try {
        if (is_function(arguments[i])) {
          arguments[i](modules);
        }
      } catch (e) {}
    }
  };

  window[name] = {
    push: push
  };

  window[name].push.apply(window[name], queue);

  return window[name];
}
