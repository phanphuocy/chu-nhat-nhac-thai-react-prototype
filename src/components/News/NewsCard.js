import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const StyledNewsCard = styled.div`
  background-color: ${(props) => props.theme.colors.surface};
  padding: 1rem;
  overflow: hidden;
  border-radius: 0.5rem;
  margin-top: 1rem;

  .category {
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.colors.primary};
  }
  .identifier {
    margin-bottom: 1rem;
  }
  .body {
    padding: 1rem 0;
  }

  img {
    width: 100%;
  }
`;

const NewsCard = ({ news }) => {
  return (
    <StyledNewsCard>
      <h4 className="category">{news.category}</h4>
      <h5 className="identifier">{news.identifier}</h5>
      {news.image && <img src={news.image.url} alt={news.image.description} />}
      <p className="body">{news.body}</p>
    </StyledNewsCard>
  );
};

NewsCard.propTypes = {
  newsId: PropTypes.string.isRequired,
};

function mapStateToProps({ data }, { newsId }) {
  return {
    news: data.news.byIds[newsId],
  };
}
export default connect(mapStateToProps)(NewsCard);
