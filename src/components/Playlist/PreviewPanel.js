import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

import SongRow from "../SongRow";

const PreviewPanel = ({ songs, onClosePreviewPanel }) => {
  return (
    <Container>
      {/* //   <Header>
    //     <p>{`${songs.length} bài hát`}</p>
    //     <button onClick={() => onClosePreviewPanel()}>
    //       <MdClose size={32} />
    //     </button>
    //   </Header> */}
      <ul>
        {songs.map((song) => (
          <SongRow songId={song} key={song} />
        ))}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100px;
  width: 100%;
  margin-right: 1rem;
`;

const Header = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;

  button {
    padding: 0;
    margin: 0;
    border: none;
    background: none;

    svg {
      color: lightgray;
    }
  }
`;

export default PreviewPanel;
