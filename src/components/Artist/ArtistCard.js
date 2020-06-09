import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import RatioBoundingBox from "../RatioBoundingBox";
import { Link } from "react-router-dom";
import Img from "react-image";
import { ReactComponent as defaultAvatar } from "../../images/default-avatar.svg";

// Import Redux's
import { connect } from "react-redux";
import { registerQueueSongs, setCurrentSong } from "../../actions/playerAction";

const StyledArtistCard = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  transition: all 0.2s ease-in-out;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
  .info {
    text-align: center;
    padding: 1rem 0rem;
    background-color: ${(props) => props.theme.colors.surface};
    h3 {
      color: ${(props) => props.theme.colors.onSurface};
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
    p {
      color: gray;
    }
  }

  &:hover {
    @media (min-width: 768px) {
      transform: translateY(-0.5rem);
    }
  }
`;

const ArtistCard = ({ artist }) => {
  if (!artist) {
    return (
      <div>
        <p>UNDEFINDED</p>
      </div>
    );
  }
  return (
    <Link to={`/artists/${artist.slug}`}>
      <StyledArtistCard>
        <RatioBoundingBox ratio={1}>
          <Img
            src={artist.avatar.url}
            alt={artist.name}
            loader={<img src={defaultAvatar} alt="Dummy Avatar" />}
          />
        </RatioBoundingBox>
        <div className="info">
          <h3>{artist.name}</h3>
          <p>{`${artist.songs.length} bài hát`}</p>
        </div>
      </StyledArtistCard>
    </Link>
  );
};

function mapStateToProps({ data }, ownProps) {
  const { id } = ownProps;
  return {
    artist: data.artists.byIds[id],
  };
}

export default connect(mapStateToProps, { registerQueueSongs, setCurrentSong })(
  ArtistCard
);
