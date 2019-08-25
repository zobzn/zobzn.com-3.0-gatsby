import React, { Component } from "react";
import sqlFormatter from "sql-formatter";

import MonacoEditor from "../../components/monaco-editor";
import Layout from "../../components/layout";
import SEO from "../../components/seo";

const startText = [
  "SELECT a.auser_id AS a__auser_id",
  "FROM auser a",
  "INNER JOIN auser_data a2 ON a.auser_id = a2.auser_id",
  "INNER JOIN auser_group a3 ON a.auser_id = a3.target_auser_id",
  "INNER JOIN auser_group_type a4 ON a3.auser_group_type_id = a4.id",
  "WHERE (a.name != 'noreg' AND a.is_published = '1' AND a3.is_published = '1' AND a3.is_visible = '1' AND a.is_published = '1' AND a4.name = 'union' AND a3.source_auser_id = '1016860')",
  "ORDER BY a.dt_register DESC, authenticity DESC, rating DESC"
].join(" ");

export default class ToolFormatSql extends Component {
  lineHeight = 20;
  minLines = 3;

  editor = null;

  state = {
    ready: false,
    text: startText,
    height: this.minLines * this.lineHeight
  };

  componentDidMount() {
    this.resizeByContent();
  }

  editorDidMount = editor => {
    this.editor = editor;

    this.setState({ ready: true }, () => {
      this.editor && this.editor.focus();
    });
  };

  handleChange = (newValue, e) => {
    this.setState({ text: newValue }, () => {
      this.resizeByContent();
    });
  };

  handleFormat = () => {
    // /tools/do-format-sql?sql=...
    // /tools/do-compress-sql?sql=...
    this.setState({ text: sqlFormatter.format(this.state.text) }, () => {
      this.resizeByContent();
    });
  };

  resizeByContent = () => {
    if (this.editor) {
      const lines = this.editor.getModel().getLineCount() || 1;
      const height = Math.max(this.minLines, lines) * this.lineHeight;
      this.setState({ height: height });
    }
  };

  render() {
    const { location } = this.props;
    const { ready, height, text } = this.state;

    return (
      <Layout location={location}>
        <SEO title={`Форматирование SQL`} />
        <h1>Форматирование SQL</h1>

        {ready && (
          <p>
            <span className="zbz-button" onClick={this.handleFormat}>
              Форматировать
            </span>
          </p>
        )}

        <MonacoEditor
          language="sql"
          editorDidMount={this.editorDidMount}
          onChange={this.handleChange}
          height={height}
          value={text}
        />
      </Layout>
    );
  }
}
