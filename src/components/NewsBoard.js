import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import NewsCard from "../components/NewsCard";

const StyledNewsBoard = styled.div`
  margin-left: 1rem;
  background-color: ${(props) => props.theme.colors.background};

  .header {
    padding: 1.5rem 1rem;
    background: rgb(131, 58, 180);
    font-weight: bold;
    color: whitesmoke;
    font-size: 1.25rem;
    text-align: center;
  }

  .items {
    height: 40rem;
    overflow-y: scroll;
  }
`;

const NewsBoard = ({ allIds }) => {
  allIds = allIds.slice(0, 3);
  return (
    <StyledNewsBoard>
      <div className="header">Có Gì Hot</div>
      <div className="items">
        {allIds.map((id) => (
          <NewsCard newsId={id} />
        ))}
      </div>
    </StyledNewsBoard>
  );
};

function mapStateToProps({ data }) {
  return {
    allIds: data.news.allIds,
  };
}

export default connect(mapStateToProps)(NewsBoard);
