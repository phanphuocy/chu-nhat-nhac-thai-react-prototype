import {
  GET_ALL_ENTRIES,
  SET_DATA_LOADING,
  SET_DATA_ERROR,
  SEARCH_ENTRIES,
  SEARCHING,
  CLEAR_SEARCH,
} from "./types";
import Client from "../contentful";
import genres from "../utils/exportGenres";

export const getAlLEntries = () => async (dispatch) => {
  try {
    setDataLoading();

    var playlistGroups = { byIds: {}, allIds: [], featuredIds: [] },
      playlists = { byIds: {}, allIds: [] },
      songs = {
        byIds: {},
        allIds: [],
        genreIds: {
          pop: [],
          rnbsoul: [],
          countryfolk: [],
          hiphoprap: [],
          jazzblues: [],
          rock: [],
        },
      },
      artistGroups = { byIds: {}, allIds: [], featuredIds: [] },
      artists = { byIds: {}, allIds: [], featuredIds: [] },
      news = { byIds: {}, allIds: [] };

    const artistsResults = await Client.getEntries({ content_type: "artists" });

    artistsResults.items.forEach((item) => {
      artists.byIds[item.fields.slug] = {
        ...item.fields,
        avatar: item.fields.avatar.fields.file,
        similar:
          item.fields.similar &&
          item.fields.similar.map((each) => each.fields.slug),
        // songs:
        //   item.fields.songs !== undefined
        //     ? item.fields.songs.map((each) => each.fields.slug)
        //     : [],
        songs: [],
      };
      artists.allIds.push(item.fields.slug);
      if (item.fields.isFeatured) {
        artists.featuredIds.push(item.fields.slug);
      }
    });

    const songResults = await Client.getEntries({
      content_type: "songs",
      limit: 200,
    });

    songResults.items.forEach((item) => {
      item.fields.artists.forEach((artist) =>
        artists.byIds[artist.fields.slug].songs.push(item.fields.slug)
      );

      songs.byIds[item.fields.slug] = {
        ...item.fields,
        id: item.sys.id,
        title: item.fields.titleVi ? item.fields.titleVi : item.fields.titleEn,
        artists: item.fields.artists.map((artist) => artist.fields.slug),
      };
      songs.allIds.push(item.fields.slug);
      if (item.fields.thumbnail && item.fields.genre) {
        songs.genreIds[item.fields.genre].push(item.fields.slug);
      }
    });

    var currentWeekChart = {},
      pastWeekChart = {},
      thisMonthChart = {};

    const chartsResults = await Client.getEntries({
      content_type: "chartBoard",
    });

    chartsResults.items.forEach((item) => {
      if (item.fields.isWeek) {
        if (Object.keys(currentWeekChart).length === 0) {
          currentWeekChart = {
            ...item.fields,
            items: item.fields.items.map((song) => song.fields),
          };
        } else if (item.fields.endDate > currentWeekChart.endDate) {
          pastWeekChart = { ...currentWeekChart };
          currentWeekChart = {
            ...item.fields,
            items: item.fields.items.map((song) => song.fields),
          };
        } else if (item.fields.endDate < currentWeekChart.endDate) {
          pastWeekChart = {
            ...item.fields,
            items: item.fields.items.map((song) => song.fields),
          };
        }
      } else {
        if (Object.keys(thisMonthChart).length === 0) {
          thisMonthChart = {
            ...item.fields,
            items: item.fields.items.map((song) => song.fields),
          };
        } else {
          if (item.fields.endDate > thisMonthChart.endDate) {
            thisMonthChart = {
              ...item.fields,
              items: item.fields.items.map((song) => song.fields),
            };
          }
        }
      }
    });

    const newsResults = await Client.getEntries({ content_type: "news" });

    newsResults.items.forEach((item) => {
      news.byIds[item.fields.id.toString()] = {
        ...item.fields,
        image: item.fields.image && { ...item.fields.image.fields.file },
      };
      news.allIds.push(item.fields.id.toString());
    });

    const playlistResults = await Client.getEntries({
      content_type: "playlists",
    });

    playlistResults.items.forEach((item) => {
      playlists.byIds[item.fields.slug] = {
        ...item.fields,
        songs: item.fields.songs.map((song) => song.fields.slug),
        cover: {
          title: item.fields.cover.fields.title,
          ...item.fields.cover.fields.file,
        },
      };
      playlists.allIds.push(item.fields.slug);
    });

    const playlistGrpResults = await Client.getEntries({
      content_type: "playlistGroup",
    });
    playlistGrpResults.items.forEach((item) => {
      playlistGroups.byIds[item.fields.slug] = {
        ...item.fields,
        items: item.fields.items.map((item) => item.fields.slug),
      };
      playlistGroups.allIds.push(item.fields.slug);
      if (item.fields.isFeatured) {
        playlistGroups.featuredIds.push(item.fields.slug);
      }
    });

    const artistGrpResults = await Client.getEntries({
      content_type: "artistGroup",
    });

    artistGrpResults.items.forEach((item) => {
      artistGroups.byIds[item.fields.slug] = {
        ...item.fields,
        items: item.fields.items.map((item) => item.fields.slug),
      };
      artistGroups.allIds.push(item.fields.slug);
      if (item.fields.isFeatured) {
        artistGroups.featuredIds.push(item.fields.slug);
      }
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

export const setSearching = () => {
  clearSearch();
  return {
    type: SEARCHING,
  };
};

export const clearSearch = () => {
  return {
    type: CLEAR_SEARCH,
  };
};

function sanitizeSearchResult(items) {
  var results = {
    all: {
      artists: [],
      playlist: [],
      songs: [],
    },
    quick: {
      artists: [],
      playlists: [],
      songs: [],
    },
    total: 0,
    totalQuick: 0,
  };

  var quickResultsLimit = 10;

  items.forEach((item) => {
    switch (item.sys.contentType.sys.id) {
      case "artists":
        var searchedItem = {
          name: item.fields.name,
          link: `/artist/${item.fields.slug}`,
        };
        results.all.artists.push(searchedItem);
        if (results.totalQuick < quickResultsLimit) {
          results.quick.artists.push(searchedItem);
          results.totalQuick++;
        }
        results.total++;
        break;
      case "songs":
        var searchedItem = {
          name: item.fields.titleVi ? item.fields.titleVi : item.fields.titleRo,
          link: `/p/${item.fields.slug}`,
        };
        results.all.songs.push(searchedItem);
        if (results.totalQuick < quickResultsLimit) {
          results.quick.songs.push(searchedItem);
          results.totalQuick++;
        }
        results.total++;
        break;
      case "playlists":
        var searchedItem = {
          name: item.fields.name,
          link: `/playlist/${item.fields.slug}`,
        };
        results.all.playlists.push(searchedItem);
        if (results.totalQuick < quickResultsLimit) {
          results.quick.playlists.push(searchedItem);
          results.totalQuick++;
        }
        results.total++;
        break;
      default:
        return;
    }
  });
  return results;
}

export const searchEntries = (query) => async (dispatch) => {
  try {
    const res = await Client.getEntries({ query: query.toLowerCase() });
    const results = sanitizeSearchResult(res.items);
    console.log(results);
    dispatch({
      type: SEARCH_ENTRIES,
      payload: results,
    });
  } catch (error) {
    dispatch({
      type: SET_DATA_ERROR,
      payload: error.message,
    });
  }
};
