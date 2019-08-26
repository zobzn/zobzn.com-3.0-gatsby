import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

export default function IndexPage({ data }) {
  const notes = data.allMarkdownRemark.edges.map(({ node }) => ({
    slug: node.fields.slug,
    title: node.frontmatter.title || node.fields.slug
  }));

  return (
    <Layout>
      <SEO title="ы" />
      <div className="homepage-columns">
        <div className="homepage-columns__column">
          <h2 className="homepage-columns__column-title">Заметки</h2>
          {notes.length < 1 && <p>Все заметки куда-то потерялись… :-(</p>}
          {notes.length > 0 && (
            <ul className="homepage-columns__column-items zbz-links-list">
              {notes.map(({ slug, date, title, html }) => (
                <li
                  key={slug}
                  className={`zbz-links-list__item`}
                  data-date={date}
                >
                  <Link className={`zbz-link`} to={slug}>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="homepage-columns__column">
          <h2 className="homepage-columns__column-title">Инструменты</h2>
          <ul className="homepage-columns__column-items zbz-links-list">
            <li className="zbz-links-list__item">
              <Link to={`/tools/autoprefixer`}>Автопрефиксер CSS</Link>
            </li>
            <li className="zbz-links-list__item">
              <Link to={`/tools/format-js`}>Форматирование JS</Link>
            </li>
            <li className="zbz-links-list__item">
              <Link to={`/tools/format-sql`}>Форматирование SQL</Link>
            </li>
            <li className="zbz-links-list__item">
              <Link to={`/tools/data-uri`}>Генератор Data URI</Link>
            </li>
            <li className="zbz-links-list__item">
              <Link to={`/tools/typograph`}>Простой типограф</Link>
            </li>
            <li className="zbz-links-list__item">
              <Link to={`/tools/slugify`}>Транслит</Link>
            </li>
          </ul>
          <br />
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
