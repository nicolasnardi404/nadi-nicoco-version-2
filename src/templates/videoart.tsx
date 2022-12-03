import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types';
import styled from 'styled-components';
import "../components/layout.css";
import { BasicPost } from '../types/music';

const options = {
    renderMark: {
        [MARKS.BOLD]: (text) => (<b className="font-bold">{text}</b>),
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

interface HeroProps {
    background: string;
}

const Hero = styled.div<HeroProps>`
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



const Post: React.FC<{ pageContext: { videoart: BasicPost } }> = ({ pageContext }) => {
    const { videoart } = pageContext;
    console.log(videoart)

    function createMarkup(text) {
        return { __html: text };
    }

    return (
        <div>
            <h1>{videoart.title}</h1>
            <div dangerouslySetInnerHTML={createMarkup(videoart.embed.embed)}></div>
            {renderRichText(videoart.description, options)}
        </div>
    )
}

export default Post;