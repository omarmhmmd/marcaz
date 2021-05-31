import * as React from "react"
import { Helmet } from "react-helmet"
import { useMediaQuery } from "react-responsive"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import Card from "../components/Card"
import Button from "../components/Button"
import styled from "@emotion/styled"

/**
 * CSS
 */
const Content = styled.div`
  margin-bottom: 37.5px;
	/* padding-top: 75px; */
  width: calc(100% - 75px);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  box-shadow: inset 0px 0px 10px #4a3829;
  /* background-color: green; */
  overflow-y: scroll;
`

const CardList = styled.div`
  /* padding-top: 37.5px; */
  /* background-color: green; */
  height: 100%;
  display: grid;
  align-items: center;
	align-content: flex-start;
	padding-top: 37.5px;
  justify-content: center;
  grid-gap: 37.5px;
  @media (max-width: 768px) {
		align-content: flex-start;
    overflow-y: scroll;
    padding-top: 100px;
  }
  grid-template-columns: repeat(3, 25vw);
  grid-auto-rows: calc(100% - 37.5px);
  @media (max-width: 1440px) {
    grid-template-columns: repeat(3, 25vw);
  }
  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, 32.5vw);
		grid-auto-rows: calc(100% - 75px);
		
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, calc(100% - 50px));
    grid-auto-rows: 62.5vh;
  }
`

export const query = graphql`
  query  {
    essays: allSanityEssay(sort: { fields: publishedAt, order: DESC }) {
      nodes {
        author {
          name
        }
        category
        mainImage {
          asset {
            fluid {
              src
            }
          }
        }
        slug {
          current
        }
        title
        publishedAt(formatString: "MMM DD, YYYY")
        description
      }
    }
		essayBody: allSanityEssay {
			nodes {
				_rawBody
			}
		}
  }
`

/**
 * HTML
 */
const Index = ({data}) => {
	//props.data
  const essays = data.essays.nodes

  // const essayBody = data.essayBody.nodes

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 768 })
    return isDesktop ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 })
    return isMobile ? children : null
  }

  return (
    <>
      <Helmet>
        <title>Marcaz</title>
      </Helmet>
      <Layout routeText="CONNECT" route="connect">
        <Desktop>
          <Content>
            <CardList>
              {essays.map(essay => (
                <Link
                  key={essay.slug.current}
                  style={{ height: "100%" }}
                  to={"/essay/" + essay.slug.current}
                >
                  <Card essay={essay} />
                </Link>
              ))}
            </CardList>
          </Content>
        </Desktop>
        <Mobile>
          <CardList>
            <div>
              <Button open={true} top="75" text="?"></Button>
              <Link to="/connect">
                <Button disabled={true} top="37.5" text="CONNECT"></Button>
              </Link>
            </div>
            {essays.map(essay => (
              <Link
                key={essay.slug.current}
                style={{ height: "100%" }}
                to={"/essay/" + essay.slug.current}
              >
                <Card essay={essay} />
              </Link>
            ))}
          </CardList>
        </Mobile>
      </Layout>
    </>
  )
}

export default Index
