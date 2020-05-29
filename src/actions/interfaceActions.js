import {
  SWITCH_LYRICS_LANGUAGE,
  SWITCH_THEME,
  SWITCH_LYRICS_VISIBILITY,
} from "./types";

export const switchLyricsLang = (lang) => {
  return {
    type: SWITCH_LYRICS_LANGUAGE,
    payload: lang,
  };
};

export const switchTheme = (theme) => {
  if (["dark", "light"].includes(theme)) {
    return {
      type: SWITCH_THEME,
      payload: theme,
    };
  }
};

export const switchLyricsVisibility = () => {
  return {
    type: SWITCH_LYRICS_VISIBILITY,
  };
};
