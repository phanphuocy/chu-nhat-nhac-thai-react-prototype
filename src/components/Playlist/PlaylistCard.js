import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TiEye } from "react-icons/ti";
import { MdPlayArrow } from "react-icons/md";
import RatioBoundingBox from "../RatioBoundingBox";
import { useHistory } from "react-router-dom";

// Import Redux's
import { connect } from "react-redux";
import { registerQueueSongs, setCurrentSong } from "../../actions/playerAction";

const MockCard = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.colors.surface};
  display: flex;
  align-items: center;

  .title {
    color: ${(props) => props.theme.colors.onSurface};
    font-size: 3rem;
    text-align: center;
    text-decoration: none;
  }
`;

const StyledPlaylistCard = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;

  img {
    width: 100%;
    height: 100%;
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

const PlaylistCard = ({
  playlist,
  onCardClickedHandler,
  registerQueueSongs,
  setCurrentSong,
}) => {
  const history = useHistory();
  return (
    <StyledPlaylistCard>
      <RatioBoundingBox>
        <a>
          {/* <img src={playlist.cover.url} /> */}
          <MockCard>
            <h2 className="title">{playlist.name}</h2>
          </MockCard>
        </a>

        <div className="mask">
          <button onClick={() => onCardClickedHandler(playlist.songs)}>
            <TiEye size={32} />
          </button>
          <button
            onClick={() => {
              setCurrentSong(playlist.songs[0]);
              registerQueueSongs(playlist.songs);
              history.push(`/p/${playlist.songs[0]}`);
            }}
          >
            <MdPlayArrow size={32} />
          </button>
        </div>
      </RatioBoundingBox>
    </StyledPlaylistCard>
  );
};

function mapStateToProps({ data }, { id }) {
  return {
    playlist: data.playlists.byIds[id],
  };
}

export default connect(mapStateToProps, {
  registerQueueSongs,
  setCurrentSong,
})(PlaylistCard);
