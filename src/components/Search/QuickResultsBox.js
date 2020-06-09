import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledBox = styled.div`
  width: 100%;
  z-index: 1000;
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.onSurface};
  padding: 1rem;

  .segment {
    width: 100%;
    display: grid;
    grid-template-columns: 8rem auto;
    grid-template-areas: "header body";
  }
  .header {
    grid-area: header;
    padding: 0.5rem 1rem;
    text-align: right;
  }
  .body {
    grid-area: body;

    li {
      padding: 0.5rem 1rem;
    }
  }
  .seeMore {
    text-align: center;
    padding: 0.5rem 0;
  }
`;

const QuickResultsBox = ({ results }) => {
  const names = {
    songs: "Bài Hát",
    artists: "Nghệ Sĩ",
    playlists: "Danh Sách Phát",
  };
  const { quick, total, totalQuick } = results;
  return (
    <StyledBox>
      {["songs", "artists", "playlists"]
        .filter((category) => quick[category].length > 0)
        .map((category) => (
          <div className="segment" key={category}>
            <div className="header">
              <h4>{names[category]}</h4>
            </div>
            <div className="body">
              <ul>
                {quick[category].map((item) => (
                  <Link to={item.link} key={item.link}>
                    <li>{item.name}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        ))}
      {total > totalQuick && (
        <div className="seeMore">
          <p>{`Xem thêm ${total - totalQuick} kết quả`}</p>
        </div>
      )}
    </StyledBox>
  );
};

export default QuickResultsBox;
