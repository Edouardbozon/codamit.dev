import { graphql } from 'gatsby';
import React from 'react';
import Bio from '../components/bio';
import Layout from '../components/layout';
import { PostNav } from '../components/post-nav';
import { Seo } from '../components/seo';
import { rhythm } from '../utils/typography';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const { social, author } = this.props.data.site.siteMetadata;
    const { previous, next } = this.props.pageContext;
    const { location } = this.props;
    return (
      <Layout location={location} social={social} author={author}>
        <Seo
          title={post.frontmatter.title}
          description={post.excerpt}
          article={true}
          canonical={post.frontmatter.canonical}
        />
        <article>
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                display: `block`,
                marginTop: rhythm(0.2),
                marginBottom: rhythm(2),
                fontWeight: 'lighter',
              }}
            >
              {post.frontmatter.draft ? (
                <strong>
                  <span role="img" aria-label="emoji" alt="wip">
                    🚧
                  </span>{' '}
                  Draft
                </strong>
              ) : (
                post.frontmatter.date
              )}
            </p>
          </header>
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            style={{ marginBottom: rhythm(2) }}
          />
          <footer>
            <Bio />
          </footer>
        </article>
        <PostNav
          previous={previous}
          next={next}
        ></PostNav>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        author
        social {
          twitter
          linkedin
          instagram
          github
          youtube
        }
      }
    }
    markdownRemark(published: { eq: true }, fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        canonical
        draft
      }
    }
  }
`;
