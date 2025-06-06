import * as React from "react"
import { useState, MouseEvent, useEffect, useRef } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"
import IconsList from "../components/iconList"

const links = [
  {
    text: "text me",
    url: "/text-me",
    icon: "icons/text-me.png",
  },
  {
    text: "games",
    url: "#",
    icon: "icons/game-icon.png",
  },
  {
    text: "sound",
    url: "/x-sound",
    icon: "icons/x-sound.png",
  },
  {
    text: "movies",
    url: "/movies",
    icon: "icons/camera-icon.png",
  },
  {
    text: "art",
    url: "/x-art",
    icon: "icons/x-art.png",
  },
  {
    text: "cyborg-text",
    url: "/cyborg-text",
    icon: "icons/cyborg-text.png",
  },
]

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalWindow = styled.div`
  background: #c0c0c0;
  border: 2px solid #fff;
  border-right-color: #000;
  border-bottom-color: #000;
  box-shadow: inset -1px -1px #858585, inset 1px 1px #dadada;
  padding: 1px;
  width: 300px;
  max-width: 90%;
  font-family: 'MS Sans Serif', sans-serif;
`;

const ModalTitleBar = styled.div`
  background: linear-gradient(90deg, #000080, #1084d0);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 6px;
  font-weight: bold;
  font-size: 12px;
`;

const ModalCloseButton = styled.button`
  background: #c0c0c0;
  border: 2px solid #fff;
  border-right-color: #000;
  border-bottom-color: #000;
  padding: 0px 5px;
  font-size: 14px;
  font-family: 'MS Sans Serif', sans-serif;
  cursor: pointer;
  margin-left: 2px;
  
  &:active {
    border: 2px solid #000;
    border-right-color: #fff;
    border-bottom-color: #fff;
  }
`;

const ModalContent = styled.div`
  padding: 12px;
  background: #c0c0c0;
`;

const GameButton = styled.button`
  width: 100%;
  background: #c0c0c0;
  border: 2px solid #fff;
  border-right-color: #000;
  border-bottom-color: #000;
  padding: 8px;
  margin-bottom: 10px;
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 12px;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  &:active {
    border: 2px solid #000;
    border-right-color: #fff;
    border-bottom-color: #fff;
  }
`;

const GameIcon = styled.span`
  margin-right: 8px;
  font-size: 16px;
`;

const GameTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  font-family: 'MS Sans Serif', sans-serif;
  color: #000;
`;

const IndexPage = () => {
  const [showGameModal, setShowGameModal] = useState(false);

  const handleIconClick = (url: string) => {
    if (url === '#') {
      setShowGameModal(true);
    } else {
      window.location.href = url;
    }
  };

  const handleGameSelection = (gameUrl: string) => {
    window.location.href = gameUrl;
    setShowGameModal(false);
  };

  const closeModal = () => {
    setShowGameModal(false);
  };

  return (
    <Layout>
      <Seo title="Home" />
      <IconsList links={links} onIconClick={handleIconClick} />
      {showGameModal && (
        <ModalOverlay onClick={closeModal}>
          <ModalWindow onClick={(e) => e.stopPropagation()}>
            <ModalTitleBar>
              <span>🎮 Select Game</span>
              <ModalCloseButton onClick={closeModal}>×</ModalCloseButton>
            </ModalTitleBar>
            <ModalContent>
              <GameTitle>Choose Your Game:</GameTitle>
              
              <GameButton onClick={() => handleGameSelection('https://snakeonmushrooms.nadinicoco.com')}>
                <GameIcon>🐍</GameIcon>
                SNAKE ON MUSHROOMS
              </GameButton>
              
              <GameButton onClick={() => handleGameSelection('https://eat-the-rich.nadinicoco.com')}>
                <GameIcon>🍽️</GameIcon>
                EAT THE RICH
              </GameButton>
            </ModalContent>
          </ModalWindow>
        </ModalOverlay>
      )}
    </Layout>
  )
}

export const Head = () => <Seo title="Home" />

export default IndexPage
