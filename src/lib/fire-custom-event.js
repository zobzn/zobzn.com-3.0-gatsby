const fire_custom_event = function(element, event) {
  let evt;

  const params = {
    bubbles: false,
    cancelable: true,
    detail: undefined
  };

  try {
    evt = new CustomEvent(event, params);
  } catch (e) {
    // evt = document.createEvent('HTMLEvents');
    evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
  }

  if (evt) {
    element.dispatchEvent(evt);
  }

  return element;
};

export default fire_custom_event;
