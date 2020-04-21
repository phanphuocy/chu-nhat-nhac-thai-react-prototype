import React, { Fragment, useState } from "react";
import Media from "react-media";

// Import Redux
import { connect } from "react-redux";

// Import custom components
import PlaylistGroup from "../components/PlaylistGroup";
import ArtistGroup from "../components/ArtistGroup";
// import Group from "../components/Group";

const HomePage = ({
  playlistGroupsAllIds,
  artistGroupsAllIds,
  dataIsLoading,
}) => {
  const [uniqueShowPanel, setUniqueShowPanel] = useState(null);

  function onRegisterUniquePanel(name) {
    setUniqueShowPanel(name);
  }

  if (
    dataIsLoading ||
    playlistGroupsAllIds === null ||
    artistGroupsAllIds === null
  ) {
    return <p>Loading</p>;
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
        {(matches) => (
          <Fragment>
            {playlistGroupsAllIds.map((each) => (
              <PlaylistGroup
                key={each}
                matches={matches}
                id={each}
                uniqueShowPanel={uniqueShowPanel}
                onRegisterUniquePanel={onRegisterUniquePanel}
              />
            ))}
            {artistGroupsAllIds.map((each) => (
              <ArtistGroup
                key={each}
                matches={matches}
                id={each}
                uniqueShowPanel={uniqueShowPanel}
                onRegisterUniquePanel={onRegisterUniquePanel}
              />
            ))}
            {/* <Group
              matches={matches}
              group={playlistGroups["group-1"]}
              type="playlist"
            />
            <Group
              matches={matches}
              group={artistGroups["artist-group-1"]}
              type="artist"
            /> */}
          </Fragment>
        )}
      </Media>
      <div className="dummyheight" style={{ height: "20rem" }}></div>
    </Fragment>
  );
};
function mapStateToPageProps(state) {
  return {
    playlistGroupsAllIds: state.data.playlistGroupsAllIds,
    artistGroupsAllIds: state.data.artistGroupsAllIds,
    dataIsLoading: state.data.loading,
  };
}
export default connect(mapStateToPageProps)(HomePage);
