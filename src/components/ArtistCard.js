import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TiEye } from "react-icons/ti";
import { MdPlayArrow } from "react-icons/md";
import RatioBoundingBox from "./RatioBoundingBox";
import { Link } from "react-router-dom";

// Import Redux's
import { connect } from "react-redux";
import { registerQueueSongs, setCurrentSong } from "../actions/playerAction";

const StyledArtistCard = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  transition: all 0.2s ease-in-out;

  img {
    width: 100%;
    height: 100%;
  }
  .info {
    text-align: center;
    padding: 1rem 0rem;
    background-color: rgba(0, 0, 0, 0.1);

    h3 {
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
  return (
    <Link to={`/artists/${artist.slug}`}>
      <StyledArtistCard>
        <RatioBoundingBox ratio={1}>
          <a>
            <img src={artist.avatar.url} />
          </a>
        </RatioBoundingBox>
        <div className="info">
          <h3>{artist.name}</h3>
          <p>{`${artist.songIds.length} bài hát`}</p>
        </div>
      </StyledArtistCard>
    </Link>
  );
};

ArtistCard.propTypes = {
  columns: PropTypes.number.isRequired,
};

function mapStateToProps(state, ownProps) {
  console.log("From card", ownProps);
  const slug = ownProps.slug;
  if (state.data.loaded === false) {
    return {};
  } else {
    return {
      artist: state.data.artists[slug],
    };
  }
}

export default connect(mapStateToProps, { registerQueueSongs, setCurrentSong })(
  ArtistCard
);
