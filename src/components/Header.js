import React, { useState } from "react";
import styled from "styled-components";
import Media from "react-media";
import MobileHeader from "./MobileHeader";
import SearchBox from "./SearchBox";
import {
  RiPlayListLine,
  RiGroup2Line,
  RiNewspaperLine,
  RiMvLine,
  RiMoonClearLine,
  RiSunLine,
} from "react-icons/ri";
import Switch from "react-switch";

import { connect } from "react-redux";
import { switchTheme } from "../actions/interfaceActions";
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

  .navLinkGroup {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .react-switch {
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
      color: ${(props) => props.theme.colors.onSurface};
    }
  }
`;

const Header = ({ theme, switchTheme }) => {
  const [checked, setChecked] = useState(theme === "light" ? false : true);

  function switchThemeHandler() {
    if (theme === "dark") {
      switchTheme("light");
      setChecked(false);
    } else if (theme === "light") {
      switchTheme("dark");
      setChecked(true);
    }
  }

  return (
    <Media queries={{ small: { maxWidth: 767 } }}>
      {(matches) =>
        matches.small ? (
          <MobileHeader />
        ) : (
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
                <Switch
                  onChange={switchThemeHandler}
                  handleDiameter={24}
                  height={20}
                  width={48}
                  offColor="#333"
                  offHandleColor="#555"
                  onColor="#ddd"
                  onHandleColor="#fff"
                  className="react-switch"
                  checked={checked}
                  uncheckedIcon={<RiSunLine size={18} />}
                  checkedIcon={<RiMoonClearLine size={18} color="#333" />}
                />
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
        )
      }
    </Media>
  );
};

function mapStateToProps(state) {
  return {
    theme: state.interface.theme,
  };
}

export default connect(mapStateToProps, { switchTheme })(Header);
