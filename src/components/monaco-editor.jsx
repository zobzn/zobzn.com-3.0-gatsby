import React, { Component } from "react";
import modules from "../lib/modules";
import loadable from "@loadable/component";

import "./monaco-editor.scss";

const noop = () => undefined;
const processSize = size => (!/^\d+$/.test("" + size) ? size : `${size}px`);

const defaultOptions = {
  automaticLayout: true,
  selectOnLineNumbers: false,
  scrollBeyondLastLine: false,
  renderControlCharacters: true,
  renderLineHighlight: "none", // "none" | "gutter" | "line" | "all"
  renderWhitespace: "all", // "none" | "boundary" | "all"
  // renderIndentGuides: true,
  renderIndentGuides: false,
  roundedSelection: false,
  lineHeight: 20,
  // lineNumbers: 'on',
  lineNumbers: "off",
  // rulers: [80, 120],
  minimap: { enabled: false },
  contextmenu: false,
  folding: false,
  links: true
};

class MonacoEditor extends Component {
  static defaultProps = {
    monaco: null,
    prettier: null,
    width: "100%",
    height: "100%",
    value: "",
    readOnly: false,
    language: "javascript",
    theme: null,
    options: {},
    editorDidMount: noop,
    onChange: noop
  };

  __current_value = "";
  __prevent_trigger_change_event = false;
  element = null;
  editor = null;

  constructor(props) {
    super(props);

    this.element = undefined;
    this.__current_value = props.value;
  }

  handleResize = () => {
    if (this.editor) {
      this.editor.layout();
    }
  };

  componentDidMount() {
    const { monaco, language, theme, value, options } = this.props;
    const content = value || "";

    // Before initializing monaco editor
    const totalOptions = Object.assign({}, defaultOptions, options || {});

    this.editor = monaco.editor.create(this.element, {
      value: content,
      language: language,
      ...totalOptions
    });

    if (theme) {
      monaco.editor.setTheme(theme);
    }

    this.editor.onDidChangeModelContent(event => {
      const value = this.editor.getValue();

      // Always refer to the latest value
      this.__current_value = value;

      // Only invoking when user input changed
      if (!this.__prevent_trigger_change_event) {
        this.props.onChange(value, event);
      }
    });

    this.editor.getModel().onDidChangeContent(event => {});

    // window.addEventListener('resize', this.handleResize);

    this.props.editorDidMount(this.editor);
  }

  componentDidUpdate(oldProps, oldState) {
    if (this.props.value !== this.__current_value) {
      // Always refer to the latest value
      this.__current_value = this.props.value;

      // Consider the situation of rendering 1+ times before the editor mounted
      if (this.editor) {
        this.__prevent_trigger_change_event = true;
        this.editor.setValue(this.__current_value);
        // this.editor.pushUndoStop();
        // this.editor.executeEdits('', [{
        //   range: this.editor.getModel().getFullModelRange(),
        //   text: this.__current_value,
        // }], [new this.props.monaco.Range(1, 1, 1, 1)]);
        // this.editor.pushUndoStop();
        this.__prevent_trigger_change_event = false;
      }
    }

    if (oldProps.language !== this.props.language) {
      this.props.monaco.editor.setModelLanguage(
        this.editor.getModel(),
        this.props.language
      );
    }

    if (oldProps.theme !== this.props.theme) {
      this.props.monaco.editor.setTheme(this.props.theme);
    }

    if (
      this.props.width !== oldProps.width ||
      this.props.height !== oldProps.height
    ) {
      this.editor.layout();
    }

    const oldOptions = oldProps.options;
    const newOptions = Object.assign(
      {},
      defaultOptions,
      this.props.options || {}
    );

    if (oldOptions !== newOptions) {
      this.editor.updateOptions(newOptions);
    }
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.handleResize);

    if (typeof this.editor !== "undefined") {
      this.editor.dispose();
    }
  }

  assignRef = element => {
    this.element = element;
  };

  render() {
    const { width, height } = this.props;
    const fixedWidth = processSize(width);
    const fixedHeight = processSize(height);
    const style = {
      width: fixedWidth,
      height: fixedHeight
    };

    return (
      <div className="monaco-editor-borders">
        <div
          ref={this.assignRef}
          style={style}
          className="monaco-editor-container"
        />
      </div>
    );
  }
}

export default loadable(
  () =>
    new Promise((resolve, reject) => {
      modules.require(
        ["prettier", "monaco-editor"],
        (prettier, monaco) => {
          resolve(props => (
            <MonacoEditor {...props} prettier={prettier} monaco={monaco} />
          ));
        },
        () => reject()
      );
    }),
  {
    fallback: <div>Загрузка редактора…</div>
  }
);
