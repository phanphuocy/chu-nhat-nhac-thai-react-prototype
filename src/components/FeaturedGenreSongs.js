import React, { useState } from "react";
import styled from "styled-components";
import genres from "../utils/exportGenres";
import { connect } from "react-redux";
import Img from "react-image";
import defaultSong from "../images/default-feat-song.svg";
import { Link } from "react-router-dom";
import { useTransition, animated } from "react-spring";

const StyledFeaturedGenreSongs = styled.div`
  padding: 0 1rem;
  max-width: 1600px;
  margin: 4rem auto;

  .heading {
    margin: 0.5rem 0;
    font-size: ${(props) => props.theme.fontSizes.xl};
  }

  .genre-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: ${(props) => props.theme.spacing["3"]};

    .genre-item {
      width: calc((100% - 0.5rem) / 2);
      background-color: #181818;
      ${(props) => props.theme.borderRadius["rounded-full"]};
      border: none;
      color: #9b9b9b;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0.5rem;
      margin-bottom: 0.75rem;
      transition: color 500ms, filter 250ms;
      .genre-icon {
        width: 2rem;
        height: 2rem;
        margin-right: 1rem;
        filter: grayscale(1) brightness(30%);
      }
    }

    .genre-item:hover {
      background-color: ${(props) => props.theme.colors.gray["900"]};
    }

    .selected {
      background-color: ${(props) => props.theme.colors.gray["900"]};
      color: black;
      -webkit-box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.25);
      -moz-box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.25);
      box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.25);
      .genre-icon {
        filter: none;
      }
    }
  }

  .songs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 0.5rem;
    grid-row-gap: 1rem;

    .featured-song {
      img {
        width: 100%;
      }
    }
    .feat-song-title {
      color: ${(props) => props.theme.colors.onBackground};
      margin: 0.5rem 0;
      text-align: center;
    }
  }
  @media (min-width: 768px) {
    .genre-wrapper {
      .genre-item {
        width: calc((100% - 1rem) / 3);
      }
    }
    .songs {
      grid-template-columns: repeat(4, 1fr);

      .feat-song-title {
        font-size: 1rem;
      }
    }
  }
  @media (min-width: 1400px) {
    .genre-wrapper {
      .genre-item {
        width: calc((100% - 2.5rem) / 6);
      }
    }
    .songs {
      grid-template-columns: repeat(6, 1fr);
    }
  }
`;

const FeaturedGenreSongs = ({ genreIds, genreSongs }) => {
  console.log(genres);
  const [selected, setSelected] = useState(genres[0].slug);
  const transitions = useTransition(selected, null, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: { opacity: 0, display: "none" },
  });
  return (
    <StyledFeaturedGenreSongs>
      <h3 className="heading">Single Nổi Bật</h3>
      <div className="genre-wrapper">
        {genres.map((genre) => (
          <button
            className={`genre-item ${
              genre.slug === selected ? "selected" : ""
            }`}
            onClick={() => setSelected(genre.slug)}
          >
            <img
              className="genre-icon"
              src={genre.icon}
              alt={`${genre.name} icon`}
            />
            <p>{genre.name}</p>
          </button>
        ))}
      </div>
      <div>
        {transitions.map(({ item, props, key }) => (
          <animated.div className="songs" key={key} style={props}>
            {genreSongs[item].map((song) => (
              <div className="featured-song">
                <Link to={`/p/${song.slug}`}>
                  <Img
                    src={song.thumbnail.fields.file.url}
                    loader={<img src={defaultSong} alt="default song" />}
                  />
                  <p className="feat-song-title">{song.title}</p>
                </Link>
              </div>
            ))}
          </animated.div>
        ))}
      </div>
    </StyledFeaturedGenreSongs>
  );
};

function mapStateToProps({ data }) {
  var genreSongs = {};
  Object.keys(data.songs.genreIds).forEach((genre) => {
    genreSongs[genre] = data.songs.genreIds[genre].map(
      (id) => data.songs.byIds[id]
    );
  });
  console.log(genreSongs);
  return {
    genreIds: data.songs.genreIds,
    genreSongs: genreSongs,
  };
}

export default connect(mapStateToProps)(FeaturedGenreSongs);
