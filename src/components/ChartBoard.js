import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import SongRow from "./SongRow";

const StyledChartBoard = styled.div`
  .header {
    padding: 1.5rem 1rem;
    background: rgb(131, 58, 180);
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

const ChartBoard = ({ charts }) => {
  const { currentWeekChart, pastWeekChart, thisMonthChart } = charts;
  const [selectedButton, setSelectedButton] = useState("currentWeek");
  function switchButton(label) {
    setSelectedButton(label);
  }
  return (
    <StyledChartBoard>
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
      <div>
        {selectedButton === "currentWeek" &&
          currentWeekChart.items.map((song) => (
            <SongRow songId={song} key={song} />
          ))}
        {selectedButton === "pastWeek" &&
          pastWeekChart.items.map((song) => (
            <SongRow songId={song} key={song} />
          ))}
        {selectedButton === "thisMonth" &&
          thisMonthChart.items.map((song) => (
            <SongRow songId={song} key={song} />
          ))}
      </div>
    </StyledChartBoard>
  );
};
function mapStateToProps({ data }) {
  return {
    charts: data.charts,
  };
}
export default connect(mapStateToProps)(ChartBoard);
