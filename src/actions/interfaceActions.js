import { SWITCH_LYRICS_LANGUAGE, SWITCH_THEME } from "./types";

export const switchLyricsLang = (lang) => {
  return {
    type: SWITCH_LYRICS_LANGUAGE,
    payload: lang,
  };
};

export const switchTheme = (theme) => {
  console.log("G");
  if (["dark", "light"].includes(theme)) {
    return {
      type: SWITCH_THEME,
      payload: theme,
    };
  }
};
