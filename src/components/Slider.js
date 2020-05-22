import React, { useRef, useEffect } from "react";
import { useSprings, animated } from "react-spring";
import styled from "styled-components";
import { useDrag } from "react-use-gesture";
import clamp from "lodash.clamp";
import BoundingBox from "./BoundingBox";
import Button from "./Button";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const Container = styled.div`
  overflow: hidden;

  .heading {
  }
  .content {
    position: relative;
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

const pages = [
  "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
];

const Slider = ({ columns, length, height, children }) => {
  const index = useRef(0);

  var itemWidth = 0;
  const container = useRef(null);
  const [props, set] = useSprings(length, (i) => ({
    width: 200,
    x: i * 300,
    sc: 1,
  }));
  const bind = useDrag(({ down, distance, direction, cancel, dragging }) => {
    if (down && distance > itemWidth) {
      console.log(direction[0] > 0 ? -1 : 1);
      cancel(
        (index.current = clamp(
          index.current + (direction[0] > 0 ? -2 : 2),
          0,
          length - columns
        ))
      );
      console.log("INDEX CURRENTTTTTTTTTTTTTT", index.current);
    }
    set((i) => {
      const x =
        itemWidth * (i - index.current) +
        (dragging ? direction[0] * distance : 0);
      const sc = down ? 1 - distance / window.innerWidth / 2 : 1;
      return { x, sc };
    });
  });

  useEffect(() => {
    itemWidth = Math.floor(container.current.clientWidth / (columns + 0.5));
    set((i) => {
      const x = itemWidth * i;
      return { width: itemWidth, x, display: "block" };
    });
  }, []);

  return (
    <BoundingBox>
      <Container ref={container}>
        <div className="heading">
          <h1>Length: {length}</h1>
        </div>
        <div className="content" style={{ height: height }}>
          {props.map((prop, i) => (
            <animated.div
              key={i}
              className="item"
              style={{
                width: prop.width,
                transform: prop.x.interpolate((x) => `translate3d(${x}px,0,0)`),
              }}
            >
              <animated.div
                {...bind()}
                style={{
                  height: "100%",
                  zIndex: 1000,
                  //   transform: prop.sc.interpolate((s) => `scale(${s})`),
                }}
              >
                {children[i]}
              </animated.div>
            </animated.div>
          ))}
          {/* <div className="buttonGroup"></div> */}{" "}
          <Button className="left">
            <RiArrowLeftSLine />
          </Button>
          <Button className="right">
            <RiArrowRightSLine />
          </Button>
        </div>
      </Container>
    </BoundingBox>
  );
};

export default Slider;
