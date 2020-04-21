import { GET_ALL_ENTRIES, SET_DATA_LOADING, SET_DATA_ERROR } from "./types";
import Client from "../contentful";
import { normalize, schema } from "normalizr";
import slugify from "slugify";

const item = new schema.Entity("item");

export const getAlLEntries = () => async (dispatch) => {
  try {
    setDataLoading();

    const res = await Client.getEntries();
    var playlistGroups = {},
      playlists = {},
      songs = {},
      artistGroups = {},
      artists = {};
    var playlistGroupsAllIds = [],
      artistGroupsAllIds = [];

    function filter(item) {
      switch (item.sys.contentType.sys.id) {
        case "playlistGroup":
          playlistGroups[item.fields.slug] = {
            ...item.fields,
            id: item.sys.id,
          };
          playlistGroupsAllIds.push(item.fields.slug);
          break;
        case "playlists":
          playlists[slugify(item.fields.name)] = {
            ...item.fields,
            id: item.sys.id,
            type: "playlist",
            songs: item.fields.songs.map((song) => ({
              titleEn: song.fields.titleEn,
            })),
            cover: {
              title: item.fields.cover.fields.title,
              ...item.fields.cover.fields.file,
            },
          };
          break;
        case "songs":
          songs[slugify(item.fields.titleEn)] = {
            id: item.sys.id,
            ...item.fields,
          };
          break;
        case "artistGroup":
          artistGroups[item.fields.slug] = {
            ...item.fields,
            id: item.sys.id,
          };
          artistGroupsAllIds.push(item.fields.slug);
          break;
        case "artists":
          artists[slugify(item.fields.name)] = {
            id: item.sys.id,
            type: "artist",
            ...item.fields,
          };
          break;
        default:
          return;
      }
    }

    res.items.forEach((item) => {
      filter(item);
    });

    dispatch({
      type: GET_ALL_ENTRIES,
      payload: {
        playlistGroupsAllIds,
        playlistGroups,
        playlists,
        songs,
        artistGroups,
        artistGroupsAllIds,
        artists,
      },
    });
  } catch (error) {
    dispatch({
      type: SET_DATA_ERROR,
      payload: error.message,
    });
  }
};

export const setDataLoading = () => {
  return {
    type: SET_DATA_LOADING,
  };
};
