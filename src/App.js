import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Import React Analytics
import ReactGa from "react-ga";

// Import Redux's
import { connect } from "react-redux";
import { getAlLEntries } from "./actions/dataActions";

// Import pages
import HomePage from "./pages/homePage";

// Import custom components
import PlayerPage from "./pages/playerPage";
import Header from "./components/Header";

function App({ loading, playlists, getAlLEntries }) {
  useEffect(() => {
    getAlLEntries();
    ReactGa.initialize("UA-158673998-2");

    // to report page view
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/player">
            <PlayerPage />
          </Route>
          <Route path="/playlists">
            <p>Playlists</p>
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    playlists: state.data.playlists,
    loading: state.data.loading,
  };
}

export default connect(mapStateToProps, { getAlLEntries })(App);
