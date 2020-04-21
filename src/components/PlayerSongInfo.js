import React from "react";
import styled from "styled-components";

const StyledPlayerSongInfo = styled.div`
  padding: 1rem;

  h3 {
    font-size: 1.5rem;
  }
`;

const PlayerSongInfo = ({ currentSong }) => {
  const { titleEn, titleTh, titleRo } = currentSong.fields;
  return (
    <StyledPlayerSongInfo>
      <h3>{`${titleEn} - ${titleTh} (${titleRo})`}</h3>
    </StyledPlayerSongInfo>
  );
};

export default PlayerSongInfo;
