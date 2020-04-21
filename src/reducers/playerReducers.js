import { SET_CURRENT_SONG, REGISTER_QUEUE_SONGS } from "../actions/types";

const initialState = {
  currentSong: null,
  playerQueue: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_QUEUE_SONGS:
      return {
        ...state,
        playerQueue: action.payload,
      };
    case SET_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.payload,
      };
    default:
      return state;
  }
};
