import React, { Component } from "react";
import MonacoEditor from "../../components/monaco-editor";
import Layout from "../../components/layout";
import SEO from "../../components/seo";

export default class ToolFormatJs extends Component {
  lineHeight = 20;
  minLines = 3;

  editor = null;

  state = {
    ready: false,
    code: '(()=>{console.log("Hello, world!")})();',
    height: this.minLines * this.lineHeight
  };

  componentDidMount() {
    this.resizeByContent();
  }

  editorDidMount = editor => {
    this.editor = editor;
    this.editor.focus();
    this.setState({ ready: true });
  };

  onChange = (newValue, e) => {
    this.setState({ code: newValue });
    this.resizeByContent();
  };

  onSubmit = () => {
    this.editor && this.editor.getAction("editor.action.formatDocument").run();
  };

  resizeByContent = () => {
    if (this.editor) {
      const lines = this.editor.getModel().getLineCount() || 1;
      const height = Math.max(this.minLines, lines) * this.lineHeight;
      this.setState({ height: height });
    }
  };

  render() {
    const { ready, height, code } = this.state;

    return (
      <Layout location={this.props.location}>
        <SEO title="Форматирование JS" />

        <h1>Форматирование JS</h1>

        {ready && (
          <p>
            <button
              type="button"
              className="zbz-button"
              onClick={this.onSubmit}
            >
              Форматировать
            </button>
          </p>
        )}
        <MonacoEditor
          language="javascript"
          editorDidMount={this.editorDidMount}
          onChange={this.onChange}
          height={height}
          value={code}
        />
      </Layout>
    );
  }
}
