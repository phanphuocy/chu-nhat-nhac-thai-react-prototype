import {
  GET_ALL_ENTRIES,
  SET_DATA_LOADING,
  SET_DATA_ERROR,
  SEARCH_ENTRIES,
} from "./types";
import Client from "../contentful";
import slugify from "slugify";

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
            songIds: item.fields.songs.map((each) => each.fields.slug),
            cover: {
              title: item.fields.cover.fields.title,
              ...item.fields.cover.fields.file,
            },
          };
          break;
        case "songs":
          songs[item.fields.slug] = { ...item.fields, id: item.sys.id };
          break;
        case "artistGroup":
          artistGroups[item.fields.slug] = {
            ...item.fields,
            id: item.sys.id,
          };
          artistGroupsAllIds.push(item.fields.slug);
          break;
        case "artists":
          artists[item.fields.slug] = {
            id: item.sys.id,
            type: "artist",
            name: item.fields.name,
            avatar: item.fields.avatar.fields.file,
            slug: item.fields.slug,
            members: item.fields.members,
            biography: item.fields.biography,
            isBand: item.fields.isBand,
            songIds: item.fields.songs.map((each) => each.fields.slug),
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

export const searchEntries = (query) => async (dispatch) => {
  try {
    setDataLoading();

    const res = await Client.getEntries({ query: query.toLowerCase() });
    // console.log(res);
    dispatch({
      type: SEARCH_ENTRIES,
      payload: res.items,
    });
  } catch (error) {
    dispatch({
      type: SET_DATA_ERROR,
      payload: error.message,
    });
  }
};
