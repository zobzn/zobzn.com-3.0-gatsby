import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

export default function IndexPage({ data, location }) {
  const notes = data.notes.edges.map(({ node }) => ({
    slug: node.fields.slug,
    title: node.frontmatter.title || node.fields.slug
  }));

  return (
    <Layout location={location}>
      <SEO title="ы" />
      <h2>Заметки</h2>
      {notes.length < 1 && <p>Все заметки куда-то потерялись… :-(</p>}
      {notes.length > 0 && (
        <ul className="homepage-columns__column-items zbz-links-list">
          {notes.map(({ slug, date, title, html }) => (
            <li key={slug} className={`zbz-links-list__item`} data-date={date}>
              <Link className={`zbz-link`} to={slug}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <br />
      <br />
      <p>
        Привет. Ну раз уж вы не поленились и доскроллили до конца страницы, то
        давайте знакомиться. Меня зовут Семен. Я — программист.
        <br />
        Здесь я записываю заметочки себе на память. В основном фигня всякая, но
        может попасться и что-то интересное. Мало ли когда пригодится…
        <br />
        Если интересно, можете посмотреть{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/zobzn/"
        >
          мой github
        </a>
        , а если очень хочень можете даже{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.google.com/forms/d/e/1FAIpQLScrzauOuVwNKqYEd3UCeM_ihMCknTRKvfvNLIDRj6b2r8cp9A/viewform"
        >
          написать
        </a>{" "}
        мне что-нибудь.
      </p>
    </Layout>
  );
}

// filter: {
//     frontmatter: { template: { ne: "page" }, published: { ne: false } }
// }

export const pageQuery = graphql`
  query IndexQuery {
    notes: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
