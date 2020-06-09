import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import GroupWithSlider from "../styled-components/GroupWithSlider";

// Import React GA
import ReactGa from "react-ga";

// Import icons
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";

// Import Redux
import { connect } from "react-redux";

// Import custom components
import PreviewPanel from "./PreviewPanel";
import PlaylistCard from "./PlaylistCard";

const PlaylistGroup = ({
  matches,
  columns,
  group,
  uniqueShowPanel,
  onRegisterUniquePanel,
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewSongs, setPreviewSongs] = useState([]);
  const [firstIndex, setFirstIndex] = useState(0);
  const [reachEnd, setReachEnd] = useState(false);
  const [reachStart, setReachStart] = useState(true);

  const { name, items } = group;

  function increaseIndexHandler() {
    if (firstIndex + columns + columns >= items.length) {
      setFirstIndex(items.length - columns);
      setReachEnd(true);
    } else {
      setFirstIndex(firstIndex + columns);
    }
    setReachStart(false);
  }
  function decreaseIndexHandler() {
    if (firstIndex - columns < 0) {
      setFirstIndex(0);
      setReachStart(true);
    } else {
      setFirstIndex(firstIndex - columns);
    }
    setReachEnd(false);
  }

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

  function setShowPreviewHandler() {
    setShowPreview(!showPreview);
  }

  const props = useSpring({
    transform: `translateX(calc(-1 * ${firstIndex} * (100% - 1rem) / ${columns}))`,
  });

  return (
    <GroupWithSlider columns={columns} disabled={items.length <= columns}>
      <div className="header">
        <h3 className="groupName">{name}</h3>
        <div className="buttonGroup">
          <button
            className="navButton"
            disabled={items.length <= columns || reachStart === true}
          >
            <RiArrowLeftSLine onClick={decreaseIndexHandler} size={24} />
          </button>
          <button
            className="navButton"
            disabled={items.length <= columns || reachEnd === true}
          >
            <RiArrowRightSLine onClick={increaseIndexHandler} size={24} />
          </button>
        </div>
      </div>
      <div
        className="sliderContainer"
        style={{ height: `calc(100vw  / ${columns})` }}
      >
        <animated.div style={{ ...props }} className="slider">
          {items.map((item, i) => (
            <div
              key={group.items[i]}
              className="item"
              style={{ left: `calc((100% - 1rem) * ${i / columns})` }}
            >
              <PlaylistCard
                id={group.items[i]}
                onCardClickedHandler={onCardClickedHandler}
              />
            </div>
          ))}
        </animated.div>
      </div>
      {showPreview && uniqueShowPanel === group.id && (
        <PreviewPanel
          songs={previewSongs}
          onClosePreviewPanel={onClosePreviewPanel}
        />
      )}
    </GroupWithSlider>
  );
};

function mapStateToProps({ data }, ownProps) {
  const { id } = ownProps;
  return {
    group: data.playlistGroups.byIds[id],
  };
}

export default connect(mapStateToProps)(PlaylistGroup);
