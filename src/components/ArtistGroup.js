import React, { useState } from "react";
import GroupWithSlider from "./styled-components/GroupWithSlider";
import { useSpring, animated } from "react-spring";

// Import React GA
import ReactGa from "react-ga";

// Import icons
import { TiChevronLeft, TiChevronRight } from "react-icons/ti";

// Import Redux
import { connect } from "react-redux";

// Import custom components
import ArtistCard from "./ArtistCard";

const ArtistGroup = ({ columns, group }) => {
  const { name, items } = group;

  // Creating animation
  const [firstIndex, setFirstIndex] = useState(0);
  const [reachEnd, setReachEnd] = useState(false);
  const [reachStart, setReachStart] = useState(true);

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

  const props = useSpring({
    transform: `translateX(calc(-1 * ${firstIndex} * (100% - 1rem) / ${columns}))`,
  });

  return (
    <GroupWithSlider disabled={items.length <= columns} columns={columns}>
      <div className="header">
        <h3 className="groupName">{name}</h3>
        <div className="buttonGroup">
          <button
            className="navButton"
            onClick={decreaseIndexHandler}
            disabled={items.length <= columns || reachStart === true}
          >
            <TiChevronLeft size={24} />
          </button>
          <button
            className="navButton"
            onClick={increaseIndexHandler}
            disabled={items.length <= columns || reachEnd === true}
          >
            <TiChevronRight size={24} />
          </button>
        </div>
      </div>
      {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
      <div
        className="sliderContainer"
        style={{ height: `calc(100vw * 1.3  / ${columns})` }}
      >
        <animated.div style={{ ...props }} className="slider">
          {items.map((item, i) => (
            <div
              key={items[i]}
              className="item"
              style={{ left: `calc((100% - 1rem) * ${i / columns})` }}
            >
              <ArtistCard id={items[i]} />
            </div>
          ))}
        </animated.div>
      </div>
    </GroupWithSlider>
  );
};

function mapStateToProps({ data }, { id }) {
  return {
    group: data.artistGroups.byIds[id],
  };
}

export default connect(mapStateToProps)(ArtistGroup);
