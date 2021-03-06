import React, { useState, useRef, useEffect } from "react";
import GroupWithSlider from "../styled-components/GroupWithSlider";
import { useSpring, animated } from "react-spring";

// Import React GA
import ReactGA from "react-ga";

// Import icons
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";

// Import Redux
import { connect } from "react-redux";

// Import custom components
import ArtistCard from "./ArtistCard";

const ArtistGroup = ({ columns, group }) => {
  const { name, items } = group;

  const intersectTarget = useRef(null);

  useEffect(() => {
    const opts = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };
    const callback = (list) => {
      list.forEach((entry) => {
        if (entry.isIntersecting) {
          ReactGA.event({
            category: "Scrolling",
            action: `Scrolled to artist group ${name}`,
          });
        }
      });
    };
    const observerScroll = new IntersectionObserver(callback, opts);

    observerScroll.observe(intersectTarget.current);
  }, []);

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
    ReactGA.event({
      category: "Engage w/ Artist",
      action: "Swipe to See More Artist in Group",
      label: name,
    });
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
      <div className="header" ref={intersectTarget}>
        <h2 className="groupName">{name}</h2>
        <div className="buttonGroup">
          <button
            className="navButton"
            onClick={decreaseIndexHandler}
            disabled={items.length <= columns || reachStart === true}
          >
            <RiArrowLeftSLine size={24} />
          </button>
          <button
            className="navButton"
            onClick={increaseIndexHandler}
            disabled={items.length <= columns || reachEnd === true}
          >
            <RiArrowRightSLine size={24} />
          </button>
        </div>
      </div>
      {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
      <div
        className="sliderContainer"
        style={{ height: `calc(100vw * 1.4  / ${columns})` }}
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
