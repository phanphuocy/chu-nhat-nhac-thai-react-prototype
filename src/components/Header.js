import React from "react";
import styled from "styled-components";
import SearchBox from "./SearchBox";
import {
  RiPlayListLine,
  RiGroup2Line,
  RiNewspaperLine,
  RiMvLine,
} from "react-icons/ri";

// Import React Router for navigation
import { Link } from "react-router-dom";

const StyledHeader = styled.div`
  background-color: ${(props) => props.theme.colors.surface};

  min-height: 64px;
  padding: 8px 16px;

  .wrapper {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    justify-content: space-between;
    align-items: center;
    max-width: 1280px;
    margin: 0 auto;
  }

  .logoContainer {
    flex-basis: 2;
    display: flex;
    align-items: center;
    
    a {
        text-decoration: none;
      }

      a:hover, a:active {
        text-decoration: underline;
      }

    .logotype {
      display: none;
      

      @media (min-width: 768px) {
        display: inline-block; 
        font-family: 'Kodchasan', sans-serif;
        
        margin-left: 0.5rem;
      }
    }
  }

  a {
    margin-right: 0.5rem;
    display: flex;
    align-items: center;
  }

  .navLinkGroup {
    display: flex;
    justify-content: flex-end;
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
        <SearchBox />
        <div className="navLinkGroup">
          <Link to="/news">
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
