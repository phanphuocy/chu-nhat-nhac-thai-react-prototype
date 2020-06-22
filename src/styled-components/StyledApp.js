import styled from "styled-components";

const StyledApp = styled.div`
  min-height: 100vh;
  z-index: -1000;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.onBackground};

  p {
    line-height: 1.4;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.onBackground};
  }
  a:hover,
  a:active {
    text-decoration: underline;
    color: ${(props) => props.theme.colors.pink["base"]};
    cursor: pointer;
  }
  svg {
    color: ${(props) => props.theme.colors.onBackground};
  }

  /* System Design */
  html,
  body,
  p {
    font-size: 14px;
  }

  @media (min-width: 768px) {
    html,
    body,
    p {
      font-size: 16px;
    }
  }

  /* Type Scale */
  h1 {
    font-size: 3.052em;
    font-weight: normal;
    font-family: ${(props) => props.theme.fonts.serif};
  }
  h2 {
    font-size: 2.441em;
    font-weight: normal;
    font-family: ${(props) => props.theme.fonts.serif};
  }
  h3 {
    font-size: 1.953em;
    font-weight: normal;
  }
  h4 {
    font-size: 1.563em;
    font-weight: normal;
  }
  h5,
  h6 {
    font-size: 1.25em;
    font-weight: normal;
  }
  small {
    font-size: 0.8em;
  }
`;

export default StyledApp;
