import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.onSurface};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 1rem;
  }

  svg {
    width: ${(props) => (props.size ? props.size : "24px")};
    height: ${(props) => (props.size ? props.size : "24px")};
  }
`;

const Button = ({ children, label, onClickFx }) => {
  return (
    <StyledButton onClick={() => onClickFx()}>
      {children}
      {children && <div style={{ width: "0.4rem", height: "100%" }}></div>}
      <span>{label}</span>
    </StyledButton>
  );
};

export default Button;
