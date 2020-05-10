import React, { Fragment, useState } from "react";
import styled from "styled-components";
import Media from "react-media";
import BoundingBox from "../components/BoundingBox";
import ChartBoard from "../components/ChartBoard";
import NewsBoard from "../components/NewsBoard";
import GradientBackground from "../components/GradientBackground";
import FeaturedBanner from "../components/FeaturedBanner";
// Import Redux
import { connect } from "react-redux";

// Import custom components
import PlaylistGroup from "../components/PlaylistGroup";
import ArtistGroup from "../components/ArtistGroup";

const HomePage = ({ playlistIds, artistIds }) => {
  return (
    <React.Fragment>
      <FeaturedBanner />
      <GradientBackground>
        <ChartBoard />
      </GradientBackground>
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
            columns = 3;
          }
          if (matches.large) {
            columns = 4;
          }
          if (matches.extraLarge) {
            columns = 5;
          }
          return (
            <Fragment>
              {playlistIds.map((id) => (
                <PlaylistGroup
                  key={id}
                  matches={matches}
                  columns={columns}
                  id={id}
                />
              ))}
            </Fragment>
          );
        }}
      </Media>
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
          return artistIds.map((id) => (
            <ArtistGroup key={id} columns={columns} id={id} />
          ));
        }}
      </Media>
    </React.Fragment>
  );
};
function mapStateToPageProps({ data }) {
  return {
    playlistIds: data.playlistGroups.featuredIds,
    artistIds: data.artistGroups.featuredIds,
  };
}
export default connect(mapStateToPageProps)(HomePage);
