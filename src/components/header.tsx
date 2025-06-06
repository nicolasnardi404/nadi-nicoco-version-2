import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled, { keyframes, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
`

const glitchAnimation = keyframes`
  0% {
    text-shadow: 2px 0 #fff, -2px 0 #fff;
    opacity: 1;
  }
  25% {
    text-shadow: -2px 0 #fff, 2px 0 #fff;
    opacity: 0.9;
  }
  50% {
    text-shadow: 2px 0 #fff, -2px 0 #fff;
    opacity: 1;
  }
  75% {
    text-shadow: -2px 0 #fff, 2px 0 #fff;
    opacity: 0.9;
  }
  100% {
    text-shadow: 2px 0 #fff, -2px 0 #fff;
    opacity: 1;
  }
`;

const scrollText = keyframes`
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
`;

const pixelateBackground = keyframes`
  0% { background-size: 100% 100%; }
  50% { background-size: 102% 102%; }
  100% { background-size: 100% 100%; }
`;

const Title = styled.header`
  background: #ff0000;
  background-size: 4px 4px;
  animation: ${pixelateBackground} 2s ease infinite;
  border: 4px solid #fff;
  border-style: double;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.8),
              inset 0 0 15px rgba(255, 0, 0, 0.8);
  padding: 12px;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Press Start 2P', cursive;
  overflow: hidden;
  white-space: nowrap;
`

const ScrollContainer = styled.div`
  display: inline-block;
  white-space: nowrap;
  animation: ${scrollText} 40s linear infinite;
  will-change: transform;
`

const TextContent = styled.div`
  display: inline-block;
  white-space: nowrap;
  padding-right: 50px;
  image-rendering: pixelated;
`

const StyledLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 16px;
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: ${glitchAnimation} 10s infinite;
  text-shadow: 2px 2px #cc0000,
               -2px -2px #cc0000;
  image-rendering: pixelated;
`

interface HeaderProps {
  siteTitle: string;
}

const Header: React.FC<HeaderProps> = ({ siteTitle }) => {
  const text = " WELCOME TO THE INTERNET ";
  const repeatedText = Array(20).fill(text).join("");
  
  return (
    <>
      <GlobalStyle />
      <Title>
        <ScrollContainer>
          <TextContent>
            <StyledLink to="/">
              {repeatedText}
            </StyledLink>
          </TextContent>
          <TextContent>
            <StyledLink to="/">
              {repeatedText}
            </StyledLink>
          </TextContent>
        </ScrollContainer>
      </Title>
    </>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
