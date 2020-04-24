import { SWITCH_LYRICS_LANGUAGE } from "./types";

export const switchLyricsLang = (lang) => {
  return {
    type: SWITCH_LYRICS_LANGUAGE,
    payload: lang,
  };
};
