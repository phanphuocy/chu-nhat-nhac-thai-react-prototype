import React, { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledRatioBox = styled.div`
  padding-bottom: calc(100% * ${(props) => (props.ratio ? props.ratio : 1)});
  width: 100%;

  position: relative;

  .wrapper {
    position: absolute;
    overflow: hidden;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const RatioBoundingBox = ({ children, ratio, style }) => (
  <StyledRatioBox ratio={ratio}>
    <div style={{ ...style }} className="wrapper">
      {children}
    </div>
  </StyledRatioBox>
);

RatioBoundingBox.propTypes = {
  ratio: PropTypes.number.isRequired,
};

export default RatioBoundingBox;
