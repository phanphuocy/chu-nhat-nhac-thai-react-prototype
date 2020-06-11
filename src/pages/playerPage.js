import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

// Import Redux's
import { connect } from "react-redux";

// Import custom components

import FullWidthBox from "../components/FullWidthBox";
import PlayerComp from "../components/Player/PlayerComp";
import DynamicLyricsComp from "../components/Player/DynamicLyricsComp";
import PlayerSongInfo from "../components/Player/PlayerSongInfo";
import PlayerQueue from "../components/Player/PlayerQueue";
import SimilarSongs from "../components/Player/SimilarSongs";

const PlayerPage = ({ playerQueue, song, lyricsLang }) => {
  //
  // If song param is incorrect, redirect to 404 page
  const history = useHistory();
  if (!song) {
    history.push("/404");
  }

  return (
    <div>
      {song.timestamp && <DynamicLyricsComp song={song} />}
      <FullWidthBox constraint={1200}>
        {!song.timestamp && <PlayerComp song={song} lyricsLang={lyricsLang} />}
        <PlayerSongInfo song={song} />
        {playerQueue && playerQueue.indexOf(song.slug) !== -1 && (
          <PlayerQueue currentSong={song.slug} playerQueue={playerQueue} />
        )}
        <SimilarSongs song={song} />
      </FullWidthBox>
    </div>
  );
};

function getSongById(state, id) {
  if (!state.data.loaded) {
    return null;
  }
  return state.data.songs.byIds[id];
}

function mapStateToPageProps(state, { match }) {
  const { songId } = match.params;
  return {
    playerQueue: state.player.playerQueue,
    song: getSongById(state, songId),
    lyricsLang: state.interface.lyricsLang,
  };
}

export default connect(mapStateToPageProps, {})(PlayerPage);
