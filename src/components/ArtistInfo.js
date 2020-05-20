import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ActionContainer from "./ActionContainer";

import { RiInstagramLine, RiFacebookBoxLine } from "react-icons/ri";

const StyledArtistInfo = styled.div`
  margin-top: 2rem;
  width: 100%;
  margin: 2rem auto 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: green;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 0 1rem;
  }

  .avatar {
    display: flex;
    justify-content: center;

    img {
      width: 200px;
      height: 200px;
    }
  }
  .social {
    padding: 0 1rem;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    @media (min-width: 768px) {
      padding: 0rem;
    }
  }

  .social-item {
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    column-gap: 0.5rem;
  }

  .info {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    @media (min-width: 768px) {
      margin-left: 3rem;
      align-items: flex-start;
    }
    h3 {
      font-size: 1.5rem;
    }

    .bioText {
      margin-top: 1rem;
      height: ${(props) => (props.fullBio ? "100%" : "7rem")};
      overflow: hidden;

      p {
        line-height: 1.4rem;
        padding: 0 1rem;
        @media (min-width: 768px) {
          padding: 0rem;
        }
      }
    }

    .showMoreGradient {
      background: rgb(0, 0, 0);
      background: linear-gradient(
        0deg,
        rgba(30, 30, 30, 1) 0%,
        rgba(0, 0, 0, 0) 80%
      );
      height: 3rem;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      @media (min-width: 768px) {
        background: none;
      }

      button {
        background: none;
        border: none;
        color: gray;
        font-size: 1rem;
        padding: 0.5rem 1rem;
        text-decoration: underline;
      }
    }
  }
`;

const ArtistInfo = ({ artist }) => {
  const [showFullBio, setFullBio] = useState(false);

  function showMoreButtonHandler() {
    setFullBio(!showFullBio);
  }

  return (
    <React.Fragment>
      <StyledArtistInfo fullBio={showFullBio}>
        <div className="cover"></div>
        <div className="content">
          <div className="avatar">
            <img src={artist.avatar.url} />
          </div>
          <div className="info">
            <h3>{artist.name}</h3>
            <div className="bioText">
              {artist.biography
                ? documentToReactComponents(artist.biography)
                : "Thông tin nghệ sĩ đang được cập nhập"}
            </div>
            {artist.biography && (
              <div className="showMoreGradient">
                <button onClick={showMoreButtonHandler}>
                  {showFullBio ? "Ẩn" : "Xem Thêm"}
                </button>
              </div>
            )}
            <div className="social">
              <span className="social-item">
                <RiInstagramLine size={24} />
                <a href="#">twitter.com/abc</a>
              </span>
              <span className="social-item">
                <RiFacebookBoxLine size={24} />
                <a href="#">facebook.com/abc</a>
              </span>
            </div>
          </div>
        </div>
      </StyledArtistInfo>
    </React.Fragment>
  );
};

export default ArtistInfo;
