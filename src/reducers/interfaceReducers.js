import { SWITCH_LYRICS_LANGUAGE } from "../actions/types";

const initialState = {
  lyricsLang: "th",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_LYRICS_LANGUAGE:
      return {
        ...state,
        lyricsLang: action.payload,
      };
    default:
      return state;
  }
};
