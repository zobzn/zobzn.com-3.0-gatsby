/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { Link, useStaticQuery, graphql } from "gatsby";

// import Header from "./header";

import "../scss/app.scss";

export default function Layout({ location, children }) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  // const data2 = useStaticQuery(graphql`
  //   query LayoutQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `);

  const { title } = data.site.siteMetadata;
  const rootPath = `${__PATH_PREFIX__}/` + (title ? "" : "");
  const isHomepage =
    location && location.pathname && location.pathname === rootPath;

  return (
    <div className={`page-bone`}>
      <header className="site-head">
        {isHomepage && <span className="site-head__title">{/* title */}</span>}
        {!isHomepage && (
          <Link className="site-head__title" to={`/`}>
            {/* title */}
          </Link>
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
      <main>{children}</main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
