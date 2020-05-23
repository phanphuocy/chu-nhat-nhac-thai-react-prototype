// Import actions
import {
  GET_ALL_ENTRIES,
  SET_DATA_LOADING,
  SET_DATA_ERROR,
  SEARCH_ENTRIES,
  SEARCHING,
  CLEAR_SEARCH,
} from "../actions/types";

const initialState = {
  playlistGroups: null,
  playlists: null,
  artists: null,
  songs: null,
  loading: false,
  loaded: false,
  error: null,
  searching: false,
  searchResults: null,
  charts: null,
  news: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ENTRIES:
      console.log("Successfully call reducer for data get all entries");
      return {
        ...state,
        loading: false,
        loaded: true,
        playlistGroups: action.payload.playlistGroups,
        playlists: action.payload.playlists,
        songs: action.payload.songs,
        artistGroups: action.payload.artistGroups,
        artists: action.payload.artists,
        charts: action.payload.charts,
        news: action.payload.news,
      };
    case SET_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_DATA_ERROR:
      console.error(
        "There an error happen in Redux's data reducer",
        action.payload
      );
      return {
        ...state,
        error: action.payload,
      };
    case SEARCHING:
      return {
        ...state,
        searching: true,
        searchResults: null,
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        searching: false,
        searchResults: null,
      };
    case SEARCH_ENTRIES:
      return {
        ...state,
        searching: false,
        searchResults: action.payload,
      };
    default:
      return state;
  }
};
