import React from "react";
import { Helmet } from "react-helmet";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Button from "../components/Button";

/**
 * CSS
 */
const Container = styled.div`
  display: flex;
  /* background-color: yellow; */
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100%;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: -75px;
    height: 62.5vh;
  }
  border: 1px solid var(--color-primary);

  .noHover {
    pointer-events: none;
  }

  &:hover {
    cursor: pointer;
  }

  .title {
    @media (min-height: 900px) {
      /* font-size: 12px; */
    }
  }

  &:hover .title {
    text-decoration: underline;
  }

  &:hover hr {
    visibility: visible;
  }

  &:hover .button {
    background-color: var(--color-primary);
    color: white;
    border: none;
    cursor: pointer;
  }

  hr {
    position: relative;
    visibility: hidden;
    display: none;
    @media (max-width: 768px) {
      display: none;
    }
    top: 3vh;
    width: 75%;
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

  @media (min-height: 900px) {
    /* font-size: var(--fontSize-7); */
  }
`;

const Description = styled.div`
  width: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;

  .info {
    display: flex;
    flex-direction: row;
    @media (max-width: 768px) {
      /* flex-direction: column-reverse;
		align-content: center;
		justify-content: center;
		align-items: center; */
    }
    justify-content: space-between;
    width: 100%;
    font-size: 14px;

    .author {
      text-transform: uppercase;
    }
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 500px;
    @media (max-height: 1440px) {
			object-fit: cover;
      height: auto;
      display: none;
		}
    @media (max-width: 768px) {
			object-fit: cover;
      height: auto;
      height: 200px;
      display: block !important;
      /* display: none; */
    }
    margin-top: 12px;
    box-sizing: border-box;
    border: 1px solid var(--color-primary);
  }

  .blurb {
    font-family: "Times New Roman", Times, serif;
    font-size: 16px;
    text-align: justify;
    line-height: 1.25em;
    margin-top: 12px;
    width: auto;
    @media (max-height: 1440px) {
      display: none;
    }
  }
`;

/**
 * HTML
 */
const Card = (props) => {
  return (
    <Container>
      <Button disabled={true} text={props.essay.category.toUpperCase()} />
      <Title className="sansFont title">{props.essay.title}</Title>
      <Description>
        <div className="info sansFont primaryColor">
          <h3 className="author">{props.essay.author.name}</h3>
          <br></br>
          <h3 className="date">{props.essay.publishedAt}</h3>
        </div>
        <img src={props.essay.mainImage.asset.fluid.src}></img>
        <p className="blurb">{props.essay.description}</p>
        <hr></hr>
      </Description>
    </Container>
  );
};

export default Card;
