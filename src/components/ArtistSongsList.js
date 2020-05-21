import React, { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import ArtistSongRow from "./ArtistSongRow";
import styled from "styled-components";
import { RiFilter3Line, RiPlayLine } from "react-icons/ri";
import Button from "./Button";
import orderBy from "lodash.orderby";

const StyledArtistSongsList = styled.div`
  padding: 1rem;

  .heading {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .filterSegment {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    .label {
      display: flex;
      align-items: center;
    }
  }
  .dropdown,
  .control,
  .menu {
    max-width: 15rem;
    border: none;
    background-color: ${(props) => props.theme.colors.surface};
    color: ${(props) => props.theme.colors.onSurface};
  }

  @media (min-width: 768px) {
    .heading {
      flex-direction: row;
      align-items: center;
    }
    .filterSegment {
      flex-direction: row;

      .label {
        margin-right: 0.5rem;
      }
    }
  }
`;

const options = [
  {
    value: ["releaseYear", "desc"],
    label: "Mới Nhất",
  },
  { value: ["stars", "desc"], label: "Được Yêu Thích Nhất" },

  {
    value: ["duration", "asc"],
    label: "Thời Lượng MV",
  },
];

const ArtistSongsList = ({ songs, playbuttonHandler }) => {
  const [sortedSongs, setSortedSongs] = useState(
    orderBy(songs, options[0].value[0], "desc")
  );

  function handleDowndownSelected({ value }) {
    var newSongs = orderBy(sortedSongs, value[0], value[1]);
    setSortedSongs(newSongs);
  }

  return (
    <StyledArtistSongsList>
      <div className="heading">
        <div className="filterSegment">
          <div className="label">
            <RiFilter3Line size={24} /> <p>Sắp Xếp</p>
          </div>
          <Dropdown
            className="dropdown"
            controlClassName="control"
            menuClassName="menu"
            options={options}
            onChange={(e) => handleDowndownSelected(e)}
            value={options[0]}
            placeholder="Select an option"
          />
        </div>
        <div className="controlSegment">
          <Button label="Phát" onClickFx={() => playbuttonHandler(sortedSongs)}>
            <RiPlayLine />
          </Button>
        </div>
      </div>
      <div className="content">
        {sortedSongs.map((song) => (
          <ArtistSongRow key={song.slug} song={song} />
        ))}
      </div>
    </StyledArtistSongsList>
  );
};

export default ArtistSongsList;
