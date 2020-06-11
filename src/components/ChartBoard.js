import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import SongRow from "./SongRow";
import { Tabs, TabPane } from "./Tabs";
import background from "../images/pexels-photo-1158961.jpeg";
import { Link } from "react-router-dom";

const StyledChartBoard = styled.div`
  margin: 4rem 0;
  padding: 4rem 0;
  width: 100%;

  background-image: url(${background});
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin: auto 0;
    background: transparent;
    border-radius: 0.5rem;
    color: whitesmoke;
    font-family: ${(props) => props.theme.fonts.sans};
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: 2px solid whitesmoke;
  }
  button:hover,
  button:active {
    background: rgba(255, 255, 255, 0.5);
  }
  .chartContent {
    z-index: 100;
    max-width: 768px;
    margin: auto 0;
  }

  @media (min-width: 768px) {
    .header {
      margin: 0;
      font-size: 3rem;
    }
  }
  .header {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      padding: 1rem 1rem;
      font-weight: bold;
      z-index: 100;
      color: whitesmoke;
      font-size: 2rem;
      font-family: ${(props) => props.theme.fonts.serif};
      text-align: center;
    }
    h4 {
      text-align: center;
      margin-bottom: 1rem;
    }
    button {
      border: none;
      text-decoration: underline;
    }
  }

  .body {
    ul {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    li {
      position: relative;
    }
    li,
    a {
      text-align: center;
      font-family: ${(props) => props.theme.fonts.serif};
      font-size: ${(props) => props.theme.fontSizes.xl};
      margin-bottom: 1rem;
    }
    li:hover img {
      opacity: 1;
      transform: rotate(0deg);
    }
  }

  .action {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const FloatingThumbnail = styled.img`
  position: absolute;
  right: ${(props) => props.odd && "125%"};
  left: ${(props) => !props.odd && "125%"};
  top: -4rem;
  transform: rotate(${(props) => (props.odd ? `-8deg` : `8deg`)});
  opacity: 0;
  transition: opacity 0.5s, transform 0.5s;
  transition-timing-function: ease;
`;

const ChartBoard = ({ charts, theme }) => {
  const [selectedWeek, setSelectedWeek] = useState("currentWeekChart");

  return (
    <StyledChartBoard light={theme === "light"}>
      <div className="chartContent">
        <div className="header">
          <h2>Bảng Xếp Hạng</h2>
          <h4>{charts[selectedWeek].title}</h4>
          {selectedWeek === "pastWeekChart" && (
            <button onClick={() => setSelectedWeek("currentWeekChart")}>
              Trở Lại Tuần Này
            </button>
          )}
          {selectedWeek === "currentWeekChart" && (
            <button onClick={() => setSelectedWeek("pastWeekChart")}>
              Tuần Trước
            </button>
          )}
        </div>
        <div className="body">
          <ul>
            {charts[selectedWeek].items.map((item, i) => (
              <li>
                <Link to={`/p/${item.slug}`}>{item.titleEn}</Link>
                <FloatingThumbnail
                  odd={i % 2 === 0}
                  className="floatingThumbnail"
                  src={`https://img.youtube.com/vi/${item.url}/mqdefault.jpg`}
                  alt={`${item.titleEn} thumbnail`}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="action">
          <button>Phát Danh Sách</button>
        </div>
      </div>
    </StyledChartBoard>
  );
};
function mapStateToProps(state) {
  return {
    charts: state.data.charts,
    theme: state.interface.theme,
  };
}
export default connect(mapStateToProps)(ChartBoard);
