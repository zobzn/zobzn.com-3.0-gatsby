import React from "react";
import TextareaAutosize from "react-textarea-autosize";

import Layout from "../../components/layout";
import SEO from "../../components/seo";

const startText = [
  "Объемная скидка регулярно отталкивает эксклюзивный выставочный стенд, опираясь на опыт западных коллег.",
  "Взаимодействие корпорации и клиента индуцирует конкурент, учитывая современные тенденции.",
  "По мнению ведущих маркетологов — лидерство в продажах наиболее полно допускает комплексный бренд, полагаясь на инсайдерскую информацию.",
  "Изменение глобальной стратегии амбивалентно."
].join("\n");

export default class ToolTypograph extends React.Component {
  state = {
    src: startText,
    res: ToolTypograph.typograph(startText)
  };

  onTextChange = e => {
    this.setState({
      src: e.currentTarget.value,
      res: ToolTypograph.typograph(e.currentTarget.value)
    });
  };

  static typograph(text) {
    // заменяем html сушности на соответствующие символы
    text = text.replace(/&#133;|&hellip;/g, "…");
    text = text.replace(/&#146;/g, "’");
    text = text.replace(/&#153;/g, "™");
    text = text.replace(/&#160;|&nbsp;/g, " ");
    text = text.replace(/&#151;|&#8212;|&mdash;|—/g, "—");
    text = text.replace(/&#147;/g, "“");
    text = text.replace(/&#148;/g, "”");
    text = text.replace(/&#171;|&laquo;/g, "«");
    text = text.replace(/&#187;|&raquo;/g, "»");

    // ставим пробелы после знаков препинаний
    text = text.replace(/[ ]+([:,.!])( *)/g, "$1 ");
    text = text.replace(/ +[—–-] +/g, "&#160;&#8212; ");
    // ставим неразрывные пробелы после союзов и предлогов
    text = text.replace(
      /(^|[^а-яіїєё'-])(я|а|в|є|і|и|й|з|к|о|с|у|во|да|до|за|зі|из|их|із|її|їх|на|не|ни|но|об|от|по|со|та|те|то|ту|це|що|чи|або) +/gi,
      "$1$2&#160;"
    );
    text = text.replace(
      /(\\&#160;| )(я|а|в|є|і|и|й|з|к|о|с|у|во|да|до|за|зі|из|их|із|її|їх|на|не|ни|но|об|от|по|со|та|те|то|ту|це|що|чи|або) +/gi,
      "$1$2&#160;"
    );
    // ставим неразрывные пробелы перед частицами
    text = text.replace(
      /([а-яіїєё]) +(бы|ж|же|ли)(^|[^а-яіїєё'-])/gi,
      "$1&#160;$2$3"
    );
    // ставим неразрывные пробелы возле названий улиц
    text = text.replace(/(ул\\.|вул\\.) +(\\W)/gi, "$1&#160;$2");
    // ставим неразрывные пробелы возле дат
    text = text.replace(
      /(\\d) +(года|году|року|році|г\\.|р\\.|гг\\.)/gi,
      "$1&#160;$2"
    );
    text = text.replace(
      /(\\d) +(января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря|січня|лютого|березня|квітня|травня|липня|червня|серпня|вересня|жовтня|листопада|грудня)/gi,
      "$1&#160;$2"
    );

    return text;
  }

  render() {
    const { location } = this.props;
    const { src, res } = this.state;

    return (
      <Layout location={location}>
        <SEO title={`Простой типограф`} />
        <h1>Простой типограф</h1>
        <TextareaAutosize
          minRows={3}
          cols={120}
          value={src}
          onChange={this.onTextChange}
          style={{ resize: "none" }}
          placeholder="Исходный текст"
        />
        <br />
        <TextareaAutosize
          minRows={3}
          cols={120}
          readOnly={true}
          value={res}
          style={{ resize: "none" }}
          placeholder="Результат"
        />
      </Layout>
    );
  }
}
