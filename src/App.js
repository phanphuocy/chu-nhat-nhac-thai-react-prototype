import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import darktheme from "./themes/darktheme";
import { ThemeProvider } from "styled-components";

// Import React Analytics
import ReactGa from "react-ga";

// Import Redux's
import { connect } from "react-redux";
import { getAlLEntries } from "./actions/dataActions";

// Import pages
import HomePage from "./pages/homePage";
import ArtistSinglePage from "./pages/artistSinglePage";

// Import custom components
import PlayerPage from "./pages/playerPage";
import Header from "./components/Header";

function App({ loading, loaded, playlists, getAlLEntries }) {
  useEffect(() => {
    getAlLEntries();
    ReactGa.initialize("UA-158673998-2");

    // to report page view
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);

  if (loading === true || loaded === false) {
    return <p>Loading</p>;
  }

  return (
    <div className="App">
      <ThemeProvider theme={darktheme}>
        <Router>
          <Header />
          <Switch>
            <Route path="/p">
              <PlayerPage />
            </Route>
            <Route path="/playlists">
              <p>Playlists</p>
            </Route>
            <Route path="/artists/:id" component={ArtistSinglePage} />
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    playlists: state.data.playlists,
    loaded: state.data.loaded,
    loading: state.data.loading,
  };
}

export default connect(mapStateToProps, { getAlLEntries })(App);
