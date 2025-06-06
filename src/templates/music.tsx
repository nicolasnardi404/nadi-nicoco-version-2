import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types';
import styled from 'styled-components';
import "../components/layout.css";
import { XSoundResponse } from '../types/GraphQLResponses';
import Layout from '../components/layout';

const Win98Container = styled.div`
  font-family: 'MS Sans Serif', sans-serif;
  padding: 20px;
`;

const Win98Window = styled.div`
  background: #c0c0c0;
  border: 2px solid #fff;
  border-right-color: #000;
  border-bottom-color: #000;
  box-shadow: inset -1px -1px #858585, inset 1px 1px #dadada;
  padding: 2px;
  margin: 20px auto;
  max-width: 800px;
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
`;

const Win98Content = styled.div`
  padding: 16px;
  background: #c0c0c0;
`;

const MusicCard = styled.div`
  background: #ffffff;
  border: 2px solid #858585;
  border-right-color: #fff;
  border-bottom-color: #fff;
  margin-bottom: 20px;
  padding: 2px;
`;

const MusicTitle = styled.h1`
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 14px;
  color: #000080;
  background: #c0c0c0;
  padding: 6px;
  margin: 0;
  border-bottom: 2px solid #858585;
`;

const Hero = styled.div<{ background: string }>`
  background: url(${props => props.background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 2rem;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  iframe {
    border: 2px solid #000;
    box-shadow: 2px 2px 0 #858585;
  }
`;

const Description = styled.div`
  padding: 16px;
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 12px;
  line-height: 1.4;
  
  a {
    color: #000080;
    text-decoration: underline;
  }
  
  h2 {
    font-size: 13px;
    color: #000080;
    margin-bottom: 8px;
  }
`;

const MenuBar = styled.div`
  background: #c0c0c0;
  border-bottom: 2px solid #858585;
  padding: 2px 0;
  display: flex;
  gap: 8px;
`;

const MenuItem = styled.button`
  background: #c0c0c0;
  border: 1px solid #858585;
  border-right-color: #fff;
  border-bottom-color: #fff;
  padding: 2px 8px;
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 11px;
  cursor: pointer;
  
  &:active {
    border: 1px solid #fff;
    border-right-color: #858585;
    border-bottom-color: #858585;
  }
`;

const options = {
    renderMark: {
        [MARKS.BOLD]: (text) => (<b style={{ fontWeight: 'bold' }}>{text}</b>),
    },
    renderNode: {
        [INLINES.HYPERLINK]: (node, children) => {
            const { uri } = node.data
            return (
                <a href={uri} style={{ color: '#000080', textDecoration: 'underline' }}>
                    {children}
                </a>
            )
        },
        [BLOCKS.HEADING_2]: (node, children) => {
            return <h2 style={{ fontSize: '13px', color: '#000080', marginBottom: '8px' }}>{children}</h2>
        },
    },
};

const Music: React.FC<{ pageContext: { xSound: XSoundResponse[] } }> = ({ pageContext }) => {
    const { xSound } = pageContext;

    function createMarkup(text) {
        return { __html: text };
    }

    return (
        <Layout>
            <Win98Container>
                <Win98Window>
                    <Win98TitleBar>
                        <span>🎵 Music Player</span>
                        <div>
                            <button style={{
                                background: '#c0c0c0',
                                border: '2px solid #fff',
                                borderRightColor: '#000',
                                borderBottomColor: '#000',
                                padding: '0px 5px',
                                fontSize: '11px',
                                cursor: 'pointer',
                                marginLeft: '2px'
                            }}>?</button>
                            <button style={{
                                background: '#c0c0c0',
                                border: '2px solid #fff',
                                borderRightColor: '#000',
                                borderBottomColor: '#000',
                                padding: '0px 5px',
                                fontSize: '11px',
                                cursor: 'pointer',
                                marginLeft: '2px'
                            }}>×</button>
                        </div>
                    </Win98TitleBar>
                    
                    <MenuBar>
                        <MenuItem>File</MenuItem>
                        <MenuItem>Edit</MenuItem>
                        <MenuItem>View</MenuItem>
                        <MenuItem>Help</MenuItem>
                    </MenuBar>

                    <Win98Content>
                        {xSound.map((music, index) => (
                            <MusicCard key={index}>
                                <MusicTitle>{music.title}</MusicTitle>
                                <Hero background={music.cover?.publicUrl}>
                                    <div dangerouslySetInnerHTML={createMarkup(music.embed?.embed)}></div>
                                </Hero>
                                <Description>
                                    {music.description && renderRichText(music.description, options)}
                                </Description>
                            </MusicCard>
                        ))}
                    </Win98Content>
                </Win98Window>

                {/* Status Bar */}
                <div style={{
                    background: '#c0c0c0',
                    border: '2px solid #858585',
                    borderRightColor: '#fff',
                    borderBottomColor: '#fff',
                    padding: '2px 5px',
                    fontSize: '11px',
                    position: 'fixed',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <span>{xSound.length} tracks loaded</span>
                    <span>{new Date().toLocaleTimeString()}</span>
                </div>
            </Win98Container>
        </Layout>
    );
};

export default Music;