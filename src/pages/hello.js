import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

export default function({ location }) {
  return (
    <Layout location={location}>
      <SEO title={`Привет!`} />
      <h1>Привет!</h1>
      <p>Как дела? :-)</p>
      <p>
        <Link to="/page-1/">Go back to the page 1</Link>
      </p>
      <p>
        <Link to="/page-2/">Go back to the page 2</Link>
      </p>
    </Layout>
  );
}
