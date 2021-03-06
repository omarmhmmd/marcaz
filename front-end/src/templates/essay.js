import * as React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import { useMediaQuery } from "react-responsive";
import Layout from "../components/Layout";
import Card from "../components/Card";
import EssayCard from "../components/EssayCard";
import imageUrlBuilder from "@sanity/image-url";
import Button from "../components/Button";
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
const BlockContent = require("@sanity/block-content-to-react");

/**
 * CSS
 */

const LineBreak = styled.hr`
   /* border: 1px solid var(--color-primary); */
  width: 100%;
	color: var(--color-primary); 
`;
const Column = styled.div`
  width: 600px;
  @media (max-width: 768px) {
    margin-top: 225px;
    width: calc(100% - 50px);
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
    word-wrap: break-word;
    font-size: 12px;
    line-height: 18px;
  }
`;
const Essay = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 18.75px;
  p {
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

  @media (max-height: 900px) {
    font-size: var(--fontSize-4);
  }
`;

/**
 * JS
 */
const EssayTemplate = (props) => {
  const data = props.data;
  const essays = data.essays.nodes[0];
  const essayBody = data.essayBody.nodes[0]._rawBody;
  console.log(essayBody);

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

  // const Desktop = ({ children }) => {
  //   const isDesktop = useMediaQuery({ minWidth: 768 });
  //   return isDesktop ? children : null;
  // };
  // const Mobile = ({ children }) => {
  //   const isMobile = useMediaQuery({ maxWidth: 768 });
  //   return isMobile ? children : null;
  // };

  const urlFor = (source) =>
    imageUrlBuilder({ projectId: "7wi9kuqc", dataset: "production" }).image(
      source
    );

  const serializer = {
    hardBreak: "true",
    marks: {
      em: (props) => <em style={{ fontStyle: "italic" }}>{props.children}</em>,
    },
    types: {
			youtube: ({node}) => {
        const { url } = node
        const id = getYouTubeId(url)
				const opts = {
					width: '600',
				};
        return (<YouTube videoId={id} opts={opts} />)
      },
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
          <EssayCard essay={essays} />
          <Essay>
            <BlockContent
              blocks={essayBody}
              serializers={serializer}
            ></BlockContent>
						<br></br>
            <LineBreak></LineBreak>
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
