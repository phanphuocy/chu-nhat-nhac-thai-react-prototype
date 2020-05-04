import React from "react";
import styled from "styled-components";
import BoundingBox from "../components/BoundingBox";
import { connect } from "react-redux";
import Masonry from "react-masonry-css";
import Media from "react-media";
import NewsCard from "../components/NewsCard";

const StyledNewsPage = styled.div`
max-width: 960px;
margin: 1rem auto;
.my-masonry-grid {
  display: flex;
  margin-left: -1rem; /* gutter size offset */
  width: 100%;
}
.my-masonry-grid_column {
  padding-left: 2rem; /* gutter size */
  background-clip: padding-box;
}

@media (min-width: 960px) {
  .my-masonry-grid_column {
  padding-left: 1rem; /* gutter size */
  background-clip: padding-box;
}
}

 
/* Style your items */
.my-masonry-grid_column > div { /* change div to reference your elements you put in <Masonry> */
  margin-bottom: 1rem;
}
 
`;

const NewsPage = ({ allIds }) => {
  return (
    <StyledNewsPage>
      <Media
        queries={{
          small: "(max-width: 639px)",
          medium: "(min-width: 640px) and (max-width: 959px)",
          large: "(min-width: 960px)",
        }}
      >
        {(matches) => {
          var columns = 1;
          if (matches.medium) {
            columns = 2;
          }
          if (matches.large) {
            columns = 3;
          }
          return (
            <Masonry
              breakpointCols={columns}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {allIds.map((id) => (
                <NewsCard newsId={id} />
              ))}
            </Masonry>
          );
        }}
      </Media>
    </StyledNewsPage>
  );
};
function mapStateToPageProps({ data }) {
  return {
    allIds: data.news.allIds,
  };
}
export default connect(mapStateToPageProps)(NewsPage);
