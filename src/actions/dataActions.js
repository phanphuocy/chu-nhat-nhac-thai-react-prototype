import {
  GET_ALL_ENTRIES,
  SET_DATA_LOADING,
  SET_DATA_ERROR,
  SEARCH_ENTRIES,
} from "./types";
import Client from "../contentful";

export const getAlLEntries = () => async (dispatch) => {
  try {
    setDataLoading();

    const res = await Client.getEntries();

    var playlistGroups = { byIds: {}, allIds: [], featuredIds: [] },
      playlists = { byIds: {}, allIds: [] },
      songs = { byIds: {}, allIds: [] },
      artistGroups = { byIds: {}, allIds: [], featuredIds: [] },
      artists = { byIds: {}, allIds: [] },
      news = { byIds: {}, allIds: [] };

    var currentWeekChart = {},
      pastWeekChart = {},
      thisMonthChart = {};

    function filter(item) {
      switch (item.sys.contentType.sys.id) {
        case "playlistGroup":
          playlistGroups.byIds[item.fields.slug] = {
            ...item.fields,
            items: item.fields.items.map((item) => item.fields.slug),
          };
          playlistGroups.allIds.push(item.fields.slug);
          if (item.fields.isFeatured) {
            playlistGroups.featuredIds.push(item.fields.slug);
          }
          break;
        case "playlists":
          playlists.byIds[item.fields.slug] = {
            ...item.fields,
            songs: item.fields.songs.map((song) => song.fields.slug),
            cover: {
              title: item.fields.cover.fields.title,
              ...item.fields.cover.fields.file,
            },
          };
          playlists.allIds.push(item.fields.slug);
          break;
        case "songs":
          songs.byIds[item.fields.slug] = {
            ...item.fields,
            id: item.sys.id,
            artists: item.fields.artists.map((artist) => artist.fields.slug),
          };
          songs.allIds.push(item.fields.slug);
          break;
        case "artistGroup":
          artistGroups.byIds[item.fields.slug] = {
            ...item.fields,
            items: item.fields.items.map((item) => item.fields.slug),
          };
          artistGroups.allIds.push(item.fields.slug);
          if (item.fields.isFeatured) {
            artistGroups.featuredIds.push(item.fields.slug);
          }
          break;
        case "artists":
          artists.byIds[item.fields.slug] = {
            ...item.fields,
            avatar: item.fields.avatar.fields.file,
            songs:
              item.fields.songs !== undefined
                ? item.fields.songs.map((each) => each.fields.slug)
                : [],
          };
          artists.allIds.push(item.fields.slug);
          break;
        case "news":
          news.byIds[item.fields.id.toString()] = {
            ...item.fields,
          };
          news.allIds.push(item.fields.id.toString());
          break;
        case "chartBoard":
          console.log(item.fields.title);
          if (item.fields.isWeek) {
            if (Object.keys(currentWeekChart).length === 0) {
              currentWeekChart = {
                ...item.fields,
                items: item.fields.items.map((song) => song.fields.slug),
              };
            } else {
              if (item.fields.endDate > currentWeekChart.endDate) {
                pastWeekChart = { ...currentWeekChart };
                currentWeekChart = {
                  ...item.fields,
                  items: item.fields.items.map((song) => song.fields.slug),
                };
              }
            }
          } else {
            if (Object.keys(thisMonthChart).length === 0) {
              thisMonthChart = {
                ...item.fields,
                items: item.fields.items.map((song) => song.fields.slug),
              };
            } else {
              if (item.fields.endDate > thisMonthChart.endDate) {
                thisMonthChart = {
                  ...item.fields,
                  items: item.fields.items.map((song) => song.fields.slug),
                };
              }
            }
          }
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
        playlistGroups,
        playlists,
        songs,
        artistGroups,
        artists,
        news,
        charts: {
          currentWeekChart,
          pastWeekChart,
          thisMonthChart,
        },
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
