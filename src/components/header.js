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

  const { title: siteTitle } = (data &&
    data.site &&
    data.site.siteMetadata) || {
    siteTitle: "Ы"
  };

  const rootPath = `${__PATH_PREFIX__}/`;
  const localhosts = ["localhost", "127.0.0.1", "10.0.75.1", "192.168.0.100"];
  const isLocalHost =
    location.hostname && localhosts.indexOf(location.hostname) !== -1;
  const isHomepage =
    location && location.pathname && location.pathname === rootPath;

  return (
    <header className="site-head">
      {isHomepage && (
        <h1 className="site-head__title" data-site-title={siteTitle}>
          {""}
        </h1>
      )}
      {!isHomepage && (
        <Link
          className="site-head__title"
          data-site-title={siteTitle}
          to={`/`}
        />
      )}
      {isLocalHost && (
        <Link className="zbz-link ml-3" to="/start">
          Start
        </Link>
      )}
    </header>
  );
}
