import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledFullWidthBox = styled.div`
  width: 100%;
  margin: 0 auto;

  @media (min-width: ${(props) =>
      props.contraint ? props.constraint : "1600px"}) {
    width: ${(props) => (props.contraint ? props.constraint : "1600px")};
  }
`;

const FullWidthBox = ({ children, constraint }) => {
  constraint = `${constraint}px`;
  return (
    <StyledFullWidthBox constraint={constraint}>{children}</StyledFullWidthBox>
  );
};

FullWidthBox.propTypes = {
  constraint: PropTypes.number.isRequired,
};

export default FullWidthBox;
