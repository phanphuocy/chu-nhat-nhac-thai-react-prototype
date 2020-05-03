import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { searchEntries } from "../actions/dataActions";
import QuickResultRow from "./QuickResultRow";
import debounce from "lodash.debounce";

import { RiSearchLine, RiCloseLine } from "react-icons/ri";

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0 4rem;
`;

const StyledSearchBox = styled.form`
  display: none;
  height: 2rem;
  position: relative;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }

  #searchBox {
    box-sizing: border-box;
    background-color: ${(props) => props.theme.colors.background};
    border: 2px solid hsl(0, 0%, 5%);
    border-radius: 2px;
    height: 100%;
    padding: 0.5rem 1rem;
    font-size: 14px;
    width: 100%;
    color: white;
  }

  #clearButton {
    display: ${(props) => (props.clearButtonShow ? "block" : "none")};
    position: absolute;
    right: 1rem;
    background-color: transparent;
    border: none;
    color: white;
  }
`;

const NoResult = styled.div`
  position: absolute;
  width: 100%;
`;

const QuickResultBox = styled.div`
  position: absolute;
  width: 100%;
  z-index: 100;
`;

const SearchBox = ({ searchEntries, searchResults }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    if (searchTerm.length >= 3) {
      searchEntries(searchTerm);
    }
  };

  function submitHandler(e) {
    e.preventDefault();
    searchEntries(searchTerm);
  }

  return (
    <StyledContainer>
      <StyledSearchBox
        onSubmit={submitHandler}
        clearButtonShow={searchTerm.length > 0}
      >
        <input
          id="searchBox"
          autoComplete="off"
          type="text"
          placeholder="Tìm kiếm.."
          value={searchTerm}
          onChange={handleChange}
        ></input>
        <button id="clearButton" onClick={() => setSearchTerm("")}>
          <RiCloseLine size={18} />
        </button>
      </StyledSearchBox>
      {searchTerm.length !== 0 &&
        searchResults !== null &&
        (searchResults.length === 0 ? (
          <NoResult>
            <p>No results</p>
          </NoResult>
        ) : (
          <QuickResultBox>
            {searchResults.map((result) => (
              <QuickResultRow result={result} />
            ))}
          </QuickResultBox>
        ))}
    </StyledContainer>
  );
};

function mapStateToProps(state) {
  return {
    searchResults: state.data.searchResults,
  };
}

export default connect(mapStateToProps, { searchEntries })(SearchBox);
