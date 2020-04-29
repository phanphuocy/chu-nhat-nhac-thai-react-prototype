import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

// Import Redux's
import { connect } from "react-redux";

// Import custom components

import FullWidthBox from "../components/FullWidthBox";
import PlayerComp from "../components/PlayerComp";
import PlayerSongInfo from "../components/PlayerSongInfo";
import PlayerQueue from "../components/PlayerQueue";

const PlayerPage = ({ playerQueue }) => {
  console.log(useParams());

  const { songId } = useParams();

  if (!songId) {
    return (
      <div>
        <h1>Sorry, you haven't chose songs to play</h1>
      </div>
    );
  }

  return (
    <div>
      <FullWidthBox constraint={1200}>
        <PlayerComp songId={songId} />
        {/* <PlayerSongInfo currentSong={currentSong} /> */}
        {/* <PlayerQueue playerQueue={playerQueue} /> */}
      </FullWidthBox>
    </div>
  );
};

function mapStateToPageProps(state) {
  return {
    playerQueue: state.player.playerQueue,
  };
}

export default connect(mapStateToPageProps, {})(PlayerPage);
