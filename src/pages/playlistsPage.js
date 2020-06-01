import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import Media from "react-media";
import PlaylistGroup from "../components/Playlist/PlaylistGroup";

import { useTrail, animated } from "react-spring";

const PlaylistPage = ({ allIds }) => {
  const [uniqueShowPanel, setUniqueShowPanel] = useState(null);

  const trail = useTrail(allIds.length, {
    to: { opacity: 1, transform: `translate3d(0px,0,0)` },
    from: {
      position: "relative",
      opacity: 0,
      transform: `translate3d(0px,40px,0)`,
    },
  });

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
              {trail.map((props, key) => (
                <animated.div style={props} key={key}>
                  <PlaylistGroup
                    key={allIds[key]}
                    matches={matches}
                    columns={columns}
                    id={allIds[key]}
                    uniqueShowPanel={uniqueShowPanel}
                    onRegisterUniquePanel={onRegisterUniquePanel}
                  />
                </animated.div>
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
