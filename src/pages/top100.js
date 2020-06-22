import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Client from "../contentful";
import BoundingBox from "../components/BoundingBox";
import convertLargeNumber from "../utils/convertLargeNumber";
// import { useTrail, animated } from "react-spring";
import { ReactComponent as TranslatedCheckBoxSVG } from "../images/translated-icon.svg";

const StyledTopSongs = styled.div`
  .song-item {
    background-color: ${(props) => props.theme.colors.gray["200"]};
    margin-bottom: ${(props) => props.theme.spacing["1"]};
    padding: ${(props) =>
      `${props.theme.spacing["2"]} ${props.theme.spacing["4"]}`};
    /* Grid */
    display: grid;
    grid-template-columns: 1fr 9fr 2fr;
    column-gap: ${(props) => props.theme.spacing["2"]};
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      "rank title cover stars"
      "rank artist cover stars";

    .rank {
      grid-area: rank;
      align-self: center;
    }
    .title {
      grid-area: title;
      align-self: center;
      vertical-align: center;
      .checkbox {
        margin-left: ${(props) => props.theme.spacing["1"]};
        svg {
          height: 16px;
          width: 16px;
          fill: lightgreen;
        }
      }
    }
    .stars {
      grid-area: stars;
      text-align: right;
      align-self: center;
    }
    .cover {
      grid-area: cover;
      height: 100%;
    }
    .artist {
      grid-area: artist;
      align-self: center;
      color: ${(props) => props.theme.colors.gray["800"]};
    }
    .thumbnail {
      grid-area: thumbnail;
      display: none;
      width: 160px;
      height: 90px;
    }
  }

  /* For large screen */
  @media (min-width: 768px) {
    .song-item {
      grid-template-columns: 2rem 160px 4fr 4fr 1fr;
      grid-template-rows: 1fr;
      column-gap: 1rem;
      grid-template-areas: "rank thumbnail title artist stars";

      .thumbnail {
        display: block;
      }
      .cover {
        display: none;
      }
    }
  }
`;

const SongItem = ({ song, rank }) => {
  return (
    <li>
      <Link to={`/p/${song.fields.slug}`} className="song-item">
        <p className="rank">{rank}</p>
        <img
          className="thumbnail"
          src={`https://img.youtube.com/vi/${song.fields.url}/mqdefault.jpg`}
          alt={song.fields.titleEn}
        />
        <p className="title">
          {song.fields.titleVi ? song.fields.titleVi : song.fields.titleEn}
          <span className="checkbox">
            {song.fields.timestamp && <TranslatedCheckBoxSVG />}
          </span>
        </p>
        <p className="artist">{song.fields.artists[0].fields.name}</p>
        {song.fields.thumbnail && (
          <img
            className="cover"
            src={song.fields.thumbnail.fields.file.url}
            alt={song.fields.thumbnail.fields.file.fileName}
          />
        )}
        <p className="stars">{convertLargeNumber(song.fields.stars)}</p>
      </Link>
    </li>
  );
};

const TopSongsPage = ({ allIds }) => {
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    const fetchSongs = async () => {
      const results = await Client.getEntries({
        content_type: "songs",
        order: "-fields.stars",
      });
      console.log(results);
      setSongs(results.items);
    };

    fetchSongs();
  }, []);
  return (
    <StyledTopSongs>
      <BoundingBox maxwidth={1280}>
        <h1>TOP 100</h1>
        <ul>
          {songs.length === [] ? (
            <p>Loading</p>
          ) : (
            songs.map((song, index) => (
              <SongItem song={song} rank={index + 1} />
            ))
          )}
        </ul>
      </BoundingBox>
    </StyledTopSongs>
  );
};
function mapStateToPageProps({ data }) {
  return {
    allIds: data.news.allIds,
  };
}
export default connect(mapStateToPageProps)(TopSongsPage);
