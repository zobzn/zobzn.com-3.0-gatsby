/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

function SEO({ description, lang, meta, title }) {
  const queryResult = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const siteMetadata = queryResult.site.siteMetadata;
  const titleTemplate = `%s` || `%s — ${siteMetadata.title}`;
  const metaDescription = description || siteMetadata.description;
  const author = siteMetadata.author;

  const metas = [
    {
      name: `description`,
      content: metaDescription
    },
    {
      property: `og:title`,
      content: title
    },
    {
      property: `og:description`,
      content: metaDescription
    },
    {
      property: `og:type`,
      content: `website`
    },
    {
      name: `twitter:card`,
      content: `summary`
    },
    {
      name: `twitter:creator`,
      content: author
    },
    {
      name: `twitter:title`,
      content: title
    },
    {
      name: `twitter:description`,
      content: metaDescription
    }
  ];

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={titleTemplate}
      meta={metas.concat(meta)}
    />
  );
}

SEO.defaultProps = {
  lang: `ru`,
  meta: [],
  description: ``
};

SEO.propTypes = {
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  description: PropTypes.string
};

export default SEO;
