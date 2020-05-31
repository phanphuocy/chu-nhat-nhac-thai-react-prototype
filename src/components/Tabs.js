import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledTabs = styled.div`
  .switcher {
    max-width: 768px;
    padding-top: 0.5rem;
    display: grid;
    grid-template-columns: repeat(${(props) => props.count}, 1fr);

    .tabBtn {
      font-size: 0.8rem;
      border-radius: 0.25rem 0.25rem 0 0;
      border: none;
      background-color: ${(props) => props.theme.colors.background};
      color: ${(props) => props.theme.colors.onBackground};
      padding: 1rem 0.75rem;
    }
    .active {
      background-color: ${(props) => props.theme.colors.surface};
      color: ${(props) => props.theme.colors.onSurface};
    }
  }
  .spacer {
    height: 1rem;
    background-color: ${(props) => props.theme.colors.surface};
    border-bottom: 0.25rem solid ${(props) => props.theme.colors.background};
  }
`;

export const TabPane = ({ children }) => {
  return <div className="tabPane">{children}</div>;
};

TabPane.propTypes = {
  key: PropTypes.string.isRequired,
  tab: PropTypes.string.isRequired,
};

export const Tabs = ({ children }) => {
  const [activeTab, setActive] = useState(children[0].key);
  const tabs = React.Children.map(children, (children, element) => {
    return {
      key: children.key,
      tab: children.props.tab || "Không Có Tên",
    };
  });
  var index = tabs.map((tab) => tab.key).indexOf(activeTab);
  return (
    <StyledTabs count={tabs.length}>
      <div className="switcher">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`tabBtn ${tab.key === activeTab ? "active" : ""}`}
            onClick={() => setActive(tab.key)}
          >
            {tab.tab}
          </button>
        ))}
      </div>
      <div className="spacer"></div>
      <div className="content">{children[index]}</div>
    </StyledTabs>
  );
};
