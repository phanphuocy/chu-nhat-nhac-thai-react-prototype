import React from "react";
import styled from "styled-components";

const StyledArtistBadge = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 1rem;
    border-radius: 1rem;
    margin-right: 0.5rem;

    @media (min-width: 768px) {
      width: 2rem;
    }
  }
`;

const ArtistBadge = ({ artist }) => {
  return (
    <StyledArtistBadge>
      <img src={artist.avatar.url}></img>
      {artist.name}
    </StyledArtistBadge>
  );
};

export default ArtistBadge;
