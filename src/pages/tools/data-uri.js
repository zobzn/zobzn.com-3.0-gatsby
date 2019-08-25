import React from "react";
import TextareaAutosize from "react-textarea-autosize";

import Layout from "../../components/layout";
import SEO from "../../components/seo";

function chooseFile(callback) {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "*/yaml");
  input.addEventListener("change", () => {
    callback(input.files[0]);
  });
  Object.assign(input.style, {
    position: "absolute",
    clip: "rect(0, 0, 0, 0)"
  });
  document.body.appendChild(input);
  input.click();
  document.body.removeChild(input);
}

export default class ToolDataUri extends React.Component {
  state = {
    isSupported: false,
    isLoading: false,
    text: "В чащах юга жил бы цитрус? Да, но фальшивый экземпляр!",
    items: []
  };

  componentDidMount() {
    this.setState({ isSupported: ToolDataUri.isSupported() });
  }

  static isSupported() {
    const nav = navigator.appVersion;

    const input = document.createElement("input");
    input.setAttribute("type", "file");

    const is_win_safari =
      nav.indexOf("Win") !== -1 &&
      nav.indexOf("Safari") !== -1 &&
      nav.indexOf("Version/") !== -1;
    const support_files = "multiple" in input && "files" in input;
    const support_reader = window.FileReader && new FileReader().readAsDataURL;
    const support_worker = window.Worker;

    return !!(
      support_files &&
      support_reader &&
      !is_win_safari &&
      support_worker
    );
  }

  processFileInWorker(file) {
    return new Promise((resolve, reject) => {
      const worker = new Worker("/datauri-worker.js");
      worker.onmessage = e => resolve(e.data);
      worker.onerror = () => reject();
      worker.postMessage(file);
    });
  }

  doChooseFile = () => {
    chooseFile(async file => {
      try {
        const item = await this.processFileInWorker(file);
        this.setState((state, props) => {
          return { items: [...state.items, item] };
        });
      } catch (e) {}
    });
  };

  render() {
    const { location } = this.props;
    const { isSupported, items } = this.state;

    return (
      <Layout location={location}>
        <SEO title={`Генератор Data URI`} />

        <h1>Генератор Data URI</h1>

        <div className="data-uri-generator">
          {isSupported ? (
            <div className="data-uri-generator__main">
              <p>
                По идее должно работать в chrome и firefox, в других браузерах
                не пробовал.
              </p>
              <p>
                <button
                  type="button"
                  className="zbz-button"
                  onClick={this.doChooseFile}
                >
                  Выбрать файл
                </button>
              </p>
              {items ? (
                <ul className="zbz-links-list">
                  {items.map((item, key) => {
                    return (
                      <li key={key} className="zbz-links-list__item">
                        <div>{item.filename}</div>
                        <TextareaAutosize
                          style={{
                            marginTop: "0.5em",
                            width: "100%",
                            fontFamily: "monospace",
                            resize: "none"
                          }}
                          value={item.url}
                          readOnly={true}
                          minRows={1}
                          maxRows={3}
                          cols={120}
                        />
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          ) : (
            <p>К сожалению, у вас устаревший браузер :-(</p>
          )}
        </div>
      </Layout>
    );
  }
}
