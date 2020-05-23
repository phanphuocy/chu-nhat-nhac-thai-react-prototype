import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  searchEntries,
  setSearching,
  clearSearch,
} from "../../actions/dataActions";
import _ from "lodash";
import QuickResultBox from "./QuickResultsBox";

import { RiCloseLine } from "react-icons/ri";

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSearchBox = styled.form`
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
    padding: 1rem 1rem;
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

const DropdownContainer = styled.div`
  z-index: 1000;
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;

  #noResult,
  #loadingBox {
    width: 100%;
    background-color: ${(props) => props.theme.colors.surface};
    padding: 1rem 2rem;
    z-index: 500;
  }
`;

const NoResult = () => (
  <div id="noResult">
    <p>No Result Found. Please Try With Another Query</p>
  </div>
);

const LoadingBox = () => <div id="loadingBox">LOADING....</div>;

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || "",
    };
    this.debounced = _.debounce(this.debounced, 1000);
  }

  onChange(value) {
    this.setState({ value });
    if (value.length === 0) {
      this.props.clearSearch();
    } else {
      this.debounced(value);
    }
  }

  debounced = (value) => {
    console.log("SSSS");
    this.props.setSearching();
    this.props.searchEntries(this.state.value);
  };

  submitHandler(e) {
    e.preventDefault();
  }

  clearButtonHandler = () => {
    this.props.clearSearch();
    this.setState({ value: "" });
  };

  render() {
    return (
      <StyledContainer>
        <StyledSearchBox
          onSubmit={this.submitHandler}
          clearButtonShow={this.state.value.length > 0}
        >
          <input
            id="searchBox"
            autoComplete="off"
            type="text"
            placeholder="Tìm kiếm.."
            value={this.state.value}
            onChange={(e) => this.onChange(e.target.value)}
          ></input>

          <button
            type="button"
            id="clearButton"
            onClick={this.clearButtonHandler}
          >
            <RiCloseLine size={18} />
          </button>
        </StyledSearchBox>
        <DropdownContainer>
          {this.props.searching && <LoadingBox />}
          {this.props.searchResults !== null &&
            this.props.searchResults.total !== 0 && (
              <QuickResultBox results={this.props.searchResults} />
            )}
          {this.props.searchResults !== null &&
            this.props.searchResults.total === 0 && <NoResult />}
        </DropdownContainer>
      </StyledContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchResults: state.data.searchResults,
    searching: state.data.searching,
  };
}

export default connect(mapStateToProps, {
  clearSearch,
  searchEntries,
  setSearching,
})(SearchBox);
