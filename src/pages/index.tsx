import * as React from "react"
import { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import type { HeadFC, PageProps } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"
import IconsList from "../components/iconList"

const links = [
  {
    text: "about",
    url: "/text-me",
    icon: "icons/smile-icon.png",
  },
  {
    text: "games",
    url: "#games",
    icon: "icons/game-icon.png",
  },
  {
    text: "the copy",
    url: "#iwanna",
    icon: "icons/iwannabenadinicoco-icon.png",
  },
  {
    text: "websites",
    url: "#websites",
    icon: "icons/internet-icon.png",
  },
  {
    text: "music",
    url: "/x-sound",
    icon: "icons/tape-icon.png",
  },
  {
    text: "movies",
    url: "/movies",
    icon: "icons/camera-icon.png",
  },
  {
    text: "video art",
    url: "/x-art",
    icon: "icons/computer-icon.png",
  },
  {
    text: "cyborg-text",
    url: "#cyborg-text",
    icon: "icons/writing-icon.png",
  },
]

const OrganizeButton = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #c0c0c0;
  border: 2px solid #fff;
  border-right-color: #000;
  border-bottom-color: #000;
  padding: 12px 24px;
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 9999;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  
  &:active {
    border: 2px solid #000;
    border-right-color: #fff;
    border-bottom-color: #fff;
    padding-top: 13px;
    padding-left: 25px;
    padding-bottom: 11px;
    padding-right: 23px;
  }

  &:hover {
    background: #d0d0d0;
  }
`;

const IconsContainer = styled.div<{ isOrganized: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
  padding: 20px;
  padding-bottom: 100px;
  transition: all 0.3s ease;
  
  ${props => props.isOrganized ? `
    max-width: 800px;
    margin: 0 auto;
    grid-template-columns: repeat(4, 1fr);
  ` : ''}
`

const IndexPage: React.FC<PageProps> = () => {
  const [isOrganized, setIsOrganized] = useState(true);

  const handleOrganize = () => {
    setIsOrganized(!isOrganized);
  };

  const handleIconClick = (url: string) => {
    if (url.startsWith('#')) {
      // Handle special cases like games, websites, etc.
      const hash = url.substring(1);
      // Emit a custom event that the Modals component will listen to
      window.dispatchEvent(new CustomEvent('startMenuAction', { 
        detail: { action: hash } 
      }));
    } else {
      window.location.href = url;
    }
  };

  return (
    <Layout>
      <Seo title="Home" />
      <IconsContainer isOrganized={isOrganized}>
        <IconsList 
          links={links} 
          onIconClick={handleIconClick}
          isOrganized={isOrganized}
        />
      </IconsContainer>
      
      <OrganizeButton onClick={handleOrganize}>
        {isOrganized ? '🎲 Randomize Icons' : '📋 Organize Icons'}
      </OrganizeButton>
    </Layout>
  )
}

export const Head: HeadFC = () => <Seo title="Home" />

export default IndexPage
