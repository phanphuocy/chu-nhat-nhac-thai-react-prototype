import {
  SWITCH_LYRICS_LANGUAGE,
  SWITCH_THEME,
  SWITCH_LYRICS_VISIBILITY,
} from "../actions/types";

const initialState = {
  lyricsLang: "th",
  theme: "dark",
  showLyrics: true,
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
    case SWITCH_LYRICS_VISIBILITY:
      return {
        ...state,
        showLyrics: !state.showLyrics,
      };
    default:
      return state;
  }
};
