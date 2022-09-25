import React from 'react';
import { graphql } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types';

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <b className="font-bold">{text}</b>,
  },
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      const { uri } = node.data
      return (
        <a href={uri} className="underline">
          {children}
        </a>
      )
    },
    [BLOCKS.HEADING_2]: (node, children) => {
      return <h2>{children}</h2>
    },
  },
}

const Post = ({ data }) => {
    return (
        <div>
            <h1>{data.post.title}</h1>
            <p>{renderRichText(data.post.content, options)}</p>
        </div>
    )
}

export default Post;
export const pageQuery = graphql`
    query($postId: Int!) {
        post: contentfulPost( postId: { eq: $postId }) {
            type,
            createdAt,
            title,
            postId,
            content {
                raw
            }
        }
    }
`