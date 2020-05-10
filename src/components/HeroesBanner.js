import React, { useState, useEffect } from "react";
import { useTransition, animated, config } from "react-spring";
import BoundingBox from "./BoundingBox";
import RatioBoundingBox from "./RatioBoundingBox";
import styled from "styled-components";
import { connect } from "react-redux";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Media from "react-media";

const StyledHeroesBanner = styled.div`
  position: relative;
  button {
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    padding: 0.25rem;
    border-radius: 2rem;
    position: absolute;
    top: calc(50% - 1rem);
  }

  @media (min-width: 768px) {
    button {
      padding: 0.5rem;
    }
  }
  svg {
    width: 1.5rem;
  }
  .leftArrow {
    left: 1rem;
  }
  .rightArrow {
    right: 1rem;
  }
  .bg {
    overflow: hidden;
    position: relative;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      filter: blur(8px);
      -webkit-filter: blur(8px);
      transform: scale(1.1);
    }
  }
`;

const HeroesBanner = ({ heroImages }) => {
  const { featuredIds, byIds } = heroImages;
  const [index, set] = useState(0);
  const transitions = useTransition(featuredIds[index], (item) => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  function switchImage(direction) {
    if (direction !== "left" && direction !== "right") {
      return;
    }
    if (direction === "left") {
      if (index <= 0) {
        set(featuredIds.length - 1);
      } else {
        set(index - 1);
      }
    } else if (direction === "right") {
      if (index >= featuredIds.length - 1) {
        set(0);
      } else {
        set(index + 1);
      }
    } else {
      return;
    }
  }

  return (
    <StyledHeroesBanner>
      {transitions.map(({ item, props, key }, i) => (
        <animated.div key={key}>
          <div className="bg">
            <img
              className="bg"
              src={byIds[item].image.url}
              alt={byIds[item].title}
              width="100%"
              object-fit="cover"
            />
          </div>
          <BoundingBox>
            <Media queries={{ small: { maxWidth: 767 } }}>
              {(matches) => (
                <RatioBoundingBox ratio={matches.small ? 0.33 : 0.25}>
                  <img
                    src={byIds[item].image.url}
                    alt={byIds[item].title}
                    width="100%"
                    object-fit="cover"
                    style={{ ...props }}
                  />
                  <button
                    className="leftArrow"
                    onClick={() => switchImage("left")}
                  >
                    <RiArrowLeftSLine size={24} />
                  </button>
                  <button
                    className="rightArrow"
                    onClick={() => switchImage("right")}
                  >
                    <RiArrowRightSLine size={24} />
                  </button>
                </RatioBoundingBox>
              )}
            </Media>
          </BoundingBox>
        </animated.div>
      ))}
    </StyledHeroesBanner>
  );
};

function mapStateToProps({ data }) {
  return {
    heroImages: data.heroImages,
  };
}

export default connect(mapStateToProps)(HeroesBanner);
