import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Img from "react-image";
import dummySquare from "../../images/dummy-post-square-1-300x300.jpg";
import Skeleton from "react-loading-skeleton";

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
    <Skeleton height={75} style={{ marginBottom: "0.5rem" }} />
    <Skeleton count={1} style={{ marginBottom: "0.5rem" }} />
    <Skeleton count={1} />
  </StyledCard>
);

const SongCard = ({ song }) => (
  <StyledCard>
    <Link to={`/p/${song.slug}`}>
      <Img
        src={`https://img.youtube.com/vi/${song.url}/mqdefault.jpg`}
        alt={song.title}
        width="100%"
        loader={<img src={dummySquare} alt="dummy" />}
      />
      <div className="info">
        <h3 className="title">{song.title}</h3>
      </div>
    </Link>
  </StyledCard>
);

const SimilarSongs = ({ song }) => {
  const [similarSongs, setSimilarSongs] = useState([]);
  const mock = new Array(5);
  const query = `${song.titleEn} ${song.artists[0]}`;

  var instance = axios.create({
    baseURL: "https://chu-nhac-nhac-thai.herokuapp.com",
    headers: { "Content-Type": "application/json" },
  });

  useEffect(() => {
    const fetchData = async () => {
      await instance
        .post("/getrelevantsongs", {
          query: query,
        })
        .then((res) => {
          if (res.data.length > 5) {
            setSimilarSongs(res.data.splice(0, 5));
          } else {
            setSimilarSongs(res.data);
          }
        })
        .catch((error) => console.log(error));
    };
    fetchData();
  }, [song]);
  return (
    <StyledPanel>
      <div className="header">
        <h5>Fan Cũng Thích</h5>
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
