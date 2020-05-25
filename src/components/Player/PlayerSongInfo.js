import React from "react";
import styled from "styled-components";
import Button from "../Button";
import ArtistBadge from "../Artist/ArtistBadge";
import { FacebookShareCount } from "react-share";

const StyledPlayerSongInfo = styled.div`
  padding: 1rem;
  display: grid;

  grid-template-areas:
    "songInfo"
    "artistsInfo"
    "commenting"
    "sharing";

  .songInfo {
    grid-area: songInfo;
    h1 {
      font-size: 2rem;
      font-family: ${(props) => props.theme.fonts.serif};
      margin: 1rem 0;
    }
    h3 {
      font-size: 1.5rem;
    }
  }
  .artistsInfo {
    grid-area: artistsInfo;
    display: flex;
    flex-wrap: wrap;
  }
  .commenting {
    grid-area: commenting;
  }
  .sharing {
    grid-area: sharing;
  }

  @media (min-width: 768px) {
    grid-template-columns: auto 20rem;
    grid-template-areas:
      "artistsInfo sharing"
      "songInfo sharing"
      "commenting sharing";
  }
`;

const PlayerSongInfo = ({ song }) => {
  const {
    artists,
    titleEn,
    titleRo,
    titleTh,
    titleVi,
    deungdutjaisNote,
  } = song;
  return (
    <StyledPlayerSongInfo>
      <div className="artistsInfo">
        {artists.map((artistId) => (
          <ArtistBadge id={artistId} />
        ))}
      </div>
      <div className="songInfo">
        <h1>{`${titleVi ? titleVi : titleEn} - ${titleRo}`}</h1>
        <h2>{titleVi && titleEn}</h2>
      </div>

      <div className="commenting">
        {deungdutjaisNote && <p>{deungdutjaisNote}</p>}
      </div>
      <div className="sharing">
        <FacebookShareCount url={`https://www.youtube.com/watch?v=IzMkV4iah5I`}>
          {(shareCount) => <span>{shareCount}</span>}
        </FacebookShareCount>
        <Button>SHARE</Button>
      </div>
    </StyledPlayerSongInfo>
  );
};

export default PlayerSongInfo;
