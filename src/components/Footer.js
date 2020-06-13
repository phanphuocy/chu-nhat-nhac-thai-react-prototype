import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../images/logo.svg";

import { Link } from "react-router-dom";

const StyledFooter = styled.div`
  margin-top: 4rem;
  width: 100%;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.surface};

  .wrapper {
    max-width: 1280px;
    margin: 0 auto;
  }

  .logoContainer {
    flex-basis: 2;
    display: flex;
    align-items: center;

    .svg {
      width: 2rem;
      height: 2rem;
    }

    a {
      text-decoration: none;
    }

    a:hover,
    a:active {
      text-decoration: underline;
    }

    .logotype {
      display: none;

      @media (min-width: 768px) {
        display: inline-block;
        font-family: "Kodchasan", sans-serif;

        margin-left: 0.5rem;
      }
    }
  }

  a {
    margin-right: 0.5rem;
    display: flex;
    align-items: center;
  }

  .horizontalDivider {
    height: 2px;
    background-color: ${(props) => props.theme.colors.gray["300"]};
    margin: 0.5rem 0;
  }
`;

const Footer = ({ theme, switchTheme }) => {
  return (
    <StyledFooter>
      <div className="wrapper">
        <div className="logoContainer">
          <Link to="/">
            <Logo className="svg" />
            <p className="logotype">Chủ Nhật Nhạc Thái</p>
          </Link>
        </div>
        <div className="horizontalDivider"></div>
        <div className="credit">
          <p>Created in vision of Phan Phước Ý</p>
          <p>
            Special Thanks to Tahmnong, owner of ดึงดูดใจ (Deung-Dut-Jai).
            Without you this project would never happened.
          </p>
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer;
