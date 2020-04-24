import React from "react";
import styled from "styled-components";

const StyledTabGroup = styled.div`
  margin-top: 1rem;
  width: 100%;
  border-bottom: 2px solid rgba(24, 24, 24, 0.5);
  display: flex;
  justify-content: center;

  .active {
    border-bottom: 2px solid white;
  }

  button {
    background-color: transparent;
    transform: translateY(2px);
    margin: 0 0.5rem 0 0;
    border: none;
    color: whitesmoke;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    border-bottom: 2px solid rgba(24, 24, 24, 0.5);

    svg {
      margin-right: 0.5rem;
    }

    &:hover,
    &:active {
      border-bottom: 2px solid white;
    }

    &:last-child {
      margin: 0;
    }
  }
`;

const TabGroup = ({ children }) => {
  return <StyledTabGroup>{children}</StyledTabGroup>;
};

export default TabGroup;
