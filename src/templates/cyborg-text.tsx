import React, { useState } from "react"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types"
import "../components/layout.css"
import { PoetryResponse } from "../types/GraphQLResponses"
import styled from "styled-components"

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <b style={{ fontWeight: 'bold', color: '#000' }}>{text}</b>,
  },
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      const { uri } = node.data
      return (
        <a href={uri} style={{ color: '#000', textDecoration: 'underline' }}>
          {children}
        </a>
      )
    },
    [BLOCKS.HEADING_2]: (node, children) => {
      return <h2 style={{ fontSize: '16px', fontWeight: 'bold', margin: '10px 0', color: '#000' }}>{children}</h2>
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <p style={{ whiteSpace: 'pre-wrap', margin: '0 0 1em 0', color: '#000' }}>{children}</p>
    },
    [BLOCKS.TEXT]: text => {
      return <span style={{ whiteSpace: 'pre-wrap', color: '#000' }}>{text}</span>
    }
  },
}

// Windows 90s Desktop Container
const Desktop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #008080;
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 11px;
  overflow: hidden;
`

// Taskbar at bottom
const Taskbar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
  background: linear-gradient(to bottom, #c0c0c0 0%, #808080 100%);
  border-top: 1px solid #ffffff;
  display: flex;
  align-items: center;
  padding: 0 4px;
  box-shadow: inset 0 1px 0 #ffffff;
`

// Start Button
const StartButton = styled.button`
  height: 22px;
  padding: 0 8px;
  background: linear-gradient(to bottom, #c0c0c0 0%, #808080 100%);
  border: 1px outset #c0c0c0;
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 11px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  &:active {
    border: 1px inset #c0c0c0;
  }
`

// Window Frame
const WindowFrame = styled.div`
  position: absolute;
  background: #c0c0c0;
  border: 2px outset #c0c0c0;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  min-width: 400px;
  max-width: 80vw;
  max-height: 80vh;
  overflow: hidden;
`

// Window Title Bar
const TitleBar = styled.div`
  height: 18px;
  background: linear-gradient(to right, #000080 0%, #000040 100%);
  color: white;
  font-size: 11px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
  cursor: move;
`

// Window Controls
const WindowControls = styled.div`
  display: flex;
  gap: 2px;
`

const WindowButton = styled.button`
  width: 16px;
  height: 14px;
  background: #c0c0c0;
  border: 1px outset #c0c0c0;
  font-size: 8px;
  cursor: pointer;
  
  &:active {
    border: 1px inset #c0c0c0;
  }
`

// Window Content Area
const WindowContent = styled.div`
  padding: 8px;
  background: white;
  height: calc(100% - 18px);
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
  color: #000;
`

// Desktop Icons
const DesktopIcon = styled.div`
  position: absolute;
  width: 80px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    background: rgba(255,255,255,0.1);
  }
  
  &.selected {
    background: rgba(0,0,128,0.3);
    color: white;
  }
`

const IconImage = styled.div`
  width:80px;
  height: 80px;
  background: transparent;

  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const IconLabel = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: white;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.8);
  word-wrap: break-word;
  max-width: 76px;
  margin-top: -20px;
`

const CyborgText: React.FC<{
  pageContext: { cyborgText: PoetryResponse[] }
}> = ({ pageContext }) => {
  const { cyborgText } = pageContext
  const [openWindows, setOpenWindows] = useState<number[]>([])
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null)
  const [iconPositions, setIconPositions] = useState<{[key: string]: {x: number, y: number}}>({})
  const [dragging, setDragging] = useState<{id: string, offsetX: number, offsetY: number} | null>(null)
  const [windowPositions, setWindowPositions] = useState<{[key: number]: {x: number, y: number}}>({})
  const [draggingWindow, setDraggingWindow] = useState<{id: number, offsetX: number, offsetY: number} | null>(null)

  // Initialize default positions for icons
  React.useEffect(() => {
    const defaultPositions: {[key: string]: {x: number, y: number}} = {}
    
    // Get usable screen dimensions
    const maxWidth = window.innerWidth - 100 // Leave space from right edge
    const maxHeight = window.innerHeight - 100 // Leave space for taskbar
    
    // Poetry icons - arranged in a fixed grid
    const GRID_START_X = 40  // Starting X position
    const GRID_START_Y = 40  // Starting Y position
    const ICONS_PER_ROW = 4  // Number of icons per row
    const HORIZONTAL_SPACING = 200  // Space between icons horizontally
    const VERTICAL_SPACING = 180    // Space between rows
    
    cyborgText.forEach((poetry, index) => {
      const row = Math.floor(index / ICONS_PER_ROW)
      const col = index % ICONS_PER_ROW
      
      const x = GRID_START_X + (col * HORIZONTAL_SPACING)
      const y = GRID_START_Y + (row * VERTICAL_SPACING)
      
      defaultPositions[`poetry-${index}`] = {
        x: Math.min(x, maxWidth),
        y: Math.min(y, maxHeight)
      }
    })
    
    // System icons - fixed positions on the right side
    defaultPositions['recycle-bin'] = { x: window.innerWidth - 120, y: 40 }
    defaultPositions['my-computer'] = { x: window.innerWidth - 120, y: 160 }
    
    setIconPositions(defaultPositions)
  }, [cyborgText])

  const openWindow = (index: number) => {
    if (!openWindows.includes(index)) {
      setOpenWindows([...openWindows, index])
      // Set initial window position if not already set
      if (!windowPositions[index]) {
        setWindowPositions(prev => ({
          ...prev,
          [index]: { 
            x: 100 + (index * 30), 
            y: 50 + (index * 30) 
          }
        }))
      }
    }
  }

  const closeWindow = (index: number) => {
    setOpenWindows(openWindows.filter(i => i !== index))
  }

  const handleMouseDown = (e: React.MouseEvent, iconId: string) => {
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    setDragging({
      id: iconId,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top
    })
  }

  const handleWindowMouseDown = (e: React.MouseEvent, windowId: number) => {
    e.preventDefault()
    e.stopPropagation()
    const rect = e.currentTarget.closest('[data-window]')?.getBoundingClientRect()
    if (rect) {
      setDraggingWindow({
        id: windowId,
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      const newX = e.clientX - dragging.offsetX
      const newY = e.clientY - dragging.offsetY
      
      // Keep icons within screen bounds
      const boundedX = Math.max(0, Math.min(window.innerWidth - 64, newX))
      const boundedY = Math.max(0, Math.min(window.innerHeight - 94, newY)) // Account for taskbar
      
      setIconPositions(prev => ({
        ...prev,
        [dragging.id]: { x: boundedX, y: boundedY }
      }))
    }
    
    if (draggingWindow) {
      const newX = e.clientX - draggingWindow.offsetX
      const newY = e.clientY - draggingWindow.offsetY
      
      // Keep windows within screen bounds (with some padding)
      const boundedX = Math.max(0, Math.min(window.innerWidth - 400, newX))
      const boundedY = Math.max(0, Math.min(window.innerHeight - 450, newY)) // Account for taskbar and window height
      
      setWindowPositions(prev => ({
        ...prev,
        [draggingWindow.id]: { x: boundedX, y: boundedY }
      }))
    }
  }

  const handleMouseUp = () => {
    setDragging(null)
    setDraggingWindow(null)
  }

  const handleIconClick = (e: React.MouseEvent, index?: number) => {
    e.stopPropagation()
    if (typeof index === 'number') {
      setSelectedIcon(index)
    } else {
      setSelectedIcon(null)
    }
  }

  const handleIconDoubleClick = (e: React.MouseEvent, index?: number) => {
    e.stopPropagation()
    if (typeof index === 'number') {
      openWindow(index)
    }
  }

  return (
    <Desktop 
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={() => setSelectedIcon(null)}
    >
      {/* Desktop Icons */}
      {cyborgText.map((poetry, index) => {
        const iconId = `poetry-${index}`
        const position = iconPositions[iconId] || { x: 20, y: 20 + (index * 80) }
        
        return (
          <DesktopIcon
            key={poetry.id}
            style={{
              top: position.y,
              left: position.x,
              cursor: dragging?.id === iconId ? 'grabbing' : 'grab'
            }}
            className={selectedIcon === index ? 'selected' : ''}
            onMouseDown={(e) => handleMouseDown(e, iconId)}
            onClick={(e) => handleIconClick(e, index)}
            onDoubleClick={(e) => handleIconDoubleClick(e, index)}
          >
            <IconImage>
              <img src="/icons/folder-icon.png" alt="Folder" />
            </IconImage>
            <IconLabel>{poetry.title}</IconLabel>
          </DesktopIcon>
        )
      })}

      {/* Recycle Bin */}
      <DesktopIcon 
        style={{ 
          top: iconPositions['recycle-bin']?.y || 20, 
          left: iconPositions['recycle-bin']?.x || (window.innerWidth - 84),
          cursor: dragging?.id === 'recycle-bin' ? 'grabbing' : 'grab'
        }}
        onMouseDown={(e) => handleMouseDown(e, 'recycle-bin')}
        onClick={(e) => handleIconClick(e)}
      >
        <IconImage>
          <img src="/icons/folder-icon.png" alt="Folder" />
        </IconImage>
        <IconLabel>Recycle Bin</IconLabel>
      </DesktopIcon>

      {/* My Computer */}
      <DesktopIcon 
        style={{ 
          top: iconPositions['my-computer']?.y || 100, 
          left: iconPositions['my-computer']?.x || (window.innerWidth - 84),
          cursor: dragging?.id === 'my-computer' ? 'grabbing' : 'grab'
        }}
        onMouseDown={(e) => handleMouseDown(e, 'my-computer')}
        onClick={(e) => handleIconClick(e)}
      >
        <IconImage>
          <img src="/icons/folder-icon.png" alt="Folder" />
        </IconImage>
        <IconLabel>My Computer</IconLabel>
      </DesktopIcon>

      {/* Open Windows */}
      {openWindows.map((windowIndex) => {
        const poetry = cyborgText[windowIndex]
        const windowPosition = windowPositions[windowIndex] || { x: 100 + (windowIndex * 30), y: 50 + (windowIndex * 30) }
        
        return (
          <WindowFrame
            key={`window-${windowIndex}`}
            data-window
            style={{
              top: windowPosition.y,
              left: windowPosition.x,
              width: '600px',
              height: '400px'
            }}
          >
            <TitleBar
              onMouseDown={(e) => handleWindowMouseDown(e, windowIndex)}
              style={{
                cursor: draggingWindow?.id === windowIndex ? 'grabbing' : 'move'
              }}
            >
              <span>📝 {poetry.title} - Notepad</span>
              <WindowControls>
                <WindowButton>_</WindowButton>
                <WindowButton>□</WindowButton>
                <WindowButton onClick={() => closeWindow(windowIndex)}>×</WindowButton>
              </WindowControls>
            </TitleBar>
            <WindowContent>
              <div style={{ marginBottom: '16px' }}>
                <strong>File: {poetry.title}</strong>
                <br />
                <small>Date: {poetry.date || 'Unknown'}</small>
              </div>
              <hr style={{ border: '1px inset #c0c0c0', margin: '8px 0' }} />
              <div style={{ whiteSpace: 'pre-wrap' }}>
                {poetry.poem && renderRichText(poetry.poem, options)}
              </div>
            </WindowContent>
          </WindowFrame>
        )
      })}

      {/* Taskbar */}
      <Taskbar>
        <StartButton>
          🪟 Start
        </StartButton>
        <div style={{ flex: 1 }}></div>
        <div style={{ 
          background: 'inset 1px #c0c0c0', 
          padding: '2px 8px', 
          border: '1px inset #c0c0c0',
          fontSize: '10px'
        }}>
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </Taskbar>
    </Desktop>
  )
}

export default CyborgText
