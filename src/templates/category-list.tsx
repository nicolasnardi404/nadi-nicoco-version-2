import React from 'react';
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types';
import { Options } from '@contentful/rich-text-html-renderer';

const options: Options = {
    renderMark: {
        [MARKS.BOLD]: (text) => `<b className="font-bold">${text}</b>`,
    },
    renderNode: {
        [INLINES.HYPERLINK]: (node, children) => {
            const { uri } = node.data
            return (`
                <a href=${uri} className="underline">
                    ${children}
                </a>`
            )
        },
        [BLOCKS.HEADING_2]: (node, children) => {
            return `<h2>${children}</h2>`
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
            (<div key={entry.id}>
                <a href={entry.id}>
                    <h2>{entry.title} </h2>
                </a>
            </div>))}
        </div>
    )
}

export default Category;