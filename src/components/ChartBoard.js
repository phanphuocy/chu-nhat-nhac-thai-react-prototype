import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import SongRow from "./SongRow";

const StyledChartBoard = styled.div`
  margin: 0 auto;
  padding: 1rem 0;
  max-width: 1280px;
  .chartContainer {
    display: grid;
    grid-template-rows: repeat(10, 1fr);
  }

  @media (min-width: 768px) {
    .header {
      margin: 0;
    }
    .chartContainer {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(5, 1fr);
      grid-auto-flow: column;
    }
  }
  .header {
    margin: 0 0.5rem;
    padding: 1.5rem 1rem;
    background: ${(props) =>
      props.light ? "#D13A64" : props.theme.colors.surface};
    background: linear-gradient(
      90deg,
      rgba(131, 58, 180, 1) 0%,
      rgba(253, 29, 29, 1) 50%,
      rgba(252, 176, 69, 1) 100%
    );
    font-weight: bold;
    color: whitesmoke;
    font-size: 1.25rem;
    text-align: center;
  }

  .switchButtonGroup {
    text-align: center;
    padding: 1rem 0;
    button {
      padding: 0.5rem 1rem;
      background-color: transparent;
      border: 1px solid gray;
      color: gray;
      margin-right: 0.5rem;
      border-radius: 4px;
    }
    button:hover {
      background-color: #232323;
    }
    .active {
      background-color: #232323;
    }
    button:last-child {
      margin: 0;
    }
  }
`;

const ChartBoard = ({ charts, theme }) => {
  const { currentWeekChart, pastWeekChart, thisMonthChart } = charts;
  const [selectedButton, setSelectedButton] = useState("currentWeek");
  function switchButton(label) {
    setSelectedButton(label);
  }
  return (
    <StyledChartBoard light={theme === "light"}>
      <div className="header">Bảng Xếp Hạng</div>
      <div className="switchButtonGroup">
        <button
          className={selectedButton === "currentWeek" ? "active" : ""}
          onClick={() => switchButton("currentWeek")}
        >
          Tuần Này
        </button>
        <button
          className={selectedButton === "pastWeek" ? "active" : ""}
          onClick={() => switchButton("pastWeek")}
        >
          Tuần Trước
        </button>
        <button
          className={selectedButton === "thisMonth" ? "active" : ""}
          onClick={() => switchButton("thisMonth")}
        >
          Tháng Này
        </button>
      </div>
      <div className="chartContainer">
        {selectedButton === "currentWeek" &&
          currentWeekChart.items.map((song, i) => (
            <SongRow
              songId={song}
              key={song}
              minimum
              isSorted
              sortNumber={i + 1}
            />
          ))}
        {selectedButton === "pastWeek" &&
          pastWeekChart.items.map((song, i) => (
            <SongRow
              songId={song}
              key={song}
              minimum
              isSorted
              sortNumber={i + 1}
            />
          ))}
        {selectedButton === "thisMonth" &&
          thisMonthChart.items.map((song, i) => (
            <SongRow
              songId={song}
              key={song}
              minimum
              isSorted
              sortNumber={i + 1}
            />
          ))}
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
