import * as React from 'react';
import { useState, MouseEvent, useEffect, useRef } from "react";

import Layout from "../components/layout"
import Seo from "../components/seo"
import { icon, iconLink, vcr } from "../components/index.module.css"
import styled from 'styled-components';

const links = [
  {
    text: "text me",
    url: "/text-me",
    icon: "icons/text-me.png"
  },
  // TODO: put art map in header
  // {
  //   text: "art map",
  //   url: "/art-map",
  //   icon: "icons/art-map.png"
  // },
  {
    text: "x-sound",
    url: "/x-sound",
    icon: "icons/x-sound.png"
  },
  {
    text: "x-art",
    url: "/x-art",
    icon: "icons/x-art.png"
  },
  {
    text: "cyborg-text",
    url: "/cyborg-text",
    icon: "icons/cyborg-text.png"
  },
]

const Icon = styled.li`
  display: flex;
  text-align: center;
  width: 88px;
  flex-direction: column;
  align-items: center;
  padding: 4px;
  ${({ selected }) =>
    selected &&
    `
    background: rgba(100, 200, 200, 0.3);
    border: 2px dashed rgba(100, 200, 200, 0.9)
  `}
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

const IndexPage = () => {
  const [selected, setSelected] = useState(null);
  const listRef = useRef(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    let timer;
    if (clicked)
      timer = setTimeout(() => { setClicked(false) }, 300);
    return () => clearTimeout(timer);
  }, [clicked]);


  const handleSingleClick = (event, index) => {
    setSelected(index)
    if (clicked)
      window.location = event.currentTarget.href
    event.preventDefault();
    setClicked(true);
  }


  useOutsideClick(listRef, () => setSelected(null));

  return (
    <Layout>
      <Seo title="Home" />
      <div>
        art map?
      </div>
      <ul className={vcr} >
        {links.map((link, index) => (

          <a key={index} ref={listRef} href={link.url} onClick={(event: MouseEvent) => handleSingleClick(event, index)} className={iconLink}>
            <Icon key={link.url} selected={selected === index} >
              <img src={link.icon} className={icon} />
              <p>{link.text}</p>
            </Icon>
          </a>
        ))}
      </ul>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
