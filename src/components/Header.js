import React from "react";
import styled from "styled-components";

// Import React Router for navigation
import { Link } from "react-router-dom";

const StyledHeader = styled.div`
  background-color: #999;
  display: flex;
  min-height: 64px;
  padding: 8px 16px;

  a {
    margin-right: 0.5rem;
    display: flex;
    align-items: center;
  }
`;

const MockupLogo = styled.div`
  background-color: #1a1a1a;
  height: 48px;
  width: 48px;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Link to="/">
        <MockupLogo />
      </Link>
      <Link to="/player">PLAYER</Link>
      <Link to="/playlists">PLAYLISTS</Link>
    </StyledHeader>
  );
};

export default Header;
