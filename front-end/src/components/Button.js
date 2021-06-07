import React, { useState } from "react";
import styled from "@emotion/styled";

// Toggle Switch
function UseToggle(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback(() => {
    setValue((v) => !v);
  }, []);
  return [value, toggle];
}

/**
 * CSS
 */
const Container = styled.div`
  display: flex;
  width: auto;
  align-items: flex-end;
  flex-direction: column;
  @media (max-width: 768px) {
    align-items: center;
    align-content: center;
  }

  .button {
    font-size: 14px;
    background-color: white;
    display: inline-block;
    line-height: 25px;
    height: 25px;
    text-align: center;
    width: auto;
    outline: 1px solid var(--color-primary);
    padding: 2.5px 12.5px;
  }

  .noHover {
    pointer-events: none;
  }

  .button:hover {
    background-color: var(--color-primary);
    color: white;
    border: none;
    cursor: pointer;
  }

  .background-active {
    background-color: var(--color-primary);
    color: white;
  }
`;
const Text = styled.div`
  font-size: 14px;
  box-sizing: border-box;
  margin-top: 1px;
  width: 300px;
  @media (max-width: 768px) {
    width: 62.5vw;
  }
  display: inline-block;
  line-height: 1.375em;
  padding: 12.5px;
  outline: 1px solid var(--color-primary);
  background-color: white;
`;

/**
 * HTML
 */
const Button = (props) => {
  const [isOn, toggleIsOn] = UseToggle();
  if (props.open) {
    return (
      <Container style={{ paddingTop: props.top + "px" }}>
        <div className={`button sansFont background-active`}>{props.text}</div>

        <Text className="primaryColor sansFont">
          Marcaz مرکز is an online platform for new conversations about visual
          and digital culture from in and around Afghanistan and its diaspora.
        </Text>
      </Container>
    );
  } else if (props.disabled) {
    return (
      <Container style={{ paddingTop: props.top + "px" }}>
        <div className="noHover button sansFont">{props.text}</div>
      </Container>
    );
  }
  return (
    <Container style={{ paddingTop: props.top + "px" }}>
      <div
        onClick={toggleIsOn}
        className={`button sansFont ${isOn ? "background-active" : ""}`}
      >
        {props.text}
      </div>
      {isOn && (
        <Text className="primaryColor sansFont">
          Marcaz مرکز is an online platform for new conversations about visual
          and digital culture from in and around Afghanistan and its diaspora.
        </Text>
      )}
    </Container>
  );
};

export default Button;
