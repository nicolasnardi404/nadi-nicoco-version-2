import * as React from "react"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { PoetryResponse } from "../types/GraphQLResponses"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types"
import { useStaticQuery, graphql } from "gatsby"

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

const CyborgTextWindow = styled(ModalWindow)`
  width: 90vw;
  height: 90vh;
  max-width: 1200px;
  max-height: 800px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #000;
`;

const CyborgTextContent = styled(ModalContent)`
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
  padding: 20px;
  background: #000;
`;

const CyborgIcon = styled.div`
  width: 100px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    background: rgba(255,255,255,0.1);
  }
  
  &.selected {
    background: rgba(0,0,128,0.3);
  }
`;

const CyborgIconImage = styled.div`
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const CyborgIconLabel = styled.div`
  color: white;
  font-size: 12px;
  text-align: center;
  word-wrap: break-word;
  max-width: 90px;
`;

const CyborgTextNotepad = styled(ModalWindow)`
  position: absolute;
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const NotepadContent = styled.div`
  flex: 1;
  padding: 16px;
  background: white;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
`;

interface ModalsProps {}

const Modals = (props: ModalsProps): JSX.Element => {
  const [showGameModal, setShowGameModal] = useState(false);
  const [showIWannaBeModal, setShowIWannaBeModal] = useState(false);
  const [showWebsitesModal, setShowWebsitesModal] = useState(false);
  const [showCyborgTextModal, setShowCyborgTextModal] = useState(false);
  const [cyborgText, setCyborgText] = useState<PoetryResponse[]>([]);
  const [openPoems, setOpenPoems] = useState<number[]>([]);
  const [poemPositions, setPoemPositions] = useState<{[key: number]: {x: number, y: number}}>({});
  const [selectedPoem, setSelectedPoem] = useState<number | null>(null);
  const [draggingPoem, setDraggingPoem] = useState<{id: number, offsetX: number, offsetY: number} | null>(null);

  // Fetch cyborg text data using static query
  const data = useStaticQuery(graphql`
    query {
      allContentfulPoetry {
        nodes {
          poem {
            raw
          }
          date
          title
          id
        }
      }
    }
  `);

  useEffect(() => {
    if (showCyborgTextModal && data?.allContentfulPoetry?.nodes) {
      setCyborgText(data.allContentfulPoetry.nodes);
    }
  }, [showCyborgTextModal, data]);

  useEffect(() => {
    const handleStartMenuAction = (event: CustomEvent<{ action: string }>) => {
      const { action } = event.detail;
      switch(action) {
        case 'games':
          setShowGameModal(true);
          break;
        case 'iwanna':
          setShowIWannaBeModal(true);
          break;
        case 'websites':
          setShowWebsitesModal(true);
          break;
        case 'cyborg-text':
          setShowCyborgTextModal(true);
          break;
      }
    };

    window.addEventListener('startMenuAction', handleStartMenuAction as EventListener);
    return () => {
      window.removeEventListener('startMenuAction', handleStartMenuAction as EventListener);
    };
  }, []);

  const closeModals = () => {
    setShowGameModal(false);
    setShowIWannaBeModal(false);
    setShowWebsitesModal(false);
    setShowCyborgTextModal(false);
    setOpenPoems([]);
  };

  const handleGameSelection = (gameUrl: string) => {
    window.location.href = gameUrl;
    setShowGameModal(false);
  };

  const handleIWannaBe = () => {
    window.location.href = 'https://iwannabe.nadinicoco.com';
    setShowIWannaBeModal(false);
  };

  const handleWebsiteSelection = (websiteUrl: string) => {
    window.location.href = websiteUrl;
    setShowWebsitesModal(false);
  };

  const handlePoemClick = (index: number) => {
    setSelectedPoem(index);
  };

  const handlePoemDoubleClick = (index: number) => {
    if (!openPoems.includes(index)) {
      setOpenPoems([...openPoems, index]);
      // Set initial position if not already set
      if (!poemPositions[index]) {
        setPoemPositions(prev => ({
          ...prev,
          [index]: { 
            x: 100 + (index * 30), 
            y: 50 + (index * 30) 
          }
        }));
      }
    }
  };

  const handlePoemClose = (index: number) => {
    setOpenPoems(openPoems.filter(i => i !== index));
  };

  const handlePoemMouseDown = (e: React.MouseEvent, poemId: number) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setDraggingPoem({
      id: poemId,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingPoem) {
      const newX = e.clientX - draggingPoem.offsetX;
      const newY = e.clientY - draggingPoem.offsetY;
      
      setPoemPositions(prev => ({
        ...prev,
        [draggingPoem.id]: { x: newX, y: newY }
      }));
    }
  };

  const handleMouseUp = () => {
    setDraggingPoem(null);
  };

  return (
    <>
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

      {/* Websites Modal */}
      {showWebsitesModal && (
        <ModalOverlay onClick={closeModals}>
          <ModalWindow onClick={(e) => e.stopPropagation()}>
            <ModalTitleBar>
              <span>🌐 My Websites</span>
              <ModalCloseButton onClick={closeModals}>×</ModalCloseButton>
            </ModalTitleBar>
            <ModalContent>
              <GameTitle>Visit My Websites:</GameTitle>
              
              <GameButton onClick={() => handleWebsiteSelection('https://cutethingsonline.com')}>
                <GameIcon>🌸</GameIcon>
                CUTE THINGS ONLINE
              </GameButton>
              
              <GameButton onClick={() => handleWebsiteSelection('https://randomrainbow.art')}>
                <GameIcon>🌈</GameIcon>
                RANDOM RAINBOW
              </GameButton>

              <GameButton onClick={() => handleWebsiteSelection('https://quartoambiente.com.br')}>
                <GameIcon>🏠</GameIcon>
                QUARTO AMBIENTE
              </GameButton>
            </ModalContent>
          </ModalWindow>
        </ModalOverlay>
      )}

      {/* Cyborg Text Modal */}
      {showCyborgTextModal && (
        <ModalOverlay 
          onClick={(e) => {
            // Only close if clicking directly on the overlay
            if (e.target === e.currentTarget) {
              closeModals();
            }
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <CyborgTextWindow onClick={(e) => e.stopPropagation()}>
            <ModalTitleBar>
              <span>📝 Cyborg Text</span>
              <ModalCloseButton onClick={closeModals}>×</ModalCloseButton>
            </ModalTitleBar>
            <CyborgTextContent onClick={(e) => e.stopPropagation()}>
              {cyborgText.map((poem, index) => (
                <CyborgIcon
                  key={poem.id}
                  className={selectedPoem === index ? 'selected' : ''}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePoemClick(index);
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    handlePoemDoubleClick(index);
                  }}
                >
                  <CyborgIconImage>
                    <img src="/icons/folder-icon.png" alt="Text file" />
                  </CyborgIconImage>
                  <CyborgIconLabel>{poem.title}</CyborgIconLabel>
                </CyborgIcon>
              ))}
            </CyborgTextContent>
          </CyborgTextWindow>

          {/* Open Poems */}
          {openPoems.map((poemIndex) => {
            const poem = cyborgText[poemIndex];
            const position = poemPositions[poemIndex] || { x: 100 + (poemIndex * 30), y: 50 + (poemIndex * 30) };
            
            return (
              <CyborgTextNotepad
                key={`poem-${poemIndex}`}
                style={{
                  top: position.y,
                  left: position.x
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <ModalTitleBar
                  onMouseDown={(e) => handlePoemMouseDown(e, poemIndex)}
                  style={{
                    cursor: draggingPoem?.id === poemIndex ? 'grabbing' : 'grab'
                  }}
                >
                  <span>📝 {poem.title} - Notepad</span>
                  <ModalCloseButton onClick={(e) => {
                    e.stopPropagation();
                    handlePoemClose(poemIndex);
                  }}>×</ModalCloseButton>
                </ModalTitleBar>
                <NotepadContent onClick={(e) => e.stopPropagation()}>
                  <div style={{ marginBottom: '16px' }}>
                    <strong>File: {poem.title}</strong>
                    <br />
                    <small>Date: {poem.date || 'Unknown'}</small>
                  </div>
                  <hr style={{ margin: '8px 0' }} />
                  {poem.poem && renderRichText(poem.poem, {
                    renderMark: {
                      [MARKS.BOLD]: text => <b style={{ fontWeight: 'bold', color: '#000' }}>{text}</b>,
                    },
                    renderNode: {
                      [INLINES.HYPERLINK]: (node, children) => (
                        <a href={node.data.uri} style={{ color: '#000', textDecoration: 'underline' }}>
                          {children}
                        </a>
                      ),
                      [BLOCKS.HEADING_2]: (node, children) => (
                        <h2 style={{ fontSize: '16px', fontWeight: 'bold', margin: '10px 0', color: '#000' }}>
                          {children}
                        </h2>
                      ),
                      [BLOCKS.PARAGRAPH]: (node, children) => (
                        <p style={{ whiteSpace: 'pre-wrap', margin: '0 0 1em 0', color: '#000' }}>
                          {children}
                        </p>
                      )
                    }
                  })}
                </NotepadContent>
              </CyborgTextNotepad>
            );
          })}
        </ModalOverlay>
      )}
    </>
  );
};

export default Modals; 