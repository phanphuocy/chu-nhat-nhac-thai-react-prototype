import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const StyledBoundingBox = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: ${(props) => `${props.maxwidth}px`};

  @media (min-width: 640px) {
    width: 640px;
  }
  @media (min-width: 768px) {
    width: 768px;
  }
  @media (min-width: 1024px) {
    width: 1024px;
  }
  @media (min-width: 1280px) {
    width: 1280px;
  }
  @media (min-width: 1600px) {
    width: 1600px;
  }
`;

const BoundingBox = ({ children, maxwidth }) => (
  <StyledBoundingBox maxwidth={maxwidth}>{children}</StyledBoundingBox>
);

BoundingBox.propTypes = {
  maxwidth: PropTypes.number,
};

BoundingBox.defaultProps = {
  maxwidth: 1600,
};

export default BoundingBox;
