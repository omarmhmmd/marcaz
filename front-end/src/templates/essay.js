import * as React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import { useMediaQuery } from "react-responsive";
import Layout from "../components/Layout";
import Card from "../components/Card";
// import EssayCard from "../components/EssayCard";
import imageUrlBuilder from "@sanity/image-url";
import Button from "../components/Button";
const BlockContent = require("@sanity/block-content-to-react");

/**
 * CSS
 */
const Column = styled.div`
  flex-direction: column;
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    margin-top: 225px;
    width: calc(100% - 50px);
  }

  .heightCard {
    height: 100%;
  }
`;
const Test = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 18.75px;
  margin-bottom: 18.75px;

  img {
    @media (max-width: 768px) {
      height: auto;
      width: 100%;
    }
    box-sizing: border-box;
    border: 1px solid var(--color-primary);
  }

  h3 {
    margin-bottom: 0px !important;
    margin-top: 6px;
    font-size: 12px;
    line-height: 18px;
  }
`;
const Essay = styled.div`
  margin-top: 37.5px;
  P {
    font-size: 18px;
    line-height: var(--lineHeight-normal);
  }
  margin-bottom: 37.5px;
`;
const SocialLinks = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--color-primary);
  justify-content: space-around;
  padding: 12px;
  text-transform: uppercase;
  font-size: 14px;
  color: white;

  a:hover {
    text-decoration: underline;
  }
`;

/**
 * JS
 */
const EssayTemplate = (props) => {
  const data = props.data;
  const essays = data.essays.nodes[0];
  const essayBody = data.essayBody.nodes[0]._rawBody;

  const hasObject = (props) => {
    if (props !== null) {
      return true;
    }
  };
  let hasInstagram = false;
  if (essays.author.social.instagram !== null) {
    hasInstagram = true;
  }

  let hasTwitter = false;
  if (essays.author.social.twitter !== null) {
    hasTwitter = true;
  }

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 768 });
    return isDesktop ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    return isMobile ? children : null;
  };

  const urlFor = (source) =>
    imageUrlBuilder({ projectId: "7wi9kuqc", dataset: "production" }).image(
      source
    );

  /**
   * Essay Card
   */
  const EssayCard = (props) => {
    return (
      <Container>
        <div className="essayInfo">
          <Button disabled={true} text={props.essay.category.toUpperCase()} />
          <Title className="sansFont">{props.essay.title}</Title>
          <div className="info sansFont primaryColor">
            <h3 className="author">{props.essay.author.name}</h3>
            <br></br>
            <h3 className="date">{props.essay.publishedAt}</h3>
          </div>
        </div>
        <div className="essayImg">
          <img src={props.essay.mainImage.asset.fluid.src}></img>
        </div>
      </Container>
    );
  };

  const Title = styled.h1`
    text-transform: uppercase;
    width: calc(100% - 25px);
    text-align: center;

    font-size: var(--fontSize-5);
    @media (max-width: 1440px) {
      font-size: var(--fontSize-4);
    }
    @media (max-width: 1080px) {
      font-size: var(--fontSize-5);
    }
    line-height: var(--lineHeight-tight);

    @media (max-height: 768px) {
      width: calc(100%);
    }
  `;

  const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 300px;
    box-sizing: border-box;
    border: 1px solid var(--color-primary);

    .essayInfo {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-content: space-evenly;
      align-items: center;
      width: 50%;
      @media (max-height: 900px) {
        width: 100%;
      }
      height: 100%;
    }

    .info {
      display: flex;
      width: 100%;
      font-size: 14px;
      justify-content: space-evenly;
    }

    .author {
      text-transform: uppercase;
    }

    .essayImg {
      width: 50%;
      display: flex;
      @media (max-width: 900px) {
        display: none;
      }
      justify-content: center;
      align-items: center;

      img {
        object-fit: cover;
        width: 250px;
        height: 250px;
        box-sizing: border-box;
        border: 1px solid var(--color-primary);
        @media (max-width: 900px) {
          display: none;
        }
      }
    }
  `;

  const serializer = {
    hardBreak: "true",
    types: {
      imgCaption: (props) => (
        <Test>
          <img src={urlFor(props.node.asset)}></img>
          <h3
            style={{ textTransform: "uppercase" }}
            className="sansFont primaryColor"
          >
            {props.node.caption}
          </h3>
        </Test>
      ),
      block: (props) => (
        <>
          <p>{props.node.children[0].text}</p>
          <br></br>
        </>
      ),
    },
  };

  /**
   * HTML
   */
  return (
    <>
      <Helmet>
        <title>Marcaz </title>
      </Helmet>
      <Layout
        routeText="BACK"
        route=""
        essayTitle={"/ " + essays.title + " / " + essays.author.name}
      >
        <Column>
          <Desktop>
            <EssayCard essay={essays} />
            <Container>
              <div className="essayInfo">
                <Button
                  disabled={true}
                  text={essays.category.toUpperCase()}
                />
                <Title className="sansFont">{essays.title}</Title>
                <div className="info sansFont primaryColor">
                  <h3 className="author">{essays.author.name}</h3>
                  <br></br>
                  <h3 className="date">{essays.publishedAt}</h3>
                </div>
              </div>
              <div className="essayImg">
                <img src={essays.mainImage.asset.fluid.src}></img>
              </div>
            </Container>
          </Desktop>
          <Mobile>
            <EssayCard essay={essays} />
						<Container>
              <div className="essayInfo">
                <Button
                  disabled={true}
                  text={essays.category.toUpperCase()}
                />
                <Title className="sansFont">{essays.title}</Title>
                <div className="info sansFont primaryColor">
                  <h3 className="author">{essays.author.name}</h3>
                  <br></br>
                  <h3 className="date">{essays.publishedAt}</h3>
                </div>
              </div>
              <div className="essayImg">
                <img src={essays.mainImage.asset.fluid.src}></img>
              </div>
            </Container>
          </Mobile>
          <Essay>
            <BlockContent
              blocks={essayBody}
              serializers={serializer}
            ></BlockContent>
            <br></br>
            <hr></hr>
            <br></br>
            <br></br>
            <div>
              <p>
                <span className="sansFont">
                  {essays.author.name.toUpperCase()}
                </span>{" "}
                {essays.author.bio[0].children[0].text}
              </p>
              <br></br>
              <br></br>
              <SocialLinks className="sansFont">
                {hasObject(essays.author.social.instagram) ? (
                  <h3>
                    <a target="_blank" href={essays.author.social.instagram}>
                      Instagram
                    </a>
                  </h3>
                ) : null}
                {hasObject(essays.author.social.twitter) ? (
                  <h3>
                    <a target="_blank" href={essays.author.social.twitter}>
                      Twitter
                    </a>
                  </h3>
                ) : null}
                <h3>
                  <a
                    target="_blank"
                    href={"mailto:" + essays.author.social.email}
                  >
                    Email
                  </a>
                </h3>
              </SocialLinks>
              <br></br>
            </div>
          </Essay>
        </Column>
      </Layout>
    </>
  );
};

export default EssayTemplate;

/**
 * GRAPHQL
 */
export const query = graphql`
  query($slug: String!) {
    essays: allSanityEssay(filter: { slug: { current: { eq: $slug } } }) {
      nodes {
        author {
          name
          bio {
            children {
              text
            }
          }
          social {
            email
            instagram
            twitter
          }
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
    essayBody: allSanityEssay(filter: { slug: { current: { eq: $slug } } }) {
      nodes {
        _rawBody(resolveReferences: { maxDepth: 1 })
      }
    }
  }
`;
