module.exports = {
  siteMetadata: {
    title: `ы`,
    description: `Заметки на память по программированию и всему такому…`,
    author: `zobzn`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // maxWidth: 590
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-47099248-1`,
        head: false
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `zobzn.com`,
        short_name: `zobzn.com`,
        start_url: `/`,
        background_color: `#333333`,
        theme_color: `#333333`,
        display: `minimal-ui`,
        icon: `src/images/zobzn-icon.png`
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`
    // `gatsby-plugin-offline`
  ]
};
