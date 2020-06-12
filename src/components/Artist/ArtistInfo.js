import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ActionContainer from "../ActionContainer";
import DefaultBackground from "../../images/default-cover-image-remember-w1024-h390.jpg";
import BackButton from "../BackButton";
import ReactGA from "react-ga";

import {
  RiInstagramLine,
  RiFacebookBoxLine,
  RiYoutubeLine,
  RiSpotifyLine,
} from "react-icons/ri";

const StyledArtistInfo = styled.div`
  position: relative;
  width: 100%;
  margin: 2rem auto 0;
  display: grid;
  grid-template-areas:
    "cover"
    "avatar"
    "info"
    "social";

  @media (min-width: 768px) {
    grid-template-columns: 10rem 210px auto 10rem;
    grid-template-areas:
      "cover cover cover cover"
      ". avatar info ."
      "social social social social";
  }

  .avatar {
    grid-area: avatar;
    justify-self: center;
    z-index: 100;
    position: relative;
    top: -2rem;
    display: flex;
    justify-content: center;
    background-color: white;
    padding: 0.25rem;
    border-radius: 45%;
    width: 200px;
    height: 200px;
    div {
      border-radius: 46%;
      overflow: hidden;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const Info = styled.div`
  grid-area: info;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  h1 {
    color: white;
    font-size: 2rem;
    font-family: ${(props) => props.theme.fonts.serif};
  }

  .bio-content {
    margin-top: 1rem;
    height: ${(props) => (props.fullBio ? "100%" : "1rem")};
    overflow: hidden;
    p {
      line-height: 1.4rem;
      padding: 0 1rem;
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

    button {
      background: none;
      border: none;
      color: gray;
      font-size: 1rem;
      padding: 0.5rem 1rem;
      text-decoration: underline;
    }
  }

  @media (min-width: 768px) {
    margin-left: 3rem;
    align-items: flex-start;

    .bio-content {
      height: ${(props) => (props.fullBio ? "100%" : "7rem")};
    }
    .bio-content p {
      padding: 0rem;
    }
    .showMoreGradient {
      background: none;
    }
  }
`;

const SocialLinks = styled.div`
  grid-area: social;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;

  .social-items {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .social-item {
    padding: 0.5rem;
    border-radius: 0.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .unavailable {
    svg {
      fill: ${(props) => props.theme.colors.gray["300"]};
    }
  }

  svg {
    height: 2rem;
    width: 2rem;
  }

  a {
    display: none;
  }

  a.unavailable {
    pointer-events: none;
  }

  .social-item:hover {
    background-color: ${(props) => props.theme.colors.surface};
    svg,
    & {
      color: ${(props) => props.theme.colors.primary};
    }
  }

  @media (min-width: 768px) {
    flex-direction: column;
    a {
      display: block;
    }
  }
`;

const BackgroundCover = styled.div`
  grid-area: cover;
  margin-bottom: -6rem;
  overflow: hidden;

  .cover {
    background-color: ${(props) =>
      props.color ? props.color : `rgba(221, 48, 144, 1)`};
    background-image: ${`url(${DefaultBackground})`};
    object-fit: cover;
    height: 15rem;
    max-height: 390px;
    width: 100%;
  }
  .gradient {
    position: relative;
    top: -1rem;

    filter: blur(5px);
    transform: scale(1.03);
    height: 5rem;
    width: 100%;
    background: rgb(0, 0, 0);
    background: ${(props) =>
      `linear-gradient(0deg, ${props.theme.colors.background} 0%, ${
        props.color ? props.color : `rgba(221,48,144,1)`
      }  100%)`};
  }
`;

const ArtistInfo = ({ artist }) => {
  const [showFullBio, setFullBio] = useState(false);

  function showMoreButtonHandler() {
    setFullBio(!showFullBio);

    ReactGA.event({
      category: "Engage w/ Artist",
      action: "Click On Show More Info",
      label: artist.name,
    });
  }
  return (
    <StyledArtistInfo>
      <BackButton />
      <BackgroundCover color={artist.coverColor && artist.coverColor}>
        <img
          src={
            artist.coverImage
              ? artist.coverImage.fields.file.url
              : DefaultBackground
          }
          alt="Default bg"
          className="cover"
        ></img>
        <div className="gradient">
          <div></div>
        </div>
      </BackgroundCover>
      <div className="avatar">
        <div>
          <img src={artist.avatar.url} alt={`${artist.name} avatar image`} />
        </div>
      </div>
      <Info fullBio={showFullBio}>
        <h1>{artist.name}</h1>
        <div className="bio-content">
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
      </Info>
      <SocialLinks>
        <h4>{`Theo Dõi ${artist.name}`}</h4>
        <ul className="social-items">
          <li>
            <ReactGA.OutboundLink
              to={`https://www.instagram.com${artist.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-item ${artist.instagram ? "" : "unavailable"}`}
              eventLabel={`${artist.name} Instagram`}
            >
              <RiInstagramLine />
              {artist.instagram && <span>{artist.instagram}</span>}
            </ReactGA.OutboundLink>
          </li>
          <li>
            <ReactGA.OutboundLink
              to={`https://www.facebook.com${artist.facebook}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-item ${artist.facebook ? "" : "unavailable"}`}
              eventLabel={`${artist.name} Facebook`}
            >
              <RiFacebookBoxLine />
              {artist.facebook && <span>{artist.facebook}</span>}
            </ReactGA.OutboundLink>
          </li>
          <li>
            <ReactGA.OutboundLink
              to={`https://www.youtube.com/channel${artist.youtube}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-item ${artist.youtube ? "" : "unavailable"}`}
              eventLabel={`${artist.name} Youtube`}
            >
              <RiYoutubeLine />
              {artist.youtube && <span> {artist.youtube}</span>}
            </ReactGA.OutboundLink>
          </li>
          <li>
            <ReactGA.OutboundLink
              to={`https://open.spotify.com/artist${artist.spotify}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-item ${artist.spotify ? "" : "unavailable"}`}
              eventLabel={`${artist.name} Spotify`}
            >
              <RiSpotifyLine />
              {artist.spotify && <span>{artist.spotify}</span>}
            </ReactGA.OutboundLink>
          </li>
        </ul>
      </SocialLinks>
    </StyledArtistInfo>
  );
};

export default ArtistInfo;
