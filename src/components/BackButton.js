import React from "react";
import { useHistory } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 0.5rem;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  top: 1rem;
  left: 1rem;
  color: whitesmoke;
  span {
    font-size: 14px;
  }
  &:hover {
    color: ${(props) => props.theme.colors.primary};
    span {
      text-decoration: underline;
    }
    svg {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

const BackButton = () => {
  const history = useHistory();
  function handleClick() {
    history.goBack();
  }
  return (
    <StyledButton onClick={handleClick}>
      <RiArrowLeftLine size={24} />
      <span> QUAY LẠI</span>
    </StyledButton>
  );
};

export default BackButton;
