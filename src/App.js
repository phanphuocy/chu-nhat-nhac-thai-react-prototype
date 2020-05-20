import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import darktheme from "./themes/darktheme";
import lighttheme from "./themes/lighttheme";
import defaultheme from "./themes/defaulttheme";
import { ThemeProvider } from "styled-components";

// Import React Analytics
import ReactGa from "react-ga";

// Import Redux's
import { connect } from "react-redux";
import { getAlLEntries } from "./actions/dataActions";
import styled from "styled-components";

// Import pages
import HomePage from "./pages/homePage";
import ArtistSinglePage from "./pages/artistSinglePage";
import PlaylistPage from "./pages/playlistsPage";
import ArtistPage from "./pages/artistsPage";
import LoaderScreen from "./pages/loader";
import NewsPage from "./pages/newsPage";

// Import custom components
import PlayerPage from "./pages/playerPage";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";

const StyledApp = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.onBackground};
  p {
    line-height: 1.4;
  }
  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.onBackground};
  }
  a:hover,
  a:active {
    text-decoration: underline;
  }
  svg {
    color: ${(props) => props.theme.colors.onBackground};
  }
`;

function App({ theme, loading, loaded, playlists, getAlLEntries }) {
  useEffect(() => {
    getAlLEntries();
    ReactGa.initialize("UA-158673998-2");

    // to report page view
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);

  if (loading === true || loaded === false) {
    return <LoaderScreen />;
  }

  return (
    <ThemeProvider
      theme={
        theme === "dark"
          ? { ...defaultheme, ...darktheme }
          : { ...defaultheme, ...lighttheme }
      }
    >
      <StyledApp>
        <Router>
          <ScrollToTop>
            <Header />
            <Switch>
              <Route path="/p/:songId" component={PlayerPage} />
              <Route path="/playlists" component={PlaylistPage} />
              <Route path="/artists/:id" component={ArtistSinglePage} />
              <Route path="/artists" component={ArtistPage} />
              <Route path="/news" component={NewsPage} />
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </ScrollToTop>
        </Router>
      </StyledApp>
    </ThemeProvider>
  );
}

function mapStateToProps(state) {
  return {
    playlists: state.data.playlists,
    loaded: state.data.loaded,
    loading: state.data.loading,
    theme: state.interface.theme,
  };
}

export default connect(mapStateToProps, { getAlLEntries })(App);
