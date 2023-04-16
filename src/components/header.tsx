import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components";
import { header } from "./index.module.css";

const Title = styled.header`
  `

// text-shadow: 19px 34px 0px #1f16e5, -2px -1px 0px #e51616, 14px 24px 0px #e51616;
const Header = ({ siteTitle }) => (
  <Title className={header}>
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
