import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled, { keyframes } from "styled-components";

const glitchAnimation = keyframes`
  0% {
    text-shadow: 2px 0 #ff00ea, -2px 0 #00ff9d;
  }
  25% {
    text-shadow: -2px 0 #ff00ea, 2px 0 #00ff9d;
  }
  50% {
    text-shadow: 2px 0 #ff00ea, -2px 0 #00ff9d;
  }
  75% {
    text-shadow: -2px 0 #ff00ea, 2px 0 #00ff9d;
  }
  100% {
    text-shadow: 2px 0 #ff00ea, -2px 0 #00ff9d;
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

const rainbowBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Title = styled.header`
  background: linear-gradient(45deg, #ff00ea, #00ff9d, #ff00ea, #00ff9d);
  background-size: 400% 400%;
  animation: ${rainbowBackground} 15s ease infinite;
  border: 2px solid #fff;
  border-right-color: #000;
  border-bottom-color: #000;
  box-shadow: inset -1px -1px #858585, inset 1px 1px #dadada,
              0 0 15px rgba(255, 0, 234, 0.5),
              0 0 25px rgba(0, 255, 157, 0.3);
  padding: 8px;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'MS Sans Serif', sans-serif;
  overflow: hidden;
  white-space: nowrap;
`

const ScrollContainer = styled.div`
  display: inline-block;
  white-space: nowrap;
  animation: ${scrollText} 20s linear infinite;
  will-change: transform;
`

const TextContent = styled.div`
  display: inline-block;
  white-space: nowrap;
  padding-right: 50px;
`

const StyledLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: ${glitchAnimation} 10s infinite;
  text-shadow: 0 0 5px #fff,
               0 0 10px #fff,
               0 0 15px #ff00ea,
               0 0 20px #00ff9d;
`

interface HeaderProps {
  siteTitle: string;
}

// text-shadow: 19px 34px 0px #1f16e5, -2px -1px 0px #e51616, 14px 24px 0px #e51616;
const Header: React.FC<HeaderProps> = ({ siteTitle }) => {
  const text = "🖥️ WELCOME TO THE INTERNET ";
  const repeatedText = Array(20).fill(text).join("");
  
  return (
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
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
