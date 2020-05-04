import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FacebookShareButton } from "react-share";
import { RiShareLine } from "react-icons/ri";

const StyledNewsCard = styled.div`
    background-color: ${(props) => props.theme.colors.surface};
    padding: 1rem;
    overflow: hidden;
    border-radius: 0.5rem;

    .category {
        margin-bottom:0.5rem;
        color: ${(props) => props.theme.colors.primary}
    }
    .identifier {
        margin-bottom: 1rem;
    }
        .content {
            background-color: rgba(255,255,255,0.05);

            p {
                padding: 1rem;
            }
        }
    img {
        width: 100%;
    }

    .actions {
        margin-top: 1rem;
        button {
            background-color: transparent;
            border: none;
            color: white;
            display: flex;
            align-items: center;

            svg {
                margin-right: 0.5rem;
            }
        } 

    }
`;

const NewsCard = ({ news }) => {
  return (
    <StyledNewsCard>
      <h4 className="category">{news.category}</h4>
      <h5 className="identifier">{news.identifier}</h5>
      <div className="content">
        {news.image && (
          <img src={news.image.url} alt={news.image.description} />
        )}
        <p>{news.body}</p>
      </div>
      <div className="actions">
        <FacebookShareButton
          url={`https://chu-nhat-nhac-thai.netlify.app${news.url}`}
        >
          <button>
            <RiShareLine size={24} />
            Chia Sẻ
          </button>
        </FacebookShareButton>
      </div>
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
