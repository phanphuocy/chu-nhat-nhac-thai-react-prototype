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
import NewSongRow from "../components/NewSongRow";

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

const ArtistSinglePage = (artist) => {
  let history = useHistory();

  if (!artist.artist) {
    history.push("/404");
  }

  const [slugs, setSlugs] = useState(artist.artist.songIds);
  const [choseAttr, setAttr] = useState("slug");

  function sortButtonHandler(attr, by) {
    var newSongs = orderBy(artist.artist.songs, attr, by);
    var newIds = newSongs.map((each) => each.slug);
    setSlugs(newIds);
    setAttr(attr);
  }

  var test = orderBy(artist.artist.songs, "releaseYear");

  return (
    <BoundingBox maxwidth={1024}>
      <ArtistInfo artist={artist.artist} />

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
            onClick={() => sortButtonHandler("slug")}
            active={choseAttr === "slug"}
          >
            <RiCheckboxBlankCircleLine size={24} />
            Theo Tên
          </FilterButton>
          <FilterButton
            onClick={() => sortButtonHandler("releaseYear", "desc")}
            active={choseAttr === "releaseYear"}
          >
            <RiCheckboxCircleLine size={24} />
            Theo Năm Phát Hành
          </FilterButton>
          <FilterButton
            onClick={() => sortButtonHandler("playtime")}
            active={choseAttr === "playtime"}
          >
            <RiCheckboxBlankCircleLine size={24} />
            Theo Thời Gian
          </FilterButton>
        </div>
      </FilterGroup>
      {slugs.map((each) => (
        <NewSongRow slug={each} />
      ))}
      <div className="dummyheight" style={{ height: "20rem" }}></div>
    </BoundingBox>
  );
};

function mapStateToPageProps(state, ownProps) {
  console.log(ownProps.match.params.id);
  const id = ownProps.match.params.id;
  if (state.data.artists === null) {
    return {};
  } else {
    return {
      artist: state.data.artists[ownProps.match.params.id],
    };
  }
}

export default connect(mapStateToPageProps)(ArtistSinglePage);
