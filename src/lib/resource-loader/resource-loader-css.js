const css_loading = {};
const css_loaded = {};

const css_run_callbacks = function(url, type) {
  let cbs = css_loading[url];
  let cb;
  let i = 0;
  delete css_loading[url];
  while ((cb = cbs[i++])) {
    cb[type] && cb[type]();
  }
};

const css_on_success = function(url) {
  css_loaded[url] = true;
  css_run_callbacks(url, "success");
};

const css_on_error = function(url) {
  css_run_callbacks(url, "error");
};

export default function load(url, success, error) {
  if (window.location.protocol === "file:" && 0 === url.indexOf("//")) {
    url = "http:" + url;
  }

  if (css_loaded[url]) {
    success && success();
    return;
  }

  if (css_loading[url]) {
    css_loading[url].push({
      success: success,
      error: error
    });
    return;
  }

  css_loading[url] = [
    {
      success: success,
      error: error
    }
  ];

  let link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;

  // https://github.com/filamentgroup/loadCSS/blob/master/loadCSS.js#L20
  link.media = "only x";
  setTimeout(() => {
    link.media = "all";
  }, 0);

  link.onload = function() {
    link.onload = link.onerror = null;
    css_on_success(url);
  };

  link.onerror = function() {
    link.onload = link.onerror = null;
    css_on_error(url);
  };

  let any_script = document.querySelector("script");
  if (any_script && any_script.parentNode) {
    any_script.parentNode.insertBefore(link, any_script);
  }
}
