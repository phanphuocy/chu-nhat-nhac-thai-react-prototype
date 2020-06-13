import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Img from "react-image";

import { ReactComponent as DefaultSong } from "../../images/default-song.svg";

const StyledPanel = styled.div`
  .header {
    padding: 1rem;
  }

  .content {
    padding: 0 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: stretch;
  }
`;

const StyledCard = styled.div`
  background-color: ${(props) => props.theme.colors.surface};
  width: 48%;
  margin-right: 2%;
  margin-bottom: 1rem;
  .info {
    padding: 1rem;
  }
  @media (min-width: 768px) {
    width: 19%;
    margin-right: 1%;
  }
`;

const LoadingCard = () => (
  <StyledCard>
    <DefaultSong />
  </StyledCard>
);

const SongCard = ({ song }) => (
  <StyledCard>
    <Link to={`/p/${song.slug}`}>
      <Img
        src={`https://img.youtube.com/vi/${song.url}/mqdefault.jpg`}
        alt={song.title}
        width="100%"
        loader={<DefaultSong />}
      />
      <div className="info">
        <h3 className="title">{song.title}</h3>
        <p>{song.artist}</p>
      </div>
    </Link>
  </StyledCard>
);

const SimilarSongs = ({ song }) => {
  const [similarSongs, setSimilarSongs] = useState([]);

  const tags = song.tagRefs ? song.tagRefs.map((tag) => tag.fields.slug) : "";

  const query = `${song.titleEn} ${
    tags.length === 0 ? song.artists[0] : tags.join(" ")
  }`;
  console.log(query);

  var instance = axios.create({
    baseURL: "https://chu-nhac-nhac-thai.herokuapp.com",
    headers: { "Content-Type": "application/json" },
  });

  useEffect(() => {
    const fetchData = async () => {
      await instance
        .post("/getrelevantsongs", {
          query: query,
          exclude: song.url,
        })
        .then((res) => {
          if (res.data.length > 5) {
            setSimilarSongs(res.data);
          } else {
            setSimilarSongs(res.data);
          }
        })
        .catch((error) => console.log(error));
    };
    setSimilarSongs([]);
    fetchData();
  }, [song]);
  return (
    <StyledPanel>
      <div className="header">
        <h3>Fan Cũng Thích</h3>
      </div>

      <div className="content">
        {similarSongs.length > 0
          ? similarSongs.map((song) => (
              <SongCard key={song.slug} song={song}></SongCard>
            ))
          : [0, 0, 0, 0, 0].map((_, i) => <LoadingCard key={i} />)}
      </div>
    </StyledPanel>
  );
};

export default SimilarSongs;
