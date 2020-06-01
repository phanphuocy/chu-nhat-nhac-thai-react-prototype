import React from "react";
import HashLoader from "react-spinners/HashLoader";
import styled from "styled-components";

const StyledScreen = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.onBackground};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoaderScreen = () => {
  return (
    <StyledScreen>
      <HashLoader size={50} color="white" margin={2} />
      <p style={{ marginTop: "1rem" }}>Vui Lòng Đợi Chút Xíu Nhé ;)</p>
    </StyledScreen>
  );
};

export default LoaderScreen;
