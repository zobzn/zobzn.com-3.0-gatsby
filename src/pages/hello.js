import React from "react";
import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

export default function({ location }) {
  return (
    <Layout location={location}>
      <SEO title={`Привет!`} />
      <h1>Привет!</h1>
      <p>Как дела? :-)</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
    </Layout>
  );
}
