const el_head = document.getElementsByTagName("head")[0];
const js_loading = {};
const js_loaded = {};

const js_run_callbacks = function(path, type) {
  let cbs = js_loading[path];
  let cb;
  let i = 0;
  delete js_loading[path];
  while ((cb = cbs[i++])) {
    cb[type] && cb[type]();
  }
};

const js_on_success = function(path) {
  js_loaded[path] = true;
  js_run_callbacks(path, "success");
};

const js_on_error = function(path) {
  js_run_callbacks(path, "error");
};

const nullFunction = () => {};

function load(url, success, error) {
  if (js_loaded[url]) {
    success && success();
    return;
  }

  if (js_loading[url]) {
    js_loading[url].push({
      success: success || nullFunction,
      error: error || nullFunction
    });
    return;
  }

  js_loading[url] = [
    {
      success: success || nullFunction,
      error: error || nullFunction
    }
  ];

  const script = document.createElement("script");

  if (window.location.protocol === "file:" && !url.indexOf("//")) {
    script.src = "http:" + url;
  } else {
    script.src = url;
  }

  script.onload = function() {
    script.onload = script.onerror = null;
    js_on_success(url);
  };

  script.onerror = function() {
    script.onload = script.onerror = null;
    js_on_error(url);
  };

  el_head.insertBefore(script, el_head.lastChild);
}

export default load;
