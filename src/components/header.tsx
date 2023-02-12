import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"

const Title = styled.header`
  padding: 2rem;
  font-family: 'VCR OSD Mono', sans-serif;
  font-weight: 700;
  font-size: 3.75rem;
  letter-spacing: 0.02em;
  text-align: left;
  color: #FFF;
  text-shadow: -0.13rem -0.06rem 0px #e51616, 0.9rem 3.6rem 0px #e51616, 1.26rem 4.12rem 0px #1f16e5;
  `

// text-shadow: 19px 34px 0px #1f16e5, -2px -1px 0px #e51616, 14px 24px 0px #e51616;
const Header = ({ siteTitle }) => (
  <Title>
    <Link
      to="/"
      style={{
        color: `#1f16e5`,
        textDecoration: `none`,
      }}
    >
      welcome to nicoco
    </Link>
  </Title>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
