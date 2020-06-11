import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  width: ${(props) => (props.full ? "100%" : "")};
  background-color: ${(props) =>
    props.primary
      ? props.theme.colors.pink["600"]
      : props.theme.colors.surface};
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

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

const Button = ({ className, full, children, primary, label, onClickFx }) => {
  return (
    <StyledButton
      full={full}
      primary={primary}
      className={className}
      onClick={() => onClickFx()}
    >
      {children}
      {children && <div style={{ width: "0.4rem", height: "100%" }}></div>}
      <span>{label}</span>
    </StyledButton>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onClickFx: PropTypes.func.isRequired,
};

Button.defaultProps = {
  onClickFx: () => console.log("YOU NEED TO PROVIDE A FUNCTION TO THIS BUTTON"),
};

export default Button;
