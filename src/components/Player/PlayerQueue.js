import React from "react";
import styled from "styled-components";

import SongRow from "../SongRow";

// Import Redux's
import { connect } from "react-redux";
import { setCurrentSong } from "../../actions/playerAction";

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

const PlayerQueue = ({ playerQueue, currentSong }) => {
  return (
    <Container>
      <Header>
        <p>Danh sách phát</p>
      </Header>
      <Stroke />
      <ul>
        {playerQueue.map((id) => (
          <SongRow playing={id === currentSong} songId={id} key={id} />
        ))}
      </ul>
    </Container>
  );
};

export default connect(null, { setCurrentSong })(PlayerQueue);
