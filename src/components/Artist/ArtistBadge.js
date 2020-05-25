import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Skeleton from "react-loading-skeleton";

const StyledArtistBadge = styled.div`
  background-color: ${(props) =>
    props.transparent ? "transparent" : props.theme.colors.surface};
  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
  margin-right: 0.5rem;

  a {
    display: flex;
    align-items: center;
  }

  img {
    width: 1rem;
    border-radius: 1rem;
    margin-right: 0.5rem;

    @media (min-width: 768px) {
      width: 2rem;
    }
  }

  p {
    font-size: 1rem;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const ArtistBadge = ({ artist, transparent }) => {
  if (!artist) {
    return (
      <StyledArtistBadge>
        <Skeleton />
      </StyledArtistBadge>
    );
  }
  const path = `/artists/${artist.slug}`;
  return (
    <StyledArtistBadge transparent={transparent}>
      <Link to={path}>
        <img src={artist.avatar.url}></img>
        <p>{artist.name}</p>
      </Link>
    </StyledArtistBadge>
  );
};

function mapStateToProps({ data }, ownProps) {
  const { id } = ownProps;
  return {
    artist: data.artists.byIds[id],
  };
}

export default connect(mapStateToProps)(ArtistBadge);
