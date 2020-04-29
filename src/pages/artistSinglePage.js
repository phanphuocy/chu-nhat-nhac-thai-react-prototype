import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {
  RiMvLine,
  RiPolaroid2Line,
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
  RiFilter3Line,
} from "react-icons/ri";

import orderBy from "lodash.orderby";
// Import Redux
import { connect } from "react-redux";

// Import custom components
import BoundingBox from "../components/BoundingBox";
import ArtistInfo from "../components/ArtistInfo";
import ArtistSongRow from "../components/ArtistSongRow";

const FilterGroup = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;

  svg {
    margin-right: 0.5rem;
  }

  color: lightgray;
  .buttonGroup,
  .filterHeading {
    display: flex;
    align-items: center;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  font-size: 1rem;
  background-color: ${(props) =>
    props.active ? "rgba(24,24,24,0.3)" : "transparent"};
  border: none;
  color: lightgray;

  &:last-child {
    margin: 0;
  }
`;

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

const ArtistSinglePage = ({ artist, songs }) => {
  let history = useHistory();

  console.log(artist);
  console.log("songs", songs);

  if (!artist) {
    history.push("/404");
  }

  const [sortedSongs, setSortedSongs] = useState(songs);
  const [choseAttr, setAttr] = useState("slug");

  function sortButtonHandler(attr, by) {
    var newSongs = orderBy(songs, attr, by);
    setSortedSongs(newSongs);
    setAttr(attr);
  }

  return (
    <BoundingBox maxwidth={1024}>
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
      <FilterGroup>
        <div className="filterHeading">
          <RiFilter3Line size={24} /> Sắp Xếp
        </div>
        <div className="buttonGroup">
          <FilterButton
            onClick={() => sortButtonHandler("titleEn")}
            active={choseAttr === "slug"}
          >
            <RiCheckboxBlankCircleLine size={24} />
            Theo Tên
          </FilterButton>
          <FilterButton
            onClick={() => sortButtonHandler("stars", "desc")}
            active={choseAttr === "stars"}
          >
            <RiCheckboxBlankCircleLine size={24} />
            Theo Sao
          </FilterButton>
          <FilterButton
            onClick={() => sortButtonHandler("releaseYear", "desc")}
            active={choseAttr === "releaseYear"}
          >
            <RiCheckboxCircleLine size={24} />
            Theo Năm Phát Hành
          </FilterButton>
          <FilterButton
            onClick={() => sortButtonHandler("duration")}
            active={choseAttr === "duration"}
          >
            <RiCheckboxBlankCircleLine size={24} />
            Theo Thời Gian
          </FilterButton>
        </div>
      </FilterGroup>

      {sortedSongs.map((song) => (
        <ArtistSongRow key={song.slug} song={song} />
      ))}
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

export default connect(mapStateToPageProps)(ArtistSinglePage);
