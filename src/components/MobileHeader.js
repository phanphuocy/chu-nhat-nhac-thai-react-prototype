import React, { useState } from "react";
import { useTransition, animated, config } from "react-spring";
import styled from "styled-components";
import {
  RiPlayListLine,
  RiGroup2Line,
  RiNewspaperLine,
  RiMvLine,
  RiMoonClearLine,
  RiSunLine,
  RiCloseLine,
  RiSearchLine,
  RiMenuLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";

const Mask = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const StyledMobileHeader = styled.div`
  background-color: ${(props) => props.theme.colors.surface};
  position: relative;
  z-index: 200;

  svg {
    color: ${(props) => props.theme.colors.onSurface};
    width: 2rem;
    height: 2rem;
    vertical-align: middle;
  }

  .header {
    position: relative;
    z-index: 300;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;

    button {
      background-color: transparent;
      border: none;
      margin-left: 0.5rem;
    }
    button:active,
    button:hover {
      svg {
        color: ${(props) => props.theme.colors.primary};
      }
    }
  }
  .dropdown {
    background-color: ${(props) => props.theme.colors.surface};
    position: relative;
    z-index: 200;
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0.5rem 0;
    }
    li {
      width: 50%;
    }
    .navLink {
      padding: 0.5rem 1rem;
      display: flex;
      align-items: center;
    }
    .iconWrapper {
      padding: 0.5rem;
      background: linear-gradient(135.78deg, #ff3981 -1.37%, #ff0b0b 100.04%);
      border-radius: 1.25rem;
      margin-right: 0.5rem;
    }
  }
`;

const MobileHeader = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const transitions = useTransition(showMenu, null, {
    from: {
      position: "absolute",
      transform: "translate3d(0,-160px,0)",
      opacity: 0,
    },
    enter: { transform: "translate3d(0,0px,0)", opacity: 1 },
    leave: { opacity: 0 },
  });

  if (showSearch) {
    return (
      <StyledMobileHeader>
        <div className="header">
          <SearchBox />
          <button onClick={() => setShowSearch(false)}>
            <RiCloseLine />
          </button>
        </div>
      </StyledMobileHeader>
    );
  }

  return (
    <React.Fragment>
      <StyledMobileHeader>
        <div className="header">
          <div className="logoContainer">
            <Link to="/">
              <RiMvLine />
            </Link>
          </div>
          <div className="buttonContainer">
            <button>
              <RiSearchLine onClick={() => setShowSearch(true)} />
            </button>
            <button onClick={() => setShowMenu(!showMenu)}>
              <RiMenuLine />
            </button>
          </div>
        </div>

        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div className="dropdown" key={key} style={props}>
                <ul>
                  <li>
                    <Link
                      to="/artists"
                      className="navLink"
                      onClick={() => setShowMenu(false)}
                    >
                      <div className="iconWrapper">
                        <RiGroup2Line />
                      </div>
                      Nghệ Sĩ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/playlists"
                      className="navLink"
                      onClick={() => setShowMenu(false)}
                    >
                      <div className="iconWrapper">
                        <RiPlayListLine />
                      </div>
                      Danh Sách Phát
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/news"
                      className="navLink"
                      onClick={() => setShowMenu(false)}
                    >
                      <div className="iconWrapper">
                        <RiNewspaperLine />
                      </div>
                      Tin Tức
                    </Link>
                  </li>
                </ul>
                <p style={{ padding: "1rem" }}>Cài Đặt</p>
              </animated.div>
            )
        )}
      </StyledMobileHeader>
      {showMenu && <Mask onClick={() => setShowMenu(false)} />}
    </React.Fragment>
  );
};

export default MobileHeader;
