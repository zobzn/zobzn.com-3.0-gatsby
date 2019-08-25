import loader_type_css from "./resource-loader-css";
import loader_type_js from "./resource-loader-js";

export default function load(options) {
  let i;
  let files_obj = {};
  let files_arr = [];
  let files_js = options.js || [];
  let files_css = options.css || [];
  let files_img = options.img || [];
  let on_success = options.success || null;
  let on_error = options.error || null;

  files_js = typeof files_js === "string" ? [files_js] : files_js;
  files_css = typeof files_css === "string" ? [files_css] : files_css;
  files_img = typeof files_img === "string" ? [files_img] : files_img;
  files_arr = files_arr
    .concat(files_js)
    .concat(files_css)
    .concat(files_img);

  function queuee_check(key, val) {
    let i;
    let state;
    let count_nulls = 0;
    let count_falses = 0;

    for (i = 0; i < files_arr.length; i++) {
      state = files_obj[files_arr[i]];
      if (state === false) {
        count_falses++;
      }
      if (state === null) {
        count_nulls++;
      }
    }

    if (!count_nulls) {
      if (count_falses) {
        on_error && on_error();
      } else {
        on_success && on_success();
      }
    }
  }

  function queuee_add(loader, file) {
    files_obj[file] = null;
    loader(
      file,
      function() {
        files_obj[file] = true;
        queuee_check(file, true);
      },
      function() {
        files_obj[file] = false;
        queuee_check(file, false);
      }
    );
  }

  for (i = 0; i < files_js.length; i++) {
    queuee_add(loader_type_js, files_js[i]);
  }

  for (i = 0; i < files_css.length; i++) {
    queuee_add(loader_type_css, files_css[i]);
  }

  if (!files_arr.length) {
    queuee_check();
  }
}
