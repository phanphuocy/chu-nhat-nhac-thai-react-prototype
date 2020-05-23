import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledRow = styled.div`
  background-color: whitesmoke;
  color: gray;
  padding: 0.5rem 1rem;
`;

const QuickResultRow = ({ result }) => {
  let row;

  switch (result.sys.contentType.sys.id) {
    case "songs":
      row = (
        <StyledRow>
          {result.fields.titleEn} - {result.fields.titleTh}
        </StyledRow>
      );
      break;
    default:
      row = <StyledRow>Unknown type</StyledRow>;
  }

  return <div>{row}</div>;
};

export default QuickResultRow;
