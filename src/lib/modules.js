import modules from "ym";

const versions = {
  requirejs: "2.3.6",
  prettier: "1.18.2",
  prismjs: "1.17.1",
  monaco: "0.17.1",
  codemirror: "5.48.4"
};

modules.define("loader", [], provide => {
  provide(require("./resource-loader/resource-loader").default);
});

modules.define("requirejs", ["loader"], (provide, loader) => {
  const cdn_prefix = `https://cdnjs.cloudflare.com/ajax/libs/require.js/${versions.requirejs}`;

  loader({
    js: cdn_prefix + "/require.min.js",
    success: () => {
      const { requirejs } = window;

      requirejs.config({
        waitSeconds: 30
      });

      provide(requirejs);
    }
  });
});

modules.define("prettier", ["requirejs"], (provide, requirejs) => {
  requirejs(
    [
      `https://unpkg.com/prettier@${versions.prettier}/standalone.js`,
      `https://unpkg.com/prettier@${versions.prettier}/parser-postcss.js`,
      `https://unpkg.com/prettier@${versions.prettier}/parser-babylon.js`,
      `https://unpkg.com/prettier@${versions.prettier}/parser-markdown.js`
    ],
    (prettier, ...plugins) => {
      console.log(`prettier ${prettier.version}`);

      provide({
        js: str => {
          return prettier.format(str, { parser: "babylon", plugins });
        },
        scss: str => {
          return prettier.format(str, { parser: "scss", plugins });
        },
        markdown: str => {
          return prettier.format(str, { parser: "markdown", plugins });
        }
      });
    }
  );
});

modules.define("autoprefixer", [], async provide => {
  (await import(
    /* webpackChunkName: "es6-promise" */ "es6-promise"
  )).polyfill();

  const postcss = (await import(/* webpackChunkName: "postcss" */ "postcss"))
    .default;

  const autoprefixer = (await import(
    /* webpackChunkName: "autoprefixer" */ "autoprefixer"
  )).default;

  const { version: postcssVersion } = await import("postcss/package.json");
  const { version: autoprefixerVersion } = await import(
    "autoprefixer/package.json"
  );

  const default_config = {
    grid: true,
    overrideBrowserslist: [
      // Country statistics is not supported in client-side build of Browserslist
      // '> 10% in RU',
      // '> 10% in UA',
      "last 3 versions",
      "ie >= 11",
      "ff ESR"
    ]
  };

  provide(async (scss, config) => {
    const res = await postcss([autoprefixer(config || default_config)]).process(
      scss,
      { from: undefined }
    );

    return res.css;
  });

  // provide(config => postcss([autoprefixer(config || default_config)]));

  console.log(`postcss ${postcssVersion}`);
  console.log(`autoprefixer ${autoprefixerVersion}`);
});

modules.define("code-colorer", async provide => {
  let Prism = (await import(/* webpackChunkName: "prism" */ "./modules/prism"))
    .default;

  console.log(`prismjs ${versions.prismjs}`);

  provide((string, lang = "markup") => {
    if (lang === "") {
      return string;
    }
    if (!Prism.languages.hasOwnProperty(lang)) {
      console.warn(`attempt to highlight unavailable language '${lang}'`);
      lang = "markup";
    }

    return Prism.highlight(string, Prism.languages[lang]);
  });
});

modules.define(
  "codemirror",
  ["requirejs", "loader"],
  (provide, requirejs, loader) => {
    const base =
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/" +
      versions.codemirror;

    requirejs.config({
      paths: {
        "codemirror/lib/codemirror": `${base}/codemirror.min`,
        "codemirror/addon/scroll/simplescrollbars": `${base}/addon/scroll/simplescrollbars.min`,
        "codemirror/addon/selection/active-line": `${base}/addon/selection/active-line.min`,
        "codemirror/addon/display/placeholder": `${base}/addon/display/placeholder.min`,
        "codemirror/addon/display/fullscreen": `${base}/addon/display/fullscreen.min`,
        "codemirror/addon/fold/xml-fold": `${base}/addon/fold/xml-fold.min`,
        "codemirror/addon/edit/matchtags": `${base}/addon/edit/matchtags.min`,
        "codemirror/addon/edit/matchbrackets": `${base}/addon/edit/matchbrackets.min`,
        "codemirror/addon/edit/closebrackets": `${base}/addon/edit/closebrackets.min`,
        "codemirror/addon/edit/trailingspace": `${base}/addon/edit/trailingspace.min`,
        "codemirror/addon/edit/closetag": `${base}/addon/edit/closetag.min`,
        "codemirror/mode/meta": `${base}/mode/meta.min`,
        "codemirror/mode/javascript/javascript": `${base}/mode/javascript/javascript.min`,
        "codemirror/mode/htmlmixed/htmlmixed": `${base}/mode/htmlmixed/htmlmixed.min`,
        "codemirror/mode/markdown/markdown": `${base}/mode/markdown/markdown.min`,
        "codemirror/mode/jinja2/jinja2": `${base}/mode/jinja2/jinja2.min`,
        "codemirror/mode/sql/sql": `${base}/mode/sql/sql.min`,
        "codemirror/mode/xml/xml": `${base}/mode/xml/xml.min`,
        "codemirror/mode/css/css": `${base}/mode/css/css.min`
      }
    });

    loader({
      css: base + "/codemirror.min.css",
      success: () => {
        loader({
          css: [
            base + "/addon/display/fullscreen.css",
            base + "/addon/scroll/simplescrollbars.min.css"
          ]
        });
      }
    });

    requirejs(
      [
        "codemirror/lib/codemirror",
        "codemirror/addon/scroll/simplescrollbars",
        "codemirror/addon/selection/active-line",
        "codemirror/addon/display/placeholder",
        "codemirror/addon/display/fullscreen",
        "codemirror/addon/edit/matchtags",
        "codemirror/addon/edit/matchbrackets",
        "codemirror/addon/edit/closebrackets",
        "codemirror/addon/edit/trailingspace",
        "codemirror/addon/edit/closetag",
        "codemirror/mode/javascript/javascript",
        "codemirror/mode/htmlmixed/htmlmixed",
        "codemirror/mode/markdown/markdown",
        "codemirror/mode/jinja2/jinja2",
        "codemirror/mode/sql/sql",
        "codemirror/mode/xml/xml",
        "codemirror/mode/css/css"
      ],
      codemirror => {
        console.log(`codemirror ${codemirror.version}`);
        provide(codemirror);
      }
    );
  }
);

modules.define(
  "monaco-editor",
  ["requirejs", "prettier"],
  (provide, requirejs, prettier) => {
    const cdn_prefix = `https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/${versions.monaco}`;
    // const cdn_prefix = `https://unpkg.com/monaco-editor@${versions.monaco}`;

    requirejs.config({
      paths: {
        vs: cdn_prefix + `/min/vs`
      }
    });

    requirejs.config({
      "vs/nls": {
        availableLanguages: {
          "*": "ru"
        }
      }
    });

    // Before loading vs/editor/editor.main, define a global MonacoEnvironment that overwrites
    // the default worker url location (used when creating WebWorkers). The problem here is that
    // HTML5 does not allow cross-domain web workers, so we need to proxy the instantiation of
    // a web worker through a same-domain script
    window.MonacoEnvironment = {
      getWorkerUrl(workerId, label) {
        return `data:text/javascript;charset=utf-8,${encodeURIComponent(
          [
            `self.MonacoEnvironment = {baseUrl: '${cdn_prefix}/min/'};`,
            `importScripts('${cdn_prefix}/min/vs/base/worker/workerMain.js');`
          ].join("\n")
        )}`;
      }
    };

    requirejs(["vs/editor/editor.main"], () => {
      const { monaco } = window;

      console.log(`monaco ${versions.monaco}`);

      monaco.languages.registerDocumentFormattingEditProvider("javascript", {
        provideDocumentFormattingEdits(model, options, token) {
          return new Promise((resolve, reject) => {
            try {
              const value = model.getValue();
              const text = prettier.js(value);

              resolve([
                {
                  range: model.getFullModelRange(),
                  text
                }
              ]);
            } catch (e) {
              reject(e);
            }
          });
        }
      });

      monaco.languages.registerDocumentFormattingEditProvider("scss", {
        provideDocumentFormattingEdits(model, options, token) {
          return new Promise((resolve, reject) => {
            try {
              const value = model.getValue();
              const text = prettier.scss(value);

              resolve([
                {
                  range: model.getFullModelRange(),
                  text
                }
              ]);
            } catch (e) {
              reject(e);
            }
          });
        }
      });

      provide(monaco);
    });
  }
);

export default modules;
