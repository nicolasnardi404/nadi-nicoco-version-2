import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { INLINES, BLOCKS, MARKS, Block, Inline } from '@contentful/rich-text-types';
import styled, { StyledComponent } from 'styled-components';
import "../components/layout.css";
import { Music } from '../types/music';

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



const Post: React.FC<{ pageContext: { music: Music } }> = ({ pageContext }) => {
    const { music } = pageContext;
    console.log(music)

    function createMarkup(text) {
        return { __html: text };
    }

    return (
        <div>
            <h1>{music.title}</h1>
            <Hero background={music.cover.publicUrl} >
                <div dangerouslySetInnerHTML={createMarkup(music.embed?.embed)}></div>
            </Hero>
            {music.description && renderRichText(music.description, options)}
        </div>
    )
}

export default Post;