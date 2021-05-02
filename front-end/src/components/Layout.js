import * as React from "react"
import { useMediaQuery } from "react-responsive"
import styled from "@emotion/styled"
import Div100vh from "react-div-100vh"
import ThreeDLogo from "./ThreeDLogo"
import Button from "./Button"
import { Link } from "gatsby"

/**
 * CSS
 */

const Title = styled.h1`
  position: fixed;
  left: 50%;
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 14px;
  transform: translateX(-50%);
  top: 12px;
  text-transform: uppercase;

	.breadcrumb {
		:hover {
			text-decoration: underline;
		}
	}
`
const Header = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    justify-content: space-between;
    align-items: center;
    align-content: space-between;
  }
  justify-content: space-between;
  align-items: flex-start;
  width: calc(100% - 75px);
`
const Border = styled.div`
  width: calc(100vw - 75px);
  height: calc(100% - 75px);
  position: fixed;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid var(--color-primary);
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
`

/**
 * HTML
 */
const Layout = props => {
	console.log(props);
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 768 })
    return isDesktop ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 })
    return isMobile ? children : null
  }
  return (
    <Div100vh>
      <Title className="sansFont">
        <Link to="/">
         <span className = "breadcrumb">Marcaz&nbsp;</span>
        </Link>
        {props.essayTitle}
      </Title>
      <Border>
        <Header>
          <Desktop>
            <ThreeDLogo onConnect = {props.onConnect} scaleOnConnect = "0.625" scale="0.5" />
            <div>
              <Button top="50" text="?"></Button>
              <Link to={`/${props.route}`}>
                <Button top="25" text={`${props.routeText}`}></Button>
              </Link>
            </div>
          </Desktop>
          <Mobile>
            <ThreeDLogo onConnect = {props.onConnect} scaleOnConnect = "0.5" scale="0.5" />
          </Mobile>
        </Header>
        {props.children}
      </Border>
    </Div100vh>
  )
}
export default Layout
