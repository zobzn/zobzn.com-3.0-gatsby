"use strict";

import on from "./on";
import fire_custom_event from "./fire-custom-event";

function element_get_style(element, styleProp) {
  const defaultView = (element.ownerDocument || document).defaultView;

  let value;
  // W3C standard way:
  if (defaultView && defaultView.getComputedStyle) {
    // sanitize property name to css notation
    // (hypen separated words eg. font-Size)
    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
    return defaultView
      .getComputedStyle(element, null)
      .getPropertyValue(styleProp);
  } else if (element.currentStyle) {
    // IE
    // sanitize property name to camelCase
    styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
      return letter.toUpperCase();
    });
    value = element.currentStyle[styleProp];
    // convert other units to pixels on IE
    if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
      return (function(value) {
        const oldLeft = element.style.left;
        const oldRsLeft = element.runtimeStyle.left;
        element.runtimeStyle.left = element.currentStyle.left;
        element.style.left = value || 0;
        value = element.style.pixelLeft + "px";
        element.style.left = oldLeft;
        element.runtimeStyle.left = oldRsLeft;
        return value;
      })(value);
    }
    return value;
  }
}

export default function() {
  const input_class = "zbz-input-clearable";
  const input_class_x = input_class + "--x";
  const input_class_x_over = input_class + "--x-over";
  const input_selector = "." + input_class;
  const input_selector_x = "." + input_class_x;
  const input_selector_x_over = "." + input_class_x_over;
  const event_main = `${input_class}-init`;
  const event_names = `${event_main} focus drop paste keydown keypress input change click`;
  const btn_width = 13;
  const btn_height = 13;
  const btn_margin = 7;

  on(event_names, document, input_selector, function(e) {
    this.value && this.classList.add(input_class_x);
    this.value || this.classList.remove(input_class_x);
  });

  on("mousemove", document, input_selector_x, function(e) {
    const input = this;
    const input_width = input.offsetWidth;
    const input_height = input.offsetHeight;
    const input_border_bottom = parseFloat(
      element_get_style(input, "borderBottomWidth")
    );
    const input_border_right = parseFloat(
      element_get_style(input, "borderRightWidth")
    );
    const input_border_left = parseFloat(
      element_get_style(input, "borderLeftWidth")
    );
    const input_border_top = parseFloat(
      element_get_style(input, "borderTopWidth")
    );
    const input_border_hr = input_border_left + input_border_right;
    const input_border_vr = input_border_top + input_border_bottom;
    const client_rect = this.getBoundingClientRect();
    const input_cursor_pos_x = e.clientX - client_rect.left;
    const input_cursor_pos_y = e.clientY - client_rect.top;

    let is_over_cross = true;
    is_over_cross =
      is_over_cross &&
      input_cursor_pos_x >=
        input_width - input_border_hr - btn_margin - btn_width;
    is_over_cross =
      is_over_cross &&
      input_cursor_pos_x <= input_width - input_border_hr - btn_margin;
    is_over_cross =
      is_over_cross &&
      input_cursor_pos_y >= (input_height - input_border_vr - btn_height) / 2;
    is_over_cross =
      is_over_cross &&
      input_cursor_pos_y <=
        (input_height - input_border_vr - btn_height) / 2 + btn_height;

    is_over_cross && input.classList.add(input_class_x_over);
    is_over_cross || input.classList.remove(input_class_x_over);
  });

  on("click", document, input_selector_x_over, e => {
    e.target.classList.remove(input_class_x, input_class_x_over);
    e.target.value = "";

    fire_custom_event(e.target, "input");
  });

  Array.from(document.querySelectorAll(input_selector)).forEach(element => {
    fire_custom_event(element, event_main);
  });
}
