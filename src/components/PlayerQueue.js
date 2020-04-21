import React from "react";
import styled from "styled-components";

import SongRow from "./SongRow";

// Import Redux's
import { connect } from "react-redux";
import { setCurrentSong } from "../actions/playerAction";

const Container = styled.div`
  width: 100%;
`;

const Header = styled.div`
  padding: 0.5rem 1rem;

  p {
    color: whitesmoke;
  }
`;

const Stroke = styled.div`
  height: 2px;
  width: 100%;
  margin: 0 1rem 0.5rem;

  background-color: #292929;
`;

const PlayerQueue = ({ playerQueue, setCurrentSong }) => {
  function onSongRowPlayButtonClicked(song) {
    setCurrentSong(song);
  }

  return (
    <Container>
      <Header>
        <p>Danh sách phát</p>
      </Header>
      <Stroke />
      <ul>
        {playerQueue.map((song) => (
          <SongRow
            song={song}
            key={song.sys.id}
            onSongRowPlayButtonClicked={onSongRowPlayButtonClicked}
          />
        ))}
      </ul>
    </Container>
  );
};

export default connect(null, { setCurrentSong })(PlayerQueue);
