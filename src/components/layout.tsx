/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { ReactNode, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, navigate } from "gatsby"
import Loading from './Loading'
import styled from 'styled-components'

import Header from "./header"
import StartMenu from "./StartMenu"
import Modals from "./Modals"
import RetroAds from "./RetroAds"
import "./layout.css"

interface LayoutProps {
  children: ReactNode;
}

const LayoutWrapper = styled.div`
  min-height: 100vh;
  position: relative;
`;

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

  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add event listener for StartMenu actions
  React.useEffect(() => {
    const handleStartMenuAction = (event: CustomEvent<{ action: string }>) => {
      const { action } = event.detail;
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

  // Handle page transitions and initial load
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const handleRouteChange = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    window.addEventListener('gatsby-route-change', handleRouteChange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('gatsby-route-change', handleRouteChange);
    };
  }, []);

  // Handle link clicks
  const handleLinkClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLAnchorElement;
    if (
      target.tagName === 'A' && 
      target.getAttribute('href')?.startsWith('/') &&
      !target.getAttribute('href').startsWith('/#')
    ) {
      e.preventDefault();
      setIsLoading(true);
      setTimeout(() => {
        navigate(target.getAttribute('href') || '/');
      }, 500);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <LayoutWrapper onClick={handleLinkClick}>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          paddingBottom: '30px',
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
      {!isMobile && <RetroAds />}
    </LayoutWrapper>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
