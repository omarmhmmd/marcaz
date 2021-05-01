import React from "react"
import { Helmet } from "react-helmet"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import Button from "../components/Button"

/**
 * HTML
 */
const Card = props => {
  if (props.isEssay) {
    return (
      <EssayCard>
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
      </EssayCard>
    )
  }
  return (
    <IndexCard>
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
    </IndexCard>
  )
}

/**
 * CSS
 */
const IndexCard = styled.div`
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
`
const Title = styled.h1`
  text-transform: uppercase;
  text-align: center;
  font-size: var(--fontSize-5);
  @media (min-height: 900px) {
    font-size: var(--fontSize-7);
  }
`

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
    width: 100%;
    height: 250px;
    @media (max-height: 900px) {
      height: 150px;
    }
    margin-top: 12px;
    box-sizing: border-box;
    border: 1px solid var(--color-primary);
  }

  .blurb {
    font-family: "Times New Roman", Times, serif;
    font-size: 16px;
    text-align: justify;
    line-height: 1.375em;
    margin-top: 12px;
    width: auto;
    @media (max-height: 1080px) {
      display: none;
    }
  }
`

const EssayCard = styled.div`
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
    height: 100%;
  }

  .info {
    display: flex;
    width: 100%;
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
      width: 250px;
      height: 250px;
      box-sizing: border-box;
      border: 1px solid var(--color-primary);
    }
  }
`

export default Card
