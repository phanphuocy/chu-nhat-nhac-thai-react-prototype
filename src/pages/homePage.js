import React, { Fragment, useState } from "react";
import styled from "styled-components";
import BoundingBox from "../components/BoundingBox";
import ChartBoard from "../components/ChartBoard";
// Import Redux
import { connect } from "react-redux";

// Import custom components
// import PlaylistGroup from "../components/PlaylistGroup";
// import ArtistGroup from "../components/ArtistGroup";

const EngagementContainer = styled.div`
  width: 100%;
  padding: 1rem;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 11fr 5fr;
  }
`;

const HomePage = ({ dataIsLoading }) => {
  return (
    <BoundingBox maxwidth={1280}>
      <EngagementContainer>
        <ChartBoard /> <p>pp</p>
      </EngagementContainer>
    </BoundingBox>
  );
};
function mapStateToPageProps(state) {
  return {
    dataIsLoading: state.data.loading,
  };
}
export default connect(mapStateToPageProps)(HomePage);
