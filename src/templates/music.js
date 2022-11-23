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

const Post = ({ pageContext }) => {
    const { music } = pageContext;
    console.log(music)

    function createMarkup(text) {
        return { __html: text };
    }

    return (
        <div>
            <h1>{music.title}</h1>
            <div dangerouslySetInnerHTML={createMarkup(music.embed.embed)}></div>
            {renderRichText(music.description)}
        </div>
    )
}

export default Post;