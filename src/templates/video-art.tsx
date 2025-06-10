import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types';
import styled from 'styled-components';
import "../components/layout.css";
import { VideoArtResponse } from '../types/GraphQLResponses';
import Layout from '../components/layout';

const WindowsContainer = styled.div`
  font-family: 'MS Sans Serif', sans-serif;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 10px;
    gap: 15px;
  }
`;

const Win98Window = styled.div`
  background: #c0c0c0;
  border: 2px solid #fff;
  border-right-color: #000;
  border-bottom-color: #000;
  box-shadow: inset -1px -1px #858585, inset 1px 1px #dadada, 4px 4px 10px rgba(0,0,0,0.2);
  padding: 2px;
  height: fit-content;
  position: relative;
  
  &:hover {
    z-index: 1;
  }

  @media (max-width: 768px) {
    border-width: 1px;
    box-shadow: inset -1px -1px #858585, inset 1px 1px #dadada, 2px 2px 5px rgba(0,0,0,0.2);
  }
`;

const Win98TitleBar = styled.div`
  background: linear-gradient(90deg, #000080, #1084d0);
  color: white;
  padding: 3px 6px;
  font-weight: bold;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: default;
  user-select: none;

  @media (max-width: 768px) {
    padding: 6px 8px;
    font-size: 14px;
  }
`;

const TitleBarButtons = styled.div`
  display: flex;
  gap: 2px;

  @media (max-width: 768px) {
    gap: 4px;
  }
`;

const TitleBarButton = styled.button`
  width: 16px;
  height: 14px;
  background: #c0c0c0;
  border: 1px solid #fff;
  border-right-color: #000;
  border-bottom-color: #000;
  font-size: 10px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  
  &:active {
    border: 1px solid #000;
    border-right-color: #fff;
    border-bottom-color: #fff;
  }

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    font-size: 14px;
  }
`;

const Win98Content = styled.div`
  padding: 16px;
  background: #c0c0c0;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const VideoContainer = styled.div`
  padding: 16px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  border: 2px solid #858585;
  border-right-color: #fff;
  border-bottom-color: #fff;
  margin-bottom: 16px;
  
  iframe {
    border: 2px solid #000;
    box-shadow: 2px 2px 0 #858585;
    max-width: 100%;
    aspect-ratio: 16/9;
    width: 100%;
    height: auto;
  }

  @media (max-width: 768px) {
    padding: 8px;
    border-width: 1px;
    
    iframe {
      border-width: 1px;
      box-shadow: 1px 1px 0 #858585;
    }
  }
`;

const Description = styled.div`
  padding: 16px;
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 12px;
  line-height: 1.4;
  background: #ffffff;
  border: 2px solid #858585;
  border-right-color: #fff;
  border-bottom-color: #fff;
  
  a {
    color: #000080;
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 14px;
    line-height: 1.5;
    border-width: 1px;
  }
`;

const options = {
    renderMark: {
        [MARKS.BOLD]: (text) => (<b style={{ fontWeight: 'bold' }}>{text}</b>),
        [MARKS.ITALIC]: (text) => (<i>{text}</i>),
        [MARKS.UNDERLINE]: (text) => (<u>{text}</u>),
        [MARKS.CODE]: (text) => (<code>{text}</code>),
    },
    renderNode: {
        [INLINES.HYPERLINK]: (node, children) => {
            const { uri } = node.data;
            return (
                <a href={uri} style={{ color: '#000080', textDecoration: 'underline' }}>
                    {children}
                </a>
            );
        },
        [BLOCKS.HEADING_2]: (node, children) => {
            return <h2 style={{ fontSize: '13px', color: '#000080', marginBottom: '8px' }}>{children}</h2>;
        },
    },
};

const Post: React.FC<{ pageContext: { videoArt: VideoArtResponse[] } }> = ({ pageContext }) => {
    const { videoArt } = pageContext;

    function createMarkup(text) {
        return { __html: text };
    }

    return (
        <Layout>
            <WindowsContainer>
                {videoArt.map((video, index) => (
                    <Win98Window key={index}>
                        <Win98TitleBar>
                            <span>🎥 {video.title}</span>
                            <TitleBarButtons>
                                <TitleBarButton>_</TitleBarButton>
                                <TitleBarButton>□</TitleBarButton>
                                <TitleBarButton>×</TitleBarButton>
                            </TitleBarButtons>
                        </Win98TitleBar>
                        <Win98Content>
                            <VideoContainer>
                                <div dangerouslySetInnerHTML={createMarkup(video.embed?.embed)}></div>
                            </VideoContainer>
                            {video.description && (
                                <Description>
                                    {renderRichText(video.description, options)}
                                </Description>
                            )}
                        </Win98Content>
                    </Win98Window>
                ))}
            </WindowsContainer>
        </Layout>
    );
};

export default Post;