import { Link, useStaticQuery, graphql } from "gatsby";
import React from "react";

export default function Header({ location }) {
  // @see https://www.gatsbyjs.org/docs/use-static-query/
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const { title: siteTitle } = data.site.siteMetadata;
  const rootPath = `${__PATH_PREFIX__}/`;
  const isHomepage =
    location && location.pathname && location.pathname === rootPath;

  return (
    <header className="site-head">
      {isHomepage && (
        <h1 className="site-head__title" data-site-title={siteTitle}></h1>
      )}
      {!isHomepage && (
        <Link
          className="site-head__title"
          data-site-title={siteTitle}
          to={`/`}
        />
      )}
      {true && (
        <Link className="zbz-link ml-3" to={`/hello`}>
          Привет
        </Link>
      )}
      {false && (
        <a className="zbz-link ml-3" href="/start">
          Старт
        </a>
      )}
      {false && (
        <a className="zbz-link ml-3" href="/upwork">
          Upwork
        </a>
      )}
    </header>
  );
}
