import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { RiShareCircleLine, RiArrowGoBackLine } from "react-icons/ri";
import { withRouter } from "react-router-dom";
import { FacebookShareButton, FacebookShareCount } from "react-share";

const StyledActionContainer = styled.div`
  width: 100%;
  display: flex;
  max-width: 1280px;
  margin: 0 auto;

  .wrapper {
    padding: 1rem;
  }
`;

const ActionBox = styled.div`
  padding: 1rem 3rem;
  button {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;

    span {
      margin-left: 0.5rem;
    }
  }

  button:hover > span,
  button:hover > svg {
    color: goldenrod;
  }

  .react-share__ShareButton {
    display: flex;
    align-items: center;
  }

  .goBackButton {
    background-color: transparent;
    border: none;
    padding: 0px;
    font: inherit;
    color: inherit;
    cursor: pointer;
  }
`;

const ButtonIconWrapper = styled.div`
  transition: background-color 0.5s ease;
  background-color: rgba(255, 255, 255, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.5rem;
  padding: 0.5rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  svg {
    color: whitesmoke;
  }
`;

const ActionContainer = ({ url, children, history }) => {
  return (
    <StyledActionContainer>
      <ActionBox>
        <button className="goBackButton" onClick={() => history.goBack()}>
          <ButtonIconWrapper>
            <RiArrowGoBackLine size={24} />
          </ButtonIconWrapper>
          <span>Quay Lại</span>
        </button>
        <FacebookShareButton url={url}>
          <ButtonIconWrapper>
            <RiShareCircleLine size={24} />
          </ButtonIconWrapper>
          <span>
            Chia Sẻ
            <FacebookShareCount url={url} />
          </span>
        </FacebookShareButton>
      </ActionBox>
      <div className="wrapper">{children}</div>
    </StyledActionContainer>
  );
};

ActionContainer.propTypes = {
  url: PropTypes.string.isRequired,
};

ActionContainer.defaultProps = {
  url: "http://localhost:3000",
};

export default withRouter(ActionContainer);
