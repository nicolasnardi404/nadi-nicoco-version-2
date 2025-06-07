import * as React from "react"
import { useState, useEffect } from "react"
import styled from "styled-components"

const Taskbar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  display: flex;
  align-items: center;
  padding: 0 2px;
  z-index: 9999;
`;

const SystemTray = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  padding: 0 4px;
  gap: 4px;
  height: 22px;
  border-left: 2px solid #808080;
`;

const SystemIcon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Clock = styled.div`
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 11px;
  padding: 2px 4px;
  border: 1px solid #808080;
  background: #c0c0c0;
  cursor: pointer;
  
  &:hover {
    background: #d0d0d0;
  }
`;

const StartButton = styled.button`
  height: 26px;
  padding: 0 8px;
  background: #c0c0c0;
  border: 2px solid #fff;
  border-right-color: #000;
  border-bottom-color: #000;
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &:active {
    border: 2px solid #000;
    border-right-color: #fff;
    border-bottom-color: #fff;
    padding-top: 1px;
    padding-left: 9px;
  }
`;

const StartMenuContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: 30px;
  left: 0;
  width: 220px;
  background: #c0c0c0;
  border: 2px solid #fff;
  border-right-color: #000;
  border-bottom-color: #000;
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 9999;
`;

const MenuItem = styled.a`
  display: flex;
  align-items: center;
  text-align: center;
  padding: 6px 12px;
  text-decoration: none;
  color: #000;
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 12px;
  gap: 12px;
  min-height: 32px;
  
  &:hover {
    background: #000080;
    color: #fff;
  }

  img {
    width: 32px;
    height: 32px;
    object-fit: contain;
    flex-shrink: 0;
    margin: auto 0;
  }

  span {
    line-height: 16px;
    text-transform: capitalize;
  }
`;

const MenuDivider = styled.div`
  height: 1px;
  background: #808080;
  margin: 4px 0;
`;

interface Link {
  text: string;
  url: string;
  icon: string;
}

// Define the links array
const links: Link[] = [
  {
    text: "NADI NICOCO",
    url: "/",
    icon: "/icons/pencil-icon.png",
  },
  {
    text: "about",
    url: "/text-me",
    icon: "/icons/smile-icon.png",
  },
  {
    text: "games",
    url: "#games",
    icon: "/icons/game-icon.png",
  },
  {
    text: "the copy",
    url: "#iwanna",
    icon: "/icons/iwannabenadinicoco-icon.png",
  },
  {
    text: "websites",
    url: "#websites",
    icon: "/icons/internet-icon.png",
  },
  {
    text: "music",
    url: "/x-sound",
    icon: "/icons/tape-icon.png",
  },
  {
    text: "movies",
    url: "/movies",
    icon: "/icons/camera-icon.png",
  },
  {
    text: "video art",
    url: "/x-art",
    icon: "/icons/computer-icon.png",
  },
  {
    text: "cyborg-text",
    url: "#cyborg-text",
    icon: "/icons/writing-icon.png",
  },
];

interface StartMenuProps {}

const StartMenu = (props: StartMenuProps): JSX.Element => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM AM/PM
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleStartClick = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  const handleMenuItemClick = (url: string) => {
    setIsStartMenuOpen(false);
    if (url.startsWith('#')) {
      // Handle special cases like games, websites, etc.
      const hash = url.substring(1);
      // You can emit a custom event that the parent component can listen to
      window.dispatchEvent(new CustomEvent('startMenuAction', { 
        detail: { action: hash } 
      }));
    } else {
      window.location.href = url;
    }
  };

  return (
    <>
      <Taskbar>
        <StartButton onClick={handleStartClick}>
          <span>🪟</span> Start
        </StartButton>
        <SystemTray>
          <SystemIcon title="Volume">🔊</SystemIcon>
          <SystemIcon title="Network">📶</SystemIcon>
          <Clock title={time.toLocaleDateString()}>
            {formatTime(time)}
          </Clock>
        </SystemTray>
      </Taskbar>
      
      <StartMenuContainer isOpen={isStartMenuOpen}>
        {/* NADI NICOCO link */}
        <MenuItem 
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleMenuItemClick("/");
          }}
        >
          <img src="/icons/pencil-icon.png" alt="NADI NICOCO" />
          <span>NADI NICOCO</span>
        </MenuItem>
        <MenuDivider />
        
        {/* Other menu items */}
        {links.slice(1).map((link) => (
          <MenuItem 
            key={link.url}
            href={link.url}
            onClick={(e) => {
              e.preventDefault();
              handleMenuItemClick(link.url);
            }}
          >
            <img src={link.icon} alt={link.text} />
            <span>{link.text}</span>
          </MenuItem>
        ))}
      </StartMenuContainer>
    </>
  );
};

export default StartMenu; 