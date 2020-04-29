import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import convertToDuration from "../utils/covertToDuration";
import { MdPlayArrow } from "react-icons/md";
import { useHistory } from "react-router-dom";

const StyledSongRow = styled.li`
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.colors.background};
  display: inline-grid;
  grid-template-columns: 140px 1fr 2rem;
  grid-template-areas:
    "thumbnail title  title"
    "thumbnail artist playtime";

  @media (min-width: 768px) {
    grid-template-columns: 140px 1fr 1fr 40px;
    grid-template-areas: "thumbnail title artist  playtime";
  }

  .thumbnail {
    grid-area: thumbnail;
  }
  .title {
    grid-area: title;
    font-weight: 800;
  }
  .artist {
    grid-area: artist;
    align-self: center;
  }
  .playtime {
    grid-area: playtime;
    align-self: center;
  }

  .artistBadge {
    display: flex;
    align-items: center;

    img {
      border-radius: 1rem;
      margin-right: 0.5rem;
      width: 2rem;
    }
  }

  span {
    align-self: center;
    display: flex;
    align-items: center;
  }

  &:nth-child(odd) {
    background-color: #161616;
  }

  &:hover {
    background-color: #1e1e1e;
    span {
      color: white;
    }
  }

  .playButton {
    grid-area: playbutton;
    margin-left: 1rem;
    padding: 0.5rem;
    background: none;
    border: none;
    border-radius: 2rem;
    visibility: hidden;
  }

  &:hover .playButton {
    background-color: rgba(255, 255, 255, 0.1);
    visibility: visible;
    svg: {
      color: white;
      fill: white;
    }
  }
`;

const SongRow = ({ song, onSongRowPlayButtonClicked }) => {
  let history = useHistory();
  function playButtonHandler(url) {
    history.push(`/p/${url}`);
  }
  return (
    <StyledSongRow>
      <img
        className="thumbnail"
        src={`https://img.youtube.com/vi/${song.fields.url}/mqdefault.jpg`}
        width="120"
      />
      <span className="title">
        {song.fields.titleEn}
        <button
          className="playButton"
          onClick={() => playButtonHandler(song.fields.slug)}
        >
          <MdPlayArrow size={32} />
        </button>
      </span>
      <span className="artist">{song.fields.artists[0].fields.name}</span>
      <span className="playtime">
        {convertToDuration(song.fields.duration)}
      </span>
    </StyledSongRow>
  );
};

SongRow.propTypes = {
  song: PropTypes.object.isRequired,
  onSongRowPlayButtonClicked: PropTypes.func,
};

SongRow.defaultProps = {
  onSongRowPlayButtonClicked: () => {
    console.log("Clicked");
  },
};

export default SongRow;
