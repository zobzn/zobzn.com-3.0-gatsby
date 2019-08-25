import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

export default function({ location, data }) {
  const note = data.markdownRemark;
  const { date, title } = note.frontmatter;
  const description = note.frontmatter.description || note.excerpt;
  const html = note.html;

  return (
    <Layout location={location}>
      <SEO title={title} description={description} />
      <article>
        <div className={`article-head`}>
          <h1>{title}</h1>
        </div>
        <div
          className={`article-body`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
      <div className="article-info">
        <div className="article-info__wrapper">
          <div className="article-info__date">{date}</div>
          {false && (
            <ul className="article-info__tags">
              <li className="article-info__tag">
                <a href="/tags/windows">windows</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        # date(formatString: "MMMM DD, YYYY")
        # date(formatString: "DD.MM.YYYY HH:mm:ss")
        date(formatString: "DD.MM.YYYY")
        # description
      }
    }
  }
`;
