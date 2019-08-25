import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const SecondPage = () => (
  <Layout>
    <SEO title="Page one" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <p>
      <Link to="/page-2/">Go back to the page 2</Link>
    </p>
  </Layout>
);

export default SecondPage;
