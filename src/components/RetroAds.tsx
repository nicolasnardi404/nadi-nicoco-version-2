import * as React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import styled, { keyframes } from "styled-components"

const blink = keyframes`
  0% { background: #ff0000; }
  50% { background: #ff6b6b; }
  100% { background: #ff0000; }
`;

const shake = keyframes`
  0% { transform: translate(0, 0); }
  25% { transform: translate(5px, 0); }
  50% { transform: translate(0, 0); }
  75% { transform: translate(-5px, 0); }
  100% { transform: translate(0, 0); }
`;

const AdWindow = styled.div<{ x: number; y: number; isDragging: boolean; zIndex: number }>`
  position: fixed;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  width: 400px;
  background: #c0c0c0;
  border: 2px solid #fff;
  border-right-color: #000;
  border-bottom-color: #000;
  font-family: 'MS Sans Serif', sans-serif;
  z-index: ${props => props.zIndex};
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  user-select: none;
  transition: ${props => props.isDragging ? 'none' : 'all 0.1s ease'};
  opacity: ${props => props.isDragging ? 0.8 : 1};

  @media (max-width: 768px) {
    display: none;
  }
`;

const TitleBar = styled.div`
  background: linear-gradient(90deg, #000080, #1084d0);
  color: white;
  padding: 3px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 12px;
  cursor: move;
`;

const CloseButton = styled.button`
  background: #c0c0c0;
  border: 1px solid #fff;
  border-right-color: #000;
  border-bottom-color: #000;
  padding: 0 5px;
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 12px;
  cursor: pointer;

  &:active {
    border: 1px solid #000;
    border-right-color: #fff;
    border-bottom-color: #fff;
  }
`;

const AdContent = styled.div`
  padding: 15px;
  background: white;
  font-size: 12px;
  text-align: center;
`;

const BlinkingButton = styled.button`
  animation: ${blink} 1s infinite;
  border: 2px solid #fff;
  border-right-color: #000;
  border-bottom-color: #000;
  padding: 8px 15px;
  margin: 10px 0;
  color: white;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    animation: ${shake} 0.5s infinite;
  }
`;

const MarqueeText = styled.div`
  color: #ff0000;
  font-weight: bold;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  


  @keyframes scroll {
    from { transform: translateX(100%); }
    to { transform: translateX(-100%); }
  }
`;

const VideoContainer = styled.div`
  margin: 10px 0;
  border: 2px inset #c0c0c0;
`;

const ImageContainer = styled.div`
  background: #000;
  padding: 10px;
  margin: 10px 0;
  border: 2px inset #c0c0c0;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: auto;
    max-width: 100%;
    height: auto;
    display: block;
    transition: filter 0.3s ease;
  }

  &:hover img {
    filter: none !important;
  }

  &:hover p {
    opacity: 0;
  }

  p {
    color: white;
    font-size: 10px;
    text-align: center;
    margin-top: 5px;
    transition: opacity 0.3s ease;
    position: absolute;
    bottom: 10px;
    width: 100%;
    left: 0;
    text-shadow: 1px 1px 2px black;
  }
`;

const InstagramLink = styled.a`
  color: #000080;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const WarningText = styled.div`
  background: #000080;
  color: #fff;
  padding: 5px;
  margin: 5px 0;
  text-align: center;
  font-size: 11px;
  border: 2px solid #fff;
  animation: ${blink} 2s infinite;
`;

const ArtCredit = styled.div`
  font-size: 10px;
  color: #666;
  text-align: center;
  margin-top: 10px;
  font-family: 'MS Sans Serif', sans-serif;
`;

const rainbowShift = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;

const wiggle = keyframes`
  0%, 100% { transform: rotate(-4deg); }
  50% { transform: rotate(4deg); }
`;

const bob = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.2; transform: scale(0.6); }
`;

const StudioBanner = styled.div`
  position: relative;
  margin: -15px -15px 12px;
  padding: 14px 10px 12px;
  background: linear-gradient(90deg, #ff4fd8, #ffb84f, #fff34f, #4fff8a, #4fc3ff, #b44fff, #ff4fd8);
  background-size: 200% 100%;
  animation: ${rainbowShift} 4s linear infinite;
  border-bottom: 2px solid #000;
`;

const StudioTitle = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #fff;
  text-shadow: 2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000;
`;

const StudioSubtitle = styled.div`
  font-size: 11px;
  font-weight: bold;
  color: #000;
  margin-top: 4px;
`;

const Sparkle = styled.span<{ top: string; left: string; delay: string }>`
  position: absolute;
  top: ${p => p.top};
  left: ${p => p.left};
  font-size: 14px;
  animation: ${twinkle} 1.4s ease-in-out infinite;
  animation-delay: ${p => p.delay};
  pointer-events: none;
`;

const NewSticker = styled.div`
  position: absolute;
  top: -6px;
  right: -4px;
  width: 46px;
  height: 46px;
  line-height: 46px;
  background: #ffef00;
  color: #ff0000;
  font-weight: bold;
  font-size: 12px;
  clip-path: polygon(50% 0%, 61% 18%, 82% 10%, 78% 32%, 100% 39%, 84% 55%, 96% 75%, 73% 76%, 68% 100%, 50% 86%, 32% 100%, 27% 76%, 4% 75%, 16% 55%, 0% 39%, 22% 32%, 18% 10%, 39% 18%);
  animation: ${wiggle} 0.8s ease-in-out infinite;
`;

const ToolGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 10px 0;
`;

const ToolTile = styled.div<{ delay: string }>`
  background: #fffbe8;
  border: 2px solid #000;
  box-shadow: 3px 3px 0 #000;
  padding: 6px 2px 4px;
  font-size: 9px;
  font-weight: bold;
  text-transform: uppercase;

  svg {
    display: block;
    margin: 0 auto 4px;
    animation: ${bob} 1.6s ease-in-out infinite;
    animation-delay: ${p => p.delay};
  }
`;

// Tiny pixel-art drawings: each row is a string, each char maps to a color
const PIXEL_COLORS: { [key: string]: string } = {
  k: "#000", w: "#fff", r: "#ff3b3b", p: "#ff4fd8", o: "#ffa53b", y: "#ffe23b",
  g: "#3bd16f", b: "#3b8bff", v: "#9b4fff", t: "#c98a4b", s: "#ffd1a8", c: "#4fe3ff",
};

const PixelArt: React.FC<{ art: string[]; size?: number }> = ({ art, size = 32 }) => (
  <svg width={size} height={size} viewBox={`0 0 ${art[0].length} ${art.length}`} shapeRendering="crispEdges">
    {art.flatMap((row, y) =>
      row.split("").map((ch, x) =>
        PIXEL_COLORS[ch] ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={PIXEL_COLORS[ch]} /> : null
      )
    )}
  </svg>
);

const STUDIO_TOOLS: { name: string; art: string[] }[] = [
  {
    name: "Pixel Animator",
    art: [
      "..kkkkkkk...",
      ".kwwwwwwwk..",
      "kwrrwwwbbwk.",
      "kwrrwwwbbwk.",
      "kwwwwwwwwwwk",
      "kwyywwwggwwk",
      "kwyywwwggwwk",
      "kwwwwwwwwwk.",
      ".kwwwkkkkk..",
      "..kkk.......",
    ],
  },
  {
    name: "Kinetic Type",
    art: [
      "kkkkkkkkkk..",
      "kppppppppk..",
      "kkkkppkkkk..",
      "...kppk.....",
      "...kppk..kk.",
      "...kppk.kyyk",
      "...kppk.kyyk",
      "...kppk..kk.",
      "...kppk.....",
      "...kkkk.....",
    ],
  },
  {
    name: "Gradients",
    art: [
      "............",
      "..kkkkkkkk..",
      ".kprroyygbk.",
      ".kprroyygbk.",
      ".kprroyygbk.",
      ".kprroyygbk.",
      ".kprroyygbk.",
      "..kkkkkkkk..",
      "............",
      "............",
    ],
  },
  {
    name: "3D Scenes",
    art: [
      "....kkkk....",
      "..kkccccdkk.",
      "kkccccccckkk",
      "kbkkcccckvvk",
      "kbbbkkkkvvvk",
      "kbbbbbkvvvvk",
      "kbbbbbkvvvvk",
      ".kkbbbkvvkk.",
      "...kkbkkk...",
      ".....k......",
    ].map(r => r.replace(/d/g, "c")),
  },
  {
    name: "Hand Synth",
    art: [
      "....k.k.....",
      "...ksksk.k..",
      "...ksksksk..",
      ".k.ksksksk..",
      "ksk.sssssk..",
      ".ksssssssk..",
      "..ksssssk...",
      "...ksssk....",
      "...ksssk....",
      "...kkkkk....",
    ],
  },
  {
    name: "Music Synth",
    art: [
      "....kkkkkkk.",
      "....kvvvvvk.",
      "....kkkkkvk.",
      "....k....vk.",
      "....k....vk.",
      "....k..kkvk.",
      "..kkk.kvvvk.",
      ".kvvvk.kkk..",
      ".kvvvk......",
      "..kkk.......",
    ],
  },
];

interface Ad {
  id: number;
  title: string;
  content: React.ReactNode;
  x: number;
  y: number;
}

const ads: Ad[] = [
  {
    id: 1,
    title: "🎨 FREE CREATIVE TOOLS INSIDE! 🎨",
    content: (
      <>
        <StudioBanner>
          <Sparkle top="6px" left="12px" delay="0s">✦</Sparkle>
          <Sparkle top="30px" left="40px" delay="0.5s">✧</Sparkle>
          <Sparkle top="8px" left="300px" delay="0.9s">✦</Sparkle>
          <Sparkle top="34px" left="270px" delay="0.3s">✧</Sparkle>
          <NewSticker>NEW!</NewSticker>
          <StudioTitle>NICOCO'S STUDIO</StudioTitle>
          <StudioSubtitle>~ experimental toolbox for creatives ~</StudioSubtitle>
        </StudioBanner>
        <ToolGrid>
          {STUDIO_TOOLS.map((tool, i) => (
            <ToolTile key={tool.name} delay={`${i * 0.2}s`}>
              <PixelArt art={tool.art} />
              {tool.name}
            </ToolTile>
          ))}
        </ToolGrid>
        <p style={{ margin: "8px 0", fontWeight: "bold" }}>
          ...and video lab, photo lab, cosmic playground & MORE!!!
        </p>
        <WarningText>
          !!! 10 TOOLS - 100% FREE - NO DOWNLOAD !!!
        </WarningText>
        <BlinkingButton onClick={() => window.open("https://studio.nadinicoco.com", "_blank")}>
          ENTER THE STUDIO NOW!
        </BlinkingButton>
      </>
    ),
    x: 0,
    y: 0
  },
  {
    id: 2,
    title: "🎬 META MENTAL - WATCH NOW! 🎬",
    content: (
      <>
        <VideoContainer>
          <iframe 
            width="100%" 
            height="215" 
            src="https://www.youtube.com/embed/7ANS9e6f_wU?si=emOAKy5q8OzVjIqX" 
            title="META MENTAL" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        </VideoContainer>
        <BlinkingButton onClick={() => window.open("https://www.youtube.com/watch?v=7ANS9e6f_wU", "_blank")}>
          WATCH FULL VIDEO
        </BlinkingButton>
      </>
    ),
    x: 0,
    y: 0
  },
  {
    id: 3,
    title: "🎉 CONGRATULATIONS! 🎉",
    content: (
      <>
        <h2 style={{ color: "#ff0000", margin: "10px 0" }}>
          YOU ARE THE 1,000,000th VISITOR!
        </h2>
        <p>THANKS FOR SUPPORTING MY ART!</p>
        <p style={{ fontSize: "8px", color: "#999", marginTop: "10px" }}>
          *Offer valid until the end of internet
        </p>
      </>
    ),
    x: 0,
    y: 0
  },
  {
    id: 4,
    title: "🎭 LEAKED NUDE OF NADI NICOCO 🎭",
    content: (
      <>
        <MarqueeText data-text="⚠️ LEAKED NUDE OF NADI NICOCO ⚠️">
          ⚠️ LEAKED NUDE OF NADI NICOCO ⚠️
        </MarqueeText>
        <WarningText>
          !!! EXCLUSIVE CONTENT !!!
        </WarningText>
        <ImageContainer>
          <img 
            src="/icons/nicoco-jesus.jpeg" 
            alt="Performance Art Documentation" 
            style={{ 
              filter: "blur(20px)",
              maxHeight: "60vh"  // This ensures the image doesn't get too tall on large screens
            }}
          />
          <p>CLICK TO REVEAL THE TRUTH</p>
        </ImageContainer>
        <ArtCredit>
          <br/>
          Photo by:{" "}
          <InstagramLink 
            href="https://www.instagram.com/haut_lecoeur/" 
            target="_blank"
            rel="noopener noreferrer"
          >
            @haut_lecoeur
          </InstagramLink>
        </ArtCredit>
      </>
    ),
    x: 0,
    y: 0
  }
];

interface RetroAdsProps {}

const RetroAds: React.FC<RetroAdsProps> = () => {
  const [visibleAds, setVisibleAds] = useState<number[]>([]);
  const [shownAds, setShownAds] = useState<Set<number>>(new Set());
  const [positions, setPositions] = useState<{[key: number]: {x: number, y: number}}>({});
  const [draggingAd, setDraggingAd] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<{x: number, y: number}>({ x: 0, y: 0 });
  const [zIndexes, setZIndexes] = useState<{[key: number]: number}>({});
  const baseZIndex = 1000;
  const maxZIndex = 2000;
  const dragRef = useRef<{lastX: number; lastY: number}>({ lastX: 0, lastY: 0 });

  const showRandomAd = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    // Get all ads that haven't been shown yet
    const availableAds = ads.filter(ad => !shownAds.has(ad.id));
    
    if (availableAds.length > 0) {
      // Pick a random ad from available ones
      const randomAd = availableAds[Math.floor(Math.random() * availableAds.length)];
      
      // Calculate random position
      const x = Math.random() * (window.innerWidth - 400);
      const y = Math.random() * (window.innerHeight - 300);
      
      // Update visible ads and shown ads
      setVisibleAds(prev => [...prev, randomAd.id]);
      setShownAds(prev => new Set([...prev, randomAd.id]));
      setPositions(prev => ({
        ...prev,
        [randomAd.id]: { x, y }
      }));
      
      // Set highest z-index for new ad
      const newZIndex = Math.max(...Object.values(zIndexes), baseZIndex) + 1;
      setZIndexes(prev => ({
        ...prev,
        [randomAd.id]: newZIndex
      }));
    }
  }, [shownAds, zIndexes]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Show first ad after 5 seconds
    const initialTimer = setTimeout(() => {
      showRandomAd();
    }, 10000);

    // Show subsequent ads every 15 seconds until all ads are shown
    const intervalTimer = setInterval(() => {
      if (shownAds.size < ads.length) {
        showRandomAd();
      }
    }, 15000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [showRandomAd, shownAds]);

  const handleClose = (adId: number) => {
    setVisibleAds(prev => prev.filter(id => id !== adId));
  };

  const bringToFront = (adId: number) => {
    const currentHighest = Math.max(...Object.values(zIndexes), baseZIndex);
    const newZIndex = currentHighest >= maxZIndex ? baseZIndex : currentHighest + 1;
    
    if (currentHighest >= maxZIndex) {
      const sortedAds = Object.entries(zIndexes)
        .sort(([, a], [, b]) => a - b)
        .map(([id]) => parseInt(id));
      
      const newIndexes = sortedAds.reduce((acc, id, index) => ({
        ...acc,
        [id]: baseZIndex + index
      }), {});
      
      setZIndexes({
        ...newIndexes,
        [adId]: baseZIndex + sortedAds.length
      });
    } else {
      setZIndexes(prev => ({
        ...prev,
        [adId]: newZIndex
      }));
    }
  };

  const handleMouseDown = (e: React.MouseEvent, adId: number) => {
    if (e.target instanceof HTMLButtonElement) return; // Don't drag when clicking close button
    
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    setDraggingAd(adId);
    setDragOffset({ x: offsetX, y: offsetY });
    dragRef.current = {
      lastX: e.clientX,
      lastY: e.clientY
    };

    bringToFront(adId);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (typeof window === 'undefined' || draggingAd === null) return;
    
    e.preventDefault();
    
    // Calculate new position ensuring the window stays within viewport
    const newX = Math.max(0, Math.min(
      e.clientX - dragOffset.x,
      window.innerWidth - 400
    ));
    
    const newY = Math.max(0, Math.min(
      e.clientY - dragOffset.y,
      window.innerHeight - 300
    ));

    setPositions(prev => ({
      ...prev,
      [draggingAd]: { x: newX, y: newY }
    }));

    dragRef.current = {
      lastX: e.clientX,
      lastY: e.clientY
    };
  }, [draggingAd, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setDraggingAd(null);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || draggingAd === null) return;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingAd, handleMouseMove, handleMouseUp]);

  return (
    <>
      {ads.map(ad => visibleAds.includes(ad.id) && (
        <AdWindow 
          key={ad.id}
          x={positions[ad.id]?.x || ad.x}
          y={positions[ad.id]?.y || ad.y}
          isDragging={draggingAd === ad.id}
          zIndex={zIndexes[ad.id] || baseZIndex}
        >
          <TitleBar
            onMouseDown={(e) => handleMouseDown(e, ad.id)}
            style={{ 
              cursor: draggingAd === ad.id ? 'grabbing' : 'grab',
            }}
          >
            <span>{ad.title}</span>
            <CloseButton onClick={() => handleClose(ad.id)}>×</CloseButton>
          </TitleBar>
          <AdContent>
            {ad.content}
          </AdContent>
        </AdWindow>
      ))}
    </>
  );
};

export default RetroAds; 