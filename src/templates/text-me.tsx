import React from "react"
import "../components/layout.css"
import Layout from "../components/layout"

const CyborgText: React.FC = () => {
  return (
    <Layout>
      <div>
        <h1>Text me</h1>
        <p>
          check me in{" "}
          <a href="https://instagram.com/nadinicoco" target="_blank">
            instagram
          </a>{" "}
          for art or <a href="https://instagram.com/nicocotatus">tattoos</a>
        </p>
      </div>
    </Layout>
  )
}

export default CyborgText
