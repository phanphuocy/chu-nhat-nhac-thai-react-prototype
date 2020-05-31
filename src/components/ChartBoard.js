import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import SongRow from "./SongRow";
import { Tabs, TabPane } from "./Tabs";

const StyledChartBoard = styled.div`
  margin: 0 auto;
  padding: 4rem 0;
  max-width: 1280px;
  .chartContainer {
    display: grid;
    grid-template-rows: repeat(10, 1fr);
  }

  @media (min-width: 768px) {
    .header {
      margin: 0;
      font-size: 3rem;
    }
    .chartContainer {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(5, 1fr);
      grid-auto-flow: column;
    }
  }
  .header {
    padding: 1rem 1rem;
    font-weight: bold;
    color: whitesmoke;
    font-size: 2rem;
    font-family: ${(props) => props.theme.fonts.serif};
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

  return (
    <StyledChartBoard light={theme === "light"}>
      <div className="header">Bảng Xếp Hạng</div>
      <Tabs>
        <TabPane tab="Tuần Này" key="this-week">
          {currentWeekChart.items.map((song, i) => (
            <SongRow
              songId={song}
              key={song}
              minimum
              isSorted
              sortNumber={i + 1}
            />
          ))}
        </TabPane>
        <TabPane tab="Tuần Trước" key="past-week">
          {pastWeekChart.items.map((song, i) => (
            <SongRow
              songId={song}
              key={song}
              minimum
              isSorted
              sortNumber={i + 1}
            />
          ))}
        </TabPane>
        <TabPane tab="Tháng Này" key="this-month">
          {thisMonthChart.items.map((song, i) => (
            <SongRow
              songId={song}
              key={song}
              minimum
              isSorted
              sortNumber={i + 1}
            />
          ))}
        </TabPane>
      </Tabs>
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
