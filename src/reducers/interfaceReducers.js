import { SWITCH_LYRICS_LANGUAGE, SWITCH_THEME } from "../actions/types";

const initialState = {
  lyricsLang: "th",
  theme: "dark",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_LYRICS_LANGUAGE:
      return {
        ...state,
        lyricsLang: action.payload,
      };
    case SWITCH_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};
