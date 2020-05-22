import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import Media from "react-media";
import ArtistGroup from "../components/ArtistGroup";
import SEO from "../components/SEO";
import Slider from "../components/Slider";
import ArtistCard from "../components/ArtistCard";

const ArtistsPage = ({ allIds, byIds }) => {
  return (
    <Fragment>
      <SEO
        title="Danh Sách Nghệ Sĩ Thái Lan"
        description="Ullamco consequat eu enim do pariatur id. Dmco exercitation qui laborum id fugiat."
      />
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
            // <ArtistGroup key={id} columns={columns} id={id} />
            <Slider
              key={id}
              columns={columns}
              length={byIds[id].items.length}
              height={300}
            >
              {byIds[id].items.map((item, i) => (
                <ArtistCard id={item} />
              ))}
            </Slider>
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
    byIds: data.artistGroups.byIds,
  };
}
export default connect(mapStateToPageProps, {})(ArtistsPage);
