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
    url: "#games",
    icon: "icons/game-icon.png",
  },
  {
    text: "copy of nadi nicoco",
    url: "#iwanna",
    icon: "icons/iwannabenadinicoco-icon.png",
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

const RobotButton = styled(GameButton)`
  background: #c0c0c0;
  color: #000;
  font-weight: bold;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #d0d0d0;
  }
  
  &:active {
    border: 2px solid #000;
    border-right-color: #fff;
    border-bottom-color: #fff;
  }
`;

const RobotIcon = styled.span`
  font-size: 20px;
  margin-right: 8px;
`;

const IndexPage = () => {
  const [showGameModal, setShowGameModal] = useState(false);
  const [showIWannaBeModal, setShowIWannaBeModal] = useState(false);

  const handleIconClick = (url: string) => {
    if (url.startsWith('#')) {
      switch(url) {
        case '#games':
          setShowGameModal(true);
          break;
        case '#iwanna':
          setShowIWannaBeModal(true);
          break;
      }
    } else {
      window.location.href = url;
    }
  };

  const handleGameSelection = (gameUrl: string) => {
    window.location.href = gameUrl;
    setShowGameModal(false);
  };

  const handleIWannaBe = () => {
    window.location.href = 'https://iwannabe.nadinicoco.com';
    setShowIWannaBeModal(false);
  };

  const closeModals = () => {
    setShowGameModal(false);
    setShowIWannaBeModal(false);
  };

  return (
    <Layout>
      <Seo title="Home" />
      <IconsList links={links} onIconClick={handleIconClick} />
      
      {/* Games Modal */}
      {showGameModal && (
        <ModalOverlay onClick={closeModals}>
          <ModalWindow onClick={(e) => e.stopPropagation()}>
            <ModalTitleBar>
              <span>🎮 Select Game</span>
              <ModalCloseButton onClick={closeModals}>×</ModalCloseButton>
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

      {/* I Wanna Be Modal */}
      {showIWannaBeModal && (
        <ModalOverlay onClick={closeModals}>
          <ModalWindow onClick={(e) => e.stopPropagation()}>
            <ModalTitleBar>
              <span>🤖 I Wanna Be Nadi Nicoco</span>
              <ModalCloseButton onClick={closeModals}>×</ModalCloseButton>
            </ModalTitleBar>
            <ModalContent>
              <div style={{
                textAlign: 'center',
                marginBottom: '20px',
                fontFamily: 'MS Sans Serif',
                fontSize: '12px',
                lineHeight: '1.5'
              }}>
                <p style={{ marginBottom: '16px' }}>
                  I WANNA BE NADI NICOCO is a robot that feeds on the poetry of nadi nicoco.
                  It has created its own blog and writes a new poem every day.
                </p>
                <img 
                  src="icons/iwannabenadinicoco-icon.png" 
                  alt="Robot Icon" 
                  style={{
                    width: '64px',
                    height: '64px',
                    margin: '16px auto'
                  }}
                />
              </div>
              
              <RobotButton onClick={handleIWannaBe}>
                <RobotIcon>🤖</RobotIcon>
                VISIT THE ROBOT'S BLOG
              </RobotButton>
            </ModalContent>
          </ModalWindow>
        </ModalOverlay>
      )}
    </Layout>
  )
}

export const Head = () => <Seo title="Home" />

export default IndexPage
