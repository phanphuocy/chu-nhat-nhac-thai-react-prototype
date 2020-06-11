import React from "react";
import styled from "styled-components";

const StyledGroup = styled.div`
  max-width: 1600px;
  margin: 1rem auto 0rem;

  .header {
    align-items: center;
    margin-left: 1rem;
    display: flex;
    justify-content: space-between;
  }

  .buttonGroup {
    margin-right: 1rem;
  }

  .navButton {
    background-color: ${(props) =>
      props.disabled ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.3)"};
    border-radius: 2rem;
    border: none;
    padding: 0.5rem;
    margin-right: 8px;

    svg {
      color: ${(props) =>
        props.disabled ? "rgba(255, 255, 255, 0.3)" : "#ccc"};
    }
    &:last-child {
      margin-right: 0rem;
    }
    &:hover,
    &:active {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }

  .navButton:disabled {
    background-color: rgba(0, 0, 0, 0.1);
    svg {
      color: rgba(255, 255, 255, 0.3);
    }
  }

  .groupName {
    color: ${(props) => props.theme.colors.onBackground};
    font-size: 1.5rem;
  }

  .sliderContainer {
    width: 100%;
    overflow-x: hidden;
    padding-top: 1rem;
  }

  .slider {
    margin-left: 1rem;
    position: relative;
    height: 100%;
  }

  .item {
    width: ${(props) => `calc((100% - 1rem) / ${props.columns})`};
    height: 100%;
    position: absolute;
    padding-right: 1rem;
    padding-bottom: 1rem;
  }
`;

const GroupWithSlider = ({ children, columns, disabled }) => {
  return (
    <StyledGroup columns={columns} disabled={disabled}>
      {children}
    </StyledGroup>
  );
};

export default GroupWithSlider;
