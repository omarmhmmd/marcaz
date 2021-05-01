import React from "react"
import addToMailchimp from "gatsby-plugin-mailchimp"
import styled from "@emotion/styled"
import { useMediaQuery } from "react-responsive"
import Button from "../components/Button"
import { Link } from "gatsby"

/**
 * CSS
 */
const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);

  text-align: center;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  input {
    @media (max-width: 768px) {
      width: 200px;
    }
    width: 250px;
    display: inline-block;
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 0;
    box-sizing: border-box;
    -webkit-appearance: none;
    border: 1px solid var(--color-primary);
    margin-right: -1px;
    @media (max-width: 768px) {
      margin-right: -1px;
    }
    color: var(--color-primary);
  }

  input:focus,
  button:focus {
    outline-width: 0;
  }

  /* Change the white to any color */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    -webkit-text-fill-color: var(--color-primary) !important;
  }

  input::placeholder {
    color: var(--color-primary);
    opacity: 0.5; /* Firefox */
  }

  button {
    display: inline-block;
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 0;

    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    background-color: white;
    @media (max-width: 768px) {
      margin-top: -3px;
    }
  }

  button:hover {
    cursor: pointer;
    background-color: var(--color-primary);
    color: white;
  }
`
const Break = styled.br`
  display: none;
  @media (max-width: 768px) and (orientation: portrait) {
    display: inline;
  }
`

export default class MailchimpForm extends React.Component {
  constructor() {
    super()
    this.state = {
      email: "",
      result: null,
      text: "LEARN MORE",
      value: "",
      placeholder: "EMAIL",
    }
  }
  _handleSubmit = async e => {
    e.preventDefault()
    const result = await addToMailchimp(this.state.email)
    this.setState({ result: result })
    if (this.state.value) {
      this.setState({ text: "THANK YOU" })
      this.setState({ placeholder: "YOUR EMAIL IS APPRECIATED" })
    }
    this.setState({ email: "" })
    this.setState({ value: "" })
  }
  handleChange = event => {
    this.setState({ value: event.target.value })
    this.setState({ email: event.target.value })
  }

  /**
   * HTML
   */

  render() {
    const { text } = this.state
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
        <Desktop>
          <Container>
            <form onSubmit={this._handleSubmit}>
              <input
                id="outlined-email-input"
                label="Email"
                type="email"
                name="email"
                placeholder={this.state.placeholder}
                value={this.state.value}
                onChange={this.handleChange}
              ></input>
              <Break />
              <button className="sansFont" label="Submit" type="submit">
                {text}
              </button>
            </form>
          </Container>
        </Desktop>
        <Mobile>
          <Container>
            <form onSubmit={this._handleSubmit}>
              <input
                id="outlined-email-input"
                label="Email"
                type="email"
                name="email"
                placeholder={this.state.placeholder}
                value={this.state.value}
                onChange={this.handleChange}
              ></input>
              <Break />
              <button className="sansFont" label="Submit" type="submit">
                {text}
              </button>
            </form>
            <Link to="/">
              <Button disabled={true} top="37.5" text="BACK"></Button>
            </Link>
          </Container>
        </Mobile>
      </>
    )
  }
}
