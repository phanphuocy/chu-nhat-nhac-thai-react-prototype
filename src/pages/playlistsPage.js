import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import Media from "react-media";
import PlaylistGroup from "../components/Playlist/PlaylistGroup";

const PlaylistPage = ({ allIds }) => {
  const [uniqueShowPanel, setUniqueShowPanel] = useState(null);

  function onRegisterUniquePanel(name) {
    setUniqueShowPanel(name);
  }
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
              {allIds.map((id) => (
                <PlaylistGroup
                  key={id}
                  matches={matches}
                  columns={columns}
                  id={id}
                  uniqueShowPanel={uniqueShowPanel}
                  onRegisterUniquePanel={onRegisterUniquePanel}
                />
              ))}
            </Fragment>
          );
        }}
      </Media>
      <div className="dummyheight" style={{ height: "20rem" }}></div>
    </Fragment>
  );
};

function mapStateToPageProps({ data }) {
  return {
    allIds: data.playlistGroups.allIds,
  };
}

export default connect(mapStateToPageProps, {})(PlaylistPage);
