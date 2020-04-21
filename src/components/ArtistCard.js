import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TiEye } from "react-icons/ti";
import { MdPlayArrow } from "react-icons/md";
import RatioBoundingBox from "./RatioBoundingBox";

// Import Redux's
import { connect } from "react-redux";
import { registerQueueSongs, setCurrentSong } from "../actions/playerAction";

const StyledArtistCard = styled.div`
  display: inline-block;
  position: relative;
  width: calc(100% / ${(props) => props.columns});
  /* transition: all 0.2s ease-in-out; */

  img {
    width: 100%;
    height: 100%;
  }

  h3 {
    padding: 1rem 0rem;
    font-size: 1rem;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .mask {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    width: 100%;
    height: 100%;

    button {
      padding: 1rem;
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 2rem;
      border: none;
      transition: all 0.2s ease-in-out;
      margin-right: 1rem;

      &:last-child {
        margin-right: 0rem;
      }

      svg {
        color: lightgray;
      }
    }

    button:hover {
      transform: scale(1.2);
    }
  }

  &:hover .mask {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ArtistCard = ({
  columns,
  playlist,
  onCardClickedHandler,
  registerQueueSongs,
  setCurrentSong,
}) => {
  return (
    <StyledArtistCard columns={columns}>
      <RatioBoundingBox
        ratio={1.4}
        style={{ paddingRight: "1rem", paddingBottom: "1rem" }}
      >
        <RatioBoundingBox ratio={1}>
          <a>
            <img src={playlist.fields.avatar.fields.file.url} />
          </a>
          <div className="mask">
            <button onClick={() => onCardClickedHandler(playlist.fields.songs)}>
              <TiEye size={32} />
            </button>
            <button
              onClick={() => {
                setCurrentSong(playlist.fields.songs[0]);
                registerQueueSongs(playlist.fields.songs);
              }}
            >
              <MdPlayArrow size={32} />
            </button>
          </div>
        </RatioBoundingBox>
        <h3>{playlist.fields.name}</h3>
      </RatioBoundingBox>
    </StyledArtistCard>
  );
};

ArtistCard.propTypes = {
  columns: PropTypes.number.isRequired,
};

export default connect(null, { registerQueueSongs, setCurrentSong })(
  ArtistCard
);
