import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { INLINES, BLOCKS, MARKS, Block, Inline } from '@contentful/rich-text-types';
import styled, { StyledComponent } from 'styled-components';
import "../components/layout.css";
import { Music } from '../types/GraphQLResponses';
import IconsList from '../components/iconList';
import Layout from '../components/layout';

// const options = {
//     renderMark: {
//         [MARKS.BOLD]: (text) => (<b className="font-bold">{text}</b>),
//     },
//     renderNode: {
//         [INLINES.HYPERLINK]: (node, children) => {
//             const { uri } = node.data
//             return (
//                 <a href={uri} className="underline">
//                     {children}
//                 </a>
//             )
//         },
//         [BLOCKS.HEADING_2]: (node, children) => {
//             return <h2>{children}</h2>
//         },
//     },
// }

// interface HeroProps {
//     background: string;
// }

// const Hero = styled.div<HeroProps>`
//     background: url(${props => props.background});
//     background-size: cover;
//     background-position: center;
//     background-repeat: no-repeat;
//     height: 30vh;
//     width: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     padding: 4rem;
// `



const links = [
    {
        text: "music",
        url: "/x-sound/music",
        icon: "../icons/music.png"
    },
    {
        text: "visual",
        url: "/x-sound/visual",
        icon: "../icons/visual.png"
    }
]



const XSound: React.FC<{ pageContext: { music: Music } }> = ({ pageContext }) => {

    function createMarkup(text) {
        return { __html: text };
    }

    return (
        <Layout>
            <IconsList links={links} />
        </Layout>
    )
}

export default XSound;