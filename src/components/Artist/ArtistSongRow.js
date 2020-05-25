import React from "react";
import styled from "styled-components";
import { RiStarLine } from "react-icons/ri";
import convertLargeNumber from "../../utils/convertLargeNumber";
import convertToDuration from "../../utils/covertToDuration";
import { Link } from "react-router-dom";

const StyledNewSongRow = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 3%);
  display: inline-grid;
  grid-template-columns: 140px 1fr 1fr 1fr;
  grid-template-areas:
    "thumbnail title title title"
    "thumbnail stars releaseYear playtime";

  a,
  span {
    align-self: center;
  }

  .thumbnail {
    grid-area: thumbnail;
  }
  .title {
    grid-area: title;
    font-weight: 800;
  }
  .stars {
    grid-area: stars;
    font-weight: 800;

    display: flex;
    align-items: center;

    svg {
      margin-left: 0.5rem;
    }
  }
  .releaseYear {
    grid-area: releaseYear;
  }
  .playtime {
    grid-area: playtime;
  }
  &:nth-child(odd) {
    background-color: ${(props) => props.theme.colors.background};
  }

  @media (min-width: 768px) {
    grid-template-columns: 140px 2fr 1fr 1fr 2rem;
    grid-template-areas: "thumbnail title stars releaseYear playtime";
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
      <Link to={`/p/${song.slug}`} className="title">
        <span>{song.titleEn}</span>
      </Link>
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