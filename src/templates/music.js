import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types';
import styled from 'styled-components';

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

const Hero = styled.div`
    background: url(${props => props.background});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 30vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4rem;
`

const Post = ({ pageContext }) => {
    const { music } = pageContext;
    console.log(music)

    function createMarkup(text) {
        return { __html: text };
    }

    return (
        <div>
            <h1>{music.title}</h1>
            <Hero background={music.cover.publicUrl} >
                <div dangerouslySetInnerHTML={createMarkup(music.embed.embed)}></div>
            </Hero>
            {renderRichText(music.description, options)}
        </div>
    )
}

export default Post;