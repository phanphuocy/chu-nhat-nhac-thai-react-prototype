import React from "react";
import styled from "styled-components";

import {
  RiPlayListLine,
  RiGroup2Line,
  RiNewspaperLine,
  RiMvLine,
} from "react-icons/ri";

// Import React Router for navigation
import { Link } from "react-router-dom";

const StyledHeader = styled.div`
  background-color: #3f3f3f;

  min-height: 64px;
  padding: 8px 16px;

  .wrapper {
    display: flex;
    justify-content: space-between;
    max-width: 1280px;
    margin: 0 auto;
  }

  .logoContainer {
    flex-basis: 2;
    display: flex;
    align-items: center;

    .logotype {
      display: none;

      @media (min-width: 768px) {
        display: inline-block;
      }
    }
  }

  a {
    margin-right: 0.5rem;
    display: flex;
    align-items: center;
  }

  .searchBox {
    display: none;
    @media (min-width: 768px) {
      display: flex;
      align-items: center;
    }

    input {
      background-color: hsl(0, 0%, 20%);
      border: 2px solid hsl(0, 0%, 18%);
      border-radius: 2px;
      height: 2rem;
      padding: 0 0.5rem;
      width: 20rem;
    }
  }

  .navLinkGroup {
    display: flex;
  }

  .navLink {
    transition: background-color 0.5s ease;
    background-color: rgba(255, 255, 255, 0);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1.5rem;
    height: 3rem;
    width: 3rem;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    svg {
      color: whitesmoke;
    }
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <div className="wrapper">
        <div className="logoContainer">
          <Link to="/">
            <RiMvLine size={32} />
            <p className="logotype">Chủ Nhật Nhạc Thái</p>
          </Link>
        </div>
        <div className="searchBox">
          <input type="text" placeholder="Search.."></input>
        </div>
        <div className="navLinkGroup">
          <Link to="/p">
            <div className="navLink">
              <RiNewspaperLine size={24} />
            </div>
          </Link>
          <Link to="/playlists">
            <div className="navLink">
              <RiPlayListLine size={24} />
            </div>
          </Link>
          <Link to="/artists">
            <div className="navLink">
              <RiGroup2Line size={24} />
            </div>
          </Link>
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
