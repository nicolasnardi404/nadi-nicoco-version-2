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

const Category = ({ pageContext }) => {
    const { category, title } = pageContext;
    console.log(category);

    function createMarkup(text) {
        return { __html: text };
    }

    return (
        <div>
            <h1>{title}</h1>
            {category.length && category.map(entry =>
                <div key={entry.node.id}>
                    <a href={entry.node.id}>
                        <h2>{entry.node.title}</h2>
                    </a>
                </div>)}
        </div>
    )
}

export default Category;