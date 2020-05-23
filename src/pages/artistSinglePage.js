import React from "react";
import SEO from "../components/SEO";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {
  RiMvLine,
  RiPolaroid2Line,
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
  RiFilter3Line,
} from "react-icons/ri";

// Import Redux
import { connect } from "react-redux";
import { setCurrentSong, registerQueueSongs } from "../actions/playerAction";

// Import custom components
import BoundingBox from "../components/BoundingBox";
import ArtistInfo from "../components/Artist/ArtistInfo";
import ArtistSongsList from "../components/Artist/ArtistSongsList";

const TabGroup = styled.div`
  margin-top: 1rem;
  width: 100%;
  border-bottom: 2px solid rgba(24, 24, 24, 0.5);
  display: flex;
  justify-content: center;

  button {
    background-color: transparent;
    transform: translateY(2px);
    margin: 0 0.5rem 0 0;
    border: none;
    color: whitesmoke;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    border-bottom: 2px solid rgba(24, 24, 24, 0.5);

    svg {
      margin-right: 0.5rem;
    }

    &:hover,
    &:active {
      border-bottom: 2px solid white;
    }

    &:last-child {
      margin: 0;
    }
  }
`;

const ArtistSinglePage = ({
  artist,
  songs,
  registerQueueSongs,
  setCurrentSong,
}) => {
  let history = useHistory();

  console.log(artist);
  console.log("songs", songs);

  if (!artist) {
    history.push("/404");
  }

  function playlistPlayButtonClickedHandler(songs) {
    var songsArray = songs.map((song) => song.slug);
    setCurrentSong(songsArray[0]);
    registerQueueSongs(songsArray);
    history.push(`/p/${songsArray[0]}`);
  }

  return (
    <BoundingBox maxwidth={1024}>
      <SEO title={artist.name} description="asdad" ogImage={artist.avatar} />
      <ArtistInfo artist={artist} />

      <TabGroup>
        <button className={"active"}>
          <RiMvLine size={24} />
          BÀI HÁT
        </button>
        <button>
          <RiPolaroid2Line size={24} />
          ẢNH
        </button>
      </TabGroup>
      <ArtistSongsList
        songs={songs}
        playbuttonHandler={playlistPlayButtonClickedHandler}
      />
      <div className="dummyheight" style={{ height: "20rem" }}></div>
    </BoundingBox>
  );
};

function getArtistsSongs(data, id) {
  let songs = [];
  data.artists.byIds[id].songs.forEach((songId) => {
    if (data.songs.allIds.indexOf(songId) !== -1) {
      songs.push(data.songs.byIds[songId]);
      console.log(songId);
    }
  });
  return songs;
}

function mapStateToPageProps({ data }, ownProps) {
  const id = ownProps.match.params.id;

  return {
    artist: data.artists.byIds[id],
    songs: getArtistsSongs(data, id),
  };
}

export default connect(mapStateToPageProps, {
  registerQueueSongs,
  setCurrentSong,
})(ArtistSinglePage);
