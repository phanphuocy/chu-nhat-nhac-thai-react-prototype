import React, { useRef, useState, useLayoutEffect } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import { useDrag, useGesture } from "react-use-gesture";
import clamp from "lodash.clamp";

import Button from "./Button";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const Container = styled.div`
  overflow: hidden;
  border: 1px dotted green;
  margin-bottom: 2rem;

  .heading {
    margin: 1rem 0;
  }

  .content {
    /* Make position relative for buttons to stick */
    position: relative;
  }
  ul {
    display: inline-flex;
    position: relative;
  }
  li {
    width: 200px;
    margin-right: 1rem;
  }
  .item {
    position: absolute;
    height: 100%;
    padding: 0.5rem;
  }

  .left {
    position: absolute;
    top: 40%;
    left: 0;
  }
  .right {
    position: absolute;
    top: 40%;
    right: 0;
  }
`;

const Slider = ({ columns, length, height, children }) => {
  const [dimensions, setDimensions] = useState({
    container: 0,
    slider: 0,
    wrapped: false,
  });

  const container = useRef(null);
  const slider = useRef(null);
  const [props, set, stop] = useSpring(() => ({
    opacity: 1,
    transform: `translate3d(0px,0,0)`,
  }));

  const bind = useDrag((state) => {
    if (container !== null && slider !== null) {
      console.log("OFFSET", state.offset[0]);
      set(() => {
        if (
          !dimensions.wrapped &&
          dimensions.slider + 100 <= dimensions.container + -state.offset[0]
        ) {
          state.cancel(
            (state.offset[0] = dimensions.container - dimensions.slider)
          );
          return {
            transform: `translate3d(${
              dimensions.container - dimensions.slider
            }px,0,0)`,
          };
        } else if (state.offset[0] >= 100) {
          state.cancel((state.offset[0] = 0));
          return {
            transform: `translate3d(0px,0,0)`,
          };
        } else if (state.down && !state.canceled && !dimensions.wrapped) {
          return {
            opacity: state.down ? 0.5 : 1,
            transform: `translate3d(${state.offset[0]}px,0,0)`,
          };
        } else if (dimensions.wrapped) {
          return {
            transform: state.down
              ? `translate3d(${state.distance * state.direction[0]}px,0,0)`
              : "translate3d(0px,0,0)",
          };
        }
      });
    }
  });
  useLayoutEffect(() => {
    setDimensions({
      container: container.current.clientWidth,
      slider: slider.current.clientWidth,
      wrapped: container.current.clientWidth > slider.current.clientWidth,
    });
  }, []);

  return (
    <Container ref={container}>
      <div className="heading">
        <h1>Length: {length}</h1>
      </div>
      <div className="content">
        <animated.ul {...bind()} className="slider" ref={slider} style={props}>
          {children.map((child, i) => (
            <li>{children[i]}</li>
          ))}
        </animated.ul>
        <Button className="left">
          <RiArrowLeftSLine />
        </Button>
        <Button className="right">
          <RiArrowRightSLine />
        </Button>
      </div>
    </Container>
  );
};

export default Slider;
