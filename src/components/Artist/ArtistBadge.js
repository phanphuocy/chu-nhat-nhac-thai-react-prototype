import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Skeleton from "react-loading-skeleton";

const StyledArtistBadge = styled.div`
  background-color: ${(props) =>
    props.transparent ? "transparent" : props.theme.colors.surface};
  padding: 0.5rem;
  border-radius: 0.2rem;
  margin-right: 0.5rem;

  a {
    display: flex;
    align-items: center;
  }

  .colorRadius {
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;
    margin-right: 0.5rem;
  }

  img {
    width: 2rem;
    border-radius: 1rem;
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
        <div
          className="colorRadius"
          style={{ backgroundColor: artist.coverColor }}
        >
          <img src={artist.avatar.url} alt={`${artist.name} badge`}></img>
        </div>
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
