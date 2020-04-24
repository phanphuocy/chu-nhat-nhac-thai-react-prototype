import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const StyledNewSongRow = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #232527;
  display: inline-grid;
  grid-template-columns: 140px 2fr 1fr 2rem;
  grid-template-areas: "thumbnail title releaseYear playtime";

  .thumbnail {
    grid-area: thumbnail;
    align-self: center;
  }
  .title {
    grid-area: title;
    font-weight: 800;
    align-self: center;
  }
  .releaseYear {
    grid-area: releaseYear;
    align-self: center;
  }
  .playtime {
    grid-area: playtime;
    align-self: center;
  }
  &:nth-child(odd) {
    background-color: #252729;
  }
`;

const NewSongRow = ({ slug, song }) => {
  if (song === null) {
    return <p>Loading...</p>;
  }
  return (
    <StyledNewSongRow>
      <img
        className="thumbnail"
        src={`https://img.youtube.com/vi/${song.url}/mqdefault.jpg`}
        width="120"
      />
      <span className="title">{song.titleEn}</span>
      <span className="releaseYear">{song.releaseYear}</span>
      <span className="playtime">4:12</span>
    </StyledNewSongRow>
  );
};

function mapStateToProps(state, ownProps) {
  const { slug } = ownProps;
  if (state.data.songs === null) {
    return {
      song: null,
    };
  } else {
    return {
      song: state.data.songs[slug],
    };
  }
}

export default connect(mapStateToProps)(NewSongRow);
