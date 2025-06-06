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
  // TODO: put art map in header
  // {
  //   text: "art map",
  //   url: "/art-map",
  //   icon: "icons/art-map.png"
  // },
  {
    text: "sound",
    url: "/x-sound",
    icon: "icons/x-sound.png",
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

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <IconsList links={links} />
    </Layout>
  )
}

export const Head = () => <Seo title="Home" />

export default IndexPage
