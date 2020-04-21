import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import RatioBoundingBox from "./RatioBoundingBox";

// Import icons
import { TiChevronLeft, TiChevronRight } from "react-icons/ti";

const Container = styled.div`
  max-width: 1600px;
  margin: 2rem auto 0rem;
`;

const Header = styled.div`
  align-items: center;
  margin-bottom: 1rem;
  margin-left: 1rem;
  display: flex;
  justify-content: space-between;
  .buttonGroup {
    margin-right: 1rem;

    button {
      background-color: darkgray;
      padding: 0.5rem;
    }
  }
  h3 {
    font-size: 2rem;
  }
`;

const Slider = styled.div`
  margin-left: 1rem;
  display: flex;
`;

const PlaylistCard = styled.div`
  border: 1px dotted gray;
  min-width: 100px;
  min-height: 100px;
  background-color: darkblue;
  display: inline-block;
  width: calc(100% / ${(props) => props.columns});
`;

const Item = ({ type }) => {
  if (type === "artist") {
    return <p>One Artist</p>;
  } else if (type === "playlist") {
    return <p>One Playlist</p>;
  }
};

const Group = ({ group, matches }) => {
  const { name, type } = group;

  function getColumns(matches, type) {
    if (type === "playlist") {
      var columns = 2;
      if (matches.medium) {
        columns = 3;
      }
      if (matches.large) {
        columns = 4;
      }
      if (matches.extraLarge) {
        columns = 5;
      }
      return columns;
    } else if (type === "artist") {
      var columns = 3;
      if (matches.medium) {
        columns = 4;
      }
      if (matches.large) {
        columns = 5;
      }
      if (matches.extraLarge) {
        columns = 7;
      }
      return columns;
    }
  }

  function generateItems(quanlity, group, columns) {
    var items = [];
    for (var i = 0; i < quanlity; i++) {
      items.push(
        <PlaylistCard columns={columns}>
          <RatioBoundingBox>
            <p>{group.items[i].fields.name}</p>
            <p>{columns}</p>
          </RatioBoundingBox>
        </PlaylistCard>
      );
    }
    return items;
  }

  var columns = getColumns(matches, group.type);

  const items = generateItems(group.items.length, group, columns);

  return (
    <Container>
      <Header>
        <h3>{name}</h3>
        <p>SL:{group.items.length}</p>
        <p>{type}</p>
      </Header>
      <Slider>{items}</Slider>
    </Container>
  );
};

Group.propTypes = {};

Group.defaultProps = {
  type: "playlist",
};

export default Group;
