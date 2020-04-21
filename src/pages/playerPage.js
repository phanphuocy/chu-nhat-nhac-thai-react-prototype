import React from "react";
import PropTypes from "prop-types";

// Import Redux's
import { connect } from "react-redux";

// Import custom components

import FullWidthBox from "../components/FullWidthBox";
import PlayerComp from "../components/PlayerComp";
import PlayerSongInfo from "../components/PlayerSongInfo";
import PlayerQueue from "../components/PlayerQueue";

const PlayerPage = ({ playerQueue, currentSong }) => {
  if (playerQueue === null || currentSong === null) {
    return (
      <div>
        <h1>Sorry, you haven't chose songs to play</h1>
      </div>
    );
  }
  return (
    <div>
      <FullWidthBox constraint={1200}>
        <PlayerComp currentSong={currentSong} />
        <PlayerSongInfo currentSong={currentSong} />
        <PlayerQueue playerQueue={playerQueue} />
      </FullWidthBox>
    </div>
  );
};

PlayerPage.propTypes = {
  playerQueue: PropTypes.array.isRequired,
};

function mapStateToPageProps(state) {
  return {
    playerQueue: state.player.playerQueue,
    currentSong: state.player.currentSong,
  };
}
export default connect(mapStateToPageProps)(PlayerPage);
