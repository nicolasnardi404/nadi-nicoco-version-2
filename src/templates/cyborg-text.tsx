import React from "react"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types"
import "../components/layout.css"
import { PoetryResponse } from "../types/GraphQLResponses"
import Layout from "../components/layout"
import styled from "styled-components"

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <b className="font-bold">{text}</b>,
  },
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      const { uri } = node.data
      return (
        <a href={uri} className="underline">
          {children}
        </a>
      )
    },
    [BLOCKS.HEADING_2]: (node, children) => {
      return <h2>{children}</h2>
    },
  },
}

const Poem = styled.div`
  margin-top: 8rem;
`

const CyborgText: React.FC<{
  pageContext: { cyborgText: PoetryResponse[] }
}> = ({ pageContext }) => {
  const { cyborgText } = pageContext

  function createMarkup(text) {
    return { __html: text }
  }

  return (
    <Layout>
      <div>
        {cyborgText.map(poetry => (
          <Poem>
            <h1>{poetry.title}</h1>
            {poetry.poem && renderRichText(poetry.poem, options)}
          </Poem>
        ))}
      </div>
    </Layout>
  )
}

export default CyborgText
