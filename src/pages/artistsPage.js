import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import Media from "react-media";
import ArtistGroup from "../components/ArtistGroup";

const ArtistsPage = ({ allIds }) => {
  return (
    <Fragment>
      <Media
        queries={{
          small: "(max-width: 639px)",
          medium: "(min-width: 640px) and (max-width: 959px)",
          large: "(min-width: 960px) and (max-width: 1279px)",
          extraLarge: "(min-width: 1280px)",
        }}
      >
        {(matches) => {
          var columns = 2;
          if (matches.medium) {
            columns = 4;
          }
          if (matches.large) {
            columns = 5;
          }
          if (matches.extraLarge) {
            columns = 7;
          }
          return allIds.map((id) => (
            <ArtistGroup key={id} columns={columns} id={id} />
          ));
        }}
      </Media>
      <div className="dummyheight" style={{ height: "20rem" }}></div>
    </Fragment>
  );
};

function mapStateToPageProps({ data }) {
  return {
    allIds: data.artistGroups.allIds,
  };
}
export default connect(mapStateToPageProps, {})(ArtistsPage);
