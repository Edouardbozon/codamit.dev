const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const blogList = path.resolve(`./src/pages/blog.js`);
  const result = await graphql(`
    {
      allMdx(sort: { frontmatter: { date: DESC } }, limit: 1000) {
        nodes {
          id
          published
          fields {
            slug
          }
          frontmatter {
            title
          }
          internal {
            contentFilePath
          }
        }
        group(field: { frontmatter: { tags: SELECT } }) {
          fieldValue
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const posts = result.data.allMdx.nodes;
  const tags = result.data.allMdx.group;

  posts.forEach((post, index) => {
    const hasNext = index > 0;
    const hasPrevious = index < posts.length - 1;

    const nextNode = hasNext ? posts[index - 1] : null;
    const previousNode = hasPrevious ? posts[index + 1] : null;

    const next = hasNext && nextNode.published ? nextNode : null;
    const previous =
      hasPrevious && previousNode.published ? previousNode : null;

    if (!post.published) {
      return;
    }
    // TODO: create redirect
    createPage({
      path: post.fields.slug,
      component: `${blogPost}?__contentFilePath=${post.internal.contentFilePath}`,
      context: {
        id: post.id,
        slug: post.fields.slug,
        previous,
        next,
      },
    });
  });

  tags.forEach((tag) => {
    createPage({
      path: `/tags/${tag.fieldValue}`,
      component: blogList,
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = [
    schema.buildObjectType({
      name: 'Mdx',
      fields: {
        published: {
          type: 'Boolean!',
          resolve: ({ frontmatter }) => {
            if (process.env.NODE_ENV !== 'production') {
              return true;
            }

            return !frontmatter.draft;
          },
        },
      },
      interfaces: ['Node'],
    }),
    `
    type MdxFrontmatter implements Node {
      canonical: String
      description: String
      tags: [String]
      draft: Boolean
    }
    `,
  ];
  createTypes(typeDefs);
};
