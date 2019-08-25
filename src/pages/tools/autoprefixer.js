import { graphql } from "gatsby";
import React, { Component } from "react";
import MonacoEditor from "../../components/monaco-editor";
import modules from "../../lib/modules";
import loadable from "@loadable/component";
import Layout from "../../components/layout";
import SEO from "../../components/seo";

class ToolAutoprefixer extends Component {
  lineHeight = 20;
  minLines = 3;

  autoprefixer = null;
  editor = null;

  state = {
    ready: false,
    code: ":fullscreen{.flex{display:flex}}",
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
    this.setState({ code: newValue }, () => this.resizeByContent());
  };

  handleFormat = () => {
    this.editor && this.editor.getAction("editor.action.formatDocument").run();
  };

  handleAutoprefix = () => {
    const { code } = this.state;
    const autoprefixer_config = {
      grid: true,
      overrideBrowserslist: [
        // Country statistics is not supported in client-side build of Browserslist
        // '> 10% in RU',
        // '> 10% in UA',
        "last 6 versions",
        "ff ESR",
        "opera >= 12",
        "safari >= 5",
        "ios >= 8",
        "ie >= 8"
      ]
    };

    if (this.props.autoprefixer) {
      this.props
        .autoprefixer(code, autoprefixer_config)
        .then(css => this.setState({ code: css }, () => this.resizeByContent()))
        .catch(error =>
          this.setState({ code: error.toString() }, () =>
            this.resizeByContent()
          )
        );
    }
  };

  resizeByContent = () => {
    if (this.editor) {
      const lines = this.editor.getModel().getLineCount() || 1;
      const height = Math.max(this.minLines, lines) * this.lineHeight;
      this.setState({ height: height });
    }
  };

  render() {
    const { autoprefixer } = this.props;
    const { ready, height, code } = this.state;

    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Автопрефиксер CSS" />
        <h1>Автопрефиксер CSS</h1>
        {ready && (
          <p>
            {
              <button
                type="button"
                className="zbz-button"
                onClick={this.handleFormat}
              >
                Форматировать
              </button>
            }
            {!autoprefixer ? null : (
              <button
                type="button"
                className="zbz-button"
                onClick={this.handleAutoprefix}
              >
                Автопрефиксер
              </button>
            )}
          </p>
        )}
        <MonacoEditor
          language="scss"
          editorDidMount={this.editorDidMount}
          onChange={this.onChange}
          height={height}
          value={code}
        />
      </Layout>
    );
  }
}

export default loadable(
  () =>
    new Promise((resolve, reject) => {
      modules.require(
        ["autoprefixer"],
        autoprefixer =>
          resolve(props => (
            <ToolAutoprefixer {...props} autoprefixer={autoprefixer} />
          )),
        () => reject()
      );
    }),
  {
    fallback: <div>Загрузка редактора…</div>
  }
);

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
