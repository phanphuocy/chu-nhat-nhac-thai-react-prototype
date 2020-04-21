import React, { useState } from "react";
import styled from "styled-components";

// Import React GA
import ReactGa from "react-ga";

// Import icons
import { TiChevronLeft, TiChevronRight } from "react-icons/ti";

// Import Redux
import { connect } from "react-redux";

// Import custom components
import PreviewPanel from "./PreviewPanel";
import PlaylistCard from "./PlaylistCard";

const PlaylistGroup = ({
  matches,
  group,
  uniqueShowPanel,
  onRegisterUniquePanel,
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewSongs, setPreviewSongs] = useState([]);

  const { name, items } = group;

  function onCardClickedHandler(songs) {
    ReactGa.event({
      category: "Button",
      action: `Select playlist ${name}`,
    });
    onRegisterUniquePanel(group.id);
    setPreviewSongs(songs);
    setShowPreview(true);
  }

  function onClosePreviewPanel() {
    setShowPreview(false);
  }

  var boxes = [];
  var columns = 2;
  if (matches.medium) {
    columns = 3;
  }
  if (matches.large) {
    columns = 4;
  }
  if (matches.extraLarge) {
    columns = 5;
  }

  function setShowPreviewHandler() {
    setShowPreview(!showPreview);
  }

  for (var i = 0; i < items.length; i++) {
    boxes.push(
      <PlaylistCard
        columns={columns}
        playlist={group.items[i]}
        onCardClickedHandler={onCardClickedHandler}
      />
    );
  }
  return (
    <Container>
      <Header disabled={items.length <= columns}>
        <h3>{name}</h3>
        <div className="buttonGroup">
          <Button>
            <TiChevronLeft size={24} />
          </Button>
          <Button>
            <TiChevronRight size={24} />
          </Button>
        </div>
      </Header>
      <Slider>{boxes}</Slider>
      {showPreview && uniqueShowPanel === group.id && (
        <PreviewPanel
          songs={previewSongs}
          onClosePreviewPanel={onClosePreviewPanel}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1600px;
  margin: 2rem auto 0rem;
`;

const Button = styled.button``;

const Header = styled.div`
  align-items: center;
  margin-bottom: 1rem;
  margin-left: 1rem;
  display: flex;
  justify-content: space-between;
  .buttonGroup {
    margin-right: 1rem;
  }

  button {
    background-color: ${(props) =>
      props.disabled ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"};
    border-radius: 2rem;
    border: none;
    padding: 0.5rem;
    margin-right: 8px;

    svg {
      color: ${(props) => (props.disabled ? "rgba(0, 0, 0, 0.1)" : "#ccc")};
    }

    &:last-child {
      margin-right: 0rem;
    }

    &:hover,
    &:active {
      background-color: ${(props) =>
        !props.disabled && "rgba(255, 255, 255, 0.3)"};
    }
  }

  h3 {
    font-size: 2rem;
  }
`;

const Slider = styled.div`
  margin-left: 1rem;
`;

const Box = styled.div`
  /* border: 1px dotted gray; */
  display: inline-block;
  width: calc(100% / ${(props) => props.columns});
  padding-bottom: calc(100% / ${(props) => props.columns});
  position: relative;

  .wrapper {
    position: absolute;
    overflow: hidden;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: 1rem;
    padding-right: 1rem;
  }
`;

const MockImage = styled.a`
  width: 100%;
  height: 100%;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Shadow */
  -webkit-box-shadow: 0px 10px 8px -6px rgba(0, 0, 0, 0.06);
  -moz-box-shadow: 0px 10px 8px -6px rgba(0, 0, 0, 0.06);
  box-shadow: 0px 10px 8px -6px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 10px 8px -6px rgba(0, 0, 0, 0.06);
    transform: scale(0.98);
  }

  p {
    text-align: center;
  }
`;

function mapStateToProps(state, ownProps) {
  const { id } = ownProps;
  return {
    group: state.data.playlistGroups[id],
  };
}

export default connect(mapStateToProps)(PlaylistGroup);
