import React from "react";
import styled from "styled-components";
import { RiStarLine } from "react-icons/ri";
import convertLargeNumber from "../utils/convertLargeNumber";
import convertToDuration from "../utils/covertToDuration";

const StyledNewSongRow = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 3%);
  display: inline-grid;
  grid-template-columns: 140px 2fr 1fr 1fr 2rem;
  grid-template-areas: "thumbnail title stars releaseYear playtime";

  .thumbnail {
    grid-area: thumbnail;
    align-self: center;
  }
  .title {
    grid-area: title;
    font-weight: 800;
    align-self: center;
  }
  .stars {
    grid-area: stars;
    font-weight: 800;
    align-self: center;
    display: flex;
    align-items: center;

    svg {
      margin-left: 0.5rem;
    }
  }
  .releaseYear {
    grid-area: releaseYear;
    align-self: center;
  }
  .playtime {
    grid-area: playtime;
    align-self: center;
  }
  &:nth-child(odd) {
    background-color: ${(props) => props.theme.colors.background};
  }
`;

const ArtistSongRow = ({ song }) => {
  return (
    <StyledNewSongRow>
      <img
        className="thumbnail"
        src={`https://img.youtube.com/vi/${song.url}/mqdefault.jpg`}
        width="120"
      />
      <span className="title">{song.titleEn}</span>
      <span className="stars">
        {convertLargeNumber(song.stars)}
        <RiStarLine />
      </span>
      <span className="releaseYear">{song.releaseYear}</span>
      <span className="playtime">{convertToDuration(song.duration)}</span>
    </StyledNewSongRow>
  );
};

export default ArtistSongRow;
