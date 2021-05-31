import React from "react";
import { Helmet } from "react-helmet";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Button from "../components/Button";

/**
 * CSS
 */
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

const Container = styled.div`
  display: flex;
	background-color: green;
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
    justify-content: center;
    align-items: center;

    img {
      object-fit: cover;
      width: 250px;
      height: 250px;
      box-sizing: border-box;
      border: 1px solid var(--color-primary);
    }
  }
`;

/**
 * HTML
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

export default EssayCard;
