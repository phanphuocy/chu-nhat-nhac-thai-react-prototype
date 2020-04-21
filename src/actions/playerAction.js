import { SET_CURRENT_SONG, REGISTER_QUEUE_SONGS } from "./types";

export const setCurrentSong = (song) => {
  return {
    type: SET_CURRENT_SONG,
    payload: song,
  };
};

export const registerQueueSongs = (songs) => {
  return {
    type: REGISTER_QUEUE_SONGS,
    payload: songs,
  };
};
