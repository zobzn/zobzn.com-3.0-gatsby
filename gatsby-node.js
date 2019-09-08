/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);
const { slugify } = require(`transliteration`);
const { createFilePath } = require(`gatsby-source-filesystem`);

// нужно для того, чтоб теги были не обязательными
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      description: String!
      tags: [String!]!
    }
  `;
  createTypes(typeDefs);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  const noteTemplate = path.resolve(`./src/templates/note.js`);
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
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
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  result.data.allMarkdownRemark.edges.forEach((item, index) => {
    createPage({
      path: item.node.fields.slug,
      component: noteTemplate,
      context: {
        slug: item.node.fields.slug
      }
    });
  });

  createRedirect({
    redirectInBrowser: true,
    isPermanent: true,
    fromPath: `/notes/`,
    toPath: `/`
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const parsedFilePath = path.parse(getNode(node.parent).relativePath); // dir, base, name, ext
    let slug = createFilePath({ node, getNode, trailingSlash: true });
    let date = null;

    if (node.frontmatter) {
      if (node.frontmatter.slug) {
        slug = `/${node.frontmatter.slug}/`;
      } else if (node.frontmatter.title) {
        slug = `/${slugify(node.frontmatter.title)}/`;
      }

      if (node.frontmatterdate) {
        date = new Date(node.frontmatter.date);
      }
    }

    if (false) {
      if (node.frontmatter && node.frontmatter.title) {
        slug = `/${kebabCase(node.frontmatter.title)}/`;
      } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
        slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
      } else if (parsedFilePath.dir === "") {
        slug = `/${parsedFilePath.name}/`;
      } else {
        slug = `/${parsedFilePath.dir}/`;
      }
    }

    if (slug) {
      createNodeField({
        node,
        name: `slug`,
        value: slug
      });
    }

    if (date) {
      createNodeField({
        node,
        name: "date",
        value: date.toISOString()
      });
    }
  }
};
