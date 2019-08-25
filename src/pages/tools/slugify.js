import React from "react";
import { transliterate, slugify } from "transliteration";

import Layout from "../../components/layout";
import SEO from "../../components/seo";

const startText = "В чащах юга жил бы цитрус? Да, но фальшивый экземпляр!";

export default class ToolSlugify extends React.Component {
  state = {
    text: startText,
    slug: slugify(startText),
    translit: transliterate(startText)
  };

  onTextChange = e => {
    this.setState({
      text: e.currentTarget.value,
      slug: slugify(e.currentTarget.value),
      translit: transliterate(e.currentTarget.value)
    });
  };

  render() {
    const { location } = this.props;
    const { text, slug, translit } = this.state;

    return (
      <Layout location={location}>
        <SEO title={`Транслит`} />

        <h1>Транслит</h1>

        <div>
          <textarea
            rows={3}
            cols={120}
            value={text}
            onChange={this.onTextChange}
          />
          <br />
          <textarea rows={3} cols={120} readOnly={true} value={translit} />
          <br />
          <textarea rows={3} cols={120} readOnly={true} value={slug} />
        </div>
      </Layout>
    );
  }
}
