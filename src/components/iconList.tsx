import * as React from 'react';
import { useState, MouseEvent, useEffect, useRef } from "react";
import { icon, iconLink, vcr } from "./index.module.css"
import styled from 'styled-components';

interface IconProps {
  selected: boolean;
}

const Icon = styled.li<IconProps>`
  display: flex;
  text-align: center;
  width: 120px;
  flex-direction: column;
  align-items: center;
  ${({ selected }) =>
        selected &&
        `
    background: rgba(100, 200, 200, 0.3);
    border: 2px dashed rgba(100, 200, 200, 0.9)
  `}

  img {
    width: 84px;
    height: 84px;
    object-fit: contain;
  }

  p {
    font-size: 14px;
    text-align: center;
    word-wrap: break-word;
    width: 100%;
  }
`;

const useOutsideClick = (ref, callback) => {
    const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            callback();
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    });
}

const randomNum = (max: number, min?: number) => Math.floor(Math.random() * max) + (min || 0);

interface IconsListProps {
  links: {
    text: string;
    url: string;
    icon: string;
  }[];
  onIconClick?: (url: string) => void;
  isOrganized?: boolean;
}

const IconsList: React.FC<IconsListProps> = ({ links, onIconClick, isOrganized = false }) => {
    const [selected, setSelected] = useState(links.map(l => null));
    const listRef = useRef(null);
    const [clicked, setClicked] = useState(links.map(l => false));
    const [dragging, setDragging] = useState(links.map(l => false));
    const [position, setPosition] = useState(links.map(l => ({ top: 0, left: 0 })));
    const [offset, setOffset] = useState(links.map(l => ({ x: 0, y: 0 })));
    const [latestClicked, setLatestClicked] = useState(null);

    useEffect(() => {
        if (isOrganized) {
            // Organize icons in a grid layout
            const GRID_START_X = 40;
            const GRID_START_Y = 40;
            const ICONS_PER_ROW = 4;
            const HORIZONTAL_SPACING = 120;
            const VERTICAL_SPACING = 120;

            const newPositions = links.map((_, index) => {
                const row = Math.floor(index / ICONS_PER_ROW);
                const col = index % ICONS_PER_ROW;
                return {
                    top: GRID_START_Y + (row * VERTICAL_SPACING),
                    left: GRID_START_X + (col * HORIZONTAL_SPACING)
                };
            });
            setPosition(newPositions);
        } else {
            // Random positions
            setPosition(links.map(l => ({
                top: randomNum(window.innerHeight - 240, 142),
                left: randomNum(window.innerWidth - 120)
            })));
        }
    }, [isOrganized, links.length]);

    useEffect(() => {
        let timer;
        if (latestClicked !== null && clicked[latestClicked])
            timer = setTimeout(() => { spliceState(setClicked, clicked, latestClicked, false) }, 300);
        return () => clearTimeout(timer);
    }, [clicked]);

    const handleSingleClick = async (event, index) => {
        event.preventDefault();
        await spliceState(setSelected, selected, index, true);
        const url = links[index].url;
        
        if (clicked[index]) {
            if (onIconClick && (url.startsWith('#'))) {
                onIconClick(url);
            } else {
                window.location.href = url;
            }
        }
        
        await spliceState(setClicked, clicked, index, true);
        await setLatestClicked(index);
    };

    const handleDoubleClick = (event) => {
        event.preventDefault();
        const url = event.currentTarget.href;
        if (onIconClick && url.includes('#')) {
            onIconClick(url);
        } else {
            window.location.href = url;
        }
    };

    const handleMouseDown = async (event, index) => {
        event.preventDefault();
        await spliceState(setDragging, dragging, index, true);
        await spliceState(setOffset, offset, index, {
            x: event.clientX - position[index].left,
            y: event.clientY - position[index].top,
        });
    };

    const spliceState = async (callback: CallableFunction, state: any, index: number, input: any) => {
        await callback([
            ...state.slice(0, index),
            input,
            ...state.slice(index + 1)
        ]);
    };

    const handleMouseMove = async (event, index) => {
        event.preventDefault();
        if (dragging[index]) {
            await spliceState(setPosition, position, index, {
                left: event.clientX - offset[index].x,
                top: event.clientY - offset[index].y,
            });
        }
    };

    const handleMouseUp = async (event, index) => {
        event.preventDefault();
        await spliceState(setDragging, dragging, index, false);
    };

    useOutsideClick(listRef, () => {
        selected.forEach((s, index) => {
            if (s)
                spliceState(setSelected, selected, index, null);
        });
    });

    return (
        <ul className={vcr}>
            {links.map((link, index) => (
                <li key={link.url} className={iconLink}
                    style={{ top: position[index].top, left: position[index].left }}>
                    <a ref={listRef} href={link.url}
                        onClick={(event: MouseEvent) => handleSingleClick(event, index)}
                        onDoubleClick={handleDoubleClick}
                        onMouseDown={(event) => handleMouseDown(event, index)}
                        onMouseMove={(event) => handleMouseMove(event, index)}
                        onMouseUp={(event) => handleMouseUp(event, index)}
                        draggable={true}
                    >
                        <Icon selected={selected[index]}>
                            <img src={link.icon} className={icon} alt={link.text} />
                            <p>{link.text}</p>
                        </Icon>
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default IconsList;
