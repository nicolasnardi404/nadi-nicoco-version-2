import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types';
import "../components/layout.css";
import { VideoArtResponse } from '../types/GraphQLResponses';
import Layout from '../components/layout';

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

const Post: React.FC<{ pageContext: { videoArt: VideoArtResponse[] } }> = ({ pageContext }) => {
    const { videoArt } = pageContext;

    function createMarkup(text) {
        return { __html: text };
    }

    return (
        <Layout>
            <div>
                {videoArt.map((video) => (
                    <div>
                        <h1>{video.title}</h1>
                        <div dangerouslySetInnerHTML={createMarkup(video.embed?.embed)}></div>
                        {video.description && renderRichText(video.description, options)}
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default Post;