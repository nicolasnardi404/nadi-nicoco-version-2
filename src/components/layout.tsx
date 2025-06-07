/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { ReactNode } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import StartMenu from "./StartMenu"
import Modals from "./Modals"
import RetroAds from "./RetroAds"
import "./layout.css"

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  // Add event listener for StartMenu actions
  React.useEffect(() => {
    const handleStartMenuAction = (event: CustomEvent<{ action: string }>) => {
      const { action } = event.detail;
      // Handle different actions here if needed
      switch(action) {
        case 'games':
          // Handle games action
          break;
        case 'iwanna':
          // Handle iwanna action
          break;
        case 'websites':
          // Handle websites action
          break;
        case 'cyborg-text':
          // Handle cyborg-text action
          break;
      }
    };

    window.addEventListener('startMenuAction', handleStartMenuAction as EventListener);
    return () => {
      window.removeEventListener('startMenuAction', handleStartMenuAction as EventListener);
    };
  }, []);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          paddingBottom: '30px', // Add padding to account for the taskbar
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `var(--space-5)`,
            fontSize: `var(--font-sm)`,
            textAlign: 'center',
            padding: '20px',
          }}
        >
          ©
        </footer>
      </div>
      <StartMenu />
      <Modals />
      <RetroAds />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
