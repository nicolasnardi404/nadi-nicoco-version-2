import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types';
import styled from 'styled-components';
import "../components/layout.css";
import { Music } from '../types/GraphQLResponses';
import IconsList from '../components/iconList';
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
  max-width: 600px;
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

const CategorySection = styled.div`
  margin: 10px 0;
  padding: 10px;
  background: #ffffff;
  border: 2px solid #858585;
  border-right-color: #fff;
  border-bottom-color: #fff;
`;

const SectionTitle = styled.h2`
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 14px;
  color: #000080;
  margin-bottom: 10px;
`;

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
];

const XSound: React.FC<{ pageContext: { music: Music } }> = ({ pageContext }) => {
    return (
        <Layout>
            <Win98Container>
                <Win98Window>
                    <Win98TitleBar>
                        <span>🎵 X-Sound Explorer</span>
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
                    </Win98TitleBar>
                    <Win98Content>
                        <CategorySection>
                            <SectionTitle>Select Your Experience:</SectionTitle>
                            <IconsList links={links} />
                        </CategorySection>
                        
                        <CategorySection>
                            <SectionTitle>About X-Sound</SectionTitle>
                            <p style={{ 
                                fontFamily: 'MS Sans Serif', 
                                fontSize: '12px',
                                lineHeight: '1.4',
                                color: '#222'
                            }}>
                                Welcome to X-Sound! Choose between Music and Visual experiences. 
                                Double-click an icon to explore each section.
                            </p>
                        </CategorySection>
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
                    <span>2 items</span>
                    <span>{new Date().toLocaleTimeString()}</span>
                </div>
            </Win98Container>
        </Layout>
    );
};

export default XSound;