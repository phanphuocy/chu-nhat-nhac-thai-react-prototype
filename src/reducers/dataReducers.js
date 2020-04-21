// Import actions
import {
  GET_ALL_ENTRIES,
  SET_DATA_LOADING,
  SET_DATA_ERROR,
} from "../actions/types";

const initialState = {
  playlistGroups: null,
  playlistGroupsAllIds: null,
  playlists: null,
  artists: null,
  artistGroupsAllIds: null,
  songs: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ENTRIES:
      console.log("Successfully call reducer for data get all entries");
      return {
        ...state,
        loading: false,
        playlistGroups: action.payload.playlistGroups,
        playlistGroupsAllIds: action.payload.playlistGroupsAllIds,
        playlists: action.payload.playlists,
        songs: action.payload.songs,
        artistGroups: action.payload.artistGroups,
        artistGroupsAllIds: action.payload.artistGroupsAllIds,
        artists: action.payload.artists,
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
    default:
      return state;
  }
};
