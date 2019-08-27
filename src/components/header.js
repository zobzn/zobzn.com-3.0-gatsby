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

  const localhosts = ["localhost", "127.0.0.1", "10.0.75.1", "192.168.0.100"];
  const isLocalHost =
    typeof window !== "undefined" &&
    window.location.hostname &&
    localhosts.indexOf(window.location.hostname) !== -1;

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
      {isLocalHost && (
        <a className="zbz-link ml-3" href="/start">
          Старт
        </a>
      )}
      {isLocalHost && (
        <a className="zbz-link ml-3" href="/upwork">
          Upwork
        </a>
      )}
    </header>
  );
}
