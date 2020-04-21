import React from "react";
import styled from "styled-components";

const StyledBoundingBox = styled.div`
  width: 100%;
  margin: 0 auto;

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

const BoundingBox = ({ children }) => (
  <StyledBoundingBox>{children}</StyledBoundingBox>
);

export default BoundingBox;
